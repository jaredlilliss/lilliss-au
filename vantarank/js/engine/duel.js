/* VANTARANK — FRIEND DUEL (asynchronous, client-only architecture).
 *
 * Player A creates a challenge: five question ids + dataset version + engine version + seed, encoded in a link.
 * Player B opens the link, plays the SAME five under the SAME versions, then pastes A's result code to compare.
 * No accounts, no server: a result code carries totals only — never answers, never questions.
 * When a server exists, both players' run receipts would be reconstructed there (VR.reconstruct) instead of trusted.
 */
(function (root) {
  'use strict';
  var VR = root.VR || (root.VR = {});

  function b64url(str) {
    var b = root.btoa(unescape(encodeURIComponent(str)));
    return b.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  function unb64url(s) {
    s = s.replace(/-/g, '+').replace(/_/g, '/'); while (s.length % 4) s += '=';
    return decodeURIComponent(escape(root.atob(s)));
  }

  function create(dataset, seed) {
    seed = (seed != null ? seed : Math.floor(Math.random() * 4294967296)) >>> 0;
    var plan = VR.PLANS.duel;
    var qs = VR.selectQuestions(dataset, plan, seed, []);
    var ch = {
      v: 1, duel_id: VR.uid('duel'), dataset_version: dataset.dataset_version, engine_version: VR.ENGINE_VERSION,
      plan: plan, seed: seed, question_ids: qs.map(function (q) { return q.question_id; })
    };
    return { challenge: ch, code: b64url(JSON.stringify(ch)) };
  }

  function parse(code) {
    try {
      var ch = JSON.parse(unb64url(String(code || '').trim()));
      if (!ch || ch.v !== 1 || !ch.question_ids || !ch.dataset_version) return { ok: false, reason: 'not a duel code' };
      return { ok: true, challenge: ch };
    } catch (e) { return { ok: false, reason: 'unreadable duel code' }; }
  }

  /** Validate a challenge against the datasets we have locally. */
  function check(ch, datasets) {
    var ds = datasets[ch.dataset_version];
    if (!ds) return { ok: false, reason: 'you do not have dataset ' + ch.dataset_version };
    if (ch.engine_version !== VR.ENGINE_VERSION) return { ok: false, reason: 'engine mismatch: challenge ' + ch.engine_version + ', yours ' + VR.ENGINE_VERSION };
    var ids = {}; ds.questions.forEach(function (q) { ids[q.question_id] = true; });
    var missing = ch.question_ids.filter(function (id) { return !ids[id]; });
    if (missing.length) return { ok: false, reason: 'missing questions: ' + missing.join(', ') };
    return { ok: true, dataset: ds };
  }

  function runOptions(ch, dataset) {
    return { mode: 'duel', label: ch.duel_id, seed: ch.seed, plan: ch.plan, questionIds: ch.question_ids, dataset: dataset };
  }

  /** Result code: totals only. */
  function resultCode(receipt, name) {
    var s = receipt.summary || {};
    var r = { v: 1, duel_id: receipt.label, name: String(name || '').slice(0, 16), total: receipt.total, o: s.originality_mean, c: s.calibration_mean, m: s.mirror_mean, vanta: s.vanta ? { contract: s.vanta.contract, met: s.vanta.met } : null, dataset_version: receipt.dataset_version, engine_version: receipt.engine_version };
    return b64url(JSON.stringify(r));
  }
  function parseResult(code) {
    try { var r = JSON.parse(unb64url(String(code || '').trim())); if (!r || r.v !== 1 || r.total == null) return { ok: false, reason: 'not a result code' }; return { ok: true, result: r }; }
    catch (e) { return { ok: false, reason: 'unreadable result code' }; }
  }
  function compare(mine, theirs) {
    var same = mine.duel_id === theirs.duel_id && mine.dataset_version === theirs.dataset_version && mine.engine_version === theirs.engine_version;
    function row(label, a, b) { return { label: label, mine: a, theirs: b, winner: a == null || b == null ? null : (a > b ? 'mine' : a < b ? 'theirs' : 'tie') }; }
    return {
      comparable: same,
      rows: [row('ORIGINALITY', mine.o, theirs.o), row('CALIBRATION', mine.c, theirs.c), row('MIRROR', mine.m, theirs.m), row('VANTARANK', mine.total, theirs.total)]
    };
  }

  VR.duel = { create: create, parse: parse, check: check, runOptions: runOptions, resultCode: resultCode, parseResult: parseResult, compare: compare, b64url: b64url, unb64url: unb64url };
})(typeof window !== 'undefined' ? window : this);

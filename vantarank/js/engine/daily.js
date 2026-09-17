/* VANTARANK — DAILY SIGNAL (client-side architecture; no backend required).
 * Everyone who plays the same calendar date on the same dataset version gets the same nine questions,
 * because the sequence is a pure function of (date, dataset_version). Until an authoritative server
 * exists this is a shared-seed convention, not a verified leaderboard.
 */
(function (root) {
  'use strict';
  var VR = root.VR || (root.VR = {});

  var EPOCH_UTC = Date.UTC(2026, 7, 7);   // 7 Aug 2026 = DAILY 000 (day numbering only; not a launch claim)

  function dateKey(d) { return VR.isoDate(d || new Date()); }
  function dayNumber(key) {
    var p = key.split('-').map(Number);
    return Math.floor((Date.UTC(p[0], p[1] - 1, p[2]) - EPOCH_UTC) / 86400000);
  }
  function seedFor(key, datasetVersion) { return VR.hash32('daily|' + datasetVersion + '|' + key); }
  function pad3(n) { n = Math.max(0, n | 0); return (n < 10 ? '00' : n < 100 ? '0' : '') + n; }

  function today(datasetVersion) {
    var key = dateKey();
    return { date: key, number: dayNumber(key), label: 'DAILY ' + pad3(dayNumber(key)), seed: seedFor(key, datasetVersion) };
  }

  /** Build the run options for a day. Excludes nothing (everyone must get the same set). */
  function runOptions(dataset, key) {
    key = key || dateKey();
    return { mode: 'daily', label: key, seed: seedFor(key, dataset.dataset_version), plan: VR.PLANS.standard, exclude: [], dataset: dataset };
  }

  function bar(total, max) {
    var filled = Math.round(10 * VR.clamp(total / max, 0, 1));
    var s = ''; for (var i = 0; i < 10; i++) s += i < filled ? '█' : '░';
    return s;
  }

  /** The share card text. Reveals no answers, no questions. */
  function shareText(receipt) {
    var s = receipt.summary || {};
    var n = receipt.mode === 'daily' && receipt.label ? pad3(dayNumber(receipt.label)) : null;
    var lines = ['VANTARANK'];
    lines.push(n != null ? 'DAILY ' + n : 'SIGNAL RUN');
    lines.push(bar(receipt.total, receipt.max_total || 1000) + ' ' + receipt.total);
    lines.push('O ' + (s.originality_mean != null ? s.originality_mean : '–'));
    lines.push('C ' + (s.calibration_mean != null ? s.calibration_mean : '–'));
    lines.push('MIRROR ' + (s.mirror_mean != null && s.mirror_mean >= 60 ? '●' : '○'));
    if (s.vanta) lines.push('VANTA ' + (s.vanta.met ? '◆' : '◇'));
    if (s.black_signals) lines.push('BLACK SIGNAL ×' + s.black_signals);
    return lines.join('\n');
  }

  VR.daily = { EPOCH_UTC: EPOCH_UTC, dateKey: dateKey, dayNumber: dayNumber, seedFor: seedFor, today: today, runOptions: runOptions, shareText: shareText, bar: bar, pad3: pad3 };
})(typeof window !== 'undefined' ? window : this);

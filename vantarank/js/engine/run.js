/* VANTARANK — the run state machine and the run receipt.
 *
 * A Run freezes a deep copy of its dataset at construction (dataset version locking): nothing that
 * happens to the live dataset afterwards can change this run's frequencies. The receipt it produces
 * is sufficient to reconstruct every score deterministically (VR.reconstruct) — that is what a future
 * server would verify instead of trusting a submitted total.
 *
 * States (per signal):
 *   SIGNAL_INTRO → [CONTRACT] → ANSWER → PREDICT → REVEAL → SCORED → (next) … → RUN_END
 */
(function (root) {
  'use strict';
  var VR = root.VR || (root.VR = {});

  VR.PLANS = {
    standard: 'SSMSSMSSV',   // 9 signals: 6 standard, 2 MIRROR, 1 VANTA (the finale)
    practice: 'S',
    duel: 'SSMSV'
  };
  VR.SIGNAL_TYPE = { S: 'standard', M: 'mirror', V: 'vanta' };
  VR.MIRROR_MIN_TOP_RATE = 0.20;   // a Mirror question needs a real consensus answer to aim at

  /** Deterministic question selection for a plan. exclude = ids to avoid where possible. */
  function selectQuestions(dataset, plan, seed, exclude) {
    var rng = VR.prng(seed);
    var ex = {}; (exclude || []).forEach(function (id) { ex[id] = true; });
    var all = VR.shuffle(dataset.questions, rng);
    var fresh = all.filter(function (q) { return !ex[q.question_id]; });
    var pool = fresh.length >= plan.length ? fresh : all;   // fall back to reuse when the fresh pool is thin
    var used = {};
    var picks = new Array(plan.length);
    function take(pred) {
      for (var i = 0; i < pool.length; i++) { var q = pool[i]; if (!used[q.question_id] && (!pred || pred(q))) { used[q.question_id] = true; return q; } }
      for (var j = 0; j < pool.length; j++) { var q2 = pool[j]; if (!used[q2.question_id]) { used[q2.question_id] = true; return q2; } }
      return pool[0];
    }
    // Mirror slots first so they get the strong-consensus questions
    for (var m = 0; m < plan.length; m++) if (plan[m] === 'M') picks[m] = take(function (q) { return VR.questionProfile(q).top_rate >= VR.MIRROR_MIN_TOP_RATE; });
    for (var k = 0; k < plan.length; k++) if (!picks[k]) picks[k] = take(null);
    return picks;
  }

  function Run(opts) {
    VR.Emitter.call(this);
    opts = opts || {};
    if (!opts.dataset || !opts.dataset.questions || !opts.dataset.questions.length) throw new Error('Run needs a dataset with questions');
    this.mode = opts.mode || 'standard';
    this.label = opts.label || null;
    this.dataset = VR.deepFreeze(VR.deepClone(opts.dataset));      // FROZEN for the life of the run
    this.dataset_version = this.dataset.dataset_version;
    this.dataset_id = this.dataset.dataset_id;
    this.engine_version = VR.ENGINE_VERSION;
    this.seed = (opts.seed != null ? opts.seed : Math.floor(Math.random() * 4294967296)) >>> 0;
    this.plan = opts.plan || VR.PLANS[this.mode] || VR.PLANS.standard;
    if (opts.questionIds && opts.questionIds.length === this.plan.length) {
      var byId = {}; this.dataset.questions.forEach(function (q) { byId[q.question_id] = q; });
      this.questions = opts.questionIds.map(function (id) { if (!byId[id]) throw new Error('question not in dataset: ' + id); return byId[id]; });
    } else {
      this.questions = selectQuestions(this.dataset, this.plan, this.seed, opts.exclude || []);
    }
    this.run_id = opts.run_id || VR.uid('run');
    this.started_at = new Date().toISOString();
    this.ended_at = null;
    this.index = -1;
    this.state = 'IDLE';
    this.signals = [];
    this.current = null;
  }
  Run.prototype = Object.create(VR.Emitter.prototype);
  Run.prototype.constructor = Run;

  Run.prototype._require = function (state) {
    if (this.state !== state) throw new Error('Run: expected state ' + state + ' but in ' + this.state);
  };
  Run.prototype._set = function (state) { this.state = state; this.emit('state', { state: state, index: this.index, signal: this.current }); };

  Run.prototype.typeAt = function (i) { return VR.SIGNAL_TYPE[this.plan[i]]; };
  Run.prototype.length = function () { return this.plan.length; };
  Run.prototype.maxTotal = function () {
    var v = 0; for (var i = 0; i < this.plan.length; i++) v += this.plan[i] === 'V' ? VR.SCORING_CONFIG.max_signal : 100; return v;
  };
  Run.prototype.total = function () { return this.signals.reduce(function (s, x) { return s + (x.score ? x.score.vantarank : 0); }, 0); };

  Run.prototype.start = function () {
    this._require('IDLE');
    this.index = -1;
    this.next();
    return this;
  };

  /** Advance to the next signal (or end the run). */
  Run.prototype.next = function () {
    if (this.state !== 'IDLE' && this.state !== 'SCORED') throw new Error('Run: next() from ' + this.state);
    this.index += 1;
    if (this.index >= this.plan.length) return this._end();
    var q = this.questions[this.index];
    this.current = {
      i: this.index, type: this.typeAt(this.index), question_id: q.question_id, prompt: q.prompt, category: q.category,
      contract: null, input: null, normalised: null, canonical: null, status: null, band: null, resolution: null, freq: null, score: null, answered_at: null
    };
    this.signals[this.index] = this.current;
    this._set('SIGNAL_INTRO');
    this.emit('signal', { index: this.index, type: this.current.type, question: q, total: this.plan.length });
    return this;
  };

  /** Leave the intro: Vanta rounds demand a contract first, everything else goes straight to typing. */
  Run.prototype.begin = function () {
    this._require('SIGNAL_INTRO');
    this._set(this.current.type === 'vanta' ? 'CONTRACT' : 'ANSWER');
    return this;
  };

  Run.prototype.chooseContract = function (id) {
    this._require('CONTRACT');
    if (!VR.SCORING_CONFIG.vanta[id]) throw new Error('unknown contract ' + id);
    this.current.contract = id;
    this.emit('contract', { index: this.index, contract: id });
    this._set('ANSWER');
    return this;
  };

  /**
   * Lock an answer. Shape problems (empty, no letters…) are refused and the state stays ANSWER;
   * everything else — including a listed reject and an unmeasured answer — locks and is scored at reveal.
   * @returns {{locked:boolean, resolution:object}}
   */
  Run.prototype.submitAnswer = function (text) {
    this._require('ANSWER');
    var q = this.questions[this.index];
    var res = VR.resolve(q, text);
    if (res.status === 'INVALID' && res.reason !== 'listed as not an answer to this prompt') {
      this.emit('refused', { index: this.index, resolution: res });
      return { locked: false, resolution: res };
    }
    var c = this.current;
    c.input = res.input; c.normalised = res.normalised; c.canonical = res.canonical; c.status = res.status; c.resolution = res;
    c.answered_at = new Date().toISOString();
    this.emit('locked', { index: this.index, resolution: res });
    this._set('PREDICT');
    return { locked: true, resolution: res };
  };

  Run.prototype.predict = function (bandId) {
    this._require('PREDICT');
    if (!VR.bandById(bandId)) throw new Error('unknown band ' + bandId);
    this.current.band = bandId;
    this.emit('predict', { index: this.index, band: bandId });
    return this;
  };

  /** Commit the prediction: frequency + score are computed here, once, from the frozen dataset. */
  Run.prototype.commit = function () {
    this._require('PREDICT');
    var c = this.current;
    if (!c.band) throw new Error('Run: commit without a prediction');
    var q = this.questions[this.index];
    var res = c.resolution;
    var freq = null;
    if (res.status === 'VALID') freq = VR.frequency(q, res.answer);
    else if (res.status === 'VALID_UNMEASURED' || res.status === 'UNMEASURED') freq = VR.frequency(q, null);
    c.freq = freq ? {
      count: freq.count, sample_size: freq.sample_size, support: freq.support,
      raw_rate: freq.raw_rate, scoring_rate: freq.scoring_rate,
      interval_lo: freq.interval_lo, interval_hi: freq.interval_hi,
      confidence: freq.confidence, confidence_label: freq.confidence_label
    } : null;
    c.score = VR.scoreSignal({ type: c.type, resolution: res, freq: freq, bandId: c.band, contract: c.contract });
    this._set('REVEAL');
    this.emit('reveal', { index: this.index, signal: c, question: q, profile: VR.questionProfile(q), total: this.total() });
    return c;
  };

  Run.prototype.revealDone = function () {
    this._require('REVEAL');
    this._set('SCORED');
    this.emit('scored', { index: this.index, signal: this.current, total: this.total() });
    return this;
  };

  Run.prototype._end = function () {
    this.ended_at = new Date().toISOString();
    this._set('RUN_END');
    var r = this.receipt();
    this.emit('end', r);
    return this;
  };

  /** Abandon mid-run (restart). No receipt is produced. */
  Run.prototype.abandon = function () { this._set('ABANDONED'); this.emit('abandoned', { index: this.index }); return this; };

  function summarise(signals, plan) {
    var std = [], mir = [], all = [], van = null, black = 0, perfect = 0;
    signals.forEach(function (s) {
      if (!s || !s.score) return;
      all.push(s);
      if (s.type === 'mirror') mir.push(s);
      else if (s.type === 'vanta') van = s;
      else std.push(s);
      if (s.score.flags.black_signal) black++;
      if (s.score.flags.perfect_calibration) perfect++;
    });
    function mean(arr, f) { if (!arr.length) return null; return Math.round(arr.reduce(function (a, s) { return a + f(s); }, 0) / arr.length); }
    var oList = std.concat(van ? [van] : []);
    return {
      originality_mean: mean(oList, function (s) { return s.score.main; }),
      calibration_mean: mean(all, function (s) { return s.score.calibration; }),
      mirror_consensus_mean: mean(mir, function (s) { return s.score.main; }),
      mirror_mean: mean(mir, function (s) { return s.score.vantarank; }),
      vanta: van ? { contract: van.contract, met: van.score.contract_met, multiplier: van.score.multiplier, vantarank: van.score.vantarank } : null,
      black_signals: black, perfect_calibrations: perfect,
      valid: all.filter(function (s) { return s.status === 'VALID'; }).length,
      unmeasured: all.filter(function (s) { return s.status === 'UNMEASURED' || s.status === 'VALID_UNMEASURED'; }).length,
      invalid: all.filter(function (s) { return s.status === 'INVALID'; }).length
    };
  }

  /** The run receipt: everything needed to reproduce the score. No UI state, no timings beyond timestamps. */
  Run.prototype.receipt = function () {
    var self = this;
    return {
      receipt_version: VR.RECEIPT_VERSION,
      run_id: this.run_id, mode: this.mode, label: this.label,
      started_at: this.started_at, ended_at: this.ended_at,
      dataset_version: this.dataset_version, dataset_id: this.dataset_id, engine_version: this.engine_version,
      seed: this.seed, plan: this.plan,
      question_ids: this.questions.map(function (q) { return q.question_id; }),
      signals: this.signals.map(function (s) {
        return {
          i: s.i, type: s.type, question_id: s.question_id, prompt: s.prompt, category: s.category,
          contract: s.contract, input: s.input, normalised: s.normalised, canonical: s.canonical, status: s.status, band: s.band,
          freq: s.freq ? VR.deepClone(s.freq) : null, score: s.score ? VR.deepClone(s.score) : null, answered_at: s.answered_at
        };
      }),
      total: this.total(), max_total: this.maxTotal(),
      summary: summarise(this.signals, this.plan)
    };
  };

  /**
   * Reconstruct a receipt's scores from scratch using the named dataset version + this engine.
   * A future server runs exactly this against its own copy of the dataset.
   */
  function reconstruct(receipt, datasets) {
    var ds = datasets[receipt.dataset_version];
    if (!ds) return { ok: false, reason: 'dataset version not available: ' + receipt.dataset_version, total: null, expected: receipt.total, mismatches: [] };
    var byId = {}; ds.questions.forEach(function (q) { byId[q.question_id] = q; });
    var total = 0, mismatches = [];
    (receipt.signals || []).forEach(function (s) {
      var q = byId[s.question_id];
      if (!q) { mismatches.push({ i: s.i, reason: 'question missing: ' + s.question_id }); return; }
      var res = VR.resolve(q, s.input);
      var freq = null;
      if (res.status === 'VALID') freq = VR.frequency(q, res.answer);
      else if (res.status === 'VALID_UNMEASURED' || res.status === 'UNMEASURED') freq = VR.frequency(q, null);
      var sc = VR.scoreSignal({ type: s.type, resolution: res, freq: freq, bandId: s.band, contract: s.contract });
      total += sc.vantarank;
      if (!s.score || sc.vantarank !== s.score.vantarank || res.canonical !== s.canonical || res.status !== s.status) {
        mismatches.push({ i: s.i, expected: s.score ? s.score.vantarank : null, got: sc.vantarank, expected_canonical: s.canonical, got_canonical: res.canonical });
      }
    });
    var engineMatch = receipt.engine_version === VR.ENGINE_VERSION;
    return { ok: mismatches.length === 0 && total === receipt.total && engineMatch, total: total, expected: receipt.total, mismatches: mismatches, engine_version_match: engineMatch, dataset_version: receipt.dataset_version };
  }

  VR.Run = Run;
  VR.selectQuestions = selectQuestions;
  VR.summarise = summarise;
  VR.reconstruct = reconstruct;
})(typeof window !== 'undefined' ? window : this);

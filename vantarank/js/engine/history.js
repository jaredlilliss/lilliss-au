/* VANTARANK — local history, settings and the calibration profile.
 * Everything is stored in localStorage under VR.STORAGE_KEY. No account, no network, no analytics.
 * The profile is GAME STATISTICS ONLY. It never names a trait, a type, an ability or a diagnosis.
 */
(function (root) {
  'use strict';
  var VR = root.VR || (root.VR = {});

  var DEFAULTS = {
    version: 1,
    settings: { sound: true, motion: 'auto', contrast: false, practice_done: false, name: '' },
    runs: [],           // receipts, newest last
    daily: {},          // 'YYYY-MM-DD' → run_id
    survey: []          // opt-in survey answers (separate cohort, never merged into play data)
  };
  var mem = null;

  function load() {
    if (mem) return mem;
    var raw = null;
    try { raw = root.localStorage ? root.localStorage.getItem(VR.STORAGE_KEY) : null; } catch (e) { raw = null; }
    var st = null;
    if (raw) { try { st = JSON.parse(raw); } catch (e) { st = null; } }
    if (!st || st.version !== 1) st = VR.deepClone(DEFAULTS);
    st.settings = Object.assign({}, DEFAULTS.settings, st.settings || {});
    st.runs = st.runs || []; st.daily = st.daily || {}; st.survey = st.survey || [];
    mem = st;
    return st;
  }
  function save() {
    var st = load();
    try { if (root.localStorage) root.localStorage.setItem(VR.STORAGE_KEY, JSON.stringify(st)); return true; } catch (e) { return false; }
  }
  function reset() {
    mem = VR.deepClone(DEFAULTS);
    try { if (root.localStorage) root.localStorage.removeItem(VR.STORAGE_KEY); } catch (e) { /* ignore */ }
    return mem;
  }

  var settings = {
    get: function (k) { return load().settings[k]; },
    set: function (k, v) { load().settings[k] = v; save(); return v; },
    all: function () { return load().settings; }
  };

  function addRun(receipt) {
    var st = load();
    if (receipt.mode === 'practice') return false;      // practice never enters the record
    st.runs.push(receipt);
    if (st.runs.length > 400) st.runs = st.runs.slice(-400);
    if (receipt.mode === 'daily' && receipt.label) st.daily[receipt.label] = receipt.run_id;
    save();
    return true;
  }
  function runs() { return load().runs.slice(); }
  function dailyDone(dateKey) { return load().daily[dateKey] || null; }

  /** Every scored signal ever played, flattened for the Constellation. */
  function answers() {
    var out = [];
    load().runs.forEach(function (r) {
      (r.signals || []).forEach(function (s) {
        if (!s.score || s.status === 'INVALID') return;
        out.push({
          run_id: r.run_id, mode: r.mode, date: (s.answered_at || r.started_at || '').slice(0, 10), dataset_version: r.dataset_version,
          question_id: s.question_id, prompt: s.prompt, category: s.category, type: s.type,
          input: s.input, canonical: s.canonical, status: s.status, band: s.band,
          rate: s.score.rate_used, raw_rate: s.freq ? s.freq.raw_rate : null, support: s.freq ? s.freq.support : null,
          main: s.score.main, main_label: s.score.main_label, calibration: s.score.calibration, vantarank: s.score.vantarank,
          flags: s.score.flags
        });
      });
    });
    return out;
  }
  function recentQuestionIds(n) {
    var ids = [];
    var rs = load().runs;
    for (var i = rs.length - 1; i >= 0 && ids.length < n; i--) (rs[i].question_ids || []).forEach(function (id) { if (ids.length < n) ids.push(id); });
    return ids;
  }

  // signed prediction error in decades: + = predicted MORE common than reality (underestimated own rarity)
  function signedError(a) {
    if (!a.band || !(a.rate > 0)) return null;
    var b = VR.bandById(a.band); if (!b) return null;
    var hi = b.hi >= 1 ? VR.AXIS.top : b.hi, lo = b.lo <= 0 ? VR.AXIS.floor : b.lo;
    var centre = (VR.log10(hi) + VR.log10(lo)) / 2;
    return centre - VR.log10(VR.clamp(a.rate, VR.AXIS.floor, VR.AXIS.top));
  }
  var BAND_DECADES = 0.27;   // a typical band is ~0.27 decades tall; used to express error "in bands"

  function stats() {
    var rs = load().runs, A = answers();
    var scored = A.filter(function (a) { return a.status === 'VALID'; });   // profile statistics use supported answers only
    function mean(arr, f) { if (!arr.length) return null; return arr.reduce(function (s, x) { return s + f(x); }, 0) / arr.length; }
    var errs = scored.map(signedError).filter(function (e) { return e != null; });
    var meanSigned = errs.length ? errs.reduce(function (s, e) { return s + e; }, 0) / errs.length : null;
    var meanAbs = errs.length ? errs.reduce(function (s, e) { return s + Math.abs(e); }, 0) / errs.length : null;
    var over = errs.filter(function (e) { return e < -BAND_DECADES / 2; }).length;   // predicted rarer than reality → overestimated originality
    var under = errs.filter(function (e) { return e > BAND_DECADES / 2; }).length;

    var cats = {};
    scored.forEach(function (a) {
      var c = cats[a.category] || (cats[a.category] = { category: a.category, n: 0, v: 0, err: 0, errN: 0 });
      c.n++; c.v += a.vantarank; var e = signedError(a); if (e != null) { c.err += e; c.errN++; }
    });
    var catList = Object.keys(cats).map(function (k) { var c = cats[k]; return { category: c.category, n: c.n, mean_v: c.v / c.n, mean_err: c.errN ? c.err / c.errN : null }; });
    var eligible = catList.filter(function (c) { return c.n >= 3; }).sort(function (x, y) { return y.mean_v - x.mean_v; });

    var mir = scored.filter(function (a) { return a.type === 'mirror'; });
    var van = A.filter(function (a) { return a.type === 'vanta'; });
    var vanMet = van.filter(function (a) { return a.flags && a.flags.contract_met === true; });
    // contract_met lives on the score, not flags — read from runs
    var contracts = { safe: { n: 0, met: 0 }, dark: { n: 0, met: 0 }, blackout: { n: 0, met: 0 } };
    rs.forEach(function (r) { (r.signals || []).forEach(function (s) { if (s.type === 'vanta' && s.contract && s.score) { contracts[s.contract].n++; if (s.score.contract_met) contracts[s.contract].met++; } }); });
    var vantaN = contracts.safe.n + contracts.dark.n + contracts.blackout.n;
    var vantaMet = contracts.safe.met + contracts.dark.met + contracts.blackout.met;

    var rare = scored.filter(function (a) { return a.band === 'bot5' || a.band === 'bot1'; });
    var rareErr = mean(rare.map(signedError).filter(function (e) { return e != null; }), function (e) { return e; });

    return {
      runs: rs.length, signals: A.length, supported: scored.length,
      best_total: rs.length ? Math.max.apply(null, rs.map(function (r) { return r.total; })) : null,
      mean_total: mean(rs, function (r) { return r.total; }),
      mean_originality: mean(scored.filter(function (a) { return a.type !== 'mirror'; }), function (a) { return a.main; }),
      mean_calibration: mean(scored, function (a) { return a.calibration; }),
      mean_signed_error_decades: meanSigned, mean_abs_error_decades: meanAbs,
      mean_abs_error_bands: meanAbs != null ? meanAbs / BAND_DECADES : null,
      overestimate_share: errs.length ? over / errs.length : null,
      underestimate_share: errs.length ? under / errs.length : null,
      categories: catList, best_categories: eligible.slice(0, 3), worst_categories: eligible.slice(-3).reverse(),
      mirror: { n: mir.length, mean_consensus: mean(mir, function (a) { return a.main; }), mean_calibration: mean(mir, function (a) { return a.calibration; }), mean_v: mean(mir, function (a) { return a.vantarank; }) },
      vanta: { n: vantaN, met: vantaMet, rate: vantaN ? vantaMet / vantaN : null, contracts: contracts },
      rare_predictions: { n: rare.length, mean_err: rareErr },
      black_signals: A.filter(function (a) { return a.flags && a.flags.black_signal; }).length,
      perfect_calibrations: A.filter(function (a) { return a.flags && a.flags.perfect_calibration; }).length,
      _unused: vanMet.length
    };
  }

  /** Plain statements in game language. Never a trait, never a diagnosis. */
  function statements() {
    var s = stats(), out = [];
    if (s.supported < 6) { out.push('PLAY MORE SIGNALS TO SEE YOUR PATTERNS.'); return out; }
    var e = s.mean_signed_error_decades;
    if (e != null) {
      if (e < -0.12) out.push('YOU OVERESTIMATE YOUR OWN ORIGINALITY.');
      else if (e > 0.12) out.push('YOU UNDERESTIMATE YOUR OWN ORIGINALITY.');
      else out.push('YOUR SENSE OF THE CROWD IS WELL CENTRED.');
    }
    var withErr = s.categories.filter(function (c) { return c.n >= 3 && c.mean_err != null; });
    if (withErr.length) {
      var lowest = withErr.slice().sort(function (a, b) { return a.mean_err - b.mean_err; })[0];
      var highest = withErr.slice().sort(function (a, b) { return b.mean_err - a.mean_err; })[0];
      if (lowest.mean_err < -0.15) out.push("YOU UNDERESTIMATE THE CROWD'S LOVE OF " + lowest.category.toUpperCase() + ' ANSWERS.');
      if (highest.mean_err > 0.15 && highest !== lowest) out.push('YOUR ' + highest.category.toUpperCase() + ' ANSWERS ARE RARER THAN YOU THINK.');
    }
    if (s.rare_predictions.n >= 3 && s.rare_predictions.mean_err != null && s.rare_predictions.mean_err < -0.2) out.push('YOUR RAREST ANSWERS ARE MORE PREDICTABLE THAN YOU THINK.');
    if (s.mirror.n >= 2) {
      if (s.mirror.mean_consensus >= 70) out.push('IN THE MIRROR, YOU FIND THE CROWD.');
      else if (s.mirror.mean_consensus < 45) out.push('IN THE MIRROR, THE CROWD KEEPS SLIPPING PAST YOU.');
    }
    if (s.vanta.n >= 2) {
      var pct = Math.round(100 * s.vanta.rate);
      out.push('DARK CONTRACTS MET: ' + s.vanta.met + ' OF ' + s.vanta.n + ' (' + pct + '%).');
    }
    if (s.best_categories.length) out.push('STRONGEST FIELD: ' + s.best_categories[0].category.toUpperCase() + '.');
    if (s.worst_categories.length && s.worst_categories[0] !== s.best_categories[0]) out.push('WEAKEST FIELD: ' + s.worst_categories[0].category.toUpperCase() + '.');
    return out;
  }

  // ---------- opt-in survey mode (separate cohort; never merged into the play dataset) ----------
  function addSurveyResponse(entry) {
    var st = load();
    st.survey.push({ question_id: entry.question_id, dataset_version: entry.dataset_version, cohort: entry.cohort || 'VANTARANK PLAYER PANEL LOCAL v0', input: entry.input, normalised: VR.normalise(entry.input), at: new Date().toISOString(), consent: !!entry.consent });
    save();
  }
  function surveyExport() { return { cohort: 'VANTARANK PLAYER PANEL LOCAL v0', exported_at: new Date().toISOString(), note: 'Local opt-in responses. Not representative of any population. Never merged into play data.', responses: load().survey.slice() }; }

  VR.history = {
    load: load, save: save, reset: reset, settings: settings,
    addRun: addRun, runs: runs, answers: answers, recentQuestionIds: recentQuestionIds, dailyDone: dailyDone,
    stats: stats, statements: statements, signedError: signedError, BAND_DECADES: BAND_DECADES,
    addSurveyResponse: addSurveyResponse, surveyExport: surveyExport
  };
})(typeof window !== 'undefined' ? window : this);

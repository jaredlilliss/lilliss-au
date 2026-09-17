/* VANTARANK — confidence-aware frequency engine.
 *
 * Two numbers are kept apart at all times:
 *   raw_rate       = count / sample_size          (what was observed; shown as OBSERVED)
 *   scoring_rate   = the game-adjusted rate       (what the scoring engine uses; shown as SCORED AT)
 *
 * scoring_rate:
 *   MEASURED   (count >= min_support)  posterior mean of a Beta(prior_a, prior_b) prior — mild shrinkage toward ~1%
 *   THIN       (0 < count < min_support) the LARGER of the posterior mean and the Wilson upper bound —
 *              we refuse to award rarity the sample cannot support (1 of 10 scores as ~28%, not 10%)
 *   UNMEASURED (no count)              the Wilson upper bound of 0/n — a provisional floor that shrinks as
 *              samples grow (0 of 3,000 → ~0.05%; 0 of 10 → ~14%). Never 0%.
 *
 * confidence: 1 − (width of the Wilson interval in decades) / 2, clamped to [0,1]; 0 for unmeasured.
 * Labels: HIGH ≥ 0.8, MEDIUM ≥ 0.5, else LOW. See docs/DATA_ENGINE.md for the worked numbers.
 */
(function (root) {
  'use strict';
  var VR = root.VR || (root.VR = {});

  VR.FREQ_CONFIG = {
    z: 1.2816,          // one-sided 90% (two-sided 80%) normal quantile for the Wilson interval
    min_support: 5,     // counts below this are THIN
    prior_a: 0.5,       // Beta prior pseudo-successes
    prior_b: 50,        // Beta prior pseudo-failures  → prior mean ≈ 1%
    high: 0.8,
    medium: 0.5
  };

  function wilson(k, n, z) {
    if (!(n > 0)) return { lo: 0, hi: 1, centre: 0.5 };
    var p = k / n, z2 = z * z;
    var denom = 1 + z2 / n;
    var centre = (p + z2 / (2 * n)) / denom;
    var half = z * Math.sqrt(p * (1 - p) / n + z2 / (4 * n * n)) / denom;
    return { lo: Math.max(0, centre - half), hi: Math.min(1, centre + half), centre: centre };
  }

  function posteriorMean(k, n, a, b) { return (k + a) / (n + a + b); }

  /**
   * @param question  a dataset question (needs sample_size)
   * @param answer    the matched answer record ({count}) or null when unmeasured
   * @param cfg       optional override of VR.FREQ_CONFIG
   */
  function frequency(question, answer, cfg) {
    cfg = cfg || VR.FREQ_CONFIG;
    var n = question.sample_size | 0;
    var k = answer && answer.count > 0 ? answer.count | 0 : 0;
    var raw = n > 0 ? k / n : 0;
    var w = wilson(k, n, cfg.z);
    var pm = posteriorMean(k, n, cfg.prior_a, cfg.prior_b);
    var support = answer ? (k >= cfg.min_support ? 'MEASURED' : 'THIN') : 'UNMEASURED';
    var scoring = support === 'MEASURED' ? pm : Math.max(pm, w.hi);
    var conf = 0;
    if (support !== 'UNMEASURED' && w.lo > 0) {
      var widthDecades = VR.log10(w.hi / w.lo);
      conf = VR.clamp(1 - widthDecades / 2, 0, 1);
    }
    var label = conf >= cfg.high ? 'HIGH' : (conf >= cfg.medium ? 'MEDIUM' : 'LOW');
    if (support === 'UNMEASURED') label = 'NONE';
    return {
      count: k, sample_size: n, support: support,
      raw_rate: raw, scoring_rate: scoring,
      interval_lo: w.lo, interval_hi: w.hi,
      confidence: VR.round(conf, 3), confidence_label: label,
      posterior_mean: pm
    };
  }

  /** Sorted profile of a question for the field and the data panel. */
  function questionProfile(question, cfg) {
    var n = question.sample_size | 0;
    var listed = 0;
    var answers = (question.answers || []).slice().sort(function (a, b) { return b.count - a.count; }).map(function (a) {
      listed += a.count;
      var f = frequency(question, a, cfg);
      return { canonical: a.canonical, count: a.count, raw_rate: f.raw_rate, scoring_rate: f.scoring_rate, support: f.support, confidence_label: f.confidence_label };
    });
    return {
      question_id: question.question_id, sample_size: n, answers: answers,
      listed_mass: n ? listed / n : 0, tail_mass: n ? Math.max(0, n - listed) / n : 0,
      top_rate: answers.length ? answers[0].raw_rate : 0
    };
  }

  VR.wilson = wilson;
  VR.frequency = frequency;
  VR.questionProfile = questionProfile;
})(typeof window !== 'undefined' ? window : this);

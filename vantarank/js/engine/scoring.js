/* VANTARANK — scoring model. All numbers here are configurable through VR.SCORING_CONFIG and
 * documented in docs/DATA_ENGINE.md. A change to any constant is an ENGINE_VERSION bump.
 *
 *   rate            the scoring_rate from the frequency engine (never the raw rate)
 *   ORIGINALITY  O  piecewise-linear in log10(rate) through the anchor table (50% → 0 … ≤0.1% → 100)
 *   CONSENSUS    M  Mirror rounds replace O with M = 100 − O (being common is the goal)
 *   CALIBRATION  C  100 at the centre of the predicted band, 88 at its edge, then falls to 0 at
 *                   `outside_zero_decades` beyond the nearest edge (in log10 units)
 *   VANTARANK    V  a floored geometric blend of the main score and C: neither can rescue the other
 *                   V = 100 · (√((f+(1−f)·A/100)^{2w_a} · (f+(1−f)·C/100)^{2w_c}) − f) / (1 − f)
 *                   with f = 0.15 and w_a = w_c = 0.5 → (100,100)=100 · (100,0)=28 · (0,100)=28 · (65,100)=81
 *   VANTA           a contract chosen before typing; met → ×mult, failed → ×(1/mult)
 */
(function (root) {
  'use strict';
  var VR = root.VR || (root.VR = {});

  // The nine prediction bands, top (most common) to bottom (rarest). hi is exclusive except the top band.
  VR.BANDS = [
    { id: 'top1',  label: 'TOP 1%',     range: '32% or more', hint: '1 in 3 people or more say it', hi: 1,      lo: 0.32   },
    { id: 'top5',  label: 'TOP 5%',     range: '18–32%',      hint: 'about 1 in 4',                 hi: 0.32,   lo: 0.18   },
    { id: 'top10', label: 'TOP 10%',    range: '10–18%',      hint: 'about 1 in 7',                 hi: 0.18,   lo: 0.10   },
    { id: 'top25', label: 'TOP 25%',    range: '6–10%',       hint: 'about 1 in 13',                hi: 0.10,   lo: 0.06   },
    { id: 'mid',   label: 'MIDDLE',     range: '3.2–6%',      hint: 'about 1 in 23',                hi: 0.06,   lo: 0.032  },
    { id: 'bot25', label: 'BOTTOM 25%', range: '1.8–3.2%',    hint: 'about 1 in 40',                hi: 0.032,  lo: 0.018  },
    { id: 'bot10', label: 'BOTTOM 10%', range: '0.9–1.8%',    hint: 'about 1 in 80',                hi: 0.018,  lo: 0.009  },
    { id: 'bot5',  label: 'BOTTOM 5%',  range: '0.35–0.9%',   hint: 'about 1 in 180',               hi: 0.009,  lo: 0.0035 },
    { id: 'bot1',  label: 'BOTTOM 1%',  range: 'under 0.35%', hint: '1 in 300 or fewer',            hi: 0.0035, lo: 0      }
  ];
  // The field's vertical axis is log10(rate) between these two rates (top of screen → bottom).
  VR.AXIS = { top: 0.6, floor: 0.0004 };

  VR.SCORING_CONFIG = {
    originality_anchors: [ // [rate, score] — interpolated in log10(rate)
      [0.001, 100], [0.002, 98], [0.005, 94], [0.01, 88], [0.02, 80], [0.05, 65], [0.10, 45], [0.20, 25], [0.50, 0]
    ],
    calibration: { inside_max: 100, inside_edge: 88, outside_zero_decades: 0.75 },
    blend: { floor: 0.15, w_main: 0.5, w_cal: 0.5 },
    unmeasured: { originality_scale: 0.6, calibration_scale: 0.75 },   // provisional scores for unsupported answers
    vanta: {
      safe:     { label: 'PLAY SAFE', rule: 'answer scores above 10%',  threshold: 0.10, dir: 'above', mult: 1.25 },
      dark:     { label: 'GO DARK',   rule: 'answer scores below 10%',  threshold: 0.10, dir: 'below', mult: 1.5  },
      blackout: { label: 'BLACKOUT',  rule: 'answer scores below 2%',   threshold: 0.02, dir: 'below', mult: 2.0  }
    },
    perfect_calibration: 97,                        // thin white shockwave
    black_signal: { min_originality: 96, min_calibration: 94 }, // near-black screen, answer alone
    mirror_lock: { min_consensus: 95, min_calibration: 94 },
    max_signal: 200                                 // hard cap on a single signal (blackout met on a 100)
  };

  function bandById(id) { for (var i = 0; i < VR.BANDS.length; i++) if (VR.BANDS[i].id === id) return VR.BANDS[i]; return null; }
  function bandOf(rate) {
    for (var i = 0; i < VR.BANDS.length; i++) { var b = VR.BANDS[i]; if (rate >= b.lo && (i === 0 || rate < b.hi)) return b; }
    return VR.BANDS[VR.BANDS.length - 1];
  }
  function bandIndex(id) { for (var i = 0; i < VR.BANDS.length; i++) if (VR.BANDS[i].id === id) return i; return -1; }
  // Effective log edges (the open-ended bands are closed at the axis limits)
  function bandLog(b) {
    var hi = b.hi >= 1 ? VR.AXIS.top : b.hi;
    var lo = b.lo <= 0 ? VR.AXIS.floor : b.lo;
    return { lhi: VR.log10(hi), llo: VR.log10(lo) };
  }
  /** 0 = top of the field (very common), 1 = bottom (very rare). */
  function yOf(rate) {
    var r = VR.clamp(rate, VR.AXIS.floor, VR.AXIS.top);
    var lt = VR.log10(VR.AXIS.top), lf = VR.log10(VR.AXIS.floor);
    return (lt - VR.log10(r)) / (lt - lf);
  }
  function yOfBandCentre(id) { var b = bandById(id); var L = bandLog(b); return yOf(Math.pow(10, (L.lhi + L.llo) / 2)); }
  function yOfBandEdges(id) { var b = bandById(id); var L = bandLog(b); return { top: yOf(Math.pow(10, L.lhi)), bottom: yOf(Math.pow(10, L.llo)) }; }

  function originality(rate, cfg) {
    cfg = cfg || VR.SCORING_CONFIG;
    var pts = cfg.originality_anchors.map(function (p) { return [VR.log10(p[0]), p[1]]; });
    return VR.clamp(VR.piecewise(pts, VR.log10(Math.max(rate, 1e-9))), 0, 100);
  }
  function consensus(rate, cfg) { return 100 - originality(rate, cfg); }

  function calibration(rate, bandId, cfg) {
    cfg = cfg || VR.SCORING_CONFIG;
    var b = bandById(bandId); if (!b) return 0;
    var c = cfg.calibration;
    var L = bandLog(b);
    var lr = VR.log10(VR.clamp(rate, VR.AXIS.floor, VR.AXIS.top));
    if (lr <= L.lhi + 1e-12 && lr >= L.llo - 1e-12) {
      var centre = (L.lhi + L.llo) / 2, half = (L.lhi - L.llo) / 2;
      var u = half > 0 ? Math.abs(lr - centre) / half : 0;
      return VR.clamp(c.inside_max - (c.inside_max - c.inside_edge) * u, 0, 100);
    }
    var d = lr > L.lhi ? lr - L.lhi : L.llo - lr;
    return VR.clamp(c.inside_edge * Math.max(0, 1 - d / c.outside_zero_decades), 0, 100);
  }

  function blend(main, cal, cfg) {
    cfg = cfg || VR.SCORING_CONFIG;
    var f = cfg.blend.floor, wa = cfg.blend.w_main, wc = cfg.blend.w_cal;
    var gx = f + (1 - f) * VR.clamp(main, 0, 100) / 100;
    var gy = f + (1 - f) * VR.clamp(cal, 0, 100) / 100;
    var g = Math.pow(gx, wa) * Math.pow(gy, wc);           // weighted geometric mean (wa + wc = 1)
    return VR.clamp(100 * (g - f) / (1 - f), 0, 100);
  }

  /**
   * Score one signal.
   * @param p {type:'standard'|'mirror'|'vanta', resolution, freq, bandId, contract}
   *   resolution: from VR.resolve; freq: from VR.frequency (null when INVALID)
   */
  function scoreSignal(p, cfg) {
    cfg = cfg || VR.SCORING_CONFIG;
    var type = p.type || 'standard';
    var status = p.resolution ? p.resolution.status : 'INVALID';
    var isMirror = type === 'mirror';
    var out = {
      type: type, status: status, band: p.bandId || null,
      main_label: isMirror ? 'CONSENSUS' : 'ORIGINALITY',
      rate_used: 0, main: 0, calibration: 0, base: 0, multiplier: 1, contract: p.contract || null, contract_met: null,
      vantarank: 0, flags: { invalid: false, unmeasured: false, thin: false, perfect_calibration: false, black_signal: false, mirror_lock: false }
    };
    if (status === 'INVALID' || !p.freq) { out.flags.invalid = true; return out; }

    var rate = p.freq.scoring_rate;
    out.rate_used = rate;
    var unmeasured = (status === 'UNMEASURED' || status === 'VALID_UNMEASURED');
    out.flags.unmeasured = unmeasured;
    out.flags.thin = p.freq.support === 'THIN';

    var main = isMirror ? consensus(rate, cfg) : originality(rate, cfg);
    var cal = p.bandId ? calibration(rate, p.bandId, cfg) : 0;
    if (unmeasured) { main *= cfg.unmeasured.originality_scale; cal *= cfg.unmeasured.calibration_scale; }
    out.main = Math.round(main);
    out.calibration = Math.round(cal);
    out.base = Math.round(blend(out.main, out.calibration, cfg));

    if (type === 'vanta' && p.contract && cfg.vanta[p.contract]) {
      var k = cfg.vanta[p.contract];
      var met = !unmeasured && (k.dir === 'above' ? rate > k.threshold : rate < k.threshold);
      out.contract_met = met;
      out.multiplier = met ? k.mult : VR.round(1 / k.mult, 4);
    }
    out.vantarank = Math.min(cfg.max_signal, Math.round(out.base * out.multiplier));

    if (!unmeasured) {
      out.flags.perfect_calibration = out.calibration >= cfg.perfect_calibration;
      if (!isMirror) out.flags.black_signal = out.main >= cfg.black_signal.min_originality && out.calibration >= cfg.black_signal.min_calibration;
      else out.flags.mirror_lock = out.main >= cfg.mirror_lock.min_consensus && out.calibration >= cfg.mirror_lock.min_calibration;
    }
    return out;
  }

  VR.bandById = bandById;
  VR.bandOf = bandOf;
  VR.bandIndex = bandIndex;
  VR.yOf = yOf;
  VR.yOfBandCentre = yOfBandCentre;
  VR.yOfBandEdges = yOfBandEdges;
  VR.originality = originality;
  VR.consensus = consensus;
  VR.calibration = calibration;
  VR.blend = blend;
  VR.scoreSignal = scoreSignal;
})(typeof window !== 'undefined' ? window : this);

/* VANTARANK — THE CONSTELLATION. Every valid answer the player has ever given, drawn as a sky.
 *
 *   x           the question's category: fixed columns in dataset order (categories the dataset no
 *               longer lists are appended alphabetically so no point is ever dropped)
 *   y           population rarity, log10(rate) through VR.yOf — the FIELD's own axis: common at the top,
 *               rare at the bottom, the nine band edges drawn as faint guides
 *   brightness  CALIBRATION — 0 is a dim graphite-blue ember, 100 is hot white inside a violet halo
 *   shape       SIGNAL = dot · MIRROR = small ring · VANTA = diamond · BLACK SIGNAL adds a thin white ring
 *
 * A seeded haze sits behind everything so the first constellation already looks like a sky. A point's
 * horizontal jitter is a hash of question_id + canonical, so it sits in the same place on every render.
 * The canvas is focusable: arrow keys walk the points by date, Escape closes the detail; hover or tap picks
 * the nearest point within 18px. Reduced motion draws once with no twinkle; high contrast brightens points,
 * lifts the guides and thickens every ring.
 *
 * This is gameplay history — a record of answers and predictions. It names no trait and describes no person.
 * It owns its own rAF loop, resize observer and document.hidden pause; the controller only calls
 * setOptions() and setData().
 */
(function (root) {
  'use strict';
  var VR = root.VR || (root.VR = {});
  var doc = root.document;

  var PAL = VR.PALETTE || {
    bg: [5, 6, 10], graphite: [26, 28, 36], ivory: [239, 233, 220], violet: [124, 58, 237], violet2: [167, 139, 250],
    blue: [59, 130, 246], blue2: [96, 165, 250], white: [255, 255, 255]
  };
  var DIM = [58, 76, 128];              // graphite-blue: a point with no calibration to speak of
  var FONT = 'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
  var HIT_RADIUS = 18;                  // CSS px
  var FRAME_MS = 38;                    // ~26 fps is plenty for a twinkle
  var SIMULATED = 'SIMULATED DATA FOR PROTOTYPE GAMEPLAY';
  var MAX_HAZE = 1800, MIN_HAZE = 250, TWINKLERS = 56;

  function rgba(c, a) { return 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + VR.clamp(a, 0, 1) + ')'; }
  function mix(a, b, t) { return [Math.round(a[0] + (b[0] - a[0]) * t), Math.round(a[1] + (b[1] - a[1]) * t), Math.round(a[2] + (b[2] - a[2]) * t)]; }
  function up(s) { return String(s == null ? '' : s).toUpperCase(); }
  function setFont(c, font) { c.font = font; try { if ('letterSpacing' in c) c.letterSpacing = '0.08em'; } catch (e) { /* ignore */ } }
  function wrapWords(c, text, maxW) {
    var words = text.split(' '), lines = [], cur = '';
    for (var i = 0; i < words.length; i++) {
      var t = cur ? cur + ' ' + words[i] : words[i];
      if (!cur || c.measureText(t).width <= maxW) cur = t; else { lines.push(cur); cur = words[i]; }
    }
    if (cur) lines.push(cur);
    return lines.slice(0, 3);
  }
  function datasetSource(version) {
    var ds = VR.DATASETS && (VR.DATASETS[version] || VR.DATASETS[VR.DEFAULT_DATASET]);
    return ds && ds.dataset_source ? ds.dataset_source : SIMULATED;
  }

  function Constellation(canvas, tipEl, opts) {
    this.canvas = canvas; this.ctx = canvas.getContext('2d'); this.tip = tipEl || null;
    this.opts = Object.assign({ reducedMotion: false, highContrast: false }, opts || {});
    this.w = 0; this.h = 0; this.dpr = 1;
    this.back = null; this.backCtx = null;        // static layer: ground, haze, guides, labels
    this.cols = []; this.points = []; this.order = []; this.byDate = [];
    this.haze = []; this.twinklers = [];
    this.geo = null;
    this.hover = null; this.sel = null; this.focused = false;
    this.t = 0; this.running = false; this._raf = null; this._timer = null; this._lastTs = 0;
    this._bound = []; this._ro = null;
    this._setupA11y();
    this._bind();
    this.resize();
    this.draw();
    this.start();
  }

  // ---------- public ----------
  Constellation.prototype.setOptions = function (o) {
    Object.assign(this.opts, o || {});
    this._paintStatic();
    this.draw();
    if (this.opts.reducedMotion) this.stop(); else this.start();
  };

  /** points = VR.history.answers(); categories = one entry per dataset question (duplicates allowed). */
  Constellation.prototype.setData = function (points, categories) {
    var seen = {}, cols = [];
    (categories || []).forEach(function (c) { if (c != null && c !== '' && !seen[c]) { seen[c] = true; cols.push(c); } });
    var extra = [];
    (points || []).forEach(function (p) { var c = p.category == null ? '' : p.category; if (!seen[c]) { seen[c] = true; extra.push(c); } });
    extra.sort();
    this.cols = cols.concat(extra);
    var colIndex = {}; this.cols.forEach(function (c, i) { colIndex[c] = i; });

    this.points = (points || []).map(function (src, i) {
      var key = String(src.question_id) + '|' + String(src.canonical == null ? src.input : src.canonical);
      var rng = VR.prng(VR.hash32(key));
      var cal = VR.clamp((src.calibration || 0) / 100, 0, 1);
      var isMirror = src.type === 'mirror';
      var rate = src.rate > 0 ? src.rate : VR.AXIS.floor;
      return {
        src: src, seq: i, key: key, col: colIndex[src.category == null ? '' : src.category] || 0,
        u: rng() * 2 - 1, ph: rng() * Math.PI * 2, sp: 0.8 + rng() * 1.4,
        yf: VR.yOf(rate), cal: cal, type: src.type || 'standard',
        rgb: mix(DIM, isMirror ? PAL.ivory : PAL.white, Math.pow(cal, 0.85)),
        r: 1.5 + 1.8 * cal,
        black: !!(src.flags && src.flags.black_signal),
        date: src.date || '', px: 0, py: 0, di: 0
      };
    });
    this.order = this.points.slice().sort(function (a, b) { return a.cal - b.cal; });   // dim first, bright on top
    this.byDate = this.points.slice().sort(function (a, b) { if (a.date !== b.date) return a.date < b.date ? -1 : 1; return a.seq - b.seq; });
    this.byDate.forEach(function (p, i) { p.di = i; });
    this.hover = null; this.sel = null; this._hideTip();
    this._updateAria();
    this.resize();
    this._layout();
    this._paintStatic();
    this.draw();
    if (!this.opts.reducedMotion) this.start();
  };

  Constellation.prototype.resize = function () {
    var r = this.canvas.getBoundingClientRect();
    var w = Math.round(r.width), h = Math.round(r.height);
    if (w < 1 || h < 1) return false;
    var dpr = Math.min(root.devicePixelRatio || 1, 2);
    if (w === this.w && h === this.h && dpr === this.dpr) return true;
    this.w = w; this.h = h; this.dpr = dpr;
    this.canvas.width = Math.round(w * dpr); this.canvas.height = Math.round(h * dpr);
    this._buildHaze();
    this._layout();
    this._paintStatic();
    return true;
  };

  Constellation.prototype.start = function () {
    if (this.running || this.opts.reducedMotion) return;
    if (doc && doc.hidden) return;
    this.running = true;
    var self = this;
    function frame(ts) {
      if (!self.running) return;
      self._raf = null;
      if (!self._displayed()) {      // the screen is hidden: poll slowly instead of burning frames
        self._timer = root.setTimeout(function () { self._timer = null; if (self.running) self._raf = root.requestAnimationFrame(frame); }, 500);
        return;
      }
      if (ts - self._lastTs >= FRAME_MS) { self._lastTs = ts; self.t = ts / 1000; self.draw(); }
      self._raf = root.requestAnimationFrame(frame);
    }
    this._raf = root.requestAnimationFrame(frame);
  };
  Constellation.prototype.stop = function () {
    this.running = false;
    if (this._raf) root.cancelAnimationFrame(this._raf);
    if (this._timer) root.clearTimeout(this._timer);
    this._raf = null; this._timer = null;
  };
  Constellation.prototype.destroy = function () {
    this.stop();
    this._bound.forEach(function (b) { b[0].removeEventListener(b[1], b[2], b[3]); });
    this._bound = [];
    if (this._ro) { try { this._ro.disconnect(); } catch (e) { /* ignore */ } this._ro = null; }
    this._hideTip();
  };

  // ---------- setup ----------
  Constellation.prototype._setupA11y = function () {
    var cv = this.canvas;
    if (!cv.hasAttribute('tabindex')) cv.tabIndex = 0;
    if (!cv.getAttribute('role')) cv.setAttribute('role', 'img');
    if (this.tip) {
      if (!this.tip.getAttribute('role')) this.tip.setAttribute('role', 'tooltip');
      if (!this.tip.getAttribute('aria-live')) this.tip.setAttribute('aria-live', 'polite');
      if (this.tip.id) cv.setAttribute('aria-describedby', this.tip.id);
      this.tip.hidden = true;
    }
    this._updateAria();
  };
  Constellation.prototype._updateAria = function () {
    var n = this.points.length, k = this.cols.length;
    var label = n
      ? 'VANTARANK constellation: ' + n + ' point' + (n === 1 ? '' : 's') + ' of gameplay history across ' + k + ' categor' + (k === 1 ? 'y' : 'ies') + '. Common answers sit at the top, rare at the bottom; brighter points were better calibrated. Arrow keys step through points by date, Escape closes the detail.'
      : 'VANTARANK constellation: no points yet. Play a run to add gameplay history.';
    this.canvas.setAttribute('aria-label', label);
  };
  Constellation.prototype._bind = function () {
    var self = this, cv = this.canvas;
    function add(target, ev, fn, o) { target.addEventListener(ev, fn, o); self._bound.push([target, ev, fn, o]); }
    add(cv, 'pointermove', function (ev) {
      if (ev.pointerType === 'touch') return;
      var p = self._nearest(ev);
      if (p !== self.hover) { self.hover = p; self._refreshTip(); self.draw(); }
      cv.style.cursor = p ? 'pointer' : '';
    });
    add(cv, 'pointerdown', function (ev) {
      var p = self._nearest(ev);
      self.sel = p; self.hover = ev.pointerType === 'touch' ? null : p;
      self._refreshTip(); self.draw();
    });
    function leave() { cv.style.cursor = ''; if (self.hover) { self.hover = null; self._refreshTip(); self.draw(); } }
    add(cv, 'pointerleave', leave);
    add(cv, 'pointercancel', leave);
    add(cv, 'keydown', function (ev) { self._key(ev); });
    add(cv, 'focus', function () { self.focused = true; self.draw(); });
    add(cv, 'blur', function () { self.focused = false; self.draw(); });
    if (doc) add(doc, 'visibilitychange', function () { if (doc.hidden) self.stop(); else self.start(); });
    if (root.ResizeObserver) {
      this._ro = new root.ResizeObserver(function () { self._onResize(); });
      this._ro.observe(cv);
    } else {
      add(root, 'resize', function () { self._onResize(); });
    }
  };
  Constellation.prototype._onResize = function () {
    if (this.resize()) { this._refreshTip(); this.draw(); }
  };
  Constellation.prototype._displayed = function () {
    var r = this.canvas.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  };

  // ---------- haze + layout ----------
  Constellation.prototype._buildHaze = function () {
    var n = Math.round(VR.clamp((this.w * this.h) / 900, MIN_HAZE, MAX_HAZE));
    var rng = VR.prng(0xc0ffee);
    this.haze = [];
    for (var i = 0; i < n; i++) {
      var x = rng(), y = rng(), tone = rng(), u = rng(), v = rng(), bright = rng() < 0.04;
      var tint = tone < 0.8 ? PAL.blue2 : (tone < 0.95 ? PAL.ivory : PAL.violet2);
      // mostly dim grains skewed toward the faint end; one in twenty-five is a real star. Never brighter than a point.
      var a = bright ? 0.28 + 0.28 * u : 0.05 + 0.22 * Math.pow(u, 1.5);
      var sz = bright ? 1.3 + 0.9 * v : 0.8 + 1.0 * v;
      this.haze.push({ x: x, y: y, sz: sz, a: a * (0.85 + 0.3 * (1 - y)), tint: tint, ph: rng() * Math.PI * 2, sp: 0.5 + rng() * 1.2 });
    }
    this.twinklers = this.haze.slice(0, TWINKLERS);
  };

  Constellation.prototype._layout = function () {
    var w = this.w, h = this.h, c = this.ctx; if (!w || !h) return;
    var cols = this.cols, n = cols.length || 1;
    var padL = 34, padT = 20;
    // the right gutter carries the band names when there is room; it is sized to the widest of them
    setFont(c, '500 9px ' + FONT);
    var bandW = 0;
    for (var b = 0; b < VR.BANDS.length; b++) bandW = Math.max(bandW, c.measureText(VR.BANDS[b].label).width);
    var padR = w >= 560 ? Math.ceil(bandW) + 18 : 12;
    var colW = (w - padL - padR) / n;
    setFont(c, '600 10px ' + FONT);
    var maxWord = 0, maxLabel = 0;
    cols.forEach(function (label) {
      var L = up(label);
      maxLabel = Math.max(maxLabel, c.measureText(L).width);
      L.split(' ').forEach(function (wd) { maxWord = Math.max(maxWord, c.measureText(wd).width); });
    });
    var rotated = cols.length > 0 && maxWord > colW - 6;
    var lines = [], maxLines = 1;
    if (!rotated) cols.forEach(function (label) { var ls = wrapWords(c, up(label), colW - 6); lines.push(ls); maxLines = Math.max(maxLines, ls.length); });
    var padB = cols.length ? (rotated ? Math.min(Math.ceil(maxLabel), 110) + 16 : 12 + maxLines * 12) : 14;
    var plotTop = padT, plotBottom = Math.max(padT + 40, h - padB), plotH = plotBottom - plotTop;
    this.geo = { padL: padL, padR: padR, padT: padT, padB: padB, colW: colW, plotTop: plotTop, plotBottom: plotBottom, plotH: plotH, rotated: rotated, lines: lines, maxLabel: maxLabel };

    var dup = {};
    for (var i = 0; i < this.points.length; i++) {
      var p = this.points[i];
      var k = dup[p.key] || 0; dup[p.key] = k + 1;
      var off = k ? Math.ceil(k / 2) * 4 * (k % 2 ? 1 : -1) : 0;     // the same answer again sits a few px beside itself
      var x0 = padL + p.col * colW;
      p.px = VR.clamp(x0 + (0.5 + p.u * 0.42) * colW + off, x0 + 3, x0 + colW - 3);
      p.py = plotTop + p.yf * plotH;
    }
  };

  // ---------- the static layer ----------
  Constellation.prototype._paintStatic = function () {
    var w = this.w, h = this.h, dpr = this.dpr, g = this.geo; if (!w || !h || !g) return;
    if (!this.back) { this.back = doc.createElement('canvas'); this.backCtx = this.back.getContext('2d'); }
    var pw = Math.round(w * dpr), ph = Math.round(h * dpr);
    if (this.back.width !== pw || this.back.height !== ph) { this.back.width = pw; this.back.height = ph; }
    var c = this.backCtx, hc = this.opts.highContrast;
    c.setTransform(dpr, 0, 0, dpr, 0, 0);

    // ground: near black with a faint graphite lift at the top, like the FIELD
    var grad = c.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, rgba(mix(PAL.bg, PAL.graphite, 0.45), 1));
    grad.addColorStop(0.5, rgba(mix(PAL.bg, PAL.graphite, 0.12), 1));
    grad.addColorStop(1, rgba(PAL.bg, 1));
    c.fillStyle = grad; c.fillRect(0, 0, w, h);

    // ambient haze — procedural, seeded, low alpha
    for (var i = 0; i < this.haze.length; i++) {
      var s = this.haze[i];
      c.fillStyle = rgba(s.tint, s.a * (hc ? 1.3 : 1));
      c.fillRect(s.x * w, s.y * h, s.sz, s.sz);
    }

    var padL = g.padL, padR = g.padR, top = g.plotTop, bottom = g.plotBottom, plotH = g.plotH, colW = g.colW;
    var n = this.cols.length || 1;
    var guideA = hc ? 0.18 : 0.07, textA = hc ? 1 : 0.8;

    // band guides (the FIELD's nine edges) + ticks on the axis
    c.lineWidth = 1;
    for (var bi = 0; bi < VR.BANDS.length; bi++) {
      var e = VR.yOfBandEdges(VR.BANDS[bi].id);
      var y = Math.round(top + e.bottom * plotH) + 0.5;
      c.strokeStyle = rgba(PAL.ivory, guideA);
      c.beginPath(); c.moveTo(padL, y); c.lineTo(w - padR, y); c.stroke();
      c.strokeStyle = rgba(PAL.ivory, hc ? 0.5 : 0.25);
      c.beginPath(); c.moveTo(padL - 12, y); c.lineTo(padL - 8, y); c.stroke();
    }
    // column separators
    c.strokeStyle = rgba(PAL.ivory, hc ? 0.12 : 0.045);
    for (var ci = 1; ci < n; ci++) {
      var x = Math.round(padL + ci * colW) + 0.5;
      c.beginPath(); c.moveTo(x, top); c.lineTo(x, bottom); c.stroke();
    }
    // the rarity axis with its two words
    c.strokeStyle = rgba(PAL.ivory, hc ? 0.4 : 0.16);
    c.beginPath(); c.moveTo(padL - 8.5, top); c.lineTo(padL - 8.5, bottom); c.stroke();
    setFont(c, '600 10px ' + FONT);
    c.fillStyle = rgba(PAL.ivory, textA); c.textBaseline = 'middle';
    c.save(); c.translate(padL - 18, top + 2); c.rotate(-Math.PI / 2); c.textAlign = 'right'; c.fillText('COMMON', 0, 0); c.restore();
    c.save(); c.translate(padL - 18, bottom - 2); c.rotate(-Math.PI / 2); c.textAlign = 'left'; c.fillText('RARE', 0, 0); c.restore();

    // band names down the right edge when there is room for them
    if (padR >= 60) {
      setFont(c, '500 9px ' + FONT);
      c.fillStyle = rgba(PAL.ivory, hc ? 0.75 : 0.38); c.textAlign = 'left'; c.textBaseline = 'middle';
      for (var bj = 0; bj < VR.BANDS.length; bj++) {
        var eb = VR.yOfBandEdges(VR.BANDS[bj].id), bh = (eb.bottom - eb.top) * plotH;
        if (bh < 12) continue;
        c.fillText(VR.BANDS[bj].label, w - padR + 8, top + (eb.top + eb.bottom) / 2 * plotH);
      }
    }

    // category labels along the bottom
    setFont(c, '600 10px ' + FONT);
    c.fillStyle = rgba(PAL.ivory, textA);
    if (this.cols.length) {
      if (g.rotated) {
        var maxLen = g.padB - 12;
        c.textAlign = 'left'; c.textBaseline = 'middle';
        for (var ri = 0; ri < this.cols.length; ri++) {
          var label = up(this.cols[ri]);
          while (label.length > 2 && c.measureText(label).width > maxLen) label = label.slice(0, -2).replace(/\s+$/, '') + '…';
          c.save(); c.translate(padL + (ri + 0.5) * colW, h - 6); c.rotate(-Math.PI / 2); c.fillText(label, 0, 0); c.restore();
        }
      } else {
        c.textAlign = 'center'; c.textBaseline = 'top';
        for (var li = 0; li < this.cols.length; li++) {
          var ls = g.lines[li] || [];
          for (var lj = 0; lj < ls.length; lj++) c.fillText(ls[lj], padL + (li + 0.5) * colW, bottom + 8 + lj * 12);
        }
      }
    }

    // provenance, always — every dataset mention says so
    setFont(c, '600 8px ' + FONT);
    c.fillStyle = rgba(PAL.ivory, hc ? 0.7 : 0.38); c.textAlign = 'right'; c.textBaseline = 'middle';
    c.fillText(datasetSource(VR.DEFAULT_DATASET), w - 6, 9);
  };

  // ---------- frame ----------
  Constellation.prototype.draw = function () {
    var c = this.ctx, w = this.w, h = this.h, dpr = this.dpr; if (!w || !h || !this.back) return;
    var hc = this.opts.highContrast, rm = this.opts.reducedMotion, t = this.t;
    c.setTransform(1, 0, 0, 1, 0, 0);
    c.drawImage(this.back, 0, 0);
    c.setTransform(dpr, 0, 0, dpr, 0, 0);

    if (!rm) {
      for (var i = 0; i < this.twinklers.length; i++) {
        var s = this.twinklers[i];
        var tw = 0.5 + 0.5 * Math.sin(t * s.sp + s.ph);
        c.fillStyle = rgba(s.tint, s.a * 2.2 * tw * (hc ? 1.3 : 1));
        c.fillRect(s.x * w, s.y * h, s.sz + 0.4, s.sz + 0.4);
      }
    }

    var focusVisible = false;
    if (this.focused) { try { focusVisible = this.canvas.matches(':focus-visible'); } catch (e) { focusVisible = true; } }
    if (focusVisible) { c.strokeStyle = rgba(PAL.violet2, 0.75); c.lineWidth = 1.5; c.strokeRect(1.5, 1.5, w - 3, h - 3); }

    var hi = this.hover || this.sel;
    for (var k = 0; k < this.order.length; k++) {
      var p = this.order[k];
      if (p === hi) continue;
      var f = rm ? 1 : 1 + 0.18 * Math.sin(t * p.sp + p.ph);
      this._drawPoint(c, p, hc, f);
    }
    if (hi) {
      // readout: a dashed line from the axis to the point, then the point itself, ringed
      var g = this.geo;
      c.save();
      c.strokeStyle = rgba(PAL.violet2, 0.3); c.lineWidth = 1; c.setLineDash([2, 4]);
      c.beginPath(); c.moveTo(g.padL - 8, hi.py + 0.5); c.lineTo(hi.px - hi.r - 9, hi.py + 0.5); c.stroke();
      c.restore();
      this._drawPoint(c, hi, hc, 1.15);
      c.strokeStyle = rgba(PAL.violet2, 0.95); c.lineWidth = hc ? 2.2 : 1.4;
      c.beginPath(); c.arc(hi.px, hi.py, hi.r + 7, 0, Math.PI * 2); c.stroke();
    }
  };

  Constellation.prototype._drawPoint = function (c, p, hc, f) {
    var t = p.cal, col = p.rgb, x = p.px, y = p.py;
    var a = (hc ? 0.72 + 0.28 * t : 0.40 + 0.60 * t) * f;
    var r = p.r + (hc ? 0.5 : 0);
    if (t >= 0.6) {
      var hr = 5 + 9 * t;
      var halo = c.createRadialGradient(x, y, 0, x, y, hr);
      var ha = (0.10 + 0.40 * (t - 0.6) / 0.4) * f;
      halo.addColorStop(0, rgba(PAL.violet, ha)); halo.addColorStop(0.55, rgba(PAL.violet, ha * 0.35)); halo.addColorStop(1, rgba(PAL.violet, 0));
      c.fillStyle = halo; c.beginPath(); c.arc(x, y, hr, 0, Math.PI * 2); c.fill();
    }
    if (p.type === 'mirror') {
      c.strokeStyle = rgba(col, a); c.lineWidth = hc ? 1.8 : 1.1;
      c.beginPath(); c.arc(x, y, r + 1.4, 0, Math.PI * 2); c.stroke();
      c.fillStyle = rgba(col, a * 0.3); c.beginPath(); c.arc(x, y, Math.max(0.6, r * 0.4), 0, Math.PI * 2); c.fill();
    } else if (p.type === 'vanta') {
      var d = r + 1.8;
      c.fillStyle = rgba(col, a);
      c.beginPath(); c.moveTo(x, y - d); c.lineTo(x + d, y); c.lineTo(x, y + d); c.lineTo(x - d, y); c.closePath(); c.fill();
      c.strokeStyle = rgba(PAL.violet2, Math.min(1, a + 0.2)); c.lineWidth = hc ? 1.4 : 0.8; c.stroke();
    } else {
      c.fillStyle = rgba(col, a);
      c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fill();
    }
    if (p.black) {
      c.strokeStyle = rgba(PAL.white, 0.85 * Math.min(1, f)); c.lineWidth = hc ? 1.5 : 0.8;
      c.beginPath(); c.arc(x, y, r + 4.5, 0, Math.PI * 2); c.stroke();
    }
  };

  // ---------- picking, keyboard, tooltip ----------
  Constellation.prototype._nearest = function (ev) {
    var r = this.canvas.getBoundingClientRect();
    var x = ev.clientX - r.left, y = ev.clientY - r.top;
    var best = null, bd = HIT_RADIUS * HIT_RADIUS;
    for (var i = 0; i < this.points.length; i++) {
      var p = this.points[i], dx = p.px - x, dy = p.py - y, d2 = dx * dx + dy * dy;
      if (d2 < bd) { bd = d2; best = p; }
    }
    return best;
  };
  Constellation.prototype._key = function (ev) {
    var n = this.byDate.length, k = ev.key, handled = true;
    if (k === 'Escape' || k === 'Esc') { this.sel = null; this.hover = null; this._hideTip(); }
    else if (!n) handled = false;
    else if (k === 'ArrowRight' || k === 'ArrowDown' || k === 'Right' || k === 'Down') { this.sel = this.byDate[this.sel ? (this.sel.di + 1) % n : 0]; this.hover = null; this._refreshTip(); }
    else if (k === 'ArrowLeft' || k === 'ArrowUp' || k === 'Left' || k === 'Up') { this.sel = this.byDate[this.sel ? (this.sel.di - 1 + n) % n : n - 1]; this.hover = null; this._refreshTip(); }
    else if (k === 'Home') { this.sel = this.byDate[0]; this.hover = null; this._refreshTip(); }
    else if (k === 'End') { this.sel = this.byDate[n - 1]; this.hover = null; this._refreshTip(); }
    else handled = false;
    if (handled) { ev.preventDefault(); this.draw(); }
  };
  Constellation.prototype._refreshTip = function () {
    var p = this.hover || this.sel;
    if (p) this._showTip(p); else this._hideTip();
  };
  Constellation.prototype._hideTip = function () {
    if (this.tip) this.tip.hidden = true;
  };
  Constellation.prototype._showTip = function (p) {
    var tip = this.tip; if (!tip) return;
    var s = p.src;
    while (tip.firstChild) tip.removeChild(tip.firstChild);
    function add(tag, cls, text) { var e = doc.createElement(tag); if (cls) e.className = cls; e.textContent = text; tip.appendChild(e); return e; }
    function row(k, v) { var e = doc.createElement('div'); e.className = 'ct-row'; var a = doc.createElement('span'); a.className = 'ct-k'; a.textContent = k; var b = doc.createElement('span'); b.className = 'ct-v'; b.textContent = v; e.appendChild(a); e.appendChild(b); tip.appendChild(e); }
    var typeName = p.type === 'mirror' ? 'MIRROR' : (p.type === 'vanta' ? 'VANTA' : 'SIGNAL');
    add('div', 'ct-type type-' + p.type, typeName);
    add('div', 'ct-prompt', s.prompt || '');
    add('div', 'ct-answer', up(s.canonical || s.input));
    var unmeasured = s.support === 'UNMEASURED' || !(s.raw_rate > 0);
    row('FREQUENCY', unmeasured ? 'UNMEASURED' : VR.fmtPct(s.raw_rate) + (s.support === 'THIN' ? ' · THIN SAMPLE' : ''));
    var b = VR.bandById(s.band);
    row('PREDICTED', b ? b.label + ' · ' + b.range : '—');
    add('div', 'ct-scores', (s.main_label === 'CONSENSUS' ? 'M ' : 'O ') + (s.main == null ? '–' : s.main) + ' · C ' + (s.calibration == null ? '–' : s.calibration) + ' · V ' + (s.vantarank == null ? '–' : s.vantarank));
    var flags = [];
    if (s.flags) {
      if (s.flags.black_signal) flags.push('BLACK SIGNAL');
      if (s.flags.perfect_calibration) flags.push('PERFECT CALIBRATION');
      if (s.flags.mirror_lock) flags.push('MIRROR LOCK');
      if (s.flags.thin) flags.push('THIN');
      if (s.flags.unmeasured) flags.push('PROVISIONAL');
    }
    if (flags.length) add('div', 'ct-flags', flags.join(' · '));
    add('div', 'ct-meta', (s.date || 'UNDATED') + ' · ' + (s.dataset_version || '') + ' · ' + datasetSource(s.dataset_version));

    tip.hidden = false;
    try { if (root.getComputedStyle(tip).position === 'static') tip.style.position = 'absolute'; } catch (e) { tip.style.position = 'absolute'; }
    tip.style.pointerEvents = 'none';
    var cr = this.canvas.getBoundingClientRect();
    var par = tip.offsetParent, pr;
    var bodyStatic = false;
    try { bodyStatic = par === doc.body && root.getComputedStyle(doc.body).position === 'static'; } catch (e) { bodyStatic = false; }
    if (!par || bodyStatic) pr = { left: -(root.pageXOffset || 0), top: -(root.pageYOffset || 0) };
    else pr = par.getBoundingClientRect();
    var tw = tip.offsetWidth || 200, th = tip.offsetHeight || 80;
    var x = p.px + 14, y = p.py - th - 12;
    if (x + tw > this.w - 4) x = p.px - tw - 14;
    if (x < 4) x = VR.clamp(p.px - tw / 2, 4, Math.max(4, this.w - tw - 4));
    if (y < 4) y = p.py + 16;
    if (y + th > this.h - 4) y = Math.max(4, this.h - th - 4);
    tip.style.left = Math.round(cr.left - pr.left + x) + 'px';
    tip.style.top = Math.round(cr.top - pr.top + y) + 'px';
  };

  VR.Constellation = Constellation;
})(typeof window !== 'undefined' ? window : this);

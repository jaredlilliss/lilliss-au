/* VANTARANK — THE FIELD. A procedural canvas of thousands of points standing for aggregate responses.
 * Top: bright, noisy, crowded. Bottom: near black. The vertical axis is log10(rate) via VR.yOf.
 *
 * States
 *   dormant   ambient haze shaped by a generic prior — no question-specific structure is shown before commit
 *   armed     the player's answer floats at the centre; a prediction band is highlighted (draggable)
 *   reveal    the crowd re-organises into the question's real clusters, the answer travels to its true y,
 *             the field bends around its path, then everything settles
 * Effects: shockwave (perfect prediction), blackSignal (screen goes almost black, then the word alone),
 *          mirror (field brightens, particles rush upward).
 * Reduced motion: positions snap, no drift, effects become brief static frames. Scoring never depends on any of this.
 */
(function (root) {
  'use strict';
  var VR = root.VR || (root.VR = {});

  var PAL = {
    bg: [5, 6, 10], graphite: [26, 28, 36], ivory: [239, 233, 220], violet: [124, 58, 237], violet2: [167, 139, 250],
    blue: [59, 130, 246], blue2: [96, 165, 250], white: [255, 255, 255]
  };
  function rgba(c, a) { return 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + a + ')'; }
  function mix(a, b, t) { return [Math.round(a[0] + (b[0] - a[0]) * t), Math.round(a[1] + (b[1] - a[1]) * t), Math.round(a[2] + (b[2] - a[2]) * t)]; }
  function gauss(rng) { var u = 0, v = 0; while (u === 0) u = rng(); while (v === 0) v = rng(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
  function easeInOut(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  function Field(canvas, opts) {
    this.canvas = canvas; this.ctx = canvas.getContext('2d');
    this.opts = Object.assign({ reducedMotion: false, highContrast: false, density: 1 }, opts || {});
    this.rng = VR.prng(0x5eed);
    this.w = 0; this.h = 0; this.dpr = 1;
    this.n = 0; this.px = null; this.py = null; this.tx = null; this.ty = null; this.sz = null; this.al = null; this.tone = null; this.vx = null; this.vy = null;
    this.mode = 'dormant'; this.mirror = false;
    this.answer = { visible: false, x: 0.5, y: 0.5, ty: 0.5, label: '' };
    this.band = null; this.bandGhost = null;
    this.reveal = null; this.effects = []; this.blackout = 0; this.brighten = 0;
    this.t = 0; this._raf = null; this._last = 0; this.running = false;
    this.onPredict = null; this.dragging = false; this.dragEnabled = false;
    this._bindPointer();
    this.resize();
    this.setDormant();
    this.start();
  }

  Field.prototype.setOptions = function (o) { Object.assign(this.opts, o || {}); this.draw(); };

  Field.prototype.resize = function () {
    var r = this.canvas.getBoundingClientRect();
    var dpr = Math.min(root.devicePixelRatio || 1, 2);
    var w = Math.max(1, Math.round(r.width)), h = Math.max(1, Math.round(r.height));
    if (w === this.w && h === this.h && dpr === this.dpr) return;
    this.w = w; this.h = h; this.dpr = dpr;
    this.canvas.width = Math.round(w * dpr); this.canvas.height = Math.round(h * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var area = w * h;
    var n = Math.round(VR.clamp(area / 260, 900, 4200) * this.opts.density);
    this._alloc(n);
    if (this.mode === 'dormant') this._layoutDormant(); else if (this.profile) this._layoutProfile(this.profile, true);
    this.draw();
  };
  Field.prototype._alloc = function (n) {
    if (n === this.n) return;
    this.n = n;
    this.px = new Float32Array(n); this.py = new Float32Array(n); this.tx = new Float32Array(n); this.ty = new Float32Array(n);
    this.vx = new Float32Array(n); this.vy = new Float32Array(n);
    this.sz = new Float32Array(n); this.al = new Float32Array(n); this.tone = new Float32Array(n);
    for (var i = 0; i < n; i++) { this.px[i] = this.rng(); this.py[i] = this.rng(); this.sz[i] = 0.6 + this.rng() * 1.3; this.tone[i] = this.rng(); }
  };

  // ---------- layouts ----------
  // A generic prior: dense near the top, thinning to almost nothing at the bottom. Shows no question data.
  Field.prototype._layoutDormant = function () {
    var rng = VR.prng(0xd0d0);
    for (var i = 0; i < this.n; i++) {
      var u = rng();
      var y = Math.pow(u, 2.6);                       // most mass near y=0
      this.tx[i] = rng(); this.ty[i] = VR.clamp(y + gauss(rng) * 0.01, 0, 1);
      this.al[i] = 0.18 + 0.5 * (1 - y) * rng();
    }
  };
  // The real crowd: each listed answer becomes a cluster at its y; the tail scatters thinly below the last listed answer.
  Field.prototype._layoutProfile = function (profile, snap) {
    var rng = VR.prng(VR.hash32(profile.question_id || 'q'));
    var answers = profile.answers, n = this.n;
    var listedMass = profile.listed_mass || 1, tailMass = profile.tail_mass || 0;
    var budget = Math.round(n * 0.9), tailN = n - budget;
    var idx = 0;
    // each cluster gets a fixed x centre and spread so the "galaxies" have identity
    for (var a = 0; a < answers.length; a++) {
      var ans = answers[a];
      var cnt = Math.max(3, Math.round(budget * (ans.raw_rate / listedMass)));
      var cy = VR.yOf(ans.raw_rate);
      var cx = 0.15 + rng() * 0.7, spread = 0.10 + 0.25 * Math.sqrt(ans.raw_rate);
      var sy = 0.006 + 0.012 * Math.sqrt(ans.raw_rate);
      for (var k = 0; k < cnt && idx < n; k++, idx++) {
        var gx = gauss(rng), gy = gauss(rng);
        // a few arms: rotate a fraction of the points around the centre
        var arm = rng() < 0.35 ? (rng() - 0.5) * 0.5 : 0;
        this.tx[idx] = VR.clamp(cx + gx * spread + arm, 0.01, 0.99);
        this.ty[idx] = VR.clamp(cy + gy * sy + (arm ? gy * 0.004 : 0), 0, 1);
        this.al[idx] = 0.25 + 0.55 * rng() * (1 - cy * 0.5);
      }
    }
    var lastY = answers.length ? VR.yOf(answers[answers.length - 1].raw_rate) : 0.7;
    for (; idx < n; idx++) {
      var t = rng();
      this.tx[idx] = rng();
      this.ty[idx] = VR.clamp(lastY + (1 - lastY) * Math.pow(t, 0.6), 0, 1);   // sparse, fading toward black
      this.al[idx] = 0.08 + 0.25 * rng() * (tailMass > 0 ? 1 : 0.3);
    }
    if (snap) for (var i = 0; i < n; i++) { this.px[i] = this.tx[i]; this.py[i] = this.ty[i]; }
  };

  // ---------- public state ----------
  Field.prototype.setDormant = function () {
    this.mode = 'dormant'; this.profile = null; this.reveal = null; this.band = null; this.bandGhost = null; this.answer.visible = false;
    this.blackout = 0; this.brighten = 0; this.mirror = false; this.dragEnabled = false;
    this._layoutDormant();
    var snap = this.opts.reducedMotion || this.t === 0;
    if (snap) for (var i = 0; i < this.n; i++) { this.px[i] = this.tx[i]; this.py[i] = this.ty[i]; }
    this.draw();
  };
  Field.prototype.setMirror = function (on) { this.mirror = !!on; };
  /** The player's locked answer floats at the centre. */
  Field.prototype.setAnswer = function (label) {
    this.answer.visible = true; this.answer.label = label || ''; this.answer.x = 0.5; this.answer.y = 0.5; this.answer.ty = 0.5;
    this.mode = 'armed'; this.draw();
  };
  Field.prototype.setPrediction = function (bandId) { this.band = bandId || null; this.dragEnabled = !!bandId || this.mode === 'armed'; this.draw(); };
  Field.prototype.enableDrag = function (on) { this.dragEnabled = !!on; };

  /**
   * The reveal. profile = VR.questionProfile(q); result = { rate, bandId, type, flags }.
   * Phases: hesitate (0.25s) → field forms + answer travels (1.1s) → settle (0.4s). onDone fires once.
   */
  Field.prototype.activate = function (profile, result, onDone) {
    this.profile = profile; this.mode = 'reveal'; this.dragEnabled = false;
    this.bandGhost = result.bandId || this.band; this.band = null;
    var ty = VR.yOf(result.rate);
    this.answer.visible = true; this.answer.ty = ty;
    this._layoutProfile(profile, false);
    var rm = this.opts.reducedMotion;
    var now = this.t;
    this.reveal = { t0: now, hesitate: rm ? 0 : 0.25, travel: rm ? 0.01 : 1.1, settle: rm ? 0.05 : 0.45, y0: this.answer.y, y1: ty, done: false, onDone: onDone || null, type: result.type };
    if (rm) { for (var i = 0; i < this.n; i++) { this.px[i] = this.tx[i]; this.py[i] = this.ty[i]; } this.answer.y = ty; }
    this.draw();
  };
  Field.prototype.skip = function () {
    if (this.reveal && !this.reveal.done) {
      for (var i = 0; i < this.n; i++) { this.px[i] = this.tx[i]; this.py[i] = this.ty[i]; }
      this.answer.y = this.reveal.y1;
      this._finishReveal();
    }
    this.effects = []; this.blackout = 0;
  };
  Field.prototype._finishReveal = function () {
    var r = this.reveal; if (!r || r.done) return;
    r.done = true; if (r.onDone) { var f = r.onDone; r.onDone = null; f(); }
  };
  /** Thin white horizontal shockwave at the answer's y. */
  Field.prototype.shockwave = function () {
    this.effects.push({ kind: 'shock', t0: this.t, dur: this.opts.reducedMotion ? 0.35 : 1.1, y: this.answer.y });
  };
  /** Near-black screen; the caller shows the word in the DOM. */
  Field.prototype.blackSignal = function (dur) {
    this.effects.push({ kind: 'black', t0: this.t, dur: dur || (this.opts.reducedMotion ? 1.2 : 2.4) });
  };
  /** Mirror brightening pulse: the field lifts and particles rush upward for a moment. */
  Field.prototype.mirrorRush = function () {
    if (this.opts.reducedMotion) { this.brighten = 0.5; return; }
    this.effects.push({ kind: 'rush', t0: this.t, dur: 1.4 });
  };

  // ---------- pointer (thumb drag on the field selects a band) ----------
  Field.prototype._bindPointer = function () {
    var self = this;
    function yFrac(ev) { var r = self.canvas.getBoundingClientRect(); return VR.clamp((ev.clientY - r.top) / r.height, 0, 1); }
    function pick(ev) {
      if (!self.dragEnabled || !self.onPredict) return;
      var y = yFrac(ev), best = null, bd = 1e9;
      VR.BANDS.forEach(function (b) { var e = VR.yOfBandEdges(b.id); var c = (e.top + e.bottom) / 2; var d = (y >= e.top && y <= e.bottom) ? 0 : Math.abs(y - c); if (d < bd) { bd = d; best = b.id; } });
      if (best && best !== self.band) self.onPredict(best);
    }
    this.canvas.addEventListener('pointerdown', function (ev) { if (!self.dragEnabled) return; self.dragging = true; try { self.canvas.setPointerCapture(ev.pointerId); } catch (e) { /* ignore */ } pick(ev); ev.preventDefault(); });
    this.canvas.addEventListener('pointermove', function (ev) { if (self.dragging) { pick(ev); ev.preventDefault(); } });
    function up(ev) { if (self.dragging) { self.dragging = false; try { self.canvas.releasePointerCapture(ev.pointerId); } catch (e) { /* ignore */ } if (self.onDragEnd) self.onDragEnd(); } }
    this.canvas.addEventListener('pointerup', up); this.canvas.addEventListener('pointercancel', up);
  };

  // ---------- loop ----------
  Field.prototype.start = function () {
    if (this.running) return; this.running = true; this._last = 0;
    var self = this;
    function frame(ts) {
      if (!self.running) return;
      var dt = self._last ? Math.min(0.05, (ts - self._last) / 1000) : 0.016; self._last = ts;
      self.t += dt; self.step(dt); self.draw();
      self._raf = root.requestAnimationFrame(frame);
    }
    this._raf = root.requestAnimationFrame(frame);
  };
  Field.prototype.stop = function () { this.running = false; if (this._raf) root.cancelAnimationFrame(this._raf); this._raf = null; };

  Field.prototype.step = function (dt) {
    var rm = this.opts.reducedMotion, n = this.n, i;
    var r = this.reveal;
    var rush = 0, rushDir = 0;
    // effects bookkeeping
    this.blackout = 0; var keep = [];
    for (i = 0; i < this.effects.length; i++) {
      var e = this.effects[i], u = (this.t - e.t0) / e.dur;
      if (u >= 1) continue;
      keep.push(e);
      if (e.kind === 'black') this.blackout = Math.max(this.blackout, u < 0.15 ? u / 0.15 : (u > 0.75 ? (1 - u) / 0.25 : 1));
      if (e.kind === 'rush') { rush = Math.sin(u * Math.PI); rushDir = 1; }
    }
    this.effects = keep;
    this.brighten += ((this.mirror ? 0.35 : 0) + rush * 0.5 - this.brighten) * Math.min(1, dt * 3);

    // answer travel
    var mx = this.answer.x, my = this.answer.y, bendR = 0, bendK = 0;
    if (r && !r.done) {
      var e2 = this.t - r.t0;
      if (e2 < r.hesitate) {
        // particles hesitate: tiny jitter, answer holds
        if (!rm) for (i = 0; i < n; i++) { this.vx[i] += (this.rng() - 0.5) * 0.02; this.vy[i] += (this.rng() - 0.5) * 0.02; }
      } else if (e2 < r.hesitate + r.travel) {
        var u2 = easeInOut((e2 - r.hesitate) / r.travel);
        this.answer.y = r.y0 + (r.y1 - r.y0) * u2;
        my = this.answer.y; bendR = 0.16; bendK = 0.9 * Math.sin(u2 * Math.PI);
      } else if (e2 < r.hesitate + r.travel + r.settle) {
        this.answer.y = r.y1;
      } else {
        this.answer.y = r.y1; this._finishReveal();
      }
    } else if (this.answer.visible && this.mode === 'armed' && !rm) {
      this.answer.y = 0.5 + Math.sin(this.t * 1.3) * 0.006;   // gentle float
    }

    // particles: spring toward targets, ambient drift, bend around the travelling answer
    var k = rm ? 1 : (this.mode === 'reveal' ? 2.4 : 1.6);
    for (i = 0; i < n; i++) {
      var dx = this.tx[i] - this.px[i], dy = this.ty[i] - this.py[i];
      this.vx[i] += dx * k * dt; this.vy[i] += dy * k * dt;
      if (!rm) {
        var drift = (this.mode === 'dormant' ? 0.004 : 0.002);
        this.vx[i] += Math.sin(this.t * 0.4 + i * 0.37) * drift * dt;
        this.vy[i] += Math.cos(this.t * 0.31 + i * 0.21) * drift * dt;
        if (rushDir) this.vy[i] -= rush * 0.35 * dt * (0.3 + this.tone[i]);
        if (bendK) {
          var ax = (this.px[i] - mx) * (this.w / this.h), ay = this.py[i] - my;
          var d2 = ax * ax + ay * ay;
          if (d2 < bendR * bendR) {
            var d = Math.sqrt(d2) || 1e-4, f = (bendR - d) / bendR * bendK * dt;
            this.vx[i] += (ax / d) * f * 0.9; this.vy[i] += (ay / d) * f * 0.25;
          }
        }
      }
      this.vx[i] *= rm ? 0.6 : 0.90; this.vy[i] *= rm ? 0.6 : 0.90;
      this.px[i] += this.vx[i]; this.py[i] += this.vy[i];
      if (rm) { this.px[i] = this.tx[i]; this.py[i] = this.ty[i]; }
    }
  };

  Field.prototype.draw = function () {
    var c = this.ctx, w = this.w, h = this.h; if (!w || !h) return;
    var hc = this.opts.highContrast, b = this.brighten;
    // ground: near black → a faint graphite lift toward the top; Mirror lifts everything toward ivory
    var g = c.createLinearGradient(0, 0, 0, h);
    var top = mix(PAL.bg, this.mirror ? PAL.ivory : PAL.graphite, this.mirror ? 0.10 + b * 0.25 : 0.55 + b * 0.3);
    g.addColorStop(0, rgba(top, 1)); g.addColorStop(0.55, rgba(mix(PAL.bg, PAL.graphite, 0.12 + b * 0.2), 1)); g.addColorStop(1, rgba(PAL.bg, 1));
    c.fillStyle = g; c.fillRect(0, 0, w, h);

    // band guides (always labelled in the DOM ladder; here they are structure, not information)
    c.save();
    for (var bi = 0; bi < VR.BANDS.length; bi++) {
      var e = VR.yOfBandEdges(VR.BANDS[bi].id), y = e.bottom * h;
      c.strokeStyle = rgba(PAL.ivory, hc ? 0.18 : 0.06); c.lineWidth = 1;
      c.beginPath(); c.moveTo(0, y + 0.5); c.lineTo(w, y + 0.5); c.stroke();
    }
    // highlighted prediction band
    var band = this.band || this.bandGhost;
    if (band) {
      var eb = VR.yOfBandEdges(band), y0 = eb.top * h, y1 = eb.bottom * h;
      var ghost = !this.band;
      c.fillStyle = rgba(this.mirror ? PAL.ivory : PAL.violet, ghost ? 0.10 : (hc ? 0.30 : 0.20));
      c.fillRect(0, y0, w, y1 - y0);
      c.strokeStyle = rgba(this.mirror ? PAL.ivory : PAL.violet2, ghost ? 0.5 : 0.95); c.lineWidth = ghost ? 1 : 1.5;
      if (ghost) c.setLineDash([4, 6]);
      c.beginPath(); c.moveTo(0, y0 + 0.5); c.lineTo(w, y0 + 0.5); c.moveTo(0, y1 - 0.5); c.lineTo(w, y1 - 0.5); c.stroke();
      c.setLineDash([]);
    }
    c.restore();

    // particles
    var n = this.n, base = this.mirror ? PAL.ivory : PAL.blue2, alt = this.mirror ? PAL.white : PAL.violet2;
    var dim = 1 - this.blackout;
    for (var i = 0; i < n; i++) {
      var x = this.px[i] * w, y = this.py[i] * h;
      var a = this.al[i] * dim * (hc ? 1.25 : 1) * (0.7 + b * 0.5);
      if (a <= 0.01) continue;
      var col = this.tone[i] < 0.78 ? base : (this.tone[i] < 0.95 ? alt : PAL.white);
      var yy = this.py[i];
      // the top is hotter: whiter and larger; the bottom fades
      var s = this.sz[i] * (1.25 - yy * 0.6);
      c.fillStyle = rgba(yy < 0.12 && this.tone[i] > 0.5 ? PAL.white : col, VR.clamp(a * (1.1 - yy * 0.7), 0, 1));
      c.fillRect(x, y, s, s);
    }

    // effects
    for (var k = 0; k < this.effects.length; k++) {
      var ef = this.effects[k], u = VR.clamp((this.t - ef.t0) / ef.dur, 0, 1);
      if (ef.kind === 'shock') {
        var yy2 = ef.y * h, half = easeOut(u) * w * 0.6, aa = (1 - u);
        c.strokeStyle = rgba(PAL.white, aa); c.lineWidth = 1;
        c.beginPath(); c.moveTo(w / 2 - half, yy2 + 0.5); c.lineTo(w / 2 + half, yy2 + 0.5); c.stroke();
        c.strokeStyle = rgba(PAL.violet2, aa * 0.5); c.beginPath(); c.moveTo(w / 2 - half * 0.7, yy2 + 2.5); c.lineTo(w / 2 + half * 0.7, yy2 + 2.5); c.stroke();
      }
    }

    // the answer point: hot white core, violet halo (ivory halo in Mirror)
    if (this.answer.visible && this.blackout < 0.98) {
      var ax = this.answer.x * w, ay = this.answer.y * h;
      var halo = c.createRadialGradient(ax, ay, 0, ax, ay, 26);
      var hcol = this.mirror ? PAL.ivory : PAL.violet;
      halo.addColorStop(0, rgba(hcol, 0.55 * dim)); halo.addColorStop(0.5, rgba(hcol, 0.18 * dim)); halo.addColorStop(1, rgba(hcol, 0));
      c.fillStyle = halo; c.beginPath(); c.arc(ax, ay, 26, 0, Math.PI * 2); c.fill();
      c.fillStyle = rgba(PAL.white, dim); c.beginPath(); c.arc(ax, ay, 3.2, 0, Math.PI * 2); c.fill();
      if (hc) { c.strokeStyle = rgba(PAL.white, dim); c.lineWidth = 1.5; c.beginPath(); c.arc(ax, ay, 7, 0, Math.PI * 2); c.stroke(); }
    }
    // blackout veil
    if (this.blackout > 0) { c.fillStyle = rgba(PAL.bg, this.blackout * 0.985); c.fillRect(0, 0, w, h); }
  };

  VR.Field = Field;
  VR.PALETTE = PAL;
})(typeof window !== 'undefined' ? window : this);

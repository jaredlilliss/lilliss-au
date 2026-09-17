/* VANTARANK — procedural audio. Everything is synthesised with WebAudio; no audio files exist.
 * Sounds: click (submit), lock (low resonant tone), activate (field hum), travel (whoosh), land (score),
 * shock (perfect prediction), black (black signal), mirror drone (reversed envelope on Mirror rounds).
 * All sound is optional; nothing in the game depends on hearing it.
 */
(function (root) {
  'use strict';
  var VR = root.VR || (root.VR = {});

  function Audio() {
    this.ctx = null; this.master = null; this.enabled = true; this.drone = null; this.mirror = false;
  }
  Audio.prototype.ensure = function () {
    if (this.ctx) { if (this.ctx.state === 'suspended') { try { this.ctx.resume(); } catch (e) { /* ignore */ } } return true; }
    var AC = root.AudioContext || root.webkitAudioContext;
    if (!AC) return false;
    try {
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.5;
      this.master.connect(this.ctx.destination);
    } catch (e) { this.ctx = null; return false; }
    return true;
  };
  Audio.prototype.setEnabled = function (on) {
    this.enabled = !!on;
    if (!on) this.stopDrone();
  };
  Audio.prototype._ok = function () { return this.enabled && this.ensure(); };

  Audio.prototype._tone = function (freq, type, t0, dur, gain, opts) {
    var c = this.ctx, o = c.createOscillator(), g = c.createGain();
    opts = opts || {};
    o.type = type; o.frequency.setValueAtTime(freq, t0);
    if (opts.to) o.frequency.exponentialRampToValueAtTime(opts.to, t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(gain, t0 + (opts.attack || 0.005));
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g); g.connect(opts.dest || this.master);
    o.start(t0); o.stop(t0 + dur + 0.05);
  };
  Audio.prototype._noise = function (t0, dur, gain, fromHz, toHz, q) {
    var c = this.ctx, n = Math.floor(c.sampleRate * dur), buf = c.createBuffer(1, n, c.sampleRate), d = buf.getChannelData(0);
    for (var i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
    var src = c.createBufferSource(); src.buffer = buf;
    var f = c.createBiquadFilter(); f.type = 'bandpass'; f.Q.value = q || 1;
    f.frequency.setValueAtTime(fromHz, t0); f.frequency.exponentialRampToValueAtTime(toHz, t0 + dur);
    var g = c.createGain(); g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(gain, t0 + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    src.connect(f); f.connect(g); g.connect(this.master); src.start(t0); src.stop(t0 + dur + 0.05);
  };

  /** clean mechanical click — answer submission */
  Audio.prototype.click = function () {
    if (!this._ok()) return; var t = this.ctx.currentTime;
    this._noise(t, 0.03, 0.25, 3000, 1200, 2);
    this._tone(1800, 'square', t, 0.02, 0.08);
  };
  /** low resonant tone — prediction lock */
  Audio.prototype.lock = function () {
    if (!this._ok()) return; var t = this.ctx.currentTime;
    this._tone(this.mirror ? 220 : 110, 'sine', t, 0.9, 0.35, { attack: 0.01 });
    this._tone(this.mirror ? 330 : 165, 'triangle', t, 0.6, 0.08, { attack: 0.02 });
  };
  /** field activation — particles hesitate */
  Audio.prototype.activate = function () {
    if (!this._ok()) return; var t = this.ctx.currentTime;
    this._tone(55, 'sine', t, 1.2, 0.18, { attack: 0.3 });
    this._noise(t, 0.6, 0.05, 200, 900, 0.7);
  };
  /** answer travelling — pitch follows the direction (down = falling, up = rising); Mirror reverses */
  Audio.prototype.travel = function (down, dur) {
    if (!this._ok()) return; var t = this.ctx.currentTime; dur = dur || 0.9;
    var from = down ? 520 : 180, to = down ? 140 : 620;
    if (this.mirror) { var tmp = from; from = to; to = tmp; }
    this._tone(from, 'sine', t, dur, 0.12, { to: to, attack: 0.05 });
    this._noise(t, dur, 0.06, down ? 1400 : 500, down ? 400 : 1600, 0.8);
  };
  /** score lands */
  Audio.prototype.land = function (good) {
    if (!this._ok()) return; var t = this.ctx.currentTime;
    this._tone(good ? 660 : 330, 'triangle', t, 0.25, 0.14);
    this._tone(good ? 990 : 247, 'sine', t + 0.08, 0.35, 0.10);
  };
  /** thin white shockwave — perfect prediction */
  Audio.prototype.shock = function () {
    if (!this._ok()) return; var t = this.ctx.currentTime;
    this._tone(2400, 'sine', t, 0.7, 0.12, { to: 4800, attack: 0.01 });
    this._noise(t, 0.5, 0.08, 6000, 12000, 0.5);
  };
  /** black signal — sub drop, then silence */
  Audio.prototype.black = function () {
    if (!this._ok()) return; var t = this.ctx.currentTime;
    this._tone(80, 'sine', t, 1.6, 0.4, { to: 30, attack: 0.02 });
    this.stopDrone();
  };
  /** contract penalty */
  Audio.prototype.fail = function () {
    if (!this._ok()) return; var t = this.ctx.currentTime;
    this._tone(200, 'sawtooth', t, 0.5, 0.06, { to: 90 });
  };

  /** ambient drone; Mirror rounds run its LFO the other way */
  Audio.prototype.startDrone = function (mirror) {
    this.mirror = !!mirror;
    if (!this._ok()) return;
    this.stopDrone();
    var c = this.ctx, g = c.createGain(); g.gain.value = 0.0001; g.connect(this.master);
    var o1 = c.createOscillator(), o2 = c.createOscillator(), lfo = c.createOscillator(), lg = c.createGain();
    o1.type = 'sine'; o2.type = 'sine';
    o1.frequency.value = mirror ? 82.4 : 41.2; o2.frequency.value = mirror ? 123.5 : 61.7;
    lfo.type = 'sine'; lfo.frequency.value = mirror ? 0.11 : 0.07; lg.gain.value = mirror ? -6 : 6;   // reversed sweep direction
    lfo.connect(lg); lg.connect(o2.frequency);
    o1.connect(g); o2.connect(g);
    var t = c.currentTime; g.gain.exponentialRampToValueAtTime(mirror ? 0.05 : 0.04, t + 2);
    o1.start(); o2.start(); lfo.start();
    this.drone = { g: g, nodes: [o1, o2, lfo] };
  };
  Audio.prototype.stopDrone = function () {
    if (!this.drone || !this.ctx) return;
    var d = this.drone, t = this.ctx.currentTime;
    try { d.g.gain.cancelScheduledValues(t); d.g.gain.setValueAtTime(d.g.gain.value || 0.0001, t); d.g.gain.exponentialRampToValueAtTime(0.0001, t + 0.6); } catch (e) { /* ignore */ }
    d.nodes.forEach(function (n) { try { n.stop(t + 0.7); } catch (e) { /* ignore */ } });
    this.drone = null;
  };

  VR.Audio = Audio;
})(typeof window !== 'undefined' ? window : this);

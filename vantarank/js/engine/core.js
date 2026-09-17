/* VANTARANK — engine core: namespace, versions, shared utilities.
 * Classic script (no modules) so the game also opens from file:// with no server.
 * Everything lives under the single global `VR`.
 */
(function (root) {
  'use strict';
  var VR = root.VR || (root.VR = {});

  VR.ENGINE_VERSION = '1.0.0';      // scoring/frequency/normalisation engine — bump on ANY change to numbers
  VR.RECEIPT_VERSION = 1;           // run receipt shape
  VR.STORAGE_KEY = 'vantarank.v1';  // local history + settings
  VR.BUILD = '2026-09-17';

  // ---------- numeric helpers ----------
  VR.clamp = function (x, lo, hi) { return x < lo ? lo : (x > hi ? hi : x); };
  VR.log10 = function (x) { return Math.log(x) / Math.LN10; };
  VR.lerp = function (a, b, t) { return a + (b - a) * t; };
  VR.round = function (x, dp) { var m = Math.pow(10, dp || 0); return Math.round(x * m) / m; };

  // Piecewise-linear interpolation over [[x, y], ...] sorted by x ascending. Clamps outside the range.
  VR.piecewise = function (points, x) {
    if (x <= points[0][0]) return points[0][1];
    var last = points[points.length - 1];
    if (x >= last[0]) return last[1];
    for (var i = 1; i < points.length; i++) {
      if (x <= points[i][0]) {
        var p = points[i - 1], q = points[i];
        var t = (x - p[0]) / (q[0] - p[0]);
        return p[1] + (q[1] - p[1]) * t;
      }
    }
    return last[1];
  };

  // ---------- deterministic PRNG (mulberry32) — used for run sequencing and daily signals ----------
  VR.prng = function (seed) {
    var a = (seed >>> 0) || 1;
    return function () {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      var t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  };
  // FNV-1a 32-bit string hash → seed
  VR.hash32 = function (str) {
    var h = 0x811c9dc5;
    for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193); }
    return h >>> 0;
  };
  // Fisher–Yates with a supplied rng
  VR.shuffle = function (arr, rng) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rng() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  };

  // ---------- immutability (dataset freeze) ----------
  VR.deepFreeze = function (o) {
    if (o && typeof o === 'object' && !Object.isFrozen(o)) {
      Object.freeze(o);
      Object.keys(o).forEach(function (k) { VR.deepFreeze(o[k]); });
    }
    return o;
  };
  VR.deepClone = function (o) { return JSON.parse(JSON.stringify(o)); };

  // ---------- formatting ----------
  // Percent for display: 31.8%, 4.8%, 0.42%, 0.06%
  VR.fmtPct = function (rate) {
    if (!(rate > 0)) return '0%';
    var p = rate * 100;
    if (p >= 10) return p.toFixed(1) + '%';
    if (p >= 1) return p.toFixed(1) + '%';
    if (p >= 0.1) return p.toFixed(2) + '%';
    return p.toFixed(2) + '%';
  };
  // "1 in N" — rounded to a friendly number
  VR.oneIn = function (rate) {
    if (!(rate > 0)) return '—';
    var n = 1 / rate;
    if (n < 1.5) return 'almost everyone';
    var r;
    if (n < 10) r = Math.round(n);
    else if (n < 100) r = Math.round(n / 5) * 5;
    else if (n < 1000) r = Math.round(n / 10) * 10;
    else r = Math.round(n / 100) * 100;
    return '1 in ' + r.toLocaleString();
  };
  VR.fmtInt = function (n) { return (n | 0).toLocaleString(); };

  // ---------- tiny event emitter ----------
  VR.Emitter = function () { this._h = {}; };
  VR.Emitter.prototype.on = function (ev, fn) { (this._h[ev] || (this._h[ev] = [])).push(fn); return this; };
  VR.Emitter.prototype.off = function (ev, fn) { var a = this._h[ev]; if (!a) return this; var i = a.indexOf(fn); if (i >= 0) a.splice(i, 1); return this; };
  VR.Emitter.prototype.emit = function (ev, data) { var a = this._h[ev]; if (a) a.slice().forEach(function (fn) { fn(data); }); var any = this._h['*']; if (any) any.slice().forEach(function (fn) { fn(ev, data); }); return this; };

  // ---------- ids / time ----------
  VR.uid = function (prefix) {
    var t = Date.now().toString(36), r = Math.floor(Math.random() * 0xffffffff).toString(36);
    return (prefix || 'id') + '_' + t + '_' + r;
  };
  VR.isoDate = function (d) { d = d || new Date(); var m = d.getMonth() + 1, day = d.getDate(); return d.getFullYear() + '-' + (m < 10 ? '0' : '') + m + '-' + (day < 10 ? '0' : '') + day; };
})(typeof window !== 'undefined' ? window : this);

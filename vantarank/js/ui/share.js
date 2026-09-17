/* VANTARANK — SHARE CARD. An offscreen 1080×1080 procedural canvas → PNG Blob.
 *
 * app.js calls VR.share.card(receipt, dataset, cb) and downloads the Blob it gets back. The card shows
 * exactly what VR.daily.shareText prints — mode, ten-block bar, total, O, C, MIRROR, VANTA, BLACK SIGNAL —
 * plus the brand symbol, the wordmark and the dataset footer. It reveals NO answers and NO questions:
 * receipt.signals is never read. No image is ever drawn, so the canvas is untainted and toBlob works
 * from file://. Deterministic: the background field is seeded from the receipt, so the same receipt
 * renders the same pixels. Fonts are system stacks only; ● ◆ and the block bar are drawn as paths.
 *
 * Exports
 *   VR.share.card(receipt, dataset, cb)   cb(blob) — PNG Blob, or null on failure (called exactly once)
 *   VR.share.text(receipt)                 = VR.daily.shareText(receipt)
 *   VR.share.render(receipt, dataset)      the drawn <canvas> (null if no 2D context)
 *   VR.share.drawSymbol(ctx, x, y, size, palette)   the brand mark: five fading horizontal lines and one
 *                                          luminous point far beneath. x = centre, y = top, size = width and
 *                                          height of the mark's box. palette = {ivory, violet, violet2, white}
 *                                          RGB triplets (defaults to VR.PALETTE).
 *   VR.share.modeLabel(receipt)            'DAILY nnn' or 'SIGNAL RUN'
 *   VR.share.SIZE, VR.share.SOURCE_LINE
 */
(function (root) {
  'use strict';
  var VR = root.VR || (root.VR = {});

  var SIZE = 1080;
  var SOURCE_LINE = 'SIMULATED DATA FOR PROTOTYPE GAMEPLAY';
  var WORDMARK = 'VΛNTΛRΛNK';   // V Λ N T Λ R Λ N K — Greek capital lambda, present in every system sans
  var SANS = 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif';
  var MONO = 'ui-monospace, "Cascadia Mono", Consolas, "SF Mono", Menlo, "DejaVu Sans Mono", "Liberation Mono", monospace';
  var POINTS = 6400;   // background field: thousands of tiny points, dense at the top, empty at the bottom

  // Same triplets as field.js; a local copy so the card also renders if share.js is loaded alone.
  var LOCAL_PAL = {
    bg: [5, 6, 10], graphite: [26, 28, 36], ivory: [239, 233, 220], violet: [124, 58, 237], violet2: [167, 139, 250],
    blue: [59, 130, 246], blue2: [96, 165, 250], white: [255, 255, 255]
  };
  function pal() { return VR.PALETTE || LOCAL_PAL; }
  function rgba(c, a) { return 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + a + ')'; }
  function mix(a, b, t) { return [Math.round(a[0] + (b[0] - a[0]) * t), Math.round(a[1] + (b[1] - a[1]) * t), Math.round(a[2] + (b[2] - a[2]) * t)]; }
  function clamp(x, lo, hi) { return x < lo ? lo : (x > hi ? hi : x); }
  function gauss(rng) { var u = 0, v = 0; while (u === 0) u = rng(); while (v === 0) v = rng(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
  function font(weight, px, family) { return weight + ' ' + px + 'px ' + family; }
  function prng(seed) {
    if (VR.prng) return VR.prng(seed);
    var a = (seed >>> 0) || 1;   // mulberry32, identical to core.js
    return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  }
  function hash32(str) {
    if (VR.hash32) return VR.hash32(str);
    var h = 0x811c9dc5; for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193); } return h >>> 0;
  }

  // ---------- text with tracking (letterSpacing is not universal; measure and place each glyph) ----------
  /** Draws (unless draw === false) and returns the tracked width. align: 'left' | 'center' | 'right'. */
  function tracked(c, text, x, y, tracking, align, draw) {
    var chars = String(text).split(''), ws = [], total = 0, i;
    for (i = 0; i < chars.length; i++) { ws[i] = c.measureText(chars[i]).width; total += ws[i]; }
    total += tracking * Math.max(0, chars.length - 1);
    if (draw !== false) {
      var cx = align === 'center' ? x - total / 2 : (align === 'right' ? x - total : x);
      var prev = c.textAlign; c.textAlign = 'left';
      for (i = 0; i < chars.length; i++) { c.fillText(chars[i], cx, y); cx += ws[i] + tracking; }
      c.textAlign = prev;
    }
    return total;
  }
  /** Largest px ≤ start at which the tracked text fits maxW (never below minPx). Leaves c.font set to it. */
  function fitPx(c, text, weight, start, family, trackingEm, maxW, minPx) {
    var p = start;
    for (; p > minPx; p -= 1) { c.font = font(weight, p, family); if (tracked(c, text, 0, 0, p * trackingEm, 'left', false) <= maxW) return p; }
    c.font = font(weight, minPx, family);
    return minPx;
  }

  // ---------- the brand symbol ----------
  function drawSymbol(c, x, y, size, palette) {
    var P = palette || pal();
    var n = 5, lh = Math.max(1, size * 0.03), gap = size * 0.072, half = size / 2;
    c.save();
    for (var i = 0; i < n; i++) {            // five horizontal lines, fading downward
      c.fillStyle = rgba(P.ivory, (1 - i * 0.2) * 0.95);
      c.fillRect(x - half, y + i * (lh + gap), size, lh);
    }
    var py = y + size * 0.93, hr = size * 0.17;   // one luminous point, far beneath
    var halo = c.createRadialGradient(x, py, 0, x, py, hr);
    halo.addColorStop(0, rgba(P.violet2, 0.7)); halo.addColorStop(0.4, rgba(P.violet, 0.24)); halo.addColorStop(1, rgba(P.violet, 0));
    c.fillStyle = halo; c.beginPath(); c.arc(x, py, hr, 0, Math.PI * 2); c.fill();
    c.fillStyle = rgba(P.white, 1); c.beginPath(); c.arc(x, py, size * 0.026, 0, Math.PI * 2); c.fill();
    c.restore();
  }

  // ---------- glyphs drawn as paths (never rely on ● ◆ being in the font) ----------
  function glyph(c, kind, filled, cx, cy, r, col, P) {
    c.save();
    c.lineWidth = Math.max(1.5, r * 0.2); c.strokeStyle = rgba(col, 1); c.fillStyle = rgba(col, 1);
    c.beginPath();
    if (kind === 'diamond') { c.moveTo(cx, cy - r); c.lineTo(cx + r, cy); c.lineTo(cx, cy + r); c.lineTo(cx - r, cy); c.closePath(); }
    else c.arc(cx, cy, r, 0, Math.PI * 2);
    if (kind === 'void') {                   // the black signal: a dark disc, a thin white ring, the point alone
      c.fillStyle = rgba(P.bg, 1); c.fill(); c.stroke();
      c.fillStyle = rgba(P.white, 1); c.beginPath(); c.arc(cx, cy, Math.max(1.5, r * 0.22), 0, Math.PI * 2); c.fill();
    } else if (filled) c.fill(); else c.stroke();
    c.restore();
  }

  // ---------- the ten-block bar ----------
  function filledBlocks(total, max) {
    max = max || 1000;
    if (VR.daily && VR.daily.bar) {
      var b = VR.daily.bar(total || 0, max), k = 0;
      for (var i = 0; i < b.length; i++) if (b.charAt(i) === '█') k++;
      return k;
    }
    return Math.round(10 * clamp((total || 0) / max, 0, 1));
  }
  function drawBar(c, filled, x, y, w, h, P) {
    var gap = 8, bw = (w - gap * 9) / 10;
    for (var i = 0; i < 10; i++) {
      var bx = x + i * (bw + gap);
      if (i < filled) { c.fillStyle = rgba(P.ivory, 0.96); c.fillRect(bx, y, bw, h); }
      else { c.strokeStyle = rgba(P.ivory, 0.28); c.lineWidth = 1; c.strokeRect(bx + 0.5, y + 0.5, bw - 1, h - 1); }
    }
  }

  // ---------- ground + field ----------
  function drawGround(c, w, h, P) {
    var g = c.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, rgba(mix(P.bg, P.graphite, 0.55), 1));
    g.addColorStop(0.55, rgba(mix(P.bg, P.graphite, 0.12), 1));
    g.addColorStop(1, rgba(P.bg, 1));
    c.fillStyle = g; c.fillRect(0, 0, w, h);
  }
  // The nine band edges as hairlines — structure, not information (no data is placed on them).
  function drawBandLines(c, w, h, P) {
    if (!VR.BANDS || !VR.yOfBandEdges) return;
    c.save(); c.strokeStyle = rgba(P.ivory, 0.055); c.lineWidth = 1;
    for (var i = 0; i < VR.BANDS.length; i++) {
      var y = Math.round(VR.yOfBandEdges(VR.BANDS[i].id).bottom * h) + 0.5;
      if (y >= h) continue;
      c.beginPath(); c.moveTo(0, y); c.lineTo(w, y); c.stroke();
    }
    c.restore();
  }
  // The FIELD's dormant prior: mass near y=0, thinning to nothing at the bottom. Seeded → deterministic.
  function drawPoints(c, w, h, seed, P) {
    var rng = prng(seed);
    for (var i = 0; i < POINTS; i++) {
      var y = clamp(Math.pow(rng(), 2.6) + gauss(rng) * 0.01, 0, 1);
      var x = rng(), tone = rng();
      var a = (0.18 + 0.5 * (1 - y) * rng()) * (1.1 - y * 0.7) * 0.85;
      var s = (0.8 + rng() * 1.6) * (1.25 - y * 0.6);
      if (a <= 0.01) continue;
      var col = tone < 0.78 ? P.blue2 : (tone < 0.95 ? P.violet2 : P.white);
      if (y < 0.12 && tone > 0.5) col = P.white;
      c.fillStyle = rgba(col, clamp(a, 0, 1));
      c.fillRect(x * w, y * h, s, s);
    }
  }
  function veil(c, x, y, r, P, a) {   // a soft dark lens so text sits in a clearing of the haze
    var g = c.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, rgba(P.bg, a)); g.addColorStop(1, rgba(P.bg, 0));
    c.fillStyle = g; c.fillRect(x - r, y - r, r * 2, r * 2);
  }
  function light(c, x, y, r, col, a) {   // the one light in the first screen
    var g = c.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, rgba(col, a)); g.addColorStop(0.5, rgba(col, a * 0.35)); g.addColorStop(1, rgba(col, 0));
    c.fillStyle = g; c.fillRect(x - r, y - r, r * 2, r * 2);
  }

  // ---------- receipt → labels ----------
  function modeLabel(r) {
    if (r && r.mode === 'daily' && r.label && VR.daily && VR.daily.dayNumber) {
      var n = VR.daily.dayNumber(String(r.label));
      if (isFinite(n)) return 'DAILY ' + VR.daily.pad3(n);
    }
    return 'SIGNAL RUN';
  }
  function seedFor(r) {
    var key = [r.run_id || '', r.mode || '', r.label || '', r.total != null ? r.total : '', r.dataset_version || '', r.engine_version || ''].join('|');
    return hash32('card|' + key);
  }
  function statBlock(c, cx, letter, name, value, P) {
    var v = value != null && isFinite(value) ? String(Math.round(value)) : '–';
    c.textBaseline = 'alphabetic';
    c.font = font('700', 92, MONO); var vw = tracked(c, v, 0, 0, 0, 'left', false);
    c.font = font('600', 30, SANS); var lw = tracked(c, letter, 0, 0, 0, 'left', false);
    var gap = 20, total = lw + gap + vw, left = cx - total / 2, base = 778;
    c.fillStyle = rgba(P.violet2, 1); tracked(c, letter, left, base, 0, 'left');
    c.font = font('700', 92, MONO); c.fillStyle = rgba(P.ivory, 0.98); tracked(c, v, left + lw + gap, base, 0, 'left');
    c.font = font('600', 15, SANS); c.fillStyle = rgba(P.ivory, 0.5); tracked(c, name, cx, 814, 15 * 0.3, 'center');
  }

  // ---------- the card ----------
  function render(receipt, dataset) {
    var r = receipt || {}, s = r.summary || {}, P = pal();
    var doc = root.document; if (!doc || !doc.createElement) return null;
    var canvas = doc.createElement('canvas'); canvas.width = SIZE; canvas.height = SIZE;
    var c = canvas.getContext('2d'); if (!c) return null;
    var w = SIZE, h = SIZE, i;

    drawGround(c, w, h, P);
    drawBandLines(c, w, h, P);
    drawPoints(c, w, h, seedFor(r), P);
    veil(c, w / 2, 168, 300, P, 0.55);
    light(c, w / 2, 556, 430, P.violet, 0.16);

    // symbol + wordmark
    drawSymbol(c, w / 2, 84, 112, P);
    c.textBaseline = 'alphabetic';
    c.font = font('600', 64, SANS); c.fillStyle = rgba(P.white, 0.97);
    c.save(); c.shadowColor = rgba(P.bg, 0.95); c.shadowBlur = 22;
    tracked(c, WORDMARK, w / 2, 298, 64 * 0.34, 'center');
    c.restore();

    // mode
    c.font = font('600', 26, SANS); c.fillStyle = rgba(P.violet2, 1);
    tracked(c, modeLabel(r), w / 2, 364, 26 * 0.36, 'center');

    // total — huge, monospace, hot white with a violet bloom
    var total = String(Math.round(+r.total || 0));
    var px = fitPx(c, total, '700', 236, MONO, 0.02, 880, 120);
    c.fillStyle = rgba(P.white, 1);
    c.save(); c.shadowColor = rgba(P.violet, 0.6); c.shadowBlur = 44;
    tracked(c, total, w / 2, 614, px * 0.02, 'center');
    c.restore();

    // the ten-block bar
    drawBar(c, filledBlocks(r.total, r.max_total), 204, 658, 672, 18, P);

    // O and C
    statBlock(c, 368, 'O', 'ORIGINALITY', s.originality_mean, P);
    statBlock(c, 712, 'C', 'CALIBRATION', s.calibration_mean, P);

    // chips: MIRROR ● / ○ · VANTA ◆ / ◇ · BLACK SIGNAL ×n
    var chips = [{ label: 'MIRROR', kind: 'circle', filled: s.mirror_mean != null && s.mirror_mean >= 60, col: P.ivory }];
    if (s.vanta) chips.push({ label: 'VANTA', kind: 'diamond', filled: !!s.vanta.met, col: s.vanta.met ? P.violet2 : P.ivory });
    if (s.black_signals) chips.push({ label: 'BLACK SIGNAL ×' + s.black_signals, kind: 'void', filled: true, col: P.white });
    var cy = 900, gr = 10, tgap = 16, sep = 64, tw = 0;
    c.font = font('600', 24, SANS); c.textBaseline = 'middle';
    for (i = 0; i < chips.length; i++) { chips[i].w = tracked(c, chips[i].label, 0, 0, 24 * 0.22, 'left', false) + tgap + gr * 2; tw += chips[i].w; }
    tw += sep * (chips.length - 1);
    var cx = w / 2 - tw / 2;
    for (i = 0; i < chips.length; i++) {
      var ch = chips[i];
      c.fillStyle = rgba(ch.col, ch.filled ? 0.96 : 0.62);
      var lw = tracked(c, ch.label, cx, cy, 24 * 0.22, 'left');
      glyph(c, ch.kind, ch.filled, cx + lw + tgap + gr, cy, gr, ch.col, P);
      cx += ch.w + sep;
    }

    // footer — the dataset line, verbatim, always
    c.strokeStyle = rgba(P.ivory, 0.14); c.lineWidth = 1;
    c.beginPath(); c.moveTo(96, 962.5); c.lineTo(w - 96, 962.5); c.stroke();
    var dsv = r.dataset_version || (dataset && dataset.dataset_version) || 'DATASET UNKNOWN';
    var ev = r.engine_version || VR.ENGINE_VERSION || '?';
    var foot = SOURCE_LINE + ' · ' + dsv + ' · ENGINE ' + ev;
    c.textBaseline = 'alphabetic';
    var fp = fitPx(c, foot, '600', 19, SANS, 0.1, w - 96, 11);
    c.fillStyle = rgba(P.ivory, 0.62);
    tracked(c, foot, w / 2, 1016, fp * 0.1, 'center');

    return canvas;
  }

  // ---------- canvas → PNG Blob ----------
  function toBlob(canvas, cb) {
    var done = false;
    function fin(b) { if (done) return; done = true; cb(b || null); }
    function viaDataURL() {
      try {
        var url = canvas.toDataURL('image/png'), k = url.indexOf(',');
        if (k < 0) return fin(null);
        var bin = root.atob(url.slice(k + 1)), u8 = new Uint8Array(bin.length);
        for (var i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
        fin(new root.Blob([u8], { type: 'image/png' }));
      } catch (e) { fin(null); }
    }
    if (typeof canvas.toBlob === 'function') {
      try { canvas.toBlob(function (b) { if (b) fin(b); else viaDataURL(); }, 'image/png'); return; } catch (e) { /* fall through */ }
    }
    viaDataURL();
  }

  /** The only entry point app.js uses. cb(blob) fires exactly once; blob is null on failure. */
  function card(receipt, dataset, cb) {
    cb = typeof cb === 'function' ? cb : function () {};
    var canvas = null;
    try { canvas = render(receipt, dataset); } catch (e) { canvas = null; }
    if (!canvas) { cb(null); return; }
    toBlob(canvas, cb);
  }

  function text(receipt) { return VR.daily.shareText(receipt); }

  VR.share = { SIZE: SIZE, SOURCE_LINE: SOURCE_LINE, WORDMARK: WORDMARK, card: card, text: text, render: render, drawSymbol: drawSymbol, modeLabel: modeLabel, toBlob: toBlob };
})(typeof window !== 'undefined' ? window : this);

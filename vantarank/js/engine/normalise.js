/* VANTARANK — answer normalisation, canonicalisation and validation.
 *
 * VALIDATION and POPULARITY are separate concepts (see docs/DATA_ENGINE.md):
 *   VALID             the input maps to a listed answer that carries a count
 *   VALID_UNMEASURED  the input maps to an answer the dataset marks valid but has no count for
 *   UNMEASURED        the input passes shape checks but the dataset has never seen it — NOT 0%, NOT invalid
 *   INVALID           empty / shapeless / on the question's explicit reject list
 *
 * Resolution order per input: exact normalised form → joined/split variants → singularised variants.
 * Every dataset term is indexed through the same variant generator, so matching is symmetric.
 */
(function (root) {
  'use strict';
  var VR = root.VR || (root.VR = {});

  var ARTICLES = /^(a|an|the|some|my|your|our|their|his|her|its|one)\s+/;
  var KEEP = /[^a-z0-9\s'-]/g;

  var IRREGULAR = {
    children: 'child', people: 'person', men: 'man', women: 'woman', teeth: 'tooth', feet: 'foot', geese: 'goose',
    mice: 'mouse', knives: 'knife', leaves: 'leaf', wolves: 'wolf', halves: 'half', loaves: 'loaf', shelves: 'shelf',
    lives: 'life', wives: 'wife', thieves: 'thief', calves: 'calf', scarves: 'scarf', dice: 'die', oxen: 'ox',
    cacti: 'cactus', fungi: 'fungus', octopi: 'octopus', lice: 'louse', bacteria: 'bacterium', criteria: 'criterion'
  };
  // Words that are plural-shaped but are the natural singular term (never strip their s).
  var INVARIANT = {};
  ['sheep', 'fish', 'deer', 'series', 'species', 'glasses', 'sunglasses', 'scissors', 'jeans', 'shorts', 'pants', 'thongs', 'tongs',
   'pliers', 'trousers', 'clothes', 'chips', 'news', 'headphones', 'goggles', 'binoculars', 'tweezers', 'stairs', 'pyjamas', 'pajamas',
   'leggings', 'tights', 'sunnies', 'flippers', 'fins', 'boardies', 'swimmers', 'togs', 'earbuds', 'bathers', 'gas', 'bus', 'lens',
   'chess', 'darts', 'tennis', 'physics', 'maths', 'mathematics', 'economics', 'politics', 'athletics', 'gymnastics', 'aerobics',
   'means', 'lego', 'cactus', 'octopus', 'hippopotamus', 'platypus', 'walrus', 'virus', 'bonus', 'chorus', 'circus', 'campus',
   'crocs', 'undies', 'trackies', 'overalls', 'braces', 'dentures', 'oats', 'grits', 'noodles', 'cornflakes', 'cereal', 'nuts',
   'lollies', 'chopsticks', 'tights', 'slacks', 'kilos', 'mangoes', 'tomatoes', 'potatoes']
    .forEach(function (w) { INVARIANT[w] = true; });
  // -oes words whose singular drops "es" (tomato, potato) rather than "s" (shoe, toe, canoe)
  var OES_DROP_ES = { tomatoes: 1, potatoes: 1, heroes: 1, mangoes: 1, echoes: 1, volcanoes: 1, torpedoes: 1, mosquitoes: 1, dominoes: 1, buffaloes: 1, avocadoes: 1 };

  function stripDiacritics(s) {
    try { return s.normalize('NFKD').replace(/[̀-ͯ]/g, ''); } catch (e) { return s; }
  }

  /** Canonical text form: lowercase ASCII, single spaces, no punctuation but ' and -, leading articles removed. */
  function normalise(input) {
    var s = String(input == null ? '' : input);
    s = stripDiacritics(s).toLowerCase();
    s = s.replace(/[‘’ʼ`]/g, "'").replace(/[“”"]/g, '');
    s = s.replace(/&/g, ' and ');
    s = s.replace(/[_/+.,!?;:()\[\]{}]/g, ' ');
    s = s.replace(KEEP, ' ');
    s = s.replace(/\s*-\s*/g, '-');           // "flip - flops" → "flip-flops"
    s = s.replace(/\s+/g, ' ').trim();
    s = s.replace(/^['-]+|['-]+$/g, '').trim();
    var prev;
    do { prev = s; s = s.replace(ARTICLES, ''); } while (s !== prev && s.length);
    return s.trim();
  }

  function singularWord(w) {
    if (w.length <= 3 || INVARIANT[w]) return w;
    if (IRREGULAR[w]) return IRREGULAR[w];
    if (/(ss|us|is|os|ics|ness|ous)$/.test(w)) return w;
    if (/ies$/.test(w) && w.length > 4) return w.slice(0, -3) + 'y';
    if (/(ches|shes|sses|xes|zes)$/.test(w)) return w.slice(0, -2);
    if (/oes$/.test(w)) return OES_DROP_ES[w] ? w.slice(0, -2) : w.slice(0, -1);
    if (/'s$/.test(w)) return w.slice(0, -2);
    if (/s$/.test(w)) return w.slice(0, -1);
    return w;
  }

  /** Singularise the last word of a phrase ("beach towels" → "beach towel"). */
  function singularise(phrase) {
    if (!phrase) return phrase;
    var parts = phrase.split(' ');
    var last = parts[parts.length - 1];
    var lastParts = last.split('-');
    lastParts[lastParts.length - 1] = singularWord(lastParts[lastParts.length - 1]);
    parts[parts.length - 1] = lastParts.join('-');
    return parts.join(' ');
  }

  /** Ordered, de-duplicated list of matchable forms for a piece of text. */
  function variants(text) {
    var n = normalise(text);
    if (!n) return [];
    var out = [], seen = {};
    function add(v) { if (v && !seen[v]) { seen[v] = true; out.push(v); } }
    add(n);
    add(n.replace(/-/g, ' '));
    add(n.replace(/[-\s]/g, ''));
    add(n.replace(/'/g, ''));
    var s = singularise(n);
    add(s);
    add(s.replace(/-/g, ' '));
    add(s.replace(/[-\s]/g, ''));
    add(s.replace(/'/g, ''));
    return out;
  }

  // ---------- per-question index (cached on the frozen question object via a WeakMap) ----------
  var INDEX = (typeof WeakMap !== 'undefined') ? new WeakMap() : null;

  function buildIndex(question) {
    var map = {};
    function put(term, hit) {
      variants(term).forEach(function (v) { if (!map[v]) map[v] = hit; });
    }
    (question.answers || []).forEach(function (a) {
      var hit = { type: 'VALID', answer: a, canonical: a.canonical };
      put(a.canonical, hit);
      (a.aliases || []).forEach(function (al) { put(al, hit); });
    });
    (question.valid_unmeasured || []).forEach(function (t) { put(t, { type: 'VALID_UNMEASURED', canonical: normalise(t) }); });
    (question.rejects || []).forEach(function (t) { put(t, { type: 'INVALID', canonical: normalise(t), reason: 'listed as not an answer to this prompt' }); });
    return map;
  }

  function indexFor(question) {
    if (INDEX) {
      var m = INDEX.get(question);
      if (!m) { m = buildIndex(question); INDEX.set(question, m); }
      return m;
    }
    return buildIndex(question);
  }

  /** Shape checks that precede any lookup. Returns null when the shape is acceptable, else a reason string. */
  function shapeProblem(n) {
    if (!n) return 'empty';
    if (n.length > 48) return 'too long';
    if (!/[a-z]/.test(n)) return 'no letters';
    if (n.split(' ').length > 6) return 'too many words';
    if (/^(idk|dunno|nothing|none|no idea|pass|skip|n a)$/.test(n)) return 'not an answer';
    return null;
  }

  /**
   * Resolve a typed answer against a question.
   * @returns {{status:string, canonical:string|null, answer:object|null, input:string, normalised:string, matched:string|null, reason:string|null}}
   */
  function resolve(question, input) {
    var n = normalise(input);
    var base = { input: String(input == null ? '' : input), normalised: n, canonical: null, answer: null, matched: null, reason: null };
    var shape = shapeProblem(n);
    if (shape) return Object.assign(base, { status: 'INVALID', reason: shape });
    var idx = indexFor(question);
    var vs = variants(n);
    for (var i = 0; i < vs.length; i++) {
      var hit = idx[vs[i]];
      if (hit) {
        return Object.assign(base, {
          status: hit.type, canonical: hit.canonical, answer: hit.answer || null, matched: vs[i], reason: hit.reason || null
        });
      }
    }
    return Object.assign(base, { status: 'UNMEASURED', canonical: n, reason: 'not in this dataset' });
  }

  VR.normalise = normalise;
  VR.singularise = singularise;
  VR.variants = variants;
  VR.resolve = resolve;
  VR.indexFor = indexFor;
  VR.STATUS = { VALID: 'VALID', VALID_UNMEASURED: 'VALID_UNMEASURED', UNMEASURED: 'UNMEASURED', INVALID: 'INVALID' };
})(typeof window !== 'undefined' ? window : this);

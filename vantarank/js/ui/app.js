/* VANTARANK — the UI controller. Binds the run state machine to the DOM, the FIELD and the audio.
 * Every animation here is skippable and none of it touches scoring: the numbers come from VR.Run.
 */
(function (root) {
  'use strict';
  var VR = root.VR || (root.VR = {});
  var doc = root.document;
  function $(id) { return doc.getElementById(id); }
  function el(tag, cls, text) { var e = doc.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function show(e, on) { if (e) e.hidden = !on; }
  function up(s) { return String(s == null ? '' : s).toUpperCase(); }

  var TYPE_COPY = {
    standard: { title: 'SIGNAL', text: 'Give a valid answer that few others would give. Then predict how rare it really is.' },
    mirror: { title: 'MIRROR', text: 'The rules invert. Give the answer you believe MOST other people give. Being unusual is bad here. Then predict where it lives.' },
    vanta: { title: 'VANTA', text: 'Choose a DARK CONTRACT before you type. Meet it and your score multiplies. Miss it and the multiplier turns against you.' }
  };
  var PRACTICE_COPY = {
    intro: 'PRACTICE. One signal, unscored. You will type an answer, then place it on the crowd, then watch it fall to where the crowd really put it.',
    answer: 'Type any valid answer. Rarer is better — but only if you know it is rare.',
    predict: 'Now the real skill: where does your answer live in the crowd? Drag the field with a thumb, or pick a band on the ladder.'
  };

  var app = {
    ds: null, run: null, field: null, audio: null, practice: false, revealTimers: [], receipt: null, duelChallenge: null,
    screen: 'title',

    init: function () {
      this.ds = VR.DATASETS[VR.DEFAULT_DATASET];
      this.audio = new VR.Audio();
      this.applySettings();
      this.buildLadder();
      this.bind();
      this.buildContracts();
      this.renderTitle();
      this.route();
      this.viewport();
    },

    // ---------- settings ----------
    reducedMotion: function () {
      var m = VR.history.settings.get('motion');
      if (m === 'reduced') return true;
      if (m === 'full') return false;
      try { return root.matchMedia && root.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; }
    },
    applySettings: function () {
      var s = VR.history.settings.all();
      doc.documentElement.setAttribute('data-motion', this.reducedMotion() ? 'reduced' : 'full');
      doc.documentElement.setAttribute('data-contrast', s.contrast ? 'high' : 'normal');
      this.audio.setEnabled(!!s.sound);
      if (this.field) this.field.setOptions({ reducedMotion: this.reducedMotion(), highContrast: !!s.contrast });
      var t;
      if ((t = $('set-sound'))) t.checked = !!s.sound;
      if ((t = $('set-motion'))) t.value = s.motion || 'auto';
      if ((t = $('set-contrast'))) t.checked = !!s.contrast;
    },

    // ---------- navigation ----------
    show: function (name) {
      var self = this;
      ['title', 'play', 'results', 'constellation', 'profile', 'settings', 'duel', 'survey', 'data'].forEach(function (n) { show($('screen-' + n), n === name); });
      this.screen = name;
      doc.body.setAttribute('data-screen', name);
      if (name === 'constellation') this.renderConstellation();
      if (name === 'profile') this.renderProfile();
      if (name === 'data') this.renderData();
      if (name === 'title') this.renderTitle();
      if (name === 'duel') this.renderDuel();
      if (name !== 'play' && this.audio) this.audio.stopDrone();
      root.scrollTo(0, 0);
    },
    route: function () {
      var q = {};
      try { root.location.search.replace(/^\?/, '').split('&').forEach(function (kv) { if (!kv) return; var p = kv.split('='); q[decodeURIComponent(p[0])] = decodeURIComponent(p[1] || ''); }); } catch (e) { /* ignore */ }
      if (q.duel) { var p = VR.duel.parse(q.duel); if (p.ok) { this.duelChallenge = p.challenge; this.show('duel'); return; } }
      if (q.q) { var byId = {}; this.ds.questions.forEach(function (x) { byId[x.question_id] = x; }); if (byId[q.q]) { this.startRun('single', { questionIds: [q.q], plan: 'S', label: q.q }); return; } }
      if (q.daily != null) { this.startDaily(); return; }
      this.show('title');
    },
    viewport: function () {
      var vv = root.visualViewport;
      function set() {
        var h = vv ? vv.height : root.innerHeight;
        doc.documentElement.style.setProperty('--vvh', Math.round(h) + 'px');
        if (app.field) app.field.resize();
      }
      if (vv) { vv.addEventListener('resize', set); vv.addEventListener('scroll', set); }
      root.addEventListener('resize', set);
      set();
    },

    // ---------- title ----------
    renderTitle: function () {
      var d = VR.daily.today(this.ds.dataset_version);
      var b = $('btn-daily'); if (b) { b.textContent = d.label; b.disabled = !!VR.history.dailyDone(d.date); b.title = b.disabled ? 'Played today' : 'The same nine signals for everyone today'; }
      var pd = VR.history.settings.get('practice_done');
      var bp = $('btn-practice'); if (bp) bp.classList.toggle('primary', !pd);
      var bpl = $('btn-play'); if (bpl) bpl.classList.toggle('primary', !!pd);
      var st = VR.history.stats();
      var t = $('title-stats'); if (t) t.textContent = st.runs ? st.runs + ' RUNS · BEST ' + st.best_total : 'NO RUNS YET';
      var dv = $('title-dataset'); if (dv) dv.textContent = this.ds.dataset_version + ' · ' + this.ds.question_count + ' SIGNALS · ' + this.ds.dataset_source;
    },

    // ---------- ladder (the nine bands, keyboard + touch) ----------
    buildLadder: function () {
      var lad = $('ladder'); if (!lad) return;
      lad.innerHTML = '';
      var self = this;
      VR.BANDS.forEach(function (b, i) {
        var e = VR.yOfBandEdges(b.id);
        var btn = el('button', 'band', null);
        btn.type = 'button'; btn.setAttribute('role', 'radio'); btn.setAttribute('aria-checked', 'false'); btn.dataset.band = b.id; btn.tabIndex = i === 4 ? 0 : -1;
        btn.style.top = (e.top * 100) + '%'; btn.style.height = ((e.bottom - e.top) * 100) + '%';
        btn.setAttribute('aria-label', b.label + ', ' + b.range + ', ' + b.hint);
        btn.appendChild(el('span', 'band-name', b.label));
        btn.appendChild(el('span', 'band-range', b.range));
        btn.addEventListener('click', function () { self.predict(b.id); });
        lad.appendChild(btn);
      });
      lad.addEventListener('keydown', function (ev) {
        if (!self.run || self.run.state !== 'PREDICT') return;
        var i = VR.bandIndex(self.run.current.band || 'mid');
        if (ev.key === 'ArrowUp' || ev.key === 'ArrowLeft') { self.predict(VR.BANDS[Math.max(0, i - 1)].id); ev.preventDefault(); }
        else if (ev.key === 'ArrowDown' || ev.key === 'ArrowRight') { self.predict(VR.BANDS[Math.min(VR.BANDS.length - 1, i + 1)].id); ev.preventDefault(); }
        else if (ev.key === 'Home') { self.predict(VR.BANDS[0].id); ev.preventDefault(); }
        else if (ev.key === 'End') { self.predict(VR.BANDS[VR.BANDS.length - 1].id); ev.preventDefault(); }
        else if (ev.key === 'Enter' || ev.key === ' ') { if (self.run.current.band) { self.commit(); ev.preventDefault(); } }
      });
    },
    setLadder: function (bandId, enabled) {
      var lad = $('ladder'); if (!lad) return;
      lad.classList.toggle('active', !!enabled);
      Array.prototype.forEach.call(lad.querySelectorAll('.band'), function (b) {
        var on = b.dataset.band === bandId;
        b.setAttribute('aria-checked', on ? 'true' : 'false'); b.classList.toggle('on', on); b.disabled = !enabled;
        b.tabIndex = enabled ? (on || (!bandId && b.dataset.band === 'mid') ? 0 : -1) : -1;
      });
    },

    buildContracts: function () {
      var c = $('contracts'); if (!c) return;
      c.innerHTML = '';
      var self = this;
      Object.keys(VR.SCORING_CONFIG.vanta).forEach(function (id) {
        var k = VR.SCORING_CONFIG.vanta[id];
        var b = el('button', 'contract contract-' + id); b.type = 'button';
        b.appendChild(el('span', 'contract-name', k.label));
        b.appendChild(el('span', 'contract-rule', k.rule));
        b.appendChild(el('span', 'contract-mult', '×' + k.mult + ' met · ×' + VR.round(1 / k.mult, 2) + ' missed'));
        b.addEventListener('click', function () { self.contract(id); });
        c.appendChild(b);
      });
    },

    // ---------- binding ----------
    bind: function () {
      var self = this;
      function on(id, ev, fn) { var e = $(id); if (e) e.addEventListener(ev, fn); }
      on('btn-play', 'click', function () { self.startRun('standard'); });
      on('btn-practice', 'click', function () { self.startRun('practice'); });
      on('btn-daily', 'click', function () { self.startDaily(); });
      on('btn-duel', 'click', function () { self.show('duel'); });
      on('nav-constellation', 'click', function () { self.show('constellation'); });
      on('nav-profile', 'click', function () { self.show('profile'); });
      on('nav-settings', 'click', function () { self.show('settings'); });
      on('nav-home', 'click', function () { self.confirmLeave(); });
      on('btn-begin', 'click', function () { self.begin(); });
      on('step-answer', 'submit', function (ev) { ev.preventDefault(); self.lock(); });
      on('btn-commit', 'click', function () { self.commit(); });
      on('btn-next', 'click', function () { self.next(); });
      on('btn-skip', 'click', function () { self.skipReveal(); });
      on('btn-challenge-signal', 'click', function () { self.copySignalLink(); });
      on('btn-again', 'click', function () { self.startRun('standard'); });
      on('btn-results-constellation', 'click', function () { self.show('constellation'); });
      on('btn-copy-share', 'click', function () { self.copyShare(); });
      on('btn-card', 'click', function () { self.downloadCard(); });
      on('btn-verify', 'click', function () { self.verifyReceipt(); });
      on('btn-copy-receipt', 'click', function () { self.copyReceipt(); });
      on('btn-duel-from-run', 'click', function () { self.duelFromRun(); });
      on('set-sound', 'change', function (ev) { VR.history.settings.set('sound', ev.target.checked); self.applySettings(); if (ev.target.checked) self.audio.click(); });
      on('set-motion', 'change', function (ev) { VR.history.settings.set('motion', ev.target.value); self.applySettings(); });
      on('set-contrast', 'change', function (ev) { VR.history.settings.set('contrast', ev.target.checked); self.applySettings(); });
      on('btn-reset', 'click', function () { if (root.confirm('Delete all local VANTARANK history and settings on this device?')) { VR.history.reset(); self.applySettings(); self.renderTitle(); self.toast('LOCAL HISTORY CLEARED'); } });
      on('btn-export', 'click', function () { self.download('vantarank-history.json', JSON.stringify(VR.history.load(), null, 1), 'application/json'); });
      on('nav-data', 'click', function () { self.show('data'); });
      on('btn-survey', 'click', function () { self.show('survey'); self.renderSurvey(); });
      on('duel-create', 'click', function () { self.duelCreate(); });
      on('duel-open', 'click', function () { self.duelOpen(); });
      on('duel-play', 'click', function () { self.duelPlay(); });
      on('duel-compare', 'click', function () { self.duelCompare(); });
      on('survey-consent', 'change', function () { self.renderSurvey(); });
      on('survey-form', 'submit', function (ev) { ev.preventDefault(); self.surveySubmit(); });
      on('survey-export', 'click', function () { self.download('vantarank-survey-local.json', JSON.stringify(VR.history.surveyExport(), null, 1), 'application/json'); });
      doc.addEventListener('keydown', function (ev) { self.keys(ev); });
      root.addEventListener('resize', function () { if (self.field) self.field.resize(); });
      doc.addEventListener('visibilitychange', function () { if (self.field) { if (doc.hidden) self.field.stop(); else self.field.start(); } });
      // first user gesture unlocks audio
      ['pointerdown', 'keydown'].forEach(function (evn) { doc.addEventListener(evn, function () { if (self.audio.enabled) self.audio.ensure(); }, { once: true }); });
    },
    keys: function (ev) {
      if (!this.run || this.screen !== 'play') return;
      var st = this.run.state;
      var tag = (ev.target && ev.target.tagName) || '';
      if (st === 'SIGNAL_INTRO' && (ev.key === 'Enter' || ev.key === ' ') && tag !== 'BUTTON') { this.begin(); ev.preventDefault(); }
      else if (st === 'REVEAL' && (ev.key === 'Enter' || ev.key === ' ' || ev.key === 'Escape') && tag !== 'BUTTON') { this.skipReveal(); ev.preventDefault(); }
      else if (st === 'SCORED' && ev.key === 'Enter' && tag !== 'BUTTON') { this.next(); ev.preventDefault(); }
      else if (st === 'PREDICT' && tag !== 'BUTTON' && tag !== 'INPUT') {
        var lad = $('ladder'); if (lad && (ev.key === 'ArrowUp' || ev.key === 'ArrowDown')) { var f = lad.querySelector('.band[tabindex="0"]'); if (f) f.focus(); }
      }
    },
    confirmLeave: function () {
      if (this.run && this.run.state !== 'RUN_END' && this.run.state !== 'IDLE' && this.run.state !== 'ABANDONED' && this.screen === 'play') {
        if (!root.confirm('Abandon this run? Nothing is saved from an abandoned run.')) return;
        this.run.abandon();
      }
      this.show('title');
    },

    // ---------- runs ----------
    ensureField: function () {
      if (this.field) { this.field.resize(); return; }
      var self = this;
      this.field = new VR.Field($('field'), { reducedMotion: this.reducedMotion(), highContrast: !!VR.history.settings.get('contrast') });
      this.field.onPredict = function (bandId) { self.predict(bandId); };
    },
    startDaily: function () {
      var d = VR.daily.today(this.ds.dataset_version);
      if (VR.history.dailyDone(d.date)) { this.toast('TODAY’S DAILY IS PLAYED. BACK TOMORROW.'); this.show('title'); return; }
      var o = VR.daily.runOptions(this.ds, d.date);
      this.startRun('daily', o);
    },
    startRun: function (mode, opts) {
      opts = opts || {};
      this.practice = mode === 'practice';
      var o = Object.assign({ dataset: this.ds, mode: mode, exclude: VR.history.recentQuestionIds(27) }, opts);
      if (mode === 'single') { o.mode = 'single'; o.plan = 'S'; }
      try { this.run = new VR.Run(o); } catch (e) { this.toast('COULD NOT START: ' + e.message); return; }
      var self = this;
      this.run.on('signal', function (ev) { self.onSignal(ev); });
      this.run.on('end', function (r) { self.onEnd(r); });
      this.show('play');
      this.ensureField();
      this.run.start();
    },
    stepShow: function (name) {
      ['intro', 'contract', 'answer', 'predict', 'reveal'].forEach(function (s) { show($('step-' + s), s === name); });
    },
    onSignal: function (ev) {
      var run = this.run, c = run.current, copy = TYPE_COPY[c.type];
      this.clearTimers();
      $('signal-count').textContent = (run.mode === 'practice' ? 'PRACTICE' : 'SIGNAL ' + (ev.index + 1) + ' OF ' + ev.total);
      var chip = $('signal-type'); chip.textContent = up(copy.title); chip.className = 'type-chip type-' + c.type;
      $('prompt').textContent = c.prompt;
      $('run-total').textContent = run.mode === 'practice' ? '' : run.total();
      $('intro-title').textContent = copy.title;
      $('intro-text').textContent = this.practice ? PRACTICE_COPY.intro : copy.text;
      doc.body.setAttribute('data-signal', c.type);
      this.field.setDormant();
      this.field.setMirror(c.type === 'mirror');
      if (c.type === 'mirror') this.field.mirrorRush();
      this.audio.startDrone(c.type === 'mirror');
      this.setLadder(null, false);
      show($('btn-skip'), false);
      this.stepShow('intro');
      $('btn-begin').focus();
      this.announce(copy.title + '. ' + c.prompt);
    },
    begin: function () {
      var run = this.run; if (run.state !== 'SIGNAL_INTRO') return;
      run.begin();
      if (run.state === 'CONTRACT') { this.stepShow('contract'); var f = $('contracts').querySelector('button'); if (f) f.focus(); this.announce('Choose a dark contract before typing.'); return; }
      this.showAnswer();
    },
    contract: function (id) {
      if (this.run.state !== 'CONTRACT') return;
      this.run.chooseContract(id);
      this.audio.click();
      this.showAnswer();
      var k = VR.SCORING_CONFIG.vanta[id];
      $('answer-hint').textContent = 'CONTRACT: ' + k.label + ' — ' + k.rule + '.';
    },
    showAnswer: function () {
      var c = this.run.current;
      this.stepShow('answer');
      var inp = $('answer'); inp.value = ''; inp.setCustomValidity('');
      $('answer-label').textContent = c.type === 'mirror' ? 'TYPE THE ANSWER MOST PEOPLE GIVE' : 'TYPE A VALID ANSWER';
      $('answer-hint').textContent = this.practice ? PRACTICE_COPY.answer : (c.type === 'mirror' ? 'The crowd is the target.' : '');
      inp.focus();
    },
    lock: function () {
      var run = this.run; if (run.state !== 'ANSWER') return;
      var inp = $('answer');
      var r = run.submitAnswer(inp.value);
      if (!r.locked) {
        var why = { empty: 'Type something.', 'too long': 'Keep it under 48 characters.', 'no letters': 'Use letters.', 'too many words': 'Six words at most.', 'not an answer': 'That is not an answer.' }[r.resolution.reason] || 'Not a valid answer.';
        $('answer-hint').textContent = why;
        inp.classList.remove('shake'); void inp.offsetWidth; inp.classList.add('shake');
        this.announce(why);
        return;
      }
      this.audio.click();
      var label = up(r.resolution.canonical || r.resolution.normalised);
      this.field.setAnswer(label);
      $('locked-answer').textContent = label;
      this.stepShow('predict');
      $('predict-hint').textContent = this.practice ? PRACTICE_COPY.predict : 'Drag the field with a thumb, or pick a band on the ladder. Arrow keys work too.';
      this.setLadder(null, true);
      this.field.enableDrag(true);
      $('band-label').textContent = '—'; $('band-range').textContent = ''; $('band-hint').textContent = 'no prediction yet';
      $('btn-commit').disabled = true;
      inp.blur();
      var mid = $('ladder').querySelector('.band[data-band="mid"]'); if (mid) mid.focus();
      this.announce('Locked ' + label + '. Now predict where it lives in the crowd.');
    },
    predict: function (bandId) {
      var run = this.run; if (!run || run.state !== 'PREDICT') return;
      run.predict(bandId);
      var b = VR.bandById(bandId);
      this.field.setPrediction(bandId);
      this.setLadder(bandId, true);
      $('band-label').textContent = b.label; $('band-range').textContent = b.range; $('band-hint').textContent = b.hint;
      $('btn-commit').disabled = false;
      this.announce('Prediction ' + b.label + ', ' + b.range);
    },
    commit: function () {
      var run = this.run; if (run.state !== 'PREDICT' || !run.current.band) return;
      this.audio.lock();
      var c = run.commit();
      var self = this;
      this.setLadder(c.band, false);
      this.field.enableDrag(false);
      this.renderRevealShell(c);
      this.stepShow('reveal');
      show($('btn-skip'), !this.reducedMotion());
      $('btn-next').disabled = true;
      var rate = c.score.flags.invalid ? VR.AXIS.top : c.score.rate_used;
      var q = run.questions[run.index];
      var profile = VR.questionProfile(q);
      this.field.activate(profile, { rate: rate, bandId: c.band, type: c.type, flags: c.score.flags }, function () { self.revealResolved(); });
      this.audio.activate();
      if (!this.reducedMotion()) this.timer(function () { self.audio.travel(VR.yOf(rate) > 0.5, 1.0); }, 260);
      this.announce('Committed. Revealing.');
    },
    renderRevealShell: function (c) {
      var lbl = c.score.flags.invalid ? up(c.input) : up(c.canonical || c.normalised);
      $('rv-answer').textContent = lbl;
      var st = $('rv-status');
      var stText = { VALID: c.freq && c.freq.support === 'THIN' ? 'THIN SAMPLE' : 'MEASURED', VALID_UNMEASURED: 'VALID · UNMEASURED', UNMEASURED: 'UNMEASURED', INVALID: 'NOT AN ANSWER' }[c.status];
      st.textContent = stText; st.className = 'chip chip-' + c.status.toLowerCase();
      $('rv-observed').textContent = '…'; $('rv-scored').textContent = '';
      var b = VR.bandById(c.band); $('rv-pred').textContent = b.label + ' · ' + b.range;
      $('rv-band').textContent = '…';
      $('sc-main-label').textContent = c.score.main_label;
      $('sc-main').textContent = '·'; $('sc-cal').textContent = '·'; $('sc-v').textContent = '·';
      $('rv-flags').textContent = ''; $('rv-flags').className = 'reveal-flags';
      $('rv-dist').innerHTML = '';
      $('rv-data').innerHTML = '';
      var ch = $('btn-challenge-signal'); if (ch) ch.hidden = true;
    },
    skipReveal: function () {
      if (!this.run || this.run.state !== 'REVEAL') return;
      this.clearTimers();
      this.field.skip();
    },
    /** Called once by the field when the answer has landed (or on skip). Resolves the numbers in sequence. */
    revealResolved: function () {
      var run = this.run; if (!run || run.state !== 'REVEAL') return;
      var c = run.current, s = c.score, self = this, rm = this.reducedMotion();
      show($('btn-skip'), false);
      var q = run.questions[run.index], profile = VR.questionProfile(q);
      var steps = [];
      // 1. frequency resolves
      steps.push(function () {
        if (s.flags.invalid) { $('rv-observed').textContent = 'NOT AN ANSWER'; $('rv-band').textContent = '—'; return; }
        var raw = c.freq.raw_rate, scored = c.freq.scoring_rate;
        if (c.freq.support === 'UNMEASURED') { $('rv-observed').textContent = 'UNMEASURED'; $('rv-scored').textContent = 'scored at the floor ' + VR.fmtPct(scored) + ' (' + VR.oneIn(scored) + ')'; }
        else { self.countUp($('rv-observed'), raw, rm); $('rv-scored').textContent = (Math.abs(scored - raw) / Math.max(raw, 1e-9) > 0.03 ? 'scored at ' + VR.fmtPct(scored) + ' · ' : '') + VR.oneIn(raw) + ' · ' + c.freq.confidence_label + ' confidence'; }
        var tb = VR.bandOf(scored); $('rv-band').textContent = tb.label + ' · ' + tb.range;
        self.renderDistribution(profile, c);
      });
      // 2. main score lands
      steps.push(function () { self.pop($('sc-main'), s.main); });
      // 3. calibration lands
      steps.push(function () { self.pop($('sc-cal'), s.calibration); });
      // 4. vantarank lands (+ contract)
      steps.push(function () {
        self.pop($('sc-v'), s.vantarank);
        var flags = [];
        if (c.type === 'vanta' && c.contract) { var k = VR.SCORING_CONFIG.vanta[c.contract]; flags.push(k.label + (s.contract_met ? ' MET ×' + s.multiplier : ' MISSED ×' + s.multiplier)); if (!s.contract_met) self.audio.fail(); }
        if (s.flags.thin) flags.push('THIN SAMPLE — scored conservatively');
        if (s.flags.unmeasured) flags.push(c.status === 'VALID_UNMEASURED' ? 'VALID BUT UNMEASURED — provisional score' : 'UNMEASURED — provisional score, not 0%');
        if (s.flags.invalid) flags.push('NOT A VALID ANSWER — 0');
        if (s.flags.perfect_calibration) flags.push('PERFECT CALIBRATION');
        if (s.flags.mirror_lock) flags.push('MIRROR LOCK');
        if (s.flags.black_signal) flags.push('BLACK SIGNAL');
        $('rv-flags').textContent = flags.join(' · ');
        $('rv-flags').className = 'reveal-flags' + (s.flags.black_signal ? ' black' : s.flags.perfect_calibration ? ' perfect' : '');
        self.audio.land(s.vantarank >= 60);
        $('run-total').textContent = run.mode === 'practice' ? '' : run.total();
        self.renderDataDetails(c, q);
        var ch = $('btn-challenge-signal'); if (ch) ch.hidden = run.mode === 'practice';
      });
      // 5. effects
      steps.push(function () {
        if (s.flags.perfect_calibration && !s.flags.black_signal) { self.field.shockwave(); self.audio.shock(); }
        if (s.flags.mirror_lock) { self.field.mirrorRush(); self.audio.shock(); }
        if (s.flags.black_signal) self.blackSignal(up(c.canonical));
      });
      steps.push(function () {
        run.revealDone();
        $('btn-next').disabled = false;
        $('btn-next').textContent = run.index + 1 >= run.length() ? (run.mode === 'practice' ? 'PRACTICE COMPLETE' : 'SEE YOUR VANTARANK') : 'NEXT SIGNAL';
        $('btn-next').focus();
        var msg = s.flags.invalid ? 'Not a valid answer. Zero.' : up(c.canonical) + ': ' + (c.freq.support === 'UNMEASURED' ? 'unmeasured' : VR.fmtPct(c.freq.raw_rate)) + '. ' + s.main_label + ' ' + s.main + ', calibration ' + s.calibration + ', vantarank ' + s.vantarank + '.';
        self.announce(msg);
      });
      var gap = rm ? 0 : 420;
      steps.forEach(function (fn, i) { if (rm) fn(); else self.timer(fn, i * gap); });
    },
    renderDistribution: function (profile, c) {
      var box = $('rv-dist'); box.innerHTML = '';
      var rows = profile.answers.slice(0, 5);
      var mineIdx = -1;
      profile.answers.forEach(function (a, i) { if (a.canonical === c.canonical) mineIdx = i; });
      if (mineIdx >= 5) rows.push({ gap: true }, profile.answers[mineIdx]);
      rows.forEach(function (a) {
        if (a.gap) { box.appendChild(el('div', 'dist-gap', '…')); return; }
        var r = el('div', 'dist-row' + (a.canonical === c.canonical ? ' mine' : ''));
        r.appendChild(el('span', 'dist-name', up(a.canonical)));
        var bar = el('span', 'dist-bar'); var fill = el('span', 'dist-fill'); fill.style.width = Math.round(100 * a.raw_rate / Math.max(profile.top_rate, 1e-9)) + '%'; bar.appendChild(fill); r.appendChild(bar);
        r.appendChild(el('span', 'dist-pct', VR.fmtPct(a.raw_rate)));
        box.appendChild(r);
      });
      if (mineIdx < 0 && c.status !== 'INVALID') {
        var r2 = el('div', 'dist-row mine'); r2.appendChild(el('span', 'dist-name', up(c.canonical))); r2.appendChild(el('span', 'dist-bar')); r2.appendChild(el('span', 'dist-pct', 'UNMEASURED')); box.appendChild(r2);
      }
      box.appendChild(el('div', 'dist-tail', 'UNLISTED LONG TAIL ' + VR.fmtPct(profile.tail_mass) + ' · ' + VR.fmtInt(profile.sample_size) + ' SIMULATED RESPONSES'));
    },
    renderDataDetails: function (c, q) {
      var dl = $('rv-data'); dl.innerHTML = '';
      var ds = this.ds;
      function row(k, v) { dl.appendChild(el('dt', null, k)); dl.appendChild(el('dd', null, v)); }
      row('DATASET', ds.dataset_version);
      row('SOURCE', ds.dataset_source);
      row('POPULATION', ds.population_description);
      row('RESPONSES', VR.fmtInt(q.sample_size) + ' (authored)');
      row('COLLECTED', ds.collection_date);
      if (c.freq) {
        row('OBSERVED', c.freq.support === 'UNMEASURED' ? 'no count for this answer' : c.freq.count + ' of ' + VR.fmtInt(c.freq.sample_size) + ' = ' + VR.fmtPct(c.freq.raw_rate));
        row('SCORED AT', VR.fmtPct(c.freq.scoring_rate) + ' (' + c.freq.support.toLowerCase() + ', ' + c.freq.confidence_label.toLowerCase() + ' confidence)');
        row('INTERVAL', VR.fmtPct(c.freq.interval_lo) + ' – ' + VR.fmtPct(c.freq.interval_hi) + ' (Wilson, z=' + VR.FREQ_CONFIG.z + ')');
      }
      row('ENGINE', VR.ENGINE_VERSION);
      row('QUESTION', c.question_id);
      row('LICENCE', ds.licence);
    },
    next: function () {
      var run = this.run; if (!run || run.state !== 'SCORED') return;
      this.audio.click();
      run.next();
    },
    onEnd: function (receipt) {
      this.receipt = receipt;
      this.clearTimers();
      this.audio.stopDrone();
      if (receipt.mode === 'practice') { VR.history.settings.set('practice_done', true); this.renderTitle(); this.show('title'); this.toast('PRACTICE DONE. NOW PLAY 9 SIGNALS.'); return; }
      VR.history.addRun(receipt);
      this.renderResults(receipt);
      this.show('results');
    },

    // ---------- reveal effects ----------
    blackSignal: function (word) {
      var ov = $('black-signal'), w = $('black-word'), rm = this.reducedMotion();
      this.field.blackSignal(rm ? 1.2 : 2.6);
      this.audio.black();
      w.textContent = word; ov.hidden = false; ov.classList.remove('show'); void ov.offsetWidth; ov.classList.add('show');
      this.timer(function () { ov.classList.remove('show'); ov.hidden = true; }, rm ? 1200 : 2600);
    },
    countUp: function (node, rate, instant) {
      var self = this;
      if (instant) { node.textContent = VR.fmtPct(rate); return; }
      var t0 = null, dur = 650;
      function f(ts) { if (!t0) t0 = ts; var u = Math.min(1, (ts - t0) / dur); var e = 1 - Math.pow(1 - u, 3); node.textContent = VR.fmtPct(rate * e); if (u < 1) root.requestAnimationFrame(f); else node.textContent = VR.fmtPct(rate); }
      root.requestAnimationFrame(f);
    },
    pop: function (node, v) { node.textContent = v; node.classList.remove('pop'); void node.offsetWidth; node.classList.add('pop'); },
    timer: function (fn, ms) { this.revealTimers.push(root.setTimeout(fn, ms)); },
    clearTimers: function () { this.revealTimers.forEach(function (t) { root.clearTimeout(t); }); this.revealTimers = []; },
    announce: function (text) { var l = $('live'); if (l) { l.textContent = ''; root.setTimeout(function () { l.textContent = text; }, 30); } },
    toast: function (text) { var t = $('toast'); if (!t) return; t.textContent = text; t.hidden = false; t.classList.remove('show'); void t.offsetWidth; t.classList.add('show'); root.clearTimeout(this._toastT); this._toastT = root.setTimeout(function () { t.hidden = true; }, 2600); },

    // ---------- results ----------
    renderResults: function (r) {
      var s = r.summary;
      $('res-total').textContent = r.total;
      $('res-max').textContent = 'OF ' + r.max_total;
      $('res-bar').textContent = VR.daily.bar(r.total, r.max_total);
      $('res-mode').textContent = r.mode === 'daily' ? VR.daily.today(this.ds.dataset_version).label : (r.mode === 'duel' ? 'DUEL' : 'SIGNAL RUN');
      $('res-o').textContent = s.originality_mean != null ? s.originality_mean : '–';
      $('res-c').textContent = s.calibration_mean != null ? s.calibration_mean : '–';
      $('res-m').textContent = s.mirror_mean != null ? s.mirror_mean : '–';
      $('res-mirror').textContent = 'MIRROR ' + (s.mirror_mean != null && s.mirror_mean >= 60 ? '●' : '○');
      $('res-vanta').textContent = s.vanta ? (s.vanta.met ? 'VANTA ◆ ' + VR.SCORING_CONFIG.vanta[s.vanta.contract].label + ' MET' : 'VANTA ◇ ' + VR.SCORING_CONFIG.vanta[s.vanta.contract].label + ' MISSED') : 'VANTA —';
      $('res-black').textContent = s.black_signals ? 'BLACK SIGNAL ×' + s.black_signals : '';
      var list = $('res-list'); list.innerHTML = '';
      r.signals.forEach(function (x) {
        var row = el('div', 'res-row type-' + x.type);
        row.appendChild(el('span', 'res-i', String(x.i + 1)));
        row.appendChild(el('span', 'res-type', x.type === 'standard' ? 'S' : x.type === 'mirror' ? 'M' : 'V'));
        var mid = el('span', 'res-mid');
        mid.appendChild(el('span', 'res-prompt', x.prompt));
        mid.appendChild(el('span', 'res-answer', up(x.canonical || x.input) + ' · ' + (x.freq ? (x.freq.support === 'UNMEASURED' ? 'unmeasured' : VR.fmtPct(x.freq.raw_rate)) : 'invalid') + ' · predicted ' + (VR.bandById(x.band) || { label: '—' }).label));
        row.appendChild(mid);
        var sc = el('span', 'res-scores'); sc.textContent = (x.score.main_label === 'CONSENSUS' ? 'M ' : 'O ') + x.score.main + ' · C ' + x.score.calibration; row.appendChild(sc);
        row.appendChild(el('span', 'res-v', String(x.score.vantarank)));
        list.appendChild(row);
      });
      $('share-text').textContent = VR.daily.shareText(r);
      $('res-versions').textContent = r.dataset_version + ' · ENGINE ' + r.engine_version + ' · RUN ' + r.run_id;
      $('verify-out').textContent = '';
      var dm = $('duel-mine'); if (dm) dm.value = '';
    },
    copyShare: function () { this.clip(VR.daily.shareText(this.receipt), 'SHARE TEXT COPIED'); },
    copyReceipt: function () { this.clip(JSON.stringify(this.receipt, null, 1), 'RUN RECEIPT COPIED'); },
    verifyReceipt: function () {
      var v = VR.reconstruct(this.receipt, VR.DATASETS);
      $('verify-out').textContent = v.ok ? 'REPRODUCED ✓ ' + v.total + ' = ' + v.expected + ' · ' + v.dataset_version + ' · ENGINE ' + VR.ENGINE_VERSION : 'MISMATCH: got ' + v.total + ', receipt says ' + v.expected + (v.reason ? ' · ' + v.reason : '') + (v.mismatches.length ? ' · ' + v.mismatches.length + ' signal(s) differ' : '');
    },
    downloadCard: function () {
      var self = this;
      VR.share.card(this.receipt, this.ds, function (blob) { if (!blob) { self.toast('CARD FAILED'); return; } var url = URL.createObjectURL(blob); var a = doc.createElement('a'); a.href = url; a.download = 'vantarank-' + (self.receipt.mode === 'daily' ? VR.daily.today(self.ds.dataset_version).label.replace(' ', '-').toLowerCase() : 'run') + '.png'; doc.body.appendChild(a); a.click(); doc.body.removeChild(a); root.setTimeout(function () { URL.revokeObjectURL(url); }, 2000); });
    },
    copySignalLink: function () {
      var c = this.run.current;
      var url = root.location.href.split('?')[0] + '?q=' + encodeURIComponent(c.question_id);
      this.clip(url, 'SIGNAL LINK COPIED — SEND IT');
    },
    duelFromRun: function () {
      var r = this.receipt;
      var ch = { v: 1, duel_id: VR.uid('duel'), dataset_version: r.dataset_version, engine_version: r.engine_version, plan: r.plan, seed: r.seed, question_ids: r.question_ids };
      var code = VR.duel.b64url(JSON.stringify(ch));
      var url = root.location.href.split('?')[0] + '?duel=' + code;
      var mine = VR.duel.resultCode(Object.assign({}, r, { label: ch.duel_id }), VR.history.settings.get('name'));
      var dm = $('duel-mine'); if (dm) dm.value = mine;
      this.clip(url + '\n\nMY RESULT CODE:\n' + mine, 'DUEL LINK + YOUR RESULT CODE COPIED — SEND BOTH');
    },
    clip: function (text, msg) {
      var self = this;
      if (root.navigator.clipboard && root.navigator.clipboard.writeText) root.navigator.clipboard.writeText(text).then(function () { self.toast(msg); }, function () { self.toast('COPY BLOCKED — SELECT THE TEXT INSTEAD'); });
      else this.toast('COPY UNAVAILABLE — SELECT THE TEXT INSTEAD');
    },
    download: function (name, text, type) {
      var blob = new Blob([text], { type: type || 'text/plain' }), url = URL.createObjectURL(blob), a = doc.createElement('a');
      a.href = url; a.download = name; doc.body.appendChild(a); a.click(); doc.body.removeChild(a); root.setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
    },

    // ---------- constellation / profile / data ----------
    renderConstellation: function () {
      var pts = VR.history.answers();
      show($('const-empty'), !pts.length);
      if (!this.constellation) this.constellation = new VR.Constellation($('constellation'), $('const-tip'), { reducedMotion: this.reducedMotion(), highContrast: !!VR.history.settings.get('contrast') });
      this.constellation.setOptions({ reducedMotion: this.reducedMotion(), highContrast: !!VR.history.settings.get('contrast') });
      this.constellation.setData(pts, this.ds.questions.map(function (q) { return q.category; }));
      $('const-count').textContent = pts.length + ' POINTS · ' + VR.history.runs().length + ' RUNS';
    },
    renderProfile: function () {
      var s = VR.history.stats(), st = VR.history.statements();
      var g = $('profile-grid'); g.innerHTML = '';
      function tile(k, v, note) { var t = el('div', 'tile'); t.appendChild(el('span', 'tile-k', k)); t.appendChild(el('span', 'tile-v', v)); if (note) t.appendChild(el('span', 'tile-n', note)); g.appendChild(t); }
      function n1(x, dp) { return x == null ? '–' : VR.round(x, dp == null ? 0 : dp); }
      tile('RUNS', String(s.runs), s.best_total != null ? 'best ' + s.best_total : '');
      tile('SIGNALS', String(s.signals), s.supported + ' with measured answers');
      tile('MEAN ORIGINALITY', n1(s.mean_originality), 'standard + vanta signals');
      tile('MEAN CALIBRATION', n1(s.mean_calibration), 'all measured signals');
      tile('PREDICTION ERROR', s.mean_abs_error_bands == null ? '–' : n1(s.mean_abs_error_bands, 1) + ' bands', 'average distance from the true band');
      tile('LEAN', s.mean_signed_error_decades == null ? '–' : (s.mean_signed_error_decades < -0.05 ? 'RARER THAN REAL' : s.mean_signed_error_decades > 0.05 ? 'COMMONER THAN REAL' : 'CENTRED'), 'which way your predictions miss');
      tile('OVER / UNDER', s.overestimate_share == null ? '–' : Math.round(100 * s.overestimate_share) + '% / ' + Math.round(100 * s.underestimate_share) + '%', 'overestimated / underestimated own originality');
      tile('MIRROR', s.mirror.n ? n1(s.mirror.mean_consensus) + ' consensus · C ' + n1(s.mirror.mean_calibration) : '–', s.mirror.n + ' mirror signals');
      tile('DARK CONTRACTS', s.vanta.n ? s.vanta.met + ' of ' + s.vanta.n + ' met' : '–', 'safe ' + s.vanta.contracts.safe.met + '/' + s.vanta.contracts.safe.n + ' · dark ' + s.vanta.contracts.dark.met + '/' + s.vanta.contracts.dark.n + ' · blackout ' + s.vanta.contracts.blackout.met + '/' + s.vanta.contracts.blackout.n);
      tile('BLACK SIGNALS', String(s.black_signals), s.perfect_calibrations + ' perfect calibrations');
      tile('BEST FIELDS', s.best_categories.length ? s.best_categories.map(function (c) { return c.category + ' ' + Math.round(c.mean_v); }).join(' · ') : '–', 'mean vantarank, 3+ signals');
      tile('WEAKEST FIELDS', s.worst_categories.length ? s.worst_categories.map(function (c) { return c.category + ' ' + Math.round(c.mean_v); }).join(' · ') : '–', 'mean vantarank, 3+ signals');
      var ul = $('profile-statements'); ul.innerHTML = '';
      st.forEach(function (t) { ul.appendChild(el('li', null, t)); });
    },
    renderData: function () {
      var ds = this.ds, dl = $('data-manifest'); dl.innerHTML = '';
      function row(k, v) { dl.appendChild(el('dt', null, k)); dl.appendChild(el('dd', null, v)); }
      row('DATASET', ds.dataset_version); row('ID', ds.dataset_id); row('SOURCE', ds.dataset_source); row('POPULATION', ds.population_description);
      row('COHORT', ds.cohort); row('COLLECTED', ds.collection_date); row('QUESTIONS', String(ds.question_count)); row('LICENCE', ds.licence);
      row('FREQUENCY', ds.frequency_note); row('ENGINE', VR.ENGINE_VERSION + ' (min ' + ds.engine_min_version + ')');
      var ul = $('data-questions'); ul.innerHTML = '';
      ds.questions.slice().sort(function (a, b) { return a.category < b.category ? -1 : a.category > b.category ? 1 : 0; }).forEach(function (q) {
        var li = el('li'); li.appendChild(el('span', 'dq-cat', q.category)); li.appendChild(el('span', 'dq-prompt', q.prompt)); li.appendChild(el('span', 'dq-n', q.answers.length + ' listed · n=' + VR.fmtInt(q.sample_size))); ul.appendChild(li);
      });
    },

    // ---------- duel ----------
    renderDuel: function () {
      var ch = this.duelChallenge, box = $('duel-incoming');
      if (ch) { box.hidden = false; var chk = VR.duel.check(ch, VR.DATASETS); $('duel-incoming-text').textContent = chk.ok ? 'CHALLENGE RECEIVED · ' + ch.question_ids.length + ' SIGNALS · ' + ch.dataset_version + ' · ENGINE ' + ch.engine_version : 'CANNOT PLAY: ' + chk.reason; $('duel-play').disabled = !chk.ok; }
      else box.hidden = true;
      $('duel-compare-out').innerHTML = '';
    },
    duelCreate: function () {
      var d = VR.duel.create(this.ds);
      var url = root.location.href.split('?')[0] + '?duel=' + d.code;
      $('duel-link').value = url;
      this.clip(url, 'DUEL LINK COPIED — PLAY IT YOURSELF TOO');
    },
    duelOpen: function () {
      var v = $('duel-code').value.trim(); var code = v.indexOf('duel=') >= 0 ? v.split('duel=')[1].split(/[&\s]/)[0] : v;
      var p = VR.duel.parse(code);
      if (!p.ok) { this.toast(up(p.reason)); return; }
      this.duelChallenge = p.challenge; this.renderDuel();
    },
    duelPlay: function () {
      var ch = this.duelChallenge; if (!ch) return;
      var chk = VR.duel.check(ch, VR.DATASETS); if (!chk.ok) { this.toast(up(chk.reason)); return; }
      this.startRun('duel', VR.duel.runOptions(ch, chk.dataset));
    },
    duelCompare: function () {
      var mineCode = $('duel-mine').value.trim(), theirsCode = $('duel-theirs').value.trim();
      var a = VR.duel.parseResult(mineCode), b = VR.duel.parseResult(theirsCode);
      var out = $('duel-compare-out'); out.innerHTML = '';
      if (!a.ok || !b.ok) { out.textContent = !a.ok ? 'YOUR CODE: ' + a.reason : 'THEIR CODE: ' + b.reason; return; }
      var cmp = VR.duel.compare(a.result, b.result);
      if (!cmp.comparable) out.appendChild(el('p', 'warn', 'DIFFERENT DUEL, DATASET OR ENGINE — NOT COMPARABLE'));
      var t = el('table', 'cmp'); var h = el('tr'); h.appendChild(el('th', null, '')); h.appendChild(el('th', null, a.result.name || 'YOU')); h.appendChild(el('th', null, b.result.name || 'THEM')); t.appendChild(h);
      cmp.rows.forEach(function (r) { var tr = el('tr', r.winner ? 'win-' + r.winner : ''); tr.appendChild(el('td', null, r.label)); tr.appendChild(el('td', null, r.mine == null ? '–' : String(r.mine))); tr.appendChild(el('td', null, r.theirs == null ? '–' : String(r.theirs))); t.appendChild(tr); });
      out.appendChild(t);
    },

    // ---------- survey (opt-in, separate cohort, blind to distributions) ----------
    renderSurvey: function () {
      var consent = $('survey-consent').checked;
      show($('survey-form'), consent);
      if (!consent) return;
      var rng = VR.prng(Date.now() >>> 0);
      var q = this.ds.questions[Math.floor(rng() * this.ds.questions.length)];
      $('survey-prompt').textContent = q.prompt; $('survey-prompt').dataset.qid = q.question_id;
      $('survey-answer').value = ''; $('survey-answer').focus();
      $('survey-count').textContent = VR.history.load().survey.length + ' LOCAL RESPONSES';
    },
    surveySubmit: function () {
      var inp = $('survey-answer'), qid = $('survey-prompt').dataset.qid;
      if (!VR.normalise(inp.value)) return;
      VR.history.addSurveyResponse({ question_id: qid, dataset_version: this.ds.dataset_version, input: inp.value, consent: true });
      this.audio.click();
      this.renderSurvey();
    }
  };

  VR.app = app;
  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', function () { app.init(); }); else app.init();
})(typeof window !== 'undefined' ? window : this);

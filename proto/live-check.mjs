// Behavioral tests for the actual presentation scripts; no browser/visual QA claim.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const base = new URL('../docs/', import.meta.url);
const html = fs.readFileSync(new URL('live.html', base), 'utf8');
const scripts = ['vortex.js', 'water.js', 'live-story.js', 'figs.js', 'live.js'];
for (const name of scripts) assert.ok(html.includes(`src="${name}"`), `${name} is referenced`);
assert.ok(html.includes('href="live.css"'));
assert.equal((html.match(/data-view=/g) || []).length, 6);
assert.ok(html.includes('dimples and elongated scars') || html.includes('dimple-and-scar'));
assert.ok(html.includes('nonlocal'));
assert.ok(html.includes('not Kelvin'));
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
assert.equal(new Set(ids).size, ids.length, 'IDs are unique');

function harness({ width = 960, height = 350, reduced = false, initialMediaError = false, initialMediaReady = false, legacy = false, historyDenied = false } = {}) {
  let now = 0, queued = [], operations = 0;
  const elements = new Map(), all = [], listeners = new Map();
  function canvasContext() {
    const target = { trace: [], createImageData: (w, h) => ({ data: new Uint8ClampedArray(w * h * 4) }) };
    return new Proxy(target, { get(o, key) {
      if (key in o) return o[key];
      return (...args) => {
        operations++;
        for (const x of args) if (typeof x === 'number') assert.ok(Number.isFinite(x), `finite ${String(key)} coordinate`);
        if (key === 'clearRect') o.trace = [];
        // Geometry traces allow repeat/reset comparison without rasterizing.
        o.trace.push([key, ...args.filter(x => typeof x !== 'object')]);
      };
    } });
  }
  class Element {
    constructor(tag = 'div', attrs = {}) {
      this.tagName = tag.toUpperCase(); this.attrs = { ...attrs }; this.id = attrs.id || '';
      this.dataset = {}; for (const k in attrs) if (k.startsWith('data-')) this.dataset[k.slice(5)] = attrs[k];
      this.value = attrs.value || ''; this.hidden = 'hidden' in attrs; this.disabled = false; this.children = []; this.events = new Map();
      this.width = Number(attrs.width || 960); this.height = Number(attrs.height || 540); this.open = false; this.textContent = '';
      this.readyState = initialMediaReady && tag === 'video' ? 2 : 0; this.currentTime = 0; this.error = initialMediaError && tag === 'video' ? { code: 4 } : null;
      this.context = canvasContext(); all.push(this); if (this.id) elements.set(this.id, this);
    }
    setAttribute(k, v) { this.attrs[k] = String(v); }
    getAttribute(k) { return this.attrs[k]; }
    removeAttribute(k) { delete this.attrs[k]; }
    addEventListener(k, f) { if (!this.events.has(k)) this.events.set(k, []); this.events.get(k).push(f); }
    dispatch(k, extras = {}) { const e = { target: this, preventDefault() { this.defaultPrevented = true; }, ...extras }; for (const f of this.events.get(k) || []) f(e); return e; }
    click() { if (this.disabled) return; this.onclick?.({ target: this }); }
    append(el) { this.children.push(el); }
    closest(selector) { return selector === '[data-view]' ? all.find(x => x.dataset.view === (this.id === 'opening' ? 'observe' : 'evidence')) : null; }
    getContext() { return this.context; }
    getBoundingClientRect() { return { left: 20, top: 30, width, height: this.id === 'figStretch' ? (width < 560 ? 420 : 310) : height }; }
    setPointerCapture() {}
    play() { this.playing = true; return Promise.resolve(); }
    pause() { this.playing = false; }
  }
  for (const m of (legacy ? fs.readFileSync(new URL('index.html', base), 'utf8') : html).matchAll(/<([a-z][a-z0-9]*)\b([^<>]*)>/gi)) {
    const attrs = {};
    for (const a of m[2].matchAll(/([\w-]+)(?:="([^"]*)")?/g)) attrs[a[1]] = a[2] ?? '';
    new Element(m[1], attrs);
  }
  const query = selector => {
    if (selector === '#beats button') return elements.get('beats').children;
    const m = /^\[([\w-]+)(?:="([^"]+)")?\]$/.exec(selector);
    return m ? all.filter(e => m[1] in e.attrs && (m[2] === undefined || e.attrs[m[1]] === m[2])) : [];
  };
  const document = {
    hidden: false, fullscreenElement: null, documentElement: {},
    getElementById: id => elements.get(id) || null,
    querySelectorAll: query, querySelector: s => query(s)[0] || null,
    createElement: tag => new Element(tag),
    addEventListener: (k, f) => { listeners.set('document:' + k, f); }
  };
  const window = {
    document, FILM_MODE: !legacy, LIVE_MODE: !legacy, devicePixelRatio: 2,
    matchMedia: () => ({ matches: reduced }),
    addEventListener: (k, f) => { listeners.set(k, f); }
  };
  const location = { hash: '#1' };
  const context = vm.createContext({ window, document, location, console,
    history: { replaceState: (_, __, hash) => { if(historyDenied) throw new Error('Local viewer restricts history'); location.hash = hash; } },
    performance: { now: () => now }, matchMedia: window.matchMedia,
    ResizeObserver: class { constructor(callback) { this.callback = callback; } observe() { this.callback(); } },
    IntersectionObserver: class { constructor(callback) { this.callback = callback; } observe() { this.callback([{ isIntersecting: false }]); } },
    requestAnimationFrame: callback => queued.push(callback)
  });
  for (const name of (legacy ? ['vortex.js', 'water.js', 'figs.js'] : scripts)) { vm.runInContext(fs.readFileSync(new URL(name, base), 'utf8'), context, { filename: name }); if (context.Vortex) window.Vortex = context.Vortex; if (context.WaterRenderer) window.WaterRenderer = context.WaterRenderer; }
  function tick(seconds) { now += seconds * 1000; const callbacks = queued; queued = []; callbacks.forEach(f => f(now)); }
  function key(key, target = elements.get('next'), extras = {}) {
    const e = { key, target, preventDefault() { this.defaultPrevented = true; }, ...extras }; listeners.get('keydown')(e); return e;
  }
  function visible() { return all.filter(e => e.dataset.view && !e.hidden).map(e => e.dataset.view); }
  return { window, document, elements, query, tick, key, visible, location, listeners, operations: () => operations };
}

let checks = 0;
function test(name, fn) { fn(); checks++; console.log('PASS', name); }
for (const width of [960, 390]) {
  const h = harness({ width }), { window: w, elements: els } = h, $ = id => els.get(id);
  test(`${width}px six scenes, five-minute durations, single active view`, () => {
    assert.equal(w.RHINE_STORY.reduce((s, b) => s + b.seconds, 0), 300);
    for (let i = 0; i < 6; i++) { w.RhineLive.select(i); assert.deepEqual(h.visible(), [w.RHINE_STORY[i].view]); }
    w.RhineLive.select(0); assert.equal($('prev').disabled, true); w.RhineLive.select(5); assert.equal($('next').disabled, true);
  });
  test(`${width}px arrows still work with button focus; native/editing keys stay native`, () => {
    w.RhineLive.select(0); assert.equal(h.key('ArrowRight').defaultPrevented, true); assert.equal(w.RhineLive.getState().beat, 1);
    const playing = w.RhineLive.getState().playing; h.key(' ', $('next')); assert.equal(w.RhineLive.getState().playing, playing);
    h.key('ArrowRight', $('dipG')); assert.equal(w.RhineLive.getState().beat, 1);
    h.key('ArrowRight', $('next'), { ctrlKey: true }); assert.equal(w.RhineLive.getState().beat, 1);
    h.key('6'); assert.equal(w.RhineLive.getState().beat, 5); h.key('Home'); assert.equal(w.RhineLive.getState().beat, 0);
    h.key('End'); assert.equal(w.RhineLive.getState().beat, 5);
  });
  test(`${width}px restart restores sliders, pair state, loop and deterministic particles`, () => {
    w.RhineLive.select(2); const before = JSON.stringify(w.RhineLive.getState().loop);
    $('loopPair').click(); $('loopX').value = 4; $('loopX').dispatch('input'); $('loopRadius').value = 3; $('loopRadius').dispatch('input');
    h.tick(0.2); $('restart').click(); assert.equal(JSON.stringify(w.RhineLive.getState().loop), before);
    w.RhineLive.select(1); $('dipG').value = 95; $('dipG').dispatch('input'); $('restart').click(); assert.equal(+$('dipG').value, 60);
    w.RhineLive.select(4); $('light').value = 4; $('light').dispatch('input'); $('restart').click(); assert.equal(+$('light').value, 50);
  });
  test(`${width}px direct loop drag uses CSS coordinates and cancellation ends drag`, () => {
    w.RhineLive.select(2); const cv = $('figLoop'), r = cv.getBoundingClientRect(), scale = Math.min(width / 13, r.height / 10);
    const loop = w.LOOP_STATE, x = r.left + width / 2 + loop.x * scale, y = r.top + r.height / 2 - loop.y * scale;
    cv.dispatch('pointerdown', { clientX: x, clientY: y, pointerId: 1 });
    cv.dispatch('pointermove', { clientX: x + scale, clientY: y, pointerId: 1 });
    assert.ok(Math.abs(w.LOOP_STATE.x - 0.5) < 1e-9);
    cv.dispatch('pointercancel'); cv.dispatch('pointermove', { clientX: x + scale * 2, clientY: y }); assert.ok(Math.abs(w.LOOP_STATE.x - 0.5) < 1e-9);
    assert.equal(cv.width, width * 2, 'HiDPI backing store');
  });
  test(`${width}px numerical loop gives analytic single core and cancels opposite pair`, () => {
    w.RhineLive.select(2); w.FIGS.figLoop.setLoop({ x: 0, y: 0, r: 2 });
    assert.ok(Math.abs(w.FIGS.figLoop.getState().measured - 60 * 4 / 4.36) < 1e-10);
    $('loopPair').click(); assert.ok(Math.abs(w.FIGS.figLoop.getState().measured) < 1e-10);
  });
  test(`${width}px paused redraw and 3D stretching reset are deterministic`, () => {
    w.RhineLive.select(4); w.FIGS.figStretch.at(3); const trace = JSON.stringify($('figStretch').context.trace);
    w.FIGS.figStretch.at(100); w.FIGS.figStretch.reset(); w.FIGS.figStretch.at(3); assert.equal(JSON.stringify($('figStretch').context.trace), trace);
    const playing = w.RhineLive.getState().playing; if (playing) $('pause').click(); const t = w.RhineLive.getState().t; h.tick(4); assert.equal(w.RhineLive.getState().t, t);
  });
  test(`${width}px reflection field and ring controls draw finite geometry`, () => {
    w.RhineLive.select(4); for (const value of [0, 50, 100]) { $('light').value = value; $('light').dispatch('input'); }
    w.RhineLive.select(3); for (const button of h.query('[data-line]')) { button.click(); h.tick(0.2); }
    assert.ok(h.operations() > 1000);
  });
  test(`${width}px hash navigation clamps invalid ranges and follows hashchange`, () => {
    h.location.hash = '#3'; h.listeners.get('hashchange')(); assert.equal(w.RhineLive.getState().beat, 2);
    h.location.hash = '#999'; h.listeners.get('hashchange')(); assert.equal(w.RhineLive.getState().beat, 5);
    w.RhineLive.select(NaN); assert.equal(w.RhineLive.getState().beat, 0);
  });
}
for (const [width, height] of [[926, 340], [654, 261], [358, 350]]) {
  test(`${width}×${height}px intended radius-three contour stays fully inside the live figure`, () => {
    const x = harness({ width, height }); x.window.RhineLive.select(2);
    x.elements.get('loopPair').click(); x.window.FIGS.figLoop.setLoop({ x: 0, r: 3 });
    const state = x.window.FIGS.figLoop.getState(), { contour, scale } = state.viewport;
    assert.equal(state.loop.y, 0.3, 'preserve the demonstrated vertical centre');
    assert.equal(state.loop.r, 3, 'fit the intended radius without shrinking the model');
    assert.ok(contour.left >= 6 && contour.right <= width - 6);
    assert.ok(contour.top >= 6 && contour.bottom <= height - 6, 'whole dashed contour and stroke are visible');
    assert.ok(Math.abs(contour.right - contour.left - 6 * scale) < 1e-10);
    assert.ok(Math.abs(state.measured) < 1e-10, 'framing leaves the circulation integral unchanged');
  });
}
for (const width of [960, 390]) {
  test(`${width}px original article figure path initializes and controls redraw`, () => {
    const x = harness({ width, legacy: true });
    x.elements.get('dipG').value = 90; x.elements.get('dipG').dispatch('input');
    x.elements.get('loopPair').click();
    for (const button of x.query('[data-line]')) button.click();
    for (const button of x.query('[data-ham]')) button.click();
    assert.ok(x.operations() > 10000);
    assert.match(x.elements.get('dipGOut').textContent, /90 cm²/);
    assert.equal(x.elements.get('loopPair').getAttribute('aria-pressed'), 'true');
  });
}
const h = harness({ initialMediaError: true }), w = h.window, $ = id => h.elements.get(id);
test('rehearsal follows wall time, carries scene overflow and stops at exactly 5 minutes', () => {
  $('tour').click(); h.tick(42); assert.equal(w.RhineLive.getState().beat, 1); assert.equal(w.RhineLive.getState().t, 2);
  h.tick(258); assert.equal(w.RhineLive.getState().beat, 5); assert.equal(w.RhineLive.getState().t, 50); assert.equal(w.RhineLive.getState().auto, false); assert.equal(w.RhineLive.getState().playing, false);
});
test('hidden tabs do not advance rehearsal or continue videos', () => {
  $('tour').click(); h.document.hidden = true; h.listeners.get('document:visibilitychange')(); h.tick(120); assert.equal(w.RhineLive.getState().t, 0);
  h.document.hidden = false; h.listeners.get('document:visibilitychange')(); h.tick(5); assert.equal(w.RhineLive.getState().t, 5);
});
test('manual reset stops rehearsal; opening errors already present are handled', () => {
  $('restart').click(); assert.equal(w.RhineLive.getState().auto, false);
  const x = harness({ initialMediaError: true }); assert.equal(x.elements.get('opening').hidden, true); assert.equal(x.elements.get('opening-missing').hidden, false);
});
test('reset restores the initial motion preference after a single pause toggle', () => {
  for (const reduced of [false, true]) {
    const x = harness({ reduced });
    const initial = x.window.RhineLive.getState().playing;
    x.elements.get('pause').click(); assert.notEqual(x.window.RhineLive.getState().playing, initial);
    x.elements.get('restart').click(); assert.equal(x.window.RhineLive.getState().playing, initial);
  }
});
test('reduced motion begins paused, all six scenes can be selected', () => {
  const x = harness({ reduced: true }); assert.equal(x.window.RhineLive.getState().playing, false);
  for (let i = 0; i < 6; i++) x.window.RhineLive.select(i);
});
test('missing media uses live fallback and matching narration; loaded media switches both', () => {
  w.RhineLive.select(0);
  assert.equal($('opening-illustration').hidden, false);
  assert.match($('eyebrow').textContent, /Rendered illustration/);
  assert.match($('narration').textContent, /not field footage/);
  assert.ok($('opening-overlay').context.trace.length > 100);
  $('showSpins').click(); assert.equal($('showSpins').getAttribute('aria-pressed'), 'true');
  $('opening').dispatch('loadeddata'); assert.equal($('opening-illustration').hidden, true);
  assert.match($('eyebrow').textContent, /Our boat footage/);
  assert.match($('opening-status').textContent, /no synthetic imagery/);
  $('illustrationToggle').click(); assert.match($('eyebrow').textContent, /Rendered illustration/);
  $('illustrationToggle').click(); assert.match($('eyebrow').textContent, /Our boat footage/);
  $('opening').dispatch('error'); assert.equal($('opening-illustration').hidden, false);
  assert.match($('eyebrow').textContent, /Rendered illustration/);
  w.RhineLive.select(5); assert.match($('narration').textContent, /cannot diagnose/);
});
test('cached media loaded before handlers still selects footage and its captions', () => {
  const x = harness({ initialMediaReady: true });
  assert.equal(x.elements.get('opening').hidden, false);
  assert.equal(x.elements.get('opening-illustration').hidden, true);
  assert.equal(x.elements.get('illustrationToggle').hidden, false);
  assert.equal(x.elements.get('closing').hidden, false);
  assert.match(x.elements.get('eyebrow').textContent, /Our boat footage/);
});
test('reveal is deliberate and reset hides the conclusion', () => {
  w.RhineLive.select(1); assert.equal($('result').hidden, true);
  $('reveal-result').click(); assert.equal($('result').hidden, false);
  assert.equal(w.RhineLive.getState().revealed, true);
  $('restart').click(); assert.equal(w.RhineLive.getState().revealed, false);
});
test('missing fullscreen API gives a recoverable status', () => {
  $('full').click(); assert.match($('status').textContent, /unavailable/);
});
test('local-file history rejection does not stop startup or navigation', () => {
  const x=harness({historyDenied:true});x.window.RhineLive.select(2);assert.equal(x.window.RhineLive.getState().beat,2);x.key('ArrowLeft');assert.equal(x.window.RhineLive.getState().beat,1);
});
// Test asynchronous rejection separately.
h.document.documentElement.requestFullscreen = () => Promise.reject(new Error('denied'));
$('full').click(); await new Promise(r => setImmediate(r)); assert.match($('status').textContent, /not enabled/); checks++; console.log('PASS fullscreen rejection is handled');
console.log(`\n${checks} live controller/model checks passed. Canvas commands were checked, not visually rendered.`);

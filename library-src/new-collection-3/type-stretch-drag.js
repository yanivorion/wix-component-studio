const MANIFEST = {
  "type": "Type.StretchDrag",
  "description": "A huge Roboto Flex word you can pull like taffy: drag any letter up or down to stretch it from the baseline while its neighbours follow with a smooth falloff, width and stroke axes compensate so the strokes stay even, and on release it springs back with a wobble. Mono rulers and a percentage handle appear on hover; an idle loop stretches one letter at a time",
  "editorElement": {
    "selector": ".stretch-drag",
    "displayName": "Stretch Drag",
    "archetype": "container",
    "data": {
      "text": { "dataType": "text", "displayName": "Word", "defaultValue": "STRETCH", "group": "Content" },
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Elastic type — Roboto Flex", "group": "Content" },
      "sideLabel": { "dataType": "text", "displayName": "Corner Label", "defaultValue": "Specimen 07 / Vertical axis", "group": "Content" },
      "hint": { "dataType": "text", "displayName": "Hint", "defaultValue": "Drag a letter up or down", "group": "Content" },
      "uppercase": { "dataType": "booleanValue", "displayName": "Uppercase", "defaultValue": "true", "group": "Content" },
      "maxStretch": { "dataType": "select", "displayName": "Max Stretch", "defaultValue": "2.2", "options": ["1.6", "1.9", "2.2", "2.6"], "group": "Stretch" },
      "minStretch": { "dataType": "select", "displayName": "Max Squash", "defaultValue": "0.45", "options": ["0.3", "0.45", "0.6", "0.8"], "group": "Stretch" },
      "spread": { "dataType": "select", "displayName": "Neighbour Falloff", "defaultValue": "medium", "options": ["none", "tight", "medium", "wide"], "group": "Stretch" },
      "wobble": { "dataType": "select", "displayName": "Release Wobble", "defaultValue": "lively", "options": ["none", "subtle", "lively", "jelly"], "group": "Stretch" },
      "compensate": { "dataType": "booleanValue", "displayName": "Stroke Compensation", "defaultValue": "true", "group": "Stretch" },
      "widthShift": { "dataType": "select", "displayName": "Width Compensation", "defaultValue": "medium", "options": ["off", "subtle", "medium", "strong"], "group": "Stretch" },
      "idleDemo": { "dataType": "booleanValue", "displayName": "Idle Demo", "defaultValue": "true", "group": "Animation" },
      "idlePeak": { "dataType": "select", "displayName": "Idle Stretch", "defaultValue": "1.9", "options": ["1.4", "1.6", "1.9", "2.2"], "group": "Animation" },
      "idlePause": { "dataType": "select", "displayName": "Idle Pause (s)", "defaultValue": "1.2", "options": ["0.6", "1.2", "2", "3"], "group": "Animation" },
      "showRulers": { "dataType": "booleanValue", "displayName": "Rulers", "defaultValue": "true", "group": "Layout" },
      "showHandle": { "dataType": "booleanValue", "displayName": "Percentage Handle", "defaultValue": "true", "group": "Layout" },
      "showReadout": { "dataType": "booleanValue", "displayName": "Axis Readout", "defaultValue": "true", "group": "Layout" },
      "height": { "dataType": "select", "displayName": "Height", "defaultValue": "screen", "options": ["screen", "560", "680", "800"], "group": "Layout" },
      "weight": { "dataType": "select", "displayName": "Weight", "defaultValue": "400", "options": ["300", "400", "500"], "group": "Typography" },
      "sizeScale": { "dataType": "select", "displayName": "Word Scale", "defaultValue": "1", "options": ["0.8", "0.9", "1", "1.1"], "group": "Typography" },
      "tracking": { "dataType": "select", "displayName": "Tracking (em)", "defaultValue": "-0.02", "options": ["-0.04", "-0.02", "0", "0.02"], "group": "Typography" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#EDECE8", "group": "Colors" },
      "inkColor": { "dataType": "color", "displayName": "Ink", "defaultValue": "#141413", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#8A867F", "group": "Colors" },
      "ruleColor": { "dataType": "color", "displayName": "Rulers", "defaultValue": "#CFCCC5", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent", "defaultValue": "#D9480F", "group": "Colors" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const uppercase = bool(config?.uppercase, true);
  const rawText = String(config?.text || 'STRETCH').trim() || 'STRETCH';
  const word = uppercase ? rawText.toUpperCase() : rawText;
  const eyebrow = config?.eyebrow || 'Elastic type — Roboto Flex';
  const sideLabel = config?.sideLabel || 'Specimen 07 / Vertical axis';
  const hint = config?.hint || 'Drag a letter up or down';
  const sMaxCfg = parseFloat(config?.maxStretch || '2.2') || 2.2;
  const sMin = parseFloat(config?.minStretch || '0.45') || 0.45;
  const spread = { none: 0.01, tight: 0.9, medium: 1.5, wide: 2.4 }[config?.spread || 'medium'] ?? 1.5;
  const wob = { none: [0.16, 0.6], subtle: [0.13, 0.76], lively: [0.12, 0.85], jelly: [0.1, 0.9] }[config?.wobble || 'lively'] || [0.12, 0.85];
  const compensate = bool(config?.compensate, true);
  const widthK = { off: 0, subtle: 18, medium: 34, strong: 52 }[config?.widthShift || 'medium'] ?? 34;
  const idleDemo = bool(config?.idleDemo, true);
  const idlePeakCfg = parseFloat(config?.idlePeak || '1.9') || 1.9;
  const idlePause = (parseFloat(config?.idlePause || '1.2') || 1.2) * 1000;
  const showRulers = bool(config?.showRulers, true);
  const showHandle = bool(config?.showHandle, true);
  const showReadout = bool(config?.showReadout, true);
  const heightMode = config?.height || 'screen';
  const wRest = parseFloat(config?.weight || '400') || 400;
  const sizeScale = parseFloat(config?.sizeScale || '1') || 1;
  const tracking = parseFloat(config?.tracking || '-0.02') || 0;
  const bg = config?.backgroundColor || '#EDECE8';
  const ink = config?.inkColor || '#141413';
  const muted = config?.mutedColor || '#8A867F';
  const rule = config?.ruleColor || '#CFCCC5';
  const accent = config?.accentColor || '#D9480F';

  const uid = React.useMemo(() => 'sd' + Math.random().toString(36).slice(2, 9), []);
  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  const chars = React.useMemo(() => Array.from(word), [word]);
  const n = chars.length;
  const rootRef = React.useRef(null);
  const wrapRefs = React.useRef([]);
  const glyphRefs = React.useRef([]);
  const probeRef = React.useRef(null);
  const handleRefs = React.useRef([]);
  const tickRefs = React.useRef([]);
  const ro = React.useRef({});
  const sim = React.useRef({ s: [], v: [] });
  const drag = React.useRef(null);
  const keyHold = React.useRef(null);
  const hover = React.useRef(-1);
  const lastInput = React.useRef(-1e9);
  const [width, setWidth] = React.useState(1280);
  const [stageH, setStageH] = React.useState(760);
  const [metrics, setMetrics] = React.useState({ base: 0, cap: 0.711, ready: false });
  const [active, setActive] = React.useState(false);
  const metricsRef = React.useRef(metrics);
  metricsRef.current = metrics;

  React.useEffect(() => {
    const id = 'gf-roboto-flex-param-jb';
    if (document.getElementById(id)) return;
    const l = document.createElement('link');
    l.id = id; l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,slnt,wdth,wght,XOPQ,YOPQ,YTUC@8..144,-10..0,25..151,100..1000,27..175,25..135,528..760&family=JetBrains+Mono:wght@400;500&display=swap';
    document.head.appendChild(l);
  }, []);

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return undefined;
    const s = typeof getScrollContainer === 'function' ? getScrollContainer() : null;
    const scroller = s && s !== window && s.nodeType === 1 ? s : window;
    const measure = () => {
      setWidth(el.clientWidth || 1280);
      setStageH(scroller === window ? window.innerHeight : scroller.clientHeight);
    };
    measure();
    const obs = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (obs) obs.observe(el);
    window.addEventListener('resize', measure);
    return () => { if (obs) obs.disconnect(); window.removeEventListener('resize', measure); };
  }, []);

  const compact = width < 760;
  const H = heightMode === 'screen' ? Math.max(compact ? 640 : 560, Math.min(stageH, 1000)) : parseInt(heightMode, 10) || 680;
  const pad = compact ? 20 : 56;
  const topZone = pad + 64;
  const bottomZone = pad + (compact ? 118 : 96);
  const capRatio = metrics.cap || 0.711;
  const avgW = compact ? (uppercase ? 0.52 : 0.44) : (uppercase ? 0.64 : 0.52);
  const fontPx = Math.max(28, Math.round(Math.min(
    ((width - pad * 2) * 0.94) / (n * avgW),
    (H - topZone - bottomZone - 30) / (capRatio * sMaxCfg + 0.05)
  ) * sizeScale));
  const capPx = capRatio * fontPx;
  const baseY = H - bottomZone;
  const roomMax = (baseY - topZone - 60) / (capPx || 1);
  const sMax = compact ? Math.max(sMaxCfg, Math.min(3.4, roomMax)) : sMaxCfg;
  const idlePeak = compact ? Math.min(sMax * 0.88, 1 + (idlePeakCfg - 1) * (sMax / sMaxCfg) * 1.15) : idlePeakCfg;

  const measureMetrics = React.useCallback(() => {
    const root = rootRef.current; const probe = probeRef.current;
    if (!root || !probe) return;
    let cap = 0.711;
    try {
      const c = document.createElement('canvas').getContext('2d');
      c.font = `${wRest} 200px "Roboto Flex"`;
      const m = c.measureText(uppercase ? 'H' : 'x');
      if (m && m.actualBoundingBoxAscent > 40) cap = m.actualBoundingBoxAscent / 200;
    } catch (e) { cap = 0.711; }
    const base = probe.offsetTop;
    setMetrics((prev) => (Math.abs(prev.base - base) < 0.5 && Math.abs(prev.cap - cap) < 0.002 && prev.ready ? prev : { base, cap, ready: true }));
  }, [wRest, uppercase]);

  React.useEffect(() => {
    measureMetrics();
    ro.current.remeasure = measureMetrics;
    let alive = true;
    if (document.fonts && document.fonts.load) {
      document.fonts.load(`${wRest} 100px "Roboto Flex"`).then(() => { if (alive) measureMetrics(); }).catch(() => {});
      document.fonts.ready.then(() => { if (alive) measureMetrics(); }).catch(() => {});
    }
    const t = setTimeout(measureMetrics, 1200);
    return () => { alive = false; clearTimeout(t); };
  }, [measureMetrics, fontPx, width]);

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const S = sim.current;
    S.s = Array.from({ length: n }, (_, i) => S.s[i] || 1);
    S.v = Array.from({ length: n }, (_, i) => S.v[i] || 0);
    const order = Array.from({ length: n }, (_, i) => i);
    const seq = [];
    for (let k = 0; k < n; k++) seq.push(order[(k * 3 + Math.floor(n / 2)) % n]);
    const uniq = seq.filter((v, i) => seq.indexOf(v) === i);
    const idleOrder = uniq.length === n ? uniq : order;
    const UP = 950; const HOLD = 380; const BACK = 1100;
    const cycle = UP + HOLD + BACK + idlePause;
    const t0 = performance.now() - UP * 0.35;
    const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    let last = performance.now();
    let raf = 0;
    let visible = true;
    const R = ro.current;
    const wdthOf = (s) => Math.max(25, Math.min(151, s >= 1 ? 100 - (s - 1) * widthK : 100 + (1 - s) * widthK * 2.4));
    const yopqOf = (s) => (compensate ? Math.max(25, Math.min(135, 79 / s)) : 79);

    const frame = (now) => {
      const dt = Math.min(2.2, (now - last) / 16.67);
      last = now;
      const pr = probeRef.current;
      if (pr && Math.abs(pr.offsetTop - metricsRef.current.base) > 0.5 && R.remeasure) R.remeasure();
      let a = -1; let A = 1; let src = 'rest'; let stiff = wob[0]; let dmp = wob[1];
      if (drag.current) { a = drag.current.i; A = drag.current.S; src = 'drag'; stiff = 0.34; dmp = 0.6; }
      else if (keyHold.current && now < keyHold.current.until) { a = keyHold.current.i; A = keyHold.current.S; src = 'key'; stiff = 0.22; dmp = 0.68; }
      else if (idleDemo && !reduced && hover.current < 0 && now - lastInput.current > 2600) {
        const el = now - t0;
        const k = Math.floor(el / cycle);
        const ph = el - k * cycle;
        a = idleOrder[k % idleOrder.length];
        if (ph < UP) { A = 1 + (idlePeak - 1) * ease(ph / UP); stiff = 0.3; dmp = 0.62; src = 'idle'; }
        else if (ph < UP + HOLD) { A = idlePeak; stiff = 0.3; dmp = 0.62; src = 'idle'; }
        else { A = 1; src = ph < UP + HOLD + BACK ? 'idle' : 'rest'; }
      }
      const shown = drag.current ? drag.current.i : (hover.current >= 0 ? hover.current : (src === 'idle' || src === 'key' ? a : -1));
      for (let j = 0; j < n; j++) {
        const d = a < 0 ? 99 : Math.abs(j - a);
        const g = a < 0 ? 0 : (d === 0 ? 1 : Math.exp(-Math.pow(d / spread, 2)));
        const target = 1 + (A - 1) * g;
        if (reduced) { S.s[j] = target; S.v[j] = 0; }
        else {
          S.v[j] += (target - S.s[j]) * stiff * dt;
          S.v[j] *= Math.pow(dmp, dt);
          S.s[j] += S.v[j] * dt;
        }
        const s = Math.max(0.12, S.s[j]);
        const gl = glyphRefs.current[j];
        if (gl) {
          gl.style.transform = `scaleY(${s.toFixed(4)})`;
          gl.style.fontVariationSettings = `'wght' ${wRest}, 'wdth' ${wdthOf(s).toFixed(1)}, 'YOPQ' ${yopqOf(s).toFixed(1)}, 'opsz' ${Math.min(144, Math.round(fontPx * 0.75))}`;
          gl.style.color = j === shown ? `color-mix(in srgb, ${accent} ${Math.round(Math.min(1, Math.abs(s - 1) * 1.6) * 100)}%, ${ink})` : ink;
        }
        const topY = capPx * s;
        const hd = handleRefs.current[j];
        if (hd) {
          hd.style.transform = `translateY(${(-topY).toFixed(1)}px)`;
          hd.style.opacity = j === shown ? '1' : '0';
        }
        const tk = tickRefs.current[j];
        if (tk) {
          tk.style.transform = `translateY(${(-topY).toFixed(1)}px)`;
          tk.style.opacity = Math.abs(s - 1) > 0.025 ? '1' : '0';
        }
        if (j === shown) {
          const pct = Math.round(s * 100);
          if (R[`hl${j}`]) R[`hl${j}`].textContent = `${pct}%`;
        }
      }
      if (R.read) {
        const i = shown >= 0 ? shown : (a >= 0 ? a : 0);
        const s = S.s[i] || 1;
        R.ch.textContent = chars[i] || '';
        R.idx.textContent = `${String(i + 1).padStart(2, '0')} / ${String(n).padStart(2, '0')}`;
        R.pct.textContent = `${Math.round(s * 100)}%`;
        R.wdth.textContent = wdthOf(s).toFixed(0);
        R.yopq.textContent = yopqOf(s).toFixed(0);
        R.mode.textContent = src === 'rest' && hover.current >= 0 ? 'hover' : src;
      }
      if (R.marker) {
        const i = shown >= 0 ? shown : a;
        const s = i >= 0 ? (S.s[i] || 1) : 1;
        R.marker.style.transform = `translateY(${(-capPx * s).toFixed(1)}px)`;
        R.marker.style.opacity = i >= 0 ? '1' : '0';
      }
      raf = visible ? requestAnimationFrame(frame) : 0;
    };
    const io = typeof IntersectionObserver !== 'undefined' ? new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      if (visible && !raf) { last = performance.now(); raf = requestAnimationFrame(frame); }
    }) : null;
    if (io) io.observe(root);
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); if (io) io.disconnect(); };
  }, [n, chars, spread, wob, compensate, widthK, idleDemo, idlePeak, idlePause, wRest, fontPx, capPx, accent, ink, reduced]);

  const localY = (e) => {
    const root = rootRef.current;
    if (!root) return 0;
    const r = root.getBoundingClientRect();
    const sc = r.height / (root.offsetHeight || r.height) || 1;
    return (e.clientY - r.top) / sc;
  };
  const band = (S) => (S > sMax ? sMax + (S - sMax) * 0.22 : S < sMin ? sMin - (sMin - S) * 0.22 : S);
  const onDown = (i) => (e) => {
    e.preventDefault();
    const root = rootRef.current;
    if (root && root.setPointerCapture) { try { root.setPointerCapture(e.pointerId); } catch (err) { /* noop */ } }
    drag.current = { i, y0: localY(e), s0: sim.current.s[i] || 1, S: sim.current.s[i] || 1 };
    lastInput.current = performance.now();
    setActive(true);
  };
  const onMove = (e) => {
    lastInput.current = performance.now();
    const d = drag.current;
    if (!d) return;
    d.S = band(d.s0 + (d.y0 - localY(e)) / (capPx || 1));
  };
  const onUp = () => {
    if (!drag.current) return;
    drag.current = null;
    lastInput.current = performance.now();
    setActive(false);
  };
  const onKey = (i) => (e) => {
    const step = e.shiftKey ? 0.25 : 0.1;
    const cur = keyHold.current && keyHold.current.i === i && performance.now() < keyHold.current.until ? keyHold.current.S : 1;
    let S = null;
    if (e.key === 'ArrowUp' || e.key === 'ArrowRight') S = cur + step;
    else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') S = cur - step;
    else if (e.key === 'Escape' || e.key === 'Home') S = 1;
    if (S === null) return;
    e.preventDefault();
    S = Math.max(sMin, Math.min(sMax, S));
    keyHold.current = { i, S, until: performance.now() + 1400 };
    lastInput.current = performance.now();
  };

  const mono = '"JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace';
  const flex = '"Roboto Flex", "Roboto", -apple-system, "Helvetica Neue", Arial, sans-serif';
  const p = uid;
  const label = { fontFamily: mono, fontSize: compact ? 10 : 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: muted };
  const levels = [1, 1.5, 2, 2.5, 3].filter((l) => l <= sMax + 0.01);
  const ticks = [];
  for (let k = 0; k <= Math.round(sMax * 10); k++) ticks.push(k / 10);
  const rulerOn = showRulers;

  return (
    <section
      ref={rootRef}
      className={`stretch-drag ${p}`}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      onPointerLeave={() => { hover.current = -1; }}
      style={{ position: 'relative', width: '100%', height: H, overflow: 'hidden', background: bg, color: ink, fontFamily: flex, userSelect: 'none', WebkitUserSelect: 'none', cursor: active ? 'grabbing' : 'default' }}
    >
      <style>{`
        @keyframes ${p}-in { from { opacity: 0; transform: translateY(0.25em); } to { opacity: 1; transform: none; } }
        .${p} .${p}-l { cursor: grab; outline: none; touch-action: none; }
        .${p} .${p}-l:focus-visible .${p}-g { text-decoration: underline; text-decoration-color: ${accent}; text-decoration-thickness: 2px; text-underline-offset: 0.08em; }
        .${p} .${p}-rl { transition: opacity .5s cubic-bezier(.22,1,.36,1); }
        .${p}:hover .${p}-rl { opacity: 1 !important; }
        @media (prefers-reduced-motion: reduce) { .${p} * { animation: none !important; transition: none !important; } }
      `}</style>

      <div style={{ position: 'absolute', top: pad, left: pad, right: pad, display: 'flex', justifyContent: 'space-between', gap: 20, pointerEvents: 'none', ...label }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 6, height: 6, background: accent, borderRadius: '50%', flexShrink: 0 }} />{eyebrow}
        </span>
        {!compact && <span>{sideLabel}</span>}
      </div>

      {rulerOn && (
        <div aria-hidden="true" className={`${p}-rl`} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.75 }}>
          <div style={{ position: 'absolute', left: 0, right: 0, top: baseY, height: 1, background: ink, opacity: 0.85 }} />
          {levels.map((l) => (
            <div key={l} style={{ position: 'absolute', left: compact ? pad : pad + 34, right: 0, top: Math.round(baseY - capPx * l), height: 0, borderTop: l === 1 ? `1px solid ${rule}` : `1px dashed ${rule}` }}>
              <span style={{ position: 'absolute', right: pad, top: -18, ...label, fontSize: 10, letterSpacing: '0.12em' }}>{Math.round(l * 100)}%</span>
            </div>
          ))}
          <span style={{ position: 'absolute', right: pad, top: baseY + 8, ...label, fontSize: 10, letterSpacing: '0.12em', color: ink }}>Baseline</span>
          {!compact && (
            <div style={{ position: 'absolute', left: pad, top: baseY, width: 22, height: 0 }}>
              {ticks.map((t, k) => (
                <span key={k} style={{ position: 'absolute', left: 0, top: -Math.round(capPx * t), width: k % 5 === 0 ? 22 : 10, height: 1, background: k % 5 === 0 ? muted : rule }} />
              ))}
              <span ref={(el) => { ro.current.marker = el; }} style={{ position: 'absolute', left: 26, top: -5, width: 0, height: 0, borderTop: '5px solid transparent', borderBottom: '5px solid transparent', borderLeft: `7px solid ${accent}`, opacity: 0 }} />
            </div>
          )}
        </div>
      )}

      <div
        role="group"
        aria-label={`${word} — stretchable letters`}
        style={{ position: 'absolute', left: 0, right: 0, top: baseY - fontPx * 2, height: fontPx * 3, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', pointerEvents: 'none' }}
      >
        <div style={{ position: 'relative', whiteSpace: 'nowrap', fontSize: fontPx, lineHeight: 1, letterSpacing: `${tracking}em`, transform: `translateY(${(fontPx * 2 - metrics.base).toFixed(1)}px)`, opacity: metrics.ready ? 1 : 0, transition: 'opacity .25s' }}>
          <span ref={probeRef} style={{ display: 'inline-block', width: 0, height: 0, verticalAlign: 'baseline' }} />
          {chars.map((ch, i) => (
            <span
              key={i}
              ref={(el) => { wrapRefs.current[i] = el; }}
              className={`${p}-l`}
              role="slider"
              tabIndex={0}
              aria-label={`Letter ${ch}`}
              aria-valuemin={Math.round(sMin * 100)}
              aria-valuemax={Math.round(sMax * 100)}
              aria-valuenow={100}
              aria-valuetext="Stretch percentage"
              onPointerDown={onDown(i)}
              onPointerEnter={() => { hover.current = i; }}
              onPointerLeave={() => { if (hover.current === i) hover.current = -1; }}
              onKeyDown={onKey(i)}
              onFocus={() => { hover.current = i; }}
              onBlur={() => { if (hover.current === i) hover.current = -1; }}
              style={{ display: 'inline-block', position: 'relative', whiteSpace: 'pre', pointerEvents: 'auto', animation: reduced ? 'none' : `${p}-in 700ms cubic-bezier(.22,1,.36,1) ${i * 40}ms both` }}
            >
              <span
                ref={(el) => { glyphRefs.current[i] = el; }}
                className={`${p}-g`}
                style={{ display: 'inline-block', transformOrigin: `50% ${metrics.base}px`, willChange: 'transform', fontVariationSettings: `'wght' ${wRest}, 'wdth' 100` }}
              >{ch}</span>
              <span aria-hidden="true" ref={(el) => { tickRefs.current[i] = el; }} style={{ position: 'absolute', left: '18%', right: '18%', top: metrics.base, height: 0, borderTop: `1px solid ${accent}`, opacity: 0, pointerEvents: 'none', marginTop: -10 }} />
              {showHandle && (
                <span aria-hidden="true" ref={(el) => { handleRefs.current[i] = el; }} style={{ position: 'absolute', left: '50%', top: metrics.base, width: 0, height: 0, opacity: 0, pointerEvents: 'none', transition: 'opacity .25s' }}>
                  <span style={{ position: 'absolute', left: -9, top: -26, width: 18, height: 8, border: `1px solid ${accent}`, background: bg, borderRadius: 2 }} />
                  <span style={{ position: 'absolute', left: 0, top: -18, width: 1, height: 14, background: accent }} />
                  <span ref={(el) => { ro.current[`hl${i}`] = el; }} style={{ position: 'absolute', left: 0, top: -50, transform: 'translateX(-50%)', fontFamily: mono, fontSize: compact ? 10 : 12, letterSpacing: '0.08em', color: accent, lineHeight: 1, whiteSpace: 'nowrap' }}>100%</span>
                </span>
              )}
            </span>
          ))}
        </div>
      </div>

      <div style={{ position: 'absolute', left: pad, right: pad, bottom: pad, display: 'flex', flexDirection: compact ? 'column' : 'row', justifyContent: 'space-between', alignItems: compact ? 'flex-start' : 'flex-end', gap: compact ? 14 : 24, pointerEvents: 'none' }}>
        <span style={{ ...label, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ display: 'inline-flex', flexDirection: 'column', gap: 2, alignItems: 'center', color: accent, fontSize: 9, lineHeight: 0.8 }}>
            <span>▲</span><span>▼</span>
          </span>
          {hint}
        </span>
        {showReadout && (
          <div aria-hidden="true" ref={(el) => { ro.current.read = el; }} style={{ ...label, display: 'flex', gap: compact ? 16 : 30, alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <span style={{ display: 'grid', gap: 6 }}><span style={{ opacity: 0.75 }}>Glyph</span><span style={{ color: ink }}><span ref={(el) => { ro.current.ch = el; }}>{chars[0]}</span>&nbsp;&nbsp;<span ref={(el) => { ro.current.idx = el; }}>01</span></span></span>
            <span style={{ display: 'grid', gap: 6 }}><span style={{ opacity: 0.75 }}>Stretch</span><span ref={(el) => { ro.current.pct = el; }} style={{ color: accent, fontVariantNumeric: 'tabular-nums' }}>100%</span></span>
            <span style={{ display: 'grid', gap: 6 }}><span style={{ opacity: 0.75 }}>wdth</span><span ref={(el) => { ro.current.wdth = el; }} style={{ color: ink }}>100</span></span>
            <span style={{ display: 'grid', gap: 6 }}><span style={{ opacity: 0.75 }}>YOPQ</span><span ref={(el) => { ro.current.yopq = el; }} style={{ color: ink }}>79</span></span>
            <span style={{ display: 'grid', gap: 6 }}><span style={{ opacity: 0.75 }}>Source</span><span ref={(el) => { ro.current.mode = el; }} style={{ color: ink }}>idle</span></span>
          </div>
        )}
      </div>
    </section>
  );
}

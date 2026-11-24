const MANIFEST = {
  "type": "Type.CursorWordTrail",
  "description": "A quiet stage with a centred statement where the pointer writes as it moves: it leaves a trail of grotesk words at varied weights and sizes that drift, fade and blur out over about a second, with faster movement spawning larger words. Clicking pins a word in place. When idle, a lissajous path writes the trail on its own",
  "editorElement": {
    "selector": ".cursor-word-trail",
    "displayName": "Cursor Word Trail",
    "archetype": "container",
    "data": {
      "statement": { "dataType": "text", "displayName": "Statement (use / for line breaks)", "defaultValue": "Every gesture / leaves a word.", "group": "Content" },
      "words": { "dataType": "text", "displayName": "Trail Words (comma separated)", "defaultValue": "drift, echo, linger, trace, signal, after, motion, quiet, pulse, orbit, glide, residue, light, memory, wake, fade, gesture, here", "group": "Content" },
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Word trail — Gesture writing", "group": "Content" },
      "sideLabel": { "dataType": "text", "displayName": "Corner Label", "defaultValue": "No. 05 / Kinetic type", "group": "Content" },
      "hint": { "dataType": "text", "displayName": "Hint", "defaultValue": "Move to write · Click to pin", "group": "Content" },
      "lifetime": { "dataType": "select", "displayName": "Word Lifetime (ms)", "defaultValue": "1100", "options": ["700", "1100", "1600", "2400"], "group": "Trail" },
      "density": { "dataType": "select", "displayName": "Density", "defaultValue": "medium", "options": ["sparse", "medium", "dense"], "group": "Trail" },
      "minSize": { "dataType": "select", "displayName": "Smallest Word (px)", "defaultValue": "16", "options": ["12", "16", "22", "28"], "group": "Trail" },
      "maxSize": { "dataType": "select", "displayName": "Largest Word (px)", "defaultValue": "120", "options": ["64", "90", "120", "160"], "group": "Trail" },
      "blur": { "dataType": "select", "displayName": "Fade Blur (px)", "defaultValue": "10", "options": ["0", "6", "10", "16"], "group": "Trail" },
      "drift": { "dataType": "select", "displayName": "Drift", "defaultValue": "medium", "options": ["none", "low", "medium", "high"], "group": "Trail" },
      "maxPins": { "dataType": "select", "displayName": "Max Pinned Words", "defaultValue": "6", "options": ["0", "3", "6", "10"], "group": "Trail" },
      "idlePath": { "dataType": "booleanValue", "displayName": "Idle Lissajous Path", "defaultValue": "true", "group": "Animation" },
      "idleSpeed": { "dataType": "select", "displayName": "Idle Speed", "defaultValue": "medium", "options": ["slow", "medium", "fast"], "group": "Animation" },
      "showGhost": { "dataType": "booleanValue", "displayName": "Show Idle Cursor", "defaultValue": "true", "group": "Animation" },
      "showReadout": { "dataType": "booleanValue", "displayName": "Live Readout", "defaultValue": "true", "group": "Layout" },
      "height": { "dataType": "select", "displayName": "Height", "defaultValue": "screen", "options": ["screen", "560", "680", "800"], "group": "Layout" },
      "statementScale": { "dataType": "select", "displayName": "Statement Scale", "defaultValue": "1", "options": ["0.8", "0.9", "1", "1.1"], "group": "Typography" },
      "statementWeight": { "dataType": "select", "displayName": "Statement Weight", "defaultValue": "400", "options": ["300", "400", "500"], "group": "Typography" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#0B0B0C", "group": "Colors" },
      "inkColor": { "dataType": "color", "displayName": "Ink", "defaultValue": "#F3F2EF", "group": "Colors" },
      "trailColor": { "dataType": "color", "displayName": "Trail Words", "defaultValue": "#BDB9B2", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#6F6B66", "group": "Colors" },
      "ruleColor": { "dataType": "color", "displayName": "Rules", "defaultValue": "#26241F", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent", "defaultValue": "#FF5F1F", "group": "Colors" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const statement = config?.statement || 'Every gesture / leaves a word.';
  const wordsRaw = config?.words || 'drift, echo, linger, trace, signal, after, motion, quiet, pulse, orbit, glide, residue, light, memory, wake, fade, gesture, here';
  const eyebrow = config?.eyebrow || 'Word trail — Gesture writing';
  const sideLabel = config?.sideLabel || 'No. 05 / Kinetic type';
  const hint = config?.hint || 'Move to write · Click to pin';
  const life = parseFloat(config?.lifetime || '1100') || 1100;
  const spacingK = { sparse: 1.5, medium: 1, dense: 0.65 }[config?.density || 'medium'] || 1;
  const minSize = parseFloat(config?.minSize || '16') || 16;
  const maxSize = parseFloat(config?.maxSize || '120') || 120;
  const blurPx = parseFloat(config?.blur ?? '10');
  const blurMax = isNaN(blurPx) ? 10 : blurPx;
  const driftK = { none: 0, low: 0.5, medium: 1, high: 1.8 }[config?.drift || 'medium'] ?? 1;
  const maxPins = parseInt(config?.maxPins ?? '6', 10);
  const pinCap = isNaN(maxPins) ? 6 : maxPins;
  const idlePath = bool(config?.idlePath, true);
  const idleSpeed = { slow: 0.6, medium: 1, fast: 1.5 }[config?.idleSpeed || 'medium'] || 1;
  const showGhost = bool(config?.showGhost, true);
  const showReadout = bool(config?.showReadout, true);
  const heightMode = config?.height || 'screen';
  const statementScale = parseFloat(config?.statementScale || '1') || 1;
  const statementWeight = parseFloat(config?.statementWeight || '400') || 400;
  const bg = config?.backgroundColor || '#0B0B0C';
  const ink = config?.inkColor || '#F3F2EF';
  const trail = config?.trailColor || '#BDB9B2';
  const muted = config?.mutedColor || '#6F6B66';
  const rule = config?.ruleColor || '#26241F';
  const accent = config?.accentColor || '#FF5F1F';

  const words = React.useMemo(() => {
    const w = String(wordsRaw).split(',').map((s) => s.trim()).filter(Boolean);
    return w.length ? w : ['word'];
  }, [wordsRaw]);

  const uid = React.useMemo(() => 'wt' + Math.random().toString(36).slice(2, 9), []);
  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  const POOL = 56;
  const rootRef = React.useRef(null);
  const slotRefs = React.useRef([]);
  const ghostRef = React.useRef(null);
  const ro = React.useRef({});
  const slots = React.useRef([]);
  const ptr = React.useRef({ x: 0, y: 0, on: false, t: 0, speed: 0, vx: 0, vy: 0 });
  const lastUser = React.useRef(-1e9);
  const counters = React.useRef({ spawned: 0, word: 0, slot: 0 });
  const [pins, setPins] = React.useState([]);
  const [width, setWidth] = React.useState(1280);
  const [stageH, setStageH] = React.useState(760);

  React.useEffect(() => {
    const id = 'gf-inter-tight-jbmono';
    if (document.getElementById(id)) return;
    const l = document.createElement('link');
    l.id = id; l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300..500&family=JetBrains+Mono:wght@400;500&display=swap';
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
  const lines = React.useMemo(() => String(statement).split(/\s*(?:\/|\n)\s*/).filter(Boolean), [statement]);
  const maxChars = Math.max(...lines.map((l) => l.length), 1);
  const stPx = Math.round(Math.min(((width - pad * 2) * 0.86) / (maxChars * 0.48), (H * 0.42) / (lines.length * 1.0), 132) * statementScale);
  const sizeK = compact ? 0.6 : 1;

  const mono = '"JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace';
  const sans = '"Inter Tight", "Inter", -apple-system, "Helvetica Neue", Arial, sans-serif';

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    slots.current = Array.from({ length: POOL }, (_, i) => slots.current[i] || { on: false });
    const C = counters.current;
    const weights = [300, 400, 500, 400, 300];
    const spawn = (x, y, speed, vx, vy, born) => {
      const sl = C.slot % POOL; C.slot++;
      const el = slotRefs.current[sl];
      if (!el) return;
      const sp = Math.max(0, Math.min(1, (speed - 0.1) / 1.1));
      const size = (minSize + (maxSize - minSize) * Math.pow(sp, 0.85)) * sizeK;
      const text = words[C.word % words.length]; C.word++;
      const wgt = weights[C.spawned % weights.length];
      const mag = Math.hypot(vx, vy) || 1;
      slots.current[sl] = {
        on: true, born, x, y, size,
        dx: (vx / mag) * Math.min(1, speed) * 26 * driftK + (Math.random() - 0.5) * 16 * driftK,
        dy: (vy / mag) * Math.min(1, speed) * 26 * driftK - 18 * driftK,
        rot: (Math.random() - 0.5) * 6 * driftK,
        o: 0.55 + 0.45 * sp
      };
      el.textContent = text;
      el.style.fontSize = `${size.toFixed(1)}px`;
      el.style.fontVariationSettings = `'wght' ${wgt}`;
      el.style.fontWeight = String(wgt);
      el.style.letterSpacing = size > 50 ? '-0.04em' : size > 26 ? '-0.025em' : '-0.01em';
      C.spawned++;
    };
    ro.current.spawn = spawn;

    let raf = 0; let visible = true;
    let last = performance.now();
    const t0 = last;
    let acc = 0; let lastSpawn = { x: 0, y: 0 }; let srcPrev = null;
    let ghostOn = 0;
    const R = ro.current;
    const path = (t) => {
      const w = root.offsetWidth || 1280; const h = root.offsetHeight || 760;
      const ax = w * (compact ? 0.36 : 0.4); const ay = h * (compact ? 0.3 : 0.32);
      return { x: w / 2 + ax * Math.sin(t * 1.55 * idleSpeed + 0.3), y: h * 0.5 + ay * Math.sin(t * 2.3 * idleSpeed) };
    };
    if (idlePath && !reduced) {
      const pre = 1.15;
      let prev = path(-pre);
      for (let s = -pre; s <= 0; s += 0.016) {
        const q = path(s);
        const d = Math.hypot(q.x - prev.x, q.y - prev.y);
        const speed = d / 16;
        acc += d;
        const size = (minSize + (maxSize - minSize) * Math.pow(Math.max(0, Math.min(1, (speed - 0.1) / 1.1)), 0.85)) * sizeK;
        if (acc > (size * 1.45 + 30) * spacingK) { acc = 0; spawn(q.x, q.y, speed, q.x - prev.x, q.y - prev.y, t0 + s * 1000); lastSpawn = q; }
        prev = q;
      }
      srcPrev = prev;
    }

    const frame = (now) => {
      const dt = Math.min(64, now - last);
      last = now;
      const P = ptr.current;
      const idle = idlePath && !reduced && !P.on && now - lastUser.current > 1600;
      ghostOn += ((idle ? 1 : 0) - ghostOn) * 0.06;
      let src = null; let speed = 0; let vx = 0; let vy = 0;
      if (P.on && !reduced) { src = { x: P.x, y: P.y }; speed = P.speed; vx = P.vx; vy = P.vy; P.speed *= 0.86; }
      else if (idle) {
        const q = path((now - t0) / 1000);
        if (srcPrev) { vx = q.x - srcPrev.x; vy = q.y - srcPrev.y; speed = Math.hypot(vx, vy) / Math.max(1, dt); }
        src = q;
      }
      if (src && srcPrev) {
        const d = Math.hypot(src.x - srcPrev.x, src.y - srcPrev.y);
        acc += d;
        const sp = Math.max(0, Math.min(1, (speed - 0.1) / 1.1));
        const size = (minSize + (maxSize - minSize) * Math.pow(sp, 0.85)) * sizeK;
        if (acc > (size * 1.45 + 30) * spacingK && Math.hypot(src.x - lastSpawn.x, src.y - lastSpawn.y) > 8) {
          acc = 0; lastSpawn = src;
          spawn(src.x, src.y, speed, vx || 1, vy, now);
        }
      }
      srcPrev = src;
      if (ghostRef.current) {
        const g = idle || ghostOn > 0.02 ? path((now - t0) / 1000) : null;
        ghostRef.current.style.opacity = showGhost ? ghostOn.toFixed(3) : '0';
        if (g) ghostRef.current.style.transform = `translate(${g.x.toFixed(1)}px, ${g.y.toFixed(1)}px)`;
      }
      let live = 0;
      for (let i = 0; i < POOL; i++) {
        const s = slots.current[i]; const el = slotRefs.current[i];
        if (!el || !s) continue;
        if (!s.on) { if (el.style.opacity !== '0') el.style.opacity = '0'; continue; }
        const t = (now - s.born) / life;
        if (t >= 1) { s.on = false; el.style.opacity = '0'; continue; }
        live++;
        const e = 1 - Math.pow(1 - t, 3);
        const inT = Math.min(1, t * 9);
        const o = s.o * inT * Math.pow(1 - t, 1.6);
        const sc = (0.86 + 0.14 * inT) * (1 - 0.08 * t);
        el.style.opacity = o.toFixed(3);
        el.style.filter = blurMax > 0 ? `blur(${(Math.pow(t, 1.4) * blurMax).toFixed(2)}px)` : 'none';
        el.style.transform = `translate(${(s.x + s.dx * e).toFixed(1)}px, ${(s.y + s.dy * e).toFixed(1)}px) translate(-50%, -50%) rotate(${(s.rot * e).toFixed(2)}deg) scale(${sc.toFixed(3)})`;
      }
      if (R.count) {
        R.count.textContent = String(C.spawned).padStart(4, '0');
        R.speed.textContent = speed.toFixed(2);
        R.live.textContent = String(live).padStart(2, '0');
        R.src.textContent = P.on ? 'Pointer' : idle ? 'Lissajous' : 'Still';
      }
      raf = visible ? requestAnimationFrame(frame) : 0;
    };
    const io = typeof IntersectionObserver !== 'undefined' ? new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      if (visible && !raf) { last = performance.now(); raf = requestAnimationFrame(frame); }
    }) : null;
    if (io) io.observe(root);
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); if (io) io.disconnect(); ro.current.spawn = null; };
  }, [words, life, spacingK, minSize, maxSize, blurMax, driftK, idlePath, idleSpeed, showGhost, compact, sizeK, reduced]);

  const toLocal = (e) => {
    const root = rootRef.current;
    const r = root.getBoundingClientRect();
    const sc = r.width / (root.offsetWidth || r.width) || 1;
    return { x: (e.clientX - r.left) / sc, y: (e.clientY - r.top) / sc };
  };
  const onMove = (e) => {
    if (!rootRef.current) return;
    const L = toLocal(e);
    const P = ptr.current;
    const now = performance.now();
    if (P.on) {
      const dtm = Math.max(6, now - P.t);
      const d = Math.hypot(L.x - P.x, L.y - P.y);
      P.speed = P.speed * 0.5 + (d / dtm) * 0.5;
      P.vx = L.x - P.x; P.vy = L.y - P.y;
    }
    P.x = L.x; P.y = L.y; P.t = now; P.on = true;
    lastUser.current = now;
  };
  const onLeave = () => { ptr.current.on = false; ptr.current.speed = 0; lastUser.current = performance.now(); };
  const pinAt = (x, y) => {
    if (pinCap <= 0) return;
    const C = counters.current;
    const text = words[C.word % words.length]; C.word++;
    const sp = Math.max(0, Math.min(1, (ptr.current.speed - 0.1) / 1.1));
    const size = Math.max(58 * sizeK, (minSize + (maxSize - minSize) * Math.pow(sp, 0.85)) * sizeK);
    setPins((prev) => {
      const nxt = [...prev, { id: Date.now() + Math.random(), x, y, size, text, w: [300, 400, 500][prev.length % 3], n: (prev.length ? prev[prev.length - 1].n : 0) + 1 }];
      return nxt.slice(-pinCap);
    });
    lastUser.current = performance.now();
  };
  const onClick = (e) => {
    if (!rootRef.current) return;
    const L = toLocal(e);
    pinAt(L.x, L.y);
  };
  const onKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const root = rootRef.current;
      if (!root) return;
      pinAt(root.offsetWidth * (0.2 + Math.random() * 0.6), root.offsetHeight * (0.22 + Math.random() * 0.56));
    } else if (e.key === 'Escape' || e.key === 'Backspace') setPins([]);
  };

  const p = uid;
  const label = { fontFamily: mono, fontSize: compact ? 10 : 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: muted };

  return (
    <section
      ref={rootRef}
      className={`cursor-word-trail ${p}`}
      tabIndex={0}
      aria-label={`${lines.join(' ')} — interactive word trail. Press Enter to pin a word, Escape to clear.`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onClick={onClick}
      onKeyDown={onKey}
      style={{ position: 'relative', width: '100%', height: H, overflow: 'hidden', background: bg, color: ink, fontFamily: sans, cursor: 'crosshair', touchAction: 'pan-y', userSelect: 'none', WebkitUserSelect: 'none', outline: 'none' }}
    >
      <style>{`
        .${p}:focus-visible { box-shadow: inset 0 0 0 1px ${accent}; }
        @keyframes ${p}-st { from { opacity: 0; transform: translateY(0.3em); filter: blur(10px); } to { opacity: 1; transform: none; filter: none; } }
        @keyframes ${p}-pin { from { opacity: 0; transform: translate(-50%, -50%) scale(1.14); filter: blur(12px); } to { opacity: 1; transform: translate(-50%, -50%) scale(1); filter: none; } }
        @keyframes ${p}-ring { 0% { transform: scale(.4); opacity: .9; } 100% { transform: scale(1.8); opacity: 0; } }
        .${p} .${p}-clr { all: unset; cursor: pointer; padding: 6px 12px; border: 1px solid ${rule}; border-radius: 999px; transition: border-color .3s, color .3s; }
        .${p} .${p}-clr:hover, .${p} .${p}-clr:focus-visible { border-color: ${accent}; color: ${ink}; }
        @media (prefers-reduced-motion: reduce) { .${p} * { animation: none !important; transition: none !important; } }
      `}</style>

      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', left: '50%', top: pad + 44, bottom: pad + 44, width: 1, background: rule, opacity: 0.6 }} />
        <div style={{ position: 'absolute', top: '50%', left: pad, right: pad, height: 1, background: rule, opacity: 0.6 }} />
      </div>

      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {Array.from({ length: POOL }).map((_, i) => (
          <span key={i} ref={(el) => { slotRefs.current[i] = el; }} style={{ position: 'absolute', left: 0, top: 0, whiteSpace: 'nowrap', color: trail, opacity: 0, lineHeight: 1, willChange: 'transform, opacity, filter', fontFamily: sans }} />
        ))}
      </div>

      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', padding: `0 ${pad}px` }}>
        <h2 style={{ margin: 0, textAlign: 'center', fontFamily: sans, fontWeight: statementWeight, fontSize: stPx, lineHeight: 1.0, letterSpacing: '-0.045em', color: ink, textShadow: `0 0 40px ${bg}, 0 0 18px ${bg}` }}>
          {lines.map((ln, li) => (
            <span key={li} style={{ display: 'block', animation: reduced ? 'none' : `${p}-st 900ms cubic-bezier(.22,1,.36,1) ${120 + li * 110}ms both` }}>{ln}</span>
          ))}
        </h2>
      </div>

      <div aria-live="polite" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {pins.map((pn) => (
          <div key={pn.id} style={{ position: 'absolute', left: pn.x, top: pn.y, transform: 'translate(-50%, -50%)', animation: reduced ? 'none' : `${p}-pin 700ms cubic-bezier(.22,1,.36,1) both` }}>
            <span style={{ display: 'block', fontFamily: sans, fontSize: pn.size, fontWeight: pn.w, letterSpacing: pn.size > 50 ? '-0.04em' : '-0.02em', color: ink, lineHeight: 1, whiteSpace: 'nowrap' }}>{pn.text}</span>
            <span style={{ position: 'absolute', left: 0, top: '100%', marginTop: 8, display: 'flex', alignItems: 'center', gap: 6, ...label, fontSize: 9, color: accent, whiteSpace: 'nowrap' }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: accent }} />
              Pin {String(pn.n).padStart(2, '0')}
            </span>
          </div>
        ))}
      </div>

      <div ref={ghostRef} aria-hidden="true" style={{ position: 'absolute', left: 0, top: 0, width: 0, height: 0, pointerEvents: 'none', opacity: 0 }}>
        <span style={{ position: 'absolute', left: -4, top: -4, width: 8, height: 8, borderRadius: '50%', background: accent }} />
        <span style={{ position: 'absolute', left: -14, top: -14, width: 28, height: 28, borderRadius: '50%', border: `1px solid ${accent}`, animation: reduced ? 'none' : `${p}-ring 1.6s cubic-bezier(.22,1,.36,1) infinite` }} />
      </div>

      <div style={{ position: 'absolute', top: pad, left: pad, right: pad, display: 'flex', justifyContent: 'space-between', gap: 20, pointerEvents: 'none', ...label }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 6, height: 6, background: accent, borderRadius: '50%', flexShrink: 0 }} />{eyebrow}
        </span>
        {!compact && <span>{sideLabel}</span>}
      </div>

      <div style={{ position: 'absolute', left: pad, right: pad, bottom: pad, display: 'flex', flexDirection: compact ? 'column' : 'row', justifyContent: 'space-between', alignItems: compact ? 'flex-start' : 'flex-end', gap: compact ? 14 : 24 }}>
        <span style={{ ...label, display: 'flex', alignItems: 'center', gap: 14, pointerEvents: 'none' }}>{hint}</span>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: compact ? 16 : 30, flexWrap: 'wrap' }}>
          {showReadout && (
            <div aria-hidden="true" style={{ ...label, display: 'flex', gap: compact ? 16 : 30, pointerEvents: 'none' }}>
              <span style={{ display: 'grid', gap: 6 }}><span style={{ opacity: 0.8 }}>Source</span><span ref={(el) => { ro.current.src = el; }} style={{ color: accent }}>Lissajous</span></span>
              <span style={{ display: 'grid', gap: 6 }}><span style={{ opacity: 0.8 }}>Words</span><span ref={(el) => { ro.current.count = el; }} style={{ color: ink, fontVariantNumeric: 'tabular-nums' }}>0000</span></span>
              <span style={{ display: 'grid', gap: 6 }}><span style={{ opacity: 0.8 }}>Live</span><span ref={(el) => { ro.current.live = el; }} style={{ color: ink, fontVariantNumeric: 'tabular-nums' }}>00</span></span>
              <span style={{ display: 'grid', gap: 6 }}><span style={{ opacity: 0.8 }}>px/ms</span><span ref={(el) => { ro.current.speed = el; }} style={{ color: ink, fontVariantNumeric: 'tabular-nums' }}>0.00</span></span>
            </div>
          )}
          {pinCap > 0 && (
            <span style={{ ...label, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ pointerEvents: 'none' }}>Pins {String(pins.length).padStart(2, '0')}/{String(pinCap).padStart(2, '0')}</span>
              {pins.length > 0 && (
                <button type="button" className={`${p}-clr`} onClick={(e) => { e.stopPropagation(); setPins([]); }} aria-label="Clear pinned words">Clear</button>
              )}
            </span>
          )}
        </div>
      </div>
    </section>
  );
}

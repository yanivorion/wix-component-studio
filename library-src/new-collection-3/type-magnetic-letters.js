const MANIFEST = {
  "type": "Type.MagneticLetters",
  "description": "A giant Roboto Flex headline whose letters sit on springs inside a hairline type grid; the pointer repels or attracts them with a soft falloff, adding a slight tilt and weight, and they spring home when it leaves. An invisible ghost pointer glides through the word when idle",
  "editorElement": {
    "selector": ".magnetic-letters",
    "displayName": "Magnetic Letters",
    "archetype": "container",
    "data": {
      "text": { "dataType": "text", "displayName": "Headline (use / for line breaks)", "defaultValue": "Magnetic / field", "group": "Content" },
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Field study — Letters on springs", "group": "Content" },
      "sideLabel": { "dataType": "text", "displayName": "Corner Label", "defaultValue": "No. 03 / Kinetic type", "group": "Content" },
      "hint": { "dataType": "text", "displayName": "Hint", "defaultValue": "Move through the letters", "group": "Content" },
      "mode": { "dataType": "select", "displayName": "Force", "defaultValue": "repel", "options": ["repel", "attract"], "group": "Field" },
      "showToggle": { "dataType": "booleanValue", "displayName": "Show Force Toggle", "defaultValue": "true", "group": "Field" },
      "radius": { "dataType": "select", "displayName": "Falloff Radius (px)", "defaultValue": "240", "options": ["160", "200", "240", "300", "380"], "group": "Field" },
      "strength": { "dataType": "select", "displayName": "Push Strength", "defaultValue": "medium", "options": ["subtle", "medium", "strong", "extreme"], "group": "Field" },
      "rotation": { "dataType": "select", "displayName": "Max Tilt (deg)", "defaultValue": "14", "options": ["0", "6", "14", "24"], "group": "Field" },
      "stiffness": { "dataType": "select", "displayName": "Spring Stiffness", "defaultValue": "medium", "options": ["soft", "medium", "tight"], "group": "Field" },
      "damping": { "dataType": "select", "displayName": "Spring Damping", "defaultValue": "balanced", "options": ["loose", "balanced", "firm"], "group": "Field" },
      "weightShift": { "dataType": "booleanValue", "displayName": "Weight Follows Force", "defaultValue": "true", "group": "Field" },
      "idleGhost": { "dataType": "booleanValue", "displayName": "Idle Ghost Pointer", "defaultValue": "true", "group": "Animation" },
      "idleSpeed": { "dataType": "select", "displayName": "Ghost Speed", "defaultValue": "medium", "options": ["slow", "medium", "fast"], "group": "Animation" },
      "showGrid": { "dataType": "booleanValue", "displayName": "Home Cell Grid", "defaultValue": "true", "group": "Layout" },
      "showIndex": { "dataType": "booleanValue", "displayName": "Cell Numbers", "defaultValue": "true", "group": "Layout" },
      "showRing": { "dataType": "booleanValue", "displayName": "Radius Ring", "defaultValue": "true", "group": "Layout" },
      "showReadout": { "dataType": "booleanValue", "displayName": "Live Readout", "defaultValue": "true", "group": "Layout" },
      "align": { "dataType": "select", "displayName": "Alignment", "defaultValue": "left", "options": ["left", "center"], "group": "Layout" },
      "height": { "dataType": "select", "displayName": "Height", "defaultValue": "screen", "options": ["screen", "560", "680", "800"], "group": "Layout" },
      "weight": { "dataType": "select", "displayName": "Weight at Rest", "defaultValue": "400", "options": ["300", "400", "500"], "group": "Typography" },
      "sizeScale": { "dataType": "select", "displayName": "Headline Scale", "defaultValue": "1", "options": ["0.8", "0.9", "1", "1.1"], "group": "Typography" },
      "tracking": { "dataType": "select", "displayName": "Tracking (em)", "defaultValue": "-0.03", "options": ["-0.05", "-0.03", "-0.01", "0"], "group": "Typography" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#0B0B0C", "group": "Colors" },
      "inkColor": { "dataType": "color", "displayName": "Ink", "defaultValue": "#F3F2EF", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#77736E", "group": "Colors" },
      "ruleColor": { "dataType": "color", "displayName": "Grid Lines", "defaultValue": "#26241F", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent", "defaultValue": "#FF5F1F", "group": "Colors" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const text = config?.text || 'Magnetic / field';
  const eyebrow = config?.eyebrow || 'Field study — Letters on springs';
  const sideLabel = config?.sideLabel || 'No. 03 / Kinetic type';
  const hint = config?.hint || 'Move through the letters';
  const modeCfg = config?.mode === 'attract' ? 'attract' : 'repel';
  const showToggle = bool(config?.showToggle, true);
  const radius = parseFloat(config?.radius || '240') || 240;
  const strength = { subtle: 0.16, medium: 0.28, strong: 0.42, extreme: 0.62 }[config?.strength || 'medium'] || 0.28;
  const maxRot = parseFloat(config?.rotation ?? '14');
  const rotDeg = isNaN(maxRot) ? 14 : maxRot;
  const stiff = { soft: 0.045, medium: 0.075, tight: 0.12 }[config?.stiffness || 'medium'] || 0.075;
  const damp = { loose: 0.88, balanced: 0.82, firm: 0.74 }[config?.damping || 'balanced'] || 0.82;
  const weightShift = bool(config?.weightShift, true);
  const idleGhost = bool(config?.idleGhost, true);
  const ghostSpeed = { slow: 0.55, medium: 0.85, fast: 1.3 }[config?.idleSpeed || 'medium'] || 0.85;
  const showGrid = bool(config?.showGrid, true);
  const showIndex = bool(config?.showIndex, true);
  const showRing = bool(config?.showRing, true);
  const showReadout = bool(config?.showReadout, true);
  const align = config?.align === 'center' ? 'center' : 'left';
  const heightMode = config?.height || 'screen';
  const wRest = parseFloat(config?.weight || '400') || 400;
  const sizeScale = parseFloat(config?.sizeScale || '1') || 1;
  const tracking = parseFloat(config?.tracking || '-0.03') || 0;
  const bg = config?.backgroundColor || '#0B0B0C';
  const ink = config?.inkColor || '#F3F2EF';
  const muted = config?.mutedColor || '#77736E';
  const rule = config?.ruleColor || '#26241F';
  const accent = config?.accentColor || '#FF5F1F';

  const uid = React.useMemo(() => 'ml' + Math.random().toString(36).slice(2, 9), []);
  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  const rootRef = React.useRef(null);
  const blockRef = React.useRef(null);
  const ringRef = React.useRef(null);
  const letterRefs = React.useRef([]);
  const ro = React.useRef({});
  const pointer = React.useRef(null);
  const lastMove = React.useRef(-1e9);
  const states = React.useRef([]);
  const [mode, setMode] = React.useState(modeCfg);
  const modeRef = React.useRef(modeCfg);
  const [width, setWidth] = React.useState(1280);
  const [stageH, setStageH] = React.useState(760);

  React.useEffect(() => { setMode(modeCfg); }, [modeCfg]);
  React.useEffect(() => { modeRef.current = mode; }, [mode]);

  React.useEffect(() => {
    const id = 'gf-roboto-flex-jbmono';
    if (document.getElementById(id)) return;
    const l = document.createElement('link');
    l.id = id; l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,slnt,wdth,wght@8..144,-10..0,25..151,100..1000&family=JetBrains+Mono:wght@400;500&display=swap';
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
  const lines = React.useMemo(() => {
    const base = String(text).split(/\s*(?:\/|\n)\s*/).filter(Boolean);
    return compact ? base.flatMap((l) => l.split(/\s+/)).filter(Boolean) : base;
  }, [text, compact]);
  const flat = React.useMemo(() => {
    const out = [];
    lines.forEach((ln, li) => Array.from(ln).forEach((ch, ci) => out.push({ ch, li, ci })));
    return out;
  }, [lines]);

  const H = heightMode === 'screen' ? Math.max(compact ? 640 : 560, Math.min(stageH, 1000)) : parseInt(heightMode, 10) || 680;
  const pad = compact ? 20 : 56;
  const maxChars = Math.max(...lines.map((l) => l.length), 1);
  const topZone = pad + 60;
  const bottomZone = pad + (compact ? 120 : 92);
  const lh = 1.02;
  const fontPx = Math.round(Math.min(
    ((width - pad * 2) * 0.96) / (maxChars * (compact ? 0.44 : 0.5)),
    (H - topZone - bottomZone) / (lines.length * lh)
  ) * sizeScale);
  const rad = compact ? radius * 0.6 : radius;

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const n = flat.length;
    states.current = Array.from({ length: n }, (_, i) => states.current[i] || { x: 0, y: 0, vx: 0, vy: 0, r: 0, w: wRest, c: 0 });
    const push = fontPx * strength;
    const shape = (t) => (t >= 1 ? 0 : 0.5 + 0.5 * Math.cos(Math.PI * t));
    const t0 = performance.now();
    let last = t0;
    let raf = 0;
    let visible = true;
    let ghostMix = idleGhost && !reduced ? 1 : 0;
    let srcX = 0; let srcY = 0; let srcInit = false;
    const R = ro.current;

    const frame = (now) => {
      const dt = Math.min(2.2, (now - last) / 16.67);
      last = now;
      const rr = root.getBoundingClientRect();
      const scale = rr.width / (root.offsetWidth || rr.width) || 1;
      const P = pointer.current;
      const wantGhost = idleGhost && !reduced && (!P && now - lastMove.current > 1400);
      ghostMix += ((wantGhost ? 1 : 0) - ghostMix) * Math.min(1, 0.04 * dt);
      let gx = 0; let gy = 0;
      const blk = blockRef.current;
      if (blk) {
        const b = blk.getBoundingClientRect();
        const bx = (b.left - rr.left) / scale; const by = (b.top - rr.top) / scale;
        const bw = b.width / scale; const bh = b.height / scale;
        const tg = ((now - t0) / 1000) * ghostSpeed;
        gx = bx + bw * (0.5 + 0.47 * Math.sin(tg * 0.62 - 1.2));
        gy = by + bh * (0.5 + 0.36 * Math.sin(tg * 1.37 + 0.4) + 0.08 * Math.sin(tg * 3.1));
      }
      let amp;
      let tx; let ty;
      if (P) { tx = P.x; ty = P.y; amp = 1; }
      else { tx = gx; ty = gy; amp = ghostMix * 0.58; }
      if (!srcInit) { srcX = tx; srcY = ty; srcInit = true; }
      const follow = P ? 1 : 0.18 * dt;
      srcX += (tx - srcX) * Math.min(1, follow);
      srcY += (ty - srcY) * Math.min(1, follow);
      const attract = modeRef.current === 'attract';
      let maxD = 0; let near = -1; let nearD = 1e9;
      for (let i = 0; i < n; i++) {
        const el = letterRefs.current[i];
        const st = states.current[i];
        if (!el || !st) continue;
        const b = el.getBoundingClientRect();
        const hx = (b.left + b.width / 2 - rr.left) / scale - st.x;
        const hy = (b.top + b.height / 2 - rr.top) / scale - st.y;
        let gxT = 0; let gyT = 0; let f = 0;
        if (amp > 0.001) {
          const dx = hx - srcX; const dy = hy - srcY;
          const d = Math.max(1, Math.hypot(dx, dy));
          f = shape(d / rad) * amp;
          if (f > 0) {
            const mag = attract ? Math.min(push * f, d * 0.5) : push * f;
            const s = attract ? -1 : 1;
            gxT = (dx / d) * mag * s;
            gyT = (dy / d) * mag * s;
          }
          if (d < nearD && f > 0.05) { nearD = d; near = i; }
        }
        const k = reduced ? 1 : stiff;
        if (reduced) { st.x = gxT; st.y = gyT; st.vx = 0; st.vy = 0; }
        else {
          st.vx += (gxT - st.x) * k * dt;
          st.vy += (gyT - st.y) * k * dt;
          const dm = Math.pow(damp, dt);
          st.vx *= dm; st.vy *= dm;
          st.x += st.vx * dt; st.y += st.vy * dt;
        }
        const disp = Math.hypot(st.x, st.y);
        if (disp > maxD) maxD = disp;
        const tilt = Math.max(-rotDeg, Math.min(rotDeg, (st.x / (push || 1)) * rotDeg * 0.9 + st.vx * 0.35));
        st.r += (tilt - st.r) * Math.min(1, 0.3 * dt);
        const e = Math.min(1, disp / (push || 1));
        const wT = weightShift ? wRest + (Math.min(600, wRest + 170) - wRest) * e : wRest;
        st.w += (wT - st.w) * Math.min(1, 0.2 * dt);
        el.style.transform = `translate3d(${st.x.toFixed(2)}px, ${st.y.toFixed(2)}px, 0) rotate(${st.r.toFixed(2)}deg)`;
        el.style.fontVariationSettings = `'wght' ${st.w.toFixed(0)}, 'wdth' 100, 'opsz' ${Math.min(144, Math.round(fontPx * 0.75))}`;
      }
      for (let i = 0; i < n; i++) {
        const st = states.current[i];
        const el = letterRefs.current[i];
        if (!st || !el) continue;
        const want = i === near ? Math.min(1, Math.hypot(st.x, st.y) / (push * 0.55 || 1)) : 0;
        st.c += (want - st.c) * Math.min(1, 0.15 * dt);
        el.style.color = st.c > 0.02 ? `color-mix(in srgb, ${accent} ${Math.round(st.c * 100)}%, ${ink})` : ink;
      }
      if (ringRef.current) {
        ringRef.current.style.opacity = P ? '1' : '0';
        ringRef.current.style.transform = `translate(${(srcX - rad).toFixed(1)}px, ${(srcY - rad).toFixed(1)}px)`;
      }
      if (R.disp) {
        R.disp.textContent = maxD.toFixed(1).padStart(5, '0');
        R.src.textContent = P ? 'Pointer' : (ghostMix > 0.5 ? 'Ghost' : 'Rest');
        R.cell.textContent = near >= 0 ? `${String(near + 1).padStart(2, '0')} ${flat[near].ch === ' ' ? '·' : flat[near].ch}` : '— —';
        if (R.bar) R.bar.style.transform = `scaleX(${Math.min(1, maxD / (push || 1)).toFixed(3)})`;
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
  }, [flat, fontPx, strength, rad, stiff, damp, rotDeg, weightShift, wRest, idleGhost, ghostSpeed, accent, ink, reduced]);

  const toLocal = (e) => {
    const root = rootRef.current;
    if (!root) return null;
    const r = root.getBoundingClientRect();
    const sc = r.width / (root.offsetWidth || r.width) || 1;
    return { x: (e.clientX - r.left) / sc, y: (e.clientY - r.top) / sc };
  };
  const onMove = (e) => { pointer.current = toLocal(e); lastMove.current = performance.now(); };
  const onLeave = () => { pointer.current = null; lastMove.current = performance.now(); };

  const mono = '"JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace';
  const flex = '"Roboto Flex", "Roboto", -apple-system, "Helvetica Neue", Arial, sans-serif';
  const p = uid;
  const label = { fontFamily: mono, fontSize: compact ? 10 : 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: muted };
  let gi = 0;

  return (
    <section
      ref={rootRef}
      className={`magnetic-letters ${p}`}
      onPointerMove={onMove}
      onPointerDown={onMove}
      onPointerLeave={onLeave}
      style={{ position: 'relative', width: '100%', height: H, overflow: 'hidden', background: bg, color: ink, fontFamily: flex, cursor: 'crosshair', touchAction: 'pan-y', userSelect: 'none', WebkitUserSelect: 'none' }}
    >
      <style>{`
        @keyframes ${p}-in { from { opacity: 0; transform: translateY(0.18em) scale(.96); } to { opacity: 1; transform: none; } }
        .${p} .${p}-tg { all: unset; cursor: pointer; padding: 7px 12px; border-radius: 999px; transition: color .3s, background-color .3s; }
        .${p} .${p}-tg:focus-visible { outline: 1px solid ${accent}; outline-offset: 2px; }
        @media (prefers-reduced-motion: reduce) { .${p} * { animation: none !important; transition: none !important; } }
      `}</style>

      <div style={{ position: 'absolute', top: pad, left: pad, right: pad, display: 'flex', justifyContent: 'space-between', gap: 20, pointerEvents: 'none', ...label }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 6, height: 6, background: accent, borderRadius: '50%', flexShrink: 0 }} />{eyebrow}
        </span>
        {!compact && <span>{sideLabel}</span>}
      </div>

      {showRing && (
        <div ref={ringRef} aria-hidden="true" style={{ position: 'absolute', left: 0, top: 0, width: rad * 2, height: rad * 2, borderRadius: '50%', border: `1px dashed color-mix(in srgb, ${accent} 70%, transparent)`, opacity: 0, transition: 'opacity .45s', pointerEvents: 'none', boxSizing: 'border-box' }}>
          <div style={{ position: 'absolute', left: '50%', top: '50%', width: 6, height: 6, margin: -3, borderRadius: '50%', background: accent }} />
          <div style={{ position: 'absolute', left: '50%', top: -20, transform: 'translateX(-50%)', fontFamily: mono, fontSize: 10, letterSpacing: '0.14em', color: accent, textTransform: 'uppercase' }}>{mode} · r{Math.round(rad)}</div>
        </div>
      )}

      <div style={{ position: 'absolute', left: pad, right: pad, top: topZone, bottom: bottomZone, display: 'flex', alignItems: 'center', justifyContent: align === 'center' ? 'center' : 'flex-start', pointerEvents: 'none' }}>
        <h2
          ref={blockRef}
          aria-label={lines.join(' ')}
          style={{ margin: 0, fontWeight: 'normal', fontSize: fontPx, lineHeight: lh, letterSpacing: `${tracking}em`, textAlign: align, maxWidth: '100%' }}
        >
          {lines.map((ln, li) => (
            <span key={li} aria-hidden="true" style={{ display: 'block', position: 'relative', whiteSpace: 'nowrap' }}>
              {showGrid && (
                <>
                  <span style={{ position: 'absolute', left: align === 'center' ? -2000 : -pad, right: -2000, top: '0.17em', height: 1, background: rule }} />
                  <span style={{ position: 'absolute', left: align === 'center' ? -2000 : -pad, right: -2000, bottom: '0.21em', height: 1, background: rule }} />
                </>
              )}
              {Array.from(ln).map((ch, ci, arr) => {
                const i = gi++;
                return (
                  <span key={ci} style={{ display: 'inline-block', position: 'relative', whiteSpace: 'pre', animation: reduced ? 'none' : `${p}-in 720ms cubic-bezier(.22,1,.36,1) ${i * 24}ms both` }}>
                    {showGrid && <span style={{ position: 'absolute', left: 0, top: '0.17em', bottom: '0.21em', borderLeft: `1px solid ${rule}` }} />}
                    {showGrid && ci === arr.length - 1 && <span style={{ position: 'absolute', right: 0, top: '0.17em', bottom: '0.21em', borderRight: `1px solid ${rule}` }} />}
                    {showIndex && !compact && ch !== ' ' && (
                      <span style={{ position: 'absolute', left: 6, top: 'calc(0.17em + 6px)', fontFamily: mono, fontSize: compact ? 8 : 10, letterSpacing: '0.06em', lineHeight: 1, color: muted, opacity: 0.8 }}>{String(i + 1).padStart(2, '0')}</span>
                    )}
                    <span ref={(el) => { letterRefs.current[i] = el; }} style={{ display: 'inline-block', position: 'relative', willChange: 'transform', fontVariationSettings: `'wght' ${wRest}, 'wdth' 100` }}>{ch}</span>
                  </span>
                );
              })}
            </span>
          ))}
        </h2>
      </div>

      <div style={{ position: 'absolute', left: pad, right: pad, bottom: pad, display: 'flex', flexDirection: compact ? 'column' : 'row', alignItems: compact ? 'stretch' : 'flex-end', justifyContent: 'space-between', gap: compact ? 16 : 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
          {showToggle && (
            <div role="group" aria-label="Force" style={{ display: 'inline-flex', border: `1px solid ${rule}`, borderRadius: 999, padding: 3, ...label, letterSpacing: '0.14em' }}>
              {['repel', 'attract'].map((m) => (
                <button key={m} type="button" className={`${p}-tg`} aria-pressed={mode === m} onClick={() => setMode(m)}
                  style={{ color: mode === m ? bg : muted, background: mode === m ? ink : 'transparent' }}>{m}</button>
              ))}
            </div>
          )}
          <span style={{ ...label, pointerEvents: 'none' }}>{hint}</span>
        </div>
        {showReadout && (
          <div aria-hidden="true" style={{ ...label, display: 'grid', gridTemplateColumns: 'auto auto auto', gap: compact ? 18 : 34, pointerEvents: 'none' }}>
            <div style={{ display: 'grid', gap: 6 }}>
              <span style={{ opacity: 0.7 }}>Source</span>
              <span ref={(el) => { ro.current.src = el; }} style={{ color: accent }}>Ghost</span>
            </div>
            <div style={{ display: 'grid', gap: 6 }}>
              <span style={{ opacity: 0.7 }}>Cell</span>
              <span ref={(el) => { ro.current.cell = el; }} style={{ color: ink }}>— —</span>
            </div>
            <div style={{ display: 'grid', gap: 6, minWidth: compact ? 96 : 130 }}>
              <span style={{ opacity: 0.7 }}>Δ max px</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span ref={(el) => { ro.current.disp = el; }} style={{ color: ink, fontVariantNumeric: 'tabular-nums' }}>000.0</span>
                <span style={{ flex: 1, height: 1, background: rule, position: 'relative', display: 'block' }}>
                  <span ref={(el) => { ro.current.bar = el; }} style={{ position: 'absolute', left: 0, top: -1, height: 3, width: '100%', background: accent, transformOrigin: 'left', transform: 'scaleX(0)', display: 'block' }} />
                </span>
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

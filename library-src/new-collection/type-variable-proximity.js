const MANIFEST = {
  "type": "Type.VariableProximity",
  "description": "A massive Roboto Flex headline whose letters respond to pointer proximity across weight, width and slant axes with a smooth falloff; an idle wave keeps it alive without a pointer, and a live readout shows the axis values under the cursor",
  "editorElement": {
    "selector": ".variable-proximity",
    "displayName": "Variable Proximity",
    "archetype": "container",
    "data": {
      "text": { "dataType": "text", "displayName": "Headline (use / for line breaks)", "defaultValue": "Type that / listens", "group": "Content" },
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Roboto Flex — Variable axes", "group": "Content" },
      "hint": { "dataType": "text", "displayName": "Hint", "defaultValue": "Move the pointer through the letters", "group": "Content" },
      "radius": { "dataType": "select", "displayName": "Falloff Radius (px)", "defaultValue": "260", "options": ["140", "200", "260", "340", "440"], "group": "Proximity" },
      "falloff": { "dataType": "select", "displayName": "Falloff Curve", "defaultValue": "smooth", "options": ["smooth", "linear", "sharp"], "group": "Proximity" },
      "response": { "dataType": "select", "displayName": "Response Speed", "defaultValue": "0.14", "options": ["0.06", "0.14", "0.24", "0.4"], "group": "Proximity" },
      "weightRest": { "dataType": "select", "displayName": "Weight at Rest", "defaultValue": "300", "options": ["300", "400", "500"], "group": "Axes" },
      "weightPeak": { "dataType": "select", "displayName": "Weight at Peak", "defaultValue": "900", "options": ["600", "700", "800", "900", "1000"], "group": "Axes" },
      "widthRest": { "dataType": "select", "displayName": "Width at Rest", "defaultValue": "100", "options": ["50", "75", "100", "115"], "group": "Axes" },
      "widthPeak": { "dataType": "select", "displayName": "Width at Peak", "defaultValue": "151", "options": ["25", "75", "125", "151"], "group": "Axes" },
      "slantPeak": { "dataType": "select", "displayName": "Slant at Peak", "defaultValue": "-10", "options": ["0", "-4", "-7", "-10"], "group": "Axes" },
      "opticalSize": { "dataType": "booleanValue", "displayName": "Auto Optical Size", "defaultValue": "true", "group": "Axes" },
      "idleWave": { "dataType": "booleanValue", "displayName": "Idle Wave", "defaultValue": "true", "group": "Animation" },
      "idleSpeed": { "dataType": "select", "displayName": "Idle Wave Speed", "defaultValue": "slow", "options": ["slow", "medium", "fast"], "group": "Animation" },
      "colorShift": { "dataType": "booleanValue", "displayName": "Tint Near Pointer", "defaultValue": "false", "group": "Animation" },
      "showReadout": { "dataType": "booleanValue", "displayName": "Axis Readout", "defaultValue": "true", "group": "Layout" },
      "showRing": { "dataType": "booleanValue", "displayName": "Radius Ring", "defaultValue": "true", "group": "Layout" },
      "showGuides": { "dataType": "booleanValue", "displayName": "Line Guides", "defaultValue": "true", "group": "Layout" },
      "align": { "dataType": "select", "displayName": "Alignment", "defaultValue": "left", "options": ["left", "center"], "group": "Layout" },
      "sizeScale": { "dataType": "select", "displayName": "Headline Scale", "defaultValue": "1", "options": ["0.8", "0.9", "1", "1.1"], "group": "Typography" },
      "lineHeight": { "dataType": "select", "displayName": "Line Height", "defaultValue": "0.92", "options": ["0.84", "0.92", "1", "1.1"], "group": "Typography" },
      "tracking": { "dataType": "select", "displayName": "Tracking (em)", "defaultValue": "-0.02", "options": ["-0.04", "-0.02", "0", "0.02"], "group": "Typography" },
      "height": { "dataType": "select", "displayName": "Height", "defaultValue": "screen", "options": ["screen", "560", "680", "800"], "group": "Layout" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#0C0C0D", "group": "Colors" },
      "inkColor": { "dataType": "color", "displayName": "Ink", "defaultValue": "#FAFAF9", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#78716C", "group": "Colors" },
      "ruleColor": { "dataType": "color", "displayName": "Guides", "defaultValue": "#292524", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent", "defaultValue": "#FF6A3D", "group": "Colors" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const text = config?.text || 'Type that / listens';
  const eyebrow = config?.eyebrow || 'Roboto Flex — Variable axes';
  const hint = config?.hint || 'Move the pointer through the letters';
  const radius = parseFloat(config?.radius || '260') || 260;
  const falloff = config?.falloff || 'smooth';
  const response = parseFloat(config?.response || '0.14') || 0.14;
  const wRest = parseFloat(config?.weightRest || '300') || 300;
  const wPeak = parseFloat(config?.weightPeak || '900') || 900;
  const dRest = parseFloat(config?.widthRest || '100') || 100;
  const dPeak = parseFloat(config?.widthPeak || '151') || 151;
  const sPeak = parseFloat(config?.slantPeak || '-10') || 0;
  const autoOpsz = bool(config?.opticalSize, true);
  const idleWave = bool(config?.idleWave, true);
  const idleSpeed = { slow: 0.00011, medium: 0.00018, fast: 0.0003 }[config?.idleSpeed || 'slow'] || 0.00011;
  const colorShift = bool(config?.colorShift, false);
  const showReadout = bool(config?.showReadout, true);
  const showRing = bool(config?.showRing, true);
  const showGuides = bool(config?.showGuides, true);
  const align = config?.align || 'left';
  const sizeScale = parseFloat(config?.sizeScale || '1') || 1;
  const lineHeight = parseFloat(config?.lineHeight || '0.92') || 0.92;
  const tracking = parseFloat(config?.tracking || '-0.02') || 0;
  const heightMode = config?.height || 'screen';
  const bg = config?.backgroundColor || '#0C0C0D';
  const ink = config?.inkColor || '#FAFAF9';
  const muted = config?.mutedColor || '#78716C';
  const rule = config?.ruleColor || '#292524';
  const accent = config?.accentColor || '#FF6A3D';

  const uid = React.useMemo(() => 'vp' + Math.random().toString(36).slice(2, 9), []);
  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  const rootRef = React.useRef(null);
  const letterRefs = React.useRef([]);
  const ringRef = React.useRef(null);
  const ro = React.useRef({});
  const pointer = React.useRef(null);
  const lastMove = React.useRef(0);
  const vals = React.useRef([]);
  const [width, setWidth] = React.useState(1280);
  const [stageH, setStageH] = React.useState(760);

  React.useEffect(() => {
    const id = 'gf-roboto-flex-axes';
    if (document.getElementById(id)) return;
    const l = document.createElement('link');
    l.id = id; l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,slnt,wdth,wght@8..144,-10..0,25..151,100..1000&family=IBM+Plex+Mono:wght@400&display=swap';
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
  const H = heightMode === 'screen' ? Math.max(compact ? 620 : 540, Math.min(stageH, 1000)) : parseInt(heightMode, 10) || 680;
  const pad = compact ? 20 : 56;
  const maxChars = Math.max(...lines.map((l) => l.length), 1);
  const topZone = pad + 44;
  const bottomZone = showReadout ? pad + (compact ? 150 : 150) : pad + 50;
  const fontPx = Math.round(Math.min(
    ((width - pad * 2) * (compact ? 0.98 : 0.86)) / (maxChars * 0.47),
    (H - topZone - bottomZone - 20) / (lines.length * lineHeight)
  ) * sizeScale);
  const rad = compact ? radius * 0.62 : radius;

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    let raf = 0;
    let visible = true;
    const n = flat.length;
    vals.current = Array.from({ length: n }, (_, i) => vals.current[i] || { w: wRest, d: dRest, s: 0, f: 0 });
    const shape = (t) => {
      if (t >= 1) return 0;
      if (falloff === 'linear') return 1 - t;
      if (falloff === 'sharp') return Math.pow(1 - t, 3);
      return 0.5 + 0.5 * Math.cos(Math.PI * t);
    };
    const t0 = performance.now();
    let idleMix = idleWave ? 1 : 0;
    const R = ro.current;

    const frame = (now) => {
      const rr = root.getBoundingClientRect();
      const scale = rr.width / (root.offsetWidth || rr.width) || 1;
      const centers = letterRefs.current.slice(0, n).map((el) => {
        if (!el) return null;
        const b = el.getBoundingClientRect();
        return { x: (b.left + b.width / 2 - rr.left) / scale, y: (b.top + b.height / 2 - rr.top) / scale };
      });
      const P = pointer.current;
      const wantIdle = idleWave && (!P || now - lastMove.current > 2600);
      idleMix += ((wantIdle ? 1 : 0) - idleMix) * 0.03;
      const t = (now - t0) * idleSpeed;
      const cW = root.offsetWidth || 1;
      let best = -1; let bestF = -1;
      for (let i = 0; i < n; i++) {
        const c = centers[i];
        if (!c) continue;
        let fp = 0;
        if (P) {
          const dx = (c.x - P.x) / 1.15;
          const dy = c.y - P.y;
          fp = shape(Math.hypot(dx, dy) / rad);
        }
        let fw = 0;
        if (idleWave) {
          const nx = c.x / cW;
          const phase = ((t + 0.42) % 1.7) - 0.35 - flat[i].li * 0.07;
          fw = Math.exp(-Math.pow((nx - phase) / 0.15, 2)) * 0.95 + 0.06 * (0.5 + 0.5 * Math.sin(t * 9 + nx * 6));
        }
        const f = Math.max(0, Math.min(1, fp * (1 - idleMix) + fw * idleMix));
        const v = vals.current[i];
        const k = reduced ? 1 : response;
        v.f += (f - v.f) * k;
        const e = v.f;
        v.w = wRest + (wPeak - wRest) * e;
        v.d = dRest + (dPeak - dRest) * e;
        v.s = sPeak * e;
        const el = letterRefs.current[i];
        if (el) {
          const opsz = autoOpsz ? Math.min(144, Math.max(8, fontPx * 0.75)) : 14;
          el.style.fontVariationSettings = `'wght' ${v.w.toFixed(1)}, 'wdth' ${v.d.toFixed(1)}, 'slnt' ${v.s.toFixed(2)}, 'opsz' ${opsz.toFixed(0)}`;
          if (colorShift) el.style.color = e > 0.02 ? `color-mix(in srgb, ${accent} ${Math.round(e * 100)}%, ${ink})` : ink;
        }
        let score = P && idleMix < 0.5 ? (c ? -Math.hypot(c.x - P.x, c.y - P.y) : -1e9) : e;
        if (score > bestF || best < 0) { bestF = score; best = i; }
      }
      if (ringRef.current) {
        const show = P && idleMix < 0.5;
        ringRef.current.style.opacity = show ? '1' : '0';
        if (P) ringRef.current.style.transform = `translate(${P.x - rad}px, ${P.y - rad}px)`;
      }
      if (best >= 0 && R.glyph) {
        const v = vals.current[best];
        const ch = flat[best].ch === ' ' ? '·' : flat[best].ch;
        R.glyph.textContent = ch;
        R.glyph.style.fontVariationSettings = `'wght' ${v.w.toFixed(0)}, 'wdth' ${v.d.toFixed(0)}, 'slnt' ${v.s.toFixed(1)}`;
        R.wght.textContent = Math.round(v.w);
        R.wdth.textContent = Math.round(v.d);
        R.slnt.textContent = v.s.toFixed(1);
        R.wghtBar.style.transform = `scaleX(${(v.w - 100) / 900})`;
        R.wdthBar.style.transform = `scaleX(${(v.d - 25) / 126})`;
        R.slntBar.style.transform = `scaleX(${Math.abs(v.s) / 10})`;
        R.idx.textContent = `${String(best + 1).padStart(2, '0')} / ${String(n).padStart(2, '0')}`;
        R.mode.textContent = P && idleMix < 0.5 ? 'Pointer' : 'Idle wave';
      }
      if (reduced && !P) { raf = 0; return; }
      raf = visible ? requestAnimationFrame(frame) : 0;
    };
    const io = typeof IntersectionObserver !== 'undefined' ? new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(frame);
    }) : null;
    if (io) io.observe(root);
    raf = requestAnimationFrame(frame);
    R.kick = () => { if (!raf && visible) raf = requestAnimationFrame(frame); };
    return () => { cancelAnimationFrame(raf); if (io) io.disconnect(); R.kick = null; };
  }, [flat, wRest, wPeak, dRest, dPeak, sPeak, rad, falloff, response, idleWave, idleSpeed, autoOpsz, fontPx, colorShift, accent, ink, reduced]);

  const onMove = (e) => {
    const root = rootRef.current;
    if (!root) return;
    const r = root.getBoundingClientRect();
    const sc = r.width / (root.offsetWidth || r.width) || 1;
    pointer.current = { x: (e.clientX - r.left) / sc, y: (e.clientY - r.top) / sc };
    lastMove.current = performance.now();
    if (ro.current.kick) ro.current.kick();
  };
  const onLeave = () => { pointer.current = null; if (ro.current.kick) ro.current.kick(); };

  const mono = '"IBM Plex Mono", ui-monospace, "SF Mono", Menlo, monospace';
  const flex = '"Roboto Flex", "Roboto", -apple-system, "Helvetica Neue", Arial, sans-serif';
  const restFVS = `'wght' ${wRest}, 'wdth' ${dRest}, 'slnt' 0`;
  const p = uid;
  let gi = 0;

  const Bar = ({ label, refKey, barKey, range }) => (
    <div style={{ display: 'grid', gridTemplateColumns: '38px 1fr 44px', alignItems: 'center', gap: 12 }}>
      <span style={{ color: muted }}>{label}</span>
      <span style={{ position: 'relative', height: 1, background: rule, display: 'block' }}>
        <span ref={(el) => { ro.current[barKey] = el; }} style={{ position: 'absolute', left: 0, top: -1, height: 3, width: '100%', background: accent, transformOrigin: 'left', transform: 'scaleX(0.2)', display: 'block' }} />
        <span style={{ position: 'absolute', left: 0, top: 8, fontSize: 9, color: muted, opacity: 0.7 }}>{range[0]}</span>
        <span style={{ position: 'absolute', right: 0, top: 8, fontSize: 9, color: muted, opacity: 0.7 }}>{range[1]}</span>
      </span>
      <span ref={(el) => { ro.current[refKey] = el; }} style={{ textAlign: 'right', color: ink, fontVariantNumeric: 'tabular-nums' }}>—</span>
    </div>
  );

  return (
    <section
      ref={rootRef}
      className={`variable-proximity ${p}`}
      onPointerMove={onMove}
      onPointerDown={onMove}
      onPointerLeave={onLeave}
      style={{ position: 'relative', width: '100%', height: H, overflow: 'hidden', background: bg, color: ink, fontFamily: flex, cursor: 'crosshair', touchAction: 'pan-y' }}
    >
      <style>{`
        @keyframes ${p}-in { from { opacity: 0; transform: translateY(0.12em); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: reduce) { .${p} * { animation: none !important; transition: none !important; } }
      `}</style>

      <div style={{ position: 'absolute', top: pad, left: pad, right: pad, display: 'flex', justifyContent: 'space-between', gap: 20, fontFamily: mono, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: muted, pointerEvents: 'none' }}>
        <span>{eyebrow}</span>
        {!compact && <span>wght {wRest} → {wPeak} · wdth {dRest} → {dPeak} · slnt 0 → {String(sPeak).replace('-', '−')}</span>}
      </div>

      {showRing && (
        <div ref={ringRef} aria-hidden="true" style={{ position: 'absolute', left: 0, top: 0, width: rad * 2, height: rad * 2, borderRadius: '50%', border: `1px solid ${accent}`, opacity: 0, transition: 'opacity .4s', pointerEvents: 'none', boxSizing: 'border-box' }}>
          <div style={{ position: 'absolute', left: '50%', top: '50%', width: 5, height: 5, margin: -2.5, borderRadius: '50%', background: accent }} />
          <div style={{ position: 'absolute', left: '50%', top: -18, transform: 'translateX(-50%)', fontFamily: mono, fontSize: 10, letterSpacing: '0.12em', color: accent }}>r {Math.round(rad)}</div>
        </div>
      )}

      <div style={{ position: 'absolute', left: pad, right: pad, top: topZone, bottom: bottomZone, display: 'flex', alignItems: 'center', pointerEvents: 'none' }}>
      <h2
        aria-label={lines.join(' ')}
        style={{
          width: '100%', margin: 0, fontWeight: 'normal', fontSize: fontPx, lineHeight, letterSpacing: `${tracking}em`,
          textAlign: align, pointerEvents: 'none'
        }}
      >
        {lines.map((ln, li) => (
          <span key={li} aria-hidden="true" style={{ display: 'block', position: 'relative', whiteSpace: 'nowrap' }}>
            {showGuides && (
              <>
                <span style={{ position: 'absolute', left: -pad, right: -pad, top: '0.16em', height: 1, background: rule }} />
                <span style={{ position: 'absolute', left: -pad, right: -pad, bottom: '0.12em', height: 1, background: rule }} />
              </>
            )}
            {Array.from(ln).map((ch, ci) => {
              const i = gi++;
              return (
                <span key={ci}
                  ref={(el) => { letterRefs.current[i] = el; }}
                  style={{
                    display: 'inline-block', position: 'relative', whiteSpace: 'pre', fontVariationSettings: restFVS,
                    animation: reduced ? 'none' : `${p}-in 900ms cubic-bezier(.22,1,.36,1) ${i * 28}ms both`
                  }}>{ch}</span>
              );
            })}
          </span>
        ))}
      </h2>
      </div>

      {!(compact && showReadout) && <div style={{ position: 'absolute', left: pad, bottom: pad, fontFamily: mono, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: muted, display: 'flex', alignItems: 'center', gap: 12, pointerEvents: 'none', maxWidth: compact ? 'calc(100% - 40px)' : 360 }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', border: `1px solid ${accent}`, flexShrink: 0 }} />
        {hint}
      </div>}

      {showReadout && (
        <div aria-hidden="true" style={{
          position: 'absolute', right: pad, bottom: pad, width: compact ? `calc(100% - ${pad * 2}px)` : 340,
          ...(compact ? { bottom: pad + 0 } : {}),
          border: `1px solid ${rule}`, background: `color-mix(in srgb, ${bg} 82%, transparent)`, backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
          display: 'grid', gridTemplateColumns: compact ? '84px 1fr' : '104px 1fr', fontFamily: mono, fontSize: 11, letterSpacing: '0.06em', pointerEvents: 'none'
        }}>
          <div style={{ borderRight: `1px solid ${rule}`, display: 'grid', placeItems: 'center', position: 'relative', padding: '10px 0' }}>
            <span ref={(el) => { ro.current.glyph = el; }} style={{ fontFamily: flex, fontSize: compact ? 54 : 68, lineHeight: 1, color: ink, fontVariationSettings: restFVS }}>{flat[0] ? flat[0].ch : 'A'}</span>
            <span ref={(el) => { ro.current.idx = el; }} style={{ position: 'absolute', left: 8, top: 7, fontSize: 9, color: muted }}>01</span>
          </div>
          <div style={{ padding: compact ? '12px 14px 18px' : '14px 18px 20px', display: 'grid', gap: compact ? 14 : 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: muted }}>
              <span>Axis readout</span>
              <span ref={(el) => { ro.current.mode = el; }} style={{ color: accent }}>Idle wave</span>
            </div>
            <Bar label="wght" refKey="wght" barKey="wghtBar" range={['100', '1000']} />
            <Bar label="wdth" refKey="wdth" barKey="wdthBar" range={['25', '151']} />
            <Bar label="slnt" refKey="slnt" barKey="slntBar" range={['0', '-10']} />
          </div>
        </div>
      )}
    </section>
  );
}

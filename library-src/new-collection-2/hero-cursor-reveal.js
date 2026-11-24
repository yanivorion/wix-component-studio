const MANIFEST = {
  "type": "Hero.CursorReveal",
  "description": "Full-bleed photo hero where the pointer carries a soft, speed-reactive circular lens revealing a second treatment underneath, trailed by smaller echo circles; click floods the reveal outward from the click point. Drifts on a slow lissajous path when idle",
  "editorElement": {
    "selector": ".hero-cursor-reveal",
    "displayName": "Cursor Reveal",
    "archetype": "container",
    "data": {
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Nordlys Lodge — Lysefjord", "group": "Content" },
      "headline": { "dataType": "text", "displayName": "Headline (use | for line break)", "defaultValue": "See the fjord|in full colour", "group": "Content" },
      "subline": { "dataType": "text", "displayName": "Subline", "defaultValue": "Twelve rooms carved into the cliff, four hundred metres above the water.", "group": "Content" },
      "ctaLabel": { "dataType": "text", "displayName": "Button Label", "defaultValue": "Book a stay", "group": "Content" },
      "hintText": { "dataType": "text", "displayName": "Hint", "defaultValue": "Move to reveal — click to open", "group": "Content" },
      "baseLabel": { "dataType": "text", "displayName": "Base Layer Label", "defaultValue": "Monochrome", "group": "Content" },
      "revealLabel": { "dataType": "text", "displayName": "Reveal Layer Label", "defaultValue": "Colour", "group": "Content" },
      "baseImage": { "dataType": "text", "displayName": "Base Image URL", "defaultValue": "https://picsum.photos/id/1015/1920/1200", "group": "Images" },
      "revealImage": { "dataType": "text", "displayName": "Reveal Image URL (two-image mode)", "defaultValue": "https://picsum.photos/id/1015/1920/1200", "group": "Images" },
      "revealMode": { "dataType": "select", "displayName": "Reveal Mode", "defaultValue": "grayscale", "options": ["grayscale", "dim", "blur", "two-image"], "group": "Images", "description": "Single-image modes treat the base photo and reveal the original; two-image reveals the second URL" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#0C0C0D", "group": "Colors" },
      "textColor": { "dataType": "color", "displayName": "Text", "defaultValue": "#FAFAF9", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#D6D3D1", "group": "Colors" },
      "ringColor": { "dataType": "color", "displayName": "Lens Ring", "defaultValue": "#FAFAF9", "group": "Colors" },
      "displayFont": { "dataType": "select", "displayName": "Display Font", "defaultValue": "Instrument Serif", "options": ["Instrument Serif", "Fraunces", "Inter Tight", "system-ui"], "group": "Typography" },
      "headlineSize": { "dataType": "select", "displayName": "Headline Size (px)", "defaultValue": "144", "options": ["96", "120", "144", "168", "192"], "group": "Typography" },
      "headlineWeight": { "dataType": "select", "displayName": "Headline Weight", "defaultValue": "400", "options": ["300", "400", "500"], "group": "Typography" },
      "textPosition": { "dataType": "select", "displayName": "Text Position", "defaultValue": "bottom-left", "options": ["bottom-left", "center"], "group": "Layout" },
      "height": { "dataType": "select", "displayName": "Height", "defaultValue": "screen", "options": ["screen", "640", "720", "800"], "group": "Layout" },
      "scrim": { "dataType": "select", "displayName": "Legibility Scrim", "defaultValue": "medium", "options": ["none", "light", "medium", "strong"], "group": "Layout" },
      "showRing": { "dataType": "booleanValue", "displayName": "Lens Ring", "defaultValue": "true", "group": "Layout" },
      "showLabels": { "dataType": "booleanValue", "displayName": "Layer Labels", "defaultValue": "true", "group": "Layout" },
      "lensSize": { "dataType": "select", "displayName": "Lens Radius (px)", "defaultValue": "170", "options": ["110", "140", "170", "210", "260"], "group": "Lens" },
      "softness": { "dataType": "select", "displayName": "Edge Softness", "defaultValue": "medium", "options": ["crisp", "medium", "soft"], "group": "Lens" },
      "speedReaction": { "dataType": "select", "displayName": "Speed Reaction", "defaultValue": "medium", "options": ["none", "subtle", "medium", "strong"], "group": "Lens" },
      "trailCount": { "dataType": "select", "displayName": "Trailing Circles", "defaultValue": "4", "options": ["0", "3", "4", "5"], "group": "Lens" },
      "follow": { "dataType": "select", "displayName": "Follow Lag", "defaultValue": "medium", "options": ["tight", "medium", "floaty"], "group": "Lens" },
      "idleDrift": { "dataType": "booleanValue", "displayName": "Idle Drift", "defaultValue": "true", "group": "Animation" },
      "clickReveal": { "dataType": "booleanValue", "displayName": "Click To Reveal All", "defaultValue": "true", "group": "Animation" },
      "revealDuration": { "dataType": "select", "displayName": "Full Reveal Duration (ms)", "defaultValue": "1100", "options": ["700", "1100", "1500"], "group": "Animation" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const eyebrow = config?.eyebrow || 'Nordlys Lodge — Lysefjord';
  const headline = config?.headline || 'See the fjord|in full colour';
  const subline = config?.subline || 'Twelve rooms carved into the cliff, four hundred metres above the water.';
  const ctaLabel = config?.ctaLabel || 'Book a stay';
  const hintText = config?.hintText || 'Move to reveal — click to open';
  const baseLabel = config?.baseLabel || 'Monochrome';
  const revealLabel = config?.revealLabel || 'Colour';
  const baseImage = config?.baseImage || 'https://picsum.photos/id/1015/1920/1200';
  const mode = config?.revealMode || 'grayscale';
  const revealImage = mode === 'two-image' ? (config?.revealImage || baseImage) : baseImage;
  const bg = config?.backgroundColor || '#0C0C0D';
  const text = config?.textColor || '#FAFAF9';
  const muted = config?.mutedColor || '#D6D3D1';
  const ringColor = config?.ringColor || '#FAFAF9';
  const displayFont = config?.displayFont || 'Instrument Serif';
  const headlineSize = parseInt(config?.headlineSize || '144', 10) || 144;
  const headlineWeight = config?.headlineWeight || '400';
  const textPosition = config?.textPosition || 'bottom-left';
  const heightMode = config?.height || 'screen';
  const scrimA = { none: 0, light: 0.3, medium: 0.5, strong: 0.7 }[config?.scrim || 'medium'] ?? 0.5;
  const showRing = bool(config?.showRing, true);
  const showLabels = bool(config?.showLabels, true);
  const lensR = parseInt(config?.lensSize || '170', 10) || 170;
  const soft = { crisp: 0.08, medium: 0.32, soft: 0.6 }[config?.softness || 'medium'] ?? 0.32;
  const speedK = { none: 0, subtle: 0.25, medium: 0.5, strong: 0.9 }[config?.speedReaction || 'medium'] ?? 0.5;
  const trailCount = Math.max(0, Math.min(5, parseInt(config?.trailCount || '4', 10)));
  const followK = { tight: 0.28, medium: 0.14, floaty: 0.07 }[config?.follow || 'medium'] || 0.14;
  const idleDrift = bool(config?.idleDrift, true);
  const clickReveal = bool(config?.clickReveal, true);
  const revealDur = parseInt(config?.revealDuration || '1100', 10) || 1100;

  const uid = React.useMemo(() => 'cr' + Math.random().toString(36).slice(2, 9), []);
  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  const rootRef = React.useRef(null);
  const revealRef = React.useRef(null);
  const ringRef = React.useRef(null);
  const sim = React.useRef(null);
  const [width, setWidth] = React.useState(1280);
  const [stageH, setStageH] = React.useState(720);
  const [isFull, setIsFull] = React.useState(false);
  const [touched, setTouched] = React.useState(false);

  React.useEffect(() => {
    const families = { 'Instrument Serif': 'Instrument+Serif:ital@0;1', 'Fraunces': 'Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500', 'Inter Tight': 'Inter+Tight:wght@300;400;500' };
    [families[displayFont], 'Inter:wght@300;400;500'].filter(Boolean).forEach((f) => {
      const id = 'gf-' + f.replace(/[^a-z0-9]/gi, '').slice(0, 40);
      if (document.getElementById(id)) return;
      const l = document.createElement('link');
      l.id = id; l.rel = 'stylesheet';
      l.href = `https://fonts.googleapis.com/css2?family=${f}&display=swap`;
      document.head.appendChild(l);
    });
  }, [displayFont]);

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
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (ro) ro.observe(el);
    window.addEventListener('resize', measure);
    return () => { if (ro) ro.disconnect(); window.removeEventListener('resize', measure); };
  }, []);

  const compact = width < 760;
  const H = heightMode === 'screen' ? Math.max(compact ? 600 : 560, stageH) : parseInt(heightMode, 10) || 720;
  const baseRadius = compact ? Math.round(lensR * 0.72) : lensR;

  React.useEffect(() => {
    const root = rootRef.current;
    const layer = revealRef.current;
    if (!root || !layer) return undefined;
    const W0 = () => root.clientWidth || 1;
    const H0 = () => root.clientHeight || 1;
    const t0 = performance.now();
    const liss = (t) => ({
      x: W0() * (0.62 + 0.24 * Math.sin(t * 0.00058)),
      y: H0() * (0.44 + 0.2 * Math.sin(t * 0.00083 + 1.1))
    });
    const start = reduced ? { x: W0() * 0.66, y: H0() * 0.42 } : liss(t0);
    const st = {
      target: { ...start }, pos: { ...start }, prev: { ...start }, r: baseRadius, spd: 0,
      trails: Array.from({ length: trailCount }, () => ({ ...start })),
      lastPointer: -1e9, inside: false, full: 0, fullFrom: 0, fullTo: 0, fullStart: 0, origin: { ...start }, visible: true
    };
    sim.current = st;
    let raf = 0;
    const easeIO = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const fmt = (n) => n.toFixed(1);
    const circle = (x, y, r, sft) => `radial-gradient(circle ${fmt(Math.max(0.1, r))}px at ${fmt(x)}px ${fmt(y)}px, #000 ${fmt(Math.max(0, r * (1 - sft)))}px, rgba(0,0,0,0) ${fmt(Math.max(0.1, r))}px)`;
    const radii = [0.5, 0.38, 0.29, 0.22, 0.16];
    const frame = (now) => {
      const w = W0(); const h = H0();
      const idle = now - st.lastPointer > 1800;
      if (idle && idleDrift && !reduced) st.target = liss(now);
      const k = reduced ? 1 : followK;
      st.prev = { ...st.pos };
      st.pos.x += (st.target.x - st.pos.x) * k;
      st.pos.y += (st.target.y - st.pos.y) * k;
      const v = Math.hypot(st.pos.x - st.prev.x, st.pos.y - st.prev.y);
      st.spd += (v - st.spd) * 0.12;
      const rT = baseRadius * (1 + Math.min(1, st.spd / 26) * speedK);
      st.r += (rT - st.r) * 0.1;
      let prevPt = st.pos;
      st.trails.forEach((tp, i) => {
        const kk = reduced ? 1 : 0.16 - i * 0.012;
        tp.x += (prevPt.x - tp.x) * kk;
        tp.y += (prevPt.y - tp.y) * kk;
        prevPt = tp;
      });
      if (st.fullStart) {
        const p = reduced ? 1 : Math.min(1, (now - st.fullStart) / revealDur);
        st.full = st.fullFrom + (st.fullTo - st.fullFrom) * easeIO(p);
        if (p >= 1) st.fullStart = 0;
      }
      const maxR = Math.hypot(Math.max(st.origin.x, w - st.origin.x), Math.max(st.origin.y, h - st.origin.y)) + 40;
      let mask;
      if (st.full >= 0.999) mask = 'none';
      else {
        const layers = [circle(st.pos.x, st.pos.y, st.r, soft)];
        st.trails.forEach((tp, i) => layers.push(circle(tp.x, tp.y, baseRadius * radii[i], Math.min(0.85, soft + 0.15))));
        if (st.full > 0.001) layers.push(circle(st.origin.x, st.origin.y, st.full * maxR, 0.04));
        mask = layers.join(', ');
      }
      layer.style.webkitMaskImage = mask;
      layer.style.maskImage = mask;
      if (ringRef.current) {
        const rr = st.r * (1 - soft * 0.35);
        ringRef.current.style.transform = `translate(${fmt(st.pos.x - rr)}px, ${fmt(st.pos.y - rr)}px)`;
        ringRef.current.style.width = ringRef.current.style.height = `${fmt(rr * 2)}px`;
        ringRef.current.style.opacity = String(Math.max(0, 1 - st.full * 3) * (idle ? 0.35 : 0.6));
      }
      const settled = st.fullStart === 0 && (!idleDrift || reduced) && v < 0.02 && Math.abs(rT - st.r) < 0.05
        && st.trails.every((tp) => Math.abs(tp.x - st.pos.x) + Math.abs(tp.y - st.pos.y) < 0.2);
      raf = st.visible && !settled ? requestAnimationFrame(frame) : 0;
    };
    st.kick = () => { if (!raf && st.visible) raf = requestAnimationFrame(frame); };
    raf = requestAnimationFrame(frame);
    const io = typeof IntersectionObserver !== 'undefined' ? new IntersectionObserver(([e]) => {
      st.visible = e.isIntersecting;
      if (st.visible) st.kick(); else { cancelAnimationFrame(raf); raf = 0; }
    }) : null;
    if (io) io.observe(root);
    const onVis = () => { st.visible = !document.hidden; if (st.visible) st.kick(); };
    document.addEventListener('visibilitychange', onVis);
    return () => {
      cancelAnimationFrame(raf);
      if (io) io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [baseRadius, trailCount, followK, soft, speedK, idleDrift, reduced, revealDur]);

  const localPoint = (e) => {
    const root = rootRef.current;
    const r = root.getBoundingClientRect();
    const sx = root.offsetWidth / (r.width || 1);
    const sy = root.offsetHeight / (r.height || 1);
    return { x: (e.clientX - r.left) * sx, y: (e.clientY - r.top) * sy };
  };
  const onMove = (e) => {
    const st = sim.current;
    if (!st) return;
    st.target = localPoint(e);
    st.lastPointer = performance.now();
    if (!touched) setTouched(true);
    st.kick();
  };
  const toggleFull = (pt) => {
    const st = sim.current;
    if (!st || !clickReveal) return;
    const next = st.fullTo > 0.5 ? 0 : 1;
    st.origin = pt;
    st.fullFrom = st.full;
    st.fullTo = next;
    st.fullStart = performance.now();
    setIsFull(next === 1);
    st.kick();
  };
  const onClick = (e) => {
    if (e.target.closest && e.target.closest('a,button')) return;
    toggleFull(localPoint(e));
  };
  const onKey = (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target === e.currentTarget) {
      e.preventDefault();
      const root = rootRef.current;
      toggleFull({ x: root.clientWidth / 2, y: root.clientHeight / 2 });
    }
  };

  const ease = 'cubic-bezier(0.22, 1, 0.36, 1)';
  const sans = '"Inter", -apple-system, "Helvetica Neue", Arial, sans-serif';
  const display = displayFont === 'system-ui' ? sans
    : displayFont === 'Inter Tight' ? '"Inter Tight", "Inter", -apple-system, sans-serif'
    : `"${displayFont}", "Iowan Old Style", Georgia, serif`;
  const serifish = displayFont === 'Instrument Serif' || displayFont === 'Fraunces';
  const baseFilter = mode === 'grayscale' ? 'grayscale(1) contrast(1.08) brightness(0.9)'
    : mode === 'dim' ? 'brightness(0.38) saturate(0.4) contrast(1.1)'
    : mode === 'blur' ? 'blur(18px) saturate(0.5) brightness(0.85)' : 'none';
  const p = uid;
  const pad = compact ? 20 : 48;
  const lines = headline.split('|').map((l) => l.trim()).filter(Boolean);
  const longest = Math.max(...lines.map((l) => l.length), 1);
  const hSize = Math.round(Math.min(headlineSize, (width - pad * 2) / (longest * (serifish ? 0.44 : 0.52)), H * 0.2));
  const centered = textPosition === 'center';
  const imgStyle = { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', userSelect: 'none', pointerEvents: 'none' };

  return (
    <section
      ref={rootRef}
      className={`hero-cursor-reveal ${p}`}
      role="region"
      aria-label={`${eyebrow}. ${lines.join(' ')}`}
      tabIndex={0}
      onPointerMove={onMove}
      onPointerDown={onMove}
      onClick={onClick}
      onKeyDown={onKey}
      style={{ position: 'relative', width: '100%', height: H, overflow: 'hidden', background: bg, color: text, fontFamily: sans, outline: 'none', cursor: clickReveal ? 'pointer' : 'default', touchAction: 'pan-y', userSelect: 'none', isolation: 'isolate' }}
    >
      <style>{`
        @keyframes ${p}-rise { from { transform: translateY(110%); } to { transform: translateY(0); } }
        @keyframes ${p}-fade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        @keyframes ${p}-in { from { transform: scale(1.12); } to { transform: scale(1); } }
        .${p}:focus-visible { box-shadow: inset 0 0 0 2px ${text}; }
        .${p} a:focus-visible, .${p} button:focus-visible { outline: 2px solid ${text}; outline-offset: 3px; }
        .${p} .${p}-cta { transition: background .35s, color .35s; }
        .${p} .${p}-cta:hover { background: ${text}; color: ${bg}; }
        @media (prefers-reduced-motion: reduce) { .${p} * { animation: none !important; transition: none !important; } }
      `}</style>

      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', animation: reduced ? 'none' : `${p}-in 2200ms ${ease} both` }}>
        <img src={baseImage} alt="" draggable="false" style={{ ...imgStyle, filter: baseFilter, transform: mode === 'blur' ? 'scale(1.08)' : 'none' }} />
      </div>
      <div ref={revealRef} aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', WebkitMaskImage: 'radial-gradient(circle 0px at 50% 50%, #000, transparent)', maskImage: 'radial-gradient(circle 0px at 50% 50%, #000, transparent)', willChange: 'mask-image' }}>
        <div style={{ position: 'absolute', inset: 0, animation: reduced ? 'none' : `${p}-in 2200ms ${ease} both` }}>
          <img src={revealImage} alt="" draggable="false" style={imgStyle} />
        </div>
      </div>
      <img src={revealImage} alt={lines.join(' ')} style={{ position: 'absolute', width: 1, height: 1, opacity: 0, pointerEvents: 'none' }} />

      {showRing && (
        <div ref={ringRef} aria-hidden="true" style={{ position: 'absolute', left: 0, top: 0, width: 0, height: 0, borderRadius: '50%', border: `1px solid ${ringColor}`, opacity: 0, pointerEvents: 'none', mixBlendMode: 'overlay', zIndex: 2 }} />
      )}

      {scrimA > 0 && (
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2,
          background: centered
            ? `radial-gradient(ellipse at 50% 55%, rgba(0,0,0,${scrimA * 0.55}) 0%, rgba(0,0,0,${scrimA * 0.15}) 60%, rgba(0,0,0,${scrimA * 0.35}) 100%)`
            : `linear-gradient(180deg, rgba(0,0,0,${scrimA * 0.5}) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) 48%, rgba(0,0,0,${scrimA * 0.8}) 100%)`
        }} />
      )}

      <div style={{ position: 'absolute', top: pad * 0.75, left: pad, right: pad, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, zIndex: 3, pointerEvents: 'none' }}>
        <div style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: text, fontWeight: 500, animation: reduced ? 'none' : `${p}-fade 900ms ${ease} 200ms both` }}>{eyebrow}</div>
        {!compact && (
          <div style={{ fontSize: 12, letterSpacing: '0.06em', color: muted, opacity: touched ? 0.55 : 0.9, transition: 'opacity .6s', animation: reduced ? 'none' : `${p}-fade 900ms ${ease} 700ms both` }}>
            {isFull ? 'Click to close' : hintText}
          </div>
        )}
      </div>

      <div style={{
        position: 'absolute', zIndex: 3, pointerEvents: 'none',
        left: pad, right: pad,
        ...(centered ? { top: '50%', transform: 'translateY(-50%)', textAlign: 'center' } : { bottom: pad })
      }}>
        <h1 aria-hidden="true" style={{ margin: 0, fontFamily: display, fontWeight: headlineWeight, fontSize: hSize, lineHeight: 0.94, letterSpacing: serifish ? '-0.02em' : '-0.045em', color: text }}>
          {lines.map((l, i) => (
            <span key={i} style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.08em', marginBottom: '-0.08em' }}>
              <span style={{ display: 'inline-block', fontStyle: serifish && i === lines.length - 1 ? 'italic' : 'normal', animation: reduced ? 'none' : `${p}-rise 1200ms ${ease} ${150 + i * 120}ms both` }}>{l}</span>
            </span>
          ))}
        </h1>
        <div style={{
          marginTop: compact ? 18 : 28, display: 'flex', flexDirection: compact || centered ? 'column' : 'row', alignItems: compact ? 'flex-start' : centered ? 'center' : 'flex-end',
          justifyContent: 'space-between', gap: compact ? 18 : 24
        }}>
          <div style={{ display: 'flex', flexDirection: compact ? 'column' : 'row', alignItems: compact ? 'flex-start' : 'center', gap: compact ? 16 : 28 }}>
            <p style={{ margin: 0, maxWidth: 360, fontSize: compact ? 14 : 15, lineHeight: 1.5, color: muted, animation: reduced ? 'none' : `${p}-fade 900ms ${ease} 520ms both` }}>{subline}</p>
            <a href="#" onClick={(e) => e.preventDefault()} className={`${p}-cta`} style={{
              pointerEvents: 'auto', display: 'inline-flex', alignItems: 'center', gap: 10, height: 44, padding: '0 22px', borderRadius: 999,
              border: `1px solid ${text}`, color: text, textDecoration: 'none', fontSize: 13, letterSpacing: '0.04em', whiteSpace: 'nowrap',
              animation: reduced ? 'none' : `${p}-fade 900ms ${ease} 640ms both`
            }}>
              {ctaLabel}
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M2 7 H12 M8 3 L12 7 L8 11" fill="none" stroke="currentColor" strokeWidth="1.2" /></svg>
            </a>
          </div>
          {showLabels && !compact && (
            <div aria-hidden="true" style={{ display: 'flex', gap: 22, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: muted, animation: reduced ? 'none' : `${p}-fade 900ms ${ease} 760ms both` }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, opacity: isFull ? 0.45 : 1, transition: 'opacity .6s' }}>
                <span style={{ width: 9, height: 9, borderRadius: '50%', border: `1px solid ${muted}` }} />{baseLabel}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: text }}>
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: text, transform: `scale(${isFull ? 1.4 : 1})`, transition: `transform .6s ${ease}` }} />{revealLabel}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

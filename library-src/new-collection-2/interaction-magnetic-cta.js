const MANIFEST = {
  "type": "Interaction.MagneticCTA",
  "description": "Call-to-action band with four hand-tuned buttons: magnetic pull toward the cursor with spring overshoot on release, a colour flood that grows from the exact point the cursor entered and drains toward where it left, labels that roll up into a duplicate and arrows that exit right and re-enter from the left",
  "editorElement": {
    "selector": ".magnetic-cta",
    "displayName": "Magnetic CTA",
    "archetype": "container",
    "data": {
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Now booking — spring 2027", "group": "Content" },
      "headline": { "dataType": "text", "displayName": "Headline", "defaultValue": "Let's make something worth keeping", "group": "Content" },
      "subtext": { "dataType": "text", "displayName": "Supporting Text", "defaultValue": "Two new projects a season. Tell us what you're building and we'll reply within a day.", "group": "Content" },
      "button1Label": { "dataType": "text", "displayName": "Button 1 (solid)", "defaultValue": "Start a project", "group": "Buttons" },
      "button2Label": { "dataType": "text", "displayName": "Button 2 (outline)", "defaultValue": "See our work", "group": "Buttons" },
      "button3Label": { "dataType": "text", "displayName": "Button 3 (round)", "defaultValue": "Book a call", "group": "Buttons" },
      "button4Label": { "dataType": "text", "displayName": "Button 4 (link)", "defaultValue": "hello@north.studio", "group": "Buttons" },
      "button1Url": { "dataType": "text", "displayName": "Button 1 URL", "defaultValue": "#start", "group": "Buttons" },
      "button2Url": { "dataType": "text", "displayName": "Button 2 URL", "defaultValue": "#work", "group": "Buttons" },
      "button3Url": { "dataType": "text", "displayName": "Button 3 URL", "defaultValue": "#call", "group": "Buttons" },
      "button4Url": { "dataType": "text", "displayName": "Button 4 URL", "defaultValue": "mailto:hello@north.studio", "group": "Buttons" },
      "showRound": { "dataType": "booleanValue", "displayName": "Show Round Button", "defaultValue": "true", "group": "Buttons" },
      "showLink": { "dataType": "booleanValue", "displayName": "Show Text Link", "defaultValue": "true", "group": "Buttons" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#0F0F0E", "group": "Colors" },
      "textColor": { "dataType": "color", "displayName": "Text", "defaultValue": "#F5F5F4", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#A8A29E", "group": "Colors" },
      "solidColor": { "dataType": "color", "displayName": "Solid Button", "defaultValue": "#F5F5F4", "group": "Colors" },
      "solidTextColor": { "dataType": "color", "displayName": "Solid Button Text", "defaultValue": "#141413", "group": "Colors" },
      "floodColor": { "dataType": "color", "displayName": "Flood Fill", "defaultValue": "#D8C9AE", "group": "Colors" },
      "floodTextColor": { "dataType": "color", "displayName": "Text On Flood", "defaultValue": "#141413", "group": "Colors" },
      "radius": { "dataType": "select", "displayName": "Corner Radius", "defaultValue": "pill", "options": ["pill", "16", "8", "0"], "group": "Layout" },
      "alignment": { "dataType": "select", "displayName": "Alignment", "defaultValue": "center", "options": ["center", "left"], "group": "Layout" },
      "buttonSize": { "dataType": "select", "displayName": "Button Size", "defaultValue": "large", "options": ["medium", "large"], "group": "Layout" },
      "magnetStrength": { "dataType": "select", "displayName": "Magnet Strength", "defaultValue": "medium", "options": ["off", "subtle", "medium", "strong"], "group": "Animation" },
      "springFeel": { "dataType": "select", "displayName": "Spring Feel", "defaultValue": "bouncy", "options": ["tight", "bouncy", "loose"], "group": "Animation" },
      "demoOnMount": { "dataType": "booleanValue", "displayName": "Demo Hover On Load", "defaultValue": "true", "group": "Animation" },
      "displayFont": { "dataType": "select", "displayName": "Display Font", "defaultValue": "Instrument Serif", "options": ["Instrument Serif", "Fraunces", "Inter Tight", "Inter"], "group": "Typography" },
      "headlineSize": { "dataType": "select", "displayName": "Headline Size (px)", "defaultValue": "112", "options": ["72", "88", "112", "136"], "group": "Typography" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const eyebrow = config?.eyebrow || 'Now booking — spring 2027';
  const headline = config?.headline || "Let's make something worth keeping";
  const subtext = config?.subtext || "Two new projects a season. Tell us what you're building and we'll reply within a day.";
  const labels = [
    config?.button1Label || 'Start a project',
    config?.button2Label || 'See our work',
    config?.button3Label || 'Book a call',
    config?.button4Label || 'hello@north.studio',
  ];
  const urls = [
    config?.button1Url || '#start',
    config?.button2Url || '#work',
    config?.button3Url || '#call',
    config?.button4Url || 'mailto:hello@north.studio',
  ];
  const showRound = bool(config?.showRound, true);
  const showLink = bool(config?.showLink, true);
  const bg = config?.backgroundColor || '#0F0F0E';
  const text = config?.textColor || '#F5F5F4';
  const muted = config?.mutedColor || '#A8A29E';
  const solid = config?.solidColor || '#F5F5F4';
  const solidText = config?.solidTextColor || '#141413';
  const flood = config?.floodColor || '#D8C9AE';
  const floodText = config?.floodTextColor || '#141413';
  const radiusMode = config?.radius || 'pill';
  const align = config?.alignment || 'center';
  const sizeMode = config?.buttonSize || 'large';
  const magnet = { off: 0, subtle: 0.18, medium: 0.32, strong: 0.5 }[config?.magnetStrength || 'medium'] ?? 0.32;
  const feel = { tight: [260, 26], bouncy: [190, 12], loose: [110, 9] }[config?.springFeel || 'bouncy'] || [190, 12];
  const demoOnMount = bool(config?.demoOnMount, true);
  const displayFont = config?.displayFont || 'Instrument Serif';
  const headlineSize = parseInt(config?.headlineSize || '112', 10) || 112;

  const uid = React.useMemo(() => 'mc' + Math.random().toString(36).slice(2, 9), []);
  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  const rootRef = React.useRef(null);
  const moveRefs = React.useRef([]);
  const innerRefs = React.useRef([]);
  const btnRefs = React.useRef([]);
  const springs = React.useRef([0, 1, 2, 3].map(() => ({ x: 0, y: 0, vx: 0, vy: 0, tx: 0, ty: 0 })));
  const rafRef = React.useRef(0);
  const lastT = React.useRef(0);
  const [width, setWidth] = React.useState(1280);
  const [stageH, setStageH] = React.useState(760);
  const [shown, setShown] = React.useState(reduced);
  const [hot, setHot] = React.useState([false, false, false, false]);
  const [fills, setFills] = React.useState([0, 1, 2, 3].map(() => ({ x: 0, y: 0 })));

  React.useEffect(() => {
    const families = { 'Instrument Serif': 'Instrument+Serif:ital@0;1', 'Fraunces': 'Fraunces:ital,opsz,wght@0,9..144,300..500;1,9..144,300..500', 'Inter Tight': 'Inter+Tight:ital,wght@0,300..500;1,300..500' };
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
    let io = null;
    if (!reduced && typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { setShown(true); io.disconnect(); } }, { threshold: 0.2 });
      io.observe(el);
    } else setShown(true);
    return () => { if (ro) ro.disconnect(); if (io) io.disconnect(); window.removeEventListener('resize', measure); cancelAnimationFrame(rafRef.current); };
  }, [reduced]);

  const tick = React.useCallback((t) => {
    const dt = Math.min(1 / 30, lastT.current ? (t - lastT.current) / 1000 : 1 / 60);
    lastT.current = t;
    let moving = false;
    springs.current.forEach((s, i) => {
      const [k, c] = feel;
      s.vx += (-k * (s.x - s.tx) - c * s.vx) * dt;
      s.vy += (-k * (s.y - s.ty) - c * s.vy) * dt;
      s.x += s.vx * dt; s.y += s.vy * dt;
      if (Math.abs(s.x - s.tx) < 0.05 && Math.abs(s.y - s.ty) < 0.05 && Math.abs(s.vx) < 0.05 && Math.abs(s.vy) < 0.05) { s.x = s.tx; s.y = s.ty; s.vx = 0; s.vy = 0; }
      else moving = true;
      const m = moveRefs.current[i];
      if (m) m.style.transform = `translate3d(${s.x.toFixed(2)}px, ${s.y.toFixed(2)}px, 0)`;
      [innerRefs.current[i * 2], innerRefs.current[i * 2 + 1]].forEach((n) => { if (n) n.style.transform = `translate3d(${(s.x * 0.45).toFixed(2)}px, ${(s.y * 0.45).toFixed(2)}px, 0)`; });
    });
    rafRef.current = moving ? requestAnimationFrame(tick) : 0;
    if (!moving) lastT.current = 0;
  }, [feel]);

  const kick = () => { if (!rafRef.current && !reduced) rafRef.current = requestAnimationFrame(tick); };

  const localPoint = (i, e) => {
    const b = btnRefs.current[i];
    if (!b) return { x: 0, y: 0, w: 1, h: 1, k: 1 };
    const r = b.getBoundingClientRect();
    const k = r.width ? b.offsetWidth / r.width : 1;
    return { x: (e.clientX - r.left) * k, y: (e.clientY - r.top) * k, w: b.offsetWidth, h: b.offsetHeight, k };
  };

  const setHotAt = (i, v) => setHot((h) => (h[i] === v ? h : h.map((x, j) => (j === i ? v : x))));
  const setFillAt = (i, pt) => setFills((f) => f.map((x, j) => (j === i ? pt : x)));

  const leftAt = React.useRef([0, 0, 0, 0]);
  const ignite = (i, x, y) => {
    const settled = performance.now() - leftAt.current[i] > 760;
    if (!settled) { setFillAt(i, { x, y }); setHotAt(i, true); return; }
    setFillAt(i, { x, y, snap: true });
    requestAnimationFrame(() => requestAnimationFrame(() => { setFillAt(i, { x, y }); setHotAt(i, true); }));
  };
  const onEnter = (i) => (e) => {
    const pt = localPoint(i, e);
    ignite(i, pt.x, pt.y);
  };
  const onMove = (i) => (e) => {
    if (!magnet) return;
    const pt = localPoint(i, e);
    const s = springs.current[i];
    s.tx = (pt.x - pt.w / 2) * magnet;
    s.ty = (pt.y - pt.h / 2) * magnet;
    kick();
  };
  const onZoneLeave = (i) => () => {
    const s = springs.current[i];
    s.tx = 0; s.ty = 0;
    kick();
  };
  const onLeave = (i) => (e) => {
    const pt = localPoint(i, e);
    setFillAt(i, { x: pt.x, y: pt.y });
    setHotAt(i, false);
    leftAt.current[i] = performance.now();
  };

  React.useEffect(() => {
    if (!demoOnMount || reduced) return undefined;
    const timers = [];
    timers.push(setTimeout(() => {
      const b = btnRefs.current[0];
      if (!b) return;
      ignite(0, 0, b.offsetHeight / 2);
      const s = springs.current[0]; s.tx = 10; s.ty = -4; kick();
    }, 1100));
    timers.push(setTimeout(() => {
      const b = btnRefs.current[0];
      if (b) setFillAt(0, { x: b.offsetWidth, y: b.offsetHeight / 2 });
      setHotAt(0, false);
      leftAt.current[0] = performance.now();
      const s = springs.current[0]; s.tx = 0; s.ty = 0; kick();
    }, 3000));
    return () => timers.forEach(clearTimeout);
  }, [demoOnMount, reduced]); // eslint-disable-line react-hooks/exhaustive-deps

  const compact = width < 760;
  const H = Math.max(compact ? 620 : 560, stageH);
  const pad = compact ? 20 : 56;
  const sans = '"Inter", -apple-system, "Helvetica Neue", Arial, sans-serif';
  const display = displayFont === 'Inter' ? sans
    : displayFont === 'Inter Tight' ? '"Inter Tight", "Inter", -apple-system, sans-serif'
    : `"${displayFont}", "Iowan Old Style", Georgia, serif`;
  const serifLike = displayFont === 'Instrument Serif' || displayFont === 'Fraunces';
  const p = uid;
  const hPx = Math.round(Math.min(headlineSize, compact ? width * 0.13 : width * 0.085));
  const large = sizeMode === 'large';
  const bh = compact ? 54 : large ? 64 : 54;
  const radius = radiusMode === 'pill' ? 999 : parseInt(radiusMode, 10) || 0;
  const roundD = compact ? 112 : large ? 148 : 124;
  const centered = align === 'center';

  const btnReset = { appearance: 'none', border: 'none', background: 'transparent', color: 'inherit', padding: 0, margin: 0, cursor: 'pointer', font: 'inherit', textDecoration: 'none' };
  const renderRoll = ({ label, on, color, hotColor, italic }) => (
    <span aria-hidden="true" style={{ position: 'relative', display: 'inline-block', overflow: 'hidden', height: '1.3em', lineHeight: '1.3em', verticalAlign: 'top' }}>
      <span className={`${p}-roll`} style={{ display: 'block', transform: on ? 'translateY(-50%)' : 'none' }}>
        <span style={{ display: 'block', color }}>{label}</span>
        <span style={{ display: 'block', color: hotColor, fontStyle: italic ? 'italic' : 'normal' }}>{label}</span>
      </span>
    </span>
  );
  const renderArrow = ({ on, size = 16 }) => (
    <span aria-hidden="true" style={{ position: 'relative', display: 'inline-block', width: size, height: size, overflow: 'hidden', flexShrink: 0 }}>
      {[0, 1].map((k) => (
        <svg key={k} width={size} height={size} viewBox="0 0 16 16" className={`${p}-arr`}
          style={{ position: 'absolute', inset: 0, transform: k === 0 ? (on ? 'translateX(160%)' : 'none') : (on ? 'none' : 'translateX(-160%)'), transitionDelay: k === 0 ? '0ms' : (on ? '140ms' : '0ms') }}>
          <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ))}
    </span>
  );
  const overlay = (i, color, padCss, justify, content) => {
    const b = btnRefs.current[i];
    const w = b ? b.offsetWidth : 240; const h = b ? b.offsetHeight : 64;
    const r = Math.ceil(Math.hypot(w, h)) + 2;
    const f = fills[i];
    const c = `circle(${hot[i] ? r : 0}px at ${Math.round(f.x)}px ${Math.round(f.y)}px)`;
    return (
      <span aria-hidden="true" className={`${p}-flood`} style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', pointerEvents: 'none', background: color, clipPath: c, WebkitClipPath: c, display: 'flex', alignItems: 'center', justifyContent: justify, padding: padCss, boxSizing: 'border-box', transition: f.snap ? 'none' : undefined }}>
        <span ref={(el) => { innerRefs.current[i * 2 + 1] = el; }} style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', flexDirection: justify === 'center' ? 'column' : 'row', gap: justify === 'center' ? 10 : 12, willChange: 'transform' }}>{content}</span>
      </span>
    );
  };

  const btn0 = (c) => (
    <>
      {renderRoll({ label: labels[0], on: hot[0], color: c, hotColor: c })}
      <span style={{ width: 30, height: 30, borderRadius: '50%', display: 'grid', placeItems: 'center', background: `${c}14`, color: c, marginRight: -12 }}>
        {renderArrow({ on: hot[0], size: 14 })}
      </span>
    </>
  );
  const btn1 = (c) => (
    <>
      {renderRoll({ label: labels[1], on: hot[1], color: c, hotColor: c })}
      <span style={{ color: c, display: 'inline-flex' }}>{renderArrow({ on: hot[1] })}</span>
    </>
  );
  const btn2 = (c) => (
    <>
      <span style={{ color: c, display: 'inline-flex', transform: 'rotate(-45deg)' }}>{renderArrow({ on: hot[2], size: 20 })}</span>
      {renderRoll({ label: labels[2], on: hot[2], color: c, hotColor: c, italic: serifLike })}
    </>
  );

  const zone = (i, child, extra = 22) => (
    <div
      style={{ padding: extra, margin: -extra, display: 'inline-block', touchAction: 'manipulation' }}
      onPointerMove={onMove(i)}
      onPointerLeave={onZoneLeave(i)}
    >
      <div ref={(el) => { moveRefs.current[i] = el; }} style={{ display: 'inline-block', willChange: 'transform' }}>{child}</div>
    </div>
  );

  const evts = (i) => ({
    ref: (el) => { btnRefs.current[i] = el; },
    onPointerEnter: onEnter(i),
    onPointerLeave: onLeave(i),
    onFocus: () => { const b = btnRefs.current[i]; if (b) ignite(i, b.offsetWidth / 2, b.offsetHeight / 2); },
    onBlur: () => { setHotAt(i, false); leftAt.current[i] = performance.now(); },
  });

  const words = headline.split(' ');
  const enter = (delay) => ({
    opacity: shown ? 1 : 0, transform: shown ? 'none' : 'translateY(16px)',
    transition: reduced ? 'none' : `opacity 900ms cubic-bezier(.22,1,.36,1) ${delay}ms, transform 1000ms cubic-bezier(.22,1,.36,1) ${delay}ms`,
  });

  return (
    <section
      ref={rootRef}
      className={`magnetic-cta ${p}`}
      style={{ position: 'relative', width: '100%', minHeight: H, background: bg, color: text, fontFamily: sans, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: centered ? 'center' : 'flex-start', textAlign: centered ? 'center' : 'left', padding: `${compact ? 72 : 88}px ${pad}px`, boxSizing: 'border-box', overflow: 'hidden' }}
    >
      <style>{`
        .${p} .${p}-roll { transition: transform 620ms cubic-bezier(.65,0,.35,1); }
        .${p} .${p}-arr { transition: transform 520ms cubic-bezier(.65,0,.35,1); }
        .${p} .${p}-flood { transition: clip-path 750ms cubic-bezier(.22,1,.36,1), -webkit-clip-path 750ms cubic-bezier(.22,1,.36,1); }
        .${p} a:focus-visible { outline: 1.5px solid ${flood}; outline-offset: 5px; }
        .${p} .${p}-ul { position: absolute; left: 0; right: 0; bottom: -4px; height: 1px; background: currentColor; transform-origin: right; transform: scaleX(1); transition: transform 600ms cubic-bezier(.65,0,.35,1); }
        .${p} .${p}-ul2 { position: absolute; left: 0; right: 0; bottom: -4px; height: 1px; background: ${flood}; transform-origin: left; transform: scaleX(0); transition: transform 600ms cubic-bezier(.65,0,.35,1) 220ms; }
        .${p} [data-hot="true"] .${p}-ul { transform: scaleX(0); }
        .${p} [data-hot="true"] .${p}-ul2 { transform: scaleX(1); }
        @media (prefers-reduced-motion: reduce) { .${p} * { transition: none !important; animation: none !important; } }
      `}</style>

      <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: muted, marginBottom: compact ? 22 : 30, ...enter(0) }}>{eyebrow}</div>
      <h2 aria-label={headline} style={{ margin: 0, fontFamily: display, fontWeight: 400, fontSize: hPx, lineHeight: 0.98, letterSpacing: serifLike ? '-0.02em' : '-0.045em', maxWidth: Math.min(width - pad * 2, hPx * 9.4) }}>
        {words.map((w, i) => (
          <span key={i} aria-hidden="true" style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', paddingBottom: '0.12em', marginBottom: '-0.12em' }}>
            <span style={{
              display: 'inline-block',
              fontStyle: i === words.length - 1 && serifLike ? 'italic' : 'normal',
              transform: shown ? 'none' : 'translateY(100%) rotate(3deg)', filter: shown ? 'blur(0)' : 'blur(10px)', opacity: shown ? 1 : 0,
              transformOrigin: '0 100%',
              transition: reduced ? 'none' : `transform 1200ms cubic-bezier(.22,1,.36,1) ${100 + i * 70}ms, filter 1000ms cubic-bezier(.22,1,.36,1) ${100 + i * 70}ms, opacity 700ms ease ${100 + i * 70}ms`,
            }}>{w}{i < words.length - 1 ? ' ' : ''}</span>
          </span>
        ))}
      </h2>
      <p style={{ margin: compact ? '22px 0 0' : '30px 0 0', maxWidth: 440, fontSize: compact ? 15 : 17, lineHeight: 1.6, fontWeight: 300, color: muted, ...enter(500) }}>{subtext}</p>

      <div style={{ marginTop: compact ? 40 : 56, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: centered ? 'center' : 'flex-start', gap: compact ? 18 : 28, rowGap: compact ? 22 : 28, ...enter(650) }}>
        {zone(0, (
          <a href={urls[0]} onClick={(e) => { if (urls[0].charAt(0) === '#') e.preventDefault(); }} aria-label={labels[0]} {...evts(0)} data-hot={hot[0]}
            style={{ ...btnReset, position: 'relative', display: 'inline-flex', alignItems: 'center', height: bh, padding: `0 ${compact ? 24 : 30}px`, borderRadius: radius, background: solid, color: solidText, fontSize: compact ? 15 : 16, fontWeight: 500, overflow: 'hidden', isolation: 'isolate' }}>
            <span ref={(el) => { innerRefs.current[0] = el; }} style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 12, willChange: 'transform' }}>
              {btn0(solidText)}
            </span>
            {overlay(0, flood, `0 ${compact ? 24 : 30}px`, 'flex-start', btn0(floodText))}
          </a>
        ))}

        {zone(1, (
          <a href={urls[1]} onClick={(e) => { if (urls[1].charAt(0) === '#') e.preventDefault(); }} aria-label={labels[1]} {...evts(1)} data-hot={hot[1]}
            style={{ ...btnReset, position: 'relative', display: 'inline-flex', alignItems: 'center', height: bh, padding: `0 ${compact ? 24 : 30}px`, borderRadius: radius, boxShadow: `inset 0 0 0 1px ${text}55`, color: text, fontSize: compact ? 15 : 16, fontWeight: 400, overflow: 'hidden', isolation: 'isolate' }}>
            <span ref={(el) => { innerRefs.current[2] = el; }} style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 12, willChange: 'transform' }}>
              {btn1(text)}
            </span>
            {overlay(1, text, `0 ${compact ? 24 : 30}px`, 'flex-start', btn1(bg))}
          </a>
        ))}

        {showRound && zone(2, (
          <a href={urls[2]} onClick={(e) => { if (urls[2].charAt(0) === '#') e.preventDefault(); }} aria-label={labels[2]} {...evts(2)} data-hot={hot[2]}
            style={{ ...btnReset, position: 'relative', display: 'grid', placeItems: 'center', width: roundD, height: roundD, borderRadius: '50%', boxShadow: `inset 0 0 0 1px ${text}33`, color: text, fontSize: compact ? 13 : 14, fontWeight: 400, overflow: 'hidden', isolation: 'isolate' }}>
            <span ref={(el) => { innerRefs.current[4] = el; }} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, willChange: 'transform' }}>
              {btn2(text)}
            </span>
            {overlay(2, flood, 0, 'center', btn2(floodText))}
          </a>
        ), 34)}

        {showLink && zone(3, (
          <a href={urls[3]} aria-label={labels[3]} {...evts(3)} data-hot={hot[3]}
            onClick={(e) => { if (urls[3].charAt(0) === '#') e.preventDefault(); }}
            style={{ ...btnReset, position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 10, height: bh, padding: '0 6px', color: text, fontSize: compact ? 15 : 16, fontWeight: 400 }}>
            <span ref={(el) => { innerRefs.current[6] = el; }} style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              <span style={{ position: 'relative', display: 'inline-block' }}>
                {renderRoll({ label: labels[3], on: hot[3], color: text, hotColor: flood, italic: false })}
                <span className={`${p}-ul`} />
                <span className={`${p}-ul2`} />
              </span>
              <span style={{ color: hot[3] ? flood : text, transition: 'color .4s', display: 'inline-flex', transform: 'rotate(-45deg)' }}>{renderArrow({ on: hot[3], size: 14 })}</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

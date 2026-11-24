const MANIFEST = {
  "type": "Hero.SplitCurtain",
  "description": "Opening hero whose photo splits into panels that part like curtains with an eased stagger, revealing a headline layer behind; the panels then converge into one half of the frame while the headline glides across, so the opening transition resolves into the final split-screen layout",
  "editorElement": {
    "selector": ".hero-split-curtain",
    "displayName": "Split Curtain",
    "archetype": "container",
    "data": {
      "wordmark": { "dataType": "text", "displayName": "Opening Wordmark", "defaultValue": "AURÈLE", "group": "Content" },
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Aurèle Retreats — Val d'Orcia", "group": "Content" },
      "headline": { "dataType": "text", "displayName": "Headline (use | for line breaks)", "defaultValue": "Where the|valley slows|down", "group": "Content" },
      "body": { "dataType": "text", "displayName": "Body", "defaultValue": "Nine stone houses on a ridge above the Tuscan hills. Long tables, cold springs, and nothing on the schedule.", "group": "Content" },
      "ctaLabel": { "dataType": "text", "displayName": "Primary Button", "defaultValue": "Plan your stay", "group": "Content" },
      "secondaryLabel": { "dataType": "text", "displayName": "Secondary Link", "defaultValue": "The houses", "group": "Content" },
      "cardCaption": { "dataType": "text", "displayName": "Card Caption", "defaultValue": "Morning fog, October", "group": "Content" },
      "replayLabel": { "dataType": "text", "displayName": "Replay Label", "defaultValue": "Replay", "group": "Content" },
      "primaryImage": { "dataType": "text", "displayName": "Curtain Image URL", "defaultValue": "https://picsum.photos/id/984/1920/1200", "group": "Images" },
      "secondaryImage": { "dataType": "text", "displayName": "Reveal Image URL", "defaultValue": "https://picsum.photos/id/931/1600/1100", "group": "Images" },
      "revealLayer": { "dataType": "select", "displayName": "Reveal Layer", "defaultValue": "image", "options": ["image", "colour"], "group": "Images" },
      "revealColor": { "dataType": "color", "displayName": "Background / Reveal Colour", "defaultValue": "#F5F5F4", "group": "Colors" },
      "inkColor": { "dataType": "color", "displayName": "Ink", "defaultValue": "#1C1917", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#78716C", "group": "Colors" },
      "onImageColor": { "dataType": "color", "displayName": "Text Over Image", "defaultValue": "#FAFAF9", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Button", "defaultValue": "#1C1917", "group": "Colors" },
      "displayFont": { "dataType": "select", "displayName": "Display Font", "defaultValue": "Instrument Serif", "options": ["Instrument Serif", "Fraunces", "Inter Tight", "system-ui"], "group": "Typography" },
      "headlineSize": { "dataType": "select", "displayName": "Final Headline Size (px)", "defaultValue": "84", "options": ["60", "72", "84", "96", "112"], "group": "Typography" },
      "headlineWeight": { "dataType": "select", "displayName": "Headline Weight", "defaultValue": "400", "options": ["300", "400", "500"], "group": "Typography" },
      "panelCount": { "dataType": "select", "displayName": "Panels", "defaultValue": "4", "options": ["2", "3", "4", "5", "6", "8"], "group": "Curtain" },
      "direction": { "dataType": "select", "displayName": "Panel Direction", "defaultValue": "vertical", "options": ["vertical", "horizontal"], "group": "Curtain" },
      "partWidth": { "dataType": "select", "displayName": "Opening Width", "defaultValue": "medium", "options": ["narrow", "medium", "wide"], "group": "Curtain" },
      "imageSide": { "dataType": "select", "displayName": "Final Image Side", "defaultValue": "left", "options": ["left", "right"], "group": "Layout" },
      "height": { "dataType": "select", "displayName": "Height", "defaultValue": "screen", "options": ["screen", "640", "720", "800"], "group": "Layout" },
      "showCard": { "dataType": "booleanValue", "displayName": "Reveal Image Card", "defaultValue": "true", "group": "Layout" },
      "showReplay": { "dataType": "booleanValue", "displayName": "Replay Button", "defaultValue": "true", "group": "Layout" },
      "playOnLoad": { "dataType": "booleanValue", "displayName": "Play On Load", "defaultValue": "true", "group": "Animation" },
      "startDelay": { "dataType": "select", "displayName": "Start Delay (ms)", "defaultValue": "700", "options": ["300", "700", "1200", "2000"], "group": "Animation" },
      "partDuration": { "dataType": "select", "displayName": "Part Duration (ms)", "defaultValue": "1300", "options": ["900", "1300", "1700"], "group": "Animation" },
      "holdDuration": { "dataType": "select", "displayName": "Hold Before Settle (ms)", "defaultValue": "700", "options": ["300", "700", "1200", "2000"], "group": "Animation" },
      "settleDuration": { "dataType": "select", "displayName": "Settle Duration (ms)", "defaultValue": "1400", "options": ["1000", "1400", "1800"], "group": "Animation" },
      "stagger": { "dataType": "select", "displayName": "Panel Stagger (ms)", "defaultValue": "80", "options": ["40", "80", "120", "180"], "group": "Animation" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const wordmark = config?.wordmark || 'AURÈLE';
  const eyebrow = config?.eyebrow || "Aurèle Retreats — Val d'Orcia";
  const headline = config?.headline || 'Where the|valley slows|down';
  const body = config?.body || 'Nine stone houses on a ridge above the Tuscan hills. Long tables, cold springs, and nothing on the schedule.';
  const ctaLabel = config?.ctaLabel || 'Plan your stay';
  const secondaryLabel = config?.secondaryLabel || 'The houses';
  const cardCaption = config?.cardCaption || 'Morning fog, October';
  const replayLabel = config?.replayLabel || 'Replay';
  const primaryImage = config?.primaryImage || 'https://picsum.photos/id/984/1920/1200';
  const secondaryImage = config?.secondaryImage || 'https://picsum.photos/id/931/1600/1100';
  const imageLayer = (config?.revealLayer || 'image') === 'image' && !!secondaryImage;
  const bg = config?.revealColor || '#F5F5F4';
  const ink = config?.inkColor || '#1C1917';
  const muted = config?.mutedColor || '#78716C';
  const onImg = config?.onImageColor || '#FAFAF9';
  const accent = config?.accentColor || '#1C1917';
  const displayFont = config?.displayFont || 'Instrument Serif';
  const headlineSize = parseInt(config?.headlineSize || '84', 10) || 84;
  const headlineWeight = config?.headlineWeight || '400';
  const N = Math.max(2, Math.min(12, parseInt(config?.panelCount || '4', 10) || 4));
  const vertical = (config?.direction || 'vertical') === 'vertical';
  const partK = { narrow: 0.22, medium: 0.32, wide: 0.42 }[config?.partWidth || 'medium'] || 0.32;
  const imageRight = (config?.imageSide || 'left') === 'right';
  const heightMode = config?.height || 'screen';
  const showCardCfg = bool(config?.showCard, true);
  const showReplay = bool(config?.showReplay, true);
  const playOnLoad = bool(config?.playOnLoad, true);
  const startDelay = parseInt(config?.startDelay || '700', 10) || 700;
  const partDur = parseInt(config?.partDuration || '1300', 10) || 1300;
  const holdDur = parseInt(config?.holdDuration || '700', 10) || 700;
  const settleDur = parseInt(config?.settleDuration || '1400', 10) || 1400;
  const stagger = parseInt(config?.stagger || '80', 10);

  const uid = React.useMemo(() => 'sc' + Math.random().toString(36).slice(2, 9), []);
  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  const rootRef = React.useRef(null);
  const colRef = React.useRef(null);
  const headRef = React.useRef(null);
  const timers = React.useRef([]);
  const [width, setWidth] = React.useState(1280);
  const [stageH, setStageH] = React.useState(720);
  const [phase, setPhase] = React.useState(playOnLoad && !reduced ? 0 : 2);
  const [snap, setSnap] = React.useState(true);
  const [run, setRun] = React.useState(0);
  const [hb, setHb] = React.useState(null);

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

  const W = width;
  const compact = W < 760;
  const H = heightMode === 'screen' ? Math.max(compact ? 640 : 560, stageH) : parseInt(heightMode, 10) || 720;
  const pad = compact ? 20 : 48;
  const lines = headline.split('|').map((l) => l.trim()).filter(Boolean);
  const finalSize = compact ? Math.round(Math.min(headlineSize * 0.62, W * 0.13)) : Math.round(Math.min(headlineSize, W * 0.075, H * 0.13));

  const R = compact
    ? { x: 0, y: 0, w: W, h: Math.round(H * 0.44) }
    : { x: imageRight ? W / 2 : 0, y: 0, w: W / 2, h: H };
  const col = compact
    ? { x: pad, y: R.h + 28, w: W - pad * 2, h: H - R.h - 28 - pad }
    : { x: (imageRight ? 0 : W / 2) + pad * 1.4, y: pad, w: W / 2 - pad * 2.8, h: H - pad * 2 };
  const showCard = showCardCfg && imageLayer && !compact;
  const cardW = Math.round(Math.min(240, col.w * 0.46));
  const cardH = Math.round(cardW * 0.72);
  const card = { x: col.x + col.w - cardW, y: col.y + col.h - cardH, w: cardW, h: cardH };

  React.useLayoutEffect(() => {
    const measureHead = () => {
      const h = headRef.current; const c = colRef.current;
      if (!h || !c) return;
      setHb({ x: c.offsetLeft + h.offsetLeft, y: c.offsetTop + h.offsetTop, w: h.offsetWidth, h: h.offsetHeight });
    };
    measureHead();
    let alive = true;
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (alive) measureHead(); });
    const t = setTimeout(measureHead, 600);
    return () => { alive = false; clearTimeout(t); };
  }, [W, H, finalSize, headline, displayFont, compact, imageRight]);

  React.useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (reduced || (!playOnLoad && run === 0)) { setPhase(2); setSnap(true); const r = requestAnimationFrame(() => setSnap(false)); return () => cancelAnimationFrame(r); }
    setSnap(true);
    setPhase(0);
    let r2 = 0;
    const r1 = requestAnimationFrame(() => { r2 = requestAnimationFrame(() => { timers.current.push(setTimeout(() => setSnap(false), 30)); }); });
    const center = Math.floor((N - 1) / 2);
    const t1 = startDelay;
    const t2 = t1 + partDur + stagger * (center + 1) + holdDur;
    timers.current.push(setTimeout(() => setPhase(1), t1));
    timers.current.push(setTimeout(() => setPhase(2), t2));
    return () => { cancelAnimationFrame(r1); cancelAnimationFrame(r2); timers.current.forEach(clearTimeout); };
  }, [run, playOnLoad, reduced, N, startDelay, partDur, holdDur, stagger]);

  const ease = 'cubic-bezier(0.76, 0, 0.24, 1)';
  const easeOut = 'cubic-bezier(0.22, 1, 0.36, 1)';
  const sans = '"Inter", -apple-system, "Helvetica Neue", Arial, sans-serif';
  const display = displayFont === 'system-ui' ? sans
    : displayFont === 'Inter Tight' ? '"Inter Tight", "Inter", -apple-system, sans-serif'
    : `"${displayFont}", "Iowan Old Style", Georgia, serif`;
  const serifish = displayFont === 'Instrument Serif' || displayFont === 'Fraunces';
  const p = uid;
  const noT = snap || reduced;
  const insetOf = (r, rad) => `inset(${(r.y - 0.5).toFixed(1)}px ${(W - r.x - r.w - 0.5).toFixed(1)}px ${(H - r.y - r.h - 0.5).toFixed(1)}px ${(r.x - 0.5).toFixed(1)}px round ${rad || 0}px)`;

  const centerRank = Array.from({ length: N }, (_, i) => i)
    .sort((a, b) => Math.abs((a + 0.5) / N - 0.5) - Math.abs((b + 0.5) / N - 0.5));

  const panel = (i) => {
    const closed = vertical ? { x: (i * W) / N, y: 0, w: W / N, h: H } : { x: 0, y: (i * H) / N, w: W, h: H / N };
    const fin = vertical ? { x: R.x + (i * R.w) / N, y: R.y, w: R.w / N, h: R.h } : { x: R.x, y: R.y + (i * R.h) / N, w: R.w, h: R.h / N };
    const group = (i + 0.5) / N < 0.5 ? -1 : 1;
    const dist = (vertical ? W : H) * partK;
    const rect = phase === 2 ? fin : closed;
    const off = phase === 1 ? group * dist : 0;
    const tf = vertical ? `translate3d(${off}px, 0, 0)` : `translate3d(0, ${off}px, 0)`;
    const imgOff = phase === 1 ? -group * dist * 0.35 : 0;
    const shift = phase === 2 ? { x: R.x + R.w / 2 - W / 2, y: R.y + R.h / 2 - H / 2 } : { x: 0, y: 0 };
    const imgTf = `translate3d(${shift.x + (vertical ? imgOff : 0)}px, ${shift.y + (vertical ? 0 : imgOff)}px, 0) scale(${phase === 1 ? 1.06 : 1})`;
    const settleOrder = imageRight ? i : N - 1 - i;
    const delay = phase === 1 ? centerRank.indexOf(i) * stagger : phase === 2 ? settleOrder * stagger : 0;
    const d = phase === 1 ? partDur : settleDur;
    const tr = noT ? 'none' : `transform ${d}ms ${ease} ${delay}ms, clip-path ${d}ms ${ease} ${delay}ms`;
    const trImg = noT ? 'none' : `transform ${d}ms ${ease} ${delay}ms, filter ${d}ms ${ease} ${delay}ms`;
    const clip = insetOf(rect, 0);
    return (
      <div key={i} aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 3, clipPath: clip, WebkitClipPath: clip, transform: tf, transition: tr, WebkitTransition: tr, willChange: 'transform, clip-path', pointerEvents: 'none' }}>
        <img src={primaryImage} alt="" draggable="false" style={{
          position: 'absolute', left: 0, top: 0, width: W, height: H, objectFit: 'cover', display: 'block', userSelect: 'none',
          transform: imgTf, filter: phase === 1 ? 'brightness(0.82)' : 'brightness(1)', transition: trImg, WebkitTransition: trImg
        }} />
      </div>
    );
  };

  const s1 = hb ? Math.min(compact ? 1.25 : 1.55, (W * (compact ? 0.86 : 1 - partK * 1.25)) / Math.max(1, hb.w)) : 1;
  const headTf = hb && phase < 2
    ? `translate3d(${W / 2 - (hb.x + hb.w / 2)}px, ${H / 2 - (hb.y + hb.h / 2)}px, 0) scale(${s1})`
    : 'translate3d(0, 0, 0) scale(1)';
  const headColor = phase < 2 && imageLayer ? onImg : ink;
  const headDelay = Math.round(stagger * Math.min(N, 5) * 0.8 + settleDur * 0.18);
  const settleT = (extra) => (noT ? 'none' : `opacity 900ms ${easeOut} ${settleDur * 0.55 + extra}ms, transform 1100ms ${easeOut} ${settleDur * 0.55 + extra}ms`);
  const reveal = (extra) => ({ opacity: phase === 2 ? 1 : 0, transform: phase === 2 ? 'none' : 'translateY(16px)', transition: phase === 2 ? settleT(extra) : 'none' });
  const secClip = phase === 2 ? (showCard ? insetOf(card, 6) : insetOf({ x: 0, y: 0, w: W, h: H }, 0)) : insetOf({ x: 0, y: 0, w: W, h: H }, 0);
  const secS = Math.max(card.w / W, card.h / H);
  const secTf = phase === 2 && showCard
    ? `translate3d(${card.x + card.w / 2 - W / 2}px, ${card.y + card.h / 2 - H / 2}px, 0) scale(${secS})`
    : `translate3d(0, 0, 0) scale(${phase === 0 ? 1.12 : 1})`;
  const secT = noT ? 'none' : phase === 1 ? `transform ${partDur + 600}ms ${easeOut}` : `transform ${settleDur}ms ${ease}, clip-path ${settleDur}ms ${ease}, opacity ${settleDur}ms ${ease}`;
  const btnReset = { appearance: 'none', border: 'none', background: 'transparent', padding: 0, margin: 0, font: 'inherit', color: 'inherit', cursor: 'pointer' };

  return (
    <section
      ref={rootRef}
      className={`hero-split-curtain ${p}`}
      role="region"
      aria-label={`${eyebrow}. ${lines.join(' ')}`}
      onScroll={(e) => { e.currentTarget.scrollTop = 0; e.currentTarget.scrollLeft = 0; }}
      style={{ position: 'relative', width: '100%', height: H, overflow: 'hidden', background: bg, color: ink, fontFamily: sans, isolation: 'isolate' }}
    >
      <style>{`
        .${p} a:focus-visible, .${p} button:focus-visible { outline: 2px solid ${ink}; outline-offset: 3px; }
        .${p} .${p}-cta { transition: background .35s, color .35s; }
        .${p} .${p}-cta:hover { background: transparent; color: ${accent}; }
        .${p} .${p}-link { background-image: linear-gradient(currentColor, currentColor); background-size: 100% 1px; background-repeat: no-repeat; background-position: 0 100%; transition: background-size .5s ${easeOut}; }
        .${p} .${p}-link:hover { background-size: 0% 1px; background-position: 100% 100%; }
        .${p} .${p}-replay svg { transition: transform .7s ${easeOut}; }
        .${p} .${p}-replay:hover svg { transform: rotate(-200deg); }
        @media (prefers-reduced-motion: reduce) { .${p} * { animation: none !important; transition: none !important; } }
      `}</style>

      {imageLayer && (
        <div aria-hidden={!showCard} style={{
          position: 'absolute', inset: 0, zIndex: 1, overflow: 'hidden', clipPath: secClip, WebkitClipPath: secClip,
          opacity: phase === 2 && !showCard ? 0 : 1, transition: secT, WebkitTransition: secT
        }}>
          <img src={secondaryImage} alt={showCard ? cardCaption : ''} draggable="false" style={{
            position: 'absolute', left: 0, top: 0, width: W, height: H, objectFit: 'cover', display: 'block',
            transformOrigin: '50% 50%', transform: secTf, transition: secT, WebkitTransition: secT
          }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(12,12,13,0.42)', opacity: phase === 2 ? 0 : 1, transition: noT ? 'none' : `opacity ${settleDur}ms ${ease}` }} />
        </div>
      )}

      {Array.from({ length: N }, (_, i) => panel(i))}

      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, zIndex: 5, display: 'grid', placeItems: 'center', pointerEvents: 'none',
        opacity: phase === 0 ? 1 : 0, transform: phase === 0 ? 'scale(1)' : 'scale(1.06)',
        transition: noT ? 'none' : `opacity 600ms ${easeOut}, transform 1200ms ${easeOut}`
      }}>
        <div style={{ color: onImg, fontFamily: display, fontSize: Math.round(Math.min(W * 0.14, H * 0.22)), letterSpacing: serifish ? '0.04em' : '0.02em', lineHeight: 1, textShadow: '0 2px 40px rgba(0,0,0,0.25)' }}>
          <div style={{ overflow: 'hidden', paddingBottom: '0.06em' }}>
            <div style={{ animation: reduced || run > 0 ? 'none' : `${p}-rise 1200ms ${easeOut} 80ms both` }}>{wordmark}</div>
          </div>
        </div>
        <style>{`@keyframes ${p}-rise { from { transform: translateY(105%); } to { transform: translateY(0); } }`}</style>
      </div>

      <div ref={colRef} style={{ position: 'absolute', left: col.x, top: col.y, width: col.w, height: col.h, zIndex: phase === 2 ? 6 : 2, display: 'flex', flexDirection: 'column', justifyContent: compact ? 'flex-start' : 'space-between', pointerEvents: phase === 2 ? 'auto' : 'none' }}>
        <div style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: muted, fontWeight: 500, ...reveal(0), display: compact ? 'none' : 'block' }}>{eyebrow}</div>
        <div>
          <h1 ref={headRef} aria-label={lines.join(' ')} style={{
            margin: 0, fontFamily: display, fontWeight: headlineWeight, fontSize: finalSize, lineHeight: 0.98, letterSpacing: serifish ? '-0.02em' : '-0.045em',
            color: headColor, transformOrigin: '50% 50%', transform: headTf, display: 'inline-block',
            transition: noT ? 'none' : `transform ${settleDur}ms ${ease} ${headDelay}ms, color ${Math.round(settleDur * 0.6)}ms ${ease} ${headDelay + Math.round(settleDur * 0.15)}ms`
          }}>
            {lines.map((l, i) => (
              <span key={i} aria-hidden="true" style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.1em', marginBottom: '-0.1em' }}>
                <span style={{
                  display: 'inline-block', whiteSpace: 'nowrap', fontStyle: serifish && i === lines.length - 1 ? 'italic' : 'normal',
                  transform: phase >= 1 ? 'translateY(0)' : 'translateY(110%)',
                  transition: noT ? 'none' : `transform 1300ms ${easeOut} ${phase === 1 ? Math.round(partDur * 0.32) + i * 110 : 0}ms`
                }}>{l}</span>
              </span>
            ))}
          </h1>
          <p style={{ margin: compact ? '16px 0 0' : '28px 0 0', maxWidth: 400, fontSize: compact ? 14 : 15, lineHeight: 1.55, color: muted, ...reveal(120) }}>{body}</p>
          <div style={{ marginTop: compact ? 20 : 32, display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap', ...reveal(220) }}>
            <a href="#" onClick={(e) => e.preventDefault()} className={`${p}-cta`} style={{
              display: 'inline-flex', alignItems: 'center', gap: 10, height: 46, padding: '0 22px', borderRadius: 999, background: accent, color: bg,
              border: `1px solid ${accent}`, textDecoration: 'none', fontSize: 13, letterSpacing: '0.02em', whiteSpace: 'nowrap'
            }}>
              {ctaLabel}
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M2 7 H12 M8 3 L12 7 L8 11" fill="none" stroke="currentColor" strokeWidth="1.2" /></svg>
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} className={`${p}-link`} style={{ color: ink, textDecoration: 'none', fontSize: 13, paddingBottom: 3 }}>{secondaryLabel}</a>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, minHeight: showCard ? cardH : 0, marginTop: compact ? 'auto' : 0, ...reveal(320) }}>
          {showReplay ? (
            <button type="button" onClick={() => { setSnap(true); setPhase(0); setRun((r) => r + 1); }} className={`${p}-replay`} aria-label="Replay opening animation"
              style={{ ...btnReset, display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: muted }}>
              <span style={{ width: 34, height: 34, borderRadius: '50%', border: `1px solid ${muted}80`, display: 'inline-grid', placeItems: 'center', color: ink }}>
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M2.5 7 A4.5 4.5 0 1 0 4 3.6" fill="none" stroke="currentColor" strokeWidth="1.2" /><path d="M1.8 1.6 L4.2 3.7 L1.6 5" fill="none" stroke="currentColor" strokeWidth="1.2" /></svg>
              </span>
              {replayLabel}
            </button>
          ) : <span />}
          {showCard && (
            <div style={{ width: cardW, paddingRight: 0, textAlign: 'right' }}>
              <div style={{ height: cardH - 22 }} />
              <div style={{ fontSize: 11, letterSpacing: '0.06em', color: muted }} />
            </div>
          )}
        </div>
      </div>

      {showCard && (
        <div aria-hidden="true" style={{
          position: 'absolute', zIndex: 6, left: card.x, top: card.y + card.h + 8, width: card.w, textAlign: 'right', fontSize: 11, letterSpacing: '0.06em', color: muted,
          ...reveal(420)
        }}>{cardCaption}</div>
      )}
    </section>
  );
}

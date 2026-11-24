const MANIFEST = {
  "type": "Hero.StoryReel",
  "description": "Stories-style full-bleed hero: segmented progress bars fill per slide, each photo drifts in a slow Ken Burns, titles rise line by line through a mask, and the next image wipes in through an inset clip while scaling down into frame as the outgoing one darkens. Tap sides to skip, press and hold to pause",
  "editorElement": {
    "selector": ".hero-story-reel",
    "displayName": "Story Reel",
    "archetype": "container",
    "data": {
      "brand": { "dataType": "text", "displayName": "Brand", "defaultValue": "Field Notes", "group": "Content" },
      "issue": { "dataType": "text", "displayName": "Issue Label", "defaultValue": "Vol. 04 — North", "group": "Content" },
      "titles": { "dataType": "text", "displayName": "Titles (comma separated, | for line break)", "defaultValue": "Morning|above Lysefjord,Mist over|the Quiraing,Red rock|at golden hour,Where the|forest falls,The sky|turns green", "group": "Content" },
      "locations": { "dataType": "text", "displayName": "Locations (comma separated)", "defaultValue": "Lysefjord / Norway,Isle of Skye / Scotland,Moab / Utah,Columbia Gorge / Oregon,Abisko / Lapland", "group": "Content" },
      "ctaLabel": { "dataType": "text", "displayName": "Link Label", "defaultValue": "Read the story", "group": "Content" },
      "hint": { "dataType": "text", "displayName": "Hint", "defaultValue": "Tap the sides to skip — hold to pause", "group": "Content" },
      "images": { "dataType": "text", "displayName": "Image URLs (comma separated)", "defaultValue": "https://picsum.photos/id/1015/1920/1200,https://picsum.photos/id/1018/1920/1200,https://picsum.photos/id/1016/1920/1200,https://picsum.photos/id/1039/1920/1200,https://picsum.photos/id/1022/1920/1200", "group": "Images" },
      "imageFilter": { "dataType": "select", "displayName": "Image Treatment", "defaultValue": "none", "options": ["none", "grayscale", "muted"], "group": "Images" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#0C0C0D", "group": "Colors" },
      "textColor": { "dataType": "color", "displayName": "Text", "defaultValue": "#FAFAF9", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#D6D3D1", "group": "Colors" },
      "barColor": { "dataType": "color", "displayName": "Progress Bar", "defaultValue": "#FAFAF9", "group": "Colors" },
      "displayFont": { "dataType": "select", "displayName": "Title Font", "defaultValue": "Instrument Serif", "options": ["Instrument Serif", "Fraunces", "Inter Tight", "system-ui"], "group": "Typography" },
      "titleSize": { "dataType": "select", "displayName": "Title Size (px)", "defaultValue": "112", "options": ["72", "88", "112", "136", "160"], "group": "Typography" },
      "titleWeight": { "dataType": "select", "displayName": "Title Weight", "defaultValue": "400", "options": ["300", "400", "500"], "group": "Typography" },
      "height": { "dataType": "select", "displayName": "Height", "defaultValue": "screen", "options": ["screen", "640", "720", "800"], "group": "Layout" },
      "scrim": { "dataType": "select", "displayName": "Legibility Scrim", "defaultValue": "medium", "options": ["none", "light", "medium", "strong"], "group": "Layout" },
      "showHint": { "dataType": "booleanValue", "displayName": "Show Hint", "defaultValue": "true", "group": "Layout" },
      "showCta": { "dataType": "booleanValue", "displayName": "Show Link", "defaultValue": "true", "group": "Layout" },
      "autoplay": { "dataType": "booleanValue", "displayName": "Autoplay", "defaultValue": "true", "group": "Animation" },
      "interval": { "dataType": "select", "displayName": "Slide Duration (s)", "defaultValue": "6", "options": ["4", "5", "6", "8", "10"], "group": "Animation" },
      "transitionDuration": { "dataType": "select", "displayName": "Wipe Duration (ms)", "defaultValue": "1200", "options": ["800", "1000", "1200", "1500"], "group": "Animation" },
      "kenBurns": { "dataType": "select", "displayName": "Ken Burns Strength", "defaultValue": "medium", "options": ["off", "subtle", "medium", "strong"], "group": "Animation" },
      "wipeShape": { "dataType": "select", "displayName": "Wipe Shape", "defaultValue": "inset", "options": ["inset", "straight"], "group": "Animation" },
      "outgoingDarken": { "dataType": "select", "displayName": "Outgoing Darken", "defaultValue": "0.6", "options": ["0.3", "0.45", "0.6", "0.75"], "group": "Animation" },
      "loop": { "dataType": "booleanValue", "displayName": "Loop", "defaultValue": "true", "group": "Animation" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const split = (s) => String(s || '').split(',').map((x) => x.trim()).filter(Boolean);
  const brand = config?.brand || 'Field Notes';
  const issue = config?.issue || 'Vol. 04 — North';
  const titles = split(config?.titles || 'Morning|above Lysefjord,Mist over|the Quiraing,Red rock|at golden hour,Where the|forest falls,The sky|turns green');
  const locations = split(config?.locations || 'Lysefjord / Norway,Isle of Skye / Scotland,Moab / Utah,Columbia Gorge / Oregon,Abisko / Lapland');
  const ctaLabel = config?.ctaLabel || 'Read the story';
  const hint = config?.hint || 'Tap the sides to skip — hold to pause';
  const images = split(config?.images || 'https://picsum.photos/id/1015/1920/1200,https://picsum.photos/id/1018/1920/1200,https://picsum.photos/id/1016/1920/1200,https://picsum.photos/id/1039/1920/1200,https://picsum.photos/id/1022/1920/1200');
  const imageFilter = config?.imageFilter || 'none';
  const bg = config?.backgroundColor || '#0C0C0D';
  const text = config?.textColor || '#FAFAF9';
  const muted = config?.mutedColor || '#D6D3D1';
  const barColor = config?.barColor || '#FAFAF9';
  const displayFont = config?.displayFont || 'Instrument Serif';
  const titleSize = parseInt(config?.titleSize || '112', 10) || 112;
  const titleWeight = config?.titleWeight || '400';
  const heightMode = config?.height || 'screen';
  const scrimA = { none: 0, light: 0.3, medium: 0.5, strong: 0.7 }[config?.scrim || 'medium'] ?? 0.5;
  const showHint = bool(config?.showHint, true);
  const showCta = bool(config?.showCta, true);
  const autoplay = bool(config?.autoplay, true);
  const interval = (parseFloat(config?.interval || '6') || 6) * 1000;
  const dur = parseInt(config?.transitionDuration || '1200', 10) || 1200;
  const kb = { off: 0, subtle: 0.06, medium: 0.12, strong: 0.2 }[config?.kenBurns || 'medium'] ?? 0.12;
  const insetWipe = (config?.wipeShape || 'inset') === 'inset';
  const darken = parseFloat(config?.outgoingDarken || '0.6') || 0.6;
  const loop = bool(config?.loop, true);

  const count = images.length;
  const uid = React.useMemo(() => 'sr' + Math.random().toString(36).slice(2, 9), []);
  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  const rootRef = React.useRef(null);
  const holdTimer = React.useRef(0);
  const press = React.useRef(null);
  const [width, setWidth] = React.useState(1280);
  const [stageH, setStageH] = React.useState(720);
  const [cur, setCur] = React.useState(0);
  const [prev, setPrev] = React.useState(-1);
  const [dir, setDir] = React.useState(1);
  const [tick, setTick] = React.useState(0);
  const [holding, setHolding] = React.useState(false);
  const [userPaused, setUserPaused] = React.useState(false);
  const [visible, setVisible] = React.useState(true);
  const [ended, setEnded] = React.useState(false);

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
    const io = typeof IntersectionObserver !== 'undefined' ? new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.2 }) : null;
    if (io) io.observe(el);
    return () => { if (ro) ro.disconnect(); if (io) io.disconnect(); window.removeEventListener('resize', measure); };
  }, []);

  React.useEffect(() => {
    if (prev < 0) return undefined;
    const t = setTimeout(() => setPrev(-1), reduced ? 0 : dur + 120);
    return () => clearTimeout(t);
  }, [prev, tick, dur, reduced]);

  React.useEffect(() => () => clearTimeout(holdTimer.current), []);

  const go = React.useCallback((n, d) => {
    if (count < 2) return;
    if (!loop && (n < 0 || n >= count)) { if (n >= count) setEnded(true); return; }
    const nn = ((n % count) + count) % count;
    setEnded(false);
    setCur((c) => {
      if (nn === c) return c;
      setPrev(reduced ? -1 : c);
      setDir(d);
      setTick((t) => t + 1);
      return nn;
    });
  }, [count, loop, reduced]);

  const paused = holding || userPaused || !visible || !autoplay || ended;

  const onPointerDown = (e) => {
    if (e.target.closest && e.target.closest('a,button')) return;
    press.current = { x: e.clientX, t: performance.now() };
    clearTimeout(holdTimer.current);
    holdTimer.current = setTimeout(() => setHolding(true), 220);
  };
  const endPress = (e, cancel) => {
    clearTimeout(holdTimer.current);
    const pr = press.current;
    press.current = null;
    if (holding) { setHolding(false); return; }
    if (!pr || cancel) return;
    const r = rootRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / (r.width || 1);
    if (x < 0.5) go(cur - 1, -1); else go(cur + 1, 1);
  };
  const onKey = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(cur + 1, 1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); go(cur - 1, -1); }
    else if (e.key === ' ' || e.key === 'Spacebar') { e.preventDefault(); setUserPaused((v) => !v); }
  };

  const compact = width < 760;
  const H = heightMode === 'screen' ? Math.max(compact ? 600 : 560, stageH) : parseInt(heightMode, 10) || 720;
  const pad = compact ? 18 : 40;
  const ease = 'cubic-bezier(0.22, 1, 0.36, 1)';
  const ease2 = 'cubic-bezier(0.76, 0, 0.24, 1)';
  const sans = '"Inter", -apple-system, "Helvetica Neue", Arial, sans-serif';
  const display = displayFont === 'system-ui' ? sans
    : displayFont === 'Inter Tight' ? '"Inter Tight", "Inter", -apple-system, sans-serif'
    : `"${displayFont}", "Iowan Old Style", Georgia, serif`;
  const serifish = displayFont === 'Instrument Serif' || displayFont === 'Fraunces';
  const filterCss = imageFilter === 'grayscale' ? 'grayscale(1) contrast(1.05)' : imageFilter === 'muted' ? 'saturate(0.6) contrast(0.96)' : 'none';
  const pad2 = (n) => String(n).padStart(2, '0');
  const p = uid;
  const play = paused ? 'paused' : 'running';
  const kbDur = interval + dur + 800;
  const tSize = Math.round(Math.min(compact ? width * 0.15 : titleSize, H * 0.17));
  const titleFor = (i) => titles[i % Math.max(1, titles.length)] || `Story ${i + 1}`;
  const lines = titleFor(cur).split('|').map((l) => l.trim()).filter(Boolean);
  const loc = locations[cur % Math.max(1, locations.length)] || '';
  const wipeFrom = insetWipe
    ? (dir > 0 ? 'inset(14% 0% 14% 100% round 28px)' : 'inset(14% 100% 14% 0% round 28px)')
    : (dir > 0 ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)');
  const wipeTo = insetWipe ? 'inset(0% 0% 0% 0% round 0px)' : 'inset(0% 0% 0% 0%)';
  const btnReset = { appearance: 'none', border: 'none', background: 'transparent', padding: 0, margin: 0, font: 'inherit', color: 'inherit', cursor: 'pointer' };
  const kbs = [
    ['scale(1) translate(0%, 0%)', `scale(${1 + kb}) translate(-2%, -1%)`],
    [`scale(${1 + kb}) translate(2%, 1%)`, 'scale(1) translate(0%, 0%)'],
    ['scale(1) translate(0%, 0%)', `scale(${1 + kb}) translate(2%, -1.5%)`],
    [`scale(${1 + kb}) translate(-1.5%, 1%)`, 'scale(1.02) translate(0%, 0%)']
  ];

  if (!count) {
    return (
      <section className="hero-story-reel" style={{ width: '100%', height: 480, background: bg, color: muted, display: 'grid', placeItems: 'center', fontFamily: sans, fontSize: 13 }}>
        Add image URLs to start the reel
      </section>
    );
  }

  return (
    <section
      ref={rootRef}
      className={`hero-story-reel ${p}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={`${brand} — ${issue}`}
      tabIndex={0}
      onKeyDown={onKey}
      onPointerDown={onPointerDown}
      onPointerUp={(e) => endPress(e, false)}
      onPointerCancel={(e) => endPress(e, true)}
      onPointerLeave={(e) => { if (press.current || holding) endPress(e, true); }}
      onContextMenu={(e) => e.preventDefault()}
      style={{ position: 'relative', width: '100%', height: H, overflow: 'hidden', background: bg, color: text, fontFamily: sans, outline: 'none', userSelect: 'none', WebkitUserSelect: 'none', WebkitTouchCallout: 'none', touchAction: 'pan-y', cursor: 'pointer', isolation: 'isolate' }}
    >
      <style>{`
        @keyframes ${p}-wipe { from { clip-path: ${wipeFrom}; } to { clip-path: ${wipeTo}; } }
        @keyframes ${p}-settle { from { transform: scale(1.15); } to { transform: scale(1); } }
        @keyframes ${p}-out { from { filter: brightness(1); transform: scale(1); } to { filter: brightness(${1 - darken}); transform: scale(1.04) translateX(${dir > 0 ? -3 : 3}%); } }
        ${kbs.map((k, i) => `@keyframes ${p}-kb${i} { from { transform: ${k[0]}; } to { transform: ${k[1]}; } }`).join('\n')}
        @keyframes ${p}-rise { from { transform: translateY(112%); } to { transform: translateY(0); } }
        @keyframes ${p}-fade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        @keyframes ${p}-bar { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        .${p}:focus-visible { box-shadow: inset 0 0 0 2px ${text}; }
        .${p} a:focus-visible, .${p} button:focus-visible { outline: 2px solid ${text}; outline-offset: 3px; }
        .${p} .${p}-cta { transition: gap .4s ${ease}; }
        .${p} .${p}-cta:hover { gap: 18px; }
        @media (prefers-reduced-motion: reduce) { .${p} *:not(.${p}-timer) { animation: none !important; transition: none !important; } }
      `}</style>

      <div aria-hidden="true" style={{ position: 'absolute', inset: 0 }}>
        {images.map((src, i) => {
          const role = i === cur ? 'cur' : i === prev ? 'prev' : 'idle';
          const first = tick === 0;
          return (
            <div key={i} style={{
              position: 'absolute', inset: 0, overflow: 'hidden', zIndex: role === 'cur' ? 3 : role === 'prev' ? 2 : 1,
              visibility: role === 'idle' ? 'hidden' : 'visible',
              animation: reduced || role !== 'cur' || first ? 'none' : `${p}-wipe ${dur}ms ${ease2} both`
            }}>
              <div style={{ position: 'absolute', inset: 0, animation: role === 'prev' && !reduced ? `${p}-out ${dur}ms ${ease2} both` : 'none' }}>
                <div style={{ position: 'absolute', inset: 0, animation: role === 'cur' && !reduced ? `${p}-settle ${first ? 1800 : dur + 300}ms ${ease} both` : 'none' }}>
                  <div style={{
                    position: 'absolute', inset: 0,
                    animationName: role !== 'idle' && !reduced && kb > 0 ? `${p}-kb${i % kbs.length}` : 'none',
                    animationDuration: `${kbDur}ms`, animationTimingFunction: 'cubic-bezier(.33,0,.67,1)', animationFillMode: 'both',
                    animationPlayState: role === 'cur' ? play : 'running'
                  }}>
                    <img src={src} alt="" draggable="false" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: filterCss, pointerEvents: 'none' }} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {scrimA > 0 && (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 4, pointerEvents: 'none',
            background: `linear-gradient(180deg, rgba(0,0,0,${scrimA * 0.7}) 0%, rgba(0,0,0,0) 20%, rgba(0,0,0,0) 38%, rgba(0,0,0,${scrimA * 0.55}) 70%, rgba(0,0,0,${scrimA * 1.1}) 100%)`
          }} />
        )}
      </div>
      <img src={images[cur]} alt={lines.join(' ') + (loc ? ` — ${loc}` : '')} style={{ position: 'absolute', width: 1, height: 1, opacity: 0, pointerEvents: 'none' }} />

      <div style={{ position: 'absolute', inset: 0, zIndex: 5, pointerEvents: 'none', opacity: holding ? 0.25 : 1, transition: `opacity 500ms ${ease}` }}>
        <div style={{ position: 'absolute', top: pad * 0.6, left: pad, right: pad }}>
          <div role="tablist" aria-label="Stories" style={{ display: 'flex', gap: compact ? 4 : 6, pointerEvents: 'auto' }}>
            {images.map((_, i) => (
              <button key={i} type="button" role="tab" aria-selected={i === cur} aria-label={`Story ${i + 1}: ${titleFor(i).replace(/\|/g, ' ')}`}
                onClick={() => go(i, i >= cur ? 1 : -1)}
                style={{ ...btnReset, flex: 1, height: 16, display: 'flex', alignItems: 'center' }}>
                <span style={{ position: 'relative', display: 'block', width: '100%', height: 2, borderRadius: 2, overflow: 'hidden', background: `${barColor}40` }}>
                  {i < cur && <span style={{ position: 'absolute', inset: 0, background: barColor }} />}
                  {i === cur && (
                    <span key={`b${cur}-${tick}`} className={`${p}-timer`} onAnimationEnd={() => go(cur + 1, 1)} style={{
                      position: 'absolute', inset: 0, background: barColor, transformOrigin: 'left',
                      animationName: autoplay ? `${p}-bar` : 'none', animationDuration: `${interval}ms`, animationTimingFunction: 'linear', animationFillMode: 'both',
                      transform: autoplay ? undefined : 'scaleX(0.04)', animationPlayState: play
                    }} />
                  )}
                </span>
              </button>
            ))}
          </div>
          <div style={{ marginTop: compact ? 12 : 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, animation: reduced ? 'none' : `${p}-fade 800ms ${ease} 150ms both` }}>
              <span style={{ width: 30, height: 30, borderRadius: '50%', border: `1px solid ${text}80`, display: 'inline-grid', placeItems: 'center', fontFamily: display, fontSize: 15, fontStyle: serifish ? 'italic' : 'normal' }}>{brand.charAt(0)}</span>
              <span style={{ fontSize: 13, fontWeight: 500 }}>{brand}</span>
              {!compact && <span style={{ fontSize: 13, color: muted, opacity: 0.8 }}>{issue}</span>}
            </div>
            <button type="button" onClick={() => setUserPaused((v) => !v)} aria-label={userPaused ? 'Play stories' : 'Pause stories'} aria-pressed={userPaused}
              style={{ ...btnReset, pointerEvents: 'auto', width: 34, height: 34, borderRadius: '50%', display: 'inline-grid', placeItems: 'center', background: 'rgba(0,0,0,0.18)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}>
              {userPaused || !autoplay
                ? <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 1.5 L10.5 6 L3 10.5 Z" fill="currentColor" /></svg>
                : <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><rect x="2.5" y="1.5" width="2" height="9" fill="currentColor" /><rect x="7.5" y="1.5" width="2" height="9" fill="currentColor" /></svg>}
            </button>
          </div>
        </div>

        <div style={{ position: 'absolute', left: pad, right: pad, bottom: pad, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24 }}>
          <div key={`t${tick}`} style={{ minWidth: 0 }} aria-live="polite">
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: compact ? 10 : 16, fontSize: compact ? 11 : 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: text, textShadow: '0 1px 12px rgba(0,0,0,0.35)', animation: reduced ? 'none' : `${p}-fade 900ms ${ease} ${tick === 0 ? 250 : Math.round(dur * 0.45)}ms both` }}>
              <span style={{ color: text, fontVariantNumeric: 'tabular-nums' }}>{pad2(cur + 1)} / {pad2(count)}</span>
              <span style={{ width: 24, height: 1, background: `${text}99` }} />
              <span>{loc}</span>
            </div>
            <h1 aria-label={lines.join(' ')} style={{ margin: 0, fontFamily: display, fontWeight: titleWeight, fontSize: tSize, lineHeight: 0.95, letterSpacing: serifish ? '-0.02em' : '-0.045em' }}>
              {lines.map((l, i) => (
                <span key={i} aria-hidden="true" style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.1em', marginBottom: '-0.1em' }}>
                  <span style={{
                    display: 'inline-block', whiteSpace: 'nowrap', fontStyle: serifish && i === lines.length - 1 ? 'italic' : 'normal',
                    animation: reduced ? 'none' : `${p}-rise 1100ms ${ease} ${(tick === 0 ? 150 : Math.round(dur * 0.38)) + i * 110}ms both`
                  }}>{l}</span>
                </span>
              ))}
            </h1>
          </div>
          {!compact && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 18, flexShrink: 0, paddingBottom: 6, animation: reduced ? 'none' : `${p}-fade 900ms ${ease} 600ms both` }}>
              {showCta && (
                <a href="#" onClick={(e) => e.preventDefault()} className={`${p}-cta`} style={{ pointerEvents: 'auto', display: 'inline-flex', alignItems: 'center', gap: 10, color: text, textDecoration: 'none', fontSize: 14, borderBottom: `1px solid ${text}66`, paddingBottom: 6 }}>
                  {ctaLabel}
                  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M2 7 H12 M8 3 L12 7 L8 11" fill="none" stroke="currentColor" strokeWidth="1.2" /></svg>
                </a>
              )}
              {showHint && <div style={{ fontSize: 12, color: muted, opacity: 0.75 }}>{hint}</div>}
            </div>
          )}
        </div>
      </div>

      <div aria-hidden="true" style={{
        position: 'absolute', left: '50%', top: '50%', zIndex: 6, transform: `translate(-50%, -50%) scale(${holding || userPaused ? 1 : 0.85})`,
        opacity: holding || userPaused ? 1 : 0, transition: `opacity 400ms ${ease}, transform 500ms ${ease}`, pointerEvents: 'none',
        padding: '10px 18px', borderRadius: 999, background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
        fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 10
      }}>
        <svg width="10" height="10" viewBox="0 0 12 12"><rect x="2.5" y="1.5" width="2" height="9" fill="currentColor" /><rect x="7.5" y="1.5" width="2" height="9" fill="currentColor" /></svg>
        Paused
      </div>
    </section>
  );
}

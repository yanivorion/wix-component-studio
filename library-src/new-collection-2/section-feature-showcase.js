const MANIFEST = {
  "type": "Section.FeatureShowcase",
  "description": "Feature list beside a large rounded media frame: the active feature expands with a filling progress bar while its photograph arrives through a soft blur crossfade and slow zoom, and a floating stat card springs to a new position with its figure sliding through a mask; auto-advance, click and keys, media on top on mobile",
  "editorElement": {
    "selector": ".feature-showcase",
    "displayName": "Feature Showcase",
    "archetype": "container",
    "data": {
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "The house, in detail", "group": "Content" },
      "title": { "dataType": "text", "displayName": "Title", "defaultValue": "Built to feel calm for a hundred years.", "group": "Content" },
      "f1Title": { "dataType": "text", "displayName": "Feature 1 Title", "defaultValue": "Passive climate", "group": "Features" },
      "f1Text": { "dataType": "text", "displayName": "Feature 1 Text", "defaultValue": "Thick walls, deep reveals and cross-ventilation hold every room near 21° with almost no machinery.", "group": "Features" },
      "f1Stat": { "dataType": "text", "displayName": "Feature 1 Stat", "defaultValue": "−62%", "group": "Features" },
      "f1Label": { "dataType": "text", "displayName": "Feature 1 Stat Label", "defaultValue": "Heating demand against code", "group": "Features" },
      "f2Title": { "dataType": "text", "displayName": "Feature 2 Title", "defaultValue": "Daylight first", "group": "Features" },
      "f2Text": { "dataType": "text", "displayName": "Feature 2 Text", "defaultValue": "Each room is planned around the path of the sun, so the lamps stay off until dusk.", "group": "Features" },
      "f2Stat": { "dataType": "text", "displayName": "Feature 2 Stat", "defaultValue": "9.4 h", "group": "Features" },
      "f2Label": { "dataType": "text", "displayName": "Feature 2 Stat Label", "defaultValue": "Average daily daylight", "group": "Features" },
      "f3Title": { "dataType": "text", "displayName": "Feature 3 Title", "defaultValue": "Honest materials", "group": "Features" },
      "f3Text": { "dataType": "text", "displayName": "Feature 3 Text", "defaultValue": "Lime, oak and stone that patina instead of wearing out, and can always be repaired by hand.", "group": "Features" },
      "f3Stat": { "dataType": "text", "displayName": "Feature 3 Stat", "defaultValue": "100 yr", "group": "Features" },
      "f3Label": { "dataType": "text", "displayName": "Feature 3 Stat Label", "defaultValue": "Design life of the envelope", "group": "Features" },
      "f4Title": { "dataType": "text", "displayName": "Feature 4 Title", "defaultValue": "Acoustic calm", "group": "Features" },
      "f4Text": { "dataType": "text", "displayName": "Feature 4 Text", "defaultValue": "Layered timber and wool absorb the city. Bedrooms measure quieter than a reading room.", "group": "Features" },
      "f4Stat": { "dataType": "text", "displayName": "Feature 4 Stat", "defaultValue": "24 dB", "group": "Features" },
      "f4Label": { "dataType": "text", "displayName": "Feature 4 Stat Label", "defaultValue": "Night-time bedroom level", "group": "Features" },
      "f5Title": { "dataType": "text", "displayName": "Feature 5 Title", "defaultValue": "Gardens in reach", "group": "Features" },
      "f5Text": { "dataType": "text", "displayName": "Feature 5 Text", "defaultValue": "Every floor opens onto planted terraces that gather rain and keep the façade cool.", "group": "Features" },
      "f5Stat": { "dataType": "text", "displayName": "Feature 5 Stat", "defaultValue": "320 m²", "group": "Features" },
      "f5Label": { "dataType": "text", "displayName": "Feature 5 Stat Label", "defaultValue": "Of planted terraces", "group": "Features" },
      "images": { "dataType": "text", "displayName": "Images (comma separated)", "defaultValue": "https://picsum.photos/id/942/1400/1600,https://picsum.photos/id/1067/1400/1600,https://picsum.photos/id/946/1400/1600,https://picsum.photos/id/230/1400/1600,https://picsum.photos/id/1029/1400/1600", "group": "Images" },
      "imageFilter": { "dataType": "select", "displayName": "Image Treatment", "defaultValue": "none", "options": ["none", "grayscale", "muted"], "group": "Images" },
      "autoAdvance": { "dataType": "booleanValue", "displayName": "Auto Advance", "defaultValue": "true", "group": "Animation" },
      "interval": { "dataType": "select", "displayName": "Feature Duration (s)", "defaultValue": "6", "options": ["4", "6", "8", "10"], "group": "Animation" },
      "pauseOnHover": { "dataType": "booleanValue", "displayName": "Pause On Hover", "defaultValue": "true", "group": "Animation" },
      "cardSpring": { "dataType": "select", "displayName": "Card Spring", "defaultValue": "lively", "options": ["gentle", "lively", "bouncy"], "group": "Animation" },
      "showCard": { "dataType": "booleanValue", "displayName": "Stat Card", "defaultValue": "true", "group": "Layout" },
      "mediaRadius": { "dataType": "select", "displayName": "Media Radius (px)", "defaultValue": "28", "options": ["0", "12", "20", "28", "40"], "group": "Layout" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#FAFAF9", "group": "Colors" },
      "surfaceColor": { "dataType": "color", "displayName": "Card Surface", "defaultValue": "#FFFFFF", "group": "Colors" },
      "textColor": { "dataType": "color", "displayName": "Text", "defaultValue": "#1C1917", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#78716C", "group": "Colors" },
      "lineColor": { "dataType": "color", "displayName": "Lines", "defaultValue": "#E7E5E4", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Progress", "defaultValue": "#1C1917", "group": "Colors" },
      "titleFont": { "dataType": "select", "displayName": "Display Font", "defaultValue": "Instrument Serif", "options": ["Instrument Serif", "Fraunces", "Inter Tight", "system-ui"], "group": "Typography" },
      "titleSize": { "dataType": "select", "displayName": "Title Size (px)", "defaultValue": "52", "options": ["40", "46", "52", "60"], "group": "Typography" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const defaults = [
    ['Passive climate', 'Thick walls, deep reveals and cross-ventilation hold every room near 21° with almost no machinery.', '−62%', 'Heating demand against code'],
    ['Daylight first', 'Each room is planned around the path of the sun, so the lamps stay off until dusk.', '9.4 h', 'Average daily daylight'],
    ['Honest materials', 'Lime, oak and stone that patina instead of wearing out, and can always be repaired by hand.', '100 yr', 'Design life of the envelope'],
    ['Acoustic calm', 'Layered timber and wool absorb the city. Bedrooms measure quieter than a reading room.', '24 dB', 'Night-time bedroom level'],
    ['Gardens in reach', 'Every floor opens onto planted terraces that gather rain and keep the façade cool.', '320 m²', 'Of planted terraces']
  ];
  const images = String(config?.images || 'https://picsum.photos/id/942/1400/1600,https://picsum.photos/id/1067/1400/1600,https://picsum.photos/id/946/1400/1600,https://picsum.photos/id/230/1400/1600,https://picsum.photos/id/1029/1400/1600').split(',').map((s) => s.trim()).filter(Boolean);
  const features = defaults.map((d, i) => ({
    title: config?.[`f${i + 1}Title`] ?? d[0],
    text: config?.[`f${i + 1}Text`] ?? d[1],
    stat: config?.[`f${i + 1}Stat`] ?? d[2],
    label: config?.[`f${i + 1}Label`] ?? d[3],
    img: images.length ? images[i % images.length] : ''
  })).filter((f) => String(f.title || '').trim());

  const eyebrow = config?.eyebrow || 'The house, in detail';
  const title = config?.title || 'Built to feel calm for a hundred years.';
  const imageFilter = config?.imageFilter || 'none';
  const autoAdvance = bool(config?.autoAdvance, true);
  const interval = (parseFloat(config?.interval || '6') || 6) * 1000;
  const pauseOnHover = bool(config?.pauseOnHover, true);
  const spring = { gentle: { stiffness: 110, damping: 20 }, lively: { stiffness: 190, damping: 17 }, bouncy: { stiffness: 260, damping: 12 } }[config?.cardSpring || 'lively'] || { stiffness: 190, damping: 17 };
  const showCard = bool(config?.showCard, true);
  const radius = parseInt(config?.mediaRadius ?? '28', 10);
  const R = Number.isFinite(radius) ? radius : 28;
  const bg = config?.backgroundColor || '#FAFAF9';
  const surface = config?.surfaceColor || '#FFFFFF';
  const text = config?.textColor || '#1C1917';
  const muted = config?.mutedColor || '#78716C';
  const line = config?.lineColor || '#E7E5E4';
  const accent = config?.accentColor || '#1C1917';
  const titleFont = config?.titleFont || 'Instrument Serif';
  const titleSizeCfg = parseInt(config?.titleSize || '52', 10) || 52;

  const count = features.length;
  const uid = React.useMemo(() => 'fs' + Math.random().toString(36).slice(2, 9), []);
  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const rootRef = React.useRef(null);
  const frameRef = React.useRef(null);
  const cardRef = React.useRef(null);
  const tabRefs = React.useRef([]);
  const activeRef = React.useRef(0);
  const [width, setWidth] = React.useState(1280);
  const [stageH, setStageH] = React.useState(800);
  const [frame, setFrame] = React.useState({ w: 640, h: 620 });
  const [card, setCard] = React.useState({ w: 240, h: 110 });
  const [active, setActive] = React.useState(0);
  const [prev, setPrev] = React.useState(null);
  const [animKey, setAnimKey] = React.useState(0);
  const [dir, setDir] = React.useState(1);
  const [hover, setHover] = React.useState(false);
  const [inView, setInView] = React.useState(true);

  React.useEffect(() => {
    const fam = {
      'Instrument Serif': 'Instrument+Serif:ital@0;1',
      'Fraunces': 'Fraunces:opsz,wght@9..144,300;9..144,400',
      'Inter Tight': 'Inter+Tight:wght@300;400;500'
    };
    [fam[titleFont], 'Inter:wght@400;500'].filter(Boolean).forEach((f) => {
      const id = 'gf-' + f.replace(/[^a-z0-9]/gi, '').slice(0, 40);
      if (document.getElementById(id)) return;
      const l = document.createElement('link');
      l.id = id; l.rel = 'stylesheet';
      l.href = `https://fonts.googleapis.com/css2?family=${f}&display=swap`;
      document.head.appendChild(l);
    });
  }, [titleFont]);

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return undefined;
    const s = typeof getScrollContainer === 'function' ? getScrollContainer() : null;
    const scroller = s && s !== window && s.nodeType === 1 ? s : window;
    const measure = () => {
      setWidth(el.clientWidth || 1280);
      setStageH(scroller === window ? window.innerHeight : scroller.clientHeight);
      if (frameRef.current) setFrame({ w: frameRef.current.clientWidth, h: frameRef.current.clientHeight });
      if (cardRef.current) setCard({ w: cardRef.current.offsetWidth, h: cardRef.current.offsetHeight });
    };
    measure();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (ro) { ro.observe(el); if (frameRef.current) ro.observe(frameRef.current); if (cardRef.current) ro.observe(cardRef.current); }
    window.addEventListener('resize', measure);
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => { if (ro) ro.disconnect(); window.removeEventListener('resize', measure); io.disconnect(); };
  }, []);

  const go = React.useCallback((n) => {
    if (!count) return;
    const next = ((n % count) + count) % count;
    const c = activeRef.current;
    if (c === next) return;
    activeRef.current = next;
    setDir(next > c ? 1 : -1);
    setPrev(c);
    setAnimKey((k) => k + 1);
    setActive(next);
  }, [count]);

  React.useEffect(() => {
    if (prev === null) return undefined;
    const t = setTimeout(() => setPrev(null), 1300);
    return () => clearTimeout(t);
  }, [animKey, prev]);

  const onKey = (e) => {
    let n = null;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') n = active + 1;
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') n = active - 1;
    else if (e.key === 'Home') n = 0;
    else if (e.key === 'End') n = count - 1;
    if (n === null) return;
    e.preventDefault();
    const t = ((n % count) + count) % count;
    go(t);
    if (tabRefs.current[t]) tabRefs.current[t].focus();
  };

  const compact = width < 860;
  const pad = compact ? 20 : 56;
  const playing = autoAdvance && count > 1 && !reduced;
  const paused = (pauseOnHover && hover) || !inView;
  const titleSize = compact ? Math.round(titleSizeCfg * 0.72) : Math.round(Math.min(titleSizeCfg, width * 0.042));
  const sans = '"Inter", -apple-system, "Helvetica Neue", Arial, sans-serif';
  const display = titleFont === 'system-ui' ? sans
    : titleFont === 'Inter Tight' ? `"Inter Tight", ${sans}`
    : `"${titleFont}", "Iowan Old Style", Georgia, serif`;
  const isSerif = titleFont === 'Instrument Serif' || titleFont === 'Fraunces';
  const filterCss = imageFilter === 'grayscale' ? 'grayscale(1) contrast(1.05) ' : imageFilter === 'muted' ? 'saturate(0.6) ' : '';
  const mediaH = compact ? Math.round(Math.min(width * 1.0, 520)) : Math.round(Math.max(520, Math.min(700, stageH * 0.86)));
  const spots = [[0.06, 0.94], [0.94, 0.06], [0.94, 0.94], [0.06, 0.06], [0.5, 0.94]];
  const inset = compact ? 14 : 24;
  const spot = spots[active % spots.length];
  const cx = inset + (frame.w - card.w - inset * 2) * spot[0];
  const cy = inset + (frame.h - card.h - inset * 2) * spot[1];
  const pad2 = (n) => String(n).padStart(2, '0');
  const p = uid;
  const M = motion;
  const btnReset = { appearance: 'none', border: 'none', background: 'transparent', color: 'inherit', padding: 0, margin: 0, cursor: 'pointer', font: 'inherit', textAlign: 'left', width: '100%' };

  if (!count) {
    return (
      <section className="feature-showcase" style={{ width: '100%', padding: 64, background: bg, color: muted, fontFamily: sans, textAlign: 'center', fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
        Add a feature title to begin
      </section>
    );
  }

  const f = features[active];

  const mediaEl = (
    <div ref={frameRef} style={{ position: 'relative', width: '100%', height: mediaH, borderRadius: R, overflow: 'hidden', background: line, isolation: 'isolate' }}>
      {prev !== null && features[prev] && features[prev].img && (
        <img key={`o${animKey}`} src={features[prev].img} alt="" draggable="false" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: filterCss || 'none', animation: reduced ? 'none' : `${p}-out 1100ms cubic-bezier(0.33,1,0.68,1) both` }} />
      )}
      {f.img && (
        <img key={`i${animKey}`} src={f.img} alt={f.title} draggable="false" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: filterCss || 'none', animation: reduced ? 'none' : `${p}-in ${prev === null ? 1400 : 1200}ms cubic-bezier(0.22,1,0.36,1) both` }} />
      )}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.16) 100%)', pointerEvents: 'none' }} />
      {showCard && (
        <M.div ref={cardRef} aria-live="polite" initial={reduced ? false : { x: cx, y: cy + 40, opacity: 0 }}
          animate={{ x: cx, y: cy, opacity: 1, rotate: reduced ? 0 : [0, dir * -(2.5 + (animKey % 2) * 0.01), 0] }}
          transition={reduced ? { duration: 0 } : {
            x: { type: 'spring', stiffness: spring.stiffness, damping: spring.damping },
            y: { type: 'spring', stiffness: spring.stiffness, damping: spring.damping },
            opacity: { duration: 0.6, delay: 0.3 },
            rotate: { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
          }}
          key="card"
          style={{ position: 'absolute', top: 0, left: 0, zIndex: 2, minWidth: compact ? 168 : 220, maxWidth: compact ? 210 : 260, padding: compact ? '14px 16px' : '18px 22px 20px', borderRadius: compact ? 14 : 18, background: surface, color: text, boxShadow: '0 1px 2px rgba(28,25,23,0.06), 0 18px 40px -12px rgba(28,25,23,0.28)' }}>
          <div style={{ overflow: 'hidden' }}>
            <div key={`v${animKey}`} style={{ fontFamily: display, fontSize: compact ? 32 : 44, lineHeight: 1, letterSpacing: isSerif ? '-0.01em' : '-0.03em', paddingBottom: 4, animation: reduced ? 'none' : `${p}-mask 800ms cubic-bezier(0.22,1,0.36,1) 220ms both` }}>{f.stat}</div>
          </div>
          <div style={{ overflow: 'hidden', marginTop: compact ? 4 : 6 }}>
            <div key={`l${animKey}`} style={{ fontSize: compact ? 12 : 13, lineHeight: 1.4, color: muted, animation: reduced ? 'none' : `${p}-mask 800ms cubic-bezier(0.22,1,0.36,1) 300ms both` }}>{f.label}</div>
          </div>
        </M.div>
      )}
    </div>
  );

  const list = (
    <div role="tablist" aria-label={eyebrow} aria-orientation="vertical" onKeyDown={onKey} style={{ borderBottom: `1px solid ${line}` }}>
      {features.map((it, i) => {
        const on = i === active;
        return (
          <div key={i} style={{ borderTop: `1px solid ${line}` }}>
            <button ref={(el) => { tabRefs.current[i] = el; }} role="tab" aria-selected={on} tabIndex={on ? 0 : -1} aria-controls={`${p}-panel-${i}`} id={`${p}-tab-${i}`}
              className={`${p}-tab`} onClick={() => go(i)}
              style={{ ...btnReset, display: 'block', padding: compact ? '16px 0 0' : '20px 0 0', minHeight: compact ? 52 : 62 }}>
              <span style={{ display: 'flex', alignItems: 'baseline', gap: compact ? 14 : 20 }}>
                <span style={{ fontSize: 12, letterSpacing: '0.08em', fontVariantNumeric: 'tabular-nums', color: on ? text : muted, minWidth: 18, transition: 'color 400ms ease' }}>{pad2(i + 1)}</span>
                <span className={`${p}-tt`} style={{ fontSize: compact ? 19 : 22, letterSpacing: '-0.015em', color: on ? text : muted, transition: 'color 400ms ease' }}>{it.title}</span>
              </span>
            </button>
            <div id={`${p}-panel-${i}`} role="tabpanel" aria-labelledby={`${p}-tab-${i}`} style={{ display: 'grid', paddingBottom: on ? (compact ? 18 : 22) : 0, gridTemplateRows: on ? '1fr' : '0fr', transition: reduced ? 'none' : 'grid-template-rows 650ms cubic-bezier(0.65,0,0.35,1), padding 650ms cubic-bezier(0.65,0,0.35,1)' }}>
                <div style={{ overflow: 'hidden', minHeight: 0 }}>
                  <span style={{ display: 'block', paddingLeft: compact ? 32 : 38, paddingTop: 2, fontSize: compact ? 15 : 16, lineHeight: 1.55, color: muted, maxWidth: 440, opacity: on ? 1 : 0, transform: on ? 'none' : 'translateY(8px)', transition: reduced ? 'none' : `opacity 500ms ease ${on ? 200 : 0}ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${on ? 150 : 0}ms` }}>
                    {it.text}
                  </span>
                  <span style={{ display: 'block', position: 'relative', marginLeft: compact ? 32 : 38, marginTop: 16, height: 2, borderRadius: 2, background: line, overflow: 'hidden' }}>
                    <span key={on ? `p${animKey}` : `x${i}`}
                      onAnimationEnd={on && playing ? () => go(active + 1) : undefined}
                      style={{ position: 'absolute', inset: 0, background: accent, transformOrigin: 'left', transform: on && !playing ? 'scaleX(1)' : 'scaleX(0)', animation: on && playing ? `${p}-fill ${interval}ms linear forwards` : 'none', animationPlayState: paused ? 'paused' : 'running' }} />
                  </span>
                </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const header = (
    <div style={{ marginBottom: compact ? 24 : 36, animation: reduced ? 'none' : `${p}-rise 900ms cubic-bezier(0.22,1,0.36,1) both` }}>
      <div style={{ fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: muted, marginBottom: compact ? 12 : 16 }}>{eyebrow}</div>
      <h2 style={{ margin: 0, fontFamily: display, fontWeight: 400, fontSize: titleSize, lineHeight: 1.04, letterSpacing: isSerif ? '-0.015em' : '-0.035em', maxWidth: 520, color: text }}>{title}</h2>
    </div>
  );

  return (
    <section
      ref={rootRef}
      className={`feature-showcase ${p}`}
      aria-label={eyebrow}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ position: 'relative', width: '100%', background: bg, color: text, fontFamily: sans, boxSizing: 'border-box', padding: `${compact ? 36 : 48}px ${pad}px`, overflow: 'hidden' }}
    >
      <style>{`
        @keyframes ${p}-in { from { opacity: 0; filter: ${filterCss}blur(22px); transform: scale(1.12); } to { opacity: 1; filter: ${filterCss}blur(0px); transform: scale(1); } }
        @keyframes ${p}-out { from { opacity: 1; filter: ${filterCss}blur(0px); transform: scale(1); } to { opacity: 0; filter: ${filterCss}blur(14px); transform: scale(1.04); } }
        @keyframes ${p}-mask { from { transform: translateY(105%); } to { transform: none; } }
        @keyframes ${p}-fill { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes ${p}-rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        .${p} button:focus-visible { outline: 2px solid ${text}; outline-offset: 4px; border-radius: 4px; }
        .${p} .${p}-tab:hover .${p}-tt { color: ${text} !important; }
        @media (prefers-reduced-motion: reduce) { .${p} * { animation: none !important; transition: none !important; } }
      `}</style>

      {compact ? (
        <>
          {header}
          <div style={{ marginBottom: 24 }}>{mediaEl}</div>
          {list}
        </>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: 'clamp(40px, 6vw, 88px)', alignItems: 'center' }}>
          <div>
            {header}
            {list}
          </div>
          {mediaEl}
        </div>
      )}
    </section>
  );
}

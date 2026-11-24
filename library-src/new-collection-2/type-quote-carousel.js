const MANIFEST = {
  "type": "Type.QuoteCarousel",
  "description": "Testimonial carousel set as large serif quotes: words blur out and drift away one by one while the next quote focuses in from below, the avatar morphs through a circular clip and the name and role swap behind a mask; segmented progress, arrows, keys, swipe and autoplay that pauses on hover",
  "editorElement": {
    "selector": ".quote-carousel",
    "displayName": "Quote Carousel",
    "archetype": "container",
    "data": {
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Kind words", "group": "Content" },
      "quote1": { "dataType": "text", "displayName": "Quote 1", "defaultValue": "They didn’t just design a house. They choreographed the light, and every morning still feels like the first one.", "group": "Quotes" },
      "name1": { "dataType": "text", "displayName": "Name 1", "defaultValue": "Elena Marsh", "group": "Quotes" },
      "role1": { "dataType": "text", "displayName": "Role 1", "defaultValue": "Owner, Saltmarsh House", "group": "Quotes" },
      "quote2": { "dataType": "text", "displayName": "Quote 2", "defaultValue": "The calmest project we have ever run. Decisions arrived before we knew we needed them.", "group": "Quotes" },
      "name2": { "dataType": "text", "displayName": "Name 2", "defaultValue": "Nadia Okafor", "group": "Quotes" },
      "role2": { "dataType": "text", "displayName": "Role 2", "defaultValue": "Director, Meridian Hotels", "group": "Quotes" },
      "quote3": { "dataType": "text", "displayName": "Quote 3", "defaultValue": "Guests stop at the threshold and go quiet. That pause is worth more than any review we could ever write.", "group": "Quotes" },
      "name3": { "dataType": "text", "displayName": "Name 3", "defaultValue": "Sofia Lindqvist", "group": "Quotes" },
      "role3": { "dataType": "text", "displayName": "Role 3", "defaultValue": "Founder, Halcyon Retreats", "group": "Quotes" },
      "quote4": { "dataType": "text", "displayName": "Quote 4", "defaultValue": "Precise without ever feeling cold. The details keep revealing themselves, years later.", "group": "Quotes" },
      "name4": { "dataType": "text", "displayName": "Name 4", "defaultValue": "James Whitlock", "group": "Quotes" },
      "role4": { "dataType": "text", "displayName": "Role 4", "defaultValue": "Curator, Northfield Museum", "group": "Quotes" },
      "quote5": { "dataType": "text", "displayName": "Quote 5", "defaultValue": "A rare studio that listens first and draws second. The result feels inevitable.", "group": "Quotes" },
      "name5": { "dataType": "text", "displayName": "Name 5", "defaultValue": "Amara Chen", "group": "Quotes" },
      "role5": { "dataType": "text", "displayName": "Role 5", "defaultValue": "Partner, Chen & Vale", "group": "Quotes" },
      "avatars": { "dataType": "text", "displayName": "Avatar URLs (comma separated)", "defaultValue": "https://picsum.photos/id/1027/240/240,https://picsum.photos/id/978/240/240,https://picsum.photos/id/64/240/240,https://picsum.photos/id/1005/240/240,https://picsum.photos/id/823/240/240", "group": "Images" },
      "autoplay": { "dataType": "booleanValue", "displayName": "Autoplay", "defaultValue": "true", "group": "Animation" },
      "interval": { "dataType": "select", "displayName": "Interval (s)", "defaultValue": "7", "options": ["5", "7", "9", "12"], "group": "Animation" },
      "pauseOnHover": { "dataType": "booleanValue", "displayName": "Pause On Hover", "defaultValue": "true", "group": "Animation" },
      "wordStagger": { "dataType": "select", "displayName": "Word Stagger (ms)", "defaultValue": "38", "options": ["20", "38", "55", "75"], "group": "Animation" },
      "blurAmount": { "dataType": "select", "displayName": "Blur (px)", "defaultValue": "14", "options": ["6", "10", "14", "20"], "group": "Animation" },
      "showArrows": { "dataType": "booleanValue", "displayName": "Arrows", "defaultValue": "true", "group": "Layout" },
      "showProgress": { "dataType": "booleanValue", "displayName": "Progress", "defaultValue": "true", "group": "Layout" },
      "showQuoteMark": { "dataType": "booleanValue", "displayName": "Quote Mark", "defaultValue": "true", "group": "Layout" },
      "align": { "dataType": "select", "displayName": "Alignment", "defaultValue": "left", "options": ["left", "center"], "group": "Layout" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#F5F5F4", "group": "Colors" },
      "textColor": { "dataType": "color", "displayName": "Text", "defaultValue": "#1C1917", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#78716C", "group": "Colors" },
      "lineColor": { "dataType": "color", "displayName": "Lines", "defaultValue": "#D6D3D1", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent", "defaultValue": "#A8A29E", "group": "Colors" },
      "quoteFont": { "dataType": "select", "displayName": "Quote Font", "defaultValue": "Instrument Serif", "options": ["Instrument Serif", "Fraunces", "Inter Tight", "system-ui"], "group": "Typography" },
      "quoteSize": { "dataType": "select", "displayName": "Quote Size (px)", "defaultValue": "64", "options": ["44", "52", "64", "76", "88"], "group": "Typography" },
      "quoteWeight": { "dataType": "select", "displayName": "Quote Weight", "defaultValue": "400", "options": ["300", "400", "500"], "group": "Typography" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const defaults = [
    ["They didn’t just design a house. They choreographed the light, and every morning still feels like the first one.", 'Elena Marsh', 'Owner, Saltmarsh House'],
    ['The calmest project we have ever run. Decisions arrived before we knew we needed them.', 'Nadia Okafor', 'Director, Meridian Hotels'],
    ['Guests stop at the threshold and go quiet. That pause is worth more than any review we could ever write.', 'Sofia Lindqvist', 'Founder, Halcyon Retreats'],
    ['Precise without ever feeling cold. The details keep revealing themselves, years later.', 'James Whitlock', 'Curator, Northfield Museum'],
    ['A rare studio that listens first and draws second. The result feels inevitable.', 'Amara Chen', 'Partner, Chen & Vale']
  ];
  const avatars = String(config?.avatars || 'https://picsum.photos/id/1027/240/240,https://picsum.photos/id/978/240/240,https://picsum.photos/id/64/240/240,https://picsum.photos/id/1005/240/240,https://picsum.photos/id/823/240/240').split(',').map((s) => s.trim()).filter(Boolean);
  const items = defaults.map((d, i) => ({
    quote: config?.[`quote${i + 1}`] ?? d[0],
    name: config?.[`name${i + 1}`] ?? d[1],
    role: config?.[`role${i + 1}`] ?? d[2],
    avatar: avatars.length ? avatars[i % avatars.length] : ''
  })).filter((it) => String(it.quote || '').trim());

  const eyebrow = config?.eyebrow || 'Kind words';
  const autoplay = bool(config?.autoplay, true);
  const interval = (parseFloat(config?.interval || '7') || 7) * 1000;
  const pauseOnHover = bool(config?.pauseOnHover, true);
  const staggerCfg = parseInt(config?.wordStagger || '38', 10) || 38;
  const blur = parseInt(config?.blurAmount || '14', 10) || 14;
  const showArrows = bool(config?.showArrows, true);
  const showProgress = bool(config?.showProgress, true);
  const showMark = bool(config?.showQuoteMark, true);
  const center = (config?.align || 'left') === 'center';
  const bg = config?.backgroundColor || '#F5F5F4';
  const text = config?.textColor || '#1C1917';
  const muted = config?.mutedColor || '#78716C';
  const line = config?.lineColor || '#D6D3D1';
  const accent = config?.accentColor || '#A8A29E';
  const quoteFont = config?.quoteFont || 'Instrument Serif';
  const quoteSizeCfg = parseInt(config?.quoteSize || '64', 10) || 64;
  const quoteWeight = config?.quoteWeight || '400';

  const count = items.length;
  const uid = React.useMemo(() => 'qc' + Math.random().toString(36).slice(2, 9), []);
  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  const rootRef = React.useRef(null);
  const inRef = React.useRef(null);
  const swipeRef = React.useRef(null);
  const busyRef = React.useRef(false);
  const curRef = React.useRef(0);
  const pendingRef = React.useRef(null);
  const doneTimer = React.useRef(0);
  const [width, setWidth] = React.useState(1280);
  const [stageH, setStageH] = React.useState(800);
  const [boxH, setBoxH] = React.useState(null);
  const [cur, setCur] = React.useState(0);
  const [prev, setPrev] = React.useState(null);
  const [dir, setDir] = React.useState(1);
  const [animKey, setAnimKey] = React.useState(0);
  const [hover, setHover] = React.useState(false);
  const [focusWithin, setFocusWithin] = React.useState(false);

  React.useEffect(() => {
    const fam = {
      'Instrument Serif': 'Instrument+Serif:ital@0;1',
      'Fraunces': 'Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,300',
      'Inter Tight': 'Inter+Tight:wght@300;400;500'
    };
    [fam[quoteFont], 'Inter:wght@400;500'].filter(Boolean).forEach((f) => {
      const id = 'gf-' + f.replace(/[^a-z0-9]/gi, '').slice(0, 40);
      if (document.getElementById(id)) return;
      const l = document.createElement('link');
      l.id = id; l.rel = 'stylesheet';
      l.href = `https://fonts.googleapis.com/css2?family=${f}&display=swap`;
      document.head.appendChild(l);
    });
  }, [quoteFont]);

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

  React.useEffect(() => {
    const el = inRef.current;
    if (!el) return undefined;
    const m = () => setBoxH(el.offsetHeight);
    m();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(m) : null;
    if (ro) ro.observe(el);
    return () => { if (ro) ro.disconnect(); };
  }, [cur, animKey]);

  React.useEffect(() => () => clearTimeout(doneTimer.current), []);

  const wordsOf = (q) => String(q || '').trim().split(/\s+/).filter(Boolean);
  const curWords = count ? wordsOf(items[cur].quote) : [];
  const prevWords = prev !== null && items[prev] ? wordsOf(items[prev].quote) : [];
  const stagOut = Math.min(staggerCfg * 0.5, 300 / Math.max(1, prevWords.length));
  const stagIn = Math.min(staggerCfg, 900 / Math.max(1, curWords.length));
  const outDur = 460;
  const inDur = 900;
  const inLead = prev !== null ? 360 : 120;
  const total = inLead + stagIn * Math.max(0, curWords.length - 1) + inDur;

  const go = React.useCallback((target, forcedDir) => {
    if (count < 2) return;
    const n = ((target % count) + count) % count;
    if (busyRef.current) { pendingRef.current = { n, d: forcedDir }; return; }
    const c = curRef.current;
    if (n === c) return;
    curRef.current = n;
    setDir(forcedDir || (n > c ? 1 : -1));
    if (!reduced) {
      busyRef.current = true;
      setPrev(c);
      setAnimKey((k) => k + 1);
    }
    setCur(n);
  }, [count, reduced]);

  React.useEffect(() => {
    if (prev === null) return undefined;
    clearTimeout(doneTimer.current);
    doneTimer.current = setTimeout(() => {
      busyRef.current = false;
      setPrev(null);
      const p = pendingRef.current;
      pendingRef.current = null;
      if (p) go(p.n, p.d);
    }, Math.min(total, 1500));
    return () => clearTimeout(doneTimer.current);
  }, [animKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const next = () => go(cur + 1, 1);
  const back = () => go(cur - 1, -1);
  const onKey = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); back(); }
  };
  const onPointerDown = (e) => { swipeRef.current = { x: e.clientX, y: e.clientY }; };
  const onPointerUp = (e) => {
    const s = swipeRef.current; swipeRef.current = null;
    if (!s) return;
    const dx = e.clientX - s.x;
    if (Math.abs(dx) > 44 && Math.abs(dx) > Math.abs(e.clientY - s.y)) (dx < 0 ? next : back)();
  };

  const compact = width < 760;
  const pad = compact ? 22 : 64;
  const qSize = compact ? Math.max(30, Math.round(quoteSizeCfg * 0.56)) : Math.round(Math.min(quoteSizeCfg, width * 0.058));
  const sans = '"Inter", -apple-system, "Helvetica Neue", Arial, sans-serif';
  const serif = quoteFont === 'system-ui' ? sans
    : quoteFont === 'Inter Tight' ? `"Inter Tight", ${sans}`
    : `"${quoteFont}", "Iowan Old Style", Georgia, serif`;
  const isSerif = quoteFont === 'Instrument Serif' || quoteFont === 'Fraunces';
  const minH = Math.max(compact ? 640 : 600, Math.min(stageH, 900));
  const playing = autoplay && count > 1 && !reduced;
  const paused = pauseOnHover && (hover || focusWithin);
  const pad2 = (n) => String(n).padStart(2, '0');
  const p = uid;

  const btn = { appearance: 'none', border: 'none', background: 'transparent', color: text, padding: 0, margin: 0, cursor: 'pointer', font: 'inherit', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' };
  const arrowBtn = { ...btn, width: compact ? 46 : 54, height: compact ? 46 : 54, borderRadius: '50%', border: `1px solid ${line}` };
  const arrow = (flip) => (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" style={{ transform: flip ? 'scaleX(-1)' : 'none' }}>
      <path d="M3 9 H15 M10 4 L15 9 L10 14" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );

  if (!count) {
    return (
      <section className="quote-carousel" style={{ width: '100%', padding: 64, background: bg, color: muted, fontFamily: sans, textAlign: 'center', fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
        Add a quote to begin
      </section>
    );
  }

  const it = items[cur];
  const pv = prev !== null ? items[prev] : null;
  const quoteText = (words, mode) => words.map((w, i) => {
    const anim = reduced ? 'none' : mode === 'in'
      ? `${p}-in ${inDur}ms cubic-bezier(0.22,1,0.36,1) ${Math.round(inLead + i * stagIn)}ms both`
      : `${p}-out ${outDur}ms cubic-bezier(0.55,0,0.75,0.3) ${Math.round(i * stagOut)}ms both`;
    return (
      <React.Fragment key={i}>
        <span style={{ display: 'inline-block', animation: anim, willChange: 'transform, filter, opacity' }}>{w}</span>
        {i < words.length - 1 ? ' ' : ''}
      </React.Fragment>
    );
  });
  const quoteStyle = {
    margin: 0, fontFamily: serif, fontWeight: quoteWeight, fontSize: qSize,
    lineHeight: isSerif ? 1.08 : 1.12, letterSpacing: isSerif ? '-0.012em' : '-0.03em',
    color: text, textAlign: center ? 'center' : 'left', textWrap: 'balance', '--d': dir
  };

  return (
    <section
      ref={rootRef}
      className={`quote-carousel ${p}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={eyebrow}
      tabIndex={0}
      onKeyDown={onKey}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setFocusWithin(true)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setFocusWithin(false); }}
      style={{ position: 'relative', width: '100%', minHeight: minH, boxSizing: 'border-box', padding: `${compact ? 32 : 56}px ${pad}px`, background: bg, color: text, fontFamily: sans, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: compact ? 36 : 48, overflow: 'hidden', outline: 'none', touchAction: 'pan-y', userSelect: 'none' }}
    >
      <style>{`
        @keyframes ${p}-in { from { opacity: 0; filter: blur(${blur}px); transform: translateY(calc(var(--d) * 0.55em)); } to { opacity: 1; filter: blur(0); transform: none; } }
        @keyframes ${p}-out { from { opacity: 1; filter: blur(0); transform: none; } to { opacity: 0; filter: blur(${blur}px); transform: translateY(calc(var(--d) * -0.4em)); } }
        @keyframes ${p}-av-in { from { clip-path: circle(0% at 50% 50%); transform: scale(1.25); } to { clip-path: circle(50% at 50% 50%); transform: scale(1); } }
        @keyframes ${p}-av-out { from { transform: scale(1); opacity: 1; } to { transform: scale(0.82); opacity: 0.2; } }
        @keyframes ${p}-mask-in { from { transform: translateY(calc(var(--d) * 105%)); } to { transform: none; } }
        @keyframes ${p}-mask-out { from { transform: none; } to { transform: translateY(calc(var(--d) * -105%)); } }
        @keyframes ${p}-fill { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes ${p}-rise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        .${p}:focus-visible { box-shadow: inset 0 0 0 2px ${accent}; }
        .${p} button:focus-visible { outline: 2px solid ${text}; outline-offset: 3px; }
        .${p} .${p}-arrow { transition: background .35s ease, color .35s ease, border-color .35s ease, transform .35s cubic-bezier(0.22,1,0.36,1); }
        .${p} .${p}-arrow:hover { background: ${text}; color: ${bg}; border-color: ${text}; }
        .${p} .${p}-arrow:active { transform: scale(0.94); }
        @media (prefers-reduced-motion: reduce) { .${p} * { animation: none !important; transition: none !important; } }
      `}</style>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontSize: compact ? 11 : 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: muted, animation: reduced ? 'none' : `${p}-rise 700ms cubic-bezier(0.22,1,0.36,1) both` }}>
        <span>{eyebrow}</span>
        <span aria-live="polite" style={{ fontVariantNumeric: 'tabular-nums' }}>
          <span style={{ color: text }}>{pad2(cur + 1)}</span>{'  —  '}{pad2(count)}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: compact || center ? '1fr' : `${Math.round(qSize * 1.5)}px 1fr`, gap: compact ? 12 : 24, alignItems: 'start', width: '100%', maxWidth: center ? 1080 : 'none', margin: center ? '0 auto' : 0 }}>
        {showMark && (
          <div aria-hidden="true" style={{ fontFamily: '"Instrument Serif", Georgia, serif', fontSize: compact ? qSize * 1.9 : qSize * 2.4, lineHeight: 0.7, color: accent, textAlign: center ? 'center' : 'left', height: compact ? qSize * 0.9 : 'auto', animation: reduced ? 'none' : `${p}-rise 900ms cubic-bezier(0.22,1,0.36,1) 80ms both` }}>&ldquo;</div>
        )}
        {!showMark && !compact && !center && <div />}
        <div style={{ position: 'relative', height: boxH ?? 'auto', transition: reduced ? 'none' : 'height 800ms cubic-bezier(0.65,0,0.35,1)', maxWidth: compact ? '100%' : 1040 }}>
          {pv && (
            <blockquote key={`o${animKey}`} aria-hidden="true" style={{ ...quoteStyle, position: 'absolute', top: 0, left: 0, right: 0, pointerEvents: 'none' }}>
              {quoteText(prevWords, 'out')}
            </blockquote>
          )}
          <blockquote key={`i${animKey}`} ref={inRef} aria-label={it.quote} style={quoteStyle}>
            <span aria-hidden="true">{quoteText(curWords, 'in')}</span>
          </blockquote>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: compact ? 'column' : 'row', alignItems: compact ? 'stretch' : 'center', justifyContent: 'space-between', gap: compact ? 24 : 32, paddingTop: compact ? 20 : 28, borderTop: `1px solid ${line}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, '--d': dir, justifyContent: center && !compact ? 'flex-start' : 'flex-start' }}>
          <div style={{ position: 'relative', width: compact ? 48 : 58, height: compact ? 48 : 58, borderRadius: '50%', overflow: 'hidden', background: line, flexShrink: 0 }}>
            {pv && pv.avatar && (
              <img key={`ao${animKey}`} src={pv.avatar} alt="" draggable="false" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', animation: reduced ? 'none' : `${p}-av-out 700ms cubic-bezier(0.65,0,0.35,1) both` }} />
            )}
            {it.avatar && (
              <img key={`ai${animKey}`} src={it.avatar} alt={it.name} draggable="false" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', animation: reduced || !pv ? 'none' : `${p}-av-in 900ms cubic-bezier(0.76,0,0.24,1) 120ms both` }} />
            )}
          </div>
          <div style={{ position: 'relative', overflow: 'hidden', lineHeight: 1.35, minWidth: 0 }}>
            {pv && (
              <div key={`no${animKey}`} aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, whiteSpace: 'nowrap' }}>
                <div style={{ overflow: 'hidden' }}><div style={{ fontSize: compact ? 15 : 16, fontWeight: 500, letterSpacing: '-0.01em', animation: reduced ? 'none' : `${p}-mask-out 600ms cubic-bezier(0.65,0,0.35,1) both` }}>{pv.name}</div></div>
                <div style={{ overflow: 'hidden' }}><div style={{ fontSize: compact ? 13 : 14, color: muted, animation: reduced ? 'none' : `${p}-mask-out 600ms cubic-bezier(0.65,0,0.35,1) 60ms both` }}>{pv.role}</div></div>
              </div>
            )}
            <div key={`ni${animKey}`} style={{ whiteSpace: 'nowrap' }}>
              <div style={{ overflow: 'hidden' }}><div style={{ fontSize: compact ? 15 : 16, fontWeight: 500, letterSpacing: '-0.01em', animation: reduced ? 'none' : `${p}-mask-in 800ms cubic-bezier(0.22,1,0.36,1) ${pv ? 260 : 200}ms both` }}>{it.name}</div></div>
              <div style={{ overflow: 'hidden' }}><div style={{ fontSize: compact ? 13 : 14, color: muted, animation: reduced ? 'none' : `${p}-mask-in 800ms cubic-bezier(0.22,1,0.36,1) ${pv ? 330 : 270}ms both` }}>{it.role}</div></div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: compact ? 'space-between' : 'flex-end', gap: compact ? 16 : 28 }}>
          {showProgress && count > 1 && (
            <div role="tablist" aria-label="Quotes" style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              {items.map((_, i) => (
                <button key={i} role="tab" aria-selected={i === cur} aria-label={`Quote ${i + 1} of ${count}`} onClick={() => go(i)}
                  style={{ ...btn, width: compact ? 26 : 36, height: 24 }}>
                  <span style={{ position: 'relative', display: 'block', width: '100%', height: 2, background: line, overflow: 'hidden', borderRadius: 2 }}>
                    {i < cur && <span style={{ position: 'absolute', inset: 0, background: text, opacity: 0.35 }} />}
                    {i === cur && (
                      <span key={`f${cur}-${animKey}`}
                        onAnimationEnd={playing ? () => next() : undefined}
                        style={{
                          position: 'absolute', inset: 0, background: text, transformOrigin: 'left',
                          transform: playing ? 'scaleX(0)' : 'scaleX(1)',
                          animation: playing ? `${p}-fill ${interval}ms linear forwards` : 'none',
                          animationPlayState: paused ? 'paused' : 'running'
                        }} />
                    )}
                  </span>
                </button>
              ))}
            </div>
          )}
          {showArrows && count > 1 && (
            <div style={{ display: 'flex', gap: 10 }}>
              <button className={`${p}-arrow`} aria-label="Previous quote" onClick={back} style={arrowBtn}>{arrow(true)}</button>
              <button className={`${p}-arrow`} aria-label="Next quote" onClick={next} style={arrowBtn}>{arrow(false)}</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

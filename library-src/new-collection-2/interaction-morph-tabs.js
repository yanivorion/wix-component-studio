const MANIFEST = {
  "type": "Interaction.MorphTabs",
  "description": "Feature tabs whose pill indicator springs between tabs while panels slide in from the direction of travel through an 8px blur; the photo frame morphs its silhouette (arch, landscape, circle, portrait) as images wipe in, with an optional autoplay line inside the active tab",
  "editorElement": {
    "selector": ".morph-tabs",
    "displayName": "Morph Tabs",
    "archetype": "container",
    "data": {
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Retreats — 2026 collection", "group": "Content" },
      "headline": { "dataType": "text", "displayName": "Headline", "defaultValue": "Four landscapes, one way of staying", "group": "Content" },
      "ctaLabel": { "dataType": "text", "displayName": "Link Label", "defaultValue": "Explore the retreat", "group": "Content" },
      "tab1Label": { "dataType": "text", "displayName": "Tab 1 Label", "defaultValue": "Coast", "group": "Tab 1" },
      "tab1Title": { "dataType": "text", "displayName": "Tab 1 Title", "defaultValue": "Where the sea does the talking", "group": "Tab 1" },
      "tab1Text": { "dataType": "text", "displayName": "Tab 1 Text", "defaultValue": "Cliff-top cabins glazed to the horizon, warmed by the ground beneath them and the light in front.", "group": "Tab 1" },
      "tab1Features": { "dataType": "text", "displayName": "Tab 1 Features (comma separated)", "defaultValue": "Floor-to-ceiling glass,Private cedar sauna,Tide-table breakfasts", "group": "Tab 1" },
      "tab1Image": { "dataType": "text", "displayName": "Tab 1 Image URL", "defaultValue": "https://picsum.photos/id/1050/1400/1200", "group": "Tab 1" },
      "tab1Shape": { "dataType": "select", "displayName": "Tab 1 Frame", "defaultValue": "arch", "options": ["arch", "landscape", "portrait", "circle", "square"], "group": "Tab 1" },
      "tab2Label": { "dataType": "text", "displayName": "Tab 2 Label", "defaultValue": "Alpine", "group": "Tab 2" },
      "tab2Title": { "dataType": "text", "displayName": "Tab 2 Title", "defaultValue": "Above the weather, below the stars", "group": "Tab 2" },
      "tab2Text": { "dataType": "text", "displayName": "Tab 2 Text", "defaultValue": "A larch-clad lodge at 2,100 metres. Ski from the door in winter, walk into the clouds in June.", "group": "Tab 2" },
      "tab2Features": { "dataType": "text", "displayName": "Tab 2 Features (comma separated)", "defaultValue": "Ski-in & ski-out,Open-fire library,Guided summit dawns", "group": "Tab 2" },
      "tab2Image": { "dataType": "text", "displayName": "Tab 2 Image URL", "defaultValue": "https://picsum.photos/id/1036/1400/1200", "group": "Tab 2" },
      "tab2Shape": { "dataType": "select", "displayName": "Tab 2 Frame", "defaultValue": "landscape", "options": ["arch", "landscape", "portrait", "circle", "square"], "group": "Tab 2" },
      "tab3Label": { "dataType": "text", "displayName": "Tab 3 Label", "defaultValue": "Forest", "group": "Tab 3" },
      "tab3Title": { "dataType": "text", "displayName": "Tab 3 Title", "defaultValue": "A clearing entirely your own", "group": "Tab 3" },
      "tab3Text": { "dataType": "text", "displayName": "Tab 3 Text", "defaultValue": "Seven pavilions spread through old-growth pine, each out of sight and earshot of the next.", "group": "Tab 3" },
      "tab3Features": { "dataType": "text", "displayName": "Tab 3 Features (comma separated)", "defaultValue": "Wild-swim lake,Forager's kitchen,No signal by design", "group": "Tab 3" },
      "tab3Image": { "dataType": "text", "displayName": "Tab 3 Image URL", "defaultValue": "https://picsum.photos/id/1043/1400/1200", "group": "Tab 3" },
      "tab3Shape": { "dataType": "select", "displayName": "Tab 3 Frame", "defaultValue": "circle", "options": ["arch", "landscape", "portrait", "circle", "square"], "group": "Tab 3" },
      "tab4Label": { "dataType": "text", "displayName": "Tab 4 Label", "defaultValue": "Desert", "group": "Tab 4" },
      "tab4Title": { "dataType": "text", "displayName": "Tab 4 Title", "defaultValue": "Silence, measured in dunes", "group": "Tab 4" },
      "tab4Text": { "dataType": "text", "displayName": "Tab 4 Text", "defaultValue": "Rammed-earth suites that stay cool at noon and glow at dusk, an hour from the nearest road.", "group": "Tab 4" },
      "tab4Features": { "dataType": "text", "displayName": "Tab 4 Features (comma separated)", "defaultValue": "Roof-top star beds,Courtyard plunge pools,Camel-track sunrise rides", "group": "Tab 4" },
      "tab4Image": { "dataType": "text", "displayName": "Tab 4 Image URL", "defaultValue": "https://picsum.photos/id/261/1400/1200", "group": "Tab 4" },
      "tab4Shape": { "dataType": "select", "displayName": "Tab 4 Frame", "defaultValue": "portrait", "options": ["arch", "landscape", "portrait", "circle", "square"], "group": "Tab 4" },
      "autoplay": { "dataType": "booleanValue", "displayName": "Autoplay", "defaultValue": "true", "group": "Animation" },
      "interval": { "dataType": "select", "displayName": "Autoplay Interval (s)", "defaultValue": "6", "options": ["4", "6", "8", "10"], "group": "Animation" },
      "panelMotion": { "dataType": "select", "displayName": "Panel Motion", "defaultValue": "slide-blur", "options": ["slide-blur", "rise", "fade"], "group": "Animation" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#F5F4F0", "group": "Colors" },
      "textColor": { "dataType": "color", "displayName": "Text", "defaultValue": "#1C1917", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#78716C", "group": "Colors" },
      "indicatorColor": { "dataType": "color", "displayName": "Active Pill", "defaultValue": "#1C1917", "group": "Colors" },
      "indicatorTextColor": { "dataType": "color", "displayName": "Active Pill Text", "defaultValue": "#FAFAF9", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent (progress)", "defaultValue": "#C8B79A", "group": "Colors" },
      "displayFont": { "dataType": "select", "displayName": "Display Font", "defaultValue": "Instrument Serif", "options": ["Instrument Serif", "Fraunces", "Inter Tight", "Inter"], "group": "Typography" },
      "headlineSize": { "dataType": "select", "displayName": "Headline Size (px)", "defaultValue": "60", "options": ["44", "52", "60", "72"], "group": "Typography" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const split = (s) => String(s || '').split(',').map((x) => x.trim()).filter(Boolean);
  const eyebrow = config?.eyebrow || 'Retreats — 2026 collection';
  const headline = config?.headline || 'Four landscapes, one way of staying';
  const ctaLabel = config?.ctaLabel || 'Explore the retreat';
  const defaults = [
    ['Coast', 'Where the sea does the talking', 'Cliff-top cabins glazed to the horizon, warmed by the ground beneath them and the light in front.', 'Floor-to-ceiling glass,Private cedar sauna,Tide-table breakfasts', 'https://picsum.photos/id/1050/1400/1200', 'arch'],
    ['Alpine', 'Above the weather, below the stars', 'A larch-clad lodge at 2,100 metres. Ski from the door in winter, walk into the clouds in June.', 'Ski-in & ski-out,Open-fire library,Guided summit dawns', 'https://picsum.photos/id/1036/1400/1200', 'landscape'],
    ['Forest', 'A clearing entirely your own', 'Seven pavilions spread through old-growth pine, each out of sight and earshot of the next.', "Wild-swim lake,Forager's kitchen,No signal by design", 'https://picsum.photos/id/1043/1400/1200', 'circle'],
    ['Desert', 'Silence, measured in dunes', 'Rammed-earth suites that stay cool at noon and glow at dusk, an hour from the nearest road.', 'Roof-top star beds,Courtyard plunge pools,Camel-track sunrise rides', 'https://picsum.photos/id/261/1400/1200', 'portrait'],
  ];
  const tabs = defaults.map((d, i) => {
    const n = i + 1;
    return {
      label: config?.[`tab${n}Label`] || d[0],
      title: config?.[`tab${n}Title`] || d[1],
      text: config?.[`tab${n}Text`] || d[2],
      features: split(config?.[`tab${n}Features`] || d[3]),
      image: config?.[`tab${n}Image`] || d[4],
      shape: config?.[`tab${n}Shape`] || d[5],
    };
  });
  const autoplay = bool(config?.autoplay, true);
  const interval = (parseFloat(config?.interval || '6') || 6) * 1000;
  const panelMotion = config?.panelMotion || 'slide-blur';
  const bg = config?.backgroundColor || '#F5F4F0';
  const text = config?.textColor || '#1C1917';
  const muted = config?.mutedColor || '#78716C';
  const pillBg = config?.indicatorColor || '#1C1917';
  const pillText = config?.indicatorTextColor || '#FAFAF9';
  const accent = config?.accentColor || '#C8B79A';
  const displayFont = config?.displayFont || 'Instrument Serif';
  const headlineSize = parseInt(config?.headlineSize || '60', 10) || 60;

  const uid = React.useMemo(() => 'mt' + Math.random().toString(36).slice(2, 9), []);
  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  const rootRef = React.useRef(null);
  const listRef = React.useRef(null);
  const tabRefs = React.useRef([]);
  const [width, setWidth] = React.useState(1280);
  const [active, setActive] = React.useState(0);
  const [dir, setDir] = React.useState(1);
  const [ind, setInd] = React.useState({ x: 0, y: 0, w: 0, h: 0, ready: false });
  const [paused, setPaused] = React.useState(false);
  const [cycle, setCycle] = React.useState(0);

  React.useEffect(() => {
    const families = { 'Instrument Serif': 'Instrument+Serif:ital@0;1', 'Fraunces': 'Fraunces:opsz,wght@9..144,300..500', 'Inter Tight': 'Inter+Tight:wght@300..500' };
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
    const measure = () => setWidth(el.clientWidth || 1280);
    measure();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (ro) ro.observe(el);
    window.addEventListener('resize', measure);
    return () => { if (ro) ro.disconnect(); window.removeEventListener('resize', measure); };
  }, []);

  const measureInd = React.useCallback(() => {
    const t = tabRefs.current[active];
    if (!t) return;
    setInd({ x: t.offsetLeft, y: t.offsetTop, w: t.offsetWidth, h: t.offsetHeight, ready: true });
  }, [active]);

  React.useLayoutEffect(() => { measureInd(); }, [measureInd, width]);
  React.useEffect(() => {
    const t = setTimeout(measureInd, 400);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measureInd);
    return () => clearTimeout(t);
  }, [measureInd]);

  const count = tabs.length;
  const select = React.useCallback((i, focus) => {
    const n = ((i % count) + count) % count;
    setActive((a) => {
      if (n !== a) setDir(n > a ? 1 : -1);
      return n;
    });
    setCycle((c) => c + 1);
    if (focus && tabRefs.current[n]) tabRefs.current[n].focus({ preventScroll: true });
  }, [count]);

  const advance = () => { setDir(1); setActive((a) => (a + 1) % count); setCycle((c) => c + 1); };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); select(active + 1, true); }
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); select(active - 1, true); }
    else if (e.key === 'Home') { e.preventDefault(); select(0, true); }
    else if (e.key === 'End') { e.preventDefault(); select(count - 1, true); }
  };

  const compact = width < 860;
  const pad = compact ? 20 : Math.max(48, Math.round(width * 0.05));
  const sans = '"Inter", -apple-system, "Helvetica Neue", Arial, sans-serif';
  const display = displayFont === 'Inter' ? sans
    : displayFont === 'Inter Tight' ? '"Inter Tight", "Inter", -apple-system, sans-serif'
    : `"${displayFont}", "Iowan Old Style", Georgia, serif`;
  const serifLike = displayFont === 'Instrument Serif' || displayFont === 'Fraunces';
  const p = uid;
  const E1 = [0.22, 1, 0.36, 1];
  const E2 = [0.65, 0, 0.35, 1];
  const pad2 = (n) => String(n).padStart(2, '0');

  const frameW = compact ? width - pad * 2 : Math.round((width - pad * 2) * 0.56);
  const frameH = compact ? Math.round(Math.min(420, frameW * 0.95)) : Math.round(Math.min(640, Math.max(480, frameW * 0.9)));
  const shapeRect = (shape) => {
    const W = frameW; const Hh = frameH;
    let w = W; let h = Hh; let r = [18, 18, 18, 18];
    if (shape === 'arch') { w = Math.min(W, Hh * 0.74); h = Hh; r = [w / 2, w / 2, 16, 16]; }
    else if (shape === 'landscape') { w = W; h = Math.min(Hh, W * 0.66); r = [20, 20, 20, 20]; }
    else if (shape === 'portrait') { w = Math.min(W, Hh * 0.76); h = Hh; r = [6, 6, 6, 6]; }
    else if (shape === 'circle') { const s = Math.min(W, Hh) * 0.96; w = s; h = s; r = [s / 2, s / 2, s / 2, s / 2]; }
    else if (shape === 'square') { const s = Math.min(W, Hh) * 0.9; w = s; h = s; r = [36, 36, 36, 36]; }
    const l = (W - w) / 2; const t = (Hh - h) / 2;
    return { l, t, w, h, r };
  };
  const rect = shapeRect(tabs[active].shape);
  const clip = `inset(${rect.t}px ${frameW - rect.l - rect.w}px ${frameH - rect.t - rect.h}px ${rect.l}px round ${rect.r.map((v) => Math.round(v) + 'px').join(' ')})`;

  const dist = compact ? 28 : 56;
  const motionFor = (d) => {
    if (panelMotion === 'rise') return { x: 0, y: 24 * (d > 0 ? 1 : -1), filter: 'blur(6px)' };
    if (panelMotion === 'fade') return { x: 0, y: 0, filter: 'blur(0px)' };
    return { x: d * dist, y: 0, filter: 'blur(8px)' };
  };
  const panelVariants = {
    enter: () => ({ opacity: 1 }),
    center: { opacity: 1, transition: { staggerChildren: reduced ? 0 : 0.055, delayChildren: reduced ? 0 : 0.06 } },
    exit: (d) => ({ opacity: 0, ...motionFor(-d), transition: { duration: reduced ? 0 : 0.42, ease: E2 } }),
  };
  const itemVariants = {
    enter: (d) => ({ opacity: 0, ...motionFor(d) }),
    center: { opacity: 1, x: 0, y: 0, filter: 'blur(0px)', transition: { duration: reduced ? 0 : 0.85, ease: E1 } },
  };
  const tab = tabs[active];

  const btn = { appearance: 'none', border: 'none', background: 'transparent', color: 'inherit', padding: 0, margin: 0, cursor: 'pointer', font: 'inherit' };
  const hPx = compact ? Math.round(headlineSize * 0.66) : headlineSize;

  const tablist = (
    <div
      ref={listRef}
      role="tablist"
      aria-label={eyebrow}
      onKeyDown={onKeyDown}
      style={{ position: 'relative', display: 'inline-flex', flexWrap: 'wrap', gap: 4, padding: 5, borderRadius: 999, background: `${text}0d`, maxWidth: '100%' }}
    >
      {ind.ready && (
        <motion.span
          aria-hidden="true"
          initial={false}
          animate={{ x: ind.x, y: ind.y, width: ind.w, height: ind.h }}
          transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 34, mass: 0.9 }}
          style={{ position: 'absolute', left: 0, top: 0, borderRadius: 999, background: pillBg, boxShadow: '0 6px 18px -8px rgba(0,0,0,.45)' }}
        />
      )}
      {tabs.map((t, i) => {
        const on = i === active;
        return (
          <button
            key={i}
            ref={(el) => { tabRefs.current[i] = el; }}
            id={`${p}-tab-${i}`}
            role="tab"
            type="button"
            aria-selected={on}
            aria-controls={`${p}-panel`}
            tabIndex={on ? 0 : -1}
            className={`${p}-tab`}
            onClick={() => select(i)}
            style={{ ...btn, position: 'relative', zIndex: 1, height: compact ? 40 : 46, padding: compact ? '0 16px' : '0 24px', borderRadius: 999, fontSize: compact ? 13 : 14, letterSpacing: '0.01em', fontWeight: 400, color: on ? pillText : text, transition: reduced ? 'none' : 'color .35s cubic-bezier(.22,1,.36,1) .05s', whiteSpace: 'nowrap', overflow: 'hidden' }}
          >
            <span style={{ position: 'relative' }}>{t.label}</span>
            {autoplay && on && (
              <span aria-hidden="true" style={{ position: 'absolute', left: compact ? 16 : 24, right: compact ? 16 : 24, bottom: 8, height: 1.5, borderRadius: 2, background: `${pillText}2e`, overflow: 'hidden' }}>
                <span
                  key={`${active}-${cycle}`}
                  onAnimationEnd={advance}
                  style={{ position: 'absolute', inset: 0, background: accent, transformOrigin: 'left', animation: `${p}-prog ${interval}ms linear both`, animationPlayState: paused ? 'paused' : 'running' }}
                />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );

  const frame = (
    <div aria-hidden="true" style={{ position: 'relative', width: frameW, height: frameH, flexShrink: 0 }}>
      <div style={{
        position: 'absolute', inset: 0, overflow: 'hidden', background: `${text}10`,
        clipPath: clip, WebkitClipPath: clip,
        transition: reduced ? 'none' : 'clip-path 1100ms cubic-bezier(.76,0,.24,1), -webkit-clip-path 1100ms cubic-bezier(.76,0,.24,1)',
      }}>
        <AnimatePresence initial={false} custom={dir}>
          <motion.div
            key={active}
            custom={dir}
            variants={{
              enter: (d) => ({ clipPath: d > 0 ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)', zIndex: 2 }),
              center: { clipPath: 'inset(0% 0% 0% 0%)', zIndex: 2, transition: { duration: reduced ? 0 : 1.05, ease: [0.76, 0, 0.24, 1] } },
              exit: { zIndex: 1, opacity: 0, transition: { duration: reduced ? 0 : 0.3, delay: reduced ? 0 : 0.95 } },
            }}
            initial="enter"
            animate="center"
            exit="exit"
            style={{ position: 'absolute', inset: 0 }}
          >
            <motion.img
              src={tab.image}
              alt=""
              draggable="false"
              custom={dir}
              variants={{
                enter: (d) => ({ scale: 1.18, x: `${d * 6}%` }),
                center: { scale: 1, x: '0%', transition: { duration: reduced ? 0 : 1.5, ease: E1 } },
                exit: (d) => ({ scale: 1.04, x: `${-d * 4}%`, transition: { duration: reduced ? 0 : 1.1, ease: [0.76, 0, 0.24, 1] } }),
              }}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <div style={{
        position: 'absolute', left: 0, top: 0, zIndex: 3,
        transform: `translate(${Math.round(rect.l + (tabs[active].shape === 'circle' ? rect.w * 0.16 : 18))}px, ${Math.round(rect.t + rect.h - (tabs[active].shape === 'circle' ? rect.h * 0.16 : 18))}px) translateY(-100%)`,
        transition: reduced ? 'none' : 'transform 1100ms cubic-bezier(.76,0,.24,1)',
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, height: 34, padding: '0 14px', borderRadius: 999, background: 'rgba(250,250,249,.86)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', color: '#1C1917', fontSize: 12, letterSpacing: '0.02em', overflow: 'hidden', whiteSpace: 'nowrap' }}>
          <span style={{ fontVariantNumeric: 'tabular-nums', color: '#78716C' }}>{pad2(active + 1)}</span>
          <AnimatePresence initial={false} mode="popLayout" custom={dir}>
            <motion.span
              key={active}
              custom={dir}
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { duration: reduced ? 0 : 0.6, ease: E1, delay: reduced ? 0 : 0.25 } }}
              exit={{ y: -18, opacity: 0, transition: { duration: reduced ? 0 : 0.3, ease: E2 } }}
              style={{ display: 'inline-block' }}
            >
              {tab.label}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );

  const panel = (
    <div id={`${p}-panel`} role="tabpanel" aria-labelledby={`${p}-tab-${active}`} tabIndex={0} className={`${p}-panel`} style={{ position: 'relative', outline: 'none', minHeight: compact ? 0 : 300 }}>
      <AnimatePresence initial={false} mode="popLayout" custom={dir}>
        <motion.div key={active} custom={dir} variants={panelVariants} initial="enter" animate="center" exit="exit" style={{ width: '100%' }}>
          <motion.div custom={dir} variants={itemVariants} style={{ fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: muted, marginBottom: compact ? 12 : 18, fontVariantNumeric: 'tabular-nums' }}>
            {pad2(active + 1)} <span style={{ opacity: 0.5 }}>/ {pad2(count)}</span>
          </motion.div>
          <motion.h3 custom={dir} variants={itemVariants} style={{ margin: 0, fontFamily: display, fontWeight: 400, fontSize: compact ? 28 : Math.round(hPx * 0.6), lineHeight: 1.08, letterSpacing: serifLike ? '-0.01em' : '-0.03em', maxWidth: 460 }}>
            {tab.title}
          </motion.h3>
          <motion.p custom={dir} variants={itemVariants} style={{ margin: compact ? '12px 0 0' : '18px 0 0', maxWidth: 420, fontSize: compact ? 14 : 16, lineHeight: 1.6, fontWeight: 300, color: muted }}>
            {tab.text}
          </motion.p>
          <ul style={{ listStyle: 'none', padding: 0, margin: compact ? '18px 0 0' : '28px 0 0', maxWidth: 420 }}>
            {tab.features.map((f, i) => (
              <motion.li key={i} custom={dir} variants={itemVariants} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: compact ? '10px 0' : '13px 0', borderTop: `1px solid ${text}17`, fontSize: compact ? 14 : 15, fontWeight: 400 }}>
                <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: '50%', background: accent, flexShrink: 0 }} />
                {f}
              </motion.li>
            ))}
          </ul>
          <motion.a custom={dir} variants={itemVariants} href="#" onClick={(e) => e.preventDefault()} className={`${p}-cta`} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginTop: compact ? 18 : 28, color: text, textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>
            <span className={`${p}-ctal`}>{ctaLabel}</span>
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.3" /></svg>
          </motion.a>
        </motion.div>
      </AnimatePresence>
    </div>
  );

  return (
    <section
      ref={rootRef}
      className={`morph-tabs ${p}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false); }}
      style={{ position: 'relative', width: '100%', background: bg, color: text, fontFamily: sans, padding: compact ? `56px ${pad}px 64px` : `${Math.round(pad * 1.15)}px ${pad}px`, boxSizing: 'border-box', overflow: 'hidden' }}
    >
      <style>{`
        @keyframes ${p}-prog { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes ${p}-up { from { transform: translateY(105%); } to { transform: none; } }
        @keyframes ${p}-fade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        .${p} .${p}-tab:focus-visible { outline: 2px solid ${accent}; outline-offset: 2px; }
        .${p} .${p}-tab:not([aria-selected="true"]):hover { color: ${text}; background: ${text}0a; }
        .${p} .${p}-panel:focus-visible { box-shadow: 0 0 0 2px ${accent}; border-radius: 6px; }
        .${p} .${p}-cta .${p}-ctal { background: linear-gradient(currentColor, currentColor) 0 100% / 100% 1px no-repeat; transition: background-size .5s cubic-bezier(.65,0,.35,1); padding-bottom: 3px; }
        .${p} .${p}-cta:hover .${p}-ctal { background-size: 0% 1px; background-position: 100% 100%; }
        .${p} .${p}-cta svg { transition: transform .5s cubic-bezier(.22,1,.36,1); }
        .${p} .${p}-cta:hover svg { transform: translateX(4px); }
        .${p} .${p}-cta:focus-visible { outline: 2px solid ${accent}; outline-offset: 4px; }
        @media (prefers-reduced-motion: reduce) { .${p} * { animation-duration: 0s !important; transition: none !important; } }
      `}</style>

      {compact ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: muted, marginBottom: 14 }}>{eyebrow}</div>
            <h2 style={{ margin: 0, fontFamily: display, fontWeight: 400, fontSize: hPx, lineHeight: 1.02, letterSpacing: serifLike ? '-0.015em' : '-0.04em' }}>{headline}</h2>
          </div>
          <div style={{ overflowX: 'auto', margin: `0 -${pad}px`, padding: `2px ${pad}px` }}>{tablist}</div>
          {frame}
          {panel}
        </div>
      ) : (
        <div style={{ display: 'flex', gap: Math.round(pad * 0.9), alignItems: 'stretch' }}>
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 40 }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: muted, marginBottom: 20, animation: reduced ? 'none' : `${p}-fade 800ms cubic-bezier(.22,1,.36,1) both` }}>{eyebrow}</div>
              <h2 style={{ margin: 0, fontFamily: display, fontWeight: 400, fontSize: hPx, lineHeight: 1.0, letterSpacing: serifLike ? '-0.015em' : '-0.04em', maxWidth: 560 }}>
                {headline.split(' ').map((w, i, arr) => (
                  <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', paddingBottom: '0.1em', marginBottom: '-0.1em' }}>
                    <span style={{ display: 'inline-block', animation: reduced ? 'none' : `${p}-up 1000ms cubic-bezier(.22,1,.36,1) ${80 + i * 50}ms both` }}>{w}{i < arr.length - 1 ? ' ' : ''}</span>
                  </span>
                ))}
              </h2>
              <div style={{ marginTop: 32, animation: reduced ? 'none' : `${p}-fade 800ms cubic-bezier(.22,1,.36,1) 300ms both` }}>{tablist}</div>
            </div>
            {panel}
          </div>
          {frame}
        </div>
      )}
    </section>
  );
}

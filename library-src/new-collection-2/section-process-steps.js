const MANIFEST = {
  "type": "Section.ProcessSteps",
  "description": "Calm how-it-works section: steps sit on a track where a spring-driven ring travels to the active step, its number fills and a per-step progress line runs while the photo morphs in from a pill-shaped clip and the description rises line by line; auto-advance, click and arrow keys",
  "editorElement": {
    "selector": ".process-steps",
    "displayName": "Process Steps",
    "archetype": "container",
    "data": {
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "How it works", "group": "Content" },
      "title": { "dataType": "text", "displayName": "Title", "defaultValue": "From first walk to the final key.", "group": "Content" },
      "intro": { "dataType": "text", "displayName": "Intro", "defaultValue": "Five unhurried phases. Each one ends with a decision you make with complete information.", "group": "Content" },
      "step1Title": { "dataType": "text", "displayName": "Step 1 Title", "defaultValue": "Listen", "group": "Steps" },
      "step1Text": { "dataType": "text", "displayName": "Step 1 Text", "defaultValue": "We walk the site with you, mapping light, routines and the few things that must never change.", "group": "Steps" },
      "step1Meta": { "dataType": "text", "displayName": "Step 1 Meta", "defaultValue": "2 weeks", "group": "Steps" },
      "step2Title": { "dataType": "text", "displayName": "Step 2 Title", "defaultValue": "Sketch", "group": "Steps" },
      "step2Text": { "dataType": "text", "displayName": "Step 2 Text", "defaultValue": "Loose models and hand drawings test the big moves early, while changing course is still cheap.", "group": "Steps" },
      "step2Meta": { "dataType": "text", "displayName": "Step 2 Meta", "defaultValue": "4–6 weeks", "group": "Steps" },
      "step3Title": { "dataType": "text", "displayName": "Step 3 Title", "defaultValue": "Refine", "group": "Steps" },
      "step3Text": { "dataType": "text", "displayName": "Step 3 Text", "defaultValue": "Materials, details and budget are resolved together, so nothing is ever decided in isolation.", "group": "Steps" },
      "step3Meta": { "dataType": "text", "displayName": "Step 3 Meta", "defaultValue": "8 weeks", "group": "Steps" },
      "step4Title": { "dataType": "text", "displayName": "Step 4 Title", "defaultValue": "Build", "group": "Steps" },
      "step4Text": { "dataType": "text", "displayName": "Step 4 Text", "defaultValue": "We stay on site through construction, guarding every junction and every quiet line.", "group": "Steps" },
      "step4Meta": { "dataType": "text", "displayName": "Step 4 Meta", "defaultValue": "9–14 months", "group": "Steps" },
      "step5Title": { "dataType": "text", "displayName": "Step 5 Title", "defaultValue": "Arrive", "group": "Steps" },
      "step5Text": { "dataType": "text", "displayName": "Step 5 Text", "defaultValue": "Keys, care notes and a return visit a year later. The building should only get better.", "group": "Steps" },
      "step5Meta": { "dataType": "text", "displayName": "Step 5 Meta", "defaultValue": "Day one", "group": "Steps" },
      "images": { "dataType": "text", "displayName": "Step Images (comma separated)", "defaultValue": "https://picsum.photos/id/445/1400/900,https://picsum.photos/id/1073/1400/900,https://picsum.photos/id/1059/1400/900,https://picsum.photos/id/1076/1400/900,https://picsum.photos/id/1068/1400/900", "group": "Images" },
      "imageFilter": { "dataType": "select", "displayName": "Image Treatment", "defaultValue": "none", "options": ["none", "grayscale", "muted"], "group": "Images" },
      "morphShape": { "dataType": "select", "displayName": "Media Morph From", "defaultValue": "pill", "options": ["pill", "circle", "inset"], "group": "Animation" },
      "autoAdvance": { "dataType": "booleanValue", "displayName": "Auto Advance", "defaultValue": "true", "group": "Animation" },
      "interval": { "dataType": "select", "displayName": "Step Duration (s)", "defaultValue": "5", "options": ["3", "5", "7", "10"], "group": "Animation" },
      "pauseOnHover": { "dataType": "booleanValue", "displayName": "Pause On Hover", "defaultValue": "true", "group": "Animation" },
      "springFeel": { "dataType": "select", "displayName": "Indicator Spring", "defaultValue": "balanced", "options": ["soft", "balanced", "snappy"], "group": "Animation" },
      "showIntro": { "dataType": "booleanValue", "displayName": "Intro Paragraph", "defaultValue": "true", "group": "Layout" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#0E0E0F", "group": "Colors" },
      "textColor": { "dataType": "color", "displayName": "Text", "defaultValue": "#FAFAF9", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#A8A29E", "group": "Colors" },
      "lineColor": { "dataType": "color", "displayName": "Track", "defaultValue": "#2E2B29", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent", "defaultValue": "#E7D9C4", "group": "Colors" },
      "titleFont": { "dataType": "select", "displayName": "Title Font", "defaultValue": "Instrument Serif", "options": ["Instrument Serif", "Fraunces", "Inter Tight", "system-ui"], "group": "Typography" },
      "titleSize": { "dataType": "select", "displayName": "Title Size (px)", "defaultValue": "60", "options": ["44", "52", "60", "72"], "group": "Typography" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const defaults = [
    ['Listen', 'We walk the site with you, mapping light, routines and the few things that must never change.', '2 weeks'],
    ['Sketch', 'Loose models and hand drawings test the big moves early, while changing course is still cheap.', '4–6 weeks'],
    ['Refine', 'Materials, details and budget are resolved together, so nothing is ever decided in isolation.', '8 weeks'],
    ['Build', 'We stay on site through construction, guarding every junction and every quiet line.', '9–14 months'],
    ['Arrive', 'Keys, care notes and a return visit a year later. The building should only get better.', 'Day one']
  ];
  const images = String(config?.images || 'https://picsum.photos/id/445/1400/900,https://picsum.photos/id/1073/1400/900,https://picsum.photos/id/1059/1400/900,https://picsum.photos/id/1076/1400/900,https://picsum.photos/id/1068/1400/900').split(',').map((s) => s.trim()).filter(Boolean);
  const steps = defaults.map((d, i) => ({
    title: config?.[`step${i + 1}Title`] ?? d[0],
    text: config?.[`step${i + 1}Text`] ?? d[1],
    meta: config?.[`step${i + 1}Meta`] ?? d[2],
    img: images.length ? images[i % images.length] : ''
  })).filter((s) => String(s.title || '').trim());

  const eyebrow = config?.eyebrow || 'How it works';
  const title = config?.title || 'From first walk to the final key.';
  const intro = config?.intro || 'Five unhurried phases. Each one ends with a decision you make with complete information.';
  const imageFilter = config?.imageFilter || 'none';
  const morphShape = config?.morphShape || 'pill';
  const autoAdvance = bool(config?.autoAdvance, true);
  const interval = (parseFloat(config?.interval || '5') || 5) * 1000;
  const pauseOnHover = bool(config?.pauseOnHover, true);
  const spring = { soft: { stiffness: 120, damping: 18 }, balanced: { stiffness: 220, damping: 24 }, snappy: { stiffness: 420, damping: 32 } }[config?.springFeel || 'balanced'] || { stiffness: 220, damping: 24 };
  const showIntro = bool(config?.showIntro, true);
  const bg = config?.backgroundColor || '#0E0E0F';
  const text = config?.textColor || '#FAFAF9';
  const muted = config?.mutedColor || '#A8A29E';
  const line = config?.lineColor || '#2E2B29';
  const accent = config?.accentColor || '#E7D9C4';
  const titleFont = config?.titleFont || 'Instrument Serif';
  const titleSizeCfg = parseInt(config?.titleSize || '60', 10) || 60;

  const count = steps.length;
  const uid = React.useMemo(() => 'ps' + Math.random().toString(36).slice(2, 9), []);
  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const rootRef = React.useRef(null);
  const trackRef = React.useRef(null);
  const wordRefs = React.useRef([]);
  const tabRefs = React.useRef([]);
  const [width, setWidth] = React.useState(1280);
  const [trackW, setTrackW] = React.useState(1100);
  const [stageH, setStageH] = React.useState(800);
  const [active, setActive] = React.useState(0);
  const [prev, setPrev] = React.useState(null);
  const [animKey, setAnimKey] = React.useState(0);
  const [lineState, setLineState] = React.useState({ k: -1, idx: [] });
  const activeRef = React.useRef(0);
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
      if (trackRef.current) setTrackW(trackRef.current.clientWidth);
    };
    measure();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (ro) ro.observe(el);
    window.addEventListener('resize', measure);
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => { if (ro) ro.disconnect(); window.removeEventListener('resize', measure); io.disconnect(); };
  }, []);

  const compact = width < 760;

  React.useLayoutEffect(() => {
    const els = wordRefs.current.filter(Boolean);
    if (!els.length) { setLineState({ k: `${active}-${animKey}`, idx: [] }); return; }
    const tops = [];
    const idx = els.map((el) => {
      const t = el.offsetTop;
      let k = tops.findIndex((v) => Math.abs(v - t) < 4);
      if (k < 0) { tops.push(t); k = tops.length - 1; }
      return k;
    });
    setLineState({ k: `${active}-${animKey}`, idx });
  }, [active, width, animKey]);
  const lines = lineState.k === `${active}-${animKey}` ? lineState.idx : [];

  const go = React.useCallback((n) => {
    if (!count) return;
    const next = ((n % count) + count) % count;
    const c = activeRef.current;
    if (c === next) return;
    activeRef.current = next;
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
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = active + 1;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = active - 1;
    else if (e.key === 'Home') n = 0;
    else if (e.key === 'End') n = count - 1;
    if (n === null) return;
    e.preventDefault();
    const t = ((n % count) + count) % count;
    go(t);
    if (tabRefs.current[t]) tabRefs.current[t].focus();
  };

  const playing = autoAdvance && count > 1 && !reduced;
  const paused = (pauseOnHover && hover) || !inView;
  const pad = compact ? 22 : 56;
  const titleSize = compact ? Math.round(titleSizeCfg * 0.66) : Math.round(Math.min(titleSizeCfg, width * 0.05));
  const sans = '"Inter", -apple-system, "Helvetica Neue", Arial, sans-serif';
  const display = titleFont === 'system-ui' ? sans
    : titleFont === 'Inter Tight' ? `"Inter Tight", ${sans}`
    : `"${titleFont}", "Iowan Old Style", Georgia, serif`;
  const isSerif = titleFont === 'Instrument Serif' || titleFont === 'Fraunces';
  const filterCss = imageFilter === 'grayscale' ? 'grayscale(1) contrast(1.05)' : imageFilter === 'muted' ? 'saturate(0.6)' : 'none';
  const mediaH = compact ? Math.round(width * 0.68) : Math.round(Math.max(300, Math.min(480, stageH * 0.44)));
  const fromClip = morphShape === 'circle' ? 'inset(25% 35% 25% 35% round 999px)'
    : morphShape === 'inset' ? 'inset(12% 12% 12% 12% round 20px)'
    : 'inset(30% 18% 30% 18% round 999px)';
  const pad2 = (n) => String(n).padStart(2, '0');
  const p = uid;
  const colW = count ? trackW / count : 0;
  const CIRCLE = 44;
  const M = motion;

  const btnReset = { appearance: 'none', border: 'none', background: 'transparent', color: 'inherit', padding: 0, margin: 0, cursor: 'pointer', font: 'inherit', textAlign: 'left' };

  if (!count) {
    return (
      <section className="process-steps" style={{ width: '100%', padding: 64, background: bg, color: muted, fontFamily: sans, textAlign: 'center', fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
        Add a step title to begin
      </section>
    );
  }

  const st = steps[active];
  const words = String(st.text || '').split(/\s+/).filter(Boolean);
  wordRefs.current = [];

  const progressFill = (i, vertical) => {
    const done = i < active;
    const on = i === active;
    const axis = vertical ? 'scaleY' : 'scaleX';
    return (
      <span style={{ position: 'absolute', inset: 0, background: on ? accent : text, opacity: done ? 0.45 : 1, transformOrigin: vertical ? 'top' : 'left',
        transform: done ? `${axis}(1)` : on ? (playing ? `${axis}(0)` : `${axis}(1)`) : `${axis}(0)`,
        animation: on && playing ? `${p}-${vertical ? 'fy' : 'fx'} ${interval}ms linear forwards` : 'none',
        animationPlayState: paused ? 'paused' : 'running',
        transition: on ? 'none' : 'transform 600ms cubic-bezier(0.65,0,0.35,1)'
      }}
      key={on ? `a${animKey}` : `s${i}`}
      onAnimationEnd={on && playing ? () => go(active + 1) : undefined} />
    );
  };

  const media = (
    <div style={{ position: 'relative', width: '100%', height: mediaH, borderRadius: compact ? 16 : 20, overflow: 'hidden', background: line }}>
      {prev !== null && steps[prev] && (
        <img key={`o${animKey}`} src={steps[prev].img} alt="" draggable="false" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: filterCss, animation: reduced ? 'none' : `${p}-out 1000ms cubic-bezier(0.33,1,0.68,1) both` }} />
      )}
      <div key={`i${animKey}`} style={{ position: 'absolute', inset: 0, animation: reduced || prev === null ? 'none' : `${p}-morph 1150ms cubic-bezier(0.76,0,0.24,1) both` }}>
        {st.img && <img src={st.img} alt={st.title} draggable="false" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: filterCss, animation: reduced || prev === null ? 'none' : `${p}-zoom 1600ms cubic-bezier(0.22,1,0.36,1) both` }} />}
      </div>
      <div style={{ position: 'absolute', top: 16, right: 16, padding: '7px 12px', borderRadius: 999, background: 'rgba(14,14,15,0.42)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', color: '#FAFAF9', fontSize: 12, letterSpacing: '0.08em', fontVariantNumeric: 'tabular-nums' }}>
        {pad2(active + 1)} <span style={{ opacity: 0.6 }}>/ {pad2(count)}</span>
      </div>
    </div>
  );

  const description = (
    <div key={`d${animKey}`} style={{ display: 'flex', flexDirection: 'column', gap: compact ? 12 : 18 }}>
      {!compact && (
        <div aria-hidden="true" style={{ display: 'flex', overflow: 'hidden', fontFamily: display, fontSize: Math.round(titleSize * 2.1), lineHeight: 0.9, letterSpacing: '-0.03em', color: 'transparent', WebkitTextStroke: `1px ${muted}`, opacity: 0.55, marginBottom: 4, fontVariantNumeric: 'lining-nums tabular-nums' }}>
          {Array.from(pad2(active + 1)).map((d, i) => (
            <span key={i} style={{ display: 'inline-block', animation: reduced ? 'none' : `${p}-rise 1000ms cubic-bezier(0.76,0,0.24,1) ${i * 70}ms both` }}>{d}</span>
          ))}
        </div>
      )}
      {!compact && (
        <div style={{ overflow: 'hidden' }}>
          <div style={{ fontFamily: display, fontSize: compact ? 34 : Math.round(titleSize * 0.82), lineHeight: 1.04, letterSpacing: isSerif ? '-0.01em' : '-0.03em', animation: reduced ? 'none' : `${p}-rise 900ms cubic-bezier(0.22,1,0.36,1) 120ms both` }}>
            {st.title}
          </div>
        </div>
      )}
      <p aria-label={st.text} style={{ margin: 0, fontSize: compact ? 16 : 18, lineHeight: 1.5, color: muted, maxWidth: 440 }}>
        {words.map((w, i) => {
          const li = lines[i];
          return (
            <React.Fragment key={i}>
              <span aria-hidden="true" style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', paddingBottom: '0.1em', marginBottom: '-0.1em' }}>
                <span ref={(el) => { wordRefs.current[i] = el; }} style={{ display: 'inline-block', transform: li === undefined && !reduced ? 'translateY(110%)' : undefined, animation: reduced || li === undefined ? 'none' : `${p}-rise 850ms cubic-bezier(0.22,1,0.36,1) ${220 + li * 90}ms both` }}>{w}</span>
              </span>
              {i < words.length - 1 ? ' ' : ''}
            </React.Fragment>
          );
        })}
      </p>
      {st.meta && !compact && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: muted, animation: reduced ? 'none' : `${p}-fade 700ms ease ${300 + (lines.length ? Math.max(...lines) : 2) * 90}ms both` }}>
          <span style={{ width: 18, height: 1, background: accent }} />
          {st.meta}
        </div>
      )}
    </div>
  );

  return (
    <section
      ref={rootRef}
      className={`process-steps ${p}`}
      aria-label={eyebrow}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ position: 'relative', width: '100%', background: bg, color: text, fontFamily: sans, boxSizing: 'border-box', padding: `${compact ? 44 : 52}px ${pad}px ${compact ? 44 : 56}px`, overflow: 'hidden' }}
    >
      <style>{`
        @keyframes ${p}-fx { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes ${p}-fy { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        @keyframes ${p}-morph { from { clip-path: ${fromClip}; } to { clip-path: inset(0% 0% 0% 0% round 0px); } }
        @keyframes ${p}-zoom { from { transform: scale(1.28); } to { transform: scale(1); } }
        @keyframes ${p}-out { from { transform: scale(1); filter: ${filterCss === 'none' ? '' : filterCss + ' '}brightness(1); } to { transform: scale(1.08); filter: ${filterCss === 'none' ? '' : filterCss + ' '}brightness(0.45); } }
        @keyframes ${p}-rise { from { transform: translateY(110%); } to { transform: translateY(0); } }
        @keyframes ${p}-fade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        @keyframes ${p}-in { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        .${p} button:focus-visible { outline: 2px solid ${accent}; outline-offset: 4px; border-radius: 6px; }
        .${p} .${p}-tab:hover .${p}-tt { color: ${text}; }
        @media (prefers-reduced-motion: reduce) { .${p} * { animation: none !important; transition: none !important; } }
      `}</style>

      <header style={{ display: 'flex', flexDirection: compact ? 'column' : 'row', justifyContent: 'space-between', alignItems: compact ? 'flex-start' : 'flex-end', gap: compact ? 14 : 40, marginBottom: compact ? 28 : 44 }}>
        <div style={{ animation: reduced ? 'none' : `${p}-in 900ms cubic-bezier(0.22,1,0.36,1) both` }}>
          <div style={{ fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: muted, marginBottom: compact ? 12 : 16 }}>{eyebrow}</div>
          <h2 style={{ margin: 0, fontFamily: display, fontWeight: 400, fontSize: titleSize, lineHeight: 1.02, letterSpacing: isSerif ? '-0.015em' : '-0.035em', maxWidth: 640 }}>{title}</h2>
        </div>
        {showIntro && intro && (
          <p style={{ margin: 0, maxWidth: 340, fontSize: compact ? 15 : 16, lineHeight: 1.5, color: muted, animation: reduced ? 'none' : `${p}-in 900ms cubic-bezier(0.22,1,0.36,1) 120ms both` }}>{intro}</p>
        )}
      </header>

      {!compact ? (
        <>
          <div role="tablist" aria-label={eyebrow} onKeyDown={onKey} ref={trackRef} style={{ position: 'relative', display: 'grid', gridTemplateColumns: `repeat(${count}, 1fr)`, marginBottom: 40 }}>
            {steps.map((s, i) => {
              const on = i === active;
              return (
                <button key={i} ref={(el) => { tabRefs.current[i] = el; }} role="tab" aria-selected={on} tabIndex={on ? 0 : -1}
                  className={`${p}-tab`} onClick={() => go(i)}
                  style={{ ...btnReset, position: 'relative', display: 'block', paddingRight: 24, animation: reduced ? 'none' : `${p}-in 800ms cubic-bezier(0.22,1,0.36,1) ${180 + i * 70}ms both` }}>
                  <span style={{ position: 'relative', display: 'flex', alignItems: 'center', height: CIRCLE }}>
                    <span style={{
                      position: 'relative', zIndex: 1, width: CIRCLE, height: CIRCLE, borderRadius: '50%', flexShrink: 0,
                      display: 'grid', placeItems: 'center', fontSize: 13, fontVariantNumeric: 'tabular-nums', letterSpacing: '0.02em',
                      border: `1px solid ${on || i < active ? text : line}`, background: on ? text : bg, color: on ? bg : (i < active ? text : muted),
                      transition: 'background 500ms cubic-bezier(0.22,1,0.36,1), color 500ms ease, border-color 500ms ease'
                    }}>{pad2(i + 1)}</span>
                    <span style={{ position: 'relative', flex: 1, height: 1, margin: '0 12px', background: line, overflow: 'hidden' }}>
                      {progressFill(i, false)}
                    </span>
                  </span>
                  <span className={`${p}-tt`} style={{ display: 'block', marginTop: 18, fontSize: 17, letterSpacing: '-0.01em', color: on ? text : muted, transition: 'color 400ms ease' }}>{s.title}</span>
                  <span style={{ display: 'block', marginTop: 4, fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: muted, opacity: on ? 0.9 : 0.55, transition: 'opacity 400ms ease' }}>{s.meta}</span>
                </button>
              );
            })}
            <M.div aria-hidden="true" initial={false}
              animate={{ x: colW * active - 7 }}
              transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: spring.stiffness, damping: spring.damping, mass: 1 }}
              style={{ position: 'absolute', top: -7, left: 0, width: CIRCLE + 14, height: CIRCLE + 14, borderRadius: '50%', border: `1px solid ${accent}`, pointerEvents: 'none', zIndex: 2 }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: 56, alignItems: 'end' }}>
            <div style={{ paddingBottom: 8 }}>{description}</div>
            {media}
          </div>
        </>
      ) : (
        <>
          <div style={{ marginBottom: 28 }}>{media}</div>
          <div role="tablist" aria-label={eyebrow} aria-orientation="vertical" onKeyDown={onKey}>
            {steps.map((s, i) => {
              const on = i === active;
              const last = i === count - 1;
              return (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: `${CIRCLE}px 1fr`, columnGap: 16 }}>
                  <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <M.span initial={false} animate={{ scale: on ? 1 : 0.86 }} transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: spring.stiffness, damping: spring.damping }}
                      style={{ width: CIRCLE, height: CIRCLE, borderRadius: '50%', display: 'grid', placeItems: 'center', fontSize: 13, fontVariantNumeric: 'tabular-nums', flexShrink: 0,
                        border: `1px solid ${on || i < active ? text : line}`, background: on ? text : bg, color: on ? bg : (i < active ? text : muted), boxShadow: on ? `0 0 0 6px ${bg}, 0 0 0 7px ${accent}` : 'none',
                        transition: 'background 500ms ease, color 500ms ease, border-color 500ms ease, box-shadow 500ms ease' }}>{pad2(i + 1)}</M.span>
                    {!last && (
                      <span style={{ position: 'relative', flex: 1, width: 1, minHeight: 18, margin: '8px 0', background: line, overflow: 'hidden' }}>
                        {progressFill(i, true)}
                      </span>
                    )}
                  </div>
                  <div style={{ paddingBottom: last ? 0 : 18, minWidth: 0 }}>
                    <button ref={(el) => { tabRefs.current[i] = el; }} role="tab" aria-selected={on} tabIndex={on ? 0 : -1} onClick={() => go(i)}
                      style={{ ...btnReset, display: 'flex', width: '100%', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, minHeight: CIRCLE, paddingTop: 11 }}>
                      <span style={{ fontFamily: on ? display : sans, fontSize: on ? 26 : 17, lineHeight: 1.1, color: on ? text : muted, transition: 'color 400ms ease' }}>{s.title}</span>
                      <span style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: muted, flexShrink: 0 }}>{s.meta}</span>
                    </button>
                    {on && <div style={{ paddingTop: 8 }}>{description}</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}

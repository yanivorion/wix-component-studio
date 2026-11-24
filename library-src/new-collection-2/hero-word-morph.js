const MANIFEST = {
  "type": "Hero.WordMorph",
  "description": "Type-led hero where one word of the sentence cycles with a masked vertical slide and blur while its slot springs to the new word's measured width, so the line reflows smoothly; a matching photo wipes into an inset rounded frame for every word",
  "editorElement": {
    "selector": ".hero-word-morph",
    "displayName": "Word Morph",
    "archetype": "container",
    "data": {
      "brand": { "dataType": "text", "displayName": "Brand", "defaultValue": "Halden Interiors", "group": "Content" },
      "navLinks": { "dataType": "text", "displayName": "Nav Links (comma separated)", "defaultValue": "Work,Studio,Journal,Contact", "group": "Content" },
      "prefix": { "dataType": "text", "displayName": "Line Before Word", "defaultValue": "We design", "group": "Content" },
      "words": { "dataType": "text", "displayName": "Cycling Words (comma separated)", "defaultValue": "calm,honest,lasting,quiet", "group": "Content" },
      "suffix": { "dataType": "text", "displayName": "Text After Word", "defaultValue": "spaces", "group": "Content" },
      "body": { "dataType": "text", "displayName": "Body", "defaultValue": "An interior architecture studio in Copenhagen. Homes, hotels and workplaces shaped by light, material and restraint.", "group": "Content" },
      "ctaLabel": { "dataType": "text", "displayName": "Button Label", "defaultValue": "See our work", "group": "Content" },
      "images": { "dataType": "text", "displayName": "Image Per Word (comma separated)", "defaultValue": "https://picsum.photos/id/311/1200/1500,https://picsum.photos/id/1076/1200/1500,https://picsum.photos/id/1031/1200/1500,https://picsum.photos/id/228/1200/1500", "group": "Images" },
      "showImage": { "dataType": "booleanValue", "displayName": "Show Image Frame", "defaultValue": "true", "group": "Images" },
      "imageFilter": { "dataType": "select", "displayName": "Image Treatment", "defaultValue": "none", "options": ["none", "grayscale", "muted"], "group": "Images" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#F5F5F4", "group": "Colors" },
      "inkColor": { "dataType": "color", "displayName": "Ink", "defaultValue": "#1C1917", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#78716C", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Cycling Word Colour", "defaultValue": "#78716C", "group": "Colors" },
      "ruleColor": { "dataType": "color", "displayName": "Rules", "defaultValue": "#D6D3D1", "group": "Colors" },
      "displayFont": { "dataType": "select", "displayName": "Display Font", "defaultValue": "Instrument Serif", "options": ["Instrument Serif", "Fraunces", "Inter Tight", "system-ui"], "group": "Typography" },
      "wordStyle": { "dataType": "select", "displayName": "Cycling Word Style", "defaultValue": "italic", "options": ["italic", "upright"], "group": "Typography" },
      "maxSize": { "dataType": "select", "displayName": "Max Headline Size (px)", "defaultValue": "160", "options": ["112", "136", "160", "190", "220"], "group": "Typography" },
      "weight": { "dataType": "select", "displayName": "Headline Weight", "defaultValue": "400", "options": ["300", "400", "500"], "group": "Typography" },
      "height": { "dataType": "select", "displayName": "Height", "defaultValue": "screen", "options": ["screen", "640", "720", "800"], "group": "Layout" },
      "imageRadius": { "dataType": "select", "displayName": "Frame Radius (px)", "defaultValue": "20", "options": ["0", "8", "20", "32", "999"], "group": "Layout" },
      "imagePosition": { "dataType": "select", "displayName": "Frame Position", "defaultValue": "right", "options": ["right", "left"], "group": "Layout" },
      "showNav": { "dataType": "booleanValue", "displayName": "Top Navigation", "defaultValue": "true", "group": "Layout" },
      "showIndex": { "dataType": "booleanValue", "displayName": "Word Index", "defaultValue": "true", "group": "Layout" },
      "interval": { "dataType": "select", "displayName": "Interval (s)", "defaultValue": "2.8", "options": ["2", "2.8", "3.5", "5"], "group": "Animation" },
      "pauseOnHover": { "dataType": "booleanValue", "displayName": "Pause On Hover", "defaultValue": "true", "group": "Animation" },
      "springFeel": { "dataType": "select", "displayName": "Width Spring", "defaultValue": "smooth", "options": ["snappy", "smooth", "bouncy"], "group": "Animation" },
      "blurAmount": { "dataType": "select", "displayName": "Swap Blur (px)", "defaultValue": "10", "options": ["0", "6", "10", "16"], "group": "Animation" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const split = (s) => String(s || '').split(',').map((x) => x.trim()).filter(Boolean);
  const brand = config?.brand || 'Halden Interiors';
  const navLinks = split(config?.navLinks || 'Work,Studio,Journal,Contact');
  const prefix = config?.prefix || 'We design';
  const words = split(config?.words || 'calm,honest,lasting,quiet');
  const suffix = config?.suffix ?? 'spaces';
  const body = config?.body || 'An interior architecture studio in Copenhagen. Homes, hotels and workplaces shaped by light, material and restraint.';
  const ctaLabel = config?.ctaLabel || 'See our work';
  const images = split(config?.images || 'https://picsum.photos/id/311/1200/1500,https://picsum.photos/id/1076/1200/1500,https://picsum.photos/id/1031/1200/1500,https://picsum.photos/id/228/1200/1500');
  const showImage = bool(config?.showImage, true) && images.length > 0;
  const imageFilter = config?.imageFilter || 'none';
  const bg = config?.backgroundColor || '#F5F5F4';
  const ink = config?.inkColor || '#1C1917';
  const muted = config?.mutedColor || '#78716C';
  const accent = config?.accentColor || '#78716C';
  const rule = config?.ruleColor || '#D6D3D1';
  const displayFont = config?.displayFont || 'Instrument Serif';
  const italic = (config?.wordStyle || 'italic') === 'italic';
  const maxSize = parseInt(config?.maxSize || '160', 10) || 160;
  const weight = config?.weight || '400';
  const heightMode = config?.height || 'screen';
  const imageRadius = parseInt(config?.imageRadius || '20', 10);
  const imageLeft = (config?.imagePosition || 'right') === 'left';
  const showNav = bool(config?.showNav, true);
  const showIndex = bool(config?.showIndex, true);
  const interval = Math.max(1.2, parseFloat(config?.interval || '2.8') || 2.8) * 1000;
  const pauseOnHover = bool(config?.pauseOnHover, true);
  const spring = { snappy: { stiffness: 320, damping: 32 }, smooth: { stiffness: 150, damping: 22 }, bouncy: { stiffness: 210, damping: 14 } }[config?.springFeel || 'smooth'] || { stiffness: 150, damping: 22 };
  const blurPx = parseInt(config?.blurAmount || '10', 10);

  const uid = React.useMemo(() => 'wm' + Math.random().toString(36).slice(2, 9), []);
  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  const rootRef = React.useRef(null);
  const textColRef = React.useRef(null);
  const measureRefs = React.useRef([]);
  const prefixRef = React.useRef(null);
  const suffixRef = React.useRef(null);
  const spaceRef = React.useRef(null);
  const [width, setWidth] = React.useState(1280);
  const [colW, setColW] = React.useState(700);
  const [stageH, setStageH] = React.useState(720);
  const [ems, setEms] = React.useState({ words: [], prefix: 4, suffix: 3, space: 0.25 });
  const [idx, setIdx] = React.useState(0);
  const [prevIdx, setPrevIdx] = React.useState(-1);
  const [hover, setHover] = React.useState(false);
  const [cycle, setCycle] = React.useState(0);

  React.useEffect(() => {
    const families = { 'Instrument Serif': 'Instrument+Serif:ital@0;1', 'Fraunces': 'Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,300;1,9..144,400', 'Inter Tight': 'Inter+Tight:ital,wght@0,300;0,400;0,500;1,300;1,400' };
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
      if (textColRef.current) setColW(textColRef.current.clientWidth || 700);
    };
    measure();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (ro) { ro.observe(el); if (textColRef.current) ro.observe(textColRef.current); }
    window.addEventListener('resize', measure);
    return () => { if (ro) ro.disconnect(); window.removeEventListener('resize', measure); };
  }, []);

  const wordsKey = words.join('|');
  React.useEffect(() => {
    let alive = true;
    const run = () => {
      if (!alive) return;
      const em = (el) => (el ? el.getBoundingClientRect().width / 100 : 0);
      setEms({
        words: words.map((_, i) => em(measureRefs.current[i])),
        prefix: em(prefixRef.current),
        suffix: em(suffixRef.current),
        space: em(spaceRef.current)
      });
    };
    run();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(run);
    const t1 = setTimeout(run, 400);
    const t2 = setTimeout(run, 1200);
    return () => { alive = false; clearTimeout(t1); clearTimeout(t2); };
  }, [wordsKey, prefix, suffix, displayFont, italic, weight]); // eslint-disable-line react-hooks/exhaustive-deps

  const count = words.length;
  const next = React.useCallback(() => {
    if (count < 2) return;
    setIdx((i) => { setPrevIdx(i); return (i + 1) % count; });
    setCycle((c) => c + 1);
  }, [count]);
  const goTo = (i) => {
    if (i === idx) return;
    setPrevIdx(idx);
    setIdx(i);
    setCycle((c) => c + 1);
  };

  const compact = width < 760;
  const H = heightMode === 'screen' ? Math.max(compact ? 640 : 560, stageH) : parseInt(heightMode, 10) || 720;
  const pad = compact ? 20 : 48;
  const maxWordEm = Math.max(0.5, ...ems.words);
  const line2Em = maxWordEm + (suffix ? ems.space + ems.suffix : 0) + 0.12;
  const needEm = Math.max(ems.prefix, line2Em, 1);
  const fontSize = Math.max(36, Math.min(maxSize, (colW - 4) / needEm, H * (compact ? 0.13 : 0.22)));
  const slotW = (ems.words[idx] || maxWordEm) * fontSize + fontSize * 0.035;

  const sans = '"Inter", -apple-system, "Helvetica Neue", Arial, sans-serif';
  const display = displayFont === 'system-ui' ? sans
    : displayFont === 'Inter Tight' ? '"Inter Tight", "Inter", -apple-system, sans-serif'
    : `"${displayFont}", "Iowan Old Style", Georgia, serif`;
  const serifish = displayFont === 'Instrument Serif' || displayFont === 'Fraunces';
  const tracking = serifish ? '-0.02em' : '-0.045em';
  const filterCss = imageFilter === 'grayscale' ? 'grayscale(1) contrast(1.05)' : imageFilter === 'muted' ? 'saturate(0.6) contrast(0.96)' : 'none';
  const easeArr = [0.22, 1, 0.36, 1];
  const ease = 'cubic-bezier(0.22, 1, 0.36, 1)';
  const ease2 = 'cubic-bezier(0.76, 0, 0.24, 1)';
  const p = uid;
  const MotionSpan = motion.span;
  const wordFont = { fontFamily: display, fontWeight: weight, fontStyle: italic ? 'italic' : 'normal', letterSpacing: tracking };
  const pad2 = (n) => String(n).padStart(2, '0');

  const frameW = compact ? width - pad * 2 : Math.min(width * 0.3, (H - 220) * 0.8);
  const frameH = compact ? '100%' : frameW * 1.25;
  const btnReset = { appearance: 'none', border: 'none', background: 'transparent', padding: 0, margin: 0, font: 'inherit', color: 'inherit', cursor: 'pointer' };

  if (!count) {
    return (
      <section className="hero-word-morph" style={{ width: '100%', height: 480, background: bg, color: muted, display: 'grid', placeItems: 'center', fontFamily: sans, fontSize: 13 }}>
        Add cycling words to begin
      </section>
    );
  }

  const word = words[idx];
  const frame = showImage && (
    <div style={{
      position: 'relative', width: frameW, height: frameH, flexShrink: 0, borderRadius: Math.min(imageRadius, frameW / 2), overflow: 'hidden', background: rule,
      animation: reduced ? 'none' : `${p}-frame 1300ms ${ease2} 200ms both`
    }}>
      {images.map((src, i) => {
        const imgIdx = idx % images.length;
        const prevImg = prevIdx >= 0 ? prevIdx % images.length : -1;
        const isCur = i === imgIdx;
        const isPrev = i === prevImg && !isCur;
        const clip = isCur || isPrev ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)';
        return (
          <div key={i} aria-hidden={!isCur} style={{
            position: 'absolute', inset: 0, overflow: 'hidden', zIndex: isCur ? 3 : isPrev ? 2 : 1,
            clipPath: clip, WebkitClipPath: clip, transition: isCur && !reduced ? `clip-path 1100ms ${ease2}` : 'none'
          }}>
            <img src={src} alt={isCur ? `${prefix} ${words[idx]} ${suffix}` : ''} draggable="false" style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: filterCss,
              transform: isCur || isPrev ? 'scale(1)' : 'scale(1.18)', transition: isCur && !reduced ? `transform 1600ms ${ease}` : 'none'
            }} />
          </div>
        );
      })}
      <div style={{ position: 'absolute', left: 14, bottom: 12, zIndex: 4, fontSize: 11, letterSpacing: '0.14em', color: '#FAFAF9', mixBlendMode: 'difference', fontVariantNumeric: 'tabular-nums' }}>
        {pad2(idx + 1)} — {pad2(count)}
      </div>
    </div>
  );

  return (
    <section
      ref={rootRef}
      className={`hero-word-morph ${p}`}
      role="region"
      aria-label={`${prefix} ${words.join(', ')} ${suffix}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ position: 'relative', width: '100%', height: H, overflow: 'hidden', background: bg, color: ink, fontFamily: sans, display: 'flex', flexDirection: 'column' }}
    >
      <style>{`
        @keyframes ${p}-rise { from { transform: translateY(110%); } to { transform: translateY(0); } }
        @keyframes ${p}-fade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        @keyframes ${p}-frame { from { clip-path: inset(100% 0 0 0); transform: translateY(40px); } to { clip-path: inset(0 0 0 0); transform: none; } }
        @keyframes ${p}-bar { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        .${p} a:focus-visible, .${p} button:focus-visible { outline: 2px solid ${ink}; outline-offset: 4px; }
        .${p} .${p}-nav { position: relative; }
        .${p} .${p}-nav::after { content: ''; position: absolute; left: 0; right: 0; bottom: -3px; height: 1px; background: currentColor; transform: scaleX(0); transform-origin: right; transition: transform .5s ${ease}; }
        .${p} .${p}-nav:hover::after { transform: scaleX(1); transform-origin: left; }
        .${p} .${p}-cta { transition: background .35s, color .35s; }
        .${p} .${p}-cta:hover { background: transparent; color: ${ink}; }
        .${p} .${p}-idx { transition: color .4s; }
        .${p} .${p}-idx:hover { color: ${ink}; }
        @media (prefers-reduced-motion: reduce) { .${p} *:not(.${p}-timer) { animation: none !important; transition: none !important; } }
      `}</style>

      <div aria-hidden="true" style={{ position: 'absolute', left: -9999, top: 0, visibility: 'hidden', whiteSpace: 'nowrap', fontSize: 100, pointerEvents: 'none' }}>
        {words.map((w, i) => <span key={i} ref={(el) => { measureRefs.current[i] = el; }} style={{ ...wordFont, display: 'inline-block' }}>{w}</span>)}
        <span ref={prefixRef} style={{ ...wordFont, fontStyle: 'normal', display: 'inline-block' }}>{prefix}</span>
        <span ref={suffixRef} style={{ ...wordFont, fontStyle: 'normal', display: 'inline-block' }}>{suffix}</span>
        <span ref={spaceRef} style={{ ...wordFont, fontStyle: 'normal', display: 'inline-block', whiteSpace: 'pre' }}>{' '}</span>
      </div>

      {showNav && (
        <header style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: `${compact ? 18 : 28}px ${pad}px`, animation: reduced ? 'none' : `${p}-fade 800ms ${ease} 80ms both` }}>
          <div style={{ fontSize: 14, fontWeight: 500, letterSpacing: '-0.01em' }}>{brand}</div>
          {!compact && (
            <nav style={{ display: 'flex', gap: 32, fontSize: 13, color: muted }}>
              {navLinks.map((l, i) => <a key={i} href="#" onClick={(e) => e.preventDefault()} className={`${p}-nav`} style={{ color: 'inherit', textDecoration: 'none' }}>{l}</a>)}
            </nav>
          )}
          {compact && <div aria-hidden="true" style={{ display: 'grid', gap: 5 }}><span style={{ width: 22, height: 1, background: ink }} /><span style={{ width: 22, height: 1, background: ink }} /></div>}
        </header>
      )}

      <div style={{
        position: 'relative', flex: 1, minHeight: 0, display: 'flex', flexDirection: compact ? 'column' : (imageLeft ? 'row-reverse' : 'row'),
        alignItems: compact ? 'stretch' : 'center', justifyContent: 'space-between', gap: compact ? 24 : 56, padding: `0 ${pad}px`
      }}>
        <div ref={textColRef} style={{ flex: 1, minWidth: 0, alignSelf: compact ? 'stretch' : 'center', paddingTop: compact ? 12 : 0 }}>
          <h1 aria-label={`${prefix} ${word} ${suffix}`} style={{ margin: 0, fontFamily: display, fontWeight: weight, fontSize, lineHeight: 1.0, letterSpacing: tracking, color: ink }}>
            <span aria-hidden="true" style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.1em', marginBottom: '-0.1em' }}>
              <span style={{ display: 'inline-block', whiteSpace: 'nowrap', animation: reduced ? 'none' : `${p}-rise 1100ms ${ease} 120ms both` }}>{prefix}</span>
            </span>
            <span aria-hidden="true" style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.14em', marginBottom: '-0.14em' }}>
              <span style={{ display: 'inline-block', whiteSpace: 'nowrap', animation: reduced ? 'none' : `${p}-rise 1100ms ${ease} 220ms both` }}>
                <MotionSpan
                  initial={false}
                  animate={{ width: slotW }}
                  transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: spring.stiffness, damping: spring.damping }}
                  style={{ display: 'inline-block', position: 'relative', verticalAlign: 'baseline', color: accent, ...wordFont, clipPath: 'inset(-0.05em -0.02em -0.22em -0.02em)', WebkitClipPath: 'inset(-0.05em -0.02em -0.22em -0.02em)' }}
                >
                  <span style={{ visibility: 'hidden', whiteSpace: 'nowrap' }}>{word}</span>
                  <AnimatePresence initial={false}>
                    <MotionSpan
                      key={cycle + ':' + idx}
                      initial={reduced ? { opacity: 0 } : { y: '108%', opacity: 0, filter: `blur(${blurPx}px)` }}
                      animate={reduced ? { opacity: 1 } : { y: '0%', opacity: 1, filter: 'blur(0px)' }}
                      exit={reduced ? { opacity: 0, transition: { duration: 0 } } : { y: '-108%', opacity: 0, filter: `blur(${blurPx}px)` }}
                      transition={{ duration: reduced ? 0 : 0.85, ease: easeArr }}
                      style={{ position: 'absolute', left: 0, top: 0, whiteSpace: 'nowrap', willChange: 'transform, filter, opacity' }}
                    >
                      {word}
                    </MotionSpan>
                  </AnimatePresence>
                </MotionSpan>
                {suffix ? <span>{' ' + suffix}</span> : null}
              </span>
            </span>
          </h1>

          <div style={{ marginTop: compact ? 22 : 40, display: 'flex', flexDirection: compact ? 'column' : 'row', alignItems: compact ? 'flex-start' : 'center', gap: compact ? 16 : 32 }}>
            <p style={{ margin: 0, maxWidth: 380, fontSize: compact ? 14 : 15, lineHeight: 1.55, color: muted, animation: reduced ? 'none' : `${p}-fade 900ms ${ease} 420ms both` }}>{body}</p>
            <a href="#" onClick={(e) => e.preventDefault()} className={`${p}-cta`} style={{
              display: 'inline-flex', alignItems: 'center', gap: 10, height: 46, padding: '0 22px', borderRadius: 999, border: `1px solid ${ink}`,
              background: ink, color: bg, textDecoration: 'none', fontSize: 13, letterSpacing: '0.02em', whiteSpace: 'nowrap', flexShrink: 0,
              animation: reduced ? 'none' : `${p}-fade 900ms ${ease} 540ms both`
            }}>
              {ctaLabel}
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M2 7 H12 M8 3 L12 7 L8 11" fill="none" stroke="currentColor" strokeWidth="1.2" /></svg>
            </a>
          </div>
        </div>
        {frame && <div style={{ display: 'flex', justifyContent: compact ? 'flex-start' : 'center', ...(compact ? { flex: 1, minHeight: 140, paddingBottom: 4 } : {}) }}>{frame}</div>}
      </div>

      {showIndex && count > 1 && (
        <div role="tablist" aria-label="Words" style={{
          position: 'relative', zIndex: 2, display: 'flex', gap: compact ? 14 : 28, padding: `${compact ? 16 : 22}px 0 ${compact ? 20 : 30}px`,
          borderTop: `1px solid ${rule}`, margin: `0 ${pad}px`, flexWrap: 'wrap',
          animation: reduced ? 'none' : `${p}-fade 900ms ${ease} 660ms both`
        }}>
          {words.map((w, i) => (
            <button key={i} type="button" role="tab" aria-selected={i === idx} onClick={() => goTo(i)} className={`${p}-idx`}
              style={{ ...btnReset, position: 'relative', display: 'inline-flex', alignItems: 'baseline', gap: 8, paddingBottom: 8, fontSize: 13, color: i === idx ? ink : muted }}>
              <span style={{ fontSize: 10, fontVariantNumeric: 'tabular-nums', opacity: 0.7 }}>{pad2(i + 1)}</span>
              <span style={{ textTransform: 'capitalize' }}>{w}</span>
              <span aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 1, background: rule }} />
              {i === idx && (
                <span key={`bar${cycle}`} className={`${p}-timer`} aria-hidden="true" onAnimationEnd={next} style={{
                  position: 'absolute', left: 0, right: 0, bottom: 0, height: 1, background: ink, transformOrigin: 'left',
                  animation: `${p}-bar ${interval}ms linear both`, animationPlayState: pauseOnHover && hover ? 'paused' : 'running'
                }} />
              )}
            </button>
          ))}
        </div>
      )}
      {(!showIndex || count < 2) && count > 1 && (
        <span key={`t${cycle}`} className={`${p}-timer`} aria-hidden="true" onAnimationEnd={next} style={{ position: 'absolute', width: 1, height: 1, opacity: 0, animation: `${p}-bar ${interval}ms linear both`, animationPlayState: pauseOnHover && hover ? 'paused' : 'running' }} />
      )}
    </section>
  );
}

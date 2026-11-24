const MANIFEST = {
  "type": "Gallery.SliceShow",
  "description": "Full-bleed slideshow whose transitions slice the incoming image into staggered strips while the outgoing frame scales and darkens; a huge index numeral and masked title animate per slide, with counter hairline, thumbnail rail and optional autoplay ring",
  "editorElement": {
    "selector": ".slice-show",
    "displayName": "Slice Show",
    "archetype": "container",
    "data": {
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Portfolio — Landscapes", "group": "Content" },
      "titles": { "dataType": "text", "displayName": "Titles (comma separated)", "defaultValue": "Fjord Line,Red Canyon,Quiet Ridge,High Camp,River Mist,Northern Light", "group": "Content" },
      "captions": { "dataType": "text", "displayName": "Captions (comma separated)", "defaultValue": "Lysefjord — 05:40,Utah — Golden hour,Isle of Skye — Dusk,Khumbu — 4900 m,Oregon — Still,Lapland — 23:12", "group": "Content" },
      "images": { "dataType": "text", "displayName": "Image URLs (comma separated)", "defaultValue": "https://picsum.photos/id/1015/1920/1200,https://picsum.photos/id/1016/1920/1200,https://picsum.photos/id/1018/1920/1200,https://picsum.photos/id/1036/1920/1200,https://picsum.photos/id/1044/1920/1200,https://picsum.photos/id/1022/1920/1200", "group": "Images" },
      "imageFilter": { "dataType": "select", "displayName": "Image Treatment", "defaultValue": "none", "options": ["none", "grayscale", "muted"], "group": "Images" },
      "sliceDirection": { "dataType": "select", "displayName": "Slice Direction", "defaultValue": "vertical", "options": ["vertical", "horizontal", "diagonal"], "group": "Transition" },
      "sliceCount": { "dataType": "select", "displayName": "Slices", "defaultValue": "7", "options": ["4", "5", "7", "9", "12"], "group": "Transition" },
      "sliceMotion": { "dataType": "select", "displayName": "Slice Motion", "defaultValue": "alternate", "options": ["alternate", "uniform", "center-out"], "group": "Transition" },
      "sliceStagger": { "dataType": "select", "displayName": "Stagger (ms)", "defaultValue": "70", "options": ["40", "70", "100", "140"], "group": "Transition" },
      "transitionDuration": { "dataType": "select", "displayName": "Slice Duration (ms)", "defaultValue": "1000", "options": ["700", "1000", "1300", "1600"], "group": "Transition" },
      "outgoingDarken": { "dataType": "select", "displayName": "Outgoing Darken", "defaultValue": "0.55", "options": ["0.3", "0.55", "0.75"], "group": "Transition" },
      "autoplay": { "dataType": "booleanValue", "displayName": "Autoplay", "defaultValue": "false", "group": "Animation" },
      "interval": { "dataType": "select", "displayName": "Autoplay Interval (s)", "defaultValue": "6", "options": ["4", "6", "8", "10"], "group": "Animation" },
      "pauseOnHover": { "dataType": "booleanValue", "displayName": "Pause On Hover", "defaultValue": "true", "group": "Animation" },
      "showNumeral": { "dataType": "booleanValue", "displayName": "Index Numeral", "defaultValue": "true", "group": "Layout" },
      "showThumbnails": { "dataType": "booleanValue", "displayName": "Thumbnail Rail", "defaultValue": "true", "group": "Layout" },
      "showArrows": { "dataType": "booleanValue", "displayName": "Arrows", "defaultValue": "true", "group": "Layout" },
      "showCaption": { "dataType": "booleanValue", "displayName": "Caption", "defaultValue": "true", "group": "Layout" },
      "height": { "dataType": "select", "displayName": "Height", "defaultValue": "screen", "options": ["screen", "560", "680", "800"], "group": "Layout" },
      "scrim": { "dataType": "select", "displayName": "Legibility Scrim", "defaultValue": "medium", "options": ["none", "light", "medium", "strong"], "group": "Layout" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#0C0C0D", "group": "Colors" },
      "textColor": { "dataType": "color", "displayName": "Text", "defaultValue": "#FAFAF9", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#D6D3D1", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent (progress)", "defaultValue": "#FAFAF9", "group": "Colors" },
      "fontFamily": { "dataType": "select", "displayName": "Title Font", "defaultValue": "Fraunces", "options": ["Fraunces", "Instrument Serif", "Inter", "system-ui"], "group": "Typography" },
      "titleSize": { "dataType": "select", "displayName": "Title Size (px)", "defaultValue": "64", "options": ["48", "56", "64", "80", "96"], "group": "Typography" },
      "titleWeight": { "dataType": "select", "displayName": "Title Weight", "defaultValue": "300", "options": ["300", "400", "500"], "group": "Typography" },
      "numeralScale": { "dataType": "select", "displayName": "Numeral Scale", "defaultValue": "large", "options": ["medium", "large", "huge"], "group": "Typography" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const split = (s) => String(s || '').split(',').map((x) => x.trim()).filter(Boolean);
  const eyebrow = config?.eyebrow || 'Portfolio — Landscapes';
  const images = split(config?.images || 'https://picsum.photos/id/1015/1920/1200,https://picsum.photos/id/1016/1920/1200,https://picsum.photos/id/1018/1920/1200,https://picsum.photos/id/1036/1920/1200,https://picsum.photos/id/1044/1920/1200,https://picsum.photos/id/1022/1920/1200');
  const titles = split(config?.titles || 'Fjord Line,Red Canyon,Quiet Ridge,High Camp,River Mist,Northern Light');
  const captions = split(config?.captions || 'Lysefjord — 05:40,Utah — Golden hour,Isle of Skye — Dusk,Khumbu — 4900 m,Oregon — Still,Lapland — 23:12');
  const imageFilter = config?.imageFilter || 'none';
  const direction = config?.sliceDirection || 'vertical';
  const N = Math.max(2, Math.min(20, parseInt(config?.sliceCount || '7', 10) || 7));
  const motionMode = config?.sliceMotion || 'alternate';
  const stagger = parseInt(config?.sliceStagger || '70', 10) || 70;
  const dur = parseInt(config?.transitionDuration || '1000', 10) || 1000;
  const darken = parseFloat(config?.outgoingDarken || '0.55') || 0.55;
  const autoplay = bool(config?.autoplay, false);
  const interval = (parseFloat(config?.interval || '6') || 6) * 1000;
  const pauseOnHover = bool(config?.pauseOnHover, true);
  const showNumeral = bool(config?.showNumeral, true);
  const showThumbs = bool(config?.showThumbnails, true);
  const showArrows = bool(config?.showArrows, true);
  const showCaption = bool(config?.showCaption, true);
  const heightMode = config?.height || 'screen';
  const scrim = config?.scrim || 'medium';
  const bg = config?.backgroundColor || '#0C0C0D';
  const text = config?.textColor || '#FAFAF9';
  const muted = config?.mutedColor || '#D6D3D1';
  const accent = config?.accentColor || '#FAFAF9';
  const fontFamily = config?.fontFamily || 'Fraunces';
  const titleSize = parseInt(config?.titleSize || '64', 10) || 64;
  const titleWeight = config?.titleWeight || '300';
  const numeralScale = { medium: 0.26, large: 0.34, huge: 0.44 }[config?.numeralScale || 'large'] || 0.34;

  const count = images.length;
  const uid = React.useMemo(() => 'ss' + Math.random().toString(36).slice(2, 9), []);
  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  const rootRef = React.useRef(null);
  const timerRef = React.useRef(0);
  const swipeRef = React.useRef(null);
  const [width, setWidth] = React.useState(1280);
  const [stageH, setStageH] = React.useState(720);
  const [cur, setCur] = React.useState(0);
  const [prev, setPrev] = React.useState(reduced ? null : -1);
  const [animKey, setAnimKey] = React.useState(0);
  const [hover, setHover] = React.useState(false);
  const [playing, setPlaying] = React.useState(autoplay);

  React.useEffect(() => { setPlaying(autoplay); }, [autoplay]);

  React.useEffect(() => {
    const families = { 'Fraunces': 'Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500', 'Instrument Serif': 'Instrument+Serif:ital@0;1', 'Inter': 'Inter:wght@300;400;500' };
    const fams = [families[fontFamily], 'IBM+Plex+Mono:wght@400'].filter(Boolean);
    fams.forEach((f) => {
      const id = 'gf-' + f.replace(/[^a-z0-9]/gi, '').slice(0, 40);
      if (document.getElementById(id)) return;
      const l = document.createElement('link');
      l.id = id; l.rel = 'stylesheet';
      l.href = `https://fonts.googleapis.com/css2?family=${f}&display=swap`;
      document.head.appendChild(l);
    });
  }, [fontFamily]);

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

  const total = dur + stagger * (N - 1);
  React.useEffect(() => {
    if (prev === null) return undefined;
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setPrev(null), total + 80);
    return () => clearTimeout(timerRef.current);
  }, [animKey, prev, total]);

  const go = React.useCallback((next) => {
    if (!count) return;
    const n = ((next % count) + count) % count;
    setCur((c) => {
      if (n === c) return c;
      if (!reduced) { setPrev(c); setAnimKey((k) => k + 1); }
      return n;
    });
  }, [count, reduced]);

  const onKey = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(cur + 1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); go(cur - 1); }
    else if (e.key === 'Home') { e.preventDefault(); go(0); }
    else if (e.key === 'End') { e.preventDefault(); go(count - 1); }
  };
  const onPointerDown = (e) => { swipeRef.current = { x: e.clientX, y: e.clientY }; };
  const onPointerUp = (e) => {
    const s = swipeRef.current;
    swipeRef.current = null;
    if (!s) return;
    const dx = e.clientX - s.x;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(e.clientY - s.y)) go(cur + (dx < 0 ? 1 : -1));
  };

  const compact = width < 760;
  const H = heightMode === 'screen' ? Math.max(compact ? 560 : 520, stageH) : parseInt(heightMode, 10) || 680;
  const pad = compact ? 20 : 56;
  const sans = '"Inter", -apple-system, "Helvetica Neue", Arial, sans-serif';
  const mono = '"IBM Plex Mono", ui-monospace, "SF Mono", Menlo, monospace';
  const display = fontFamily === 'system-ui' ? sans
    : fontFamily === 'Inter' ? sans
    : `"${fontFamily}", "Iowan Old Style", Georgia, serif`;
  const filterCss = imageFilter === 'grayscale' ? 'grayscale(1) contrast(1.05)' : imageFilter === 'muted' ? 'saturate(0.55) contrast(0.96)' : 'none';
  const scrimA = { none: 0, light: 0.35, medium: 0.55, strong: 0.75 }[scrim] ?? 0.55;
  const pad2 = (n) => String(n).padStart(2, '0');

  const strip = (i) => {
    const o = 0.08;
    let dir = 1;
    if (motionMode === 'alternate') dir = i % 2 ? -1 : 1;
    let order = i;
    if (motionMode === 'center-out') { const c = (N - 1) / 2; order = Math.abs(i - c); dir = i < c ? -1 : 1; }
    let clip; let tx = '0%'; let ty = '0%';
    if (direction === 'horizontal') {
      const a = (i / N) * 100 - o; const b = ((i + 1) / N) * 100 + o;
      clip = `inset(${a}% 0 ${100 - b}% 0)`;
      tx = `${dir * 100}%`;
    } else if (direction === 'diagonal') {
      const k = 28;
      const span = 100 + k;
      const x0 = (i / N) * span - o; const x1 = ((i + 1) / N) * span + o;
      clip = `polygon(${x0}% 0%, ${x1}% 0%, ${x1 - k}% 100%, ${x0 - k}% 100%)`;
      tx = `${-dir * k}%`; ty = `${dir * 100}%`;
    } else {
      const a = (i / N) * 100 - o; const b = ((i + 1) / N) * 100 + o;
      clip = `inset(0 ${100 - b}% 0 ${a}%)`;
      ty = `${dir * 100}%`;
    }
    return { clip, tx, ty, delay: Math.round(order * stagger) };
  };

  const imgStyle = { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: filterCss, userSelect: 'none', pointerEvents: 'none' };
  const animating = prev !== null;
  const title = titles[cur] || titles[cur % Math.max(1, titles.length)] || `Frame ${cur + 1}`;
  const caption = captions[cur] || '';
  const numeralPx = Math.round(Math.min(compact ? width * 0.42 : width * 0.24, H * numeralScale));
  const tSize = compact ? Math.round(titleSize * 0.56) : titleSize;
  const chars = Array.from(title);
  const p = uid;

  const ringR = 21;
  const btn = {
    appearance: 'none', border: 'none', background: 'transparent', color: text, padding: 0, margin: 0,
    cursor: 'pointer', font: 'inherit', display: 'inline-flex', alignItems: 'center', justifyContent: 'center'
  };
  const arrowBtn = {
    ...btn, width: compact ? 44 : 52, height: compact ? 44 : 52, borderRadius: '50%',
    border: `1px solid ${text}55`, backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', background: 'rgba(12,12,13,0.18)'
  };
  const Arrow = ({ flip }) => (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" style={{ transform: flip ? 'scaleX(-1)' : 'none' }}>
      <path d="M3 9 H15 M10 4 L15 9 L10 14" fill="none" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );

  if (!count) {
    return (
      <section className="slice-show" style={{ width: '100%', height: 480, background: bg, color: muted, display: 'grid', placeItems: 'center', fontFamily: mono, fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
        Add image URLs to begin
      </section>
    );
  }

  return (
    <section
      ref={rootRef}
      className={`slice-show ${p}`}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label={eyebrow}
      onKeyDown={onKey}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ position: 'relative', width: '100%', height: H, overflow: 'hidden', background: bg, color: text, fontFamily: sans, outline: 'none', touchAction: 'pan-y', userSelect: 'none' }}
    >
      <style>{`
        @keyframes ${p}-in { from { transform: translate(var(--tx), var(--ty)) scale(1.18); } to { transform: translate(0,0) scale(1); } }
        @keyframes ${p}-out { from { transform: scale(1); filter: brightness(1); } to { transform: scale(1.09); filter: brightness(${1 - darken}); } }
        @keyframes ${p}-up { from { transform: translateY(108%); } to { transform: translateY(0); } }
        @keyframes ${p}-fade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        @keyframes ${p}-ring { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
        @keyframes ${p}-bar { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        .${p}:focus-visible { box-shadow: inset 0 0 0 2px ${accent}; }
        .${p} button:focus-visible { outline: 2px solid ${accent}; outline-offset: 3px; }
        .${p} .${p}-thumb { opacity: .55; transition: opacity .3s, transform .3s; }
        .${p} .${p}-thumb:hover { opacity: .9; transform: translateY(-2px); }
        .${p} .${p}-thumb[aria-current="true"] { opacity: 1; }
        .${p} .${p}-arrow { transition: background .25s, border-color .25s; }
        .${p} .${p}-arrow:hover { background: ${text}22; border-color: ${text}; }
        @media (prefers-reduced-motion: reduce) { .${p} * { animation: none !important; } }
      `}</style>

      <div aria-hidden="true" style={{ position: 'absolute', inset: 0 }}>
        {animating && prev >= 0 && (
          <div key={`o${animKey}`} style={{ position: 'absolute', inset: 0, animation: `${p}-out ${total}ms cubic-bezier(.5,0,.2,1) forwards` }}>
            <img src={images[prev]} alt="" draggable="false" style={imgStyle} />
          </div>
        )}
        {animating ? (
          <div key={`i${animKey}`} style={{ position: 'absolute', inset: 0 }}>
            {Array.from({ length: N }).map((_, i) => {
              const s = strip(i);
              return (
                <div key={i} style={{ position: 'absolute', inset: 0, clipPath: s.clip, WebkitClipPath: s.clip, overflow: 'hidden' }}>
                  <div style={{
                    position: 'absolute', inset: 0, '--tx': s.tx, '--ty': s.ty,
                    transform: `translate(${s.tx}, ${s.ty})`,
                    animation: `${p}-in ${dur}ms cubic-bezier(.77,0,.18,1) ${s.delay}ms forwards`
                  }}>
                    <img src={images[cur]} alt="" draggable="false" style={imgStyle} />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <img src={images[cur]} alt="" draggable="false" style={imgStyle} />
        )}
        {scrimA > 0 && (
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: `linear-gradient(180deg, rgba(0,0,0,${scrimA * 0.55}) 0%, rgba(0,0,0,0) 24%, rgba(0,0,0,0) 40%, rgba(0,0,0,${scrimA * 0.6}) 68%, rgba(0,0,0,${Math.min(0.9, scrimA * 1.25)}) 100%)`
          }} />
        )}
      </div>

      <img src={images[cur]} alt={`${title}${caption ? ' — ' + caption : ''}`} style={{ position: 'absolute', width: 1, height: 1, opacity: 0, pointerEvents: 'none' }} />

      <div style={{ position: 'absolute', top: pad, left: pad, right: pad, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24, pointerEvents: 'none' }}>
        <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: muted, lineHeight: 1.6 }}>{eyebrow}</div>
        <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.18em', color: text, textAlign: 'right' }} aria-live="polite">
          <span>{pad2(cur + 1)}</span>
          <span style={{ color: muted, opacity: 0.7 }}>{'  /  '}{pad2(count)}</span>
          <div style={{ marginTop: 10, width: compact ? 96 : 140, height: 1, background: `${text}40`, position: 'relative', marginLeft: 'auto' }}>
            <div style={{ position: 'absolute', inset: 0, background: accent, transformOrigin: 'left', transform: `scaleX(${(cur + 1) / count})`, transition: reduced ? 'none' : 'transform .9s cubic-bezier(.77,0,.18,1)' }} />
          </div>
        </div>
      </div>

      <div style={{
        position: 'absolute', left: pad, right: pad, bottom: compact ? pad + 64 : pad,
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32, pointerEvents: 'none'
      }}>
        <div style={{ display: 'flex', flexDirection: compact ? 'column' : 'row', alignItems: compact ? 'flex-start' : 'flex-end', gap: compact ? 4 : 36, minWidth: 0 }}>
          {showNumeral && (
            <div key={`n${cur}`} aria-hidden="true" style={{ display: 'flex', overflow: 'hidden', fontFamily: display, fontWeight: 300, fontSize: numeralPx, lineHeight: 0.8, letterSpacing: '-0.04em', fontVariantNumeric: 'tabular-nums lining-nums', paddingTop: '0.06em', marginBottom: compact ? 0 : '-0.05em' }}>
              {Array.from(pad2(cur + 1)).map((d, i) => (
                <span key={i} style={{ display: 'inline-block', animation: reduced ? 'none' : `${p}-up 1100ms cubic-bezier(.77,0,.18,1) ${200 + i * 90}ms both` }}>{d}</span>
              ))}
            </div>
          )}
          <div style={{ minWidth: 0, paddingBottom: compact ? 0 : Math.round(numeralPx * 0.04) }}>
            <h2 key={`t${cur}`} aria-label={title} style={{ margin: 0, fontFamily: display, fontWeight: titleWeight, fontSize: tSize, lineHeight: 1.02, letterSpacing: fontFamily === 'Inter' || fontFamily === 'system-ui' ? '-0.035em' : '-0.02em', maxWidth: compact ? '100%' : Math.min(width * 0.5, 720) }}>
              {chars.map((ch, i) => (
                <span key={i} aria-hidden="true" style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', paddingBottom: '0.08em', marginBottom: '-0.08em' }}>
                  <span style={{ display: 'inline-block', whiteSpace: 'pre', animation: reduced ? 'none' : `${p}-up 900ms cubic-bezier(.22,1,.36,1) ${360 + i * 24}ms both` }}>{ch}</span>
                </span>
              ))}
            </h2>
            {showCaption && caption && (
              <div key={`c${cur}`} style={{ marginTop: compact ? 10 : 16, fontFamily: mono, fontSize: compact ? 11 : 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: muted, animation: reduced ? 'none' : `${p}-fade 700ms ease ${560 + chars.length * 18}ms both` }}>
                {caption}
              </div>
            )}
          </div>
        </div>

        {!compact && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 22, pointerEvents: 'auto', flexShrink: 0 }}>
            {showThumbs && count > 1 && (
              <div role="tablist" aria-label="Slides" style={{ display: 'flex', gap: 8 }}>
                {images.map((src, i) => (
                  <button key={i} role="tab" aria-selected={i === cur} aria-current={i === cur} aria-label={`Go to slide ${i + 1}: ${titles[i] || ''}`}
                    className={`${p}-thumb`} onClick={() => go(i)}
                    style={{ ...btn, position: 'relative', width: 64, height: 42, overflow: 'hidden', borderRadius: 2, background: `${text}14` }}>
                    <img src={src} alt="" draggable="false" style={{ ...imgStyle, filter: filterCss }} />
                    <span style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 2, background: accent, transformOrigin: 'left', transform: `scaleX(${i === cur ? 1 : 0})`, transition: 'transform .6s cubic-bezier(.77,0,.18,1)' }} />
                  </button>
                ))}
              </div>
            )}
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              {autoplay && (
                <button aria-label={playing ? 'Pause autoplay' : 'Start autoplay'} onClick={() => setPlaying((v) => !v)} style={{ ...btn, width: 52, height: 52, position: 'relative' }}>
                  <svg width="52" height="52" viewBox="0 0 52 52" aria-hidden="true" style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}>
                    <circle cx="26" cy="26" r={ringR} fill="none" stroke={`${text}33`} strokeWidth="1" />
                    {playing && (
                      <circle key={`r${cur}`} cx="26" cy="26" r={ringR} fill="none" stroke={accent} strokeWidth="1.5"
                        pathLength="1" strokeDasharray="1" strokeDashoffset="1"
                        onAnimationEnd={() => go(cur + 1)}
                        style={{ animation: `${p}-ring ${interval}ms linear forwards`, animationPlayState: pauseOnHover && hover ? 'paused' : 'running' }} />
                    )}
                  </svg>
                  {playing
                    ? <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><rect x="2" y="1" width="2" height="10" fill="currentColor" /><rect x="8" y="1" width="2" height="10" fill="currentColor" /></svg>
                    : <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 1 L11 6 L3 11 Z" fill="currentColor" /></svg>}
                </button>
              )}
              {showArrows && count > 1 && (
                <>
                  <button className={`${p}-arrow`} aria-label="Previous slide" onClick={() => go(cur - 1)} style={arrowBtn}><Arrow flip /></button>
                  <button className={`${p}-arrow`} aria-label="Next slide" onClick={() => go(cur + 1)} style={arrowBtn}><Arrow /></button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {compact && (
        <div style={{ position: 'absolute', left: pad, right: pad, bottom: pad, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {images.map((_, i) => (
              <button key={i} aria-label={`Go to slide ${i + 1}`} aria-current={i === cur} onClick={() => go(i)}
                style={{ ...btn, width: i === cur ? 28 : 12, height: 24, transition: 'width .5s cubic-bezier(.77,0,.18,1)' }}>
                <span style={{ display: 'block', width: '100%', height: 2, background: i === cur ? accent : `${text}55` }} />
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {autoplay && (
              <button aria-label={playing ? 'Pause autoplay' : 'Start autoplay'} onClick={() => setPlaying((v) => !v)} style={{ ...arrowBtn, position: 'relative' }}>
                <svg width="44" height="44" viewBox="0 0 52 52" aria-hidden="true" style={{ position: 'absolute', inset: -1, transform: 'rotate(-90deg)' }}>
                  {playing && (
                    <circle key={`rm${cur}`} cx="26" cy="26" r={ringR + 3} fill="none" stroke={accent} strokeWidth="1.5"
                      pathLength="1" strokeDasharray="1" strokeDashoffset="1"
                      onAnimationEnd={() => go(cur + 1)}
                      style={{ animation: `${p}-ring ${interval}ms linear forwards` }} />
                  )}
                </svg>
                {playing
                  ? <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><rect x="2" y="1" width="2" height="10" fill="currentColor" /><rect x="8" y="1" width="2" height="10" fill="currentColor" /></svg>
                  : <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 1 L11 6 L3 11 Z" fill="currentColor" /></svg>}
              </button>
            )}
            {showArrows && count > 1 && (
              <>
                <button className={`${p}-arrow`} aria-label="Previous slide" onClick={() => go(cur - 1)} style={arrowBtn}><Arrow flip /></button>
                <button className={`${p}-arrow`} aria-label="Next slide" onClick={() => go(cur + 1)} style={arrowBtn}><Arrow /></button>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

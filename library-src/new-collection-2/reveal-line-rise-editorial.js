const MANIFEST = {
  "type": "Reveal.LineRiseEditorial",
  "description": "Editorial feature opener that assembles on reveal: the headline is measured into real rendered lines that rise from behind masks in a stagger, a tall photograph unclips with an inner 1.25 to 1 scale, a rule draws and kicker, byline and lede slide in",
  "editorElement": {
    "selector": ".line-rise-editorial",
    "displayName": "Line Rise Editorial",
    "archetype": "container",
    "data": {
      "kicker": { "dataType": "text", "displayName": "Kicker", "defaultValue": "The Feature", "group": "Content" },
      "issueLabel": { "dataType": "text", "displayName": "Issue Label", "defaultValue": "Architecture — Winter 2026", "group": "Content" },
      "headline": { "dataType": "text", "displayName": "Headline", "defaultValue": "A house of concrete and light, built to slow the whole day down", "group": "Content" },
      "italicWords": { "dataType": "text", "displayName": "Italic Words (comma separated)", "defaultValue": "light,slow", "group": "Content" },
      "byline": { "dataType": "text", "displayName": "Byline", "defaultValue": "Words by Elena Marsh · Photographs by Tomas Ruiz", "group": "Content" },
      "readTime": { "dataType": "text", "displayName": "Read Time", "defaultValue": "12 min read", "group": "Content" },
      "lede": { "dataType": "text", "displayName": "Lede", "defaultValue": "On a terrace above the old harbour, an architect and a stonemason spent six years on a home with no clocks, few doors and a single long window that follows the sun from breakfast to supper.", "group": "Content" },
      "imageUrl": { "dataType": "text", "displayName": "Image URL", "defaultValue": "https://picsum.photos/id/1076/1200/1500", "group": "Image" },
      "imageAlt": { "dataType": "text", "displayName": "Image Alt Text", "defaultValue": "Warm concrete facade rising into a pale sky", "group": "Image" },
      "imageCaption": { "dataType": "text", "displayName": "Image Caption", "defaultValue": "The west elevation at 07:40, late January", "group": "Image" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#F3F1EC", "group": "Colors" },
      "inkColor": { "dataType": "color", "displayName": "Ink", "defaultValue": "#171615", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#77716B", "group": "Colors" },
      "ruleColor": { "dataType": "color", "displayName": "Rule", "defaultValue": "#171615", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent (kicker mark)", "defaultValue": "#A0583A", "group": "Colors" },
      "headlineFont": { "dataType": "select", "displayName": "Headline Font", "defaultValue": "Instrument Serif", "options": ["Instrument Serif", "Fraunces", "Inter Tight", "Georgia"], "group": "Typography" },
      "bodyFont": { "dataType": "select", "displayName": "Body Font", "defaultValue": "Inter", "options": ["Inter", "DM Sans", "Inter Tight", "system-ui"], "group": "Typography" },
      "headlineSize": { "dataType": "select", "displayName": "Headline Size", "defaultValue": "auto", "options": ["auto", "64", "80", "96", "112"], "group": "Typography" },
      "headlineWeight": { "dataType": "select", "displayName": "Headline Weight", "defaultValue": "400", "options": ["300", "400", "500"], "group": "Typography" },
      "imageSide": { "dataType": "select", "displayName": "Image Side", "defaultValue": "right", "options": ["right", "left"], "group": "Layout" },
      "imageRatio": { "dataType": "select", "displayName": "Image Ratio", "defaultValue": "portrait", "options": ["portrait", "square", "tall"], "group": "Layout" },
      "showCaption": { "dataType": "booleanValue", "displayName": "Show Caption", "defaultValue": "true", "group": "Layout" },
      "triggerMode": { "dataType": "select", "displayName": "Trigger", "defaultValue": "entrance", "options": ["entrance", "scroll", "manual"], "group": "Animation", "description": "entrance plays once, scroll replays on every entry, manual only via the replay button" },
      "threshold": { "dataType": "select", "displayName": "Trigger Threshold", "defaultValue": "0.25", "options": ["0.1", "0.25", "0.4", "0.6"], "group": "Animation" },
      "lineStyle": { "dataType": "select", "displayName": "Line Rise Style", "defaultValue": "rise-tilt", "options": ["rise", "rise-tilt", "rise-blur"], "group": "Animation" },
      "lineStagger": { "dataType": "select", "displayName": "Line Stagger (ms)", "defaultValue": "110", "options": ["70", "110", "160", "220"], "group": "Animation" },
      "imageReveal": { "dataType": "select", "displayName": "Image Reveal", "defaultValue": "top-down", "options": ["top-down", "bottom-up", "centre-out", "left-right"], "group": "Animation" },
      "speed": { "dataType": "select", "displayName": "Speed", "defaultValue": "1", "options": ["0.75", "1", "1.35"], "group": "Animation", "description": "Duration multiplier" },
      "showReplay": { "dataType": "booleanValue", "displayName": "Replay Button", "defaultValue": "true", "group": "Animation" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const kicker = config?.kicker || 'The Feature';
  const issueLabel = config?.issueLabel || 'Architecture — Winter 2026';
  const headline = config?.headline || 'A house of concrete and light, built to slow the whole day down';
  const italicRaw = config?.italicWords ?? 'light,slow';
  const byline = config?.byline || 'Words by Elena Marsh · Photographs by Tomas Ruiz';
  const readTime = config?.readTime || '12 min read';
  const lede = config?.lede || 'On a terrace above the old harbour, an architect and a stonemason spent six years on a home with no clocks, few doors and a single long window that follows the sun from breakfast to supper.';
  const imageUrl = config?.imageUrl || 'https://picsum.photos/id/1076/1200/1500';
  const imageAlt = config?.imageAlt || 'Warm concrete facade rising into a pale sky';
  const imageCaption = config?.imageCaption || 'The west elevation at 07:40, late January';
  const bg = config?.backgroundColor || '#F3F1EC';
  const ink = config?.inkColor || '#171615';
  const muted = config?.mutedColor || '#77716B';
  const ruleC = config?.ruleColor || '#171615';
  const accent = config?.accentColor || '#A0583A';
  const headlineFont = config?.headlineFont || 'Instrument Serif';
  const bodyFont = config?.bodyFont || 'Inter';
  const sizeOpt = config?.headlineSize || 'auto';
  const headlineWeight = config?.headlineWeight || '400';
  const imageLeft = (config?.imageSide || 'right') === 'left';
  const ratio = { portrait: 1.25, square: 1, tall: 1.45 }[config?.imageRatio || 'portrait'] || 1.25;
  const showCaption = bool(config?.showCaption, true);
  const triggerMode = config?.triggerMode || 'entrance';
  const threshold = parseFloat(config?.threshold || '0.25') || 0.25;
  const lineStyle = config?.lineStyle || 'rise-tilt';
  const stagger = parseInt(config?.lineStagger || '110', 10) || 110;
  const imageReveal = config?.imageReveal || 'top-down';
  const speed = parseFloat(config?.speed || '1') || 1;
  const showReplay = bool(config?.showReplay, true);

  const words = React.useMemo(() => headline.split(/\s+/).filter(Boolean), [headline]);
  const italicSet = React.useMemo(() => new Set(String(italicRaw).split(',').map((w) => w.trim().toLowerCase().replace(/[^\p{L}\p{N}'-]/gu, '')).filter(Boolean)), [italicRaw]);
  const isItalic = (w) => italicSet.has(w.toLowerCase().replace(/[^\p{L}\p{N}'-]/gu, ''));

  const uid = React.useMemo(() => 'lr' + Math.random().toString(36).slice(2, 9), []);
  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const useIso = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

  React.useEffect(() => {
    const families = {
      'Instrument Serif': 'Instrument+Serif:ital@0;1',
      'Fraunces': 'Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,300;1,9..144,400',
      'Inter Tight': 'Inter+Tight:ital,wght@0,300;0,400;0,500;1,300;1,400',
      'Inter': 'Inter:wght@300;400;500',
      'DM Sans': 'DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500'
    };
    [families[headlineFont], families[bodyFont]].filter(Boolean).forEach((f) => {
      const id = 'gf-' + f.replace(/[^a-z0-9]/gi, '').slice(0, 40);
      if (document.getElementById(id)) return;
      const l = document.createElement('link');
      l.id = id; l.rel = 'stylesheet';
      l.href = `https://fonts.googleapis.com/css2?family=${f}&display=swap`;
      document.head.appendChild(l);
    });
  }, [headlineFont, bodyFont]);

  const rootRef = React.useRef(null);
  const measureRef = React.useRef(null);
  const wordRefs = React.useRef([]);
  const [width, setWidth] = React.useState(1280);
  const [stageH, setStageH] = React.useState(800);
  const [lines, setLines] = React.useState(null);
  const [played, setPlayed] = React.useState(reduced || triggerMode === 'manual');
  const rafRef = React.useRef(0);

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

  const split = React.useCallback(() => {
    const els = wordRefs.current.slice(0, words.length);
    if (!els.length || els.some((e) => !e)) return;
    const out = [];
    let lastTop = null;
    els.forEach((e, i) => {
      const t = e.offsetTop;
      if (lastTop === null || Math.abs(t - lastTop) > 4) { out.push([]); lastTop = t; }
      out[out.length - 1].push(i);
    });
    setLines((prev) => (prev && JSON.stringify(prev) === JSON.stringify(out) ? prev : out));
  }, [words]);

  useIso(() => { split(); });

  React.useEffect(() => {
    const m = measureRef.current;
    if (!m) return undefined;
    let alive = true;
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => split()) : null;
    if (ro) ro.observe(m);
    const onFonts = () => { if (alive) split(); };
    if (document.fonts) {
      document.fonts.ready.then(onFonts);
      document.fonts.addEventListener && document.fonts.addEventListener('loadingdone', onFonts);
    }
    return () => {
      alive = false;
      if (ro) ro.disconnect();
      if (document.fonts && document.fonts.removeEventListener) document.fonts.removeEventListener('loadingdone', onFonts);
    };
  }, [split]);

  const replay = React.useCallback(() => {
    if (reduced) return;
    cancelAnimationFrame(rafRef.current);
    setPlayed(false);
    rafRef.current = requestAnimationFrame(() => { rafRef.current = requestAnimationFrame(() => setPlayed(true)); });
  }, [reduced]);

  React.useEffect(() => {
    if (reduced || triggerMode === 'manual') { setPlayed(true); return undefined; }
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') { setPlayed(true); return undefined; }
    setPlayed(false);
    const io = new IntersectionObserver((entries) => {
      const e = entries[0];
      if (e.isIntersecting) {
        rafRef.current = requestAnimationFrame(() => setPlayed(true));
        if (triggerMode === 'entrance') io.disconnect();
      } else if (triggerMode === 'scroll') {
        cancelAnimationFrame(rafRef.current);
        setPlayed(false);
      }
    }, { threshold: Math.min(threshold, 0.5) });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(rafRef.current); };
  }, [triggerMode, threshold, reduced]);

  const compact = width < 760;
  const pad = compact ? 20 : Math.round(Math.min(72, Math.max(32, width * 0.05)));
  const gap = compact ? 28 : Math.round(width * 0.045);
  const imgColW = compact ? width - pad * 2 : Math.round((width - pad * 2 - gap) * 0.4);
  const textColW = compact ? width - pad * 2 : width - pad * 2 - gap - imgColW;
  const autoSize = compact ? Math.max(38, Math.min(56, width * 0.11)) : Math.max(52, Math.min(124, textColW * 0.15));
  const hSize = Math.round(sizeOpt === 'auto' ? autoSize : (compact ? parseInt(sizeOpt, 10) * 0.55 : parseInt(sizeOpt, 10)));
  const imgH = compact ? Math.round(imgColW * 1.05) : Math.round(Math.min(imgColW * ratio, Math.max(420, stageH - pad * 2 - 70)));

  const headCss = headlineFont === 'Georgia' ? 'Georgia, "Times New Roman", serif'
    : headlineFont === 'Inter Tight' ? '"Inter Tight", "Inter", -apple-system, sans-serif'
    : `"${headlineFont}", "Iowan Old Style", Georgia, serif`;
  const bodyCss = bodyFont === 'system-ui' ? 'system-ui, -apple-system, sans-serif' : `"${bodyFont}", -apple-system, "Helvetica Neue", Arial, sans-serif`;
  const sansHead = headlineFont === 'Inter Tight';
  const headStyle = {
    fontFamily: headCss, fontWeight: headlineWeight, fontSize: hSize, lineHeight: sansHead ? 1.02 : 0.98,
    letterSpacing: sansHead ? '-0.045em' : '-0.018em', margin: 0, color: ink
  };

  const E = 'cubic-bezier(0.22, 1, 0.36, 1)';
  const EIO = 'cubic-bezier(0.77, 0, 0.175, 1)';
  const ms = (v) => Math.round(v * speed);
  const nLines = lines ? lines.length : 1;
  const tr = (props, delay, dur, ease) => (played && !reduced ? props.map((p) => `${p} ${ms(dur)}ms ${ease || E} ${ms(delay)}ms`).join(', ') : 'none');
  const fadeUp = (delay, dist = 14) => ({
    opacity: played ? 1 : 0,
    transform: played ? 'none' : `translateY(${dist}px)`,
    transition: tr(['opacity', 'transform'], delay, 900)
  });
  const hiddenLine = lineStyle === 'rise' ? 'translateY(108%)' : lineStyle === 'rise-blur' ? 'translateY(70%)' : 'translateY(112%) rotate(3.5deg)';
  const clipFrom = { 'top-down': 'inset(0% 0% 100% 0%)', 'bottom-up': 'inset(100% 0% 0% 0%)', 'centre-out': 'inset(50% 0% 50% 0%)', 'left-right': 'inset(0% 100% 0% 0%)' }[imageReveal] || 'inset(0% 0% 100% 0%)';
  const linesDone = 260 + (nLines - 1) * stagger + 900;
  const wordNode = (w, i) => (
    <React.Fragment key={i}>
      {isItalic(w) ? <em style={{ fontStyle: 'italic', fontWeight: headlineWeight }}>{w}</em> : w}
      {' '}
    </React.Fragment>
  );

  const replayBtn = showReplay && (
    <button type="button" onClick={replay} aria-label="Replay the reveal" className={`${uid}-replay`}
      style={{
        appearance: 'none', border: `1px solid ${muted}66`, background: 'transparent', color: ink, cursor: 'pointer',
        width: 40, height: 40, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: 0, flex: '0 0 auto'
      }}>
      <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true"><path d="M13.5 8a5.5 5.5 0 1 1-1.7-3.98M13.5 2.5v3h-3" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </button>
  );

  const headlineBlock = (
    <div style={{ position: 'relative' }}>
      <div ref={measureRef} aria-hidden="true" style={{ ...headStyle, position: 'absolute', left: 0, top: 0, width: '100%', visibility: 'hidden', pointerEvents: 'none' }}>
        {words.map((w, i) => (
          <React.Fragment key={i}>
            <span ref={(el) => { wordRefs.current[i] = el; }} style={isItalic(w) ? { fontStyle: 'italic' } : undefined}>{w}</span>{' '}
          </React.Fragment>
        ))}
      </div>
      <h2 style={{ ...headStyle, visibility: lines ? 'visible' : 'hidden' }}>
        {(lines || [words.map((w, i) => i)]).map((ln, li) => (
          <span key={li + ':' + ln.join(',')} style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.12em', marginBottom: '-0.12em', paddingRight: '0.08em' }}>
            <span style={{
              display: 'block', transformOrigin: '0% 100%', whiteSpace: 'nowrap',
              transform: played ? 'none' : hiddenLine,
              opacity: lineStyle === 'rise-blur' && !played ? 0 : 1,
              filter: lineStyle === 'rise-blur' ? (played ? 'blur(0px)' : 'blur(10px)') : 'none',
              transition: tr(['transform', 'opacity', 'filter'], 260 + li * stagger, 1150)
            }}>
              {ln.map((wi) => wordNode(words[wi], wi))}
            </span>
          </span>
        ))}
      </h2>
    </div>
  );

  const imageBlock = (
    <figure style={{ margin: 0, width: imgColW, flex: '0 0 auto' }}>
      <div style={{
        position: 'relative', width: '100%', height: imgH, overflow: 'hidden', background: `${muted}22`,
        clipPath: played ? 'inset(0% 0% 0% 0%)' : clipFrom, WebkitClipPath: played ? 'inset(0% 0% 0% 0%)' : clipFrom,
        transition: tr(['clip-path', '-webkit-clip-path'], 300, 1300, 'cubic-bezier(0.7, 0, 0.2, 1)')
      }}>
        {imageUrl ? (
          <img src={imageUrl} alt={imageAlt} draggable="false" style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            transform: played ? 'scale(1)' : 'scale(1.25)', transformOrigin: '50% 40%',
            transition: tr(['transform'], 340, 2200, 'cubic-bezier(0.16, 1, 0.3, 1)')
          }} />
        ) : (
          <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', color: muted, fontSize: 13 }}>Add an image URL</div>
        )}
      </div>
      {showCaption && imageCaption && (
        <figcaption style={{ display: 'flex', justifyContent: 'space-between', gap: 16, marginTop: 12, fontSize: 12.5, color: muted, ...fadeUp(1250, 8) }}>
          <span>{imageCaption}</span>
          <span style={{ fontVariantNumeric: 'tabular-nums' }}>Fig. 01</span>
        </figcaption>
      )}
    </figure>
  );

  const metaRow = (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: compact ? '6px 14px' : '6px 22px', fontSize: compact ? 12.5 : 13.5, color: ink, ...fadeUp(linesDone - 300) }}>
      <span>{byline}</span>
      {readTime && <span style={{ color: muted }}>{readTime}</span>}
    </div>
  );

  return (
    <section ref={rootRef} className={`line-rise-editorial ${uid}`} aria-label={headline}
      style={{ position: 'relative', width: '100%', minHeight: compact ? 0 : Math.max(560, stageH), boxSizing: 'border-box', background: bg, color: ink, fontFamily: bodyCss, padding: compact ? `28px ${pad}px 40px` : `${Math.round(pad * 0.7)}px ${pad}px ${pad}px`, display: 'flex', flexDirection: 'column' }}>
      <style>{`
        .${uid} .${uid}-replay { transition: background .3s, color .3s, transform .5s cubic-bezier(0.22,1,0.36,1); }
        .${uid} .${uid}-replay:hover { background: ${ink}; color: ${bg}; transform: rotate(-90deg); }
        .${uid} .${uid}-replay:focus-visible { outline: 2px solid ${ink}; outline-offset: 3px; }
      `}</style>

      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, ...fadeUp(120, 10) }}>
          <span style={{ width: 7, height: 7, background: accent, display: 'inline-block', borderRadius: 1 }} />
          <span>{kicker}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, color: muted }}>
          {!compact && <span style={fadeUp(200, 10)}>{issueLabel}</span>}
          {replayBtn}
        </div>
      </header>
      <div aria-hidden="true" style={{ height: 1, background: ruleC, marginTop: compact ? 14 : 18, transformOrigin: imageLeft ? '100% 50%' : '0% 50%', transform: played ? 'scaleX(1)' : 'scaleX(0)', transition: tr(['transform'], 0, 1400, EIO) }} />

      {compact ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 28 }}>
          {headlineBlock}
          {metaRow}
          {imageBlock}
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: muted, ...fadeUp(linesDone - 150) }}>{lede}</p>
        </div>
      ) : (
        <div style={{ flex: 1, display: 'flex', flexDirection: imageLeft ? 'row-reverse' : 'row', gap, marginTop: Math.round(pad * 0.6), alignItems: 'stretch' }}>
          <div style={{ width: textColW, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 32 }}>
            {headlineBlock}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 22, paddingBottom: showCaption ? 30 : 0 }}>
              {metaRow}
              <div aria-hidden="true" style={{ width: 48, height: 1, background: ruleC, transformOrigin: 'left', transform: played ? 'scaleX(1)' : 'scaleX(0)', transition: tr(['transform'], linesDone - 200, 900, EIO) }} />
              <p style={{ margin: 0, maxWidth: 520, fontSize: Math.round(Math.min(19, Math.max(16, width * 0.0135))), lineHeight: 1.62, color: muted, ...fadeUp(linesDone - 120) }}>{lede}</p>
            </div>
          </div>
          {imageBlock}
        </div>
      )}
    </section>
  );
}

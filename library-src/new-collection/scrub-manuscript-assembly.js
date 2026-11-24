const MANIFEST = {
  "type": "Scrub.ManuscriptAssembly",
  "description": "Scroll-scrubbed editorial spread that typesets itself: column guides and baseline grid draw in, the headline tracks from wide to tight, a drop cap scales in, body copy flows line by line, the image opens from a slit, folios land and the guides fade away with live typographic annotations",
  "editorElement": {
    "selector": ".manuscript-assembly",
    "displayName": "Manuscript Assembly",
    "archetype": "container",
    "data": {
      "runningHead": { "dataType": "text", "displayName": "Running Head", "defaultValue": "The Quarterly — Issue 14", "group": "Content" },
      "section": { "dataType": "text", "displayName": "Section", "defaultValue": "Architecture", "group": "Content" },
      "headline": { "dataType": "text", "displayName": "Headline (use / for line break)", "defaultValue": "The quiet geometry / of rooms", "group": "Content" },
      "deck": { "dataType": "text", "displayName": "Standfirst", "defaultValue": "A house in the Jura built from one module, one material and a great deal of patience.", "group": "Content" },
      "byline": { "dataType": "text", "displayName": "Byline", "defaultValue": "Words by Lena Marchetti · Photographs by Ivo Brandt", "group": "Content" },
      "body1": { "dataType": "text", "displayName": "Body Column 1", "defaultValue": "Every room in the house is a multiple of the same square: a little over three metres a side, the span of a single larch beam. The architects did not arrive at it by theory. They arrived at it by carrying timber up a mountain road, and by noticing how much easier everything became once nothing had to be cut. The result is a plan that reads like a sentence with only one word in it, repeated until it means something new. The kitchen is two squares, the library three, the long gallery that joins them seven in a row. Ceilings follow the same arithmetic, rising a third of a module in the rooms meant for gathering and dropping a third in the rooms meant for sleep. Nothing is decorated, yet nothing is plain: the larch has been left to silver on the outside and oiled on the inside, so that the same beam reads as two materials depending on which side of the glass you stand.", "group": "Content" },
      "body2": { "dataType": "text", "displayName": "Body Column 2", "defaultValue": "Walls stop short of the ceiling so that light can travel. Doors are pocketed into thickened partitions that double as shelving. Even the stair is a stack of modules, each tread a square divided by twelve. What could feel rigid instead feels calm, because the rule is applied everywhere and announced nowhere. Visitors rarely notice the grid at all. They notice that the chairs always seem to be in the right place, and that the evening sun finds the same wall in every room at once.", "group": "Content" },
      "pullQuote": { "dataType": "text", "displayName": "Pull Quote", "defaultValue": "“The rule is applied everywhere and announced nowhere.”", "group": "Content" },
      "image": { "dataType": "text", "displayName": "Image URL", "defaultValue": "https://picsum.photos/id/1031/900/1100?grayscale", "group": "Images" },
      "imageAlt": { "dataType": "text", "displayName": "Image Alt", "defaultValue": "Interior of a timber house with light falling across a wall", "group": "Images" },
      "caption": { "dataType": "text", "displayName": "Caption", "defaultValue": "Fig. 3 — The north room at 4 pm, December.", "group": "Images" },
      "folio": { "dataType": "text", "displayName": "Page Number", "defaultValue": "48", "group": "Content" },
      "backgroundColor": { "dataType": "color", "displayName": "Paper", "defaultValue": "#FAFAF9", "group": "Colors" },
      "inkColor": { "dataType": "color", "displayName": "Ink", "defaultValue": "#1C1917", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#78716C", "group": "Colors" },
      "ruleColor": { "dataType": "color", "displayName": "Rules", "defaultValue": "#D6D3D1", "group": "Colors" },
      "guideColor": { "dataType": "color", "displayName": "Guides & Annotations", "defaultValue": "#E5484D", "group": "Colors" },
      "headlineFont": { "dataType": "select", "displayName": "Headline Font", "defaultValue": "Fraunces", "options": ["Fraunces", "Instrument Serif", "Inter", "Georgia"], "group": "Typography" },
      "bodyFont": { "dataType": "select", "displayName": "Body Font", "defaultValue": "Fraunces", "options": ["Fraunces", "Inter", "Georgia"], "group": "Typography" },
      "headlineSize": { "dataType": "select", "displayName": "Headline Size (px)", "defaultValue": "96", "options": ["72", "84", "96", "108"], "group": "Typography" },
      "headlineWeight": { "dataType": "select", "displayName": "Headline Weight", "defaultValue": "300", "options": ["300", "400", "500"], "group": "Typography" },
      "trackingStart": { "dataType": "select", "displayName": "Starting Tracking (em)", "defaultValue": "0.22", "options": ["0.12", "0.22", "0.32"], "group": "Typography" },
      "baseline": { "dataType": "select", "displayName": "Baseline Grid (px)", "defaultValue": "20", "options": ["18", "20", "22"], "group": "Layout" },
      "showAnnotations": { "dataType": "booleanValue", "displayName": "Typographic Annotations", "defaultValue": "true", "group": "Layout" },
      "keepGuides": { "dataType": "booleanValue", "displayName": "Keep Guides at End", "defaultValue": "false", "group": "Layout" },
      "scrollLength": { "dataType": "select", "displayName": "Scroll Length (screens)", "defaultValue": "5", "options": ["3", "4", "5", "6", "7"], "group": "Layout" },
      "smoothing": { "dataType": "select", "displayName": "Scrub Smoothing", "defaultValue": "0.14", "options": ["0.08", "0.14", "0.22", "1"], "group": "Animation", "description": "1 = locked to the scrollbar, lower = more glide" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const runningHead = config?.runningHead || 'The Quarterly — Issue 14';
  const section = config?.section || 'Architecture';
  const headline = config?.headline || 'The quiet geometry / of rooms';
  const deck = config?.deck || 'A house in the Jura built from one module, one material and a great deal of patience.';
  const byline = config?.byline || 'Words by Lena Marchetti · Photographs by Ivo Brandt';
  const body1 = config?.body1 || 'Every room in the house is a multiple of the same square: a little over three metres a side, the span of a single larch beam. The architects did not arrive at it by theory. They arrived at it by carrying timber up a mountain road, and by noticing how much easier everything became once nothing had to be cut. The result is a plan that reads like a sentence with only one word in it, repeated until it means something new. The kitchen is two squares, the library three, the long gallery that joins them seven in a row. Ceilings follow the same arithmetic, rising a third of a module in the rooms meant for gathering and dropping a third in the rooms meant for sleep. Nothing is decorated, yet nothing is plain: the larch has been left to silver on the outside and oiled on the inside, so that the same beam reads as two materials depending on which side of the glass you stand.';
  const body2 = config?.body2 || 'Walls stop short of the ceiling so that light can travel. Doors are pocketed into thickened partitions that double as shelving. Even the stair is a stack of modules, each tread a square divided by twelve. What could feel rigid instead feels calm, because the rule is applied everywhere and announced nowhere. Visitors rarely notice the grid at all. They notice that the chairs always seem to be in the right place, and that the evening sun finds the same wall in every room at once.';
  const pullQuote = config?.pullQuote || '“The rule is applied everywhere and announced nowhere.”';
  const image = config?.image || 'https://picsum.photos/id/1031/900/1100?grayscale';
  const imageAlt = config?.imageAlt || 'Interior of a timber house with light falling across a wall';
  const caption = config?.caption || 'Fig. 3 — The north room at 4 pm, December.';
  const folio = config?.folio || '48';
  const paper = config?.backgroundColor || '#FAFAF9';
  const ink = config?.inkColor || '#1C1917';
  const muted = config?.mutedColor || '#78716C';
  const rule = config?.ruleColor || '#D6D3D1';
  const guide = config?.guideColor || '#E5484D';
  const headlineFont = config?.headlineFont || 'Fraunces';
  const bodyFont = config?.bodyFont || 'Fraunces';
  const headlineSizeBase = parseInt(config?.headlineSize || '96', 10);
  const headlineWeight = config?.headlineWeight || '300';
  const trackStart = parseFloat(config?.trackingStart || '0.22');
  const lead = parseInt(config?.baseline || '20', 10);
  const showAnn = bool(config?.showAnnotations, true);
  const keepGuides = bool(config?.keepGuides, false);
  const screens = parseFloat(config?.scrollLength || '5');
  const smoothing = Math.min(1, Math.max(0.02, parseFloat(config?.smoothing || '0.14')));

  const prefersReducedMotion = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  React.useEffect(() => {
    const id = 'ma-fonts-fraunces-plex';
    if (typeof document === 'undefined' || document.getElementById(id)) return;
    const l = document.createElement('link');
    l.id = id; l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,300;1,9..144,400&family=Instrument+Serif:ital@0;1&family=IBM+Plex+Mono:wght@400&family=Inter:wght@300;400;500&display=swap';
    document.head.appendChild(l);
  }, []);

  const sectionRef = React.useRef(null);
  const target = React.useRef(0);
  const current = React.useRef(0);
  const [progress, setProgress] = React.useState(prefersReducedMotion ? 1 : 0);
  const [stageH, setStageH] = React.useState(800);
  const [width, setWidth] = React.useState(1280);
  const [mounted, setMounted] = React.useState(prefersReducedMotion);

  React.useEffect(() => {
    if (prefersReducedMotion) return undefined;
    const r = requestAnimationFrame(() => requestAnimationFrame(() => setMounted(true)));
    return () => cancelAnimationFrame(r);
  }, [prefersReducedMotion]);

  React.useEffect(() => {
    const s = typeof getScrollContainer === 'function' ? getScrollContainer() : null;
    const scroller = s && s !== window && s.nodeType === 1 ? s : window;
    const sec = sectionRef.current;
    if (!sec) return undefined;
    let raf = 0;
    const read = () => {
      const r = sec.getBoundingClientRect();
      const top = scroller === window ? 0 : scroller.getBoundingClientRect().top;
      const vh = scroller === window ? window.innerHeight : scroller.getBoundingClientRect().height;
      const travel = r.height - vh;
      target.current = travel > 0 ? Math.min(1, Math.max(0, (top - r.top) / travel)) : 0;
    };
    const tick = () => {
      const d = target.current - current.current;
      current.current = Math.abs(d) < 0.0004 ? target.current : current.current + d * smoothing;
      setProgress(current.current);
      raf = current.current === target.current ? 0 : requestAnimationFrame(tick);
    };
    const onScroll = () => { read(); if (!raf && !prefersReducedMotion) raf = requestAnimationFrame(tick); };
    const measure = () => {
      setStageH(scroller === window ? window.innerHeight : scroller.clientHeight);
      setWidth(sec.clientWidth);
      onScroll();
    };
    measure();
    scroller.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (ro) ro.observe(sec);
    return () => {
      scroller.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
      if (ro) ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [smoothing, prefersReducedMotion]);

  const p = prefersReducedMotion ? 1 : progress;
  const clamp = (v) => Math.min(1, Math.max(0, v));
  const seg = (a, b) => clamp((p - a) / (b - a));
  const ease = (t) => 1 - Math.pow(1 - t, 3);
  const easeIO = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const win = (a, b) => (prefersReducedMotion ? 0 : ease(seg(a, a + 0.04)) * (1 - ease(seg(b - 0.04, b))));

  const W = Math.max(320, width);
  const H = Math.max(480, stageH);
  const compact = W < 760;
  const cols = compact ? 4 : 12;
  const gutter = compact ? 12 : 24;
  const m = compact ? 20 : Math.max(40, Math.round(W * 0.045));
  const contentW = W - m * 2;
  const colW = (contentW - gutter * (cols - 1)) / cols;
  const colX = (i) => m + i * (colW + gutter);
  const spanW = (a, b) => colX(b) + colW - colX(a);

  const headLines = headline.split('/').map((s) => s.trim()).filter(Boolean);
  const hs = compact ? Math.min(40, Math.round(headlineSizeBase * 0.42)) : Math.min(headlineSizeBase, Math.round(H * 0.12));
  const headLH = Math.round(hs * 0.92);
  const headTop = compact ? 64 : 86;
  const headBottom = headTop + headLH * headLines.length;
  const deckTop = compact ? headBottom + 14 : headTop + 8;
  const ruleY = compact ? deckTop + 74 : Math.max(headBottom + 26, 290);
  const bodyTop = Math.ceil((ruleY + 22) / lead) * lead;
  const footY = H - (compact ? 44 : 54);
  const bodyFS = Math.round(lead * 0.68);
  const capLines = 3;
  const capFS = Math.round(lead * capLines * 1.18);

  const bodyAreaH = footY - 22 - bodyTop;
  const col1 = compact ? { x: colX(0), w: contentW } : { x: colX(0), w: spanW(0, 3) };
  const col2 = { x: colX(4), w: spanW(4, 7) };
  const quoteH = compact ? 0 : Math.round(lead * 5);
  const col1H = compact ? Math.floor((bodyAreaH * 0.5) / lead) * lead : Math.floor(bodyAreaH / lead) * lead;
  const col2H = Math.floor((bodyAreaH - quoteH - lead) / lead) * lead;
  const img = compact
    ? { x: colX(0), y: bodyTop + col1H + lead, w: contentW, h: footY - 40 - (bodyTop + col1H + lead) }
    : { x: colX(8), y: bodyTop, w: spanW(8, 11), h: bodyAreaH - 26 };

  const lines1 = Math.round(col1H / lead);
  const lines2 = compact ? 0 : Math.round(col2H / lead);
  const flow = seg(0.3, 0.62) * (lines1 + lines2 + 2);

  const track = trackStart * (compact ? 0.35 : 1) + (-0.02 - trackStart * (compact ? 0.35 : 1)) * easeIO(seg(0.08, 0.3));
  const capIn = ease(seg(0.22, 0.34));
  const slitW = easeIO(seg(0.46, 0.53));
  const slitH = easeIO(seg(0.52, 0.64));
  const quoteIn = ease(seg(0.6, 0.7));
  const capIn2 = ease(seg(0.62, 0.7));
  const deckIn = compact ? 1 : ease(seg(0.16, 0.28));
  const furniture = ease(seg(0.66, 0.78));
  const guidesOut = keepGuides ? 0 : ease(seg(0.8, 0.93));
  const guideOp = mounted ? 1 - guidesOut : 0;

  const mono = '"IBM Plex Mono", ui-monospace, "SF Mono", Menlo, monospace';
  const fontOf = (f) => (f === 'Inter' ? 'Inter, -apple-system, "Helvetica Neue", sans-serif' : f === 'Georgia' ? 'Georgia, "Times New Roman", serif' : `"${f}", "Iowan Old Style", Georgia, serif`);
  const headFont = fontOf(headlineFont);
  const bFont = fontOf(bodyFont);

  const reveal = (n, offset) => {
    const r = Math.min(n, Math.max(0, flow - offset));
    if (r >= n) return 'none';
    const k = Math.floor(r);
    const f = easeIO(r - k) * 100;
    return `polygon(-2% 0, 102% 0, 102% ${k * lead}px, ${f}% ${k * lead}px, ${f}% ${(k + 1) * lead}px, -2% ${(k + 1) * lead}px)`;
  };

  const firstChar = body1.charAt(0);
  const restBody1 = body1.slice(1);
  const annLabel = { fontFamily: mono, fontSize: 9.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: guide, whiteSpace: 'nowrap', lineHeight: 1.3 };
  const ann = (op, style, children, key) => (showAnn && op > 0.001 ? (
    <div key={key} aria-hidden="true" style={{ position: 'absolute', zIndex: 6, opacity: op, pointerEvents: 'none', ...style }}>{children}</div>
  ) : null);
  const trackLabel = Math.round(track * 1000);
  const baselineRows = Math.floor((footY - bodyTop) / lead);

  return (
    <section ref={sectionRef} className="manuscript-assembly" aria-label={`${headLines.join(' ')} — ${deck}`}
      style={{ position: 'relative', width: '100%', height: `${Math.round(stageH * screens)}px`, backgroundColor: paper, color: ink }}>
      <div style={{ position: 'sticky', top: 0, height: `${stageH}px`, overflow: 'hidden', background: paper }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, opacity: guideOp, transition: 'opacity 500ms ease', zIndex: 1 }}>
          {Array.from({ length: cols }, (_, i) => (
            <div key={i} style={{
              position: 'absolute', left: colX(i), width: colW, top: 0, bottom: 0,
              background: guide, opacity: 0.055, borderLeft: `1px solid ${guide}`, borderRight: `1px solid ${guide}`,
              transformOrigin: 'top', transform: `scaleY(${mounted ? 1 : 0})`,
              transition: prefersReducedMotion ? 'none' : `transform 900ms cubic-bezier(.2,.7,.1,1) ${i * 45}ms`
            }} />
          ))}
          {Array.from({ length: cols }, (_, i) => (
            <div key={'e' + i} style={{ position: 'absolute', left: colX(i), width: colW, top: 0, bottom: 0, borderLeft: `1px solid ${guide}`, borderRight: `1px solid ${guide}`, opacity: 0.22, transformOrigin: 'top', transform: `scaleY(${mounted ? 1 : 0})`, transition: prefersReducedMotion ? 'none' : `transform 900ms cubic-bezier(.2,.7,.1,1) ${i * 45}ms` }} />
          ))}
          {Array.from({ length: baselineRows + 1 }, (_, i) => (
            <div key={'b' + i} style={{
              position: 'absolute', left: m, width: contentW, top: bodyTop + i * lead - 0.5, height: 1, background: '#0EA5E9', opacity: 0.18,
              transformOrigin: 'left', transform: `scaleX(${mounted ? 1 : 0})`,
              transition: prefersReducedMotion ? 'none' : `transform 700ms cubic-bezier(.2,.7,.1,1) ${300 + i * 22}ms`
            }} />
          ))}
          <div style={{ position: 'absolute', left: m, right: m, top: compact ? 8 : 14, display: 'flex', justifyContent: 'space-between', ...annLabel, fontSize: 9 }}>
            <span>{cols} col / {gutter} gutter</span>
            {!compact && <span>margins {m} · baseline {lead} pt</span>}
            <span>{Math.round(W)} × {Math.round(H)}</span>
          </div>
        </div>

        <div style={{ position: 'absolute', left: m, right: m, top: compact ? 24 : 34, display: 'flex', justifyContent: 'space-between', fontFamily: mono, fontSize: compact ? 9.5 : 10.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: muted, opacity: furniture, zIndex: 3 }}>
          <span>{runningHead}</span><span>{section}</span>
        </div>
        <div style={{ position: 'absolute', left: m, right: m, top: compact ? 44 : 58, height: 1, background: ink, transformOrigin: 'left', transform: `scaleX(${furniture})`, zIndex: 3 }} />

        <h2 style={{ position: 'absolute', left: colX(0), top: headTop, margin: 0, zIndex: 3, fontFamily: headFont, fontWeight: headlineWeight, fontSize: hs, lineHeight: `${headLH}px`, letterSpacing: `${track}em`, color: ink, fontVariationSettings: headlineFont === 'Fraunces' ? '"opsz" 144' : undefined }}>
          {headLines.map((l, i) => <span key={i} style={{ display: 'block', whiteSpace: 'nowrap' }}>{l}</span>)}
        </h2>

        <div style={{
          position: 'absolute', zIndex: 3, left: compact ? colX(0) : colX(8), top: deckTop, width: compact ? contentW : spanW(8, 11),
          opacity: deckIn, transform: `translateY(${(1 - deckIn) * 10}px)`
        }}>
          <p style={{ margin: 0, fontFamily: '"Fraunces", Georgia, serif', fontStyle: 'italic', fontWeight: 300, fontSize: compact ? 16 : 21, lineHeight: 1.35, color: ink }}>{deck}</p>
          <div style={{ marginTop: compact ? 8 : 16, fontFamily: mono, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: muted }}>{byline}</div>
        </div>

        <div style={{ position: 'absolute', zIndex: 3, left: m, width: contentW, top: ruleY, height: 1, background: rule, transformOrigin: 'left', transform: `scaleX(${ease(seg(0.2, 0.32))})` }} />

        <div style={{ position: 'absolute', zIndex: 3, left: col1.x, top: bodyTop, width: col1.w, height: col1H, overflow: 'hidden' }}>
          <p style={{ margin: 0, fontFamily: bFont, fontSize: bodyFS, lineHeight: `${lead}px`, color: ink, textAlign: 'justify', hyphens: 'auto', WebkitHyphens: 'auto', fontWeight: bodyFont === 'Inter' ? 300 : 400, clipPath: reveal(lines1, 0) }}>
            <span style={{ float: 'left', fontFamily: headFont, fontSize: capFS, lineHeight: `${lead * capLines}px`, height: lead * capLines, marginRight: 8, marginTop: 3, visibility: 'hidden' }}>{firstChar}</span>
            {restBody1}
          </p>
          <span aria-hidden="true" style={{
            position: 'absolute', left: 0, top: 3, fontFamily: headFont, fontSize: capFS, lineHeight: `${lead * capLines}px`, color: ink, fontWeight: headlineWeight,
            transformOrigin: 'left top', transform: `scale(${0.3 + capIn * 0.7})`, opacity: capIn
          }}>{firstChar}</span>
        </div>

        {!compact && (
          <div style={{ position: 'absolute', zIndex: 3, left: col2.x, top: bodyTop, width: col2.w, height: col2H, overflow: 'hidden' }}>
            <p style={{ margin: 0, fontFamily: bFont, fontSize: bodyFS, lineHeight: `${lead}px`, color: ink, textAlign: 'justify', hyphens: 'auto', WebkitHyphens: 'auto', textIndent: lead, fontWeight: bodyFont === 'Inter' ? 300 : 400, clipPath: reveal(lines2, lines1) }}>{body2}</p>
          </div>
        )}
        {!compact && (
          <div style={{ position: 'absolute', zIndex: 3, left: col2.x, width: col2.w, top: bodyTop + col2H + lead, height: quoteH, borderTop: `1px solid ${ink}`, paddingTop: lead * 0.6, boxSizing: 'border-box', opacity: quoteIn, transform: `translateY(${(1 - quoteIn) * 12}px)` }}>
            <p style={{ margin: 0, fontFamily: headFont, fontStyle: 'italic', fontWeight: 300, fontSize: Math.round(lead * 1.15), lineHeight: `${Math.round(lead * 1.3)}px`, color: ink }}>{pullQuote}</p>
          </div>
        )}

        <div style={{
          position: 'absolute', zIndex: 3, left: img.x, top: img.y, width: img.w, height: Math.max(40, img.h), background: '#E7E5E4',
          clipPath: `inset(${(1 - slitH) * 49.6}% ${(1 - slitW) * 50}% ${(1 - slitH) * 49.6}% ${(1 - slitW) * 50}%)`
        }}>
          {image ? <img src={image} alt={imageAlt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: `scale(${1.25 - slitH * 0.25})` }} />
            : <div style={{ width: '100%', height: '100%', background: 'repeating-linear-gradient(45deg, #E7E5E4 0 8px, #D6D3D1 8px 9px)' }} />}
        </div>
        <div style={{ position: 'absolute', zIndex: 3, left: img.x, top: img.y + Math.max(40, img.h) + 10, width: img.w, fontFamily: mono, fontSize: 9.5, letterSpacing: '0.06em', color: muted, opacity: capIn2 }}>{caption}</div>

        <div style={{ position: 'absolute', zIndex: 3, left: m, right: m, top: footY, height: 1, background: rule, transformOrigin: 'right', transform: `scaleX(${furniture})` }} />
        <div style={{ position: 'absolute', zIndex: 3, left: m, right: m, top: footY + 12, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontFamily: mono, fontSize: compact ? 9.5 : 10.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: muted, opacity: furniture, transform: `translateY(${(1 - furniture) * 8}px)` }}>
          <span><span style={{ fontFamily: headFont, fontSize: compact ? 16 : 20, letterSpacing: 0, color: ink, marginRight: 14 }}>{folio}</span>{runningHead}</span>
          {!compact && <span>{section}</span>}
        </div>

        {ann(win(0.02, 0.36), { left: colX(0), top: headTop - 18 }, (
          <div style={annLabel}>Headline · {headlineFont} {headlineWeight} · {hs}/{headLH} pt · tracking {trackLabel > 0 ? '+' : ''}{trackLabel}</div>
        ), 'h')}
        {ann(win(0.02, 0.36), { left: m - (compact ? 14 : 22), top: headTop, height: headLH }, (
          <div style={{ position: 'relative', height: headLH, width: 8 }}>
            <div style={{ position: 'absolute', left: 3, top: 0, bottom: 0, width: 1, background: guide }} />
            <div style={{ position: 'absolute', left: 0, top: 0, width: 7, height: 1, background: guide }} />
            <div style={{ position: 'absolute', left: 0, bottom: 0, width: 7, height: 1, background: guide }} />
          </div>
        ), 'hb')}
        {ann(win(0.22, 0.48), { left: col1.x + capFS * 0.75, top: bodyTop - lead * 1.1 }, (
          <div style={{ ...annLabel, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 18, height: 1, background: guide, display: 'inline-block' }} />Drop cap · {capLines} lines · {capFS} pt
          </div>
        ), 'dc')}
        {ann(win(0.3, 0.64), { left: col1.x + col1.w - (compact ? 150 : 170), top: bodyTop + lead * 6 }, (
          <div style={{ display: 'flex', alignItems: 'stretch', gap: 6, background: paper, padding: '0 6px 0 0', boxShadow: `0 0 0 1px ${guide}` }}>
            <div style={{ position: 'relative', width: 9, height: lead * 2 }}>
              <div style={{ position: 'absolute', left: 4, top: 0, bottom: 0, width: 1, background: guide }} />
              <div style={{ position: 'absolute', left: 0, top: 0, width: 9, height: 1, background: guide }} />
              <div style={{ position: 'absolute', left: 0, bottom: 0, width: 9, height: 1, background: guide }} />
            </div>
            <div style={{ ...annLabel, alignSelf: 'center' }}>Body {bodyFS}/{lead} pt<br />justified · hyphens on</div>
          </div>
        ), 'bd')}
        {ann(win(0.44, 0.74), { left: img.x, top: img.y, width: img.w, height: Math.max(40, img.h) }, (
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            {[[0, 0], [1, 0], [0, 1], [1, 1]].map(([sx, sy], k) => (
              <div key={k} style={{ position: 'absolute', [sx ? 'right' : 'left']: -10, [sy ? 'bottom' : 'top']: -10, width: 18, height: 18, [sx ? 'borderRight' : 'borderLeft']: `1px solid ${guide}`, [sy ? 'borderBottom' : 'borderTop']: `1px solid ${guide}` }} />
            ))}
            <div style={{ ...annLabel, position: 'absolute', left: 0, top: -24 }}>Crop {Math.round(img.w)} × {Math.round(img.h)} · {(img.w / img.h).toFixed(2)} : 1</div>
          </div>
        ), 'im')}
        {ann(win(0.6, 0.78), compact ? { right: m, top: footY - 20 } : { left: col2.x, top: bodyTop + col2H + lead - 18 }, (
          <div style={annLabel}>Pull quote · italic {Math.round(lead * 1.15)}/{Math.round(lead * 1.3)} pt</div>
        ), 'pq')}
        {ann(win(0.68, 0.86), { left: m, top: footY - 18 }, (
          <div style={annLabel}>Folio · running foot · {compact ? 9.5 : 10.5} pt caps +140</div>
        ), 'fo')}
        {ann(win(0.0, 0.3), { left: compact ? m : m - 30, top: bodyTop, height: lead * 6 }, (
          compact ? <div style={annLabel}>Baseline {lead} pt</div>
            : <div style={{ ...annLabel, writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>Baseline {lead} pt</div>
        ), 'bl')}
      </div>
    </section>
  );
}

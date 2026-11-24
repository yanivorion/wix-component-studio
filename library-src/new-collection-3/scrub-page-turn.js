const MANIFEST = {
  "type": "Scrub.PageTurn",
  "description": "A printed booklet lies open on the table; scrolling turns its pages one by one in real 3D, each leaf hinged at the spine and curling through sliced strips with light that follows the bend",
  "editorElement": {
    "selector": ".page-turn",
    "displayName": "Page Turn",
    "archetype": "container",
    "data": {
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Booklet / Edition 03", "group": "Content" },
      "title": { "dataType": "text", "displayName": "Title", "defaultValue": "Turn the page, slowly", "group": "Content" },
      "bookTitle": { "dataType": "text", "displayName": "Running Head", "defaultValue": "Printed Matter", "group": "Content" },
      "spreadCount": { "dataType": "select", "displayName": "Spreads", "defaultValue": "4", "options": ["3", "4", "5"], "group": "Content" },
      "spread1Title": { "dataType": "text", "displayName": "Spread 1 Headline", "defaultValue": "Printed Matter", "group": "Spreads" },
      "spread1Text": { "dataType": "text", "displayName": "Spread 1 Text", "defaultValue": "A small booklet about paper, ink and the quiet pleasure of a page that has weight.", "group": "Spreads" },
      "spread1Image": { "dataType": "text", "displayName": "Spread 1 Image", "defaultValue": "https://picsum.photos/seed/atelier/900/700?grayscale", "group": "Spreads" },
      "spread2Title": { "dataType": "text", "displayName": "Spread 2 Headline", "defaultValue": "Weight and grain", "group": "Spreads" },
      "spread2Text": { "dataType": "text", "displayName": "Spread 2 Text", "defaultValue": "Uncoated stock drinks the ink. Edges soften, blacks go velvet, and every sheet keeps a little of the hand that fed it.", "group": "Spreads" },
      "spread2Image": { "dataType": "text", "displayName": "Spread 2 Image", "defaultValue": "https://picsum.photos/seed/linen/900/1200?grayscale", "group": "Spreads" },
      "spread3Title": { "dataType": "text", "displayName": "Spread 3 Headline", "defaultValue": "One colour, used once", "group": "Spreads" },
      "spread3Text": { "dataType": "text", "displayName": "Spread 3 Text", "defaultValue": "Restraint is a layout decision. A single accent tells the eye where to land and lets the rest of the page breathe.", "group": "Spreads" },
      "spread3Image": { "dataType": "text", "displayName": "Spread 3 Image", "defaultValue": "https://picsum.photos/seed/gallery/900/700?grayscale", "group": "Spreads" },
      "spread4Title": { "dataType": "text", "displayName": "Spread 4 Headline", "defaultValue": "Bound by hand", "group": "Spreads" },
      "spread4Text": { "dataType": "text", "displayName": "Spread 4 Text", "defaultValue": "Saddle stitched, trimmed square, numbered in pencil. Two hundred copies, then the plates are scrubbed clean.", "group": "Spreads" },
      "spread4Image": { "dataType": "text", "displayName": "Spread 4 Image", "defaultValue": "https://picsum.photos/seed/poster/900/700?grayscale", "group": "Spreads" },
      "spread5Title": { "dataType": "text", "displayName": "Spread 5 Headline", "defaultValue": "The end matter", "group": "Spreads" },
      "spread5Text": { "dataType": "text", "displayName": "Spread 5 Text", "defaultValue": "Colophon: set in a neo-grotesk and a mono, printed on 120 gsm natural, folded and kept.", "group": "Spreads" },
      "spread5Image": { "dataType": "text", "displayName": "Spread 5 Image", "defaultValue": "https://picsum.photos/seed/window/900/700?grayscale", "group": "Spreads" },
      "backgroundColor": { "dataType": "color", "displayName": "Table", "defaultValue": "#E4E2DD", "group": "Colors" },
      "paperColor": { "dataType": "color", "displayName": "Paper", "defaultValue": "#F6F5F1", "group": "Colors" },
      "inkColor": { "dataType": "color", "displayName": "Ink", "defaultValue": "#141413", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted", "defaultValue": "#77756F", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent", "defaultValue": "#D9480F", "group": "Colors" },
      "headlineWeight": { "dataType": "select", "displayName": "Headline Weight", "defaultValue": "500", "options": ["300", "400", "500"], "group": "Typography" },
      "fontFamily": { "dataType": "select", "displayName": "Grotesk", "defaultValue": "Inter Tight", "options": ["Inter Tight", "Inter", "Helvetica Neue", "system-ui"], "group": "Typography" },
      "scrollLength": { "dataType": "select", "displayName": "Scroll Length (screens)", "defaultValue": "4", "options": ["3", "4", "5", "6"], "group": "Layout" },
      "tilt": { "dataType": "select", "displayName": "Table Angle", "defaultValue": "medium", "options": ["flat", "subtle", "medium", "steep"], "group": "Layout" },
      "showLabels": { "dataType": "booleanValue", "displayName": "Corner Labels", "defaultValue": "true", "group": "Layout" },
      "curl": { "dataType": "select", "displayName": "Page Curl", "defaultValue": "soft", "options": ["none", "soft", "strong"], "group": "Animation" },
      "smoothing": { "dataType": "select", "displayName": "Scrub Smoothing", "defaultValue": "0.14", "options": ["0.08", "0.14", "0.22", "1"], "group": "Animation", "description": "1 = locked to the scrollbar, lower = more glide" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const eyebrow = config?.eyebrow || 'Booklet / Edition 03';
  const title = config?.title || 'Turn the page, slowly';
  const bookTitle = config?.bookTitle || 'Printed Matter';
  const S = Math.min(5, Math.max(3, parseInt(config?.spreadCount || '4', 10) || 4));
  const defs = [
    ['Printed Matter', 'A small booklet about paper, ink and the quiet pleasure of a page that has weight.', 'https://picsum.photos/seed/atelier/900/700?grayscale'],
    ['Weight and grain', 'Uncoated stock drinks the ink. Edges soften, blacks go velvet, and every sheet keeps a little of the hand that fed it.', 'https://picsum.photos/seed/linen/900/1200?grayscale'],
    ['One colour, used once', 'Restraint is a layout decision. A single accent tells the eye where to land and lets the rest of the page breathe.', 'https://picsum.photos/seed/gallery/900/700?grayscale'],
    ['Bound by hand', 'Saddle stitched, trimmed square, numbered in pencil. Two hundred copies, then the plates are scrubbed clean.', 'https://picsum.photos/seed/poster/900/700?grayscale'],
    ['The end matter', 'Colophon: set in a neo-grotesk and a mono, printed on 120 gsm natural, folded and kept.', 'https://picsum.photos/seed/window/900/700?grayscale']
  ];
  const spreads = defs.slice(0, S).map((d, i) => ({
    title: config?.[`spread${i + 1}Title`] || d[0],
    text: config?.[`spread${i + 1}Text`] || d[1],
    image: config?.[`spread${i + 1}Image`] || d[2]
  }));
  const bg = config?.backgroundColor || '#E4E2DD';
  const paper = config?.paperColor || '#F6F5F1';
  const ink = config?.inkColor || '#141413';
  const muted = config?.mutedColor || '#77756F';
  const accent = config?.accentColor || '#D9480F';
  const headlineWeight = config?.headlineWeight || '500';
  const fontFamily = config?.fontFamily || 'Inter Tight';
  const screens = parseFloat(config?.scrollLength || '4') || 4;
  const tiltDeg = { flat: 8, subtle: 20, medium: 30, steep: 42 }[config?.tilt || 'medium'] ?? 30;
  const showLabels = bool(config?.showLabels, true);
  const curlAmt = { none: 0, soft: 34, strong: 54 }[config?.curl || 'soft'] ?? 26;
  const smoothing = Math.min(1, Math.max(0.02, parseFloat(config?.smoothing || '0.14')));

  const prefersReducedMotion = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  React.useEffect(() => {
    const id = 'ncs3-font-intertight-jbmono';
    if (typeof document === 'undefined' || document.getElementById(id)) return;
    const l = document.createElement('link');
    l.id = id; l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500;600&family=Inter:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap';
    document.head.appendChild(l);
  }, []);

  const sectionRef = React.useRef(null);
  const target = React.useRef(0);
  const current = React.useRef(0);
  const [progress, setProgress] = React.useState(prefersReducedMotion ? 1 : 0);
  const [stageH, setStageH] = React.useState(720);
  const [width, setWidth] = React.useState(1280);

  React.useEffect(() => {
    const s = typeof getScrollContainer === 'function' ? getScrollContainer() : null;
    const scroller = s && s !== window && s.nodeType === 1 ? s : window;
    const section = sectionRef.current;
    if (!section) return undefined;
    let raf = 0;
    const read = () => {
      const r = section.getBoundingClientRect();
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
    const onScroll = () => { read(); if (prefersReducedMotion) return; if (!raf) raf = requestAnimationFrame(tick); };
    const measure = () => {
      setStageH(scroller === window ? window.innerHeight : scroller.clientHeight);
      setWidth(section.clientWidth);
      onScroll();
    };
    measure();
    scroller.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (ro) ro.observe(section);
    return () => {
      scroller.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
      if (ro) ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [smoothing, prefersReducedMotion]);

  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const seg = (a, b) => clamp((progress - a) / (b - a));
  const easeIO = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const ease = (t) => 1 - Math.pow(1 - t, 3);
  const lerp = (a, b, t) => a + (b - a) * t;

  const compact = width < 760;
  const cosT = Math.cos((tiltDeg * Math.PI) / 180);
  const pageW = Math.round(Math.min((width * (compact ? 0.92 : 0.74)) / 2, (stageH * (compact ? 0.5 : 0.66)) / (1.32 * cosT)));
  const pageH = Math.round(pageW * 1.32);
  const u = pageW / 100;
  const tiny = u < 2.7;

  const mono = '"JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace';
  const sans = fontFamily === 'system-ui' ? 'system-ui, -apple-system, sans-serif' : `"${fontFamily}", "Inter", -apple-system, "Helvetica Neue", sans-serif`;
  const m = Math.round(u * 7);
  const folioFs = Math.max(6.5, u * 2.25);

  const greek = (lines, w) => (
    <div aria-hidden="true">
      {Array.from({ length: lines }, (_, i) => (
        <div key={i} style={{ height: 1.5, background: ink, opacity: 0.3, width: i === lines - 1 ? '55%' : `${w - (i % 3) * 6}%`, marginTop: i ? 4 : 0 }} />
      ))}
    </div>
  );
  const body = (text, fs, lines, w = 100) => tiny
    ? greek(lines, w)
    : <p style={{ margin: 0, fontFamily: sans, fontSize: fs, lineHeight: 1.42, fontWeight: 400, color: ink, letterSpacing: '-0.005em' }}>{text}</p>;
  const folio = (n, side, label) => (
    <div style={{ position: 'absolute', left: m, right: m, bottom: m * 0.8, display: 'flex', justifyContent: side === 'L' ? 'flex-start' : 'flex-end', gap: u * 3, fontFamily: mono, fontSize: folioFs, letterSpacing: '0.1em', color: muted, textTransform: 'uppercase' }}>
      {side === 'L' ? <><span style={{ color: ink }}>{String(n).padStart(2, '0')}</span><span>{label}</span></> : <><span>{label}</span><span style={{ color: ink }}>{String(n).padStart(2, '0')}</span></>}
    </div>
  );
  const head = (txt, fs) => (
    <div style={{ fontFamily: sans, fontWeight: headlineWeight, fontSize: fs, lineHeight: 0.94, letterSpacing: '-0.045em', color: ink }}>{txt}</div>
  );
  const runHead = (side, right) => (
    <div style={{ position: 'absolute', left: m, right: m, top: m * 0.8, display: 'flex', justifyContent: 'space-between', fontFamily: mono, fontSize: folioFs, letterSpacing: '0.12em', color: muted, textTransform: 'uppercase' }}>
      <span>{side === 'L' ? bookTitle : right}</span><span>{side === 'L' ? right : bookTitle}</span>
    </div>
  );
  const img = (src, style) => (
    <div style={{ position: 'absolute', overflow: 'hidden', background: '#d9d7d2', ...style }}>
      <img src={src} alt="" draggable="false" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'contrast(1.05)', mixBlendMode: 'multiply' }} />
    </div>
  );

  // static page compositions, memoised so per-frame renders reuse the same elements
  const pages = React.useMemo(() => spreads.map((sp, k) => {
    const v = k === 0 ? 0 : 1 + ((k - 1) % 2);
    const nL = k * 2 + 2;
    const nR = nL + 1;
    const chapter = `${String(k + 1).padStart(2, '0')} / ${String(S).padStart(2, '0')}`;
    let L, R;
    if (v === 0) {
      L = (
        <>
          {runHead('L', 'Vol. 03')}
          <div style={{ position: 'absolute', left: m, right: m, top: pageH * 0.36 }}>
            <div style={{ width: u * 9, height: u * 9, borderRadius: '50%', background: accent, marginBottom: u * 6 }} />
            {head(sp.title, u * 15.5)}
          </div>
          <div style={{ position: 'absolute', left: m, right: m * 2.4, bottom: m * 2.2, fontFamily: mono, fontSize: folioFs, lineHeight: 1.6, letterSpacing: '0.06em', color: muted, textTransform: 'uppercase' }}>
            {S} spreads · {S * 2 + 2} pages · Saddle stitch
          </div>
          {folio(nL, 'L', 'Contents')}
        </>
      );
      R = (
        <>
          {runHead('R', chapter)}
          {img(sp.image, { left: m, right: m, top: m * 2.2, height: pageH * 0.46 })}
          <div style={{ position: 'absolute', left: m, right: m, top: m * 2.2 + pageH * 0.46 + u * 6 }}>
            <div style={{ fontFamily: mono, fontSize: folioFs, letterSpacing: '0.12em', color: accent, textTransform: 'uppercase', marginBottom: u * 3 }}>Introduction</div>
            <div style={{ width: '82%' }}>{body(sp.text, u * 3.5, 4, 92)}</div>
          </div>
          {folio(nR, 'R', 'Introduction')}
        </>
      );
    } else if (v === 1) {
      L = (
        <>
          {img(sp.image, { inset: 0 })}
          <div style={{ position: 'absolute', left: m, bottom: m * 0.8, fontFamily: mono, fontSize: folioFs, letterSpacing: '0.1em', color: '#F6F5F1', textTransform: 'uppercase', display: 'flex', gap: u * 3 }}>
            <span>{String(nL).padStart(2, '0')}</span><span style={{ opacity: 0.75 }}>Plate {String(k).padStart(2, '0')}</span>
          </div>
        </>
      );
      R = (
        <>
          {runHead('R', chapter)}
          <div style={{ position: 'absolute', left: m, right: m, top: m * 2.6 }}>
            <div style={{ fontFamily: mono, fontSize: folioFs * 2.2, letterSpacing: '-0.02em', color: accent, marginBottom: u * 4 }}>{String(k + 1).padStart(2, '0')}</div>
            {head(sp.title, u * 12.5)}
          </div>
          <div style={{ position: 'absolute', left: m, right: m, bottom: m * 2.4, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: u * 4, alignItems: 'end' }}>
            <div style={{ height: 1, background: ink, opacity: 0.85, alignSelf: 'start', marginTop: u }} />
            <div>{body(sp.text, u * 3.1, 6, 96)}</div>
          </div>
          {folio(nR, 'R', sp.title)}
        </>
      );
    } else {
      L = (
        <>
          {runHead('L', chapter)}
          <div style={{ position: 'absolute', left: m * 0.8, bottom: m * 1.6, fontFamily: sans, fontWeight: 300, fontSize: u * 58, lineHeight: 0.8, letterSpacing: '-0.07em', color: ink }}>
            {String(k + 1).padStart(2, '0')}
          </div>
          <div style={{ position: 'absolute', left: m, top: m * 2.6, width: u * 5, height: u * 5, background: accent }} />
          {folio(nL, 'L', 'Chapter')}
        </>
      );
      R = (
        <>
          {runHead('R', chapter)}
          <div style={{ position: 'absolute', left: m, right: m, top: m * 2.6 }}>{head(sp.title, u * 11)}</div>
          <div style={{ position: 'absolute', left: m, width: pageW * 0.42 - m * 0.5, top: pageH * 0.5 }}>{body(sp.text, u * 3, 7, 96)}</div>
          {img(sp.image, { right: m, width: pageW * 0.42, top: pageH * 0.5, height: pageH * 0.3 })}
          {folio(nR, 'R', sp.title)}
        </>
      );
    }
    const wrap = (inner, side) => (
      <div style={{ position: 'absolute', left: 0, top: 0, width: pageW, height: pageH, background: paper, overflow: 'hidden' }}>
        {inner}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: side === 'L'
          ? 'linear-gradient(90deg, rgba(0,0,0,0) 78%, rgba(0,0,0,0.05) 92%, rgba(0,0,0,0.16) 100%)'
          : 'linear-gradient(90deg, rgba(0,0,0,0.16) 0%, rgba(0,0,0,0.05) 8%, rgba(0,0,0,0) 22%)' }} />
      </div>
    );
    return { L: wrap(L, 'L'), R: wrap(R, 'R') };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [S, pageW, pageH, paper, ink, muted, accent, headlineWeight, sans, bookTitle, JSON.stringify(spreads)]);

  // leaf timeline: leaf i = right page of spread i (front) + left page of spread i+1 (back)
  const LN = S - 1;
  const t0 = 0.06, t1 = 0.9;
  const slot = (t1 - t0) / LN;
  const th = Array.from({ length: LN }, (_, i) => easeIO(seg(t0 + i * slot + slot * 0.04, t0 + (i + 1) * slot - slot * 0.04)));
  let active = th.findIndex((t) => t < 1);
  if (active < 0) active = LN;
  const shownSpread = th.reduce((n, t) => n + (t >= 0.5 ? 1 : 0), 0);

  const M = compact ? 4 : 5;
  const stripW = pageW / M;
  const f = (j) => Math.pow((j + 1) / M, 1.6);
  const shadeFront = (A) => clamp(Math.pow(clamp((A - 28) / 62), 1.3) * 0.5);
  const hiFront = (A) => 0.2 * Math.exp(-Math.pow((A - 24) / 20, 2));
  const shadeBack = (A) => clamp(Math.pow(clamp((180 - A) / 90), 1.4) * 0.48);
  const hiBack = (A) => 0.12 * Math.exp(-Math.pow((A - 150) / 18, 2));

  const castShadow = (side) => {
    if (active >= LN) return null;
    const A = th[active] * 180;
    const c = Math.cos((A * Math.PI) / 180);
    const s = Math.sin((A * Math.PI) / 180);
    if (side === 'R' && A > 0.5 && A < 90) {
      const w = Math.max(4, c * 100);
      return `linear-gradient(90deg, rgba(0,0,0,${0.32 * s}) 0%, rgba(0,0,0,${0.12 * s}) ${w * 0.7}%, rgba(0,0,0,0) ${Math.min(100, w + 6)}%)`;
    }
    if (side === 'L' && A >= 90 && A < 179.5) {
      const w = Math.max(4, -c * 100);
      return `linear-gradient(270deg, rgba(0,0,0,${0.3 * s}) 0%, rgba(0,0,0,${0.1 * s}) ${w * 0.7}%, rgba(0,0,0,0) ${Math.min(100, w + 6)}%)`;
    }
    return null;
  };
  const castR = castShadow('R');
  const castL = castShadow('L');
  const shadowOverlay = (g, offX) => (g ? <div style={{ position: 'absolute', left: offX, top: 0, width: pageW, height: pageH, background: g, pointerEvents: 'none' }} /> : null);

  const leaf = (i) => {
    const t = th[i];
    const theta = t * 180;
    const c = curlAmt * (0.75 * Math.sin(2 * Math.PI * t) - 0.5 * Math.sin(Math.PI * t)) * (prefersReducedMotion ? 0 : 1);
    const prevDone = i === 0 ? 1 : ease(clamp((th[i - 1] - 0.6) / 0.4));
    const idle = (prefersReducedMotion || t >= 1 || i !== active) ? 0 : 7 * prevDone * (1 - t);
    const A = Array.from({ length: M }, (_, j) => clamp(theta + (c + idle) * f(j), 0, 180));
    const z = lerp((LN - i) * 0.7, (i + 1) * 0.7, t) + Math.sin(Math.PI * t) * 3;
    const underR = active === i - 1 ? castR : null; // this leaf's front sits under the turning one
    const underL = active === i + 1 ? castL : null; // this leaf's back sits under the turning one
    const strip = (j) => {
      const Aj = A[j];
      const prev = j === 0 ? 0 : A[j - 1];
      const aL = j === 0 ? Aj : (A[j - 1] + Aj) / 2;
      const aR = j === M - 1 ? Aj : (Aj + A[j + 1]) / 2;
      const fL = shadeFront(aL), fR = shadeFront(aR), hL = hiFront(aL), hR = hiFront(aR);
      const bL = shadeBack(aL), bR = shadeBack(aR), bhL = hiBack(aL), bhR = hiBack(aR);
      const face = { position: 'absolute', left: 0, top: 0, width: stripW + 0.6, height: pageH, overflow: 'hidden', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' };
      return (
        <div key={j} style={{ position: 'absolute', left: j === 0 ? 0 : stripW, top: 0, width: stripW, height: pageH, transformStyle: 'preserve-3d', transformOrigin: 'left center', transform: `rotateY(${-(Aj - prev)}deg)` }}>
          <div style={face}>
            <div style={{ position: 'absolute', left: -j * stripW, top: 0 }}>{pages[i].R}</div>
            {shadowOverlay(underR, -j * stripW)}
            <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(90deg, rgba(255,255,255,${hL}), rgba(255,255,255,${hR})), linear-gradient(90deg, rgba(0,0,0,${fL}), rgba(0,0,0,${fR}))` }} />
          </div>
          <div style={{ ...face, transformOrigin: `${stripW / 2}px 50%`, transform: 'rotateY(180deg)' }}>
            <div style={{ position: 'absolute', left: -(pageW - (j + 1) * stripW), top: 0 }}>{pages[i + 1].L}</div>
            {shadowOverlay(underL, -(pageW - (j + 1) * stripW))}
            <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(90deg, rgba(255,255,255,${bhR}), rgba(255,255,255,${bhL})), linear-gradient(90deg, rgba(0,0,0,${bR}), rgba(0,0,0,${bL}))` }} />
          </div>
          {j < M - 1 && strip(j + 1)}
        </div>
      );
    };
    const flat = idle === 0 && (t === 0 || t === 1);
    const flatFace = { position: 'absolute', inset: 0, overflow: 'hidden', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' };
    return (
      <div key={i} style={{ position: 'absolute', left: pageW, top: 0, width: pageW, height: pageH, transformStyle: 'preserve-3d', transform: `translateZ(${z}px)` }}>
        {flat ? (
          <div style={{ position: 'absolute', inset: 0, transformStyle: 'preserve-3d', transformOrigin: 'left center', transform: `rotateY(${-theta}deg)` }}>
            <div style={flatFace}>{pages[i].R}{shadowOverlay(underR, 0)}</div>
            <div style={{ ...flatFace, transform: 'rotateY(180deg)' }}>{pages[i + 1].L}{shadowOverlay(underL, 0)}</div>
          </div>
        ) : strip(0)}
      </div>
    );
  };

  const intro = ease(seg(0, 0.12));
  const outro = easeIO(seg(0.86, 1));
  const tilt = lerp(tiltDeg + 6, tiltDeg, intro) * (compact ? 0.6 : 1) * (1 - 0.35 * outro);
  const rz = lerp(-4, -1.5, intro) * (1 - outro);
  const sceneY = stageH * (compact ? 0.4 : 0.55);
  const persp = Math.round(Math.max(1600, width * 1.7));
  const baseRShadow = active === LN - 1 ? castR : null;
  const baseLShadow = active === 0 ? castL : null;
  const edges = (dir) => Array.from({ length: 4 }, (_, k) => `${dir * (k + 1) * 0.9}px ${(k + 1) * 1.1}px 0 ${k % 2 ? '#dedcd6' : '#ebe9e4'}`).join(', ');

  const pad = compact ? 20 : 48;
  const pL = active < LN ? active * 2 + 2 : LN * 2 + 2;
  const cur = Math.min(S, shownSpread + 1);

  return (
    <section ref={sectionRef} className="page-turn" aria-label={`${title}: ${bookTitle}`}
      style={{ position: 'relative', width: '100%', height: `${Math.round(stageH * screens)}px`, backgroundColor: bg, color: ink, fontFamily: sans }}>
      <div style={{ position: 'sticky', top: 0, height: `${stageH}px`, overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(90% 70% at 50% 40%, rgba(255,255,255,0.5), rgba(255,255,255,0) 70%)' }} />

        {showLabels && (
          <div style={{ position: 'absolute', top: compact ? 22 : 40, left: pad, right: pad, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 3, gap: 16 }}>
            <div>
              <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: muted, marginBottom: 10 }}>{eyebrow}</div>
              <h2 style={{ margin: 0, fontFamily: sans, fontWeight: 500, fontSize: compact ? 26 : 34, lineHeight: 1, letterSpacing: '-0.035em' }}>{title}</h2>
            </div>
            {!compact && (
              <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: muted, textAlign: 'right', lineHeight: 1.7 }}>
                <div>{bookTitle}</div>
                <div style={{ color: ink }}>pp. {String(pL).padStart(2, '0')}–{String(pL + 1).padStart(2, '0')}</div>
              </div>
            )}
          </div>
        )}

        <div aria-hidden="true" style={{ position: 'absolute', left: '50%', top: sceneY + pageH * cosT * 0.06, width: pageW * 2.1, height: pageH * cosT * 1.02, transform: 'translate(-50%, -50%)', background: 'radial-gradient(closest-side, rgba(20,20,19,0.28), rgba(20,20,19,0.1) 65%, rgba(20,20,19,0) 100%)', filter: 'blur(18px)' }} />

        <div role="img" aria-label={`Booklet open at spread ${cur} of ${S}: ${spreads[cur - 1].title}`}
          style={{ position: 'absolute', left: '50%', top: sceneY, width: 0, height: 0, perspective: `${persp}px`, perspectiveOrigin: '50% 30%' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, transformStyle: 'preserve-3d', transform: `rotateX(${tilt}deg) rotateZ(${rz}deg)` }}>
            <div style={{ position: 'absolute', left: -pageW, top: -pageH / 2, width: pageW * 2, height: pageH, transformStyle: 'preserve-3d' }}>
              <div style={{ position: 'absolute', left: 0, top: 0, width: pageW, height: pageH, boxShadow: edges(-1) }}>
                {pages[0].L}
                {shadowOverlay(baseLShadow, 0)}
              </div>
              <div style={{ position: 'absolute', left: pageW, top: 0, width: pageW, height: pageH, boxShadow: edges(1) }}>
                {pages[S - 1].R}
                {shadowOverlay(baseRShadow, 0)}
              </div>
              {Array.from({ length: LN }, (_, i) => leaf(i))}
            </div>
          </div>
        </div>

        {compact && (
          <div style={{ position: 'absolute', left: pad, right: pad, top: sceneY + pageH * 0.5 + 40, zIndex: 3 }}>
            <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: accent, marginBottom: 10 }}>{String(cur).padStart(2, '0')} — pp. {String(pL).padStart(2, '0')}–{String(pL + 1).padStart(2, '0')}</div>
            <div key={cur} style={{ fontFamily: sans, fontWeight: headlineWeight, fontSize: 30, lineHeight: 1, letterSpacing: '-0.04em', marginBottom: 12 }}>{spreads[cur - 1].title}</div>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.45, color: ink, opacity: 0.8, maxWidth: 340 }}>{spreads[cur - 1].text}</p>
          </div>
        )}
        {showLabels && (
          <div aria-live="polite" style={{ position: 'absolute', left: pad, bottom: compact ? 22 : 38, zIndex: 3, fontFamily: mono }}>
            <div style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: muted }}>Spread</div>
            <div style={{ fontSize: compact ? 13 : 14, marginTop: 6, fontVariantNumeric: 'tabular-nums', letterSpacing: '0.04em' }}>
              {String(cur).padStart(2, '0')} <span style={{ color: muted }}>/ {String(S).padStart(2, '0')}</span>
            </div>
            <div style={{ marginTop: 10, display: 'flex', gap: 4 }}>
              {th.map((t, j) => (
                <div key={j} style={{ width: compact ? 20 : 28, height: 2, background: muted, opacity: 0.35, position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: 0, background: j === active ? accent : ink, transformOrigin: 'left', transform: `scaleX(${t})` }} />
                </div>
              ))}
            </div>
          </div>
        )}
        {showLabels && (
          <div style={{ position: 'absolute', right: pad, bottom: compact ? 22 : 38, zIndex: 3, fontFamily: mono, fontSize: 11, letterSpacing: '0.14em', color: muted, textAlign: 'right', textTransform: 'uppercase', lineHeight: 1.7 }}>
            <div>Leaf {String(Math.min(LN, active + 1)).padStart(2, '0')} / {String(LN).padStart(2, '0')}</div>
            <div style={{ color: ink, fontVariantNumeric: 'tabular-nums' }}>{String(Math.round((active < LN ? th[active] : 1) * 180)).padStart(3, '0')}°</div>
          </div>
        )}
      </div>
    </section>
  );
}

const MANIFEST = {
  "type": "Scrub.PinnedHorizontalGallery",
  "description": "Vertical scroll drives a pinned horizontal track of large framed photographs and title cards, with inner image parallax, velocity-aware skew that relaxes to rest, captions that slide in as each frame reaches centre, a rolling counter and a hairline progress bar",
  "editorElement": {
    "selector": ".pinned-horizontal-gallery",
    "displayName": "Pinned Horizontal Gallery",
    "archetype": "container",
    "data": {
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Selected Works", "group": "Content" },
      "title": { "dataType": "text", "displayName": "Title (| = line break)", "defaultValue": "Built|Landscapes", "group": "Content" },
      "description": { "dataType": "text", "displayName": "Description", "defaultValue": "Eight photographs of light falling on the architecture of eight cities — façades, alleys and towers met at the quiet hour.", "group": "Content" },
      "endTitle": { "dataType": "text", "displayName": "End Card Title", "defaultValue": "Fin.", "group": "Content" },
      "endText": { "dataType": "text", "displayName": "End Card Text", "defaultValue": "Shot on medium format between 2019 and 2025. Prints available on request.", "group": "Content" },
      "images": { "dataType": "text", "displayName": "Image URLs (comma separated)", "defaultValue": "https://picsum.photos/id/1048/1400/1000,https://picsum.photos/id/1065/1000/1400,https://picsum.photos/id/1076/1400/1100,https://picsum.photos/id/1047/1000/1400,https://picsum.photos/id/1081/1600/1000,https://picsum.photos/id/1031/1000/1300,https://picsum.photos/id/1054/1400/1050,https://picsum.photos/id/1029/1300/1300", "group": "Images" },
      "captions": { "dataType": "text", "displayName": "Captions (| separated)", "defaultValue": "Vertical Study|Harbour Lane|Brick Meridian|Rua Escura|White Terraces|Glass Spire|Façade No. 9|Park & Grid", "group": "Images" },
      "captionMeta": { "dataType": "text", "displayName": "Caption Details (| separated)", "defaultValue": "Hong Kong, 2022|Lisbon, 2021|Chicago, 2023|Porto, 2020|Valencia, 2024|Toronto, 2022|Berlin, 2019|New York, 2025", "group": "Images" },
      "aspects": { "dataType": "text", "displayName": "Frame Aspect Ratios (comma separated, w/h)", "defaultValue": "1.45,0.78,1.25,0.72,1.6,0.8,1.3,1", "group": "Images" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#0F0F10", "group": "Colors" },
      "textColor": { "dataType": "color", "displayName": "Text", "defaultValue": "#FAFAF9", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#A8A29E", "group": "Colors" },
      "frameColor": { "dataType": "color", "displayName": "Frame Placeholder", "defaultValue": "#1C1917", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Progress Accent", "defaultValue": "#FAFAF9", "group": "Colors" },
      "displayFont": { "dataType": "select", "displayName": "Display Font", "defaultValue": "Instrument Serif", "options": ["Instrument Serif", "Fraunces", "Inter Tight", "Georgia"], "group": "Typography" },
      "bodyFont": { "dataType": "select", "displayName": "Body Font", "defaultValue": "Inter", "options": ["Inter", "DM Sans", "system-ui"], "group": "Typography" },
      "titleScale": { "dataType": "select", "displayName": "Title Scale", "defaultValue": "large", "options": ["medium", "large", "huge"], "group": "Typography" },
      "titleWeight": { "dataType": "select", "displayName": "Title Weight", "defaultValue": "400", "options": ["300", "400", "500"], "group": "Typography" },
      "frameHeight": { "dataType": "select", "displayName": "Frame Height (% of stage)", "defaultValue": "52", "options": ["44", "52", "58", "66"], "group": "Layout" },
      "gap": { "dataType": "select", "displayName": "Gap Between Frames", "defaultValue": "medium", "options": ["tight", "medium", "airy"], "group": "Layout" },
      "staggerFrames": { "dataType": "booleanValue", "displayName": "Staggered Vertical Rhythm", "defaultValue": "true", "group": "Layout" },
      "cornerRadius": { "dataType": "select", "displayName": "Frame Corner Radius (px)", "defaultValue": "2", "options": ["0", "2", "8", "16"], "group": "Layout" },
      "scrollLength": { "dataType": "select", "displayName": "Scroll Length (screens)", "defaultValue": "5", "options": ["4", "5", "6", "8"], "group": "Layout" },
      "showCounter": { "dataType": "booleanValue", "displayName": "Show Counter & Progress", "defaultValue": "true", "group": "Layout" },
      "parallaxAmount": { "dataType": "select", "displayName": "Inner Image Parallax", "defaultValue": "medium", "options": ["none", "subtle", "medium", "strong"], "group": "Animation" },
      "skewAmount": { "dataType": "select", "displayName": "Velocity Skew", "defaultValue": "medium", "options": ["none", "subtle", "medium", "strong"], "group": "Animation" },
      "smoothing": { "dataType": "select", "displayName": "Scrub Smoothing", "defaultValue": "0.1", "options": ["0.06", "0.1", "0.18", "1"], "group": "Animation", "description": "1 = locked to the scrollbar, lower = more glide" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const eyebrow = config?.eyebrow || 'Selected Works';
  const title = (config?.title || 'Built|Landscapes').split('|');
  const description = config?.description || 'Eight photographs of light falling on the architecture of eight cities — façades, alleys and towers met at the quiet hour.';
  const endTitle = config?.endTitle || 'Fin.';
  const endText = config?.endText || 'Shot on medium format between 2019 and 2025. Prints available on request.';
  const defImages = 'https://picsum.photos/id/1048/1400/1000,https://picsum.photos/id/1065/1000/1400,https://picsum.photos/id/1076/1400/1100,https://picsum.photos/id/1047/1000/1400,https://picsum.photos/id/1081/1600/1000,https://picsum.photos/id/1031/1000/1300,https://picsum.photos/id/1054/1400/1050,https://picsum.photos/id/1029/1300/1300';
  const images = String(config?.images || defImages).split(',').map((s) => s.trim()).filter(Boolean);
  const captions = String(config?.captions || 'Vertical Study|Harbour Lane|Brick Meridian|Rua Escura|White Terraces|Glass Spire|Façade No. 9|Park & Grid').split('|').map((s) => s.trim());
  const metas = String(config?.captionMeta || 'Hong Kong, 2022|Lisbon, 2021|Chicago, 2023|Porto, 2020|Valencia, 2024|Toronto, 2022|Berlin, 2019|New York, 2025').split('|').map((s) => s.trim());
  const aspects = String(config?.aspects || '1.45,0.78,1.25,0.72,1.6,0.8,1.3,1').split(',').map((s) => parseFloat(s)).filter((n) => Number.isFinite(n) && n > 0.2 && n < 4);
  const bg = config?.backgroundColor || '#0F0F10';
  const ink = config?.textColor || '#FAFAF9';
  const muted = config?.mutedColor || '#A8A29E';
  const frameColor = config?.frameColor || '#1C1917';
  const accent = config?.accentColor || '#FAFAF9';
  const displayFont = config?.displayFont || 'Instrument Serif';
  const bodyFont = config?.bodyFont || 'Inter';
  const titleScale = { medium: 0.8, large: 1, huge: 1.2 }[config?.titleScale || 'large'] || 1;
  const titleWeight = config?.titleWeight || '400';
  const frameHPct = (parseFloat(config?.frameHeight || '52') || 52) / 100;
  const gapMul = { tight: 0.6, medium: 1, airy: 1.5 }[config?.gap || 'medium'] || 1;
  const stagger = bool(config?.staggerFrames, true);
  const radius = parseInt(config?.cornerRadius || '2', 10) || 0;
  const screens = parseFloat(config?.scrollLength || '5') || 5;
  const showCounter = bool(config?.showCounter, true);
  const parallax = { none: 0, subtle: 0.08, medium: 0.14, strong: 0.22 }[config?.parallaxAmount || 'medium'] ?? 0.14;
  const skewMax = { none: 0, subtle: 3, medium: 6, strong: 10 }[config?.skewAmount || 'medium'] ?? 6;
  const smoothing = Math.min(1, Math.max(0.02, parseFloat(config?.smoothing || '0.1') || 0.1));

  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const uid = React.useMemo(() => 'hg' + Math.random().toString(36).slice(2, 9), []);

  React.useEffect(() => {
    const families = {
      'Instrument Serif': 'Instrument+Serif:ital@0;1', 'Fraunces': 'Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500',
      'Inter Tight': 'Inter+Tight:wght@300;400;500', 'Inter': 'Inter:wght@300;400;500', 'DM Sans': 'DM+Sans:wght@300;400;500'
    };
    [families[displayFont], families[bodyFont]].filter(Boolean).forEach((f) => {
      const id = 'gf-' + f.replace(/[^a-z0-9]/gi, '').slice(0, 40);
      if (document.getElementById(id)) return;
      const l = document.createElement('link');
      l.id = id; l.rel = 'stylesheet';
      l.href = `https://fonts.googleapis.com/css2?family=${f}&display=swap`;
      document.head.appendChild(l);
    });
  }, [displayFont, bodyFont]);

  const sectionRef = React.useRef(null);
  const trackRef = React.useRef(null);
  const imgRefs = React.useRef([]);
  const capRefs = React.useRef([]);
  const metaRefs = React.useRef([]);
  const counterRef = React.useRef(null);
  const barRef = React.useRef(null);
  const applyRef = React.useRef(null);
  const st = React.useRef({ target: reduced ? 1 : 0, cur: reduced ? 1 : 0, skew: 0, active: -1 });
  const [dims, setDims] = React.useState({ w: 1280, h: 760 });

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
      st.current.target = travel > 0 ? Math.min(1, Math.max(0, (top - r.top) / travel)) : 0;
    };
    const tick = () => {
      const S = st.current;
      const prev = S.cur;
      const d = S.target - S.cur;
      S.cur = Math.abs(d) < 0.00005 ? S.target : S.cur + d * smoothing;
      if (applyRef.current) applyRef.current(S.cur, S.cur - prev);
      const settled = S.cur === S.target && Math.abs(S.skew) < 0.01;
      if (settled && S.skew !== 0) { S.skew = 0; if (applyRef.current) applyRef.current(S.cur, 0); }
      raf = settled ? 0 : requestAnimationFrame(tick);
    };
    const onScroll = () => {
      if (reduced) return;
      read();
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const measure = () => {
      const h = scroller === window ? window.innerHeight : scroller.clientHeight;
      const w = section.clientWidth;
      setDims((p) => (p.w === w && p.h === h ? p : { w, h }));
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
  }, [smoothing, reduced]);

  const W = dims.w;
  const H = dims.h;
  const compact = W < 700;
  const pad = compact ? 20 : 48;
  const fh = Math.round(H * (compact ? Math.min(frameHPct, 0.5) * 0.88 : frameHPct));
  const gap = Math.round((compact ? W * 0.07 : W * 0.045) * gapMul);
  const offsets = [0, -0.07, 0.05, -0.03, 0.07, -0.05, 0.03, -0.02];
  const centreY = H * (compact ? 0.47 : 0.47);

  const layout = React.useMemo(() => {
    const items = [];
    let x = pad;
    const introW = compact ? W * 0.82 : Math.max(380, W * 0.34);
    items.push({ kind: 'intro', x, w: introW });
    x += introW + gap * (compact ? 0.6 : 1.1);
    images.forEach((src, i) => {
      const ar = aspects[i % (aspects.length || 1)] || 1.2;
      const w = Math.round(Math.min(fh * ar, W * (compact ? 0.78 : 0.52)));
      const h = Math.round(w / ar);
      const y = centreY - h / 2 + (stagger ? offsets[i % offsets.length] * H * (compact ? 0.5 : 0.8) : 0) - (compact ? 0 : 14);
      items.push({ kind: 'image', x, w, h, y, src, i });
      x += w + gap;
    });
    const endW = compact ? W * 0.72 : Math.max(320, W * 0.3);
    items.push({ kind: 'end', x: x + gap * 0.4, w: endW });
    x += gap * 0.4 + endW + pad;
    return { items, total: x };
  }, [W, H, compact, pad, gap, fh, stagger, images.join(','), aspects.join(',')]); // eslint-disable-line react-hooks/exhaustive-deps

  const travel = Math.max(0, layout.total - W);
  const imageItems = layout.items.filter((it) => it.kind === 'image');
  const count = imageItems.length;

  const clamp = (v) => Math.min(1, Math.max(0, v));
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  applyRef.current = (p, dp) => {
    const S = st.current;
    const q = clamp((p - 0.02) / 0.96);
    const x = -travel * q;
    const v = (dp || 0) * travel;
    const target = skewMax ? Math.max(-skewMax, Math.min(skewMax, -v * 0.09)) : 0;
    S.skew += (target - S.skew) * 0.16;
    if (trackRef.current) trackRef.current.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0) skewX(${S.skew.toFixed(3)}deg)`;
    let best = 0;
    let bestD = Infinity;
    imageItems.forEach((it, k) => {
      const cx = it.x + it.w / 2 + x;
      const rel = (cx - W / 2) / W;
      const im = imgRefs.current[k];
      if (im) im.style.transform = `translate3d(${(-rel * it.w * parallax).toFixed(2)}px, 0, 0) scale(1.02)`;
      const c = easeOut(clamp((W * (compact ? 0.92 : 0.8) - cx) / (W * 0.32)));
      const cap = capRefs.current[k];
      if (cap) cap.style.transform = `translate3d(0, ${((1 - c) * 105).toFixed(2)}%, 0)`;
      const mt = metaRefs.current[k];
      if (mt) {
        const c2 = easeOut(clamp((W * (compact ? 0.86 : 0.74) - cx) / (W * 0.3)));
        mt.style.opacity = c2.toFixed(3);
        mt.style.transform = `translate3d(${((1 - c2) * 24).toFixed(2)}px, 0, 0)`;
      }
      const dd = Math.abs(cx - W / 2);
      if (dd < bestD) { bestD = dd; best = k; }
    });
    if (best !== S.active) {
      S.active = best;
      if (counterRef.current) counterRef.current.style.transform = `translate3d(0, ${(-best * 1.2).toFixed(2)}em, 0)`;
    }
    if (barRef.current) barRef.current.style.transform = `scaleX(${q.toFixed(4)})`;
  };

  React.useLayoutEffect(() => {
    st.current.active = -1;
    if (applyRef.current) applyRef.current(st.current.cur, 0);
  });

  const serif = displayFont === 'Georgia' ? 'Georgia, "Times New Roman", serif'
    : displayFont === 'Inter Tight' ? '"Inter Tight", Inter, -apple-system, sans-serif'
      : `"${displayFont}", Georgia, "Times New Roman", serif`;
  const sans = bodyFont === 'system-ui' ? 'system-ui, -apple-system, sans-serif' : `"${bodyFont}", -apple-system, "Helvetica Neue", sans-serif`;
  const titleSize = Math.round(Math.min(W * (compact ? 0.17 : 0.085), H * 0.17) * titleScale);
  const pad2 = (n) => String(n).padStart(2, '0');
  const ease = 'cubic-bezier(0.22, 1, 0.36, 1)';

  return (
    <section ref={sectionRef} className={`pinned-horizontal-gallery ${uid}`} aria-roledescription="horizontal gallery"
      style={{ position: 'relative', width: '100%', height: `${Math.round(H * screens)}px`, backgroundColor: bg, color: ink, fontFamily: sans }}>
      <div style={{ position: 'sticky', top: 0, height: `${H}px`, overflow: 'hidden', backgroundColor: bg }}>
        <div ref={trackRef} style={{ position: 'absolute', left: 0, top: 0, height: H, width: layout.total, willChange: 'transform', transformOrigin: '50% 50%' }}>
          {layout.items.map((it, n) => {
            if (it.kind === 'intro') {
              return (
                <div key={n} style={{ position: 'absolute', left: it.x, width: it.w, top: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingBottom: compact ? H * 0.04 : 0 }}>
                  <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, color: muted, marginBottom: compact ? 16 : 24, animation: `${uid}-up 900ms ${ease} 100ms both` }}>{eyebrow}</div>
                  <h2 style={{ margin: 0, fontFamily: serif, fontWeight: titleWeight, fontSize: titleSize, lineHeight: 0.92, letterSpacing: '-0.035em' }}>
                    {title.map((l, j) => (
                      <span key={j} style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.08em', marginBottom: '-0.08em' }}>
                        <span style={{ display: 'block', animation: `${uid}-rise 1100ms ${ease} ${180 + j * 110}ms both` }}>{l}</span>
                      </span>
                    ))}
                  </h2>
                  <p style={{ margin: `${compact ? 18 : 28}px 0 0`, maxWidth: 340, fontSize: compact ? 14 : 15, lineHeight: 1.6, color: muted, fontWeight: 300, animation: `${uid}-up 900ms ${ease} 420ms both` }}>{description}</p>
                  <div style={{ marginTop: compact ? 22 : 36, display: 'flex', alignItems: 'center', gap: 14, fontSize: 12, color: ink, letterSpacing: '0.04em', animation: `${uid}-up 900ms ${ease} 560ms both` }}>
                    <span aria-hidden="true" style={{ width: 40, height: 1, backgroundColor: ink, opacity: 0.6 }} />
                    <span>{pad2(count)} photographs</span>
                  </div>
                </div>
              );
            }
            if (it.kind === 'end') {
              return (
                <div key={n} style={{ position: 'absolute', left: it.x, width: it.w, top: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ fontFamily: serif, fontWeight: titleWeight, fontSize: Math.round(titleSize * 0.9), lineHeight: 0.95, letterSpacing: '-0.03em' }}>{endTitle}</div>
                  <p style={{ margin: `${compact ? 16 : 22}px 0 0`, maxWidth: 300, fontSize: compact ? 14 : 15, lineHeight: 1.6, color: muted, fontWeight: 300 }}>{endText}</p>
                </div>
              );
            }
            const k = it.i;
            return (
              <figure key={n} style={{ position: 'absolute', left: it.x, top: it.y, width: it.w, margin: 0 }}>
                <div style={{ position: 'relative', width: it.w, height: it.h, overflow: 'hidden', borderRadius: radius, backgroundColor: frameColor, animation: k < 3 ? `${uid}-frame 1200ms ${ease} ${260 + k * 120}ms both` : 'none' }}>
                  <img ref={(el) => { imgRefs.current[k] = el; }} src={it.src} alt={captions[k] || `Photograph ${k + 1}`} draggable="false" loading="eager"
                    style={{ position: 'absolute', top: 0, left: `${-parallax * 50 - 2}%`, width: `${100 + parallax * 100 + 4}%`, height: '100%', objectFit: 'cover', display: 'block', willChange: 'transform' }} />
                </div>
                <figcaption style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, marginTop: compact ? 12 : 16 }}>
                  <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.1em' }}>
                    <span ref={(el) => { capRefs.current[k] = el; }} style={{ display: 'block', fontFamily: serif, fontSize: compact ? 20 : 24, lineHeight: 1.1, letterSpacing: '-0.01em', transform: 'translate3d(0,105%,0)', whiteSpace: 'nowrap' }}>
                      <span style={{ fontFamily: sans, fontSize: compact ? 10 : 11, color: muted, letterSpacing: '0.1em', marginRight: 10, verticalAlign: 'middle' }}>{pad2(k + 1)}</span>
                      {captions[k] || ''}
                    </span>
                  </span>
                  <span ref={(el) => { metaRefs.current[k] = el; }} style={{ fontSize: compact ? 11 : 12, color: muted, letterSpacing: '0.04em', whiteSpace: 'nowrap', opacity: 0 }}>{metas[k] || ''}</span>
                </figcaption>
              </figure>
            );
          })}
        </div>

        {showCounter && (
          <React.Fragment>
            <div aria-hidden="true" style={{ position: 'absolute', right: pad, top: compact ? 20 : 32, display: 'flex', alignItems: 'center', fontSize: compact ? 13 : 14, fontVariantNumeric: 'tabular-nums', letterSpacing: '0.06em' }}>
              <span style={{ display: 'inline-block', height: '1.2em', lineHeight: '1.2em', overflow: 'hidden' }}>
                <span ref={counterRef} style={{ display: 'block', transition: `transform 600ms ${ease}` }}>
                  {imageItems.map((_, i) => <span key={i} style={{ display: 'block', height: '1.2em' }}>{pad2(i + 1)}</span>)}
                </span>
              </span>
              <span style={{ color: muted, margin: '0 0.5em' }}>/</span>
              <span style={{ color: muted }}>{pad2(count)}</span>
            </div>
            <div aria-hidden="true" style={{ position: 'absolute', left: pad, right: pad, bottom: compact ? 22 : 34, height: 1, backgroundColor: 'rgba(255,255,255,0.14)' }}>
              <div ref={barRef} style={{ position: 'absolute', inset: 0, backgroundColor: accent, transformOrigin: '0 50%', transform: 'scaleX(0)' }} />
            </div>
          </React.Fragment>
        )}
        <div aria-hidden="true" style={{ position: 'absolute', left: pad, top: compact ? 20 : 32, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, color: muted }}>
          {title.join(' ')}
        </div>

        <style>{`
          @keyframes ${uid}-rise { from { transform: translate3d(0, 110%, 0); } to { transform: none; } }
          @keyframes ${uid}-up { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
          @keyframes ${uid}-frame { from { clip-path: inset(100% 0 0 0); } to { clip-path: inset(0 0 0 0); } }
          @media (prefers-reduced-motion: reduce) { .${uid} * { animation: none !important; transition: none !important; } }
        `}</style>
      </div>
    </section>
  );
}

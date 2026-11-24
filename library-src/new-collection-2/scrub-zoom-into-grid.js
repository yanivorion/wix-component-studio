const MANIFEST = {
  "type": "Scrub.ZoomIntoGrid",
  "description": "Scroll-scrubbed camera push into an editorial photo grid: the centre frame grows to full-bleed while the surrounding photographs fly outward at their own parallax rates, then a huge title rises from a line mask as the image settles",
  "editorElement": {
    "selector": ".zoom-into-grid",
    "displayName": "Zoom Into Grid",
    "archetype": "container",
    "data": {
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Field Notes — Vol. 04", "group": "Content" },
      "headline": { "dataType": "text", "displayName": "Headline (use | for line breaks)", "defaultValue": "Places that|hold the light", "group": "Content" },
      "caption": { "dataType": "text", "displayName": "Corner Caption", "defaultValue": "Thirteen frames, one horizon", "group": "Content" },
      "finalEyebrow": { "dataType": "text", "displayName": "Final Eyebrow", "defaultValue": "Lysefjord, Norway", "group": "Content" },
      "finalTitle": { "dataType": "text", "displayName": "Final Title (use | for line breaks)", "defaultValue": "Into the|quiet north", "group": "Content" },
      "finalText": { "dataType": "text", "displayName": "Final Text", "defaultValue": "Six hundred metres of granite, one ribbon of water and the slow light of a northern evening.", "group": "Content" },
      "centerImage": { "dataType": "text", "displayName": "Centre Image URL", "defaultValue": "https://picsum.photos/id/1015/2000/1300", "group": "Images" },
      "gridImages": { "dataType": "text", "displayName": "Grid Image URLs (comma separated, up to 12)", "defaultValue": "https://picsum.photos/id/1011/800/800,https://picsum.photos/id/1036/800/800,https://picsum.photos/id/1018/800/800,https://picsum.photos/id/1039/800/800,https://picsum.photos/id/1044/800/800,https://picsum.photos/id/1016/800/800,https://picsum.photos/id/1049/800/800,https://picsum.photos/id/1052/800/800,https://picsum.photos/id/1057/800/800,https://picsum.photos/id/1061/800/800,https://picsum.photos/id/1043/800/800,https://picsum.photos/id/1019/800/800", "group": "Images" },
      "imageAlt": { "dataType": "text", "displayName": "Centre Image Alt Text", "defaultValue": "A deep blue fjord between steep granite cliffs", "group": "Images" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#F5F5F4", "group": "Colors" },
      "textColor": { "dataType": "color", "displayName": "Text", "defaultValue": "#1C1917", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#78716C", "group": "Colors" },
      "finalTextColor": { "dataType": "color", "displayName": "Final Title Colour", "defaultValue": "#FAFAF9", "group": "Colors" },
      "scrimColor": { "dataType": "color", "displayName": "Image Scrim", "defaultValue": "#0C0A09", "group": "Colors" },
      "displayFont": { "dataType": "select", "displayName": "Display Font", "defaultValue": "Instrument Serif", "options": ["Instrument Serif", "Fraunces", "Inter Tight", "Georgia"], "group": "Typography" },
      "bodyFont": { "dataType": "select", "displayName": "Body Font", "defaultValue": "Inter", "options": ["Inter", "DM Sans", "system-ui"], "group": "Typography" },
      "headlineSize": { "dataType": "select", "displayName": "Headline Size (px)", "defaultValue": "36", "options": ["28", "36", "44", "52"], "group": "Typography" },
      "finalTitleScale": { "dataType": "select", "displayName": "Final Title Scale", "defaultValue": "huge", "options": ["large", "huge", "colossal"], "group": "Typography" },
      "titleWeight": { "dataType": "select", "displayName": "Title Weight", "defaultValue": "400", "options": ["300", "400", "500"], "group": "Typography" },
      "scrollLength": { "dataType": "select", "displayName": "Scroll Length (screens)", "defaultValue": "4", "options": ["3", "4", "5", "6"], "group": "Layout" },
      "gutter": { "dataType": "select", "displayName": "Grid Gutter", "defaultValue": "editorial", "options": ["tight", "editorial", "airy"], "group": "Layout" },
      "cornerRadius": { "dataType": "select", "displayName": "Corner Radius (px)", "defaultValue": "2", "options": ["0", "2", "6", "12"], "group": "Layout" },
      "showCaption": { "dataType": "booleanValue", "displayName": "Show Corner Caption", "defaultValue": "true", "group": "Layout" },
      "parallaxStrength": { "dataType": "select", "displayName": "Fly-out Parallax", "defaultValue": "medium", "options": ["subtle", "medium", "strong"], "group": "Animation" },
      "blurDepth": { "dataType": "booleanValue", "displayName": "Depth Blur on Fly-out", "defaultValue": "true", "group": "Animation" },
      "settleAmount": { "dataType": "select", "displayName": "Final Settle", "defaultValue": "0.12", "options": ["0", "0.06", "0.12", "0.2"], "group": "Animation", "description": "How far the full-bleed image scales back down after the push" },
      "scrimStrength": { "dataType": "select", "displayName": "Scrim Strength", "defaultValue": "0.5", "options": ["0", "0.25", "0.5", "0.7"], "group": "Animation" },
      "smoothing": { "dataType": "select", "displayName": "Scrub Smoothing", "defaultValue": "0.12", "options": ["0.06", "0.12", "0.2", "1"], "group": "Animation", "description": "1 = locked to the scrollbar, lower = more glide" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const eyebrow = config?.eyebrow || 'Field Notes — Vol. 04';
  const headline = (config?.headline || 'Places that|hold the light').split('|');
  const caption = config?.caption || 'Thirteen frames, one horizon';
  const finalEyebrow = config?.finalEyebrow || 'Lysefjord, Norway';
  const finalTitle = (config?.finalTitle || 'Into the|quiet north').split('|');
  const finalText = config?.finalText || 'Six hundred metres of granite, one ribbon of water and the slow light of a northern evening.';
  const centerImage = config?.centerImage || 'https://picsum.photos/id/1015/2000/1300';
  const imageAlt = config?.imageAlt || 'A deep blue fjord between steep granite cliffs';
  const defaultGrid = [1011, 1036, 1018, 1039, 1044, 1016, 1049, 1052, 1057, 1061, 1043, 1019].map((n) => `https://picsum.photos/id/${n}/800/800`);
  const gridImages = React.useMemo(() => {
    const list = String(config?.gridImages || '').split(',').map((s) => s.trim()).filter(Boolean);
    return list.length ? list : defaultGrid;
  }, [config?.gridImages]); // eslint-disable-line react-hooks/exhaustive-deps
  const bg = config?.backgroundColor || '#F5F5F4';
  const ink = config?.textColor || '#1C1917';
  const muted = config?.mutedColor || '#78716C';
  const finalInk = config?.finalTextColor || '#FAFAF9';
  const scrimColor = config?.scrimColor || '#0C0A09';
  const displayFont = config?.displayFont || 'Instrument Serif';
  const bodyFont = config?.bodyFont || 'Inter';
  const headlineSize = parseInt(config?.headlineSize || '36', 10) || 36;
  const titleScale = { large: 0.8, huge: 1, colossal: 1.22 }[config?.finalTitleScale || 'huge'] || 1;
  const titleWeight = config?.titleWeight || '400';
  const screens = parseFloat(config?.scrollLength || '4') || 4;
  const gutterMul = { tight: 0.5, editorial: 1, airy: 1.5 }[config?.gutter || 'editorial'] || 1;
  const radius = parseInt(config?.cornerRadius || '2', 10) || 0;
  const showCaption = bool(config?.showCaption, true);
  const parallax = { subtle: 0.5, medium: 1, strong: 1.6 }[config?.parallaxStrength || 'medium'] || 1;
  const blurDepth = bool(config?.blurDepth, true);
  const settle = Math.max(0, parseFloat(config?.settleAmount || '0.12') || 0);
  const scrimStrength = Math.max(0, parseFloat(config?.scrimStrength || '0.5') || 0);
  const smoothing = Math.min(1, Math.max(0.02, parseFloat(config?.smoothing || '0.12') || 0.12));

  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const uid = React.useMemo(() => 'zg' + Math.random().toString(36).slice(2, 9), []);

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
  const centerRef = React.useRef(null);
  const centerImgRef = React.useRef(null);
  const tileRefs = React.useRef([]);
  const introRef = React.useRef(null);
  const captionRef = React.useRef(null);
  const scrimRef = React.useRef(null);
  const lineRefs = React.useRef([]);
  const finalMetaRef = React.useRef(null);
  const finalBlockRef = React.useRef(null);
  const applyRef = React.useRef(null);
  const st = React.useRef({ target: reduced ? 1 : 0, cur: reduced ? 1 : 0 });
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
      const d = S.target - S.cur;
      S.cur = Math.abs(d) < 0.0002 ? S.target : S.cur + d * smoothing;
      if (applyRef.current) applyRef.current(S.cur);
      raf = S.cur === S.target ? 0 : requestAnimationFrame(tick);
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

  // design-space layouts: [x, y, w, h, parallax]; index 0 is the centre frame
  const desktop = [
    [460, 280, 360, 240, 0],
    [236, 200, 200, 260, 0.55], [276, 484, 160, 120, 0.95], [844, 236, 240, 160, 0.4], [844, 420, 160, 200, 0.8],
    [540, 116, 200, 140, 0.3], [520, 544, 180, 140, 0.65], [724, 544, 96, 128, 1.1], [52, 300, 160, 220, 0.2],
    [1108, 330, 140, 180, 0.35], [300, 56, 216, 120, 0.75], [1028, 540, 160, 120, 0.5], [884, 100, 180, 112, 0.9]
  ];
  const mobile = [
    [95, 330, 200, 150, 0],
    [95, 206, 120, 108, 0.4], [231, 166, 104, 148, 0.8], [-30, 290, 109, 150, 0.3], [311, 350, 110, 130, 0.6],
    [140, 496, 155, 110, 0.5], [39, 496, 85, 120, 0.9], [-10, 140, 89, 134, 0.7], [311, 496, 90, 130, 0.35],
    [95, 92, 120, 98, 1.0], [140, 622, 110, 90, 0.75], [251, 32, 120, 118, 0.55]
  ];
  const base = compact ? mobile : desktop;
  const DW = compact ? 390 : 1280;
  const DH = compact ? 780 : 800;
  const sc = Math.min(W / DW, H / DH);
  const ox = (W - DW * sc) / 2;
  const oy = (H - DH * sc) / 2 + (compact ? Math.min(40, H * 0.04) : 0);
  const baseGutter = compact ? 16 : 24;
  const gAdj = (gutterMul - 1) * baseGutter * 0.5;
  const rects = base.map(([x, y, w, h, par], i) => {
    const shrink = i === 0 ? 0 : gAdj;
    return { x: ox + (x + shrink) * sc, y: oy + (y + shrink) * sc, w: Math.max(8, (w - shrink * 2) * sc), h: Math.max(8, (h - shrink * 2) * sc), par };
  });
  const tiles = rects.slice(1).map((r, i) => ({ ...r, src: gridImages[i % gridImages.length] }));
  const c0 = rects[0];

  const clamp = (v) => Math.min(1, Math.max(0, v));
  const easeIO = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  const expoOut = (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

  applyRef.current = (p) => {
    const seg = (a, b) => clamp((p - a) / (b - a));
    const t = easeIO(seg(0.05, 0.52));
    const settleT = easeOut(seg(0.56, 0.98));
    const cx = W / 2;
    const cy = H / 2;
    const zx = W / c0.w;
    const zy = H / c0.h;
    const zEnd = Math.max(zx, zy);
    const Z = Math.pow(zEnd, t);

    const cEl = centerRef.current;
    if (cEl) {
      const w = c0.w * Math.pow(zx, t);
      const h = c0.h * Math.pow(zy, t);
      const x0 = c0.x + c0.w / 2;
      const y0 = c0.y + c0.h / 2;
      const mx = x0 + (cx - x0) * t;
      const my = y0 + (cy - y0) * t;
      cEl.style.left = `${mx - w / 2}px`;
      cEl.style.top = `${my - h / 2}px`;
      cEl.style.width = `${w}px`;
      cEl.style.height = `${h}px`;
      cEl.style.borderRadius = `${radius * (1 - t)}px`;
    }
    if (centerImgRef.current) {
      const s = 1 + settle * t - settle * settleT;
      centerImgRef.current.style.transform = `scale(${s.toFixed(4)})`;
    }
    tiles.forEach((r, i) => {
      const el = tileRefs.current[i];
      if (!el) return;
      const tx = r.x + r.w / 2 - cx;
      const ty = r.y + r.h / 2 - cy;
      const fly = 1 + r.par * parallax * t * 1.4;
      const k = Z * fly;
      const dx = tx * k - tx;
      const dy = ty * k - ty;
      const sc2 = Z * (1 + r.par * parallax * 0.18 * t);
      const fadeA = 0.1 + r.par * 0.1;
      const o = 1 - clamp((t - fadeA) / 0.34);
      el.style.transform = `translate3d(${dx.toFixed(2)}px, ${dy.toFixed(2)}px, 0) scale(${sc2.toFixed(4)})`;
      el.style.opacity = o.toFixed(3);
      el.style.visibility = o <= 0.001 ? 'hidden' : 'visible';
      if (blurDepth) el.style.filter = t > 0.02 ? `blur(${(t * (1.5 + r.par * 2.5)).toFixed(2)}px)` : 'none';
    });
    const intro = 1 - easeOut(seg(0.03, 0.2));
    if (introRef.current) {
      introRef.current.style.opacity = intro.toFixed(3);
      introRef.current.style.transform = `translateY(${(-24 * (1 - intro)).toFixed(2)}px)`;
    }
    if (captionRef.current) captionRef.current.style.opacity = intro.toFixed(3);
    if (scrimRef.current) scrimRef.current.style.opacity = (easeOut(seg(0.48, 0.72)) * scrimStrength).toFixed(3);
    lineRefs.current.forEach((el, j) => {
      if (!el) return;
      const e = expoOut(seg(0.55 + j * 0.05, 0.78 + j * 0.05));
      el.style.transform = `translate3d(0, ${((1 - e) * 112).toFixed(2)}%, 0)`;
    });
    if (finalBlockRef.current) finalBlockRef.current.style.transform = `translateY(${(-H * 0.03 * settleT).toFixed(2)}px)`;
    if (finalMetaRef.current) {
      const m = easeOut(seg(0.7, 0.88));
      finalMetaRef.current.style.opacity = m.toFixed(3);
      finalMetaRef.current.style.transform = `translateY(${((1 - m) * 18).toFixed(2)}px)`;
    }
  };

  React.useLayoutEffect(() => {
    if (applyRef.current) applyRef.current(st.current.cur);
  });

  const serif = displayFont === 'Georgia' ? 'Georgia, "Times New Roman", serif'
    : displayFont === 'Inter Tight' ? '"Inter Tight", Inter, -apple-system, sans-serif'
      : `"${displayFont}", Georgia, "Times New Roman", serif`;
  const sans = bodyFont === 'system-ui' ? 'system-ui, -apple-system, sans-serif' : `"${bodyFont}", -apple-system, "Helvetica Neue", sans-serif`;
  const pad = compact ? 20 : 48;
  const finalSize = Math.round(Math.min(W * (compact ? 0.17 : 0.135), H * 0.235) * titleScale);
  const hl = compact ? Math.round(headlineSize * 0.7) : headlineSize;
  const ease = 'cubic-bezier(0.22, 1, 0.36, 1)';

  return (
    <section ref={sectionRef} className={`zoom-into-grid ${uid}`}
      style={{ position: 'relative', width: '100%', height: `${Math.round(H * screens)}px`, backgroundColor: bg, color: ink, fontFamily: sans }}>
      <div style={{ position: 'sticky', top: 0, height: `${H}px`, overflow: 'hidden', backgroundColor: bg }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0 }}>
          {tiles.map((r, i) => (
            <div key={i} ref={(el) => { tileRefs.current[i] = el; }}
              style={{
                position: 'absolute', left: r.x, top: r.y, width: r.w, height: r.h, overflow: 'hidden',
                borderRadius: radius, backgroundColor: '#E7E5E4', willChange: 'transform, opacity', transformOrigin: '50% 50%'
              }}>
              <img src={r.src} alt="" draggable="false" loading="eager"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', animation: `${uid}-in 900ms ${ease} ${120 + i * 45}ms both` }} />
            </div>
          ))}
        </div>

        <div ref={centerRef}
          style={{ position: 'absolute', left: c0.x, top: c0.y, width: c0.w, height: c0.h, overflow: 'hidden', borderRadius: radius, backgroundColor: '#D6D3D1', zIndex: 2 }}>
          <img ref={centerImgRef} src={centerImage} alt={imageAlt} draggable="false" loading="eager"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', transformOrigin: '50% 50%', willChange: 'transform' }} />
          <div ref={scrimRef} aria-hidden="true"
            style={{ position: 'absolute', inset: 0, opacity: 0, background: `linear-gradient(180deg, ${scrimColor}00 30%, ${scrimColor} 100%)` }} />
        </div>

        <div ref={introRef} style={{ position: 'absolute', left: pad, top: compact ? 22 : pad, zIndex: 3 }}>
          <div style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: muted, fontWeight: 500 }}>{eyebrow}</div>
          {compact && (
            <h2 style={{ margin: '10px 0 0', fontFamily: serif, fontWeight: titleWeight, fontSize: hl, lineHeight: 1.02, letterSpacing: '-0.015em' }}>
              {headline.join(' ')}
            </h2>
          )}
        </div>
        {!compact && (
          <div ref={captionRef} style={{ position: 'absolute', left: pad, bottom: pad, right: pad, zIndex: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, pointerEvents: 'none' }}>
            <h2 style={{ margin: 0, fontFamily: serif, fontWeight: titleWeight, fontSize: hl, lineHeight: 1.04, letterSpacing: '-0.015em', maxWidth: 360 }}>
              {headline.map((l, i) => <span key={i} style={{ display: 'block' }}>{l}</span>)}
            </h2>
            {showCaption && <div style={{ fontSize: 12, color: muted, letterSpacing: '0.02em', textAlign: 'right' }}>{caption}</div>}
          </div>
        )}

        <div ref={finalBlockRef} style={{ position: 'absolute', left: pad, right: pad, bottom: compact ? 28 : pad, zIndex: 4, color: finalInk, pointerEvents: 'none' }}>
          <h3 aria-label={finalTitle.join(' ')}
            style={{ margin: 0, fontFamily: serif, fontWeight: titleWeight, fontSize: finalSize, lineHeight: 0.92, letterSpacing: '-0.035em' }}>
            {finalTitle.map((l, j) => (
              <span key={j} aria-hidden="true" style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.06em', marginBottom: '-0.06em' }}>
                <span ref={(el) => { lineRefs.current[j] = el; }} style={{ display: 'block', transform: 'translate3d(0,112%,0)', willChange: 'transform' }}>{l}</span>
              </span>
            ))}
          </h3>
          <div ref={finalMetaRef}
            style={{ opacity: 0, marginTop: compact ? 18 : 28, display: 'flex', flexDirection: compact ? 'column' : 'row', gap: compact ? 8 : 48, alignItems: compact ? 'flex-start' : 'baseline' }}>
            <div style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, opacity: 0.85, whiteSpace: 'nowrap' }}>{finalEyebrow}</div>
            <p style={{ margin: 0, fontSize: compact ? 14 : 16, lineHeight: 1.5, maxWidth: 420, opacity: 0.9, fontWeight: 300 }}>{finalText}</p>
          </div>
        </div>

        <style>{`
          @keyframes ${uid}-in { from { opacity: 0; transform: scale(1.12); } to { opacity: 1; transform: scale(1); } }
          @media (prefers-reduced-motion: reduce) { .${uid} img { animation: none !important; } }
        `}</style>
      </div>
    </section>
  );
}

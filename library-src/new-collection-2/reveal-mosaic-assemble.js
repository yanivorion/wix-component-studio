const MANIFEST = {
  "type": "Reveal.MosaicAssemble",
  "description": "Asymmetric bento photo mosaic that assembles on reveal in a diagonal wave: each tile unclips from a direction tied to its position while the photo pulls focus from blur and scales into its frame; captions slide in from the side the pointer entered, and a click flies the photo into a FLIP lightbox",
  "editorElement": {
    "selector": ".mosaic-assemble",
    "displayName": "Mosaic Assemble",
    "archetype": "container",
    "data": {
      "title": { "dataType": "text", "displayName": "Title", "defaultValue": "Field Notes", "group": "Content" },
      "subtitle": { "dataType": "text", "displayName": "Subtitle", "defaultValue": "Ten frames from the northern coast, winter 2025", "group": "Content" },
      "images": { "dataType": "text", "displayName": "Image URLs (comma separated)", "defaultValue": "https://picsum.photos/id/1050/1400/1000,https://picsum.photos/id/1018/1400/1000,https://picsum.photos/id/1053/1000/1300,https://picsum.photos/id/1052/1400/1000,https://picsum.photos/id/1049/1400/1000,https://picsum.photos/id/1061/1400/1000,https://picsum.photos/id/1038/1000/1300,https://picsum.photos/id/1036/1400/1000,https://picsum.photos/id/1044/1400/1000,https://picsum.photos/id/1056/1400/1000", "group": "Images" },
      "captions": { "dataType": "text", "displayName": "Captions (comma separated)", "defaultValue": "Sea Stacks,The Quiraing,White Water,Basalt,Still Island,Dune Line,Red Boat,High Camp,River Crossing,Mirror Sky", "group": "Images" },
      "metas": { "dataType": "text", "displayName": "Caption Details (comma separated)", "defaultValue": "Algarve — 07:12,Skye — 09:40,Faroe — 11:05,Vík — 15:30,Lofoten — 08:20,Northumberland — 16:02,Nordkapp — 12:44,Khumbu — 05:58,Oregon — 10:10,Lake Bohinj — 06:31", "group": "Images" },
      "layoutVariant": { "dataType": "select", "displayName": "Layout", "defaultValue": "mosaic", "options": ["mosaic", "bento", "gallery", "hero"], "group": "Layout", "description": "mosaic 10 tiles, gallery 9, bento 8, hero 7" },
      "gap": { "dataType": "select", "displayName": "Gap (px)", "defaultValue": "8", "options": ["2", "8", "14", "20"], "group": "Layout" },
      "radius": { "dataType": "select", "displayName": "Corner Radius (px)", "defaultValue": "4", "options": ["0", "4", "10", "18"], "group": "Layout" },
      "showHeader": { "dataType": "booleanValue", "displayName": "Show Header", "defaultValue": "true", "group": "Layout" },
      "enableLightbox": { "dataType": "booleanValue", "displayName": "Lightbox On Click", "defaultValue": "true", "group": "Layout" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#0F0F0E", "group": "Colors" },
      "textColor": { "dataType": "color", "displayName": "Text", "defaultValue": "#F5F5F4", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#8C8782", "group": "Colors" },
      "captionTint": { "dataType": "color", "displayName": "Caption Panel Tint", "defaultValue": "#0F0F0E", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent (focus & index)", "defaultValue": "#F5F5F4", "group": "Colors" },
      "titleFont": { "dataType": "select", "displayName": "Title Font", "defaultValue": "Instrument Serif", "options": ["Instrument Serif", "Fraunces", "Inter Tight", "Georgia"], "group": "Typography" },
      "bodyFont": { "dataType": "select", "displayName": "Body Font", "defaultValue": "Inter", "options": ["Inter", "DM Sans", "Inter Tight", "system-ui"], "group": "Typography" },
      "titleSize": { "dataType": "select", "displayName": "Title Size (px)", "defaultValue": "56", "options": ["40", "48", "56", "72"], "group": "Typography" },
      "triggerMode": { "dataType": "select", "displayName": "Trigger", "defaultValue": "entrance", "options": ["entrance", "scroll", "manual"], "group": "Animation" },
      "threshold": { "dataType": "select", "displayName": "Trigger Threshold", "defaultValue": "0.2", "options": ["0.1", "0.2", "0.4"], "group": "Animation" },
      "waveOrigin": { "dataType": "select", "displayName": "Wave Origin", "defaultValue": "top-left", "options": ["top-left", "centre", "bottom-right"], "group": "Animation" },
      "waveSpan": { "dataType": "select", "displayName": "Wave Span (ms)", "defaultValue": "750", "options": ["400", "750", "1100", "1500"], "group": "Animation" },
      "revealDuration": { "dataType": "select", "displayName": "Tile Reveal (ms)", "defaultValue": "1100", "options": ["800", "1100", "1500"], "group": "Animation" },
      "blurFrom": { "dataType": "select", "displayName": "Focus Pull Blur (px)", "defaultValue": "16", "options": ["0", "8", "16", "24"], "group": "Animation" },
      "scaleFrom": { "dataType": "select", "displayName": "Inner Scale From", "defaultValue": "1.1", "options": ["1", "1.1", "1.2"], "group": "Animation" },
      "showReplay": { "dataType": "booleanValue", "displayName": "Replay Button", "defaultValue": "true", "group": "Animation" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const list = (s) => String(s || '').split(',').map((x) => x.trim()).filter(Boolean);
  const title = config?.title || 'Field Notes';
  const subtitle = config?.subtitle || 'Ten frames from the northern coast, winter 2025';
  const allImages = list(config?.images || 'https://picsum.photos/id/1050/1400/1000,https://picsum.photos/id/1018/1400/1000,https://picsum.photos/id/1053/1000/1300,https://picsum.photos/id/1052/1400/1000,https://picsum.photos/id/1049/1400/1000,https://picsum.photos/id/1061/1400/1000,https://picsum.photos/id/1038/1000/1300,https://picsum.photos/id/1036/1400/1000,https://picsum.photos/id/1044/1400/1000,https://picsum.photos/id/1056/1400/1000');
  const captions = list(config?.captions || 'Sea Stacks,The Quiraing,White Water,Basalt,Still Island,Dune Line,Red Boat,High Camp,River Crossing,Mirror Sky');
  const metas = list(config?.metas || 'Algarve — 07:12,Skye — 09:40,Faroe — 11:05,Vík — 15:30,Lofoten — 08:20,Northumberland — 16:02,Nordkapp — 12:44,Khumbu — 05:58,Oregon — 10:10,Lake Bohinj — 06:31');
  const variant = config?.layoutVariant || 'mosaic';
  const gap = parseInt(config?.gap ?? '8', 10) || 0;
  const radius = parseInt(config?.radius ?? '4', 10) || 0;
  const showHeader = bool(config?.showHeader, true);
  const enableLightbox = bool(config?.enableLightbox, true);
  const bg = config?.backgroundColor || '#0F0F0E';
  const text = config?.textColor || '#F5F5F4';
  const muted = config?.mutedColor || '#8C8782';
  const tint = config?.captionTint || '#0F0F0E';
  const accent = config?.accentColor || '#F5F5F4';
  const titleFont = config?.titleFont || 'Instrument Serif';
  const bodyFont = config?.bodyFont || 'Inter';
  const titleSize = parseInt(config?.titleSize || '56', 10) || 56;
  const triggerMode = config?.triggerMode || 'entrance';
  const threshold = parseFloat(config?.threshold || '0.2') || 0.2;
  const waveOrigin = config?.waveOrigin || 'top-left';
  const waveSpan = parseInt(config?.waveSpan || '750', 10) || 750;
  const revealDur = parseInt(config?.revealDuration || '1100', 10) || 1100;
  const blurFrom = parseFloat(config?.blurFrom ?? '16') || 0;
  const scaleFrom = parseFloat(config?.scaleFrom || '1.1') || 1;
  const showReplay = bool(config?.showReplay, true);

  const LAYOUTS = {
    mosaic: { cols: 6, rows: 4, tiles: [[1, 1, 2, 1], [3, 1, 2, 2], [5, 1, 2, 1], [1, 2, 1, 2], [2, 2, 1, 1], [5, 2, 1, 1], [6, 2, 1, 3], [2, 3, 3, 2], [5, 3, 1, 2], [1, 4, 1, 1]] },
    gallery: { cols: 5, rows: 3, tiles: [[1, 1, 1, 2], [2, 1, 2, 1], [4, 1, 1, 1], [5, 1, 1, 2], [2, 2, 1, 2], [3, 2, 2, 1], [1, 3, 1, 1], [3, 3, 1, 1], [4, 3, 2, 1]] },
    bento: { cols: 6, rows: 4, tiles: [[1, 1, 3, 2], [4, 1, 2, 1], [6, 1, 1, 2], [4, 2, 2, 1], [1, 3, 2, 2], [3, 3, 2, 1], [5, 3, 2, 2], [3, 4, 2, 1]] },
    hero: { cols: 4, rows: 3, tiles: [[1, 1, 2, 2], [3, 1, 1, 1], [4, 1, 1, 2], [3, 2, 1, 1], [1, 3, 1, 1], [2, 3, 2, 1], [4, 3, 1, 1]] }
  };
  const layout = LAYOUTS[variant] || LAYOUTS.mosaic;
  const count = Math.min(layout.tiles.length, allImages.length);
  const items = React.useMemo(() => allImages.slice(0, count).map((src, i) => ({
    src, caption: captions[i] || `Frame ${i + 1}`, meta: metas[i] || ''
  })), [allImages.join('|'), captions.join('|'), metas.join('|'), count]); // eslint-disable-line react-hooks/exhaustive-deps

  const uid = React.useMemo(() => 'ma' + Math.random().toString(36).slice(2, 9), []);
  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const useIso = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

  React.useEffect(() => {
    const families = {
      'Instrument Serif': 'Instrument+Serif:ital@0;1',
      'Fraunces': 'Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500',
      'Inter Tight': 'Inter+Tight:wght@300;400;500',
      'Inter': 'Inter:wght@300;400;500',
      'DM Sans': 'DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500'
    };
    [families[titleFont], families[bodyFont]].filter(Boolean).forEach((f) => {
      const id = 'gf-' + f.replace(/[^a-z0-9]/gi, '').slice(0, 40);
      if (document.getElementById(id)) return;
      const l = document.createElement('link');
      l.id = id; l.rel = 'stylesheet';
      l.href = `https://fonts.googleapis.com/css2?family=${f}&display=swap`;
      document.head.appendChild(l);
    });
  }, [titleFont, bodyFont]);

  const rootRef = React.useRef(null);
  const tileRefs = React.useRef([]);
  const imgRefs = React.useRef([]);
  const capRefs = React.useRef([]);
  const lbWrapRef = React.useRef(null);
  const closeBtnRef = React.useRef(null);
  const timers = React.useRef([]);
  const rafRef = React.useRef(0);
  const scrollerRef = React.useRef(null);
  const [width, setWidth] = React.useState(1280);
  const [stageH, setStageH] = React.useState(800);
  const [played, setPlayed] = React.useState(reduced || triggerMode === 'manual');
  const [lb, setLb] = React.useState(null);

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return undefined;
    const s = typeof getScrollContainer === 'function' ? getScrollContainer() : null;
    const scroller = s && s !== window && s.nodeType === 1 ? s : window;
    scrollerRef.current = scroller;
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

  React.useEffect(() => () => { timers.current.forEach(clearTimeout); cancelAnimationFrame(rafRef.current); }, []);

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
    const io = new IntersectionObserver((es) => {
      if (es[0].isIntersecting) {
        rafRef.current = requestAnimationFrame(() => setPlayed(true));
        if (triggerMode === 'entrance') io.disconnect();
      } else if (triggerMode === 'scroll') { cancelAnimationFrame(rafRef.current); setPlayed(false); }
    }, { threshold });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(rafRef.current); };
  }, [triggerMode, threshold, reduced]);

  const compact = width < 760;
  const pad = compact ? 16 : Math.round(Math.min(48, Math.max(24, width * 0.035)));
  const headerH = showHeader ? (compact ? 0 : Math.round(titleSize * 1.05 + 40)) : 0;
  const gridH = compact ? null : Math.max(380, Math.max(600, stageH) - pad * 2 - headerH);
  const compactCols = 2;
  const geo = React.useMemo(() => items.map((it, i) => {
    if (compact) {
      const big = i % 3 === 0;
      return { big, cx: big ? 0.5 : (i % 3 === 1 ? 0.25 : 0.75), cy: count > 1 ? i / (count - 1) : 0 };
    }
    const [c, r, w, h] = layout.tiles[i];
    return { c, r, w, h, cx: (c - 1 + w / 2) / layout.cols, cy: (r - 1 + h / 2) / layout.rows };
  }), [items, compact, layout, count]);

  const delayFor = (g) => {
    let d;
    if (waveOrigin === 'centre') d = Math.min(1, Math.hypot(g.cx - 0.5, g.cy - 0.5) / 0.7071);
    else if (waveOrigin === 'bottom-right') d = 1 - (g.cx + g.cy) / 2;
    else d = (g.cx + g.cy) / 2;
    return Math.round(120 + d * waveSpan);
  };
  const dirFor = (g) => {
    const dx = g.cx - 0.5;
    const dy = g.cy - 0.5;
    if (Math.abs(dx) >= Math.abs(dy)) return dx < 0 ? 'left' : 'right';
    return dy < 0 ? 'top' : 'bottom';
  };
  const hiddenClip = { left: 'inset(0% 100% 0% 0%)', right: 'inset(0% 0% 0% 100%)', top: 'inset(0% 0% 100% 0%)', bottom: 'inset(100% 0% 0% 0%)' };
  const nudge = { left: 'translate3d(-8%,0,0)', right: 'translate3d(8%,0,0)', top: 'translate3d(0,-8%,0)', bottom: 'translate3d(0,8%,0)' };
  const capFrom = { left: 'translate3d(-101%,0,0)', right: 'translate3d(101%,0,0)', top: 'translate3d(0,-101%,0)', bottom: 'translate3d(0,101%,0)' };

  const sideOf = (e, el) => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    if (Math.abs(x) >= Math.abs(y)) return x < 0 ? 'left' : 'right';
    return y < 0 ? 'top' : 'bottom';
  };
  const capIn = (i, side) => {
    const c = capRefs.current[i];
    if (!c) return;
    if (reduced) { c.style.transform = 'none'; c.style.opacity = '1'; return; }
    c.style.transition = 'none';
    c.style.transform = capFrom[side];
    c.style.opacity = '1';
    void c.offsetWidth;
    c.style.transition = 'transform .6s cubic-bezier(0.22, 1, 0.36, 1)';
    c.style.transform = 'translate3d(0,0,0)';
  };
  const capOut = (i, side) => {
    const c = capRefs.current[i];
    if (!c) return;
    if (reduced) { c.style.opacity = '0'; return; }
    c.style.transition = 'transform .5s cubic-bezier(0.65, 0, 0.35, 1)';
    c.style.transform = capFrom[side];
  };

  const toLocal = () => {
    const root = rootRef.current;
    const rr = root.getBoundingClientRect();
    const k = rr.width / (root.offsetWidth || rr.width || 1) || 1;
    return { rr, k };
  };
  const computeGeometry = (i, overlayBox) => {
    const tile = tileRefs.current[i];
    const img = imgRefs.current[i];
    if (!tile) return null;
    const { rr, k } = toLocal();
    const tr = tile.getBoundingClientRect();
    const T = { x: (tr.left - rr.left) / k, y: (tr.top - rr.top) / k - overlayBox.top, w: tr.width / k, h: tr.height / k };
    const nw = (img && img.naturalWidth) || T.w;
    const nh = (img && img.naturalHeight) || T.h;
    const capSpace = compact ? 84 : 92;
    const side = compact ? 16 : Math.max(56, width * 0.07);
    const availW = width - side * 2;
    const availH = overlayBox.height - (compact ? 64 : 72) - capSpace;
    const ar = nw / nh;
    let fw = availW;
    let fh = fw / ar;
    if (fh > availH) { fh = availH; fw = fh * ar; }
    const F = { x: (width - fw) / 2, y: (compact ? 64 : 72) + (availH - fh) / 2, w: fw, h: fh };
    const s = Math.max(T.w / F.w, T.h / F.h);
    const from = {
      tx: T.x + T.w / 2 - (F.x + F.w / 2), ty: T.y + T.h / 2 - (F.y + F.h / 2), s,
      ix: Math.max(0, (F.w - T.w / s) / 2), iy: Math.max(0, (F.h - T.h / s) / 2), r: radius / s
    };
    return { F, from };
  };
  const visibleBox = () => {
    const root = rootRef.current;
    const { rr, k } = toLocal();
    const sc = scrollerRef.current;
    const vTop = sc && sc !== window ? sc.getBoundingClientRect().top : 0;
    const vH = sc && sc !== window ? sc.getBoundingClientRect().height : window.innerHeight;
    const top = Math.max(0, (vTop - rr.top) / k);
    const bottom = Math.min(root.offsetHeight, (vTop + vH - rr.top) / k);
    return { top, height: Math.max(320, bottom - top) };
  };
  const fromStyle = (f) => ({
    transform: `translate3d(${f.tx}px, ${f.ty}px, 0) scale(${f.s})`,
    clip: `inset(${f.iy}px ${f.ix}px ${f.iy}px ${f.ix}px round ${f.r}px)`
  });

  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  const openLb = (i) => {
    if (!enableLightbox) return;
    clearTimers();
    const box = visibleBox();
    const g = computeGeometry(i, box);
    if (!g) return;
    setLb({ i, box, F: g.F, from: g.from, phase: 'enter', key: Date.now() });
  };
  const CLOSE_T = 'transform 0.62s cubic-bezier(0.65, 0, 0.35, 1), clip-path 0.62s cubic-bezier(0.65, 0, 0.35, 1)';
  const lbRef = React.useRef(null);
  lbRef.current = lb;
  const closeLb = React.useCallback(() => {
    const cur = lbRef.current;
    if (!cur || cur.phase === 'closing') return;
    {
      const g = computeGeometry(cur.i, cur.box);
      const w = lbWrapRef.current;
      if (w && g && !reduced) {
        const st = fromStyle(g.from);
        w.style.transition = CLOSE_T;
        w.style.transform = st.transform;
        w.style.clipPath = st.clip;
      }
      clearTimers();
      const idx = cur.i;
      timers.current.push(setTimeout(() => {
        setLb(null);
        const t = tileRefs.current[idx];
        if (t) t.focus({ preventScroll: true });
      }, reduced ? 0 : 640));
      setLb({ ...cur, phase: 'closing' });
    }
  }, [reduced, width, compact, radius]); // eslint-disable-line react-hooks/exhaustive-deps
  const navLb = (dir) => {
    const cur = lbRef.current;
    if (!cur || cur.phase === 'closing') return;
    const i = (cur.i + dir + count) % count;
    const g = computeGeometry(i, cur.box);
    if (g) setLb({ ...cur, i, F: g.F, from: g.from, phase: 'nav' });
  };

  useIso(() => {
    if (!lb || lb.phase !== 'enter') return;
    const w = lbWrapRef.current;
    if (!w) return;
    const st = fromStyle(lb.from);
    w.style.transition = 'none';
    w.style.transform = st.transform;
    w.style.clipPath = st.clip;
    void w.offsetWidth;
    if (!reduced) w.style.transition = 'transform .75s cubic-bezier(0.22, 1, 0.36, 1), clip-path .75s cubic-bezier(0.22, 1, 0.36, 1)';
    w.style.transform = 'translate3d(0,0,0) scale(1)';
    w.style.clipPath = 'inset(0px 0px 0px 0px round 0px)';
    if (closeBtnRef.current) closeBtnRef.current.focus({ preventScroll: true });
  }, [lb && lb.key, lb && lb.phase]);

  React.useEffect(() => {
    if (!lb) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); closeLb(); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); navLb(1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); navLb(-1); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [!!lb, closeLb]); // eslint-disable-line react-hooks/exhaustive-deps

  const titleCss = titleFont === 'Georgia' ? 'Georgia, serif'
    : titleFont === 'Inter Tight' ? '"Inter Tight", "Inter", -apple-system, sans-serif'
    : `"${titleFont}", "Iowan Old Style", Georgia, serif`;
  const bodyCss = bodyFont === 'system-ui' ? 'system-ui, -apple-system, sans-serif' : `"${bodyFont}", -apple-system, "Helvetica Neue", Arial, sans-serif`;
  const E = 'cubic-bezier(0.22, 1, 0.36, 1)';
  const pad2 = (n) => String(n).padStart(2, '0');
  const on = played;
  const cellW = compact ? (width - pad * 2 - gap) / 2 : 0;

  const btnReset = { appearance: 'none', border: 'none', background: 'transparent', padding: 0, margin: 0, font: 'inherit', color: 'inherit', cursor: 'pointer' };
  const roundBtn = { ...btnReset, width: 40, height: 40, borderRadius: '50%', border: `1px solid ${text}40`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: text };

  if (!items.length) {
    return <section className="mosaic-assemble" style={{ height: 420, background: bg, color: muted, display: 'grid', placeItems: 'center', fontFamily: bodyCss }}>Add image URLs to build the mosaic</section>;
  }

  const lbItem = lb ? items[lb.i] : null;

  return (
    <section ref={rootRef} className={`mosaic-assemble ${uid}`} aria-label={title}
      style={{ position: 'relative', width: '100%', minHeight: compact ? 0 : Math.max(600, stageH), boxSizing: 'border-box', background: bg, color: text, fontFamily: bodyCss, padding: pad, overflow: 'hidden' }}>
      <style>{`
        .${uid} .${uid}-tile { outline: none; }
        .${uid} .${uid}-tile:focus-visible { box-shadow: 0 0 0 2px ${bg}, 0 0 0 4px ${accent}; }
        .${uid} .${uid}-tile .${uid}-hz { transition: transform 1s ${E}; }
        .${uid} .${uid}-tile:hover .${uid}-hz { transform: scale(1.045); }
        .${uid} .${uid}-rb { transition: background .3s, color .3s, border-color .3s, transform .5s ${E}; }
        .${uid} .${uid}-rb:hover { background: ${text}; color: ${bg}; border-color: ${text}; }
        .${uid} .${uid}-rb:focus-visible { outline: 2px solid ${accent}; outline-offset: 3px; }
      `}</style>

      {showHeader && (
        <header style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20, marginBottom: compact ? 20 : 24, minHeight: compact ? 0 : headerH - 24 }}>
          <div>
            <h2 style={{ margin: 0, fontFamily: titleCss, fontWeight: 400, fontSize: compact ? Math.round(titleSize * 0.7) : titleSize, lineHeight: 1, letterSpacing: titleFont === 'Inter Tight' ? '-0.04em' : '-0.015em', overflow: 'hidden', paddingBottom: '0.08em' }}>
              <span style={{ display: 'block', transform: on ? 'none' : 'translateY(105%)', transition: on && !reduced ? `transform 1.1s ${E} 60ms` : 'none' }}>{title}</span>
            </h2>
            {compact && <p style={{ margin: '8px 0 0', fontSize: 13, color: muted }}>{subtitle}</p>}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 13, color: muted, paddingBottom: compact ? 0 : 6 }}>
            {!compact && <span style={{ opacity: on ? 1 : 0, transition: on && !reduced ? 'opacity .8s ease 300ms' : 'none' }}>{subtitle}</span>}
            {!compact && <span style={{ color: text, fontVariantNumeric: 'tabular-nums' }}>{pad2(count)}</span>}
            {showReplay && (
              <button type="button" className={`${uid}-rb`} onClick={replay} aria-label="Replay the mosaic assembly" style={roundBtn}>
                <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><path d="M13.5 8a5.5 5.5 0 1 1-1.7-3.98M13.5 2.5v3h-3" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            )}
          </div>
        </header>
      )}

      <div role="list" style={compact
        ? { display: 'grid', gridTemplateColumns: `repeat(${compactCols}, minmax(0,1fr))`, gridAutoRows: Math.round(cellW * 0.95), gap }
        : { display: 'grid', gridTemplateColumns: `repeat(${layout.cols}, minmax(0,1fr))`, gridTemplateRows: `repeat(${layout.rows}, minmax(0,1fr))`, gap, height: gridH }}>
        {items.map((it, i) => {
          const g = geo[i];
          const dir = dirFor(g);
          const delay = delayFor(g);
          const hidden = lb && lb.i === i;
          const pos = compact
            ? { gridColumn: g.big ? 'span 2' : 'span 1', gridRow: g.big ? 'span 1' : 'span 1' }
            : { gridColumn: `${g.c} / span ${g.w}`, gridRow: `${g.r} / span ${g.h}` };
          return (
            <div role="listitem" key={i} style={{ ...pos, position: 'relative', minWidth: 0, minHeight: 0 }}>
              <button type="button" ref={(el) => { tileRefs.current[i] = el; }} className={`${uid}-tile`}
                aria-label={`${it.caption}${it.meta ? ', ' + it.meta : ''}${enableLightbox ? ' — open larger' : ''}`}
                onMouseEnter={(e) => capIn(i, sideOf(e, e.currentTarget))}
                onMouseLeave={(e) => capOut(i, sideOf(e, e.currentTarget))}
                onFocus={(e) => { let fv = true; try { fv = e.currentTarget.matches(':focus-visible'); } catch (err) { fv = true; } if (fv) capIn(i, 'bottom'); }} onBlur={() => capOut(i, 'bottom')}
                onClick={() => openLb(i)}
                style={{ ...btnReset, position: 'absolute', inset: 0, width: '100%', height: '100%', borderRadius: radius, overflow: 'hidden', display: 'block', cursor: enableLightbox ? 'zoom-in' : 'default', opacity: hidden ? 0 : 1, transition: hidden ? 'none' : 'opacity .2s' }}>
                <div style={{
                  position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: radius, background: `${muted}22`,
                  clipPath: on ? 'inset(0% 0% 0% 0%)' : hiddenClip[dir], WebkitClipPath: on ? 'inset(0% 0% 0% 0%)' : hiddenClip[dir],
                  transition: on && !reduced ? `clip-path ${revealDur}ms cubic-bezier(0.77, 0, 0.175, 1) ${delay}ms, -webkit-clip-path ${revealDur}ms cubic-bezier(0.77, 0, 0.175, 1) ${delay}ms` : 'none'
                }}>
                  <div className={`${uid}-hz`} style={{ position: 'absolute', inset: 0 }}>
                    <img ref={(el) => { imgRefs.current[i] = el; }} src={it.src} alt={it.caption} draggable="false" style={{
                      position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                      transform: on ? 'translate3d(0,0,0) scale(1)' : `${nudge[dir]} scale(${scaleFrom})`,
                      filter: on || !blurFrom ? 'blur(0px)' : `blur(${blurFrom}px)`,
                      transition: on && !reduced ? `transform ${revealDur + 500}ms ${E} ${delay}ms, filter ${revealDur}ms ease ${delay + 120}ms` : 'none'
                    }} />
                  </div>
                </div>
                <div ref={(el) => { capRefs.current[i] = el; }} aria-hidden="true" style={{
                  position: 'absolute', inset: 0, transform: capFrom.bottom, background: `${tint}8C`, backdropFilter: 'blur(2px)', WebkitBackdropFilter: 'blur(2px)',
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: compact ? 12 : 18, color: text, textAlign: 'left', boxSizing: 'border-box', pointerEvents: 'none'
                }}>
                  <span style={{ fontSize: 12, fontVariantNumeric: 'tabular-nums', color: accent }}>{pad2(i + 1)}</span>
                  <span>
                    <span style={{ display: 'block', fontFamily: titleCss, fontSize: compact ? 20 : Math.round(Math.min(32, Math.max(20, width * 0.02))), lineHeight: 1.05, letterSpacing: '-0.01em' }}>{it.caption}</span>
                    {it.meta && <span style={{ display: 'block', marginTop: 6, fontSize: 12, color: `${text}B3` }}>{it.meta}</span>}
                  </span>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {lb && lbItem && (
        <div role="dialog" aria-modal="true" aria-label={`${lbItem.caption} — image ${lb.i + 1} of ${count}`}
          style={{ position: 'absolute', left: 0, top: lb.box.top, width: '100%', height: lb.box.height, zIndex: 20 }}>
          <div onClick={closeLb} style={{ position: 'absolute', inset: 0, background: `${bg}F2`, opacity: lb.phase === 'closing' ? 0 : 1, animation: lb.phase === 'enter' && !reduced ? `${uid}-fade .5s ease` : 'none', transition: 'opacity .55s ease' }} />
          <style>{`@keyframes ${uid}-fade { from { opacity: 0; } to { opacity: 1; } } @keyframes ${uid}-up { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }`}</style>
          <div ref={lbWrapRef} style={{
            position: 'absolute', left: lb.F.x, top: lb.F.y, width: lb.F.w, height: lb.F.h, overflow: 'hidden', transformOrigin: '50% 50%', willChange: 'transform',
            transition: reduced ? 'none' : lb.phase === 'nav' ? `left .6s ${E}, top .6s ${E}, width .6s ${E}, height .6s ${E}` : lb.phase === 'closing' ? CLOSE_T : undefined
          }}>
            <img key={lb.i} src={lbItem.src} alt={lbItem.caption} draggable="false" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', animation: lb.phase === 'nav' && !reduced ? `${uid}-fade .45s ease` : 'none' }} />
          </div>
          <div key={'c' + lb.i} style={{ position: 'absolute', left: lb.F.x, width: lb.F.w, top: lb.F.y + lb.F.h + 16, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, opacity: lb.phase === 'closing' ? 0 : 1, transition: 'opacity .3s', animation: reduced || lb.phase === 'closing' ? 'none' : `${uid}-up .6s ${E} .35s both` }}>
            <div>
              <div style={{ fontFamily: titleCss, fontSize: compact ? 24 : 30, lineHeight: 1.1 }}>{lbItem.caption}</div>
              {lbItem.meta && <div style={{ fontSize: 13, color: muted, marginTop: 4 }}>{lbItem.meta}</div>}
            </div>
            <div style={{ fontSize: 13, color: muted, fontVariantNumeric: 'tabular-nums' }}><span style={{ color: text }}>{pad2(lb.i + 1)}</span> / {pad2(count)}</div>
          </div>
          <div style={{ position: 'absolute', top: compact ? 14 : 20, left: compact ? 16 : pad, right: compact ? 16 : pad, display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: lb.phase === 'closing' ? 0 : 1, transition: 'opacity .3s', animation: reduced || lb.phase === 'closing' ? 'none' : `${uid}-fade .5s ease .2s both` }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="button" className={`${uid}-rb`} style={roundBtn} onClick={() => navLb(-1)} aria-label="Previous image">
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M13 8H3M7 3.5 2.5 8 7 12.5" fill="none" stroke="currentColor" strokeWidth="1.3" /></svg>
              </button>
              <button type="button" className={`${uid}-rb`} style={roundBtn} onClick={() => navLb(1)} aria-label="Next image">
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 3.5 13.5 8 9 12.5" fill="none" stroke="currentColor" strokeWidth="1.3" /></svg>
              </button>
            </div>
            <button type="button" ref={closeBtnRef} className={`${uid}-rb`} style={roundBtn} onClick={closeLb} aria-label="Close">
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M2 2l10 10M12 2 2 12" fill="none" stroke="currentColor" strokeWidth="1.3" /></svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

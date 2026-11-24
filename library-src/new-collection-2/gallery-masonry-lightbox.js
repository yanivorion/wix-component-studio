const MANIFEST = {
  "type": "Gallery.MasonryLightbox",
  "description": "A responsive masonry that reveals in a staggered rise; clicking a photo flies it out of its exact grid slot into a blurred-backdrop lightbox with direction-aware swipe, double-click zoom and keyboard navigation, then flies it back into place — even after scrolling. Filter chips re-flow the grid with FLIP motion",
  "editorElement": {
    "selector": ".masonry-lightbox",
    "displayName": "Masonry Lightbox",
    "archetype": "container",
    "data": {
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Field Notes — 2026", "group": "Content" },
      "heading": { "dataType": "text", "displayName": "Heading", "defaultValue": "Collected along the way", "group": "Content" },
      "intro": { "dataType": "text", "displayName": "Intro", "defaultValue": "Eighteen frames from a year of walking — buildings, weather, people and the small objects that kept us company.", "group": "Content" },
      "titles": { "dataType": "text", "displayName": "Titles (comma separated)", "defaultValue": "Glass Ascent,Low Tide,Pour Over,Portrait in Red,Morning Rock,Lattice,Retina,Paddle,Fog Line,White Folds,Cactus,Skógafoss,Underground,The Ridge,Blue Table,Coastline,Facade,Tea Set", "group": "Content" },
      "captions": { "dataType": "text", "displayName": "Captions (separate with |)", "defaultValue": "Midtown Manhattan, looking up|Camber Sands at slack water|A slow morning in Kyoto|Studio portrait, natural light|Reynisdrangar, before the crowds|Seattle Central Library|An old rangefinder on the piano|Lake Louise, 6 a.m.|The valley holds its breath|Broad Museum, Los Angeles|Windowsill, Lisbon|South Iceland, rainbow included|Westfriedhof station, Munich|Dolomites, last light|Oia, a table and a single stem|Point Reyes from the bluff|Hong Kong, 40 floors of windows|Tea for two, Hampstead", "group": "Content" },
      "tags": { "dataType": "text", "displayName": "Tags (comma separated, one per image)", "defaultValue": "Architecture,Landscape,Objects,People,Landscape,Architecture,Objects,People,Landscape,Architecture,Objects,Landscape,Architecture,People,Objects,Landscape,Architecture,Objects", "group": "Content" },
      "allLabel": { "dataType": "text", "displayName": "All Filter Label", "defaultValue": "All", "group": "Content" },
      "images": { "dataType": "text", "displayName": "Image URLs (comma separated)", "defaultValue": "https://picsum.photos/id/1031/900/1300,https://picsum.photos/id/1055/1200/800,https://picsum.photos/id/1060/900/1150,https://picsum.photos/id/1027/900/1200,https://picsum.photos/id/1049/1000/1000,https://picsum.photos/id/1076/900/1300,https://picsum.photos/id/250/1200/900,https://picsum.photos/id/1011/1200/800,https://picsum.photos/id/1064/1000/1300,https://picsum.photos/id/1081/1000/1250,https://picsum.photos/id/248/1000/1000,https://picsum.photos/id/1035/900/1200,https://picsum.photos/id/1033/1200/850,https://picsum.photos/id/177/1000/1300,https://picsum.photos/id/1068/1200/900,https://picsum.photos/id/1061/1200/800,https://picsum.photos/id/1054/900/1200,https://picsum.photos/id/225/1000/1200", "group": "Images" },
      "imageTreatment": { "dataType": "select", "displayName": "Image Treatment", "defaultValue": "none", "options": ["none", "muted", "grayscale"], "group": "Images" },
      "showFilters": { "dataType": "booleanValue", "displayName": "Filter Chips", "defaultValue": "true", "group": "Layout" },
      "columns": { "dataType": "select", "displayName": "Columns", "defaultValue": "auto", "options": ["auto", "2", "3", "4", "5"], "group": "Layout" },
      "minColumnWidth": { "dataType": "select", "displayName": "Min Column Width (auto)", "defaultValue": "260", "options": ["200", "240", "260", "300", "340"], "group": "Layout" },
      "gap": { "dataType": "select", "displayName": "Gap (px)", "defaultValue": "16", "options": ["4", "8", "12", "16", "24"], "group": "Layout" },
      "radius": { "dataType": "select", "displayName": "Corner Radius (px)", "defaultValue": "2", "options": ["0", "2", "6", "12"], "group": "Layout" },
      "hoverCaptions": { "dataType": "booleanValue", "displayName": "Captions On Hover", "defaultValue": "true", "group": "Layout" },
      "revealStyle": { "dataType": "select", "displayName": "Reveal Style", "defaultValue": "rise", "options": ["rise", "curtain", "fade"], "group": "Animation" },
      "revealStagger": { "dataType": "select", "displayName": "Reveal Stagger (ms)", "defaultValue": "70", "options": ["40", "70", "100", "140"], "group": "Animation" },
      "lightboxBlur": { "dataType": "select", "displayName": "Backdrop Blur (px)", "defaultValue": "18", "options": ["0", "8", "18", "28"], "group": "Lightbox" },
      "zoomScale": { "dataType": "select", "displayName": "Double-Click Zoom", "defaultValue": "2.2", "options": ["1.6", "2.2", "3"], "group": "Lightbox" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#FAFAF9", "group": "Colors" },
      "textColor": { "dataType": "color", "displayName": "Text", "defaultValue": "#1C1917", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#78716C", "group": "Colors" },
      "chipColor": { "dataType": "color", "displayName": "Active Chip", "defaultValue": "#1C1917", "group": "Colors" },
      "chipTextColor": { "dataType": "color", "displayName": "Active Chip Text", "defaultValue": "#FAFAF9", "group": "Colors" },
      "placeholderColor": { "dataType": "color", "displayName": "Image Placeholder", "defaultValue": "#E7E5E4", "group": "Colors" },
      "backdropColor": { "dataType": "color", "displayName": "Lightbox Backdrop", "defaultValue": "#F5F5F4", "group": "Colors" },
      "titleFont": { "dataType": "select", "displayName": "Heading Font", "defaultValue": "Instrument Serif", "options": ["Instrument Serif", "Fraunces", "Inter Tight", "Inter"], "group": "Typography" },
      "headingSize": { "dataType": "select", "displayName": "Heading Size (px)", "defaultValue": "72", "options": ["48", "56", "64", "72", "88"], "group": "Typography" },
      "titleWeight": { "dataType": "select", "displayName": "Heading Weight", "defaultValue": "400", "options": ["300", "400", "500"], "group": "Typography" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const split = (s, sep = ',') => String(s || '').split(sep).map((x) => x.trim()).filter(Boolean);

  const eyebrow = config?.eyebrow ?? 'Field Notes — 2026';
  const heading = config?.heading ?? 'Collected along the way';
  const intro = config?.intro ?? 'Eighteen frames from a year of walking — buildings, weather, people and the small objects that kept us company.';
  const titles = split(config?.titles || 'Glass Ascent,Low Tide,Pour Over,Portrait in Red,Morning Rock,Lattice,Retina,Paddle,Fog Line,White Folds,Cactus,Skógafoss,Underground,The Ridge,Blue Table,Coastline,Facade,Tea Set');
  const captions = split(config?.captions || 'Midtown Manhattan, looking up|Camber Sands at slack water|A slow morning in Kyoto|Studio portrait, natural light|Reynisdrangar, before the crowds|Seattle Central Library|An old rangefinder on the piano|Lake Louise, 6 a.m.|The valley holds its breath|Broad Museum, Los Angeles|Windowsill, Lisbon|South Iceland, rainbow included|Westfriedhof station, Munich|Dolomites, last light|Oia, a table and a single stem|Point Reyes from the bluff|Hong Kong, 40 floors of windows|Tea for two, Hampstead', '|');
  const tags = split(config?.tags || 'Architecture,Landscape,Objects,People,Landscape,Architecture,Objects,People,Landscape,Architecture,Objects,Landscape,Architecture,People,Objects,Landscape,Architecture,Objects');
  const allLabel = config?.allLabel || 'All';
  const images = split(config?.images || 'https://picsum.photos/id/1031/900/1300,https://picsum.photos/id/1055/1200/800,https://picsum.photos/id/1060/900/1150,https://picsum.photos/id/1027/900/1200,https://picsum.photos/id/1049/1000/1000,https://picsum.photos/id/1076/900/1300,https://picsum.photos/id/250/1200/900,https://picsum.photos/id/1011/1200/800,https://picsum.photos/id/1064/1000/1300,https://picsum.photos/id/1081/1000/1250,https://picsum.photos/id/248/1000/1000,https://picsum.photos/id/1035/900/1200,https://picsum.photos/id/1033/1200/850,https://picsum.photos/id/177/1000/1300,https://picsum.photos/id/1068/1200/900,https://picsum.photos/id/1061/1200/800,https://picsum.photos/id/1054/900/1200,https://picsum.photos/id/225/1000/1200');
  const treatment = config?.imageTreatment || 'none';
  const showFilters = bool(config?.showFilters, true);
  const columnsMode = config?.columns || 'auto';
  const minColW = parseInt(config?.minColumnWidth || '260', 10) || 260;
  const gap = parseInt(config?.gap ?? '16', 10) || 0;
  const radius = parseInt(config?.radius ?? '2', 10) || 0;
  const hoverCaptions = bool(config?.hoverCaptions, true);
  const revealStyle = config?.revealStyle || 'rise';
  const stagger = parseInt(config?.revealStagger || '70', 10) || 70;
  const blurPx = parseInt(config?.lightboxBlur ?? '18', 10) || 0;
  const zoomScale = parseFloat(config?.zoomScale || '2.2') || 2.2;
  const bg = config?.backgroundColor || '#FAFAF9';
  const text = config?.textColor || '#1C1917';
  const muted = config?.mutedColor || '#78716C';
  const chipBg = config?.chipColor || '#1C1917';
  const chipText = config?.chipTextColor || '#FAFAF9';
  const ph = config?.placeholderColor || '#E7E5E4';
  const backdrop = config?.backdropColor || '#F5F5F4';
  const titleFont = config?.titleFont || 'Instrument Serif';
  const headingSize = parseInt(config?.headingSize || '72', 10) || 72;
  const titleWeight = config?.titleWeight || '400';

  const N = images.length;
  const uid = React.useMemo(() => 'ml' + Math.random().toString(36).slice(2, 9), []);
  const reduced = React.useMemo(() => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  const parseRatio = (u) => { const m = String(u).match(/\/(\d{2,5})\/(\d{2,5})\/?(?:[?#].*)?$/); return m ? parseInt(m[1], 10) / parseInt(m[2], 10) : 0; };
  const [loadedRatio, setLoadedRatio] = React.useState({});
  const ratios = images.map((u, i) => loadedRatio[i] || parseRatio(u) || 0.8);
  const tagsOf = (i) => split(tags[i] || '', '/');
  const allTags = React.useMemo(() => {
    const out = [];
    images.forEach((_, i) => tagsOf(i).forEach((t) => { if (!out.includes(t)) out.push(t); }));
    return out;
  }, [config?.tags, N]); // eslint-disable-line react-hooks/exhaustive-deps

  const rootRef = React.useRef(null);
  const gridRef = React.useRef(null);
  const itemRefs = React.useRef([]);
  const btnRefs = React.useRef([]);
  const chipRefs = React.useRef([]);
  const chipRowRef = React.useRef(null);
  const overlayRef = React.useRef(null);
  const flierRef = React.useRef(null);
  const swipeRef = React.useRef(null);
  const scrollerRef = React.useRef(null);
  const lastPos = React.useRef({});
  const revealQueue = React.useRef({ t: 0, n: 0 });
  const swipe = React.useRef(null);
  const tapRef = React.useRef(0);
  const [width, setWidth] = React.useState(0);
  const [filter, setFilter] = React.useState('*');
  const [revealed, setRevealed] = React.useState({});
  const [ready, setReady] = React.useState(false);
  const [pill, setPill] = React.useState(null);
  const [lb, setLb] = React.useState(null);
  const [vp, setVp] = React.useState({ top: 0, h: 800 });
  const [ghost, setGhost] = React.useState(null);
  const [zoom, setZoom] = React.useState(null);

  React.useEffect(() => {
    const families = { 'Instrument Serif': 'Instrument+Serif:ital@0;1', 'Fraunces': 'Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500', 'Inter Tight': 'Inter+Tight:wght@300;400;500' };
    [families[titleFont], 'Inter:wght@300;400;500'].filter(Boolean).forEach((f) => {
      const id = 'gf-' + f.replace(/[^a-z0-9]/gi, '').slice(0, 40);
      if (document.getElementById(id)) return;
      const l = document.createElement('link');
      l.id = id; l.rel = 'stylesheet';
      l.href = `https://fonts.googleapis.com/css2?family=${f}&display=swap`;
      document.head.appendChild(l);
    });
  }, [titleFont]);

  React.useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return undefined;
    const measure = () => setWidth(el.clientWidth || 1280);
    measure();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (ro) ro.observe(el);
    window.addEventListener('resize', measure);
    const t = requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)));
    return () => { if (ro) ro.disconnect(); window.removeEventListener('resize', measure); cancelAnimationFrame(t); };
  }, []);

  const W = width || 1280;
  const compact = W < 700;
  const pad = compact ? 16 : Math.round(Math.max(24, Math.min(56, W * 0.04)));
  const innerW = W - pad * 2;
  const g = compact ? Math.min(gap, 10) : gap;
  const cols = columnsMode === 'auto'
    ? Math.max(W < 340 ? 1 : 2, Math.min(5, Math.floor((innerW + g) / (minColW + g))))
    : Math.max(1, Math.min(compact ? 2 : 6, parseInt(columnsMode, 10) || 3));
  const colW = (innerW - g * (cols - 1)) / cols;

  const visibleList = React.useMemo(() => images.map((_, i) => i).filter((i) => filter === '*' || tagsOf(i).includes(filter)), [filter, N, config?.tags]); // eslint-disable-line react-hooks/exhaustive-deps

  const layout = React.useMemo(() => {
    const heights = Array(cols).fill(0);
    const pos = {};
    visibleList.forEach((i, order) => {
      let c = 0;
      for (let k = 1; k < cols; k++) if (heights[k] < heights[c] - 1) c = k;
      const h = colW / ratios[i];
      pos[i] = { x: c * (colW + g), y: heights[c], h, order };
      heights[c] += h + g;
    });
    return { pos, height: Math.max(0, Math.max(...heights) - g) };
  }, [visibleList, cols, colW, g, ratios.join(',')]); // eslint-disable-line react-hooks/exhaustive-deps

  images.forEach((_, i) => { if (layout.pos[i]) lastPos.current[i] = layout.pos[i]; });

  // staggered reveal as items enter the viewport, batched so a screenful cascades together
  React.useEffect(() => {
    if (reduced) { const all = {}; images.forEach((_, i) => { all[i] = 1; }); setRevealed(all); return undefined; }
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver((entries) => {
      const now = performance.now();
      const q = revealQueue.current;
      if (now - q.t > 160) { q.n = 0; }
      q.t = now;
      const add = {};
      entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left).forEach((e) => {
        const i = parseInt(e.target.getAttribute('data-i'), 10);
        add[i] = { d: Math.min(900, q.n * stagger) };
        q.n += 1;
        io.unobserve(e.target);
      });
      if (Object.keys(add).length) setRevealed((r) => ({ ...r, ...add }));
    }, { threshold: 0.08 });
    itemRefs.current.forEach((el, i) => { if (el && !revealed[i]) io.observe(el); });
    return () => io.disconnect();
  }, [N, reduced, stagger, visibleList]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useLayoutEffect(() => {
    if (!showFilters) return;
    const row = chipRowRef.current;
    const idx = filter === '*' ? 0 : allTags.indexOf(filter) + 1;
    const el = chipRefs.current[idx];
    if (!row || !el) return;
    setPill({ x: el.offsetLeft, w: el.offsetWidth, h: el.offsetHeight, y: el.offsetTop });
  }, [filter, W, allTags.length, showFilters]);

  // ---- lightbox geometry -------------------------------------------------
  const getScroller = () => {
    const s = typeof getScrollContainer === 'function' ? getScrollContainer() : null;
    scrollerRef.current = s && s !== window && s.nodeType === 1 ? s : window;
    return scrollerRef.current;
  };
  const scaleK = () => { const el = rootRef.current; const r = el.getBoundingClientRect(); return r.width / (el.offsetWidth || r.width) || 1; };
  const computeVp = () => {
    const el = rootRef.current; const sc = getScroller();
    const k = scaleK();
    const r = el.getBoundingClientRect();
    const sr = sc === window || !sc ? { top: 0, height: window.innerHeight } : sc.getBoundingClientRect();
    return { top: (sr.top - r.top) / k, h: sr.height / k };
  };
  const lbBox = (h) => {
    const sideM = compact ? 16 : Math.max(72, W * 0.07);
    const topM = compact ? 64 : 76;
    const botM = compact ? 128 : 112;
    return { x: sideM, y: topM, w: W - sideM * 2, h: Math.max(160, h - topM - botM) };
  };
  const targetRect = (i, h) => {
    const b = lbBox(h);
    const a = ratios[i];
    let w = b.w; let hh = w / a;
    if (hh > b.h) { hh = b.h; w = hh * a; }
    return { left: b.x + (b.w - w) / 2, top: b.y + (b.h - hh) / 2, w, h: hh };
  };
  const slotRect = (i) => {
    const el = itemRefs.current[i]; const ov = overlayRef.current;
    if (!el || !ov) return null;
    const k = scaleK();
    const a = el.getBoundingClientRect(); const o = ov.getBoundingClientRect();
    return { left: (a.left - o.left) / k, top: (a.top - o.top) / k, w: a.width / k, h: a.height / k };
  };
  const invertFrom = (from, to) => {
    if (!from) return 'none';
    const dx = from.left + from.w / 2 - (to.left + to.w / 2);
    const dy = from.top + from.h / 2 - (to.top + to.h / 2);
    return `translate(${dx.toFixed(2)}px, ${dy.toFixed(2)}px) scale(${(from.w / to.w).toFixed(4)})`;
  };

  const ease = 'cubic-bezier(.22,1,.36,1)';
  const ease2 = 'cubic-bezier(.65,0,.35,1)';
  const flyDur = reduced ? 0 : 760;

  const openAt = (i) => {
    if (lb) return;
    setVp(computeVp());
    setZoom(null);
    setGhost(null);
    setLb({ i, phase: 'opening', dir: 0, k: 0 });
  };

  React.useLayoutEffect(() => {
    if (!lb) return undefined;
    const fl = flierRef.current;
    if (!fl) return undefined;
    const to = targetRect(lb.i, vp.h);
    if (lb.phase === 'opening') {
      const from = slotRect(lb.i);
      fl.style.transition = 'none';
      fl.style.transform = invertFrom(from, to);
      void fl.offsetWidth;
      fl.style.transition = `transform ${flyDur}ms ${ease}`;
      fl.style.transform = 'none';
      if (overlayRef.current) overlayRef.current.focus({ preventScroll: true });
      const t = setTimeout(() => setLb((l) => (l && l.phase === 'opening' ? { ...l, phase: 'open' } : l)), flyDur);
      return () => clearTimeout(t);
    }
    if (lb.phase === 'closing') {
      const sc = getScroller();
      const item = itemRefs.current[lb.i];
      if (sc && item) {
        const k = scaleK();
        const ir = item.getBoundingClientRect();
        const sr = sc === window ? { top: 0, bottom: window.innerHeight, height: window.innerHeight } : sc.getBoundingClientRect();
        if (ir.top < sr.top + 24 || ir.bottom > sr.bottom - 24) {
          const delta = (ir.top + ir.height / 2) - (sr.top + sr.height / 2);
          if (sc === window) window.scrollBy(0, delta); else sc.scrollTop += delta / k;
          const nv = computeVp();
          if (overlayRef.current) overlayRef.current.style.top = `${nv.top}px`;
        }
      }
      setRevealed((r) => (r[lb.i] ? r : { ...r, [lb.i]: { d: 0, instant: true } }));
      const from = slotRect(lb.i);
      if (swipeRef.current) { swipeRef.current.style.transition = 'none'; swipeRef.current.style.transform = 'none'; }
      fl.style.transition = `transform ${Math.round(flyDur * 0.9)}ms ${ease2}`;
      fl.style.transform = invertFrom(from, to);
      const t = setTimeout(() => {
        const b = btnRefs.current[lb.i];
        setLb(null); setGhost(null); setZoom(null);
        if (b) b.focus({ preventScroll: true });
      }, Math.round(flyDur * 0.9) + 30);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [lb && lb.phase, lb && lb.i]); // eslint-disable-line react-hooks/exhaustive-deps

  const close = () => setLb((l) => (l && l.phase !== 'closing' ? { ...l, phase: 'closing' } : l));
  const reopen = () => {
    const fl = flierRef.current;
    if (!fl || !lb || lb.phase !== 'closing') return;
    fl.style.transition = `transform ${flyDur}ms ${ease}`;
    fl.style.transform = 'none';
    setLb((l) => (l ? { ...l, phase: 'open' } : l));
  };

  const nav = (dir) => {
    if (!lb || lb.phase === 'closing') return;
    const list = visibleList;
    const at = list.indexOf(lb.i);
    if (at < 0 || list.length < 2) return;
    const next = list[(at + dir + list.length) % list.length];
    setGhost({ i: lb.i, dir, k: (ghost ? ghost.k : 0) + 1, rect: targetRect(lb.i, vp.h), dx: swipe.current ? swipe.current.dx : 0 });
    setZoom(null);
    setLb({ i: next, phase: 'open', dir, k: lb.k + 1 });
  };

  React.useEffect(() => {
    if (!ghost) return undefined;
    const t = setTimeout(() => setGhost((gh) => (gh && gh.k === ghost.k ? null : gh)), reduced ? 0 : 620);
    return () => clearTimeout(t);
  }, [ghost, reduced]);

  // keep the overlay pinned to the visible viewport and block page scroll while open
  React.useEffect(() => {
    if (!lb) return undefined;
    const sc = getScroller();
    const onScroll = () => { const nv = computeVp(); if (overlayRef.current) overlayRef.current.style.top = `${nv.top}px`; };
    const block = (e) => e.preventDefault();
    const ov = overlayRef.current;
    sc.addEventListener('scroll', onScroll, { passive: true });
    if (ov) { ov.addEventListener('wheel', block, { passive: false }); ov.addEventListener('touchmove', block, { passive: false }); }
    return () => {
      sc.removeEventListener('scroll', onScroll);
      if (ov) { ov.removeEventListener('wheel', block); ov.removeEventListener('touchmove', block); }
    };
  }, [!!lb]); // eslint-disable-line react-hooks/exhaustive-deps

  const onKey = (e) => {
    if (!lb) return;
    if (e.key === 'Escape') { e.preventDefault(); if (lb.phase === 'closing') reopen(); else close(); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); nav(1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); nav(-1); }
    else if ([' ', 'PageDown', 'PageUp', 'ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) e.preventDefault();
  };

  const localPt = (e) => { const k = scaleK(); return { x: e.clientX / k, y: e.clientY / k }; };
  const onFlierDown = (e) => {
    if (!lb || lb.phase !== 'open' || zoom) return;
    const p = localPt(e);
    swipe.current = { x0: p.x, y0: p.y, dx: 0, t: performance.now(), id: e.pointerId };
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch (err) { /* noop */ }
    if (swipeRef.current) swipeRef.current.style.transition = 'none';
  };
  const onFlierMove = (e) => {
    if (zoom) {
      const r = e.currentTarget.getBoundingClientRect();
      setZoom((z) => (z ? { ...z, ox: ((e.clientX - r.left) / r.width) * 100, oy: ((e.clientY - r.top) / r.height) * 100 } : z));
      return;
    }
    const s = swipe.current;
    if (!s) return;
    const p = localPt(e);
    s.dx = p.x - s.x0;
    if (swipeRef.current) swipeRef.current.style.transform = `translateX(${s.dx}px) rotate(${(s.dx * 0.006).toFixed(3)}deg)`;
  };
  const onFlierUp = (e) => {
    const s = swipe.current;
    if (!s) return;
    const dt = performance.now() - s.t;
    const v = Math.abs(s.dx) / Math.max(1, dt);
    if (Math.abs(s.dx) > 80 || (Math.abs(s.dx) > 24 && v > 0.5)) {
      nav(s.dx < 0 ? 1 : -1);
    } else {
      if (swipeRef.current) {
        swipeRef.current.style.transition = `transform 500ms ${ease}`;
        swipeRef.current.style.transform = 'none';
      }
      if (Math.abs(s.dx) < 6 && e.pointerType !== 'mouse') {
        const now = performance.now();
        if (now - tapRef.current < 300) { toggleZoom(e); tapRef.current = 0; } else tapRef.current = now;
      }
    }
    swipe.current = null;
  };
  const toggleZoom = (e) => {
    if (!lb || lb.phase !== 'open') return;
    const r = (flierRef.current || e.currentTarget).getBoundingClientRect();
    const ox = ((e.clientX - r.left) / r.width) * 100;
    const oy = ((e.clientY - r.top) / r.height) * 100;
    setZoom((z) => (z ? null : { ox, oy }));
  };

  const sans = '"Inter", -apple-system, "Helvetica Neue", Arial, sans-serif';
  const display = titleFont === 'Inter' ? sans : titleFont === 'Inter Tight' ? `"Inter Tight", ${sans}` : `"${titleFont}", "Iowan Old Style", Georgia, serif`;
  const serifish = titleFont === 'Instrument Serif' || titleFont === 'Fraunces';
  const filterCss = treatment === 'grayscale' ? 'grayscale(1) contrast(1.05)' : treatment === 'muted' ? 'saturate(0.6) contrast(0.97)' : 'none';
  const pad2 = (v) => String(v).padStart(2, '0');
  const hSize = compact ? Math.round(headingSize * 0.56) : Math.round(Math.min(headingSize, W * 0.06));
  const titleOf = (i) => titles[i] || `Image ${i + 1}`;
  const btnReset = { appearance: 'none', border: 'none', background: 'transparent', padding: 0, margin: 0, font: 'inherit', color: 'inherit', cursor: 'pointer' };
  const shown = lb && lb.phase !== 'closing';
  const uiOn = lb && lb.phase === 'open';
  const lbList = visibleList;
  const lbAt = lb ? lbList.indexOf(lb.i) : -1;

  const revealFrom = revealStyle === 'curtain'
    ? { clip: 'inset(100% 0 0 0)', tf: 'translateY(0px)', img: 'scale(1.25)' }
    : revealStyle === 'fade' ? { clip: 'inset(0 0 0 0)', tf: 'translateY(0px)', img: 'scale(1.04)' }
      : { clip: 'inset(0 0 0 0)', tf: 'translateY(48px)', img: 'scale(1.16)' };

  if (!N) {
    return (
      <section className="masonry-lightbox" style={{ width: '100%', minHeight: 420, background: bg, color: muted, display: 'grid', placeItems: 'center', fontFamily: sans, fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
        Add image URLs to begin
      </section>
    );
  }

  return (
    <section
      ref={rootRef}
      className={`masonry-lightbox ${uid}`}
      aria-label={heading || 'Gallery'}
      onKeyDown={onKey}
      style={{ position: 'relative', width: '100%', background: bg, color: text, fontFamily: sans, boxSizing: 'border-box', padding: `${compact ? 40 : Math.round(pad * 1.3)}px ${pad}px ${pad * 1.5}px` }}
    >
      <style>{`
        .${uid} button:focus-visible, .${uid} [tabindex]:focus-visible { outline: 2px solid ${text}; outline-offset: 3px; }
        .${uid} .${uid}-cap { opacity: 0; transform: translateY(8px); transition: opacity .45s ${ease}, transform .6s ${ease}; }
        .${uid} .${uid}-tile:hover .${uid}-cap, .${uid} .${uid}-tile:focus-visible .${uid}-cap { opacity: 1; transform: none; }
        .${uid} .${uid}-tile img.${uid}-im { transition: transform 1.2s ${ease}, filter .6s; }
        .${uid} .${uid}-tile:hover img.${uid}-im { transform: scale(1.035) !important; }
        .${uid} .${uid}-chip { transition: color .4s ${ease}; }
        .${uid} .${uid}-chips::-webkit-scrollbar { display: none; }
        .${uid} .${uid}-nav { transition: background .3s, transform .3s ${ease}; }
        .${uid} .${uid}-nav:hover { background: ${text}0F; }
        @keyframes ${uid}-fade { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        @keyframes ${uid}-rise { from { transform: translateY(105%); } to { transform: none; } }
        @keyframes ${uid}-inR { from { transform: translateX(14%) scale(.96); opacity: 0; } to { transform: none; opacity: 1; } }
        @keyframes ${uid}-inL { from { transform: translateX(-14%) scale(.96); opacity: 0; } to { transform: none; opacity: 1; } }
        @keyframes ${uid}-outL { from { transform: translateX(var(--dx, 0px)); opacity: 1; } to { transform: translateX(calc(var(--dx, 0px) - 18%)) scale(.94); opacity: 0; } }
        @keyframes ${uid}-outR { from { transform: translateX(var(--dx, 0px)); opacity: 1; } to { transform: translateX(calc(var(--dx, 0px) + 18%)) scale(.94); opacity: 0; } }
        @media (prefers-reduced-motion: reduce) { .${uid} * { animation: none !important; transition: none !important; } }
      `}</style>

      <header style={{ display: 'flex', flexDirection: compact ? 'column' : 'row', justifyContent: 'space-between', alignItems: compact ? 'stretch' : 'flex-end', gap: compact ? 20 : 40, marginBottom: compact ? 24 : Math.round(pad * 0.9) }}>
        <div style={{ maxWidth: 720, minWidth: 0 }}>
          {eyebrow && <div style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: muted, marginBottom: compact ? 14 : 20, animation: reduced ? 'none' : `${uid}-fade 800ms ${ease} both` }}>{eyebrow}</div>}
          {heading && (
            <div style={{ overflow: 'hidden', paddingBottom: '0.08em', marginBottom: '-0.08em' }}>
              <h2 style={{ margin: 0, fontFamily: display, fontWeight: titleWeight, fontSize: hSize, lineHeight: 0.98, letterSpacing: serifish ? '-0.02em' : '-0.045em', animation: reduced ? 'none' : `${uid}-rise 1000ms ${ease} 80ms both` }}>{heading}</h2>
            </div>
          )}
          {intro && <p style={{ margin: `${compact ? 14 : 20}px 0 0`, maxWidth: 480, fontSize: compact ? 14 : 15, lineHeight: 1.6, fontWeight: 300, color: muted, animation: reduced ? 'none' : `${uid}-fade 900ms ${ease} 200ms both` }}>{intro}</p>}
        </div>
        {showFilters && allTags.length > 0 && (
          <div ref={chipRowRef} className={`${uid}-chips`} role="toolbar" aria-label="Filter images" style={{ position: 'relative', display: 'flex', gap: 4, flexShrink: 0, overflowX: compact ? 'auto' : 'visible', scrollbarWidth: 'none', padding: 4, margin: -4, animation: reduced ? 'none' : `${uid}-fade 900ms ${ease} 300ms both` }}>
            {pill && (
              <span aria-hidden="true" style={{ position: 'absolute', left: 0, top: pill.y, width: pill.w, height: pill.h, borderRadius: 999, background: chipBg, transform: `translateX(${pill.x}px)`, transition: ready && !reduced ? `transform 650ms ${ease}, width 650ms ${ease}` : 'none' }} />
            )}
            {['*', ...allTags].map((t, k) => {
              const on = filter === t;
              const count = t === '*' ? N : images.filter((_, i) => tagsOf(i).includes(t)).length;
              return (
                <button key={k} ref={(el) => { chipRefs.current[k] = el; }} className={`${uid}-chip`} aria-pressed={on} onClick={() => setFilter(t)}
                  style={{ ...btnReset, position: 'relative', zIndex: 1, padding: '9px 16px', borderRadius: 999, fontSize: 13, letterSpacing: '0.01em', whiteSpace: 'nowrap', color: on ? chipText : text, border: on ? '1px solid transparent' : `1px solid ${text}1F` }}>
                  {t === '*' ? allLabel : t}
                  <sup style={{ fontSize: 9, marginLeft: 4, opacity: 0.6, fontVariantNumeric: 'tabular-nums' }}>{count}</sup>
                </button>
              );
            })}
          </div>
        )}
      </header>

      <div ref={gridRef} style={{ position: 'relative', height: layout.height, transition: ready && !reduced ? `height 800ms ${ease}` : 'none' }}>
        {images.map((src, i) => {
          const p = layout.pos[i] || lastPos.current[i] || { x: 0, y: 0, h: colW / ratios[i], order: 0 };
          const vis = !!layout.pos[i];
          const rv = revealed[i];
          const instant = rv && rv.instant;
          const hiddenForLb = lb && lb.i === i;
          return (
            <div
              key={i}
              ref={(el) => { itemRefs.current[i] = el; }}
              data-i={i}
              style={{
                position: 'absolute', left: 0, top: 0, width: colW, height: p.h,
                transform: `translate(${p.x.toFixed(2)}px, ${p.y.toFixed(2)}px) scale(${vis ? 1 : 0.9})`,
                opacity: vis ? 1 : 0, pointerEvents: vis ? 'auto' : 'none', visibility: hiddenForLb ? 'hidden' : 'visible',
                transition: ready && !reduced ? `transform 900ms ${ease} ${vis ? Math.min(320, p.order * 22) : 0}ms, opacity ${vis ? 600 : 380}ms ${ease} ${vis ? Math.min(320, p.order * 22) + 120 : 0}ms, width 600ms ${ease}, height 600ms ${ease}` : 'none',
                zIndex: vis ? 1 : 0
              }}
            >
              <div style={{
                width: '100%', height: '100%',
                transform: rv ? 'none' : revealFrom.tf, opacity: rv ? 1 : (revealStyle === 'curtain' ? 1 : 0),
                clipPath: rv ? 'inset(0 0 0 0)' : revealFrom.clip, WebkitClipPath: rv ? 'inset(0 0 0 0)' : revealFrom.clip,
                transition: instant || reduced ? 'none' : `transform 1100ms ${ease} ${rv ? rv.d : 0}ms, opacity 900ms ${ease} ${rv ? rv.d : 0}ms, clip-path 1100ms ${ease2} ${rv ? rv.d : 0}ms`
              }}>
                <button
                  ref={(el) => { btnRefs.current[i] = el; }}
                  className={`${uid}-tile`}
                  tabIndex={vis ? 0 : -1}
                  aria-label={`Open ${titleOf(i)}${captions[i] ? ', ' + captions[i] : ''}`}
                  aria-expanded={!!(lb && lb.i === i)}
                  onClick={() => openAt(i)}
                  style={{ ...btnReset, position: 'relative', display: 'block', width: '100%', height: '100%', overflow: 'hidden', borderRadius: radius, background: ph, cursor: 'zoom-in' }}
                >
                  <img
                    className={`${uid}-im`}
                    src={src}
                    alt={titleOf(i)}
                    draggable="false"
                    onLoad={(e) => { if (!parseRatio(src) && e.currentTarget.naturalWidth) { const r = e.currentTarget.naturalWidth / e.currentTarget.naturalHeight; setLoadedRatio((m) => (m[i] ? m : { ...m, [i]: r })); } }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: filterCss, transform: rv ? 'scale(1)' : revealFrom.img, transition: instant || reduced ? 'none' : `transform 1400ms ${ease} ${rv ? rv.d : 0}ms` }}
                  />
                  {hoverCaptions && (
                    <span aria-hidden="true" className={`${uid}-cap`} style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: compact ? '28px 12px 12px' : '40px 16px 14px', background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%)', color: '#FAFAF9', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 8 }}>
                      <span style={{ fontFamily: display, fontSize: compact ? 18 : 22, lineHeight: 1.05, fontWeight: titleWeight }}>{titleOf(i)}</span>
                      <span style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', opacity: 0.85, whiteSpace: 'nowrap' }}>{tagsOf(i)[0] || ''}</span>
                    </span>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {lb && (
        <div
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${titleOf(lb.i)} — image ${lbAt + 1} of ${lbList.length}`}
          tabIndex={-1}
          style={{ position: 'absolute', left: 0, width: '100%', top: vp.top, height: vp.h, zIndex: 40, outline: 'none' }}
        >
          <div
            onClick={() => (lb.phase === 'closing' ? reopen() : close())}
            style={{ position: 'absolute', inset: 0, background: `${backdrop}D9`, opacity: shown ? 1 : 0, backdropFilter: `blur(${shown ? blurPx : 0}px)`, WebkitBackdropFilter: `blur(${shown ? blurPx : 0}px)`, transition: reduced ? 'none' : `opacity ${shown ? flyDur : Math.round(flyDur * 0.9)}ms ${shown ? ease : ease2}, backdrop-filter ${flyDur}ms ${shown ? ease : ease2}, -webkit-backdrop-filter ${flyDur}ms ${shown ? ease : ease2}` }}
          />

          {ghost && (
            <div key={`g${ghost.k}`} aria-hidden="true" style={{ position: 'absolute', left: ghost.rect.left, top: ghost.rect.top, width: ghost.rect.w, height: ghost.rect.h, '--dx': `${ghost.dx || 0}px`, animation: reduced ? 'none' : `${uid}-${ghost.dir > 0 ? 'outL' : 'outR'} 560ms ${ease} both`, pointerEvents: 'none' }}>
              <div style={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: radius }}>
                <img src={images[ghost.i]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: filterCss }} />
              </div>
            </div>
          )}

          {(() => {
            const r = targetRect(lb.i, vp.h);
            return (
              <div key={`f${lb.i}`} ref={flierRef} style={{ position: 'absolute', left: r.left, top: r.top, width: r.w, height: r.h, transformOrigin: '50% 50%', willChange: 'transform', zIndex: 2 }}>
                <div style={{ width: '100%', height: '100%', animation: lb.dir && !reduced ? `${uid}-${lb.dir > 0 ? 'inR' : 'inL'} 700ms ${ease} both` : 'none' }}>
                  <div
                    ref={swipeRef}
                    onPointerDown={onFlierDown}
                    onPointerMove={onFlierMove}
                    onPointerUp={onFlierUp}
                    onPointerCancel={onFlierUp}
                    onDoubleClick={toggleZoom}
                    style={{ width: '100%', height: '100%', touchAction: 'none', cursor: zoom ? 'zoom-out' : 'grab' }}
                  >
                    <div style={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: radius, boxShadow: shown ? '0 40px 100px -30px rgba(28,25,23,0.45)' : 'none', transition: 'box-shadow 600ms' }}>
                      <img src={images[lb.i]} alt={`${titleOf(lb.i)}${captions[lb.i] ? ' — ' + captions[lb.i] : ''}`} draggable="false"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: filterCss, userSelect: 'none', transformOrigin: zoom ? `${zoom.ox}% ${zoom.oy}%` : '50% 50%', transform: zoom ? `scale(${zoomScale})` : 'scale(1)', transition: reduced ? 'none' : `transform 600ms ${ease}, transform-origin 400ms ease-out` }} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          <div style={{ position: 'absolute', left: compact ? 16 : 32, right: compact ? 16 : 32, top: compact ? 16 : 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: uiOn ? 1 : 0, transform: uiOn ? 'none' : 'translateY(-8px)', transition: reduced ? 'none' : `opacity ${uiOn ? 500 : 160}ms ${ease}, transform ${uiOn ? 700 : 160}ms ${ease}`, pointerEvents: uiOn ? 'auto' : 'none', zIndex: 3 }}>
            <span style={{ fontSize: 12, letterSpacing: '0.16em', fontVariantNumeric: 'tabular-nums', color: text }} aria-live="polite">{pad2(lbAt + 1)}<span style={{ color: muted }}> / {pad2(lbList.length)}</span></span>
            <button onClick={close} aria-label="Close lightbox" style={{ ...btnReset, height: 40, padding: '0 16px', borderRadius: 999, border: `1px solid ${text}26`, background: `${bg}AA`, fontSize: 12, letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: 10 }}>
              Close
              <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M1 1l8 8M9 1 1 9" stroke="currentColor" strokeWidth="1.2" fill="none" /></svg>
            </button>
          </div>

          {lbList.length > 1 && !compact && [-1, 1].map((d) => (
            <button key={d} className={`${uid}-nav`} onClick={() => nav(d)} aria-label={d < 0 ? 'Previous image' : 'Next image'}
              style={{ ...btnReset, position: 'absolute', top: '50%', [d < 0 ? 'left' : 'right']: 20, width: 48, height: 48, marginTop: -24, borderRadius: '50%', border: `1px solid ${text}26`, display: 'grid', placeItems: 'center', opacity: uiOn ? 1 : 0, pointerEvents: uiOn ? 'auto' : 'none', transitionProperty: 'opacity, background, transform', transitionDuration: uiOn ? '500ms' : '160ms', zIndex: 3 }}>
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" style={{ transform: d < 0 ? 'scaleX(-1)' : 'none' }}><path d="M2 8h12M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.2" /></svg>
            </button>
          ))}

          <div style={{ position: 'absolute', left: compact ? 16 : 32, right: compact ? 16 : 32, bottom: compact ? 20 : 28, display: 'flex', flexDirection: compact ? 'column' : 'row', justifyContent: 'space-between', alignItems: compact ? 'flex-start' : 'flex-end', gap: compact ? 6 : 24, opacity: uiOn ? 1 : 0, transition: reduced ? 'none' : `opacity ${uiOn ? 500 : 160}ms ${ease}`, pointerEvents: 'none', zIndex: 3 }}>
            <div key={`t${lb.i}`} style={{ minWidth: 0 }}>
              <div style={{ overflow: 'hidden', paddingBottom: '0.08em' }}>
                <div style={{ fontFamily: display, fontWeight: titleWeight, fontSize: compact ? 26 : 34, lineHeight: 1.05, letterSpacing: serifish ? '-0.01em' : '-0.03em', animation: reduced || !uiOn ? 'none' : `${uid}-rise 800ms ${ease} both` }}>{titleOf(lb.i)}</div>
              </div>
              {captions[lb.i] && <div style={{ marginTop: 6, fontSize: 13, color: muted, fontWeight: 300, animation: reduced || !uiOn ? 'none' : `${uid}-fade 700ms ${ease} 80ms both` }}>{captions[lb.i]}</div>}
            </div>
            <div style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: muted, whiteSpace: 'nowrap' }}>
              {tagsOf(lb.i).join(' · ')}{!compact && <span style={{ marginLeft: 16, opacity: 0.7, textTransform: 'none', letterSpacing: '0.02em' }}>Double-click to zoom</span>}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

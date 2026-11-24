const MANIFEST = {
  "type": "Gallery.InfiniteCanvas",
  "description": "An endless, draggable field of photographs that repeats seamlessly in every direction, with inertia, rubbery smoothing, a lens that swells tiles toward the centre and dims the edges, and velocity skew. Click a tile and it lifts into a focused view with its story; Escape sets it back in its exact spot. Drifts slowly when idle",
  "editorElement": {
    "selector": ".infinite-canvas",
    "displayName": "Infinite Canvas",
    "archetype": "container",
    "data": {
      "heading": { "dataType": "text", "displayName": "Heading", "defaultValue": "Things seen, 2019 — 2026", "group": "Content" },
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "The Archive", "group": "Content" },
      "hint": { "dataType": "text", "displayName": "Hint", "defaultValue": "Drag to explore", "group": "Content" },
      "titles": { "dataType": "text", "displayName": "Titles (comma separated)", "defaultValue": "Still Water,Vertical City,Last Train,The Fall,Lone Rock,Low Tide,Morning Pour,Blue Room,Drift,Facets,Concrete Wave,Nocturne,Shoreline,Grain,Above the Cloud,Lens", "group": "Content" },
      "captions": { "dataType": "text", "displayName": "Captions (separate with |)", "defaultValue": "Lake Louise, Alberta — 06:12|Midtown, looking straight up|Shibuya line, the final departure|Skógafoss, Iceland|Reynisdrangar in the morning haze|Camber Sands, East Sussex|A slow pour-over, Kyoto|Santorini, a table and a single stem|Pacific Grove, late summer|Berlin, Friedrichstraße|Barbican, after rain|Practice room, 2 a.m.|Point Reyes, the long walk|Studio still life, 35 mm|Mt. Rainier from 11,000 feet|An old Retina, borrowed and never returned", "group": "Content" },
      "images": { "dataType": "text", "displayName": "Image URLs (comma separated)", "defaultValue": "https://picsum.photos/id/1011/900/700,https://picsum.photos/id/1031/700/900,https://picsum.photos/id/1033/900/700,https://picsum.photos/id/1035/700/900,https://picsum.photos/id/1049/900/900,https://picsum.photos/id/1055/900/700,https://picsum.photos/id/1060/700/900,https://picsum.photos/id/1068/900/700,https://picsum.photos/id/1069/700/900,https://picsum.photos/id/1076/900/900,https://picsum.photos/id/1081/700/900,https://picsum.photos/id/1082/900/700,https://picsum.photos/id/1061/900/700,https://picsum.photos/id/248/700/900,https://picsum.photos/id/1064/900/700,https://picsum.photos/id/250/900/900", "group": "Images" },
      "imageTreatment": { "dataType": "select", "displayName": "Image Treatment", "defaultValue": "none", "options": ["none", "muted", "grayscale"], "group": "Images" },
      "tileSize": { "dataType": "select", "displayName": "Tile Size", "defaultValue": "medium", "options": ["small", "medium", "large"], "group": "Layout" },
      "arrangement": { "dataType": "select", "displayName": "Arrangement", "defaultValue": "scattered", "options": ["scattered", "staggered", "grid"], "group": "Layout" },
      "density": { "dataType": "select", "displayName": "Density", "defaultValue": "balanced", "options": ["airy", "balanced", "dense"], "group": "Layout" },
      "height": { "dataType": "select", "displayName": "Height", "defaultValue": "screen", "options": ["screen", "560", "680", "800"], "group": "Layout" },
      "radius": { "dataType": "select", "displayName": "Corner Radius (px)", "defaultValue": "2", "options": ["0", "2", "6", "12"], "group": "Layout" },
      "showHud": { "dataType": "booleanValue", "displayName": "Show Heading & Hint", "defaultValue": "true", "group": "Layout" },
      "lensStrength": { "dataType": "select", "displayName": "Lens Strength", "defaultValue": "medium", "options": ["off", "subtle", "medium", "strong"], "group": "Motion" },
      "edgeDim": { "dataType": "select", "displayName": "Edge Dimming", "defaultValue": "0.6", "options": ["0", "0.35", "0.6", "0.8"], "group": "Motion" },
      "skew": { "dataType": "select", "displayName": "Velocity Skew", "defaultValue": "subtle", "options": ["off", "subtle", "strong"], "group": "Motion" },
      "inertia": { "dataType": "select", "displayName": "Inertia", "defaultValue": "medium", "options": ["low", "medium", "high"], "group": "Motion" },
      "smoothing": { "dataType": "select", "displayName": "Smoothing", "defaultValue": "0.12", "options": ["0.06", "0.12", "0.2", "1"], "group": "Motion" },
      "idleDrift": { "dataType": "booleanValue", "displayName": "Idle Drift", "defaultValue": "true", "group": "Motion" },
      "driftSpeed": { "dataType": "select", "displayName": "Drift Speed", "defaultValue": "slow", "options": ["very slow", "slow", "medium"], "group": "Motion" },
      "driftDirection": { "dataType": "select", "displayName": "Drift Direction", "defaultValue": "diagonal", "options": ["diagonal", "horizontal", "vertical"], "group": "Motion" },
      "wheelPan": { "dataType": "booleanValue", "displayName": "Pan With Wheel", "defaultValue": "false", "group": "Motion" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#0C0C0D", "group": "Colors" },
      "textColor": { "dataType": "color", "displayName": "Text", "defaultValue": "#FAFAF9", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#A8A29E", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent (focus ring)", "defaultValue": "#FAFAF9", "group": "Colors" },
      "titleFont": { "dataType": "select", "displayName": "Title Font", "defaultValue": "Instrument Serif", "options": ["Instrument Serif", "Fraunces", "Inter Tight", "Inter"], "group": "Typography" },
      "titleSize": { "dataType": "select", "displayName": "Focused Title Size (px)", "defaultValue": "56", "options": ["40", "48", "56", "64", "72"], "group": "Typography" },
      "titleWeight": { "dataType": "select", "displayName": "Title Weight", "defaultValue": "400", "options": ["300", "400", "500"], "group": "Typography" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const split = (s, sep = ',') => String(s || '').split(sep).map((x) => x.trim()).filter(Boolean);

  const heading = config?.heading ?? 'Things seen, 2019 — 2026';
  const eyebrow = config?.eyebrow ?? 'The Archive';
  const hint = config?.hint ?? 'Drag to explore';
  const titles = split(config?.titles || 'Still Water,Vertical City,Last Train,The Fall,Lone Rock,Low Tide,Morning Pour,Blue Room,Drift,Facets,Concrete Wave,Nocturne,Shoreline,Grain,Above the Cloud,Lens');
  const captions = split(config?.captions || 'Lake Louise, Alberta — 06:12|Midtown, looking straight up|Shibuya line, the final departure|Skógafoss, Iceland|Reynisdrangar in the morning haze|Camber Sands, East Sussex|A slow pour-over, Kyoto|Santorini, a table and a single stem|Pacific Grove, late summer|Berlin, Friedrichstraße|Barbican, after rain|Practice room, 2 a.m.|Point Reyes, the long walk|Studio still life, 35 mm|Mt. Rainier from 11,000 feet|An old Retina, borrowed and never returned', '|');
  const images = split(config?.images || 'https://picsum.photos/id/1011/900/700,https://picsum.photos/id/1031/700/900,https://picsum.photos/id/1033/900/700,https://picsum.photos/id/1035/700/900,https://picsum.photos/id/1049/900/900,https://picsum.photos/id/1055/900/700,https://picsum.photos/id/1060/700/900,https://picsum.photos/id/1068/900/700,https://picsum.photos/id/1069/700/900,https://picsum.photos/id/1076/900/900,https://picsum.photos/id/1081/700/900,https://picsum.photos/id/1082/900/700,https://picsum.photos/id/1061/900/700,https://picsum.photos/id/248/700/900,https://picsum.photos/id/1064/900/700,https://picsum.photos/id/250/900/900');
  const treatment = config?.imageTreatment || 'none';
  const tileSize = config?.tileSize || 'medium';
  const arrangement = config?.arrangement || 'scattered';
  const density = config?.density || 'balanced';
  const heightMode = config?.height || 'screen';
  const radius = parseInt(config?.radius ?? '2', 10) || 0;
  const showHud = bool(config?.showHud, true);
  const lens = { off: 0, subtle: 0.5, medium: 1, strong: 1.6 }[config?.lensStrength || 'medium'] ?? 1;
  const edgeDim = parseFloat(config?.edgeDim ?? '0.6');
  const skewAmt = { off: 0, subtle: 1, strong: 2.2 }[config?.skew || 'subtle'] ?? 1;
  const friction = { low: 0.88, medium: 0.935, high: 0.962 }[config?.inertia || 'medium'] || 0.935;
  const smoothing = Math.min(1, Math.max(0.02, parseFloat(config?.smoothing || '0.12') || 0.12));
  const idleDrift = bool(config?.idleDrift, true);
  const driftSpeed = { 'very slow': 0.18, slow: 0.34, medium: 0.6 }[config?.driftSpeed || 'slow'] || 0.34;
  const driftDir = config?.driftDirection || 'diagonal';
  const wheelPan = bool(config?.wheelPan, false);
  const bg = config?.backgroundColor || '#0C0C0D';
  const text = config?.textColor || '#FAFAF9';
  const muted = config?.mutedColor || '#A8A29E';
  const accent = config?.accentColor || '#FAFAF9';
  const titleFont = config?.titleFont || 'Instrument Serif';
  const titleSize = parseInt(config?.titleSize || '56', 10) || 56;
  const titleWeight = config?.titleWeight || '400';

  const n = images.length;
  const uid = React.useMemo(() => 'ic' + Math.random().toString(36).slice(2, 9), []);
  const reduced = React.useMemo(() => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  const rootRef = React.useRef(null);
  const tileRefs = React.useRef([]);
  const flierRef = React.useRef(null);
  const st = React.useRef({ x: 0, y: 0, tx: 0, ty: 0, vx: 0, vy: 0, sk: 0, sky: 0, drag: null, lastInput: -1e9, start: 0, frozen: false, hidden: -1, geo: [], drift: 0, visible: true });
  const [width, setWidth] = React.useState(1280);
  const [stageH, setStageH] = React.useState(760);
  const [focus, setFocus] = React.useState(null);
  const [phase, setPhase] = React.useState('closed');
  const [grabbing, setGrabbing] = React.useState(false);

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

  const compact = width < 700;
  const H = heightMode === 'screen' ? Math.max(compact ? 620 : 540, stageH) : parseInt(heightMode, 10) || 680;
  const sizeK = { small: 0.19, medium: 0.235, large: 0.29 }[tileSize] || 0.235;
  const cellW = Math.round(compact ? Math.max(150, width * (sizeK * 2.1)) : Math.max(210, Math.min(420, width * sizeK)));
  const cellH = Math.round(cellW * 1.08);
  const C = 4;
  const R = 4;
  const nc = C * Math.ceil((Math.ceil(width / cellW) + 2) / C);
  const nr = R * Math.ceil((Math.ceil(H / cellH) + 2) / R);
  const fill = { airy: 0.62, balanced: 0.74, dense: 0.86 }[density] || 0.74;

  // deterministic per-pattern-cell shape: aspect from a fixed sequence, size and jitter from a hash
  const pattern = React.useMemo(() => {
    const hash = (i, k) => { const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return x - Math.floor(x); };
    const aspects = [1.3, 0.78, 1, 0.8, 1.33, 0.75, 1.25, 1, 0.8, 1.3, 0.75, 1.2, 1.33, 0.8, 1, 0.78];
    return Array.from({ length: C * R }, (_, p) => {
      const a = arrangement === 'grid' ? 1 : aspects[p % aspects.length];
      const sf = arrangement === 'grid' ? fill : fill * (0.82 + hash(p, 1) * 0.3);
      let w = cellW * sf;
      let h = w / a;
      if (h > cellH * fill * 1.12) { h = cellH * fill * 1.12; w = h * a; }
      const jx = arrangement === 'scattered' ? (hash(p, 2) - 0.5) * cellW * (1 - sf) * 0.9 : 0;
      const jy = arrangement === 'scattered' ? (hash(p, 3) - 0.5) * cellH * (1 - h / cellH) * 0.9 : 0;
      return { w: Math.round(w), h: Math.round(h), jx, jy, img: p % Math.max(1, n) };
    });
  }, [arrangement, cellW, cellH, fill, n]);

  const nodes = React.useMemo(() => {
    const out = [];
    for (let r = 0; r < nr; r++) for (let c = 0; c < nc; c++) {
      const p = (c % C) + C * (r % R);
      out.push({ c, r, p, ...pattern[p] });
    }
    return out;
  }, [nc, nr, pattern]);

  const geoRef = React.useRef({ cellW, cellH, nc, nr, W: width, H, lens, edgeDim, skewAmt, friction, smoothing, idleDrift, driftSpeed, driftDir, stagger: arrangement !== 'grid' });
  geoRef.current = { cellW, cellH, nc, nr, W: width, H, lens, edgeDim, skewAmt, friction, smoothing, idleDrift, driftSpeed, driftDir, stagger: arrangement !== 'grid' };

  // render loop: one rAF writes every tile's transform; no React state per frame
  React.useEffect(() => {
    const s = st.current;
    if (!s.start) { s.start = performance.now(); s.x = s.tx = -cellW * 0.42; s.y = s.ty = -cellH * 0.3; }
    let raf = 0;
    const mod = (a, m) => ((a % m) + m) % m;
    const smooth = (a, b, v) => { const t = Math.min(1, Math.max(0, (v - a) / (b - a))); return t * t * (3 - 2 * t); };
    const io = typeof IntersectionObserver !== 'undefined' ? new IntersectionObserver(([e]) => { s.visible = e.isIntersecting; if (s.visible && !raf) raf = requestAnimationFrame(tick); }) : null;
    if (io && rootRef.current) io.observe(rootRef.current);
    function tick(now) {
      raf = 0;
      if (!s.visible) return;
      const g = geoRef.current;
      if (!s.drag && !s.frozen) {
        s.tx += s.vx; s.ty += s.vy;
        s.vx *= g.friction; s.vy *= g.friction;
        if (Math.abs(s.vx) < 0.01) s.vx = 0;
        if (Math.abs(s.vy) < 0.01) s.vy = 0;
        const idle = now - s.lastInput > 2600;
        s.drift += ((g.idleDrift && idle && !reduced ? 1 : 0) - s.drift) * 0.02;
        if (s.drift > 0.001) {
          const dx = g.driftDir === 'vertical' ? 0 : g.driftDir === 'horizontal' ? -1 : -0.8;
          const dy = g.driftDir === 'horizontal' ? 0 : g.driftDir === 'vertical' ? -1 : -0.55;
          s.tx += dx * g.driftSpeed * s.drift; s.ty += dy * g.driftSpeed * s.drift;
        }
      }
      const k = reduced ? 1 : g.smoothing;
      const px = s.x; const py = s.y;
      s.x += (s.tx - s.x) * k; s.y += (s.ty - s.y) * k;
      const velX = s.x - px; const velY = s.y - py;
      s.sk += (Math.max(-9, Math.min(9, -velX * 0.22 * g.skewAmt)) - s.sk) * 0.16;
      s.sky += (Math.max(-6, Math.min(6, velY * 0.12 * g.skewAmt)) - s.sky) * 0.16;
      const cx0 = g.W / 2; const cy0 = g.H / 2;
      const spanX = g.nc * g.cellW; const spanY = g.nr * g.cellH;
      const t = now - s.start;
      const geo = s.geo;
      for (let i = 0; i < nodes.length; i++) {
        const nd = nodes[i];
        const el = tileRefs.current[i];
        if (!el) continue;
        const x = mod(nd.c * g.cellW + s.x + g.cellW, spanX) - g.cellW;
        const off = g.stagger && nd.c % 2 ? g.cellH * 0.5 : 0;
        const y = mod(nd.r * g.cellH + s.y + off + g.cellH, spanY) - g.cellH;
        const cx = x + g.cellW / 2 + nd.jx; const cy = y + g.cellH / 2 + nd.jy;
        const dx = (cx - cx0) / (g.W * 0.5); const dy = (cy - cy0) / (g.H * 0.5);
        const d = Math.sqrt(dx * dx * 0.85 + dy * dy);
        const intro = reduced ? 1 : smooth(0, 1, (t - 120 - d * 260) / 760);
        const sc = (1 + 0.07 * g.lens - 0.26 * g.lens * smooth(0.15, 1.35, d)) * (0.86 + 0.14 * intro);
        const op = (1 - g.edgeDim * smooth(0.35, 1.3, d)) * intro;
        el.style.transform = `translate3d(${(cx - nd.w / 2).toFixed(2)}px, ${(cy - nd.h / 2).toFixed(2)}px, 0) scale(${sc.toFixed(4)}) skew(${s.sk.toFixed(2)}deg, ${s.sky.toFixed(2)}deg)`;
        el.style.opacity = s.hidden === i ? '0' : op.toFixed(3);
        geo[i] = { cx, cy, w: nd.w * sc, h: nd.h * sc };
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); if (io) io.disconnect(); };
  }, [nodes, reduced, cellW, cellH]);

  const toLocal = (e) => {
    const el = rootRef.current;
    const r = el.getBoundingClientRect();
    const k = r.width / (el.offsetWidth || r.width) || 1;
    return { x: (e.clientX - r.left) / k, y: (e.clientY - r.top) / k };
  };

  const hitTest = (p) => {
    const geo = st.current.geo;
    let best = -1; let bestD = Infinity;
    for (let i = 0; i < geo.length; i++) {
      const gg = geo[i];
      if (!gg) continue;
      if (Math.abs(p.x - gg.cx) <= gg.w / 2 && Math.abs(p.y - gg.cy) <= gg.h / 2) {
        const d = Math.hypot(p.x - gg.cx, p.y - gg.cy);
        if (d < bestD) { bestD = d; best = i; }
      }
    }
    return best;
  };

  const nearestCentre = () => {
    const geo = st.current.geo;
    let best = -1; let bestD = Infinity;
    geo.forEach((gg, i) => { if (!gg) return; const d = Math.hypot(gg.cx - width / 2, gg.cy - H / 2); if (d < bestD) { bestD = d; best = i; } });
    return best;
  };

  const ease = 'cubic-bezier(.22,1,.36,1)';
  const flipDur = reduced ? 0 : 950;

  const targetRect = (nd) => {
    const maxW = compact ? width - 40 : width * 0.5;
    const maxH = H * (compact ? 0.52 : 0.6);
    const a = nd.w / nd.h;
    let w = maxW; let h = w / a;
    if (h > maxH) { h = maxH; w = h * a; }
    return { cx: width / 2, cy: H * (compact ? 0.42 : 0.43), w, h };
  };

  const openTile = (i) => {
    if (i < 0) return;
    const s = st.current;
    s.frozen = true; s.tx = s.x; s.ty = s.y; s.vx = 0; s.vy = 0;
    const nd = nodes[i];
    const from = s.geo[i];
    const to = targetRect(nd);
    s.hidden = i;
    setFocus({ i, nd, from, to, img: nd.img });
    setPhase('opening');
  };

  const invert = (f) => {
    if (!f || !f.from) return 'none';
    const k = f.from.w / f.to.w;
    return `translate(${(f.from.cx - f.to.cx).toFixed(2)}px, ${(f.from.cy - f.to.cy).toFixed(2)}px) scale(${k.toFixed(4)})`;
  };

  React.useLayoutEffect(() => {
    const el = flierRef.current;
    if (!el || !focus) return;
    if (phase === 'opening') {
      el.style.transition = 'none';
      el.style.transform = invert(focus);
      void el.offsetWidth;
      el.style.transition = `transform ${flipDur}ms ${ease}`;
      el.style.transform = 'none';
      const t = setTimeout(() => setPhase((p) => (p === 'opening' ? 'open' : p)), flipDur);
      return () => clearTimeout(t);
    }
    if (phase === 'closing') {
      const f = { ...focus, from: st.current.geo[focus.i] || focus.from };
      el.style.transition = `transform ${Math.round(flipDur * 0.85)}ms cubic-bezier(.65,0,.35,1)`;
      el.style.transform = invert(f);
      const t = setTimeout(() => {
        st.current.hidden = -1;
        st.current.frozen = false;
        st.current.lastInput = performance.now();
        setFocus(null);
        setPhase('closed');
      }, Math.round(flipDur * 0.85) + 20);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [phase, focus]); // eslint-disable-line react-hooks/exhaustive-deps

  const close = () => { if (focus && phase !== 'closing') setPhase('closing'); };
  const reopen = () => {
    const el = flierRef.current;
    if (!el || phase !== 'closing') return;
    el.style.transition = `transform ${flipDur}ms ${ease}`;
    el.style.transform = 'none';
    setPhase('open');
  };

  const onPointerDown = (e) => {
    if (focus) return;
    if (e.button !== undefined && e.button !== 0) return;
    const s = st.current;
    const p = toLocal(e);
    s.drag = { x: p.x, y: p.y, sx: p.x, sy: p.y, t: performance.now(), moved: 0, samples: [] };
    s.vx = 0; s.vy = 0;
    s.lastInput = performance.now();
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch (err) { /* noop */ }
    setGrabbing(true);
  };
  const onPointerMove = (e) => {
    const s = st.current;
    if (!s.drag) return;
    const p = toLocal(e);
    const dx = p.x - s.drag.x; const dy = p.y - s.drag.y;
    s.drag.x = p.x; s.drag.y = p.y;
    s.drag.moved = Math.max(s.drag.moved, Math.hypot(p.x - s.drag.sx, p.y - s.drag.sy));
    s.tx += dx; s.ty += dy;
    const now = performance.now();
    s.drag.samples.push({ dx, dy, t: now });
    while (s.drag.samples.length && now - s.drag.samples[0].t > 90) s.drag.samples.shift();
    s.lastInput = now;
  };
  const onPointerUp = (e) => {
    const s = st.current;
    const d = s.drag;
    if (!d) return;
    s.drag = null;
    setGrabbing(false);
    s.lastInput = performance.now();
    if (d.moved < 6 && performance.now() - d.t < 600) {
      openTile(hitTest(toLocal(e)));
      return;
    }
    const now = performance.now();
    const sm = d.samples.filter((q) => now - q.t < 90);
    if (sm.length > 1) {
      const span = Math.max(48, now - sm[0].t);
      const sx = sm.reduce((a, q) => a + q.dx, 0); const sy = sm.reduce((a, q) => a + q.dy, 0);
      const cap = 42;
      s.vx = Math.max(-cap, Math.min(cap, (sx / span) * 16 * 0.9));
      s.vy = Math.max(-cap, Math.min(cap, (sy / span) * 16 * 0.9));
    }
  };

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el || !wheelPan) return undefined;
    const onWheel = (e) => {
      if (st.current.frozen) return;
      e.preventDefault();
      st.current.tx -= e.deltaX * 0.8; st.current.ty -= e.deltaY * 0.8;
      st.current.lastInput = performance.now();
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [wheelPan]);

  const onKey = (e) => {
    const s = st.current;
    if (focus) {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (phase === 'closing') reopen(); else close(); }
      return;
    }
    const step = cellW * 0.9;
    const moves = { ArrowLeft: [step, 0], ArrowRight: [-step, 0], ArrowUp: [0, step], ArrowDown: [0, -step] };
    if (moves[e.key]) { e.preventDefault(); s.tx += moves[e.key][0]; s.ty += moves[e.key][1]; s.lastInput = performance.now(); }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openTile(nearestCentre()); }
  };

  const sans = '"Inter", -apple-system, "Helvetica Neue", Arial, sans-serif';
  const display = titleFont === 'Inter' ? sans : titleFont === 'Inter Tight' ? `"Inter Tight", ${sans}` : `"${titleFont}", "Iowan Old Style", Georgia, serif`;
  const serifish = titleFont === 'Instrument Serif' || titleFont === 'Fraunces';
  const filterCss = treatment === 'grayscale' ? 'grayscale(1) contrast(1.05)' : treatment === 'muted' ? 'saturate(0.6) contrast(0.97)' : 'none';
  const pad = compact ? 20 : 40;
  const pad2 = (v) => String(v).padStart(2, '0');
  const opened = phase === 'opening' || phase === 'open';
  const fTitle = focus ? (titles[focus.img] || `Frame ${focus.img + 1}`) : '';
  const fCap = focus ? (captions[focus.img] || '') : '';
  const fSize = compact ? Math.round(titleSize * 0.62) : titleSize;

  const hintEl = (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: compact ? '8px 12px' : '10px 16px', borderRadius: 999, background: `${bg}99`, border: `1px solid ${text}22`, backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', fontSize: 12, letterSpacing: '0.04em', color: text, whiteSpace: 'nowrap', animation: reduced ? 'none' : `${uid}-fade 900ms ${ease} 450ms both` }}>
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M7 1v12M1 7h12M7 1 5 3M7 1l2 2M7 13l-2-2M7 13l2-2M1 7l2-2M1 7l2 2M13 7l-2-2M13 7l-2 2" fill="none" stroke="currentColor" strokeWidth="1" /></svg>
              {hint}
            </div>
  );

  if (!n) {
    return (
      <section className="infinite-canvas" style={{ width: '100%', height: 480, background: bg, color: muted, display: 'grid', placeItems: 'center', fontFamily: sans, fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
        Add image URLs to begin
      </section>
    );
  }

  return (
    <section
      ref={rootRef}
      className={`infinite-canvas ${uid}`}
      tabIndex={0}
      role="region"
      aria-roledescription="draggable gallery"
      aria-label={`${heading || 'Gallery'}. Drag or use arrow keys to pan, Enter to open the centred image, Escape to close.`}
      onKeyDown={onKey}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      style={{ position: 'relative', width: '100%', height: H, overflow: 'hidden', background: bg, color: text, fontFamily: sans, touchAction: 'none', userSelect: 'none', outline: 'none', cursor: focus ? 'default' : grabbing ? 'grabbing' : 'grab' }}
    >
      <style>{`
        .${uid}:focus-visible { box-shadow: inset 0 0 0 2px ${accent}; }
        .${uid} button:focus-visible { outline: 2px solid ${accent}; outline-offset: 3px; }
        @keyframes ${uid}-rise { from { transform: translateY(105%); } to { transform: none; } }
        @keyframes ${uid}-fade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: reduce) { .${uid} * { animation: none !important; transition: none !important; } }
      `}</style>

      <div aria-hidden={focus ? 'true' : undefined} style={{ position: 'absolute', inset: 0 }}>
        {nodes.map((nd, i) => (
          <div
            key={i}
            ref={(el) => { tileRefs.current[i] = el; }}
            style={{ position: 'absolute', left: 0, top: 0, width: nd.w, height: nd.h, transformOrigin: '50% 50%', willChange: 'transform, opacity', borderRadius: radius, overflow: 'hidden', background: '#1c1917', opacity: 0 }}
          >
            <img src={images[nd.img]} alt={nd.c < C && nd.r < R ? (titles[nd.img] || `Image ${nd.img + 1}`) : ''} draggable="false" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none', filter: filterCss }} />
          </div>
        ))}
      </div>

      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: `radial-gradient(ellipse 75% 70% at 50% 50%, ${bg}00 55%, ${bg}B3 100%)` }} />

      {showHud && (
        <div style={{ position: 'absolute', left: pad, right: pad, bottom: pad, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16, pointerEvents: 'none', opacity: focus ? 0 : 1, transition: `opacity ${reduced ? 0 : 500}ms ${ease}` }}>
          <div style={{ animation: reduced ? 'none' : `${uid}-fade 900ms ${ease} 300ms both` }}>
            {eyebrow && <div style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: muted, marginBottom: 10 }}>{eyebrow}</div>}
            {heading && <h2 style={{ margin: 0, fontFamily: display, fontWeight: titleWeight, fontSize: compact ? 24 : 40, lineHeight: 1.05, letterSpacing: serifish ? '-0.01em' : '-0.035em', textShadow: `0 1px 24px ${bg}` }}>{heading}</h2>}
          </div>
          {hint && !compact && hintEl}
        </div>
      )}

      {showHud && hint && compact && (
        <div style={{ position: 'absolute', top: pad, right: pad, pointerEvents: 'none', opacity: focus ? 0 : 1, transition: `opacity ${reduced ? 0 : 500}ms ${ease}` }}>{hintEl}</div>
      )}

      {focus && (
        <div style={{ position: 'absolute', inset: 0 }}>
          <div
            onClick={() => (phase === 'closing' ? reopen() : close())}
            style={{ position: 'absolute', inset: 0, background: `${bg}E0`, backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', opacity: opened ? 1 : 0, transition: `opacity ${phase === 'closing' ? Math.round(flipDur * 0.7) : flipDur}ms ${ease}`, cursor: 'zoom-out' }}
          />
          <div
            ref={flierRef}
            role="dialog"
            aria-modal="true"
            aria-label={fTitle}
            onClick={() => (phase === 'closing' ? reopen() : close())}
            style={{ position: 'absolute', left: focus.to.cx - focus.to.w / 2, top: focus.to.cy - focus.to.h / 2, width: focus.to.w, height: focus.to.h, transformOrigin: '50% 50%', borderRadius: radius, overflow: 'hidden', boxShadow: opened ? '0 40px 120px rgba(0,0,0,0.55)' : '0 0 0 rgba(0,0,0,0)', transition: 'box-shadow 600ms', cursor: 'zoom-out', willChange: 'transform' }}
          >
            <img src={images[focus.img]} alt={fCap ? `${fTitle} — ${fCap}` : fTitle} draggable="false" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: filterCss }} />
          </div>
          <div style={{ position: 'absolute', left: pad, right: pad, top: focus.to.cy + focus.to.h / 2 + (compact ? 20 : 28), textAlign: 'center', pointerEvents: 'none', opacity: phase === 'closing' ? 0 : 1, transition: `opacity ${reduced ? 0 : 260}ms ease` }}>
            <div style={{ fontSize: 11, letterSpacing: '0.18em', color: muted, marginBottom: 12, fontVariantNumeric: 'tabular-nums', animation: reduced ? 'none' : `${uid}-fade 700ms ${ease} 420ms both` }}>{pad2(focus.img + 1)} / {pad2(n)}</div>
            <div style={{ overflow: 'hidden', paddingBottom: '0.08em' }}>
              <h3 style={{ margin: 0, fontFamily: display, fontWeight: titleWeight, fontSize: fSize, lineHeight: 1, letterSpacing: serifish ? '-0.01em' : '-0.035em', animation: reduced ? 'none' : `${uid}-rise 900ms ${ease} 360ms both` }}>{fTitle}</h3>
            </div>
            {fCap && <p style={{ margin: '12px 0 0', fontSize: compact ? 13 : 15, fontWeight: 300, color: muted, animation: reduced ? 'none' : `${uid}-fade 800ms ${ease} 560ms both` }}>{fCap}</p>}
          </div>
          <button
            onClick={close}
            aria-label="Close focused image"
            style={{ appearance: 'none', position: 'absolute', top: pad - 8, right: pad - 8, width: 44, height: 44, borderRadius: '50%', border: `1px solid ${text}33`, background: `${bg}80`, color: text, cursor: 'pointer', display: 'grid', placeItems: 'center', opacity: phase === 'closing' ? 0 : 1, transition: `opacity ${reduced ? 0 : 300}ms`, animation: reduced ? 'none' : `${uid}-fade 600ms ${ease} 500ms both` }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M2 2l10 10M12 2 2 12" stroke="currentColor" strokeWidth="1.25" fill="none" /></svg>
          </button>
        </div>
      )}
    </section>
  );
}

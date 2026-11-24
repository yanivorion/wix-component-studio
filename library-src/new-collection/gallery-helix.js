const MANIFEST = {
  "type": "Gallery.Helix",
  "description": "A double helix of image tiles in true CSS 3D, joined by hairline base pairs: drag or scroll to spin it with inertia, the front-most tile comes into focus while the rest fall back in depth, and a click flies a tile forward into a captioned detail view",
  "editorElement": {
    "selector": ".helix-gallery",
    "displayName": "Helix Gallery",
    "archetype": "container",
    "data": {
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Archive / Sequence 12", "group": "Content" },
      "title": { "dataType": "text", "displayName": "Title", "defaultValue": "Two strands, one memory", "group": "Content" },
      "description": { "dataType": "text", "displayName": "Description", "defaultValue": "Twelve images coiled into a double helix. Drag or scroll to turn it; select a frame to bring it forward.", "group": "Content" },
      "images": { "dataType": "text", "displayName": "Image URLs (comma separated)", "defaultValue": "https://picsum.photos/seed/strata/1200/900,https://picsum.photos/seed/nebula/1200/900,https://picsum.photos/seed/canopy/1200/900,https://picsum.photos/seed/marrow/1200/900,https://picsum.photos/seed/aurora/1200/900,https://picsum.photos/seed/lattice/1200/900,https://picsum.photos/seed/drift/1200/900,https://picsum.photos/seed/ember/1200/900,https://picsum.photos/seed/sierra/1200/900,https://picsum.photos/seed/cobalt/1200/900,https://picsum.photos/seed/vessel/1200/900,https://picsum.photos/seed/prism/1200/900", "group": "Images" },
      "captions": { "dataType": "text", "displayName": "Captions (separate with |)", "defaultValue": "Strata, cut by water|Night above the ridge|Canopy, looking up|Bone white|Northern light|Lattice of steel|Drift ice|Last embers|Sierra at dusk|Cobalt hour|The vessel|Prism", "group": "Images" },
      "grayscale": { "dataType": "booleanValue", "displayName": "Black & White Images", "defaultValue": "false", "group": "Images" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#0C0C0D", "group": "Colors" },
      "inkColor": { "dataType": "color", "displayName": "Text", "defaultValue": "#FAFAF9", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#8A8A8E", "group": "Colors" },
      "strandColor": { "dataType": "color", "displayName": "Strands & Base Pairs", "defaultValue": "#D4D4D8", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Focus Accent", "defaultValue": "#E4E4E7", "group": "Colors" },
      "tileBackColor": { "dataType": "color", "displayName": "Tile Back", "defaultValue": "#18181B", "group": "Colors" },
      "titleFont": { "dataType": "select", "displayName": "Title Font", "defaultValue": "Inter", "options": ["Inter", "Fraunces", "Instrument Serif", "Georgia"], "group": "Typography" },
      "titleSize": { "dataType": "select", "displayName": "Title Size (px)", "defaultValue": "56", "options": ["40", "48", "56", "64", "72"], "group": "Typography" },
      "titleWeight": { "dataType": "select", "displayName": "Title Weight", "defaultValue": "300", "options": ["300", "400", "500"], "group": "Typography" },
      "sectionHeight": { "dataType": "select", "displayName": "Section Height", "defaultValue": "fill", "options": ["fill", "640", "720", "800", "900"], "group": "Layout", "description": "fill = height of the visible canvas" },
      "tileSize": { "dataType": "select", "displayName": "Tile Size", "defaultValue": "medium", "options": ["small", "medium", "large"], "group": "Layout" },
      "helixRadius": { "dataType": "select", "displayName": "Helix Radius", "defaultValue": "medium", "options": ["narrow", "medium", "wide"], "group": "Layout" },
      "twist": { "dataType": "select", "displayName": "Twist", "defaultValue": "classic", "options": ["gentle", "classic", "tight"], "group": "Layout" },
      "tilt": { "dataType": "select", "displayName": "Axis Tilt", "defaultValue": "subtle", "options": ["none", "subtle", "dramatic"], "group": "Layout" },
      "showBasePairs": { "dataType": "booleanValue", "displayName": "Base Pair Hairlines", "defaultValue": "true", "group": "Layout" },
      "showBackbone": { "dataType": "booleanValue", "displayName": "Backbone Dots", "defaultValue": "true", "group": "Layout" },
      "showCounter": { "dataType": "booleanValue", "displayName": "Show Counter", "defaultValue": "true", "group": "Layout" },
      "depthBlur": { "dataType": "booleanValue", "displayName": "Depth Blur", "defaultValue": "true", "group": "Animation" },
      "inertia": { "dataType": "select", "displayName": "Spin Inertia", "defaultValue": "medium", "options": ["low", "medium", "high"], "group": "Animation" },
      "wheelRotate": { "dataType": "booleanValue", "displayName": "Scroll Wheel Rotates", "defaultValue": "true", "group": "Animation", "description": "Wheel turns the helix until the first or last frame, then the page scrolls on" },
      "entrance": { "dataType": "booleanValue", "displayName": "Spin-in Entrance", "defaultValue": "true", "group": "Animation" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const eyebrow = config?.eyebrow || 'Archive / Sequence 12';
  const title = config?.title || 'Two strands, one memory';
  const description = config?.description || 'Twelve images coiled into a double helix. Drag or scroll to turn it; select a frame to bring it forward.';
  const defaultImages = 'strata,nebula,canopy,marrow,aurora,lattice,drift,ember,sierra,cobalt,vessel,prism'
    .split(',').map((s) => `https://picsum.photos/seed/${s}/1200/900`).join(',');
  const grayscale = bool(config?.grayscale, false);
  const imagesRaw = config?.images || defaultImages;
  const captionsRaw = config?.captions || 'Strata, cut by water|Night above the ridge|Canopy, looking up|Bone white|Northern light|Lattice of steel|Drift ice|Last embers|Sierra at dusk|Cobalt hour|The vessel|Prism';
  const bg = config?.backgroundColor || '#0C0C0D';
  const ink = config?.inkColor || '#FAFAF9';
  const muted = config?.mutedColor || '#8A8A8E';
  const strand = config?.strandColor || '#D4D4D8';
  const accent = config?.accentColor || '#E4E4E7';
  const tileBack = config?.tileBackColor || '#18181B';
  const titleFont = config?.titleFont || 'Inter';
  const titleSize = parseInt(config?.titleSize || '56', 10);
  const titleWeight = config?.titleWeight || '300';
  const sectionHeight = config?.sectionHeight || 'fill';
  const tileFactor = { small: 0.82, medium: 1, large: 1.18 }[config?.tileSize || 'medium'] || 1;
  const radiusFactor = { narrow: 0.78, medium: 1, wide: 1.22 }[config?.helixRadius || 'medium'] || 1;
  const twistTotal = { gentle: 220, classic: 300, tight: 420 }[config?.twist || 'classic'] || 300;
  const tiltDeg = { none: [0, 0], subtle: [-10, 7], dramatic: [-22, 12] }[config?.tilt || 'subtle'] || [-10, 7];
  const showBasePairs = bool(config?.showBasePairs, true);
  const showBackbone = bool(config?.showBackbone, true);
  const showCounter = bool(config?.showCounter, true);
  const depthBlur = bool(config?.depthBlur, true);
  const decay = { low: 0.004, medium: 0.03, high: 0.12 }[config?.inertia || 'medium'] || 0.03;
  const wheelRotate = bool(config?.wheelRotate, true);
  const entrance = bool(config?.entrance, true);

  const images = React.useMemo(() => imagesRaw.split(',').map((s) => s.trim()).filter(Boolean).map((u) => {
    if (!grayscale || !/picsum\.photos/.test(u) || /grayscale/.test(u)) return u;
    return u + (u.includes('?') ? '&grayscale' : '?grayscale');
  }), [imagesRaw, grayscale]);
  const captions = React.useMemo(() => captionsRaw.split('|').map((s) => s.trim()), [captionsRaw]);
  const n = images.length;

  const uid = React.useMemo(() => 'ghx' + Math.random().toString(36).slice(2, 8), []);
  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  React.useEffect(() => {
    const id = 'ncs-fonts-gallery-helix';
    if (document.getElementById(id)) return;
    const l = document.createElement('link');
    l.id = id;
    l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500&family=Instrument+Serif&family=IBM+Plex+Mono:wght@400;500&display=swap';
    document.head.appendChild(l);
  }, []);

  const rootRef = React.useRef(null);
  const stageRef = React.useRef(null);
  const spinRef = React.useRef(null);
  const faceRefs = React.useRef([]);
  const backRefs = React.useRef([]);
  const tileRefs = React.useRef([]);
  const closeRef = React.useRef(null);
  const [width, setWidth] = React.useState(1280);
  const [stageH, setStageH] = React.useState(800);
  React.useEffect(() => {
    const s = typeof getScrollContainer === 'function' ? getScrollContainer() : null;
    const scroller = s && s !== window && s.nodeType === 1 ? s : window;
    const el = rootRef.current;
    if (!el) return undefined;
    const measure = () => {
      setWidth(el.clientWidth || 1280);
      setStageH(scroller === window ? window.innerHeight : scroller.clientHeight || 800);
    };
    measure();
    window.addEventListener('resize', measure);
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (ro) ro.observe(el);
    return () => { window.removeEventListener('resize', measure); if (ro) ro.disconnect(); };
  }, []);

  const compact = width < 760;
  const H = sectionHeight === 'fill' ? Math.max(compact ? 680 : 600, Math.min(980, stageH)) : parseInt(sectionHeight, 10);
  const tw = Math.round((compact ? 112 : Math.min(176, H * 0.21)) * tileFactor);
  const th = Math.round(tw * 0.74);
  const R = Math.round((compact ? Math.min(width * 0.3, 118) : Math.min(250, H * 0.3)) * radiusFactor);
  const P = Math.max(1, Math.ceil(n / 2));
  const step = P > 1 ? twistTotal / P : 0;
  const pitch = P > 1 ? Math.min(th * 1.45, (H * (compact ? 0.5 : 0.64) - th) / (P - 1)) : 0;

  const tiles = React.useMemo(() => {
    const raw = [];
    for (let p = 0; p < P; p++) {
      raw.push({ strand: 0, pair: p, angle: p * step });
      raw.push({ strand: 1, pair: p, angle: p * step + 180 });
    }
    const norm = raw.map((t) => ({ ...t, a: ((t.angle % 360) + 360) % 360 }));
    norm.sort((x, y) => x.a - y.a || x.pair - y.pair);
    return norm.slice(0, n).map((t, i) => ({ ...t, i, y: (t.pair - (P - 1) / 2) * pitch }));
  }, [n, P, step, pitch]);
  const maxA = tiles.length ? tiles[tiles.length - 1].a : 0;
  const midStart = React.useMemo(() => {
    let best = 0;
    let bd = Infinity;
    tiles.forEach((t, k) => {
      const d = Math.abs(t.y) + Math.abs(t.a - maxA * 0.4) * 0.15;
      if (d < bd) { bd = d; best = k; }
    });
    return best;
  }, [tiles, maxA]);

  const [focus, setFocus] = React.useState(midStart);
  const [loaded, setLoaded] = React.useState({});
  const [detail, setDetail] = React.useState(null);
  const st = React.useRef({ rot: 0, v: 0, target: null, dragging: false, last: 0, focus: -1, inited: false, user: false, spring: 26 });
  const rafRef = React.useRef(0);

  const clampRot = (r) => Math.min(0, Math.max(-maxA, r));
  const snapFor = (r) => {
    let best = 0;
    let bd = Infinity;
    tiles.forEach((t) => { const d = Math.abs(-t.a - r); if (d < bd) { bd = d; best = -t.a; } });
    return best;
  };
  const indexFor = (r) => {
    let best = 0;
    let bd = Infinity;
    tiles.forEach((t, k) => { const d = Math.abs(-t.a - r); if (d < bd) { bd = d; best = k; } });
    return best;
  };

  const paint = () => {
    const s = st.current;
    if (spinRef.current) spinRef.current.style.transform = `rotateY(${s.rot.toFixed(3)}deg)`;
    const fi = indexFor(s.rot);
    tiles.forEach((t, k) => {
      const el = faceRefs.current[k];
      if (!el) return;
      const c = Math.cos(((t.a + s.rot) * Math.PI) / 180);
      const f = (c + 1) / 2;
      const isF = k === fi;
      const bright = isF ? 1 : 0.26 + 0.6 * Math.pow(f, 1.4);
      const blur = depthBlur && !isF ? (1 - f) * 3.2 + (f > 0.9 ? 0 : 0.6) : 0;
      el.style.filter = `brightness(${bright.toFixed(3)})${blur > 0.05 ? ` blur(${blur.toFixed(2)}px)` : ''}`;
      el.style.opacity = (0.35 + 0.65 * f).toFixed(3);
      const bk = backRefs.current[k];
      if (bk) {
        const bb = 0.12 + 0.3 * Math.pow(1 - f, 1.2);
        bk.style.filter = `brightness(${bb.toFixed(3)}) saturate(0.6)${depthBlur ? ` blur(${(1.2 + f * 2).toFixed(2)}px)` : ''}`;
      }
    });
    if (fi !== s.focus) { s.focus = fi; setFocus(fi); }
  };
  const loop = (now) => {
    const s = st.current;
    const dt = Math.min(0.05, s.last ? (now - s.last) / 1000 : 0.016);
    s.last = now;
    let active = true;
    if (!s.dragging) {
      if (s.target === null) {
        s.rot += s.v * dt;
        s.v *= Math.pow(decay, dt);
        if (s.rot > 0 || s.rot < -maxA) { s.v *= Math.pow(0.0005, dt); s.target = clampRot(s.rot); }
        if (Math.abs(s.v) < 60 && s.target === null) s.target = snapFor(clampRot(s.rot + s.v * 0.08));
      } else {
        const k = s.spring || 90;
        const c = 2 * Math.sqrt(k) * 0.92;
        const steps = 3;
        const h = dt / steps;
        for (let q = 0; q < steps; q++) {
          s.v += (-k * (s.rot - s.target) - c * s.v) * h;
          s.rot += s.v * h;
        }
        if (Math.abs(s.rot - s.target) < 0.04 && Math.abs(s.v) < 0.6) { s.rot = s.target; s.v = 0; active = false; s.spring = 0; }
      }
    }
    paint();
    if (s.dragging) active = true;
    rafRef.current = active ? requestAnimationFrame(loop) : 0;
  };
  const kick = () => { st.current.last = 0; if (!rafRef.current) rafRef.current = requestAnimationFrame(loop); };
  const goTo = (k, spring) => {
    const t = tiles[Math.max(0, Math.min(tiles.length - 1, k))];
    if (!t) return;
    const s = st.current;
    s.user = true;
    s.target = -t.a;
    s.spring = spring || 90;
    if (reduced) { s.rot = s.target; s.v = 0; paint(); return; }
    kick();
  };

  React.useEffect(() => {
    const s = st.current;
    const t = tiles[midStart];
    if (!t) return undefined;
    const final = -t.a;
    if (!s.inited) {
      s.inited = true;
      s.rot = entrance && !reduced ? final + 150 : final;
      s.v = 0;
    }
    if (!s.user) { s.target = final; s.spring = s.spring || 26; }
    else { s.rot = clampRot(s.rot); s.target = snapFor(s.rot); }
    if (reduced) { s.rot = s.target; }
    paint();
    kick();
    return undefined;
  }, [tiles]); // eslint-disable-line react-hooks/exhaustive-deps
  React.useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const scaleOf = () => {
    const el = rootRef.current;
    if (!el || !el.offsetWidth) return 1;
    return el.getBoundingClientRect().width / el.offsetWidth || 1;
  };
  const dragRef = React.useRef(null);
  const onDown = (e) => {
    if (detail || (e.button !== undefined && e.button !== 0)) return;
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch (err) { /* noop */ }
    const tileEl = e.target && e.target.closest ? e.target.closest('[data-tile]') : null;
    const s = st.current;
    s.user = true;
    s.dragging = true;
    s.target = null;
    s.v = 0;
    dragRef.current = { id: e.pointerId, x: e.clientX, sx: e.clientX, sy: e.clientY, sc: scaleOf(), samples: [{ t: performance.now(), r: s.rot }], tile: tileEl ? parseInt(tileEl.getAttribute('data-tile'), 10) : -1, moved: false };
    kick();
  };
  const onMove = (e) => {
    const d = dragRef.current;
    if (!d || d.id !== e.pointerId) return;
    const s = st.current;
    const dx = (e.clientX - d.x) / d.sc;
    d.x = e.clientX;
    if (Math.abs(e.clientX - d.sx) + Math.abs(e.clientY - d.sy) > 6) d.moved = true;
    let delta = (dx / R) * (180 / Math.PI) * 0.9;
    if (s.rot > 0 || s.rot < -maxA) delta *= 0.35;
    s.rot += delta;
    const now = performance.now();
    d.samples.push({ t: now, r: s.rot });
    while (d.samples.length > 2 && now - d.samples[0].t > 110) d.samples.shift();
  };
  const onUp = (e) => {
    const d = dragRef.current;
    if (!d || d.id !== e.pointerId) return;
    dragRef.current = null;
    const s = st.current;
    s.dragging = false;
    const a = d.samples[0];
    const b = d.samples[d.samples.length - 1];
    const dt = Math.max(16, b.t - a.t) / 1000;
    s.v = performance.now() - b.t > 90 ? 0 : Math.max(-1400, Math.min(1400, (b.r - a.r) / dt));
    s.target = null;
    if (!d.moved && d.tile >= 0) { s.v = 0; openDetail(d.tile); }
    kick();
  };

  React.useEffect(() => {
    const el = stageRef.current;
    if (!el || !wheelRotate) return undefined;
    let idle = 0;
    const onWheel = (e) => {
      if (detail) return;
      const s = st.current;
      const raw = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      const delta = (e.deltaMode === 1 ? raw * 16 : raw) * 0.22;
      const nextRot = s.rot - delta;
      if ((delta > 0 && s.rot <= -maxA + 0.5) || (delta < 0 && s.rot >= -0.5)) return;
      e.preventDefault();
      s.user = true;
      s.target = null;
      s.v = 0;
      s.dragging = true;
      s.rot = clampRot(nextRot);
      kick();
      clearTimeout(idle);
      idle = setTimeout(() => { s.dragging = false; s.target = snapFor(s.rot); s.spring = 110; kick(); }, 140);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => { el.removeEventListener('wheel', onWheel); clearTimeout(idle); };
  }, [wheelRotate, maxA, detail, tiles]); // eslint-disable-line react-hooks/exhaustive-deps

  const relRect = (el) => {
    const root = rootRef.current;
    if (!el || !root) return null;
    const a = el.getBoundingClientRect();
    const b = root.getBoundingClientRect();
    const sc = scaleOf();
    return { x: (a.left - b.left) / sc, y: (a.top - b.top) / sc, w: a.width / sc, h: a.height / sc };
  };
  const detailBox = React.useMemo(() => {
    if (compact) {
      const w = width - 40;
      return { x: 20, y: Math.max(90, H * 0.16), w, h: Math.round(w * 0.75) };
    }
    const w = Math.round(Math.min(width * 0.54, (H - 180) * (4 / 3)));
    const h = Math.round(w * 0.75);
    return { x: Math.round(width * 0.08), y: Math.round((H - h) / 2), w, h };
  }, [compact, width, H]);

  const openDetail = (k) => {
    if (k < 0 || k >= tiles.length) return;
    const from = relRect(tileRefs.current[k]);
    goTo(k, 70);
    if (reduced || !from) { setDetail({ k, stage: 'in', from: null }); return; }
    setDetail({ k, stage: 'pre', from });
  };
  const closeDetail = () => {
    if (!detail) return;
    if (reduced) { setDetail(null); return; }
    const from = relRect(tileRefs.current[detail.k]);
    setDetail({ ...detail, stage: 'out', from: from || detail.from });
  };
  const detailNav = (dir) => {
    if (!detail) return;
    const k = Math.max(0, Math.min(tiles.length - 1, detail.k + dir));
    if (k === detail.k) return;
    goTo(k, 70);
    setDetail({ k, stage: 'in', from: detail.from, swap: Date.now() });
  };
  React.useEffect(() => {
    if (!detail) return undefined;
    if (detail.stage === 'pre') {
      let r2 = 0;
      const r1 = requestAnimationFrame(() => { r2 = requestAnimationFrame(() => setDetail((d) => (d && d.stage === 'pre' ? { ...d, stage: 'in' } : d))); });
      return () => { cancelAnimationFrame(r1); cancelAnimationFrame(r2); };
    }
    if (detail.stage === 'in' && closeRef.current) closeRef.current.focus({ preventScroll: true });
    if (detail.stage === 'out') {
      const t = setTimeout(() => { setDetail(null); if (rootRef.current) rootRef.current.focus({ preventScroll: true }); }, 620);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [detail]);

  const onKeyDown = (e) => {
    const k = e.key;
    if (detail) {
      if (k === 'Escape') { e.preventDefault(); closeDetail(); }
      else if (k === 'ArrowRight' || k === 'ArrowDown') { e.preventDefault(); detailNav(1); }
      else if (k === 'ArrowLeft' || k === 'ArrowUp') { e.preventDefault(); detailNav(-1); }
      return;
    }
    if (k === 'ArrowRight' || k === 'ArrowDown') { e.preventDefault(); goTo(focus + 1); }
    else if (k === 'ArrowLeft' || k === 'ArrowUp') { e.preventDefault(); goTo(focus - 1); }
    else if (k === 'Home') { e.preventDefault(); goTo(0); }
    else if (k === 'End') { e.preventDefault(); goTo(tiles.length - 1); }
    else if ((k === 'Enter' || k === ' ') && e.target === rootRef.current) { e.preventDefault(); openDetail(focus); }
  };

  const mono = '"IBM Plex Mono", ui-monospace, "SF Mono", Menlo, monospace';
  const sans = 'Inter, -apple-system, "Helvetica Neue", Arial, sans-serif';
  const serif = titleFont === 'Inter' ? sans : titleFont === 'Georgia' ? 'Georgia, serif' : `"${titleFont}", Georgia, "Times New Roman", serif`;
  const pad2 = (v) => String(v).padStart(2, '0');

  const cx = compact ? width / 2 : Math.max(width * 0.64, 460 + R + tw * 0.5);
  const cy = compact ? H * 0.53 : H * 0.5;
  const focusT = tiles[focus];
  const cap = (k) => captions[tiles[k] ? tiles[k].i : k] || '';

  const backbone = [];
  if (showBackbone && P > 1) {
    for (let s2 = 0; s2 < 2; s2++) {
      for (let p = 0; p < P - 1; p++) {
        for (let q = 1; q < 10; q++) {
          const t = q / 10;
          backbone.push({ a: p * step + t * step + s2 * 180, y: (p + t - (P - 1) / 2) * pitch, k: `${s2}-${p}-${q}` });
        }
      }
    }
  }
  const rungs = [];
  if (showBasePairs && P > 0) {
    for (let p = 0; p < P; p++) {
      rungs.push({ a: p * step, y: (p - (P - 1) / 2) * pitch, main: true, k: `m${p}` });
      if (p < P - 1) {
        for (let q = 1; q < 3; q++) {
          const t = q / 3;
          rungs.push({ a: p * step + t * step, y: (p + t - (P - 1) / 2) * pitch, main: false, k: `s${p}-${q}` });
        }
      }
    }
  }

  const iconBtn = {
    appearance: 'none', border: `1px solid ${muted}66`, background: 'transparent', color: ink, cursor: 'pointer', width: 40, height: 40,
    borderRadius: 999, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, transition: 'background 200ms, border-color 200ms'
  };

  const dStage = detail ? detail.stage : null;
  const dFrom = detail && detail.from;
  const flip = (dStage === 'pre' || dStage === 'out') && dFrom
    ? `translate(${dFrom.x - detailBox.x}px, ${dFrom.y - detailBox.y}px) scale(${dFrom.w / detailBox.w}, ${dFrom.h / detailBox.h})`
    : 'none';
  const detailT = detail ? tiles[detail.k] : null;

  return (
    <section ref={rootRef} className={`helix-gallery ${uid}`} role="region" aria-roledescription="carousel" aria-label={title} tabIndex={0} onKeyDown={onKeyDown}
      style={{ position: 'relative', width: '100%', height: `${H}px`, overflow: 'hidden', background: bg, color: ink, fontFamily: sans, outline: 'none', userSelect: 'none', WebkitUserSelect: 'none' }}>
      <style>{`
        .${uid}-b:hover { background: ${ink}14 !important; border-color: ${ink}88 !important; }
        .${uid}-b:focus-visible { outline: 2px solid ${accent}; outline-offset: 3px; }
        .${uid}:focus-visible { box-shadow: inset 0 0 0 2px ${accent}55; }
        @keyframes ${uid}-fade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
      `}</style>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse ${compact ? 80 : 40}% ${compact ? 40 : 60}% at ${(cx / width) * 100}% ${(cy / H) * 100}%, ${strand}12 0%, transparent 70%)` }} />

      <div style={{ position: 'absolute', zIndex: 5, left: compact ? 20 : 56, top: compact ? 28 : 56, width: compact ? 'calc(100% - 40px)' : Math.min(400, cx - R - tw * 0.6 - 90), pointerEvents: 'none' }}>
        <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: muted, marginBottom: compact ? 12 : 22 }}>{eyebrow}</div>
        <h2 style={{ margin: 0, fontFamily: serif, fontSize: compact ? Math.round(titleSize * 0.6) : titleSize, lineHeight: 1.02, fontWeight: titleWeight, letterSpacing: titleFont === 'Inter' ? '-0.04em' : '-0.02em', textWrap: 'balance' }}>{title}</h2>
        {!compact && <p style={{ margin: '22px 0 0', fontSize: 15, lineHeight: 1.6, color: muted, maxWidth: 330, fontWeight: 300 }}>{description}</p>}
      </div>

      {n === 0 && (
        <div style={{ position: 'absolute', left: cx - 150, top: cy - 60, width: 300, height: 120, border: `1px dashed ${muted}`, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontFamily: mono, fontSize: 12, color: muted, lineHeight: 1.6 }}>
          No images yet.<br />Add URLs, separated by commas.
        </div>
      )}

      <div ref={stageRef} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}
        style={{ position: 'absolute', inset: 0, perspective: `${Math.round(H * 2)}px`, perspectiveOrigin: `${cx}px ${cy}px`, touchAction: 'pan-y', cursor: dragRef.current ? 'grabbing' : 'grab', zIndex: 2 }}>
        <div style={{ position: 'absolute', left: cx, top: cy, width: 0, height: 0, transformStyle: 'preserve-3d', transform: `rotateZ(${tiltDeg[0] * (compact ? 0.5 : 1)}deg) rotateX(${tiltDeg[1]}deg)` }}>
          <div aria-hidden="true" style={{ position: 'absolute', left: 0, top: -((P - 1) * pitch) / 2 - th, width: 1, height: (P - 1) * pitch + th * 2, background: `linear-gradient(180deg, ${strand}00, ${strand}40 20%, ${strand}40 80%, ${strand}00)` }} />
          <div ref={spinRef} style={{ position: 'absolute', left: 0, top: 0, width: 0, height: 0, transformStyle: 'preserve-3d', willChange: 'transform' }}>
            {rungs.map((r) => (
              <div key={r.k} aria-hidden="true" style={{
                position: 'absolute', left: -R, top: 0, width: R * 2, height: 1,
                background: r.main ? `linear-gradient(90deg, ${strand}00 0%, ${strand}55 18%, ${strand}55 82%, ${strand}00 100%)` : `${strand}22`,
                transform: `translateY(${r.y}px) rotateY(${r.a - 90}deg)`
              }} />
            ))}
            {backbone.map((b) => (
              <div key={b.k} aria-hidden="true" style={{
                position: 'absolute', left: -1.5, top: -1.5, width: 3, height: 3, borderRadius: 3, background: strand, opacity: 0.85,
                transform: `translateY(${b.y}px) rotateY(${b.a}deg) translateZ(${R - 8}px)`
              }} />
            ))}
            {tiles.map((t, k) => {
              const src = images[t.i];
              const isF = k === focus;
              const hidden = detail && detail.k === k && detail.stage !== 'out';
              return (
                <div key={k} ref={(el) => { tileRefs.current[k] = el; }} data-tile={k}
                  style={{
                    position: 'absolute', left: -tw / 2, top: -th / 2, width: tw, height: th, transformStyle: 'preserve-3d',
                    transform: `translateY(${t.y}px) rotateY(${t.a}deg) translateZ(${R}px)`, cursor: 'pointer'
                  }}>
                  <div ref={(el) => { faceRefs.current[k] = el; }}
                    style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', background: '#27272A', overflow: 'hidden', borderRadius: 2, visibility: hidden ? 'hidden' : 'visible', boxShadow: isF ? `0 0 0 1px ${accent}cc, 0 30px 60px -20px rgba(0,0,0,.9)` : '0 0 0 1px rgba(255,255,255,.06)', transition: 'box-shadow 300ms ease' }}>
                    <img src={src} alt={captions[t.i] || `Image ${t.i + 1}`} draggable={false}
                      onLoad={() => setLoaded((l) => (l[k] ? l : { ...l, [k]: true }))}
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none', opacity: loaded[k] && !hidden ? 1 : 0, transition: reduced ? 'none' : 'opacity 600ms ease' }} />
                    <div style={{ position: 'absolute', left: 8, bottom: 6, fontFamily: mono, fontSize: 9, letterSpacing: '0.12em', color: 'rgba(255,255,255,.85)', textShadow: '0 1px 2px rgba(0,0,0,.6)' }}>{pad2(t.i + 1)}</div>
                  </div>
                  <div aria-hidden="true" ref={(el) => { backRefs.current[k] = el; }} style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)', background: tileBack, borderRadius: 2, overflow: 'hidden', visibility: hidden ? 'hidden' : 'visible' }}>
                    {loaded[k] && <img src={src} alt="" draggable={false} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none' }} />}
                    <div style={{ position: 'absolute', inset: 0, boxShadow: `inset 0 0 0 1px ${strand}33` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {n > 0 && (
        <div style={{ position: 'absolute', zIndex: 6, left: compact ? 20 : 56, right: compact ? 20 : 'auto', bottom: compact ? 24 : 52, display: 'flex', flexDirection: compact ? 'row' : 'column', alignItems: compact ? 'flex-end' : 'flex-start', justifyContent: 'space-between', gap: compact ? 12 : 22, pointerEvents: 'none' }}>
          <div key={focus} style={{ animation: reduced ? 'none' : `${uid}-fade 420ms ease both`, minWidth: 0 }}>
            {showCounter && (
              <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.16em', color: muted, marginBottom: 10 }}>
                <span style={{ color: ink }}>{pad2((focusT ? focusT.i : 0) + 1)}</span> / {pad2(n)} &nbsp;&middot;&nbsp; STRAND {focusT && focusT.strand ? 'B' : 'A'}
              </div>
            )}
            <div style={{ fontFamily: serif, fontSize: compact ? 22 : 30, fontWeight: 300, letterSpacing: titleFont === 'Inter' ? '-0.02em' : '-0.01em', lineHeight: 1.1, maxWidth: compact ? 210 : 360 }}>{cap(focus)}</div>
          </div>
          <div style={{ display: 'flex', gap: 8, pointerEvents: 'auto', flexShrink: 0 }}>
            <button type="button" className={`${uid}-b`} style={iconBtn} onClick={() => goTo(focus - 1)} aria-label="Previous image" disabled={focus <= 0}>&#8592;</button>
            <button type="button" className={`${uid}-b`} style={iconBtn} onClick={() => goTo(focus + 1)} aria-label="Next image" disabled={focus >= tiles.length - 1}>&#8594;</button>
            <button type="button" className={`${uid}-b`} style={{ ...iconBtn, width: 'auto', padding: '0 16px', fontFamily: mono, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase' }} onClick={() => openDetail(focus)} aria-label={`Open ${cap(focus) || 'image'}`}>View</button>
          </div>
        </div>
      )}

      {detail && detailT && (
        <div role="dialog" aria-modal="true" aria-label={cap(detail.k) || `Image ${detailT.i + 1}`} style={{ position: 'absolute', inset: 0, zIndex: 20 }}>
          <div onClick={closeDetail} style={{ position: 'absolute', inset: 0, background: `${bg}e6`, backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', opacity: dStage === 'in' ? 1 : 0, transition: reduced ? 'none' : 'opacity 500ms ease' }} />
          <div style={{
            position: 'absolute', left: detailBox.x, top: detailBox.y, width: detailBox.w, height: detailBox.h, transformOrigin: '0 0',
            transform: flip, transition: dStage === 'pre' || reduced ? 'none' : 'transform 620ms cubic-bezier(.2,.8,.15,1)', overflow: 'hidden', background: '#27272A',
            boxShadow: '0 50px 100px -30px rgba(0,0,0,.9)'
          }}>
            <img key={detail.k} src={images[detailT.i]} alt={cap(detail.k) || `Image ${detailT.i + 1}`} draggable={false}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', animation: detail.swap && !reduced ? `${uid}-fade 420ms ease both` : 'none' }} />
          </div>
          <div style={{
            position: 'absolute', left: compact ? 20 : detailBox.x + detailBox.w + 48, right: compact ? 20 : 56, top: compact ? detailBox.y + detailBox.h + 24 : detailBox.y + detailBox.h - 150,
            opacity: dStage === 'in' ? 1 : 0, transform: dStage === 'in' ? 'none' : 'translateY(10px)', transition: reduced ? 'none' : 'opacity 400ms ease 180ms, transform 400ms ease 180ms'
          }}>
            <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.16em', color: muted }}>{pad2(detailT.i + 1)} / {pad2(n)}</div>
            <div key={detail.k} style={{ fontFamily: serif, fontSize: compact ? 28 : 40, fontWeight: 300, lineHeight: 1.08, letterSpacing: titleFont === 'Inter' ? '-0.03em' : '-0.01em', marginTop: 12, animation: detail.swap && !reduced ? `${uid}-fade 420ms ease both` : 'none' }}>{cap(detail.k)}</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 24 }}>
              <button type="button" className={`${uid}-b`} style={iconBtn} onClick={() => detailNav(-1)} aria-label="Previous image" disabled={detail.k <= 0}>&#8592;</button>
              <button type="button" className={`${uid}-b`} style={iconBtn} onClick={() => detailNav(1)} aria-label="Next image" disabled={detail.k >= tiles.length - 1}>&#8594;</button>
            </div>
          </div>
          <button ref={closeRef} type="button" className={`${uid}-b`} onClick={closeDetail} aria-label="Close detail view (Escape)"
            style={{ ...iconBtn, position: 'absolute', top: compact ? 20 : 40, right: compact ? 20 : 48, opacity: dStage === 'in' ? 1 : 0, transition: 'opacity 300ms ease' }}>&#10005;</button>
        </div>
      )}
    </section>
  );
}

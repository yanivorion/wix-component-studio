const MANIFEST = {
  "type": "Gallery.LightTable",
  "description": "A photographer's backlit light table: slides and prints scattered by hand, drag to rearrange, a 2.5x loupe with crosshair that follows the pointer, red grease-pencil circles you can toggle, and a Tidy button that squares everything into a contact grid",
  "editorElement": {
    "selector": ".light-table-gallery",
    "displayName": "Light Table Gallery",
    "archetype": "container",
    "data": {
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Edit 04 / Selects", "group": "Content" },
      "title": { "dataType": "text", "displayName": "Title", "defaultValue": "The edit, under glass", "group": "Content" },
      "description": { "dataType": "text", "displayName": "Description", "defaultValue": "Drag to rearrange. Double-click any slide for the loupe, click to circle a keeper.", "group": "Content" },
      "images": { "dataType": "text", "displayName": "Image URLs (comma separated)", "defaultValue": "https://picsum.photos/seed/ridge/1200/900,https://picsum.photos/seed/salt/1200/900,https://picsum.photos/seed/vellum/1200/900,https://picsum.photos/seed/estuary/1200/900,https://picsum.photos/seed/plaster/1200/900,https://picsum.photos/seed/cedar/1200/900,https://picsum.photos/seed/tidal/1200/900,https://picsum.photos/seed/foundry/1200/900,https://picsum.photos/seed/meadow/1200/900,https://picsum.photos/seed/archive/1200/900,https://picsum.photos/seed/glacier/1200/900,https://picsum.photos/seed/kiln/1200/900", "group": "Images" },
      "captions": { "dataType": "text", "displayName": "Captions (separate with |)", "defaultValue": "Ridge line|Salt flats|Vellum|Estuary|Plaster wall|Cedar grove|Low tide|Foundry|Meadow|The archive|Glacier|Kiln room", "group": "Images" },
      "grayscale": { "dataType": "booleanValue", "displayName": "Black & White Images", "defaultValue": "false", "group": "Images" },
      "markedFrames": { "dataType": "text", "displayName": "Circled Frames (numbers, comma separated)", "defaultValue": "2,6,9", "group": "Images" },
      "roomColor": { "dataType": "color", "displayName": "Room Background", "defaultValue": "#E7E5E4", "group": "Colors" },
      "bezelColor": { "dataType": "color", "displayName": "Table Bezel", "defaultValue": "#292524", "group": "Colors" },
      "surfaceColor": { "dataType": "color", "displayName": "Backlit Surface", "defaultValue": "#FDFDFB", "group": "Colors" },
      "gridColor": { "dataType": "color", "displayName": "Surface Grid", "defaultValue": "#D6D3D1", "group": "Colors" },
      "mountColor": { "dataType": "color", "displayName": "Slide Mount", "defaultValue": "#F5F5F0", "group": "Colors" },
      "inkColor": { "dataType": "color", "displayName": "Text", "defaultValue": "#1C1917", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#78716C", "group": "Colors" },
      "markColor": { "dataType": "color", "displayName": "Grease Pencil", "defaultValue": "#D9302C", "group": "Colors" },
      "loupeColor": { "dataType": "color", "displayName": "Loupe Body", "defaultValue": "#1C1917", "group": "Colors" },
      "titleFont": { "dataType": "select", "displayName": "Title Font", "defaultValue": "Instrument Serif", "options": ["Instrument Serif", "Fraunces", "Inter", "Georgia"], "group": "Typography" },
      "titleSize": { "dataType": "select", "displayName": "Title Size (px)", "defaultValue": "56", "options": ["40", "48", "56", "64", "72"], "group": "Typography" },
      "titleWeight": { "dataType": "select", "displayName": "Title Weight", "defaultValue": "400", "options": ["300", "400", "500"], "group": "Typography" },
      "sectionHeight": { "dataType": "select", "displayName": "Section Height", "defaultValue": "fill", "options": ["fill", "640", "720", "800", "900"], "group": "Layout", "description": "fill = height of the visible canvas" },
      "slideSize": { "dataType": "select", "displayName": "Slide Size", "defaultValue": "medium", "options": ["small", "medium", "large"], "group": "Layout" },
      "scatter": { "dataType": "select", "displayName": "Scatter", "defaultValue": "loose", "options": ["neat", "loose", "wild"], "group": "Layout" },
      "printEvery": { "dataType": "select", "displayName": "Paper Print Every", "defaultValue": "3", "options": ["none", "2", "3", "4"], "group": "Layout", "description": "Mix paper prints in with the slide mounts" },
      "showGrid": { "dataType": "booleanValue", "displayName": "Surface Grid", "defaultValue": "true", "group": "Layout" },
      "showMarks": { "dataType": "booleanValue", "displayName": "Show Grease Marks", "defaultValue": "true", "group": "Layout" },
      "loupeOnLoad": { "dataType": "booleanValue", "displayName": "Loupe Visible on Load", "defaultValue": "true", "group": "Loupe" },
      "magnification": { "dataType": "select", "displayName": "Magnification", "defaultValue": "2.5", "options": ["2", "2.5", "3", "4"], "group": "Loupe" },
      "loupeSize": { "dataType": "select", "displayName": "Loupe Size", "defaultValue": "medium", "options": ["small", "medium", "large"], "group": "Loupe" },
      "entrance": { "dataType": "booleanValue", "displayName": "Drop-in Entrance", "defaultValue": "true", "group": "Animation" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const eyebrow = config?.eyebrow || 'Edit 04 / Selects';
  const title = config?.title || 'The edit, under glass';
  const description = config?.description || 'Drag to rearrange. Double-click any slide for the loupe, click to circle a keeper.';
  const defaultImages = 'ridge,salt,vellum,estuary,plaster,cedar,tidal,foundry,meadow,archive,glacier,kiln'
    .split(',').map((s) => `https://picsum.photos/seed/${s}/1200/900`).join(',');
  const grayscale = bool(config?.grayscale, false);
  const imagesRaw = config?.images || defaultImages;
  const captionsRaw = config?.captions || 'Ridge line|Salt flats|Vellum|Estuary|Plaster wall|Cedar grove|Low tide|Foundry|Meadow|The archive|Glacier|Kiln room';
  const markedRaw = config?.markedFrames || '2,6,9';
  const room = config?.roomColor || '#E7E5E4';
  const bezel = config?.bezelColor || '#292524';
  const surface = config?.surfaceColor || '#FDFDFB';
  const gridColor = config?.gridColor || '#D6D3D1';
  const mount = config?.mountColor || '#F5F5F0';
  const ink = config?.inkColor || '#1C1917';
  const muted = config?.mutedColor || '#78716C';
  const markColor = config?.markColor || '#D9302C';
  const loupeColor = config?.loupeColor || '#1C1917';
  const titleFont = config?.titleFont || 'Instrument Serif';
  const titleSize = parseInt(config?.titleSize || '56', 10);
  const titleWeight = config?.titleWeight || '400';
  const sectionHeight = config?.sectionHeight || 'fill';
  const sizeFactor = { small: 0.82, medium: 1, large: 1.18 }[config?.slideSize || 'medium'] || 1;
  const rotAmt = { neat: 2.5, loose: 7, wild: 14 }[config?.scatter || 'loose'] || 7;
  const printEvery = config?.printEvery || '3';
  const showGrid = bool(config?.showGrid, true);
  const showMarksInit = bool(config?.showMarks, true);
  const loupeOnLoad = bool(config?.loupeOnLoad, true);
  const Z = parseFloat(config?.magnification || '2.5') || 2.5;
  const loupeFactor = { small: 0.8, medium: 1, large: 1.25 }[config?.loupeSize || 'medium'] || 1;
  const entrance = bool(config?.entrance, true);

  const images = React.useMemo(() => imagesRaw.split(',').map((s) => s.trim()).filter(Boolean).map((u) => {
    if (!grayscale || !/picsum\.photos/.test(u) || /grayscale/.test(u)) return u;
    return u + (u.includes('?') ? '&grayscale' : '?grayscale');
  }), [imagesRaw, grayscale]);
  const captions = React.useMemo(() => captionsRaw.split('|').map((s) => s.trim()), [captionsRaw]);
  const n = images.length;

  const uid = React.useMemo(() => 'glt' + Math.random().toString(36).slice(2, 8), []);
  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  React.useEffect(() => {
    const id = 'ncs-fonts-gallery-lighttable';
    if (document.getElementById(id)) return;
    const l = document.createElement('link');
    l.id = id;
    l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Caveat:wght@400;500&family=Instrument+Serif&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500&family=Inter:wght@300;400;500&family=IBM+Plex+Mono:wght@400;500&display=swap';
    document.head.appendChild(l);
  }, []);

  const rootRef = React.useRef(null);
  const surfRef = React.useRef(null);
  const [width, setWidth] = React.useState(1280);
  const [stageH, setStageH] = React.useState(800);
  const [surf, setSurf] = React.useState({ w: 1180, h: 600 });
  React.useEffect(() => {
    const s = typeof getScrollContainer === 'function' ? getScrollContainer() : null;
    const scroller = s && s !== window && s.nodeType === 1 ? s : window;
    const el = rootRef.current;
    if (!el) return undefined;
    const measure = () => {
      setWidth(el.clientWidth || 1280);
      setStageH(scroller === window ? window.innerHeight : scroller.clientHeight || 800);
      const sf = surfRef.current;
      if (sf) setSurf({ w: sf.clientWidth || 1, h: sf.clientHeight || 1 });
    };
    measure();
    window.addEventListener('resize', measure);
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (ro) { ro.observe(el); if (surfRef.current) ro.observe(surfRef.current); }
    return () => { window.removeEventListener('resize', measure); if (ro) ro.disconnect(); };
  }, []);

  const compact = width < 760;
  const H = sectionHeight === 'fill' ? Math.max(compact ? 680 : 600, Math.min(980, stageH)) : parseInt(sectionHeight, 10);

  const rnd = (i, salt) => {
    const x = Math.sin((i + 1) * 91.7 + salt * 47.13) * 24634.6345;
    return x - Math.floor(x);
  };
  const scatterLayout = (count, aspect) => {
    const rows = Math.max(2, Math.ceil(Math.sqrt(count / Math.max(0.3, aspect))));
    const cols = Math.max(2, Math.ceil(count / rows));
    const realRows = Math.ceil(count / cols);
    return Array.from({ length: count }, (_, i) => {
      const c = i % cols;
      const r = Math.floor(i / cols);
      const inRow = r === realRows - 1 ? count - r * cols : cols;
      const shift = (cols - inRow) / 2 + (r % 2 ? 0.16 : -0.16);
      return {
        x: Math.min(0.95, Math.max(0.05, (c + 0.5 + shift + (rnd(i, 1) - 0.5) * 0.55) / cols)),
        y: Math.min(0.95, Math.max(0.05, (r + 0.5 + (rnd(i, 2) - 0.5) * 0.5) / realRows)),
        r: (rnd(i, 3) - 0.5) * 2 * rotAmt
      };
    });
  };

  const [pos, setPos] = React.useState(() => scatterLayout(n, 2));
  const [zOrder, setZOrder] = React.useState(() => images.map((_, i) => i));
  const [tidy, setTidy] = React.useState(false);
  const [marksOn, setMarksOn] = React.useState(showMarksInit);
  const parseMarks = () => new Set(markedRaw.split(',').map((s) => parseInt(s, 10) - 1).filter((k) => k >= 0));
  const [marked, setMarked] = React.useState(parseMarks);
  const [loupeState, setLoupe] = React.useState({ on: false, x: 0, y: 0, touch: false, anchor: -1 });
  let loupe = loupeState;
  const [entered, setEntered] = React.useState(reduced || !entrance);
  const [loaded, setLoaded] = React.useState({});
  const [aspects, setAspects] = React.useState({});
  const [dragging, setDragging] = React.useState(-1);
  const [focusIdx, setFocusIdx] = React.useState(-1);
  const drag = React.useRef(null);
  const clickTimer = React.useRef(0);
  const itemRefs = React.useRef([]);

  React.useEffect(() => { setPos(scatterLayout(n, surf.w / Math.max(1, surf.h))); setZOrder(images.map((_, i) => i)); }, [n, compact, rotAmt, surf.w > 1]); // eslint-disable-line react-hooks/exhaustive-deps
  React.useEffect(() => { setMarked(parseMarks()); }, [markedRaw]); // eslint-disable-line react-hooks/exhaustive-deps
  React.useEffect(() => { setMarksOn(showMarksInit); }, [showMarksInit]);
  React.useEffect(() => {
    if (entered) return undefined;
    const t = setTimeout(() => setEntered(true), 60);
    return () => clearTimeout(t);
  }, [entered]);
  React.useEffect(() => () => clearTimeout(clickTimer.current), []);

  const S = Math.round(Math.max(compact ? 84 : 108, Math.min(compact ? 104 : 158, surf.w / (compact ? 3.9 : 8.4), surf.h / (compact ? 5.2 : 3.6))) * sizeFactor);
  const every = printEvery === 'none' ? 0 : parseInt(printEvery, 10);
  const kindOf = (i) => (every && i % every === every - 1 ? 'print' : 'slide');
  const dims = (i) => {
    if (kindOf(i) === 'print') {
      const w = Math.round(S * 1.42);
      const h = Math.round(S * 1.02);
      const b = Math.round(S * 0.06);
      return { w, h, win: { x: b, y: b, w: w - b * 2, h: h - b * 2 } };
    }
    const vertical = i % 5 === 3;
    const ww = Math.round(S * (vertical ? 0.47 : 0.71));
    const wh = Math.round(S * (vertical ? 0.71 : 0.47));
    return { w: S, h: S, win: { x: Math.round((S - ww) / 2), y: Math.round((S - wh) / 2 - S * 0.02), w: ww, h: wh } };
  };

  const tidyCols = compact ? 3 : Math.min(6, Math.max(3, Math.ceil(n / 2)));
  const tidyRows = Math.max(1, Math.ceil(n / tidyCols));
  const geo = (i) => {
    const d = dims(i);
    if (tidy) {
      const m = compact ? 10 : 26;
      const cw = (surf.w - m * 2) / tidyCols;
      const chh = (surf.h - m * 2) / tidyRows;
      const c = i % tidyCols;
      const r = Math.floor(i / tidyCols);
      const s = Math.min(1.4, (cw * 0.82) / d.w, (chh * 0.8) / d.h);
      return { ...d, cx: m + cw * (c + 0.5), cy: m + chh * (r + 0.5), r: 0, s };
    }
    const p = pos[i] || { x: 0.5, y: 0.5, r: 0 };
    const hw = d.w / 2;
    const hh = d.h / 2;
    return { ...d, cx: Math.min(surf.w - hw - 6, Math.max(hw + 6, p.x * surf.w)), cy: Math.min(surf.h - hh - S * 0.1, Math.max(hh + S * 0.14, p.y * surf.h)), r: p.r, s: 1 };
  };

  const D = Math.round((compact ? 150 : 212) * loupeFactor);
  const placeLoupeOn = (i) => setLoupe({ on: true, x: 0, y: 0, touch: false, anchor: i });
  React.useEffect(() => {
    if (!loupeOnLoad || n === 0) return undefined;
    const first = [...parseMarks()].filter((k) => k < n);
    const pool = first.length ? first : images.map((_, k) => k);
    let target = pool[0];
    let best = Infinity;
    pool.forEach((k) => {
      const g = geo(k);
      const dd = Math.hypot(g.cx / surf.w - 0.55, g.cy / surf.h - 0.5);
      if (dd < best) { best = dd; target = k; }
    });
    const t = setTimeout(() => placeLoupeOn(target), reduced ? 0 : 520);
    return () => clearTimeout(t);
  }, [loupeOnLoad, n, surf.w > 1, compact]); // eslint-disable-line react-hooks/exhaustive-deps

  const toLocal = (e) => {
    const sf = surfRef.current;
    const r = sf.getBoundingClientRect();
    const sc = r.width / (sf.offsetWidth || r.width) || 1;
    return { x: (e.clientX - r.left) / sc, y: (e.clientY - r.top) / sc };
  };
  const raise = (i) => setZOrder((z) => [...z.filter((k) => k !== i), i]);

  const onItemDown = (e, i) => {
    if (e.button !== undefined && e.button !== 0) return;
    if (loupe.on && e.pointerType !== 'mouse') return;
    e.stopPropagation();
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch (err) { /* noop */ }
    const p = toLocal(e);
    const g = geo(i);
    drag.current = { i, id: e.pointerId, dx: p.x - g.cx, dy: p.y - g.cy, sx: p.x, sy: p.y, moved: false, r: g.r };
    raise(i);
  };
  const onItemMove = (e) => {
    const d = drag.current;
    if (loupe.on && e.pointerType === 'mouse') { const p = toLocal(e); setLoupe((l) => ({ ...l, x: p.x, y: p.y, touch: false, anchor: -1 })); }
    if (!d || d.id !== e.pointerId) return;
    const p = toLocal(e);
    if (!d.moved && Math.hypot(p.x - d.sx, p.y - d.sy) < 4) return;
    if (!d.moved) {
      d.moved = true;
      setDragging(d.i);
      if (tidy) {
        const all = images.map((_, k) => { const g = geo(k); return { x: g.cx / surf.w, y: g.cy / surf.h, r: (rnd(k, 3) - 0.5) * 2 * rotAmt * 0.4 }; });
        setPos(all);
        setTidy(false);
      }
    }
    const nx = (p.x - d.dx) / surf.w;
    const ny = (p.y - d.dy) / surf.h;
    setPos((ps) => ps.map((q, k) => (k === d.i ? { x: Math.min(1, Math.max(0, nx)), y: Math.min(1, Math.max(0, ny)), r: q.r } : q)));
  };
  const onItemUp = (e) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    drag.current = null;
    setDragging(-1);
    if (!d.moved) {
      const i = d.i;
      clearTimeout(clickTimer.current);
      clickTimer.current = setTimeout(() => {
        setMarksOn(true);
        setMarked((m) => { const s = new Set(m); if (s.has(i)) s.delete(i); else s.add(i); return s; });
      }, 260);
    }
  };
  const onItemDouble = (e, i) => {
    clearTimeout(clickTimer.current);
    if (loupe.on) { setLoupe((l) => ({ ...l, on: false })); return; }
    const p = toLocal(e);
    setLoupe({ on: true, x: p.x, y: p.y, touch: false });
    raise(i);
  };

  const surfDrag = React.useRef(null);
  const onSurfDown = (e) => {
    if (!loupe.on) return;
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch (err) { /* noop */ }
    surfDrag.current = e.pointerId;
    const p = toLocal(e);
    const touch = e.pointerType !== 'mouse';
    setLoupe((l) => ({ ...l, x: p.x, y: p.y, touch, anchor: -1 }));
  };
  const onSurfMove = (e) => {
    if (!loupe.on) return;
    if (e.pointerType === 'mouse' || surfDrag.current === e.pointerId) {
      const p = toLocal(e);
      setLoupe((l) => ({ ...l, x: p.x, y: p.y, touch: e.pointerType !== 'mouse', anchor: -1 }));
    }
  };
  const onSurfUp = (e) => { if (surfDrag.current === e.pointerId) surfDrag.current = null; };

  const toggleLoupe = () => {
    if (loupe.on) { setLoupe((l) => ({ ...l, on: false })); return; }
    const t = focusIdx >= 0 ? focusIdx : zOrder[zOrder.length - 1];
    if (t !== undefined) placeLoupeOn(t); else setLoupe({ on: true, x: surf.w / 2, y: surf.h / 2, touch: false });
  };
  const toggleTidy = () => setTidy((t) => !t);

  const onKeyDown = (e) => {
    const k = e.key;
    if (k === 'Escape') { if (loupe.on) { e.preventDefault(); setLoupe((l) => ({ ...l, on: false })); } return; }
    if (e.target && e.target.tagName === 'BUTTON' && !e.target.dataset.item && (k === 'Enter' || k === ' ')) return;
    if (k === 't' || k === 'T') { toggleTidy(); return; }
    if (k === 'l' || k === 'L') { toggleLoupe(); return; }
    const arrows = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
    if (arrows[k]) {
      e.preventDefault();
      const step = e.shiftKey ? 40 : 12;
      if (loupe.on) {
        setLoupe(() => ({ ...loupe, x: Math.min(surf.w, Math.max(0, loupe.x + arrows[k][0] * step)), y: Math.min(surf.h, Math.max(0, loupe.y + arrows[k][1] * step)), anchor: -1 }));
      } else if (focusIdx >= 0) {
        const i = focusIdx;
        if (tidy) {
          setPos(images.map((_, q) => { const g = geo(q); return { x: g.cx / surf.w, y: g.cy / surf.h, r: (rnd(q, 3) - 0.5) * 2 * rotAmt * 0.4 }; }));
          setTidy(false);
        }
        raise(i);
        setPos((ps) => ps.map((q, j) => (j === i ? { ...q, x: Math.min(1, Math.max(0, q.x + (arrows[k][0] * step) / surf.w)), y: Math.min(1, Math.max(0, q.y + (arrows[k][1] * step) / surf.h)) } : q)));
      }
      return;
    }
    if ((k === 'm' || k === 'M' || k === 'Enter' || k === ' ') && focusIdx >= 0) {
      e.preventDefault();
      const i = focusIdx;
      setMarksOn(true);
      setMarked((m) => { const s = new Set(m); if (s.has(i)) s.delete(i); else s.add(i); return s; });
    }
  };

  const pathFor = (i, w, h, m) => {
    const cx = w / 2 + m;
    const cy = h / 2 + m;
    const rx = w / 2 + m * 0.62;
    const ry = h / 2 + m * 0.62;
    const a0 = -2.2 + rnd(i, 7) * 1.2;
    const N = 15;
    const pts = [];
    for (let k = 0; k <= N; k++) {
      const t = k / N;
      const a = a0 + t * (Math.PI * 2 + 0.55);
      const wob = 1 + (rnd(i * 31 + k, 8) - 0.5) * 0.07 + (0.035 - t * 0.07);
      pts.push([cx + Math.cos(a) * rx * wob, cy + Math.sin(a) * ry * wob]);
    }
    let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
    for (let k = 0; k < pts.length - 1; k++) {
      const p0 = pts[Math.max(0, k - 1)];
      const p1 = pts[k];
      const p2 = pts[k + 1];
      const p3 = pts[Math.min(pts.length - 1, k + 2)];
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C ${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
    }
    return d;
  };

  const coverBox = (i, win) => {
    const a = aspects[i] || 4 / 3;
    const wa = win.w / win.h;
    if (a > wa) { const dw = win.h * a; return { dw, dh: win.h, ox: (win.w - dw) / 2, oy: 0 }; }
    const dh = win.w / a;
    return { dw: win.w, dh, ox: 0, oy: (win.h - dh) / 2 };
  };

  const mono = '"IBM Plex Mono", ui-monospace, "SF Mono", Menlo, monospace';
  const sans = 'Inter, -apple-system, "Helvetica Neue", Arial, sans-serif';
  const hand = '"Caveat", "Bradley Hand", "Segoe Print", cursive';
  const serif = titleFont === 'Inter' ? sans : titleFont === 'Georgia' ? 'Georgia, serif' : `"${titleFont}", Georgia, "Times New Roman", serif`;
  const pad2 = (v) => String(v).padStart(2, '0');

  const renderFace = (i, M, inLoupe) => {
    const d = dims(i);
    const kind = kindOf(i);
    const win = d.win;
    const cb = coverBox(i, win);
    const cap = captions[i] || '';
    const isPrint = kind === 'print';
    return (
      <div style={{
        position: 'absolute', left: 0, top: 0, width: d.w * M, height: d.h * M,
        background: isPrint ? '#FFFFFF' : mount, borderRadius: (isPrint ? 1 : S * 0.045) * M,
        boxShadow: isPrint ? 'inset 0 0 0 0.5px rgba(0,0,0,.08)' : `inset 0 0 0 ${0.6 * M}px rgba(0,0,0,.07), inset 0 ${1.5 * M}px ${2 * M}px rgba(255,255,255,.9), inset 0 ${-2 * M}px ${4 * M}px rgba(0,0,0,.05)`
      }}>
        <div style={{ position: 'absolute', left: win.x * M, top: win.y * M, width: win.w * M, height: win.h * M, overflow: 'hidden', background: isPrint ? '#E7E5E4' : '#E9E7E2', boxShadow: isPrint ? 'none' : `0 0 0 ${0.75 * M}px rgba(0,0,0,.18)` }}>
          {inLoupe ? (
            <div style={{
              position: 'absolute', inset: 0, backgroundImage: `url("${images[i]}")`, backgroundRepeat: 'no-repeat',
              backgroundSize: `${cb.dw * M}px ${cb.dh * M}px`, backgroundPosition: `${cb.ox * M}px ${cb.oy * M}px`,
              filter: isPrint ? 'none' : 'saturate(1.06) contrast(1.03)'
            }} />
          ) : (
            <img src={images[i]} alt={cap || `Frame ${i + 1}`} draggable={false}
              onLoad={(ev) => {
                const im = ev.currentTarget;
                setLoaded((l) => (l[i] ? l : { ...l, [i]: true }));
                if (im.naturalWidth && im.naturalHeight) setAspects((a) => (a[i] ? a : { ...a, [i]: im.naturalWidth / im.naturalHeight }));
              }}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none', opacity: loaded[i] ? 1 : 0, transition: reduced ? 'none' : 'opacity 700ms ease', filter: isPrint ? 'none' : 'saturate(1.06) contrast(1.03)' }} />
          )}
        </div>
        {!isPrint && (
          <>
            <div style={{ position: 'absolute', left: S * 0.08 * M, top: S * 0.045 * M, fontFamily: mono, fontSize: Math.max(7, S * 0.06) * M, letterSpacing: '0.06em', color: '#57534E' }}>{pad2(i + 1)}</div>
            <div style={{ position: 'absolute', right: S * 0.08 * M, top: S * 0.045 * M, fontFamily: mono, fontSize: Math.max(6, S * 0.05) * M, letterSpacing: '0.1em', color: '#A8A29E' }}>&#9650;</div>
            <div style={{ position: 'absolute', left: S * 0.08 * M, right: S * 0.08 * M, bottom: S * 0.035 * M, fontFamily: hand, fontSize: Math.max(10, S * 0.095) * M, lineHeight: 1, color: '#292524', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'center' }}>{cap}</div>
          </>
        )}
        {isPrint && (
          <div style={{ position: 'absolute', right: win.x * M, bottom: win.x * 0.12 * M, fontFamily: mono, fontSize: Math.max(6, S * 0.042) * M, color: '#A8A29E', letterSpacing: '0.08em' }}>{pad2(i + 1)}</div>
        )}
      </div>
    );
  };

  if (loupe.on && loupe.anchor !== undefined && loupe.anchor >= 0 && loupe.anchor < n) {
    const g = geo(loupe.anchor);
    loupe = { ...loupe, x: Math.min(surf.w - D * 0.5 - 6, Math.max(D * 0.5 + 6, g.cx + g.win.w * 0.12)), y: Math.min(surf.h - D * 0.5 - 6, Math.max(D * 0.5 + 6, g.cy - g.win.h * 0.06)) };
  }
  let hit = null;
  if (loupe.on) {
    for (let k = zOrder.length - 1; k >= 0; k--) {
      const i = zOrder[k];
      if (i >= n) continue;
      const g = geo(i);
      const dx = loupe.x - g.cx;
      const dy = loupe.y - g.cy;
      const rad = (g.r * Math.PI) / 180;
      const u = (dx * Math.cos(rad) + dy * Math.sin(rad)) / g.s;
      const v = (-dx * Math.sin(rad) + dy * Math.cos(rad)) / g.s;
      if (Math.abs(u) <= g.w / 2 && Math.abs(v) <= g.h / 2) { hit = { i, u, v, g }; break; }
    }
  }
  const loupeY = loupe.touch ? loupe.y - D * 0.62 : loupe.y;
  const R = D / 2;
  const gridStep = compact ? 32 : 40;
  const markCount = images.filter((_, i) => marked.has(i)).length;

  const tbBtn = (active) => ({
    appearance: 'none', cursor: 'pointer', height: 38, padding: compact ? '0 12px' : '0 16px', borderRadius: 999,
    border: `1px solid ${active ? ink : `${muted}66`}`, background: active ? ink : 'transparent', color: active ? room : ink,
    fontFamily: mono, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: 8,
    transition: 'background 200ms, color 200ms, border-color 200ms'
  });

  const headerH = compact ? 186 : 176;
  const sideM = compact ? 14 : 40;

  return (
    <section ref={rootRef} className={`light-table-gallery ${uid}`} aria-label={title} onKeyDown={onKeyDown}
      style={{ position: 'relative', width: '100%', height: `${H}px`, overflow: 'hidden', background: room, color: ink, fontFamily: sans, userSelect: 'none', WebkitUserSelect: 'none' }}>
      <style>{`
        .${uid}-tb:focus-visible, .${uid}-it:focus-visible { outline: 2px solid ${markColor}; outline-offset: 3px; }
        .${uid}-tb:hover { border-color: ${ink} !important; }
        @keyframes ${uid}-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
        @keyframes ${uid}-pop { from { opacity: 0; transform: scale(.82); } to { opacity: 1; transform: scale(1); } }
      `}</style>

      <div style={{ position: 'absolute', left: compact ? 20 : 56, right: compact ? 20 : 56, top: compact ? 26 : 44, height: headerH - (compact ? 26 : 44), display: 'flex', flexDirection: compact ? 'column' : 'row', justifyContent: 'space-between', alignItems: compact ? 'flex-start' : 'flex-end', gap: compact ? 14 : 24, paddingBottom: compact ? 0 : 22, boxSizing: 'border-box' }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: muted, marginBottom: compact ? 8 : 12, display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{ width: 7, height: 7, borderRadius: 7, background: markColor, display: 'inline-block' }} />{eyebrow}
          </div>
          <h2 style={{ margin: 0, fontFamily: serif, fontWeight: titleWeight, fontSize: compact ? Math.round(titleSize * 0.66) : titleSize, lineHeight: 1, letterSpacing: titleFont === 'Inter' ? '-0.035em' : '-0.015em', whiteSpace: compact ? 'normal' : 'nowrap' }}>{title}</h2>
          {!compact && <p style={{ margin: '12px 0 0', fontSize: 14, color: muted, lineHeight: 1.5, fontWeight: 300, maxWidth: 520 }}>{description}</p>}
        </div>
        <div role="toolbar" aria-label="Light table tools" style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
          <button type="button" className={`${uid}-tb`} style={tbBtn(loupe.on)} aria-pressed={loupe.on} onClick={toggleLoupe} aria-label="Toggle loupe (L)">
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><circle cx="6" cy="6" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.2" /><path d="M9.4 9.4L13 13" stroke="currentColor" strokeWidth="1.6" /></svg>
            Loupe
          </button>
          <button type="button" className={`${uid}-tb`} style={tbBtn(marksOn)} aria-pressed={marksOn} onClick={() => setMarksOn((m) => !m)} aria-label="Toggle grease pencil marks">
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M3 7.5c0-3 2.2-5 4.6-5 2.6 0 4 1.9 4 4.3 0 2.8-2.3 4.8-5 4.8C4.3 11.6 2 10 2.2 7" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
            Marks
          </button>
          <button type="button" className={`${uid}-tb`} style={tbBtn(tidy)} aria-pressed={tidy} onClick={toggleTidy} aria-label={tidy ? 'Scatter the prints (T)' : 'Tidy prints into a contact grid (T)'}>
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><rect x="1.5" y="1.5" width="4.5" height="4.5" fill="none" stroke="currentColor" /><rect x="8" y="1.5" width="4.5" height="4.5" fill="none" stroke="currentColor" /><rect x="1.5" y="8" width="4.5" height="4.5" fill="none" stroke="currentColor" /><rect x="8" y="8" width="4.5" height="4.5" fill="none" stroke="currentColor" /></svg>
            {tidy ? 'Scatter' : 'Tidy'}
          </button>
        </div>
      </div>

      <div style={{ position: 'absolute', left: sideM, right: sideM, top: headerH, bottom: compact ? 16 : 40, background: bezel, borderRadius: compact ? 12 : 16, padding: compact ? 9 : 13, boxSizing: 'border-box', boxShadow: '0 1px 0 rgba(255,255,255,.08) inset, 0 40px 70px -40px rgba(28,25,23,.55), 0 10px 22px -12px rgba(28,25,23,.35)' }}>
        <div aria-hidden="true" style={{ position: 'absolute', left: compact ? 14 : 22, bottom: compact ? 1 : 2, height: compact ? 8 : 11, display: 'flex', alignItems: 'center', gap: 8, fontFamily: mono, fontSize: compact ? 7 : 8, letterSpacing: '0.2em', color: '#A8A29E', opacity: 0.8 }}>
          <span style={{ width: 4, height: 4, borderRadius: 4, background: '#86EFAC', boxShadow: '0 0 6px #86EFAC' }} />5000 K
        </div>
        <div ref={surfRef}
          onPointerDown={onSurfDown} onPointerMove={onSurfMove} onPointerUp={onSurfUp} onPointerCancel={onSurfUp}
          onDoubleClick={() => { if (loupe.on && !hit) setLoupe((l) => ({ ...l, on: false })); }}
          style={{
            position: 'relative', width: '100%', height: '100%', borderRadius: compact ? 5 : 7, overflow: 'hidden',
            background: surface, touchAction: loupe.on ? 'none' : 'pan-y', cursor: loupe.on ? 'none' : 'default',
            boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.25), inset 0 0 60px rgba(120,113,108,.18)'
          }}>
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 80% at 50% 45%, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 70%)' }} />
          {showGrid && (
            <div aria-hidden="true" style={{ position: 'absolute', inset: 0, opacity: 0.55, backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`, backgroundSize: `${gridStep}px ${gridStep}px`, backgroundPosition: '-1px -1px' }} />
          )}

          {n === 0 && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: mono, fontSize: 12, color: muted, letterSpacing: '0.08em', textAlign: 'center', lineHeight: 1.7 }}>
              The table is empty.<br />Add image URLs, separated by commas.
            </div>
          )}

          {images.map((src, i) => {
            const g = geo(i);
            const z = zOrder.indexOf(i);
            const lifted = dragging === i;
            const m = Math.round(S * 0.16);
            const showMark = marksOn && marked.has(i);
            const cap = captions[i] || '';
            return (
              <button key={i} type="button" data-item="1" className={`${uid}-it`}
                ref={(el) => { itemRefs.current[i] = el; }}
                aria-label={`${kindOf(i) === 'print' ? 'Print' : 'Slide'} ${i + 1}${cap ? ': ' + cap : ''}${marked.has(i) ? ', circled' : ''}. Arrow keys move it, M circles it, L opens the loupe.`}
                aria-pressed={marked.has(i)}
                onFocus={() => setFocusIdx(i)} onBlur={() => setFocusIdx((f) => (f === i ? -1 : f))}
                onPointerDown={(e) => onItemDown(e, i)} onPointerMove={onItemMove} onPointerUp={onItemUp} onPointerCancel={onItemUp}
                onDoubleClick={(e) => { e.stopPropagation(); onItemDouble(e, i); }}
                style={{
                  appearance: 'none', border: 0, padding: 0, margin: 0, background: 'transparent', position: 'absolute', left: 0, top: 0,
                  width: g.w, height: g.h, zIndex: lifted ? 500 : z + 1, cursor: loupe.on ? 'none' : lifted ? 'grabbing' : 'grab', touchAction: 'none',
                  transform: `translate3d(${g.cx - g.w / 2}px, ${g.cy - g.h / 2 - (lifted ? 6 : 0)}px, 0) rotate(${g.r + (lifted ? -1.5 : 0)}deg) scale(${g.s * (lifted ? 1.05 : 1) * (entered ? 1 : 1.25)})`,
                  opacity: entered ? 1 : 0,
                  transition: lifted || reduced ? 'none' : `transform ${tidy || !entered ? 780 : 420}ms cubic-bezier(.2,.8,.2,1) ${entered ? (tidy ? i * 22 : 0) : 0}ms, opacity 500ms ease`
                }}>
                <div style={{ position: 'absolute', inset: 0, borderRadius: kindOf(i) === 'print' ? 1 : S * 0.045, boxShadow: lifted ? '0 2px 3px rgba(0,0,0,.12), 0 30px 42px -14px rgba(28,25,23,.45)' : '0 0.5px 1px rgba(0,0,0,.18), 0 3px 8px -2px rgba(28,25,23,.16)', transition: 'box-shadow 250ms ease' }} />
                {renderFace(i, 1, false)}
                {showMark && (
                  <svg aria-hidden="true" width={g.w + m * 2} height={g.h + m * 2} viewBox={`0 0 ${g.w + m * 2} ${g.h + m * 2}`}
                    style={{ position: 'absolute', left: -m, top: -m, overflow: 'visible', pointerEvents: 'none' }}>
                    <path d={pathFor(i, g.w, g.h, m)} pathLength="1" fill="none" stroke={markColor} strokeWidth={compact ? 2.4 : 3.2} strokeLinecap="round" strokeLinejoin="round"
                      filter={`url(#${uid}-rough)`} opacity="0.92"
                      style={{ strokeDasharray: 1, strokeDashoffset: 0, animation: reduced ? 'none' : `${uid}-draw 760ms cubic-bezier(.6,.05,.3,1) ${entered ? 0 : 900}ms both` }} />
                  </svg>
                )}
              </button>
            );
          })}

          {loupe.on && (
            <div aria-hidden="true" style={{
              position: 'absolute', left: loupe.x - R, top: loupeY - R, width: D, height: D, zIndex: 900, pointerEvents: 'none',
              animation: reduced ? 'none' : `${uid}-pop 260ms cubic-bezier(.2,.8,.2,1)`
            }}>
              <div style={{ position: 'absolute', inset: -2, borderRadius: '50%', boxShadow: '0 22px 40px -10px rgba(28,25,23,.55), 0 6px 12px rgba(28,25,23,.25)' }} />
              <div style={{
                position: 'absolute', inset: 0, borderRadius: '50%', overflow: 'hidden', background: surface,
                backgroundImage: showGrid ? `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)` : 'none',
                backgroundSize: `${gridStep * Z}px ${gridStep * Z}px`, backgroundPosition: `${R - loupe.x * Z - 1}px ${R - loupe.y * Z - 1}px`
              }}>
                {hit && (
                  <div style={{ position: 'absolute', left: R, top: R, width: 0, height: 0, transform: `rotate(${hit.g.r}deg)` }}>
                    <div style={{ position: 'absolute', left: -(hit.u + hit.g.w / 2) * Z * hit.g.s, top: -(hit.v + hit.g.h / 2) * Z * hit.g.s, width: hit.g.w * Z * hit.g.s, height: hit.g.h * Z * hit.g.s }}>
                      {renderFace(hit.i, Z * hit.g.s, true)}
                      {marksOn && marked.has(hit.i) && (() => {
                        const m = Math.round(S * 0.16);
                        const M = Z * hit.g.s;
                        return (
                          <svg width={(hit.g.w + m * 2) * M} height={(hit.g.h + m * 2) * M} viewBox={`0 0 ${hit.g.w + m * 2} ${hit.g.h + m * 2}`} style={{ position: 'absolute', left: -m * M, top: -m * M, overflow: 'visible' }}>
                            <path d={pathFor(hit.i, hit.g.w, hit.g.h, m)} fill="none" stroke={markColor} strokeWidth={compact ? 2.4 : 3.2} strokeLinecap="round" opacity="0.9" filter={`url(#${uid}-rough)`} />
                          </svg>
                        );
                      })()}
                    </div>
                  </div>
                )}
                <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'radial-gradient(circle at 32% 26%, rgba(255,255,255,.38) 0%, rgba(255,255,255,0) 34%), radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 62%, rgba(0,0,0,.22) 100%)' }} />
                <svg width={D} height={D} viewBox={`0 0 ${D} ${D}`} style={{ position: 'absolute', inset: 0 }}>
                  <g stroke={markColor} strokeWidth="1" opacity="0.85">
                    <line x1={R} y1={R - 16} x2={R} y2={R - 5} /><line x1={R} y1={R + 5} x2={R} y2={R + 16} />
                    <line x1={R - 16} y1={R} x2={R - 5} y2={R} /><line x1={R + 5} y1={R} x2={R + 16} y2={R} />
                  </g>
                  <g stroke={ink} strokeWidth="0.75" opacity="0.35">
                    {Array.from({ length: 24 }, (_, k) => {
                      const a = (k / 24) * Math.PI * 2;
                      const l = k % 6 === 0 ? 10 : 5;
                      return <line key={k} x1={R + Math.cos(a) * (R - 3)} y1={R + Math.sin(a) * (R - 3)} x2={R + Math.cos(a) * (R - 3 - l)} y2={R + Math.sin(a) * (R - 3 - l)} />;
                    })}
                  </g>
                </svg>
              </div>
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `${compact ? 8 : 11}px solid ${loupeColor}`, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.18), inset 0 3px 6px rgba(0,0,0,.35)', boxSizing: 'border-box' }} />
              <div style={{ position: 'absolute', left: '50%', bottom: compact ? -1 : 0, transform: 'translate(-50%, 0)', fontFamily: mono, fontSize: compact ? 8 : 9, letterSpacing: '0.14em', color: '#E7E5E4', background: loupeColor, padding: '2px 7px', borderRadius: 999 }}>{Z}&times;</div>
            </div>
          )}
          <svg aria-hidden="true" width="0" height="0" style={{ position: 'absolute' }}>
            <defs>
              <filter id={`${uid}-rough`} x="-10%" y="-10%" width="120%" height="120%">
                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="t" />
                <feDisplacementMap in="SourceGraphic" in2="t" scale="2.2" xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <div aria-live="polite" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
        {`${n} frames, ${markCount} circled${tidy ? ', tidied into a grid' : ''}${loupe.on ? ', loupe open' : ''}`}
      </div>
    </section>
  );
}

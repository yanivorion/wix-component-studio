const MANIFEST = {
  "type": "Gallery.HoverPreviewList",
  "description": "An editorial project index in large type with hairline rows. Hovering a row summons a floating preview that trails the cursor and tilts with its speed; moving between rows swaps the image with a direction-aware vertical clip inside the same frame while the row text eases inward. Click and the preview grows into a full-bleed project view",
  "editorElement": {
    "selector": ".hover-preview-list",
    "displayName": "Hover Preview List",
    "archetype": "container",
    "data": {
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Selected Work", "group": "Content" },
      "aside": { "dataType": "text", "displayName": "Aside", "defaultValue": "Index — 2022 / 2026", "group": "Content" },
      "titles": { "dataType": "text", "displayName": "Project Titles (comma separated)", "defaultValue": "Atlas House,Still Life,Kōhī Roasters,Meridian Tower,Northern Edge,Aperture Journal,Orbit", "group": "Content" },
      "clients": { "dataType": "text", "displayName": "Clients (comma separated)", "defaultValue": "Nordhavn Studio,Still Life Co.,Kōhī,Halden Group,Visit Faroe,Aperture Press,Lumen Space", "group": "Content" },
      "disciplines": { "dataType": "text", "displayName": "Disciplines (comma separated)", "defaultValue": "Architecture,Brand Identity,Packaging,Wayfinding,Campaign,Editorial,Product Film", "group": "Content" },
      "years": { "dataType": "text", "displayName": "Years (comma separated)", "defaultValue": "2026,2025,2025,2024,2024,2023,2022", "group": "Content" },
      "descriptions": { "dataType": "text", "displayName": "Descriptions (separate with |)", "defaultValue": "A timber-and-concrete residence on the Copenhagen waterfront, documented across four seasons.|A quiet identity for a ceramics studio — one colour, one typeface, a great deal of white space.|Packaging for a Kyoto roastery that treats every bag like a letter from the farm.|Wayfinding for a 52-storey tower, built from a single typographic rule.|A campaign about weather, distance and the pleasure of being far away.|A redesigned photography quarterly with a grid borrowed from contact sheets.|A launch film for a satellite company, shot entirely in camera.", "group": "Content" },
      "projectLabel": { "dataType": "text", "displayName": "Project Column Label", "defaultValue": "Project", "group": "Content" },
      "clientLabel": { "dataType": "text", "displayName": "Client Column Label", "defaultValue": "Client", "group": "Content" },
      "yearLabel": { "dataType": "text", "displayName": "Year Column Label", "defaultValue": "Year", "group": "Content" },
      "images": { "dataType": "text", "displayName": "Image URLs (comma separated)", "defaultValue": "https://picsum.photos/id/1076/1200/1500,https://picsum.photos/id/1068/1200/1500,https://picsum.photos/id/1060/1200/1500,https://picsum.photos/id/1031/1200/1500,https://picsum.photos/id/1049/1200/1500,https://picsum.photos/id/250/1200/1500,https://picsum.photos/id/1083/1200/1500", "group": "Images" },
      "imageTreatment": { "dataType": "select", "displayName": "Image Treatment", "defaultValue": "none", "options": ["none", "muted", "grayscale"], "group": "Images" },
      "previewSize": { "dataType": "select", "displayName": "Preview Size", "defaultValue": "medium", "options": ["small", "medium", "large"], "group": "Preview" },
      "previewAspect": { "dataType": "select", "displayName": "Preview Aspect", "defaultValue": "portrait", "options": ["portrait", "square", "landscape"], "group": "Preview" },
      "follow": { "dataType": "select", "displayName": "Follow Smoothing", "defaultValue": "0.12", "options": ["0.06", "0.12", "0.2", "0.35"], "group": "Preview" },
      "tilt": { "dataType": "select", "displayName": "Velocity Tilt", "defaultValue": "subtle", "options": ["off", "subtle", "strong"], "group": "Preview" },
      "openDetail": { "dataType": "booleanValue", "displayName": "Open Project On Click", "defaultValue": "true", "group": "Preview" },
      "dimOthers": { "dataType": "booleanValue", "displayName": "Dim Other Rows", "defaultValue": "true", "group": "Layout" },
      "indent": { "dataType": "select", "displayName": "Active Indent (px)", "defaultValue": "32", "options": ["0", "16", "32", "48"], "group": "Layout" },
      "rowSpacing": { "dataType": "select", "displayName": "Row Spacing", "defaultValue": "comfortable", "options": ["compact", "comfortable", "airy"], "group": "Layout" },
      "showNumbers": { "dataType": "booleanValue", "displayName": "Show Numbers", "defaultValue": "true", "group": "Layout" },
      "showLabels": { "dataType": "booleanValue", "displayName": "Show Column Labels", "defaultValue": "true", "group": "Layout" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#F5F5F4", "group": "Colors" },
      "textColor": { "dataType": "color", "displayName": "Text", "defaultValue": "#1C1917", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#78716C", "group": "Colors" },
      "lineColor": { "dataType": "color", "displayName": "Hairlines", "defaultValue": "#D6D3D1", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent", "defaultValue": "#1C1917", "group": "Colors" },
      "titleFont": { "dataType": "select", "displayName": "Title Font", "defaultValue": "Instrument Serif", "options": ["Instrument Serif", "Fraunces", "Inter Tight", "Inter"], "group": "Typography" },
      "titleSize": { "dataType": "select", "displayName": "Title Size (px)", "defaultValue": "72", "options": ["48", "56", "64", "72", "88"], "group": "Typography" },
      "titleWeight": { "dataType": "select", "displayName": "Title Weight", "defaultValue": "400", "options": ["300", "400", "500"], "group": "Typography" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const split = (s, sep = ',') => String(s || '').split(sep).map((x) => x.trim()).filter(Boolean);

  const eyebrow = config?.eyebrow ?? 'Selected Work';
  const aside = config?.aside ?? 'Index — 2022 / 2026';
  const titles = split(config?.titles || 'Atlas House,Still Life,Kōhī Roasters,Meridian Tower,Northern Edge,Aperture Journal,Orbit');
  const clients = split(config?.clients || 'Nordhavn Studio,Still Life Co.,Kōhī,Halden Group,Visit Faroe,Aperture Press,Lumen Space');
  const disciplines = split(config?.disciplines || 'Architecture,Brand Identity,Packaging,Wayfinding,Campaign,Editorial,Product Film');
  const years = split(config?.years || '2026,2025,2025,2024,2024,2023,2022');
  const descriptions = split(config?.descriptions || 'A timber-and-concrete residence on the Copenhagen waterfront, documented across four seasons.|A quiet identity for a ceramics studio — one colour, one typeface, a great deal of white space.|Packaging for a Kyoto roastery that treats every bag like a letter from the farm.|Wayfinding for a 52-storey tower, built from a single typographic rule.|A campaign about weather, distance and the pleasure of being far away.|A redesigned photography quarterly with a grid borrowed from contact sheets.|A launch film for a satellite company, shot entirely in camera.', '|');
  const projectLabel = config?.projectLabel || 'Project';
  const clientLabel = config?.clientLabel || 'Client';
  const yearLabel = config?.yearLabel || 'Year';
  const images = split(config?.images || 'https://picsum.photos/id/1076/1200/1500,https://picsum.photos/id/1068/1200/1500,https://picsum.photos/id/1060/1200/1500,https://picsum.photos/id/1031/1200/1500,https://picsum.photos/id/1049/1200/1500,https://picsum.photos/id/250/1200/1500,https://picsum.photos/id/1083/1200/1500');
  const treatment = config?.imageTreatment || 'none';
  const sizeK = { small: 0.8, medium: 1, large: 1.22 }[config?.previewSize || 'medium'] || 1;
  const aspect = { portrait: 1.25, square: 1, landscape: 0.7 }[config?.previewAspect || 'portrait'] || 1.25;
  const follow = Math.min(1, Math.max(0.02, parseFloat(config?.follow || '0.12') || 0.12));
  const tiltK = { off: 0, subtle: 1, strong: 2 }[config?.tilt || 'subtle'] ?? 1;
  const openDetail = bool(config?.openDetail, true);
  const dimOthers = bool(config?.dimOthers, true);
  const indent = parseInt(config?.indent ?? '32', 10) || 0;
  const rowPadK = { compact: 0.7, comfortable: 1, airy: 1.35 }[config?.rowSpacing || 'comfortable'] || 1;
  const showNumbers = bool(config?.showNumbers, true);
  const showLabels = bool(config?.showLabels, true);
  const bg = config?.backgroundColor || '#F5F5F4';
  const text = config?.textColor || '#1C1917';
  const muted = config?.mutedColor || '#78716C';
  const line = config?.lineColor || '#D6D3D1';
  const accent = config?.accentColor || '#1C1917';
  const titleFont = config?.titleFont || 'Instrument Serif';
  const titleSize = parseInt(config?.titleSize || '72', 10) || 72;
  const titleWeight = config?.titleWeight || '400';

  const N = Math.min(titles.length, images.length);
  const uid = React.useMemo(() => 'hp' + Math.random().toString(36).slice(2, 9), []);
  const reduced = React.useMemo(() => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  const rootRef = React.useRef(null);
  const listRef = React.useRef(null);
  const frameRef = React.useRef(null);
  const rowRefs = React.useRef([]);
  const clientRefs = React.useRef([]);
  const layerRefs = React.useRef([]);
  const layerImgRefs = React.useRef([]);
  const overlayRef = React.useRef(null);
  const dOuter = React.useRef(null);
  const dImg = React.useRef(null);
  const zc = React.useRef(2);
  const prevActive = React.useRef(0);
  const sim = React.useRef({ x: 0, y: 0, tx: 0, ty: 0, tilt: 0, s: 0.86, ts: 1, o: 0, to: 1, inside: false, init: false, raf: 0 });
  const tapGuard = React.useRef(-1);
  const [width, setWidth] = React.useState(1280);
  const [active, setActive] = React.useState(0);
  const [hovering, setHovering] = React.useState(false);
  const [detail, setDetail] = React.useState(null);
  const [vp, setVp] = React.useState({ top: 0, h: 800 });

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
    const measure = () => setWidth(el.clientWidth || 1280);
    measure();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (ro) ro.observe(el);
    window.addEventListener('resize', measure);
    return () => { if (ro) ro.disconnect(); window.removeEventListener('resize', measure); };
  }, []);

  const compact = width < 700;
  const pad = compact ? 16 : Math.round(Math.max(24, Math.min(56, width * 0.04)));
  const fw = Math.round((compact ? width * 0.36 : Math.max(220, Math.min(340, width * 0.22))) * sizeK);
  const fh = Math.round(fw * aspect);
  const tSize = compact ? Math.round(titleSize * 0.46) : Math.round(Math.min(titleSize, width * 0.055));
  const rowPad = Math.round((compact ? 14 : 18) * rowPadK);

  const scaleK = () => { const el = rootRef.current; if (!el) return 1; const r = el.getBoundingClientRect(); return r.width / (el.offsetWidth || r.width) || 1; };
  const toLocal = (cx, cy) => { const el = rootRef.current; const r = el.getBoundingClientRect(); const k = scaleK(); return { x: (cx - r.left) / k, y: (cy - r.top) / k }; };

  // resting spot for the frame beside a row (used with no pointer, keyboard focus and touch)
  const restFor = React.useCallback((i) => {
    const row = rowRefs.current[i];
    const root = rootRef.current;
    if (!row || !root) return { x: width * 0.62, y: 300 };
    const k = scaleK();
    const rr = row.getBoundingClientRect(); const ro = root.getBoundingClientRect();
    const cy = (rr.top - ro.top + rr.height / 2) / k;
    const cl = clientRefs.current[i];
    const clientLeft = cl ? (cl.getBoundingClientRect().left - ro.left) / k : width * 0.68;
    const x = compact ? width - pad - fw / 2 : Math.max(width * 0.45, clientLeft - 32 - fw / 2);
    const list = listRef.current;
    const lr = list ? list.getBoundingClientRect() : rr;
    const minY = (lr.top - ro.top) / k + fh / 2 + (compact ? -8 : 8);
    return { x, y: Math.max(minY, cy + (compact ? 0 : fh * 0.18)) };
  }, [width, compact, pad, fw, fh]); // eslint-disable-line react-hooks/exhaustive-deps

  // follow loop: lerped position, velocity tilt, show/hide scale — written straight to the frame
  React.useEffect(() => {
    const s = sim.current;
    const tick = () => {
      const f = frameRef.current;
      if (!s.init) { const r = restFor(0); s.x = s.tx = r.x; s.y = s.ty = r.y; s.init = true; }
      const k = reduced ? 1 : follow;
      const px = s.x;
      s.x += (s.tx - s.x) * k; s.y += (s.ty - s.y) * k;
      const vx = s.x - px;
      s.tilt += ((reduced ? 0 : Math.max(-12, Math.min(12, vx * 0.45 * tiltK))) - s.tilt) * 0.12;
      s.s += (s.ts - s.s) * (reduced ? 1 : 0.14);
      s.o += (s.to - s.o) * (reduced ? 1 : 0.18);
      if (f) {
        f.style.transform = `translate3d(${(s.x - fw / 2).toFixed(2)}px, ${(s.y - fh / 2).toFixed(2)}px, 0) rotate(${s.tilt.toFixed(3)}deg) scale(${s.s.toFixed(4)})`;
        f.style.opacity = s.o.toFixed(3);
      }
      s.raf = requestAnimationFrame(tick);
    };
    s.raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(s.raf);
  }, [follow, tiltK, fw, fh, reduced, restFor]);

  React.useEffect(() => {
    const s = sim.current;
    if (!s.inside) { const r = restFor(active); s.tx = r.x; s.ty = r.y; }
  }, [width, active, restFor]);

  // vertical clip swap inside the frame; newest layer always on top so rapid moves never break
  React.useEffect(() => {
    const from = prevActive.current;
    prevActive.current = active;
    const L = layerRefs.current[active]; const I = layerImgRefs.current[active];
    if (!L || !I) return;
    zc.current += 1;
    L.style.zIndex = String(zc.current);
    if (from === active || reduced) {
      L.style.transition = 'none'; I.style.transition = 'none';
      L.style.clipPath = 'inset(0% 0% 0% 0%)'; L.style.webkitClipPath = 'inset(0% 0% 0% 0%)';
      I.style.transform = 'none';
      return;
    }
    const dir = active > from ? 1 : -1;
    const start = dir > 0 ? 'inset(100% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)';
    L.style.transition = 'none'; I.style.transition = 'none';
    L.style.clipPath = start; L.style.webkitClipPath = start;
    I.style.transform = `translateY(${dir * 18}%) scale(1.25)`;
    void L.offsetWidth;
    L.style.transition = 'clip-path 760ms cubic-bezier(.77,0,.18,1), -webkit-clip-path 760ms cubic-bezier(.77,0,.18,1)';
    I.style.transition = 'transform 1100ms cubic-bezier(.22,1,.36,1)';
    L.style.clipPath = 'inset(0% 0% 0% 0%)'; L.style.webkitClipPath = 'inset(0% 0% 0% 0%)';
    I.style.transform = 'none';
    const P = layerImgRefs.current[from];
    if (P) { P.style.transition = 'transform 900ms cubic-bezier(.77,0,.18,1)'; P.style.transform = `translateY(${-dir * 10}%) scale(1.08)`; }
  }, [active, reduced]);

  const onListMove = (e) => {
    if (e.pointerType !== 'mouse' || detail) return;
    const s = sim.current;
    const p = toLocal(e.clientX, e.clientY);
    s.tx = p.x; s.ty = p.y;
    if (!s.inside) { s.inside = true; s.ts = 1; s.to = 1; setHovering(true); }
  };
  const onListLeave = (e) => {
    if (e.pointerType !== 'mouse') return;
    const s = sim.current;
    s.inside = false;
    setHovering(false);
    const r = restFor(active);
    s.tx = r.x; s.ty = r.y;
  };
  const onListEnter = (e) => {
    if (e.pointerType !== 'mouse' || detail) return;
    const s = sim.current;
    s.s = Math.min(s.s, 0.92);
  };

  const getScroller = () => {
    const s = typeof getScrollContainer === 'function' ? getScrollContainer() : null;
    return s && s !== window && s.nodeType === 1 ? s : window;
  };
  const computeVp = () => {
    const el = rootRef.current; const sc = getScroller(); const k = scaleK();
    const r = el.getBoundingClientRect();
    const sr = sc === window ? { top: 0, height: window.innerHeight } : sc.getBoundingClientRect();
    const top = Math.max(0, (sr.top - r.top) / k);
    const bottom = Math.min(el.offsetHeight, (sr.top + sr.height - r.top) / k);
    return { top, h: Math.max(320, bottom - top) };
  };

  const ease = 'cubic-bezier(.7,0,.2,1)';
  const easeOut = 'cubic-bezier(.22,1,.36,1)';
  const dDur = reduced ? 0 : 1000;

  const frameInset = (v) => {
    const s = sim.current;
    const w = fw * s.s; const h = fh * s.s;
    const left = s.x - w / 2; const top = s.y - v.top - h / 2;
    return { css: `inset(${top.toFixed(1)}px ${(width - left - w).toFixed(1)}px ${(v.h - top - h).toFixed(1)}px ${left.toFixed(1)}px round 2px)`, cx: left + w / 2, cy: top + h / 2, w, h };
  };
  const imgFromFrame = (fr, v) => {
    const s0 = Math.max(fr.w / width, fr.h / v.h);
    return `translate(${(fr.cx - width / 2).toFixed(1)}px, ${(fr.cy - v.h / 2).toFixed(1)}px) scale(${s0.toFixed(4)})`;
  };

  const open = (i) => {
    if (!openDetail || detail) return;
    const v = computeVp();
    setVp(v);
    setActive(i);
    setDetail({ i, phase: 'opening', v });
  };
  const close = () => setDetail((d) => (d && d.phase !== 'closing' ? { ...d, phase: 'closing' } : d));

  React.useLayoutEffect(() => {
    const o = dOuter.current; const im = dImg.current;
    if (!detail || !o || !im) return undefined;
    const v = detail.v;
    if (detail.phase === 'opening') {
      const fr = frameInset(v);
      sim.current.tilt = 0;
      o.style.transition = 'none'; im.style.transition = 'none';
      o.style.clipPath = fr.css; o.style.webkitClipPath = fr.css;
      im.style.transform = imgFromFrame(fr, v);
      void o.offsetWidth;
      o.style.transition = `clip-path ${dDur}ms ${ease}, -webkit-clip-path ${dDur}ms ${ease}`;
      im.style.transition = `transform ${dDur}ms ${ease}`;
      o.style.clipPath = 'inset(0px 0px 0px 0px round 0px)'; o.style.webkitClipPath = 'inset(0px 0px 0px 0px round 0px)';
      im.style.transform = 'none';
      if (overlayRef.current) overlayRef.current.focus({ preventScroll: true });
      const t = setTimeout(() => setDetail((d) => (d && d.phase === 'opening' ? { ...d, phase: 'open' } : d)), dDur);
      return () => clearTimeout(t);
    }
    if (detail.phase === 'closing') {
      const fr = frameInset(v);
      const d = Math.round(dDur * 0.85);
      o.style.transition = `clip-path ${d}ms ${ease}, -webkit-clip-path ${d}ms ${ease}`;
      im.style.transition = `transform ${d}ms ${ease}`;
      o.style.clipPath = fr.css; o.style.webkitClipPath = fr.css;
      im.style.transform = imgFromFrame(fr, v);
      const t = setTimeout(() => {
        const r = rowRefs.current[detail.i];
        setDetail(null);
        if (r) r.focus({ preventScroll: true });
      }, d + 30);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [detail && detail.phase]); // eslint-disable-line react-hooks/exhaustive-deps

  const reopen = () => {
    const o = dOuter.current; const im = dImg.current;
    if (!o || !im || !detail || detail.phase !== 'closing') return;
    o.style.transition = `clip-path ${dDur}ms ${easeOut}, -webkit-clip-path ${dDur}ms ${easeOut}`;
    im.style.transition = `transform ${dDur}ms ${easeOut}`;
    o.style.clipPath = 'inset(0px 0px 0px 0px round 0px)'; o.style.webkitClipPath = 'inset(0px 0px 0px 0px round 0px)';
    im.style.transform = 'none';
    setDetail((d) => (d ? { ...d, phase: 'open' } : d));
  };

  const nextProject = () => {
    if (!detail || detail.phase !== 'open') return;
    const n = (detail.i + 1) % N;
    setActive(n);
    setDetail((d) => ({ ...d, i: n, k: (d.k || 0) + 1 }));
  };

  React.useEffect(() => {
    const ov = overlayRef.current;
    if (!detail || !ov) return undefined;
    const block = (e) => e.preventDefault();
    ov.addEventListener('wheel', block, { passive: false });
    ov.addEventListener('touchmove', block, { passive: false });
    return () => { ov.removeEventListener('wheel', block); ov.removeEventListener('touchmove', block); };
  }, [!!detail]); // eslint-disable-line react-hooks/exhaustive-deps

  const focusRow = (i) => { const r = rowRefs.current[(i + N) % N]; if (r) r.focus(); };
  const onKey = (e) => {
    if (detail) {
      if (e.key === 'Escape') { e.preventDefault(); if (detail.phase === 'closing') reopen(); else close(); }
      else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); nextProject(); }
      else if ([' ', 'PageDown', 'PageUp', 'ArrowUp'].includes(e.key)) e.preventDefault();
      return;
    }
    const at = rowRefs.current.indexOf(document.activeElement);
    if (at < 0) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); focusRow(at + 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); focusRow(at - 1); }
    else if (e.key === 'Home') { e.preventDefault(); focusRow(0); }
    else if (e.key === 'End') { e.preventDefault(); focusRow(N - 1); }
  };

  const sans = '"Inter", -apple-system, "Helvetica Neue", Arial, sans-serif';
  const display = titleFont === 'Inter' ? sans : titleFont === 'Inter Tight' ? `"Inter Tight", ${sans}` : `"${titleFont}", "Iowan Old Style", Georgia, serif`;
  const serifish = titleFont === 'Instrument Serif' || titleFont === 'Fraunces';
  const filterCss = treatment === 'grayscale' ? 'grayscale(1) contrast(1.05)' : treatment === 'muted' ? 'saturate(0.6) contrast(0.97)' : 'none';
  const pad2 = (v) => String(v).padStart(2, '0');
  const btnReset = { appearance: 'none', border: 'none', background: 'transparent', padding: 0, margin: 0, font: 'inherit', color: 'inherit', textAlign: 'left', cursor: 'pointer' };
  const gridCols = compact ? '28px 1fr' : `${showNumbers ? '72px ' : ''}minmax(0,1fr) minmax(140px, 22%) 72px`;
  const tr = reduced ? 0 : 1;
  const detailShown = detail && detail.phase !== 'closing';
  const dI = detail ? detail.i : 0;

  if (!N) {
    return (
      <section className="hover-preview-list" style={{ width: '100%', minHeight: 420, background: bg, color: muted, display: 'grid', placeItems: 'center', fontFamily: sans, fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
        Add projects and image URLs to begin
      </section>
    );
  }

  return (
    <section
      ref={rootRef}
      className={`hover-preview-list ${uid}`}
      aria-label={eyebrow || 'Projects'}
      onKeyDown={onKey}
      style={{ position: 'relative', width: '100%', background: bg, color: text, fontFamily: sans, boxSizing: 'border-box', padding: `${compact ? 36 : Math.round(pad * 1.2)}px ${pad}px ${compact ? 40 : pad * 1.4}px`, overflow: 'hidden' }}
    >
      <style>{`
        .${uid} .${uid}-row:focus-visible { outline: 2px solid ${accent}; outline-offset: -2px; }
        .${uid} button:focus-visible { outline: 2px solid ${accent}; outline-offset: 3px; }
        @keyframes ${uid}-rise { from { transform: translateY(105%); } to { transform: none; } }
        @keyframes ${uid}-fade { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
        @keyframes ${uid}-line { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @media (prefers-reduced-motion: reduce) { .${uid} * { animation: none !important; transition: none !important; } }
      `}</style>

      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, marginBottom: compact ? 28 : Math.round(pad * 0.9), fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', animation: reduced ? 'none' : `${uid}-fade 800ms ${easeOut} both` }}>
        <span>{eyebrow} <span style={{ color: muted, marginLeft: 6, fontVariantNumeric: 'tabular-nums' }}>({pad2(N)})</span></span>
        <span style={{ color: muted }}>{aside}</span>
      </header>

      {showLabels && !compact && (
        <div aria-hidden="true" style={{ display: 'grid', gridTemplateColumns: gridCols, gap: 24, paddingBottom: 12, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: muted, animation: reduced ? 'none' : `${uid}-fade 800ms ${easeOut} 100ms both` }}>
          {showNumbers && <span>No.</span>}
          <span>{projectLabel}</span>
          <span>{clientLabel}</span>
          <span style={{ textAlign: 'right' }}>{yearLabel}</span>
        </div>
      )}

      <div ref={listRef} role="list" onPointerMove={onListMove} onPointerLeave={onListLeave} onPointerEnter={onListEnter} style={{ position: 'relative' }}>
        <div aria-hidden="true" style={{ height: 1, background: line, transformOrigin: 'left', animation: reduced ? 'none' : `${uid}-line 1100ms ${easeOut} both` }} />
        {Array.from({ length: N }).map((_, i) => {
          const on = i === active;
          const dim = dimOthers && !on;
          return (
            <div role="listitem" key={i} style={{ position: 'relative', animation: reduced ? 'none' : `${uid}-fade 900ms ${easeOut} ${160 + i * 70}ms both` }}>
              <button
                ref={(el) => { rowRefs.current[i] = el; }}
                className={`${uid}-row`}
                aria-expanded={!!(detail && detail.i === i)}
                aria-label={`${titles[i]}${clients[i] ? ', ' + clients[i] : ''}${years[i] ? ', ' + years[i] : ''}${openDetail ? ' — open project' : ''}`}
                onPointerEnter={(e) => { if (e.pointerType === 'mouse' && !detail) setActive(i); }}
                onPointerUp={(e) => {
                  if (e.pointerType === 'mouse') return;
                  if (i !== active) { tapGuard.current = i; setActive(i); }
                }}
                onClick={() => { if (tapGuard.current === i) { tapGuard.current = -1; return; } open(i); }}
                onFocus={() => { if (!sim.current.inside) setActive(i); }}
                style={{ ...btnReset, display: 'grid', gridTemplateColumns: gridCols, gap: compact ? 12 : 24, alignItems: 'baseline', width: '100%', padding: `${rowPad}px 0`, cursor: openDetail ? 'pointer' : 'default', opacity: dim ? 0.32 : 1, transition: `opacity ${600 * tr}ms ${easeOut}` }}
              >
                {(showNumbers || compact) && (
                  <span style={{ position: 'relative', fontSize: 12, letterSpacing: '0.08em', color: on ? accent : muted, fontVariantNumeric: 'tabular-nums', transition: `color ${400 * tr}ms` }}>{pad2(i + 1)}</span>
                )}
                <span style={{ minWidth: 0 }}>
                  <span style={{ position: 'relative', display: 'block', overflow: 'hidden', paddingBottom: '0.06em', marginBottom: '-0.06em' }}>
                    <span aria-hidden="true" style={{ position: 'absolute', left: 0, top: '50%', width: Math.max(10, indent - 12), height: 1, background: accent, transformOrigin: 'left', transform: on && indent ? 'scaleX(1)' : 'scaleX(0)', transition: `transform ${700 * tr}ms ${easeOut} ${on ? 80 * tr : 0}ms` }} />
                    <span style={{ display: 'block', fontFamily: display, fontWeight: titleWeight, fontSize: tSize, lineHeight: 1.04, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', letterSpacing: on ? (serifish ? '0.005em' : '-0.02em') : (serifish ? '-0.02em' : '-0.045em'), transform: on ? `translateX(${indent}px)` : 'none', fontStyle: on && titleFont === 'Instrument Serif' ? 'italic' : 'normal', transition: `transform ${800 * tr}ms ${easeOut}, letter-spacing ${800 * tr}ms ${easeOut}` }}>{titles[i]}</span>
                  </span>
                  {compact && (
                    <span style={{ display: 'block', marginTop: 6, fontSize: 12, color: muted, transform: on ? `translateX(${Math.round(indent / 2)}px)` : 'none', transition: `transform ${800 * tr}ms ${easeOut}` }}>{clients[i]}{years[i] ? ` · ${years[i]}` : ''}</span>
                  )}
                </span>
                {!compact && <span ref={(el) => { clientRefs.current[i] = el; }} style={{ fontSize: 14, color: on ? text : muted, transition: `color ${400 * tr}ms`, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{clients[i]}<span style={{ display: 'block', fontSize: 12, color: muted, marginTop: 4 }}>{disciplines[i] || ''}</span></span>}
                {!compact && <span style={{ fontSize: 14, textAlign: 'right', fontVariantNumeric: 'tabular-nums', color: on ? text : muted }}>{years[i]}</span>}
              </button>
              <div aria-hidden="true" style={{ height: 1, background: line, transformOrigin: 'left', animation: reduced ? 'none' : `${uid}-line 1100ms ${easeOut} ${120 + i * 70}ms both` }} />
            </div>
          );
        })}
      </div>

      <div
        ref={frameRef}
        aria-hidden="true"
        style={{ position: 'absolute', left: 0, top: 0, width: fw, height: fh, pointerEvents: 'none', zIndex: 5, willChange: 'transform', transformOrigin: '50% 50%', visibility: detail ? 'hidden' : 'visible', opacity: 0 }}
      >
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 2, background: line, boxShadow: '0 30px 60px -24px rgba(28,25,23,0.45)' }}>
          {Array.from({ length: N }).map((_, i) => (
            <div key={i} ref={(el) => { layerRefs.current[i] = el; }} style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: i === 0 ? 2 : 1, clipPath: i === 0 ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)' }}>
              <img ref={(el) => { layerImgRefs.current[i] = el; }} src={images[i]} alt="" draggable="false" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: filterCss }} />
            </div>
          ))}
        </div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: '100%', marginTop: 10, display: 'flex', justifyContent: 'space-between', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: text, opacity: hovering || !compact ? 1 : 0 }}>
          <span>{disciplines[active] || ''}</span>
          <span style={{ color: muted }}>{openDetail ? 'View' : ''}</span>
        </div>
      </div>

      {detail && (
        <div ref={overlayRef} role="dialog" aria-modal="true" aria-label={titles[dI]} tabIndex={-1} style={{ position: 'absolute', left: 0, width: '100%', top: vp.top, height: vp.h, zIndex: 20, outline: 'none' }}>
          <div ref={dOuter} onClick={() => (detail.phase === 'closing' ? reopen() : close())} style={{ position: 'absolute', inset: 0, overflow: 'hidden', cursor: 'zoom-out', background: '#0C0C0D' }}>
            <img ref={dImg} key={`d${dI}`} src={images[dI]} alt={`${titles[dI]} — ${descriptions[dI] || ''}`} draggable="false" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', transformOrigin: '50% 50%', filter: filterCss, animation: detail.k && !reduced ? `${uid}-fade 700ms ${easeOut} both` : 'none' }} />
            <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 25%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.65) 100%)', opacity: detailShown ? 1 : 0, transition: `opacity ${600 * tr}ms` }} />
          </div>
          {detailShown && (
            <div key={`c${dI}`} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', color: '#FAFAF9' }}>
              <div style={{ position: 'absolute', left: pad, right: pad, top: compact ? 20 : 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', pointerEvents: 'auto' }}>
                <span style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', fontVariantNumeric: 'tabular-nums', animation: reduced ? 'none' : `${uid}-fade 600ms ${easeOut} ${Math.round(dDur * 0.6)}ms both` }}>{pad2(dI + 1)} / {pad2(N)} — {disciplines[dI] || ''}</span>
                <span style={{ display: 'flex', gap: 8, animation: reduced ? 'none' : `${uid}-fade 600ms ${easeOut} ${Math.round(dDur * 0.65)}ms both` }}>
                  {N > 1 && <button onClick={nextProject} style={{ ...btnReset, height: 40, padding: '0 16px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.35)', background: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', color: '#FAFAF9', fontSize: 12, letterSpacing: '0.06em' }}>Next project →</button>}
                  <button onClick={close} aria-label="Close project" style={{ ...btnReset, height: 40, padding: '0 16px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.35)', background: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', color: '#FAFAF9', fontSize: 12, letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: 10 }}>
                    Close
                    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M1 1l8 8M9 1 1 9" stroke="currentColor" strokeWidth="1.2" fill="none" /></svg>
                  </button>
                </span>
              </div>
              <div style={{ position: 'absolute', left: pad, right: pad, bottom: compact ? 24 : pad, display: 'flex', flexDirection: compact ? 'column' : 'row', justifyContent: 'space-between', alignItems: compact ? 'flex-start' : 'flex-end', gap: compact ? 16 : 48 }}>
                <div style={{ overflow: 'hidden', paddingBottom: '0.08em', minWidth: 0 }}>
                  <h3 style={{ margin: 0, fontFamily: display, fontWeight: titleWeight, fontSize: compact ? 48 : Math.round(Math.min(132, width * 0.09)), lineHeight: 0.95, letterSpacing: serifish ? '-0.02em' : '-0.045em', animation: reduced ? 'none' : `${uid}-rise 1000ms ${easeOut} ${detail.k ? 100 : Math.round(dDur * 0.5)}ms both` }}>{titles[dI]}</h3>
                </div>
                <div style={{ maxWidth: 360, flexShrink: 0, animation: reduced ? 'none' : `${uid}-fade 800ms ${easeOut} ${detail.k ? 200 : Math.round(dDur * 0.7)}ms both` }}>
                  <div style={{ display: 'flex', gap: 24, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 12, opacity: 0.85 }}>
                    <span>{clients[dI]}</span><span>{years[dI]}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: compact ? 14 : 15, lineHeight: 1.6, fontWeight: 300, opacity: 0.9 }}>{descriptions[dI] || ''}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

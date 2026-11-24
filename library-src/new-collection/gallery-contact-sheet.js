const MANIFEST = {
  "type": "Gallery.ContactSheet",
  "description": "A film contact sheet with sprocket holes and edge numbers: a hand-drawn red grease-pencil loop circles the chosen frame, rejects are crossed out, and a click expands the frame from its exact position into a large print",
  "editorElement": {
    "selector": ".contact-sheet-gallery",
    "displayName": "Contact Sheet Gallery",
    "archetype": "container",
    "data": {
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Contact sheet / Roll 07", "group": "Content" },
      "title": { "dataType": "text", "displayName": "Title", "defaultValue": "Twelve frames, one keeper", "group": "Content" },
      "description": { "dataType": "text", "displayName": "Description", "defaultValue": "Select a frame to circle it and pull a print. Arrow keys walk the roll, X rejects.", "group": "Content" },
      "rollLabel": { "dataType": "text", "displayName": "Roll Label", "defaultValue": "Roll 07", "group": "Content" },
      "filmStock": { "dataType": "text", "displayName": "Film Edge Print", "defaultValue": "STUDIO PAN 400", "group": "Content" },
      "pencilNote": { "dataType": "text", "displayName": "Grease Pencil Note", "defaultValue": "print 11x14", "group": "Content" },
      "images": { "dataType": "text", "displayName": "Image URLs (comma separated)", "defaultValue": "https://picsum.photos/seed/pier/1200/900,https://picsum.photos/seed/alley/1200/900,https://picsum.photos/seed/stair/1200/900,https://picsum.photos/seed/window/1200/900,https://picsum.photos/seed/crowd/1200/900,https://picsum.photos/seed/bridge/1200/900,https://picsum.photos/seed/portrait/1200/900,https://picsum.photos/seed/station/1200/900,https://picsum.photos/seed/rooftop/1200/900,https://picsum.photos/seed/market/1200/900,https://picsum.photos/seed/shadow/1200/900,https://picsum.photos/seed/tram/1200/900", "group": "Images" },
      "captions": { "dataType": "text", "displayName": "Captions (separate with |)", "defaultValue": "The pier, 6 am|Back alley|Stairwell|Window light|Crowd at noon|Under the bridge|Portrait of A.|Central station|Rooftops|Market day|Long shadow|Last tram", "group": "Images" },
      "grayscale": { "dataType": "booleanValue", "displayName": "Black & White Images", "defaultValue": "true", "group": "Images" },
      "selectedFrame": { "dataType": "text", "displayName": "Circled Frame (number)", "defaultValue": "7", "group": "Images" },
      "rejectedFrames": { "dataType": "text", "displayName": "Rejected Frames (numbers, comma separated)", "defaultValue": "3,10", "group": "Images" },
      "variant": { "dataType": "select", "displayName": "Variant", "defaultValue": "paper", "options": ["paper", "darkroom"], "group": "Layout" },
      "paperColor": { "dataType": "color", "displayName": "Paper", "defaultValue": "#F2F0EB", "group": "Colors" },
      "filmColor": { "dataType": "color", "displayName": "Film Stock", "defaultValue": "#111111", "group": "Colors" },
      "sprocketColor": { "dataType": "color", "displayName": "Sprocket Holes", "defaultValue": "#E7E5E4", "group": "Colors" },
      "inkColor": { "dataType": "color", "displayName": "Text", "defaultValue": "#1C1917", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#78716C", "group": "Colors" },
      "markColor": { "dataType": "color", "displayName": "Grease Pencil", "defaultValue": "#D7261E", "group": "Colors" },
      "darkroomMarkColor": { "dataType": "color", "displayName": "Grease Pencil (Darkroom)", "defaultValue": "#F5F0E8", "group": "Colors" },
      "titleFont": { "dataType": "select", "displayName": "Title Font", "defaultValue": "Inter", "options": ["Inter", "Instrument Serif", "Fraunces", "Georgia"], "group": "Typography" },
      "titleSize": { "dataType": "select", "displayName": "Title Size (px)", "defaultValue": "56", "options": ["40", "48", "56", "64", "72"], "group": "Typography" },
      "titleWeight": { "dataType": "select", "displayName": "Title Weight", "defaultValue": "300", "options": ["300", "400", "500"], "group": "Typography" },
      "sectionHeight": { "dataType": "select", "displayName": "Section Height", "defaultValue": "fill", "options": ["fill", "640", "720", "800", "900"], "group": "Layout", "description": "fill = height of the visible canvas" },
      "framesPerStrip": { "dataType": "select", "displayName": "Frames per Strip", "defaultValue": "auto", "options": ["auto", "3", "4", "5", "6"], "group": "Layout" },
      "handPlaced": { "dataType": "booleanValue", "displayName": "Hand-placed Strips", "defaultValue": "true", "group": "Layout" },
      "showEdgeNumbers": { "dataType": "booleanValue", "displayName": "Edge Numbers", "defaultValue": "true", "group": "Layout" },
      "showNote": { "dataType": "booleanValue", "displayName": "Show Pencil Note", "defaultValue": "true", "group": "Layout" },
      "openOnClick": { "dataType": "booleanValue", "displayName": "Open Print on Click", "defaultValue": "true", "group": "Animation" },
      "entrance": { "dataType": "booleanValue", "displayName": "Entrance Animation", "defaultValue": "true", "group": "Animation" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const eyebrow = config?.eyebrow || 'Contact sheet / Roll 07';
  const title = config?.title || 'Twelve frames, one keeper';
  const description = config?.description || 'Select a frame to circle it and pull a print. Arrow keys walk the roll, X rejects.';
  const rollLabel = config?.rollLabel || 'Roll 07';
  const filmStock = config?.filmStock || 'STUDIO PAN 400';
  const pencilNote = config?.pencilNote || 'print 11x14';
  const defaultImages = 'pier,alley,stair,window,crowd,bridge,portrait,station,rooftop,market,shadow,tram'
    .split(',').map((s) => `https://picsum.photos/seed/${s}/1200/900`).join(',');
  const grayscale = bool(config?.grayscale, true);
  const imagesRaw = config?.images || defaultImages;
  const captionsRaw = config?.captions || 'The pier, 6 am|Back alley|Stairwell|Window light|Crowd at noon|Under the bridge|Portrait of A.|Central station|Rooftops|Market day|Long shadow|Last tram';
  const selectedRaw = config?.selectedFrame || '7';
  const rejectedRaw = config?.rejectedFrames || '3,10';
  const variant = config?.variant || 'paper';
  const dark = variant === 'darkroom';
  const paper = dark ? '#120A09' : (config?.paperColor || '#F2F0EB');
  const film = config?.filmColor || '#111111';
  const sprocket = dark ? '#2A1714' : (config?.sprocketColor || '#E7E5E4');
  const ink = dark ? '#E9D6CF' : (config?.inkColor || '#1C1917');
  const muted = dark ? '#9A6F66' : (config?.mutedColor || '#78716C');
  const mark = dark ? (config?.darkroomMarkColor || '#F5F0E8') : (config?.markColor || '#D7261E');
  const titleFont = config?.titleFont || 'Inter';
  const titleSize = parseInt(config?.titleSize || '56', 10);
  const titleWeight = config?.titleWeight || '300';
  const sectionHeight = config?.sectionHeight || 'fill';
  const fpsSetting = config?.framesPerStrip || 'auto';
  const handPlaced = bool(config?.handPlaced, true);
  const showEdge = bool(config?.showEdgeNumbers, true);
  const showNote = bool(config?.showNote, true);
  const openOnClick = bool(config?.openOnClick, true);
  const entrance = bool(config?.entrance, true);

  const images = React.useMemo(() => imagesRaw.split(',').map((s) => s.trim()).filter(Boolean).map((u) => {
    if (!grayscale || !/picsum\.photos/.test(u) || /grayscale/.test(u)) return u;
    return u + (u.includes('?') ? '&grayscale' : '?grayscale');
  }), [imagesRaw, grayscale]);
  const captions = React.useMemo(() => captionsRaw.split('|').map((s) => s.trim()), [captionsRaw]);
  const n = images.length;

  const uid = React.useMemo(() => 'gcs' + Math.random().toString(36).slice(2, 8), []);
  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  React.useEffect(() => {
    const id = 'ncs-fonts-gallery-contact';
    if (document.getElementById(id)) return;
    const l = document.createElement('link');
    l.id = id;
    l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Caveat:wght@500&family=Inter:wght@300;400;500&family=Instrument+Serif&family=Fraunces:opsz,wght@9..144,300;9..144,400&family=IBM+Plex+Mono:wght@400;500&display=swap';
    document.head.appendChild(l);
  }, []);

  const rootRef = React.useRef(null);
  const frameRefs = React.useRef([]);
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

  const parseSel = () => Math.max(0, Math.min(Math.max(0, n - 1), (parseInt(selectedRaw, 10) || 1) - 1));
  const parseRej = () => new Set(rejectedRaw.split(',').map((s) => parseInt(s, 10) - 1).filter((k) => k >= 0));
  const [selected, setSelected] = React.useState(parseSel);
  const [rejected, setRejected] = React.useState(parseRej);
  const [drawKey, setDrawKey] = React.useState(0);
  const [entered, setEntered] = React.useState(reduced || !entrance);
  const [loaded, setLoaded] = React.useState({});
  const [print, setPrint] = React.useState(null);
  const openTimer = React.useRef(0);
  React.useEffect(() => { setSelected(parseSel()); }, [selectedRaw, n]); // eslint-disable-line react-hooks/exhaustive-deps
  React.useEffect(() => { setRejected(parseRej()); }, [rejectedRaw]); // eslint-disable-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    if (entered) return undefined;
    const t = setTimeout(() => setEntered(true), 50);
    return () => clearTimeout(t);
  }, [entered]);
  React.useEffect(() => () => clearTimeout(openTimer.current), []);

  const compact = width < 760;
  const H = sectionHeight === 'fill' ? Math.max(compact ? 680 : 600, Math.min(980, stageH)) : parseInt(sectionHeight, 10);
  const perStrip = fpsSetting === 'auto' ? (compact ? 3 : width < 1100 ? 4 : 6) : parseInt(fpsSetting, 10);
  const strips = [];
  for (let k = 0; k < n; k += perStrip) strips.push(images.slice(k, k + perStrip).map((_, j) => k + j));
  const sideM = compact ? 16 : 56;
  const sheetW = width - sideM * 2;
  const gap = Math.max(4, Math.round(sheetW * 0.006));
  const endPad = Math.round(sheetW * (compact ? 0.03 : 0.022));
  const headerH = compact ? 168 : 196;
  const footH = compact ? 30 : 64;
  const stripGap = compact ? 30 : 34;
  const fwByW = (sheetW - endPad * 2 - gap * (perStrip - 1)) / perStrip;
  const rebT = (fw) => Math.max(14, Math.round(fw * 0.12));
  const rebB = (fw) => Math.max(18, Math.round(fw * 0.16));
  const availH = H - headerH - footH;
  const fhByH = (availH - stripGap * (strips.length - 1)) / Math.max(1, strips.length);
  let fw = fwByW;
  if ((fw / 1.5) + rebT(fw) + rebB(fw) > fhByH) fw = Math.max(60, fhByH / (1 / 1.5 + 0.28));
  fw = Math.floor(fw);
  const fh = Math.round(fw / 1.5);
  const rt = rebT(fw);
  const rb = rebB(fw);
  const stripH = fh + rt + rb;
  const stripW = Math.round(endPad * 2 + fw * perStrip + gap * (perStrip - 1));
  const rnd = (i, salt) => {
    const x = Math.sin((i + 1) * 63.71 + salt * 19.19) * 31337.77;
    return x - Math.floor(x);
  };
  const stripTilt = (s) => (handPlaced ? (rnd(s, 1) - 0.5) * 1.1 : 0);
  const stripShift = (s) => (handPlaced ? (rnd(s, 2) - 0.5) * Math.min(28, sideM * 0.6) : 0);
  const frameX = (j) => endPad + j * (fw + gap);
  const sheetTop = headerH + Math.max(0, (availH - (stripH * strips.length + stripGap * (strips.length - 1))) / 2);

  const wobblePath = (x, y, w, h, seed) => {
    const cx = x + w / 2;
    const cy = y + h / 2;
    const rx = w / 2;
    const ry = h / 2;
    const ex = 2.6;
    const a0 = -2.5 + rnd(seed, 5) * 0.8;
    const N = 18;
    const pts = [];
    for (let k = 0; k <= N; k++) {
      const t = k / N;
      const a = a0 + t * (Math.PI * 2 + 0.6);
      const c = Math.cos(a);
      const s = Math.sin(a);
      const sx = Math.sign(c) * Math.pow(Math.abs(c), 2 / ex);
      const sy = Math.sign(s) * Math.pow(Math.abs(s), 2 / ex);
      const wob = 1 + (rnd(seed * 17 + k, 6) - 0.5) * 0.06 + (0.03 - t * 0.065);
      pts.push([cx + sx * rx * wob, cy + sy * ry * wob]);
    }
    let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
    for (let k = 0; k < pts.length - 1; k++) {
      const p0 = pts[Math.max(0, k - 1)];
      const p1 = pts[k];
      const p2 = pts[k + 1];
      const p3 = pts[Math.min(pts.length - 1, k + 2)];
      d += ` C ${(p1[0] + (p2[0] - p0[0]) / 6).toFixed(1)} ${(p1[1] + (p2[1] - p0[1]) / 6).toFixed(1)} ${(p2[0] - (p3[0] - p1[0]) / 6).toFixed(1)} ${(p2[1] - (p3[1] - p1[1]) / 6).toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
    }
    return d;
  };
  const crossPaths = (x, y, w, h, seed) => {
    const ix = w * 0.14;
    const iy = h * 0.12;
    const j = (k) => (rnd(seed * 7 + k, 9) - 0.5) * w * 0.06;
    return [
      `M ${x + ix + j(1)} ${y + iy + j(2)} Q ${x + w / 2 + j(3)} ${y + h / 2 + j(4) - 4} ${x + w - ix + j(5)} ${y + h - iy + j(6)}`,
      `M ${x + w - ix + j(7)} ${y + iy + j(8)} Q ${x + w / 2 + j(9) + 3} ${y + h / 2 + j(10)} ${x + ix + j(11)} ${y + h - iy + j(12)}`
    ];
  };

  const scaleOf = () => {
    const el = rootRef.current;
    if (!el || !el.offsetWidth) return 1;
    return el.getBoundingClientRect().width / el.offsetWidth || 1;
  };
  const relRect = (el) => {
    const root = rootRef.current;
    if (!el || !root) return null;
    const a = el.getBoundingClientRect();
    const b = root.getBoundingClientRect();
    const sc = scaleOf();
    return { x: (a.left - b.left) / sc, y: (a.top - b.top) / sc, w: a.width / sc, h: a.height / sc };
  };
  const printBox = React.useMemo(() => {
    const border = compact ? 12 : 22;
    if (compact) {
      const w = width - 40 - border * 2;
      return { x: 20 + border, y: 96 + border, w, h: Math.round(w / 1.5), border };
    }
    const w = Math.round(Math.min(width * 0.56, (H - 220) * 1.5));
    const h = Math.round(w / 1.5);
    return { x: Math.round(width * 0.07) + border, y: Math.round((H - h) / 2) - 10, w, h, border };
  }, [compact, width, H]);

  const select = (i) => {
    if (i < 0 || i >= n) return;
    setSelected(i);
    setDrawKey((k) => k + 1);
  };
  const openPrint = (i) => {
    const from = relRect(frameRefs.current[i]);
    if (reduced || !from) { setPrint({ i, stage: 'in', from: null }); return; }
    setPrint({ i, stage: 'pre', from });
  };
  const closePrint = () => {
    if (!print) return;
    if (reduced) { setPrint(null); return; }
    const from = relRect(frameRefs.current[print.i]);
    setPrint({ ...print, stage: 'out', from: from || print.from });
  };
  const onFrameClick = (i) => {
    clearTimeout(openTimer.current);
    const same = i === selected;
    select(i);
    if (!openOnClick) return;
    if (same || reduced) openPrint(i);
    else openTimer.current = setTimeout(() => openPrint(i), 420);
  };
  const printNav = (dir) => {
    if (!print) return;
    const i = Math.max(0, Math.min(n - 1, print.i + dir));
    if (i === print.i) return;
    select(i);
    setPrint({ i, stage: 'in', from: relRect(frameRefs.current[i]), swap: Date.now() });
  };
  React.useEffect(() => {
    if (!print) return undefined;
    if (print.stage === 'pre') {
      let r2 = 0;
      const r1 = requestAnimationFrame(() => { r2 = requestAnimationFrame(() => setPrint((p) => (p && p.stage === 'pre' ? { ...p, stage: 'in' } : p))); });
      return () => { cancelAnimationFrame(r1); cancelAnimationFrame(r2); };
    }
    if (print.stage === 'in' && closeRef.current && !print.swap) closeRef.current.focus({ preventScroll: true });
    if (print.stage === 'out') {
      const t = setTimeout(() => {
        setPrint(null);
        const f = frameRefs.current[selected];
        if (f) f.focus({ preventScroll: true });
      }, 600);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [print]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleReject = (i) => setRejected((r) => { const s = new Set(r); if (s.has(i)) s.delete(i); else s.add(i); return s; });
  const onKeyDown = (e) => {
    const k = e.key;
    if (print) {
      if (k === 'Escape') { e.preventDefault(); closePrint(); }
      else if (k === 'ArrowRight') { e.preventDefault(); printNav(1); }
      else if (k === 'ArrowLeft') { e.preventDefault(); printNav(-1); }
      return;
    }
    let nx = -1;
    if (k === 'ArrowRight') nx = selected + 1;
    else if (k === 'ArrowLeft') nx = selected - 1;
    else if (k === 'ArrowDown') nx = selected + perStrip;
    else if (k === 'ArrowUp') nx = selected - perStrip;
    else if (k === 'Home') nx = 0;
    else if (k === 'End') nx = n - 1;
    if (nx !== -1) {
      e.preventDefault();
      const c = Math.max(0, Math.min(n - 1, nx));
      if (c !== selected) select(c);
      const f = frameRefs.current[c];
      if (f) f.focus({ preventScroll: true });
      return;
    }
    if (k === 'x' || k === 'X') { e.preventDefault(); toggleReject(selected); }
    else if (k === 'Enter' && e.target === rootRef.current) { e.preventDefault(); openPrint(selected); }
  };

  const mono = '"IBM Plex Mono", ui-monospace, "SF Mono", Menlo, monospace';
  const sans = 'Inter, -apple-system, "Helvetica Neue", Arial, sans-serif';
  const hand = '"Caveat", "Bradley Hand", "Segoe Print", cursive';
  const serif = titleFont === 'Inter' ? sans : titleFont === 'Georgia' ? 'Georgia, serif' : `"${titleFont}", Georgia, "Times New Roman", serif`;
  const pad2 = (v) => String(v).padStart(2, '0');
  const imgFilter = dark ? 'grayscale(1) sepia(1) hue-rotate(-38deg) saturate(2.6) brightness(.62) contrast(1.15)' : 'contrast(1.04)';
  const strokeW = compact ? 2.3 : 3.2;
  const holeW = Math.max(3, ((fw + gap) / 8) * 0.46);
  const holeH = Math.max(4, rt * 0.4);
  const holePitch = (fw + gap) / 8;
  const edgeFont = Math.max(7, Math.round(fw * 0.048));

  const pStage = print ? print.stage : null;
  const pFrom = print && print.from;
  const flip = (pStage === 'pre' || pStage === 'out') && pFrom
    ? `translate(${pFrom.x - printBox.x}px, ${pFrom.y - printBox.y}px) scale(${pFrom.w / printBox.w}, ${pFrom.h / printBox.h})`
    : 'none';
  const iconBtn = {
    appearance: 'none', border: `1px solid ${muted}77`, background: 'transparent', color: ink, cursor: 'pointer', width: 40, height: 40,
    borderRadius: 999, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, transition: 'background 200ms, border-color 200ms'
  };
  const selStrip = Math.floor(selected / perStrip);
  const selCol = selected % perStrip;

  return (
    <section ref={rootRef} className={`contact-sheet-gallery ${uid}`} role="region" aria-label={title} tabIndex={0} onKeyDown={onKeyDown}
      style={{ position: 'relative', width: '100%', height: `${H}px`, overflow: 'hidden', background: paper, color: ink, fontFamily: sans, outline: 'none' }}>
      <style>{`
        .${uid}-f:focus-visible, .${uid}-b:focus-visible { outline: 2px solid ${mark}; outline-offset: 3px; }
        .${uid}-f:hover img { filter: ${imgFilter} brightness(1.08) !important; }
        .${uid}-b:hover { background: ${ink}10 !important; border-color: ${ink}aa !important; }
        @keyframes ${uid}-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
        @keyframes ${uid}-ink { from { opacity: 0; transform: translateY(4px) rotate(-6deg); } to { opacity: 1; transform: rotate(-6deg); } }
        @keyframes ${uid}-fade { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
      <svg aria-hidden="true" width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id={`${uid}-rough`} x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="3" result="t" />
            <feDisplacementMap in="SourceGraphic" in2="t" scale="2.4" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id={`${uid}-grain`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0" />
          </filter>
          <pattern id={`${uid}-holes`} x={endPad - holePitch / 2 + (holePitch - holeW) / 2} y="0" width={holePitch} height={holeH} patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width={holeW} height={holeH} rx={Math.min(2, holeW * 0.3)} fill={sprocket} />
          </pattern>
        </defs>
      </svg>
      {dark && <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 55% at 50% 0%, rgba(190,40,25,.32) 0%, rgba(120,20,10,.08) 55%, transparent 80%)' }} />}
      <svg aria-hidden="true" width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: dark ? 0.12 : 0.07, mixBlendMode: 'multiply', pointerEvents: 'none' }}>
        <rect width="100%" height="100%" filter={`url(#${uid}-grain)`} />
      </svg>

      <div style={{ position: 'absolute', left: sideM + (compact ? 4 : 0), right: sideM, top: compact ? 28 : 52, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24 }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: muted, marginBottom: compact ? 10 : 16 }}>{eyebrow}</div>
          <h2 style={{ margin: 0, fontFamily: serif, fontSize: compact ? Math.round(titleSize * 0.6) : titleSize, fontWeight: titleWeight, lineHeight: 1.02, letterSpacing: titleFont === 'Inter' ? '-0.04em' : '-0.015em', textWrap: 'balance' }}>{title}</h2>
          <p style={{ margin: compact ? '10px 0 0' : '14px 0 0', fontSize: compact ? 13 : 14.5, lineHeight: 1.55, color: muted, fontWeight: 300, maxWidth: 460 }}>{description}</p>
        </div>
        {!compact && (
          <div aria-hidden="true" style={{ display: 'flex', gap: 28, fontFamily: mono, fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: muted, paddingBottom: 4, flexShrink: 0 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              <svg width="26" height="16" viewBox="0 0 26 16"><path d={wobblePath(2, 2, 22, 12, 4)} fill="none" stroke={mark} strokeWidth="1.6" strokeLinecap="round" /></svg>Select
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              <svg width="16" height="16" viewBox="0 0 16 16"><path d="M3 3 L13 13 M13 3 L3 13" stroke={mark} strokeWidth="1.6" strokeLinecap="round" /></svg>Reject
            </span>
            <span>{rollLabel} &middot; {pad2(n)} exp.</span>
          </div>
        )}
      </div>

      {n === 0 && (
        <div style={{ position: 'absolute', left: sideM, right: sideM, top: headerH + 20, height: 160, background: film, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: mono, fontSize: 12, color: '#A8A29E', letterSpacing: '0.1em', textAlign: 'center', lineHeight: 1.7 }}>
          Unexposed roll.<br />Add image URLs, separated by commas.
        </div>
      )}

      {strips.map((frames, s) => {
        const top = sheetTop + s * (stripH + stripGap);
        const left = sideM + (sheetW - stripW) / 2 + stripShift(s);
        const isSelStrip = s === selStrip;
        return (
          <div key={s} style={{
            position: 'absolute', left, top, width: stripW, height: stripH, background: film, zIndex: isSelStrip ? 3 : 2,
            transform: `${entered ? 'translateX(0)' : `translateX(${s % 2 ? 40 : -40}px)`} rotate(${stripTilt(s)}deg)`, opacity: entered ? 1 : 0,
            transition: reduced ? 'none' : `transform 800ms cubic-bezier(.2,.8,.2,1) ${s * 90}ms, opacity 600ms ease ${s * 90}ms`,
            boxShadow: dark ? '0 10px 30px -12px rgba(0,0,0,.9)' : '0 1px 1px rgba(0,0,0,.18), 0 12px 24px -16px rgba(0,0,0,.45)'
          }}>
            <svg aria-hidden="true" width={stripW} height={stripH} style={{ position: 'absolute', inset: 0 }}>
              <rect x="0" y={(rt - holeH) / 2} width={stripW} height={holeH} fill={`url(#${uid}-holes)`} />
              <rect x="0" y={stripH - rb + (rb * 0.62 - holeH / 2)} width={stripW} height={holeH} fill={`url(#${uid}-holes)`} transform={`translate(0 ${0})`} />
            </svg>
            {showEdge && (
              <div aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, bottom: rb - Math.max(edgeFont + 3, rb * 0.36), height: edgeFont + 2, fontFamily: mono, fontSize: edgeFont, lineHeight: 1, color: dark ? '#B4574A' : '#D6D3D1', letterSpacing: '0.08em', pointerEvents: 'none' }}>
                {frames.map((i, j) => (
                  <React.Fragment key={j}>
                    <span style={{ position: 'absolute', left: frameX(j) + 2 }}>&#9656;{i + 1}</span>
                    <span style={{ position: 'absolute', left: frameX(j) + fw * 0.55 }}>{i + 1}A</span>
                  </React.Fragment>
                ))}
              </div>
            )}
            {showEdge && (
              <div aria-hidden="true" style={{ position: 'absolute', left: frameX(0) + fw * 0.3, top: Math.max(0, (rt - holeH) / 2 - edgeFont - 1), fontFamily: mono, fontSize: Math.max(6, edgeFont - 1), color: dark ? '#7A3A31' : '#8A8580', letterSpacing: '0.24em', whiteSpace: 'nowrap', display: rt - holeH > edgeFont * 2 ? 'block' : 'none' }}>
                {filmStock}
              </div>
            )}
            {frames.map((i, j) => {
              const cap = captions[i] || '';
              const isSel = i === selected;
              const isRej = rejected.has(i);
              return (
                <button key={j} type="button" className={`${uid}-f`} ref={(el) => { frameRefs.current[i] = el; }}
                  tabIndex={isSel ? 0 : -1}
                  aria-label={`Frame ${i + 1}${cap ? ': ' + cap : ''}${isSel ? ', circled' : ''}${isRej ? ', rejected' : ''}. Press to open the print.`}
                  aria-pressed={isSel}
                  onClick={() => onFrameClick(i)}
                  style={{
                    appearance: 'none', border: 0, margin: 0, padding: 0, position: 'absolute', left: frameX(j), top: rt, width: fw, height: fh,
                    background: dark ? '#1F1210' : '#2A2A2A', cursor: 'pointer', overflow: 'hidden', display: 'block',
                    visibility: print && print.i === i && print.stage !== 'out' ? 'hidden' : 'visible'
                  }}>
                  <img src={images[i]} alt={cap || `Frame ${i + 1}`} draggable={false} loading={i < 8 ? 'eager' : 'lazy'}
                    onLoad={() => setLoaded((l) => (l[i] ? l : { ...l, [i]: true }))}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: imgFilter, opacity: loaded[i] ? 1 : 0, transition: reduced ? 'none' : 'opacity 700ms ease, filter 200ms' }} />
                </button>
              );
            })}
            <svg aria-hidden="true" width={stripW} height={stripH} style={{ position: 'absolute', inset: 0, overflow: 'visible', pointerEvents: 'none' }}>
              {frames.map((i, j) => rejected.has(i) && crossPaths(frameX(j), rt, fw, fh, i).map((d, q) => (
                <path key={`${i}-${q}`} d={d} pathLength="1" fill="none" stroke={mark} strokeWidth={strokeW} strokeLinecap="round" filter={`url(#${uid}-rough)`} opacity="0.9"
                  style={{ strokeDasharray: 1, animation: reduced ? 'none' : `${uid}-draw 320ms cubic-bezier(.5,0,.3,1) ${(entered ? 0 : 1000) + q * 200}ms both` }} />
              )))}
              {isSelStrip && n > 0 && (() => {
                const m = Math.max(7, fw * 0.085);
                return (
                  <path key={`loop-${selected}-${drawKey}`} d={wobblePath(frameX(selCol) - m, rt - m * 0.9, fw + m * 2, fh + m * 1.8, selected + drawKey * 3)} pathLength="1"
                    fill="none" stroke={mark} strokeWidth={strokeW + 0.4} strokeLinecap="round" strokeLinejoin="round" filter={`url(#${uid}-rough)`} opacity="0.92"
                    style={{ strokeDasharray: 1, animation: reduced ? 'none' : `${uid}-draw 620ms cubic-bezier(.55,.05,.35,1) ${drawKey === 0 ? 750 : 0}ms both` }} />
                );
              })()}
            </svg>
            {isSelStrip && showNote && pencilNote && n > 0 && (() => {
              const right = selCol < perStrip - 1 || perStrip === 1;
              const x = right ? frameX(selCol) + fw * 0.7 : frameX(selCol) - fw * 0.1;
              return (
                <div key={`note-${selected}-${drawKey}`} aria-hidden="true" style={{
                  position: 'absolute', left: x, top: -Math.max(26, fw * 0.17), fontFamily: hand, fontWeight: 500, fontSize: Math.max(17, Math.round(fw * 0.13)), color: mark,
                  whiteSpace: 'nowrap', transformOrigin: right ? 'left bottom' : 'right bottom', transform: `rotate(-6deg) ${right ? '' : 'translateX(-100%)'}`,
                  animation: reduced ? 'none' : `${uid}-fade 400ms ease ${drawKey === 0 ? 1300 : 520}ms both`, pointerEvents: 'none', lineHeight: 1
                }}>
                  {pencilNote}
                </div>
              );
            })()}
          </div>
        );
      })}

      {n > 0 && (
        <div aria-live="polite" style={{ position: 'absolute', left: sideM, right: sideM, bottom: compact ? 14 : 30, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: mono, fontSize: compact ? 10 : 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: muted }}>
          <span>Frame <span style={{ color: ink }}>{pad2(selected + 1)}</span> &mdash; {captions[selected] || ''}</span>
          {!compact && <span>{rejected.size} rejected &middot; &#8592; &#8594; to walk the roll</span>}
        </div>
      )}

      {print && (
        <div role="dialog" aria-modal="true" aria-label={`Print of frame ${print.i + 1}`} style={{ position: 'absolute', inset: 0, zIndex: 30 }}>
          <div onClick={closePrint} style={{ position: 'absolute', inset: 0, background: dark ? 'rgba(14,7,6,.92)' : `${paper}f4`, opacity: pStage === 'in' ? 1 : 0, transition: reduced ? 'none' : 'opacity 450ms ease' }} />
          <div style={{
            position: 'absolute', left: printBox.x - printBox.border, top: printBox.y - printBox.border, width: printBox.w + printBox.border * 2, height: printBox.h + printBox.border * 2 + (compact ? 10 : 30),
            background: dark ? '#1A100E' : '#FFFFFF', boxShadow: dark ? '0 40px 80px -30px rgba(0,0,0,.95)' : '0 2px 3px rgba(0,0,0,.08), 0 40px 70px -30px rgba(28,25,23,.45)',
            opacity: pStage === 'in' ? 1 : 0, transition: reduced ? 'none' : 'opacity 350ms ease 120ms'
          }}>
            <div style={{ position: 'absolute', left: printBox.border, bottom: compact ? 6 : 12, right: printBox.border, display: 'flex', justifyContent: 'space-between', fontFamily: mono, fontSize: compact ? 8 : 9.5, letterSpacing: '0.16em', color: dark ? '#7A4A41' : '#A8A29E', textTransform: 'uppercase' }}>
              <span>{rollLabel} / {pad2(print.i + 1)}</span><span>{filmStock}</span>
            </div>
          </div>
          <div style={{
            position: 'absolute', left: printBox.x, top: printBox.y, width: printBox.w, height: printBox.h, transformOrigin: '0 0', overflow: 'hidden', background: '#2A2A2A',
            transform: flip, transition: pStage === 'pre' || reduced ? 'none' : 'transform 600ms cubic-bezier(.2,.8,.15,1)'
          }}>
            <img key={print.i} src={images[print.i]} alt={captions[print.i] || `Frame ${print.i + 1}`} draggable={false}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: imgFilter, animation: print.swap && !reduced ? `${uid}-fade 380ms ease both` : 'none' }} />
          </div>
          <div style={{
            position: 'absolute', left: compact ? 20 : printBox.x + printBox.w + printBox.border + 48, right: compact ? 20 : 56,
            top: compact ? printBox.y + printBox.h + printBox.border + 34 : printBox.y + printBox.h - 170,
            opacity: pStage === 'in' ? 1 : 0, transform: pStage === 'in' ? 'none' : 'translateY(10px)', transition: reduced ? 'none' : 'opacity 400ms ease 200ms, transform 400ms ease 200ms'
          }}>
            <div key={`n${print.i}`} style={{ fontFamily: mono, fontSize: compact ? 44 : 72, fontWeight: 400, lineHeight: 1, letterSpacing: '-0.04em', color: ink, display: 'flex', alignItems: 'baseline', gap: 12 }}>
              {pad2(print.i + 1)}
              {rejected.has(print.i) && <span style={{ fontFamily: hand, fontSize: compact ? 22 : 28, color: mark, letterSpacing: 0, transform: 'rotate(-6deg)', display: 'inline-block' }}>reject</span>}
            </div>
            <div style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: muted, marginTop: 10 }}>Frame {print.i + 1} of {n} &middot; {rollLabel}</div>
            <div key={`c${print.i}`} style={{ fontFamily: serif, fontSize: compact ? 24 : 32, fontWeight: 300, lineHeight: 1.12, letterSpacing: titleFont === 'Inter' ? '-0.02em' : '-0.01em', marginTop: compact ? 10 : 16 }}>{captions[print.i] || ''}</div>
            <div style={{ display: 'flex', gap: 8, marginTop: compact ? 18 : 26 }}>
              <button type="button" className={`${uid}-b`} style={iconBtn} onClick={() => printNav(-1)} aria-label="Previous frame" disabled={print.i <= 0}>&#8592;</button>
              <button type="button" className={`${uid}-b`} style={iconBtn} onClick={() => printNav(1)} aria-label="Next frame" disabled={print.i >= n - 1}>&#8594;</button>
              <button type="button" className={`${uid}-b`} style={{ ...iconBtn, width: 'auto', padding: '0 16px', fontFamily: mono, fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase' }} onClick={() => toggleReject(print.i)} aria-pressed={rejected.has(print.i)}>
                {rejected.has(print.i) ? 'Un-reject' : 'Reject'}
              </button>
            </div>
          </div>
          <button ref={closeRef} type="button" className={`${uid}-b`} onClick={closePrint} aria-label="Close print (Escape)"
            style={{ ...iconBtn, position: 'absolute', top: compact ? 20 : 40, right: compact ? 20 : 48, opacity: pStage === 'in' ? 1 : 0, transition: 'opacity 300ms ease' }}>&#10005;</button>
        </div>
      )}
    </section>
  );
}

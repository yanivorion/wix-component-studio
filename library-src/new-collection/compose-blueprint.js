const MANIFEST = {
  "type": "Compose.Blueprint",
  "description": "An architectural floor plan that draws itself when it enters view: walls stroke in, openings cut, doors swing, dimension chains and room areas appear, then the north arrow, scale bar, title block and a subtle poché fill",
  "editorElement": {
    "selector": ".blueprint-plan",
    "displayName": "Blueprint",
    "archetype": "container",
    "data": {
      "projectTitle": { "dataType": "text", "displayName": "Project Title", "defaultValue": "Haus am See", "group": "Content" },
      "drawingTitle": { "dataType": "text", "displayName": "Drawing Title", "defaultValue": "Ground floor plan", "group": "Content" },
      "architect": { "dataType": "text", "displayName": "Architect", "defaultValue": "Atelier Nord", "group": "Content" },
      "sheetNo": { "dataType": "text", "displayName": "Sheet No.", "defaultValue": "A-101", "group": "Content" },
      "scaleText": { "dataType": "text", "displayName": "Scale", "defaultValue": "1:100", "group": "Content" },
      "dateText": { "dataType": "text", "displayName": "Date", "defaultValue": "24.11.2026", "group": "Content" },
      "room1Name": { "dataType": "text", "displayName": "Room 1 Name", "defaultValue": "Living", "group": "Rooms" },
      "room1Area": { "dataType": "text", "displayName": "Room 1 Area (m²)", "defaultValue": "25.9", "group": "Rooms" },
      "room2Name": { "dataType": "text", "displayName": "Room 2 Name", "defaultValue": "Kitchen", "group": "Rooms" },
      "room2Area": { "dataType": "text", "displayName": "Room 2 Area (m²)", "defaultValue": "16.6", "group": "Rooms" },
      "room3Name": { "dataType": "text", "displayName": "Room 3 Name", "defaultValue": "Bedroom", "group": "Rooms" },
      "room3Area": { "dataType": "text", "displayName": "Room 3 Area (m²)", "defaultValue": "20.9", "group": "Rooms" },
      "room4Name": { "dataType": "text", "displayName": "Room 4 Name", "defaultValue": "Bath", "group": "Rooms" },
      "room4Area": { "dataType": "text", "displayName": "Room 4 Area (m²)", "defaultValue": "9.2", "group": "Rooms" },
      "room5Name": { "dataType": "text", "displayName": "Room 5 Name", "defaultValue": "Study", "group": "Rooms" },
      "room5Area": { "dataType": "text", "displayName": "Room 5 Area (m²)", "defaultValue": "9.1", "group": "Rooms" },
      "variant": { "dataType": "select", "displayName": "Drawing Style", "defaultValue": "blueprint", "options": ["blueprint", "paper"], "group": "Layout" },
      "blueprintBackground": { "dataType": "color", "displayName": "Blueprint Background", "defaultValue": "#17365A", "group": "Colors" },
      "blueprintInk": { "dataType": "color", "displayName": "Blueprint Lines", "defaultValue": "#E8F0F9", "group": "Colors" },
      "paperBackground": { "dataType": "color", "displayName": "Paper Background", "defaultValue": "#F5F2EA", "group": "Colors" },
      "paperInk": { "dataType": "color", "displayName": "Paper Lines", "defaultValue": "#2A2925", "group": "Colors" },
      "paperAccent": { "dataType": "color", "displayName": "Paper Dimension Accent", "defaultValue": "#B4462F", "group": "Colors" },
      "fontFamily": { "dataType": "select", "displayName": "Font Family", "defaultValue": "Inter", "options": ["Inter", "IBM Plex Sans", "Helvetica Neue"], "group": "Typography" },
      "sectionHeight": { "dataType": "select", "displayName": "Section Height (px)", "defaultValue": "800", "options": ["720", "800", "900"], "group": "Layout" },
      "showGrid": { "dataType": "booleanValue", "displayName": "Sheet Grid", "defaultValue": "true", "group": "Layout" },
      "showDimensions": { "dataType": "booleanValue", "displayName": "Dimensions", "defaultValue": "true", "group": "Layout" },
      "showPoche": { "dataType": "booleanValue", "displayName": "Poché Fill", "defaultValue": "true", "group": "Layout" },
      "showSchedule": { "dataType": "booleanValue", "displayName": "Room Schedule", "defaultValue": "true", "group": "Layout" },
      "triggerMode": { "dataType": "select", "displayName": "Trigger", "defaultValue": "entrance", "options": ["entrance", "scroll", "manual"], "group": "Animation", "description": "entrance = once, scroll = every time it enters view, manual = replay button only" },
      "threshold": { "dataType": "select", "displayName": "Visible Threshold", "defaultValue": "0.25", "options": ["0.1", "0.25", "0.4", "0.6"], "group": "Animation" },
      "speed": { "dataType": "select", "displayName": "Speed", "defaultValue": "1", "options": ["0.5", "0.75", "1", "1.25", "1.5", "2"], "group": "Animation" },
      "showReplay": { "dataType": "booleanValue", "displayName": "Replay Button", "defaultValue": "true", "group": "Animation" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const projectTitle = config?.projectTitle || 'Haus am See';
  const drawingTitle = config?.drawingTitle || 'Ground floor plan';
  const architect = config?.architect || 'Atelier Nord';
  const sheetNo = config?.sheetNo || 'A-101';
  const scaleText = config?.scaleText || '1:100';
  const dateText = config?.dateText || '24.11.2026';
  const roomDefaults = [['Living', '25.9'], ['Kitchen', '16.6'], ['Bedroom', '20.9'], ['Bath', '9.2'], ['Study', '9.1']];
  const rooms = roomDefaults.map((d, i) => ({ name: config?.[`room${i + 1}Name`] || d[0], area: config?.[`room${i + 1}Area`] || d[1] }));
  const variant = config?.variant || 'blueprint';
  const paper = variant === 'paper';
  const bg = paper ? config?.paperBackground || '#F5F2EA' : config?.blueprintBackground || '#17365A';
  const ink = paper ? config?.paperInk || '#2A2925' : config?.blueprintInk || '#E8F0F9';
  const dimC = paper ? config?.paperAccent || '#B4462F' : ink;
  const fontFamily = config?.fontFamily || 'Inter';
  const H = parseInt(config?.sectionHeight || '800', 10) || 800;
  const showGrid = bool(config?.showGrid, true);
  const showDims = bool(config?.showDimensions, true);
  const showPoche = bool(config?.showPoche, true);
  const showSchedule = bool(config?.showSchedule, true);
  const triggerMode = config?.triggerMode || 'entrance';
  const threshold = parseFloat(config?.threshold || '0.25') || 0.25;
  const speed = Math.max(0.25, parseFloat(config?.speed || '1') || 1);
  const showReplay = bool(config?.showReplay, true);
  const DUR = 2.6;

  const uid = React.useMemo(() => 'bp' + Math.random().toString(36).slice(2, 9), []);
  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const rootRef = React.useRef(null);
  const animRef = React.useRef(null);
  const playedRef = React.useRef(false);
  const playRef = React.useRef(null);
  const [t, setT] = React.useState(reduced || triggerMode === 'manual' ? 1 : 0);
  const [w, setW] = React.useState(1280);

  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    const fams = { Inter: 'Inter:wght@300;400;500', 'IBM Plex Sans': 'IBM+Plex+Sans:wght@300;400;500', 'IBM Plex Mono': 'IBM+Plex+Mono:wght@400;500' };
    [fontFamily, 'IBM Plex Mono'].forEach((f) => {
      if (!fams[f]) return;
      const id = 'gf-' + f.replace(/\s+/g, '-').toLowerCase();
      if (document.getElementById(id)) return;
      const l = document.createElement('link');
      l.id = id; l.rel = 'stylesheet';
      l.href = `https://fonts.googleapis.com/css2?family=${fams[f]}&display=swap`;
      document.head.appendChild(l);
    });
  }, [fontFamily]);

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return undefined;
    const measure = () => setW(el.clientWidth || 1280);
    measure();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (ro) ro.observe(el);
    window.addEventListener('resize', measure);
    return () => { if (ro) ro.disconnect(); window.removeEventListener('resize', measure); };
  }, []);

  const stop = () => {
    const a = animRef.current;
    if (a && a.raf) cancelAnimationFrame(a.raf);
    animRef.current = null;
  };
  playRef.current = () => {
    stop();
    if (reduced) { setT(1); return; }
    const d = DUR / speed;
    setT(0);
    const a = { raf: 0 };
    const t0 = performance.now();
    const step = (now) => { const v = Math.min(1, Math.max(0, (now - t0) / (d * 1000))); setT(v); a.raf = v < 1 ? requestAnimationFrame(step) : 0; };
    a.raf = requestAnimationFrame(step);
    animRef.current = a;
  };

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return undefined;
    if (triggerMode === 'manual') { if (!animRef.current) setT(1); return () => stop(); }
    if (playedRef.current && triggerMode === 'entrance') setT(1);
    if (typeof IntersectionObserver === 'undefined') { if (!playedRef.current) { playedRef.current = true; playRef.current(); } return () => stop(); }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          if (triggerMode === 'scroll' || !playedRef.current) { playedRef.current = true; playRef.current(); }
        } else if (triggerMode === 'scroll' && !reduced) { stop(); setT(0); }
      });
    }, { threshold });
    io.observe(el);
    return () => { io.disconnect(); stop(); };
  }, [triggerMode, threshold, reduced]); // eslint-disable-line react-hooks/exhaustive-deps

  const clamp = (v) => Math.min(1, Math.max(0, v));
  const seg = (a, b) => clamp((t - a) / (b - a));
  const eOut = (x) => 1 - Math.pow(1 - x, 3);
  const eIO = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

  // sheet layout: plan units are centimetres, 1 sheet unit = 1 cm
  const compact = w < 760;
  const CW = compact ? 960 : 1700;
  const CH = compact ? 1960 : 1010;
  const sc = Math.min(w / (CW + (compact ? 40 : 110)), H / (CH + (compact ? 40 : 70)));
  const SW = w / sc;
  const SH = H / sc;
  const cx0 = (SW - CW) / 2;
  const cy0 = (SH - CH) / 2;
  const rot = compact;
  const ox = compact ? cx0 + 10 : cx0 + 120;
  const oy = compact ? cy0 + 120 : cy0 + 120;
  const u = (px) => px / sc;
  const M = (x, y) => (rot ? [ox + (800 - y), oy + x] : [ox + x, oy + y]);
  const pt = (x, y) => M(x, y).map((v) => v.toFixed(1)).join(' ');
  const rectD = (x, y, wd, ht) => `M ${pt(x, y)} L ${pt(x + wd, y)} L ${pt(x + wd, y + ht)} L ${pt(x, y + ht)} Z`;
  const lineD = (x1, y1, x2, y2) => `M ${pt(x1, y1)} L ${pt(x2, y2)}`;
  const planW = rot ? 800 : 1200;
  const planH = rot ? 1200 : 800;

  const mono = '"IBM Plex Mono", ui-monospace, "SF Mono", Menlo, monospace';
  const sans = `"${fontFamily}", -apple-system, "Helvetica Neue", sans-serif`;

  const interior = [[614, 30, 12, 740], [30, 474, 584, 12], [626, 414, 544, 12], [894, 426, 12, 344]];
  const roomRects = [[30, 30, 584, 444], [30, 486, 584, 284], [626, 30, 544, 384], [626, 426, 268, 344], [906, 426, 264, 344]];
  const windows = [[140, 0, 300, 30, 'h'], [760, 0, 300, 30, 'h'], [0, 140, 30, 240, 'v'], [0, 560, 30, 150, 'v'], [1170, 120, 30, 200, 'v'], [1170, 520, 30, 180, 'v']];
  const doors = [
    { cut: [440, 474, 90, 12], h: [440, 480], l: [440, 390], j: [530, 480] },
    { cut: [614, 300, 12, 90], h: [620, 390], l: [710, 390], j: [620, 300] },
    { cut: [614, 520, 12, 80], h: [620, 520], l: [700, 520], j: [620, 600] },
    { cut: [1040, 414, 80, 12], h: [1120, 420], l: [1120, 500], j: [1040, 420] },
    { cut: [120, 770, 100, 30], h: [120, 770], l: [120, 670], j: [220, 770] }
  ];
  const arcD = (d) => {
    const [hx, hy] = M(d.h[0], d.h[1]);
    const [lx, ly] = M(d.l[0], d.l[1]);
    const [jx, jy] = M(d.j[0], d.j[1]);
    const r = Math.hypot(lx - hx, ly - hy);
    const cross = (lx - hx) * (jy - hy) - (ly - hy) * (jx - hx);
    return `M ${lx.toFixed(1)} ${ly.toFixed(1)} A ${r.toFixed(1)} ${r.toFixed(1)} 0 0 ${cross > 0 ? 1 : 0} ${jx.toFixed(1)} ${jy.toFixed(1)}`;
  };

  const dims = [
    { a: [0, -45], b: [620, -45], txt: '6.20', ext: true },
    { a: [620, -45], b: [1200, -45], txt: '5.80' },
    { a: [0, -100], b: [1200, -100], txt: '12.00' },
    { a: [-45, 0], b: [-45, 480], txt: '4.80' },
    { a: [-45, 480], b: [-45, 800], txt: '3.20' },
    { a: [-100, 0], b: [-100, 800], txt: '8.00' }
  ];
  const extLines = [
    [0, -12, 0, -112], [620, -12, 620, -58], [1200, -12, 1200, -112],
    [-12, 0, -112, 0], [-12, 480, -58, 480], [-12, 800, -112, 800]
  ];
  const arrow = (tip, from) => {
    const [tx, ty] = M(tip[0], tip[1]);
    const [fx, fy] = M(from[0], from[1]);
    const len = Math.hypot(tx - fx, ty - fy) || 1;
    const ux = (tx - fx) / len;
    const uy = (ty - fy) / len;
    const a = u(7);
    const b = u(2.4);
    return `M ${tx} ${ty} L ${tx - ux * a + uy * b} ${ty - uy * a - ux * b} L ${tx - ux * a - uy * b} ${ty - uy * a + ux * b} Z`;
  };

  const gridP = eOut(seg(0, 0.14));
  const outerP = eIO(seg(0.03, 0.3));
  const cutP = seg(0.38, 0.44);
  const winP = eOut(seg(0.4, 0.56));
  const dimP = eOut(seg(0.52, 0.72));
  const dimTxtP = eOut(seg(0.62, 0.78));
  const northP = eOut(seg(0.7, 0.9));
  const tbP = eOut(seg(0.74, 0.94));
  const pocheP = eOut(seg(0.82, 1));

  const wallStroke = { fill: 'none', stroke: ink, strokeWidth: 1.4, vectorEffect: 'non-scaling-stroke', strokeLinejoin: 'miter' };
  const thin = { fill: 'none', stroke: ink, strokeWidth: 0.8, vectorEffect: 'non-scaling-stroke' };
  const draw = (p) => ({ pathLength: 1, strokeDasharray: '1 2', strokeDashoffset: 1 - p, opacity: p > 0 ? 1 : 0 });

  const pocheD = rectD(0, 0, 1200, 800) + ' ' + rectD(30, 30, 1140, 740) + ' ' + interior.map((r) => rectD(...r)).join(' ');
  const total = rooms.reduce((s, r) => s + (parseFloat(r.area) || 0), 0);

  const planRight = ox + planW;
  const planBottom = oy + planH;
  const colX = compact ? cx0 + 20 : cx0 + 1400;
  const colW = compact ? 890 : 300;
  const northC = compact ? [cx0 + 840, planBottom + 92] : [colX + 44, cy0 + 150];
  const scaleBar = compact ? [cx0 + 20, planBottom + 88] : [ox, planBottom + 70];
  const tbTop = compact ? planBottom + 170 : cy0 + 560;
  const tbBottom = compact ? tbTop + 380 : planBottom;

  const fsLabel = u(compact ? 11 : 11.5);
  const fsArea = u(compact ? 10 : 10.5);
  const fsDim = u(compact ? 9.5 : 10);
  const fsTiny = u(8.5);
  const fsTb = u(compact ? 11 : 11.5);

  const tbRows = compact
    ? [{ k: 'Project', v: projectTitle, big: true, k2: 'Drawing', v2: drawingTitle }, { k: 'Architect', v: architect, k2: 'Date', v2: dateText }]
    : [{ k: 'Project', v: projectTitle, big: true }, { k: 'Drawing', v: drawingTitle }, { k: 'Architect', v: architect }, { k: 'Scale', v: scaleText, k2: 'Date', v2: dateText }];
  const tbH = tbBottom - tbTop;
  const sheetRowH = u(compact ? 44 : 54);
  const rowH = (tbH - sheetRowH) / tbRows.length;

  return (
    <section ref={rootRef} className="blueprint-plan" aria-label={`${projectTitle}, ${drawingTitle}: ${rooms.map((r) => `${r.name} ${r.area} m²`).join(', ')}`}
      style={{ position: 'relative', width: '100%', height: `${H}px`, overflow: 'hidden', backgroundColor: bg, color: ink, fontFamily: sans }}>
      <style>{`.${uid}-rp{opacity:.6;transition:opacity .2s}.${uid}-rp:hover{opacity:1}.${uid}-rp:focus-visible{opacity:1;outline:2px solid ${ink};outline-offset:3px}`}</style>
      <svg aria-hidden="true" width="100%" height="100%" viewBox={`0 0 ${SW.toFixed(1)} ${SH.toFixed(1)}`} preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: 0, display: 'block' }}>
        <defs>
          <pattern id={`${uid}-g`} width={50} height={50} patternUnits="userSpaceOnUse" x={ox} y={oy}>
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke={ink} strokeWidth={0.5} vectorEffect="non-scaling-stroke" opacity={paper ? 0.1 : 0.09} />
          </pattern>
          <pattern id={`${uid}-G`} width={100} height={100} patternUnits="userSpaceOnUse" x={ox} y={oy}>
            <rect width={100} height={100} fill={`url(#${uid}-g)`} />
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke={ink} strokeWidth={0.6} vectorEffect="non-scaling-stroke" opacity={paper ? 0.16 : 0.15} />
          </pattern>
          <pattern id={`${uid}-h`} width={u(6)} height={u(6)} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1={0} y1={0} x2={0} y2={u(6)} stroke={ink} strokeWidth={0.8} vectorEffect="non-scaling-stroke" opacity={0.75} />
          </pattern>
        </defs>

        {showGrid && <rect x={0} y={0} width={SW} height={SH} fill={`url(#${uid}-G)`} opacity={gridP} />}
        <rect x={u(compact ? 7 : 14)} y={u(compact ? 7 : 14)} width={SW - u(compact ? 14 : 28)} height={SH - u(compact ? 14 : 28)} style={{ ...thin, strokeWidth: 1 }} {...draw(eOut(seg(0, 0.2)))} />

        {showPoche && (
          <g opacity={pocheP}>
            <path d={pocheD} fill={ink} fillRule="evenodd" opacity={paper ? 0.12 : 0.14} />
            <path d={pocheD} fill={`url(#${uid}-h)`} fillRule="evenodd" />
          </g>
        )}

        <path d={rectD(0, 0, 1200, 800)} style={wallStroke} {...draw(outerP)} />
        <path d={rectD(30, 30, 1140, 740)} style={wallStroke} {...draw(eIO(seg(0.08, 0.34)))} />
        {interior.map((r, k) => (
          <path key={k} d={rectD(...r)} style={{ ...wallStroke, strokeWidth: 1.1 }} {...draw(eIO(seg(0.2 + k * 0.04, 0.36 + k * 0.04)))} />
        ))}

        {windows.map(([x, y, wd, ht, o], k) => (
          <g key={k}>
            <path d={rectD(x, y - (o === 'h' ? u(2) : 0), wd, ht + (o === 'h' ? u(4) : 0))} fill={bg} opacity={cutP} />
            <path d={o === 'h' ? lineD(x, y, x, y + ht) + ' ' + lineD(x + wd, y, x + wd, y + ht) : lineD(x, y, x + wd, y) + ' ' + lineD(x, y + ht, x + wd, y + ht)} style={wallStroke} opacity={cutP} />
            <path d={rectD(x, y, wd, ht)} style={thin} {...draw(winP)} />
            {o === 'h'
              ? <path d={lineD(x, y + ht * 0.4, x + wd, y + ht * 0.4) + ' ' + lineD(x, y + ht * 0.6, x + wd, y + ht * 0.6)} style={thin} {...draw(eOut(seg(0.44 + k * 0.02, 0.58 + k * 0.02)))} />
              : <path d={lineD(x + wd * 0.4, y, x + wd * 0.4, y + ht) + ' ' + lineD(x + wd * 0.6, y, x + wd * 0.6, y + ht)} style={thin} {...draw(eOut(seg(0.44 + k * 0.02, 0.58 + k * 0.02)))} />}
          </g>
        ))}

        {doors.map((d, k) => {
          const lp = eOut(seg(0.44 + k * 0.03, 0.54 + k * 0.03));
          const ap = eOut(seg(0.5 + k * 0.03, 0.64 + k * 0.03));
          const [cx, cy, cw, ch] = d.cut;
          return (
            <g key={k}>
              <path d={rectD(cx - (ch > cw ? u(2) : 0), cy - (cw > ch ? u(2) : 0), cw + (ch > cw ? u(4) : 0), ch + (cw > ch ? u(4) : 0))} fill={bg} opacity={cutP} />
              <path d={cw > ch ? lineD(cx, cy, cx, cy + ch) + ' ' + lineD(cx + cw, cy, cx + cw, cy + ch) : lineD(cx, cy, cx + cw, cy) + ' ' + lineD(cx, cy + ch, cx + cw, cy + ch)} style={{ ...wallStroke, strokeWidth: 1.1 }} opacity={cutP} />
              <path d={lineD(d.h[0], d.h[1], d.l[0], d.l[1])} style={{ ...thin, strokeWidth: 1.4 }} {...draw(lp)} />
              <path d={arcD(d)} style={{ ...thin, strokeWidth: 0.7, strokeOpacity: 0.85 }} {...draw(ap)} />
            </g>
          );
        })}

        {showDims && (
          <g>
            {extLines.map((l, k) => <path key={k} d={lineD(...l)} style={{ ...thin, stroke: dimC, strokeWidth: 0.6 }} {...draw(dimP)} />)}
            {dims.map((dm, k) => {
              const p = eOut(seg(0.54 + k * 0.025, 0.7 + k * 0.025));
              const [ax, ay] = M(dm.a[0], dm.a[1]);
              const [bx, by] = M(dm.b[0], dm.b[1]);
              const mx = (ax + bx) / 2;
              const my = (ay + by) / 2;
              const tw = dm.txt.length * fsDim * 0.64 + u(8);
              return (
                <g key={k}>
                  <path d={`M ${ax} ${ay} L ${bx} ${by}`} style={{ ...thin, stroke: dimC, strokeWidth: 0.75 }} {...draw(p)} />
                  <g opacity={p >= 1 ? 1 : 0}>
                    <path d={arrow(dm.a, dm.b)} fill={dimC} />
                    <path d={arrow(dm.b, dm.a)} fill={dimC} />
                  </g>
                  <g opacity={dimTxtP}>
                    <rect x={mx - tw / 2} y={my - fsDim * 0.75} width={tw} height={fsDim * 1.5} fill={bg} />
                    <text x={mx} y={my + fsDim * 0.36} textAnchor="middle" fontFamily={mono} fontSize={fsDim} fill={dimC} letterSpacing={u(0.4)}>{dm.txt}</text>
                  </g>
                </g>
              );
            })}
          </g>
        )}

        {roomRects.map(([x, y, wd, ht], k) => {
          const p = eOut(seg(0.6 + k * 0.04, 0.74 + k * 0.04));
          const [cx, cy] = M(x + wd / 2, y + ht / 2);
          const r = rooms[k];
          return (
            <g key={k} opacity={p} transform={`translate(0 ${(1 - p) * u(6)})`}>
              <text x={cx} y={cy - fsLabel * 0.2} textAnchor="middle" fontSize={fsLabel} fill={ink} fontWeight={500} letterSpacing={fsLabel * 0.14}>{r.name.toUpperCase()}</text>
              <text x={cx} y={cy + fsArea * 1.35} textAnchor="middle" fontSize={fsArea} fill={ink} opacity={0.72} fontFamily={mono}>{r.area} m²</text>
            </g>
          );
        })}

        <g opacity={northP} transform={`translate(${northC[0]} ${northC[1]}) rotate(${(rot ? 90 : 0) - (1 - northP) * 120})`}>
          <circle r={u(22)} style={thin} />
          <path d={`M 0 ${-u(30)} L ${u(8)} ${u(14)} L 0 ${u(6)} Z`} fill={ink} />
          <path d={`M 0 ${-u(30)} L ${-u(8)} ${u(14)} L 0 ${u(6)} Z`} fill="none" stroke={ink} strokeWidth={0.8} vectorEffect="non-scaling-stroke" />
          <text x={0} y={-u(36)} textAnchor="middle" fontSize={u(11)} fontWeight={500} fill={ink} transform={rot ? `rotate(-90 0 ${-u(40)})` : undefined}>N</text>
        </g>

        <g opacity={northP} transform={`translate(${scaleBar[0]} ${scaleBar[1]})`}>
          {[0, 1, 2, 3].map((k) => (
            <rect key={k} x={k * 100} y={0} width={100 * eOut(seg(0.72 + k * 0.03, 0.82 + k * 0.03))} height={u(5)} fill={k % 2 ? 'none' : ink} stroke={ink} strokeWidth={0.8} vectorEffect="non-scaling-stroke" />
          ))}
          <rect x={400} y={0} width={100} height={u(5)} fill="none" stroke={ink} strokeWidth={0.8} vectorEffect="non-scaling-stroke" opacity={seg(0.84, 0.9)} />
          {[0, 1, 2, 3, 5].map((m) => (
            <text key={m} x={m * 100} y={u(5) + fsTiny * 1.7} textAnchor="middle" fontFamily={mono} fontSize={fsTiny} fill={ink}>{m}{m === 5 ? ' m' : ''}</text>
          ))}
          <text x={0} y={-fsTiny * 0.9} fontFamily={mono} fontSize={fsTiny} fill={ink} letterSpacing={u(1)} opacity={0.8}>SCALE {scaleText}</text>
        </g>

        {!compact && showSchedule && (
          <g opacity={tbP} transform={`translate(${colX} ${cy0 + 290})`}>
            <text x={0} y={0} fontFamily={mono} fontSize={fsTiny} fill={ink} letterSpacing={u(1.2)} opacity={0.8}>ROOM SCHEDULE</text>
            <line x1={0} x2={colW} y1={u(9)} y2={u(9)} style={thin} />
            {rooms.map((r, k) => (
              <g key={k} transform={`translate(0 ${u(9) + (k + 1) * u(19)})`}>
                <text x={0} y={0} fontFamily={mono} fontSize={fsTiny} fill={ink} opacity={0.7}>{String(k + 1).padStart(2, '0')}</text>
                <text x={u(24)} y={0} fontSize={u(11)} fill={ink}>{r.name}</text>
                <text x={colW} y={0} textAnchor="end" fontFamily={mono} fontSize={u(10)} fill={ink}>{r.area} m²</text>
              </g>
            ))}
            <line x1={0} x2={colW} y1={u(9) + 5 * u(19) + u(8)} y2={u(9) + 5 * u(19) + u(8)} style={thin} />
            <text x={0} y={u(9) + 6 * u(19) + u(4)} fontSize={u(11)} fontWeight={500} fill={ink}>Total net area</text>
            <text x={colW} y={u(9) + 6 * u(19) + u(4)} textAnchor="end" fontFamily={mono} fontSize={u(10)} fontWeight={500} fill={ink}>{total.toFixed(1)} m²</text>
          </g>
        )}

        <g>
          <rect x={colX} y={tbTop} width={colW} height={tbH} style={{ ...thin, strokeWidth: 1.2 }} {...draw(tbP)} />
          {tbRows.map((row, k) => {
            const y = tbTop + k * rowH;
            const p = eOut(seg(0.78 + k * 0.03, 0.9 + k * 0.03));
            return (
              <g key={k}>
                {k > 0 && <line x1={colX} x2={colX + colW * p} y1={y} y2={y} style={thin} />}
                {row.k2 && <line x1={colX + colW / 2} x2={colX + colW / 2} y1={y} y2={y + rowH * p} style={thin} />}
                <g opacity={p}>
                  <text x={colX + u(10)} y={y + u(16)} fontFamily={mono} fontSize={fsTiny} fill={ink} opacity={0.7} letterSpacing={u(1)}>{row.k.toUpperCase()}</text>
                  <text x={colX + u(10)} y={y + u(16) + (row.big ? u(22) : u(17))} fontSize={row.big ? u(compact ? 17 : 18) : fsTb} fontWeight={row.big ? 500 : 400} fill={ink} letterSpacing={row.big ? -u(0.2) : 0}>{row.v}</text>
                  {row.k2 && (
                    <>
                      <text x={colX + colW / 2 + u(10)} y={y + u(16)} fontFamily={mono} fontSize={fsTiny} fill={ink} opacity={0.7} letterSpacing={u(1)}>{row.k2.toUpperCase()}</text>
                      <text x={colX + colW / 2 + u(10)} y={y + u(33)} fontSize={fsTb} fill={ink}>{row.v2}</text>
                    </>
                  )}
                </g>
              </g>
            );
          })}
          <g opacity={eOut(seg(0.88, 1))}>
            <rect x={colX} y={tbBottom - sheetRowH} width={colW} height={sheetRowH} fill={ink} opacity={paper ? 0.9 : 0.95} />
            <text x={colX + u(10)} y={tbBottom - sheetRowH / 2 + fsTiny * 0.35} fontFamily={mono} fontSize={fsTiny} fill={bg} letterSpacing={u(1)}>SHEET</text>
            <text x={colX + colW - u(10)} y={tbBottom - sheetRowH / 2 + u(8)} textAnchor="end" fontSize={u(22)} fontWeight={500} fill={bg} letterSpacing={-u(0.3)}>{sheetNo}</text>
          </g>
        </g>
      </svg>

      {showReplay && (
        <button type="button" className={`${uid}-rp`} aria-label="Replay drawing animation"
          onClick={() => { playedRef.current = true; playRef.current(); }}
          style={{ position: 'absolute', ...(compact ? { left: '50%', bottom: 14, transform: 'translateX(-50%)' } : { right: 28, top: 26 }), appearance: 'none', border: `1px solid ${ink}`, background: bg, color: ink, borderRadius: 999, padding: '5px 11px', fontFamily: mono, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', visibility: t >= 1 ? 'visible' : 'hidden' }}>
          ↻ Replay
        </button>
      )}
    </section>
  );
}

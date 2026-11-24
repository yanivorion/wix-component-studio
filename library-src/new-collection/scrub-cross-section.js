const MANIFEST = {
  "type": "Scrub.CrossSection",
  "description": "Scroll-scrubbed isometric cross-section: a solid block separates into hatched material slabs that fan apart with labels, a scanning plane sweeps through reading each layer, then the stack collapses back with a total-thickness dimension",
  "editorElement": {
    "selector": ".cross-section",
    "displayName": "Cross Section",
    "archetype": "container",
    "data": {
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Section A–A / Model TR-8", "group": "Content" },
      "title": { "dataType": "text", "displayName": "Title", "defaultValue": "Eight layers, one stride", "group": "Content" },
      "description": { "dataType": "text", "displayName": "Description", "defaultValue": "A trail sole, cut and spread apart. Every millimetre has a job.", "group": "Content" },
      "unit": { "dataType": "text", "displayName": "Unit", "defaultValue": "mm", "group": "Content" },
      "layerCount": { "dataType": "select", "displayName": "Layer Count", "defaultValue": "8", "options": ["6", "7", "8"], "group": "Layers" },
      "layer1Name": { "dataType": "text", "displayName": "Layer 1 Name", "defaultValue": "Upper mesh", "group": "Layers" },
      "layer1Material": { "dataType": "text", "displayName": "Layer 1 Material", "defaultValue": "Recycled PET knit", "group": "Layers" },
      "layer1Thickness": { "dataType": "number", "displayName": "Layer 1 Thickness", "defaultValue": "1.2", "group": "Layers" },
      "layer2Name": { "dataType": "text", "displayName": "Layer 2 Name", "defaultValue": "Strobel board", "group": "Layers" },
      "layer2Material": { "dataType": "text", "displayName": "Layer 2 Material", "defaultValue": "Cellulose fibre", "group": "Layers" },
      "layer2Thickness": { "dataType": "number", "displayName": "Layer 2 Thickness", "defaultValue": "1.8", "group": "Layers" },
      "layer3Name": { "dataType": "text", "displayName": "Layer 3 Name", "defaultValue": "Sockliner", "group": "Layers" },
      "layer3Material": { "dataType": "text", "displayName": "Layer 3 Material", "defaultValue": "Open-cell PU foam", "group": "Layers" },
      "layer3Thickness": { "dataType": "number", "displayName": "Layer 3 Thickness", "defaultValue": "4", "group": "Layers" },
      "layer4Name": { "dataType": "text", "displayName": "Layer 4 Name", "defaultValue": "Top midsole", "group": "Layers" },
      "layer4Material": { "dataType": "text", "displayName": "Layer 4 Material", "defaultValue": "Supercritical EVA", "group": "Layers" },
      "layer4Thickness": { "dataType": "number", "displayName": "Layer 4 Thickness", "defaultValue": "10", "group": "Layers" },
      "layer5Name": { "dataType": "text", "displayName": "Layer 5 Name", "defaultValue": "Propulsion plate", "group": "Layers" },
      "layer5Material": { "dataType": "text", "displayName": "Layer 5 Material", "defaultValue": "Woven carbon fibre", "group": "Layers" },
      "layer5Thickness": { "dataType": "number", "displayName": "Layer 5 Thickness", "defaultValue": "1.5", "group": "Layers" },
      "layer6Name": { "dataType": "text", "displayName": "Layer 6 Name", "defaultValue": "Lower midsole", "group": "Layers" },
      "layer6Material": { "dataType": "text", "displayName": "Layer 6 Material", "defaultValue": "PEBA bead foam", "group": "Layers" },
      "layer6Thickness": { "dataType": "number", "displayName": "Layer 6 Thickness", "defaultValue": "14", "group": "Layers" },
      "layer7Name": { "dataType": "text", "displayName": "Layer 7 Name", "defaultValue": "Rock shield", "group": "Layers" },
      "layer7Material": { "dataType": "text", "displayName": "Layer 7 Material", "defaultValue": "TPU film", "group": "Layers" },
      "layer7Thickness": { "dataType": "number", "displayName": "Layer 7 Thickness", "defaultValue": "0.8", "group": "Layers" },
      "layer8Name": { "dataType": "text", "displayName": "Layer 8 Name", "defaultValue": "Outsole", "group": "Layers" },
      "layer8Material": { "dataType": "text", "displayName": "Layer 8 Material", "defaultValue": "Natural rubber, 4 mm lugs", "group": "Layers" },
      "layer8Thickness": { "dataType": "number", "displayName": "Layer 8 Thickness", "defaultValue": "4.5", "group": "Layers" },
      "accentLayer": { "dataType": "select", "displayName": "Accent Layer", "defaultValue": "5", "options": ["none", "1", "2", "3", "4", "5", "6", "7", "8"], "group": "Layers" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#F5F5F4", "group": "Colors" },
      "inkColor": { "dataType": "color", "displayName": "Ink", "defaultValue": "#1C1917", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#78716C", "group": "Colors" },
      "slabColor": { "dataType": "color", "displayName": "Slab Base", "defaultValue": "#FFFFFF", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent / Scanner", "defaultValue": "#E5484D", "group": "Colors" },
      "scrollLength": { "dataType": "select", "displayName": "Scroll Length (screens)", "defaultValue": "5", "options": ["3", "4", "5", "6", "7"], "group": "Layout" },
      "showGrid": { "dataType": "booleanValue", "displayName": "Isometric Grid", "defaultValue": "true", "group": "Layout" },
      "smoothing": { "dataType": "select", "displayName": "Scrub Smoothing", "defaultValue": "0.14", "options": ["0.08", "0.14", "0.22", "1"], "group": "Animation", "description": "1 = locked to the scrollbar, lower = more glide" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const eyebrow = config?.eyebrow || 'Section A–A / Model TR-8';
  const title = config?.title || 'Eight layers, one stride';
  const description = config?.description || 'A trail sole, cut and spread apart. Every millimetre has a job.';
  const unit = config?.unit || 'mm';
  const count = Math.max(6, Math.min(8, parseInt(config?.layerCount || '8', 10) || 8));
  const accentIdx = (config?.accentLayer || '5') === 'none' ? -1 : parseInt(config?.accentLayer || '5', 10) - 1;
  const bg = config?.backgroundColor || '#F5F5F4';
  const ink = config?.inkColor || '#1C1917';
  const muted = config?.mutedColor || '#78716C';
  const slab = config?.slabColor || '#FFFFFF';
  const accent = config?.accentColor || '#E5484D';
  const screens = parseFloat(config?.scrollLength || '5');
  const showGrid = bool(config?.showGrid, true);
  const smoothing = Math.min(1, Math.max(0.02, parseFloat(config?.smoothing || '0.14')));

  const defs = [
    ['Upper mesh', 'Recycled PET knit', '1.2'], ['Strobel board', 'Cellulose fibre', '1.8'],
    ['Sockliner', 'Open-cell PU foam', '4'], ['Top midsole', 'Supercritical EVA', '10'],
    ['Propulsion plate', 'Woven carbon fibre', '1.5'], ['Lower midsole', 'PEBA bead foam', '14'],
    ['Rock shield', 'TPU film', '0.8'], ['Outsole', 'Natural rubber, 4 mm lugs', '4.5']
  ];
  const layers = React.useMemo(() => defs.slice(0, count).map((d, i) => ({
    name: config?.[`layer${i + 1}Name`] || d[0],
    material: config?.[`layer${i + 1}Material`] || d[1],
    t: Math.max(0.1, parseFloat(config?.[`layer${i + 1}Thickness`] || d[2]) || parseFloat(d[2]))
  })), [config, count]); // eslint-disable-line react-hooks/exhaustive-deps
  const total = layers.reduce((a, l) => a + l.t, 0);

  const uid = React.useMemo(() => 'cs' + Math.random().toString(36).slice(2, 9), []);
  const prefersReducedMotion = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  React.useEffect(() => {
    const id = 'cs-fonts-inter-plex';
    if (typeof document === 'undefined' || document.getElementById(id)) return;
    const l = document.createElement('link');
    l.id = id; l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400&family=Inter:wght@300;400;500&display=swap';
    document.head.appendChild(l);
  }, []);

  const sectionRef = React.useRef(null);
  const target = React.useRef(0);
  const current = React.useRef(0);
  const [progress, setProgress] = React.useState(prefersReducedMotion ? 1 : 0);
  const [stageH, setStageH] = React.useState(800);
  const [width, setWidth] = React.useState(1280);

  React.useEffect(() => {
    const s = typeof getScrollContainer === 'function' ? getScrollContainer() : null;
    const scroller = s && s !== window && s.nodeType === 1 ? s : window;
    const sec = sectionRef.current;
    if (!sec) return undefined;
    let raf = 0;
    const read = () => {
      const r = sec.getBoundingClientRect();
      const top = scroller === window ? 0 : scroller.getBoundingClientRect().top;
      const vh = scroller === window ? window.innerHeight : scroller.getBoundingClientRect().height;
      const travel = r.height - vh;
      target.current = travel > 0 ? Math.min(1, Math.max(0, (top - r.top) / travel)) : 0;
    };
    const tick = () => {
      const d = target.current - current.current;
      current.current = Math.abs(d) < 0.0004 ? target.current : current.current + d * smoothing;
      setProgress(current.current);
      raf = current.current === target.current ? 0 : requestAnimationFrame(tick);
    };
    const onScroll = () => { read(); if (!raf && !prefersReducedMotion) raf = requestAnimationFrame(tick); };
    const measure = () => {
      setStageH(scroller === window ? window.innerHeight : scroller.clientHeight);
      setWidth(sec.clientWidth);
      onScroll();
    };
    measure();
    scroller.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (ro) ro.observe(sec);
    return () => {
      scroller.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
      if (ro) ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [smoothing, prefersReducedMotion]);

  const p = prefersReducedMotion ? 1 : progress;
  const clamp = (v) => Math.min(1, Math.max(0, v));
  const seg = (a, b) => clamp((p - a) / (b - a));
  const ease = (t) => 1 - Math.pow(1 - t, 3);
  const easeIO = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  const W = Math.max(320, width);
  const H = Math.max(480, stageH);
  const compact = W < 760;
  const C30 = Math.cos(Math.PI / 6);
  const S30 = 0.5;

  const explode = easeIO(seg(0.08, 0.36)) * (1 - easeIO(seg(0.74, 0.9)));
  const texture = ease(seg(0.16, 0.4));
  const labelsT = (i) => ease(seg(0.2 + i * 0.022, 0.3 + i * 0.022)) * (1 - ease(seg(0.76, 0.84)));
  const scanT = seg(0.42, 0.7);
  const scanVis = ease(seg(0.4, 0.44)) * (1 - ease(seg(0.7, 0.74)));
  const dimT = Math.max(1 - ease(seg(0.04, 0.12)), ease(seg(0.88, 0.97)));
  const finalT = ease(seg(0.88, 0.97));

  const S = compact ? Math.min(W * 0.4, H * 0.2) : Math.min(W * 0.2, H * 0.3);
  const T = compact ? H * 0.2 : H * 0.25;
  const minVis = compact ? 8 : 11;
  const raw = layers.map((l) => l.t);
  let k = T / total;
  for (let it = 0; it < 4; it++) {
    const fixed = raw.filter((t) => t * k < minVis).length * minVis;
    const flex = raw.filter((t) => t * k >= minVis).reduce((a, t) => a + t, 0);
    if (flex > 0) k = (T - fixed) / flex;
  }
  const vis = raw.map((t) => Math.max(minVis, t * k));
  const Tvis = vis.reduce((a, b) => a + b, 0);
  const gapMax = Math.max(10, ((compact ? H * 0.5 : H * 0.8) - S - Tvis) / (count - 1));
  const gap = gapMax * explode;
  const Htot = Tvis + gap * (count - 1);
  const ox = compact ? W * 0.5 : W * 0.47;
  const cyStage = compact ? H * 0.47 : H * 0.5;
  const oy = cyStage + Htot / 2;

  const zr = [];
  {
    let z = 0;
    for (let i = count - 1; i >= 0; i--) { zr[i] = [z, z + vis[i]]; z += vis[i] + gap; }
  }
  const proj = (x, y, z) => [ox + (x - y) * C30, oy + (x + y) * S30 - z];
  const rotFor = (i) => ((i - (count - 1) / 2) * 2.4 * Math.PI / 180) * explode;
  const corners = (th) => [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([a, b]) => {
    const x = (a * S) / 2; const y = (b * S) / 2;
    return [x * Math.cos(th) - y * Math.sin(th), x * Math.sin(th) + y * Math.cos(th)];
  });

  const scanZ = zr[0][1] + 18 - (zr[0][1] + 36) * easeIO(scanT);
  const scanning = scanVis > 0.01;
  const hitIdx = scanning ? zr.findIndex(([a, b]) => scanZ >= a - gap / 2 && scanZ <= b + gap / 2) : -1;

  const tones = ['#FAFAF9', '#E7E5E4', '#F5F5F4', '#D6D3D1', '#44403C', '#E7E5E4', '#A8A29E', '#292524'];
  const hexMix = (a, b, t) => {
    const h = (c) => { const m = String(c).replace('#', ''); const f = m.length === 3 ? m.split('').map((x) => x + x).join('') : m.padEnd(6, '0'); return [0, 2, 4].map((o) => parseInt(f.slice(o, o + 2), 16) || 0); };
    const A = h(a); const B = h(b);
    return '#' + A.map((v, j) => Math.round(v + (B[j] - v) * t).toString(16).padStart(2, '0')).join('');
  };
  const baseTone = (i) => (i === accentIdx ? accent : hexMix(slab, tones[i % tones.length], 0.85));
  const darkLayer = (i) => i !== accentIdx && (tones[i % tones.length] === '#44403C' || tones[i % tones.length] === '#292524');
  const patternInk = (i) => (darkLayer(i) || i === accentIdx ? '#FFFFFF' : ink);

  const patternBody = (type, c) => {
    switch (type % 8) {
      case 0: return <path d="M0 0 L6 0 M0 0 L0 6" stroke={c} strokeWidth="0.6" fill="none" />;
      case 1: return <path d="M-1 7 L7 -1 M2 9 L9 2" stroke={c} strokeWidth="0.7" fill="none" />;
      case 2: return <g fill={c}><circle cx="1.5" cy="2" r="0.7" /><circle cx="5" cy="5.5" r="0.5" /><circle cx="6.2" cy="1.4" r="0.45" /><circle cx="2.8" cy="6.4" r="0.55" /></g>;
      case 3: return <g fill="none" stroke={c} strokeWidth="0.6"><circle cx="3.5" cy="3.5" r="2.6" /></g>;
      case 4: return <g fill={c} opacity="0.9"><rect x="0" y="0" width="3.5" height="1.6" /><rect x="3.5" y="3.5" width="3.5" height="1.6" /><rect x="0" y="3.5" width="1.6" height="3.5" opacity="0.6" /><rect x="3.5" y="0" width="1.6" height="3.5" opacity="0.6" /></g>;
      case 5: return <g fill={c}><circle cx="1" cy="1" r="0.55" /><circle cx="4.5" cy="2.5" r="0.55" /><circle cx="2.5" cy="5" r="0.55" /><circle cx="6" cy="6" r="0.55" /><circle cx="6.3" cy="3.6" r="0.4" /><circle cx="3.6" cy="0.4" r="0.35" /></g>;
      case 6: return <path d="M0 1.75 H7 M0 5.25 H7" stroke={c} strokeWidth="0.5" fill="none" />;
      default: return <path d="M0 3.5 Q1.75 1.5 3.5 3.5 T7 3.5" stroke={c} strokeWidth="0.7" fill="none" />;
    }
  };
  const faceMats = { top: `matrix(${C30} ${S30} ${-C30} ${S30} 0 0)`, l: `matrix(${C30} ${S30} 0 1 0 0)`, r: `matrix(${C30} ${-S30} 0 1 0 0)` };

  const mono = '"IBM Plex Mono", ui-monospace, "SF Mono", Menlo, monospace';
  const sans = 'Inter, -apple-system, "Helvetica Neue", sans-serif';
  const pts = (arr) => arr.map((q) => `${q[0].toFixed(1)},${q[1].toFixed(1)}`).join(' ');

  const drawSlab = (i) => {
    const th = rotFor(i);
    const cs = corners(th);
    const [z0, z1] = zr[i];
    const top = cs.map(([x, y]) => proj(x, y, z1));
    const faces = [];
    for (let e = 0; e < 4; e++) {
      const a = cs[e]; const b = cs[(e + 1) % 4];
      const mx = (a[0] + b[0]) / 2; const my = (a[1] + b[1]) / 2;
      if (mx + my <= 0.5) continue;
      const kind = my > mx ? 'l' : 'r';
      faces.push({ kind, poly: [proj(a[0], a[1], z1), proj(b[0], b[1], z1), proj(b[0], b[1], z0), proj(a[0], a[1], z0)] });
    }
    const base = baseTone(i);
    const hit = i === hitIdx;
    const stroke = hit ? accent : ink;
    const sw = hit ? 1.4 : 0.9;
    return (
      <g key={'s' + i}>
        {faces.map((f, j) => (
          <g key={j}>
            <polygon points={pts(f.poly)} fill={hexMix(base, '#000000', f.kind === 'l' ? 0.1 : 0.2)} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
            <polygon points={pts(f.poly)} fill={`url(#${uid}-p${i}${f.kind})`} opacity={0.25 + texture * 0.6} />
          </g>
        ))}
        <polygon points={pts(top)} fill={base} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
        <polygon points={pts(top)} fill={`url(#${uid}-p${i}top)`} opacity={0.3 + texture * 0.45} />
      </g>
    );
  };

  const scanPlane = () => {
    const m = 1.18;
    const q = [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([a, b]) => proj((a * S * m) / 2, (b * S * m) / 2, scanZ));
    return (
      <g key="scan" opacity={scanVis}>
        <polygon points={pts(q)} fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1" />
        <line x1={q[3][0]} y1={q[3][1]} x2={q[2][0]} y2={q[2][1]} stroke={accent} strokeWidth="2" />
        <line x1={q[2][0]} y1={q[2][1]} x2={q[1][0]} y2={q[1][1]} stroke={accent} strokeWidth="2" />
      </g>
    );
  };

  const order = [];
  for (let i = count - 1; i >= 0; i--) {
    if (scanning && scanZ < zr[i][0] && (i === count - 1 || scanZ >= zr[i + 1][0])) order.push(scanPlane());
    order.push(drawSlab(i));
  }
  if (scanning && scanZ >= zr[0][0]) order.push(scanPlane());

  const rightCorner = (i) => { const cs = corners(rotFor(i)); const best = cs.reduce((a, c) => (c[0] - c[1] > a[0] - a[1] ? c : a), cs[0]); return proj(best[0], best[1], (zr[i][0] + zr[i][1]) / 2); };
  const labelX = compact ? W - 20 : Math.min(W - 56 - 280, ox + S * C30 + 90);
  const leftX = ox - S * C30;
  const dimX = leftX - (compact ? 18 : 34);
  const yTop = proj(-S / 2, S / 2, zr[0][1])[1];
  const yBot = proj(-S / 2, S / 2, 0)[1];
  const scanMm = (() => {
    let acc = 0;
    for (let i = count - 1; i >= 0; i--) {
      const [a, b] = zr[i];
      if (scanZ <= a) break;
      acc += layers[i].t * clamp((scanZ - a) / (b - a));
    }
    return acc;
  })();

  const fmt = (n) => (Math.round(n * 10) / 10).toString();

  return (
    <section ref={sectionRef} className="cross-section" aria-label={`${title}: ${layers.map((l) => `${l.name}, ${l.material}, ${l.t} ${unit}`).join('; ')}`}
      style={{ position: 'relative', width: '100%', height: `${Math.round(stageH * screens)}px`, backgroundColor: bg, color: ink, fontFamily: sans }}>
      <div style={{ position: 'sticky', top: 0, height: `${stageH}px`, overflow: 'hidden', background: bg }}>
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Isometric cross-section of ${title}`}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <defs>
            {layers.map((_, i) => ['top', 'l', 'r'].map((f) => (
              <pattern key={i + f} id={`${uid}-p${i}${f}`} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform={faceMats[f]}>
                {patternBody(i, patternInk(i))}
              </pattern>
            )))}
            <pattern id={`${uid}-iso`} width={40 * C30 * 2} height="40" patternUnits="userSpaceOnUse">
              <path d={`M0 20 L${40 * C30} 0 L${80 * C30} 20 L${40 * C30} 40 Z`} fill="none" stroke={ink} strokeOpacity="0.06" strokeWidth="0.75" />
            </pattern>
          </defs>
          {showGrid && <rect width={W} height={H} fill={`url(#${uid}-iso)`} />}

          <g opacity={0.5}>
            {(() => {
              const g = [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([a, b]) => proj((a * S * 1.5) / 2, (b * S * 1.5) / 2, -8));
              return <polygon points={pts(g)} fill={ink} fillOpacity="0.05" />;
            })()}
          </g>

          {order}

          {layers.map((l, i) => {
            const lt = compact ? Math.min(labelsT(i), 1) : labelsT(i);
            if (lt < 0.01) return null;
            const [ax, ay] = rightCorner(i);
            const hit = i === hitIdx;
            const ex = compact ? ax + 22 : labelX - 10;
            return (
              <g key={'l' + i} opacity={lt}>
                <circle cx={ax} cy={ay} r={2.2} fill={hit ? accent : ink} />
                <path d={`M ${ax} ${ay} L ${ax + (ex - ax) * lt} ${ay}`} stroke={hit ? accent : ink} strokeWidth="0.75" />
                {compact ? (
                  <text x={ex + 4} y={ay + 3.5} fontFamily={mono} fontSize="10" fill={hit ? accent : muted}>{String(i + 1).padStart(2, '0')}</text>
                ) : (
                  <g transform={`translate(${(1 - lt) * 12} 0)`}>
                    <text x={labelX} y={ay - 3} fontFamily={sans} fontSize="14" fontWeight="500" fill={hit ? accent : ink}>
                      <tspan fontFamily={mono} fontWeight="400" fontSize="10.5" fill={hit ? accent : muted}>{String(i + 1).padStart(2, '0')}  </tspan>{l.name}
                    </text>
                    <text x={labelX + 22} y={ay + 13} fontFamily={mono} fontSize="10.5" fill={muted}>{l.material} · {fmt(l.t)} {unit}</text>
                  </g>
                )}
              </g>
            );
          })}

          {dimT > 0.01 && (
            <g opacity={dimT} stroke={ink} fill="none">
              <line x1={dimX} y1={yTop} x2={dimX} y2={yBot} strokeWidth="0.9" />
              <line x1={dimX - 6} y1={yTop} x2={leftX - 6} y2={yTop} strokeWidth="0.6" />
              <line x1={dimX - 6} y1={yBot} x2={leftX - 6} y2={yBot} strokeWidth="0.6" />
              <path d={`M ${dimX - 3.5} ${yTop + 8} L ${dimX} ${yTop} L ${dimX + 3.5} ${yTop + 8}`} strokeWidth="0.9" />
              <path d={`M ${dimX - 3.5} ${yBot - 8} L ${dimX} ${yBot} L ${dimX + 3.5} ${yBot - 8}`} strokeWidth="0.9" />
              {finalT > 0 && zr.slice(1).map(([a, b], j) => {
                const yy = proj(-S / 2, S / 2, b)[1];
                return <line key={j} x1={dimX - 3} y1={yy} x2={dimX + 3} y2={yy} strokeWidth="0.6" opacity={finalT} />;
              })}
              <text x={dimX - 12} y={(yTop + yBot) / 2} transform={`rotate(-90 ${dimX - 12} ${(yTop + yBot) / 2})`} textAnchor="middle" stroke="none" fill={ink}
                fontFamily={mono} fontSize={compact ? 10 : 11.5} letterSpacing="1">Σ {fmt(total)} {unit}</text>
            </g>
          )}
        </svg>

        <div style={{ position: 'absolute', top: compact ? 20 : 48, left: compact ? 20 : 56, maxWidth: compact ? W - 40 : Math.min(340, leftX - 120), zIndex: 2 }}>
          <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: muted, marginBottom: compact ? 10 : 16 }}>{eyebrow}</div>
          <h2 style={{ margin: 0, fontSize: compact ? 30 : 52, lineHeight: 1.02, fontWeight: 300, letterSpacing: '-0.035em' }}>{title}</h2>
          <p style={{ margin: compact ? '10px 0 0' : '18px 0 0', fontSize: compact ? 13 : 15, lineHeight: 1.55, color: muted, maxWidth: 300, fontWeight: 300 }}>{description}</p>
        </div>

        <div aria-live="polite" style={{ position: 'absolute', left: compact ? 20 : 56, bottom: compact ? 20 : 48, zIndex: 2, fontFamily: mono, fontVariantNumeric: 'tabular-nums' }}>
          <div style={{ fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: muted }}>
            {scanning ? 'Scanning' : finalT > 0.5 ? 'Assembled' : explode > 0.5 ? 'Exploded view' : 'Solid'}
          </div>
          <div style={{ fontSize: compact ? 26 : 40, fontFamily: sans, fontWeight: 300, letterSpacing: '-0.02em', marginTop: 6, color: scanning ? accent : ink }}>
            {scanning ? fmt(total - scanMm) : fmt(total)}<span style={{ fontSize: compact ? 13 : 16, color: muted, marginLeft: 6 }}>{unit}</span>
          </div>
          <div style={{ fontSize: 11, color: muted, marginTop: 4 }}>
            {scanning && hitIdx >= 0 ? `z · ${layers[hitIdx].name}` : `${count} layers · section A–A`}
          </div>
        </div>

        {compact && (
          <div style={{ position: 'absolute', left: 20, right: 20, bottom: 112, zIndex: 2, fontFamily: mono, fontSize: 10, color: muted, opacity: Math.max(labelsT(0), 0), display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 12px' }}>
            {layers.map((l, i) => (
              <div key={i} style={{ color: i === hitIdx ? accent : muted, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {String(i + 1).padStart(2, '0')} <span style={{ color: i === hitIdx ? accent : ink }}>{l.name}</span> {fmt(l.t)}
              </div>
            ))}
          </div>
        )}

        {!compact && (
          <div aria-hidden="true" style={{ position: 'absolute', right: 56, top: 48, zIndex: 2, fontFamily: mono, fontSize: 10.5, letterSpacing: '0.14em', color: muted, textAlign: 'right', textTransform: 'uppercase' }}>
            <div>Iso 30° · scale {(k).toFixed(1)} px/{unit}</div>
            <div style={{ marginTop: 14, width: 160, height: 1, background: '#D6D3D1', position: 'relative', marginLeft: 'auto' }}>
              <div style={{ position: 'absolute', inset: 0, background: ink, transformOrigin: 'left', transform: `scaleX(${p})` }} />
            </div>
            <div style={{ marginTop: 8 }}>{String(Math.round(p * 100)).padStart(3, '0')} / 100</div>
          </div>
        )}
      </div>
    </section>
  );
}

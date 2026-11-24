const MANIFEST = {
  "type": "Creative.Shadowbox",
  "description": "A layered paper-cut diorama in a deep shadowbox: eight cut-paper layers drop in front to back, then shift in parallax under the pointer or device tilt while real drop shadows move with a virtual light, with a museum-style label",
  "editorElement": {
    "selector": ".shadowbox",
    "displayName": "Shadowbox",
    "archetype": "container",
    "data": {
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Room 3 · Works on paper", "group": "Content" },
      "headline": { "dataType": "text", "displayName": "Label Headline", "defaultValue": "Nocturne for a Small House", "group": "Content" },
      "artist": { "dataType": "text", "displayName": "Artist / Studio", "defaultValue": "Studio North", "group": "Content" },
      "medium": { "dataType": "text", "displayName": "Medium & Year", "defaultValue": "Hand-cut paper, eight layers, 2026", "group": "Content" },
      "caption": { "dataType": "text", "displayName": "Caption", "defaultValue": "Each sheet sits a finger's width from the next, so the moonlight falls in eight separate shadows.", "group": "Content" },
      "wallColor": { "dataType": "color", "displayName": "Wall", "defaultValue": "#EFEDEB", "group": "Colors" },
      "frameColor": { "dataType": "color", "displayName": "Box Frame", "defaultValue": "#292524", "group": "Colors" },
      "skyColor": { "dataType": "color", "displayName": "Layer 1 · Sky", "defaultValue": "#E7E5E4", "group": "Layers" },
      "moonColor": { "dataType": "color", "displayName": "Layer 2 · Moon & Clouds", "defaultValue": "#FFFFFF", "group": "Layers" },
      "farColor": { "dataType": "color", "displayName": "Layer 3 · Far Ridge", "defaultValue": "#D9D5D2", "group": "Layers" },
      "midColor": { "dataType": "color", "displayName": "Layer 4 · Mid Ridge", "defaultValue": "#C4BFBB", "group": "Layers" },
      "forestColor": { "dataType": "color", "displayName": "Layer 5 · Forest", "defaultValue": "#A8A29E", "group": "Layers" },
      "hillColor": { "dataType": "color", "displayName": "Layer 6 · House Hill", "defaultValue": "#78716C", "group": "Layers" },
      "nearColor": { "dataType": "color", "displayName": "Layer 7 · Near Grass", "defaultValue": "#44403C", "group": "Layers" },
      "matColor": { "dataType": "color", "displayName": "Layer 8 · Window Mat", "defaultValue": "#FAFAF9", "group": "Layers" },
      "accentColor": { "dataType": "color", "displayName": "Window Glow", "defaultValue": "#E2A64B", "group": "Colors" },
      "inkColor": { "dataType": "color", "displayName": "Label Ink", "defaultValue": "#1C1917", "group": "Colors" },
      "displayFont": { "dataType": "select", "displayName": "Label Font", "defaultValue": "Fraunces", "options": ["Fraunces", "Instrument Serif", "Inter", "Georgia"], "group": "Typography" },
      "fontFamily": { "dataType": "select", "displayName": "Text Font", "defaultValue": "Inter", "options": ["Inter", "system-ui", "Helvetica Neue", "Georgia"], "group": "Typography" },
      "boxAspect": { "dataType": "select", "displayName": "Box Shape", "defaultValue": "auto", "options": ["auto", "landscape", "square", "portrait"], "group": "Layout" },
      "windowShape": { "dataType": "select", "displayName": "Window Cut-out", "defaultValue": "arch", "options": ["arch", "circle", "rectangle"], "group": "Layout" },
      "depth": { "dataType": "select", "displayName": "Box Depth", "defaultValue": "deep", "options": ["shallow", "medium", "deep"], "group": "Layout" },
      "lightAngle": { "dataType": "select", "displayName": "Light From", "defaultValue": "top-left", "options": ["top-left", "top", "top-right", "left", "right"], "group": "Layout" },
      "showLabel": { "dataType": "booleanValue", "displayName": "Museum Label", "defaultValue": "true", "group": "Layout" },
      "showStars": { "dataType": "booleanValue", "displayName": "Pin-prick Stars", "defaultValue": "true", "group": "Layout" },
      "showFigure": { "dataType": "booleanValue", "displayName": "Small Figure", "defaultValue": "true", "group": "Layout" },
      "parallax": { "dataType": "select", "displayName": "Parallax Strength", "defaultValue": "medium", "options": ["subtle", "medium", "strong"], "group": "Animation" },
      "deviceTilt": { "dataType": "booleanValue", "displayName": "Use Device Tilt", "defaultValue": "true", "group": "Animation" },
      "dropIn": { "dataType": "booleanValue", "displayName": "Drop-in Entrance", "defaultValue": "true", "group": "Animation" },
      "replayOnScroll": { "dataType": "booleanValue", "displayName": "Replay on Every Entry", "defaultValue": "false", "group": "Animation" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const eyebrow = config?.eyebrow || 'Room 3 · Works on paper';
  const headline = config?.headline || 'Nocturne for a Small House';
  const artist = config?.artist || 'Studio North';
  const medium = config?.medium || 'Hand-cut paper, eight layers, 2026';
  const caption = config?.caption || "Each sheet sits a finger's width from the next, so the moonlight falls in eight separate shadows.";
  const wall = config?.wallColor || '#EFEDEB';
  const frameC = config?.frameColor || '#292524';
  const colors = [
    config?.skyColor || '#E7E5E4',
    config?.moonColor || '#FFFFFF',
    config?.farColor || '#D9D5D2',
    config?.midColor || '#C4BFBB',
    config?.forestColor || '#A8A29E',
    config?.hillColor || '#78716C',
    config?.nearColor || '#44403C',
    config?.matColor || '#FAFAF9'
  ];
  const accent = config?.accentColor || '#E2A64B';
  const ink = config?.inkColor || '#1C1917';
  const displayFont = config?.displayFont || 'Fraunces';
  const fontFamily = config?.fontFamily || 'Inter';
  const boxAspect = config?.boxAspect || 'auto';
  const windowShape = config?.windowShape || 'arch';
  const depthMul = { shallow: 0.6, medium: 1, deep: 1.4 }[config?.depth || 'deep'] || 1.4;
  const lightFrom = { 'top-left': 315, top: 0, 'top-right': 45, left: 270, right: 90 }[config?.lightAngle || 'top-left'] ?? 315;
  const showLabel = bool(config?.showLabel, true);
  const showStars = bool(config?.showStars, true);
  const showFigure = bool(config?.showFigure, true);
  const parallaxMul = { subtle: 0.55, medium: 1, strong: 1.6 }[config?.parallax || 'medium'] || 1;
  const deviceTilt = bool(config?.deviceTilt, true);
  const dropIn = bool(config?.dropIn, true);
  const replayOnScroll = bool(config?.replayOnScroll, false);

  const uid = React.useMemo(() => 'sb' + Math.random().toString(36).slice(2, 9), []);
  const prefersReducedMotion = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  React.useEffect(() => {
    const id = 'ncs-font-fraunces-inter';
    if (typeof document === 'undefined' || document.getElementById(id)) return;
    const l = document.createElement('link');
    l.id = id; l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..500&family=Instrument+Serif&family=Inter:wght@300;400;500&display=swap';
    document.head.appendChild(l);
  }, []);

  const rootRef = React.useRef(null);
  const boxRef = React.useRef(null);
  const tiltRef = React.useRef(null);
  const layerRefs = React.useRef([]);
  const [width, setWidth] = React.useState(1280);
  const [shown, setShown] = React.useState(!dropIn || prefersReducedMotion);

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return undefined;
    const measure = () => setWidth(el.clientWidth);
    measure();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (ro) ro.observe(el);
    window.addEventListener('resize', measure);
    return () => { if (ro) ro.disconnect(); window.removeEventListener('resize', measure); };
  }, []);

  React.useEffect(() => {
    if (!dropIn || prefersReducedMotion) { setShown(true); return undefined; }
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') { setShown(true); return undefined; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { setShown(true); if (!replayOnScroll) io.disconnect(); }
        else if (replayOnScroll) setShown(false);
      });
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, [dropIn, replayOnScroll, prefersReducedMotion]);

  const W = width;
  const compact = W < 760;
  const aspect = boxAspect === 'landscape' ? 4 / 3 : boxAspect === 'square' ? 1 : boxAspect === 'portrait' ? 4 / 5 : compact ? 4 / 5 : 4 / 3;
  const boxW = Math.round(compact ? W - 40 : Math.min(W * 0.62, 820, 560 * aspect));
  const boxH = Math.round(boxW / aspect);
  const rim = Math.max(14, Math.round(boxW * 0.03));
  const innerW = boxW - rim * 2;
  const innerH = boxH - rim * 2;

  const la = (lightFrom * Math.PI) / 180;
  const L = [Math.sin(la), -Math.cos(la)];

  // pointer / device tilt driving parallax and the virtual light, written straight to the DOM
  React.useEffect(() => {
    if (prefersReducedMotion) return undefined;
    const box = boxRef.current;
    if (!box) return undefined;
    const cur = { x: 0, y: 0 };
    const tgt = { x: 0, y: 0 };
    let raf = 0;
    let idle = 0;
    const apply = () => {
      const n = layerRefs.current.length;
      layerRefs.current.forEach((el, i) => {
        if (!el) return;
        const d = i / (n - 1);
        const shift = 22 * parallaxMul * (d - 0.25);
        const lx = L[0] + cur.x * 0.7;
        const ly = L[1] + cur.y * 0.7;
        const dist = depthMul * (4 + 9 * d) * (innerW / 700);
        el.style.transform = `translate3d(${(cur.x * shift).toFixed(2)}px, ${(cur.y * shift).toFixed(2)}px, 0)`;
        el.style.filter = i === 0 ? 'none' : `drop-shadow(${(-lx * dist).toFixed(2)}px ${(-ly * dist).toFixed(2)}px ${(dist * 0.9).toFixed(2)}px rgba(20,16,12,${0.2 + 0.1 * d}))`;
      });
      if (tiltRef.current) tiltRef.current.style.transform = `rotateY(${(cur.x * 5).toFixed(2)}deg) rotateX(${(-cur.y * 4).toFixed(2)}deg)`;
    };
    const tick = () => {
      cur.x += (tgt.x - cur.x) * 0.08;
      cur.y += (tgt.y - cur.y) * 0.08;
      apply();
      raf = Math.abs(tgt.x - cur.x) + Math.abs(tgt.y - cur.y) < 0.0008 ? 0 : requestAnimationFrame(tick);
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const settleLater = () => {
      clearTimeout(idle);
      idle = setTimeout(() => { tgt.x = 0; tgt.y = 0; kick(); }, 2400);
    };
    const onMove = (e) => {
      const r = box.getBoundingClientRect();
      const pt = e.touches ? e.touches[0] : e;
      if (!pt) return;
      tgt.x = Math.max(-1, Math.min(1, ((pt.clientX - r.left) / r.width) * 2 - 1));
      tgt.y = Math.max(-1, Math.min(1, ((pt.clientY - r.top) / r.height) * 2 - 1));
      kick();
      settleLater();
    };
    const onLeave = () => { tgt.x = 0; tgt.y = 0; kick(); };
    const onOrient = (e) => {
      if (e.gamma == null || e.beta == null) return;
      tgt.x = Math.max(-1, Math.min(1, e.gamma / 25));
      tgt.y = Math.max(-1, Math.min(1, (e.beta - 40) / 25));
      kick();
      settleLater();
    };
    const host = rootRef.current;
    host.addEventListener('pointermove', onMove);
    host.addEventListener('touchmove', onMove, { passive: true });
    host.addEventListener('pointerleave', onLeave);
    if (deviceTilt && typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) window.addEventListener('deviceorientation', onOrient);
    apply();
    return () => {
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('touchmove', onMove);
      host.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('deviceorientation', onOrient);
      cancelAnimationFrame(raf);
      clearTimeout(idle);
    };
  }, [prefersReducedMotion, parallaxMul, depthMul, lightFrom, innerW, deviceTilt]); // eslint-disable-line react-hooks/exhaustive-deps

  const staticShadow = (i) => {
    if (i === 0) return 'none';
    const d = i / 7;
    const dist = depthMul * (4 + 9 * d) * (innerW / 700);
    return `drop-shadow(${(-L[0] * dist).toFixed(2)}px ${(-L[1] * dist).toFixed(2)}px ${(dist * 0.9).toFixed(2)}px rgba(20,16,12,${0.2 + 0.1 * d}))`;
  };

  // ---- the eight paper layers (viewBox 1000 x 750, bottom-anchored) ----
  const art = React.useMemo(() => {
    let a = 1234567;
    const rnd = () => { a = (a * 16807) % 2147483647; return (a - 1) / 2147483646; };
    const f = (v) => v.toFixed(1);
    const ridge = (base, amp, step, jag, phase) => {
      let d = `M -60 900 L -60 ${f(base)}`;
      for (let x = -60; x <= 1060; x += step) {
        const y = base - amp * (0.5 + 0.5 * Math.sin(x * 0.006 + phase)) * (0.7 + 0.3 * Math.sin(x * 0.017 + phase * 2)) - (rnd() - 0.5) * jag;
        d += ` L ${f(x)} ${f(y)}`;
      }
      return d + ' L 1060 900 Z';
    };
    const stars = [];
    for (let i = 0; i < 70; i++) stars.push([rnd() * 1000, rnd() * 420, 0.8 + rnd() * 1.8]);
    const cloud = (cx, cy, s) => {
      const r = [26, 38, 30, 22].map((v) => v * s);
      let d = `M ${f(cx - 70 * s)} ${f(cy)}`;
      d += ` a ${f(r[0])} ${f(r[0])} 0 0 1 ${f(40 * s)} ${f(-18 * s)}`;
      d += ` a ${f(r[1])} ${f(r[1])} 0 0 1 ${f(62 * s)} ${f(-6 * s)}`;
      d += ` a ${f(r[2])} ${f(r[2])} 0 0 1 ${f(44 * s)} ${f(14 * s)}`;
      d += ` a ${f(r[3])} ${f(r[3])} 0 0 1 ${f(12 * s)} ${f(10 * s)} Z`;
      return d;
    };
    const pines = (base, count, minH, maxH, x0, x1, waveAmp) => {
      let d = `M ${x0 - 40} 900 L ${x0 - 40} ${f(base)}`;
      const pts = [];
      for (let x = x0 - 40; x <= x1 + 40; x += 14) pts.push([x, base - waveAmp * Math.sin(x * 0.008 + 1.3)]);
      pts.forEach(([x, y]) => { d += ` L ${f(x)} ${f(y)}`; });
      d += ` L ${x1 + 40} 900 Z`;
      for (let i = 0; i < count; i++) {
        const x = x0 + rnd() * (x1 - x0);
        const y = base - waveAmp * Math.sin(x * 0.008 + 1.3) + 6;
        const h = minH + rnd() * (maxH - minH);
        const w = h * 0.36;
        d += ` M ${f(x - w / 2)} ${f(y)} L ${f(x - w * 0.18)} ${f(y - h * 0.45)} L ${f(x - w * 0.36)} ${f(y - h * 0.45)} L ${f(x - w * 0.12)} ${f(y - h * 0.75)} L ${f(x - w * 0.24)} ${f(y - h * 0.75)} L ${f(x)} ${f(y - h)} L ${f(x + w * 0.24)} ${f(y - h * 0.75)} L ${f(x + w * 0.12)} ${f(y - h * 0.75)} L ${f(x + w * 0.36)} ${f(y - h * 0.45)} L ${f(x + w * 0.18)} ${f(y - h * 0.45)} L ${f(x + w / 2)} ${f(y)} Z`;
      }
      return d;
    };
    const grass = () => {
      const gy = (x) => 618 - 14 * Math.sin(x * 0.011 + 0.6);
      let d = `M -60 900 L -60 ${f(gy(-60))}`;
      for (let x = -60; x <= 1060; x += 8) {
        const y = gy(x) - 8 - rnd() * 30;
        d += ` L ${f(x)} ${f(gy(x))} L ${f(x + 2 + rnd() * 4)} ${f(y)} L ${f(x + 5)} ${f(gy(x))}`;
      }
      d += ' L 1060 900 Z';
      const tree = (cx, base, h, w) => {
        let t = `M ${f(cx - w * 0.06)} 900 L ${f(cx - w * 0.06)} ${f(base)}`;
        const tiers = 5;
        for (let k = 0; k < tiers; k++) {
          const y0 = base - (h * k) / tiers;
          const ww = w * (1 - k / (tiers + 0.6)) / 2;
          t += ` M ${f(cx - ww)} ${f(y0)} L ${f(cx)} ${f(y0 - h / tiers * 1.7)} L ${f(cx + ww)} ${f(y0)} Z`;
        }
        return t + ` M ${f(cx - w * 0.06)} 900 L ${f(cx - w * 0.06)} ${f(base)} L ${f(cx + w * 0.06)} ${f(base)} L ${f(cx + w * 0.06)} 900 Z`;
      };
      d += ' ' + tree(170, 625, 330, 130) + ' ' + tree(235, 630, 210, 90);
      d += ' ' + tree(842, 625, 300, 120) + ' ' + tree(780, 630, 170, 76);
      return d;
    };
    return {
      stars,
      far: ridge(430, 150, 22, 18, 0.4),
      mid: ridge(520, 90, 26, 8, 2.2),
      forest: pines(585, 46, 34, 74, -20, 1020, 14),
      clouds: [cloud(350, 280, 1.05), cloud(745, 340, 0.8), cloud(470, 190, 0.6)].join(' '),
      grass: grass()
    };
  }, []);

  const hillPath = 'M -60 900 L -60 660 C 120 640 240 610 380 600 C 520 590 600 560 700 548 C 820 534 940 560 1060 590 L 1060 900 Z';
  const hx = 640, hy = 560;
  const house = `M ${hx} ${hy} L ${hx} ${hy - 46} L ${hx + 38} ${hy - 80} L ${hx + 76} ${hy - 46} L ${hx + 76} ${hy} Z M ${hx + 52} ${hy - 62} L ${hx + 52} ${hy - 90} L ${hx + 62} ${hy - 90} L ${hx + 62} ${hy - 54} Z`;
  const figure = `M 548 584 L 552 556 L 560 556 L 564 584 Z M 556 552 m -6 0 a 6 6 0 1 0 12 0 a 6 6 0 1 0 -12 0`;

  const svgProps = { viewBox: '0 0 1000 750', preserveAspectRatio: 'xMidYMax slice', width: '100%', height: '100%', style: { display: 'block', overflow: 'visible' } };
  const layers = [
    <svg key="0" {...svgProps}>
      <rect x="-200" y="-200" width="1400" height="1200" fill={colors[0]} />
      {showStars && art.stars.map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r * 0.9} fill={ink} opacity="0.16" />)}
    </svg>,
    <svg key="1" {...svgProps}>
      <circle cx="610" cy="235" r="60" fill={colors[1]} />
      <circle cx="610" cy="235" r="47" fill="none" stroke={ink} strokeOpacity="0.06" strokeWidth="1.5" />
      <path d={art.clouds} fill={colors[1]} />
    </svg>,
    <svg key="2" {...svgProps}><path d={art.far} fill={colors[2]} /></svg>,
    <svg key="3" {...svgProps}><path d={art.mid} fill={colors[3]} /></svg>,
    <svg key="4" {...svgProps}><path d={art.forest} fill={colors[4]} /></svg>,
    <svg key="5" {...svgProps}>
      <rect x={hx + 14} y={hy - 36} width="16" height="20" fill={accent} />
      <rect x={hx + 46} y={hy - 36} width="16" height="20" fill={accent} />
      <path d={`${hillPath} ${house} M ${hx + 14} ${hy - 36} h 16 v 20 h -16 Z M ${hx + 46} ${hy - 36} h 16 v 20 h -16 Z ${showFigure ? figure : ''}`} fill={colors[5]} fillRule="evenodd" />
    </svg>,
    <svg key="6" {...svgProps}><path d={art.grass} fill={colors[6]} /></svg>
  ];

  // window mat in pixel space so the cut-out fits any box shape
  const m = Math.round(Math.min(innerW, innerH) * (compact ? 0.08 : 0.09));
  const wx0 = m, wx1 = innerW - m, wy0 = m, wy1 = innerH - m;
  const ww = wx1 - wx0;
  let windowPath;
  if (windowShape === 'circle') {
    const r = Math.min(ww, wy1 - wy0) / 2;
    const cx = innerW / 2, cy = innerH / 2;
    windowPath = `M ${cx - r} ${cy} a ${r} ${r} 0 1 0 ${2 * r} 0 a ${r} ${r} 0 1 0 ${-2 * r} 0 Z`;
  } else if (windowShape === 'rectangle') {
    windowPath = `M ${wx0} ${wy0} H ${wx1} V ${wy1} H ${wx0} Z`;
  } else {
    const r = ww / 2;
    const top = Math.min(wy0 + r, wy1 - 40);
    windowPath = `M ${wx0} ${wy1} V ${top} A ${r} ${r} 0 0 1 ${wx1} ${top} V ${wy1} Z`;
  }
  const matLayer = (
    <svg key="7" width={innerW} height={innerH} viewBox={`0 0 ${innerW} ${innerH}`} style={{ display: 'block', overflow: 'visible' }}>
      <path d={`M -40 -40 H ${innerW + 40} V ${innerH + 40} H -40 Z ${windowPath}`} fill={colors[7]} fillRule="evenodd" />
      <path d={windowPath} fill="none" stroke={ink} strokeOpacity="0.12" strokeWidth="1" transform={`translate(${innerW / 2} ${innerH / 2}) scale(${1 + 14 / innerW}) translate(${-innerW / 2} ${-innerH / 2})`} />
      {[[m * 0.5, m * 0.5], [innerW - m * 0.5, m * 0.5]].map(([x, y], i) => (
        <path key={i} d={`M ${x} ${y - 5} L ${x + 1.4} ${y - 1.4} L ${x + 5} ${y} L ${x + 1.4} ${y + 1.4} L ${x} ${y + 5} L ${x - 1.4} ${y + 1.4} L ${x - 5} ${y} L ${x - 1.4} ${y - 1.4} Z`} fill={wall} opacity="0.9" />
      ))}
    </svg>
  );
  const allLayers = [...layers, matLayer];
  const N = allLayers.length;

  const sans = fontFamily === 'Georgia' ? 'Georgia, serif' : `${fontFamily}, -apple-system, "Helvetica Neue", sans-serif`;
  const display = displayFont === 'Georgia' ? 'Georgia, serif' : displayFont === 'Inter'
    ? 'Inter, -apple-system, "Helvetica Neue", sans-serif' : `"${displayFont}", Georgia, "Times New Roman", serif`;
  const mono = 'ui-monospace, "SF Mono", "IBM Plex Mono", Menlo, monospace';
  const over = Math.round(Math.max(innerW, innerH) * 0.05);
  const frameHi = 'rgba(255,255,255,0.08)';
  const innerShadow = `inset ${(-L[0] * 18 * depthMul).toFixed(1)}px ${(-L[1] * 18 * depthMul).toFixed(1)}px ${Math.round(30 * depthMul)}px rgba(0,0,0,0.38), inset 0 0 0 1px rgba(0,0,0,0.25)`;
  const vPad = compact ? 28 : 56;

  return (
    <section ref={rootRef} className="shadowbox" aria-label={`${headline}, paper-cut shadowbox`}
      style={{ position: 'relative', width: '100%', background: wall, color: ink, fontFamily: sans, padding: `${vPad}px ${compact ? 20 : 48}px ${compact ? 36 : 64}px`, boxSizing: 'border-box', overflow: 'hidden' }}>
      <style>{`.${uid}-drop{transition:transform 760ms cubic-bezier(.18,.9,.25,1.04), opacity 420ms ease}@media (prefers-reduced-motion: reduce){.${uid}-drop{transition:none}}`}</style>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: `radial-gradient(70% 60% at ${50 + L[0] * 20}% ${40 + L[1] * 20}%, rgba(255,255,255,0.55), rgba(255,255,255,0) 70%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'relative', fontFamily: mono, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(28,25,23,0.55)', textAlign: compact ? 'left' : 'center', marginBottom: compact ? 18 : 26 }}>{eyebrow}</div>

      <div style={{ position: 'relative', width: boxW, margin: '0 auto', perspective: `${boxW * 3}px` }}>
        <div aria-hidden="true" style={{
          position: 'absolute', left: '5%', right: '5%', top: 0, height: boxH * 0.94,
          background: 'rgba(20,16,12,0.32)', filter: `blur(${Math.round(18 * depthMul)}px)`,
          transform: `translate(${(-L[0] * 22 * depthMul).toFixed(1)}px, ${(18 + -L[1] * 16 * depthMul).toFixed(1)}px)`
        }} />
        <div ref={tiltRef} style={{ position: 'relative', transformStyle: 'preserve-3d' }}>
          <div ref={boxRef} role="img" aria-label={`${headline}: cut-paper diorama of a moonlit valley with forest, a small house${showFigure ? ' and a figure' : ''}, seen through a window mat`}
            style={{
              position: 'relative', width: boxW, height: boxH, background: frameC, borderRadius: 3,
              boxShadow: `inset 0 1px 0 ${frameHi}, inset 0 -2px 0 rgba(0,0,0,0.3)`
            }}>
            <div style={{ position: 'absolute', left: rim, top: rim, width: innerW, height: innerH, overflow: 'hidden', background: colors[0] }}>
              {allLayers.map((layer, i) => {
                const order = N - 1 - i;
                const isMat = i === N - 1;
                return (
                  <div key={i} className={`${uid}-drop`} style={{
                    position: 'absolute', inset: isMat ? 0 : -over,
                    transform: shown ? 'translate3d(0,0,0)' : `translate3d(0, ${-innerH * 0.18}px, 0) scale(1.04)`,
                    opacity: shown ? 1 : 0,
                    transitionDelay: shown ? `${order * 65}ms` : '0ms'
                  }}>
                    <div ref={(el) => { layerRefs.current[i] = el; }} style={{ position: 'absolute', inset: 0, filter: staticShadow(i), willChange: 'transform, filter' }}>
                      {layer}
                    </div>
                  </div>
                );
              })}
              <div aria-hidden="true" style={{ position: 'absolute', inset: 0, boxShadow: innerShadow, pointerEvents: 'none' }} />
            </div>
            <div aria-hidden="true" style={{ position: 'absolute', left: rim - 3, top: rim - 3, width: innerW + 6, height: innerH + 6, border: `3px solid ${'rgba(0,0,0,0.35)'}`, boxSizing: 'border-box', pointerEvents: 'none' }} />
          </div>
        </div>

        {showLabel && (
          <div style={{
            position: 'relative', marginTop: compact ? 22 : 30, marginLeft: compact ? 0 : 'auto', width: compact ? '100%' : Math.min(300, boxW * 0.42),
            background: '#FFFFFF', padding: compact ? '14px 16px 16px' : '16px 18px 18px', boxSizing: 'border-box',
            boxShadow: '0 1px 2px rgba(0,0,0,0.08), 0 6px 18px rgba(0,0,0,0.06)', borderRadius: 1,
            opacity: shown ? 1 : 0, transform: shown ? 'none' : 'translateY(8px)', transition: prefersReducedMotion ? 'none' : 'opacity 600ms ease 700ms, transform 600ms ease 700ms'
          }}>
            <div style={{ fontFamily: display, fontStyle: displayFont === 'Inter' ? 'normal' : 'italic', fontWeight: 400, fontSize: compact ? 18 : 19, lineHeight: 1.2, letterSpacing: '-0.01em' }}>{headline}</div>
            <div style={{ fontSize: 12, fontWeight: 500, marginTop: 6 }}>{artist}</div>
            <div style={{ fontSize: 12, color: 'rgba(28,25,23,0.6)', marginTop: 2 }}>{medium}</div>
            <div style={{ height: 1, background: 'rgba(28,25,23,0.12)', margin: '10px 0' }} />
            <div style={{ fontSize: 12, lineHeight: 1.5, color: 'rgba(28,25,23,0.72)' }}>{caption}</div>
          </div>
        )}
      </div>
    </section>
  );
}

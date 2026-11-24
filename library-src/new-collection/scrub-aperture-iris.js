const MANIFEST = {
  "type": "Scrub.ApertureIris",
  "description": "Scroll-scrubbed camera iris: a lens barrel pulls back from a full-bleed image, the diaphragm stops down f/1.4 to f/22 with a ticking readout and exposure scale, closes to black and reopens onto a second image and headline",
  "editorElement": {
    "selector": ".aperture-iris",
    "displayName": "Aperture Iris",
    "archetype": "container",
    "data": {
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Optics / Chapter 04", "group": "Content" },
      "headline1": { "dataType": "text", "displayName": "Headline 1", "defaultValue": "Let the light in.", "group": "Content" },
      "subline1": { "dataType": "text", "displayName": "Subline 1", "defaultValue": "Wide open at f/1.4, everything glows and nothing is certain.", "group": "Content" },
      "headline2": { "dataType": "text", "displayName": "Headline 2", "defaultValue": "Then choose what stays sharp.", "group": "Content" },
      "subline2": { "dataType": "text", "displayName": "Subline 2", "defaultValue": "Stopped down, the world resolves edge to edge.", "group": "Content" },
      "closedCaption": { "dataType": "text", "displayName": "Closed Caption", "defaultValue": "Shutter", "group": "Content" },
      "lensLabel": { "dataType": "text", "displayName": "Barrel Engraving", "defaultValue": "APERTURE  50 mm  1:1.4  Ø 46  NO. 2026-0417", "group": "Content" },
      "fStops": { "dataType": "text", "displayName": "F-Stop Labels (comma separated)", "defaultValue": "1.4,2,2.8,4,5.6,8,11,16,22", "group": "Content" },
      "shutterSpeed": { "dataType": "text", "displayName": "Shutter Speed Label", "defaultValue": "1/125", "group": "Content" },
      "image1": { "dataType": "text", "displayName": "Image 1 URL", "defaultValue": "https://picsum.photos/seed/aperture-dune/1800/1200", "group": "Images" },
      "image1Alt": { "dataType": "text", "displayName": "Image 1 Alt", "defaultValue": "Soft dunes in low evening light", "group": "Images" },
      "image2": { "dataType": "text", "displayName": "Image 2 URL", "defaultValue": "https://picsum.photos/seed/aperture-coast/1800/1200", "group": "Images" },
      "image2Alt": { "dataType": "text", "displayName": "Image 2 Alt", "defaultValue": "A sharp coastline at midday", "group": "Images" },
      "grayscale": { "dataType": "booleanValue", "displayName": "Monochrome Images", "defaultValue": "true", "group": "Images" },
      "bladeCount": { "dataType": "select", "displayName": "Blade Count", "defaultValue": "9", "options": ["7", "8", "9"], "group": "Iris" },
      "showEngraving": { "dataType": "booleanValue", "displayName": "Engraved Barrel Ring", "defaultValue": "true", "group": "Iris" },
      "showExposure": { "dataType": "booleanValue", "displayName": "Exposure Scale", "defaultValue": "true", "group": "Iris" },
      "backgroundColor": { "dataType": "color", "displayName": "Barrel / Background", "defaultValue": "#0C0C0D", "group": "Colors" },
      "bladeColor": { "dataType": "color", "displayName": "Blade Color", "defaultValue": "#1C1C1F", "group": "Colors" },
      "engravingColor": { "dataType": "color", "displayName": "Engraving", "defaultValue": "#A8A29E", "group": "Colors" },
      "textColor": { "dataType": "color", "displayName": "Text", "defaultValue": "#FAFAF9", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#A8A29E", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Index Accent", "defaultValue": "#E5484D", "group": "Colors" },
      "headlineFont": { "dataType": "select", "displayName": "Headline Font", "defaultValue": "Instrument Serif", "options": ["Instrument Serif", "Fraunces", "Inter", "Georgia"], "group": "Typography" },
      "headlineSize": { "dataType": "select", "displayName": "Headline Size (px)", "defaultValue": "96", "options": ["64", "80", "96", "112", "128"], "group": "Typography" },
      "headlineWeight": { "dataType": "select", "displayName": "Headline Weight", "defaultValue": "400", "options": ["300", "400", "500"], "group": "Typography" },
      "scrollLength": { "dataType": "select", "displayName": "Scroll Length (screens)", "defaultValue": "5", "options": ["3", "4", "5", "6", "7"], "group": "Layout" },
      "imageDim": { "dataType": "select", "displayName": "Image Dimming", "defaultValue": "0.35", "options": ["0", "0.2", "0.35", "0.5"], "group": "Layout" },
      "smoothing": { "dataType": "select", "displayName": "Scrub Smoothing", "defaultValue": "0.14", "options": ["0.08", "0.14", "0.22", "1"], "group": "Animation", "description": "1 = locked to the scrollbar, lower = more glide" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const eyebrow = config?.eyebrow || 'Optics / Chapter 04';
  const headline1 = config?.headline1 || 'Let the light in.';
  const subline1 = config?.subline1 || 'Wide open at f/1.4, everything glows and nothing is certain.';
  const headline2 = config?.headline2 || 'Then choose what stays sharp.';
  const subline2 = config?.subline2 || 'Stopped down, the world resolves edge to edge.';
  const closedCaption = config?.closedCaption || 'Shutter';
  const lensLabel = config?.lensLabel || 'APERTURE  50 mm  1:1.4  Ø 46  NO. 2026-0417';
  const shutter = config?.shutterSpeed || '1/125';
  const grayscale = bool(config?.grayscale, true);
  const withGray = (u) => (grayscale && u && !/grayscale/.test(u) ? u + (u.includes('?') ? '&' : '?') + 'grayscale' : u);
  const img1 = withGray(config?.image1 || 'https://picsum.photos/seed/aperture-dune/1800/1200');
  const img2 = withGray(config?.image2 || 'https://picsum.photos/seed/aperture-coast/1800/1200');
  const alt1 = config?.image1Alt || 'Soft dunes in low evening light';
  const alt2 = config?.image2Alt || 'A sharp coastline at midday';
  const N = Math.max(5, Math.min(12, parseInt(config?.bladeCount || '9', 10) || 9));
  const showEngraving = bool(config?.showEngraving, true);
  const showExposure = bool(config?.showExposure, true);
  const bg = config?.backgroundColor || '#0C0C0D';
  const bladeColor = config?.bladeColor || '#1C1C1F';
  const engr = config?.engravingColor || '#A8A29E';
  const text = config?.textColor || '#FAFAF9';
  const muted = config?.mutedColor || '#A8A29E';
  const accent = config?.accentColor || '#E5484D';
  const headlineFont = config?.headlineFont || 'Instrument Serif';
  const headlineSize = parseInt(config?.headlineSize || '96', 10);
  const headlineWeight = config?.headlineWeight || '400';
  const screens = parseFloat(config?.scrollLength || '5');
  const dim = parseFloat(config?.imageDim || '0.35');
  const smoothing = Math.min(1, Math.max(0.02, parseFloat(config?.smoothing || '0.14')));

  const stops = React.useMemo(() => {
    const raw = String(config?.fStops || '1.4,2,2.8,4,5.6,8,11,16,22').split(',').map((s) => s.trim()).filter(Boolean);
    const list = raw.map((label) => ({ label, f: parseFloat(label) })).filter((s) => Number.isFinite(s.f) && s.f > 0);
    return list.length >= 2 ? list : [{ label: '1.4', f: 1.4 }, { label: '22', f: 22 }];
  }, [config?.fStops]);

  const uid = React.useMemo(() => 'ai' + Math.random().toString(36).slice(2, 9), []);
  const prefersReducedMotion = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  React.useEffect(() => {
    const id = 'ai-fonts-instrument-plex';
    if (typeof document === 'undefined' || document.getElementById(id)) return;
    const l = document.createElement('link');
    l.id = id; l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Fraunces:opsz,wght@9..144,300;9..144,400&family=IBM+Plex+Mono:wght@300;400&family=Inter:wght@300;400;500&display=swap';
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
    const section = sectionRef.current;
    if (!section) return undefined;
    let raf = 0;
    const read = () => {
      const r = section.getBoundingClientRect();
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
      setWidth(section.clientWidth);
      onScroll();
    };
    measure();
    scroller.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (ro) ro.observe(section);
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
  const lerp = (a, b, t) => a + (b - a) * t;
  // holds on each stop, then clicks to the next
  const stepped = (x) => { const k = Math.floor(x); return k + easeIO(clamp((x - k - 0.45) / 0.55)); };

  const W = Math.max(320, width);
  const H = Math.max(320, stageH);
  const compact = W < 760;
  const cx = W / 2;
  const cy = compact ? H * 0.47 : H / 2;
  const Rr = Math.min(W, H) * (compact ? 0.36 : 0.33);
  const halfDiag = Math.hypot(W, H) / 2;
  const s0 = (halfDiag * 0.9) / Rr;
  const rMax = Rr * 0.9;
  const last = stops.length - 1;

  const zoomIn = easeIO(seg(0.03, 0.22));
  const openToMax = ease(seg(0.13, 0.22));
  const stopT = seg(0.22, 0.5);
  const shut = easeIO(seg(0.5, 0.57));
  const reopen = easeIO(seg(0.63, 0.8));
  const zoomOut = easeIO(seg(0.8, 0.97));
  const retract = ease(seg(0.78, 0.86));

  const fAt = (x) => {
    const k = Math.min(last - 1, Math.max(0, Math.floor(x)));
    const t = clamp(x - k);
    return stops[k].f * Math.pow(stops[k + 1].f / stops[k].f, t);
  };
  let idx = 0;
  let r = Rr * 1.04;
  let closed = false;
  if (p < 0.22) {
    idx = 0;
    r = lerp(Rr * 1.04, rMax, openToMax);
  } else if (p < 0.5) {
    idx = stepped(stopT * last);
    r = rMax * (stops[0].f / fAt(idx));
  } else if (p < 0.63) {
    idx = last;
    r = rMax * (stops[0].f / stops[last].f) * (1 - shut);
    closed = shut > 0.98;
  } else {
    idx = last * (1 - reopen);
    r = lerp(rMax * (stops[0].f / fAt(idx)), Rr * 1.04, retract);
    if (reopen < 0.0001) r = 0;
  }
  const scale = lerp(lerp(s0, 1, zoomIn), s0, zoomOut);
  const secondImage = p >= 0.57 + (0.63 - 0.57) / 2;
  const activeIdx = Math.round(idx);
  const rot = -0.35 + (1 - Math.min(1, r / Rr)) * 0.9;
  const ringRot = -idx * 15;

  const step = (Math.PI * 2) / N;
  const blades = [];
  const tanHalf = Math.tan(Math.PI / N);
  const back = r * tanHalf + Rr * 0.22;
  const L = Rr * 2.6;
  const Rout = Rr * 1.8;
  for (let i = 0; i < N; i++) {
    const th = rot + i * step;
    const nx = Math.cos(th); const ny = Math.sin(th);
    const tx = -ny; const ty = nx;
    const Px = cx + nx * r; const Py = cy + ny * r;
    const kappa = 0.55 / Rr;
    const pt = (u) => [Px + tx * u + nx * kappa * u * u, Py + ty * u + ny * kappa * u * u];
    const edge = [];
    for (let k = 0; k <= 16; k++) edge.push(pt(-back + ((back + L * 0.55) * k) / 16));
    const [ax, ay] = edge[0];
    const [bx, by] = edge[edge.length - 1];
    const edgeD = edge.map((q, k) => `${k ? 'L' : 'M'} ${q[0].toFixed(1)} ${q[1].toFixed(1)}`).join(' ');
    const angA = Math.atan2(ay - cy, ax - cx);
    let angB = Math.atan2(by - cy, bx - cx);
    while (angB < angA) angB += Math.PI * 2;
    const span = angB - angA;
    const ox = (a) => cx + Math.cos(a) * Rout; const oy = (a) => cy + Math.sin(a) * Rout;
    const d = `${edgeD} L ${ox(angB)} ${oy(angB)} A ${Rout} ${Rout} 0 ${span > Math.PI ? 1 : 0} 0 ${ox(angA)} ${oy(angA)} Z`;
    blades.push({ d, edgeD });
  }
  const polyR = r / Math.cos(Math.PI / N);
  const poly = Array.from({ length: N }, (_, i) => {
    const a = rot + i * step + Math.PI / N;
    return `${cx + Math.cos(a) * polyR},${cy + Math.sin(a) * polyR}`;
  }).join(' ');

  const mono = '"IBM Plex Mono", ui-monospace, "SF Mono", Menlo, monospace';
  const serif = headlineFont === 'Inter' ? 'Inter, -apple-system, "Helvetica Neue", sans-serif'
    : headlineFont === 'Georgia' ? 'Georgia, "Times New Roman", serif'
      : `"${headlineFont}", "Iowan Old Style", Georgia, serif`;
  const sans = 'Inter, -apple-system, "Helvetica Neue", sans-serif';

  const fLabel = closed ? '—' : stops[Math.min(last, Math.max(0, activeIdx))].label;
  const fNum = stops[Math.min(last, Math.max(0, activeIdx))].f;
  const shutterDen = parseFloat(String(shutter).split('/')[1] || '125') || 125;
  const ev = Math.log2((fNum * fNum) * shutterDen);
  const headA = 1 - ease(seg(0.04, 0.14));
  const headB = ease(seg(0.88, 0.98));
  const hud = ease(seg(0.08, 0.2)) * (1 - ease(seg(0.84, 0.94)));
  const hSize = compact ? Math.round(headlineSize * 0.5) : headlineSize;
  const closedGlow = clamp(1 - Math.abs(p - 0.6) / 0.035);

  const ticks = [];
  for (let k = 0; k < 180; k++) ticks.push(k);
  const ringFont = Math.max(9, Rr * 0.042);
  const imgStyle = (vis) => ({
    position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
    opacity: vis ? 1 : 0, transform: `scale(${1.02 + (scale - 1) * 0.02})`, transformOrigin: `${cx}px ${cy}px`
  });

  const headBlock = (h, sub, op, key) => (
    <div key={key} style={{
      position: 'absolute', left: compact ? 20 : 64, right: compact ? 20 : 'auto', bottom: compact ? 92 : 72,
      maxWidth: compact ? 'none' : 820, opacity: op, transform: `translateY(${(1 - op) * 18}px)`, pointerEvents: 'none', zIndex: 4
    }}>
      <h2 style={{ margin: 0, fontFamily: serif, fontWeight: headlineWeight, fontSize: hSize, lineHeight: 0.98, letterSpacing: headlineFont === 'Inter' ? '-0.04em' : '-0.015em', color: text }}>{h}</h2>
      <p style={{ margin: compact ? '12px 0 0' : '20px 0 0', fontFamily: sans, fontWeight: 300, fontSize: compact ? 14 : 17, lineHeight: 1.5, color: text, opacity: 0.78, maxWidth: 440 }}>{sub}</p>
    </div>
  );

  return (
    <section ref={sectionRef} className="aperture-iris" aria-label={`${headline1} ${headline2}`}
      style={{ position: 'relative', width: '100%', height: `${Math.round(stageH * screens)}px`, backgroundColor: bg, color: text, fontFamily: sans }}>
      <div style={{ position: 'sticky', top: 0, height: `${stageH}px`, overflow: 'hidden', background: bg }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          {img1 ? <img src={img1} alt={alt1} style={imgStyle(!secondImage)} /> : <div style={{ ...imgStyle(!secondImage), background: '#44403C' }} />}
          {img2 ? <img src={img2} alt={alt2} style={imgStyle(secondImage)} /> : <div style={{ ...imgStyle(secondImage), background: '#57534E' }} />}
          <div style={{ position: 'absolute', inset: 0, background: `rgba(12,12,13,${dim})` }} />
          <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '28%', background: 'linear-gradient(to bottom, rgba(12,12,13,0.55), rgba(12,12,13,0))' }} />
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '55%', background: 'linear-gradient(to top, rgba(12,12,13,0.7), rgba(12,12,13,0))', opacity: Math.max(headA, headB) }} />
        </div>

        <svg aria-hidden="true" width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 2 }}>
          <defs>
            <clipPath id={`${uid}-ring`}><circle cx={cx} cy={cy} r={Rr} /></clipPath>
            <linearGradient id={`${uid}-blade`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor={bladeColor} />
              <stop offset="1" stopColor="#0A0A0B" />
            </linearGradient>
            <radialGradient id={`${uid}-sheen`} cx="0.35" cy="0.3" r="0.75">
              <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.12" />
              <stop offset="0.6" stopColor="#FFFFFF" stopOpacity="0.02" />
              <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>
            <path id={`${uid}-arc`} d={`M ${cx - Rr * 1.34} ${cy} A ${Rr * 1.34} ${Rr * 1.34} 0 0 0 ${cx + Rr * 1.34} ${cy}`} />
          </defs>
          <g transform={`translate(${cx} ${cy}) scale(${scale}) translate(${-cx} ${-cy})`}>
            <path fillRule="evenodd" fill={bg}
              d={`M ${cx - halfDiag * 4} ${cy - halfDiag * 4} H ${cx + halfDiag * 4} V ${cy + halfDiag * 4} H ${cx - halfDiag * 4} Z M ${cx + Rr} ${cy} A ${Rr} ${Rr} 0 1 0 ${cx - Rr} ${cy} A ${Rr} ${Rr} 0 1 0 ${cx + Rr} ${cy} Z`} />
            {r < Rr * 1.02 && (
              <g clipPath={`url(#${uid}-ring)`}>
                {blades.map((b, i) => (
                  <g key={i}>
                    <path d={b.d} fill={`url(#${uid}-blade)`} stroke="#000" strokeOpacity="0.6" strokeWidth="1" />
                    <path d={b.edgeD} fill="none" stroke="#FFFFFF" strokeOpacity="0.22" strokeWidth="1" />
                  </g>
                ))}
                <path fillRule="evenodd" fill={`url(#${uid}-sheen)`}
                  d={`M ${cx + Rr} ${cy} A ${Rr} ${Rr} 0 1 0 ${cx - Rr} ${cy} A ${Rr} ${Rr} 0 1 0 ${cx + Rr} ${cy} Z M ${poly.split(' ').join(' L ')} Z`} />
              </g>
            )}
            <circle cx={cx} cy={cy} r={Rr} fill="none" stroke="#000" strokeWidth={Rr * 0.03} />
            <circle cx={cx} cy={cy} r={Rr + Rr * 0.015} fill="none" stroke={engr} strokeOpacity="0.35" strokeWidth="1" />
            {showEngraving && (
              <g>
                <g transform={`rotate(${ringRot} ${cx} ${cy})`}>
                  <circle cx={cx} cy={cy} r={Rr * 1.1} fill="none" stroke={engr} strokeOpacity="0.25" strokeWidth="1" />
                  {ticks.map((k) => {
                    const a = (k / 180) * Math.PI * 2;
                    const long = k % 15 === 0; const mid = k % 5 === 0;
                    const r1 = Rr * 1.04; const r2 = Rr * (long ? 1.095 : mid ? 1.075 : 1.06);
                    return <line key={k} x1={cx + Math.cos(a) * r1} y1={cy + Math.sin(a) * r1} x2={cx + Math.cos(a) * r2} y2={cy + Math.sin(a) * r2}
                      stroke={engr} strokeOpacity={long ? 0.9 : 0.5} strokeWidth={long ? 1.2 : 0.7} />;
                  })}
                  {stops.map((st, k) => {
                    const a = (-90 + k * 15) * Math.PI / 180;
                    const rr = Rr * 1.17;
                    const x = cx + Math.cos(a) * rr; const y = cy + Math.sin(a) * rr;
                    const on = k === activeIdx && !closed;
                    return <text key={k} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontFamily={mono} fontSize={ringFont}
                      fill={on ? text : engr} fillOpacity={on ? 1 : 0.7} transform={`rotate(${-90 + k * 15 + 90} ${x} ${y})`}>{st.label}</text>;
                  })}
                </g>
                <path d={`M ${cx} ${cy - Rr * 1.24} l ${-Rr * 0.018} ${-Rr * 0.03} h ${Rr * 0.036} Z`} fill={accent} />
                <circle cx={cx} cy={cy} r={Rr * 1.24} fill="none" stroke={engr} strokeOpacity="0.18" strokeWidth="1" />
                <text fontFamily={mono} fontSize={ringFont * 0.9} fill={engr} fillOpacity="0.6" letterSpacing={ringFont * 0.25}>
                  <textPath href={`#${uid}-arc`} startOffset="50%" textAnchor="middle">{lensLabel}</textPath>
                </text>
              </g>
            )}
          </g>
          {closedGlow > 0 && (
            <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" fontFamily={mono} fontSize={compact ? 10 : 11} letterSpacing="4" fill={muted} opacity={closedGlow}>
              {closedCaption.toUpperCase()}
            </text>
          )}
        </svg>

        <div style={{ position: 'absolute', top: compact ? 20 : 40, left: compact ? 20 : 64, zIndex: 4, fontFamily: mono, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: text, opacity: 0.8 }}>
          {eyebrow}
        </div>
        <div aria-live="polite" style={{ position: 'absolute', top: compact ? 14 : 30, right: compact ? 20 : 64, zIndex: 4, textAlign: 'right', fontFamily: mono }}>
          <div style={{ fontSize: compact ? 30 : 52, fontWeight: 300, letterSpacing: '-0.02em', color: text, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
            <span style={{ fontStyle: 'italic', fontFamily: serif, marginRight: 2 }}>f</span>/{fLabel}
          </div>
          <div style={{ fontSize: 10.5, letterSpacing: '0.18em', color: text, opacity: 0.7, marginTop: 8 }}>{shutter} · EV {closed ? '—' : ev.toFixed(1)}</div>
        </div>

        {showExposure && (
          <div style={{
            position: 'absolute', left: compact ? 20 : 64, bottom: compact ? 22 : 40, zIndex: 4,
            opacity: hud, width: compact ? W - 40 : Math.max(220, Math.min(300, cx - Rr * 1.34 - 70)), fontFamily: mono, color: muted
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: compact ? 9 : 10.5, letterSpacing: '0.04em' }}>
              {stops.map((st, k) => (
                <span key={k} style={{ color: k === activeIdx && !closed ? text : muted, transition: 'color 120ms' }}>{st.label}</span>
              ))}
            </div>
            <div style={{ position: 'relative', height: 14, marginTop: 6 }}>
              {Array.from({ length: last * 3 + 1 }, (_, k) => (
                <div key={k} style={{ position: 'absolute', left: `${(k / (last * 3)) * 100}%`, top: 0, width: 1, height: k % 3 === 0 ? 10 : 5, background: muted, opacity: k % 3 === 0 ? 0.9 : 0.45 }} />
              ))}
              <div style={{ position: 'absolute', left: `${(idx / last) * 100}%`, top: -3, width: 1, height: 18, background: accent, transform: 'translateX(-0.5px)' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9.5, letterSpacing: '0.18em', marginTop: 4 }}>
              <span>BRIGHT</span><span>DEEP</span>
            </div>
          </div>
        )}

        {headBlock(headline1, subline1, headA, 'a')}
        {headBlock(headline2, subline2, headB, 'b')}
      </div>
    </section>
  );
}

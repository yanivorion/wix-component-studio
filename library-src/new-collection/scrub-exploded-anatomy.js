const MANIFEST = {
  "type": "Scrub.ExplodedAnatomy",
  "description": "Scroll-scrubbed exploded anatomy of a launch vehicle: stages separate, the fairing splits open to reveal the payload, leader lines draw to labelled parts and the spec sheet counts up",
  "editorElement": {
    "selector": ".exploded-anatomy",
    "displayName": "Exploded Anatomy",
    "archetype": "container",
    "data": {
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Anatomy / 01", "group": "Content" },
      "title": { "dataType": "text", "displayName": "Title", "defaultValue": "Orbital launch vehicle", "group": "Content" },
      "description": { "dataType": "text", "displayName": "Description", "defaultValue": "Seven assemblies, one trajectory. Scroll to take it apart.", "group": "Content" },
      "part1Name": { "dataType": "text", "displayName": "Part 1 Name", "defaultValue": "Nose cone", "group": "Parts" },
      "part1Spec": { "dataType": "text", "displayName": "Part 1 Spec", "defaultValue": "Carbon composite ogive", "group": "Parts" },
      "part2Name": { "dataType": "text", "displayName": "Part 2 Name", "defaultValue": "Payload fairing", "group": "Parts" },
      "part2Spec": { "dataType": "text", "displayName": "Part 2 Spec", "defaultValue": "Clamshell, 5.2 m diameter", "group": "Parts" },
      "part3Name": { "dataType": "text", "displayName": "Part 3 Name", "defaultValue": "Upper stage", "group": "Parts" },
      "part3Spec": { "dataType": "text", "displayName": "Part 3 Spec", "defaultValue": "Single vacuum engine, 981 kN", "group": "Parts" },
      "part4Name": { "dataType": "text", "displayName": "Part 4 Name", "defaultValue": "Interstage", "group": "Parts" },
      "part4Spec": { "dataType": "text", "displayName": "Part 4 Spec", "defaultValue": "Pneumatic separation ring", "group": "Parts" },
      "part5Name": { "dataType": "text", "displayName": "Part 5 Name", "defaultValue": "First stage tanks", "group": "Parts" },
      "part5Spec": { "dataType": "text", "displayName": "Part 5 Spec", "defaultValue": "LOX over RP-1, friction-stir welded", "group": "Parts" },
      "part6Name": { "dataType": "text", "displayName": "Part 6 Name", "defaultValue": "Thrust structure", "group": "Parts" },
      "part6Spec": { "dataType": "text", "displayName": "Part 6 Spec", "defaultValue": "Octaweb load frame", "group": "Parts" },
      "part7Name": { "dataType": "text", "displayName": "Part 7 Name", "defaultValue": "Engine cluster", "group": "Parts" },
      "part7Spec": { "dataType": "text", "displayName": "Part 7 Spec", "defaultValue": "Three gimballed sea-level bells", "group": "Parts" },
      "stat1Label": { "dataType": "text", "displayName": "Stat 1 Label", "defaultValue": "Height", "group": "Specs" },
      "stat1Value": { "dataType": "text", "displayName": "Stat 1 Value", "defaultValue": "70", "group": "Specs" },
      "stat1Unit": { "dataType": "text", "displayName": "Stat 1 Unit", "defaultValue": "m", "group": "Specs" },
      "stat2Label": { "dataType": "text", "displayName": "Stat 2 Label", "defaultValue": "Liftoff thrust", "group": "Specs" },
      "stat2Value": { "dataType": "text", "displayName": "Stat 2 Value", "defaultValue": "7607", "group": "Specs" },
      "stat2Unit": { "dataType": "text", "displayName": "Stat 2 Unit", "defaultValue": "kN", "group": "Specs" },
      "stat3Label": { "dataType": "text", "displayName": "Stat 3 Label", "defaultValue": "Payload to LEO", "group": "Specs" },
      "stat3Value": { "dataType": "text", "displayName": "Stat 3 Value", "defaultValue": "22800", "group": "Specs" },
      "stat3Unit": { "dataType": "text", "displayName": "Stat 3 Unit", "defaultValue": "kg", "group": "Specs" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#F4F4F2", "group": "Colors" },
      "inkColor": { "dataType": "color", "displayName": "Ink", "defaultValue": "#18181B", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#71717A", "group": "Colors" },
      "lineColor": { "dataType": "color", "displayName": "Grid & Rules", "defaultValue": "#D4D4D8", "group": "Colors" },
      "fillColor": { "dataType": "color", "displayName": "Body Fill", "defaultValue": "#FFFFFF", "group": "Colors" },
      "shadeColor": { "dataType": "color", "displayName": "Body Shade", "defaultValue": "#E4E4E7", "group": "Colors" },
      "fontFamily": { "dataType": "select", "displayName": "Font Family", "defaultValue": "Inter", "options": ["Inter", "system-ui", "Helvetica Neue", "Georgia"], "group": "Typography" },
      "titleSize": { "dataType": "select", "displayName": "Title Size (px)", "defaultValue": "56", "options": ["40", "48", "56", "64", "72"], "group": "Typography" },
      "titleWeight": { "dataType": "select", "displayName": "Title Weight", "defaultValue": "300", "options": ["300", "400", "500"], "group": "Typography" },
      "scrollLength": { "dataType": "select", "displayName": "Scroll Length (screens)", "defaultValue": "4", "options": ["3", "4", "5", "6"], "group": "Layout" },
      "explodeSpacing": { "dataType": "select", "displayName": "Explode Spacing", "defaultValue": "medium", "options": ["tight", "medium", "wide"], "group": "Layout" },
      "showGrid": { "dataType": "booleanValue", "displayName": "Blueprint Grid", "defaultValue": "true", "group": "Layout" },
      "showRuler": { "dataType": "booleanValue", "displayName": "Measurement Ruler", "defaultValue": "true", "group": "Layout" },
      "smoothing": { "dataType": "select", "displayName": "Scrub Smoothing", "defaultValue": "0.14", "options": ["0.08", "0.14", "0.22", "1"], "group": "Animation", "description": "1 = locked to the scrollbar, lower = more glide" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const eyebrow = config?.eyebrow || 'Anatomy / 01';
  const title = config?.title || 'Orbital launch vehicle';
  const description = config?.description || 'Seven assemblies, one trajectory. Scroll to take it apart.';
  const bg = config?.backgroundColor || '#F4F4F2';
  const ink = config?.inkColor || '#18181B';
  const muted = config?.mutedColor || '#71717A';
  const rule = config?.lineColor || '#D4D4D8';
  const fill = config?.fillColor || '#FFFFFF';
  const shade = config?.shadeColor || '#E4E4E7';
  const fontFamily = config?.fontFamily || 'Inter';
  const titleSize = parseInt(config?.titleSize || '56', 10);
  const titleWeight = config?.titleWeight || '300';
  const screens = parseFloat(config?.scrollLength || '4');
  const spacing = { tight: 22, medium: 34, wide: 48 }[config?.explodeSpacing || 'medium'] || 34;
  const showGrid = bool(config?.showGrid, true);
  const showRuler = bool(config?.showRuler, true);
  const smoothing = Math.min(1, Math.max(0.02, parseFloat(config?.smoothing || '0.14')));

  const defaults = [
    ['Nose cone', 'Carbon composite ogive'], ['Payload fairing', 'Clamshell, 5.2 m diameter'],
    ['Upper stage', 'Single vacuum engine, 981 kN'], ['Interstage', 'Pneumatic separation ring'],
    ['First stage tanks', 'LOX over RP-1, friction-stir welded'], ['Thrust structure', 'Octaweb load frame'],
    ['Engine cluster', 'Three gimballed sea-level bells']
  ];
  const parts = React.useMemo(() => defaults.map((d, i) => ({
    name: config?.[`part${i + 1}Name`] || d[0],
    spec: config?.[`part${i + 1}Spec`] || d[1]
  })), [config]); // eslint-disable-line react-hooks/exhaustive-deps

  const stats = React.useMemo(() => [
    [config?.stat1Label || 'Height', config?.stat1Value || '70', config?.stat1Unit || 'm'],
    [config?.stat2Label || 'Liftoff thrust', config?.stat2Value || '7607', config?.stat2Unit || 'kN'],
    [config?.stat3Label || 'Payload to LEO', config?.stat3Value || '22800', config?.stat3Unit || 'kg']
  ], [config]);

  const uid = React.useMemo(() => 'xa' + Math.random().toString(36).slice(2, 9), []);
  const prefersReducedMotion = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  const sectionRef = React.useRef(null);
  const target = React.useRef(0);
  const current = React.useRef(0);
  const [progress, setProgress] = React.useState(prefersReducedMotion ? 1 : 0);
  const [stageH, setStageH] = React.useState(720);
  const [width, setWidth] = React.useState(1280);

  React.useEffect(() => {
    const resolve = () => {
      const s = typeof getScrollContainer === 'function' ? getScrollContainer() : null;
      return s && s !== window && s.nodeType === 1 ? s : window;
    };
    const scroller = resolve();
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

  const clamp = (v) => Math.min(1, Math.max(0, v));
  const seg = (a, b) => clamp((progress - a) / (b - a));
  const ease = (t) => 1 - Math.pow(1 - t, 3);
  const easeIO = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  const explode = easeIO(seg(0.08, 0.5));
  const fairingOpen = ease(seg(0.42, 0.62));
  const panels = ease(seg(0.55, 0.72));
  const specs = ease(seg(0.74, 0.95));

  const heights = [70, 96, 112, 34, 230, 34, 58];
  const assembled = heights.reduce((a, b) => a + b, 0);
  const gap = spacing * explode;
  const totalH = assembled + gap * (heights.length - 1);
  const VB_H = assembled + 48 * 6 + 120;
  const VB_W = 860;
  const cx = VB_W / 2;
  const startY = (VB_H - totalH) / 2;
  const tops = [];
  heights.reduce((y, h, i) => { tops.push(y + i * gap); return y + h; }, startY);

  const compact = width < 760;
  const phase = progress < 0.08 ? 'Assembled' : progress < 0.42 ? 'Stage separation' : progress < 0.72 ? 'Payload deploy' : 'Specification';
  const fmt = (n) => Math.round(n).toLocaleString('en-US');

  const W = 28;
  const strokeW = 1.25;
  const bodyStyle = { fill, stroke: ink, strokeWidth: strokeW, vectorEffect: 'non-scaling-stroke' };
  const shadeStyle = { fill: shade, stroke: 'none' };
  const hair = { stroke: ink, strokeWidth: 0.75, fill: 'none', vectorEffect: 'non-scaling-stroke' };

  const drawPart = (i) => {
    const h = heights[i];
    if (i === 0) {
      return (
        <g>
          <path d={`M ${-W} ${h} C ${-W} ${h * 0.45} ${-W * 0.35} ${h * 0.08} 0 0 C ${W * 0.35} ${h * 0.08} ${W} ${h * 0.45} ${W} ${h} Z`} style={bodyStyle} />
          <path d={`M ${W * 0.35} ${h * 0.15} C ${W * 0.8} ${h * 0.45} ${W} ${h * 0.7} ${W} ${h} L ${W * 0.55} ${h} Z`} style={shadeStyle} />
          <line x1={-W} y1={h - 8} x2={W} y2={h - 8} style={hair} />
        </g>
      );
    }
    if (i === 1) {
      const dx = fairingOpen * 46;
      const rot = fairingOpen * 14;
      return (
        <g>
          <g transform={`translate(0 ${h * 0.5})`}>
            <rect x={-9} y={-16} width={18} height={30} style={bodyStyle} />
            <line x1={-9} y1={-6} x2={9} y2={-6} style={hair} />
            <line x1={0} y1={-16} x2={0} y2={-26} style={hair} />
            <circle cx={0} cy={-28} r={2.5} style={bodyStyle} />
            {[-1, 1].map((s) => (
              <g key={s} transform={`translate(${s * 9} -4) scale(${s * (0.05 + panels * 0.95)} 1)`}>
                <rect x={0} y={-7} width={46} height={14} style={{ ...bodyStyle, fill: shade }} />
                {[1, 2, 3].map((k) => <line key={k} x1={k * 11.5} y1={-7} x2={k * 11.5} y2={7} style={hair} />)}
              </g>
            ))}
          </g>
          {[-1, 1].map((s) => (
            <g key={s} transform={`translate(${s * dx} 0) rotate(${s * rot} ${s * W} ${h})`}>
              <path d={s < 0 ? `M 0 0 L ${-W} 0 L ${-W} ${h} L 0 ${h} Z` : `M 0 0 L ${W} 0 L ${W} ${h} L 0 ${h} Z`} style={bodyStyle} />
              {s > 0 && <rect x={W * 0.55} y={0} width={W * 0.45} height={h} style={shadeStyle} />}
              <line x1={s * W * 0.5} y1={10} x2={s * W * 0.5} y2={h - 10} style={{ ...hair, strokeDasharray: '2 3' }} />
            </g>
          ))}
        </g>
      );
    }
    if (i === 3) {
      return (
        <g>
          <rect x={-W} y={0} width={W * 2} height={h} style={bodyStyle} />
          {[-20, -10, 0, 10, 20].map((x) => <line key={x} x1={x - 6} y1={0} x2={x + 6} y2={h} style={hair} />)}
          {[-20, -10, 0, 10, 20].map((x) => <line key={'b' + x} x1={x + 6} y1={0} x2={x - 6} y2={h} style={hair} />)}
        </g>
      );
    }
    if (i === 5) {
      return (
        <g>
          <rect x={-W} y={0} width={W * 2} height={h} style={bodyStyle} />
          <rect x={W * 0.55} y={0} width={W * 0.45} height={h} style={shadeStyle} />
          {[-18, -6, 6, 18].map((x) => <circle key={x} cx={x} cy={h / 2} r={2} style={hair} />)}
          {[-1, 1].map((s) => {
            const out = explode * 30;
            return (
              <path key={s} transform={`translate(${s * out} 0)`}
                d={s < 0 ? `M ${-W} ${-6} L ${-W - 26} ${h + 14} L ${-W} ${h} Z` : `M ${W} ${-6} L ${W + 26} ${h + 14} L ${W} ${h} Z`}
                style={{ ...bodyStyle, fill: s > 0 ? shade : fill }} />
            );
          })}
        </g>
      );
    }
    if (i === 6) {
      const spread = 1 + explode * 0.6;
      return (
        <g>
          {[-1, 0, 1].map((k) => (
            <g key={k} transform={`translate(${k * 17 * spread} 0)`}>
              <rect x={-4} y={0} width={8} height={12} style={bodyStyle} />
              <path d={`M -5 12 L -11 ${h} L 11 ${h} L 5 12 Z`} style={{ ...bodyStyle, fill: k === 1 ? shade : fill }} />
              <line x1={-8} y1={h * 0.62} x2={8} y2={h * 0.62} style={hair} />
            </g>
          ))}
        </g>
      );
    }
    const rings = i === 4 ? [0.18, 0.46, 0.5, 0.82] : [0.2, 0.8];
    return (
      <g>
        <rect x={-W} y={0} width={W * 2} height={h} style={bodyStyle} />
        <rect x={W * 0.55} y={0} width={W * 0.45} height={h} style={shadeStyle} />
        {rings.map((t) => <line key={t} x1={-W} y1={h * t} x2={W} y2={h * t} style={hair} />)}
        <text x={-W * 0.35} y={h / 2} fill={muted} fontSize={9} fontFamily="ui-monospace, Menlo, monospace"
          transform={`rotate(-90 ${-W * 0.35} ${h / 2})`} textAnchor="middle" letterSpacing="2">
          {i === 4 ? 'STAGE 1' : 'STAGE 2'}
        </text>
      </g>
    );
  };

  const labelX = compact ? 120 : 250;
  const labelWindow = (i) => ease(seg(0.16 + i * 0.045, 0.3 + i * 0.045));

  const rx = cx - labelX - 34;
  const rulerTicks = [];
  if (showRuler) {
    const metres = parseFloat(stats[0][1]) || 70;
    for (let k = 0; k <= 14; k++) rulerTicks.push({ y: startY + (totalH * k) / 14, label: Math.round(metres - (metres * k) / 14) });
  }

  const mono = 'ui-monospace, "SF Mono", Menlo, monospace';
  const sans = fontFamily === 'Georgia' ? 'Georgia, serif' : `${fontFamily}, -apple-system, "Helvetica Neue", sans-serif`;

  return (
    <section ref={sectionRef} className="exploded-anatomy"
      style={{ position: 'relative', width: '100%', height: `${Math.round(stageH * screens)}px`, backgroundColor: bg, color: ink, fontFamily: sans }}>
      <div style={{ position: 'sticky', top: 0, height: `${stageH}px`, overflow: 'hidden' }}>
        {showGrid && (
          <svg aria-hidden="true" width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
            <defs>
              <pattern id={`${uid}-g`} width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M 24 0 L 0 0 0 24" fill="none" stroke={rule} strokeWidth="0.5" opacity="0.55" />
              </pattern>
              <pattern id={`${uid}-G`} width="120" height="120" patternUnits="userSpaceOnUse">
                <rect width="120" height="120" fill={`url(#${uid}-g)`} />
                <path d="M 120 0 L 0 0 0 120" fill="none" stroke={rule} strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${uid}-G)`} />
          </svg>
        )}

        <div style={{ position: 'absolute', top: compact ? 24 : 48, left: compact ? 20 : 56, maxWidth: compact ? 'calc(100% - 40px)' : 360, zIndex: 2 }}>
          <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: muted, marginBottom: 16 }}>{eyebrow}</div>
          <h2 style={{ margin: 0, fontSize: compact ? Math.round(titleSize * 0.6) : titleSize, lineHeight: 1.02, fontWeight: titleWeight, letterSpacing: '-0.03em' }}>{title}</h2>
          <p style={{ margin: '18px 0 0', fontSize: 15, lineHeight: 1.55, color: muted, maxWidth: 300, opacity: 1 - seg(0.3, 0.45) * 0.6 }}>{description}</p>
        </div>

        <div aria-live="polite" style={{ position: 'absolute', left: compact ? 20 : 56, bottom: compact ? 20 : 48, zIndex: 2, fontFamily: mono }}>
          <div style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: muted }}>Phase</div>
          <div style={{ fontSize: 15, marginTop: 6 }}>{phase}</div>
          <div style={{ marginTop: 14, width: 160, height: 1, background: rule, position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, background: ink, transformOrigin: 'left', transform: `scaleX(${progress})` }} />
          </div>
          <div style={{ fontSize: 11, color: muted, marginTop: 8 }}>{String(Math.round(progress * 100)).padStart(3, '0')} / 100</div>
        </div>

        <svg viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="xMidYMid meet" role="img"
          aria-label={`${title}: exploded view of ${parts.map((p) => p.name).join(', ')}`}
          style={{ position: 'absolute', top: compact ? '22%' : '4%', left: compact ? 0 : '18%', width: compact ? '100%' : '64%', height: compact ? '74%' : '92%' }}>
          {showRuler && (
            <g>
              <line x1={rx} y1={startY} x2={rx} y2={startY + totalH} style={{ ...hair, stroke: muted }} />
              {rulerTicks.map((t, k) => (
                <g key={k}>
                  <line x1={rx} y1={t.y} x2={rx - (k % 2 ? 6 : 12)} y2={t.y} style={{ ...hair, stroke: muted }} />
                  {k % 2 === 0 && <text x={rx - 18} y={t.y + 3} textAnchor="end" fontSize={9} fill={muted} fontFamily={mono}>{t.label}</text>}
                </g>
              ))}
            </g>
          )}

          {parts.map((p, i) => {
            const y = tops[i];
            const h = heights[i];
            const lw = labelWindow(i);
            const side = i % 2 === 0 ? 1 : -1;
            const anchorX = cx + side * (i === 5 ? 62 : 36);
            const ly = y + h / 2;
            const endX = cx + side * labelX;
            return (
              <g key={i}>
                <g transform={`translate(${cx} ${y})`}>{drawPart(i)}</g>
                <g opacity={lw > 0 ? 1 : 0}>
                  <path d={`M ${anchorX} ${ly} L ${anchorX + side * 30} ${ly - 14} L ${endX} ${ly - 14}`}
                    pathLength="1" fill="none" stroke={ink} strokeWidth="0.75" vectorEffect="non-scaling-stroke"
                    strokeDasharray="1" strokeDashoffset={1 - lw} />
                  <circle cx={anchorX} cy={ly} r={2.4 * lw} fill={ink} />
                  <g opacity={seg(0.24 + i * 0.045, 0.32 + i * 0.045)} transform={`translate(${side * (1 - lw) * 10} 0)`}>
                    <text x={endX} y={ly - 22} textAnchor={side > 0 ? 'end' : 'start'} fontSize={compact ? 15 : 13} fill={ink} fontFamily={sans} fontWeight="500">
                      <tspan fill={muted} fontFamily={mono} fontWeight="400">{String(i + 1).padStart(2, '0')}  </tspan>{p.name}
                    </text>
                    <text x={endX} y={ly + 2} textAnchor={side > 0 ? 'end' : 'start'} fontSize={compact ? 12 : 10.5} fill={muted} fontFamily={sans}>{p.spec}</text>
                  </g>
                </g>
              </g>
            );
          })}
        </svg>

        <div style={{
          position: 'absolute', right: compact ? 20 : 56, bottom: compact ? 20 : 48, zIndex: 2,
          display: 'flex', flexDirection: 'column', gap: compact ? 10 : 18, alignItems: 'flex-end',
          opacity: specs, transform: `translateY(${(1 - specs) * 16}px)`
        }}>
          {stats.map(([label, value, unit], k) => {
            const n = parseFloat(String(value).replace(/,/g, ''));
            const shown = Number.isFinite(n) ? fmt(n * ease(clamp(specs * 1.2 - k * 0.1))) : value;
            return (
              <div key={k} style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: muted }}>{label}</div>
                <div style={{ fontSize: compact ? 26 : 40, fontWeight: 300, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums', lineHeight: 1.1 }}>
                  {shown}<span style={{ fontSize: compact ? 13 : 16, color: muted, marginLeft: 6 }}>{unit}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

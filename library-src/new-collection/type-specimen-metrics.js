const MANIFEST = {
  "type": "Type.SpecimenMetrics",
  "description": "An interactive foundry-style type specimen: a huge word with animated metric guides, per-glyph sidebearing boxes and a kerning-pair callout, live size, tracking, line-height and weight sliders, on-demand Google Fonts, a size waterfall and a hover-enlarge glyph grid",
  "editorElement": {
    "selector": ".specimen-metrics",
    "displayName": "Specimen Metrics",
    "archetype": "container",
    "data": {
      "word": { "dataType": "text", "displayName": "Specimen Word", "defaultValue": "Typeface", "group": "Content" },
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Specimen № 07", "group": "Content" },
      "pangram": { "dataType": "text", "displayName": "Waterfall Text", "defaultValue": "Quick wafting zephyrs vex bold Jim", "group": "Content" },
      "paragraph": { "dataType": "text", "displayName": "Paragraph Sample", "defaultValue": "Good type is invisible until you look for it. Then every curve, every counter and every carefully tuned space between two letters starts to speak about the hand that drew it.", "group": "Content" },
      "defaultFont": { "dataType": "select", "displayName": "Initial Font", "defaultValue": "Fraunces", "options": ["Fraunces", "Inter", "JetBrains Mono", "Playfair Display", "Space Grotesk"], "group": "Typography" },
      "defaultSize": { "dataType": "select", "displayName": "Initial Size (px)", "defaultValue": "240", "options": ["160", "200", "240", "280", "320"], "group": "Typography" },
      "defaultTracking": { "dataType": "select", "displayName": "Initial Tracking (em)", "defaultValue": "-0.01", "options": ["-0.04", "-0.02", "-0.01", "0", "0.04"], "group": "Typography" },
      "defaultLineHeight": { "dataType": "select", "displayName": "Initial Line Height", "defaultValue": "1.45", "options": ["1.2", "1.3", "1.45", "1.6"], "group": "Typography" },
      "defaultWeight": { "dataType": "select", "displayName": "Initial Weight", "defaultValue": "360", "options": ["300", "360", "400", "500"], "group": "Typography" },
      "uiFont": { "dataType": "select", "displayName": "Interface Font", "defaultValue": "IBM Plex Mono", "options": ["IBM Plex Mono", "Inter", "system-ui"], "group": "Typography" },
      "metricUnits": { "dataType": "select", "displayName": "Metric Units", "defaultValue": "em", "options": ["em", "px", "units"], "group": "Metrics" },
      "showSidebearings": { "dataType": "booleanValue", "displayName": "Sidebearing Boxes", "defaultValue": "true", "group": "Metrics" },
      "showKerning": { "dataType": "booleanValue", "displayName": "Kerning Pair", "defaultValue": "true", "group": "Metrics" },
      "showMetricValues": { "dataType": "booleanValue", "displayName": "Metric Values", "defaultValue": "true", "group": "Metrics" },
      "showXBand": { "dataType": "booleanValue", "displayName": "x-height Band", "defaultValue": "true", "group": "Metrics" },
      "showControls": { "dataType": "booleanValue", "displayName": "Controls Panel", "defaultValue": "true", "group": "Layout" },
      "showWaterfall": { "dataType": "booleanValue", "displayName": "Waterfall", "defaultValue": "true", "group": "Layout" },
      "showGlyphGrid": { "dataType": "booleanValue", "displayName": "Glyph Grid", "defaultValue": "true", "group": "Layout" },
      "glyphSet": { "dataType": "select", "displayName": "Glyph Set", "defaultValue": "A–Z 0–9", "options": ["A–Z 0–9", "a–z 0–9", "A–Z a–z"], "group": "Layout" },
      "transitionSpeed": { "dataType": "select", "displayName": "Transition (ms)", "defaultValue": "520", "options": ["0", "320", "520", "800"], "group": "Animation" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#FAFAF9", "group": "Colors" },
      "panelColor": { "dataType": "color", "displayName": "Panel", "defaultValue": "#F5F5F4", "group": "Colors" },
      "inkColor": { "dataType": "color", "displayName": "Ink", "defaultValue": "#1C1917", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#78716C", "group": "Colors" },
      "ruleColor": { "dataType": "color", "displayName": "Rules", "defaultValue": "#D6D3D1", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent", "defaultValue": "#C2410C", "group": "Colors" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const word = (config?.word || 'Typeface').slice(0, 18);
  const eyebrow = config?.eyebrow || 'Specimen № 07';
  const pangram = config?.pangram || 'Quick wafting zephyrs vex bold Jim';
  const paragraph = config?.paragraph || 'Good type is invisible until you look for it. Then every curve, every counter and every carefully tuned space between two letters starts to speak about the hand that drew it.';
  const units = config?.metricUnits || 'em';
  const showSB = bool(config?.showSidebearings, true);
  const showKern = bool(config?.showKerning, true);
  const showVals = bool(config?.showMetricValues, true);
  const showXBand = bool(config?.showXBand, true);
  const showControls = bool(config?.showControls, true);
  const showWaterfall = bool(config?.showWaterfall, true);
  const showGrid = bool(config?.showGlyphGrid, true);
  const glyphSet = config?.glyphSet || 'A–Z 0–9';
  const speed = parseInt(config?.transitionSpeed || '520', 10);
  const bg = config?.backgroundColor || '#FAFAF9';
  const panel = config?.panelColor || '#F5F5F4';
  const ink = config?.inkColor || '#1C1917';
  const muted = config?.mutedColor || '#78716C';
  const rule = config?.ruleColor || '#D6D3D1';
  const accent = config?.accentColor || '#C2410C';
  const uiFontName = config?.uiFont || 'IBM Plex Mono';

  const FONTS = React.useMemo(() => [
    { name: 'Fraunces', cls: 'Old-style serif', css: 'Fraunces:opsz,wght@9..144,100..900', min: 100, max: 900, fb: 'Georgia, serif', designer: 'Undercase Type' },
    { name: 'Inter', cls: 'Grotesk', css: 'Inter:wght@100..900', min: 100, max: 900, fb: 'Helvetica, Arial, sans-serif', designer: 'Rasmus Andersson' },
    { name: 'JetBrains Mono', cls: 'Monospace', css: 'JetBrains+Mono:wght@100..800', min: 100, max: 800, fb: 'Menlo, monospace', designer: 'JetBrains' },
    { name: 'Playfair Display', cls: 'Display serif', css: 'Playfair+Display:wght@400..900', min: 400, max: 900, fb: 'Georgia, serif', designer: 'Claus Eggers Sørensen' },
    { name: 'Space Grotesk', cls: 'Neo-grotesk', css: 'Space+Grotesk:wght@300..700', min: 300, max: 700, fb: 'Helvetica, Arial, sans-serif', designer: 'Florian Karsten' }
  ], []);

  const uid = React.useMemo(() => 'sm' + Math.random().toString(36).slice(2, 9), []);
  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const dur = reduced ? 0 : speed;

  const [family, setFamily] = React.useState(config?.defaultFont || 'Fraunces');
  const [size, setSize] = React.useState(parseFloat(config?.defaultSize || '240') || 240);
  const [tracking, setTracking] = React.useState(parseFloat(config?.defaultTracking || '-0.01') || 0);
  const [lineH, setLineH] = React.useState(parseFloat(config?.defaultLineHeight || '1.45') || 1.45);
  const [weight, setWeight] = React.useState(parseFloat(config?.defaultWeight || '360') || 360);
  const [glyph, setGlyph] = React.useState('R');
  const [fontTick, setFontTick] = React.useState(0);
  const [width, setWidth] = React.useState(1280);
  const [stageW, setStageW] = React.useState(900);
  const [entered, setEntered] = React.useState(reduced);

  React.useEffect(() => { setFamily(config?.defaultFont || 'Fraunces'); }, [config?.defaultFont]);
  React.useEffect(() => { setSize(parseFloat(config?.defaultSize || '240') || 240); }, [config?.defaultSize]);
  React.useEffect(() => { setWeight(parseFloat(config?.defaultWeight || '360') || 360); }, [config?.defaultWeight]);

  const font = FONTS.find((f) => f.name === family) || FONTS[0];
  const w = Math.max(font.min, Math.min(font.max, weight));
  const stack = `"${font.name}", ${font.fb}`;
  const uiFont = uiFontName === 'IBM Plex Mono' ? '"IBM Plex Mono", ui-monospace, Menlo, monospace' : uiFontName === 'Inter' ? '"Inter", -apple-system, Arial, sans-serif' : 'system-ui, -apple-system, sans-serif';
  const mono = '"IBM Plex Mono", ui-monospace, "SF Mono", Menlo, monospace';

  const rootRef = React.useRef(null);
  const stageRef = React.useRef(null);
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const add = (css) => {
      const id = 'gf-' + css.replace(/[^a-z0-9]/gi, '').slice(0, 48);
      if (document.getElementById(id)) return;
      const l = document.createElement('link');
      l.id = id; l.rel = 'stylesheet';
      l.href = `https://fonts.googleapis.com/css2?family=${css}&display=swap`;
      document.head.appendChild(l);
    };
    add('IBM+Plex+Mono:wght@400;500');
    if (uiFontName === 'Inter') add('Inter:wght@100..900');
    add(font.css);
    let alive = true;
    const load = () => {
      if (!document.fonts || !document.fonts.load) return;
      document.fonts.load(`${w} 64px "${font.name}"`).then(() => { if (alive) setFontTick((t) => t + 1); }).catch(() => {});
    };
    load();
    const t1 = setTimeout(load, 400);
    const t2 = setTimeout(load, 1200);
    return () => { alive = false; clearTimeout(t1); clearTimeout(t2); };
  }, [font, w, uiFontName]);

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return undefined;
    const measure = () => {
      setWidth(el.clientWidth || 1280);
      if (stageRef.current) setStageW(stageRef.current.clientWidth || 900);
    };
    measure();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (ro) { ro.observe(el); if (stageRef.current) ro.observe(stageRef.current); }
    window.addEventListener('resize', measure);
    const t = setTimeout(() => setEntered(true), 30);
    return () => { if (ro) ro.disconnect(); window.removeEventListener('resize', measure); clearTimeout(t); };
  }, []);

  const compact = width < 820;
  const stageH = compact ? 300 : 500;
  const gutL = compact ? 54 : 128;
  const gutR = compact ? 12 : (showVals ? 120 : 40);

  const m = React.useMemo(() => {
    if (!canvasRef.current) canvasRef.current = document.createElement('canvas');
    const ctx = canvasRef.current.getContext('2d');
    const ref = 200;
    ctx.font = `${w} ${ref}px ${stack}`;
    const asc = (s) => Math.max(...Array.from(s).map((c) => ctx.measureText(c).actualBoundingBoxAscent || 0));
    const des = (s) => Math.max(...Array.from(s).map((c) => ctx.measureText(c).actualBoundingBoxDescent || 0));
    const capH = asc('HIEZ') / ref;
    const xH = asc('xzvw') / ref;
    const ascH = Math.max(capH, asc('dhkl') / ref);
    const descH = des('pqgy') / ref;
    const chars = Array.from(word);
    const adv = chars.map((c) => ctx.measureText(c).width / ref);
    const ink = chars.map((c) => {
      const mm = ctx.measureText(c);
      return { l: -(mm.actualBoundingBoxLeft || 0) / ref, r: (mm.actualBoundingBoxRight || 0) / ref };
    });
    const kern = chars.map((c, i) => (i < chars.length - 1 ? (ctx.measureText(c + chars[i + 1]).width - ctx.measureText(c).width - ctx.measureText(chars[i + 1]).width) / ref : 0));
    return { capH, xH, ascH, descH, chars, adv, ink, kern };
  }, [word, w, stack, fontTick]); // eslint-disable-line react-hooks/exhaustive-deps

  const totalEm = m.adv.reduce((a, b) => a + b, 0) + m.kern.reduce((a, b) => a + b, 0) + tracking * Math.max(0, m.chars.length - 1);
  const availW = Math.max(120, stageW - gutL - gutR - (compact ? 8 : 40));
  const availH = stageH - (compact ? 90 : 150);
  const fit = Math.min(1, availW / Math.max(0.1, totalEm * size), availH / Math.max(0.1, (m.ascH + m.descH) * size));
  const S = size * fit;
  const wordW = totalEm * S;
  const x0 = gutL + (availW - wordW) / 2 + (compact ? 4 : 20);
  const baseY = Math.round((stageH + (m.ascH - m.descH) * S) / 2 + (compact ? 8 : 14));
  const xs = [];
  m.chars.reduce((x, c, i) => { xs.push(x); return x + (m.adv[i] + m.kern[i] + tracking) * S; }, x0);

  let kernIdx = -1;
  m.kern.forEach((k, i) => { if (Math.abs(k) > 0.004 && (kernIdx < 0 || Math.abs(k) > Math.abs(m.kern[kernIdx]))) kernIdx = i; });

  const fmt = (em) => {
    if (units === 'px') return `${Math.round(em * S)} px`;
    if (units === 'units') return `${Math.round(em * 1000)} u`;
    return `${em.toFixed(3).replace(/^(-?)0\./, '$1.')} em`;
  };
  const lines = [
    { key: 'Ascender', short: 'asc', v: m.ascH },
    { key: 'Cap height', short: 'cap', v: m.capH },
    { key: 'x-height', short: 'x', v: m.xH },
    { key: 'Baseline', short: 'base', v: 0 },
    { key: 'Descender', short: 'desc', v: -m.descH }
  ];
  const lineYs = lines.map((l) => baseY - l.v * S);
  const labelYs = lineYs.map((y) => y - 6);
  const minGap = compact ? 11 : 14;
  for (let i = 1; i < labelYs.length; i++) if (labelYs[i] - labelYs[i - 1] < minGap) labelYs[i] = labelYs[i - 1] + minGap;

  const ease = 'cubic-bezier(.22,1,.36,1)';
  const tr = (props) => (dur ? props.split(',').map((p) => `${p.trim()} ${dur}ms ${ease}`).join(', ') : 'none');
  const p = uid;

  const ranges = [
    { label: 'Size', value: size, set: setSize, min: 48, max: 360, step: 1, show: `${Math.round(size)} px${fit < 0.995 ? ' · fit ' + Math.round(S) : ''}` },
    { label: 'Tracking', value: tracking, set: setTracking, min: -0.08, max: 0.2, step: 0.005, show: `${tracking >= 0 ? '+' : ''}${tracking.toFixed(3)} em` },
    { label: 'Line height', value: lineH, set: setLineH, min: 0.9, max: 2, step: 0.01, show: lineH.toFixed(2) },
    { label: 'Weight', value: w, set: setWeight, min: font.min, max: font.max, step: 1, show: `${Math.round(w)}` }
  ];

  const glyphs = React.useMemo(() => {
    const AZ = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const az = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const n09 = '0123456789'.split('');
    if (glyphSet === 'a–z 0–9') return az.concat(n09);
    if (glyphSet === 'A–Z a–z') return AZ.concat(az);
    return AZ.concat(n09);
  }, [glyphSet]);

  const sectionPad = compact ? 20 : 56;
  const label = { fontFamily: uiFont, fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: muted };

  return (
    <section ref={rootRef} className={`specimen-metrics ${p}`} style={{ width: '100%', background: bg, color: ink, fontFamily: uiFont, paddingBottom: compact ? 32 : 64 }}>
      <style>{`
        .${p} input[type=range] { -webkit-appearance: none; appearance: none; width: 100%; height: 22px; background: transparent; margin: 0; cursor: pointer; }
        .${p} input[type=range]::-webkit-slider-runnable-track { height: 1px; background: ${rule}; }
        .${p} input[type=range]::-moz-range-track { height: 1px; background: ${rule}; }
        .${p} input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 13px; height: 13px; border-radius: 50%; background: ${ink}; margin-top: -6px; border: 3px solid ${panel}; box-shadow: 0 0 0 1px ${ink}; }
        .${p} input[type=range]::-moz-range-thumb { width: 9px; height: 9px; border-radius: 50%; background: ${ink}; border: 3px solid ${panel}; box-shadow: 0 0 0 1px ${ink}; }
        .${p} input[type=range]:focus-visible { outline: 2px solid ${accent}; outline-offset: 4px; }
        .${p} select:focus-visible, .${p} button:focus-visible { outline: 2px solid ${accent}; outline-offset: 2px; }
        .${p} .${p}-cell { transition: transform .35s ${ease}, background .25s, color .25s, box-shadow .35s; }
        .${p} .${p}-cell:hover, .${p} .${p}-cell:focus-visible { transform: scale(1.55); background: ${ink} !important; color: ${bg} !important; z-index: 2; box-shadow: 0 10px 30px rgba(0,0,0,.18); }
        @keyframes ${p}-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
        @keyframes ${p}-rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        @keyframes ${p}-fade { from { opacity: 0; } to { opacity: 1; } }
        @media (prefers-reduced-motion: reduce) { .${p} * { animation: none !important; transition: none !important; } }
      `}</style>

      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, padding: `${compact ? 20 : 36}px ${sectionPad}px ${compact ? 14 : 22}px`, borderBottom: `1px solid ${rule}`, flexWrap: 'wrap' }}>
        <span style={label}>{eyebrow}</span>
        <span style={{ fontFamily: stack, fontSize: compact ? 22 : 28, fontWeight: 400, letterSpacing: '-0.01em', fontVariationSettings: `'wght' 400` }}>{font.name}</span>
        <span style={{ ...label, display: compact ? 'none' : 'inline' }}>{font.cls} · {font.designer} · {font.min}–{font.max}</span>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: compact || !showControls ? '1fr' : 'minmax(0,1fr) 300px', borderBottom: `1px solid ${rule}` }}>
        <div ref={stageRef} style={{ position: 'relative', height: stageH, overflow: 'hidden' }}>
          <svg width="100%" height={stageH} role="img" aria-label={`${word} set in ${font.name} ${Math.round(w)} with typographic metrics`} style={{ display: 'block' }}>
            <defs>
              <pattern id={`${p}-hatch`} width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="5" stroke={accent} strokeWidth="1" opacity="0.6" />
              </pattern>
            </defs>

            {showXBand && (
              <rect x={0} width="100%" y={lineYs[2]} height={Math.max(0, lineYs[3] - lineYs[2])} fill={accent} opacity="0.05"
                style={{ transition: tr('y, height') }} />
            )}

            {lines.map((l, i) => {
              const y = lineYs[i];
              const strong = i === 3;
              return (
                <g key={l.key} style={{ transform: `translateY(${y}px)`, transition: tr('transform') }}>
                  <line x1={0} x2="100%" y1={0} y2={0} pathLength="1" stroke={strong ? ink : (i === 2 ? accent : muted)} strokeWidth={strong ? 1 : 0.75}
                    strokeDasharray={strong ? undefined : '1'} opacity={strong ? 0.9 : 0.55}
                    style={{ animation: reduced ? 'none' : `${p}-draw 1s ${ease} ${i * 90}ms both` }} />
                </g>
              );
            })}

            {lines.map((l, i) => (
              <g key={'lab' + l.key} style={{ transform: `translateY(${labelYs[i]}px)`, transition: tr('transform'), animation: reduced ? 'none' : `${p}-fade .6s ease ${300 + i * 80}ms both` }}>
                <text x={compact ? 8 : 20} y={0} fontFamily={mono} fontSize={compact ? 9 : 10} letterSpacing="1.2" fill={i === 2 ? accent : muted}>
                  {(compact ? l.short : l.key).toUpperCase()}
                </text>
                {showVals && !compact && (
                  <text x={stageW - 16} y={0} textAnchor="end" fontFamily={mono} fontSize={10} fill={i === 3 ? ink : muted} style={{ fontVariantNumeric: 'tabular-nums' }}>
                    {fmt(Math.abs(l.v))}
                  </text>
                )}
              </g>
            ))}

            {showSB && m.chars.map((c, i) => {
              const x = xs[i];
              const a = m.adv[i] * S;
              const lsb = m.ink[i].l * S;
              const rsb = a - m.ink[i].r * S;
              const top = lineYs[0] - 10;
              const h = lineYs[4] - lineYs[0] + 20;
              if (c === ' ') return null;
              return (
                <g key={'sb' + i} style={{ transform: `translate(${x}px, ${top}px)`, transition: tr('transform'), animation: reduced ? 'none' : `${p}-fade .7s ease ${520 + i * 40}ms both` }}>
                  <rect x={0} y={0} width={Math.max(0, a)} height={h} fill="none" stroke={muted} strokeWidth="0.6" opacity="0.6" style={{ transition: tr('width, height') }} />
                  {lsb > 0.5 && <rect x={0} y={0} width={lsb} height={h} fill={`url(#${p}-hatch)`} style={{ transition: tr('width, height') }} />}
                  {rsb > 0.5 && <rect x={a - rsb} y={0} width={rsb} height={h} fill={`url(#${p}-hatch)`} style={{ transition: tr('x, width, height') }} />}
                  {!compact && (
                    <text x={a / 2} y={h + 16} textAnchor="middle" fontFamily={mono} fontSize="9.5" fill={muted} style={{ fontVariantNumeric: 'tabular-nums' }}>
                      {Math.round(m.adv[i] * 1000)}
                    </text>
                  )}
                </g>
              );
            })}

            {m.chars.map((c, i) => (
              <g key={'g' + i} style={{ transform: `translate(${xs[i]}px, ${baseY}px)`, transition: tr('transform') }}>
                <text x={0} y={0} fill={ink}
                  style={{ fontFamily: stack, fontSize: S, fontWeight: w, fontVariationSettings: `'wght' ${w}`, fontKerning: 'none', transition: tr('font-size, font-weight'), animation: reduced ? 'none' : `${p}-rise .9s ${ease} ${120 + i * 45}ms both` }}>
                  {c}
                </text>
              </g>
            ))}

            {showKern && kernIdx >= 0 && (() => {
              const xa = xs[kernIdx] + m.ink[kernIdx].l * S;
              const xb = xs[kernIdx + 1] + m.ink[kernIdx + 1].r * S;
              const y = lineYs[0] - 26;
              const val = Math.round(m.kern[kernIdx] * 1000);
              return (
                <g style={{ transition: tr('transform'), animation: reduced ? 'none' : `${p}-fade .6s ease 900ms both` }}>
                  <path d={`M ${xa} ${y + 8} V ${y} H ${xb} V ${y + 8}`} fill="none" stroke={accent} strokeWidth="1" style={{ transition: tr('d') }} />
                  <text x={(xa + xb) / 2} y={y - 8} textAnchor="middle" fontFamily={mono} fontSize="10" letterSpacing="1" fill={accent}>
                    KERN {m.chars[kernIdx]}{m.chars[kernIdx + 1]} {val > 0 ? '+' : '−'}{Math.abs(val)}
                  </text>
                </g>
              );
            })()}
          </svg>
          <div style={{ position: 'absolute', left: compact ? 8 : 20, bottom: compact ? 10 : 18, display: 'flex', gap: compact ? 12 : 22, ...label, fontSize: compact ? 9 : 10 }}>
            <span>{Math.round(S)} px</span>
            <span>{Math.round(w)} wt</span>
            <span>{(tracking * 1000).toFixed(0)} trk</span>
            {!compact && <span>Hatch = sidebearings</span>}
          </div>
        </div>

        {showControls && (
          <aside aria-label="Specimen controls" style={{ background: panel, borderLeft: compact ? 'none' : `1px solid ${rule}`, borderTop: compact ? `1px solid ${rule}` : 'none', padding: compact ? '18px 20px 22px' : '28px 28px', display: 'grid', alignContent: 'start', gap: compact ? 16 : 22 }}>
            <label style={{ display: 'grid', gap: 8 }}>
              <span style={{ display: 'flex', justifyContent: 'space-between' }}><span style={label}>Typeface</span><span style={{ ...label, color: accent }}>{font.cls}</span></span>
              <select value={family} onChange={(e) => setFamily(e.target.value)}
                style={{ appearance: 'none', WebkitAppearance: 'none', width: '100%', padding: '10px 32px 10px 12px', border: `1px solid ${rule}`, borderRadius: 0, background: `${bg} url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6'><path d='M0 0 L5 6 L10 0' fill='none' stroke='%2378716C'/></svg>") no-repeat right 12px center`, color: ink, fontFamily: uiFont, fontSize: 13, cursor: 'pointer' }}>
                {FONTS.map((f) => <option key={f.name} value={f.name}>{f.name}</option>)}
              </select>
            </label>
            {ranges.map((r) => (
              <label key={r.label} style={{ display: 'grid', gap: 6 }}>
                <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={label}>{r.label}</span>
                  <span style={{ fontFamily: mono, fontSize: 12, color: ink, fontVariantNumeric: 'tabular-nums' }}>{r.show}</span>
                </span>
                <input type="range" min={r.min} max={r.max} step={r.step} value={r.value}
                  aria-label={r.label} aria-valuetext={r.show}
                  onChange={(e) => r.set(parseFloat(e.target.value))} />
              </label>
            ))}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: rule, border: `1px solid ${rule}`, marginTop: compact ? 0 : 6 }}>
              {[['Cap', m.capH], ['x-height', m.xH], ['Ascender', m.ascH], ['Descender', m.descH]].map(([k, v]) => (
                <div key={k} style={{ background: panel, padding: '10px 12px' }}>
                  <div style={{ ...label, fontSize: 9.5 }}>{k}</div>
                  <div style={{ fontFamily: mono, fontSize: 14, marginTop: 4, fontVariantNumeric: 'tabular-nums' }}>{fmt(v)}</div>
                </div>
              ))}
            </div>
          </aside>
        )}
      </div>

      {showWaterfall && (
        <div style={{ padding: `${compact ? 24 : 40}px ${sectionPad}px 0` }}>
          <div style={{ ...label, marginBottom: compact ? 10 : 16 }}>Waterfall</div>
          {[96, 64, 44, 30, 20, 14].filter((s) => !compact || s <= 64).map((s, i) => (
            <div key={s} style={{ display: 'grid', gridTemplateColumns: compact ? '36px 1fr' : '64px 1fr', alignItems: 'baseline', gap: 12, borderTop: `1px solid ${rule}`, padding: `${Math.round(s * (lineH - 1) * 0.5) + 6}px 0`, transition: tr('padding') }}>
              <span style={{ fontFamily: mono, fontSize: 10.5, color: muted, fontVariantNumeric: 'tabular-nums' }}>{s}</span>
              <span style={{
                fontFamily: stack, fontSize: compact ? s * 0.62 : s, fontWeight: w, fontVariationSettings: `'wght' ${w}`, letterSpacing: `${tracking}em`, lineHeight: lineH,
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', transition: tr('font-weight, letter-spacing, line-height'),
                animation: reduced ? 'none' : `${p}-rise .8s ${ease} ${200 + i * 60}ms both`
              }}>{pangram}</span>
            </div>
          ))}
        </div>
      )}

      {showGrid && (
        <div style={{ padding: `${compact ? 28 : 48}px ${sectionPad}px 0`, display: 'grid', gridTemplateColumns: compact ? '1fr' : 'minmax(0, 1.6fr) minmax(0, 1fr)', gap: compact ? 20 : 48 }}>
          <div>
            <div style={{ ...label, marginBottom: compact ? 10 : 16 }}>Glyphs — {glyphSet}</div>
            <div role="list" style={{ display: 'grid', gridTemplateColumns: `repeat(${compact ? 6 : 12}, 1fr)`, borderTop: `1px solid ${rule}`, borderLeft: `1px solid ${rule}` }}>
              {glyphs.map((g, i) => (
                <button key={i} role="listitem" className={`${p}-cell`} aria-label={`Glyph ${g}, U+${g.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')}`}
                  onMouseEnter={() => setGlyph(g)} onFocus={() => setGlyph(g)} onClick={() => setGlyph(g)}
                  style={{ appearance: 'none', border: 'none', borderRight: `1px solid ${rule}`, borderBottom: `1px solid ${rule}`, background: g === glyph ? panel : bg, color: ink, aspectRatio: '1 / 1', display: 'grid', placeItems: 'center', fontFamily: stack, fontWeight: w, fontVariationSettings: `'wght' ${w}`, fontSize: compact ? 22 : 26, cursor: 'pointer', position: 'relative', padding: 0 }}>
                  {g}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr', gap: compact ? 16 : 24 }}>
            <div style={{ border: `1px solid ${rule}`, background: panel, position: 'relative', height: compact ? 220 : 280, overflow: 'hidden' }}>
              <span style={{ position: 'absolute', left: 14, top: 12, ...label }}>U+{glyph.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')}</span>
              <span style={{ position: 'absolute', right: 14, top: 12, ...label }}>{font.name} {Math.round(w)}</span>
              <svg viewBox="0 0 400 280" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true" style={{ position: 'absolute', inset: 0 }}>
                {[[0, ink, 0.7], [m.xH, accent, 0.7], [m.capH, muted, 0.5], [-m.descH, muted, 0.35]].map(([v, c, o], i) => (
                  <line key={i} x1="-200" x2="600" y1={196 - v * 170} y2={196 - v * 170} stroke={c} strokeWidth="1" opacity={o} vectorEffect="non-scaling-stroke" style={{ transition: tr('y1, y2') }} />
                ))}
                <text key={glyph + family} x="200" y="196" textAnchor="middle" fill={ink}
                  style={{ fontFamily: stack, fontWeight: w, fontVariationSettings: `'wght' ${w}`, fontSize: 170, animation: reduced ? 'none' : `${p}-rise .5s ${ease} both` }}>{glyph}</text>
              </svg>
            </div>
            <p style={{ margin: 0, fontFamily: stack, fontWeight: w, fontVariationSettings: `'wght' ${w}`, fontSize: compact ? 16 : 18, lineHeight: lineH, letterSpacing: `${tracking * 0.5}em`, color: ink, transition: tr('line-height, letter-spacing, font-weight') }}>{paragraph}</p>
          </div>
        </div>
      )}
    </section>
  );
}

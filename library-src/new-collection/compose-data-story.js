const MANIFEST = {
  "type": "Compose.DataStory",
  "description": "An editorial data-visualisation spread that assembles when it enters view: the hero statistic counts up, columns grow bar by bar with value labels, an annotation draws to the peak and a row of small-multiple sparklines traces itself",
  "editorElement": {
    "selector": ".data-story",
    "displayName": "Data Story",
    "archetype": "container",
    "data": {
      "kicker": { "dataType": "text", "displayName": "Kicker", "defaultValue": "Chart of the week", "group": "Content" },
      "figureLabel": { "dataType": "text", "displayName": "Figure Label", "defaultValue": "Fig. 04 — Energy", "group": "Content" },
      "headline": { "dataType": "text", "displayName": "Headline", "defaultValue": "Clean power crossed a threshold the grid was never built for", "group": "Content" },
      "deck": { "dataType": "text", "displayName": "Deck", "defaultValue": "A decade of compounding solar and wind additions has pushed low-carbon sources past two-fifths of world generation.", "group": "Content" },
      "heroValue": { "dataType": "text", "displayName": "Hero Value", "defaultValue": "41.6", "group": "Content" },
      "heroUnit": { "dataType": "text", "displayName": "Hero Unit", "defaultValue": "%", "group": "Content" },
      "heroLabel": { "dataType": "text", "displayName": "Hero Label", "defaultValue": "of global electricity came from clean sources in 2025", "group": "Content" },
      "values": { "dataType": "text", "displayName": "Values (comma separated)", "defaultValue": "22.4,23.1,24.0,25.2,26.1,27.4,28.9,29.6,30.8,32.9,36.7,41.6", "group": "Data" },
      "labels": { "dataType": "text", "displayName": "Labels (comma separated)", "defaultValue": "2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025", "group": "Data" },
      "valueSuffix": { "dataType": "text", "displayName": "Value Suffix", "defaultValue": "%", "group": "Data" },
      "annotation": { "dataType": "text", "displayName": "Peak Annotation", "defaultValue": "Record year: solar alone added more generation than every fossil source combined", "group": "Data" },
      "spark1Label": { "dataType": "text", "displayName": "Sparkline 1 Label", "defaultValue": "Solar", "group": "Sparklines" },
      "spark1Values": { "dataType": "text", "displayName": "Sparkline 1 Values", "defaultValue": "1.1,1.4,1.7,2.2,2.6,3.0,3.6,4.5,5.5,6.9,8.6,10.8", "group": "Sparklines" },
      "spark2Label": { "dataType": "text", "displayName": "Sparkline 2 Label", "defaultValue": "Wind", "group": "Sparklines" },
      "spark2Values": { "dataType": "text", "displayName": "Sparkline 2 Values", "defaultValue": "3.1,3.5,3.9,4.5,4.9,5.4,6.0,6.6,7.3,7.8,8.4,9.1", "group": "Sparklines" },
      "spark3Label": { "dataType": "text", "displayName": "Sparkline 3 Label", "defaultValue": "Hydro", "group": "Sparklines" },
      "spark3Values": { "dataType": "text", "displayName": "Sparkline 3 Values", "defaultValue": "16.3,16.2,16.4,16.0,15.9,15.8,16.0,15.2,14.9,14.3,14.0,14.2", "group": "Sparklines" },
      "spark4Label": { "dataType": "text", "displayName": "Sparkline 4 Label", "defaultValue": "Coal", "group": "Sparklines" },
      "spark4Values": { "dataType": "text", "displayName": "Sparkline 4 Values", "defaultValue": "40.8,39.3,38.4,38.1,37.6,36.4,35.1,36.0,35.4,35.0,34.1,32.6", "group": "Sparklines" },
      "source": { "dataType": "text", "displayName": "Source Footnote", "defaultValue": "Source: Global Electricity Review 2026. Share of total generation, clean = renewables + nuclear.", "group": "Content" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#FAF9F7", "group": "Colors" },
      "inkColor": { "dataType": "color", "displayName": "Ink", "defaultValue": "#1C1917", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#78716C", "group": "Colors" },
      "barColor": { "dataType": "color", "displayName": "Bars", "defaultValue": "#D6D3D1", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent (peak)", "defaultValue": "#2F5D8A", "group": "Colors" },
      "gridColor": { "dataType": "color", "displayName": "Gridlines", "defaultValue": "#E7E5E4", "group": "Colors" },
      "headlineFont": { "dataType": "select", "displayName": "Headline Font", "defaultValue": "Fraunces", "options": ["Fraunces", "Instrument Serif", "Georgia", "Inter"], "group": "Typography" },
      "fontFamily": { "dataType": "select", "displayName": "Text Font", "defaultValue": "Inter", "options": ["Inter", "IBM Plex Sans", "system-ui"], "group": "Typography" },
      "sectionHeight": { "dataType": "select", "displayName": "Section Height (px)", "defaultValue": "800", "options": ["720", "800", "900"], "group": "Layout" },
      "showGridlines": { "dataType": "booleanValue", "displayName": "Gridlines", "defaultValue": "true", "group": "Layout" },
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
  const kicker = config?.kicker || 'Chart of the week';
  const figureLabel = config?.figureLabel || 'Fig. 04 — Energy';
  const headline = config?.headline || 'Clean power crossed a threshold the grid was never built for';
  const deck = config?.deck || 'A decade of compounding solar and wind additions has pushed low-carbon sources past two-fifths of world generation.';
  const heroValue = config?.heroValue || '41.6';
  const heroUnit = config?.heroUnit || '%';
  const heroLabel = config?.heroLabel || 'of global electricity came from clean sources in 2025';
  const valuesStr = config?.values || '22.4,23.1,24.0,25.2,26.1,27.4,28.9,29.6,30.8,32.9,36.7,41.6';
  const labelsStr = config?.labels || '2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025';
  const suffix = config?.valueSuffix ?? '%';
  const annotation = config?.annotation || 'Record year: solar alone added more generation than every fossil source combined';
  const source = config?.source || 'Source: Global Electricity Review 2026. Share of total generation, clean = renewables + nuclear.';
  const sparkDefaults = [
    ['Solar', '1.1,1.4,1.7,2.2,2.6,3.0,3.6,4.5,5.5,6.9,8.6,10.8'],
    ['Wind', '3.1,3.5,3.9,4.5,4.9,5.4,6.0,6.6,7.3,7.8,8.4,9.1'],
    ['Hydro', '16.3,16.2,16.4,16.0,15.9,15.8,16.0,15.2,14.9,14.3,14.0,14.2'],
    ['Coal', '40.8,39.3,38.4,38.1,37.6,36.4,35.1,36.0,35.4,35.0,34.1,32.6']
  ];
  const bg = config?.backgroundColor || '#FAF9F7';
  const ink = config?.inkColor || '#1C1917';
  const muted = config?.mutedColor || '#78716C';
  const barColor = config?.barColor || '#D6D3D1';
  const accent = config?.accentColor || '#2F5D8A';
  const gridColor = config?.gridColor || '#E7E5E4';
  const headlineFont = config?.headlineFont || 'Fraunces';
  const fontFamily = config?.fontFamily || 'Inter';
  const H = parseInt(config?.sectionHeight || '800', 10) || 800;
  const showGridlines = bool(config?.showGridlines, true);
  const triggerMode = config?.triggerMode || 'entrance';
  const threshold = parseFloat(config?.threshold || '0.25') || 0.25;
  const speed = Math.max(0.25, parseFloat(config?.speed || '1') || 1);
  const showReplay = bool(config?.showReplay, true);
  const DUR = 2.4;

  const parseNums = (s) => String(s || '').split(',').map((x) => parseFloat(x.trim())).filter((x) => Number.isFinite(x));
  const data = React.useMemo(() => {
    const vals = parseNums(valuesStr);
    const labs = String(labelsStr).split(',').map((x) => x.trim());
    return vals.map((v, i) => ({ v, l: labs[i] || String(i + 1) }));
  }, [valuesStr, labelsStr]);
  const sparks = React.useMemo(() => sparkDefaults.map((d, i) => ({
    label: config?.[`spark${i + 1}Label`] || d[0],
    vals: parseNums(config?.[`spark${i + 1}Values`] || d[1])
  })).filter((s) => s.vals.length > 1), [config]); // eslint-disable-line react-hooks/exhaustive-deps

  const uid = React.useMemo(() => 'ds' + Math.random().toString(36).slice(2, 9), []);
  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const rootRef = React.useRef(null);
  const chartRef = React.useRef(null);
  const animRef = React.useRef(null);
  const playedRef = React.useRef(false);
  const playRef = React.useRef(null);
  const [t, setT] = React.useState(reduced || triggerMode === 'manual' ? 1 : 0);
  const [w, setW] = React.useState(1280);
  const [cs, setCs] = React.useState({ w: 700, h: 420 });

  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    const fams = {
      Fraunces: 'Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500',
      'Instrument Serif': 'Instrument+Serif',
      Inter: 'Inter:wght@300;400;500',
      'IBM Plex Sans': 'IBM+Plex+Sans:wght@300;400;500',
      'IBM Plex Mono': 'IBM+Plex+Mono:wght@400;500'
    };
    [headlineFont, fontFamily, 'IBM Plex Mono'].forEach((f) => {
      if (!fams[f]) return;
      const id = 'gf-' + f.replace(/\s+/g, '-').toLowerCase();
      if (document.getElementById(id)) return;
      const l = document.createElement('link');
      l.id = id; l.rel = 'stylesheet';
      l.href = `https://fonts.googleapis.com/css2?family=${fams[f]}&display=swap`;
      document.head.appendChild(l);
    });
  }, [headlineFont, fontFamily]);

  React.useEffect(() => {
    const el = rootRef.current;
    const ch = chartRef.current;
    if (!el) return undefined;
    const measure = () => {
      setW(el.clientWidth || 1280);
      if (ch) setCs({ w: Math.max(200, ch.clientWidth), h: Math.max(160, ch.clientHeight) });
    };
    measure();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (ro) { ro.observe(el); if (ch) ro.observe(ch); }
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
    // wall-clock driven (no lag smoothing), so the settled poster frame is always reached on time
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
  const eQuart = (x) => 1 - Math.pow(1 - x, 4);

  const compact = w < 760;
  const P = compact ? 20 : 56;
  const mono = '"IBM Plex Mono", ui-monospace, "SF Mono", Menlo, monospace';
  const sans = fontFamily === 'system-ui' ? 'system-ui, -apple-system, sans-serif' : `"${fontFamily}", -apple-system, "Helvetica Neue", sans-serif`;
  const serif = headlineFont === 'Inter' ? sans : headlineFont === 'Georgia' ? 'Georgia, "Times New Roman", serif' : `"${headlineFont}", Georgia, serif`;

  const decimals = (String(heroValue).split('.')[1] || '').length;
  const heroNum = parseFloat(String(heroValue).replace(/,/g, ''));
  const heroShown = Number.isFinite(heroNum) ? (heroNum * eQuart(seg(0.04, 0.5))).toFixed(decimals) : heroValue;
  const valDec = data.reduce((d, p) => Math.max(d, (String(p.v).split('.')[1] || '').length), 0);
  const fmtV = (v) => v.toFixed(Math.min(2, valDec));

  const n = data.length;
  const maxV = n ? Math.max(...data.map((d) => d.v)) : 1;
  const minV = n ? Math.min(0, ...data.map((d) => d.v)) : 0;
  const peak = data.findIndex((d) => d.v === maxV);
  const rawStep = (maxV * 1.3) / 5;
  const mag = Math.pow(10, Math.floor(Math.log10(rawStep || 1)));
  const step = [1, 2, 2.5, 5, 10].map((k) => k * mag).find((s) => s >= rawStep) || rawStep;
  const yMax = Math.ceil((maxV * 1.32) / step) * step || 1;
  const ticks = [];
  for (let v = 0; v <= yMax + 1e-9; v += step) ticks.push(v);

  const mL = 34;
  const mR = 4;
  const mT = 12;
  const mB = 30;
  const pw = Math.max(50, cs.w - mL - mR);
  const ph = Math.max(50, cs.h - mT - mB);
  const band = n ? pw / n : pw;
  const barW = band * (compact ? 0.66 : 0.62);
  const yOf = (v) => mT + ph - ((v - minV) / (yMax - minV)) * ph;
  const barStart = (i) => 0.14 + (n > 1 ? (i / (n - 1)) * 0.34 : 0);

  const px = mL + band * peak + band / 2;
  const py = peak >= 0 ? yOf(maxV) : mT;
  const noteLeft = peak < n / 2;
  const noteY = mT + 2;
  const annP = eOut(seg(0.64, 0.8));
  const noteP = eOut(seg(0.74, 0.88));
  const anchorY = py - (compact ? 22 : 24);
  const notePath = noteLeft
    ? `M ${px} ${anchorY} V ${noteY + 9} H ${px + 18}`
    : `M ${px} ${anchorY} V ${noteY + 9} H ${px - 18}`;

  const ruleP = eQuart(seg(0, 0.2));
  const headP = eOut(seg(0.02, 0.24));
  const labelP = eOut(seg(0.3, 0.48));
  const axisP = eOut(seg(0.06, 0.28));
  const srcP = eOut(seg(0.84, 0.98));
  const showValueLabel = (i) => !compact || i === peak || i === 0 || i === n - 1 || i % 3 === 0;
  const showXLabel = (i) => (compact ? i % 3 === 0 || i === n - 1 : n <= 16 || i % 2 === 0 || i === n - 1);
  const shortLab = (l) => (compact && /^\d{4}$/.test(l) ? '’' + l.slice(2) : l);

  const sparkH = compact ? 30 : 46;

  return (
    <section ref={rootRef} className="data-story" aria-label={`${headline}. ${heroValue}${heroUnit} ${heroLabel}`}
      style={{ position: 'relative', width: '100%', height: `${H}px`, overflow: 'hidden', backgroundColor: bg, color: ink, fontFamily: sans, display: 'flex', flexDirection: 'column', padding: `${compact ? 22 : 40}px ${P}px ${compact ? 18 : 30}px`, boxSizing: 'border-box' }}>
      <style>{`.${uid}-rp{opacity:.6;transition:opacity .2s}.${uid}-rp:hover{opacity:1}.${uid}-rp:focus-visible{opacity:1;outline:2px solid ${accent};outline-offset:3px}`}</style>

      <header style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingBottom: 12, fontFamily: mono, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        <span style={{ color: accent, fontWeight: 500, opacity: headP }}>{kicker}</span>
        <span style={{ color: muted, opacity: headP }}>{figureLabel}</span>
        <span style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 1, background: ink, transformOrigin: 'left', transform: `scaleX(${ruleP})` }} />
      </header>

      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: compact ? 'column' : 'row', gap: compact ? 14 : 64, paddingTop: compact ? 16 : 30 }}>
        <div style={{ width: compact ? '100%' : 340, flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ margin: 0, fontFamily: serif, fontWeight: 400, fontSize: compact ? 23 : 32, lineHeight: 1.12, letterSpacing: '-0.015em', opacity: headP, transform: `translateY(${(1 - headP) * 10}px)` }}>{headline}</h2>
          <div style={{ marginTop: compact ? 14 : 34, display: 'flex', alignItems: 'baseline', gap: compact ? 12 : 0, flexDirection: compact ? 'row' : 'column' }}>
            <div aria-hidden="true" style={{ fontSize: compact ? 64 : 124, fontWeight: 300, lineHeight: 0.9, letterSpacing: '-0.05em', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap', color: ink }}>
              {heroShown}<span style={{ fontSize: compact ? 28 : 52, letterSpacing: '-0.02em', color: accent, marginLeft: 4 }}>{heroUnit}</span>
            </div>
            <div style={{ fontSize: compact ? 13 : 15, lineHeight: 1.45, color: ink, marginTop: compact ? 0 : 14, maxWidth: compact ? 200 : 300, opacity: labelP, transform: `translateY(${(1 - labelP) * 8}px)` }}>{heroLabel}</div>
          </div>
          {!compact && (
            <p style={{ margin: '26px 0 0', fontSize: 14, lineHeight: 1.6, color: muted, maxWidth: 320, opacity: labelP }}>{deck}</p>
          )}
          {!compact && (
            <div style={{ marginTop: 'auto', display: 'flex', gap: 22, fontFamily: mono, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: muted, opacity: axisP, paddingBottom: 26 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><span style={{ width: 10, height: 10, background: barColor }} />Annual share</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><span style={{ width: 10, height: 10, background: accent }} />Record</span>
            </div>
          )}
        </div>

        <div ref={chartRef} style={{ position: 'relative', flex: 1, minHeight: compact ? 200 : 0, minWidth: 0 }}>
          {n === 0 ? (
            <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', color: muted, fontSize: 13, border: `1px dashed ${gridColor}` }}>Add comma-separated values to draw the chart</div>
          ) : (
            <svg width={cs.w} height={cs.h} viewBox={`0 0 ${cs.w} ${cs.h}`} role="img"
              aria-label={`Column chart: ${data.map((d) => `${d.l} ${fmtV(d.v)}${suffix}`).join(', ')}`}
              style={{ position: 'absolute', inset: 0, display: 'block', overflow: 'visible' }}>
              <defs>
                <clipPath id={`${uid}-plot`}><rect x={0} y={0} width={cs.w} height={mT + ph} /></clipPath>
              </defs>
              <g opacity={axisP}>
                {ticks.map((v, k) => (
                  <g key={k}>
                    {(showGridlines || v === 0) && (
                      <line x1={mL} x2={mL + pw * (v === 0 ? 1 : axisP)} y1={yOf(v)} y2={yOf(v)} stroke={v === 0 ? ink : gridColor} strokeWidth={v === 0 ? 1 : 1} shapeRendering="crispEdges" />
                    )}
                    <text x={mL - 8} y={yOf(v) + 3.5} textAnchor="end" fontSize={10.5} fill={muted} fontFamily={mono}>{Number(v.toFixed(2))}{k === ticks.length - 1 ? suffix : ''}</text>
                  </g>
                ))}
              </g>
              <g clipPath={`url(#${uid}-plot)`}>
                {data.map((d, i) => {
                  const p = eQuart(seg(barStart(i), barStart(i) + 0.22));
                  const y0 = yOf(Math.max(0, minV));
                  const y1 = yOf(d.v);
                  const hNow = (y0 - y1) * p;
                  return (
                    <rect key={i} x={mL + band * i + (band - barW) / 2} y={y0 - hNow} width={barW} height={Math.max(0, hNow)}
                      fill={i === peak ? accent : barColor} />
                  );
                })}
              </g>
              {data.map((d, i) => {
                const p = seg(barStart(i) + 0.14, barStart(i) + 0.24);
                const cxB = mL + band * i + band / 2;
                return (
                  <g key={i}>
                    {showValueLabel(i) && (
                      <text x={cxB} y={yOf(d.v) - 7 - (1 - p) * 6} textAnchor="middle" fontSize={compact ? 10 : 11} fontFamily={mono}
                        fill={i === peak ? accent : ink} fontWeight={i === peak ? 500 : 400} opacity={p}>{fmtV(d.v)}</text>
                    )}
                    {showXLabel(i) && (
                      <text x={cxB} y={mT + ph + 18} textAnchor="middle" fontSize={10.5} fontFamily={mono} fill={i === peak ? ink : muted} opacity={axisP}>{shortLab(d.l)}</text>
                    )}
                  </g>
                );
              })}
              {peak >= 0 && annotation && (
                <g>
                  <path d={notePath} pathLength="1" fill="none" stroke={ink} strokeWidth={0.9} strokeDasharray="1" strokeDashoffset={1 - annP} />
                  <circle cx={px} cy={anchorY} r={2.6 * annP} fill={ink} />
                </g>
              )}
            </svg>
          )}
          {n > 0 && peak >= 0 && annotation && (
            <div style={{
              position: 'absolute', top: noteY, maxWidth: compact ? 170 : 230, fontSize: compact ? 11.5 : 13, lineHeight: 1.4, color: ink,
              textAlign: noteLeft ? 'left' : 'right',
              ...(noteLeft ? { left: px + 24 } : { right: cs.w - px + 24 }),
              opacity: noteP, transform: `translateY(${(1 - noteP) * 6}px)`
            }}>
              <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: accent, display: 'block', marginBottom: 4 }}>{data[peak].l} · {fmtV(maxV)}{suffix}</span>
              {annotation}
            </div>
          )}
        </div>
      </div>

      {sparks.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${compact ? 2 : sparks.length}, 1fr)`, columnGap: compact ? 18 : 40, rowGap: 12, marginTop: compact ? 14 : 28, paddingTop: compact ? 12 : 18, borderTop: `1px solid ${gridColor}` }}>
          {sparks.map((s, k) => {
            const p = eOut(seg(0.48 + k * 0.06, 0.74 + k * 0.06));
            const sMin = Math.min(...s.vals);
            const sMax = Math.max(...s.vals);
            const vw = 200;
            const pts = s.vals.map((v, i) => [(i / (s.vals.length - 1)) * vw, 4 + (1 - (v - sMin) / (sMax - sMin || 1)) * (sparkH - 8)]);
            const d = pts.map((q, i) => `${i ? 'L' : 'M'} ${q[0].toFixed(1)} ${q[1].toFixed(1)}`).join(' ');
            const last = s.vals[s.vals.length - 1];
            const delta = last - s.vals[0];
            const end = pts[pts.length - 1];
            return (
              <div key={k} style={{ minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontFamily: mono, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: muted, opacity: axisP }}>
                  <span>{s.label}</span>
                  <span style={{ color: delta >= 0 ? accent : muted, opacity: p }}>{delta >= 0 ? '+' : '−'}{Math.abs(delta).toFixed(1)}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                  <div style={{ position: 'relative', flex: 1, minWidth: 0, height: sparkH }}>
                    <svg viewBox={`0 0 ${vw} ${sparkH}`} preserveAspectRatio="none" aria-label={`${s.label} trend from ${s.vals[0]} to ${last}`} role="img"
                      style={{ position: 'absolute', inset: 0, width: '100%', height: sparkH, display: 'block', overflow: 'visible' }}>
                      <line x1={0} x2={vw} y1={sparkH - 0.5} y2={sparkH - 0.5} stroke={gridColor} strokeWidth={1} vectorEffect="non-scaling-stroke" />
                      <path d={d} fill="none" stroke={ink} strokeWidth={1.4} vectorEffect="non-scaling-stroke" pathLength="1" strokeDasharray="1 2" strokeDashoffset={1 - p} strokeLinejoin="round" opacity={p > 0 ? 1 : 0} />
                    </svg>
                    <span style={{ position: 'absolute', right: -3.5, top: end[1] - 3.5, width: 7, height: 7, borderRadius: 7, background: accent, transform: `scale(${p >= 1 ? 1 : 0})`, transition: 'transform .25s' }} />
                  </div>
                  <span style={{ fontSize: compact ? 14 : 17, fontWeight: 400, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.01em', opacity: p >= 1 ? 1 : p * 0.6, minWidth: compact ? 30 : 40, textAlign: 'right' }}>
                    {last}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <footer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, marginTop: compact ? 12 : 20, opacity: srcP }}>
        <span style={{ fontSize: compact ? 10 : 11, lineHeight: 1.45, color: muted, fontFamily: mono, maxWidth: 760 }}>{source}</span>
        {showReplay && (
          <button type="button" className={`${uid}-rp`} aria-label="Replay animation"
            onClick={() => { playedRef.current = true; playRef.current(); }}
            style={{ flexShrink: 0, appearance: 'none', border: `1px solid ${gridColor}`, background: 'transparent', color: ink, borderRadius: 999, padding: '5px 11px', fontFamily: mono, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer' }}>
            ↻ Replay
          </button>
        )}
      </footer>
    </section>
  );
}

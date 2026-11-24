const MANIFEST = {
  "type": "Compose.SwissPoster",
  "description": "An International Typographic Style poster that assembles itself when it enters view: grid flash, circle and quadrant on precise rotations, bar wipes, giant headline letters dropping into the grid, typed metadata columns and registration marks",
  "editorElement": {
    "selector": ".swiss-poster",
    "displayName": "Swiss Poster",
    "archetype": "container",
    "data": {
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Ausstellung — Plakatkunst", "group": "Content" },
      "headline": { "dataType": "text", "displayName": "Headline (2 words)", "defaultValue": "Neue Form", "group": "Content" },
      "subline1": { "dataType": "text", "displayName": "Sub-line 1", "defaultValue": "Plakate der Schweizer Schule", "group": "Content" },
      "subline2": { "dataType": "text", "displayName": "Sub-line 2", "defaultValue": "1950 — 1975", "group": "Content" },
      "metaDateLabel": { "dataType": "text", "displayName": "Date Label", "defaultValue": "Dates", "group": "Metadata" },
      "metaDate": { "dataType": "text", "displayName": "Date", "defaultValue": "12.03 — 28.06.2027", "group": "Metadata" },
      "metaVenueLabel": { "dataType": "text", "displayName": "Venue Label", "defaultValue": "Venue", "group": "Metadata" },
      "metaVenue": { "dataType": "text", "displayName": "Venue", "defaultValue": "Museum für Gestaltung Zürich", "group": "Metadata" },
      "metaCatalogueLabel": { "dataType": "text", "displayName": "Catalogue Label", "defaultValue": "Catalogue", "group": "Metadata" },
      "metaCatalogue": { "dataType": "text", "displayName": "Catalogue No.", "defaultValue": "Kat. Nr. 0417", "group": "Metadata" },
      "backgroundColor": { "dataType": "color", "displayName": "Paper", "defaultValue": "#EFEDE8", "group": "Colors" },
      "inkColor": { "dataType": "color", "displayName": "Ink", "defaultValue": "#141414", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent", "defaultValue": "#D23A26", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Small Print", "defaultValue": "#6E6A63", "group": "Colors" },
      "gridColor": { "dataType": "color", "displayName": "Grid Lines", "defaultValue": "#D9D5CD", "group": "Colors" },
      "fontFamily": { "dataType": "select", "displayName": "Font Family", "defaultValue": "Inter", "options": ["Inter", "Archivo", "Helvetica Neue", "system-ui"], "group": "Typography" },
      "headlineWeight": { "dataType": "select", "displayName": "Headline Weight", "defaultValue": "500", "options": ["300", "400", "500"], "group": "Typography" },
      "headlineScale": { "dataType": "select", "displayName": "Headline Scale", "defaultValue": "1", "options": ["0.8", "0.9", "1", "1.1", "1.2"], "group": "Typography" },
      "letterCase": { "dataType": "select", "displayName": "Headline Case", "defaultValue": "lowercase", "options": ["as typed", "lowercase", "uppercase"], "group": "Typography" },
      "shapeVariant": { "dataType": "select", "displayName": "Shape Variant", "defaultValue": "circle", "options": ["circle", "rings", "halves"], "group": "Layout" },
      "sectionHeight": { "dataType": "select", "displayName": "Section Height (px)", "defaultValue": "800", "options": ["640", "720", "800", "900"], "group": "Layout" },
      "showGrid": { "dataType": "booleanValue", "displayName": "Show Grid", "defaultValue": "true", "group": "Layout" },
      "showRegMarks": { "dataType": "booleanValue", "displayName": "Registration Marks", "defaultValue": "true", "group": "Layout" },
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
  const eyebrow = config?.eyebrow || 'Ausstellung — Plakatkunst';
  const headlineRaw = config?.headline || 'Neue Form';
  const subline1 = config?.subline1 || 'Plakate der Schweizer Schule';
  const subline2 = config?.subline2 || '1950 — 1975';
  const metas = [
    [config?.metaDateLabel || 'Dates', config?.metaDate || '12.03 — 28.06.2027'],
    [config?.metaVenueLabel || 'Venue', config?.metaVenue || 'Museum für Gestaltung Zürich'],
    [config?.metaCatalogueLabel || 'Catalogue', config?.metaCatalogue || 'Kat. Nr. 0417']
  ];
  const bg = config?.backgroundColor || '#EFEDE8';
  const ink = config?.inkColor || '#141414';
  const accent = config?.accentColor || '#D23A26';
  const muted = config?.mutedColor || '#6E6A63';
  const gridColor = config?.gridColor || '#D9D5CD';
  const fontFamily = config?.fontFamily || 'Inter';
  const headlineWeight = config?.headlineWeight || '500';
  const headlineScale = parseFloat(config?.headlineScale || '1') || 1;
  const letterCase = config?.letterCase || 'lowercase';
  const variant = config?.shapeVariant || 'circle';
  const H = parseInt(config?.sectionHeight || '800', 10) || 800;
  const showGrid = bool(config?.showGrid, true);
  const showRegMarks = bool(config?.showRegMarks, true);
  const triggerMode = config?.triggerMode || 'entrance';
  const threshold = parseFloat(config?.threshold || '0.25') || 0.25;
  const speed = Math.max(0.25, parseFloat(config?.speed || '1') || 1);
  const showReplay = bool(config?.showReplay, true);
  const DUR = 2.4;

  const uid = React.useMemo(() => 'sp' + Math.random().toString(36).slice(2, 9), []);
  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const rootRef = React.useRef(null);
  const animRef = React.useRef(null);
  const playedRef = React.useRef(false);
  const playRef = React.useRef(null);
  const [t, setT] = React.useState(reduced || triggerMode === 'manual' ? 1 : 0);
  const [w, setW] = React.useState(1280);

  React.useEffect(() => {
    const fam = { Inter: 'Inter:wght@300;400;500', Archivo: 'Archivo:wght@300;400;500' }[fontFamily];
    if (!fam || typeof document === 'undefined') return;
    const id = 'gf-' + fontFamily.toLowerCase();
    if (document.getElementById(id)) return;
    const l = document.createElement('link');
    l.id = id; l.rel = 'stylesheet';
    l.href = `https://fonts.googleapis.com/css2?family=${fam}&display=swap`;
    document.head.appendChild(l);
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
  const eExpo = (x) => (x >= 1 ? 1 : x <= 0 ? 0 : 1 - Math.pow(2, -10 * x));
  const eOut = (x) => 1 - Math.pow(1 - x, 3);

  const W = Math.max(320, w);
  const compact = W < 760;
  const m = compact ? 20 : 48;
  const cols = compact ? 4 : 12;
  const colW = (W - 2 * m) / cols;
  const colX = (i) => m + i * colW;
  const rowsN = compact ? 12 : 8;
  const rowH = (H - 2 * m) / rowsN;

  const caseFn = (s) => (letterCase === 'uppercase' ? s.toUpperCase() : letterCase === 'lowercase' ? s.toLowerCase() : s);
  const words = caseFn(headlineRaw).trim().split(/\s+/);
  const lines = [words[0] || '', words.slice(1).join(' ')].filter(Boolean);

  const r = compact ? W * 0.34 : Math.min(H * 0.34, W * 0.23);
  const cx = compact ? W * 0.66 : W - m - colW * 2.2;
  const cy = compact ? H * 0.22 : H * 0.41;
  const rq = r * 0.72;
  // keep the headline clear of the shapes: approximate advance per glyph after tight tracking
  const glyph = letterCase === 'uppercase' ? 0.64 : 0.54;
  const indent2 = compact ? colW : colW * 2;
  const roomFor = (li) => (compact ? W - m - colX(0) : cx - r - 28 - colX(0)) - (li ? indent2 : 0);
  const fitFs = lines.length ? Math.min(...lines.map((l, li) => roomFor(li) / Math.max(1, l.length * glyph))) : 200;
  const fs = Math.max(32, Math.min((compact ? W * 0.25 : Math.min(H * 0.27, W * 0.16)) * headlineScale, fitFs));
  const line1Top = compact ? H * 0.44 : m + 40;
  const lineLeft = [colX(0) - fs * 0.04, compact ? colX(1) : colX(2)];
  const lineTop = [line1Top, line1Top + fs * 0.9];

  const barY = compact ? H * 0.715 : H * 0.73;
  const bh = Math.max(10, Math.round(H * (compact ? 0.016 : 0.02)));
  const blackEnd = compact ? W - m : colX(8);
  const accentStart = compact ? colX(2) : colX(7);

  const gp = seg(0, 0.16);
  const gridOp = gp <= 0 ? 0 : gp >= 1 ? 1 : [0.6, 0, 1, 0.2, 1, 0.45, 1][Math.min(6, Math.floor(gp * 7))];
  const cIn = eExpo(seg(0.06, 0.42));
  const qIn = eExpo(seg(0.2, 0.54));
  const barIn = eExpo(seg(0.3, 0.52));
  const accIn = eExpo(seg(0.4, 0.6));
  const ruleIn = eExpo(seg(0.12, 0.36));
  const textIn = eOut(seg(0.55, 0.75));
  const regIn = eOut(seg(0.82, 0.98));

  const letterCount = lines.reduce((n, l) => n + l.length, 0) || 1;
  let letterIdx = 0;

  const sans = fontFamily === 'system-ui' ? 'system-ui, -apple-system, sans-serif' : `"${fontFamily}", "Helvetica Neue", Helvetica, Arial, sans-serif`;

  const circleTf = `translate(${(1 - cIn) * W * 0.22 + cx} ${cy}) scale(${0.6 + 0.4 * cIn}) translate(${-cx} ${-cy})`;
  const quarterTf = `translate(${cx} ${cy}) rotate(${(1 - qIn) * -180}) scale(${0.35 + 0.65 * qIn}) translate(${-cx} ${-cy})`;
  const quarterPath = `M ${cx} ${cy} L ${cx - rq} ${cy} A ${rq} ${rq} 0 0 0 ${cx} ${cy + rq} Z`;

  const renderShapes = () => {
    if (variant === 'rings') {
      return (
        <g>
          {[0, 1, 2, 3, 4, 5].map((k) => {
            const p = eExpo(seg(0.06 + k * 0.035, 0.36 + k * 0.035));
            const rr = r * (1 - k * 0.15) - r * 0.025;
            return <circle key={k} cx={cx} cy={cy} r={Math.max(1, rr * (0.5 + 0.5 * p))} fill="none" stroke={ink} strokeWidth={r * 0.05} opacity={p > 0 ? 1 : 0} />;
          })}
          <g transform={quarterTf} opacity={qIn > 0 ? 1 : 0}><path d={quarterPath} fill={accent} /></g>
        </g>
      );
    }
    if (variant === 'halves') {
      const off = r * 0.14;
      return (
        <g>
          <path d={`M ${cx} ${cy - r} A ${r} ${r} 0 0 0 ${cx} ${cy + r} Z`} fill={ink}
            transform={`translate(0 ${-off * cIn + (1 - cIn) * -H * 0.6})`} />
          <path d={`M ${cx + 6} ${cy - r} A ${r} ${r} 0 0 1 ${cx + 6} ${cy + r} Z`} fill={accent}
            transform={`translate(0 ${off * qIn + (1 - qIn) * H * 0.7})`} />
        </g>
      );
    }
    return (
      <g>
        <g transform={circleTf} opacity={cIn > 0 ? 1 : 0}><circle cx={cx} cy={cy} r={r} fill={ink} /></g>
        <g transform={quarterTf} opacity={qIn > 0 ? 1 : 0}><path d={quarterPath} fill={accent} /></g>
      </g>
    );
  };

  const regMark = (x, y, k) => (
    <g key={k} transform={`translate(${x} ${y}) scale(${0.4 + 0.6 * regIn}) rotate(${(1 - regIn) * 90})`} opacity={regIn}>
      <circle r={5} fill="none" stroke={ink} strokeWidth={0.75} />
      <line x1={-10} y1={0} x2={10} y2={0} stroke={ink} strokeWidth={0.75} />
      <line x1={0} y1={-10} x2={0} y2={10} stroke={ink} strokeWidth={0.75} />
    </g>
  );

  const metaTop = barY + bh + (compact ? 30 : 46);
  const metaPos = compact
    ? [[colX(0), metaTop, colW * 2 - 12], [colX(2), metaTop, colW * 2], [colX(0), metaTop + 64, colW * 2 - 12]]
    : [[colX(0), metaTop, colW * 3 - 20], [colX(3), metaTop, colW * 3 - 20], [colX(6), metaTop, colW * 3 - 20]];
  const subPos = compact ? [colX(2), metaTop + 64, colW * 2] : [colX(9), metaTop, colW * 3];
  const smallFs = compact ? 12.5 : 14;

  return (
    <section ref={rootRef} className="swiss-poster" aria-label={`${headlineRaw}. ${subline1} ${subline2}`}
      style={{ position: 'relative', width: '100%', height: `${H}px`, overflow: 'hidden', backgroundColor: bg, color: ink, fontFamily: sans }}>
      <style>{`.${uid}-rp{opacity:.55;transition:opacity .2s}.${uid}-rp:hover{opacity:1}.${uid}-rp:focus-visible{opacity:1;outline:2px solid ${accent};outline-offset:3px}`}</style>
      <svg aria-hidden="true" width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: 'absolute', inset: 0, display: 'block' }}>
        {showGrid && (
          <g opacity={gridOp} stroke={gridColor} strokeWidth={1} shapeRendering="crispEdges">
            {Array.from({ length: cols + 1 }, (_, i) => <line key={'v' + i} x1={colX(i)} y1={0} x2={colX(i)} y2={H} />)}
            {Array.from({ length: rowsN + 1 }, (_, i) => <line key={'h' + i} x1={0} y1={m + i * rowH} x2={W} y2={m + i * rowH} />)}
          </g>
        )}
        {renderShapes()}
        <rect x={colX(0)} y={barY} width={Math.max(0, (blackEnd - colX(0)) * barIn)} height={bh} fill={ink} />
        <rect x={W - m - (W - m - accentStart) * accIn} y={barY + bh + 7} width={(W - m - accentStart) * accIn} height={Math.max(4, bh * 0.45)} fill={accent} />
        <rect x={colX(0)} y={m + 24} width={(W - 2 * m) * ruleIn} height={1} fill={ink} />
        {showRegMarks && [regMark(m / 2, m / 2, 0), regMark(W - m / 2, m / 2, 1), regMark(m / 2, H - m / 2, 2), regMark(W - m / 2, H - m / 2, 3)]}
      </svg>

      <div style={{ position: 'absolute', left: colX(0), top: m + 4, right: m, display: 'flex', justifyContent: 'space-between', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500, opacity: textIn, transform: `translateY(${(1 - textIn) * 6}px)` }}>
        <span>{eyebrow}</span>
        {!compact && <span style={{ color: muted }}>{subline2}</span>}
      </div>

      {lines.map((line, li) => (
        <div key={li} aria-hidden="true" style={{ position: 'absolute', left: lineLeft[li], top: lineTop[li], height: fs * 1.06, overflow: 'hidden', fontSize: fs, lineHeight: 1, fontWeight: headlineWeight, letterSpacing: '-0.055em', whiteSpace: 'pre', paddingRight: fs * 0.08 }}>
          {Array.from(line).map((ch, k) => {
            const i = letterIdx++;
            const st = 0.3 + (i / letterCount) * 0.36;
            const p = eExpo(seg(st, st + 0.2));
            return <span key={k} style={{ display: 'inline-block', transform: `translateY(${(1 - p) * -108}%)` }}>{ch}</span>;
          })}
        </div>
      ))}

      {metas.map(([lab, val], k) => {
        const p = seg(0.58 + k * 0.08, 0.8 + k * 0.08);
        const n = Math.round(val.length * p);
        const [x, y, wd] = metaPos[k];
        return (
          <div key={k} style={{ position: 'absolute', left: x, top: y, width: wd }}>
            <div style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: muted, opacity: p > 0 ? 1 : 0 }}>{lab}</div>
            <div style={{ fontSize: smallFs, lineHeight: 1.35, marginTop: 7, fontWeight: 500, minHeight: '1.35em' }}>
              {val.slice(0, n)}
              {p > 0 && p < 1 && <span style={{ display: 'inline-block', width: '0.45em', height: '0.95em', background: accent, verticalAlign: '-0.12em', marginLeft: 2 }} />}
            </div>
          </div>
        );
      })}

      <div style={{ position: 'absolute', left: subPos[0], top: subPos[1], width: subPos[2], opacity: textIn, transform: `translateY(${(1 - textIn) * 8}px)` }}>
        <div style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: muted }}>{compact ? subline2 : ' '}</div>
        <div style={{ fontSize: smallFs, lineHeight: 1.35, marginTop: 7, fontWeight: 400 }}>{subline1}</div>
      </div>

      {showReplay && (
        <button type="button" className={`${uid}-rp`} aria-label="Replay animation"
          onClick={() => { playedRef.current = true; playRef.current(); }}
          style={{ position: 'absolute', right: m + 22, bottom: m - 2, appearance: 'none', border: `1px solid ${ink}`, background: 'transparent', color: ink, borderRadius: 999, padding: '5px 11px', fontFamily: sans, fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer', visibility: t >= 1 ? 'visible' : 'hidden' }}>
          ↻ Replay
        </button>
      )}
    </section>
  );
}

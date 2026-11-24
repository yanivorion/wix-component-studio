const MANIFEST = {
  "type": "Scrub.KerningCollapse",
  "description": "Scroll-scrubbed typesetting: the letters of one giant word start scattered across a precise column grid at different sizes, each tagged with mono coordinates, then fly along curved paths into a line while tracking collapses from wide to tight and sizes equalise, until the word locks into a headline over a drawn hairline baseline",
  "editorElement": {
    "selector": ".kerning-collapse",
    "displayName": "Kerning Collapse",
    "archetype": "container",
    "data": {
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Typesetting / Study 01", "group": "Content" },
      "indexLabel": { "dataType": "text", "displayName": "Index Label", "defaultValue": "01 / 04", "group": "Content" },
      "word": { "dataType": "text", "displayName": "Word", "defaultValue": "Converge", "group": "Content", "description": "One word, up to 12 letters" },
      "subline": { "dataType": "text", "displayName": "Subline", "defaultValue": "Eight letters, one measure. Every glyph finds its place on the line.", "group": "Content" },
      "footnote": { "dataType": "text", "displayName": "Footnote", "defaultValue": "Set in Inter Tight, tracked to −40", "group": "Content" },
      "letterCase": { "dataType": "select", "displayName": "Letter Case", "defaultValue": "uppercase", "options": ["uppercase", "as typed"], "group": "Content" },
      "columns": { "dataType": "select", "displayName": "Grid Columns (density)", "defaultValue": "12", "options": ["8", "12", "16"], "group": "Layout" },
      "scatter": { "dataType": "select", "displayName": "Size Variation", "defaultValue": "medium", "options": ["calm", "medium", "wild"], "group": "Layout" },
      "curvature": { "dataType": "select", "displayName": "Path Curvature", "defaultValue": "medium", "options": ["straight", "medium", "sweeping"], "group": "Animation" },
      "accentIndex": { "dataType": "select", "displayName": "Accent Letter", "defaultValue": "4", "options": ["none", "1", "2", "3", "4", "5", "6", "7", "8", "last"], "group": "Colors" },
      "showGrid": { "dataType": "booleanValue", "displayName": "Show Grid", "defaultValue": "true", "group": "Layout" },
      "showLabels": { "dataType": "booleanValue", "displayName": "Coordinate Labels", "defaultValue": "true", "group": "Layout" },
      "showReadout": { "dataType": "booleanValue", "displayName": "Tracking Readout", "defaultValue": "true", "group": "Layout" },
      "showBaseline": { "dataType": "booleanValue", "displayName": "Baseline Rule", "defaultValue": "true", "group": "Layout" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#F3F2EF", "group": "Colors" },
      "inkColor": { "dataType": "color", "displayName": "Ink", "defaultValue": "#0B0B0C", "group": "Colors" },
      "gridColor": { "dataType": "color", "displayName": "Grid Lines", "defaultValue": "#D9D6D0", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#8A857D", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent", "defaultValue": "#D9480F", "group": "Colors" },
      "fontFamily": { "dataType": "select", "displayName": "Display Font", "defaultValue": "Inter Tight", "options": ["Inter Tight", "Geist", "Manrope", "Hanken Grotesk", "Archivo"], "group": "Typography" },
      "monoFamily": { "dataType": "select", "displayName": "Mono Font", "defaultValue": "Geist Mono", "options": ["Geist Mono", "JetBrains Mono", "IBM Plex Mono"], "group": "Typography" },
      "fontWeight": { "dataType": "select", "displayName": "Weight", "defaultValue": "500", "options": ["300", "400", "500"], "group": "Typography" },
      "startTracking": { "dataType": "select", "displayName": "Start Tracking (em)", "defaultValue": "0.6", "options": ["0.3", "0.6", "0.9"], "group": "Typography" },
      "finalTracking": { "dataType": "select", "displayName": "Final Tracking (em)", "defaultValue": "-0.04", "options": ["-0.06", "-0.04", "-0.02", "0"], "group": "Typography" },
      "maxSize": { "dataType": "select", "displayName": "Max Headline Size (px)", "defaultValue": "240", "options": ["160", "200", "240", "300"], "group": "Typography" },
      "scrollLength": { "dataType": "select", "displayName": "Scroll Length (screens)", "defaultValue": "4", "options": ["3", "4", "5", "6"], "group": "Animation" },
      "smoothing": { "dataType": "select", "displayName": "Scrub Smoothing", "defaultValue": "0.12", "options": ["0.08", "0.12", "0.2", "1"], "group": "Animation", "description": "1 = locked to the scrollbar, lower = more glide" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const eyebrow = config?.eyebrow || 'Typesetting / Study 01';
  const indexLabel = config?.indexLabel || '01 / 04';
  const rawWord = String(config?.word || 'Converge').replace(/\s+/g, '').slice(0, 12) || 'Converge';
  const letterCase = config?.letterCase || 'uppercase';
  const word = letterCase === 'uppercase' ? rawWord.toUpperCase() : rawWord;
  const subline = config?.subline || 'Eight letters, one measure. Every glyph finds its place on the line.';
  const footnote = config?.footnote || 'Set in Inter Tight, tracked to −40';
  const colsBase = parseInt(config?.columns || '12', 10) || 12;
  const scatterK = { calm: 0.6, medium: 1, wild: 1.35 }[config?.scatter || 'medium'] || 1;
  const curveK = { straight: 0.04, medium: 0.32, sweeping: 0.6 }[config?.curvature || 'medium'] ?? 0.32;
  const accentRaw = config?.accentIndex || '4';
  const showGrid = bool(config?.showGrid, true);
  const showLabels = bool(config?.showLabels, true);
  const showReadout = bool(config?.showReadout, true);
  const showBaseline = bool(config?.showBaseline, true);
  const bg = config?.backgroundColor || '#F3F2EF';
  const ink = config?.inkColor || '#0B0B0C';
  const gridColor = config?.gridColor || '#D9D6D0';
  const muted = config?.mutedColor || '#8A857D';
  const accent = config?.accentColor || '#D9480F';
  const fontFamily = config?.fontFamily || 'Inter Tight';
  const monoFamily = config?.monoFamily || 'Geist Mono';
  const weight = parseInt(config?.fontWeight || '500', 10) || 500;
  const t0 = parseFloat(config?.startTracking || '0.6');
  const t1 = parseFloat(config?.finalTracking ?? '-0.04');
  const tStart = isNaN(t0) ? 0.6 : t0;
  const tEnd = isNaN(t1) ? -0.04 : t1;
  const maxSize = parseInt(config?.maxSize || '240', 10) || 240;
  const screens = parseFloat(config?.scrollLength || '4') || 4;
  const smoothing = Math.min(1, Math.max(0.02, parseFloat(config?.smoothing || '0.12')));

  const letters = React.useMemo(() => Array.from(word), [word]);
  const n = letters.length;
  const accentIdx = accentRaw === 'none' ? -1 : accentRaw === 'last' ? n - 1 : Math.min(n - 1, (parseInt(accentRaw, 10) || 1) - 1);

  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const uid = React.useMemo(() => 'kc' + Math.random().toString(36).slice(2, 8), []);

  const displayStack = `"${fontFamily}", "Inter", -apple-system, "Helvetica Neue", Arial, sans-serif`;
  const monoStack = `"${monoFamily}", ui-monospace, "SF Mono", Menlo, monospace`;

  React.useEffect(() => {
    const fam = {
      'Inter Tight': 'Inter+Tight:wght@300;400;500',
      'Geist': 'Geist:wght@300;400;500',
      'Manrope': 'Manrope:wght@300;400;500',
      'Hanken Grotesk': 'Hanken+Grotesk:wght@300;400;500',
      'Archivo': 'Archivo:wght@300;400;500',
      'Geist Mono': 'Geist+Mono:wght@400;500',
      'JetBrains Mono': 'JetBrains+Mono:wght@400;500',
      'IBM Plex Mono': 'IBM+Plex+Mono:wght@400;500'
    };
    [fam[fontFamily], fam[monoFamily]].filter(Boolean).forEach((f) => {
      const id = 'gf-' + f.replace(/[^a-z0-9]/gi, '').slice(0, 48);
      if (document.getElementById(id)) return;
      const l = document.createElement('link');
      l.id = id; l.rel = 'stylesheet';
      l.href = `https://fonts.googleapis.com/css2?family=${f}&display=swap`;
      document.head.appendChild(l);
    });
  }, [fontFamily, monoFamily]);

  const [fontTick, setFontTick] = React.useState(0);
  React.useEffect(() => {
    let alive = true;
    if (typeof document === 'undefined' || !document.fonts) return undefined;
    document.fonts.load(`${weight} 100px "${fontFamily}"`, word).then(() => { if (alive) setFontTick((t) => t + 1); }).catch(() => {});
    const t = setTimeout(() => { if (alive) setFontTick((x) => x + 1); }, 1400);
    return () => { alive = false; clearTimeout(t); };
  }, [fontFamily, weight, word]);

  const metrics = React.useMemo(() => {
    const fallback = { adv: letters.map((c) => (/[MW]/.test(c) ? 0.82 : /[IJ1]/.test(c) ? 0.28 : 0.64)), base: 0.86, cap: 0.72 };
    if (typeof document === 'undefined') return fallback;
    try {
      const ctx = document.createElement('canvas').getContext('2d');
      ctx.font = `${weight} 100px ${displayStack}`;
      const adv = letters.map((c) => ctx.measureText(c).width / 100);
      const h = ctx.measureText('H');
      const fa = (h.fontBoundingBoxAscent || 96) / 100;
      const fd = (h.fontBoundingBoxDescent || 24) / 100;
      const base = (1 - (fa + fd)) / 2 + fa;
      const cap = (h.actualBoundingBoxAscent || 72) / 100;
      return { adv, base, cap };
    } catch (e) { return fallback; }
  }, [letters, weight, displayStack, fontTick]); // eslint-disable-line react-hooks/exhaustive-deps

  const sectionRef = React.useRef(null);
  const target = React.useRef(0);
  const current = React.useRef(0);
  const [progress, setProgress] = React.useState(reduced ? 1 : 0);
  const [stageH, setStageH] = React.useState(800);
  const [width, setWidth] = React.useState(1280);
  const [mounted, setMounted] = React.useState(reduced);

  React.useEffect(() => {
    if (reduced) return undefined;
    const t = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(t);
  }, [reduced]);

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
    const onScroll = () => { read(); if (!raf && !reduced) raf = requestAnimationFrame(tick); };
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
  }, [smoothing, reduced]);

  const p = reduced ? 1 : progress;
  const clamp = (v) => Math.min(1, Math.max(0, v));
  const seg = (a, b) => clamp((p - a) / (b - a));
  const ease = (t) => 1 - Math.pow(1 - t, 3);
  const easeIO = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const lerp = (a, b, t) => a + (b - a) * t;
  const pad2 = (v) => String(v).padStart(2, '0');

  const W = Math.max(320, width);
  const H = Math.max(420, stageH);
  const compact = W < 760;
  const margin = compact ? 20 : 48;
  const C = compact ? Math.max(4, Math.round(colsBase / 2)) : colsBase;
  const gx = margin;
  const gw = W - margin * 2;
  const cw = gw / C;
  const gTop = compact ? 76 : 92;
  const gBottom = compact ? 120 : 104;
  const R = Math.max(4, Math.floor((H - gTop - gBottom) / cw));
  const gy = gTop + ((H - gTop - gBottom) - R * cw) / 2;
  const gh = R * cw;

  const { adv, base, cap } = metrics;
  const sumAdv = adv.reduce((a, b) => a + b, 0);
  const F = Math.max(48, Math.min(maxSize * (compact ? 0.62 : 1), (W * 0.86) / Math.max(0.5, sumAdv + (n - 1) * tEnd), H * 0.34));
  const kMid = Math.min(1, (W * 0.9) / Math.max(0.5, F * (sumAdv + (n - 1) * tStart)));
  const lineCapCenter = H * (compact ? 0.44 : 0.46);
  const baselineY = lineCapCenter + (cap * F) / 2;
  const lineX = (k, t) => {
    const total = k * F * (sumAdv + (n - 1) * t);
    let acc = W / 2 - total / 2;
    return adv.map((a) => { const x = acc; acc += k * F * (a + t); return x; });
  };
  const midX = lineX(kMid, tStart);
  const endX = lineX(1, tEnd);

  const sizePattern = [1.7, 0.85, 1.25, 2.3, 0.95, 1.5, 0.75, 1.95, 1.1, 1.4, 0.9, 1.8];
  const rowPattern = [0.12, 0.74, 0.36, 0.02, 0.86, 0.5, 0.18, 0.62, 0.92, 0.28, 0.8, 0.44];
  const labelSpace = showLabels ? (compact ? 20 : 34) : 10;
  const inset = Math.max(5, cw * 0.1);
  const hash = (a, b, c) => { const x = Math.sin(a * 127.1 + b * 311.7 + c * 74.7) * 43758.5453; return x - Math.floor(x); };
  const boxes = [];
  const scattered = letters.map((ch, i) => {
    const spanCells = Math.max(0.6, Math.min(R * 0.6, lerp(1.25, sizePattern[i % sizePattern.length], scatterK)));
    let k = (spanCells * cw * 0.8) / (cap * F);
    const gw0 = adv[i] * F;
    k = Math.min(k, (gw - inset * 2) / Math.max(0.01, gw0), (gh - labelSpace - inset) / (cap * F));
    const bw = inset + gw0 * k + (showLabels && !compact ? 10 : 4);
    const bh = labelSpace + cap * F * k + inset;
    const ideal = ((i + 0.5) / n) * C - 0.5;
    const rowIdeal = rowPattern[i % rowPattern.length];
    let best = null;
    for (let c = 0; c < C; c++) {
      for (let r = 0; r < R; r++) {
        const x0 = gx + c * cw;
        const y0 = gy + r * cw;
        if (x0 + bw > gx + gw + 1 || y0 + bh > gy + gh + 1) continue;
        const hit = boxes.some((b) => x0 < b.x1 + 6 && x0 + bw + 6 > b.x0 && y0 < b.y1 + 6 && y0 + bh + 6 > b.y0);
        if (hit) continue;
        const usableR = Math.max(1, R - bh / cw);
        const score = Math.abs(c - ideal) * (compact ? 0.5 : 1.4) + Math.abs(r / usableR - rowIdeal) * 3 + hash(i, c, r) * 0.9;
        if (!best || score < best.score) best = { c, r, score };
      }
    }
    if (!best) best = { c: Math.min(C - 1, Math.max(0, Math.round(ideal))), r: 0 };
    const cellX = gx + best.c * cw;
    const cellY = gy + best.r * cw;
    boxes.push({ x0: cellX, y0: cellY, x1: cellX + bw, y1: cellY + bh });
    return { col: best.c, row: best.r, k, cellX, cellY, x: cellX + inset, y: cellY + labelSpace + cap * F * k, span: spanCells };
  });

  const order = letters.map((_, i) => i).sort((a, b) => {
    const da = Math.hypot(scattered[a].x - midX[a], scattered[a].y - baselineY);
    const db = Math.hypot(scattered[b].x - midX[b], scattered[b].y - baselineY);
    return db - da;
  });
  const rank = []; order.forEach((idx, r) => { rank[idx] = r; });

  const travelStart = 0.07;
  const travelEnd = 0.6;
  const stagger = n > 1 ? Math.min(0.045, 0.22 / (n - 1)) : 0;
  const dur = travelEnd - travelStart - stagger * (n - 1);
  const collapse = easeIO(seg(0.56, 0.84));
  const trackNow = lerp(tStart, tEnd, collapse);
  const lockIn = ease(seg(0.82, 0.93));
  const subIn = ease(seg(0.87, 0.98));
  const gridFade = 1 - 0.78 * easeIO(seg(0.3, 0.78));

  const placed = letters.map((ch, i) => {
    const s = scattered[i];
    const a = travelStart + rank[i] * stagger;
    const u = easeIO(clamp((p - a) / dur));
    const mx = midX[i];
    const my = baselineY;
    const dx = mx - s.x;
    const dy = my - s.y;
    const dist = Math.hypot(dx, dy) || 1;
    const sign = i % 2 ? 1 : -1;
    const cx = (s.x + mx) / 2 + (-dy / dist) * dist * curveK * sign;
    const cy = (s.y + my) / 2 + (dx / dist) * dist * curveK * sign;
    const bx = (1 - u) * (1 - u) * s.x + 2 * (1 - u) * u * cx + u * u * mx;
    const by = (1 - u) * (1 - u) * s.y + 2 * (1 - u) * u * cy + u * u * my;
    const x = lerp(bx, endX[i], collapse);
    const y = by;
    const k = lerp(lerp(s.k, kMid, ease(u)), 1, collapse);
    const rot = Math.sin(Math.PI * u) * (8 + (i * 37) % 9) * sign;
    return { ch, x, y, k, rot, u, s };
  });

  const ks = placed.map((q) => q.k);
  const sizeVar = Math.round(((Math.max(...ks) - Math.min(...ks)) / Math.max(...ks)) * 100);
  const wordLeft = endX[0];
  const wordRight = endX[n - 1] + adv[n - 1] * F;
  const phases = ['Scatter', 'Path', 'Collapse', 'Lock'];
  const phase = p < travelStart + 0.02 ? 0 : p < 0.56 ? 1 : p < 0.84 ? 2 : 3;
  const fmtEm = (v) => `${v >= 0 ? '+' : '−'}${Math.abs(v).toFixed(3)}`;
  const rowName = (r) => String.fromCharCode(65 + (r % 26));

  const labelSize = compact ? 9 : 10.5;
  const microStyle = { fontFamily: monoStack, fontSize: compact ? 10 : 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: muted, fontVariantNumeric: 'tabular-nums' };
  const enter = (i, extra) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'none' : (extra || 'translateY(14px)'),
    transition: reduced ? 'none' : `opacity 700ms cubic-bezier(0.22,1,0.36,1) ${120 + i * 70}ms, transform 900ms cubic-bezier(0.22,1,0.36,1) ${120 + i * 70}ms`
  });

  return (
    <section ref={sectionRef} className={`kerning-collapse ${uid}`} aria-label={`${word}. ${subline}`}
      style={{ position: 'relative', width: '100%', height: `${Math.round(stageH * screens)}px`, background: bg, color: ink }}>
      <div style={{ position: 'sticky', top: 0, height: `${stageH}px`, overflow: 'hidden', background: bg }}>
        {showGrid && (
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, opacity: gridFade }}>
            {Array.from({ length: C + 1 }, (_, c) => (
              <div key={'v' + c} style={{
                position: 'absolute', left: gx + c * cw, top: gy, width: 1, height: gh, background: gridColor,
                transformOrigin: 'top', transform: mounted ? 'scaleY(1)' : 'scaleY(0)',
                transition: reduced ? 'none' : `transform 1000ms cubic-bezier(0.65,0,0.35,1) ${c * 28}ms`
              }} />
            ))}
            {Array.from({ length: R + 1 }, (_, r) => (
              <div key={'h' + r} style={{
                position: 'absolute', left: gx, top: gy + r * cw, width: gw, height: 1, background: gridColor,
                transformOrigin: 'left', transform: mounted ? 'scaleX(1)' : 'scaleX(0)',
                transition: reduced ? 'none' : `transform 1100ms cubic-bezier(0.65,0,0.35,1) ${80 + r * 40}ms`
              }} />
            ))}
            {Array.from({ length: C }, (_, c) => (
              <div key={'cn' + c} style={{ ...microStyle, fontSize: labelSize - 1, position: 'absolute', left: gx + c * cw + 4, top: gy - 16, letterSpacing: '0.06em', ...enter(c * 0.3) }}>{pad2(c + 1)}</div>
            ))}
            {!compact && Array.from({ length: R }, (_, r) => (
              <div key={'rn' + r} style={{ ...microStyle, fontSize: labelSize - 1, position: 'absolute', left: gx - 16, top: gy + r * cw + 4, letterSpacing: 0, ...enter(r * 0.3) }}>{rowName(r)}</div>
            ))}
          </div>
        )}

        {showLabels && placed.map((q, i) => {
          const s = q.s;
          const op = 1 - clamp(q.u * 3.2);
          if (op <= 0.01) return null;
          const isAcc = i === accentIdx;
          return (
            <div key={'lb' + i} aria-hidden="true" style={{ position: 'absolute', left: s.cellX, top: s.cellY, opacity: op, pointerEvents: 'none' }}>
              <div style={enter(i + 2, 'none')}>
                <div style={{ position: 'absolute', left: -4, top: -0.5, width: 9, height: 1, background: isAcc ? accent : ink }} />
                <div style={{ position: 'absolute', left: 0, top: -4.5, width: 1, height: 9, background: isAcc ? accent : ink }} />
                <div style={{ ...microStyle, position: 'absolute', left: 8, top: compact ? 4 : 5, fontSize: labelSize, letterSpacing: '0.06em', whiteSpace: 'nowrap', color: isAcc ? accent : muted, lineHeight: 1.35 }}>
                  <div>{pad2(s.col + 1)}·{rowName(s.row)}</div>
                  {!compact && <div style={{ opacity: 0.75 }}>{Math.round(s.k * F)}px</div>}
                </div>
              </div>
            </div>
          );
        })}

        <h2 style={{ position: 'absolute', inset: 0, margin: 0, fontWeight: weight, pointerEvents: 'none' }}>
          <span style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>{word}</span>
          {placed.map((q, i) => (
            <span key={i} aria-hidden="true" style={{
              position: 'absolute', left: 0, top: 0, fontFamily: displayStack, fontSize: F, fontWeight: weight, lineHeight: 1,
              whiteSpace: 'pre', fontKerning: 'none', color: i === accentIdx ? accent : ink,
              transformOrigin: `0px ${base * F}px`, willChange: 'transform',
              transform: `translate3d(${q.x.toFixed(2)}px, ${(q.y - base * F).toFixed(2)}px, 0) rotate(${q.rot.toFixed(2)}deg) scale(${q.k.toFixed(4)})`
            }}>
              <span style={{ display: 'inline-block', ...enter(i, 'translateY(0.25em)') }}>{q.ch}</span>
            </span>
          ))}
        </h2>

        {showBaseline && (
          <div aria-hidden="true" style={{ position: 'absolute', left: wordLeft, top: baselineY + Math.max(10, F * 0.07), width: Math.max(10, wordRight - wordLeft), height: 0 }}>
            <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 1, background: ink, transformOrigin: 'left', transform: `scaleX(${lockIn})` }} />
            <div style={{ position: 'absolute', left: 0, top: -4, width: 1, height: 9, background: ink, opacity: lockIn }} />
            <div style={{ position: 'absolute', right: 0, top: -4, width: 1, height: 9, background: accentIdx >= 0 ? accent : ink, opacity: lockIn > 0.98 ? 1 : 0, transition: 'opacity 300ms' }} />
            <div style={{ ...microStyle, fontSize: labelSize, position: 'absolute', left: 0, top: 10, opacity: lockIn, whiteSpace: 'nowrap' }}>Baseline</div>
            <div style={{ ...microStyle, fontSize: labelSize, position: 'absolute', right: 0, top: 10, opacity: lockIn, whiteSpace: 'nowrap' }}>{fmtEm(tEnd)} em</div>
          </div>
        )}

        <div style={{
          position: 'absolute', left: '50%', top: baselineY + Math.max(10, F * 0.07) + (compact ? 52 : 64), width: compact ? W - 48 : 520,
          transform: 'translateX(-50%)', textAlign: 'center', zIndex: 3, overflow: 'hidden'
        }}>
          <p style={{
            margin: 0, fontFamily: displayStack, fontWeight: 400, fontSize: compact ? 16 : 20, lineHeight: 1.4, letterSpacing: '-0.015em', color: ink, textWrap: 'balance',
            transform: `translateY(${(1 - subIn) * 110}%)`, opacity: subIn
          }}>{subline}</p>
          <div style={{ ...microStyle, marginTop: 14, opacity: subIn }}>{footnote}</div>
        </div>

        <div style={{ ...microStyle, position: 'absolute', top: compact ? 22 : 36, left: margin, color: ink, ...enter(0) }}>{eyebrow}</div>
        <div style={{ ...microStyle, position: 'absolute', top: compact ? 22 : 36, right: margin, textAlign: 'right', ...enter(1) }}>
          <span style={{ color: ink }}>{indexLabel}</span>
          {!compact && <span style={{ marginLeft: 18 }}>Grid {pad2(C)} × {pad2(R)}</span>}
        </div>

        {showReadout && (
          <div aria-hidden="true" style={{ position: 'absolute', left: margin, right: margin, bottom: compact ? 22 : 34, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16, ...enter(3) }}>
            <div style={{ display: 'flex', gap: compact ? 10 : 22 }}>
              {phases.map((ph, k) => (
                <span key={k} style={{ ...microStyle, color: k === phase ? ink : muted, opacity: k === phase ? 1 : 0.55, transition: 'color 300ms, opacity 300ms' }}>
                  <span style={{ color: k === phase && accentIdx >= 0 ? accent : 'inherit' }}>{pad2(k + 1)}</span>{compact ? '' : ' ' + ph}
                </span>
              ))}
            </div>
            <div style={{ ...microStyle, textAlign: 'right', lineHeight: 1.6 }}>
              <div>Tracking <span style={{ color: ink }}>{fmtEm(trackNow)}</span> em</div>
              {!compact && <div>Size Δ <span style={{ color: ink }}>{pad2(sizeVar)}%</span></div>}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

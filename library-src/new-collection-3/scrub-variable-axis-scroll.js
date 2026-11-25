const MANIFEST = {
  "type": "Scrub.VariableAxisScroll",
  "description": "Scroll-scrubbed variable-font accordion: a stack of huge words whose width and weight axes breathe in turn, each line swelling from condensed to fully extended while its neighbours compress, with a live mono readout of every axis value, until all lines settle at one shared width as a justified block",
  "editorElement": {
    "selector": ".variable-axis-scroll",
    "displayName": "Variable Axis Scroll",
    "archetype": "container",
    "data": {
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Axis Study — wdth / wght", "group": "Content" },
      "indexLabel": { "dataType": "text", "displayName": "Index Label", "defaultValue": "02 / 04", "group": "Content" },
      "words": { "dataType": "text", "displayName": "Lines (comma separated, 4–6)", "defaultValue": "Expand, Compress, Breathe, Release, Settle", "group": "Content" },
      "caption": { "dataType": "text", "displayName": "Closing Caption", "defaultValue": "One family, every width. The block holds when every line agrees.", "group": "Content" },
      "footnote": { "dataType": "text", "displayName": "Footnote", "defaultValue": "Specimen — justified at rest", "group": "Content" },
      "letterCase": { "dataType": "select", "displayName": "Letter Case", "defaultValue": "uppercase", "options": ["uppercase", "as typed"], "group": "Content" },
      "fontFamily": { "dataType": "select", "displayName": "Variable Font", "defaultValue": "Roboto Flex", "options": ["Roboto Flex", "Archivo"], "group": "Typography" },
      "monoFamily": { "dataType": "select", "displayName": "Mono Font", "defaultValue": "JetBrains Mono", "options": ["JetBrains Mono", "Geist Mono", "IBM Plex Mono"], "group": "Typography" },
      "compressedWidth": { "dataType": "select", "displayName": "Compressed Width Axis", "defaultValue": "35", "options": ["25", "35", "50", "65"], "group": "Typography" },
      "compressedWeight": { "dataType": "select", "displayName": "Compressed Weight", "defaultValue": "300", "options": ["200", "300", "400"], "group": "Typography" },
      "peakWeight": { "dataType": "select", "displayName": "Peak Weight (mid-motion)", "defaultValue": "640", "options": ["500", "640", "800"], "group": "Typography" },
      "restWeight": { "dataType": "select", "displayName": "Rest Weight", "defaultValue": "400", "options": ["300", "400", "500"], "group": "Typography" },
      "maxSize": { "dataType": "select", "displayName": "Max Line Size (px)", "defaultValue": "200", "options": ["140", "170", "200", "240"], "group": "Typography" },
      "breath": { "dataType": "select", "displayName": "Breath Shape", "defaultValue": "soft", "options": ["soft", "medium", "sharp"], "group": "Animation", "description": "How much neighbouring lines overlap in their swell" },
      "showReadout": { "dataType": "booleanValue", "displayName": "Axis Readout", "defaultValue": "true", "group": "Layout" },
      "showRules": { "dataType": "booleanValue", "displayName": "Hairline Rules", "defaultValue": "true", "group": "Layout" },
      "showIndex": { "dataType": "booleanValue", "displayName": "Line Index", "defaultValue": "true", "group": "Layout" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#0B0B0C", "group": "Colors" },
      "inkColor": { "dataType": "color", "displayName": "Type", "defaultValue": "#EDECE8", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#77746E", "group": "Colors" },
      "ruleColor": { "dataType": "color", "displayName": "Rules", "defaultValue": "#2A2927", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent", "defaultValue": "#D9480F", "group": "Colors" },
      "scrollLength": { "dataType": "select", "displayName": "Scroll Length (screens)", "defaultValue": "5", "options": ["3", "4", "5", "6", "7"], "group": "Animation" },
      "smoothing": { "dataType": "select", "displayName": "Scrub Smoothing", "defaultValue": "0.12", "options": ["0.08", "0.12", "0.2", "1"], "group": "Animation", "description": "1 = locked to the scrollbar, lower = more glide" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const eyebrow = config?.eyebrow || 'Axis Study — wdth / wght';
  const indexLabel = config?.indexLabel || '02 / 04';
  const letterCase = config?.letterCase || 'uppercase';
  const caption = config?.caption || 'One family, every width. The block holds when every line agrees.';
  const footnote = config?.footnote || 'Specimen — justified at rest';
  const fontFamily = config?.fontFamily === 'Archivo' ? 'Archivo' : 'Roboto Flex';
  const monoFamily = config?.monoFamily || 'JetBrains Mono';
  const isFlex = fontFamily === 'Roboto Flex';
  const AX = isFlex ? { w0: 25, w1: 151, g0: 100, g1: 1000 } : { w0: 62, w1: 125, g0: 100, g1: 900 };
  const cW = Math.max(AX.w0, Math.min(AX.w1, parseFloat(config?.compressedWidth || '35') || 35));
  const cG = parseInt(config?.compressedWeight || '300', 10) || 300;
  const pG = parseInt(config?.peakWeight || '640', 10) || 640;
  const rG = parseInt(config?.restWeight || '400', 10) || 400;
  const maxSize = parseInt(config?.maxSize || '200', 10) || 200;
  const sigmaK = { soft: 0.62, medium: 0.48, sharp: 0.34 }[config?.breath || 'soft'] || 0.62;
  const showReadout = bool(config?.showReadout, true);
  const showRules = bool(config?.showRules, true);
  const showIndex = bool(config?.showIndex, true);
  const bg = config?.backgroundColor || '#0B0B0C';
  const ink = config?.inkColor || '#EDECE8';
  const muted = config?.mutedColor || '#77746E';
  const rule = config?.ruleColor || '#2A2927';
  const accent = config?.accentColor || '#D9480F';
  const screens = parseFloat(config?.scrollLength || '5') || 5;
  const smoothing = Math.min(1, Math.max(0.02, parseFloat(config?.smoothing || '0.12')));

  const words = React.useMemo(() => {
    const list = String(config?.words || 'Expand, Compress, Breathe, Release, Settle').split(',').map((w) => w.trim()).filter(Boolean).slice(0, 6);
    const base = list.length ? list : ['Expand', 'Compress', 'Breathe', 'Settle'];
    return base.map((w) => (letterCase === 'uppercase' ? w.toUpperCase() : w));
  }, [config?.words, letterCase]);
  const n = words.length;

  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const uid = React.useMemo(() => 'va' + Math.random().toString(36).slice(2, 8), []);
  const displayStack = `"${fontFamily}", "Inter", -apple-system, "Helvetica Neue", Arial, sans-serif`;
  const monoStack = `"${monoFamily}", ui-monospace, "SF Mono", Menlo, monospace`;

  React.useEffect(() => {
    const fam = {
      'Roboto Flex': 'Roboto+Flex:opsz,wdth,wght@8..144,25..151,100..1000',
      'Archivo': 'Archivo:wdth,wght@62..125,100..900',
      'JetBrains Mono': 'JetBrains+Mono:wght@400;500',
      'Geist Mono': 'Geist+Mono:wght@400;500',
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
    document.fonts.load(`400 100px "${fontFamily}"`, words.join('')).then(() => { if (alive) setFontTick((t) => t + 1); }).catch(() => {});
    const t1 = setTimeout(() => { if (alive) setFontTick((x) => x + 1); }, 900);
    const t2 = setTimeout(() => { if (alive) setFontTick((x) => x + 1); }, 2400);
    return () => { alive = false; clearTimeout(t1); clearTimeout(t2); };
  }, [fontFamily, words]);

  const WS = React.useMemo(() => [AX.w0, AX.w0 + (AX.w1 - AX.w0) * 0.3, AX.w0 + (AX.w1 - AX.w0) * 0.62, AX.w1], [AX.w0, AX.w1]);
  const GS = [300, 700];
  const measureRefs = React.useRef([]);
  const [table, setTable] = React.useState(null);
  React.useLayoutEffect(() => {
    const out = words.map((w, i) => GS.map((g, gi) => WS.map((x, wi) => {
      const el = measureRefs.current[(i * GS.length + gi) * WS.length + wi];
      return el ? el.getBoundingClientRect().width / 100 : 0;
    })));
    if (out.every((r) => r.every((row) => row.every((v) => v > 0)))) setTable(out);
  }, [words, fontTick, fontFamily, WS]); // eslint-disable-line react-hooks/exhaustive-deps

  const widthEm = (i, wd, wg) => {
    const tb = table ? table[i] : null;
    if (!tb) return words[i].length * 0.6 * (0.45 + 0.55 * (wd - AX.w0) / (AX.w1 - AX.w0)) * (0.92 + wg / 3000);
    let k = 0;
    while (k < WS.length - 2 && wd > WS[k + 1]) k++;
    const f = (wd - WS[k]) / (WS[k + 1] - WS[k]);
    const at = (row) => row[k] + (row[k + 1] - row[k]) * f;
    const gt = (wg - GS[0]) / (GS[1] - GS[0]);
    return at(tb[0]) + (at(tb[1]) - at(tb[0])) * gt;
  };
  const solveWdth = (i, targetEm, wg) => {
    let lo = AX.w0; let hi = AX.w1;
    if (widthEm(i, hi, wg) <= targetEm) return hi;
    if (widthEm(i, lo, wg) >= targetEm) return lo;
    for (let it = 0; it < 22; it++) { const mid = (lo + hi) / 2; if (widthEm(i, mid, wg) < targetEm) lo = mid; else hi = mid; }
    return (lo + hi) / 2;
  };

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
  const readoutW = showReadout && !compact ? 232 : 0;
  const gutter = readoutW ? 40 : 0;
  const indexW = showIndex && !compact ? 44 : 0;
  const A = W - margin * 2 - readoutW - gutter - indexW;
  const top = compact ? 64 : 70;
  const bottom = compact ? 96 : 84;
  const rowH = (H - top - bottom) / n;
  const S = Math.max(28, Math.min(maxSize * (compact ? 0.5 : 1), rowH * (compact ? 1.12 : 1.25)));
  const opsz = Math.max(8, Math.min(144, Math.round(S)));

  const minMaxEm = Math.min(...words.map((_, i) => widthEm(i, AX.w1, rG) + 0.1 * Math.max(0, words[i].length - 1)));
  const maxMinEm = Math.max(...words.map((_, i) => widthEm(i, AX.w0, rG)));
  const blockEm = Math.max(maxMinEm, Math.min(A / S, minMaxEm));
  const blockW = blockEm * S;

  const span = 0.74;
  const peakAt = (i) => (n > 1 ? (i / (n - 1)) * span : 0);
  const sigma = (n > 1 ? span / (n - 1) : 0.3) * sigmaK;
  const settle = easeIO(seg(0.76, 0.92));
  const capIn = ease(seg(0.88, 0.99));
  const intro = mounted ? 1 : 0;

  const lines = words.map((w, i) => {
    const d = (p - peakAt(i)) / sigma;
    let e = Math.exp(-d * d);
    if (i === 0 && p < peakAt(0)) e = 1;
    const eE = easeIO(clamp(e));
    const wg = lerp(cG, pG, eE);
    const fullEm = A / S;
    const compEm = widthEm(i, cW, wg);
    const animW = solveWdth(i, lerp(compEm, fullEm, eE), wg);
    const endW = solveWdth(i, blockEm, rG);
    const endNatural = widthEm(i, endW, rG);
    const lsEnd = words[i].length > 1 ? Math.max(0, (blockEm - endNatural) / (words[i].length - 1)) : 0;
    const wd = lerp(animW, endW, settle);
    const wgt = lerp(wg, rG, settle);
    const ls = lsEnd * settle;
    return { w, e: eE * (1 - settle), wd, wgt, ls, px: (widthEm(i, wd, wgt) + ls * Math.max(0, words[i].length - 1)) * S };
  });
  const activeIdx = settle > 0.5 ? -1 : lines.reduce((b, l, i) => (l.e > lines[b].e ? i : b), 0);
  const blockLeft = margin + indexW;

  const microStyle = { fontFamily: monoStack, fontSize: compact ? 10 : 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: muted, fontVariantNumeric: 'tabular-nums' };

  return (
    <section ref={sectionRef} className={`variable-axis-scroll ${uid}`} aria-label={`${words.join(', ')}. ${caption}`}
      style={{ position: 'relative', width: '100%', height: `${Math.round(stageH * screens)}px`, background: bg, color: ink }}>
      <div aria-hidden="true" style={{ position: 'absolute', left: 0, top: 0, visibility: 'hidden', pointerEvents: 'none', height: 0, overflow: 'hidden' }}>
        {words.map((w, i) => GS.map((g, gi) => WS.map((x, wi) => (
          <span key={`${i}-${gi}-${wi}`} ref={(el) => { measureRefs.current[(i * GS.length + gi) * WS.length + wi] = el; }}
            style={{ position: 'absolute', whiteSpace: 'pre', fontFamily: displayStack, fontSize: 100, lineHeight: 1, fontVariationSettings: `'wdth' ${x}, 'wght' ${g}${isFlex ? `, 'opsz' ${opsz}` : ''}`, fontWeight: g, fontStretch: `${x}%` }}>{w}</span>
        ))))}
      </div>

      <div style={{ position: 'sticky', top: 0, height: `${stageH}px`, overflow: 'hidden', background: bg }}>
        <div style={{ ...microStyle, position: 'absolute', top: compact ? 22 : 32, left: margin, color: ink }}>{eyebrow}</div>
        <div style={{ ...microStyle, position: 'absolute', top: compact ? 22 : 32, right: margin }}>
          <span style={{ color: ink }}>{indexLabel}</span>
          {!compact && <span style={{ marginLeft: 18 }}>{fontFamily} · {AX.w0}–{AX.w1}</span>}
        </div>

        <h2 style={{ position: 'absolute', left: 0, right: 0, top, height: rowH * n, margin: 0, fontWeight: 400 }}>
          {lines.map((l, i) => {
            const y = i * rowH;
            const isActive = i === activeIdx;
            return (
              <div key={i} style={{ position: 'absolute', left: 0, right: 0, top: y, height: rowH }}>
                {showRules && (
                  <div aria-hidden="true" style={{ position: 'absolute', left: margin, right: margin, top: 0, height: 1, background: rule, transformOrigin: 'left', transform: `scaleX(${intro})`, transition: reduced ? 'none' : `transform 1100ms cubic-bezier(0.65,0,0.35,1) ${i * 70}ms` }} />
                )}
                {showIndex && !compact && (
                  <div aria-hidden="true" style={{ ...microStyle, position: 'absolute', left: margin, top: 10, color: isActive ? accent : muted, transition: 'color 300ms' }}>{pad2(i + 1)}</div>
                )}
                <div style={{ position: 'absolute', left: blockLeft, top: 0, height: rowH, overflow: 'hidden', width: A + 4, display: 'flex', alignItems: 'center' }}>
                  <span style={{
                    display: 'block', whiteSpace: 'pre', fontFamily: displayStack, fontSize: S, lineHeight: 1,
                    fontVariationSettings: `'wdth' ${l.wd.toFixed(2)}, 'wght' ${Math.round(l.wgt)}${isFlex ? `, 'opsz' ${opsz}` : ''}`,
                    fontWeight: Math.round(l.wgt), letterSpacing: `${l.ls.toFixed(4)}em`, color: ink,
                    transform: `translateY(${intro ? 0 : 105}%)`, marginTop: isFlex ? S * 0.03 : 0,
                    transition: reduced ? 'none' : `transform 1000ms cubic-bezier(0.22,1,0.36,1) ${100 + i * 80}ms`
                  }}>{l.w}</span>
                </div>
                {showReadout && (
                  <div aria-hidden="true" style={compact
                    ? { ...microStyle, fontSize: 9, position: 'absolute', right: margin, top: 6, textAlign: 'right', opacity: intro, transition: 'opacity 600ms' }
                    : { ...microStyle, position: 'absolute', right: margin, width: readoutW, top: 10, opacity: intro, transition: `opacity 800ms ease ${300 + i * 80}ms` }}>
                    <div style={{ display: 'flex', justifyContent: compact ? 'flex-end' : 'space-between', gap: 12 }}>
                      <span>wdth <span style={{ color: isActive ? accent : ink }}>{l.wd.toFixed(1).padStart(5, '0')}</span></span>
                      <span>wght <span style={{ color: isActive ? accent : ink }}>{String(Math.round(l.wgt)).padStart(3, '0')}</span></span>
                    </div>
                    {!compact && (
                      <div style={{ position: 'relative', marginTop: 10, height: 1, background: rule }}>
                        <div style={{ position: 'absolute', left: 0, top: 0, height: 1, width: `${((l.wd - AX.w0) / (AX.w1 - AX.w0)) * 100}%`, background: isActive ? accent : ink }} />
                        <div style={{ position: 'absolute', left: `${((l.wd - AX.w0) / (AX.w1 - AX.w0)) * 100}%`, top: -3, width: 1, height: 7, background: isActive ? accent : ink }} />
                      </div>
                    )}
                    {!compact && rowH > 90 && (
                      <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', opacity: 0.7 }}>
                        <span>{Math.round(l.px)}px</span>
                        <span>{settle > 0.98 ? 'Locked' : settle > 0.02 ? 'Settling' : isActive ? 'Extending' : l.e > 0.1 ? 'Moving' : 'Condensed'}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
          {showRules && (
            <div aria-hidden="true" style={{ position: 'absolute', left: margin, right: margin, top: rowH * n, height: 1, background: rule, transformOrigin: 'left', transform: `scaleX(${intro})`, transition: reduced ? 'none' : `transform 1100ms cubic-bezier(0.65,0,0.35,1) ${n * 70}ms` }} />
          )}
        </h2>

        <div aria-hidden="true" style={{ position: 'absolute', left: blockLeft, top: top - 12, width: blockW, height: 7, opacity: settle }}>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 3, height: 1, background: accent, transformOrigin: 'left', transform: `scaleX(${settle})` }} />
          <div style={{ position: 'absolute', left: 0, top: 0, width: 1, height: 7, background: accent }} />
          <div style={{ position: 'absolute', right: 0, top: 0, width: 1, height: 7, background: accent }} />
        </div>

        <div style={{ position: 'absolute', left: margin, right: margin, bottom: compact ? 20 : 30, display: 'flex', flexDirection: compact ? 'column' : 'row', justifyContent: 'space-between', alignItems: compact ? 'flex-start' : 'flex-end', gap: compact ? 8 : 24 }}>
          <div style={{ overflow: 'hidden', maxWidth: 520 }}>
            <p style={{ margin: 0, fontFamily: displayStack, fontSize: compact ? 14 : 17, lineHeight: 1.4, fontWeight: 400, letterSpacing: '-0.01em', color: ink, transform: `translateY(${(1 - capIn) * 110}%)`, opacity: capIn, fontVariationSettings: isFlex ? "'wdth' 100, 'opsz' 16" : 'normal' }}>{caption}</p>
          </div>
          <div style={{ ...microStyle, display: 'flex', gap: 16, alignItems: 'center' }}>
            <span style={{ opacity: capIn }}>{footnote}</span>
            <span aria-hidden="true" style={{ display: 'inline-block', width: compact ? 60 : 120, height: 1, background: rule, position: 'relative' }}>
              <span style={{ position: 'absolute', inset: 0, background: ink, transformOrigin: 'left', transform: `scaleX(${p})` }} />
            </span>
            <span style={{ color: ink }}>{settle > 0.98 ? 'Block' : pad2(Math.max(0, activeIdx) + 1) + ' / ' + pad2(n)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

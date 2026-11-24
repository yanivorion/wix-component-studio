const MANIFEST = {
  "type": "Reveal.OdometerStats",
  "description": "Statement section with key figures that roll like a mechanical odometer on reveal: each digit is a drum of 0-9 spinning with its own revolutions, stagger and overshoot settle, while units, labels and a fine progress underline follow",
  "editorElement": {
    "selector": ".odometer-stats",
    "displayName": "Odometer Stats",
    "archetype": "container",
    "data": {
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "(By the numbers)", "group": "Content" },
      "sideLabel": { "dataType": "text", "displayName": "Side Label", "defaultValue": "Annual review 2026", "group": "Content" },
      "sentence": { "dataType": "text", "displayName": "Statement", "defaultValue": "Twelve years, four studios and one stubborn idea: that careful work compounds.", "group": "Content" },
      "sentenceMuted": { "dataType": "text", "displayName": "Statement (muted continuation)", "defaultValue": "Here is what it has added up to so far.", "group": "Content" },
      "statCount": { "dataType": "select", "displayName": "Figures", "defaultValue": "4", "options": ["3", "4"], "group": "Figures" },
      "stat1Value": { "dataType": "text", "displayName": "Figure 1 Value", "defaultValue": "1284", "group": "Figures" },
      "stat1Prefix": { "dataType": "text", "displayName": "Figure 1 Prefix", "defaultValue": "", "group": "Figures" },
      "stat1Suffix": { "dataType": "text", "displayName": "Figure 1 Suffix", "defaultValue": "", "group": "Figures" },
      "stat1Label": { "dataType": "text", "displayName": "Figure 1 Label", "defaultValue": "Projects delivered across 31 countries", "group": "Figures" },
      "stat2Value": { "dataType": "text", "displayName": "Figure 2 Value", "defaultValue": "98.6", "group": "Figures" },
      "stat2Prefix": { "dataType": "text", "displayName": "Figure 2 Prefix", "defaultValue": "", "group": "Figures" },
      "stat2Suffix": { "dataType": "text", "displayName": "Figure 2 Suffix", "defaultValue": "%", "group": "Figures" },
      "stat2Label": { "dataType": "text", "displayName": "Figure 2 Label", "defaultValue": "Of clients return for a second project", "group": "Figures" },
      "stat3Value": { "dataType": "text", "displayName": "Figure 3 Value", "defaultValue": "42.5", "group": "Figures" },
      "stat3Prefix": { "dataType": "text", "displayName": "Figure 3 Prefix", "defaultValue": "$", "group": "Figures" },
      "stat3Suffix": { "dataType": "text", "displayName": "Figure 3 Suffix", "defaultValue": "M", "group": "Figures" },
      "stat3Label": { "dataType": "text", "displayName": "Figure 3 Label", "defaultValue": "Raised by the founders we have worked with", "group": "Figures" },
      "stat4Value": { "dataType": "text", "displayName": "Figure 4 Value", "defaultValue": "37", "group": "Figures" },
      "stat4Prefix": { "dataType": "text", "displayName": "Figure 4 Prefix", "defaultValue": "", "group": "Figures" },
      "stat4Suffix": { "dataType": "text", "displayName": "Figure 4 Suffix", "defaultValue": "", "group": "Figures" },
      "stat4Label": { "dataType": "text", "displayName": "Figure 4 Label", "defaultValue": "Design awards, and still counting", "group": "Figures" },
      "separator": { "dataType": "select", "displayName": "Thousands Separator", "defaultValue": "comma", "options": ["comma", "space", "dot", "none"], "group": "Figures" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#FAFAF9", "group": "Colors" },
      "inkColor": { "dataType": "color", "displayName": "Ink", "defaultValue": "#1C1917", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#A8A29E", "group": "Colors" },
      "ruleColor": { "dataType": "color", "displayName": "Underline Track", "defaultValue": "#E7E5E4", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Underline Fill", "defaultValue": "#1C1917", "group": "Colors" },
      "fontFamily": { "dataType": "select", "displayName": "Font", "defaultValue": "Inter Tight", "options": ["Inter Tight", "Inter", "DM Sans", "Fraunces"], "group": "Typography" },
      "sentenceSize": { "dataType": "select", "displayName": "Statement Size (px)", "defaultValue": "52", "options": ["36", "44", "52", "64"], "group": "Typography" },
      "figureSize": { "dataType": "select", "displayName": "Figure Size (px)", "defaultValue": "104", "options": ["72", "88", "104", "128"], "group": "Typography" },
      "figureWeight": { "dataType": "select", "displayName": "Figure Weight", "defaultValue": "300", "options": ["300", "400", "500"], "group": "Typography" },
      "unitStyle": { "dataType": "select", "displayName": "Prefix / Suffix Style", "defaultValue": "superscript", "options": ["superscript", "inline"], "group": "Typography" },
      "triggerMode": { "dataType": "select", "displayName": "Trigger", "defaultValue": "entrance", "options": ["entrance", "scroll", "manual"], "group": "Animation" },
      "threshold": { "dataType": "select", "displayName": "Trigger Threshold", "defaultValue": "0.3", "options": ["0.1", "0.3", "0.5"], "group": "Animation" },
      "duration": { "dataType": "select", "displayName": "Roll Duration (ms)", "defaultValue": "1800", "options": ["1200", "1800", "2400", "3200"], "group": "Animation" },
      "revolutions": { "dataType": "select", "displayName": "Revolutions (last digit)", "defaultValue": "2", "options": ["1", "2", "3"], "group": "Animation" },
      "overshoot": { "dataType": "select", "displayName": "Overshoot Settle", "defaultValue": "soft", "options": ["none", "soft", "strong"], "group": "Animation" },
      "statStagger": { "dataType": "select", "displayName": "Figure Stagger (ms)", "defaultValue": "140", "options": ["0", "80", "140", "240"], "group": "Animation" },
      "showReplay": { "dataType": "booleanValue", "displayName": "Replay Button", "defaultValue": "true", "group": "Animation" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const eyebrow = config?.eyebrow || '(By the numbers)';
  const sideLabel = config?.sideLabel || 'Annual review 2026';
  const sentence = config?.sentence || 'Twelve years, four studios and one stubborn idea: that careful work compounds.';
  const sentenceMuted = config?.sentenceMuted ?? 'Here is what it has added up to so far.';
  const statCount = Math.max(3, Math.min(4, parseInt(config?.statCount || '4', 10) || 4));
  const sepMode = config?.separator || 'comma';
  const bg = config?.backgroundColor || '#FAFAF9';
  const ink = config?.inkColor || '#1C1917';
  const muted = config?.mutedColor || '#A8A29E';
  const ruleC = config?.ruleColor || '#E7E5E4';
  const accent = config?.accentColor || '#1C1917';
  const fontFamily = config?.fontFamily || 'Inter Tight';
  const sentenceSize = parseInt(config?.sentenceSize || '52', 10) || 52;
  const figureSize = parseInt(config?.figureSize || '104', 10) || 104;
  const figureWeight = config?.figureWeight || '300';
  const superUnits = (config?.unitStyle || 'superscript') === 'superscript';
  const triggerMode = config?.triggerMode || 'entrance';
  const threshold = parseFloat(config?.threshold || '0.3') || 0.3;
  const duration = parseInt(config?.duration || '1800', 10) || 1800;
  const revolutions = Math.max(1, Math.min(3, parseInt(config?.revolutions || '2', 10) || 2));
  const overshoot = { none: 0, soft: 0.22, strong: 0.45 }[config?.overshoot || 'soft'] ?? 0.22;
  const statStagger = parseInt(config?.statStagger ?? '140', 10) || 0;
  const showReplay = bool(config?.showReplay, true);

  const defaults = [
    ['1284', '', '', 'Projects delivered across 31 countries'],
    ['98.6', '', '%', 'Of clients return for a second project'],
    ['42.5', '$', 'M', 'Raised by the founders we have worked with'],
    ['37', '', '', 'Design awards, and still counting']
  ];
  const stats = React.useMemo(() => defaults.slice(0, statCount).map((d, i) => {
    const k = `stat${i + 1}`;
    const has = (f) => config?.[k + f] !== undefined && config?.[k + f] !== null;
    return {
      value: config?.[k + 'Value'] || d[0],
      prefix: has('Prefix') ? config[k + 'Prefix'] : d[1],
      suffix: has('Suffix') ? config[k + 'Suffix'] : d[2],
      label: config?.[k + 'Label'] || d[3]
    };
  }), [config, statCount]); // eslint-disable-line react-hooks/exhaustive-deps

  const format = (raw) => {
    const clean = String(raw).replace(/[^0-9.\-]/g, '');
    const neg = clean.startsWith('-');
    const parts = clean.replace('-', '').split('.');
    const intPart = (parts[0] || '0').replace(/^0+(?=\d)/, '');
    const dec = parts[1] || '';
    const sepChar = { comma: ',', space: ' ', dot: '.', none: '' }[sepMode] ?? ',';
    const decChar = sepMode === 'dot' ? ',' : '.';
    const chars = [];
    if (neg) chars.push({ t: 'sym', c: '−' });
    for (let i = 0; i < intPart.length; i++) {
      chars.push({ t: 'digit', c: intPart[i] });
      const rest = intPart.length - 1 - i;
      if (sepChar && rest > 0 && rest % 3 === 0) chars.push({ t: 'sym', c: sepChar });
    }
    if (dec) { chars.push({ t: 'sym', c: decChar }); for (const ch of dec) chars.push({ t: 'digit', c: ch }); }
    return chars;
  };

  const uid = React.useMemo(() => 'od' + Math.random().toString(36).slice(2, 9), []);
  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  React.useEffect(() => {
    const families = {
      'Inter Tight': 'Inter+Tight:wght@300;400;500',
      'Inter': 'Inter:wght@300;400;500',
      'DM Sans': 'DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500',
      'Fraunces': 'Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500'
    };
    const f = families[fontFamily];
    if (!f) return;
    const id = 'gf-' + f.replace(/[^a-z0-9]/gi, '').slice(0, 40);
    if (document.getElementById(id)) return;
    const l = document.createElement('link');
    l.id = id; l.rel = 'stylesheet';
    l.href = `https://fonts.googleapis.com/css2?family=${f}&display=swap`;
    document.head.appendChild(l);
  }, [fontFamily]);

  const rootRef = React.useRef(null);
  const stripRefs = React.useRef({});
  const animsRef = React.useRef([]);
  const rafRef = React.useRef(0);
  const [width, setWidth] = React.useState(1280);
  const [stageH, setStageH] = React.useState(800);
  const [played, setPlayed] = React.useState(reduced || triggerMode === 'manual');
  const [runId, setRunId] = React.useState(0);

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return undefined;
    const s = typeof getScrollContainer === 'function' ? getScrollContainer() : null;
    const scroller = s && s !== window && s.nodeType === 1 ? s : window;
    const measure = () => {
      setWidth(el.clientWidth || 1280);
      setStageH(scroller === window ? window.innerHeight : scroller.clientHeight);
    };
    measure();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (ro) ro.observe(el);
    window.addEventListener('resize', measure);
    return () => { if (ro) ro.disconnect(); window.removeEventListener('resize', measure); };
  }, []);

  const play = React.useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    setPlayed(false);
    rafRef.current = requestAnimationFrame(() => { rafRef.current = requestAnimationFrame(() => { setPlayed(true); setRunId((n) => n + 1); }); });
  }, []);

  React.useEffect(() => {
    if (reduced || triggerMode === 'manual') { setPlayed(true); return undefined; }
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') { setPlayed(true); return undefined; }
    setPlayed(false);
    const io = new IntersectionObserver((es) => {
      if (es[0].isIntersecting) {
        rafRef.current = requestAnimationFrame(() => { setPlayed(true); setRunId((n) => n + 1); });
        if (triggerMode === 'entrance') io.disconnect();
      } else if (triggerMode === 'scroll') { cancelAnimationFrame(rafRef.current); setPlayed(false); }
    }, { threshold: Math.min(threshold, 0.5) });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(rafRef.current); };
  }, [triggerMode, threshold, reduced]);

  const CELL = 1.3;
  const formatted = React.useMemo(() => stats.map((s) => format(s.value)), [stats, sepMode]); // eslint-disable-line react-hooks/exhaustive-deps
  const plan = React.useMemo(() => formatted.map((chars) => {
    const digitIdx = chars.map((c, i) => (c.t === 'digit' ? i : -1)).filter((i) => i >= 0);
    return chars.map((c, i) => {
      if (c.t !== 'digit') return null;
      const fromRight = digitIdx.length - 1 - digitIdx.indexOf(i);
      const fromLeft = digitIdx.indexOf(i);
      const loops = Math.max(0, revolutions - fromRight);
      return { d: parseInt(c.c, 10), loops, fromLeft, fromRight, n: loops * 10 + parseInt(c.c, 10) };
    });
  }), [formatted, revolutions]);
  const statDur = (si) => {
    const p = plan[si].filter(Boolean);
    return p.length ? Math.max(...p.map((q) => duration + q.loops * 220 + q.fromLeft * 70)) : duration;
  };

  React.useEffect(() => {
    animsRef.current.forEach((a) => { try { a.cancel(); } catch (e) { /* noop */ } });
    animsRef.current = [];
    if (!played || reduced || !runId) return undefined;
    plan.forEach((cols, si) => cols.forEach((q, ci) => {
      if (!q) return;
      const el = stripRefs.current[`${si}-${ci}`];
      if (!el || !el.animate) return;
      const end = `translateY(${(-q.n * CELL).toFixed(3)}em)`;
      const over = `translateY(${(-(q.n + overshoot) * CELL).toFixed(3)}em)`;
      const kf = overshoot > 0
        ? [{ transform: 'translateY(0em)', easing: 'cubic-bezier(0.3, 0.05, 0.15, 1)' }, { transform: over, offset: 0.8, easing: 'cubic-bezier(0.45, 0, 0.35, 1)' }, { transform: end }]
        : [{ transform: 'translateY(0em)', easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }, { transform: end }];
      const a = el.animate(kf, { duration: duration + q.loops * 220 + q.fromLeft * 70, delay: si * statStagger + 260 + q.fromLeft * 55, fill: 'backwards' });
      animsRef.current.push(a);
    }));
    return () => { animsRef.current.forEach((a) => { try { a.cancel(); } catch (e) { /* noop */ } }); animsRef.current = []; };
  }, [played, runId, plan, duration, overshoot, statStagger, reduced]);

  const compact = width < 760;
  const pad = compact ? 20 : Math.round(Math.min(80, Math.max(32, width * 0.055)));
  const cols = compact ? 2 : stats.length;
  const colW = (width - pad * 2 - (cols - 1) * (compact ? 20 : 40)) / cols;
  const fig = Math.round(Math.min(compact ? figureSize * 0.5 : figureSize, colW * (compact ? 0.34 : 0.35)));
  const sSize = compact ? Math.round(sentenceSize * 0.56) : Math.round(Math.min(sentenceSize, width * 0.042));
  const fontCss = fontFamily === 'Fraunces' ? '"Fraunces", Georgia, serif' : `"${fontFamily}", "Inter", -apple-system, "Helvetica Neue", Arial, sans-serif`;
  const E = 'cubic-bezier(0.22, 1, 0.36, 1)';
  const on = played;
  const tr = (props, delay, dur, ease) => (on && !reduced ? props.map((p) => `${p} ${dur}ms ${ease || E} ${delay}ms`).join(', ') : 'none');

  const sWords = sentence.split(/\s+/).filter(Boolean);
  const mWords = String(sentenceMuted || '').split(/\s+/).filter(Boolean);
  const wordEl = (w, i, color) => (
    <span key={i} style={{ display: 'inline-block', marginRight: '0.24em', color, opacity: on ? 1 : 0, filter: on ? 'blur(0px)' : 'blur(8px)', transform: on ? 'none' : 'translateY(0.35em)', transition: tr(['opacity', 'filter', 'transform'], 40 + i * 28, 900) }}>{w}</span>
  );

  const unit = (txt, delay, side) => txt ? (
    <span style={{
      display: 'inline-block', fontSize: superUnits ? '0.42em' : '1em', lineHeight: 1, color: superUnits ? ink : muted,
      alignSelf: superUnits ? 'flex-start' : 'center', marginTop: superUnits ? `${0.36 * CELL}em` : 0,
      margin: superUnits ? undefined : side === 'pre' ? '0 0.04em 0 0' : '0 0 0 0.04em',
      paddingRight: side === 'pre' && superUnits ? '0.12em' : 0, paddingLeft: side === 'suf' && superUnits ? '0.12em' : 0,
      opacity: on ? 1 : 0, transform: on ? 'none' : 'translateY(0.4em)', transition: tr(['opacity', 'transform'], delay, 800)
    }}>{txt}</span>
  ) : null;

  const replayBtn = showReplay && (
    <button type="button" onClick={play} aria-label="Replay the figures" className={`${uid}-replay`}
      style={{ appearance: 'none', border: `1px solid ${ruleC}`, background: 'transparent', color: ink, cursor: 'pointer', width: 36, height: 36, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
      <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><path d="M13.5 8a5.5 5.5 0 1 1-1.7-3.98M13.5 2.5v3h-3" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </button>
  );

  return (
    <section ref={rootRef} className={`odometer-stats ${uid}`} aria-label={eyebrow}
      style={{ position: 'relative', width: '100%', minHeight: compact ? 0 : Math.max(560, stageH), boxSizing: 'border-box', background: bg, color: ink, fontFamily: fontCss, padding: compact ? `28px ${pad}px 40px` : `${Math.round(pad * 0.8)}px ${pad}px ${pad}px`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: compact ? 40 : 56 }}>
      <style>{`
        .${uid} .${uid}-replay { transition: background .3s, color .3s, transform .5s cubic-bezier(0.22,1,0.36,1); }
        .${uid} .${uid}-replay:hover { background: ${ink}; color: ${bg}; transform: rotate(-90deg); }
        .${uid} .${uid}-replay:focus-visible { outline: 2px solid ${ink}; outline-offset: 3px; }
      `}</style>
      <div>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13, color: muted, marginBottom: compact ? 24 : 40 }}>
          <span style={{ color: ink }}>{eyebrow}</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 16 }}>{!compact && sideLabel}{replayBtn}</span>
        </header>
        <h2 style={{ margin: 0, maxWidth: compact ? '100%' : Math.round(width * 0.74), fontSize: sSize, lineHeight: 1.12, fontWeight: 300, letterSpacing: fontFamily === 'Fraunces' ? '-0.01em' : '-0.03em' }}>
          {sWords.map((w, i) => wordEl(w, i, ink))}
          {mWords.map((w, i) => wordEl(w, sWords.length + i, muted))}
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gap: compact ? '36px 20px' : 40 }}>
        {stats.map((s, si) => {
          const chars = formatted[si];
          const base = si * statStagger + 260;
          const total = statDur(si);
          const aria = `${s.prefix || ''}${s.value}${s.suffix || ''} — ${s.label}`;
          return (
            <div key={si} role="group" aria-label={aria}>
              <div aria-hidden="true" style={{ display: 'flex', alignItems: 'center', fontSize: fig, fontWeight: figureWeight, letterSpacing: '-0.04em', fontVariantNumeric: 'tabular-nums', lineHeight: `${CELL}em`, height: `${CELL}em`, whiteSpace: 'nowrap', marginLeft: '-0.04em' }}>
                {unit(s.prefix, base, 'pre')}
                {chars.map((c, ci) => {
                  if (c.t !== 'digit') {
                    return <span key={ci} style={{ display: 'inline-block', opacity: on ? 1 : 0, transition: tr(['opacity'], base + 300, 600, 'ease'), margin: c.c === ',' || c.c === '.' ? '0 -0.02em' : 0 }}>{c.c}</span>;
                  }
                  const q = plan[si][ci];
                  const len = (q.loops + 1) * 10 + 1;
                  return (
                    <span key={ci} style={{ display: 'inline-block', height: `${CELL}em`, overflow: 'hidden', WebkitMaskImage: 'linear-gradient(transparent, #000 14%, #000 86%, transparent)', maskImage: 'linear-gradient(transparent, #000 14%, #000 86%, transparent)' }}>
                      <span ref={(el) => { stripRefs.current[`${si}-${ci}`] = el; }}
                        style={{ display: 'block', transform: `translateY(${on ? (-q.n * CELL).toFixed(3) : 0}em)`, willChange: 'transform' }}>
                        {Array.from({ length: len }, (_, k) => <span key={k} style={{ display: 'block', height: `${CELL}em`, textAlign: 'center' }}>{k % 10}</span>)}
                      </span>
                    </span>
                  );
                })}
                {unit(s.suffix, base + 200, 'suf')}
              </div>
              <div aria-hidden="true" style={{ position: 'relative', height: 1, background: ruleC, marginTop: compact ? 8 : 14 }}>
                <div style={{ position: 'absolute', inset: 0, background: accent, transformOrigin: 'left', transform: on ? 'scaleX(1)' : 'scaleX(0)', transition: tr(['transform'], base, total, 'cubic-bezier(0.65, 0, 0.35, 1)') }} />
              </div>
              <p style={{ margin: compact ? '12px 0 0' : '18px 0 0', fontSize: compact ? 13 : 15, lineHeight: 1.5, color: muted, maxWidth: 260, opacity: on ? 1 : 0, transform: on ? 'none' : 'translateY(8px)', transition: tr(['opacity', 'transform'], base + 500, 900) }}>
                <span style={{ color: ink }}>{String(si + 1).padStart(2, '0')}</span>&nbsp;&nbsp;{s.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

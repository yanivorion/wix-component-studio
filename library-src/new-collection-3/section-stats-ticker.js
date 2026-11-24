const MANIFEST = {
  "type": "Section.StatsTicker",
  "description": "Clean live metrics band: four big grotesk figures with mono labels that count up from zero on reveal with a per-digit odometer roll, then keep updating live (increment or fluctuate) with every changed digit rolling and a tiny sparkline redrawing; a mono news ticker loops underneath and pauses on hover; light and dark variants",
  "editorElement": {
    "selector": ".stats-ticker",
    "displayName": "Stats Ticker",
    "archetype": "container",
    "data": {
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Live metrics", "group": "Content" },
      "heading": { "dataType": "text", "displayName": "Heading", "defaultValue": "The quarter, in real time.", "group": "Content" },
      "subheading": { "dataType": "text", "displayName": "Subheading", "defaultValue": "Figures refresh as the network reports them. Updated continuously, audited quarterly.", "group": "Content" },
      "stat1Label": { "dataType": "text", "displayName": "Stat 1 Label", "defaultValue": "Orders shipped today", "group": "Stats" },
      "stat1Value": { "dataType": "text", "displayName": "Stat 1 Value", "defaultValue": "48,213", "group": "Stats" },
      "stat1Step": { "dataType": "text", "displayName": "Stat 1 Step", "defaultValue": "9", "group": "Stats" },
      "stat2Label": { "dataType": "text", "displayName": "Stat 2 Label", "defaultValue": "Uptime, trailing 90 days", "group": "Stats" },
      "stat2Value": { "dataType": "text", "displayName": "Stat 2 Value", "defaultValue": "99.982%", "group": "Stats" },
      "stat2Step": { "dataType": "text", "displayName": "Stat 2 Step", "defaultValue": "0.002", "group": "Stats" },
      "stat3Label": { "dataType": "text", "displayName": "Stat 3 Label", "defaultValue": "Median response", "group": "Stats" },
      "stat3Value": { "dataType": "text", "displayName": "Stat 3 Value", "defaultValue": "184ms", "group": "Stats" },
      "stat3Step": { "dataType": "text", "displayName": "Stat 3 Step", "defaultValue": "7", "group": "Stats" },
      "stat4Label": { "dataType": "text", "displayName": "Stat 4 Label", "defaultValue": "Revenue, FY to date", "group": "Stats" },
      "stat4Value": { "dataType": "text", "displayName": "Stat 4 Value", "defaultValue": "$12.64B", "group": "Stats" },
      "stat4Step": { "dataType": "text", "displayName": "Stat 4 Step", "defaultValue": "0.01", "group": "Stats" },
      "tickerItems": { "dataType": "text", "displayName": "Ticker Items (separate with |)", "defaultValue": "Q3 results beat guidance by 4.2% | Rotterdam hub opens ahead of schedule | Carbon per parcel down 18% year on year | 1,200 new partners onboarded in October | Same-day coverage now reaches 41 cities", "group": "Content" },
      "liveMode": { "dataType": "select", "displayName": "Live Mode", "defaultValue": "fluctuate", "options": ["increment", "fluctuate", "off"], "group": "Animation" },
      "updateInterval": { "dataType": "select", "displayName": "Update Interval (s)", "defaultValue": "2.4", "options": ["1.5", "2.4", "4", "6"], "group": "Animation" },
      "countUp": { "dataType": "select", "displayName": "Count-up Duration (ms)", "defaultValue": "850", "options": ["600", "850", "1200", "1800"], "group": "Animation" },
      "tickerSpeed": { "dataType": "select", "displayName": "Ticker Speed (px/s)", "defaultValue": "48", "options": ["28", "48", "72"], "group": "Animation" },
      "triggerMode": { "dataType": "select", "displayName": "Count-up Trigger", "defaultValue": "entrance", "options": ["entrance", "scroll"], "group": "Animation" },
      "theme": { "dataType": "select", "displayName": "Theme", "defaultValue": "light", "options": ["light", "dark"], "group": "Colors" },
      "lightBackground": { "dataType": "color", "displayName": "Light Background", "defaultValue": "#F3F2EF", "group": "Colors" },
      "lightText": { "dataType": "color", "displayName": "Light Text", "defaultValue": "#0B0B0C", "group": "Colors" },
      "darkBackground": { "dataType": "color", "displayName": "Dark Background", "defaultValue": "#0B0B0C", "group": "Colors" },
      "darkText": { "dataType": "color", "displayName": "Dark Text", "defaultValue": "#EDECE8", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent", "defaultValue": "#D9480F", "group": "Colors" },
      "showSparklines": { "dataType": "booleanValue", "displayName": "Sparklines", "defaultValue": "true", "group": "Layout" },
      "showTicker": { "dataType": "booleanValue", "displayName": "News Ticker", "defaultValue": "true", "group": "Layout" },
      "font": { "dataType": "select", "displayName": "Figure Font", "defaultValue": "Inter Tight", "options": ["Inter Tight", "Geist", "Manrope", "Archivo", "Hanken Grotesk"], "group": "Typography" },
      "figureWeight": { "dataType": "select", "displayName": "Figure Weight", "defaultValue": "400", "options": ["300", "400", "500"], "group": "Typography" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const D = [
    ['Orders shipped today', '48,213', '9'],
    ['Uptime, trailing 90 days', '99.982%', '0.002'],
    ['Median response', '184ms', '7'],
    ['Revenue, FY to date', '$12.64B', '0.01']
  ];
  const parse = (str) => {
    const m = String(str || '').trim().match(/^([^\d-]*)(-?[\d,]*\.?\d+)(.*)$/);
    if (!m) return { prefix: '', num: 0, dec: 0, suffix: String(str || ''), group: false };
    const raw = m[2];
    const dot = raw.indexOf('.');
    return { prefix: m[1], num: parseFloat(raw.replace(/,/g, '')) || 0, dec: dot >= 0 ? raw.length - dot - 1 : 0, suffix: m[3], group: raw.includes(',') || Math.abs(parseFloat(raw.replace(/,/g, ''))) >= 10000 };
  };
  const stats = D.map((d, i) => {
    const pv = parse(config?.[`stat${i + 1}Value`] ?? d[1]);
    return { label: config?.[`stat${i + 1}Label`] ?? d[0], step: Math.abs(parseFloat(config?.[`stat${i + 1}Step`] ?? d[2]) || 0), ...pv };
  }).filter((s) => String(s.label || '').trim() || s.num);

  const eyebrow = config?.eyebrow || 'Live metrics';
  const heading = config?.heading || 'The quarter, in real time.';
  const subheading = config?.subheading ?? 'Figures refresh as the network reports them. Updated continuously, audited quarterly.';
  const tickerItems = String(config?.tickerItems || 'Q3 results beat guidance by 4.2% | Rotterdam hub opens ahead of schedule | Carbon per parcel down 18% year on year | 1,200 new partners onboarded in October | Same-day coverage now reaches 41 cities').split('|').map((s) => s.trim()).filter(Boolean);
  const liveMode = config?.liveMode || 'fluctuate';
  const interval = Math.max(0.8, parseFloat(config?.updateInterval || '2.4') || 2.4) * 1000;
  const countDur = parseInt(config?.countUp || '850', 10) || 850;
  const tickerSpeed = parseFloat(config?.tickerSpeed || '48') || 48;
  const triggerMode = config?.triggerMode || 'entrance';
  const dark = (config?.theme || 'light') === 'dark';
  const bg = dark ? (config?.darkBackground || '#0B0B0C') : (config?.lightBackground || '#F3F2EF');
  const ink = dark ? (config?.darkText || '#EDECE8') : (config?.lightText || '#0B0B0C');
  const accent = config?.accentColor || '#D9480F';
  const showSpark = bool(config?.showSparklines, true);
  const showTicker = bool(config?.showTicker, true);
  const fontName = config?.font || 'Inter Tight';
  const figWeight = config?.figureWeight || '400';

  const alpha = (hex, a) => {
    const h = String(hex || '').replace('#', '');
    if (!/^[0-9a-f]{6}$/i.test(h)) return `rgba(128,128,128,${a})`;
    return `rgba(${parseInt(h.slice(0, 2), 16)},${parseInt(h.slice(2, 4), 16)},${parseInt(h.slice(4, 6), 16)},${a})`;
  };
  const line = alpha(ink, dark ? 0.16 : 0.14);
  const muted = alpha(ink, 0.56);

  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const uid = React.useMemo(() => 'st' + Math.random().toString(36).slice(2, 8), []);

  React.useEffect(() => {
    const fam = {
      'Inter Tight': 'Inter+Tight:wght@300;400;500',
      'Geist': 'Geist:wght@300;400;500',
      'Manrope': 'Manrope:wght@300;400;500',
      'Archivo': 'Archivo:wght@300;400;500',
      'Hanken Grotesk': 'Hanken+Grotesk:wght@300;400;500'
    };
    [fam[fontName], 'JetBrains+Mono:wght@400;500'].filter(Boolean).forEach((f) => {
      const id = 'gf-' + f.replace(/[^a-z0-9]/gi, '').slice(0, 40);
      if (document.getElementById(id)) return;
      const l = document.createElement('link');
      l.id = id; l.rel = 'stylesheet';
      l.href = `https://fonts.googleapis.com/css2?family=${f}&display=swap`;
      document.head.appendChild(l);
    });
  }, [fontName]);

  const SPARK_N = 22;
  const seedHist = (s, i) => Array.from({ length: SPARK_N }, (_, k) => {
    const t = k / (SPARK_N - 1);
    const wave = Math.sin(k * 0.9 + i * 1.7) * 0.5 + Math.sin(k * 0.37 + i) * 0.8;
    return s.num + (s.step || s.num * 0.001) * (wave * 2.2 + (liveMode === 'increment' ? (t - 1) * 8 : 0));
  });

  const rootRef = React.useRef(null);
  const posRef = React.useRef({});
  const snapTimer = React.useRef(0);
  const [width, setWidth] = React.useState(1280);
  const [stageH, setStageH] = React.useState(800);
  const [revealed, setRevealed] = React.useState(reduced);
  const [vals, setVals] = React.useState(() => stats.map((s) => s.num));
  const [hist, setHist] = React.useState(() => stats.map((s, i) => seedHist(s, i)));
  const [ticks, setTicks] = React.useState(() => stats.map(() => 0));
  const [deltas, setDeltas] = React.useState(() => stats.map(() => 0));
  const [snap, setSnap] = React.useState(false);
  const [phase, setPhase] = React.useState(reduced ? 'live' : 'idle');
  const [clock, setClock] = React.useState('');
  const [tickW, setTickW] = React.useState(0);
  const tickRef = React.useRef(null);

  const statsKey = stats.map((s) => `${s.prefix}${s.num}${s.suffix}`).join('|');
  React.useEffect(() => {
    setVals(stats.map((s) => s.num));
    setHist(stats.map((s, i) => seedHist(s, i)));
  }, [statsKey, liveMode]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return undefined;
    const s = typeof getScrollContainer === 'function' ? getScrollContainer() : null;
    const scroller = s && s !== window && s.nodeType === 1 ? s : window;
    const measure = () => {
      setWidth(el.clientWidth || 1280);
      setStageH(scroller === window ? window.innerHeight : scroller.clientHeight);
      if (tickRef.current) setTickW(tickRef.current.scrollWidth / 2);
    };
    measure();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (ro) { ro.observe(el); if (tickRef.current) ro.observe(tickRef.current); }
    window.addEventListener('resize', measure);
    const fonts = document.fonts;
    if (fonts && fonts.ready) fonts.ready.then(measure);
    return () => { if (ro) ro.disconnect(); window.removeEventListener('resize', measure); };
  }, []);

  React.useEffect(() => {
    if (reduced) return undefined;
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') { setRevealed(true); return undefined; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setRevealed(true);
        else if (triggerMode === 'scroll' && e.intersectionRatio === 0) { setRevealed(false); setPhase('idle'); }
      });
    }, { threshold: [0, 0.2] });
    io.observe(el);
    return () => io.disconnect();
  }, [triggerMode, reduced]);

  React.useEffect(() => {
    if (!revealed || reduced) return undefined;
    setPhase('count');
    const t = setTimeout(() => setPhase('live'), Math.max(2500, countDur + 1200));
    return () => clearTimeout(t);
  }, [revealed]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    const fmt = () => { const d = new Date(); return [d.getHours(), d.getMinutes(), d.getSeconds()].map((n) => String(n).padStart(2, '0')).join(':'); };
    setClock(fmt());
    const id = setInterval(() => setClock(fmt()), 1000);
    return () => clearInterval(id);
  }, []);

  React.useEffect(() => {
    if (phase !== 'live' || liveMode === 'off' || reduced) return undefined;
    const timers = [];
    stats.forEach((s, i) => {
      const run = () => {
        setVals((prev) => {
          const v = prev[i];
          const step = s.step || Math.max(Math.pow(10, -s.dec), Math.abs(s.num) * 0.0005);
          let nv;
          if (liveMode === 'increment') nv = v + step * (0.4 + Math.random() * 1.2);
          else {
            nv = v + step * (Math.random() * 2 - 1) * 1.4;
            const lim = step * 9;
            nv = Math.min(s.num + lim, Math.max(s.num - lim, nv));
            if (s.suffix.trim() === '%' && s.num <= 100) nv = Math.min(100, nv);
          }
          const f = Math.pow(10, s.dec);
          nv = Math.round(nv * f) / f;
          if (nv === v) nv = Math.round((v + (liveMode === 'increment' ? 1 : (Math.random() < 0.5 ? -1 : 1)) / f) * f) / f;
          const next = prev.slice(); next[i] = nv;
          setDeltas((d) => { const n = d.slice(); n[i] = nv - v; return n; });
          setHist((h) => { const n = h.slice(); n[i] = [...h[i].slice(1), nv]; return n; });
          setTicks((t) => { const n = t.slice(); n[i] = t[i] + 1; return n; });
          return next;
        });
      };
      const start = setTimeout(() => {
        run();
        timers.push(setInterval(run, interval * (1 + i * 0.17)));
      }, 300 + i * (interval / stats.length));
      timers.push(start);
    });
    return () => timers.forEach((t) => { clearTimeout(t); clearInterval(t); });
  }, [phase, liveMode, interval, statsKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const fmt = (s, v) => {
    const n = Math.abs(v).toLocaleString('en-US', { minimumFractionDigits: s.dec, maximumFractionDigits: s.dec, useGrouping: s.group });
    return (v < 0 ? '-' : '') + n;
  };

  // odometer positions: 30-cell strips, normalised back into 10..19 after each roll
  const shown = phase === 'idle' ? stats.map((s) => 0) : vals;
  const strips = stats.map((s, i) => {
    const target = fmt(s, shown[i]);
    const real = fmt(s, vals[i]);
    const chars = Array.from(real.length >= target.length ? real : target);
    const tChars = Array.from(target).reverse();
    return chars.map((ch, idxL) => {
      const fromRight = chars.length - 1 - idxL;
      const tc = tChars[fromRight];
      if (!/\d/.test(ch)) return { ch, digit: false, key: `c${fromRight}` };
      const d = tc && /\d/.test(tc) ? parseInt(tc, 10) : 0;
      const key = `${i}-${fromRight}`;
      let st = posRef.current[key];
      if (!st) { st = { pos: 10, digit: 0 }; posRef.current[key] = st; }
      if (st.digit !== d || st.phase !== phase) {
        if (st.digit !== d) {
          const up = phase === 'count' || (shown[i] >= (st.val ?? shown[i]));
          const fwd = (d - st.digit + 10) % 10;
          const back = (st.digit - d + 10) % 10;
          let spins = 0;
          if (phase === 'count' && st.phase !== 'count') spins = idxL > 0 ? 10 : 0;
          st.pos = up ? Math.min(29, st.pos + fwd + spins) : Math.max(0, st.pos - back);
          st.digit = d;
        }
        st.phase = phase;
      }
      st.val = shown[i];
      return { ch, digit: true, key, pos: st.pos, lead: idxL };
    });
  });

  React.useEffect(() => {
    clearTimeout(snapTimer.current);
    snapTimer.current = setTimeout(() => {
      let changed = false;
      Object.values(posRef.current).forEach((st) => {
        const n = 10 + (((st.pos % 10) + 10) % 10);
        if (n !== st.pos) { st.pos = n; changed = true; }
      });
      if (changed) {
        setSnap(true);
        requestAnimationFrame(() => requestAnimationFrame(() => setSnap(false)));
      }
    }, phase === 'count' ? countDur + 800 : 1300);
    return () => clearTimeout(snapTimer.current);
  }, [vals, phase]); // eslint-disable-line react-hooks/exhaustive-deps

  const compact = width < 760;
  const pad = compact ? 20 : Math.max(32, Math.round(width * 0.035));
  const cols = compact ? 2 : Math.min(4, stats.length || 1);
  const cellPad = compact ? 14 : 24;
  const colW = (width - pad * 2) / cols - cellPad * 2;
  const emW = (s) => { const t = fmt(s, s.num); const dg = (t.match(/\d/g) || []).length; return dg * 0.53 + (t.length - dg) * 0.3 + (s.prefix.length + s.suffix.trim().length) * 0.27 + 0.06; };
  const maxEm = Math.max(2.2, ...stats.map(emW));
  const fs = Math.round(Math.min(compact ? 72 : 150, Math.max(30, colW / maxEm)));
  const sans = `"${fontName}", "Inter", -apple-system, "Helvetica Neue", Arial, sans-serif`;
  const mono = '"JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace';
  const p = uid;
  const minH = compact ? 0 : Math.max(520, Math.min(stageH, 760));
  const easeOut = 'cubic-bezier(0.22,1,0.36,1)';
  const roll = 'cubic-bezier(0.3,1.25,0.5,1)';

  const sparkPath = (arr, w, h) => {
    const mn = Math.min(...arr); const mx = Math.max(...arr);
    const rng = mx - mn || 1;
    return arr.map((v, k) => `${k ? 'L' : 'M'}${((k / (arr.length - 1)) * w).toFixed(2)} ${(h - 2 - ((v - mn) / rng) * (h - 4)).toFixed(2)}`).join(' ');
  };
  const lastY = (arr, h) => { const mn = Math.min(...arr); const mx = Math.max(...arr); const rng = mx - mn || 1; return h - 2 - ((arr[arr.length - 1] - mn) / rng) * (h - 4); };
  const fmtDelta = (s, d) => {
    if (!d) return '—';
    const f = Math.abs(d).toLocaleString('en-US', { minimumFractionDigits: s.dec, maximumFractionDigits: s.dec });
    return `${d > 0 ? '▲' : '▼'} ${f}`;
  };

  const tickerDur = tickW > 0 ? tickW / tickerSpeed : 40;

  return (
    <section ref={rootRef} className={`stats-ticker ${p}`} aria-label={heading}
      style={{ position: 'relative', width: '100%', minHeight: minH, boxSizing: 'border-box', background: bg, color: ink, fontFamily: sans, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <style>{`
        @keyframes ${p}-fade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        @keyframes ${p}-line { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes ${p}-vline { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        @keyframes ${p}-tick { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes ${p}-pulse { 0% { box-shadow: 0 0 0 0 ${alpha(accent, 0.55)}; } 70% { box-shadow: 0 0 0 7px ${alpha(accent, 0)}; } 100% { box-shadow: 0 0 0 0 ${alpha(accent, 0)}; } }
        @keyframes ${p}-flash { 0% { opacity: 0; transform: translateY(6px); } 20% { opacity: 1; transform: none; } 100% { opacity: 1; } }
        @keyframes ${p}-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
        .${p} .${p}-track:hover { animation-play-state: paused !important; }
        .${p} .${p}-band:hover .${p}-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) { .${p} * { animation: none !important; transition: none !important; } }
      `}</style>

      <div style={{ padding: `${compact ? 24 : 32}px ${pad}px 0`, display: 'flex', flexDirection: 'column', gap: compact ? 22 : 28, flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, fontFamily: mono, fontSize: compact ? 10 : 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: muted, animation: reduced ? 'none' : `${p}-fade 700ms ${easeOut} both` }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, color: ink }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: accent, animation: reduced || liveMode === 'off' ? 'none' : `${p}-pulse 2s ease-out infinite` }} />{eyebrow}
          </span>
          <span style={{ fontVariantNumeric: 'tabular-nums' }}>Last update {clock}</span>
        </div>

        <div style={{ display: 'flex', flexDirection: compact ? 'column' : 'row', justifyContent: 'space-between', alignItems: compact ? 'flex-start' : 'flex-end', gap: compact ? 10 : 40, animation: reduced ? 'none' : `${p}-fade 900ms ${easeOut} 80ms both` }}>
          <h2 style={{ margin: 0, fontSize: compact ? 30 : Math.round(Math.min(56, width * 0.042)), lineHeight: 1.02, letterSpacing: '-0.035em', fontWeight: 300, maxWidth: 680 }}>{heading}</h2>
          {subheading && <p style={{ margin: 0, maxWidth: 340, fontFamily: mono, fontSize: compact ? 11 : 12, lineHeight: 1.55, color: muted }}>{subheading}</p>}
        </div>

        <div style={{ position: 'relative', flex: 1, display: 'grid', gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, alignContent: 'stretch', borderTop: `1px solid ${line}`, transformOrigin: 'left' }}>
          {stats.map((s, i) => {
            const row = Math.floor(i / cols); const col = i % cols;
            const SW = compact ? 56 : 84; const SH = compact ? 20 : 26;
            const path = sparkPath(hist[i] || [s.num, s.num], SW, SH);
            const ly = lastY(hist[i] || [s.num, s.num], SH);
            const cStag = Math.min(160, countDur * 0.2);
            const dur = phase === 'count' ? countDur - cStag : 950;
            return (
              <div key={i} role="group" aria-label={`${s.label}: ${s.prefix}${fmt(s, vals[i])}${s.suffix}`}
                style={{ position: 'relative', paddingTop: compact ? 18 : 28, paddingBottom: compact ? 20 : 30, paddingRight: cellPad, paddingLeft: col === 0 ? 0 : cellPad, borderTop: row > 0 ? `1px solid ${line}` : 'none', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: compact ? 14 : 18, minWidth: 0, minHeight: compact ? 0 : 220 }}>
                {col > 0 && <span aria-hidden="true" style={{ position: 'absolute', left: 0, top: compact ? 14 : 22, bottom: compact ? 14 : 22, width: 1, background: line, transformOrigin: 'top', animation: reduced ? 'none' : `${p}-vline 900ms ${easeOut} ${200 + i * 90}ms both` }} />}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, animation: reduced ? 'none' : `${p}-fade 700ms ${easeOut} ${180 + i * 90}ms both` }}>
                  <span style={{ fontFamily: mono, fontSize: compact ? 9.5 : 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: muted, lineHeight: 1.45 }}>
                    <span style={{ color: ink }}>{String(i + 1).padStart(2, '0')}</span>&nbsp;&nbsp;{s.label}
                  </span>
                  {showSpark && (
                    <svg width={SW} height={SH} viewBox={`0 0 ${SW} ${SH}`} aria-hidden="true" style={{ flexShrink: 0, overflow: 'visible' }}>
                      <path pathLength="1" style={{ d: `path("${path}")`, transition: reduced ? 'none' : `d 900ms ${easeOut}`, strokeDasharray: 1, animation: reduced ? 'none' : `${p}-draw 800ms ${easeOut} ${i * 60}ms both` }} fill="none" stroke={ink} strokeOpacity="0.7" strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round" />
                      <circle r="2.6" cx={SW} cy={0} fill={accent} style={{ transform: `translateY(${ly}px)`, transition: reduced ? 'none' : `transform 900ms ${easeOut}`, opacity: revealed ? 1 : 0 }} />
                    </svg>
                  )}
                </div>
                <div aria-hidden="true" style={{ marginTop: 'auto', display: 'flex', alignItems: 'flex-start', fontSize: fs, lineHeight: 1, fontWeight: figWeight, letterSpacing: '-0.045em', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap', animation: reduced ? 'none' : `${p}-fade 500ms ${easeOut} ${i * 40}ms both` }}>
                  {s.prefix && <span style={{ fontSize: '0.46em', fontWeight: 300, marginTop: '0.12em', marginRight: '0.08em', color: muted, letterSpacing: '-0.02em' }}>{s.prefix}</span>}
                  {strips[i].map((c) => (c.digit ? (
                    <span key={c.key} style={{ display: 'inline-block', height: '1em', overflow: 'hidden', position: 'relative' }}>
                      <span style={{ display: 'block', transform: `translateY(${-c.pos}em)`, transition: snap || reduced ? 'none' : `transform ${dur}ms ${phase === 'count' ? easeOut : roll} ${phase === 'count' ? Math.round((i * 0.5 + c.lead * 0.5) / 5 * cStag) : c.lead * 30}ms` }}>
                        {Array.from({ length: 30 }, (_, k) => <span key={k} style={{ display: 'block', height: '1em' }}>{k % 10}</span>)}
                      </span>
                    </span>
                  ) : (
                    <span key={c.key} style={{ display: 'inline-block' }}>{c.ch}</span>
                  )))}
                  {s.suffix && <span style={{ fontSize: '0.46em', fontWeight: 300, alignSelf: 'flex-end', marginBottom: '0.1em', marginLeft: '0.1em', color: muted, letterSpacing: '-0.02em' }}>{s.suffix.trim()}</span>}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: mono, fontSize: compact ? 9.5 : 11, letterSpacing: '0.06em', color: muted, animation: reduced ? 'none' : `${p}-fade 700ms ${easeOut} ${320 + i * 90}ms both` }}>
                  <span key={ticks[i]} style={{ color: deltas[i] ? (deltas[i] > 0 ? ink : muted) : muted, animation: reduced || !ticks[i] ? 'none' : `${p}-flash 700ms ${easeOut} both` }}>
                    {deltas[i] ? <span style={{ color: accent }}>{fmtDelta(s, deltas[i]).slice(0, 1)}</span> : null}{deltas[i] ? fmtDelta(s, deltas[i]).slice(1) : (phase === 'idle' ? 'Counting' : 'Live')}
                  </span>
                  {!compact && <span style={{ fontVariantNumeric: 'tabular-nums' }}>{String(ticks[i]).padStart(3, '0')} upd</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showTicker && tickerItems.length > 0 && (
        <div className={`${p}-band`} style={{ position: 'relative', borderTop: `1px solid ${line}`, display: 'flex', alignItems: 'stretch', fontFamily: mono, fontSize: compact ? 11 : 12, letterSpacing: '0.06em', textTransform: 'uppercase', animation: reduced ? 'none' : `${p}-fade 900ms ${easeOut} 500ms both` }}>
          <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 8, padding: `0 ${compact ? 12 : 18}px 0 ${pad}px`, borderRight: `1px solid ${line}`, color: ink, background: bg, zIndex: 1 }}>
            <span style={{ color: accent }}>●</span>{compact ? 'News' : 'Newswire'}
          </div>
          <div style={{ position: 'relative', flex: 1, overflow: 'hidden', padding: `${compact ? 14 : 18}px 0`, WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)', maskImage: 'linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)' }}>
            <div ref={tickRef} className={`${p}-track`} aria-hidden="true"
              style={{ display: 'flex', width: 'max-content', whiteSpace: 'nowrap', color: muted, animation: reduced ? 'none' : `${p}-tick ${tickerDur}s linear infinite` }}>
              {[0, 1].map((dup) => (
                <span key={dup} style={{ display: 'inline-flex' }}>
                  {tickerItems.map((t, k) => (
                    <span key={k} style={{ display: 'inline-flex', alignItems: 'center' }}>
                      <span style={{ color: ink, marginRight: 10, fontVariantNumeric: 'tabular-nums' }}>{String(k + 1).padStart(2, '0')}</span>
                      {t}
                      <span style={{ margin: '0 28px', color: accent }}>/</span>
                    </span>
                  ))}
                </span>
              ))}
            </div>
            <ul style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)', margin: 0, padding: 0 }}>
              {tickerItems.map((t, k) => <li key={k}>{t}</li>)}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}

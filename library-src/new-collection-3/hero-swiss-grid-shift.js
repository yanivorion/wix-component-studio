const MANIFEST = {
  "type": "Hero.SwissGridShift",
  "description": "Swiss poster hero on a visible twelve-column grid: a huge grotesk headline broken into modules (words, a photograph, a colour block and a mono caption) that periodically re-compose into new strong arrangements with spring FLIP motion staggered by distance, while the grid lines flash faintly during each move; pause on hover and manual shuffle",
  "editorElement": {
    "selector": ".swiss-grid-shift",
    "displayName": "Swiss Grid Shift",
    "archetype": "container",
    "data": {
      "word1": { "dataType": "text", "displayName": "Word 1", "defaultValue": "Form", "group": "Content" },
      "word2": { "dataType": "text", "displayName": "Word 2", "defaultValue": "follows", "group": "Content" },
      "word3": { "dataType": "text", "displayName": "Word 3", "defaultValue": "order.", "group": "Content" },
      "eyebrow": { "dataType": "text", "displayName": "Top Left Label", "defaultValue": "Atelier Brandt — Graphic Design", "group": "Content" },
      "topRight": { "dataType": "text", "displayName": "Top Right Label", "defaultValue": "Zürich · Est. 2009", "group": "Content" },
      "caption": { "dataType": "text", "displayName": "Caption", "defaultValue": "A twelve-column study in proportion, tension and pause. Identity, editorial and exhibition design.", "group": "Content" },
      "footer": { "dataType": "text", "displayName": "Bottom Left Label", "defaultValue": "Index 2025 / Selected work", "group": "Content" },
      "blockLabel": { "dataType": "text", "displayName": "Block Label", "defaultValue": "Nº 12", "group": "Content" },
      "shuffleLabel": { "dataType": "text", "displayName": "Shuffle Button Label", "defaultValue": "Shuffle", "group": "Content" },
      "compositionNames": { "dataType": "text", "displayName": "Composition Names (comma separated)", "defaultValue": "Axial,Column,Offset,Monument", "group": "Content" },
      "image": { "dataType": "text", "displayName": "Photo URL", "defaultValue": "https://picsum.photos/id/1031/1000/1200", "group": "Images" },
      "imageAlt": { "dataType": "text", "displayName": "Photo Alt", "defaultValue": "Concrete facade with a regular grid of windows", "group": "Images" },
      "arrangements": { "dataType": "select", "displayName": "Arrangements", "defaultValue": "4", "options": ["2", "3", "4"], "group": "Animation" },
      "interval": { "dataType": "select", "displayName": "Interval (s)", "defaultValue": "3.6", "options": ["2.4", "3.6", "5", "7", "10"], "group": "Animation" },
      "autoplay": { "dataType": "booleanValue", "displayName": "Autoplay", "defaultValue": "true", "group": "Animation" },
      "pauseOnHover": { "dataType": "booleanValue", "displayName": "Pause On Hover", "defaultValue": "true", "group": "Animation" },
      "springStiffness": { "dataType": "select", "displayName": "Spring Stiffness", "defaultValue": "150", "options": ["90", "150", "220", "320"], "group": "Animation" },
      "springDamping": { "dataType": "select", "displayName": "Spring Damping", "defaultValue": "19", "options": ["14", "19", "24", "30"], "group": "Animation" },
      "stagger": { "dataType": "select", "displayName": "Distance Stagger (ms)", "defaultValue": "260", "options": ["0", "140", "260", "420"], "group": "Animation" },
      "showGrid": { "dataType": "booleanValue", "displayName": "Show Grid", "defaultValue": "true", "group": "Layout" },
      "showLabels": { "dataType": "booleanValue", "displayName": "Corner Labels", "defaultValue": "true", "group": "Layout" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#F3F2EF", "group": "Colors" },
      "inkColor": { "dataType": "color", "displayName": "Ink", "defaultValue": "#0B0B0C", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#77746E", "group": "Colors" },
      "gridColor": { "dataType": "color", "displayName": "Grid Lines", "defaultValue": "#0B0B0C", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Colour Block", "defaultValue": "#D9480F", "group": "Colors" },
      "blockTextColor": { "dataType": "color", "displayName": "Block Label Colour", "defaultValue": "#F3F2EF", "group": "Colors" },
      "headlineFont": { "dataType": "select", "displayName": "Headline Font", "defaultValue": "Inter Tight", "options": ["Inter Tight", "Geist", "Manrope", "Archivo", "Hanken Grotesk"], "group": "Typography" },
      "headlineWeight": { "dataType": "select", "displayName": "Headline Weight", "defaultValue": "500", "options": ["300", "400", "500"], "group": "Typography" },
      "tracking": { "dataType": "select", "displayName": "Headline Tracking (em)", "defaultValue": "-0.045", "options": ["-0.02", "-0.035", "-0.045", "-0.06"], "group": "Typography" },
      "monoFont": { "dataType": "select", "displayName": "Mono Font", "defaultValue": "JetBrains Mono", "options": ["JetBrains Mono", "Geist Mono", "IBM Plex Mono", "Space Mono"], "group": "Typography" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const words = [config?.word1 || 'Form', config?.word2 || 'follows', config?.word3 || 'order.'];
  const eyebrow = config?.eyebrow || 'Atelier Brandt — Graphic Design';
  const topRight = config?.topRight || 'Zürich · Est. 2009';
  const caption = config?.caption || 'A twelve-column study in proportion, tension and pause. Identity, editorial and exhibition design.';
  const footer = config?.footer || 'Index 2025 / Selected work';
  const blockLabel = config?.blockLabel || 'Nº 12';
  const shuffleLabel = config?.shuffleLabel || 'Shuffle';
  const names = String(config?.compositionNames || 'Axial,Column,Offset,Monument').split(',').map((s) => s.trim());
  const image = config?.image || 'https://picsum.photos/id/1031/1000/1200';
  const imageAlt = config?.imageAlt || 'Concrete facade with a regular grid of windows';
  const arrCount = Math.min(4, Math.max(2, parseInt(config?.arrangements || '4', 10) || 4));
  const interval = Math.max(1.2, parseFloat(config?.interval || '3.6') || 3.6) * 1000;
  const autoplay = bool(config?.autoplay, true);
  const pauseOnHover = bool(config?.pauseOnHover, true);
  const K = parseFloat(config?.springStiffness || '150') || 150;
  const C = parseFloat(config?.springDamping || '19') || 19;
  const staggerMs = parseFloat(config?.stagger || '260') || 0;
  const showGrid = bool(config?.showGrid, true);
  const showLabels = bool(config?.showLabels, true);
  const bg = config?.backgroundColor || '#F3F2EF';
  const ink = config?.inkColor || '#0B0B0C';
  const muted = config?.mutedColor || '#77746E';
  const gridColor = config?.gridColor || '#0B0B0C';
  const accent = config?.accentColor || '#D9480F';
  const blockText = config?.blockTextColor || '#F3F2EF';
  const headFontName = config?.headlineFont || 'Inter Tight';
  const headWeight = config?.headlineWeight || '500';
  const tracking = config?.tracking || '-0.045';
  const monoName = config?.monoFont || 'JetBrains Mono';

  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const uid = React.useMemo(() => 'sg' + Math.random().toString(36).slice(2, 8), []);

  React.useEffect(() => {
    const fam = {
      'Inter Tight': 'Inter+Tight:wght@300;400;500',
      'Geist': 'Geist:wght@300;400;500',
      'Manrope': 'Manrope:wght@300;400;500',
      'Archivo': 'Archivo:wght@300;400;500',
      'Hanken Grotesk': 'Hanken+Grotesk:wght@300;400;500',
      'JetBrains Mono': 'JetBrains+Mono:wght@400;500',
      'Geist Mono': 'Geist+Mono:wght@400;500',
      'IBM Plex Mono': 'IBM+Plex+Mono:wght@400;500',
      'Space Mono': 'Space+Mono:wght@400'
    };
    [fam[headFontName], fam[monoName]].filter(Boolean).forEach((f) => {
      const id = 'gf-' + f.replace(/[^a-z0-9]/gi, '').slice(0, 40);
      if (document.getElementById(id)) return;
      const l = document.createElement('link');
      l.id = id; l.rel = 'stylesheet';
      l.href = `https://fonts.googleapis.com/css2?family=${f}&display=swap`;
      document.head.appendChild(l);
    });
  }, [headFontName, monoName]);

  const sans = `"${headFontName}", "Inter", -apple-system, "Helvetica Neue", Arial, sans-serif`;
  const mono = `"${monoName}", ui-monospace, "SF Mono", Menlo, monospace`;

  const rootRef = React.useRef(null);
  const modRefs = React.useRef([]);
  const measRefs = React.useRef([]);
  const sim = React.useRef({ cur: [], vel: [], tgt: [], pend: [], raf: 0, last: 0, ready: false });
  const [W, setW] = React.useState(1280);
  const [stageH, setStageH] = React.useState(800);
  const [wordW, setWordW] = React.useState([0, 0, 0]);
  const [idx, setIdx] = React.useState(0);
  const [cycle, setCycle] = React.useState(0);
  const [hover, setHover] = React.useState(false);
  const [moving, setMoving] = React.useState(false);
  const originRef = React.useRef('auto');

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return undefined;
    const s = typeof getScrollContainer === 'function' ? getScrollContainer() : null;
    const scroller = s && s !== window && s.nodeType === 1 ? s : window;
    const measure = () => {
      setW(el.clientWidth || 1280);
      setStageH(scroller === window ? window.innerHeight : scroller.clientHeight);
    };
    measure();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (ro) ro.observe(el);
    window.addEventListener('resize', measure);
    return () => { if (ro) ro.disconnect(); window.removeEventListener('resize', measure); };
  }, []);

  const F0 = 200;
  const CAP_TOP = 0.137;
  const CAP_H = 0.727;

  React.useEffect(() => {
    let alive = true;
    const m = () => {
      if (!alive) return;
      const comp = (Math.abs(parseFloat(tracking) || 0) + 0.03) * F0;
      const ws = [0, 1, 2].map((i) => (measRefs.current[i] ? measRefs.current[i].offsetWidth + comp : 0));
      setWordW((prev) => (prev.every((v, i) => Math.abs(v - ws[i]) < 0.5) ? prev : ws));
    };
    m();
    const fonts = typeof document !== 'undefined' ? document.fonts : null;
    if (fonts && fonts.ready) fonts.ready.then(m);
    if (fonts && fonts.addEventListener) fonts.addEventListener('loadingdone', m);
    const t = setTimeout(m, 1200);
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(m) : null;
    if (ro) measRefs.current.forEach((el) => el && ro.observe(el));
    return () => { alive = false; clearTimeout(t); if (ro) ro.disconnect(); if (fonts && fonts.removeEventListener) fonts.removeEventListener('loadingdone', m); };
  }, [words[0], words[1], words[2], headFontName, headWeight, tracking]);

  const compact = W < 760;
  const H = Math.max(compact ? 620 : 560, stageH);
  const cols = compact ? 6 : 12;
  const rows = compact ? 8 : 6;
  const m = compact ? 18 : Math.max(32, Math.round(W * 0.034));
  const top = compact ? 66 : 78;
  const bottom = compact ? 78 : 78;
  const g = compact ? 10 : 20;
  const gx = (W - 2 * m - g * (cols - 1)) / cols;
  const gy = (H - top - bottom - g * (rows - 1)) / rows;

  // module order: word1, word2, word3, photo, block, caption — [col, span, row, rowSpan]
  const DESK = [
    [[0, 6, 0, 2], [0, 9, 2, 2], [0, 8, 4, 2], [9, 3, 2, 4], [7, 2, 0, 1], [9, 3, 0, 1]],
    [[6, 6, 0, 2], [6, 6, 2, 2], [6, 6, 4, 2], [0, 4, 1, 5], [4, 1, 5, 1], [0, 4, 0, 1]],
    [[3, 9, 0, 2], [6, 6, 2, 2], [6, 6, 4, 2], [0, 5, 2, 4], [0, 2, 1, 1], [0, 3, 0, 1]],
    [[0, 4, 0, 2], [0, 12, 2, 3], [7, 5, 5, 1], [5, 4, 0, 2], [0, 2, 5, 1], [9, 3, 0, 1]]
  ];
  const MOB = [
    [[0, 6, 1, 1], [0, 6, 2, 1], [0, 6, 3, 1], [0, 6, 4, 4], [5, 1, 0, 1], [0, 4, 0, 1]],
    [[0, 6, 4, 1], [0, 6, 5, 1], [0, 6, 6, 1], [0, 6, 0, 4], [0, 1, 7, 1], [2, 4, 7, 1]],
    [[0, 6, 0, 2], [0, 6, 6, 1], [2, 4, 7, 1], [0, 4, 3, 3], [4, 2, 2, 1], [0, 3, 2, 1]],
    [[0, 5, 0, 1], [0, 6, 1, 1], [0, 6, 7, 1], [2, 4, 2, 5], [0, 1, 2, 1], [0, 2, 3, 2]]
  ];
  const set = compact ? MOB : DESK;
  const box = ([c, s, r, rs]) => ({ x: m + c * (gx + g), y: top + r * (gy + g), w: s * gx + (s - 1) * g, h: rs * gy + (rs - 1) * g });
  const rectsFor = (a) => set[a % set.length].map((cell, i) => {
    const b = box(cell);
    if (i > 2) return b;
    const w0 = wordW[i] || F0 * 2;
    const h0 = CAP_H * F0;
    const sc = Math.min(b.w / w0, b.h / h0);
    return { x: b.x, y: b.y + b.h - h0 * sc, w: w0 * sc, h: h0 * sc };
  });

  const apply = (i, r) => {
    const el = modRefs.current[i];
    if (!el || !r) return;
    if (i <= 2) {
      const sc = r.h / (CAP_H * F0);
      el.style.transform = `translate3d(${r.x}px, ${r.y}px, 0) scale(${sc})`;
    } else {
      el.style.transform = `translate3d(${r.x}px, ${r.y}px, 0)`;
      el.style.width = `${Math.max(0, r.w)}px`;
      el.style.height = `${Math.max(0, r.h)}px`;
    }
  };

  const springRef = React.useRef({ K, C });
  springRef.current = { K, C };

  const step = (now) => {
    const S = sim.current;
    const dt = Math.min(1 / 30, Math.max(0.001, (now - (S.last || now)) / 1000 || 1 / 60));
    S.last = now;
    const { K: k, C: c } = springRef.current;
    let active = false;
    for (let i = 0; i < S.cur.length; i++) {
      if (S.pend[i] && now >= S.pend[i].at) { S.tgt[i] = S.pend[i].r; S.pend[i] = null; }
      if (S.pend[i]) active = true;
      const cu = S.cur[i]; const v = S.vel[i]; const t = S.tgt[i];
      ['x', 'y', 'w', 'h'].forEach((key) => {
        const a = -k * (cu[key] - t[key]) - c * v[key];
        v[key] += a * dt;
        cu[key] += v[key] * dt;
        if (Math.abs(v[key]) > 0.6 || Math.abs(cu[key] - t[key]) > 0.25) active = true;
      });
      apply(i, cu);
    }
    if (active) S.raf = requestAnimationFrame(step);
    else {
      for (let i = 0; i < S.cur.length; i++) { S.cur[i] = { ...S.tgt[i] }; S.vel[i] = { x: 0, y: 0, w: 0, h: 0 }; apply(i, S.cur[i]); }
      S.raf = 0; S.last = 0;
      setMoving(false);
    }
  };

  React.useLayoutEffect(() => {
    const S = sim.current;
    const rects = rectsFor(idx);
    if (!S.ready || reduced) {
      S.cur = rects.map((r) => ({ ...r }));
      S.tgt = rects.map((r) => ({ ...r }));
      S.vel = rects.map(() => ({ x: 0, y: 0, w: 0, h: 0 }));
      S.pend = rects.map(() => null);
      rects.forEach((r, i) => apply(i, r));
      S.ready = true;
      return;
    }
    const now = performance.now();
    const ox = originRef.current === 'button' ? W - m : m;
    const oy = originRef.current === 'button' ? H - bottom : top;
    const dists = S.cur.map((r) => Math.hypot(r.x + r.w / 2 - ox, r.y + r.h / 2 - oy));
    const maxD = Math.max(1, ...dists);
    let changed = false;
    rects.forEach((r, i) => {
      const t = S.pend[i] ? S.pend[i].r : S.tgt[i];
      if (t && Math.abs(t.x - r.x) + Math.abs(t.y - r.y) + Math.abs(t.w - r.w) + Math.abs(t.h - r.h) < 0.5) return;
      changed = true;
      S.pend[i] = { r, at: now + (dists[i] / maxD) * staggerMs };
    });
    if (!changed) return;
    setMoving(true);
    if (!S.raf) { S.last = 0; S.raf = requestAnimationFrame(step); }
  }, [idx, W, H, wordW[0], wordW[1], wordW[2], compact]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => () => cancelAnimationFrame(sim.current.raf), []);

  const count = compact ? Math.min(arrCount, MOB.length) : arrCount;
  const shuffle = (from) => {
    originRef.current = from || 'auto';
    setIdx((i) => (i + 1) % count);
    setCycle((c) => c + 1);
  };
  const playing = autoplay && !reduced && count > 1;
  const paused = pauseOnHover && hover;
  const pad2 = (n) => String(n).padStart(2, '0');
  const p = uid;
  const name = names[idx] || `Composition ${idx + 1}`;
  const labelStyle = { fontFamily: mono, fontSize: compact ? 9.5 : 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: muted, lineHeight: 1.4, whiteSpace: 'nowrap' };
  const btn = { appearance: 'none', border: 'none', background: 'transparent', padding: 0, margin: 0, font: 'inherit', color: 'inherit', cursor: 'pointer' };
  const gridOp = showGrid ? (moving ? 1 : 0.42) : (moving ? 0.6 : 0);

  return (
    <section
      ref={rootRef}
      className={`swiss-grid-shift ${p}`}
      aria-label={words.join(' ')}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ position: 'relative', width: '100%', height: H, background: bg, color: ink, overflow: 'hidden', fontFamily: sans }}
    >
      <style>{`
        @keyframes ${p}-rise { from { clip-path: inset(0 -4% 100% -4%); transform: translateY(18%); } to { clip-path: inset(-30% -4% -40% -4%); transform: none; } }
        @keyframes ${p}-open { from { clip-path: inset(50% 0 50% 0); } to { clip-path: inset(0 0 0 0); } }
        @keyframes ${p}-imgin { from { transform: scale(1.18); } to { transform: scale(1); } }
        @keyframes ${p}-wipe { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0 0 0 0); } }
        @keyframes ${p}-fade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        @keyframes ${p}-fill { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes ${p}-name { from { transform: translateY(100%); } to { transform: none; } }
        .${p} button:focus-visible { outline: 2px solid ${accent}; outline-offset: 4px; }
        .${p} .${p}-shuf .${p}-ico { transition: transform .6s cubic-bezier(0.22,1,0.36,1); }
        .${p} .${p}-shuf:hover .${p}-ico { transform: rotate(180deg); }
        .${p} .${p}-shuf:hover .${p}-lbl { color: ${ink}; }
        @media (prefers-reduced-motion: reduce) { .${p} * { animation: none !important; transition: none !important; } }
      `}</style>

      <h1 style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap', margin: -1 }}>{words.join(' ')}</h1>

      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, opacity: gridOp, transition: `opacity ${moving ? 180 : 900}ms cubic-bezier(0.22,1,0.36,1)`, pointerEvents: 'none' }}>
        {Array.from({ length: cols }, (_, i) => (
          <div key={i} style={{ position: 'absolute', top: 0, bottom: 0, left: m + i * (gx + g), width: gx, borderLeft: `1px solid ${gridColor}`, borderRight: `1px solid ${gridColor}`, opacity: 0.09, background: moving ? `${gridColor}08` : 'transparent', transition: 'background .6s ease' }} />
        ))}
        {Array.from({ length: rows + 1 }, (_, i) => (
          <div key={'r' + i} style={{ position: 'absolute', left: m, right: m, top: top + i * (gy + g) - (i === rows ? g : 0), height: 1, background: gridColor, opacity: moving ? 0.12 : 0.05, transition: 'opacity .6s ease' }} />
        ))}
      </div>

      {showLabels && (
        <div style={{ position: 'absolute', left: m, right: m, top: compact ? 22 : 28, display: 'flex', justifyContent: 'space-between', gap: 16, ...labelStyle, animation: reduced ? 'none' : `${p}-fade 700ms cubic-bezier(0.22,1,0.36,1) 200ms both` }}>
          <span style={{ color: ink }}>{eyebrow}</span>
          {!compact && (
            <span aria-live="polite" style={{ display: 'inline-flex', gap: 10 }}>
              <span>Grid {cols} × {rows}</span>
              <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}>
                <span key={idx} style={{ display: 'inline-block', color: ink, animation: reduced ? 'none' : `${p}-name 600ms cubic-bezier(0.22,1,0.36,1) both` }}>— {pad2(idx + 1)} {name}</span>
              </span>
            </span>
          )}
          {!compact && <span>{topRight}</span>}
        </div>
      )}

      {words.map((w, i) => (
        <div key={'w' + i} ref={(el) => { modRefs.current[i] = el; }} aria-hidden="true"
          style={{ position: 'absolute', left: 0, top: 0, transformOrigin: '0 0', height: CAP_H * F0, zIndex: 3 }}>
          <div style={{ animation: reduced ? 'none' : `${p}-rise 1000ms cubic-bezier(0.22,1,0.36,1) ${120 + i * 110}ms both` }}>
            <span ref={(el) => { measRefs.current[i] = el; }}
              style={{ display: 'inline-block', fontSize: F0, lineHeight: 1, marginTop: -CAP_TOP * F0, whiteSpace: 'nowrap', fontWeight: headWeight, letterSpacing: `${tracking}em`, color: ink, fontFamily: sans }}>{w}</span>
          </div>
        </div>
      ))}

      <div ref={(el) => { modRefs.current[3] = el; }}
        style={{ position: 'absolute', left: 0, top: 0, overflow: 'hidden', background: '#D8D6D1', zIndex: 2, animation: reduced ? 'none' : `${p}-open 1100ms cubic-bezier(0.65,0,0.35,1) 260ms both` }}>
        {image ? (
          <img src={image} alt={imageAlt} draggable="false"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', animation: reduced ? 'none' : `${p}-imgin 1600ms cubic-bezier(0.22,1,0.36,1) 260ms both` }} />
        ) : (
          <div style={{ position: 'absolute', inset: 0, background: `repeating-linear-gradient(45deg, transparent 0 10px, ${gridColor}14 10px 11px)` }} />
        )}
      </div>

      <div ref={(el) => { modRefs.current[4] = el; }} aria-hidden="true"
        style={{ position: 'absolute', left: 0, top: 0, background: accent, zIndex: 2, overflow: 'hidden', animation: reduced ? 'none' : `${p}-wipe 900ms cubic-bezier(0.65,0,0.35,1) 420ms both` }}>
        <span style={{ position: 'absolute', left: 8, bottom: 6, fontFamily: mono, fontSize: compact ? 9 : 10.5, letterSpacing: '0.06em', color: blockText, whiteSpace: 'nowrap' }}>{blockLabel}</span>
      </div>

      <div ref={(el) => { modRefs.current[5] = el; }}
        style={{ position: 'absolute', left: 0, top: 0, zIndex: 2, overflow: 'hidden' }}>
        <div style={{ borderTop: `1px solid ${ink}`, paddingTop: compact ? 6 : 9, animation: reduced ? 'none' : `${p}-fade 800ms cubic-bezier(0.22,1,0.36,1) 520ms both` }}>
          <div style={{ fontFamily: mono, fontSize: compact ? 9.5 : 11, lineHeight: 1.45, letterSpacing: '0.01em', color: ink, display: 'flex', gap: 10 }}>
            <span style={{ color: accent, flexShrink: 0 }}>{pad2(idx + 1)}</span>
            <span style={{ color: muted }}>{caption}</span>
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', left: m, right: m, bottom: compact ? 22 : 28, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, zIndex: 4 }}>
        {showLabels ? <span style={{ ...labelStyle, animation: reduced ? 'none' : `${p}-fade 700ms cubic-bezier(0.22,1,0.36,1) 300ms both` }}>{footer}</span> : <span />}
        <div style={{ display: 'flex', alignItems: 'center', gap: compact ? 14 : 22 }}>
          <span style={{ ...labelStyle, fontVariantNumeric: 'tabular-nums' }}>
            <span style={{ color: ink }}>{pad2(idx + 1)}</span> / {pad2(count)}
          </span>
          <span aria-hidden="true" style={{ position: 'relative', width: compact ? 44 : 72, height: 1, background: `${gridColor}26`, overflow: 'hidden' }}>
            <span key={cycle}
              onAnimationEnd={playing ? () => shuffle('auto') : undefined}
              style={{ position: 'absolute', inset: 0, background: ink, transformOrigin: 'left', transform: playing ? 'scaleX(0)' : 'scaleX(1)', animation: playing ? `${p}-fill ${interval}ms linear 900ms forwards` : 'none', animationPlayState: paused ? 'paused' : 'running' }} />
          </span>
          <button type="button" className={`${p}-shuf`} onClick={() => shuffle('button')} aria-label={`${shuffleLabel} composition, currently ${name}`}
            style={{ ...btn, display: 'inline-flex', alignItems: 'center', gap: 8, ...labelStyle, color: ink }}>
            <svg className={`${p}-ico`} width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
              <rect x="1" y="1" width="5" height="5" fill="none" stroke="currentColor" strokeWidth="1.1" />
              <rect x="8" y="8" width="5" height="5" fill={accent} stroke={accent} strokeWidth="1.1" />
              <rect x="8" y="1" width="5" height="5" fill="none" stroke="currentColor" strokeWidth="1.1" />
              <rect x="1" y="8" width="5" height="5" fill="none" stroke="currentColor" strokeWidth="1.1" />
            </svg>
            <span className={`${p}-lbl`}>{shuffleLabel}</span>
          </button>
        </div>
      </div>
    </section>
  );
}

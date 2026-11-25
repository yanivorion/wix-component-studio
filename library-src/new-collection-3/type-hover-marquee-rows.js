const MANIFEST = {
  "type": "Type.HoverMarqueeRows",
  "description": "A typographic index of huge words. Hovering a row floods its band with ink from the side the cursor entered, pushes the static word out letter by letter and slides in a running marquee of the word repeated with small image pills; leaving reverses through the exit edge",
  "editorElement": {
    "selector": ".hover-marquee-rows",
    "displayName": "Hover Marquee Rows",
    "archetype": "container",
    "data": {
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Index", "group": "Content" },
      "headerRight": { "dataType": "text", "displayName": "Header Right", "defaultValue": "Studio work — 2019 / 2026", "group": "Content" },
      "words": { "dataType": "text", "displayName": "Words (comma separated)", "defaultValue": "Monolith,Fieldwork,Halcyon,Meridian,Tidal,Ember", "group": "Items" },
      "categories": { "dataType": "text", "displayName": "Categories (comma separated)", "defaultValue": "Architecture,Photography,Hospitality,Wayfinding,Landscape,Objects", "group": "Items" },
      "years": { "dataType": "text", "displayName": "Years (comma separated)", "defaultValue": "2026,2025,2025,2024,2023,2022", "group": "Items" },
      "links": { "dataType": "text", "displayName": "Links (comma separated)", "defaultValue": "", "group": "Items" },
      "images": { "dataType": "text", "displayName": "Pill Image URLs (comma separated)", "defaultValue": "https://picsum.photos/id/1031/600/360,https://picsum.photos/id/1076/600/360,https://picsum.photos/id/1068/600/360,https://picsum.photos/id/1050/600/360,https://picsum.photos/id/866/600/360,https://picsum.photos/id/1060/600/360,https://picsum.photos/id/1049/600/360,https://picsum.photos/id/250/600/360", "group": "Images" },
      "pillsPerRow": { "dataType": "select", "displayName": "Images Per Row", "defaultValue": "3", "options": ["1", "2", "3", "4"], "group": "Images" },
      "imageFilter": { "dataType": "select", "displayName": "Image Treatment", "defaultValue": "none", "options": ["none", "muted", "grayscale"], "group": "Images" },
      "restingRow": { "dataType": "number", "displayName": "Resting Active Row (0 = none)", "defaultValue": "2", "group": "Animation" },
      "marqueeSpeed": { "dataType": "select", "displayName": "Marquee Speed (px/s)", "defaultValue": "90", "options": ["50", "70", "90", "120", "160"], "group": "Animation" },
      "marqueeDirection": { "dataType": "select", "displayName": "Marquee Direction", "defaultValue": "alternate", "options": ["alternate", "left", "right"], "group": "Animation" },
      "kick": { "dataType": "select", "displayName": "Entry Speed Kick", "defaultValue": "strong", "options": ["off", "subtle", "strong"], "group": "Animation" },
      "bandDuration": { "dataType": "select", "displayName": "Band Duration (ms)", "defaultValue": "720", "options": ["480", "600", "720", "900"], "group": "Animation" },
      "letterStagger": { "dataType": "select", "displayName": "Letter Stagger (ms)", "defaultValue": "18", "options": ["0", "10", "18", "28"], "group": "Animation" },
      "showNumbers": { "dataType": "booleanValue", "displayName": "Numbers", "defaultValue": "true", "group": "Layout" },
      "showMeta": { "dataType": "booleanValue", "displayName": "Category & Year", "defaultValue": "true", "group": "Layout" },
      "showDividers": { "dataType": "booleanValue", "displayName": "Dividers", "defaultValue": "true", "group": "Layout" },
      "rowSpacing": { "dataType": "select", "displayName": "Row Spacing", "defaultValue": "comfortable", "options": ["tight", "comfortable", "airy"], "group": "Layout" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#F3F2EF", "group": "Colors" },
      "textColor": { "dataType": "color", "displayName": "Text", "defaultValue": "#0B0B0C", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#8A877F", "group": "Colors" },
      "lineColor": { "dataType": "color", "displayName": "Dividers", "defaultValue": "#D9D6CF", "group": "Colors" },
      "bandColor": { "dataType": "color", "displayName": "Band (Ink)", "defaultValue": "#0B0B0C", "group": "Colors" },
      "bandTextColor": { "dataType": "color", "displayName": "Band Text", "defaultValue": "#F3F2EF", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent", "defaultValue": "#D9480F", "group": "Colors" },
      "fontFamily": { "dataType": "select", "displayName": "Display Font", "defaultValue": "Inter Tight", "options": ["Inter Tight", "Geist", "Hanken Grotesk", "Manrope"], "group": "Typography" },
      "monoFamily": { "dataType": "select", "displayName": "Mono Font", "defaultValue": "JetBrains Mono", "options": ["JetBrains Mono", "Geist Mono", "IBM Plex Mono"], "group": "Typography" },
      "fontSize": { "dataType": "select", "displayName": "Max Size (px)", "defaultValue": "136", "options": ["96", "116", "136", "160", "184"], "group": "Typography" },
      "fontWeight": { "dataType": "select", "displayName": "Weight", "defaultValue": "400", "options": ["300", "400", "500"], "group": "Typography" },
      "textCase": { "dataType": "select", "displayName": "Case", "defaultValue": "none", "options": ["none", "uppercase"], "group": "Typography" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const split = (s) => String(s || '').split(',').map((x) => x.trim());

  const eyebrow = config?.eyebrow ?? 'Index';
  const headerRight = config?.headerRight ?? 'Studio work — 2019 / 2026';
  const words = split(config?.words || 'Monolith,Fieldwork,Halcyon,Meridian,Tidal,Ember').filter(Boolean);
  const categories = split(config?.categories || 'Architecture,Photography,Hospitality,Wayfinding,Landscape,Objects');
  const years = split(config?.years || '2026,2025,2025,2024,2023,2022');
  const links = split(config?.links || '');
  const images = split(config?.images || 'https://picsum.photos/id/1031/600/360,https://picsum.photos/id/1076/600/360,https://picsum.photos/id/1068/600/360,https://picsum.photos/id/1050/600/360,https://picsum.photos/id/866/600/360,https://picsum.photos/id/1060/600/360,https://picsum.photos/id/1049/600/360,https://picsum.photos/id/250/600/360').filter(Boolean);
  const pillsPerRow = Math.max(1, parseInt(config?.pillsPerRow || '3', 10) || 3);
  const imageFilter = config?.imageFilter || 'none';
  const restingRow = parseInt(config?.restingRow ?? '2', 10);
  const speed = parseFloat(config?.marqueeSpeed || '90') || 90;
  const mdir = config?.marqueeDirection || 'alternate';
  const kickK = { off: 1, subtle: 2.2, strong: 4.5 }[config?.kick || 'strong'] || 4.5;
  const D = parseInt(config?.bandDuration || '720', 10) || 720;
  const stag = parseInt(config?.letterStagger ?? '18', 10) || 0;
  const showNumbers = bool(config?.showNumbers, true);
  const showMeta = bool(config?.showMeta, true);
  const showDividers = bool(config?.showDividers, true);
  const spaceK = { tight: 0.05, comfortable: 0.11, airy: 0.18 }[config?.rowSpacing || 'comfortable'] ?? 0.11;
  const bg = config?.backgroundColor || '#F3F2EF';
  const text = config?.textColor || '#0B0B0C';
  const muted = config?.mutedColor || '#8A877F';
  const line = config?.lineColor || '#D9D6CF';
  const band = config?.bandColor || '#0B0B0C';
  const bandText = config?.bandTextColor || '#F3F2EF';
  const accent = config?.accentColor || '#D9480F';
  const fontFamily = config?.fontFamily || 'Inter Tight';
  const monoFamily = config?.monoFamily || 'JetBrains Mono';
  const maxSize = parseInt(config?.fontSize || '136', 10) || 136;
  const fontWeight = config?.fontWeight || '400';
  const upper = (config?.textCase || 'none') === 'uppercase';

  const N = words.length;
  const uid = React.useMemo(() => 'hm' + Math.random().toString(36).slice(2, 9), []);
  const reduced = React.useMemo(() => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  const rootRef = React.useRef(null);
  const bandRefs = React.useRef([]);
  const marqRefs = React.useRef([]);
  const trackRefs = React.useRef([]);
  const letterRefs = React.useRef([]);
  const metaRefs = React.useRef([]);
  const rowState = React.useRef([]);
  const enterDir = React.useRef([]);
  const exitDir = React.useRef([]);
  const prevActive = React.useRef(null);
  const mq = React.useRef({ x: [], v: [], live: [], seqW: [], raf: 0, last: 0 });

  const [width, setWidth] = React.useState(1280);
  const [hovered, setHovered] = React.useState(null);
  const [focused, setFocused] = React.useState(null);
  const [ready, setReady] = React.useState(reduced);

  React.useEffect(() => {
    const fams = { 'Inter Tight': 'Inter+Tight:wght@300;400;500', 'Geist': 'Geist:wght@300;400;500', 'Hanken Grotesk': 'Hanken+Grotesk:wght@300;400;500', 'Manrope': 'Manrope:wght@300;400;500' };
    const monos = { 'JetBrains Mono': 'JetBrains+Mono:wght@400;500', 'Geist Mono': 'Geist+Mono:wght@400;500', 'IBM Plex Mono': 'IBM+Plex+Mono:wght@400;500' };
    [fams[fontFamily], monos[monoFamily]].filter(Boolean).forEach((f) => {
      const id = 'gf-' + f.replace(/[^a-z0-9]/gi, '').slice(0, 40);
      if (document.getElementById(id)) return;
      const l = document.createElement('link');
      l.id = id; l.rel = 'stylesheet';
      l.href = `https://fonts.googleapis.com/css2?family=${f}&display=swap`;
      document.head.appendChild(l);
    });
  }, [fontFamily, monoFamily]);

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return undefined;
    const measure = () => setWidth(el.clientWidth || 1280);
    measure();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (ro) ro.observe(el);
    return () => { if (ro) ro.disconnect(); };
  }, []);

  const compact = width < 760;
  const pad = compact ? 16 : Math.round(Math.max(28, Math.min(56, width * 0.04)));
  const maxLen = words.reduce((m, w) => Math.max(m, w.length), 1);
  const side = compact ? 0 : (showNumbers ? 96 : 0) + (showMeta ? 240 : 0);
  const glyph = upper ? 0.66 : 0.54;
  const size = Math.round(Math.max(40, Math.min(compact ? maxSize * 0.62 : maxSize, (width - pad * 2 - side) / (maxLen * glyph + 0.2))));
  const LH = 1.16;
  const vpad = Math.max(8, Math.round(size * spaceK));
  const rowH = Math.round(size * LH + vpad * 2);

  const ease = 'cubic-bezier(0.77, 0, 0.18, 1)';
  const easeOut = 'cubic-bezier(0.22, 1, 0.36, 1)';
  const hdirFor = (i) => (mdir === 'left' ? 1 : mdir === 'right' ? -1 : i % 2 === 0 ? 1 : -1);
  const charsOf = (w) => Array.from(upper ? w.toUpperCase() : w);

  // band, marquee and letters are driven imperatively so every transition starts from wherever it is
  const apply = React.useCallback((i, on, dir) => {
    const b = bandRefs.current[i];
    const m = marqRefs.current[i];
    const ls = (letterRefs.current[i] || []).filter(Boolean);
    const meta = metaRefs.current[i];
    if (!b || !m) return;
    const st = rowState.current[i] || (rowState.current[i] = { t: 0, lp: 0 });
    const now = performance.now();
    const dur = reduced ? 0 : D;
    const settled = now - st.t > dur + stag * ls.length + 60;
    const setLetters = (pos, delayed, instant) => {
      ls.forEach((el, j) => {
        el.style.transition = instant || reduced ? 'none' : `transform ${Math.round(dur * 0.9)}ms cubic-bezier(0.65, 0, 0.35, 1) ${delayed ? j * stag : 0}ms`;
        el.style.transform = `translateY(${pos * 112}%)`;
      });
      st.lp = pos;
    };
    if (on) {
      if (settled || reduced) {
        b.style.transition = 'none'; m.style.transition = 'none';
        const start = dir < 0 ? 'inset(0% 0% 100% 0%)' : 'inset(100% 0% 0% 0%)';
        b.style.clipPath = start; b.style.webkitClipPath = start;
        m.style.transform = `translateY(${dir < 0 ? -55 : 55}%)`;
        void b.offsetWidth;
      }
      b.style.transition = reduced ? 'none' : `clip-path ${dur}ms ${ease}, -webkit-clip-path ${dur}ms ${ease}`;
      m.style.transition = reduced ? 'none' : `transform ${Math.round(dur * 1.15)}ms ${easeOut}`;
      b.style.clipPath = 'inset(0% 0% 0% 0%)'; b.style.webkitClipPath = 'inset(0% 0% 0% 0%)';
      m.style.transform = 'translateY(0%)';
      setLetters(-dir, true, false);
      if (meta) { meta.style.transition = reduced ? 'none' : `transform ${dur}ms ${ease}`; meta.style.transform = `translateY(${-dir * 140}%)`; }
      const q = mq.current;
      q.live[i] = Infinity;
      q.v[i] = speed * kickK;
    } else {
      const end = dir > 0 ? 'inset(100% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)';
      b.style.transition = reduced ? 'none' : `clip-path ${dur}ms ${ease}, -webkit-clip-path ${dur}ms ${ease}`;
      m.style.transition = reduced ? 'none' : `transform ${dur}ms ${ease}`;
      b.style.clipPath = end; b.style.webkitClipPath = end;
      m.style.transform = `translateY(${dir > 0 ? 45 : -45}%)`;
      const from = -dir;
      if (settled && st.lp !== from) { setLetters(from, false, true); void b.offsetWidth; }
      setLetters(0, true, false);
      if (meta) {
        if (settled) { meta.style.transition = 'none'; meta.style.transform = `translateY(${from * 140}%)`; void meta.offsetWidth; }
        meta.style.transition = reduced ? 'none' : `transform ${dur}ms ${ease} 60ms`; meta.style.transform = 'translateY(0%)';
      }
      mq.current.live[i] = performance.now() + dur + 200;
    }
    st.t = now;
  }, [D, stag, reduced, speed, kickK]); // eslint-disable-line react-hooks/exhaustive-deps

  // entrance: letters rise into their rows, then the resting row comes alive
  React.useEffect(() => {
    if (reduced) return undefined;
    let raf2 = 0;
    const raf = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        letterRefs.current.forEach((arr, r) => (arr || []).forEach((el, j) => {
          if (!el) return;
          el.style.transition = `transform 1000ms cubic-bezier(0.22, 1, 0.36, 1) ${120 + r * 70 + j * 22}ms`;
          el.style.transform = 'translateY(0%)';
        }));
      });
    });
    const t = setTimeout(() => setReady(true), 650);
    return () => { cancelAnimationFrame(raf); cancelAnimationFrame(raf2); clearTimeout(t); };
  }, [reduced]);

  const resting = restingRow > 0 && restingRow <= N ? restingRow - 1 : null;
  const active = hovered ?? focused ?? (ready ? resting : null);

  React.useEffect(() => {
    const prev = prevActive.current;
    if (prev === active) return;
    prevActive.current = active;
    if (prev !== null && prev !== undefined) {
      const d = exitDir.current[prev] ?? (active !== null && active < prev ? -1 : 1);
      apply(prev, false, d);
    }
    if (active !== null && active !== undefined) {
      const d = enterDir.current[active] ?? (prev !== null && prev !== undefined && prev > active ? 1 : -1);
      apply(active, true, d);
    }
    if (prev !== null && prev !== undefined) exitDir.current[prev] = undefined;
    if (active !== null && active !== undefined) enterDir.current[active] = undefined;
  }, [active, apply]);

  // marquee loop: only rows whose band is visible are advanced
  React.useEffect(() => {
    const q = mq.current;
    q.seqW = [];
    if (reduced) return undefined;
    const tick = (t) => {
      const dt = Math.min(50, t - (q.last || t));
      q.last = t;
      const now = performance.now();
      for (let i = 0; i < N; i++) {
        if (!(q.live[i] > now)) continue;
        const tr = trackRefs.current[i];
        if (!tr || !tr.firstChild) continue;
        const w = q.seqW[i] || tr.firstChild.offsetWidth;
        if (!w) continue;
        q.seqW[i] = w;
        q.v[i] = (q.v[i] ?? speed) + (speed - (q.v[i] ?? speed)) * Math.min(1, dt * 0.0032);
        let x = (q.x[i] ?? w * 0.37 * ((i % 3) + 1)) + hdirFor(i) * q.v[i] * dt / 1000;
        x = ((x % w) + w) % w;
        q.x[i] = x;
        tr.style.transform = `translate3d(${(-x).toFixed(2)}px, 0, 0)`;
      }
      q.raf = requestAnimationFrame(tick);
    };
    q.raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(q.raf);
  }, [N, speed, reduced, width, size, mdir]); // eslint-disable-line react-hooks/exhaustive-deps

  const edgeDir = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    return e.clientY < r.top + r.height / 2 ? -1 : 1;
  };
  const onEnter = (i) => (e) => {
    if (e.pointerType !== 'mouse') return;
    enterDir.current[i] = edgeDir(e);
    setHovered(i);
  };
  const onLeave = (i) => (e) => {
    if (e.pointerType !== 'mouse') return;
    exitDir.current[i] = edgeDir(e);
    setHovered((h) => (h === i ? null : h));
  };

  const sans = '"Inter", -apple-system, "Helvetica Neue", Arial, sans-serif';
  const display = `"${fontFamily}", "Inter", -apple-system, "Helvetica Neue", Arial, sans-serif`;
  const mono = `"${monoFamily}", ui-monospace, "SFMono-Regular", Menlo, monospace`;
  const tracking = upper ? '-0.035em' : '-0.05em';
  const filterCss = imageFilter === 'grayscale' ? 'grayscale(1) contrast(1.05)' : imageFilter === 'muted' ? 'saturate(0.55) contrast(0.98)' : 'none';
  const pad2 = (n) => String(n).padStart(2, '0');
  const metaEdge = Math.max(0.5, Math.min(0.95, (width - pad - 240 - 24) / width));
  const maskGrad = `linear-gradient(90deg, transparent 0, #000 ${showNumbers ? 9 : 3}%, #000 ${showMeta ? Math.round(metaEdge * 100 - 12) : 97}%, transparent ${showMeta ? Math.round(metaEdge * 100) : 100}%)`;
  const btnReset = { appearance: 'none', border: 'none', background: 'transparent', padding: 0, margin: 0, font: 'inherit', color: 'inherit', textAlign: 'left', cursor: 'pointer', textDecoration: 'none' };
  const microLabel = { fontFamily: mono, fontSize: compact ? 10 : 11, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 400 };

  if (!N) {
    return (
      <section className="hover-marquee-rows" style={{ width: '100%', padding: 64, boxSizing: 'border-box', background: bg, color: muted, fontFamily: mono, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'center' }}>
        Add words to build the index
      </section>
    );
  }

  return (
    <section
      ref={rootRef}
      className={`hover-marquee-rows ${uid}`}
      aria-label={eyebrow || 'Index'}
      style={{ position: 'relative', width: '100%', background: bg, color: text, fontFamily: sans, boxSizing: 'border-box', padding: `${compact ? 28 : 40}px 0 ${compact ? 36 : 56}px`, overflow: 'hidden' }}
    >
      <style>{`
        .${uid} .${uid}-row:focus-visible { outline: none; }
        .${uid} .${uid}-row:focus-visible .${uid}-focus { opacity: 1 !important; }
        @keyframes ${uid}-fade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        @keyframes ${uid}-line { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @media (prefers-reduced-motion: reduce) { .${uid} * { animation: none !important; transition: none !important; } }
      `}</style>

      <div style={{ ...microLabel, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, padding: `0 ${pad}px ${compact ? 14 : 20}px`, color: muted, animation: reduced ? 'none' : `${uid}-fade 800ms ${easeOut} both` }}>
        <span><span style={{ color: text }}>{eyebrow}</span><span style={{ marginLeft: 10 }}>({pad2(N)})</span></span>
        {!compact && <span>Hover a row</span>}
        <span>{headerRight}</span>
      </div>

      <nav aria-label={eyebrow || 'Index'} onPointerLeave={(e) => { if (e.pointerType === 'mouse') setHovered(null); }}>
        {showDividers && <div aria-hidden="true" style={{ height: 1, margin: `0 ${pad}px`, background: line, transformOrigin: 'left', animation: reduced ? 'none' : `${uid}-line 1100ms ${easeOut} both` }} />}
        {words.map((word, i) => {
          const chars = charsOf(word);
          const href = links[i] && links[i] !== '#' ? links[i] : undefined;
          const cat = categories[i] || '';
          const yr = years[i] || '';
          const hd = hdirFor(i);
          const K = Math.max(2, Math.ceil((width * 1.1) / ((chars.length * glyph + 2.1) * size)) + 1);
          const seq = (copy) => (
            <span key={copy} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              {Array.from({ length: K }).map((_, k) => {
                const img = images.length ? images[(i * pillsPerRow + (k % pillsPerRow)) % images.length] : '';
                return (
                  <React.Fragment key={k}>
                    <span style={{ display: 'block', whiteSpace: 'pre', paddingRight: '0.18em' }}>{upper ? word.toUpperCase() : word}</span>
                    {img ? (
                      <span style={{ position: 'relative', display: 'block', flexShrink: 0, width: '1.5em', height: '0.64em', margin: '0.04em 0.24em 0 0.06em', borderRadius: 999, overflow: 'hidden', background: 'rgba(255,255,255,0.08)' }}>
                        <img src={img} alt="" draggable="false" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: filterCss }} />
                      </span>
                    ) : (
                      <span style={{ display: 'block', width: '0.18em', height: '0.18em', margin: '0 0.4em', borderRadius: 999, background: accent }} />
                    )}
                  </React.Fragment>
                );
              })}
            </span>
          );
          const Tag = href ? 'a' : 'button';
          return (
            <div key={i} style={{ position: 'relative' }}>
              <Tag
                className={`${uid}-row`}
                href={href}
                type={href ? undefined : 'button'}
                aria-label={`${word}${cat ? ', ' + cat : ''}${yr ? ', ' + yr : ''}`}
                aria-current={active === i ? 'true' : undefined}
                onPointerEnter={onEnter(i)}
                onPointerLeave={onLeave(i)}
                onPointerDown={(e) => { if (e.pointerType !== 'mouse') { enterDir.current[i] = edgeDir(e); setFocused(i); } }}
                onFocus={() => setFocused(i)}
                onBlur={() => setFocused((f) => (f === i ? null : f))}
                style={{ ...btnReset, position: 'relative', display: 'block', width: '100%', height: rowH, overflow: 'hidden', WebkitTapHighlightColor: 'transparent' }}
              >
                <span className={`${uid}-focus`} aria-hidden="true" style={{ position: 'absolute', inset: 2, border: `1.5px solid ${accent}`, zIndex: 4, opacity: 0, pointerEvents: 'none', transition: 'opacity 200ms' }} />
                <span aria-hidden="true" style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: compact ? '1fr auto' : `${showNumbers ? '96px ' : ''}1fr ${showMeta ? '240px' : ''}`, alignItems: 'center', padding: `0 ${pad}px` }}>
                  {showNumbers && !compact && <span style={{ ...microLabel, color: muted, alignSelf: 'start', paddingTop: vpad + size * 0.14 }}>{pad2(i + 1)}</span>}
                  <span style={{ display: 'block', overflow: 'hidden', height: `${LH}em`, fontFamily: display, fontWeight, fontSize: size, lineHeight: LH, letterSpacing: tracking, whiteSpace: 'nowrap' }}>
                    <span style={{ display: 'flex' }}>
                      {chars.map((ch, j) => (
                        <span key={j} ref={(el) => { (letterRefs.current[i] || (letterRefs.current[i] = []))[j] = el; }} style={{ display: 'block', whiteSpace: 'pre', transform: reduced ? 'none' : 'translateY(112%)', willChange: 'transform' }}>{ch}</span>
                      ))}
                    </span>
                  </span>
                  {compact ? (
                    showNumbers && <span style={{ ...microLabel, color: muted, alignSelf: 'start', paddingTop: vpad + 4 }}>{pad2(i + 1)}</span>
                  ) : showMeta && (
                    <span style={{ display: 'block', overflow: 'hidden', alignSelf: 'start', marginTop: vpad + size * 0.12 }}>
                      <span ref={(el) => { metaRefs.current[i] = el; }} style={{ ...microLabel, display: 'flex', justifyContent: 'space-between', gap: 16, color: muted }}>
                        <span>{cat}</span><span style={{ color: text }}>{yr}</span>
                      </span>
                    </span>
                  )}
                </span>

                <span
                  ref={(el) => { bandRefs.current[i] = el; }}
                  aria-hidden="true"
                  style={{ position: 'absolute', inset: 0, background: band, color: bandText, clipPath: 'inset(100% 0% 0% 0%)', WebkitClipPath: 'inset(100% 0% 0% 0%)', zIndex: 2 }}
                >
                  <span ref={(el) => { marqRefs.current[i] = el; }} style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', willChange: 'transform', WebkitMaskImage: compact ? 'none' : maskGrad, maskImage: compact ? 'none' : maskGrad }}>
                    <span ref={(el) => { trackRefs.current[i] = el; }} style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', fontFamily: display, fontWeight, fontSize: size, lineHeight: LH, letterSpacing: tracking, willChange: 'transform' }}>
                      {seq(0)}{seq(1)}
                    </span>
                  </span>
                  {!compact && showNumbers && (
                    <span style={{ ...microLabel, position: 'absolute', left: pad, top: vpad + size * 0.14, color: accent, display: 'flex', alignItems: 'center', gap: 8 }}>
                      {pad2(i + 1)}
                      <svg width="14" height="8" viewBox="0 0 14 8" aria-hidden="true" style={{ transform: hd > 0 ? 'scaleX(-1)' : 'none' }}><path d="M0 4h12M9 1l3 3-3 3" fill="none" stroke="currentColor" strokeWidth="1.1" /></svg>
                    </span>
                  )}
                  {!compact && showMeta && (
                    <span style={{ ...microLabel, position: 'absolute', right: pad, top: vpad + size * 0.12, width: 240 - 24, display: 'flex', justifyContent: 'space-between', gap: 16, color: bandText, opacity: 0.9 }}>
                      <span>{cat}</span><span>{href ? 'Open ↗' : yr}</span>
                    </span>
                  )}
                </span>
              </Tag>
              {showDividers && <div aria-hidden="true" style={{ height: 1, margin: `0 ${pad}px`, background: line, transformOrigin: 'left', animation: reduced ? 'none' : `${uid}-line 1100ms ${easeOut} ${100 + i * 70}ms both` }} />}
            </div>
          );
        })}
      </nav>
    </section>
  );
}

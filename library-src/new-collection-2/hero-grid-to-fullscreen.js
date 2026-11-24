const MANIFEST = {
  "type": "Hero.GridToFullscreen",
  "description": "Opening hero that starts as an editorial photo collage; one tile performs a shared-element expansion to full-bleed while the others scatter away, and the headline re-sets as a huge masked title. Back to index reverses it, arrows wipe between projects",
  "editorElement": {
    "selector": ".hero-grid-fullscreen",
    "displayName": "Grid To Fullscreen",
    "archetype": "container",
    "data": {
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Halden Studio — Index", "group": "Content" },
      "headline": { "dataType": "text", "displayName": "Grid Headline", "defaultValue": "Architecture for a slower life", "group": "Content" },
      "intro": { "dataType": "text", "displayName": "Grid Intro", "defaultValue": "Seven houses, studios and retreats built between the fjords and the city.", "group": "Content" },
      "titles": { "dataType": "text", "displayName": "Project Titles (comma separated)", "defaultValue": "Glass House,Fjord Retreat,North Tower,Hill Cabin,Black Pavilion,Stone Studio,Lake House", "group": "Content" },
      "captions": { "dataType": "text", "displayName": "Project Captions (comma separated)", "defaultValue": "Oslo — 2024,Lysefjord — 2023,Copenhagen — 2022,Skye — 2021,Reykjavik — 2025,Utah — 2020,Lucerne — 2026", "group": "Content" },
      "backLabel": { "dataType": "text", "displayName": "Back Label", "defaultValue": "Back to index", "group": "Content" },
      "images": { "dataType": "text", "displayName": "Image URLs (comma separated)", "defaultValue": "https://picsum.photos/id/1031/1600/1000,https://picsum.photos/id/1015/1600/1000,https://picsum.photos/id/1076/1600/1000,https://picsum.photos/id/1018/1600/1000,https://picsum.photos/id/1078/1600/1000,https://picsum.photos/id/1016/1600/1000,https://picsum.photos/id/1036/1600/1000", "group": "Images" },
      "imageFilter": { "dataType": "select", "displayName": "Image Treatment", "defaultValue": "none", "options": ["none", "grayscale", "muted"], "group": "Images" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#F5F5F4", "group": "Colors" },
      "inkColor": { "dataType": "color", "displayName": "Ink", "defaultValue": "#1C1917", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#78716C", "group": "Colors" },
      "overlayTextColor": { "dataType": "color", "displayName": "Fullscreen Text", "defaultValue": "#FAFAF9", "group": "Colors" },
      "tileColor": { "dataType": "color", "displayName": "Tile Placeholder", "defaultValue": "#E7E5E4", "group": "Colors" },
      "displayFont": { "dataType": "select", "displayName": "Display Font", "defaultValue": "Instrument Serif", "options": ["Instrument Serif", "Fraunces", "Inter Tight", "system-ui"], "group": "Typography" },
      "headlineSize": { "dataType": "select", "displayName": "Grid Headline Size (px)", "defaultValue": "44", "options": ["32", "38", "44", "50", "56"], "group": "Typography" },
      "titleScale": { "dataType": "select", "displayName": "Fullscreen Title Scale", "defaultValue": "large", "options": ["medium", "large", "huge"], "group": "Typography" },
      "titleWeight": { "dataType": "select", "displayName": "Title Weight", "defaultValue": "400", "options": ["300", "400", "500"], "group": "Typography" },
      "height": { "dataType": "select", "displayName": "Height", "defaultValue": "screen", "options": ["screen", "640", "720", "800"], "group": "Layout" },
      "gap": { "dataType": "select", "displayName": "Tile Gap (px)", "defaultValue": "10", "options": ["4", "6", "10", "14", "20"], "group": "Layout" },
      "radius": { "dataType": "select", "displayName": "Tile Radius (px)", "defaultValue": "4", "options": ["0", "2", "4", "8", "14"], "group": "Layout" },
      "scrim": { "dataType": "select", "displayName": "Fullscreen Scrim", "defaultValue": "medium", "options": ["none", "light", "medium", "strong"], "group": "Layout" },
      "showArrows": { "dataType": "booleanValue", "displayName": "Arrows In Fullscreen", "defaultValue": "true", "group": "Layout" },
      "autoStart": { "dataType": "booleanValue", "displayName": "Auto Start Expansion", "defaultValue": "true", "group": "Animation" },
      "autoStartDelay": { "dataType": "select", "displayName": "Auto Start Delay (ms)", "defaultValue": "1600", "options": ["800", "1200", "1600", "2400", "3200"], "group": "Animation" },
      "featuredIndex": { "dataType": "select", "displayName": "Auto Start Tile", "defaultValue": "4", "options": ["1", "2", "3", "4", "5", "6", "7"], "group": "Animation" },
      "expandDuration": { "dataType": "select", "displayName": "Expand Duration (ms)", "defaultValue": "1100", "options": ["800", "1100", "1400", "1800"], "group": "Animation" },
      "scatterStagger": { "dataType": "select", "displayName": "Scatter Stagger (ms)", "defaultValue": "45", "options": ["20", "45", "70", "100"], "group": "Animation" },
      "scatterDistance": { "dataType": "select", "displayName": "Scatter Distance", "defaultValue": "medium", "options": ["small", "medium", "large"], "group": "Animation" },
      "switchDuration": { "dataType": "select", "displayName": "Arrow Wipe Duration (ms)", "defaultValue": "1000", "options": ["700", "1000", "1300"], "group": "Animation" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const split = (s) => String(s || '').split(',').map((x) => x.trim()).filter(Boolean);
  const eyebrow = config?.eyebrow || 'Halden Studio — Index';
  const headline = config?.headline || 'Architecture for a slower life';
  const intro = config?.intro || 'Seven houses, studios and retreats built between the fjords and the city.';
  const titles = split(config?.titles || 'Glass House,Fjord Retreat,North Tower,Hill Cabin,Black Pavilion,Stone Studio,Lake House');
  const captions = split(config?.captions || 'Oslo — 2024,Lysefjord — 2023,Copenhagen — 2022,Skye — 2021,Reykjavik — 2025,Utah — 2020,Lucerne — 2026');
  const backLabel = config?.backLabel || 'Back to index';
  const images = split(config?.images || 'https://picsum.photos/id/1031/1600/1000,https://picsum.photos/id/1015/1600/1000,https://picsum.photos/id/1076/1600/1000,https://picsum.photos/id/1018/1600/1000,https://picsum.photos/id/1078/1600/1000,https://picsum.photos/id/1016/1600/1000,https://picsum.photos/id/1036/1600/1000');
  const imageFilter = config?.imageFilter || 'none';
  const bg = config?.backgroundColor || '#F5F5F4';
  const ink = config?.inkColor || '#1C1917';
  const muted = config?.mutedColor || '#78716C';
  const onImg = config?.overlayTextColor || '#FAFAF9';
  const tileColor = config?.tileColor || '#E7E5E4';
  const displayFont = config?.displayFont || 'Instrument Serif';
  const headlineSize = parseInt(config?.headlineSize || '44', 10) || 44;
  const titleScale = { medium: 0.09, large: 0.12, huge: 0.15 }[config?.titleScale || 'large'] || 0.12;
  const titleWeight = config?.titleWeight || '400';
  const heightMode = config?.height || 'screen';
  const gap = parseInt(config?.gap || '10', 10);
  const radius = parseInt(config?.radius || '4', 10);
  const scrimA = { none: 0, light: 0.3, medium: 0.5, strong: 0.7 }[config?.scrim || 'medium'] ?? 0.5;
  const showArrows = bool(config?.showArrows, true);
  const autoStart = bool(config?.autoStart, true);
  const autoDelay = parseInt(config?.autoStartDelay || '1600', 10) || 1600;
  const featured = Math.max(0, (parseInt(config?.featuredIndex || '4', 10) || 4) - 1);
  const dur = parseInt(config?.expandDuration || '1100', 10) || 1100;
  const stagger = parseInt(config?.scatterStagger || '45', 10);
  const scatterK = { small: 0.08, medium: 0.16, large: 0.28 }[config?.scatterDistance || 'medium'] || 0.16;
  const switchDur = parseInt(config?.switchDuration || '1000', 10) || 1000;

  const uid = React.useMemo(() => 'gf' + Math.random().toString(36).slice(2, 9), []);
  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  const rootRef = React.useRef(null);
  const interacted = React.useRef(false);
  const targetRef = React.useRef(0);
  const pendingBack = React.useRef(false);
  const [width, setWidth] = React.useState(1280);
  const [stageH, setStageH] = React.useState(720);
  const [mode, setMode] = React.useState('grid');
  const [active, setActive] = React.useState(featured);
  const [shown, setShown] = React.useState(featured);
  const [openCount, setOpenCount] = React.useState(0);
  const [overlays, setOverlays] = React.useState([]);
  const [snap, setSnap] = React.useState(false);
  const [hoverIdx, setHoverIdx] = React.useState(-1);
  const [busy, setBusy] = React.useState(false);

  React.useEffect(() => {
    const families = { 'Instrument Serif': 'Instrument+Serif:ital@0;1', 'Fraunces': 'Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500', 'Inter Tight': 'Inter+Tight:wght@300;400;500' };
    [families[displayFont], 'Inter:wght@300;400;500'].filter(Boolean).forEach((f) => {
      const id = 'gf-' + f.replace(/[^a-z0-9]/gi, '').slice(0, 40);
      if (document.getElementById(id)) return;
      const l = document.createElement('link');
      l.id = id; l.rel = 'stylesheet';
      l.href = `https://fonts.googleapis.com/css2?family=${f}&display=swap`;
      document.head.appendChild(l);
    });
  }, [displayFont]);

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

  const compact = width < 760;
  const W = width;
  const H = heightMode === 'screen' ? Math.max(compact ? 620 : 560, stageH) : parseInt(heightMode, 10) || 720;
  const pad = compact ? 16 : 28;

  const layout = compact
    ? { cols: 4, rows: 10, head: [0, 4, 0, 2], tiles: [[0, 2, 2, 3], [2, 2, 2, 2], [2, 2, 4, 3], [0, 2, 5, 3], [2, 2, 7, 3], [0, 2, 8, 2]] }
    : { cols: 12, rows: 8, head: [0, 3, 0, 4], tiles: [[0, 3, 4, 4], [3, 3, 0, 3], [3, 2, 3, 5], [5, 4, 3, 5], [6, 3, 0, 3], [9, 3, 0, 4], [9, 3, 4, 4]] };
  const T = layout.tiles.length;
  const cellRect = ([c, cs, r, rs]) => {
    const cw = (W - pad * 2 - gap * (layout.cols - 1)) / layout.cols;
    const rh = (H - pad * 2 - gap * (layout.rows - 1)) / layout.rows;
    return { x: pad + c * (cw + gap), y: pad + r * (rh + gap), w: cs * cw + (cs - 1) * gap, h: rs * rh + (rs - 1) * gap };
  };
  const rects = layout.tiles.map(cellRect);
  const headRect = cellRect(layout.head);
  const act = Math.min(active, T - 1);
  const imgFor = (i) => (images.length ? images[i % images.length] : '');
  const titleFor = (i) => titles[i % Math.max(1, titles.length)] || `Project ${i + 1}`;
  const captionFor = (i) => captions[i % Math.max(1, captions.length)] || '';
  const isFull = mode === 'full';

  const open = React.useCallback((i) => {
    targetRef.current = i;
    setActive(i);
    setShown(i);
    setOpenCount((c) => c + 1);
    setMode('full');
  }, []);

  React.useEffect(() => {
    if (!autoStart || !images.length) return undefined;
    const t = setTimeout(() => { if (!interacted.current) open(Math.min(featured, T - 1)); }, reduced ? 0 : autoDelay);
    return () => clearTimeout(t);
  }, [autoStart, autoDelay, featured, T, open, reduced, images.length]);

  React.useEffect(() => {
    if (!snap) return undefined;
    let r2 = 0;
    const r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => {
        setSnap(false);
        setOverlays([]);
        if (pendingBack.current) { pendingBack.current = false; setMode('grid'); }
      });
    });
    return () => { cancelAnimationFrame(r1); cancelAnimationFrame(r2); };
  }, [snap]);

  React.useEffect(() => {
    if (reduced) return undefined;
    setBusy(true);
    const t = setTimeout(() => setBusy(false), dur + stagger * 8 + 300);
    return () => clearTimeout(t);
  }, [mode, dur, stagger, reduced]);
  const hov = busy ? -1 : hoverIdx;

  const finalize = (j) => { setActive(j); setSnap(true); };

  const step = (dir) => {
    if (!isFull || T < 2) return;
    interacted.current = true;
    const j = (((targetRef.current + dir) % T) + T) % T;
    targetRef.current = j;
    setShown(j);
    if (reduced) { setActive(j); return; }
    setOverlays((o) => [...o.slice(-1), { key: Date.now() + Math.random(), idx: j, dir }]);
  };
  const back = () => {
    interacted.current = true;
    if (overlays.length) { pendingBack.current = true; finalize(targetRef.current); return; }
    setMode('grid');
  };
  const onOverlayEnd = (key) => {
    const last = overlays[overlays.length - 1];
    if (last && last.key === key) finalize(last.idx);
  };
  const onKey = (e) => {
    if (e.key === 'Escape' && isFull) { e.preventDefault(); back(); }
    else if (e.key === 'ArrowRight' && isFull) { e.preventDefault(); step(1); }
    else if (e.key === 'ArrowLeft' && isFull) { e.preventDefault(); step(-1); }
  };

  const ease = 'cubic-bezier(0.76, 0, 0.24, 1)';
  const easeOut = 'cubic-bezier(0.22, 1, 0.36, 1)';
  const sans = '"Inter", -apple-system, "Helvetica Neue", Arial, sans-serif';
  const display = displayFont === 'system-ui' ? sans
    : displayFont === 'Inter Tight' ? '"Inter Tight", "Inter", -apple-system, sans-serif'
    : `"${displayFont}", "Iowan Old Style", Georgia, serif`;
  const serifish = displayFont === 'Instrument Serif' || displayFont === 'Fraunces';
  const filterCss = imageFilter === 'grayscale' ? 'grayscale(1) contrast(1.05)' : imageFilter === 'muted' ? 'saturate(0.6) contrast(0.96)' : 'none';
  const pad2 = (n) => String(n).padStart(2, '0');
  const p = uid;

  const ac = rects[act] || rects[0];
  const acx = ac.x + ac.w / 2; const acy = ac.y + ac.h / 2;
  const ranks = rects.map((r, i) => ({ i, d: Math.hypot(r.x + r.w / 2 - acx, r.y + r.h / 2 - acy) }))
    .filter((o) => o.i !== act).sort((a, b) => a.d - b.d).map((o) => o.i);

  const tileStyle = (i) => {
    const r = rects[i];
    const full = isFull && i === act;
    const R = full ? { x: 0, y: 0, w: W, h: H } : r;
    const rad = full ? 0 : radius;
    const clip = `inset(${R.y}px ${W - R.x - R.w}px ${H - R.y - R.h}px ${R.x}px round ${rad}px)`;
    let transform = 'translate(0px, 0px) scale(1)';
    let opacity = 1;
    let delay = 0;
    let d = dur;
    const rank = ranks.indexOf(i);
    if (i === act) {
      delay = isFull ? Math.min(160, stagger * 2) : 0;
    } else if (isFull) {
      const cx = r.x + r.w / 2 - acx; const cy = r.y + r.h / 2 - acy;
      const len = Math.hypot(cx, cy) || 1;
      const k = W * scatterK;
      transform = `translate(${(cx / len) * k}px, ${(cy / len) * k}px) scale(0.86)`;
      opacity = 0;
      delay = rank * stagger;
      d = dur * 0.85;
    } else {
      delay = Math.round(dur * 0.28) + rank * stagger;
      d = dur * 0.9;
    }
    const tr = snap || reduced ? 'none'
      : `clip-path ${dur}ms ${ease} ${i === act ? delay : 0}ms, transform ${d}ms ${isFull ? ease : easeOut} ${delay}ms, opacity ${Math.round(d * 0.7)}ms ${isFull ? 'cubic-bezier(.4,0,.6,1)' : easeOut} ${delay + (isFull ? Math.round(d * 0.15) : 0)}ms`;
    return {
      position: 'absolute', inset: 0, clipPath: clip, WebkitClipPath: clip, transform, opacity,
      transition: tr, WebkitTransition: tr, zIndex: i === act ? 3 : 1,
      pointerEvents: isFull ? 'none' : 'auto', background: tileColor, willChange: 'clip-path, transform, opacity'
    };
  };
  const imgStyle = (i) => {
    const full = isFull && i === act;
    const r = full ? { x: 0, y: 0, w: W, h: H } : rects[i];
    const s = Math.max(r.w / W, r.h / H) * (!isFull && hov === i ? 1.06 : 1);
    const tx = r.x + r.w / 2 - W / 2; const ty = r.y + r.h / 2 - H / 2;
    const tr = snap || reduced ? 'none'
      : hov === i && !isFull ? `transform 900ms ${easeOut}` : `transform ${dur}ms ${ease} ${i === act && isFull ? Math.min(160, stagger * 2) : 0}ms`;
    return {
      position: 'absolute', left: 0, top: 0, width: W, height: H, objectFit: 'cover', display: 'block', filter: filterCss,
      transformOrigin: '50% 50%', transform: `translate(${tx}px, ${ty}px) scale(${s})`, transition: tr, WebkitTransition: tr,
      userSelect: 'none', pointerEvents: 'none'
    };
  };

  const btnReset = { appearance: 'none', border: 'none', background: 'transparent', padding: 0, margin: 0, font: 'inherit', color: 'inherit', cursor: 'pointer' };
  const titleSize = Math.round(Math.min(compact ? W * 0.16 : W * titleScale, H * 0.24));
  const title = titleFor(shown);
  const words = title.split(/\s+/);
  const headWords = headline.split(/\s+/);
  const headSize = compact ? Math.round(headlineSize * 0.78) : headlineSize;

  if (!images.length) {
    return (
      <section className="hero-grid-fullscreen" style={{ width: '100%', height: 520, background: bg, color: muted, display: 'grid', placeItems: 'center', fontFamily: sans, fontSize: 13, letterSpacing: '0.08em' }}>
        Add image URLs to build the index
      </section>
    );
  }

  return (
    <section
      ref={rootRef}
      className={`hero-grid-fullscreen ${p}`}
      role="region"
      aria-label={eyebrow}
      tabIndex={0}
      onKeyDown={onKey}
      onScroll={(e) => { e.currentTarget.scrollTop = 0; e.currentTarget.scrollLeft = 0; }}
      style={{ position: 'relative', width: '100%', height: H, overflow: 'hidden', background: bg, color: ink, fontFamily: sans, outline: 'none', isolation: 'isolate' }}
    >
      <style>{`
        @keyframes ${p}-rise { from { transform: translateY(110%); } to { transform: translateY(0); } }
        @keyframes ${p}-fade { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
        @keyframes ${p}-wipeN { from { clip-path: inset(0 0 0 100%); } to { clip-path: inset(0 0 0 0); } }
        @keyframes ${p}-wipeP { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0 0 0 0); } }
        @keyframes ${p}-settle { from { transform: scale(1.18) translateX(var(--dx)); } to { transform: scale(1) translateX(0); } }
        @keyframes ${p}-dim { 0% { opacity: 0; } 45% { opacity: 1; } 100% { opacity: 1; } }
        .${p}:focus-visible { box-shadow: inset 0 0 0 2px ${ink}; }
        .${p} button:focus-visible { outline: 2px solid currentColor; outline-offset: 3px; }
        .${p} .${p}-ctl { transition: background .35s, border-color .35s, color .35s; }
        .${p} .${p}-ctl:hover { background: ${onImg}; color: ${ink}; border-color: ${onImg}; }
        @media (prefers-reduced-motion: reduce) { .${p} * { animation: none !important; transition: none !important; } }
      `}</style>

      {rects.map((r, i) => (
        <button
          key={i}
          type="button"
          aria-label={`Open ${titleFor(i)}`}
          aria-expanded={isFull && i === act}
          tabIndex={isFull ? -1 : 0}
          onClick={() => { interacted.current = true; open(i); }}
          onMouseEnter={() => setHoverIdx(i)}
          onMouseLeave={() => setHoverIdx(-1)}
          onFocus={() => setHoverIdx(i)}
          onBlur={() => setHoverIdx(-1)}
          style={{ ...btnReset, ...tileStyle(i), cursor: isFull ? 'default' : 'zoom-in' }}
        >
          <img src={imgFor(i)} alt="" draggable="false" style={imgStyle(i)} />
        </button>
      ))}

      {scrimA > 0 && (
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, zIndex: 4, pointerEvents: 'none',
          background: `linear-gradient(180deg, rgba(0,0,0,${scrimA * 0.5}) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) 46%, rgba(0,0,0,${scrimA * 0.75}) 82%, rgba(0,0,0,${scrimA}) 100%)`,
          opacity: isFull ? 1 : 0, transition: reduced ? 'none' : `opacity ${isFull ? dur : 450}ms ${easeOut} ${isFull ? Math.round(dur * 0.4) : 0}ms`
        }} />
      )}

      {overlays.length > 0 && (
        <div aria-hidden="true" key={'dim' + overlays[overlays.length - 1].key} style={{ position: 'absolute', inset: 0, zIndex: 3, background: 'rgba(0,0,0,0.5)', pointerEvents: 'none', animation: `${p}-dim ${switchDur}ms ${ease} both` }} />
      )}
      {overlays.map((o) => (
        <div key={o.key} aria-hidden="true" onAnimationEnd={(e) => { if (e.target === e.currentTarget) onOverlayEnd(o.key); }}
          style={{ position: 'absolute', inset: 0, zIndex: 3, overflow: 'hidden', animation: `${o.dir > 0 ? p + '-wipeN' : p + '-wipeP'} ${switchDur}ms ${ease} both` }}>
          <img src={imgFor(o.idx)} alt="" draggable="false" style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: filterCss,
            '--dx': `${o.dir * 6}%`, animation: `${p}-settle ${Math.round(switchDur * 1.25)}ms ${easeOut} both`
          }} />
        </div>
      ))}

      <div style={{ position: 'absolute', left: headRect.x, top: headRect.y, width: headRect.w, height: headRect.h, zIndex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', pointerEvents: isFull ? 'none' : 'auto' }}>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ transform: isFull ? 'translateY(-110%)' : 'translateY(0)', transition: reduced ? 'none' : `transform 700ms ${isFull ? ease : easeOut} ${isFull ? 0 : 500}ms` }}>
            <div style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: muted, fontWeight: 500, animation: reduced ? 'none' : `${p}-rise 900ms ${easeOut} 100ms both` }}>{eyebrow}</div>
          </div>
        </div>
        <div>
          <h1 aria-label={headline} style={{ margin: 0, fontFamily: display, fontWeight: 400, fontSize: headSize, lineHeight: 1.02, letterSpacing: serifish ? '-0.01em' : '-0.035em', color: ink }}>
            {headWords.map((w, i) => (
              <span key={i} aria-hidden="true" style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', paddingBottom: '0.1em', marginBottom: '-0.1em' }}>
                <span style={{
                  display: 'inline-block',
                  transform: isFull ? 'translateY(-115%)' : 'translateY(0)',
                  transition: reduced ? 'none' : `transform ${isFull ? 650 : 900}ms ${isFull ? ease : easeOut} ${isFull ? i * 25 : 520 + i * 45}ms`
                }}>
                  <span style={{ display: 'inline-block', whiteSpace: 'pre', animation: reduced ? 'none' : `${p}-rise 1000ms ${easeOut} ${180 + i * 55}ms both` }}>{w + (i < headWords.length - 1 ? ' ' : '')}</span>
                </span>
              </span>
            ))}
          </h1>
          {!compact && (
            <div style={{ opacity: isFull ? 0 : 1, transition: reduced ? 'none' : `opacity 500ms ${easeOut} ${isFull ? 0 : 700}ms` }}>
              <p style={{ margin: '18px 0 0', maxWidth: 280, fontSize: 13, lineHeight: 1.55, color: muted, animation: reduced ? 'none' : `${p}-fade 900ms ${easeOut} 500ms both` }}>{intro}</p>
            </div>
          )}
          <div style={{ opacity: isFull ? 0 : 1, transition: reduced ? 'none' : `opacity 500ms ${easeOut} ${isFull ? 0 : 760}ms` }}>
            <div style={{ marginTop: compact ? 10 : 22, display: 'flex', alignItems: 'center', gap: 10, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: ink, animation: reduced ? 'none' : `${p}-fade 900ms ${easeOut} 650ms both` }}>
              <span style={{ width: 22, height: 1, background: ink, display: 'inline-block' }} />
              {pad2(T)} projects — select one
            </div>
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', inset: 0, zIndex: 5, pointerEvents: 'none', color: onImg }} aria-hidden={!isFull}>
        <div style={{ position: 'absolute', top: pad + 6, left: pad + 4, right: pad + 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
          <button type="button" onClick={back} tabIndex={isFull ? 0 : -1} className={`${p}-ctl`}
            style={{
              ...btnReset, pointerEvents: isFull ? 'auto' : 'none', display: 'inline-flex', alignItems: 'center', gap: 10,
              height: 40, padding: '0 18px 0 14px', borderRadius: 999, border: `1px solid ${onImg}66`, color: onImg,
              backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', background: 'rgba(0,0,0,0.12)',
              fontSize: 12, letterSpacing: '0.08em',
              opacity: isFull ? 1 : 0, transform: isFull ? 'translateY(0)' : 'translateY(-12px)',
              transition: reduced ? 'none' : `opacity 600ms ${easeOut} ${isFull ? dur * 0.7 : 0}ms, transform 800ms ${easeOut} ${isFull ? dur * 0.7 : 0}ms, background .35s, color .35s, border-color .35s`
            }}>
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><rect x="1.5" y="1.5" width="5" height="5" fill="none" stroke="currentColor" strokeWidth="1.2" /><rect x="9.5" y="1.5" width="5" height="5" fill="none" stroke="currentColor" strokeWidth="1.2" /><rect x="1.5" y="9.5" width="5" height="5" fill="none" stroke="currentColor" strokeWidth="1.2" /><rect x="9.5" y="9.5" width="5" height="5" fill="none" stroke="currentColor" strokeWidth="1.2" /></svg>
            {backLabel}
          </button>
          <div aria-live="polite" style={{
            fontSize: 12, letterSpacing: '0.12em', fontVariantNumeric: 'tabular-nums',
            opacity: isFull ? 1 : 0, transition: reduced ? 'none' : `opacity 600ms ${easeOut} ${isFull ? dur * 0.75 : 0}ms`
          }}>{isFull ? `${pad2(shown + 1)} / ${pad2(T)}` : ''}</div>
        </div>

        <div style={{
          position: 'absolute', left: pad + 4, right: pad + 4, bottom: pad + (compact ? 70 : 8),
          opacity: isFull ? 1 : 0, transform: isFull ? 'translateY(0)' : 'translateY(24px)',
          transition: reduced ? 'none' : `opacity ${isFull ? 200 : 450}ms ${easeOut}, transform 600ms ${easeOut}`
        }}>
          {(isFull || openCount > 0) && (
            <div key={`${shown}-${openCount}`}>
              <div style={{ overflow: 'hidden', marginBottom: compact ? 8 : 14 }}>
                <div style={{ fontSize: compact ? 11 : 12, letterSpacing: '0.16em', textTransform: 'uppercase', animation: reduced ? 'none' : `${p}-rise 900ms ${easeOut} ${overlays.length ? 200 : Math.round(dur * 0.62)}ms both` }}>
                  {captionFor(shown)}
                </div>
              </div>
              <h2 aria-label={title} style={{ margin: 0, fontFamily: display, fontWeight: titleWeight, fontSize: titleSize, lineHeight: 0.92, letterSpacing: serifish ? '-0.02em' : '-0.05em', maxWidth: compact ? '100%' : '86%' }}>
                {words.map((w, i) => (
                  <span key={i} aria-hidden="true" style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', paddingBottom: '0.12em', marginBottom: '-0.12em' }}>
                    <span style={{ display: 'inline-block', whiteSpace: 'pre', animation: reduced ? 'none' : `${p}-rise 1200ms ${easeOut} ${(overlays.length ? 260 : Math.round(dur * 0.55)) + i * 90}ms both` }}>
                      {w + (i < words.length - 1 ? ' ' : '')}
                    </span>
                  </span>
                ))}
              </h2>
            </div>
          )}
        </div>

        {showArrows && T > 1 && (
          <div style={{
            position: 'absolute', right: pad + 4, bottom: pad + (compact ? 8 : 18), display: 'flex', gap: 10,
            opacity: isFull ? 1 : 0, transition: reduced ? 'none' : `opacity 600ms ${easeOut} ${isFull ? dur * 0.8 : 0}ms`
          }}>
            {[-1, 1].map((d) => (
              <button key={d} type="button" className={`${p}-ctl`} tabIndex={isFull ? 0 : -1} aria-label={d < 0 ? 'Previous project' : 'Next project'} onClick={() => step(d)}
                style={{ ...btnReset, pointerEvents: isFull ? 'auto' : 'none', width: 48, height: 48, borderRadius: '50%', border: `1px solid ${onImg}66`, color: onImg, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', background: 'rgba(0,0,0,0.12)' }}>
                <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" style={{ transform: d < 0 ? 'scaleX(-1)' : 'none' }}><path d="M3 9 H15 M10 4 L15 9 L10 14" fill="none" stroke="currentColor" strokeWidth="1.25" /></svg>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

const MANIFEST = {
  "type": "Section.BentoMorph",
  "description": "Bento feature grid of photographs, big numbers and short statements: tiles tilt in 3D with a light sheen that follows the pointer, and a click morphs the tile into the whole grid area (clip-path FLIP with the photo gliding into a new frame and the number scaling into place) while its neighbours shrink and fade; close reverses it",
  "editorElement": {
    "selector": ".bento-morph",
    "displayName": "Bento Morph",
    "archetype": "container",
    "data": {
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Casa Ribeira — Porto", "group": "Content" },
      "headline": { "dataType": "text", "displayName": "Headline", "defaultValue": "A small hotel, considered from every side", "group": "Content" },
      "subtext": { "dataType": "text", "displayName": "Supporting Text", "defaultValue": "Twelve rooms in a restored merchant's house on the Douro. Open any tile to look closer.", "group": "Content" },
      "ctaLabel": { "dataType": "text", "displayName": "Expanded Button Label", "defaultValue": "Check availability", "group": "Content" },
      "tile1Title": { "dataType": "text", "displayName": "Tile 1 Title", "defaultValue": "Above the old harbour", "group": "Tiles" },
      "tile1Text": { "dataType": "text", "displayName": "Tile 1 Short Text", "defaultValue": "Ribeira, since 1791", "group": "Tiles" },
      "tile1Body": { "dataType": "text", "displayName": "Tile 1 Expanded Text", "defaultValue": "Stone stairs, cork floors and shutters that open straight onto the river. We kept everything the merchants built and changed only what made it hard to sleep.", "group": "Tiles" },
      "tile1Media": { "dataType": "text", "displayName": "Tile 1 Image URL or Number", "defaultValue": "https://picsum.photos/id/1065/1600/1100", "group": "Tiles" },
      "tile2Title": { "dataType": "text", "displayName": "Tile 2 Title", "defaultValue": "Rooms", "group": "Tiles" },
      "tile2Text": { "dataType": "text", "displayName": "Tile 2 Short Text", "defaultValue": "Every one faces the water", "group": "Tiles" },
      "tile2Body": { "dataType": "text", "displayName": "Tile 2 Expanded Text", "defaultValue": "Nine doubles, two suites and a single attic room with a skylight over the bed. No two share a floor plan, all of them share the view.", "group": "Tiles" },
      "tile2Media": { "dataType": "text", "displayName": "Tile 2 Image URL or Number", "defaultValue": "12", "group": "Tiles" },
      "tile3Title": { "dataType": "text", "displayName": "Tile 3 Title", "defaultValue": "Breakfast until noon", "group": "Tiles" },
      "tile3Text": { "dataType": "text", "displayName": "Tile 3 Short Text", "defaultValue": "Served wherever you are", "group": "Tiles" },
      "tile3Body": { "dataType": "text", "displayName": "Tile 3 Expanded Text", "defaultValue": "Pastéis from the bakery next door, eggs from Minho, coffee roasted across the bridge. On the terrace, in bed, or packed for the train.", "group": "Tiles" },
      "tile3Media": { "dataType": "text", "displayName": "Tile 3 Image URL or Number", "defaultValue": "https://picsum.photos/id/1068/1100/1600", "group": "Tiles" },
      "tile4Title": { "dataType": "text", "displayName": "Tile 4 Title", "defaultValue": "“The quietest address on the river.”", "group": "Tiles" },
      "tile4Text": { "dataType": "text", "displayName": "Tile 4 Short Text", "defaultValue": "— A travel journal, 2026", "group": "Tiles" },
      "tile4Body": { "dataType": "text", "displayName": "Tile 4 Expanded Text", "defaultValue": "Walls a metre thick, double shutters and a no-music rule in every shared room. The loudest thing here is the tide against the quay.", "group": "Tiles" },
      "tile4Media": { "dataType": "text", "displayName": "Tile 4 Image URL or Number", "defaultValue": "", "group": "Tiles" },
      "tile5Title": { "dataType": "text", "displayName": "Tile 5 Title", "defaultValue": "Guest rating", "group": "Tiles" },
      "tile5Text": { "dataType": "text", "displayName": "Tile 5 Short Text", "defaultValue": "From 1,200 verified stays", "group": "Tiles" },
      "tile5Body": { "dataType": "text", "displayName": "Tile 5 Expanded Text", "defaultValue": "Guests mention the silence first, the breakfast second and the staff who remember how they take their coffee third.", "group": "Tiles" },
      "tile5Media": { "dataType": "text", "displayName": "Tile 5 Image URL or Number", "defaultValue": "4.9", "group": "Tiles" },
      "tile6Title": { "dataType": "text", "displayName": "Tile 6 Title", "defaultValue": "A private jetty", "group": "Tiles" },
      "tile6Text": { "dataType": "text", "displayName": "Tile 6 Short Text", "defaultValue": "Sunrise swims, sunset boats", "group": "Tiles" },
      "tile6Body": { "dataType": "text", "displayName": "Tile 6 Expanded Text", "defaultValue": "Our rabelo boat leaves at six for the wine estates upriver and comes back for dinner. Mornings, the jetty is yours.", "group": "Tiles" },
      "tile6Media": { "dataType": "text", "displayName": "Tile 6 Image URL or Number", "defaultValue": "https://picsum.photos/id/1051/1800/900", "group": "Tiles" },
      "tile7Title": { "dataType": "text", "displayName": "Tile 7 Title", "defaultValue": "Book direct", "group": "Tiles" },
      "tile7Text": { "dataType": "text", "displayName": "Tile 7 Short Text", "defaultValue": "Late checkout and breakfast included", "group": "Tiles" },
      "tile7Body": { "dataType": "text", "displayName": "Tile 7 Expanded Text", "defaultValue": "Reserve with us and we'll hold your room until 2pm on the last day, add breakfast for two and meet you at São Bento.", "group": "Tiles" },
      "tile7Media": { "dataType": "text", "displayName": "Tile 7 Image URL or Number", "defaultValue": "", "group": "Tiles" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#F3F2EE", "group": "Colors" },
      "tileColor": { "dataType": "color", "displayName": "Light Tile", "defaultValue": "#FFFFFF", "group": "Colors" },
      "darkTileColor": { "dataType": "color", "displayName": "Dark Tile", "defaultValue": "#1C1917", "group": "Colors" },
      "accentTileColor": { "dataType": "color", "displayName": "Accent Tile", "defaultValue": "#E6DCCB", "group": "Colors" },
      "textColor": { "dataType": "color", "displayName": "Text", "defaultValue": "#1C1917", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#78716C", "group": "Colors" },
      "displayFont": { "dataType": "select", "displayName": "Display Font", "defaultValue": "Instrument Serif", "options": ["Instrument Serif", "Fraunces", "Inter Tight", "Inter"], "group": "Typography" },
      "radius": { "dataType": "select", "displayName": "Tile Radius", "defaultValue": "20", "options": ["0", "8", "14", "20", "28"], "group": "Layout" },
      "gap": { "dataType": "select", "displayName": "Gap", "defaultValue": "12", "options": ["6", "12", "18"], "group": "Layout" },
      "tilt": { "dataType": "select", "displayName": "Hover Tilt", "defaultValue": "medium", "options": ["off", "subtle", "medium", "strong"], "group": "Animation" },
      "morphDuration": { "dataType": "select", "displayName": "Morph Duration (ms)", "defaultValue": "900", "options": ["650", "900", "1200"], "group": "Animation" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const eyebrow = config?.eyebrow || 'Casa Ribeira — Porto';
  const headline = config?.headline || 'A small hotel, considered from every side';
  const subtext = config?.subtext || "Twelve rooms in a restored merchant's house on the Douro. Open any tile to look closer.";
  const ctaLabel = config?.ctaLabel || 'Check availability';
  const defaults = [
    ['Above the old harbour', 'Ribeira, since 1791', 'Stone stairs, cork floors and shutters that open straight onto the river. We kept everything the merchants built and changed only what made it hard to sleep.', 'https://picsum.photos/id/1065/1600/1100'],
    ['Rooms', 'Every one faces the water', 'Nine doubles, two suites and a single attic room with a skylight over the bed. No two share a floor plan, all of them share the view.', '12'],
    ['Breakfast until noon', 'Served wherever you are', 'Pastéis from the bakery next door, eggs from Minho, coffee roasted across the bridge. On the terrace, in bed, or packed for the train.', 'https://picsum.photos/id/1068/1100/1600'],
    ['“The quietest address on the river.”', '— A travel journal, 2026', 'Walls a metre thick, double shutters and a no-music rule in every shared room. The loudest thing here is the tide against the quay.', ''],
    ['Guest rating', 'From 1,200 verified stays', 'Guests mention the silence first, the breakfast second and the staff who remember how they take their coffee third.', '4.9'],
    ['A private jetty', 'Sunrise swims, sunset boats', "Our rabelo boat leaves at six for the wine estates upriver and comes back for dinner. Mornings, the jetty is yours.", 'https://picsum.photos/id/1051/1800/900'],
    ['Book direct', 'Late checkout and breakfast included', "Reserve with us and we'll hold your room until 2pm on the last day, add breakfast for two and meet you at São Bento.", ''],
  ];
  const tiles = defaults.map((d, i) => {
    const n = i + 1;
    const media = config?.[`tile${n}Media`] !== undefined && config?.[`tile${n}Media`] !== null ? String(config[`tile${n}Media`]).trim() : d[3];
    const kind = /^(https?:)?\/\//.test(media) || /^data:image/.test(media) ? 'image' : media ? 'number' : 'text';
    return { title: config?.[`tile${n}Title`] || d[0], text: config?.[`tile${n}Text`] || d[1], body: config?.[`tile${n}Body`] || d[2], media, kind };
  });
  const bg = config?.backgroundColor || '#F3F2EE';
  const tileLight = config?.tileColor || '#FFFFFF';
  const tileDark = config?.darkTileColor || '#1C1917';
  const tileAccent = config?.accentTileColor || '#E6DCCB';
  const text = config?.textColor || '#1C1917';
  const muted = config?.mutedColor || '#78716C';
  const displayFont = config?.displayFont || 'Instrument Serif';
  const R = parseInt(config?.radius ?? '20', 10) || 0;
  const G = parseInt(config?.gap || '12', 10) || 12;
  const tiltDeg = { off: 0, subtle: 3, medium: 6, strong: 10 }[config?.tilt || 'medium'] ?? 6;
  const D = parseInt(config?.morphDuration || '900', 10) || 900;

  const uid = React.useMemo(() => 'bm' + Math.random().toString(36).slice(2, 9), []);
  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  const rootRef = React.useRef(null);
  const stageRef = React.useRef(null);
  const tileRefs = React.useRef([]);
  const btnRefs = React.useRef([]);
  const closeRef = React.useRef(null);
  const closeTimer = React.useRef(0);
  const [width, setWidth] = React.useState(1280);
  const [open, setOpen] = React.useState(-1);
  const [closing, setClosing] = React.useState(-1);
  const [entered, setEntered] = React.useState(reduced);
  const [settled, setSettled] = React.useState(reduced);

  React.useEffect(() => {
    const families = { 'Instrument Serif': 'Instrument+Serif:ital@0;1', 'Fraunces': 'Fraunces:opsz,wght@9..144,300..500', 'Inter Tight': 'Inter+Tight:wght@300..500' };
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
    const measure = () => setWidth(el.clientWidth || 1280);
    measure();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (ro) ro.observe(el);
    window.addEventListener('resize', measure);
    let t1 = 0; let t2 = 0;
    if (!reduced) {
      t1 = setTimeout(() => setEntered(true), 60);
      t2 = setTimeout(() => setSettled(true), 60 + 7 * 70 + 1000);
    }
    return () => { if (ro) ro.disconnect(); window.removeEventListener('resize', measure); clearTimeout(t1); clearTimeout(t2); clearTimeout(closeTimer.current); };
  }, [reduced]);

  const expand = (i) => {
    clearTimeout(closeTimer.current);
    setClosing(-1);
    setOpen(i);
    setTimeout(() => { if (closeRef.current) closeRef.current.focus({ preventScroll: true }); }, reduced ? 0 : Math.round(D * 0.6));
  };
  const collapse = () => {
    if (open < 0) return;
    const i = open;
    setClosing(i);
    setOpen(-1);
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setClosing(-1), D + 80);
    const b = btnRefs.current[i]; if (b) b.focus({ preventScroll: true });
  };
  const onKeyDown = (e) => { if (e.key === 'Escape' && open >= 0) { e.preventDefault(); collapse(); } };

  const compact = width < 760;
  const pad = compact ? 20 : Math.max(40, Math.round(width * 0.04));
  const W = Math.max(280, width - pad * 2);
  const cols = compact ? 2 : 4;
  const areas = compact
    ? [[0, 0, 2, 2], [0, 2, 1, 1], [1, 2, 1, 2], [0, 3, 1, 1], [0, 4, 1, 1], [0, 5, 2, 1], [1, 4, 1, 1]]
    : [[0, 0, 2, 2], [2, 0, 1, 1], [3, 0, 1, 2], [2, 1, 1, 1], [0, 2, 1, 1], [1, 2, 2, 1], [3, 2, 1, 1]];
  const rows = compact ? 6 : 3;
  const colW = (W - G * (cols - 1)) / cols;
  const rowH = compact ? Math.round(colW * 0.92) : Math.round(Math.min(220, Math.max(160, W * 0.16)));
  const H = rowH * rows + G * (rows - 1);
  const rectOf = (i) => {
    const [c, r, cs, rs] = areas[i];
    return { x: c * (colW + G), y: r * (rowH + G), w: cs * colW + (cs - 1) * G, h: rs * rowH + (rs - 1) * G };
  };
  const shrinkRect = (r, k) => ({ x: r.x + (r.w * (1 - k)) / 2, y: r.y + (r.h * (1 - k)) / 2, w: r.w * k, h: r.h * k });
  const clipOf = (r, rad) => `inset(${r.y.toFixed(1)}px ${(W - r.x - r.w).toFixed(1)}px ${(H - r.y - r.h).toFixed(1)}px ${r.x.toFixed(1)}px round ${rad}px)`;
  const imageRectExpanded = compact
    ? { x: G, y: G, w: W - G * 2, h: Math.round(Math.min(H * 0.42, (W - G * 2) * 0.9)) }
    : { x: Math.round(W * 0.42), y: G, w: W - Math.round(W * 0.42) - G, h: H - G * 2 };
  const coverTransform = (r) => {
    const s = Math.max(r.w / W, r.h / H);
    const tx = r.x + r.w / 2 - (W * s) / 2; const ty = r.y + r.h / 2 - (H * s) / 2;
    return `translate(${tx.toFixed(1)}px, ${ty.toFixed(1)}px) scale(${s.toFixed(4)})`;
  };

  const sans = '"Inter", -apple-system, "Helvetica Neue", Arial, sans-serif';
  const display = displayFont === 'Inter' ? sans
    : displayFont === 'Inter Tight' ? '"Inter Tight", "Inter", -apple-system, sans-serif'
    : `"${displayFont}", "Iowan Old Style", Georgia, serif`;
  const serifLike = displayFont === 'Instrument Serif' || displayFont === 'Fraunces';
  const p = uid;
  const EM = 'cubic-bezier(.76,0,.24,1)';
  const E1 = 'cubic-bezier(.22,1,.36,1)';
  const pad2 = (n) => String(n).padStart(2, '0');
  const palette = (i, kind) => {
    if (kind === 'image') return { bgc: tileLight, fg: '#FAFAF9', sub: 'rgba(250,250,249,.78)' };
    if (i === 1 || i === 6) return { bgc: tileDark, fg: '#FAFAF9', sub: 'rgba(250,250,249,.62)' };
    if (i === 4) return { bgc: tileAccent, fg: text, sub: muted };
    return { bgc: tileLight, fg: text, sub: muted };
  };

  const onTileMove = (i) => (e) => {
    if (!tiltDeg || open >= 0 || compact) return;
    const b = btnRefs.current[i]; const t = tileRefs.current[i];
    if (!b || !t) return;
    const r = b.getBoundingClientRect();
    const u = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    const v = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
    const rect = rectOf(i);
    t.style.setProperty('--ry', `${((u - 0.5) * 2 * tiltDeg).toFixed(2)}deg`);
    t.style.setProperty('--rx', `${((0.5 - v) * 2 * tiltDeg * (rect.w / Math.max(rect.h, 1) > 1.4 ? 0.6 : 1)).toFixed(2)}deg`);
    t.style.setProperty('--sx', `${(rect.x + u * rect.w).toFixed(0)}px`);
    t.style.setProperty('--sy', `${(rect.y + v * rect.h).toFixed(0)}px`);
    t.style.setProperty('--so', '1');
    t.style.setProperty('--tz', '1');
  };
  const onTileLeave = (i) => () => {
    const t = tileRefs.current[i];
    if (!t) return;
    t.style.setProperty('--rx', '0deg'); t.style.setProperty('--ry', '0deg'); t.style.setProperty('--so', '0'); t.style.setProperty('--tz', '0');
  };
  React.useEffect(() => { if (open >= 0) tiles.forEach((_, i) => onTileLeave(i)()); }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  const numberFontC = (r) => Math.round(Math.min(r.h * 0.5, r.w * (compact ? 0.34 : 0.42), compact ? 72 : 120));
  const numberFontE = compact ? Math.round(Math.min(W * 0.42, 180)) : Math.round(Math.min(H * 0.56, 320));

  return (
    <section
      ref={rootRef}
      className={`bento-morph ${p}`}
      onKeyDown={onKeyDown}
      style={{ position: 'relative', width: '100%', background: bg, color: text, fontFamily: sans, padding: compact ? `52px ${pad}px 56px` : `${Math.round(pad * 1.1)}px ${pad}px ${Math.round(pad * 1.1)}px`, boxSizing: 'border-box', overflow: 'hidden' }}
    >
      <style>{`
        @keyframes ${p}-rise { from { opacity: 0; transform: translateY(22px); filter: blur(6px); } to { opacity: 1; transform: none; filter: blur(0); } }
        @keyframes ${p}-up { from { transform: translateY(105%); } to { transform: none; } }
        @keyframes ${p}-sweep { from { transform: translateX(-120%) skewX(-18deg); } to { transform: translateX(220%) skewX(-18deg); } }
        .${p} .${p}-btn:focus-visible { outline: 2px solid ${text}; outline-offset: 3px; border-radius: ${R}px; }
        .${p} .${p}-x:focus-visible, .${p} .${p}-cta:focus-visible { outline: 2px solid currentColor; outline-offset: 3px; }
        .${p} .${p}-x { transition: transform .5s ${E1}, background .3s; }
        .${p} .${p}-x:hover { transform: rotate(90deg); }
        .${p} .${p}-cta .${p}-ca { transition: transform .5s ${E1}; }
        .${p} .${p}-cta:hover .${p}-ca { transform: translateX(4px); }
        .${p} .${p}-btn .${p}-plus { transition: transform .6s ${E1}, opacity .4s; }
        .${p} .${p}-btn:hover .${p}-plus, .${p} .${p}-btn:focus-visible .${p}-plus { transform: rotate(90deg) scale(1.08); }
        @media (prefers-reduced-motion: reduce) { .${p} * { animation: none !important; transition: none !important; } }
      `}</style>

      <div style={{ display: 'flex', flexDirection: compact ? 'column' : 'row', justifyContent: 'space-between', alignItems: compact ? 'flex-start' : 'flex-end', gap: compact ? 16 : 40, marginBottom: compact ? 28 : 36 }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: muted, marginBottom: compact ? 12 : 16 }}>{eyebrow}</div>
          <h2 style={{ margin: 0, fontFamily: display, fontWeight: 400, fontSize: compact ? 36 : Math.round(Math.min(60, width * 0.042)), lineHeight: 1.02, letterSpacing: serifLike ? '-0.015em' : '-0.04em', maxWidth: 720 }}>
            {headline.split(' ').map((w, i, arr) => (
              <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', paddingBottom: '0.1em', marginBottom: '-0.1em' }}>
                <span style={{ display: 'inline-block', animation: reduced ? 'none' : `${p}-up 1000ms ${E1} ${60 + i * 45}ms both` }}>{w}{i < arr.length - 1 ? ' ' : ''}</span>
              </span>
            ))}
          </h2>
        </div>
        <p style={{ margin: 0, maxWidth: 340, fontSize: 15, lineHeight: 1.55, color: muted, fontWeight: 300 }}>{subtext}</p>
      </div>

      <div ref={stageRef} style={{ position: 'relative', width: W, height: H, perspective: 1400 }}>
        {tiles.map((t, i) => {
          const rect = rectOf(i);
          const eh = compact ? Math.min(H, t.kind === 'image' ? 820 : 640) : H;
          const oy = compact ? Math.max(0, Math.min(rect.y, H - eh)) : 0;
          const fullR = { x: 0, y: oy, w: W, h: eh };
          const imgE = { ...imageRectExpanded, y: imageRectExpanded.y + oy };
          const isOpen = open === i;
          const isClosing = closing === i;
          const other = open >= 0 && !isOpen;
          const pal = palette(i, t.kind);
          let r = rect;
          if (isOpen) r = fullR;
          else if (other) r = shrinkRect(rect, 0.9);
          else if (!entered) r = shrinkRect(rect, 0.86);
          const clip = clipOf(r, isOpen ? R + 4 : R);
          const z = isOpen ? 5 : isClosing ? 4 : 1;
          const entranceDelay = settled ? 0 : 90 + i * 70;
          const dur = reduced ? 0 : D;
          const imgR = isOpen ? imgE : r;
          const imgClip = clipOf(imgR, isOpen ? Math.max(0, R - 4) : R);
          const showExpanded = isOpen;
          const expFg = t.kind === 'image' ? text : pal.fg;
          const expSub = t.kind === 'image' ? muted : pal.sub;
          const nC = numberFontC(rect);
          const nPos = isOpen
            ? { x: compact ? 24 : Math.round(W * 0.05), y: oy + (compact ? 76 : Math.round(H * 0.12)), k: 1 }
            : { x: rect.x + (compact ? 18 : 26), y: rect.y + rect.h - (compact ? 18 : 26) - nC * 0.92 - (compact ? 62 : 50), k: nC / numberFontE };
          return (
            <div
              key={i}
              ref={(el) => { tileRefs.current[i] = el; }}
              style={{
                position: 'absolute', inset: 0, zIndex: z,
                clipPath: clip, WebkitClipPath: clip,
                opacity: other ? 0 : entered ? 1 : 0,
                pointerEvents: other ? 'none' : 'auto',
                transformOrigin: `${rect.x + rect.w / 2}px ${rect.y + rect.h / 2}px`,
                transform: 'rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateZ(calc(var(--tz, 0) * 14px))',
                transition: reduced ? 'none' : [
                  `clip-path ${dur}ms ${EM} ${other ? 0 : entranceDelay}ms`,
                  `-webkit-clip-path ${dur}ms ${EM} ${other ? 0 : entranceDelay}ms`,
                  `opacity ${other ? 420 : 700}ms ${other ? 'ease' : E1} ${other ? 60 : entranceDelay}ms`,
                  `transform 600ms ${E1}`,
                ].join(', '),
                willChange: 'clip-path, transform',
              }}
            >
              <div style={{ position: 'absolute', inset: 0, background: pal.bgc, transition: reduced ? 'none' : `background ${Math.round(D * 0.6)}ms ${EM}` }} />

              {t.kind === 'image' && (
                <div style={{ position: 'absolute', inset: 0, clipPath: imgClip, WebkitClipPath: imgClip, transition: reduced ? 'none' : `clip-path ${dur}ms ${EM}, -webkit-clip-path ${dur}ms ${EM}` }}>
                  <img src={t.media} alt={t.title} draggable="false" style={{
                    position: 'absolute', left: 0, top: 0, width: W, height: H, objectFit: 'cover', transformOrigin: '0 0',
                    transform: coverTransform(isOpen ? imgE : rect),
                    transition: reduced ? 'none' : `transform ${dur}ms ${EM}`,
                  }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,.5) 100%)', opacity: isOpen ? 0 : 1, transition: `opacity ${Math.round(D * 0.5)}ms ease` }} />
                </div>
              )}

              {t.kind === 'number' && (
                <div aria-hidden="true" style={{
                  position: 'absolute', left: 0, top: 0, fontFamily: display, fontWeight: 400, fontSize: numberFontE, lineHeight: 0.92, letterSpacing: serifLike ? '-0.03em' : '-0.06em', color: pal.fg,
                  transformOrigin: '0 0', transform: `translate(${nPos.x.toFixed(1)}px, ${nPos.y.toFixed(1)}px) scale(${nPos.k.toFixed(4)})`,
                  transition: reduced ? 'none' : `transform ${dur}ms ${EM}, color ${Math.round(D * 0.6)}ms ${EM}`, whiteSpace: 'nowrap', fontVariantNumeric: 'lining-nums',
                }}>{t.media}</div>
              )}

              <div aria-hidden="true" style={{
                position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: pal.fg === text && t.kind !== 'image' ? 'multiply' : 'soft-light',
                background: `radial-gradient(circle at var(--sx, 50%) var(--sy, 50%), ${t.kind === 'image' || pal.bgc === tileDark ? 'rgba(255,255,255,.55)' : 'rgba(255,255,255,.9)'} 0%, rgba(255,255,255,0) ${Math.round(Math.max(rect.w, rect.h) * 0.7)}px)`,
                opacity: 'var(--so, 0)', transition: 'opacity .5s ease',
              }} />
              {!settled && !reduced && (
                <div aria-hidden="true" style={{ position: 'absolute', left: rect.x, top: rect.y, width: rect.w, height: rect.h, overflow: 'hidden', pointerEvents: 'none' }}>
                  <div style={{ position: 'absolute', top: 0, bottom: 0, width: '45%', background: 'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,.22), rgba(255,255,255,0))', animation: `${p}-sweep 1300ms ${E1} ${600 + i * 90}ms both` }} />
                </div>
              )}

              <button
                ref={(el) => { btnRefs.current[i] = el; }}
                type="button"
                className={`${p}-btn`}
                aria-expanded={isOpen}
                aria-controls={`${p}-x-${i}`}
                aria-label={`${t.kind === 'number' ? t.media + ' ' : ''}${t.title}. ${t.text}`}
                tabIndex={open >= 0 ? -1 : 0}
                onClick={() => expand(i)}
                onPointerMove={onTileMove(i)}
                onPointerLeave={onTileLeave(i)}
                style={{
                  appearance: 'none', border: 'none', margin: 0, font: 'inherit', cursor: 'pointer', background: 'transparent', textAlign: 'left',
                  position: 'absolute', left: 0, top: 0, width: rect.w, height: rect.h, padding: compact ? 18 : 26, boxSizing: 'border-box',
                  transform: `translate(${(isOpen ? 0 : rect.x).toFixed(1)}px, ${(isOpen ? 0 : rect.y).toFixed(1)}px)`,
                  transition: reduced ? 'none' : `transform ${dur}ms ${EM}, opacity ${isOpen ? 200 : 500}ms ease ${isOpen ? 0 : Math.round(D * 0.6)}ms`,
                  opacity: isOpen ? 0 : 1, pointerEvents: open >= 0 ? 'none' : 'auto',
                  color: pal.fg, display: 'flex', flexDirection: 'column', justifyContent: t.kind === 'text' && i === 3 ? 'space-between' : 'flex-end',
                }}
              >
                <span className={`${p}-plus`} aria-hidden="true" style={{ position: 'absolute', top: compact ? 14 : 18, right: compact ? 14 : 18, width: 30, height: 30, borderRadius: '50%', display: 'grid', placeItems: 'center', background: t.kind === 'image' ? 'rgba(250,250,249,.18)' : `${pal.fg === text ? text : '#FAFAF9'}12`, backdropFilter: t.kind === 'image' ? 'blur(8px)' : 'none', WebkitBackdropFilter: t.kind === 'image' ? 'blur(8px)' : 'none' }}>
                  <svg width="12" height="12" viewBox="0 0 12 12"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.3" /></svg>
                </span>
                {t.kind === 'text' && i === 3 ? (
                  <>
                    <span style={{ fontFamily: display, fontSize: compact ? 22 : Math.round(Math.min(30, rect.w * 0.1)), lineHeight: 1.12, letterSpacing: serifLike ? '-0.01em' : '-0.03em', paddingRight: 36 }}>{t.title}</span>
                    <span style={{ fontSize: 12, color: pal.sub, letterSpacing: '0.02em' }}>{t.text}</span>
                  </>
                ) : (
                  <>
                    <span style={{ fontFamily: t.kind === 'number' ? sans : display, fontSize: t.kind === 'number' ? 14 : t.kind === 'image' && rect.w > colW * 1.5 ? (compact ? 26 : 34) : (compact ? 19 : 24), fontWeight: t.kind === 'number' ? 500 : 400, lineHeight: 1.1, letterSpacing: t.kind === 'number' ? 0 : serifLike ? '-0.01em' : '-0.03em', paddingRight: 36 }}>{t.title}</span>
                    <span style={{ marginTop: 6, fontSize: 13, color: pal.sub, lineHeight: 1.4 }}>{t.text}</span>
                  </>
                )}
              </button>

              {(isOpen || isClosing) && (
                <div id={`${p}-x-${i}`} role="region" aria-label={t.title} style={{ position: 'absolute', inset: 0, opacity: showExpanded ? 1 : 0, transition: `opacity ${showExpanded ? 300 : 220}ms ease`, color: expFg, pointerEvents: showExpanded ? 'auto' : 'none' }}>
                  <div style={{
                    position: 'absolute',
                    left: compact ? 24 : Math.round(W * 0.05),
                    top: oy + (t.kind === 'image' ? (compact ? imageRectExpanded.y + imageRectExpanded.h + 28 : Math.round(H * 0.12)) : (t.kind === 'number' ? (compact ? 76 + numberFontE * 0.95 + 20 : Math.round(H * 0.12)) : (compact ? 72 : Math.round(H * 0.12)))),
                    width: t.kind === 'image' ? (compact ? W - 48 : Math.round(W * 0.42) - Math.round(W * 0.05) - 48) : t.kind === 'number' ? (compact ? W - 48 : Math.round(W * 0.38)) : (compact ? W - 48 : Math.round(W * 0.62)),
                    ...(t.kind === 'number' && !compact ? { left: 'auto', right: Math.round(W * 0.06) } : {}),
                    display: 'flex', flexDirection: 'column', gap: 0,
                  }}>
                    {[
                      <div key="i" style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: expSub }}>{pad2(i + 1)} — {eyebrow}</div>,
                      <h3 key="t" style={{ margin: '18px 0 0', fontFamily: display, fontWeight: 400, fontSize: compact ? 34 : (t.kind === 'text' ? Math.round(Math.min(64, W * 0.05)) : Math.round(Math.min(52, W * 0.04))), lineHeight: 1.04, letterSpacing: serifLike ? '-0.015em' : '-0.04em' }}>{t.title}</h3>,
                      <div key="s" style={{ marginTop: 12, fontSize: 14, color: expSub }}>{t.text}</div>,
                      <p key="b" style={{ margin: compact ? '18px 0 0' : '26px 0 0', fontSize: compact ? 15 : 17, lineHeight: 1.6, fontWeight: 300, maxWidth: 460 }}>{t.body}</p>,
                      <a key="c" href="#" onClick={(e) => e.preventDefault()} className={`${p}-cta`} tabIndex={isOpen ? 0 : -1} style={{ marginTop: compact ? 24 : 34, alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: 12, height: 50, padding: '0 22px', borderRadius: 999, background: expFg, color: t.kind === 'image' ? '#FAFAF9' : pal.bgc, textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>
                        {ctaLabel}
                        <svg className={`${p}-ca`} width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.3" /></svg>
                      </a>,
                    ].map((node, k) => (
                      <div key={k} style={{ display: 'flex', flexDirection: 'column', animation: showExpanded && !reduced ? `${p}-rise 800ms ${E1} ${Math.round(D * 0.55) + k * 70}ms both` : 'none' }}>{node}</div>
                    ))}
                  </div>
                  <button
                    ref={isOpen ? closeRef : undefined}
                    type="button"
                    className={`${p}-x`}
                    aria-label="Close"
                    onClick={collapse}
                    tabIndex={isOpen ? 0 : -1}
                    style={{ appearance: 'none', border: 'none', margin: 0, padding: 0, cursor: 'pointer', position: 'absolute', top: oy + (compact ? 22 : 24), right: t.kind === 'image' && !compact ? imageRectExpanded.w + G + 24 : 24, ...(t.kind === 'image' && compact ? { top: oy + 24, right: 24 } : {}), width: 46, height: 46, borderRadius: '50%', display: 'grid', placeItems: 'center', background: t.kind === 'image' && compact ? 'rgba(250,250,249,.85)' : `${expFg}14`, color: t.kind === 'image' && compact ? text : expFg, animation: showExpanded && !reduced ? `${p}-rise 700ms ${E1} ${Math.round(D * 0.5)}ms both` : 'none' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.4" /></svg>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

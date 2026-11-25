const MANIFEST = {
  "type": "Gallery.TypeImageFill",
  "description": "Project index set as a stack of huge outlined grotesk words; hovering or focusing a word floods its letters with that project's photograph through a radial mask grown from the exact point the cursor entered (and drained toward where it leaves), the photo drifts with the pointer inside the letters, a mono caption card follows the cursor and the other words dim",
  "editorElement": {
    "selector": ".type-image-fill",
    "displayName": "Type Image Fill",
    "archetype": "container",
    "data": {
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Selected projects", "group": "Content" },
      "headerRight": { "dataType": "text", "displayName": "Header Right Label", "defaultValue": "Landscape & architecture photography", "group": "Content" },
      "item1Word": { "dataType": "text", "displayName": "Project 1 Word", "defaultValue": "Dune", "group": "Projects" },
      "item1Caption": { "dataType": "text", "displayName": "Project 1 Caption", "defaultValue": "Erg Chebbi, Morocco", "group": "Projects" },
      "item1Meta": { "dataType": "text", "displayName": "Project 1 Meta", "defaultValue": "Editorial · 2025", "group": "Projects" },
      "item2Word": { "dataType": "text", "displayName": "Project 2 Word", "defaultValue": "Alpine", "group": "Projects" },
      "item2Caption": { "dataType": "text", "displayName": "Project 2 Caption", "defaultValue": "Bernina Range, Switzerland", "group": "Projects" },
      "item2Meta": { "dataType": "text", "displayName": "Project 2 Meta", "defaultValue": "Campaign · 2024", "group": "Projects" },
      "item3Word": { "dataType": "text", "displayName": "Project 3 Word", "defaultValue": "Ember", "group": "Projects" },
      "item3Caption": { "dataType": "text", "displayName": "Project 3 Caption", "defaultValue": "Monte Amiata, Tuscany", "group": "Projects" },
      "item3Meta": { "dataType": "text", "displayName": "Project 3 Meta", "defaultValue": "Book · 2024", "group": "Projects" },
      "item4Word": { "dataType": "text", "displayName": "Project 4 Word", "defaultValue": "Tidal", "group": "Projects" },
      "item4Caption": { "dataType": "text", "displayName": "Project 4 Caption", "defaultValue": "Lofoten Coast, Norway", "group": "Projects" },
      "item4Meta": { "dataType": "text", "displayName": "Project 4 Meta", "defaultValue": "Exhibition · 2023", "group": "Projects" },
      "item5Word": { "dataType": "text", "displayName": "Project 5 Word", "defaultValue": "Canopy", "group": "Projects" },
      "item5Caption": { "dataType": "text", "displayName": "Project 5 Caption", "defaultValue": "Hoh Rainforest, Washington", "group": "Projects" },
      "item5Meta": { "dataType": "text", "displayName": "Project 5 Meta", "defaultValue": "Commission · 2023", "group": "Projects" },
      "images": { "dataType": "text", "displayName": "Image URLs (comma separated, one per project)", "defaultValue": "https://picsum.photos/id/184/1600/1000,https://picsum.photos/id/29/1600/1000,https://picsum.photos/id/416/1600/1000,https://picsum.photos/id/16/1600/1000,https://picsum.photos/id/28/1600/1000", "group": "Images" },
      "links": { "dataType": "text", "displayName": "Links (comma separated, optional)", "defaultValue": "", "group": "Projects" },
      "revealStyle": { "dataType": "select", "displayName": "Reveal Style", "defaultValue": "radial", "options": ["radial", "sweep"], "group": "Animation" },
      "revealDuration": { "dataType": "select", "displayName": "Reveal Duration (ms)", "defaultValue": "900", "options": ["600", "900", "1300"], "group": "Animation" },
      "drift": { "dataType": "select", "displayName": "Photo Drift (px)", "defaultValue": "36", "options": ["0", "18", "36", "60"], "group": "Animation" },
      "showCaption": { "dataType": "booleanValue", "displayName": "Caption Card", "defaultValue": "true", "group": "Layout" },
      "dimOthers": { "dataType": "booleanValue", "displayName": "Dim Other Words", "defaultValue": "true", "group": "Layout" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#F3F2EF", "group": "Colors" },
      "outlineColor": { "dataType": "color", "displayName": "Outline", "defaultValue": "#0B0B0C", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#77746E", "group": "Colors" },
      "lineColor": { "dataType": "color", "displayName": "Rules", "defaultValue": "#D9D7D1", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent", "defaultValue": "#D9480F", "group": "Colors" },
      "cardColor": { "dataType": "color", "displayName": "Caption Card", "defaultValue": "#0B0B0C", "group": "Colors" },
      "cardTextColor": { "dataType": "color", "displayName": "Caption Card Text", "defaultValue": "#F3F2EF", "group": "Colors" },
      "font": { "dataType": "select", "displayName": "Word Font", "defaultValue": "Inter Tight", "options": ["Inter Tight", "Archivo", "Geist", "Manrope", "Hanken Grotesk"], "group": "Typography" },
      "wordWeight": { "dataType": "select", "displayName": "Word Weight", "defaultValue": "500", "options": ["300", "400", "500"], "group": "Typography" },
      "strokeWidth": { "dataType": "select", "displayName": "Outline Width (px)", "defaultValue": "1.2", "options": ["0.8", "1.2", "1.6", "2"], "group": "Typography" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const D = [
    ['Dune', 'Erg Chebbi, Morocco', 'Editorial · 2025'],
    ['Alpine', 'Bernina Range, Switzerland', 'Campaign · 2024'],
    ['Ember', 'Monte Amiata, Tuscany', 'Book · 2024'],
    ['Tidal', 'Lofoten Coast, Norway', 'Exhibition · 2023'],
    ['Canopy', 'Hoh Rainforest, Washington', 'Commission · 2023']
  ];
  const imgs = String(config?.images || 'https://picsum.photos/id/184/1600/1000,https://picsum.photos/id/29/1600/1000,https://picsum.photos/id/416/1600/1000,https://picsum.photos/id/16/1600/1000,https://picsum.photos/id/28/1600/1000').split(',').map((s) => s.trim()).filter(Boolean);
  const links = String(config?.links || '').split(',').map((s) => s.trim());
  const items = D.map((d, i) => ({
    word: config?.[`item${i + 1}Word`] ?? d[0],
    caption: config?.[`item${i + 1}Caption`] ?? d[1],
    meta: config?.[`item${i + 1}Meta`] ?? d[2],
    image: imgs.length ? imgs[i % imgs.length] : '',
    link: links[i] || ''
  })).filter((it) => String(it.word || '').trim());

  const eyebrow = config?.eyebrow || 'Selected projects';
  const headerRight = config?.headerRight || 'Landscape & architecture photography';
  const revealStyle = config?.revealStyle || 'radial';
  const revealMs = parseInt(config?.revealDuration || '900', 10) || 900;
  const drift = parseFloat(config?.drift || '36') || 0;
  const showCaption = bool(config?.showCaption, true);
  const dimOthers = bool(config?.dimOthers, true);
  const bg = config?.backgroundColor || '#F3F2EF';
  const ink = config?.outlineColor || '#0B0B0C';
  const muted = config?.mutedColor || '#77746E';
  const line = config?.lineColor || '#D9D7D1';
  const accent = config?.accentColor || '#D9480F';
  const cardBg = config?.cardColor || '#0B0B0C';
  const cardText = config?.cardTextColor || '#F3F2EF';
  const fontName = config?.font || 'Inter Tight';
  const weight = config?.wordWeight || '500';
  const stroke = parseFloat(config?.strokeWidth || '1.2') || 1.2;

  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const uid = React.useMemo(() => 'tf' + Math.random().toString(36).slice(2, 8), []);

  React.useEffect(() => {
    const fam = {
      'Inter Tight': 'Inter+Tight:wght@300;400;500',
      'Archivo': 'Archivo:wght@300;400;500',
      'Geist': 'Geist:wght@300;400;500',
      'Manrope': 'Manrope:wght@300;400;500',
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

  const rootRef = React.useRef(null);
  const wordRefs = React.useRef([]);
  const fillRefs = React.useRef([]);
  const cardRef = React.useRef(null);
  const rowRefs = React.useRef([]);
  const motion = React.useRef({ raf: 0, card: { x: 0, y: 0 }, cardT: { x: 0, y: 0 }, bg: [], bgT: [], pointer: false, init: false });
  const [width, setWidth] = React.useState(1280);
  const [active, setActive] = React.useState(0);
  const [hovering, setHovering] = React.useState(false);

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return undefined;
    const measure = () => setWidth(el.clientWidth || 1280);
    measure();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (ro) ro.observe(el);
    return () => { if (ro) ro.disconnect(); cancelAnimationFrame(motion.current.raf); };
  }, []);

  const local = (el, cx, cy) => {
    const r = el.getBoundingClientRect();
    const sx = el.offsetWidth / (r.width || 1);
    const sy = el.offsetHeight / (r.height || 1);
    return { x: (cx - r.left) * sx, y: (cy - r.top) * sy, w: el.offsetWidth, h: el.offsetHeight };
  };
  const shape = (r, x, y, w, h) => (revealStyle === 'sweep'
    ? `inset(0 ${Math.max(0, w - (r <= 0 ? 0 : Math.min(w, x + r)))}px 0 ${Math.max(0, r <= 0 ? w : x - r)}px)`
    : `circle(${Math.max(0, r)}px at ${x}px ${y}px)`);

  const fillIn = (i, x, y, instant) => {
    const el = fillRefs.current[i];
    const w = wordRefs.current[i];
    if (!el || !w) return;
    const W = w.offsetWidth; const H = w.offsetHeight;
    const R = Math.hypot(Math.max(x, W - x), Math.max(y, H - y)) + 4;
    const cur = getComputedStyle(el).clipPath || '';
    const m = cur.match(/circle\(([\d.]+)px/);
    const visible = !!(m && parseFloat(m[1]) > 3);
    if (instant || reduced) {
      el.style.transition = 'none';
      el.style.clipPath = shape(R, x, y, W, H);
      return;
    }
    if (!visible || revealStyle === 'sweep') {
      el.style.transition = 'none';
      el.style.clipPath = shape(0, x, y, W, H);
      void el.offsetWidth;
    }
    el.style.transition = `clip-path ${revealMs}ms cubic-bezier(0.22,1,0.36,1)`;
    el.style.clipPath = shape(R, x, y, W, H);
  };
  const fillOut = (i, x, y) => {
    const el = fillRefs.current[i];
    const w = wordRefs.current[i];
    if (!el || !w) return;
    el.style.transition = reduced ? 'none' : `clip-path ${Math.round(revealMs * 0.6)}ms cubic-bezier(0.3,0,0.2,1)`;
    el.style.clipPath = shape(0, x, y, w.offsetWidth, w.offsetHeight);
  };

  const activeRef = React.useRef(0);
  const activate = (i, x, y) => {
    const prev = activeRef.current;
    if (prev === i) return;
    const pw = wordRefs.current[prev];
    if (pw) {
      const ex = x === undefined ? pw.offsetWidth / 2 : Math.min(pw.offsetWidth, Math.max(0, x));
      fillOut(prev, ex, i > prev ? pw.offsetHeight : 0);
    }
    activeRef.current = i;
    setActive(i);
    const w = wordRefs.current[i];
    if (w) fillIn(i, x === undefined ? w.offsetWidth / 2 : x, y === undefined ? w.offsetHeight / 2 : y);
  };

  // initial: first word sweeps in from the left
  React.useEffect(() => {
    const t = setTimeout(() => {
      const w = wordRefs.current[0];
      if (!w) return;
      fillIn(0, 0, w.offsetHeight * 0.5, false);
    }, reduced ? 0 : 450);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    // keep the active fill covering after resize
    const w = wordRefs.current[activeRef.current];
    if (w) fillIn(activeRef.current, w.offsetWidth / 2, w.offsetHeight / 2, true);
  }, [width]); // eslint-disable-line react-hooks/exhaustive-deps

  const idleCardPos = () => {
    const root = rootRef.current; const w = wordRefs.current[activeRef.current];
    if (!root || !w) return { x: 0, y: 0 };
    const rr = root.getBoundingClientRect(); const wr = w.getBoundingClientRect();
    const s = root.offsetWidth / (rr.width || 1);
    const compactNow = root.offsetWidth < 760;
    return compactNow
      ? { x: Math.min(root.offsetWidth - 230, (wr.left - rr.left) * s + 6), y: (wr.bottom - rr.top) * s - 10 }
      : { x: (wr.right - rr.left) * s + 28, y: (wr.top - rr.top) * s + (wr.height * s) * 0.18 };
  };

  const loop = () => {
    const M = motion.current;
    let moving = false;
    if (!M.pointer) M.cardT = idleCardPos();
    if (!M.init) { M.card = { ...M.cardT }; M.init = true; }
    const k = reduced ? 1 : 0.14;
    M.card.x += (M.cardT.x - M.card.x) * k;
    M.card.y += (M.cardT.y - M.card.y) * k;
    if (Math.abs(M.cardT.x - M.card.x) + Math.abs(M.cardT.y - M.card.y) > 0.3) moving = true;
    if (cardRef.current) cardRef.current.style.transform = `translate3d(${M.card.x}px, ${M.card.y}px, 0)`;
    fillRefs.current.forEach((el, i) => {
      if (!el) return;
      const t = M.bgT[i] || { x: 0, y: 0 };
      const c = M.bg[i] || (M.bg[i] = { x: 0, y: 0 });
      c.x += (t.x - c.x) * 0.08; c.y += (t.y - c.y) * 0.08;
      if (Math.abs(t.x - c.x) + Math.abs(t.y - c.y) > 0.2) moving = true;
      el.style.backgroundPosition = `calc(50% + ${c.x}px) calc(50% + ${c.y}px)`;
    });
    M.raf = moving ? requestAnimationFrame(loop) : 0;
  };
  const kick = () => { if (!motion.current.raf) motion.current.raf = requestAnimationFrame(loop); };
  React.useEffect(() => { const t = setTimeout(kick, 60); const t2 = setTimeout(kick, 900); return () => { clearTimeout(t); clearTimeout(t2); }; }, [width, active]); // eslint-disable-line react-hooks/exhaustive-deps

  const onRowEnter = (i, e) => {
    const w = wordRefs.current[i];
    if (!w) return;
    const l = local(w, e.clientX, e.clientY);
    activate(i, Math.min(l.w, Math.max(0, l.x)), Math.min(l.h, Math.max(0, l.y)));
  };
  const onMove = (e) => {
    const M = motion.current;
    const root = rootRef.current;
    if (!root) return;
    if (e.pointerType === 'touch') return;
    const l = local(root, e.clientX, e.clientY);
    M.pointer = true;
    const cw = cardRef.current ? cardRef.current.offsetWidth : 220;
    M.cardT = { x: Math.min(l.w - cw - 8, l.x + 22), y: l.y + 22 };
    const w = wordRefs.current[activeRef.current];
    if (w) {
      const lw = local(w, e.clientX, e.clientY);
      M.bgT[activeRef.current] = { x: -((lw.x / lw.w) - 0.5) * drift * 2, y: -((lw.y / lw.h) - 0.5) * drift };
    }
    kick();
  };
  const onLeave = () => {
    const M = motion.current;
    M.pointer = false;
    M.bgT = M.bgT.map(() => ({ x: 0, y: 0 }));
    setHovering(false);
    kick();
  };

  const compact = width < 760;
  const pad = compact ? 18 : Math.max(32, Math.round(width * 0.035));
  const maxLen = Math.max(4, ...items.map((it) => Array.from(String(it.word)).length));
  const fs = compact
    ? Math.round(Math.min(width * 0.27, (width - pad * 2 - 30) / (maxLen * 0.6)))
    : Math.round(Math.min(width * 0.155, 230, (width * 0.72) / (maxLen * 0.6)));
  const sans = `"${fontName}", "Inter", -apple-system, "Helvetica Neue", Arial, sans-serif`;
  const mono = '"JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace';
  const p = uid;
  const pad2 = (n) => String(n).padStart(2, '0');
  const cur = items[active] || items[0];

  if (!items.length) {
    return <section className="type-image-fill" style={{ padding: 64, background: bg, color: muted, fontFamily: mono, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', textAlign: 'center' }}>Add a project to begin</section>;
  }

  return (
    <section ref={rootRef} className={`type-image-fill ${p}`} aria-label={eyebrow}
      onPointerMove={onMove} onPointerLeave={onLeave} onPointerEnter={() => setHovering(true)}
      style={{ position: 'relative', width: '100%', boxSizing: 'border-box', padding: `${compact ? 24 : 30}px ${pad}px ${compact ? 36 : 44}px`, background: bg, color: ink, fontFamily: sans, overflow: 'hidden' }}>
      <style>{`
        @keyframes ${p}-in { from { opacity: 0; transform: translateY(0.25em); clip-path: inset(0 0 100% 0); } to { opacity: 1; transform: none; clip-path: inset(-20% -5% -30% -5%); } }
        @keyframes ${p}-fade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        @keyframes ${p}-show { from { opacity: 0; } to { opacity: 1; } }
        @keyframes ${p}-cap { from { transform: translateY(105%); } to { transform: none; } }
        .${p} .${p}-row { transition: opacity 600ms cubic-bezier(0.22,1,0.36,1); }
        .${p} .${p}-row:focus-visible { outline: none; }
        .${p} .${p}-row:focus-visible .${p}-idx { color: ${accent}; }
        .${p} .${p}-row:focus-visible .${p}-word { text-decoration: underline; text-decoration-color: ${accent}; text-decoration-thickness: 2px; text-underline-offset: 0.08em; }
        @media (prefers-reduced-motion: reduce) { .${p} * { animation: none !important; transition: none !important; } }
      `}</style>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, fontFamily: mono, fontSize: compact ? 10 : 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: muted, paddingBottom: compact ? 12 : 16, borderBottom: `1px solid ${line}`, animation: reduced ? 'none' : `${p}-fade 700ms cubic-bezier(0.22,1,0.36,1) both` }}>
        <span><span style={{ color: accent }}>●</span>&nbsp;&nbsp;{eyebrow}</span>
        {!compact && <span>{headerRight}</span>}
        <span style={{ fontVariantNumeric: 'tabular-nums' }}><span style={{ color: ink }}>{pad2(active + 1)}</span> / {pad2(items.length)}</span>
      </div>

      <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute' }}>
        <defs>
          <filter id={`${p}-ol`} x="-5%" y="-10%" width="110%" height="120%" colorInterpolationFilters="sRGB">
            <feMorphology in="SourceAlpha" operator="erode" radius={stroke} result="er" />
            <feComposite in="SourceGraphic" in2="er" operator="out" />
          </filter>
        </defs>
      </svg>

      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {items.map((it, i) => {
          const isA = i === active;
          const Tag = it.link ? 'a' : 'button';
          const dim = dimOthers && !isA ? (hovering ? 0.25 : 0.55) : 1;
          return (
            <li key={i} ref={(el) => { rowRefs.current[i] = el; }} style={{ borderBottom: `1px solid ${line}` }}>
              <Tag
                className={`${p}-row`}
                href={it.link || undefined}
                type={it.link ? undefined : 'button'}
                aria-label={`${it.word} — ${it.caption}, ${it.meta}`}
                aria-current={isA ? 'true' : undefined}
                onPointerEnter={(e) => onRowEnter(i, e)}
                onClick={(e) => { if (e.pointerType === 'touch' || e.detail === 0) return; onRowEnter(i, e); }}
                onFocus={() => activate(i)}
                style={{ appearance: 'none', border: 'none', background: 'transparent', padding: `${compact ? 2 : 4}px 0`, margin: 0, width: '100%', display: 'grid', gridTemplateColumns: compact ? '26px 1fr' : 'minmax(60px, 8.33%) 1fr auto', alignItems: 'center', gap: compact ? 8 : 20, cursor: 'pointer', color: 'inherit', textDecoration: 'none', textAlign: 'left', font: 'inherit' }}>
                <span className={`${p}-idx`} style={{ fontFamily: mono, fontSize: compact ? 10 : 11, letterSpacing: '0.08em', color: isA ? accent : muted, alignSelf: 'start', paddingTop: fs * 0.16, transition: 'color 400ms ease' }}>{pad2(i + 1)}</span>
                <span aria-hidden="true" style={{ display: 'block', minWidth: 0, animation: reduced ? 'none' : `${p}-in 1000ms cubic-bezier(0.22,1,0.36,1) ${120 + i * 90}ms both` }}>
                  <span ref={(el) => { wordRefs.current[i] = el; }} className={`${p}-word`}
                    style={{ position: 'relative', display: 'inline-block', fontSize: fs, lineHeight: 0.98, letterSpacing: '-0.04em', fontWeight: weight, whiteSpace: 'nowrap', paddingRight: '0.06em' }}>
                    <span ref={(el) => { fillRefs.current[i] = el; }}
                      style={{ position: 'absolute', inset: 0, paddingRight: '0.06em', color: 'transparent', backgroundImage: it.image ? `url("${it.image}")` : 'none', backgroundColor: it.image ? 'transparent' : ink, backgroundSize: '124% auto', backgroundPosition: '50% 50%', backgroundRepeat: 'no-repeat', WebkitBackgroundClip: 'text', backgroundClip: 'text', clipPath: 'circle(0px at 0px 50%)' }}>{it.word}</span>
                    <span style={{ position: 'relative', color: ink, filter: `url(#${p}-ol)`, opacity: dim, transition: 'opacity 600ms cubic-bezier(0.22,1,0.36,1)' }}>{it.word}</span>
                  </span>
                </span>
                {!compact && (
                  <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: isA ? ink : muted, textAlign: 'right', lineHeight: 1.6, alignSelf: 'end', paddingBottom: fs * 0.14, transition: 'color 400ms ease', opacity: isA ? 1 : (hovering ? 0.5 : 0.8) }}>
                    {it.meta}
                  </span>
                )}
              </Tag>
            </li>
          );
        })}
      </ul>

      {showCaption && (
        <div ref={cardRef} aria-hidden="true"
          style={{ position: 'absolute', left: 0, top: 0, zIndex: 5, pointerEvents: 'none', background: cardBg, color: cardText, padding: '10px 12px 11px', minWidth: compact ? 170 : 210, fontFamily: mono, fontSize: compact ? 10 : 11, lineHeight: 1.5, letterSpacing: '0.04em', boxShadow: '0 18px 40px -20px rgba(0,0,0,0.45)', animation: reduced ? 'none' : `${p}-show 600ms ease 900ms both` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: compact ? 9 : 10 }}>
            <span>Nº {pad2(active + 1)}</span><span>{cur.meta.split('·').pop().trim()}</span>
          </div>
          <div style={{ overflow: 'hidden', marginTop: 4 }}>
            <div key={active} style={{ display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap', animation: reduced ? 'none' : `${p}-cap 520ms cubic-bezier(0.22,1,0.36,1) both` }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: accent, flexShrink: 0 }} />{cur.caption}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

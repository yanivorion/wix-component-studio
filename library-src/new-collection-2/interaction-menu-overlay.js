const MANIFEST = {
  "type": "Interaction.MenuOverlay",
  "description": "Site header whose menu button blooms a full-stage overlay with a circular clip (or curtain): huge stacked links rise through line masks and roll letter-by-letter into italics on hover, while a side preview cross-clips between matching photographs; the hamburger morphs to an X and everything reverses on close",
  "editorElement": {
    "selector": ".menu-overlay",
    "displayName": "Menu Overlay",
    "archetype": "container",
    "data": {
      "logoText": { "dataType": "text", "displayName": "Logo", "defaultValue": "Atelier Nord", "group": "Content" },
      "heroEyebrow": { "dataType": "text", "displayName": "Hero Eyebrow", "defaultValue": "Architecture & interiors — Oslo", "group": "Content" },
      "heroTitle": { "dataType": "text", "displayName": "Hero Title", "defaultValue": "Spaces shaped by light and silence", "group": "Content" },
      "heroText": { "dataType": "text", "displayName": "Hero Text", "defaultValue": "We design quiet buildings for people who notice the way morning falls across a wall.", "group": "Content" },
      "menuLabel": { "dataType": "text", "displayName": "Menu Label", "defaultValue": "Menu", "group": "Content" },
      "closeLabel": { "dataType": "text", "displayName": "Close Label", "defaultValue": "Close", "group": "Content" },
      "links": { "dataType": "text", "displayName": "Links (comma separated)", "defaultValue": "Work,Studio,Journal,Services,Contact", "group": "Links" },
      "linkUrls": { "dataType": "text", "displayName": "Link URLs (comma separated)", "defaultValue": "#work,#studio,#journal,#services,#contact", "group": "Links" },
      "linkCaptions": { "dataType": "text", "displayName": "Link Captions (comma separated)", "defaultValue": "Selected projects 2014—2026,The people and the process,Notes on material and light,Architecture · Interiors · Objects,Start a conversation", "group": "Links" },
      "secondaryLinks": { "dataType": "text", "displayName": "Social Links (comma separated)", "defaultValue": "Instagram,LinkedIn,Pinterest", "group": "Links" },
      "contactEmail": { "dataType": "text", "displayName": "Contact Email", "defaultValue": "hello@ateliernord.studio", "group": "Links" },
      "contactAddress": { "dataType": "text", "displayName": "Address", "defaultValue": "Akersgata 18, 0158 Oslo", "group": "Links" },
      "heroImage": { "dataType": "text", "displayName": "Hero Image URL", "defaultValue": "https://picsum.photos/id/1076/1920/1200", "group": "Images" },
      "linkImages": { "dataType": "text", "displayName": "Preview Images (comma separated)", "defaultValue": "https://picsum.photos/id/1081/900/1100,https://picsum.photos/id/1059/900/1100,https://picsum.photos/id/1073/900/1100,https://picsum.photos/id/1033/900/1100,https://picsum.photos/id/1047/900/1100", "group": "Images" },
      "revealStyle": { "dataType": "select", "displayName": "Reveal Style", "defaultValue": "circle", "options": ["circle", "curtain"], "group": "Animation" },
      "openDuration": { "dataType": "select", "displayName": "Open Duration (ms)", "defaultValue": "1000", "options": ["700", "1000", "1300"], "group": "Animation" },
      "linkStagger": { "dataType": "select", "displayName": "Link Stagger (ms)", "defaultValue": "70", "options": ["40", "70", "100"], "group": "Animation" },
      "hoverRoll": { "dataType": "select", "displayName": "Letter Roll", "defaultValue": "italic", "options": ["italic", "same", "off"], "group": "Animation" },
      "autoDemo": { "dataType": "booleanValue", "displayName": "Auto-open Demo", "defaultValue": "true", "group": "Animation" },
      "showPreview": { "dataType": "booleanValue", "displayName": "Image Preview", "defaultValue": "true", "group": "Layout" },
      "showIndex": { "dataType": "booleanValue", "displayName": "Link Numbers", "defaultValue": "true", "group": "Layout" },
      "height": { "dataType": "select", "displayName": "Height", "defaultValue": "screen", "options": ["screen", "640", "760", "880"], "group": "Layout" },
      "scrim": { "dataType": "select", "displayName": "Hero Scrim", "defaultValue": "medium", "options": ["none", "light", "medium", "strong"], "group": "Layout" },
      "headerColor": { "dataType": "color", "displayName": "Header & Hero Text", "defaultValue": "#FAFAF9", "group": "Colors" },
      "overlayColor": { "dataType": "color", "displayName": "Overlay Background", "defaultValue": "#11110F", "group": "Colors" },
      "overlayTextColor": { "dataType": "color", "displayName": "Overlay Text", "defaultValue": "#F5F5F4", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#A8A29E", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent", "defaultValue": "#D6C7AE", "group": "Colors" },
      "displayFont": { "dataType": "select", "displayName": "Display Font", "defaultValue": "Instrument Serif", "options": ["Instrument Serif", "Fraunces", "Inter Tight", "Inter"], "group": "Typography" },
      "linkWeight": { "dataType": "select", "displayName": "Link Weight", "defaultValue": "400", "options": ["300", "400", "500"], "group": "Typography" },
      "linkScale": { "dataType": "select", "displayName": "Link Size", "defaultValue": "large", "options": ["medium", "large", "huge"], "group": "Typography" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const split = (s) => String(s || '').split(',').map((x) => x.trim()).filter(Boolean);
  const logo = config?.logoText || 'Atelier Nord';
  const heroEyebrow = config?.heroEyebrow || 'Architecture & interiors — Oslo';
  const heroTitle = config?.heroTitle || 'Spaces shaped by light and silence';
  const heroText = config?.heroText || 'We design quiet buildings for people who notice the way morning falls across a wall.';
  const menuLabel = config?.menuLabel || 'Menu';
  const closeLabel = config?.closeLabel || 'Close';
  const links = split(config?.links || 'Work,Studio,Journal,Services,Contact');
  const urls = split(config?.linkUrls || '#work,#studio,#journal,#services,#contact');
  const captions = split(config?.linkCaptions || 'Selected projects 2014—2026,The people and the process,Notes on material and light,Architecture · Interiors · Objects,Start a conversation');
  const socials = split(config?.secondaryLinks || 'Instagram,LinkedIn,Pinterest');
  const email = config?.contactEmail || 'hello@ateliernord.studio';
  const address = config?.contactAddress || 'Akersgata 18, 0158 Oslo';
  const heroImage = config?.heroImage || 'https://picsum.photos/id/1076/1920/1200';
  const images = split(config?.linkImages || 'https://picsum.photos/id/1081/900/1100,https://picsum.photos/id/1059/900/1100,https://picsum.photos/id/1073/900/1100,https://picsum.photos/id/1033/900/1100,https://picsum.photos/id/1047/900/1100');
  const revealStyle = config?.revealStyle || 'circle';
  const openDur = parseInt(config?.openDuration || '1000', 10) || 1000;
  const stagger = parseInt(config?.linkStagger || '70', 10) || 70;
  const hoverRoll = config?.hoverRoll || 'italic';
  const autoDemo = bool(config?.autoDemo, true);
  const showPreview = bool(config?.showPreview, true);
  const showIndex = bool(config?.showIndex, true);
  const heightMode = config?.height || 'screen';
  const scrim = config?.scrim || 'medium';
  const headerColor = config?.headerColor || '#FAFAF9';
  const overlayBg = config?.overlayColor || '#11110F';
  const overlayText = config?.overlayTextColor || '#F5F5F4';
  const muted = config?.mutedColor || '#A8A29E';
  const accent = config?.accentColor || '#D6C7AE';
  const displayFont = config?.displayFont || 'Instrument Serif';
  const linkWeight = config?.linkWeight || '400';
  const linkScale = { medium: 0.8, large: 1, huge: 1.18 }[config?.linkScale || 'large'] || 1;

  const uid = React.useMemo(() => 'mo' + Math.random().toString(36).slice(2, 9), []);
  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  const rootRef = React.useRef(null);
  const btnRef = React.useRef(null);
  const linkRefs = React.useRef([]);
  const footRefs = React.useRef([]);
  const touched = React.useRef(false);
  const layerKey = React.useRef(0);
  const [width, setWidth] = React.useState(1280);
  const [stageH, setStageH] = React.useState(760);
  const [open, setOpen] = React.useState(false);
  const [origin, setOrigin] = React.useState({ x: 1200, y: 48 });
  const [active, setActive] = React.useState(0);
  const [demoHover, setDemoHover] = React.useState(-1);
  const [layers, setLayers] = React.useState([{ idx: 0, key: 0, still: true }]);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const families = { 'Instrument Serif': 'Instrument+Serif:ital@0;1', 'Fraunces': 'Fraunces:ital,opsz,wght@0,9..144,300..500;1,9..144,300..500', 'Inter Tight': 'Inter+Tight:ital,wght@0,300..500;1,300..500' };
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
    const t = requestAnimationFrame(() => setMounted(true));
    return () => { if (ro) ro.disconnect(); window.removeEventListener('resize', measure); cancelAnimationFrame(t); };
  }, []);

  const measureOrigin = React.useCallback(() => {
    const root = rootRef.current; const b = btnRef.current;
    if (!root || !b) return;
    const r = root.getBoundingClientRect(); const br = b.getBoundingClientRect();
    const k = r.width ? root.clientWidth / r.width : 1;
    setOrigin({ x: (br.left + br.width / 2 - r.left) * k, y: (br.top + br.height / 2 - r.top) * k });
  }, []);

  React.useLayoutEffect(() => { measureOrigin(); }, [width, stageH, measureOrigin]);

  const activate = React.useCallback((i) => {
    setActive(i);
    setLayers((ls) => {
      if (ls[ls.length - 1].idx === i) return ls;
      layerKey.current += 1;
      return [...ls.slice(-3), { idx: i, key: layerKey.current }];
    });
  }, []);

  const toggle = React.useCallback((next) => {
    measureOrigin();
    setOpen((o) => (typeof next === 'boolean' ? next : !o));
  }, [measureOrigin]);

  React.useEffect(() => {
    if (!autoDemo) return undefined;
    const timers = [];
    timers.push(setTimeout(() => { if (!touched.current) toggle(true); }, reduced ? 0 : 800));
    if (!reduced && links.length > 1) {
      timers.push(setTimeout(() => { if (!touched.current) { activate(1); setDemoHover(1); } }, 2700));
      timers.push(setTimeout(() => { setDemoHover(-1); }, 3900));
    }
    return () => timers.forEach(clearTimeout);
  }, [autoDemo]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (!open || !touched.current) return undefined;
    const t = setTimeout(() => { const f = linkRefs.current[0]; if (f) f.focus({ preventScroll: true }); }, reduced ? 0 : Math.round(openDur * 0.5));
    return () => clearTimeout(t);
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  const onUserToggle = () => { touched.current = true; setDemoHover(-1); toggle(); };

  const onKeyDown = (e) => {
    if (!open) return;
    if (e.key === 'Escape') {
      e.preventDefault(); touched.current = true; toggle(false);
      if (btnRef.current) btnRef.current.focus({ preventScroll: true });
    } else if (e.key === 'Tab') {
      const items = [btnRef.current, ...linkRefs.current, ...footRefs.current].filter(Boolean);
      if (!items.length) return;
      const idx = items.indexOf(document.activeElement);
      e.preventDefault();
      const n = e.shiftKey ? (idx <= 0 ? items.length - 1 : idx - 1) : (idx === -1 || idx === items.length - 1 ? 0 : idx + 1);
      items[n].focus({ preventScroll: true });
    }
  };

  const compact = width < 760;
  const H = heightMode === 'screen' ? Math.max(compact ? 640 : 560, stageH) : parseInt(heightMode, 10) || 760;
  const pad = compact ? 20 : 44;
  const headerH = compact ? 72 : 96;
  const sans = '"Inter", -apple-system, "Helvetica Neue", Arial, sans-serif';
  const display = displayFont === 'Inter' ? sans
    : displayFont === 'Inter Tight' ? '"Inter Tight", "Inter", -apple-system, sans-serif'
    : `"${displayFont}", "Iowan Old Style", Georgia, serif`;
  const serifLike = displayFont === 'Instrument Serif' || displayFont === 'Fraunces';
  const scrimA = { none: 0, light: 0.3, medium: 0.5, strong: 0.7 }[scrim] ?? 0.5;
  const pad2 = (n) => String(n).padStart(2, '0');
  const p = uid;
  const easeOut = 'cubic-bezier(.22,1,.36,1)';
  const easeIO = 'cubic-bezier(.65,0,.35,1)';

  const N = Math.max(1, links.length);
  const footH = compact ? 120 : 92;
  const availH = H - headerH - footH - (compact ? 24 : 40);
  const lineEm = 1.04;
  const linkPx = Math.round(Math.max(36, Math.min(
    (availH / N) / (lineEm + 0.1),
    (compact ? width * 0.15 : width * 0.085) * linkScale,
    compact ? 84 : 132 * linkScale
  )));
  const previewW = Math.round(Math.min(width * 0.3, (H - headerH - footH) * 0.72, 400));
  const previewOn = showPreview && !compact && images.length > 0;

  const R = Math.ceil(Math.hypot(Math.max(origin.x, width - origin.x), Math.max(origin.y, H - origin.y)) + 8);
  const clipOpen = revealStyle === 'curtain' ? 'inset(0% 0% 0% 0%)' : `circle(${R}px at ${origin.x}px ${origin.y}px)`;
  const clipClosed = revealStyle === 'curtain' ? 'inset(0% 0% 100% 0%)' : `circle(0px at ${origin.x}px ${origin.y}px)`;
  const T = (prop, dur, ease, delay) => (reduced ? 'none' : `${prop} ${dur}ms ${ease} ${delay}ms`);

  const fg = open ? overlayText : headerColor;
  const btnBase = { appearance: 'none', border: 'none', background: 'transparent', color: 'inherit', padding: 0, margin: 0, cursor: 'pointer', font: 'inherit' };
  const lineStyle = (k) => ({
    position: 'absolute', left: 0, right: 0, height: 1.5, borderRadius: 2, background: 'currentColor', top: '50%',
    transform: open ? `translateY(-50%) rotate(${k ? -45 : 45}deg) scaleX(1.05)` : `translateY(${k ? 4 : -4}px) translateY(-50%)`,
    transition: T('transform', 650, 'cubic-bezier(.34,1.4,.5,1)', open ? 120 : 0),
  });

  const heroTitleWords = heroTitle.split(' ');
  const heroPx = Math.round(Math.min(compact ? width * 0.135 : width * 0.072, H * 0.13, 112));

  const renderLinkChars = (label, i) => Array.from(label).map((ch, j) => {
    const c = ch === ' ' ? ' ' : ch;
    if (hoverRoll === 'off') return <span key={j}>{c}</span>;
    return (
      <span key={j} aria-hidden="true" style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', height: `${lineEm}em`, paddingRight: hoverRoll === 'italic' ? '0.02em' : 0 }}>
        <span className={`${p}-roll`} style={{ display: 'block', transitionDelay: `${j * 22}ms` }}>
          <span style={{ display: 'block', height: `${lineEm}em` }}>{c}</span>
          <span style={{ display: 'block', height: `${lineEm}em`, fontStyle: hoverRoll === 'italic' ? 'italic' : 'normal', color: hoverRoll === 'italic' ? accent : 'inherit' }}>{c}</span>
        </span>
      </span>
    );
  });

  return (
    <section
      ref={rootRef}
      className={`menu-overlay ${p}`}
      onKeyDown={onKeyDown}
      onPointerMove={() => { if (demoHover !== -1) setDemoHover(-1); }}
      style={{ position: 'relative', width: '100%', height: H, overflow: 'hidden', background: '#0C0C0D', color: headerColor, fontFamily: sans, isolation: 'isolate' }}
    >
      <style>{`
        @keyframes ${p}-rise { from { transform: translateY(105%); } to { transform: none; } }
        @keyframes ${p}-fade { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
        @keyframes ${p}-reveal { from { clip-path: inset(100% 0% 0% 0%); } to { clip-path: inset(0% 0% 0% 0%); } }
        @keyframes ${p}-zoom { from { transform: scale(1.28) translateY(4%); } to { transform: scale(1) translateY(0); } }
        @keyframes ${p}-heroimg { from { transform: scale(1.12); } to { transform: scale(1); } }
        .${p} .${p}-roll { transition: transform 620ms ${easeIO}; will-change: transform; }
        .${p} .${p}-link:hover .${p}-roll, .${p} .${p}-link:focus-visible .${p}-roll, .${p} .${p}-link[data-demo="true"] .${p}-roll { transform: translateY(-50%); }
        .${p} .${p}-link { outline: none; }
        .${p} .${p}-link:focus-visible .${p}-num { color: ${accent}; }
        .${p} .${p}-link:focus-visible { text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: 0.12em; }
        .${p} .${p}-foot { transition: color .3s; }
        .${p} .${p}-foot:hover, .${p} .${p}-foot:focus-visible { color: ${overlayText}; }
        .${p} button:focus-visible, .${p} .${p}-foot:focus-visible { outline: 1px solid ${accent}; outline-offset: 4px; }
        .${p} .${p}-mbtn .${p}-lbl { transition: transform 560ms ${easeIO}; }
        @media (prefers-reduced-motion: reduce) { .${p} *, .${p} *::before { animation: none !important; transition: none !important; } }
      `}</style>

      <div aria-hidden={open} style={{
        position: 'absolute', inset: 0, transformOrigin: `${origin.x}px ${origin.y}px`,
        transform: open ? 'scale(0.94)' : 'none', filter: open ? 'brightness(0.55)' : 'none',
        transition: reduced ? 'none' : `transform ${openDur + 200}ms ${easeIO}, filter ${openDur}ms ${easeIO}`,
      }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          <img src={heroImage} alt="" draggable="false" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', animation: reduced ? 'none' : `${p}-heroimg 1800ms ${easeOut} both` }} />
        </div>
        {scrimA > 0 && (
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, rgba(0,0,0,${scrimA * 0.6}) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) 42%, rgba(0,0,0,${scrimA * 0.85}) 100%)` }} />
        )}
        <div style={{ position: 'absolute', left: pad, right: pad, bottom: compact ? 28 : 48, display: 'flex', flexDirection: compact ? 'column' : 'row', alignItems: compact ? 'flex-start' : 'flex-end', justifyContent: 'space-between', gap: compact ? 20 : 48 }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.82, marginBottom: compact ? 14 : 22, animation: reduced ? 'none' : `${p}-fade 900ms ${easeOut} 200ms both` }}>{heroEyebrow}</div>
            <h1 style={{ margin: 0, fontFamily: display, fontWeight: 400, fontSize: heroPx, lineHeight: 0.98, letterSpacing: serifLike ? '-0.015em' : '-0.04em', maxWidth: compact ? '100%' : Math.min(width * 0.62, heroPx * 8.6) }}>
              {heroTitleWords.map((w, i) => (
                <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', paddingBottom: '0.1em', marginBottom: '-0.1em' }}>
                  <span style={{ display: 'inline-block', animation: reduced ? 'none' : `${p}-rise 1000ms ${easeOut} ${120 + i * 55}ms both` }}>{w}{i < heroTitleWords.length - 1 ? ' ' : ''}</span>
                </span>
              ))}
            </h1>
          </div>
          <p style={{ margin: 0, maxWidth: 300, fontSize: compact ? 14 : 15, lineHeight: 1.55, fontWeight: 300, opacity: 0.88, animation: reduced ? 'none' : `${p}-fade 900ms ${easeOut} 520ms both` }}>{heroText}</p>
        </div>
      </div>

      <div
        id={`${p}-menu`}
        role="dialog"
        aria-modal={open ? 'true' : undefined}
        aria-label="Site menu"
        aria-hidden={!open}
        inert={!open}
        style={{
          position: 'absolute', inset: 0, zIndex: 2, background: overlayBg, color: overlayText,
          clipPath: open ? clipOpen : clipClosed, WebkitClipPath: open ? clipOpen : clipClosed,
          transition: reduced || !mounted ? 'none' : `clip-path ${open ? openDur : Math.round(openDur * 0.8)}ms ${open ? 'cubic-bezier(.76,0,.24,1)' : easeIO} ${open ? 0 : 260}ms, -webkit-clip-path ${open ? openDur : Math.round(openDur * 0.8)}ms ${open ? 'cubic-bezier(.76,0,.24,1)' : easeIO} ${open ? 0 : 260}ms`,
          pointerEvents: open ? 'auto' : 'none',
        }}
      >
        <nav aria-label="Primary" style={{ position: 'absolute', left: pad, right: previewOn ? previewW + pad * 2 : pad, top: headerH + (compact ? 8 : 16), bottom: footH + (compact ? 8 : 20), display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }} onMouseLeave={() => setDemoHover(-1)}>
            {links.map((label, i) => {
              const isActive = active === i;
              const inDelay = Math.round(openDur * 0.32) + i * stagger;
              const outDelay = (N - 1 - i) * 28;
              return (
                <li key={i} style={{ overflow: 'hidden', paddingBottom: '0.06em' }}>
                  <a
                    ref={(el) => { linkRefs.current[i] = el; }}
                    href={urls[i] || '#'}
                    className={`${p}-link`}
                    data-demo={demoHover === i ? 'true' : 'false'}
                    tabIndex={open ? 0 : -1}
                    aria-label={label}
                    onMouseEnter={() => { touched.current = true; activate(i); }}
                    onFocus={() => activate(i)}
                    onClick={(e) => { if ((urls[i] || '#').charAt(0) === '#') { e.preventDefault(); touched.current = true; toggle(false); } }}
                    style={{
                      display: 'inline-flex', alignItems: 'flex-start', gap: compact ? 10 : 18, color: 'inherit', textDecoration: 'none',
                      fontFamily: display, fontWeight: linkWeight, fontSize: linkPx, lineHeight: lineEm,
                      letterSpacing: serifLike ? '-0.01em' : '-0.045em',
                      transform: open ? 'translateY(0)' : 'translateY(108%)',
                      opacity: isActive ? 1 : 0.34,
                      transition: reduced ? 'none' : `transform ${open ? 1000 : 520}ms ${open ? easeOut : easeIO} ${open ? inDelay : outDelay}ms, opacity 500ms ${easeOut} 0ms`,
                    }}
                  >
                    {showIndex && (
                      <span className={`${p}-num`} aria-hidden="true" style={{ fontFamily: sans, fontSize: Math.max(11, Math.round(linkPx * 0.13)), letterSpacing: '0.06em', fontWeight: 400, marginTop: '0.55em', color: isActive ? accent : muted, transition: 'color .4s', fontVariantNumeric: 'tabular-nums', minWidth: '1.6em' }}>{pad2(i + 1)}</span>
                    )}
                    <span style={{ whiteSpace: 'nowrap' }}>{renderLinkChars(label, i)}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {previewOn && (
          <div aria-hidden="true" style={{ position: 'absolute', right: pad, top: headerH + (H - headerH - footH - previewW * 1.25) / 2, width: previewW }}>
            <div style={{
              position: 'relative', width: previewW, height: Math.round(previewW * 1.25), overflow: 'hidden', background: '#1c1b19', borderRadius: 2,
              clipPath: open ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)',
              transition: reduced ? 'none' : `clip-path ${open ? 1100 : 500}ms ${open ? 'cubic-bezier(.76,0,.24,1)' : easeIO} ${open ? Math.round(openDur * 0.45) : 0}ms`,
            }}>
              {layers.map((l) => (
                <div key={l.key} style={{ position: 'absolute', inset: 0, overflow: 'hidden', animation: l.still || reduced ? 'none' : `${p}-reveal 900ms cubic-bezier(.76,0,.24,1) both` }}>
                  <img src={images[l.idx % images.length]} alt="" draggable="false" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', animation: l.still || reduced ? 'none' : `${p}-zoom 1300ms ${easeOut} both` }} />
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, overflow: 'hidden', display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: 12, letterSpacing: '0.04em', color: muted, opacity: open ? 1 : 0, transition: T('opacity', 500, easeOut, open ? openDur * 0.7 : 0) }}>
              <span key={`c${active}`} style={{ display: 'inline-block', animation: reduced ? 'none' : `${p}-rise 700ms ${easeOut} both` }}>{captions[active] || ''}</span>
              <span style={{ fontVariantNumeric: 'tabular-nums', color: overlayText }}>{pad2(active + 1)}<span style={{ color: muted }}> / {pad2(N)}</span></span>
            </div>
          </div>
        )}

        <div style={{
          position: 'absolute', left: pad, right: pad, bottom: compact ? 22 : 34, paddingTop: compact ? 16 : 22, borderTop: `1px solid ${overlayText}1f`,
          display: 'flex', flexDirection: compact ? 'column' : 'row', justifyContent: 'space-between', alignItems: compact ? 'flex-start' : 'center', gap: compact ? 12 : 24,
          fontSize: 13, color: muted,
          opacity: open ? 1 : 0, transform: open ? 'none' : 'translateY(14px)',
          transition: reduced ? 'none' : `opacity ${open ? 800 : 300}ms ${easeOut} ${open ? Math.round(openDur * 0.55) + N * stagger : 0}ms, transform ${open ? 900 : 300}ms ${easeOut} ${open ? Math.round(openDur * 0.55) + N * stagger : 0}ms`,
        }}>
          <div style={{ display: 'flex', gap: compact ? 16 : 32, flexWrap: 'wrap' }}>
            <a ref={(el) => { footRefs.current[0] = el; }} className={`${p}-foot`} tabIndex={open ? 0 : -1} href={`mailto:${email}`} style={{ color: 'inherit', textDecoration: 'none' }}>{email}</a>
            <span>{address}</span>
          </div>
          <div style={{ display: 'flex', gap: compact ? 18 : 28 }}>
            {socials.map((s, i) => (
              <a key={i} ref={(el) => { footRefs.current[i + 1] = el; }} className={`${p}-foot`} tabIndex={open ? 0 : -1} href="#" onClick={(e) => e.preventDefault()} style={{ color: 'inherit', textDecoration: 'none' }}>{s}</a>
            ))}
          </div>
        </div>
      </div>

      <header style={{ position: 'absolute', left: 0, right: 0, top: 0, height: headerH, zIndex: 3, padding: `0 ${pad}px`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: fg, transition: T('color', 500, easeOut, open ? 200 : 300), pointerEvents: 'none' }}>
        <a href="#" onClick={(e) => e.preventDefault()} aria-label={`${logo} home`} style={{ pointerEvents: 'auto', color: 'inherit', textDecoration: 'none', fontFamily: display, fontSize: compact ? 22 : 26, letterSpacing: serifLike ? '-0.01em' : '-0.03em', fontWeight: 400, animation: reduced ? 'none' : `${p}-fade 800ms ${easeOut} both` }}>
          {logo}
        </a>
        <button
          ref={btnRef}
          type="button"
          className={`${p}-mbtn`}
          aria-expanded={open}
          aria-controls={`${p}-menu`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={onUserToggle}
          style={{ ...btnBase, pointerEvents: 'auto', display: 'inline-flex', alignItems: 'center', gap: 14, height: 48, padding: '0 6px 0 18px', borderRadius: 999, border: `1px solid ${fg}40`, transition: T('border-color', 500, easeOut, 0), animation: reduced ? 'none' : `${p}-fade 800ms ${easeOut} 100ms both` }}
        >
          <span aria-hidden="true" style={{ display: 'inline-block', overflow: 'hidden', height: 18, lineHeight: '18px', fontSize: 13, letterSpacing: '0.04em' }}>
            <span className={`${p}-lbl`} style={{ display: 'block', transform: open ? 'translateY(-50%)' : 'none' }}>
              <span style={{ display: 'block', height: 18 }}>{menuLabel}</span>
              <span style={{ display: 'block', height: 18 }}>{closeLabel}</span>
            </span>
          </span>
          <span aria-hidden="true" style={{ width: 36, height: 36, borderRadius: '50%', display: 'grid', placeItems: 'center', background: open ? `${overlayText}14` : `${headerColor}1a`, transition: T('background', 400, easeOut, 0) }}>
            <span style={{ position: 'relative', width: 16, height: 10 }}>
              <span style={lineStyle(0)} />
              <span style={lineStyle(1)} />
            </span>
          </span>
        </button>
      </header>
    </section>
  );
}

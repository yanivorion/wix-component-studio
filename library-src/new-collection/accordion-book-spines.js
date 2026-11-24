const MANIFEST = {
  "type": "Accordion.BookSpines",
  "description": "A horizontal accordion of books on a shelf: tonal spines with vertical titles pull forward and open into a cover and page spread while the others compress",
  "editorElement": {
    "selector": ".book-spines",
    "displayName": "Book Spines Accordion",
    "archetype": "container",
    "data": {
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "The reading room / Shelf 04", "group": "Content" },
      "title": { "dataType": "text", "displayName": "Title", "defaultValue": "Six volumes on making things", "group": "Content" },
      "subtitle": { "dataType": "text", "displayName": "Subtitle", "defaultValue": "Pull a spine from the shelf to open it.", "group": "Content" },
      "items": { "dataType": "text", "displayName": "Books (Title|Author|Text, separated by ;; or new lines)", "defaultValue": "Proportion & Measure|Hanne Albers|Margins, measures and the white of the page carry as much meaning as the type set upon them. A field guide to the grid as a quiet, load-bearing structure that holds a page together long after the reader has stopped noticing it.;;On Paper|Theo Marchetti|Cotton, linen, kozo and wood pulp: a tactile history of the surfaces we write on, and why the weight of a sheet in the hand still changes the way its words are read.;;The Long Table|Ines Vidal|Twelve studios, one shared habit. Conversations recorded across a year of working lunches about patience, apprenticeship and the slow accumulation of craft.;;Grey Matters|Oskar Lind|A defence of the in-between. Notes on restraint, tonal colour and the forty shades of stone that sit between black ink and the bare page.;;Night Printing|Mira Okafor|Letterpress after hours. A diary of hand-set type, mixed inks and the small accidents that make each impression different from the last.;;Small Monuments|Jules Reyna|Benches, signs, handrails and door handles: an inventory of the modest objects that make a city legible, and of the people who quietly designed them.", "group": "Items" },
      "defaultOpen": { "dataType": "select", "displayName": "Open By Default", "defaultValue": "2", "options": ["none", "1", "2", "3", "4", "5", "6"], "group": "Items" },
      "selectMode": { "dataType": "select", "displayName": "Open Mode", "defaultValue": "single", "options": ["single", "multiple"], "group": "Items" },
      "allowCollapse": { "dataType": "booleanValue", "displayName": "Allow Closing All", "defaultValue": "true", "group": "Items" },
      "backgroundColor": { "dataType": "color", "displayName": "Wall", "defaultValue": "#F5F5F4", "group": "Colors" },
      "inkColor": { "dataType": "color", "displayName": "Ink", "defaultValue": "#1C1917", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#78716C", "group": "Colors" },
      "paperColor": { "dataType": "color", "displayName": "Page Paper", "defaultValue": "#FBFAF7", "group": "Colors" },
      "shelfColor": { "dataType": "color", "displayName": "Shelf", "defaultValue": "#A8917A", "group": "Colors" },
      "bandColor": { "dataType": "color", "displayName": "Spine Band Accent", "defaultValue": "#B08D57", "group": "Colors" },
      "spineColors": { "dataType": "text", "displayName": "Spine Colours (comma separated)", "defaultValue": "#E7E5E4,#44403C,#D6D3D1,#1C1917,#A8A29E,#78716C,#292524,#E7E5E4", "group": "Colors" },
      "displayFont": { "dataType": "select", "displayName": "Display Font", "defaultValue": "Instrument Serif", "options": ["Instrument Serif", "Fraunces", "Georgia"], "group": "Typography" },
      "bodyFont": { "dataType": "select", "displayName": "Body Font", "defaultValue": "Inter", "options": ["Inter", "system-ui", "Georgia"], "group": "Typography" },
      "titleSize": { "dataType": "select", "displayName": "Title Size (px)", "defaultValue": "56", "options": ["40", "48", "56", "64", "72"], "group": "Typography" },
      "spineTitleSize": { "dataType": "select", "displayName": "Spine Title Size (px)", "defaultValue": "22", "options": ["18", "20", "22", "26"], "group": "Typography" },
      "shelfHeight": { "dataType": "select", "displayName": "Book Height (px)", "defaultValue": "480", "options": ["420", "480", "540", "600"], "group": "Layout" },
      "spineWidth": { "dataType": "select", "displayName": "Spine Width", "defaultValue": "medium", "options": ["narrow", "medium", "wide"], "group": "Layout" },
      "shelfStyle": { "dataType": "select", "displayName": "Shelf Material", "defaultValue": "wood", "options": ["wood", "linen", "plain"], "group": "Layout" },
      "showHeader": { "dataType": "booleanValue", "displayName": "Show Header", "defaultValue": "true", "group": "Layout" },
      "showBookend": { "dataType": "booleanValue", "displayName": "Show Bookend", "defaultValue": "true", "group": "Layout" },
      "heightVariance": { "dataType": "booleanValue", "displayName": "Varied Book Heights", "defaultValue": "true", "group": "Layout" },
      "showVolume": { "dataType": "booleanValue", "displayName": "Show Volume Numbers", "defaultValue": "true", "group": "Details" },
      "volumeStyle": { "dataType": "select", "displayName": "Volume Numerals", "defaultValue": "roman", "options": ["roman", "arabic"], "group": "Details" },
      "showAuthor": { "dataType": "booleanValue", "displayName": "Show Authors", "defaultValue": "true", "group": "Details" },
      "showPageNumbers": { "dataType": "booleanValue", "displayName": "Show Page Numbers", "defaultValue": "true", "group": "Details" },
      "duration": { "dataType": "select", "displayName": "Open Duration (ms)", "defaultValue": "750", "options": ["450", "600", "750", "950"], "group": "Animation" },
      "pullForward": { "dataType": "booleanValue", "displayName": "Pull Book Forward", "defaultValue": "true", "group": "Animation" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const eyebrow = config?.eyebrow || 'The reading room / Shelf 04';
  const title = config?.title || 'Six volumes on making things';
  const subtitle = config?.subtitle || 'Pull a spine from the shelf to open it.';
  const itemsRaw = config?.items || 'Proportion & Measure|Hanne Albers|Margins, measures and the white of the page carry as much meaning as the type set upon them.;;On Paper|Theo Marchetti|A tactile history of the surfaces we write on.;;The Long Table|Ines Vidal|Conversations about patience and craft.';
  const defaultOpen = config?.defaultOpen || '2';
  const multiple = (config?.selectMode || 'single') === 'multiple';
  const allowCollapse = bool(config?.allowCollapse, true);
  const bg = config?.backgroundColor || '#F5F5F4';
  const ink = config?.inkColor || '#1C1917';
  const muted = config?.mutedColor || '#78716C';
  const paper = config?.paperColor || '#FBFAF7';
  const shelfColor = config?.shelfColor || '#A8917A';
  const band = config?.bandColor || '#B08D57';
  const spineColors = String(config?.spineColors || '#E7E5E4,#44403C,#D6D3D1,#1C1917,#A8A29E,#78716C,#292524,#E7E5E4')
    .split(',').map((c) => c.trim()).filter(Boolean);
  const displayFont = config?.displayFont || 'Instrument Serif';
  const bodyFont = config?.bodyFont || 'Inter';
  const titleSize = parseInt(config?.titleSize || '56', 10);
  const spineTitleSize = parseInt(config?.spineTitleSize || '22', 10);
  const bookH = parseInt(config?.shelfHeight || '480', 10);
  const spineBase = { narrow: 58, medium: 70, wide: 84 }[config?.spineWidth || 'medium'] || 70;
  const shelfStyle = config?.shelfStyle || 'wood';
  const showHeader = bool(config?.showHeader, true);
  const showBookend = bool(config?.showBookend, true);
  const heightVariance = bool(config?.heightVariance, true);
  const showVolume = bool(config?.showVolume, true);
  const roman = (config?.volumeStyle || 'roman') === 'roman';
  const showAuthor = bool(config?.showAuthor, true);
  const showPageNumbers = bool(config?.showPageNumbers, true);
  const pullForward = bool(config?.pullForward, true);

  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const dur = reduced ? 0 : parseInt(config?.duration || '750', 10);
  const easing = 'cubic-bezier(.22,.8,.2,1)';

  const items = React.useMemo(() => String(itemsRaw).split(/\n|;;/).map((s) => s.trim()).filter(Boolean).map((line) => {
    const [t, a, b] = line.split('|').map((p) => (p || '').trim());
    return { title: t || 'Untitled', author: a || '', body: b || '' };
  }), [itemsRaw]);
  const n = items.length;

  const uid = React.useMemo(() => 'bs' + Math.random().toString(36).slice(2, 9), []);
  const rootRef = React.useRef(null);
  const shelfRef = React.useRef(null);
  const btnRefs = React.useRef([]);
  const [width, setWidth] = React.useState(1280);
  const [shelfW, setShelfW] = React.useState(1160);

  const initial = () => {
    const k = parseInt(defaultOpen, 10);
    return Number.isFinite(k) && k >= 1 && k <= n ? [k - 1] : [];
  };
  const [open, setOpen] = React.useState(initial);
  React.useEffect(() => { setOpen(initial()); }, [defaultOpen, n]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    const id = 'nc-font-' + displayFont.replace(/\s+/g, '-').toLowerCase() + '-bs';
    if (displayFont === 'Georgia' || document.getElementById(id)) return;
    const fam = displayFont === 'Fraunces' ? 'Fraunces:opsz,wght@9..144,300;9..144,400' : 'Instrument+Serif:ital@0;1';
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${fam}&family=Inter:wght@300;400;500&family=IBM+Plex+Mono:wght@400;500&display=swap`;
    document.head.appendChild(link);
  }, [displayFont]);

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const measure = () => {
      setWidth(root.clientWidth);
      if (shelfRef.current) setShelfW(shelfRef.current.clientWidth);
    };
    measure();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (ro) ro.observe(root);
    window.addEventListener('resize', measure);
    return () => { if (ro) ro.disconnect(); window.removeEventListener('resize', measure); };
  }, []);

  const compact = width < 720;

  const toggle = (i) => {
    setOpen((prev) => {
      const isOpen = prev.includes(i);
      if (multiple) return isOpen ? prev.filter((x) => x !== i) : [...prev, i].sort((a, b) => a - b);
      if (isOpen) return allowCollapse ? [] : prev;
      return [i];
    });
  };
  const onKey = (e, i) => {
    let j = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') j = (i + 1) % n;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') j = (i - 1 + n) % n;
    else if (e.key === 'Home') j = 0;
    else if (e.key === 'End') j = n - 1;
    if (j !== null) { e.preventDefault(); if (btnRefs.current[j]) btnRefs.current[j].focus(); }
  };

  const toRoman = (num) => {
    const map = [[10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
    let r = '';
    let v = num;
    map.forEach(([k, s]) => { while (v >= k) { r += s; v -= k; } });
    return r;
  };
  const vol = (i) => (roman ? toRoman(i + 1) : String(i + 1).padStart(2, '0'));
  const lum = (hex) => {
    const h = String(hex).replace('#', '');
    const f = h.length === 3 ? h.split('').map((c) => c + c).join('') : h.padEnd(6, '0');
    const [r, g, b] = [0, 2, 4].map((k) => parseInt(f.slice(k, k + 2), 16) / 255);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const spineAt = (i) => spineColors.length ? spineColors[i % spineColors.length] : '#D6D3D1';
  const textOn = (c) => (lum(c) > 0.55 ? ink : paper);
  const heights = [100, 93, 97, 90, 98, 94, 96, 91];

  const mono = '"IBM Plex Mono", ui-monospace, "SF Mono", Menlo, monospace';
  const display = displayFont === 'Georgia' ? 'Georgia, "Times New Roman", serif' : `"${displayFont}", Georgia, "Times New Roman", serif`;
  const sans = bodyFont === 'Georgia' ? 'Georgia, serif' : `${bodyFont === 'system-ui' ? 'system-ui' : '"Inter"'}, -apple-system, "Helvetica Neue", sans-serif`;
  const shelfBg = shelfStyle === 'wood'
    ? `repeating-linear-gradient(90deg, rgba(0,0,0,0) 0 37px, rgba(0,0,0,0.05) 37px 39px, rgba(0,0,0,0) 39px 83px, rgba(255,255,255,0.06) 83px 86px), linear-gradient(180deg, rgba(255,255,255,0.22), rgba(0,0,0,0.12)), ${shelfColor}`
    : shelfStyle === 'linen'
      ? `repeating-linear-gradient(0deg, rgba(0,0,0,0.05) 0 1px, transparent 1px 3px), repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0 1px, transparent 1px 3px), linear-gradient(180deg, rgba(255,255,255,0.18), rgba(0,0,0,0.1)), ${shelfColor}`
      : shelfColor;

  const css = `
    .${uid}-btn{appearance:none;-webkit-appearance:none;border:0;margin:0;padding:0;font:inherit;cursor:pointer;text-align:inherit}
    .${uid}-btn:focus-visible{outline:2px solid ${band};outline-offset:3px}
    .${uid}-btn:hover .${uid}-lift{transform:translateY(-4px)}
    @media (prefers-reduced-motion: reduce){.${uid}-root *{transition:none!important}}
  `;

  const empty = (
    <div style={{ padding: 48, fontFamily: sans, color: muted, border: `1px dashed ${muted}`, textAlign: 'center' }}>
      Add books in the Items field: Title|Author|Text, separated by ;;
    </div>
  );

  const pageSpread = (it, i, spreadW, compactSpread) => {
    const pageW = compactSpread ? spreadW : spreadW / 2;
    return (
      <div style={{ display: 'flex', flexDirection: compactSpread ? 'column' : 'row', width: spreadW, height: compactSpread ? 'auto' : '100%', background: paper, position: 'relative' }}>
        {!compactSpread && (
          <div aria-hidden="true" style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 60, marginLeft: -30, pointerEvents: 'none',
            background: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.07) 46%, rgba(0,0,0,0.13) 50%, rgba(0,0,0,0.04) 54%, rgba(0,0,0,0) 100%)' }} />
        )}
        <div style={{ width: pageW, boxSizing: 'border-box', padding: compactSpread ? '28px 24px 8px' : '44px 40px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: compactSpread ? 0 : '100%' }}>
          <div style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: muted }}>
            {showVolume ? `Volume ${vol(i)}` : 'Volume'} <span style={{ opacity: 0.5 }}>/ {String(n).padStart(2, '0')}</span>
          </div>
          <div style={{ margin: compactSpread ? '18px 0 10px' : '0' }}>
            <div style={{ width: 28, height: 3, background: band, marginBottom: compactSpread ? 14 : 22 }} />
            <h3 style={{ margin: 0, fontFamily: display, fontWeight: 400, fontSize: compactSpread ? 34 : Math.min(48, Math.max(30, pageW / 7.5)), lineHeight: 1.02, letterSpacing: '-0.01em', color: ink }}>{it.title}</h3>
            {showAuthor && it.author && <div style={{ marginTop: 14, fontFamily: display, fontStyle: 'italic', fontSize: compactSpread ? 17 : 19, color: muted }}>{it.author}</div>}
          </div>
          {!compactSpread && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: mono, fontSize: 10, letterSpacing: '0.14em', color: muted, textTransform: 'uppercase' }}>
              <span>Shelf mark 04.{String(i + 1).padStart(2, '0')}</span>
              {showPageNumbers && <span>{(i + 1) * 2 - 1}</span>}
            </div>
          )}
        </div>
        <div style={{ width: pageW, boxSizing: 'border-box', padding: compactSpread ? '6px 24px 26px' : '44px 40px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: compactSpread ? 0 : '100%' }}>
          <p style={{ margin: 0, fontFamily: sans, fontSize: compactSpread ? 15 : 15.5, lineHeight: 1.65, color: ink, fontWeight: 300 }}>
            <span style={{ float: 'left', fontFamily: display, fontSize: compactSpread ? 50 : 66, lineHeight: 0.8, padding: '7px 10px 0 0', color: ink }}>{it.body.charAt(0)}</span>
            {it.body.slice(1)}
          </p>
          {!compactSpread && n > 1 && (
            <div style={{ marginTop: 'auto', paddingTop: 24 }}>
              <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: muted, marginBottom: 8 }}>Next on the shelf</div>
              <div style={{ fontFamily: display, fontStyle: 'italic', fontSize: 20, color: ink, lineHeight: 1.2 }}>{items[(i + 1) % n].title} <span style={{ fontStyle: 'normal', color: muted }}>&rarr;</span></div>
            </div>
          )}
          {showPageNumbers && (
            <div style={{ marginTop: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: mono, fontSize: 10, letterSpacing: '0.14em', color: muted }}>
              <span style={{ flex: 1, height: 1, background: muted, opacity: 0.25, marginRight: 14 }} />
              <span>{(i + 1) * 2}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const anyOpen = open.length > 0;
  const closedW = anyOpen ? Math.round(spineBase * 0.84) : spineBase;
  const gap = 5;
  const bookendW = showBookend ? 34 : 0;
  const openCount = Math.max(1, open.length);
  const spreadW = Math.max(240, Math.floor((shelfW - bookendW - gap * n - (n - open.length) * closedW - open.length * spineBase) / openCount) - 2);

  const header = showHeader && (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, marginBottom: compact ? 28 : 44, flexWrap: 'wrap' }}>
      <div style={{ maxWidth: 680 }}>
        <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: muted, marginBottom: 16 }}>{eyebrow}</div>
        <h2 style={{ margin: 0, fontFamily: display, fontWeight: 400, fontSize: compact ? Math.round(titleSize * 0.66) : titleSize, lineHeight: 1, letterSpacing: '-0.015em' }}>{title}</h2>
      </div>
      <div style={{ fontFamily: sans, fontSize: 14, color: muted, maxWidth: 260, lineHeight: 1.5, textAlign: compact ? 'left' : 'right' }}>
        {subtitle}
        {!compact && (
          <div style={{ marginTop: 10, fontFamily: mono, fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: ink }}>
            {anyOpen ? `Open — Vol. ${open.map(vol).join(', ')}` : 'All shelved'}
          </div>
        )}
      </div>
    </div>
  );

  const shelfBar = (
    <div aria-hidden="true" style={{ position: 'relative', height: 16, background: shelfBg, boxShadow: '0 1px 0 rgba(255,255,255,0.4) inset, 0 14px 22px -10px rgba(28,25,23,0.35)', borderRadius: 1 }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: '100%', height: 8, background: 'linear-gradient(180deg, rgba(0,0,0,0.18), rgba(0,0,0,0))' }} />
    </div>
  );

  if (compact) {
    return (
      <section ref={rootRef} className={`book-spines ${uid}-root`} style={{ background: bg, color: ink, fontFamily: sans, padding: '40px 16px 48px', boxSizing: 'border-box', width: '100%' }}>
        <style>{css}</style>
        {header}
        <div ref={shelfRef}>
          {n === 0 ? empty : items.map((it, i) => {
            const isOpen = open.includes(i);
            const c = spineAt(i);
            const tc = textOn(c);
            const h = heightVariance ? 50 + (heights[i % heights.length] - 90) * 0.9 : 54;
            const off = heightVariance ? [0, 8, 3, 12, 5, 10, 2, 7][i % 8] : 0;
            return (
              <div key={i} style={{ marginLeft: isOpen ? 0 : off, marginRight: isOpen ? 0 : 8 - Math.min(8, off), transition: `margin ${dur}ms ${easing}`, marginBottom: 3 }}>
                <h3 style={{ margin: 0 }}>
                  <button ref={(el) => { btnRefs.current[i] = el; }} id={`${uid}-b${i}`} className={`${uid}-btn`} aria-expanded={isOpen} aria-controls={`${uid}-p${i}`}
                    onClick={() => toggle(i)} onKeyDown={(e) => onKey(e, i)}
                    style={{ display: 'flex', alignItems: 'center', gap: 14, width: '100%', height: h, padding: '0 16px', boxSizing: 'border-box', background: c, color: tc, borderRadius: 2,
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -2px 0 rgba(0,0,0,0.14), 0 2px 4px rgba(28,25,23,0.12)' }}>
                    {showVolume && <span style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: '0.1em', minWidth: 22, opacity: 0.75 }}>{vol(i)}</span>}
                    <span aria-hidden="true" style={{ width: 4, alignSelf: 'stretch', margin: '8px 0', background: band, opacity: 0.9 }} />
                    <span style={{ flex: 1, fontFamily: display, fontSize: 19, lineHeight: 1.05, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{it.title}</span>
                    {showAuthor && it.author && <span style={{ fontFamily: mono, fontSize: 9.5, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.7, whiteSpace: 'nowrap' }}>{it.author.split(' ').slice(-1)[0]}</span>}
                  </button>
                </h3>
                <div id={`${uid}-p${i}`} role="region" aria-labelledby={`${uid}-b${i}`} aria-hidden={!isOpen}
                  style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: `grid-template-rows ${dur}ms ${easing}`, visibility: isOpen ? 'visible' : 'hidden', transitionProperty: 'grid-template-rows, visibility', transitionDelay: isOpen ? '0ms' : `0ms, ${dur}ms` }}>
                  <div style={{ overflow: 'hidden', minHeight: 0 }}>
                    <div style={{ margin: '0 6px 10px', boxShadow: '0 10px 24px -14px rgba(28,25,23,0.45)', borderLeft: `6px solid ${c}`, opacity: isOpen ? 1 : 0, transition: `opacity ${dur}ms ${easing}` }}>
                      {pageSpread(it, i, '100%', true)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {shelfBar}
      </section>
    );
  }

  return (
    <section ref={rootRef} className={`book-spines ${uid}-root`} style={{ background: bg, color: ink, fontFamily: sans, padding: '64px 56px 72px', boxSizing: 'border-box', width: '100%', overflow: 'hidden' }}>
      <style>{css}</style>
      {header}
      <div ref={shelfRef} style={{ display: 'flex', alignItems: 'flex-end', gap, height: bookH, perspective: 1600, perspectiveOrigin: '50% 30%' }}>
        {n === 0 ? empty : items.map((it, i) => {
          const isOpen = open.includes(i);
          const c = spineAt(i);
          const tc = textOn(c);
          const hp = heightVariance ? heights[i % heights.length] : 100;
          const sw = isOpen ? spineBase : closedW;
          return (
            <div key={i} style={{
              position: 'relative', flex: isOpen ? `1 1 ${spineBase}px` : `0 0 ${closedW}px`, minWidth: 0, height: isOpen ? '100%' : `${hp}%`,
              transform: isOpen && pullForward ? 'translate3d(0,-6px,34px)' : 'translate3d(0,0,0)', zIndex: isOpen ? 2 : 1,
              transition: `flex-grow ${dur}ms ${easing}, flex-basis ${dur}ms ${easing}, height ${dur}ms ${easing}, transform ${dur}ms ${easing}`,
              boxShadow: isOpen ? '0 30px 40px -24px rgba(28,25,23,0.5), 0 2px 6px rgba(28,25,23,0.12)' : '0 6px 10px -6px rgba(28,25,23,0.35)'
            }}>
              <button ref={(el) => { btnRefs.current[i] = el; }} id={`${uid}-b${i}`} className={`${uid}-btn`} aria-expanded={isOpen} aria-controls={`${uid}-p${i}`}
                aria-label={`${it.title}${it.author ? ' by ' + it.author : ''}, volume ${i + 1}`}
                onClick={() => toggle(i)} onKeyDown={(e) => onKey(e, i)}
                style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: sw, background: c, color: tc, overflow: 'hidden', borderRadius: '2px 1px 1px 2px',
                  transition: `width ${dur}ms ${easing}`,
                  boxShadow: 'inset 3px 0 4px -2px rgba(255,255,255,0.25), inset -5px 0 8px -4px rgba(0,0,0,0.28)' }}>
                <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,0.12), rgba(255,255,255,0.08) 30%, rgba(255,255,255,0) 55%, rgba(0,0,0,0.16))' }} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 0 18px' }}>
                  {showVolume && <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.08em', opacity: 0.8 }}>{vol(i)}</div>}
                  <div aria-hidden="true" style={{ width: '100%', marginTop: 14 }}>
                    <div style={{ height: 1, background: band, opacity: 0.8 }} />
                    <div style={{ height: 9, background: band, marginTop: 3 }} />
                    <div style={{ height: 1, background: band, opacity: 0.8, marginTop: 3 }} />
                  </div>
                  <div style={{ flex: 1, minHeight: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '18px 0' }}>
                    <span style={{ writingMode: 'vertical-rl', fontFamily: display, fontSize: Math.min(spineTitleSize, sw * 0.36), lineHeight: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxHeight: '100%', letterSpacing: '0.01em' }}>{it.title}</span>
                  </div>
                  {showAuthor && it.author && (
                    <span style={{ writingMode: 'vertical-rl', fontFamily: mono, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.72, marginBottom: 14, whiteSpace: 'nowrap' }}>{it.author.split(' ').slice(-1)[0]}</span>
                  )}
                  <div aria-hidden="true" style={{ width: 14, height: 14, borderRadius: '50%', border: `1px solid ${tc}`, opacity: 0.55, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: tc }} />
                  </div>
                </div>
              </button>
              <div id={`${uid}-p${i}`} role="region" aria-labelledby={`${uid}-b${i}`} aria-hidden={!isOpen}
                style={{ position: 'absolute', top: 0, bottom: 0, left: sw, right: 0, overflow: 'hidden', background: paper, transition: `left ${dur}ms ${easing}`, visibility: isOpen ? 'visible' : 'hidden', transitionProperty: 'left, visibility', transitionDelay: isOpen ? '0ms' : `0ms, ${dur}ms` }}>
                <div aria-hidden="true" style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 12, background: c, zIndex: 1, boxShadow: 'inset -4px 0 6px -3px rgba(0,0,0,0.3)' }} />
                <div style={{ position: 'absolute', left: 12, top: 0, bottom: 0, opacity: isOpen ? 1 : 0, transform: isOpen ? 'translateX(0)' : 'translateX(-24px)',
                  transition: `opacity ${Math.round(dur * 0.7)}ms ${easing} ${isOpen ? Math.round(dur * 0.3) : 0}ms, transform ${dur}ms ${easing}` }}>
                  {pageSpread(it, i, spreadW - 12, false)}
                </div>
              </div>
            </div>
          );
        })}
        {showBookend && n > 0 && (
          <div aria-hidden="true" style={{ flex: `0 0 ${bookendW}px`, height: '46%', position: 'relative', marginLeft: anyOpen ? 'auto' : 8 }}>
            <div style={{ position: 'absolute', left: 0, bottom: 0, width: 5, height: '100%', background: `linear-gradient(90deg, ${muted}, ${ink})`, borderRadius: '2px 2px 0 0', opacity: 0.85 }} />
            <div style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: 4, background: ink, opacity: 0.8 }} />
          </div>
        )}
      </div>
      {shelfBar}
    </section>
  );
}

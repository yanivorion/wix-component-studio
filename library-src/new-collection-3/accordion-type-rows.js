const MANIFEST = {
  "type": "Accordion.TypeRows",
  "description": "Accordion whose closed rows are single huge grotesk words; opening a row rolls the word's letters one by one to a lighter weight while the row expands with a smooth height animation, revealing a two-column body (mono meta left, text and image right) whose lines rise in; the plus turns into a cross; full keyboard and ARIA support",
  "editorElement": {
    "selector": ".type-rows",
    "displayName": "Type Rows",
    "archetype": "container",
    "data": {
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "What we do", "group": "Content" },
      "headerRight": { "dataType": "text", "displayName": "Header Right Label", "defaultValue": "Five disciplines, one studio", "group": "Content" },
      "item1Title": { "dataType": "text", "displayName": "Item 1 Word", "defaultValue": "Identity", "group": "Items" },
      "item1Tags": { "dataType": "text", "displayName": "Item 1 Tags", "defaultValue": "Strategy · Naming · Systems", "group": "Items" },
      "item1Meta": { "dataType": "text", "displayName": "Item 1 Meta (Label: value; …)", "defaultValue": "Lead time: 8–12 weeks; Team: 4 designers; Output: Brand book, type, motion kit; Recent: Halden Museum", "group": "Items" },
      "item1Text": { "dataType": "text", "displayName": "Item 1 Text", "defaultValue": "We build identities as systems rather than logos: a voice, a grid, a typeface and a set of rules flexible enough to survive a decade of use by people we will never meet.", "group": "Items" },
      "item2Title": { "dataType": "text", "displayName": "Item 2 Word", "defaultValue": "Digital", "group": "Items" },
      "item2Tags": { "dataType": "text", "displayName": "Item 2 Tags", "defaultValue": "Product · Web · Interface", "group": "Items" },
      "item2Meta": { "dataType": "text", "displayName": "Item 2 Meta", "defaultValue": "Lead time: 10–16 weeks; Team: 3 designers, 2 engineers; Output: Design system, site, prototypes; Recent: Nordlys Energy", "group": "Items" },
      "item2Text": { "dataType": "text", "displayName": "Item 2 Text", "defaultValue": "Interfaces that feel inevitable. We design and build fast, accessible sites and products, with motion that explains rather than decorates.", "group": "Items" },
      "item3Title": { "dataType": "text", "displayName": "Item 3 Word", "defaultValue": "Motion", "group": "Items" },
      "item3Tags": { "dataType": "text", "displayName": "Item 3 Tags", "defaultValue": "Brand film · Type in motion", "group": "Items" },
      "item3Meta": { "dataType": "text", "displayName": "Item 3 Meta", "defaultValue": "Lead time: 4–8 weeks; Team: 2 animators; Output: Idents, social kit, guidelines; Recent: Kessler Audio", "group": "Items" },
      "item3Text": { "dataType": "text", "displayName": "Item 3 Text", "defaultValue": "Every identity has a tempo. We find it, then choreograph type, colour and image so the brand moves the way it speaks.", "group": "Items" },
      "item4Title": { "dataType": "text", "displayName": "Item 4 Word", "defaultValue": "Spaces", "group": "Items" },
      "item4Tags": { "dataType": "text", "displayName": "Item 4 Tags", "defaultValue": "Wayfinding · Exhibition", "group": "Items" },
      "item4Meta": { "dataType": "text", "displayName": "Item 4 Meta", "defaultValue": "Lead time: 12–20 weeks; Team: 3 designers, 1 architect; Output: Signage, exhibition graphics; Recent: Vale Library", "group": "Items" },
      "item4Text": { "dataType": "text", "displayName": "Item 4 Text", "defaultValue": "Graphics at the scale of a building. Wayfinding, exhibitions and environments where typography has to work at a glance and from forty metres away.", "group": "Items" },
      "item5Title": { "dataType": "text", "displayName": "Item 5 Word", "defaultValue": "Editorial", "group": "Items" },
      "item5Tags": { "dataType": "text", "displayName": "Item 5 Tags", "defaultValue": "Books · Magazines · Reports", "group": "Items" },
      "item5Meta": { "dataType": "text", "displayName": "Item 5 Meta", "defaultValue": "Lead time: 6–14 weeks; Team: 2 designers, 1 editor; Output: Books, annuals, journals; Recent: Atlas Quarterly", "group": "Items" },
      "item5Text": { "dataType": "text", "displayName": "Item 5 Text", "defaultValue": "Books and publications with a pulse. We set long texts so they are a pleasure to read, and short ones so they are impossible to ignore.", "group": "Items" },
      "images": { "dataType": "text", "displayName": "Image URLs (comma separated, one per item)", "defaultValue": "https://picsum.photos/id/36/1200/800,https://picsum.photos/id/119/1200/800,https://picsum.photos/id/39/1200/800,https://picsum.photos/id/192/1200/800,https://picsum.photos/id/403/1200/800", "group": "Images" },
      "defaultOpen": { "dataType": "select", "displayName": "Open By Default", "defaultValue": "1", "options": ["none", "1", "2", "3", "4", "5"], "group": "Layout" },
      "allowMultiple": { "dataType": "booleanValue", "displayName": "Allow Multiple Open", "defaultValue": "false", "group": "Layout" },
      "showImages": { "dataType": "booleanValue", "displayName": "Show Images", "defaultValue": "true", "group": "Layout" },
      "showTags": { "dataType": "booleanValue", "displayName": "Show Row Tags", "defaultValue": "true", "group": "Layout" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#0B0B0C", "group": "Colors" },
      "textColor": { "dataType": "color", "displayName": "Text", "defaultValue": "#EDECE8", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#8A8780", "group": "Colors" },
      "lineColor": { "dataType": "color", "displayName": "Rules", "defaultValue": "#2A2A2C", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent", "defaultValue": "#E8590C", "group": "Colors" },
      "font": { "dataType": "select", "displayName": "Word Font", "defaultValue": "Inter Tight", "options": ["Inter Tight", "Geist", "Manrope", "Archivo", "Hanken Grotesk"], "group": "Typography" },
      "closedWeight": { "dataType": "select", "displayName": "Closed Weight", "defaultValue": "500", "options": ["400", "500"], "group": "Typography" },
      "openWeight": { "dataType": "select", "displayName": "Open Weight", "defaultValue": "300", "options": ["200", "300", "400"], "group": "Typography" },
      "wordSize": { "dataType": "select", "displayName": "Word Size", "defaultValue": "L", "options": ["M", "L", "XL"], "group": "Typography" },
      "letterStagger": { "dataType": "select", "displayName": "Letter Stagger (ms)", "defaultValue": "32", "options": ["16", "32", "48", "64"], "group": "Animation" },
      "duration": { "dataType": "select", "displayName": "Expand Duration (ms)", "defaultValue": "850", "options": ["600", "850", "1100"], "group": "Animation" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const D = [
    ['Identity', 'Strategy · Naming · Systems', 'Lead time: 8–12 weeks; Team: 4 designers; Output: Brand book, type, motion kit; Recent: Halden Museum', 'We build identities as systems rather than logos: a voice, a grid, a typeface and a set of rules flexible enough to survive a decade of use by people we will never meet.'],
    ['Digital', 'Product · Web · Interface', 'Lead time: 10–16 weeks; Team: 3 designers, 2 engineers; Output: Design system, site, prototypes; Recent: Nordlys Energy', 'Interfaces that feel inevitable. We design and build fast, accessible sites and products, with motion that explains rather than decorates.'],
    ['Motion', 'Brand film · Type in motion', 'Lead time: 4–8 weeks; Team: 2 animators; Output: Idents, social kit, guidelines; Recent: Kessler Audio', 'Every identity has a tempo. We find it, then choreograph type, colour and image so the brand moves the way it speaks.'],
    ['Spaces', 'Wayfinding · Exhibition', 'Lead time: 12–20 weeks; Team: 3 designers, 1 architect; Output: Signage, exhibition graphics; Recent: Vale Library', 'Graphics at the scale of a building. Wayfinding, exhibitions and environments where typography has to work at a glance and from forty metres away.'],
    ['Editorial', 'Books · Magazines · Reports', 'Lead time: 6–14 weeks; Team: 2 designers, 1 editor; Output: Books, annuals, journals; Recent: Atlas Quarterly', 'Books and publications with a pulse. We set long texts so they are a pleasure to read, and short ones so they are impossible to ignore.']
  ];
  const imgs = String(config?.images || 'https://picsum.photos/id/36/1200/800,https://picsum.photos/id/119/1200/800,https://picsum.photos/id/39/1200/800,https://picsum.photos/id/192/1200/800,https://picsum.photos/id/403/1200/800').split(',').map((s) => s.trim()).filter(Boolean);
  const items = D.map((d, i) => ({
    title: config?.[`item${i + 1}Title`] ?? d[0],
    tags: config?.[`item${i + 1}Tags`] ?? d[1],
    meta: String(config?.[`item${i + 1}Meta`] ?? d[2]).split(';').map((s) => s.trim()).filter(Boolean).map((s) => {
      const k = s.indexOf(':');
      return k > 0 ? [s.slice(0, k).trim(), s.slice(k + 1).trim()] : ['', s];
    }),
    text: config?.[`item${i + 1}Text`] ?? d[3],
    image: imgs[i] || ''
  })).filter((it) => String(it.title || '').trim());

  const eyebrow = config?.eyebrow || 'What we do';
  const headerRight = config?.headerRight || 'Five disciplines, one studio';
  const defOpen = config?.defaultOpen || '1';
  const allowMultiple = bool(config?.allowMultiple, false);
  const showImages = bool(config?.showImages, true);
  const showTags = bool(config?.showTags, true);
  const bg = config?.backgroundColor || '#0B0B0C';
  const text = config?.textColor || '#EDECE8';
  const muted = config?.mutedColor || '#8A8780';
  const line = config?.lineColor || '#2A2A2C';
  const accent = config?.accentColor || '#E8590C';
  const fontName = config?.font || 'Inter Tight';
  const wClosed = config?.closedWeight || '500';
  const wOpen = config?.openWeight || '300';
  const sizeKey = config?.wordSize || 'L';
  const stagger = parseInt(config?.letterStagger || '32', 10) || 32;
  const dur = parseInt(config?.duration || '850', 10) || 850;

  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const uid = React.useMemo(() => 'tr' + Math.random().toString(36).slice(2, 8), []);

  React.useEffect(() => {
    const fam = {
      'Inter Tight': 'Inter+Tight:wght@200;300;400;500',
      'Geist': 'Geist:wght@200;300;400;500',
      'Manrope': 'Manrope:wght@200;300;400;500',
      'Archivo': 'Archivo:wght@200;300;400;500',
      'Hanken Grotesk': 'Hanken+Grotesk:wght@200;300;400;500'
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
  const btnRefs = React.useRef([]);
  const wordRefs = React.useRef([]);
  const [width, setWidth] = React.useState(1280);
  const initial = defOpen === 'none' ? [] : [Math.max(0, parseInt(defOpen, 10) - 1)];
  const [open, setOpen] = React.useState(initial);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return undefined;
    const measure = () => setWidth(el.clientWidth || 1280);
    measure();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (ro) ro.observe(el);
    const r = requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)));
    return () => { if (ro) ro.disconnect(); cancelAnimationFrame(r); };
  }, []);

  React.useEffect(() => { setOpen(defOpen === 'none' ? [] : [Math.max(0, parseInt(defOpen, 10) - 1)]); }, [defOpen]);

  // assign each body word its line index so whole lines rise together
  React.useLayoutEffect(() => {
    const run = () => {
      wordRefs.current.forEach((arr) => {
        if (!arr) return;
        let lastTop = null; let li = -1;
        arr.forEach((el) => {
          if (!el) return;
          const t = el.offsetTop;
          if (lastTop === null || Math.abs(t - lastTop) > 4) { li += 1; lastTop = t; }
          el.style.setProperty('--l', li);
        });
      });
    };
    run();
    const fonts = typeof document !== 'undefined' ? document.fonts : null;
    if (fonts && fonts.ready) fonts.ready.then(run);
    const t = setTimeout(run, 900);
    return () => clearTimeout(t);
  }, [width, items.length, fontName]);

  const toggle = (i) => {
    setOpen((o) => {
      const isOpen = o.includes(i);
      if (allowMultiple) return isOpen ? o.filter((x) => x !== i) : [...o, i];
      return isOpen ? [] : [i];
    });
  };
  const onKey = (e, i) => {
    const n = items.length;
    let t = null;
    if (e.key === 'ArrowDown') t = (i + 1) % n;
    else if (e.key === 'ArrowUp') t = (i - 1 + n) % n;
    else if (e.key === 'Home') t = 0;
    else if (e.key === 'End') t = n - 1;
    else if (e.key === 'Escape' && open.includes(i)) { e.preventDefault(); toggle(i); return; }
    if (t !== null) { e.preventDefault(); btnRefs.current[t] && btnRefs.current[t].focus(); }
  };

  const compact = width < 760;
  const pad = compact ? 20 : Math.max(32, Math.round(width * 0.035));
  const sizeMul = sizeKey === 'XL' ? 0.118 : sizeKey === 'M' ? 0.078 : 0.098;
  const fs = compact ? Math.max(44, Math.round(width * 0.15)) : Math.round(Math.min(sizeKey === 'XL' ? 190 : 150, width * sizeMul));
  const sans = `"${fontName}", "Inter", -apple-system, "Helvetica Neue", Arial, sans-serif`;
  const mono = '"JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace';
  const ease = 'cubic-bezier(0.65,0,0.35,1)';
  const easeOut = 'cubic-bezier(0.22,1,0.36,1)';
  const pad2 = (n) => String(n).padStart(2, '0');
  const p = uid;
  const btnReset = { appearance: 'none', border: 'none', background: 'transparent', padding: 0, margin: 0, font: 'inherit', color: 'inherit', cursor: 'pointer', textAlign: 'left', width: '100%' };
  const mo = (on) => (reduced ? 'none' : on);

  if (!items.length) {
    return <section className="type-rows" style={{ padding: 64, background: bg, color: muted, fontFamily: mono, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', textAlign: 'center' }}>Add an item to begin</section>;
  }

  return (
    <section ref={rootRef} className={`type-rows ${p}`} aria-label={eyebrow}
      style={{ position: 'relative', width: '100%', boxSizing: 'border-box', padding: `${compact ? 26 : 34}px ${pad}px ${compact ? 34 : 48}px`, background: bg, color: text, fontFamily: sans, overflow: 'hidden' }}>
      <style>{`
        .${p} .${p}-hd:focus-visible { outline: none; }
        .${p} .${p}-hd:focus-visible .${p}-word { text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 0.12em; text-decoration-color: ${accent}; }
        .${p} .${p}-hd:focus-visible .${p}-ico { box-shadow: 0 0 0 2px ${accent}; }
        .${p} .${p}-hd .${p}-shift { transition: transform 700ms ${easeOut}; }
        .${p} .${p}-hd:hover .${p}-shift { transform: translateX(${compact ? 6 : 14}px); }
        .${p} .${p}-hd .${p}-idx { transition: color 400ms ease; }
        .${p} .${p}-hd:hover .${p}-idx { color: ${accent}; }
        .${p} .${p}-hd .${p}-ico { transition: background-color 400ms ease, border-color 400ms ease, box-shadow .2s; }
        .${p} .${p}-hd:hover .${p}-ico { border-color: ${text}; }
        @keyframes ${p}-in { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: reduce) { .${p} * { transition: none !important; animation: none !important; } }
      `}</style>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, paddingBottom: compact ? 14 : 18, fontFamily: mono, fontSize: compact ? 10 : 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: muted, animation: mo(`${p}-in 700ms ${easeOut} both`) }}>
        <span><span style={{ color: accent }}>●</span>&nbsp;&nbsp;{eyebrow}</span>
        {!compact && <span>{headerRight}</span>}
        <span style={{ fontVariantNumeric: 'tabular-nums' }}>{pad2(items.length)} Items</span>
      </div>

      <div>
        {items.map((it, i) => {
          const isOpen = open.includes(i);
          const hid = `${p}-h${i}`;
          const rid = `${p}-r${i}`;
          const letters = Array.from(String(it.title));
          const n = letters.length;
          const words = String(it.text || '').split(/\s+/).filter(Boolean);
          if (!wordRefs.current[i]) wordRefs.current[i] = [];
          wordRefs.current[i].length = words.length;
          const iconSize = compact ? 34 : 46;
          return (
            <div key={i} style={{ borderTop: `1px solid ${line}`, borderBottom: i === items.length - 1 ? `1px solid ${line}` : 'none', animation: mo(`${p}-in 800ms ${easeOut} ${80 + i * 70}ms both`) }}>
              <h3 style={{ margin: 0, fontWeight: 'inherit' }}>
                <button
                  ref={(el) => { btnRefs.current[i] = el; }}
                  id={hid}
                  type="button"
                  className={`${p}-hd`}
                  aria-expanded={isOpen}
                  aria-controls={rid}
                  onClick={() => toggle(i)}
                  onKeyDown={(e) => onKey(e, i)}
                  style={{ ...btnReset, display: 'grid', gridTemplateColumns: compact ? `28px 1fr ${iconSize}px` : `minmax(56px, 8.33%) 1fr auto ${iconSize}px`, alignItems: 'center', gap: compact ? 10 : 24, padding: `${compact ? 8 : 10}px 0` }}>
                  <span className={`${p}-idx`} style={{ fontFamily: mono, fontSize: compact ? 10 : 12, letterSpacing: '0.08em', color: isOpen ? accent : muted, alignSelf: 'start', paddingTop: fs * 0.2, transition: 'color 400ms ease' }}>{pad2(i + 1)}</span>
                  <span className={`${p}-shift`} style={{ display: 'block', minWidth: 0 }}>
                    <span className={`${p}-word`} style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap' }}>{it.title}</span>
                    <span aria-hidden="true" style={{ display: 'flex', fontSize: fs, lineHeight: 1.08, letterSpacing: '-0.045em', whiteSpace: 'nowrap' }}>
                      {letters.map((ch, k) => {
                        const d = reduced ? 0 : (isOpen ? k : n - 1 - k) * stagger;
                        const tr = reduced || !ready ? 'none' : `transform ${dur * 0.82}ms ${ease} ${d}ms`;
                        const glyph = ch === ' ' ? ' ' : ch;
                        return (
                          <span key={k} style={{ display: 'inline-grid', overflow: 'hidden', paddingBottom: '0.06em', marginBottom: '-0.06em' }}>
                            <span style={{ gridArea: '1 / 1', fontWeight: wClosed, transform: isOpen ? 'translateY(-105%)' : 'none', transition: tr }}>{glyph}</span>
                            <span style={{ gridArea: '1 / 1', fontWeight: wOpen, transform: isOpen ? 'none' : 'translateY(105%)', transition: tr, textAlign: 'center' }}>{glyph}</span>
                          </span>
                        );
                      })}
                    </span>
                  </span>
                  {!compact && (
                    <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: muted, whiteSpace: 'nowrap', opacity: showTags ? (isOpen ? 0 : 1) : 0, transform: isOpen ? 'translateY(-8px)' : 'none', transition: reduced ? 'none' : `opacity 400ms ease, transform 600ms ${easeOut}` }}>{it.tags}</span>
                  )}
                  <span className={`${p}-ico`} aria-hidden="true" style={{ position: 'relative', width: iconSize, height: iconSize, borderRadius: '50%', border: `1px solid ${isOpen ? accent : line}`, background: isOpen ? accent : 'transparent', justifySelf: 'end' }}>
                    <span style={{ position: 'absolute', inset: 0, transform: isOpen ? 'rotate(135deg)' : 'none', transition: reduced ? 'none' : `transform ${dur}ms cubic-bezier(0.34,1.4,0.5,1)` }}>
                      <span style={{ position: 'absolute', left: '50%', top: '50%', width: iconSize * 0.36, height: 1.5, marginLeft: -iconSize * 0.18, marginTop: -0.75, background: isOpen ? bg : text }} />
                      <span style={{ position: 'absolute', left: '50%', top: '50%', width: 1.5, height: iconSize * 0.36, marginTop: -iconSize * 0.18, marginLeft: -0.75, background: isOpen ? bg : text }} />
                    </span>
                  </span>
                </button>
              </h3>
              <div id={rid} role="region" aria-labelledby={hid} inert={!isOpen}
                style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: reduced || !ready ? 'none' : `grid-template-rows ${dur}ms ${ease}` }}>
                <div style={{ overflow: 'hidden', minHeight: 0 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: compact ? '1fr' : 'minmax(56px, 8.33%) minmax(0, 3fr) minmax(0, 8fr)', columnGap: 24, rowGap: 22, padding: compact ? '10px 0 28px' : `${Math.round(fs * 0.12)}px 0 ${compact ? 28 : 44}px` }}>
                    {!compact && <span />}
                    <dl style={{ margin: 0, display: 'grid', gap: compact ? 10 : 14, alignContent: 'start', fontFamily: mono, fontSize: compact ? 10.5 : 11.5, lineHeight: 1.45 }}>
                      {it.meta.map(([k, v], j) => (
                        <div key={j} style={{ overflow: 'hidden' }}>
                          <div style={{ transform: isOpen ? 'none' : 'translateY(110%)', opacity: isOpen ? 1 : 0, transition: reduced ? 'none' : isOpen ? `transform 800ms ${easeOut} ${260 + j * 70}ms, opacity 500ms ease ${260 + j * 70}ms` : 'transform 300ms ease, opacity 200ms ease' }}>
                            {k && <dt style={{ color: muted, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: compact ? 9.5 : 10 }}>{k}</dt>}
                            <dd style={{ margin: 0, color: text }}>{v}</dd>
                          </div>
                        </div>
                      ))}
                    </dl>
                    <div style={{ display: 'grid', gridTemplateColumns: compact || !showImages || !it.image ? '1fr' : 'minmax(0, 1fr) minmax(0, 1fr)', gap: compact ? 20 : 32, alignItems: 'start' }}>
                      <p style={{ margin: 0, fontSize: compact ? 18 : Math.round(Math.min(26, Math.max(19, width * 0.018))), lineHeight: 1.3, letterSpacing: '-0.015em', fontWeight: 300, color: text }}>
                        {words.map((w, j) => (
                          <React.Fragment key={j}>
                            <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', paddingBottom: '0.08em', marginBottom: '-0.08em' }}>
                              <span ref={(el) => { wordRefs.current[i][j] = el; }}
                                style={{ display: 'inline-block', transform: isOpen ? 'none' : 'translateY(110%)', transition: reduced ? 'none' : isOpen ? `transform 900ms ${easeOut} calc(${Math.round(dur * 0.32)}ms + var(--l, 0) * 75ms)` : 'transform 300ms ease' }}>{w}</span>
                            </span>{j < words.length - 1 ? ' ' : ''}
                          </React.Fragment>
                        ))}
                      </p>
                      {showImages && it.image && (
                        <div style={{ position: 'relative', aspectRatio: '3 / 2', overflow: 'hidden', background: line, clipPath: isOpen ? 'inset(0 0 0 0)' : 'inset(100% 0 0 0)', transition: reduced ? 'none' : isOpen ? `clip-path 1000ms ${ease} ${Math.round(dur * 0.25)}ms` : 'clip-path 400ms ease' }}>
                          <img src={it.image} alt={`${it.title} — project image`} loading="lazy" draggable="false"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: isOpen ? 'scale(1)' : 'scale(1.18)', transition: reduced ? 'none' : `transform 1400ms ${easeOut} ${Math.round(dur * 0.25)}ms` }} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

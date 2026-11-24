const MANIFEST = {
  "type": "Accordion.IndexCards",
  "description": "A card-catalogue drawer as an accordion: staggered lettered tabs lift a ruled, typewritten index card out of the drawer and lay it on top while the others slide back down",
  "editorElement": {
    "selector": ".index-cards",
    "displayName": "Index Cards Accordion",
    "archetype": "container",
    "data": {
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Card catalogue / Drawer 12", "group": "Content" },
      "title": { "dataType": "text", "displayName": "Title", "defaultValue": "Filed under process", "group": "Content" },
      "description": { "dataType": "text", "displayName": "Description", "defaultValue": "Six working principles, typed up and kept in the drawer. Pull a tab to take a card out.", "group": "Content" },
      "items": { "dataType": "text", "displayName": "Cards (Title|Text|Date, separated by ;; or new lines)", "defaultValue": "Archive first|Before we draw anything we read everything: briefs, old drafts, letters, the margins of past projects. Most good answers are already in the drawer.|12 MAR 1987;;Brief as contract|One page, signed by both sides. It names the problem, the reader and the measure of success, and it is pinned above the desk until the work ships.|04 APR 1987;;Coarse to fine|Pencil, then ink, then type. Each pass removes options rather than adding them, so the final decision always feels inevitable.|19 MAY 1987;;Draft in public|Work goes on the wall at the end of every day. Anyone may annotate it in red; nobody may remove another note.|02 JUN 1987;;Edit by subtraction|When a page feels busy, take one thing away and look again. Repeat until removing anything else would make it worse.|27 JUL 1987;;File the leftovers|Every rejected idea is typed onto a card and returned to the drawer. Half of next year's work starts here.|15 AUG 1987", "group": "Items" },
      "tabLabels": { "dataType": "text", "displayName": "Tab Labels (comma separated)", "defaultValue": "A,B,C,D,E,F,G,H", "group": "Items" },
      "defaultOpen": { "dataType": "select", "displayName": "Open By Default", "defaultValue": "1", "options": ["none", "1", "2", "3", "4", "5", "6"], "group": "Items" },
      "selectMode": { "dataType": "select", "displayName": "Open Mode", "defaultValue": "single", "options": ["single", "multiple"], "group": "Items" },
      "allowCollapse": { "dataType": "booleanValue", "displayName": "Allow Closing All", "defaultValue": "true", "group": "Items" },
      "stampText": { "dataType": "text", "displayName": "Stamp Text", "defaultValue": "Catalogued", "group": "Content" },
      "drawerLabel": { "dataType": "text", "displayName": "Drawer Label", "defaultValue": "Process", "group": "Content" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#F5F5F4", "group": "Colors" },
      "cardColor": { "dataType": "color", "displayName": "Card", "defaultValue": "#FBF8F1", "group": "Colors" },
      "inkColor": { "dataType": "color", "displayName": "Ink", "defaultValue": "#1C1917", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#78716C", "group": "Colors" },
      "ruleColor": { "dataType": "color", "displayName": "Ruled Lines", "defaultValue": "#C9D2D9", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Margin Rule & Stamp", "defaultValue": "#B4412F", "group": "Colors" },
      "drawerColor": { "dataType": "color", "displayName": "Drawer", "defaultValue": "#3A3531", "group": "Colors" },
      "brassColor": { "dataType": "color", "displayName": "Brass Fittings", "defaultValue": "#B39A6B", "group": "Colors" },
      "typewriterFont": { "dataType": "select", "displayName": "Typewriter Font", "defaultValue": "Courier Prime", "options": ["Courier Prime", "IBM Plex Mono", "Courier New"], "group": "Typography" },
      "headingFont": { "dataType": "select", "displayName": "Heading Font", "defaultValue": "Fraunces", "options": ["Fraunces", "Inter", "Georgia"], "group": "Typography" },
      "titleSize": { "dataType": "select", "displayName": "Heading Size (px)", "defaultValue": "56", "options": ["40", "48", "56", "64"], "group": "Typography" },
      "cardTitleSize": { "dataType": "select", "displayName": "Card Title Size (px)", "defaultValue": "24", "options": ["18", "20", "24", "28"], "group": "Typography" },
      "showHeader": { "dataType": "booleanValue", "displayName": "Show Header", "defaultValue": "true", "group": "Layout" },
      "showRuledLines": { "dataType": "booleanValue", "displayName": "Ruled Lines", "defaultValue": "true", "group": "Layout" },
      "showStamp": { "dataType": "booleanValue", "displayName": "Show Stamp", "defaultValue": "true", "group": "Layout" },
      "showHole": { "dataType": "booleanValue", "displayName": "Rod Hole", "defaultValue": "true", "group": "Layout" },
      "tilt": { "dataType": "select", "displayName": "Card Tilt", "defaultValue": "subtle", "options": ["none", "subtle", "playful"], "group": "Layout" },
      "duration": { "dataType": "select", "displayName": "Lift Duration (ms)", "defaultValue": "700", "options": ["450", "600", "700", "900"], "group": "Animation" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const eyebrow = config?.eyebrow || 'Card catalogue / Drawer 12';
  const title = config?.title || 'Filed under process';
  const description = config?.description || 'Six working principles, typed up and kept in the drawer. Pull a tab to take a card out.';
  const itemsRaw = config?.items || 'Archive first|Before we draw anything we read everything.|12 MAR 1987;;Brief as contract|One page, signed by both sides.|04 APR 1987;;Coarse to fine|Pencil, then ink, then type.|19 MAY 1987';
  const labels = String(config?.tabLabels || 'A,B,C,D,E,F,G,H').split(',').map((s) => s.trim());
  const defaultOpen = config?.defaultOpen || '1';
  const multiple = (config?.selectMode || 'single') === 'multiple';
  const allowCollapse = bool(config?.allowCollapse, true);
  const stampText = config?.stampText || 'Catalogued';
  const drawerLabel = config?.drawerLabel || 'Process';
  const bg = config?.backgroundColor || '#F5F5F4';
  const cardColor = config?.cardColor || '#FBF8F1';
  const ink = config?.inkColor || '#1C1917';
  const muted = config?.mutedColor || '#78716C';
  const ruleColor = config?.ruleColor || '#C9D2D9';
  const accent = config?.accentColor || '#B4412F';
  const drawerColor = config?.drawerColor || '#3A3531';
  const brass = config?.brassColor || '#B39A6B';
  const typeFont = config?.typewriterFont || 'Courier Prime';
  const headingFont = config?.headingFont || 'Fraunces';
  const titleSize = parseInt(config?.titleSize || '56', 10);
  const cardTitleSize = parseInt(config?.cardTitleSize || '24', 10);
  const showHeader = bool(config?.showHeader, true);
  const showRuled = bool(config?.showRuledLines, true);
  const showStamp = bool(config?.showStamp, true);
  const showHole = bool(config?.showHole, true);
  const tiltK = { none: 0, subtle: 1, playful: 2.2 }[config?.tilt || 'subtle'] ?? 1;

  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const dur = reduced ? 0 : parseInt(config?.duration || '700', 10);
  const easing = 'cubic-bezier(.2,.8,.2,1)';

  const items = React.useMemo(() => String(itemsRaw).split(/\n|;;/).map((s) => s.trim()).filter(Boolean).map((line) => {
    const [t, b, d] = line.split('|').map((p) => (p || '').trim());
    return { title: t || 'Untitled', body: b || '', date: d || '' };
  }), [itemsRaw]);
  const n = items.length;

  const uid = React.useMemo(() => 'ic' + Math.random().toString(36).slice(2, 9), []);
  const rootRef = React.useRef(null);
  const stageRef = React.useRef(null);
  const btnRefs = React.useRef([]);
  const innerRefs = React.useRef([]);
  const [width, setWidth] = React.useState(1280);
  const [stageW, setStageW] = React.useState(720);
  const [cardH, setCardH] = React.useState(330);

  const initial = () => {
    const k = parseInt(defaultOpen, 10);
    return Number.isFinite(k) && k >= 1 && k <= n ? [k - 1] : [];
  };
  const [open, setOpen] = React.useState(initial);
  React.useEffect(() => { setOpen(initial()); }, [defaultOpen, n]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    const id = `nc-font-ic-${typeFont}-${headingFont}`.replace(/\s+/g, '-').toLowerCase();
    if (document.getElementById(id)) return;
    const fams = [];
    if (typeFont === 'Courier Prime') fams.push('Courier+Prime:ital,wght@0,400;0,700;1,400');
    if (typeFont === 'IBM Plex Mono') fams.push('IBM+Plex+Mono:wght@400;500');
    if (headingFont === 'Fraunces') fams.push('Fraunces:opsz,wght@9..144,300;9..144,400');
    if (headingFont === 'Inter') fams.push('Inter:wght@300;400;500');
    if (!fams.length) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?${fams.map((f) => 'family=' + f).join('&')}&display=swap`;
    document.head.appendChild(link);
  }, [typeFont, headingFont]);

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const measure = () => {
      setWidth(root.clientWidth);
      if (stageRef.current) setStageW(stageRef.current.clientWidth);
    };
    measure();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (ro) { ro.observe(root); if (stageRef.current) ro.observe(stageRef.current); }
    window.addEventListener('resize', measure);
    return () => { if (ro) ro.disconnect(); window.removeEventListener('resize', measure); };
  }, []);

  const compact = width < 820;
  const cardW = Math.min(stageW - (compact ? 0 : 40), 700);
  const tabH = compact ? 30 : 34;
  const tabW = Math.max(40, Math.min(104, (cardW - 40) / Math.max(1, n) - 6));

  React.useLayoutEffect(() => {
    let h = 0;
    innerRefs.current.slice(0, n).forEach((el) => { if (el) h = Math.max(h, el.offsetHeight); });
    if (h) setCardH(Math.max(compact ? 300 : 320, Math.ceil(h)));
  }, [items, cardW, compact, cardTitleSize, typeFont, n]);
  React.useEffect(() => {
    if (!document.fonts || !document.fonts.ready) return undefined;
    let alive = true;
    document.fonts.ready.then(() => {
      if (!alive) return;
      let h = 0;
      innerRefs.current.slice(0, n).forEach((el) => { if (el) h = Math.max(h, el.offsetHeight); });
      if (h) setCardH(Math.max(compact ? 300 : 320, Math.ceil(h)));
    });
    return () => { alive = false; };
  }, [n, compact, typeFont]);

  const toggle = (i) => {
    setOpen((prev) => {
      const isOpen = prev.includes(i);
      if (multiple) return isOpen ? prev.filter((x) => x !== i) : [...prev, i];
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
    else if (e.key === 'Escape' && open.length) { e.preventDefault(); setOpen(allowCollapse ? [] : open.slice(-1)); return; }
    if (j !== null) { e.preventDefault(); if (btnRefs.current[j]) btnRefs.current[j].focus(); }
  };

  const mono = typeFont === 'Courier New' ? '"Courier New", Courier, monospace' : `"${typeFont}", "Courier New", ui-monospace, monospace`;
  const heading = headingFont === 'Georgia' ? 'Georgia, serif' : headingFont === 'Inter' ? '"Inter", -apple-system, "Helvetica Neue", sans-serif' : '"Fraunces", Georgia, serif';
  const sans = '"Inter", -apple-system, "Helvetica Neue", sans-serif';

  const liftTop = tabH + 8;
  const pileExtra = multiple ? 36 : 0;
  const drawerTop = liftTop + cardH + pileExtra + tabH + (compact ? 22 : 30);
  const sliver = compact ? 36 : 46;
  const frontTop = drawerTop + sliver;
  const frontH = compact ? 92 : 118;
  const stageH = frontTop + frontH;
  const cardLeft = (stageW - cardW) / 2;
  const tabStep = n > 1 ? (cardW - 36 - tabW) / (n - 1) : 0;
  const lineH = compact ? 26 : 28;
  const headerH = compact ? 62 : 72;
  const tiltsOpen = [-1.1, 0.9, -0.6, 1.3, -0.9, 0.7, -1.2, 0.5];
  const tiltsShut = [0.45, -0.35, 0.25, -0.5, 0.35, -0.25, 0.4, -0.3];

  const css = `
    .${uid}-tab{appearance:none;-webkit-appearance:none;border:0;margin:0;font:inherit;cursor:pointer;color:inherit}
    .${uid}-tab:focus-visible{outline:2px solid ${accent};outline-offset:2px}
    .${uid}-tab:hover{filter:brightness(0.97)}
    @media (prefers-reduced-motion: reduce){.${uid}-root *{transition:none!important}}
  `;

  const header = showHeader && (
    <div style={{ maxWidth: compact ? '100%' : 340, marginBottom: compact ? 28 : 0, paddingTop: compact ? 0 : 24 }}>
      <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: muted, marginBottom: 18 }}>{eyebrow}</div>
      <h2 style={{ margin: 0, fontFamily: heading, fontWeight: 300, fontSize: compact ? Math.round(titleSize * 0.7) : titleSize, lineHeight: 1.02, letterSpacing: '-0.02em', color: ink }}>{title}</h2>
      <p style={{ margin: '20px 0 0', fontFamily: sans, fontSize: 15, lineHeight: 1.6, color: muted, maxWidth: 320 }}>{description}</p>
      {!compact && n > 0 && (
        <ol style={{ listStyle: 'none', margin: '36px 0 0', padding: 0, borderTop: `1px solid ${ruleColor}` }}>
          {items.map((it, i) => (
            <li key={i} style={{ display: 'flex', gap: 14, alignItems: 'baseline', padding: '9px 0', borderBottom: `1px solid ${ruleColor}`, fontFamily: mono, fontSize: 13, color: open.includes(i) ? ink : muted, transition: 'color 300ms' }}>
              <span style={{ color: open.includes(i) ? accent : muted, minWidth: 14 }}>{labels[i] || i + 1}</span>
              <span style={{ flex: 1 }}>{it.title}</span>
              <span style={{ opacity: open.includes(i) ? 1 : 0, transition: 'opacity 300ms', color: accent }}>&larr;</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );

  const card = (it, i) => {
    const isOpen = open.includes(i);
    const k = open.indexOf(i);
    const x = isOpen ? (k - (open.length - 1) / 2) * 16 : 0;
    const y = isOpen ? liftTop + k * 12 : drawerTop - (n - 1 - i) * 5;
    const rot = (isOpen ? tiltsOpen[i % 8] * 0.6 : tiltsShut[i % 8]) * tiltK;
    const z = isOpen ? 100 + k : 10 + i;
    const label = labels[i] || String(i + 1);
    return (
      <div key={i} style={{
        position: 'absolute', left: cardLeft, top: 0, width: cardW, height: cardH,
        transform: `translate3d(${x}px, ${y}px, 0) rotate(${rot}deg)`, transformOrigin: '50% 100%',
        zIndex: z, transition: `transform ${dur}ms ${easing}`
      }}>
        <button ref={(el) => { btnRefs.current[i] = el; }} id={`${uid}-t${i}`} className={`${uid}-tab`} aria-expanded={isOpen} aria-controls={`${uid}-p${i}`}
          aria-label={`${label}: ${it.title}`} onClick={() => toggle(i)} onKeyDown={(e) => onKey(e, i)}
          style={{ position: 'absolute', top: -tabH + 1, left: 18 + i * tabStep, width: tabW, height: tabH, padding: 0, background: cardColor,
            borderRadius: '8px 8px 0 0', boxShadow: '0 -1px 0 rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            fontFamily: mono, fontSize: compact ? 14 : 16, color: isOpen ? accent : ink, fontWeight: 700 }}>
          <span>{label}</span>
          {!compact && tabW > 70 && <span style={{ fontWeight: 400, fontSize: 11, color: muted, letterSpacing: '0.04em' }}>{String(i + 1).padStart(3, '0')}</span>}
        </button>
        <div id={`${uid}-p${i}`} role="region" aria-labelledby={`${uid}-t${i}`} aria-hidden={!isOpen}
          style={{ position: 'absolute', inset: 0, background: cardColor, borderRadius: '2px 4px 3px 3px', overflow: 'hidden',
            boxShadow: isOpen ? '0 24px 40px -18px rgba(28,25,23,0.45), 0 2px 6px rgba(28,25,23,0.12)' : '0 -2px 6px -2px rgba(28,25,23,0.18)',
            transition: `box-shadow ${dur}ms ${easing}` }}>
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 90% at 20% 0%, rgba(255,255,255,0.6), rgba(255,255,255,0) 60%), linear-gradient(180deg, rgba(0,0,0,0) 70%, rgba(120,100,60,0.05))' }} />
          {showRuled && (
            <div aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, top: headerH, bottom: 0,
              backgroundImage: `repeating-linear-gradient(180deg, transparent 0 ${lineH - 1}px, ${ruleColor} ${lineH - 1}px ${lineH}px)` }} />
          )}
          <div aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, top: headerH - 2, height: 1.5, background: accent, opacity: 0.85 }} />
          <div aria-hidden="true" style={{ position: 'absolute', top: 0, bottom: 0, left: compact ? 40 : 64, width: 1.5, background: accent, opacity: 0.7 }} />
          {showHole && <div aria-hidden="true" style={{ position: 'absolute', left: '50%', bottom: 12, width: 18, height: 18, marginLeft: -9, borderRadius: '50%', background: bg, boxShadow: 'inset 0 2px 3px rgba(0,0,0,0.25)' }} />}
          <div ref={(el) => { innerRefs.current[i] = el; }} style={{ position: 'relative', padding: `0 ${compact ? 18 : 40}px ${compact ? 44 : 52}px ${compact ? 52 : 84}px` }}>
            <div style={{ height: headerH, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <h3 style={{ margin: 0, fontFamily: mono, fontWeight: 400, fontSize: compact ? Math.round(cardTitleSize * 0.78) : cardTitleSize, letterSpacing: '0.02em', textTransform: 'uppercase', color: ink, lineHeight: 1.1 }}>{it.title}</h3>
              <span style={{ fontFamily: mono, fontSize: compact ? 11 : 12, color: muted, whiteSpace: 'nowrap' }}>{label}&thinsp;&middot;&thinsp;{String(i + 1).padStart(3, '0')}</span>
            </div>
            <p style={{ margin: 0, paddingTop: Math.round(lineH * 0.18), fontFamily: mono, fontSize: compact ? 14 : 16, lineHeight: `${lineH}px`, color: ink, maxWidth: 520 }}>{it.body}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: lineH, minHeight: compact ? 56 : 64 }}>
              <div style={{ fontFamily: mono, fontSize: compact ? 12 : 13, lineHeight: `${lineH}px`, color: muted }}>
                <div>Ref. {String(12).padStart(2, '0')}/{label}{String(i + 1).padStart(2, '0')}</div>
                {it.date && <div>Filed {it.date}</div>}
              </div>
              {showStamp && (
                <div aria-hidden="true" style={{ transform: `rotate(${-7 + (i % 3) * 3}deg)`, border: `2px solid ${accent}`, padding: 3, color: accent, opacity: isOpen ? 0.82 : 0, transition: `opacity 300ms ${isOpen ? dur * 0.8 : 0}ms`, mixBlendMode: 'multiply', marginRight: compact ? 0 : 8 }}>
                  <div style={{ border: `1px solid ${accent}`, padding: compact ? '4px 8px' : '5px 12px', textAlign: 'center', fontFamily: mono, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                    <div style={{ fontSize: compact ? 11 : 13 }}>{stampText}</div>
                    {it.date && <div style={{ fontSize: compact ? 9 : 10, letterSpacing: '0.1em', marginTop: 2, fontWeight: 400 }}>{it.date}</div>}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const stage = (
    <div ref={stageRef} style={{ position: 'relative', flex: compact ? 'none' : 1, width: compact ? '100%' : 'auto', minWidth: 0, alignSelf: 'stretch', height: stageH }}>
      {n === 0 ? (
        <div style={{ padding: 48, fontFamily: mono, color: muted, border: `1px dashed ${muted}`, textAlign: 'center' }}>Add cards in the Items field: Title|Text|Date, separated by ;;</div>
      ) : (
        <React.Fragment>
          <div aria-hidden="true" style={{ position: 'absolute', left: cardLeft + 24, top: liftTop + 10, width: cardW - 48, height: cardH - 20, border: `1px dashed ${muted}`, borderRadius: 4, opacity: open.length ? 0 : 0.35, transition: 'opacity 400ms', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: mono, fontSize: 13, color: muted, letterSpacing: '0.08em' }}>
            Select a tab to pull a card
          </div>
          <div aria-hidden="true" style={{ position: 'absolute', left: cardLeft - 14, width: cardW + 28, top: drawerTop + 6, height: frontTop - drawerTop, background: drawerColor, filter: 'brightness(0.72)', borderRadius: '3px 3px 0 0', zIndex: 1 }} />
          <div style={{ position: 'absolute', inset: 0, clipPath: 'inset(-80px -80px 2px -80px)', zIndex: 2 }}>{items.map(card)}</div>
          <div aria-hidden="true" style={{ position: 'absolute', left: cardLeft - 20, width: cardW + 40, top: frontTop, height: frontH, zIndex: 50, background: `linear-gradient(180deg, rgba(255,255,255,0.1), rgba(0,0,0,0.12)), ${drawerColor}`, borderRadius: 4,
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -3px 0 rgba(0,0,0,0.2), 0 18px 30px -16px rgba(28,25,23,0.55)' }}>
            <div style={{ position: 'absolute', inset: 10, border: '1px solid rgba(255,255,255,0.08)', borderRadius: 3 }} />
            <div style={{ position: 'absolute', left: '50%', top: compact ? 14 : 20, transform: 'translateX(-50%)', width: compact ? 130 : 168, height: compact ? 34 : 42, borderRadius: 2, padding: 3, background: `linear-gradient(180deg, ${brass}, rgba(0,0,0,0.25)), ${brass}`, boxShadow: '0 1px 2px rgba(0,0,0,0.4)' }}>
              <div style={{ width: '100%', height: '100%', background: cardColor, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontFamily: mono, fontSize: compact ? 12 : 14, color: ink, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                <span>{labels[0] || 'A'}&thinsp;&ndash;&thinsp;{labels[n - 1] || n}</span>
                <span style={{ color: muted }}>{drawerLabel}</span>
              </div>
            </div>
            <svg width={compact ? 64 : 84} height={compact ? 22 : 28} viewBox="0 0 84 28" style={{ position: 'absolute', left: '50%', bottom: compact ? 12 : 18, transform: 'translateX(-50%)' }}>
              <path d="M6 4 C 6 22, 78 22, 78 4" fill="none" stroke={brass} strokeWidth="4" strokeLinecap="round" />
              <circle cx="6" cy="4" r="4" fill={brass} />
              <circle cx="78" cy="4" r="4" fill={brass} />
            </svg>
          </div>
        </React.Fragment>
      )}
    </div>
  );

  return (
    <section ref={rootRef} className={`index-cards ${uid}-root`} style={{ background: bg, color: ink, fontFamily: sans, padding: compact ? '40px 16px 48px' : '64px 56px 64px', boxSizing: 'border-box', width: '100%', overflow: 'hidden' }}>
      <style>{css}</style>
      <div style={{ display: 'flex', flexDirection: compact ? 'column' : 'row', gap: compact ? 0 : 56, alignItems: 'flex-start' }}>
        {header}
        {stage}
      </div>
    </section>
  );
}

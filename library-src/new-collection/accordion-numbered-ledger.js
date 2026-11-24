const MANIFEST = {
  "type": "Accordion.NumberedLedger",
  "description": "A luxurious FAQ ledger: giant outlined numerals fill solid as their row opens, hairlines draw across, answers reveal word by word, with a running counter and live search",
  "editorElement": {
    "selector": ".numbered-ledger",
    "displayName": "Numbered Ledger FAQ",
    "archetype": "container",
    "data": {
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "The atelier ledger", "group": "Content" },
      "title": { "dataType": "text", "displayName": "Title", "defaultValue": "Questions,", "group": "Content" },
      "titleItalic": { "dataType": "text", "displayName": "Title (Italic Line)", "defaultValue": "answered.", "group": "Content" },
      "items": { "dataType": "text", "displayName": "Entries (Question|Answer, separated by ;; or new lines)", "defaultValue": "How long does a commission take?|Most pieces take twelve to sixteen weeks from first drawing to delivery. We begin with a conversation and a visit, send sketches within a fortnight, and select the timber with you in the workshop before a single cut is made.;;Can I visit the workshop?|Yes, by appointment on Thursdays and Fridays. You are welcome to watch your piece being made at any stage, and many clients return for the final oiling.;;Which timbers do you work with?|English oak, ash, walnut and cherry, all air-dried for at least two years and sourced from woodlands within a hundred miles of the workshop.;;Do you deliver internationally?|We deliver and install throughout Europe ourselves, and work with a specialist fine-art shipper for everywhere else, crating each piece by hand.;;How is pricing calculated?|Each quotation is built from the timber, the hours at the bench and the complexity of the joinery. We share a full breakdown with every proposal, so nothing is hidden.;;What does the guarantee cover?|Every piece carries a lifetime guarantee on joinery and construction. If a joint ever moves, we will collect it, repair it and return it at no cost.;;Can you restore an existing piece?|We take on a small number of restorations each year, favouring pieces with a story. Send us photographs and we will tell you honestly whether it is worth saving.;;How should I care for an oiled finish?|Dust with a dry cloth, wipe spills promptly and re-oil once a year with the tin we leave you. The surface will deepen in colour and only grow more beautiful.", "group": "Items" },
      "defaultOpen": { "dataType": "select", "displayName": "Open By Default", "defaultValue": "2", "options": ["none", "1", "2", "3", "4", "5", "6", "7", "8"], "group": "Items" },
      "selectMode": { "dataType": "select", "displayName": "Open Mode", "defaultValue": "single", "options": ["single", "multiple"], "group": "Items" },
      "allowCollapse": { "dataType": "booleanValue", "displayName": "Allow Closing All", "defaultValue": "true", "group": "Items" },
      "showSearch": { "dataType": "booleanValue", "displayName": "Show Search", "defaultValue": "true", "group": "Layout" },
      "searchPlaceholder": { "dataType": "text", "displayName": "Search Placeholder", "defaultValue": "Search the ledger", "group": "Content" },
      "showCounter": { "dataType": "booleanValue", "displayName": "Show Counter", "defaultValue": "true", "group": "Layout" },
      "theme": { "dataType": "select", "displayName": "Variant", "defaultValue": "dark", "options": ["light", "dark"], "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent", "defaultValue": "#C8A97E", "group": "Colors" },
      "lightBackground": { "dataType": "color", "displayName": "Light Background", "defaultValue": "#FAFAF9", "group": "Colors" },
      "lightInk": { "dataType": "color", "displayName": "Light Ink", "defaultValue": "#1C1917", "group": "Colors" },
      "darkBackground": { "dataType": "color", "displayName": "Dark Background", "defaultValue": "#0C0C0D", "group": "Colors" },
      "darkInk": { "dataType": "color", "displayName": "Dark Ink", "defaultValue": "#F5F5F4", "group": "Colors" },
      "numeralFill": { "dataType": "select", "displayName": "Numeral Fill On Open", "defaultValue": "ink", "options": ["ink", "accent"], "group": "Colors" },
      "displayFont": { "dataType": "select", "displayName": "Display Font", "defaultValue": "Fraunces", "options": ["Fraunces", "Instrument Serif", "Georgia"], "group": "Typography" },
      "bodyFont": { "dataType": "select", "displayName": "Body Font", "defaultValue": "Inter", "options": ["Inter", "system-ui", "Georgia"], "group": "Typography" },
      "titleSize": { "dataType": "select", "displayName": "Title Size (px)", "defaultValue": "88", "options": ["56", "72", "88", "104"], "group": "Typography" },
      "questionSize": { "dataType": "select", "displayName": "Question Size (px)", "defaultValue": "32", "options": ["24", "28", "32", "38"], "group": "Typography" },
      "numeralSize": { "dataType": "select", "displayName": "Numeral Size (px)", "defaultValue": "112", "options": ["80", "96", "112", "136"], "group": "Typography" },
      "drawRules": { "dataType": "booleanValue", "displayName": "Draw Rules On Open", "defaultValue": "true", "group": "Animation" },
      "wordStagger": { "dataType": "select", "displayName": "Answer Reveal", "defaultValue": "medium", "options": ["off", "fast", "medium", "slow"], "group": "Animation" },
      "duration": { "dataType": "select", "displayName": "Open Duration (ms)", "defaultValue": "700", "options": ["450", "600", "700", "900"], "group": "Animation" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const eyebrow = config?.eyebrow || 'The atelier ledger';
  const title = config?.title || 'Questions,';
  const titleItalic = config?.titleItalic || 'answered.';
  const itemsRaw = config?.items || 'How long does a commission take?|Most pieces take twelve to sixteen weeks.;;Can I visit the workshop?|Yes, by appointment.';
  const defaultOpen = config?.defaultOpen || '2';
  const multiple = (config?.selectMode || 'single') === 'multiple';
  const allowCollapse = bool(config?.allowCollapse, true);
  const showSearch = bool(config?.showSearch, true);
  const placeholder = config?.searchPlaceholder || 'Search the ledger';
  const showCounter = bool(config?.showCounter, true);
  const dark = (config?.theme || 'dark') === 'dark';
  const accent = config?.accentColor || '#C8A97E';
  const bg = dark ? (config?.darkBackground || '#0C0C0D') : (config?.lightBackground || '#FAFAF9');
  const ink = dark ? (config?.darkInk || '#F5F5F4') : (config?.lightInk || '#1C1917');
  const fillAccent = (config?.numeralFill || 'ink') === 'accent';
  const displayFont = config?.displayFont || 'Fraunces';
  const bodyFont = config?.bodyFont || 'Inter';
  const titleSize = parseInt(config?.titleSize || '88', 10);
  const questionSize = parseInt(config?.questionSize || '32', 10);
  const numeralSize = parseInt(config?.numeralSize || '112', 10);
  const drawRules = bool(config?.drawRules, true);
  const stagger = { off: 0, fast: 10, medium: 18, slow: 30 }[config?.wordStagger || 'medium'] ?? 18;

  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const dur = reduced ? 0 : parseInt(config?.duration || '700', 10);
  const easing = 'cubic-bezier(.2,.8,.2,1)';

  const alpha = (hex, a) => {
    const h = String(hex).replace('#', '');
    const f = h.length === 3 ? h.split('').map((c) => c + c).join('') : h.slice(0, 6);
    if (!/^[0-9a-fA-F]{6}$/.test(f)) return hex;
    const [r, g, b] = [0, 2, 4].map((k) => parseInt(f.slice(k, k + 2), 16));
    return `rgba(${r},${g},${b},${a})`;
  };
  const muted = alpha(ink, dark ? 0.5 : 0.55);
  const rule = alpha(ink, dark ? 0.14 : 0.14);
  const fillColor = fillAccent ? accent : ink;

  const items = React.useMemo(() => String(itemsRaw).split(/\n|;;/).map((s) => s.trim()).filter(Boolean).map((line) => {
    const [q, a] = line.split('|').map((p) => (p || '').trim());
    return { q: q || 'Untitled', a: a || '' };
  }), [itemsRaw]);
  const n = items.length;

  const uid = React.useMemo(() => 'nl' + Math.random().toString(36).slice(2, 9), []);
  const rootRef = React.useRef(null);
  const btnRefs = React.useRef([]);
  const [width, setWidth] = React.useState(1280);
  const [query, setQuery] = React.useState('');
  const initial = () => {
    const k = parseInt(defaultOpen, 10);
    return Number.isFinite(k) && k >= 1 && k <= n ? [k - 1] : [];
  };
  const [open, setOpen] = React.useState(initial);
  const [current, setCurrent] = React.useState(() => { const o = initial(); return o.length ? o[0] : 0; });
  React.useEffect(() => { const o = initial(); setOpen(o); if (o.length) setCurrent(o[0]); }, [defaultOpen, n]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    const id = `nc-font-nl-${displayFont}-${bodyFont}`.replace(/\s+/g, '-').toLowerCase();
    if (document.getElementById(id)) return;
    const fams = [];
    if (displayFont === 'Fraunces') fams.push('Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;1,9..144,300');
    if (displayFont === 'Instrument Serif') fams.push('Instrument+Serif:ital@0;1');
    if (bodyFont === 'Inter') fams.push('Inter:wght@300;400;500');
    fams.push('IBM+Plex+Mono:wght@400');
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?${fams.map((f) => 'family=' + f).join('&')}&display=swap`;
    document.head.appendChild(link);
  }, [displayFont, bodyFont]);

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const measure = () => setWidth(root.clientWidth);
    measure();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (ro) ro.observe(root);
    return () => { if (ro) ro.disconnect(); };
  }, []);

  const compact = width < 760;
  const q = query.trim().toLowerCase();
  const visible = items.map((it, i) => ({ it, i })).filter(({ it }) => !q || it.q.toLowerCase().includes(q) || it.a.toLowerCase().includes(q));

  const toggle = (i) => {
    setOpen((prev) => {
      const isOpen = prev.includes(i);
      if (multiple) return isOpen ? prev.filter((x) => x !== i) : [...prev, i];
      if (isOpen) return allowCollapse ? [] : prev;
      return [i];
    });
    setCurrent(i);
  };
  const onKey = (e, i) => {
    const pos = visible.findIndex((v) => v.i === i);
    let j = null;
    if (e.key === 'ArrowDown') j = (pos + 1) % visible.length;
    else if (e.key === 'ArrowUp') j = (pos - 1 + visible.length) % visible.length;
    else if (e.key === 'Home') j = 0;
    else if (e.key === 'End') j = visible.length - 1;
    if (j !== null) { e.preventDefault(); const t = btnRefs.current[visible[j].i]; if (t) t.focus(); setCurrent(visible[j].i); }
  };

  const pad2 = (v) => String(v).padStart(2, '0');
  const sans = bodyFont === 'Georgia' ? 'Georgia, serif' : bodyFont === 'system-ui' ? 'system-ui, -apple-system, sans-serif' : '"Inter", -apple-system, "Helvetica Neue", sans-serif';
  const display = displayFont === 'Georgia' ? 'Georgia, "Times New Roman", serif' : `"${displayFont}", Georgia, "Times New Roman", serif`;
  const mono = '"IBM Plex Mono", ui-monospace, "SF Mono", Menlo, monospace';
  const numW = compact ? 64 : Math.round(numeralSize * 1.45);
  const numSize = compact ? 48 : numeralSize;
  const pullUp = Math.max(0, Math.round(numSize * 0.8 - questionSize * 1.15 - 18));

  const css = `
    .${uid}-btn{appearance:none;-webkit-appearance:none;background:none;border:0;margin:0;padding:0;font:inherit;color:inherit;cursor:pointer;text-align:left;width:100%}
    .${uid}-btn:focus-visible{outline:1px solid ${accent};outline-offset:6px}
    .${uid}-btn:hover .${uid}-num{-webkit-text-stroke-color:${accent}}
    .${uid}-btn:hover .${uid}-arr{transform:translateX(4px)}
    .${uid}-in{appearance:none;-webkit-appearance:none;background:transparent;border:0;border-bottom:1px solid ${rule};color:${ink};font:inherit;padding:10px 0 10px 28px;width:100%;outline:none;border-radius:0}
    .${uid}-in::placeholder{color:${muted}}
    .${uid}-in::-webkit-search-cancel-button{-webkit-appearance:none;appearance:none;display:none}
    .${uid}-clr{appearance:none;-webkit-appearance:none;background:none;border:0;padding:6px 0 6px 8px;margin:0;cursor:pointer;color:${muted};font:inherit}
    .${uid}-clr:hover,.${uid}-clr:focus-visible{color:${accent}}
    .${uid}-clr:focus-visible{outline:1px solid ${accent}}
    .${uid}-in:focus{border-bottom-color:${accent}}
    @media (prefers-reduced-motion: reduce){.${uid}-root *{transition:none!important}}
  `;

  const counterIdx = visible.findIndex((v) => v.i === current);
  const counter = (
    <div aria-live="polite" style={{ display: 'flex', alignItems: 'baseline', gap: 10, fontFamily: display, fontWeight: 300, color: ink }}>
      <span style={{ fontSize: compact ? 40 : 56, lineHeight: 1, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>{pad2(open.length ? current + 1 : 0)}</span>
      <span style={{ fontSize: compact ? 18 : 22, color: muted }}>/ {pad2(n)}</span>
      {q && <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: accent, marginLeft: 8 }}>{visible.length} found{counterIdx < 0 && open.length ? '' : ''}</span>}
    </div>
  );

  return (
    <section ref={rootRef} className={`numbered-ledger ${uid}-root`} style={{ background: bg, color: ink, fontFamily: sans, padding: compact ? '48px 16px 56px' : '80px 56px 96px', width: '100%', boxSizing: 'border-box' }}>
      <style>{css}</style>
      <div style={{ display: 'flex', flexDirection: compact ? 'column' : 'row', justifyContent: 'space-between', alignItems: compact ? 'stretch' : 'flex-end', gap: compact ? 28 : 48, marginBottom: compact ? 32 : 56 }}>
        <div>
          <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: accent, marginBottom: 20 }}>{eyebrow}</div>
          <h2 style={{ margin: 0, fontFamily: display, fontWeight: 300, fontSize: compact ? Math.round(titleSize * 0.56) : titleSize, lineHeight: 0.95, letterSpacing: '-0.03em' }}>
            {title}{titleItalic && <React.Fragment><br /><em style={{ fontStyle: 'italic', color: accent }}>{titleItalic}</em></React.Fragment>}
          </h2>
        </div>
        {(showCounter || showSearch) && (
          <div style={{ width: compact ? '100%' : 320, display: 'flex', flexDirection: 'column', gap: 28, alignItems: compact ? 'stretch' : 'flex-end' }}>
            {showCounter && counter}
            {showSearch && (
              <label style={{ position: 'relative', display: 'block', width: '100%', fontSize: 15 }}>
                <span style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>{placeholder}</span>
                <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" style={{ position: 'absolute', left: 0, top: '50%', marginTop: -8 }}>
                  <circle cx="7" cy="7" r="5.25" fill="none" stroke={muted} strokeWidth="1.2" />
                  <line x1="11" y1="11" x2="15" y2="15" stroke={muted} strokeWidth="1.2" />
                </svg>
                <input className={`${uid}-in`} type="search" value={query} placeholder={placeholder} onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Escape') setQuery(''); }} style={{ paddingRight: query ? 64 : 0 }} />
                {query && (
                  <button type="button" className={`${uid}-clr`} onClick={() => setQuery('')} aria-label="Clear search"
                    style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', fontFamily: mono, fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase' }}>Clear</button>
                )}
              </label>
            )}
          </div>
        )}
      </div>

      {n === 0 && <div style={{ padding: 48, border: `1px dashed ${muted}`, color: muted, textAlign: 'center' }}>Add entries: Question|Answer, separated by ;;</div>}
      {n > 0 && visible.length === 0 && (
        <div style={{ borderTop: `1px solid ${rule}`, padding: '48px 0', fontFamily: display, fontSize: 28, fontWeight: 300, color: muted }}>
          No entries match &ldquo;{query}&rdquo;.
        </div>
      )}
      <div>
        {visible.map(({ it, i }, vi) => {
          const isOpen = open.includes(i);
          const words = it.a.split(/\s+/).filter(Boolean);
          return (
            <div key={i} style={{ position: 'relative' }}>
              <div aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 1, background: rule }} />
              <div aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 1, background: drawRules ? fillColor : 'transparent', transformOrigin: '0 50%', transform: `scaleX(${isOpen ? 1 : 0})`, transition: `transform ${Math.round(dur * 1.4)}ms ${easing}` }} />
              <h3 style={{ margin: 0 }}>
                <button ref={(el) => { btnRefs.current[i] = el; }} id={`${uid}-b${i}`} className={`${uid}-btn`} aria-expanded={isOpen} aria-controls={`${uid}-p${i}`}
                  onClick={() => toggle(i)} onKeyDown={(e) => onKey(e, i)} onFocus={() => setCurrent(i)}
                  style={{ display: 'flex', alignItems: compact ? 'center' : 'flex-start', padding: compact ? '18px 0' : '28px 0 24px' }}>
                  <span aria-hidden="true" className={`${uid}-num`} style={{ flex: `0 0 ${numW}px`, fontFamily: display, fontWeight: 300, fontSize: numSize, lineHeight: 0.8, letterSpacing: '-0.05em', fontVariantNumeric: 'lining-nums tabular-nums',
                    color: isOpen ? fillColor : 'transparent', WebkitTextStroke: `1px ${isOpen ? fillColor : alpha(ink, 0.55)}`, transition: `color ${dur}ms ${easing}, -webkit-text-stroke-color ${dur}ms` }}>{pad2(i + 1)}</span>
                  <span style={{ flex: 1, minWidth: 0, paddingTop: compact ? 0 : Math.round(numSize * 0.08) }}>
                    <span style={{ display: 'block', fontFamily: display, fontWeight: 300, fontSize: compact ? Math.round(questionSize * 0.7) : questionSize, lineHeight: 1.15, letterSpacing: '-0.015em', color: isOpen || !open.length ? ink : alpha(ink, 0.78), transition: `color ${dur}ms` }}>
                      {it.q}
                    </span>
                  </span>
                  <span aria-hidden="true" className={`${uid}-arr`} style={{ flex: '0 0 auto', marginLeft: 16, marginTop: compact ? 0 : Math.round(numSize * 0.1), fontFamily: mono, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: isOpen ? accent : muted, display: 'flex', alignItems: 'center', gap: 10, transition: 'transform 300ms, color 300ms' }}>
                    {!compact && <span>{isOpen ? 'Close' : 'Read'}</span>}
                    <svg width="14" height="14" viewBox="0 0 14 14" style={{ transform: `rotate(${isOpen ? 180 : 0}deg)`, transition: `transform ${dur}ms ${easing}` }}>
                      <path d="M7 1 V13 M2 8 L7 13 L12 8" fill="none" stroke="currentColor" strokeWidth="1.1" />
                    </svg>
                  </span>
                </button>
              </h3>
              <div id={`${uid}-p${i}`} role="region" aria-labelledby={`${uid}-b${i}`} aria-hidden={!isOpen}
                style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', marginTop: isOpen && !compact ? -pullUp : 0, transition: `grid-template-rows ${dur}ms ${easing}, margin-top ${dur}ms ${easing}, visibility 0s linear ${isOpen ? 0 : dur}ms`, visibility: isOpen ? 'visible' : 'hidden' }}>
                <div style={{ overflow: 'hidden', minHeight: 0 }}>
                  <p style={{ margin: 0, padding: compact ? '0 0 28px 64px' : `0 120px 40px ${numW}px`, maxWidth: 760, fontSize: compact ? 15.5 : 18, lineHeight: 1.65, fontWeight: 300, color: alpha(ink, 0.82) }}>
                    {stagger && !reduced ? words.map((wd, k) => (
                      <span key={k} style={{ display: 'inline-block', whiteSpace: 'pre', opacity: isOpen ? 1 : 0, transform: isOpen ? 'translateY(0)' : 'translateY(0.6em)', filter: isOpen ? 'blur(0)' : 'blur(3px)',
                        transition: isOpen ? `opacity 500ms ${easing} ${120 + Math.min(k, 60) * stagger}ms, transform 600ms ${easing} ${120 + Math.min(k, 60) * stagger}ms, filter 500ms ${easing} ${120 + Math.min(k, 60) * stagger}ms` : 'opacity 200ms, transform 200ms, filter 200ms' }}>
                        {wd}{k < words.length - 1 ? ' ' : ''}
                      </span>
                    )) : it.a}
                  </p>
                </div>
              </div>
              {vi === visible.length - 1 && <div aria-hidden="true" style={{ height: 1, background: rule }} />}
            </div>
          );
        })}
      </div>
    </section>
  );
}

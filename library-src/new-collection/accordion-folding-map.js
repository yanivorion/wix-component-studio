const MANIFEST = {
  "type": "Accordion.FoldingMap",
  "description": "An editorial accordion whose panels unfold like a paper map: hinged strips rotate open in sequence with shaded creases, and refold on close",
  "editorElement": {
    "selector": ".folding-map",
    "displayName": "Folding Map Accordion",
    "archetype": "container",
    "data": {
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Field notes / Sheet 07", "group": "Content" },
      "title": { "dataType": "text", "displayName": "Title", "defaultValue": "Six surveys, unfolded", "group": "Content" },
      "description": { "dataType": "text", "displayName": "Description", "defaultValue": "A working atlas of the routes, coasts and rivers we have walked, measured and drawn by hand.", "group": "Content" },
      "items": { "dataType": "text", "displayName": "Items (Title|Text|Tags|Coordinates, separated by ;; or new lines)", "defaultValue": "The coastline survey|Forty kilometres of shore measured on foot across a single season, recording every inlet, groyne and the tide line at dawn. The resulting sheets remain the most precise record of the bay before the harbour works began.|Coast, 1:25 000, Spring|51°30′N 3°10′W;;Upland routes|Drove roads, packhorse trails and shepherds’ paths traced from parish records and walked again, with gradients drawn as hachures in the old manner.|Hills, 1:50 000, Summer|52°41′N 3°54′W;;The river atlas|From spring to estuary in twelve sheets: weirs, fords, mills and the shifting meanders photographed from the same twelve bridges every month.|Water, 1:10 000, All year|51°45′N 1°15′W;;Night navigation|A star chart for walkers. Bearings, landmarks visible by moonlight and the sounds that tell you where you are when the path disappears.|Sky, Bearings, Winter|53°04′N 4°05′W;;Lost villages|Earthworks, field boundaries and the faint outlines of houses abandoned six centuries ago, mapped from low winter light and aerial survey.|History, 1:2 500, Autumn|52°12′N 0°07′E;;Margins and legends|An essay on the edges of maps: the scale bars, compass roses, cartouches and small mistakes that reveal the hand of the person who drew them.|Essay, Typography|51°28′N 0°00′W", "group": "Items" },
      "defaultOpen": { "dataType": "select", "displayName": "Open By Default", "defaultValue": "1", "options": ["none", "1", "2", "3", "4", "5", "6"], "group": "Items" },
      "selectMode": { "dataType": "select", "displayName": "Open Mode", "defaultValue": "single", "options": ["single", "multiple"], "group": "Items" },
      "allowCollapse": { "dataType": "booleanValue", "displayName": "Allow Closing All", "defaultValue": "true", "group": "Items" },
      "foldCount": { "dataType": "select", "displayName": "Fold Strips", "defaultValue": "3", "options": ["2", "3", "4"], "group": "Folding" },
      "creaseShade": { "dataType": "select", "displayName": "Crease Shading", "defaultValue": "medium", "options": ["light", "medium", "deep"], "group": "Folding" },
      "showCreases": { "dataType": "booleanValue", "displayName": "Keep Crease Lines", "defaultValue": "true", "group": "Folding" },
      "showGrid": { "dataType": "booleanValue", "displayName": "Map Grid", "defaultValue": "true", "group": "Folding" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#FAFAF9", "group": "Colors" },
      "inkColor": { "dataType": "color", "displayName": "Ink", "defaultValue": "#1C1917", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#A8A29E", "group": "Colors" },
      "ruleColor": { "dataType": "color", "displayName": "Rules", "defaultValue": "#D6D3D1", "group": "Colors" },
      "paperColor": { "dataType": "color", "displayName": "Map Paper", "defaultValue": "#F2EFE9", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent", "defaultValue": "#9A3B26", "group": "Colors" },
      "displayFont": { "dataType": "select", "displayName": "Display Font", "defaultValue": "Fraunces", "options": ["Fraunces", "Instrument Serif", "Inter"], "group": "Typography" },
      "titleSize": { "dataType": "select", "displayName": "Heading Size (px)", "defaultValue": "64", "options": ["48", "56", "64", "72"], "group": "Typography" },
      "itemTitleSize": { "dataType": "select", "displayName": "Item Title Size (px)", "defaultValue": "34", "options": ["26", "30", "34", "40"], "group": "Typography" },
      "numeralSize": { "dataType": "select", "displayName": "Numeral Size (px)", "defaultValue": "72", "options": ["48", "60", "72", "88"], "group": "Typography" },
      "showHeader": { "dataType": "booleanValue", "displayName": "Show Header", "defaultValue": "true", "group": "Layout" },
      "showTags": { "dataType": "booleanValue", "displayName": "Show Tags", "defaultValue": "true", "group": "Layout" },
      "showCoordinates": { "dataType": "booleanValue", "displayName": "Show Coordinates", "defaultValue": "true", "group": "Layout" },
      "duration": { "dataType": "select", "displayName": "Unfold Duration (ms)", "defaultValue": "900", "options": ["600", "900", "1200", "1600"], "group": "Animation" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const eyebrow = config?.eyebrow || 'Field notes / Sheet 07';
  const title = config?.title || 'Six surveys, unfolded';
  const description = config?.description || 'A working atlas of the routes, coasts and rivers we have walked, measured and drawn by hand.';
  const itemsRaw = config?.items || 'The coastline survey|Forty kilometres of shore measured on foot.|Coast, 1:25 000|51°30′N 3°10′W;;Upland routes|Drove roads and shepherds’ paths.|Hills|52°41′N 3°54′W';
  const defaultOpen = config?.defaultOpen || '1';
  const multiple = (config?.selectMode || 'single') === 'multiple';
  const allowCollapse = bool(config?.allowCollapse, true);
  const S = Math.min(4, Math.max(2, parseInt(config?.foldCount || '3', 10)));
  const shadeK = { light: 0.28, medium: 0.5, deep: 0.72 }[config?.creaseShade || 'medium'] || 0.5;
  const showCreases = bool(config?.showCreases, true);
  const showGrid = bool(config?.showGrid, true);
  const bg = config?.backgroundColor || '#FAFAF9';
  const ink = config?.inkColor || '#1C1917';
  const muted = config?.mutedColor || '#A8A29E';
  const rule = config?.ruleColor || '#D6D3D1';
  const paper = config?.paperColor || '#F2EFE9';
  const accent = config?.accentColor || '#9A3B26';
  const displayFont = config?.displayFont || 'Fraunces';
  const titleSize = parseInt(config?.titleSize || '64', 10);
  const itemTitleSize = parseInt(config?.itemTitleSize || '34', 10);
  const numeralSize = parseInt(config?.numeralSize || '72', 10);
  const showHeader = bool(config?.showHeader, true);
  const showTags = bool(config?.showTags, true);
  const showCoords = bool(config?.showCoordinates, true);

  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const dur = parseInt(config?.duration || '900', 10);

  const items = React.useMemo(() => String(itemsRaw).split(/\n|;;/).map((s) => s.trim()).filter(Boolean).map((line) => {
    const [t, b, tags, c] = line.split('|').map((p) => (p || '').trim());
    return { title: t || 'Untitled', body: b || '', tags: tags ? tags.split(',').map((x) => x.trim()).filter(Boolean) : [], coords: c || '' };
  }), [itemsRaw]);
  const n = items.length;

  const uid = React.useMemo(() => 'fm' + Math.random().toString(36).slice(2, 9), []);
  const rootRef = React.useRef(null);
  const btnRefs = React.useRef([]);
  const measureRefs = React.useRef([]);
  const prog = React.useRef([]);
  const targets = React.useRef([]);
  const raf = React.useRef(0);
  const last = React.useRef(0);
  const [, setFrame] = React.useState(0);
  const [width, setWidth] = React.useState(1280);
  const [heights, setHeights] = React.useState([]);

  const initial = () => {
    const k = parseInt(defaultOpen, 10);
    return Number.isFinite(k) && k >= 1 && k <= n ? [k - 1] : [];
  };
  const [open, setOpen] = React.useState(() => {
    const o = initial();
    prog.current = items.map((_, i) => (o.includes(i) ? 1 : 0));
    targets.current = prog.current.slice();
    return o;
  });

  React.useEffect(() => {
    const o = initial();
    prog.current = items.map((_, i) => (o.includes(i) ? 1 : 0));
    targets.current = prog.current.slice();
    setOpen(o);
  }, [defaultOpen, n]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    const id = 'nc-font-fm-' + displayFont.replace(/\s+/g, '-').toLowerCase();
    if (document.getElementById(id)) return;
    const fam = displayFont === 'Fraunces' ? 'Fraunces:opsz,wght@9..144,300;9..144,400'
      : displayFont === 'Instrument Serif' ? 'Instrument+Serif:ital@0;1' : 'Inter:wght@300;400;500';
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${fam}&family=Inter:wght@300;400;500&family=IBM+Plex+Mono:wght@400&display=swap`;
    document.head.appendChild(link);
  }, [displayFont]);

  const measure = React.useCallback(() => {
    if (rootRef.current) setWidth(rootRef.current.clientWidth);
    setHeights(measureRefs.current.slice(0, n).map((el) => (el ? el.offsetHeight : 0)));
  }, [n]);

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    measure();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (ro) ro.observe(root);
    let alive = true;
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (alive) measure(); });
    const t = setTimeout(measure, 600);
    return () => { alive = false; clearTimeout(t); if (ro) ro.disconnect(); };
  }, [measure]);

  React.useLayoutEffect(() => { measure(); }, [items, width < 760, itemTitleSize, displayFont]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const run = () => {
    if (reduced || dur <= 0) {
      prog.current = targets.current.slice();
      setFrame((f) => f + 1);
      return;
    }
    if (raf.current) return;
    last.current = performance.now();
    const tick = (now) => {
      const dt = Math.min(64, now - last.current);
      last.current = now;
      let busy = false;
      prog.current = prog.current.map((p, i) => {
        const t = targets.current[i] || 0;
        if (p === t) return p;
        const step = dt / dur;
        const np = t > p ? Math.min(t, p + step) : Math.max(t, p - step * 1.25);
        if (np !== t) busy = true;
        return np;
      });
      setFrame((f) => f + 1);
      raf.current = busy ? requestAnimationFrame(tick) : 0;
    };
    raf.current = requestAnimationFrame(tick);
  };

  const toggle = (i) => {
    const isOpen = open.includes(i);
    let next;
    if (multiple) next = isOpen ? open.filter((x) => x !== i) : [...open, i];
    else if (isOpen) next = allowCollapse ? [] : open;
    else next = [i];
    targets.current = items.map((_, k) => (next.includes(k) ? 1 : 0));
    while (prog.current.length < n) prog.current.push(0);
    setOpen(next);
    run();
  };
  const onKey = (e, i) => {
    let j = null;
    if (e.key === 'ArrowDown') j = (i + 1) % n;
    else if (e.key === 'ArrowUp') j = (i - 1 + n) % n;
    else if (e.key === 'Home') j = 0;
    else if (e.key === 'End') j = n - 1;
    if (j !== null) { e.preventDefault(); if (btnRefs.current[j]) btnRefs.current[j].focus(); }
  };

  const compact = width < 760;
  const padX = compact ? 16 : 56;
  const numW = compact ? 56 : Math.round(numeralSize * 1.6);
  const mono = '"IBM Plex Mono", ui-monospace, "SF Mono", Menlo, monospace';
  const sans = '"Inter", -apple-system, "Helvetica Neue", sans-serif';
  const display = displayFont === 'Inter' ? sans : `"${displayFont}", Georgia, "Times New Roman", serif`;
  const clamp = (v) => Math.min(1, Math.max(0, v));
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  const easeIO = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const w = 1 / (1 + (S - 1) * 0.6);

  const css = `
    .${uid}-btn{appearance:none;-webkit-appearance:none;background:none;border:0;margin:0;padding:0;font:inherit;color:inherit;cursor:pointer;text-align:left;width:100%}
    .${uid}-btn:focus-visible{outline:2px solid ${accent};outline-offset:4px}
    .${uid}-btn .${uid}-t{transition:transform 400ms cubic-bezier(.2,.8,.2,1)}
    .${uid}-btn:hover .${uid}-t{transform:translateX(8px)}
    .${uid}-btn:hover .${uid}-ic{border-color:${ink}}
    @media (prefers-reduced-motion: reduce){.folding-map *{transition:none!important}}
  `;

  const content = (it, i) => (
    <div style={{ position: 'relative', padding: compact ? '28px 20px 32px' : `40px 48px 44px ${numW}px`, display: 'grid', gridTemplateColumns: compact ? '1fr' : 'minmax(0, 1.7fr) minmax(0, 1fr)', gap: compact ? 24 : 56 }}>
      <p style={{ margin: 0, fontFamily: display, fontWeight: 300, fontSize: compact ? 19 : 23, lineHeight: 1.5, color: ink, letterSpacing: '-0.005em', maxWidth: 640 }}>{it.body}</p>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 22 }}>
        {showTags && it.tags.length > 0 && (
          <div>
            <div style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: muted, marginBottom: 10 }}>Legend</div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {it.tags.map((t, k) => (
                <li key={k} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '7px 0', borderTop: `1px solid ${rule}`, fontFamily: sans, fontSize: 14, color: ink }}>
                  <span aria-hidden="true" style={{ width: 10, height: 10, flex: '0 0 10px', border: `1px solid ${ink}`, background: k === 0 ? accent : k === 1 ? ink : 'transparent', borderColor: k === 0 ? accent : ink, borderRadius: k === 2 ? '50%' : 0 }} />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16 }}>
          {showCoords && it.coords && <div style={{ fontFamily: mono, fontSize: 12, color: ink, letterSpacing: '0.04em' }}>{it.coords}</div>}
          <svg aria-hidden="true" width="136" height="22" viewBox="0 0 136 22">
            {[0, 1, 2, 3].map((k) => <rect key={k} x={2 + k * 26} y="12" width="26" height="5" fill={k % 2 ? 'none' : ink} stroke={ink} strokeWidth="1" />)}
            {[0, 1, 2].map((k) => <text key={k} x={2 + k * 52} y="8" fontSize="8" fontFamily={mono} fill={muted} textAnchor="middle">{k}</text>)}
            <text x="134" y="18" fontSize="8" fontFamily={mono} fill={muted} textAnchor="end">km</text>
          </svg>
        </div>
      </div>
    </div>
  );

  const gridBg = showGrid
    ? `linear-gradient(${rule}55 1px, transparent 1px) 0 0 / 48px 48px, linear-gradient(90deg, ${rule}55 1px, transparent 1px) 0 0 / 48px 48px, ${paper}`
    : paper;

  return (
    <section ref={rootRef} className="folding-map" style={{ background: bg, color: ink, fontFamily: sans, padding: compact ? '44px 0 56px' : '72px 0 88px', width: '100%', boxSizing: 'border-box' }}>
      <style>{css}</style>
      {showHeader && (
        <div style={{ padding: `0 ${padX}px`, display: 'flex', flexDirection: compact ? 'column' : 'row', justifyContent: 'space-between', alignItems: compact ? 'flex-start' : 'flex-end', gap: compact ? 16 : 40, marginBottom: compact ? 32 : 52 }}>
          <div>
            <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: muted, marginBottom: 18 }}>{eyebrow}</div>
            <h2 style={{ margin: 0, fontFamily: display, fontWeight: 300, fontSize: compact ? Math.round(titleSize * 0.62) : titleSize, lineHeight: 1, letterSpacing: '-0.025em' }}>{title}</h2>
          </div>
          <p style={{ margin: 0, maxWidth: 340, fontSize: 15, lineHeight: 1.6, color: ink, opacity: 0.7 }}>{description}</p>
        </div>
      )}
      {n === 0 ? (
        <div style={{ margin: `0 ${padX}px`, padding: 48, border: `1px dashed ${muted}`, color: muted, textAlign: 'center' }}>Add items: Title|Text|Tags|Coordinates, separated by ;;</div>
      ) : (
        <div style={{ padding: `0 ${padX}px`, borderBottom: 'none' }}>
          {items.map((it, i) => {
            const isOpen = open.includes(i);
            const P = prog.current[i] || 0;
            const H = heights[i] || 0;
            const stripH = Math.ceil(H / S);
            const strips = [];
            let acc = 0;
            for (let k = 0; k < S; k++) {
              const pk = reduced ? (P > 0 ? 1 : 0) : clamp((P - k * w * 0.6) / w);
              const ang = (1 - easeIO(pk)) * 90;
              const hk = stripH * Math.cos((ang * Math.PI) / 180);
              strips.push({ top: acc, ang: (k % 2 ? 1 : -1) * ang, pk, hk });
              acc += hk;
            }
            const panelH = P >= 1 ? 'auto' : Math.max(0, acc);
            const iconP = easeOut(clamp(P * 1.6));
            return (
              <div key={i} style={{ borderTop: `1px solid ${i === 0 ? ink : rule}` }}>
                <h3 style={{ margin: 0 }}>
                  <button ref={(el) => { btnRefs.current[i] = el; }} id={`${uid}-b${i}`} className={`${uid}-btn`} aria-expanded={isOpen} aria-controls={`${uid}-p${i}`}
                    onClick={() => toggle(i)} onKeyDown={(e) => onKey(e, i)}
                    style={{ display: 'flex', alignItems: 'center', gap: compact ? 12 : 0, padding: compact ? '20px 0' : '26px 0' }}>
                    <span style={{ width: numW, flex: `0 0 ${numW}px`, fontFamily: display, fontWeight: 300, fontSize: compact ? 34 : numeralSize, lineHeight: 0.9, letterSpacing: '-0.04em', fontVariantNumeric: 'tabular-nums',
                      color: isOpen ? accent : muted, transition: 'color 500ms' }}>{String(i + 1).padStart(2, '0')}</span>
                    <span className={`${uid}-t`} style={{ flex: 1, minWidth: 0, fontFamily: display, fontWeight: 300, fontSize: compact ? Math.round(itemTitleSize * 0.68) : itemTitleSize, lineHeight: 1.1, letterSpacing: '-0.015em' }}>{it.title}</span>
                    {!compact && showTags && it.tags[0] && (
                      <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: muted, marginRight: 36, opacity: 1 - iconP * 0.6 }}>{it.tags[0]}</span>
                    )}
                    <span className={`${uid}-ic`} aria-hidden="true" style={{ position: 'relative', flex: compact ? '0 0 36px' : '0 0 48px', height: compact ? 36 : 48, borderRadius: '50%', border: `1px solid ${isOpen ? ink : rule}`, background: isOpen ? ink : 'transparent', transition: 'background 400ms, border-color 400ms' }}>
                      <span style={{ position: 'absolute', left: '50%', top: '50%', width: 14, height: 1.5, marginLeft: -7, marginTop: -0.75, background: isOpen ? bg : ink, transition: 'background 400ms' }} />
                      <span style={{ position: 'absolute', left: '50%', top: '50%', width: 14, height: 1.5, marginLeft: -7, marginTop: -0.75, background: isOpen ? bg : ink, transform: `rotate(${90 + iconP * 90}deg) scaleX(${1 - iconP * 0.02})`, transition: 'background 400ms' }} />
                    </span>
                  </button>
                </h3>
                <div id={`${uid}-p${i}`} role="region" aria-labelledby={`${uid}-b${i}`} aria-hidden={!isOpen}
                  style={{ position: 'relative', height: panelH, overflow: P >= 1 ? 'visible' : 'hidden', visibility: P > 0 ? 'visible' : 'hidden', marginBottom: P > 0 ? Math.round(28 * Math.min(1, P * 2)) : 0 }}>
                  {P >= 1 ? (
                    <div style={{ position: 'relative', background: gridBg, boxShadow: '0 1px 0 rgba(0,0,0,0.04), 0 18px 30px -24px rgba(28,25,23,0.4)' }}>
                      <div ref={(el) => { measureRefs.current[i] = el; }}>{content(it, i)}</div>
                      {showCreases && Array.from({ length: S - 1 }).map((_, k) => (
                        <div key={k} aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, top: `${((k + 1) * 100) / S}%`, height: 1, background: 'linear-gradient(90deg, rgba(0,0,0,0.01), rgba(0,0,0,0.07), rgba(0,0,0,0.01))' }} />
                      ))}
                    </div>
                  ) : (
                    strips.map((s, k) => (
                      <div key={k} aria-hidden={k > 0 ? 'true' : undefined} style={{
                        position: 'absolute', left: 0, right: 0, top: s.top, height: stripH, overflow: 'hidden', background: gridBg,
                        transformOrigin: '50% 0', transform: `perspective(1600px) rotateX(${s.ang}deg)`, backfaceVisibility: 'hidden',
                        visibility: s.pk > 0 ? 'visible' : 'hidden'
                      }}>
                        <div ref={k === 0 ? (el) => { measureRefs.current[i] = el; } : undefined} style={{ transform: `translateY(${-k * stripH}px)` }}>{content(it, i)}</div>
                        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
                          background: k % 2 ? 'linear-gradient(0deg, rgba(0,0,0,0.55), rgba(0,0,0,0.05))' : 'linear-gradient(180deg, rgba(255,255,255,0.0), rgba(0,0,0,0.55))',
                          opacity: Math.sin((Math.abs(s.ang) * Math.PI) / 180) * shadeK + (k > 0 ? 0.04 : 0) }} />
                        {k > 0 && showCreases && <div aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 1, background: 'rgba(0,0,0,0.1)' }} />}
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
          <div style={{ borderTop: `1px solid ${ink}` }} />
        </div>
      )}
    </section>
  );
}

const MANIFEST = {
  "type": "Gallery.IndexScrubber",
  "description": "A tall project index you scrub with the pointer or arrow keys. Every item you pass swaps the big preview with a fast vertical clip wipe in the direction of travel, rolls a huge project number digit by digit, mask-slides the title and meta, and a thin leader line glides to the active name. At rest it scrubs itself once",
  "editorElement": {
    "selector": ".index-scrubber",
    "displayName": "Index Scrubber",
    "archetype": "container",
    "data": {
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Index of works", "group": "Content" },
      "headerRight": { "dataType": "text", "displayName": "Header Right", "defaultValue": "2014 — 2026", "group": "Content" },
      "hint": { "dataType": "text", "displayName": "Hint", "defaultValue": "Scrub the list", "group": "Content" },
      "items": { "dataType": "text", "displayName": "Projects (Name; Client; Discipline; Year — separated by |)", "defaultValue": "Atlas House; Nordhavn Studio; Residential; 2026|Salt Pavilion; City of Aarhus; Public; 2025|Meridian Tower; Halden Group; Commercial; 2025|Long Table; Hotel Brumm; Hospitality; 2024|Field Station; Arctic Institute; Research; 2024|Quiet Rooms; Studio Brumm; Interiors; 2024|Harbour Baths; Port of Oslo; Public; 2023|Kiln; Still Life Ceramics; Workshop; 2023|North Gallery; Kunsthal Nord; Cultural; 2022|Stone Library; Faroe Archive; Cultural; 2022|Dune House; Private; Residential; 2021|Orbit Lab; Lumen Space; Research; 2020|Cinder Hall; Ember Foundry; Workshop; 2019|White Court; Halden Group; Commercial; 2018", "group": "Content" },
      "descriptions": { "dataType": "text", "displayName": "Descriptions (separated by |, optional)", "defaultValue": "Timber and board-marked concrete on the waterfront.|A seasonal bathing pavilion in larch and steel.|Fifty-two storeys organised around one stair.|Forty seats around a single oak table.|A research hut built to survive the polar night.|Six rooms tuned for sound before sight.|Public baths cut into the harbour wall.|A ceramics workshop lit only from the north.|A gallery of five equal rooms and one long window.|An archive carved into basalt.|A low house that disappears into the dunes.|Clean rooms for a satellite company.|A foundry converted into a concert hall.|A courtyard office in white brick.", "group": "Content" },
      "images": { "dataType": "text", "displayName": "Image URLs (comma separated)", "defaultValue": "https://picsum.photos/id/1076/900/1100,https://picsum.photos/id/1068/900/1100,https://picsum.photos/id/1031/900/1100,https://picsum.photos/id/1060/900/1100,https://picsum.photos/id/1036/900/1100,https://picsum.photos/id/1083/900/1100,https://picsum.photos/id/1050/900/1100,https://picsum.photos/id/1065/900/1100,https://picsum.photos/id/942/900/1100,https://picsum.photos/id/1049/900/1100,https://picsum.photos/id/1061/900/1100,https://picsum.photos/id/1078/900/1100,https://picsum.photos/id/1054/900/1100,https://picsum.photos/id/1081/900/1100", "group": "Images" },
      "imageFilter": { "dataType": "select", "displayName": "Image Treatment", "defaultValue": "none", "options": ["none", "muted", "grayscale"], "group": "Images" },
      "links": { "dataType": "text", "displayName": "Links (comma separated, optional)", "defaultValue": "", "group": "Content" },
      "autoScrub": { "dataType": "booleanValue", "displayName": "Auto-scrub Once At Rest", "defaultValue": "true", "group": "Animation" },
      "autoStep": { "dataType": "select", "displayName": "Auto-scrub Step (ms)", "defaultValue": "340", "options": ["220", "340", "480", "640"], "group": "Animation" },
      "wipeDuration": { "dataType": "select", "displayName": "Wipe Duration (ms)", "defaultValue": "560", "options": ["380", "460", "560", "720"], "group": "Animation" },
      "rollDuration": { "dataType": "select", "displayName": "Number Roll (ms)", "defaultValue": "560", "options": ["420", "560", "700", "900"], "group": "Animation" },
      "height": { "dataType": "select", "displayName": "Height (px)", "defaultValue": "780", "options": ["640", "720", "780", "860", "960"], "group": "Layout" },
      "imageWidth": { "dataType": "select", "displayName": "Preview Width (%)", "defaultValue": "42", "options": ["34", "38", "42", "48"], "group": "Layout" },
      "showNumbers": { "dataType": "booleanValue", "displayName": "Index Numbers", "defaultValue": "true", "group": "Layout" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#F3F2EF", "group": "Colors" },
      "textColor": { "dataType": "color", "displayName": "Text", "defaultValue": "#0B0B0C", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#9C988F", "group": "Colors" },
      "lineColor": { "dataType": "color", "displayName": "Rules", "defaultValue": "#D9D6CF", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent", "defaultValue": "#D9480F", "group": "Colors" },
      "fontFamily": { "dataType": "select", "displayName": "Grotesk", "defaultValue": "Inter Tight", "options": ["Inter Tight", "Geist", "Hanken Grotesk", "Manrope"], "group": "Typography" },
      "monoFamily": { "dataType": "select", "displayName": "Mono", "defaultValue": "JetBrains Mono", "options": ["JetBrains Mono", "Geist Mono", "IBM Plex Mono"], "group": "Typography" },
      "numberSize": { "dataType": "select", "displayName": "Number Size (px)", "defaultValue": "240", "options": ["160", "200", "240", "280"], "group": "Typography" },
      "numberWeight": { "dataType": "select", "displayName": "Number Weight", "defaultValue": "300", "options": ["300", "400", "500"], "group": "Typography" },
      "indexSize": { "dataType": "select", "displayName": "Index Size (px)", "defaultValue": "17", "options": ["14", "15", "17", "19"], "group": "Typography" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const eyebrow = config?.eyebrow ?? 'Index of works';
  const headerRight = config?.headerRight ?? '2014 — 2026';
  const hint = config?.hint ?? 'Scrub the list';
  const items = String(config?.items || 'Atlas House; Nordhavn Studio; Residential; 2026|Salt Pavilion; City of Aarhus; Public; 2025|Meridian Tower; Halden Group; Commercial; 2025|Long Table; Hotel Brumm; Hospitality; 2024|Field Station; Arctic Institute; Research; 2024|Quiet Rooms; Studio Brumm; Interiors; 2024|Harbour Baths; Port of Oslo; Public; 2023|Kiln; Still Life Ceramics; Workshop; 2023|North Gallery; Kunsthal Nord; Cultural; 2022|Stone Library; Faroe Archive; Cultural; 2022|Dune House; Private; Residential; 2021|Orbit Lab; Lumen Space; Research; 2020|Cinder Hall; Ember Foundry; Workshop; 2019|White Court; Halden Group; Commercial; 2018')
    .split('|').map((r) => r.trim()).filter(Boolean).map((r) => { const f = r.split(';').map((x) => x.trim()); return { name: f[0] || '', client: f[1] || '', discipline: f[2] || '', year: f[3] || '' }; });
  const descs = String(config?.descriptions ?? 'Timber and board-marked concrete on the waterfront.|A seasonal bathing pavilion in larch and steel.|Fifty-two storeys organised around one stair.|Forty seats around a single oak table.|A research hut built to survive the polar night.|Six rooms tuned for sound before sight.|Public baths cut into the harbour wall.|A ceramics workshop lit only from the north.|A gallery of five equal rooms and one long window.|An archive carved into basalt.|A low house that disappears into the dunes.|Clean rooms for a satellite company.|A foundry converted into a concert hall.|A courtyard office in white brick.').split('|').map((s) => s.trim());
  const images = String(config?.images || 'https://picsum.photos/id/1076/900/1100,https://picsum.photos/id/1068/900/1100,https://picsum.photos/id/1031/900/1100,https://picsum.photos/id/1060/900/1100,https://picsum.photos/id/1036/900/1100,https://picsum.photos/id/1083/900/1100,https://picsum.photos/id/1050/900/1100,https://picsum.photos/id/1065/900/1100,https://picsum.photos/id/942/900/1100,https://picsum.photos/id/1049/900/1100,https://picsum.photos/id/1061/900/1100,https://picsum.photos/id/1078/900/1100,https://picsum.photos/id/1054/900/1100,https://picsum.photos/id/1081/900/1100').split(',').map((s) => s.trim()).filter(Boolean);
  const links = String(config?.links || '').split(',').map((s) => s.trim());
  const imageFilter = config?.imageFilter || 'none';
  const autoScrub = bool(config?.autoScrub, true);
  const autoStep = parseInt(config?.autoStep || '340', 10) || 340;
  const WD = parseInt(config?.wipeDuration || '560', 10) || 560;
  const RD = parseInt(config?.rollDuration || '560', 10) || 560;
  const H = parseInt(config?.height || '780', 10) || 780;
  const imgPct = (parseInt(config?.imageWidth || '42', 10) || 42) / 100;
  const showNumbers = bool(config?.showNumbers, true);
  const bg = config?.backgroundColor || '#F3F2EF';
  const text = config?.textColor || '#0B0B0C';
  const muted = config?.mutedColor || '#9C988F';
  const line = config?.lineColor || '#D9D6CF';
  const accent = config?.accentColor || '#D9480F';
  const fontFamily = config?.fontFamily || 'Inter Tight';
  const monoFamily = config?.monoFamily || 'JetBrains Mono';
  const numberSize = parseInt(config?.numberSize || '240', 10) || 240;
  const numberWeight = config?.numberWeight || '300';
  const indexSize = parseInt(config?.indexSize || '17', 10) || 17;

  const N = items.length;
  const uid = React.useMemo(() => 'is' + Math.random().toString(36).slice(2, 9), []);
  const reduced = React.useMemo(() => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const rootRef = React.useRef(null);
  const listRef = React.useRef(null);
  const nameRefs = React.useRef([]);
  const rowRefs = React.useRef([]);
  const leaderRef = React.useRef(null);
  const layerRefs = React.useRef([]);
  const imgRefs = React.useRef([]);
  const zc = React.useRef(3);
  const prevRef = React.useRef(0);
  const lead = React.useRef({ y: 0, x: 0, ty: 0, tx: 0, init: false, raf: 0 });
  const userRef = React.useRef(false);

  const [width, setWidth] = React.useState(1280);
  const [active, setActive] = React.useState(0);
  const [swap, setSwap] = React.useState({ n: 0, prev: null, dir: 1 });
  const [user, setUser] = React.useState(false);

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

  const go = React.useCallback((i) => {
    const n = Math.max(0, Math.min(N - 1, i));
    setActive((a) => (a === n ? a : n));
  }, [N]);

  // swap bookkeeping for the mask-slide text and image layers
  React.useEffect(() => {
    const from = prevRef.current;
    if (from === active) return;
    prevRef.current = active;
    const dir = active > from ? 1 : -1;
    setSwap((s) => ({ n: s.n + 1, prev: from, dir }));
    const L = layerRefs.current[active]; const I = imgRefs.current[active];
    if (!L || !I) return;
    zc.current += 1;
    L.style.zIndex = String(zc.current);
    if (reduced) { L.style.clipPath = 'inset(0% 0% 0% 0%)'; L.style.webkitClipPath = 'inset(0% 0% 0% 0%)'; return; }
    const start = dir > 0 ? 'inset(100% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)';
    L.style.transition = 'none'; I.style.transition = 'none';
    L.style.clipPath = start; L.style.webkitClipPath = start;
    I.style.transform = `translateY(${dir * 14}%) scale(1.18)`;
    void L.offsetWidth;
    L.style.transition = `clip-path ${WD}ms cubic-bezier(0.76, 0, 0.24, 1), -webkit-clip-path ${WD}ms cubic-bezier(0.76, 0, 0.24, 1)`;
    I.style.transition = `transform ${WD + 500}ms cubic-bezier(0.22, 1, 0.36, 1)`;
    L.style.clipPath = 'inset(0% 0% 0% 0%)'; L.style.webkitClipPath = 'inset(0% 0% 0% 0%)';
    I.style.transform = 'translateY(0%) scale(1.04)';
    const P = imgRefs.current[from];
    if (P) { P.style.transition = `transform ${WD}ms cubic-bezier(0.76, 0, 0.24, 1)`; P.style.transform = `translateY(${-dir * 9}%) scale(1.1)`; }
  }, [active, reduced, WD]);

  // auto-scrub once: down the list slowly, then glide back to the first item
  React.useEffect(() => {
    if (!autoScrub || reduced || N < 2 || user) return undefined;
    const seq = [];
    for (let i = 1; i < N; i++) seq.push({ i, t: autoStep });
    for (let i = N - 2; i >= 0; i--) seq.push({ i, t: Math.max(60, Math.round(autoStep * 0.3)) });
    let k = 0; let t = 0;
    const next = () => {
      if (userRef.current || k >= seq.length) return;
      const s = seq[k++];
      go(s.i);
      if (k < seq.length) t = setTimeout(next, seq[k].t);
    };
    t = setTimeout(next, 1100);
    return () => clearTimeout(t);
  }, [autoScrub, reduced, N, autoStep, user, go]);

  const takeOver = () => { if (!userRef.current) { userRef.current = true; setUser(true); } };

  const compact = width < 760;
  const pad = compact ? 16 : Math.round(Math.max(28, Math.min(56, width * 0.04)));
  const headerH = compact ? 44 : 56;
  const footerH = compact ? 0 : 44;
  const mainH = compact ? null : H - headerH - footerH - pad * 2 + 24;
  const listW = compact ? width - pad * 2 : Math.round(Math.max(230, Math.min(330, width * 0.24)));
  const gutter = compact ? 0 : Math.round(Math.max(24, width * 0.03));
  const imgW = compact ? width - pad * 2 : Math.round((width - pad * 2) * imgPct);
  const infoW = compact ? width - pad * 2 : width - pad * 2 - listW - imgW - gutter * 2;
  const rowH = compact ? 36 : Math.max(24, Math.min(46, Math.floor((mainH - 8) / Math.max(1, N))));
  const nSize = compact ? Math.round(Math.min(numberSize * 0.62, width * 0.36)) : Math.round(Math.min(numberSize, infoW / 1.28));
  const imgH = compact ? Math.round(imgW * 1.12) : mainH;

  // leader line follows the active name with a little lag
  React.useEffect(() => {
    const L = lead.current;
    const tick = () => {
      const row = rowRefs.current[active]; const nm = nameRefs.current[active]; const el = leaderRef.current;
      if (row && nm && el) {
        L.ty = row.offsetTop + row.offsetHeight / 2;
        L.tx = nm.offsetLeft + nm.offsetWidth + 14;
        if (!L.init || reduced) { L.y = L.ty; L.x = L.tx; L.init = true; }
        L.y += (L.ty - L.y) * 0.22; L.x += (L.tx - L.x) * 0.2;
        el.style.transform = `translate3d(${L.x.toFixed(2)}px, ${L.y.toFixed(2)}px, 0)`;
        el.style.width = Math.max(0, listW - L.x).toFixed(1) + 'px';
      }
      L.raf = requestAnimationFrame(tick);
    };
    L.raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(L.raf);
  }, [active, listW, reduced]);

  const scaleK = () => { const el = rootRef.current; if (!el) return 1; const r = el.getBoundingClientRect(); return r.width / (el.offsetWidth || r.width) || 1; };
  const onScrub = (e) => {
    if (e.pointerType !== 'mouse' && e.type === 'pointermove') return;
    const list = listRef.current;
    if (!list) return;
    takeOver();
    const r = list.getBoundingClientRect();
    const y = (e.clientY - r.top) / scaleK();
    go(Math.floor(y / rowH));
  };
  const onKey = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); takeOver(); go(active + 1); }
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); takeOver(); go(active - 1); }
    else if (e.key === 'Home') { e.preventDefault(); takeOver(); go(0); }
    else if (e.key === 'End') { e.preventDefault(); takeOver(); go(N - 1); }
    else if (e.key === 'Enter' && links[active] && links[active] !== '#') { window.location.href = links[active]; }
  };

  const sans = '"Inter", -apple-system, "Helvetica Neue", Arial, sans-serif';
  const display = `"${fontFamily}", "Inter", -apple-system, "Helvetica Neue", Arial, sans-serif`;
  const mono = `"${monoFamily}", ui-monospace, "SFMono-Regular", Menlo, monospace`;
  const pad2 = (n) => String(n).padStart(2, '0');
  const filterCss = imageFilter === 'grayscale' ? 'grayscale(1) contrast(1.05)' : imageFilter === 'muted' ? 'saturate(0.55) contrast(0.98)' : 'none';
  const micro = { fontFamily: mono, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 400 };
  const easeOut = 'cubic-bezier(0.22, 1, 0.36, 1)';
  const slideD = Math.round(WD * 1.05);

  // mask-slide: outgoing copy leaves opposite to the travel, incoming rises in behind it
  const swapText = (render, delay, style, k) => {
    const dn = swap.dir > 0 ? 'u' : 'd';
    const anim = (kind) => (reduced || swap.n === 0 ? 'none' : `${uid}-${kind}${dn} ${slideD}ms cubic-bezier(0.76, 0, 0.24, 1) ${delay}ms both`);
    return (
      <span key={k} style={{ position: 'relative', display: 'block', overflow: 'hidden', ...style }}>
        {swap.prev !== null && swap.n > 0 && !reduced && (
          <span key={'o' + swap.n} aria-hidden="true" style={{ position: 'absolute', left: 0, top: 0, right: 0, display: 'block', animation: anim('out') }}>{render(swap.prev)}</span>
        )}
        <span key={'i' + swap.n} style={{ display: 'block', animation: anim('in') }}>{render(active)}</span>
      </span>
    );
  };

  const digits = pad2(active + 1).split('');

  if (!N) {
    return (
      <section className="index-scrubber" style={{ width: '100%', padding: 64, boxSizing: 'border-box', background: bg, color: muted, fontFamily: mono, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'center' }}>
        Add projects to build the index
      </section>
    );
  }

  const it = items[active];
  const preview = (
    <div aria-hidden="true" style={{ position: 'relative', width: imgW, height: imgH, overflow: 'hidden', background: line, borderRadius: 2, flexShrink: 0, animation: reduced ? 'none' : `${uid}-reveal 1100ms cubic-bezier(0.76, 0, 0.24, 1) 100ms both` }}>
      {items.map((_, i) => (
        <div key={i} ref={(el) => { layerRefs.current[i] = el; }} style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: i === 0 ? 3 : 1, clipPath: i === 0 ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)', WebkitClipPath: i === 0 ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)' }}>
          <img ref={(el) => { imgRefs.current[i] = el; }} src={images.length ? images[i % images.length] : ''} alt="" draggable="false" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: filterCss, transform: 'scale(1.04)' }} />
        </div>
      ))}
      <div style={{ ...micro, position: 'absolute', left: 14, bottom: 12, zIndex: 999, color: '#F3F2EF', display: 'flex', gap: 10, textShadow: '0 1px 8px rgba(0,0,0,0.35)' }}>
        <span>{pad2(active + 1)} / {pad2(N)}</span>
      </div>
    </div>
  );

  const bigNumber = (
    <div aria-hidden="true" style={{ display: 'flex', fontFamily: display, fontWeight: numberWeight, fontSize: nSize, lineHeight: 1, letterSpacing: '-0.06em', fontVariantNumeric: 'tabular-nums', height: '0.92em', overflow: 'hidden', marginLeft: '-0.05em' }}>
      {digits.map((d, k) => (
        <span key={k} style={{ display: 'block', height: '1em', width: '0.6em', position: 'relative' }}>
          <span style={{ display: 'block', transform: `translateY(${-parseInt(d, 10) * 10}%)`, transition: reduced ? 'none' : `transform ${RD}ms cubic-bezier(0.65, 0, 0.35, 1) ${k === 0 ? 0 : 50}ms`, marginTop: '-0.04em' }}>
            {'0123456789'.split('').map((g) => <span key={g} style={{ display: 'block', height: '1em', textAlign: 'center' }}>{g}</span>)}
          </span>
        </span>
      ))}
    </div>
  );

  const info = (
    <div style={{ width: infoW, height: compact ? 'auto' : mainH, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0 }}>
      <div style={{ display: compact ? 'flex' : 'block', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: compact ? 10 : 0, animation: reduced ? 'none' : `${uid}-fade 900ms ${easeOut} 200ms both` }}>
        <div style={{ ...micro, color: muted, marginBottom: 6, order: compact ? 2 : 0 }}>No.</div>
        {bigNumber}
      </div>
      <div aria-live="polite" style={{ animation: reduced ? 'none' : `${uid}-fade 900ms ${easeOut} 350ms both` }}>
        {swapText((i) => <span style={{ display: 'block', fontFamily: display, fontWeight: 400, fontSize: compact ? 34 : Math.round(Math.min(46, infoW * 0.15)), lineHeight: 1.02, letterSpacing: '-0.04em', paddingBottom: '0.08em' }}>{items[i].name}</span>, 0, { marginBottom: compact ? 14 : 22 }, 'title')}
        <div style={{ borderTop: `1px solid ${line}` }}>
          {[['Client', 'client'], ['Discipline', 'discipline'], ['Year', 'year']].map(([label, key], r) => (
            <div key={key} style={{ display: 'grid', gridTemplateColumns: '92px 1fr', gap: 12, alignItems: 'baseline', padding: '9px 0', borderBottom: `1px solid ${line}` }}>
              <span style={{ ...micro, color: muted }}>{label}</span>
              {swapText((i) => <span style={{ display: 'block', fontSize: 14, color: text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{items[i][key]}</span>, 40 + r * 35, {}, key)}
            </div>
          ))}
        </div>
        {descs.some(Boolean) && swapText((i) => <span style={{ display: 'block', fontSize: 14, lineHeight: 1.5, color: muted, minHeight: '3em' }}>{descs[i] || ''}</span>, 150, { marginTop: 14 }, 'desc')}
      </div>
    </div>
  );

  const list = (
    <div
      ref={listRef}
      role="listbox"
      tabIndex={0}
      aria-label={eyebrow || 'Projects'}
      aria-activedescendant={`${uid}-o${active}`}
      onKeyDown={onKey}
      onPointerMove={onScrub}
      onPointerDown={onScrub}
      className={`${uid}-list`}
      style={{ position: 'relative', width: listW, flexShrink: 0, outline: 'none', cursor: 'ns-resize', touchAction: 'pan-y' }}
    >
      <span ref={leaderRef} aria-hidden="true" style={{ position: 'absolute', left: 0, top: 0, height: 1, width: 0, background: text, transformOrigin: 'left', pointerEvents: 'none', zIndex: 2 }}>
        <span style={{ position: 'absolute', right: -3, top: -2.5, width: 6, height: 6, borderRadius: 999, background: accent }} />
      </span>
      {items.map((p, i) => {
        const on = i === active;
        const dist = Math.abs(i - active);
        return (
          <div
            key={i}
            id={`${uid}-o${i}`}
            role="option"
            aria-selected={on}
            ref={(el) => { rowRefs.current[i] = el; }}
            onClick={() => { takeOver(); go(i); }}
            style={{ display: 'flex', alignItems: 'center', gap: 14, height: rowH, whiteSpace: 'nowrap', animation: reduced ? 'none' : `${uid}-fade 700ms ${easeOut} ${150 + i * 35}ms both` }}
          >
            {showNumbers && <span style={{ ...micro, fontSize: 10, width: 20, color: on ? accent : muted, transition: 'color 240ms' }}>{pad2(i + 1)}</span>}
            <span ref={(el) => { nameRefs.current[i] = el; }} style={{ fontFamily: display, fontSize: indexSize, letterSpacing: '-0.015em', fontWeight: 400, color: on ? text : muted, opacity: on ? 1 : Math.max(0.45, 1 - dist * 0.09), transform: on ? 'translateX(6px)' : 'none', transition: reduced ? 'none' : `color 240ms, opacity 400ms, transform 420ms ${easeOut}` }}>{p.name}</span>
          </div>
        );
      })}
    </div>
  );

  return (
    <section
      ref={rootRef}
      className={`index-scrubber ${uid}`}
      aria-label={eyebrow || 'Index'}
      style={{ position: 'relative', width: '100%', minHeight: compact ? 0 : H, background: bg, color: text, fontFamily: sans, boxSizing: 'border-box', padding: `${compact ? 24 : pad * 0.75}px ${pad}px ${compact ? 36 : pad * 0.75}px`, overflow: 'hidden' }}
    >
      <style>{`
        .${uid} .${uid}-list:focus-visible { outline: 1.5px solid ${accent} !important; outline-offset: 8px; }
        @keyframes ${uid}-inu { from { transform: translateY(105%); } to { transform: translateY(0); } }
        @keyframes ${uid}-outu { from { transform: translateY(0); } to { transform: translateY(-105%); } }
        @keyframes ${uid}-ind { from { transform: translateY(-105%); } to { transform: translateY(0); } }
        @keyframes ${uid}-outd { from { transform: translateY(0); } to { transform: translateY(105%); } }
        @keyframes ${uid}-fade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        @keyframes ${uid}-reveal { from { clip-path: inset(100% 0% 0% 0%); } to { clip-path: inset(0% 0% 0% 0%); } }
        @media (prefers-reduced-motion: reduce) { .${uid} * { animation: none !important; transition: none !important; } }
      `}</style>

      <header style={{ ...micro, height: headerH, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, color: muted, animation: reduced ? 'none' : `${uid}-fade 700ms ${easeOut} both` }}>
        <span><span style={{ color: text }}>{eyebrow}</span><span style={{ marginLeft: 10 }}>({pad2(N)})</span></span>
        {!compact && <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: 99, background: user ? line : accent, transition: 'background 400ms' }} />{hint}</span>}
        <span>{headerRight}</span>
      </header>

      {compact ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div style={{ position: 'relative' }}>
            {preview}
          </div>
          {info}
          <div style={{ borderTop: `1px solid ${line}`, paddingTop: 6 }}>{list}</div>
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: gutter }}>
          {list}
          {info}
          {preview}
        </div>
      )}

      {!compact && (
        <footer style={{ ...micro, position: 'absolute', left: pad, right: pad, bottom: Math.round(pad * 0.6), display: 'flex', justifyContent: 'space-between', color: muted, animation: reduced ? 'none' : `${uid}-fade 700ms ${easeOut} 600ms both` }}>
          <span>↑ ↓ to browse</span>
          <span style={{ color: text }}>{it.discipline}</span>
        </footer>
      )}
    </section>
  );
}

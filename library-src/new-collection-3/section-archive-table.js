const MANIFEST = {
  "type": "Section.ArchiveTable",
  "description": "A project archive set as a precise grotesk and mono table. Column headers sort, chips filter, and every change is animated with FLIP: rows glide to their new places, removed rows fold away and new ones unfold. Hovering a row opens it inline into an image strip and a one-line description",
  "editorElement": {
    "selector": ".archive-table",
    "displayName": "Archive Table",
    "archetype": "container",
    "data": {
      "title": { "dataType": "text", "displayName": "Title", "defaultValue": "Archive", "group": "Content" },
      "intro": { "dataType": "text", "displayName": "Intro", "defaultValue": "Twelve years of buildings, books and identities. Sort any column, filter by discipline, hover a row to look inside.", "group": "Content" },
      "rows": { "dataType": "text", "displayName": "Rows (Title; Client; Discipline; Year; Description — rows separated by |)", "defaultValue": "Atlas House; Nordhavn Studio; Architecture; 2026; A timber-and-concrete residence on the Copenhagen waterfront.|Still Life; Still Life Ceramics; Identity; 2025; One colour, one typeface and a great deal of white space.|Meridian Tower; Halden Group; Wayfinding; 2024; Signage for 52 storeys, built from a single typographic rule.|Field Notes; Aperture Press; Editorial; 2025; A photography quarterly with a grid borrowed from contact sheets.|Kōhī; Kōhī Roasters; Identity; 2023; Packaging that treats every bag like a letter from the farm.|Northern Edge; Visit Faroe; Campaign; 2024; A campaign about weather, distance and being far away.|Salt Pavilion; City of Aarhus; Architecture; 2022; A seasonal bathing pavilion made of larch and salt-stained steel.|Orbit; Lumen Space; Campaign; 2026; A launch film for a satellite company, shot entirely in camera.|The Long Table; Hotel Brumm; Interiors; 2023; A forty-seat dining room arranged around one oak table.|Grid Systems; MIT Press; Editorial; 2021; A reissue of a modernist classic, reset in a new grotesk.|Harbour Line; Port of Oslo; Wayfinding; 2022; Ferry wayfinding readable at thirty metres in sea fog.|Quiet Rooms; Studio Brumm; Interiors; 2026; Six rooms for a listening bar, tuned for sound before sight.", "group": "Content" },
      "allLabel": { "dataType": "text", "displayName": "All Filter Label", "defaultValue": "All", "group": "Content" },
      "linkLabel": { "dataType": "text", "displayName": "Row Link Label", "defaultValue": "View case", "group": "Content" },
      "colNo": { "dataType": "text", "displayName": "Column: No.", "defaultValue": "No.", "group": "Columns" },
      "colTitle": { "dataType": "text", "displayName": "Column: Title", "defaultValue": "Title", "group": "Columns" },
      "colClient": { "dataType": "text", "displayName": "Column: Client", "defaultValue": "Client", "group": "Columns" },
      "colDiscipline": { "dataType": "text", "displayName": "Column: Discipline", "defaultValue": "Discipline", "group": "Columns" },
      "colYear": { "dataType": "text", "displayName": "Column: Year", "defaultValue": "Year", "group": "Columns" },
      "images": { "dataType": "text", "displayName": "Image URLs (comma separated, shared by rows)", "defaultValue": "https://picsum.photos/id/1076/800/520,https://picsum.photos/id/1031/800/520,https://picsum.photos/id/1068/800/520,https://picsum.photos/id/1060/800/520,https://picsum.photos/id/1050/800/520,https://picsum.photos/id/1049/800/520,https://picsum.photos/id/250/800/520,https://picsum.photos/id/866/800/520,https://picsum.photos/id/1083/800/520,https://picsum.photos/id/942/800/520,https://picsum.photos/id/1018/800/520,https://picsum.photos/id/1015/800/520", "group": "Images" },
      "imagesPerRow": { "dataType": "select", "displayName": "Images Per Row", "defaultValue": "4", "options": ["2", "3", "4", "5"], "group": "Images" },
      "imageFilter": { "dataType": "select", "displayName": "Image Treatment", "defaultValue": "none", "options": ["none", "muted", "grayscale"], "group": "Images" },
      "defaultSort": { "dataType": "select", "displayName": "Default Sort", "defaultValue": "no", "options": ["no", "title", "client", "discipline", "year"], "group": "Behaviour" },
      "defaultDirection": { "dataType": "select", "displayName": "Default Direction", "defaultValue": "ascending", "options": ["ascending", "descending"], "group": "Behaviour" },
      "restingOpen": { "dataType": "number", "displayName": "Row Open At Rest (0 = none)", "defaultValue": "2", "group": "Behaviour" },
      "showFilters": { "dataType": "booleanValue", "displayName": "Filter Chips", "defaultValue": "true", "group": "Behaviour" },
      "motionDuration": { "dataType": "select", "displayName": "Reorder Duration (ms)", "defaultValue": "700", "options": ["450", "600", "700", "900"], "group": "Animation" },
      "expandDuration": { "dataType": "select", "displayName": "Expand Duration (ms)", "defaultValue": "620", "options": ["400", "520", "620", "800"], "group": "Animation" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#F3F2EF", "group": "Colors" },
      "textColor": { "dataType": "color", "displayName": "Text", "defaultValue": "#0B0B0C", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#86827A", "group": "Colors" },
      "lineColor": { "dataType": "color", "displayName": "Rules", "defaultValue": "#D9D6CF", "group": "Colors" },
      "hoverColor": { "dataType": "color", "displayName": "Row Hover", "defaultValue": "#EAE8E3", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent", "defaultValue": "#D9480F", "group": "Colors" },
      "fontFamily": { "dataType": "select", "displayName": "Grotesk", "defaultValue": "Inter Tight", "options": ["Inter Tight", "Geist", "Hanken Grotesk", "Manrope"], "group": "Typography" },
      "monoFamily": { "dataType": "select", "displayName": "Mono", "defaultValue": "JetBrains Mono", "options": ["JetBrains Mono", "Geist Mono", "IBM Plex Mono"], "group": "Typography" },
      "titleSize": { "dataType": "select", "displayName": "Title Size (px)", "defaultValue": "168", "options": ["120", "144", "168", "200"], "group": "Typography" },
      "rowTitleSize": { "dataType": "select", "displayName": "Row Title Size (px)", "defaultValue": "26", "options": ["20", "24", "26", "32"], "group": "Typography" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const title = config?.title ?? 'Archive';
  const intro = config?.intro ?? 'Twelve years of buildings, books and identities. Sort any column, filter by discipline, hover a row to look inside.';
  const rowsSrc = config?.rows || 'Atlas House; Nordhavn Studio; Architecture; 2026; A timber-and-concrete residence on the Copenhagen waterfront.|Still Life; Still Life Ceramics; Identity; 2025; One colour, one typeface and a great deal of white space.|Meridian Tower; Halden Group; Wayfinding; 2024; Signage for 52 storeys, built from a single typographic rule.|Field Notes; Aperture Press; Editorial; 2025; A photography quarterly with a grid borrowed from contact sheets.|Kōhī; Kōhī Roasters; Identity; 2023; Packaging that treats every bag like a letter from the farm.|Northern Edge; Visit Faroe; Campaign; 2024; A campaign about weather, distance and being far away.|Salt Pavilion; City of Aarhus; Architecture; 2022; A seasonal bathing pavilion made of larch and salt-stained steel.|Orbit; Lumen Space; Campaign; 2026; A launch film for a satellite company, shot entirely in camera.|The Long Table; Hotel Brumm; Interiors; 2023; A forty-seat dining room arranged around one oak table.|Grid Systems; MIT Press; Editorial; 2021; A reissue of a modernist classic, reset in a new grotesk.|Harbour Line; Port of Oslo; Wayfinding; 2022; Ferry wayfinding readable at thirty metres in sea fog.|Quiet Rooms; Studio Brumm; Interiors; 2026; Six rooms for a listening bar, tuned for sound before sight.';
  const allLabel = config?.allLabel || 'All';
  const linkLabel = config?.linkLabel ?? 'View case';
  const cols = {
    no: config?.colNo || 'No.',
    title: config?.colTitle || 'Title',
    client: config?.colClient || 'Client',
    discipline: config?.colDiscipline || 'Discipline',
    year: config?.colYear || 'Year'
  };
  const images = String(config?.images || 'https://picsum.photos/id/1076/800/520,https://picsum.photos/id/1031/800/520,https://picsum.photos/id/1068/800/520,https://picsum.photos/id/1060/800/520,https://picsum.photos/id/1050/800/520,https://picsum.photos/id/1049/800/520,https://picsum.photos/id/250/800/520,https://picsum.photos/id/866/800/520,https://picsum.photos/id/1083/800/520,https://picsum.photos/id/942/800/520,https://picsum.photos/id/1018/800/520,https://picsum.photos/id/1015/800/520').split(',').map((s) => s.trim()).filter(Boolean);
  const perRow = Math.max(1, parseInt(config?.imagesPerRow || '4', 10) || 4);
  const imageFilter = config?.imageFilter || 'none';
  const defaultSort = config?.defaultSort || 'no';
  const defaultDir = (config?.defaultDirection || 'ascending') === 'descending' ? -1 : 1;
  const restingOpen = parseInt(config?.restingOpen ?? '2', 10) || 0;
  const showFilters = bool(config?.showFilters, true);
  const MD = parseInt(config?.motionDuration || '700', 10) || 700;
  const XD = parseInt(config?.expandDuration || '620', 10) || 620;
  const bg = config?.backgroundColor || '#F3F2EF';
  const text = config?.textColor || '#0B0B0C';
  const muted = config?.mutedColor || '#86827A';
  const line = config?.lineColor || '#D9D6CF';
  const hoverBg = config?.hoverColor || '#EAE8E3';
  const accent = config?.accentColor || '#D9480F';
  const fontFamily = config?.fontFamily || 'Inter Tight';
  const monoFamily = config?.monoFamily || 'JetBrains Mono';
  const titleSize = parseInt(config?.titleSize || '168', 10) || 168;
  const rowTitleSize = parseInt(config?.rowTitleSize || '26', 10) || 26;

  const items = React.useMemo(() => rowsSrc.split('|').map((r) => r.trim()).filter(Boolean).map((r, i) => {
    const f = r.split(';').map((x) => x.trim());
    return { id: i, no: i + 1, title: f[0] || 'Untitled', client: f[1] || '', discipline: f[2] || '', year: f[3] || '', desc: f[4] || '' };
  }), [rowsSrc]);

  const uid = React.useMemo(() => 'at' + Math.random().toString(36).slice(2, 9), []);
  const reduced = React.useMemo(() => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const rootRef = React.useRef(null);
  const listRef = React.useRef(null);
  const rowEls = React.useRef({});
  const chipRefs = React.useRef({});
  const chipPill = React.useRef(null);
  const chipInner = React.useRef(null);
  const snapRef = React.useRef(null);
  const hoverT = React.useRef(0);
  const leaveSeq = React.useRef(0);

  const [width, setWidth] = React.useState(1280);
  const [sortKey, setSortKey] = React.useState(defaultSort);
  const [sortDir, setSortDir] = React.useState(defaultDir);
  const [filter, setFilter] = React.useState(null);
  const [hovered, setHovered] = React.useState(null);
  const [pinned, setPinned] = React.useState(null);
  const [touched, setTouched] = React.useState(false);
  const [leaving, setLeaving] = React.useState([]);
  const [introDone, setIntroDone] = React.useState(reduced);

  React.useEffect(() => {
    if (reduced) return undefined;
    const t = setTimeout(() => setIntroDone(true), 1500 + items.length * 45);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => { setSortKey(defaultSort); setSortDir(defaultDir); }, [defaultSort, defaultDir]);

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
    return () => { if (ro) ro.disconnect(); clearTimeout(hoverT.current); };
  }, []);

  const disciplines = React.useMemo(() => {
    const seen = [];
    items.forEach((it) => { if (it.discipline && !seen.includes(it.discipline)) seen.push(it.discipline); });
    return seen;
  }, [items]);

  const computeVisible = React.useCallback((flt, key, dir) => {
    const list = items.filter((it) => !flt || it.discipline === flt);
    const val = (it) => (key === 'no' ? it.no : key === 'year' ? parseInt(it.year, 10) || 0 : String(it[key] || '').toLowerCase());
    return list.slice().sort((a, b) => {
      const va = val(a); const vb = val(b);
      const c = typeof va === 'number' ? va - vb : va.localeCompare(vb);
      return (c || a.no - b.no) * dir;
    });
  }, [items]);

  const visible = React.useMemo(() => computeVisible(filter, sortKey, sortDir), [computeVisible, filter, sortKey, sortDir]);
  const orderKey = visible.map((v) => v.id).join(',');

  const scaleK = () => { const el = rootRef.current; if (!el) return 1; const r = el.getBoundingClientRect(); return r.width / (el.offsetWidth || r.width) || 1; };

  // snapshot current on-screen positions, then let React re-render into the new order
  const change = (flt, key, dir) => {
    const list = listRef.current;
    const next = computeVisible(flt, key, dir);
    if (list && !reduced) {
      const k = scaleK();
      const lr = list.getBoundingClientRect();
      const pos = {};
      const gone = [];
      const nextIds = new Set(next.map((n) => n.id));
      visible.forEach((it) => {
        const el = rowEls.current[it.id];
        if (!el) return;
        const r = el.getBoundingClientRect();
        pos[it.id] = (r.top - lr.top) / k;
        if (!nextIds.has(it.id)) gone.push({ id: it.id, top: (r.top - lr.top) / k, h: r.height / k, seq: ++leaveSeq.current });
      });
      snapRef.current = { pos, h: lr.height / k, gone: gone.length };
      if (gone.length) {
        setLeaving((L) => [...L.filter((x) => !nextIds.has(x.id) && !gone.some((g) => g.id === x.id)), ...gone]);
        const seqs = gone.map((g) => g.seq);
        setTimeout(() => setLeaving((L) => L.filter((x) => !seqs.includes(x.seq))), MD + 80);
      } else {
        setLeaving((L) => L.filter((x) => !nextIds.has(x.id)));
      }
    }
    setFilter(flt); setSortKey(key); setSortDir(dir);
  };

  React.useLayoutEffect(() => {
    const s = snapRef.current;
    const list = listRef.current;
    if (!s || !list) return;
    snapRef.current = null;
    const ease = 'cubic-bezier(0.65, 0, 0.35, 1)';
    const newH = list.offsetHeight;
    if (Math.abs(newH - s.h) > 1) list.animate([{ height: s.h + 'px' }, { height: newH + 'px' }], { duration: MD, delay: s.gone && newH < s.h ? Math.round(MD * 0.22) : 0, easing: ease, fill: 'backwards' });
    let entering = 0;
    visible.forEach((it, idx) => {
      const el = rowEls.current[it.id];
      if (!el) return;
      el.getAnimations().forEach((a) => a.cancel());
      const top = el.offsetTop;
      if (s.pos[it.id] === undefined) {
        el.animate([
          { opacity: 0, clipPath: 'inset(0% 0% 100% 0%)', transform: 'translateY(-14px)' },
          { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', transform: 'translateY(0px)' }
        ], { duration: Math.round(MD * 0.9), delay: Math.round(MD * 0.35) + entering * 45, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'backwards' });
        entering += 1;
      } else {
        const dy = s.pos[it.id] - top;
        if (Math.abs(dy) > 0.5) el.animate([{ transform: `translateY(${dy}px)` }, { transform: 'translateY(0px)' }], { duration: MD, delay: (s.gone ? Math.round(MD * 0.22) : 0) + Math.min(idx * 14, 140), easing: ease, fill: 'backwards' });
      }
    });
  }, [orderKey]); // eslint-disable-line react-hooks/exhaustive-deps

  // sliding filter pill
  React.useLayoutEffect(() => {
    const pill = chipPill.current;
    const chip = chipRefs.current[filter === null ? '__all' : filter];
    if (!pill || !chip) return;
    pill.style.transform = `translateX(${chip.offsetLeft}px)`;
    if (chipInner.current) chipInner.current.style.transform = `translateX(${-chip.offsetLeft}px)`;
    pill.style.width = chip.offsetWidth + 'px';
    pill.style.opacity = '1';
  }, [filter, width, disciplines.length]);

  const clickSort = (key) => {
    if (key === sortKey) change(filter, key, -sortDir);
    else change(filter, key, key === 'year' ? -1 : 1);
  };
  const clickFilter = (f) => { if (f !== filter) change(f, sortKey, sortDir); };

  const enterRow = (id) => {
    clearTimeout(hoverT.current);
    hoverT.current = setTimeout(() => { setTouched(true); setHovered(id); }, 70);
  };
  const leaveList = () => { clearTimeout(hoverT.current); hoverT.current = setTimeout(() => setHovered(null), 120); };

  const restingId = !touched && restingOpen > 0 && items[restingOpen - 1] ? items[restingOpen - 1].id : null;
  const openId = hovered ?? pinned ?? restingId;

  const compact = width < 760;
  const pad = compact ? 16 : Math.round(Math.max(28, Math.min(56, width * 0.04)));
  const sans = '"Inter", -apple-system, "Helvetica Neue", Arial, sans-serif';
  const display = `"${fontFamily}", "Inter", -apple-system, "Helvetica Neue", Arial, sans-serif`;
  const mono = `"${monoFamily}", ui-monospace, "SFMono-Regular", Menlo, monospace`;
  const pad2 = (n) => String(n).padStart(2, '0');
  const filterCss = imageFilter === 'grayscale' ? 'grayscale(1) contrast(1.05)' : imageFilter === 'muted' ? 'saturate(0.55) contrast(0.98)' : 'none';
  const btnReset = { appearance: 'none', border: 'none', background: 'transparent', padding: 0, margin: 0, font: 'inherit', color: 'inherit', textAlign: 'left', cursor: 'pointer' };
  const micro = { fontFamily: mono, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 400 };
  const gridCols = compact ? '34px minmax(0,1fr) 48px' : '76px minmax(0,1.5fr) minmax(0,1fr) minmax(0,0.9fr) 64px';
  const colKeys = compact ? ['no', 'title', 'year'] : ['no', 'title', 'client', 'discipline', 'year'];
  const easeOut = 'cubic-bezier(0.22, 1, 0.36, 1)';
  const PD = 620;
  const pillEase = 'cubic-bezier(0.65, 0, 0.35, 1)';
  const tSize = compact ? Math.round(Math.min(titleSize * 0.5, width * 0.2)) : Math.round(Math.min(titleSize, width * 0.13));
  const rtSize = compact ? Math.round(rowTitleSize * 0.78) : rowTitleSize;
  const rowPadY = compact ? 14 : 16;
  const stripH = compact ? 92 : Math.round(Math.min(150, (width - pad * 2 - 76) / perRow / 1.6));

  const renderCells = (it, open) => {
    const cellText = { fontSize: compact ? 13 : 15, color: open ? text : muted, transition: `color 300ms`, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' };
    return (
      <div style={{ display: 'grid', gridTemplateColumns: gridCols, gap: compact ? 10 : 20, alignItems: 'baseline', padding: `${rowPadY}px ${compact ? 0 : 12}px` }}>
        <span style={{ ...micro, color: open ? accent : muted, display: 'flex', alignItems: 'center', gap: 8, transition: 'color 300ms' }}>
          {!compact && <span aria-hidden="true" style={{ display: 'block', width: 10, height: 1, background: accent, transformOrigin: 'left', transform: open ? 'scaleX(1)' : 'scaleX(0)', transition: `transform ${XD}ms ${easeOut}` }} />}
          {pad2(it.no)}
        </span>
        <span style={{ minWidth: 0 }}>
          <span style={{ display: 'block', fontFamily: display, fontSize: rtSize, lineHeight: 1.1, letterSpacing: '-0.025em', fontWeight: 400, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', transform: open && !compact ? 'translateX(6px)' : 'none', transition: `transform ${XD}ms ${easeOut}` }}>{it.title}</span>
          {compact && <span style={{ display: 'block', marginTop: 4, ...micro, fontSize: 10, color: muted }}>{it.client} · {it.discipline}</span>}
        </span>
        {!compact && <span style={cellText}>{it.client}</span>}
        {!compact && <span style={{ ...micro, color: open ? text : muted, transition: 'color 300ms' }}>{it.discipline}</span>}
        <span style={{ ...micro, fontSize: compact ? 11 : 12, textAlign: 'right', color: text, fontVariantNumeric: 'tabular-nums' }}>{it.year}</span>
      </div>
    );
  };

  if (!items.length) {
    return (
      <section className="archive-table" style={{ width: '100%', padding: 64, boxSizing: 'border-box', background: bg, color: muted, fontFamily: mono, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'center' }}>
        Add rows to build the archive
      </section>
    );
  }

  return (
    <section
      ref={rootRef}
      className={`archive-table ${uid}`}
      aria-label={title || 'Archive'}
      style={{ position: 'relative', width: '100%', background: bg, color: text, fontFamily: sans, boxSizing: 'border-box', padding: `${compact ? 28 : 36}px ${pad}px ${compact ? 40 : 64}px`, overflow: 'hidden' }}
    >
      <style>{`
        .${uid} button:focus-visible { outline: 1.5px solid ${accent}; outline-offset: 3px; border-radius: 2px; }
        .${uid} .${uid}-chips::-webkit-scrollbar { display: none; }
        @keyframes ${uid}-rise { from { transform: translateY(102%); } to { transform: none; } }
        @keyframes ${uid}-fade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        @keyframes ${uid}-line { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes ${uid}-fold { from { clip-path: inset(0% 0% 0% 0%); opacity: 1; } to { clip-path: inset(0% 0% 100% 0%); opacity: 0; transform: translateY(-6px); } }
        @media (prefers-reduced-motion: reduce) { .${uid} * { animation: none !important; transition: none !important; } }
      `}</style>

      <header style={{ display: 'grid', gridTemplateColumns: compact ? '1fr' : 'minmax(0,1fr) minmax(220px, 340px)', alignItems: 'end', gap: compact ? 14 : 40, marginBottom: compact ? 22 : 28 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: compact ? 8 : 14, minWidth: 0 }}>
          <h2 style={{ margin: 0, overflow: 'hidden', paddingBottom: '0.04em', fontFamily: display, fontWeight: 400, fontSize: tSize, lineHeight: 0.86, letterSpacing: '-0.055em' }}>
            <span style={{ display: 'block', animation: reduced ? 'none' : `${uid}-rise 1100ms ${easeOut} both` }}>{title}</span>
          </h2>
          <span style={{ ...micro, fontSize: compact ? 11 : 13, marginTop: compact ? 4 : 10, color: muted, animation: reduced ? 'none' : `${uid}-fade 700ms ${easeOut} 400ms both` }}>({pad2(visible.length)}/{pad2(items.length)})</span>
        </div>
        {intro && <p style={{ margin: 0, fontSize: compact ? 13 : 14, lineHeight: 1.55, color: muted, maxWidth: 340, paddingBottom: compact ? 0 : 6, animation: reduced ? 'none' : `${uid}-fade 800ms ${easeOut} 300ms both` }}>{intro}</p>}
      </header>

      {showFilters && disciplines.length > 1 && (
        <div className={`${uid}-chips`} role="group" aria-label="Filter by discipline" style={{ position: 'relative', display: 'flex', gap: 6, marginBottom: compact ? 18 : 26, overflowX: 'auto', scrollbarWidth: 'none', animation: reduced ? 'none' : `${uid}-fade 800ms ${easeOut} 450ms both` }}>
          {[null, ...disciplines].map((d) => {
            const on = d === filter;
            const n = d === null ? items.length : items.filter((it) => it.discipline === d).length;
            return (
              <button
                key={d || '__all'}
                ref={(el) => { chipRefs.current[d === null ? '__all' : d] = el; }}
                aria-pressed={on}
                onClick={() => clickFilter(d)}
                style={{ ...btnReset, position: 'relative', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6, height: 32, padding: '0 14px', boxSizing: 'border-box', whiteSpace: 'nowrap', borderRadius: 999, border: `1px solid ${line}`, color: text, fontSize: 13, letterSpacing: '-0.005em' }}
              >
                {d === null ? allLabel : d}
                <span style={{ fontFamily: mono, fontSize: 10, opacity: 0.6, fontVariantNumeric: 'tabular-nums' }}>{pad2(n)}</span>
              </button>
            );
          })}
          <span ref={chipPill} aria-hidden="true" style={{ position: 'absolute', left: 0, top: 0, height: 32, width: 0, borderRadius: 999, overflow: 'hidden', background: text, opacity: 0, pointerEvents: 'none', transition: reduced ? 'none' : `transform ${PD}ms ${pillEase}, width ${PD}ms ${pillEase}` }}>
            <span ref={chipInner} style={{ position: 'absolute', left: 0, top: 0, display: 'flex', gap: 6, transition: reduced ? 'none' : `transform ${PD}ms ${pillEase}` }}>
              {[null, ...disciplines].map((d) => (
                <span key={d || '__all'} style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6, height: 32, padding: '0 14px', border: '1px solid transparent', boxSizing: 'border-box', color: bg, fontSize: 13, letterSpacing: '-0.005em', whiteSpace: 'nowrap' }}>
                  {d === null ? allLabel : d}
                  <span style={{ fontFamily: mono, fontSize: 10, opacity: 0.6, fontVariantNumeric: 'tabular-nums' }}>{pad2(d === null ? items.length : items.filter((it) => it.discipline === d).length)}</span>
                </span>
              ))}
            </span>
          </span>
        </div>
      )}

      <div role="table" aria-label={title || 'Archive'} aria-rowcount={visible.length} style={{ position: 'relative' }}>
        <div role="row" style={{ display: 'grid', gridTemplateColumns: gridCols, gap: compact ? 10 : 20, padding: `0 ${compact ? 0 : 12}px 10px`, alignItems: 'end', animation: reduced ? 'none' : `${uid}-fade 700ms ${easeOut} 500ms both` }}>
          {colKeys.map((k) => {
            const on = sortKey === k;
            return (
              <span key={k} role="columnheader" aria-sort={on ? (sortDir > 0 ? 'ascending' : 'descending') : 'none'} style={{ textAlign: k === 'year' ? 'right' : 'left' }}>
                <button onClick={() => clickSort(k)} aria-label={`Sort by ${cols[k]}`} style={{ ...btnReset, ...micro, fontSize: 10.5, display: 'inline-flex', alignItems: 'center', gap: 6, color: on ? text : muted, flexDirection: k === 'year' ? 'row-reverse' : 'row', transition: 'color 300ms' }}>
                  {cols[k]}
                  <svg width="8" height="10" viewBox="0 0 8 10" aria-hidden="true" style={{ opacity: on ? 1 : 0, transform: `rotate(${on && sortDir < 0 ? 180 : 0}deg)`, transition: `transform 420ms ${easeOut}, opacity 300ms` }}><path d="M4 9V1M1 4l3-3 3 3" fill="none" stroke="currentColor" strokeWidth="1.1" /></svg>
                </button>
              </span>
            );
          })}
        </div>
        <div aria-hidden="true" style={{ height: 1, background: text, transformOrigin: 'left', animation: reduced ? 'none' : `${uid}-line 1000ms ${easeOut} 450ms both` }} />

        <div ref={listRef} role="rowgroup" style={{ position: 'relative', overflow: 'hidden' }} onPointerLeave={leaveList}>
          {visible.map((it, idx) => {
            const open = openId === it.id;
            const imgs = images.length ? Array.from({ length: perRow }).map((_, k) => images[(it.id * 3 + k) % images.length]) : [];
            return (
              <div
                key={it.id}
                ref={(el) => { if (el) rowEls.current[it.id] = el; else delete rowEls.current[it.id]; }}
                role="row"
                onPointerEnter={(e) => { if (e.pointerType === 'mouse') enterRow(it.id); }}
                style={{ position: 'relative', zIndex: 1, background: open ? hoverBg : bg, borderBottom: `1px solid ${line}`, transition: `background-color ${XD}ms ${easeOut}`, animation: introDone ? 'none' : `${uid}-fade 700ms ${easeOut} ${560 + idx * 45}ms both` }}
              >
                <button
                  aria-expanded={open}
                  aria-label={`${it.title}, ${it.client}, ${it.discipline}, ${it.year}`}
                  onClick={() => { setTouched(true); setPinned((p) => (p === it.id && hovered !== it.id ? null : it.id)); setHovered(null); }}
                  onFocus={() => { setTouched(true); setHovered(it.id); }}
                  onBlur={() => setHovered((h) => (h === it.id ? null : h))}
                  style={{ ...btnReset, display: 'block', width: '100%' }}
                >
                  <span role="cell" style={{ display: 'block' }}>{renderCells(it, open)}</span>
                </button>
                <div aria-hidden={!open} style={{ display: 'grid', gridTemplateRows: open ? '1fr' : '0fr', transition: reduced ? 'none' : `grid-template-rows ${XD}ms cubic-bezier(0.65, 0, 0.35, 1)` }}>
                  <div style={{ minHeight: 0, overflow: 'hidden' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: compact ? '1fr' : '76px 1fr', gap: compact ? 12 : 20, padding: compact ? '0 0 16px' : '2px 12px 20px' }}>
                      {!compact && <span />}
                      <div>
                        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${compact ? Math.min(3, perRow) : perRow}, minmax(0,1fr))`, gap: compact ? 6 : 10 }}>
                          {imgs.slice(0, compact ? Math.min(3, perRow) : perRow).map((src, k) => (
                            <div key={k} style={{ position: 'relative', height: stripH, overflow: 'hidden', borderRadius: 2, background: line, clipPath: open ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)', WebkitClipPath: open ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)', transition: reduced ? 'none' : `clip-path ${XD + 100}ms cubic-bezier(0.77, 0, 0.18, 1) ${open ? 60 + k * 55 : 0}ms, -webkit-clip-path ${XD + 100}ms cubic-bezier(0.77, 0, 0.18, 1) ${open ? 60 + k * 55 : 0}ms` }}>
                              <img src={src} alt={k === 0 ? `${it.title} — ${it.desc}` : ''} loading="lazy" draggable="false" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: filterCss, transform: open ? 'scale(1)' : 'scale(1.18)', transition: reduced ? 'none' : `transform ${XD + 600}ms ${easeOut} ${open ? 60 + k * 55 : 0}ms` }} />
                            </div>
                          ))}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 20, marginTop: 12, overflow: 'hidden' }}>
                          <p style={{ margin: 0, fontSize: compact ? 13 : 15, lineHeight: 1.45, color: text, transform: open ? 'none' : 'translateY(110%)', opacity: open ? 1 : 0, transition: reduced ? 'none' : `transform ${XD}ms ${easeOut} ${open ? 180 : 0}ms, opacity ${XD}ms ${open ? 180 : 0}ms` }}>{it.desc}</p>
                          {linkLabel && !compact && <span style={{ ...micro, flexShrink: 0, color: accent, transform: open ? 'none' : 'translateY(110%)', transition: reduced ? 'none' : `transform ${XD}ms ${easeOut} ${open ? 240 : 0}ms` }}>{linkLabel} →</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {leaving.map((g) => {
            const it = items.find((x) => x.id === g.id);
            if (!it) return null;
            return (
              <div key={'g' + g.seq} aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, top: g.top, height: g.h, overflow: 'hidden', borderBottom: `1px solid ${line}`, pointerEvents: 'none', animation: `${uid}-fold ${Math.round(MD * 0.7)}ms cubic-bezier(0.65, 0, 0.35, 1) both` }}>
                {renderCells(it, false)}
              </div>
            );
          })}
          {!visible.length && (
            <div style={{ ...micro, padding: '40px 12px', color: muted }}>Nothing here yet</div>
          )}
        </div>
      </div>
    </section>
  );
}

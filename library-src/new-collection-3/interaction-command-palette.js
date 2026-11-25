const MANIFEST = {
  "type": "Interaction.CommandPalette",
  "description": "A spotlight-style command palette floating over a softly blurred page. Type and a grouped list filters with fuzzy matching and highlighted characters, results glide in and out with FLIP, arrow keys move a sliding highlight and Enter runs a command with a crisp confirmation. Esc closes, ⌘K reopens; an autodemo types a query by itself",
  "editorElement": {
    "selector": ".command-palette",
    "displayName": "Command Palette",
    "archetype": "container",
    "data": {
      "placeholder": { "dataType": "text", "displayName": "Placeholder", "defaultValue": "Search pages, projects and actions", "group": "Content" },
      "items": { "dataType": "text", "displayName": "Commands (Group; Label; Hint — separated by |)", "defaultValue": "Navigate; Home; G H|Navigate; Work index; G W|Navigate; Studio and people; G S|Navigate; Journal; G J|Projects; Atlas House; Architecture · 2026|Projects; Meridian Tower; Wayfinding · 2024|Projects; Still Life; Identity · 2025|Projects; Northern Edge; Campaign · 2024|Actions; Copy page link; ⌘ L|Actions; Switch to dark mode; ⌘ D|Actions; Download press kit; ⌘ P|Actions; Book an intro call; ⌘ B", "group": "Content" },
      "emptyText": { "dataType": "text", "displayName": "No Results Text", "defaultValue": "No matches", "group": "Content" },
      "doneLabel": { "dataType": "text", "displayName": "Confirmation Label", "defaultValue": "Done", "group": "Content" },
      "openHint": { "dataType": "text", "displayName": "Reopen Button Label", "defaultValue": "Search", "group": "Content" },
      "pageBrand": { "dataType": "text", "displayName": "Background Page Brand", "defaultValue": "Ferro Studio", "group": "Background Page" },
      "pageHeadline": { "dataType": "text", "displayName": "Background Page Headline", "defaultValue": "Quiet, precise things for people who notice.", "group": "Background Page" },
      "pageImage1": { "dataType": "text", "displayName": "Background Image 1", "defaultValue": "https://picsum.photos/id/1076/900/700", "group": "Background Page" },
      "pageImage2": { "dataType": "text", "displayName": "Background Image 2", "defaultValue": "https://picsum.photos/id/1068/900/700", "group": "Background Page" },
      "blurAmount": { "dataType": "select", "displayName": "Page Blur (px)", "defaultValue": "10", "options": ["4", "8", "10", "16"], "group": "Background Page" },
      "autodemo": { "dataType": "booleanValue", "displayName": "Autodemo", "defaultValue": "true", "group": "Animation" },
      "demoQuery": { "dataType": "text", "displayName": "Autodemo Query", "defaultValue": "st", "group": "Animation" },
      "demoRun": { "dataType": "booleanValue", "displayName": "Autodemo Runs A Command", "defaultValue": "true", "group": "Animation" },
      "motionDuration": { "dataType": "select", "displayName": "List Motion (ms)", "defaultValue": "420", "options": ["280", "420", "560"], "group": "Animation" },
      "height": { "dataType": "select", "displayName": "Section Height (px)", "defaultValue": "800", "options": ["640", "720", "800", "880"], "group": "Layout" },
      "paletteWidth": { "dataType": "select", "displayName": "Palette Width (px)", "defaultValue": "720", "options": ["560", "640", "720", "800"], "group": "Layout" },
      "pageColor": { "dataType": "color", "displayName": "Page Background", "defaultValue": "#E9E7E2", "group": "Colors" },
      "panelColor": { "dataType": "color", "displayName": "Palette Background", "defaultValue": "#FBFAF8", "group": "Colors" },
      "textColor": { "dataType": "color", "displayName": "Text", "defaultValue": "#0B0B0C", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#8E8A82", "group": "Colors" },
      "lineColor": { "dataType": "color", "displayName": "Rules", "defaultValue": "#E4E1DB", "group": "Colors" },
      "highlightColor": { "dataType": "color", "displayName": "Highlight", "defaultValue": "#EFEDE8", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent", "defaultValue": "#D9480F", "group": "Colors" },
      "fontFamily": { "dataType": "select", "displayName": "Grotesk", "defaultValue": "Inter Tight", "options": ["Inter Tight", "Geist", "Hanken Grotesk", "Manrope"], "group": "Typography" },
      "monoFamily": { "dataType": "select", "displayName": "Mono", "defaultValue": "JetBrains Mono", "options": ["JetBrains Mono", "Geist Mono", "IBM Plex Mono"], "group": "Typography" },
      "inputSize": { "dataType": "select", "displayName": "Search Text Size (px)", "defaultValue": "28", "options": ["22", "26", "28", "32"], "group": "Typography" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const placeholder = config?.placeholder ?? 'Search pages, projects and actions';
  const items = React.useMemo(() => String(config?.items || 'Navigate; Home; G H|Navigate; Work index; G W|Navigate; Studio and people; G S|Navigate; Journal; G J|Projects; Atlas House; Architecture · 2026|Projects; Meridian Tower; Wayfinding · 2024|Projects; Still Life; Identity · 2025|Projects; Northern Edge; Campaign · 2024|Actions; Copy page link; ⌘ L|Actions; Switch to dark mode; ⌘ D|Actions; Download press kit; ⌘ P|Actions; Book an intro call; ⌘ B')
    .split('|').map((r) => r.trim()).filter(Boolean).map((r, i) => { const f = r.split(';').map((x) => x.trim()); return { id: i, group: f[0] || 'Results', label: f[1] || f[0] || '', hint: f[2] || '' }; }), [config?.items]);
  const emptyText = config?.emptyText || 'No matches';
  const doneLabel = config?.doneLabel || 'Done';
  const openHint = config?.openHint || 'Search';
  const pageBrand = config?.pageBrand ?? 'Ferro Studio';
  const pageHeadline = config?.pageHeadline ?? 'Quiet, precise things for people who notice.';
  const pageImage1 = config?.pageImage1 || 'https://picsum.photos/id/1076/900/700';
  const pageImage2 = config?.pageImage2 || 'https://picsum.photos/id/1068/900/700';
  const blurPx = parseInt(config?.blurAmount || '10', 10) || 10;
  const autodemo = bool(config?.autodemo, true);
  const demoQuery = config?.demoQuery || 'st';
  const demoRun = bool(config?.demoRun, true);
  const MD = parseInt(config?.motionDuration || '420', 10) || 420;
  const H = parseInt(config?.height || '800', 10) || 800;
  const PW = parseInt(config?.paletteWidth || '720', 10) || 720;
  const pageColor = config?.pageColor || '#E9E7E2';
  const panel = config?.panelColor || '#FBFAF8';
  const text = config?.textColor || '#0B0B0C';
  const muted = config?.mutedColor || '#8E8A82';
  const line = config?.lineColor || '#E4E1DB';
  const hl = config?.highlightColor || '#EFEDE8';
  const accent = config?.accentColor || '#D9480F';
  const fontFamily = config?.fontFamily || 'Inter Tight';
  const monoFamily = config?.monoFamily || 'JetBrains Mono';
  const inputSize = parseInt(config?.inputSize || '28', 10) || 28;

  const uid = React.useMemo(() => 'cp' + Math.random().toString(36).slice(2, 9), []);
  const reduced = React.useMemo(() => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const rootRef = React.useRef(null);
  const inputRef = React.useRef(null);
  const mirrorRef = React.useRef(null);
  const scrollRef = React.useRef(null);
  const contentRef = React.useRef(null);
  const pillRef = React.useRef(null);
  const itemEls = React.useRef({});
  const headEls = React.useRef({});
  const snapRef = React.useRef(null);
  const demoRef = React.useRef({ timers: [], stopped: false });
  const ranT = React.useRef(0);
  const ghostSeq = React.useRef(0);
  const caretRef = React.useRef(null);
  const selRef = React.useRef(0);

  const [width, setWidth] = React.useState(1280);
  const [query, setQuery] = React.useState('');
  const [sel, setSel] = React.useState(0);
  const [caretAt, setCaretAt] = React.useState(0);
  const [open, setOpen] = React.useState(true);
  const [ran, setRan] = React.useState(null);
  const [typing, setTyping] = React.useState(false);
  const [ghosts, setGhosts] = React.useState([]);
  const [shown, setShown] = React.useState(reduced);

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
    let raf2 = 0;
    const raf = requestAnimationFrame(() => { raf2 = requestAnimationFrame(() => setShown(true)); });
    return () => { if (ro) ro.disconnect(); cancelAnimationFrame(raf); cancelAnimationFrame(raf2); clearTimeout(ranT.current); };
  }, []);

  const fuzzy = (q, s) => {
    const ql = q.toLowerCase().replace(/\s+/g, '');
    if (!ql) return { score: 0, idx: [] };
    const sl = s.toLowerCase();
    const idx = [];
    let qi = 0; let score = 0; let last = -2;
    for (let i = 0; i < sl.length && qi < ql.length; i++) {
      if (sl[i] === ql[qi]) {
        idx.push(i);
        score += 1 + (i === last + 1 ? 3 : 0) + (i === 0 || /[\s\-·&]/.test(sl[i - 1]) ? 2 : 0);
        last = i; qi += 1;
      }
    }
    if (qi < ql.length) return null;
    return { score: score - idx[0] * 0.08 - (sl.length - idx.length) * 0.02, idx };
  };

  const computeResults = React.useCallback((q) => {
    const groups = [];
    items.forEach((it) => {
      const m = fuzzy(q, it.label);
      if (!m) return;
      let g = groups.find((x) => x.name === it.group);
      if (!g) { g = { name: it.group, list: [] }; groups.push(g); }
      g.list.push({ ...it, score: m.score, idx: m.idx });
    });
    if (q.trim()) groups.forEach((g) => g.list.sort((a, b) => b.score - a.score || a.id - b.id));
    if (q.trim()) groups.sort((a, b) => b.list[0].score - a.list[0].score);
    return groups;
  }, [items]); // eslint-disable-line react-hooks/exhaustive-deps

  const groups = React.useMemo(() => computeResults(query), [computeResults, query]);
  const flat = React.useMemo(() => groups.reduce((a, g) => a.concat(g.list), []), [groups]);
  const flatKey = flat.map((f) => f.id).join(',') + '|' + groups.map((g) => g.name).join(',');
  const selIdx = Math.min(sel, Math.max(0, flat.length - 1));
  const selItem = flat[selIdx];
  selRef.current = selIdx;

  React.useLayoutEffect(() => {
    const c = caretRef.current; const m = mirrorRef.current;
    if (c && m) c.style.left = m.offsetWidth + 'px';
  });

  const scaleK = () => { const el = rootRef.current; if (!el) return 1; const r = el.getBoundingClientRect(); return r.width / (el.offsetWidth || r.width) || 1; };

  // capture where every row is on screen right now (FLIP "first")
  const snap = (nextQ) => {
    const content = contentRef.current; const sc = scrollRef.current;
    if (!content || !sc || reduced) return;
    const k = scaleK();
    const cr = content.getBoundingClientRect();
    const pos = {}; const heads = {};
    Object.keys(itemEls.current).forEach((id) => { const el = itemEls.current[id]; if (el) pos[id] = (el.getBoundingClientRect().top - cr.top) / k; });
    Object.keys(headEls.current).forEach((n) => { const el = headEls.current[n]; if (el) heads[n] = (el.getBoundingClientRect().top - cr.top) / k; });
    const next = computeResults(nextQ).reduce((a, g) => a.concat(g.list), []);
    const nextIds = new Set(next.map((n) => String(n.id)));
    const gone = flat.filter((f) => !nextIds.has(String(f.id)) && pos[f.id] !== undefined).map((f) => ({ ...f, top: pos[f.id], seq: ++ghostSeq.current }));
    snapRef.current = { pos, heads, h: sc.offsetHeight };
    if (gone.length) {
      setGhosts((G) => [...G.filter((g) => !nextIds.has(String(g.id))), ...gone].slice(-14));
      const seqs = gone.map((g) => g.seq);
      setTimeout(() => setGhosts((G) => G.filter((g) => !seqs.includes(g.seq))), Math.round(MD * 0.7) + 40);
    } else setGhosts((G) => G.filter((g) => !nextIds.has(String(g.id))));
  };

  const changeQuery = (q) => {
    snap(q);
    setQuery(q);
    setSel(0);
    setCaretAt(q.length);
    setTyping(true);
  };

  React.useEffect(() => { if (!typing) return undefined; const t = setTimeout(() => setTyping(false), 520); return () => clearTimeout(t); }, [typing, query]);

  React.useLayoutEffect(() => {
    const s = snapRef.current; const sc = scrollRef.current;
    if (!s || !sc) return;
    snapRef.current = null;
    const ease = 'cubic-bezier(0.22, 1, 0.36, 1)';
    const newH = sc.offsetHeight;
    if (Math.abs(newH - s.h) > 1) sc.animate([{ height: s.h + 'px' }, { height: newH + 'px' }], { duration: MD + 80, easing: 'cubic-bezier(0.65, 0, 0.35, 1)' });
    let enter = 0;
    const move = (el, from) => {
      el.getAnimations().forEach((a) => a.cancel());
      if (from === undefined) {
        el.animate([{ opacity: 0, transform: 'translateY(8px) scale(0.985)', filter: 'blur(3px)' }, { opacity: 1, transform: 'none', filter: 'blur(0px)' }], { duration: MD + 60, delay: 60 + enter * 28, easing: ease, fill: 'backwards' });
        enter += 1;
      } else {
        const dy = from - el.offsetTop;
        if (Math.abs(dy) > 0.5) el.animate([{ transform: `translateY(${dy}px)` }, { transform: 'none' }], { duration: MD, easing: ease });
      }
    };
    groups.forEach((g) => {
      const he = headEls.current[g.name];
      if (he) move(he, s.heads[g.name]);
      g.list.forEach((it) => { const el = itemEls.current[it.id]; if (el) move(el, s.pos[it.id]); });
    });
  }, [flatKey]); // eslint-disable-line react-hooks/exhaustive-deps

  // sliding highlight + keep it in view
  React.useLayoutEffect(() => {
    const pill = pillRef.current; const sc = scrollRef.current;
    const el = selItem ? itemEls.current[selItem.id] : null;
    if (!pill) return;
    if (!el) { pill.style.opacity = '0'; return; }
    pill.style.opacity = '1';
    pill.style.transform = `translateY(${el.offsetTop}px)`;
    pill.style.height = el.offsetHeight + 'px';
    if (sc) {
      const top = el.offsetTop; const bottom = top + el.offsetHeight;
      if (top < sc.scrollTop + 8) sc.scrollTo({ top: Math.max(0, top - 36), behavior: reduced ? 'auto' : 'smooth' });
      else if (bottom > sc.scrollTop + sc.clientHeight - 8) sc.scrollTo({ top: bottom - sc.clientHeight + 12, behavior: reduced ? 'auto' : 'smooth' });
    }
  }, [selIdx, flatKey, width]); // eslint-disable-line react-hooks/exhaustive-deps

  const run = (it) => {
    if (!it) return;
    clearTimeout(ranT.current);
    setRan({ id: it.id, label: it.label, n: Date.now() });
    ranT.current = setTimeout(() => setRan(null), 1700);
  };

  const stopDemo = () => {
    const d = demoRef.current;
    if (d.stopped) return;
    d.stopped = true;
    d.timers.forEach(clearTimeout);
    d.timers = [];
  };

  // autodemo: types the query, walks the highlight down, runs a command — once
  React.useEffect(() => {
    const d = demoRef.current;
    if (!autodemo || reduced) return undefined;
    d.stopped = false;
    let t = 1150;
    const at = (ms, fn) => { d.timers.push(setTimeout(() => { if (!d.stopped) fn(); }, ms)); };
    const q = demoQuery.slice(0, 18);
    for (let i = 1; i <= q.length; i++) { t += 95 + ((i * 37) % 70); const part = q.slice(0, i); at(t, () => changeQuery(part)); }
    t += 750; at(t, () => setSel((s) => s + 1));
    t += 420; at(t, () => setSel((s) => s + 1));
    if (demoRun) { t += 650; at(t, () => { const list = computeResults(q).reduce((a, g) => a.concat(g.list), []); run(list[Math.min(selRef.current, list.length - 1)]); }); }
    return () => { d.timers.forEach(clearTimeout); d.timers = []; };
  }, [autodemo, demoQuery, demoRun, reduced]); // eslint-disable-line react-hooks/exhaustive-deps

  const focusInput = () => { const i = inputRef.current; if (i) i.focus({ preventScroll: true }); };
  const openPalette = () => { stopDemo(); setOpen(true); setTimeout(focusInput, 30); };
  const closePalette = () => { stopDemo(); setOpen(false); if (inputRef.current) inputRef.current.blur(); };

  React.useEffect(() => {
    const onKey = (e) => {
      if (!((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K'))) return;
      const el = rootRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      e.preventDefault();
      if (open) focusInput(); else openPalette();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  const onInputKey = (e) => {
    stopDemo();
    if (e.key === 'ArrowDown') { e.preventDefault(); setSel((s) => (flat.length ? (Math.min(s, flat.length - 1) + 1) % flat.length : 0)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSel((s) => (flat.length ? (Math.min(s, flat.length - 1) - 1 + flat.length) % flat.length : 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); run(selItem); }
    else if (e.key === 'Escape') { e.preventDefault(); if (query) changeQuery(''); else closePalette(); }
  };
  const syncCaret = () => { const i = inputRef.current; if (i) setCaretAt(i.selectionStart ?? i.value.length); };

  const compact = width < 700;
  const pw = Math.min(PW, width - (compact ? 24 : 64));
  const sans = '"Inter", -apple-system, "Helvetica Neue", Arial, sans-serif';
  const display = `"${fontFamily}", "Inter", -apple-system, "Helvetica Neue", Arial, sans-serif`;
  const mono = `"${monoFamily}", ui-monospace, "SFMono-Regular", Menlo, monospace`;
  const iSize = compact ? Math.round(inputSize * 0.78) : inputSize;
  const rowH = compact ? 46 : 52;
  const maxList = Math.max(200, Math.min(compact ? 380 : 430, H - 300));
  const easeOut = 'cubic-bezier(0.22, 1, 0.36, 1)';
  const keycap = { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: 22, height: 22, padding: '0 6px', boxSizing: 'border-box', borderRadius: 6, border: `1px solid ${line}`, borderBottomWidth: 2, background: '#FFFFFF', fontFamily: mono, fontSize: 11, color: text, lineHeight: 1 };
  const isKeys = (h) => /^([⌘⇧⌥⌃↵A-Z0-9]\s?){1,4}$/.test(h);
  const glyphFor = (g) => {
    const i = Math.max(0, [...new Set(items.map((x) => x.group))].indexOf(g));
    const paths = ['M3 8h9M8.5 4.5 12 8l-3.5 3.5', 'M3.5 3.5h9v9h-9z', 'M5 3.5a1.5 1.5 0 1 0 0 3h6a1.5 1.5 0 1 0 0-3v9a1.5 1.5 0 1 0 0-3H5a1.5 1.5 0 1 0 0 3v-9', 'M8 3v10M3 8h10'];
    return paths[i % paths.length];
  };
  const btnReset = { appearance: 'none', border: 'none', background: 'transparent', padding: 0, margin: 0, font: 'inherit', color: 'inherit', textAlign: 'left', cursor: 'pointer' };

  const renderLabel = (it, on) => {
    const set = new Set(it.idx);
    return Array.from(it.label).map((ch, i) => (
      <span key={i} style={set.has(i) ? { color: on ? 'inherit' : accent, fontWeight: 500, boxShadow: on ? `inset 0 -1.5px 0 ${accent}` : 'none' } : undefined}>{ch}</span>
    ));
  };

  const pageScale = open ? 1.03 : 1;

  return (
    <section
      ref={rootRef}
      className={`command-palette ${uid}`}
      aria-label="Command palette"
      onPointerDown={stopDemo}
      style={{ position: 'relative', width: '100%', height: compact ? Math.max(640, H - 80) : H, background: pageColor, color: text, fontFamily: sans, overflow: 'hidden', boxSizing: 'border-box' }}
    >
      <style>{`
        .${uid} button:focus-visible { outline: 1.5px solid ${accent}; outline-offset: 2px; }
        .${uid} input::placeholder { color: ${muted}; opacity: 1; }
        .${uid} .${uid}-scroll::-webkit-scrollbar { width: 0; }
        @keyframes ${uid}-blink { 0%, 45% { opacity: 1; } 55%, 100% { opacity: 0; } }
        @keyframes ${uid}-ghost { from { opacity: 1; transform: none; } to { opacity: 0; transform: translateY(-4px) scale(0.98); filter: blur(2px); } }
        @keyframes ${uid}-bump { 0% { transform: scale(1); } 35% { transform: scale(0.985); } 100% { transform: scale(1); } }
        @keyframes ${uid}-sweep { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes ${uid}-check { from { stroke-dashoffset: 14; } to { stroke-dashoffset: 0; } }
        @keyframes ${uid}-up { from { transform: translateY(100%); opacity: 0; } to { transform: none; opacity: 1; } }
        @media (prefers-reduced-motion: reduce) { .${uid} * { animation: none !important; transition: none !important; } }
      `}</style>

      {/* the page underneath */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, padding: compact ? '20px 16px' : '28px 48px', boxSizing: 'border-box', transform: `scale(${pageScale})`, filter: open ? `blur(${blurPx}px)` : 'blur(0px)', transition: reduced ? 'none' : `filter 700ms ${easeOut}, transform 900ms ${easeOut}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 14 }}>
          <span style={{ fontFamily: display, fontSize: 18, letterSpacing: '-0.03em', fontWeight: 500 }}>{pageBrand}</span>
          {!compact && <span style={{ display: 'flex', gap: 28, fontFamily: mono, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#5D5A54' }}><span>Work</span><span>Studio</span><span>Journal</span><span>Contact</span></span>}
        </div>
        <h2 style={{ margin: compact ? '56px 0 0' : '72px 0 0', maxWidth: compact ? '100%' : '78%', fontFamily: display, fontWeight: 400, fontSize: compact ? 44 : Math.min(112, width * 0.085), lineHeight: 0.94, letterSpacing: '-0.05em' }}>{pageHeadline}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: compact ? '1fr' : '1.3fr 1fr', gap: 16, marginTop: compact ? 36 : 56 }}>
          <img src={pageImage1} alt="" style={{ width: '100%', height: compact ? 220 : 340, objectFit: 'cover', display: 'block', borderRadius: 2 }} />
          {!compact && <img src={pageImage2} alt="" style={{ width: '100%', height: 340, objectFit: 'cover', display: 'block', borderRadius: 2 }} />}
        </div>
      </div>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'rgba(24, 22, 20, 0.22)', opacity: open ? 1 : 0, transition: reduced ? 'none' : `opacity 600ms ${easeOut}`, pointerEvents: 'none' }} />

      {/* the palette */}
      <div
        role="dialog"
        aria-label="Command palette"
        aria-hidden={!open}
        style={{
          position: 'absolute', left: '50%', top: compact ? 28 : Math.round(H * 0.11), width: pw, marginLeft: -pw / 2,
          background: panel, borderRadius: 16, boxShadow: '0 1px 0 rgba(255,255,255,0.7) inset, 0 0 0 1px rgba(11,11,12,0.07), 0 50px 100px -30px rgba(11,11,12,0.45), 0 18px 36px -18px rgba(11,11,12,0.25)',
          overflow: 'hidden', transformOrigin: '50% 0%',
          opacity: open && shown ? 1 : 0,
          transform: open && shown ? 'none' : 'translateY(-10px) scale(0.965)',
          filter: open && shown ? 'blur(0px)' : 'blur(4px)',
          transition: reduced ? 'none' : `opacity 380ms ${easeOut}, transform 600ms cubic-bezier(0.34, 1.3, 0.64, 1), filter 400ms ${easeOut}`,
          pointerEvents: open ? 'auto' : 'none'
        }}
      >
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 14, height: compact ? 64 : 80, padding: compact ? '0 16px' : '0 22px', borderBottom: `1px solid ${line}` }}>
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" style={{ flexShrink: 0, color: muted }}><circle cx="8.5" cy="8.5" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M13 13l4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          <div style={{ position: 'relative', flex: 1, minWidth: 0, height: '100%' }}>
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => { stopDemo(); changeQuery(e.target.value); setCaretAt(e.target.selectionStart ?? e.target.value.length); }}
              onKeyDown={onInputKey}
              onKeyUp={syncCaret}
              onSelect={syncCaret}
              onFocus={stopDemo}
              placeholder={placeholder}
              aria-label={placeholder}
              aria-controls={`${uid}-list`}
              aria-activedescendant={selItem ? `${uid}-i${selItem.id}` : undefined}
              role="combobox"
              aria-expanded={open}
              spellCheck={false}
              autoComplete="off"
              style={{ position: 'absolute', inset: 0, width: '100%', border: 'none', outline: 'none', background: 'transparent', padding: 0, fontFamily: display, fontSize: iSize, fontWeight: 400, letterSpacing: '-0.025em', color: text, caretColor: 'transparent' }}
            />
            <span ref={mirrorRef} aria-hidden="true" style={{ position: 'absolute', left: 0, top: 0, visibility: 'hidden', whiteSpace: 'pre', fontFamily: display, fontSize: iSize, fontWeight: 400, letterSpacing: '-0.025em' }}>{query.slice(0, caretAt)}</span>
            {open && (
              <span ref={caretRef} aria-hidden="true" style={{ position: 'absolute', top: '50%', left: 0, width: 2, height: Math.round(iSize * 1.15), marginTop: -Math.round(iSize * 0.6), borderRadius: 1, background: accent, transition: reduced ? 'none' : 'left 80ms ease-out', animation: typing || reduced ? 'none' : `${uid}-blink 1.05s steps(1) infinite` }} />
            )}
          </div>
          <span aria-hidden="true" style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
            <span style={keycap}>⌘</span><span style={keycap}>K</span>
          </span>
        </div>

        <div ref={scrollRef} className={`${uid}-scroll`} id={`${uid}-list`} role="listbox" aria-label="Results" style={{ position: 'relative', maxHeight: maxList, overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none' }}>
          <div ref={contentRef} style={{ position: 'relative', padding: '8px 8px 10px' }}>
            <span ref={pillRef} aria-hidden="true" style={{ position: 'absolute', left: 8, right: 8, top: 0, height: rowH, opacity: 0, transition: reduced ? 'none' : `transform 300ms ${easeOut}, height 300ms ${easeOut}, opacity 200ms` }}>
              <span key={ran ? 'b' + ran.n : 'idle'} style={{ position: 'absolute', inset: 0, borderRadius: 10, overflow: 'hidden', background: ran && selItem && ran.id === selItem.id ? text : hl, transition: 'background-color 260ms', animation: ran && !reduced ? `${uid}-bump 420ms ${easeOut}` : 'none' }}>
                {ran && <span style={{ position: 'absolute', inset: 0, background: accent, opacity: 0.22, transformOrigin: 'left', animation: `${uid}-sweep 560ms ${easeOut} both` }} />}
                <span style={{ position: 'absolute', left: 0, top: 13, bottom: 13, width: 2, borderRadius: 2, background: accent }} />
              </span>
            </span>
            {groups.map((g) => (
              <div key={g.name} role="group" aria-label={g.name}>
                <div ref={(el) => { if (el) headEls.current[g.name] = el; else delete headEls.current[g.name]; }} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 14px 6px', fontFamily: mono, fontSize: 10.5, letterSpacing: '0.08em', textTransform: 'uppercase', color: muted }}>
                  <span>{g.name}</span><span>{String(g.list.length).padStart(2, '0')}</span>
                </div>
                {g.list.map((it) => {
                  const on = selItem && selItem.id === it.id;
                  const done = ran && ran.id === it.id && on;
                  return (
                    <div
                      key={it.id}
                      id={`${uid}-i${it.id}`}
                      role="option"
                      aria-selected={!!on}
                      ref={(el) => { if (el) itemEls.current[it.id] = el; else delete itemEls.current[it.id]; }}
                      onPointerMove={() => { const k = flat.findIndex((f) => f.id === it.id); if (k !== selIdx) { stopDemo(); setSel(k); } }}
                      onClick={() => { stopDemo(); const k = flat.findIndex((f) => f.id === it.id); setSel(k); run(it); }}
                      style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 12, height: rowH, padding: '0 14px', cursor: 'pointer', color: done ? panel : text, transition: 'color 260ms' }}
                    >
                      <span aria-hidden="true" style={{ display: 'grid', placeItems: 'center', width: 28, height: 28, flexShrink: 0, borderRadius: 8, border: `1px solid ${done ? 'rgba(255,255,255,0.18)' : line}`, background: done ? 'transparent' : panel, color: done ? panel : on ? text : muted, transition: 'color 260ms, border-color 260ms, background-color 260ms' }}>
                        {done ? (
                          <svg width="16" height="16" viewBox="0 0 16 16"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke={accent} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="14" style={{ animation: `${uid}-check 420ms ${easeOut} 120ms both` }} /></svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 16 16"><path d={glyphFor(it.group)} fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        )}
                      </span>
                      <span style={{ flex: 1, minWidth: 0, fontFamily: display, fontSize: compact ? 15 : 17, letterSpacing: '-0.015em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: done ? panel : on ? text : '#45423D' }}>{renderLabel(it, done)}</span>
                      <span style={{ position: 'relative', flexShrink: 0, overflow: 'hidden', height: 22, display: 'flex', alignItems: 'center' }}>
                        {done ? (
                          <span key={'d' + ran.n} style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: panel, animation: `${uid}-up 360ms ${easeOut} both` }}>{doneLabel} ↵</span>
                        ) : it.hint && isKeys(it.hint) ? (
                          <span style={{ display: 'flex', gap: 4 }}>{it.hint.split(/\s+/).map((k, n) => <span key={n} style={{ ...keycap, background: on ? '#FFFFFF' : panel }}>{k}</span>)}</span>
                        ) : (
                          <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.04em', color: muted, display: compact ? 'none' : 'block' }}>{it.hint}</span>
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}
            {ghosts.map((g) => (
              <div key={'g' + g.seq} aria-hidden="true" style={{ position: 'absolute', left: 8, right: 8, top: g.top, height: rowH, display: 'flex', alignItems: 'center', gap: 12, padding: '0 14px', pointerEvents: 'none', animation: `${uid}-ghost ${Math.round(MD * 0.7)}ms ${easeOut} both`, fontFamily: display, fontSize: compact ? 15 : 16, letterSpacing: '-0.015em', color: '#45423D' }}>
                <span style={{ width: 28, height: 28, borderRadius: 8, border: `1px solid ${line}`, flexShrink: 0 }} />
                <span>{g.label}</span>
              </div>
            ))}
            {!flat.length && (
              <div style={{ padding: '34px 14px 30px', textAlign: 'center', fontFamily: mono, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: muted }}>
                {emptyText} — <span style={{ color: text }}>“{query}”</span>
              </div>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, height: 44, padding: compact ? '0 14px' : '0 22px', borderTop: `1px solid ${line}`, background: '#F6F5F2', fontFamily: mono, fontSize: 10.5, letterSpacing: '0.06em', textTransform: 'uppercase', color: muted }}>
          <span style={{ position: 'relative', overflow: 'hidden', height: 16, flex: 1, minWidth: 0 }}>
            {ran ? (
              <span key={'r' + ran.n} style={{ display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: text, animation: `${uid}-up 380ms ${easeOut} both` }}><span style={{ color: accent }}>●</span> Ran “{ran.label}”</span>
            ) : (
              <span key="idle" style={{ display: 'flex', gap: compact ? 10 : 16, alignItems: 'center', whiteSpace: 'nowrap', animation: reduced ? 'none' : `${uid}-up 380ms ${easeOut} both` }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ ...keycap, height: 18, minWidth: 18, fontSize: 10 }}>↑</span><span style={{ ...keycap, height: 18, minWidth: 18, fontSize: 10 }}>↓</span>Move</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ ...keycap, height: 18, minWidth: 18, fontSize: 10 }}>↵</span>Run</span>
                {!compact && <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ ...keycap, height: 18, fontSize: 10 }}>esc</span>Close</span>}
              </span>
            )}
          </span>
          <span style={{ flexShrink: 0, fontVariantNumeric: 'tabular-nums' }}>{String(flat.length).padStart(2, '0')} results</span>
        </div>
      </div>

      {/* reopen chip */}
      <button
        onClick={openPalette}
        aria-label="Open command palette"
        tabIndex={open ? -1 : 0}
        style={{ ...btnReset, position: 'absolute', left: '50%', bottom: 40, display: 'flex', alignItems: 'center', gap: 12, height: 48, padding: '0 10px 0 20px', borderRadius: 999, background: text, color: panel, fontFamily: display, fontSize: 15, letterSpacing: '-0.01em', boxShadow: '0 20px 40px -16px rgba(11,11,12,0.5)', transform: `translateX(-50%) translateY(${open ? 24 : 0}px)`, opacity: open ? 0 : 1, pointerEvents: open ? 'none' : 'auto', transition: reduced ? 'none' : `transform 520ms cubic-bezier(0.34, 1.3, 0.64, 1), opacity 300ms` }}
      >
        <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true"><circle cx="8.5" cy="8.5" r="6" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="M13 13l4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
        {openHint}
        <span style={{ display: 'flex', gap: 4 }}><span style={{ ...keycap, background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)', color: panel }}>⌘</span><span style={{ ...keycap, background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)', color: panel }}>K</span></span>
      </button>
    </section>
  );
}

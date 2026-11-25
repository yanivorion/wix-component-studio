const MANIFEST = {
  "type": "Type.GlossaryIndex",
  "description": "An A–Z glossary set in grotesk and mono. An alphabet rail shows which letters have entries; clicking or hovering one glides the term list with an eased scroll while a giant background letter rolls to the new letter. Terms open in place with a line-by-line rise, and a live search filters everything as you type",
  "editorElement": {
    "selector": ".glossary-index",
    "displayName": "Glossary Index",
    "archetype": "container",
    "data": {
      "title": { "dataType": "text", "displayName": "Title", "defaultValue": "Glossary", "group": "Content" },
      "subtitle": { "dataType": "text", "displayName": "Subtitle", "defaultValue": "A working vocabulary of type", "group": "Content" },
      "searchPlaceholder": { "dataType": "text", "displayName": "Search Placeholder", "defaultValue": "Search terms", "group": "Content" },
      "emptyText": { "dataType": "text", "displayName": "No Results Text", "defaultValue": "No terms match", "group": "Content" },
      "terms": { "dataType": "text", "displayName": "Terms (Term; Category; Definition — separated by |)", "defaultValue": "Aperture; anatomy; The partly enclosed opening of a letter such as c, e or s. Wider apertures stay legible at small sizes.|Ascender; anatomy; The stroke of a lowercase letter that rises above the x-height, as in b, d, h and k.|Axis; anatomy; The imaginary line through the thinnest parts of a curved stroke, revealing the angle of the pen behind it.|Baseline; metrics; The invisible line letters sit on. Descenders fall below it, and round letters dip just past it so they look aligned.|Bowl; anatomy; The fully enclosed, rounded part of a letter, like the loops of b, d, p and q.|Cap height; metrics; The height of a flat capital such as H, measured from the baseline.|Counter; anatomy; The enclosed or partly enclosed space inside a letter. Generous counters keep type open and readable.|Descender; anatomy; The part of a letter that extends below the baseline, as in g, j, p, q and y.|Em; measure; A unit equal to the current point size, so spacing set in ems scales with the type.|Glyph; system; A single drawn form in a font: a letter, a figure, a ligature or an alternate.|Grotesk; classification; A family of plain nineteenth-century sans serifs, slightly irregular, and the ancestors of the neo-grotesks we use today.|Hairline; anatomy; The thinnest stroke in a typeface, most visible in high-contrast designs.|Hinting; system; Instructions inside a font that help its outlines snap cleanly to the pixel grid at small sizes.|Kerning; spacing; Adjusting the space between a specific pair of letters, such as AV or To, so the rhythm of a word looks even.|Leading; spacing; The distance from one baseline to the next, named after the strips of lead once set between lines of metal type.|Ligature; system; Two or more letters joined into one glyph, such as fi or fl, to avoid awkward collisions.|Measure; layout; The length of a line of text. Around sixty to seventy-five characters is comfortable for long reading.|Monospace; classification; A typeface in which every glyph takes the same width, ideal for code, tables and data.|Orphan; layout; A single word or very short line stranded at the end of a paragraph.|Overshoot; metrics; The slight extension of round letters past the baseline and x-height so they appear as tall as flat ones.|Pica; measure; A unit of twelve points, about a sixth of an inch, still used to size columns and margins.|Point; measure; The smallest typographic unit: one seventy-second of an inch in the digital standard.|Rag; layout; The uneven edge of text set flush left or right. A good rag has a gentle, irregular rhythm rather than shapes.|Sans serif; classification; Type without the small finishing strokes at the ends of letters.|Stem; anatomy; The main vertical stroke of a letter, the backbone of forms like l, h and n.|Tabular figures; system; Numerals drawn on equal widths so columns of numbers line up exactly.|Tracking; spacing; Uniform spacing applied across a whole word or line. Large type usually wants it tighter, small caps looser.|Uppercase; system; Capital letters, named after the upper case of the compositor's type cabinet.|Variable font; system; One font file holding a continuous range of styles along axes such as weight and width.|Weight; system; The thickness of a typeface's strokes, from hairline through regular to black.|Widow; layout; The last line of a paragraph left alone at the top of the next column or page.|X-height; metrics; The height of lowercase letters without ascenders, like x. It decides how large type feels.", "group": "Content" },
      "openTerm": { "dataType": "text", "displayName": "Term Open At Rest", "defaultValue": "Baseline", "group": "Behaviour" },
      "singleOpen": { "dataType": "booleanValue", "displayName": "One Term Open At A Time", "defaultValue": "true", "group": "Behaviour" },
      "showCategories": { "dataType": "booleanValue", "displayName": "Show Categories", "defaultValue": "true", "group": "Layout" },
      "showCodes": { "dataType": "booleanValue", "displayName": "Show Entry Codes", "defaultValue": "true", "group": "Layout" },
      "hoverRail": { "dataType": "booleanValue", "displayName": "Jump On Rail Hover", "defaultValue": "true", "group": "Behaviour" },
      "scrollDuration": { "dataType": "select", "displayName": "Scroll Duration (ms)", "defaultValue": "900", "options": ["600", "900", "1200"], "group": "Animation" },
      "letterMotion": { "dataType": "select", "displayName": "Giant Letter Motion", "defaultValue": "roll", "options": ["roll", "crossfade"], "group": "Animation" },
      "height": { "dataType": "select", "displayName": "Height (px)", "defaultValue": "800", "options": ["680", "760", "800", "900"], "group": "Layout" },
      "giantOpacity": { "dataType": "select", "displayName": "Giant Letter Strength", "defaultValue": "solid", "options": ["solid", "soft", "outline"], "group": "Layout" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#F3F2EF", "group": "Colors" },
      "textColor": { "dataType": "color", "displayName": "Text", "defaultValue": "#0B0B0C", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#8E8A82", "group": "Colors" },
      "lineColor": { "dataType": "color", "displayName": "Rules", "defaultValue": "#D9D6CF", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent", "defaultValue": "#D9480F", "group": "Colors" },
      "fontFamily": { "dataType": "select", "displayName": "Grotesk", "defaultValue": "Inter Tight", "options": ["Inter Tight", "Geist", "Hanken Grotesk", "Manrope"], "group": "Typography" },
      "monoFamily": { "dataType": "select", "displayName": "Mono", "defaultValue": "JetBrains Mono", "options": ["JetBrains Mono", "Geist Mono", "IBM Plex Mono"], "group": "Typography" },
      "termSize": { "dataType": "select", "displayName": "Term Size (px)", "defaultValue": "30", "options": ["24", "30", "36"], "group": "Typography" },
      "giantWeight": { "dataType": "select", "displayName": "Giant Letter Weight", "defaultValue": "300", "options": ["300", "400", "500"], "group": "Typography" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const title = config?.title ?? 'Glossary';
  const subtitle = config?.subtitle ?? 'A working vocabulary of type';
  const searchPlaceholder = config?.searchPlaceholder || 'Search terms';
  const emptyText = config?.emptyText || 'No terms match';
  const termsSrc = config?.terms || "Aperture; anatomy; The partly enclosed opening of a letter such as c, e or s. Wider apertures stay legible at small sizes.|Ascender; anatomy; The stroke of a lowercase letter that rises above the x-height, as in b, d, h and k.|Axis; anatomy; The imaginary line through the thinnest parts of a curved stroke, revealing the angle of the pen behind it.|Baseline; metrics; The invisible line letters sit on. Descenders fall below it, and round letters dip just past it so they look aligned.|Bowl; anatomy; The fully enclosed, rounded part of a letter, like the loops of b, d, p and q.|Cap height; metrics; The height of a flat capital such as H, measured from the baseline.|Counter; anatomy; The enclosed or partly enclosed space inside a letter. Generous counters keep type open and readable.|Descender; anatomy; The part of a letter that extends below the baseline, as in g, j, p, q and y.|Em; measure; A unit equal to the current point size, so spacing set in ems scales with the type.|Glyph; system; A single drawn form in a font: a letter, a figure, a ligature or an alternate.|Grotesk; classification; A family of plain nineteenth-century sans serifs, slightly irregular, and the ancestors of the neo-grotesks we use today.|Hairline; anatomy; The thinnest stroke in a typeface, most visible in high-contrast designs.|Hinting; system; Instructions inside a font that help its outlines snap cleanly to the pixel grid at small sizes.|Kerning; spacing; Adjusting the space between a specific pair of letters, such as AV or To, so the rhythm of a word looks even.|Leading; spacing; The distance from one baseline to the next, named after the strips of lead once set between lines of metal type.|Ligature; system; Two or more letters joined into one glyph, such as fi or fl, to avoid awkward collisions.|Measure; layout; The length of a line of text. Around sixty to seventy-five characters is comfortable for long reading.|Monospace; classification; A typeface in which every glyph takes the same width, ideal for code, tables and data.|Orphan; layout; A single word or very short line stranded at the end of a paragraph.|Overshoot; metrics; The slight extension of round letters past the baseline and x-height so they appear as tall as flat ones.|Pica; measure; A unit of twelve points, about a sixth of an inch, still used to size columns and margins.|Point; measure; The smallest typographic unit: one seventy-second of an inch in the digital standard.|Rag; layout; The uneven edge of text set flush left or right. A good rag has a gentle, irregular rhythm rather than shapes.|Sans serif; classification; Type without the small finishing strokes at the ends of letters.|Stem; anatomy; The main vertical stroke of a letter, the backbone of forms like l, h and n.|Tabular figures; system; Numerals drawn on equal widths so columns of numbers line up exactly.|Tracking; spacing; Uniform spacing applied across a whole word or line. Large type usually wants it tighter, small caps looser.|Uppercase; system; Capital letters, named after the upper case of the compositor's type cabinet.|Variable font; system; One font file holding a continuous range of styles along axes such as weight and width.|Weight; system; The thickness of a typeface's strokes, from hairline through regular to black.|Widow; layout; The last line of a paragraph left alone at the top of the next column or page.|X-height; metrics; The height of lowercase letters without ascenders, like x. It decides how large type feels.";
  const openTerm = config?.openTerm ?? 'Baseline';
  const singleOpen = bool(config?.singleOpen, true);
  const hoverRail = bool(config?.hoverRail, true);
  const showCategories = bool(config?.showCategories, true);
  const showCodes = bool(config?.showCodes, true);
  const SD = parseInt(config?.scrollDuration || '900', 10) || 900;
  const letterMotion = config?.letterMotion || 'roll';
  const H = parseInt(config?.height || '800', 10) || 800;
  const giantMode = config?.giantOpacity || 'solid';
  const bg = config?.backgroundColor || '#F3F2EF';
  const text = config?.textColor || '#0B0B0C';
  const muted = config?.mutedColor || '#8E8A82';
  const line = config?.lineColor || '#D9D6CF';
  const accent = config?.accentColor || '#D9480F';
  const fontFamily = config?.fontFamily || 'Inter Tight';
  const monoFamily = config?.monoFamily || 'JetBrains Mono';
  const termSize = parseInt(config?.termSize || '30', 10) || 30;
  const giantWeight = config?.giantWeight || '300';

  const terms = React.useMemo(() => termsSrc.split('|').map((r) => r.trim()).filter(Boolean).map((r, i) => {
    const f = r.split(';').map((x) => x.trim());
    const term = f[0] || '';
    return { id: i, term, cat: f[1] || '', def: f.slice(2).join('; '), letter: (term.match(/[a-z]/i) || ['#'])[0].toUpperCase() };
  }).sort((a, b) => a.term.localeCompare(b.term)), [termsSrc]);

  const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const uid = React.useMemo(() => 'gl' + Math.random().toString(36).slice(2, 9), []);
  const reduced = React.useMemo(() => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const rootRef = React.useRef(null);
  const listRef = React.useRef(null);
  const sectionRefs = React.useRef({});
  const defRefs = React.useRef({});
  const anim = React.useRef({ raf: 0, active: false });
  const hoverT = React.useRef(0);
  const prevLetter = React.useRef(null);

  const [width, setWidth] = React.useState(1280);
  const [query, setQuery] = React.useState('');
  const [openIds, setOpenIds] = React.useState(() => {
    const t = terms.find((x) => x.term.toLowerCase() === String(openTerm).toLowerCase());
    return t ? [t.id] : [];
  });
  const [letter, setLetter] = React.useState(terms[0] ? terms[0].letter : 'A');
  const [roll, setRoll] = React.useState({ n: 0, prev: null, dir: 1 });

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
    return () => { if (ro) ro.disconnect(); cancelAnimationFrame(anim.current.raf); clearTimeout(hoverT.current); };
  }, []);

  const q = query.trim().toLowerCase();
  const filtered = React.useMemo(() => terms.filter((t) => !q || t.term.toLowerCase().includes(q) || t.def.toLowerCase().includes(q) || t.cat.toLowerCase().includes(q)), [terms, q]);
  const byLetter = React.useMemo(() => {
    const m = {};
    filtered.forEach((t) => { (m[t.letter] = m[t.letter] || []).push(t); });
    return m;
  }, [filtered]);
  const letters = Object.keys(byLetter).sort();
  const shownLetter = byLetter[letter] ? letter : (letters[0] || letter);

  // giant letter roll bookkeeping
  React.useEffect(() => {
    const p = prevLetter.current;
    prevLetter.current = shownLetter;
    if (p === null || p === shownLetter) return;
    setRoll((r) => ({ n: r.n + 1, prev: p, dir: shownLetter > p ? 1 : -1 }));
  }, [shownLetter]);

  const easeIO = (t) => (t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2);
  const glideTo = (L) => {
    const list = listRef.current; const sec = sectionRefs.current[L];
    if (!list || !sec) return;
    setLetter(L);
    const target = Math.min(sec.offsetTop, list.scrollHeight - list.clientHeight);
    const start = list.scrollTop;
    const d = target - start;
    cancelAnimationFrame(anim.current.raf);
    if (reduced || Math.abs(d) < 2) { list.scrollTop = target; return; }
    const dur = Math.max(450, Math.min(SD, 300 + Math.abs(d) * 0.5));
    const t0 = performance.now();
    anim.current.active = true;
    const step = (now) => {
      const t = Math.min(1, (now - t0) / dur);
      list.scrollTop = start + d * easeIO(t);
      if (t < 1 && anim.current.active) anim.current.raf = requestAnimationFrame(step);
      else anim.current.active = false;
    };
    anim.current.raf = requestAnimationFrame(step);
  };
  const cancelGlide = () => { if (anim.current.active) { anim.current.active = false; cancelAnimationFrame(anim.current.raf); } };

  const onListScroll = () => {
    if (anim.current.active) return;
    const list = listRef.current;
    if (!list) return;
    const y = list.scrollTop + 24;
    let cur = letters[0];
    letters.forEach((L) => { const s = sectionRefs.current[L]; if (s && s.offsetTop <= y) cur = L; });
    if (list.scrollTop + list.clientHeight >= list.scrollHeight - 2) cur = letters[letters.length - 1];
    if (cur && cur !== letter) setLetter(cur);
  };

  const toggle = (id) => {
    setOpenIds((o) => (o.includes(id) ? o.filter((x) => x !== id) : singleOpen ? [id] : [...o, id]));
  };

  // line-rise: group definition words by rendered line and stagger by line
  React.useLayoutEffect(() => {
    Object.keys(defRefs.current).forEach((id) => {
      const p = defRefs.current[id];
      if (!p) return;
      const open = openIds.includes(Number(id));
      const words = Array.from(p.children);
      let lineIdx = -1; let lastTop = null;
      words.forEach((w) => {
        const inner = w.firstChild;
        if (!inner) return;
        if (w.offsetTop !== lastTop) { lineIdx += 1; lastTop = w.offsetTop; }
        inner.style.transition = reduced ? 'none' : open
          ? `transform 760ms cubic-bezier(0.22, 1, 0.36, 1) ${140 + lineIdx * 75}ms, opacity 500ms ease ${140 + lineIdx * 75}ms`
          : 'transform 260ms cubic-bezier(0.65, 0, 0.35, 1), opacity 200ms ease';
        inner.style.transform = open ? 'translateY(0%)' : 'translateY(115%)';
        inner.style.opacity = open ? '1' : '0';
      });
    });
  }, [openIds, width, filtered.length, reduced]);

  const compact = width < 760;
  const pad = compact ? 16 : Math.round(Math.max(28, Math.min(56, width * 0.04)));
  const sans = '"Inter", -apple-system, "Helvetica Neue", Arial, sans-serif';
  const display = `"${fontFamily}", "Inter", -apple-system, "Helvetica Neue", Arial, sans-serif`;
  const mono = `"${monoFamily}", ui-monospace, "SFMono-Regular", Menlo, monospace`;
  const micro = { fontFamily: mono, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 400 };
  const easeOut = 'cubic-bezier(0.22, 1, 0.36, 1)';
  const btnReset = { appearance: 'none', border: 'none', background: 'transparent', padding: 0, margin: 0, font: 'inherit', color: 'inherit', textAlign: 'left', cursor: 'pointer' };
  const leftW = compact ? width - pad * 2 : Math.round((width - pad * 2) * 0.4);
  const railW = compact ? 0 : 28;
  const innerH = compact ? null : H - pad * 1.6;
  const listH = compact ? 460 : innerH - 120;
  const giantSize = compact ? 220 : Math.round(Math.min(leftW * 1.2, innerH * 0.72));
  const tSize = compact ? Math.round(termSize * 0.78) : termSize;
  const pad2 = (n) => String(n).padStart(2, '0');

  const giantStyle = giantMode === 'outline'
    ? { color: 'transparent', WebkitTextStroke: `1.5px ${text}` }
    : { color: text, opacity: giantMode === 'soft' ? 0.12 : 1 };
  const rollKind = letterMotion === 'crossfade' ? 'fade' : 'roll';
  const rollAnim = (kind) => (reduced || roll.n === 0 ? 'none' : `${uid}-${rollKind}${kind}${roll.dir > 0 ? 'u' : 'd'} ${rollKind === 'fade' ? 700 : 820}ms cubic-bezier(0.76, 0, 0.24, 1) both`);

  const highlight = (s) => {
    if (!q) return s;
    const i = s.toLowerCase().indexOf(q);
    if (i < 0) return s;
    return (<>{s.slice(0, i)}<span style={{ boxShadow: `inset 0 -0.12em 0 ${accent}` }}>{s.slice(i, i + q.length)}</span>{s.slice(i + q.length)}</>);
  };

  const giant = (
    <div aria-hidden="true" style={{ position: 'relative', height: Math.round(giantSize * 0.8), overflow: 'hidden', fontFamily: display, fontWeight: giantWeight, fontSize: giantSize, lineHeight: 0.8, letterSpacing: '-0.06em' }}>
      {roll.prev && roll.n > 0 && !reduced && (
        <span key={'o' + roll.n} style={{ position: 'absolute', left: '-0.04em', bottom: '-0.02em', display: 'block', ...giantStyle, animation: rollAnim('out') }}>{roll.prev}</span>
      )}
      <span key={'i' + roll.n} style={{ position: 'absolute', left: '-0.04em', bottom: '-0.02em', display: 'block', ...giantStyle, animation: roll.n === 0 && !reduced ? `${uid}-intro 1100ms ${easeOut} 100ms both` : rollAnim('in') }}>{shownLetter}</span>
    </div>
  );

  const rail = (
    <nav aria-label="Alphabet" style={compact
      ? { display: 'flex', gap: 2, overflowX: 'auto', scrollbarWidth: 'none', margin: '0 -4px 10px', padding: '0 4px' }
      : { position: 'relative', width: railW, flexShrink: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: listH, paddingLeft: 4 }}
    >
      {ALPHA.map((L) => {
        const has = !!byLetter[L];
        const on = L === shownLetter && has;
        return (
          <button
            key={L}
            disabled={!has}
            aria-label={has ? `Jump to ${L}` : `${L}, no terms`}
            aria-current={on ? 'true' : undefined}
            onClick={() => has && glideTo(L)}
            onPointerEnter={(e) => { if (!hoverRail || !has || e.pointerType !== 'mouse') return; clearTimeout(hoverT.current); hoverT.current = setTimeout(() => glideTo(L), 110); }}
            onPointerLeave={() => clearTimeout(hoverT.current)}
            style={{ ...btnReset, position: 'relative', flexShrink: 0, display: 'grid', placeItems: 'center', width: compact ? 30 : railW, height: compact ? 34 : Math.max(16, Math.floor(listH / 26)), fontFamily: mono, fontSize: compact ? 12 : 11, fontWeight: has ? 500 : 400, color: on ? accent : has ? text : muted, opacity: has ? 1 : 0.38, cursor: has ? 'pointer' : 'default', transition: 'color 250ms, opacity 300ms' }}
          >
            {on && <span aria-hidden="true" style={{ position: 'absolute', left: compact ? '50%' : -4, top: compact ? 'auto' : '50%', bottom: compact ? 2 : 'auto', width: compact ? 14 : 6, height: compact ? 1.5 : 1.5, marginLeft: compact ? -7 : 0, background: accent, transform: compact ? 'none' : 'translateY(-50%)' }} />}
            {L}
          </button>
        );
      })}
    </nav>
  );

  const list = (
    <div
      ref={listRef}
      onScroll={onListScroll}
      onWheel={cancelGlide}
      onTouchStart={cancelGlide}
      className={`${uid}-list`}
      tabIndex={-1}
      style={{ position: 'relative', flex: 1, minWidth: 0, height: listH, overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none', outline: 'none', WebkitMaskImage: 'linear-gradient(180deg, #000 0, #000 calc(100% - 48px), transparent 100%)', maskImage: 'linear-gradient(180deg, #000 0, #000 calc(100% - 48px), transparent 100%)' }}
    >
      {letters.map((L) => (
        <div key={L} ref={(el) => { if (el) sectionRefs.current[L] = el; else delete sectionRefs.current[L]; }} role="group" aria-label={`Letter ${L}`} style={{ paddingTop: 4 }}>
          <div style={{ ...micro, display: 'flex', alignItems: 'center', gap: 12, padding: '14px 0 10px', color: muted, position: 'sticky', top: 0, background: bg, zIndex: 2 }}>
            <span style={{ color: text, fontWeight: 500 }}>{L}</span>
            <span style={{ flex: 1, height: 1, background: line }} />
            <span>{pad2(byLetter[L].length)}</span>
          </div>
          {byLetter[L].map((t) => {
            const open = openIds.includes(t.id);
            return (
              <div key={t.id} style={{ borderBottom: `1px solid ${line}` }}>
                <button
                  aria-expanded={open}
                  aria-controls={`${uid}-d${t.id}`}
                  onClick={() => toggle(t.id)}
                  style={{ ...btnReset, display: 'flex', alignItems: 'baseline', gap: 16, width: '100%', padding: `${compact ? 12 : 14}px 0` }}
                >
                  <span style={{ flex: 1, minWidth: 0, fontFamily: display, fontSize: tSize, lineHeight: 1.1, letterSpacing: '-0.035em', fontWeight: 400, color: open ? text : text, transform: open ? 'translateX(4px)' : 'none', transition: `transform 600ms ${easeOut}` }}>{highlight(t.term)}</span>
                  {!compact && showCategories && <span style={{ ...micro, fontSize: 10.5, color: muted }}>{t.cat}</span>}
                  <span aria-hidden="true" style={{ position: 'relative', width: 12, height: 12, flexShrink: 0, alignSelf: 'center' }}>
                    <span style={{ position: 'absolute', left: 0, top: 5.5, width: 12, height: 1, background: open ? accent : text, transition: 'background 300ms' }} />
                    <span style={{ position: 'absolute', left: 5.5, top: 0, width: 1, height: 12, background: open ? accent : text, transform: open ? 'scaleY(0) rotate(90deg)' : 'none', transition: `transform 500ms ${easeOut}, background 300ms` }} />
                  </span>
                </button>
                <div id={`${uid}-d${t.id}`} role="region" aria-hidden={!open} style={{ display: 'grid', gridTemplateRows: open ? '1fr' : '0fr', transition: reduced ? 'none' : `grid-template-rows ${open ? 640 : 420}ms cubic-bezier(0.65, 0, 0.35, 1)` }}>
                  <div style={{ minHeight: 0, overflow: 'hidden' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: compact ? '1fr' : '1fr 120px', gap: 16, padding: `0 0 ${compact ? 16 : 20}px 4px` }}>
                      <p ref={(el) => { if (el) defRefs.current[t.id] = el; else delete defRefs.current[t.id]; }} style={{ margin: 0, maxWidth: 560, fontSize: compact ? 15 : 17, lineHeight: 1.5, color: '#3D3A35', fontWeight: 400, letterSpacing: '-0.005em' }}>
                        {t.def.split(/\s+/).map((w, k) => (
                          <span key={k} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', paddingBottom: '0.08em', marginBottom: '-0.08em' }}>
                            <span style={{ display: 'inline-block', whiteSpace: 'pre', transform: 'translateY(115%)', opacity: 0 }}>{w + ' '}</span>
                          </span>
                        ))}
                      </p>
                      {!compact && showCodes && <span style={{ ...micro, fontSize: 10, color: muted, textAlign: 'right', paddingTop: 6, opacity: open ? 1 : 0, transition: `opacity 500ms ${open ? 300 : 0}ms` }}>{t.letter}.{pad2(byLetter[L].indexOf(t) + 1)}</span>}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
      {!letters.length && (
        <div style={{ ...micro, padding: '48px 0', color: muted }}>{emptyText} — <span style={{ color: text }}>“{query}”</span></div>
      )}
      <div style={{ height: Math.max(0, listH - 220) }} aria-hidden="true" />
    </div>
  );

  const search = (
    <label style={{ display: 'flex', alignItems: 'center', gap: 12, borderBottom: `1px solid ${text}`, paddingBottom: 10, marginBottom: compact ? 12 : 18 }}>
      <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true" style={{ flexShrink: 0, color: muted }}><circle cx="8.5" cy="8.5" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M13 13l4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
      <input
        value={query}
        onChange={(e) => { setQuery(e.target.value); if (listRef.current) listRef.current.scrollTop = 0; }}
        onKeyDown={(e) => { if (e.key === 'Escape') setQuery(''); }}
        placeholder={searchPlaceholder}
        aria-label={searchPlaceholder}
        spellCheck={false}
        style={{ flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent', padding: 0, fontFamily: display, fontSize: compact ? 18 : 20, letterSpacing: '-0.02em', color: text, caretColor: accent }}
      />
      <span style={{ ...micro, color: muted, fontVariantNumeric: 'tabular-nums', flexShrink: 0 }}>{pad2(filtered.length)}/{pad2(terms.length)}</span>
    </label>
  );

  const countFor = byLetter[shownLetter] ? byLetter[shownLetter].length : 0;

  return (
    <section
      ref={rootRef}
      className={`glossary-index ${uid}`}
      aria-label={title || 'Glossary'}
      style={{ position: 'relative', width: '100%', minHeight: compact ? 0 : H, background: bg, color: text, fontFamily: sans, boxSizing: 'border-box', padding: `${compact ? 24 : pad * 0.8}px ${pad}px ${compact ? 32 : pad * 0.8}px`, overflow: 'hidden' }}
    >
      <style>{`
        .${uid} button:focus-visible { outline: 1.5px solid ${accent}; outline-offset: 2px; border-radius: 2px; }
        .${uid} input::placeholder { color: ${muted}; opacity: 1; }
        .${uid} .${uid}-list::-webkit-scrollbar, .${uid} nav::-webkit-scrollbar { display: none; }
        @keyframes ${uid}-rollinu { from { transform: translateY(70%); opacity: 0; filter: blur(6px); } to { transform: none; opacity: 1; filter: blur(0); } }
        @keyframes ${uid}-rolloutu { from { transform: none; opacity: 1; filter: blur(0); } to { transform: translateY(-70%); opacity: 0; filter: blur(6px); } }
        @keyframes ${uid}-rollind { from { transform: translateY(-70%); opacity: 0; filter: blur(6px); } to { transform: none; opacity: 1; filter: blur(0); } }
        @keyframes ${uid}-rolloutd { from { transform: none; opacity: 1; filter: blur(0); } to { transform: translateY(70%); opacity: 0; filter: blur(6px); } }
        @keyframes ${uid}-fadeinu { from { opacity: 0; transform: scale(1.04); } to { opacity: 1; transform: none; } }
        @keyframes ${uid}-fadeoutu { from { opacity: 1; } to { opacity: 0; transform: scale(0.98); } }
        @keyframes ${uid}-fadeind { from { opacity: 0; transform: scale(1.04); } to { opacity: 1; transform: none; } }
        @keyframes ${uid}-fadeoutd { from { opacity: 1; } to { opacity: 0; transform: scale(0.98); } }
        @keyframes ${uid}-intro { from { transform: translateY(100%); } to { transform: none; } }
        @keyframes ${uid}-fade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: reduce) { .${uid} * { animation: none !important; transition: none !important; } }
      `}</style>

      {compact ? (
        <div>
          <div style={{ ...micro, display: 'flex', justifyContent: 'space-between', color: muted, marginBottom: 12 }}>
            <span style={{ color: text }}>{title}</span><span>{pad2(terms.length)} terms</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12, marginBottom: 14 }}>
            <div style={{ width: giantSize * 0.8 }}>{giant}</div>
            <div style={{ ...micro, color: muted, textAlign: 'right', paddingBottom: 8 }}>{subtitle}<br /><span style={{ color: accent }}>{shownLetter}</span> — {pad2(countFor)}</div>
          </div>
          {search}
          {rail}
          {list}
        </div>
      ) : (
        <div style={{ display: 'flex', gap: Math.round(width * 0.04), height: innerH }}>
          <div style={{ width: leftW, flexShrink: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ animation: reduced ? 'none' : `${uid}-fade 800ms ${easeOut} both` }}>
              <div style={{ ...micro, color: muted, marginBottom: 14 }}>{subtitle}</div>
              <h2 style={{ margin: 0, fontFamily: display, fontWeight: 400, fontSize: Math.round(Math.min(72, leftW * 0.16)), lineHeight: 0.95, letterSpacing: '-0.045em' }}>{title}</h2>
            </div>
            <div>
              {giant}
              <div style={{ ...micro, display: 'flex', justifyContent: 'space-between', borderTop: `1px solid ${line}`, paddingTop: 12, marginTop: 14, color: muted }}>
                <span>Letter <span style={{ color: text }}>{shownLetter}</span></span>
                <span><span style={{ color: accent }}>{pad2(countFor)}</span> {countFor === 1 ? 'term' : 'terms'}</span>
              </div>
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', animation: reduced ? 'none' : `${uid}-fade 800ms ${easeOut} 200ms both` }}>
            {search}
            <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
              {list}
              {rail}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

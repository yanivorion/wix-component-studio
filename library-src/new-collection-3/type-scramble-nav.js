const MANIFEST = {
  "type": "Type.ScrambleNav",
  "description": "A large studio navigation beside a hero headline: hovering a link decodes it through mono glyphs that resolve left to right while its underline draws in from the side the cursor entered and its index ticks; clicking a link scrambles the hero headline into that page's title. An idle pass cycles through every link once",
  "editorElement": {
    "selector": ".scramble-nav",
    "displayName": "Scramble Nav",
    "archetype": "container",
    "data": {
      "brand": { "dataType": "text", "displayName": "Brand", "defaultValue": "Northwall Studio", "group": "Content" },
      "metaRight": { "dataType": "text", "displayName": "Top Right Label", "defaultValue": "Est. 2014 — Oslo / Remote", "group": "Content" },
      "hint": { "dataType": "text", "displayName": "Hint", "defaultValue": "Hover to decode · Click to open", "group": "Content" },
      "item1Label": { "dataType": "text", "displayName": "Link 1 Label", "defaultValue": "Work", "group": "Links" },
      "item1Title": { "dataType": "text", "displayName": "Link 1 Title (/ = line break)", "defaultValue": "Work that / holds still", "group": "Links" },
      "item1Text": { "dataType": "text", "displayName": "Link 1 Text", "defaultValue": "Identity, product and editorial systems for companies that would rather be remembered than noticed.", "group": "Links" },
      "item1Tag": { "dataType": "text", "displayName": "Link 1 Tag", "defaultValue": "48 projects", "group": "Links" },
      "item2Label": { "dataType": "text", "displayName": "Link 2 Label", "defaultValue": "Studio", "group": "Links" },
      "item2Title": { "dataType": "text", "displayName": "Link 2 Title", "defaultValue": "Small team, / long view", "group": "Links" },
      "item2Text": { "dataType": "text", "displayName": "Link 2 Text", "defaultValue": "Nine designers and engineers under one roof. We keep the team small so every project gets the whole studio.", "group": "Links" },
      "item2Tag": { "dataType": "text", "displayName": "Link 2 Tag", "defaultValue": "9 people", "group": "Links" },
      "item3Label": { "dataType": "text", "displayName": "Link 3 Label", "defaultValue": "Process", "group": "Links" },
      "item3Title": { "dataType": "text", "displayName": "Link 3 Title", "defaultValue": "Slow ideas, / fast hands", "group": "Links" },
      "item3Text": { "dataType": "text", "displayName": "Link 3 Text", "defaultValue": "Weeks of listening, then days of making. Every decision is written down, tested and shipped in the open.", "group": "Links" },
      "item3Tag": { "dataType": "text", "displayName": "Link 3 Tag", "defaultValue": "4 phases", "group": "Links" },
      "item4Label": { "dataType": "text", "displayName": "Link 4 Label", "defaultValue": "Journal", "group": "Links" },
      "item4Title": { "dataType": "text", "displayName": "Link 4 Title", "defaultValue": "Notes from / the bench", "group": "Links" },
      "item4Text": { "dataType": "text", "displayName": "Link 4 Text", "defaultValue": "Essays on type, tools and the craft of making things that last longer than the brief.", "group": "Links" },
      "item4Tag": { "dataType": "text", "displayName": "Link 4 Tag", "defaultValue": "112 notes", "group": "Links" },
      "item5Label": { "dataType": "text", "displayName": "Link 5 Label", "defaultValue": "Contact", "group": "Links" },
      "item5Title": { "dataType": "text", "displayName": "Link 5 Title", "defaultValue": "Say hello. / We reply.", "group": "Links" },
      "item5Text": { "dataType": "text", "displayName": "Link 5 Text", "defaultValue": "hello@northwall.studio — new projects, collaborations, or just a good question about kerning.", "group": "Links" },
      "item5Tag": { "dataType": "text", "displayName": "Link 5 Tag", "defaultValue": "24h reply", "group": "Links" },
      "glyphSet": { "dataType": "select", "displayName": "Scramble Glyphs", "defaultValue": "symbols", "options": ["symbols", "letters", "binary", "blocks"], "group": "Animation" },
      "speed": { "dataType": "select", "displayName": "Decode Speed", "defaultValue": "medium", "options": ["fast", "medium", "slow"], "group": "Animation" },
      "idleCycle": { "dataType": "booleanValue", "displayName": "Idle Cycle (once)", "defaultValue": "true", "group": "Animation" },
      "showTags": { "dataType": "booleanValue", "displayName": "Link Tags", "defaultValue": "true", "group": "Layout" },
      "showBody": { "dataType": "booleanValue", "displayName": "Hero Text", "defaultValue": "true", "group": "Layout" },
      "navSide": { "dataType": "select", "displayName": "Nav Side", "defaultValue": "right", "options": ["right", "left"], "group": "Layout" },
      "height": { "dataType": "select", "displayName": "Height", "defaultValue": "screen", "options": ["screen", "560", "680", "800"], "group": "Layout" },
      "headlineScale": { "dataType": "select", "displayName": "Headline Scale", "defaultValue": "1", "options": ["0.8", "0.9", "1", "1.1"], "group": "Typography" },
      "headlineWeight": { "dataType": "select", "displayName": "Headline Weight", "defaultValue": "400", "options": ["300", "400", "500"], "group": "Typography" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#0B0B0C", "group": "Colors" },
      "inkColor": { "dataType": "color", "displayName": "Ink", "defaultValue": "#F3F2EF", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#6F6B66", "group": "Colors" },
      "ruleColor": { "dataType": "color", "displayName": "Rules", "defaultValue": "#2A2824", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent", "defaultValue": "#FF5F1F", "group": "Colors" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const brand = config?.brand || 'Northwall Studio';
  const metaRight = config?.metaRight || 'Est. 2014 — Oslo / Remote';
  const hint = config?.hint || 'Hover to decode · Click to open';
  const defaults = [
    ['Work', 'Work that / holds still', 'Identity, product and editorial systems for companies that would rather be remembered than noticed.', '48 projects'],
    ['Studio', 'Small team, / long view', 'Nine designers and engineers under one roof. We keep the team small so every project gets the whole studio.', '9 people'],
    ['Process', 'Slow ideas, / fast hands', 'Weeks of listening, then days of making. Every decision is written down, tested and shipped in the open.', '4 phases'],
    ['Journal', 'Notes from / the bench', 'Essays on type, tools and the craft of making things that last longer than the brief.', '112 notes'],
    ['Contact', 'Say hello. / We reply.', 'hello@northwall.studio — new projects, collaborations, or just a good question about kerning.', '24h reply']
  ];
  const items = React.useMemo(() => defaults.map((d, k) => ({
    label: config?.[`item${k + 1}Label`] ?? d[0],
    title: config?.[`item${k + 1}Title`] || d[1],
    text: config?.[`item${k + 1}Text`] ?? d[2],
    tag: config?.[`item${k + 1}Tag`] ?? d[3]
  })).filter((it) => String(it.label || '').trim()),
  [config?.item1Label, config?.item1Title, config?.item1Text, config?.item1Tag, config?.item2Label, config?.item2Title, config?.item2Text, config?.item2Tag,
    config?.item3Label, config?.item3Title, config?.item3Text, config?.item3Tag, config?.item4Label, config?.item4Title, config?.item4Text, config?.item4Tag,
    config?.item5Label, config?.item5Title, config?.item5Text, config?.item5Tag]);
  const glyphs = {
    symbols: '#%&*+=/\\<>[]{}_-~^?!0123456789',
    letters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    binary: '01',
    blocks: '░▒▓█▚▞▖▗▘▝'
  }[config?.glyphSet || 'symbols'] || '#%&*+=/\\<>[]{}_-~^?!0123456789';
  const speed = { fast: 0.65, medium: 1, slow: 1.5 }[config?.speed || 'medium'] || 1;
  const idleCycle = bool(config?.idleCycle, true);
  const showTags = bool(config?.showTags, true);
  const showBody = bool(config?.showBody, true);
  const navSide = config?.navSide === 'left' ? 'left' : 'right';
  const heightMode = config?.height || 'screen';
  const headlineScale = parseFloat(config?.headlineScale || '1') || 1;
  const headlineWeight = parseFloat(config?.headlineWeight || '400') || 400;
  const bg = config?.backgroundColor || '#0B0B0C';
  const ink = config?.inkColor || '#F3F2EF';
  const muted = config?.mutedColor || '#6F6B66';
  const rule = config?.ruleColor || '#2A2824';
  const accent = config?.accentColor || '#FF5F1F';

  const uid = React.useMemo(() => 'sn' + Math.random().toString(36).slice(2, 9), []);
  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  const rootRef = React.useRef(null);
  const heroLineRefs = React.useRef([]);
  const eyebrowRef = React.useRef(null);
  const counterRef = React.useRef(null);
  const linkTextRefs = React.useRef([]);
  const indexRefs = React.useRef([]);
  const lineRefs = React.useRef([]);
  const buttonRefs = React.useRef([]);
  const anims = React.useRef(new Map());
  const loop = React.useRef({ raf: 0 });
  const idleTimers = React.useRef([]);
  const userTouched = React.useRef(false);
  const shownTitle = React.useRef('');
  const [activeIdx, setActiveIdx] = React.useState(0);
  const [ghost, setGhost] = React.useState(-1);
  const [hovered, setHovered] = React.useState(-1);
  const [width, setWidth] = React.useState(1280);
  const [stageH, setStageH] = React.useState(760);

  React.useEffect(() => {
    const id = 'gf-inter-tight-jbmono';
    if (document.getElementById(id)) return;
    const l = document.createElement('link');
    l.id = id; l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300..500&family=JetBrains+Mono:wght@400;500&display=swap';
    document.head.appendChild(l);
  }, []);

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
    const obs = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (obs) obs.observe(el);
    window.addEventListener('resize', measure);
    return () => { if (obs) obs.disconnect(); window.removeEventListener('resize', measure); };
  }, []);

  const mono = '"JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace';
  const sans = '"Inter Tight", "Inter", -apple-system, "Helvetica Neue", Arial, sans-serif';
  const esc = (c) => (c === '<' ? '&lt;' : c === '>' ? '&gt;' : c === '&' ? '&amp;' : c === '"' ? '&quot;' : c);
  const pick = () => glyphs[Math.floor(Math.random() * glyphs.length)];

  const tick = React.useCallback(() => {
    const L = loop.current;
    if (L.raf) return;
    const frame = (now) => {
      L.raf = 0;
      let alive = false;
      anims.current.forEach((st, el) => {
        if (!el.isConnected) { anims.current.delete(el); return; }
        let html = '';
        let done = true;
        for (let i = 0; i < st.chars.length; i++) {
          const c = st.chars[i];
          if (now < c.s) { html += esc(c.from); done = false; }
          else if (now < c.r) {
            done = false;
            if (c.to === ' ' && (c.from === ' ' || c.from === '')) { html += ' '; continue; }
            if (now - c.t > st.flick) { c.g = st.pool[Math.floor(Math.random() * st.pool.length)]; c.t = now; }
            const head = c.r - now < 70;
            html += `<span style="font-family:${st.monoCss};font-size:${st.monoScale}em;color:${head ? st.headColor : st.dimColor}">${esc(c.g)}</span>`;
          } else html += esc(c.to);
        }
        if (done) { el.textContent = st.final; anims.current.delete(el); }
        else { if (html !== st.last) { el.innerHTML = html; st.last = html; } alive = true; }
      });
      if (alive) L.raf = requestAnimationFrame(frame);
    };
    L.raf = requestAnimationFrame(frame);
  }, []);

  const scramble = React.useCallback((el, from, to, o = {}) => {
    if (!el) return;
    const fromS = String(from || ''); const toS = String(to || '');
    if (reduced) { anims.current.delete(el); el.textContent = toS; return; }
    const now = performance.now() + (o.delay || 0);
    const stagger = (o.stagger || 34) * speed;
    const dur = (o.dur || 360) * speed;
    const wave = o.wave ?? 0.4;
    const n = Math.max(fromS.length, toS.length);
    const chars = [];
    for (let i = 0; i < n; i++) {
      const s = now + i * stagger * wave;
      chars.push({ from: fromS[i] || '', to: toS[i] || '', s, r: Math.max(s + 60, now + i * stagger + dur * (0.55 + Math.random() * 0.45)), g: pick(), t: 0 });
    }
    anims.current.set(el, {
      chars, final: toS, last: '', flick: o.flick || 48, pool: o.pool || glyphs,
      monoCss: mono.replace(/"/g, "'"), monoScale: o.monoScale || 0.8,
      headColor: o.headColor || accent, dimColor: o.dimColor || muted
    });
    tick();
  }, [reduced, speed, glyphs, accent, muted, tick]);

  React.useEffect(() => () => { cancelAnimationFrame(loop.current.raf); loop.current.raf = 0; anims.current.clear(); }, []);

  const compact = width < 820;
  const H = heightMode === 'screen' ? Math.max(compact ? 760 : 580, Math.min(stageH, 1000)) : parseInt(heightMode, 10) || 680;
  const pad = compact ? 20 : 56;
  const n = items.length;
  const titleLines = (t) => String(t || '').split(/\s*(?:\/|\n)\s*/).filter(Boolean);
  const maxLines = Math.max(1, ...items.map((it) => titleLines(it.title).length));
  const maxLineChars = Math.max(6, ...items.flatMap((it) => titleLines(it.title).map((l) => l.length)));
  const heroColW = compact ? width - pad * 2 : (width - pad * 2) * 0.58;
  const navTop = compact ? 0 : pad + 92;
  const navBottom = compact ? 0 : pad + 44;
  const rowH = compact ? 58 : Math.max(64, Math.min(124, (H - navTop - navBottom) / Math.max(n, 1)));
  const linkPx = compact ? 30 : Math.round(Math.min(rowH * 0.5, ((width - pad * 2) * 0.36) / 5.4));
  const bodyRoom = showBody ? (compact ? 120 : 130) : 40;
  const heroPx = Math.round(Math.min(
    heroColW / (maxLineChars * 0.5),
    compact ? 64 : (H - pad * 2 - 110 - bodyRoom) / (maxLines * 0.98)
  ) * headlineScale);

  const active = Math.min(activeIdx, Math.max(0, n - 1));
  const cur = items[active] || { label: '', title: '', text: '', tag: '' };
  const pad2 = (k) => String(k).padStart(2, '0');

  const playHero = React.useCallback((k, firstRun) => {
    const it = items[k];
    if (!it) return;
    const prev = firstRun ? [] : titleLines(shownTitle.current);
    const next = titleLines(it.title);
    for (let li = 0; li < maxLines; li++) {
      scramble(heroLineRefs.current[li], firstRun ? '' : (prev[li] || ''), next[li] || '', { delay: li * 140, stagger: 30, dur: 420, wave: firstRun ? 0.3 : 0.5, monoScale: 0.68 });
    }
    shownTitle.current = it.title;
    scramble(eyebrowRef.current, '', `${pad2(k + 1)} — ${it.label}`, { stagger: 26, dur: 260, wave: 0.2, monoScale: 1, dimColor: muted, headColor: accent });
    scramble(counterRef.current, '', `${pad2(k + 1)} / ${pad2(n)}`, { stagger: 40, dur: 300, pool: '0123456789', monoScale: 1, wave: 0 });
  }, [items, maxLines, scramble, n, muted, accent]);

  const decodeLink = React.useCallback((i, delay = 0) => {
    const it = items[i];
    if (!it) return;
    scramble(linkTextRefs.current[i], it.label, it.label, { wave: 0, stagger: 42, dur: 300, delay, monoScale: 0.78 });
    scramble(indexRefs.current[i], pad2(i + 1), pad2(i + 1), { wave: 0, stagger: 70, dur: 340, delay, pool: '0123456789', monoScale: 1, headColor: accent, dimColor: accent });
  }, [items, scramble]);

  const drawLine = (i, on, fromLeft) => {
    const el = lineRefs.current[i];
    if (!el) return;
    el.style.transformOrigin = fromLeft ? 'left center' : 'right center';
    el.style.transform = on ? 'scaleX(1)' : 'scaleX(0)';
  };

  React.useEffect(() => {
    items.forEach((it, i) => {
      if (linkTextRefs.current[i]) linkTextRefs.current[i].textContent = it.label;
      if (indexRefs.current[i]) indexRefs.current[i].textContent = pad2(i + 1);
    });
    playHero(active, true);
    items.forEach((it, i) => decodeLink(i, 120 + i * 70));
  }, [items, compact]);

  const clearIdle = () => { idleTimers.current.forEach(clearTimeout); idleTimers.current = []; };
  React.useEffect(() => {
    clearIdle();
    if (!idleCycle || reduced || n < 2) return undefined;
    const order = [];
    for (let k = 1; k < n; k++) order.push(k);
    order.push(0);
    let t = 1500;
    const at = (ms, fn) => idleTimers.current.push(setTimeout(() => { if (!userTouched.current) fn(); }, ms));
    order.forEach((k) => {
      const prev = k === 0 ? n - 1 : k - 1;
      at(t, () => { drawLine(prev, false, false); setGhost(k); drawLine(k, true, true); decodeLink(k); });
      at(t + 650, () => { setActiveIdx(k); playHero(k, false); });
      t += 2900;
    });
    at(t - 600, () => { setGhost(-1); drawLine(0, false, false); });
    return clearIdle;
  }, [idleCycle, reduced, n, items]);

  const touch = () => {
    if (userTouched.current) return;
    userTouched.current = true;
    clearIdle();
    if (ghost >= 0) drawLine(ghost, false, false);
    setGhost(-1);
  };
  const sideOf = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    return e.clientX < r.left + r.width / 2;
  };
  const onEnter = (i) => (e) => { touch(); setHovered(i); drawLine(i, true, sideOf(e)); decodeLink(i); };
  const onLeave = (i) => (e) => { setHovered((h) => (h === i ? -1 : h)); drawLine(i, false, !sideOf(e)); };
  const onFocus = (i) => () => { setHovered(i); drawLine(i, true, true); decodeLink(i); };
  const onBlur = (i) => () => { setHovered((h) => (h === i ? -1 : h)); drawLine(i, false, false); };
  const open = (i) => { touch(); if (i === active) { playHero(i, false); return; } setActiveIdx(i); playHero(i, false); };
  const onKey = (i) => (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const j = (i + (e.key === 'ArrowDown' ? 1 : -1) + n) % n;
      const b = buttonRefs.current[j];
      if (b) b.focus();
    }
  };

  const p = uid;
  const label = { fontFamily: mono, fontSize: compact ? 10 : 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: muted };
  const navW = compact ? '100%' : `${(width - pad * 2) * 0.36}px`;

  const hero = (
    <div style={{
      position: compact ? 'relative' : 'absolute',
      [navSide === 'right' ? 'left' : 'right']: compact ? undefined : pad,
      top: compact ? undefined : pad + 92, bottom: compact ? undefined : pad,
      width: compact ? '100%' : heroColW,
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: compact ? 28 : 0
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, ...label, color: ink }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: accent, flexShrink: 0 }} />
        <span ref={eyebrowRef} aria-hidden="true" style={{ whiteSpace: 'pre' }} />
        <span style={{ flex: 1, height: 1, background: rule, minWidth: 30 }} />
      </div>
      <div>
        <h2 aria-live="polite" aria-label={titleLines(cur.title).join(' ')} style={{ margin: 0, fontFamily: sans, fontWeight: headlineWeight, fontSize: heroPx, lineHeight: 0.98, letterSpacing: '-0.035em', color: ink }}>
          {Array.from({ length: maxLines }).map((_, li) => (
            <span key={li} aria-hidden="true" ref={(el) => { heroLineRefs.current[li] = el; }} style={{ display: 'block', whiteSpace: 'pre', minHeight: '0.98em' }} />
          ))}
        </h2>
        {showBody && (
          <div style={{ display: 'grid', gridTemplateColumns: compact ? '1fr' : 'minmax(0, 360px) auto', justifyContent: 'space-between', alignItems: 'end', gap: 20, marginTop: compact ? 22 : 34 }}>
            <p key={active} className={`${p}-body`} style={{ margin: 0, fontFamily: sans, fontSize: compact ? 15 : 16, lineHeight: 1.5, fontWeight: 400, color: muted, letterSpacing: '-0.005em' }}>{cur.text}</p>
            {!compact && <span style={{ ...label, color: muted }}>{hint}</span>}
          </div>
        )}
      </div>
    </div>
  );

  const nav = (
    <nav aria-label="Primary" style={{
      position: compact ? 'relative' : 'absolute',
      [navSide === 'right' ? 'right' : 'left']: compact ? undefined : pad,
      top: compact ? undefined : navTop, width: navW
    }}>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, borderBottom: `1px solid ${rule}` }}>
        {items.map((it, i) => {
          const isActive = i === active;
          const isHot = i === hovered || i === ghost;
          return (
            <li key={i} style={{ borderTop: `1px solid ${rule}` }}>
              <button
                type="button"
                ref={(el) => { buttonRefs.current[i] = el; }}
                className={`${p}-lk`}
                aria-current={isActive ? 'page' : undefined}
                aria-label={`${it.label}${it.tag ? ` — ${it.tag}` : ''}`}
                onPointerEnter={onEnter(i)}
                onPointerLeave={onLeave(i)}
                onFocus={onFocus(i)}
                onBlur={onBlur(i)}
                onClick={() => open(i)}
                onKeyDown={onKey(i)}
                style={{ height: rowH, display: 'grid', gridTemplateColumns: compact ? '34px 1fr auto' : '48px 1fr auto', alignItems: 'center', width: '100%' }}
              >
                <span aria-hidden="true" style={{ ...label, alignSelf: 'start', paddingTop: compact ? 12 : Math.round(rowH * 0.24), color: isActive || isHot ? accent : muted, transition: 'color .3s', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span ref={(el) => { indexRefs.current[i] = el; }} style={{ fontVariantNumeric: 'tabular-nums' }} />
                </span>
                <span aria-hidden="true" style={{ position: 'relative', justifySelf: 'start', fontFamily: sans, fontSize: linkPx, fontWeight: isActive ? 500 : 400, letterSpacing: '-0.03em', lineHeight: 1.05, color: isActive || isHot ? ink : `color-mix(in srgb, ${ink} 46%, ${bg})`, transition: 'color .35s cubic-bezier(.22,1,.36,1)', whiteSpace: 'pre', paddingBottom: 6 }}>
                  <span ref={(el) => { linkTextRefs.current[i] = el; }} />
                  <span ref={(el) => { lineRefs.current[i] = el; }} style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 1.5, background: isActive ? accent : ink, transform: 'scaleX(0)', transformOrigin: 'left center', transition: 'transform .6s cubic-bezier(.65,0,.35,1), background-color .3s' }} />
                </span>
                <span aria-hidden="true" style={{ ...label, display: 'flex', alignItems: 'center', gap: 12, color: isActive ? ink : muted }}>
                  {showTags && !compact && it.tag && <span>{it.tag}</span>}
                  <span style={{ display: 'inline-block', fontSize: 14, transition: 'transform .45s cubic-bezier(.22,1,.36,1), color .3s', transform: isHot || isActive ? 'translateX(0) rotate(0deg)' : 'translateX(-6px) rotate(-45deg)', color: isActive ? accent : isHot ? ink : muted }}>→</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );

  return (
    <section
      ref={rootRef}
      className={`scramble-nav ${p}`}
      style={{ position: 'relative', width: '100%', height: compact ? 'auto' : H, minHeight: compact ? H : undefined, overflow: 'hidden', background: bg, color: ink, fontFamily: sans, boxSizing: 'border-box' }}
    >
      <style>{`
        .${p} .${p}-lk { all: unset; box-sizing: border-box; cursor: pointer; }
        .${p} .${p}-lk:focus-visible { outline: 1px solid ${accent}; outline-offset: -1px; }
        @keyframes ${p}-bin { from { opacity: 0; transform: translateY(8px); filter: blur(4px); } to { opacity: 1; transform: none; filter: none; } }
        .${p} .${p}-body { animation: ${p}-bin .7s cubic-bezier(.22,1,.36,1) .25s both; }
        @media (prefers-reduced-motion: reduce) { .${p} * { animation: none !important; transition: none !important; } }
      `}</style>

      <header style={{ position: compact ? 'relative' : 'absolute', top: compact ? undefined : pad, left: compact ? undefined : pad, right: compact ? undefined : pad, padding: compact ? `${pad}px ${pad}px 0` : 0, display: 'grid', gridTemplateColumns: compact ? '1fr auto' : '1fr auto 1fr', alignItems: 'center', gap: 20, ...label }}>
        <span style={{ color: ink, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ display: 'inline-block', width: 14, height: 14, border: `1px solid ${ink}`, borderRadius: '50%', position: 'relative' }}>
            <span style={{ position: 'absolute', inset: 3, borderRadius: '50%', background: accent }} />
          </span>
          {brand}
        </span>
        <span style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
          {!compact && <span>Index</span>}
          <span ref={counterRef} aria-hidden="true" style={{ color: ink, fontVariantNumeric: 'tabular-nums', whiteSpace: 'pre' }} />
        </span>
        {!compact && <span style={{ textAlign: 'right' }}>{metaRight}</span>}
      </header>

      {compact ? (
        <div style={{ padding: `${36}px ${pad}px ${pad}px`, display: 'grid', gap: 40 }}>
          {hero}
          {nav}
        </div>
      ) : (
        <>
          {hero}
          {nav}
        </>
      )}

      {!n && (
        <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', ...label }}>Add links in the Links group</div>
      )}
    </section>
  );
}

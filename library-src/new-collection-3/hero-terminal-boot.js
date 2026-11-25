const MANIFEST = {
  "type": "Hero.TerminalBoot",
  "description": "A hero that boots itself: a mono terminal types a few concise lines with a human, uneven rhythm and a blinking accent block caret, then the screen compiles — the headline's mono characters lift off the log, scramble and morph into a huge grotesk headline that settles into the final hero with subline and call to action. Replay control included",
  "editorElement": {
    "selector": ".terminal-boot",
    "displayName": "Terminal Boot Hero",
    "archetype": "container",
    "data": {
      "brand": { "dataType": "text", "displayName": "Brand Label", "defaultValue": "Northwind Studio", "group": "Content" },
      "versionLabel": { "dataType": "text", "displayName": "Corner Label", "defaultValue": "Build 26.11", "group": "Content" },
      "bootLines": { "dataType": "text", "displayName": "Boot Lines (separate with |, start commands with >)", "defaultValue": "> studio init northwind --hero | resolving type scale · 1.25 | ok | setting grid · 12 col / 24 gutter | ok | loading voice · plain, exact, warm | ok | > render --headline", "group": "Content" },
      "headline": { "dataType": "text", "displayName": "Headline", "defaultValue": "Make the complex feel inevitable.", "group": "Content" },
      "subline": { "dataType": "text", "displayName": "Subline", "defaultValue": "We design and build digital products for teams who care how things work — down to the last pixel and the first line of code.", "group": "Content" },
      "ctaLabel": { "dataType": "text", "displayName": "Primary CTA", "defaultValue": "Start a project", "group": "Content" },
      "ctaLink": { "dataType": "text", "displayName": "Primary CTA Link", "defaultValue": "#", "group": "Content" },
      "secondaryLabel": { "dataType": "text", "displayName": "Secondary CTA", "defaultValue": "See the work", "group": "Content" },
      "secondaryLink": { "dataType": "text", "displayName": "Secondary CTA Link", "defaultValue": "#", "group": "Content" },
      "statusText": { "dataType": "text", "displayName": "Compiled Status", "defaultValue": "compiled · 0 warnings", "group": "Content" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#0B0B0C", "group": "Colors" },
      "textColor": { "dataType": "color", "displayName": "Text", "defaultValue": "#F3F2EF", "group": "Colors" },
      "monoColor": { "dataType": "color", "displayName": "Terminal Text", "defaultValue": "#D6D3CE", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted", "defaultValue": "#77726C", "group": "Colors" },
      "ruleColor": { "dataType": "color", "displayName": "Hairlines", "defaultValue": "#26241F", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent (caret)", "defaultValue": "#D9480F", "group": "Colors" },
      "headlineFont": { "dataType": "select", "displayName": "Headline Font", "defaultValue": "Inter Tight", "options": ["Inter Tight", "Inter", "Geist", "Archivo", "Manrope", "Instrument Sans"], "group": "Typography" },
      "monoFont": { "dataType": "select", "displayName": "Mono Font", "defaultValue": "Geist Mono", "options": ["Geist Mono", "JetBrains Mono", "IBM Plex Mono", "Space Mono"], "group": "Typography" },
      "headlineSize": { "dataType": "select", "displayName": "Headline Size", "defaultValue": "auto", "options": ["auto", "96", "120", "144", "168"], "group": "Typography" },
      "headlineWeight": { "dataType": "select", "displayName": "Headline Weight", "defaultValue": "400", "options": ["300", "400", "500"], "group": "Typography" },
      "terminalSize": { "dataType": "select", "displayName": "Terminal Text Size", "defaultValue": "20", "options": ["14", "16", "18", "20", "22"], "group": "Typography" },
      "minHeight": { "dataType": "select", "displayName": "Min Height (px)", "defaultValue": "screen", "options": ["screen", "640", "720", "820"], "group": "Layout" },
      "dimLog": { "dataType": "booleanValue", "displayName": "Keep Dimmed Log After Boot", "defaultValue": "true", "group": "Layout" },
      "showCaretAfter": { "dataType": "booleanValue", "displayName": "Caret After Headline", "defaultValue": "true", "group": "Layout" },
      "autoplay": { "dataType": "booleanValue", "displayName": "Boot When Visible", "defaultValue": "true", "group": "Animation" },
      "typingSpeed": { "dataType": "select", "displayName": "Typing Speed", "defaultValue": "1", "options": ["0.6", "0.8", "1", "1.3", "1.7"], "group": "Animation" },
      "compileStyle": { "dataType": "select", "displayName": "Compile Style", "defaultValue": "arc", "options": ["arc", "straight", "drop"], "group": "Animation" },
      "showReplay": { "dataType": "booleanValue", "displayName": "Replay Button", "defaultValue": "true", "group": "Animation" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const brand = config?.brand || 'Northwind Studio';
  const versionLabel = config?.versionLabel || 'Build 26.11';
  const headline = config?.headline || 'Make the complex feel inevitable.';
  const subline = config?.subline || 'We design and build digital products for teams who care how things work — down to the last pixel and the first line of code.';
  const ctaLabel = config?.ctaLabel || 'Start a project';
  const ctaLink = config?.ctaLink || '#';
  const secondaryLabel = config?.secondaryLabel ?? 'See the work';
  const secondaryLink = config?.secondaryLink || '#';
  const statusText = config?.statusText || 'compiled · 0 warnings';
  const bg = config?.backgroundColor || '#0B0B0C';
  const textColor = config?.textColor || '#F3F2EF';
  const monoColor = config?.monoColor || '#D6D3CE';
  const muted = config?.mutedColor || '#77726C';
  const ruleColor = config?.ruleColor || '#26241F';
  const accent = config?.accentColor || '#D9480F';
  const headlineFont = config?.headlineFont || 'Inter Tight';
  const monoFont = config?.monoFont || 'Geist Mono';
  const sizeOpt = config?.headlineSize || 'auto';
  const headWeight = parseInt(config?.headlineWeight || '400', 10) || 400;
  const termSizeBase = parseInt(config?.terminalSize || '20', 10) || 20;
  const minHOpt = config?.minHeight || 'screen';
  const dimLog = bool(config?.dimLog, true);
  const caretAfter = bool(config?.showCaretAfter, true);
  const autoplay = bool(config?.autoplay, true);
  const speed = Math.max(0.3, parseFloat(config?.typingSpeed || '1') || 1);
  const compileStyle = config?.compileStyle || 'arc';
  const showReplay = bool(config?.showReplay, true);

  const lines = React.useMemo(() => {
    const parts = String(config?.bootLines || '> studio init northwind --hero | resolving type scale · 1.25 | ok | setting grid · 12 col / 24 gutter | ok | loading voice · plain, exact, warm | ok | > render --headline')
      .split('|').map((s) => s.trim()).filter(Boolean);
    const out = [];
    parts.forEach((s) => {
      if (s.startsWith('>')) out.push({ cmd: true, text: s.replace(/^>\s*/, '') });
      else if (/^(ok|done|ready|pass|✓)$/i.test(s) && out.length && !out[out.length - 1].cmd && !out[out.length - 1].status) out[out.length - 1].status = s;
      else out.push({ cmd: false, text: s });
    });
    return out.slice(0, 7);
  }, [config?.bootLines]);

  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    [headlineFont, monoFont].forEach((f) => {
      const id = 'tb3-font-' + f.replace(/\s+/g, '-').toLowerCase();
      if (document.getElementById(id)) return;
      const l = document.createElement('link');
      l.id = id; l.rel = 'stylesheet';
      l.href = `https://fonts.googleapis.com/css2?family=${f.replace(/\s+/g, '+')}:wght@${f === 'Space Mono' ? '400' : '300;400;500'}&display=swap`;
      document.head.appendChild(l);
    });
  }, [headlineFont, monoFont]);

  const uid = React.useMemo(() => 'tb' + Math.random().toString(36).slice(2, 8), []);
  const rootRef = React.useRef(null);
  const srcRefs = React.useRef([]);
  const dstRefs = React.useRef([]);
  const geo = React.useRef([]);
  const [runId, setRunId] = React.useState(0);
  const [t, setT] = React.useState(reduced ? 1e9 : 0);
  const [playing, setPlaying] = React.useState(false);
  const [width, setWidth] = React.useState(1280);
  const [stageH, setStageH] = React.useState(800);
  const [, setGeoTick] = React.useState(0);

  const W = Math.max(320, width);
  const compact = W < 760;
  const pad = compact ? 20 : Math.round(Math.max(40, Math.min(72, W * 0.045)));
  const termSize = compact ? Math.max(11, Math.round(termSizeBase * 0.66)) : termSizeBase;
  const labelCols = compact ? 24 : 40;
  const headChars = headline.replace(/\s/g, '');
  const autoSize = compact ? Math.max(40, Math.min(64, W * 0.13)) : Math.max(72, Math.min(152, W * 0.098));
  const headSize = Math.round(sizeOpt === 'auto' ? autoSize : (compact ? parseInt(sizeOpt, 10) * 0.45 : parseInt(sizeOpt, 10)));
  const monoCss = `"${monoFont}", ui-monospace, "SF Mono", Menlo, monospace`;
  const headCss = `"${headlineFont}", "Inter", -apple-system, "Helvetica Neue", Arial, sans-serif`;

  const schedule = React.useMemo(() => {
    let r = (runId + 1) * 9301 + 49297;
    const rnd = () => { r = (r * 9301 + 49297) % 233280; return r / 233280; };
    const base = 30 / speed;
    let time = 120;
    const out = lines.map((ln, li) => {
      if (ln.cmd) {
        time += li === 0 ? 60 : (170 + rnd() * 150) / speed;
        const start = time;
        const chars = [];
        for (let k = 0; k < ln.text.length; k++) {
          const c = ln.text[k];
          let d = base * (0.4 + rnd() * 1.15);
          if (c === ' ') d *= 1.5;
          if (c === '-' && ln.text[k - 1] === ' ') d += 140 / speed;
          if (rnd() < 0.06) d += (90 + rnd() * 130) / speed;
          if (rnd() < 0.25 && k > 0) d *= 0.45;
          time += d;
          chars.push(time);
        }
        const end = time;
        time += 150 / speed;
        return { start, end, chars, statusAt: Infinity };
      }
      time += (40 + rnd() * 80) / speed;
      const start = time;
      const chars = [];
      const label = ln.text;
      for (let k = 0; k < label.length; k++) { time += 4 / speed; chars.push(time); }
      const dotsAt = time;
      time += (60 + rnd() * 120) / speed;
      const statusAt = ln.status ? time : Infinity;
      return { start, end: time, chars, dotsAt, statusAt };
    });
    time += 110 / speed;
    const quoteStart = time;
    const qChars = [];
    for (let k = 0; k < headline.length + 2; k++) { time += 9 / speed; qChars.push(time); }
    const tc = time + 300 / speed;
    const stagger = Math.min(22, 620 / Math.max(1, headChars.length));
    const flight = 860;
    const flyEnd = tc + stagger * headChars.length + flight;
    return { lines: out, quoteStart, qChars, tc, stagger, flight, flyEnd, end: flyEnd + 1200 };
  }, [lines, headline, headChars.length, speed, runId]);

  const measure = React.useCallback(() => {
    const root = rootRef.current;
    if (!root) return;
    const offs = (el) => {
      let x = 0; let y = 0; let e = el;
      while (e && e !== root) { x += e.offsetLeft; y += e.offsetTop; e = e.offsetParent; }
      return { x, y, h: el.offsetHeight };
    };
    geo.current = headChars.split('').map((_, j) => {
      const s = srcRefs.current[j];
      const d = dstRefs.current[j];
      if (!s || !d) return null;
      const a = offs(s); const b = offs(d);
      return { dx: a.x - b.x, dy: a.y - b.y };
    });
    setGeoTick((v) => v + 1);
  }, [headChars]);

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const s = typeof getScrollContainer === 'function' ? getScrollContainer() : null;
    const scroller = s && s !== window && s.nodeType === 1 ? s : window;
    const onResize = () => {
      setWidth(root.clientWidth);
      setStageH(scroller === window ? window.innerHeight : scroller.clientHeight);
    };
    onResize();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(onResize) : null;
    if (ro) ro.observe(root);
    window.addEventListener('resize', onResize);
    return () => { if (ro) ro.disconnect(); window.removeEventListener('resize', onResize); };
  }, []);

  React.useEffect(() => {
    measure();
    const fontsReady = typeof document !== 'undefined' && document.fonts && document.fonts.ready;
    if (fontsReady) document.fonts.ready.then(() => measure());
    const id = setTimeout(measure, 600);
    return () => clearTimeout(id);
  }, [measure, width, headSize, termSize, stageH]);

  React.useEffect(() => {
    if (reduced) return undefined;
    if (!autoplay && runId === 0) return undefined;
    const root = rootRef.current;
    let raf = 0;
    let t0 = 0;
    let started = false;
    const tick = (now) => {
      if (!t0) t0 = now;
      const el = now - t0;
      setT(el);
      if (el < schedule.end) raf = requestAnimationFrame(tick);
      else setPlaying(false);
    };
    const start = () => {
      if (started) return;
      started = true;
      setPlaying(true);
      setT(0);
      raf = requestAnimationFrame(tick);
    };
    let io = null;
    if (runId > 0 || !root || typeof IntersectionObserver === 'undefined') start();
    else {
      io = new IntersectionObserver((es) => { if (es[0].isIntersecting) { start(); io.disconnect(); } }, { threshold: 0.2 });
      io.observe(root);
    }
    return () => { cancelAnimationFrame(raf); if (io) io.disconnect(); };
  }, [runId, schedule, reduced, autoplay]);

  const replay = () => { if (!reduced) { setT(0); setRunId((v) => v + 1); } };

  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const ease = (x) => 1 - Math.pow(1 - x, 3);
  const easeIO = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  const hex = (h) => {
    const m = String(h).replace('#', '');
    const f = m.length === 3 ? m.split('').map((c) => c + c).join('') : m.padEnd(6, '0');
    return [parseInt(f.slice(0, 2), 16) || 0, parseInt(f.slice(2, 4), 16) || 0, parseInt(f.slice(4, 6), 16) || 0];
  };
  const mix = (a, b, k) => { const A = hex(a); const B = hex(b); return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * k)).join(',')})`; };

  const idle = !autoplay && runId === 0 && !reduced;
  const tt = idle ? 1e9 : t;
  const sc = schedule;
  const compileT = tt - sc.tc;
  const logDim = dimLog ? 0.26 : 0;
  const logFade = clamp(compileT / 700);
  const logOpacity = 1 - (1 - logDim) * easeIO(logFade);
  const subIn = ease(clamp((tt - (sc.flyEnd - 450)) / 900));
  const statusIn = ease(clamp((tt - (sc.flyEnd - 200)) / 500));
  const elapsed = ((sc.flyEnd) / 1000).toFixed(2);

  let caretPos = null;
  let typingNow = false;
  sc.lines.forEach((s, i) => {
    if (tt >= s.start - 260 && (i === sc.lines.length - 1 ? tt < sc.quoteStart : tt < (sc.lines[i + 1]?.start ?? Infinity) - 260)) {
      caretPos = i;
      typingNow = lines[i].cmd && tt >= s.start && tt <= s.end + 40;
    }
  });
  if (tt >= sc.quoteStart && compileT < 0) caretPos = 'q';
  if (tt < (sc.lines[0]?.start ?? 0) - 260) caretPos = 0;

  const caret = (blink) => (
    <span aria-hidden="true" className={blink ? `${uid}-blink` : ''} style={{
      display: 'inline-block', width: '0.6em', height: '1.15em', verticalAlign: '-0.22em', marginLeft: 2, background: accent
    }} />
  );

  const scrambleSet = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#%&*+=/<>';
  const termLines = lines.map((ln, i) => {
    const s = sc.lines[i];
    const shown = s.chars.filter((c) => c <= tt).length;
    const visible = tt >= s.start - 40;
    const label = ln.text;
    const dotCount = Math.max(2, labelCols - label.length);
    const dotsShown = ln.cmd ? 0 : Math.round(clamp((tt - s.dotsAt) / Math.max(1, s.statusAt - s.dotsAt)) * dotCount);
    return (
      <div key={i} style={{ whiteSpace: 'pre', minHeight: '1.75em', opacity: visible ? 1 : 0 }}>
        <span style={{ color: ln.cmd ? accent : muted }}>{ln.cmd ? '›' : ' '}</span>
        <span> </span>
        <span style={{ color: ln.cmd ? monoColor : mix(muted, monoColor, 0.55) }}>
          {label.slice(0, shown)}
          {caretPos === i && compileT < 0 && caret(!typingNow)}
          <span style={{ visibility: 'hidden' }}>{label.slice(shown)}</span>
        </span>
        {!ln.cmd && (
          <span style={{ color: mix(muted, bg, 0.35) }}>
            {' '}{'.'.repeat(dotsShown)}<span style={{ visibility: 'hidden' }}>{'.'.repeat(dotCount - dotsShown)}</span>{' '}
          </span>
        )}
        {!ln.cmd && ln.status && <span style={{ color: monoColor, opacity: tt >= s.statusAt ? 1 : 0 }}>{ln.status}</span>}
      </div>
    );
  });

  let srcIdx = 0;
  const qShown = sc.qChars.filter((c) => c <= tt).length;
  const quoteLine = (
    <div style={{ whiteSpace: compact ? 'pre-wrap' : 'pre', minHeight: '1.75em', color: textColor, opacity: tt >= sc.quoteStart ? 1 : 0 }}>
      <span style={{ color: muted }}>  </span>
      <span style={{ color: muted, opacity: compileT >= 0 ? 0 : 1 }}>“</span>
      {headline.split('').map((ch, k) => {
        const vis = k + 1 < qShown;
        if (ch === ' ') return <span key={k}> </span>;
        const j = srcIdx++;
        return (
          <span key={k} ref={(el) => { srcRefs.current[j] = el; }} style={{ display: 'inline-block', lineHeight: 1, visibility: vis && compileT < 0 ? 'visible' : 'hidden' }}>{ch}</span>
        );
      })}
      <span style={{ color: muted, opacity: compileT >= 0 ? 0 : qShown > headline.length ? 1 : 0 }}>”</span>
      {caretPos === 'q' && caret(true)}
    </div>
  );

  let dstIdx = 0;
  const words = headline.split(' ');
  const sInit = termSize / headSize;
  const headlineNode = words.map((w, wi) => (
    <React.Fragment key={wi}>
      <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
        {w.split('').map((ch, k) => {
          const j = dstIdx++;
          const g = geo.current[j];
          const e0 = clamp((compileT - j * sc.stagger) / sc.flight);
          const e = easeIO(e0);
          const started = compileT >= j * sc.stagger;
          const morph = clamp((e0 - 0.42) / 0.36);
          const sc2 = sInit + (1 - sInit) * e;
          let tx = 0; let ty = 0;
          if (g && e < 1) {
            tx = g.dx * (1 - e);
            ty = g.dy * (1 - e);
            if (compileStyle === 'arc') ty -= Math.sin(Math.PI * e) * headSize * 0.5;
            if (compileStyle === 'drop') ty += Math.sin(Math.PI * e) * headSize * 0.25;
          }
          const isDot = j === headChars.length - 1 && /[.!?]/.test(ch);
          const glyph = e0 < 0.62 ? scrambleSet[(Math.floor(tt / 55) + j * 7) % scrambleSet.length] : ch;
          const showMono = started && morph < 1 && compileT >= 0;
          const hidden = compileT < 0 || !started;
          return (
            <span key={k} ref={(el) => { dstRefs.current[j] = el; }} style={{
              position: 'relative', display: 'inline-block', lineHeight: 1,
              transformOrigin: '0 0', transform: hidden || e >= 1 ? 'none' : `translate(${tx}px, ${ty}px) scale(${sc2})`,
              visibility: 'visible'
            }}>
              {!reduced && e0 < 0.5 && (
                <span aria-hidden="true" style={{ position: 'absolute', left: '0.06em', right: '0.06em', bottom: '0.1em', height: Math.max(2, Math.round(headSize * 0.016)), background: mix(ruleColor, muted, 0.35), opacity: hidden ? 1 : 1 - clamp(e0 * 3) }} />
              )}
              <span style={{
                position: 'relative', opacity: reduced ? 1 : morph, color: isDot ? accent : textColor,
                filter: !reduced && morph < 1 ? `blur(${((1 - morph) * 10).toFixed(1)}px)` : 'none'
              }}>{ch}</span>
              {showMono && !reduced && (
                <span aria-hidden="true" style={{
                  position: 'absolute', left: 0, top: 0, fontFamily: monoCss, fontWeight: 400, letterSpacing: 0,
                  color: e0 < 0.3 ? textColor : mix(textColor, accent, clamp((e0 - 0.3) * 3) * (1 - morph)), opacity: 1 - morph
                }}>{glyph}</span>
              )}
            </span>
          );
        })}
      </span>
      {wi < words.length - 1 ? ' ' : null}
    </React.Fragment>
  ));

  const minH = minHOpt === 'screen' ? Math.max(compact ? 680 : 600, stageH) : parseInt(minHOpt, 10);
  const btnReset = { appearance: 'none', background: 'none', border: 0, padding: 0, margin: 0, font: 'inherit', color: 'inherit', cursor: 'pointer' };

  return (
    <section ref={rootRef} className={`terminal-boot ${uid}`} aria-label={`${brand}. ${headline} ${subline}`}
      style={{ position: 'relative', width: '100%', minHeight: minH, background: bg, color: textColor, overflow: 'hidden', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', padding: `${compact ? 20 : 36}px ${pad}px ${compact ? 24 : 40}px` }}>
      <style>{`
        @keyframes ${uid}-b { 0%, 49% { opacity: 1 } 50%, 100% { opacity: 0 } }
        .${uid}-blink { animation: ${uid}-b 1.05s step-end infinite; }
        .${uid}-caret-end { animation: ${uid}-b 1.05s step-end 6; animation-fill-mode: forwards; }
        .${uid} .tb-btn:focus-visible { outline: 1px solid ${accent}; outline-offset: 5px; }
        .${uid} .tb-primary { transition: background-color 300ms cubic-bezier(0.22,1,0.36,1), color 300ms cubic-bezier(0.22,1,0.36,1); }
        .${uid} .tb-primary:hover { background: ${accent} !important; border-color: ${accent} !important; color: ${bg} !important; }
        .${uid} .tb-primary:hover .tb-arr, .${uid} .tb-ghost:hover .tb-arr { transform: translateX(4px); }
        .${uid} .tb-ghost:hover { color: ${textColor} !important; }
        .${uid} .tb-arr { display: inline-block; transition: transform 300ms cubic-bezier(0.22,1,0.36,1); }
        @media (prefers-reduced-motion: reduce) { .${uid}-blink, .${uid}-caret-end { animation: none; } }
      `}</style>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: monoCss, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: muted, paddingBottom: compact ? 14 : 18, borderBottom: `1px solid ${ruleColor}` }}>
        <span style={{ color: textColor }}>{brand}</span>
        <span aria-hidden="true" style={{ display: 'flex', gap: compact ? 14 : 28, fontVariantNumeric: 'tabular-nums' }}>
          {!compact && <span>{compileT >= 0 ? 'Status — live' : 'Status — booting'}</span>}
          <span>{versionLabel}</span>
        </span>
      </div>

      <div aria-hidden="true" style={{ position: 'relative', marginTop: compact ? 28 : 34, fontFamily: monoCss, fontSize: termSize, lineHeight: 1.75, fontWeight: 400, color: monoColor }}>
        <div style={{ opacity: logOpacity }}>{termLines}</div>
        {quoteLine}
        <div style={{ whiteSpace: 'pre', minHeight: '1.75em', fontSize: termSize, color: muted, opacity: statusIn }}>
          <span style={{ color: accent }}>✓</span>{` ${statusText} · ${elapsed}s`}
        </div>
      </div>

      <div style={{ flex: 1, minHeight: compact ? 32 : 24 }} />

      <h1 style={{ position: 'relative', margin: 0, fontFamily: headCss, fontWeight: headWeight, fontSize: headSize, lineHeight: 0.98, letterSpacing: '-0.045em', color: textColor, maxWidth: compact ? '100%' : Math.min(W - pad * 2, headSize * 9.2) }}>
        <span style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>{headline}</span>
        <span aria-hidden="true">
          {headlineNode}
          {caretAfter && (reduced || tt >= sc.flyEnd) && (
            <span className={reduced ? '' : `${uid}-caret-end`} style={{ display: 'inline-block', width: '0.06em', height: '0.78em', marginLeft: '0.08em', verticalAlign: '-0.02em', background: accent }} />
          )}
        </span>
      </h1>

      <div style={{
        display: 'flex', flexDirection: compact ? 'column' : 'row', alignItems: compact ? 'flex-start' : 'flex-end', justifyContent: 'space-between',
        gap: compact ? 22 : 40, marginTop: compact ? 26 : 30, paddingTop: compact ? 20 : 24, borderTop: `1px solid ${mix(ruleColor, bg, 1 - subIn)}`,
        opacity: subIn, transform: `translateY(${(1 - subIn) * 18}px)`
      }}>
        <p style={{ margin: 0, maxWidth: 440, fontFamily: headCss, fontWeight: 300, fontSize: compact ? 15 : 17, lineHeight: 1.55, color: mix(textColor, muted, 0.4) }}>{subline}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: compact ? 18 : 28, flexWrap: 'wrap' }}>
          {secondaryLabel && (
            <a className="tb-btn tb-ghost" href={secondaryLink} tabIndex={subIn > 0.5 ? 0 : -1} style={{ fontFamily: monoCss, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: mix(textColor, muted, 0.4), textDecoration: 'none', transition: 'color 300ms' }}>
              {secondaryLabel} <span className="tb-arr">↗</span>
            </a>
          )}
          {ctaLabel && (
            <a className="tb-btn tb-primary" href={ctaLink} tabIndex={subIn > 0.5 ? 0 : -1} style={{ display: 'inline-flex', alignItems: 'center', gap: 14, padding: '15px 22px', border: `1px solid ${textColor}`, background: textColor, color: bg, fontFamily: monoCss, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none' }}>
              {ctaLabel} <span className="tb-arr">→</span>
            </a>
          )}
          {showReplay && !reduced && (
            <button type="button" className="tb-btn" onClick={replay} aria-label="Replay boot sequence" style={{ ...btnReset, fontFamily: monoCss, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: muted }}>
              ↺ Replay
            </button>
          )}
        </div>
      </div>
      {showReplay && !reduced && subIn < 0.05 && (
        <button type="button" className="tb-btn" onClick={replay} aria-label={idle ? 'Play boot sequence' : 'Restart boot sequence'} style={{ ...btnReset, position: 'absolute', right: pad, bottom: compact ? 24 : 40, fontFamily: monoCss, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: muted }}>
          {idle ? '▸ Boot' : playing ? '↺ Restart' : '↺ Replay'}
        </button>
      )}
    </section>
  );
}

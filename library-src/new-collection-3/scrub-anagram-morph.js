const MANIFEST = {
  "type": "Scrub.AnagramMorph",
  "description": "Scroll-scrubbed anagram: one huge word rearranges into the next by physically moving its own letters between measured positions, arcing over and under each other with slight rotation and depth, staggered by how far each travels; unmatched letters fade out and in, and each word gets its own caption",
  "editorElement": {
    "selector": ".anagram-morph",
    "displayName": "Anagram Morph",
    "archetype": "container",
    "data": {
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Anagram / Six letters", "group": "Content" },
      "indexLabel": { "dataType": "text", "displayName": "Index Label", "defaultValue": "03 / 04", "group": "Content" },
      "words": { "dataType": "text", "displayName": "Words (comma separated, 2–4)", "defaultValue": "Listen, Silent, Tinsel", "group": "Content" },
      "captions": { "dataType": "text", "displayName": "Captions (pipe separated)", "defaultValue": "To attend with intent|The absence of sound|A thread of borrowed light", "group": "Content" },
      "footnote": { "dataType": "text", "displayName": "Footnote", "defaultValue": "Same letters, new meaning", "group": "Content" },
      "letterCase": { "dataType": "select", "displayName": "Letter Case", "defaultValue": "uppercase", "options": ["uppercase", "as typed", "lowercase"], "group": "Content" },
      "accentLetter": { "dataType": "text", "displayName": "Accent Letter", "defaultValue": "S", "group": "Colors", "description": "The one letter drawn in the accent colour (leave empty for none)" },
      "arcHeight": { "dataType": "select", "displayName": "Arc Height", "defaultValue": "medium", "options": ["low", "medium", "high"], "group": "Animation" },
      "tilt": { "dataType": "select", "displayName": "Mid-flight Tilt", "defaultValue": "subtle", "options": ["none", "subtle", "strong"], "group": "Animation" },
      "depth": { "dataType": "booleanValue", "displayName": "Depth (over/under)", "defaultValue": "true", "group": "Animation" },
      "showIndexTags": { "dataType": "booleanValue", "displayName": "Letter Index Tags", "defaultValue": "true", "group": "Layout" },
      "showSequence": { "dataType": "booleanValue", "displayName": "Word Sequence", "defaultValue": "true", "group": "Layout" },
      "showProgress": { "dataType": "booleanValue", "displayName": "Progress Rule", "defaultValue": "true", "group": "Layout" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#F3F2EF", "group": "Colors" },
      "inkColor": { "dataType": "color", "displayName": "Ink", "defaultValue": "#0B0B0C", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#8A857D", "group": "Colors" },
      "ruleColor": { "dataType": "color", "displayName": "Rules", "defaultValue": "#D9D6D0", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent", "defaultValue": "#D9480F", "group": "Colors" },
      "fontFamily": { "dataType": "select", "displayName": "Display Font", "defaultValue": "Geist", "options": ["Geist", "Inter Tight", "Instrument Sans", "Manrope", "Hanken Grotesk"], "group": "Typography" },
      "monoFamily": { "dataType": "select", "displayName": "Mono Font", "defaultValue": "Geist Mono", "options": ["Geist Mono", "JetBrains Mono", "IBM Plex Mono"], "group": "Typography" },
      "fontWeight": { "dataType": "select", "displayName": "Weight", "defaultValue": "400", "options": ["300", "400", "500"], "group": "Typography" },
      "tracking": { "dataType": "select", "displayName": "Tracking (em)", "defaultValue": "-0.04", "options": ["-0.06", "-0.04", "-0.02", "0"], "group": "Typography" },
      "maxSize": { "dataType": "select", "displayName": "Max Size (px)", "defaultValue": "260", "options": ["180", "220", "260", "320"], "group": "Typography" },
      "scrollLength": { "dataType": "select", "displayName": "Scroll Length (screens)", "defaultValue": "4", "options": ["3", "4", "5", "6"], "group": "Animation" },
      "smoothing": { "dataType": "select", "displayName": "Scrub Smoothing", "defaultValue": "0.12", "options": ["0.08", "0.12", "0.2", "1"], "group": "Animation", "description": "1 = locked to the scrollbar, lower = more glide" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const eyebrow = config?.eyebrow || 'Anagram / Six letters';
  const indexLabel = config?.indexLabel || '03 / 04';
  const letterCase = config?.letterCase || 'uppercase';
  const footnote = config?.footnote || 'Same letters, new meaning';
  const accentRaw = config?.accentLetter ?? 'S';
  const arcK = { low: 0.18, medium: 0.34, high: 0.55 }[config?.arcHeight || 'medium'] || 0.34;
  const tiltK = { none: 0, subtle: 9, strong: 18 }[config?.tilt || 'subtle'] ?? 9;
  const depth = bool(config?.depth, true);
  const showIndexTags = bool(config?.showIndexTags, true);
  const showSequence = bool(config?.showSequence, true);
  const showProgress = bool(config?.showProgress, true);
  const bg = config?.backgroundColor || '#F3F2EF';
  const ink = config?.inkColor || '#0B0B0C';
  const muted = config?.mutedColor || '#8A857D';
  const rule = config?.ruleColor || '#D9D6D0';
  const accent = config?.accentColor || '#D9480F';
  const fontFamily = config?.fontFamily || 'Geist';
  const monoFamily = config?.monoFamily || 'Geist Mono';
  const weight = parseInt(config?.fontWeight || '400', 10) || 400;
  const trk = parseFloat(config?.tracking ?? '-0.04');
  const tracking = isNaN(trk) ? -0.04 : trk;
  const maxSize = parseInt(config?.maxSize || '260', 10) || 260;
  const screens = parseFloat(config?.scrollLength || '4') || 4;
  const smoothing = Math.min(1, Math.max(0.02, parseFloat(config?.smoothing || '0.12')));

  const applyCase = (w) => (letterCase === 'uppercase' ? w.toUpperCase() : letterCase === 'lowercase' ? w.toLowerCase() : w);
  const words = React.useMemo(() => {
    const list = String(config?.words || 'Listen, Silent, Tinsel').split(',').map((w) => w.replace(/\s+/g, '').slice(0, 12)).filter(Boolean).slice(0, 4);
    const base = list.length >= 2 ? list : list.length === 1 ? [list[0], list[0].split('').reverse().join('')] : ['Listen', 'Silent'];
    return base.map(applyCase);
  }, [config?.words, letterCase]); // eslint-disable-line react-hooks/exhaustive-deps
  const captions = React.useMemo(() => String(config?.captions ?? 'To attend with intent|The absence of sound|A thread of borrowed light').split('|').map((c) => c.trim()), [config?.captions]);
  const accentChar = applyCase(String(accentRaw).trim().slice(0, 1));

  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const uid = React.useMemo(() => 'am' + Math.random().toString(36).slice(2, 8), []);
  const displayStack = `"${fontFamily}", "Inter", -apple-system, "Helvetica Neue", Arial, sans-serif`;
  const monoStack = `"${monoFamily}", ui-monospace, "SF Mono", Menlo, monospace`;

  React.useEffect(() => {
    const fam = {
      'Geist': 'Geist:wght@300;400;500',
      'Inter Tight': 'Inter+Tight:wght@300;400;500',
      'Instrument Sans': 'Instrument+Sans:wght@400;500',
      'Manrope': 'Manrope:wght@300;400;500',
      'Hanken Grotesk': 'Hanken+Grotesk:wght@300;400;500',
      'Geist Mono': 'Geist+Mono:wght@400;500',
      'JetBrains Mono': 'JetBrains+Mono:wght@400;500',
      'IBM Plex Mono': 'IBM+Plex+Mono:wght@400;500'
    };
    [fam[fontFamily], fam[monoFamily]].filter(Boolean).forEach((f) => {
      const id = 'gf-' + f.replace(/[^a-z0-9]/gi, '').slice(0, 48);
      if (document.getElementById(id)) return;
      const l = document.createElement('link');
      l.id = id; l.rel = 'stylesheet';
      l.href = `https://fonts.googleapis.com/css2?family=${f}&display=swap`;
      document.head.appendChild(l);
    });
  }, [fontFamily, monoFamily]);

  const [fontTick, setFontTick] = React.useState(0);
  React.useEffect(() => {
    let alive = true;
    if (typeof document === 'undefined' || !document.fonts) return undefined;
    document.fonts.load(`${weight} 100px "${fontFamily}"`, words.join('')).then(() => { if (alive) setFontTick((t) => t + 1); }).catch(() => {});
    const t = setTimeout(() => { if (alive) setFontTick((x) => x + 1); }, 1400);
    return () => { alive = false; clearTimeout(t); };
  }, [fontFamily, weight, words]);

  const metrics = React.useMemo(() => {
    const chars = Array.from(new Set(words.join('')));
    const fallback = { adv: Object.fromEntries(chars.map((c) => [c, /[MW]/.test(c) ? 0.82 : /[Iil1]/.test(c) ? 0.28 : 0.62])), base: 0.86, cap: 0.72 };
    if (typeof document === 'undefined') return fallback;
    try {
      const ctx = document.createElement('canvas').getContext('2d');
      ctx.font = `${weight} 100px ${displayStack}`;
      const adv = Object.fromEntries(chars.map((c) => [c, ctx.measureText(c).width / 100]));
      const h = ctx.measureText('H');
      const fa = (h.fontBoundingBoxAscent || 96) / 100;
      const fd = (h.fontBoundingBoxDescent || 24) / 100;
      return { adv, base: (1 - (fa + fd)) / 2 + fa, cap: (h.actualBoundingBoxAscent || 72) / 100 };
    } catch (e) { return fallback; }
  }, [words, weight, displayStack, fontTick]); // eslint-disable-line react-hooks/exhaustive-deps

  const layoutEm = React.useMemo(() => words.map((w) => {
    const chars = Array.from(w);
    let acc = 0;
    const xs = chars.map((c) => { const x = acc; acc += (metrics.adv[c] || 0.6) + tracking; return x; });
    return { chars, xs, width: acc - tracking };
  }), [words, metrics, tracking]);

  const tokens = React.useMemo(() => {
    const list = [];
    let prev = layoutEm[0].chars.map((c, i) => { const t = { ch: c, orig: i, states: [layoutEm[0].xs[i]] }; list.push(t); return t; });
    for (let k = 1; k < layoutEm.length; k++) {
      const L = layoutEm[k];
      const next = new Array(L.chars.length).fill(null);
      const byChar = {};
      prev.forEach((t) => { (byChar[t.ch] = byChar[t.ch] || []).push(t); });
      const nextBy = {};
      L.chars.forEach((c, j) => { (nextBy[c] = nextBy[c] || []).push(j); });
      Object.keys(nextBy).forEach((c) => {
        const src = (byChar[c] || []).slice().sort((a, b) => a.states[k - 1] - b.states[k - 1]);
        const dst = nextBy[c].slice().sort((a, b) => L.xs[a] - L.xs[b]);
        dst.forEach((j, m) => {
          if (m < src.length) next[j] = src[m];
        });
      });
      list.forEach((t) => { if (t.states.length === k) t.states.push(null); });
      next.forEach((t, j) => {
        if (t) t.states[k] = L.xs[j];
        else { const nt = { ch: L.chars[j], orig: -1, states: new Array(k).fill(null).concat([L.xs[j]]) }; list.push(nt); next[j] = nt; }
      });
      prev = next;
    }
    list.forEach((t) => { while (t.states.length < layoutEm.length) t.states.push(null); });
    return list;
  }, [layoutEm]);

  const sectionRef = React.useRef(null);
  const target = React.useRef(0);
  const current = React.useRef(0);
  const [progress, setProgress] = React.useState(reduced ? 1 : 0);
  const [stageH, setStageH] = React.useState(800);
  const [width, setWidth] = React.useState(1280);
  const [mounted, setMounted] = React.useState(reduced);

  React.useEffect(() => {
    if (reduced) return undefined;
    const t = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(t);
  }, [reduced]);

  React.useEffect(() => {
    const s = typeof getScrollContainer === 'function' ? getScrollContainer() : null;
    const scroller = s && s !== window && s.nodeType === 1 ? s : window;
    const section = sectionRef.current;
    if (!section) return undefined;
    let raf = 0;
    const read = () => {
      const r = section.getBoundingClientRect();
      const top = scroller === window ? 0 : scroller.getBoundingClientRect().top;
      const vh = scroller === window ? window.innerHeight : scroller.getBoundingClientRect().height;
      const travel = r.height - vh;
      target.current = travel > 0 ? Math.min(1, Math.max(0, (top - r.top) / travel)) : 0;
    };
    const tick = () => {
      const d = target.current - current.current;
      current.current = Math.abs(d) < 0.0004 ? target.current : current.current + d * smoothing;
      setProgress(current.current);
      raf = current.current === target.current ? 0 : requestAnimationFrame(tick);
    };
    const onScroll = () => { read(); if (!raf && !reduced) raf = requestAnimationFrame(tick); };
    const measure = () => {
      setStageH(scroller === window ? window.innerHeight : scroller.clientHeight);
      setWidth(section.clientWidth);
      onScroll();
    };
    measure();
    scroller.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (ro) ro.observe(section);
    return () => {
      scroller.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
      if (ro) ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [smoothing, reduced]);

  const p = reduced ? 1 : progress;
  const clamp = (v) => Math.min(1, Math.max(0, v));
  const ease = (t) => 1 - Math.pow(1 - t, 3);
  const easeIO = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const lerp = (a, b, t) => a + (b - a) * t;
  const pad2 = (v) => String(v).padStart(2, '0');
  const hex = (h) => {
    const m = String(h).replace('#', '');
    const f = m.length === 3 ? m.split('').map((c) => c + c).join('') : m.padEnd(6, '0');
    return [parseInt(f.slice(0, 2), 16) || 0, parseInt(f.slice(2, 4), 16) || 0, parseInt(f.slice(4, 6), 16) || 0];
  };
  const mix = (a, b, t) => { const A = hex(a); const B = hex(b); return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(',')})`; };

  const W = Math.max(320, width);
  const H = Math.max(420, stageH);
  const compact = W < 760;
  const margin = compact ? 20 : 48;
  const maxW = Math.max(...layoutEm.map((l) => l.width));
  const F = Math.max(40, Math.min(maxSize * (compact ? 0.6 : 1), (W * (compact ? 0.88 : 0.8)) / Math.max(1, maxW), H * 0.36));
  const { base, cap } = metrics;
  const capCenter = H * (compact ? 0.45 : 0.46);
  const baselineY = capCenter + (cap * F) / 2;

  const P = words.length;
  const T = P - 1;
  const lead = 0.08;
  const tail = 0.14;
  const gap = T > 1 ? 0.16 : 0;
  const L = (1 - lead - tail - gap * (T - 1)) / T;
  let k = 0;
  let lt = 0;
  for (let i = 0; i < T; i++) {
    const a = lead + i * (L + gap);
    if (p >= a) { k = i; lt = clamp((p - a) / L); }
  }
  if (p < lead) { k = 0; lt = 0; }
  const phaseNow = lt >= 0.5 ? k + 1 : k;
  const phaseFloat = k + lt;

  const travelOf = (t) => (t.states[k] !== null && t.states[k + 1] !== null ? Math.abs((t.states[k + 1] - layoutEm[k + 1].width / 2) - (t.states[k] - layoutEm[k].width / 2)) : 0);
  const maxTravel = Math.max(0.0001, ...tokens.map(travelOf));
  let accentDone = false;

  const placed = tokens.map((t, idx) => {
    const a = t.states[k];
    const b = k + 1 < P ? t.states[k + 1] : null;
    const xa = a !== null ? W / 2 + (a - layoutEm[k].width / 2) * F : null;
    const xb = b !== null ? W / 2 + (b - layoutEm[k + 1].width / 2) * F : null;
    let x = 0; let y = baselineY; let rot = 0; let sc = 1; let op = 1; let z = 1; let tagOp = 1; let under = 0;
    if (xa !== null && xb !== null) {
      const d = travelOf(t) / maxTravel;
      const delay = (1 - d) * 0.28;
      const u = easeIO(clamp((lt - delay) / 0.72));
      const dir = xb >= xa ? 1 : -1;
      const arc = Math.sin(Math.PI * u);
      x = lerp(xa, xb, u);
      y = baselineY - dir * (dir > 0 ? 1 : 0.55) * arc * Math.min(F * arcK * 1.4, Math.abs(xb - xa) * arcK);
      tagOp = clamp(1 - arc * 2.2);
      rot = dir * arc * tiltK * Math.min(1, d * 1.6);
      sc = depth ? 1 + dir * arc * 0.1 * Math.min(1, d * 1.6) : 1 - arc * 0.06;
      z = dir > 0 ? 3 : 1;
      under = depth && dir < 0 ? arc * Math.min(1, d * 1.6) : 0;
    } else if (xa !== null) {
      const u = ease(clamp(lt / 0.45));
      x = xa; y = baselineY + u * F * 0.18; sc = 1 - u * 0.35; op = 1 - u;
    } else if (xb !== null) {
      const u = ease(clamp((lt - 0.5) / 0.5));
      x = xb; y = baselineY - (1 - u) * F * 0.18; sc = 0.65 + u * 0.35; op = u;
    } else {
      op = 0;
    }
    const isAccent = !accentDone && accentChar && t.ch === accentChar && (accentDone = true);
    return { t, idx, x, y, rot, sc, op, z, isAccent, tagOp, under };
  });

  const capIdx = Math.min(P - 1, phaseNow);
  const capSlide = (i) => {
    const center = i;
    const dist = phaseFloat - center;
    if (Math.abs(dist) > 0.75) return null;
    const u = dist > 0 ? ease(clamp((dist - 0.1) / 0.3)) : ease(clamp((-dist - 0.15) / 0.3));
    if (u >= 1) return null;
    return { y: dist > 0 ? -u * 120 : u * 120, op: 1 - u };
  };

  const microStyle = { fontFamily: monoStack, fontSize: compact ? 10 : 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: muted, fontVariantNumeric: 'tabular-nums' };
  const enter = (i, from) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'none' : (from || 'translateY(12px)'),
    transition: reduced ? 'none' : `opacity 700ms cubic-bezier(0.22,1,0.36,1) ${100 + i * 70}ms, transform 1000ms cubic-bezier(0.22,1,0.36,1) ${100 + i * 70}ms`
  });
  const ruleY = baselineY + F * 0.12;
  const firstLen = layoutEm[0].chars.length;

  return (
    <section ref={sectionRef} className={`anagram-morph ${uid}`} aria-label={words.map((w, i) => `${w}${captions[i] ? ': ' + captions[i] : ''}`).join('. ')}
      style={{ position: 'relative', width: '100%', height: `${Math.round(stageH * screens)}px`, background: bg, color: ink }}>
      <div style={{ position: 'sticky', top: 0, height: `${stageH}px`, overflow: 'hidden', background: bg }}>
        <div style={{ ...microStyle, position: 'absolute', top: compact ? 22 : 36, left: margin, color: ink, ...enter(0) }}>{eyebrow}</div>
        <div style={{ ...microStyle, position: 'absolute', top: compact ? 22 : 36, right: margin, color: ink, ...enter(1) }}>{indexLabel}</div>

        {showSequence && (
          <div aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, top: compact ? 64 : 92, display: 'flex', justifyContent: 'center', gap: compact ? 8 : 14, flexWrap: 'wrap', ...enter(2) }}>
            {words.map((w, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span style={{ ...microStyle, opacity: 0.6 }}>→</span>}
                <span style={{ ...microStyle, color: i === capIdx ? ink : muted, transition: 'color 300ms' }}>
                  <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: 3, marginRight: 8, verticalAlign: '1px', background: i === capIdx ? accent : 'transparent', border: `1px solid ${i === capIdx ? accent : muted}`, transition: 'background 300ms, border-color 300ms' }} />
                  {w}
                </span>
              </React.Fragment>
            ))}
          </div>
        )}

        <h2 style={{ position: 'absolute', inset: 0, margin: 0, fontWeight: weight, pointerEvents: 'none' }}>
          <span style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>{words[capIdx]}</span>
          {placed.map((q, i) => (q.op <= 0.001 ? null : (
            <span key={i} aria-hidden="true" style={{
              position: 'absolute', left: 0, top: 0, zIndex: q.z, fontFamily: displayStack, fontSize: F, fontWeight: weight, lineHeight: 1,
              whiteSpace: 'pre', color: q.isAccent ? accent : (q.under > 0.01 ? mix(ink, muted, q.under * 0.75) : ink), opacity: q.op,
              transformOrigin: `${(metrics.adv[q.t.ch] || 0.6) * F * 0.5}px ${base * F}px`, willChange: 'transform',
              transform: `translate3d(${q.x.toFixed(2)}px, ${(q.y - base * F).toFixed(2)}px, 0) rotate(${q.rot.toFixed(2)}deg) scale(${q.sc.toFixed(4)})`
            }}>
              <span style={{ display: 'inline-block', ...enter(i, 'translateY(0.2em)') }}>{q.t.ch}</span>
              {showIndexTags && (
                <span style={{
                  ...microStyle, position: 'absolute', left: '50%', top: base * F + F * 0.16, transform: 'translateX(-50%)', fontSize: compact ? 9 : 10.5,
                  letterSpacing: '0.04em', color: q.isAccent ? accent : muted, ...enter(i + 3, 'translate(-50%, 6px)')
                }}><span style={{ opacity: q.tagOp }}>{q.t.orig >= 0 ? pad2(q.t.orig + 1) : '+'}</span></span>
              )}
            </span>
          )))}
        </h2>

        <div aria-hidden="true" style={{ position: 'absolute', left: margin, right: margin, top: ruleY, height: 1, background: rule, transformOrigin: 'center', transform: `scaleX(${mounted ? 1 : 0})`, transition: reduced ? 'none' : 'transform 1200ms cubic-bezier(0.65,0,0.35,1) 150ms' }} />

        <div style={{ position: 'absolute', left: margin, right: margin, top: ruleY + (showIndexTags ? F * 0.2 + 34 : 30), height: compact ? 54 : 64, overflow: 'hidden', textAlign: 'center' }}>
          {words.map((w, i) => {
            const c = capSlide(i);
            if (!c) return null;
            return (
              <div key={i} style={{ position: 'absolute', left: 0, right: 0, top: 0, transform: `translateY(${c.y}%)`, opacity: c.op }}>
                <div style={{ ...microStyle, marginBottom: 8 }}><span style={{ color: accent }}>{pad2(i + 1)}</span> — {w}</div>
                <div style={{ fontFamily: displayStack, fontSize: compact ? 16 : 20, fontWeight: 400, letterSpacing: '-0.015em', color: ink, ...enter(4) }}>{captions[i] || ''}</div>
              </div>
            );
          })}
        </div>

        <div style={{ position: 'absolute', left: margin, right: margin, bottom: compact ? 22 : 34, display: 'flex', alignItems: 'center', gap: compact ? 12 : 24, ...enter(5) }}>
          <span style={{ ...microStyle, whiteSpace: 'nowrap' }}>{compact ? '' : footnote}</span>
          {showProgress && (
            <div aria-hidden="true" style={{ position: 'relative', flex: 1, height: 1, background: rule }}>
              <div style={{ position: 'absolute', left: 0, top: 0, height: 1, width: '100%', background: ink, transformOrigin: 'left', transform: `scaleX(${p})` }} />
              {words.map((w, i) => (
                <div key={i} style={{ position: 'absolute', left: `${T ? (i / T) * 100 : 0}%`, top: -3, width: 1, height: 7, background: i <= phaseNow ? ink : rule }} />
              ))}
            </div>
          )}
          <span style={{ ...microStyle, color: ink, whiteSpace: 'nowrap' }}>{pad2(capIdx + 1)} / {pad2(P)} · {firstLen} letters</span>
        </div>
      </div>
    </section>
  );
}

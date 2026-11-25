const MANIFEST = {
  "type": "Scrub.PosterPeel",
  "description": "A stack of wheat-pasted posters on a wall; scrolling peels the top sheet from its corner along a travelling fold line, its paper back folding over with a soft shadow to reveal the next poster beneath",
  "editorElement": {
    "selector": ".poster-peel",
    "displayName": "Poster Peel",
    "archetype": "container",
    "data": {
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Street Series / 2026", "group": "Content" },
      "title": { "dataType": "text", "displayName": "Title", "defaultValue": "Layers on a public wall", "group": "Content" },
      "caption": { "dataType": "text", "displayName": "Caption", "defaultValue": "Four sheets, pasted one over another. Scroll to peel them back.", "group": "Content" },
      "posterCount": { "dataType": "select", "displayName": "Posters", "defaultValue": "4", "options": ["3", "4"], "group": "Content" },
      "poster1Word": { "dataType": "text", "displayName": "Poster 1 Word", "defaultValue": "PRINT", "group": "Posters" },
      "poster1Line": { "dataType": "text", "displayName": "Poster 1 Line", "defaultValue": "Posters for the public wall", "group": "Posters" },
      "poster2Word": { "dataType": "text", "displayName": "Poster 2 Word", "defaultValue": "PASTE", "group": "Posters" },
      "poster2Line": { "dataType": "text", "displayName": "Poster 2 Line", "defaultValue": "Wheat, water and a wide brush", "group": "Posters" },
      "poster3Word": { "dataType": "text", "displayName": "Poster 3 Word", "defaultValue": "PEEL", "group": "Posters" },
      "poster3Line": { "dataType": "text", "displayName": "Poster 3 Line", "defaultValue": "Every layer leaves a trace", "group": "Posters" },
      "poster4Word": { "dataType": "text", "displayName": "Poster 4 Word", "defaultValue": "AGAIN", "group": "Posters" },
      "poster4Line": { "dataType": "text", "displayName": "Poster 4 Line", "defaultValue": "The wall keeps the record", "group": "Posters" },
      "poster4Image": { "dataType": "text", "displayName": "Last Poster Image", "defaultValue": "https://picsum.photos/seed/architecture/900/700?grayscale", "group": "Posters" },
      "venue": { "dataType": "text", "displayName": "Venue Line", "defaultValue": "Hall 4 — Open late", "group": "Posters" },
      "wallColor": { "dataType": "color", "displayName": "Wall", "defaultValue": "#D9D6CF", "group": "Colors" },
      "paperColor": { "dataType": "color", "displayName": "Paper", "defaultValue": "#F3F2EF", "group": "Colors" },
      "paperBackColor": { "dataType": "color", "displayName": "Paper Back", "defaultValue": "#E6E2D9", "group": "Colors" },
      "inkColor": { "dataType": "color", "displayName": "Ink", "defaultValue": "#121211", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted", "defaultValue": "#6F6C66", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent", "defaultValue": "#D9480F", "group": "Colors" },
      "fontFamily": { "dataType": "select", "displayName": "Grotesk", "defaultValue": "Inter Tight", "options": ["Inter Tight", "Inter", "Helvetica Neue", "system-ui"], "group": "Typography" },
      "wordWeight": { "dataType": "select", "displayName": "Poster Word Weight", "defaultValue": "500", "options": ["300", "400", "500"], "group": "Typography" },
      "scrollLength": { "dataType": "select", "displayName": "Scroll Length (screens)", "defaultValue": "4", "options": ["3", "4", "5", "6"], "group": "Layout" },
      "wallTexture": { "dataType": "booleanValue", "displayName": "Wall Texture", "defaultValue": "true", "group": "Layout" },
      "showLabels": { "dataType": "booleanValue", "displayName": "Corner Labels", "defaultValue": "true", "group": "Layout" },
      "startLifted": { "dataType": "booleanValue", "displayName": "Corner Pre-lifted", "defaultValue": "true", "group": "Animation" },
      "smoothing": { "dataType": "select", "displayName": "Scrub Smoothing", "defaultValue": "0.14", "options": ["0.08", "0.14", "0.22", "1"], "group": "Animation", "description": "1 = locked to the scrollbar, lower = more glide" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const eyebrow = config?.eyebrow || 'Street Series / 2026';
  const title = config?.title || 'Layers on a public wall';
  const caption = config?.caption || 'Four sheets, pasted one over another. Scroll to peel them back.';
  const P = Math.min(4, Math.max(3, parseInt(config?.posterCount || '4', 10) || 4));
  const defs = [['PRINT', 'Posters for the public wall'], ['PASTE', 'Wheat, water and a wide brush'], ['PEEL', 'Every layer leaves a trace'], ['AGAIN', 'The wall keeps the record']];
  const posters = defs.map((d, i) => ({ word: String(config?.[`poster${i + 1}Word`] || d[0]).slice(0, 10), line: config?.[`poster${i + 1}Line`] || d[1] }));
  if (P === 3) posters.splice(2, 1);
  const image = config?.poster4Image || 'https://picsum.photos/seed/architecture/900/700?grayscale';
  const venue = config?.venue || 'Hall 4 — Open late';
  const wall = config?.wallColor || '#D9D6CF';
  const paper = config?.paperColor || '#F3F2EF';
  const paperBack = config?.paperBackColor || '#E6E2D9';
  const ink = config?.inkColor || '#121211';
  const muted = config?.mutedColor || '#6F6C66';
  const accent = config?.accentColor || '#D9480F';
  const fontFamily = config?.fontFamily || 'Inter Tight';
  const wordWeight = config?.wordWeight || '500';
  const screens = parseFloat(config?.scrollLength || '4') || 4;
  const wallTexture = bool(config?.wallTexture, true);
  const showLabels = bool(config?.showLabels, true);
  const startLifted = bool(config?.startLifted, true);
  const smoothing = Math.min(1, Math.max(0.02, parseFloat(config?.smoothing || '0.14')));

  const prefersReducedMotion = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const uid = React.useMemo(() => 'pp' + Math.random().toString(36).slice(2, 8), []);

  React.useEffect(() => {
    const id = 'ncs3-font-intertight-jbmono';
    if (typeof document === 'undefined' || document.getElementById(id)) return;
    const l = document.createElement('link');
    l.id = id; l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500;600&family=Inter:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap';
    document.head.appendChild(l);
  }, []);

  const sectionRef = React.useRef(null);
  const target = React.useRef(0);
  const current = React.useRef(0);
  const [progress, setProgress] = React.useState(prefersReducedMotion ? 1 : 0);
  const [stageH, setStageH] = React.useState(720);
  const [width, setWidth] = React.useState(1280);

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
    const onScroll = () => { read(); if (prefersReducedMotion) return; if (!raf) raf = requestAnimationFrame(tick); };
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
  }, [smoothing, prefersReducedMotion]);

  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const seg = (a, b) => clamp((progress - a) / (b - a));
  const easeIO = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
  const ease = (t) => 1 - Math.pow(1 - t, 3);

  const compact = width < 760;
  let ph = Math.round(stageH * (compact ? 0.6 : 0.8));
  let pw = Math.round(ph / 1.414);
  if (pw > width * 0.84) { pw = Math.round(width * 0.84); ph = Math.round(pw * 1.414); }
  const u = pw / 100;

  const mono = '"JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace';
  const sans = fontFamily === 'system-ui' ? 'system-ui, -apple-system, sans-serif' : `"${fontFamily}", "Inter", -apple-system, "Helvetica Neue", sans-serif`;
  const m = u * 6;
  const lab = Math.max(7, u * 2.3);
  const fitWord = (w, len, k = 0.64) => (w / (Math.max(1, len) * k));

  const monoRow = (items, color, extra) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: mono, fontSize: lab, letterSpacing: '0.1em', textTransform: 'uppercase', color, ...extra }}>
      {items.map((t, k) => <span key={k}>{t}</span>)}
    </div>
  );

  const composition = (i) => {
    const p = posters[i];
    const no = `No. ${String(i + 1).padStart(2, '0')}`;
    const kind = i === P - 1 ? 'D' : ['A', 'B', 'C'][i % 3];
    const base = { position: 'absolute', inset: 0, overflow: 'hidden', fontFamily: sans };
    if (kind === 'A') {
      const fs = Math.min(fitWord(pw - m * 1.6, p.word.length), ph * 0.3);
      return (
        <div style={{ ...base, background: paper, color: ink }}>
          <div style={{ position: 'absolute', right: -pw * 0.12, top: ph * 0.1, width: pw * 0.78, height: pw * 0.78, borderRadius: '50%', background: accent }} />
          {monoRow([no, venue, '2026'], ink, { position: 'absolute', left: m, right: m, top: m })}
          <div style={{ position: 'absolute', left: m, top: ph * 0.14, fontSize: u * 5.4, lineHeight: 1.02, letterSpacing: '-0.03em', fontWeight: 500, maxWidth: pw * 0.42 }}>{p.line}</div>
          <div style={{ position: 'absolute', left: m * 0.7, right: 0, top: ph * 0.62 - fs * 0.72, fontSize: fs, lineHeight: 0.78, fontWeight: wordWeight, letterSpacing: '-0.06em', whiteSpace: 'nowrap' }}>{p.word}</div>
          <div style={{ position: 'absolute', left: m, right: m, top: ph * 0.7, height: 1, background: ink }} />
          <div style={{ position: 'absolute', left: m, right: m, top: ph * 0.73, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: u * 3, fontFamily: mono, fontSize: lab, lineHeight: 1.6, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            <div>Doors<br />19:00</div><div>Entry<br />Free</div><div>Paper<br />A1 / 90g</div>
          </div>
          {monoRow(['Wheat paste', 'Sheet 1'], muted, { position: 'absolute', left: m, right: m, bottom: m })}
        </div>
      );
    }
    if (kind === 'B') {
      const fs = Math.min(fitWord(ph - m * 2, p.word.length, 0.66), pw * 0.52);
      return (
        <div style={{ ...base, background: ink, color: paper }}>
          <div style={{ position: 'absolute', left: m * 0.45, top: ph - m, width: ph - m * 2, transformOrigin: '0 0', transform: 'rotate(-90deg)', fontSize: fs, lineHeight: 0.8, fontWeight: wordWeight, letterSpacing: '-0.05em', whiteSpace: 'nowrap' }}>{p.word}</div>
          {monoRow([no, '2026'], paper, { position: 'absolute', left: pw * 0.56, right: m, top: m })}
          <div style={{ position: 'absolute', left: pw * 0.56, right: m, top: ph * 0.12, fontSize: u * 20, lineHeight: 0.8, letterSpacing: '-0.06em', fontWeight: 300, color: accent }}>{String(i + 1).padStart(2, '0')}</div>
          <div style={{ position: 'absolute', left: pw * 0.56, right: m, top: ph * 0.34, fontSize: u * 4.6, lineHeight: 1.05, letterSpacing: '-0.025em', fontWeight: 500 }}>{p.line}</div>
          <div style={{ position: 'absolute', left: pw * 0.56, right: m, bottom: m, fontFamily: mono, fontSize: lab, lineHeight: 1.75, letterSpacing: '0.06em', textTransform: 'uppercase', opacity: 0.8 }}>
            {['Brush', 'Paste', 'Smooth', 'Wait', 'Repeat'].map((t, k) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', borderTop: `1px solid rgba(243,242,239,0.25)` }}><span>{t}</span><span>{String(k + 1).padStart(2, '0')}</span></div>
            ))}
          </div>
        </div>
      );
    }
    if (kind === 'C') {
      const fs = Math.min(fitWord(pw - m * 1.4, p.word.length), ph * 0.34);
      return (
        <div style={{ ...base, background: paper, color: ink }}>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: ph * 0.52, background: accent }} />
          {monoRow([no, venue], paper, { position: 'absolute', left: m, right: m, top: m })}
          <div style={{ position: 'absolute', left: m * 0.6, top: ph * 0.52 - fs * 0.74, fontSize: fs, lineHeight: 0.78, fontWeight: wordWeight, letterSpacing: '-0.06em', color: paper, whiteSpace: 'nowrap' }}>{p.word}</div>
          <div style={{ position: 'absolute', left: m * 0.6, top: ph * 0.52, height: fs * 0.2, overflow: 'hidden', fontSize: fs, lineHeight: 0.78, fontWeight: wordWeight, letterSpacing: '-0.06em', color: ink, whiteSpace: 'nowrap' }}>
            <div style={{ transform: `translateY(${-fs * 0.74}px)` }}>{p.word}</div>
          </div>
          <div style={{ position: 'absolute', left: m, width: pw * 0.5, top: ph * 0.66, fontSize: u * 4.8, lineHeight: 1.05, letterSpacing: '-0.025em', fontWeight: 500 }}>{p.line}</div>
          <div style={{ position: 'absolute', right: m, top: ph * 0.66, width: pw * 0.3, fontFamily: mono, fontSize: lab, lineHeight: 1.6, letterSpacing: '0.05em', textTransform: 'uppercase', color: muted }}>Layer {String(i + 1).padStart(2, '0')} of {String(P).padStart(2, '0')}. Torn by hand, never by machine.</div>
          {monoRow(['Wheat paste', `Sheet ${i + 1}`], muted, { position: 'absolute', left: m, right: m, bottom: m })}
        </div>
      );
    }
    const fs = Math.min(fitWord(pw - m * 1.6, p.word.length), ph * 0.26);
    return (
      <div style={{ ...base, background: paper, color: ink }}>
        {monoRow([no, venue, 'Final'], ink, { position: 'absolute', left: m, right: m, top: m })}
        <div style={{ position: 'absolute', left: m * 0.7, top: ph * 0.08, fontSize: fs, lineHeight: 0.9, fontWeight: wordWeight, letterSpacing: '-0.06em', whiteSpace: 'nowrap' }}>{p.word}</div>
        <div style={{ position: 'absolute', left: m, right: m, top: ph * 0.08 + fs * 0.98, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div style={{ fontSize: u * 4.8, lineHeight: 1.05, letterSpacing: '-0.025em', fontWeight: 500, maxWidth: pw * 0.55 }}>{p.line}</div>
          <div style={{ width: u * 7, height: u * 7, borderRadius: '50%', background: accent, flex: 'none' }} />
        </div>
        <div style={{ position: 'absolute', left: m, right: m, top: ph * 0.46, bottom: m * 2.6, overflow: 'hidden', background: '#cfccc5' }}>
          <img src={image} alt="" draggable="false" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', mixBlendMode: 'multiply', filter: 'contrast(1.1)' }} />
        </div>
        {monoRow(['Wheat paste', `Sheet ${i + 1}`, 'Fin'], muted, { position: 'absolute', left: m, right: m, bottom: m })}
      </div>
    );
  };

  const comps = React.useMemo(() => posters.map((_, i) => composition(i)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pw, ph, P, paper, ink, muted, accent, sans, wordWeight, image, venue, JSON.stringify(posters)]);

  // peel geometry per poster: corner, direction across the sheet
  const corners = [[pw, 0, -1, 0.82], [pw, ph, -1, -0.9], [0, 0, 1, 0.86]];
  const off = [[0, 0, -0.5], [7, -5, 0.9], [-6, 6, -1.1], [5, 9, 0.5]];
  const peels = P - 1;
  const t0 = 0.05, t1 = 0.93;
  const slot = (t1 - t0) / peels;
  const peelT = Array.from({ length: peels }, (_, i) => seg(t0 + i * slot + slot * 0.06, t0 + (i + 1) * slot - slot * 0.1));
  let active = peelT.findIndex((t) => t < 1);
  if (active < 0) active = peels;

  const clipHalf = (C, uu, d, keepPos) => {
    const rect = [[0, 0], [pw, 0], [pw, ph], [0, ph]];
    const g = (q) => ((q[0] - C[0]) * uu[0] + (q[1] - C[1]) * uu[1] - d) * (keepPos ? 1 : -1);
    const out = [];
    for (let k = 0; k < 4; k++) {
      const a = rect[k], b = rect[(k + 1) % 4];
      const ga = g(a), gb = g(b);
      if (ga >= 0) out.push(a);
      if ((ga >= 0) !== (gb >= 0)) {
        const t = ga / (ga - gb);
        out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
      }
    }
    return out;
  };
  const poly = (pts) => (pts.length < 3 ? 'polygon(0 0, 0 0, 0 0)' : `polygon(${pts.map((q) => `${q[0].toFixed(2)}px ${q[1].toFixed(2)}px`).join(', ')})`);

  const peelState = (i) => {
    const cfg = corners[i % corners.length];
    const C = [cfg[0], cfg[1]];
    const len = Math.hypot(cfg[2], cfg[3]);
    const uu = [cfg[2] / len, cfg[3] / len];
    const corners4 = [[0, 0], [pw, 0], [pw, ph], [0, ph]];
    const D = Math.max(...corners4.map((q) => (q[0] - C[0]) * uu[0] + (q[1] - C[1]) * uu[1]));
    const raw = peelT[i];
    const pre = (startLifted && !prefersReducedMotion) ? (i === 0 ? 0.075 : 0.03 * ease(clamp((progress - (t0 + i * slot)) / (slot * 0.06)))) : 0;
    const dn = pre + (1.06 - pre) * easeIO(raw);
    return { C, uu, D, d: D * dn, dn, raw };
  };

  const textureId = `${uid}-noise`;

  const renderPoster = (i) => {
    const [ox, oy, rot] = off[i];
    const isPeeling = i < peels;
    const st = isPeeling ? peelState(i) : null;
    const gone = st && st.dn >= 1.05;
    if (gone) return null;
    const lifted = st && st.d > 0.5;
    let remainClip = 'none', flap = null, under = null, bend = null;
    if (lifted) {
      const { C, uu, d } = st;
      remainClip = poly(clipHalf(C, uu, d, true));
      const peeledPts = clipHalf(C, uu, d, false);
      const k = C[0] * uu[0] + C[1] * uu[1] + d;
      const a = 1 - 2 * uu[0] * uu[0], b = -2 * uu[0] * uu[1], dd = 1 - 2 * uu[1] * uu[1];
      const e = 2 * k * uu[0], f2 = 2 * k * uu[1];
      // gradient along -u (fold line -> corner) inside the flap's own box
      const ang = Math.atan2(-uu[0], uu[1]);
      const dir = [Math.sin(ang), -Math.cos(ang)];
      const L = Math.abs(pw * dir[0]) + Math.abs(ph * dir[1]);
      const tAt = (q) => (((q[0] - pw / 2) * dir[0] + (q[1] - ph / 2) * dir[1]) / L) * 100 + 50;
      const P0 = [C[0] + d * uu[0], C[1] + d * uu[1]];
      const tf = tAt(P0), tc = tAt(C);
      const span = tc - tf;
      const at = (r) => (tf + span * r).toFixed(2);
      const fade = clamp((st.dn - 0.74) / 0.24);
      const angDeg = (ang * 180) / Math.PI;
      const shadowLen = Math.min(d, 26 + d * 0.12);
      flap = (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 1 - fade, filter: `drop-shadow(${3 + d * 0.02}px ${6 + d * 0.035}px ${8 + d * 0.04}px rgba(18,18,17,0.28))`, transform: `translate(${-uu[0] * fade * 40}px, ${-uu[1] * fade * 40}px)` }}>
          <div style={{ position: 'absolute', left: 0, top: 0, width: pw, height: ph, transformOrigin: '0 0', transform: `matrix(${a}, ${b}, ${b}, ${dd}, ${e}, ${f2})`, clipPath: poly(peeledPts), background: paperBack, overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.05, filter: 'grayscale(1) blur(0.6px)' }}>{comps[i]}</div>
            <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(${angDeg}deg, rgba(255,255,255,0) ${at(0)}%, rgba(255,255,255,0.55) ${at(0.06)}%, rgba(255,255,255,0.12) ${at(0.3)}%, rgba(0,0,0,0.04) ${at(0.75)}%, rgba(0,0,0,0.1) ${at(1)}%)` }} />
          </div>
        </div>
      );
      under = (
        <div style={{ position: 'absolute', left: 0, top: 0, width: pw, height: ph, clipPath: poly(peeledPts), pointerEvents: 'none', background: `linear-gradient(${angDeg}deg, rgba(18,18,17,${0.34 - 0.2 * fade}) ${tf.toFixed(2)}%, rgba(18,18,17,0.1) ${(tf + ((shadowLen * 0.35) / L) * 100).toFixed(2)}%, rgba(18,18,17,0) ${(tf + (shadowLen / L) * 100).toFixed(2)}%)` }} />
      );
      bend = (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', clipPath: remainClip, background: `linear-gradient(${angDeg}deg, rgba(0,0,0,0.12) ${tf.toFixed(2)}%, rgba(0,0,0,0) ${(tf - (14 / L) * 100).toFixed(2)}%)` }} />
      );
    }
    return (
      <div key={i} style={{ position: 'absolute', left: -pw / 2 + ox, top: -ph / 2 + oy, width: pw, height: ph, transform: `rotate(${rot}deg)`, zIndex: P - i }}>
        {under}
        <div style={{ position: 'absolute', inset: 0, clipPath: remainClip, boxShadow: '0 1px 2px rgba(0,0,0,0.12)' }}>
          {comps[i]}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(115deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.12) 38%, rgba(0,0,0,0.035) 44%, rgba(255,255,255,0) 52%), linear-gradient(170deg, rgba(0,0,0,0.04), rgba(0,0,0,0) 30%, rgba(0,0,0,0.03) 80%)' }} />
          {wallTexture && <svg aria-hidden="true" width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.1, mixBlendMode: 'multiply' }}><rect width="100%" height="100%" filter={`url(#${textureId})`} /></svg>}
        </div>
        {bend}
        {flap}
      </div>
    );
  };

  const pad = compact ? 20 : 48;
  const shown = Math.min(P, active + 1);
  const curT = active < peels ? peelT[active] : 1;
  const sceneX = compact ? width / 2 : width * 0.5;
  const sceneY = compact ? stageH * 0.56 : stageH * 0.52;

  return (
    <section ref={sectionRef} className="poster-peel" aria-label={title}
      style={{ position: 'relative', width: '100%', height: `${Math.round(stageH * screens)}px`, backgroundColor: wall, color: ink, fontFamily: sans }}>
      <div style={{ position: 'sticky', top: 0, height: `${stageH}px`, overflow: 'hidden' }}>
        <svg aria-hidden="true" width="0" height="0" style={{ position: 'absolute' }}>
          <defs>
            <filter id={textureId} x="0" y="0" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0.55 0" />
            </filter>
            <filter id={`${uid}-wall`} x="0" y="0" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves="4" seed="3" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.3  0 0 0 0 0.3  0 0 0 0 0.28  0 0 0 0.5 0" />
            </filter>
          </defs>
        </svg>
        {wallTexture && (
          <svg aria-hidden="true" width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.35, mixBlendMode: 'multiply' }}>
            <rect width="100%" height="100%" filter={`url(#${uid}-wall)`} />
            <rect width="100%" height="100%" filter={`url(#${textureId})`} opacity="0.5" />
          </svg>
        )}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(80% 70% at 45% 35%, rgba(255,255,255,0.35), rgba(255,255,255,0) 70%), linear-gradient(180deg, rgba(0,0,0,0) 70%, rgba(0,0,0,0.06))' }} />

        {showLabels && (
          <div style={{ position: 'absolute', top: compact ? 22 : 40, left: pad, zIndex: 20, maxWidth: compact ? width - pad * 2 : (width - pw) / 2 - pad - 24 }}>
            <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: muted, marginBottom: 10 }}>{eyebrow}</div>
            <h2 style={{ margin: 0, fontWeight: 500, fontSize: compact ? 26 : 34, lineHeight: 1, letterSpacing: '-0.035em' }}>{title}</h2>
            {!compact && <p style={{ margin: '16px 0 0', fontSize: 14, lineHeight: 1.45, color: muted, maxWidth: 260 }}>{caption}</p>}
          </div>
        )}

        <div role="img" aria-label={`Poster ${shown} of ${P}: ${posters[shown - 1].word}, ${posters[shown - 1].line}`}
          style={{ position: 'absolute', left: sceneX, top: sceneY, width: 0, height: 0 }}>
          <div aria-hidden="true" style={{ position: 'absolute', left: -pw / 2 - 10, top: -ph / 2 - 6, width: pw + 22, height: ph + 20, background: 'rgba(18,18,17,0.10)', filter: 'blur(14px)' }} />
          {posters.map((_, i) => renderPoster(i)).reverse()}
        </div>

        {showLabels && (
          <div aria-live="polite" style={{ position: 'absolute', left: pad, bottom: compact ? 22 : 40, zIndex: 20, fontFamily: mono }}>
            <div style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: muted }}>Layer</div>
            <div style={{ fontSize: compact ? 13 : 14, marginTop: 6, letterSpacing: '0.04em', fontVariantNumeric: 'tabular-nums' }}>
              {String(shown).padStart(2, '0')} <span style={{ color: muted }}>/ {String(P).padStart(2, '0')}</span>
            </div>
            <div style={{ marginTop: 10, display: 'flex', gap: 4 }}>
              {peelT.map((t, j) => (
                <div key={j} style={{ width: compact ? 20 : 28, height: 2, background: muted, opacity: 0.35, position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: 0, background: j === active ? accent : ink, transformOrigin: 'left', transform: `scaleX(${t})` }} />
                </div>
              ))}
            </div>
          </div>
        )}
        {showLabels && (
          <div style={{ position: 'absolute', right: pad, bottom: compact ? 22 : 40, zIndex: 20, fontFamily: mono, fontSize: 11, letterSpacing: '0.14em', color: muted, textAlign: 'right', textTransform: 'uppercase', lineHeight: 1.7 }}>
            <div>{active < peels ? 'Peeling' : 'Bare layer'}</div>
            <div style={{ color: ink, fontVariantNumeric: 'tabular-nums' }}>{String(Math.round(curT * 100)).padStart(3, '0')}%</div>
          </div>
        )}
        {showLabels && !compact && (
          <div style={{ position: 'absolute', right: pad, top: 40, zIndex: 20, fontFamily: mono, fontSize: 11, letterSpacing: '0.14em', color: muted, textAlign: 'right', textTransform: 'uppercase', lineHeight: 1.7 }}>
            {posters.map((p, j) => (
              <div key={j} style={{ color: j === shown - 1 ? ink : muted, opacity: j < shown - 1 ? 0.45 : 1, textDecoration: j < shown - 1 ? 'line-through' : 'none' }}>
                {String(j + 1).padStart(2, '0')} {p.word}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

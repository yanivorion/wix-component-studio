const MANIFEST = {
  "type": "Scrub.PaperFold",
  "description": "A folded broadside unfolds in real 3D as you scroll: hinged paper panels swing open one by one with crease shading, then settle flat to reveal a poster whose type spans every fold",
  "editorElement": {
    "selector": ".paper-fold",
    "displayName": "Paper Fold",
    "archetype": "container",
    "data": {
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Broadside / No. 05", "group": "Content" },
      "title": { "dataType": "text", "displayName": "Title", "defaultValue": "A poster that fits in a pocket", "group": "Content" },
      "coverTitle": { "dataType": "text", "displayName": "Cover Title", "defaultValue": "Folded Matter", "group": "Content" },
      "posterWord": { "dataType": "text", "displayName": "Poster Word", "defaultValue": "UNFOLD", "group": "Content", "description": "Large type that spans every crease (up to 12 letters)" },
      "posterCaption": { "dataType": "text", "displayName": "Poster Caption", "defaultValue": "One sheet, printed both sides, folded by hand", "group": "Content" },
      "panel1Text": { "dataType": "text", "displayName": "Panel 1 Text", "defaultValue": "Paper remembers every crease it is given.", "group": "Panels" },
      "panel2Text": { "dataType": "text", "displayName": "Panel 2 Text", "defaultValue": "The first hinge turns a page into a horizon.", "group": "Panels" },
      "panel3Text": { "dataType": "text", "displayName": "Panel 3 Text", "defaultValue": "Type crosses the gutter without asking.", "group": "Panels" },
      "panel4Text": { "dataType": "text", "displayName": "Panel 4 Text", "defaultValue": "Each fold doubles the surface it hides.", "group": "Panels" },
      "panel5Text": { "dataType": "text", "displayName": "Panel 5 Text", "defaultValue": "Flat again, the whole is larger than its parts.", "group": "Panels" },
      "panel6Text": { "dataType": "text", "displayName": "Panel 6 Text", "defaultValue": "Fold it back. It will remember.", "group": "Panels" },
      "panelCount": { "dataType": "select", "displayName": "Panels", "defaultValue": "5", "options": ["4", "5", "6"], "group": "Layout" },
      "foldStyle": { "dataType": "select", "displayName": "Fold Style", "defaultValue": "accordion", "options": ["accordion", "gatefold"], "group": "Layout" },
      "orientation": { "dataType": "select", "displayName": "Fold Direction", "defaultValue": "auto", "options": ["auto", "horizontal", "vertical"], "group": "Layout", "description": "Auto folds vertically on narrow screens" },
      "scrollLength": { "dataType": "select", "displayName": "Scroll Length (screens)", "defaultValue": "4", "options": ["3", "4", "5", "6"], "group": "Layout" },
      "showReadout": { "dataType": "booleanValue", "displayName": "Fold Readout", "defaultValue": "true", "group": "Layout" },
      "showMarks": { "dataType": "booleanValue", "displayName": "Printer's Marks", "defaultValue": "true", "group": "Layout" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#E7E5E4", "group": "Colors" },
      "paperColor": { "dataType": "color", "displayName": "Paper", "defaultValue": "#FAFAF9", "group": "Colors" },
      "paperBackColor": { "dataType": "color", "displayName": "Paper Reverse", "defaultValue": "#D6D3D1", "group": "Colors" },
      "inkColor": { "dataType": "color", "displayName": "Ink", "defaultValue": "#1C1917", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#78716C", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent Disc", "defaultValue": "#C2410C", "group": "Colors" },
      "displayFont": { "dataType": "select", "displayName": "Display Font", "defaultValue": "Fraunces", "options": ["Fraunces", "Instrument Serif", "Inter", "Georgia"], "group": "Typography" },
      "displayWeight": { "dataType": "select", "displayName": "Display Weight", "defaultValue": "300", "options": ["300", "400", "500"], "group": "Typography" },
      "fontFamily": { "dataType": "select", "displayName": "Text Font", "defaultValue": "Inter", "options": ["Inter", "system-ui", "Helvetica Neue", "Georgia"], "group": "Typography" },
      "tilt": { "dataType": "select", "displayName": "Closed Tilt", "defaultValue": "medium", "options": ["none", "subtle", "medium", "dramatic"], "group": "Animation" },
      "settle": { "dataType": "booleanValue", "displayName": "Settle Bounce", "defaultValue": "true", "group": "Animation" },
      "smoothing": { "dataType": "select", "displayName": "Scrub Smoothing", "defaultValue": "0.14", "options": ["0.08", "0.14", "0.22", "1"], "group": "Animation", "description": "1 = locked to the scrollbar, lower = more glide" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const eyebrow = config?.eyebrow || 'Broadside / No. 05';
  const title = config?.title || 'A poster that fits in a pocket';
  const coverTitle = config?.coverTitle || 'Folded Matter';
  const word = String(config?.posterWord || 'UNFOLD').slice(0, 12);
  const caption = config?.posterCaption || 'One sheet, printed both sides, folded by hand';
  const N = Math.min(6, Math.max(4, parseInt(config?.panelCount || '5', 10) || 5));
  const foldStyle = config?.foldStyle === 'gatefold' ? 'gatefold' : 'accordion';
  const orientation = config?.orientation || 'auto';
  const screens = parseFloat(config?.scrollLength || '4') || 4;
  const showReadout = bool(config?.showReadout, true);
  const showMarks = bool(config?.showMarks, true);
  const bg = config?.backgroundColor || '#E7E5E4';
  const paper = config?.paperColor || '#FAFAF9';
  const paperBack = config?.paperBackColor || '#D6D3D1';
  const ink = config?.inkColor || '#1C1917';
  const muted = config?.mutedColor || '#78716C';
  const accent = config?.accentColor || '#C2410C';
  const displayFont = config?.displayFont || 'Fraunces';
  const displayWeight = config?.displayWeight || '300';
  const fontFamily = config?.fontFamily || 'Inter';
  const tiltAmt = { none: 0, subtle: 0.5, medium: 1, dramatic: 1.5 }[config?.tilt || 'medium'] ?? 1;
  const settle = bool(config?.settle, true);
  const smoothing = Math.min(1, Math.max(0.02, parseFloat(config?.smoothing || '0.14')));

  const textDefaults = [
    'Paper remembers every crease it is given.', 'The first hinge turns a page into a horizon.',
    'Type crosses the gutter without asking.', 'Each fold doubles the surface it hides.',
    'Flat again, the whole is larger than its parts.', 'Fold it back. It will remember.'
  ];
  const texts = textDefaults.map((d, i) => config?.[`panel${i + 1}Text`] || d);

  const prefersReducedMotion = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  React.useEffect(() => {
    const id = 'ncs-font-fraunces-inter';
    if (typeof document === 'undefined' || document.getElementById(id)) return;
    const l = document.createElement('link');
    l.id = id; l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..500&family=Instrument+Serif&family=Inter:wght@300;400;500&display=swap';
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
    const onScroll = () => { read(); if (!raf && !prefersReducedMotion) raf = requestAnimationFrame(tick); };
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

  const clamp = (v) => Math.min(1, Math.max(0, v));
  const seg = (a, b) => clamp((progress - a) / (b - a));
  const ease = (t) => 1 - Math.pow(1 - t, 3);
  const easeIO = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const backOut = (t) => { const c1 = 2.2, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); };
  const lerp = (a, b, t) => a + (b - a) * t;

  const compact = width < 760;
  const vertical = orientation === 'vertical' || (orientation === 'auto' && width < 700);

  // panel geometry: final flat poster must fit the stage
  let pw, ph;
  if (vertical) {
    pw = Math.min(width * 0.86, 520);
    ph = Math.min((stageH * 0.62) / N, pw * 0.42);
  } else {
    pw = Math.min((width * 0.86) / N, (stageH * 0.6) / 1.5);
    ph = pw * 1.5;
  }
  pw = Math.round(pw); ph = Math.round(ph);
  const L = vertical ? ph : pw;
  const posterW = vertical ? pw : pw * N;
  const posterH = vertical ? ph * N : ph;

  // fold topology: parent, side (+1 after / -1 before), folded hinge angle, unfold order
  const topo = React.useMemo(() => {
    const parent = new Array(N).fill(-1);
    const side = new Array(N).fill(0);
    const folded = new Array(N).fill(0);
    let root = 0;
    const order = [];
    const covers = [];
    if (foldStyle === 'accordion') {
      for (let i = 1; i < N; i++) { parent[i] = i - 1; side[i] = 1; folded[i] = i % 2 ? 176 : -176; order.push(i); }
    } else {
      const centre = N % 2 === 0 ? 2 : 1;
      const left = Math.floor((N - centre) / 2);
      root = left;
      if (centre === 2) { parent[left + 1] = left; side[left + 1] = 1; }
      const rStart = left + centre;
      const depth = Math.max(left, N - rStart);
      for (let i = rStart; i < N; i++) { parent[i] = i - 1; side[i] = 1; folded[i] = i === rStart ? -179 : -176; }
      for (let i = left - 1; i >= 0; i--) { parent[i] = i + 1; side[i] = -1; folded[i] = i === left - 1 ? 176 : 172; }
      if (left > 0) covers.push(left - 1);
      if (rStart < N) covers.push(rStart);
      for (let d = 0; d < depth; d++) {
        if (left - 1 - d >= 0) order.push(left - 1 - d);
        if (rStart + d < N) order.push(rStart + d);
      }
    }
    return { parent, side, folded, root, order, covers };
  }, [N, foldStyle]);

  const K = topo.order.length;
  const step = 0.74 / (K + 0.7);
  const angles = new Array(N).fill(0);
  const hingeT = new Array(N).fill(1);
  topo.order.forEach((p, j) => {
    const a = 0.05 + j * step;
    const t = easeIO(seg(a, a + step * 1.7));
    hingeT[p] = t;
    angles[p] = topo.folded[p] * (1 - t);
  });
  let activeIdx = topo.order.findIndex((p) => hingeT[p] < 1);
  if (activeIdx < 0) activeIdx = K;

  // 1D projection along the fold axis, for centring and the table shadow
  const cum = new Array(N).fill(0);
  const far = new Array(N).fill(0);
  const visit = (i) => {
    const p = topo.parent[i];
    if (p < 0) { cum[i] = 0; far[i] = L; return; }
    const hinge = topo.side[i] > 0 ? (p === topo.root ? L : far[p]) : (p === topo.root ? 0 : far[p]);
    cum[i] = cum[p] + angles[i];
    far[i] = hinge + topo.side[i] * L * Math.cos((cum[i] * Math.PI) / 180);
  };
  const seq = [];
  const pushTree = (i) => { seq.push(i); for (let c = 0; c < N; c++) if (topo.parent[c] === i) pushTree(c); };
  pushTree(topo.root);
  seq.forEach(visit);
  let mn = 0, mx = L;
  seq.forEach((i) => { if (i !== topo.root) { mn = Math.min(mn, far[i]); mx = Math.max(mx, far[i]); } });
  const centreOff = -(mn + mx) / 2;
  const span = mx - mn;

  const unfold = ease(seg(0.04, 0.8));
  const closedSpan = foldStyle === 'gatefold' && N % 2 === 0 ? 2 * L : L;
  const s0 = vertical ? Math.min(1.2, (width * 0.86) / pw) : Math.min(1.5, (width * 0.5) / closedSpan, (stageH * 0.6) / ph);
  const settleT = settle ? backOut(seg(0.8, 0.97)) : ease(seg(0.8, 0.97));
  const scale = lerp(s0, 1, unfold);
  const tiltX = lerp(24 * tiltAmt, 7 * tiltAmt, unfold) * (1 - settleT);
  const tiltY = lerp(-18 * tiltAmt, 0, unfold);
  const tiltZ = lerp(-5 * tiltAmt, 0, unfold);

  const mono = 'ui-monospace, "SF Mono", "IBM Plex Mono", Menlo, monospace';
  const sans = fontFamily === 'Georgia' ? 'Georgia, serif' : `${fontFamily}, -apple-system, "Helvetica Neue", sans-serif`;
  const display = displayFont === 'Georgia' ? 'Georgia, serif' : displayFont === 'Inter'
    ? 'Inter, -apple-system, "Helvetica Neue", sans-serif' : `"${displayFont}", Georgia, "Times New Roman", serif`;

  const pad = Math.max(12, Math.round(L * (vertical ? 0.12 : 0.075)));
  const numSize = vertical ? 10 : Math.max(9, Math.round(pw * 0.048));
  const textSize = vertical ? 12 : Math.max(10, Math.min(14, Math.round(pw * 0.058)));
  const coverSize = vertical ? 22 : Math.max(18, Math.round(pw * 0.135));

  // big word metrics
  const wordLen = Math.max(1, word.length);
  const wFs = vertical
    ? Math.min(pw * 0.42, (posterH * 0.9) / (wordLen * 0.66))
    : Math.min(posterH * 0.46, (posterW * 0.92) / (wordLen * 0.66));
  const wordSpan = vertical ? posterH * 0.92 : posterW * 0.93;

  const composition = () => (
    <div style={{ position: 'absolute', left: 0, top: 0, width: posterW, height: posterH }}>
      <svg width={posterW} height={posterH} viewBox={`0 0 ${posterW} ${posterH}`} aria-hidden="true" style={{ position: 'absolute', inset: 0, display: 'block' }}>
        <circle
          cx={vertical ? posterW * 0.66 : posterW * 0.6 - pw * 0.08}
          cy={vertical ? posterH * 0.63 : posterH * 0.38}
          r={vertical ? pw * 0.15 : ph * 0.17}
          fill={accent} />
        {vertical ? (
          <line x1={posterW * 0.66} y1={0} x2={posterW * 0.66} y2={posterH} stroke={ink} strokeWidth="0.75" />
        ) : (
          <line x1={0} y1={posterH * 0.56} x2={posterW} y2={posterH * 0.56} stroke={ink} strokeWidth="0.75" />
        )}
        {vertical ? (
          <text x={0} y={0} transform={`translate(${posterW - pad * 0.6 - wFs * 0.74} ${posterH * 0.04}) rotate(90)`}
            fontFamily={display} fontWeight={displayWeight} fontSize={wFs} fill={ink}
            textLength={wordSpan} lengthAdjust="spacing" style={{ letterSpacing: '-0.02em' }}>{word}</text>
        ) : (
          <text x={posterW * 0.035} y={posterH - pad * 0.9} fontFamily={display} fontWeight={displayWeight} fontSize={wFs} fill={ink}
            textLength={wordSpan} lengthAdjust="spacing" style={{ letterSpacing: '-0.02em' }}>{word}</text>
        )}
        {showMarks && Array.from({ length: N - 1 }, (_, k) => {
          const p = (k + 1) * L;
          return vertical ? (
            <g key={k} stroke={muted} strokeWidth="0.75">
              <line x1={0} y1={p} x2={7} y2={p} /><line x1={posterW - 7} y1={p} x2={posterW} y2={p} />
            </g>
          ) : (
            <g key={k} stroke={muted} strokeWidth="0.75">
              <line x1={p} y1={0} x2={p} y2={7} /><line x1={p} y1={posterH - 7} x2={p} y2={posterH} />
            </g>
          );
        })}
      </svg>
      {Array.from({ length: N }, (_, i) => {
        const ox = vertical ? 0 : i * pw;
        const oy = vertical ? i * ph : 0;
        const boxW = vertical ? pw * 0.6 - pad : pw - pad * 2;
        return (
          <div key={i} style={{ position: 'absolute', left: ox + pad, top: oy + (vertical ? pad * 0.55 : pad), width: boxW, color: ink }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: mono, fontSize: numSize, letterSpacing: '0.12em', color: muted }}>
              <span>{String(i + 1).padStart(2, '0')}</span>
              {!vertical && <span>/{String(N).padStart(2, '0')}</span>}
            </div>
            {i === 0 && (
              <div style={{ fontFamily: display, fontWeight: displayWeight, fontSize: coverSize, lineHeight: 1.02, letterSpacing: '-0.02em', marginTop: vertical ? 4 : pad * 0.6 }}>{coverTitle}</div>
            )}
            <div style={{ fontFamily: sans, fontSize: textSize, lineHeight: 1.4, marginTop: i === 0 ? (vertical ? 4 : 8) : (vertical ? 6 : pad * 0.6), color: i === 0 ? muted : ink, fontWeight: 400, maxWidth: vertical ? pw * 0.48 : '100%' }}>
              {texts[i]}
            </div>
            {i === N - 1 && !vertical && (
              <div style={{ position: 'absolute', top: posterH * 0.56 - pad - 30, left: 0, right: 0, fontFamily: mono, fontSize: numSize, letterSpacing: '0.08em', color: muted, textAlign: 'right', lineHeight: 1.4 }}>{caption}</div>
            )}
          </div>
        );
      })}
    </div>
  );

  const shade = (deg) => {
    const c = Math.cos((deg * Math.PI) / 180);
    const s = Math.sin((deg * Math.PI) / 180);
    return Math.max(0, 0.32 * (1 - Math.abs(c)) + 0.1 * Math.max(0, -s));
  };

  const facePanel = (i) => {
    const kids = [];
    for (let c = 0; c < N; c++) if (topo.parent[c] === i) kids.push(c);
    const isRoot = i === topo.root;
    const a = angles[i];
    const sd = topo.side[i];
    let pos = { left: 0, top: 0 };
    let origin = 'center center';
    let transform = 'none';
    const lifted = foldStyle === 'gatefold' && topo.covers[0] === i ? 10 * (1 - hingeT[i]) : 0;
    if (!isRoot) {
      if (vertical) {
        pos = { left: 0, top: sd > 0 ? ph : -ph };
        origin = sd > 0 ? 'center top' : 'center bottom';
        transform = `translateZ(${lifted}px) rotateX(${-a}deg)`;
      } else {
        pos = { left: sd > 0 ? pw : -pw, top: 0 };
        origin = sd > 0 ? 'left center' : 'right center';
        transform = `translateZ(${lifted}px) rotateY(${a}deg)`;
      }
    }
    const nearDeg = Math.abs(a);
    let farDeg = 0;
    kids.forEach((k) => { farDeg = Math.max(farDeg, Math.abs(angles[k])); });
    const nearStr = isRoot ? 0 : Math.min(1, nearDeg / 120);
    const farStr = Math.min(1, farDeg / 120);
    const nearSide = isRoot ? 0 : sd;
    const dir = vertical ? '180deg' : '90deg';
    const lead = nearSide > 0 ? nearStr : farStr;
    const trail = nearSide > 0 ? farStr : nearStr;
    const crease = `linear-gradient(${dir}, rgba(0,0,0,${0.34 * lead}) 0%, rgba(0,0,0,${0.08 * lead}) 16%, rgba(0,0,0,0) 34%, rgba(0,0,0,0) 66%, rgba(0,0,0,${0.08 * trail}) 84%, rgba(0,0,0,${0.34 * trail}) 100%)`;
    const memory = `linear-gradient(${dir}, rgba(0,0,0,0.045) 0px, rgba(255,255,255,0) 6px, rgba(255,255,255,0) calc(100% - 6px), rgba(0,0,0,0.045) 100%)`;
    const flatShade = shade(cum[i]);
    const backShade = Math.max(0, 0.22 * (1 - Math.abs(Math.cos((cum[i] * Math.PI) / 180))));
    const isCoverBack = topo.covers.indexOf(i) >= 0;
    const faceBase = {
      position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', overflow: 'hidden'
    };
    return (
      <div key={i} style={{ position: 'absolute', ...pos, width: pw, height: ph, transformStyle: 'preserve-3d', transformOrigin: origin, transform }}>
        <div style={{ ...faceBase, background: paper }}>
          <div style={{ position: 'absolute', left: vertical ? 0 : -i * pw, top: vertical ? -i * ph : 0 }}>{composition()}</div>
          <div style={{ position: 'absolute', inset: 0, background: memory }} />
          <div style={{ position: 'absolute', inset: 0, background: crease }} />
          <div style={{ position: 'absolute', inset: 0, background: '#000', opacity: flatShade }} />
        </div>
        <div style={{ ...faceBase, background: paperBack, transform: vertical ? 'rotateX(180deg)' : 'rotateY(180deg)' }}>
          {isCoverBack ? (
            <div style={{ position: 'absolute', inset: pad, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: ink, textAlign: sd < 0 ? 'left' : 'right' }}>
              <div style={{ fontFamily: mono, fontSize: numSize, letterSpacing: '0.14em', color: muted, textTransform: 'uppercase' }}>{sd < 0 ? eyebrow : `${N} panels`}</div>
              <div style={{ fontFamily: display, fontWeight: displayWeight, fontSize: coverSize * 1.05, lineHeight: 1, letterSpacing: '-0.02em' }}>{sd < 0 ? coverTitle : word}</div>
            </div>
          ) : (
            <div style={{ position: 'absolute', left: pad, bottom: pad * 0.8, fontFamily: mono, fontSize: numSize, letterSpacing: '0.14em', color: muted }}>
              {String(i + 1).padStart(2, '0')} — VERSO
            </div>
          )}
          <div style={{ position: 'absolute', inset: 0, background: crease, opacity: 0.8 }} />
          <div style={{ position: 'absolute', inset: 0, background: '#000', opacity: backShade }} />
        </div>
        {kids.map((k) => facePanel(k))}
      </div>
    );
  };

  const tx = vertical ? -pw / 2 : centreOff;
  const ty = vertical ? centreOff : -ph / 2;
  const sceneY = compact ? stageH * 0.53 : stageH * 0.52;
  const shadowW = (vertical ? pw : span) * scale;
  const shadowH = (vertical ? span : ph) * scale;
  const lift = 1 - unfold;

  const activeHinge = activeIdx < K ? topo.order[activeIdx] : -1;
  const activeAngle = activeHinge >= 0 ? Math.abs(angles[activeHinge]) : 0;
  const foldsOpen = topo.order.filter((p) => hingeT[p] >= 0.999).length;

  return (
    <section ref={sectionRef} className="paper-fold" aria-label={`${title}: ${coverTitle}`}
      style={{ position: 'relative', width: '100%', height: `${Math.round(stageH * screens)}px`, backgroundColor: bg, color: ink, fontFamily: sans }}>
      <div style={{ position: 'sticky', top: 0, height: `${stageH}px`, overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: `radial-gradient(120% 80% at 50% 45%, rgba(255,255,255,0.35), rgba(255,255,255,0) 60%)` }} />

        <div style={{ position: 'absolute', top: compact ? 22 : 44, left: compact ? 20 : 56, right: compact ? 20 : 'auto', maxWidth: compact ? 'none' : 600, zIndex: 3 }}>
          <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: muted, marginBottom: compact ? 8 : 14 }}>{eyebrow}</div>
          <h2 style={{ margin: 0, fontFamily: display, fontSize: compact ? 26 : 40, lineHeight: 1.04, fontWeight: displayWeight, letterSpacing: '-0.02em' }}>{title}</h2>
        </div>

        <div aria-hidden="true" style={{
          position: 'absolute', left: '50%', top: sceneY + shadowH * 0.5 * (vertical ? 0.2 : 0.35) + 18 * lift,
          width: shadowW * 1.02, height: shadowH * (vertical ? 1 : 0.7), transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(closest-side, rgba(28,25,23,0.32), rgba(28,25,23,0.12) 60%, rgba(28,25,23,0) 100%)',
          filter: `blur(${14 + lift * 16}px)`, opacity: 0.75 + lift * 0.15
        }} />

        <div role="img" aria-label={`${N}-panel ${foldStyle} poster reading ${word}`}
          style={{ position: 'absolute', left: '50%', top: sceneY, width: 0, height: 0, perspective: `${Math.round(Math.max(1400, width * 1.4))}px` }}>
          <div style={{
            position: 'absolute', left: 0, top: 0, transformStyle: 'preserve-3d',
            transform: `scale(${scale}) rotateX(${tiltX}deg) rotateY(${tiltY}deg) rotateZ(${tiltZ}deg)`
          }}>
            <div style={{ position: 'absolute', left: tx, top: ty, width: pw, height: ph, transformStyle: 'preserve-3d' }}>
              {facePanel(topo.root)}
            </div>
          </div>
        </div>

        {showReadout && (
          <div aria-live="polite" style={{ position: 'absolute', left: compact ? 20 : 56, bottom: compact ? 20 : 44, zIndex: 3, fontFamily: mono }}>
            <div style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: muted }}>{foldStyle === 'gatefold' ? 'Gate fold' : 'Accordion fold'}</div>
            <div style={{ fontSize: compact ? 13 : 15, marginTop: 6, fontVariantNumeric: 'tabular-nums' }}>
              {foldsOpen >= K ? 'Flat' : `Hinge ${String(Math.min(K, activeIdx + 1)).padStart(2, '0')} / ${String(K).padStart(2, '0')}`}
              <span style={{ color: muted }}>{'  ·  '}{String(Math.round(activeAngle)).padStart(3, '0')}°</span>
            </div>
            <div style={{ marginTop: 12, display: 'flex', gap: 4 }}>
              {topo.order.map((p, j) => (
                <div key={j} style={{ width: compact ? 18 : 26, height: 2, background: muted, opacity: 0.3, position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: 0, background: ink, transformOrigin: 'left', transform: `scaleX(${hingeT[p]})` }} />
                </div>
              ))}
            </div>
          </div>
        )}
        {showReadout && !compact && (
          <div style={{ position: 'absolute', right: 56, bottom: 44, zIndex: 3, fontFamily: mono, fontSize: 11, letterSpacing: '0.12em', color: muted, textAlign: 'right', lineHeight: 1.7, textTransform: 'uppercase' }}>
            <div>{N} panels · {Math.round(posterW)} × {Math.round(posterH)}</div>
            <div style={{ color: ink }}>{String(Math.round(progress * 100)).padStart(3, '0')} / 100</div>
          </div>
        )}
      </div>
    </section>
  );
}

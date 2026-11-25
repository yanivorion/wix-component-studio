const MANIFEST = {
  "type": "Scrub.ShutterBlinds",
  "description": "Full-stage venetian blinds: solid 3D slats rotate with scroll in a rippling stagger, their fronts and backs together switching between a word, a photograph and a closing statement, with light slipping through the gaps",
  "editorElement": {
    "selector": ".shutter-blinds",
    "displayName": "Shutter Blinds",
    "archetype": "container",
    "data": {
      "label": { "dataType": "text", "displayName": "Running Label", "defaultValue": "Shutter Study", "group": "Content" },
      "stateCount": { "dataType": "select", "displayName": "States", "defaultValue": "3", "options": ["2", "3"], "group": "Content" },
      "wordA": { "dataType": "text", "displayName": "State A Word", "defaultValue": "Open", "group": "States" },
      "lineA": { "dataType": "text", "displayName": "State A Line", "defaultValue": "Light, measured in slats.", "group": "States" },
      "wordB": { "dataType": "text", "displayName": "State B Word", "defaultValue": "Light", "group": "States" },
      "lineB": { "dataType": "text", "displayName": "State B Line", "defaultValue": "Late afternoon, west-facing.", "group": "States" },
      "imageB": { "dataType": "text", "displayName": "State B Image", "defaultValue": "https://picsum.photos/seed/architecture/1800/1100?grayscale", "group": "States" },
      "wordC": { "dataType": "text", "displayName": "State C Word", "defaultValue": "Close", "group": "States" },
      "lineC": { "dataType": "text", "displayName": "State C Line", "defaultValue": "Then the room goes quiet.", "group": "States" },
      "slatCount": { "dataType": "select", "displayName": "Slats", "defaultValue": "12", "options": ["10", "12", "14", "16"], "group": "Slats" },
      "restTilt": { "dataType": "select", "displayName": "Resting Tilt", "defaultValue": "slight", "options": ["none", "slight", "open"], "group": "Slats" },
      "stagger": { "dataType": "select", "displayName": "Ripple Stagger", "defaultValue": "medium", "options": ["tight", "medium", "wide"], "group": "Slats" },
      "rippleDirection": { "dataType": "select", "displayName": "Ripple Direction", "defaultValue": "down", "options": ["down", "up", "centre"], "group": "Slats" },
      "slatDepth": { "dataType": "select", "displayName": "Slat Depth", "defaultValue": "medium", "options": ["thin", "medium", "deep"], "group": "Slats" },
      "paperColor": { "dataType": "color", "displayName": "Paper", "defaultValue": "#F3F2EF", "group": "Colors" },
      "inkColor": { "dataType": "color", "displayName": "Ink", "defaultValue": "#0F0F0E", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted", "defaultValue": "#76736C", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent", "defaultValue": "#D9480F", "group": "Colors" },
      "lightColor": { "dataType": "color", "displayName": "Light Behind", "defaultValue": "#FFF8EC", "group": "Colors" },
      "edgeColor": { "dataType": "color", "displayName": "Slat Edge", "defaultValue": "#BDB9B1", "group": "Colors" },
      "fontFamily": { "dataType": "select", "displayName": "Grotesk", "defaultValue": "Inter Tight", "options": ["Inter Tight", "Inter", "Helvetica Neue", "system-ui"], "group": "Typography" },
      "wordWeight": { "dataType": "select", "displayName": "Word Weight", "defaultValue": "500", "options": ["300", "400", "500"], "group": "Typography" },
      "scrollLength": { "dataType": "select", "displayName": "Scroll Length (screens)", "defaultValue": "4", "options": ["3", "4", "5", "6"], "group": "Layout" },
      "showCounter": { "dataType": "booleanValue", "displayName": "Slat Counter", "defaultValue": "true", "group": "Layout" },
      "smoothing": { "dataType": "select", "displayName": "Scrub Smoothing", "defaultValue": "0.14", "options": ["0.08", "0.14", "0.22", "1"], "group": "Animation", "description": "1 = locked to the scrollbar, lower = more glide" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const label = config?.label || 'Shutter Study';
  const K = Math.min(3, Math.max(2, parseInt(config?.stateCount || '3', 10) || 3));
  const wordA = config?.wordA || 'Open';
  const lineA = config?.lineA || 'Light, measured in slats.';
  const wordB = config?.wordB || 'Light';
  const lineB = config?.lineB || 'Late afternoon, west-facing.';
  const imageB = config?.imageB || 'https://picsum.photos/seed/architecture/1800/1100?grayscale';
  const wordC = config?.wordC || 'Close';
  const lineC = config?.lineC || 'Then the room goes quiet.';
  const N = Math.min(16, Math.max(10, parseInt(config?.slatCount || '12', 10) || 12));
  const rest = { none: 0, slight: 11, open: 24 }[config?.restTilt || 'slight'] ?? 11;
  const staggerK = { tight: 0.18, medium: 0.34, wide: 0.5 }[config?.stagger || 'medium'] ?? 0.34;
  const rippleDirection = config?.rippleDirection || 'down';
  const depthK = { thin: 0.06, medium: 0.12, deep: 0.2 }[config?.slatDepth || 'medium'] ?? 0.12;
  const paper = config?.paperColor || '#F3F2EF';
  const ink = config?.inkColor || '#0F0F0E';
  const muted = config?.mutedColor || '#76736C';
  const accent = config?.accentColor || '#D9480F';
  const light = config?.lightColor || '#FFF8EC';
  const edge = config?.edgeColor || '#BDB9B1';
  const fontFamily = config?.fontFamily || 'Inter Tight';
  const wordWeight = config?.wordWeight || '500';
  const screens = parseFloat(config?.scrollLength || '4') || 4;
  const showCounter = bool(config?.showCounter, true);
  const smoothing = Math.min(1, Math.max(0.02, parseFloat(config?.smoothing || '0.14')));

  const prefersReducedMotion = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

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
  const easeIO = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  const compact = width < 760;
  const W = width;
  const H = stageH;
  const h = H / N;
  const t = Math.max(4, Math.round(h * depthK));
  const pad = compact ? 20 : 48;

  const mono = '"JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace';
  const sans = fontFamily === 'system-ui' ? 'system-ui, -apple-system, sans-serif' : `"${fontFamily}", "Inter", -apple-system, "Helvetica Neue", sans-serif`;
  const fit = (word, maxW, maxH) => Math.min(maxW / (Math.max(1, word.length) * 0.6), maxH);
  const micro = { fontFamily: mono, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase' };

  const corners = (color, dim, idx, name) => (
    <>
      <div style={{ position: 'absolute', left: pad, top: compact ? 22 : 38, ...micro, color }}>{label}</div>
      <div style={{ position: 'absolute', right: pad, top: compact ? 22 : 38, ...micro, color: dim, textAlign: 'right' }}>{String(idx + 1).padStart(2, '0')} / {String(K).padStart(2, '0')} — {name}</div>
    </>
  );

  const comps = React.useMemo(() => {
    const fsA = fit(wordA, W * 0.92, H * (compact ? 0.3 : 0.5));
    const fsB = fit(wordB, W * (compact ? 0.9 : 0.6), H * 0.32);
    const fsC = fit(wordC, W * 0.92, H * (compact ? 0.3 : 0.5));
    const A = (
      <div style={{ position: 'absolute', inset: 0, background: paper, color: ink, overflow: 'hidden' }}>
        {corners(ink, muted, 0, 'State A')}
        <div style={{ position: 'absolute', left: W * 0.04, top: H * 0.5 - fsA * 0.5, fontFamily: sans, fontSize: fsA, lineHeight: 0.8, fontWeight: wordWeight, letterSpacing: '-0.055em', whiteSpace: 'nowrap', paddingTop: fsA * 0.1 }}>{wordA}</div>
        <div style={{ position: 'absolute', left: pad, bottom: compact ? 104 : 92, fontFamily: sans, fontSize: compact ? 20 : 26, fontWeight: 400, letterSpacing: '-0.025em', color: ink, maxWidth: compact ? W - pad * 2 : 420, lineHeight: 1.1 }}>{lineA}</div>
        <div style={{ position: 'absolute', right: pad, bottom: compact ? 108 : 96, width: compact ? 18 : 26, height: compact ? 18 : 26, borderRadius: '50%', background: accent }} />
      </div>
    );
    const B = (
      <div style={{ position: 'absolute', inset: 0, background: '#2a2927', color: paper, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url("${imageB}")`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.4), rgba(0,0,0,0) 26%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.5))' }} />
        {corners(paper, 'rgba(243,242,239,0.75)', 1, 'State B')}
        <div style={{ position: 'absolute', left: pad - fsB * 0.03, bottom: compact ? 110 : 120, fontFamily: sans, fontSize: fsB, lineHeight: 0.8, fontWeight: wordWeight, letterSpacing: '-0.055em', whiteSpace: 'nowrap' }}>{wordB}</div>
        <div style={compact ? { position: 'absolute', left: pad, bottom: 120 + fsB * 0.9, ...micro, color: paper } : { position: 'absolute', right: pad, bottom: 124, ...micro, color: paper }}>
          <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: accent, marginRight: 10, verticalAlign: 'middle' }} />{lineB}
        </div>
      </div>
    );
    const C = (
      <div style={{ position: 'absolute', inset: 0, background: ink, color: paper, overflow: 'hidden' }}>
        {corners(paper, 'rgba(243,242,239,0.55)', 2, 'State C')}
        <div style={{ position: 'absolute', right: W * 0.04, top: H * 0.5 - fsC * 0.5, fontFamily: sans, fontSize: fsC, lineHeight: 0.8, fontWeight: 300, letterSpacing: '-0.055em', whiteSpace: 'nowrap', paddingTop: fsC * 0.1 }}>{wordC}</div>
        <div style={{ position: 'absolute', left: pad, bottom: compact ? 104 : 92, fontFamily: sans, fontSize: compact ? 20 : 26, fontWeight: 400, letterSpacing: '-0.025em', maxWidth: compact ? W - pad * 2 : 420, lineHeight: 1.1, opacity: 0.85 }}>{lineC}</div>
        <div style={{ position: 'absolute', left: W * 0.04, top: H * 0.5 - fsC * 0.42, width: Math.max(14, fsC * 0.12), height: Math.max(14, fsC * 0.12), background: accent }} />
      </div>
    );
    return [A, B, C];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [W, H, compact, paper, ink, muted, accent, sans, wordWeight, wordA, lineA, wordB, lineB, imageB, wordC, lineC, label, K, pad]);

  // timeline: each transition turns every slat 180deg, rippling across the stack
  const T = K - 1;
  const t0 = 0.08, t1 = 0.94;
  const slot = (t1 - t0) / T;
  const dur = slot * (0.78 - staggerK * 0.75);
  const spread = slot * 0.82 - dur;
  const order = (j) => {
    const r = N > 1 ? j / (N - 1) : 0;
    if (rippleDirection === 'up') return 1 - r;
    if (rippleDirection === 'centre') return Math.abs(r - 0.5) * 2;
    return r;
  };
  const turnOf = (j) => {
    let turns = 0;
    for (let k = 0; k < T; k++) {
      const a = t0 + k * slot + slot * 0.06 + order(j) * spread;
      turns += easeIO(seg(a, a + dur));
    }
    return turns;
  };
  const angles = Array.from({ length: N }, (_, j) => turnOf(j) * 180);
  const flipT = Array.from({ length: N }, (_, j) => turnOf(j));

  // which state's slice each face shows
  const frontState = (a) => Math.min(K - 1, 2 * Math.round(a / 360));
  const backState = (a) => Math.min(K - 1, 2 * Math.floor(a / 360) + 1);

  let busy = -1, busyDist = 1e9;
  angles.forEach((a, j) => {
    const frac = a / 180 - Math.floor(a / 180);
    if (frac > 0.001 && frac < 0.999) { const dd = Math.abs(frac - 0.5); if (dd < busyDist) { busyDist = dd; busy = j; } }
  });
  const stateIdx = Math.min(K - 1, Math.round(angles.reduce((s, a) => s + a, 0) / N / 180));

  const slats = angles.map((a, j) => {
    const total = a + rest;
    const rad = (total * Math.PI) / 180;
    const c = Math.cos(rad), s = Math.sin(rad);
    const bulge = Math.sin(Math.PI * (flipT[j] % 1)) * Math.min(28, h * 0.4);
    const frontDark = clamp(0.62 * (1 - c) * 0.5 + 0.08 * Math.max(0, -s));
    const frontHi = 0.16 * Math.max(0, s) * Math.max(0, c);
    const backDark = clamp(0.62 * (1 + c) * 0.5 + 0.18 * Math.max(0, s));
    const cast = Math.min(0.4, 0.4 * Math.abs(s));
    const face = { position: 'absolute', left: 0, top: 0, width: W, height: h + 0.5, overflow: 'hidden', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' };
    const slice = (k) => <div style={{ position: 'absolute', left: 0, top: -j * h, width: W, height: H }}>{comps[k]}</div>;
    const shade = (dark, hi) => (
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, rgba(0,0,0,${cast}) 0%, rgba(0,0,0,${cast * 0.25}) 22%, rgba(0,0,0,0) 45%), linear-gradient(180deg, rgba(255,255,255,${hi}), rgba(255,255,255,0) 70%), rgba(0,0,0,${dark})` }} />
    );
    return (
      <div key={j} style={{ position: 'absolute', left: 0, top: j * h, width: W, height: h, transformStyle: 'preserve-3d', transform: `translateZ(${bulge}px) rotateX(${total}deg)` }}>
        <div style={{ ...face, transform: `translateZ(${t / 2}px)` }}>
          {slice(frontState(a))}
          {shade(frontDark, frontHi)}
        </div>
        <div style={{ ...face, transform: `rotateX(180deg) translateZ(${t / 2}px)` }}>
          {slice(backState(a))}
          {shade(backDark, 0)}
        </div>
        <div style={{ position: 'absolute', left: 0, top: (h - t) / 2, width: W, height: t, background: edge, transform: `rotateX(90deg) translateZ(${h / 2}px)`, filter: `brightness(${1.05 - 0.25 * Math.max(0, -s)})` }} />
        <div style={{ position: 'absolute', left: 0, top: (h - t) / 2, width: W, height: t, background: edge, transform: `rotateX(-90deg) translateZ(${h / 2}px)`, filter: 'brightness(0.62)' }} />
      </div>
    );
  });

  const names = ['A', 'B', 'C'].slice(0, K);
  const words = [wordA, wordB, wordC].slice(0, K);

  return (
    <section ref={sectionRef} className="shutter-blinds" aria-label={`${label}: ${words.join(', ')}`}
      style={{ position: 'relative', width: '100%', height: `${Math.round(stageH * screens)}px`, backgroundColor: ink, fontFamily: sans }}>
      <div style={{ position: 'sticky', top: 0, height: `${stageH}px`, overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: `radial-gradient(70% 90% at 70% 30%, ${light}, rgba(0,0,0,0) 90%), ${ink}` }} />
        <div role="img" aria-label={`Blinds showing ${words[stateIdx]}`}
          style={{ position: 'absolute', inset: 0, perspective: `${Math.round(Math.max(1200, W * 1.1, H * 2.4))}px`, perspectiveOrigin: '50% 50%' }}>
          {slats}
        </div>

        {showCounter && (
          <div aria-live="polite" style={{ position: 'absolute', left: pad, bottom: compact ? 22 : 34, zIndex: 5, color: '#fff', mixBlendMode: 'difference', ...micro, display: 'flex', gap: compact ? 14 : 28, alignItems: 'center', fontVariantNumeric: 'tabular-nums' }}>
            <span>Slat {String(busy >= 0 ? busy + 1 : N).padStart(2, '0')} / {String(N).padStart(2, '0')}</span>
            <span style={{ opacity: 0.7 }}>{String(Math.round(busy >= 0 ? angles[busy] % 360 : (angles[0] % 360))).padStart(3, '0')}°</span>
          </div>
        )}
        {showCounter && (
          <div style={{ position: 'absolute', right: pad, bottom: compact ? 22 : 34, zIndex: 5, color: '#fff', mixBlendMode: 'difference', ...micro, display: 'flex', gap: 10, alignItems: 'center' }}>
            {names.map((n, k) => (
              <span key={k} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, opacity: k === stateIdx ? 1 : 0.45 }}>
                {k > 0 && <span style={{ width: compact ? 14 : 24, height: 1, background: '#fff', display: 'inline-block' }} />}
                {n}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

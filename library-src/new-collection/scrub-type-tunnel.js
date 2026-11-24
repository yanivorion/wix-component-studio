const MANIFEST = {
  "type": "Scrub.TypeTunnel",
  "description": "Scroll-scrubbed 3D tunnel of words: type lines the four walls (or a spiral) and rushes past the viewer through depth fog, then the tunnel decelerates and the final word rises flat to the centre as the headline",
  "editorElement": {
    "selector": ".type-tunnel",
    "displayName": "Type Tunnel",
    "archetype": "container",
    "data": {
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Vocabulary / 2026", "group": "Content" },
      "words": { "dataType": "text", "displayName": "Words (comma separated)", "defaultValue": "Rhythm, Contrast, Silence, Scale, Grid, Tension, Weight, Measure, Grain, Light, Proportion, Void, Pattern, Balance, Texture, Motion, Edge, Signal, Restraint, Detail", "group": "Content" },
      "finalWord": { "dataType": "text", "displayName": "Final Word (Headline)", "defaultValue": "Clarity", "group": "Content" },
      "subline": { "dataType": "text", "displayName": "Subline", "defaultValue": "Every decision on the way here was a word we kept or a word we cut.", "group": "Content" },
      "ctaLabel": { "dataType": "text", "displayName": "Footnote", "defaultValue": "Studio principles, No. 01", "group": "Content" },
      "layoutMode": { "dataType": "select", "displayName": "Tunnel Shape", "defaultValue": "walls", "options": ["walls", "spiral"], "group": "Layout" },
      "depth": { "dataType": "select", "displayName": "Word Spacing (depth)", "defaultValue": "medium", "options": ["tight", "medium", "deep"], "group": "Layout" },
      "speed": { "dataType": "select", "displayName": "Tunnel Length / Speed", "defaultValue": "1", "options": ["0.75", "1", "1.5", "2"], "group": "Layout", "description": "How many words rush past per scroll" },
      "scrollLength": { "dataType": "select", "displayName": "Scroll Length (screens)", "defaultValue": "5", "options": ["3", "4", "5", "6", "7"], "group": "Layout" },
      "showFrames": { "dataType": "booleanValue", "displayName": "Tunnel Wireframe", "defaultValue": "true", "group": "Layout" },
      "showHud": { "dataType": "booleanValue", "displayName": "Depth Readout", "defaultValue": "true", "group": "Layout" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#0C0C0D", "group": "Colors" },
      "textColor": { "dataType": "color", "displayName": "Near Text", "defaultValue": "#FAFAF9", "group": "Colors" },
      "fogColor": { "dataType": "color", "displayName": "Fog Colour", "defaultValue": "#3A3734", "group": "Colors" },
      "lineColor": { "dataType": "color", "displayName": "Wireframe", "defaultValue": "#57534E", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#A8A29E", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent", "defaultValue": "#E7E5E4", "group": "Colors" },
      "fogDensity": { "dataType": "select", "displayName": "Fog Density", "defaultValue": "medium", "options": ["light", "medium", "dense"], "group": "Colors" },
      "wordFont": { "dataType": "select", "displayName": "Wall Font", "defaultValue": "Inter", "options": ["Inter", "Instrument Serif", "Fraunces", "IBM Plex Mono"], "group": "Typography" },
      "headlineFont": { "dataType": "select", "displayName": "Headline Font", "defaultValue": "Instrument Serif", "options": ["Instrument Serif", "Fraunces", "Inter"], "group": "Typography" },
      "wordSize": { "dataType": "select", "displayName": "Wall Word Size (px)", "defaultValue": "88", "options": ["56", "72", "88", "104", "120"], "group": "Typography" },
      "headlineSize": { "dataType": "select", "displayName": "Headline Size (px)", "defaultValue": "168", "options": ["120", "144", "168", "200"], "group": "Typography" },
      "wordWeight": { "dataType": "select", "displayName": "Wall Word Weight", "defaultValue": "300", "options": ["300", "400", "500"], "group": "Typography" },
      "wordCase": { "dataType": "select", "displayName": "Wall Word Case", "defaultValue": "uppercase", "options": ["uppercase", "as typed", "lowercase"], "group": "Typography" },
      "mixItalic": { "dataType": "booleanValue", "displayName": "Alternate Serif Italics", "defaultValue": "true", "group": "Typography" },
      "smoothing": { "dataType": "select", "displayName": "Scrub Smoothing", "defaultValue": "0.12", "options": ["0.08", "0.12", "0.2", "1"], "group": "Animation", "description": "1 = locked to the scrollbar, lower = more glide" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const eyebrow = config?.eyebrow || 'Vocabulary / 2026';
  const finalWord = config?.finalWord || 'Clarity';
  const subline = config?.subline || 'Every decision on the way here was a word we kept or a word we cut.';
  const footnote = config?.ctaLabel || 'Studio principles, No. 01';
  const mode = config?.layoutMode || 'walls';
  const spacing = { tight: 150, medium: 200, deep: 270 }[config?.depth || 'medium'] || 200;
  const speed = Math.max(0.5, parseFloat(config?.speed || '1') || 1);
  const screens = parseFloat(config?.scrollLength || '5');
  const showFrames = bool(config?.showFrames, true);
  const showHud = bool(config?.showHud, true);
  const bg = config?.backgroundColor || '#0C0C0D';
  const textColor = config?.textColor || '#FAFAF9';
  const fogColor = config?.fogColor || '#3A3734';
  const lineColor = config?.lineColor || '#57534E';
  const muted = config?.mutedColor || '#A8A29E';
  const accent = config?.accentColor || '#E7E5E4';
  const fogSpan = { light: 24, medium: 17, dense: 11 }[config?.fogDensity || 'medium'] || 17;
  const wordFont = config?.wordFont || 'Inter';
  const headlineFont = config?.headlineFont || 'Instrument Serif';
  const wordSizeBase = parseInt(config?.wordSize || '88', 10);
  const headlineSizeBase = parseInt(config?.headlineSize || '168', 10);
  const wordWeight = config?.wordWeight || '300';
  const wordCase = config?.wordCase || 'uppercase';
  const mixItalic = bool(config?.mixItalic, true);
  const smoothing = Math.min(1, Math.max(0.02, parseFloat(config?.smoothing || '0.12')));

  const baseWords = React.useMemo(() => {
    const list = String(config?.words || 'Rhythm, Contrast, Silence, Scale, Grid, Tension, Weight, Measure, Grain, Light, Proportion, Void, Pattern, Balance, Texture, Motion, Edge, Signal, Restraint, Detail')
      .split(',').map((w) => w.trim()).filter(Boolean);
    return list.length ? list : ['Form'];
  }, [config?.words]);

  const prefersReducedMotion = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  React.useEffect(() => {
    const id = 'tt-fonts-instrument-plex';
    if (typeof document === 'undefined' || document.getElementById(id)) return;
    const l = document.createElement('link');
    l.id = id; l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Fraunces:ital,opsz,wght@0,9..144,300;1,9..144,300&family=IBM+Plex+Mono:wght@300;400&family=Inter:wght@300;400;500&display=swap';
    document.head.appendChild(l);
  }, []);

  const sectionRef = React.useRef(null);
  const target = React.useRef(0);
  const current = React.useRef(0);
  const [progress, setProgress] = React.useState(prefersReducedMotion ? 1 : 0);
  const [stageH, setStageH] = React.useState(800);
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

  const p = prefersReducedMotion ? 1 : progress;
  const clamp = (v) => Math.min(1, Math.max(0, v));
  const seg = (a, b) => clamp((p - a) / (b - a));
  const ease = (t) => 1 - Math.pow(1 - t, 3);
  const easeIO = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const rand = (i) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  const hex = (h) => {
    const m = String(h).replace('#', '');
    const f = m.length === 3 ? m.split('').map((c) => c + c).join('') : m.padEnd(6, '0');
    return [parseInt(f.slice(0, 2), 16) || 0, parseInt(f.slice(2, 4), 16) || 0, parseInt(f.slice(4, 6), 16) || 0];
  };
  const mix = (a, b, t) => { const A = hex(a); const B = hex(b); return `rgb(${A.map((v, k) => Math.round(v + (B[k] - v) * t)).join(',')})`; };

  const W = Math.max(320, width);
  const H = Math.max(320, stageH);
  const compact = W < 760;
  const P = compact ? 640 : 900;
  const hw = W / 2;
  const hh = H / 2;
  const wordSize = compact ? Math.round(wordSizeBase * 0.44) : wordSizeBase;
  const headlineSize = compact ? Math.round(headlineSizeBase * 0.42) : headlineSizeBase;
  const S = compact ? spacing * 0.8 : spacing;
  const count = Math.max(12, Math.round(baseWords.length * 1.6 * speed));
  const endZ = -(count + 2.2) * S;
  const fogDepth = S * fogSpan;

  const words = React.useMemo(() => Array.from({ length: count }, (_, i) => {
    const text = baseWords[i % baseWords.length];
    return {
      text: wordCase === 'uppercase' ? text.toUpperCase() : wordCase === 'lowercase' ? text.toLowerCase() : text,
      wall: compact ? [1, 3][i % 2] : [1, 2, 3, 0][i % 4],
      lat: (rand(i) - 0.5) * 1.1,
      jitter: rand(i + 50) * 0.5,
      italic: mixItalic && i % 3 === 1
    };
  }), [baseWords, count, wordCase, mixItalic, compact]);

  const travelT = seg(0, 0.82);
  const camT = 1 - Math.pow(1 - travelT, 2.1);
  const camStart = S * 0.2;
  const camZ = camStart + (-endZ - camStart) * camT;
  const land = easeIO(seg(0.58, 0.84));
  const outro = ease(seg(0.8, 0.95));
  const subIn = ease(seg(0.86, 0.98));
  const visibleCount = outro > 0.5 ? count : words.filter((w, i) => -(i + 1) * S + camZ > -S).length;

  const mono = '"IBM Plex Mono", ui-monospace, "SF Mono", Menlo, monospace';
  const fontStack = (f) => (f === 'IBM Plex Mono' ? mono : f === 'Inter' ? 'Inter, -apple-system, "Helvetica Neue", sans-serif' : `"${f}", "Iowan Old Style", Georgia, serif`);
  const serifStack = '"Instrument Serif", "Iowan Old Style", Georgia, serif';

  const wallFrame = (wall) => {
    if (mode === 'spiral') return null;
    if (wall === 1) return { rot: 0, R: hh, span: hw };
    if (wall === 2) return { rot: 90, R: hw, span: hh };
    if (wall === 3) return { rot: 180, R: hh, span: hw };
    return { rot: 270, R: hw, span: hh };
  };
  const spiralR = Math.min(hw, hh) * (compact ? 0.98 : 0.92);

  const wordNodes = [];
  words.forEach((w, i) => {
    const z = -(i + 1) * S;
    const ze = z + camZ;
    if (ze > P * 0.92 || ze < -fogDepth * 1.05) return;
    const fog = clamp(-ze / fogDepth);
    const near = clamp((ze + S * 0.4) / (P * 0.6));
    const op = (1 - Math.pow(fog, 2.2)) * (1 - near) * (1 - outro);
    if (op < 0.01) return;
    let tf;
    if (mode === 'spiral') {
      const a = i * 0.83 + 0.4;
      tf = `translateZ(${z}px) rotateZ(${(a * 180) / Math.PI - 90}deg) translateY(${spiralR}px) rotateX(90deg)`;
    } else {
      if (w.wall === 1) tf = `translateZ(${z}px) translateY(${hh}px) translateX(${w.lat * hw * 0.7}px) rotateX(90deg)`;
      else if (w.wall === 3) tf = `translateZ(${z}px) translateY(${-hh}px) translateX(${w.lat * hw * 0.7}px) rotateX(-90deg)`;
      else if (w.wall === 2) tf = `translateZ(${z}px) translateX(${-hw}px) translateY(${w.lat * hh * 0.6 + wordSize * 0.5}px) rotateY(90deg)`;
      else tf = `translateZ(${z}px) translateX(${hw}px) translateY(${w.lat * hh * 0.6 + wordSize * 0.5}px) rotateY(-90deg)`;
    }
    wordNodes.push(
      <div key={i} aria-hidden="true" style={{
        position: 'absolute', left: 0, top: 0, transform: `${tf} translate(-50%, -100%)`, transformOrigin: '0 0',
        whiteSpace: 'nowrap', fontFamily: w.italic ? serifStack : fontStack(wordFont), fontStyle: w.italic ? 'italic' : 'normal',
        fontWeight: w.italic ? 400 : wordWeight, fontSize: w.italic ? wordSize * 1.12 : wordSize,
        letterSpacing: w.italic ? '-0.01em' : wordCase === 'uppercase' ? '0.02em' : '-0.02em', lineHeight: 1,
        color: mix(fogColor, textColor, 1 - fog), opacity: op,
        filter: near > 0.02 ? `blur(${(near * 6).toFixed(2)}px)` : 'none', backfaceVisibility: 'hidden'
      }}>{w.text}</div>
    );
  });

  const frameNodes = [];
  if (showFrames) {
    const S2 = S * 2;
    const firstK = Math.max(0, Math.floor((camZ - P * 0.8) / S2));
    for (let k = firstK; k <= count / 2 + 2; k++) {
      const z = -k * S2 + S * 0.5;
      const ze = z + camZ;
      if (ze > -20 || ze < -fogDepth) continue;
      const fog = clamp(-ze / fogDepth);
      const op = (1 - fog) * 0.85 * (1 - outro);
      if (op < 0.01) continue;
      frameNodes.push(
        <div key={'f' + k} aria-hidden="true" style={{
          position: 'absolute', left: 0, top: 0,
          width: mode === 'spiral' ? spiralR * 2 : W, height: mode === 'spiral' ? spiralR * 2 : H,
          border: `1px solid ${lineColor}`, borderRadius: mode === 'spiral' ? '50%' : 0, boxSizing: 'border-box',
          transform: `translateZ(${z}px) translate(-50%, -50%)`, transformOrigin: '0 0', opacity: op
        }} />
      );
    }
    const zNear = -camZ - 30;
    const len = zNear - endZ;
    if (len > 0) {
      const rails = mode === 'spiral'
        ? Array.from({ length: 12 }, (_, k) => ({ rot: k * 30, R: spiralR, x: 0 }))
        : [1, 2, 3, 0].flatMap((wall) => {
          const fr = wallFrame(wall);
          return [-1, -0.5, 0, 0.5, 1].map((t) => ({ rot: fr.rot, R: fr.R, x: t * fr.span }));
        });
      rails.forEach((r, k) => {
        frameNodes.push(
          <div key={'r' + k} aria-hidden="true" style={{
            position: 'absolute', left: 0, top: 0, width: 1, height: len,
            background: `linear-gradient(to bottom, transparent ${Math.max(0, len - fogDepth)}px, ${lineColor} ${len}px)`,
            transform: `translateZ(${(zNear + endZ) / 2}px) rotateZ(${r.rot}deg) translateY(${r.R}px) translateX(${r.x}px) rotateX(90deg) translate(-50%, -50%)`,
            transformOrigin: '0 0', opacity: 0.7 * (1 - outro)
          }} />
        );
      });
    }
  }

  const finalZe = endZ + camZ;
  const finalFog = clamp(-finalZe / (fogDepth * 1.4));
  const finalTf = `translateZ(${endZ}px) translateY(${(hh * 0.92) * (1 - land)}px) rotateX(${90 * (1 - land)}deg)`;
  const depthReadout = Math.max(0, Math.round(camZ - camStart));

  return (
    <section ref={sectionRef} className="type-tunnel" aria-label={`${baseWords.join(', ')}. ${finalWord}. ${subline}`}
      style={{ position: 'relative', width: '100%', height: `${Math.round(stageH * screens)}px`, backgroundColor: bg, color: textColor }}>
      <div style={{ position: 'sticky', top: 0, height: `${stageH}px`, overflow: 'hidden', background: bg }}>
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(ellipse ${compact ? 70 : 42}% ${compact ? 32 : 46}% at 50% 50%, ${mix(bg, fogColor, 0.75)} 0%, ${bg} 100%)`
        }} />
        <div style={{ position: 'absolute', inset: 0, perspective: `${P}px`, perspectiveOrigin: '50% 50%' }}>
          <div style={{ position: 'absolute', left: '50%', top: '50%', width: 0, height: 0, transformStyle: 'preserve-3d', transform: `translateZ(${camZ}px)` }}>
            {frameNodes}
            {wordNodes}
            <div style={{
              position: 'absolute', left: 0, top: 0, transform: `${finalTf} translate(-50%, -50%)`, transformOrigin: '0 0',
              whiteSpace: 'nowrap', textAlign: 'center'
            }}>
              <h2 style={{
                margin: 0, fontFamily: fontStack(headlineFont), fontWeight: headlineFont === 'Inter' ? 300 : 400,
                fontSize: headlineSize, lineHeight: 0.92, letterSpacing: headlineFont === 'Inter' ? '-0.05em' : '-0.02em',
                color: mix(fogColor, textColor, 1 - finalFog)
              }}>{finalWord}<span style={{ color: accent }}>.</span></h2>
            </div>
          </div>
        </div>

        <div style={{
          position: 'absolute', left: '50%', top: '50%', width: compact ? W - 48 : 460, transform: `translate(-50%, ${headlineSize * 0.62 + (1 - subIn) * 14}px)`,
          textAlign: 'center', opacity: subIn, zIndex: 3
        }}>
          <div style={{ width: 40, height: 1, background: muted, margin: '0 auto 18px', transform: `scaleX(${subIn})` }} />
          <p style={{ margin: 0, fontFamily: 'Inter, -apple-system, "Helvetica Neue", sans-serif', fontWeight: 300, fontSize: compact ? 14 : 17, lineHeight: 1.55, color: textColor, opacity: 0.8 }}>{subline}</p>
          <div style={{ marginTop: 18, fontFamily: mono, fontSize: 10.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: muted }}>{footnote}</div>
        </div>

        <div style={{ position: 'absolute', top: compact ? 20 : 40, left: compact ? 20 : 48, zIndex: 3, fontFamily: mono, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: muted }}>
          {eyebrow}
        </div>
        {showHud && (
          <div aria-hidden="true" style={{ position: 'absolute', top: compact ? 20 : 40, right: compact ? 20 : 48, zIndex: 3, fontFamily: mono, fontSize: 11, letterSpacing: '0.14em', color: muted, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
            <div>Z −{String(depthReadout).padStart(5, '0')}</div>
            <div style={{ marginTop: 6, color: textColor }}>{String(Math.min(count, visibleCount)).padStart(2, '0')} / {String(count).padStart(2, '0')}</div>
          </div>
        )}
        {showHud && (
          <div aria-hidden="true" style={{ position: 'absolute', left: compact ? 20 : 48, right: compact ? 20 : 48, bottom: compact ? 20 : 36, zIndex: 3, height: 1, background: lineColor, opacity: 1 - outro * 0.7 }}>
            <div style={{ position: 'absolute', inset: 0, background: textColor, transformOrigin: 'left', transform: `scaleX(${camT})` }} />
            {Array.from({ length: 11 }, (_, k) => (
              <div key={k} style={{ position: 'absolute', left: `${k * 10}%`, top: -3, width: 1, height: 7, background: lineColor }} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

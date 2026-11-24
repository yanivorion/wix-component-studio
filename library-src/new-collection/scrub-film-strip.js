const MANIFEST = {
  "type": "Scrub.FilmStrip",
  "description": "A 35mm film strip runs through a projector gate as you scroll: sprockets, edge codes and frame numbers slide past, the frame in the gate is projected large with a running timecode, light leaks flicker only while the film moves and chapter titles change on cue",
  "editorElement": {
    "selector": ".film-strip",
    "displayName": "Film Strip",
    "archetype": "container",
    "data": {
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Reel 01 / Rushes", "group": "Content" },
      "title": { "dataType": "text", "displayName": "Film Title", "defaultValue": "The Long Harbour", "group": "Content" },
      "images": { "dataType": "text", "displayName": "Frame Images (comma-separated URLs)", "defaultValue": "https://picsum.photos/seed/reel-a/960/640?grayscale, https://picsum.photos/seed/reel-b/960/640?grayscale, https://picsum.photos/seed/reel-c/960/640?grayscale, https://picsum.photos/seed/reel-d/960/640?grayscale, https://picsum.photos/seed/reel-e/960/640?grayscale, https://picsum.photos/seed/reel-f/960/640?grayscale, https://picsum.photos/seed/reel-g/960/640?grayscale, https://picsum.photos/seed/reel-h/960/640?grayscale, https://picsum.photos/seed/reel-i/960/640?grayscale, https://picsum.photos/seed/reel-j/960/640?grayscale, https://picsum.photos/seed/reel-k/960/640?grayscale, https://picsum.photos/seed/reel-l/960/640?grayscale", "group": "Frames" },
      "chapters": { "dataType": "text", "displayName": "Chapter Titles (comma-separated)", "defaultValue": "Arrival, The harbour, Night shift, Departure", "group": "Frames" },
      "chapterFrames": { "dataType": "text", "displayName": "Chapter Start Frames (comma-separated)", "defaultValue": "1, 4, 7, 10", "group": "Frames", "description": "1-based frame number where each chapter begins; leave empty to spread evenly" },
      "edgePrint": { "dataType": "text", "displayName": "Edge Print", "defaultValue": "SAFETY FILM 400", "group": "Frames" },
      "startTimecode": { "dataType": "text", "displayName": "Start Timecode", "defaultValue": "01:00:00:00", "group": "Timecode" },
      "secondsPerFrame": { "dataType": "select", "displayName": "Seconds per Shot", "defaultValue": "4", "options": ["1", "2", "4", "6", "10"], "group": "Timecode" },
      "fps": { "dataType": "select", "displayName": "Frame Rate", "defaultValue": "24", "options": ["24", "25", "30"], "group": "Timecode" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#0C0C0D", "group": "Colors" },
      "filmBaseColor": { "dataType": "color", "displayName": "Film Base", "defaultValue": "#1C1917", "group": "Colors" },
      "textColor": { "dataType": "color", "displayName": "Text", "defaultValue": "#F5F5F4", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#78716C", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Edge Print & Playhead", "defaultValue": "#E8A33D", "group": "Colors" },
      "leakColor": { "dataType": "color", "displayName": "Light Leak", "defaultValue": "#FF7A3D", "group": "Colors" },
      "displayFont": { "dataType": "select", "displayName": "Display Font", "defaultValue": "Instrument Serif", "options": ["Instrument Serif", "Fraunces", "Inter", "Georgia"], "group": "Typography" },
      "chapterSize": { "dataType": "select", "displayName": "Chapter Title Size (px)", "defaultValue": "56", "options": ["40", "48", "56", "64", "72"], "group": "Typography" },
      "fontFamily": { "dataType": "select", "displayName": "Text Font", "defaultValue": "Inter", "options": ["Inter", "system-ui", "Helvetica Neue", "Georgia"], "group": "Typography" },
      "aspect": { "dataType": "select", "displayName": "Frame Aspect", "defaultValue": "3:2", "options": ["3:2", "1.85:1", "4:3"], "group": "Layout" },
      "scrollLength": { "dataType": "select", "displayName": "Scroll Length (screens)", "defaultValue": "5", "options": ["3", "4", "5", "6", "8"], "group": "Layout" },
      "showBeam": { "dataType": "booleanValue", "displayName": "Projector Beam", "defaultValue": "true", "group": "Layout" },
      "showGrain": { "dataType": "booleanValue", "displayName": "Film Grain", "defaultValue": "true", "group": "Layout" },
      "showReadout": { "dataType": "booleanValue", "displayName": "Timecode Readout", "defaultValue": "true", "group": "Layout" },
      "lightLeaks": { "dataType": "booleanValue", "displayName": "Light Leaks in Motion", "defaultValue": "true", "group": "Animation" },
      "gateWeave": { "dataType": "booleanValue", "displayName": "Gate Weave in Motion", "defaultValue": "true", "group": "Animation" },
      "smoothing": { "dataType": "select", "displayName": "Scrub Smoothing", "defaultValue": "0.12", "options": ["0.06", "0.12", "0.2", "1"], "group": "Animation", "description": "1 = locked to the scrollbar, lower = more glide" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const eyebrow = config?.eyebrow || 'Reel 01 / Rushes';
  const title = config?.title || 'The Long Harbour';
  const defaultImages = 'abcdefghijkl'.split('').map((c) => `https://picsum.photos/seed/reel-${c}/960/640?grayscale`).join(', ');
  const imagesRaw = config?.images || defaultImages;
  const chaptersRaw = config?.chapters || 'Arrival, The harbour, Night shift, Departure';
  const chapterFramesRaw = config?.chapterFrames ?? '1, 4, 7, 10';
  const edgePrint = config?.edgePrint || 'SAFETY FILM 400';
  const startTc = config?.startTimecode || '01:00:00:00';
  const spf = parseFloat(config?.secondsPerFrame || '4') || 4;
  const fps = parseInt(config?.fps || '24', 10) || 24;
  const bg = config?.backgroundColor || '#0C0C0D';
  const base = config?.filmBaseColor || '#1C1917';
  const fg = config?.textColor || '#F5F5F4';
  const muted = config?.mutedColor || '#78716C';
  const accent = config?.accentColor || '#E8A33D';
  const leak = config?.leakColor || '#FF7A3D';
  const displayFont = config?.displayFont || 'Instrument Serif';
  const chapterSize = parseInt(config?.chapterSize || '56', 10) || 56;
  const fontFamily = config?.fontFamily || 'Inter';
  const aspect = { '3:2': 1.5, '1.85:1': 1.85, '4:3': 4 / 3 }[config?.aspect || '3:2'] || 1.5;
  const screens = parseFloat(config?.scrollLength || '5') || 5;
  const showBeam = bool(config?.showBeam, true);
  const showGrain = bool(config?.showGrain, true);
  const showReadout = bool(config?.showReadout, true);
  const lightLeaks = bool(config?.lightLeaks, true);
  const gateWeave = bool(config?.gateWeave, true);
  const smoothing = Math.min(1, Math.max(0.02, parseFloat(config?.smoothing || '0.12')));

  const images = React.useMemo(() => imagesRaw.split(',').map((s) => s.trim()).filter(Boolean).slice(0, 40), [imagesRaw]);
  const M = images.length;
  const chapters = React.useMemo(() => {
    const titles = chaptersRaw.split(',').map((s) => s.trim()).filter(Boolean);
    const starts = String(chapterFramesRaw).split(',').map((s) => parseInt(s, 10)).filter((n) => Number.isFinite(n));
    return titles.map((t, i) => ({
      title: t,
      start: starts.length === titles.length ? Math.max(1, starts[i]) : Math.floor((i * Math.max(1, M)) / titles.length) + 1
    }));
  }, [chaptersRaw, chapterFramesRaw, M]);

  const uid = React.useMemo(() => 'fs' + Math.random().toString(36).slice(2, 9), []);
  const prefersReducedMotion = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  React.useEffect(() => {
    const id = 'ncs-font-instrument-plex';
    if (typeof document === 'undefined' || document.getElementById(id)) return;
    const l = document.createElement('link');
    l.id = id; l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=IBM+Plex+Mono:wght@400;500&family=Fraunces:opsz,wght@9..144,300..500&family=Inter:wght@300;400;500&display=swap';
    document.head.appendChild(l);
  }, []);

  const sectionRef = React.useRef(null);
  const target = React.useRef(0);
  const current = React.useRef(0);
  const motionRef = React.useRef(0);
  const [progress, setProgress] = React.useState(0);
  const [motion, setMotion] = React.useState(0);
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
      const prev = current.current;
      const d = target.current - current.current;
      current.current = Math.abs(d) < 0.0002 ? target.current : current.current + d * smoothing;
      const vel = Math.abs(current.current - prev) * Math.max(1, M) * 6;
      motionRef.current += (Math.min(1, vel) - motionRef.current) * 0.25;
      if (motionRef.current < 0.004) motionRef.current = 0;
      setProgress(current.current);
      setMotion(motionRef.current);
      raf = current.current === target.current && motionRef.current === 0 ? 0 : requestAnimationFrame(tick);
    };
    const onScroll = () => {
      read();
      if (prefersReducedMotion) { current.current = target.current; setProgress(target.current); return; }
      if (!raf) raf = requestAnimationFrame(tick);
    };
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
  }, [smoothing, prefersReducedMotion, M]);

  const clamp = (v) => Math.min(1, Math.max(0, v));
  const seg = (a, b) => clamp((progress - a) / (b - a));

  const compact = width < 760;
  const W = width;
  const H = stageH;

  // strip geometry
  const fh = Math.round(compact ? Math.min(84, H * 0.1) : Math.max(84, Math.min(126, H * 0.15)));
  const fw = Math.round(fh * aspect);
  const lineGap = Math.max(6, Math.round(fh * 0.08));
  const pitch = fw + lineGap;
  const eb = Math.round(fh * 0.3);
  const Hs = fh + eb * 2;
  const stripBottom = compact ? 28 : 40;
  const stripTop = H - stripBottom - Hs;
  const lead = pitch * Math.ceil(W / 2 / pitch + 1);
  const svgW = lead * 2 + Math.max(1, M) * pitch;
  const perfStep = pitch / 4;
  const perfW = perfStep * 0.52;
  const perfH = Math.min(eb * 0.5, perfW * 0.72);
  const perfY = eb * 0.42;

  const rawPos = M > 1 ? (M - 1) * seg(0.03, 0.97) : 0;
  // intermittent movement: the strip dwells on each frame like a projector claw
  const whole = Math.floor(rawPos);
  const frac = rawPos - whole;
  const pull = clamp((frac - 0.28) / 0.44);
  const pos = Math.min(M - 1, whole + pull * pull * (3 - 2 * pull));
  const idx = Math.min(M - 1, Math.max(0, Math.round(pos)));
  const stripX = W / 2 - (lead + pos * pitch + pitch / 2);

  // projected frame geometry
  let projW, projH, projTop;
  if (compact) {
    projTop = 96;
    projW = W - 32;
    projH = projW / aspect;
  } else {
    projTop = Math.max(44, H * 0.07);
    projH = Math.min(stripTop - 64 - projTop, (W * 0.5) / aspect);
    projW = projH * aspect;
  }
  const projLeft = (W - projW) / 2;

  // timecode
  const tcFrames = (() => {
    const p = startTc.split(':').map((n) => parseInt(n, 10) || 0);
    while (p.length < 4) p.unshift(0);
    return ((p[0] * 60 + p[1]) * 60 + p[2]) * fps + p[3];
  })();
  const elapsed = Math.floor(pos * spf * fps);
  const tcNow = tcFrames + elapsed;
  const pad2 = (n) => String(n).padStart(2, '0');
  const tc = `${pad2(Math.floor(tcNow / (fps * 3600)) % 24)}:${pad2(Math.floor(tcNow / (fps * 60)) % 60)}:${pad2(Math.floor(tcNow / fps) % 60)}:${pad2(tcNow % fps)}`;
  const feet = `${String(Math.floor(elapsed / 16)).padStart(4, '0')}+${pad2(elapsed % 16)}`;

  let chapterIdx = 0;
  chapters.forEach((c, i) => { if (idx + 1 >= c.start) chapterIdx = i; });
  const roman = (n) => ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'][n] || String(n + 1);

  const moving = prefersReducedMotion ? 0 : motion;
  const rnd = (k) => { const x = Math.sin(progress * 9301 + k * 49297) * 233280; return x - Math.floor(x); };
  const weaveY = gateWeave ? (rnd(1) - 0.5) * 3 * moving : 0;
  const weaveX = gateWeave ? (rnd(2) - 0.5) * 1.5 * moving : 0;
  const leakOp = lightLeaks ? moving * (0.45 + 0.55 * rnd(3)) : 0;
  const leakX = 15 + 70 * rnd(4);
  const flicker = 1 + (rnd(5) - 0.5) * 0.12 * moving;

  const mono = '"IBM Plex Mono", ui-monospace, "SF Mono", Menlo, monospace';
  const sans = fontFamily === 'Georgia' ? 'Georgia, serif' : `${fontFamily}, -apple-system, "Helvetica Neue", sans-serif`;
  const display = displayFont === 'Georgia' ? 'Georgia, serif' : displayFont === 'Inter'
    ? 'Inter, -apple-system, "Helvetica Neue", sans-serif' : `"${displayFont}", Georgia, "Times New Roman", serif`;
  const edge = Math.max(6, Math.round(eb * 0.2));

  const gateCx = W / 2;
  const sideW = compact ? 0 : Math.max(0, projLeft - 56 - 32);

  const label = { fontFamily: mono, fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: muted };

  const readouts = [
    ['Timecode', tc],
    ['Frame', `${pad2(idx + 1)} / ${pad2(M)}`],
    ['Feet + frames', feet],
    ['Speed', `${fps} fps`]
  ];

  return (
    <section ref={sectionRef} className="film-strip" aria-label={`${title}, film strip`}
      style={{ position: 'relative', width: '100%', height: `${Math.round(H * screens)}px`, backgroundColor: bg, color: fg, fontFamily: sans }}>
      <style>{`.${uid}-ch{transition:opacity .45s ease, transform .6s cubic-bezier(.2,.7,.2,1)}@media (prefers-reduced-motion: reduce){.${uid}-ch{transition:none}}`}</style>
      <div style={{ position: 'sticky', top: 0, height: `${H}px`, overflow: 'hidden' }}>
        {showGrain && (
          <svg aria-hidden="true" width="0" height="0" style={{ position: 'absolute' }}>
            <filter id={`${uid}-grain`} x="0" y="0" width="1" height="1">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
          </svg>
        )}

        {showBeam && M > 0 && (
          <svg aria-hidden="true" width={W} height={H} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <defs>
              <linearGradient id={`${uid}-beam`} x1="0" y1="1" x2="0" y2="0">
                <stop offset="0" stopColor="#fff" stopOpacity={(compact ? 0.07 : 0.13) * flicker} />
                <stop offset="1" stopColor="#fff" stopOpacity="0.015" />
              </linearGradient>
            </defs>
            <polygon fill={`url(#${uid}-beam)`}
              points={`${gateCx - fw / 2},${stripTop} ${gateCx + fw / 2},${stripTop} ${projLeft + projW},${projTop + projH} ${projLeft},${projTop + projH}`} />
          </svg>
        )}

        <div style={{ position: 'absolute', top: compact ? 22 : 44, left: compact ? 16 : 56, width: compact ? W - 32 : sideW, zIndex: 3 }}>
          <div style={label}>{eyebrow}</div>
          <h2 style={{ margin: compact ? '6px 0 0' : '12px 0 0', fontFamily: display, fontWeight: 400, fontSize: compact ? 28 : 36, lineHeight: 1.05, letterSpacing: '-0.01em', color: fg }}>{title}</h2>
        </div>

        <div style={{ position: 'absolute', left: projLeft, top: projTop, width: projW, height: projH, transform: `translate(${weaveX}px, ${weaveY}px)`, zIndex: 2 }}>
          <div style={{ position: 'absolute', inset: -1, background: '#000', boxShadow: '0 0 120px rgba(255,255,255,0.07), 0 30px 80px rgba(0,0,0,0.6)' }} />
          {M === 0 ? (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', ...label }}>Add frame image URLs</div>
          ) : images.map((src, k) => (
            <img key={k} src={src} alt={k === idx ? `Frame ${k + 1} of ${M}, ${chapters[chapterIdx]?.title || title}` : ''} aria-hidden={k === idx ? undefined : true}
              loading={Math.abs(k - idx) < 3 ? 'eager' : 'lazy'} draggable="false"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: k === idx ? 1 : 0, filter: `brightness(${flicker}) contrast(1.06)` }} />
          ))}
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 120% at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)' }} />
          {showGrain && <div aria-hidden="true" style={{ position: 'absolute', inset: 0, filter: `url(#${uid}-grain)`, opacity: 0.14, mixBlendMode: 'overlay', background: '#888' }} />}
          {lightLeaks && (
            <div aria-hidden="true" style={{
              position: 'absolute', inset: 0, mixBlendMode: 'screen', opacity: leakOp,
              background: `radial-gradient(60% 90% at ${leakX}% ${30 + 40 * rnd(6)}%, ${leak}, rgba(0,0,0,0) 70%), linear-gradient(90deg, ${leak} 0%, rgba(0,0,0,0) 18%)`
            }} />
          )}
          <div aria-hidden="true" style={{ position: 'absolute', left: 12, bottom: 10, fontFamily: mono, fontSize: compact ? 9 : 10, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.75)', textShadow: '0 1px 2px rgba(0,0,0,0.6)' }}>
            {tc}
          </div>
        </div>

        {chapters.length > 0 && (
          <div aria-live="polite" style={{
            position: 'absolute', zIndex: 3,
            left: compact ? 16 : 56, width: compact ? W - 32 : sideW,
            top: compact ? projTop + projH + 26 : projTop + projH * 0.42, height: chapterSize * 2.6
          }}>
            {chapters.map((c, i) => {
              const d = i - chapterIdx;
              return (
                <div key={i} className={`${uid}-ch`} aria-hidden={d !== 0}
                  style={{ position: 'absolute', left: 0, top: 0, right: 0, opacity: d === 0 ? 1 : 0, transform: `translateY(${d === 0 ? 0 : d > 0 ? 18 : -18}px)` }}>
                  <div style={{ ...label, color: accent }}>Chapter {roman(i)} · Fr. {pad2(c.start)}</div>
                  <div style={{ fontFamily: display, fontWeight: 400, fontStyle: displayFont === 'Instrument Serif' ? 'italic' : 'normal', fontSize: compact ? Math.round(chapterSize * 0.66) : chapterSize, lineHeight: 1, letterSpacing: '-0.015em', marginTop: 10, color: fg }}>{c.title}</div>
                </div>
              );
            })}
          </div>
        )}

        {showReadout && (
          compact ? (
            <div style={{ position: 'absolute', left: 16, right: 16, top: stripTop - 58, display: 'flex', justifyContent: 'space-between', zIndex: 3 }}>
              {readouts.slice(0, 3).map(([k, v], i) => (
                <div key={i}>
                  <div style={{ ...label, fontSize: 9 }}>{k}</div>
                  <div style={{ fontFamily: mono, fontSize: 13, marginTop: 4, fontVariantNumeric: 'tabular-nums', color: i === 0 ? fg : muted }}>{v}</div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ position: 'absolute', right: 56, top: projTop, width: sideW, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 22, zIndex: 3, textAlign: 'right' }}>
              {readouts.map(([k, v], i) => (
                <div key={i}>
                  <div style={label}>{k}</div>
                  <div style={{ fontFamily: mono, fontSize: i === 0 ? Math.min(30, sideW / 7.6) : 15, marginTop: 6, fontVariantNumeric: 'tabular-nums', letterSpacing: i === 0 ? '0.02em' : '0.06em', color: i === 0 ? fg : '#D6D3D1' }}>{v}</div>
                </div>
              ))}
              <div style={{ width: Math.min(160, sideW), height: 1, background: '#3F3F46', position: 'relative', marginTop: 4 }}>
                <div style={{ position: 'absolute', inset: 0, background: accent, transformOrigin: 'right', transform: `scaleX(${M > 1 ? pos / (M - 1) : 0})` }} />
              </div>
            </div>
          )
        )}

        <div style={{ position: 'absolute', left: 0, right: 0, top: stripTop - 10, height: Hs + 20, overflow: 'hidden', zIndex: 2 }}>
          <svg aria-hidden="true" width={svgW} height={Hs} style={{ position: 'absolute', left: 0, top: 10, transform: `translate3d(${stripX}px,0,0)`, willChange: 'transform' }}>
            <defs>
              <pattern id={`${uid}-perf`} x={0} y={0} width={perfStep} height={Hs} patternUnits="userSpaceOnUse">
                <rect x={(perfStep - perfW) / 2} y={perfY} width={perfW} height={perfH} rx={perfH * 0.22} fill={bg} />
                <rect x={(perfStep - perfW) / 2} y={Hs - perfY - perfH} width={perfW} height={perfH} rx={perfH * 0.22} fill={bg} />
              </pattern>
            </defs>
            <rect x={0} y={0} width={svgW} height={Hs} fill={base} />
            <rect x={0} y={0} width={svgW} height={Hs} fill={`url(#${uid}-perf)`} />
            <text x={lead - pitch * 1.2} y={Hs / 2 + 4} textAnchor="end" fontFamily={mono} fontSize={Math.max(9, fh * 0.11)} letterSpacing="4" fill={muted}>HEAD · {eyebrow.toUpperCase()}</text>
            <text x={lead + M * pitch + pitch * 1.2} y={Hs / 2 + 4} fontFamily={mono} fontSize={Math.max(9, fh * 0.11)} letterSpacing="4" fill={muted}>TAIL · END OF REEL</text>
            {images.map((src, k) => {
              const x = lead + k * pitch + lineGap / 2;
              return (
                <g key={k}>
                  <rect x={x - 1} y={eb - 1} width={fw + 2} height={fh + 2} fill="#000" />
                  <svg x={x} y={eb} width={fw} height={fh} viewBox={`0 0 ${fw} ${fh}`} preserveAspectRatio="none">
                    <image href={src} x={0} y={0} width={fw} height={fh} preserveAspectRatio="xMidYMid slice" />
                  </svg>
                  <text x={x + 2} y={edge + 2} fontFamily={mono} fontSize={edge} fill={accent} opacity="0.8" letterSpacing="1">
                    {k % 2 === 0 ? `▸ ${edgePrint}` : `${String(4210 + k * 7)}  ◂`}
                  </text>
                  <text x={x + 2} y={Hs - 3} fontFamily={mono} fontSize={edge} fill={accent} opacity="0.8">{k + 1}</text>
                  <text x={x + fw / 2 + 2} y={Hs - 3} fontFamily={mono} fontSize={edge} fill={accent} opacity="0.55">{k + 1}A</text>
                </g>
              );
            })}
          </svg>

          <div aria-hidden="true" style={{
            position: 'absolute', left: gateCx - fw / 2 - 6, top: 10 + eb - 6, width: fw + 12, height: fh + 12,
            boxShadow: `0 0 0 4000px rgba(0,0,0,0.52)`, border: '1px solid rgba(245,245,244,0.55)', borderRadius: 3
          }}>
            {[[0, 0], [1, 0], [0, 1], [1, 1]].map(([cx, cy], k) => (
              <div key={k} style={{
                position: 'absolute', width: 12, height: 12,
                left: cx ? 'auto' : -4, right: cx ? -4 : 'auto', top: cy ? 'auto' : -4, bottom: cy ? -4 : 'auto',
                borderLeft: cx ? 'none' : `2px solid ${fg}`, borderRight: cx ? `2px solid ${fg}` : 'none',
                borderTop: cy ? 'none' : `2px solid ${fg}`, borderBottom: cy ? `2px solid ${fg}` : 'none'
              }} />
            ))}
          </div>
          <div aria-hidden="true" style={{ position: 'absolute', left: gateCx - 6, top: 0, width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: `8px solid ${accent}` }} />
          <div aria-hidden="true" style={{ position: 'absolute', left: gateCx - 6, bottom: 0, width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderBottom: `8px solid ${accent}` }} />
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: `linear-gradient(90deg, ${bg} 0%, rgba(0,0,0,0) 12%, rgba(0,0,0,0) 88%, ${bg} 100%)` }} />
        </div>
      </div>
    </section>
  );
}

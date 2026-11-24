const MANIFEST = {
  "type": "Scrub.TextMaskZoom",
  "description": "A giant word filled with a photograph scales up enormously around a chosen point inside one letter until the photo fills the stage, cross-fading seamlessly from masked type to a full-bleed image before the overlay copy rises in",
  "editorElement": {
    "selector": ".text-mask-zoom",
    "displayName": "Text Mask Zoom",
    "archetype": "container",
    "data": {
      "word": { "dataType": "text", "displayName": "Masked Word", "defaultValue": "OCEAN", "group": "Content" },
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Chapter 02 — The Atlantic", "group": "Content" },
      "caption": { "dataType": "text", "displayName": "Caption", "defaultValue": "A field guide to open water", "group": "Content" },
      "overlayEyebrow": { "dataType": "text", "displayName": "Overlay Eyebrow", "defaultValue": "Nazaré, Portugal", "group": "Content" },
      "overlayTitle": { "dataType": "text", "displayName": "Overlay Title (| = line break)", "defaultValue": "Where the land|finally ends", "group": "Content" },
      "overlayText": { "dataType": "text", "displayName": "Overlay Text", "defaultValue": "Winter swells travel four thousand kilometres to arrive here — thirty metres of moving water, and a silence just before it breaks.", "group": "Content" },
      "image": { "dataType": "text", "displayName": "Image URL", "defaultValue": "https://picsum.photos/id/1041/2000/1300", "group": "Images" },
      "imageAlt": { "dataType": "text", "displayName": "Image Alt Text", "defaultValue": "A deep blue ocean wave curling over", "group": "Images" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#F5F5F4", "group": "Colors" },
      "textColor": { "dataType": "color", "displayName": "Intro Text", "defaultValue": "#1C1917", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Intro Muted Text", "defaultValue": "#78716C", "group": "Colors" },
      "overlayTextColor": { "dataType": "color", "displayName": "Overlay Text", "defaultValue": "#FAFAF9", "group": "Colors" },
      "scrimColor": { "dataType": "color", "displayName": "Scrim", "defaultValue": "#0C0A09", "group": "Colors" },
      "wordFont": { "dataType": "select", "displayName": "Word Font", "defaultValue": "Anton", "options": ["Anton", "Bebas Neue", "Inter Tight", "Fraunces"], "group": "Typography" },
      "wordWeight": { "dataType": "select", "displayName": "Word Weight", "defaultValue": "400", "options": ["300", "400", "500"], "group": "Typography" },
      "letterSpacing": { "dataType": "select", "displayName": "Word Letter Spacing", "defaultValue": "tight", "options": ["tight", "normal", "wide"], "group": "Typography" },
      "displayFont": { "dataType": "select", "displayName": "Overlay Title Font", "defaultValue": "Instrument Serif", "options": ["Instrument Serif", "Fraunces", "Inter Tight"], "group": "Typography" },
      "bodyFont": { "dataType": "select", "displayName": "Body Font", "defaultValue": "Inter", "options": ["Inter", "DM Sans", "system-ui"], "group": "Typography" },
      "wordWidth": { "dataType": "select", "displayName": "Word Width (% of stage)", "defaultValue": "88", "options": ["72", "80", "88", "94"], "group": "Layout" },
      "scrollLength": { "dataType": "select", "displayName": "Scroll Length (screens)", "defaultValue": "4", "options": ["3", "4", "5", "6"], "group": "Layout" },
      "focusLetter": { "dataType": "select", "displayName": "Focus Letter", "defaultValue": "auto", "options": ["auto", "1", "2", "3", "4", "5", "6", "7", "8"], "group": "Animation", "description": "Which letter the camera dives into (auto = middle letter)" },
      "focusX": { "dataType": "select", "displayName": "Focus X Within Letter", "defaultValue": "0.2", "options": ["0.1", "0.2", "0.35", "0.5", "0.65", "0.8"], "group": "Animation", "description": "0 = left edge of the letter, 1 = right edge; aim for a stem" },
      "focusY": { "dataType": "select", "displayName": "Focus Y Within Letter", "defaultValue": "0.5", "options": ["0.25", "0.5", "0.75"], "group": "Animation" },
      "maxZoom": { "dataType": "select", "displayName": "Maximum Zoom", "defaultValue": "60", "options": ["30", "60", "120"], "group": "Animation" },
      "imageSettle": { "dataType": "booleanValue", "displayName": "Image Scale-down Settle", "defaultValue": "true", "group": "Animation" },
      "scrimStrength": { "dataType": "select", "displayName": "Overlay Scrim", "defaultValue": "0.45", "options": ["0.2", "0.45", "0.65"], "group": "Animation" },
      "smoothing": { "dataType": "select", "displayName": "Scrub Smoothing", "defaultValue": "0.12", "options": ["0.06", "0.12", "0.2", "1"], "group": "Animation", "description": "1 = locked to the scrollbar, lower = more glide" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const word = (config?.word || 'OCEAN').trim() || 'OCEAN';
  const eyebrow = config?.eyebrow || 'Chapter 02 — The Atlantic';
  const caption = config?.caption || 'A field guide to open water';
  const overlayEyebrow = config?.overlayEyebrow || 'Nazaré, Portugal';
  const overlayTitle = (config?.overlayTitle || 'Where the land|finally ends').split('|');
  const overlayText = config?.overlayText || 'Winter swells travel four thousand kilometres to arrive here — thirty metres of moving water, and a silence just before it breaks.';
  const image = config?.image || 'https://picsum.photos/id/1041/2000/1300';
  const imageAlt = config?.imageAlt || 'A deep blue ocean wave curling over';
  const bg = config?.backgroundColor || '#F5F5F4';
  const ink = config?.textColor || '#1C1917';
  const muted = config?.mutedColor || '#78716C';
  const overlayInk = config?.overlayTextColor || '#FAFAF9';
  const scrim = config?.scrimColor || '#0C0A09';
  const wordFont = config?.wordFont || 'Anton';
  const wordWeight = config?.wordWeight || '400';
  const tracking = { tight: -0.01, normal: 0.01, wide: 0.06 }[config?.letterSpacing || 'tight'] ?? -0.01;
  const displayFont = config?.displayFont || 'Instrument Serif';
  const bodyFont = config?.bodyFont || 'Inter';
  const wordWidth = (parseFloat(config?.wordWidth || '88') || 88) / 100;
  const screens = parseFloat(config?.scrollLength || '4') || 4;
  const focusLetterRaw = config?.focusLetter || 'auto';
  const focusX = Math.min(1, Math.max(0, parseFloat(config?.focusX || '0.2')));
  const focusY = Math.min(1, Math.max(0, parseFloat(config?.focusY || '0.5')));
  const maxZoom = Math.max(8, parseFloat(config?.maxZoom || '60') || 60);
  const imageSettle = bool(config?.imageSettle, true);
  const scrimStrength = parseFloat(config?.scrimStrength || '0.45') || 0.45;
  const smoothing = Math.min(1, Math.max(0.02, parseFloat(config?.smoothing || '0.12') || 0.12));

  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const uid = React.useMemo(() => 'tm' + Math.random().toString(36).slice(2, 9), []);

  const families = {
    'Anton': 'Anton', 'Bebas Neue': 'Bebas+Neue', 'Instrument Serif': 'Instrument+Serif:ital@0;1',
    'Fraunces': 'Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500', 'Inter Tight': 'Inter+Tight:wght@300;400;500',
    'Inter': 'Inter:wght@300;400;500', 'DM Sans': 'DM+Sans:wght@300;400;500'
  };
  const wordFamily = wordFont === 'Fraunces' ? '"Fraunces", Georgia, serif'
    : wordFont === 'Inter Tight' ? '"Inter Tight", Inter, "Helvetica Neue", sans-serif'
      : `"${wordFont}", Impact, "Arial Narrow", sans-serif`;

  const sectionRef = React.useRef(null);
  const textGRef = React.useRef(null);
  const svgImgRef = React.useRef(null);
  const fullRef = React.useRef(null);
  const fullImgRef = React.useRef(null);
  const introRef = React.useRef(null);
  const scrimRef = React.useRef(null);
  const lineRefs = React.useRef([]);
  const metaRef = React.useRef(null);
  const applyRef = React.useRef(null);
  const st = React.useRef({ target: reduced ? 1 : 0, cur: reduced ? 1 : 0 });
  const [dims, setDims] = React.useState({ w: 1280, h: 760 });
  const [metrics, setMetrics] = React.useState(null);

  React.useEffect(() => {
    [families[wordFont], families[displayFont], families[bodyFont]].filter(Boolean).forEach((f) => {
      const id = 'gf-' + f.replace(/[^a-z0-9]/gi, '').slice(0, 40);
      if (document.getElementById(id)) return;
      const l = document.createElement('link');
      l.id = id; l.rel = 'stylesheet';
      l.href = `https://fonts.googleapis.com/css2?family=${f}&display=swap`;
      document.head.appendChild(l);
    });
  }, [wordFont, displayFont, bodyFont]); // eslint-disable-line react-hooks/exhaustive-deps

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
      st.current.target = travel > 0 ? Math.min(1, Math.max(0, (top - r.top) / travel)) : 0;
    };
    const tick = () => {
      const S = st.current;
      const d = S.target - S.cur;
      S.cur = Math.abs(d) < 0.0001 ? S.target : S.cur + d * smoothing;
      if (applyRef.current) applyRef.current(S.cur);
      raf = S.cur === S.target ? 0 : requestAnimationFrame(tick);
    };
    const onScroll = () => {
      if (reduced) return;
      read();
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const measure = () => {
      const h = scroller === window ? window.innerHeight : scroller.clientHeight;
      const w = section.clientWidth;
      setDims((p) => (p.w === w && p.h === h ? p : { w, h }));
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

  const W = dims.w;
  const H = dims.h;
  const compact = W < 700;

  // measure ink metrics with canvas once the face is ready, so the word fills the stage exactly
  React.useEffect(() => {
    let alive = true;
    const run = () => {
      if (!alive) return;
      const c = document.createElement('canvas');
      const ctx = c.getContext('2d');
      if (!ctx) return;
      const ref = 200;
      ctx.font = `${wordWeight} ${ref}px ${wordFamily}`;
      if ('letterSpacing' in ctx) ctx.letterSpacing = `${tracking * ref}px`;
      const m = ctx.measureText(word);
      const inkW = (m.actualBoundingBoxLeft || 0) + (m.actualBoundingBoxRight || m.width);
      const asc = m.actualBoundingBoxAscent || ref * 0.72;
      const desc = Math.max(0, m.actualBoundingBoxDescent || 0);
      const letters = [];
      for (let i = 0; i < word.length; i++) {
        const x0 = ctx.measureText(word.slice(0, i)).width;
        const lw = ctx.measureText(word[i]).width;
        letters.push([x0, lw]);
      }
      setMetrics({ ref, adv: m.width, inkW, inkL: m.actualBoundingBoxLeft || 0, asc, desc, letters });
    };
    run();
    if (document.fonts && document.fonts.load) {
      document.fonts.load(`${wordWeight} 100px ${wordFamily}`, word).then(run).catch(() => {});
      document.fonts.ready.then(run);
    }
    const t = setTimeout(run, 1500);
    return () => { alive = false; clearTimeout(t); };
  }, [word, wordFamily, wordWeight, tracking]);

  const mt = metrics || { ref: 200, adv: word.length * 110, inkW: word.length * 110, inkL: 0, asc: 150, desc: 0, letters: word.split('').map((_, i) => [i * 110, 110]) };
  const fit = Math.min((W * (compact ? Math.max(wordWidth, 0.9) : wordWidth)) / mt.inkW, (H * (compact ? 0.3 : 0.56)) / (mt.asc + mt.desc));
  const fsz = mt.ref * fit;
  const textX = W / 2 - (mt.adv * fit) / 2;
  const inkH = (mt.asc + mt.desc) * fit;
  const baseline = H / 2 + inkH / 2 - mt.desc * fit + (compact ? 0 : H * 0.01);
  const li = focusLetterRaw === 'auto' ? Math.floor((word.length - 1) / 2) : Math.min(word.length - 1, Math.max(0, parseInt(focusLetterRaw, 10) - 1));
  const letter = mt.letters[li] || [0, mt.adv];
  const fx = textX + (letter[0] + letter[1] * focusX) * fit;
  const fy = baseline - mt.asc * fit * (1 - focusY);

  const clamp = (v) => Math.min(1, Math.max(0, v));
  const easeIO = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  const expoOut = (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
  const smooth = (t) => t * t * (3 - 2 * t);

  applyRef.current = (p) => {
    const seg = (a, b) => clamp((p - a) / (b - a));
    const z = easeIO(seg(0.05, 0.58));
    const s = Math.pow(maxZoom, z);
    const tc = easeOut(clamp(z * 1.25));
    const tx = fx + (W / 2 - fx) * tc;
    const ty = fy + (H / 2 - fy) * tc;
    if (textGRef.current) textGRef.current.setAttribute('transform', `translate(${tx.toFixed(3)} ${ty.toFixed(3)}) scale(${s.toFixed(5)}) translate(${(-fx).toFixed(3)} ${(-fy).toFixed(3)})`);
    const settle = imageSettle ? 1.28 - 0.28 * easeOut(seg(0.06, 0.9)) : 1;
    const ix = (fx - W / 2) * (1 - tc) * 0.12;
    const iy = (fy - H / 2) * (1 - tc) * 0.12;
    if (svgImgRef.current) svgImgRef.current.setAttribute('transform', `translate(${(W / 2 + ix).toFixed(3)} ${(H / 2 + iy).toFixed(3)}) scale(${settle.toFixed(5)}) translate(${(-W / 2).toFixed(3)} ${(-H / 2).toFixed(3)})`);
    if (fullImgRef.current) fullImgRef.current.style.transform = `translate3d(${ix.toFixed(3)}px, ${iy.toFixed(3)}px, 0) scale(${settle.toFixed(5)})`;
    if (fullRef.current) {
      const o = smooth(clamp((z - 0.45) / 0.3));
      fullRef.current.style.opacity = o.toFixed(4);
      fullRef.current.style.visibility = o <= 0.001 ? 'hidden' : 'visible';
    }
    if (introRef.current) {
      const i = 1 - easeOut(seg(0.03, 0.16));
      introRef.current.style.opacity = i.toFixed(3);
    }
    if (scrimRef.current) scrimRef.current.style.opacity = (easeOut(seg(0.5, 0.7)) * scrimStrength).toFixed(3);
    lineRefs.current.forEach((el, j) => {
      if (!el) return;
      const e = expoOut(seg(0.55 + j * 0.05, 0.77 + j * 0.05));
      el.style.transform = `translate3d(0, ${((1 - e) * 112).toFixed(2)}%, 0)`;
    });
    if (metaRef.current) {
      const m = easeOut(seg(0.68, 0.86));
      metaRef.current.style.opacity = m.toFixed(3);
      metaRef.current.style.transform = `translate3d(0, ${((1 - m) * 20).toFixed(2)}px, 0)`;
    }
  };

  React.useLayoutEffect(() => {
    if (applyRef.current) applyRef.current(st.current.cur);
  });

  const serif = displayFont === 'Inter Tight' ? '"Inter Tight", Inter, sans-serif' : `"${displayFont}", Georgia, "Times New Roman", serif`;
  const sans = bodyFont === 'system-ui' ? 'system-ui, -apple-system, sans-serif' : `"${bodyFont}", -apple-system, "Helvetica Neue", sans-serif`;
  const pad = compact ? 20 : 48;
  const titleSize = Math.round(Math.min(W * (compact ? 0.13 : 0.085), H * 0.15));
  const wordTop = baseline - mt.asc * fit;
  const wordBottom = baseline + mt.desc * fit;
  const maskId = `${uid}-mask`;

  return (
    <section ref={sectionRef} className={`text-mask-zoom ${uid}`}
      style={{ position: 'relative', width: '100%', height: `${Math.round(H * screens)}px`, backgroundColor: bg, color: ink, fontFamily: sans }}>
      <div style={{ position: 'sticky', top: 0, height: `${H}px`, overflow: 'hidden', backgroundColor: bg }}>
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${word} — ${imageAlt}`}
          style={{ position: 'absolute', left: 0, top: 0, display: 'block', animation: `${uid}-in 1100ms cubic-bezier(0.22, 1, 0.36, 1) both` }}>
          <defs>
            <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
              <rect x="0" y="0" width={W} height={H} fill="#000" />
              <g ref={textGRef}>
                <text x={textX} y={baseline} fill="#fff" fontFamily={wordFamily} fontWeight={wordWeight} fontSize={fsz}
                  letterSpacing={tracking * fsz} style={{ fontKerning: 'normal' }}>{word}</text>
              </g>
            </mask>
          </defs>
          <g mask={`url(#${maskId})`}>
            <rect x="0" y="0" width={W} height={H} fill="#1C1917" />
            <image ref={svgImgRef} href={image} x="0" y="0" width={W} height={H} preserveAspectRatio="xMidYMid slice" />
          </g>
        </svg>

        <div ref={fullRef} aria-hidden="true" style={{ position: 'absolute', inset: 0, opacity: 0, visibility: 'hidden', overflow: 'hidden' }}>
          <img ref={fullImgRef} src={image} alt="" draggable="false" loading="eager"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', transformOrigin: '50% 50%', willChange: 'transform' }} />
          <div ref={scrimRef} style={{ position: 'absolute', inset: 0, opacity: 0, background: `linear-gradient(180deg, ${scrim}55 0%, ${scrim}11 35%, ${scrim} 100%)` }} />
        </div>

        <div ref={introRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute', left: pad, right: pad, top: Math.max(compact ? 24 : 36, wordTop - (compact ? 56 : 72)),
            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16,
            fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, color: muted
          }}>
            <span>{eyebrow}</span>
          </div>
          <div style={{
            position: 'absolute', left: pad, right: pad, top: Math.min(H - (compact ? 60 : 72), wordBottom + (compact ? 24 : 36)),
            display: 'flex', justifyContent: compact ? 'flex-start' : 'space-between', alignItems: 'baseline', gap: 16
          }}>
            <span style={{ fontFamily: serif, fontSize: compact ? 22 : 30, lineHeight: 1.1, letterSpacing: '-0.01em', color: ink }}>{caption}</span>
          </div>
        </div>

        <div style={{ position: 'absolute', left: pad, right: pad, bottom: compact ? 30 : pad + 8, color: overlayInk, pointerEvents: 'none' }}>
          <h3 aria-label={overlayTitle.join(' ')}
            style={{ margin: 0, fontFamily: serif, fontWeight: 400, fontSize: titleSize, lineHeight: 0.95, letterSpacing: '-0.03em' }}>
            {overlayTitle.map((l, j) => (
              <span key={j} aria-hidden="true" style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.08em', marginBottom: '-0.08em' }}>
                <span ref={(el) => { lineRefs.current[j] = el; }} style={{ display: 'block', transform: 'translate3d(0,112%,0)', willChange: 'transform' }}>{l}</span>
              </span>
            ))}
          </h3>
          <div ref={metaRef} style={{ opacity: 0, marginTop: compact ? 18 : 28, display: 'flex', flexDirection: compact ? 'column' : 'row', gap: compact ? 10 : 56, alignItems: compact ? 'flex-start' : 'baseline' }}>
            <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, whiteSpace: 'nowrap', opacity: 0.85 }}>{overlayEyebrow}</div>
            <p style={{ margin: 0, maxWidth: 440, fontSize: compact ? 14 : 16, lineHeight: 1.55, fontWeight: 300, opacity: 0.92 }}>{overlayText}</p>
          </div>
        </div>

        <style>{`
          @keyframes ${uid}-in { from { opacity: 0; transform: scale(0.96); filter: blur(8px); } to { opacity: 1; transform: none; filter: blur(0); } }
          @media (prefers-reduced-motion: reduce) { .${uid} svg { animation: none !important; } }
        `}</style>
      </div>
    </section>
  );
}

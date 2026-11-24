const MANIFEST = {
  "type": "Scrub.StackedPanels",
  "description": "Scroll-scrubbed deck of full-stage photo panels: each new panel slides up over the last while the covered panel recedes into a rounded, dimmed, softly blurred card stack and the title lines rise as their panel arrives",
  "editorElement": {
    "selector": ".stacked-panels",
    "displayName": "Stacked Panels",
    "archetype": "container",
    "data": {
      "label": { "dataType": "text", "displayName": "Section Label", "defaultValue": "The Collection — 2026", "group": "Content" },
      "panelCount": { "dataType": "select", "displayName": "Number of Panels", "defaultValue": "5", "options": ["3", "4", "5", "6"], "group": "Content" },
      "panel1Title": { "dataType": "text", "displayName": "Panel 1 Title (| = line break)", "defaultValue": "Coastal|Retreat", "group": "Panels" },
      "panel1Location": { "dataType": "text", "displayName": "Panel 1 Location", "defaultValue": "Algarve, Portugal", "group": "Panels" },
      "panel1Text": { "dataType": "text", "displayName": "Panel 1 Text", "defaultValue": "Cliffside suites carved into ochre rock, every room turned toward the Atlantic and the long gold of the evening.", "group": "Panels" },
      "panel1Image": { "dataType": "text", "displayName": "Panel 1 Image URL", "defaultValue": "https://picsum.photos/id/1050/2000/1300", "group": "Panels" },
      "panel2Title": { "dataType": "text", "displayName": "Panel 2 Title (| = line break)", "defaultValue": "Alpine|Silence", "group": "Panels" },
      "panel2Location": { "dataType": "text", "displayName": "Panel 2 Location", "defaultValue": "Engadin, Switzerland", "group": "Panels" },
      "panel2Text": { "dataType": "text", "displayName": "Panel 2 Text", "defaultValue": "A timber lodge above the tree line, where the only sound in the morning is snow settling on the larches.", "group": "Panels" },
      "panel2Image": { "dataType": "text", "displayName": "Panel 2 Image URL", "defaultValue": "https://picsum.photos/id/1036/2000/1300", "group": "Panels" },
      "panel3Title": { "dataType": "text", "displayName": "Panel 3 Title (| = line break)", "defaultValue": "Valley|Lodge", "group": "Panels" },
      "panel3Location": { "dataType": "text", "displayName": "Panel 3 Location", "defaultValue": "Yosemite, California", "group": "Panels" },
      "panel3Text": { "dataType": "text", "displayName": "Panel 3 Text", "defaultValue": "Granite walls, cold river light and twelve cabins set quietly among the pines on the valley floor.", "group": "Panels" },
      "panel3Image": { "dataType": "text", "displayName": "Panel 3 Image URL", "defaultValue": "https://picsum.photos/id/1043/2000/1300", "group": "Panels" },
      "panel4Title": { "dataType": "text", "displayName": "Panel 4 Title (| = line break)", "defaultValue": "Northern|Lights", "group": "Panels" },
      "panel4Location": { "dataType": "text", "displayName": "Panel 4 Location", "defaultValue": "Tromsø, Norway", "group": "Panels" },
      "panel4Text": { "dataType": "text", "displayName": "Panel 4 Text", "defaultValue": "Glass-roofed rooms beneath the aurora, warm stone floors and a sauna at the edge of the forest.", "group": "Panels" },
      "panel4Image": { "dataType": "text", "displayName": "Panel 4 Image URL", "defaultValue": "https://picsum.photos/id/1022/2000/1300", "group": "Panels" },
      "panel5Title": { "dataType": "text", "displayName": "Panel 5 Title (| = line break)", "defaultValue": "Desert|Bloom", "group": "Panels" },
      "panel5Location": { "dataType": "text", "displayName": "Panel 5 Location", "defaultValue": "Wadi Rum, Jordan", "group": "Panels" },
      "panel5Text": { "dataType": "text", "displayName": "Panel 5 Text", "defaultValue": "Rammed-earth pavilions that glow at dusk, open to the red canyon and a sky crowded with stars.", "group": "Panels" },
      "panel5Image": { "dataType": "text", "displayName": "Panel 5 Image URL", "defaultValue": "https://picsum.photos/id/1016/2000/1300", "group": "Panels" },
      "panel6Title": { "dataType": "text", "displayName": "Panel 6 Title (| = line break)", "defaultValue": "Highland|House", "group": "Panels" },
      "panel6Location": { "dataType": "text", "displayName": "Panel 6 Location", "defaultValue": "Isle of Skye, Scotland", "group": "Panels" },
      "panel6Text": { "dataType": "text", "displayName": "Panel 6 Text", "defaultValue": "A restored croft on the ridge, peat fires, wool blankets and weather that changes every hour.", "group": "Panels" },
      "panel6Image": { "dataType": "text", "displayName": "Panel 6 Image URL", "defaultValue": "https://picsum.photos/id/1018/2000/1300", "group": "Panels" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#0C0C0D", "group": "Colors" },
      "textColor": { "dataType": "color", "displayName": "Text", "defaultValue": "#FAFAF9", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#D6D3D1", "group": "Colors" },
      "scrimColor": { "dataType": "color", "displayName": "Image Scrim", "defaultValue": "#0C0A09", "group": "Colors" },
      "displayFont": { "dataType": "select", "displayName": "Display Font", "defaultValue": "Instrument Serif", "options": ["Instrument Serif", "Fraunces", "Inter Tight", "Georgia"], "group": "Typography" },
      "bodyFont": { "dataType": "select", "displayName": "Body Font", "defaultValue": "Inter", "options": ["Inter", "DM Sans", "system-ui"], "group": "Typography" },
      "titleScale": { "dataType": "select", "displayName": "Title Scale", "defaultValue": "large", "options": ["medium", "large", "huge"], "group": "Typography" },
      "titleWeight": { "dataType": "select", "displayName": "Title Weight", "defaultValue": "400", "options": ["300", "400", "500"], "group": "Typography" },
      "screensPerPanel": { "dataType": "select", "displayName": "Scroll per Panel (screens)", "defaultValue": "1", "options": ["0.7", "1", "1.3", "1.6"], "group": "Layout" },
      "showCounter": { "dataType": "booleanValue", "displayName": "Show Index Counter", "defaultValue": "true", "group": "Layout" },
      "stackDepth": { "dataType": "select", "displayName": "Stack Depth", "defaultValue": "medium", "options": ["subtle", "medium", "deep"], "group": "Animation", "description": "How far covered panels scale back" },
      "cornerRadius": { "dataType": "select", "displayName": "Card Corner Radius (px)", "defaultValue": "20", "options": ["0", "10", "20", "32"], "group": "Animation" },
      "dimAmount": { "dataType": "select", "displayName": "Covered Panel Dim", "defaultValue": "0.55", "options": ["0.3", "0.55", "0.75"], "group": "Animation" },
      "blurCovered": { "dataType": "booleanValue", "displayName": "Blur Covered Panels", "defaultValue": "true", "group": "Animation" },
      "smoothing": { "dataType": "select", "displayName": "Scrub Smoothing", "defaultValue": "0.12", "options": ["0.06", "0.12", "0.2", "1"], "group": "Animation", "description": "1 = locked to the scrollbar, lower = more glide" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const defaults = [
    ['Coastal|Retreat', 'Algarve, Portugal', 'Cliffside suites carved into ochre rock, every room turned toward the Atlantic and the long gold of the evening.', 1050],
    ['Alpine|Silence', 'Engadin, Switzerland', 'A timber lodge above the tree line, where the only sound in the morning is snow settling on the larches.', 1036],
    ['Valley|Lodge', 'Yosemite, California', 'Granite walls, cold river light and twelve cabins set quietly among the pines on the valley floor.', 1043],
    ['Northern|Lights', 'Tromsø, Norway', 'Glass-roofed rooms beneath the aurora, warm stone floors and a sauna at the edge of the forest.', 1022],
    ['Desert|Bloom', 'Wadi Rum, Jordan', 'Rammed-earth pavilions that glow at dusk, open to the red canyon and a sky crowded with stars.', 1016],
    ['Highland|House', 'Isle of Skye, Scotland', 'A restored croft on the ridge, peat fires, wool blankets and weather that changes every hour.', 1018]
  ];
  const count = Math.max(3, Math.min(6, parseInt(config?.panelCount || '5', 10) || 5));
  const panels = React.useMemo(() => defaults.slice(0, count).map((d, i) => ({
    title: String(config?.[`panel${i + 1}Title`] || d[0]).split('|'),
    location: config?.[`panel${i + 1}Location`] || d[1],
    text: config?.[`panel${i + 1}Text`] || d[2],
    image: config?.[`panel${i + 1}Image`] || `https://picsum.photos/id/${d[3]}/2000/1300`
  })), [config, count]); // eslint-disable-line react-hooks/exhaustive-deps

  const label = config?.label || 'The Collection — 2026';
  const bg = config?.backgroundColor || '#0C0C0D';
  const ink = config?.textColor || '#FAFAF9';
  const muted = config?.mutedColor || '#D6D3D1';
  const scrim = config?.scrimColor || '#0C0A09';
  const displayFont = config?.displayFont || 'Instrument Serif';
  const bodyFont = config?.bodyFont || 'Inter';
  const titleScale = { medium: 0.78, large: 1, huge: 1.22 }[config?.titleScale || 'large'] || 1;
  const titleWeight = config?.titleWeight || '400';
  const spp = parseFloat(config?.screensPerPanel || '1') || 1;
  const showCounter = bool(config?.showCounter, true);
  const scaleStep = { subtle: 0.05, medium: 0.09, deep: 0.13 }[config?.stackDepth || 'medium'] || 0.09;
  const radius = parseInt(config?.cornerRadius || '20', 10) || 0;
  const dim = parseFloat(config?.dimAmount || '0.55') || 0.55;
  const blurOn = bool(config?.blurCovered, true);
  const smoothing = Math.min(1, Math.max(0.02, parseFloat(config?.smoothing || '0.12') || 0.12));

  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const uid = React.useMemo(() => 'sp' + Math.random().toString(36).slice(2, 9), []);

  React.useEffect(() => {
    const families = {
      'Instrument Serif': 'Instrument+Serif:ital@0;1', 'Fraunces': 'Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500',
      'Inter Tight': 'Inter+Tight:wght@300;400;500', 'Inter': 'Inter:wght@300;400;500', 'DM Sans': 'DM+Sans:wght@300;400;500'
    };
    [families[displayFont], families[bodyFont]].filter(Boolean).forEach((f) => {
      const id = 'gf-' + f.replace(/[^a-z0-9]/gi, '').slice(0, 40);
      if (document.getElementById(id)) return;
      const l = document.createElement('link');
      l.id = id; l.rel = 'stylesheet';
      l.href = `https://fonts.googleapis.com/css2?family=${f}&display=swap`;
      document.head.appendChild(l);
    });
  }, [displayFont, bodyFont]);

  const sectionRef = React.useRef(null);
  const panelRefs = React.useRef([]);
  const imgRefs = React.useRef([]);
  const dimRefs = React.useRef([]);
  const lineRefs = React.useRef([]);
  const metaRefs = React.useRef([]);
  const segRefs = React.useRef([]);
  const textRefs = React.useRef([]);
  const counterRef = React.useRef(null);
  const applyRef = React.useRef(null);
  const st = React.useRef({ target: reduced ? 1 : 0, cur: reduced ? 1 : 0 });
  const [dims, setDims] = React.useState({ w: 1280, h: 760 });

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
      S.cur = Math.abs(d) < 0.0002 ? S.target : S.cur + d * smoothing;
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
  const peek = compact ? 9 : 14;
  const N = panels.length;
  const screens = 1 + (N - 1) * spp;

  const clamp = (v) => Math.min(1, Math.max(0, v));
  const easeIO = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const expoOut = (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  applyRef.current = (p) => {
    const u = clamp((p - 0.03) / 0.94) * (N - 1);
    const e = panels.map((_, i) => (i === 0 ? 1 : easeIO(clamp((u - (i - 1)) / 0.8))));
    let pos = 0;
    for (let i = 1; i < N; i++) pos += e[i];
    panels.forEach((_, i) => {
      let depth = 0;
      for (let j = i + 1; j < N; j++) depth += e[j];
      const el = panelRefs.current[i];
      if (el) {
        const d1 = Math.min(depth, 1);
        const sc = 1 - scaleStep * d1 - scaleStep * 0.45 * Math.max(0, Math.min(depth, 3) - 1);
        const y = (1 - e[i]) * (H + 24) + i * peek - Math.min(depth, 3) * peek * 0.35;
        el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) scale(${sc.toFixed(4)})`;
        const r = i === 0 ? radius * d1 : radius;
        el.style.borderRadius = `${r.toFixed(1)}px ${r.toFixed(1)}px 0 0`;
        el.style.visibility = depth > 3.2 || e[i] <= 0 ? 'hidden' : 'visible';
        el.style.filter = blurOn && depth > 0.02 ? `blur(${(3 * d1).toFixed(2)}px)` : 'none';
      }
      const im = imgRefs.current[i];
      if (im) {
        const enter = (1 - e[i]) * -H * 0.32;
        const drift = Math.min(depth, 1) * H * 0.05;
        im.style.transform = `translate3d(0, ${(enter + drift).toFixed(2)}px, 0) scale(${(1.08 + (1 - e[i]) * 0.08).toFixed(4)})`;
      }
      const dm = dimRefs.current[i];
      if (dm) dm.style.opacity = (dim * Math.min(depth, 1) + 0.15 * Math.max(0, Math.min(depth, 2) - 1)).toFixed(3);
      const lines = lineRefs.current[i] || [];
      lines.forEach((ln, j) => {
        if (!ln) return;
        const r2 = i === 0 ? 1 : expoOut(clamp((e[i] - 0.38 - j * 0.1) / 0.5));
        ln.style.transform = `translate3d(0, ${((1 - r2) * 110).toFixed(2)}%, 0)`;
      });
      const mt = metaRefs.current[i];
      if (mt) {
        const m = i === 0 ? 1 : easeOut(clamp((e[i] - 0.62) / 0.38));
        mt.style.opacity = m.toFixed(3);
        mt.style.transform = `translate3d(0, ${((1 - m) * 22).toFixed(2)}px, 0)`;
      }
      const tx = textRefs.current[i];
      if (tx) {
        const m2 = i === 0 ? 1 : easeOut(clamp((e[i] - 0.7) / 0.3));
        tx.style.opacity = m2.toFixed(3);
        tx.style.transform = `translate3d(0, ${((1 - m2) * 26).toFixed(2)}px, 0)`;
      }
      const sg = segRefs.current[i];
      if (sg) sg.style.transform = `scaleX(${(i === 0 ? 1 : e[i]).toFixed(4)})`;
    });
    if (counterRef.current) counterRef.current.style.transform = `translate3d(0, ${(-pos * 1.2).toFixed(4)}em, 0)`;
  };

  React.useLayoutEffect(() => {
    if (applyRef.current) applyRef.current(st.current.cur);
  });

  const serif = displayFont === 'Georgia' ? 'Georgia, "Times New Roman", serif'
    : displayFont === 'Inter Tight' ? '"Inter Tight", Inter, -apple-system, sans-serif'
      : `"${displayFont}", Georgia, "Times New Roman", serif`;
  const sans = bodyFont === 'system-ui' ? 'system-ui, -apple-system, sans-serif' : `"${bodyFont}", -apple-system, "Helvetica Neue", sans-serif`;
  const pad = compact ? 20 : 48;
  const titleSize = Math.round(Math.min(W * (compact ? 0.15 : 0.115), H * (compact ? 0.11 : 0.2)) * titleScale);
  const footerH = compact ? 44 : 56;
  const pad2 = (n) => String(n).padStart(2, '0');
  const ease = 'cubic-bezier(0.22, 1, 0.36, 1)';

  return (
    <section ref={sectionRef} className={`stacked-panels ${uid}`} aria-roledescription="scroll story"
      style={{ position: 'relative', width: '100%', height: `${Math.round(H * screens)}px`, backgroundColor: bg, color: ink, fontFamily: sans }}>
      <div style={{ position: 'sticky', top: 0, height: `${H}px`, overflow: 'hidden', backgroundColor: bg }}>
        {panels.map((pn, i) => (
          <article key={i} ref={(el) => { panelRefs.current[i] = el; }} aria-label={`${pad2(i + 1)} of ${pad2(N)}: ${pn.title.join(' ')}`}
            style={{
              position: 'absolute', left: 0, top: 0, width: '100%', height: H, overflow: 'hidden',
              transformOrigin: '50% 0%', willChange: 'transform', backgroundColor: '#1C1917', zIndex: i + 1,
              transform: i === 0 ? 'none' : `translate3d(0, ${H + 24}px, 0)`,
              boxShadow: i === 0 ? 'none' : '0 -24px 60px rgba(0,0,0,0.35)'
            }}>
            <img ref={(el) => { imgRefs.current[i] = el; }} src={pn.image} alt={pn.title.join(' ')} draggable="false" loading="eager"
              style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', transformOrigin: '50% 50%', willChange: 'transform' }} />
            <div aria-hidden="true" style={{
              position: 'absolute', inset: 0,
              background: `linear-gradient(180deg, ${scrim}66 0%, ${scrim}00 22%, ${scrim}00 42%, ${scrim}B3 100%)`
            }} />
            <div style={{
              position: 'absolute', left: pad, right: pad, bottom: footerH + pad * (compact ? 0.6 : 0.5) + i * peek,
              display: 'flex', flexDirection: compact ? 'column' : 'row', alignItems: compact ? 'flex-start' : 'flex-end',
              justifyContent: 'space-between', gap: compact ? 14 : 48
            }}>
              <div>
                <div ref={(el) => { metaRefs.current[i] = el; }}
                  style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, color: muted, marginBottom: compact ? 12 : 18 }}>
                  {pn.location}
                </div>
                <h3 aria-hidden="true" style={{ margin: 0, fontFamily: serif, fontWeight: titleWeight, fontSize: titleSize, lineHeight: 0.92, letterSpacing: '-0.03em' }}>
                  {pn.title.map((l, j) => (
                    <span key={j} style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.08em', marginBottom: '-0.08em' }}>
                      <span ref={(el) => { if (!lineRefs.current[i]) lineRefs.current[i] = []; lineRefs.current[i][j] = el; }}
                        style={{ display: 'block', willChange: 'transform', transform: i === 0 ? 'none' : 'translate3d(0,110%,0)' }}>
                        <span style={{ display: 'block', animation: i === 0 ? `${uid}-rise 1100ms ${ease} ${200 + j * 110}ms both` : 'none' }}>{l}</span>
                      </span>
                    </span>
                  ))}
                </h3>
              </div>
              <p style={{
                margin: 0, maxWidth: compact ? '100%' : 340, fontSize: compact ? 14 : 15, lineHeight: 1.55, color: muted, fontWeight: 300,
                animation: i === 0 ? `${uid}-fade 1000ms ${ease} 520ms both` : 'none'
              }}>
                <span ref={(el) => { textRefs.current[i] = el; }} style={{ display: 'block' }}>{pn.text}</span>
              </p>
            </div>
            <div ref={(el) => { dimRefs.current[i] = el; }} aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundColor: '#000', opacity: 0, pointerEvents: 'none' }} />
          </article>
        ))}

        <div style={{ position: 'absolute', left: pad, top: compact ? 18 : 28, zIndex: 20, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, color: ink, mixBlendMode: 'difference' }}>
          {label}
        </div>

        <div style={{ position: 'absolute', left: pad, right: pad, bottom: compact ? 18 : 28, zIndex: 20, display: 'flex', alignItems: 'center', gap: compact ? 14 : 24 }}>
          <div aria-hidden="true" style={{ flex: 1, display: 'flex', gap: 6 }}>
            {panels.map((_, i) => (
              <div key={i} style={{ flex: 1, height: 2, backgroundColor: 'rgba(255,255,255,0.22)', overflow: 'hidden', borderRadius: 2 }}>
                <div ref={(el) => { segRefs.current[i] = el; }} style={{ width: '100%', height: '100%', backgroundColor: ink, transformOrigin: '0 50%', transform: i === 0 ? 'scaleX(1)' : 'scaleX(0)' }} />
              </div>
            ))}
          </div>
          {showCounter && (
            <div aria-hidden="true" style={{ display: 'flex', alignItems: 'center', fontSize: compact ? 13 : 14, fontVariantNumeric: 'tabular-nums', letterSpacing: '0.06em', fontWeight: 400 }}>
              <span style={{ display: 'inline-block', height: '1.2em', lineHeight: '1.2em', overflow: 'hidden' }}>
                <span ref={counterRef} style={{ display: 'block', willChange: 'transform' }}>
                  {panels.map((_, i) => <span key={i} style={{ display: 'block', height: '1.2em' }}>{pad2(i + 1)}</span>)}
                </span>
              </span>
              <span style={{ color: muted, opacity: 0.7, margin: '0 0.5em' }}>/</span>
              <span style={{ color: muted, opacity: 0.7 }}>{pad2(N)}</span>
            </div>
          )}
        </div>

        <style>{`
          @keyframes ${uid}-rise { from { transform: translate3d(0, 110%, 0); } to { transform: translate3d(0, 0, 0); } }
          @keyframes ${uid}-fade { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
          @media (prefers-reduced-motion: reduce) { .${uid} * { animation: none !important; } }
        `}</style>
      </div>
    </section>
  );
}

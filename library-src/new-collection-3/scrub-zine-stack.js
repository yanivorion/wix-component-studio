const MANIFEST = {
  "type": "Scrub.ZineStack",
  "description": "A pile of printed zine cards on a table; scrolling deals them one by one, each card lifting, flipping in 3D and landing in a grid until the backs together read as one full poster spread",
  "editorElement": {
    "selector": ".zine-stack",
    "displayName": "Zine Stack",
    "archetype": "container",
    "data": {
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Zine / Issue 09", "group": "Content" },
      "title": { "dataType": "text", "displayName": "Title", "defaultValue": "Deal the issue", "group": "Content" },
      "coverLabel": { "dataType": "text", "displayName": "Card Cover Label", "defaultValue": "Loose Leaf", "group": "Content" },
      "posterWord": { "dataType": "text", "displayName": "Spread Word", "defaultValue": "Zine", "group": "Spread", "description": "Large word across the dealt cards" },
      "posterLine": { "dataType": "text", "displayName": "Spread Line", "defaultValue": "Nine loose pages, one picture when they land", "group": "Spread" },
      "posterImage": { "dataType": "text", "displayName": "Spread Image", "defaultValue": "https://picsum.photos/seed/harbor/1200/900?grayscale", "group": "Spread" },
      "posterNote": { "dataType": "text", "displayName": "Spread Note", "defaultValue": "Printed in two colours on recycled stock. Shuffle, deal, read.", "group": "Spread" },
      "cardCount": { "dataType": "select", "displayName": "Cards", "defaultValue": "9", "options": ["6", "8", "9"], "group": "Cards" },
      "flipAxis": { "dataType": "select", "displayName": "Flip Axis", "defaultValue": "side", "options": ["side", "top"], "group": "Cards" },
      "liftHeight": { "dataType": "select", "displayName": "Lift Height", "defaultValue": "medium", "options": ["low", "medium", "high"], "group": "Cards" },
      "tableColor": { "dataType": "color", "displayName": "Table", "defaultValue": "#DEDBD4", "group": "Colors" },
      "paperColor": { "dataType": "color", "displayName": "Paper", "defaultValue": "#F4F3EF", "group": "Colors" },
      "coverColor": { "dataType": "color", "displayName": "Card Cover", "defaultValue": "#1A1A19", "group": "Colors" },
      "inkColor": { "dataType": "color", "displayName": "Ink", "defaultValue": "#121211", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted", "defaultValue": "#75726B", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent", "defaultValue": "#D9480F", "group": "Colors" },
      "fontFamily": { "dataType": "select", "displayName": "Grotesk", "defaultValue": "Inter Tight", "options": ["Inter Tight", "Inter", "Helvetica Neue", "system-ui"], "group": "Typography" },
      "wordWeight": { "dataType": "select", "displayName": "Word Weight", "defaultValue": "500", "options": ["300", "400", "500"], "group": "Typography" },
      "scrollLength": { "dataType": "select", "displayName": "Scroll Length (screens)", "defaultValue": "5", "options": ["3", "4", "5", "6"], "group": "Layout" },
      "tilt": { "dataType": "select", "displayName": "Table Angle", "defaultValue": "medium", "options": ["subtle", "medium", "steep"], "group": "Layout" },
      "showSlots": { "dataType": "booleanValue", "displayName": "Slot Guides", "defaultValue": "true", "group": "Layout" },
      "showLabels": { "dataType": "booleanValue", "displayName": "Corner Labels", "defaultValue": "true", "group": "Layout" },
      "smoothing": { "dataType": "select", "displayName": "Scrub Smoothing", "defaultValue": "0.14", "options": ["0.08", "0.14", "0.22", "1"], "group": "Animation", "description": "1 = locked to the scrollbar, lower = more glide" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const eyebrow = config?.eyebrow || 'Zine / Issue 09';
  const title = config?.title || 'Deal the issue';
  const coverLabel = config?.coverLabel || 'Loose Leaf';
  const posterWord = String(config?.posterWord || 'Zine').slice(0, 8);
  const posterLine = config?.posterLine || 'Nine loose pages, one picture when they land';
  const posterImage = config?.posterImage || 'https://picsum.photos/seed/harbor/1200/900?grayscale';
  const posterNote = config?.posterNote || 'Printed in two colours on recycled stock. Shuffle, deal, read.';
  const n = [6, 8, 9].indexOf(parseInt(config?.cardCount || '9', 10)) >= 0 ? parseInt(config?.cardCount || '9', 10) : 9;
  const flipAxis = config?.flipAxis === 'top' ? 'top' : 'side';
  const liftK = { low: 0.6, medium: 1, high: 1.5 }[config?.liftHeight || 'medium'] ?? 1;
  const tableC = config?.tableColor || '#DEDBD4';
  const paper = config?.paperColor || '#F4F3EF';
  const cover = config?.coverColor || '#1A1A19';
  const ink = config?.inkColor || '#121211';
  const muted = config?.mutedColor || '#75726B';
  const accent = config?.accentColor || '#D9480F';
  const fontFamily = config?.fontFamily || 'Inter Tight';
  const wordWeight = config?.wordWeight || '500';
  const screens = parseFloat(config?.scrollLength || '5') || 5;
  const tiltDeg = { subtle: 18, medium: 30, steep: 42 }[config?.tilt || 'medium'] ?? 30;
  const showSlots = bool(config?.showSlots, true);
  const showLabels = bool(config?.showLabels, true);
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
  const ease = (t) => 1 - Math.pow(1 - t, 3);
  const lerp = (a, b, t) => a + (b - a) * t;
  const hash = (i, k) => { const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return x - Math.floor(x); };

  const compact = width < 760;
  const C = n === 8 ? 4 : 3;
  const R = Math.ceil(n / C);
  const gap = compact ? 4 : 7;
  const cosT = Math.cos((tiltDeg * 0.42 * Math.PI) / 180);
  const aspect = n === 8 ? 1.25 : 1.3;
  let cw;
  if (compact) {
    cw = Math.min((width * 0.9 - gap * (C - 1)) / C, ((stageH * 0.44) / cosT - gap * (R - 1)) / (R * aspect));
  } else {
    cw = Math.min((width * 0.5 - gap * (C - 1)) / C, ((stageH * 0.68) / cosT - gap * (R - 1)) / (R * aspect));
  }
  cw = Math.round(cw);
  const ch = Math.round(cw * aspect);
  const gridW = C * cw + (C - 1) * gap;
  const gridH = R * ch + (R - 1) * gap;
  const gridX = compact ? -gridW / 2 : width * 0.17 - gridW / 2;
  const gridY = compact ? -gridH / 2 + (stageH * 0.12) / cosT : -gridH / 2;
  const pileX = compact ? -cw * 0.5 : -width * 0.3 - cw / 2;
  const pileY = compact ? gridY - ch - (stageH * 0.08) / cosT : -ch / 2;

  const mono = '"JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace';
  const sans = fontFamily === 'system-ui' ? 'system-ui, -apple-system, sans-serif' : `"${fontFamily}", "Inter", -apple-system, "Helvetica Neue", sans-serif`;
  const u = gridW / 100;
  const lab = Math.max(7, u * 1.15);

  const poster = React.useMemo(() => {
    const fs = Math.min(gridW / (Math.max(1, posterWord.length) * 0.56), gridH * 0.4);
    const imgTop = gridH * 0.5;
    const textX = (C - 1) * (cw + gap) + cw * 0.1;
    return (
      <div style={{ position: 'absolute', left: 0, top: 0, width: gridW, height: gridH, background: paper, color: ink, overflow: 'hidden', fontFamily: sans }}>
        <div style={{ position: 'absolute', left: u * 3, right: u * 3, top: u * 3, display: 'flex', justifyContent: 'space-between', fontFamily: mono, fontSize: lab, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          <span>{eyebrow}</span><span>{n} cards</span><span>2026</span>
        </div>
        <div style={{ position: 'absolute', left: u * 1.5, top: u * 7, fontSize: fs, lineHeight: 0.8, fontWeight: wordWeight, letterSpacing: '-0.06em', whiteSpace: 'nowrap', paddingTop: fs * 0.08 }}>{posterWord}</div>
        <div style={{ position: 'absolute', right: u * 4, top: u * 7 + fs * 0.12, width: u * 11, height: u * 11, borderRadius: '50%', background: accent }} />
        <div style={{ position: 'absolute', left: u * 3, right: u * 3, top: imgTop - u * 4, height: 1, background: ink }} />
        <div style={{ position: 'absolute', left: u * 3, top: imgTop - u * 2.6, fontFamily: mono, fontSize: lab, letterSpacing: '0.12em', textTransform: 'uppercase', color: accent }}>Fig. 01</div>
        <div style={{ position: 'absolute', left: u * 3, width: textX - cw * 0.2 - u * 3, top: imgTop, bottom: u * 3, overflow: 'hidden', background: '#cfccc5' }}>
          <img src={posterImage} alt="" draggable="false" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', mixBlendMode: 'multiply', filter: 'contrast(1.1)' }} />
        </div>
        <div style={{ position: 'absolute', left: textX, right: cw * 0.1, top: imgTop, fontSize: u * 3.6, lineHeight: 1.05, letterSpacing: '-0.03em', fontWeight: 500 }}>{posterLine}</div>
        <div style={{ position: 'absolute', left: textX, right: cw * 0.1, bottom: u * 3, fontFamily: mono, fontSize: lab, lineHeight: 1.6, letterSpacing: '0.04em', textTransform: 'uppercase', color: muted }}>{posterNote}</div>
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gridW, gridH, cw, gap, C, paper, ink, muted, accent, sans, wordWeight, posterWord, posterLine, posterImage, posterNote, eyebrow, n]);

  const coverFace = (i) => (
    <div style={{ position: 'absolute', inset: 0, background: cover, color: paper, overflow: 'hidden', fontFamily: sans }}>
      <div style={{ position: 'absolute', left: cw * 0.08, right: cw * 0.08, top: cw * 0.08, display: 'flex', justifyContent: 'space-between', fontFamily: mono, fontSize: Math.max(6.5, cw * 0.05), letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.75 }}>
        <span>{coverLabel}</span><span>{String(i + 1).padStart(2, '0')}/{String(n).padStart(2, '0')}</span>
      </div>
      <div style={{ position: 'absolute', left: cw * 0.06, bottom: cw * 0.02, fontSize: cw * 0.56, lineHeight: 0.8, letterSpacing: '-0.06em', fontWeight: 400, fontStyle: 'normal' }}>{String(i + 1).padStart(2, '0')}</div>
      <div style={{ position: 'absolute', right: cw * 0.09, bottom: cw * 0.1, width: cw * 0.09, height: cw * 0.09, borderRadius: '50%', background: accent }} />
    </div>
  );

  // deal timeline: overlapping flights
  const d0 = 0.09, d1 = 0.88;
  const introT = prefersReducedMotion ? 1 : easeIO(seg(0.005, 0.085));
  const bigS = compact ? 2.1 : 1.9;
  const pileS = lerp(bigS, 1, introT);
  const pcx = lerp(-cw / 2, pileX, introT);
  const pcy = lerp(-ch / 2 + (compact ? 0 : ch * 0.04), pileY, introT);
  const step = (d1 - d0) / (n + 0.9);
  const flight = step * 1.9;
  const camT = easeIO(seg(0.82, 1));
  const tilt = lerp(lerp(tiltDeg * 0.5, tiltDeg, introT), tiltDeg * 0.42, camT);
  const rz = lerp(compact ? 0 : -3, 0, camT);
  const liftH = Math.max(60, ch * 0.75) * liftK;

  let landed = 0, inFlight = -1;
  const cards = Array.from({ length: n }, (_, i) => {
    const t = seg(d0 + i * step, d0 + i * step + flight);
    if (t >= 1) landed++;
    else if (t > 0 && inFlight < 0) inFlight = i;
    const col = i % C, row = Math.floor(i / C);
    const fanR = i === 0 ? -2 : Math.min(i, 5) * 6.5 - 1 + (hash(i, 5) - 0.5) * 3;
    const fanX = i === 0 ? 0 : Math.min(i, 5) * cw * 0.05;
    const sx = pcx + lerp(fanX, (hash(i, 1) - 0.5) * cw * 0.16, introT);
    const sy = pcy + lerp(-Math.min(i, 5) * cw * 0.012, (hash(i, 2) - 0.5) * cw * 0.12, introT);
    const sr = lerp(fanR, i === 0 ? -1.5 : (hash(i, 3) - 0.5) * 22, introT);
    const sz = (n - i) * 1.8;
    const ex = gridX + col * (cw + gap);
    const ey = gridY + row * (ch + gap);
    const er = (hash(i, 4) - 0.5) * 2.6;
    const ez = 0.6 + i * 0.12;
    const m = easeIO(t);
    const x = lerp(sx, ex, m);
    const y = lerp(sy, ey, m);
    const z = lerp(sz, ez, m) + Math.sin(Math.PI * Math.min(1, t * 1.08)) * liftH;
    const r = lerp(sr, er, ease(t));
    const flip = easeIO(clamp((t - 0.08) / 0.72)) * 180;
    const tiltIn = Math.sin(Math.PI * t) * -10;
    const flipTf = flipAxis === 'top' ? `rotateX(${-flip}deg) rotateY(${tiltIn * 0.6}deg)` : `rotateY(${flip}deg) rotateX(${tiltIn}deg)`;
    const backTf = flipAxis === 'top' ? 'rotateX(180deg)' : 'rotateY(180deg)';
    const shade = Math.abs(Math.sin((flip * Math.PI) / 180)) * 0.35;
    const col0 = -(col * (cw + gap)), row0 = -(row * (ch + gap));
    const air = Math.sin(Math.PI * Math.min(1, t * 1.08));
    const face = { position: 'absolute', inset: 0, overflow: 'hidden', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', borderRadius: 2 };
    return {
      z,
      shadow: (
        <div key={`s${i}`} aria-hidden="true" style={{
          position: 'absolute', left: 0, top: 0, width: cw, height: ch, borderRadius: 3,
          transform: `translate3d(${x + air * liftH * 0.35}px, ${y + air * liftH * 0.55}px, 0.2px) rotateZ(${r}deg) scale(${1 + air * 0.08})`,
          background: 'rgba(18,18,17,0.9)', opacity: (t > 0 ? lerp(0.22, 0.12, air) : 0) * (t >= 1 ? 0.9 : 1), filter: `blur(${3 + air * 16}px)`
        }} />
      ),
      card: (
        <div key={i} style={{ position: 'absolute', left: 0, top: 0, width: cw, height: ch, transformStyle: 'preserve-3d', transform: `translate3d(${x}px, ${y}px, ${z}px) rotateZ(${r}deg) scale(${t > 0 ? 1 : pileS}) ${flipTf}` }}>
          <div style={{ ...face, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)' }}>
            {coverFace(i)}
            <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(120deg, rgba(255,255,255,${0.08 + shade * 0.2}), rgba(0,0,0,${shade}))` }} />
          </div>
          <div style={{ ...face, transform: backTf }}>
            <div style={{ position: 'absolute', left: col0, top: row0 }}>{poster}</div>
            <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(300deg, rgba(255,255,255,${shade * 0.3}), rgba(0,0,0,${shade * 0.8}))`, boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.12)' }} />
          </div>
        </div>
      )
    };
  });

  const pad = compact ? 20 : 48;
  const sceneY = stageH * (compact ? 0.53 : 0.54);
  const pileLeft = n - landed - (inFlight >= 0 ? 1 : 0);
  const complete = landed === n;

  return (
    <section ref={sectionRef} className="zine-stack" aria-label={`${title}: ${posterWord}`}
      style={{ position: 'relative', width: '100%', height: `${Math.round(stageH * screens)}px`, backgroundColor: tableC, color: ink, fontFamily: sans }}>
      <div style={{ position: 'sticky', top: 0, height: `${stageH}px`, overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(90% 80% at 40% 35%, rgba(255,255,255,0.45), rgba(255,255,255,0) 70%)' }} />

        {showLabels && (
          <div style={{ position: 'absolute', top: compact ? 22 : 40, left: pad, zIndex: 30 }}>
            <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: muted, marginBottom: 10 }}>{eyebrow}</div>
            <h2 style={{ margin: 0, fontWeight: 500, fontSize: compact ? 26 : 34, lineHeight: 1, letterSpacing: '-0.035em' }}>{title}</h2>
          </div>
        )}

        <div role="img" aria-label={complete ? `All ${n} cards dealt, forming a poster: ${posterWord}. ${posterLine}` : `${landed} of ${n} cards dealt`}
          style={{ position: 'absolute', left: '50%', top: sceneY, width: 0, height: 0, perspective: `${Math.round(Math.max(1500, width * 1.5))}px`, perspectiveOrigin: '50% 20%' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, transformStyle: 'preserve-3d', transform: `translate(${-(gridX + gridW / 2) * camT}px, ${-(gridY + gridH / 2) * Math.cos((tilt * Math.PI) / 180) * camT}px) scale(${1 + (compact ? 0 : 0.08) * camT}) rotateX(${tilt}deg) rotateZ(${rz}deg)` }}>
            {showSlots && Array.from({ length: n }, (_, i) => {
              const col = i % C, row = Math.floor(i / C);
              return (
                <div key={`g${i}`} aria-hidden="true" style={{ position: 'absolute', left: gridX + col * (cw + gap), top: gridY + row * (ch + gap), width: cw, height: ch, border: `1px dashed ${muted}`, opacity: 0.6 * introT, boxSizing: 'border-box', borderRadius: 2 }}>
                  <span style={{ position: 'absolute', left: 8, top: 7, fontFamily: mono, fontSize: 10, letterSpacing: '0.12em', color: muted }}>{String(i + 1).padStart(2, '0')}</span>
                </div>
              );
            })}
            <div aria-hidden="true" style={{ position: 'absolute', left: pcx - 6, top: pcy - 4, width: cw + 12, height: ch + 12, background: 'rgba(18,18,17,0.5)', filter: `blur(${12 + (pileS - 1) * 14}px)`, opacity: pileLeft > 0 ? 0.25 + 0.03 * pileLeft : 0, transform: `translate3d(${6 * pileS}px, ${10 * pileS}px, 0.1px) scale(${pileS})` }} />
            {cards.map((c) => c.shadow)}
            {cards.map((c) => c.card)}
          </div>
        </div>

        {showLabels && (
          <div aria-live="polite" style={{ position: 'absolute', left: pad, bottom: compact ? 22 : 38, zIndex: 30, fontFamily: mono }}>
            <div style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: muted }}>{complete ? 'Spread complete' : 'Dealing'}</div>
            <div style={{ fontSize: compact ? 13 : 14, marginTop: 6, letterSpacing: '0.04em', fontVariantNumeric: 'tabular-nums' }}>
              {String(landed).padStart(2, '0')} <span style={{ color: muted }}>/ {String(n).padStart(2, '0')}</span>
            </div>
            <div style={{ marginTop: 10, display: 'flex', gap: 3 }}>
              {Array.from({ length: n }, (_, j) => (
                <div key={j} style={{ width: compact ? 12 : 16, height: 2, background: j < landed ? ink : j === inFlight ? accent : muted, opacity: j < landed || j === inFlight ? 1 : 0.35 }} />
              ))}
            </div>
          </div>
        )}
        {showLabels && (
          <div style={{ position: 'absolute', right: pad, bottom: compact ? 22 : 38, zIndex: 30, fontFamily: mono, fontSize: 11, letterSpacing: '0.14em', color: muted, textAlign: 'right', textTransform: 'uppercase', lineHeight: 1.7 }}>
            <div>In pile</div>
            <div style={{ color: ink, fontVariantNumeric: 'tabular-nums' }}>{String(pileLeft).padStart(2, '0')}</div>
          </div>
        )}
      </div>
    </section>
  );
}

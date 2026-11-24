const MANIFEST = {
  "type": "Scrub.LayerExtrude",
  "description": "A word printed flat on paper lifts into a riso-style stack of outlined layers; the camera orbits to show the depth, the layers fan apart, then slam flat again in one crisp print",
  "editorElement": {
    "selector": ".layer-extrude",
    "displayName": "Layer Extrude",
    "archetype": "container",
    "data": {
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Riso Studies / 07", "group": "Content" },
      "title": { "dataType": "text", "displayName": "Title", "defaultValue": "Every print is a stack", "group": "Content" },
      "word": { "dataType": "text", "displayName": "Word", "defaultValue": "Depth", "group": "Content", "description": "Up to 8 letters reads best" },
      "stampText": { "dataType": "text", "displayName": "Print Stamp", "defaultValue": "Printed — edition of 200", "group": "Content" },
      "layerCount": { "dataType": "select", "displayName": "Layers", "defaultValue": "16", "options": ["12", "16", "20"], "group": "Layers" },
      "strokeWidth": { "dataType": "select", "displayName": "Outline Weight", "defaultValue": "medium", "options": ["hairline", "medium", "bold"], "group": "Layers" },
      "fanStyle": { "dataType": "select", "displayName": "Fan Style", "defaultValue": "fan", "options": ["fan", "spread", "twist"], "group": "Layers" },
      "misregister": { "dataType": "booleanValue", "displayName": "Riso Misregistration", "defaultValue": "true", "group": "Layers" },
      "tableColor": { "dataType": "color", "displayName": "Table", "defaultValue": "#E2E0DA", "group": "Colors" },
      "paperColor": { "dataType": "color", "displayName": "Paper", "defaultValue": "#F5F4F0", "group": "Colors" },
      "inkColor": { "dataType": "color", "displayName": "Ink", "defaultValue": "#141413", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent Layer", "defaultValue": "#D9480F", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted", "defaultValue": "#77746D", "group": "Colors" },
      "fontFamily": { "dataType": "select", "displayName": "Grotesk", "defaultValue": "Inter Tight", "options": ["Inter Tight", "Inter", "Helvetica Neue", "system-ui"], "group": "Typography" },
      "wordWeight": { "dataType": "select", "displayName": "Word Weight", "defaultValue": "500", "options": ["300", "400", "500"], "group": "Typography" },
      "scrollLength": { "dataType": "select", "displayName": "Scroll Length (screens)", "defaultValue": "4", "options": ["3", "4", "5", "6"], "group": "Layout" },
      "showMarks": { "dataType": "booleanValue", "displayName": "Printer's Marks", "defaultValue": "true", "group": "Layout" },
      "showLabels": { "dataType": "booleanValue", "displayName": "Corner Labels", "defaultValue": "true", "group": "Layout" },
      "orbit": { "dataType": "select", "displayName": "Camera Orbit", "defaultValue": "medium", "options": ["subtle", "medium", "dramatic"], "group": "Animation" },
      "smoothing": { "dataType": "select", "displayName": "Scrub Smoothing", "defaultValue": "0.14", "options": ["0.08", "0.14", "0.22", "1"], "group": "Animation", "description": "1 = locked to the scrollbar, lower = more glide" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const eyebrow = config?.eyebrow || 'Riso Studies / 07';
  const title = config?.title || 'Every print is a stack';
  const word = String(config?.word || 'Depth').slice(0, 12);
  const stampText = config?.stampText || 'Printed — edition of 200';
  const L = Math.min(20, Math.max(12, parseInt(config?.layerCount || '16', 10) || 16));
  const sw = { hairline: 0.8, medium: 1.4, bold: 2.2 }[config?.strokeWidth || 'medium'] ?? 1.4;
  const fanStyle = config?.fanStyle || 'fan';
  const misregister = bool(config?.misregister, true);
  const table = config?.tableColor || '#E2E0DA';
  const paper = config?.paperColor || '#F5F4F0';
  const ink = config?.inkColor || '#141413';
  const accent = config?.accentColor || '#D9480F';
  const muted = config?.mutedColor || '#77746D';
  const fontFamily = config?.fontFamily || 'Inter Tight';
  const wordWeight = config?.wordWeight || '500';
  const screens = parseFloat(config?.scrollLength || '4') || 4;
  const showMarks = bool(config?.showMarks, true);
  const showLabels = bool(config?.showLabels, true);
  const orbitK = { subtle: 0.6, medium: 1, dramatic: 1.35 }[config?.orbit || 'medium'] ?? 1;
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
  const easeIn = (t) => t * t * t;
  const ease = (t) => 1 - Math.pow(1 - t, 3);
  const lerp = (a, b, t) => a + (b - a) * t;

  const compact = width < 760;
  const pw = Math.round(compact ? width * 0.9 : Math.min(width * 0.74, stageH * 1.25));
  const ph = Math.round(compact ? Math.min(stageH * 0.42, pw * 1.05) : Math.min(stageH * 0.6, pw * 0.6));
  const fs = Math.min((pw * 0.86) / (Math.max(1, word.length) * 0.58), ph * 0.62);

  const mono = '"JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace';
  const sans = fontFamily === 'system-ui' ? 'system-ui, -apple-system, sans-serif' : `"${fontFamily}", "Inter", -apple-system, "Helvetica Neue", sans-serif`;

  // choreography
  const lift = easeIO(seg(0.06, 0.3));
  const orbitT = easeIO(seg(0.28, 0.56));
  const fanIn = easeIO(seg(0.52, 0.7));
  const collapse = easeIn(seg(0.72, 0.86));
  const printT = seg(0.86, 0.97);
  const hold = 1 - collapse;
  const fan = fanIn * hold;

  const g1 = Math.max(3.5, (fs * 0.72) / L);
  const gap = (g1 * lift + g1 * 0.45 * fan) * hold;
  const camX = (lerp(0, 56, lift) - 8 * orbitT + 4 * fan) * orbitK * hold;
  const camY = (lerp(0, -32, lift) + 62 * orbitT - 8 * fan) * orbitK * hold;
  const camZ = (lerp(0, -10, lift) + 16 * orbitT) * orbitK * hold;
  const sc = lerp(1, compact ? 0.74 : 0.76, Math.max(lift, fan) * hold);
  const bump = printT > 0 && printT < 1 ? Math.sin(Math.PI * Math.min(1, printT * 2.2)) * 0.022 : 0;
  const reg = misregister ? lerp(prefersReducedMotion ? 2 : 5, 2, ease(printT)) : 0;
  const zTop = gap * (L - 1);

  const layers = Array.from({ length: L }, (_, i) => {
    const top = i === L - 1;
    const bottom = i === 0;
    const r = L > 1 ? i / (L - 1) : 0;
    const mid = r - 0.5;
    let fx = 0, fy = 0, fr = 0;
    if (fanStyle === 'fan') { fr = mid * 34 * fan; fx = mid * fs * 0.5 * fan; fy = -Math.abs(mid) * fs * 0.1 * fan; }
    else if (fanStyle === 'spread') { fx = mid * pw * 0.32 * fan; fy = mid * fs * 0.28 * fan; }
    else { fr = r * 75 * fan; }
    const colour = bottom ? accent : top ? ink : i % 2 ? accent : ink;
    const solid = top || bottom;
    const dx = bottom ? reg : 0, dy = bottom ? reg * 0.7 : 0;
    const fade = solid ? 1 : clamp(gap / 2.5);
    return (
      <div key={i} aria-hidden={!top} style={{
        position: 'absolute', left: 0, top: 0, width: 0, height: 0,
        transform: `translate3d(${fx + dx}px, ${fy + dy}px, ${i * gap + (solid ? 0.2 : 0)}px) rotateZ(${fr}deg)`,
        opacity: fade
      }}>
        <div style={{
          position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -54%)', whiteSpace: 'nowrap',
          fontFamily: sans, fontSize: fs, fontWeight: wordWeight, lineHeight: 1, letterSpacing: '-0.05em',
          color: solid ? colour : 'transparent', WebkitTextStroke: solid ? '0' : `${sw}px ${colour}`,
          mixBlendMode: bottom && gap < 1 ? 'multiply' : 'normal'
        }}>{word}</div>
      </div>
    );
  });

  const sceneY = stageH * (compact ? 0.5 : 0.53) + stageH * 0.07 * Math.max(lift, fan) * hold;
  const pad = compact ? 20 : 48;
  const phase = printT >= 1 ? 'Printed' : collapse > 0 ? 'Press' : fanIn > 0.02 ? 'Fan' : orbitT > 0.02 ? 'Orbit' : lift > 0.02 ? 'Lift' : 'Flat';
  const mark = (style) => <div style={{ position: 'absolute', width: 18, height: 18, ...style }} />;
  const markLine = `1px solid ${muted}`;
  const stampOp = ease(seg(0.88, 0.97));

  return (
    <section ref={sectionRef} className="layer-extrude" aria-label={`${title}: ${word}`}
      style={{ position: 'relative', width: '100%', height: `${Math.round(stageH * screens)}px`, backgroundColor: table, color: ink, fontFamily: sans }}>
      <div style={{ position: 'sticky', top: 0, height: `${stageH}px`, overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(80% 70% at 50% 45%, rgba(255,255,255,0.45), rgba(255,255,255,0) 70%)' }} />

        {showLabels && (
          <div style={{ position: 'absolute', top: compact ? 22 : 40, left: pad, right: pad, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 3, gap: 16 }}>
            <div>
              <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: muted, marginBottom: 10 }}>{eyebrow}</div>
              <h2 style={{ margin: 0, fontWeight: 500, fontSize: compact ? 26 : 34, lineHeight: 1, letterSpacing: '-0.035em' }}>{title}</h2>
            </div>
            {!compact && (
              <div style={{ display: 'flex', gap: 6, marginTop: 4 }} aria-hidden="true">
                <div style={{ width: 14, height: 14, background: ink }} />
                <div style={{ width: 14, height: 14, background: accent }} />
                <div style={{ width: 14, height: 14, border: `1px solid ${ink}`, boxSizing: 'border-box' }} />
              </div>
            )}
          </div>
        )}

        <div role="img" aria-label={`${word}, printed as ${L} layers`}
          style={{ position: 'absolute', left: '50%', top: sceneY, width: 0, height: 0, perspective: `${Math.round(Math.max(1400, width * 1.3))}px` }}>
          <div style={{ position: 'absolute', left: 0, top: 0, transformStyle: 'preserve-3d', transform: `scale(${sc + bump}) rotateX(${camX}deg) rotateY(${camY * 0.35}deg) rotateZ(${camZ + camY * 0.4}deg)` }}>
            <div style={{ position: 'absolute', left: -pw / 2, top: -ph / 2, width: pw, height: ph, background: paper, boxShadow: `0 ${2 + lift * 18}px ${8 + lift * 40}px rgba(20,20,19,${0.14 + lift * 0.08}), 0 1px 1px rgba(20,20,19,0.12)` }}>
              {showMarks && (
                <>
                  {mark({ left: 14, top: 14, borderLeft: markLine, borderTop: markLine })}
                  {mark({ right: 14, top: 14, borderRight: markLine, borderTop: markLine })}
                  {mark({ left: 14, bottom: 14, borderLeft: markLine, borderBottom: markLine })}
                  {mark({ right: 14, bottom: 14, borderRight: markLine, borderBottom: markLine })}
                  <div style={{ position: 'absolute', left: 40, top: 16, fontFamily: mono, fontSize: 9.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: muted }}>{word} — {L} layers</div>
                  <div style={{ position: 'absolute', right: 40, bottom: 16, fontFamily: mono, fontSize: 9.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: muted }}>Ink + {accent.toUpperCase()}</div>
                </>
              )}
              <div style={{ position: 'absolute', left: '50%', bottom: compact ? 30 : 38, transform: `translateX(-50%) scale(${lerp(1.3, 1, ease(stampOp))})`, opacity: stampOp, fontFamily: mono, fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: accent, border: `1px solid ${accent}`, padding: '5px 9px', whiteSpace: 'nowrap' }}>{stampText}</div>
            </div>
            <div aria-hidden="true" style={{ position: 'absolute', left: 0, top: 0, width: 0, height: 0, transform: `translate3d(${zTop * 0.18}px, ${zTop * 0.32}px, 0.1px)`, opacity: clamp(gap / 6) * 0.5 }}>
              <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -54%)', whiteSpace: 'nowrap', fontFamily: sans, fontSize: fs, fontWeight: wordWeight, lineHeight: 1, letterSpacing: '-0.05em', color: 'rgba(20,20,19,0.55)', filter: `blur(${4 + zTop * 0.06}px)` }}>{word}</div>
            </div>
            <div style={{ position: 'absolute', left: 0, top: 0, transformStyle: 'preserve-3d' }}>{layers}</div>
          </div>
        </div>

        {showLabels && (
          <div aria-live="polite" style={{ position: 'absolute', left: pad, bottom: compact ? 22 : 38, zIndex: 3, fontFamily: mono }}>
            <div style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: muted }}>{phase}</div>
            <div style={{ fontSize: compact ? 13 : 14, marginTop: 6, letterSpacing: '0.04em', fontVariantNumeric: 'tabular-nums' }}>
              {String(L).padStart(2, '0')} layers <span style={{ color: muted }}>· Z {String(Math.round(zTop)).padStart(3, '0')}</span>
            </div>
          </div>
        )}
        {showLabels && (
          <div style={{ position: 'absolute', right: pad, bottom: compact ? 22 : 38, zIndex: 3, display: 'flex', gap: 3, alignItems: 'flex-end' }} aria-hidden="true">
            {Array.from({ length: L }, (_, i) => (
              <div key={i} style={{ width: compact ? 3 : 4, height: 6 + (i / (L - 1)) * 18 * clamp(gap / g1), background: i === 0 || i % 2 ? (i === L - 1 ? ink : accent) : ink, opacity: 0.85 }} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

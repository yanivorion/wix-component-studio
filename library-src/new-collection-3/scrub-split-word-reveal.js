const MANIFEST = {
  "type": "Scrub.SplitWordReveal",
  "description": "Scroll-scrubbed split headline: a huge word is sliced through the middle of its capitals, the top half lifts and the bottom half drops to open a widening band where a photograph (or a second word) is revealed while scaling from 1.2 to 1, then the halves overshoot and settle into a letterbox frame, with mono captions riding the cut edges",
  "editorElement": {
    "selector": ".split-word-reveal",
    "displayName": "Split Word Reveal",
    "archetype": "container",
    "data": {
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Halden House — Coastal Retreat", "group": "Content" },
      "indexLabel": { "dataType": "text", "displayName": "Index Label", "defaultValue": "05 / 05", "group": "Content" },
      "word": { "dataType": "text", "displayName": "Word", "defaultValue": "Horizon", "group": "Content" },
      "revealMode": { "dataType": "select", "displayName": "Revealed Inside", "defaultValue": "image", "options": ["image", "word"], "group": "Content" },
      "secondWord": { "dataType": "text", "displayName": "Second Word (word mode)", "defaultValue": "Line", "group": "Content" },
      "imageUrl": { "dataType": "text", "displayName": "Image URL", "defaultValue": "https://picsum.photos/id/1018/2000/1100", "group": "Images" },
      "imageAlt": { "dataType": "text", "displayName": "Image Alt Text", "defaultValue": "Mountain ridge and valley under a pale sky", "group": "Images" },
      "imageTreatment": { "dataType": "select", "displayName": "Image Treatment", "defaultValue": "natural", "options": ["natural", "muted", "grayscale"], "group": "Images" },
      "captionTopLeft": { "dataType": "text", "displayName": "Caption — Top Left", "defaultValue": "(01) Site", "group": "Captions" },
      "captionTopRight": { "dataType": "text", "displayName": "Caption — Top Right", "defaultValue": "Elev. 412 m", "group": "Captions" },
      "captionBottomLeft": { "dataType": "text", "displayName": "Caption — Bottom Left", "defaultValue": "Hardanger", "group": "Captions" },
      "captionBottomRight": { "dataType": "text", "displayName": "Caption — Bottom Right", "defaultValue": "Fig. 05 / 12", "group": "Captions" },
      "footnote": { "dataType": "text", "displayName": "Footnote", "defaultValue": "A house set between two lines of the landscape", "group": "Content" },
      "gapSize": { "dataType": "select", "displayName": "Open Gap Size", "defaultValue": "medium", "options": ["small", "medium", "large"], "group": "Layout" },
      "imageWidth": { "dataType": "select", "displayName": "Band Width", "defaultValue": "word", "options": ["word", "full"], "group": "Layout" },
      "overshoot": { "dataType": "select", "displayName": "Settle Overshoot", "defaultValue": "subtle", "options": ["none", "subtle", "springy"], "group": "Animation" },
      "showCutLine": { "dataType": "booleanValue", "displayName": "Show Cut Line", "defaultValue": "true", "group": "Layout" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#EDECE8", "group": "Colors" },
      "inkColor": { "dataType": "color", "displayName": "Ink", "defaultValue": "#0B0B0C", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#86827A", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent", "defaultValue": "#D9480F", "group": "Colors" },
      "fontFamily": { "dataType": "select", "displayName": "Display Font", "defaultValue": "Archivo Expanded", "options": ["Archivo Expanded", "Archivo", "Inter Tight", "Geist", "Manrope"], "group": "Typography" },
      "monoFamily": { "dataType": "select", "displayName": "Mono Font", "defaultValue": "Geist Mono", "options": ["Geist Mono", "JetBrains Mono", "IBM Plex Mono"], "group": "Typography" },
      "fontWeight": { "dataType": "select", "displayName": "Weight", "defaultValue": "500", "options": ["300", "400", "500"], "group": "Typography" },
      "letterCase": { "dataType": "select", "displayName": "Letter Case", "defaultValue": "uppercase", "options": ["uppercase", "as typed"], "group": "Typography" },
      "scrollLength": { "dataType": "select", "displayName": "Scroll Length (screens)", "defaultValue": "4", "options": ["3", "4", "5", "6"], "group": "Animation" },
      "smoothing": { "dataType": "select", "displayName": "Scrub Smoothing", "defaultValue": "0.12", "options": ["0.08", "0.12", "0.2", "1"], "group": "Animation", "description": "1 = locked to the scrollbar, lower = more glide" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const eyebrow = config?.eyebrow || 'Halden House — Coastal Retreat';
  const indexLabel = config?.indexLabel || '05 / 05';
  const letterCase = config?.letterCase || 'uppercase';
  const rawWord = String(config?.word || 'Horizon').trim().slice(0, 14) || 'Horizon';
  const word = letterCase === 'uppercase' ? rawWord.toUpperCase() : rawWord;
  const revealMode = config?.revealMode === 'word' ? 'word' : 'image';
  const secondRaw = String(config?.secondWord || 'Line').trim() || 'Line';
  const secondWord = letterCase === 'uppercase' ? secondRaw.toUpperCase() : secondRaw;
  const imageUrl = String(config?.imageUrl ?? 'https://picsum.photos/id/1018/2000/1100').trim();
  const imageAlt = config?.imageAlt || 'Mountain ridge and valley under a pale sky';
  const treatment = config?.imageTreatment || 'natural';
  const capTL = config?.captionTopLeft ?? '(01) Site';
  const capTR = config?.captionTopRight ?? 'Elev. 412 m';
  const capBL = config?.captionBottomLeft ?? 'Hardanger';
  const capBR = config?.captionBottomRight ?? 'Fig. 05 / 12';
  const footnote = config?.footnote || 'A house set between two lines of the landscape';
  const gapK = { small: 0.5, medium: 0.72, large: 0.9 }[config?.gapSize || 'medium'] || 0.72;
  const fullBand = config?.imageWidth === 'full';
  const overK = { none: 0, subtle: 1, springy: 2.2 }[config?.overshoot || 'subtle'] ?? 1;
  const showCutLine = bool(config?.showCutLine, true);
  const bg = config?.backgroundColor || '#EDECE8';
  const ink = config?.inkColor || '#0B0B0C';
  const muted = config?.mutedColor || '#86827A';
  const accent = config?.accentColor || '#D9480F';
  const fontChoice = config?.fontFamily || 'Archivo Expanded';
  const monoFamily = config?.monoFamily || 'Geist Mono';
  const weight = parseInt(config?.fontWeight || '500', 10) || 500;
  const screens = parseFloat(config?.scrollLength || '4') || 4;
  const smoothing = Math.min(1, Math.max(0.02, parseFloat(config?.smoothing || '0.12')));

  const isArchivo = fontChoice.indexOf('Archivo') === 0;
  const fontFamily = isArchivo ? 'Archivo' : fontChoice;
  const wdth = fontChoice === 'Archivo Expanded' ? 118 : 100;
  const variation = isArchivo ? `'wdth' ${wdth}, 'wght' ${weight}` : 'normal';
  const displayStack = `"${fontFamily}", "Inter", -apple-system, "Helvetica Neue", Arial, sans-serif`;
  const monoStack = `"${monoFamily}", ui-monospace, "SF Mono", Menlo, monospace`;
  const tracking = isArchivo ? -0.03 : -0.045;

  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const uid = React.useMemo(() => 'sw' + Math.random().toString(36).slice(2, 8), []);

  React.useEffect(() => {
    const fam = {
      'Archivo': 'Archivo:wdth,wght@62..125,100..900',
      'Inter Tight': 'Inter+Tight:wght@300;400;500',
      'Geist': 'Geist:wght@300;400;500',
      'Manrope': 'Manrope:wght@300;400;500',
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
    document.fonts.load(`${weight} 100px "${fontFamily}"`, word + secondWord).then(() => { if (alive) setFontTick((t) => t + 1); }).catch(() => {});
    const t1 = setTimeout(() => { if (alive) setFontTick((x) => x + 1); }, 900);
    const t2 = setTimeout(() => { if (alive) setFontTick((x) => x + 1); }, 2400);
    return () => { alive = false; clearTimeout(t1); clearTimeout(t2); };
  }, [fontFamily, weight, word, secondWord]);

  const measureRef = React.useRef(null);
  const measure2Ref = React.useRef(null);
  const [m, setM] = React.useState({ w: word.length * 0.7, w2: secondWord.length * 0.7, base: 0.86, cap: 0.72 });
  React.useLayoutEffect(() => {
    const el = measureRef.current;
    const el2 = measure2Ref.current;
    if (!el) return;
    let base = 0.86; let cap = 0.72;
    try {
      const ctx = document.createElement('canvas').getContext('2d');
      ctx.font = `${weight} 100px ${displayStack}`;
      const h = ctx.measureText('H');
      const fa = (h.fontBoundingBoxAscent || 96) / 100;
      const fd = (h.fontBoundingBoxDescent || 24) / 100;
      base = (1 - (fa + fd)) / 2 + fa;
      cap = (h.actualBoundingBoxAscent || 72) / 100;
    } catch (e) { /* keep defaults */ }
    setM({ w: el.getBoundingClientRect().width / 100, w2: el2 ? el2.getBoundingClientRect().width / 100 : 1, base, cap });
  }, [word, secondWord, fontTick, weight, displayStack, variation]);

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
  const seg = (a, b) => clamp((p - a) / (b - a));
  const ease = (t) => 1 - Math.pow(1 - t, 3);
  const easeIO = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const lerp = (a, b, t) => a + (b - a) * t;
  const backOut = (t, s) => { const c = 1.70158 * s; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); };

  const W = Math.max(320, width);
  const H = Math.max(420, stageH);
  const compact = W < 760;
  const margin = compact ? 20 : 48;
  const gutter = compact ? 0 : Math.min(200, Math.max(140, W * 0.12));
  const F = Math.max(40, Math.min((W - (compact ? margin * 2 : gutter * 2)) / Math.max(0.5, m.w), H * 0.42));
  const wordW = m.w * F;
  const capH = m.cap * F;
  const cutEm = m.base - m.cap / 2;
  const cy = H * 0.5;
  const wordLeft = (W - wordW) / 2;
  const wordTop = cy - cutEm * F;
  const maxGap = H - capH - (compact ? 150 : 150);
  const gFinal = Math.max(80, maxGap * gapK);

  const openT = seg(0.1, 0.84);
  const shaped = overK > 0 ? backOut(clamp(openT), 0.55 * overK) : easeIO(openT);
  const g = Math.max(0, gFinal * (overK > 0 ? lerp(easeIO(openT), shaped, ease(openT)) : shaped));
  const preGap = reduced ? 0 : 4 * (1 - seg(0, 0.1));
  const gap = Math.max(g, preGap);
  const imgScale = lerp(1.2, 1, ease(seg(0.12, 0.96)));
  const cutLineOp = 1 - seg(0.06, 0.2);
  const settled = seg(0.9, 1);
  const bandLeft = fullBand ? margin : wordLeft;
  const bandW = fullBand ? W - margin * 2 : wordW;
  const imgH = gFinal * 1.14;
  const filterCss = treatment === 'grayscale' ? 'grayscale(1) contrast(1.05)' : treatment === 'muted' ? 'saturate(0.55) contrast(0.98)' : 'none';

  const microStyle = { fontFamily: monoStack, fontSize: compact ? 10 : 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: muted, fontVariantNumeric: 'tabular-nums' };
  const enter = (i, from) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'none' : (from || 'translateY(12px)'),
    transition: reduced ? 'none' : `opacity 800ms cubic-bezier(0.22,1,0.36,1) ${100 + i * 90}ms, transform 1100ms cubic-bezier(0.22,1,0.36,1) ${100 + i * 90}ms`
  });
  const wordStyle = {
    position: 'absolute', left: wordLeft, top: wordTop, fontFamily: displayStack, fontSize: F, fontWeight: weight, lineHeight: 1,
    letterSpacing: `${tracking}em`, whiteSpace: 'pre', color: ink, fontVariationSettings: variation, margin: 0
  };
  const cutPx = cutEm * F;
  const topY = cy - gap / 2;
  const botY = cy + gap / 2;

  const capBlock = (text, side, edge) => {
    if (!text) return null;
    const isTop = edge === 'top';
    const y = isTop ? topY : botY;
    if (compact) {
      return (
        <div key={side + edge} aria-hidden="true" style={{
          ...microStyle, fontSize: 9.5, position: 'absolute', top: isTop ? y + 10 : y - 22,
          ...(side === 'right' ? { right: W - bandLeft - bandW + 10 } : { left: bandLeft + 10 }),
          color: '#fff', opacity: clamp((gap - 60) / 60), textShadow: '0 1px 8px rgba(0,0,0,0.35)', whiteSpace: 'nowrap', zIndex: 4
        }}>{text}</div>
      );
    }
    const x = side === 'left' ? bandLeft - 18 : bandLeft + bandW + 18;
    return (
      <div key={side + edge} aria-hidden="true" style={{
        position: 'absolute', left: side === 'left' ? 'auto' : x, right: side === 'left' ? W - x : 'auto', top: y, zIndex: 4,
        transform: `translateY(${isTop ? 'calc(-100% - 2px)' : '2px'})`, textAlign: side === 'left' ? 'right' : 'left'
      }}>
        <div style={{ ...microStyle, fontSize: 10.5, letterSpacing: '0.08em', lineHeight: 1.5, maxWidth: Math.max(60, bandLeft - margin - 18), ...enter(4) }}>{text}</div>
      </div>
    );
  };

  return (
    <section ref={sectionRef} className={`split-word-reveal ${uid}`} aria-label={`${word}. ${revealMode === 'image' ? imageAlt : secondWord}. ${footnote}`}
      style={{ position: 'relative', width: '100%', height: `${Math.round(stageH * screens)}px`, background: bg, color: ink }}>
      <div aria-hidden="true" style={{ position: 'absolute', left: 0, top: 0, height: 0, overflow: 'hidden', visibility: 'hidden' }}>
        <span ref={measureRef} style={{ position: 'absolute', whiteSpace: 'pre', fontFamily: displayStack, fontSize: 100, fontWeight: weight, letterSpacing: `${tracking}em`, fontVariationSettings: variation, lineHeight: 1 }}>{word}</span>
        <span ref={measure2Ref} style={{ position: 'absolute', whiteSpace: 'pre', fontFamily: displayStack, fontSize: 100, fontWeight: weight, letterSpacing: `${tracking}em`, fontVariationSettings: variation, lineHeight: 1 }}>{secondWord}</span>
      </div>

      <div style={{ position: 'sticky', top: 0, height: `${stageH}px`, overflow: 'hidden', background: bg }}>
        <div style={{ ...microStyle, position: 'absolute', top: compact ? 22 : 34, left: margin, color: ink, ...enter(0) }}>{eyebrow}</div>
        <div style={{ ...microStyle, position: 'absolute', top: compact ? 22 : 34, right: margin, color: ink, ...enter(1) }}>{indexLabel}</div>

        <div style={{ position: 'absolute', left: bandLeft, top: topY, width: bandW, height: Math.max(0, gap), overflow: 'hidden', zIndex: 1, background: revealMode === 'image' ? '#1a1918' : 'transparent' }}>
          {revealMode === 'image' ? (
            imageUrl ? (
              <img src={imageUrl} alt={imageAlt} draggable="false" style={{
                position: 'absolute', left: 0, top: gap / 2 - imgH / 2, width: bandW, height: imgH, maxWidth: 'none', objectFit: 'cover', display: 'block',
                transform: `scale(${imgScale.toFixed(4)})`, transformOrigin: '50% 50%', filter: filterCss, willChange: 'transform'
              }} />
            ) : (
              <div style={{ ...microStyle, position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#bbb' }}>Add an image URL</div>
            )
          ) : (
            <div aria-hidden="true" style={{
              position: 'absolute', left: 0, right: 0, top: gap / 2, transform: `translateY(-50%) scale(${imgScale.toFixed(4)})`, textAlign: 'center',
              fontFamily: displayStack, fontWeight: weight, fontVariationSettings: variation, letterSpacing: `${tracking}em`, lineHeight: 1, whiteSpace: 'pre',
              fontSize: Math.min(gFinal * 0.62 / Math.max(0.5, m.cap), (bandW * 0.92) / Math.max(0.5, m.w2)), color: accent
            }}>{secondWord}</div>
          )}
        </div>

        <h2 style={{ margin: 0 }}>
          <span style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>{word}</span>
          <span aria-hidden="true" style={{ ...wordStyle, zIndex: 2, clipPath: `inset(-30% -10% ${F - cutPx}px -10%)`, WebkitClipPath: `inset(-30% -10% ${F - cutPx}px -10%)`, transform: `translate3d(0, ${(-gap / 2).toFixed(2)}px, 0)` }}>
            <span style={{ display: 'inline-block', ...enter(0, 'translateY(-0.18em)') }}>{word}</span>
          </span>
          <span aria-hidden="true" style={{ ...wordStyle, zIndex: 2, clipPath: `inset(${cutPx}px -10% -30% -10%)`, WebkitClipPath: `inset(${cutPx}px -10% -30% -10%)`, transform: `translate3d(0, ${(gap / 2).toFixed(2)}px, 0)` }}>
            <span style={{ display: 'inline-block', ...enter(0, 'translateY(0.18em)') }}>{word}</span>
          </span>
        </h2>

        {showCutLine && (
          <div aria-hidden="true" style={{ position: 'absolute', left: margin, right: margin, top: cy, height: 1, zIndex: 3, opacity: cutLineOp }}>
            <div style={{ position: 'absolute', inset: 0, background: accent, transformOrigin: 'left', transform: `scaleX(${mounted ? 1 : 0})`, transition: reduced ? 'none' : 'transform 1300ms cubic-bezier(0.65,0,0.35,1) 350ms' }} />
          </div>
        )}

        {capBlock(capTL, 'left', 'top')}
        {capBlock(capTR, 'right', 'top')}
        {capBlock(capBL, 'left', 'bottom')}
        {capBlock(capBR, 'right', 'bottom')}

        <div style={{ position: 'absolute', left: margin, right: margin, bottom: compact ? 20 : 30, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20, ...enter(5) }}>
          <span style={{ ...microStyle, maxWidth: compact ? 220 : 'none', lineHeight: 1.5 }}>{footnote}</span>
          <span aria-hidden="true" style={{ ...microStyle, color: ink, whiteSpace: 'nowrap' }}>
            {settled > 0.5 ? 'Framed' : 'Gap'} {String(Math.round(gap)).padStart(3, '0')}px
          </span>
        </div>
      </div>
    </section>
  );
}

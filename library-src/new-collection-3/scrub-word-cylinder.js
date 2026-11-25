const MANIFEST = {
  "type": "Scrub.WordCylinder",
  "description": "Scroll-scrubbed reel of words: large grotesk words sit around a vertical 3D cylinder that rotates with scroll like a rolodex. The word facing you is sharp and bright while the rest recede into fog and blur; at each chapter stop the reel snaps with a subtle spring and a mono caption explains the word, and the final stop lands the headline",
  "editorElement": {
    "selector": ".word-cylinder",
    "displayName": "Word Cylinder",
    "archetype": "container",
    "data": {
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Method — Five steps", "group": "Content" },
      "words": { "dataType": "text", "displayName": "Chapter Words (comma separated)", "defaultValue": "Listen, Question, Sketch, Reduce, Refine", "group": "Content" },
      "captions": { "dataType": "text", "displayName": "Captions (separate with |)", "defaultValue": "Every brief starts with what is not said. We take notes before we take positions. | We pull the problem apart until the real question falls out of it. | Fast, cheap and wrong on purpose. Paper before pixels, always. | Remove everything that carries no weight. Then remove one more thing. | A hundred small corrections nobody will notice on their own.", "group": "Content" },
      "finalWord": { "dataType": "text", "displayName": "Final Word (Headline)", "defaultValue": "Clarity", "group": "Content" },
      "subline": { "dataType": "text", "displayName": "Subline", "defaultValue": "What is left when every word has earned its place.", "group": "Content" },
      "footnote": { "dataType": "text", "displayName": "Footnote", "defaultValue": "Studio principles — No. 01", "group": "Content" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#0B0B0C", "group": "Colors" },
      "textColor": { "dataType": "color", "displayName": "Front Word", "defaultValue": "#F3F2EF", "group": "Colors" },
      "fogColor": { "dataType": "color", "displayName": "Fog Colour", "defaultValue": "#2A2826", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Mono Labels", "defaultValue": "#8A857F", "group": "Colors" },
      "ruleColor": { "dataType": "color", "displayName": "Hairlines", "defaultValue": "#2E2C2A", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent", "defaultValue": "#D9480F", "group": "Colors" },
      "wordFont": { "dataType": "select", "displayName": "Word Font", "defaultValue": "Inter Tight", "options": ["Inter Tight", "Inter", "Archivo", "Manrope", "Geist", "Hanken Grotesk"], "group": "Typography" },
      "monoFont": { "dataType": "select", "displayName": "Mono Font", "defaultValue": "JetBrains Mono", "options": ["JetBrains Mono", "IBM Plex Mono", "Geist Mono", "Space Mono"], "group": "Typography" },
      "wordSize": { "dataType": "select", "displayName": "Word Size (px)", "defaultValue": "168", "options": ["120", "144", "168", "192", "220"], "group": "Typography" },
      "wordWeight": { "dataType": "select", "displayName": "Word Weight", "defaultValue": "400", "options": ["300", "400", "500"], "group": "Typography" },
      "headlineScale": { "dataType": "select", "displayName": "Headline Growth", "defaultValue": "1.35", "options": ["1", "1.2", "1.35", "1.5"], "group": "Typography" },
      "tracking": { "dataType": "select", "displayName": "Tracking", "defaultValue": "-0.045", "options": ["-0.02", "-0.035", "-0.045", "-0.055"], "group": "Typography" },
      "wordCase": { "dataType": "select", "displayName": "Word Case", "defaultValue": "as typed", "options": ["as typed", "uppercase", "lowercase"], "group": "Typography" },
      "ringSlots": { "dataType": "select", "displayName": "Words Around The Reel", "defaultValue": "12", "options": ["10", "12", "14", "16"], "group": "Layout" },
      "scrollLength": { "dataType": "select", "displayName": "Scroll Length (screens)", "defaultValue": "5", "options": ["3", "4", "5", "6", "7"], "group": "Layout" },
      "showRules": { "dataType": "booleanValue", "displayName": "Reel Window Hairlines", "defaultValue": "true", "group": "Layout" },
      "showIndex": { "dataType": "booleanValue", "displayName": "Chapter Index", "defaultValue": "true", "group": "Layout" },
      "showProgress": { "dataType": "booleanValue", "displayName": "Progress Ticks", "defaultValue": "true", "group": "Layout" },
      "fogDensity": { "dataType": "select", "displayName": "Fog Density", "defaultValue": "medium", "options": ["light", "medium", "dense"], "group": "Animation" },
      "blurAmount": { "dataType": "select", "displayName": "Depth Blur (px)", "defaultValue": "6", "options": ["0", "3", "6", "10"], "group": "Animation" },
      "spring": { "dataType": "select", "displayName": "Snap Spring", "defaultValue": "subtle", "options": ["none", "subtle", "lively"], "group": "Animation" },
      "dwell": { "dataType": "select", "displayName": "Chapter Dwell", "defaultValue": "0.45", "options": ["0.25", "0.45", "0.6"], "group": "Animation", "description": "Share of each chapter's scroll where the reel rests" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const eyebrow = config?.eyebrow || 'Method — Five steps';
  const finalWord = config?.finalWord || 'Clarity';
  const subline = config?.subline || 'What is left when every word has earned its place.';
  const footnote = config?.footnote || 'Studio principles — No. 01';
  const bg = config?.backgroundColor || '#0B0B0C';
  const textColor = config?.textColor || '#F3F2EF';
  const fogColor = config?.fogColor || '#2A2826';
  const muted = config?.mutedColor || '#8A857F';
  const ruleColor = config?.ruleColor || '#2E2C2A';
  const accent = config?.accentColor || '#D9480F';
  const wordFont = config?.wordFont || 'Inter Tight';
  const monoFont = config?.monoFont || 'JetBrains Mono';
  const wordSizeBase = parseInt(config?.wordSize || '168', 10) || 168;
  const wordWeight = parseInt(config?.wordWeight || '400', 10) || 400;
  const headlineScale = parseFloat(config?.headlineScale || '1.35') || 1.35;
  const tracking = parseFloat(config?.tracking || '-0.045');
  const wordCase = config?.wordCase || 'as typed';
  const ringSlots = parseInt(config?.ringSlots || '12', 10) || 12;
  const screens = parseFloat(config?.scrollLength || '5') || 5;
  const showRules = bool(config?.showRules, true);
  const showIndex = bool(config?.showIndex, true);
  const showProgress = bool(config?.showProgress, true);
  const fogPow = { light: 1.4, medium: 1, dense: 0.7 }[config?.fogDensity || 'medium'] || 1;
  const blurMax = parseFloat(config?.blurAmount ?? '6');
  const springMode = config?.spring || 'subtle';
  const dwell = Math.min(0.8, Math.max(0, parseFloat(config?.dwell || '0.45')));

  const chapters = React.useMemo(() => {
    const ws = String(config?.words || 'Listen, Question, Sketch, Reduce, Refine').split(',').map((w) => w.trim()).filter(Boolean);
    const cs = String(config?.captions || 'Every brief starts with what is not said. We take notes before we take positions. | We pull the problem apart until the real question falls out of it. | Fast, cheap and wrong on purpose. Paper before pixels, always. | Remove everything that carries no weight. Then remove one more thing. | A hundred small corrections nobody will notice on their own.')
      .split('|').map((c) => c.trim());
    return (ws.length ? ws : ['Begin']).map((w, i) => ({ word: w, caption: cs[i] || '' }));
  }, [config?.words, config?.captions]);

  const casing = (t) => (wordCase === 'uppercase' ? t.toUpperCase() : wordCase === 'lowercase' ? t.toLowerCase() : t);
  const stops = chapters.length + 1;

  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    const fams = [wordFont, monoFont];
    fams.forEach((f) => {
      const id = 'wc3-font-' + f.replace(/\s+/g, '-').toLowerCase();
      if (document.getElementById(id)) return;
      const l = document.createElement('link');
      l.id = id; l.rel = 'stylesheet';
      const isMono = /Mono/.test(f);
      l.href = `https://fonts.googleapis.com/css2?family=${f.replace(/\s+/g, '+')}:wght@${f === 'Space Mono' ? '400' : isMono ? '300;400;500' : '300;400;500'}&display=swap`;
      document.head.appendChild(l);
    });
  }, [wordFont, monoFont]);

  const sectionRef = React.useRef(null);
  const targetP = React.useRef(0);
  const smoothP = React.useRef(0);
  const pos = React.useRef(0);
  const vel = React.useRef(0);
  const [frame, setFrame] = React.useState({ p: reduced ? 1 : 0, x: reduced ? stops - 1 : 0 });
  const [stageH, setStageH] = React.useState(800);
  const [width, setWidth] = React.useState(1280);

  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const smooth = (t) => t * t * (3 - 2 * t);
  const travelEnd = 0.8;
  const indexFor = (p) => {
    const raw = clamp(p / travelEnd) * (stops - 1);
    const i = Math.min(stops - 2, Math.floor(raw));
    const f = raw - i;
    const lo = dwell / 2;
    const g = smooth(clamp((f - lo) / Math.max(0.05, 1 - dwell)));
    return Math.min(stops - 1, i + g);
  };

  React.useEffect(() => {
    const s = typeof getScrollContainer === 'function' ? getScrollContainer() : null;
    const scroller = s && s !== window && s.nodeType === 1 ? s : window;
    const section = sectionRef.current;
    if (!section) return undefined;
    let raf = 0;
    const k = springMode === 'lively' ? 0.07 : 0.085;
    const damp = springMode === 'lively' ? 0.8 : 0.74;
    const read = () => {
      const r = section.getBoundingClientRect();
      const top = scroller === window ? 0 : scroller.getBoundingClientRect().top;
      const vh = scroller === window ? window.innerHeight : scroller.getBoundingClientRect().height;
      const travel = r.height - vh;
      targetP.current = travel > 0 ? clamp((top - r.top) / travel) : 0;
    };
    const tick = () => {
      const dp = targetP.current - smoothP.current;
      smoothP.current = Math.abs(dp) < 0.0003 ? targetP.current : smoothP.current + dp * 0.16;
      const goal = indexFor(targetP.current);
      if (springMode === 'none') {
        const d = goal - pos.current;
        pos.current = Math.abs(d) < 0.0005 ? goal : pos.current + d * 0.18;
        vel.current = 0;
      } else {
        vel.current = vel.current * damp + (goal - pos.current) * k;
        pos.current += vel.current;
        if (Math.abs(vel.current) < 0.0002 && Math.abs(goal - pos.current) < 0.0005) { pos.current = goal; vel.current = 0; }
      }
      setFrame({ p: smoothP.current, x: pos.current });
      const settled = smoothP.current === targetP.current && pos.current === goal;
      raf = settled ? 0 : requestAnimationFrame(tick);
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
  }, [springMode, dwell, stops, reduced]);

  const hex = (h) => {
    const m = String(h).replace('#', '');
    const f = m.length === 3 ? m.split('').map((c) => c + c).join('') : m.padEnd(6, '0');
    return [parseInt(f.slice(0, 2), 16) || 0, parseInt(f.slice(2, 4), 16) || 0, parseInt(f.slice(4, 6), 16) || 0];
  };
  const mix = (a, b, t) => { const A = hex(a); const B = hex(b); return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(',')})`; };
  const easeIO = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const ease = (t) => 1 - Math.pow(1 - t, 3);

  const p = reduced ? 1 : frame.p;
  const x = reduced ? stops - 1 : frame.x;
  const seg = (a, b) => clamp((p - a) / (b - a));
  const land = easeIO(seg(0.8, 0.93));
  const subIn = ease(seg(0.88, 0.99));

  const W = Math.max(320, width);
  const H = Math.max(360, stageH);
  const compact = W < 760;
  const pad = compact ? 20 : Math.round(Math.max(40, Math.min(72, W * 0.045)));
  const captionW = compact ? W - pad * 2 : Math.min(320, Math.round(W * 0.24));
  const reelLeft = pad + (compact ? 0 : Math.max(100, Math.round(W * 0.075)));
  const reelAvail = compact ? W - pad * 2 : W - reelLeft - captionW - pad - Math.round(W * 0.05);
  const allWords = [...chapters.map((c) => c.word), finalWord];
  const longest = Math.max(...allWords.map((w) => w.length), 4);
  const charW = wordCase === 'uppercase' ? 0.64 : 0.54;
  const fitSize = reelAvail / (longest * charW + 0.2);
  const wordSize = Math.round(Math.min(compact ? wordSizeBase * 0.5 : wordSizeBase, fitSize, H * 0.24));
  const headGrow = Math.min(headlineScale, (reelAvail + (compact ? 0 : captionW * 0.6)) / (finalWord.length * charW * wordSize + 1));
  const rowH = wordSize * 1.16;
  const slots = Math.max(stops + 2, ringSlots);
  const step = 360 / slots;
  const R = (rowH / 2) / Math.tan((step * Math.PI) / 360);
  const P = Math.max(900, R * 3.6);
  const centerY = compact ? Math.round(H * 0.38) : Math.round(H * 0.5);
  const monoCss = `"${monoFont}", ui-monospace, "SF Mono", Menlo, monospace`;
  const wordCss = `"${wordFont}", "Inter", -apple-system, "Helvetica Neue", Arial, sans-serif`;

  const active = clamp(Math.round(x), 0, stops - 1);
  const nodes = [];
  for (let i = 0; i < slots; i++) {
    let a = (i - x) * step;
    a = ((a + 180) % 360 + 360) % 360 - 180;
    if (Math.abs(a) > 96) continue;
    const t = clamp(Math.abs(a) / 90);
    const fog = clamp(Math.pow(t, 0.62 * fogPow) * 1.1);
    const isReal = i < stops;
    const isFinal = i === stops - 1;
    const text = isReal ? casing(allWords[i]) : casing(allWords[i % stops]);
    const front = 1 - clamp(Math.abs(a) / step);
    let op = (1 - Math.pow(t, 2.2)) * (isReal ? 1 : 0.55);
    if (!isFinal) op *= 1 - land;
    if (op < 0.01) continue;
    const scale = isFinal ? 1 + (headGrow - 1) * land : 1;
    const color = isFinal && land > 0 ? mix(fogColor, textColor, Math.max(1 - fog, land)) : mix(textColor, fogColor, fog);
    const blur = blurMax * Math.pow(t, 1.3) * (isFinal ? 1 - land : 1);
    nodes.push(
      <div key={i} aria-hidden="true" style={{
        position: 'absolute', left: 0, top: 0, height: rowH, display: 'flex', alignItems: 'center',
        transform: `rotateX(${-a}deg) translateZ(${R}px) translateY(-50%) scale(${scale})`, transformOrigin: '0 50%',
        backfaceVisibility: 'hidden', whiteSpace: 'nowrap', fontFamily: wordCss, fontWeight: wordWeight,
        fontSize: wordSize, lineHeight: 1, letterSpacing: `${tracking}em`, color, opacity: op,
        filter: blur > 0.15 ? `blur(${blur.toFixed(2)}px)` : 'none'
      }}>
        {text}
        {isFinal && <span style={{ color: accent, opacity: Math.max(front, land) }}>.</span>}
      </div>
    );
  }

  const chapterIdx = Math.min(active, chapters.length - 1);
  const capOpacityFor = (i) => {
    const d = Math.abs(x - i);
    return clamp(1 - d * 2.6) * (1 - land);
  };
  const ruleGap = rowH * 0.58;
  const counterLabel = active >= stops - 1 ? 'Fin' : String(active + 1).padStart(2, '0');
  const captionTop = compact ? Math.round(H * 0.6) : centerY - 8;

  return (
    <section ref={sectionRef} className="word-cylinder" aria-label={`${eyebrow}. ${chapters.map((c) => `${c.word}: ${c.caption}`).join(' ')} ${finalWord}. ${subline}`}
      style={{ position: 'relative', width: '100%', height: `${Math.round(stageH * screens)}px`, background: bg, color: textColor }}>
      <div style={{ position: 'sticky', top: 0, height: `${stageH}px`, overflow: 'hidden', background: bg }}>
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(ellipse ${compact ? 90 : 60}% 38% at ${compact ? 40 : 34}% ${(centerY / H) * 100}%, ${mix(bg, fogColor, 0.55)} 0%, ${bg} 70%)`
        }} />

        {showRules && (
          <div aria-hidden="true">
            {[-1, 1].map((s) => (
              <div key={s} style={{
                position: 'absolute', left: pad, right: pad, top: centerY + s * ruleGap * (1 + (headGrow - 1) * land * 0.9), height: 1,
                background: ruleColor, opacity: 1 - land * 0.4
              }} />
            ))}
          </div>
        )}

        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, perspective: `${P}px`, perspectiveOrigin: `${compact ? 30 : 32}% ${centerY}px` }}>
          <div style={{
            position: 'absolute', left: reelLeft, top: centerY, width: 0, height: 0, transformStyle: 'preserve-3d',
            transform: `translateZ(${-R}px)`
          }}>
            {nodes}
          </div>
        </div>

        <div aria-hidden="true" style={{
          position: 'absolute', left: 0, right: 0, top: 0, height: Math.max(0, centerY - rowH * 1.6), pointerEvents: 'none',
          background: `linear-gradient(to bottom, ${bg} 0%, ${bg} 30%, transparent 100%)`
        }} />
        <div aria-hidden="true" style={{
          position: 'absolute', left: 0, right: 0, bottom: 0, height: compact ? H - captionTop + 60 : Math.max(0, H - centerY - rowH * 1.6), pointerEvents: 'none',
          background: `linear-gradient(to top, ${bg} 0%, ${bg} 30%, transparent 100%)`
        }} />

        {showIndex && (
          <div aria-hidden="true" style={{
            position: 'absolute', left: compact ? 'auto' : pad, right: compact ? pad : 'auto', top: compact ? centerY - ruleGap - 22 : centerY - 8, fontFamily: monoCss, fontSize: 11,
            letterSpacing: '0.16em', textTransform: 'uppercase', color: muted, display: 'flex', alignItems: 'center', gap: 8,
            opacity: 1 - land
          }}>
            <span style={{ display: 'inline-block', width: 6, height: 6, background: accent }} />
            <span style={{ color: textColor, fontVariantNumeric: 'tabular-nums' }}>{counterLabel}</span>
            <span>/ {String(chapters.length).padStart(2, '0')}</span>
          </div>
        )}

        <div style={{ position: 'absolute', left: compact ? pad : W - pad - captionW, top: captionTop, width: captionW, minHeight: 120 }}>
          {chapters.map((c, i) => {
            const o = capOpacityFor(i);
            if (o <= 0.005) return null;
            const off = (x - i) * -18;
            return (
              <div key={i} style={{ position: 'absolute', left: 0, top: 0, width: '100%', opacity: o, transform: `translateY(${off}px)` }}>
                <div style={{ fontFamily: monoCss, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: accent, marginBottom: 12 }}>
                  {String(i + 1).padStart(2, '0')} — {c.word}
                </div>
                <p style={{ margin: 0, fontFamily: monoCss, fontWeight: 400, fontSize: compact ? 12.5 : 13, lineHeight: 1.65, color: mix(muted, textColor, 0.55) }}>{c.caption}</p>
              </div>
            );
          })}
          <div style={{ position: 'absolute', left: 0, top: 0, width: '100%', opacity: subIn, transform: `translateY(${(1 - subIn) * 14}px)` }}>
            <div style={{ fontFamily: monoCss, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: accent, marginBottom: 12 }}>{footnote}</div>
            <p style={{ margin: 0, fontFamily: wordCss, fontWeight: 300, fontSize: compact ? 17 : 20, lineHeight: 1.4, letterSpacing: '-0.01em', color: textColor }}>{subline}</p>
          </div>
        </div>

        <div style={{ position: 'absolute', top: compact ? 20 : 36, left: pad, right: pad, display: 'flex', justifyContent: 'space-between', fontFamily: monoCss, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: muted }}>
          <span>{eyebrow}</span>
          <span aria-hidden="true" style={{ fontVariantNumeric: 'tabular-nums' }}>{(x * step).toFixed(1).padStart(5, '0')}°</span>
        </div>

        {showProgress && (
          <div aria-hidden="true" style={{ position: 'absolute', left: pad, right: pad, bottom: compact ? 20 : 32, display: 'flex', gap: 6, alignItems: 'center' }}>
            {Array.from({ length: stops }, (_, i) => {
              const on = clamp(1 - Math.abs(x - i));
              return <div key={i} style={{ flex: 1, height: 2, background: i < x + 0.5 ? (i === active ? accent : mix(ruleColor, muted, 0.6)) : ruleColor, opacity: 0.6 + on * 0.4 }} />;
            })}
          </div>
        )}
      </div>
    </section>
  );
}

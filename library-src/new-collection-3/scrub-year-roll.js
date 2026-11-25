const MANIFEST = {
  "type": "Scrub.YearRoll",
  "description": "Scroll-scrubbed timeline told by one massive year: its four digits roll like odometer reels, the units spinning fast while the thousands barely move, dwelling on each milestone year as a line of text mask-slides in, with a mono year ruler and moving marker along the bottom",
  "editorElement": {
    "selector": ".year-roll",
    "displayName": "Year Roll",
    "archetype": "container",
    "data": {
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Atelier Norden — A short history", "group": "Content" },
      "indexLabel": { "dataType": "text", "displayName": "Index Label", "defaultValue": "04 / 04", "group": "Content" },
      "startYear": { "dataType": "text", "displayName": "Start Year", "defaultValue": "1998", "group": "Content" },
      "endYear": { "dataType": "text", "displayName": "End Year", "defaultValue": "2026", "group": "Content" },
      "milestones": { "dataType": "text", "displayName": "Milestones (year|text; year|text)", "defaultValue": "1998|Founded in a two-room studio above a print shop; 2003|The first commission abroad, a library in Porto; 2009|Forty people, three cities, one drawing table; 2015|The material archive opens to the public; 2020|Every project carbon-neutral, start to finish; 2026|Still beginning every building by hand", "group": "Content", "description": "Separate items with ; and year from text with |" },
      "milestoneLabel": { "dataType": "text", "displayName": "Milestone Label", "defaultValue": "Milestone", "group": "Content" },
      "showReelLabels": { "dataType": "booleanValue", "displayName": "Reel Labels", "defaultValue": "true", "group": "Layout" },
      "showNeighbours": { "dataType": "booleanValue", "displayName": "Show Neighbouring Digits", "defaultValue": "true", "group": "Layout" },
      "showRuler": { "dataType": "booleanValue", "displayName": "Timeline Ruler", "defaultValue": "true", "group": "Layout" },
      "alignment": { "dataType": "select", "displayName": "Year Alignment", "defaultValue": "left", "options": ["left", "center"], "group": "Layout" },
      "dwell": { "dataType": "select", "displayName": "Dwell on Milestones", "defaultValue": "medium", "options": ["short", "medium", "long"], "group": "Animation" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#0B0B0C", "group": "Colors" },
      "inkColor": { "dataType": "color", "displayName": "Digits & Text", "defaultValue": "#EDECE8", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#77746E", "group": "Colors" },
      "ruleColor": { "dataType": "color", "displayName": "Rules & Ticks", "defaultValue": "#34322F", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent (marker)", "defaultValue": "#D9480F", "group": "Colors" },
      "fontFamily": { "dataType": "select", "displayName": "Digit Font", "defaultValue": "Inter Tight", "options": ["Inter Tight", "Geist", "Manrope", "Hanken Grotesk"], "group": "Typography" },
      "monoFamily": { "dataType": "select", "displayName": "Mono Font", "defaultValue": "Geist Mono", "options": ["Geist Mono", "JetBrains Mono", "IBM Plex Mono"], "group": "Typography" },
      "fontWeight": { "dataType": "select", "displayName": "Digit Weight", "defaultValue": "300", "options": ["300", "400", "500"], "group": "Typography" },
      "maxSize": { "dataType": "select", "displayName": "Max Digit Size (px)", "defaultValue": "420", "options": ["300", "360", "420", "500"], "group": "Typography" },
      "scrollLength": { "dataType": "select", "displayName": "Scroll Length (screens)", "defaultValue": "6", "options": ["4", "5", "6", "7", "8"], "group": "Animation" },
      "smoothing": { "dataType": "select", "displayName": "Scrub Smoothing", "defaultValue": "0.12", "options": ["0.08", "0.12", "0.2", "1"], "group": "Animation", "description": "1 = locked to the scrollbar, lower = more glide" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const eyebrow = config?.eyebrow || 'Atelier Norden — A short history';
  const indexLabel = config?.indexLabel || '04 / 04';
  const milestoneLabel = config?.milestoneLabel || 'Milestone';
  const showReelLabels = bool(config?.showReelLabels, true);
  const showNeighbours = bool(config?.showNeighbours, true);
  const showRuler = bool(config?.showRuler, true);
  const alignment = config?.alignment || 'left';
  const holdK = { short: 0.12, medium: 0.22, long: 0.32 }[config?.dwell || 'medium'] || 0.22;
  const bg = config?.backgroundColor || '#0B0B0C';
  const ink = config?.inkColor || '#EDECE8';
  const muted = config?.mutedColor || '#77746E';
  const rule = config?.ruleColor || '#34322F';
  const accent = config?.accentColor || '#D9480F';
  const fontFamily = config?.fontFamily || 'Inter Tight';
  const monoFamily = config?.monoFamily || 'Geist Mono';
  const weight = parseInt(config?.fontWeight || '300', 10) || 300;
  const maxSize = parseInt(config?.maxSize || '420', 10) || 420;
  const screens = parseFloat(config?.scrollLength || '6') || 6;
  const smoothing = Math.min(1, Math.max(0.02, parseFloat(config?.smoothing || '0.12')));

  const milestonesRaw = config?.milestones || '1998|Founded in a two-room studio above a print shop; 2003|The first commission abroad, a library in Porto; 2009|Forty people, three cities, one drawing table; 2015|The material archive opens to the public; 2020|Every project carbon-neutral, start to finish; 2026|Still beginning every building by hand';
  const parsed = React.useMemo(() => String(milestonesRaw).split(/;|\n/).map((s) => {
    const [y, ...rest] = s.split('|');
    const year = parseInt(String(y).trim(), 10);
    return Number.isFinite(year) ? { year, text: rest.join('|').trim() } : null;
  }).filter(Boolean).sort((a, b) => a.year - b.year), [milestonesRaw]);

  const sY = parseInt(config?.startYear || '', 10);
  const eY = parseInt(config?.endYear || '', 10);
  const startYear = Math.max(0, Math.min(9999, Number.isFinite(sY) ? sY : parsed.length ? parsed[0].year : 1998));
  const endYearRaw = Math.max(0, Math.min(9999, Number.isFinite(eY) ? eY : parsed.length ? parsed[parsed.length - 1].year : 2026));
  const endYear = endYearRaw === startYear ? startYear + 1 : endYearRaw;
  const lo = Math.min(startYear, endYear);
  const hi = Math.max(startYear, endYear);
  const dirSign = endYear >= startYear ? 1 : -1;
  const milestones = React.useMemo(() => {
    const inRange = parsed.filter((m) => m.year >= lo && m.year <= hi);
    return dirSign > 0 ? inRange : inRange.slice().reverse();
  }, [parsed, lo, hi, dirSign]);
  const anchors = React.useMemo(() => {
    const ys = [startYear, ...milestones.map((m) => m.year), endYear];
    return ys.filter((y, i) => i === 0 || y !== ys[i - 1]);
  }, [startYear, endYear, milestones]);

  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const uid = React.useMemo(() => 'yr' + Math.random().toString(36).slice(2, 8), []);
  const displayStack = `"${fontFamily}", "Inter", -apple-system, "Helvetica Neue", Arial, sans-serif`;
  const monoStack = `"${monoFamily}", ui-monospace, "SF Mono", Menlo, monospace`;

  React.useEffect(() => {
    const fam = {
      'Inter Tight': 'Inter+Tight:wght@300;400;500',
      'Geist': 'Geist:wght@300;400;500',
      'Manrope': 'Manrope:wght@300;400;500',
      'Hanken Grotesk': 'Hanken+Grotesk:wght@300;400;500',
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
    document.fonts.load(`${weight} 100px "${fontFamily}"`, '0123456789').then(() => { if (alive) setFontTick((t) => t + 1); }).catch(() => {});
    const t = setTimeout(() => { if (alive) setFontTick((x) => x + 1); }, 1400);
    return () => { alive = false; clearTimeout(t); };
  }, [fontFamily, weight]);

  const digitEm = React.useMemo(() => {
    if (typeof document === 'undefined') return { w: 0.6, cap: 0.72 };
    try {
      const ctx = document.createElement('canvas').getContext('2d');
      ctx.font = `${weight} 100px ${displayStack}`;
      const w = Math.max(...'0123456789'.split('').map((d) => ctx.measureText(d).width)) / 100;
      const m = ctx.measureText('0');
      return { w: w || 0.6, cap: (m.actualBoundingBoxAscent || 72) / 100 };
    } catch (e) { return { w: 0.6, cap: 0.72 }; }
  }, [weight, displayStack, fontTick]); // eslint-disable-line react-hooks/exhaustive-deps

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
  const easeIO = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const ease = (t) => 1 - Math.pow(1 - t, 3);
  const lerp = (a, b, t) => a + (b - a) * t;
  const pad2 = (v) => String(v).padStart(2, '0');

  const segs = Math.max(1, anchors.length - 1);
  const pp = clamp((p - 0.03) / 0.94);
  const si = Math.min(segs - 1, Math.floor(pp * segs));
  const lt = pp * segs - si;
  const a0 = anchors[si];
  const a1 = anchors.length > 1 ? anchors[si + 1] : anchors[0];
  const year = lerp(a0, a1, easeIO(clamp((lt - holdK) / Math.max(0.05, 1 - holdK * 2))));
  const yearInt = Math.round(year);

  const reel = (k) => {
    const pow = Math.pow(10, k);
    if (k === 0) return ((year % 10) + 10) % 10;
    const lower = ((year % pow) + pow) % pow;
    const carry = clamp(lower - (pow - 1));
    const smooth = carry * carry * (3 - 2 * carry);
    return ((Math.floor(year / pow) + smooth) % 10 + 10) % 10;
  };

  const W = Math.max(320, width);
  const H = Math.max(420, stageH);
  const compact = W < 760;
  const margin = compact ? 20 : 56;
  const cols = compact ? 2 : 4;
  const F = Math.max(80, compact
    ? Math.min(maxSize, (W - margin * 2) / (digitEm.w * 2 * 0.98), H * 0.225)
    : Math.min(maxSize, ((W - margin * 2) * (alignment === 'center' ? 0.82 : 0.6)) / (digitEm.w * 4 * 0.98), H * 0.42));
  const lh = F * 0.92;
  const colW = digitEm.w * F * 0.98;
  const windowH = showNeighbours ? lh * 1.36 : lh;
  const fadePct = ((windowH - lh) / 2 / windowH) * 100;
  const labelsH = showReelLabels ? 26 : 0;
  const rowPitch = windowH + (compact ? labelsH + 6 : 0);
  const blockH = compact ? rowPitch + windowH + labelsH : windowH + labelsH;
  const areaTop = compact ? 56 : 70;
  const areaBottom = H - (showRuler ? (compact ? 96 : 104) : 40);
  const sideText = !compact && alignment === 'left' && W - margin * 2 - colW * 4 - 48 >= 280;
  const belowTextH = sideText ? 0 : (compact ? 120 : 110);
  const yearTop = Math.max(areaTop, areaTop + (areaBottom - areaTop - blockH - belowTextH) / 2);
  const yearLeft = compact || alignment === 'center' ? (W - colW * cols) / 2 : margin - F * 0.03;
  const cells = [3, 2, 1, 0].map((k, ci) => ({ k, ci, x: yearLeft + (ci % cols) * colW, y: yearTop + Math.floor(ci / cols) * rowPitch }));

  const msIdx = (() => {
    let idx = -1;
    milestones.forEach((m, i) => { if ((year - m.year) * dirSign >= -0.5) idx = i; });
    return idx;
  })();
  const textState = (i) => {
    const m = milestones[i];
    const next = milestones[i + 1];
    const inT = clamp(((year - m.year) * dirSign + 0.9) / 0.8);
    const outT = next ? clamp(((year - next.year) * dirSign + 0.9) / 0.8) : 0;
    if (inT <= 0 || outT >= 1) return null;
    return { y: (1 - ease(inT)) * 105 - ease(outT) * 105, op: Math.min(inT * 1.5, 1 - outT) };
  };

  const microStyle = { fontFamily: monoStack, fontSize: compact ? 10 : 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: muted, fontVariantNumeric: 'tabular-nums' };
  const enter = (i, from) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'none' : (from || 'translateY(12px)'),
    transition: reduced ? 'none' : `opacity 800ms cubic-bezier(0.22,1,0.36,1) ${100 + i * 80}ms, transform 1100ms cubic-bezier(0.22,1,0.36,1) ${100 + i * 80}ms`
  });
  const reelNames = ['10³', '10²', '10¹', '10⁰'];
  const yearStr = String(Math.abs(yearInt)).padStart(4, '0').slice(-4);
  const baselineY = yearTop + windowH / 2 + (digitEm.cap * F) / 2;
  const textBoxH = compact ? 64 : sideText ? 118 : 44;
  const textLeft = sideText ? yearLeft + colW * 4 + 48 : alignment === 'center' || compact ? (W - Math.min(760, W - margin * 2)) / 2 : margin;
  const textW = sideText ? W - textLeft - margin : Math.min(760, W - margin * 2);
  const textTop = sideText ? baselineY - textBoxH - 30 : yearTop + blockH + (compact ? 22 : 26);
  const rulerY = H - (compact ? 74 : 86);
  const span = hi - lo || 1;
  const markerX = (year - lo) / span;
  const tickEvery = span > 120 ? 10 : span > 60 ? 5 : 1;

  return (
    <section ref={sectionRef} className={`year-roll ${uid}`} aria-label={`${eyebrow}. ${milestones.map((m) => `${m.year}: ${m.text}`).join('. ')}`}
      style={{ position: 'relative', width: '100%', height: `${Math.round(stageH * screens)}px`, background: bg, color: ink }}>
      <div style={{ position: 'sticky', top: 0, height: `${stageH}px`, overflow: 'hidden', background: bg }}>
        <div style={{ ...microStyle, position: 'absolute', top: compact ? 22 : 34, left: margin, color: ink, ...enter(0) }}>{eyebrow}</div>
        <div style={{ ...microStyle, position: 'absolute', top: compact ? 22 : 34, right: margin, ...enter(1) }}>
          <span style={{ color: ink }}>{indexLabel}</span>
        </div>

        <div aria-hidden="true">
          {cells.map(({ k, ci, x, y }) => {
            const pos = reel(k);
            const offset = (windowH - lh) / 2;
            const mask = `linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) ${fadePct * 0.5}%, #000 ${fadePct}%, #000 ${100 - fadePct}%, rgba(0,0,0,0.5) ${100 - fadePct * 0.5}%, transparent 100%)`;
            return (
              <div key={k} style={{ position: 'absolute', left: x, top: y, width: colW, height: windowH, overflow: 'hidden', ...(showNeighbours ? { WebkitMaskImage: mask, maskImage: mask } : {}) }}>
                <div style={{ ...enter(ci, `translateY(${lh * 0.5}px)`) }}>
                  <div style={{ position: 'absolute', left: 0, top: 0, width: colW, transform: `translate3d(0, ${(offset - (pos + 1) * lh).toFixed(2)}px, 0)`, willChange: 'transform' }}>
                    {[9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1].map((d, j) => (
                      <div key={j} style={{
                        height: lh, lineHeight: `${lh}px`, textAlign: 'center', fontFamily: displayStack, fontWeight: weight, fontSize: F,
                        letterSpacing: 0, fontVariantNumeric: 'tabular-nums', color: ink
                      }}>{d}</div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <h2 style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)', margin: 0 }}>{yearStr}</h2>

        {showReelLabels && (
          <div aria-hidden="true">
            {cells.map(({ k, ci, x, y }) => {
              const revs = Math.abs(year - anchors[0]) / Math.pow(10, k);
              return (
                <div key={k} style={{ position: 'absolute', left: x, top: y + windowH + 4, width: colW, display: 'flex', justifyContent: 'space-between', padding: compact ? '8px 4px 0' : '8px 14px 0', boxSizing: 'border-box', borderTop: `1px solid ${rule}`, ...enter(ci + 2) }}>
                  <span style={{ ...microStyle, fontSize: compact ? 8.5 : 10, letterSpacing: '0.06em' }}>{reelNames[ci]}</span>
                  {!compact && <span style={{ ...microStyle, fontSize: 10, letterSpacing: '0.06em', color: k === 0 && revs > 0.01 && revs % 1 > 0.02 ? ink : muted }}>{revs.toFixed(k === 0 ? 0 : 2)}</span>}
                </div>
              );
            })}
          </div>
        )}

        <div style={{ position: 'absolute', left: textLeft, top: textTop, width: textW, textAlign: alignment === 'center' && !sideText ? 'center' : 'left' }}>
          <div style={{ ...microStyle, marginBottom: compact ? 10 : 14, display: 'flex', gap: 14, justifyContent: alignment === 'center' && !sideText ? 'center' : 'flex-start', ...enter(3) }}>
            <span>{milestoneLabel} <span style={{ color: ink }}>{pad2(Math.max(0, msIdx) + 1)}</span> / {pad2(Math.max(1, milestones.length))}</span>
            <span style={{ color: accent }}>{yearStr}</span>
          </div>
          <div style={{ position: 'relative', height: textBoxH, overflow: 'hidden', ...enter(4) }}>
            {milestones.map((m, i) => {
              const st = textState(i);
              if (!st) return null;
              return (
                <p key={i} style={{
                  position: 'absolute', left: 0, right: 0, [sideText ? 'bottom' : 'top']: 0, margin: 0, fontFamily: displayStack, fontWeight: 400, fontSize: compact ? 21 : sideText ? 30 : 32,
                  lineHeight: 1.18, letterSpacing: '-0.02em', color: ink, transform: `translateY(${st.y.toFixed(2)}%)`, opacity: st.op, textWrap: 'balance'
                }}>{m.text}</p>
              );
            })}
          </div>
        </div>

        {showRuler && (
          <div aria-hidden="true" style={{ position: 'absolute', left: margin, right: margin, top: rulerY, height: 40, ...enter(5) }}>
            <div style={{ position: 'absolute', left: 0, right: 0, top: 14, height: 1, background: rule }} />
            <div style={{ position: 'absolute', left: dirSign > 0 ? 0 : `${markerX * 100}%`, width: `${(dirSign > 0 ? markerX : 1 - markerX) * 100}%`, top: 14, height: 1, background: ink }} />
            {Array.from({ length: Math.floor(span / tickEvery) + 1 }, (_, i) => {
              const y = lo + i * tickEvery;
              const isMs = milestones.some((m) => m.year === y);
              const passed = (year - y) * dirSign >= 0;
              if (compact && !isMs && i % 2) return null;
              return (
                <div key={i} style={{ position: 'absolute', left: `${((y - lo) / span) * 100}%`, top: isMs ? 4 : 9, width: 1, height: isMs ? 11 : 5, background: passed ? (isMs ? ink : muted) : rule }} />
              );
            })}
            {milestones.map((m, i) => {
              const passed = (year - m.year) * dirSign >= -0.5;
              const lastLabel = compact && i !== 0 && i !== milestones.length - 1 && i !== msIdx;
              return (
                <div key={'l' + i} style={{ ...microStyle, fontSize: compact ? 9 : 10, letterSpacing: '0.08em', position: 'absolute', left: `${((m.year - lo) / span) * 100}%`, top: 22, transform: i === 0 && dirSign > 0 ? 'none' : 'translateX(-50%)', color: i === msIdx ? ink : passed ? muted : rule, opacity: lastLabel ? 0 : 1, transition: 'color 300ms, opacity 300ms', whiteSpace: 'nowrap' }}>{m.year}</div>
              );
            })}
            <div style={{ position: 'absolute', left: `${markerX * 100}%`, top: 0, transform: 'translateX(-50%)' }}>
              <div style={{ width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: `7px solid ${accent}`, margin: '0 auto' }} />
              <div style={{ width: 1, height: 12, background: accent, margin: '0 auto' }} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

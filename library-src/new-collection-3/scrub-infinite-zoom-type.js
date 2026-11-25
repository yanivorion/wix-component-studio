const MANIFEST = {
  "type": "Scrub.InfiniteZoomType",
  "description": "A Droste-style infinite zoom through type: scroll dives into the counter of a letter in the first word, where the next word is already waiting, small; as it fills the stage its own letter holds the word after that, for four to five words. Zoom is exponential per segment so the speed feels constant, and the counters flood the stage with alternating dark and light grounds",
  "editorElement": {
    "selector": ".infinite-zoom-type",
    "displayName": "Infinite Zoom Type",
    "archetype": "container",
    "data": {
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Five words, one breath", "group": "Content" },
      "words": { "dataType": "text", "displayName": "Words (comma separated)", "defaultValue": "look, closer, beyond, form, wonder", "group": "Content" },
      "focalChar": { "dataType": "text", "displayName": "Focal Letter (auto-find)", "defaultValue": "o", "group": "Content", "description": "The first occurrence of this letter in each word becomes the doorway" },
      "focalIndexes": { "dataType": "text", "displayName": "Focal Letter Index Override (0-based, comma separated)", "defaultValue": "", "group": "Content" },
      "subline": { "dataType": "text", "displayName": "Final Subline", "defaultValue": "Every word holds another one, if you are willing to look long enough.", "group": "Content" },
      "footnote": { "dataType": "text", "displayName": "Footnote", "defaultValue": "Type studies — No. 07", "group": "Content" },
      "darkColor": { "dataType": "color", "displayName": "Dark Ground", "defaultValue": "#0B0B0C", "group": "Colors" },
      "lightColor": { "dataType": "color", "displayName": "Light Ground", "defaultValue": "#EDECE8", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent (doorway letter)", "defaultValue": "#D9480F", "group": "Colors" },
      "accentDoorway": { "dataType": "booleanValue", "displayName": "Tint Doorway Letter", "defaultValue": "true", "group": "Colors" },
      "startDark": { "dataType": "booleanValue", "displayName": "Start On Dark", "defaultValue": "true", "group": "Colors" },
      "font": { "dataType": "select", "displayName": "Font", "defaultValue": "Archivo", "options": ["Archivo", "Inter Tight", "Geist", "Manrope", "Hanken Grotesk", "Inter"], "group": "Typography" },
      "monoFont": { "dataType": "select", "displayName": "Mono Font", "defaultValue": "JetBrains Mono", "options": ["JetBrains Mono", "Geist Mono", "IBM Plex Mono", "Space Mono"], "group": "Typography" },
      "fontWeight": { "dataType": "select", "displayName": "Weight", "defaultValue": "400", "options": ["300", "400", "500"], "group": "Typography" },
      "fontSize": { "dataType": "select", "displayName": "Word Size (px)", "defaultValue": "300", "options": ["220", "260", "300", "360"], "group": "Typography" },
      "tracking": { "dataType": "select", "displayName": "Tracking", "defaultValue": "-0.05", "options": ["-0.02", "-0.035", "-0.05", "-0.065"], "group": "Typography" },
      "wordCase": { "dataType": "select", "displayName": "Case", "defaultValue": "lowercase", "options": ["lowercase", "as typed", "uppercase"], "group": "Typography" },
      "nestFit": { "dataType": "select", "displayName": "Nested Word Fit", "defaultValue": "0.82", "options": ["0.66", "0.74", "0.82", "0.9"], "group": "Layout", "description": "How much of the counter the next word fills" },
      "scrollLength": { "dataType": "select", "displayName": "Scroll Length (screens)", "defaultValue": "6", "options": ["4", "5", "6", "7", "8"], "group": "Layout" },
      "showHud": { "dataType": "booleanValue", "displayName": "Magnification Readout", "defaultValue": "true", "group": "Layout" },
      "showTrail": { "dataType": "booleanValue", "displayName": "Word Trail", "defaultValue": "true", "group": "Layout" },
      "easing": { "dataType": "select", "displayName": "Zoom Feel", "defaultValue": "constant", "options": ["constant", "ease per word"], "group": "Animation" },
      "smoothing": { "dataType": "select", "displayName": "Scrub Smoothing", "defaultValue": "0.12", "options": ["0.08", "0.12", "0.2", "1"], "group": "Animation" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const eyebrow = config?.eyebrow || 'Five words, one breath';
  const focalChar = (config?.focalChar || 'o').trim().slice(0, 1) || 'o';
  const subline = config?.subline || 'Every word holds another one, if you are willing to look long enough.';
  const footnote = config?.footnote || 'Type studies — No. 07';
  const darkC = config?.darkColor || '#0B0B0C';
  const lightC = config?.lightColor || '#EDECE8';
  const accent = config?.accentColor || '#D9480F';
  const accentDoorway = bool(config?.accentDoorway, true);
  const startDark = bool(config?.startDark, true);
  const font = config?.font || 'Archivo';
  const monoFont = config?.monoFont || 'JetBrains Mono';
  const weight = parseInt(config?.fontWeight || '400', 10) || 400;
  const sizeBase = parseInt(config?.fontSize || '300', 10) || 300;
  const tracking = parseFloat(config?.tracking || '-0.05');
  const wordCase = config?.wordCase || 'lowercase';
  const nestFit = Math.min(0.95, Math.max(0.4, parseFloat(config?.nestFit || '0.82')));
  const screens = parseFloat(config?.scrollLength || '6') || 6;
  const showHud = bool(config?.showHud, true);
  const showTrail = bool(config?.showTrail, true);
  const easing = config?.easing || 'constant';
  const smoothing = Math.min(1, Math.max(0.02, parseFloat(config?.smoothing || '0.12')));

  const words = React.useMemo(() => {
    const list = String(config?.words || 'look, closer, beyond, form, wonder').split(',').map((w) => w.trim()).filter(Boolean).slice(0, 6);
    const cased = (list.length ? list : ['look', 'closer']).map((w) => (wordCase === 'uppercase' ? w.toUpperCase() : wordCase === 'lowercase' ? w.toLowerCase() : w));
    const over = String(config?.focalIndexes || '').split(',').map((s) => parseInt(s, 10));
    return cased.map((w, i) => {
      let f = Number.isInteger(over[i]) && over[i] >= 0 && over[i] < w.length ? over[i] : w.toLowerCase().indexOf(focalChar.toLowerCase());
      if (f < 0) { const m = w.search(/[oOaAdDbBpPqQgGeE0]/); f = m >= 0 ? m : Math.floor(w.length / 2); }
      return { text: w, focal: f };
    });
  }, [config?.words, config?.focalIndexes, focalChar, wordCase]);
  const N = words.length;

  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  const sectionRef = React.useRef(null);
  const wordRefs = React.useRef([]);
  const focalRefs = React.useRef([]);
  const baseRefs = React.useRef([]);
  const target = React.useRef(0);
  const current = React.useRef(0);
  const [progress, setProgress] = React.useState(reduced ? 1 : 0);
  const [stageH, setStageH] = React.useState(800);
  const [width, setWidth] = React.useState(1280);
  const [metrics, setMetrics] = React.useState(null);

  const W = Math.max(320, width);
  const H = Math.max(360, stageH);
  const compact = W < 760;
  const pad = compact ? 20 : Math.round(Math.max(40, Math.min(72, W * 0.045)));
  const longest = Math.max(...words.map((w) => w.text.length), 3);
  const F = Math.round(Math.min(compact ? sizeBase * 0.5 : sizeBase, (W * 0.84) / (longest * (wordCase === 'uppercase' ? 0.66 : 0.54)), H * 0.42));
  const fontCss = `"${font}", "Inter", -apple-system, "Helvetica Neue", Arial, sans-serif`;
  const monoCss = `"${monoFont}", ui-monospace, "SF Mono", Menlo, monospace`;
  const bgOf = (k) => ((k % 2 === 0) === startDark ? darkC : lightC);
  const inkOf = (k) => ((k % 2 === 0) === startDark ? lightC : darkC);

  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    [font, monoFont].forEach((f) => {
      const id = 'izt3-font-' + f.replace(/\s+/g, '-').toLowerCase();
      if (document.getElementById(id)) return;
      const l = document.createElement('link');
      l.id = id; l.rel = 'stylesheet';
      l.href = `https://fonts.googleapis.com/css2?family=${f.replace(/\s+/g, '+')}:wght@${f === 'Space Mono' ? '400' : '300;400;500'}&display=swap`;
      document.head.appendChild(l);
    });
  }, [font, monoFont]);

  const measure = React.useCallback(() => {
    if (typeof document === 'undefined') return;
    const cv = document.createElement('canvas');
    const ctx = cv.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;
    const fontStr = `${weight} ${F}px ${fontCss}`;
    const out = words.map((w, k) => {
      const el = wordRefs.current[k];
      if (!el) return null;
      const ww = el.offsetWidth;
      ctx.font = fontStr;
      const wm = ctx.measureText(w.text);
      const bm = baseRefs.current[k];
      const by = bm ? bm.offsetTop : F * 0.8;
      const inkCy = by - ((wm.actualBoundingBoxAscent || F * 0.7) - (wm.actualBoundingBoxDescent || 0)) / 2;
      const res = { w: ww, cx: ww / 2, cy: inkCy, by, inkH: (wm.actualBoundingBoxAscent || F * 0.7) + (wm.actualBoundingBoxDescent || 0) };
      const fe = focalRefs.current[k];
      if (k < N - 1 && fe) {
        const ch = w.text[w.focal];
        const lx = fe.offsetLeft;
        const m = ctx.measureText(ch);
        const asc = m.actualBoundingBoxAscent || F * 0.5;
        const desc = m.actualBoundingBoxDescent || 0;
        const padX = Math.ceil(F * 0.3);
        const baseY = Math.ceil(F * 1.2);
        cv.width = Math.ceil((m.width || F * 0.6) + padX * 2);
        cv.height = Math.ceil(F * 1.6);
        ctx.font = fontStr;
        ctx.fillStyle = '#000';
        ctx.textBaseline = 'alphabetic';
        ctx.fillText(ch, padX, baseY);
        const img = ctx.getImageData(0, 0, cv.width, cv.height).data;
        const at = (x, y) => img[(y * cv.width + x) * 4 + 3] > 110;
        const midY = Math.round(baseY - (asc - desc) / 2);
        const runs = (get, n) => {
          const r = []; let inRun = false; let s = 0;
          for (let i = 0; i < n; i++) {
            const v = get(i);
            if (v && !inRun) { inRun = true; s = i; }
            if (!v && inRun) { inRun = false; r.push([s, i - 1]); }
          }
          if (inRun) r.push([s, n - 1]);
          return r;
        };
        const hr = runs((x) => at(x, midY), cv.width);
        let fx; let fy; let ia; let ib; let da; let db;
        if (hr.length >= 2) {
          const oL = hr[0][0]; const iL = hr[0][1] + 1; const iR = hr[hr.length - 1][0] - 1; const oR = hr[hr.length - 1][1];
          const cxp = Math.round((iL + iR) / 2);
          const vr = runs((y) => at(cxp, y), cv.height);
          let oT = baseY - asc; let iT = baseY - asc * 0.85; let iB = baseY - asc * 0.15; let oB = baseY + desc;
          if (vr.length >= 2) { oT = vr[0][0]; iT = vr[0][1] + 1; iB = vr[vr.length - 1][0] - 1; oB = vr[vr.length - 1][1]; }
          fx = lx + (cxp - padX);
          fy = by + ((iT + iB) / 2 - baseY);
          ia = (iR - iL) / 2; ib = (iB - iT) / 2;
          const sx = ((iL - oL) + (oR - iR)) / 2; const sy = ((iT - oT) + (oB - iB)) / 2;
          da = ia + sx * 0.6; db = ib + sy * 0.6;
        } else {
          const lw = fe.offsetWidth;
          fx = lx + lw / 2; fy = by - (asc - desc) / 2;
          ia = lw * 0.22; ib = (asc + desc) * 0.3; da = ia * 1.2; db = ib * 1.2;
        }
        res.focal = { x: fx, y: fy, ia, ib, da, db };
      }
      return res;
    });
    if (out.every(Boolean)) setMetrics(out);
  }, [words, N, F, weight, fontCss]);

  React.useEffect(() => {
    measure();
    let alive = true;
    if (typeof document !== 'undefined' && document.fonts) {
      document.fonts.load(`${weight} ${F}px "${font}"`).then(() => { if (alive) measure(); }).catch(() => {});
      document.fonts.ready.then(() => { if (alive) measure(); });
    }
    const id = setTimeout(measure, 900);
    return () => { alive = false; clearTimeout(id); };
  }, [measure, width, tracking]);

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
      current.current = Math.abs(d) < 0.0002 ? target.current : current.current + d * smoothing;
      setProgress(current.current);
      raf = current.current === target.current ? 0 : requestAnimationFrame(tick);
    };
    const onScroll = () => { read(); if (!raf && !reduced) raf = requestAnimationFrame(tick); };
    const onMeasure = () => {
      setStageH(scroller === window ? window.innerHeight : scroller.clientHeight);
      setWidth(section.clientWidth);
      onScroll();
    };
    onMeasure();
    scroller.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onMeasure);
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(onMeasure) : null;
    if (ro) ro.observe(section);
    return () => {
      scroller.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onMeasure);
      if (ro) ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [smoothing, reduced]);

  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const smooth = (t) => t * t * (3 - 2 * t);
  const ease = (t) => 1 - Math.pow(1 - t, 3);
  const p = reduced ? 1 : progress;

  const chain = React.useMemo(() => {
    if (!metrics) return null;
    const S = [1]; const C = [{ x: 0, y: 0 }]; const ratio = [];
    for (let k = 0; k < N - 1; k++) {
      const m = metrics[k]; const nx = metrics[k + 1];
      const f = m.focal;
      const r = nestFit / Math.sqrt(Math.pow(nx.w / (2 * f.ia), 2) + Math.pow(nx.inkH / (2 * f.ib), 2));
      ratio.push(r);
      C.push({ x: C[k].x + S[k] * (f.x - m.cx), y: C[k].y + S[k] * (f.y - m.cy) });
      S.push(S[k] * r);
    }
    const logs = ratio.map((r) => Math.log(1 / r));
    const total = logs.reduce((a, b) => a + b, 0) || 1;
    const bounds = [0];
    logs.forEach((l) => bounds.push(bounds[bounds.length - 1] + l / total));
    return { S, C, ratio, bounds };
  }, [metrics, N, nestFit]);

  const zStart = 0.04; const zEnd = 0.86;
  const zp = clamp((p - zStart) / (zEnd - zStart));
  let u = 0;
  if (chain && N > 1) {
    const q = easing === 'constant' ? (zp < 0.06 ? zp * zp / 0.12 : zp > 0.94 ? 1 - (1 - zp) * (1 - zp) / 0.12 : zp) : zp;
    let k = 0;
    while (k < N - 2 && q > chain.bounds[k + 1]) k++;
    const local = clamp((q - chain.bounds[k]) / Math.max(1e-6, chain.bounds[k + 1] - chain.bounds[k]));
    u = k + (easing === 'constant' ? local : smooth(local));
  }
  const landed = ease(clamp((p - 0.86) / 0.1));

  let Z = 1; let cam = { x: 0, y: 0 };
  if (chain) {
    const k = Math.min(N - 2, Math.max(0, Math.floor(u)));
    const t = N > 1 ? u - k : 0;
    if (N > 1) {
      const Zk = 1 / chain.S[k]; const Zn = 1 / chain.S[k + 1];
      Z = Zk * Math.pow(Zn / Zk, t);
      const a = chain.C[k]; const b = chain.C[k + 1];
      const off0x = (b.x - a.x) * Zk; const off0y = (b.y - a.y) * Zk;
      const pan = smooth(clamp(t * 1.15));
      cam = { x: b.x - (off0x * (1 - pan)) / Z, y: b.y - (off0y * (1 - pan)) / Z };
    }
  }

  const hw = W / 2; const hh = H / 2;
  let coverIdx = -1;
  if (chain) {
    for (let j = N - 2; j >= 0; j--) {
      const f = metrics[j].focal;
      const z = chain.S[j] * Z;
      const dx = (chain.C[j].x + chain.S[j] * (f.x - metrics[j].cx) - cam.x) * Z;
      const dy = (chain.C[j].y + chain.S[j] * (f.y - metrics[j].cy) - cam.y) * Z;
      const a = f.ia * z; const b = f.ib * z;
      const corners = [[-hw, -hh], [hw, -hh], [-hw, hh], [hw, hh]];
      if (corners.every(([x, y]) => Math.pow((x - dx) / a, 2) + Math.pow((y - dy) / b, 2) < 0.98)) { coverIdx = j; break; }
    }
  }
  const firstLevel = coverIdx + 1;
  const stageBg = bgOf(Math.max(0, firstLevel));
  const activeWord = Math.min(N - 1, Math.round(u));

  const levels = words.map((w, k) => {
    const m = metrics && metrics[k];
    let style;
    let visible = true;
    if (!chain || !m) {
      visible = k === 0;
      style = { transform: `translate(-50%, -50%)`, left: '50%', top: '50%' };
    } else {
      const z = chain.S[k] * Z;
      if (k < firstLevel || z * F < 1.5) visible = false;
      const sx = (chain.C[k].x - cam.x) * Z; const sy = (chain.C[k].y - cam.y) * Z;
      style = { left: '50%', top: '50%', transform: `translate(${sx.toFixed(3)}px, ${sy.toFixed(3)}px) scale(${z.toFixed(6)}) translate(${(-m.cx).toFixed(2)}px, ${(-m.cy).toFixed(2)}px)` };
    }
    const f = m && m.focal;
    const isLast = k === N - 1;
    return (
      <div key={k} aria-hidden="true" style={{
        position: 'absolute', transformOrigin: '0 0', visibility: visible ? 'visible' : 'hidden', ...style
      }}>
        <div ref={(el) => { wordRefs.current[k] = el; }} style={{
          position: 'relative', whiteSpace: 'nowrap', fontFamily: fontCss, fontWeight: weight, fontSize: F, lineHeight: 1,
          letterSpacing: `${tracking}em`, color: inkOf(k)
        }}>
          {f && !isLast && (
            <div style={{ position: 'absolute', left: f.x - f.da, top: f.y - f.db, width: f.da * 2, height: f.db * 2, borderRadius: '50%', background: bgOf(k + 1) }} />
          )}
          {w.text.split('').map((ch, i) => (
            <span key={i} ref={i === w.focal ? (el) => { focalRefs.current[k] = el; } : undefined}
              style={{ position: 'relative', color: i === w.focal && !isLast && accentDoorway ? accent : undefined }}>{ch}</span>
          ))}
          {isLast && <span style={{ position: 'relative', color: accent }}>.</span>}
          <span ref={(el) => { baseRefs.current[k] = el; }} style={{ display: 'inline-block', width: 0, height: 0, verticalAlign: 'baseline' }} />
        </div>
      </div>
    );
  });

  const lastInk = inkOf(N - 1);
  const zoomLabel = Z < 10 ? Z.toFixed(2) : Math.round(Z).toLocaleString('en-US');

  return (
    <section ref={sectionRef} className="infinite-zoom-type" aria-label={`${words.map((w) => w.text).join(', ')}. ${subline}`}
      style={{ position: 'relative', width: '100%', height: `${Math.round(stageH * screens)}px`, background: bgOf(0) }}>
      <div style={{ position: 'sticky', top: 0, height: `${stageH}px`, overflow: 'hidden', background: stageBg }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          {levels.slice(0, N - 1)}
          {landed > 0 && <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: bgOf(N - 1), opacity: landed }} />}
          {levels[N - 1]}
        </div>

        <div style={{
          position: 'absolute', left: '50%', top: '50%', width: compact ? W - pad * 2 : 560, textAlign: 'center',
          transform: `translate(-50%, ${(chain && metrics ? (metrics[N - 1].inkH * 0.5 + (compact ? 28 : 40)) : F * 0.5) + (1 - landed) * 14}px)`,
          opacity: landed, color: lastInk
        }}>
          <p style={{ margin: 0, fontFamily: fontCss, fontWeight: 300, fontSize: compact ? 15 : 18, lineHeight: 1.5, letterSpacing: '-0.01em' }}>{subline}</p>
          <div style={{ marginTop: 14, fontFamily: monoCss, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.6 }}>{footnote}</div>
        </div>

        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', color: '#fff', mixBlendMode: 'difference' }}>
          <div style={{ position: 'absolute', top: compact ? 20 : 36, left: pad, right: pad, display: 'flex', justifyContent: 'space-between', fontFamily: monoCss, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
            <span style={{ opacity: 0.75 }}>{eyebrow}</span>
            <span style={{ fontVariantNumeric: 'tabular-nums', opacity: 0.75 }}>Depth {String(activeWord + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}</span>
          </div>
          {showHud && (
            <div style={{ position: 'absolute', left: pad, bottom: compact ? 20 : 32, fontFamily: monoCss, fontVariantNumeric: 'tabular-nums' }}>
              <div style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.6, marginBottom: 6 }}>Magnification</div>
              <div style={{ fontSize: compact ? 18 : 22, letterSpacing: '-0.02em' }}>× {zoomLabel}</div>
            </div>
          )}
          {showTrail && (
            <div style={{ position: 'absolute', right: pad, bottom: compact ? 20 : 32, maxWidth: compact ? W * 0.5 : 'none', textAlign: 'right', fontFamily: monoCss, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', lineHeight: 1.7 }}>
              {words.map((w, i) => (
                <span key={i} style={{ opacity: i === activeWord ? 1 : i < activeWord ? 0.5 : 0.25, whiteSpace: 'nowrap' }}>
                  {w.text}{i < N - 1 ? <span style={{ opacity: 0.6 }}>{'  →  '}</span> : null}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

const MANIFEST = {
  "type": "Reveal.SpotlightText",
  "description": "A dark section holding a long statement in large grotesk, set at a whisper of opacity. A soft spotlight follows the pointer with lerp and lights the words beneath it to full white; words it has touched keep a faint afterglow and marked keywords turn accent. Without a pointer the light sweeps line by line on scroll or by itself when idle",
  "editorElement": {
    "selector": ".spotlight-text",
    "displayName": "Spotlight Text",
    "archetype": "container",
    "data": {
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Manifesto", "group": "Content" },
      "indexLabel": { "dataType": "text", "displayName": "Corner Label", "defaultValue": "01 / Belief", "group": "Content" },
      "statement": { "dataType": "text", "displayName": "Statement (wrap keywords in *asterisks*)", "defaultValue": "We believe the best *design* disappears. It does not shout or decorate. It *listens*, removes what is not needed and leaves room for the *people* who use it. Every line we draw is a promise to keep things *simple*, honest and quietly *useful* — long after the launch is forgotten.", "group": "Content" },
      "attribution": { "dataType": "text", "displayName": "Attribution", "defaultValue": "— Studio notes, 2026", "group": "Content" },
      "hint": { "dataType": "text", "displayName": "Hint Label", "defaultValue": "Move to read", "group": "Content" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#0B0B0C", "group": "Colors" },
      "textColor": { "dataType": "color", "displayName": "Lit Text", "defaultValue": "#F3F2EF", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Mono Labels", "defaultValue": "#7C7770", "group": "Colors" },
      "ruleColor": { "dataType": "color", "displayName": "Hairlines", "defaultValue": "#24221F", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Keyword Accent", "defaultValue": "#E8590C", "group": "Colors" },
      "glowColor": { "dataType": "color", "displayName": "Spotlight Haze", "defaultValue": "#2A2622", "group": "Colors" },
      "font": { "dataType": "select", "displayName": "Statement Font", "defaultValue": "Instrument Sans", "options": ["Instrument Sans", "Inter Tight", "Inter", "Geist", "Manrope", "Archivo"], "group": "Typography" },
      "monoFont": { "dataType": "select", "displayName": "Mono Font", "defaultValue": "JetBrains Mono", "options": ["JetBrains Mono", "Geist Mono", "IBM Plex Mono", "Space Mono"], "group": "Typography" },
      "textSize": { "dataType": "select", "displayName": "Text Size", "defaultValue": "auto", "options": ["auto", "48", "56", "64", "72", "88"], "group": "Typography" },
      "textWeight": { "dataType": "select", "displayName": "Weight", "defaultValue": "400", "options": ["300", "400", "500"], "group": "Typography" },
      "tracking": { "dataType": "select", "displayName": "Tracking", "defaultValue": "-0.035", "options": ["-0.02", "-0.035", "-0.045"], "group": "Typography" },
      "baseOpacity": { "dataType": "select", "displayName": "Unlit Opacity", "defaultValue": "0.12", "options": ["0.08", "0.12", "0.18", "0.24"], "group": "Spotlight" },
      "afterglow": { "dataType": "select", "displayName": "Afterglow", "defaultValue": "0.36", "options": ["0", "0.24", "0.36", "0.5"], "group": "Spotlight" },
      "radius": { "dataType": "select", "displayName": "Spotlight Radius", "defaultValue": "medium", "options": ["small", "medium", "large"], "group": "Spotlight" },
      "follow": { "dataType": "select", "displayName": "Follow Softness", "defaultValue": "0.12", "options": ["0.06", "0.12", "0.2", "0.35"], "group": "Spotlight" },
      "sweepSpeed": { "dataType": "select", "displayName": "Idle Sweep (s per line)", "defaultValue": "2.2", "options": ["1.4", "2.2", "3", "4"], "group": "Spotlight" },
      "scrollSweep": { "dataType": "booleanValue", "displayName": "Sweep With Scroll", "defaultValue": "true", "group": "Spotlight" },
      "showHaze": { "dataType": "booleanValue", "displayName": "Background Haze", "defaultValue": "true", "group": "Spotlight" },
      "maxWidth": { "dataType": "select", "displayName": "Text Measure", "defaultValue": "wide", "options": ["narrow", "medium", "wide"], "group": "Layout" },
      "minHeight": { "dataType": "select", "displayName": "Min Height", "defaultValue": "screen", "options": ["auto", "screen", "640"], "group": "Layout" },
      "triggerMode": { "dataType": "select", "displayName": "Trigger", "defaultValue": "entrance", "options": ["entrance", "scroll", "manual"], "group": "Animation", "description": "entrance plays once, scroll replays on every entry, manual waits for the replay button" },
      "threshold": { "dataType": "select", "displayName": "Trigger Threshold", "defaultValue": "0.25", "options": ["0.1", "0.25", "0.4"], "group": "Animation" },
      "showReplay": { "dataType": "booleanValue", "displayName": "Replay Button", "defaultValue": "true", "group": "Animation" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const eyebrow = config?.eyebrow || 'Manifesto';
  const indexLabel = config?.indexLabel || '01 / Belief';
  const statement = config?.statement || 'We believe the best *design* disappears. It does not shout or decorate. It *listens*, removes what is not needed and leaves room for the *people* who use it. Every line we draw is a promise to keep things *simple*, honest and quietly *useful* — long after the launch is forgotten.';
  const attribution = config?.attribution ?? '— Studio notes, 2026';
  const hint = config?.hint || 'Move to read';
  const bg = config?.backgroundColor || '#0B0B0C';
  const textColor = config?.textColor || '#F3F2EF';
  const muted = config?.mutedColor || '#7C7770';
  const ruleColor = config?.ruleColor || '#24221F';
  const accent = config?.accentColor || '#E8590C';
  const glowColor = config?.glowColor || '#2A2622';
  const font = config?.font || 'Instrument Sans';
  const monoFont = config?.monoFont || 'JetBrains Mono';
  const sizeOpt = config?.textSize || 'auto';
  const weight = parseInt(config?.textWeight || '400', 10) || 400;
  const tracking = parseFloat(config?.tracking || '-0.035');
  const baseOp = parseFloat(config?.baseOpacity || '0.12');
  const afterglow = parseFloat(config?.afterglow ?? '0.36');
  const radiusOpt = config?.radius || 'medium';
  const follow = Math.min(1, Math.max(0.02, parseFloat(config?.follow || '0.12')));
  const secPerLine = Math.max(0.6, parseFloat(config?.sweepSpeed || '2.2'));
  const scrollSweep = bool(config?.scrollSweep, true);
  const showHaze = bool(config?.showHaze, true);
  const measureOpt = config?.maxWidth || 'wide';
  const minHOpt = config?.minHeight || 'screen';
  const triggerMode = config?.triggerMode || 'entrance';
  const threshold = parseFloat(config?.threshold || '0.25');
  const showReplay = bool(config?.showReplay, true);

  const tokens = React.useMemo(() => {
    const out = [];
    String(statement).split(/\s+/).filter(Boolean).forEach((raw) => {
      const m = raw.match(/^([^*]*)\*([^*]+)\*(.*)$/);
      if (m) out.push({ pre: m[1], text: m[2], post: m[3], key: true });
      else out.push({ pre: '', text: raw.replace(/\*/g, ''), post: '', key: false });
    });
    return out;
  }, [statement]);

  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    [font, monoFont].forEach((f) => {
      const id = 'st3-font-' + f.replace(/\s+/g, '-').toLowerCase();
      if (document.getElementById(id)) return;
      const l = document.createElement('link');
      l.id = id; l.rel = 'stylesheet';
      l.href = `https://fonts.googleapis.com/css2?family=${f.replace(/\s+/g, '+')}:wght@${f === 'Space Mono' ? '400' : '300;400;500'}&display=swap`;
      document.head.appendChild(l);
    });
  }, [font, monoFont]);

  const uid = React.useMemo(() => 'st' + Math.random().toString(36).slice(2, 8), []);
  const rootRef = React.useRef(null);
  const wrapRef = React.useRef(null);
  const topRef = React.useRef(null);
  const hazeRef = React.useRef(null);
  const wordRefs = React.useRef([]);
  const riseRefs = React.useRef([]);
  const geo = React.useRef({ words: [], lines: [] });
  const glow = React.useRef([]);
  const lastOp = React.useRef([]);
  const lastKey = React.useRef([]);
  const spot = React.useRef({ x: -999, y: -999, tx: 0, ty: 0, s: 0, mode: 'idle', lastPointer: 0, lastScroll: 0, scrollS: 0 });
  const [width, setWidth] = React.useState(1280);
  const [stageH, setStageH] = React.useState(800);
  const [shown, setShown] = React.useState(reduced || triggerMode !== 'manual' ? reduced : false);
  const [runId, setRunId] = React.useState(0);

  const W = Math.max(320, width);
  const compact = W < 760;
  const pad = compact ? 20 : Math.round(Math.max(40, Math.min(80, W * 0.05)));
  const measureW = (W - pad * 2) * ({ narrow: 0.7, medium: 0.84, wide: 1 }[measureOpt] || 1);
  const autoSize = compact ? Math.max(30, Math.min(40, W * 0.088)) : Math.max(44, Math.min(84, measureW * 0.058));
  const size = Math.round(sizeOpt === 'auto' ? autoSize : (compact ? parseInt(sizeOpt, 10) * 0.55 : parseInt(sizeOpt, 10)));
  const R = ({ small: 0.75, medium: 1, large: 1.35 }[radiusOpt] || 1) * (compact ? 120 : Math.max(170, size * 3.1));
  const monoCss = `"${monoFont}", ui-monospace, "SF Mono", Menlo, monospace`;
  const sansCss = `"${font}", "Inter", -apple-system, "Helvetica Neue", Arial, sans-serif`;

  const hex = (h) => {
    const m = String(h).replace('#', '');
    const f = m.length === 3 ? m.split('').map((c) => c + c).join('') : m.padEnd(6, '0');
    return [parseInt(f.slice(0, 2), 16) || 0, parseInt(f.slice(2, 4), 16) || 0, parseInt(f.slice(4, 6), 16) || 0];
  };
  const mix = (a, b, k) => { const A = hex(a); const B = hex(b); return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * k)).join(',')})`; };

  const measure = React.useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const words = tokens.map((_, i) => {
      const el = riseRefs.current[i];
      if (!el) return { x: 0, y: 0, w: 0, h: 0 };
      return { x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight };
    });
    const lines = [];
    words.forEach((w) => {
      let ln = lines.find((l) => Math.abs(l.y - w.y) < w.h * 0.4);
      if (!ln) { ln = { y: w.y, h: w.h, x0: w.x, x1: w.x + w.w }; lines.push(ln); }
      ln.x0 = Math.min(ln.x0, w.x); ln.x1 = Math.max(ln.x1, w.x + w.w);
    });
    lines.sort((a, b) => a.y - b.y);
    geo.current = { words, lines };
  }, [tokens]);

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const s = typeof getScrollContainer === 'function' ? getScrollContainer() : null;
    const scroller = s && s !== window && s.nodeType === 1 ? s : window;
    const onResize = () => {
      setWidth(root.clientWidth);
      setStageH(scroller === window ? window.innerHeight : scroller.clientHeight);
    };
    onResize();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(onResize) : null;
    if (ro) ro.observe(root);
    return () => { if (ro) ro.disconnect(); };
  }, []);

  React.useEffect(() => {
    measure();
    if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    const id = setTimeout(measure, 700);
    return () => clearTimeout(id);
  }, [measure, width, size]);

  React.useEffect(() => {
    if (reduced) return undefined;
    const el = rootRef.current;
    if (triggerMode === 'manual') { setShown(true); return undefined; }
    if (!el || typeof IntersectionObserver === 'undefined') { setShown(true); return undefined; }
    const io = new IntersectionObserver((entries) => {
      const e = entries[0];
      if (e.isIntersecting) {
        setShown(true);
        if (triggerMode === 'entrance') io.disconnect();
      } else if (triggerMode === 'scroll') {
        setShown(false);
        glow.current = [];
        spot.current.s = 0;
      }
    }, { threshold: Math.min(threshold, 0.5) });
    io.observe(el);
    return () => io.disconnect();
  }, [triggerMode, threshold, reduced]);

  React.useEffect(() => {
    const root = rootRef.current;
    const wrap = wrapRef.current;
    if (!root || !wrap) return undefined;
    const st = spot.current;
    const sc = typeof getScrollContainer === 'function' ? getScrollContainer() : null;
    const scroller = sc && sc !== window && sc.nodeType === 1 ? sc : window;
    const scaleOf = () => { const r = wrap.getBoundingClientRect(); return { r, k: wrap.offsetWidth ? r.width / wrap.offsetWidth : 1 }; };
    const onMove = (e) => {
      const { r, k } = scaleOf();
      st.tx = (e.clientX - r.left) / k;
      st.ty = (e.clientY - r.top) / k;
      st.mode = 'pointer';
      st.lastPointer = performance.now();
    };
    const onLeave = () => { st.mode = 'idle'; st.lastPointer = performance.now() - 400; };
    const onScroll = () => {
      if (!scrollSweep || st.mode === 'pointer') return;
      const r = root.getBoundingClientRect();
      const top = scroller === window ? 0 : scroller.getBoundingClientRect().top;
      const vh = scroller === window ? window.innerHeight : scroller.getBoundingClientRect().height;
      const prog = Math.min(1, Math.max(0, (top + vh * 0.85 - r.top) / (r.height + vh * 0.5)));
      st.scrollS = prog * (geo.current.lines.length || 1);
      st.lastScroll = performance.now();
    };
    root.addEventListener('pointermove', onMove);
    root.addEventListener('pointerleave', onLeave);
    scroller.addEventListener('scroll', onScroll, { passive: true });

    let raf = 0;
    let prev = performance.now();
    const pathPoint = (s) => {
      const lines = geo.current.lines;
      if (!lines.length) return { x: 0, y: 0 };
      const n = lines.length;
      const sw = ((s % (n + 0.6)) + (n + 0.6)) % (n + 0.6);
      const li = Math.min(n - 1, Math.floor(sw));
      const f = Math.min(1, sw - li);
      const ln = lines[li];
      const ease = f < 0.5 ? 2 * f * f : 1 - Math.pow(-2 * f + 2, 2) / 2;
      return { x: ln.x0 + (ln.x1 - ln.x0) * (0.08 + ease * 0.84), y: ln.y + ln.h * 0.52 };
    };
    const tick = (now) => {
      const dt = Math.min(64, now - prev) / 1000;
      prev = now;
      const g = geo.current;
      if (st.mode !== 'pointer') {
        if (scrollSweep && now - st.lastScroll < 900) st.s += (st.scrollS - st.s) * 0.08;
        else if (now - st.lastPointer > 1200) st.s += dt / secPerLine;
        const pt = pathPoint(st.s);
        st.tx = pt.x; st.ty = pt.y;
      }
      if (st.x < -900) { st.x = st.tx; st.y = st.ty; }
      st.x += (st.tx - st.x) * follow;
      st.y += (st.ty - st.y) * follow;
      const top = topRef.current;
      if (top) {
        const m = `radial-gradient(ellipse ${Math.round(R * 1.15)}px ${Math.round(R * 0.72)}px at ${st.x.toFixed(1)}px ${st.y.toFixed(1)}px, #000 0%, rgba(0,0,0,0.92) 28%, rgba(0,0,0,0.35) 62%, transparent 100%)`;
        top.style.webkitMaskImage = m;
        top.style.maskImage = m;
      }
      if (hazeRef.current) hazeRef.current.style.transform = `translate(${st.x.toFixed(1)}px, ${st.y.toFixed(1)}px) translate(-50%, -50%)`;
      g.words.forEach((w, i) => {
        const cx = w.x + w.w / 2; const cy = w.y + w.h / 2;
        const dx = Math.max(0, Math.abs(st.x - cx) - w.w / 2) / 1.15; const dy = Math.abs(st.y - cy) / 0.72;
        const lit = Math.max(0, 1 - Math.hypot(dx, dy) / (R * 0.62));
        const gl = Math.max(glow.current[i] || 0, lit * afterglow);
        glow.current[i] = gl;
        const el = wordRefs.current[i];
        if (!el) return;
        const op = Math.max(baseOp, gl);
        if (Math.abs((lastOp.current[i] ?? -1) - op) > 0.004) { el.style.opacity = op.toFixed(3); lastOp.current[i] = op; }
        if (tokens[i] && tokens[i].key) {
          const on = gl > afterglow * 0.5 && afterglow > 0;
          if (lastKey.current[i] !== on) { el.style.color = on ? accent : textColor; lastKey.current[i] = on; }
        }
      });
      raf = requestAnimationFrame(tick);
    };
    if (!reduced && shown) raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      root.removeEventListener('pointermove', onMove);
      root.removeEventListener('pointerleave', onLeave);
      scroller.removeEventListener('scroll', onScroll);
    };
  }, [shown, reduced, R, follow, secPerLine, afterglow, baseOp, scrollSweep, accent, textColor, tokens, runId]);

  React.useEffect(() => {
    lastOp.current = [];
    lastKey.current = [];
    wordRefs.current.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = reduced ? '1' : String(Math.max(baseOp, glow.current[i] || 0));
      el.style.color = reduced && tokens[i]?.key ? accent : textColor;
    });
  }, [runId, reduced, baseOp, accent, textColor, tokens]);

  const replay = () => {
    glow.current = [];
    spot.current.s = 0;
    spot.current.x = -999;
    spot.current.mode = 'idle';
    spot.current.lastPointer = 0;
    setShown(false);
    setRunId((v) => v + 1);
    requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
  };

  const textStyle = { fontFamily: sansCss, fontWeight: weight, fontSize: size, lineHeight: 1.12, letterSpacing: `${tracking}em`, margin: 0 };
  const renderWords = (layer) => tokens.map((tk, i) => {
    const delay = Math.min(1100, i * 16);
    const rise = {
      display: 'inline-block', transform: shown || reduced ? 'none' : 'translateY(0.35em)', opacity: shown || reduced ? 1 : 0,
      transition: reduced ? 'none' : `transform 900ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, opacity 900ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`
    };
    return (
      <React.Fragment key={i}>
        <span style={rise} ref={layer === 'base' ? (el) => { riseRefs.current[i] = el; } : undefined}>
          {layer === 'base' ? (
            <span ref={(el) => { wordRefs.current[i] = el; }} style={{ display: 'inline-block', color: textColor, opacity: reduced ? 1 : baseOp, transition: 'color 500ms cubic-bezier(0.22,1,0.36,1)' }}>
              {tk.pre}{tk.text}{tk.post}
            </span>
          ) : (
            <span style={{ display: 'inline-block', color: textColor }}>
              {tk.pre}<span style={{ color: tk.key ? accent : textColor }}>{tk.text}</span>{tk.post}
            </span>
          )}
        </span>
        {i < tokens.length - 1 ? ' ' : null}
      </React.Fragment>
    );
  });

  const minH = minHOpt === 'screen' ? Math.max(compact ? 560 : 560, stageH) : minHOpt === 'auto' ? 0 : parseInt(minHOpt, 10);
  const btnReset = { appearance: 'none', background: 'none', border: 0, padding: 0, margin: 0, font: 'inherit', color: 'inherit', cursor: 'pointer' };

  return (
    <section ref={rootRef} className={`spotlight-text ${uid}`}
      style={{ position: 'relative', width: '100%', minHeight: minH, background: bg, color: textColor, overflow: 'hidden', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', padding: `${compact ? 20 : 36}px ${pad}px ${compact ? 24 : 36}px` }}>
      <style>{`.${uid} .st-btn:focus-visible{outline:1px solid ${accent};outline-offset:5px}.${uid} .st-btn:hover{color:${textColor} !important}`}</style>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: monoCss, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: muted, paddingBottom: compact ? 14 : 18, borderBottom: `1px solid ${ruleColor}` }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span aria-hidden="true" style={{ width: 6, height: 6, background: accent, display: 'inline-block' }} />
          {eyebrow}
        </span>
        <span>{indexLabel}</span>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: compact ? '40px 0' : '56px 0' }}>
        <div ref={wrapRef} style={{ position: 'relative', width: measureW, maxWidth: '100%' }}>
          {showHaze && !reduced && (
            <div ref={hazeRef} aria-hidden="true" style={{
              position: 'absolute', left: 0, top: 0, width: R * 3.4, height: R * 3.4, borderRadius: '50%', pointerEvents: 'none',
              background: `radial-gradient(circle at 50% 50%, ${glowColor} 0%, ${mix(glowColor, bg, 0.6)} 35%, transparent 70%)`,
              opacity: shown ? 0.9 : 0, transition: 'opacity 1200ms', transform: 'translate(-9999px, 0)'
            }} />
          )}
          <p style={{ ...textStyle, position: 'relative' }}>{renderWords('base')}</p>
          {!reduced && (
            <p ref={topRef} aria-hidden="true" style={{
              ...textStyle, position: 'absolute', left: 0, top: 0, width: '100%', pointerEvents: 'none',
              WebkitMaskImage: 'radial-gradient(circle 1px at -999px -999px, #000, transparent)', maskImage: 'radial-gradient(circle 1px at -999px -999px, #000, transparent)'
            }}>{renderWords('top')}</p>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, fontFamily: monoCss, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: muted, paddingTop: compact ? 14 : 18, borderTop: `1px solid ${ruleColor}` }}>
        <span>{attribution}</span>
        <span style={{ display: 'flex', gap: compact ? 14 : 28, alignItems: 'center' }}>
          {!compact && <span aria-hidden="true">{hint}</span>}
          {showReplay && !reduced && (
            <button type="button" className="st-btn" onClick={replay} aria-label="Replay spotlight" style={{ ...btnReset, color: muted, letterSpacing: '0.16em', textTransform: 'uppercase', transition: 'color 300ms' }}>↺ Replay</button>
          )}
        </span>
      </div>
    </section>
  );
}

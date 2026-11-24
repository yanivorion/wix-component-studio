const MANIFEST = {
  "type": "Type.ElasticHeadline",
  "description": "A headline made of jelly: brushing the letters squashes and stretches each one on an underdamped spring (scale, width axis and a skew in the direction of travel), with pointer speed controlling the intensity; a click sends a ripple wave hopping across every letter, and an idle ripple keeps it alive",
  "editorElement": {
    "selector": ".elastic-headline",
    "displayName": "Elastic Headline",
    "archetype": "container",
    "data": {
      "text": { "dataType": "text", "displayName": "Headline (use / for line breaks)", "defaultValue": "Squash & / stretch", "group": "Content" },
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Elastic headline — Archivo", "group": "Content" },
      "sideLabel": { "dataType": "text", "displayName": "Corner Label", "defaultValue": "No. 04 / Soft body type", "group": "Content" },
      "hint": { "dataType": "text", "displayName": "Hint", "defaultValue": "Brush the letters · Click for a ripple", "group": "Content" },
      "intensity": { "dataType": "select", "displayName": "Intensity", "defaultValue": "medium", "options": ["gentle", "medium", "wild"], "group": "Physics" },
      "bounciness": { "dataType": "select", "displayName": "Bounciness", "defaultValue": "jelly", "options": ["firm", "springy", "jelly"], "group": "Physics" },
      "skew": { "dataType": "select", "displayName": "Max Skew (deg)", "defaultValue": "16", "options": ["0", "8", "16", "24"], "group": "Physics" },
      "widthAxis": { "dataType": "booleanValue", "displayName": "Width Axis Jelly", "defaultValue": "true", "group": "Physics" },
      "brushRadius": { "dataType": "select", "displayName": "Brush Radius", "defaultValue": "medium", "options": ["small", "medium", "large"], "group": "Physics" },
      "rippleHop": { "dataType": "select", "displayName": "Ripple Hop", "defaultValue": "medium", "options": ["none", "low", "medium", "high"], "group": "Ripple" },
      "rippleSpeed": { "dataType": "select", "displayName": "Ripple Speed", "defaultValue": "medium", "options": ["slow", "medium", "fast"], "group": "Ripple" },
      "idleRipple": { "dataType": "select", "displayName": "Idle Ripple Every (s)", "defaultValue": "4", "options": ["off", "3", "4", "6", "9"], "group": "Animation" },
      "accentMode": { "dataType": "select", "displayName": "Accent", "defaultValue": "active letter", "options": ["active letter", "off"], "group": "Colors" },
      "showBaselines": { "dataType": "booleanValue", "displayName": "Baselines", "defaultValue": "true", "group": "Layout" },
      "showReadout": { "dataType": "booleanValue", "displayName": "Live Readout", "defaultValue": "true", "group": "Layout" },
      "align": { "dataType": "select", "displayName": "Alignment", "defaultValue": "left", "options": ["left", "center"], "group": "Layout" },
      "height": { "dataType": "select", "displayName": "Height", "defaultValue": "screen", "options": ["screen", "560", "680", "800"], "group": "Layout" },
      "weight": { "dataType": "select", "displayName": "Weight", "defaultValue": "400", "options": ["300", "400", "500"], "group": "Typography" },
      "sizeScale": { "dataType": "select", "displayName": "Headline Scale", "defaultValue": "1", "options": ["0.8", "0.9", "1", "1.1"], "group": "Typography" },
      "tracking": { "dataType": "select", "displayName": "Tracking (em)", "defaultValue": "-0.035", "options": ["-0.05", "-0.035", "-0.02", "0"], "group": "Typography" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#F3F2EF", "group": "Colors" },
      "inkColor": { "dataType": "color", "displayName": "Ink", "defaultValue": "#151413", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#8C8882", "group": "Colors" },
      "ruleColor": { "dataType": "color", "displayName": "Rules", "defaultValue": "#D9D6D0", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent Colour", "defaultValue": "#C2410C", "group": "Colors" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const text = config?.text || 'Squash & / stretch';
  const eyebrow = config?.eyebrow || 'Elastic headline — Archivo';
  const sideLabel = config?.sideLabel || 'No. 04 / Soft body type';
  const hint = config?.hint || 'Brush the letters · Click for a ripple';
  const gain = { gentle: 0.6, medium: 1, wild: 1.6 }[config?.intensity || 'medium'] || 1;
  const spring = { firm: [0.2, 0.74], springy: [0.17, 0.82], jelly: [0.14, 0.88] }[config?.bounciness || 'jelly'] || [0.14, 0.88];
  const skewMaxRaw = parseFloat(config?.skew ?? '16');
  const skewMax = isNaN(skewMaxRaw) ? 16 : skewMaxRaw;
  const widthAxis = bool(config?.widthAxis, true);
  const brushR = { small: 0.45, medium: 0.7, large: 1.05 }[config?.brushRadius || 'medium'] || 0.7;
  const hop = { none: 0, low: 0.05, medium: 0.1, high: 0.17 }[config?.rippleHop || 'medium'] ?? 0.1;
  const rSpeed = { slow: 0.9, medium: 1.5, fast: 2.4 }[config?.rippleSpeed || 'medium'] || 1.5;
  const idleSec = config?.idleRipple === 'off' ? 0 : (parseFloat(config?.idleRipple || '4') || 4);
  const accentOn = (config?.accentMode || 'active letter') !== 'off';
  const showBaselines = bool(config?.showBaselines, true);
  const showReadout = bool(config?.showReadout, true);
  const align = config?.align === 'center' ? 'center' : 'left';
  const heightMode = config?.height || 'screen';
  const wRest = parseFloat(config?.weight || '400') || 400;
  const sizeScale = parseFloat(config?.sizeScale || '1') || 1;
  const tracking = parseFloat(config?.tracking || '-0.035') || 0;
  const bg = config?.backgroundColor || '#F3F2EF';
  const ink = config?.inkColor || '#151413';
  const muted = config?.mutedColor || '#8C8882';
  const rule = config?.ruleColor || '#D9D6D0';
  const accent = config?.accentColor || '#C2410C';

  const uid = React.useMemo(() => 'eh' + Math.random().toString(36).slice(2, 9), []);
  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  const rootRef = React.useRef(null);
  const wrapRefs = React.useRef([]);
  const glyphRefs = React.useRef([]);
  const probeRef = React.useRef(null);
  const ro = React.useRef({});
  const sim = React.useRef([]);
  const ptr = React.useRef({ x: 0, y: 0, vx: 0, vy: 0, on: false, t: 0, moved: false });
  const ripples = React.useRef([]);
  const lastUser = React.useRef(-1e9);
  const rippleCount = React.useRef(0);
  const [width, setWidth] = React.useState(1280);
  const [stageH, setStageH] = React.useState(760);
  const [base, setBase] = React.useState(0);

  React.useEffect(() => {
    const id = 'gf-archivo-jbmono';
    if (document.getElementById(id)) return;
    const l = document.createElement('link');
    l.id = id; l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=JetBrains+Mono:wght@400;500&display=swap';
    document.head.appendChild(l);
  }, []);

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return undefined;
    const s = typeof getScrollContainer === 'function' ? getScrollContainer() : null;
    const scroller = s && s !== window && s.nodeType === 1 ? s : window;
    const measure = () => {
      setWidth(el.clientWidth || 1280);
      setStageH(scroller === window ? window.innerHeight : scroller.clientHeight);
    };
    measure();
    const obs = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (obs) obs.observe(el);
    window.addEventListener('resize', measure);
    return () => { if (obs) obs.disconnect(); window.removeEventListener('resize', measure); };
  }, []);

  const compact = width < 760;
  const lines = React.useMemo(() => {
    const b = String(text).split(/\s*(?:\/|\n)\s*/).filter(Boolean);
    return compact ? b.flatMap((l) => {
      const words = l.split(/\s+/).filter(Boolean);
      const out = [];
      words.forEach((w) => { if (out.length && (out[out.length - 1] + ' ' + w).length <= 8 && w.length <= 2) out[out.length - 1] += ' ' + w; else out.push(w); });
      return out;
    }) : b;
  }, [text, compact]);
  const flat = React.useMemo(() => {
    const out = [];
    lines.forEach((ln, li) => Array.from(ln).forEach((ch, ci) => out.push({ ch, li, ci })));
    return out;
  }, [lines]);

  const H = heightMode === 'screen' ? Math.max(compact ? 640 : 560, Math.min(stageH, 1000)) : parseInt(heightMode, 10) || 680;
  const pad = compact ? 20 : 56;
  const maxChars = Math.max(...lines.map((l) => l.length), 1);
  const topZone = pad + 70;
  const bottomZone = pad + (compact ? 110 : 90);
  const lh = 0.98;
  const fontPx = Math.round(Math.min(
    ((width - pad * 2) * 0.94) / (maxChars * 0.56),
    (H - topZone - bottomZone) / (lines.length * lh)
  ) * sizeScale);

  React.useEffect(() => {
    const m = () => { if (probeRef.current) setBase(probeRef.current.offsetTop); };
    m();
    let alive = true;
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (alive) m(); }).catch(() => {});
    const t = setTimeout(m, 900);
    return () => { alive = false; clearTimeout(t); };
  }, [fontPx, lines]);

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const n = flat.length;
    sim.current = Array.from({ length: n }, (_, i) => sim.current[i] || { q: 0, vq: 0, k: 0, vk: 0, y: 0, vy: 0, c: 0 });
    let raf = 0;
    let visible = true;
    let last = performance.now();
    let nextIdle = performance.now() + 650;
    let idleSide = 0;
    const R = ro.current;
    const [K, D] = spring;
    let speedSm = 0;

    const frame = (now) => {
      const dt = Math.min(2.2, (now - last) / 16.67);
      last = now;
      const rr = root.getBoundingClientRect();
      const scale = rr.width / (root.offsetWidth || rr.width) || 1;
      const P = ptr.current;
      if (idleSec && !reduced && now > nextIdle) {
        if (now - lastUser.current > 3000) {
          const xs = idleSide % 2 === 0 ? -40 : (root.offsetWidth || 1280) + 40;
          ripples.current.push({ x: xs, t0: now, amp: 0.85, hit: new Set() });
          idleSide++;
          rippleCount.current++;
        }
        nextIdle = now + idleSec * 1000;
      }
      const sp = P.on ? Math.hypot(P.vx, P.vy) : 0;
      speedSm += (sp - speedSm) * 0.2;
      const rad = fontPx * brushR;
      let best = -1; let bestE = 0;
      for (let i = 0; i < n; i++) {
        const st = sim.current[i];
        const w = wrapRefs.current[i];
        const g = glyphRefs.current[i];
        if (!st || !w || !g) continue;
        const b = w.getBoundingClientRect();
        const cx = (b.left + b.width / 2 - rr.left) / scale;
        const cy = (b.top + b.height * 0.55 - rr.top) / scale;
        if (P.on && P.moved && !reduced) {
          const d = Math.hypot((cx - P.x) / 0.8, cy - P.y);
          if (d < rad) {
            const f = 0.5 + 0.5 * Math.cos(Math.PI * d / rad);
            const vel = Math.min(60, sp);
            st.vq += f * gain * (P.vy >= 0 ? 1 : -0.85) * Math.min(0.09, Math.abs(P.vy) * 0.0032 + vel * 0.0011) * dt;
            st.vk += f * gain * P.vx * 0.07 * dt;
          }
        }
        for (let r = 0; r < ripples.current.length; r++) {
          const rp = ripples.current[r];
          if (rp.hit.has(i)) continue;
          const dx = Math.abs(cx - rp.x);
          if ((now - rp.t0) * rSpeed >= dx) {
            rp.hit.add(i);
            if (!reduced) {
              const decay = Math.max(0.35, 1 - dx / ((root.offsetWidth || 1280) * 1.6));
              st.vq += 0.13 * rp.amp * decay * gain;
              st.vk += (cx > rp.x ? 1 : -1) * 2.6 * rp.amp * decay * gain;
              st.vy -= fontPx * hop * 0.32 * rp.amp * decay;
            }
          }
        }
        st.vq += (-st.q) * K * dt; st.vq *= Math.pow(D, dt); st.q += st.vq * dt;
        st.vk += (-st.k) * K * 0.8 * dt; st.vk *= Math.pow(D, dt); st.k += st.vk * dt;
        st.vy += (-st.y) * K * 0.7 * dt; st.vy *= Math.pow(D * 0.98, dt); st.y += st.vy * dt;
        st.q = Math.max(-0.45, Math.min(0.62, st.q));
        st.k = Math.max(-skewMax, Math.min(skewMax, st.k));
        const sx = 1 + st.q;
        const sy = 1 / sx;
        g.style.transform = `translate3d(0, ${st.y.toFixed(2)}px, 0) skewX(${(-st.k).toFixed(2)}deg) scale(${sx.toFixed(4)}, ${sy.toFixed(4)})`;
        if (widthAxis) g.style.fontVariationSettings = `'wght' ${wRest}, 'wdth' ${Math.max(62, Math.min(125, 100 + st.q * 70)).toFixed(1)}`;
        const e = Math.abs(st.q) * 2.2 + Math.abs(st.k) / 22 + Math.abs(st.y) / (fontPx * 0.15);
        if (e > bestE) { bestE = e; best = i; }
      }
      for (let i = 0; i < n; i++) {
        const st = sim.current[i]; const g = glyphRefs.current[i];
        if (!st || !g) continue;
        const want = accentOn && i === best && bestE > 0.14 ? 1 : 0;
        st.c += (want - st.c) * Math.min(1, 0.35 * dt);
        const on = st.c > 0.5;
        if (on !== st.on) { st.on = on; g.style.color = on ? accent : ink; }
      }
      ripples.current = ripples.current.filter((rp) => rp.hit.size < n && now - rp.t0 < 6000);
      if (P.on) { P.vx *= 0.6; P.vy *= 0.6; }
      P.moved = false;
      if (R.vel) {
        R.vel.textContent = (speedSm / 16.67).toFixed(2);
        R.bar.style.transform = `scaleX(${Math.min(1, speedSm / 40).toFixed(3)})`;
        R.rip.textContent = String(rippleCount.current).padStart(2, '0');
        R.act.textContent = best >= 0 && bestE > 0.08 ? `${String(best + 1).padStart(2, '0')} ${flat[best].ch === ' ' ? '·' : flat[best].ch}` : '— —';
      }
      raf = visible ? requestAnimationFrame(frame) : 0;
    };
    const io = typeof IntersectionObserver !== 'undefined' ? new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      if (visible && !raf) { last = performance.now(); raf = requestAnimationFrame(frame); }
    }) : null;
    if (io) io.observe(root);
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); if (io) io.disconnect(); };
  }, [flat, fontPx, gain, spring, skewMax, widthAxis, brushR, hop, rSpeed, idleSec, accentOn, accent, ink, wRest, reduced]);

  const toLocal = (e) => {
    const root = rootRef.current;
    const r = root.getBoundingClientRect();
    const sc = r.width / (root.offsetWidth || r.width) || 1;
    return { x: (e.clientX - r.left) / sc, y: (e.clientY - r.top) / sc };
  };
  const onMove = (e) => {
    if (!rootRef.current) return;
    const L = toLocal(e);
    const P = ptr.current;
    const now = performance.now();
    if (P.on) {
      const dtm = Math.max(4, now - P.t);
      const k = 16.67 / dtm;
      P.vx = P.vx * 0.3 + (L.x - P.x) * k * 0.7;
      P.vy = P.vy * 0.3 + (L.y - P.y) * k * 0.7;
    }
    P.x = L.x; P.y = L.y; P.t = now; P.on = true; P.moved = true;
    lastUser.current = now;
  };
  const onLeave = () => { const P = ptr.current; P.on = false; P.vx = 0; P.vy = 0; };
  const fire = (x) => {
    ripples.current.push({ x, t0: performance.now(), amp: 1.1, hit: new Set() });
    rippleCount.current++;
    lastUser.current = performance.now();
  };
  const onClick = (e) => { if (!rootRef.current) return; fire(toLocal(e).x); };
  const onKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fire(-40); }
  };

  const mono = '"JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace';
  const sans = '"Archivo", "Inter", -apple-system, "Helvetica Neue", Arial, sans-serif';
  const p = uid;
  const label = { fontFamily: mono, fontSize: compact ? 10 : 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: muted };
  let gi = 0;

  return (
    <section
      ref={rootRef}
      className={`elastic-headline ${p}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onClick={onClick}
      style={{ position: 'relative', width: '100%', height: H, overflow: 'hidden', background: bg, color: ink, fontFamily: sans, cursor: 'pointer', touchAction: 'pan-y', userSelect: 'none', WebkitUserSelect: 'none' }}
    >
      <style>{`
        @keyframes ${p}-in { from { opacity: 0; transform: translateY(0.3em) scale(1.25, 0.7); } 60% { transform: translateY(-0.04em) scale(0.92, 1.1); } to { opacity: 1; transform: none; } }
        .${p} .${p}-h:focus-visible { outline: 1px solid ${accent}; outline-offset: 12px; }
        @media (prefers-reduced-motion: reduce) { .${p} * { animation: none !important; transition: none !important; } }
      `}</style>

      <div style={{ position: 'absolute', top: pad, left: pad, right: pad, display: 'flex', justifyContent: 'space-between', gap: 20, pointerEvents: 'none', ...label }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 6, height: 6, background: accent, borderRadius: '50%', flexShrink: 0 }} />{eyebrow}
        </span>
        {!compact && <span>{sideLabel}</span>}
      </div>

      <div style={{ position: 'absolute', left: pad, right: pad, top: topZone, bottom: bottomZone, display: 'flex', alignItems: 'center', justifyContent: align === 'center' ? 'center' : 'flex-start' }}>
        <h2
          className={`${p}-h`}
          tabIndex={0}
          role="button"
          aria-label={`${lines.join(' ')} — press Enter to send a ripple`}
          onKeyDown={onKey}
          style={{ margin: 0, fontWeight: 'normal', fontSize: fontPx, lineHeight: lh, letterSpacing: `${tracking}em`, textAlign: align, outline: 'none' }}
        >
          {lines.map((ln, li) => (
            <span key={li} aria-hidden="true" style={{ display: 'block', position: 'relative', whiteSpace: 'nowrap' }}>
              {li === 0 && <span ref={probeRef} style={{ display: 'inline-block', width: 0, height: 0, verticalAlign: 'baseline' }} />}
              {showBaselines && (
                <span style={{ position: 'absolute', left: align === 'center' ? -2000 : -pad, right: -2000, top: base || '0.78em', height: 1, background: rule }} />
              )}
              {Array.from(ln).map((ch, ci) => {
                const i = gi++;
                return (
                  <span key={ci} ref={(el) => { wrapRefs.current[i] = el; }} style={{ display: 'inline-block', position: 'relative', whiteSpace: 'pre' }}>
                    <span style={{ display: 'inline-block', animation: reduced ? 'none' : `${p}-in 900ms cubic-bezier(.22,1,.36,1) ${i * 32}ms both`, transformOrigin: `50% ${base ? base + 'px' : '80%'}` }}>
                      <span
                        ref={(el) => { glyphRefs.current[i] = el; }}
                        style={{ display: 'inline-block', transformOrigin: `50% ${base ? base + 'px' : '80%'}`, willChange: 'transform', transition: 'color .22s', fontVariationSettings: `'wght' ${wRest}, 'wdth' 100` }}
                      >{ch}</span>
                    </span>
                  </span>
                );
              })}
            </span>
          ))}
        </h2>
      </div>

      <div style={{ position: 'absolute', left: pad, right: pad, bottom: pad, display: 'flex', flexDirection: compact ? 'column' : 'row', alignItems: compact ? 'flex-start' : 'flex-end', justifyContent: 'space-between', gap: compact ? 16 : 24, pointerEvents: 'none' }}>
        <span style={{ ...label, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', border: `1px solid ${accent}`, position: 'relative', flexShrink: 0 }}>
            <span style={{ position: 'absolute', inset: 2.5, borderRadius: '50%', background: accent }} />
          </span>
          {hint}
        </span>
        {showReadout && (
          <div aria-hidden="true" style={{ ...label, display: 'grid', gridTemplateColumns: 'auto auto auto', gap: compact ? 20 : 34 }}>
            <div style={{ display: 'grid', gap: 6 }}>
              <span style={{ opacity: 0.8 }}>Active</span>
              <span ref={(el) => { ro.current.act = el; }} style={{ color: ink }}>— —</span>
            </div>
            <div style={{ display: 'grid', gap: 6 }}>
              <span style={{ opacity: 0.8 }}>Ripples</span>
              <span ref={(el) => { ro.current.rip = el; }} style={{ color: accent }}>00</span>
            </div>
            <div style={{ display: 'grid', gap: 6, minWidth: compact ? 110 : 150 }}>
              <span style={{ opacity: 0.8 }}>Velocity px/ms</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span ref={(el) => { ro.current.vel = el; }} style={{ color: ink, fontVariantNumeric: 'tabular-nums' }}>0.00</span>
                <span style={{ flex: 1, height: 1, background: rule, position: 'relative', display: 'block' }}>
                  <span ref={(el) => { ro.current.bar = el; }} style={{ position: 'absolute', left: 0, top: -1, height: 3, width: '100%', background: ink, transformOrigin: 'left', transform: 'scaleX(0)', display: 'block' }} />
                </span>
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

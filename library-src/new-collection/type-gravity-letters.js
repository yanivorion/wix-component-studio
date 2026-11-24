const MANIFEST = {
  "type": "Type.GravityLetters",
  "description": "A headline whose letters are physical bodies: after a short beat they drop under a lightweight 2D physics sim, tumble and pile on the floor, can be grabbed and thrown, and spring back into the readable headline on Reassemble",
  "editorElement": {
    "selector": ".gravity-letters",
    "displayName": "Gravity Letters",
    "archetype": "container",
    "data": {
      "text": { "dataType": "text", "displayName": "Headline (use / for line breaks)", "defaultValue": "Things / fall apart", "group": "Content" },
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Exhibit 09 — Gravity", "group": "Content" },
      "caption": { "dataType": "text", "displayName": "Caption", "defaultValue": "Grab a letter and throw it", "group": "Content" },
      "dropLabel": { "dataType": "text", "displayName": "Drop Button Label", "defaultValue": "Drop", "group": "Content" },
      "resetLabel": { "dataType": "text", "displayName": "Reset Button Label", "defaultValue": "Reassemble", "group": "Content" },
      "fontFamily": { "dataType": "select", "displayName": "Font", "defaultValue": "Inter", "options": ["Inter", "Fraunces", "Instrument Serif", "system-ui"], "group": "Typography" },
      "fontWeight": { "dataType": "select", "displayName": "Weight", "defaultValue": "500", "options": ["300", "400", "500"], "group": "Typography" },
      "sizeScale": { "dataType": "select", "displayName": "Headline Scale", "defaultValue": "1", "options": ["0.8", "0.9", "1", "1.1"], "group": "Typography" },
      "tracking": { "dataType": "select", "displayName": "Tracking (em)", "defaultValue": "-0.04", "options": ["-0.06", "-0.04", "-0.02", "0"], "group": "Typography" },
      "dropMode": { "dataType": "select", "displayName": "Drop Trigger", "defaultValue": "auto", "options": ["auto", "every-entry", "manual"], "group": "Animation" },
      "dropDelay": { "dataType": "select", "displayName": "Drop Delay (s)", "defaultValue": "1.6", "options": ["0.8", "1.6", "2.5", "4"], "group": "Animation" },
      "gravity": { "dataType": "select", "displayName": "Gravity", "defaultValue": "earth", "options": ["moon", "earth", "heavy"], "group": "Physics" },
      "bounce": { "dataType": "select", "displayName": "Bounce", "defaultValue": "0.28", "options": ["0.1", "0.28", "0.45", "0.6"], "group": "Physics" },
      "friction": { "dataType": "select", "displayName": "Friction", "defaultValue": "0.45", "options": ["0.2", "0.45", "0.7"], "group": "Physics" },
      "spin": { "dataType": "select", "displayName": "Tumble", "defaultValue": "medium", "options": ["none", "low", "medium", "high"], "group": "Physics" },
      "throwStrength": { "dataType": "select", "displayName": "Throw Strength", "defaultValue": "1", "options": ["0.6", "1", "1.5"], "group": "Physics" },
      "reassembleStagger": { "dataType": "select", "displayName": "Reassemble Stagger (ms)", "defaultValue": "45", "options": ["0", "25", "45", "80"], "group": "Animation" },
      "showFloor": { "dataType": "booleanValue", "displayName": "Floor Line", "defaultValue": "true", "group": "Layout" },
      "showRuler": { "dataType": "booleanValue", "displayName": "Floor Ruler", "defaultValue": "true", "group": "Layout" },
      "showButton": { "dataType": "booleanValue", "displayName": "Drop / Reset Button", "defaultValue": "true", "group": "Layout" },
      "height": { "dataType": "select", "displayName": "Height", "defaultValue": "screen", "options": ["screen", "520", "640", "760"], "group": "Layout" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#F5F5F4", "group": "Colors" },
      "inkColor": { "dataType": "color", "displayName": "Letters", "defaultValue": "#1C1917", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#78716C", "group": "Colors" },
      "ruleColor": { "dataType": "color", "displayName": "Floor & Rules", "defaultValue": "#A8A29E", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent (grabbed)", "defaultValue": "#C2410C", "group": "Colors" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const text = config?.text || 'Things / fall apart';
  const eyebrow = config?.eyebrow || 'Exhibit 09 — Gravity';
  const caption = config?.caption || 'Grab a letter and throw it';
  const dropLabel = config?.dropLabel || 'Drop';
  const resetLabel = config?.resetLabel || 'Reassemble';
  const fontFamily = config?.fontFamily || 'Inter';
  const fontWeight = config?.fontWeight || '500';
  const sizeScale = parseFloat(config?.sizeScale || '1') || 1;
  const tracking = parseFloat(config?.tracking || '-0.04') || 0;
  const dropMode = config?.dropMode || 'auto';
  const dropDelay = (parseFloat(config?.dropDelay || '1.6') || 1.6) * 1000;
  const G = { moon: 900, earth: 2600, heavy: 4200 }[config?.gravity || 'earth'] || 2600;
  const restitution = parseFloat(config?.bounce || '0.28');
  const mu = parseFloat(config?.friction || '0.45');
  const spinK = { none: 0, low: 0.5, medium: 1, high: 1.8 }[config?.spin || 'medium'] ?? 1;
  const throwK = parseFloat(config?.throwStrength || '1') || 1;
  const stagger = parseFloat(config?.reassembleStagger || '45') || 0;
  const showFloor = bool(config?.showFloor, true);
  const showRuler = bool(config?.showRuler, true);
  const showButton = bool(config?.showButton, true);
  const heightMode = config?.height || 'screen';
  const bg = config?.backgroundColor || '#F5F5F4';
  const ink = config?.inkColor || '#1C1917';
  const muted = config?.mutedColor || '#78716C';
  const rule = config?.ruleColor || '#A8A29E';
  const accent = config?.accentColor || '#C2410C';

  const uid = React.useMemo(() => 'gl' + Math.random().toString(36).slice(2, 9), []);
  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  const rootRef = React.useRef(null);
  const svgRef = React.useRef(null);
  const gRefs = React.useRef([]);
  const bodies = React.useRef([]);
  const modeRef = React.useRef('assembled');
  const sim = React.useRef({ raf: 0, visible: true, still: 0, last: 0, grab: null, t0: 0 });
  const fns = React.useRef({});
  const [width, setWidth] = React.useState(1280);
  const [stageH, setStageH] = React.useState(760);
  const [mode, setMode] = React.useState('assembled');
  const [fontTick, setFontTick] = React.useState(0);
  const [grabbed, setGrabbed] = React.useState(-1);

  const stack = fontFamily === 'system-ui' ? 'system-ui, -apple-system, sans-serif'
    : fontFamily === 'Inter' ? '"Inter", -apple-system, "Helvetica Neue", Arial, sans-serif'
    : `"${fontFamily}", "Iowan Old Style", Georgia, serif`;
  const mono = '"IBM Plex Mono", ui-monospace, "SF Mono", Menlo, monospace';

  React.useEffect(() => {
    const fams = { 'Inter': 'Inter:wght@300;400;500', 'Fraunces': 'Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500', 'Instrument Serif': 'Instrument+Serif' };
    [fams[fontFamily], 'IBM+Plex+Mono:wght@400'].filter(Boolean).forEach((f) => {
      const id = 'gf-' + f.replace(/[^a-z0-9]/gi, '').slice(0, 40);
      if (document.getElementById(id)) return;
      const l = document.createElement('link');
      l.id = id; l.rel = 'stylesheet';
      l.href = `https://fonts.googleapis.com/css2?family=${f}&display=swap`;
      document.head.appendChild(l);
    });
    let alive = true;
    const fam = fontFamily === 'system-ui' ? null : fontFamily;
    if (fam && document.fonts && document.fonts.load) {
      document.fonts.load(`${fontWeight} 120px "${fam}"`).then((r) => { if (alive && r && r.length) setFontTick((t) => t + 1); }).catch(() => {});
    }
    return () => { alive = false; };
  }, [fontFamily, fontWeight]);

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
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (ro) ro.observe(el);
    window.addEventListener('resize', measure);
    return () => { if (ro) ro.disconnect(); window.removeEventListener('resize', measure); };
  }, []);

  const compact = width < 760;
  const H = heightMode === 'screen' ? Math.max(compact ? 600 : 520, Math.min(stageH, 960)) : parseInt(heightMode, 10) || 640;
  const floorY = H - (compact ? 84 : 96);

  const layout = React.useMemo(() => {
    const base = String(text).split(/\s*(?:\/|\n)\s*/).filter(Boolean);
    const lines = compact ? base.flatMap((l) => l.split(/\s+/)).filter(Boolean) : base;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const ref = 100;
    ctx.font = `${fontWeight} ${ref}px ${stack}`;
    const lineEm = lines.map((ln) => Array.from(ln).reduce((a, c) => a + ctx.measureText(c).width / ref + tracking, -tracking));
    const lh = 0.98;
    const fs = Math.max(28, Math.min(
      (width * (compact ? 0.9 : 0.84)) / Math.max(...lineEm, 1),
      ((floorY - (compact ? 150 : 170)) / (lines.length * lh))
    ) * sizeScale);
    ctx.font = `${fontWeight} ${fs}px ${stack}`;
    const capH = ctx.measureText('H').actualBoundingBoxAscent || fs * 0.72;
    const blockH = (lines.length - 1) * fs * lh + capH;
    const top = Math.max(compact ? 120 : 110, (floorY - blockH) / 2 + (compact ? 10 : 0));
    const items = [];
    lines.forEach((ln, li) => {
      const chars = Array.from(ln);
      const total = lineEm[li] * fs;
      let x = (width - total) / 2;
      const base = top + capH + li * fs * lh;
      chars.forEach((c) => {
        const mm = ctx.measureText(c);
        const adv = mm.width;
        if (c.trim()) {
          const l = -(mm.actualBoundingBoxLeft || 0);
          const r = mm.actualBoundingBoxRight || adv;
          const t = -(mm.actualBoundingBoxAscent || capH);
          const b = mm.actualBoundingBoxDescent || 0;
          const hw = Math.max(4, (r - l) / 2);
          const hh = Math.max(4, (b - t) / 2);
          const ox = (l + r) / 2; const oy = (t + b) / 2;
          items.push({ ch: c, hw, hh, ox, oy, homeX: x + ox, homeY: base + oy, line: li });
        }
        x += adv + tracking * fs;
      });
    });
    return { items, fs, lines };
  }, [text, fontWeight, stack, tracking, width, compact, floorY, sizeScale, fontTick]); // eslint-disable-line react-hooks/exhaustive-deps

  const writeAll = React.useCallback(() => {
    const B = bodies.current;
    for (let i = 0; i < B.length; i++) {
      const g = gRefs.current[i];
      const b = B[i];
      if (g) g.setAttribute('transform', `translate(${b.x.toFixed(2)} ${b.y.toFixed(2)}) rotate(${(b.a * 57.2958).toFixed(2)}) translate(${(-b.ox).toFixed(2)} ${(-b.oy).toFixed(2)})`);
    }
  }, []);

  const step = React.useCallback((dt) => {
    const B = bodies.current;
    const W = width;
    const mode = modeRef.current;
    const now = performance.now();
    if (mode === 'assembling') {
      let done = true;
      const k = 140; const c = 2 * Math.sqrt(k) * 0.72;
      for (let i = 0; i < B.length; i++) {
        const b = B[i];
        if (now - sim.current.t0 < i * stagger) { done = false; continue; }
        let da = b.a % (Math.PI * 2);
        if (da > Math.PI) da -= Math.PI * 2;
        if (da < -Math.PI) da += Math.PI * 2;
        b.a = da;
        b.vx += ((b.homeX - b.x) * k - b.vx * c) * dt;
        b.vy += ((b.homeY - b.y) * k - b.vy * c) * dt;
        b.va += ((0 - b.a) * k - b.va * c) * dt;
        b.x += b.vx * dt; b.y += b.vy * dt; b.a += b.va * dt;
        if (Math.abs(b.homeX - b.x) > 0.4 || Math.abs(b.homeY - b.y) > 0.4 || Math.abs(b.vx) + Math.abs(b.vy) > 6 || Math.abs(b.a) > 0.003) done = false;
      }
      return done ? 'assembled' : null;
    }
    const grab = sim.current.grab;
    for (let i = 0; i < B.length; i++) {
      const b = B[i];
      b.support = false;
      if (grab && grab.i === i) {
        b.vx = (grab.x - b.x) * 22; b.vy = (grab.y - b.y) * 22;
        b.va *= 0.92;
      } else {
        b.vy += G * dt;
        b.vx *= 1 - 0.08 * dt;
        b.va *= 1 - 0.6 * dt;
      }
      b.x += b.vx * dt; b.y += b.vy * dt; b.a += b.va * dt;
    }
    const ext = (b) => {
      const c = Math.abs(Math.cos(b.a)); const s = Math.abs(Math.sin(b.a));
      return [b.hw * c + b.hh * s, b.hw * s + b.hh * c];
    };
    for (let it = 0; it < 3; it++) {
      for (let i = 0; i < B.length; i++) {
        const A = B[i]; const ea = ext(A);
        const imA = grab && grab.i === i ? 0 : A.im;
        for (let j = i + 1; j < B.length; j++) {
          const C = B[j]; const ec = ext(C);
          const dx = C.x - A.x; const dy = C.y - A.y;
          const px = ea[0] + ec[0] - Math.abs(dx);
          if (px <= 0) continue;
          const py = ea[1] + ec[1] - Math.abs(dy);
          if (py <= 0) continue;
          const imC = grab && grab.i === j ? 0 : C.im;
          const sum = imA + imC;
          if (sum <= 0) continue;
          let nx = 0; let ny = 0; let pen;
          if (px < py) { nx = dx < 0 ? -1 : 1; pen = px; } else { ny = dy < 0 ? -1 : 1; pen = py; }
          const corr = Math.max(0, pen - 0.2) * 0.8 / sum;
          A.x -= nx * corr * imA; A.y -= ny * corr * imA;
          C.x += nx * corr * imC; C.y += ny * corr * imC;
          if (ny !== 0) { if (ny > 0) A.support = true; else C.support = true; }
          const rvx = C.vx - A.vx; const rvy = C.vy - A.vy;
          const vn = rvx * nx + rvy * ny;
          if (vn < 0) {
            const e = Math.abs(vn) < 60 ? 0 : restitution;
            const jn = (-(1 + e) * vn) / sum;
            A.vx -= jn * nx * imA; A.vy -= jn * ny * imA;
            C.vx += jn * nx * imC; C.vy += jn * ny * imC;
            const tx = -ny; const ty = nx;
            const vt = rvx * tx + rvy * ty;
            const jt = Math.max(-mu * jn, Math.min(mu * jn, -vt / sum));
            A.vx -= jt * tx * imA; A.vy -= jt * ty * imA;
            C.vx += jt * tx * imC; C.vy += jt * ty * imC;
            if (spinK) {
              A.va += vt * 0.0035 * spinK * imA / (A.im || 1);
              C.va -= vt * 0.0035 * spinK * imC / (C.im || 1);
            }
          }
        }
      }
    }
    let energy = 0;
    for (let i = 0; i < B.length; i++) {
      const b = B[i];
      const [ex, ey] = ext(b);
      const isGrab = grab && grab.i === i;
      if (b.y + ey > floorY) {
        b.y = floorY - ey;
        if (b.vy > 0) b.vy = b.vy < 90 ? 0 : -b.vy * restitution;
        b.vx *= 1 - Math.min(1, mu * 9 * dt);
        if (spinK) b.va += b.vx * 0.0005 * spinK;
        b.support = true;
      }
      if (b.x - ex < 0) { b.x = ex; if (b.vx < 0) b.vx = -b.vx * restitution; }
      if (b.x + ex > W) { b.x = W - ex; if (b.vx > 0) b.vx = -b.vx * restitution; }
      if (b.y - ey < -H) { b.y = -H + ey; if (b.vy < 0) b.vy = 0; }
      if (b.support && !isGrab) {
        const q = Math.PI / 2;
        const target = Math.round(b.a / q) * q;
        b.va += (target - b.a) * 38 * dt * 60 * dt * 60;
        b.va *= 0.86;
        b.vx *= 1 - Math.min(1, mu * 2 * dt);
      }
      if (b.va > 7) b.va = 7; else if (b.va < -7) b.va = -7;
      energy += Math.abs(b.vx) + Math.abs(b.vy) + Math.abs(b.va) * 40;
    }
    return energy;
  }, [width, H, floorY, G, restitution, mu, spinK, stagger]);

  const loop = React.useCallback((now) => {
    const S = sim.current;
    if (!S.visible) { S.raf = 0; return; }
    const sub = 6;
    const dt = 1 / 60 / sub;
    let res = null;
    for (let s = 0; s < sub; s++) res = step(dt);
    writeAll();
    if (modeRef.current === 'assembling') {
      if (res === 'assembled') {
        bodies.current.forEach((b) => { b.x = b.homeX; b.y = b.homeY; b.a = 0; b.vx = b.vy = b.va = 0; });
        writeAll();
        modeRef.current = 'assembled'; setMode('assembled');
        S.raf = 0; return;
      }
    } else if (modeRef.current === 'physics') {
      S.still = res / Math.max(1, bodies.current.length) < 3 && !S.grab ? S.still + 1 : 0;
      if (S.still > 50) { S.raf = 0; return; }
    } else { S.raf = 0; return; }
    S.raf = requestAnimationFrame(loop);
  }, [step, writeAll]);

  const kick = React.useCallback(() => {
    const S = sim.current;
    S.still = 0;
    if (!S.raf && S.visible) S.raf = requestAnimationFrame(loop);
  }, [loop]);

  const drop = React.useCallback(() => {
    if (!bodies.current.length) return;
    bodies.current.forEach((b, i) => {
      const r1 = Math.sin(i * 12.9898 + 1.7); const r2 = Math.sin(i * 78.233 + 0.3);
      const spread = (b.homeX / Math.max(1, width) - 0.5) * 2;
      b.vx = spread * 220 + r1 * 120;
      b.vy = -180 - Math.abs(r2) * 260;
      b.va = spinK ? r2 * 1.1 * spinK : 0;
    });
    modeRef.current = 'physics'; setMode('physics');
    kick();
  }, [kick, spinK, width]);

  const reassemble = React.useCallback(() => {
    sim.current.t0 = performance.now();
    sim.current.grab = null;
    setGrabbed(-1);
    modeRef.current = 'assembling'; setMode('assembling');
    kick();
  }, [kick]);

  React.useEffect(() => {
    const wasLoose = modeRef.current !== 'assembled' && bodies.current.length > 0;
    bodies.current = layout.items.map((it) => ({
      ...it, x: it.homeX, y: it.homeY, a: 0, vx: 0, vy: 0, va: 0,
      im: 1 / Math.max(1, (it.hw * it.hh * 4) / 1000), support: false
    }));
    sim.current.grab = null;
    writeAll();
    if (modeRef.current !== 'assembled') { modeRef.current = 'assembled'; setMode('assembled'); }
    if (!wasLoose || reduced) return undefined;
    const t = setTimeout(() => { if (modeRef.current === 'assembled') fns.current.drop(); }, 450);
    return () => clearTimeout(t);
  }, [layout, writeAll, reduced]);

  fns.current = { drop, kick, writeAll };

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const { kick, drop, writeAll } = { kick: () => fns.current.kick(), drop: () => fns.current.drop(), writeAll: () => fns.current.writeAll() };
    let timer = 0;
    let fired = false;
    const io = typeof IntersectionObserver !== 'undefined' ? new IntersectionObserver(([en]) => {
      const S = sim.current;
      S.visible = en.isIntersecting;
      if (S.visible) {
        if (modeRef.current !== 'assembled') kick();
        if (!reduced && dropMode !== 'manual' && (!fired || dropMode === 'every-entry')) {
          clearTimeout(timer);
          timer = setTimeout(() => {
            fired = true;
            if (modeRef.current === 'assembled') drop();
          }, dropDelay);
        }
      } else {
        clearTimeout(timer);
        if (dropMode === 'every-entry' && fired && modeRef.current !== 'assembled') {
          bodies.current.forEach((b) => { b.x = b.homeX; b.y = b.homeY; b.a = 0; b.vx = b.vy = b.va = 0; });
          writeAll();
          modeRef.current = 'assembled'; setMode('assembled');
        }
      }
    }, { threshold: 0.35 }) : null;
    if (io) io.observe(root);
    return () => { if (io) io.disconnect(); clearTimeout(timer); cancelAnimationFrame(sim.current.raf); sim.current.raf = 0; };
  }, [dropMode, dropDelay, reduced]);

  const local = (e) => {
    const svg = svgRef.current;
    const r = svg.getBoundingClientRect();
    const sx = r.width / (svg.clientWidth || r.width) || 1;
    return { x: (e.clientX - r.left) / sx, y: (e.clientY - r.top) / sx };
  };
  const hit = (pt) => {
    const B = bodies.current;
    for (let i = B.length - 1; i >= 0; i--) {
      const b = B[i];
      const dx = pt.x - b.x; const dy = pt.y - b.y;
      const c = Math.cos(-b.a); const s = Math.sin(-b.a);
      const lx = dx * c - dy * s; const ly = dx * s + dy * c;
      if (Math.abs(lx) < b.hw + 10 && Math.abs(ly) < b.hh + 10) return i;
    }
    return -1;
  };
  const onDown = (e) => {
    if (!svgRef.current) return;
    const pt = local(e);
    const i = hit(pt);
    if (i < 0) return;
    e.preventDefault();
    try { svgRef.current.setPointerCapture(e.pointerId); } catch (err) { /* noop */ }
    if (modeRef.current !== 'physics') { modeRef.current = 'physics'; setMode('physics'); }
    sim.current.grab = { i, x: pt.x, y: pt.y, hist: [{ ...pt, t: performance.now() }] };
    setGrabbed(i);
    kick();
  };
  const onMove = (e) => {
    const g = sim.current.grab;
    if (!g || !svgRef.current) return;
    const pt = local(e);
    g.x = pt.x; g.y = pt.y;
    g.hist.push({ ...pt, t: performance.now() });
    if (g.hist.length > 6) g.hist.shift();
    kick();
  };
  const onUp = () => {
    const g = sim.current.grab;
    if (!g) return;
    const b = bodies.current[g.i];
    const h = g.hist;
    if (b && h.length > 1) {
      const a = h[0]; const z = h[h.length - 1];
      const dt = Math.max(16, z.t - a.t) / 1000;
      b.vx = ((z.x - a.x) / dt) * throwK;
      b.vy = ((z.y - a.y) / dt) * throwK;
      b.va += spinK ? ((z.x - a.x) / dt) * 0.004 * spinK : 0;
    }
    sim.current.grab = null;
    setGrabbed(-1);
    kick();
  };

  const onButton = () => { if (mode === 'assembled') drop(); else reassemble(); };
  const btnLabel = mode === 'assembled' ? dropLabel : resetLabel;
  const pad = compact ? 20 : 56;
  const p = uid;
  const ticks = [];
  if (showRuler) for (let x = 0; x <= width; x += compact ? 20 : 24) ticks.push(x);

  return (
    <section ref={rootRef} className={`gravity-letters ${p}`} aria-label={layout.lines.join(' ')}
      style={{ position: 'relative', width: '100%', height: H, overflow: 'hidden', background: bg, color: ink, userSelect: 'none', WebkitUserSelect: 'none' }}>
      <style>{`
        @keyframes ${p}-rise { from { opacity: 0; transform: translateY(0.35em); } to { opacity: 1; transform: none; } }
        .${p} .${p}-btn { transition: background .25s, color .25s, border-color .25s; }
        .${p} .${p}-btn:hover { background: ${ink}; color: ${bg}; }
        .${p} .${p}-btn:focus-visible { outline: 2px solid ${accent}; outline-offset: 3px; }
        @media (prefers-reduced-motion: reduce) { .${p} * { animation: none !important; transition: none !important; } }
      `}</style>

      <div style={{ position: 'absolute', top: pad, left: pad, right: pad, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, zIndex: 2, pointerEvents: 'none' }}>
        <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: muted, lineHeight: 1.7 }}>
          <div>{eyebrow}</div>
          {!compact && <div style={{ opacity: 0.75 }}>g = {(G / 265).toFixed(2)} m/s² · e = {restitution.toFixed(2)} · μ = {mu.toFixed(2)}</div>}
        </div>
        {showButton && (
          <button type="button" className={`${p}-btn`} onClick={onButton} aria-label={btnLabel}
            style={{ pointerEvents: 'auto', appearance: 'none', border: `1px solid ${ink}`, background: 'transparent', color: ink, borderRadius: 999, padding: compact ? '10px 16px' : '12px 22px', fontFamily: mono, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
              {mode === 'assembled'
                ? <path d="M6 1 V10 M2 6.5 L6 10.5 L10 6.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
                : <path d="M2 6 A4 4 0 1 0 4 2.5 M2 1 V4 H5" fill="none" stroke="currentColor" strokeWidth="1.2" />}
            </svg>
            {btnLabel}
          </button>
        )}
      </div>

      <svg ref={svgRef} width="100%" height={H} role="img" aria-label={`${layout.lines.join(' ')} — letters you can drag and throw`}
        onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}
        style={{ position: 'absolute', inset: 0, display: 'block', touchAction: grabbed >= 0 ? 'none' : 'pan-y', cursor: grabbed >= 0 ? 'grabbing' : 'grab' }}>
        {showFloor && (
          <g aria-hidden="true">
            <line x1="0" x2={width} y1={floorY + 0.5} y2={floorY + 0.5} stroke={rule} strokeWidth="1" />
            {ticks.map((x, i) => (
              <line key={i} x1={x + 0.5} x2={x + 0.5} y1={floorY} y2={floorY + (i % 5 === 0 ? 12 : 6)} stroke={rule} strokeWidth="1" opacity={i % 5 === 0 ? 0.9 : 0.55} />
            ))}
          </g>
        )}
        {layout.items.map((it, i) => (
          <g key={i} ref={(el) => { gRefs.current[i] = el; }}
            transform={`translate(${it.homeX} ${it.homeY}) translate(${-it.ox} ${-it.oy})`}>
            <text x="0" y="0" fill={grabbed === i ? accent : ink}
              style={{ fontFamily: stack, fontWeight, fontSize: layout.fs, letterSpacing: 0, fontKerning: 'none', transition: 'fill .2s', animation: reduced ? 'none' : `${p}-rise .65s cubic-bezier(.22,1,.36,1) ${60 + i * 24}ms both` }}>
              {it.ch}
            </text>
          </g>
        ))}
      </svg>

      <div style={{ position: 'absolute', left: pad, right: pad, bottom: compact ? 22 : 30, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, fontFamily: mono, fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: muted, pointerEvents: 'none' }}>
        <span>{caption}</span>
        <span aria-live="polite" style={{ display: compact ? 'none' : 'inline' }}>{String(layout.items.length).padStart(2, '0')} bodies · {mode === 'assembled' ? 'at rest' : mode === 'assembling' ? 'assembling' : 'free fall'}</span>
      </div>
    </section>
  );
}

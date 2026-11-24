const MANIFEST = {
  "type": "Gallery.CoverFlow",
  "description": "A refined, museum-lit cover flow: the centre image hangs flat and large while its neighbours turn away in depth over a soft floor reflection. Drag with momentum that snaps to each work, use the wheel or arrow keys; the title swaps through a vertical mask, and clicking the centre opens it full-bleed with a smooth scale-up",
  "editorElement": {
    "selector": ".cover-flow",
    "displayName": "Cover Flow",
    "archetype": "container",
    "data": {
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Gallery 3 — Light & Structure", "group": "Content" },
      "titles": { "dataType": "text", "displayName": "Titles (comma separated)", "defaultValue": "Atrium,Vertical Study,Ascent,Folded Plane,Blue Interior,Low Tide,Morning Rock,Signal,Cloud Sea", "group": "Content" },
      "captions": { "dataType": "text", "displayName": "Captions (separate with |)", "defaultValue": "Mara Lind — Archival pigment print, 2023|Jonas Ebert — Silver gelatin, 2019|Ines Calvo — C-type print, 2021|Ren Aoki — Pigment on cotton rag, 2022|Lea Moreau — Chromogenic print, 2020|Tomas Hale — Platinum print, 2018|Ada Okafor — Archival pigment print, 2024|Kit Larsen — Silver gelatin, 2017|Nora Weiss — Carbon print, 2022", "group": "Content" },
      "images": { "dataType": "text", "displayName": "Image URLs (comma separated)", "defaultValue": "https://picsum.photos/id/1033/1200/1500,https://picsum.photos/id/1031/1200/1500,https://picsum.photos/id/1048/1200/1500,https://picsum.photos/id/1076/1200/1500,https://picsum.photos/id/1068/1200/1500,https://picsum.photos/id/1055/1200/1500,https://picsum.photos/id/1049/1200/1500,https://picsum.photos/id/1081/1200/1500,https://picsum.photos/id/1064/1200/1500", "group": "Images" },
      "imageTreatment": { "dataType": "select", "displayName": "Image Treatment", "defaultValue": "none", "options": ["none", "muted", "grayscale"], "group": "Images" },
      "aspect": { "dataType": "select", "displayName": "Frame Aspect", "defaultValue": "portrait", "options": ["portrait", "square", "landscape"], "group": "Images" },
      "reflection": { "dataType": "booleanValue", "displayName": "Floor Reflection", "defaultValue": "true", "group": "Images" },
      "reflectionStrength": { "dataType": "select", "displayName": "Reflection Strength", "defaultValue": "0.22", "options": ["0.12", "0.22", "0.32"], "group": "Images" },
      "startIndex": { "dataType": "select", "displayName": "Start At", "defaultValue": "5", "options": ["1", "2", "3", "4", "5", "6", "7", "8", "9"], "group": "Interaction" },
      "wheel": { "dataType": "booleanValue", "displayName": "Wheel Navigation", "defaultValue": "true", "group": "Interaction" },
      "fullView": { "dataType": "booleanValue", "displayName": "Open Full-Bleed On Click", "defaultValue": "true", "group": "Interaction" },
      "snapFeel": { "dataType": "select", "displayName": "Snap Feel", "defaultValue": "balanced", "options": ["soft", "balanced", "snappy"], "group": "Animation" },
      "cardSize": { "dataType": "select", "displayName": "Card Size", "defaultValue": "medium", "options": ["small", "medium", "large"], "group": "Layout" },
      "angle": { "dataType": "select", "displayName": "Side Angle (deg)", "defaultValue": "62", "options": ["45", "55", "62", "70", "78"], "group": "Layout" },
      "depth": { "dataType": "select", "displayName": "Depth", "defaultValue": "medium", "options": ["shallow", "medium", "deep"], "group": "Layout" },
      "spacing": { "dataType": "select", "displayName": "Side Spacing", "defaultValue": "normal", "options": ["tight", "normal", "loose"], "group": "Layout" },
      "height": { "dataType": "select", "displayName": "Height", "defaultValue": "screen", "options": ["screen", "560", "680", "800"], "group": "Layout" },
      "radius": { "dataType": "select", "displayName": "Corner Radius (px)", "defaultValue": "2", "options": ["0", "2", "6", "12"], "group": "Layout" },
      "spotlight": { "dataType": "booleanValue", "displayName": "Museum Spotlight", "defaultValue": "true", "group": "Layout" },
      "backgroundColor": { "dataType": "color", "displayName": "Wall", "defaultValue": "#0D0D0E", "group": "Colors" },
      "floorColor": { "dataType": "color", "displayName": "Floor", "defaultValue": "#151413", "group": "Colors" },
      "lightColor": { "dataType": "color", "displayName": "Spotlight", "defaultValue": "#FFF6E8", "group": "Colors" },
      "textColor": { "dataType": "color", "displayName": "Text", "defaultValue": "#FAFAF9", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#A8A29E", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent (focus)", "defaultValue": "#FAFAF9", "group": "Colors" },
      "titleFont": { "dataType": "select", "displayName": "Title Font", "defaultValue": "Instrument Serif", "options": ["Instrument Serif", "Fraunces", "Inter Tight", "Inter"], "group": "Typography" },
      "titleSize": { "dataType": "select", "displayName": "Title Size (px)", "defaultValue": "44", "options": ["32", "38", "44", "52", "60"], "group": "Typography" },
      "titleWeight": { "dataType": "select", "displayName": "Title Weight", "defaultValue": "400", "options": ["300", "400", "500"], "group": "Typography" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const split = (s, sep = ',') => String(s || '').split(sep).map((x) => x.trim()).filter(Boolean);

  const eyebrow = config?.eyebrow ?? 'Gallery 3 — Light & Structure';
  const titles = split(config?.titles || 'Atrium,Vertical Study,Ascent,Folded Plane,Blue Interior,Low Tide,Morning Rock,Signal,Cloud Sea');
  const captions = split(config?.captions || 'Mara Lind — Archival pigment print, 2023|Jonas Ebert — Silver gelatin, 2019|Ines Calvo — C-type print, 2021|Ren Aoki — Pigment on cotton rag, 2022|Lea Moreau — Chromogenic print, 2020|Tomas Hale — Platinum print, 2018|Ada Okafor — Archival pigment print, 2024|Kit Larsen — Silver gelatin, 2017|Nora Weiss — Carbon print, 2022', '|');
  const images = split(config?.images || 'https://picsum.photos/id/1033/1200/1500,https://picsum.photos/id/1031/1200/1500,https://picsum.photos/id/1048/1200/1500,https://picsum.photos/id/1076/1200/1500,https://picsum.photos/id/1068/1200/1500,https://picsum.photos/id/1055/1200/1500,https://picsum.photos/id/1049/1200/1500,https://picsum.photos/id/1081/1200/1500,https://picsum.photos/id/1064/1200/1500');
  const treatment = config?.imageTreatment || 'none';
  const aspect = { portrait: 1.25, square: 1, landscape: 0.72 }[config?.aspect || 'portrait'] || 1.25;
  const reflection = bool(config?.reflection, true);
  const reflA = parseFloat(config?.reflectionStrength || '0.22') || 0.22;
  const startIndex = Math.max(0, (parseInt(config?.startIndex || '5', 10) || 5) - 1);
  const wheelOn = bool(config?.wheel, true);
  const fullViewOn = bool(config?.fullView, true);
  const spring = { soft: [70, 15], balanced: [120, 21], snappy: [220, 29] }[config?.snapFeel || 'balanced'] || [120, 21];
  const sizeK = { small: 0.82, medium: 1, large: 1.18 }[config?.cardSize || 'medium'] || 1;
  const A = parseFloat(config?.angle || '62') || 62;
  const depthK = { shallow: 0.6, medium: 1, deep: 1.5 }[config?.depth || 'medium'] || 1;
  const spaceK = { tight: 0.8, normal: 1, loose: 1.25 }[config?.spacing || 'normal'] || 1;
  const heightMode = config?.height || 'screen';
  const radius = parseInt(config?.radius ?? '2', 10) || 0;
  const spotlight = bool(config?.spotlight, true);
  const bg = config?.backgroundColor || '#0D0D0E';
  const floor = config?.floorColor || '#151413';
  const light = config?.lightColor || '#FFF6E8';
  const text = config?.textColor || '#FAFAF9';
  const muted = config?.mutedColor || '#A8A29E';
  const accent = config?.accentColor || '#FAFAF9';
  const titleFont = config?.titleFont || 'Instrument Serif';
  const titleSize = parseInt(config?.titleSize || '44', 10) || 44;
  const titleWeight = config?.titleWeight || '400';

  const N = images.length;
  const uid = React.useMemo(() => 'cf' + Math.random().toString(36).slice(2, 9), []);
  const reduced = React.useMemo(() => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const clampI = (i) => Math.max(0, Math.min(N - 1, i));

  const rootRef = React.useRef(null);
  const stageRef = React.useRef(null);
  const cardRefs = React.useRef([]);
  const shadeRefs = React.useRef([]);
  const fvOuter = React.useRef(null);
  const fvImg = React.useRef(null);
  const init = clampI(startIndex);
  const st = React.useRef({ pos: init, vel: 0, target: init, drag: null, raf: 0, last: 0, wheelAcc: 0, wheelT: 0, suppressClick: false });
  const [width, setWidth] = React.useState(1280);
  const [stageH, setStageH] = React.useState(760);
  const [index, setIndex] = React.useState(init);
  const [swap, setSwap] = React.useState({ cur: init, prev: -1, dir: 1, k: 0 });
  const [full, setFull] = React.useState(null);

  React.useEffect(() => {
    const families = { 'Instrument Serif': 'Instrument+Serif:ital@0;1', 'Fraunces': 'Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500', 'Inter Tight': 'Inter+Tight:wght@300;400;500' };
    [families[titleFont], 'Inter:wght@300;400;500'].filter(Boolean).forEach((f) => {
      const id = 'gf-' + f.replace(/[^a-z0-9]/gi, '').slice(0, 40);
      if (document.getElementById(id)) return;
      const l = document.createElement('link');
      l.id = id; l.rel = 'stylesheet';
      l.href = `https://fonts.googleapis.com/css2?family=${f}&display=swap`;
      document.head.appendChild(l);
    });
  }, [titleFont]);

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

  const compact = width < 700;
  const H = heightMode === 'screen' ? Math.max(compact ? 600 : 560, stageH) : parseInt(heightMode, 10) || 680;
  const cw = Math.round(Math.min(compact ? width * 0.62 : width * 0.25, (H * 0.44) / aspect) * sizeK);
  const ch = Math.round(cw * aspect);
  const cy = Math.round(H * (compact ? 0.44 : 0.43));
  const G1 = cw * (compact ? 0.62 : 0.74) * spaceK;
  const G2 = cw * (compact ? 0.2 : 0.27) * spaceK;
  const Z1 = cw * 0.62 * depthK;
  const Z2 = cw * 0.16 * depthK;
  const perItem = cw * 0.5;

  const geo = React.useRef({});
  geo.current = { G1, G2, Z1, Z2, A, perItem, N, spring, reflA };

  const layout = React.useCallback((pos) => {
    const g = geo.current;
    for (let i = 0; i < g.N; i++) {
      const el = cardRefs.current[i];
      if (!el) continue;
      const d = i - pos;
      const ad = Math.abs(d);
      const sg = d < 0 ? -1 : 1;
      const a1 = Math.min(1, ad);
      const a2 = Math.max(0, ad - 1);
      const eased = a1 * (2 - a1);
      const x = sg * (eased * g.G1 + a2 * g.G2);
      const z = -(eased * g.Z1 + a2 * g.Z2);
      const ry = sg * eased * g.A;
      const op = ad > 4.6 ? 0 : 1 - Math.max(0, Math.min(1, (ad - 3.4) / 1.2));
      el.style.transform = `translate3d(${x.toFixed(2)}px, 0, ${z.toFixed(2)}px) rotateY(${ry.toFixed(2)}deg)`;
      el.style.zIndex = String(1000 - Math.round(ad * 10));
      el.style.opacity = op.toFixed(3);
      el.style.visibility = op <= 0 ? 'hidden' : 'visible';
      const sh = shadeRefs.current[i];
      if (sh) {
        sh.style.opacity = Math.min(0.78, eased * 0.42 + a2 * 0.12).toFixed(3);
        sh.style.background = `linear-gradient(${sg > 0 ? 90 : 270}deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.85) 100%)`;
      }
    }
  }, []);

  const kick = React.useCallback(() => {
    const s = st.current;
    if (s.raf) return;
    s.last = 0;
    const tick = (t) => {
      const g = geo.current;
      const dt = s.last ? Math.min(0.034, (t - s.last) / 1000) : 0.016;
      s.last = t;
      if (!s.drag) {
        if (reduced) { s.pos = s.target; s.vel = 0; }
        else {
          const [k, c] = g.spring;
          const a = k * (s.target - s.pos) - c * s.vel;
          s.vel += a * dt;
          s.pos += s.vel * dt;
        }
      }
      layout(s.pos);
      const r = Math.max(0, Math.min(g.N - 1, Math.round(s.pos)));
      setIndex((p) => (p === r ? p : r));
      const settled = !s.drag && Math.abs(s.target - s.pos) < 0.0005 && Math.abs(s.vel) < 0.001;
      if (settled) { s.pos = s.target; s.vel = 0; layout(s.pos); s.raf = 0; return; }
      s.raf = requestAnimationFrame(tick);
    };
    s.raf = requestAnimationFrame(tick);
  }, [layout, reduced]);

  React.useEffect(() => { layout(st.current.pos); }, [layout, width, H, cw, A, depthK, spaceK, N]);
  React.useEffect(() => () => cancelAnimationFrame(st.current.raf), []);
  React.useEffect(() => {
    const s = st.current;
    const i = clampI(startIndex);
    s.target = i;
    kick();
  }, [startIndex, N]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    setSwap((sw) => (sw.cur === index ? sw : { cur: index, prev: sw.cur, dir: index > sw.cur ? 1 : -1, k: sw.k + 1 }));
  }, [index]);

  const go = React.useCallback((i) => {
    if (!N) return;
    const s = st.current;
    s.target = clampI(i);
    kick();
  }, [N, kick]); // eslint-disable-line react-hooks/exhaustive-deps

  const toLocalX = (e) => {
    const el = rootRef.current;
    const r = el.getBoundingClientRect();
    const k = r.width / (el.offsetWidth || r.width) || 1;
    return (e.clientX - r.left) / k;
  };

  const onPointerDown = (e) => {
    if (full) return;
    if (e.button !== undefined && e.button !== 0) return;
    const s = st.current;
    s.drag = { x0: toLocalX(e), p0: s.pos, id: e.pointerId, captured: false, samples: [{ x: toLocalX(e), t: performance.now() }], moved: 0 };
    s.suppressClick = false;
    s.vel = 0;
    kick();
  };
  const onPointerMove = (e) => {
    const s = st.current;
    const d = s.drag;
    if (!d) return;
    const x = toLocalX(e);
    const dx = x - d.x0;
    d.moved = Math.max(d.moved, Math.abs(dx));
    if (!d.captured && d.moved > 5) {
      d.captured = true;
      s.suppressClick = true;
      try { rootRef.current.setPointerCapture(d.id); } catch (err) { /* noop */ }
    }
    let p = d.p0 - dx / geo.current.perItem;
    const max = geo.current.N - 1;
    if (p < 0) p = -(1 - 1 / (1 + -p * 0.6));
    if (p > max) p = max + (1 - 1 / (1 + (p - max) * 0.6));
    s.pos = p;
    const now = performance.now();
    d.samples.push({ x, t: now });
    while (d.samples.length > 2 && now - d.samples[0].t > 100) d.samples.shift();
  };
  const onPointerUp = () => {
    const s = st.current;
    const d = s.drag;
    if (!d) return;
    s.drag = null;
    if (d.captured) {
      const a = d.samples[0]; const b = d.samples[d.samples.length - 1];
      const span = Math.max(30, b.t - a.t);
      const vItems = -((b.x - a.x) / span) * 1000 / geo.current.perItem;
      s.vel = Math.max(-12, Math.min(12, vItems));
      s.target = clampI(Math.round(s.pos + s.vel * 0.18));
    }
    kick();
  };

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el || !wheelOn) return undefined;
    const onWheel = (e) => {
      if (full) { e.preventDefault(); return; }
      const s = st.current;
      const horiz = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      const delta = horiz ? e.deltaX : e.deltaY;
      const dir = delta > 0 ? 1 : -1;
      if (!horiz && ((dir < 0 && s.target <= 0) || (dir > 0 && s.target >= geo.current.N - 1))) return;
      e.preventDefault();
      const now = performance.now();
      if (now - s.wheelT > 220) s.wheelAcc = 0;
      s.wheelT = now;
      s.wheelAcc += delta;
      if (Math.abs(s.wheelAcc) >= 42) {
        s.target = Math.max(0, Math.min(geo.current.N - 1, s.target + (s.wheelAcc > 0 ? 1 : -1)));
        s.wheelAcc = 0;
        kick();
      }
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [wheelOn, full, kick]);

  const ease = 'cubic-bezier(.7,0,.2,1)';
  const easeOut = 'cubic-bezier(.22,1,.36,1)';
  const fvDur = reduced ? 0 : 1050;
  const cardRect = { top: cy - ch / 2, left: width / 2 - cw / 2, w: cw, h: ch };
  const insetFrom = `inset(${cardRect.top.toFixed(1)}px ${(width - cardRect.left - cw).toFixed(1)}px ${(H - cardRect.top - ch).toFixed(1)}px ${cardRect.left.toFixed(1)}px round ${radius}px)`;
  const s0 = Math.max(cw / width, ch / H);
  const imgFrom = `translate(0px, ${(cy - H / 2).toFixed(1)}px) scale(${s0.toFixed(4)})`;

  const openFull = (i) => {
    if (!fullViewOn || full) return;
    setFull({ i, phase: 'opening' });
  };
  const closeFull = () => setFull((f) => (f && f.phase !== 'closing' ? { ...f, phase: 'closing' } : f));

  React.useLayoutEffect(() => {
    const o = fvOuter.current; const im = fvImg.current;
    if (!full || !o || !im) return undefined;
    if (full.phase === 'opening') {
      o.style.transition = 'none'; im.style.transition = 'none';
      o.style.clipPath = insetFrom; o.style.webkitClipPath = insetFrom;
      im.style.transform = imgFrom;
      void o.offsetWidth;
      o.style.transition = `clip-path ${fvDur}ms ${ease}, -webkit-clip-path ${fvDur}ms ${ease}`;
      im.style.transition = `transform ${fvDur}ms ${ease}`;
      o.style.clipPath = `inset(0px 0px 0px 0px round 0px)`; o.style.webkitClipPath = `inset(0px 0px 0px 0px round 0px)`;
      im.style.transform = 'translate(0px, 0px) scale(1)';
      const t = setTimeout(() => setFull((f) => (f && f.phase === 'opening' ? { ...f, phase: 'open' } : f)), fvDur);
      return () => clearTimeout(t);
    }
    if (full.phase === 'closing') {
      const d = Math.round(fvDur * 0.85);
      o.style.transition = `clip-path ${d}ms ${ease}, -webkit-clip-path ${d}ms ${ease}`;
      im.style.transition = `transform ${d}ms ${ease}`;
      o.style.clipPath = insetFrom; o.style.webkitClipPath = insetFrom;
      im.style.transform = imgFrom;
      const t = setTimeout(() => setFull(null), d + 30);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [full && full.phase]); // eslint-disable-line react-hooks/exhaustive-deps

  const reopenFull = () => {
    const o = fvOuter.current; const im = fvImg.current;
    if (!o || !im) return;
    o.style.transition = `clip-path ${fvDur}ms ${easeOut}, -webkit-clip-path ${fvDur}ms ${easeOut}`;
    im.style.transition = `transform ${fvDur}ms ${easeOut}`;
    o.style.clipPath = 'inset(0px 0px 0px 0px round 0px)'; o.style.webkitClipPath = 'inset(0px 0px 0px 0px round 0px)';
    im.style.transform = 'translate(0px, 0px) scale(1)';
    setFull((f) => (f ? { ...f, phase: 'open' } : f));
  };

  const onCardClick = (i) => (e) => {
    const s = st.current;
    if (s.suppressClick) { s.suppressClick = false; return; }
    e.stopPropagation();
    if (i === s.target && Math.abs(s.pos - i) < 0.15) openFull(i);
    else go(i);
  };

  const onKey = (e) => {
    if (full) {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (full.phase === 'closing') reopenFull(); else closeFull(); }
      return;
    }
    const s = st.current;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); go(s.target + 1); }
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); go(s.target - 1); }
    else if (e.key === 'Home') { e.preventDefault(); go(0); }
    else if (e.key === 'End') { e.preventDefault(); go(N - 1); }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openFull(s.target); }
  };

  const sans = '"Inter", -apple-system, "Helvetica Neue", Arial, sans-serif';
  const display = titleFont === 'Inter' ? sans : titleFont === 'Inter Tight' ? `"Inter Tight", ${sans}` : `"${titleFont}", "Iowan Old Style", Georgia, serif`;
  const serifish = titleFont === 'Instrument Serif' || titleFont === 'Fraunces';
  const filterCss = treatment === 'grayscale' ? 'grayscale(1) contrast(1.05)' : treatment === 'muted' ? 'saturate(0.6) contrast(0.97)' : 'none';
  const pad = compact ? 20 : 40;
  const pad2 = (v) => String(v).padStart(2, '0');
  const tSize = compact ? Math.round(titleSize * 0.72) : titleSize;
  const floorY = cy + ch / 2;
  const titleTop = Math.min(H - pad - tSize * 1.1 - 28, floorY + ch * 0.32);
  const titleOf = (i) => titles[i] || `Work ${i + 1}`;
  const fullOpen = full && full.phase !== 'closing';

  if (!N) {
    return (
      <section className="cover-flow" style={{ width: '100%', height: 480, background: bg, color: muted, display: 'grid', placeItems: 'center', fontFamily: sans, fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
        Add image URLs to begin
      </section>
    );
  }

  const swapLayer = (i, role) => {
    const anim = reduced ? 'none' : role === 'in'
      ? `${uid}-${swap.dir > 0 ? 'inUp' : 'inDown'} 820ms ${easeOut} both`
      : `${uid}-${swap.dir > 0 ? 'outUp' : 'outDown'} 620ms cubic-bezier(.65,0,.35,1) both`;
    return { anim, i };
  };

  return (
    <section
      ref={rootRef}
      className={`cover-flow ${uid}`}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label={`${eyebrow || 'Cover flow gallery'}. Use arrow keys to browse and Enter to open.`}
      onKeyDown={onKey}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      style={{ position: 'relative', width: '100%', height: H, overflow: 'hidden', background: bg, color: text, fontFamily: sans, userSelect: 'none', touchAction: 'pan-y', outline: 'none' }}
    >
      <style>{`
        .${uid}:focus-visible { box-shadow: inset 0 0 0 2px ${accent}; }
        .${uid} button:focus-visible { outline: 2px solid ${accent}; outline-offset: 3px; }
        @keyframes ${uid}-inUp { from { transform: translateY(105%); } to { transform: none; } }
        @keyframes ${uid}-inDown { from { transform: translateY(-105%); } to { transform: none; } }
        @keyframes ${uid}-outUp { from { transform: none; } to { transform: translateY(-105%); } }
        @keyframes ${uid}-outDown { from { transform: none; } to { transform: translateY(105%); } }
        @keyframes ${uid}-fade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        @keyframes ${uid}-intro { from { opacity: 0; transform: translateY(24px) scale(.96); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: reduce) { .${uid} * { animation: none !important; transition: none !important; } }
      `}</style>

      <div aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, top: floorY - 14, bottom: 0, background: `linear-gradient(180deg, ${bg} 0%, ${floor} 7%, ${bg} 100%)` }} />
      {spotlight && (
        <>
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: `radial-gradient(ellipse ${Math.round(cw * 1.6)}px ${Math.round(H * 0.75)}px at 50% -8%, ${light}1F 0%, ${light}0A 45%, ${light}00 75%)` }} />
          <div aria-hidden="true" style={{ position: 'absolute', left: '50%', top: floorY - 30, width: cw * 2.6, height: ch * 0.55, transform: 'translateX(-50%)', pointerEvents: 'none', background: `radial-gradient(ellipse 50% 50% at 50% 30%, ${light}14 0%, ${light}00 70%)` }} />
        </>
      )}

      <div style={{ position: 'absolute', inset: 0, animation: reduced ? 'none' : `${uid}-intro 1000ms ${easeOut} both` }}>
      <div
        ref={stageRef}
        style={{ position: 'absolute', inset: 0, perspective: Math.round(cw * 4.2), perspectiveOrigin: `50% ${cy}px`, transform: fullOpen ? 'scale(0.94)' : 'none', opacity: fullOpen ? 0.25 : 1, transition: `transform ${fvDur}ms ${ease}, opacity ${fvDur}ms ${ease}` }}
      >
        {images.map((src, i) => {
          const isCur = i === index;
          return (
            <div
              key={i}
              ref={(el) => { cardRefs.current[i] = el; }}
              role="button"
              tabIndex={-1}
              aria-label={`${titleOf(i)}${captions[i] ? ', ' + captions[i] : ''}${isCur ? ' — open' : ''}`}
              onClick={onCardClick(i)}
              style={{ position: 'absolute', left: width / 2 - cw / 2, top: cy - ch / 2, width: cw, height: ch, transformStyle: 'preserve-3d', willChange: 'transform', cursor: isCur ? 'zoom-in' : 'pointer', outline: 'none', visibility: full && full.i === i ? 'hidden' : undefined }}
            >
              <div style={{ position: 'absolute', inset: 0, borderRadius: radius, overflow: 'hidden', background: '#1c1917', boxShadow: '0 30px 60px -20px rgba(0,0,0,0.7)' }}>
                <img src={src} alt={titleOf(i)} draggable="false" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none', filter: filterCss }} />
                <div ref={(el) => { shadeRefs.current[i] = el; }} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0 }} />
              </div>
              {reflection && (
                <div aria-hidden="true" style={{ position: 'absolute', left: 0, top: ch + 3, width: cw, height: ch, borderRadius: radius, overflow: 'hidden', transform: 'scaleY(-1)', opacity: reflA / 0.22 * 0.5, WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.12) 22%, rgba(0,0,0,0) 46%)', maskImage: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.12) 22%, rgba(0,0,0,0) 46%)', pointerEvents: 'none' }}>
                  <img src={src} alt="" draggable="false" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: `${filterCss === 'none' ? '' : filterCss + ' '}blur(1px)` }} />
                </div>
              )}
            </div>
          );
        })}
      </div>
      </div>

      <div style={{ position: 'absolute', top: pad, left: pad, right: pad, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, pointerEvents: 'none', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: muted, opacity: fullOpen ? 0 : 1, transition: `opacity ${reduced ? 0 : 400}ms`, animation: reduced ? 'none' : `${uid}-fade 800ms ${easeOut} 200ms both` }}>
        <span>{eyebrow}</span>
        <span style={{ color: text, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }} aria-live="polite">{pad2(index + 1)}<span style={{ color: muted }}> / {pad2(N)}</span></span>
      </div>

      <div style={{ position: 'absolute', left: pad, right: pad, top: titleTop, textAlign: 'center', pointerEvents: 'none', opacity: fullOpen ? 0 : 1, transition: `opacity ${reduced ? 0 : 400}ms` }}>
        <div style={{ position: 'relative', height: Math.round(tSize * 1.12), overflow: 'hidden' }}>
          {[swap.prev >= 0 && swap.prev !== swap.cur ? swapLayer(swap.prev, 'out') : null, swapLayer(swap.cur, 'in')].filter(Boolean).map((L, j) => (
            <div key={`${swap.k}-${j}`} aria-hidden={j === 0 && swap.prev >= 0 ? 'true' : undefined} style={{ position: 'absolute', left: 0, right: 0, top: 0, fontFamily: display, fontWeight: titleWeight, fontSize: tSize, lineHeight: 1.1, letterSpacing: serifish ? '-0.01em' : '-0.03em', whiteSpace: 'nowrap', animation: swap.k === 0 ? 'none' : L.anim }}>{titleOf(L.i)}</div>
          ))}
        </div>
        <div style={{ position: 'relative', height: 22, overflow: 'hidden', marginTop: 10 }}>
          {[swap.prev >= 0 && swap.prev !== swap.cur ? swapLayer(swap.prev, 'out') : null, swapLayer(swap.cur, 'in')].filter(Boolean).map((L, j) => (
            <div key={`c${swap.k}-${j}`} style={{ position: 'absolute', left: 0, right: 0, top: 0, fontSize: compact ? 12 : 13, lineHeight: '22px', color: muted, fontWeight: 300, letterSpacing: '0.01em', whiteSpace: 'nowrap', animation: swap.k === 0 ? 'none' : L.anim, animationDelay: swap.k === 0 ? undefined : '60ms' }}>{captions[L.i] || ''}</div>
          ))}
        </div>
      </div>

      {N > 1 && (
        <div style={{ position: 'absolute', left: pad, right: pad, bottom: pad, display: 'flex', justifyContent: 'center', gap: 6, opacity: fullOpen ? 0 : 1, transition: `opacity ${reduced ? 0 : 400}ms` }}>
          {images.map((_, i) => (
            <button key={i} aria-label={`Go to ${titleOf(i)}`} aria-current={i === index} onPointerDown={(e) => e.stopPropagation()} onClick={() => go(i)}
              style={{ appearance: 'none', border: 'none', background: 'transparent', padding: '10px 0', cursor: 'pointer', width: i === index ? 26 : 12, transition: `width 600ms ${easeOut}` }}>
              <span style={{ display: 'block', height: 1, background: i === index ? text : `${text}44`, transition: 'background 400ms' }} />
            </button>
          ))}
        </div>
      )}

      {full && (
        <div role="dialog" aria-modal="true" aria-label={titleOf(full.i)} style={{ position: 'absolute', inset: 0, zIndex: 5 }} onPointerDown={(e) => e.stopPropagation()}>
          <div ref={fvOuter} onClick={() => (full.phase === 'closing' ? reopenFull() : closeFull())} style={{ position: 'absolute', inset: 0, overflow: 'hidden', cursor: 'zoom-out', clipPath: insetFrom, WebkitClipPath: insetFrom }}>
            <img ref={fvImg} src={images[full.i]} alt={`${titleOf(full.i)}${captions[full.i] ? ' — ' + captions[full.i] : ''}`} draggable="false" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', transformOrigin: '50% 50%', transform: imgFrom, filter: filterCss }} />
            <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.6) 100%)', opacity: full.phase === 'closing' ? 0 : 1, transition: `opacity ${reduced ? 0 : 700}ms` }} />
          </div>
          {full.phase !== 'closing' && (
            <>
              <div style={{ position: 'absolute', left: pad, right: pad, bottom: pad + 4, pointerEvents: 'none' }}>
                <div style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#E7E5E4', marginBottom: 14, animation: reduced ? 'none' : `${uid}-fade 700ms ${easeOut} ${Math.round(fvDur * 0.6)}ms both` }}>{pad2(full.i + 1)} / {pad2(N)}</div>
                <div style={{ overflow: 'hidden', paddingBottom: '0.06em' }}>
                  <h3 style={{ margin: 0, fontFamily: display, fontWeight: titleWeight, color: '#FAFAF9', fontSize: compact ? 44 : Math.round(Math.min(112, width * 0.08)), lineHeight: 1, letterSpacing: serifish ? '-0.015em' : '-0.04em', animation: reduced ? 'none' : `${uid}-inUp 1000ms ${easeOut} ${Math.round(fvDur * 0.55)}ms both` }}>{titleOf(full.i)}</h3>
                </div>
                {captions[full.i] && <p style={{ margin: '14px 0 0', fontSize: compact ? 13 : 15, color: '#E7E5E4', fontWeight: 300, animation: reduced ? 'none' : `${uid}-fade 800ms ${easeOut} ${Math.round(fvDur * 0.75)}ms both` }}>{captions[full.i]}</p>}
              </div>
              <button onClick={closeFull} aria-label="Close full view" style={{ appearance: 'none', position: 'absolute', top: pad - 8, right: pad - 8, height: 40, padding: '0 16px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.35)', background: 'rgba(0,0,0,0.25)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', color: '#FAFAF9', fontFamily: sans, fontSize: 12, letterSpacing: '0.08em', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, animation: reduced ? 'none' : `${uid}-fade 600ms ${easeOut} ${Math.round(fvDur * 0.7)}ms both` }}>
                Close
                <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M1 1l8 8M9 1 1 9" stroke="currentColor" strokeWidth="1.2" fill="none" /></svg>
              </button>
            </>
          )}
        </div>
      )}
    </section>
  );
}

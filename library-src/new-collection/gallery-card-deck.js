const MANIFEST = {
  "type": "Gallery.CardDeck",
  "description": "A physical deck of bordered photo cards with handwritten captions: drag and fling the top card with real throw physics, riffle-shuffle the deck, or fan it out and pick a card",
  "editorElement": {
    "selector": ".card-deck-gallery",
    "displayName": "Card Deck Gallery",
    "archetype": "container",
    "data": {
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Field notes / Vol. 03", "group": "Content" },
      "title": { "dataType": "text", "displayName": "Title", "defaultValue": "A summer on the coast, dealt by hand", "group": "Content" },
      "description": { "dataType": "text", "displayName": "Description", "defaultValue": "Twelve prints from a shoebox. Throw the top card to see the next, shuffle the deck, or fan it out and choose.", "group": "Content" },
      "hintText": { "dataType": "text", "displayName": "Drag Hint", "defaultValue": "Drag & throw the top card", "group": "Content" },
      "images": { "dataType": "text", "displayName": "Image URLs (comma separated)", "defaultValue": "https://picsum.photos/seed/harbor/1200/900,https://picsum.photos/seed/dune/1200/900,https://picsum.photos/seed/atelier/1200/900,https://picsum.photos/seed/orchard/1200/900,https://picsum.photos/seed/quarry/1200/900,https://picsum.photos/seed/meridian/1200/900,https://picsum.photos/seed/lantern/1200/900,https://picsum.photos/seed/fjord/1200/900,https://picsum.photos/seed/terrace/1200/900,https://picsum.photos/seed/monsoon/1200/900,https://picsum.photos/seed/basalt/1200/900,https://picsum.photos/seed/linen/1200/900", "group": "Images" },
      "captions": { "dataType": "text", "displayName": "Captions (separate with |)", "defaultValue": "Harbour, first light|Dunes at noon|The studio in June|Late apples|Old quarry road|Meridian line|Lantern hour|North fjord|Upper terrace|Before the rain|Black sand|Washing day", "group": "Images" },
      "grayscale": { "dataType": "booleanValue", "displayName": "Black & White Images", "defaultValue": "false", "group": "Images" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#1C1917", "group": "Colors" },
      "spotlightColor": { "dataType": "color", "displayName": "Table Spotlight", "defaultValue": "#44403C", "group": "Colors" },
      "inkColor": { "dataType": "color", "displayName": "Text", "defaultValue": "#FAFAF9", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#A8A29E", "group": "Colors" },
      "cardColor": { "dataType": "color", "displayName": "Card Border", "defaultValue": "#FAFAF7", "group": "Colors" },
      "captionColor": { "dataType": "color", "displayName": "Caption Ink", "defaultValue": "#292524", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent", "defaultValue": "#D6A35C", "group": "Colors" },
      "placeholderColor": { "dataType": "color", "displayName": "Image Placeholder", "defaultValue": "#D6D3D1", "group": "Colors" },
      "titleFont": { "dataType": "select", "displayName": "Title Font", "defaultValue": "Fraunces", "options": ["Fraunces", "Instrument Serif", "Inter", "Georgia"], "group": "Typography" },
      "titleSize": { "dataType": "select", "displayName": "Title Size (px)", "defaultValue": "56", "options": ["40", "48", "56", "64", "72"], "group": "Typography" },
      "titleWeight": { "dataType": "select", "displayName": "Title Weight", "defaultValue": "300", "options": ["300", "400", "500"], "group": "Typography" },
      "captionFont": { "dataType": "select", "displayName": "Caption Handwriting", "defaultValue": "Caveat", "options": ["Caveat", "Kalam", "Reenie Beanie", "Serif Italic"], "group": "Typography" },
      "sectionHeight": { "dataType": "select", "displayName": "Section Height", "defaultValue": "fill", "options": ["fill", "640", "720", "800", "900"], "group": "Layout", "description": "fill = height of the visible canvas" },
      "cardSize": { "dataType": "select", "displayName": "Card Size", "defaultValue": "medium", "options": ["small", "medium", "large"], "group": "Layout" },
      "messiness": { "dataType": "select", "displayName": "Pile Messiness", "defaultValue": "natural", "options": ["neat", "natural", "messy"], "group": "Layout" },
      "initialLayout": { "dataType": "select", "displayName": "Initial Layout", "defaultValue": "pile", "options": ["pile", "fan"], "group": "Layout" },
      "showCounter": { "dataType": "booleanValue", "displayName": "Show Counter", "defaultValue": "true", "group": "Layout" },
      "showControls": { "dataType": "booleanValue", "displayName": "Show Controls", "defaultValue": "true", "group": "Layout" },
      "showCaptions": { "dataType": "booleanValue", "displayName": "Show Captions", "defaultValue": "true", "group": "Layout" },
      "throwSensitivity": { "dataType": "select", "displayName": "Throw Sensitivity", "defaultValue": "medium", "options": ["low", "medium", "high"], "group": "Animation" },
      "springFeel": { "dataType": "select", "displayName": "Spring Feel", "defaultValue": "balanced", "options": ["soft", "balanced", "snappy"], "group": "Animation" },
      "fanSpread": { "dataType": "select", "displayName": "Fan Spread (deg)", "defaultValue": "64", "options": ["40", "64", "90", "120"], "group": "Animation" },
      "entrance": { "dataType": "booleanValue", "displayName": "Deal-in Entrance", "defaultValue": "true", "group": "Animation" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const eyebrow = config?.eyebrow || 'Field notes / Vol. 03';
  const title = config?.title || 'A summer on the coast, dealt by hand';
  const description = config?.description || 'Twelve prints from a shoebox. Throw the top card to see the next, shuffle the deck, or fan it out and choose.';
  const hintText = config?.hintText || 'Drag & throw the top card';
  const defaultImages = 'harbor,dune,atelier,orchard,quarry,meridian,lantern,fjord,terrace,monsoon,basalt,linen'
    .split(',').map((s) => `https://picsum.photos/seed/${s}/1200/900`).join(',');
  const grayscale = bool(config?.grayscale, false);
  const imagesRaw = config?.images || defaultImages;
  const captionsRaw = config?.captions || 'Harbour, first light|Dunes at noon|The studio in June|Late apples|Old quarry road|Meridian line|Lantern hour|North fjord|Upper terrace|Before the rain|Black sand|Washing day';
  const bg = config?.backgroundColor || '#1C1917';
  const spot = config?.spotlightColor || '#44403C';
  const ink = config?.inkColor || '#FAFAF9';
  const muted = config?.mutedColor || '#A8A29E';
  const cardColor = config?.cardColor || '#FAFAF7';
  const captionInk = config?.captionColor || '#292524';
  const accent = config?.accentColor || '#D6A35C';
  const placeholder = config?.placeholderColor || '#D6D3D1';
  const titleFont = config?.titleFont || 'Fraunces';
  const titleSize = parseInt(config?.titleSize || '56', 10);
  const titleWeight = config?.titleWeight || '300';
  const captionFont = config?.captionFont || 'Caveat';
  const sectionHeight = config?.sectionHeight || 'fill';
  const sizeFactor = { small: 0.86, medium: 1, large: 1.12 }[config?.cardSize || 'medium'] || 1;
  const messy = { neat: 0.35, natural: 1, messy: 1.8 }[config?.messiness || 'natural'] || 1;
  const initialLayout = config?.initialLayout || 'pile';
  const showCounter = bool(config?.showCounter, true);
  const showControls = bool(config?.showControls, true);
  const showCaptions = bool(config?.showCaptions, true);
  const throwFactor = { low: 1.5, medium: 1, high: 0.6 }[config?.throwSensitivity || 'medium'] || 1;
  const spring = { soft: [110, 14], balanced: [170, 20], snappy: [280, 26] }[config?.springFeel || 'balanced'] || [170, 20];
  const fanSpread = parseFloat(config?.fanSpread || '64');
  const entrance = bool(config?.entrance, true);

  const images = React.useMemo(() => imagesRaw.split(',').map((s) => s.trim()).filter(Boolean).map((u) => {
    if (!grayscale || !/picsum\.photos/.test(u) || /grayscale/.test(u)) return u;
    return u + (u.includes('?') ? '&grayscale' : '?grayscale');
  }), [imagesRaw, grayscale]);
  const captions = React.useMemo(() => captionsRaw.split('|').map((s) => s.trim()), [captionsRaw]);
  const n = images.length;

  const uid = React.useMemo(() => 'gcd' + Math.random().toString(36).slice(2, 8), []);
  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  React.useEffect(() => {
    const id = 'ncs-fonts-gallery-deck';
    if (document.getElementById(id)) return;
    const l = document.createElement('link');
    l.id = id;
    l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Caveat:wght@400;500&family=Kalam:wght@300;400&family=Reenie+Beanie&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500&family=Instrument+Serif&family=Inter:wght@300;400;500&family=IBM+Plex+Mono:wght@400;500&display=swap';
    document.head.appendChild(l);
  }, []);

  const rootRef = React.useRef(null);
  const [width, setWidth] = React.useState(1280);
  const [stageH, setStageH] = React.useState(800);
  React.useEffect(() => {
    const s = typeof getScrollContainer === 'function' ? getScrollContainer() : null;
    const scroller = s && s !== window && s.nodeType === 1 ? s : window;
    const el = rootRef.current;
    if (!el) return undefined;
    const measure = () => {
      setWidth(el.clientWidth || 1280);
      setStageH(scroller === window ? window.innerHeight : scroller.clientHeight || 800);
    };
    measure();
    window.addEventListener('resize', measure);
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (ro) ro.observe(el);
    return () => { window.removeEventListener('resize', measure); if (ro) ro.disconnect(); };
  }, []);

  const [order, setOrder] = React.useState(() => images.map((_, i) => i));
  const [mode, setMode] = React.useState(initialLayout === 'fan' ? 'fan' : 'stack');
  const [entered, setEntered] = React.useState(reduced || !entrance);
  const [loaded, setLoaded] = React.useState({});
  const [hoverFan, setHoverFan] = React.useState(-1);
  const [dragging, setDragging] = React.useState(-1);
  const [busy, setBusy] = React.useState(false);

  React.useEffect(() => { setOrder(images.map((_, i) => i)); setLoaded({}); }, [n]); // eslint-disable-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    if (entered) return undefined;
    const t = setTimeout(() => setEntered(true), 60);
    return () => clearTimeout(t);
  }, [entered]);

  const innerRefs = React.useRef([]);
  const phys = React.useRef([]);
  const rafRef = React.useRef(0);
  const timers = React.useRef([]);
  const drag = React.useRef(null);
  const later = (fn, ms) => { const t = setTimeout(fn, ms); timers.current.push(t); return t; };
  React.useEffect(() => () => { cancelAnimationFrame(rafRef.current); timers.current.forEach(clearTimeout); }, []);

  const P = (i) => {
    if (!phys.current[i]) phys.current[i] = { x: 0, y: 0, r: 0, vx: 0, vy: 0, vr: 0, anim: null };
    return phys.current[i];
  };
  const apply = (i) => {
    const el = innerRefs.current[i];
    const p = P(i);
    if (el) el.style.transform = `translate3d(${p.x.toFixed(2)}px, ${p.y.toFixed(2)}px, 0) rotate(${p.r.toFixed(2)}deg)`;
  };
  const tick = (now) => {
    let active = false;
    phys.current.forEach((p, i) => {
      if (!p || !p.anim) return;
      const a = p.anim;
      if (a.type === 'tween') {
        if (!a.t0) a.t0 = now;
        const t = Math.min(1, (now - a.t0) / a.dur);
        const e = 1 - Math.pow(1 - t, 3);
        p.x = a.fx + (a.tx - a.fx) * e;
        p.y = a.fy + (a.ty - a.fy) * e;
        p.r = a.fr + (a.tr - a.fr) * e;
        if (t >= 1) { p.anim = null; if (a.done) a.done(); }
      } else {
        const dt = Math.min(0.034, a.last ? (now - a.last) / 1000 : 0.016);
        a.last = now;
        const steps = 4;
        const h = dt / steps;
        for (let k = 0; k < steps; k++) {
          p.vx += (-a.k * p.x - a.c * p.vx) * h; p.x += p.vx * h;
          p.vy += (-a.k * p.y - a.c * p.vy) * h; p.y += p.vy * h;
          p.vr += (-a.k * p.r - a.c * p.vr) * h; p.r += p.vr * h;
        }
        if (Math.abs(p.x) + Math.abs(p.y) + Math.abs(p.r) < 0.15 && Math.abs(p.vx) + Math.abs(p.vy) + Math.abs(p.vr) < 4) {
          p.x = 0; p.y = 0; p.r = 0; p.vx = 0; p.vy = 0; p.vr = 0; p.anim = null;
          if (a.done) a.done();
        }
      }
      if (p.anim) active = true;
      apply(i);
    });
    rafRef.current = active ? requestAnimationFrame(tick) : 0;
  };
  const kick = () => { if (!rafRef.current) rafRef.current = requestAnimationFrame(tick); };
  const springHome = (i, done) => {
    const p = P(i);
    if (reduced) { p.x = 0; p.y = 0; p.r = 0; p.anim = null; apply(i); if (done) done(); return; }
    p.anim = { type: 'spring', k: spring[0], c: spring[1], done };
    kick();
  };

  const compact = width < 760;
  const H = sectionHeight === 'fill' ? Math.max(compact ? 640 : 560, Math.min(980, stageH)) : parseInt(sectionHeight, 10);
  const cw = Math.round((compact ? Math.min(width * 0.7, 290) : Math.max(260, Math.min(372, (width - 520) * 0.56, H * 0.46))) * sizeFactor);
  const pad = Math.round(cw * 0.05);
  const imgH = Math.round((cw - pad * 2) * 0.78);
  const capH = Math.round(cw * 0.2);
  const ch = pad + imgH + capH;
  const deckX = compact ? width / 2 : Math.max(width * 0.64, 520 + cw / 2);
  const deckY = compact ? H * 0.53 : H * 0.5 + 10;

  const fan = (() => {
    const spread = (compact ? Math.min(fanSpread, 60) : fanSpread) * Math.min(1, (n - 1) / 8);
    const half = (spread / 2) * Math.PI / 180;
    const R0 = cw * (compact ? 1.5 : 2.1);
    const areaL = compact ? 12 : 470;
    const areaR = width - (compact ? 12 : 40);
    const span = 2 * R0 * Math.sin(half) + cw * Math.cos(half) + ch * Math.sin(half);
    const s = Math.min(compact ? 0.82 : 0.86, (areaR - areaL) / span);
    const R = R0 * s;
    const sag = R * (1 - Math.cos(half));
    return { spread, R, s, cx: (areaL + areaR) / 2, cy: deckY - sag * 0.55 };
  })();
  const rand = (i, salt) => {
    const x = Math.sin((i + 1) * 12.9898 + salt * 78.233) * 43758.5453;
    return x - Math.floor(x);
  };
  const posOf = React.useMemo(() => {
    const m = {};
    order.forEach((idx, pos) => { m[idx] = pos; });
    return m;
  }, [order]);
  const top = order[0] ?? 0;

  const baseFor = (i) => {
    const pos = posOf[i] ?? i;
    const depth = Math.min(pos, 6);
    const jr = (rand(i, 1) - 0.5) * 2;
    const jx = (rand(i, 2) - 0.5) * 2;
    const jy = (rand(i, 3) - 0.5) * 2;
    if (!entered) return { x: jx * 30, y: -H * 0.7 - pos * 18, r: jr * 24, z: n - pos, delay: 0, s: 1 };
    if (mode === 'fan') {
      const k = n - 1 - pos;
      const a = n > 1 ? -fan.spread / 2 + (fan.spread * k) / (n - 1) : 0;
      const rad = (a * Math.PI) / 180;
      const lift = hoverFan === i ? 28 : 0;
      return {
        x: fan.cx - deckX + fan.R * Math.sin(rad) + lift * Math.sin(rad),
        y: fan.cy - deckY + fan.R * (1 - Math.cos(rad)) - lift * Math.cos(rad),
        r: a, z: k + 1, delay: k * 18, s: fan.s
      };
    }
    if (mode === 'split') {
      const left = pos % 2 === 0;
      const hd = Math.floor(pos / 2);
      return { x: (left ? -1 : 1) * cw * (compact ? 0.42 : 0.56), y: -hd * 2 + 8, r: (left ? 7 : -7) + jr * 1.5, z: n - pos, delay: (left ? 0 : 30) + hd * 12, s: 0.97 };
    }
    const delay = mode === 'merge' ? (n - 1 - pos) * 38 : mode === 'gather' ? pos * 22 : 0;
    return {
      x: jx * 20 * messy * (depth ? 1 : 0.3),
      y: depth * 3.4 + jy * 7 * messy * (depth ? 1 : 0),
      r: jr * (pos === 0 ? 2.2 : 7.5) * messy,
      z: n - pos, delay, s: 1 - depth * 0.006
    };
  };

  const scaleOf = () => {
    const el = rootRef.current;
    if (!el || !el.offsetWidth) return 1;
    return el.getBoundingClientRect().width / el.offsetWidth || 1;
  };

  const sendToBack = (i, vx, vy, fromX, fromY, fromR) => {
    const p = P(i);
    const speed = Math.hypot(vx, vy) || 1;
    const dist = Math.max(cw * 1.25, Math.min(speed * 0.2, cw * 2.2));
    const tx = fromX + (vx / speed) * dist;
    const ty = fromY + (vy / speed) * dist;
    const tr = fromR + Math.max(-38, Math.min(38, vx * 0.022));
    const finish = () => {
      setOrder((o) => [...o.filter((k) => k !== i), i]);
      springHome(i, () => setBusy(false));
    };
    setBusy(true);
    if (reduced) { p.x = 0; p.y = 0; p.r = 0; apply(i); setOrder((o) => [...o.filter((k) => k !== i), i]); setBusy(false); return; }
    p.anim = { type: 'tween', fx: fromX, fy: fromY, fr: fromR, tx, ty, tr, dur: 300, done: finish };
    kick();
  };

  const next = () => {
    if (busy || n < 2) return;
    if (mode !== 'stack') setMode('stack');
    sendToBack(order[0], 1500, -260, 0, 0, 0);
  };
  const prev = () => {
    if (busy || n < 2) return;
    if (mode !== 'stack') setMode('stack');
    const i = order[n - 1];
    const p = P(i);
    setOrder((o) => [i, ...o.filter((k) => k !== i)]);
    if (reduced) return;
    p.x = -cw * 1.5; p.y = -cw * 0.25; p.r = -24; p.vx = 0; p.vy = 0; p.vr = 0;
    apply(i);
    setBusy(true);
    springHome(i, () => setBusy(false));
  };
  const shuffle = () => {
    if (busy || n < 2) return;
    if (reduced) {
      setOrder((o) => [...o].sort(() => Math.random() - 0.5));
      setMode('stack');
      return;
    }
    setBusy(true);
    setMode('split');
    later(() => {
      setOrder((o) => {
        const L = o.filter((_, k) => k % 2 === 0);
        const R = o.filter((_, k) => k % 2 === 1);
        const out = [];
        let fromL = Math.random() > 0.5;
        while (L.length || R.length) {
          const src = (fromL && L.length) || !R.length ? L : R;
          const take = 1 + (Math.random() > 0.65 ? 1 : 0);
          for (let t = 0; t < take && src.length; t++) out.unshift(src.pop());
          fromL = !fromL;
        }
        return out;
      });
      setMode('merge');
    }, 560);
    later(() => { setMode('stack'); setBusy(false); }, 560 + n * 38 + 720);
  };
  const toggleFan = () => {
    if (busy) return;
    setHoverFan(-1);
    setMode((m) => (m === 'fan' ? 'gather' : 'fan'));
  };
  React.useEffect(() => {
    if (mode !== 'gather') return undefined;
    const t = setTimeout(() => setMode('stack'), n * 22 + 700);
    return () => clearTimeout(t);
  }, [mode, n]);
  const pick = (i) => {
    setOrder((o) => [i, ...o.filter((k) => k !== i)]);
    setHoverFan(-1);
    setMode('gather');
  };

  const onPointerDown = (e, i) => {
    if (e.button !== undefined && e.button !== 0) return;
    if ((mode !== 'stack' && mode !== 'gather') || busy || posOf[i] !== 0) return;
    e.preventDefault();
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch (err) { /* noop */ }
    const p = P(i);
    p.anim = null;
    const rect = e.currentTarget.getBoundingClientRect();
    const grabTop = e.clientY < rect.top + rect.height / 2;
    drag.current = { i, id: e.pointerId, sx: e.clientX, sy: e.clientY, ox: p.x, oy: p.y, s: scaleOf(), sign: grabTop ? 1 : -1, samples: [{ t: performance.now(), x: p.x, y: p.y }], moved: false };
    setDragging(i);
  };
  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const p = P(d.i);
    p.x = d.ox + (e.clientX - d.sx) / d.s;
    p.y = d.oy + (e.clientY - d.sy) / d.s;
    p.r = p.x * 0.055 * d.sign;
    if (Math.abs(p.x) + Math.abs(p.y) > 4) d.moved = true;
    const now = performance.now();
    d.samples.push({ t: now, x: p.x, y: p.y });
    while (d.samples.length > 2 && now - d.samples[0].t > 110) d.samples.shift();
    apply(d.i);
  };
  const onPointerUp = (e) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    drag.current = null;
    setDragging(-1);
    const p = P(d.i);
    const s = d.samples;
    const a = s[0];
    const b = s[s.length - 1];
    const dt = Math.max(16, b.t - a.t) / 1000;
    let vx = (b.x - a.x) / dt;
    let vy = (b.y - a.y) / dt;
    if (performance.now() - b.t > 90) { vx = 0; vy = 0; }
    const speed = Math.hypot(vx, vy);
    const far = Math.hypot(p.x, p.y) > cw * 0.42 * throwFactor;
    if (!d.moved) { next(); return; }
    if (speed > 700 * throwFactor || far) {
      if (speed < 300) { vx = p.x * 6; vy = p.y * 6; }
      sendToBack(d.i, vx, vy, p.x, p.y, p.r);
    } else {
      p.vx = vx; p.vy = vy; p.vr = 0;
      springHome(d.i);
    }
  };

  const fanBtnRefs = React.useRef([]);
  const onKeyDown = (e) => {
    if (e.key === 'Escape') { if (mode === 'fan') { e.preventDefault(); toggleFan(); } return; }
    if (mode === 'fan') {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const visual = [...order].reverse();
        const cur = visual.indexOf(hoverFan >= 0 ? hoverFan : top);
        const nx = Math.max(0, Math.min(n - 1, cur + (e.key === 'ArrowRight' ? 1 : -1)));
        setHoverFan(visual[nx]);
        const el = fanBtnRefs.current[visual[nx]];
        if (el) el.focus();
      }
      return;
    }
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); next(); }
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); prev(); }
  };

  const pad2 = (v) => String(v).padStart(2, '0');
  const serifStack = (f) => (f === 'Inter' ? 'Inter, -apple-system, "Helvetica Neue", sans-serif' : f === 'Georgia' ? 'Georgia, serif' : `"${f}", Georgia, "Times New Roman", serif`);
  const sans = 'Inter, -apple-system, "Helvetica Neue", Arial, sans-serif';
  const mono = '"IBM Plex Mono", ui-monospace, "SF Mono", Menlo, monospace';
  const hand = captionFont === 'Serif Italic' ? 'Georgia, "Times New Roman", serif' : `"${captionFont}", "Bradley Hand", "Segoe Print", cursive`;
  const handScale = captionFont === 'Reenie Beanie' ? 1.25 : captionFont === 'Kalam' ? 0.82 : 1;
  const T = (ms, d) => (reduced ? 'none' : `transform ${ms}ms cubic-bezier(.2,.8,.2,1) ${d}ms, opacity 500ms ease ${d}ms`);
  const fanned = mode === 'fan';

  const btn = {
    appearance: 'none', border: `1px solid ${muted}55`, background: 'transparent', color: ink, cursor: 'pointer',
    fontFamily: mono, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', height: 38, padding: '0 16px',
    borderRadius: 999, display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'background 200ms, border-color 200ms'
  };
  const iconBtn = { ...btn, width: 38, padding: 0, justifyContent: 'center', letterSpacing: 0, fontSize: 15 };

  const counter = showCounter && n > 0 && (
    <div aria-hidden="true" style={{ display: 'flex', alignItems: 'baseline', gap: 10, fontFamily: serifStack(titleFont), color: ink }}>
      <span style={{ fontSize: compact ? 40 : 76, fontWeight: 300, letterSpacing: '-0.04em', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{pad2(top + 1)}</span>
      <span style={{ fontFamily: mono, fontSize: compact ? 12 : 13, color: muted, letterSpacing: '0.1em' }}>/ {pad2(n)}</span>
    </div>
  );
  const controls = showControls && n > 1 && (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      <button type="button" className={`${uid}-b`} style={iconBtn} onClick={prev} aria-label="Previous card">&#8592;</button>
      <button type="button" className={`${uid}-b`} style={iconBtn} onClick={next} aria-label="Next card">&#8594;</button>
      <button type="button" className={`${uid}-b`} style={btn} onClick={shuffle} aria-label="Shuffle the deck">
        <svg width="14" height="12" viewBox="0 0 14 12" aria-hidden="true"><path d="M1 3h3l6 6h3M1 9h3l6-6h3M11 1l2 2-2 2M11 7l2 2-2 2" fill="none" stroke="currentColor" strokeWidth="1.1" /></svg>
        {!compact && 'Shuffle'}
      </button>
      <button type="button" className={`${uid}-b`} style={{ ...btn, background: fanned ? `${ink}14` : 'transparent' }} onClick={toggleFan} aria-pressed={fanned} aria-label={fanned ? 'Gather the cards into a pile' : 'Fan out the cards'}>
        <svg width="14" height="12" viewBox="0 0 14 12" aria-hidden="true"><path d="M7 11L2.5 2.5M7 11V1M7 11l4.5-8.5" fill="none" stroke="currentColor" strokeWidth="1.1" /></svg>
        {!compact && (fanned ? 'Pile' : 'Fan out')}
      </button>
    </div>
  );

  return (
    <section ref={rootRef} className={`card-deck-gallery ${uid}`} role="region" aria-roledescription="carousel" aria-label={title}
      tabIndex={0} onKeyDown={onKeyDown}
      style={{ position: 'relative', width: '100%', height: `${H}px`, overflow: 'hidden', backgroundColor: bg, color: ink, fontFamily: sans, outline: 'none', touchAction: 'pan-y', userSelect: 'none', WebkitUserSelect: 'none' }}>
      <style>{`
        .${uid}-b:hover { background: ${ink}12 !important; border-color: ${muted}aa !important; }
        .${uid}-b:focus-visible, .${uid}-c:focus-visible { outline: 2px solid ${accent}; outline-offset: 3px; }
        .${uid}:focus-visible { box-shadow: inset 0 0 0 2px ${accent}; }
      `}</style>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse ${compact ? 90 : 46}% ${compact ? 46 : 62}% at ${(deckX / width) * 100}% ${(deckY / H) * 100}%, ${spot} 0%, ${bg} 100%)`, opacity: 0.9 }} />
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, opacity: 0.08, backgroundImage: `radial-gradient(${ink} 0.5px, transparent 0.6px)`, backgroundSize: '4px 4px' }} />

      <div style={{ position: 'absolute', zIndex: 40, left: compact ? 20 : 56, top: compact ? 28 : 56, width: compact ? 'calc(100% - 40px)' : Math.min(420, deckX - cw * 0.7 - 120), pointerEvents: 'none' }}>
        <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: muted, marginBottom: compact ? 12 : 22, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 18, height: 1, background: accent, display: 'inline-block' }} />{eyebrow}
        </div>
        <h2 style={{ margin: 0, fontFamily: serifStack(titleFont), fontSize: compact ? Math.round(titleSize * 0.56) : titleSize, lineHeight: 1.04, fontWeight: titleWeight, letterSpacing: titleFont === 'Inter' ? '-0.035em' : '-0.02em', textWrap: 'balance' }}>{title}</h2>
        <p style={{ margin: compact ? '12px 0 0' : '22px 0 0', fontSize: compact ? 13.5 : 15, lineHeight: 1.6, color: muted, maxWidth: 340, fontWeight: 300 }}>{description}</p>
      </div>

      {!compact && (
        <div style={{ position: 'absolute', zIndex: 40, left: 56, bottom: 52, display: 'flex', flexDirection: 'column', gap: 26 }}>
          {counter}
          {controls}
        </div>
      )}
      {compact && (
        <div style={{ position: 'absolute', zIndex: 40, left: 20, right: 20, bottom: 24, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12 }}>
          {counter || <span />}
          {controls}
        </div>
      )}

      {n === 0 && (
        <div style={{ position: 'absolute', left: deckX - cw / 2, top: deckY - ch / 2, width: cw, height: ch, border: `1.5px dashed ${muted}`, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 24, boxSizing: 'border-box', color: muted, fontFamily: mono, fontSize: 12, letterSpacing: '0.06em', lineHeight: 1.6 }}>
          No photos yet.<br />Add image URLs, separated by commas.
        </div>
      )}

      {images.map((src, i) => {
        const b = baseFor(i);
        const pos = posOf[i] ?? i;
        const isTop = pos === 0 && !fanned;
        const lifted = dragging === i || (fanned && hoverFan === i);
        const depth = Math.min(pos, 6);
        const shadow = lifted
          ? '0 2px 4px rgba(0,0,0,.25), 0 38px 60px -18px rgba(0,0,0,.7)'
          : depth < 3 ? `0 1px 2px rgba(0,0,0,.28), 0 ${16 - depth * 4}px ${34 - depth * 8}px -12px rgba(0,0,0,.6)` : '0 1px 2px rgba(0,0,0,.3)';
        const cap = captions[i] || '';
        return (
          <div key={i} style={{
            position: 'absolute', left: deckX - cw / 2, top: deckY - ch / 2, width: cw, height: ch,
            zIndex: dragging === i ? 999 : b.z, transform: `translate3d(${b.x}px, ${b.y}px, 0) rotate(${b.r}deg) scale(${b.s})`,
            transition: T(mode === 'split' ? 460 : 640, entered ? b.delay : 0),
            opacity: entered ? 1 : 0
          }}>
            <div ref={(el) => { innerRefs.current[i] = el; }} style={{ width: '100%', height: '100%', willChange: 'transform' }}>
              <button type="button" className={`${uid}-c`}
                ref={(el) => { fanBtnRefs.current[i] = el; }}
                tabIndex={fanned || isTop ? 0 : -1}
                aria-label={fanned ? `Bring photo ${i + 1} to the front${cap ? ': ' + cap : ''}` : `Photo ${i + 1} of ${n}${cap ? ': ' + cap : ''}. Press to deal the next card.`}
                onPointerDown={(e) => onPointerDown(e, i)} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp}
                onClick={(e) => { if (fanned) pick(i); else if (e.detail === 0 && isTop) next(); }}
                onPointerEnter={(e) => { if (fanned && e.pointerType === 'mouse') setHoverFan(i); }}
                onPointerLeave={(e) => { if (fanned && e.pointerType === 'mouse') setHoverFan((h) => (h === i ? -1 : h)); }}
                onFocus={() => { if (fanned) setHoverFan(i); }}
                style={{
                  appearance: 'none', border: 0, margin: 0, display: 'block', width: '100%', height: '100%', padding: `${pad}px ${pad}px 0`,
                  boxSizing: 'border-box', background: cardColor, borderRadius: 3, textAlign: 'left', color: captionInk,
                  cursor: fanned ? 'pointer' : isTop ? (dragging === i ? 'grabbing' : 'grab') : 'default', touchAction: 'none',
                  boxShadow: shadow, transition: 'box-shadow 300ms ease', position: 'relative'
                }}>
                <span style={{ display: 'block', position: 'relative', width: '100%', height: imgH, background: placeholder, overflow: 'hidden' }}>
                  <img src={src} alt={cap || `Photo ${i + 1}`} draggable={false} loading={pos < 4 ? 'eager' : 'lazy'}
                    onLoad={() => setLoaded((l) => (l[i] ? l : { ...l, [i]: true }))}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: loaded[i] ? 1 : 0, transform: loaded[i] ? 'scale(1)' : 'scale(1.03)', transition: reduced ? 'none' : 'opacity 700ms ease, transform 900ms ease', pointerEvents: 'none' }} />
                  <span aria-hidden="true" style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.06), inset 0 0 40px rgba(0,0,0,.08)' }} />
                </span>
                {showCaptions && (
                  <span aria-hidden="true" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: capH, gap: 8 }}>
                    <span style={{ fontFamily: hand, fontStyle: captionFont === 'Serif Italic' ? 'italic' : 'normal', fontSize: Math.round(cw * 0.085 * handScale), lineHeight: 1, transform: `rotate(${(rand(i, 4) - 0.5) * 3}deg)`, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 400 }}>{cap}</span>
                    <span style={{ fontFamily: mono, fontSize: Math.max(9, Math.round(cw * 0.028)), color: `${captionInk}88`, letterSpacing: '0.08em', flexShrink: 0 }}>No.{pad2(i + 1)}</span>
                  </span>
                )}
              </button>
            </div>
          </div>
        );
      })}

      {n > 1 && !fanned && hintText && (
        <div aria-hidden="true" style={{ position: 'absolute', zIndex: 30, left: deckX, top: deckY + ch / 2 + (compact ? 30 : 46), transform: 'translateX(-50%)', fontFamily: mono, fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: muted, whiteSpace: 'nowrap', opacity: dragging >= 0 ? 0 : 0.85, transition: 'opacity 300ms' }}>
          &#8592; {hintText} &#8594;
        </div>
      )}
      <div aria-live="polite" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
        {n ? `Photo ${top + 1} of ${n}${captions[top] ? ': ' + captions[top] : ''}` : ''}
      </div>
    </section>
  );
}

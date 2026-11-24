const MANIFEST = {
  "type": "Compose.Constellation",
  "description": "A night-sky chart that composes itself when it enters view: a deterministic star field twinkles in, a constellation brightens, its figure draws line by line over a curved celestial grid, then the Latin name, common name and RA/Dec coordinates settle in. Hover a star for its label",
  "editorElement": {
    "selector": ".constellation-chart",
    "displayName": "Constellation",
    "archetype": "container",
    "data": {
      "preset": { "dataType": "select", "displayName": "Constellation", "defaultValue": "Orion", "options": ["Orion", "Ursa Major", "Cassiopeia", "Cygnus", "Lyra"], "group": "Content" },
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Celestial atlas — Plate VII", "group": "Content" },
      "latinOverride": { "dataType": "text", "displayName": "Latin Name (blank = preset)", "defaultValue": "", "group": "Content" },
      "commonOverride": { "dataType": "text", "displayName": "Common Name (blank = preset)", "defaultValue": "", "group": "Content" },
      "caption": { "dataType": "text", "displayName": "Caption (blank = preset)", "defaultValue": "", "group": "Content" },
      "showStarNames": { "dataType": "booleanValue", "displayName": "Always Show Star Names", "defaultValue": "false", "group": "Content" },
      "skyColor": { "dataType": "color", "displayName": "Sky", "defaultValue": "#07090F", "group": "Colors" },
      "starColor": { "dataType": "color", "displayName": "Stars", "defaultValue": "#F5F2EA", "group": "Colors" },
      "lineColor": { "dataType": "color", "displayName": "Figure Lines (accent)", "defaultValue": "#D6C291", "group": "Colors" },
      "gridColor": { "dataType": "color", "displayName": "Celestial Grid", "defaultValue": "#7F93B8", "group": "Colors" },
      "textColor": { "dataType": "color", "displayName": "Text", "defaultValue": "#ECE9E2", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#878C99", "group": "Colors" },
      "titleFont": { "dataType": "select", "displayName": "Title Font", "defaultValue": "Instrument Serif", "options": ["Instrument Serif", "Fraunces", "Cormorant Garamond", "Georgia"], "group": "Typography" },
      "titleSize": { "dataType": "select", "displayName": "Title Size (px)", "defaultValue": "96", "options": ["64", "80", "96", "112"], "group": "Typography" },
      "sectionHeight": { "dataType": "select", "displayName": "Section Height (px)", "defaultValue": "800", "options": ["720", "800", "900"], "group": "Layout" },
      "chartPosition": { "dataType": "select", "displayName": "Chart Position", "defaultValue": "right", "options": ["right", "center"], "group": "Layout" },
      "starDensity": { "dataType": "select", "displayName": "Star Density", "defaultValue": "medium", "options": ["sparse", "medium", "dense"], "group": "Layout" },
      "seed": { "dataType": "text", "displayName": "Star Field Seed", "defaultValue": "7", "group": "Layout" },
      "showGrid": { "dataType": "booleanValue", "displayName": "Celestial Grid", "defaultValue": "true", "group": "Layout" },
      "showMilkyWay": { "dataType": "booleanValue", "displayName": "Milky Way Glow", "defaultValue": "true", "group": "Layout" },
      "ambientTwinkle": { "dataType": "booleanValue", "displayName": "Ambient Twinkle", "defaultValue": "true", "group": "Animation", "description": "A very subtle shimmer on a few field stars after the chart settles" },
      "triggerMode": { "dataType": "select", "displayName": "Trigger", "defaultValue": "entrance", "options": ["entrance", "scroll", "manual"], "group": "Animation", "description": "entrance = once, scroll = every time it enters view, manual = replay button only" },
      "threshold": { "dataType": "select", "displayName": "Visible Threshold", "defaultValue": "0.25", "options": ["0.1", "0.25", "0.4", "0.6"], "group": "Animation" },
      "speed": { "dataType": "select", "displayName": "Speed", "defaultValue": "1", "options": ["0.5", "0.75", "1", "1.25", "1.5", "2"], "group": "Animation" },
      "showReplay": { "dataType": "booleanValue", "displayName": "Replay Button", "defaultValue": "true", "group": "Animation" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const presetName = config?.preset || 'Orion';
  const eyebrow = config?.eyebrow || 'Celestial atlas — Plate VII';
  const showStarNames = bool(config?.showStarNames, false);
  const sky = config?.skyColor || '#07090F';
  const starC = config?.starColor || '#F5F2EA';
  const lineC = config?.lineColor || '#D6C291';
  const gridC = config?.gridColor || '#7F93B8';
  const textC = config?.textColor || '#ECE9E2';
  const muted = config?.mutedColor || '#878C99';
  const titleFont = config?.titleFont || 'Instrument Serif';
  const titleSize = parseInt(config?.titleSize || '96', 10) || 96;
  const H = parseInt(config?.sectionHeight || '800', 10) || 800;
  const chartPosition = config?.chartPosition || 'right';
  const density = config?.starDensity || 'medium';
  const seed = parseInt(config?.seed || '7', 10) || 7;
  const showGrid = bool(config?.showGrid, true);
  const showMilkyWay = bool(config?.showMilkyWay, true);
  const ambient = bool(config?.ambientTwinkle, true);
  const triggerMode = config?.triggerMode || 'entrance';
  const threshold = parseFloat(config?.threshold || '0.25') || 0.25;
  const speed = Math.max(0.25, parseFloat(config?.speed || '1') || 1);
  const showReplay = bool(config?.showReplay, true);
  const DUR = 2.6;

  // [name, bayer, RA hours, Dec degrees, magnitude]
  const PRESETS = {
    Orion: {
      latin: 'Orion', common: 'The Hunter', area: 594, gen: 'Orionis',
      caption: 'Straddling the celestial equator, the Hunter is visible from every inhabited latitude. His belt points south-east to Sirius.',
      stars: [['Betelgeuse', 'α', 5.919, 7.407, 0.5], ['Rigel', 'β', 5.242, -8.202, 0.13], ['Bellatrix', 'γ', 5.418, 6.35, 1.64], ['Saiph', 'κ', 5.796, -9.67, 2.06],
        ['Alnitak', 'ζ', 5.679, -1.943, 1.77], ['Alnilam', 'ε', 5.604, -1.202, 1.69], ['Mintaka', 'δ', 5.533, -0.299, 2.23], ['Meissa', 'λ', 5.585, 9.934, 3.39],
        ['Tabit', 'π³', 4.83, 6.961, 3.19], ['π⁴ Ori', 'π⁴', 4.853, 5.605, 3.68], ['π² Ori', 'π²', 4.843, 8.9, 4.35], ['π⁵ Ori', 'π⁵', 4.904, 2.441, 3.71],
        ['μ Ori', 'μ', 6.04, 9.648, 4.12], ['ν Ori', 'ν', 6.126, 14.768, 4.42], ['ξ Ori', 'ξ', 6.198, 14.208, 4.45], ['χ¹ Ori', 'χ¹', 5.906, 20.276, 4.39]],
      lines: [[7, 0], [7, 2], [0, 4], [4, 5], [5, 6], [6, 2], [4, 3], [6, 1], [2, 8], [10, 8], [8, 9], [9, 11], [0, 12], [12, 13], [13, 14], [13, 15]]
    },
    'Ursa Major': {
      latin: 'Ursa Major', common: 'The Great Bear', area: 1280, gen: 'Ursae Majoris',
      caption: 'Seven of its stars form the Plough. Follow Merak through Dubhe five times the gap to find Polaris.',
      stars: [['Dubhe', 'α', 11.062, 61.751, 1.79], ['Merak', 'β', 11.031, 56.382, 2.37], ['Phecda', 'γ', 11.897, 53.695, 2.44], ['Megrez', 'δ', 12.257, 57.033, 3.31],
        ['Alioth', 'ε', 12.9, 55.96, 1.77], ['Mizar', 'ζ', 13.399, 54.925, 2.23], ['Alkaid', 'η', 13.792, 49.313, 1.86], ['Muscida', 'ο', 8.504, 60.718, 3.35],
        ['23 UMa', '23', 9.525, 63.062, 3.65], ['υ UMa', 'υ', 9.849, 59.039, 3.8], ['θ UMa', 'θ', 9.548, 51.677, 3.17], ['Talitha', 'ι', 8.987, 48.042, 3.12],
        ['Tania Borealis', 'λ', 10.285, 42.914, 3.45], ['Tania Australis', 'μ', 10.372, 41.499, 3.06], ['χ UMa', 'χ', 11.767, 47.779, 3.69], ['Alula Borealis', 'ν', 11.307, 33.094, 3.48], ['Alula Australis', 'ξ', 11.303, 31.529, 3.79]],
      lines: [[6, 5], [5, 4], [4, 3], [3, 0], [0, 1], [1, 2], [2, 3], [0, 8], [8, 7], [7, 9], [9, 1], [9, 10], [10, 11], [10, 12], [12, 13], [2, 14], [14, 15], [15, 16]]
    },
    Cassiopeia: {
      latin: 'Cassiopeia', common: 'The Queen', area: 598, gen: 'Cassiopeiae',
      caption: 'A bright W that never sets for northern observers, wheeling opposite the Plough around the celestial pole.',
      stars: [['Caph', 'β', 0.153, 59.15, 2.27], ['Schedar', 'α', 0.675, 56.537, 2.24], ['Navi', 'γ', 0.945, 60.717, 2.15], ['Ruchbah', 'δ', 1.43, 60.235, 2.66], ['Segin', 'ε', 1.907, 63.67, 3.35],
        ['Achird', 'η', 0.818, 57.816, 3.44], ['ζ Cas', 'ζ', 0.617, 53.897, 3.66]],
      lines: [[0, 1], [1, 2], [2, 3], [3, 4], [1, 5], [1, 6]]
    },
    Cygnus: {
      latin: 'Cygnus', common: 'The Swan', area: 804, gen: 'Cygni',
      caption: 'The Northern Cross flies along the Milky Way; Deneb marks its tail, Albireo its beak, a gold-and-blue double.',
      stars: [['Deneb', 'α', 20.69, 45.28, 1.25], ['Sadr', 'γ', 20.37, 40.257, 2.23], ['Aljanah', 'ε', 20.77, 33.97, 2.48], ['Fawaris', 'δ', 19.75, 45.131, 2.87],
        ['Albireo', 'β', 19.512, 27.96, 3.05], ['η Cyg', 'η', 19.938, 35.083, 3.89], ['ζ Cyg', 'ζ', 21.216, 30.227, 3.2], ['ι Cyg', 'ι', 19.495, 51.73, 3.79], ['κ Cyg', 'κ', 19.285, 53.368, 3.8]],
      lines: [[0, 1], [1, 5], [5, 4], [3, 1], [1, 2], [2, 6], [3, 7], [7, 8]]
    },
    Lyra: {
      latin: 'Lyra', common: 'The Lyre', area: 286, gen: 'Lyrae',
      caption: 'Small but unmistakable: Vega, fifth-brightest star of the night, hangs above a neat parallelogram of fainter suns.',
      stars: [['Vega', 'α', 18.616, 38.784, 0.03], ['Sheliak', 'β', 18.835, 33.363, 3.52], ['Sulafat', 'γ', 18.982, 32.69, 3.25], ['δ² Lyr', 'δ²', 18.908, 36.899, 4.3],
        ['ζ¹ Lyr', 'ζ¹', 18.746, 37.605, 4.36], ['ε Lyr', 'ε', 18.739, 39.67, 4.67]],
      lines: [[0, 5], [0, 4], [4, 3], [3, 2], [2, 1], [1, 4], [5, 4]]
    }
  };
  const preset = PRESETS[presetName] || PRESETS.Orion;
  const latin = config?.latinOverride || preset.latin;
  const common = config?.commonOverride || preset.common;
  const caption = config?.caption || preset.caption;

  const uid = React.useMemo(() => 'cn' + Math.random().toString(36).slice(2, 9), []);
  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const rootRef = React.useRef(null);
  const animRef = React.useRef(null);
  const playedRef = React.useRef(false);
  const playRef = React.useRef(null);
  const [t, setT] = React.useState(reduced || triggerMode === 'manual' ? 1 : 0);
  const [w, setW] = React.useState(1280);
  const [hover, setHover] = React.useState(-1);

  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    const fams = {
      'Instrument Serif': 'Instrument+Serif:ital@0;1',
      Fraunces: 'Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;1,9..144,300;1,9..144,400',
      'Cormorant Garamond': 'Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400',
      Inter: 'Inter:wght@300;400;500',
      'IBM Plex Mono': 'IBM+Plex+Mono:wght@400;500'
    };
    [titleFont, 'Inter', 'IBM Plex Mono'].forEach((f) => {
      if (!fams[f]) return;
      const id = 'gf-' + f.replace(/\s+/g, '-').toLowerCase() + (f === 'Instrument Serif' || f === 'Fraunces' || f === 'Cormorant Garamond' ? '-it' : '');
      if (document.getElementById(id)) return;
      const l = document.createElement('link');
      l.id = id; l.rel = 'stylesheet';
      l.href = `https://fonts.googleapis.com/css2?family=${fams[f]}&display=swap`;
      document.head.appendChild(l);
    });
  }, [titleFont]);

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return undefined;
    const measure = () => setW(el.clientWidth || 1280);
    measure();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (ro) ro.observe(el);
    window.addEventListener('resize', measure);
    return () => { if (ro) ro.disconnect(); window.removeEventListener('resize', measure); };
  }, []);

  const stop = () => {
    const a = animRef.current;
    if (a && a.raf) cancelAnimationFrame(a.raf);
    animRef.current = null;
  };
  playRef.current = () => {
    stop();
    if (reduced) { setT(1); return; }
    const d = DUR / speed;
    setT(0);
    const a = { raf: 0 };
    const t0 = performance.now();
    const step = (now) => { const v = Math.min(1, Math.max(0, (now - t0) / (d * 1000))); setT(v); a.raf = v < 1 ? requestAnimationFrame(step) : 0; };
    a.raf = requestAnimationFrame(step);
    animRef.current = a;
  };

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return undefined;
    if (triggerMode === 'manual') { if (!animRef.current) setT(1); return () => stop(); }
    if (playedRef.current && triggerMode === 'entrance') setT(1);
    if (typeof IntersectionObserver === 'undefined') { if (!playedRef.current) { playedRef.current = true; playRef.current(); } return () => stop(); }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          if (triggerMode === 'scroll' || !playedRef.current) { playedRef.current = true; playRef.current(); }
        } else if (triggerMode === 'scroll' && !reduced) { stop(); setT(0); }
      });
    }, { threshold });
    io.observe(el);
    return () => { io.disconnect(); stop(); };
  }, [triggerMode, threshold, reduced]); // eslint-disable-line react-hooks/exhaustive-deps

  const W = Math.max(320, w);
  const compact = W < 760;

  const field = React.useMemo(() => {
    let s = (seed * 2654435761) >>> 0;
    const rnd = () => { s = (s + 0x6d2b79f5) >>> 0; let x = s; x = Math.imul(x ^ (x >>> 15), x | 1); x ^= x + Math.imul(x ^ (x >>> 7), x | 61); return ((x ^ (x >>> 14)) >>> 0) / 4294967296; };
    const base = { sparse: 150, medium: 260, dense: 420 }[density] || 260;
    const n = Math.round(base * Math.max(0.45, (W * H) / (1280 * 800)));
    const out = [];
    for (let i = 0; i < n; i++) {
      let x = rnd() * W;
      let y = rnd() * H;
      if (showMilkyWay && i % 3 === 0) {
        const along = rnd();
        const off = (rnd() + rnd() + rnd() - 1.5) * H * 0.16;
        x = along * W * 1.2 - W * 0.1 + off * 0.42;
        y = H * 0.92 - along * H * 0.95 + off;
      }
      const m = Math.pow(rnd(), 3.2);
      out.push({ x, y, r: 0.35 + m * 1.55, o: 0.28 + rnd() * 0.5 + m * 0.3, t0: rnd() * 0.3, tw: rnd() < 0.14, dl: (rnd() * 6).toFixed(2), du: (3 + rnd() * 4).toFixed(2) });
    }
    return out;
  }, [seed, density, W, H, showMilkyWay]);

  const geo = React.useMemo(() => {
    const D = Math.PI / 180;
    const st = preset.stars;
    let sx = 0; let sy = 0; let sz = 0;
    st.forEach((q) => { const a = q[2] * 15 * D; const d = q[3] * D; sx += Math.cos(d) * Math.cos(a); sy += Math.cos(d) * Math.sin(a); sz += Math.sin(d); });
    const a0 = Math.atan2(sy, sx);
    const d0 = Math.atan2(sz, Math.hypot(sx, sy));
    const proj = (a, d) => {
      const da = a - a0;
      const cosc = Math.sin(d0) * Math.sin(d) + Math.cos(d0) * Math.cos(d) * Math.cos(da);
      return [Math.cos(d) * Math.sin(da), Math.cos(d0) * Math.sin(d) - Math.sin(d0) * Math.cos(d) * Math.cos(da), cosc];
    };
    const p1 = st.map((q) => proj(q[2] * 15 * D, q[3] * D));
    const xs = p1.map((p) => p[0]);
    const ys = p1.map((p) => p[1]);
    const xmid = (Math.min(...xs) + Math.max(...xs)) / 2;
    const ymid = (Math.min(...ys) + Math.max(...ys)) / 2;
    const bw = Math.max(...xs) - Math.min(...xs) || 0.01;
    const bh = Math.max(...ys) - Math.min(...ys) || 0.01;
    const region = compact
      ? [24, 72, W - 24, H * 0.6]
      : chartPosition === 'center' ? [W * 0.2, 70, W * 0.8, H - 70] : [W * 0.42, 64, W - 72, H - 64];
    const rw = region[2] - region[0];
    const rh = region[3] - region[1];
    const S = Math.min(rw / bw, rh / bh) * 0.9;
    const rcx = (region[0] + region[2]) / 2;
    const rcy = (region[1] + region[3]) / 2;
    const toScreen = (p) => [rcx - (p[0] - xmid) * S, rcy - (p[1] - ymid) * S];
    const stars = p1.map((p, i) => { const [x, y] = toScreen(p); const q = st[i]; return { x, y, name: q[0], bayer: q[1], mag: q[4] }; });

    const nice = (v, opts) => opts.find((o) => o >= v) || opts[opts.length - 1];
    const degPerPx = 1 / S / D;
    const decStep = nice((rh * degPerPx) / 4.5, [1, 2, 5, 10, 15, 20, 30]);
    const raStepH = nice((rw * degPerPx) / Math.max(0.2, Math.cos(d0)) / 15 / 4, [0.25, 0.5, 1, 2, 3, 4]);
    const R = (Math.hypot(W, H) * degPerPx) * 0.8;
    const dec0 = d0 / D;
    const ra0h = ((a0 / D / 15) + 24) % 24;
    const decLo = Math.max(-88, Math.floor((dec0 - R) / decStep) * decStep);
    const decHi = Math.min(88, Math.ceil((dec0 + R) / decStep) * decStep);
    const raSpan = Math.min(12, R / Math.max(0.15, Math.cos(Math.min(85, Math.abs(dec0) + R * 0.5) * D)) / 15);
    const raLo = Math.floor((ra0h - raSpan) / raStepH) * raStepH;
    const raHi = Math.ceil((ra0h + raSpan) / raStepH) * raStepH;
    const pathOf = (pts) => {
      let d = ''; let pen = false;
      pts.forEach((p) => {
        if (p[2] <= 0.05) { pen = false; return; }
        const [x, y] = toScreen(p);
        if (x < -W || x > 2 * W || y < -H || y > 2 * H) { pen = false; return; }
        d += `${pen ? 'L' : 'M'} ${x.toFixed(1)} ${y.toFixed(1)} `;
        pen = true;
      });
      return d;
    };
    const meridians = [];
    for (let h = raLo; h <= raHi + 1e-6 && meridians.length < 40; h += raStepH) {
      const pts = [];
      for (let k = 0; k <= 60; k++) { const dd = decLo + ((decHi - decLo) * k) / 60; pts.push(proj(h * 15 * D, dd * D)); }
      const d = pathOf(pts);
      let label = null;
      const yb = H - 30;
      for (let k = 0; k < pts.length - 1 && !label; k++) {
        const A = toScreen(pts[k]); const B = toScreen(pts[k + 1]);
        if ((A[1] - yb) * (B[1] - yb) <= 0 && pts[k][2] > 0) { const f = (yb - A[1]) / ((B[1] - A[1]) || 1); label = [A[0] + (B[0] - A[0]) * f, yb]; }
      }
      const hh = ((h % 24) + 24) % 24;
      const hInt = Math.floor(hh + 1e-6);
      const mm = Math.round((hh - hInt) * 60);
      meridians.push({ d, label, text: `${String(hInt).padStart(2, '0')}ʰ${mm ? String(mm).padStart(2, '0') + 'ᵐ' : ''}` });
    }
    const parallels = [];
    for (let dd = decLo; dd <= decHi + 1e-6 && parallels.length < 40; dd += decStep) {
      const pts = [];
      for (let k = 0; k <= 80; k++) { const hh = raLo + ((raHi - raLo) * k) / 80; pts.push(proj(hh * 15 * D, dd * D)); }
      const d = pathOf(pts);
      let label = null;
      const xb = W - 30;
      for (let k = 0; k < pts.length - 1 && !label; k++) {
        const A = toScreen(pts[k]); const B = toScreen(pts[k + 1]);
        if ((A[0] - xb) * (B[0] - xb) <= 0 && pts[k][2] > 0) { const f = (xb - A[0]) / ((B[0] - A[0]) || 1); label = [xb, A[1] + (B[1] - A[1]) * f]; }
      }
      parallels.push({ d, label, text: `${dd > 0 ? '+' : dd < 0 ? '−' : ''}${Math.abs(dd)}°`, eq: Math.abs(dd) < 1e-6 });
    }
    return { stars, meridians, parallels, ra0h, dec0 };
  }, [presetName, W, H, compact, chartPosition]); // eslint-disable-line react-hooks/exhaustive-deps

  const clamp = (v) => Math.min(1, Math.max(0, v));
  const seg = (a, b) => clamp((t - a) / (b - a));
  const eOut = (x) => 1 - Math.pow(1 - x, 3);
  const eBack = (x) => { const c1 = 1.9; const c3 = c1 + 1; return x <= 0 ? 0 : 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };

  const fmtRA = (h) => { const hh = ((h % 24) + 24) % 24; const H0 = Math.floor(hh); const m = Math.round((hh - H0) * 60) % 60; return `${String(H0).padStart(2, '0')}ʰ ${String(m).padStart(2, '0')}ᵐ`; };
  const fmtDec = (d) => { const a = Math.abs(d); const D0 = Math.floor(a); const m = Math.round((a - D0) * 60) % 60; return `${d < 0 ? '−' : '+'}${String(D0).padStart(2, '0')}° ${String(m).padStart(2, '0')}′`; };
  const brightest = geo.stars.reduce((b, s) => (s.mag < b.mag ? s : b), geo.stars[0]);

  const mono = '"IBM Plex Mono", ui-monospace, "SF Mono", Menlo, monospace';
  const sans = '"Inter", -apple-system, "Helvetica Neue", sans-serif';
  const serif = titleFont === 'Georgia' ? 'Georgia, serif' : `"${titleFont}", Georgia, serif`;

  const gridP = eOut(seg(0.16, 0.5));
  const nameP = eOut(seg(0.72, 0.92));
  const coordP = eOut(seg(0.82, 0.99));
  const nStars = geo.stars.length;
  const nLines = preset.lines.length;
  const lineWin = 0.34 / nLines;
  const twinkleOn = ambient && !reduced && t >= 1;
  const tSize = compact ? Math.round(titleSize * 0.62) : titleSize;

  const starR = (mag) => Math.min(5.8, Math.max(1.5, 5.5 - mag * 1.05));

  return (
    <section ref={rootRef} className="constellation-chart" aria-label={`${latin}, ${common}. ${caption}`}
      style={{ position: 'relative', width: '100%', height: `${H}px`, overflow: 'hidden', backgroundColor: sky, color: textC, fontFamily: sans }}>
      <style>{`
        .${uid}-tw{animation:${uid}-k var(--du) ease-in-out var(--dl) infinite alternate}
        @keyframes ${uid}-k{0%{opacity:1}100%{opacity:.35}}
        .${uid}-st{cursor:pointer;outline:none}
        .${uid}-rp{opacity:.6;transition:opacity .2s}.${uid}-rp:hover{opacity:1}.${uid}-rp:focus-visible{opacity:1;outline:2px solid ${lineC};outline-offset:3px}
        @media (prefers-reduced-motion: reduce){.${uid}-tw{animation:none}}
      `}</style>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: 'absolute', inset: 0, display: 'block' }} role="img"
        aria-label={`Star chart of ${latin} with ${nStars} stars`}>
        <defs>
          <radialGradient id={`${uid}-halo`}>
            <stop offset="0" stopColor={starC} stopOpacity="0.55" />
            <stop offset="0.35" stopColor={starC} stopOpacity="0.12" />
            <stop offset="1" stopColor={starC} stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${uid}-mw`}>
            <stop offset="0" stopColor={gridC} stopOpacity="0.16" />
            <stop offset="1" stopColor={gridC} stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${uid}-vig`} cx="0.5" cy="0.5" r="0.75">
            <stop offset="0.6" stopColor={sky} stopOpacity="0" />
            <stop offset="1" stopColor={sky} stopOpacity="0.7" />
          </radialGradient>
        </defs>

        {showMilkyWay && (
          <ellipse cx={W * 0.5} cy={H * 0.45} rx={Math.hypot(W, H) * 0.62} ry={H * 0.2} fill={`url(#${uid}-mw)`}
            transform={`rotate(${(-Math.atan2(H * 0.95, W * 1.2) * 180) / Math.PI} ${W * 0.5} ${H * 0.45})`} opacity={eOut(seg(0, 0.4))} />
        )}

        <g>
          {field.map((s, i) => {
            const p = seg(s.t0, s.t0 + 0.1);
            const flick = p <= 0 ? 0 : p >= 1 ? 1 : Math.min(1, p * 1.4) * (0.65 + 0.35 * Math.abs(Math.sin(p * 9 + i)));
            return (
              <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={starC} fillOpacity={s.o * flick}
                className={twinkleOn && s.tw ? `${uid}-tw` : undefined}
                style={twinkleOn && s.tw ? { '--dl': `${s.dl}s`, '--du': `${s.du}s` } : undefined} />
            );
          })}
        </g>

        {showGrid && (
          <g fill="none" stroke={gridC} strokeWidth={0.7}>
            {geo.meridians.map((m, k) => (
              <path key={'m' + k} d={m.d} strokeOpacity={0.3} pathLength="1" strokeDasharray="1 2" strokeDashoffset={1 - eOut(seg(0.16 + k * 0.012, 0.44 + k * 0.012))} />
            ))}
            {geo.parallels.map((p, k) => (
              <path key={'p' + k} d={p.d} strokeOpacity={p.eq ? 0.5 : 0.3} strokeDasharray={p.eq ? '3 4' : undefined} opacity={gridP} />
            ))}
          </g>
        )}
        {showGrid && (
          <g fontFamily={mono} fontSize={9.5} fill={gridC} opacity={gridP * 0.85}>
            {!compact && geo.meridians.map((m, k) => m.label && m.label[0] > W * 0.42 && m.label[0] < W - 60 && (
              <text key={'ml' + k} x={m.label[0]} y={m.label[1] + 16} textAnchor="middle">{m.text}</text>
            ))}
            {geo.parallels.map((p, k) => p.label && p.label[1] > 70 && p.label[1] < H - 50 && (
              <text key={'pl' + k} x={p.label[0] + 6} y={p.label[1] - 5} textAnchor="end">{p.text}</text>
            ))}
          </g>
        )}
        <rect x={0} y={0} width={W} height={H} fill={`url(#${uid}-vig)`} pointerEvents="none" />

        <g stroke={lineC} strokeWidth={1} fill="none" strokeLinecap="round">
          {preset.lines.map(([a, b], j) => {
            const A = geo.stars[a]; const B = geo.stars[b];
            if (!A || !B) return null;
            const len = Math.hypot(B.x - A.x, B.y - A.y) || 1;
            const ux = (B.x - A.x) / len; const uy = (B.y - A.y) / len;
            const ga = starR(A.mag) + 6; const gb = starR(B.mag) + 6;
            if (len < ga + gb + 4) return null;
            const p = eOut(seg(0.48 + j * lineWin, 0.48 + (j + 1.8) * lineWin));
            const x1 = A.x + ux * ga; const y1 = A.y + uy * ga;
            const x2 = B.x - ux * gb; const y2 = B.y - uy * gb;
            return <line key={j} x1={x1} y1={y1} x2={x1 + (x2 - x1) * p} y2={y1 + (y2 - y1) * p} strokeOpacity={p > 0 ? 0.78 : 0} />;
          })}
        </g>

        {geo.stars.map((s, k) => {
          const p = eBack(seg(0.3 + k * (0.16 / nStars), 0.44 + k * (0.16 / nStars)));
          const r = starR(s.mag);
          const on = hover === k;
          const labelShown = on || (showStarNames && t >= 1);
          const flip = s.x > W - 170;
          return (
            <g key={k} className={`${uid}-st`} tabIndex={0} role="button" aria-label={`${s.name}, ${s.bayer} ${preset.gen}, magnitude ${s.mag}`}
              onMouseEnter={() => setHover(k)} onMouseLeave={() => setHover(-1)} onFocus={() => setHover(k)} onBlur={() => setHover(-1)}>
              <circle cx={s.x} cy={s.y} r={16} fill="transparent" />
              <circle cx={s.x} cy={s.y} r={r * 5 * Math.max(0, p)} fill={`url(#${uid}-halo)`} opacity={on ? 1 : 0.85} />
              {s.mag < 0.8 && (
                <g stroke={starC} strokeWidth={0.6} strokeOpacity={0.4 * clamp(p)}>
                  <line x1={s.x - r * 4.5} y1={s.y} x2={s.x + r * 4.5} y2={s.y} />
                  <line x1={s.x} y1={s.y - r * 4.5} x2={s.x} y2={s.y + r * 4.5} />
                </g>
              )}
              <circle cx={s.x} cy={s.y} r={Math.max(0, r * p)} fill={starC} />
              {on && <circle cx={s.x} cy={s.y} r={r + 7} fill="none" stroke={lineC} strokeWidth={0.8} />}
              {labelShown && (
                <g pointerEvents="none">
                  <line x1={s.x + (flip ? -1 : 1) * (r + 9)} y1={s.y} x2={s.x + (flip ? -1 : 1) * (r + 24)} y2={s.y} stroke={lineC} strokeWidth={0.7} />
                  <text x={s.x + (flip ? -1 : 1) * (r + 30)} y={s.y - 2} textAnchor={flip ? 'end' : 'start'} fontFamily={sans} fontSize={13} fill={textC}>{s.name}</text>
                  <text x={s.x + (flip ? -1 : 1) * (r + 30)} y={s.y + 13} textAnchor={flip ? 'end' : 'start'} fontFamily={mono} fontSize={9.5} fill={muted} letterSpacing="0.06em">{s.bayer} {preset.gen.toUpperCase()} · MAG {s.mag.toFixed(2)}</text>
                </g>
              )}
            </g>
          );
        })}
      </svg>

      <div style={{ position: 'absolute', left: compact ? 22 : 56, top: compact ? 22 : 48, right: compact ? 22 : 'auto', display: 'flex', justifyContent: 'space-between', gap: 24, fontFamily: mono, fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: muted, opacity: eOut(seg(0.05, 0.3)) }}>
        <span>{eyebrow}</span>
      </div>

      <div style={{ position: 'absolute', left: compact ? 22 : 56, right: compact ? 22 : 'auto', bottom: compact ? 26 : 52, maxWidth: compact ? 'none' : Math.max(320, W * 0.34), pointerEvents: 'none' }}>
        <div style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: lineC, opacity: nameP, marginBottom: compact ? 8 : 14 }}>
          {nStars} stars · {preset.area} deg²
        </div>
        <h2 style={{ margin: 0, fontFamily: serif, fontWeight: 400, fontSize: tSize, lineHeight: 0.92, letterSpacing: `${(1 - nameP) * 0.18 - 0.01}em`, opacity: nameP, transform: `translateY(${(1 - nameP) * 14}px)`, color: textC }}>{latin}</h2>
        <div style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 400, fontSize: compact ? 20 : 26, marginTop: compact ? 6 : 10, color: textC, opacity: nameP * 0.82 }}>{common}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: compact ? '6px 18px' : '6px 26px', marginTop: compact ? 14 : 24, fontFamily: mono, fontSize: compact ? 11 : 12, letterSpacing: '0.04em', color: textC, opacity: coordP, transform: `translateY(${(1 - coordP) * 6}px)` }}>
          <span><span style={{ color: muted }}>RA </span>{fmtRA(geo.ra0h)}</span>
          <span><span style={{ color: muted }}>Dec </span>{fmtDec(geo.dec0)}</span>
          <span><span style={{ color: muted }}>Brightest </span>{brightest ? `${brightest.name} ${brightest.mag.toFixed(2)}` : ''}</span>
        </div>
        <p style={{ margin: compact ? '12px 0 0' : '18px 0 0', maxWidth: 380, fontSize: compact ? 12.5 : 14, lineHeight: 1.55, color: muted, opacity: coordP }}>{caption}</p>
      </div>

      {showReplay && (
        <button type="button" className={`${uid}-rp`} aria-label="Replay star chart animation"
          onClick={() => { playedRef.current = true; playRef.current(); }}
          style={{ position: 'absolute', right: compact ? 22 : 56, top: compact ? 16 : 42, appearance: 'none', border: `1px solid ${muted}`, background: 'transparent', color: textC, borderRadius: 999, padding: '5px 11px', fontFamily: mono, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer', visibility: t >= 1 ? 'visible' : 'hidden' }}>
          ↻ Replay
        </button>
      )}
    </section>
  );
}

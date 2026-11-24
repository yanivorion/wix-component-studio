const MANIFEST = {
  "type": "Scrub.HorizontalPanorama",
  "description": "Vertical scroll drives a horizontal journey across a procedural five-layer landscape: parallax ridges, hills, forests and grass slide at different rates while a route draws along the ground, milestone cards rise as their markers pass centre, and the light shifts from dawn to dusk",
  "editorElement": {
    "selector": ".horizontal-panorama",
    "displayName": "Horizontal Panorama",
    "archetype": "container",
    "data": {
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Route 04 / 1908 – 2026", "group": "Content" },
      "title": { "dataType": "text", "displayName": "Title", "defaultValue": "The long way across", "group": "Content" },
      "description": { "dataType": "text", "displayName": "Description", "defaultValue": "A century of crossing one valley, from the first survey chain to the last viaduct.", "group": "Content" },
      "milestones": { "dataType": "text", "displayName": "Milestones (comma-separated, year then title)", "defaultValue": "1908 The first survey, 1921 A bridge at the narrows, 1946 Through the ridge, 1968 The line is electrified, 1994 The high viaduct, 2026 Full circle", "group": "Milestones" },
      "milestoneNotes": { "dataType": "text", "displayName": "Milestone Notes (separated by |)", "defaultValue": "Two surveyors walk the valley floor with a chain, a level and a notebook. | Timber gives way to stone where the river is narrowest. | Eleven hundred metres of tunnel cut the journey in half. | Overhead wires arrive, and the valley hears a new, quieter train. | A curved viaduct lifts the line above the spring floods. | The route is walked again, end to end, exactly as it was surveyed.", "group": "Milestones" },
      "totalDistance": { "dataType": "text", "displayName": "Total Distance", "defaultValue": "184", "group": "Readout" },
      "distanceUnit": { "dataType": "select", "displayName": "Distance Unit", "defaultValue": "km", "options": ["km", "mi"], "group": "Readout" },
      "elevationMin": { "dataType": "text", "displayName": "Lowest Elevation (m)", "defaultValue": "220", "group": "Readout" },
      "elevationMax": { "dataType": "text", "displayName": "Highest Elevation (m)", "defaultValue": "1460", "group": "Readout" },
      "skyColor": { "dataType": "color", "displayName": "Sky", "defaultValue": "#F5F5F4", "group": "Colors" },
      "sunColor": { "dataType": "color", "displayName": "Sun Disc", "defaultValue": "#FFFFFF", "group": "Colors" },
      "farColor": { "dataType": "color", "displayName": "Far Mountains", "defaultValue": "#D6D3D1", "group": "Colors" },
      "midColor": { "dataType": "color", "displayName": "Mid Hills", "defaultValue": "#A8A29E", "group": "Colors" },
      "nearColor": { "dataType": "color", "displayName": "Trees & Structures", "defaultValue": "#78716C", "group": "Colors" },
      "groundColor": { "dataType": "color", "displayName": "Foreground", "defaultValue": "#292524", "group": "Colors" },
      "inkColor": { "dataType": "color", "displayName": "Ink", "defaultValue": "#1C1917", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Route Accent", "defaultValue": "#C2410C", "group": "Colors" },
      "duskColor": { "dataType": "color", "displayName": "Dusk Tint", "defaultValue": "#44403C", "group": "Colors" },
      "displayFont": { "dataType": "select", "displayName": "Display Font", "defaultValue": "Fraunces", "options": ["Fraunces", "Instrument Serif", "Inter", "Georgia"], "group": "Typography" },
      "fontFamily": { "dataType": "select", "displayName": "Text Font", "defaultValue": "Inter", "options": ["Inter", "system-ui", "Helvetica Neue", "Georgia"], "group": "Typography" },
      "scrollLength": { "dataType": "select", "displayName": "Scroll Length (screens)", "defaultValue": "6", "options": ["4", "5", "6", "8", "10"], "group": "Layout" },
      "showSun": { "dataType": "booleanValue", "displayName": "Sun Disc", "defaultValue": "true", "group": "Layout" },
      "showStructures": { "dataType": "booleanValue", "displayName": "Structures", "defaultValue": "true", "group": "Layout" },
      "showReadout": { "dataType": "booleanValue", "displayName": "Distance Readout", "defaultValue": "true", "group": "Layout" },
      "showProfile": { "dataType": "booleanValue", "displayName": "Elevation Profile", "defaultValue": "true", "group": "Layout" },
      "tonalShift": { "dataType": "select", "displayName": "Dawn-to-Dusk Shift", "defaultValue": "subtle", "options": ["none", "subtle", "full"], "group": "Animation" },
      "parallaxDepth": { "dataType": "select", "displayName": "Parallax Depth", "defaultValue": "medium", "options": ["low", "medium", "high"], "group": "Animation" },
      "seed": { "dataType": "text", "displayName": "Landscape Seed", "defaultValue": "7", "group": "Animation", "description": "Any number; changes the generated terrain" },
      "smoothing": { "dataType": "select", "displayName": "Scrub Smoothing", "defaultValue": "0.12", "options": ["0.06", "0.12", "0.2", "1"], "group": "Animation", "description": "1 = locked to the scrollbar, lower = more glide" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const eyebrow = config?.eyebrow || 'Route 04 / 1908 – 2026';
  const title = config?.title || 'The long way across';
  const description = config?.description || 'A century of crossing one valley, from the first survey chain to the last viaduct.';
  const milestonesRaw = config?.milestones || '1908 The first survey, 1921 A bridge at the narrows, 1946 Through the ridge, 1968 The line is electrified, 1994 The high viaduct, 2026 Full circle';
  const notesRaw = config?.milestoneNotes || 'Two surveyors walk the valley floor with a chain, a level and a notebook. | Timber gives way to stone where the river is narrowest. | Eleven hundred metres of tunnel cut the journey in half. | Overhead wires arrive, and the valley hears a new, quieter train. | A curved viaduct lifts the line above the spring floods. | The route is walked again, end to end, exactly as it was surveyed.';
  const totalDistance = parseFloat(config?.totalDistance || '184') || 184;
  const unit = config?.distanceUnit || 'km';
  const elevMin = parseFloat(config?.elevationMin || '220') || 0;
  const elevMax = parseFloat(config?.elevationMax || '1460') || 1000;
  const sky = config?.skyColor || '#F5F5F4';
  const sunColor = config?.sunColor || '#FFFFFF';
  const farC = config?.farColor || '#D6D3D1';
  const midC = config?.midColor || '#A8A29E';
  const nearC = config?.nearColor || '#78716C';
  const groundC = config?.groundColor || '#292524';
  const ink = config?.inkColor || '#1C1917';
  const accent = config?.accentColor || '#C2410C';
  const dusk = config?.duskColor || '#44403C';
  const displayFont = config?.displayFont || 'Fraunces';
  const fontFamily = config?.fontFamily || 'Inter';
  const screens = parseFloat(config?.scrollLength || '6') || 6;
  const showSun = bool(config?.showSun, true);
  const showStructures = bool(config?.showStructures, true);
  const showReadout = bool(config?.showReadout, true);
  const showProfile = bool(config?.showProfile, true);
  const shiftAmt = { none: 0, subtle: 0.6, full: 1 }[config?.tonalShift || 'subtle'] ?? 0.6;
  const depthMul = { low: 0.7, medium: 1, high: 1.35 }[config?.parallaxDepth || 'medium'] || 1;
  const seed = Math.abs(parseInt(config?.seed || '7', 10) || 7);
  const smoothing = Math.min(1, Math.max(0.02, parseFloat(config?.smoothing || '0.12')));

  const milestones = React.useMemo(() => {
    const notes = notesRaw.split('|').map((s) => s.trim());
    return milestonesRaw.split(',').map((s) => s.trim()).filter(Boolean).slice(0, 12).map((s, i) => {
      const m = s.match(/^(\S+)\s+(.*)$/);
      return { year: m ? m[1] : String(i + 1), title: m ? m[2] : s, note: notes[i] || '' };
    });
  }, [milestonesRaw, notesRaw]);
  const n = milestones.length;

  const uid = React.useMemo(() => 'hp' + Math.random().toString(36).slice(2, 9), []);
  const prefersReducedMotion = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  React.useEffect(() => {
    const id = 'ncs-font-fraunces-inter';
    if (typeof document === 'undefined' || document.getElementById(id)) return;
    const l = document.createElement('link');
    l.id = id; l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..500&family=Instrument+Serif&family=Inter:wght@300;400;500&display=swap';
    document.head.appendChild(l);
  }, []);

  const sectionRef = React.useRef(null);
  const target = React.useRef(0);
  const current = React.useRef(0);
  const [progress, setProgress] = React.useState(0);
  const [stageH, setStageH] = React.useState(720);
  const [width, setWidth] = React.useState(1280);

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
    const onScroll = () => {
      read();
      if (prefersReducedMotion) { current.current = target.current; setProgress(target.current); return; }
      if (!raf) raf = requestAnimationFrame(tick);
    };
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
  }, [smoothing, prefersReducedMotion]);

  const clamp = (v) => Math.min(1, Math.max(0, v));
  const ease = (t) => 1 - Math.pow(1 - t, 3);
  const mix = (a, b, t) => {
    const p = (h) => {
      let s = String(h).replace('#', '');
      if (s.length === 3) s = s.split('').map((c) => c + c).join('');
      const v = parseInt(s.slice(0, 6), 16);
      return Number.isFinite(v) && s.length >= 6 ? [(v >> 16) & 255, (v >> 8) & 255, v & 255] : null;
    };
    const A = p(a), B = p(b);
    if (!A || !B) return a;
    const c = A.map((x, i) => Math.round(x + (B[i] - x) * t));
    return `rgb(${c[0]},${c[1]},${c[2]})`;
  };

  const W = width;
  const H = stageH;
  const compact = W < 760;
  const spacing = Math.max(compact ? W * 1.05 : W * 0.6, 420);
  const T = Math.round(Math.max(W * 3, Math.max(1, n - 1) * spacing));
  const rates = [0.035, 0.11 * depthMul, 0.3 * depthMul, 0.6 * depthMul, 1];

  const geo = React.useMemo(() => {
    const mulberry = (a) => () => {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    const makeNoise = (rng) => {
      const v = [];
      const at = (i) => { while (v.length <= i) v.push(rng()); return v[i]; };
      const n1 = (x) => {
        const i = Math.floor(Math.max(0, x));
        const f = Math.max(0, x) - i;
        const u = f * f * (3 - 2 * f);
        return at(i) * (1 - u) + at(i + 1) * u;
      };
      return (x, oct) => {
        let sum = 0, amp = 0.5, norm = 0, fr = 1;
        for (let o = 0; o < oct; o++) { sum += n1(x * fr) * amp; norm += amp; amp *= 0.5; fr *= 2.03; }
        return sum / norm;
      };
    };
    const widthOf = (k) => Math.ceil(W + T * rates[k] + 120);
    const f = (v) => v.toFixed(1);
    const ridge = (k, base, amp, scale, oct, ridged, step) => {
      const nz = makeNoise(mulberry(seed * 977 + k * 131));
      const w = widthOf(k);
      let d = `M 0 ${f(H)}`;
      const ys = [];
      for (let x = 0; x <= w; x += step) {
        let v = nz(x / scale, oct);
        if (ridged) v = 1 - Math.abs(v * 2 - 1);
        const y = base - amp * v;
        ys.push(y);
        d += ` L ${f(x)} ${f(y)}`;
      }
      d += ` L ${f(w)} ${f(H)} Z`;
      return { d, ys, step };
    };
    const far = ridge(1, H * 0.66, H * 0.3, 230, 4, true, 6);
    const mid = ridge(2, H * 0.72, H * 0.14, 420, 3, false, 8);
    const near = ridge(3, H * 0.77, H * 0.05, 520, 2, false, 10);
    const fgNoise = makeNoise(mulberry(seed * 977 + 4 * 131));
    const fgBase = H * 0.83;
    const fgAmp = H * 0.06;
    const gf = (x) => fgNoise(x / 780, 3);
    const g = (x) => fgBase - fgAmp * gf(x);
    const fw = widthOf(4);
    let fg = `M 0 ${f(H)}`;
    for (let x = 0; x <= fw; x += 10) fg += ` L ${f(x)} ${f(g(x))}`;
    fg += ` L ${f(fw)} ${f(H)} Z`;

    // trees and structures along the near ridge
    const rng = mulberry(seed * 31 + 5);
    const nearY = (x) => near.ys[Math.min(near.ys.length - 1, Math.max(0, Math.round(x / near.step)))];
    const tScale = Math.max(0.7, Math.min(1.25, H / 760));
    let trees = '';
    let nextStructure = 380 + rng() * 300;
    for (let x = 10; x < widthOf(3); ) {
      const y = nearY(x) + 2;
      if (showStructures && x > nextStructure) {
        const kind = Math.floor(rng() * 4);
        const s = tScale;
        if (kind === 0) {
          const w = 30 * s, h = 20 * s;
          trees += ` M ${f(x)} ${f(y)} V ${f(y - h)} L ${f(x + w / 2)} ${f(y - h - 14 * s)} L ${f(x + w)} ${f(y - h)} V ${f(y)} Z`;
          trees += ` M ${f(x + w + 4)} ${f(y)} V ${f(y - h * 0.7)} H ${f(x + w + 22 * s)} V ${f(y)} Z`;
          x += w + 40 * s;
        } else if (kind === 1) {
          const h = 92 * s;
          trees += ` M ${f(x)} ${f(y)} L ${f(x + 5 * s)} ${f(y - h)} H ${f(x + 8 * s)} L ${f(x + 13 * s)} ${f(y)} Z M ${f(x + 6 * s)} ${f(y - h)} V ${f(y - h - 16 * s)} H ${f(x + 7 * s)} V ${f(y - h)} Z`;
          x += 34 * s;
        } else if (kind === 2) {
          const h = 64 * s, cx = x + 8 * s, cy = y - h;
          trees += ` M ${f(x)} ${f(y)} L ${f(x + 5 * s)} ${f(cy)} H ${f(x + 11 * s)} L ${f(x + 16 * s)} ${f(y)} Z`;
          for (let b = 0; b < 4; b++) {
            const a = (b * Math.PI) / 2 + 0.35;
            const L = 34 * s, wd = 3.2 * s;
            const ex = cx + Math.cos(a) * L, ey = cy + Math.sin(a) * L;
            const nx = -Math.sin(a) * wd, ny = Math.cos(a) * wd;
            trees += ` M ${f(cx)} ${f(cy)} L ${f(ex + nx)} ${f(ey + ny)} L ${f(ex)} ${f(ey)} Z`;
          }
          x += 44 * s;
        } else {
          const w = 22 * s, h = 34 * s;
          trees += ` M ${f(x)} ${f(y)} V ${f(y - h)} L ${f(x + w / 2)} ${f(y - h - 40 * s)} L ${f(x + w)} ${f(y - h)} V ${f(y)} Z`;
          trees += ` M ${f(x + w)} ${f(y)} V ${f(y - h * 0.6)} H ${f(x + w + 34 * s)} V ${f(y)} Z`;
          x += w + 52 * s;
        }
        nextStructure = x + 520 + rng() * 520;
        continue;
      }
      if (rng() < 0.08) { x += 50 + rng() * 120; continue; }
      const h = (18 + rng() * 40) * tScale;
      if (rng() < 0.68) {
        const w = h * (0.32 + rng() * 0.12);
        trees += ` M ${f(x - w / 2)} ${f(y)} L ${f(x)} ${f(y - h)} L ${f(x + w / 2)} ${f(y)} Z`;
      } else {
        const r = h * 0.28;
        trees += ` M ${f(x - 1)} ${f(y)} V ${f(y - h + r * 2)} H ${f(x + 1)} V ${f(y)} Z M ${f(x - r)} ${f(y - h + r)} a ${f(r)} ${f(r)} 0 1 0 ${f(2 * r)} 0 a ${f(r)} ${f(r)} 0 1 0 ${f(-2 * r)} 0 Z`;
      }
      x += 9 + rng() * 22;
    }

    // grass blades along the foreground
    let grass = '';
    for (let x = 0; x < fw; x += 4 + rng() * 6) {
      const y = g(x) + 3;
      const h = 5 + rng() * 15 * tScale;
      const lean = (rng() - 0.4) * 6;
      grass += ` M ${f(x)} ${f(y)} L ${f(x + lean)} ${f(y - h)} L ${f(x + 1.8)} ${f(y)} Z`;
    }

    const drop = Math.max(10, H * 0.03);
    const routeEnd = W / 2 + T + 60;
    let route = '';
    for (let x = 0; x <= routeEnd; x += 12) route += `${x === 0 ? 'M' : ' L'} ${f(x)} ${f(g(x) + drop)}`;

    const profile = [];
    for (let k = 0; k <= 100; k++) profile.push(gf(W / 2 + (T * k) / 100));
    return { far: far.d, mid: mid.d, near: near.d, trees, fg, grass, route, g, gf, drop, profile };
  }, [W, H, T, seed, showStructures, depthMul]); // eslint-disable-line react-hooks/exhaustive-deps

  const p = progress;
  const shift = shiftAmt * ease(p);
  const tone = (c, k) => mix(c, dusk, shift * k);
  const skyNow = tone(sky, 0.5);
  const skyTop = mix(sky, '#FFFFFF', 0.55 * (1 - shift));
  const pc = clamp((p - 0.03) / 0.94);
  const camX = pc * T;

  const msX = (i) => W / 2 + T * (n > 1 ? i / (n - 1) : 0);
  const routeY = (x) => geo.g(x) + geo.drop;
  const travellerX = W / 2 + camX;
  const travellerY = routeY(travellerX);
  const winR = Math.min(W * 0.3, spacing * 0.5);
  const winL = Math.min(W * 0.17, spacing * 0.35);
  const vis = (sx) => { const d = sx - W / 2; return 1 - clamp(Math.abs(d) / (d < 0 ? winL : winR)); };

  const sunT = 0.24 + 0.6 * p;
  const sunX = compact ? W * (0.2 + 0.6 * p) : W * (0.7 + 0.18 * p);
  const sunY = compact ? H * 0.6 - Math.sin(Math.PI * sunT) * H * 0.12 : H * 0.62 - Math.sin(Math.PI * sunT) * H * 0.3;
  const sunR = Math.min(W, H) * (compact ? 0.11 : 0.075);

  const mono = 'ui-monospace, "SF Mono", "IBM Plex Mono", Menlo, monospace';
  const sans = fontFamily === 'Georgia' ? 'Georgia, serif' : `${fontFamily}, -apple-system, "Helvetica Neue", sans-serif`;
  const display = displayFont === 'Georgia' ? 'Georgia, serif' : displayFont === 'Inter'
    ? 'Inter, -apple-system, "Helvetica Neue", sans-serif' : `"${displayFont}", Georgia, "Times New Roman", serif`;

  const elev = Math.round(elevMin + (elevMax - elevMin) * geo.gf(travellerX));
  const dist = (totalDistance * pc).toFixed(1);
  const light = mix(sky, '#FFFFFF', 0.3);

  const cardTop = compact ? H * 0.25 : H * 0.17;
  const cardW = compact ? W - 40 : 320;
  const prof = geo.profile;
  const profW = compact ? 120 : 200, profH = compact ? 30 : 40;
  const profD = prof.map((v, k) => `${k ? 'L' : 'M'} ${(profW * k / 100).toFixed(1)} ${(profH - v * profH).toFixed(1)}`).join(' ');
  const pk = Math.round(pc * 100);

  return (
    <section ref={sectionRef} className="horizontal-panorama" aria-label={title}
      style={{ position: 'relative', width: '100%', height: `${Math.round(H * screens)}px`, backgroundColor: skyNow, color: ink, fontFamily: sans }}>
      <div style={{ position: 'sticky', top: 0, height: `${H}px`, overflow: 'hidden' }}>
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Landscape journey with ${n} milestones`} style={{ position: 'absolute', inset: 0, display: 'block' }}>
          <defs>
            <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={skyTop} />
              <stop offset="0.75" stopColor={skyNow} />
            </linearGradient>
            <linearGradient id={`${uid}-haze`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={skyNow} stopOpacity="0" />
              <stop offset="1" stopColor={skyNow} stopOpacity="0.55" />
            </linearGradient>
            <clipPath id={`${uid}-drawn`}>
              <rect x={0} y={0} width={travellerX} height={H} />
            </clipPath>
          </defs>
          <rect width={W} height={H} fill={`url(#${uid}-sky)`} />
          {showSun && (
            <g transform={`translate(${sunX} ${sunY})`}>
              <circle r={sunR * 2.4} fill={sunColor} opacity={0.18 * (1 - shift * 0.6)} />
              <circle r={sunR} fill={mix(sunColor, accent, shift * 0.35)} />
              {[1.35, 1.75].map((k) => <circle key={k} r={sunR * k} fill="none" stroke={ink} strokeOpacity="0.12" strokeWidth="0.75" />)}
            </g>
          )}
          <g transform={`translate(${-camX * rates[1]} 0)`}>
            <path d={geo.far} fill={tone(farC, 0.35)} />
          </g>
          <rect x={0} y={H * 0.45} width={W} height={H * 0.25} fill={`url(#${uid}-haze)`} />
          <g transform={`translate(${-camX * rates[2]} 0)`}>
            <path d={geo.mid} fill={tone(midC, 0.35)} />
          </g>
          <g transform={`translate(${-camX * rates[3]} 0)`}>
            <path d={geo.near} fill={tone(nearC, 0.3)} />
            <path d={geo.trees} fill={tone(nearC, 0.3)} />
          </g>
          <g transform={`translate(${-camX} 0)`}>
            <path d={geo.fg} fill={tone(groundC, 0.2)} />
            <path d={geo.grass} fill={tone(groundC, 0.2)} />
            <path d={geo.route} fill="none" stroke={light} strokeOpacity="0.35" strokeWidth="1.25" strokeDasharray="2 6" strokeLinecap="round" />
            <path d={geo.route} fill="none" stroke={light} strokeWidth="2" strokeLinecap="round" clipPath={`url(#${uid}-drawn)`} />
            {milestones.map((m, i) => {
              const x = msX(i);
              const y = routeY(x);
              const passed = travellerX >= x - 1;
              return (
                <g key={i}>
                  <line x1={x} y1={y} x2={x} y2={y - 30} stroke={light} strokeWidth="1" />
                  <circle cx={x} cy={y} r={5} fill={passed ? light : tone(groundC, 0.2)} stroke={light} strokeWidth="1.5" />
                  <text x={x + 6} y={y - 22} fill={light} fontFamily={mono} fontSize="10" letterSpacing="1.2">{m.year}</text>
                </g>
              );
            })}
          </g>
          {milestones.map((m, i) => {
            const sx = msX(i) - camX;
            const v = vis(sx);
            if (v <= 0) return null;
            const e = ease(v);
            const y2 = routeY(msX(i)) - 32;
            const y1 = cardTop + (compact ? 150 : 170) + (1 - e) * 24;
            return <line key={i} x1={sx} y1={y1} x2={sx} y2={y2} stroke={ink} strokeOpacity={0.45 * e} strokeWidth="0.75" strokeDasharray="1 3" />;
          })}
          <circle cx={W / 2} cy={travellerY} r={12} fill={accent} opacity="0.18" />
          <circle cx={W / 2} cy={travellerY} r={5.5} fill={accent} stroke={light} strokeWidth="2" />
        </svg>

        <div style={{ position: 'absolute', top: compact ? 22 : 44, left: compact ? 20 : 56, maxWidth: compact ? W - 40 : 470, zIndex: 3 }}>
          <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: mix(ink, sky, 0.35) }}>{eyebrow}</div>
          <h2 style={{ margin: compact ? '8px 0 0' : '14px 0 0', fontFamily: display, fontWeight: 300, fontSize: compact ? 30 : 46, lineHeight: 1.02, letterSpacing: '-0.025em' }}>{title}</h2>
          {!compact && <p style={{ margin: '14px 0 0', fontSize: 14.5, lineHeight: 1.55, color: mix(ink, sky, 0.3), maxWidth: 320 }}>{description}</p>}
        </div>

        {milestones.map((m, i) => {
          const sx = msX(i) - camX;
          const v = vis(sx);
          if (v <= 0) return null;
          const e = ease(v);
          return (
            <div key={i} aria-hidden={v < 0.5} style={{
              position: 'absolute', left: sx - cardW / 2, top: cardTop, width: cardW, zIndex: 2,
              opacity: e, transform: `translateY(${(1 - e) * 28}px)`, textAlign: 'center', pointerEvents: 'none'
            }}>
              <div style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: '0.18em', color: accent, textTransform: 'uppercase' }}>Milestone {String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</div>
              <div style={{ fontFamily: display, fontWeight: 300, fontSize: compact ? 58 : 76, lineHeight: 0.95, letterSpacing: '-0.03em', marginTop: 8, fontVariantNumeric: 'lining-nums' }}>{m.year}</div>
              <div style={{ fontSize: compact ? 17 : 18, fontWeight: 500, marginTop: 10, letterSpacing: '-0.01em' }}>{m.title}</div>
              {m.note && <div style={{ fontSize: 13.5, lineHeight: 1.5, marginTop: 6, color: mix(ink, sky, 0.28), maxWidth: 300, marginLeft: 'auto', marginRight: 'auto' }}>{m.note}</div>}
            </div>
          );
        })}

        {showReadout && (
          <div aria-live="polite" style={{ position: 'absolute', left: compact ? 20 : 56, bottom: compact ? 22 : 36, zIndex: 3, color: light, display: 'flex', gap: compact ? 22 : 40 }}>
            <div>
              <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.6 }}>Distance</div>
              <div style={{ fontFamily: display, fontWeight: 300, fontSize: compact ? 26 : 34, lineHeight: 1.1, fontVariantNumeric: 'tabular-nums', marginTop: 4 }}>
                {dist}<span style={{ fontFamily: mono, fontSize: 11, marginLeft: 6, opacity: 0.6 }}>{unit}</span>
              </div>
            </div>
            <div>
              <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.6 }}>Elevation</div>
              <div style={{ fontFamily: display, fontWeight: 300, fontSize: compact ? 26 : 34, lineHeight: 1.1, fontVariantNumeric: 'tabular-nums', marginTop: 4 }}>
                {elev.toLocaleString('en-US')}<span style={{ fontFamily: mono, fontSize: 11, marginLeft: 6, opacity: 0.6 }}>m</span>
              </div>
            </div>
          </div>
        )}
        {showProfile && !(compact && showReadout && W < 360) && (
          <div aria-hidden="true" style={{ position: 'absolute', right: compact ? 20 : 56, bottom: compact ? 24 : 40, zIndex: 3, color: light, textAlign: 'right' }}>
            <svg width={profW} height={profH + 2} style={{ display: 'block', overflow: 'visible' }}>
              <path d={`${profD} L ${profW} ${profH} L 0 ${profH} Z`} fill={light} fillOpacity="0.08" />
              <path d={profD} fill="none" stroke={light} strokeOpacity="0.5" strokeWidth="1" />
              {milestones.map((_, i) => {
                const k = n > 1 ? i / (n - 1) : 0;
                return <line key={i} x1={profW * k} x2={profW * k} y1={profH} y2={profH + 4} stroke={light} strokeOpacity="0.6" />;
              })}
              <circle cx={profW * pc} cy={profH - prof[pk] * profH} r={3.5} fill={accent} stroke={light} strokeWidth="1.5" />
            </svg>
            <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.16em', opacity: 0.6, marginTop: 8, textTransform: 'uppercase' }}>Profile · {String(pk).padStart(3, '0')}%</div>
          </div>
        )}
      </div>
    </section>
  );
}

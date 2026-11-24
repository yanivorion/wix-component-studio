const MANIFEST = {
  "type": "Scrub.OrbitalTime",
  "description": "Scroll is time: an engraved orrery where scrolling advances the calendar, planets travel Keplerian elliptical orbits at true relative periods with drawn trails, a date and day counter scrub, perihelion and conjunction labels pop, and the decade ends in a planetary alignment",
  "editorElement": {
    "selector": ".orbital-time",
    "displayName": "Orbital Time",
    "archetype": "container",
    "data": {
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Ephemeris / Plate VII", "group": "Content" },
      "title": { "dataType": "text", "displayName": "Title", "defaultValue": "A decade, wound by hand", "group": "Content" },
      "subtitle": { "dataType": "text", "displayName": "Subtitle", "defaultValue": "Scroll to advance the calendar. Each body keeps its own year.", "group": "Content" },
      "alignmentLabel": { "dataType": "text", "displayName": "Alignment Label", "defaultValue": "Syzygy — all bodies in line", "group": "Content" },
      "startYear": { "dataType": "number", "displayName": "Start Year", "defaultValue": "2026", "group": "Time" },
      "yearsCovered": { "dataType": "select", "displayName": "Years Covered", "defaultValue": "12", "options": ["2", "4", "8", "12", "20", "30"], "group": "Time" },
      "body1Name": { "dataType": "text", "displayName": "Body 1 Name", "defaultValue": "Mercury", "group": "Bodies" },
      "body1Color": { "dataType": "color", "displayName": "Body 1 Colour", "defaultValue": "#A8A29E", "group": "Bodies" },
      "body1Period": { "dataType": "number", "displayName": "Body 1 Period (days)", "defaultValue": "87.97", "group": "Bodies" },
      "body2Name": { "dataType": "text", "displayName": "Body 2 Name", "defaultValue": "Venus", "group": "Bodies" },
      "body2Color": { "dataType": "color", "displayName": "Body 2 Colour", "defaultValue": "#E7D8C3", "group": "Bodies" },
      "body2Period": { "dataType": "number", "displayName": "Body 2 Period (days)", "defaultValue": "224.7", "group": "Bodies" },
      "body3Name": { "dataType": "text", "displayName": "Body 3 Name", "defaultValue": "Earth", "group": "Bodies" },
      "body3Color": { "dataType": "color", "displayName": "Body 3 Colour", "defaultValue": "#9DB8C7", "group": "Bodies" },
      "body3Period": { "dataType": "number", "displayName": "Body 3 Period (days)", "defaultValue": "365.25", "group": "Bodies" },
      "body4Name": { "dataType": "text", "displayName": "Body 4 Name", "defaultValue": "Mars", "group": "Bodies" },
      "body4Color": { "dataType": "color", "displayName": "Body 4 Colour", "defaultValue": "#C98B6B", "group": "Bodies" },
      "body4Period": { "dataType": "number", "displayName": "Body 4 Period (days)", "defaultValue": "686.98", "group": "Bodies" },
      "body5Name": { "dataType": "text", "displayName": "Body 5 Name", "defaultValue": "Jupiter", "group": "Bodies" },
      "body5Color": { "dataType": "color", "displayName": "Body 5 Colour", "defaultValue": "#D9C4A3", "group": "Bodies" },
      "body5Period": { "dataType": "number", "displayName": "Body 5 Period (days)", "defaultValue": "4332.6", "group": "Bodies" },
      "body6Name": { "dataType": "text", "displayName": "Body 6 Name", "defaultValue": "Saturn", "group": "Bodies" },
      "body6Color": { "dataType": "color", "displayName": "Body 6 Colour", "defaultValue": "#BDB39C", "group": "Bodies" },
      "body6Period": { "dataType": "number", "displayName": "Body 6 Period (days)", "defaultValue": "10759", "group": "Bodies" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#0C0C0D", "group": "Colors" },
      "textColor": { "dataType": "color", "displayName": "Text", "defaultValue": "#FAFAF9", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#A8A29E", "group": "Colors" },
      "orbitColor": { "dataType": "color", "displayName": "Orbit Lines", "defaultValue": "#57534E", "group": "Colors" },
      "sunColor": { "dataType": "color", "displayName": "Sun / Accent", "defaultValue": "#F5E6C8", "group": "Colors" },
      "viewTilt": { "dataType": "select", "displayName": "View", "defaultValue": "tilted", "options": ["flat", "tilted", "oblique"], "group": "Layout" },
      "showTrails": { "dataType": "booleanValue", "displayName": "Orbital Trails", "defaultValue": "true", "group": "Layout" },
      "showLabels": { "dataType": "booleanValue", "displayName": "Milestone Labels", "defaultValue": "true", "group": "Layout" },
      "showRing": { "dataType": "booleanValue", "displayName": "Longitude Ring", "defaultValue": "true", "group": "Layout" },
      "scrollLength": { "dataType": "select", "displayName": "Scroll Length (screens)", "defaultValue": "6", "options": ["3", "4", "5", "6", "8"], "group": "Layout" },
      "smoothing": { "dataType": "select", "displayName": "Scrub Smoothing", "defaultValue": "0.12", "options": ["0.08", "0.12", "0.2", "1"], "group": "Animation", "description": "1 = locked to the scrollbar, lower = more glide" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const eyebrow = config?.eyebrow || 'Ephemeris / Plate VII';
  const title = config?.title || 'A decade, wound by hand';
  const subtitle = config?.subtitle || 'Scroll to advance the calendar. Each body keeps its own year.';
  const alignmentLabel = config?.alignmentLabel || 'Syzygy — all bodies in line';
  const startYear = parseInt(config?.startYear || '2026', 10) || 2026;
  const years = Math.max(1, parseFloat(config?.yearsCovered || '12') || 12);
  const bg = config?.backgroundColor || '#0C0C0D';
  const text = config?.textColor || '#FAFAF9';
  const muted = config?.mutedColor || '#A8A29E';
  const orbitC = config?.orbitColor || '#57534E';
  const sunC = config?.sunColor || '#F5E6C8';
  const tilt = { flat: 1, tilted: 0.62, oblique: 0.4 }[config?.viewTilt || 'tilted'] || 0.62;
  const showTrails = bool(config?.showTrails, true);
  const showLabels = bool(config?.showLabels, true);
  const showRing = bool(config?.showRing, true);
  const screens = parseFloat(config?.scrollLength || '6');
  const smoothing = Math.min(1, Math.max(0.02, parseFloat(config?.smoothing || '0.12')));

  const defs = [
    ['Mercury', '#A8A29E', '87.97', 0.2056, 77], ['Venus', '#E7D8C3', '224.7', 0.0068, 131],
    ['Earth', '#9DB8C7', '365.25', 0.0167, 103], ['Mars', '#C98B6B', '686.98', 0.0934, 336],
    ['Jupiter', '#D9C4A3', '4332.6', 0.0489, 14], ['Saturn', '#BDB39C', '10759', 0.0565, 93]
  ];
  const totalDays = years * 365.25;
  const alignAngle = -Math.PI * 0.16;

  const bodies = React.useMemo(() => defs.map((d, i) => {
    const period = Math.max(1, parseFloat(config?.[`body${i + 1}Period`] || d[2]) || parseFloat(d[2]));
    const e = Math.min(0.6, d[3] * 1.6);
    const w = (d[4] * Math.PI) / 180;
    const nu = alignAngle - w;
    const E = 2 * Math.atan(Math.sqrt((1 - e) / (1 + e)) * Math.tan(nu / 2));
    const Mend = E - e * Math.sin(E);
    const phase = Mend - (2 * Math.PI * totalDays) / period;
    return {
      name: config?.[`body${i + 1}Name`] || d[0], color: config?.[`body${i + 1}Color`] || d[1],
      period, e, w, phase, au: Math.pow(period / 365.25, 2 / 3), r: [2.6, 3.8, 4, 3.2, 7, 6][i]
    };
  }), [config, totalDays]); // eslint-disable-line react-hooks/exhaustive-deps

  const uid = React.useMemo(() => 'ot' + Math.random().toString(36).slice(2, 9), []);
  const prefersReducedMotion = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  React.useEffect(() => {
    const id = 'ot-fonts-fraunces-plex';
    if (typeof document === 'undefined' || document.getElementById(id)) return;
    const l = document.createElement('link');
    l.id = id; l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;1,9..144,300&family=IBM+Plex+Mono:wght@300;400&family=Inter:wght@300;400&display=swap';
    document.head.appendChild(l);
  }, []);

  const sectionRef = React.useRef(null);
  const target = React.useRef(0);
  const current = React.useRef(0);
  const [progress, setProgress] = React.useState(prefersReducedMotion ? 1 : 0);
  const [stageH, setStageH] = React.useState(800);
  const [width, setWidth] = React.useState(1280);
  const [mounted, setMounted] = React.useState(prefersReducedMotion);

  React.useEffect(() => {
    if (prefersReducedMotion) return undefined;
    const r = requestAnimationFrame(() => requestAnimationFrame(() => setMounted(true)));
    return () => cancelAnimationFrame(r);
  }, [prefersReducedMotion]);

  React.useEffect(() => {
    const s = typeof getScrollContainer === 'function' ? getScrollContainer() : null;
    const scroller = s && s !== window && s.nodeType === 1 ? s : window;
    const sec = sectionRef.current;
    if (!sec) return undefined;
    let raf = 0;
    const read = () => {
      const r = sec.getBoundingClientRect();
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
    const onScroll = () => { read(); if (!raf && !prefersReducedMotion) raf = requestAnimationFrame(tick); };
    const measure = () => {
      setStageH(scroller === window ? window.innerHeight : scroller.clientHeight);
      setWidth(sec.clientWidth);
      onScroll();
    };
    measure();
    scroller.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (ro) ro.observe(sec);
    return () => {
      scroller.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
      if (ro) ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [smoothing, prefersReducedMotion]);

  const p = prefersReducedMotion ? 1 : progress;
  const clamp = (v) => Math.min(1, Math.max(0, v));
  const ease = (t) => 1 - Math.pow(1 - t, 3);
  const TAU = Math.PI * 2;
  const wrap = (a) => ((a % TAU) + TAU) % TAU;
  const wrapPi = (a) => { const x = wrap(a); return x > Math.PI ? x - TAU : x; };

  const solve = (b, day) => {
    const M = b.phase + (TAU * day) / b.period;
    let E = M;
    for (let k = 0; k < 6; k++) E -= (E - b.e * Math.sin(E) - M) / (1 - b.e * Math.cos(E));
    const nu = 2 * Math.atan2(Math.sqrt(1 + b.e) * Math.sin(E / 2), Math.sqrt(1 - b.e) * Math.cos(E / 2));
    return { M, E, nu, lon: wrap(nu + b.w), dist: 1 - b.e * Math.cos(E) };
  };

  const events = React.useMemo(() => {
    const out = [];
    const step = Math.max(0.5, totalDays / 6000);
    let prev = null;
    for (let d = 0; d <= totalDays + 0.001; d += step) {
      const st = bodies.map((b) => solve(b, d));
      if (prev) {
        bodies.forEach((b, i) => {
          if (i >= 2 && Math.floor(prev[i].M / TAU) !== Math.floor(st[i].M / TAU)) out.push({ day: d, type: 'Perihelion', a: i });
        });
        for (let i = 0; i < bodies.length; i++) {
          if (i === 2 || i === 0) continue;
          const d0 = wrapPi(prev[i].lon - prev[2].lon);
          const d1 = wrapPi(st[i].lon - st[2].lon);
          if (Math.sign(d0) !== Math.sign(d1) && Math.abs(d0 - d1) < 1) out.push({ day: d, type: 'Conjunction', a: Math.max(i, 2), b: Math.min(i, 2) });
        }
      }
      prev = st;
    }
    return out.filter((ev) => ev.day < totalDays - totalDays * 0.02);
  }, [bodies, totalDays]); // eslint-disable-line react-hooks/exhaustive-deps

  const W = Math.max(320, width);
  const H = Math.max(420, stageH);
  const compact = W < 760;
  const cx = compact ? W / 2 : W * 0.56;
  const cy = compact ? H * 0.47 : H * 0.49;
  const aMax = compact ? Math.min(W / 2 - 24, (H * 0.27) / tilt) : Math.min(W * 0.25, (H * 0.36) / tilt);
  const aMin = aMax * 0.16;
  const n = bodies.length;
  const axes = bodies.map((b, i) => aMin + (aMax - aMin) * Math.pow(i / (n - 1), 0.85));

  const day = p * totalDays;
  const project = (i, nu, distF) => {
    const a = axes[i];
    const b = bodies[i];
    const rr = a * (1 - b.e * b.e) / (1 + b.e * Math.cos(nu));
    const ang = nu + b.w;
    return [cx + Math.cos(ang) * rr * (distF || 1), cy - Math.sin(ang) * rr * tilt * (distF || 1)];
  };
  const posAt = (i, d) => { const st = solve(bodies[i], d); return project(i, st.nu); };

  const states = bodies.map((b, i) => {
    const st = solve(b, day);
    const [x, y] = project(i, st.nu);
    return { ...st, x, y };
  });

  const orbitPath = (i) => {
    const pts = [];
    for (let k = 0; k <= 96; k++) { const [x, y] = project(i, (k / 96) * TAU); pts.push(`${k ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`); }
    return pts.join(' ') + 'Z';
  };
  const orbitPaths = React.useMemo(() => bodies.map((_, i) => orbitPath(i)), [bodies, cx, cy, aMax, tilt]); // eslint-disable-line react-hooks/exhaustive-deps

  const trails = showTrails ? bodies.map((b, i) => {
    const span = Math.min(b.period * 0.42, totalDays * 0.5 + b.period * 0.2);
    const segs = [];
    const N = 36;
    let last = posAt(i, day - span);
    for (let k = 1; k <= N; k++) {
      const pt = posAt(i, day - span + (span * k) / N);
      segs.push({ x1: last[0], y1: last[1], x2: pt[0], y2: pt[1], o: Math.pow(k / N, 1.6) });
      last = pt;
    }
    return segs;
  }) : [];

  const evWin = Math.max(6, totalDays * 0.011);
  const activeEvents = showLabels ? events.filter((ev) => Math.abs(ev.day - day) < evWin) : [];
  const pastEvents = events.filter((ev) => ev.day <= day).slice(-4).reverse();
  const alignT = ease(clamp((p - 0.93) / 0.07));

  const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const t0 = Date.UTC(startYear, 0, 1);
  const fmtDate = (d) => { const dt = new Date(t0 + d * 86400000); return `${String(dt.getUTCDate()).padStart(2, '0')} ${MONTHS[dt.getUTCMonth()]} ${dt.getUTCFullYear()}`; };
  const jd = t0 / 86400000 + 2440587.5 + day;
  const nowDate = new Date(t0 + day * 86400000);

  const mono = '"IBM Plex Mono", ui-monospace, "SF Mono", Menlo, monospace';
  const serif = '"Fraunces", "Iowan Old Style", Georgia, serif';
  const sans = 'Inter, -apple-system, "Helvetica Neue", sans-serif';
  const hair = { fill: 'none', stroke: orbitC, strokeWidth: 0.8, vectorEffect: 'non-scaling-stroke' };

  const ringR = aMax * 1.12;
  const ringTicks = [];
  if (showRing) for (let k = 0; k < 72; k++) ringTicks.push(k);

  const labelFor = (ev, k) => {
    const s = states[ev.a];
    const o = 1 - Math.abs(ev.day - day) / evWin;
    const op = ease(clamp(o * 2.2));
    const dx = s.x - cx; const dy = s.y - cy;
    const len = Math.hypot(dx, dy) || 1;
    const ux = dx / len; const uy = dy / len;
    const lx = s.x + ux * 22 + (ux >= 0 ? 10 : -10);
    const ly = s.y + uy * 22 - 10 - k * 14;
    const anchor = ux >= 0 ? 'start' : 'end';
    const txt = ev.type === 'Perihelion' ? `Perihelion · ${bodies[ev.a].name}` : `Conjunction · ${bodies[ev.a].name}–${bodies[ev.b].name}`;
    return (
      <g key={`${ev.type}${ev.day}${ev.a}`} opacity={op}>
        {ev.type === 'Conjunction' && <line x1={cx} y1={cy} x2={s.x} y2={s.y} stroke={sunC} strokeOpacity="0.45" strokeWidth="0.8" strokeDasharray="2 3" />}
        <circle cx={s.x} cy={s.y} r={bodies[ev.a].r + 5 + (1 - op) * 6} fill="none" stroke={text} strokeOpacity="0.7" strokeWidth="0.8" />
        <path d={`M ${s.x + ux * (bodies[ev.a].r + 6)} ${s.y + uy * (bodies[ev.a].r + 6)} L ${s.x + ux * 22} ${s.y + uy * 22 - 6 - k * 14} L ${lx} ${ly + 4}`} fill="none" stroke={text} strokeOpacity="0.6" strokeWidth="0.7" />
        <text x={lx + (anchor === 'start' ? 4 : -4)} y={ly} textAnchor={anchor} fontFamily={mono} fontSize={compact ? 9 : 10} letterSpacing="1.2" fill={text}>{txt.toUpperCase()}</text>
        <text x={lx + (anchor === 'start' ? 4 : -4)} y={ly + 13} textAnchor={anchor} fontFamily={mono} fontSize={compact ? 8.5 : 9} letterSpacing="1" fill={muted}>{fmtDate(ev.day)}</text>
      </g>
    );
  };

  const yearsInt = Math.floor(years);
  const tlLeft = compact ? 20 : 56;
  const tlRight = compact ? 20 : 56;

  return (
    <section ref={sectionRef} className="orbital-time" aria-label={`${title}. ${subtitle}`}
      style={{ position: 'relative', width: '100%', height: `${Math.round(stageH * screens)}px`, backgroundColor: bg, color: text, fontFamily: sans }}>
      <div style={{ position: 'sticky', top: 0, height: `${stageH}px`, overflow: 'hidden', background: bg }}>
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} role="img"
          aria-label={`Orrery on ${fmtDate(day)} showing ${bodies.map((b) => b.name).join(', ')}`}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <defs>
            <radialGradient id={`${uid}-sun`}>
              <stop offset="0" stopColor={sunC} stopOpacity="0.55" />
              <stop offset="0.35" stopColor={sunC} stopOpacity="0.12" />
              <stop offset="1" stopColor={sunC} stopOpacity="0" />
            </radialGradient>
          </defs>

          {showRing && (
            <g opacity={mounted ? 1 : 0} style={{ transition: 'opacity 900ms ease 200ms' }}>
              <ellipse cx={cx} cy={cy} rx={ringR} ry={ringR * tilt} style={hair} />
              <ellipse cx={cx} cy={cy} rx={ringR * 1.025} ry={ringR * 1.025 * tilt} style={{ ...hair, strokeOpacity: 0.5 }} />
              {ringTicks.map((k) => {
                const a = (k / 72) * TAU;
                const long = k % 6 === 0;
                const r2 = ringR * (long ? 1.05 : 1.025);
                return <line key={k} x1={cx + Math.cos(a) * ringR} y1={cy - Math.sin(a) * ringR * tilt} x2={cx + Math.cos(a) * r2} y2={cy - Math.sin(a) * r2 * tilt} stroke={orbitC} strokeWidth={long ? 1 : 0.6} />;
              })}
              {ringTicks.filter((k) => k % 6 === 0).map((k) => {
                const a = (k / 72) * TAU;
                const r3 = ringR * 1.1;
                return <text key={'t' + k} x={cx + Math.cos(a) * r3} y={cy - Math.sin(a) * r3 * tilt + 3} textAnchor="middle" fontFamily={mono} fontSize={compact ? 7.5 : 9} fill={muted} fillOpacity="0.7">{k * 5}°</text>;
              })}
            </g>
          )}

          {bodies.map((b, i) => (
            <g key={'o' + i}>
              <path d={orbitPaths[i]} style={{ ...hair, strokeDasharray: 4000, strokeDashoffset: mounted ? 0 : 4000, transition: prefersReducedMotion ? 'none' : `stroke-dashoffset 1400ms cubic-bezier(.3,.6,.1,1) ${i * 70}ms` }} />
              {Array.from({ length: 12 }, (_, k) => {
                const st = solve({ ...b, phase: 0 }, (k / 12) * b.period);
                const [x, y] = project(i, st.nu);
                const [x2, y2] = project(i, st.nu, k % 3 === 0 ? 1.05 : 1.03);
                return <line key={k} x1={x} y1={y} x2={x2} y2={y2} stroke={orbitC} strokeWidth={k === 0 ? 1.2 : 0.7} opacity={mounted ? 1 : 0} style={{ transition: 'opacity 600ms ease 700ms' }} />;
              })}
              {(() => {
                const [qx, qy] = project(i, 0, 0.97);
                return <path d={`M ${qx - 3} ${qy} L ${qx} ${qy - 3} L ${qx + 3} ${qy} L ${qx} ${qy + 3} Z`} fill="none" stroke={muted} strokeWidth="0.7" opacity="0.8" />;
              })()}
            </g>
          ))}

          {alignT > 0 && (
            <g opacity={alignT}>
              <line x1={cx} y1={cy} x2={cx + Math.cos(alignAngle) * ringR * 1.0} y2={cy - Math.sin(alignAngle) * ringR * tilt * 1.0}
                stroke={sunC} strokeWidth="1" strokeDasharray={`${ringR * alignT} ${ringR * 2}`} />
              <text x={cx + Math.cos(alignAngle) * ringR * 1.0} y={cy - Math.sin(alignAngle) * ringR * tilt * 1.0 + 22} textAnchor="end"
                fontFamily={mono} fontSize={compact ? 9 : 10.5} letterSpacing="1.5" fill={sunC}>{alignmentLabel.toUpperCase()}</text>
            </g>
          )}

          {showTrails && trails.map((segs, i) => (
            <g key={'tr' + i}>
              {segs.map((s, k) => <line key={k} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke={bodies[i].color} strokeOpacity={s.o * 0.9} strokeWidth={1 + s.o * 1.2} strokeLinecap="round" />)}
            </g>
          ))}

          <circle cx={cx} cy={cy} r={aMin * 0.75} fill={`url(#${uid}-sun)`} />
          <circle cx={cx} cy={cy} r={compact ? 6 : 8} fill={sunC} />

          {states.map((s, i) => (
            <g key={'b' + i}>
              <circle cx={s.x} cy={s.y} r={bodies[i].r} fill={bodies[i].color} />
              {i === 5 && <ellipse cx={s.x} cy={s.y} rx={bodies[i].r * 2} ry={bodies[i].r * 0.6} fill="none" stroke={bodies[i].color} strokeWidth="0.9" />}
              {!compact && (
                <text x={alignT > 0 ? s.x + (i % 2 ? 1 : -1) * (bodies[i].r + 6 + alignT * 4) : s.x} y={alignT > 0 ? s.y + (i % 2 ? 14 : -6) : s.y + bodies[i].r + 13} textAnchor={alignT > 0 ? (i % 2 ? 'start' : 'end') : 'middle'} fontFamily={mono} fontSize="9" letterSpacing="1.2" fill={muted}>{bodies[i].name.toUpperCase()}</text>
              )}
            </g>
          ))}

          {activeEvents.map((ev, k) => labelFor(ev, k))}
        </svg>

        <div style={{ position: 'absolute', top: compact ? 20 : 44, left: compact ? 20 : 56, maxWidth: compact ? W - 40 : Math.min(360, cx - aMax * 1.2 - 80), zIndex: 2 }}>
          <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: muted, marginBottom: compact ? 10 : 18 }}>{eyebrow}</div>
          <h2 style={{ margin: 0, fontFamily: serif, fontWeight: 300, fontSize: compact ? 30 : 48, lineHeight: 1.02, letterSpacing: '-0.02em', color: text }}>{title}</h2>
          <p style={{ margin: compact ? '10px 0 0' : '16px 0 0', fontSize: compact ? 13 : 15, lineHeight: 1.5, color: muted, fontWeight: 300 }}>{subtitle}</p>
        </div>

        <div aria-live="off" style={{ position: 'absolute', left: compact ? 20 : 56, bottom: compact ? 74 : 104, zIndex: 2, fontVariantNumeric: 'tabular-nums' }}>
          <div style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: '0.18em', color: muted, textTransform: 'uppercase' }}>Epoch</div>
          <div style={{ fontFamily: sans, fontWeight: 300, fontSize: compact ? 34 : 56, letterSpacing: '-0.03em', lineHeight: 1.05, marginTop: 6, color: text }}>
            {String(nowDate.getUTCDate()).padStart(2, '0')} {MONTHS[nowDate.getUTCMonth()].charAt(0) + MONTHS[nowDate.getUTCMonth()].slice(1).toLowerCase()} <span style={{ color: sunC }}>{nowDate.getUTCFullYear()}</span>
          </div>
          <div style={{ fontFamily: mono, fontSize: compact ? 10 : 11, letterSpacing: '0.12em', color: muted, marginTop: 8 }}>
            DAY {String(Math.floor(day)).padStart(5, '0')} · JD {jd.toFixed(1)}
          </div>
        </div>

        {!compact && (
          <div style={{ position: 'absolute', top: 44, right: 56, zIndex: 2, fontFamily: mono, fontSize: 10.5, letterSpacing: '0.08em', color: muted, fontVariantNumeric: 'tabular-nums' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '12px 76px 64px 52px', gap: '7px 12px', alignItems: 'center' }}>
              <span /><span style={{ letterSpacing: '0.16em' }}>BODY</span><span style={{ textAlign: 'right', letterSpacing: '0.16em' }}>λ</span><span style={{ textAlign: 'right', letterSpacing: '0.16em' }}>R AU</span>
              {bodies.map((b, i) => (
                <React.Fragment key={i}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: b.color, display: 'inline-block' }} />
                  <span style={{ color: text }}>{b.name}</span>
                  <span style={{ textAlign: 'right' }}>{String(Math.round((states[i].lon * 180) / Math.PI) % 360).padStart(3, '0')}°</span>
                  <span style={{ textAlign: 'right' }}>{(b.au * states[i].dist).toFixed(2)}</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
        {!compact && (
          <div style={{ position: 'absolute', right: 56, bottom: 104, width: 240, zIndex: 2, fontFamily: mono, fontSize: 10.5, letterSpacing: '0.08em', color: muted, fontVariantNumeric: 'tabular-nums' }}>
            <div style={{ borderTop: `1px solid ${orbitC}`, paddingTop: 12, minHeight: 92 }}>
              <div style={{ letterSpacing: '0.16em', marginBottom: 8 }}>LOG</div>
              {pastEvents.length === 0 && <div style={{ opacity: 0.6 }}>— awaiting first event</div>}
              {pastEvents.map((ev, k) => (
                <div key={`${ev.day}${ev.a}${ev.type}`} style={{ display: 'flex', justifyContent: 'space-between', gap: 14, opacity: 1 - k * 0.2, marginBottom: 4 }}>
                  <span>{fmtDate(ev.day)}</span>
                  <span style={{ color: k === 0 ? text : muted }}>{ev.type === 'Perihelion' ? `q ${bodies[ev.a].name}` : `☌ ${bodies[ev.a].name.slice(0, 3)}·${bodies[ev.b].name.slice(0, 3)}`}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {compact && (
          <div aria-hidden="true" style={{ position: 'absolute', left: 20, right: 20, top: cy + aMax * tilt * 1.32 + 18, zIndex: 2, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px 10px', fontFamily: mono, fontSize: 9.5, letterSpacing: '0.08em', color: muted, fontVariantNumeric: 'tabular-nums' }}>
            {bodies.map((b, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: b.color, flex: 'none' }} />
                <span style={{ color: text }}>{b.name}</span>
                <span>{String(Math.round((states[i].lon * 180) / Math.PI) % 360).padStart(3, '0')}°</span>
              </div>
            ))}
          </div>
        )}
        <div aria-hidden="true" style={{ position: 'absolute', left: tlLeft, right: tlRight, bottom: compact ? 30 : 44, zIndex: 2, height: 22 }}>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 10, height: 1, background: orbitC }} />
          <div style={{ position: 'absolute', left: 0, top: 10, height: 1, width: `${p * 100}%`, background: text }} />
          {Array.from({ length: yearsInt + 1 }, (_, k) => {
            const show = compact ? k % Math.max(1, Math.ceil(yearsInt / 4)) === 0 : k % Math.max(1, Math.ceil(yearsInt / 12)) === 0;
            return (
              <div key={k} style={{ position: 'absolute', left: `${(k / years) * 100}%`, top: 4, width: 1, height: 13, background: orbitC }}>
                {show && <span style={{ position: 'absolute', top: 16, left: k === 0 ? 0 : -14, fontFamily: mono, fontSize: 9, letterSpacing: '0.08em', color: muted }}>{startYear + k}</span>}
              </div>
            );
          })}
          {events.map((ev, k) => (
            <div key={'e' + k} style={{
              position: 'absolute', left: `${(ev.day / totalDays) * 100}%`, top: ev.type === 'Perihelion' ? 0 : 2, width: 4, height: 4, borderRadius: '50%', marginLeft: -2,
              background: ev.type === 'Conjunction' ? (ev.day <= day ? sunC : orbitC) : 'transparent', border: ev.type === 'Perihelion' ? `1px solid ${ev.day <= day ? muted : orbitC}` : 'none', boxSizing: 'border-box'
            }} />
          ))}
          <div style={{ position: 'absolute', left: `${p * 100}%`, top: 2, width: 1, height: 17, background: sunC }} />
        </div>
      </div>
    </section>
  );
}

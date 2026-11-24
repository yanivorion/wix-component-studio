const MANIFEST = {
  "type": "Scrub.Chronograph",
  "description": "A large, finely detailed chronograph dial driven by scroll: the ratcheting tachymeter bezel turns, hands sweep from hour to hour, sub-dials count elapsed time and the story changes with each position, ending in a 3D tilt with a specular sweep across the crystal",
  "editorElement": {
    "selector": ".chronograph",
    "displayName": "Chronograph",
    "archetype": "container",
    "data": {
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Calibre 04 / Column wheel", "group": "Content" },
      "title": { "dataType": "text", "displayName": "Title", "defaultValue": "The measured hour", "group": "Content" },
      "wordmark": { "dataType": "text", "displayName": "Dial Wordmark", "defaultValue": "OBSERVATOIRE", "group": "Content", "description": "Use your own name; avoid real watch brands" },
      "subWordmark": { "dataType": "text", "displayName": "Dial Subtitle", "defaultValue": "CHRONOGRAPHE · AUTOMATIQUE", "group": "Content" },
      "chapterCount": { "dataType": "select", "displayName": "Chapters", "defaultValue": "5", "options": ["4", "5", "6"], "group": "Chapters" },
      "chapterTimes": { "dataType": "text", "displayName": "Chapter Times (comma-separated h:mm)", "defaultValue": "10:10, 12:00, 2:30, 5:00, 7:45, 10:10", "group": "Chapters" },
      "chapter1Title": { "dataType": "text", "displayName": "Chapter 1 Title", "defaultValue": "At rest", "group": "Chapters" },
      "chapter1Text": { "dataType": "text", "displayName": "Chapter 1 Text", "defaultValue": "Ten past ten frames the dial like a held breath. Only the small seconds at nine are moving.", "group": "Chapters" },
      "chapter2Title": { "dataType": "text", "displayName": "Chapter 2 Title", "defaultValue": "Start", "group": "Chapters" },
      "chapter2Text": { "dataType": "text", "displayName": "Chapter 2 Text", "defaultValue": "Press the pusher at two. The column wheel turns one tooth and the centre hand leaves zero.", "group": "Chapters" },
      "chapter3Title": { "dataType": "text", "displayName": "Chapter 3 Title", "defaultValue": "Count", "group": "Chapters" },
      "chapter3Text": { "dataType": "text", "displayName": "Chapter 3 Text", "defaultValue": "Every sweep of the centre hand advances the thirty-minute counter at three by a single click.", "group": "Chapters" },
      "chapter4Title": { "dataType": "text", "displayName": "Chapter 4 Title", "defaultValue": "Measure", "group": "Chapters" },
      "chapter4Text": { "dataType": "text", "displayName": "Chapter 4 Text", "defaultValue": "Over a measured kilometre the tachymeter turns elapsed seconds directly into speed.", "group": "Chapters" },
      "chapter5Title": { "dataType": "text", "displayName": "Chapter 5 Title", "defaultValue": "Return", "group": "Chapters" },
      "chapter5Text": { "dataType": "text", "displayName": "Chapter 5 Text", "defaultValue": "The reset hammers fall, the hands fly home, and the dial settles back into an ordinary hour.", "group": "Chapters" },
      "chapter6Title": { "dataType": "text", "displayName": "Chapter 6 Title", "defaultValue": "Again", "group": "Chapters" },
      "chapter6Text": { "dataType": "text", "displayName": "Chapter 6 Text", "defaultValue": "Ten past ten once more. The movement has kept every second it was given.", "group": "Chapters" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#0C0C0D", "group": "Colors" },
      "caseColor": { "dataType": "color", "displayName": "Case Steel", "defaultValue": "#A1A1AA", "group": "Colors" },
      "bezelColor": { "dataType": "color", "displayName": "Bezel", "defaultValue": "#18181B", "group": "Colors" },
      "dialColor": { "dataType": "color", "displayName": "Dial", "defaultValue": "#EFEEEA", "group": "Colors" },
      "subdialColor": { "dataType": "color", "displayName": "Sub-dials", "defaultValue": "#1C1C1F", "group": "Colors" },
      "handColor": { "dataType": "color", "displayName": "Hands & Indices", "defaultValue": "#1C1917", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Chrono Hand", "defaultValue": "#C2410C", "group": "Colors" },
      "textColor": { "dataType": "color", "displayName": "Text", "defaultValue": "#F5F5F4", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#8A8A93", "group": "Colors" },
      "displayFont": { "dataType": "select", "displayName": "Display Font", "defaultValue": "Fraunces", "options": ["Fraunces", "Instrument Serif", "Inter", "Georgia"], "group": "Typography" },
      "fontFamily": { "dataType": "select", "displayName": "Text Font", "defaultValue": "Inter", "options": ["Inter", "system-ui", "Helvetica Neue", "Georgia"], "group": "Typography" },
      "dialSide": { "dataType": "select", "displayName": "Dial Side", "defaultValue": "right", "options": ["left", "right"], "group": "Layout" },
      "scrollLength": { "dataType": "select", "displayName": "Scroll Length (screens)", "defaultValue": "6", "options": ["4", "5", "6", "8"], "group": "Layout" },
      "endTilt": { "dataType": "booleanValue", "displayName": "End Tilt & Specular", "defaultValue": "true", "group": "Animation" },
      "bezelRatchet": { "dataType": "booleanValue", "displayName": "Ratcheting Bezel", "defaultValue": "true", "group": "Animation" },
      "smoothing": { "dataType": "select", "displayName": "Scrub Smoothing", "defaultValue": "0.12", "options": ["0.06", "0.12", "0.2", "1"], "group": "Animation", "description": "1 = locked to the scrollbar, lower = more glide" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const eyebrow = config?.eyebrow || 'Calibre 04 / Column wheel';
  const title = config?.title || 'The measured hour';
  const wordmark = config?.wordmark || 'OBSERVATOIRE';
  const subWordmark = config?.subWordmark || 'CHRONOGRAPHE · AUTOMATIQUE';
  const C = Math.min(6, Math.max(4, parseInt(config?.chapterCount || '5', 10) || 5));
  const timesRaw = config?.chapterTimes || '10:10, 12:00, 2:30, 5:00, 7:45, 10:10';
  const bg = config?.backgroundColor || '#0C0C0D';
  const caseC = config?.caseColor || '#A1A1AA';
  const bezelC = config?.bezelColor || '#18181B';
  const dialC = config?.dialColor || '#EFEEEA';
  const subC = config?.subdialColor || '#1C1C1F';
  const handC = config?.handColor || '#1C1917';
  const accent = config?.accentColor || '#C2410C';
  const fg = config?.textColor || '#F5F5F4';
  const muted = config?.mutedColor || '#8A8A93';
  const displayFont = config?.displayFont || 'Fraunces';
  const fontFamily = config?.fontFamily || 'Inter';
  const dialSide = config?.dialSide === 'left' ? 'left' : 'right';
  const screens = parseFloat(config?.scrollLength || '6') || 6;
  const endTilt = bool(config?.endTilt, true);
  const ratchet = bool(config?.bezelRatchet, true);
  const smoothing = Math.min(1, Math.max(0.02, parseFloat(config?.smoothing || '0.12')));

  const chapterDefaults = [
    ['At rest', 'Ten past ten frames the dial like a held breath. Only the small seconds at nine are moving.'],
    ['Start', 'Press the pusher at two. The column wheel turns one tooth and the centre hand leaves zero.'],
    ['Count', 'Every sweep of the centre hand advances the thirty-minute counter at three by a single click.'],
    ['Measure', 'Over a measured kilometre the tachymeter turns elapsed seconds directly into speed.'],
    ['Return', 'The reset hammers fall, the hands fly home, and the dial settles back into an ordinary hour.'],
    ['Again', 'Ten past ten once more. The movement has kept every second it was given.']
  ];
  const chapters = React.useMemo(() => {
    const parsed = timesRaw.split(',').map((s) => {
      const m = s.trim().match(/^(\d{1,2})(?::(\d{1,2}))?/);
      return m ? (parseInt(m[1], 10) % 12) * 60 + (parseInt(m[2] || '0', 10) % 60) : null;
    });
    const fallback = [610, 720, 150, 300, 465, 610];
    let prev = -1;
    return chapterDefaults.slice(0, C).map((d, i) => {
      let t = parsed[i] ?? fallback[i];
      while (t <= prev) t += 720;
      prev = t;
      return { title: config?.[`chapter${i + 1}Title`] || d[0], text: config?.[`chapter${i + 1}Text`] || d[1], t };
    });
  }, [timesRaw, C, config]); // eslint-disable-line react-hooks/exhaustive-deps

  const uid = React.useMemo(() => 'cg' + Math.random().toString(36).slice(2, 9), []);
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
  const [progress, setProgress] = React.useState(prefersReducedMotion ? 1 : 0);
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
    const onScroll = () => { read(); if (!raf && !prefersReducedMotion) raf = requestAnimationFrame(tick); };
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
  const seg = (a, b) => clamp((progress - a) / (b - a));
  const ease = (t) => 1 - Math.pow(1 - t, 3);
  const easeIO = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
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

  // ---- timeline ----
  const p = progress;
  const span = p * C;
  const k = Math.min(C - 1, Math.floor(span));
  const local = span - k;
  const move = k === 0 ? 0 : easeIO(clamp(local / 0.42));
  const timeMin = k === 0 ? chapters[0].t : chapters[k - 1].t + (chapters[k].t - chapters[k - 1].t) * move;
  const textIdx = k > 0 && local < 0.2 ? k - 1 : k;

  // chronograph runs from chapter 2 until the last chapter, then flies back
  const runStart = 1 / C + 0.12 / C;
  const runEnd = (C - 1) / C;
  const maxElapsed = 60 * 11 + 37.4;
  const runT = clamp((p - runStart) / (runEnd - runStart));
  const fly = 1 - easeIO(clamp((p - runEnd) / (0.3 / C)));
  const elapsed = p < runEnd ? maxElapsed * runT : maxElapsed * fly;
  const chronoAngle = p < runEnd ? (elapsed % 60) * 6 : ((maxElapsed % 60) * 6) * fly;
  const minuteCounter = p < runEnd ? Math.floor(elapsed / 60) * 12 : Math.floor(maxElapsed / 60) * 12 * fly;

  const hourAngle = ((timeMin / 60) % 12) * 30;
  const minuteAngle = (timeMin % 60) * 6;
  const runningSeconds = p * 360 * 26 + 210;
  const dayAngle = ((timeMin / 60) % 24) * 15;
  const bezelRaw = -p * 150;
  const bezelAngle = ratchet ? Math.round(bezelRaw / 6) * 6 : bezelRaw;
  const dateNum = ((22 + Math.floor(timeMin / 720)) % 31) + 1;

  const tilt = endTilt ? easeIO(seg(0.9, 1)) : 0;
  const sweep = endTilt ? seg(0.88, 1) : 0;

  // ---- layout ----
  const W = width, H = stageH;
  const compact = W < 860;
  const dialSize = compact ? Math.min(W - 24, H * 0.5) : Math.min(H * 0.9, W * 0.52);
  const dialLeft = compact ? (W - dialSize) / 2 : dialSide === 'right' ? W - dialSize - Math.max(24, W * 0.04) : Math.max(24, W * 0.04);
  const dialTop = compact ? 92 : (H - dialSize) / 2;
  const colLeft = compact ? 20 : dialSide === 'right' ? 56 : dialLeft + dialSize + 56;
  const colW = compact ? W - 40 : Math.max(240, (dialSide === 'right' ? dialLeft : W - dialLeft - dialSize) - 56 - 48);

  const mono = 'ui-monospace, "SF Mono", "IBM Plex Mono", Menlo, monospace';
  const sans = fontFamily === 'Georgia' ? 'Georgia, serif' : `${fontFamily}, -apple-system, "Helvetica Neue", sans-serif`;
  const display = displayFont === 'Georgia' ? 'Georgia, serif' : displayFont === 'Inter'
    ? 'Inter, -apple-system, "Helvetica Neue", sans-serif' : `"${displayFont}", Georgia, "Times New Roman", serif`;

  const steelHi = mix(caseC, '#FFFFFF', 0.65);
  const steelLo = mix(caseC, '#000000', 0.55);
  const bezelText = mix(bezelC, '#FFFFFF', 0.82);
  const subText = mix(subC, '#FFFFFF', 0.78);
  const dialEdge = mix(dialC, '#000000', 0.12);
  const lume = mix(dialC, '#FFFFFF', 0.6);

  const pol = (r, deg) => {
    const a = ((deg - 90) * Math.PI) / 180;
    return [r * Math.cos(a), r * Math.sin(a)];
  };

  // static dial furniture (memoised so per-frame renders only touch the hands)
  const staticDial = React.useMemo(() => {
    const ticks = [];
    for (let i = 0; i < 300; i++) {
      const major = i % 5 === 0;
      const five = i % 25 === 0;
      const [x1, y1] = pol(398, i * 1.2);
      const [x2, y2] = pol(five ? 374 : major ? 380 : 389, i * 1.2);
      ticks.push(<line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={handC} strokeWidth={five ? 2.4 : major ? 1.4 : 0.6} />);
    }
    const flangeNums = [];
    for (let i = 5; i <= 60; i += 5) {
      const a = i * 6;
      const [x, y] = pol(357, a);
      flangeNums.push(<text key={i} x={x} y={y} fill={handC} fontSize="15" fontFamily={mono} textAnchor="middle" dominantBaseline="central" transform={`rotate(${a > 90 && a < 270 ? a + 180 : a} ${x} ${y})`} opacity="0.85">{String(i).padStart(2, '0')}</text>);
    }
    const indices = [];
    for (let h = 0; h < 12; h++) {
      const a = h * 30;
      const bars = h === 0 ? [-13, 13] : [0];
      bars.forEach((off, j) => {
        indices.push(
          <g key={`${h}-${j}`} transform={`rotate(${a}) translate(${off} 0)`}>
            <rect x={-8} y={-342} width={16} height={74} rx={1.5} fill={`url(#${uid}-idx)`} stroke={mix(handC, '#000', 0.3)} strokeWidth="0.8" />
            <rect x={-3} y={-334} width={6} height={56} rx={1} fill={lume} />
          </g>
        );
      });
    }
    const subdial = (cx, cy, count, labels, labelStep, key) => {
      const els = [];
      for (let r = 20; r < 86; r += 4.5) els.push(<circle key={'g' + r} cx={cx} cy={cy} r={r} fill="none" stroke={subText} strokeOpacity="0.07" strokeWidth="0.8" />);
      for (let i = 0; i < count; i++) {
        const a = (360 / count) * i;
        const big = i % labelStep === 0;
        const [x1, y1] = pol(88, a);
        const [x2, y2] = pol(big ? 76 : 82, a);
        els.push(<line key={'t' + i} x1={cx + x1} y1={cy + y1} x2={cx + x2} y2={cy + y2} stroke={subText} strokeWidth={big ? 1.8 : 0.8} />);
      }
      labels.forEach((lb, j) => {
        const a = (360 / labels.length) * (j + 1);
        const [x, y] = pol(62, a);
        els.push(<text key={'l' + j} x={cx + x} y={cy + y} fill={subText} fontSize="15" fontFamily={sans} fontWeight="500" textAnchor="middle" dominantBaseline="central">{lb}</text>);
      });
      return (
        <g key={key}>
          <circle cx={cx} cy={cy} r={94} fill={mix(subC, '#000', 0.4)} />
          <circle cx={cx} cy={cy} r={91} fill={subC} stroke={mix(dialC, '#000', 0.25)} strokeWidth="1.5" />
          {els}
        </g>
      );
    };
    return (
      <g>
        {/* crown and pushers */}
        {[-32, 32].map((a) => (
          <g key={a} transform={`rotate(${90 + a})`}>
            <rect x={-15} y={-532} width={30} height={46} rx={4} fill={`url(#${uid}-steel)`} stroke={steelLo} strokeWidth="1" />
            <rect x={-19} y={-540} width={38} height={14} rx={3} fill={`url(#${uid}-steel)`} stroke={steelLo} strokeWidth="1" />
          </g>
        ))}
        <g transform="rotate(90)">
          <rect x={-30} y={-540} width={60} height={50} rx={6} fill={`url(#${uid}-steel)`} stroke={steelLo} strokeWidth="1" />
          {Array.from({ length: 11 }, (_, i) => <line key={i} x1={-25 + i * 5} y1={-538} x2={-25 + i * 5} y2={-512} stroke={steelLo} strokeWidth="1" opacity="0.6" />)}
        </g>
        <circle r={503} fill={`url(#${uid}-steel)`} />
        <circle r={503} fill="none" stroke={steelLo} strokeWidth="1.5" />
        <circle r={486} fill="none" stroke={steelHi} strokeWidth="1" opacity="0.6" />
        <circle r={410} fill={`url(#${uid}-dial)`} />
        <circle r={410} fill="none" stroke={steelLo} strokeWidth="5" />
        <circle r={404} fill="none" stroke={dialEdge} strokeWidth="2" />
        <g>{ticks}</g>
        <g>{flangeNums}</g>
        <g filter={`url(#${uid}-lift)`}>{indices}</g>
        {subdial(-160, 0, 60, ['20', '40', '60'], 5, 'run')}
        {subdial(160, 0, 30, ['10', '20', '30'], 5, 'min')}
        {subdial(0, 160, 24, ['6', '12', '18', '24'], 6, 'day')}
        <text x={0} y={-196} fill={handC} fontSize="25" fontFamily={display} fontWeight="400" letterSpacing="5" textAnchor="middle">{wordmark}</text>
        <text x={0} y={-170} fill={handC} fontSize="10.5" fontFamily={mono} letterSpacing="3.4" textAnchor="middle" opacity="0.7">{subWordmark}</text>
        <text x={0} y={-128} fill={handC} fontSize="9.5" fontFamily={mono} letterSpacing="2.6" textAnchor="middle" opacity="0.6">1/5 SEC · 30 MIN · 24 H</text>
        <g transform="translate(166 166) rotate(45)">
          <rect x={-27} y={-19} width={54} height={38} rx={2} fill={mix(dialC, '#000', 0.5)} />
          <rect x={-24} y={-16} width={48} height={32} rx={1.5} fill="#FFFFFF" stroke={mix(dialC, '#000', 0.3)} strokeWidth="0.8" />
        </g>
      </g>
    );
  }, [uid, handC, lume, bezelText, subC, subText, dialC, dialEdge, steelLo, steelHi, wordmark, subWordmark, display, sans, mono]); // eslint-disable-line react-hooks/exhaustive-deps

  const hand = (len, tail, w, angle, color, extra, key) => (
    <g key={key} transform={`rotate(${angle})`} filter={`url(#${uid}-shadow)`}>
      <path d={`M ${-w / 2} ${tail} L ${-w * 0.42} ${-len * 0.78} L 0 ${-len} L ${w * 0.42} ${-len * 0.78} L ${w / 2} ${tail} Z`} fill={color} />
      <path d={`M 0 ${-len} L ${w * 0.42} ${-len * 0.78} L ${w / 2} ${tail} L 0 ${tail} Z`} fill="#000" opacity="0.18" />
      {extra}
    </g>
  );

  const subHand = (cx, cy, angle, key) => (
    <g key={key} transform={`translate(${cx} ${cy}) rotate(${angle})`}>
      <path d="M -1.6 18 L -1 -82 L 1 -82 L 1.6 18 Z" fill={subText} />
      <circle r={6} fill={subText} />
      <circle r={2.2} fill={subC} />
    </g>
  );

  const roman = (n) => ['I', 'II', 'III', 'IV', 'V', 'VI'][n] || String(n + 1);
  const fmtTime = (m) => {
    const hh = Math.floor((m / 60) % 12) || 12;
    const mm = Math.floor(m % 60);
    return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
  };
  const fmtElapsed = (s) => {
    const mm = Math.floor(s / 60);
    const ss = s % 60;
    return `${String(mm).padStart(2, '0')}′ ${ss.toFixed(1).padStart(4, '0')}″`;
  };
  const label = { fontFamily: mono, fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: muted };

  return (
    <section ref={sectionRef} className="chronograph" aria-label={title}
      style={{ position: 'relative', width: '100%', height: `${Math.round(H * screens)}px`, backgroundColor: bg, color: fg, fontFamily: sans }}>
      <style>{`.${uid}-ch{transition:opacity .5s ease, transform .7s cubic-bezier(.2,.7,.2,1)}@media (prefers-reduced-motion: reduce){.${uid}-ch{transition:none}}`}</style>
      <div style={{ position: 'sticky', top: 0, height: `${H}px`, overflow: 'hidden' }}>
        <div aria-hidden="true" style={{
          position: 'absolute', left: dialLeft - dialSize * 0.25, top: dialTop - dialSize * 0.25, width: dialSize * 1.5, height: dialSize * 1.5,
          background: `radial-gradient(closest-side, ${mix(bg, '#FFFFFF', 0.07)}, ${bg} 100%)`
        }} />

        <div style={{ position: 'absolute', left: dialLeft, top: dialTop, width: dialSize, height: dialSize, perspective: `${Math.round(dialSize * 2.6)}px` }}>
          <div style={{
            position: 'absolute', inset: 0,
            transform: `rotateX(${tilt * 16}deg) rotateY(${(dialSide === 'right' ? -1 : 1) * tilt * 20}deg) rotateZ(${tilt * -3}deg) scale(${1 - tilt * 0.05})`,
            transformStyle: 'preserve-3d'
          }}>
            <div aria-hidden="true" style={{
              position: 'absolute', left: '6%', right: '6%', top: '10%', bottom: '2%', borderRadius: '50%',
              background: 'rgba(0,0,0,0.65)', filter: `blur(${dialSize * 0.04}px)`,
              transform: `translate(${tilt * dialSize * 0.04}px, ${dialSize * (0.025 + tilt * 0.03)}px) translateZ(-1px)`
            }} />
            <svg viewBox="-545 -545 1090 1090" width={dialSize} height={dialSize} role="img"
              aria-label={`Chronograph dial showing ${fmtTime(timeMin)}, elapsed ${fmtElapsed(elapsed)}`}
              style={{ position: 'absolute', inset: 0, display: 'block', overflow: 'visible' }}>
              <defs>
                <linearGradient id={`${uid}-steel`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor={steelHi} />
                  <stop offset="0.45" stopColor={caseC} />
                  <stop offset="0.55" stopColor={steelLo} />
                  <stop offset="1" stopColor={mix(caseC, '#FFFFFF', 0.3)} />
                </linearGradient>
                <radialGradient id={`${uid}-dial`} cx="0.42" cy="0.38" r="0.7">
                  <stop offset="0" stopColor={mix(dialC, '#FFFFFF', 0.5)} />
                  <stop offset="0.7" stopColor={dialC} />
                  <stop offset="1" stopColor={dialEdge} />
                </radialGradient>
                <linearGradient id={`${uid}-idx`} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor={mix(handC, '#FFFFFF', 0.35)} />
                  <stop offset="0.5" stopColor={handC} />
                  <stop offset="0.5" stopColor={mix(handC, '#000', 0.3)} />
                  <stop offset="1" stopColor={mix(handC, '#FFFFFF', 0.15)} />
                </linearGradient>
                <radialGradient id={`${uid}-glass`} cx="0.3" cy="0.22" r="0.8">
                  <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.22" />
                  <stop offset="0.35" stopColor="#FFFFFF" stopOpacity="0.04" />
                  <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
                </radialGradient>
                <filter id={`${uid}-shadow`} x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="5" dy="8" stdDeviation="5" floodColor="#000" floodOpacity="0.35" />
                </filter>
                <filter id={`${uid}-lift`} x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="1.5" dy="2.5" stdDeviation="1.5" floodColor="#000" floodOpacity="0.3" />
                </filter>
                <path id={`${uid}-tachpath`} d="M 0 -456 A 456 456 0 1 1 -0.1 -456" />
              </defs>

              {staticDial}

              <g transform={`rotate(${bezelAngle})`}>
                <circle r={461} fill="none" stroke={bezelC} strokeWidth="82" />
                <circle r={436} fill="none" stroke={mix(bezelC, '#FFFFFF', 0.1)} strokeWidth="1" />
                {[500, 400, 300, 250, 200, 175, 150, 125, 110, 100, 90, 80, 75, 70, 65, 60].map((v) => {
                  const a = (3600 / v) * 6;
                  const [x, y] = pol(464, a);
                  const [t1x, t1y] = pol(421, a);
                  const [t2x, t2y] = pol(434, a);
                  return (
                    <g key={v}>
                      <line x1={t1x} y1={t1y} x2={t2x} y2={t2y} stroke={bezelText} strokeWidth="2.2" />
                      <text x={x} y={y} fill={bezelText} fontSize={v >= 100 ? 22 : 24} fontFamily={sans} fontWeight="500" textAnchor="middle" dominantBaseline="central" transform={`rotate(${a} ${x} ${y})`}>{v}</text>
                    </g>
                  );
                })}
                {Array.from({ length: 52 }, (_, i) => {
                  const s = i + 8;
                  const [x1, y1] = pol(421, s * 6);
                  const [x2, y2] = pol(428, s * 6);
                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={bezelText} strokeWidth="0.9" opacity="0.7" />;
                })}
                <text fill={bezelText} fontSize="16" fontFamily={sans} fontWeight="500" letterSpacing="4">
                  <textPath href={`#${uid}-tachpath`} startOffset={`${(6 / 360) * 100}%`}>TACHYMETRE</textPath>
                </text>
                <circle cx={0} cy={-482} r={5} fill={accent} />
              </g>

              {subHand(-160, 0, runningSeconds, 'sr')}
              {subHand(160, 0, minuteCounter, 'sm')}
              {subHand(0, 160, dayAngle, 'sd')}

              <g transform="translate(166 166) rotate(45)">
                <text x={0} y={1} fill={handC} fontSize="24" fontFamily={sans} fontWeight="500" textAnchor="middle" dominantBaseline="central">{dateNum}</text>
              </g>

              {hand(232, 46, 30, hourAngle, handC, (
                <path d={`M -4 -40 L -3.6 ${-232 * 0.74} L 0 ${-232 * 0.88} L 3.6 ${-232 * 0.74} L 4 -40 Z`} fill={lume} />
              ), 'h')}
              {hand(352, 60, 22, minuteAngle, handC, (
                <path d={`M -3.2 -46 L -3 ${-352 * 0.76} L 0 ${-352 * 0.9} L 3 ${-352 * 0.76} L 3.2 -46 Z`} fill={lume} />
              ), 'm')}
              <g transform={`rotate(${chronoAngle})`} filter={`url(#${uid}-shadow)`}>
                <path d="M -1.6 110 L -1.1 -396 L 1.1 -396 L 1.6 110 Z" fill={accent} />
                <path d="M -9 80 L 0 66 L 9 80 L 0 120 Z" fill={accent} />
                <circle cx={0} cy={0} r={14} fill={accent} />
              </g>
              <circle r={7} fill={mix(accent, '#000', 0.25)} />
              <circle r={2.6} fill={steelHi} />

              <circle r={410} fill={`url(#${uid}-glass)`} />
            </svg>
            {sweep > 0 && (
              <div aria-hidden="true" style={{
                position: 'absolute', left: '12.4%', top: '12.4%', width: '75.2%', height: '75.2%', borderRadius: '50%', overflow: 'hidden',
                mixBlendMode: 'screen', pointerEvents: 'none'
              }}>
                <div style={{
                  position: 'absolute', top: '-30%', bottom: '-30%', width: '45%',
                  left: `${-60 + sweep * 170}%`, transform: 'rotate(18deg)',
                  background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.22) 42%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.22) 58%, rgba(255,255,255,0) 100%)',
                  opacity: Math.sin(Math.PI * sweep)
                }} />
              </div>
            )}
          </div>
        </div>

        <div style={{ position: 'absolute', left: colLeft, top: compact ? 22 : 48, width: colW, zIndex: 3 }}>
          <div style={label}>{eyebrow}</div>
          <h2 style={{ margin: compact ? '8px 0 0' : '14px 0 0', fontFamily: display, fontWeight: 300, fontSize: compact ? 26 : Math.min(44, colW / 9.5), lineHeight: 1.05, letterSpacing: '-0.02em', color: fg }}>{title}</h2>
        </div>

        <div aria-live="polite" style={{
          position: 'absolute', left: colLeft, width: colW, zIndex: 3,
          top: compact ? dialTop + dialSize + 22 : H * 0.36, height: compact ? 150 : 240
        }}>
          {chapters.map((c, i) => {
            const d = i - textIdx;
            return (
              <div key={i} className={`${uid}-ch`} aria-hidden={d !== 0}
                style={{ position: 'absolute', left: 0, right: 0, top: 0, opacity: d === 0 ? 1 : 0, transform: `translateY(${d === 0 ? 0 : d > 0 ? 22 : -22}px)` }}>
                <div style={{ ...label, color: accent }}>Hour {roman(i)} · {fmtTime(c.t)}</div>
                <div style={{ fontFamily: display, fontWeight: 300, fontSize: compact ? 34 : Math.min(64, colW / 6), lineHeight: 1, letterSpacing: '-0.025em', marginTop: compact ? 8 : 14 }}>{c.title}</div>
                <p style={{ margin: compact ? '10px 0 0' : '18px 0 0', fontSize: compact ? 14.5 : 16, lineHeight: 1.55, color: mix(fg, bg, 0.3), maxWidth: 400 }}>{c.text}</p>
              </div>
            );
          })}
        </div>

        <div style={{ position: 'absolute', left: colLeft, bottom: compact ? 22 : 48, width: colW, zIndex: 3, fontFamily: mono }}>
          <div style={{ display: 'flex', gap: compact ? 6 : 10, marginBottom: compact ? 14 : 22 }}>
            {chapters.map((c, i) => (
              <div key={i} style={{ flex: 1, maxWidth: 70 }}>
                <div style={{ height: 1, background: i <= textIdx ? fg : mix(fg, bg, 0.75) }} />
                <div style={{ fontSize: 10, letterSpacing: '0.12em', marginTop: 8, color: i === textIdx ? fg : muted }}>{roman(i)}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: compact ? 24 : 40 }}>
            <div>
              <div style={label}>Time</div>
              <div style={{ fontSize: compact ? 15 : 18, marginTop: 6, fontVariantNumeric: 'tabular-nums' }}>{fmtTime(timeMin)}</div>
            </div>
            <div>
              <div style={label}>Elapsed</div>
              <div style={{ fontSize: compact ? 15 : 18, marginTop: 6, fontVariantNumeric: 'tabular-nums', color: elapsed > 0 ? accent : fg }}>{fmtElapsed(elapsed)}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

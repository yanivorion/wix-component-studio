const MANIFEST = {
  "type": "Compose.Masthead",
  "description": "A magazine cover that assembles when it enters view: masthead letters drop in on springs with a slight overshoot, the issue strip slides in, the cover photograph wipes open, cover lines stagger in between drawn rules, a barcode prints bar by bar and a corner flash pops",
  "editorElement": {
    "selector": ".masthead-cover",
    "displayName": "Masthead",
    "archetype": "container",
    "data": {
      "title": { "dataType": "text", "displayName": "Masthead", "defaultValue": "Meridian", "group": "Content" },
      "issueNumber": { "dataType": "text", "displayName": "Issue Number", "defaultValue": "No. 47", "group": "Content" },
      "issueDate": { "dataType": "text", "displayName": "Issue Date", "defaultValue": "Winter 2027", "group": "Content" },
      "price": { "dataType": "text", "displayName": "Price", "defaultValue": "€14 / $16", "group": "Content" },
      "tagline": { "dataType": "text", "displayName": "Tagline", "defaultValue": "A quarterly of architecture, craft & slow living", "group": "Content" },
      "line1Kicker": { "dataType": "text", "displayName": "Cover Line 1 Kicker", "defaultValue": "Architecture", "group": "Cover Lines" },
      "line1Title": { "dataType": "text", "displayName": "Cover Line 1", "defaultValue": "The quiet houses of the Atlantic coast", "group": "Cover Lines" },
      "line2Kicker": { "dataType": "text", "displayName": "Cover Line 2 Kicker", "defaultValue": "In conversation", "group": "Cover Lines" },
      "line2Title": { "dataType": "text", "displayName": "Cover Line 2", "defaultValue": "The last lacquer master of Kyoto", "group": "Cover Lines" },
      "line3Kicker": { "dataType": "text", "displayName": "Cover Line 3 Kicker", "defaultValue": "Craft", "group": "Cover Lines" },
      "line3Title": { "dataType": "text", "displayName": "Cover Line 3", "defaultValue": "Forty hands, one chair: a year in a Danish workshop", "group": "Cover Lines" },
      "line4Kicker": { "dataType": "text", "displayName": "Cover Line 4 Kicker", "defaultValue": "Journeys", "group": "Cover Lines" },
      "line4Title": { "dataType": "text", "displayName": "Cover Line 4", "defaultValue": "Slow trains through the high Alps", "group": "Cover Lines" },
      "imageUrl": { "dataType": "text", "displayName": "Cover Image URL", "defaultValue": "https://picsum.photos/seed/meridian-cover/1100/1300?grayscale", "group": "Images" },
      "imageAlt": { "dataType": "text", "displayName": "Cover Image Alt Text", "defaultValue": "Black and white cover photograph", "group": "Images" },
      "badgeText": { "dataType": "text", "displayName": "Flash Badge", "defaultValue": "Special issue", "group": "Content" },
      "barcodeDigits": { "dataType": "text", "displayName": "Barcode Digits (13)", "defaultValue": "9771234567003", "group": "Content" },
      "paperColor": { "dataType": "color", "displayName": "Paper", "defaultValue": "#F3F0EA", "group": "Colors" },
      "inkColor": { "dataType": "color", "displayName": "Ink", "defaultValue": "#141210", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#6F6A62", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Flash Accent", "defaultValue": "#D9472B", "group": "Colors" },
      "mastheadFont": { "dataType": "select", "displayName": "Masthead Font", "defaultValue": "Fraunces", "options": ["Fraunces", "Instrument Serif", "DM Serif Display", "Playfair Display"], "group": "Typography" },
      "mastheadWeight": { "dataType": "select", "displayName": "Masthead Weight", "defaultValue": "400", "options": ["300", "400", "500"], "group": "Typography" },
      "sectionHeight": { "dataType": "select", "displayName": "Section Height (px)", "defaultValue": "800", "options": ["720", "800", "900"], "group": "Layout" },
      "showBarcode": { "dataType": "booleanValue", "displayName": "Barcode", "defaultValue": "true", "group": "Layout" },
      "showBadge": { "dataType": "booleanValue", "displayName": "Flash Badge", "defaultValue": "true", "group": "Layout" },
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
  const title = config?.title || 'Meridian';
  const issueNumber = config?.issueNumber || 'No. 47';
  const issueDate = config?.issueDate || 'Winter 2027';
  const price = config?.price || '€14 / $16';
  const tagline = config?.tagline || 'A quarterly of architecture, craft & slow living';
  const lineDefaults = [
    ['Architecture', 'The quiet houses of the Atlantic coast'],
    ['In conversation', 'The last lacquer master of Kyoto'],
    ['Craft', 'Forty hands, one chair: a year in a Danish workshop'],
    ['Journeys', 'Slow trains through the high Alps']
  ];
  const coverLines = lineDefaults.map((d, i) => ({ kicker: config?.[`line${i + 1}Kicker`] || d[0], title: config?.[`line${i + 1}Title`] || d[1] }));
  const imageUrl = config?.imageUrl || 'https://picsum.photos/seed/meridian-cover/1100/1300?grayscale';
  const imageAlt = config?.imageAlt || 'Black and white cover photograph';
  const badgeText = config?.badgeText || 'Special issue';
  const digitsRaw = String(config?.barcodeDigits || '9771234567003').replace(/\D/g, '');
  const paper = config?.paperColor || '#F3F0EA';
  const ink = config?.inkColor || '#141210';
  const muted = config?.mutedColor || '#6F6A62';
  const accent = config?.accentColor || '#D9472B';
  const mastFont = config?.mastheadFont || 'Fraunces';
  const mastWeight = config?.mastheadWeight || '400';
  const H = parseInt(config?.sectionHeight || '800', 10) || 800;
  const showBarcode = bool(config?.showBarcode, true);
  const showBadge = bool(config?.showBadge, true);
  const triggerMode = config?.triggerMode || 'entrance';
  const threshold = parseFloat(config?.threshold || '0.25') || 0.25;
  const speed = Math.max(0.25, parseFloat(config?.speed || '1') || 1);
  const showReplay = bool(config?.showReplay, true);
  const DUR = 2.5;

  const uid = React.useMemo(() => 'mh' + Math.random().toString(36).slice(2, 9), []);
  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const rootRef = React.useRef(null);
  const measureRef = React.useRef(null);
  const animRef = React.useRef(null);
  const playedRef = React.useRef(false);
  const playRef = React.useRef(null);
  const [t, setT] = React.useState(reduced || triggerMode === 'manual' ? 1 : 0);
  const [w, setW] = React.useState(1280);
  const [ratio, setRatio] = React.useState(4.3);
  const [imgOk, setImgOk] = React.useState(true);

  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    const fams = {
      Fraunces: 'Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500',
      'Instrument Serif': 'Instrument+Serif:ital@0;1',
      'DM Serif Display': 'DM+Serif+Display',
      'Playfair Display': 'Playfair+Display:wght@400;500',
      Inter: 'Inter:wght@300;400;500',
      'IBM Plex Mono': 'IBM+Plex+Mono:wght@400;500'
    };
    [mastFont, 'Inter', 'IBM Plex Mono'].forEach((f) => {
      if (!fams[f]) return;
      const id = 'gf-' + f.replace(/\s+/g, '-').toLowerCase() + (f === 'Instrument Serif' ? '-it' : '');
      if (document.getElementById(id)) return;
      const l = document.createElement('link');
      l.id = id; l.rel = 'stylesheet';
      l.href = `https://fonts.googleapis.com/css2?family=${fams[f]}&display=swap`;
      document.head.appendChild(l);
    });
  }, [mastFont]);

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return undefined;
    let alive = true;
    const measure = () => {
      if (!alive) return;
      setW(el.clientWidth || 1280);
      const m = measureRef.current;
      if (m && m.offsetWidth) setRatio(m.offsetWidth / 100);
    };
    measure();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (ro) ro.observe(el);
    window.addEventListener('resize', measure);
    const fonts = typeof document !== 'undefined' ? document.fonts : null;
    if (fonts && fonts.ready) fonts.ready.then(measure);
    if (fonts && fonts.addEventListener) fonts.addEventListener('loadingdone', measure);
    const late = setTimeout(measure, 900);
    return () => {
      alive = false;
      if (ro) ro.disconnect();
      window.removeEventListener('resize', measure);
      if (fonts && fonts.removeEventListener) fonts.removeEventListener('loadingdone', measure);
      clearTimeout(late);
    };
  }, [mastFont, mastWeight, title]);

  React.useEffect(() => { setImgOk(true); }, [imageUrl]);

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

  const clamp = (v) => Math.min(1, Math.max(0, v));
  const seg = (a, b) => clamp((t - a) / (b - a));
  const eOut = (x) => 1 - Math.pow(1 - x, 3);
  const eIO = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  const eBack = (x) => { const c1 = 2.2; const c3 = c1 + 1; return x <= 0 ? 0 : 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
  const spring = (p) => (p <= 0 ? 0 : p >= 1 ? 1 : 1 - Math.exp(-7 * p) * Math.cos(2.6 * Math.PI * p));

  const barcode = React.useMemo(() => {
    const L = ['0001101', '0011001', '0010011', '0111101', '0100011', '0110001', '0101111', '0111011', '0110111', '0001011'];
    const R = L.map((c) => c.split('').map((b) => (b === '1' ? '0' : '1')).join(''));
    const G = R.map((c) => c.split('').reverse().join(''));
    const PAR = ['LLLLLL', 'LLGLGG', 'LLGGLG', 'LLGGGL', 'LGLLGG', 'LGGLLG', 'LGGGLL', 'LGLGLG', 'LGLGGL', 'LGGLGL'];
    const dg = (digitsRaw + '0000000000000').slice(0, 13).split('').map(Number);
    let bits = '101';
    for (let i = 1; i <= 6; i++) bits += PAR[dg[0]][i - 1] === 'L' ? L[dg[i]] : G[dg[i]];
    bits += '01010';
    for (let i = 7; i <= 12; i++) bits += R[dg[i]];
    bits += '101';
    const bars = [];
    for (let i = 0; i < bits.length; i++) {
      if (bits[i] !== '1') continue;
      let j = i;
      while (bits[j + 1] === '1') j++;
      const guard = i < 3 || (i >= 45 && i < 50) || i >= 92;
      bars.push({ x: i, w: j - i + 1, guard });
      i = j;
    }
    return { bars, digits: dg.join('') };
  }, [digitsRaw]);

  const compact = w < 760;
  const m = compact ? 18 : 40;
  const mastW = w - 2 * m;
  const letters = Array.from(title);
  const mastFs = Math.min(mastW / Math.max(0.5, ratio), compact ? 120 : H * 0.34);
  const mastTop = compact ? 22 : 18;
  const mastH = mastFs * 0.86;
  const stripTop = mastTop + mastH + (compact ? 8 : 10);
  const stripH = compact ? 28 : 32;
  const bodyTop = stripTop + stripH + (compact ? 14 : 22);
  const bodyBottom = H - (compact ? 22 : m);

  const imgBox = compact
    ? { left: m, top: bodyTop, width: w - 2 * m, height: Math.min(400, (bodyBottom - bodyTop) * 0.58) }
    : { left: Math.round(w * 0.4), top: bodyTop, width: w - m - Math.round(w * 0.4), height: bodyBottom - bodyTop };
  const linesTop = compact ? imgBox.top + imgBox.height + 16 : bodyTop;
  const shownLines = coverLines;

  const serifStack = `"${mastFont}", "Times New Roman", Georgia, serif`;
  const sans = '"Inter", -apple-system, "Helvetica Neue", sans-serif';
  const mono = '"IBM Plex Mono", ui-monospace, Menlo, monospace';
  const mastLetterSpacing = '-0.035em';

  const stripP = eOut(seg(0.26, 0.46));
  const imgP = eIO(seg(0.2, 0.6));
  const badgeP = seg(0.8, 0.96);
  const badgeS = eBack(badgeP);
  const digitsP = eOut(seg(0.84, 0.96));
  const nb = barcode.bars.length;

  const badgeR = compact ? 42 : 58;
  const badgeC = compact
    ? { x: imgBox.left + imgBox.width - badgeR * 0.7, y: imgBox.top + badgeR * 0.7 }
    : { x: imgBox.left + 6, y: imgBox.top + badgeR + 26 };
  const badgeWords = badgeText.split(/\s+/);
  const half = Math.ceil(badgeWords.length / 2);
  const badgeLines = badgeWords.length > 1 ? [badgeWords.slice(0, half).join(' '), badgeWords.slice(half).join(' ')] : [badgeText];

  const bcW = compact ? 96 : 132;
  const bcH = compact ? 34 : 48;
  const barcodeBox = { left: imgBox.left + imgBox.width - bcW - (compact ? 30 : 36), top: imgBox.top + imgBox.height - bcH - (compact ? 34 : 44) };

  return (
    <section ref={rootRef} className="masthead-cover" aria-label={`${title}, ${issueNumber}, ${issueDate}`}
      style={{ position: 'relative', width: '100%', height: `${H}px`, overflow: 'hidden', backgroundColor: paper, color: ink, fontFamily: sans }}>
      <style>{`.${uid}-rp{opacity:.6;transition:opacity .2s}.${uid}-rp:hover{opacity:1}.${uid}-rp:focus-visible{opacity:1;outline:2px solid ${accent};outline-offset:3px}`}</style>

      <span ref={measureRef} aria-hidden="true" style={{ position: 'absolute', visibility: 'hidden', whiteSpace: 'pre', fontFamily: serifStack, fontWeight: mastWeight, fontSize: 100, letterSpacing: mastLetterSpacing, lineHeight: 1, left: -9999, top: 0, fontVariationSettings: mastFont === 'Fraunces' ? '"opsz" 144' : undefined }}>{title}</span>

      <h2 aria-label={title} style={{ position: 'absolute', left: m, top: mastTop, width: mastW, margin: 0, height: mastH, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', whiteSpace: 'pre', fontFamily: serifStack, fontWeight: mastWeight, fontSize: mastFs, lineHeight: 0.86, letterSpacing: mastLetterSpacing, fontVariationSettings: mastFont === 'Fraunces' ? '"opsz" 144' : undefined }}>
        {letters.map((ch, i) => {
          const st = 0.02 + (letters.length > 1 ? (i / (letters.length - 1)) * 0.22 : 0);
          const p = clamp((t - st) / 0.34);
          const s = spring(p);
          return (
            <span key={i} aria-hidden="true" style={{ display: 'inline-block', transform: `translateY(${(1 - s) * -(mastFs + mastTop + 20)}px) rotate(${(1 - s) * (i % 2 ? 7 : -6)}deg)`, opacity: clamp(p * 5), transformOrigin: '50% 100%' }}>{ch}</span>
          );
        })}
      </h2>

      <div style={{ position: 'absolute', left: m, right: m, top: stripTop, height: stripH, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, fontFamily: mono, fontSize: compact ? 10 : 11, letterSpacing: '0.14em', textTransform: 'uppercase', overflow: 'hidden' }}>
        <span style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 1, background: ink, transformOrigin: 'left', transform: `scaleX(${stripP})` }} />
        <span style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 1, background: ink, transformOrigin: 'right', transform: `scaleX(${stripP})` }} />
        <span style={{ fontWeight: 500, transform: `translateX(${(1 - stripP) * -40}px)`, opacity: stripP }}>{issueNumber}</span>
        {!compact && <span style={{ color: muted, transform: `translateX(${(1 - stripP) * -40}px)`, opacity: stripP, fontFamily: serifStack, fontStyle: 'italic', textTransform: 'none', letterSpacing: 0, fontSize: 14 }}>{tagline}</span>}
        <span style={{ transform: `translateX(${(1 - stripP) * -40}px)`, opacity: stripP, whiteSpace: 'nowrap' }}>{issueDate}<span style={{ color: muted }}>{'  ·  '}</span>{price}</span>
      </div>

      <div style={{ position: 'absolute', ...imgBox, overflow: 'hidden', background: '#D6D3D1', clipPath: `inset(0 ${((1 - imgP) * 100).toFixed(2)}% 0 0)` }}>
        {imageUrl && imgOk ? (
          <img src={imageUrl} alt={imageAlt} onError={() => setImgOk(false)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: `scale(${1.14 - 0.14 * imgP})`, transformOrigin: '30% 50%', filter: 'grayscale(1) contrast(1.06)' }} />
        ) : (
          <div role="img" aria-label="No cover image" style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center', color: muted, fontSize: 12, fontFamily: mono, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Add a cover image URL</div>
        )}
        <span style={{ position: 'absolute', left: 14, bottom: 12, fontFamily: mono, fontSize: 9.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#FFFFFF', opacity: 0.8 * digitsP, mixBlendMode: 'difference' }}>Photograph — {issueNumber}</span>
      </div>

      <div style={{ position: 'absolute', left: m, top: linesTop, width: compact ? w - 2 * m : imgBox.left - m - 44 }}>
        {shownLines.map((ln, k) => {
          const p = eOut(seg(0.4 + k * 0.07, 0.62 + k * 0.07));
          const rp = eOut(seg(0.38 + k * 0.07, 0.56 + k * 0.07));
          return (
            <div key={k} style={{ position: 'relative', padding: compact ? (k === 0 ? '0 0 10px' : '9px 0 10px') : k === 0 ? '0 0 18px' : '16px 0 18px' }}>
              {k > 0 && <span style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 1, background: ink, opacity: 0.85, transformOrigin: 'left', transform: `scaleX(${rp})` }} />}
              <div style={{ display: 'flex', gap: 10, alignItems: 'baseline', fontFamily: mono, fontSize: compact ? 9.5 : 10.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: k === 0 ? accent : muted, opacity: p }}>
                <span>{String(k + 1).padStart(2, '0')}</span><span>{ln.kicker}</span>
              </div>
              <div style={{ marginTop: compact ? 4 : 8, fontFamily: serifStack, fontWeight: 400, fontSize: compact ? 18 : k === 0 ? 34 : 24, lineHeight: 1.1, letterSpacing: '-0.012em', opacity: p, transform: `translateX(${(1 - p) * -18}px)`, fontVariationSettings: mastFont === 'Fraunces' ? '"opsz" 72' : undefined }}>{ln.title}</div>
            </div>
          );
        })}
      </div>

      {showBarcode && (
        <div aria-label={`Barcode ${barcode.digits}`} role="img" style={{ position: 'absolute', left: barcodeBox.left, top: barcodeBox.top, padding: compact ? '6px 8px 4px' : '9px 12px 6px', background: '#FFFFFF' }}>
          <svg width={bcW} height={bcH + (compact ? 10 : 14)} viewBox={`0 0 95 ${bcH + (compact ? 10 : 14)}`} preserveAspectRatio="none" style={{ display: 'block' }}>
            {barcode.bars.map((b, j) => {
              const p = eOut(seg(0.6 + (j / nb) * 0.22, 0.66 + (j / nb) * 0.22));
              const hh = (b.guard ? bcH + 6 : bcH) * p;
              return <rect key={j} x={b.x} y={0} width={b.w} height={hh} fill={ink} />;
            })}
          </svg>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: bcW, marginTop: compact ? -8 : -10, fontFamily: mono, fontSize: compact ? 8 : 10, letterSpacing: '0.08em', opacity: digitsP, background: '#FFFFFF' }}>
            <span>{barcode.digits.slice(0, 1)}</span><span>{barcode.digits.slice(1, 7)}</span><span>{barcode.digits.slice(7)}</span>
          </div>
        </div>
      )}

      {showBadge && badgeText && (
        <div aria-label={badgeText} role="note" style={{ position: 'absolute', left: badgeC.x - badgeR, top: badgeC.y - badgeR, width: badgeR * 2, height: badgeR * 2, borderRadius: '50%', background: accent, color: '#FFFFFF', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', transform: `scale(${Math.max(0, badgeS)}) rotate(${-12 - (1 - clamp(badgeP * 1.4)) * 24}deg)`, opacity: badgeP > 0 ? 1 : 0, boxShadow: '0 6px 20px rgba(0,0,0,0.12)' }}>
          {badgeLines.map((l, k) => (
            <span key={k} style={{ fontFamily: serifStack, fontStyle: 'italic', fontWeight: 400, fontSize: compact ? 15 : 21, lineHeight: 1.02 }}>{l}</span>
          ))}
          <span style={{ marginTop: compact ? 4 : 6, fontFamily: mono, fontSize: compact ? 7.5 : 8.5, letterSpacing: '0.16em', textTransform: 'uppercase' }}>{issueNumber}</span>
        </div>
      )}

      {showReplay && (
        <button type="button" className={`${uid}-rp`} aria-label="Replay cover animation"
          onClick={() => { playedRef.current = true; playRef.current(); }}
          style={{ position: 'absolute', ...(compact ? { left: imgBox.left + 10, top: imgBox.top + 10 } : { right: m + 12, top: imgBox.top + 12 }), appearance: 'none', border: 'none', background: paper, color: ink, borderRadius: 999, padding: '6px 12px', fontFamily: mono, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer', visibility: t >= 1 ? 'visible' : 'hidden' }}>
          ↻ Replay
        </button>
      )}
    </section>
  );
}

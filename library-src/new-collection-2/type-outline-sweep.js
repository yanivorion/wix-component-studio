const MANIFEST = {
  "type": "Type.OutlineSweep",
  "description": "Poster of giant uppercase outline words that fill solid with a horizontal clip sweep as each row enters view, alternating direction; rows drift sideways with scroll, and hovering a row sweeps its fill back out while the letters part to reveal a small photograph",
  "editorElement": {
    "selector": ".outline-sweep",
    "displayName": "Outline Sweep",
    "archetype": "container",
    "data": {
      "topLeft": { "dataType": "text", "displayName": "Top Left", "defaultValue": "Studio Norden", "group": "Content" },
      "topRight": { "dataType": "text", "displayName": "Top Right", "defaultValue": "Manifesto — 2026", "group": "Content" },
      "words": { "dataType": "text", "displayName": "Rows (comma separated)", "defaultValue": "Quiet,Forms,Lasting,Spaces", "group": "Content" },
      "footerText": { "dataType": "text", "displayName": "Footer Text", "defaultValue": "We design buildings that age gracefully, rooted in place, material and light.", "group": "Content" },
      "footerRight": { "dataType": "text", "displayName": "Footer Right", "defaultValue": "Oslo / Lisbon — Est. 2009", "group": "Content" },
      "images": { "dataType": "text", "displayName": "Peek Images (comma separated)", "defaultValue": "https://picsum.photos/id/1048/600/400,https://picsum.photos/id/1076/600/400,https://picsum.photos/id/618/600/400,https://picsum.photos/id/1081/600/400", "group": "Images" },
      "imageFilter": { "dataType": "select", "displayName": "Image Treatment", "defaultValue": "none", "options": ["none", "grayscale", "muted"], "group": "Images" },
      "triggerMode": { "dataType": "select", "displayName": "Trigger", "defaultValue": "entrance", "options": ["entrance", "scroll", "manual"], "group": "Animation" },
      "threshold": { "dataType": "select", "displayName": "Trigger Threshold", "defaultValue": "0.35", "options": ["0.1", "0.35", "0.6"], "group": "Animation" },
      "sweepDuration": { "dataType": "select", "displayName": "Sweep Duration (ms)", "defaultValue": "1200", "options": ["800", "1200", "1600", "2000"], "group": "Animation" },
      "rowStagger": { "dataType": "select", "displayName": "Row Stagger (ms)", "defaultValue": "160", "options": ["0", "100", "160", "260"], "group": "Animation" },
      "firstDirection": { "dataType": "select", "displayName": "First Sweep Direction", "defaultValue": "left", "options": ["left", "right"], "group": "Animation" },
      "parallax": { "dataType": "select", "displayName": "Scroll Drift", "defaultValue": "medium", "options": ["off", "subtle", "medium", "strong"], "group": "Animation" },
      "hoverEffect": { "dataType": "booleanValue", "displayName": "Hover Reverse + Image", "defaultValue": "true", "group": "Animation" },
      "idleDemo": { "dataType": "booleanValue", "displayName": "Idle Demo (until first hover)", "defaultValue": "true", "group": "Animation" },
      "alignment": { "dataType": "select", "displayName": "Row Alignment", "defaultValue": "staggered", "options": ["staggered", "left", "center"], "group": "Layout" },
      "showIndex": { "dataType": "booleanValue", "displayName": "Row Index", "defaultValue": "true", "group": "Layout" },
      "showFooter": { "dataType": "booleanValue", "displayName": "Footer", "defaultValue": "true", "group": "Layout" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#F5F5F4", "group": "Colors" },
      "inkColor": { "dataType": "color", "displayName": "Ink", "defaultValue": "#1C1917", "group": "Colors" },
      "strokeColor": { "dataType": "color", "displayName": "Outline", "defaultValue": "#1C1917", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#78716C", "group": "Colors" },
      "fontFamily": { "dataType": "select", "displayName": "Font", "defaultValue": "Inter Tight", "options": ["Inter Tight", "DM Sans", "Fraunces", "system-ui"], "group": "Typography" },
      "fontWeight": { "dataType": "select", "displayName": "Weight", "defaultValue": "500", "options": ["300", "400", "500"], "group": "Typography" },
      "maxSize": { "dataType": "select", "displayName": "Max Size (px)", "defaultValue": "184", "options": ["140", "164", "184", "220", "260"], "group": "Typography" },
      "strokeWidth": { "dataType": "select", "displayName": "Outline Width (px)", "defaultValue": "1.5", "options": ["1", "1.5", "2", "3"], "group": "Typography" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const split = (s) => String(s || '').split(',').map((x) => x.trim()).filter(Boolean);
  const topLeft = config?.topLeft || 'Studio Norden';
  const topRight = config?.topRight || 'Manifesto — 2026';
  const words = split(config?.words || 'Quiet,Forms,Lasting,Spaces').map((w) => w.toUpperCase());
  const footerText = config?.footerText || 'We design buildings that age gracefully, rooted in place, material and light.';
  const footerRight = config?.footerRight || 'Oslo / Lisbon — Est. 2009';
  const images = split(config?.images || 'https://picsum.photos/id/1048/600/400,https://picsum.photos/id/1076/600/400,https://picsum.photos/id/618/600/400,https://picsum.photos/id/1081/600/400');
  const imageFilter = config?.imageFilter || 'none';
  const triggerMode = config?.triggerMode || 'entrance';
  const threshold = parseFloat(config?.threshold || '0.35') || 0.35;
  const dur = parseInt(config?.sweepDuration || '1200', 10) || 1200;
  const rowStagger = parseInt(config?.rowStagger ?? '160', 10) || 0;
  const firstLeft = (config?.firstDirection || 'left') === 'left';
  const drift = { off: 0, subtle: 0.05, medium: 0.1, strong: 0.18 }[config?.parallax || 'medium'] ?? 0.1;
  const hoverEffect = bool(config?.hoverEffect, true);
  const idleDemo = bool(config?.idleDemo, true);
  const alignment = config?.alignment || 'staggered';
  const showIndex = bool(config?.showIndex, true);
  const showFooter = bool(config?.showFooter, true);
  const bg = config?.backgroundColor || '#F5F5F4';
  const ink = config?.inkColor || '#1C1917';
  const strokeColor = config?.strokeColor || '#1C1917';
  const muted = config?.mutedColor || '#78716C';
  const fontFamily = config?.fontFamily || 'Inter Tight';
  const fontWeight = config?.fontWeight || '500';
  const maxSize = parseInt(config?.maxSize || '184', 10) || 184;
  const strokeW = parseFloat(config?.strokeWidth || '1.5') || 1.5;

  const uid = React.useMemo(() => 'os' + Math.random().toString(36).slice(2, 9), []);
  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const rootRef = React.useRef(null);
  const rowRefs = React.useRef([]);
  const driftRefs = React.useRef([]);
  const [width, setWidth] = React.useState(1280);
  const [stageH, setStageH] = React.useState(800);
  const [filled, setFilled] = React.useState(() => words.map(() => reduced));
  const [hovered, setHovered] = React.useState(null);
  const [idle, setIdle] = React.useState(null);
  const [touched, setTouched] = React.useState(false);
  const [entranceDone, setEntranceDone] = React.useState(false);

  React.useEffect(() => {
    const fam = {
      'Inter Tight': 'Inter+Tight:wght@300;400;500',
      'DM Sans': 'DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500',
      'Fraunces': 'Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500'
    };
    [fam[fontFamily], 'Inter:wght@400;500'].filter(Boolean).forEach((f) => {
      const id = 'gf-' + f.replace(/[^a-z0-9]/gi, '').slice(0, 40);
      if (document.getElementById(id)) return;
      const l = document.createElement('link');
      l.id = id; l.rel = 'stylesheet';
      l.href = `https://fonts.googleapis.com/css2?family=${f}&display=swap`;
      document.head.appendChild(l);
    });
  }, [fontFamily]);

  React.useEffect(() => { setFilled(words.map(() => reduced)); }, [words.length, reduced]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (reduced || triggerMode === 'manual') {
      if (triggerMode === 'manual' && !reduced) {
        const t = setTimeout(() => setFilled(words.map(() => true)), 200);
        return () => clearTimeout(t);
      }
      return undefined;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const i = rowRefs.current.indexOf(e.target);
        if (i < 0) return;
        if (e.isIntersecting) setFilled((f) => (f[i] ? f : f.map((v, k) => (k === i ? true : v))));
        else if (triggerMode === 'scroll') setFilled((f) => (f[i] ? f.map((v, k) => (k === i ? false : v)) : f));
      });
    }, { threshold });
    rowRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [triggerMode, threshold, reduced, words.length]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    const t = setTimeout(() => setEntranceDone(true), dur + rowStagger * words.length + 400);
    return () => clearTimeout(t);
  }, [dur, rowStagger, words.length]);

  React.useEffect(() => {
    if (!idleDemo || !hoverEffect || touched || reduced || !entranceDone || words.length < 1) return undefined;
    let step = 0;
    let off = 0;
    const order = [1, 3, 0, 2].filter((i) => i < words.length);
    const seq = order.length ? order : [0];
    const run = () => {
      setIdle(seq[step % seq.length]);
      step += 1;
      off = setTimeout(() => setIdle(null), 1900);
    };
    run();
    const id = setInterval(run, 3600);
    return () => { clearInterval(id); clearTimeout(off); };
  }, [idleDemo, hoverEffect, touched, reduced, entranceDone, words.length]);

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return undefined;
    const s = typeof getScrollContainer === 'function' ? getScrollContainer() : null;
    const scroller = s && s !== window && s.nodeType === 1 ? s : window;
    let raf = 0;
    let target = 0.5;
    let cur = 0.5;
    const read = () => {
      const r = el.getBoundingClientRect();
      const top = scroller === window ? 0 : scroller.getBoundingClientRect().top;
      const vh = scroller === window ? window.innerHeight : scroller.getBoundingClientRect().height;
      const relTop = r.top - top;
      target = Math.min(1, Math.max(0, (vh - relTop) / (vh + r.height)));
    };
    const apply = () => {
      const w = el.clientWidth || 1280;
      driftRefs.current.forEach((d, i) => {
        if (!d) return;
        const sgn = i % 2 ? -1 : 1;
        d.style.transform = `translate3d(${((cur - 0.5) * drift * w * sgn).toFixed(2)}px,0,0)`;
      });
    };
    const tick = () => {
      const d = target - cur;
      cur = Math.abs(d) < 0.0005 ? target : cur + d * 0.12;
      apply();
      raf = cur === target ? 0 : requestAnimationFrame(tick);
    };
    const onScroll = () => { read(); if (!raf) raf = requestAnimationFrame(tick); };
    const measure = () => {
      setWidth(el.clientWidth || 1280);
      setStageH(scroller === window ? window.innerHeight : scroller.clientHeight);
      read(); cur = target; apply();
    };
    measure();
    if (drift > 0 && !reduced) scroller.addEventListener('scroll', onScroll, { passive: true });
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (ro) ro.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      scroller.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
      if (ro) ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [drift, reduced]);

  const replay = () => {
    setFilled(words.map(() => false));
    setTimeout(() => setFilled(words.map(() => true)), 60);
  };

  const compact = width < 760;
  const pad = compact ? 20 : 56;
  const maxLen = words.reduce((m, w) => Math.max(m, w.length), 1);
  const serif = fontFamily === 'Fraunces';
  const glyph = serif ? 0.7 : 0.68;
  const size = Math.max(40, Math.min(compact ? maxSize * 0.5 : maxSize, (width - pad * 2) / (maxLen * glyph + 0.25)));
  const sans = '"Inter", -apple-system, "Helvetica Neue", Arial, sans-serif';
  const display = fontFamily === 'system-ui' ? sans
    : serif ? '"Fraunces", "Iowan Old Style", Georgia, serif'
    : `"${fontFamily}", "Inter", -apple-system, "Helvetica Neue", Arial, sans-serif`;
  const filterCss = imageFilter === 'grayscale' ? 'grayscale(1) contrast(1.05)' : imageFilter === 'muted' ? 'saturate(0.6)' : 'none';
  const vPad = Math.round(Math.max(compact ? 40 : 56, stageH * (compact ? 0.08 : 0.065)));
  const p = uid;
  const pad2 = (n) => String(n).padStart(2, '0');
  const ease = 'cubic-bezier(0.77, 0, 0.18, 1)';

  const justifyFor = (i) => {
    if (alignment === 'left') return 'flex-start';
    if (alignment === 'center') return 'center';
    return ['flex-start', 'flex-end', 'center', 'flex-end', 'flex-start'][i % 5];
  };

  if (!words.length) {
    return (
      <section className="outline-sweep" style={{ width: '100%', padding: 64, background: bg, color: muted, fontFamily: sans, textAlign: 'center', fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
        Add words to build the poster
      </section>
    );
  }

  const rowContent = (word, i, on, layer) => {
    const cut = Math.max(1, Math.ceil(word.length / 2));
    const a = word.slice(0, cut);
    const b = word.slice(cut);
    const img = images.length ? images[i % images.length] : '';
    return (
      <>
        <span style={{ whiteSpace: 'pre' }}>{a}</span>
        {hoverEffect && (
          <span style={{
            position: 'relative', display: 'inline-block', verticalAlign: 'middle', overflow: 'hidden',
            width: on ? '0.92em' : '0em', height: '0.6em', margin: on ? '0 0.06em' : '0',
            borderRadius: '0.06em', transform: 'translateY(-0.05em)',
            transition: reduced ? 'none' : `width 900ms cubic-bezier(0.76,0,0.24,1) ${on ? 120 : 0}ms, margin 900ms cubic-bezier(0.76,0,0.24,1) ${on ? 120 : 0}ms`
          }}>
            {layer === 'outline' && img && (
              <img src={img} alt="" draggable="false" style={{
                position: 'absolute', top: 0, left: '50%', width: '0.92em', height: '100%', maxWidth: 'none', objectFit: 'cover', display: 'block', filter: filterCss,
                transform: `translateX(-50%) scale(${on ? 1 : 1.4})`,
                transition: reduced ? 'none' : `transform 1300ms cubic-bezier(0.22,1,0.36,1) ${on ? 120 : 0}ms`
              }} />
            )}
          </span>
        )}
        <span style={{ whiteSpace: 'pre' }}>{b}</span>
      </>
    );
  };

  return (
    <section
      ref={rootRef}
      className={`outline-sweep ${p}`}
      aria-label={words.join(' ')}
      style={{ position: 'relative', width: '100%', background: bg, color: ink, fontFamily: sans, overflow: 'hidden', boxSizing: 'border-box', padding: `${compact ? 24 : 36}px ${pad}px ${compact ? 24 : 36}px` }}
    >
      <style>{`
        .${p} button:focus-visible { outline: 2px solid ${ink}; outline-offset: 3px; }
        @media (prefers-reduced-motion: reduce) { .${p} * { transition: none !important; } }
      `}</style>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, fontSize: compact ? 11 : 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: muted }}>
        <span style={{ color: ink }}>{topLeft}</span>
        <span style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          {topRight}
          {triggerMode === 'manual' && (
            <button onClick={replay} aria-label="Replay sweep" style={{ appearance: 'none', border: `1px solid ${muted}66`, background: 'transparent', color: ink, borderRadius: 999, padding: '6px 12px', font: 'inherit', fontSize: 11, letterSpacing: '0.14em', cursor: 'pointer' }}>Replay</button>
          )}
        </span>
      </div>

      <div style={{ padding: `${vPad}px 0 ${showFooter ? vPad * 0.8 : vPad}px` }}>
        {words.map((word, i) => {
          const ltr = (i % 2 === 0) === firstLeft;
          const on = hoverEffect && (hovered === i || (!touched && idle === i));
          const isFilled = filled[i];
          const clip = !isFilled
            ? (ltr ? 'inset(-10% 106% -10% -6%)' : 'inset(-10% -6% -10% 106%)')
            : on
              ? (ltr ? 'inset(-10% -6% -10% 106%)' : 'inset(-10% 106% -10% -6%)')
              : 'inset(-10% -6% -10% -6%)';
          const delay = entranceDone || on ? 0 : i * rowStagger;
          const textStyle = { fontFamily: display, fontWeight, fontSize: size, lineHeight: 0.9, letterSpacing: serif ? '-0.02em' : '-0.035em', whiteSpace: 'nowrap', display: 'block', paddingTop: '0.04em' };
          return (
            <div
              key={i}
              ref={(el) => { rowRefs.current[i] = el; }}
              onMouseEnter={() => { setTouched(true); setHovered(i); }}
              onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
              style={{ display: 'flex', justifyContent: justifyFor(i), paddingLeft: alignment === 'staggered' && i % 5 === 2 ? 0 : 0, margin: `${Math.round(size * 0.02)}px 0` }}
            >
              <div ref={(el) => { driftRefs.current[i] = el; }} style={{ position: 'relative', willChange: 'transform' }}>
                {showIndex && (
                  <span aria-hidden="true" style={{
                    position: 'absolute', top: Math.round(size * 0.1), [ltr ? 'right' : 'left']: compact ? -2 : -Math.round(size * 0.26),
                    fontSize: compact ? 10 : 12, letterSpacing: '0.1em', color: muted, fontVariantNumeric: 'tabular-nums',
                    transform: compact ? `translateY(-${Math.round(size * 0.3)}px)` : 'none',
                    opacity: isFilled ? 1 : 0, transition: `opacity 600ms ease ${delay + dur * 0.6}ms`
                  }}>({pad2(i + 1)})</span>
                )}
                <span aria-hidden="true" style={{ ...textStyle, color: 'transparent', WebkitTextStroke: `${strokeW}px ${strokeColor}` }}>
                  {rowContent(word, i, on, 'outline')}
                </span>
                <span aria-hidden="true" style={{
                  ...textStyle, position: 'absolute', inset: 0, color: ink, pointerEvents: 'none',
                  clipPath: clip, WebkitClipPath: clip,
                  transition: reduced ? 'none' : `clip-path ${on || entranceDone ? Math.round(dur * 0.85) : dur}ms ${ease} ${delay}ms, -webkit-clip-path ${on || entranceDone ? Math.round(dur * 0.85) : dur}ms ${ease} ${delay}ms`
                }}>
                  {rowContent(word, i, on, 'solid')}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {showFooter && (
        <div style={{ display: 'flex', flexDirection: compact ? 'column' : 'row', justifyContent: 'space-between', alignItems: compact ? 'flex-start' : 'flex-end', gap: compact ? 12 : 32, borderTop: `1px solid ${muted}40`, paddingTop: compact ? 16 : 20 }}>
          <p style={{ margin: 0, maxWidth: 440, fontSize: compact ? 15 : 17, lineHeight: 1.45, letterSpacing: '-0.01em', color: ink }}>{footerText}</p>
          <span style={{ fontSize: compact ? 11 : 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: muted }}>{footerRight}</span>
        </div>
      )}
    </section>
  );
}

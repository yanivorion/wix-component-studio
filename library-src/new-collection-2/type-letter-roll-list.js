const MANIFEST = {
  "type": "Type.LetterRollList",
  "description": "Huge typographic index list: hovering or focusing a row rolls every letter up to a duplicate with a staggered wave, slides its number and category, and opens a rounded photo inline beside the word while the other rows dim",
  "editorElement": {
    "selector": ".letter-roll-list",
    "displayName": "Letter Roll List",
    "archetype": "container",
    "data": {
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Selected work", "group": "Content" },
      "headerRight": { "dataType": "text", "displayName": "Header Right", "defaultValue": "Index — 2019 / 2026", "group": "Content" },
      "words": { "dataType": "text", "displayName": "Words (comma separated)", "defaultValue": "Monolith,Saltmarsh,Aperture,Meridian,Halcyon,Ember", "group": "Items" },
      "categories": { "dataType": "text", "displayName": "Categories (comma separated)", "defaultValue": "Residential,Landscape,Cultural,Hospitality,Interiors,Objects", "group": "Items" },
      "years": { "dataType": "text", "displayName": "Years (comma separated)", "defaultValue": "2026,2025,2025,2024,2023,2022", "group": "Items" },
      "hoverLabel": { "dataType": "text", "displayName": "Hover Label", "defaultValue": "View project", "group": "Items" },
      "links": { "dataType": "text", "displayName": "Links (comma separated)", "defaultValue": "", "group": "Items" },
      "images": { "dataType": "text", "displayName": "Image URLs (comma separated)", "defaultValue": "https://picsum.photos/id/1031/800/500,https://picsum.photos/id/1050/800/500,https://picsum.photos/id/942/800/500,https://picsum.photos/id/1076/800/500,https://picsum.photos/id/1068/800/500,https://picsum.photos/id/866/800/500", "group": "Images" },
      "imageShape": { "dataType": "select", "displayName": "Image Shape", "defaultValue": "pill", "options": ["pill", "rounded", "circle"], "group": "Images" },
      "imageWidth": { "dataType": "select", "displayName": "Image Width (em)", "defaultValue": "1.7", "options": ["1.2", "1.5", "1.7", "2.1"], "group": "Images" },
      "imageFilter": { "dataType": "select", "displayName": "Image Treatment", "defaultValue": "none", "options": ["none", "grayscale", "muted"], "group": "Images" },
      "restingRow": { "dataType": "number", "displayName": "Resting Active Row (0 = none)", "defaultValue": "2", "group": "Animation" },
      "idleCycle": { "dataType": "booleanValue", "displayName": "Idle Demo (until first hover)", "defaultValue": "true", "group": "Animation" },
      "rollStyle": { "dataType": "select", "displayName": "Duplicate Style", "defaultValue": "italic", "options": ["same", "italic", "accent"], "group": "Animation" },
      "rollEase": { "dataType": "select", "displayName": "Roll Easing", "defaultValue": "silk", "options": ["silk", "expo", "overshoot"], "group": "Animation" },
      "rollDuration": { "dataType": "select", "displayName": "Roll Duration (ms)", "defaultValue": "720", "options": ["500", "720", "900", "1200"], "group": "Animation" },
      "rollStagger": { "dataType": "select", "displayName": "Letter Stagger (ms)", "defaultValue": "24", "options": ["12", "24", "36", "50"], "group": "Animation" },
      "dimOpacity": { "dataType": "select", "displayName": "Dim Others", "defaultValue": "0.22", "options": ["0.12", "0.22", "0.35", "0.5", "1"], "group": "Animation" },
      "showNumbers": { "dataType": "booleanValue", "displayName": "Numbers", "defaultValue": "true", "group": "Layout" },
      "showCategory": { "dataType": "booleanValue", "displayName": "Category", "defaultValue": "true", "group": "Layout" },
      "showYear": { "dataType": "booleanValue", "displayName": "Year", "defaultValue": "true", "group": "Layout" },
      "showDividers": { "dataType": "booleanValue", "displayName": "Dividers", "defaultValue": "true", "group": "Layout" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#0C0C0D", "group": "Colors" },
      "textColor": { "dataType": "color", "displayName": "Text", "defaultValue": "#FAFAF9", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#A8A29E", "group": "Colors" },
      "lineColor": { "dataType": "color", "displayName": "Divider", "defaultValue": "#292524", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent", "defaultValue": "#E7D9C4", "group": "Colors" },
      "fontFamily": { "dataType": "select", "displayName": "Font", "defaultValue": "Inter Tight", "options": ["Inter Tight", "Fraunces", "DM Sans", "Instrument Serif", "system-ui"], "group": "Typography" },
      "fontSize": { "dataType": "select", "displayName": "Max Size (px)", "defaultValue": "92", "options": ["80", "92", "104", "120", "140"], "group": "Typography" },
      "fontWeight": { "dataType": "select", "displayName": "Weight", "defaultValue": "400", "options": ["300", "400", "500"], "group": "Typography" },
      "textCase": { "dataType": "select", "displayName": "Case", "defaultValue": "none", "options": ["none", "uppercase"], "group": "Typography" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const split = (s) => String(s || '').split(',').map((x) => x.trim());
  const eyebrow = config?.eyebrow || 'Selected work';
  const headerRight = config?.headerRight || 'Index — 2019 / 2026';
  const words = split(config?.words || 'Monolith,Saltmarsh,Aperture,Meridian,Halcyon,Ember').filter(Boolean);
  const categories = split(config?.categories || 'Residential,Landscape,Cultural,Hospitality,Interiors,Objects');
  const years = split(config?.years || '2026,2025,2025,2024,2023,2022');
  const hoverLabel = config?.hoverLabel || 'View project';
  const links = split(config?.links || '');
  const images = split(config?.images || 'https://picsum.photos/id/1031/800/500,https://picsum.photos/id/1050/800/500,https://picsum.photos/id/942/800/500,https://picsum.photos/id/1076/800/500,https://picsum.photos/id/1068/800/500,https://picsum.photos/id/866/800/500').filter(Boolean);
  const imageShape = config?.imageShape || 'pill';
  const imgEm = parseFloat(config?.imageWidth || '1.7') || 1.7;
  const imageFilter = config?.imageFilter || 'none';
  const restingRow = parseInt(config?.restingRow ?? '2', 10);
  const idleCycle = bool(config?.idleCycle, true);
  const rollStyle = config?.rollStyle || 'italic';
  const ease = { silk: 'cubic-bezier(0.65, 0, 0.35, 1)', expo: 'cubic-bezier(0.87, 0, 0.13, 1)', overshoot: 'cubic-bezier(0.34, 1.36, 0.64, 1)' }[config?.rollEase || 'silk'] || 'cubic-bezier(0.65, 0, 0.35, 1)';
  const rollDur = parseInt(config?.rollDuration || '720', 10) || 720;
  const stagger = parseInt(config?.rollStagger || '24', 10) || 24;
  const dim = parseFloat(config?.dimOpacity || '0.22');
  const showNumbers = bool(config?.showNumbers, true);
  const showCategory = bool(config?.showCategory, true);
  const showYear = bool(config?.showYear, true);
  const showDividers = bool(config?.showDividers, true);
  const bg = config?.backgroundColor || '#0C0C0D';
  const text = config?.textColor || '#FAFAF9';
  const muted = config?.mutedColor || '#A8A29E';
  const line = config?.lineColor || '#292524';
  const accent = config?.accentColor || '#E7D9C4';
  const fontFamily = config?.fontFamily || 'Inter Tight';
  const maxSize = parseInt(config?.fontSize || '92', 10) || 92;
  const fontWeight = config?.fontWeight || '400';
  const upper = (config?.textCase || 'none') === 'uppercase';

  const uid = React.useMemo(() => 'lr' + Math.random().toString(36).slice(2, 9), []);
  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const rootRef = React.useRef(null);
  const [width, setWidth] = React.useState(1280);
  const [hovered, setHovered] = React.useState(null);
  const [focused, setFocused] = React.useState(null);
  const [idle, setIdle] = React.useState(null);
  const [touched, setTouched] = React.useState(false);
  const [entered, setEntered] = React.useState(reduced);
  const [settled, setSettled] = React.useState(reduced);

  React.useEffect(() => {
    const fam = {
      'Inter Tight': 'Inter+Tight:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500',
      'Fraunces': 'Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,300;1,9..144,400;1,9..144,500',
      'DM Sans': 'DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300;1,9..40,400;1,9..40,500',
      'Instrument Serif': 'Instrument+Serif:ital@0;1'
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

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return undefined;
    const measure = () => setWidth(el.clientWidth || 1280);
    measure();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (ro) ro.observe(el);
    return () => { if (ro) ro.disconnect(); };
  }, []);

  React.useEffect(() => {
    if (reduced) return undefined;
    let raf2 = 0;
    const raf = requestAnimationFrame(() => { raf2 = requestAnimationFrame(() => setEntered(true)); });
    const t = setTimeout(() => setSettled(true), 1150);
    return () => { cancelAnimationFrame(raf); cancelAnimationFrame(raf2); clearTimeout(t); };
  }, [reduced]);

  React.useEffect(() => {
    if (!idleCycle || touched || reduced || words.length < 2 || !settled) return undefined;
    const base = restingRow > 0 ? restingRow - 1 : 0;
    let step = 0;
    const id = setInterval(() => {
      step += 1;
      setIdle((base + step) % words.length);
    }, 2600);
    return () => clearInterval(id);
  }, [idleCycle, touched, reduced, words.length, settled, restingRow]);

  const resting = restingRow > 0 && restingRow <= words.length ? restingRow - 1 : null;
  const active = hovered ?? focused ?? (touched ? resting : (idle ?? resting));

  const compact = width < 760;
  const pad = compact ? 20 : 56;
  const maxLen = words.reduce((m, w) => Math.max(m, w.length), 1);
  const avail = width - pad * 2 - (compact ? 0 : (showNumbers ? 88 : 0) + (showCategory || showYear ? 260 : 0));
  const glyph = upper ? 0.68 : 0.56;
  const size = Math.max(34, Math.min(compact ? maxSize * 0.6 : maxSize, avail / (maxLen * glyph + imgEm + 0.3)));
  const LH = 1.12;
  const GAP = 0.32;

  const sans = '"Inter", -apple-system, "Helvetica Neue", Arial, sans-serif';
  const display = fontFamily === 'system-ui' ? sans
    : fontFamily === 'Fraunces' || fontFamily === 'Instrument Serif' ? `"${fontFamily}", "Iowan Old Style", Georgia, serif`
    : `"${fontFamily}", "Inter", -apple-system, "Helvetica Neue", Arial, sans-serif`;
  const serifish = fontFamily === 'Fraunces' || fontFamily === 'Instrument Serif';
  const tracking = serifish ? '-0.02em' : upper ? '-0.03em' : '-0.045em';
  const filterCss = imageFilter === 'grayscale' ? 'grayscale(1) contrast(1.05)' : imageFilter === 'muted' ? 'saturate(0.6)' : 'none';
  const radius = imageShape === 'rounded' ? '0.14em' : '999px';
  const imgW = imageShape === 'circle' ? 0.78 : imgEm;
  const pad2 = (n) => String(n).padStart(2, '0');
  const p = uid;

  const enterRow = (i) => { setTouched(true); setHovered(i); };

  if (!words.length) {
    return (
      <section className="letter-roll-list" style={{ width: '100%', padding: 64, background: bg, color: muted, fontFamily: sans, fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase', textAlign: 'center' }}>
        Add words to build the list
      </section>
    );
  }

  return (
    <section
      ref={rootRef}
      className={`letter-roll-list ${p}`}
      aria-label={eyebrow}
      style={{ position: 'relative', width: '100%', background: bg, color: text, fontFamily: sans, padding: `${compact ? 28 : 40}px ${pad}px ${compact ? 36 : 48}px`, boxSizing: 'border-box', overflow: 'hidden' }}
    >
      <style>{`
        .${p} a.${p}-row { color: inherit; text-decoration: none; outline: none; -webkit-tap-highlight-color: transparent; }
        .${p} a.${p}-row:focus-visible .${p}-word { outline: 1px solid ${accent}; outline-offset: 6px; border-radius: 4px; }
        @media (prefers-reduced-motion: reduce) { .${p} * { transition: none !important; } }
      `}</style>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, paddingBottom: compact ? 14 : 18, fontSize: compact ? 11 : 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: muted, opacity: entered ? 1 : 0, transform: entered ? 'none' : 'translateY(8px)', transition: 'opacity .8s ease, transform .8s cubic-bezier(0.22,1,0.36,1)' }}>
        <span>{eyebrow} <span style={{ color: text, marginLeft: 6 }}>({pad2(words.length)})</span></span>
        <span>{headerRight}</span>
      </div>

      <nav aria-label={eyebrow} onMouseLeave={() => setHovered(null)}>
        {words.map((word, r) => {
          const on = active === r;
          const faded = active !== null && !on;
          const chars = Array.from(upper ? word.toUpperCase() : word);
          const href = links[r] && links[r] !== '#' ? links[r] : undefined;
          const img = images.length ? images[r % images.length] : '';
          const cat = categories[r] || '';
          const yr = years[r] || '';
          const delayFor = (i) => (settled ? i * stagger : 180 + r * 80 + i * 22);
          return (
            <a
              key={r}
              href={href || '#'}
              className={`${p}-row`}
              aria-label={`${word}${cat ? ', ' + cat : ''}${yr ? ', ' + yr : ''}`}
              onClick={(e) => { if (!href) e.preventDefault(); }}
              onMouseEnter={() => enterRow(r)}
              onFocus={() => { setTouched(true); setFocused(r); }}
              onBlur={() => setFocused((f) => (f === r ? null : f))}
              onTouchStart={() => enterRow(r)}
              style={{
                display: 'grid',
                gridTemplateColumns: compact ? '1fr auto' : `${showNumbers ? '88px ' : ''}1fr ${showCategory || showYear ? '260px' : ''}`,
                alignItems: 'center',
                borderTop: showDividers ? `1px solid ${line}` : 'none',
                borderBottom: showDividers && r === words.length - 1 ? `1px solid ${line}` : 'none',
                padding: `${Math.round(size * 0.06)}px 0`,
                opacity: faded ? dim : 1,
                transition: `opacity 600ms cubic-bezier(0.22,1,0.36,1)`,
                cursor: 'pointer'
              }}
            >
              {showNumbers && !compact && (
                <span aria-hidden="true" style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, letterSpacing: '0.08em', fontVariantNumeric: 'tabular-nums', color: on ? text : muted, transform: on ? 'translateX(12px)' : 'none', transition: `transform ${rollDur}ms ${ease}, color 400ms ease` }}>
                  <span style={{ display: 'block', width: on ? 16 : 0, height: 1, background: accent, transition: `width ${rollDur}ms ${ease}` }} />
                  {pad2(r + 1)}
                </span>
              )}

              <span className={`${p}-word`} aria-hidden="true" style={{ display: 'flex', alignItems: 'center', minWidth: 0, fontFamily: display, fontWeight, fontSize: size, letterSpacing: tracking, lineHeight: LH, whiteSpace: 'nowrap' }}>
                {chars.map((ch, i) => (
                  <span key={i} style={{ display: 'block', clipPath: 'inset(0 -0.25em)', WebkitClipPath: 'inset(0 -0.25em)', height: `${LH}em`, flexShrink: 0 }}>
                    <span style={{
                      display: 'block',
                      transform: !entered ? `translateY(${LH + GAP}em)` : on ? `translateY(${-(LH + GAP)}em)` : 'translateY(0)',
                      transition: reduced ? 'none' : `transform ${rollDur}ms ${ease} ${delayFor(i)}ms`,
                      willChange: 'transform'
                    }}>
                      <span style={{ display: 'block', whiteSpace: 'pre', height: `${LH}em` }}>{ch}</span>
                      <span style={{
                        display: 'block', whiteSpace: 'pre', height: `${LH}em`, marginTop: `${GAP}em`,
                        fontStyle: rollStyle === 'italic' ? 'italic' : 'normal',
                        color: rollStyle === 'accent' ? accent : 'inherit'
                      }}>{ch}</span>
                    </span>
                  </span>
                ))}
                {img && (
                  <span style={{
                    position: 'relative', display: 'block', flexShrink: 0, overflow: 'hidden',
                    height: imageShape === 'circle' ? `${imgW}em` : '0.74em',
                    width: on ? `${imgW}em` : '0em',
                    marginLeft: on ? '0.22em' : '0em',
                    borderRadius: radius,
                    transform: 'translateY(0.02em)',
                    transition: reduced ? 'none' : `width ${rollDur + 180}ms cubic-bezier(0.76,0,0.24,1) ${on ? 60 : 0}ms, margin-left ${rollDur + 180}ms cubic-bezier(0.76,0,0.24,1) ${on ? 60 : 0}ms`
                  }}>
                    <img src={img} alt="" draggable="false" style={{
                      position: 'absolute', top: 0, left: '50%', height: '100%', width: `${imgW}em`, maxWidth: 'none', objectFit: 'cover', display: 'block', filter: filterCss,
                      transform: `translateX(-50%) scale(${on ? 1 : 1.35})`,
                      transition: reduced ? 'none' : `transform ${rollDur + 500}ms cubic-bezier(0.22,1,0.36,1)`
                    }} />
                  </span>
                )}
              </span>

              {compact ? (
                showNumbers && (
                  <span aria-hidden="true" style={{ fontSize: 11, letterSpacing: '0.08em', color: on ? accent : muted, fontVariantNumeric: 'tabular-nums', alignSelf: 'start', paddingTop: size * 0.2, transition: 'color .4s ease' }}>{pad2(r + 1)}</span>
                )
              ) : (showCategory || showYear) && (
                <span aria-hidden="true" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, fontSize: 13, letterSpacing: '0.04em' }}>
                  {showCategory ? (
                    <span style={{ display: 'block', overflow: 'hidden', height: 20, lineHeight: '20px' }}>
                      <span style={{ display: 'block', transform: on ? 'translateY(-50%)' : 'none', transition: `transform ${rollDur}ms ${ease} ${on ? 80 : 0}ms` }}>
                        <span style={{ display: 'block', height: 20, color: muted }}>{cat}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 8, height: 20, color: accent }}>
                          {hoverLabel}
                          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 10 L10 2 M4 2 H10 V8" fill="none" stroke="currentColor" strokeWidth="1.2" /></svg>
                        </span>
                      </span>
                    </span>
                  ) : <span />}
                  {showYear && (
                    <span style={{ color: on ? text : muted, fontVariantNumeric: 'tabular-nums', transform: on ? 'translateX(-6px)' : 'none', transition: `transform ${rollDur}ms ${ease}, color .4s ease` }}>{yr}</span>
                  )}
                </span>
              )}
            </a>
          );
        })}
      </nav>
    </section>
  );
}

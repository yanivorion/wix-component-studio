const MANIFEST = {
  "type": "Gallery.ExpandingPanels",
  "description": "A row of tall photographic panels that spring open on hover or tap: the active panel widens while the others compress, its vertical label swings upright and rises into a large title, and its number and story fade in. Stacks vertically on mobile, with optional auto-advance",
  "editorElement": {
    "selector": ".expanding-panels",
    "displayName": "Expanding Panels",
    "archetype": "container",
    "data": {
      "heading": { "dataType": "text", "displayName": "Heading", "defaultValue": "Six coasts, one summer", "group": "Content" },
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Field Journal — Vol. 04", "group": "Content" },
      "titles": { "dataType": "text", "displayName": "Titles (comma separated)", "defaultValue": "Lofoten,Dolomites,Faroe,Patagonia,Hokkaido,Big Sur", "group": "Content" },
      "descriptions": { "dataType": "text", "displayName": "Descriptions (separate with |)", "defaultValue": "Granite walls rise straight out of the Norwegian Sea; light that never quite ends.|Pale limestone towers and the slow ritual of the via ferrata at first light.|Grass roofs, sheer cliffs and weather that changes its mind every hour.|Wind that shapes everything — trees, glaciers, the people who stay.|Powder snow, cedar baths and silence so complete you can hear it fall.|Highway One at dusk, fog pouring over the ridge like a slow tide.", "group": "Content" },
      "images": { "dataType": "text", "displayName": "Image URLs (comma separated)", "defaultValue": "https://picsum.photos/id/1036/1600/1200,https://picsum.photos/id/1018/1600/1200,https://picsum.photos/id/1043/1600/1200,https://picsum.photos/id/1016/1600/1200,https://picsum.photos/id/1039/1600/1200,https://picsum.photos/id/1044/1600/1200", "group": "Images" },
      "altTexts": { "dataType": "text", "displayName": "Alt Texts (separate with |)", "defaultValue": "", "group": "Images" },
      "imageTreatment": { "dataType": "select", "displayName": "Image Treatment", "defaultValue": "none", "options": ["none", "muted", "grayscale"], "group": "Images" },
      "inactiveDim": { "dataType": "select", "displayName": "Inactive Dimming", "defaultValue": "0.55", "options": ["0.3", "0.45", "0.55", "0.7"], "group": "Images" },
      "imageZoom": { "dataType": "booleanValue", "displayName": "Settle Zoom On Expand", "defaultValue": "true", "group": "Images" },
      "trigger": { "dataType": "select", "displayName": "Expand On", "defaultValue": "hover", "options": ["hover", "click"], "group": "Interaction" },
      "defaultIndex": { "dataType": "select", "displayName": "Initially Open", "defaultValue": "2", "options": ["1", "2", "3", "4", "5", "6", "7"], "group": "Interaction" },
      "autoAdvance": { "dataType": "booleanValue", "displayName": "Auto Advance", "defaultValue": "false", "group": "Interaction" },
      "interval": { "dataType": "select", "displayName": "Advance Interval (s)", "defaultValue": "5", "options": ["3", "5", "7", "10"], "group": "Interaction" },
      "pauseOnHover": { "dataType": "booleanValue", "displayName": "Pause On Hover", "defaultValue": "true", "group": "Interaction" },
      "springFeel": { "dataType": "select", "displayName": "Spring Feel", "defaultValue": "balanced", "options": ["soft", "balanced", "snappy"], "group": "Animation" },
      "expandRatio": { "dataType": "select", "displayName": "Expanded Width (x)", "defaultValue": "5", "options": ["3", "4", "5", "6", "7"], "group": "Layout" },
      "height": { "dataType": "select", "displayName": "Height", "defaultValue": "screen", "options": ["screen", "560", "680", "800"], "group": "Layout" },
      "gap": { "dataType": "select", "displayName": "Gap (px)", "defaultValue": "8", "options": ["0", "4", "8", "12", "16"], "group": "Layout" },
      "radius": { "dataType": "select", "displayName": "Corner Radius (px)", "defaultValue": "4", "options": ["0", "2", "4", "8", "16"], "group": "Layout" },
      "showHeader": { "dataType": "booleanValue", "displayName": "Show Header", "defaultValue": "true", "group": "Layout" },
      "showNumbers": { "dataType": "booleanValue", "displayName": "Show Numbers", "defaultValue": "true", "group": "Layout" },
      "scrim": { "dataType": "select", "displayName": "Legibility Scrim", "defaultValue": "medium", "options": ["none", "light", "medium", "strong"], "group": "Layout" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#0C0C0D", "group": "Colors" },
      "textColor": { "dataType": "color", "displayName": "Text", "defaultValue": "#FAFAF9", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#A8A29E", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent (progress)", "defaultValue": "#FAFAF9", "group": "Colors" },
      "titleFont": { "dataType": "select", "displayName": "Title Font", "defaultValue": "Instrument Serif", "options": ["Instrument Serif", "Fraunces", "Inter Tight", "Inter"], "group": "Typography" },
      "titleSize": { "dataType": "select", "displayName": "Title Size (px)", "defaultValue": "72", "options": ["48", "56", "64", "72", "88"], "group": "Typography" },
      "titleWeight": { "dataType": "select", "displayName": "Title Weight", "defaultValue": "400", "options": ["300", "400", "500"], "group": "Typography" },
      "labelCase": { "dataType": "select", "displayName": "Vertical Label Case", "defaultValue": "as typed", "options": ["as typed", "uppercase"], "group": "Typography" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const split = (s, sep = ',') => String(s || '').split(sep).map((x) => x.trim()).filter(Boolean);

  const heading = config?.heading ?? 'Six coasts, one summer';
  const eyebrow = config?.eyebrow ?? 'Field Journal — Vol. 04';
  const titles = split(config?.titles || 'Lofoten,Dolomites,Faroe,Patagonia,Hokkaido,Big Sur');
  const descriptions = split(config?.descriptions || 'Granite walls rise straight out of the Norwegian Sea; light that never quite ends.|Pale limestone towers and the slow ritual of the via ferrata at first light.|Grass roofs, sheer cliffs and weather that changes its mind every hour.|Wind that shapes everything — trees, glaciers, the people who stay.|Powder snow, cedar baths and silence so complete you can hear it fall.|Highway One at dusk, fog pouring over the ridge like a slow tide.', '|');
  const images = split(config?.images || 'https://picsum.photos/id/1036/1600/1200,https://picsum.photos/id/1018/1600/1200,https://picsum.photos/id/1043/1600/1200,https://picsum.photos/id/1016/1600/1200,https://picsum.photos/id/1039/1600/1200,https://picsum.photos/id/1044/1600/1200').slice(0, 9);
  const alts = split(config?.altTexts || '', '|');
  const treatment = config?.imageTreatment || 'none';
  const dim = parseFloat(config?.inactiveDim || '0.55') || 0.55;
  const imageZoom = bool(config?.imageZoom, true);
  const trigger = config?.trigger || 'hover';
  const defaultIndex = Math.max(0, (parseInt(config?.defaultIndex || '2', 10) || 2) - 1);
  const autoAdvance = bool(config?.autoAdvance, false);
  const interval = (parseFloat(config?.interval || '5') || 5) * 1000;
  const pauseOnHover = bool(config?.pauseOnHover, true);
  const spring = { soft: [110, 19], balanced: [190, 25], snappy: [320, 33] }[config?.springFeel || 'balanced'] || [190, 25];
  const ratio = parseFloat(config?.expandRatio || '5') || 5;
  const heightMode = config?.height || 'screen';
  const gap = parseInt(config?.gap ?? '8', 10) || 0;
  const radius = parseInt(config?.radius ?? '4', 10) || 0;
  const showHeader = bool(config?.showHeader, true);
  const showNumbers = bool(config?.showNumbers, true);
  const scrim = config?.scrim || 'medium';
  const bg = config?.backgroundColor || '#0C0C0D';
  const text = config?.textColor || '#FAFAF9';
  const muted = config?.mutedColor || '#A8A29E';
  const accent = config?.accentColor || '#FAFAF9';
  const titleFont = config?.titleFont || 'Instrument Serif';
  const titleSize = parseInt(config?.titleSize || '72', 10) || 72;
  const titleWeight = config?.titleWeight || '400';
  const upperLabel = (config?.labelCase || 'as typed') === 'uppercase';

  const count = images.length;
  const uid = React.useMemo(() => 'xp' + Math.random().toString(36).slice(2, 9), []);
  const reduced = React.useMemo(() => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  const rootRef = React.useRef(null);
  const panelRefs = React.useRef([]);
  const btnRefs = React.useRef([]);
  const sim = React.useRef({ g: [], v: [], raf: 0, last: 0 });
  const hoverTimer = React.useRef(0);
  const [width, setWidth] = React.useState(1280);
  const [stageH, setStageH] = React.useState(760);
  const [active, setActive] = React.useState(Math.min(defaultIndex, Math.max(0, count - 1)));
  const [hovering, setHovering] = React.useState(false);

  React.useEffect(() => { setActive(Math.min(defaultIndex, Math.max(0, count - 1))); }, [defaultIndex, count]);

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

  // flex-grow spring: each panel chases 1 (compressed) or `ratio` (open), velocity preserved across retargets
  React.useEffect(() => {
    const st = sim.current;
    const targets = Array.from({ length: count }, (_, i) => (i === active ? ratio : 1));
    if (st.g.length !== count) { st.g = targets.slice(); st.v = targets.map(() => 0); }
    const apply = () => st.g.forEach((g, i) => { const p = panelRefs.current[i]; if (p) p.style.flexGrow = g.toFixed(4); });
    if (reduced) { st.g = targets.slice(); apply(); return undefined; }
    const [k, c] = spring;
    cancelAnimationFrame(st.raf);
    st.last = 0;
    const tick = (t) => {
      const dt = st.last ? Math.min(0.034, (t - st.last) / 1000) : 0.016;
      st.last = t;
      let moving = false;
      for (let i = 0; i < count; i++) {
        const a = k * (targets[i] - st.g[i]) - c * st.v[i];
        st.v[i] += a * dt;
        st.g[i] = Math.max(0.35, st.g[i] + st.v[i] * dt);
        if (Math.abs(targets[i] - st.g[i]) > 0.0015 || Math.abs(st.v[i]) > 0.002) moving = true;
        else { st.g[i] = targets[i]; st.v[i] = 0; }
      }
      apply();
      st.raf = moving ? requestAnimationFrame(tick) : 0;
    };
    st.raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(st.raf);
  }, [active, count, ratio, reduced, spring[0], spring[1]]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => () => clearTimeout(hoverTimer.current), []);

  const go = React.useCallback((i, focus) => {
    if (!count) return;
    const n = ((i % count) + count) % count;
    setActive(n);
    if (focus && btnRefs.current[n]) btnRefs.current[n].focus({ preventScroll: true });
  }, [count]);

  const vertical = width < 700;
  const H = heightMode === 'screen' ? Math.max(vertical ? 640 : 540, stageH) : (parseInt(heightMode, 10) || 680) + (vertical ? 80 : 0);
  const pad = vertical ? 16 : Math.round(Math.max(24, Math.min(48, width * 0.035)));
  const headerH = showHeader ? (vertical ? 84 : 96) : 0;
  const rowMain = (vertical ? H - headerH - pad * 2 : width - pad * 2) - gap * (count - 1);
  const openSize = rowMain * ratio / (ratio + count - 1);
  const closedSize = rowMain / (ratio + count - 1);

  const sans = '"Inter", -apple-system, "Helvetica Neue", Arial, sans-serif';
  const display = titleFont === 'Inter' ? sans : titleFont === 'Inter Tight' ? `"Inter Tight", ${sans}` : `"${titleFont}", "Iowan Old Style", Georgia, serif`;
  const serifish = titleFont === 'Instrument Serif' || titleFont === 'Fraunces';
  const filterCss = treatment === 'grayscale' ? 'grayscale(1) contrast(1.05)' : treatment === 'muted' ? 'saturate(0.6) contrast(0.97)' : 'none';
  const scrimA = { none: 0, light: 0.35, medium: 0.6, strong: 0.8 }[scrim] ?? 0.6;
  const pad2 = (n) => String(n).padStart(2, '0');

  const F = vertical ? Math.round(titleSize * 0.56) : Math.round(Math.min(titleSize, openSize * 0.13 + 20));
  const P = vertical ? 18 : Math.round(Math.max(20, Math.min(32, openSize * 0.045)));
  const labelPx = vertical ? 15 : 17;
  const s = labelPx / F;
  const ease = 'cubic-bezier(.22,1,.36,1)';
  const D = reduced ? 0 : 1;

  const titleTransform = (on) => {
    if (on) return 'translate(0px, 0px) rotate(0deg) scale(1)';
    if (vertical) return `translate(0px, ${Math.round(-(closedSize - F * s) / 2 + P)}px) rotate(0deg) scale(${s})`;
    const tx = closedSize / 2 - P + (F * s) / 2;
    return `translate(${tx.toFixed(1)}px, ${-Math.round(P * 0.4)}px) rotate(-90deg) scale(${s})`;
  };

  const onKey = (e) => {
    const next = vertical ? 'ArrowDown' : 'ArrowRight';
    const prev = vertical ? 'ArrowUp' : 'ArrowLeft';
    if (e.key === next || (!vertical && e.key === 'ArrowDown') || (vertical && e.key === 'ArrowRight')) { e.preventDefault(); go(active + 1, true); }
    else if (e.key === prev || (!vertical && e.key === 'ArrowUp') || (vertical && e.key === 'ArrowLeft')) { e.preventDefault(); go(active - 1, true); }
    else if (e.key === 'Home') { e.preventDefault(); go(0, true); }
    else if (e.key === 'End') { e.preventDefault(); go(count - 1, true); }
    else if (e.key === 'Escape') { e.preventDefault(); go(Math.min(defaultIndex, count - 1), false); if (document.activeElement && rootRef.current && rootRef.current.contains(document.activeElement)) document.activeElement.blur(); }
  };

  const onEnter = (i) => (e) => {
    if (trigger !== 'hover' || e.pointerType !== 'mouse') return;
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setActive(i), 60);
  };
  const onLeavePanel = () => clearTimeout(hoverTimer.current);
  const onUp = (i) => (e) => { if (e.pointerType !== 'mouse') setActive(i); };

  const btnReset = { appearance: 'none', border: 'none', background: 'transparent', color: 'inherit', padding: 0, margin: 0, font: 'inherit', textAlign: 'left', cursor: 'pointer' };

  if (!count) {
    return (
      <section className="expanding-panels" style={{ width: '100%', height: 480, background: bg, color: muted, display: 'grid', placeItems: 'center', fontFamily: sans, fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
        Add image URLs to begin
      </section>
    );
  }

  return (
    <section
      ref={rootRef}
      className={`expanding-panels ${uid}`}
      aria-label={heading || 'Gallery'}
      onKeyDown={onKey}
      onPointerEnter={() => setHovering(true)}
      onPointerLeave={() => { setHovering(false); clearTimeout(hoverTimer.current); }}
      style={{ position: 'relative', width: '100%', height: H, background: bg, color: text, fontFamily: sans, overflow: 'hidden', boxSizing: 'border-box', padding: pad, display: 'flex', flexDirection: 'column' }}
    >
      <style>{`
        .${uid} .${uid}-panel:focus-visible { outline: 2px solid ${accent}; outline-offset: 3px; }
        @keyframes ${uid}-bar { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes ${uid}-in { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: reduce) { .${uid} * { transition: none !important; animation: none !important; } }
      `}</style>

      {showHeader && (
        <header style={{ height: headerH, flexShrink: 0, display: 'flex', alignItems: vertical ? 'flex-start' : 'flex-end', justifyContent: vertical ? 'flex-start' : 'space-between', flexDirection: vertical ? 'column' : 'row', gap: vertical ? 12 : 24, paddingBottom: vertical ? 0 : 24, boxSizing: 'border-box', animation: reduced ? 'none' : `${uid}-in 900ms ${ease} both` }}>
          {heading && <h2 style={{ margin: 0, fontFamily: display, fontWeight: titleWeight, fontSize: vertical ? 30 : Math.round(Math.min(48, width * 0.034)), lineHeight: 1, letterSpacing: serifish ? '-0.015em' : '-0.035em' }}>{heading}</h2>}
          <div style={{ display: 'flex', gap: 20, alignItems: 'baseline', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: muted, whiteSpace: 'nowrap' }}>
            {eyebrow && <span>{eyebrow}</span>}
            <span aria-live="polite" style={{ color: text, fontVariantNumeric: 'tabular-nums' }}>{pad2(active + 1)}<span style={{ color: muted }}> / {pad2(count)}</span></span>
          </div>
        </header>
      )}

      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: vertical ? 'column' : 'row', gap }}>
        {images.map((src, i) => {
          const on = i === active;
          const title = titles[i] || titles[i % Math.max(1, titles.length)] || `Panel ${i + 1}`;
          const desc = descriptions[i] || '';
          const g = sim.current.g[i] ?? (on ? ratio : 1);
          return (
            <button
              key={i}
              ref={(el) => { btnRefs.current[i] = el; panelRefs.current[i] = el; }}
              className={`${uid}-panel`}
              aria-expanded={on}
              aria-label={`${pad2(i + 1)} ${title}${desc ? ' — ' + desc : ''}`}
              onPointerEnter={onEnter(i)}
              onPointerLeave={onLeavePanel}
              onPointerUp={onUp(i)}
              onClick={() => setActive(i)}
              onFocus={() => { if (trigger === 'hover') setActive(i); }}
              style={{ ...btnReset, position: 'relative', flexGrow: g, flexShrink: 1, flexBasis: 0, minWidth: 0, minHeight: 0, overflow: 'hidden', borderRadius: radius, background: '#1c1917', isolation: 'isolate', touchAction: 'pan-y', WebkitTapHighlightColor: 'transparent' }}
            >
              <img
                src={src}
                alt={alts[i] || title}
                draggable="false"
                style={{
                  position: 'absolute', top: 0, left: '50%',
                  width: vertical ? '100%' : Math.ceil(openSize) + 2,
                  height: vertical ? Math.ceil(openSize) + 2 : '100%',
                  ...(vertical ? { left: 0, top: '50%' } : {}),
                  objectFit: 'cover', display: 'block', pointerEvents: 'none', userSelect: 'none',
                  filter: filterCss,
                  transform: `${vertical ? 'translateY(-50%)' : 'translateX(-50%)'} scale(${imageZoom && !on ? 1.14 : 1})`,
                  transition: `transform ${1400 * D}ms ${ease}`
                }}
              />
              <span aria-hidden="true" style={{ position: 'absolute', inset: 0, background: '#000', opacity: on ? 0 : dim, transition: `opacity ${700 * D}ms ${ease}`, pointerEvents: 'none' }} />
              {scrimA > 0 && (
                <span aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: on ? 1 : 0.5, transition: `opacity ${700 * D}ms ${ease}`, background: `linear-gradient(180deg, rgba(0,0,0,${scrimA * 0.35}) 0%, rgba(0,0,0,0) 26%, rgba(0,0,0,0) 46%, rgba(0,0,0,${scrimA * 0.85}) 100%)` }} />
              )}

              {showNumbers && (
                <span aria-hidden="true" style={{ position: 'absolute', top: P, left: P, fontSize: 12, letterSpacing: '0.16em', fontVariantNumeric: 'tabular-nums', color: text, display: 'flex', gap: 10, alignItems: 'center', whiteSpace: 'nowrap', opacity: on ? 1 : 0, transform: on ? 'none' : 'translateY(-8px)', transition: `opacity ${(on ? 600 : 250) * D}ms ${ease} ${on ? 300 * D : 0}ms, transform ${(on ? 800 : 250) * D}ms ${ease} ${on ? 300 * D : 0}ms` }}>
                  {pad2(i + 1)}
                  <span style={{ width: on ? 28 : 0, height: 1, background: text, opacity: 0.6, transition: `width ${900 * D}ms ${ease} ${on ? 450 * D : 0}ms` }} />
                  <span style={{ color: muted }}>{pad2(count)}</span>
                </span>
              )}

              <span aria-hidden="true" style={{ position: 'absolute', left: P, bottom: P, right: P, pointerEvents: 'none' }}>
                <span style={{
                  display: 'block', transformOrigin: '0 100%', whiteSpace: 'nowrap',
                  fontFamily: display, fontSize: F, lineHeight: 1, fontWeight: titleWeight,
                  letterSpacing: serifish ? '-0.01em' : '-0.03em',
                  textTransform: !on && upperLabel ? 'uppercase' : 'none',
                  transform: titleTransform(on),
                  opacity: on ? 1 : 0.86,
                  transition: `transform ${1000 * D}ms ${ease} ${on ? 60 * D : 0}ms, opacity ${600 * D}ms ${ease}`
                }}>{title}</span>
                <span style={{ display: 'block', overflow: 'hidden', maxHeight: on ? 120 : 0, transition: `max-height ${600 * D}ms ${ease}` }}>
                  <span style={{
                    display: 'block', maxWidth: 420, marginTop: Math.round(F * 0.26), fontSize: vertical ? 13 : 15, lineHeight: 1.5, color: text, opacity: on ? 0.82 : 0,
                    whiteSpace: 'normal', fontWeight: 300,
                    transform: on ? 'none' : 'translateY(16px)',
                    transition: `opacity ${(on ? 700 : 200) * D}ms ${ease} ${on ? 380 * D : 0}ms, transform ${(on ? 900 : 200) * D}ms ${ease} ${on ? 380 * D : 0}ms`
                  }}>{desc}</span>
                </span>
              </span>

              {autoAdvance && on && count > 1 && !reduced && (
                <span aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 2, background: `${text}26` }}>
                  <span key={`bar${active}`} onAnimationEnd={() => go(active + 1)} style={{ position: 'absolute', inset: 0, background: accent, transformOrigin: 'left', animation: `${uid}-bar ${interval}ms linear forwards`, animationPlayState: pauseOnHover && hovering ? 'paused' : 'running' }} />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}

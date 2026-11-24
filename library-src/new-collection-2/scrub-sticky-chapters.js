const MANIFEST = {
  "type": "Scrub.StickyChapters",
  "description": "Split-screen scroll story: chapter texts scroll past a sticky photo stage that wipes in each new image (inset, circle or diagonal clip) with a scale-down settle, while inactive chapters dim and a ticked progress rail fills",
  "editorElement": {
    "selector": ".sticky-chapters",
    "displayName": "Sticky Chapters",
    "archetype": "container",
    "data": {
      "storyLabel": { "dataType": "text", "displayName": "Story Label", "defaultValue": "Northbound — A journey in five chapters", "group": "Content" },
      "chapterCount": { "dataType": "select", "displayName": "Chapters", "defaultValue": "5", "options": ["3", "4", "5"], "group": "Content" },
      "chapter1Title": { "dataType": "text", "displayName": "Chapter 1 Title", "defaultValue": "The Coast", "group": "Chapters" },
      "chapter1Text": { "dataType": "text", "displayName": "Chapter 1 Text", "defaultValue": "We left at first light, following the shoreline north. Salt on the windows, cliffs the colour of old paper, and nobody on the road but us.", "group": "Chapters" },
      "chapter1Image": { "dataType": "text", "displayName": "Chapter 1 Image", "defaultValue": "https://picsum.photos/id/1061/1200/1500", "group": "Chapters" },
      "chapter2Title": { "dataType": "text", "displayName": "Chapter 2 Title", "defaultValue": "The Pass", "group": "Chapters" },
      "chapter2Text": { "dataType": "text", "displayName": "Chapter 2 Text", "defaultValue": "The road narrows into a single ribbon of tarmac. Weather moves faster than we do; the ridge appears and disappears behind the cloud.", "group": "Chapters" },
      "chapter2Image": { "dataType": "text", "displayName": "Chapter 2 Image", "defaultValue": "https://picsum.photos/id/1018/1200/1500", "group": "Chapters" },
      "chapter3Title": { "dataType": "text", "displayName": "Chapter 3 Title", "defaultValue": "The Forest", "group": "Chapters" },
      "chapter3Text": { "dataType": "text", "displayName": "Chapter 3 Text", "defaultValue": "Under the canopy the light turns green and the air turns cold. We walk the last mile to the falls with the sound growing ahead of us.", "group": "Chapters" },
      "chapter3Image": { "dataType": "text", "displayName": "Chapter 3 Image", "defaultValue": "https://picsum.photos/id/1039/1200/1500", "group": "Chapters" },
      "chapter4Title": { "dataType": "text", "displayName": "Chapter 4 Title", "defaultValue": "The Lake", "group": "Chapters" },
      "chapter4Text": { "dataType": "text", "displayName": "Chapter 4 Text", "defaultValue": "A jetty of grey boards runs out into perfectly still water. For an hour the only thing that moves is the reflection of the mountains.", "group": "Chapters" },
      "chapter4Image": { "dataType": "text", "displayName": "Chapter 4 Image", "defaultValue": "https://picsum.photos/id/1051/1200/1500", "group": "Chapters" },
      "chapter5Title": { "dataType": "text", "displayName": "Chapter 5 Title", "defaultValue": "Snowline", "group": "Chapters" },
      "chapter5Text": { "dataType": "text", "displayName": "Chapter 5 Text", "defaultValue": "Camp at four thousand metres. Two tents, a stone wall, and a horizon of peaks that makes every word we brought feel small.", "group": "Chapters" },
      "chapter5Image": { "dataType": "text", "displayName": "Chapter 5 Image", "defaultValue": "https://picsum.photos/id/1036/1200/1500", "group": "Chapters" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#F5F4F1", "group": "Colors" },
      "inkColor": { "dataType": "color", "displayName": "Ink", "defaultValue": "#1C1917", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#78716C", "group": "Colors" },
      "railColor": { "dataType": "color", "displayName": "Rail Track", "defaultValue": "#D6D3D1", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent (rail fill)", "defaultValue": "#1C1917", "group": "Colors" },
      "displayFont": { "dataType": "select", "displayName": "Title Font", "defaultValue": "Instrument Serif", "options": ["Instrument Serif", "Fraunces", "Inter Tight", "Georgia"], "group": "Typography" },
      "bodyFont": { "dataType": "select", "displayName": "Body Font", "defaultValue": "Inter", "options": ["Inter", "DM Sans", "Inter Tight", "system-ui"], "group": "Typography" },
      "titleSize": { "dataType": "select", "displayName": "Title Size (px)", "defaultValue": "72", "options": ["48", "56", "64", "72", "88"], "group": "Typography" },
      "titleWeight": { "dataType": "select", "displayName": "Title Weight", "defaultValue": "400", "options": ["300", "400", "500"], "group": "Typography" },
      "imageSide": { "dataType": "select", "displayName": "Image Side", "defaultValue": "right", "options": ["right", "left"], "group": "Layout" },
      "imageFrame": { "dataType": "select", "displayName": "Image Frame", "defaultValue": "bleed", "options": ["bleed", "inset"], "group": "Layout" },
      "chapterSpacing": { "dataType": "select", "displayName": "Chapter Spacing (screens)", "defaultValue": "0.55", "options": ["0.45", "0.55", "0.7", "0.9"], "group": "Layout" },
      "showCounter": { "dataType": "booleanValue", "displayName": "Image Counter", "defaultValue": "true", "group": "Layout" },
      "wipeStyle": { "dataType": "select", "displayName": "Wipe Style", "defaultValue": "inset-from-bottom", "options": ["inset-from-bottom", "circle-from-centre", "diagonal"], "group": "Animation" },
      "scaleFrom": { "dataType": "select", "displayName": "Incoming Scale", "defaultValue": "1.12", "options": ["1", "1.06", "1.12", "1.2"], "group": "Animation" },
      "transitionLength": { "dataType": "select", "displayName": "Wipe Length (chapters)", "defaultValue": "0.55", "options": ["0.3", "0.55", "0.8"], "group": "Animation" },
      "dimOpacity": { "dataType": "select", "displayName": "Inactive Text Opacity", "defaultValue": "0.3", "options": ["0.15", "0.3", "0.5"], "group": "Animation" },
      "smoothing": { "dataType": "select", "displayName": "Scrub Smoothing", "defaultValue": "0.12", "options": ["0.06", "0.12", "0.2", "1"], "group": "Animation", "description": "1 = locked to the scrollbar, lower = more glide" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const N = Math.max(3, Math.min(5, parseInt(config?.chapterCount || '5', 10) || 5));
  const storyLabel = config?.storyLabel || 'Northbound — A journey in five chapters';
  const bg = config?.backgroundColor || '#F5F4F1';
  const ink = config?.inkColor || '#1C1917';
  const muted = config?.mutedColor || '#78716C';
  const railC = config?.railColor || '#D6D3D1';
  const accent = config?.accentColor || '#1C1917';
  const displayFont = config?.displayFont || 'Instrument Serif';
  const bodyFont = config?.bodyFont || 'Inter';
  const titleSize = parseInt(config?.titleSize || '72', 10) || 72;
  const titleWeight = config?.titleWeight || '400';
  const imageLeft = (config?.imageSide || 'right') === 'left';
  const inset = (config?.imageFrame || 'bleed') === 'inset';
  const spacing = parseFloat(config?.chapterSpacing || '0.55') || 0.55;
  const showCounter = bool(config?.showCounter, true);
  const wipe = config?.wipeStyle || 'inset-from-bottom';
  const scaleFrom = parseFloat(config?.scaleFrom || '1.12') || 1;
  const L = parseFloat(config?.transitionLength || '0.55') || 0.55;
  const dim = parseFloat(config?.dimOpacity || '0.3') || 0.3;
  const smoothing = Math.min(1, Math.max(0.02, parseFloat(config?.smoothing || '0.12') || 0.12));

  const defaults = [
    ['The Coast', 'We left at first light, following the shoreline north. Salt on the windows, cliffs the colour of old paper, and nobody on the road but us.', 'https://picsum.photos/id/1061/1200/1500'],
    ['The Pass', 'The road narrows into a single ribbon of tarmac. Weather moves faster than we do; the ridge appears and disappears behind the cloud.', 'https://picsum.photos/id/1018/1200/1500'],
    ['The Forest', 'Under the canopy the light turns green and the air turns cold. We walk the last mile to the falls with the sound growing ahead of us.', 'https://picsum.photos/id/1039/1200/1500'],
    ['The Lake', 'A jetty of grey boards runs out into perfectly still water. For an hour the only thing that moves is the reflection of the mountains.', 'https://picsum.photos/id/1051/1200/1500'],
    ['Snowline', 'Camp at four thousand metres. Two tents, a stone wall, and a horizon of peaks that makes every word we brought feel small.', 'https://picsum.photos/id/1036/1200/1500']
  ];
  const chapters = React.useMemo(() => defaults.slice(0, N).map((d, i) => ({
    title: config?.[`chapter${i + 1}Title`] || d[0],
    text: config?.[`chapter${i + 1}Text`] || d[1],
    image: config?.[`chapter${i + 1}Image`] || d[2]
  })), [config, N]); // eslint-disable-line react-hooks/exhaustive-deps

  const uid = React.useMemo(() => 'sc' + Math.random().toString(36).slice(2, 9), []);
  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  React.useEffect(() => {
    const families = {
      'Instrument Serif': 'Instrument+Serif:ital@0;1',
      'Fraunces': 'Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,300;1,9..144,400',
      'Inter Tight': 'Inter+Tight:wght@300;400;500',
      'Inter': 'Inter:wght@300;400;500',
      'DM Sans': 'DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500'
    };
    [families[displayFont], families[bodyFont]].filter(Boolean).forEach((f) => {
      const id = 'gf-' + f.replace(/[^a-z0-9]/gi, '').slice(0, 40);
      if (document.getElementById(id)) return;
      const l = document.createElement('link');
      l.id = id; l.rel = 'stylesheet';
      l.href = `https://fonts.googleapis.com/css2?family=${f}&display=swap`;
      document.head.appendChild(l);
    });
  }, [displayFont, bodyFont]);

  const sectionRef = React.useRef(null);
  const target = React.useRef(0);
  const current = React.useRef(0);
  const [progress, setProgress] = React.useState(0);
  const [stageH, setStageH] = React.useState(800);
  const [width, setWidth] = React.useState(1280);
  const smooth = reduced ? 1 : smoothing;

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
      current.current = Math.abs(d) < 0.0003 ? target.current : current.current + d * smooth;
      setProgress(current.current);
      raf = current.current === target.current ? 0 : requestAnimationFrame(tick);
    };
    const onScroll = () => { read(); if (!raf) raf = requestAnimationFrame(tick); };
    const measure = () => {
      setStageH(scroller === window ? window.innerHeight : scroller.clientHeight);
      setWidth(section.clientWidth || 1280);
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
  }, [smooth]);

  const clamp = (v) => Math.min(1, Math.max(0, v));
  const easeIO = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  const smoothstep = (t) => t * t * (3 - 2 * t);

  const compact = width < 760;
  const pad = compact ? 20 : Math.round(Math.min(72, width * 0.05));
  const imgFrac = 0.5;
  const regionTop = compact ? Math.round(stageH * imgFrac) : 0;
  const regionH = stageH - regionTop;
  const blockH = Math.round(compact ? regionH * 0.92 : stageH * spacing);
  const padTop = regionTop + (regionH - blockH) / 2;
  const padBottom = (regionH - blockH) / 2;
  const sectionH = Math.round(padTop + N * blockH + padBottom);
  const a = progress * (N - 1);
  const activeIdx = Math.round(a);

  const wipeT = (k) => {
    if (k === 0) return 1;
    const start = k - 0.5 - L / 2;
    const raw = clamp((a - start) / L);
    return reduced ? (raw >= 0.5 ? 1 : 0) : easeIO(raw);
  };
  const clipFor = (t) => {
    if (t >= 1) return 'none';
    if (wipe === 'circle-from-centre') return `circle(${(t * 72).toFixed(2)}% at 50% 55%)`;
    if (wipe === 'diagonal') {
      const s = t * 200;
      if (s <= 100) return `polygon(0% 100%, 0% ${100 - s}%, 0% ${100 - s}%, ${s}% 100%, ${s}% 100%)`;
      return `polygon(0% 100%, 0% 0%, ${s - 100}% 0%, 100% ${200 - s}%, 100% 100%)`;
    }
    return `inset(${((1 - t) * 100).toFixed(2)}% 0% 0% 0%)`;
  };

  const displayCss = displayFont === 'Georgia' ? 'Georgia, "Times New Roman", serif'
    : displayFont === 'Inter Tight' ? '"Inter Tight", "Inter", -apple-system, sans-serif'
    : `"${displayFont}", "Iowan Old Style", Georgia, serif`;
  const bodyCss = bodyFont === 'system-ui' ? 'system-ui, -apple-system, sans-serif' : `"${bodyFont}", -apple-system, "Helvetica Neue", Arial, sans-serif`;
  const tSize = compact ? Math.round(titleSize * 0.52) : Math.round(Math.min(titleSize, width * 0.058));
  const pad2 = (n) => String(n).padStart(2, '0');

  const half = compact ? width : Math.round(width / 2);
  const stageBox = compact
    ? { left: inset ? pad : 0, top: inset ? 12 : 0, width: inset ? width - pad * 2 : width, height: Math.round(stageH * imgFrac) - (inset ? 12 : 0) }
    : {
      left: (imageLeft ? 0 : half) + (inset ? 24 : 0), top: inset ? 24 : 0,
      width: half - (inset ? 48 : 0), height: stageH - (inset ? 48 : 0)
    };
  const textLeft = compact ? 0 : imageLeft ? half : 0;
  const railX = compact ? null : textLeft + pad;
  const textPadL = compact ? pad : pad + Math.round(Math.min(96, width * 0.065));
  const railH = Math.round(stageH * 0.52);
  const railTop = Math.round((stageH - railH) / 2);
  const fill = N > 1 ? progress : 1;

  if (!chapters.length) {
    return <section className="sticky-chapters" style={{ height: 400, background: bg, color: muted, display: 'grid', placeItems: 'center', fontFamily: bodyCss }}>Add chapters to begin</section>;
  }

  return (
    <section ref={sectionRef} className={`sticky-chapters ${uid}`} aria-label={storyLabel}
      style={{ position: 'relative', width: '100%', height: sectionH, background: bg, color: ink, fontFamily: bodyCss }}>
      <style>{`
        .${uid} .${uid}-img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; display:block; will-change:transform; }
      `}</style>

      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3 }}>
        <div style={{ position: 'sticky', top: 0, height: stageH, overflow: 'hidden' }}>
          {compact && <div style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: Math.round(stageH * imgFrac) + 70, background: `linear-gradient(${bg} calc(100% - 46px), transparent)` }} />}
          <div style={{ position: 'absolute', ...stageBox, overflow: 'hidden', borderRadius: inset ? 6 : 0, background: '#1C1917' }}>
            {chapters.map((c, k) => {
              const t = wipeT(k);
              const next = k + 1 < N ? wipeT(k + 1) : 0;
              const visible = t > 0 && next < 1;
              const settle = k === 0 ? 1 : reduced ? 1 : easeOut(clamp((a - (k - 0.5 - L / 2)) / (L * 1.7)));
              const sc = (scaleFrom - (scaleFrom - 1) * settle) * (1 + 0.05 * next);
              return (
                <div key={k} style={{ position: 'absolute', inset: 0, zIndex: k, clipPath: clipFor(t), WebkitClipPath: clipFor(t), visibility: visible ? 'visible' : 'hidden' }}>
                  <img className={`${uid}-img`} src={c.image} alt="" draggable="false"
                    style={{ transform: `scale(${sc.toFixed(4)})`, filter: next > 0 ? `brightness(${(1 - next * 0.45).toFixed(3)})` : 'none' }} />
                </div>
              );
            })}
            <div style={{ position: 'absolute', inset: 0, zIndex: 20, background: 'linear-gradient(to top, rgba(12,12,13,0.42), rgba(12,12,13,0) 34%)' }} />
            {showCounter && (
              <div style={{ position: 'absolute', zIndex: 21, left: compact ? 16 : 32, right: compact ? 16 : 32, bottom: compact ? 14 : 28, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', color: '#FAFAF9' }}>
                <div style={{ height: compact ? 20 : 24, overflow: 'hidden', fontSize: compact ? 14 : 16, lineHeight: compact ? '20px' : '24px', letterSpacing: '0.01em' }}>
                  <div style={{ transform: `translateY(${-activeIdx * (compact ? 20 : 24)}px)`, transition: reduced ? 'none' : 'transform .8s cubic-bezier(0.22, 1, 0.36, 1)' }}>
                    {chapters.map((c, k) => <div key={k} style={{ whiteSpace: 'nowrap' }}>{c.title}</div>)}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', fontVariantNumeric: 'tabular-nums', fontSize: compact ? 14 : 16, lineHeight: compact ? '20px' : '24px' }}>
                  <div style={{ height: compact ? 20 : 24, overflow: 'hidden' }}>
                    <div style={{ transform: `translateY(${-activeIdx * (compact ? 20 : 24)}px)`, transition: reduced ? 'none' : 'transform .8s cubic-bezier(0.22, 1, 0.36, 1)' }}>
                      {chapters.map((c, k) => <div key={k}>{pad2(k + 1)}</div>)}
                    </div>
                  </div>
                  <span style={{ opacity: 0.6, marginLeft: 6 }}>/ {pad2(N)}</span>
                </div>
              </div>
            )}
          </div>

          {!compact && (
            <div style={{ position: 'absolute', left: textLeft, top: 0, width: half, height: Math.round(stageH * 0.16), background: `linear-gradient(${bg}, transparent)` }} />
          )}
          {!compact && (
            <div style={{ position: 'absolute', left: textLeft, bottom: 0, width: half, height: Math.round(stageH * 0.12), background: `linear-gradient(transparent, ${bg})` }} />
          )}
          {!compact && (
            <div style={{ position: 'absolute', left: textLeft + pad, top: pad * 0.75 + 4, fontSize: 11.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: muted }}>{storyLabel}</div>
          )}

          {railX !== null && (
            <div style={{ position: 'absolute', left: railX, top: railTop, width: 1, height: railH, background: railC }}>
              <div style={{ position: 'absolute', left: 0, top: 0, width: 1, height: '100%', background: accent, transformOrigin: 'top', transform: `scaleY(${fill.toFixed(4)})` }} />
              {chapters.map((c, k) => {
                const y = N > 1 ? (k / (N - 1)) * railH : 0;
                const on = clamp(1 - Math.abs(a - k) * 1.4);
                const passed = a >= k - 0.02;
                return (
                  <div key={k} style={{ position: 'absolute', left: 0, top: y, transform: 'translate(-50%,-50%)' }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: passed ? accent : bg, border: `1px solid ${passed ? accent : railC}`, transform: `scale(${(1 + on * 0.55).toFixed(3)})`, transition: 'background .3s, border-color .3s' }} />
                    <div style={{ position: 'absolute', left: 16, top: '50%', transform: `translate(${(1 - on) * -4}px,-50%)`, fontSize: 11, fontVariantNumeric: 'tabular-nums', color: ink, opacity: 0.25 + on * 0.75, letterSpacing: '0.04em' }}>{pad2(k + 1)}</div>
                  </div>
                );
              })}
            </div>
          )}

          {compact && (
            <div style={{ position: 'absolute', left: pad, right: pad, top: Math.round(stageH * imgFrac) + 14, height: 1, background: railC }}>
              <div style={{ position: 'absolute', inset: 0, background: accent, transformOrigin: 'left', transform: `scaleX(${fill.toFixed(4)})` }} />
              {chapters.map((c, k) => (
                <div key={k} style={{ position: 'absolute', top: 0, left: `${N > 1 ? (k / (N - 1)) * 100 : 0}%`, width: 5, height: 5, borderRadius: '50%', transform: 'translate(-50%,-50%)', background: a >= k - 0.02 ? accent : bg, border: `1px solid ${a >= k - 0.02 ? accent : railC}` }} />
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: compact ? 1 : 2, marginLeft: textLeft, width: compact ? '100%' : half, paddingTop: padTop, paddingBottom: padBottom, boxSizing: 'border-box' }}>
        {chapters.map((c, k) => {
          const on = reduced ? (k === activeIdx ? 1 : 0) : 1 - smoothstep(clamp((Math.abs(a - k) - 0.22) / 0.42));
          const op = dim + (1 - dim) * on;
          return (
            <article key={k} aria-current={k === activeIdx ? 'step' : undefined}
              style={{ height: blockH, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: textPadL, paddingRight: compact ? pad : pad * 1.4, boxSizing: 'border-box', opacity: op }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: compact ? 12 : 22 }}>
                <span style={{ fontFamily: displayCss, fontStyle: 'italic', fontSize: compact ? 18 : 22, color: muted, lineHeight: 1 }}>{pad2(k + 1)}</span>
                <span style={{ display: 'block', height: 1, width: compact ? 40 : 64, background: ink, transformOrigin: 'left', transform: `scaleX(${(0.25 + on * 0.75).toFixed(3)})` }} />
              </div>
              <h3 style={{ margin: 0, fontFamily: displayCss, fontWeight: titleWeight, fontSize: tSize, lineHeight: 0.98, letterSpacing: displayFont === 'Inter Tight' ? '-0.035em' : '-0.015em', transform: `translateY(${((1 - on) * 10).toFixed(2)}px)` }}>{c.title}</h3>
              <p style={{ margin: compact ? '14px 0 0' : '24px 0 0', maxWidth: 420, fontSize: compact ? 15 : 17, lineHeight: 1.6, color: muted, fontWeight: 400 }}>{c.text}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

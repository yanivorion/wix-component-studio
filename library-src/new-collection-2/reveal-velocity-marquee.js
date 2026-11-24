const MANIFEST = {
  "type": "Reveal.VelocityMarquee",
  "description": "Stacked marquee rows of large words separated by rounded photo pills; rows rise in on reveal, run in alternating directions, accelerate and skew with scroll velocity before relaxing, flip direction with scroll direction and slow down under the cursor",
  "editorElement": {
    "selector": ".velocity-marquee",
    "displayName": "Velocity Marquee",
    "archetype": "container",
    "data": {
      "topLeft": { "dataType": "text", "displayName": "Top Left Label", "defaultValue": "(Capabilities)", "group": "Content" },
      "topRight": { "dataType": "text", "displayName": "Top Right Label", "defaultValue": "2009 — 2026", "group": "Content" },
      "footerText": { "dataType": "text", "displayName": "Footer Text", "defaultValue": "A small studio for brands, spaces and objects that reward a second look.", "group": "Content" },
      "footerHint": { "dataType": "text", "displayName": "Footer Hint", "defaultValue": "Scroll to steer", "group": "Content" },
      "rowCount": { "dataType": "select", "displayName": "Rows", "defaultValue": "3", "options": ["2", "3"], "group": "Rows" },
      "row1Words": { "dataType": "text", "displayName": "Row 1 Words (comma separated)", "defaultValue": "Brand Identity,Spatial Design,Editorial,Packaging", "group": "Rows" },
      "row2Words": { "dataType": "text", "displayName": "Row 2 Words (comma separated)", "defaultValue": "considered,quiet,tactile,precise", "group": "Rows" },
      "row3Words": { "dataType": "text", "displayName": "Row 3 Words (comma separated)", "defaultValue": "Objects,Interiors,Typefaces,Campaigns", "group": "Rows" },
      "row1Style": { "dataType": "select", "displayName": "Row 1 Style", "defaultValue": "sans", "options": ["sans", "serif-italic", "outline"], "group": "Rows" },
      "row2Style": { "dataType": "select", "displayName": "Row 2 Style", "defaultValue": "serif-italic", "options": ["sans", "serif-italic", "outline"], "group": "Rows" },
      "row3Style": { "dataType": "select", "displayName": "Row 3 Style", "defaultValue": "outline", "options": ["sans", "serif-italic", "outline"], "group": "Rows" },
      "images": { "dataType": "text", "displayName": "Pill Images (comma separated URLs)", "defaultValue": "https://picsum.photos/id/1069/480/280,https://picsum.photos/id/1060/480/280,https://picsum.photos/id/106/480/280,https://picsum.photos/id/1073/480/280,https://picsum.photos/id/1080/480/280,https://picsum.photos/id/152/480/280,https://picsum.photos/id/1059/480/280,https://picsum.photos/id/225/480/280", "group": "Images" },
      "separatorStyle": { "dataType": "select", "displayName": "Separator", "defaultValue": "image-pill", "options": ["image-pill", "dot", "mixed"], "group": "Images" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#0E0E0F", "group": "Colors" },
      "textColor": { "dataType": "color", "displayName": "Text", "defaultValue": "#F5F5F4", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#8A8580", "group": "Colors" },
      "dotColor": { "dataType": "color", "displayName": "Dot / Accent", "defaultValue": "#D6D3D1", "group": "Colors" },
      "sansFont": { "dataType": "select", "displayName": "Sans Font", "defaultValue": "Inter Tight", "options": ["Inter Tight", "Inter", "DM Sans", "system-ui"], "group": "Typography" },
      "serifFont": { "dataType": "select", "displayName": "Serif Font", "defaultValue": "Instrument Serif", "options": ["Instrument Serif", "Fraunces", "Georgia"], "group": "Typography" },
      "textSize": { "dataType": "select", "displayName": "Word Size", "defaultValue": "large", "options": ["medium", "large", "huge"], "group": "Typography" },
      "fontWeight": { "dataType": "select", "displayName": "Sans Weight", "defaultValue": "400", "options": ["300", "400", "500"], "group": "Typography" },
      "baseSpeed": { "dataType": "select", "displayName": "Base Speed (px/s)", "defaultValue": "60", "options": ["30", "60", "90", "140"], "group": "Motion" },
      "velocityBoost": { "dataType": "select", "displayName": "Scroll Velocity Boost", "defaultValue": "1", "options": ["0", "0.5", "1", "2"], "group": "Motion" },
      "maxSkew": { "dataType": "select", "displayName": "Max Skew (deg)", "defaultValue": "10", "options": ["0", "6", "10", "14"], "group": "Motion" },
      "directionFlip": { "dataType": "booleanValue", "displayName": "Flip With Scroll Direction", "defaultValue": "true", "group": "Motion" },
      "alternate": { "dataType": "booleanValue", "displayName": "Alternate Row Directions", "defaultValue": "true", "group": "Motion" },
      "hoverSlow": { "dataType": "select", "displayName": "Hover Speed Factor", "defaultValue": "0.2", "options": ["0", "0.2", "0.4", "1"], "group": "Motion", "description": "Speed multiplier while the pointer is over a row" },
      "triggerMode": { "dataType": "select", "displayName": "Reveal Trigger", "defaultValue": "entrance", "options": ["entrance", "scroll", "manual"], "group": "Animation" },
      "threshold": { "dataType": "select", "displayName": "Reveal Threshold", "defaultValue": "0.2", "options": ["0.1", "0.2", "0.4"], "group": "Animation" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const list = (s) => String(s || '').split(',').map((x) => x.trim()).filter(Boolean);
  const topLeft = config?.topLeft || '(Capabilities)';
  const topRight = config?.topRight || '2009 — 2026';
  const footerText = config?.footerText || 'A small studio for brands, spaces and objects that reward a second look.';
  const footerHint = config?.footerHint || 'Scroll to steer';
  const rowCount = Math.max(2, Math.min(3, parseInt(config?.rowCount || '3', 10) || 3));
  const rowDefaults = [
    ['Brand Identity,Spatial Design,Editorial,Packaging', 'sans'],
    ['considered,quiet,tactile,precise', 'serif-italic'],
    ['Objects,Interiors,Typefaces,Campaigns', 'outline']
  ];
  const images = list(config?.images || 'https://picsum.photos/id/1069/480/280,https://picsum.photos/id/1060/480/280,https://picsum.photos/id/106/480/280,https://picsum.photos/id/1073/480/280,https://picsum.photos/id/1080/480/280,https://picsum.photos/id/152/480/280,https://picsum.photos/id/1059/480/280,https://picsum.photos/id/225/480/280');
  const sepStyle = config?.separatorStyle || 'image-pill';
  const bg = config?.backgroundColor || '#0E0E0F';
  const text = config?.textColor || '#F5F5F4';
  const muted = config?.mutedColor || '#8A8580';
  const dotC = config?.dotColor || '#D6D3D1';
  const sansFont = config?.sansFont || 'Inter Tight';
  const serifFont = config?.serifFont || 'Instrument Serif';
  const sizeK = { medium: 0.082, large: 0.104, huge: 0.13 }[config?.textSize || 'large'] || 0.104;
  const weight = config?.fontWeight || '400';
  const baseSpeed = parseFloat(config?.baseSpeed || '60') || 0;
  const boostK = parseFloat(config?.velocityBoost ?? '1');
  const velocityBoost = Number.isFinite(boostK) ? boostK : 1;
  const maxSkew = parseFloat(config?.maxSkew ?? '10') || 0;
  const directionFlip = bool(config?.directionFlip, true);
  const alternate = bool(config?.alternate, true);
  const hs = parseFloat(config?.hoverSlow ?? '0.2');
  const hoverSlow = Number.isFinite(hs) ? hs : 0.2;
  const triggerMode = config?.triggerMode || 'entrance';
  const threshold = parseFloat(config?.threshold || '0.2') || 0.2;

  const rows = React.useMemo(() => rowDefaults.slice(0, rowCount).map((d, i) => {
    const w = list(config?.[`row${i + 1}Words`] || d[0]);
    return { words: w.length ? w : list(d[0]), style: config?.[`row${i + 1}Style`] || d[1] };
  }), [config, rowCount]); // eslint-disable-line react-hooks/exhaustive-deps

  const uid = React.useMemo(() => 'vm' + Math.random().toString(36).slice(2, 9), []);
  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  React.useEffect(() => {
    const families = {
      'Instrument Serif': 'Instrument+Serif:ital@0;1',
      'Fraunces': 'Fraunces:ital,opsz,wght@1,9..144,300;1,9..144,400',
      'Inter Tight': 'Inter+Tight:wght@300;400;500',
      'Inter': 'Inter:wght@300;400;500',
      'DM Sans': 'DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500'
    };
    [families[sansFont], families[serifFont]].filter(Boolean).forEach((f) => {
      const id = 'gf-' + f.replace(/[^a-z0-9]/gi, '').slice(0, 40);
      if (document.getElementById(id)) return;
      const l = document.createElement('link');
      l.id = id; l.rel = 'stylesheet';
      l.href = `https://fonts.googleapis.com/css2?family=${f}&display=swap`;
      document.head.appendChild(l);
    });
  }, [sansFont, serifFont]);

  const rootRef = React.useRef(null);
  const trackRefs = React.useRef([]);
  const skewRefs = React.useRef([]);
  const seqRefs = React.useRef([]);
  const hoverRef = React.useRef([false, false, false]);
  const [width, setWidth] = React.useState(1280);
  const [stageH, setStageH] = React.useState(800);
  const [seqW, setSeqW] = React.useState([0, 0, 0]);
  const [played, setPlayed] = React.useState(reduced || triggerMode === 'manual');
  const visibleRef = React.useRef(true);

  const measureSeq = React.useCallback(() => {
    const ws = [0, 1, 2].map((i) => (seqRefs.current[i] ? seqRefs.current[i].getBoundingClientRect().width / Math.max(0.01, (rootRef.current?.getBoundingClientRect().width || 1) / (rootRef.current?.offsetWidth || 1)) : 0));
    setSeqW((prev) => (prev.every((v, i) => Math.abs(v - ws[i]) < 0.5) ? prev : ws));
  }, []);

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return undefined;
    const s = typeof getScrollContainer === 'function' ? getScrollContainer() : null;
    const scroller = s && s !== window && s.nodeType === 1 ? s : window;
    const measure = () => {
      setWidth(el.clientWidth || 1280);
      setStageH(scroller === window ? window.innerHeight : scroller.clientHeight);
      requestAnimationFrame(measureSeq);
    };
    measure();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (ro) ro.observe(el);
    window.addEventListener('resize', measure);
    let alive = true;
    if (document.fonts) document.fonts.ready.then(() => { if (alive) measureSeq(); });
    const t = setTimeout(measureSeq, 1200);
    return () => { alive = false; clearTimeout(t); if (ro) ro.disconnect(); window.removeEventListener('resize', measure); };
  }, [measureSeq]);

  React.useEffect(() => { measureSeq(); }, [rows, sepStyle, sizeK, weight, sansFont, serifFont, width, measureSeq]);

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') { setPlayed(true); return undefined; }
    const vis = new IntersectionObserver((es) => { visibleRef.current = es[0].isIntersecting; }, { threshold: 0 });
    vis.observe(el);
    if (reduced || triggerMode === 'manual') { setPlayed(true); return () => vis.disconnect(); }
    setPlayed(false);
    let raf = 0;
    const io = new IntersectionObserver((es) => {
      if (es[0].isIntersecting) {
        raf = requestAnimationFrame(() => setPlayed(true));
        if (triggerMode === 'entrance') io.disconnect();
      } else if (triggerMode === 'scroll') { cancelAnimationFrame(raf); setPlayed(false); }
    }, { threshold });
    io.observe(el);
    return () => { io.disconnect(); vis.disconnect(); cancelAnimationFrame(raf); };
  }, [triggerMode, threshold, reduced]);

  React.useEffect(() => {
    const s = typeof getScrollContainer === 'function' ? getScrollContainer() : null;
    const scroller = s && s !== window && s.nodeType === 1 ? s : window;
    const getTop = () => (scroller === window ? window.scrollY || window.pageYOffset || 0 : scroller.scrollTop);
    const state = [0, 1, 2].map((r) => ({ x: -(seqW[r] || 0) * (0.12 + r * 0.31), hover: 1 }));
    let lastTop = getTop();
    let last = performance.now();
    let vs = 0;
    let skew = 0;
    let dirSign = 1;
    let raf = 0;
    const apply = () => {
      for (let r = 0; r < rows.length; r++) {
        const tr = trackRefs.current[r];
        const sk = skewRefs.current[r];
        if (tr) tr.style.transform = `translate3d(${state[r].x.toFixed(2)}px,0,0)`;
        if (sk) sk.style.transform = `skewX(${skew.toFixed(3)}deg)`;
      }
    };
    if (reduced) { apply(); return undefined; }
    const loop = (now) => {
      const dt = Math.min(0.064, Math.max(0.001, (now - last) / 1000));
      last = now;
      const top = getTop();
      const v = (top - lastTop) / dt;
      lastTop = top;
      vs += (v - vs) * Math.min(1, dt * 9);
      if (directionFlip && Math.abs(vs) > 60) dirSign = vs > 0 ? 1 : -1;
      const boost = 1 + Math.min(14, Math.abs(vs) * 0.006 * velocityBoost);
      const skewTarget = Math.max(-maxSkew, Math.min(maxSkew, -vs * 0.016 * (velocityBoost || 0.5)));
      skew += (skewTarget - skew) * Math.min(1, dt * 7);
      if (visibleRef.current) {
        for (let r = 0; r < rows.length; r++) {
          const w = seqW[r];
          if (!w) continue;
          const st = state[r];
          st.hover += ((hoverRef.current[r] ? hoverSlow : 1) - st.hover) * Math.min(1, dt * 5);
          const dir = alternate ? (r % 2 === 0 ? -1 : 1) : -1;
          const sp = baseSpeed * (1 + r * 0.14);
          st.x += dir * dirSign * sp * boost * st.hover * dt;
          st.x = ((st.x % w) + w) % w - w;
        }
        apply();
      }
      raf = requestAnimationFrame(loop);
    };
    apply();
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [seqW, rows.length, reduced, directionFlip, velocityBoost, maxSkew, hoverSlow, alternate, baseSpeed]);

  const compact = width < 760;
  const pad = compact ? 20 : Math.round(Math.min(56, width * 0.04));
  const fs = Math.round(Math.max(54, width * (compact ? sizeK * 2.3 : sizeK)));
  const pillH = Math.round(fs * 0.6);
  const pillW = Math.round(pillH * 1.75);
  const sansCss = sansFont === 'system-ui' ? 'system-ui, -apple-system, sans-serif' : `"${sansFont}", "Inter", -apple-system, "Helvetica Neue", Arial, sans-serif`;
  const serifCss = serifFont === 'Georgia' ? 'Georgia, serif' : `"${serifFont}", "Iowan Old Style", Georgia, serif`;
  const rowStyle = (style) => {
    if (style === 'serif-italic') return { fontFamily: serifCss, fontStyle: 'italic', fontWeight: 400, letterSpacing: '-0.01em', color: text };
    if (style === 'outline') return { fontFamily: sansCss, fontWeight: weight, letterSpacing: '-0.035em', color: 'transparent', WebkitTextStroke: `1px ${text}` };
    return { fontFamily: sansCss, fontWeight: weight, letterSpacing: '-0.045em', color: text };
  };
  const E = 'cubic-bezier(0.22, 1, 0.36, 1)';

  let imgCursor = 0;
  const separator = (r, k) => {
    const usePill = images.length && (sepStyle === 'image-pill' || (sepStyle === 'mixed' && (k + r) % 2 === 0));
    if (!usePill) {
      return <span aria-hidden="true" style={{ display: 'inline-block', width: Math.round(fs * 0.16), height: Math.round(fs * 0.16), borderRadius: '50%', background: dotC, margin: `0 ${Math.round(fs * 0.34)}px`, verticalAlign: 'middle', flex: '0 0 auto' }} />;
    }
    const src = images[(imgCursor++ + r * 3) % images.length];
    return (
      <span aria-hidden="true" className={`${uid}-pill`} style={{ display: 'inline-block', position: 'relative', width: pillW, height: pillH, borderRadius: pillH, overflow: 'hidden', margin: `0 ${Math.round(fs * 0.26)}px`, flex: '0 0 auto', background: `${muted}33`, transform: played ? 'scale(1)' : 'scale(0.2)', opacity: played ? 1 : 0, transition: played ? `transform 1s ${E} ${520 + r * 120 + k * 60}ms, opacity .6s ease ${520 + r * 120 + k * 60}ms` : 'none' }}>
        <img src={src} alt="" draggable="false" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </span>
    );
  };
  const sequence = (row, r, copy) => {
    imgCursor = 0;
    return (
      <div key={copy} ref={copy === 0 ? (el) => { seqRefs.current[r] = el; } : undefined} aria-hidden={copy > 0 ? 'true' : undefined}
        style={{ display: 'flex', alignItems: 'center', flex: '0 0 auto', whiteSpace: 'nowrap' }}>
        {row.words.map((w, k) => (
          <React.Fragment key={k}>
            <span style={{ display: 'inline-block', paddingRight: row.style === 'serif-italic' ? '0.06em' : 0 }}>{w}</span>
            {separator(r, k)}
          </React.Fragment>
        ))}
      </div>
    );
  };

  const rowsBlock = rows.map((row, r) => {
    const w = seqW[r] || width;
    const copies = Math.max(2, Math.ceil(width / Math.max(1, w)) + 1);
    return (
      <div key={r} className={`${uid}-row`} role="group" aria-label={row.words.join(', ')}
        onMouseEnter={() => { hoverRef.current[r] = true; }} onMouseLeave={() => { hoverRef.current[r] = false; }}
        style={{ position: 'relative', overflow: 'hidden', padding: `${Math.round(fs * 0.04)}px 0`, borderTop: r === 0 ? `1px solid ${text}1f` : 'none', borderBottom: `1px solid ${text}1f` }}>
        <div style={{ transform: played ? 'translateY(0)' : 'translateY(105%)', opacity: played ? 1 : 0, transition: played ? `transform 1.25s ${E} ${120 + r * 130}ms, opacity .5s ease ${120 + r * 130}ms` : 'none' }}>
          <div ref={(el) => { skewRefs.current[r] = el; }} style={{ willChange: 'transform' }}>
            <div ref={(el) => { trackRefs.current[r] = el; }} style={{ display: 'flex', width: 'max-content', willChange: 'transform', fontSize: fs, lineHeight: 1.12, ...rowStyle(row.style) }}>
              {Array.from({ length: copies }, (_, c) => sequence(row, r, c))}
            </div>
          </div>
        </div>
      </div>
    );
  });

  const meta = { fontSize: compact ? 12 : 13, color: muted, letterSpacing: '0.01em' };
  const fade = (d) => ({ opacity: played ? 1 : 0, transform: played ? 'none' : 'translateY(8px)', transition: played ? `opacity .8s ease ${d}ms, transform .9s ${E} ${d}ms` : 'none' });

  return (
    <section ref={rootRef} className={`velocity-marquee ${uid}`} aria-label={topLeft}
      style={{ position: 'relative', width: '100%', minHeight: compact ? Math.min(stageH, 680) : Math.max(560, stageH), boxSizing: 'border-box', overflow: 'hidden', background: bg, color: text, fontFamily: sansCss, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: `${pad}px 0` }}>
      <style>{`
        .${uid} .${uid}-pill img { transition: transform .8s cubic-bezier(0.22,1,0.36,1); }
        .${uid} .${uid}-row:hover .${uid}-pill img { transform: scale(1.12); }
      `}</style>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: `0 ${pad}px`, ...meta, ...fade(60) }}>
        <span style={{ color: text }}>{topLeft}</span>
        <span style={{ fontVariantNumeric: 'tabular-nums' }}>{topRight}</span>
      </header>
      <div style={{ display: 'flex', flexDirection: 'column', margin: `${compact ? 28 : 36}px 0` }}>{rowsBlock}</div>
      <footer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, padding: `0 ${pad}px`, ...meta, ...fade(700) }}>
        <span style={{ maxWidth: 340, color: text, lineHeight: 1.5, fontSize: compact ? 13 : 15 }}>{footerText}</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, whiteSpace: 'nowrap' }}>
          {footerHint}
          <svg width="12" height="16" viewBox="0 0 12 16" aria-hidden="true"><path d="M6 1v13M1.5 9.5 6 14l4.5-4.5" fill="none" stroke="currentColor" strokeWidth="1.2" /></svg>
        </span>
      </footer>
    </section>
  );
}

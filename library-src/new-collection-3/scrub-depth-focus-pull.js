const MANIFEST = {
  "type": "Scrub.DepthFocusPull",
  "description": "Scroll dollies a camera forward through planes of large grotesk type stacked in depth. Each plane racks into sharp focus as it reaches the focal plane, then slides past the lens and dissolves, while a mono focus-distance readout counts down; the last plane locks in focus as the headline with a subline and call to action",
  "editorElement": {
    "selector": ".depth-focus-pull",
    "displayName": "Depth Focus Pull",
    "archetype": "container",
    "data": {
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Process — In six planes", "group": "Content" },
      "lines": { "dataType": "text", "displayName": "Plane Lines (separate with |)", "defaultValue": "Start with a feeling | Find the one idea | Strip away the noise | Give it room to move | Hold it to the light | Bring it into focus", "group": "Content" },
      "labels": { "dataType": "text", "displayName": "Plane Labels (comma separated)", "defaultValue": "Brief, Concept, Edit, Motion, Craft, Launch", "group": "Content" },
      "subline": { "dataType": "text", "displayName": "Final Subline", "defaultValue": "Six passes, one picture. We work until nothing in the frame is out of focus.", "group": "Content" },
      "ctaLabel": { "dataType": "text", "displayName": "CTA Label", "defaultValue": "Start a project", "group": "Content" },
      "ctaLink": { "dataType": "text", "displayName": "CTA Link", "defaultValue": "#", "group": "Content" },
      "imageUrls": { "dataType": "text", "displayName": "Image URLs (comma separated)", "defaultValue": "https://picsum.photos/id/1043/600/400, https://picsum.photos/id/1067/600/400, https://picsum.photos/id/1036/600/400", "group": "Images" },
      "imagePlanes": { "dataType": "text", "displayName": "Planes With Images (numbers)", "defaultValue": "2, 4, 5", "group": "Images" },
      "imageGrayscale": { "dataType": "booleanValue", "displayName": "Monochrome Images", "defaultValue": "true", "group": "Images" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#0B0B0C", "group": "Colors" },
      "textColor": { "dataType": "color", "displayName": "In-focus Text", "defaultValue": "#F3F2EF", "group": "Colors" },
      "fogColor": { "dataType": "color", "displayName": "Depth Fog", "defaultValue": "#3A3734", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Mono Labels", "defaultValue": "#8A857F", "group": "Colors" },
      "ruleColor": { "dataType": "color", "displayName": "Hairlines", "defaultValue": "#2B2927", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent (focus mark)", "defaultValue": "#D9480F", "group": "Colors" },
      "font": { "dataType": "select", "displayName": "Grotesk", "defaultValue": "Geist", "options": ["Geist", "Inter Tight", "Inter", "Archivo", "Manrope", "Hanken Grotesk"], "group": "Typography" },
      "monoFont": { "dataType": "select", "displayName": "Mono", "defaultValue": "Geist Mono", "options": ["Geist Mono", "JetBrains Mono", "IBM Plex Mono", "Space Mono"], "group": "Typography" },
      "textSize": { "dataType": "select", "displayName": "Plane Text Size (px)", "defaultValue": "112", "options": ["80", "96", "112", "128", "144"], "group": "Typography" },
      "textWeight": { "dataType": "select", "displayName": "Weight", "defaultValue": "400", "options": ["300", "400", "500"], "group": "Typography" },
      "tracking": { "dataType": "select", "displayName": "Tracking", "defaultValue": "-0.045", "options": ["-0.02", "-0.035", "-0.045", "-0.055"], "group": "Typography" },
      "planeGap": { "dataType": "select", "displayName": "Plane Spacing", "defaultValue": "medium", "options": ["tight", "medium", "deep"], "group": "Layout" },
      "composition": { "dataType": "select", "displayName": "Composition", "defaultValue": "staggered", "options": ["staggered", "centered", "left"], "group": "Layout" },
      "scrollLength": { "dataType": "select", "displayName": "Scroll Length (screens)", "defaultValue": "5", "options": ["3", "4", "5", "6", "7"], "group": "Layout" },
      "showReadout": { "dataType": "booleanValue", "displayName": "Focus Readout", "defaultValue": "true", "group": "Layout" },
      "startDistance": { "dataType": "text", "displayName": "Start Focus Distance (m)", "defaultValue": "8.40", "group": "Layout" },
      "endDistance": { "dataType": "text", "displayName": "End Focus Distance (m)", "defaultValue": "0.60", "group": "Layout" },
      "blurStrength": { "dataType": "select", "displayName": "Defocus Blur", "defaultValue": "medium", "options": ["soft", "medium", "strong"], "group": "Animation" },
      "dwell": { "dataType": "select", "displayName": "Focus Hold", "defaultValue": "0.4", "options": ["0.2", "0.4", "0.6"], "group": "Animation", "description": "Share of each plane's scroll spent locked in focus" },
      "smoothing": { "dataType": "select", "displayName": "Scrub Smoothing", "defaultValue": "0.12", "options": ["0.08", "0.12", "0.2", "1"], "group": "Animation" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const eyebrow = config?.eyebrow || 'Process — In six planes';
  const subline = config?.subline || 'Six passes, one picture. We work until nothing in the frame is out of focus.';
  const ctaLabel = config?.ctaLabel || 'Start a project';
  const ctaLink = config?.ctaLink || '#';
  const grayscale = bool(config?.imageGrayscale, true);
  const bg = config?.backgroundColor || '#0B0B0C';
  const textColor = config?.textColor || '#F3F2EF';
  const fogColor = config?.fogColor || '#3A3734';
  const muted = config?.mutedColor || '#8A857F';
  const ruleColor = config?.ruleColor || '#2B2927';
  const accent = config?.accentColor || '#D9480F';
  const font = config?.font || 'Geist';
  const monoFont = config?.monoFont || 'Geist Mono';
  const textSizeBase = parseInt(config?.textSize || '112', 10) || 112;
  const weight = parseInt(config?.textWeight || '400', 10) || 400;
  const tracking = parseFloat(config?.tracking || '-0.045');
  const gapMul = { tight: 0.75, medium: 1, deep: 1.35 }[config?.planeGap || 'medium'] || 1;
  const composition = config?.composition || 'staggered';
  const screens = parseFloat(config?.scrollLength || '5') || 5;
  const showReadout = bool(config?.showReadout, true);
  const startDist = parseFloat(config?.startDistance || '8.40') || 8.4;
  const endDist = parseFloat(config?.endDistance || '0.60') || 0.6;
  const blurK = { soft: 4, medium: 7, strong: 11 }[config?.blurStrength || 'medium'] || 7;
  const dwell = Math.min(0.8, Math.max(0, parseFloat(config?.dwell || '0.4')));
  const smoothing = Math.min(1, Math.max(0.02, parseFloat(config?.smoothing || '0.12')));

  const planes = React.useMemo(() => {
    const ls = String(config?.lines || 'Start with a feeling | Find the one idea | Strip away the noise | Give it room to move | Hold it to the light | Bring it into focus')
      .split('|').map((s) => s.trim()).filter(Boolean);
    const lb = String(config?.labels || 'Brief, Concept, Edit, Motion, Craft, Launch').split(',').map((s) => s.trim());
    const urls = String(config?.imageUrls || 'https://picsum.photos/id/1043/600/400, https://picsum.photos/id/1067/600/400, https://picsum.photos/id/1036/600/400')
      .split(',').map((s) => s.trim()).filter(Boolean);
    const withImg = String(config?.imagePlanes ?? '2, 4, 5').split(',').map((s) => parseInt(s, 10) - 1).filter((n) => !isNaN(n));
    const list = (ls.length ? ls : ['Focus']).slice(0, 8);
    let u = 0;
    return list.map((line, i) => {
      const img = i < list.length - 1 && withImg.includes(i) && urls.length ? urls[u++ % urls.length] : null;
      return { line, label: lb[i] || `Plane ${i + 1}`, img };
    });
  }, [config?.lines, config?.labels, config?.imageUrls, config?.imagePlanes]);
  const n = planes.length;

  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    [font, monoFont].forEach((f) => {
      const id = 'dfp3-font-' + f.replace(/\s+/g, '-').toLowerCase();
      if (document.getElementById(id)) return;
      const l = document.createElement('link');
      l.id = id; l.rel = 'stylesheet';
      l.href = `https://fonts.googleapis.com/css2?family=${f.replace(/\s+/g, '+')}:wght@${f === 'Space Mono' ? '400' : '300;400;500'}&display=swap`;
      document.head.appendChild(l);
    });
  }, [font, monoFont]);

  const uid = React.useMemo(() => 'dfp' + Math.random().toString(36).slice(2, 8), []);
  const sectionRef = React.useRef(null);
  const target = React.useRef(0);
  const current = React.useRef(0);
  const [progress, setProgress] = React.useState(reduced ? 1 : 0);
  const [stageH, setStageH] = React.useState(800);
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
      current.current = Math.abs(d) < 0.0004 ? target.current : current.current + d * smoothing;
      setProgress(current.current);
      raf = current.current === target.current ? 0 : requestAnimationFrame(tick);
    };
    const onScroll = () => { read(); if (!raf && !reduced) raf = requestAnimationFrame(tick); };
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
  }, [smoothing, reduced]);

  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const smooth = (t) => t * t * (3 - 2 * t);
  const ease = (t) => 1 - Math.pow(1 - t, 3);
  const hex = (h) => {
    const m = String(h).replace('#', '');
    const f = m.length === 3 ? m.split('').map((c) => c + c).join('') : m.padEnd(6, '0');
    return [parseInt(f.slice(0, 2), 16) || 0, parseInt(f.slice(2, 4), 16) || 0, parseInt(f.slice(4, 6), 16) || 0];
  };
  const mix = (a, b, t) => { const A = hex(a); const B = hex(b); return `rgb(${A.map((v, k) => Math.round(v + (B[k] - v) * t)).join(',')})`; };

  const p = reduced ? 1 : progress;
  const seg = (a, b) => clamp((p - a) / (b - a));
  const travelEnd = 0.86;
  const raw = clamp(p / travelEnd) * (n - 1);
  const si = Math.min(Math.max(0, n - 2), Math.floor(raw));
  const sf = raw - si;
  const focusIdx = n < 2 ? 0 : Math.min(n - 1, si + smooth(clamp((sf - dwell / 2) / Math.max(0.05, 1 - dwell))));
  const outro = ease(seg(0.88, 0.99));

  const W = Math.max(320, width);
  const H = Math.max(360, stageH);
  const compact = W < 760;
  const pad = compact ? 20 : Math.round(Math.max(40, Math.min(72, W * 0.045)));
  const longest = Math.max(...planes.map((pl) => pl.line.length), 6);
  const longestWord = Math.max(...planes.flatMap((pl) => pl.line.split(/\s+/).map((w) => w.length)), 4);
  const fit = compact ? (W - pad * 2) / (Math.max(longestWord * 0.56, 7)) : (W - pad * 2) * 0.82 / (longest * 0.48);
  const size = Math.round(Math.min(compact ? textSizeBase * 0.5 : textSizeBase, fit));
  const P = compact ? 800 : 1000;
  const gap = (compact ? 620 : 860) * gapMul;
  const cam = focusIdx * gap;
  const monoCss = `"${monoFont}", ui-monospace, "SF Mono", Menlo, monospace`;
  const sansCss = `"${font}", "Inter", -apple-system, "Helvetica Neue", Arial, sans-serif`;
  const imgW = compact ? 120 : 220;
  const imgH = Math.round(imgW * 0.66);

  const alignFor = (i) => {
    if (i === n - 1 || composition === 'centered') return 'center';
    if (composition === 'left' || compact) return 'left';
    return ['left', 'right', 'left', 'center', 'right', 'left', 'right'][i % 7];
  };
  const yFor = (i) => (i === n - 1 ? 0 : [-0.13, 0.15, -0.15, 0.11, -0.12, 0.14, -0.1][i % 7] * H * (compact ? 0.9 : 1));

  const nodes = [];
  let sharpest = 0;
  planes.forEach((pl, i) => {
    const z = cam - i * gap;
    if (z > P * 0.85 || z < -gap * 4.2) return;
    const dz = Math.abs(z) / gap;
    const isFinal = i === n - 1;
    const sharp = clamp(1 - dz * 2.2);
    if (sharp > sharpest) sharpest = sharp;
    const near = z > 0 ? clamp(z / (P * 0.5)) : 0;
    const far = z < 0 ? clamp(-z / (gap * 4)) : 0;
    const op = (1 - smooth(near)) * (1 - Math.pow(far, 1.6));
    if (op < 0.01) return;
    const blur = Math.min(26, dz * blurK * (z > 0 ? 1.6 : 1));
    const color = mix(textColor, fogColor, clamp(dz / 2.6));
    const align = alignFor(i);
    const half = (W - pad * 2) / 2;
    const tx = align === 'left' ? -half : align === 'right' ? half : 0;
    const shift = align === 'left' ? '0%' : align === 'right' ? '-100%' : '-50%';
    const imgSide = align === 'right' ? 'left' : 'right';
    nodes.push(
      <div key={i} aria-hidden={isFinal ? undefined : 'true'} style={{
        position: 'absolute', left: 0, top: 0,
        transform: `translate3d(${tx}px, ${yFor(i)}px, ${z}px) translate(${shift}, -50%)`,
        opacity: op, filter: blur > 0.2 ? `blur(${blur.toFixed(2)}px)` : 'none', textAlign: align,
        willChange: 'transform, filter, opacity'
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, justifyContent: align === 'right' ? 'flex-end' : align === 'center' ? 'center' : 'flex-start',
          fontFamily: monoCss, fontSize: compact ? 10 : 11, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: compact ? 10 : 16,
          color: mix(muted, accent, sharp), opacity: isFinal ? 1 - outro : 1
        }}>
          <span style={{ display: 'inline-block', width: 7, height: 7, border: `1px solid currentColor`, background: sharp > 0.6 ? 'currentColor' : 'transparent' }} />
          <span>{String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</span>
          <span style={{ color: mix(muted, textColor, 0.3) }}>{pl.label}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: imgSide === 'left' ? 'row-reverse' : 'row', gap: compact ? 14 : 28, justifyContent: align === 'center' ? 'center' : 'flex-start' }}>
          {isFinal ? (
            <h2 style={{ margin: 0, whiteSpace: compact ? 'normal' : 'nowrap', width: compact ? W - pad * 2 : 'auto', fontFamily: sansCss, fontWeight: weight, fontSize: size * 1.08, lineHeight: 0.98, letterSpacing: `${tracking}em`, color }}>
              {pl.line}<span style={{ color: accent }}>.</span>
            </h2>
          ) : (
            <div style={{ whiteSpace: compact ? 'normal' : 'nowrap', width: compact ? W - pad * 2 : 'auto', fontFamily: sansCss, fontWeight: weight, fontSize: size, lineHeight: 0.98, letterSpacing: `${tracking}em`, color }}>{pl.line}</div>
          )}
          {pl.img && !compact && (
            <div style={{ width: imgW, height: imgH, flex: 'none', overflow: 'hidden', background: mix(bg, fogColor, 0.5) }}>
              <img src={pl.img + (grayscale && !/grayscale/.test(pl.img) ? (pl.img.includes('?') ? '&' : '?') + 'grayscale' : '')} alt="" draggable="false"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: `scale(${1 + dz * 0.12})`, opacity: 0.92 }} />
            </div>
          )}
        </div>
      </div>
    );
  });

  const remaining = n > 1 ? 1 - focusIdx / (n - 1) : 0;
  const dist = endDist + (startDist - endDist) * Math.pow(remaining, 1.4);
  const activeIdx = Math.round(focusIdx);
  const locked = sharpest > 0.92;

  return (
    <section ref={sectionRef} className={`depth-focus-pull ${uid}`} aria-label={`${eyebrow}. ${planes.map((pl) => pl.line).join('. ')}.`}
      style={{ position: 'relative', width: '100%', height: `${Math.round(stageH * screens)}px`, background: bg, color: textColor }}>
      <style>{`.${uid} .dfp-cta:focus-visible{outline:1px solid ${accent};outline-offset:6px}.${uid} .dfp-cta:hover .dfp-arrow{transform:translateX(4px)}`}</style>
      <div style={{ position: 'sticky', top: 0, height: `${stageH}px`, overflow: 'hidden', background: bg }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${mix(bg, fogColor, 0.35)} 0%, ${bg} 75%)` }} />
        <div style={{ position: 'absolute', inset: 0, perspective: `${P}px`, perspectiveOrigin: '50% 50%' }}>
          <div style={{ position: 'absolute', left: '50%', top: '50%', width: 0, height: 0, transformStyle: 'preserve-3d' }}>
            {nodes.reverse()}
          </div>
        </div>

        <div style={{
          position: 'absolute', left: '50%', top: '50%', width: compact ? W - pad * 2 : 520, textAlign: 'center',
          transform: `translate(-50%, ${size * 0.75 + (1 - outro) * 16}px)`, opacity: outro, pointerEvents: outro > 0.5 ? 'auto' : 'none'
        }}>
          <p style={{ margin: '0 auto', fontFamily: sansCss, fontWeight: 300, fontSize: compact ? 15 : 18, lineHeight: 1.5, color: mix(textColor, muted, 0.35), maxWidth: 460 }}>{subline}</p>
          {ctaLabel && (
            <a className="dfp-cta" href={ctaLink} style={{
              display: 'inline-flex', alignItems: 'center', gap: 12, marginTop: compact ? 20 : 28, padding: '13px 20px', border: `1px solid ${mix(ruleColor, textColor, 0.35)}`,
              color: textColor, textDecoration: 'none', fontFamily: monoCss, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase'
            }}>
              {ctaLabel}<span className="dfp-arrow" style={{ color: accent, transition: 'transform 300ms cubic-bezier(0.22,1,0.36,1)' }}>→</span>
            </a>
          )}
        </div>

        <div style={{ position: 'absolute', top: compact ? 20 : 36, left: pad, right: pad, display: 'flex', justifyContent: 'space-between', fontFamily: monoCss, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: muted }}>
          <span>{eyebrow}</span>
          <span aria-hidden="true" style={{ color: locked ? accent : muted }}>{locked ? '● Focus locked' : '○ Racking'}</span>
        </div>

        {showReadout && (
          <div aria-hidden="true" style={{ position: 'absolute', left: pad, right: pad, bottom: compact ? 20 : 32, fontFamily: monoCss, color: muted }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 14 }}>
              <div>
                <div style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 6 }}>Focus distance</div>
                <div style={{ fontSize: compact ? 20 : 26, letterSpacing: '-0.02em', color: textColor, fontVariantNumeric: 'tabular-nums' }}>
                  {dist.toFixed(2)}<span style={{ fontSize: '0.5em', marginLeft: 4, color: muted }}>m</span>
                </div>
              </div>
              <div style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                <div>f / 1.4 · 50 mm</div>
                <div style={{ marginTop: 6, color: textColor }}>Plane {String(activeIdx + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</div>
              </div>
            </div>
            <div style={{ position: 'relative', height: 1, background: ruleColor }}>
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${(1 - remaining) * 100}%`, background: mix(muted, textColor, 0.4) }} />
              {planes.map((_, i) => (
                <div key={i} style={{
                  position: 'absolute', top: -3, left: `${n > 1 ? (i / (n - 1)) * 100 : 0}%`, width: 1, height: 7,
                  background: i === activeIdx && locked ? accent : mix(ruleColor, muted, 0.6)
                }} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

const MANIFEST = {
  "type": "Scrub.WordFillParagraph",
  "description": "A large manifesto paragraph that fills from pale grey to ink word by word as you scroll; bracketed words carry inline photo pills that open into larger rounded images when reached, then settle back as the reading continues, ending on a quiet sign-off",
  "editorElement": {
    "selector": ".word-fill-paragraph",
    "displayName": "Word Fill Paragraph",
    "archetype": "container",
    "data": {
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Manifesto", "group": "Content" },
      "text": { "dataType": "text", "displayName": "Paragraph ([word] = image pill)", "defaultValue": "We build [homes] for slow mornings and long tables, for [light] that wanders across oak floors through the day. Every material is chosen to age with grace — lime, linen, [stone] — so a house grows more like itself each year.", "group": "Content" },
      "author": { "dataType": "text", "displayName": "Sign-off Name", "defaultValue": "Ines Marlowe", "group": "Content" },
      "authorRole": { "dataType": "text", "displayName": "Sign-off Role", "defaultValue": "Founder, Marlowe Atelier", "group": "Content" },
      "pillMode": { "dataType": "select", "displayName": "Pill Placement", "defaultValue": "after word", "options": ["after word", "replace word"], "group": "Content" },
      "pill1Image": { "dataType": "text", "displayName": "Pill 1 Image URL", "defaultValue": "https://picsum.photos/id/1059/900/700", "group": "Images" },
      "pill2Image": { "dataType": "text", "displayName": "Pill 2 Image URL", "defaultValue": "https://picsum.photos/id/1067/900/700", "group": "Images" },
      "pill3Image": { "dataType": "text", "displayName": "Pill 3 Image URL", "defaultValue": "https://picsum.photos/id/1049/900/700", "group": "Images" },
      "pill4Image": { "dataType": "text", "displayName": "Pill 4 Image URL", "defaultValue": "https://picsum.photos/id/1073/900/700", "group": "Images" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#FAFAF9", "group": "Colors" },
      "textColor": { "dataType": "color", "displayName": "Ink", "defaultValue": "#1C1917", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#78716C", "group": "Colors" },
      "paleOpacity": { "dataType": "select", "displayName": "Unread Word Opacity", "defaultValue": "0.16", "options": ["0.1", "0.16", "0.24", "0.32"], "group": "Colors" },
      "fontFamily": { "dataType": "select", "displayName": "Font Family", "defaultValue": "Inter Tight", "options": ["Inter Tight", "Instrument Serif", "Fraunces", "DM Sans", "system-ui"], "group": "Typography" },
      "fontSize": { "dataType": "select", "displayName": "Font Size (px)", "defaultValue": "72", "options": ["48", "56", "64", "72", "84"], "group": "Typography", "description": "Scales down on narrow stages" },
      "fontWeight": { "dataType": "select", "displayName": "Font Weight", "defaultValue": "400", "options": ["300", "400", "500"], "group": "Typography" },
      "lineHeight": { "dataType": "select", "displayName": "Line Height", "defaultValue": "1.14", "options": ["1.05", "1.14", "1.25"], "group": "Typography" },
      "textAlign": { "dataType": "select", "displayName": "Alignment", "defaultValue": "left", "options": ["left", "center"], "group": "Layout" },
      "maxWidth": { "dataType": "select", "displayName": "Max Width (px)", "defaultValue": "1120", "options": ["880", "1000", "1120", "1280"], "group": "Layout" },
      "scrollLength": { "dataType": "select", "displayName": "Scroll Length (screens)", "defaultValue": "4", "options": ["3", "4", "5", "6"], "group": "Layout" },
      "pillExpand": { "dataType": "select", "displayName": "Pill Expansion", "defaultValue": "medium", "options": ["subtle", "medium", "large"], "group": "Animation" },
      "pillDwell": { "dataType": "select", "displayName": "Pill Dwell", "defaultValue": "medium", "options": ["short", "medium", "long"], "group": "Animation", "description": "How long the paragraph pauses on each opened image" },
      "monoPills": { "dataType": "booleanValue", "displayName": "Grey Pills Until Read", "defaultValue": "true", "group": "Animation" },
      "smoothing": { "dataType": "select", "displayName": "Scrub Smoothing", "defaultValue": "0.1", "options": ["0.06", "0.1", "0.18", "1"], "group": "Animation", "description": "1 = locked to the scrollbar, lower = more glide" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const eyebrow = config?.eyebrow || 'Manifesto';
  const text = config?.text || 'We build [homes] for slow mornings and long tables, for [light] that wanders across oak floors through the day. Every material is chosen to age with grace — lime, linen, [stone] — so a house grows more like itself each year.';
  const author = config?.author || 'Ines Marlowe';
  const authorRole = config?.authorRole || 'Founder, Marlowe Atelier';
  const replaceMode = (config?.pillMode || 'after word') === 'replace word';
  const pillImages = [
    config?.pill1Image || 'https://picsum.photos/id/1059/900/700',
    config?.pill2Image || 'https://picsum.photos/id/1067/900/700',
    config?.pill3Image || 'https://picsum.photos/id/1049/900/700',
    config?.pill4Image || 'https://picsum.photos/id/1073/900/700'
  ];
  const bg = config?.backgroundColor || '#FAFAF9';
  const ink = config?.textColor || '#1C1917';
  const muted = config?.mutedColor || '#78716C';
  const pale = Math.min(0.9, Math.max(0.02, parseFloat(config?.paleOpacity || '0.16') || 0.16));
  const fontFamily = config?.fontFamily || 'Inter Tight';
  const baseSize = parseInt(config?.fontSize || '72', 10) || 72;
  const fontWeight = config?.fontWeight || '400';
  const lineHeight = parseFloat(config?.lineHeight || '1.14') || 1.14;
  const align = config?.textAlign === 'center' ? 'center' : 'left';
  const maxWidth = parseInt(config?.maxWidth || '1120', 10) || 1120;
  const screens = parseFloat(config?.scrollLength || '4') || 4;
  const expandH = { subtle: 2.4, medium: 3.3, large: 4.1 }[config?.pillExpand || 'medium'] || 2.15;
  const dwell = { short: 3.5, medium: 5, long: 7 }[config?.pillDwell || 'medium'] || 5;
  const monoPills = bool(config?.monoPills, true);
  const smoothing = Math.min(1, Math.max(0.02, parseFloat(config?.smoothing || '0.1') || 0.1));

  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const uid = React.useMemo(() => 'wf' + Math.random().toString(36).slice(2, 9), []);

  React.useEffect(() => {
    const families = {
      'Instrument Serif': 'Instrument+Serif:ital@0;1', 'Fraunces': 'Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500',
      'Inter Tight': 'Inter+Tight:wght@300;400;500', 'DM Sans': 'DM+Sans:wght@300;400;500'
    };
    [families[fontFamily], 'Inter:wght@300;400;500'].filter(Boolean).forEach((f) => {
      const id = 'gf-' + f.replace(/[^a-z0-9]/gi, '').slice(0, 40);
      if (document.getElementById(id)) return;
      const l = document.createElement('link');
      l.id = id; l.rel = 'stylesheet';
      l.href = `https://fonts.googleapis.com/css2?family=${f}&display=swap`;
      document.head.appendChild(l);
    });
  }, [fontFamily]);

  // tokens: words get one unit of scroll time each, pills hold the reading for `dwell` units
  const model = React.useMemo(() => {
    const tokens = [];
    let pillIdx = 0;
    let u = 0;
    String(text).split(/\s+/).filter(Boolean).forEach((raw) => {
      const m = raw.match(/^(.*)\[([^\]]+)\](.*)$/);
      if (!m) { tokens.push({ type: 'word', text: raw, start: u }); u += 1; return; }
      const [, pre, word, post] = m;
      if (!replaceMode) { tokens.push({ type: 'word', text: pre + word, start: u }); u += 1; }
      else if (pre) tokens.push({ type: 'word', text: pre, start: u });
      tokens.push({ type: 'pill', word, src: pillImages[pillIdx % pillImages.length], start: u });
      if (post) tokens.push({ type: 'word', text: post, start: u, glue: true });
      pillIdx += 1;
      u += dwell;
    });
    return { tokens, total: u };
  }, [text, replaceMode, dwell, pillImages.join('|')]); // eslint-disable-line react-hooks/exhaustive-deps

  const sectionRef = React.useRef(null);
  const paraRef = React.useRef(null);
  const tokRefs = React.useRef([]);
  const pillImgRefs = React.useRef([]);
  const signRef = React.useRef(null);
  const eyebrowRef = React.useRef(null);
  const barRef = React.useRef(null);
  const paraWrapRef = React.useRef(null);
  const applyRef = React.useRef(null);
  const st = React.useRef({ target: reduced ? 1 : 0, cur: reduced ? 1 : 0 });
  const [dims, setDims] = React.useState({ w: 1280, h: 760 });
  const [fontsTick, setFontsTick] = React.useState(0);

  React.useEffect(() => {
    let alive = true;
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (alive) setFontsTick((n) => n + 1); });
    const t = setTimeout(() => { if (alive) setFontsTick((n) => n + 1); }, 1200);
    return () => { alive = false; clearTimeout(t); };
  }, [fontFamily]);

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
      st.current.target = travel > 0 ? Math.min(1, Math.max(0, (top - r.top) / travel)) : 0;
    };
    const tick = () => {
      const S = st.current;
      const d = S.target - S.cur;
      S.cur = Math.abs(d) < 0.0002 ? S.target : S.cur + d * smoothing;
      if (applyRef.current) applyRef.current(S.cur);
      raf = S.cur === S.target ? 0 : requestAnimationFrame(tick);
    };
    const onScroll = () => {
      if (reduced) return;
      read();
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const measure = () => {
      const h = scroller === window ? window.innerHeight : scroller.clientHeight;
      const w = section.clientWidth;
      setDims((p) => (p.w === w && p.h === h ? p : { w, h }));
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

  const W = dims.w;
  const H = dims.h;
  const compact = W < 700;
  const pad = compact ? 22 : 56;
  const topY = compact ? 64 : Math.max(84, H * 0.13);
  const bottomReserve = compact ? 84 : 112;
  const fs = Math.max(20, Math.round(compact ? Math.min(baseSize * 0.56, W * 0.092) : Math.min(baseSize, W * 0.056, H * 0.09)));
  const pillRest = replaceMode ? 2.9 : 2.6;
  const pillOpen = pillRest + 0.6;
  const pillH0 = 0.78;

  const clamp = (v) => Math.min(1, Math.max(0, v));
  const smooth = (t) => t * t * (3 - 2 * t);
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  applyRef.current = (p) => {
    const seg = (a, b) => clamp((p - a) / (b - a));
    const lead = 2.2;
    const fillT = smooth(seg(0.02, 0.86));
    const f = lead + (model.total + 1 - lead) * fillT;
    let extra = 0;
    model.tokens.forEach((tk, i) => {
      const el = tokRefs.current[i];
      if (!el) return;
      const fill = clamp((f - tk.start) / 1.15);
      if (tk.type === 'word') {
        el.style.opacity = (pale + (1 - pale) * fill).toFixed(3);
        return;
      }
      const up = smooth(clamp((f - tk.start + 0.5) / 1.8));
      const down = smooth(clamp((f - (tk.start + dwell - 1.6)) / 1.8));
      const e = up * (1 - down);
      const h = pillH0 + (expandH - pillH0) * e;
      el.style.height = `${h.toFixed(4)}em`;
      extra += (h - pillH0) * fs;
      const vis = el.firstChild;
      if (vis) {
        vis.style.width = `${(pillRest + (pillOpen - pillRest) * e).toFixed(4)}em`;
        vis.style.borderRadius = `${(0.39 + (0.28 - 0.39) * e).toFixed(4)}em`;
        vis.style.opacity = (0.4 + 0.6 * Math.max(fill, up)).toFixed(3);
        vis.style.boxShadow = e > 0.01 ? `0 ${(0.3 * e).toFixed(3)}em ${(0.8 * e).toFixed(3)}em rgba(28,25,23,${(0.16 * e).toFixed(3)})` : 'none';
      }
      const im = pillImgRefs.current[i];
      if (im) {
        const gs = monoPills ? 1 - Math.max(fill, up) : 0;
        im.style.filter = gs > 0.01 ? `grayscale(${gs.toFixed(3)})` : 'none';
        im.style.transform = `scale(${(1.4 - 0.4 * e).toFixed(4)})`;
      }
    });
    const wrap = paraWrapRef.current;
    const para = paraRef.current;
    if (wrap && para) {
      const avail = H - topY - bottomReserve;
      const ph = para.offsetHeight;
      const rest = ph - extra;
      const centre = Math.max(0, (avail - rest) / 2) * 0.8;
      const over = Math.max(0, ph + centre - avail);
      wrap.style.transform = `translate3d(0, ${(centre - over * fillT).toFixed(2)}px, 0)`;
    }
    if (signRef.current) {
      const s = easeOut(seg(0.86, 0.97));
      signRef.current.style.opacity = s.toFixed(3);
      signRef.current.style.transform = `translate3d(0, ${((1 - s) * 18).toFixed(2)}px, 0)`;
    }
    if (barRef.current) barRef.current.style.transform = `scaleX(${seg(0.02, 0.86).toFixed(4)})`;
  };

  React.useLayoutEffect(() => {
    if (applyRef.current) applyRef.current(st.current.cur);
  });

  React.useEffect(() => {
    if (fontsTick && applyRef.current) applyRef.current(st.current.cur);
  }, [fontsTick]);

  const fam = fontFamily === 'system-ui' ? 'system-ui, -apple-system, sans-serif'
    : fontFamily === 'Instrument Serif' || fontFamily === 'Fraunces' ? `"${fontFamily}", Georgia, serif`
      : `"${fontFamily}", Inter, -apple-system, "Helvetica Neue", sans-serif`;
  const sans = '"Inter", -apple-system, "Helvetica Neue", sans-serif';
  const fadeTop = Math.max(0, topY - 24);
  const fadeBot = H - bottomReserve;
  const fade = `linear-gradient(180deg, transparent ${fadeTop}px, #000 ${topY - 4}px, #000 ${fadeBot}px, transparent ${fadeBot + 56}px)`;
  const plain = model.tokens.filter((t) => t.type === 'word' || replaceMode).map((t) => (t.type === 'word' ? t.text : t.word)).join(' ').replace(/\s+([,.;:!?])/g, '$1');

  return (
    <section ref={sectionRef} className={`word-fill-paragraph ${uid}`}
      style={{ position: 'relative', width: '100%', height: `${Math.round(H * screens)}px`, backgroundColor: bg, color: ink, fontFamily: sans }}>
      <div style={{ position: 'sticky', top: 0, height: `${H}px`, overflow: 'hidden', backgroundColor: bg }}>
        <div style={{ position: 'absolute', inset: 0, WebkitMaskImage: fade, maskImage: fade }}>
        <div ref={paraWrapRef} style={{ position: 'absolute', left: pad, right: pad, top: topY, display: 'flex', justifyContent: align === 'center' ? 'center' : 'flex-start', willChange: 'transform' }}>
          <p ref={paraRef} aria-label={plain}
            style={{
              margin: 0, maxWidth, fontFamily: fam, fontSize: fs, lineHeight, fontWeight, letterSpacing: fontFamily === 'Instrument Serif' ? '-0.01em' : '-0.03em',
              textAlign: align, color: ink, animation: `${uid}-in 900ms cubic-bezier(0.22, 1, 0.36, 1) both`
            }}>
            {model.tokens.map((tk, i) => {
              const gap = model.tokens[i + 1] && model.tokens[i + 1].glue ? null : ' ';
              if (tk.type === 'word') {
                return (
                  <React.Fragment key={i}>
                    <span aria-hidden="true" ref={(el) => { tokRefs.current[i] = el; }} style={{ opacity: pale }}>{tk.text}</span>{gap}
                  </React.Fragment>
                );
              }
              return (
                <React.Fragment key={i}>
                  <span aria-hidden="true" ref={(el) => { tokRefs.current[i] = el; }}
                    style={{ display: 'inline-block', position: 'relative', verticalAlign: 'middle', width: `${pillOpen}em`, height: `${pillH0}em`, margin: '0 -0.22em', top: '-0.05em' }}>
                    <span style={{
                      position: 'absolute', top: 0, bottom: 0, left: '50%', transform: 'translateX(-50%) translateZ(0)', width: `${pillRest}em`,
                      overflow: 'hidden', borderRadius: '0.39em', backgroundColor: '#E7E5E4', opacity: 0.4
                    }}>
                      <img ref={(el) => { pillImgRefs.current[i] = el; }} src={tk.src} alt="" draggable="false" loading="eager"
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: 'scale(1.4)', filter: monoPills ? 'grayscale(1)' : 'none' }} />
                    </span>
                  </span>
                  {gap}
                </React.Fragment>
              );
            })}
          </p>
        </div>
        </div>

        <div ref={eyebrowRef} style={{
          position: 'absolute', left: 0, right: 0, top: 0, padding: `${compact ? 24 : Math.max(32, topY - 54)}px ${pad}px 18px`,
          display: 'flex', alignItems: 'center', gap: 14, justifyContent: align === 'center' ? 'center' : 'flex-start',
          fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, color: muted,
        }}>
          <span>{eyebrow}</span>
          <span aria-hidden="true" style={{ width: compact ? 56 : 96, height: 1, backgroundColor: `${muted}40`, position: 'relative', overflow: 'hidden' }}>
            <span ref={barRef} style={{ position: 'absolute', inset: 0, backgroundColor: muted, transformOrigin: '0 50%', transform: 'scaleX(0)' }} />
          </span>
        </div>

        <div ref={signRef} style={{
          position: 'absolute', left: pad, right: pad, bottom: compact ? 30 : 52, opacity: 0,
          display: 'flex', alignItems: 'center', gap: 16, justifyContent: align === 'center' ? 'center' : 'flex-start'
        }}>
          <span aria-hidden="true" style={{ width: 32, height: 1, backgroundColor: ink }} />
          <span style={{ fontSize: compact ? 15 : 17, fontWeight: 500, color: ink }}>{author}</span>
          <span style={{ fontSize: compact ? 13 : 15, color: muted, fontWeight: 400 }}>{authorRole}</span>
        </div>

        <style>{`
          @keyframes ${uid}-in { from { opacity: 0; transform: translateY(18px); filter: blur(6px); } to { opacity: 1; transform: none; filter: blur(0); } }
          @media (prefers-reduced-motion: reduce) { .${uid} p { animation: none !important; } }
        `}</style>
      </div>
    </section>
  );
}

const MANIFEST = {
  "type": "Type.SplitFlap",
  "description": "A railway split-flap board with real two-half flaps that fold in 3D and cycle through the alphabet to land on each character, as a departures table or a giant headline",
  "editorElement": {
    "selector": ".split-flap",
    "displayName": "Split-Flap Board",
    "archetype": "container",
    "data": {
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Platform information", "group": "Content" },
      "title": { "dataType": "text", "displayName": "Title", "defaultValue": "Departures", "group": "Content" },
      "mode": { "dataType": "select", "displayName": "Board Mode", "defaultValue": "departures", "options": ["departures", "headline"], "group": "Content" },
      "departures": { "dataType": "text", "displayName": "Departures (Time|Destination|Gate|Status, separated by ;;)", "defaultValue": "08:15|LISBON|A12|ON TIME;;08:40|COPENHAGEN|B04|BOARDING;;09:05|KYOTO|C21|DELAYED;;09:30|REYKJAVIK|A07|ON TIME;;09:55|MARRAKECH|D02|GATE OPEN;;10:20|NEW YORK|B15|ON TIME;;10:45|BUENOS AIRES|C09|ON TIME;;11:10|HELSINKI|A03|DELAYED;;11:35|CAPE TOWN|D11|BOARDING;;12:00|SINGAPORE|B22|ON TIME;;12:25|VANCOUVER|C14|CANCELLED;;12:50|ZURICH|A18|FINAL CALL", "group": "Content" },
      "headlines": { "dataType": "text", "displayName": "Headlines (separated by ;; — use / for a line break)", "defaultValue": "THE NEXT / DEPARTURE / IS YOURS;;DESIGN IS / A LONG / JOURNEY;;NEXT STOP / SOMEWHERE / NEW;;PLEASE / MIND THE / GAP", "group": "Content" },
      "footerNote": { "dataType": "text", "displayName": "Footer Note", "defaultValue": "All times local · Board updates automatically", "group": "Content" },
      "columnLabels": { "dataType": "text", "displayName": "Column Labels", "defaultValue": "Time,Destination,Gate,Status", "group": "Content" },
      "rowsPerPage": { "dataType": "select", "displayName": "Rows Per Page", "defaultValue": "6", "options": ["4", "5", "6", "8"], "group": "Board" },
      "headlineRows": { "dataType": "select", "displayName": "Headline Rows", "defaultValue": "3", "options": ["2", "3", "4", "5"], "group": "Board" },
      "headlineCols": { "dataType": "select", "displayName": "Headline Columns", "defaultValue": "16", "options": ["12", "14", "16", "20"], "group": "Board" },
      "statusAccent": { "dataType": "booleanValue", "displayName": "Accent Status Column", "defaultValue": "true", "group": "Board" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#0C0C0D", "group": "Colors" },
      "boardColor": { "dataType": "color", "displayName": "Board Frame", "defaultValue": "#161618", "group": "Colors" },
      "flapColor": { "dataType": "color", "displayName": "Flap", "defaultValue": "#222225", "group": "Colors" },
      "charColor": { "dataType": "color", "displayName": "Characters", "defaultValue": "#F2F0EA", "group": "Colors" },
      "labelColor": { "dataType": "color", "displayName": "Labels", "defaultValue": "#8A8A8F", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent", "defaultValue": "#F0B44C", "group": "Colors" },
      "fontFamily": { "dataType": "select", "displayName": "Flap Font", "defaultValue": "Inter", "options": ["Inter", "Roboto Mono", "IBM Plex Mono", "Helvetica Neue"], "group": "Typography" },
      "titleSize": { "dataType": "select", "displayName": "Title Size (px)", "defaultValue": "64", "options": ["40", "48", "56", "64", "80"], "group": "Typography" },
      "autoplay": { "dataType": "booleanValue", "displayName": "Autoplay", "defaultValue": "true", "group": "Animation" },
      "interval": { "dataType": "select", "displayName": "Interval (seconds)", "defaultValue": "7", "options": ["4", "5", "7", "10", "15"], "group": "Animation" },
      "flipSpeed": { "dataType": "select", "displayName": "Flip Speed", "defaultValue": "medium", "options": ["fast", "medium", "slow"], "group": "Animation" },
      "cycleLength": { "dataType": "select", "displayName": "Characters Cycled", "defaultValue": "medium", "options": ["short", "medium", "full"], "group": "Animation" },
      "pauseOnHover": { "dataType": "booleanValue", "displayName": "Pause On Hover", "defaultValue": "true", "group": "Animation" },
      "sound": { "dataType": "booleanValue", "displayName": "Click Sound", "defaultValue": "false", "group": "Animation" },
      "showHeader": { "dataType": "booleanValue", "displayName": "Show Header", "defaultValue": "true", "group": "Layout" },
      "showControls": { "dataType": "booleanValue", "displayName": "Show Controls", "defaultValue": "true", "group": "Layout" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const eyebrow = config?.eyebrow || 'Platform information';
  const title = config?.title || 'Departures';
  const mode = config?.mode || 'departures';
  const depRaw = config?.departures || '08:15|LISBON|A12|ON TIME;;08:40|COPENHAGEN|B04|BOARDING;;09:05|KYOTO|C21|DELAYED';
  const headRaw = config?.headlines || 'NOW BOARDING / ALL STATIONS;;MIND THE GAP';
  const footerNote = config?.footerNote || 'All times local · Board updates automatically';
  const colLabels = String(config?.columnLabels || 'Time,Destination,Gate,Status').split(',').map((s) => s.trim());
  const rowsPerPage = parseInt(config?.rowsPerPage || '6', 10);
  const headRows = parseInt(config?.headlineRows || '3', 10);
  const headColsCfg = parseInt(config?.headlineCols || '16', 10);
  const statusAccent = bool(config?.statusAccent, true);
  const bg = config?.backgroundColor || '#0C0C0D';
  const boardColor = config?.boardColor || '#161618';
  const flapColor = config?.flapColor || '#222225';
  const charColor = config?.charColor || '#F2F0EA';
  const labelColor = config?.labelColor || '#8A8A8F';
  const accent = config?.accentColor || '#F0B44C';
  const fontFamily = config?.fontFamily || 'Inter';
  const titleSize = parseInt(config?.titleSize || '64', 10);
  const autoplay = bool(config?.autoplay, true);
  const intervalMs = parseFloat(config?.interval || '7') * 1000;
  const speed = { fast: 55, medium: 75, slow: 110 }[config?.flipSpeed || 'medium'] || 75;
  const maxSteps = { short: 6, medium: 14, full: 99 }[config?.cycleLength || 'medium'] || 14;
  const pauseOnHover = bool(config?.pauseOnHover, true);
  const soundOn = bool(config?.sound, false);
  const showHeader = bool(config?.showHeader, true);
  const showControls = bool(config?.showControls, true);

  const CHARSET = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789:.-/'&";
  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  const rootRef = React.useRef(null);
  const boardRef = React.useRef(null);
  const cellEls = React.useRef([]);
  const pageRef = React.useRef(0);
  const pausedRef = React.useRef(false);
  const progFirst = React.useRef(true);
  const engine = React.useRef(null);
  const audio = React.useRef(null);
  const [width, setWidth] = React.useState(1280);
  const [page, setPage] = React.useState(0);
  const [playing, setPlaying] = React.useState(autoplay);
  const [hovered, setHovered] = React.useState(false);
  React.useEffect(() => { setPlaying(autoplay); }, [autoplay]);

  React.useEffect(() => {
    const fams = { Inter: 'Inter:wght@300;400;500', 'Roboto Mono': 'Roboto+Mono:wght@400;500', 'IBM Plex Mono': 'IBM+Plex+Mono:wght@400;500' };
    const id = 'nc-font-sf-' + fontFamily.replace(/\s+/g, '-').toLowerCase();
    if (document.getElementById(id)) return;
    const list = ['Inter:wght@300;400;500', 'IBM+Plex+Mono:wght@400;500'];
    if (fams[fontFamily] && !list.includes(fams[fontFamily])) list.push(fams[fontFamily]);
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?${list.map((f) => 'family=' + f).join('&')}&display=swap`;
    document.head.appendChild(link);
  }, [fontFamily]);

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const measure = () => setWidth(root.clientWidth);
    measure();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (ro) ro.observe(root);
    return () => { if (ro) ro.disconnect(); };
  }, []);

  const compact = width < 720;
  const padX = compact ? 16 : 56;

  const entries = React.useMemo(() => String(depRaw).split(/\n|;;/).map((s) => s.trim()).filter(Boolean).map((line) => {
    const [time, dest, gate, status] = line.split('|').map((p) => (p || '').trim().toUpperCase());
    return { time: time || '', dest: dest || '', gate: gate || '', status: status || '' };
  }), [depRaw]);
  const headlines = React.useMemo(() => String(headRaw).split(/\n|;;/).map((s) => s.trim().toUpperCase()).filter(Boolean), [headRaw]);
  const headCols = compact ? Math.min(headColsCfg, 11) : headColsCfg;

  const lines = React.useMemo(() => {
    if (mode === 'headline') {
      return Array.from({ length: headRows }, (_, r) => ({ segs: [{ key: 'line', len: headCols, r }], gapAfter: 0 }));
    }
    const out = [];
    for (let r = 0; r < rowsPerPage; r++) {
      if (compact) {
        out.push({ segs: [{ key: 'time', len: 5, r }, { key: 'dest', len: 11, r }], gapAfter: 0 });
        out.push({ segs: [{ key: 'gate', len: 5, r }, { key: 'status', len: 11, r, accent: statusAccent }], gapAfter: r < rowsPerPage - 1 ? 1 : 0 });
      } else {
        out.push({ segs: [{ key: 'time', len: 5, r }, { key: 'dest', len: 14, r }, { key: 'gate', len: 3, r }, { key: 'status', len: 10, r, accent: statusAccent }], gapAfter: 0 });
      }
    }
    return out;
  }, [mode, headRows, headCols, rowsPerPage, compact, statusAccent]);

  const pages = React.useMemo(() => {
    if (mode === 'headline') return headlines.length ? headlines : [' '];
    const p = [];
    for (let k = 0; k < Math.max(1, entries.length); k += rowsPerPage) p.push(entries.slice(k, k + rowsPerPage));
    return p.length ? p : [[]];
  }, [mode, headlines, entries, rowsPerPage]);
  const pageCount = pages.length;

  const wrapHeadline = (text) => {
    const forced = text.split('/').map((s) => s.trim());
    const out = [];
    forced.forEach((chunk) => {
      let cur = '';
      chunk.split(/\s+/).filter(Boolean).forEach((w) => {
        const word = w.slice(0, headCols);
        if (!cur) cur = word;
        else if ((cur + ' ' + word).length <= headCols) cur += ' ' + word;
        else { out.push(cur); cur = word; }
      });
      out.push(cur);
    });
    const rows = out.slice(0, headRows);
    const top = Math.floor((headRows - rows.length) / 2);
    const res = Array.from({ length: headRows }, () => '');
    rows.forEach((r, k) => {
      const left = Math.floor((headCols - r.length) / 2);
      res[top + k] = ' '.repeat(left) + r;
    });
    return res;
  };

  const charsFor = React.useCallback((pi) => {
    const pg = pages[((pi % pageCount) + pageCount) % pageCount];
    const head = mode === 'headline' ? wrapHeadline(pg) : null;
    const out = [];
    lines.forEach((ln) => ln.segs.forEach((sg) => {
      let s = '';
      if (mode === 'headline') s = head[sg.r] || '';
      else {
        const e = pg[sg.r];
        s = e ? (e[sg.key] || '') : '';
      }
      s = s.slice(0, sg.len).padEnd(sg.len, ' ');
      for (let k = 0; k < sg.len; k++) out.push(s[k]);
    }));
    return out;
  }, [pages, pageCount, lines, mode]); // eslint-disable-line react-hooks/exhaustive-deps

  const layoutKey = `${mode}|${compact}|${lines.length}|${headCols}|${pageCount}|${depRaw}|${headRaw}`;
  const initialChars = React.useMemo(() => charsFor(pageRef.current), [layoutKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const cellMeta = React.useMemo(() => {
    const meta = [];
    lines.forEach((ln, li) => {
      let col = 0;
      ln.segs.forEach((sg, si) => {
        for (let k = 0; k < sg.len; k++) { meta.push({ li, col: col + k, si, accent: !!sg.accent }); }
        col += sg.len + 1;
      });
    });
    return meta;
  }, [lines]);

  const tick = () => {
    const a = audio.current;
    if (!a || !soundOn) return;
    const now = a.ctx.currentTime;
    if (now - a.last < 0.022) return;
    a.last = now;
    const src = a.ctx.createBufferSource();
    src.buffer = a.buf;
    const f = a.ctx.createBiquadFilter();
    f.type = 'bandpass';
    f.frequency.value = 1800 + Math.random() * 900;
    f.Q.value = 1.4;
    const g = a.ctx.createGain();
    g.gain.setValueAtTime(0.05, now);
    g.gain.exponentialRampToValueAtTime(0.0008, now + 0.03);
    src.connect(f); f.connect(g); g.connect(a.ctx.destination);
    src.start(now);
    src.stop(now + 0.035);
  };
  const ensureAudio = () => {
    if (!soundOn || audio.current) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    const ctx = new AC();
    const buf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.04), ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let k = 0; k < d.length; k++) d[k] = (Math.random() * 2 - 1) * Math.pow(1 - k / d.length, 3);
    audio.current = { ctx, buf, last: 0 };
  };
  React.useEffect(() => () => { if (audio.current) { audio.current.ctx.close(); audio.current = null; } }, []);
  const tickRef = React.useRef(tick);
  tickRef.current = tick;

  React.useEffect(() => {
    const els = cellEls.current.slice(0, cellMeta.length);
    const N = els.length;
    const L = CHARSET.length;
    const cur = initialChars.slice();
    const tgt = initialChars.slice();
    const nextAt = new Array(N).fill(0);
    const settleAt = new Array(N).fill(0);
    const anims = new Array(N).fill(null);
    let raf = 0;
    const parts = (el) => ({
      top: el.children[0].firstChild, bot: el.children[1].firstChild,
      ftEl: el.children[2], ft: el.children[2].firstChild, fbEl: el.children[3], fb: el.children[3].firstChild
    });
    const P = els.map((el) => (el ? parts(el) : null));
    const setAll = (c, ch) => { const p = P[c]; if (!p) return; p.top.textContent = ch; p.bot.textContent = ch; p.ft.textContent = ch; p.fb.textContent = ch; };
    const flip = (c, a, b) => {
      const p = P[c];
      if (!p) return;
      if (anims[c]) { anims[c].forEach((an) => an.cancel()); }
      p.top.textContent = b; p.bot.textContent = a; p.ft.textContent = a; p.fb.textContent = b;
      const half = speed * 0.5;
      anims[c] = [
        p.ftEl.animate([{ transform: 'rotateX(0deg)', filter: 'brightness(1)' }, { transform: 'rotateX(-90deg)', filter: 'brightness(0.45)' }], { duration: half, easing: 'cubic-bezier(.55,0,.9,.5)', fill: 'forwards' }),
        p.fbEl.animate([{ transform: 'rotateX(90deg)', filter: 'brightness(0.55)' }, { transform: 'rotateX(0deg)', filter: 'brightness(1)' }], { duration: half, delay: half, easing: 'cubic-bezier(.1,.5,.45,1)', fill: 'both' })
      ];
      tickRef.current();
    };
    const loop = (now) => {
      let busy = false;
      for (let c = 0; c < N; c++) {
        if (settleAt[c] && now >= settleAt[c]) { if (P[c]) P[c].bot.textContent = cur[c]; settleAt[c] = 0; }
        if (cur[c] !== tgt[c]) {
          busy = true;
          if (now >= nextAt[c]) {
            const ci = CHARSET.indexOf(cur[c]);
            const ti = CHARSET.indexOf(tgt[c]);
            let nx;
            if (ci < 0 || ti < 0) nx = tgt[c];
            else {
              const d = (ti - ci + L) % L;
              nx = CHARSET[(ci + (d > maxSteps ? d - maxSteps + 1 : 1)) % L];
            }
            flip(c, cur[c], nx);
            cur[c] = nx;
            nextAt[c] = now + speed;
            settleAt[c] = now + speed;
          }
        } else if (settleAt[c]) busy = true;
      }
      raf = busy ? requestAnimationFrame(loop) : 0;
    };
    const goTo = (pi) => {
      const chars = charsFor(pi);
      if (reduced) {
        for (let c = 0; c < N; c++) { cur[c] = chars[c]; tgt[c] = chars[c]; setAll(c, chars[c]); }
        return;
      }
      const now = performance.now();
      for (let c = 0; c < N; c++) {
        tgt[c] = chars[c];
        const m = cellMeta[c];
        nextAt[c] = Math.max(nextAt[c], now + m.li * 45 + m.col * 16 + Math.random() * 40);
      }
      if (!raf) raf = requestAnimationFrame(loop);
    };
    engine.current = { goTo };
    return () => {
      cancelAnimationFrame(raf);
      anims.forEach((a) => a && a.forEach((an) => an.cancel()));
      engine.current = null;
    };
  }, [layoutKey, cellMeta, initialChars, speed, maxSteps, reduced]); // eslint-disable-line react-hooks/exhaustive-deps

  const go = React.useCallback((delta) => {
    progFirst.current = false;
    const next = (((pageRef.current + delta) % pageCount) + pageCount) % pageCount;
    pageRef.current = next;
    setPage(next);
    if (engine.current) engine.current.goTo(next);
  }, [pageCount]);

  React.useEffect(() => {
    if (!playing || pageCount < 2 || (hovered && pauseOnHover)) return undefined;
    let t = 0;
    const schedule = (ms) => {
      t = setTimeout(() => {
        if (!pausedRef.current) go(1);
        schedule(intervalMs);
      }, ms);
    };
    schedule(pageRef.current === 0 && progFirst.current && !reduced ? 700 : intervalMs);
    return () => clearTimeout(t);
  }, [playing, intervalMs, pageCount, go, reduced, layoutKey, hovered, pauseOnHover]);

  // sizing
  const totalW = Math.max(200, width - padX * 2);
  const framePad = compact ? 10 : 22;
  const cellGap = compact ? 3 : 4;
  const segGap = compact ? 10 : 22;
  const widest = lines.reduce((m, ln) => Math.max(m, ln.segs.reduce((a, s) => a + s.len, 0) + 0 * ln.segs.length), 0);
  const widestSegs = lines.reduce((m, ln) => Math.max(m, ln.segs.length), 1);
  const avail = totalW - framePad * 2 - (widestSegs - 1) * segGap - (widest - widestSegs) * cellGap;
  const maxCell = mode === 'headline' ? (compact ? 34 : 68) : (compact ? 24 : 40);
  const cw = Math.max(10, Math.min(maxCell, Math.floor((avail / widest) * 2) / 2));
  const ch = Math.round(cw * (mode === 'headline' ? 1.34 : 1.5));
  const fontSize = Math.round(ch * 0.64);
  const flapFont = fontFamily === 'Helvetica Neue' ? '"Helvetica Neue", Helvetica, Arial, sans-serif'
    : fontFamily === 'Inter' ? '"Inter", -apple-system, "Helvetica Neue", sans-serif' : `"${fontFamily}", ui-monospace, monospace`;
  const mono = '"IBM Plex Mono", ui-monospace, "SF Mono", Menlo, monospace';
  const sans = '"Inter", -apple-system, "Helvetica Neue", sans-serif';
  const segW = (len) => len * cw + (len - 1) * cellGap;

  const halfStyle = (isTop) => ({
    position: 'absolute', left: 0, right: 0, top: isTop ? 0 : '50%', height: '50%', overflow: 'hidden',
    background: isTop ? `linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.015)), ${flapColor}` : `linear-gradient(180deg, rgba(0,0,0,0.12), rgba(0,0,0,0.02)), ${flapColor}`,
    borderRadius: isTop ? '3px 3px 0 0' : '0 0 3px 3px'
  });
  const innerStyle = (isTop) => ({ display: 'block', height: ch, lineHeight: `${ch}px`, marginTop: isTop ? 0 : -ch / 2, textAlign: 'center' });

  let ci = 0;
  const board = (
    <div key={layoutKey} ref={boardRef} role="img" aria-label={mode === 'headline' ? String(pages[page] || '').replace(/\//g, ' ') : `${title}: ${(pages[page] || []).map((e) => `${e.time} ${e.dest} gate ${e.gate} ${e.status}`).join('; ')}`}
      style={{ display: 'flex', flexDirection: 'column', width: compact ? 'auto' : '100%', boxSizing: 'border-box', gap: cellGap + (compact ? 1 : 2), padding: framePad, background: boardColor, borderRadius: 8,
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), inset 0 -2px 0 rgba(0,0,0,0.5), 0 40px 80px -40px rgba(0,0,0,0.8)' }}>
      {mode !== 'headline' && !compact && (
        <div aria-hidden="true" style={{ display: 'flex', gap: segGap, marginBottom: 6 }}>
          {lines[0].segs.map((sg, k) => (
            <div key={k} style={{ width: segW(sg.len), fontFamily: mono, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: labelColor }}>{colLabels[k] || ''}</div>
          ))}
        </div>
      )}
      {lines.map((ln, li) => (
        <div key={li} aria-hidden="true" style={{ display: 'flex', gap: segGap, marginBottom: ln.gapAfter ? (compact ? 10 : 14) : 0 }}>
          {ln.segs.map((sg, si) => (
            <div key={si} style={{ display: 'flex', gap: cellGap }}>
              {Array.from({ length: sg.len }).map((_, k) => {
                const idx = ci++;
                const chr = initialChars[idx] || ' ';
                const color = sg.accent ? accent : charColor;
                return (
                  <div key={k} ref={(el) => { cellEls.current[idx] = el; }}
                    style={{ position: 'relative', width: cw, height: ch, perspective: ch * 4, color, fontFamily: flapFont, fontWeight: 500, fontSize, boxShadow: '0 2px 2px rgba(0,0,0,0.45)', borderRadius: 3 }}>
                    <div style={halfStyle(true)}><span style={innerStyle(true)}>{chr}</span></div>
                    <div style={halfStyle(false)}><span style={innerStyle(false)}>{chr}</span></div>
                    <div style={{ ...halfStyle(true), transformOrigin: '50% 100%', backfaceVisibility: 'hidden', zIndex: 2 }}><span style={innerStyle(true)}>{chr}</span></div>
                    <div style={{ ...halfStyle(false), transformOrigin: '50% 0%', backfaceVisibility: 'hidden', zIndex: 2 }}><span style={innerStyle(false)}>{chr}</span></div>
                    <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: 1, marginTop: -0.5, background: 'rgba(0,0,0,0.75)', zIndex: 3, boxShadow: '0 1px 0 rgba(255,255,255,0.04)' }} />
                    <div style={{ position: 'absolute', left: -1, top: '50%', width: 2, height: Math.max(3, ch * 0.08), marginTop: -Math.max(3, ch * 0.08) / 2, background: '#000', zIndex: 3, borderRadius: 1 }} />
                    <div style={{ position: 'absolute', right: -1, top: '50%', width: 2, height: Math.max(3, ch * 0.08), marginTop: -Math.max(3, ch * 0.08) / 2, background: '#000', zIndex: 3, borderRadius: 1 }} />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  const css = `
    .sf-btn{appearance:none;-webkit-appearance:none;background:transparent;border:1px solid rgba(255,255,255,0.14);color:${charColor};width:40px;height:40px;border-radius:50%;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;padding:0;margin:0;transition:border-color 200ms, background 200ms}
    .sf-btn:hover{border-color:${accent}}
    .sf-btn:focus-visible{outline:2px solid ${accent};outline-offset:2px}
    @keyframes sf-prog{from{transform:scaleX(0)}to{transform:scaleX(1)}}
    @media (prefers-reduced-motion: reduce){.split-flap [style*="sf-prog"]{animation:none!important}}
  `;

  const controls = showControls && (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <span aria-live="polite" style={{ fontFamily: mono, fontSize: 12, letterSpacing: '0.14em', color: labelColor, marginRight: 8, fontVariantNumeric: 'tabular-nums' }}>
        <span style={{ color: charColor }}>{String(page + 1).padStart(2, '0')}</span> / {String(pageCount).padStart(2, '0')}
        {hovered && playing && pauseOnHover && pageCount > 1 && <span style={{ marginLeft: 10, color: accent }}>Paused</span>}
      </span>
      <button type="button" className="sf-btn" aria-label="Previous board" onClick={() => { ensureAudio(); go(-1); }}>
        <svg width="12" height="12" viewBox="0 0 12 12"><path d="M8 1 L3 6 L8 11" fill="none" stroke="currentColor" strokeWidth="1.3" /></svg>
      </button>
      <button type="button" className="sf-btn" aria-label={playing ? 'Pause board' : 'Play board'} aria-pressed={!playing} onClick={() => { ensureAudio(); setPlaying((p) => !p); }}>
        {playing
          ? <svg width="12" height="12" viewBox="0 0 12 12"><path d="M3.5 1.5 V10.5 M8.5 1.5 V10.5" stroke="currentColor" strokeWidth="1.4" /></svg>
          : <svg width="12" height="12" viewBox="0 0 12 12"><path d="M3 1.5 L10 6 L3 10.5 Z" fill="currentColor" /></svg>}
      </button>
      <button type="button" className="sf-btn" aria-label="Next board" onClick={() => { ensureAudio(); go(1); }}>
        <svg width="12" height="12" viewBox="0 0 12 12"><path d="M4 1 L9 6 L4 11" fill="none" stroke="currentColor" strokeWidth="1.3" /></svg>
      </button>
    </div>
  );

  return (
    <section ref={rootRef} className="split-flap"
      onMouseEnter={() => { if (pauseOnHover) { pausedRef.current = true; setHovered(true); } }}
      onMouseLeave={() => { pausedRef.current = false; setHovered(false); }}
      onPointerDown={ensureAudio}
      style={{ background: bg, color: charColor, fontFamily: sans, padding: compact ? '44px 16px 52px' : '72px 56px 80px', width: '100%', boxSizing: 'border-box', overflow: 'hidden' }}>
      <style>{css}</style>
      {(showHeader || showControls) && (
        <div style={{ display: 'flex', flexDirection: compact ? 'column' : 'row', justifyContent: 'space-between', alignItems: compact ? 'flex-start' : 'flex-end', gap: 20, marginBottom: compact ? 24 : 36 }}>
          {showHeader ? (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: mono, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: labelColor, marginBottom: 14 }}>
                <span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: '50%', background: accent }} />{eyebrow}
              </div>
              <h2 style={{ margin: 0, fontWeight: 300, fontSize: compact ? Math.round(titleSize * 0.66) : titleSize, lineHeight: 1, letterSpacing: '-0.03em', color: charColor }}>{title}</h2>
            </div>
          ) : <div />}
          {controls}
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: compact ? 'center' : 'flex-start' }}>{board}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: compact ? 18 : 24, fontFamily: mono, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: labelColor }}>
        <span style={{ flex: compact ? 1 : '0 0 auto' }}>{footerNote}</span>
        {!compact && <span aria-hidden="true" style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />}
        {playing && pageCount > 1 && (
          <span aria-hidden="true" style={{ position: 'relative', width: compact ? 56 : 120, height: 2, background: 'rgba(255,255,255,0.1)', overflow: 'hidden', borderRadius: 1 }}>
            <span key={`${page}-${hovered}`} style={{ position: 'absolute', inset: 0, background: accent, transformOrigin: '0 50%', animation: hovered && pauseOnHover ? 'none' : `sf-prog ${page === 0 && progFirst.current ? 700 : intervalMs}ms linear forwards`, transform: 'scaleX(0)' }} />
          </span>
        )}
      </div>
    </section>
  );
}

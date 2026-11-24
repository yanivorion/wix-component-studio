const MANIFEST = {
  "type": "Gallery.MuseumWall",
  "description": "A draggable museum wall: framed, matted works hung on a common eye-line with placards; a soft spotlight follows the pointer and frame shadows shift with the light; drag with inertia, click a work to zoom the camera in with a caption panel",
  "editorElement": {
    "selector": ".museum-wall",
    "displayName": "Museum Wall",
    "archetype": "container",
    "data": {
      "exhibitionTitle": { "dataType": "text", "displayName": "Exhibition Title", "defaultValue": "Quiet Ground", "group": "Content" },
      "exhibitionSubtitle": { "dataType": "text", "displayName": "Exhibition Subtitle", "defaultValue": "Landscape photographs, 1972 — 2024", "group": "Content" },
      "wallText": { "dataType": "text", "displayName": "Wall Text", "defaultValue": "Six photographers return to the same question: how little does a place need to say to be remembered?", "group": "Content" },
      "artists": { "dataType": "text", "displayName": "Artists (comma separated)", "defaultValue": "Ingrid Solberg,Marcus Hale,Elena Brandt,Tomas Reyes,Aiko Mori,Jonah Wells", "group": "Works" },
      "titles": { "dataType": "text", "displayName": "Titles (comma separated)", "defaultValue": "Lysefjord I,Mesa at Seven,The Long Road,High Camp,Falls Study,Valley Light", "group": "Works" },
      "years": { "dataType": "text", "displayName": "Years (comma separated)", "defaultValue": "1998,2011,1983,2019,2006,2024", "group": "Works" },
      "media": { "dataType": "text", "displayName": "Media (comma separated)", "defaultValue": "Gelatin silver print,Chromogenic print,Platinum print,Archival pigment print,Gelatin silver print,Dye transfer print", "group": "Works" },
      "descriptions": { "dataType": "text", "displayName": "Descriptions (separate with |)", "defaultValue": "Made at first light from the Preikestolen ledge, the fjord reduced to a single cut of water.|A desert mesa held for one long exposure as the sun crossed the horizon.|A road climbing the Quiraing, printed in platinum for its long, soft tonal scale.|Base camp at 4900 m, the tents the only warm note in a field of snow.|A cascade in the Columbia Gorge, slowed until the water reads as cloth.|Granite walls and a still river, photographed in the last ten minutes of light.", "group": "Works" },
      "images": { "dataType": "text", "displayName": "Image URLs (comma separated)", "defaultValue": "https://picsum.photos/id/1015/900/1100,https://picsum.photos/id/1016/1200/820,https://picsum.photos/id/1018/700/900,https://picsum.photos/id/1036/1000/1250,https://picsum.photos/id/1039/1300/860,https://picsum.photos/id/1043/800/800", "group": "Works" },
      "artworkSource": { "dataType": "select", "displayName": "Artwork Source", "defaultValue": "images", "options": ["images", "abstract"], "group": "Works" },
      "imageTreatment": { "dataType": "select", "displayName": "Image Treatment", "defaultValue": "color", "options": ["color", "grayscale", "warm"], "group": "Works" },
      "frameStyle": { "dataType": "select", "displayName": "Frame Style", "defaultValue": "black", "options": ["black", "oak", "white", "gilt"], "group": "Frames" },
      "matSize": { "dataType": "select", "displayName": "Mat Size", "defaultValue": "standard", "options": ["none", "slim", "standard", "wide"], "group": "Frames" },
      "matColor": { "dataType": "color", "displayName": "Mat Colour", "defaultValue": "#FBFAF7", "group": "Frames" },
      "workScale": { "dataType": "select", "displayName": "Work Scale", "defaultValue": "1", "options": ["0.85", "1", "1.15"], "group": "Frames" },
      "wallColor": { "dataType": "color", "displayName": "Wall Colour", "defaultValue": "#E9E6E1", "group": "Colors" },
      "floorColor": { "dataType": "color", "displayName": "Floor Colour", "defaultValue": "#B7AFA4", "group": "Colors" },
      "placardColor": { "dataType": "color", "displayName": "Placard Colour", "defaultValue": "#FAFAF9", "group": "Colors" },
      "inkColor": { "dataType": "color", "displayName": "Ink", "defaultValue": "#1C1917", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#78716C", "group": "Colors" },
      "wallTexture": { "dataType": "booleanValue", "displayName": "Plaster Texture", "defaultValue": "true", "group": "Colors" },
      "spotlight": { "dataType": "booleanValue", "displayName": "Spotlight", "defaultValue": "true", "group": "Light" },
      "spotlightSize": { "dataType": "select", "displayName": "Spotlight Size", "defaultValue": "medium", "options": ["small", "medium", "large"], "group": "Light" },
      "dimAmount": { "dataType": "select", "displayName": "Wall Dimming", "defaultValue": "0.42", "options": ["0.2", "0.42", "0.6"], "group": "Light" },
      "zoomOnClick": { "dataType": "booleanValue", "displayName": "Zoom On Click", "defaultValue": "true", "group": "Interaction" },
      "zoomLevel": { "dataType": "select", "displayName": "Max Zoom", "defaultValue": "2.2", "options": ["1.6", "2.2", "3"], "group": "Interaction" },
      "inertia": { "dataType": "select", "displayName": "Drag Inertia", "defaultValue": "medium", "options": ["low", "medium", "high"], "group": "Interaction" },
      "height": { "dataType": "select", "displayName": "Height", "defaultValue": "screen", "options": ["screen", "600", "720", "840"], "group": "Layout" },
      "fontFamily": { "dataType": "select", "displayName": "Font", "defaultValue": "Inter", "options": ["Inter", "Fraunces", "Instrument Serif", "system-ui"], "group": "Typography" },
      "titleWeight": { "dataType": "select", "displayName": "Title Weight", "defaultValue": "300", "options": ["300", "400", "500"], "group": "Typography" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const split = (s, sep = ',') => String(s || '').split(sep).map((x) => x.trim()).filter(Boolean);
  const exTitle = config?.exhibitionTitle || 'Quiet Ground';
  const exSub = config?.exhibitionSubtitle || 'Landscape photographs, 1972 — 2024';
  const wallText = config?.wallText || 'Six photographers return to the same question: how little does a place need to say to be remembered?';
  const artists = split(config?.artists || 'Ingrid Solberg,Marcus Hale,Elena Brandt,Tomas Reyes,Aiko Mori,Jonah Wells');
  const titles = split(config?.titles || 'Lysefjord I,Mesa at Seven,The Long Road,High Camp,Falls Study,Valley Light');
  const years = split(config?.years || '1998,2011,1983,2019,2006,2024');
  const media = split(config?.media || 'Gelatin silver print,Chromogenic print,Platinum print,Archival pigment print,Gelatin silver print,Dye transfer print');
  const descriptions = split(config?.descriptions || 'Made at first light from the Preikestolen ledge, the fjord reduced to a single cut of water.|A desert mesa held for one long exposure as the sun crossed the horizon.|A road climbing the Quiraing, printed in platinum for its long, soft tonal scale.|Base camp at 4900 m, the tents the only warm note in a field of snow.|A cascade in the Columbia Gorge, slowed until the water reads as cloth.|Granite walls and a still river, photographed in the last ten minutes of light.', '|');
  const images = split(config?.images || 'https://picsum.photos/id/1015/900/1100,https://picsum.photos/id/1016/1200/820,https://picsum.photos/id/1018/700/900,https://picsum.photos/id/1036/1000/1250,https://picsum.photos/id/1039/1300/860,https://picsum.photos/id/1043/800/800');
  const source = config?.artworkSource || 'images';
  const treatment = config?.imageTreatment || 'color';
  const frameStyle = config?.frameStyle || 'black';
  const matSize = config?.matSize || 'standard';
  const matColor = config?.matColor || '#FBFAF7';
  const workScale = parseFloat(config?.workScale || '1') || 1;
  const wall = config?.wallColor || '#E9E6E1';
  const floor = config?.floorColor || '#B7AFA4';
  const placard = config?.placardColor || '#FAFAF9';
  const ink = config?.inkColor || '#1C1917';
  const muted = config?.mutedColor || '#78716C';
  const texture = bool(config?.wallTexture, true);
  const spotOn = bool(config?.spotlight, true);
  const spotSize = { small: 0.7, medium: 1, large: 1.35 }[config?.spotlightSize || 'medium'] || 1;
  const dim = parseFloat(config?.dimAmount || '0.42') || 0.42;
  const zoomOnClick = bool(config?.zoomOnClick, true);
  const maxZoom = parseFloat(config?.zoomLevel || '2.2') || 2.2;
  const friction = { low: 0.88, medium: 0.935, high: 0.962 }[config?.inertia || 'medium'] || 0.935;
  const heightMode = config?.height || 'screen';
  const fontFamily = config?.fontFamily || 'Inter';
  const titleWeight = config?.titleWeight || '300';

  const count = source === 'abstract' ? Math.max(6, titles.length) : images.length;
  const uid = React.useMemo(() => 'mw' + Math.random().toString(36).slice(2, 9), []);
  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  const rootRef = React.useRef(null);
  const viewRef = React.useRef(null);
  const trackRef = React.useRef(null);
  const lightRef = React.useRef(null);
  const frameRefs = React.useRef([]);
  const pos = React.useRef(0);
  const vel = React.useRef(0);
  const raf = React.useRef(0);
  const drag = React.useRef(null);
  const moved = React.useRef(false);
  const light = React.useRef({ x: -1, y: -1, active: false });
  const [width, setWidth] = React.useState(1280);
  const [stageH, setStageH] = React.useState(760);
  const [zoom, setZoom] = React.useState(null);
  const [entered, setEntered] = React.useState(reduced);
  const [cameraPos, setCameraPos] = React.useState(0);

  React.useEffect(() => {
    const fams = { 'Inter': 'Inter:wght@300;400;500', 'Fraunces': 'Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;1,9..144,300', 'Instrument Serif': 'Instrument+Serif:ital@0;1' };
    [fams[fontFamily], 'Fraunces:ital,opsz,wght@1,9..144,300', 'IBM+Plex+Mono:wght@400'].filter(Boolean).forEach((f) => {
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
    const t = setTimeout(() => setEntered(true), 40);
    return () => { if (ro) ro.disconnect(); window.removeEventListener('resize', measure); clearTimeout(t); };
  }, []);

  const compact = width < 760;
  const H = heightMode === 'screen' ? Math.max(compact ? 600 : 560, Math.min(stageH, 980)) : parseInt(heightMode, 10) || 720;
  const k = (H / 800) * workScale * (compact ? 0.82 : 1);
  const eye = H * (compact ? 0.62 : 0.46);
  const floorH = Math.round(H * 0.11);

  const templates = [[300, 380], [460, 320], [230, 300], [330, 420], [500, 340], [300, 300]];
  const ftBase = { black: 12, oak: 18, white: 12, gilt: 24 }[frameStyle] || 12;
  const matRatio = { none: 0, slim: 0.07, standard: 0.13, wide: 0.19 }[matSize] ?? 0.13;

  const layout = React.useMemo(() => {
    const pad = compact ? 28 : 72;
    const introW = (compact ? 250 : 400) * Math.max(0.9, k);
    let x = compact ? pad : pad + introW + 72 * k;
    const placW = Math.max(118, 150 * k);
    const items = [];
    for (let i = 0; i < count; i++) {
      const t = templates[i % templates.length];
      const fw = t[0] * k; const fh = t[1] * k;
      items.push({ x, y: eye - fh / 2, w: fw, h: fh, placX: x + fw + 26 * k, placW });
      x += fw + 26 * k + placW + (compact ? 70 : 110) * k;
    }
    return { items, total: x + pad - (compact ? 70 : 110) * k + 40, introW, pad };
  }, [count, k, eye, compact]); // eslint-disable-line react-hooks/exhaustive-deps

  const maxScroll = Math.max(0, layout.total - width);
  const maxRef = React.useRef(maxScroll);
  maxRef.current = maxScroll;

  const applyLight = React.useCallback(() => {
    const view = viewRef.current;
    if (!view) return;
    const vw = view.clientWidth; const vh = view.clientHeight;
    const L = light.current;
    const first = layout.items[0];
    const lx = L.x < 0 ? (first ? Math.min(vw * 0.62, first.x + first.w / 2 - pos.current) : vw * 0.5) : L.x;
    const ly = L.y < 0 ? eye * 0.94 : L.y;
    if (lightRef.current) {
      const r = Math.max(vw, vh) * 0.36 * spotSize;
      lightRef.current.style.background = `radial-gradient(circle ${r * 1.6}px at ${lx}px ${ly}px, rgba(255,250,240,0.10) 0%, rgba(255,250,240,0.04) ${r * 0.35}px, rgba(14,12,10,0) ${r * 0.55}px, rgba(14,12,10,${dim}) ${r * 1.6}px)`;
    }
    const lwx = lx + pos.current;
    layout.items.forEach((it, i) => {
      const el = frameRefs.current[i];
      if (!el) return;
      const dx = it.x + it.w / 2 - lwx;
      const dy = eye - ly;
      const d = Math.min(1, Math.hypot(dx, dy) / (vw * 0.8));
      const sx = Math.max(-26, Math.min(26, dx * 0.035)) * k;
      const sy = (12 + Math.max(-6, Math.min(10, dy * 0.03)) + d * 6) * k;
      const blur = (18 + d * 22) * k;
      el.style.boxShadow = `${sx.toFixed(1)}px ${sy.toFixed(1)}px ${blur.toFixed(1)}px rgba(20,14,8,${(0.34 - d * 0.12).toFixed(3)}), ${(sx * 0.25).toFixed(1)}px ${(3 * k).toFixed(1)}px ${(5 * k).toFixed(1)}px rgba(20,14,8,0.22)`;
    });
  }, [layout, eye, k, spotSize, dim, compact]);

  const write = React.useCallback(() => {
    if (trackRef.current) trackRef.current.style.transform = `translate3d(${-pos.current}px,0,0)`;
    applyLight();
  }, [applyLight]);

  const loop = React.useCallback(() => {
    const max = maxRef.current;
    if (!drag.current) {
      pos.current += vel.current;
      vel.current *= friction;
      if (pos.current < 0) { pos.current += (0 - pos.current) * 0.18; vel.current *= 0.6; }
      if (pos.current > max) { pos.current += (max - pos.current) * 0.18; vel.current *= 0.6; }
    }
    write();
    const settled = !drag.current && Math.abs(vel.current) < 0.05 && pos.current >= -0.5 && pos.current <= max + 0.5;
    if (settled) { pos.current = Math.max(0, Math.min(max, pos.current)); write(); raf.current = 0; return; }
    raf.current = requestAnimationFrame(loop);
  }, [friction, write]);
  const kick = React.useCallback(() => { if (!raf.current) raf.current = requestAnimationFrame(loop); }, [loop]);

  React.useEffect(() => { pos.current = Math.min(pos.current, maxScroll); write(); }, [write, maxScroll]);
  React.useEffect(() => () => cancelAnimationFrame(raf.current), []);

  React.useEffect(() => {
    const view = viewRef.current;
    if (!view) return undefined;
    const onWheel = (e) => {
      if (zoom !== null) return;
      const dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : (e.shiftKey ? e.deltaY : 0);
      if (!dx) return;
      e.preventDefault();
      pos.current = Math.max(-40, Math.min(maxRef.current + 40, pos.current + dx));
      vel.current = 0;
      kick();
    };
    view.addEventListener('wheel', onWheel, { passive: false });
    return () => view.removeEventListener('wheel', onWheel);
  }, [kick, zoom]);

  const localXY = (e) => {
    const r = viewRef.current.getBoundingClientRect();
    const sx = r.width / (viewRef.current.offsetWidth || r.width);
    const sy = r.height / (viewRef.current.offsetHeight || r.height);
    return { x: (e.clientX - r.left) / sx, y: (e.clientY - r.top) / sy };
  };

  const onPointerMove = (e) => {
    if (!viewRef.current) return;
    const p = localXY(e);
    light.current = { x: p.x, y: p.y, active: true };
    const d = drag.current;
    if (d) {
      const dx = p.x - d.x;
      if (Math.abs(dx) > 5) moved.current = true;
      const now = performance.now();
      const np = d.pos - dx;
      const dt = Math.max(1, now - d.t);
      d.v = d.v * 0.6 + ((np - pos.current) / dt) * 16 * 0.4;
      d.t = now;
      const max = maxRef.current;
      pos.current = np < 0 ? np * 0.35 : np > max ? max + (np - max) * 0.35 : np;
      kick();
    } else if (!raf.current) {
      applyLight();
    }
  };
  const onPointerDown = (e) => {
    if (zoom !== null || e.button > 0) return;
    const p = localXY(e);
    moved.current = false;
    vel.current = 0;
    drag.current = { x: p.x, pos: pos.current, t: performance.now(), v: 0 };
    const up = () => {
      window.removeEventListener('pointermove', onWin);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
      if (drag.current) vel.current = drag.current.v;
      drag.current = null;
      kick();
    };
    const onWin = (ev) => { if (!viewRef.current?.contains(ev.target)) onPointerMove(ev); };
    window.addEventListener('pointermove', onWin);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
  };
  const onPointerLeave = () => {
    light.current = { x: -1, y: -1, active: false };
    if (!raf.current) applyLight();
  };

  const scrollToWork = (i) => {
    const it = layout.items[i];
    if (!it) return;
    const target = Math.max(0, Math.min(maxRef.current, it.x + it.w / 2 - width / 2));
    vel.current = (target - pos.current) * (1 - friction);
    kick();
  };
  const openWork = (i) => {
    if (!zoomOnClick) { scrollToWork(i); return; }
    setCameraPos(pos.current);
    setZoom(i);
  };
  const onKey = (e) => {
    if (zoom !== null) {
      if (e.key === 'Escape') { e.preventDefault(); setZoom(null); }
      else if (e.key === 'ArrowRight' && zoom < count - 1) { e.preventDefault(); setZoom(zoom + 1); }
      else if (e.key === 'ArrowLeft' && zoom > 0) { e.preventDefault(); setZoom(zoom - 1); }
      return;
    }
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      if (e.target !== e.currentTarget) return;
      e.preventDefault();
      vel.current += (e.key === 'ArrowRight' ? 1 : -1) * 22;
      kick();
    }
  };

  const panelW = compact ? 0 : Math.min(380, width * 0.32);
  let camera = 'translate(0px, 0px) scale(1)';
  if (zoom !== null && layout.items[zoom]) {
    const it = layout.items[zoom];
    const cx = it.x + it.w / 2 - cameraPos;
    const cy = eye;
    const availW = width - panelW;
    const availH = compact ? H * 0.5 : H;
    const s = Math.max(1.05, Math.min(maxZoom, (availH * 0.74) / it.h, (availW * 0.72) / it.w));
    const tx = availW / 2 - s * cx;
    const ty = (compact ? H * 0.28 : H / 2) - s * cy;
    camera = `translate(${tx.toFixed(1)}px, ${ty.toFixed(1)}px) scale(${s.toFixed(3)})`;
  }


  const display = fontFamily === 'Inter' || fontFamily === 'system-ui'
    ? '"Inter", -apple-system, "Helvetica Neue", Arial, sans-serif'
    : `"${fontFamily}", "Iowan Old Style", Georgia, serif`;
  const sans = '"Inter", -apple-system, "Helvetica Neue", Arial, sans-serif';
  const serifItalic = '"Fraunces", "Iowan Old Style", Georgia, serif';
  const mono = '"IBM Plex Mono", ui-monospace, "SF Mono", Menlo, monospace';
  const imgFilter = treatment === 'grayscale' ? 'grayscale(1) contrast(1.06)' : treatment === 'warm' ? 'sepia(0.28) saturate(0.85) contrast(1.02)' : 'none';

  const frameSkin = (ft) => {
    if (frameStyle === 'oak') return {
      background: 'linear-gradient(135deg, #C49A6C 0%, #A57A4E 45%, #B88D5F 70%, #94693F 100%)',
      boxShadow: `inset 0 0 0 1px rgba(60,35,15,.35), inset ${ft * 0.18}px ${ft * 0.18}px 0 rgba(255,235,205,.22), inset -${ft * 0.18}px -${ft * 0.18}px 0 rgba(60,35,15,.25)`
    };
    if (frameStyle === 'white') return {
      background: 'linear-gradient(135deg, #FFFFFF 0%, #F1F0EC 60%, #E4E2DC 100%)',
      boxShadow: `inset 0 0 0 1px rgba(0,0,0,.06), inset -${ft * 0.2}px -${ft * 0.2}px 0 rgba(0,0,0,.05)`
    };
    if (frameStyle === 'gilt') return {
      background: 'linear-gradient(160deg, #DCC07A 0%, #B9944A 30%, #E4CB88 52%, #A8843C 76%, #C9A65E 100%)',
      boxShadow: `inset 0 0 0 1px rgba(80,55,10,.5), inset ${ft * 0.3}px ${ft * 0.3}px 0 rgba(255,245,210,.25), inset -${ft * 0.3}px -${ft * 0.3}px 0 rgba(90,60,10,.35), inset 0 0 0 ${ft * 0.62}px rgba(0,0,0,0), inset 0 0 0 ${ft * 0.66}px rgba(110,80,20,.35)`
    };
    return {
      background: 'linear-gradient(135deg, #2A2A2A 0%, #121212 55%, #1C1C1C 100%)',
      boxShadow: `inset 0 0 0 1px rgba(0,0,0,.6), inset ${ft * 0.16}px ${ft * 0.16}px 0 rgba(255,255,255,.07)`
    };
  };

  const Abstract = ({ i, w, h }) => {
    const v = i % 4;
    const pal = [['#C9C2B6', '#9A8F80', '#4A4339', '#B4532A'], ['#E4DED3', '#2B3A4A', '#C9A227', '#7C2D12'], ['#1F2933', '#E5E0D8', '#B4532A', '#A8A29E'], ['#D6CFC4', '#8C6A4A', '#2F2A24', '#5B6B5A']][i % 4];
    if (v === 0) {
      return (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" width="100%" height="100%" aria-hidden="true">
          <rect width="100" height="100" fill={pal[0]} />
          <rect x="12" y="16" width="76" height="76" fill={pal[1]} />
          <rect x="24" y="34" width="52" height="52" fill={pal[3]} />
          <rect x="36" y="52" width="28" height="28" fill={pal[2]} />
        </svg>
      );
    }
    if (v === 1) {
      return (
        <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" width="100%" height="100%" aria-hidden="true">
          <rect width={w} height={h} fill={pal[0]} />
          {Array.from({ length: 28 }).map((_, r) => (
            <line key={r} x1={w * 0.08} x2={w * 0.92} y1={h * 0.08 + (r * h * 0.84) / 27} y2={h * 0.08 + (r * h * 0.84) / 27} stroke={pal[1]} strokeWidth="0.6" opacity={0.35 + (r % 3) * 0.12} />
          ))}
        </svg>
      );
    }
    if (v === 2) {
      return (
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" aria-hidden="true">
          <rect width="100" height="100" fill={pal[1]} />
          <circle cx="62" cy="40" r="22" fill={pal[2]} />
          <rect x="18" y="58" width="44" height="10" fill={pal[0]} />
          <line x1="14" y1="82" x2="86" y2="82" stroke={pal[0]} strokeWidth="1" />
          <rect x="70" y="66" width="6" height="22" fill={pal[3]} />
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" width="100%" height="100%" aria-hidden="true">
        <defs><filter id={`${uid}-soft${i}`}><feGaussianBlur stdDeviation="1.6" /></filter></defs>
        <rect width="100" height="100" fill={pal[2]} />
        <rect x="9" y="8" width="82" height="46" rx="2" fill={pal[1]} filter={`url(#${uid}-soft${i})`} opacity="0.92" />
        <rect x="9" y="60" width="82" height="31" rx="2" fill={pal[3]} filter={`url(#${uid}-soft${i})`} opacity="0.9" />
      </svg>
    );
  };

  const work = (i) => ({
    artist: artists[i] || artists[i % Math.max(1, artists.length)] || 'Unknown artist',
    title: titles[i] || `Untitled ${i + 1}`,
    year: years[i] || '',
    medium: media[i] || '',
    description: descriptions[i] || '',
    src: images[i % Math.max(1, images.length)]
  });

  const btnReset = { appearance: 'none', border: 'none', background: 'transparent', padding: 0, margin: 0, font: 'inherit', color: 'inherit', cursor: 'pointer' };
  const z = zoom !== null ? work(zoom) : null;
  const p = uid;

  if (!count) {
    return (
      <section className="museum-wall" style={{ width: '100%', height: 480, background: wall, color: muted, display: 'grid', placeItems: 'center', fontFamily: mono, fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
        Add image URLs to hang the wall
      </section>
    );
  }

  return (
    <section ref={rootRef} className={`museum-wall ${p}`} aria-label={`${exTitle} — exhibition wall`}
      style={{ position: 'relative', width: '100%', height: H, overflow: 'hidden', background: wall, color: ink, fontFamily: sans, userSelect: 'none' }}>
      <style>{`
        .${p} .${p}-work:focus-visible { outline: 2px solid ${ink}; outline-offset: 10px; }
        .${p} .${p}-view:focus-visible { box-shadow: inset 0 0 0 2px ${ink}; }
        .${p} button:focus-visible { outline: 2px solid ${ink}; outline-offset: 3px; }
        .${p} .${p}-work { transition: transform .5s cubic-bezier(.22,1,.36,1); }
        .${p} .${p}-work:hover { transform: translateY(-3px); }
        @media (prefers-reduced-motion: reduce) { .${p} * { transition: none !important; animation: none !important; } }
      `}</style>

      {texture && (
        <svg aria-hidden="true" width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.5, mixBlendMode: 'multiply', pointerEvents: 'none' }}>
          <filter id={`${uid}-plaster`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" />
            <feColorMatrix values="0 0 0 0 0.45  0 0 0 0 0.42  0 0 0 0 0.38  0 0 0 0.09 0" />
          </filter>
          <rect width="100%" height="100%" filter={`url(#${uid}-plaster)`} />
        </svg>
      )}

      <div aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: floorH, background: floor }}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: Math.max(6, floorH * 0.09), background: `linear-gradient(180deg, ${wall}, rgba(0,0,0,0.06))`, borderBottom: '1px solid rgba(0,0,0,0.12)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.10), rgba(0,0,0,0) 60%)' }} />
      </div>

      <div
        ref={viewRef}
        className={`${p}-view`}
        tabIndex={0}
        role="group"
        aria-roledescription="draggable gallery wall"
        aria-label="Exhibition wall. Drag or use arrow keys to walk along it; press Enter on a work to view it closer."
        onKeyDown={onKey}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        style={{ position: 'absolute', inset: 0, cursor: zoom !== null ? 'zoom-out' : drag.current ? 'grabbing' : 'grab', touchAction: 'pan-y', outline: 'none' }}
        onClick={(e) => { if (zoom !== null && e.target === e.currentTarget) setZoom(null); }}
      >
        <div style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', transformOrigin: '0 0', transform: camera, transition: reduced ? 'none' : 'transform 1.1s cubic-bezier(.65,0,.2,1)', pointerEvents: 'none' }}>
          <div ref={trackRef} style={{ position: 'absolute', left: 0, top: 0, width: layout.total, height: '100%' }}>
            <div style={{
              position: 'absolute', left: layout.pad, top: compact ? H * 0.06 : eye - 170 * k, width: compact ? width - layout.pad * 2 : layout.introW,
              opacity: entered ? 1 : 0, transform: entered ? 'none' : 'translateY(14px)', transition: reduced ? 'none' : 'opacity .9s ease, transform .9s cubic-bezier(.22,1,.36,1)'
            }}>
              <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: muted, marginBottom: compact ? 12 : 18 }}>Gallery 04</div>
              <h2 style={{ margin: 0, fontFamily: display, fontWeight: titleWeight, fontSize: Math.round((compact ? 46 : 76) * Math.max(0.85, Math.min(1.15, k))), lineHeight: 0.96, letterSpacing: fontFamily === 'Inter' || fontFamily === 'system-ui' ? '-0.045em' : '-0.02em', color: ink }}>{exTitle}</h2>
              <div style={{ marginTop: compact ? 10 : 16, fontFamily: serifItalic, fontStyle: 'italic', fontWeight: 300, fontSize: compact ? 17 : 21, lineHeight: 1.3, color: ink }}>{exSub}</div>
              <p style={{ margin: compact ? '12px 0 0' : '22px 0 0', fontSize: compact ? 13 : 15, lineHeight: 1.6, color: muted, maxWidth: 320 }}>{wallText}</p>
              <div style={{ marginTop: compact ? 14 : 26, display: 'flex', alignItems: 'center', gap: 10, fontFamily: mono, fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: muted }}>
                <span style={{ display: 'inline-block', width: 36, height: 1, background: muted }} /> Drag to walk the wall
              </div>
            </div>

            {layout.items.map((it, i) => {
              const w = work(i);
              const ft = ftBase * k;
              const mat = Math.min(it.w, it.h) * matRatio;
              return (
                <React.Fragment key={i}>
                  <button
                    ref={(el) => { frameRefs.current[i] = el; }}
                    className={`${p}-work`}
                    data-work={i}
                    aria-label={`${w.title} by ${w.artist}${w.year ? ', ' + w.year : ''}. Open detail`}
                    onClick={(e) => { e.stopPropagation(); if (moved.current) return; if (zoom === i) setZoom(null); else openWork(i); }}
                    style={{
                      ...btnReset, position: 'absolute', left: it.x, top: it.y, width: it.w, height: it.h, padding: ft, boxSizing: 'border-box',
                      pointerEvents: 'auto', cursor: zoom === i ? 'zoom-out' : 'zoom-in',
                      opacity: entered ? 1 : 0,
                      transitionProperty: 'opacity, transform', transitionDuration: reduced ? '0s' : '.9s, .5s',
                      transitionDelay: reduced ? '0s' : `${120 + i * 90}ms, 0ms`,
                      ...frameSkin(ft)
                    }}
                  >
                    <span style={{ display: 'block', width: '100%', height: '100%', padding: mat, boxSizing: 'border-box', background: matColor, boxShadow: `inset 0 ${ft * 0.25}px ${ft * 0.5}px rgba(0,0,0,.18)` }}>
                      <span style={{ display: 'block', position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: '#D6D3D1', boxShadow: mat > 0 ? 'inset 0 0 0 1px rgba(0,0,0,.08)' : 'none', outline: mat > 0 ? `${Math.max(1, mat * 0.05)}px solid rgba(255,255,255,.9)` : 'none', outlineOffset: mat > 0 ? Math.max(1, mat * 0.05) : 0 }}>
                        {source === 'abstract'
                          ? <Abstract i={i} w={100} h={100 * (it.h / it.w)} />
                          : <img src={w.src} alt={`${w.title} — ${w.artist}`} draggable="false" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: imgFilter, pointerEvents: 'none' }} />}
                        <span aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(125deg, rgba(255,255,255,.10) 0%, rgba(255,255,255,0) 38%)', pointerEvents: 'none' }} />
                      </span>
                    </span>
                  </button>
                  <div aria-hidden="true" style={{
                    position: 'absolute', left: it.placX, top: Math.min(eye + it.h / 2 - 96 * k, eye + 40 * k), width: it.placW,
                    background: placard, padding: `${Math.round(12 * k)}px ${Math.round(13 * k)}px`, boxSizing: 'border-box',
                    boxShadow: '0 1px 1px rgba(0,0,0,.10), 0 4px 10px rgba(0,0,0,.06)',
                    opacity: entered ? 1 : 0, transition: reduced ? 'none' : `opacity .8s ease ${400 + i * 90}ms`
                  }}>
                    <div style={{ fontSize: Math.max(10, 11.5 * k), fontWeight: 500, lineHeight: 1.3, color: ink }}>{w.artist}</div>
                    <div style={{ fontFamily: serifItalic, fontStyle: 'italic', fontWeight: 300, fontSize: Math.max(10.5, 12.5 * k), lineHeight: 1.3, marginTop: 3, color: ink }}>
                      {w.title}{w.year ? <span style={{ fontStyle: 'normal', fontFamily: sans, fontSize: '0.88em', color: muted }}>{', ' + w.year}</span> : null}
                    </div>
                    {w.medium && <div style={{ fontFamily: mono, fontSize: Math.max(8.5, 9.5 * k), letterSpacing: '0.04em', lineHeight: 1.4, marginTop: 8 * k, color: muted }}>{w.medium}</div>}
                    <div style={{ fontFamily: mono, fontSize: Math.max(8, 9 * k), color: muted, marginTop: 6 * k, opacity: 0.8 }}>{`04.${String(i + 1).padStart(2, '0')}`}</div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {spotOn && (
        <div ref={lightRef} aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: zoom !== null ? 0.55 : entered ? 1 : 0, transition: reduced ? 'none' : 'opacity .9s ease', mixBlendMode: 'multiply' }} />
      )}

      <div aria-hidden="true" style={{ position: 'absolute', left: compact ? 20 : 40, right: compact ? 20 : 40, bottom: Math.round(floorH / 2) - 6, display: 'flex', justifyContent: 'space-between', fontFamily: mono, fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(28,25,23,.62)', pointerEvents: 'none', opacity: zoom !== null ? 0 : 1, transition: 'opacity .4s' }}>
        <span>{exTitle}</span>
        <span>{String(count).padStart(2, '0')} works</span>
      </div>

      <aside aria-live="polite" aria-hidden={z ? 'false' : 'true'} style={{
        position: 'absolute', zIndex: 3,
        ...(compact
          ? { left: 0, right: 0, bottom: 0, minHeight: H * 0.42, transform: z ? 'none' : 'translateY(102%)' }
          : { top: 0, right: 0, bottom: 0, width: panelW, transform: z ? 'none' : 'translateX(102%)' }),
        background: placard, boxShadow: '0 0 40px rgba(0,0,0,.12)', boxSizing: 'border-box',
        padding: compact ? '22px 20px 24px' : '48px 40px', display: 'flex', flexDirection: 'column',
        transition: reduced ? 'none' : 'transform .8s cubic-bezier(.65,0,.2,1)'
      }}>
        {z && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: mono, fontSize: 11, letterSpacing: '0.18em', color: muted }}>
              <span>{String(zoom + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}</span>
              <button aria-label="Close detail" onClick={() => setZoom(null)} style={{ ...btnReset, width: 36, height: 36, display: 'grid', placeItems: 'center', borderRadius: '50%', border: `1px solid ${muted}55` }}>
                <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M1 1 L11 11 M11 1 L1 11" stroke={ink} strokeWidth="1.2" /></svg>
              </button>
            </div>
            <div style={{ marginTop: compact ? 14 : 'auto' }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: ink }}>{z.artist}</div>
              <h3 style={{ margin: '8px 0 0', fontFamily: serifItalic, fontStyle: 'italic', fontWeight: 300, fontSize: compact ? 30 : 40, lineHeight: 1.05, letterSpacing: '-0.01em', color: ink }}>{z.title}</h3>
              <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: 'auto 1fr', columnGap: 18, rowGap: 6, fontFamily: mono, fontSize: 11, color: muted, letterSpacing: '0.04em' }}>
                {z.year && <><span>Year</span><span style={{ color: ink }}>{z.year}</span></>}
                {z.medium && <><span>Medium</span><span style={{ color: ink }}>{z.medium}</span></>}
                <span>Room</span><span style={{ color: ink }}>Gallery 04</span>
              </div>
              {z.description && <p style={{ margin: '20px 0 0', fontSize: 14, lineHeight: 1.65, color: muted }}>{z.description}</p>}
            </div>
            <div style={{ marginTop: compact ? 18 : 36, display: 'flex', gap: 10 }}>
              {[['Previous work', -1], ['Next work', 1]].map(([label, d]) => {
                const disabled = zoom + d < 0 || zoom + d >= count;
                return (
                  <button key={label} aria-label={label} disabled={disabled} onClick={() => setZoom(zoom + d)}
                    style={{ ...btnReset, flex: 1, height: 44, border: `1px solid ${disabled ? muted + '33' : ink}`, color: disabled ? muted + '66' : ink, fontFamily: mono, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', cursor: disabled ? 'default' : 'pointer' }}>
                    {d < 0 ? '← Prev' : 'Next →'}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </aside>
    </section>
  );
}

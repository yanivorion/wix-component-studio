const MANIFEST = {
  "type": "Section.MadlibForm",
  "description": "Contact form written as one huge grotesk sentence with inline fields that size to their content, animated underlines, self-typing placeholders and an inline select that opens as an elegant popover; submitting validates in place and morphs the sentence word by word into a thank-you line, with the name and service flying to their new positions",
  "editorElement": {
    "selector": ".madlib-form",
    "displayName": "Madlib Form",
    "archetype": "container",
    "data": {
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Start a project", "group": "Content" },
      "headerRight": { "dataType": "text", "displayName": "Header Right Label", "defaultValue": "Replies within 48 hours", "group": "Content" },
      "part1": { "dataType": "text", "displayName": "Sentence Part 1", "defaultValue": "Hi, my name is", "group": "Sentence" },
      "part2": { "dataType": "text", "displayName": "Sentence Part 2", "defaultValue": "and I’m looking for", "group": "Sentence" },
      "part3": { "dataType": "text", "displayName": "Sentence Part 3", "defaultValue": "for", "group": "Sentence" },
      "part4": { "dataType": "text", "displayName": "Sentence Part 4", "defaultValue": "Reach me at", "group": "Sentence" },
      "services": { "dataType": "text", "displayName": "Services (comma separated)", "defaultValue": "branding,a website,a campaign,packaging,motion design,something new", "group": "Sentence" },
      "nameExamples": { "dataType": "text", "displayName": "Name Placeholders (comma separated)", "defaultValue": "Ada Moreau,Jonas Berg,Mina Sato", "group": "Sentence" },
      "projectExamples": { "dataType": "text", "displayName": "Project Placeholders (comma separated)", "defaultValue": "a new coffee roastery,our museum reopening,a ceramics studio", "group": "Sentence" },
      "emailExamples": { "dataType": "text", "displayName": "Email Placeholders (comma separated)", "defaultValue": "ada@studio.com,jonas@berg.co,mina@sato.jp", "group": "Sentence" },
      "thanksText": { "dataType": "text", "displayName": "Thank-you Text ({name}, {service})", "defaultValue": "Thanks, {name}. We’ll be in touch about {service} within two days.", "group": "Content" },
      "submitLabel": { "dataType": "text", "displayName": "Submit Label", "defaultValue": "Send it", "group": "Content" },
      "note": { "dataType": "text", "displayName": "Note", "defaultValue": "No newsletters. Just a reply from a human.", "group": "Content" },
      "resetLabel": { "dataType": "text", "displayName": "Reset Label", "defaultValue": "Write another", "group": "Content" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#EDECE8", "group": "Colors" },
      "textColor": { "dataType": "color", "displayName": "Text", "defaultValue": "#0B0B0C", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted / Placeholder", "defaultValue": "#9C998F", "group": "Colors" },
      "lineColor": { "dataType": "color", "displayName": "Underline Track", "defaultValue": "#C9C6BD", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent / Error", "defaultValue": "#D9480F", "group": "Colors" },
      "popoverColor": { "dataType": "color", "displayName": "Popover Background", "defaultValue": "#FFFFFF", "group": "Colors" },
      "font": { "dataType": "select", "displayName": "Sentence Font", "defaultValue": "Inter Tight", "options": ["Inter Tight", "Geist", "Manrope", "Instrument Sans", "Hanken Grotesk"], "group": "Typography" },
      "sentenceSize": { "dataType": "select", "displayName": "Sentence Size", "defaultValue": "L", "options": ["M", "L", "XL"], "group": "Typography" },
      "sentenceWeight": { "dataType": "select", "displayName": "Sentence Weight", "defaultValue": "300", "options": ["300", "400"], "group": "Typography" },
      "typingSpeed": { "dataType": "select", "displayName": "Placeholder Typing (ms / char)", "defaultValue": "70", "options": ["40", "70", "110"], "group": "Animation" },
      "animatePlaceholders": { "dataType": "booleanValue", "displayName": "Self-typing Placeholders", "defaultValue": "true", "group": "Animation" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const list = (v, d) => String(v || d).split(',').map((s) => s.trim()).filter(Boolean);
  const eyebrow = config?.eyebrow || 'Start a project';
  const headerRight = config?.headerRight || 'Replies within 48 hours';
  const part1 = config?.part1 || 'Hi, my name is';
  const part2 = config?.part2 || 'and I’m looking for';
  const part3 = config?.part3 || 'for';
  const part4 = config?.part4 || 'Reach me at';
  const services = list(config?.services, 'branding,a website,a campaign,packaging,motion design,something new');
  const exName = list(config?.nameExamples, 'Ada Moreau,Jonas Berg,Mina Sato');
  const exProject = list(config?.projectExamples, 'a new coffee roastery,our museum reopening,a ceramics studio');
  const exEmail = list(config?.emailExamples, 'ada@studio.com,jonas@berg.co,mina@sato.jp');
  const thanksText = config?.thanksText || 'Thanks, {name}. We’ll be in touch about {service} within two days.';
  const submitLabel = config?.submitLabel || 'Send it';
  const note = config?.note || 'No newsletters. Just a reply from a human.';
  const resetLabel = config?.resetLabel || 'Write another';
  const bg = config?.backgroundColor || '#EDECE8';
  const ink = config?.textColor || '#0B0B0C';
  const muted = config?.mutedColor || '#9C998F';
  const lineC = config?.lineColor || '#C9C6BD';
  const accent = config?.accentColor || '#D9480F';
  const popBg = config?.popoverColor || '#FFFFFF';
  const fontName = config?.font || 'Inter Tight';
  const sizeKey = config?.sentenceSize || 'L';
  const weight = config?.sentenceWeight || '300';
  const typeMs = parseInt(config?.typingSpeed || '70', 10) || 70;
  const animPh = bool(config?.animatePlaceholders, true);

  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const uid = React.useMemo(() => 'ml' + Math.random().toString(36).slice(2, 8), []);

  React.useEffect(() => {
    const fam = {
      'Inter Tight': 'Inter+Tight:wght@300;400;500',
      'Geist': 'Geist:wght@300;400;500',
      'Manrope': 'Manrope:wght@300;400;500',
      'Instrument Sans': 'Instrument+Sans:wght@400;500',
      'Hanken Grotesk': 'Hanken+Grotesk:wght@300;400;500'
    };
    [fam[fontName], 'JetBrains+Mono:wght@400;500'].filter(Boolean).forEach((f) => {
      const id = 'gf-' + f.replace(/[^a-z0-9]/gi, '').slice(0, 40);
      if (document.getElementById(id)) return;
      const l = document.createElement('link');
      l.id = id; l.rel = 'stylesheet';
      l.href = `https://fonts.googleapis.com/css2?family=${f}&display=swap`;
      document.head.appendChild(l);
    });
  }, [fontName]);

  const rootRef = React.useRef(null);
  const sentRef = React.useRef(null);
  const nameWrapRef = React.useRef(null);
  const svcBtnRef = React.useRef(null);
  const listRef = React.useRef(null);
  const inputRefs = React.useRef({});
  const nameTokRef = React.useRef(null);
  const svcTokRef = React.useRef(null);
  const flipFrom = React.useRef(null);
  const timers = React.useRef([]);

  const [width, setWidth] = React.useState(1280);
  const [stageH, setStageH] = React.useState(800);
  const [vals, setVals] = React.useState({ name: '', project: '', email: '' });
  const [svc, setSvc] = React.useState(0);
  const [focus, setFocus] = React.useState(null);
  const [touched, setTouched] = React.useState({});
  const [showErr, setShowErr] = React.useState(false);
  const [shake, setShake] = React.useState(0);
  const [phase, setPhase] = React.useState('form');
  const [popOpen, setPopOpen] = React.useState(false);
  const [active, setActive] = React.useState(0);
  const [popRight, setPopRight] = React.useState(false);
  const [now, setNow] = React.useState(0);
  const [round, setRound] = React.useState(0);

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
    return () => { if (ro) ro.disconnect(); window.removeEventListener('resize', measure); timers.current.forEach(clearTimeout); };
  }, []);

  const typing = animPh && !reduced && phase === 'form';
  React.useEffect(() => {
    if (!typing) return undefined;
    const t0 = performance.now();
    const id = setInterval(() => setNow(performance.now() - t0), 45);
    return () => clearInterval(id);
  }, [typing]);

  // deterministic typewriter: hold full example, delete, type next
  const typed = (examples, offset) => {
    if (!examples.length) return '';
    if (!typing) return examples[0];
    const hold = 2600; const del = 28;
    const cycles = examples.map((e) => hold + e.length * del + e.length * typeMs + 260);
    const total = cycles.reduce((a, b) => a + b, 0);
    let t = (now + offset) % total;
    for (let i = 0; i < examples.length; i++) {
      const e = examples[i];
      const nxt = examples[(i + 1) % examples.length];
      if (t < cycles[i]) {
        if (t < hold) return e;
        t -= hold;
        if (t < e.length * del) return e.slice(0, e.length - Math.floor(t / del));
        t -= e.length * del;
        if (t < 260) return '';
        t -= 260;
        return nxt.slice(0, Math.min(nxt.length, Math.floor(t / typeMs) + 1));
      }
      t -= cycles[i];
    }
    return examples[0];
  };

  const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
  const errs = {
    name: vals.name.trim() ? '' : 'Tell us your name.',
    project: vals.project.trim() ? '' : 'Say a word about the project.',
    email: !vals.email.trim() ? 'Add an email so we can reply.' : emailOk(vals.email) ? '' : 'That email doesn’t look quite right.'
  };
  const isBad = (k) => !!errs[k] && (showErr || touched[k]);
  const errList = ['name', 'project', 'email'].filter((k) => isBad(k));

  const at = (fn, ms) => { const t = setTimeout(fn, ms); timers.current.push(t); };

  const scaleOf = () => {
    const el = sentRef.current;
    if (!el || !el.offsetWidth) return 1;
    return el.getBoundingClientRect().width / el.offsetWidth || 1;
  };

  const staticWords = [part1, part2, part3, part4].join(' ').split(/\s+/).filter(Boolean).length + 1;
  const leaveMs = reduced ? 0 : Math.min(900, 420 + staticWords * 22);

  const onSubmit = (e) => {
    e.preventDefault();
    if (phase !== 'form') return;
    setPopOpen(false);
    if (errs.name || errs.project || errs.email) {
      setShowErr(true);
      setShake((s) => s + 1);
      const first = ['name', 'project', 'email'].find((k) => errs[k]);
      if (first && inputRefs.current[first]) inputRefs.current[first].focus();
      return;
    }
    const base = sentRef.current.getBoundingClientRect();
    const sc = scaleOf();
    const rel = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); return { x: (r.left - base.left) / sc, y: (r.top - base.top) / sc }; };
    flipFrom.current = { name: rel(nameWrapRef.current), svc: rel(svcBtnRef.current) };
    setPhase('leaving');
    at(() => setPhase('thanks'), leaveMs);
  };

  React.useLayoutEffect(() => {
    if (phase !== 'thanks' || reduced) return;
    const from = flipFrom.current;
    const base = sentRef.current && sentRef.current.getBoundingClientRect();
    if (!from || !base) return;
    const sc = scaleOf();
    [[nameTokRef.current, from.name], [svcTokRef.current, from.svc]].forEach(([el, f], k) => {
      if (!el || !f) return;
      const r = el.getBoundingClientRect();
      const dx = f.x - (r.left - base.left) / sc;
      const dy = f.y - (r.top - base.top) / sc;
      el.style.transition = 'none';
      el.style.transform = `translate(${dx}px, ${dy}px)`;
      void el.offsetWidth;
      el.style.transition = `transform 1100ms cubic-bezier(0.22,1,0.36,1) ${k * 70}ms`;
      el.style.transform = 'none';
    });
  }, [phase]); // eslint-disable-line react-hooks/exhaustive-deps

  const reset = () => {
    timers.current.forEach(clearTimeout);
    setVals({ name: '', project: '', email: '' });
    setTouched({}); setShowErr(false); setSvc(0);
    setPhase('form'); setRound((r) => r + 1);
    at(() => inputRefs.current.name && inputRefs.current.name.focus(), 50);
  };

  // popover
  const openPop = () => {
    const b = svcBtnRef.current; const s = sentRef.current;
    if (b && s) {
      const br = b.getBoundingClientRect(); const sr = s.getBoundingClientRect();
      setPopRight(br.left - sr.left > sr.width * 0.55);
    }
    setActive(svc);
    setPopOpen(true);
    at(() => listRef.current && listRef.current.focus(), 20);
  };
  const choose = (i) => { setSvc(i); setPopOpen(false); at(() => svcBtnRef.current && svcBtnRef.current.focus(), 10); };
  React.useEffect(() => {
    if (!popOpen) return undefined;
    const onDown = (e) => {
      if (listRef.current && listRef.current.contains(e.target)) return;
      if (svcBtnRef.current && svcBtnRef.current.contains(e.target)) return;
      setPopOpen(false);
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [popOpen]);
  const onBtnKey = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); openPop(); }
  };
  const onListKey = (e) => {
    const n = services.length;
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => (a + 1) % n); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => (a - 1 + n) % n); }
    else if (e.key === 'Home') { e.preventDefault(); setActive(0); }
    else if (e.key === 'End') { e.preventDefault(); setActive(n - 1); }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); choose(active); }
    else if (e.key === 'Escape') { e.preventDefault(); setPopOpen(false); svcBtnRef.current && svcBtnRef.current.focus(); }
    else if (e.key === 'Tab') { setPopOpen(false); }
  };

  const compact = width < 760;
  const pad = compact ? 20 : Math.max(36, Math.round(width * 0.04));
  const mult = sizeKey === 'XL' ? 0.074 : sizeKey === 'M' ? 0.05 : 0.064;
  const fs = compact ? Math.max(30, Math.round(width * (sizeKey === 'M' ? 0.085 : 0.1))) : Math.round(Math.min(sizeKey === 'XL' ? 104 : sizeKey === 'M' ? 70 : 88, width * mult));
  const sans = `"${fontName}", "Inter", -apple-system, "Helvetica Neue", Arial, sans-serif`;
  const mono = '"JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace';
  const easeOut = 'cubic-bezier(0.22,1,0.36,1)';
  const p = uid;
  const minH = compact ? 0 : Math.max(560, Math.min(stageH, 860));
  const leaving = phase === 'leaving';

  let wi = 0;
  const words = (str) => String(str).split(/\s+/).filter(Boolean).map((w) => {
    const k = wi++;
    return (
      <React.Fragment key={'w' + k}>
        <span aria-hidden="true" style={{ display: 'inline-block', transition: reduced ? 'none' : `opacity 420ms ease ${k * 22}ms, transform 520ms cubic-bezier(0.55,0,0.75,0.3) ${k * 22}ms, filter 520ms ease ${k * 22}ms`, opacity: leaving ? 0 : 1, filter: leaving ? 'blur(10px)' : 'none', transform: leaving ? 'translateY(-0.35em)' : 'none', animation: reduced ? 'none' : `${p}-wordin 900ms ${easeOut} ${120 + k * 35}ms backwards` }}>{w}</span>{' '}
      </React.Fragment>
    );
  });

  const underline = (k, on) => {
    const bad = isBad(k);
    return (
      <span aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, bottom: '-0.04em', height: Math.max(1.5, fs * 0.03), background: bad ? `${accent}55` : lineC, transform: leaving ? 'scaleX(0)' : 'none', transformOrigin: 'right', transition: reduced ? 'none' : `transform 500ms ${easeOut}` }}>
        <span style={{ position: 'absolute', inset: 0, background: bad ? accent : ink, transformOrigin: on ? 'left' : 'right', transform: on || bad ? 'scaleX(1)' : 'scaleX(0)', transition: reduced ? 'none' : `transform 700ms ${easeOut}, background-color 300ms ease` }} />
      </span>
    );
  };

  const field = (k, label, examples, offset, type) => {
    const v = vals[k];
    const ph = typed(examples, offset);
    const isF = focus === k;
    const shown = v || (isF ? (examples[0] || '') : ph) || '   ';
    const bad = isBad(k);
    return (
      <span key={k} ref={k === 'name' ? nameWrapRef : undefined}
        style={{ position: 'relative', display: 'inline-grid', verticalAlign: 'baseline', marginRight: '0.12em', animation: !reduced && bad && showErr ? `${p}-shake${shake % 2} 460ms cubic-bezier(0.36,0.07,0.19,0.97) both` : 'none', opacity: leaving && k !== 'name' ? 0 : 1, filter: leaving && k !== 'name' ? 'blur(10px)' : 'none', transition: reduced ? 'none' : 'opacity 420ms ease 160ms, filter 520ms ease 160ms' }}>
        <label htmlFor={`${p}-${k}`} style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap' }}>{label}</label>
        <span aria-hidden="true" style={{ gridArea: '1 / 1', visibility: 'hidden', whiteSpace: 'pre', fontWeight: 400, paddingRight: '0.08em' }}>{shown}</span>
        {!v && (
          <span aria-hidden="true" style={{ gridArea: '1 / 1', whiteSpace: 'pre', color: muted, fontWeight: 400, pointerEvents: 'none', opacity: isF ? 0.55 : 1, transition: 'opacity .3s ease' }}>
            {isF ? (examples[0] || '') : ph}
            {typing && !isF && <span style={{ display: 'inline-block', width: Math.max(2, fs * 0.035), height: '0.78em', marginLeft: '0.04em', background: accent, verticalAlign: '-0.06em', animation: `${p}-caret 1s steps(1) infinite` }} />}
          </span>
        )}
        <input
          ref={(el) => { inputRefs.current[k] = el; }}
          id={`${p}-${k}`}
          type={type}
          size={1}
          value={v}
          autoComplete={k === 'email' ? 'email' : k === 'name' ? 'name' : 'off'}
          spellCheck={false}
          aria-invalid={bad}
          aria-describedby={bad ? `${p}-err-${k}` : undefined}
          disabled={phase !== 'form'}
          onChange={(e) => setVals((s) => ({ ...s, [k]: e.target.value }))}
          onFocus={() => setFocus(k)}
          onBlur={() => { setFocus(null); if (vals[k]) setTouched((t) => ({ ...t, [k]: true })); }}
          style={{ gridArea: '1 / 1', width: '100%', minWidth: 0, font: 'inherit', fontWeight: 400, letterSpacing: 'inherit', color: ink, background: 'transparent', border: 'none', outline: 'none', padding: 0, margin: 0, caretColor: accent, WebkitTextFillColor: ink }} />
        {underline(k, isF || !!v)}
      </span>
    );
  };

  const firstName = (vals.name.trim().split(/\s+/)[0]) || '';
  const thanksParts = String(thanksText).split(/(\{name\}|\{service\})/).filter((s) => s !== '');

  return (
    <section ref={rootRef} className={`madlib-form ${p}`} aria-label={eyebrow}
      style={{ position: 'relative', width: '100%', minHeight: minH, boxSizing: 'border-box', padding: `${compact ? 26 : 34}px ${pad}px ${compact ? 30 : 40}px`, background: bg, color: ink, fontFamily: sans, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: compact ? 36 : 48 }}>
      <style>{`
        @keyframes ${p}-wordin { from { opacity: 0; filter: blur(8px); transform: translateY(0.4em); } to { opacity: 1; filter: none; transform: none; } }
        @keyframes ${p}-caret { 0%, 50% { opacity: 1; } 50.01%, 100% { opacity: 0; } }
        @keyframes ${p}-shake0 { 10%, 90% { transform: translateX(-2px); } 20%, 80% { transform: translateX(4px); } 30%, 50%, 70% { transform: translateX(-7px); } 40%, 60% { transform: translateX(7px); } }
        @keyframes ${p}-shake1 { 10%, 90% { transform: translateX(-2px); } 20%, 80% { transform: translateX(4px); } 30%, 50%, 70% { transform: translateX(-7px); } 40%, 60% { transform: translateX(7px); } }
        @keyframes ${p}-pop { from { clip-path: inset(0 0 100% 0 round 14px); transform: translateY(-6px); } to { clip-path: inset(0 0 0 0 round 14px); transform: none; } }
        @keyframes ${p}-opt { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        @keyframes ${p}-fade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        .${p} input::placeholder { color: transparent; }
        .${p} input:disabled { opacity: 1; }
        .${p} .${p}-svc:focus-visible, .${p} .${p}-btn:focus-visible, .${p} .${p}-reset:focus-visible { outline: 2px solid ${accent}; outline-offset: 6px; border-radius: 4px; }
        .${p} .${p}-btn .${p}-arr { transition: transform 600ms ${easeOut}; }
        .${p} .${p}-btn:hover .${p}-arr { transform: translateX(6px); }
        .${p} .${p}-btn { transition: background-color 400ms ease, color 400ms ease, transform 300ms ${easeOut}; }
        .${p} .${p}-btn:hover { background: ${accent}; }
        .${p} .${p}-btn:active { transform: scale(0.97); }
        .${p} .${p}-svc .${p}-chev { transition: transform 500ms ${easeOut}; }
        .${p} .${p}-opt { transition: background-color 200ms ease, padding-left 400ms ${easeOut}; }
        @media (prefers-reduced-motion: reduce) { .${p} * { animation: none !important; transition: none !important; } }
      `}</style>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, fontFamily: mono, fontSize: compact ? 10 : 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6F6C64', borderBottom: `1px solid ${lineC}`, paddingBottom: compact ? 12 : 16, animation: reduced ? 'none' : `${p}-fade 700ms ${easeOut} both` }}>
        <span><span style={{ color: accent }}>●</span>&nbsp;&nbsp;{eyebrow}</span>
        {!compact && <span>{phase === 'thanks' ? 'Sent' : 'Fill in the blanks'}</span>}
        <span>{headerRight}</span>
      </div>

      <form noValidate onSubmit={onSubmit} aria-describedby={`${p}-errs`} style={{ margin: 0, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: compact ? 32 : 44, paddingTop: compact ? 12 : Math.round(fs * 0.5) }}>
        <div ref={sentRef} key={round} style={{ position: 'relative', fontSize: fs, lineHeight: 1.32, letterSpacing: '-0.035em', fontWeight: weight, maxWidth: compact ? '100%' : Math.round(fs * 16.5), textWrap: 'pretty' }}>
          {phase !== 'thanks' ? (
            <div>
              {words(part1)}
              {field('name', 'Your name', exName, 0, 'text')}
              {words(part2)}
              <span style={{ position: 'relative', display: 'inline-block', marginRight: '0.12em' }}>
                <button ref={svcBtnRef} type="button" className={`${p}-svc`} aria-haspopup="listbox" aria-expanded={popOpen} aria-controls={`${p}-list`} aria-label={`Service: ${services[svc] || ''}`}
                  disabled={phase !== 'form'} onClick={() => (popOpen ? setPopOpen(false) : openPop())} onKeyDown={onBtnKey}
                  style={{ appearance: 'none', border: 'none', background: 'transparent', padding: 0, margin: 0, font: 'inherit', fontWeight: 400, letterSpacing: 'inherit', color: ink, cursor: 'pointer', position: 'relative', display: 'inline-flex', alignItems: 'baseline', gap: '0.14em' }}>
                  <span>{services[svc]}</span>
                  <svg className={`${p}-chev`} width={fs * 0.32} height={fs * 0.32} viewBox="0 0 12 12" aria-hidden="true" style={{ transform: popOpen ? 'rotate(180deg)' : 'none', alignSelf: 'center', opacity: leaving ? 0 : 1, transition: 'opacity 300ms ease' }}>
                    <path d="M2 4.5 L6 8.5 L10 4.5" fill="none" stroke={accent} strokeWidth="1.4" />
                  </svg>
                  {underline('svc', popOpen)}
                </button>
                {popOpen && (
                  <ul ref={listRef} id={`${p}-list`} role="listbox" tabIndex={-1} aria-label="Service" aria-activedescendant={`${p}-o${active}`} onKeyDown={onListKey}
                    style={{ position: 'absolute', zIndex: 20, top: 'calc(100% + 10px)', [popRight ? 'right' : 'left']: 0, minWidth: compact ? 230 : 300, margin: 0, padding: 8, listStyle: 'none', background: popBg, borderRadius: 14, boxShadow: '0 1px 0 rgba(0,0,0,0.04), 0 24px 60px -18px rgba(20,18,12,0.35)', outline: 'none', fontSize: compact ? 17 : 20, lineHeight: 1.2, letterSpacing: '-0.015em', fontWeight: 400, animation: reduced ? 'none' : `${p}-pop 520ms ${easeOut} both` }}>
                    {services.map((s, i) => (
                      <li key={i} id={`${p}-o${i}`} role="option" aria-selected={i === svc} className={`${p}-opt`}
                        onPointerEnter={() => setActive(i)} onClick={() => choose(i)}
                        style={{ display: 'flex', alignItems: 'baseline', gap: 14, padding: `10px 12px 10px ${i === active ? 18 : 12}px`, borderRadius: 9, cursor: 'pointer', whiteSpace: 'nowrap', background: i === active ? `${ink}0D` : 'transparent', animation: reduced ? 'none' : `${p}-opt 500ms ${easeOut} ${60 + i * 35}ms both` }}>
                        <span style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: '0.06em', color: i === svc ? accent : muted }}>{String(i + 1).padStart(2, '0')}</span>
                        <span style={{ flex: 1 }}>{s}</span>
                        <span aria-hidden="true" style={{ color: accent, opacity: i === svc ? 1 : 0, fontSize: 14 }}>●</span>
                      </li>
                    ))}
                  </ul>
                )}
              </span>
              {words(part3)}
              {field('project', 'Your project', exProject, 900, 'text')}
              <span aria-hidden="true" style={{ display: 'inline-block', marginLeft: '-0.12em', marginRight: '0.24em', opacity: leaving ? 0 : 1, transition: 'opacity 300ms ease' }}>.</span>
              {words(part4)}
              {field('email', 'Your email', exEmail, 1800, 'email')}
              <span aria-hidden="true" style={{ display: 'inline-block', marginLeft: '-0.12em', opacity: leaving ? 0 : 1, transition: 'opacity 300ms ease' }}>.</span>
            </div>
          ) : (
            <div role="status" aria-live="polite">
              {thanksParts.map((part, i) => {
                if (part === '{name}') return <span key={i} ref={nameTokRef} style={{ display: 'inline-block', fontWeight: 400 }}>{firstName}</span>;
                if (part === '{service}') return <span key={i} ref={svcTokRef} style={{ display: 'inline-block', fontWeight: 400, color: accent }}>{services[svc]}</span>;
                const toks = part.split(/(\s+)/);
                return (
                  <React.Fragment key={i}>
                    {toks.map((t, j) => (/^\s+$/.test(t) ? ' ' : t ? (
                      <span key={j} style={{ display: 'inline-block', animation: reduced ? 'none' : `${p}-wordin 900ms ${easeOut} ${260 + (i * 4 + j) * 34}ms both` }}>{t}</span>
                    ) : null))}
                  </React.Fragment>
                );
              })}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: compact ? 'column' : 'row', alignItems: compact ? 'flex-start' : 'center', gap: compact ? 18 : 32, minHeight: compact ? 0 : 64 }}>
          {phase !== 'thanks' ? (
            <button type="submit" className={`${p}-btn`} disabled={phase !== 'form'}
              style={{ appearance: 'none', border: 'none', cursor: 'pointer', background: ink, color: bg, borderRadius: 999, padding: compact ? '16px 26px' : '20px 34px', font: 'inherit', fontSize: compact ? 17 : 20, fontWeight: 400, letterSpacing: '-0.01em', display: 'inline-flex', alignItems: 'center', gap: 14, opacity: leaving ? 0 : 1, animation: reduced ? 'none' : `${p}-fade 800ms ${easeOut} 500ms both` }}>
              {submitLabel}
              <svg className={`${p}-arr`} width="20" height="12" viewBox="0 0 20 12" aria-hidden="true"><path d="M0 6 H18 M13 1 L18 6 L13 11" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
            </button>
          ) : (
            <button type="button" className={`${p}-reset`} onClick={reset}
              style={{ appearance: 'none', border: 'none', background: 'transparent', padding: 0, cursor: 'pointer', fontFamily: mono, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: ink, display: 'inline-flex', alignItems: 'center', gap: 10, animation: reduced ? 'none' : `${p}-fade 700ms ${easeOut} 900ms both` }}>
              <span style={{ width: 28, height: 1, background: accent, display: 'inline-block' }} />{resetLabel}
            </button>
          )}
          <div id={`${p}-errs`} aria-live="polite" style={{ fontFamily: mono, fontSize: compact ? 10.5 : 11.5, lineHeight: 1.6, letterSpacing: '0.04em' }}>
            {phase === 'form' && errList.length > 0 ? errList.map((k) => (
              <div key={k + shake} id={`${p}-err-${k}`} style={{ color: accent, animation: reduced ? 'none' : `${p}-fade 500ms ${easeOut} both` }}>— {errs[k]}</div>
            )) : (
              <div style={{ color: '#6F6C64', opacity: leaving ? 0 : 1, transition: 'opacity 300ms ease' }}>{phase === 'thanks' ? 'Message received · ' + new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : note}</div>
            )}
          </div>
        </div>
      </form>
    </section>
  );
}

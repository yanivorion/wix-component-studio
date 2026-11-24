const MANIFEST = {
  "type": "Interaction.PricingToggle",
  "description": "Three-plan pricing section with a sliding monthly/yearly pill and a savings tag that pops; every price digit rolls like an odometer when billing changes, a highlight ring springs between cards on hover while the active card lifts, and feature checks draw in with a stagger",
  "editorElement": {
    "selector": ".pricing-toggle",
    "displayName": "Pricing Toggle",
    "archetype": "container",
    "data": {
      "eyebrow": { "dataType": "text", "displayName": "Eyebrow", "defaultValue": "Membership", "group": "Content" },
      "headline": { "dataType": "text", "displayName": "Headline", "defaultValue": "Choose how you work with us", "group": "Content" },
      "monthlyLabel": { "dataType": "text", "displayName": "Monthly Label", "defaultValue": "Monthly", "group": "Content" },
      "yearlyLabel": { "dataType": "text", "displayName": "Yearly Label", "defaultValue": "Yearly", "group": "Content" },
      "saveLabel": { "dataType": "text", "displayName": "Savings Tag", "defaultValue": "Save 20%", "group": "Content" },
      "currency": { "dataType": "text", "displayName": "Currency Symbol", "defaultValue": "$", "group": "Content" },
      "perLabel": { "dataType": "text", "displayName": "Per Period Label", "defaultValue": "/ month", "group": "Content" },
      "monthlyNote": { "dataType": "text", "displayName": "Monthly Billing Note", "defaultValue": "Billed monthly, cancel any time", "group": "Content" },
      "yearlyNote": { "dataType": "text", "displayName": "Yearly Billing Note", "defaultValue": "Billed annually", "group": "Content" },
      "plan1Name": { "dataType": "text", "displayName": "Plan 1 Name", "defaultValue": "Essential", "group": "Plans" },
      "plan1Description": { "dataType": "text", "displayName": "Plan 1 Description", "defaultValue": "For individuals finding their footing.", "group": "Plans" },
      "plan1Monthly": { "dataType": "text", "displayName": "Plan 1 Monthly Price", "defaultValue": "19", "group": "Plans" },
      "plan1Yearly": { "dataType": "text", "displayName": "Plan 1 Yearly Price (per month)", "defaultValue": "15", "group": "Plans" },
      "plan1Features": { "dataType": "text", "displayName": "Plan 1 Features (comma separated)", "defaultValue": "One workspace,10 GB of storage,Core templates,Email support", "group": "Plans" },
      "plan2Name": { "dataType": "text", "displayName": "Plan 2 Name", "defaultValue": "Studio", "group": "Plans" },
      "plan2Description": { "dataType": "text", "displayName": "Plan 2 Description", "defaultValue": "For small teams shipping every week.", "group": "Plans" },
      "plan2Monthly": { "dataType": "text", "displayName": "Plan 2 Monthly Price", "defaultValue": "49", "group": "Plans" },
      "plan2Yearly": { "dataType": "text", "displayName": "Plan 2 Yearly Price (per month)", "defaultValue": "39", "group": "Plans" },
      "plan2Features": { "dataType": "text", "displayName": "Plan 2 Features (comma separated)", "defaultValue": "Five workspaces,200 GB of storage,Every template,Shared libraries,Priority support", "group": "Plans" },
      "plan3Name": { "dataType": "text", "displayName": "Plan 3 Name", "defaultValue": "Atelier", "group": "Plans" },
      "plan3Description": { "dataType": "text", "displayName": "Plan 3 Description", "defaultValue": "For organisations with a point of view.", "group": "Plans" },
      "plan3Monthly": { "dataType": "text", "displayName": "Plan 3 Monthly Price", "defaultValue": "129", "group": "Plans" },
      "plan3Yearly": { "dataType": "text", "displayName": "Plan 3 Yearly Price (per month)", "defaultValue": "99", "group": "Plans" },
      "plan3Features": { "dataType": "text", "displayName": "Plan 3 Features (comma separated)", "defaultValue": "Unlimited workspaces,2 TB of storage,Custom brand kits,SSO and audit log,A named partner", "group": "Plans" },
      "ctaLabel": { "dataType": "text", "displayName": "Button Label", "defaultValue": "Get started", "group": "Plans" },
      "featuredLabel": { "dataType": "text", "displayName": "Featured Badge", "defaultValue": "Most chosen", "group": "Plans" },
      "featuredPlan": { "dataType": "select", "displayName": "Featured Plan", "defaultValue": "2", "options": ["1", "2", "3"], "group": "Plans" },
      "defaultBilling": { "dataType": "select", "displayName": "Default Billing", "defaultValue": "monthly", "options": ["monthly", "yearly"], "group": "Animation" },
      "autoDemo": { "dataType": "booleanValue", "displayName": "Demo Switch On Load", "defaultValue": "true", "group": "Animation" },
      "backgroundColor": { "dataType": "color", "displayName": "Background", "defaultValue": "#F5F5F4", "group": "Colors" },
      "cardColor": { "dataType": "color", "displayName": "Card", "defaultValue": "#FFFFFF", "group": "Colors" },
      "textColor": { "dataType": "color", "displayName": "Text", "defaultValue": "#1C1917", "group": "Colors" },
      "mutedColor": { "dataType": "color", "displayName": "Muted Text", "defaultValue": "#78716C", "group": "Colors" },
      "borderColor": { "dataType": "color", "displayName": "Card Border", "defaultValue": "#E7E5E4", "group": "Colors" },
      "highlightColor": { "dataType": "color", "displayName": "Highlight Ring", "defaultValue": "#1C1917", "group": "Colors" },
      "accentColor": { "dataType": "color", "displayName": "Accent (tag)", "defaultValue": "#DCCFB8", "group": "Colors" },
      "displayFont": { "dataType": "select", "displayName": "Display Font", "defaultValue": "Instrument Serif", "options": ["Instrument Serif", "Fraunces", "Inter Tight", "Inter"], "group": "Typography" }
    },
    "layout": { "resizeDirection": "horizontal", "contentResizeDirection": "vertical" }
  }
};

function Component({ config = {} }) {
  const bool = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
  const split = (s) => String(s || '').split(',').map((x) => x.trim()).filter(Boolean);
  const eyebrow = config?.eyebrow || 'Membership';
  const headline = config?.headline || 'Choose how you work with us';
  const monthlyLabel = config?.monthlyLabel || 'Monthly';
  const yearlyLabel = config?.yearlyLabel || 'Yearly';
  const saveLabel = config?.saveLabel || 'Save 20%';
  const currency = config?.currency ?? '$';
  const perLabel = config?.perLabel || '/ month';
  const monthlyNote = config?.monthlyNote || 'Billed monthly, cancel any time';
  const yearlyNote = config?.yearlyNote || 'Billed annually';
  const ctaLabel = config?.ctaLabel || 'Get started';
  const featuredLabel = config?.featuredLabel || 'Most chosen';
  const featured = Math.min(2, Math.max(0, (parseInt(config?.featuredPlan || '2', 10) || 2) - 1));
  const defaultBilling = config?.defaultBilling || 'monthly';
  const autoDemo = bool(config?.autoDemo, true);
  const bg = config?.backgroundColor || '#F5F5F4';
  const card = config?.cardColor || '#FFFFFF';
  const text = config?.textColor || '#1C1917';
  const muted = config?.mutedColor || '#78716C';
  const border = config?.borderColor || '#E7E5E4';
  const ring = config?.highlightColor || '#1C1917';
  const accent = config?.accentColor || '#DCCFB8';
  const displayFont = config?.displayFont || 'Instrument Serif';

  const defaults = [
    ['Essential', 'For individuals finding their footing.', '19', '15', 'One workspace,10 GB of storage,Core templates,Email support'],
    ['Studio', 'For small teams shipping every week.', '49', '39', 'Five workspaces,200 GB of storage,Every template,Shared libraries,Priority support'],
    ['Atelier', 'For organisations with a point of view.', '129', '99', 'Unlimited workspaces,2 TB of storage,Custom brand kits,SSO and audit log,A named partner'],
  ];
  const plans = defaults.map((d, i) => ({
    name: config?.[`plan${i + 1}Name`] || d[0],
    desc: config?.[`plan${i + 1}Description`] || d[1],
    monthly: String(config?.[`plan${i + 1}Monthly`] || d[2]).replace(/[^0-9]/g, '') || '0',
    yearly: String(config?.[`plan${i + 1}Yearly`] || d[3]).replace(/[^0-9]/g, '') || '0',
    features: split(config?.[`plan${i + 1}Features`] || d[4]),
  }));

  const uid = React.useMemo(() => 'pt' + Math.random().toString(36).slice(2, 9), []);
  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  const rootRef = React.useRef(null);
  const gridRef = React.useRef(null);
  const cardRefs = React.useRef([]);
  const optRefs = React.useRef([]);
  const touched = React.useRef(false);
  const [width, setWidth] = React.useState(1280);
  const [yearly, setYearly] = React.useState(defaultBilling === 'yearly');
  const [flips, setFlips] = React.useState(0);
  const [hover, setHover] = React.useState(-1);
  const [shown, setShown] = React.useState(reduced);
  const [ringRect, setRingRect] = React.useState(null);
  const [knob, setKnob] = React.useState(null);

  React.useEffect(() => { setYearly(defaultBilling === 'yearly'); }, [defaultBilling]);

  React.useEffect(() => {
    const families = { 'Instrument Serif': 'Instrument+Serif:ital@0;1', 'Fraunces': 'Fraunces:opsz,wght@9..144,300..500', 'Inter Tight': 'Inter+Tight:wght@300..500' };
    [families[displayFont], 'Inter:wght@300;400;500'].filter(Boolean).forEach((f) => {
      const id = 'gf-' + f.replace(/[^a-z0-9]/gi, '').slice(0, 40);
      if (document.getElementById(id)) return;
      const l = document.createElement('link');
      l.id = id; l.rel = 'stylesheet';
      l.href = `https://fonts.googleapis.com/css2?family=${f}&display=swap`;
      document.head.appendChild(l);
    });
  }, [displayFont]);

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return undefined;
    const measure = () => setWidth(el.clientWidth || 1280);
    measure();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (ro) ro.observe(el);
    window.addEventListener('resize', measure);
    let io = null;
    if (!reduced && typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { setShown(true); io.disconnect(); } }, { threshold: 0.15 });
      io.observe(el);
    } else setShown(true);
    return () => { if (ro) ro.disconnect(); if (io) io.disconnect(); window.removeEventListener('resize', measure); };
  }, [reduced]);

  const target = hover >= 0 ? hover : featured;
  const measureRing = React.useCallback(() => {
    const c = cardRefs.current[target];
    if (c) setRingRect({ x: c.offsetLeft, y: c.offsetTop, w: c.offsetWidth, h: c.offsetHeight });
    const o = optRefs.current[yearly ? 1 : 0];
    if (o) setKnob({ x: o.offsetLeft, w: o.offsetWidth, h: o.offsetHeight, y: o.offsetTop });
  }, [target, yearly]);
  React.useLayoutEffect(() => { measureRing(); }, [measureRing, width]);
  React.useEffect(() => {
    const t = setTimeout(measureRing, 500);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measureRing);
    return () => clearTimeout(t);
  }, [measureRing]);

  React.useEffect(() => {
    if (!autoDemo || reduced) return undefined;
    const t = setTimeout(() => { if (!touched.current) { setYearly((y) => !y); setFlips((f) => f + 1); } }, 1600);
    return () => clearTimeout(t);
  }, [autoDemo, reduced]);

  const setBilling = (y) => { touched.current = true; if (y !== yearly) { setYearly(y); setFlips((f) => f + 1); } };
  const onToggleKey = (e) => {
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
      e.preventDefault();
      const y = !yearly;
      setBilling(y);
      const o = optRefs.current[y ? 1 : 0]; if (o) o.focus({ preventScroll: true });
    }
  };

  const compact = width < 860;
  const pad = compact ? 20 : Math.max(48, Math.round(width * 0.05));
  const sans = '"Inter", -apple-system, "Helvetica Neue", Arial, sans-serif';
  const display = displayFont === 'Inter' ? sans
    : displayFont === 'Inter Tight' ? '"Inter Tight", "Inter", -apple-system, sans-serif'
    : `"${displayFont}", "Iowan Old Style", Georgia, serif`;
  const serifLike = displayFont === 'Instrument Serif' || displayFont === 'Fraunces';
  const p = uid;
  const E1 = 'cubic-bezier(.22,1,.36,1)';
  const E2 = 'cubic-bezier(.65,0,.35,1)';
  const priceSize = compact ? 60 : Math.round(Math.min(84, width * 0.058));
  const btnReset = { appearance: 'none', border: 'none', background: 'transparent', color: 'inherit', padding: 0, margin: 0, cursor: 'pointer', font: 'inherit' };

  const odometer = (value, other, planIndex) => {
    const len = Math.max(value.length, other.length);
    const digits = value.padStart(len, ' ').split('');
    return (
      <span aria-hidden="true" style={{ display: 'inline-flex', height: '1em', lineHeight: 1, overflow: 'hidden', paddingBottom: '0.04em', fontVariantNumeric: 'tabular-nums lining-nums' }}>
        {digits.map((d, i) => {
          const blank = d === ' ';
          const n = blank ? 0 : parseInt(d, 10);
          const delay = (len - 1 - i) * 70 + planIndex * 60;
          return (
            <span key={i} style={{ position: 'relative', display: 'inline-block', maxWidth: blank ? 0 : '0.8em', overflow: 'hidden', height: '1.04em', opacity: blank ? 0 : 1, transition: reduced ? 'none' : `max-width 700ms ${E2} ${delay}ms, opacity 500ms ease ${delay}ms` }}>
              <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `translateY(${-n * 1.04}em)`, transition: reduced ? 'none' : `transform 1100ms cubic-bezier(.7,0,.2,1) ${delay}ms` }}>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((k) => <span key={k} style={{ display: 'block', height: '1.04em', lineHeight: '1.04em' }}>{k}</span>)}
              </span>
            </span>
          );
        })}
      </span>
    );
  };

  const check = (key, delay) => (
    <svg key={key} width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx="9" cy="9" r="8.25" fill="none" stroke={`${text}22`} strokeWidth="1" />
      <path d="M5.2 9.3l2.5 2.4 5.1-5.3" fill="none" stroke={text} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"
        pathLength="1" strokeDasharray="1" style={{ strokeDashoffset: shown ? 0 : 1, animation: reduced || !shown ? 'none' : `${p}-draw 700ms ${E1} ${delay}ms both` }} />
    </svg>
  );

  const cols = compact ? 1 : 3;

  return (
    <section
      ref={rootRef}
      className={`pricing-toggle ${p}`}
      style={{ position: 'relative', width: '100%', background: bg, color: text, fontFamily: sans, padding: compact ? `60px ${pad}px 64px` : `${Math.round(pad * 1.2)}px ${pad}px ${Math.round(pad * 1.3)}px`, boxSizing: 'border-box', overflow: 'hidden' }}
    >
      <style>{`
        @keyframes ${p}-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
        @keyframes ${p}-pop { 0% { transform: scale(.6) rotate(-10deg); } 55% { transform: scale(1.12) rotate(4deg); } 100% { transform: scale(1) rotate(-3deg); } }
        @keyframes ${p}-in { from { translate: 0 48px; } to { translate: 0 0; } }
        @keyframes ${p}-up { from { transform: translateY(105%); } to { transform: none; } }
        .${p} .${p}-opt:focus-visible, .${p} .${p}-cta:focus-visible { outline: 2px solid ${ring}; outline-offset: 3px; }
        .${p} .${p}-cta { transition: background .45s ${E1}, color .45s ${E1}, box-shadow .45s ${E1}; }
        .${p} .${p}-cta .${p}-ca { transition: transform .5s ${E1}; }
        .${p} .${p}-cta:hover .${p}-ca { transform: translateX(4px); }
        @media (prefers-reduced-motion: reduce) { .${p} * { animation: none !important; transition: none !important; } }
      `}</style>

      <div style={{ display: 'flex', flexDirection: compact ? 'column' : 'row', alignItems: compact ? 'flex-start' : 'flex-end', justifyContent: 'space-between', gap: compact ? 24 : 40, marginBottom: compact ? 32 : 48 }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: muted, marginBottom: compact ? 12 : 18 }}>{eyebrow}</div>
          <h2 style={{ margin: 0, fontFamily: display, fontWeight: 400, fontSize: compact ? 40 : Math.round(Math.min(64, width * 0.046)), lineHeight: 1.02, letterSpacing: serifLike ? '-0.015em' : '-0.04em' }}>
            {headline.split(' ').map((w, i, arr) => (
              <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', paddingBottom: '0.1em', marginBottom: '-0.1em' }}>
                <span style={{ display: 'inline-block', transform: shown ? 'none' : 'translateY(105%)', transition: reduced ? 'none' : `transform 1000ms ${E1} ${60 + i * 50}ms` }}>{w}{i < arr.length - 1 ? ' ' : ''}</span>
              </span>
            ))}
          </h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div role="radiogroup" aria-label="Billing period" onKeyDown={onToggleKey}
            style={{ position: 'relative', display: 'inline-flex', padding: 4, borderRadius: 999, background: card, boxShadow: `inset 0 0 0 1px ${border}` }}>
            {knob && (
              <span aria-hidden="true" style={{
                position: 'absolute', left: 0, top: knob.y, height: knob.h, width: knob.w, borderRadius: 999, background: text,
                transform: `translateX(${knob.x}px)`,
                transition: reduced ? 'none' : `transform 640ms cubic-bezier(.34,1.36,.5,1), width 640ms cubic-bezier(.34,1.36,.5,1)`,
              }} />
            )}
            {[monthlyLabel, yearlyLabel].map((l, i) => {
              const on = (i === 1) === yearly;
              return (
                <button key={i} ref={(el) => { optRefs.current[i] = el; }} type="button" role="radio" aria-checked={on} tabIndex={on ? 0 : -1}
                  className={`${p}-opt`} onClick={() => setBilling(i === 1)}
                  style={{ ...btnReset, position: 'relative', zIndex: 1, height: 42, padding: '0 22px', borderRadius: 999, fontSize: 14, color: on ? card : text, transition: reduced ? 'none' : `color .4s ${E1} .08s` }}>
                  {l}
                </button>
              );
            })}
          </div>
          <span key={`tag${yearly ? flips : 'm'}`} aria-live="polite" style={{
            display: 'inline-block', padding: '7px 12px', borderRadius: 999, fontSize: 12, fontWeight: 500, letterSpacing: '0.01em',
            background: yearly ? accent : 'transparent', color: yearly ? text : muted, boxShadow: yearly ? 'none' : `inset 0 0 0 1px ${border}`,
            transform: yearly ? 'rotate(-3deg)' : 'none',
            animation: yearly && !reduced ? `${p}-pop 620ms cubic-bezier(.34,1.4,.5,1) both` : 'none',
            transition: 'background .3s, color .3s',
          }}>{saveLabel}</span>
        </div>
      </div>

      <div ref={gridRef} style={{ position: 'relative', display: 'grid', gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gap: compact ? 16 : 20, alignItems: 'stretch' }} onMouseLeave={() => setHover(-1)}>
        {ringRect && (
          <motion.span
            aria-hidden="true"
            initial={false}
            animate={{ x: ringRect.x, y: ringRect.y + (compact ? 0 : -10), width: ringRect.w, height: ringRect.h }}
            transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 28, mass: 0.9 }}
            style={{ position: 'absolute', left: 0, top: 0, zIndex: 2, borderRadius: 22, boxShadow: `0 0 0 1.5px ${ring}`, pointerEvents: 'none', opacity: shown ? 1 : 0, transition: reduced ? 'none' : `opacity 700ms ${E1} ${600 + featured * 110}ms` }}
          />
        )}
        {plans.map((pl, i) => {
          const lifted = target === i && !compact;
          const isFeatured = i === featured;
          const val = yearly ? pl.yearly : pl.monthly;
          const other = yearly ? pl.monthly : pl.yearly;
          const baseDelay = 250 + i * 110;
          return (
            <article
              key={i}
              ref={(el) => { cardRefs.current[i] = el; }}
              onMouseEnter={() => setHover(i)}
              aria-label={`${pl.name} plan`}
              style={{
                position: 'relative', zIndex: 1, background: card, borderRadius: 22, boxShadow: lifted ? `0 30px 60px -30px rgba(28,25,23,.28), inset 0 0 0 1px ${border}` : `inset 0 0 0 1px ${border}`,
                padding: compact ? 24 : 32, display: 'flex', flexDirection: 'column',
                transform: lifted ? 'translateY(-10px)' : 'none', opacity: shown ? 1 : 0,
                transition: reduced ? 'none' : `transform 700ms ${E1}, box-shadow 600ms ${E1}, opacity 700ms ${E1} ${baseDelay}ms`,
                animation: !reduced && shown ? `${p}-in 900ms ${E1} ${baseDelay}ms both` : 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, minHeight: 26 }}>
                <span style={{ fontSize: 15, fontWeight: 500 }}>{pl.name}</span>
                {isFeatured && <span style={{ fontSize: 11, letterSpacing: '0.06em', padding: '5px 10px', borderRadius: 999, background: `${text}0d`, color: text }}>{featuredLabel}</span>}
              </div>
              <p style={{ margin: '8px 0 0', fontSize: 14, lineHeight: 1.5, color: muted, fontWeight: 300 }}>{pl.desc}</p>

              <div style={{ marginTop: compact ? 22 : 30, display: 'flex', alignItems: 'flex-start', gap: 4, fontFamily: display, fontWeight: 400, fontSize: priceSize, lineHeight: 1, letterSpacing: serifLike ? '-0.01em' : '-0.04em' }}>
                <span style={{ fontSize: '0.42em', marginTop: '0.18em', marginRight: 2, color: muted }}>{currency}</span>
                <span role="text" aria-label={`${currency}${val} ${perLabel}`}>{odometer(val, other, i)}</span>
                <span style={{ alignSelf: 'flex-end', fontFamily: sans, fontSize: 13, letterSpacing: 0, color: muted, marginLeft: 8, marginBottom: '0.5em' }}>{perLabel}</span>
              </div>
              <div style={{ position: 'relative', height: 18, marginTop: 10, overflow: 'hidden', fontSize: 12, color: muted }}>
                {[monthlyNote, yearlyNote].map((n, k) => {
                  const on = (k === 1) === yearly;
                  return (
                    <span key={k} style={{ position: 'absolute', left: 0, top: 0, whiteSpace: 'nowrap', transform: on ? 'none' : `translateY(${k === 1 ? 100 : -100}%)`, opacity: on ? 1 : 0, transition: reduced ? 'none' : `transform 700ms ${E2} ${i * 60}ms, opacity 500ms ease ${i * 60}ms` }}>
                      {k === 1 && pl.monthly !== '0' ? `${n} — ${currency}${(parseInt(pl.yearly, 10) * 12).toLocaleString()} / year` : n}
                    </span>
                  );
                })}
              </div>

              <a href="#" onClick={(e) => e.preventDefault()} className={`${p}-cta`}
                style={{ marginTop: compact ? 20 : 26, display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 50, padding: '0 20px', borderRadius: 999, textDecoration: 'none', fontSize: 14, fontWeight: 500, background: lifted || compact && isFeatured ? text : 'transparent', color: lifted || compact && isFeatured ? card : text, boxShadow: lifted ? 'none' : `inset 0 0 0 1px ${text}26` }}>
                <span>{ctaLabel}</span>
                <svg className={`${p}-ca`} width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.3" /></svg>
              </a>

              <ul style={{ listStyle: 'none', margin: compact ? '22px 0 0' : '28px 0 0', padding: 0 }}>
                {pl.features.map((f, k) => {
                  const d = baseDelay + 380 + k * 70;
                  return (
                    <li key={k} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 0', fontSize: 14, fontWeight: 400, opacity: shown ? 1 : 0, transform: shown ? 'none' : 'translateX(-8px)', transition: reduced ? 'none' : `opacity 600ms ${E1} ${d}ms, transform 700ms ${E1} ${d}ms` }}>
                      {check(`${k}-${flips}`, flips ? k * 60 + i * 40 : d)}
                      {f}
                    </li>
                  );
                })}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}

/**
 * ThumbRenderer - renders one library component alone, for live thumbnails.
 *
 *   ?thumb=<componentId>                 window is the scroll container
 *   ?thumb=<componentId>&scroller=element  mimics the studio canvas: an inner
 *                                         overflow:auto box is the scroller
 *
 * Loaded in an <iframe> by the library cards, so a component's fixed
 * positioning, global listeners and styles can never leak into the studio.
 * The parent can post {type:'thumb-autoscroll', on:boolean} to make
 * scroll-driven components play their story while a card is hovered.
 */
import React, { useEffect, useRef, useState } from 'react';

const BASE = process.env.PUBLIC_URL || '';
const params = new URLSearchParams(window.location.search);
const THUMB_ID = params.get('thumb');
const ELEMENT_SCROLLER = params.get('scroller') === 'element';

function loadBabel() {
  if (window.Babel) return Promise.resolve();
  try {
    // same-origin parent (the studio) usually has Babel already; reuse it instead of re-downloading
    if (window.parent !== window && window.parent.Babel) { window.Babel = window.parent.Babel; return Promise.resolve(); }
  } catch (e) { /* cross-origin parent */ }
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.5/babel.min.js';
    s.onload = resolve;
    s.onerror = () => reject(new Error('Failed to load Babel'));
    document.head.appendChild(s);
  });
}

async function loadComponent(id) {
  const index = await (await fetch(`${BASE}/components-library.json`)).json();
  const entry = index.find(c => c.id === id);
  if (!entry) throw new Error(`Unknown component: ${id}`);
  const map = await (await fetch(`${BASE}/${entry.file}`, { cache: 'no-cache' })).json();
  const code = map[id];
  if (!code) throw new Error(`No code for ${id}`);
  const config = {};
  const match = code.match(/const\s+MANIFEST\s*=\s*({[\s\S]*?});/);
  if (match) {
    // eslint-disable-next-line no-eval
    const manifest = eval('(' + match[1] + ')');
    const data = (manifest.editorElement && manifest.editorElement.data) || {};
    Object.keys(data).forEach(k => { config[k] = data[k].defaultValue; });
  }
  return { code, config };
}

function useScrollPosition() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const s = window.getScrollContainer();
    const read = () => setY(s === window ? window.scrollY : s.scrollTop);
    read();
    s.addEventListener('scroll', read, { passive: true });
    return () => s.removeEventListener('scroll', read);
  }, []);
  return y;
}

function post(type, extra) {
  if (window.parent !== window) window.parent.postMessage({ type, id: THUMB_ID, ...extra }, '*');
}

class Boundary extends React.Component {
  constructor(p) { super(p); this.state = { error: null }; }
  static getDerivedStateFromError(error) { return { error }; }
  componentDidCatch(error) { console.error('[thumb] render error:', error); post('thumb-error', { message: String(error && error.message) }); }
  render() {
    if (this.state.error) return <ThumbMessage text={String(this.state.error.message || this.state.error)} />;
    return this.props.children;
  }
}

function ThumbMessage({ text }) {
  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'system-ui, sans-serif', fontSize: 28, color: '#71717A', background: '#F4F4F5', padding: 40, textAlign: 'center' }}>
      {text}
    </div>
  );
}

export default function ThumbRenderer() {
  const [Comp, setComp] = useState(null);
  const [config, setConfig] = useState({});
  const [error, setError] = useState(null);
  const scrollerRef = useRef(null);

  useEffect(() => {
    document.documentElement.style.margin = '0';
    document.body.style.margin = '0';
    if (ELEMENT_SCROLLER) document.body.style.overflow = 'hidden';
    const getScroller = () => (ELEMENT_SCROLLER ? scrollerRef.current || window : window);
    window.getScrollContainer = getScroller;

    let cancelled = false;
    (async () => {
      try {
        const [{ code, config: cfg }] = await Promise.all([loadComponent(THUMB_ID), loadBabel()]);
        const out = window.Babel.transform(code, { presets: ['react'] }).code;
        // eslint-disable-next-line no-new-func
        const factory = new Function('React', 'useState', 'useRef', 'useEffect', 'config', 'getScrollContainer', 'useScrollPosition',
          `${out}\nreturn Component;`);
        const C = factory(React, React.useState, React.useRef, React.useEffect, cfg, getScroller, useScrollPosition);
        if (!cancelled) { setConfig(cfg); setComp(() => C); }
      } catch (err) {
        console.error('[thumb] load error:', err);
        if (!cancelled) { setError(err.message); post('thumb-error', { message: err.message }); }
      }
    })();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!Comp) return;
    const t = setTimeout(() => post('thumb-ready'), 700);
    return () => clearTimeout(t);
  }, [Comp]);

  // hover-driven autoscroll: ping-pong through the scrollable length
  useEffect(() => {
    let raf = null;
    let dir = 1;
    let last = 0;
    const step = (now) => {
      const s = ELEMENT_SCROLLER ? scrollerRef.current : document.scrollingElement;
      if (!s) return;
      const dt = last ? Math.min(64, now - last) : 16;
      last = now;
      const max = s.scrollHeight - s.clientHeight;
      if (max > 4) {
        const speed = (max / 4000) * dt; // full length in ~4s regardless of frame rate
        s.scrollTop = Math.min(max, Math.max(0, s.scrollTop + dir * speed));
        if (s.scrollTop >= max - 1) dir = -1;
        if (s.scrollTop <= 0) dir = 1;
      }
      raf = requestAnimationFrame(step);
    };
    const onMsg = (e) => {
      if (!e.data || e.data.type !== 'thumb-autoscroll') return;
      cancelAnimationFrame(raf);
      if (e.data.on) { dir = 1; last = 0; raf = requestAnimationFrame(step); }
    };
    window.addEventListener('message', onMsg);
    return () => { window.removeEventListener('message', onMsg); cancelAnimationFrame(raf); };
  }, []);

  if (error) return <ThumbMessage text={error} />;
  if (!Comp) return null;

  const content = <Boundary><Comp config={config} /></Boundary>;
  if (!ELEMENT_SCROLLER) return <div data-scroll-container="true">{content}</div>;
  return (
    <div ref={scrollerRef} data-canvas-scroller="true" style={{ height: '100vh', overflow: 'auto' }}>
      <section style={{ minHeight: '100vh', position: 'relative', isolation: 'isolate', overflowX: 'clip' }}>
        <div data-scroll-container="true">{content}</div>
      </section>
    </div>
  );
}

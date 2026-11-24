import React from 'react';
import ReactDOM from 'react-dom/client';
import * as Motion from 'framer-motion';
import './index.css';
import reportWebVitals from './reportWebVitals';

// Expose React and Framer Motion as globals for studio-authored components.
//
// Framer Motion must be bundled rather than loaded from a CDN so that it shares
// this app's React instance. A second React copy would make framer-motion's
// internal hooks run against the wrong dispatcher and every motion component
// would throw "Invalid hook call".
window.React = React;
window.Motion = window.FramerMotion = Motion;

window.motion = Motion.motion;
window.AnimatePresence = Motion.AnimatePresence;
window.useScroll = Motion.useScroll;
window.useTransform = Motion.useTransform;
window.useSpring = Motion.useSpring;
window.useInView = Motion.useInView;
window.useAnimation = Motion.useAnimation;
window.useMotionValue = Motion.useMotionValue;
window.useMotionTemplate = Motion.useMotionTemplate;
window.useVelocity = Motion.useVelocity;

const root = ReactDOM.createRoot(document.getElementById('root'));

// Library thumbnails load this same page in an iframe with ?thumb=<id>; that path
// gets a chunk with only the renderer, not the studio and its database clients.
const isThumb = new URLSearchParams(window.location.search).has('thumb');

(isThumb ? import('./ThumbRenderer') : import('./App')).then(({ default: Root }) => {
  root.render(isThumb ? <Root /> : <React.StrictMode><Root /></React.StrictMode>);
});

if (!isThumb) reportWebVitals();

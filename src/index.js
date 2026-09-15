import React from 'react';
import ReactDOM from 'react-dom/client';
import * as Motion from 'framer-motion';
import './index.css';
import App from './App';
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
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

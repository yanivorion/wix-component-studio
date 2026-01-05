# Framer Motion Integration ✅

## What Was Added

Framer Motion (v11.0.8) is now fully integrated into your Wix Component Studio playground!

### 1. Library Integration (`public/index.html`)

Added Framer Motion CDN and exposed all key features globally:

```html
<!-- Framer Motion Animation Library -->
<script src="https://unpkg.com/framer-motion@11.0.8/dist/framer-motion.js"></script>
<script>
  // Expose Framer Motion to global scope
  window.motion = window.FramerMotion.motion;
  window.AnimatePresence = window.FramerMotion.AnimatePresence;
  window.useScroll = window.FramerMotion.useScroll;
  window.useTransform = window.FramerMotion.useTransform;
  window.useSpring = window.FramerMotion.useSpring;
  window.useInView = window.FramerMotion.useInView;
  window.useAnimation = window.FramerMotion.useAnimation;
  window.useMotionValue = window.FramerMotion.useMotionValue;
  window.useMotionTemplate = window.FramerMotion.useMotionTemplate;
  window.useVelocity = window.FramerMotion.useVelocity;
</script>
```

### 2. System Prompt Updated (`src/systemPrompt.js`)

Added **Rule 2.8: Framer Motion Library Usage** with comprehensive examples and patterns.

---

## Available Framer Motion Features

### Core Components
- `motion.div`, `motion.span`, `motion.button`, etc. - Animated versions of HTML elements
- `AnimatePresence` - For exit animations and transitions

### Hooks
- `useAnimation()` - Programmatic animation controls
- `useScroll()` - Track scroll position and progress
- `useTransform()` - Transform values based on input ranges
- `useSpring()` - Physics-based spring animations
- `useInView()` - Detect when elements enter viewport
- `useMotionValue()` - Create reactive motion values
- `useMotionTemplate()` - String interpolation for motion values
- `useVelocity()` - Track velocity of motion values

---

## Usage in Generated Components

### Basic Animation

```javascript
function Component({ config = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      Content
    </motion.div>
  );
}
```

### Interactive Animations

```javascript
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 300 }}
>
  Click Me
</motion.button>
```

### Exit Animations

```javascript
function Component({ config = {} }) {
  const [show, setShow] = React.useState(true);
  
  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          Content
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

### Scroll-Linked Animations

```javascript
function Component({ config = {} }) {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  
  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity }}
    >
      Scroll-animated content
    </motion.div>
  );
}
```

### Viewport Detection

```javascript
function Component({ config = {} }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      Appears when scrolled into view
    </motion.div>
  );
}
```

### Stagger Children

```javascript
function Component({ config = {} }) {
  const items = ['Item 1', 'Item 2', 'Item 3'];
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
    >
      {items.map((item, i) => (
        <motion.div
          key={i}
          variants={{
            hidden: { opacity: 0, x: -20 },
            visible: { opacity: 1, x: 0 }
          }}
        >
          {item}
        </motion.div>
      ))}
    </motion.div>
  );
}
```

---

## Best Practices

### ✅ DO
- Use `motion.*` components for elements that need animation
- Provide `key` prop for AnimatePresence children
- Use `useInView` for performance (animate only visible elements)
- Combine with GSAP for complex timeline sequences
- Use `layout` prop for automatic layout animations
- Leverage `variants` for coordinated animations

### ❌ DON'T
- Don't import Framer Motion (it's global)
- Don't forget cleanup in useEffect for animation controllers
- Don't animate too many elements simultaneously (performance)
- Don't use with CSS transitions (conflicts)

---

## Component Use Cases

### Perfect For:
1. **Hero sections** - Entrance animations
2. **Carousels** - Smooth slide transitions
3. **Modals/Overlays** - Enter/exit animations
4. **Lists** - Stagger animations
5. **Scroll effects** - Parallax, reveal on scroll
6. **Interactive buttons** - Hover/tap feedback
7. **Page transitions** - AnimatePresence
8. **Drag interactions** - Built-in drag support
9. **Form validation** - Shake/bounce feedback
10. **Loading states** - Skeleton animations

---

## Integration Complete ✅

Framer Motion is now available alongside:
- ✅ **GSAP** - Timeline-based animations
- ✅ **Three.js** - 3D/WebGL graphics
- ✅ **React** - Component framework

Your component playground now supports the most powerful animation and 3D libraries in the React ecosystem!

---

## Testing

To verify Framer Motion works:

1. Go to https://yanivorion.github.io/wix-component-studio/
2. Paste this test component:

```javascript
const MANIFEST = {
  "type": "Test.FramerMotion",
  "description": "Test Framer Motion",
  "editorElement": {
    "selector": ".test",
    "displayName": "Test"
  }
};

function Component({ config = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.1 }}
      style={{
        padding: '40px',
        backgroundColor: '#495057',
        color: 'white',
        borderRadius: '12px',
        display: 'inline-block'
      }}
    >
      Framer Motion Works! 🎉
    </motion.div>
  );
}
```

3. You should see the element fade in and scale, then grow on hover

---

## Next Steps

Now you can generate sophisticated components using:
- **Framer Motion** for declarative animations
- **GSAP** for complex timelines
- **Three.js** for 3D graphics
- **React** for component logic

The possibilities are endless! 🚀


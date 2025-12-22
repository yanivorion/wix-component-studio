# Canvas Sizing & Responsive Behavior

## 🎯 The Two-Layer System

### Layer 1: Canvas (Always Actual Width)
The **canvas** is always the real viewport size you select:
- 390px → Canvas is literally 390px wide
- 670px → Canvas is literally 670px wide  
- 1280px → Canvas is literally 1280px wide

### Layer 2: Components (Scale with Responsive Mode)
**Components inside** the canvas can scale based on "Responsive Mode":
- **Responsive OFF**: Components fill canvas at 100% (natural adaptation)
- **Responsive ON**: Components scale intelligently based on width ranges

---

## Responsive Mode: ON vs OFF

### 📱 At 390px-700px (Mobile Range)

**Responsive Mode OFF:**
- Component fills the 390-700px canvas naturally
- Good for: Testing true mobile-first designs

**Responsive Mode ON:**
- Component designed at 1280px scales down proportionally
- Scale: `canvasWidth / 1280` (e.g., 390px = 30.5% scale)
- Good for: Testing how desktop designs look scaled to mobile

---

### 📱 At 701px-1023px (Tablet Range)

**Responsive Mode OFF:**
- Component fills the 701-1023px canvas naturally
- Good for: Testing tablet-specific layouts

**Responsive Mode ON:**
- Component fills canvas naturally (NO scaling in this range)
- Exception: Scales when "100vh Mode" is enabled
- Good for: Testing true responsive CSS breakpoints

---

### 💻 At 1024px-1920px (Desktop Range)

**Responsive Mode OFF:**
- Component fills the 1024-1920px canvas naturally
- Good for: Testing fluid responsive designs

**Responsive Mode ON:**
- Component designed at 1280px scales proportionally
- Scale: `canvasWidth / 1280` (e.g., 1920px = 150% scale)
- Good for: Testing how designs scale to larger displays

---

### 🖥️ At 1921px+ (Ultra-Wide)

**Responsive Mode OFF:**
- Component fills the canvas naturally (unlimited width)
- Good for: Testing ultra-wide layouts

**Responsive Mode ON:**
- Component scales to maximum 1.5x (frozen)
- Prevents excessive scaling on ultra-wide displays

---

## Quick Decision Guide

### Use Responsive Mode OFF when:
- ✅ Testing mobile-first designs
- ✅ Component has proper media queries
- ✅ Want to see natural responsive behavior
- ✅ Testing true viewport adaptation

### Use Responsive Mode ON when:
- ✅ Testing desktop design scaled to mobile
- ✅ Simulating how large designs compress
- ✅ Testing scaling behavior at different sizes
- ✅ Component designed at fixed 1280px base

---

## Example: Testing at 670px

### Scenario A: Responsive OFF
```
Canvas: 670px wide (actual)
Component: Fills 670px naturally
Use case: Mobile-first component testing
```

### Scenario B: Responsive ON
```
Canvas: 670px wide (actual)
Component: 1280px design scaled to 52.3%
Use case: Desktop design shrunk to mobile
```

---

## Width Ranges Summary

| Canvas Width | Responsive OFF | Responsive ON |
|-------------|----------------|---------------|
| **390-700px** | Fills canvas naturally | Scales from 1280px base (30%-55%) |
| **701-1023px** | Fills canvas naturally | Natural (no scale) unless 100vh ON |
| **1024-1920px** | Fills canvas naturally | Scales from 1280px base (80%-150%) |
| **1921px+** | Fills canvas naturally | Capped at 1.5x scale |

---

## The 1280px Base Design

When **Responsive Mode is ON**, components are assumed to be designed at **1280px width**:
- This is the "reference width"
- Below 1280px → Scales down (mobile testing)
- Above 1280px → Scales up (large display testing)
- At 1280px → 1:1 scale (100%)

---

## Testing Strategies

### Strategy 1: Mobile-First Component
```
1. Set Responsive: OFF
2. Design at 390px
3. Slide to 1920px
4. Component should adapt naturally with CSS
```

### Strategy 2: Desktop-First Component  
```
1. Set Responsive: ON
2. Design at 1280px
3. Slide to 390px
4. See how it scales down to mobile
```

### Strategy 3: Hybrid Testing
```
1. Test with Responsive ON (see scaling)
2. Test with Responsive OFF (see natural adaptation)
3. Compare both approaches
4. Pick best strategy for your component
```

---

## Additional Controls

### Zoom (50%-200%)
- **Separate** from canvas width and responsive mode
- **Purpose**: Visual magnification for inspection
- **Does NOT affect**: Layout, viewport size, or component behavior

### 100vh Mode (Fixed Section Mode)
- Forces sections to 720px height
- Enables scrolling within sections
- In 701-1023px range: Enables scaling even with Responsive ON

### Preview Mode
- Removes canvas frame/shadow
- Component behavior is identical
- Use for final preview without editor UI

---

## Common Use Cases

### Use Case 1: "Does my desktop site scale to mobile?"
```
- Set canvas to 390px
- Enable Responsive: ON
- Your 1280px design scales to 30.5%
- See if content is readable/usable
```

### Use Case 2: "Is my mobile-first design responsive?"
```
- Set canvas to 390px
- Enable Responsive: OFF
- Slide to 1920px
- Component should adapt naturally
```

### Use Case 3: "Testing at real mobile width"
```
- Set canvas to 390px (real iPhone SE width)
- Enable Responsive: OFF
- Component fills actual 390px viewport
- True-to-device testing
```

### Use Case 4: "How does my design scale to large displays?"
```
- Set canvas to 1920px
- Enable Responsive: ON
- Your 1280px design scales to 150%
- Check if everything looks good scaled up
```

---

## Troubleshooting

### Issue: Component too small on mobile
**Solution**: 
- If Responsive ON: This is expected (desktop design scaled down)
- If Responsive OFF: Add better mobile CSS

### Issue: Component not filling canvas
**Solution**:
- Responsive OFF: Check your component has `width: 100%`
- Responsive ON: Component should be designed at 1280px width

### Issue: Component breaks at certain width
**Solution**:
- Add media queries for that breakpoint
- Or adjust your scaling strategy

### Issue: Confusing scaling behavior
**Solution**:
- Try toggling Responsive OFF first (simpler)
- Canvas width always shows actual viewport
- Responsive toggle only affects component scaling

---

## Best Practices

1. **Start simple**: Begin with Responsive OFF to see natural behavior
2. **Test both modes**: Compare scaled vs natural adaptation
3. **Design at 1280px**: If using Responsive ON, design for 1280px base
4. **Use media queries**: Even with scaling, good CSS helps
5. **Mobile-first is better**: Build responsive components, use Responsive OFF
6. **Desktop-first legacy**: Use Responsive ON to see how they scale

---

## Technical Details

### Canvas Container (Always Actual Width)
```javascript
<div style={{
  width: `${canvasSize.width}px`,  // Real viewport size
  margin: '0 auto',
  transform: `scale(${zoomLevel / 100})`,  // Only zoom
}}>
```

### Component Wrapper (Scales with Responsive Mode)
```javascript
// Responsive OFF
{ width: '100%', height: '100%' }

// Responsive ON (390-700px)
{ 
  width: '1280px',
  transform: `scale(${width / 1280})`,
  transformOrigin: 'top left'
}

// Responsive ON (1024-1920px)
{ 
  width: '1280px',
  transform: `scale(${width / 1280})`,
  transformOrigin: 'top left'
}
```

---

## Summary

✅ **Canvas = Always Real Width**: What you select is the actual viewport
✅ **Responsive Toggle = Scaling Control**: ON = scale from 1280px, OFF = natural
✅ **Two Testing Modes**: Scale testing vs Natural responsive testing
✅ **Flexible Workflow**: Choose the approach that fits your component

**The canvas is the actual viewport, Responsive Mode controls how components adapt within it** 🎯

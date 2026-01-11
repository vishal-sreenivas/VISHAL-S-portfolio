# Animation System - Quick Reference Guide

## 🎬 For Each Section Type

### Timeline Sections (Experience, Education)
```jsx
import { TimelineItemReveal } from '../utils/scrollAnimations.jsx';

// Usage
{items.map((item, i) => (
  <TimelineItemReveal
    key={i}
    index={i}
    staggerDelay={0.2}      // Experience uses 0.2, Education uses 0.15
    duration={0.7}
    className="timeline-item"
  >
    {/* Item content */}
  </TimelineItemReveal>
))}
```
**Effect**: Fade + Left-slide (x: -40→0), no rotation
**Duration**: 0.7s per item
**Best for**: Chronological content, work history, education

---

### Form/CTA Sections (Contact)
```jsx
import { SoftCTA } from '../utils/scrollAnimations.jsx';

// Usage
<SoftCTA 
  duration={0.8} 
  delay={0.3}
  scaleAmount={0.05}
  parallaxAmount={20}
>
  {/* Form content */}
</SoftCTA>
```
**Effect**: Gentle scale-up (95%→100%) + fade + light parallax
**Duration**: 0.8s
**Best for**: Forms, call-to-action buttons, inviting content

---

### Hero/Title Sections (Hero, main headings)
```jsx
import { TextFadeSlide } from '../utils/scrollAnimations.jsx';

// Usage
<TextFadeSlide 
  direction="up" 
  duration={0.8} 
  delay={0.4}     // Stagger between elements: 0.2s, 0.4s, 0.6s, 0.8s, 1.0s
>
  {/* Text content */}
</TextFadeSlide>
```
**Effect**: Fade (0→1) + Slide from bottom
**Duration**: 0.7-0.8s per element
**Best for**: Hero text, headlines, introductions

---

### Floating Cards/Portfolios (Projects)
```jsx
import { FloatingCardReveal } from '../utils/scrollAnimations.jsx';

// Usage
<FloatingCardReveal 
  offset={90}           // Parallax intensity: use 90 for projects, 80 for hero
  rotation={8}          // Gentle rotation: 8° for projects
  startOffset={300}     // Scroll distance before animation starts
>
  {/* Card content */}
</FloatingCardReveal>
```
**Effect**: Parallax offset + rotation + staggered entry
**Duration**: Smooth transition
**Best for**: Portfolio projects, card grids, gallery items

---

### Text Reveals (About, descriptions)
```jsx
import { SoftScrollReveal } from '../utils/scrollAnimations.jsx';

// Usage
<SoftScrollReveal 
  direction="left"      // Options: "left", "right", "up", "down"
  duration={0.8}
  delay={0.2}
>
  {/* Text content */}
</SoftScrollReveal>
```
**Effect**: Fade + Directional slide, no rotation
**Duration**: 0.8s
**Best for**: Paragraph text, descriptions, explanatory content

---

### Staggered Lists (Skills, etc)
```jsx
// Built-in Framer Motion pattern
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }  // 0.1s between items
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6 } 
  }
};

// Usage
<motion.div variants={containerVariants} initial="hidden" animate="visible">
  {items.map((item, i) => (
    <motion.div key={i} variants={itemVariants}>
      {/* Item */}
    </motion.div>
  ))}
</motion.div>
```
**Effect**: Items appear one-by-one with fade + slide-up
**Stagger**: 0.1s between items
**Best for**: Skill lists, category cards, sequential content

---

## ⏱️ Timing Cheat Sheet

```
Hero/Intro Text:      0.8s duration, 0.2-0.4s delay between elements
Timeline Items:       0.7s duration, 0.15-0.2s stagger between items
Cards:                0.6-0.8s duration, varies by use
CTA/Forms:            0.8s duration, 0.3s delay
Text Reveals:         0.8s duration, 0.2s delay
```

---

## 🎯 Animation Selector Guide

**Choose based on content:**

| Content Type | Animation | Offset | Rotation | Stagger |
|---|---|---|---|---|
| Hero/Title | TextFadeSlide | 80px | 0° | 0.2-0.4s |
| Work history | TimelineItemReveal | - | 0° | 0.2s |
| Education | TimelineItemReveal | - | 0° | 0.15s |
| Projects | FloatingCardReveal | 90px | 8° | varies |
| Skills | Staggered items | - | 0° | 0.1s |
| Contact form | SoftCTA | 20px | 0° (scale only) | 0.3s |
| Descriptions | SoftScrollReveal | - | 0° | 0.2s |

---

## 🚀 Common Customizations

### Make parallax more intense
```jsx
// Instead of
<FloatingCardReveal offset={90} rotation={8}>

// Change to
<FloatingCardReveal offset={120} rotation={12}>
```

### Slow down animations
```jsx
// Instead of duration={0.7}
// Change to duration={1.0}
```

### Speed up stagger
```jsx
// Instead of staggerDelay={0.2}
// Change to staggerDelay={0.1}
```

### Reduce motion impact
```jsx
// Instead of scaleAmount={0.05}
// Change to scaleAmount={0.02}
```

---

## ♿ Accessibility Checklist

- [x] All animations check `usePrefersReducedMotion()`
- [x] Duration becomes 0 when motion is reduced
- [x] Content still visible (no animation completely hides content)
- [x] Animation doesn't interfere with tab order
- [x] Focus indicators visible

**Testing accessibility:**
- macOS: System Preferences > Accessibility > Display > Reduce motion
- Windows: Settings > Ease of Access > Display > Show animations
- Dev Tools: DevTools Console > `matchMedia('(prefers-reduced-motion: reduce)').matches` → should return true

---

## 🐛 Troubleshooting

### Animation not triggering
- Check `amount: 0.2` in `useInView` (20% visible threshold)
- Verify element has ref connected
- Check browser DevTools for JS errors
- Ensure `animate` prop is set correctly

### Animation too fast/slow
- Adjust `duration` prop (currently 0.6-0.9s)
- Adjust `delay` prop for stagger
- Check `transition` object for override values

### Rotation looks weird
- Ensure rotation is 0° for timeline/text content
- Use rotation only for floating cards (8°)
- Check `transform: rotateX/Y/Z` in CSS doesn't conflict

### Stagger not working
- Verify `staggerChildren` in container variants
- Check item is using `variants={itemVariants}`
- Ensure parent has `initial`, `animate`, `variants` props

---

## 📊 Performance Tips

1. **Use `once: true`** - Animation runs single time, saves memory
   ```jsx
   <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
   ```

2. **Use transforms only** - GPU accelerated
   ```jsx
   // Good
   transition={{ duration: 0.8, ease: 'easeOut' }}
   
   // Bad (layout thrashing)
   animate={{ width: "100%" }} // Use maxWidth instead
   ```

3. **Stagger for lists, not grids** - Better visual rhythm
   ```jsx
   // Good: staggerChildren with container
   
   // Avoid: Individual delay={i*0.1} for each element
   ```

4. **Reduce motion on mobile** - Optional refinement
   ```jsx
   // For low-end devices, reduce parallax by half
   ```

---

## 📚 Component Import Template

```jsx
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  TimelineItemReveal,    // For timelines
  SoftCTA,               // For forms/CTAs
  SoftScrollReveal,      // For text reveals
  TextFadeSlide,         // For hero text
  FloatingCardReveal     // For portfolio projects
} from '../utils/scrollAnimations.jsx';

// Rest of component...
```

---

## ✨ Best Practices

1. **Consistent timing** - Use standard durations (0.7-0.8s)
2. **easeOut only** - No spring physics for professional feel
3. **Respect accessibility** - Always check prefers-reduced-motion
4. **Stagger wisely** - 0.1-0.2s between items feels natural
5. **Less is more** - Animate purposefully, not gratuitously
6. **Test on mobile** - Ensure 60fps performance
7. **Document customizations** - Update this guide if you change defaults

---

**Last Updated**: January 12, 2025
**Status**: Production Ready ✅

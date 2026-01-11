# 🎬 Scroll Reveal + Parallax Animation Guide

**Ribbit.dk-Inspired Smooth Motion Effects for Your Portfolio**

---

## 📋 Overview

Your portfolio now includes:
- ✅ **Scroll Reveal Animations** - Fade + slide when elements enter viewport
- ✅ **Parallax Effects** - Subtle depth with slower background movement
- ✅ **Staggered Reveals** - Sequential animations for lists & cards
- ✅ **Accessibility** - Respects `prefers-reduced-motion`
- ✅ **Performance Optimized** - 60fps smooth animations on all devices

---

## 🎯 Available Components & Hooks

### Hooks (For Custom Usage)

#### `useScrollReveal(once, amount)`
Triggers animation when element enters viewport.

```jsx
import { useScrollReveal } from '../utils/scrollAnimations';

const MyComponent = () => {
  const { ref, isVisible } = useScrollReveal(true, 0.2);
  
  return (
    <div ref={ref}>
      {isVisible ? 'Visible!' : 'Not visible'}
    </div>
  );
};
```

**Parameters:**
- `once` (boolean) - Animation plays only once (default: true)
- `amount` (number) - Trigger threshold, 0-1 (default: 0.2 = 20% visible)

---

#### `useParallax(offset)`
Creates parallax effect on scroll.

```jsx
import { useParallax } from '../utils/scrollAnimations';

const ParallaxElement = () => {
  const { ref, y } = useParallax(50);
  
  return (
    <motion.div ref={ref} style={{ y }}>
      Moves slower than scroll
    </motion.div>
  );
};
```

**Parameters:**
- `offset` (number) - Parallax intensity (default: 50, higher = more movement)

---

#### `usePrefersReducedMotion()`
Respects user's accessibility preferences.

```jsx
import { usePrefersReducedMotion } from '../utils/scrollAnimations';

const AnimatedComponent = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  
  return (
    <motion.div
      animate={prefersReducedMotion ? 'noMotion' : 'motion'}
    >
      Content
    </motion.div>
  );
};
```

---

### Components (Ready to Use)

#### `<ScrollReveal>`
Wraps any component with fade + slide animation.

```jsx
import { ScrollReveal } from '../utils/scrollAnimations';

<ScrollReveal direction="up" duration={0.7} delay={0}>
  <h2>This fades in and slides up</h2>
</ScrollReveal>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | 'up'\|'down'\|'left'\|'right' | 'up' | Direction to slide from |
| `duration` | number | 0.7 | Animation duration (seconds) |
| `delay` | number | 0 | Delay before animation starts |
| `once` | boolean | true | Play only once |
| `amount` | number | 0.2 | Viewport visibility threshold |
| `className` | string | "" | Additional CSS classes |

---

#### `<StaggeredReveal>`
Reveals list items sequentially on scroll.

```jsx
import { StaggeredReveal } from '../utils/scrollAnimations';

<StaggeredReveal staggerDelay={0.1} duration={0.6}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</StaggeredReveal>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `staggerDelay` | number | 0.1 | Delay between items (seconds) |
| `duration` | number | 0.6 | Animation duration |
| `once` | boolean | true | Play only once |
| `amount` | number | 0.2 | Viewport threshold |

---

#### `<ParallaxBackground>`
Applies parallax effect to background elements.

```jsx
import { ParallaxBackground } from '../utils/scrollAnimations';

<ParallaxBackground offset={30}>
  <div className="background-element">
    Moves slower on scroll
  </div>
</ParallaxBackground>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `offset` | number | 50 | Parallax intensity |
| `className` | string | "" | CSS classes |

---

#### `<ParallaxImage>`
Image component with built-in parallax.

```jsx
import { ParallaxImage } from '../utils/scrollAnimations';

<ParallaxImage
  src="/image.jpg"
  alt="Parallax"
  offset={40}
  containerClassName="h-96 w-full"
/>
```

---

#### `<FloatingElement>`
Subtle floating/bobbing motion.

```jsx
import { FloatingElement } from '../utils/scrollAnimations';

<FloatingElement duration={4} distance={10}>
  <div>Gently floats</div>
</FloatingElement>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `duration` | number | 4 | Animation cycle (seconds) |
| `distance` | number | 10 | Floating distance (pixels) |

---

#### `<ScaleOnScroll>`
Element grows/shrinks based on scroll position.

```jsx
import { ScaleOnScroll } from '../utils/scrollAnimations';

<ScaleOnScroll minScale={0.8} maxScale={1.2}>
  <div>Scales with scroll</div>
</ScaleOnScroll>
```

---

## 📝 Implementation Examples

### Example 1: Hero Section with Parallax

```jsx
import { Hero } from './components/Hero';
import { ParallaxBackground, ScrollReveal } from './utils/scrollAnimations';

<section id="hero">
  <ParallaxBackground offset={30}>
    <div className="background-gradient"></div>
  </ParallaxBackground>
  
  <ScrollReveal direction="up" duration={0.8}>
    <h1>Welcome</h1>
  </ScrollReveal>
</section>
```

### Example 2: Project Cards with Stagger

```jsx
import { StaggeredReveal } from './utils/scrollAnimations';

<StaggeredReveal staggerDelay={0.15}>
  {projects.map(project => (
    <ProjectCard key={project.id} data={project} />
  ))}
</StaggeredReveal>
```

### Example 3: Skill List with Sequential Reveal

```jsx
import { ScrollReveal } from './utils/scrollAnimations';

{skills.map((skill, idx) => (
  <ScrollReveal key={skill} delay={idx * 0.05}>
    <SkillBadge>{skill}</SkillBadge>
  </ScrollReveal>
))}
```

### Example 4: Full Section with All Effects

```jsx
import { ScrollReveal, ParallaxImage, StaggeredReveal } from './utils/scrollAnimations';

<section className="py-20">
  <ScrollReveal direction="left" duration={0.8}>
    <h2>About</h2>
  </ScrollReveal>
  
  <div className="grid grid-cols-2 gap-8">
    <ParallaxImage 
      src="/profile.jpg" 
      offset={40}
      containerClassName="h-96"
    />
    
    <StaggeredReveal staggerDelay={0.1}>
      <p>Description paragraph 1</p>
      <p>Description paragraph 2</p>
      <p>Description paragraph 3</p>
    </StaggeredReveal>
  </div>
</section>
```

---

## 🎨 Animation Customization

### Adjust Fade + Slide Timing

```jsx
// Slower fade-in
<ScrollReveal duration={1.2} ease="easeOut">
  {children}
</ScrollReveal>

// Faster reveal
<ScrollReveal duration={0.5} delay={0.2}>
  {children}
</ScrollReveal>
```

### Control Parallax Intensity

```jsx
// Subtle (slow movement)
<ParallaxBackground offset={20}>
  {children}
</ParallaxBackground>

// Strong (fast movement)
<ParallaxBackground offset={80}>
  {children}
</ParallaxBackground>
```

### Adjust Stagger Timing

```jsx
// Quick sequential reveal
<StaggeredReveal staggerDelay={0.05} duration={0.4}>
  {items}
</StaggeredReveal>

// Slow, dramatic reveal
<StaggeredReveal staggerDelay={0.3} duration={0.9}>
  {items}
</StaggeredReveal>
```

---

## ♿ Accessibility Features

### Automatic Motion Reduction

The system automatically detects user preferences:

```jsx
// Automatically respects prefers-reduced-motion
// Users with motion sensitivity will see:
// - Instant reveals (no animations)
// - No parallax effects
// - Static elements
```

### Check User Preference Manually

```jsx
import { usePrefersReducedMotion } from './utils/scrollAnimations';

const Component = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  
  return (
    <motion.div
      animate={{
        opacity: prefersReducedMotion ? 1 : [0, 1],
        y: prefersReducedMotion ? 0 : [20, 0]
      }}
    >
      Content
    </motion.div>
  );
};
```

---

## 📱 Mobile Optimization

### Disable Heavy Animations on Mobile

```jsx
const isMobile = window.innerWidth < 768;

<ParallaxBackground offset={isMobile ? 0 : 50}>
  {children}
</ParallaxBackground>
```

### Reduce Stagger on Mobile

```jsx
<StaggeredReveal 
  staggerDelay={isMobile ? 0.05 : 0.15}
  duration={isMobile ? 0.4 : 0.7}
>
  {items}
</StaggeredReveal>
```

---

## 🚀 Performance Tips

1. **Use `will-change` for Hardware Acceleration**
   ```jsx
   <motion.div style={{ willChange: 'transform' }}>
   ```

2. **Limit Active Animations**
   - Don't animate too many elements simultaneously
   - Use `once: true` to prevent constant re-triggering

3. **Optimize Duration & Delay**
   - Keep durations 0.6–0.8s for smooth feel
   - Limit stagger delays to 0.1–0.15s

4. **Test on Real Devices**
   - Use Lighthouse DevTools for performance metrics
   - Aim for 60fps on mobile

---

## 🎯 Integration Checklist

- [ ] Import scroll animation utilities in components
- [ ] Wrap sections with `<ScrollReveal>`
- [ ] Add parallax to hero/background elements
- [ ] Use `<StaggeredReveal>` for lists
- [ ] Test on mobile devices
- [ ] Verify accessibility (prefers-reduced-motion)
- [ ] Check performance with DevTools

---

## 🔗 Files Structure

```
src/
├── utils/
│   └── scrollAnimations.js  (All hooks & components)
├── components/
│   ├── Hero.jsx             (Already updated)
│   ├── Projects.jsx         (Can use StaggeredReveal)
│   ├── Skills.jsx          (Can use StaggeredReveal)
│   └── ... other components
└── App.jsx
```

---

## 🎬 Expected Result

✅ Sections fade and slide in as user scrolls
✅ Background elements move slower (parallax depth)
✅ Lists reveal sequentially with stagger
✅ Smooth, professional motion matching ribbit.dk
✅ Zero impact on users with motion preferences disabled
✅ 60fps performance on all devices

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Animations not triggering | Check `ref` is attached to element |
| Parallax looks choppy | Add `willChange: 'transform'` |
| Motion disabling doesn't work | Verify `prefers-reduced-motion` CSS query |
| Performance slow | Reduce number of animated elements |
| Animation too fast/slow | Adjust `duration` value |

---

## 📚 Related Documentation

- [Framer Motion useScroll](https://www.framer.com/motion/use-scroll/)
- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)

---

**Your portfolio now has smooth, professional animations matching modern agency sites!** ✨

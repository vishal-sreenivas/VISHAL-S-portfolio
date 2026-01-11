import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Parallax Hook
 * Creates smooth parallax effect based on scroll position
 * Works by slowing element movement relative to scroll speed
 */
export const useParallax = (offset = 50) => {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  
  // Transform scroll Y to a slower parallax value
  // Offset determines intensity (higher = more movement)
  const y = useTransform(scrollY, (value) => value * 0.5 - offset);
  
  return { ref, y };
};

/**
 * Scroll Reveal Hook
 * Triggers animations when element enters viewport
 */
export const useScrollReveal = (once = true, amount = 0.2) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold: amount }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [once, amount]);

  return { ref, isVisible };
};

/**
 * Reduced Motion Hook
 * Respects user's prefers-reduced-motion setting
 */
export const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check initial preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes
    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};

/**
 * Parallax Background Component
 * Applies parallax effect to background elements
 */
export const ParallaxBackground = ({ children, offset = 50, className = "" }) => {
  const { ref, y } = useParallax(offset);
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      ref={ref}
      style={prefersReducedMotion ? {} : { y }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * Scroll Reveal Wrapper
 * Wraps any component with fade + slide animation on scroll reveal
 */
export const ScrollReveal = ({
  children,
  once = true,
  amount = 0.2,
  delay = 0,
  direction = 'up', // 'up', 'down', 'left', 'right'
  duration = 0.7,
  className = ""
}) => {
  const { ref, isVisible } = useScrollReveal(once, amount);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Calculate initial position based on direction
  const getInitialPosition = () => {
    const distance = 40;
    switch (direction) {
      case 'down':
        return { opacity: 0, y: -distance };
      case 'left':
        return { opacity: 0, x: -distance };
      case 'right':
        return { opacity: 0, x: distance };
      case 'up':
      default:
        return { opacity: 0, y: distance };
    }
  };

  const initialPosition = getInitialPosition();
  const finalPosition = { opacity: 1, x: 0, y: 0 };

  return (
    <motion.div
      ref={ref}
      initial={initialPosition}
      animate={isVisible ? finalPosition : initialPosition}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration, delay, ease: 'easeOut' }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * Staggered List Reveal
 * Reveals list items one by one on scroll
 */
export const StaggeredReveal = ({
  children,
  once = true,
  amount = 0.2,
  staggerDelay = 0.1,
  duration = 0.6,
  className = ""
}) => {
  const { ref, isVisible } = useScrollReveal(once, amount);
  const prefersReducedMotion = usePrefersReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : duration,
        ease: 'easeOut'
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      className={className}
    >
      {Array.isArray(children)
        ? children.map((child, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
};

/**
 * Parallax Image Component
 * Image with parallax effect for depth
 */
export const ParallaxImage = ({
  src,
  alt,
  offset = 30,
  className = "",
  containerClassName = ""
}) => {
  const { ref, y } = useParallax(offset);
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className={`overflow-hidden ${containerClassName}`}>
      <motion.img
        ref={ref}
        src={src}
        alt={alt}
        style={prefersReducedMotion ? {} : { y }}
        className={className}
      />
    </div>
  );
};

/**
 * Floating Element
 * Subtle floating motion for visual interest
 */
export const FloatingElement = ({
  children,
  duration = 4,
  distance = 10,
  className = ""
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const floatingVariants = {
    animate: {
      y: [0, -distance, 0],
      transition: {
        duration,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <motion.div
      variants={prefersReducedMotion ? {} : floatingVariants}
      animate={prefersReducedMotion ? 'initial' : 'animate'}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * Scale on Scroll
 * Element grows/shrinks based on scroll position
 */
export const ScaleOnScroll = ({
  children,
  minScale = 0.8,
  maxScale = 1.2,
  className = ""
}) => {
  const { scrollY } = useScroll();
  const prefersReducedMotion = usePrefersReducedMotion();

  const scale = useTransform(
    scrollY,
    [0, 500],
    [minScale, maxScale],
    { clamp: false }
  );

  return (
    <motion.div
      style={prefersReducedMotion ? {} : { scale }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * Advanced Scroll Parallax Hook
 * Creates layered parallax effect with rotation, translation, and scale
 * Perfect for agency-style floating card reveals (like Ribbit.dk)
 */
export const useScrollParallax = (
  offset = 50,
  rotateAmount = 8,
  startOffset = 200
) => {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const prefersReducedMotion = usePrefersReducedMotion();

  // Y parallax (slower movement)
  const y = useTransform(
    scrollY,
    [startOffset - 200, startOffset + 500],
    [100, -50],
    { clamp: true }
  );

  // X translation (floating effect)
  const x = useTransform(
    scrollY,
    [startOffset - 200, startOffset + 500],
    [-60, 0],
    { clamp: true }
  );

  // Rotation based on scroll
  const rotate = useTransform(
    scrollY,
    [startOffset - 200, startOffset + 500],
    [rotateAmount, 0],
    { clamp: true }
  );

  // Opacity fade in
  const opacity = useTransform(
    scrollY,
    [startOffset - 200, startOffset],
    [0, 1],
    { clamp: true }
  );

  // Scale (grow into place)
  const scale = useTransform(
    scrollY,
    [startOffset - 200, startOffset + 300],
    [0.9, 1],
    { clamp: true }
  );

  return {
    ref,
    style: prefersReducedMotion
      ? {}
      : {
          y,
          x,
          rotate,
          opacity,
          scale
        }
  };
};

/**
 * Floating Card Reveal Component
 * Cards start offset/rotated/faded, smoothly move into position on scroll
 * Matches modern agency style (Ribbit.dk, Dribbble)
 */
export const FloatingCardReveal = ({
  children,
  offset = 50,
  rotation = 60,
  startOffset = 200,
  className = "",
  delay = 0
}) => {
  const { ref, style } = useScrollParallax(offset, rotation, startOffset + delay * 100);
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      ref={ref}
      style={prefersReducedMotion ? {} : style}
      transition={{
        y: { type: 'spring', stiffness: 60, damping: 20 },
        x: { type: 'spring', stiffness: 60, damping: 20 },
        rotate: { type: 'spring', stiffness: 60, damping: 20 },
        opacity: { duration: 0.6 },
        scale: { duration: 0.8 }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * Layered Parallax Background
 * Multiple elements move at different speeds for 3D depth
 */
export const LayeredParallaxBackground = ({
  children,
  layers = [
    { offset: 30, zIndex: 1 },
    { offset: 50, zIndex: 2 },
    { offset: 70, zIndex: 3 }
  ],
  className = ""
}) => {
  const { scrollY } = useScroll();
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className={`relative ${className}`}>
      {Array.isArray(children)
        ? children.map((child, idx) => {
            const layer = layers[idx] || layers[0];
            const y = useTransform(
              scrollY,
              [0, 1000],
              [0, -layer.offset]
            );

            return (
              <motion.div
                key={idx}
                style={prefersReducedMotion ? {} : { y, zIndex: layer.zIndex }}
                className="w-full"
              >
                {child}
              </motion.div>
            );
          })
        : children}
    </div>
  );
};

/**
 * Text Fade and Slide
 * Text elements fade in and slide up as they enter viewport
 */
export const TextFadeSlide = ({
  children,
  direction = 'up',
  duration = 0.8,
  delay = 0,
  once = true,
  amount = 0.2,
  className = ""
}) => {
  const { ref, isVisible } = useScrollReveal(once, amount);
  const prefersReducedMotion = usePrefersReducedMotion();

  const getInitialState = () => {
    const distance = 30;
    switch (direction) {
      case 'down':
        return { opacity: 0, y: -distance };
      case 'left':
        return { opacity: 0, x: -distance };
      case 'right':
        return { opacity: 0, x: distance };
      case 'up':
      default:
        return { opacity: 0, y: distance };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitialState()}
      animate={isVisible ? { opacity: 1, x: 0, y: 0 } : getInitialState()}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration, delay, ease: 'easeOut' }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * Staggered Parallax Cards
 * Multiple cards reveal with parallax effect and staggered timing
 */
export const StaggeredParallaxCards = ({
  items = [],
  renderCard,
  baseOffset = 50,
  staggerDelay = 0.1,
  className = ""
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className={className}>
      {items.map((item, idx) => (
        <FloatingCardReveal
          key={idx}
          offset={baseOffset + idx * 10}
          rotation={6 - idx * 1}
          startOffset={200 + idx * 100}
          delay={staggerDelay * idx}
          className="mb-6"
        >
          {renderCard(item, idx)}
        </FloatingCardReveal>
      ))}
    </div>
  );
};

/**
 * Scroll Progress Parallax
 * Element parallax amount changes based on scroll progress through viewport
 */
export const ScrollProgressParallax = ({
  children,
  parallaxIntensity = 50,
  className = ""
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });
  const prefersReducedMotion = usePrefersReducedMotion();

  const y = useTransform(scrollYProgress, [0, 1], [0, parallaxIntensity]);

  return (
    <motion.div
      ref={ref}
      style={prefersReducedMotion ? {} : { y }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * Soft Scroll Reveal
 * Professional, calm fade + slide with no rotation
 * Perfect for About/About-style sections
 */
export const SoftScrollReveal = ({
  children,
  direction = 'up',
  duration = 0.8,
  delay = 0,
  once = true,
  amount = 0.2,
  className = ""
}) => {
  const { ref, isVisible } = useScrollReveal(once, amount);
  const prefersReducedMotion = usePrefersReducedMotion();

  const getInitialState = () => {
    const distance = 30;
    switch (direction) {
      case 'down':
        return { opacity: 0, y: -distance };
      case 'left':
        return { opacity: 0, x: -distance };
      case 'right':
        return { opacity: 0, x: distance };
      case 'up':
      default:
        return { opacity: 0, y: distance };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitialState()}
      animate={isVisible ? { opacity: 1, x: 0, y: 0 } : getInitialState()}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration, delay, ease: 'easeOut' }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * Timeline Item Reveal
 * Fade + slide from left with no rotation
 * Perfect for Experience/Education timeline items
 */
export const TimelineItemReveal = ({
  children,
  index = 0,
  staggerDelay = 0.15,
  duration = 0.7,
  className = ""
}) => {
  const { ref, isVisible } = useScrollReveal(true, 0.2);
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration, delay: index * staggerDelay, ease: 'easeOut' }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * Soft Call-To-Action
 * Gentle scale-up + fade with light parallax
 * Perfect for Contact/CTA sections
 */
export const SoftCTA = ({
  children,
  duration = 0.8,
  delay = 0,
  scaleAmount = 0.05,
  parallaxAmount = 20,
  className = ""
}) => {
  const { ref, isVisible } = useScrollReveal(true, 0.3);
  const { scrollY } = useScroll();
  const prefersReducedMotion = usePrefersReducedMotion();

  const y = useTransform(scrollY, [0, 1000], [0, parallaxAmount]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 1 - scaleAmount }}
      animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1 - scaleAmount }}
      style={prefersReducedMotion ? {} : { y }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration, delay, ease: 'easeOut' }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * Cinematic Parallax Hero
 * Combines fast-moving foreground with slow background
 * Perfect for Hero sections
 */
export const CinematicParallaxHero = ({
  children,
  foregroundOffset = 80,
  backgroundOffset = 30,
  className = ""
}) => {
  const { ref, style: fgStyle } = useScrollParallax(foregroundOffset, 0, 0);
  const { scrollY } = useScroll();
  const prefersReducedMotion = usePrefersReducedMotion();

  const bgY = useTransform(scrollY, (value) => value * 0.3);

  return (
    <div className={className}>
      <motion.div
        style={prefersReducedMotion ? {} : { y: bgY }}
        className="absolute inset-0 -z-10 pointer-events-none"
      >
        {/* Background layer */}
        {Array.isArray(children) && children[0]}
      </motion.div>
      <motion.div ref={ref} style={prefersReducedMotion ? {} : fgStyle}>
        {/* Foreground content */}
        {Array.isArray(children) ? children[1] : children}
      </motion.div>
    </div>
  );
};

export default {
  useParallax,
  useScrollReveal,
  usePrefersReducedMotion,
  useScrollParallax,
  ParallaxBackground,
  ScrollReveal,
  StaggeredReveal,
  ParallaxImage,
  FloatingElement,
  ScaleOnScroll,
  FloatingCardReveal,
  LayeredParallaxBackground,
  TextFadeSlide,
  StaggeredParallaxCards,
  ScrollProgressParallax,
  SoftScrollReveal,
  TimelineItemReveal,
  SoftCTA,
  CinematicParallaxHero
};

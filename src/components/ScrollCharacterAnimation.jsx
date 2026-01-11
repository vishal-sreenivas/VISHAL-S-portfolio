import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * ScrollCharacterAnimation Component
 * 
 * Creates a full-page scroll-triggered animation where a character
 * jumps to form letters based on scroll position.
 * 
 * Inspired by ribbit.dk design pattern
 */

const ScrollCharacterAnimation = ({
  phrase = "HELLO",
  character = "🐸",
  backgroundColor = "#1a1a2e",
  lilyPadColor = "#00d4ff",
  accentColor = "#ff006e",
  height = "500vh"
}) => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const [scrollProgress, setScrollProgress] = useState(0);

  // Letter position mappings - define where character jumps to form each letter
  // Each letter has multiple lily pad positions
  const letterPositions = {
    H: [
      { x: 100, y: 100 }, { x: 100, y: 200 }, { x: 100, y: 300 },
      { x: 250, y: 300 },
      { x: 400, y: 100 }, { x: 400, y: 200 }, { x: 400, y: 300 }
    ],
    E: [
      { x: 100, y: 100 }, { x: 100, y: 200 }, { x: 100, y: 300 },
      { x: 250, y: 100 }, { x: 250, y: 200 }, { x: 250, y: 300 }
    ],
    L: [
      { x: 100, y: 100 }, { x: 100, y: 200 }, { x: 100, y: 300 },
      { x: 250, y: 300 }
    ],
    O: [
      { x: 100, y: 100 }, { x: 200, y: 50 }, { x: 300, y: 100 },
      { x: 350, y: 200 }, { x: 300, y: 300 }, { x: 200, y: 350 },
      { x: 100, y: 300 }
    ]
  };

  // Generate lily pad positions from phrase
  const generateLilyPads = () => {
    const allPositions = [];
    let offsetX = 0;

    phrase.split('').forEach((letter) => {
      if (letterPositions[letter]) {
        letterPositions[letter].forEach((pos) => {
          allPositions.push({
            x: pos.x + offsetX,
            y: pos.y,
            letter: letter,
            originalX: pos.x,
            originalY: pos.y
          });
        });
        offsetX += 500; // Space between letters
      }
    });

    return allPositions;
  };

  const lilyPads = generateLilyPads();

  // Calculate current position based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      const viewportHeight = window.innerHeight;
      const maxScroll = document.documentElement.scrollHeight - viewportHeight;
      const progress = maxScroll > 0 ? latest / maxScroll : 0;
      setScrollProgress(progress);
    });

    return () => unsubscribe();
  }, [scrollY]);

  // Calculate which lily pad the character should be on
  const getCurrentLilyPad = () => {
    if (lilyPads.length === 0) return { x: 0, y: 0 };
    const index = Math.min(
      Math.floor(scrollProgress * lilyPads.length),
      lilyPads.length - 1
    );
    return lilyPads[index];
  };

  const currentPosition = getCurrentLilyPad();

  // Jump animation variants
  const jumpVariants = {
    jump: {
      y: [0, -80, 0],
      scale: [1, 1.2, 1],
      rotate: [0, 180, 360],
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    idle: {
      y: 0,
      scale: 1,
      rotate: 0
    }
  };

  // Lily pad pulse animation
  const lilyPadVariants = {
    active: {
      scale: [1, 1.3, 1],
      opacity: [1, 0.8, 1],
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    },
    inactive: {
      scale: 1,
      opacity: 0.5
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height, backgroundColor }}
    >
      {/* Fixed background container */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        {/* Lily pads - static anchor points */}
        <div className="absolute inset-0">
          {lilyPads.map((pad, index) => {
            const isActive = getCurrentLilyPad() === pad;
            return (
              <motion.div
                key={index}
                className="absolute rounded-full"
                style={{
                  left: `${pad.x}px`,
                  top: `${pad.y}px`,
                  width: '60px',
                  height: '60px',
                  backgroundColor: isActive ? accentColor : lilyPadColor,
                  opacity: isActive ? 1 : 0.4,
                  cursor: 'pointer'
                }}
                variants={lilyPadVariants}
                animate={isActive ? 'active' : 'inactive'}
                whileHover={{ scale: 1.2 }}
              >
                {/* Letter label inside lily pad */}
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs">
                  {index % 4 === 0 && pad.letter}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Character that jumps */}
        <motion.div
          className="absolute text-6xl z-50"
          animate={{
            x: currentPosition.x,
            y: currentPosition.y
          }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 15,
            mass: 1
          }}
          variants={jumpVariants}
          whileHover={{ scale: 1.1 }}
        >
          {character}
        </motion.div>

        {/* Scroll progress indicator */}
        <div className="absolute bottom-8 left-8 text-white text-sm font-mono">
          <div>Scroll Progress: {Math.round(scrollProgress * 100)}%</div>
          <div>Current Lily Pad: {Math.floor(scrollProgress * lilyPads.length)} / {lilyPads.length}</div>
        </div>

        {/* Instructions */}
        <div className="absolute top-8 left-8 text-white text-sm max-w-xs">
          <p className="font-bold mb-2">Scroll to see {phrase} take form!</p>
          <p className="text-xs opacity-70">
            Watch the {character} jump from lily pad to lily pad as you scroll down.
          </p>
        </div>
      </div>

      {/* Scroll trigger area - content below sticky section */}
      <div className="relative z-10 bg-primary"></div>
    </div>
  );
};

export default ScrollCharacterAnimation;

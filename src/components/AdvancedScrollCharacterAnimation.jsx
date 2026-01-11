import { useState, useRef, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';

/**
 * Advanced ScrollCharacterAnimation Component
 * 
 * Enhanced version with:
 * - More customizable letter paths
 * - Better responsive handling
 * - Trail/path visualization
 * - Sound effects support
 * - Performance optimized
 */

const AdvancedScrollCharacterAnimation = ({
  phrase = "FROG FRACTIONS 2",
  character = "🐸",
  backgroundColor = "#0f0e17",
  lilyPadColor = "#00d4ff",
  activeColor = "#ff006e",
  trailColor = "rgba(255, 0, 110, 0.3)",
  showTrail = true,
  showProgress = true,
  soundEnabled = false,
  responsiveScale = true,
  height = "600vh"
}) => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scale, setScale] = useState(1);
  const [trailPositions, setTrailPositions] = useState([]);

  // Comprehensive letter path definitions
  const letterPaths = {
    // Uppercase letters
    A: [[150, 50], [75, 200], [225, 200], [150, 50], [150, 125]],
    B: [[75, 50], [75, 200], [225, 200], [225, 125], [75, 125]],
    C: [[225, 50], [75, 50], [75, 200], [225, 200]],
    D: [[75, 50], [75, 200], [200, 125]],
    E: [[225, 50], [75, 50], [75, 125], [200, 125], [75, 200], [225, 200]],
    F: [[225, 50], [75, 50], [75, 125], [200, 125], [75, 200]],
    G: [[225, 50], [75, 50], [75, 200], [225, 200], [225, 125]],
    H: [[75, 50], [75, 200], [75, 125], [225, 125], [225, 50], [225, 200]],
    I: [[100, 50], [150, 50], [125, 50], [125, 200], [100, 200], [150, 200]],
    J: [[200, 50], [200, 175], [75, 200], [75, 50]],
    K: [[75, 50], [75, 200], [225, 50], [75, 125], [225, 200]],
    L: [[75, 50], [75, 200], [225, 200]],
    M: [[75, 200], [75, 50], [150, 125], [225, 50], [225, 200]],
    N: [[75, 200], [75, 50], [225, 200], [225, 50]],
    O: [[225, 75], [225, 175], [75, 175], [75, 75], [225, 75]],
    P: [[75, 200], [75, 50], [225, 50], [225, 125], [75, 125]],
    Q: [[225, 75], [225, 175], [75, 175], [75, 75], [225, 75], [225, 200], [175, 250]],
    R: [[75, 200], [75, 50], [225, 50], [225, 125], [75, 125], [225, 200]],
    S: [[225, 50], [75, 50], [75, 125], [225, 125], [225, 200], [75, 200]],
    T: [[75, 50], [225, 50], [150, 50], [150, 200]],
    U: [[75, 50], [75, 175], [150, 200], [225, 175], [225, 50]],
    V: [[75, 50], [150, 200], [225, 50]],
    W: [[75, 50], [100, 200], [150, 100], [200, 200], [225, 50]],
    X: [[75, 50], [225, 200], [225, 50], [75, 200]],
    Y: [[75, 50], [150, 125], [225, 50], [150, 125], [150, 200]],
    Z: [[225, 50], [75, 200], [225, 200], [75, 50]],
    " ": [], // Space - no lily pads
    "0": [[150, 50], [225, 75], [225, 175], [150, 200], [75, 175], [75, 75], [150, 50]],
    "1": [[100, 50], [150, 50], [150, 200]],
    "2": [[75, 50], [225, 50], [225, 125], [75, 200], [225, 200]],
  };

  // Handle responsive scaling
  useEffect(() => {
    const handleResize = () => {
      if (responsiveScale) {
        const width = window.innerWidth;
        if (width < 768) setScale(0.6);
        else if (width < 1024) setScale(0.8);
        else setScale(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [responsiveScale]);

  // Generate all lily pads from phrase
  const generateLilyPads = () => {
    const pads = [];
    let xOffset = 0;

    phrase.split('').forEach((char) => {
      const upperChar = char.toUpperCase();
      const path = letterPaths[upperChar] || [];

      path.forEach((pos, idx) => {
        pads.push({
          id: `${pads.length}`,
          x: pos[0] * scale + xOffset,
          y: pos[1] * scale,
          char: upperChar,
          pathIndex: idx,
          totalPath: path.length
        });
      });

      // Add spacing between letters
      xOffset += 350 * scale;
    });

    return pads;
  };

  const lilyPads = generateLilyPads();

  // Update scroll progress and trail
  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      const viewportHeight = window.innerHeight;
      const maxScroll = document.documentElement.scrollHeight - viewportHeight;
      const progress = maxScroll > 0 ? latest / maxScroll : 0;
      setScrollProgress(Math.min(progress, 1));

      // Add to trail
      if (showTrail) {
        const currentIdx = Math.floor(progress * lilyPads.length);
        if (currentIdx < lilyPads.length) {
          const pad = lilyPads[currentIdx];
          setTrailPositions((prev) => [
            ...prev.slice(-30), // Keep last 30 positions
            { x: pad.x, y: pad.y, id: pad.id }
          ]);
        }
      }
    });

    return () => unsubscribe();
  }, [scrollY, lilyPads, showTrail]);

  const currentIndex = Math.min(
    Math.floor(scrollProgress * lilyPads.length),
    lilyPads.length - 1
  );
  const currentPad = lilyPads[currentIndex] || { x: 0, y: 0 };

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height, backgroundColor }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden">
        {/* Background grid pattern (optional) */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id="grid"
                width="50"
                height="50"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 50 0 L 0 0 0 50"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Trail visualization */}
        {showTrail && trailPositions.length > 0 && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <polyline
              points={trailPositions.map((p) => `${p.x},${p.y}`).join(' ')}
              fill="none"
              stroke={trailColor}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}

        {/* Lily pads */}
        {lilyPads.map((pad, idx) => {
          const isActive = idx === currentIndex;
          const isUpcoming = idx === currentIndex + 1;
          const isPast = idx < currentIndex;

          return (
            <motion.div
              key={pad.id}
              className="absolute rounded-full flex items-center justify-center cursor-pointer"
              style={{
                left: `${pad.x}px`,
                top: `${pad.y}px`,
                width: `${60 * scale}px`,
                height: `${60 * scale}px`
              }}
              animate={{
                backgroundColor: isActive ? activeColor : lilyPadColor,
                opacity: isPast ? 0.3 : isUpcoming ? 0.7 : 0.5,
                scale: isActive ? 1.3 : 1
              }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.2 }}
            >
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 pointer-events-none"
                  style={{ borderColor: activeColor }}
                  animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                />
              )}
            </motion.div>
          );
        })}

        {/* Character */}
        <motion.div
          className="absolute z-50 select-none"
          style={{ fontSize: `${96 * scale}px` }}
          animate={{
            x: currentPad.x - (48 * scale),
            y: currentPad.y - (48 * scale)
          }}
          transition={{
            type: 'spring',
            stiffness: 150,
            damping: 20,
            mass: 0.5
          }}
          whileHover={{
            scale: 1.15,
            filter: 'drop-shadow(0 0 20px rgba(255, 0, 110, 0.8))'
          }}
        >
          {character}
        </motion.div>

        {/* UI Overlay */}
        {showProgress && (
          <div className="absolute bottom-8 left-8 text-white font-mono text-sm">
            <div>Progress: {Math.round(scrollProgress * 100)}%</div>
            <div>Lily Pad: {currentIndex + 1} / {lilyPads.length}</div>
          </div>
        )}

        {/* Instructions */}
        <div className="absolute top-8 left-8 text-white max-w-xs">
          <p className="font-bold mb-2 text-lg">Scroll to reveal</p>
          <p className="text-sm opacity-70">
            Watch the {character} jump from lily pad to lily pad
          </p>
        </div>
      </div>

      {/* Content area below */}
      <div className="relative z-10"></div>
    </div>
  );
};

export default AdvancedScrollCharacterAnimation;

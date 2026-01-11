/**
 * SCROLL CHARACTER ANIMATION - USAGE EXAMPLES
 * 
 * This file demonstrates various ways to implement the scroll animation components
 * in your React portfolio. Choose the examples that best fit your needs.
 */

import AdvancedScrollCharacterAnimation from './components/AdvancedScrollCharacterAnimation';
import ScrollCharacterAnimation from './components/ScrollCharacterAnimation';

// ============================================================================
// EXAMPLE 1: Simple Hero Section with Frog Character
// ============================================================================
export function HeroWithFrog() {
  return (
    <div>
      <AdvancedScrollCharacterAnimation
        phrase="HELLO"
        character="🐸"
        backgroundColor="#0f0e17"
        lilyPadColor="#00d4ff"
        activeColor="#ff006e"
        height="500vh"
      />
      {/* Your other portfolio content below */}
    </div>
  );
}

// ============================================================================
// EXAMPLE 2: Personal Name Animation (Developer Portfolio)
// ============================================================================
export function NameAnimation() {
  return (
    <AdvancedScrollCharacterAnimation
      phrase="VISHAL"
      character="💻"
      backgroundColor="#1a1a2e"
      lilyPadColor="#4a9eff"
      activeColor="#00d4ff"
      showTrail={true}
      showProgress={true}
      height="400vh"
    />
  );
}

// ============================================================================
// EXAMPLE 3: Tagline/Profession Animation
// ============================================================================
export function ProfessionAnimation() {
  return (
    <AdvancedScrollCharacterAnimation
      phrase="FULL STACK"
      character="⚙️"
      backgroundColor="#000000"
      lilyPadColor="#00ff00"
      activeColor="#00ffff"
      trailColor="rgba(0, 255, 0, 0.2)"
      responsiveScale={true}
      height="550vh"
    />
  );
}

// ============================================================================
// EXAMPLE 4: Minimal Setup (Basic Component)
// ============================================================================
export function MinimalSetup() {
  return (
    <ScrollCharacterAnimation
      phrase="HI"
      character="👋"
      height="300vh"
    />
  );
}

// ============================================================================
// EXAMPLE 5: Custom Colors - Neon Cyberpunk
// ============================================================================
export function CyberpunkTheme() {
  return (
    <AdvancedScrollCharacterAnimation
      phrase="CODE"
      character="🎮"
      backgroundColor="#0a0e27"
      lilyPadColor="#ff00ff"
      activeColor="#00ffff"
      trailColor="rgba(255, 0, 255, 0.4)"
      showTrail={true}
      height="450vh"
    />
  );
}

// ============================================================================
// EXAMPLE 6: Soft & Elegant (Light Theme)
// ============================================================================
export function ElegantTheme() {
  return (
    <AdvancedScrollCharacterAnimation
      phrase="ELEGANT"
      character="✨"
      backgroundColor="#fafafa"
      lilyPadColor="#d1d5db"
      activeColor="#1f2937"
      trailColor="rgba(31, 41, 55, 0.15)"
      height="500vh"
    />
  );
}

// ============================================================================
// EXAMPLE 7: In App.jsx - Full Portfolio Integration
// ============================================================================
export function FullPortfolioIntegration() {
  return (
    <div className="bg-primary text-accent min-h-screen">
      {/* Scroll Animation Hero */}
      <AdvancedScrollCharacterAnimation
        phrase="VISHAL S"
        character="💻"
        backgroundColor="#0f0e17"
        lilyPadColor="#00d4ff"
        activeColor="#ff006e"
        showTrail={true}
        responsiveScale={true}
        height="500vh"
      />

      {/* Regular Portfolio Sections Below */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <h2 className="text-4xl font-bold mb-8">About Me</h2>
          <p>Your content here...</p>
        </div>
      </section>

      <section className="section-padding bg-primary">
        <div className="container-custom">
          <h2 className="text-4xl font-bold mb-8">Projects</h2>
          <p>Your projects here...</p>
        </div>
      </section>

      {/* Optional: Another animation for a middle section */}
      <AdvancedScrollCharacterAnimation
        phrase="SKILLS"
        character="🚀"
        height="300vh"
      />

      {/* Continue with more sections */}
    </div>
  );
}

// ============================================================================
// EXAMPLE 8: Different Phrases - Multi-Word
// ============================================================================
export function MultiWordAnimation() {
  const phrases = [
    { text: "HELLO WORLD", emoji: "🌍", bg: "#1a1a2e", color: "#00d4ff" },
    { text: "LEARN BUILD SHIP", emoji: "🚀", bg: "#0f0e17", color: "#ff006e" },
    { text: "CREATE INNOVATE INSPIRE", emoji: "💡", bg: "#000000", color: "#00ff00" }
  ];

  return (
    <div>
      {phrases.map((item, idx) => (
        <AdvancedScrollCharacterAnimation
          key={idx}
          phrase={item.text}
          character={item.emoji}
          backgroundColor={item.bg}
          activeColor={item.color}
          height="400vh"
        />
      ))}
    </div>
  );
}

// ============================================================================
// EXAMPLE 9: Mobile-Optimized Version
// ============================================================================
export function MobileOptimized() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <AdvancedScrollCharacterAnimation
      phrase={isMobile ? "HI" : "HELLO WORLD"}
      character="🐸"
      backgroundColor="#0f0e17"
      lilyPadColor="#00d4ff"
      activeColor="#ff006e"
      height={isMobile ? "250vh" : "500vh"}
      responsiveScale={true}
      showTrail={!isMobile}
    />
  );
}

// ============================================================================
// EXAMPLE 10: With Custom Hook for Reusability
// ============================================================================
function useScrollAnimation(defaultPhrase = "HELLO") {
  return {
    phrase: defaultPhrase,
    character: "🐸",
    backgroundColor: "#0f0e17",
    lilyPadColor: "#00d4ff",
    activeColor: "#ff006e",
    showTrail: true,
    responsiveScale: true
  };
}

export function WithCustomHook() {
  const animationProps = useScrollAnimation("CUSTOM");

  return (
    <AdvancedScrollCharacterAnimation
      {...animationProps}
      height="450vh"
    />
  );
}

// ============================================================================
// USAGE INSTRUCTIONS
// ============================================================================

/**
 * To use these examples in your App.jsx:
 * 
 * 1. Import the example you want:
 *    import { NameAnimation } from './examples/ScrollCharacterExamples';
 * 
 * 2. Add to your App component:
 *    <NameAnimation />
 * 
 * 3. Or copy the component code directly and customize
 * 
 * CUSTOMIZATION STEPS:
 * - Change 'phrase' to your text
 * - Change 'character' to your emoji (💻, 🚀, 🎨, etc.)
 * - Modify colors to match your portfolio theme
 * - Adjust 'height' for faster/slower scrolling
 * - Toggle 'showTrail' and 'showProgress' as needed
 * - Set 'responsiveScale' to true for mobile optimization
 */

// ============================================================================
// COMPLETE APP.JSX EXAMPLE
// ============================================================================

/**
 * import AdvancedScrollCharacterAnimation from './components/AdvancedScrollCharacterAnimation';
 * import Header from './components/Header';
 * import Projects from './components/Projects';
 * import Skills from './components/Skills';
 * import Education from './components/Education';
 * import Contact from './components/Contact';
 * import Footer from './components/Footer';
 * 
 * function App() {
 *   return (
 *     <div className="bg-primary text-accent min-h-screen">
 *       <Header />
 *       
 *       <AdvancedScrollCharacterAnimation
 *         phrase="VISHAL S"
 *         character="💻"
 *         height="500vh"
 *       />
 *       
 *       <Projects />
 *       <Skills />
 *       <Education />
 *       
 *       <AdvancedScrollCharacterAnimation
 *         phrase="GET IN TOUCH"
 *         character="📬"
 *         height="300vh"
 *       />
 *       
 *       <Contact />
 *       <Footer />
 *     </div>
 *   );
 * }
 * 
 * export default App;
 */

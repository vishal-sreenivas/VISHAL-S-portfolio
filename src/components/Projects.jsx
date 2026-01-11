import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FloatingCardReveal, TextFadeSlide } from '../utils/scrollAnimations.jsx';

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const projects = [
    {
      title: "PlanMyStudy AI — Personalized Learning Platform",
      description: "A smart AI-powered learning assistant that transforms any topic into a structured, personalized study plan with curated resources, progress tracking, and habit-building insights. The platform helps learners stay consistent, organized, and motivated by combining generative AI, content discovery, and visual progress analytics into one seamless experience.",
      tech: ["React", "Vite", "Tailwind CSS", "Node.js", "Express.js", "Prisma", "PostgreSQL", "Neon", "Render", "Vercel", "Groq/OpenAI API", "YouTube Data API"],
      image: "/images/planmystudy-preview.png",
      liveLink: "https://plan-my-study-ai.vercel.app/",
      highlights: [
        "AI-generated personalized course plans",
        "Automatic video and resource recommendations",
        "Daily study schedule based on user availability",
        "Visual progress tracking with percentage completion",
        "GitHub-style activity heatmap for learning consistency",
        "Secure login with user-specific dashboards"
      ]
    },
    {
      title: "DocuMind AI — Smart Document Search Chatbot",
      description: "A smart document search and chat assistant that allows users to upload documents and ask questions in natural language, retrieving precise answers using Retrieval-Augmented Generation and semantic search for improved accuracy and relevance.",
      tech: ["React", "Vite", "FastAPI", "Sentence Transformers", "spaCy", "FAISS"],
      image: "/images/documind-preview.png",
      liveLink: "https://github.com/vishal-sreenivas?tab=repositories",
      highlights: [
        "Smart document search and chat assistant",
        "Natural language question answering",
        "Retrieval-Augmented Generation",
        "Semantic search for improved accuracy"
      ]
    },
    {
      title: "Flight Explorer — Real-Time Flight Tracking Platform",
      description: "A modern web application that lets users search for flights, track real-time flight statuses, and manage a personalized watchlist with a clean, responsive UI and dark mode support.",
      tech: ["React", "TypeScript", "Tailwind CSS"],
      image: "/images/flight-explorer-preview.png",
      liveLink: "https://github.com/vishal-sreenivas?tab=repositories",
      highlights: [
        "Real-time flight tracking",
        "Personalized watchlist management",
        "Clean, responsive UI with dark mode",
        "Modern web application design"
      ]
    },
    {
      title: "Christ International App — University Companion App",
      description: "A mobile application designed for international students and faculty to easily access academic information, campus resources, and communication tools in one centralized platform.",
      tech: ["Kotlin", "Android Studio"],
      image: "/images/christ-app-preview.png",
      liveLink: "https://github.com/vishal-sreenivas?tab=repositories",
      highlights: [
        "Centralized platform for international students",
        "Academic information and campus resources",
        "Communication tools integration",
        "User-friendly mobile interface"
      ]
    },
    {
      title: "Revelations — College Fest Management App",
      description: "An Android application built for managing a college fest, featuring event listings, user profiles, navigation through fragments, and a media gallery with a smooth, intuitive interface.",
      tech: ["Kotlin", "XML", "Android Studio"],
      image: "/images/revelations-preview.png",
      liveLink: "https://github.com/vishal-sreenivas?tab=repositories",
      highlights: [
        "College fest management system",
        "Event listings and user profiles",
        "Fragment-based navigation",
        "Media gallery with smooth interface"
      ]
    },
    {
      title: "Plannify — Event Management Application",
      description: "A learning-focused event management app that helps users create, manage, and track events with Firebase-backed authentication and real-time data storage.",
      tech: ["Kotlin", "XML", "Firebase"],
      image: "/images/plannify-preview.png",
      liveLink: "https://github.com/vishal-sreenivas?tab=repositories",
      highlights: [
        "Event creation and management",
        "Firebase authentication",
        "Real-time data storage",
        "Learning-focused design"
      ]
    },
    {
      title: "BinSense — Smart Waste Management System (IoT)",
      description: "An IoT-based waste monitoring system that uses ultrasonic sensors to detect bin fill levels and transmits real-time data to a cloud platform for efficient waste collection planning.",
      tech: ["Arduino / ESP", "Ultrasonic Sensors", "C++", "IoT Cloud"],
      image: "/images/binsense-preview.png",
      liveLink: "https://github.com/vishal-sreenivas?tab=repositories",
      highlights: [
        "IoT-based waste monitoring",
        "Ultrasonic sensor integration",
        "Real-time data transmission",
        "Efficient waste collection planning"
      ]
    },
    {
      title: "Laser Security System using Arduino Uno",
      description: "A basic embedded security system that uses a laser and sensor module to detect intrusion and trigger alerts when the laser beam is interrupted.",
      tech: ["Arduino Uno", "Laser Module", "Sensors", "Embedded C"],
      image: "/images/laser-security-preview.png",
      liveLink: "https://github.com/vishal-sreenivas?tab=repositories",
      highlights: [
        "Embedded security system",
        "Laser beam intrusion detection",
        "Sensor module integration",
        "Alert system for security breaches"
      ]
    }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="projects" className="section-padding bg-primary">
      <div className="container-custom">
        <TextFadeSlide direction="up" duration={0.8} className="mb-8 md:mb-12">
          <h4 className="font-mono text-sm text-muted mb-2">PORTFOLIO</h4>
          <h2 className="text-2xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <div className="w-16 h-[2px] bg-light opacity-50"></div>
        </TextFadeSlide>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
          {/* Project selector - mobile version */}
          <motion.div 
            className="md:hidden w-full mb-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-muted">SELECT PROJECT</p>
              <div className="text-xs text-muted">{activeProject + 1}/{projects.length}</div>
            </div>
            <div className="flex overflow-x-auto pb-3 scrollbar-hide snap-x snap-mandatory">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`snap-start flex-shrink-0 w-[75%] mr-3 p-4 cursor-pointer transition-all duration-300 ${
                    activeProject === index 
                      ? "bg-secondary bg-opacity-50 border border-light border-opacity-20" 
                      : "bg-secondary bg-opacity-10 border border-muted border-opacity-10"
                  }`}
                  onClick={() => setActiveProject(index)}
                  whileTap={{ scale: 0.98 }}
                >
                  <h3 className={`font-medium text-sm mb-1 ${
                    activeProject === index ? "text-light" : "text-muted"
                  }`}>
                    {project.title.split(" - ")[0]}
                  </h3>
                  <p className="text-xs text-muted line-clamp-1">
                    {project.tech.slice(0, 3).join(", ")}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Project selector - desktop version */}
          <motion.div 
            className="hidden md:block md:col-span-4" 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`border-l border-muted ${
                  activeProject === index ? "border-opacity-100" : "border-opacity-20"
                } p-4 cursor-pointer transition-all duration-300 ${
                  activeProject === index ? "bg-secondary bg-opacity-30" : ""
                }`}
                onClick={() => setActiveProject(index)}
                whileHover={{
                  backgroundColor: "rgba(26, 26, 26, 0.3)",
                  transition: { duration: 0.2 }
                }}
              >
                <h3 className={`font-medium text-sm mb-1 ${
                  activeProject === index ? "text-light" : "text-muted"
                }`}>
                  {project.title.split(" - ")[0]}
                </h3>
                <p className="text-xs text-muted line-clamp-1">
                  {project.tech.slice(0, 3).join(", ")}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Project details */}
          <FloatingCardReveal 
            className="col-span-1 md:col-span-8"
            offset={90}
            rotation={8}
            startOffset={300}
          >
            <motion.div 
              className="bg-secondary bg-opacity-20 p-4 md:p-6 border border-muted border-opacity-10"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h3 className="text-lg md:text-xl font-semibold mb-3">{projects[activeProject].title}</h3>
              <p className="text-sm md:text-base text-muted mb-4 md:mb-6 leading-relaxed">
                {projects[activeProject].description}
              </p>
              
              <div className="mb-4 md:mb-6">
                <h4 className="text-xs md:text-sm font-mono text-light mb-2 md:mb-3">KEY HIGHLIGHTS</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {projects[activeProject].highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-light opacity-50 mt-1">→</span>
                      <span className="text-xs md:text-sm">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-xs md:text-sm font-mono text-light mb-2 md:mb-3">TECHNOLOGIES</h4>
                <div className="flex flex-wrap gap-2">
                  {projects[activeProject].tech.map((tech, i) => (
                    <span 
                      key={i} 
                      className="text-xs py-1 px-2 md:px-3 bg-primary border border-muted border-opacity-20 rounded-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {projects[activeProject].liveLink && (
                <div className="mt-6 md:mt-8 flex justify-center md:justify-end">
                  <a 
                    href={projects[activeProject].liveLink}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-mono text-xs inline-flex items-center px-5 py-2 md:px-6 md:py-2 border border-light hover:bg-light hover:bg-opacity-5 transition-all duration-300 group"
                  >
                    VIEW PROJECT
                    <svg className="ml-2 w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                  </a>
                </div>
              )}
            </motion.div>
          </FloatingCardReveal>
        </div>
      </div>
    </section>
  );
};

export default Projects;
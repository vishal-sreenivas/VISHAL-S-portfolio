import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TimelineItemReveal, TextFadeSlide } from '../utils/scrollAnimations.jsx';

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const experiences = [
    {
      position: "Developer",
      company: "Sensesys Pvt. Ltd.",
      field: "Information Technology & Services",
      period: "May 10, 2025 – Present",
      location: "Bengaluru, India",
      logo: "/SenseSys-logo.png",
      responsibilities: [
        "Developed the frontend for a SaaS web platform using React.js and Vite, including plan selection, checkout, and user dashboards.",
        "Integrated frontend components with backend REST APIs for service purchasing, account management, and real-time data display."
      ]
    },
    {
      position: "Intern – Academic Content & Teaching Assistant",
      company: "Christ University",
      field: "Online MCA Program",
      period: "June 10, 2025 – September 10, 2025",
      location: "Bengaluru, India",
      logo: "/christ university logo.png",
      responsibilities: [
        "Assisted faculty in delivering the Operating Systems course by preparing lecture scripts and learning materials for online classes.",
        "Created engaging curriculum-aligned presentations and coordinated with instructors for timely content delivery."
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
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="experience" className="section-padding bg-primary">
      <div className="container-custom" ref={ref}>
        <TextFadeSlide direction="up" duration={0.8} className="mb-12">
          <h4 className="font-mono text-sm text-muted mb-2">PROFESSIONAL JOURNEY</h4>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience</h2>
          <div className="w-16 h-[2px] bg-light opacity-50"></div>
        </TextFadeSlide>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-8"
        >
          {experiences.map((exp, i) => (
            <TimelineItemReveal
              key={i}
              index={i}
              staggerDelay={0.2}
              duration={0.7}
            >
              <motion.div
                className="border-l-2 border-muted border-opacity-30 pl-6 relative"
                variants={itemVariants}
              >
              <div className="absolute w-3 h-3 bg-primary border border-light rounded-full -left-[7px] top-1"></div>
              
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h4 className="text-lg font-medium mb-1">{exp.position}</h4>
                  <p className="text-light mb-1">
                    <span className="font-medium">{exp.company}</span>
                    {exp.field && <span className="text-muted"> — {exp.field}</span>}
                  </p>
                  <p className="text-sm font-mono text-light opacity-70 mb-1">{exp.period}</p>
                  <p className="text-sm text-muted">{exp.location}</p>
                </div>
                
                {exp.logo && (
                  <div className="md:w-16 md:h-16 w-12 h-12 flex-shrink-0 flex items-center justify-center bg-secondary rounded-lg border border-muted border-opacity-20">
                    <img 
                      src={exp.logo} 
                      alt={exp.company} 
                      className="w-10 h-10 md:w-12 md:h-12 object-contain"
                    />
                  </div>
                )}
              </div>

              <ul className="space-y-3 mt-4">
                {exp.responsibilities.map((responsibility, j) => (
                  <motion.li
                    key={j}
                    className="flex items-start text-muted"
                    variants={itemVariants}
                  >
                    <span className="text-light mt-0.5 mr-3 opacity-60 flex-shrink-0">⁕</span>
                    <span>{responsibility}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            </TimelineItemReveal>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;

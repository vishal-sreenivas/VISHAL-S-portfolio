import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [centerIndex, setCenterIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCenterIndex(prev => (prev + 1) % 7);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const categories = [
    {
      name: "Frontend",
      skills: ["React.js", "React Native", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS"]
    },
    {
      name: "Backend",
      skills: ["Node.js", "Express.js", "Python", "C++", "REST APIs", "WebSockets"]
    },
    {
      name: "Database",
      skills: ["SQL", "Prisma", "MongoDB", "DynamoDB", "PostgreSQL"]
    },
    {
      name: "DevOps & Tools",
      skills: ["AWS Lambda", "Git", "BeautifulSoup", "Google Gemini API"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="skills" className="section-padding bg-secondary">
      <div className="container-custom" ref={ref}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h4 className="font-mono text-sm text-muted mb-2">EXPERTISE</h4>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Skills</h2>
          <div className="w-16 h-[2px] bg-light opacity-50"></div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {categories.map((category, i) => (
            <motion.div 
              key={i} 
              className="border border-muted border-opacity-20 bg-primary bg-opacity-40 p-6"
              variants={itemVariants}
            >
              <h3 className="text-light font-medium mb-4 pb-2 border-b border-muted border-opacity-20">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, j) => (
                  <motion.span 
                    key={j} 
                    className="text-sm bg-secondary px-3 py-1 rounded-sm"
                    whileHover={{ 
                      y: -2, 
                      backgroundColor: "rgba(245, 245, 245, 0.05)", 
                      transition: { duration: 0.2 } 
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-16 p-8 border border-muted border-opacity-20 bg-primary bg-opacity-40"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-center h-64 overflow-hidden relative">
            <motion.div 
              className="flex gap-8 items-center"
              animate={{ x: [0, -3000] }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            >
              {[
                { src: '/github-removebg-preview.png', alt: 'GitHub' },
                { src: '/mongodb-removebg-preview.png', alt: 'MongoDB' },
                { src: '/node-js-logo-png-transparent-png-removebg-preview.png', alt: 'Node.js' },
                { src: '/postgre_sql-removebg-preview.png', alt: 'PostgreSQL' },
                { src: '/python_img-removebg-preview.png', alt: 'Python' },
                { src: '/aws-removebg-preview.png', alt: 'AWS' },
                { src: '/vite_+react-removebg-preview.png', alt: 'Vite + React' }
              ].concat([
                { src: '/github-removebg-preview.png', alt: 'GitHub' },
                { src: '/mongodb-removebg-preview.png', alt: 'MongoDB' },
                { src: '/node-js-logo-png-transparent-png-removebg-preview.png', alt: 'Node.js' },
                { src: '/postgre_sql-removebg-preview.png', alt: 'PostgreSQL' },
                { src: '/python_img-removebg-preview.png', alt: 'Python' },
                { src: '/aws-removebg-preview.png', alt: 'AWS' },
                { src: '/vite_+react-removebg-preview.png', alt: 'Vite + React' }
              ]).concat([
                { src: '/github-removebg-preview.png', alt: 'GitHub' },
                { src: '/mongodb-removebg-preview.png', alt: 'MongoDB' },
                { src: '/node-js-logo-png-transparent-png-removebg-preview.png', alt: 'Node.js' },
                { src: '/postgre_sql-removebg-preview.png', alt: 'PostgreSQL' },
                { src: '/python_img-removebg-preview.png', alt: 'Python' },
                { src: '/aws-removebg-preview.png', alt: 'AWS' },
                { src: '/vite_+react-removebg-preview.png', alt: 'Vite + React' }
              ]).map((logo, index) => {
                const isCenter = index % 7 === centerIndex;
                return (
                  <motion.div
                    key={index}
                    className="flex items-center justify-center h-32 w-32 bg-secondary bg-opacity-50 rounded-lg flex-shrink-0"
                    animate={{
                      scale: isCenter ? 1.8 : 1,
                      rotate: isCenter ? 360 : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 300, duration: 0.5, repeat: Infinity }}
                  >
                    <img 
                      src={logo.src} 
                      alt={logo.alt}
                      className="h-24 w-24 object-contain"
                      style={{ mixBlendMode: 'screen' }}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
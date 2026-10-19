import { motion, type Variants } from 'framer-motion'
import AboutSection from './components/AboutSection'
import ProjectsSection from './components/ProjectsSection'
import BlogSection from './components/BlogSection'
import ContactSection from './components/ContactSection'
import './App.css'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

export default function App() {
  return (
    <div className="app">
      <motion.header 
        className="header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <span className="header-tag">PORTFOLIO</span>
        <span className="header-year">2025</span>
      </motion.header>
      
      <motion.main 
        className="grid-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <AboutSection />
        </motion.div>
        <motion.div variants={itemVariants}>
          <ProjectsSection />
        </motion.div>
        <motion.div variants={itemVariants}>
          <BlogSection />
        </motion.div>
        <motion.div variants={itemVariants}>
          <ContactSection />
        </motion.div>
      </motion.main>
    </div>
  )
}

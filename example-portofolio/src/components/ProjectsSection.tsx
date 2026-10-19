import { motion } from 'framer-motion'
import './ProjectsSection.css'

const projects = [
  {
    title: 'E-COMMERCE PLATFORM',
    description: 'Full-stack shopping experience with real-time inventory',
    tech: ['React', 'Node.js', 'PostgreSQL'],
    year: '2025',
  },
  {
    title: 'DASHBOARD UI',
    description: 'Analytics dashboard with data visualization',
    tech: ['TypeScript', 'D3.js', 'Vite'],
    year: '2024',
  },
  {
    title: 'MOBILE APP',
    description: 'Cross-platform mobile application',
    tech: ['React Native', 'Firebase'],
    year: '2024',
  },
]

export default function ProjectsSection() {
  return (
    <section className="projects-section">
      <motion.div 
        className="projects-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <span className="section-label">02 / WORK</span>
        <h2 className="section-title">PROJECTS</h2>
      </motion.div>
      
      <div className="projects-grid">
        {projects.map((project, i) => (
          <motion.article 
            key={project.title}
            className="project-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
          >
            <div className="project-year">{project.year}</div>
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>
            <div className="project-tech">
              {project.tech.map((t) => (
                <span key={t} className="tech-item">{t}</span>
              ))}
            </div>
            <div className="project-arrow">→</div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

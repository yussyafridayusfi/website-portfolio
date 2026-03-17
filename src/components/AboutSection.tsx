import { motion } from 'framer-motion'
import './AboutSection.css'

const aboutData = {
  name: 'YUSSYA FRIDA',
  role: 'CREATIVE DEVELOPER',
  bio: 'I craft digital experiences that blend thoughtful design with clean code. Specializing in building accessible, performant web applications with a focus on user experience.',
  skills: ['React', 'TypeScript', 'Node.js', 'UI/UX Design'],
}

export default function AboutSection() {
  return (
    <section className="about-section">
      <motion.div 
        className="about-content"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
      >
        <span className="section-label">01 / ABOUT</span>
        <h2 className="name">{aboutData.name}</h2>
        <p className="role">{aboutData.role}</p>
        <p className="bio">{aboutData.bio}</p>
        <div className="skills">
          {aboutData.skills.map((skill, i) => (
            <motion.span 
              key={skill}
              className="skill-tag"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
              viewport={{ once: true }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

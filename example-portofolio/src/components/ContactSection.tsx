import { motion } from 'framer-motion'
import './ContactSection.css'

const contact = {
  email: 'hello@example.com',
  socials: [
    { name: 'GitHub', url: '#' },
    { name: 'LinkedIn', url: '#' },
    { name: 'Twitter', url: '#' },
  ],
}

export default function ContactSection() {
  return (
    <section className="contact-section">
      <motion.div 
        className="contact-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <span className="section-label">04 / CONNECT</span>
        <h2 className="section-title">CONTACT</h2>
      </motion.div>
      
      <div className="contact-content">
        <motion.p 
          className="contact-intro"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          HAVE A PROJECT IN MIND?<br />
          LET'S CREATE SOMETHING AMAZING.
        </motion.p>
        
        <motion.a 
          href={`mailto:${contact.email}`}
          className="email-link"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
        >
          {contact.email}
        </motion.a>
        
        <motion.div 
          className="social-links"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {contact.socials.map((social, i) => (
            <motion.a
              key={social.name}
              href={social.url}
              className="social-link"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -3, color: 'var(--color-coral)' }}
            >
              {social.name}
            </motion.a>
          ))}
        </motion.div>
      </div>
      
      <motion.div 
        className="footer-note"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        viewport={{ once: true }}
      >
        <span>© 2025</span>
        <span className="separator">/</span>
        <span>BUILT WITH REACT</span>
      </motion.div>
    </section>
  )
}

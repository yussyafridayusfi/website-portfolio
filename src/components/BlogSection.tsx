import { motion } from 'framer-motion'
import './BlogSection.css'

const posts = [
  {
    title: 'BUILDING ACCESSIBLE WEB APPLICATIONS',
    date: 'MAR 2025',
    readTime: '8 MIN READ',
    excerpt: 'A deep dive into ARIA attributes and semantic HTML.',
  },
  {
    title: 'THE ART OF MINIMALIST DESIGN',
    date: 'FEB 2025',
    readTime: '5 MIN READ',
    excerpt: 'How less can actually be more in digital products.',
  },
  {
    title: 'TYPE-SAFE REACT COMPONENTS',
    date: 'JAN 2025',
    readTime: '6 MIN READ',
    excerpt: 'Leveraging TypeScript for better component APIs.',
  },
]

export default function BlogSection() {
  return (
    <section className="blog-section">
      <motion.div 
        className="blog-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <span className="section-label">03 / WRITING</span>
        <h2 className="section-title">BLOG</h2>
      </motion.div>
      
      <div className="posts-list">
        {posts.map((post, i) => (
          <motion.article 
            key={post.title}
            className="post-item"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ x: 8 }}
          >
            <div className="post-meta">
              <span className="post-date">{post.date}</span>
              <span className="post-read">{post.readTime}</span>
            </div>
            <h3 className="post-title">{post.title}</h3>
            <p className="post-excerpt">{post.excerpt}</p>
            <span className="post-arrow">→</span>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import './Gallery.css'

const galleryItems = [
  { id: 1, emoji: '🎨', label: 'Art & Craft', desc: 'Painting & Creative Expression', color: '#7c3aed', size: 'large' },
  { id: 2, emoji: '📚', label: 'Story Time', desc: 'Reading & Imagination', color: '#0d9488', size: 'small' },
  { id: 3, emoji: '🎵', label: 'Music & Dance', desc: 'Rhythm & Movement', color: '#f97316', size: 'small' },
  { id: 4, emoji: '🌿', label: 'Nature Walk', desc: 'Outdoor Exploration', color: '#16a34a', size: 'medium' },
  { id: 5, emoji: '🧩', label: 'Block Play', desc: 'STEM & Problem Solving', color: '#2563eb', size: 'medium' },
  { id: 6, emoji: '👩‍🍳', label: 'Cooking Class', desc: 'Life Skills & Math', color: '#dc2626', size: 'small' },
  { id: 7, emoji: '⚽', label: 'Sports Day', desc: 'Physical Fitness & Teamwork', color: '#d97706', size: 'small' },
  { id: 8, emoji: '🎭', label: 'Drama Club', desc: 'Expression & Confidence', color: '#7c3aed', size: 'large' },
  { id: 9, emoji: '🔬', label: 'Science Lab', desc: 'Curiosity & Discovery', color: '#0891b2', size: 'medium' },
]

const filters = ['All', 'Creative', 'Academic', 'Physical', 'Social']

export default function Gallery() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [activeFilter, setActiveFilter] = useState('All')
  const [hovered, setHovered] = useState(null)

  return (
    <section className="gallery section-py" id="gallery" ref={ref}>
      <div className="container">
        <motion.div
          className="gallery__header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-badge">📸 Life at Wonder Roots</span>
          <h2 className="section-title">
            Moments of <span>Joy & Growth</span>
          </h2>
          <p className="section-subtitle">
            Every day is a new adventure at Wonder Roots. Peek into the magical world our children inhabit.
          </p>

          <div className="gallery__filters">
            {filters.map(f => (
              <button
                key={f}
                className={`gallery__filter ${activeFilter === f ? 'active' : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="gallery__grid">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.id}
              className={`gallery-card gallery-card--${item.size}`}
              style={{ '--card-color': item.color }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            >
              <div className="gallery-card__bg" style={{ background: `linear-gradient(135deg, ${item.color}dd, ${item.color}99)` }}>
                <div className="gallery-card__pattern" />
              </div>
              <div className="gallery-card__emoji">{item.emoji}</div>

              <AnimatePresence>
                {hovered === item.id && (
                  <motion.div
                    className="gallery-card__overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="gallery-card__info">
                      <strong>{item.label}</strong>
                      <span>{item.desc}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="gallery__cta"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          <p>Want to see more? Come visit us in person!</p>
          <button
            className="btn btn-primary"
            onClick={() => document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })}
          >
            Book a Campus Tour →
          </button>
        </motion.div>
      </div>
    </section>
  )
}

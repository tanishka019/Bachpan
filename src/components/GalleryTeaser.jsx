import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import './GalleryTeaser.css'

const previews = [
  { img: '/hero-1.jpg', label: "Father's Day",   color: '#7c3aed', span: 'tall'   },
  { img: '/hero-2.jpg', label: 'Craft Activities', color: '#0d9488', span: 'square' },
  { img: '/hero-3.jpg', label: 'Green Day',       color: '#16a34a', span: 'square' },
  { img: '/hero-2.jpg', label: 'Number Fun',      color: '#2563eb', span: 'wide'   },
  { img: '/hero-1.jpg', label: 'Awards Day',      color: '#d97706', span: 'square' },
]

export default function GalleryTeaser() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const navigate = useNavigate()

  return (
    <section className="gt section-py" id="gallery" ref={ref}>
      <div className="container">
        <motion.div
          className="gt__header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-badge">📸 Life at Bachpan</span>
          <h2 className="section-title">
            Moments of <span>Joy & Growth</span>
          </h2>
          <p className="section-subtitle">
            Every day is a new adventure. Here's a glimpse into the magical world our children love.
          </p>
        </motion.div>

        {/* Preview mosaic */}
        <div className="gt__mosaic">
          {previews.map((p, i) => (
            <motion.div
              key={i}
              className={`gt-tile gt-tile--${p.span}`}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.03, zIndex: 2, transition: { duration: 0.25 } }}
              onClick={() => navigate('/gallery')}
            >
              <img src={p.img} alt={p.label} className="gt-tile__img" />
              <div className="gt-tile__overlay">
                <span className="gt-tile__label" style={{ background: p.color }}>{p.label}</span>
              </div>
            </motion.div>
          ))}

          {/* CTA tile */}
          <motion.div
            className="gt-tile gt-tile--cta"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.55, duration: 0.5 }}
            onClick={() => navigate('/gallery')}
          >
            <div className="gt-tile__cta-inner">
              <div className="gt-tile__cta-count">12+</div>
              <div className="gt-tile__cta-label">Beautiful Memories</div>
              <div className="gt-tile__cta-btn">
                <span>View Full Gallery</span>
                <span className="gt-tile__cta-arrow">→</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="gt__cta"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.65 }}
        >
          <button className="btn btn-primary" onClick={() => navigate('/gallery')}>
            Explore Full Gallery →
          </button>
          <p className="gt__cta-note">12 photos across 4 categories</p>
        </motion.div>
      </div>
    </section>
  )
}

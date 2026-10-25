import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { getStoredMemories } from '../lib/galleryData'
import './GalleryTeaser.css'

const fallbackPreviews = [
  { img: '/hero-1.jpg', label: "Father's Day", color: '#7c3aed', span: 'tall', isVideo: false },
  { img: '/hero-2.jpg', label: 'Craft Activities', color: '#0d9488', span: 'square', isVideo: false },
  { img: '/hero-3.jpg', label: 'Green Day', color: '#16a34a', span: 'square', isVideo: false },
  { img: '/hero-2.jpg', label: 'Number Fun', color: '#2563eb', span: 'wide', isVideo: false },
  { img: '/hero-1.jpg', label: 'Dance & Rhymes', color: '#d97706', span: 'square', isVideo: true },
]

const colorPalette = ['#7c3aed', '#0d9488', '#16a34a', '#2563eb', '#d97706', '#dc2626']
const spanPatterns = ['tall', 'square', 'square', 'wide', 'square']

export default function GalleryTeaser() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const navigate = useNavigate()
  const [itemsCount, setItemsCount] = useState(12)
  const [previews, setPreviews] = useState(fallbackPreviews)

  useEffect(() => {
    const loadTeaser = () => {
      try {
        const memories = getStoredMemories()
        if (memories && memories.length > 0) {
          setItemsCount(memories.length)

          const dynamicPreviews = memories.slice(0, 5).map((item, idx) => ({
            img: item.url || '/hero-1.jpg',
            label: item.title || item.category || 'Bachpan Moment',
            color: colorPalette[idx % colorPalette.length],
            span: spanPatterns[idx] || 'square',
            isVideo: item.media_type === 'video',
          }))

          if (dynamicPreviews.length < 5) {
            const filled = [...dynamicPreviews, ...fallbackPreviews.slice(dynamicPreviews.length)]
            setPreviews(filled)
          } else {
            setPreviews(dynamicPreviews)
          }
        }
      } catch (err) {
        console.warn('GalleryTeaser error:', err)
      }
    }

    loadTeaser()
    window.addEventListener('bachpan-gallery-updated', loadTeaser)
    window.addEventListener('storage', loadTeaser)
    return () => {
      window.removeEventListener('bachpan-gallery-updated', loadTeaser)
      window.removeEventListener('storage', loadTeaser)
    }
  }, [])

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
            Every day is a new adventure. Explore photos and video memories stored in our cloud gallery.
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
              {p.isVideo ? (
                <div style={{ position: 'relative', width: '100%', height: '100%', background: '#000' }}>
                  <video
                    src={p.img}
                    muted
                    preload="metadata"
                    className="gt-tile__img"
                    style={{ objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(0,0,0,0.3)',
                    }}
                  >
                    <span
                      style={{
                        background: 'rgba(124, 58, 237, 0.85)',
                        color: '#fff',
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1rem',
                        paddingLeft: '3px',
                      }}
                    >
                      ▶
                    </span>
                  </div>
                </div>
              ) : (
                <img src={p.img} alt={p.label} className="gt-tile__img" />
              )}
              <div className="gt-tile__overlay">
                <span className="gt-tile__label" style={{ background: p.color }}>
                  {p.isVideo ? '🎬 ' : ''}
                  {p.label}
                </span>
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
              <div className="gt-tile__cta-count">{itemsCount}+</div>
              <div className="gt-tile__cta-label">Cloud Memories</div>
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
          <p className="gt__cta-note">{itemsCount} photos & videos with cloud upload</p>
        </motion.div>
      </div>
    </section>
  )
}

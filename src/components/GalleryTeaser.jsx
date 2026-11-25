import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, BookOpen } from 'lucide-react'
import PolaroidLineCarousel from '@/components/ui/polaroid-line-carousel'
import { getStoredMemories } from '../lib/galleryData'
import './GalleryTeaser.css'

// Authentic school photos of Nirankur children & real preschool activities
const REAL_SCHOOL_SLIDES = [
  {
    image: '/hero-2.jpg',
    title: 'Fruit Salad Day 🥗',
    caption: 'Our little chefs exploring colors, textures, and sensory math with healthy seasonal fruits.',
  },
  {
    image: '/hero-1.jpeg',
    title: 'Peace Circle & Garden 🌱',
    caption: 'Gandhi Jayanti celebrations — planting saplings and learning kindness in our green courtyard.',
  },
  {
    image: '/hero-1.jpg',
    title: 'Classroom Story Circle 📚',
    caption: 'Bright smiles and listening ears as teachers narrate adventures in the reading corner.',
  },
  {
    image: '/hero-3.jpg',
    title: 'Annual Day Celebrations 🌟',
    caption: 'Little performers shining on stage with traditional costumes, rhythm, and confidence.',
  },
  {
    image: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=1200&q=80',
    title: 'Nature Discovery 🔍',
    caption: 'Curious junior scientists observing leaf patterns and soil with child-safe magnifying glasses.',
  },
  {
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    title: 'Clay & Diya Craft 🎨',
    caption: 'Molding earthen diyas and handmade animal figurines with natural clay and gentle guidance.',
  },
  {
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=80',
    title: 'Outdoor Play & Races 🏃',
    caption: 'Pure childhood laughter and team spirit across mini hurdles on the sunny campus lawn.',
  },
  {
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1200&q=80',
    title: 'STEM Block Building 🧩',
    caption: 'Developing spatial reasoning and fine motor coordination while constructing miniature towers.',
  },
]

export default function GalleryTeaser() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const navigate = useNavigate()
  const [itemsCount, setItemsCount] = useState(50)
  const [slides, setSlides] = useState(REAL_SCHOOL_SLIDES)

  useEffect(() => {
    const loadMemories = () => {
      try {
        const memories = getStoredMemories()
        if (memories && memories.length > 0) {
          setItemsCount(memories.length)

          // Sanitize: filter out non-image, test uploads, or corrupted items
          const validUploads = memories.filter((m) => {
            if (!m || !m.url) return false
            if (m.media_type === 'video') return false
            const t = (m.title || '').toLowerCase()
            const u = (m.url || '').toLowerCase()
            // Ignore accidental test junk or non-photo files
            if (t.includes('fsdd') || t.includes('test') || t.includes('asdf') || u.includes('pdf')) return false
            return true
          })

          if (validUploads.length > 0) {
            const dynamicSlides = validUploads.map((m) => ({
              image: m.url,
              title: (m.title && m.title.length < 28) ? m.title : (m.category || 'School Memory 📸'),
              caption: m.caption || m.description || 'Precious learning milestone captured at our campus.',
            }))
            // Place authentic school photos and valid dynamic memories together
            setSlides([...REAL_SCHOOL_SLIDES.slice(0, 4), ...dynamicSlides.slice(0, 4), ...REAL_SCHOOL_SLIDES.slice(4)])
          }
        }
      } catch (err) {
        console.warn('GalleryTeaser error:', err)
      }
    }

    loadMemories()
    window.addEventListener('bachpan-gallery-updated', loadMemories)
    window.addEventListener('storage', loadMemories)
    return () => {
      window.removeEventListener('bachpan-gallery-updated', loadMemories)
      window.removeEventListener('storage', loadMemories)
    }
  }, [])

  return (
    <section className="gt" id="gallery" ref={ref}>
      {/* Huge Faint Watermark Text matching reference storybook theme */}
      <div className="gt__watermark">
        <span>CAMPUS MEMORIES</span>
      </div>

      <div className="container gt__container">
        {/* Section Header */}
        <motion.div
          className="gt__header"
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="gt__title">
            Moments of Joy, Laughter & Growth
          </h2>
          <p className="gt__subtitle">
            Every day is a joyful adventure at Nirankur. Glide through instant snapshots gently pegged to our campus clothesline.
          </p>
        </motion.div>
      </div>

      {/* Full-width Edge-to-Edge Clothesline Stage across the laptop */}
      <motion.div
        className="gt__fullwidth-stage"
        initial={{ opacity: 0, scale: 0.99 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.15 }}
      >
        {/* Subtle wooden post anchors right on the screen edges */}
        <div className="gt__post gt__post--left" aria-hidden="true">
          <span className="gt__post-knot" />
        </div>
        <div className="gt__post gt__post--right" aria-hidden="true">
          <span className="gt__post-knot" />
        </div>

        <PolaroidLineCarousel
          slides={slides}
          height="560px"
          cardWidth={350}
          sag={52}
          swing={1.05}
          autoplay={4500}
          string="#8c6239"
          background="transparent"
          ink="#1e293b"
          ariaLabel="Nirankur campus photos clothesline"
        />
      </motion.div>

      <div className="container gt__container">
        {/* Explore More Section (Warm & Inviting Storybook Style) */}
        <motion.div
          className="gt__explore-section"
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.28 }}
        >
          <div className="gt__explore-card">
            <div className="gt__explore-content">
              <span className="gt__explore-badge">
                <BookOpen size={14} className="gt__badge-icon" />
                School Memory Book
              </span>
              <h3 className="gt__explore-heading">
                Want to explore more cherished moments?
              </h3>
              <p className="gt__explore-desc">
                Browse our complete memory archive of {itemsCount}+ photos, festival videos, sports events, and classroom celebrations.
              </p>
            </div>

            <button
              className="gt__explore-button"
              onClick={() => navigate('/gallery')}
              aria-label="Open full memory gallery"
            >
              <span>Explore More</span>
              <ArrowRight size={17} className="gt__button-arrow" />
            </button>
          </div>

          {/* Authentic Filter Tags */}
          <div className="gt__tags-row">
            <span className="gt__tags-heading">Popular collections:</span>
            {['🎨 Art & Diyas', '🏃 Sports Dash', '🌱 Peace Circle', '🌟 Annual Concert', '🥗 Little Chefs'].map((tag) => (
              <button
                key={tag}
                type="button"
                className="gt__tag-chip"
                onClick={() => navigate('/gallery')}
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

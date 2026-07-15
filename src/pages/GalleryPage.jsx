import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import './GalleryPage.css'

const images = [
  { id: 1,  src: '/hero-1.jpg' },
  { id: 2,  src: '/hero-2.jpg' },
  { id: 3,  src: '/hero-3.jpg' },
  { id: 4,  src: '/hero-2.jpg' },
  { id: 5,  src: '/hero-1.jpg' },
  { id: 6,  src: '/hero-3.jpg' },
  { id: 7,  src: '/hero-1.jpg' },
  { id: 8,  src: '/hero-2.jpg' },
  { id: 9,  src: '/hero-3.jpg' },
  { id: 10, src: '/hero-1.jpg' },
  { id: 11, src: '/hero-2.jpg' },
  { id: 12, src: '/hero-3.jpg' },
]

function Lightbox({ items, index, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext])

  return (
    <motion.div
      className="lb"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <div className="lb__inner" onClick={e => e.stopPropagation()}>
        <AnimatePresence mode="wait">
          <motion.img
            key={items[index].id}
            src={items[index].src}
            alt=""
            className="lb__img"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          />
        </AnimatePresence>
      </div>

      {/* Controls */}
      <button className="lb__close" onClick={onClose} aria-label="Close">✕</button>
      <button className="lb__nav lb__nav--prev" onClick={e => { e.stopPropagation(); onPrev() }} aria-label="Previous">‹</button>
      <button className="lb__nav lb__nav--next" onClick={e => { e.stopPropagation(); onNext() }} aria-label="Next">›</button>
      <div className="lb__counter">{index + 1} / {items.length}</div>
    </motion.div>
  )
}

export default function GalleryPage() {
  const navigate = useNavigate()
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const open  = useCallback((i) => setLightboxIndex(i), [])
  const close = useCallback(() => setLightboxIndex(null), [])
  const prev  = useCallback(() => setLightboxIndex(i => (i - 1 + images.length) % images.length), [])
  const next  = useCallback(() => setLightboxIndex(i => (i + 1) % images.length), [])

  return (
    <div className="gp">
      {/* Subtle background */}
      <div className="gp__bg" />

      {/* Top bar */}
      <div className="gp__topbar">
        <motion.button
          className="gp__back"
          onClick={() => navigate('/')}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          whileHover={{ x: -3 }}
        >
          ← Home
        </motion.button>

        <motion.h1
          className="gp__title"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          Gallery
        </motion.h1>

        <div className="gp__spacer" />
      </div>

      {/* Grid */}
      <motion.div
        className="gp__grid"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.06 } } }}
      >
        {images.map((img, i) => (
          <motion.div
            key={img.id}
            className="gp__item"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show:   { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
            }}
            onClick={() => open(i)}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <img src={img.src} alt="" className="gp__img" loading="lazy" />
            <div className="gp__item-overlay" />
          </motion.div>
        ))}
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox items={images} index={lightboxIndex} onClose={close} onPrev={prev} onNext={next} />
        )}
      </AnimatePresence>
    </div>
  )
}

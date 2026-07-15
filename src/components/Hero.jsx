import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Hero.css'

const slides = [
  {
    id: 1,
    badge: '🎨 Play-Based Learning',
    heading: 'Where Little Dreams',
    headingAccent: 'Take Flight',
    sub: 'A nurturing space where curiosity blooms, friendships grow, and every child discovers the joy of learning through play.',
    cta1: 'Explore Programs',
    cta2: 'Book a Visit',
    cta1Href: '#programs',
    cta2Href: '#contact',
    emoji1: '🦋',
    emoji2: '🌸',
    emoji3: '⭐',
    emoji4: '🎈',
    color: 'slide-purple',
    bgImage: '/hero-1.jpg',
    photoLabel: 'Happy Father\'s Day Celebration',
  },
  {
    id: 2,
    badge: '🌱 Holistic Development',
    heading: 'Nurturing Bright Minds',
    headingAccent: 'Every Day',
    sub: 'Our expert educators craft experiences that develop emotional intelligence, creativity, and a lifelong love for learning.',
    cta1: 'Why Bachpan',
    cta2: 'Enroll Today',
    cta1Href: '#why-bachpan',
    cta2Href: '#contact',
    emoji1: '🦄',
    emoji2: '🌈',
    emoji3: '💡',
    emoji4: '🎯',
    color: 'slide-teal',
    bgImage: '/hero-2.jpg',
    photoLabel: 'Fun Learning Activities',
  },
  {
    id: 3,
    badge: '🏆 Award-Winning Curriculum',
    heading: 'Building Foundations',
    headingAccent: 'That Last a Lifetime',
    sub: 'From playgroup to UKG, our structured yet fun curriculum sets children up for success in school and beyond.',
    cta1: 'Our Curriculum',
    cta2: 'Find a Center',
    cta1Href: '#approach',
    cta2Href: '#contact',
    emoji1: '🎓',
    emoji2: '📚',
    emoji3: '🚀',
    emoji4: '🌟',
    color: 'slide-coral',
    bgImage: '/hero-3.jpg',
    photoLabel: 'Green Day Celebration',
  },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const timerRef = useRef(null)

  const goTo = (index) => {
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
  }

  const next = () => {
    setDirection(1)
    setCurrent(c => (c + 1) % slides.length)
  }

  useEffect(() => {
    timerRef.current = setInterval(next, 5500)
    return () => clearInterval(timerRef.current)
  }, [])

  const slide = slides[current]

  const handleCta = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className={`hero ${slide.color}`} id="home" style={{ '--hero-bg': `url(${slide.bgImage})` }}>
      {/* Real photo full-screen background */}
      <AnimatePresence>
        <motion.div
          key={`bg-${slide.id}`}
          className="hero__bg-photo"
          style={{ backgroundImage: `url(${slide.bgImage})` }}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </AnimatePresence>
      {/* Gradient overlay for text legibility */}
      <div className="hero__overlay" />

      {/* Floating emojis */}
      <div className="hero__float hero__float--1">{slide.emoji1}</div>
      <div className="hero__float hero__float--2">{slide.emoji2}</div>
      <div className="hero__float hero__float--3">{slide.emoji3}</div>
      <div className="hero__float hero__float--4">{slide.emoji4}</div>

      <div className="container hero__container">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={slide.id}
            className="hero__content"
            custom={direction}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 60 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <motion.span
              className="hero__badge"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {slide.badge}
            </motion.span>

            <motion.h1
              className="hero__heading"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {slide.heading}{' '}
              <span className="hero__heading-accent">{slide.headingAccent}</span>
            </motion.h1>

            <motion.p
              className="hero__sub"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {slide.sub}
            </motion.p>

            <motion.div
              className="hero__actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <button
                className="btn btn-white"
                onClick={() => handleCta(slide.cta1Href)}
              >
                {slide.cta1} →
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => handleCta(slide.cta2Href)}
              >
                {slide.cta2}
              </button>
            </motion.div>

            {/* Quick info pills */}
            <motion.div
              className="hero__pills"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="hero__pill">✓ Age 1.5 – 6 years</div>
              <div className="hero__pill">✓ Trained Educators</div>
              <div className="hero__pill">✓ Safe Environment</div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Photo Frame Side */}
        <div className="hero__visual">
          <div className="hero__photo-frame">
            <AnimatePresence mode="wait">
              <motion.img
                key={`photo-${slide.id}`}
                src={slide.bgImage}
                alt={slide.photoLabel}
                className="hero__photo-img"
                initial={{ opacity: 0, scale: 1.05, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
              />
            </AnimatePresence>
            {/* Photo label badge */}
            <div className="hero__photo-label">
              <span>📸</span> {slide.photoLabel}
            </div>
            {/* Decorative corner dots */}
            <div className="hero__photo-dot hero__photo-dot--tl" />
            <div className="hero__photo-dot hero__photo-dot--br" />
          </div>

          {/* Stat Cards */}
          <div className="hero__card hero__card--1">
            <span>🏆</span>
            <div>
              <strong>15+ Years</strong>
              <small>of Excellence</small>
            </div>
          </div>
          <div className="hero__card hero__card--2">
            <span>😊</span>
            <div>
              <strong>50,000+</strong>
              <small>Happy Kids</small>
            </div>
          </div>
          <div className="hero__card hero__card--3">
            <span>🌍</span>
            <div>
              <strong>500+</strong>
              <small>Centers</small>
            </div>
          </div>
        </div>
      </div>

      {/* Slider Controls */}
      <div className="hero__controls">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`hero__dot ${i === current ? 'active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll">
        <div className="hero__scroll-mouse">
          <div className="hero__scroll-wheel" />
        </div>
        <span>Scroll to explore</span>
      </div>

      {/* Bottom wave */}
      <div className="hero__wave">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white"/>
        </svg>
      </div>
    </section>
  )
}

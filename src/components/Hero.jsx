import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { RainbowSlideKid, StorybookCloud } from './StoryKids'
import { getHeroRainbowGeometry } from '../lib/rainbowGeometry'
import './Hero.css'

export default function Hero() {
  const heroRef = useRef(null)
  const sliderTrackRef = useRef(null)
  const slideKidRef = useRef(null)

  const [heroGeo, setHeroGeo] = useState(null)

  const handleEnroll = () => {
    window.dispatchEvent(new CustomEvent('bachpan-open-enroll', { detail: { program: 'Playgroup' } }))
  }

  // Measure Hero section in exact 1:1 CSS pixels so bottom exit aligns flush with RainbowStream
  useLayoutEffect(() => {
    const measure = () => {
      const el = heroRef.current
      if (!el) return
      const w = el.clientWidth
      const h = el.clientHeight
      if (w > 0 && h > 0) {
        setHeroGeo(getHeroRainbowGeometry(w, h))
      }
    }

    measure()
    const observer = new ResizeObserver(measure)
    if (heroRef.current) observer.observe(heroRef.current)
    window.addEventListener('resize', measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  useEffect(() => {
    if (!heroGeo) return undefined
    let rafId = null
    let startTime = null
    const durationMs = 6800

    const animateKid = (now) => {
      if (!startTime) startTime = now
      const pathEl = sliderTrackRef.current
      const kidEl = slideKidRef.current

      if (pathEl && kidEl && typeof pathEl.getTotalLength === 'function') {
        const len = pathEl.getTotalLength()
        const progress = ((now - startTime) % durationMs) / durationMs
        const s = 0.06 + progress * 0.88
        const dist = s * len
        const pt = pathEl.getPointAtLength(dist)
        const ptNext = pathEl.getPointAtLength(Math.min(len, dist + 10))
        const ptPrev = pathEl.getPointAtLength(Math.max(0, dist - 10))

        const dx = ptNext.x - ptPrev.x
        const dy = ptNext.y - ptPrev.y
        const rawAngle = (Math.atan2(dy, dx) * 180) / Math.PI
        const angle = Math.max(-18, Math.min(34, rawAngle * 0.65))

        let opacity = 1
        if (progress < 0.08) opacity = progress / 0.08
        else if (progress > 0.88) opacity = (1 - progress) / 0.12

        kidEl.style.left = `${pt.x.toFixed(1)}px`
        kidEl.style.top = `${pt.y.toFixed(1)}px`
        kidEl.style.opacity = String(opacity)
        kidEl.style.transform = `translate(-50%, -80%) rotate(${angle.toFixed(1)}deg)`
      }

      rafId = requestAnimationFrame(animateKid)
    }

    rafId = requestAnimationFrame(animateKid)
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [heroGeo])

  return (
    <section ref={heroRef} className="hero-storybook" id="home">
      {/* ── Background: Dark Starry Night Sky swooping into Warm Canvas ── */}
      <div className="hero-sb__sky">
        <span className="sb-star star-1">✦</span>
        <span className="sb-star star-2">+</span>
        <span className="sb-star star-3">★</span>
        <span className="sb-star star-4">+</span>
        <span className="sb-star star-5">✦</span>
        <span className="sb-star star-6">+</span>
        <span className="sb-star star-7">✦</span>
        <span className="sb-star star-8">★</span>

        {/* Playful Floating Sky Clouds */}
        <div className="sb-cloud cloud-1">
          <svg viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20,50 Q10,50 10,40 Q10,25 30,25 Q35,10 55,10 Q75,10 85,25 Q105,20 110,38 Q115,50 95,50 Z" fill="rgba(244, 114, 182, 0.28)" stroke="#f472b6" strokeWidth="2" strokeDasharray="4 3" />
          </svg>
        </div>
        <div className="sb-cloud cloud-2">
          <svg viewBox="0 0 140 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25,60 Q12,60 12,48 Q12,30 36,30 Q42,12 66,12 Q90,12 102,30 Q126,24 132,45 Q138,60 114,60 Z" fill="rgba(251, 191, 36, 0.22)" stroke="#fbbf24" strokeWidth="2" />
          </svg>
        </div>
        <StorybookCloud variant="white" className="sb-cloud cloud-3" />
        <StorybookCloud variant="dashed" className="sb-cloud cloud-4" />
      </div>

      {/* ── Organic Swoop Canvas: Separating Dark Sky and Cream Ground ── */}
      <div className="hero-sb__ground-wrap">
        <svg viewBox="0 0 1440 360" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,190 C360,290 620,70 1040,130 C1220,155 1350,110 1440,95 L1440,360 L0,360 Z" fill="#fdfbf4" />
        </svg>
      </div>

      {/* ── Smoothly Curved Thick Moving Rainbow Stream (Exact 1:1 Pixel Coordinates) ── */}
      <div className="hero-sb__ribbon-wrap">
        {heroGeo && (
          <svg
            className="hero-sb__ribbon-svg"
            viewBox={`0 0 ${heroGeo.width} ${heroGeo.height}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <path id="heroRainbowTrack" d={heroGeo.trackPath} />
            </defs>

            <path ref={sliderTrackRef} d={heroGeo.sliderPath} stroke="none" fill="none" />

            {heroGeo.bandPaths.map((band) => (
              <g key={band.color}>
                <path
                  d={band.d}
                  stroke={band.color}
                  strokeWidth="21"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.96"
                />
                <path
                  d={band.d}
                  stroke="#ffffff"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="44 210"
                  className="hero-sb__ribbon-streak"
                  style={{ animationDelay: band.delay }}
                />
              </g>
            ))}

            <g>
              <animateMotion dur="9s" repeatCount="indefinite">
                <mpath href="#heroRainbowTrack" />
              </animateMotion>
              <polygon
                points="0,-14 4,-4 14,-3 6,3 8,13 0,7.5 -8,13 -6,3 -14,-3 -4,-4"
                fill="#fde047"
                stroke="#ea580c"
                strokeWidth="2"
              />
            </g>
          </svg>
        )}

        <StorybookCloud variant="white" className="hero-sb__rainbow-cloud-start" />

        <div ref={slideKidRef} className="hero-sb__slide-kid" aria-hidden="true">
          <RainbowSlideKid />
        </div>

        <span className="stardust dust-1">✦</span>
        <span className="stardust dust-2">✦</span>
        <span className="stardust dust-3">✦</span>
        <span className="stardust dust-4">✦</span>

        <div className="hero-sb__plane">
          <svg viewBox="0 0 100 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10,40 L90,15 L45,60 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
            <path d="M45,60 L90,15 L35,38 Z" fill="#f8fafc" />
            <path d="M35,38 L45,60 L50,45 Z" fill="#cbd5e1" />
            <circle cx="50" cy="24" r="9" fill="#fed7aa" />
            <circle cx="48" cy="23" r="1.5" fill="#1e293b" />
            <circle cx="54" cy="23" r="1.5" fill="#1e293b" />
            <path d="M49,27 Q51,29 53,27" stroke="#9a3412" strokeWidth="1.2" fill="none" />
            <path d="M41,18 Q50,11 60,18 Z" fill="#ec4899" />
          </svg>
        </div>
      </div>

      {/* ── Central Typography & Call To Action Together in Center & Middle ── */}
      <div className="container hero-sb__container">
        <motion.div
          className="hero-sb__header"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="hero-sb__title">
            Nirankur
          </h1>

          <p className="hero-sb__motto">
            Where Learning Meets Imagination <span className="motto-dot">•</span> The Foundation Stage
          </p>

          <div className="hero-sb__cta-wrap">
            <button className="btn hero-sb__btn" onClick={handleEnroll}>
              <span>Enroll Now</span>
              <svg
                className="btn-sparkle"
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>

      {/* ── Lower Scene Anchored Directly to Viewport Corners (Clear of Center Title & Motto!) ── */}
      <div className="hero-sb__left-scene">
        <motion.div
          className="hero-sb__blurb"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p>
            Our preschool is a joyful space where children learn, play, and dream freely.
            With caring teachers and a safe environment, we make every moment of learning fun and meaningful.
          </p>
        </motion.div>

        <div className="hero-sb__painter">
          <svg viewBox="0 0 160 260" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="85" y1="160" x2="140" y2="20" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
            <rect x="130" y="8" width="26" height="14" rx="3" fill="#38bdf8" />
            <path d="M125,15 L143,15 L143,30 L138,40" stroke="#64748b" strokeWidth="3" fill="none" />
            <circle cx="143" cy="38" r="3" fill="#f59e0b" />
            <circle cx="132" cy="30" r="2.5" fill="#ec4899" />

            <rect x="65" y="145" width="38" height="65" rx="10" fill="#f97316" />
            <line x1="72" y1="130" x2="72" y2="155" stroke="#ea580c" strokeWidth="4" />
            <line x1="96" y1="130" x2="96" y2="155" stroke="#ea580c" strokeWidth="4" />
            <path d="M68,130 Q84,124 100,130 L100,148 L68,148 Z" fill="#ffffff" />
            <path d="M68,135 Q78,145 92,142 L110,95" stroke="#fed7aa" strokeWidth="8" strokeLinecap="round" />
            <circle cx="110" cy="95" r="5" fill="#fdba74" />

            <rect x="68" y="205" width="12" height="30" rx="4" fill="#f97316" />
            <rect x="88" y="205" width="12" height="30" rx="4" fill="#f97316" />
            <ellipse cx="72" cy="238" rx="10" ry="6" fill="#e2e8f0" />
            <ellipse cx="96" cy="238" rx="10" ry="6" fill="#e2e8f0" />

            <circle cx="84" cy="106" r="18" fill="#fed7aa" />
            <circle cx="72" cy="95" r="9" fill="#92400e" />
            <circle cx="82" cy="90" r="10" fill="#92400e" />
            <circle cx="94" cy="94" r="9" fill="#92400e" />
            <circle cx="70" cy="104" r="8" fill="#92400e" />
            <circle cx="88" cy="106" r="2" fill="#1e293b" />
            <path d="M85,113 Q89,116 93,113" stroke="#b45309" strokeWidth="1.5" fill="none" />
            <circle cx="86" cy="111" r="3" fill="#fca5a5" opacity="0.6" />

            <path d="M115,225 L135,225 L132,245 L118,245 Z" fill="#cbd5e1" />
            <ellipse cx="125" cy="225" rx="10" ry="3" fill="#a855f7" />
            <path d="M125,225 L125,232" stroke="#a855f7" strokeWidth="3" />
          </svg>
        </div>
      </div>

      <div className="hero-sb__meadow-kids" aria-hidden="true">
        <svg viewBox="0 0 180 140" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="36" y1="68" x2="26" y2="28" stroke="#94a3b8" strokeWidth="2" />
          <ellipse cx="26" cy="20" rx="11" ry="14" fill="#22c55e" />
          <line x1="140" y1="62" x2="152" y2="26" stroke="#94a3b8" strokeWidth="2" />
          <ellipse cx="152" cy="18" rx="11" ry="14" fill="#f59e0b" />

          <g transform="translate(24, 38)">
            <circle cx="28" cy="24" r="14" fill="#fed7aa" />
            <path d="M14,22 Q20,6 30,8 Q42,8 42,22 Q34,15 28,16 Q20,16 14,22 Z" fill="#78350f" />
            <circle cx="23" cy="24" r="1.8" fill="#1e293b" />
            <circle cx="33" cy="24" r="1.8" fill="#1e293b" />
            <path d="M24,30 Q28,33 32,30" stroke="#9a3412" strokeWidth="1.6" fill="none" />
            <rect x="16" y="39" width="24" height="32" rx="7" fill="#a855f7" />
            <rect x="17" y="69" width="9" height="18" rx="3" fill="#0ea5e9" />
            <rect x="30" y="69" width="9" height="18" rx="3" fill="#0ea5e9" />
            <path d="M16,45 Q8,36 12,28" stroke="#fed7aa" strokeWidth="5.5" strokeLinecap="round" />
            <path d="M40,45 L54,50" stroke="#fed7aa" strokeWidth="5.5" strokeLinecap="round" />
          </g>

          <g transform="translate(92, 40)">
            <circle cx="28" cy="24" r="14" fill="#fed7aa" />
            <path d="M14,22 Q20,7 30,9 Q42,9 42,22 Q34,14 28,15 Q20,15 14,22 Z" fill="#1e293b" />
            <circle cx="12" cy="24" r="5.5" fill="#1e293b" />
            <circle cx="44" cy="24" r="5.5" fill="#1e293b" />
            <circle cx="23" cy="24" r="1.8" fill="#1e293b" />
            <circle cx="33" cy="24" r="1.8" fill="#1e293b" />
            <circle cx="28" cy="30" r="2.5" fill="#f43f5e" />
            <path d="M16,39 L40,39 L45,70 L11,70 Z" fill="#f43f5e" />
            <rect x="18" y="70" width="8" height="15" rx="3" fill="#fed7aa" />
            <rect x="30" y="70" width="8" height="15" rx="3" fill="#fed7aa" />
            <path d="M16,45 L-10,48" stroke="#fed7aa" strokeWidth="5.5" strokeLinecap="round" />
            <path d="M40,45 Q50,36 48,24" stroke="#fed7aa" strokeWidth="5.5" strokeLinecap="round" />
          </g>
        </svg>
      </div>

      <motion.div
        className="hero-sb__right-scene"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <svg viewBox="0 0 340 260" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="170" cy="180" r="76" fill="#fef9c3" opacity="0.55" />
          <circle cx="170" cy="180" r="52" fill="#fef08a" opacity="0.7" />

          <g transform="translate(110, 160)">
            <path d="M10,38 L60,48 L110,38 L105,48 L60,56 L15,48 Z" fill="#0284c7" />
            <path d="M12,36 Q38,28 58,45 L58,20 Q36,6 12,12 Z" fill="#ffffff" />
            <path d="M16,16 Q36,10 54,23 L54,38 Q36,24 16,30 Z" fill="#fef9c3" />
            <path d="M62,45 Q82,28 108,36 L108,12 Q84,6 62,20 Z" fill="#ffffff" />
            <path d="M66,23 Q84,10 104,16 L104,30 Q84,24 66,38 Z" fill="#fef9c3" />
            <path d="M80,24 Q88,20 92,25 Q88,29 80,26 Z" fill="#38bdf8" />
            <polygon points="92,25 96,21 96,29" fill="#38bdf8" />
          </g>

          <g transform="translate(70, 75)">
            <circle cx="50" cy="45" r="22" fill="#fed7aa" />
            <path d="M28,45 Q32,20 52,20 Q72,20 72,45 Q64,28 50,30 Q36,30 28,45 Z" fill="#78350f" />
            <ellipse cx="44" cy="44" rx="3.5" ry="4.5" fill="#1e293b" />
            <circle cx="45" cy="43" r="1.5" fill="#ffffff" />
            <ellipse cx="58" cy="44" rx="3.5" ry="4.5" fill="#1e293b" />
            <circle cx="59" cy="43" r="1.5" fill="#ffffff" />
            <path d="M47,54 Q51,58 55,54" stroke="#9a3412" strokeWidth="2" strokeLinecap="round" fill="none" />
            <circle cx="40" cy="50" r="4" fill="#fca5a5" opacity="0.6" />
            <circle cx="62" cy="50" r="4" fill="#fca5a5" opacity="0.6" />

            <rect x="34" y="68" width="34" height="42" rx="8" fill="#38bdf8" />
            <line x1="34" y1="78" x2="68" y2="78" stroke="#ffffff" strokeWidth="3" />
            <line x1="34" y1="88" x2="68" y2="88" stroke="#ffffff" strokeWidth="3" />
            <line x1="34" y1="98" x2="68" y2="98" stroke="#ffffff" strokeWidth="3" />

            <path d="M36,72 Q26,90 48,102" stroke="#fed7aa" strokeWidth="8" strokeLinecap="round" fill="none" />
            <path d="M66,72 Q76,90 62,102" stroke="#fed7aa" strokeWidth="8" strokeLinecap="round" fill="none" />
            <rect x="36" y="105" width="30" height="14" rx="4" fill="#1e3a8a" />
          </g>

          <g transform="translate(175, 80)">
            <circle cx="45" cy="45" r="22" fill="#fed7aa" />
            <path d="M24,45 Q28,20 48,20 Q66,20 66,45 Q58,28 46,30 Q34,30 24,45 Z" fill="#b45309" />
            <circle cx="20" cy="50" r="8" fill="#b45309" />
            <circle cx="24" cy="46" r="3" fill="#ec4899" />
            <circle cx="70" cy="50" r="8" fill="#b45309" />
            <circle cx="66" cy="46" r="3" fill="#ec4899" />

            <ellipse cx="38" cy="45" rx="3.5" ry="4.5" fill="#1e293b" />
            <circle cx="39" cy="44" r="1.5" fill="#ffffff" />
            <ellipse cx="52" cy="45" rx="3.5" ry="4.5" fill="#1e293b" />
            <circle cx="53" cy="44" r="1.5" fill="#ffffff" />
            <circle cx="45" cy="55" r="3" fill="#dc2626" />
            <circle cx="33" cy="51" r="4" fill="#fca5a5" opacity="0.6" />
            <circle cx="57" cy="51" r="4" fill="#fca5a5" opacity="0.6" />

            <rect x="28" y="68" width="34" height="40" rx="8" fill="#f472b6" />
            <path d="M30,72 Q18,90 28,100" stroke="#fed7aa" strokeWidth="8" strokeLinecap="round" fill="none" />
            <path d="M60,72 Q66,92 40,100" stroke="#fed7aa" strokeWidth="8" strokeLinecap="round" fill="none" />
            <path d="M26,104 L64,104 L68,120 L22,120 Z" fill="#38bdf8" />
          </g>
        </svg>
      </motion.div>
    </section>
  )
}

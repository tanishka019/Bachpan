import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './WhyBachpan.css'

export default function WhyNirankur() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const handleEnroll = () => {
    window.dispatchEvent(new CustomEvent('bachpan-open-enroll', { detail: { program: 'Nursery' } }))
  }

  return (
    <section className="about-school" id="why-nirankur" ref={ref}>
      <span id="why-wonder-roots" style={{ position: 'relative', top: '-100px', visibility: 'hidden' }} />
      <span id="why-bachpan" style={{ position: 'relative', top: '-100px', visibility: 'hidden' }} />

      {/* Huge Faint Watermark Text matching reference image */}
      <div className="about-school__watermark">
        <span>ABOUT OUR SCHOOL</span>
      </div>

      <div className="container about-school__container">
        {/* Title */}
        <motion.div
          className="about-school__header"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="about-school__title">
            Where Every Child's <br />
            Journey Begins in Color
          </h2>
        </motion.div>

        {/* 2-Column Story Content */}
        <div className="about-school__layout">
          {/* Left Column: Narrative Copy & CTA */}
          <motion.div
            className="about-school__text-col"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <p className="about-school__paragraph">
              At <strong>Nirankur Preschool</strong>, we believe that every child is unique and full of potential. Just like the colors of a rainbow and the tender sprout in our logo, each little learner shines in their own way.
            </p>

            <p className="about-school__paragraph">
              Our safe, nurturing, and creative environment encourages children to explore, imagine, and grow while building a strong foundation for lifelong learning. With caring teachers, engaging activities, and a playful approach, we make every day a joyful adventure.
            </p>

            <div className="about-school__cta-wrap">
              <button className="btn btn-primary about-school__btn" onClick={handleEnroll}>
                Read More
              </button>
            </div>
          </motion.div>

          {/* Right Column: Framed Real Campus Photo with Illustrated Kids & ABC Blocks */}
          <motion.div
            className="about-school__visual-col"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <div className="about-school__photo-frame">
              <img
                src="/hero-1.jpg"
                alt="Teacher and young student discovering learning blocks at Nirankur"
                className="about-school__photo"
              />

              {/* Playful Floating Children & ABC Blocks Illustration Accent */}
              <div className="about-school__abc-accent">
                <svg viewBox="0 0 240 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Floating Balloons */}
                  <circle cx="28" cy="40" r="14" fill="#ec4899" />
                  <path d="M28,54 L28,75" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 2" />
                  <circle cx="48" cy="28" r="12" fill="#38bdf8" />
                  <path d="M48,40 L48,65" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 2" />

                  {/* Magnifying Glass of Curiosity */}
                  <circle cx="85" cy="42" r="14" stroke="#eab308" strokeWidth="4" fill="rgba(254, 240, 138, 0.4)" />
                  <line x1="95" y1="52" x2="110" y2="67" stroke="#ca8a04" strokeWidth="4" strokeLinecap="round" />

                  {/* World Globe */}
                  <circle cx="195" cy="65" r="18" fill="#38bdf8" />
                  <path d="M185,55 Q195,65 190,75 Q205,70 205,60" fill="#22c55e" />
                  <path d="M195,83 L195,95 L185,95 L205,95" stroke="#64748b" strokeWidth="3" />

                  {/* Colorful ABC Blocks */}
                  {/* Block A: Green */}
                  <rect x="75" y="110" width="34" height="34" rx="6" fill="#22c55e" />
                  <text x="92" y="134" textAnchor="middle" fill="#ffffff" fontFamily="var(--font-heading)" fontWeight="900" fontSize="20">A</text>

                  {/* Block B: Purple */}
                  <rect x="115" y="110" width="34" height="34" rx="6" fill="#a855f7" />
                  <text x="132" y="134" textAnchor="middle" fill="#ffffff" fontFamily="var(--font-heading)" fontWeight="900" fontSize="20">B</text>

                  {/* Block C: Yellow */}
                  <rect x="95" y="72" width="34" height="34" rx="6" fill="#f59e0b" />
                  <text x="112" y="96" textAnchor="middle" fill="#ffffff" fontFamily="var(--font-heading)" fontWeight="900" fontSize="20">C</text>

                  {/* Little Smiling Explorer Behind Blocks */}
                  <circle cx="95" cy="50" r="12" fill="#fed7aa" />
                  <circle cx="91" cy="48" r="1.5" fill="#1e293b" />
                  <circle cx="99" cy="48" r="1.5" fill="#1e293b" />
                  <path d="M92,53 Q95,56 98,53" stroke="#b45309" strokeWidth="1" fill="none" />
                  <path d="M85,42 Q95,34 105,42 Z" fill="#eab308" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

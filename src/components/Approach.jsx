import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './Approach.css'

const steps = [
  {
    number: '01',
    emoji: '🔍',
    title: 'Explore & Discover',
    desc: 'Children are natural explorers. We create rich environments with hands-on materials that spark curiosity and encourage children to investigate the world around them.',
    highlight: 'Inquiry-based learning at its core',
    color: 'step-purple',
    side: 'left',
  },
  {
    number: '02',
    emoji: '🤝',
    title: 'Connect & Collaborate',
    desc: 'Through group activities, storytelling circles, and collaborative projects, children develop empathy, communication, and the ability to work with others.',
    highlight: 'Social-emotional intelligence built daily',
    color: 'step-teal',
    side: 'right',
  },
  {
    number: '03',
    emoji: '✨',
    title: 'Create & Express',
    desc: 'From painting and clay to music and drama, we provide diverse creative outlets that help children express themselves and build confidence in their unique voice.',
    highlight: '15+ creative modalities every week',
    color: 'step-coral',
    side: 'left',
  },
  {
    number: '04',
    emoji: '🚀',
    title: 'Grow & Thrive',
    desc: 'We track each child\'s milestones and celebrate their individual progress, ensuring they leave Wonder Roots not just school-ready, but life-ready.',
    highlight: 'Personalized growth tracking for every child',
    color: 'step-golden',
    side: 'right',
  },
]

export default function Approach() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="approach section-py" id="approach" ref={ref}>
      {/* Background decoration */}
      <div className="approach__bg-deco">
        <div className="approach__bg-circle approach__bg-circle--1" />
        <div className="approach__bg-circle approach__bg-circle--2" />
      </div>

      <div className="container">
        <motion.div
          className="approach__header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-badge">🌱 Our Approach</span>
          <h2 className="section-title">
            How We Help Children <span>Flourish</span>
          </h2>
          <p className="section-subtitle">
            Our four-pillar learning philosophy is built on decades of early childhood research and designed to make every moment meaningful.
          </p>
        </motion.div>

        <div className="approach__steps">
          {/* Connecting line */}
          <div className="approach__line" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className={`approach-step approach-step--${step.side}`}
              initial={{ opacity: 0, x: step.side === 'left' ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }}
            >
              {/* Number node */}
              <div className={`approach-step__node ${step.color}`}>
                <span className="approach-step__emoji">{step.emoji}</span>
                <span className="approach-step__num">{step.number}</span>
              </div>

              {/* Content */}
              <div className={`approach-step__card ${step.color}-card`}>
                <h3 className="approach-step__title">{step.title}</h3>
                <p className="approach-step__desc">{step.desc}</p>
                <div className="approach-step__highlight">
                  <span>⚡</span>
                  {step.highlight}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

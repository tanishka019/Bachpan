import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './Approach.css'

const steps = [
  {
    number: '01',
    emoji: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>,
    title: 'Explore & Discover',
    desc: 'Children are natural explorers. We create rich environments with hands-on materials that spark curiosity and encourage children to investigate the world around them.',
    highlight: 'Inquiry-based learning at its core',
    color: 'step-purple',
    side: 'left',
  },
  {
    number: '02',
    emoji: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    title: 'Connect & Collaborate',
    desc: 'Through group activities, storytelling circles, and collaborative projects, children develop empathy, communication, and the ability to work with others.',
    highlight: 'Social-emotional intelligence built daily',
    color: 'step-teal',
    side: 'right',
  },
  {
    number: '03',
    emoji: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
    title: 'Create & Express',
    desc: 'From painting and clay to music and drama, we provide diverse creative outlets that help children express themselves and build confidence in their unique voice.',
    highlight: '15+ creative modalities every week',
    color: 'step-coral',
    side: 'left',
  },
  {
    number: '04',
    emoji: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /></svg>,
    title: 'Grow & Thrive',
    desc: 'We track each child\'s milestones and celebrate their individual progress, ensuring they leave Nirankur not just school-ready, but life-ready.',
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
          <span className="section-badge badge-rose">Our Approach</span>
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
                  <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg></span>
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

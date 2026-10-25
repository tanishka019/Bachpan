import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './WhyBachpan.css'

const features = [
  {
    icon: '🧠',
    title: 'Holistic Development',
    desc: 'We nurture cognitive, emotional, social, and physical growth through our 360° development framework.',
    color: 'feat-purple',
  },
  {
    icon: '👩‍🏫',
    title: 'Expert Educators',
    desc: 'Our teachers are certified early childhood professionals trained in child psychology and modern pedagogy.',
    color: 'feat-teal',
  },
  {
    icon: '🛡️',
    title: 'Safe & Secure',
    desc: 'CCTV-monitored campuses, secure entry systems, and child-safe furniture ensure complete peace of mind.',
    color: 'feat-coral',
  },
  {
    icon: '🎨',
    title: 'Creative Curriculum',
    desc: 'Art, music, drama, and storytelling are woven into everyday learning to fuel imagination and expression.',
    color: 'feat-golden',
  },
  {
    icon: '🌿',
    title: 'Green Spaces',
    desc: 'Dedicated outdoor play areas and nature corners where children connect with the world around them.',
    color: 'feat-green',
  },
  {
    icon: '📱',
    title: 'Parent Connect',
    desc: 'Real-time updates, daily reports, and parent-teacher sessions keep you deeply involved in your child\'s journey.',
    color: 'feat-blue',
  },
]

export default function WhyWonderRoots() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="why section-py" id="why-wonder-roots" ref={ref}>
      <span id="why-bachpan" style={{ position: 'relative', top: '-100px', visibility: 'hidden' }} />
      <div className="container">
        <div className="why__layout">
          {/* Left: Header */}
          <motion.div
            className="why__header"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge">💜 Why Choose Us</span>
            <h2 className="section-title">
              What Makes Wonder Roots <span>Different</span>
            </h2>
            <p className="section-subtitle">
              We go beyond academics. At Wonder Roots, we create an ecosystem where every child feels loved, challenged, and celebrated for who they are.
            </p>
            <div className="why__award">
              <span className="why__award-icon">🏆</span>
              <div>
                <strong>Award-Winning Institution</strong>
                <p>Recognized as India's most trusted preschool network for 3 consecutive years</p>
              </div>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })}
            >
              Schedule a Visit →
            </button>
          </motion.div>

          {/* Right: Feature Grid */}
          <div className="why__grid">
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                className={`feat-card ${feat.color}`}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              >
                <div className="feat-card__icon">{feat.icon}</div>
                <h3 className="feat-card__title">{feat.title}</h3>
                <p className="feat-card__desc">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

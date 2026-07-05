import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './Programs.css'

const programs = [
  {
    id: 'playgroup',
    emoji: '🧸',
    title: 'Playgroup',
    age: '1.5 – 2.5 years',
    color: 'card-purple',
    description: 'A gentle first step into the world of learning. Through sensory play, music, and movement, we help toddlers explore their world safely.',
    features: ['Sensory Activities', 'Music & Rhythm', 'Motor Development', 'Social Skills'],
    tag: 'Most Popular',
    tagColor: 'coral',
  },
  {
    id: 'nursery',
    emoji: '🌱',
    title: 'Nursery',
    age: '2.5 – 3.5 years',
    color: 'card-teal',
    description: 'Building confidence and curiosity through structured play, creative arts, storytelling, and early literacy foundations.',
    features: ['Pre-Reading Skills', 'Art & Creativity', 'Language Development', 'Outdoor Play'],
    tag: 'Foundation Builder',
    tagColor: 'teal',
  },
  {
    id: 'lkg',
    emoji: '📚',
    title: 'LKG',
    age: '3.5 – 4.5 years',
    color: 'card-coral',
    description: 'Introducing numbers, letters, and logical thinking in an engaging environment that sparks a genuine love for learning.',
    features: ['Early Numeracy', 'Phonics & Reading', 'Science Exploration', 'Critical Thinking'],
    tag: 'Academic Start',
    tagColor: 'coral',
  },
  {
    id: 'ukg',
    emoji: '🎓',
    title: 'UKG',
    age: '4.5 – 6 years',
    color: 'card-golden',
    description: 'Preparing children for formal schooling with advanced literacy, numeracy, and life skills while keeping learning joyful.',
    features: ['Advanced Literacy', 'Math Concepts', 'Life Skills', 'School Readiness'],
    tag: 'School Ready',
    tagColor: 'golden',
  },
]

export default function Programs() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="programs section-py" id="programs" ref={ref}>
      <div className="container">
        <motion.div
          className="programs__header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-badge">🎒 Our Programs</span>
          <h2 className="section-title">
            Learning Journeys for <span>Every Stage</span>
          </h2>
          <p className="section-subtitle">
            Age-appropriate programs crafted by early childhood experts to ensure holistic development — cognitively, socially, emotionally, and physically.
          </p>
        </motion.div>

        <div className="programs__grid">
          {programs.map((prog, i) => (
            <motion.div
              key={prog.id}
              className={`prog-card ${prog.color}`}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="prog-card__top">
                <div className="prog-card__emoji">{prog.emoji}</div>
                <span className={`tag prog-card__tag tag--${prog.tagColor}`}>{prog.tag}</span>
              </div>

              <div className="prog-card__info">
                <h3 className="prog-card__title">{prog.title}</h3>
                <div className="prog-card__age">
                  <span>👶</span> {prog.age}
                </div>
                <p className="prog-card__desc">{prog.description}</p>
              </div>

              <ul className="prog-card__features">
                {prog.features.map(f => (
                  <li key={f} className="prog-card__feature">
                    <span className="prog-card__check">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                className="prog-card__btn"
                onClick={() => document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More →
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

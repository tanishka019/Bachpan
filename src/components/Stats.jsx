import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import './Stats.css'

const stats = [
  { value: 500, suffix: '+', label: 'Learning Centers', icon: '🏫' },
  { value: 50000, suffix: '+', label: 'Happy Children', icon: '😊', format: '50K+' },
  { value: 15, suffix: '+', label: 'Years of Excellence', icon: '🏆' },
  { value: 200, suffix: '+', label: 'Cities Across India', icon: '🌍' },
]

function CountUp({ target, suffix, format, start }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return
    const duration = 2000
    const step = target / (duration / 16)
    let current = 0
    const timer = setInterval(() => {
      current = Math.min(current + step, target)
      setCount(Math.floor(current))
      if (current >= target) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [start, target])

  if (format) return <span>{count >= target ? format : count.toLocaleString()}</span>
  return <span>{count.toLocaleString()}{suffix}</span>
}

export default function Stats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="stats" ref={ref} id="stats">
      <div className="container">
        <div className="stats__grid">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="stats__item"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.5 }}
            >
              <div className="stats__icon">{stat.icon}</div>
              <div className="stats__number">
                <CountUp
                  target={stat.value}
                  suffix={stat.suffix}
                  format={stat.format}
                  start={inView}
                />
              </div>
              <div className="stats__label">{stat.label}</div>
              {i < stats.length - 1 && <div className="stats__divider" />}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

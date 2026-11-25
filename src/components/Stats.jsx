import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import './Stats.css'

const stats = [
  { value: 500, suffix: '+', label: 'Learning Centers', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 22v-4a2 2 0 1 0-4 0v4" /><path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2" /><path d="M18 5v17" /><path d="m4 6 8-4 8 4" /><path d="M6 5v17" /></svg>, color: '#fbbf24' },
  { value: 50000, suffix: '+', label: 'Happy Children', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" x2="9.01" y1="9" y2="9" /><line x1="15" x2="15.01" y1="9" y2="9" /></svg>, format: '50K+', color: '#fb7185' },
  { value: 15, suffix: '+', label: 'Years of Excellence', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></svg>, color: '#38bdf8' },
  { value: 200, suffix: '+', label: 'Cities Across India', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>, color: '#4ade80' },
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
              <div className="stats__number" style={{ color: stat.color }}>
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

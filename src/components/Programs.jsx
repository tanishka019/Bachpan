import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './Programs.css'

export default function Programs() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const handleEnroll = (programTitle) => {
    window.dispatchEvent(
      new CustomEvent('bachpan-open-enroll', {
        detail: { program: programTitle },
      })
    )
  }

  return (
    <section className="programs-storybook" id="programs" ref={ref}>
      {/* Huge Faint Watermark Text */}
      <div className="programs-sb__watermark">
        <span>OUR PROGRAMS</span>
      </div>

      <div className="container programs-sb__container">
        {/* Title */}
        <motion.div
          className="programs-sb__header"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="programs-sb__title">
            Learning Through <br />
            Play, Creativity, And Care
          </h2>
        </motion.div>

        {/* 3 Colorful Story Cards matching Reference Image */}
        <div className="programs-sb__grid">
          {/* Card 1: PlayGroup (Sky Blue Card) */}
          <motion.div
            className="prog-card-sb prog-card-sb--blue"
            initial={{ opacity: 0, y: 36 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.55 }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            onClick={() => handleEnroll('Playgroup')}
          >
            <div className="prog-card-sb__content">
              <h3 className="prog-card-sb__title">PlayGroup</h3>
              <p className="prog-card-sb__desc">
                Children in this age group are identified as Toddlers. Children are born curious. They begin to explore their sensory world freely. With caring teachers and a safe environment, we make every moment of learning fun and meaningful.
              </p>
              <div className="prog-card-sb__meta">
                <span>Admission Age Group: 1.5 – 2.5 Years</span>
                <span>Duration: 2.5 Hours/Day</span>
              </div>
            </div>

            {/* Illustration Scene: Teacher and Toddler with Toy Block */}
            <div className="prog-card-sb__illustration">
              <svg viewBox="0 0 280 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Carpet Base */}
                <ellipse cx="140" cy="130" rx="120" ry="10" fill="rgba(255, 255, 255, 0.3)" />

                {/* Teacher sitting */}
                <g transform="translate(65, 20)">
                  {/* Hair */}
                  <circle cx="50" cy="35" r="18" fill="#78350f" />
                  <path d="M32,35 Q50,15 68,35 Q65,48 50,48 Q35,48 32,35 Z" fill="#78350f" />
                  {/* Face */}
                  <circle cx="50" cy="38" r="14" fill="#fed7aa" />
                  <circle cx="46" cy="37" r="1.5" fill="#1e293b" />
                  <circle cx="54" cy="37" r="1.5" fill="#1e293b" />
                  <path d="M48,43 Q50,46 52,43" stroke="#b45309" strokeWidth="1" fill="none" />
                  {/* Blue Cardigan */}
                  <path d="M34,54 L66,54 L72,95 L28,95 Z" fill="#0284c7" />
                  {/* Arms holding toddler */}
                  <path d="M32,58 Q20,75 52,82" stroke="#fed7aa" strokeWidth="6" strokeLinecap="round" />
                  <path d="M68,58 Q80,75 62,82" stroke="#fed7aa" strokeWidth="6" strokeLinecap="round" />
                </g>

                {/* Happy Toddler */}
                <g transform="translate(145, 45)">
                  {/* Head */}
                  <circle cx="30" cy="28" r="13" fill="#fed7aa" />
                  <circle cx="27" cy="27" r="1.5" fill="#1e293b" />
                  <circle cx="33" cy="27" r="1.5" fill="#1e293b" />
                  <circle cx="30" cy="33" r="2" fill="#ef4444" />
                  {/* Hair */}
                  <path d="M18,25 Q30,12 42,25 Z" fill="#b45309" />
                  {/* Yellow Toddler Onesie */}
                  <rect x="20" y="42" width="20" height="28" rx="6" fill="#fef08a" />
                  {/* Arms hugging */}
                  <path d="M18,46 Q8,52 14,60" stroke="#fed7aa" strokeWidth="5" strokeLinecap="round" />
                  {/* Building Block */}
                  <rect x="42" y="55" width="14" height="14" rx="3" fill="#ef4444" />
                </g>
              </svg>
            </div>
          </motion.div>

          {/* Card 2: Nursery (Fresh Sprout Green Card) */}
          <motion.div
            className="prog-card-sb prog-card-sb--green"
            initial={{ opacity: 0, y: 36 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.55 }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            onClick={() => handleEnroll('Nursery')}
          >
            <div className="prog-card-sb__content">
              <h3 className="prog-card-sb__title">Nursery</h3>
              <p className="prog-card-sb__desc">
                The child is now identified as a Preschooler (Foundational Stage Level 1). Curiosity blooms through storytelling, phonics, color exploration, and the magic of making their very first best friends.
              </p>
              <div className="prog-card-sb__meta">
                <span>Admission Age Group: 2.5 – 3.5 Years</span>
                <span>Duration: 3 Hours/Day</span>
              </div>
            </div>

            {/* Illustration Scene: Teacher and Child at Drawing Table */}
            <div className="prog-card-sb__illustration">
              <svg viewBox="0 0 280 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Carpet Base */}
                <ellipse cx="140" cy="130" rx="120" ry="10" fill="rgba(255, 255, 255, 0.3)" />

                {/* Teacher sitting by table */}
                <g transform="translate(60, 15)">
                  {/* Hair */}
                  <circle cx="45" cy="35" r="17" fill="#78350f" />
                  <circle cx="45" cy="38" r="14" fill="#fed7aa" />
                  <circle cx="42" cy="37" r="1.5" fill="#1e293b" />
                  <circle cx="48" cy="37" r="1.5" fill="#1e293b" />
                  <path d="M43,43 Q45,46 47,43" stroke="#b45309" strokeWidth="1" fill="none" />
                  {/* Purple/Blue Shirt */}
                  <path d="M30,54 L60,54 L66,98 L24,98 Z" fill="#6366f1" />
                  {/* Arm guiding drawing */}
                  <path d="M58,58 Q82,70 95,85" stroke="#fed7aa" strokeWidth="6" strokeLinecap="round" />
                </g>

                {/* Drawing Desk & Paper */}
                <rect x="110" y="80" width="85" height="10" rx="3" fill="#ffffff" />
                <rect x="120" y="70" width="40" height="20" rx="2" fill="#fef9c3" />
                <line x1="125" y1="76" x2="155" y2="76" stroke="#38bdf8" strokeWidth="2" />
                <line x1="125" y1="82" x2="145" y2="82" stroke="#ef4444" strokeWidth="2" />

                {/* Child Drawing */}
                <g transform="translate(170, 35)">
                  <circle cx="28" cy="26" r="13" fill="#fed7aa" />
                  <circle cx="25" cy="25" r="1.5" fill="#1e293b" />
                  <circle cx="31" cy="25" r="1.5" fill="#1e293b" />
                  <path d="M26,30 Q28,33 30,30" stroke="#b45309" strokeWidth="1" fill="none" />
                  <path d="M16,22 Q28,10 40,22 Z" fill="#92400e" />
                  {/* Orange Shirt */}
                  <rect x="18" y="40" width="20" height="30" rx="5" fill="#f97316" />
                  {/* Hand holding crayon */}
                  <path d="M20,44 Q8,60 -5,55" stroke="#fed7aa" strokeWidth="5" strokeLinecap="round" />
                  <rect x="-8" y="52" width="5" height="10" rx="1" fill="#22c55e" />
                </g>
              </svg>
            </div>
          </motion.div>

          {/* Card 3: Junior KG (Sunset Coral Card) */}
          <motion.div
            className="prog-card-sb prog-card-sb--coral"
            initial={{ opacity: 0, y: 36 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.55 }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            onClick={() => handleEnroll('Junior KG')}
          >
            <div className="prog-card-sb__content">
              <h3 className="prog-card-sb__title">Junior KG</h3>
              <p className="prog-card-sb__desc">
                This is Level 2 and 3 of Foundational Stage. Children master foundational numeracy, expressive dialogue, and logical reasoning — stepping forward ready for formal schooling.
              </p>
              <div className="prog-card-sb__meta">
                <span>Admission Age Group: 3.5 – 5 Years</span>
                <span>Duration: 3.5 Hours/Day</span>
              </div>
            </div>

            {/* Illustration Scene: Teacher Reading Big Book to Children */}
            <div className="prog-card-sb__illustration">
              <svg viewBox="0 0 280 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Carpet Base */}
                <ellipse cx="140" cy="130" rx="120" ry="10" fill="rgba(255, 255, 255, 0.3)" />

                {/* Teacher holding open storybook */}
                <g transform="translate(135, 10)">
                  <circle cx="45" cy="35" r="17" fill="#78350f" />
                  <circle cx="45" cy="38" r="14" fill="#fed7aa" />
                  <circle cx="42" cy="37" r="1.5" fill="#1e293b" />
                  <circle cx="48" cy="37" r="1.5" fill="#1e293b" />
                  <path d="M43,43 Q45,46 47,43" stroke="#b45309" strokeWidth="1" fill="none" />
                  {/* Teal/Green Cardigan */}
                  <path d="M30,54 L60,54 L66,98 L24,98 Z" fill="#0d9488" />

                  {/* Open Storybook */}
                  <path d="M2,62 L28,72 L54,62 L50,72 L28,80 L6,72 Z" fill="#ea580c" />
                  <path d="M4,60 Q18,52 28,66 L28,48 Q18,36 4,42 Z" fill="#ffffff" />
                  <path d="M30,66 Q40,52 54,60 L54,42 Q40,36 30,48 Z" fill="#ffffff" />
                </g>

                {/* Child listening intently */}
                <g transform="translate(55, 35)">
                  <circle cx="28" cy="26" r="13" fill="#fed7aa" />
                  <circle cx="25" cy="25" r="1.5" fill="#1e293b" />
                  <circle cx="31" cy="25" r="1.5" fill="#1e293b" />
                  <circle cx="28" cy="31" r="2.5" fill="#ef4444" />
                  <path d="M16,22 Q28,10 40,22 Z" fill="#1e293b" />
                  <rect x="18" y="40" width="20" height="30" rx="5" fill="#3b82f6" />
                </g>
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

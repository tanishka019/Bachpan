import { motion } from 'framer-motion'
import './Hero.css'

export default function Hero() {
  const handleCta = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const handleEnroll = () => {
    window.dispatchEvent(new CustomEvent('bachpan-open-enroll', { detail: { program: 'Playgroup' } }))
  }

  return (
    <section className="hero-storybook" id="home">
      {/* ── Background: Dark Starry Night Sky swooping into Warm Canvas ── */}
      <div className="hero-sb__sky">
        {/* Twinkling Stars */}
        <span className="sb-star star-1">✦</span>
        <span className="sb-star star-2">+</span>
        <span className="sb-star star-3">★</span>
        <span className="sb-star star-4">+</span>
        <span className="sb-star star-5">✦</span>
        <span className="sb-star star-6">+</span>
        <span className="sb-star star-7">✦</span>
        <span className="sb-star star-8">★</span>

        {/* Playful Floating Clouds */}
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
      </div>

      {/* ── Organic Swoop Canvas: Separating Dark Sky and Cream Ground ── */}
      <div className="hero-sb__ground-wrap">
        <svg viewBox="0 0 1440 460" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          {/* Organic painted scoop line */}
          <path d="M0,280 C360,380 620,120 1040,190 C1220,220 1350,170 1440,150 L1440,460 L0,460 Z" fill="#fdfbf4" />
        </svg>
      </div>

      {/* ── The Continuous Multi-Color Ribbon Stream ── */}
      <div className="hero-sb__ribbon-wrap">
        <svg viewBox="0 0 1440 720" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="ribbonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Sweeping Ribbon Streams originating from the glowing book and swooping across */}
          {/* Stream 1: Red */}
          <path d="M-40,110 C220,10 440,240 680,240 C980,240 1080,480 1180,530" stroke="#ed1c24" strokeWidth="12" strokeLinecap="round" opacity="0.95" />
          {/* Stream 2: Orange */}
          <path d="M-40,121 C220,21 440,251 680,251 C980,251 1080,489 1180,537" stroke="#ea580c" strokeWidth="12" strokeLinecap="round" opacity="0.95" />
          {/* Stream 3: Yellow/Amber */}
          <path d="M-40,132 C220,32 440,262 680,262 C980,262 1080,498 1180,544" stroke="#f59e0b" strokeWidth="12" strokeLinecap="round" opacity="0.95" />
          {/* Stream 4: Sprout Green */}
          <path d="M-40,143 C220,43 440,273 680,273 C980,273 1080,507 1180,551" stroke="#16a34a" strokeWidth="12" strokeLinecap="round" opacity="0.95" />
          {/* Stream 5: Sky Blue */}
          <path d="M-40,154 C220,54 440,284 680,284 C980,284 1080,516 1180,558" stroke="#0095da" strokeWidth="12" strokeLinecap="round" opacity="0.95" />
          {/* Stream 6: Indigo/Purple */}
          <path d="M-40,165 C220,65 440,295 680,295 C980,295 1080,525 1180,565" stroke="#a3238e" strokeWidth="12" strokeLinecap="round" opacity="0.95" />

          {/* Continuous flow leading down into Section 2 */}
          <path d="M1180,530 C1240,570 1260,650 1200,720" stroke="#f59e0b" strokeWidth="9" strokeLinecap="round" opacity="0.85" />
          <path d="M1180,544 C1240,582 1260,662 1200,732" stroke="#16a34a" strokeWidth="9" strokeLinecap="round" opacity="0.85" />
          <path d="M1180,558 C1240,594 1260,674 1200,744" stroke="#0095da" strokeWidth="9" strokeLinecap="round" opacity="0.85" />
        </svg>

        {/* Stardust sparkles drifting along the rainbow stream */}
        <span className="stardust dust-1">✨</span>
        <span className="stardust dust-2">✦</span>
        <span className="stardust dust-3">✨</span>
        <span className="stardust dust-4">✦</span>

        {/* Little Explorer riding a paper airplane along the ribbon */}
        <div className="hero-sb__plane">
          <svg viewBox="0 0 100 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Folded Paper Airplane */}
            <path d="M10,40 L90,15 L45,60 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
            <path d="M45,60 L90,15 L35,38 Z" fill="#f8fafc" />
            <path d="M35,38 L45,60 L50,45 Z" fill="#cbd5e1" />
            {/* Cute pilot waving */}
            <circle cx="50" cy="24" r="10" fill="#fbcfe8" />
            <circle cx="50" cy="24" r="9" fill="#fcd34d" />
            <circle cx="48" cy="23" r="1.5" fill="#1e293b" />
            <circle cx="54" cy="23" r="1.5" fill="#1e293b" />
            <path d="M49,27 Q51,29 53,27" stroke="#1e293b" strokeWidth="1" fill="none" />
            {/* Cap */}
            <path d="M41,18 Q50,11 60,18 Z" fill="#ec4899" />
          </svg>
        </div>
      </div>

      {/* ── Central Typography & Call To Action ── */}
      <div className="container hero-sb__container">
        <motion.div
          className="hero-sb__header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Main Title: Bubbly, Friendly, Prominent Nirankur */}
          <h1 className="hero-sb__title">
            Nirankur
          </h1>

          {/* Motto */}
          <p className="hero-sb__motto">
            Where Learning Meets Imagination <span className="motto-dot">•</span> The Foundation Stage
          </p>

          {/* Contact / Enroll CTA Button */}
          <div className="hero-sb__cta-wrap">
            <button className="btn hero-sb__btn" onClick={handleEnroll}>
              <span>Enroll Now</span>
              <span className="btn-sparkle">✨</span>
            </button>
          </div>
        </motion.div>

        {/* ── Left Side: Child with Paint Roller + Friendly Story Blurb ── */}
        <div className="hero-sb__left-scene">
          {/* Story Blurb on the dark/light divide */}
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

          {/* Child holding long roller brush */}
          <div className="hero-sb__painter">
            <svg viewBox="0 0 160 260" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Long Roller Pole */}
              <line x1="85" y1="160" x2="140" y2="20" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
              {/* Roller Handle & Cylinder */}
              <rect x="130" y="8" width="26" height="14" rx="3" fill="#38bdf8" />
              <path d="M125,15 L143,15 L143,30 L138,40" stroke="#64748b" strokeWidth="3" fill="none" />

              {/* Paint Drips */}
              <circle cx="143" cy="38" r="3" fill="#f59e0b" />
              <circle cx="132" cy="30" r="2.5" fill="#ec4899" />

              {/* Child Body (Orange Dungarees) */}
              <rect x="65" y="145" width="38" height="65" rx="10" fill="#f97316" />
              {/* Straps */}
              <line x1="72" y1="130" x2="72" y2="155" stroke="#ea580c" strokeWidth="4" />
              <line x1="96" y1="130" x2="96" y2="155" stroke="#ea580c" strokeWidth="4" />
              {/* White Shirt inside */}
              <path d="M68,130 Q84,124 100,130 L100,148 L68,148 Z" fill="#ffffff" />
              {/* Arms holding the pole */}
              <path d="M68,135 Q78,145 92,142 L110,95" stroke="#fed7aa" strokeWidth="8" strokeLinecap="round" />
              <circle cx="110" cy="95" r="5" fill="#fdba74" />

              {/* Legs & Shoes */}
              <rect x="68" y="205" width="12" height="30" rx="4" fill="#f97316" />
              <rect x="88" y="205" width="12" height="30" rx="4" fill="#f97316" />
              <ellipse cx="72" cy="238" rx="10" ry="6" fill="#e2e8f0" />
              <ellipse cx="96" cy="238" rx="10" ry="6" fill="#e2e8f0" />

              {/* Head & Curly Hair */}
              <circle cx="84" cy="106" r="18" fill="#fed7aa" />
              {/* Curly Brown Hair */}
              <circle cx="72" cy="95" r="9" fill="#92400e" />
              <circle cx="82" cy="90" r="10" fill="#92400e" />
              <circle cx="94" cy="94" r="9" fill="#92400e" />
              <circle cx="70" cy="104" r="8" fill="#92400e" />
              {/* Eyes & Smile */}
              <circle cx="88" cy="106" r="2" fill="#1e293b" />
              <path d="M85,113 Q89,116 93,113" stroke="#b45309" strokeWidth="1.5" fill="none" />
              {/* Rosy Cheek */}
              <circle cx="86" cy="111" r="3" fill="#fca5a5" opacity="0.6" />

              {/* Paint Bucket on Ground */}
              <path d="M115,225 L135,225 L132,245 L118,245 Z" fill="#cbd5e1" />
              <ellipse cx="125" cy="225" rx="10" ry="3" fill="#a855f7" />
              <path d="M125,225 L125,232" stroke="#a855f7" strokeWidth="3" />
            </svg>
          </div>
        </div>

        {/* ── Right Side: Two Children Reading The Glowing Illuminated Book ── */}
        <motion.div
          className="hero-sb__right-scene"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <svg viewBox="0 0 340 260" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Glowing Golden Light bursting from the Open Book */}
            <circle cx="170" cy="180" r="75" fill="url(#bookLightGlow)" opacity="0.8" />
            <defs>
              <radialGradient id="bookLightGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fef08a" stopOpacity="0.95" />
                <stop offset="45%" stopColor="#fbbf24" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Glowing Open Book */}
            <g transform="translate(110, 160)">
              {/* Hardcover base */}
              <path d="M10,38 L60,48 L110,38 L105,48 L60,56 L15,48 Z" fill="#0284c7" />
              {/* Left Page (Glowing) */}
              <path d="M12,36 Q38,28 58,45 L58,20 Q36,6 12,12 Z" fill="#ffffff" />
              <path d="M16,16 Q36,10 54,23 L54,38 Q36,24 16,30 Z" fill="#fef9c3" />
              {/* Right Page (Glowing) */}
              <path d="M62,45 Q82,28 108,36 L108,12 Q84,6 62,20 Z" fill="#ffffff" />
              <path d="M66,23 Q84,10 104,16 L104,30 Q84,24 66,38 Z" fill="#fef9c3" />
              {/* Little Fish Illustration inside book */}
              <path d="M80,24 Q88,20 92,25 Q88,29 80,26 Z" fill="#38bdf8" />
              <polygon points="92,25 96,21 96,29" fill="#38bdf8" />
            </g>

            {/* Boy on the Left (Blue Striped Shirt, Brown Hair) */}
            <g transform="translate(70, 75)">
              {/* Head */}
              <circle cx="50" cy="45" r="22" fill="#fed7aa" />
              {/* Brown Short Hair */}
              <path d="M28,45 Q32,20 52,20 Q72,20 72,45 Q64,28 50,30 Q36,30 28,45 Z" fill="#78350f" />
              {/* Big Curious Eyes */}
              <ellipse cx="44" cy="44" rx="3.5" ry="4.5" fill="#1e293b" />
              <circle cx="45" cy="43" r="1.5" fill="#ffffff" />
              <ellipse cx="58" cy="44" rx="3.5" ry="4.5" fill="#1e293b" />
              <circle cx="59" cy="43" r="1.5" fill="#ffffff" />
              {/* Happy Smile */}
              <path d="M47,54 Q51,58 55,54" stroke="#9a3412" strokeWidth="2" strokeLinecap="round" fill="none" />
              {/* Rosy Cheeks */}
              <circle cx="40" cy="50" r="4" fill="#fca5a5" opacity="0.6" />
              <circle cx="62" cy="50" r="4" fill="#fca5a5" opacity="0.6" />

              {/* Body (Striped Blue Shirt) */}
              <rect x="34" y="68" width="34" height="42" rx="8" fill="#38bdf8" />
              <line x1="34" y1="78" x2="68" y2="78" stroke="#ffffff" strokeWidth="3" />
              <line x1="34" y1="88" x2="68" y2="88" stroke="#ffffff" strokeWidth="3" />
              <line x1="34" y1="98" x2="68" y2="98" stroke="#ffffff" strokeWidth="3" />

              {/* Arms leaning forward towards the book */}
              <path d="M36,72 Q26,90 48,102" stroke="#fed7aa" strokeWidth="8" strokeLinecap="round" fill="none" />
              <path d="M66,72 Q76,90 62,102" stroke="#fed7aa" strokeWidth="8" strokeLinecap="round" fill="none" />

              {/* Navy Shorts */}
              <rect x="36" y="105" width="30" height="14" rx="4" fill="#1e3a8a" />
            </g>

            {/* Girl on the Right (Pink Shirt, Reddish-Brown Pigtails) */}
            <g transform="translate(175, 80)">
              {/* Head */}
              <circle cx="45" cy="45" r="22" fill="#fed7aa" />
              {/* Cute Pigtails & Bangs */}
              <path d="M24,45 Q28,20 48,20 Q66,20 66,45 Q58,28 46,30 Q34,30 24,45 Z" fill="#b45309" />
              {/* Left Pigtail */}
              <circle cx="20" cy="50" r="8" fill="#b45309" />
              <circle cx="24" cy="46" r="3" fill="#ec4899" />
              {/* Right Pigtail */}
              <circle cx="70" cy="50" r="8" fill="#b45309" />
              <circle cx="66" cy="46" r="3" fill="#ec4899" />

              {/* Big Wondering Eyes */}
              <ellipse cx="38" cy="45" rx="3.5" ry="4.5" fill="#1e293b" />
              <circle cx="39" cy="44" r="1.5" fill="#ffffff" />
              <ellipse cx="52" cy="45" rx="3.5" ry="4.5" fill="#1e293b" />
              <circle cx="53" cy="44" r="1.5" fill="#ffffff" />
              {/* Open Amazed Mouth */}
              <circle cx="45" cy="55" r="3" fill="#dc2626" />
              {/* Rosy Cheeks */}
              <circle cx="33" cy="51" r="4" fill="#fca5a5" opacity="0.6" />
              <circle cx="57" cy="51" r="4" fill="#fca5a5" opacity="0.6" />

              {/* Pink T-Shirt */}
              <rect x="28" y="68" width="34" height="40" rx="8" fill="#f472b6" />
              {/* Arms pointing at the glowing book */}
              <path d="M30,72 Q18,90 28,100" stroke="#fed7aa" strokeWidth="8" strokeLinecap="round" fill="none" />
              <path d="M60,72 Q66,92 40,100" stroke="#fed7aa" strokeWidth="8" strokeLinecap="round" fill="none" />

              {/* Blue Skirt */}
              <path d="M26,104 L64,104 L68,120 L22,120 Z" fill="#38bdf8" />
            </g>
          </svg>
        </motion.div>
      </div>
    </section>
  )
}

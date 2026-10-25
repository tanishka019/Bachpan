import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import './Testimonials.css'

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Mother of Aanya, 4 years',
    avatar: '👩',
    rating: 5,
    text: 'Wonder Roots has been a life-changing experience for our daughter. She went from a shy toddler to a confident, curious little girl who absolutely loves going to school every morning. The teachers are incredibly warm and attentive.',
    location: 'Mumbai',
    program: 'Nursery',
  },
  {
    name: 'Rajesh Mehta',
    role: 'Father of Arjun, 5 years',
    avatar: '👨',
    rating: 5,
    text: 'What impressed me most was how the teachers know every child individually. Arjun\'s teacher could tell us specific things about his learning style and strengths. The curriculum balances play and learning perfectly.',
    location: 'Delhi',
    program: 'LKG',
  },
  {
    name: 'Sunita Patel',
    role: 'Mother of Mira, 3 years',
    avatar: '👩‍👧',
    rating: 5,
    text: 'The Parent Connect app is fantastic — I get daily updates with photos and videos of what Mira is doing. It gives me so much peace of mind. Wonder Roots truly partners with parents in the child\'s education.',
    location: 'Bangalore',
    program: 'Playgroup',
  },
  {
    name: 'Amit & Kavya Nair',
    role: 'Parents of Rohan, 6 years',
    avatar: '👨‍👩‍👦',
    rating: 5,
    text: 'Rohan recently started Grade 1 at a top school and his teachers there commented on how well-prepared he was — socially, academically, and emotionally. We credit Wonder Roots entirely for that strong foundation.',
    location: 'Pune',
    program: 'UKG',
  },
  {
    name: 'Deepa Krishnan',
    role: 'Mother of twins, 3.5 years',
    avatar: '👩‍👧‍👧',
    rating: 5,
    text: 'Managing twins is challenging, but Wonder Roots\' teachers handle both our kids with individual attention and love. The facilities are spotless, safe, and the children genuinely thrive here. Highly recommend!',
    location: 'Chennai',
    program: 'Nursery',
  },
]

function StarRating({ count }) {
  return (
    <div className="stars">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="star">★</span>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="testimonials section-py" id="testimonials" ref={ref}>
      {/* Decorative background */}
      <div className="testimonials__bg">
        <div className="testimonials__bg-shape testimonials__bg-shape--1" />
        <div className="testimonials__bg-shape testimonials__bg-shape--2" />
      </div>

      <div className="container">
        <motion.div
          className="testimonials__header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-badge">💬 Parent Stories</span>
          <h2 className="section-title">
            Families Who Trust <span>Wonder Roots</span>
          </h2>
          <p className="section-subtitle">
            Don't just take our word for it — hear from the parents who chose Wonder Roots for their most precious little ones.
          </p>

          {/* Summary stats */}
          <div className="testimonials__stats">
            <div className="testimonials__stat">
              <span className="testimonials__stat-num">4.9</span>
              <div className="testimonials__stat-stars">★★★★★</div>
              <span className="testimonials__stat-label">Average Rating</span>
            </div>
            <div className="testimonials__stat-divider" />
            <div className="testimonials__stat">
              <span className="testimonials__stat-num">12K+</span>
              <span className="testimonials__stat-label">Parent Reviews</span>
            </div>
            <div className="testimonials__stat-divider" />
            <div className="testimonials__stat">
              <span className="testimonials__stat-num">98%</span>
              <span className="testimonials__stat-label">Would Recommend</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            loop
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="testimonials__swiper"
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i}>
                <div className="testi-card">
                  <div className="testi-card__top">
                    <div className="testi-card__quote">"</div>
                    <StarRating count={t.rating} />
                  </div>
                  <p className="testi-card__text">{t.text}</p>
                  <div className="testi-card__footer">
                    <div className="testi-card__avatar">{t.avatar}</div>
                    <div className="testi-card__author">
                      <strong>{t.name}</strong>
                      <span>{t.role}</span>
                      <div className="testi-card__meta">
                        <span className="testi-card__loc">📍 {t.location}</span>
                        <span className="testi-card__prog">🎒 {t.program}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  )
}

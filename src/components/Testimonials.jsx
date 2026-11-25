import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { TestimonialsKidsBanner } from './StoryKids'
import './Testimonials.css'

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Mother of Aanya, 4 years',
    avatar: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
    rating: 5,
    text: 'Nirankur has been a life-changing experience for our daughter. She went from a shy toddler to a confident, curious little girl who absolutely loves going to school every morning. The teachers are incredibly warm and attentive.',
    location: 'Mumbai',
    program: 'Nursery',
  },
  {
    name: 'Rajesh Mehta',
    role: 'Father of Arjun, 5 years',
    avatar: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
    rating: 5,
    text: 'What impressed me most was how the teachers know every child individually. Arjun\'s teacher could tell us specific things about his learning style and strengths. The curriculum balances play and learning perfectly.',
    location: 'Delhi',
    program: 'LKG',
  },
  {
    name: 'Sunita Patel',
    role: 'Mother of Mira, 3 years',
    avatar: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    rating: 5,
    text: 'The Parent Connect app is fantastic — I get daily updates with photos and videos of what Mira is doing. It gives me so much peace of mind. Nirankur truly partners with parents in the child\'s education.',
    location: 'Bangalore',
    program: 'Playgroup',
  },
  {
    name: 'Amit & Kavya Nair',
    role: 'Parents of Rohan, 6 years',
    avatar: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    rating: 5,
    text: 'Rohan recently started Grade 1 at a top school and his teachers there commented on how well-prepared he was — socially, academically, and emotionally. We credit Nirankur entirely for that strong foundation.',
    location: 'Pune',
    program: 'UKG',
  },
  {
    name: 'Deepa Krishnan',
    role: 'Mother of twins, 3.5 years',
    avatar: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    rating: 5,
    text: 'Managing twins is challenging, but Nirankur\'s teachers handle both our kids with individual attention and love. The facilities are spotless, safe, and the children genuinely thrive here. Highly recommend!',
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
      <div className="container" style={{ position: 'relative', zIndex: 3 }}>
        <motion.div
          className="testimonials__header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            Families Who Trust <span>Nirankur</span>
          </h2>
          <p className="section-subtitle">
            Don't just take our word for it — hear from the parents who chose Nirankur for their most precious little ones.
          </p>

          <TestimonialsKidsBanner className="testimonials__kids-banner" />

          {/* Summary stats */}
          <div className="testimonials__stats">
            <div className="testimonials__stat">
              <span className="testimonials__stat-num testimonials__stat-num--orange">4.9</span>
              <div className="testimonials__stat-stars">★★★★★</div>
              <span className="testimonials__stat-label">Average Rating</span>
            </div>
            <div className="testimonials__stat-divider" />
            <div className="testimonials__stat">
              <span className="testimonials__stat-num testimonials__stat-num--blue">12K+</span>
              <span className="testimonials__stat-label">Parent Reviews</span>
            </div>
            <div className="testimonials__stat-divider" />
            <div className="testimonials__stat">
              <span className="testimonials__stat-num testimonials__stat-num--green">98%</span>
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
                <div className={`testi-card testi-card--${['blue', 'green', 'coral', 'amber'][i % 4]}`}>
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
                        <span className="testi-card__loc">{t.location}</span>
                        <span className="testi-card__prog">{t.program}</span>
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

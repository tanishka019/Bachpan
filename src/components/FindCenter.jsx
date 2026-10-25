import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { addLead } from '../lib/leadsData'
import './FindCenter.css'

const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Chennai', 'Hyderabad', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow']

export default function FindCenter() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', city: '', child_age: '', program: '', message: '' })

  const handleChange = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    addLead({
      form_type: 'Contact Section',
      parent_name: formData.name,
      child_name: '',
      phone: formData.phone,
      email: formData.email,
      city: formData.city,
      child_age: formData.child_age,
      program: formData.program || 'Playgroup',
      message: formData.message || 'Campus visit enquiry submitted via website contact form.',
      status: 'New',
      admin_notes: 'Inquiry received from Contact & Campus Visit section.',
    })
    setSubmitted(true)
  }

  return (
    <section className="find-center section-py" id="contact" ref={ref}>
      {/* Background */}
      <div className="find-center__bg">
        <div className="find-center__bg-blob find-center__bg-blob--1" />
        <div className="find-center__bg-blob find-center__bg-blob--2" />
      </div>

      <div className="container">
        <div className="find-center__layout">
          {/* Left Info */}
          <motion.div
            className="find-center__info"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge">📍 Find Us</span>
            <h2 className="section-title">
              Start Your Child's <span>Beautiful Journey</span>
            </h2>
            <p className="section-subtitle">
              Take the first step towards giving your child the best foundation. Fill out the form and our team will reach out to schedule a personalized campus visit.
            </p>

            {/* Info cards */}
            <div className="find-center__contact-cards">
              <div className="fc-card">
                <span>📞</span>
                <div>
                  <strong>Call Us</strong>
                  <p>1800-XXX-XXXX (Toll Free)</p>
                </div>
              </div>
              <div className="fc-card">
                <span>✉️</span>
                <div>
                  <strong>Email Us</strong>
                  <p>admissions@bachpan.edu.in</p>
                </div>
              </div>
              <div className="fc-card">
                <span>🕐</span>
                <div>
                  <strong>School Hours</strong>
                  <p>Mon–Sat: 8:00 AM – 1:00 PM</p>
                </div>
              </div>
            </div>

            {/* City list */}
            <div className="find-center__cities">
              <p className="find-center__cities-label">We're present in 200+ cities including:</p>
              <div className="find-center__city-tags">
                {cities.map(c => (
                  <span key={c} className="find-center__city-tag">{c}</span>
                ))}
                <span className="find-center__city-tag find-center__city-tag--more">+190 more</span>
              </div>
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div
            className="find-center__form-wrap"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {submitted ? (
              <div className="find-center__success">
                <div className="find-center__success-emoji">🎉</div>
                <h3>Thank You!</h3>
                <p>We've received your enquiry. Our admissions team will contact you within 24 hours to schedule a campus visit.</p>
                <button className="btn btn-primary" onClick={() => setSubmitted(false)}>Submit Another →</button>
              </div>
            ) : (
              <form className="find-center__form" onSubmit={handleSubmit} noValidate>
                <div className="find-center__form-header">
                  <h3>Enquire Now</h3>
                  <p>Free campus tour & no obligations</p>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Parent's Name *</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 XXXXXXXXXX"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City *</label>
                    <select id="city" name="city" value={formData.city} onChange={handleChange} required>
                      <option value="">Select city</option>
                      {cities.map(c => <option key={c} value={c}>{c}</option>)}
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="child_age">Child's Age *</label>
                    <select id="child_age" name="child_age" value={formData.child_age} onChange={handleChange} required>
                      <option value="">Select age</option>
                      <option value="1.5-2">1.5 – 2 years</option>
                      <option value="2-3">2 – 3 years</option>
                      <option value="3-4">3 – 4 years</option>
                      <option value="4-5">4 – 5 years</option>
                      <option value="5-6">5 – 6 years</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Program of Interest</label>
                  <div className="form-chips">
                    {['Playgroup', 'Nursery', 'LKG', 'UKG'].map(p => (
                      <label key={p} className={`form-chip ${formData.program === p ? 'form-chip--active' : ''}`}>
                        <input
                          type="radio"
                          name="program"
                          value={p}
                          checked={formData.program === p}
                          onChange={handleChange}
                        />
                        {p}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Questions or Preferred Visit Timing (Optional)</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={2}
                    placeholder="e.g. Would like to visit on Saturday morning or inquire about school bus route..."
                    value={formData.message}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.75rem',
                      border: '1.5px solid #cbd5e1',
                      background: '#f8fafc',
                      fontSize: '0.9rem',
                      fontFamily: 'inherit',
                      resize: 'vertical',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <button type="submit" className="btn btn-primary find-center__submit">
                  Book Free Campus Visit 🎒
                </button>

                <p className="find-center__privacy">
                  🔒 Your information is safe with us. No spam, ever.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

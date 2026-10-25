import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { addLead } from '../lib/leadsData'
import './EnrollModal.css'

const CITIES = ['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Chennai', 'Hyderabad', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Other']
const PROGRAMS = ['Playgroup', 'Nursery', 'LKG', 'UKG']
const AGE_GROUPS = [
  { label: '1.5 – 2 Years', value: '1.5-2 years' },
  { label: '2 – 3 Years', value: '2-3 years' },
  { label: '3 – 4 Years', value: '3-4 years' },
  { label: '4 – 5 Years', value: '4-5 years' },
  { label: '5 – 6 Years', value: '5-6 years' },
]

export default function EnrollModal({ isOpen, onClose, initialProgram = 'Playgroup' }) {
  const [formData, setFormData] = useState({
    parent_name: '',
    child_name: '',
    phone: '',
    email: '',
    city: 'Mumbai',
    child_age: '2-3 years',
    program: initialProgram,
    academic_session: '2026-2027',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [referenceNo, setReferenceNo] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (initialProgram) {
      setFormData((prev) => ({ ...prev, program: initialProgram }))
    }
  }, [initialProgram])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setSubmitted(false)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const ref = `BP-${Math.floor(100000 + Math.random() * 900000)}`
    setReferenceNo(ref)

    // Save lead into data store
    addLead({
      ...formData,
      form_type: 'Enroll Now',
      status: 'New',
      admin_notes: `Reference ID: ${ref}. Academic Session: ${formData.academic_session}`,
    })

    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 400)
  }

  return (
    <div className="enr-backdrop" onClick={onClose}>
      <motion.div
        className="enr-modal"
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 24 }}
        transition={{ duration: 0.24, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button className="enr-close" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        {submitted ? (
          <div className="enr-success">
            <div className="enr-success__icon">🎉</div>
            <span className="enr-success__badge">Admissions Desk</span>
            <h2 className="enr-success__title">Enrollment Application Received!</h2>
            <p className="enr-success__desc">
              Thank you, <strong>{formData.parent_name}</strong>! We are thrilled to welcome{' '}
              <strong>{formData.child_name || 'your child'}</strong> to the Bachpan family for the{' '}
              <strong>{formData.program}</strong> program.
            </p>

            <div className="enr-ref-box">
              <span className="enr-ref-lbl">Application Reference Number:</span>
              <span className="enr-ref-val">{referenceNo}</span>
              <span className="enr-ref-note">Our admissions coordinator will call you within 24 hours to schedule campus orientation.</span>
            </div>

            <div className="enr-success__actions">
              <button
                className="btn btn-primary"
                onClick={() => {
                  setSubmitted(false)
                  onClose()
                }}
              >
                Close & Explore Campus →
              </button>
            </div>
          </div>
        ) : (
          <div className="enr-content">
            <div className="enr-header">
              <span className="enr-badge">🎒 Admissions 2026-27 Open</span>
              <h2 className="enr-title">Enroll Your Child at Bachpan</h2>
              <p className="enr-subtitle">
                Fill out the quick enrollment form below. Our principal and admissions team will contact you directly.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="enr-form">
              {/* Program Selector */}
              <div className="enr-field">
                <label className="enr-label">1. Select Program of Interest *</label>
                <div className="enr-programs-grid">
                  {PROGRAMS.map((prog) => (
                    <button
                      key={prog}
                      type="button"
                      className={`enr-prog-pill ${formData.program === prog ? 'active' : ''}`}
                      onClick={() => setFormData((p) => ({ ...p, program: prog }))}
                    >
                      {formData.program === prog ? '✓ ' : ''}
                      {prog}
                    </button>
                  ))}
                </div>
              </div>

              {/* Child Details */}
              <div className="enr-row">
                <div className="enr-field">
                  <label htmlFor="child_name" className="enr-label">
                    Child's Full Name *
                  </label>
                  <input
                    id="child_name"
                    name="child_name"
                    type="text"
                    required
                    placeholder="e.g. Aarav Sharma"
                    value={formData.child_name}
                    onChange={handleChange}
                    className="enr-input"
                  />
                </div>

                <div className="enr-field">
                  <label htmlFor="child_age" className="enr-label">
                    Child's Age Group *
                  </label>
                  <select
                    id="child_age"
                    name="child_age"
                    value={formData.child_age}
                    onChange={handleChange}
                    className="enr-input"
                    required
                  >
                    {AGE_GROUPS.map((a) => (
                      <option key={a.value} value={a.value}>
                        {a.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Parent Details */}
              <div className="enr-row">
                <div className="enr-field">
                  <label htmlFor="parent_name" className="enr-label">
                    Parent / Guardian Name *
                  </label>
                  <input
                    id="parent_name"
                    name="parent_name"
                    type="text"
                    required
                    placeholder="e.g. Pooja Sharma"
                    value={formData.parent_name}
                    onChange={handleChange}
                    className="enr-input"
                  />
                </div>

                <div className="enr-field">
                  <label htmlFor="phone" className="enr-label">
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="+91 98201 XXXXX"
                    value={formData.phone}
                    onChange={handleChange}
                    className="enr-input"
                  />
                </div>
              </div>

              {/* Email & City */}
              <div className="enr-row">
                <div className="enr-field">
                  <label htmlFor="email" className="enr-label">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="parent@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="enr-input"
                  />
                </div>

                <div className="enr-field">
                  <label htmlFor="city" className="enr-label">
                    City / Preferred Center *
                  </label>
                  <select
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="enr-input"
                    required
                  >
                    {CITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Special Note / Query */}
              <div className="enr-field">
                <label htmlFor="message" className="enr-label">
                  Special Inquiries / Questions (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={2}
                  placeholder="Need transport facility, sibling discount, daycare timing, etc."
                  value={formData.message}
                  onChange={handleChange}
                  className="enr-input"
                />
              </div>

              {/* Submit CTA */}
              <div className="enr-actions">
                <button
                  type="submit"
                  className="btn btn-primary enr-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting Application...' : 'Submit Enrollment Application 🎒'}
                </button>
                <p className="enr-security-note">
                  🔒 Your information is confidential. We do not share contact details with third parties.
                </p>
              </div>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  )
}

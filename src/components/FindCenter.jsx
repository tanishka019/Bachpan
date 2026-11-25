import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  ExternalLink,
  Navigation,
  Sparkles,
} from 'lucide-react'
import { addLead } from '../lib/leadsData'
import './FindCenter.css'

// Sample Nirankur Preschool Campus Location — update with exact street address & coordinates when ready
const PRESCHOOL_LOCATION = {
  campusName: 'Nirankur Preschool — The Foundation Stage',
  addressLine1: 'Plot 24, Sunshine Enclave, Sector 14',
  addressLine2: 'Vashi, Navi Mumbai, Maharashtra – 400703',
  landmark: 'Near Central Community Park & Library',
  phone: '+91 98765 43210',
  email: 'admissions@nirankur.edu.in',
  hours: 'Mon – Sat: 8:30 AM – 1:30 PM',
  mapEmbedUrl:
    'https://maps.google.com/maps?q=Sector+14,+Vashi,+Navi+Mumbai,+Maharashtra+400703&t=&z=14&ie=UTF8&iwloc=&output=embed',
  directionsUrl:
    'https://www.google.com/maps/search/?api=1&query=Sector+14+Vashi+Navi+Mumbai+Maharashtra+400703',
}

const TOPIC_OPTIONS = [
  { label: 'Playgroup', emoji: '🧸', age: '1.5–2.5 Yrs', tone: 'blue' },
  { label: 'Nursery', emoji: '🌱', age: '2.5–3.5 Yrs', tone: 'green' },
  { label: 'Junior KG', emoji: '🎨', age: '3.5–4.5 Yrs', tone: 'coral' },
  { label: 'Campus Tour', emoji: '🏫', age: 'Schedule Visit', tone: 'amber' },
  { label: 'General Enquiry', emoji: '💬', age: 'Ask Anything', tone: 'purple' },
]

const INITIAL_FORM = {
  name: '',
  phone: '',
  email: '',
  program: 'Playgroup',
  message: '',
}

export default function FindCenter() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [formData, setFormData] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submittedName, setSubmittedName] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const nextErrors = {}
    if (!formData.name.trim()) {
      nextErrors.name = 'Please enter parent or guardian name.'
    }
    const digits = formData.phone.replace(/\D/g, '')
    if (!formData.phone.trim() || digits.length < 7) {
      nextErrors.phone = 'Please enter a valid contact number.'
    }
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.'
    }
    if (!formData.message.trim()) {
      nextErrors.message = 'Please enter your message or question.'
    }
    return nextErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    addLead({
      form_type: 'Contact Section',
      parent_name: formData.name.trim(),
      child_name: '',
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      city: 'Navi Mumbai',
      child_age: '',
      program: formData.program || 'Playgroup',
      message: formData.message.trim(),
      status: 'New',
      admin_notes: `Inquiry topic: ${formData.program}`,
    })

    setSubmittedName(formData.name.trim())
    setSubmitted(true)
    setErrors({})
  }

  const handleReset = () => {
    setFormData(INITIAL_FORM)
    setErrors({})
    setSubmitted(false)
  }

  return (
    <section className="fc-section" id="contact" ref={ref}>
      {/* Cheerful Pastel Background Blobs */}
      <div className="fc-bg-blobs" aria-hidden="true">
        <div className="fc-blob fc-blob--sky" />
        <div className="fc-blob fc-blob--amber" />
        <div className="fc-blob fc-blob--green" />
        <div className="fc-blob fc-blob--rose" />
      </div>

      {/* Faint Watermark Title matching Storybook Sections */}
      <div className="fc-watermark" aria-hidden="true">
        <span>VISIT &amp; CONTACT</span>
      </div>

      <div className="container fc-container">
        {/* Centered Header */}
        <motion.div
          className="fc-header"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="fc-header-badge">
            <Sparkles size={14} />
            <span>Visit Our Colorful Campus</span>
          </span>
          <h2 className="fc-title">
            Find Our Preschool &amp;{' '}
            <span className="fc-title-highlight">Say Hello</span>
          </h2>
          <p className="fc-subtitle">
            Drop by to see our joyful classrooms, meet our warm teachers, or send us a quick message below!
          </p>
        </motion.div>

        {/* Balanced 2-Column Layout */}
        <div className="fc-layout">
          {/* Left Column: Colorful Location Card + Embedded Map + Direct Channels */}
          <motion.div
            className="fc-location-col"
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Preschool Address & Map Card */}
            <div className="fc-card fc-address-card">
              {/* Vibrant Sky-to-Emerald Top Header Banner */}
              <div className="fc-address-banner">
                <div className="fc-address-icon">
                  <MapPin size={22} />
                </div>
                <div className="fc-address-text">
                  <span className="fc-address-kicker">Campus Location</span>
                  <h3 className="fc-address-name">{PRESCHOOL_LOCATION.campusName}</h3>
                </div>
              </div>

              <div className="fc-address-body">
                <div className="fc-address-details">
                  <p className="fc-address-lines">
                    {PRESCHOOL_LOCATION.addressLine1}, {PRESCHOOL_LOCATION.addressLine2}
                  </p>
                  <span className="fc-landmark-pill">
                    🌳 Landmark: {PRESCHOOL_LOCATION.landmark}
                  </span>
                </div>

                <div className="fc-map-frame">
                  <iframe
                    title="Nirankur Preschool Location Map"
                    src={PRESCHOOL_LOCATION.mapEmbedUrl}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>

                <div className="fc-map-footer">
                  <span className="fc-map-note">
                    🚗 Easy gate drop-off &amp; parent parking
                  </span>
                  <a
                    href={PRESCHOOL_LOCATION.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fc-directions-link"
                  >
                    <Navigation size={14} />
                    <span>Open in Maps</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            </div>

            {/* Colorful Quick Contact Cards */}
            <div className="fc-quick-grid">
              <a
                href={`tel:${PRESCHOOL_LOCATION.phone.replace(/\s+/g, '')}`}
                className="fc-quick-item fc-quick-item--amber"
              >
                <div className="fc-quick-icon fc-quick-icon--amber">
                  <Phone size={17} />
                </div>
                <div>
                  <span className="fc-quick-label">Admissions Helpline</span>
                  <strong className="fc-quick-value">{PRESCHOOL_LOCATION.phone}</strong>
                </div>
              </a>

              <a
                href={`mailto:${PRESCHOOL_LOCATION.email}`}
                className="fc-quick-item fc-quick-item--green"
              >
                <div className="fc-quick-icon fc-quick-icon--green">
                  <Mail size={17} />
                </div>
                <div>
                  <span className="fc-quick-label">Email Us</span>
                  <strong className="fc-quick-value">{PRESCHOOL_LOCATION.email}</strong>
                </div>
              </a>

              <div className="fc-quick-item fc-quick-item--rose fc-quick-item--full">
                <div className="fc-quick-icon fc-quick-icon--rose">
                  <Clock size={17} />
                </div>
                <div>
                  <span className="fc-quick-label">Campus &amp; Tour Timings</span>
                  <strong className="fc-quick-value">{PRESCHOOL_LOCATION.hours}</strong>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Colorful Send a Message Card */}
          <motion.div
            className="fc-card fc-form-card"
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Playful Rainbow Accent Ribbon along top border */}
            <div className="fc-rainbow-bar" aria-hidden="true" />

            <div className="fc-form-inner">
              {submitted ? (
                <div className="fc-success">
                  <div className="fc-success-badge">
                    <CheckCircle2 size={34} />
                  </div>
                  <h3 className="fc-success-title">Message Sent! 🎉</h3>
                  <p className="fc-success-desc">
                    Thank you, <strong>{submittedName}</strong>! We have received your enquiry for{' '}
                    <strong>{formData.program}</strong> and our coordinator will call or message you within 24 hours.
                  </p>
                  <div className="fc-success-summary">
                    <span>📞 {formData.phone}</span>
                    {formData.email && <span>✉️ {formData.email}</span>}
                  </div>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="fc-submit-btn fc-submit-btn--secondary"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form className="fc-form" onSubmit={handleSubmit} noValidate>
                  <div className="fc-form-hero">
                    <span className="fc-form-badge">✉️ Quick Enquiry</span>
                    <h3 className="fc-form-title">Send a Message</h3>
                    <p className="fc-form-desc">
                      Ask about admissions, fee structure, timings, or book a friendly tour of our campus.
                    </p>
                  </div>

                  <div className="fc-rainbow-dots" aria-hidden="true" />

                  <div className="fc-form-row">
                    <div className="fc-field">
                      <label htmlFor="fc-name" className="fc-label">
                        Parent&apos;s Name <span className="fc-req">*</span>
                      </label>
                      <input
                        id="fc-name"
                        name="name"
                        type="text"
                        placeholder="e.g. Priya Sharma"
                        value={formData.name}
                        onChange={handleChange}
                        className={`fc-input ${errors.name ? 'fc-input--error' : ''}`}
                        required
                      />
                      {errors.name && <span className="fc-error-msg">{errors.name}</span>}
                    </div>

                    <div className="fc-field">
                      <label htmlFor="fc-phone" className="fc-label">
                        Phone Number <span className="fc-req">*</span>
                      </label>
                      <input
                        id="fc-phone"
                        name="phone"
                        type="tel"
                        placeholder="e.g. +91 98765 43210"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`fc-input ${errors.phone ? 'fc-input--error' : ''}`}
                        required
                      />
                      {errors.phone && <span className="fc-error-msg">{errors.phone}</span>}
                    </div>
                  </div>

                  <div className="fc-field">
                    <label htmlFor="fc-email" className="fc-label">
                      Email Address
                    </label>
                    <input
                      id="fc-email"
                      name="email"
                      type="email"
                      placeholder="e.g. priya.sharma@gmail.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={`fc-input ${errors.email ? 'fc-input--error' : ''}`}
                    />
                    {errors.email && <span className="fc-error-msg">{errors.email}</span>}
                  </div>

                  <div className="fc-field">
                    <label className="fc-label">Program / Enquiry Topic</label>
                    <div className="fc-topic-chips" role="group" aria-label="Select enquiry topic">
                      {TOPIC_OPTIONS.map((opt) => {
                        const active = formData.program === opt.label
                        return (
                          <button
                            key={opt.label}
                            type="button"
                            onClick={() =>
                              setFormData((prev) => ({ ...prev, program: opt.label }))
                            }
                            className={`fc-topic-chip fc-topic-chip--${opt.tone} ${
                              active ? 'is-active' : ''
                            }`}
                          >
                            <span>{opt.emoji}</span>
                            <span>{opt.label}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div className="fc-field">
                    <label htmlFor="fc-message" className="fc-label">
                      Message <span className="fc-req">*</span>
                    </label>
                    <textarea
                      id="fc-message"
                      name="message"
                      rows={4}
                      placeholder="Tell us your child's age, preferred timings, or any question for our teachers..."
                      value={formData.message}
                      onChange={handleChange}
                      className={`fc-input fc-textarea ${errors.message ? 'fc-input--error' : ''}`}
                      required
                    />
                    {errors.message && <span className="fc-error-msg">{errors.message}</span>}
                  </div>

                  <div className="fc-form-actions">
                    <button type="submit" className="fc-submit-btn">
                      <Send size={16} />
                      <span>Send Message</span>
                    </button>
                    <span className="fc-privacy-note">
                      🔒 100% private • No spam ever
                    </span>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

import { useState } from 'react'
import { motion } from 'framer-motion'
import { verifyAdminPin, setAdminUnlocked } from '../lib/supabase'
import './AdminPinModal.css'

export default function AdminPinModal({ isOpen, onClose, onSuccess }) {
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    setTimeout(() => {
      if (verifyAdminPin(pin)) {
        setAdminUnlocked(true)
        setIsSubmitting(false)
        setPin('')
        onSuccess()
      } else {
        setIsSubmitting(false)
        setError('Incorrect PIN. Default is 1234 (or set VITE_ADMIN_PIN in .env).')
      }
    }, 250)
  }

  return (
    <div className="pin-backdrop" onClick={onClose}>
      <motion.div
        className="pin-modal"
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pin-modal__header">
          <div className="pin-modal__icon">🔐</div>
          <h3>Admin Authentication</h3>
          <p>Enter the Admin PIN to upload or manage photos and videos.</p>
        </div>

        <form onSubmit={handleSubmit} className="pin-form">
          <div className="pin-input-group">
            <input
              type="password"
              maxLength={8}
              value={pin}
              autoFocus
              placeholder="Enter PIN (e.g. 1234)"
              onChange={(e) => {
                setPin(e.target.value)
                setError('')
              }}
              className={`pin-input ${error ? 'pin-input--error' : ''}`}
            />
          </div>

          {error && <div className="pin-error">{error}</div>}

          <div className="pin-hint">
            💡 Default PIN: <code>1234</code> (configurable in <code>.env</code>)
          </div>

          <div className="pin-modal__actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!pin || isSubmitting}
            >
              {isSubmitting ? 'Verifying...' : 'Unlock Admin'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

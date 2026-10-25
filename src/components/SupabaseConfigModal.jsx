import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getSupabaseCredentials, isSupabaseConfigured, getSupabase } from '../lib/supabase'
import './SupabaseConfigModal.css'

export default function SupabaseConfigModal({ isOpen, onClose, onConfigSaved }) {
  const [url, setUrl] = useState('')
  const [key, setKey] = useState('')
  const [testStatus, setTestStatus] = useState(null) // null | 'testing' | 'success' | 'error'
  const [testMessage, setTestMessage] = useState('')
  const [savedSuccess, setSavedSuccess] = useState(false)

  useEffect(() => {
    if (isOpen) {
      const creds = getSupabaseCredentials()
      setUrl(creds.url || '')
      setKey(creds.key || '')
      setTestStatus(null)
      setTestMessage('')
      setSavedSuccess(false)
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleSave = (e) => {
    e.preventDefault()
    localStorage.setItem('bachpan_supabase_url', url.trim())
    localStorage.setItem('bachpan_supabase_anon_key', key.trim())
    setSavedSuccess(true)
    setTimeout(() => {
      onConfigSaved()
      onClose()
    }, 800)
  }

  const handleClear = () => {
    localStorage.removeItem('bachpan_supabase_url')
    localStorage.removeItem('bachpan_supabase_anon_key')
    const creds = getSupabaseCredentials()
    setUrl(creds.url || '')
    setKey(creds.key || '')
    setTestStatus(null)
    setTestMessage('Reset to .env values')
  }

  const handleTestConnection = async () => {
    setTestStatus('testing')
    setTestMessage('Connecting to Supabase...')

    try {
      // Temporarily store in memory or test with client
      const trimmedUrl = url.trim()
      const trimmedKey = key.trim()

      if (!trimmedUrl || !trimmedKey) {
        setTestStatus('error')
        setTestMessage('Please enter both Supabase URL and Anon Key.')
        return
      }

      // Check URL format
      if (!trimmedUrl.startsWith('https://')) {
        setTestStatus('error')
        setTestMessage('Supabase URL must start with https://')
        return
      }

      // Quick ping test to Supabase
      const response = await fetch(`${trimmedUrl}/rest/v1/gallery_items?select=count`, {
        headers: {
          apikey: trimmedKey,
          Authorization: `Bearer ${trimmedKey}`,
        },
      })

      if (response.ok) {
        setTestStatus('success')
        setTestMessage('Connection successful! Database table `gallery_items` is accessible.')
      } else if (response.status === 404 || response.status === 400) {
        setTestStatus('error')
        setTestMessage(
          'Connected to Supabase, but `gallery_items` table was not found. Please run the `supabase_setup.sql` script in Supabase SQL Editor.'
        )
      } else if (response.status === 401 || response.status === 403) {
        setTestStatus('error')
        setTestMessage('Authentication error: Invalid anon key or unauthorized.')
      } else {
        const errorText = await response.text()
        setTestStatus('error')
        setTestMessage(`Supabase error (${response.status}): ${errorText}`)
      }
    } catch (err) {
      setTestStatus('error')
      setTestMessage(`Connection failed: ${err.message}`)
    }
  }

  return (
    <div className="cfg-backdrop" onClick={onClose}>
      <motion.div
        className="cfg-modal"
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cfg-modal__header">
          <div>
            <div className="cfg-badge">⚡ Database & Storage</div>
            <h3 className="cfg-modal__title">Supabase Setup & Connection</h3>
          </div>
          <button className="cfg-modal__close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        {/* Quick Instructions box */}
        <div className="cfg-guide">
          <h4>Quick Setup Checklist:</h4>
          <ol>
            <li>
              Go to{' '}
              <a href="https://supabase.com/dashboard" target="_blank" rel="noreferrer">
                supabase.com/dashboard
              </a>{' '}
              and create a free project.
            </li>
            <li>
              Open <strong>Project Settings → API</strong> and copy your <strong>Project URL</strong> and{' '}
              <strong>anon public Key</strong>.
            </li>
            <li>
              Open <strong>SQL Editor</strong> in Supabase, paste the contents of{' '}
              <code>supabase_setup.sql</code> (in the project root), and click <strong>Run</strong>.
            </li>
            <li>Paste your credentials below or add them to your <code>.env</code> file.</li>
          </ol>
        </div>

        <form onSubmit={handleSave} className="cfg-form">
          <div className="form-group">
            <label htmlFor="cfg-url">Supabase Project URL</label>
            <input
              id="cfg-url"
              type="text"
              placeholder="https://xyzcompany.supabase.co"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value)
                setTestStatus(null)
              }}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cfg-key">Supabase Anon Public Key</label>
            <input
              id="cfg-key"
              type="password"
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              value={key}
              onChange={(e) => {
                setKey(e.target.value)
                setTestStatus(null)
              }}
              required
            />
          </div>

          {/* Test Status feedback */}
          {testStatus && (
            <div className={`cfg-test-result cfg-test-result--${testStatus}`}>
              {testStatus === 'testing' && '⏳ '}
              {testStatus === 'success' && '✅ '}
              {testStatus === 'error' && '❌ '}
              <span>{testMessage}</span>
            </div>
          )}

          {savedSuccess && (
            <div className="cfg-test-result cfg-test-result--success">
              ✅ Settings saved! Connecting to Supabase...
            </div>
          )}

          <div className="cfg-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleTestConnection}
              disabled={!url || !key || testStatus === 'testing'}
            >
              {testStatus === 'testing' ? 'Testing...' : 'Test Connection'}
            </button>

            <button type="submit" className="btn btn-primary" disabled={!url || !key}>
              Save Credentials
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

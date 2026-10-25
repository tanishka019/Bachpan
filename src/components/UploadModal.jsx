import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { uploadMediaItem, isSupabaseConfigured } from '../lib/supabase'
import './UploadModal.css'

const CATEGORIES = [
  'Events & Celebrations',
  'Classroom & Learning',
  'Art & Craft',
  'Sports & Outdoor',
  'Music & Dance',
  'Festivals & Days',
  'General',
]

export default function UploadModal({ isOpen, onClose, onSuccess, onOpenConfig }) {
  const [file, setFile] = useState(null)
  const [filePreview, setFilePreview] = useState(null)
  const [mediaType, setMediaType] = useState('image')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [description, setDescription] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [statusMessage, setStatusMessage] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const fileInputRef = useRef(null)

  if (!isOpen) return null

  const handleFileSelection = (selectedFile) => {
    if (!selectedFile) return
    setError('')
    setSuccess(false)

    const isVideo = selectedFile.type.startsWith('video/')
    const isImage = selectedFile.type.startsWith('image/')

    if (!isVideo && !isImage) {
      setError('Please select an image (JPG, PNG, WebP) or video (MP4, WebM, MOV) file.')
      return
    }

    setFile(selectedFile)
    setMediaType(isVideo ? 'video' : 'image')

    // Generate preview URL
    const objectUrl = URL.createObjectURL(selectedFile)
    setFilePreview(objectUrl)

    // Default title from filename if empty
    if (!title) {
      const cleanName = selectedFile.name
        .substring(0, selectedFile.name.lastIndexOf('.'))
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase())
      setTitle(cleanName)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files[0])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!file) {
      setError('Please choose a photo or video to upload.')
      return
    }

    if (!title.trim()) {
      setError('Please provide a title or caption for the media.')
      return
    }

    if (!isSupabaseConfigured()) {
      setError('Supabase is not configured yet. Please configure your Supabase URL & Anon Key.')
      return
    }

    setUploading(true)
    setUploadProgress(20)
    setStatusMessage('Uploading media to Supabase Storage bucket...')

    try {
      // Simulate progress progression for nice UX
      const progressTimer = setInterval(() => {
        setUploadProgress((prev) => (prev < 80 ? prev + 15 : prev))
      }, 300)

      const result = await uploadMediaItem({
        file,
        title,
        description,
        category,
      })

      clearInterval(progressTimer)
      setUploadProgress(100)
      setStatusMessage('Media successfully saved to Supabase!')
      setSuccess(true)

      setTimeout(() => {
        onSuccess(result)
        handleClose()
      }, 1200)
    } catch (err) {
      console.error('Upload failed:', err)
      setError(err.message || 'Upload failed. Please check your Supabase connection and try again.')
      setUploading(false)
      setUploadProgress(0)
    }
  }

  const handleClose = () => {
    if (uploading) return
    if (filePreview) {
      URL.revokeObjectURL(filePreview)
    }
    setFile(null)
    setFilePreview(null)
    setTitle('')
    setDescription('')
    setError('')
    setSuccess(false)
    setUploading(false)
    setUploadProgress(0)
    onClose()
  }

  const configured = isSupabaseConfigured()

  return (
    <div className="upload-backdrop" onClick={handleClose}>
      <motion.div
        className="upload-modal"
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 24 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="upload-modal__header">
          <div>
            <h3 className="upload-modal__title">Upload Gallery Media</h3>
            <p className="upload-modal__subtitle">
              Upload photos and videos directly to Supabase cloud storage
            </p>
          </div>
          <button className="upload-modal__close" onClick={handleClose} disabled={uploading} aria-label="Close">
            ✕
          </button>
        </div>

        {/* Warning if Supabase is not configured */}
        {!configured && (
          <div className="upload-warning">
            <span className="upload-warning__icon">⚠️</span>
            <div className="upload-warning__text">
              <strong>Supabase credentials not configured</strong>
              <span>You need to connect your Supabase project URL and anon key to upload.</span>
            </div>
            {onOpenConfig && (
              <button
                type="button"
                className="btn-configure-pill"
                onClick={() => {
                  handleClose()
                  onOpenConfig()
                }}
              >
                Configure Now
              </button>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="upload-form">
          {/* File Dropzone */}
          {!file ? (
            <div
              className={`dropzone ${isDragging ? 'dropzone--dragging' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/mp4,video/webm,video/quicktime"
                style={{ display: 'none' }}
                onChange={(e) => e.target.files?.[0] && handleFileSelection(e.target.files[0])}
              />
              <div className="dropzone__icon">📸 🎬</div>
              <div className="dropzone__text">
                <strong>Click to browse</strong> or drag & drop media here
              </div>
              <div className="dropzone__meta">
                Supported: JPG, PNG, WebP (up to 25MB) • MP4, WebM, MOV (up to 100MB)
              </div>
            </div>
          ) : (
            <div className="preview-container">
              <div className="preview-media">
                {mediaType === 'image' ? (
                  <img src={filePreview} alt="Preview" className="preview-media__img" />
                ) : (
                  <video
                    src={filePreview}
                    controls
                    playsInline
                    className="preview-media__video"
                  />
                )}
                <span className="preview-badge">
                  {mediaType === 'image' ? '📷 Photo' : '🎬 Video'}
                </span>
              </div>

              <div className="preview-details">
                <div className="preview-filename">{file.name}</div>
                <div className="preview-filesize">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB • {file.type || mediaType}
                </div>
                <button
                  type="button"
                  className="preview-remove-btn"
                  onClick={() => {
                    URL.revokeObjectURL(filePreview)
                    setFile(null)
                    setFilePreview(null)
                  }}
                  disabled={uploading}
                >
                  Change Media File
                </button>
              </div>
            </div>
          )}

          {/* Metadata Inputs */}
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="media-title">Title / Caption *</label>
              <input
                id="media-title"
                type="text"
                placeholder="e.g. Annual Day Rhymes Performance"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={uploading}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="media-category">Category</label>
              <select
                id="media-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={uploading}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="media-description">Description (Optional)</label>
            <textarea
              id="media-description"
              rows={2}
              placeholder="Short description of the event or activity..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={uploading}
            />
          </div>

          {/* Error & Success Messages */}
          <AnimatePresence>
            {error && (
              <motion.div
                className="upload-alert upload-alert--error"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <span>⚠️ {error}</span>
              </motion.div>
            )}

            {success && (
              <motion.div
                className="upload-alert upload-alert--success"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <span>✅ Uploaded to Supabase successfully!</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress bar */}
          {uploading && (
            <div className="upload-progress-wrap">
              <div className="upload-progress-info">
                <span>{statusMessage}</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="upload-progress-bar">
                <div
                  className="upload-progress-fill"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="upload-modal__actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
              disabled={uploading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!file || !title.trim() || uploading}
            >
              {uploading ? 'Uploading to Supabase...' : 'Upload Media 🚀'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

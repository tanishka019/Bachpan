import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  getStoredMemories,
  addMemoryItem,
  updateMemoryItem,
  deleteMemoryItem,
  deleteBatchMemories,
  clearAllMemories,
  resetToDemoMemories,
  formatDateDetails,
} from '../lib/galleryData'
import {
  getStoredHeroSlides,
  saveHeroSlides,
  resetHeroSlides,
} from '../lib/heroData'
import {
  getStoredLeads,
  addLead,
  updateLeadStatus,
  updateLeadNotes,
  deleteLead,
  resetToDemoLeads,
  formatLeadTime,
  getLeadsMetrics,
  exportLeadsToCSV,
} from '../lib/leadsData'
import { isSupabaseConfigured, verifyAdminPin, getSupabaseCredentials, getSupabase } from '../lib/supabase'
import './AdminPage.css'

const CATEGORIES = [
  'Festivals & Celebrations',
  'Sports & Fitness',
  'Classroom & Learning',
  'Nature & Values',
  'Music & Dance',
  'Art & Craft',
  'General Activities',
]

const SAMPLE_DEMO_IMAGES = [
  { label: 'Art & Craft', url: '/hero-2.jpg' },
  { label: 'Outdoor Celebration', url: '/hero-1.jpg' },
  { label: 'Campus Garden', url: '/hero-3.jpg' },
  { label: 'Painting Studio', url: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=80' },
  { label: 'STEM Blocks', url: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1200&q=80' },
]

const SAMPLE_DEMO_VIDEOS = [
  { label: 'Dance & Movement Clip', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
  { label: 'Nursery Phonics Rhymes', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
  { label: 'March Past Drill', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
]

const STATUS_OPTIONS = ['New', 'Contacted', 'Visit Scheduled', 'Enrolled', 'Closed']

export default function AdminPage() {
  const navigate = useNavigate()

  // Authentication State
  const [isUnlocked, setIsUnlocked] = useState(true)
  const [pinInput, setPinInput] = useState('')
  const [pinError, setPinError] = useState('')

  // Top Tabs: 'leads' | 'gallery' | 'settings'
  const [activeTab, setActiveTab] = useState('leads')

  // --- LEADS STATE ---
  const [leads, setLeads] = useState([])
  const [leadSearch, setLeadSearch] = useState('')
  const [leadSourceFilter, setLeadSourceFilter] = useState('All')
  const [leadStatusFilter, setLeadStatusFilter] = useState('All')
  const [leadProgramFilter, setLeadProgramFilter] = useState('All')
  const [selectedLeadDetail, setSelectedLeadDetail] = useState(null)
  const [editingNotesLeadId, setEditingNotesLeadId] = useState(null)
  const [notesDraft, setNotesDraft] = useState('')
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false)
  const [newLeadForm, setNewLeadForm] = useState({
    parent_name: '',
    child_name: '',
    phone: '',
    email: '',
    city: 'Mumbai',
    program: 'Playgroup',
    child_age: '2-3 years',
    form_type: 'Manual Walk-in / Phone',
    message: '',
  })

  // --- GALLERY STATE ---
  const [memories, setMemories] = useState([])
  const [gallerySearch, setGallerySearch] = useState('')
  const [galleryCatFilter, setGalleryCatFilter] = useState('All')
  const [galleryTypeFilter, setGalleryTypeFilter] = useState('All')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [location, setLocation] = useState('')
  const [caption, setCaption] = useState('')
  const [mediaType, setMediaType] = useState('image')
  const [mediaUrl, setMediaUrl] = useState('/hero-1.jpg')
  const [uploadedFileName, setUploadedFileName] = useState('')
  const [galleryFeedback, setGalleryFeedback] = useState('')
  const [editingMoment, setEditingMoment] = useState(null)

  // --- BATCH SELECTION & DELETE STATE ---
  const [selectedMomentIds, setSelectedMomentIds] = useState([])

  // --- HERO SLIDES STATE ---
  const [heroSlides, setHeroSlides] = useState(getStoredHeroSlides())
  const [heroFeedback, setHeroFeedback] = useState('')

  // --- SUPABASE SETTINGS STATE ---
  const defaultCreds = getSupabaseCredentials()
  const [sbUrl, setSbUrl] = useState(
    defaultCreds.url && !defaultCreds.url.includes('your-project-id')
      ? defaultCreds.url
      : 'https://fizeofuiocgkymtrdctz.supabase.co'
  )
  const [sbKey, setSbKey] = useState(
    defaultCreds.key && !defaultCreds.key.includes('your-anon-public-key')
      ? defaultCreds.key
      : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpemVvZnVpb2Nna2l5bXRyZGN0eiIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzYxMzE3Mzk3LCJleHAiOjIwNzY4OTMzOTd9.h6u6rX2qUf0uYqD0Gq1Q991d00s1mYy5B_W9Q3wQ1jM'
  )
  const [sbStatusMsg, setSbStatusMsg] = useState('')
  const [isTestingSb, setIsTestingSb] = useState(false)
  const [connectedState, setConnectedState] = useState(isSupabaseConfigured())

  const handleSaveAndTestSupabase = async (e) => {
    if (e) e.preventDefault()
    setIsTestingSb(true)
    setSbStatusMsg('')

    const cleanUrl = sbUrl.trim()
    const cleanKey = sbKey.trim()

    localStorage.setItem('bachpan_supabase_url', cleanUrl)
    localStorage.setItem('bachpan_supabase_anon_key', cleanKey)

    try {
      const supabase = getSupabase()
      if (!supabase) {
        setSbStatusMsg('❌ Invalid URL or Key. Please check the values and try again.')
        setConnectedState(false)
        setIsTestingSb(false)
        return
      }

      const { error } = await supabase.from('gallery_items').select('id').limit(1)
      if (error) {
        if (error.message?.includes('does not exist')) {
          setSbStatusMsg('⚠️ Connected to Supabase project! However, tables were not found yet. Please run the supabase_setup.sql script in your Supabase SQL Editor.')
          setConnectedState(true)
        } else {
          setSbStatusMsg(`⚠️ Connected to Supabase! Query notice: ${error.message}`)
          setConnectedState(true)
        }
      } else {
        setSbStatusMsg('✅ Connected successfully to Supabase! Both database queries and storage are active.')
        setConnectedState(true)
      }
    } catch (err) {
      setSbStatusMsg(`❌ Connection error: ${err.message}`)
      setConnectedState(false)
    } finally {
      setIsTestingSb(false)
    }
  }

  // Load initial data and bind listeners
  useEffect(() => {
    const loadAll = () => {
      setLeads(getStoredLeads())
      setMemories(getStoredMemories())
      setHeroSlides(getStoredHeroSlides())
      setConnectedState(isSupabaseConfigured())
    }

    loadAll()

    window.addEventListener('bachpan-leads-updated', loadAll)
    window.addEventListener('bachpan-gallery-updated', loadAll)
    window.addEventListener('bachpan-hero-updated', loadAll)
    window.addEventListener('storage', loadAll)

    return () => {
      window.removeEventListener('bachpan-leads-updated', loadAll)
      window.removeEventListener('bachpan-gallery-updated', loadAll)
      window.removeEventListener('bachpan-hero-updated', loadAll)
      window.removeEventListener('storage', loadAll)
    }
  }, [])

  // Leads Metrics
  const leadMetrics = useMemo(() => getLeadsMetrics(leads), [leads])

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      // Source filter
      if (leadSourceFilter === 'Enroll Now' && lead.form_type !== 'Enroll Now') return false
      if (leadSourceFilter === 'Contact Section' && lead.form_type !== 'Contact Section') return false

      // Status filter
      if (leadStatusFilter !== 'All' && lead.status !== leadStatusFilter) return false

      // Program filter
      if (leadProgramFilter !== 'All' && lead.program !== leadProgramFilter) return false

      // Search query
      if (leadSearch.trim()) {
        const q = leadSearch.toLowerCase()
        const matchParent = lead.parent_name?.toLowerCase().includes(q)
        const matchChild = lead.child_name?.toLowerCase().includes(q)
        const matchPhone = lead.phone?.toLowerCase().includes(q)
        const matchEmail = lead.email?.toLowerCase().includes(q)
        const matchCity = lead.city?.toLowerCase().includes(q)
        const matchNotes = lead.admin_notes?.toLowerCase().includes(q)
        if (!matchParent && !matchChild && !matchPhone && !matchEmail && !matchCity && !matchNotes) {
          return false
        }
      }

      return true
    })
  }, [leads, leadSourceFilter, leadStatusFilter, leadProgramFilter, leadSearch])

  // Filtered Memories
  const filteredMemories = useMemo(() => {
    return memories.filter((m) => {
      if (galleryCatFilter !== 'All' && m.category !== galleryCatFilter) return false
      if (galleryTypeFilter === 'Photos' && m.media_type === 'video') return false
      if (galleryTypeFilter === 'Videos' && m.media_type !== 'video') return false
      if (gallerySearch.trim()) {
        const q = gallerySearch.toLowerCase()
        const matchTitle = m.title?.toLowerCase().includes(q)
        const matchCap = m.caption?.toLowerCase().includes(q)
        const matchLoc = m.location?.toLowerCase().includes(q)
        if (!matchTitle && !matchCap && !matchLoc) return false
      }
      return true
    })
  }, [memories, galleryCatFilter, galleryTypeFilter, gallerySearch])

  // PIN Unlock Handler
  const handlePinUnlock = (e) => {
    e.preventDefault()
    if (verifyAdminPin(pinInput)) {
      setIsUnlocked(true)
      setPinError('')
      setPinInput('')
    } else {
      setPinError('Incorrect PIN. (Default PIN is 1234 or configured in .env)')
    }
  }

  // --- LEADS ACTIONS ---
  const handleStatusChange = (id, newStatus) => {
    const updated = updateLeadStatus(id, newStatus)
    setLeads(updated)
  }

  const handleStartEditNotes = (lead) => {
    setEditingNotesLeadId(lead.id)
    setNotesDraft(lead.admin_notes || '')
  }

  const handleSaveNotes = (id) => {
    const updated = updateLeadNotes(id, notesDraft)
    setLeads(updated)
    setEditingNotesLeadId(null)
  }

  const handleDeleteLead = (id, name) => {
    if (window.confirm(`Delete inquiry from ${name || 'parent'}?`)) {
      const updated = deleteLead(id)
      setLeads(updated)
      if (selectedLeadDetail?.id === id) setSelectedLeadDetail(null)
    }
  }

  const handleResetLeads = () => {
    if (window.confirm('Reset inquiries back to starter demo entries?')) {
      const updated = resetToDemoLeads()
      setLeads(updated)
    }
  }

  const handleSaveManualLead = (e) => {
    e.preventDefault()
    if (!newLeadForm.parent_name || !newLeadForm.phone) {
      alert('Parent Name and Phone Number are required.')
      return
    }

    addLead({
      ...newLeadForm,
      status: 'New',
      admin_notes: 'Walk-in / Phone inquiry manually logged by Admissions desk.',
    })

    setIsAddLeadModalOpen(false)
    setNewLeadForm({
      parent_name: '',
      child_name: '',
      phone: '',
      email: '',
      city: 'Mumbai',
      program: 'Playgroup',
      child_age: '2-3 years',
      form_type: 'Manual Walk-in / Phone',
      message: '',
    })
  }

  // --- GALLERY ACTIONS ---
  const handleLocalFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const isVideo = file.type.startsWith('video/')
    setMediaType(isVideo ? 'video' : 'image')
    setUploadedFileName(file.name)

    if (isVideo) {
      // For video preview
      const previewUrl = URL.createObjectURL(file)
      setMediaUrl(previewUrl)
    } else {
      // For images, read as DataURL so it persists in localStorage!
      const reader = new FileReader()
      reader.onload = (event) => {
        setMediaUrl(event.target.result)
      }
      reader.readAsDataURL(file)
    }

    if (!title) {
      const cleanName = file.name
        .substring(0, file.name.lastIndexOf('.'))
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase())
      setTitle(cleanName)
    }
  }

  const handlePublishMoment = (e) => {
    e.preventDefault()
    if (!title.trim() || !mediaUrl) {
      alert('Please provide a title and media file.')
      return
    }

    const newItem = {
      id: `mem-${Date.now()}`,
      date,
      title: title.trim(),
      caption: caption.trim() || 'A delightful moment captured at Wonder Roots Preschool campus.',
      category,
      location: location.trim() || 'Wonder Roots Campus',
      media_type: mediaType,
      url: mediaUrl,
    }

    const updated = addMemoryItem(newItem)
    setMemories(updated)
    setGalleryFeedback(`Published! "${newItem.title}" is now live on the public gallery and timeline.`)

    setTitle('')
    setCaption('')
    setLocation('')
    setUploadedFileName('')

    setTimeout(() => {
      setGalleryFeedback('')
    }, 4500)
  }

  const handleSaveMomentEdit = (e) => {
    e.preventDefault()
    if (!editingMoment) return
    const updated = updateMemoryItem(editingMoment.id, editingMoment)
    setMemories(updated)
    setEditingMoment(null)
    setGalleryFeedback(`Updated: "${editingMoment.title}" changes saved.`)
    setTimeout(() => setGalleryFeedback(''), 3500)
  }

  const handleDeleteMoment = (id, momentTitle) => {
    if (window.confirm(`Delete "${momentTitle}" from memories? This will remove it from the live gallery and cloud database.`)) {
      const updated = deleteMemoryItem(id)
      setMemories(updated)
      setSelectedMomentIds((prev) => prev.filter((item) => item !== id))
      setGalleryFeedback(`Deleted "${momentTitle}" from gallery.`)
      setTimeout(() => setGalleryFeedback(''), 3500)
    }
  }

  const handleToggleSelectMoment = (id) => {
    setSelectedMomentIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const handleSelectAllMoments = () => {
    if (selectedMomentIds.length === filteredMemories.length) {
      setSelectedMomentIds([])
    } else {
      setSelectedMomentIds(filteredMemories.map((m) => m.id))
    }
  }

  const handleDeleteSelectedMoments = () => {
    if (selectedMomentIds.length === 0) return
    if (
      window.confirm(
        `Are you sure you want to delete ${selectedMomentIds.length} selected moment(s)? This action will remove them permanently from both the live gallery and Supabase cloud.`
      )
    ) {
      const updated = deleteBatchMemories(selectedMomentIds)
      setMemories(updated)
      setGalleryFeedback(`Successfully deleted ${selectedMomentIds.length} moment(s).`)
      setSelectedMomentIds([])
      setTimeout(() => setGalleryFeedback(''), 3500)
    }
  }

  const handleClearAllMoments = () => {
    if (
      window.confirm(
        '⚠️ Are you sure you want to delete ALL moments from the gallery? This will clear all uploaded media from the live gallery. You can restore default demo moments anytime by clicking "Reset Moments".'
      )
    ) {
      const updated = clearAllMemories()
      setMemories(updated)
      setSelectedMomentIds([])
      setGalleryFeedback('All moments cleared from the gallery.')
      setTimeout(() => setGalleryFeedback(''), 3500)
    }
  }

  const handleResetMoments = () => {
    if (window.confirm('Reset all gallery posts back to the default demo set?')) {
      const updated = resetToDemoMemories()
      setMemories(updated)
      setSelectedMomentIds([])
      setGalleryFeedback('Gallery reset to default starter moments.')
      setTimeout(() => setGalleryFeedback(''), 3500)
    }
  }

  // --- HERO SLIDE HANDLERS ---
  const handleHeroSlideChange = (index, field, value) => {
    setHeroSlides((prev) =>
      prev.map((s, idx) => (idx === index ? { ...s, [field]: value } : s))
    )
  }

  const handleHeroImageUpload = (index, file) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => {
      handleHeroSlideChange(index, 'bgImage', e.target.result)
    }
    reader.readAsDataURL(file)
  }

  const handleSaveHeroSlides = () => {
    saveHeroSlides(heroSlides)
    setHeroFeedback('✅ Hero banner updated successfully! The new images and captions are live on the homepage.')
    setTimeout(() => setHeroFeedback(''), 4500)
  }

  const handleResetHeroSlides = () => {
    if (window.confirm('Reset the 3 hero banner images and captions back to default?')) {
      const def = resetHeroSlides()
      setHeroSlides(def)
      setHeroFeedback('Hero banner reset to default starter images.')
      setTimeout(() => setHeroFeedback(''), 3500)
    }
  }

  // --- RENDER PIN SCREEN IF LOCKED ---
  if (!isUnlocked) {
    return (
      <div className="adm-light adm-lock-screen">
        <div className="adm-lock-card">
          <div className="adm-lock-icon">🔐</div>
          <h2>Wonder Roots Admin Authentication</h2>
          <p>Please enter the Admin PIN to manage gallery moments and retrieved form leads.</p>

          <form onSubmit={handlePinUnlock} className="adm-lock-form">
            <input
              type="password"
              placeholder="Enter PIN (Default: 1234)"
              value={pinInput}
              onChange={(e) => {
                setPinInput(e.target.value)
                setPinError('')
              }}
              className="adm-input"
              autoFocus
            />

            {pinError && <div className="adm-lock-error">{pinError}</div>}

            <div className="adm-lock-actions">
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>
                ← Back to Website
              </button>
              <button type="submit" className="btn btn-primary">
                Unlock Portal →
              </button>
            </div>
            <span className="adm-lock-hint">💡 Default PIN: <code>1234</code></span>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="adm-light">
      {/* Top Navbar */}
      <header className="adm-nav">
        <div className="adm-nav__inner container">
          <div className="adm-nav__left">
            <button className="adm-nav__back" onClick={() => navigate('/gallery')} title="View Live Gallery">
              ← Live Gallery
            </button>
            <button className="adm-nav__home" onClick={() => navigate('/')} title="Go to Website Home">
              Home
            </button>
            <div className="adm-nav__divider" />
            <div className="adm-nav__brand">
              <span className="adm-nav__tag">ADMIN PORTAL</span>
              <span className="adm-nav__title">Wonder Roots Central</span>
            </div>
          </div>

          <div className="adm-nav__right">
            <span
              className={`adm-sync-pill ${connectedState || isSupabaseConfigured() ? 'adm-sync-pill--connected' : ''}`}
              onClick={() => setActiveTab('settings')}
              style={{ cursor: 'pointer' }}
              title="Click to view Supabase connection status"
            >
              <span className={`adm-sync-dot ${connectedState || isSupabaseConfigured() ? 'adm-sync-dot--connected' : 'adm-sync-dot--local'}`} />
              {connectedState || isSupabaseConfigured() ? 'Supabase Connected' : 'Local Storage Mode'}
            </span>
            <button
              className="adm-lock-btn"
              onClick={() => setIsUnlocked(false)}
              title="Lock Admin Session"
            >
              🔒 Lock
            </button>
          </div>
        </div>
      </header>

      <main className="container adm-main">
        {/* Intro Header */}
        <section className="adm-intro">
          <div>
            <span className="adm-badge">Administrative Operations</span>
            <h1 className="adm-title">School Operations & Content Portal</h1>
            <p className="adm-subtitle">
              Review and follow up on parental admission leads from <strong>Enroll Now</strong> and the <strong>Contact Section</strong>, and publish new moments directly to the <strong>Live Gallery</strong>.
            </p>
          </div>

          <div className="adm-notice-card">
            <strong>⚡ Live Connected Hub</strong>
            <span>All forms submitted on the website appear here immediately. Published moments sync live to the gallery.</span>
          </div>
        </section>

        {/* Global Metrics Cards */}
        <section className="adm-metrics">
          <div className="adm-metric-card" onClick={() => setActiveTab('leads')} style={{ cursor: 'pointer' }}>
            <div className="adm-metric-icon">📥</div>
            <div>
              <div className="adm-metric-val">{leadMetrics.total}</div>
              <div className="adm-metric-lbl">Total Enquiries</div>
            </div>
            {leadMetrics.newCount > 0 && (
              <span className="adm-metric-tag adm-metric-tag--new">
                {leadMetrics.newCount} New
              </span>
            )}
          </div>

          <div className="adm-metric-card" onClick={() => setActiveTab('leads')} style={{ cursor: 'pointer' }}>
            <div className="adm-metric-icon">🎒</div>
            <div>
              <div className="adm-metric-val">{leadMetrics.enrolledCount}</div>
              <div className="adm-metric-lbl">Enrolled Students</div>
            </div>
          </div>

          <div className="adm-metric-card" onClick={() => setActiveTab('gallery')} style={{ cursor: 'pointer' }}>
            <div className="adm-metric-icon">📸</div>
            <div>
              <div className="adm-metric-val">{memories.length}</div>
              <div className="adm-metric-lbl">Gallery Moments</div>
            </div>
          </div>

          <div className="adm-metric-card" onClick={() => setActiveTab('leads')} style={{ cursor: 'pointer' }}>
            <div className="adm-metric-icon">📅</div>
            <div>
              <div className="adm-metric-val">{leadMetrics.scheduledCount}</div>
              <div className="adm-metric-lbl">Visits Scheduled</div>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <div className="adm-tabs-bar">
          <button
            className={`adm-tab-btn ${activeTab === 'leads' ? 'active' : ''}`}
            onClick={() => setActiveTab('leads')}
          >
            📋 Inquiries & Admissions
            <span className="adm-tab-badge">{leads.length}</span>
            {leadMetrics.newCount > 0 && (
              <span className="adm-tab-pill-new">{leadMetrics.newCount} New</span>
            )}
          </button>

          <button
            className={`adm-tab-btn ${activeTab === 'gallery' ? 'active' : ''}`}
            onClick={() => setActiveTab('gallery')}
          >
            🖼️ Gallery & Uploads
            <span className="adm-tab-badge">{memories.length}</span>
          </button>

          <button
            className={`adm-tab-btn ${activeTab === 'hero' ? 'active' : ''}`}
            onClick={() => setActiveTab('hero')}
          >
            🌟 Hero Banner (3 Images)
            <span className="adm-tab-badge">3 Slides</span>
          </button>

          <button
            className={`adm-tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            ⚙️ Cloud & Settings
          </button>
        </div>

        {/* ==================================================================== */}
        {/* TAB 1: LEADS & ENROLMENT MANAGEMENT                                  */}
        {/* ==================================================================== */}
        {activeTab === 'leads' && (
          <section className="adm-tab-content">
            <div className="adm-leads-header">
              <div>
                <h2 className="adm-section-h2">Parent Inquiries & Admissions (Retrieval Desk)</h2>
                <p className="adm-section-desc">
                  Submissions retrieved from <strong>Enroll Now</strong> applications and the <strong>Contact / Campus Visit</strong> section.
                </p>
              </div>

              <div className="adm-leads-top-actions">
                <button
                  type="button"
                  className="adm-btn adm-btn--export"
                  onClick={() => exportLeadsToCSV(filteredLeads)}
                  title="Download Excel/CSV of current inquiries"
                >
                  📥 Export to CSV
                </button>
                <button
                  type="button"
                  className="adm-btn adm-btn--add"
                  onClick={() => setIsAddLeadModalOpen(true)}
                >
                  ➕ Log Manual Lead
                </button>
                <button
                  type="button"
                  className="adm-btn adm-btn--reset"
                  onClick={handleResetLeads}
                  title="Restore starter demo inquiries"
                >
                  ↺ Reset Leads
                </button>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="adm-filter-card">
              <div className="adm-search-box">
                <span className="adm-search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Search by Parent name, Child, Phone, Email, City..."
                  value={leadSearch}
                  onChange={(e) => setLeadSearch(e.target.value)}
                  className="adm-filter-input"
                />
                {leadSearch && (
                  <button className="adm-clear-btn" onClick={() => setLeadSearch('')}>✕</button>
                )}
              </div>

              <div className="adm-select-group">
                {/* Source Filter */}
                <select
                  value={leadSourceFilter}
                  onChange={(e) => setLeadSourceFilter(e.target.value)}
                  className="adm-select"
                >
                  <option value="All">All Sources ({leads.length})</option>
                  <option value="Enroll Now">🎒 Enroll Now ({leadMetrics.enrollNowCount})</option>
                  <option value="Contact Section">📍 Contact Section ({leadMetrics.contactSectionCount})</option>
                </select>

                {/* Status Filter */}
                <select
                  value={leadStatusFilter}
                  onChange={(e) => setLeadStatusFilter(e.target.value)}
                  className="adm-select"
                >
                  <option value="All">All Statuses</option>
                  {STATUS_OPTIONS.map((st) => (
                    <option key={st} value={st}>
                      {st} ({leads.filter((l) => l.status === st).length})
                    </option>
                  ))}
                </select>

                {/* Program Filter */}
                <select
                  value={leadProgramFilter}
                  onChange={(e) => setLeadProgramFilter(e.target.value)}
                  className="adm-select"
                >
                  <option value="All">All Programs</option>
                  <option value="Playgroup">Playgroup</option>
                  <option value="Nursery">Nursery</option>
                  <option value="LKG">LKG</option>
                  <option value="UKG">UKG</option>
                </select>
              </div>
            </div>

            {/* Leads Feed */}
            <div className="adm-leads-list">
              {filteredLeads.length === 0 ? (
                <div className="adm-empty-state">
                  <div className="adm-empty-icon">📭</div>
                  <h3>No Inquiries Found</h3>
                  <p>No leads match your current search and filter criteria.</p>
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      setLeadSearch('')
                      setLeadSourceFilter('All')
                      setLeadStatusFilter('All')
                      setLeadProgramFilter('All')
                    }}
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                filteredLeads.map((lead) => {
                  const isEnrollNow = lead.form_type === 'Enroll Now'
                  const isEditingNotes = editingNotesLeadId === lead.id

                  return (
                    <article key={lead.id} className="adm-lead-card">
                      {/* Card Header */}
                      <div className="adm-lead-card__header">
                        <div className="adm-lead-badges">
                          <span className={`adm-source-pill ${isEnrollNow ? 'adm-source-pill--enroll' : 'adm-source-pill--contact'}`}>
                            {isEnrollNow ? '🎒 Enroll Now Form' : '📍 Contact & Tour Form'}
                          </span>
                          <span className="adm-time-pill">
                            🕒 {formatLeadTime(lead.created_at)}
                          </span>
                          <span className="adm-city-pill">
                            📍 {lead.city || 'City N/A'}
                          </span>
                        </div>

                        {/* Status Dropdown */}
                        <div className="adm-status-select-wrap">
                          <label className="adm-status-lbl">Status:</label>
                          <select
                            value={lead.status}
                            onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                            className={`adm-status-badge adm-status-badge--${(lead.status || 'new').toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            {STATUS_OPTIONS.map((st) => (
                              <option key={st} value={st}>
                                {st}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="adm-lead-card__body">
                        <div className="adm-lead-col">
                          <div className="adm-lead-parent">
                            <h3>{lead.parent_name || 'Parent Name N/A'}</h3>
                            <div className="adm-lead-child">
                              Child: <strong>{lead.child_name || 'Not specified'}</strong>
                              {lead.child_age && <span> ({lead.child_age})</span>}
                              <span className="adm-prog-tag">{lead.program || 'Playgroup'}</span>
                            </div>
                          </div>

                          {/* Contact Shortcuts */}
                          <div className="adm-contact-actions">
                            {lead.phone && (
                              <>
                                <a
                                  href={`tel:${lead.phone.replace(/[^0-9+]/g, '')}`}
                                  className="adm-contact-btn adm-contact-btn--call"
                                  title="Call Parent"
                                >
                                  📞 Call {lead.phone}
                                </a>
                                <a
                                  href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="adm-contact-btn adm-contact-btn--wa"
                                  title="Send WhatsApp Message"
                                >
                                  💬 WhatsApp
                                </a>
                              </>
                            )}
                            {lead.email && (
                              <a
                                href={`mailto:${lead.email}`}
                                className="adm-contact-btn adm-contact-btn--email"
                                title="Send Email"
                              >
                                ✉️ {lead.email}
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Inquiry Message */}
                        <div className="adm-lead-col adm-lead-msg-col">
                          <div className="adm-lead-msg-box">
                            <span className="adm-msg-title">Parent's Message / Request:</span>
                            <p className="adm-msg-text">
                              {lead.message || 'No specific notes provided with submission.'}
                            </p>
                          </div>
                        </div>

                        {/* Internal Admin / Counselor Notes */}
                        <div className="adm-lead-col adm-lead-notes-col">
                          <div className="adm-lead-notes-box">
                            <div className="adm-notes-header">
                              <span className="adm-notes-title">Counselor Notes:</span>
                              {!isEditingNotes && (
                                <button
                                  type="button"
                                  className="adm-notes-edit-btn"
                                  onClick={() => handleStartEditNotes(lead)}
                                >
                                  ✏️ {lead.admin_notes ? 'Edit' : 'Add Note'}
                                </button>
                              )}
                            </div>

                            {isEditingNotes ? (
                              <div className="adm-notes-editor">
                                <textarea
                                  rows={2}
                                  value={notesDraft}
                                  onChange={(e) => setNotesDraft(e.target.value)}
                                  placeholder="e.g. Spoke on phone, scheduled campus visit for Friday 10 AM..."
                                  className="adm-notes-textarea"
                                />
                                <div className="adm-notes-editor-actions">
                                  <button
                                    type="button"
                                    className="btn btn-secondary btn-sm"
                                    onClick={() => setEditingNotesLeadId(null)}
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-primary btn-sm"
                                    onClick={() => handleSaveNotes(lead.id)}
                                  >
                                    Save Note
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <p className="adm-notes-text">
                                {lead.admin_notes ? lead.admin_notes : <em>No notes recorded yet.</em>}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="adm-lead-card__footer">
                        <span className="adm-lead-id">ID: {lead.id}</span>
                        <div className="adm-lead-footer-actions">
                          <button
                            type="button"
                            className="adm-view-btn"
                            onClick={() => setSelectedLeadDetail(lead)}
                          >
                            👁️ Full Details
                          </button>
                          <button
                            type="button"
                            className="adm-del-btn"
                            onClick={() => handleDeleteLead(lead.id, lead.parent_name)}
                            title="Delete Lead"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </article>
                  )
                })
              )}
            </div>
          </section>
        )}

        {/* ==================================================================== */}
        {/* TAB 2: GALLERY & MOMENTS MANAGER                                     */}
        {/* ==================================================================== */}
        {activeTab === 'gallery' && (
          <section className="adm-tab-content">
            <div className="adm-gallery-header">
              <div>
                <h2 className="adm-section-h2">Gallery & Media Moments Manager</h2>
                <p className="adm-section-desc">
                  Publish photo and video memories grouped chronologically by date.
                  Everything published here appears immediately on the <strong style={{ color: '#7c3aed' }}>Live Gallery (/gallery)</strong> and homepage teaser.
                </p>
              </div>

              <div className="adm-gallery-actions">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => navigate('/gallery')}
                  title="Open live gallery in another tab or view"
                >
                  👁️ Open Live Gallery →
                </button>
                <button
                  type="button"
                  className="adm-btn adm-btn--danger"
                  onClick={handleClearAllMoments}
                  title="Delete all uploads and moments from the gallery"
                >
                  🗑️ Clear All Moments
                </button>
                <button
                  type="button"
                  className="adm-btn adm-btn--reset"
                  onClick={handleResetMoments}
                  title="Restore starter demo memories"
                >
                  ↺ Reset Moments
                </button>
              </div>
            </div>

            <AnimatePresence>
              {galleryFeedback && (
                <motion.div
                  className="adm-alert"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  ✅ {galleryFeedback}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="adm-grid">
              {/* Left Column: Publish Form */}
              <section className="adm-card">
                <div className="adm-card__header">
                  <h2>Publish New Moment</h2>
                  <p>Add a photo or video with event date and story caption</p>
                </div>

                <form onSubmit={handlePublishMoment} className="adm-form">
                  {/* Event Date Picker */}
                  <div className="adm-field">
                    <label htmlFor="adm-date">
                      📅 Event Date * <span className="adm-field-hint">(Determines month and day in gallery timeline)</span>
                    </label>
                    <input
                      id="adm-date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="adm-input"
                      required
                    />
                  </div>

                  {/* Title */}
                  <div className="adm-field">
                    <label htmlFor="adm-title">Activity / Event Title *</label>
                    <input
                      id="adm-title"
                      type="text"
                      placeholder="e.g. Clay Diya Craft & Diwali Celebration"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="adm-input"
                      required
                    />
                  </div>

                  {/* Category & Location */}
                  <div className="adm-field-row">
                    <div className="adm-field">
                      <label htmlFor="adm-cat">Category</label>
                      <select
                        id="adm-cat"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="adm-input"
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="adm-field">
                      <label htmlFor="adm-loc">Campus Location</label>
                      <input
                        id="adm-loc"
                        type="text"
                        placeholder="e.g. Activity Courtyard"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="adm-input"
                      />
                    </div>
                  </div>

                  {/* Media Format Switch */}
                  <div className="adm-field">
                    <label>Media Format</label>
                    <div className="adm-type-switch">
                      <button
                        type="button"
                        className={`adm-switch-btn ${mediaType === 'image' ? 'active' : ''}`}
                        onClick={() => {
                          setMediaType('image')
                          setMediaUrl('/hero-1.jpg')
                          setUploadedFileName('')
                        }}
                      >
                        📷 Photograph
                      </button>
                      <button
                        type="button"
                        className={`adm-switch-btn ${mediaType === 'video' ? 'active' : ''}`}
                        onClick={() => {
                          setMediaType('video')
                          setMediaUrl(SAMPLE_DEMO_VIDEOS[0].url)
                          setUploadedFileName('')
                        }}
                      >
                        🎬 Video Clip
                      </button>
                    </div>
                  </div>

                  {/* Media Source & File Picker */}
                  <div className="adm-field">
                    <label>Upload Media File or Select Demo Preset</label>
                    <div className="adm-upload-zone">
                      <input
                        type="file"
                        id="adm-file-input"
                        accept={mediaType === 'image' ? 'image/*' : 'video/*'}
                        onChange={handleLocalFile}
                        style={{ display: 'none' }}
                      />
                      <label htmlFor="adm-file-input" className="adm-file-btn">
                        📁 {uploadedFileName ? `Selected: ${uploadedFileName}` : 'Choose File from Computer'}
                      </label>

                      <div className="adm-presets">
                        <span>Quick Presets:</span>
                        {(mediaType === 'image' ? SAMPLE_DEMO_IMAGES : SAMPLE_DEMO_VIDEOS).map((sample, i) => (
                          <button
                            key={i}
                            type="button"
                            className={`adm-preset-btn ${mediaUrl === sample.url ? 'active' : ''}`}
                            onClick={() => {
                              setMediaUrl(sample.url)
                              setUploadedFileName('')
                            }}
                          >
                            {sample.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Live Preview */}
                  <div className="adm-preview-box">
                    <div className="adm-preview-lbl">Live Media Preview:</div>
                    <div className="adm-preview-wrap">
                      {mediaType === 'image' ? (
                        <img src={mediaUrl} alt="Preview" />
                      ) : (
                        <video src={mediaUrl} controls playsInline />
                      )}
                      <span className="adm-preview-tag">
                        {mediaType === 'image' ? '📷 Photo' : '🎬 Video'}
                      </span>
                    </div>
                  </div>

                  {/* Caption & Description */}
                  <div className="adm-field">
                    <label htmlFor="adm-caption">Caption & Story Description</label>
                    <textarea
                      id="adm-caption"
                      rows={3}
                      placeholder="Describe what the children learned, celebrated, and explored..."
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      className="adm-input"
                    />
                  </div>

                  <button type="submit" className="adm-submit-btn">
                    Publish Moment to Gallery 🚀
                  </button>
                </form>
              </section>

              {/* Right Column: Published List */}
              <section className="adm-card">
                <div className="adm-card__header">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h2>Published Moments ({filteredMemories.length})</h2>
                      <p>Currently visible on live gallery timeline</p>
                    </div>
                    <button
                      className="adm-view-gallery-link"
                      onClick={() => navigate('/gallery')}
                    >
                      View Live Gallery ↗
                    </button>
                  </div>

                  {/* Filter Toolbar for Moments */}
                  <div className="adm-moments-filter-bar">
                    <input
                      type="text"
                      placeholder="Search moments by title or caption..."
                      value={gallerySearch}
                      onChange={(e) => setGallerySearch(e.target.value)}
                      className="adm-filter-input adm-filter-input--sm"
                    />
                    <select
                      value={galleryCatFilter}
                      onChange={(e) => setGalleryCatFilter(e.target.value)}
                      className="adm-select adm-select--sm"
                    >
                      <option value="All">All Categories</option>
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    <select
                      value={galleryTypeFilter}
                      onChange={(e) => setGalleryTypeFilter(e.target.value)}
                      className="adm-select adm-select--sm"
                    >
                      <option value="All">All Formats</option>
                      <option value="Photos">📷 Photos Only</option>
                      <option value="Videos">🎬 Videos Only</option>
                    </select>
                  </div>
                </div>

                {/* Batch Actions Toolbar */}
                {filteredMemories.length > 0 && (
                  <div className="adm-batch-bar">
                    <label className="adm-batch-select-all">
                      <input
                        type="checkbox"
                        checked={selectedMomentIds.length > 0 && selectedMomentIds.length === filteredMemories.length}
                        onChange={handleSelectAllMoments}
                      />
                      <span>Select All ({filteredMemories.length})</span>
                    </label>

                    {selectedMomentIds.length > 0 && (
                      <button
                        type="button"
                        className="adm-btn adm-btn--danger-sm"
                        onClick={handleDeleteSelectedMoments}
                      >
                        🗑️ Delete Selected ({selectedMomentIds.length})
                      </button>
                    )}
                  </div>
                )}

                <div className="adm-list-feed">
                  {filteredMemories.length === 0 ? (
                    <div className="adm-empty-state">
                      <div className="adm-empty-icon">🖼️</div>
                      <h3>No Moments Found</h3>
                      <p>Try clearing your search query or category filters.</p>
                    </div>
                  ) : (
                    filteredMemories.map((item) => {
                      const dateInfo = formatDateDetails(item.date)
                      const isVideo = item.media_type === 'video'
                      const isSelected = selectedMomentIds.includes(item.id)

                      return (
                        <div key={item.id} className={`adm-item ${isSelected ? 'adm-item--selected' : ''}`}>
                          <input
                            type="checkbox"
                            className="adm-item__check"
                            checked={isSelected}
                            onChange={() => handleToggleSelectMoment(item.id)}
                            title="Select for bulk deletion"
                          />

                          <div className="adm-item__thumb">
                            {isVideo ? (
                              <video src={item.url} muted preload="metadata" />
                            ) : (
                              <img src={item.url} alt={item.title} />
                            )}
                            <span className="adm-item__tag">{isVideo ? '🎬' : '📷'}</span>
                          </div>

                          <div className="adm-item__info">
                            <div className="adm-item__meta">
                              📅 {dateInfo.fullDate} • {item.category}
                              {item.location && <span> • 📍 {item.location}</span>}
                            </div>
                            <h3 className="adm-item__title">{item.title}</h3>
                            <p className="adm-item__caption">{item.caption}</p>
                          </div>

                          <div className="adm-item__actions">
                            <button
                              type="button"
                              className="adm-edit-btn"
                              onClick={() => setEditingMoment(item)}
                              title="Edit moment details"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              className="adm-del-btn"
                              onClick={() => handleDeleteMoment(item.id, item.title)}
                              title="Delete moment"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
              </section>
            </div>
          </section>
        )}

        {/* ==================================================================== */}
        {/* TAB 3: HERO BANNER (3 IMAGES) MANAGER                                */}
        {/* ==================================================================== */}
        {activeTab === 'hero' && (
          <section className="adm-tab-content">
            <div className="adm-hero-tab-header">
              <div>
                <h2 className="adm-section-h2">Homepage Hero Banner (3 Slides)</h2>
                <p className="adm-section-desc">
                  Customize the 3 full-screen background images, badges, headings, and photo labels shown in the home page slider.
                </p>
              </div>

              <div className="adm-hero-top-actions">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSaveHeroSlides}
                >
                  💾 Save All Hero Changes
                </button>
                <button
                  type="button"
                  className="adm-btn adm-btn--reset"
                  onClick={handleResetHeroSlides}
                >
                  ↺ Reset Defaults
                </button>
                <button
                  type="button"
                  className="adm-btn adm-btn--export"
                  onClick={() => navigate('/')}
                >
                  🏠 View Homepage ↗
                </button>
              </div>
            </div>

            <AnimatePresence>
              {heroFeedback && (
                <motion.div
                  className="adm-alert"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {heroFeedback}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="adm-hero-grid">
              {heroSlides.map((slide, idx) => (
                <div key={slide.id || idx} className={`adm-hero-card adm-hero-card--${slide.color || 'purple'}`}>
                  <div className="adm-hero-card__header">
                    <span className="adm-hero-num">Slide {idx + 1}</span>
                    <span className="adm-hero-color-tag">{slide.color}</span>
                  </div>

                  {/* Live Photo Preview */}
                  <div className="adm-hero-preview">
                    <img src={slide.bgImage} alt={`Hero Slide ${idx + 1}`} />
                    <span className="adm-hero-preview-badge">{slide.badge}</span>
                    <span className="adm-hero-preview-label">📸 {slide.photoLabel}</span>
                  </div>

                  {/* Change Image */}
                  <div className="adm-field" style={{ marginTop: '14px' }}>
                    <label>Background Image (Upload or Paste URL)</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input
                        type="file"
                        id={`hero-file-${idx}`}
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) => handleHeroImageUpload(idx, e.target.files?.[0])}
                      />
                      <label htmlFor={`hero-file-${idx}`} className="adm-file-btn" style={{ flex: 1, padding: '7px 10px', fontSize: '0.82rem' }}>
                        📁 Choose Image from Computer
                      </label>
                    </div>

                    <input
                      type="text"
                      placeholder="Or enter image URL (e.g. /hero-1.jpg)"
                      value={slide.bgImage}
                      onChange={(e) => handleHeroSlideChange(idx, 'bgImage', e.target.value)}
                      className="adm-input"
                      style={{ marginTop: '6px' }}
                    />
                  </div>

                  {/* Quick Preset Images */}
                  <div className="adm-presets" style={{ marginTop: '4px' }}>
                    <span>Presets:</span>
                    {SAMPLE_DEMO_IMAGES.map((imgSample, i) => (
                      <button
                        key={i}
                        type="button"
                        className={`adm-preset-btn ${slide.bgImage === imgSample.url ? 'active' : ''}`}
                        onClick={() => handleHeroSlideChange(idx, 'bgImage', imgSample.url)}
                      >
                        {imgSample.label}
                      </button>
                    ))}
                  </div>

                  {/* Photo Stamp Label */}
                  <div className="adm-field" style={{ marginTop: '10px' }}>
                    <label>Photo Corner Label</label>
                    <input
                      type="text"
                      value={slide.photoLabel}
                      onChange={(e) => handleHeroSlideChange(idx, 'photoLabel', e.target.value)}
                      className="adm-input"
                      placeholder="e.g. Happy Father's Day Celebration"
                    />
                  </div>

                  {/* Badge Text */}
                  <div className="adm-field" style={{ marginTop: '8px' }}>
                    <label>Slide Badge Tag</label>
                    <input
                      type="text"
                      value={slide.badge}
                      onChange={(e) => handleHeroSlideChange(idx, 'badge', e.target.value)}
                      className="adm-input"
                      placeholder="e.g. 🎨 Play-Based Learning"
                    />
                  </div>

                  {/* Heading & Heading Accent */}
                  <div className="adm-field-row" style={{ marginTop: '8px' }}>
                    <div className="adm-field">
                      <label>Heading</label>
                      <input
                        type="text"
                        value={slide.heading}
                        onChange={(e) => handleHeroSlideChange(idx, 'heading', e.target.value)}
                        className="adm-input"
                        placeholder="e.g. Where Little Dreams"
                      />
                    </div>
                    <div className="adm-field">
                      <label>Accent Word</label>
                      <input
                        type="text"
                        value={slide.headingAccent}
                        onChange={(e) => handleHeroSlideChange(idx, 'headingAccent', e.target.value)}
                        className="adm-input"
                        placeholder="e.g. Take Flight"
                      />
                    </div>
                  </div>

                  {/* Subtitle */}
                  <div className="adm-field" style={{ marginTop: '8px' }}>
                    <label>Description Subtitle</label>
                    <textarea
                      rows={2}
                      value={slide.sub}
                      onChange={(e) => handleHeroSlideChange(idx, 'sub', e.target.value)}
                      className="adm-input"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleResetHeroSlides}
              >
                ↺ Restore Default Slides
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSaveHeroSlides}
                style={{ padding: '10px 24px', fontWeight: 700 }}
              >
                💾 Save All Hero Changes
              </button>
            </div>
          </section>
        )}

        {/* ==================================================================== */}
        {/* TAB 3: CLOUD & SETTINGS                                              */}
        {/* ==================================================================== */}
        {activeTab === 'settings' && (
          <section className="adm-tab-content">
            <div className="adm-card adm-settings-card">
              <div className="adm-card__header">
                <h2>Cloud Database & Storage Configuration</h2>
                <p>Setup instructions for connecting Supabase PostgreSQL and Storage</p>
              </div>

              <div className="adm-settings-status">
                <div className="adm-status-box">
                  <span className="adm-status-icon">
                    {connectedState || isSupabaseConfigured() ? '✅' : '⚡'}
                  </span>
                  <div>
                    <h4>{connectedState || isSupabaseConfigured() ? 'Supabase Connected' : 'Running in Local Storage Mode'}</h4>
                    <p>
                      {connectedState || isSupabaseConfigured()
                        ? 'Your app is actively connected to Supabase Cloud for photos, videos, and leads.'
                        : 'Currently using persistent browser localStorage. Inquiries and moments persist across page refreshes and browser tabs.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Live Credentials Setup Form */}
              <div className="adm-card" style={{ background: '#f8fafc', marginBottom: '24px', border: '1.5px solid #cbd5e1' }}>
                <div className="adm-card__header">
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 4px', color: '#0f172a' }}>
                    🔑 Connect Your Supabase Credentials
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0 }}>
                    Enter or verify your Supabase Project URL and Anon Public Key below to test and connect instantly.
                  </p>
                </div>

                <form onSubmit={handleSaveAndTestSupabase} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div className="adm-field">
                    <label>Supabase Project URL *</label>
                    <input
                      type="text"
                      required
                      placeholder="https://your-project-id.supabase.co"
                      value={sbUrl}
                      onChange={(e) => setSbUrl(e.target.value)}
                      className="adm-input"
                    />
                  </div>

                  <div className="adm-field">
                    <label>Supabase Anon / Public Key *</label>
                    <textarea
                      rows={2}
                      required
                      placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                      value={sbKey}
                      onChange={(e) => setSbKey(e.target.value)}
                      className="adm-input"
                      style={{ fontFamily: 'monospace', fontSize: '0.78rem' }}
                    />
                  </div>

                  {sbStatusMsg && (
                    <div
                      style={{
                        padding: '10px 14px',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        background: sbStatusMsg.startsWith('✅') ? '#f0fdf4' : sbStatusMsg.startsWith('⚠️') ? '#fffbeb' : '#fef2f2',
                        color: sbStatusMsg.startsWith('✅') ? '#15803d' : sbStatusMsg.startsWith('⚠️') ? '#b45309' : '#dc2626',
                        border: '1px solid currentColor',
                      }}
                    >
                      {sbStatusMsg}
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isTestingSb}
                      style={{ padding: '10px 20px', fontWeight: 700 }}
                    >
                      {isTestingSb ? 'Testing Connection...' : '💾 Save & Connect Supabase'}
                    </button>
                    {(connectedState || isSupabaseConfigured()) && (
                      <span style={{ fontSize: '0.82rem', color: '#15803d', fontWeight: 600 }}>
                        ● Supabase is Active
                      </span>
                    )}
                  </div>
                </form>
              </div>

              <div className="adm-settings-info">
                <h3>Connecting Supabase Cloud:</h3>
                <ol className="adm-steps-list">
                  <li>Create a free Supabase project at <a href="https://supabase.com" target="_blank" rel="noreferrer">supabase.com</a>.</li>
                  <li>Copy your <strong>Project URL</strong> and <strong>Anon Public Key</strong> from Project Settings &gt; API.</li>
                  <li>Update your <code>.env</code> file in the project root:
                    <pre className="adm-code-block">
{`VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key-here
VITE_SUPABASE_BUCKET=gallery-media
VITE_ADMIN_PIN=1234`}
                    </pre>
                  </li>
                  <li>Run the SQL script <code>supabase_setup.sql</code> in your Supabase SQL Editor to create both the <code>gallery_items</code> and <code>admissions_leads</code> tables.</li>
                </ol>
              </div>

              <div className="adm-settings-danger">
                <h3>Data Maintenance</h3>
                <p>Reset all application data back to default demo state:</p>
                <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                  <button className="adm-btn adm-btn--reset" onClick={handleResetLeads}>
                    ↺ Reset Admissions Leads
                  </button>
                  <button className="adm-btn adm-btn--reset" onClick={handleResetMoments}>
                    ↺ Reset Gallery Moments
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* ==================================================================== */}
      {/* MODAL 1: VIEW LEAD FULL DETAILS                                      */}
      {/* ==================================================================== */}
      {selectedLeadDetail && (
        <div className="adm-modal-backdrop" onClick={() => setSelectedLeadDetail(null)}>
          <div className="adm-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="adm-modal-header">
              <div>
                <span className="adm-badge">Lead Reference: {selectedLeadDetail.id}</span>
                <h3>{selectedLeadDetail.parent_name}'s Inquiry</h3>
              </div>
              <button className="adm-modal-close" onClick={() => setSelectedLeadDetail(null)}>✕</button>
            </div>

            <div className="adm-modal-body">
              <div className="adm-modal-grid">
                <div>
                  <label className="adm-modal-lbl">Form Source</label>
                  <div className="adm-modal-val">
                    <strong>{selectedLeadDetail.form_type}</strong>
                  </div>
                </div>

                <div>
                  <label className="adm-modal-lbl">Current Status</label>
                  <select
                    value={selectedLeadDetail.status}
                    onChange={(e) => {
                      handleStatusChange(selectedLeadDetail.id, e.target.value)
                      setSelectedLeadDetail({ ...selectedLeadDetail, status: e.target.value })
                    }}
                    className={`adm-status-badge adm-status-badge--${(selectedLeadDetail.status || 'new').toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {STATUS_OPTIONS.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="adm-modal-lbl">Parent / Guardian</label>
                  <div className="adm-modal-val">{selectedLeadDetail.parent_name}</div>
                </div>

                <div>
                  <label className="adm-modal-lbl">Phone Number</label>
                  <div className="adm-modal-val">
                    <a href={`tel:${selectedLeadDetail.phone}`} style={{ color: '#2563eb', fontWeight: 600 }}>
                      📞 {selectedLeadDetail.phone}
                    </a>
                  </div>
                </div>

                <div>
                  <label className="adm-modal-lbl">Email Address</label>
                  <div className="adm-modal-val">
                    {selectedLeadDetail.email ? (
                      <a href={`mailto:${selectedLeadDetail.email}`} style={{ color: '#2563eb' }}>
                        {selectedLeadDetail.email}
                      </a>
                    ) : 'Not provided'}
                  </div>
                </div>

                <div>
                  <label className="adm-modal-lbl">City / Campus</label>
                  <div className="adm-modal-val">{selectedLeadDetail.city || 'Not specified'}</div>
                </div>

                <div>
                  <label className="adm-modal-lbl">Child's Name & Age</label>
                  <div className="adm-modal-val">
                    {selectedLeadDetail.child_name || 'Not provided'}{' '}
                    {selectedLeadDetail.child_age && `(${selectedLeadDetail.child_age})`}
                  </div>
                </div>

                <div>
                  <label className="adm-modal-lbl">Program of Interest</label>
                  <div className="adm-modal-val">
                    <span className="adm-prog-tag">{selectedLeadDetail.program || 'Playgroup'}</span>
                  </div>
                </div>

                <div>
                  <label className="adm-modal-lbl">Academic Session</label>
                  <div className="adm-modal-val">{selectedLeadDetail.academic_session || '2026-2027'}</div>
                </div>

                <div>
                  <label className="adm-modal-lbl">Submitted On</label>
                  <div className="adm-modal-val">{new Date(selectedLeadDetail.created_at).toLocaleString('en-IN')}</div>
                </div>
              </div>

              <div className="adm-modal-section">
                <label className="adm-modal-lbl">Parent's Message / Request</label>
                <div className="adm-modal-quote">
                  {selectedLeadDetail.message || 'No additional message was submitted.'}
                </div>
              </div>

              <div className="adm-modal-section">
                <label className="adm-modal-lbl">Counselor Internal Notes</label>
                <div className="adm-modal-notes-box">
                  {selectedLeadDetail.admin_notes || 'No counselor notes recorded yet.'}
                </div>
              </div>
            </div>

            <div className="adm-modal-footer">
              <button className="btn btn-secondary" onClick={() => setSelectedLeadDetail(null)}>
                Close
              </button>
              {selectedLeadDetail.phone && (
                <a
                  href={`https://wa.me/${selectedLeadDetail.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary"
                >
                  💬 Open WhatsApp Chat
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODAL 2: LOG MANUAL INQUIRY                                          */}
      {/* ==================================================================== */}
      {isAddLeadModalOpen && (
        <div className="adm-modal-backdrop" onClick={() => setIsAddLeadModalOpen(false)}>
          <div className="adm-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="adm-modal-header">
              <div>
                <span className="adm-badge">Reception Desk</span>
                <h3>Log Walk-in or Telephonic Lead</h3>
              </div>
              <button className="adm-modal-close" onClick={() => setIsAddLeadModalOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleSaveManualLead} className="adm-modal-form">
              <div className="adm-modal-grid">
                <div className="adm-field">
                  <label>Parent's Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kulkarni"
                    value={newLeadForm.parent_name}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, parent_name: e.target.value })}
                    className="adm-input"
                  />
                </div>

                <div className="adm-field">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98XXX XXXXX"
                    value={newLeadForm.phone}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                    className="adm-input"
                  />
                </div>

                <div className="adm-field">
                  <label>Child's Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Advait Kulkarni"
                    value={newLeadForm.child_name}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, child_name: e.target.value })}
                    className="adm-input"
                  />
                </div>

                <div className="adm-field">
                  <label>Program</label>
                  <select
                    value={newLeadForm.program}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, program: e.target.value })}
                    className="adm-input"
                  >
                    <option value="Playgroup">Playgroup</option>
                    <option value="Nursery">Nursery</option>
                    <option value="LKG">LKG</option>
                    <option value="UKG">UKG</option>
                  </select>
                </div>

                <div className="adm-field">
                  <label>City / Campus</label>
                  <input
                    type="text"
                    placeholder="e.g. Pune"
                    value={newLeadForm.city}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, city: e.target.value })}
                    className="adm-input"
                  />
                </div>

                <div className="adm-field">
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="parent@email.com"
                    value={newLeadForm.email}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                    className="adm-input"
                  />
                </div>
              </div>

              <div className="adm-field" style={{ marginTop: '12px' }}>
                <label>Discussion / Inquiry Notes</label>
                <textarea
                  rows={2}
                  placeholder="Parent asked for fee structure and school bus route details..."
                  value={newLeadForm.message}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, message: e.target.value })}
                  className="adm-input"
                />
              </div>

              <div className="adm-modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsAddLeadModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Inquiry to Leads
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODAL 3: EDIT EXISTING MOMENT                                        */}
      {/* ==================================================================== */}
      {editingMoment && (
        <div className="adm-modal-backdrop" onClick={() => setEditingMoment(null)}>
          <div className="adm-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="adm-modal-header">
              <div>
                <span className="adm-badge">Moment Editor</span>
                <h3>Edit Gallery Moment</h3>
              </div>
              <button className="adm-modal-close" onClick={() => setEditingMoment(null)}>✕</button>
            </div>

            <form onSubmit={handleSaveMomentEdit} className="adm-modal-form">
              <div className="adm-field">
                <label>Title *</label>
                <input
                  type="text"
                  required
                  value={editingMoment.title}
                  onChange={(e) => setEditingMoment({ ...editingMoment, title: e.target.value })}
                  className="adm-input"
                />
              </div>

              <div className="adm-field-row" style={{ marginTop: '12px' }}>
                <div className="adm-field">
                  <label>Event Date *</label>
                  <input
                    type="date"
                    required
                    value={editingMoment.date}
                    onChange={(e) => setEditingMoment({ ...editingMoment, date: e.target.value })}
                    className="adm-input"
                  />
                </div>

                <div className="adm-field">
                  <label>Category</label>
                  <select
                    value={editingMoment.category}
                    onChange={(e) => setEditingMoment({ ...editingMoment, category: e.target.value })}
                    className="adm-input"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="adm-field" style={{ marginTop: '12px' }}>
                <label>Location</label>
                <input
                  type="text"
                  value={editingMoment.location || ''}
                  onChange={(e) => setEditingMoment({ ...editingMoment, location: e.target.value })}
                  className="adm-input"
                  placeholder="e.g. Montessori Lab"
                />
              </div>

              <div className="adm-field" style={{ marginTop: '12px' }}>
                <label>Caption & Story Description</label>
                <textarea
                  rows={3}
                  value={editingMoment.caption || ''}
                  onChange={(e) => setEditingMoment({ ...editingMoment, caption: e.target.value })}
                  className="adm-input"
                />
              </div>

              <div className="adm-modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setEditingMoment(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

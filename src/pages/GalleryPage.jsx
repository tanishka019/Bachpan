import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {
  getStoredMemories,
  groupMemoriesByMonth,
  formatDateDetails,
} from '../lib/galleryData'
import CalendarView from '../components/CalendarView'
import './GalleryPage.css'

function Lightbox({ items, index, onClose, onPrev, onNext }) {
  const current = items[index]
  const isVideo = current?.media_type === 'video'
  const dateInfo = current ? formatDateDetails(current.date) : null

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext])

  if (!current) return null

  return (
    <motion.div
      className="lb"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <div className="lb__inner" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait">
          {isVideo ? (
            <motion.div
              key={current.id}
              className="lb__media-wrapper"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <video
                src={current.url}
                controls
                autoPlay
                playsInline
                className="lb__video"
              />
            </motion.div>
          ) : (
            <motion.img
              key={current.id}
              src={current.url}
              alt={current.title}
              className="lb__img"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>

        {/* Caption */}
        <div className="lb__caption">
          <div className="lb__caption-left">
            <div className="lb__caption-tags">
              <span className="lb__date-badge">📅 {dateInfo?.fullDate}</span>
              <span className="lb__category-badge">{current.category}</span>
              {current.location && <span className="lb__loc-badge">📍 {current.location}</span>}
            </div>
            <h3 className="lb__caption-title">{current.title}</h3>
            {current.caption && <p className="lb__caption-desc">{current.caption}</p>}
          </div>

          <div className="lb__caption-right">
            <a
              href={current.url}
              target="_blank"
              rel="noreferrer"
              className="lb__action-btn"
            >
              ↗ Open Media
            </a>
          </div>
        </div>
      </div>

      <button className="lb__close" onClick={onClose} aria-label="Close">
        ✕
      </button>
      <button
        className="lb__nav lb__nav--prev"
        onClick={(e) => {
          e.stopPropagation()
          onPrev()
        }}
        aria-label="Previous"
      >
        ‹
      </button>
      <button
        className="lb__nav lb__nav--next"
        onClick={(e) => {
          e.stopPropagation()
          onNext()
        }}
        aria-label="Next"
      >
        ›
      </button>
      <div className="lb__counter">
        {index + 1} / {items.length}
      </div>
    </motion.div>
  )
}

export default function GalleryPage() {
  const navigate = useNavigate()
  const [memories, setMemories] = useState([])
  const [selectedMonth, setSelectedMonth] = useState('All')
  const [selectedDate, setSelectedDate] = useState(null)
  const [showCalendar, setShowCalendar] = useState(false)
  const [selectedMediaType, setSelectedMediaType] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [lightboxIndex, setLightboxIndex] = useState(null)

  useEffect(() => {
    const loadMemories = () => setMemories(getStoredMemories())
    loadMemories()
    window.scrollTo({ top: 0, behavior: 'smooth' })

    window.addEventListener('bachpan-gallery-updated', loadMemories)
    window.addEventListener('storage', loadMemories)
    return () => {
      window.removeEventListener('bachpan-gallery-updated', loadMemories)
      window.removeEventListener('storage', loadMemories)
    }
  }, [])

  // Filter memories based on month, specific calendar date, media type, search
  const filteredMemories = useMemo(() => {
    return memories.filter((item) => {
      // 1. Specific calendar date filter
      if (selectedDate) {
        if (item.date !== selectedDate) return false
      } else if (selectedMonth !== 'All') {
        // 2. Month filter
        const itemMonthKey = item.date.substring(0, 7)
        if (itemMonthKey !== selectedMonth) return false
      }

      // 3. Media type filter
      if (selectedMediaType === 'Photos' && item.media_type === 'video') return false
      if (selectedMediaType === 'Videos' && item.media_type !== 'video') return false

      // 4. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchTitle = item.title?.toLowerCase().includes(q)
        const matchCaption = item.caption?.toLowerCase().includes(q)
        const matchCat = item.category?.toLowerCase().includes(q)
        if (!matchTitle && !matchCaption && !matchCat) return false
      }

      return true
    })
  }, [memories, selectedDate, selectedMonth, selectedMediaType, searchQuery])

  // Group filtered memories by Month
  const groupedMonths = useMemo(() => {
    return groupMemoriesByMonth(filteredMemories)
  }, [filteredMemories])

  // All distinct month options
  const allMonths = useMemo(() => {
    return groupMemoriesByMonth(memories)
  }, [memories])

  // Counts
  const counts = useMemo(() => {
    const photos = memories.filter((i) => i.media_type !== 'video').length
    const videos = memories.filter((i) => i.media_type === 'video').length
    return { all: memories.length, photos, videos }
  }, [memories])

  // Lightbox handlers
  const openLightbox = (item) => {
    const idx = filteredMemories.findIndex((i) => i.id === item.id)
    if (idx !== -1) setLightboxIndex(idx)
  }

  const closeLightbox = () => setLightboxIndex(null)

  const prevLightbox = () => {
    setLightboxIndex((prev) => (prev - 1 + filteredMemories.length) % filteredMemories.length)
  }

  const nextLightbox = () => {
    setLightboxIndex((prev) => (prev + 1) % filteredMemories.length)
  }

  const handleDateSelect = (dateStr) => {
    setSelectedDate(dateStr)
    if (dateStr) {
      setSelectedMonth('All')
    }
  }

  return (
    <div className="bp-gallery-page">
      {/* Official Wonder Roots Site Navbar */}
      <Navbar scrolled={true} />

      <main className="bp-gallery-main">
        {/* Header Hero */}
        <section className="bp-gallery-hero">
          <div className="container">
            <motion.div
              className="bp-gallery-hero__header"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="section-badge">📸 Life at Wonder Roots</span>
              <h1 className="section-title">
                Moments of <span>Joy & Growth</span>
              </h1>
              <p className="section-subtitle">
                Every day is a new adventure. Explore photos and video highlights chronologically
                organized by month and event dates.
              </p>
            </motion.div>

            {/* Filter & Calendar Controls */}
            <div className="bp-controls-card">
              {/* Row 1: Month Tabs + Calendar Button */}
              <div className="bp-controls-row">
                <div className="bp-month-pills">
                  <button
                    className={`bp-pill ${selectedMonth === 'All' && !selectedDate ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedMonth('All')
                      setSelectedDate(null)
                    }}
                  >
                    All Months <span className="bp-pill-badge">{counts.all}</span>
                  </button>

                  {allMonths.map((m) => (
                    <button
                      key={m.monthKey}
                      className={`bp-pill ${selectedMonth === m.monthKey && !selectedDate ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedMonth(m.monthKey)
                        setSelectedDate(null)
                      }}
                    >
                      {m.monthLabel} <span className="bp-pill-badge">{m.items.length}</span>
                    </button>
                  ))}
                </div>

                {/* Calendar Trigger */}
                <div className="bp-cal-wrapper">
                  <button
                    type="button"
                    className={`bp-cal-trigger ${showCalendar || selectedDate ? 'active' : ''}`}
                    onClick={() => setShowCalendar(!showCalendar)}
                  >
                    <span className="bp-cal-icon">📅</span>
                    <span>{selectedDate ? `Date: ${selectedDate}` : 'Calendar Filter'}</span>
                    <span className="bp-cal-arrow">{showCalendar ? '▲' : '▼'}</span>
                  </button>

                  {/* Calendar Popover */}
                  {showCalendar && (
                    <div className="bp-cal-dropdown">
                      <CalendarView
                        memories={memories}
                        selectedDate={selectedDate}
                        onSelectDate={(d) => {
                          handleDateSelect(d)
                          setShowCalendar(false)
                        }}
                        onClose={() => setShowCalendar(false)}
                      />
                    </div>
                  )}
                </div>

                {/* Direct Admin Portal Trigger */}
                <button
                  type="button"
                  className="bp-admin-portal-btn"
                  onClick={() => navigate('/admin')}
                  title="Open Admin Portal to add/edit photos or view form leads"
                >
                  <span className="bp-admin-portal-icon">⚡</span>
                  <span>Admin Portal</span>
                </button>
              </div>

              {/* Active Date Banner */}
              {selectedDate && (
                <div className="bp-active-date">
                  <div className="bp-active-date__text">
                    <span>📅 Filtered by Date: <strong>{formatDateDetails(selectedDate).fullDate}</strong></span>
                    <span className="bp-active-date__count">({filteredMemories.length} item{filteredMemories.length === 1 ? '' : 's'})</span>
                  </div>
                  <button
                    type="button"
                    className="bp-active-date__clear"
                    onClick={() => setSelectedDate(null)}
                  >
                    ✕ Clear Date
                  </button>
                </div>
              )}

              {/* Row 2: Sub-filters (Media type & search) */}
              <div className="bp-sub-row">
                <div className="bp-type-pills">
                  <button
                    className={`bp-type-btn ${selectedMediaType === 'All' ? 'active' : ''}`}
                    onClick={() => setSelectedMediaType('All')}
                  >
                    All Media ({counts.all})
                  </button>
                  <button
                    className={`bp-type-btn ${selectedMediaType === 'Photos' ? 'active' : ''}`}
                    onClick={() => setSelectedMediaType('Photos')}
                  >
                    📷 Photos ({counts.photos})
                  </button>
                  <button
                    className={`bp-type-btn ${selectedMediaType === 'Videos' ? 'active' : ''}`}
                    onClick={() => setSelectedMediaType('Videos')}
                  >
                    🎬 Videos ({counts.videos})
                  </button>
                </div>

                <div className="bp-search-wrap">
                  <span className="bp-search-ico">🔍</span>
                  <input
                    type="text"
                    placeholder="Search by activity, festival, learning topic..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bp-search-input"
                  />
                  {searchQuery && (
                    <button
                      className="bp-search-clear"
                      onClick={() => setSearchQuery('')}
                      aria-label="Clear search"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Feed */}
        <section className="container bp-timeline-feed">
          {groupedMonths.length === 0 ? (
            <div className="bp-empty">
              <div className="bp-empty__icon">🎨</div>
              <h3>No moments found</h3>
              <p>No photos or videos match your selected date, month, or search keywords.</p>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setSelectedMonth('All')
                  setSelectedDate(null)
                  setSelectedMediaType('All')
                  setSearchQuery('')
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            groupedMonths.map((group) => (
              <div key={group.monthKey} className="bp-month-block">
                {/* Month Heading */}
                <div className="bp-month-bar">
                  <div className="bp-month-tag">
                    <span className="bp-month-tag__icon">📅</span>
                    <h2 className="bp-month-tag__title">{group.monthLabel}</h2>
                    <span className="bp-month-tag__count">
                      {group.items.length} {group.items.length === 1 ? 'Memory' : 'Memories'}
                    </span>
                  </div>
                  <div className="bp-month-line" />
                </div>

                {/* Entry Cards */}
                <div className="bp-cards-list">
                  {group.items.map((item) => {
                    const dateInfo = formatDateDetails(item.date)
                    const isVideo = item.media_type === 'video'

                    return (
                      <article key={item.id} className="bp-memory-card">
                        {/* Date Column */}
                        <div className="bp-card-date">
                          <div className="bp-date-stamp">
                            <span className="bp-date-stamp__day">{dateInfo.dayNumber}</span>
                            <span className="bp-date-stamp__month">{dateInfo.monthShort}</span>
                            <span className="bp-date-stamp__weekday">{dateInfo.weekday}</span>
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="bp-card-body">
                          {/* Media Container */}
                          <div
                            className="bp-card-media"
                            onClick={() => openLightbox(item)}
                            title="Click to view full size"
                          >
                            {isVideo ? (
                              <div className="bp-media-video-wrap">
                                <video
                                  src={item.url}
                                  preload="metadata"
                                  muted
                                  playsInline
                                  className="bp-media-el"
                                />
                                <div className="bp-play-circle">
                                  <span>▶</span>
                                </div>
                                <span className="bp-media-badge bp-media-badge--video">
                                  🎬 Video Memory
                                </span>
                              </div>
                            ) : (
                              <div className="bp-media-img-wrap">
                                <img
                                  src={item.url}
                                  alt={item.title}
                                  loading="lazy"
                                  className="bp-media-el"
                                />
                                <span className="bp-media-badge">📷 Photo</span>
                              </div>
                            )}

                            <div className="bp-media-overlay-hint">
                              <span>🔍 View Full</span>
                            </div>
                          </div>

                          {/* Info Section */}
                          <div className="bp-card-info">
                            <div className="bp-card-meta">
                              <span className="bp-cat-badge">{item.category}</span>
                              {item.location && (
                                <span className="bp-loc-text">📍 {item.location}</span>
                              )}
                            </div>

                            <h3
                              className="bp-card-title"
                              onClick={() => openLightbox(item)}
                            >
                              {item.title}
                            </h3>

                            <p className="bp-card-caption">{item.caption}</p>

                            <div className="bp-card-footer">
                              <button
                                type="button"
                                className="bp-view-link"
                                onClick={() => openLightbox(item)}
                              >
                                {isVideo ? 'Watch Video Highlights →' : 'View Full Photo →'}
                              </button>
                              <span className="bp-date-text">{dateInfo.fullDate}</span>
                            </div>
                          </div>
                        </div>
                      </article>
                    )
                  })}
                </div>
              </div>
            ))
          )}
        </section>
      </main>

      {/* Official Wonder Roots Site Footer */}
      <Footer />

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={filteredMemories}
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevLightbox}
            onNext={nextLightbox}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

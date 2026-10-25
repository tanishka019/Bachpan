import { useState, useMemo } from 'react'
import './CalendarView.css'

export default function CalendarView({ memories, selectedDate, onSelectDate, onClose }) {
  // Initial calendar view set to latest memory date or current date
  const [currentViewDate, setCurrentViewDate] = useState(() => {
    if (selectedDate) return new Date(selectedDate)
    if (memories && memories.length > 0) return new Date(memories[0].date)
    return new Date()
  })

  const year = currentViewDate.getFullYear()
  const month = currentViewDate.getMonth()

  // Map of dates to memories count
  const memoriesByDate = useMemo(() => {
    const map = new Map()
    memories.forEach((item) => {
      if (!item.date) return
      const count = map.get(item.date) || 0
      map.set(item.date, count + 1)
    })
    return map
  }, [memories])

  // Calendar days calculation
  const calendarDays = useMemo(() => {
    const firstDayIndex = new Date(year, month, 1).getDay() // 0 = Sun
    const totalDays = new Date(year, month + 1, 0).getDate()

    const days = []
    // Leading blanks
    for (let i = 0; i < firstDayIndex; i++) {
      days.push({ dayNumber: null })
    }
    // Month days
    for (let d = 1; d <= totalDays; d++) {
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
      const hasMemories = memoriesByDate.has(dateString)
      const count = memoriesByDate.get(dateString) || 0
      days.push({
        dayNumber: d,
        dateString,
        hasMemories,
        count,
        isSelected: selectedDate === dateString,
      })
    }
    return days
  }, [year, month, memoriesByDate, selectedDate])

  const monthLabel = currentViewDate.toLocaleString('en-US', { month: 'long', year: 'numeric' })

  const handlePrevMonth = () => {
    setCurrentViewDate(new Date(year, month - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentViewDate(new Date(year, month + 1, 1))
  }

  const handleDayClick = (day) => {
    if (!day.dateString) return
    if (selectedDate === day.dateString) {
      onSelectDate(null) // deselect
    } else {
      onSelectDate(day.dateString)
    }
  }

  return (
    <div className="cal-popover">
      <div className="cal-header">
        <div className="cal-title-wrap">
          <span className="cal-icon">📅</span>
          <span className="cal-month-title">{monthLabel}</span>
        </div>

        <div className="cal-nav-buttons">
          <button
            type="button"
            className="cal-nav-btn"
            onClick={handlePrevMonth}
            aria-label="Previous Month"
          >
            ‹
          </button>
          <button
            type="button"
            className="cal-nav-btn"
            onClick={handleNextMonth}
            aria-label="Next Month"
          >
            ›
          </button>
          {onClose && (
            <button
              type="button"
              className="cal-close-btn"
              onClick={onClose}
              aria-label="Close Calendar"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="cal-weekdays">
        <span>Su</span>
        <span>Mo</span>
        <span>Tu</span>
        <span>We</span>
        <span>Th</span>
        <span>Fr</span>
        <span>Sa</span>
      </div>

      <div className="cal-grid">
        {calendarDays.map((day, idx) => {
          if (!day.dayNumber) {
            return <div key={`blank-${idx}`} className="cal-cell cal-cell--blank" />
          }

          return (
            <button
              key={day.dateString}
              type="button"
              className={`cal-cell cal-cell--day ${day.hasMemories ? 'cal-cell--has-media' : ''} ${
                day.isSelected ? 'cal-cell--selected' : ''
              }`}
              onClick={() => handleDayClick(day)}
              title={
                day.hasMemories
                  ? `${day.count} moment${day.count > 1 ? 's' : ''} on ${day.dateString}`
                  : day.dateString
              }
            >
              <span className="cal-day-num">{day.dayNumber}</span>
              {day.hasMemories && (
                <span className="cal-dot-badge" />
              )}
            </button>
          )
        })}
      </div>

      <div className="cal-footer">
        <div className="cal-legend">
          <span className="cal-legend-dot" />
          <span>Has Photos/Videos</span>
        </div>

        {selectedDate && (
          <button
            type="button"
            className="cal-clear-btn"
            onClick={() => onSelectDate(null)}
          >
            Clear Date Filter
          </button>
        )}
      </div>
    </div>
  )
}

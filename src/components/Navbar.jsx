import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import './Navbar.css'

const navLinks = [
  { label: 'Home',             href: '#home',             route: '/' },
  { label: 'Programs',         href: '#programs',         route: null },
  { label: 'Why Wonder Roots', href: '#why-wonder-roots', route: null },
  { label: 'Our Approach',     href: '#approach',         route: null },
  { label: 'Gallery',          href: null,                route: '/gallery' },
  { label: 'Contact',          href: '#contact',          route: null },
  { label: 'Admin',            href: null,                route: '/admin' },
]

export default function Navbar({ scrolled }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('#home')

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    if (location.pathname === '/gallery') {
      setActiveLink('/gallery')
    } else if (location.hash) {
      setActiveLink(location.hash)
      setTimeout(() => {
        const el = document.querySelector(location.hash)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else if (location.pathname === '/') {
      setActiveLink('#home')
    }
  }, [location.pathname, location.hash])

  const handleNav = (link) => {
    setMenuOpen(false)
    if (link.route && !link.href) {
      navigate(link.route)
      return
    }

    if (link.route === '/' && (!link.href || link.href === '#home')) {
      if (location.pathname !== '/') {
        navigate('/')
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      setActiveLink('#home')
      return
    }

    if (link.href) {
      if (location.pathname !== '/') {
        navigate('/' + link.href)
        return
      }
      setActiveLink(link.href)
      const el = document.querySelector(link.href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleEnrollClick = (e) => {
    e.preventDefault()
    setMenuOpen(false)
    window.dispatchEvent(new CustomEvent('bachpan-open-enroll', { detail: { program: 'Playgroup' } }))
  }

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        {/* Logo */}
        <a className="navbar__logo" onClick={() => handleNav({ href: '#home', route: null })} href="#home">
          <div className="navbar__logo-icon">
            <span>🌟</span>
          </div>
          <div className="navbar__logo-text">
            <span className="navbar__brand">Wonder Roots</span>
            <span className="navbar__tagline">The Foundation Stage</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="navbar__links" aria-label="Main navigation">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.route || link.href || '#'}
              className={`navbar__link ${(activeLink === link.href || (link.route && activeLink === link.route)) ? 'navbar__link--active' : ''}`}
              onClick={(e) => { e.preventDefault(); handleNav(link) }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#contact"
          className="btn btn-primary navbar__cta"
          onClick={handleEnrollClick}
        >
          Enroll Now
        </a>

        {/* Hamburger */}
        <button
          className={`navbar__hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="navbar__overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="navbar__drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            >
              <div className="navbar__drawer-header">
                <div className="navbar__logo">
                  <div className="navbar__logo-icon"><span>🌟</span></div>
                  <div className="navbar__logo-text">
                    <span className="navbar__brand">Wonder Roots</span>
                    <span className="navbar__tagline">The Foundation Stage</span>
                  </div>
                </div>
                <button className="navbar__drawer-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
              </div>
              <nav className="navbar__drawer-links">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.route || link.href || '#'}
                    className={`navbar__drawer-link ${(activeLink === link.href || (link.route && activeLink === link.route)) ? 'navbar__drawer-link--active' : ''}`}
                    onClick={(e) => { e.preventDefault(); handleNav(link) }}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.a
                  href="#contact"
                  className="btn btn-primary"
                  style={{ marginTop: '24px', justifyContent: 'center' }}
                  onClick={handleEnrollClick}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Enroll Now 🎒
                </motion.a>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}

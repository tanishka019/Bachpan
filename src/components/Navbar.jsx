import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Navbar.css'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Programs', href: '#programs' },
  { label: 'Why Bachpan', href: '#why-bachpan' },
  { label: 'Our Approach', href: '#approach' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar({ scrolled }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('#home')

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNav = (href) => {
    setActiveLink(href)
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        {/* Logo */}
        <a className="navbar__logo" onClick={() => handleNav('#home')} href="#home">
          <div className="navbar__logo-icon">
            <span>🌟</span>
          </div>
          <div className="navbar__logo-text">
            <span className="navbar__brand">Bachpan</span>
            <span className="navbar__tagline">The Foundation Stage</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="navbar__links" aria-label="Main navigation">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={`navbar__link ${activeLink === link.href ? 'navbar__link--active' : ''}`}
              onClick={(e) => { e.preventDefault(); handleNav(link.href) }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#contact"
          className="btn btn-primary navbar__cta"
          onClick={(e) => { e.preventDefault(); handleNav('#contact') }}
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
                    <span className="navbar__brand">Bachpan</span>
                    <span className="navbar__tagline">The Foundation Stage</span>
                  </div>
                </div>
                <button className="navbar__drawer-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
              </div>
              <nav className="navbar__drawer-links">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className="navbar__drawer-link"
                    onClick={(e) => { e.preventDefault(); handleNav(link.href) }}
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
                  onClick={(e) => { e.preventDefault(); handleNav('#contact') }}
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

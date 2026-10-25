import './Footer.css'

const footerLinks = {
  Programs: ['Playgroup', 'Nursery', 'LKG', 'UKG', 'Summer Camp'],
  Company: ['About Us', 'Our Team', 'Careers', 'Press & Media', 'Blog'],
  Support: ['Admissions FAQ', 'Fee Structure', 'Scholarship', 'Contact Us', 'Feedback'],
}

const socials = [
  { icon: '📘', label: 'Facebook', href: '#' },
  { icon: '📸', label: 'Instagram', href: '#' },
  { icon: '🐦', label: 'Twitter', href: '#' },
  { icon: '▶️', label: 'YouTube', href: '#' },
]

export default function Footer() {
  const scrollTo = (id) => {
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      {/* Top CTA Banner */}
      <div className="footer__banner">
        <div className="container footer__banner-inner">
          <div className="footer__banner-text">
            <h3>Ready to Begin?</h3>
            <p>Join thousands of families who've given their children the Bachpan advantage.</p>
          </div>
          <div className="footer__banner-actions">
            <button className="btn btn-white" onClick={() => scrollTo('#contact')}>
              Enroll Now →
            </button>
            <button className="btn btn-outline-white" onClick={() => scrollTo('#contact')}>
              Book a Visit
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer__main">
        <div className="container footer__grid">
          {/* Brand Column */}
          <div className="footer__brand">
            <div className="footer__logo">
              <div className="footer__logo-icon">🌟</div>
              <div>
                <div className="footer__logo-name">Bachpan</div>
                <div className="footer__logo-sub">The Foundation Stage</div>
              </div>
            </div>
            <p className="footer__tagline">
              Nurturing India's brightest young minds with love, creativity, and world-class early education since 2010.
            </p>

            {/* Social Links */}
            <div className="footer__socials">
              {socials.map(s => (
                <a key={s.label} href={s.href} className="footer__social" aria-label={s.label} title={s.label}>
                  <span>{s.icon}</span>
                </a>
              ))}
            </div>

            {/* Certifications */}
            <div className="footer__certs">
              <span className="footer__cert">🏆 ISO Certified</span>
              <span className="footer__cert">✅ NCPCR Approved</span>
              <span className="footer__cert">🎓 Award Winning</span>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="footer__col">
              <h4 className="footer__col-title">{title}</h4>
              <ul className="footer__col-links">
                {links.map(link => (
                  <li key={link}>
                    <a href="#" className="footer__link">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="footer__newsletter">
            <h4 className="footer__col-title">Stay Updated</h4>
            <p>Get parenting tips, curriculum news, and event updates in your inbox.</p>
            <div className="footer__newsletter-form">
              <input type="email" placeholder="your@email.com" aria-label="Email for newsletter" />
              <button className="footer__newsletter-btn" aria-label="Subscribe">→</button>
            </div>
            <p className="footer__newsletter-note">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© 2024 Bachpan The Foundation Stage. All rights reserved.</p>
          <div className="footer__bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="/gallery">Photo & Video Journal</a>
            <a href="/admin">Admin Portal (Demo)</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

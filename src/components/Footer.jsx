import './Footer.css'

const footerLinks = {
  Programs: ['Playgroup', 'Nursery', 'Junior KG', 'Summer Camp'],
  Company: ['About Us', 'Our Team', 'Careers', 'Press & Media', 'Blog'],
  Support: ['Admissions FAQ', 'Fee Structure', 'Scholarship', 'Contact Us', 'Feedback'],
}

const socials = [
  { icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>, label: 'Facebook', href: '#' },
  { icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>, label: 'Instagram', href: '#' },
  { icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>, label: 'Twitter', href: '#' },
  { icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><path d="m10 15 5-3-5-3v6Z" /></svg>, label: 'YouTube', href: '#' },
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
            <p>Join thousands of families who've given their children the Nirankur advantage.</p>
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
              <img src="/logo.png" alt="Nirankur Logo" className="footer__logo-img" />
              <div>
                <div className="footer__logo-name brand-rainbow" style={{ fontSize: '1.45rem' }}>
                  <span className="c-n1">N</span>
                  <span className="c-i">i</span>
                  <span className="c-r1">r</span>
                  <span className="c-a">a</span>
                  <span className="c-n2">n</span>
                  <span className="c-k">k</span>
                  <span className="c-u">u</span>
                  <span className="c-r2">r</span>
                </div>
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
              <span className="footer__cert">ISO Certified</span>
              <span className="footer__cert">NCPCR Approved</span>
              <span className="footer__cert">Award Winning</span>
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
          <p>© 2024 Nirankur The Foundation Stage. All rights reserved.</p>
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

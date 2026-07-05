import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Programs from './components/Programs'
import WhyBachpan from './components/WhyBachpan'
import Approach from './components/Approach'
import Gallery from './components/Gallery'
import Testimonials from './components/Testimonials'
import FindCenter from './components/FindCenter'
import Footer from './components/Footer'

function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <Navbar scrolled={scrolled} />
      <main>
        <Hero />
        <Stats />
        <Programs />
        <WhyBachpan />
        <Approach />
        <Gallery />
        <Testimonials />
        <FindCenter />
      </main>
      <Footer />
    </>
  )
}

export default App

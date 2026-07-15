import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Programs from './components/Programs'
import WhyBachpan from './components/WhyBachpan'
import Approach from './components/Approach'
import GalleryTeaser from './components/GalleryTeaser'
import Testimonials from './components/Testimonials'
import FindCenter from './components/FindCenter'
import Footer from './components/Footer'
import GalleryPage from './pages/GalleryPage'

function HomePage() {
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
        <GalleryTeaser />
        <Testimonials />
        <FindCenter />
      </main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gallery" element={<GalleryPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

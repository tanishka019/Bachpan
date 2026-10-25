import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Programs from './components/Programs'
import WhyWonderRoots from './components/WhyBachpan'
import Approach from './components/Approach'
import GalleryTeaser from './components/GalleryTeaser'
import Testimonials from './components/Testimonials'
import FindCenter from './components/FindCenter'
import Footer from './components/Footer'
import GalleryPage from './pages/GalleryPage'
import AdminPage from './pages/AdminPage'
import EnrollModal from './components/EnrollModal'

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
        <WhyWonderRoots />
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
  const [enrollOpen, setEnrollOpen] = useState(false)
  const [enrollProgram, setEnrollProgram] = useState('Playgroup')

  useEffect(() => {
    const handleOpen = (e) => {
      if (e.detail?.program) setEnrollProgram(e.detail.program)
      setEnrollOpen(true)
    }
    window.addEventListener('bachpan-open-enroll', handleOpen)
    return () => window.removeEventListener('bachpan-open-enroll', handleOpen)
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
      <EnrollModal
        isOpen={enrollOpen}
        onClose={() => setEnrollOpen(false)}
        initialProgram={enrollProgram}
      />
    </BrowserRouter>
  )
}

export default App

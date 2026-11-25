// ====================================================================
// HERO SLIDER DATA STORE
// Manages the 3 main background images and captions on the Home Hero section.
// Persists in localStorage and synchronizes in real time.
// ====================================================================

export const DEFAULT_HERO_SLIDES = [
  {
    id: 1,
    heading: 'Where Little Seeds',
    headingAccent: 'Grow & Flourish',
    sub: 'At Nirankur, every child is a tender sprout nurtured with patient love, joyful soil, and warm sunshine at The Foundation Stage.',
    cta1: 'Discover Our Story',
    cta2: 'The 3 Growth Stages',
    cta1Href: '#why-nirankur',
    cta2Href: '#programs',
    color: 'slide-amber',
    bgImage: '/hero-1.jpg',
    photoLabel: 'Campus Moments',
  },
  {
    id: 2,
    heading: 'Nurturing Bright Minds',
    headingAccent: 'With Love & Sunshine',
    sub: 'From curious first steps in Playgroup to blooming confidence in Junior KG, we provide deep roots before wings.',
    cta1: 'The 3 Growth Stages',
    cta2: 'Enroll for 2025–26',
    cta1Href: '#programs',
    cta2Href: '#contact',
    color: 'slide-teal',
    bgImage: '/hero-2.jpg',
    photoLabel: 'Classroom Discovery',
  },
  {
    id: 3,
    heading: 'The Foundation Stage',
    headingAccent: 'Built for Life',
    sub: 'Play-based early learning guided by certified educators, fostering imagination, empathy, and brave curious questions.',
    cta1: 'Our Story & Philosophy',
    cta2: 'Schedule a Visit',
    cta1Href: '#why-nirankur',
    cta2Href: '#contact',
    color: 'slide-coral',
    bgImage: '/hero-1.jpeg',
    photoLabel: 'Happy Explorers',
  },
]

const STORAGE_KEY = 'nirankur_hero_slides_v5'

export function getStoredHeroSlides() {
  if (typeof window === 'undefined') return DEFAULT_HERO_SLIDES
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length === 3) {
        return parsed
      }
    }
  } catch (err) {
    console.warn('Error reading hero slides from localStorage:', err)
  }
  return DEFAULT_HERO_SLIDES
}

export function saveHeroSlides(slides) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(slides))
    window.dispatchEvent(new Event('bachpan-hero-updated'))
  } catch (err) {
    console.error('Error saving hero slides:', err)
  }
}

export function updateHeroSlide(slideIndex, updatedFields) {
  const current = getStoredHeroSlides()
  const updated = current.map((s, idx) => {
    if (idx === slideIndex) {
      return { ...s, ...updatedFields }
    }
    return s
  })
  saveHeroSlides(updated)
  return updated
}

export function resetHeroSlides() {
  saveHeroSlides(DEFAULT_HERO_SLIDES)
  return DEFAULT_HERO_SLIDES
}

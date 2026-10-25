// ====================================================================
// HERO SLIDER DATA STORE
// Manages the 3 main background images and captions on the Home Hero section.
// Persists in localStorage and synchronizes in real time.
// ====================================================================

export const DEFAULT_HERO_SLIDES = [
  {
    id: 1,
    badge: '🎨 Play-Based Learning',
    heading: 'Where Little Dreams',
    headingAccent: 'Take Flight',
    sub: 'A nurturing space where curiosity blooms, friendships grow, and every child discovers the joy of learning through play.',
    cta1: 'Explore Programs',
    cta2: 'Book a Visit',
    cta1Href: '#programs',
    cta2Href: '#contact',
    emoji1: '🦋',
    emoji2: '🌸',
    emoji3: '⭐',
    emoji4: '🎈',
    color: 'slide-purple',
    bgImage: '/hero-1.jpg',
    photoLabel: 'Happy Father\'s Day Celebration',
  },
  {
    id: 2,
    badge: '🌱 Holistic Development',
    heading: 'Nurturing Bright Minds',
    headingAccent: 'Every Day',
    sub: 'Our expert educators craft experiences that develop emotional intelligence, creativity, and a lifelong love for learning.',
    cta1: 'Why Bachpan',
    cta2: 'Enroll Today',
    cta1Href: '#why-bachpan',
    cta2Href: '#contact',
    emoji1: '🦄',
    emoji2: '🌈',
    emoji3: '💡',
    emoji4: '🎯',
    color: 'slide-teal',
    bgImage: '/hero-2.jpg',
    photoLabel: 'Fun Learning Activities',
  },
  {
    id: 3,
    badge: '🏆 Award-Winning Curriculum',
    heading: 'Building Foundations',
    headingAccent: 'That Last a Lifetime',
    sub: 'From playgroup to UKG, our structured yet fun curriculum sets children up for success in school and beyond.',
    cta1: 'Our Curriculum',
    cta2: 'Find a Center',
    cta1Href: '#approach',
    cta2Href: '#contact',
    emoji1: '🎓',
    emoji2: '📚',
    emoji3: '🚀',
    emoji4: '🌟',
    color: 'slide-coral',
    bgImage: '/hero-3.jpg',
    photoLabel: 'Green Day Celebration',
  },
]

const STORAGE_KEY = 'bachpan_hero_slides_v1'

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

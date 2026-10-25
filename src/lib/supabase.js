import { createClient } from '@supabase/supabase-js'

// Fallback seed items shown when Supabase is not yet configured or table is empty
export const DEFAULT_GALLERY_ITEMS = [
  {
    id: 'seed-1',
    title: "Father's Day Celebration",
    description: 'Precious moments celebrated with loving dads at Bachpan campus with games and handmade cards.',
    media_type: 'image',
    url: '/hero-1.jpg',
    category: 'Events & Celebrations',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(),
  },
  {
    id: 'seed-2',
    title: 'Creative Clay & Painting Hour',
    description: 'Little hands sculpting imagination and exploring colors in our vibrant activity studio.',
    media_type: 'image',
    url: '/hero-2.jpg',
    category: 'Art & Craft',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
  {
    id: 'seed-3',
    title: 'Kindergarten Dance Routine',
    description: 'Joyful smiles, rhythm, clapping and dance practice for the annual day showcase.',
    media_type: 'video',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    category: 'Events & Celebrations',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
  },
  {
    id: 'seed-4',
    title: 'Green Day Plantation Drive',
    description: 'Children learning to nurture plant saplings and appreciating nature in our outdoor garden.',
    media_type: 'image',
    url: '/hero-3.jpg',
    category: 'Outdoor & Nature',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
  {
    id: 'seed-5',
    title: 'Early Numeracy & Block Puzzles',
    description: 'Interactive STEM learning through geometric wooden blocks and Montessori puzzles.',
    media_type: 'image',
    url: '/hero-2.jpg',
    category: 'Classroom & Learning',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: 'seed-6',
    title: 'Music & Rhymes Interactive Session',
    description: 'Singing phonics and nursery rhymes with teacher gestures and percussion instruments.',
    media_type: 'video',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    category: 'Classroom & Learning',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1.5).toISOString(),
  },
  {
    id: 'seed-7',
    title: 'Annual Sports Day Sprint',
    description: 'Cheering our young champions as they dash across the mini hurdle tracks!',
    media_type: 'image',
    url: '/hero-1.jpg',
    category: 'Sports & Outdoor',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: 'seed-8',
    title: 'Young Explorers Science Discovery',
    description: 'Observing magnetic forces, magnifying glasses, and water reflections in the discovery lab.',
    media_type: 'image',
    url: '/hero-3.jpg',
    category: 'Classroom & Learning',
    created_at: new Date().toISOString(),
  },
]

export const BUCKET_NAME = import.meta.env.VITE_SUPABASE_BUCKET || 'gallery-media'

export function getSupabaseCredentials() {
  const envUrl = import.meta.env.VITE_SUPABASE_URL
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY

  const localUrl = typeof window !== 'undefined' ? localStorage.getItem('bachpan_supabase_url') : null
  const localKey = typeof window !== 'undefined' ? localStorage.getItem('bachpan_supabase_anon_key') : null

  const url = (localUrl || envUrl || '').trim()
  const key = (localKey || envKey || '').trim()

  return { url, key }
}

export function isSupabaseConfigured() {
  const { url, key } = getSupabaseCredentials()
  if (!url || !key) return false
  if (url.includes('your-project-id') || key.includes('your-anon-public-key')) return false
  return url.startsWith('http://') || url.startsWith('https://')
}

let supabaseInstance = null
let lastUrl = null
let lastKey = null

export function getSupabase() {
  const { url, key } = getSupabaseCredentials()
  if (!isSupabaseConfigured()) {
    return null
  }
  if (!supabaseInstance || lastUrl !== url || lastKey !== key) {
    supabaseInstance = createClient(url, key)
    lastUrl = url
    lastKey = key
  }
  return supabaseInstance
}

// Fetch all gallery items from Supabase
export async function fetchGalleryItems() {
  const supabase = getSupabase()
  if (!supabase) {
    return {
      data: DEFAULT_GALLERY_ITEMS,
      isConfigured: false,
      error: null,
    }
  }

  try {
    const { data, error } = await supabase
      .from('gallery_items')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.warn('Supabase fetch query error:', error)
      return {
        data: DEFAULT_GALLERY_ITEMS,
        isConfigured: true,
        error: error.message || 'Could not fetch items from Supabase',
      }
    }

    if (!data || data.length === 0) {
      return {
        data: DEFAULT_GALLERY_ITEMS,
        isConfigured: true,
        isDefaultFallback: true,
        error: null,
      }
    }

    return {
      data,
      isConfigured: true,
      error: null,
    }
  } catch (err) {
    console.error('Supabase fetch unexpected error:', err)
    return {
      data: DEFAULT_GALLERY_ITEMS,
      isConfigured: true,
      error: err.message || 'Network error connecting to Supabase',
    }
  }
}

// Upload photo or video to Supabase Storage and insert row in `gallery_items`
export async function uploadMediaItem({ file, title, description, category }) {
  const supabase = getSupabase()
  if (!supabase) {
    throw new Error(
      'Supabase is not configured yet. Please configure your project URL & Anon Key in .env or via the Database Settings dialog.'
    )
  }

  if (!file) {
    throw new Error('Please select a photo or video file.')
  }

  // Determine media type
  const isVideo = file.type.startsWith('video/')
  const isImage = file.type.startsWith('image/')

  if (!isVideo && !isImage) {
    throw new Error('Unsupported file format. Please upload an image (JPG, PNG, WebP) or video (MP4, WebM, MOV).')
  }

  // Size limit checks
  const maxImageSize = 25 * 1024 * 1024 // 25 MB
  const maxVideoSize = 100 * 1024 * 1024 // 100 MB

  if (isImage && file.size > maxImageSize) {
    throw new Error('Image size exceeds 25 MB limit. Please choose a smaller photo.')
  }
  if (isVideo && file.size > maxVideoSize) {
    throw new Error('Video size exceeds 100 MB limit. Please compress or choose a shorter video clip.')
  }

  // Generate safe unique filename
  const cleanBaseName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
  const timestamp = Date.now()
  const randomStr = Math.random().toString(36).substring(2, 7)
  const storagePath = `media/${timestamp}_${randomStr}_${cleanBaseName}`

  // 1. Upload to Supabase Storage
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(storagePath, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type,
    })

  if (uploadError) {
    // Helpful message for missing bucket or permission error
    if (uploadError.message?.toLowerCase().includes('bucket not found')) {
      throw new Error(
        `Storage bucket "${BUCKET_NAME}" was not found. Please run the supabase_setup.sql script in your Supabase SQL Editor.`
      )
    }
    throw new Error(`Upload failed: ${uploadError.message}`)
  }

  // 2. Get Public URL
  const { data: urlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(storagePath)

  const publicUrl = urlData?.publicUrl
  if (!publicUrl) {
    throw new Error('Failed to generate public URL for the uploaded media.')
  }

  // 3. Insert record into `gallery_items` table
  const newRecord = {
    title: (title || file.name.split('.')[0]).trim(),
    description: (description || '').trim(),
    category: category || 'General',
    media_type: isVideo ? 'video' : 'image',
    url: publicUrl,
    storage_path: storagePath,
    created_at: new Date().toISOString(),
  }

  const { data: insertedData, error: insertError } = await supabase
    .from('gallery_items')
    .insert([newRecord])
    .select()
    .single()

  if (insertError) {
    // If database insertion failed, try cleaning up the uploaded file
    try {
      await supabase.storage.from(BUCKET_NAME).remove([storagePath])
    } catch (_) {}
    throw new Error(`Failed to save record to database: ${insertError.message}`)
  }

  return insertedData || newRecord
}

// Delete media item from both storage and database
export async function deleteMediaItem(item) {
  const supabase = getSupabase()
  if (!supabase) {
    throw new Error('Supabase is not configured.')
  }

  // If item was stored in Supabase storage, remove the file
  if (item.storage_path) {
    try {
      await supabase.storage.from(BUCKET_NAME).remove([item.storage_path])
    } catch (err) {
      console.warn('Storage delete warning:', err)
    }
  }

  // Delete from `gallery_items` table
  const { error } = await supabase
    .from('gallery_items')
    .delete()
    .eq('id', item.id)

  if (error) {
    throw new Error(`Failed to delete record: ${error.message}`)
  }

  return true
}

// Admin PIN verification
const DEFAULT_PIN = '1234'

export function verifyAdminPin(pin) {
  const expectedPin = (import.meta.env.VITE_ADMIN_PIN || DEFAULT_PIN).toString().trim()
  return (pin || '').trim() === expectedPin
}

export function isAdminUnlocked() {
  if (typeof window === 'undefined') return false
  return sessionStorage.getItem('bachpan_admin_unlocked') === 'true'
}

export function setAdminUnlocked(unlocked) {
  if (typeof window === 'undefined') return
  if (unlocked) {
    sessionStorage.setItem('bachpan_admin_unlocked', 'true')
  } else {
    sessionStorage.removeItem('bachpan_admin_unlocked')
  }
}

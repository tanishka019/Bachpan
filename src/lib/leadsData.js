// ====================================================================
// WONDER ROOTS ADMISSIONS & CONTACT LEADS DATA STORE
// Manages inquiries from "Enroll Now" and "Contact Section" forms.
// Persists in localStorage with Supabase sync capability.
// ====================================================================

export const INITIAL_LEADS = [
  {
    id: 'lead-101',
    form_type: 'Enroll Now',
    parent_name: 'Pooja Sharma',
    child_name: 'Aarav Sharma',
    phone: '+91 98201 44521',
    email: 'pooja.sharma@gmail.com',
    city: 'Mumbai',
    child_age: '2-3 years',
    program: 'Playgroup',
    academic_session: '2026-2027',
    message: 'Interested in morning batch for Playgroup. Please share details regarding bus transport facility and teacher-student ratio.',
    status: 'New',
    admin_notes: 'Spoke briefly on phone. Sent WhatsApp brochure. Follow-up scheduled for Monday.',
    created_at: new Date(Date.now() - 1000 * 60 * 35).toISOString(), // 35 mins ago
  },
  {
    id: 'lead-102',
    form_type: 'Contact Section',
    parent_name: 'Rahul Verma',
    child_name: 'Ananya Verma',
    phone: '+91 98112 33412',
    email: 'rahul.v@outlook.com',
    city: 'Delhi',
    child_age: '3-4 years',
    program: 'Nursery',
    academic_session: '2026-2027',
    message: 'Looking for a campus visit this Saturday at 11:00 AM to see the outdoor activity area and smart classrooms.',
    status: 'Visit Scheduled',
    admin_notes: 'Visit confirmed for Saturday 11 AM with Head Teacher Ms. Sunita.',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
  },
  {
    id: 'lead-103',
    form_type: 'Enroll Now',
    parent_name: 'Sneha Patel',
    child_name: 'Kabir Patel',
    phone: '+91 97245 88910',
    email: 'sneha.patel@yahoo.com',
    city: 'Ahmedabad',
    child_age: '4-5 years',
    program: 'LKG',
    academic_session: '2026-2027',
    message: 'Relocating to Ahmedabad next month from Pune, seeking mid-term admission for LKG. Transfer certificate is ready.',
    status: 'Contacted',
    admin_notes: 'Counselor shared curriculum overview and fee structure. Waiting for transfer document verification.',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(), // 22 hours ago
  },
  {
    id: 'lead-104',
    form_type: 'Enroll Now',
    parent_name: 'Dr. Vikram Joshi',
    child_name: 'Myra Joshi',
    phone: '+91 98450 67123',
    email: 'vikram.joshi@apollo.org',
    city: 'Bangalore',
    child_age: '5-6 years',
    program: 'UKG',
    academic_session: '2026-2027',
    message: 'Admission confirmed. Uniform, student kit, and books collected. Child joining from next term.',
    status: 'Enrolled',
    admin_notes: 'Admission No: BP-BLR-2026-089. Welcome kit handed over. Orientation on 1st November.',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
  },
  {
    id: 'lead-105',
    form_type: 'Contact Section',
    parent_name: 'Anita Deshmukh',
    child_name: 'Reyansh Deshmukh',
    phone: '+91 98230 11984',
    email: 'anita.deshmukh@gmail.com',
    city: 'Pune',
    child_age: '1.5-2 years',
    program: 'Playgroup',
    academic_session: '2026-2027',
    message: 'Wanted fee structure and daycare timing details after preschool hours.',
    status: 'New',
    admin_notes: '',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 74).toISOString(), // 3 days ago
  },
]

const STORAGE_KEY = 'bachpan_admissions_leads_v1'

// Load all stored leads
export function getStoredLeads() {
  if (typeof window === 'undefined') return INITIAL_LEADS
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
      }
    }
  } catch (err) {
    console.warn('Error reading leads from localStorage:', err)
  }
  return INITIAL_LEADS
}

// Save leads to localStorage
export function saveLeads(leads) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads))
    window.dispatchEvent(new Event('bachpan-leads-updated'))
  } catch (err) {
    console.error('Error saving leads to localStorage:', err)
  }
}

// Add a newly submitted lead (from Enroll Now modal or Contact section)
export function addLead(newLeadData) {
  const current = getStoredLeads()
  const formatted = {
    id: newLeadData.id || `lead-${Date.now()}`,
    form_type: newLeadData.form_type || 'Enroll Now',
    parent_name: (newLeadData.parent_name || newLeadData.name || '').trim(),
    child_name: (newLeadData.child_name || '').trim(),
    phone: (newLeadData.phone || '').trim(),
    email: (newLeadData.email || '').trim(),
    city: (newLeadData.city || 'Not Specified').trim(),
    child_age: (newLeadData.child_age || '').trim(),
    program: (newLeadData.program || 'Playgroup').trim(),
    academic_session: newLeadData.academic_session || '2026-2027',
    message: (newLeadData.message || '').trim(),
    status: newLeadData.status || 'New',
    admin_notes: newLeadData.admin_notes || '',
    created_at: newLeadData.created_at || new Date().toISOString(),
  }

  const updated = [formatted, ...current]
  saveLeads(updated)

  // Asynchronously attempt to save to Supabase if configured
  import('./supabase').then(({ getSupabase, isSupabaseConfigured }) => {
    if (isSupabaseConfigured()) {
      const supabase = getSupabase()
      if (supabase) {
        supabase
          .from('admissions_leads')
          .insert([
            {
              form_type: formatted.form_type,
              parent_name: formatted.parent_name,
              child_name: formatted.child_name,
              phone: formatted.phone,
              email: formatted.email,
              city: formatted.city,
              child_age: formatted.child_age,
              program: formatted.program,
              academic_session: formatted.academic_session,
              message: formatted.message,
              status: formatted.status,
              admin_notes: formatted.admin_notes,
            },
          ])
          .then(({ error }) => {
            if (error) console.warn('Supabase lead insert notice:', error.message)
          })
          .catch((err) => console.warn('Supabase lead insert network notice:', err))
      }
    }
  }).catch(() => {})

  return formatted
}

// Update lead status (e.g. New -> Contacted -> Visit Scheduled -> Enrolled -> Closed)
export function updateLeadStatus(id, newStatus) {
  const current = getStoredLeads()
  const updated = current.map((lead) => {
    if (lead.id === id) {
      return { ...lead, status: newStatus }
    }
    return lead
  })
  saveLeads(updated)
  return updated
}

// Update admin notes for a lead
export function updateLeadNotes(id, adminNotes) {
  const current = getStoredLeads()
  const updated = current.map((lead) => {
    if (lead.id === id) {
      return { ...lead, admin_notes: adminNotes }
    }
    return lead
  })
  saveLeads(updated)
  return updated
}

// Delete a lead
export function deleteLead(id) {
  const current = getStoredLeads()
  const updated = current.filter((lead) => lead.id !== id)
  saveLeads(updated)
  return updated
}

// Reset leads to demo starter data
export function resetToDemoLeads() {
  saveLeads(INITIAL_LEADS)
  return INITIAL_LEADS
}

// Format lead timestamp nicely (e.g. "Just now", "25 mins ago", "Today at 3:15 PM", "24 Oct 2026")
export function formatLeadTime(isoString) {
  if (!isoString) return '—'
  try {
    const d = new Date(isoString)
    const diffMs = Date.now() - d.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`
    if (diffHours < 24) return `${diffHours} hr${diffHours > 1 ? 's' : ''} ago`
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`

    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  } catch (_) {
    return isoString
  }
}

// Compute aggregate metrics
export function getLeadsMetrics(leads) {
  const total = leads.length
  const newCount = leads.filter((l) => l.status === 'New').length
  const contactedCount = leads.filter((l) => l.status === 'Contacted').length
  const scheduledCount = leads.filter((l) => l.status === 'Visit Scheduled').length
  const enrolledCount = leads.filter((l) => l.status === 'Enrolled').length

  const enrollNowCount = leads.filter((l) => l.form_type === 'Enroll Now').length
  const contactSectionCount = leads.filter((l) => l.form_type !== 'Enroll Now').length

  return {
    total,
    newCount,
    contactedCount,
    scheduledCount,
    enrolledCount,
    enrollNowCount,
    contactSectionCount,
  }
}

// Export leads to a downloadable CSV file
export function exportLeadsToCSV(leads) {
  if (!leads || leads.length === 0) {
    alert('No inquiries to export.')
    return
  }

  const headers = [
    'Lead ID',
    'Form Type',
    'Status',
    'Parent Name',
    'Child Name',
    'Phone',
    'Email',
    'City',
    'Child Age',
    'Program',
    'Academic Session',
    'Parent Message',
    'Counselor Notes',
    'Created At',
  ]

  const rows = leads.map((l) => [
    l.id || '',
    l.form_type || '',
    l.status || '',
    `"${(l.parent_name || '').replace(/"/g, '""')}"`,
    `"${(l.child_name || '').replace(/"/g, '""')}"`,
    `"${l.phone || ''}"`,
    `"${l.email || ''}"`,
    `"${l.city || ''}"`,
    `"${l.child_age || ''}"`,
    `"${l.program || ''}"`,
    `"${l.academic_session || ''}"`,
    `"${(l.message || '').replace(/"/g, '""')}"`,
    `"${(l.admin_notes || '').replace(/"/g, '""')}"`,
    l.created_at || '',
  ])

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', `wonder_roots_admissions_leads_${new Date().toISOString().split('T')[0]}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

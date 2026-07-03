// Booking flow content. Single source of truth for the /book wizard.
// When Supabase is wired up, these ids become the values we persist.

export const bookingSteps = ['Service', 'Focus', 'Date & Time', 'Details'] as const

export type BookingServiceGroup = 'start' | 'engagement' | 'help'

export type BookingService = {
  id: string
  name: string
  desc: string
  price: string
  group: BookingServiceGroup
  recommended?: boolean
}

export const bookingServices: readonly BookingService[] = [
  {
    id: 'ai-audit',
    name: 'AI Audit',
    desc: 'A focused session mapping where AI fits — walk away with a written roadmap.',
    price: 'Free intro',
    group: 'start',
    recommended: true,
  },
  {
    id: 'consulting',
    name: 'Consulting',
    desc: '1:1 setup and training to run modern AI with confidence.',
    price: 'From TBD',
    group: 'engagement',
  },
  {
    id: 'team-training',
    name: 'Team Training',
    desc: 'The same proven curriculum, delivered live to your whole team.',
    price: 'From TBD',
    group: 'engagement',
  },
  {
    id: 'done-for-you',
    name: 'Done-For-You',
    desc: 'We build the tools, apps, dashboards, and agents for you.',
    price: 'From TBD',
    group: 'engagement',
  },
  {
    id: 'not-sure',
    name: 'Not sure yet',
    desc: 'We’ll talk through the right fit for your business.',
    price: 'Get a recommendation',
    group: 'help',
  },
] as const

export const bookingServiceGroups: {
  id: BookingServiceGroup
  title: string
  subtitle: string
}[] = [
  { id: 'start', title: 'Start here', subtitle: 'Recommended for most businesses' },
  { id: 'engagement', title: 'Engagements', subtitle: 'Ready to go straight to work' },
  { id: 'help', title: 'Not sure?', subtitle: 'We’ll point you the right way' },
]

// Optional focus areas (the "add-ons" step) — multi-select.
export type BookingFocusArea = { id: string; label: string; desc: string }

export const bookingFocusAreas: readonly BookingFocusArea[] = [
  { id: 'sales', label: 'Sales & revenue', desc: 'Leads, follow-ups, quoting' },
  { id: 'ops', label: 'Operations & workflows', desc: 'Automate recurring manual work' },
  { id: 'support', label: 'Customer support', desc: 'Faster, on-brand responses' },
  { id: 'data', label: 'Data & reporting', desc: 'Dashboards, one source of truth' },
  { id: 'marketing', label: 'Marketing & content', desc: 'Drafting, repurposing, scale' },
  { id: 'training', label: 'Team training', desc: 'Get your people confident with AI' },
] as const

export const bookingTimeSlots = [
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
] as const

// How long each appointment reserves. A booking blocks out this many minutes
// starting at the chosen slot, so we always have time with a client before the
// next meeting. Any other slot whose window overlaps is treated as unavailable.
export const appointmentDurationMin = 45

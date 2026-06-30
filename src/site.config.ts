// Single source of truth for site-wide content. Tweak copy/brand here.

export const site = {
  name: 'AI Consulting', // TODO: replace with final brand name
  tagline: 'AI that actually works for your business',
  email: 'hello@example.com', // TODO
  promise:
    'We get AI working inside small businesses that don’t have time to figure it out.',
}

export const nav = [
  { label: 'Services', to: '/services' },
  { label: 'Proof', to: '/proof' },
  { label: 'About', to: '/about' },
] as const

// Primary funnel CTA used across the site.
export const primaryCta = { label: 'Start with an Audit', to: '/audit' }
export const bookCta = { label: 'Book a Call', to: '/book' }

export const tiers = [
  {
    id: 'consulting',
    name: 'Consulting',
    who: '1:1 for owners and solo operators — local or over Zoom.',
    blurb:
      'Personal setup, goal-focused training, and hands-on work to get you running modern AI tools with confidence.',
    points: [
      'Personal setup + workflow',
      'Frontier models: basics → advanced',
      'Prompting that gets results',
      'Obsidian memory workflow',
      'File organization, security & backups',
    ],
    startingAt: 'TBD',
  },
  {
    id: 'team-training',
    name: 'Team Training',
    who: 'Group training for your staff — per session or per seat.',
    blurb:
      'The same proven curriculum, delivered to your whole team so AI sticks across the business.',
    points: [
      'Delivered live to your team',
      'Role-relevant workflows',
      'Per-session or per-seat pricing',
      'Repeatable playbooks',
    ],
    startingAt: 'TBD',
  },
  {
    id: 'done-for-you',
    name: 'Done-For-You',
    who: 'We build the system for you.',
    blurb:
      'Custom tools, sites, apps, dashboards, integrations, scheduled tasks, and agents — shipped and working.',
    points: [
      'Custom tools, apps & dashboards',
      'Integrations + scheduled tasks / cron',
      'Agents (Hermes + OpenClaw setup)',
      'Built, shipped, and supported',
    ],
    startingAt: 'TBD',
  },
] as const

export const steps = [
  {
    n: 1,
    title: 'Audit',
    desc: 'We map where AI fits in your business and what to do first.',
  },
  {
    n: 2,
    title: 'Roadmap',
    desc: 'You walk away with a written plan — prioritized and practical.',
  },
  {
    n: 3,
    title: 'Implement',
    desc: 'We consult, train your team, or build it for you.',
  },
  {
    n: 4,
    title: 'Support',
    desc: 'Ongoing monthly support keeps everything running and improving.',
  },
] as const

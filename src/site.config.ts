// Single source of truth for site-wide content. Tweak copy/brand here.

export const site = {
  name: 'Northline Consulting',
  studio: 'Legacy House', // studio attribution shown under the mark
  tagline: 'AI that actually works for your business',
  email: 'chance@legacyhousestudio.com',
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
// Low-friction entry point: the quick onboarding call.
export const onboardingCta = { label: 'Book a 30-min call', to: '/book' }

export const tiers = [
  {
    id: 'consulting',
    name: 'Consulting',
    who: '1:1 for owners and solo operators, local or over Zoom.',
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
    who: 'Group training for your staff, per session or per seat.',
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
      'Custom tools, sites, apps, dashboards, integrations, scheduled tasks, and agents, shipped and working.',
    points: [
      'Custom tools, apps & dashboards',
      'Integrations + scheduled tasks / cron',
      'Agents (Hermes + OpenClaw setup)',
      'Built, shipped, and supported',
    ],
    startingAt: 'TBD',
  },
] as const

// "How we fix it": our process, in plain terms.
export const steps = [
  {
    n: 1,
    title: 'We audit your business',
    desc: 'We learn how you actually operate and where AI can have the biggest impact.',
  },
  {
    n: 2,
    title: 'We find the bottlenecks',
    desc: 'The repetitive, time-draining tasks slowing you down. We map every one.',
  },
  {
    n: 3,
    title: 'We improve your systems',
    desc: 'We automate the recurring work and sharpen the systems you already run.',
  },
  {
    n: 4,
    title: 'We train your team',
    desc: 'So the improvements stick and your people can run with them.',
  },
] as const

// Shared visual palette for project imagery. Each entry is used as a card
// background and, on the detail page, as a placeholder image tile. Swap these
// for real image URLs later — the components read `image`/`gallery` the same way.
export const projectGradients = [
  'linear-gradient(155deg, #0b3b2e, #047857)',
  'linear-gradient(155deg, #1e293b, #334155)',
  'linear-gradient(155deg, #1a1a1a, #2b2b2b)',
  'linear-gradient(155deg, #06231f, #0e4f47)',
  'linear-gradient(155deg, #2a2440, #3b3357)',
] as const

// Projects: proof of capability. TODO: replace with real case studies + images.
export const caseStudies = [
  {
    slug: 'estimatekit',
    name: 'EstimateKit',
    tag: 'Custom tool',
    number: '10x',
    metric: 'faster quotes',
    summary:
      'Built an estimating tool that turned a half-day quoting process into minutes.',
    overview:
      'A contractor was losing bids because quotes took half a day to assemble by hand. We built a custom estimating tool that pulls from their pricing catalog and generates a polished, accurate quote in minutes.',
    services: ['Discovery audit', 'Custom tool build', 'Team training'],
    results: [
      { value: '10x', label: 'faster quotes' },
      { value: '4 hrs', label: 'saved per estimate' },
      { value: '2 wks', label: 'from idea to live' },
    ],
    gradient: projectGradients[0],
    gallery: [projectGradients[0], projectGradients[3], projectGradients[1]],
  },
  {
    slug: 'skateskins-app',
    name: 'SkateSkins App',
    tag: 'Product build',
    number: 'Shipped',
    metric: 'to the App Store',
    summary:
      'Designed and shipped a consumer app end-to-end, concept to store listing.',
    overview:
      'A founder had an idea and no technical team. We designed and built the full consumer app end-to-end — from concept and UX through development — and shipped it to the App Store.',
    services: ['Product design', 'App development', 'App Store launch'],
    results: [
      { value: 'Shipped', label: 'to the App Store' },
      { value: '100%', label: 'built end-to-end' },
      { value: 'iOS', label: 'native experience' },
    ],
    gradient: projectGradients[1],
    gallery: [projectGradients[1], projectGradients[4], projectGradients[2]],
  },
  {
    slug: 'client-automation',
    name: 'Client Automation',
    tag: 'Workflow',
    number: '15 hrs',
    metric: 'saved per week',
    summary:
      'Automated a recurring manual workflow, freeing the owner to focus on customers.',
    overview:
      'The owner was spending most of a working day each week on a repetitive manual process. We mapped the workflow, automated the busywork, and gave that time back to the business.',
    services: ['Workflow audit', 'Automation build', 'Handoff & docs'],
    results: [
      { value: '15 hrs', label: 'saved per week' },
      { value: '0', label: 'manual steps left' },
      { value: '1', label: 'owner freed up' },
    ],
    gradient: projectGradients[2],
    gallery: [projectGradients[2], projectGradients[0], projectGradients[3]],
  },
  {
    slug: 'ops-dashboard',
    name: 'Ops Dashboard',
    tag: 'Internal tool',
    number: 'Live',
    metric: 'across the team',
    summary:
      'A real-time dashboard that replaced a tangle of spreadsheets for daily operations.',
    overview:
      'Daily operations ran on a fragile web of spreadsheets only one person understood. We built a real-time dashboard that centralized the data and made it usable for the whole team.',
    services: ['Data audit', 'Dashboard build', 'Team rollout'],
    results: [
      { value: 'Live', label: 'across the team' },
      { value: '1', label: 'source of truth' },
      { value: 'Real-time', label: 'operational view' },
    ],
    gradient: projectGradients[3],
    gallery: [projectGradients[3], projectGradients[1], projectGradients[4]],
  },
  {
    slug: 'support-copilot',
    name: 'Support Copilot',
    tag: 'AI agent',
    number: '24/7',
    metric: 'first responses',
    summary:
      'An AI assistant that drafts customer replies from the company knowledge base.',
    overview:
      'Support was slow and dependent on a few people. We built an AI assistant grounded in the company knowledge base that drafts accurate first replies around the clock, with a human in the loop.',
    services: ['Knowledge audit', 'AI agent build', 'Team training'],
    results: [
      { value: '24/7', label: 'first responses' },
      { value: 'Instant', label: 'draft replies' },
      { value: 'On-brand', label: 'from your docs' },
    ],
    gradient: projectGradients[4],
    gallery: [projectGradients[4], projectGradients[2], projectGradients[0]],
  },
] as const

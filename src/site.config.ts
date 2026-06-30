// Single source of truth for site-wide content. Tweak copy/brand here.

export const site = {
  name: 'AI Sprint OS', // TODO: confirm/replace with final consulting brand name
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

// "Why it works": what we do not do vs. what we do.
export const whyItWorks = [
  {
    no: 'We don’t rip out what you’ve built.',
    yes: 'We expand on the business structure you already have.',
  },
  {
    no: 'We don’t hand you another tool to learn.',
    yes: 'We automate the recurring tasks so the work just gets done.',
  },
  {
    no: 'We don’t add more to your plate.',
    yes: 'We give you back time for the work you actually want to do.',
  },
] as const

// Projects: proof of capability. TODO: replace with real case studies.
export const caseStudies = [
  {
    name: 'EstimateKit',
    tag: 'Custom tool',
    number: '10x',
    metric: 'faster quotes',
    summary:
      'Built an estimating tool that turned a half-day quoting process into minutes.',
  },
  {
    name: 'SkateSkins App',
    tag: 'Product build',
    number: 'Shipped',
    metric: 'to the App Store',
    summary:
      'Designed and shipped a consumer app end-to-end, concept to store listing.',
  },
  {
    name: 'Client Automation',
    tag: 'Workflow',
    number: '15 hrs',
    metric: 'saved per week',
    summary:
      'Automated a recurring manual workflow, freeing the owner to focus on customers.',
  },
  {
    name: 'Ops Dashboard',
    tag: 'Internal tool',
    number: 'Live',
    metric: 'across the team',
    summary:
      'A real-time dashboard that replaced a tangle of spreadsheets for daily operations.',
  },
  {
    name: 'Support Copilot',
    tag: 'AI agent',
    number: '24/7',
    metric: 'first responses',
    summary:
      'An AI assistant that drafts customer replies from the company knowledge base.',
  },
] as const

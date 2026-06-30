// Services overview as a bento grid. Layout: a wide card + a card on row 1,
// three cards on row 2, then a mirrored row 3 (a card + a wide card). The two
// wide cards (first + last) span two columns; CSS grid auto-flow places the
// rest. Detailed content lives here; this is the services overview.

type Service = {
  title: string
  tagline: string
  items: string[]
  tint: string
  big?: boolean
}

const services: Service[] = [
  {
    title: 'AI Strategy & Consulting',
    tagline: 'Understand where AI can create the biggest impact.',
    items: [
      'Business Audit',
      'Business Analysis',
      'Competitor Analysis',
      'AI Readiness Assessment',
      'AI Roadmap',
      'Opportunity Identification',
    ],
    tint: '#ecfdf5', // emerald
    big: true,
  },
  {
    title: 'AI Training & Education',
    tagline: 'Empower your team to confidently use AI.',
    items: [
      'Personal Setup',
      'Basic Training',
      'Goal-Focused Training',
      '1-on-1 Coaching',
      'Team Training',
      'Local Workshops',
      'Zoom Workshops',
      'Prompt Engineering',
      'Frontier Models & Apps (Beginner)',
      'Frontier Models & Apps (Advanced)',
    ],
    tint: '#eef0fb', // lavender
  },
  {
    title: 'AI Automation & Workflows',
    tagline: 'Eliminate repetitive work with intelligent automation.',
    items: [
      'Workflow Automation',
      'Scheduled Tasks',
      'Cron Jobs',
      'AI Workflows',
      'Connecting Apps',
      'API Integrations',
      'Process Optimization',
      'Business Automation',
    ],
    tint: '#fbf8ee', // cream
  },
  {
    title: 'AI Agents & Custom Systems',
    tagline: 'Build AI employees tailored to your business.',
    items: [
      'AI Agents',
      'Multi-Agent Systems',
      'Hermes Setup',
      'OpenClaw Setup',
      'Custom AI Tools',
      'Internal AI Assistants',
      'Knowledge Systems',
      'Business Copilots',
    ],
    tint: '#f1f3f7', // slate
  },
  {
    title: 'Custom Software & Digital Solutions',
    tagline: 'Custom software built around your workflow.',
    items: [
      'Websites',
      'Web Applications',
      'Internal Dashboards',
      'Customer Portals',
      'Business Software',
      'Custom Integrations',
    ],
    tint: '#fbeef0', // rose
  },
  {
    title: 'AI Productivity & Operations',
    tagline: 'Create a smarter way to work every day.',
    items: [
      'Memory Management',
      'Obsidian Workflows',
      'File Organization',
      'Assisted Research',
      'Documentation',
      'Copywriting',
      'Knowledge Management',
      'Productivity Systems',
    ],
    tint: '#eef4fb', // sky
  },
  {
    title: 'Design & Brand Systems',
    tagline: 'Professional assets powered by AI and automation.',
    items: [
      'Brand Systems',
      'Design Systems',
      'Templates',
      'UI/UX Design',
      'Marketing Assets',
      'Visual Content',
    ],
    tint: '#ecfdf5', // emerald
    big: true,
  },
]

export default function ServicesBento() {
  return (
    <section className="bg-canvas">
      <div className="mx-auto max-w-6xl px-5 py-24">
        {/* Header row — title + stats left, description right */}
        <div className="grid items-start gap-8 md:grid-cols-2">
          <div>
            <h2 className="lh-h1 text-fg">
              Everything we do to get AI working for you
            </h2>
            <p className="mt-5 text-sm font-semibold text-green">
              Audit-first&nbsp;&nbsp;·&nbsp;&nbsp;Local or remote&nbsp;&nbsp;·&nbsp;&nbsp;Built by operators
            </p>
          </div>
          <p className="text-muted lh-body-lg md:pt-2">
            Working with us is like having an in-house AI team — strategy,
            hands-on training, and custom builds — without the headcount. We
            meet your business exactly where it already is.
          </p>
        </div>

        {/* Bento grid */}
        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className={`flex flex-col rounded-2xl border border-line p-7 ${
                s.big ? 'md:col-span-2 md:p-9' : ''
              }`}
              style={{ background: s.tint }}
            >
              <h3 className={`${s.big ? 'lh-h2' : 'lh-h4'} text-fg`}>
                {s.title}
              </h3>
              <p
                className={`mt-3 text-muted ${s.big ? 'lh-body-lg' : 'text-sm'}`}
              >
                {s.tagline}
              </p>
              <ul className={`flex flex-wrap gap-2 ${s.big ? 'mt-7' : 'mt-5'}`}>
                {s.items.map((item) => (
                  <li
                    key={item}
                    className={`rounded-full border border-black/5 bg-white/70 font-medium text-fg/75 ${
                      s.big ? 'px-4 py-1.5 text-sm' : 'px-3 py-1 text-xs'
                    }`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

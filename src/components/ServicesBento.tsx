// Services overview as a bento grid. Layout: a wide card + a card on row 1,
// three cards on row 2, then a mirrored row 3 (a card + a wide card). The two
// wide cards (first + last) span two columns; CSS grid auto-flow places the
// rest. Cards use the standard on-brand surface (white + hairline border).

type Service = {
  title: string
  tagline: string
  desc: string
  big?: boolean
}

const services: Service[] = [
  {
    title: 'AI Strategy & Consulting',
    tagline: 'Understand where AI can create the biggest impact.',
    desc: 'We audit and analyze your business — operations, competitors, and AI readiness — then hand you a prioritized roadmap of the highest-impact opportunities to pursue first.',
    big: true,
  },
  {
    title: 'AI Training & Education',
    tagline: 'Empower your team to confidently use AI.',
    desc: 'From personal setup to 1-on-1 coaching and full team workshops — in person or over Zoom — we teach prompting and the latest frontier models, basics through advanced.',
  },
  {
    title: 'AI Automation & Workflows',
    tagline: 'Eliminate repetitive work with intelligent automation.',
    desc: 'We automate the repetitive work — connecting your apps through API integrations, scheduling tasks and cron jobs, and optimizing the processes that quietly eat your time.',
  },
  {
    title: 'AI Agents & Custom Systems',
    tagline: 'Build AI employees tailored to your business.',
    desc: 'Custom AI agents and multi-agent systems — copilots, internal assistants, and knowledge systems (including Hermes and OpenClaw setups) that work like dedicated employees.',
  },
  {
    title: 'Custom Software & Digital Solutions',
    tagline: 'Custom software built around your workflow.',
    desc: 'Websites, web apps, internal dashboards, customer portals, and custom integrations — built around the way your business actually works.',
  },
  {
    title: 'AI Productivity & Operations',
    tagline: 'Create a smarter way to work every day.',
    desc: 'The systems that make every day smoother — memory and knowledge management, Obsidian workflows, file organization, and assisted research, docs, and copy.',
  },
  {
    title: 'Design & Brand Systems',
    tagline: 'Professional assets powered by AI and automation.',
    desc: 'Brand and design systems, templates, UI/UX, and marketing assets — professional visual content produced faster with AI and automation.',
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
              className={`lh-surface-d flex min-h-[200px] flex-col p-7 ${
                s.big ? 'md:col-span-2 md:min-h-[260px] md:p-9' : ''
              }`}
            >
              <h3 className={`${s.big ? 'lh-h2' : 'lh-h4'} text-fg`}>
                {s.title}
              </h3>
              <p
                className={`mt-3 font-semibold text-green ${
                  s.big ? 'text-base' : 'text-sm'
                }`}
              >
                {s.tagline}
              </p>
              <p
                className={`mt-4 text-muted ${s.big ? 'lh-body-lg' : 'text-sm'}`}
              >
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

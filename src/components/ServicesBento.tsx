// Services overview as a bento grid on a 6-column track. Row 1 is three equal
// cards (two columns each). Row 2 is a wide AI Agents card (four columns) plus
// the Design card (two columns), so it fills the same full width as row 1.
// Cards use the standard on-brand surface (white + hairline border) and reserve
// a media slot at the top for animated assets.

type Service = {
  title: string
  tagline: string
  desc: string
}

const services: Service[] = [
  {
    title: 'AI Strategy & Consulting',
    tagline: 'Understand where AI can create the biggest impact.',
    desc: 'We audit and analyze your business across operations, competitors, and AI readiness, then hand you a prioritized roadmap of the highest-impact opportunities to pursue first.',
  },
  {
    title: 'AI Training & Education',
    tagline: 'Empower your team to confidently use AI.',
    desc: 'From personal setup to 1-on-1 coaching and full team workshops, in person or over Zoom, we teach prompting and the latest frontier models, basics through advanced.',
  },
  {
    title: 'AI Automation & Custom Builds',
    tagline: 'Automate the busywork and build the tools around it.',
    desc: 'We automate the repetitive work through API integrations and scheduled tasks, then build the software around it, internal dashboards, customer portals, and the knowledge and file systems that keep every day running smoothly.',
  },
  {
    title: 'AI Agents & Custom Systems',
    tagline: 'Build AI employees tailored to your business.',
    desc: 'Custom AI agents and multi-agent systems, copilots, and internal assistants (including Hermes and OpenClaw setups) that work like dedicated employees for your business.',
  },
  {
    title: 'Design & Brand Systems',
    tagline: 'Professional assets powered by AI and automation.',
    desc: 'Brand and design systems, templates, UI/UX, and marketing assets. Professional visual content produced faster with AI and automation.',
  },
]

export default function ServicesBento() {
  return (
    <section className="bg-canvas">
      <div className="mx-auto max-w-[90rem] px-5 py-24">
        {/* Header row: title + stats left, description right */}
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
            Working with us is like having an in-house AI team for strategy,
            hands-on training, and custom builds, without the headcount. We meet
            your business exactly where it already is.
          </p>
        </div>

        {/* Bento grid: 6-col track. Row 1 = three equal cards (span 2 each);
            row 2 = wide AI Agents card (span 4) + Design (span 2). */}
        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-6">
          {services.map((s, i) => (
            <div
              key={s.title}
              className={`lh-surface-d flex flex-col p-7 ${
                i === 3 ? 'md:col-span-4' : 'md:col-span-2'
              }`}
            >
              {/* Reserved slot for an animated asset */}
              <div
                aria-hidden
                className="mb-6 h-56 rounded-xl border border-line bg-[#f1f3f7]"
              />
              <h3 className="lh-h4 text-fg">{s.title}</h3>
              <p className="mt-3 text-sm font-semibold text-green">
                {s.tagline}
              </p>
              <p className="mt-4 text-sm text-muted">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

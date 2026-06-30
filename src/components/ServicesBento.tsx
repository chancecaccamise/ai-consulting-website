// High-level overview of our services as a bento grid. Layout mirrors the
// reference: one wide card + one card on the top row, three on the bottom.
// Detailed per-service cards live elsewhere; this is the teaser/overview.

type Service = {
  caption: string
  badge: string
  desc: string
  tint: string
  className: string
  big?: boolean
}

const services: Service[] = [
  {
    caption: 'The front door',
    badge: 'AI Audit',
    desc: 'We map how your business runs and exactly where AI fits — you leave with a written roadmap.',
    tint: '#ecfdf5', // emerald
    className: 'md:col-span-2 md:min-h-[340px]',
    big: true,
  },
  {
    caption: 'For owners & operators',
    badge: 'Consulting',
    desc: 'Hands-on, 1:1 setup and training to get you running modern AI with confidence.',
    tint: '#eef0fb', // lavender
    className: 'md:min-h-[340px]',
  },
  {
    caption: 'For your whole team',
    badge: 'Team Training',
    desc: 'The same playbook, delivered to your staff so AI sticks across the business.',
    tint: '#fbf8ee', // cream
    className: '',
  },
  {
    caption: 'We build it for you',
    badge: 'Done-For-You',
    desc: 'Custom tools, apps, dashboards, integrations, and agents — shipped and working.',
    tint: '#f1f3f7', // slate
    className: '',
  },
  {
    caption: 'Ongoing partnership',
    badge: 'Support',
    desc: 'A monthly retainer that maintains and keeps improving everything we build.',
    tint: '#fbeef0', // rose
    className: '',
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
              key={s.badge}
              className={`flex min-h-[200px] flex-col justify-end rounded-2xl border border-line p-7 md:min-h-[220px] ${s.className}`}
              style={{ background: s.tint }}
            >
              <p className="text-sm font-semibold text-fg/55">{s.caption}</p>
              <span
                className={`mt-3 inline-block self-start rounded-full bg-[#1a1a1a] px-5 py-2.5 font-display font-black uppercase tracking-tight text-white ${
                  s.big ? 'text-xl' : 'text-base'
                }`}
              >
                {s.badge}
              </span>
              <p
                className={`mt-4 text-sm text-muted ${s.big ? 'max-w-md' : ''}`}
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

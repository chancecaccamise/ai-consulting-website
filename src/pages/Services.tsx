import Button from '../components/Button'
import CTABand from '../components/CTABand'
import { tiers, bookCta } from '../site.config'

const supportPoints = [
  'Assisted work — research, docs, copy',
  'Design work — systems, templates, brand',
  'Maintenance of anything we built for you',
]

export default function Services() {
  return (
    <>
      <section className="bg-paper">
        <div className="mx-auto max-w-4xl px-5 py-24 text-center">
          <h1 className="text-5xl font-extrabold text-ink sm:text-6xl">
            Services
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted sm:text-xl">
            Three tiers, one front door. Every engagement starts with an audit
            so we point you at the right one.
          </p>
        </div>
      </section>

      <section className="border-t border-line bg-mist">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="grid gap-6 lg:grid-cols-3">
            {tiers.map((tier, i) => (
              <div
                key={tier.id}
                className="flex flex-col rounded-2xl border border-line bg-paper p-8 shadow-card"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Tier {i + 1}
                </span>
                <h2 className="mt-2 text-2xl font-bold text-ink">{tier.name}</h2>
                <p className="mt-2 text-sm font-medium text-brand">{tier.who}</p>
                <p className="mt-4 text-sm text-muted">{tier.blurb}</p>
                <ul className="mt-6 flex-1 space-y-2.5">
                  {tier.points.map((p) => (
                    <li key={p} className="flex gap-2.5 text-sm text-ink/80">
                      <span className="mt-0.5 text-accent">✓</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 border-t border-line pt-6">
                  <p className="text-sm text-muted">
                    Starting at{' '}
                    <span className="font-bold text-ink">{tier.startingAt}</span>
                  </p>
                  <Button to="/book" className="mt-4 w-full">
                    Book a Call
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-on — Monthly Support */}
      <section className="bg-paper">
        <div className="mx-auto max-w-5xl px-5 py-20">
          <div className="rounded-2xl border border-line bg-ink p-10 text-white">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <span className="text-xs font-semibold uppercase tracking-wider text-white/50">
                  Add-on
                </span>
                <h2 className="mt-2 text-3xl font-bold">Monthly Support</h2>
                <p className="mt-3 text-white/70">
                  A retainer that keeps everything moving — assisted work,
                  design, and maintenance of what we’ve built.
                </p>
                <ul className="mt-6 space-y-2.5">
                  {supportPoints.map((p) => (
                    <li key={p} className="flex gap-2.5 text-sm text-white/80">
                      <span className="mt-0.5 text-accent">✓</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button to="/book" variant="primary" className="shrink-0">
                Book a Call
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CTABand cta={bookCta} />
    </>
  )
}

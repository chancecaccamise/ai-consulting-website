import Button from '../components/Button'
import CTABand from '../components/CTABand'
import { tiers, bookCta } from '../site.config'

const supportPoints = [
  'Assisted work: research, docs, copy',
  'Design work: systems, templates, brand',
  'Maintenance of anything we built for you',
]

export default function Services() {
  return (
    <>
      <section className="bg-canvas">
        <div className="mx-auto max-w-4xl px-5 pb-12 pt-24 text-center">
          <h1 className="lh-display-3 text-fg">Services</h1>
          <p className="mx-auto mt-7 max-w-2xl text-muted lh-body-lg">
            Three tiers, one front door. Every engagement starts with an audit
            so we point you at the right one.
          </p>
        </div>
      </section>

      <section className="bg-canvas">
        <div className="mx-auto max-w-[90rem] px-5 py-12">
          <div className="grid gap-6 lg:grid-cols-3">
            {tiers.map((tier, i) => (
              <div
                key={tier.id}
                className="lh-surface-d rise-soft flex flex-col p-8"
              >
                <span className="lh-eyebrow">Tier {i + 1}</span>
                <h2 className="lh-h3 mt-3 text-fg">{tier.name}</h2>
                <p className="lh-accent-text mt-3 text-sm font-medium">
                  {tier.who}
                </p>
                <p className="mt-4 text-sm text-muted">{tier.blurb}</p>
                <ul className="mt-6 flex-1 space-y-2.5">
                  {tier.points.map((p) => (
                    <li key={p} className="flex gap-2.5 text-sm text-fg/80">
                      <span className="lh-accent-text mt-0.5">✓</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 border-t border-line pt-6">
                  <p className="text-sm text-muted">
                    Starting at{' '}
                    <span className="font-display font-black text-fg">
                      {tier.startingAt}
                    </span>
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

      {/* Add-on: Monthly Support */}
      <section className="bg-canvas px-5 py-16">
        <div className="lh-surface-d-lg mx-auto max-w-5xl p-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h2 className="lh-h2 text-fg">Monthly Support</h2>
              <p className="mt-4 text-muted">
                A retainer that keeps everything moving: assisted work, design,
                and maintenance of what we’ve built.
              </p>
              <ul className="mt-6 space-y-2.5">
                {supportPoints.map((p) => (
                  <li key={p} className="flex gap-2.5 text-sm text-fg/80">
                    <span className="lh-accent-text mt-0.5">✓</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Button to="/book" className="shrink-0">
              Book a Call
            </Button>
          </div>
        </div>
      </section>

      <CTABand cta={bookCta} />
    </>
  )
}

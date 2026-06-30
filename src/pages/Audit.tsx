import Button from '../components/Button'
import CTABand from '../components/CTABand'
import { bookCta } from '../site.config'

const walkAway = [
  'A written roadmap — prioritized and practical',
  'The highest-leverage AI opportunities in your business',
  'A clear first step you can act on immediately',
  'A recommendation: Consulting, Team Training, or Done-For-You',
]

export default function Audit() {
  return (
    <>
      <section className="bg-paper">
        <div className="mx-auto max-w-4xl px-5 py-24 text-center">
          <span className="inline-block rounded-full border border-line bg-mist px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted">
            The front door
          </span>
          <h1 className="mt-6 text-5xl font-extrabold text-ink sm:text-6xl">
            Start with an Audit
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted sm:text-xl">
            Before we build or train anything, we figure out exactly where AI
            fits in your business — and what to do first.
          </p>
          <div className="mt-10">
            <Button to="/book" className="px-8 py-3.5 text-base">
              Book the Audit
            </Button>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-mist">
        <div className="mx-auto max-w-5xl px-5 py-20">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-ink">What the audit is</h2>
              <p className="mt-4 text-muted">
                A focused working session where we look at how your business
                actually runs, then map where modern AI can save time, cut
                costs, or unlock new capacity. No fluff, no hype — just a clear
                read on what’s worth doing.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-ink">What you walk away with</h2>
              <ul className="mt-4 space-y-3">
                {walkAway.map((item) => (
                  <li key={item} className="flex gap-3 text-muted">
                    <span className="mt-1 text-brand">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-5xl px-5 py-20">
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="rounded-2xl border border-line p-7 shadow-card">
              <h3 className="text-lg font-bold text-ink">What it costs</h3>
              <p className="mt-2 text-muted">
                {/* TODO: decide paid vs. comped + price */}
                Pricing TBD — paid engagement or comped with a strategy call.
              </p>
            </div>
            <div className="rounded-2xl border border-line p-7 shadow-card">
              <h3 className="text-lg font-bold text-ink">What happens next</h3>
              <p className="mt-2 text-muted">
                Your roadmap routes you into the right tier — Consulting, Team
                Training, or Done-For-You — with ongoing support if you want it.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTABand
        title="Book your Audit"
        subtitle="One session. A written roadmap. A clear first step."
        cta={bookCta}
      />
    </>
  )
}

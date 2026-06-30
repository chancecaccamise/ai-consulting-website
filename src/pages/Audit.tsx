import Button from '../components/Button'
import Eyebrow from '../components/Eyebrow'
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
      <section className="relative overflow-hidden bg-canvas">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 top-10 h-[480px] w-[480px] rounded-full opacity-15 blur-[130px]"
          style={{ background: 'radial-gradient(circle, #389750, transparent 70%)' }}
        />
        <div className="relative mx-auto max-w-4xl px-5 pb-20 pt-24 text-center">
          <Eyebrow>The front door</Eyebrow>
          <h1 className="lh-display-3 mt-7 text-fg">
            Start with an <span className="lh-accent-text">Audit</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-muted lh-body-lg">
            Before we build or train anything, we figure out exactly where AI
            fits in your business — and what to do first.
          </p>
          <div className="mt-10 flex justify-center">
            <Button to="/book">Book the Audit</Button>
          </div>
        </div>
      </section>

      <section className="bg-canvas">
        <div className="mx-auto max-w-5xl px-5 py-16">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="lh-surface-d p-8">
              <h2 className="lh-h3 text-fg">What the audit is</h2>
              <p className="mt-4 text-muted">
                A focused working session where we look at how your business
                actually runs, then map where modern AI can save time, cut
                costs, or unlock new capacity. No fluff, no hype — just a clear
                read on what’s worth doing.
              </p>
            </div>
            <div className="lh-surface-d p-8">
              <h2 className="lh-h3 text-fg">What you walk away with</h2>
              <ul className="mt-4 space-y-3">
                {walkAway.map((item) => (
                  <li key={item} className="flex gap-3 text-muted">
                    <span className="lh-accent-text mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div className="lh-pressed-d p-7">
              <Eyebrow dot={false}>What it costs</Eyebrow>
              <p className="mt-3 text-muted">
                {/* TODO: decide paid vs. comped + price */}
                Pricing TBD — paid engagement or comped with a strategy call.
              </p>
            </div>
            <div className="lh-pressed-d p-7">
              <Eyebrow dot={false}>What happens next</Eyebrow>
              <p className="mt-3 text-muted">
                Your roadmap routes you into the right tier — Consulting, Team
                Training, or Done-For-You — with ongoing support if you want it.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTABand
        eyebrow="Book the audit"
        title="One session. A written roadmap."
        subtitle="A clear first step you can act on immediately."
        cta={bookCta}
      />
    </>
  )
}

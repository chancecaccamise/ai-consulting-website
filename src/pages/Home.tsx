import Button from '../components/Button'
import CTABand from '../components/CTABand'
import { tiers, steps, site, primaryCta } from '../site.config'

export default function Home() {
  return (
    <>
      {/* 1. Hero / Hook — static, animation-independent */}
      <section className="relative overflow-hidden bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-24 text-center sm:py-32">
          <span className="inline-block rounded-full border border-line bg-mist px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted">
            For local small businesses
          </span>
          <h1 className="mx-auto mt-6 max-w-4xl text-5xl font-extrabold text-ink sm:text-6xl md:text-7xl">
            {site.tagline}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted sm:text-xl">
            {site.promise}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button to={primaryCta.to} className="px-8 py-3.5 text-base">
              {primaryCta.label}
            </Button>
            <Button to="/services" variant="ghost" className="px-8 py-3.5 text-base">
              See what we do
            </Button>
          </div>
        </div>
      </section>

      {/* 2. The Problem */}
      <section className="border-t border-line bg-mist">
        <div className="mx-auto max-w-3xl px-5 py-24 text-center">
          <h2 className="text-3xl font-bold text-ink sm:text-4xl">
            Every small business knows AI matters.
          </h2>
          <p className="mt-4 text-2xl text-muted sm:text-3xl">
            Nobody has time to figure out where to start.
          </p>
        </div>
      </section>

      {/* 3. The Shift */}
      <section className="bg-ink">
        <div className="mx-auto max-w-5xl px-5 py-24 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-white/50">
            The shift
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 text-4xl font-extrabold text-white sm:flex-row sm:gap-10 sm:text-6xl">
            <span>Learn.</span>
            <span className="text-accent">Train.</span>
            <span>Build.</span>
          </div>
        </div>
      </section>

      {/* 4. How It Works — static 4-step (scroll animation layered later) */}
      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-ink sm:text-4xl">
              How it works
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
              One front door. A clear path from confusion to working systems.
            </p>
          </div>

          <ol className="mt-16 grid gap-8 md:grid-cols-4">
            {steps.map((step) => (
              <li key={step.n} className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-lg font-bold text-white">
                  {step.n}
                </div>
                <h3 className="mt-5 text-xl font-bold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm text-muted">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. The Tiers */}
      <section className="border-t border-line bg-mist">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-ink sm:text-4xl">
              Three ways we help
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
              The audit routes you into the right one.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className="flex flex-col rounded-2xl border border-line bg-paper p-7 shadow-card"
              >
                <h3 className="text-xl font-bold text-ink">{tier.name}</h3>
                <p className="mt-2 text-sm font-medium text-brand">{tier.who}</p>
                <p className="mt-4 flex-1 text-sm text-muted">{tier.blurb}</p>
                <Button
                  to="/services"
                  variant="ghost"
                  className="mt-6 w-full"
                >
                  Learn more
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Proof / Fit */}
      <section className="bg-paper">
        <div className="mx-auto max-w-4xl px-5 py-24 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-muted">
            Built for local businesses
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-2xl font-semibold text-ink sm:text-3xl">
            We build and ship real AI systems for a living. This isn’t a
            reseller course — it’s the work.
          </p>
          <div className="mt-10">
            <Button to="/proof" variant="secondary">
              See the proof
            </Button>
          </div>
        </div>
      </section>

      {/* 7. Close */}
      <CTABand />
    </>
  )
}

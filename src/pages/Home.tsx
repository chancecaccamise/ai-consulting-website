import Button from '../components/Button'
import Eyebrow from '../components/Eyebrow'
import CTABand from '../components/CTABand'
import { tiers, steps, site, primaryCta } from '../site.config'

export default function Home() {
  return (
    <>
      {/* 1. Hero / Hook — static, animation-independent */}
      <section className="relative overflow-hidden bg-canvas">
        {/* ambient green bloom */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 top-0 h-[520px] w-[520px] rounded-full opacity-30 blur-[120px]"
          style={{ background: 'radial-gradient(circle, #389750, transparent 70%)' }}
        />
        <div className="relative mx-auto max-w-6xl px-5 pb-28 pt-24 sm:pt-28">
          <Eyebrow>Design system &amp; AI for local business</Eyebrow>
          <h1 className="lh-display-2 mt-7 max-w-5xl text-fg">
            AI that <span className="lh-accent-text">actually works</span> for
            your business
          </h1>
          <p className="mt-7 max-w-2xl text-muted lh-body-lg">{site.promise}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button to={primaryCta.to}>{primaryCta.label}</Button>
            <Button to="/services" variant="secondary">
              See what we do
            </Button>
          </div>
        </div>
      </section>

      {/* 2. The Problem */}
      <section className="bg-canvas">
        <div className="mx-auto max-w-4xl px-5 py-24 text-center">
          <h2 className="lh-h1 text-fg">
            Every small business knows AI matters.
          </h2>
          <p className="mt-6 text-2xl font-light text-muted sm:text-3xl">
            Nobody has time to figure out where to start.
          </p>
        </div>
      </section>

      {/* 3. The Shift */}
      <section className="bg-canvas px-5 py-20">
        <div className="lh-pressed-d mx-auto max-w-5xl px-8 py-20 text-center">
          <Eyebrow>The shift</Eyebrow>
          <div className="lh-display-3 mt-8 flex flex-col items-center justify-center gap-3 text-fg sm:flex-row sm:gap-10">
            <span>Learn.</span>
            <span className="lh-accent-text">Train.</span>
            <span>Build.</span>
          </div>
        </div>
      </section>

      {/* 4. How It Works — static 4-step (scroll animation layered later) */}
      <section className="bg-canvas">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <div className="text-center">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="lh-h2 mt-5 text-fg">One front door</h2>
            <p className="mx-auto mt-5 max-w-xl text-muted lh-body-lg">
              A clear path from confusion to working systems.
            </p>
          </div>

          <ol className="mt-16 grid gap-6 md:grid-cols-4">
            {steps.map((step) => (
              <li
                key={step.n}
                className="lh-surface-d rise-soft flex flex-col p-7"
              >
                <span className="lh-mono lh-accent-text text-sm">
                  0{step.n}
                </span>
                <h3 className="lh-h4 mt-4 text-fg">{step.title}</h3>
                <p className="mt-3 text-sm text-muted">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. The Tiers */}
      <section className="bg-canvas">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <div className="text-center">
            <Eyebrow>Three ways we help</Eyebrow>
            <h2 className="lh-h2 mt-5 text-fg">The audit routes you in</h2>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className="lh-surface-d rise-soft flex flex-col p-8"
              >
                <h3 className="lh-h3 text-fg">{tier.name}</h3>
                <p className="lh-accent-text mt-3 text-sm font-medium">
                  {tier.who}
                </p>
                <p className="mt-4 flex-1 text-sm text-muted">{tier.blurb}</p>
                <Button to="/services" variant="ghost" className="mt-7 w-full">
                  Learn more
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Proof / Fit */}
      <section className="bg-canvas">
        <div className="mx-auto max-w-4xl px-5 py-24 text-center">
          <Eyebrow>Built for local businesses</Eyebrow>
          <p className="lh-h2 mx-auto mt-7 max-w-3xl text-fg">
            We build and ship real AI systems for a living. This isn’t a
            reseller course — <span className="lh-accent-text">it’s the work.</span>
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

import Button from '../components/Button'
import BeamsBackground from '../components/BeamsBackground'
import ServicesBento from '../components/ServicesBento'
import CTABand from '../components/CTABand'
import {
  tiers,
  steps,
  whyItWorks,
  caseStudies,
  onboardingCta,
} from '../site.config'

export default function Home() {
  return (
    <>
      {/* 1. Hero: the problem (dark band, glowing emerald beams) */}
      <section className="relative flex min-h-[88vh] w-full items-center overflow-hidden bg-[#0b0b0c]">
        <BeamsBackground />
        <div className="relative z-10 mx-auto max-w-4xl px-5 py-24 text-center">
          <h1 className="lh-display-3 mx-auto text-white">
            You keep hearing about AI.{' '}
            <span className="text-[#10b981]">
              You just don’t know where to start.
            </span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-white/70 lh-body-lg">
            Everyone knows AI matters: what it is, what it can do, the
            businesses it’s changing. But actually understanding where it fits
            and where to begin takes time most small businesses don’t have.
          </p>
          <p className="mx-auto mt-4 max-w-2xl font-semibold text-white lh-body-lg">
            That’s the part we handle for you.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button to={onboardingCta.to}>{onboardingCta.label}</Button>
            <a
              href="#how"
              className="lh-btn border border-white/25 bg-transparent text-white transition-colors hover:border-white/50 hover:bg-white/10"
            >
              See how it works
            </a>
          </div>
        </div>
      </section>

      {/* 2. Services overview: bento grid */}
      <ServicesBento />

      {/* 3. How we fix it */}
      <section id="how" className="scroll-mt-24 bg-canvas">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <div className="text-center">
            <h2 className="lh-h1 mx-auto max-w-3xl text-fg">
              We come in, find what’s slowing you down, and fix it with AI
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-muted lh-body-lg">
              You don’t spend months learning AI. We audit your business,
              improve your systems, and train your team so the gains stick.
            </p>
          </div>

          <ol className="mt-16 grid gap-6 md:grid-cols-4">
            {steps.map((step) => (
              <li
                key={step.n}
                className="lh-surface-d rise-soft flex flex-col items-center p-7 text-center"
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

      {/* 3. Who we are */}
      <section className="bg-canvas px-5 py-12">
        <div className="lh-surface-d-lg mx-auto max-w-5xl p-10 text-center sm:p-14">
          <p className="lh-h2 mx-auto max-w-3xl text-fg">
            We’re small business owners who learned AI the hard way, so you
            don’t have to.
          </p>
          <p className="mx-auto mt-6 max-w-3xl text-muted lh-body-lg">
            We went through all the tedious work of learning AI and building it
            into our own businesses. Now we take everything we’ve learned and
            use it to help other owners grow, without the months of trial and
            error.
          </p>
        </div>
      </section>

      {/* 4. Why it works */}
      <section className="bg-canvas">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <div className="text-center">
            <h2 className="lh-h1 mx-auto max-w-3xl text-fg">
              We expand on what you’ve built, not replace it
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-muted lh-body-lg">
              We take your existing structure and make it better. Automate the
              recurring tasks, sharpen the systems, and give you back time for
              the work you actually want to do.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {whyItWorks.map((item) => (
              <div
                key={item.yes}
                className="lh-surface-d rise-soft flex flex-col gap-4 p-7"
              >
                <p className="flex items-start gap-2.5 text-sm text-subtle line-through decoration-subtle/60">
                  <span aria-hidden>✕</span>
                  <span>{item.no}</span>
                </p>
                <p className="flex items-start gap-2.5 font-medium text-fg">
                  <span className="lh-accent-text mt-0.5" aria-hidden>
                    ✓
                  </span>
                  <span>{item.yes}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Projects */}
      <section className="bg-canvas">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <div className="text-center">
            <h2 className="lh-h1 text-fg">Projects &amp; results</h2>
            <p className="mx-auto mt-6 max-w-2xl text-muted lh-body-lg">
              A sample of what we’ve shipped, the same capabilities we bring to
              your business.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {caseStudies.map((cs) => (
              <article
                key={cs.name}
                className="lh-surface-d rise-soft flex flex-col items-center p-8 text-center"
              >
                <span className="lh-eyebrow">{cs.tag}</span>
                <span className="mt-5 font-display text-4xl font-black uppercase text-green">
                  {cs.number}
                </span>
                <span className="mt-1 text-sm text-subtle">{cs.metric}</span>
                <h3 className="lh-h4 mt-5 text-fg">{cs.name}</h3>
                <p className="mt-3 text-sm text-muted">{cs.summary}</p>
              </article>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Button to="/proof" variant="secondary">
              See more of our work
            </Button>
          </div>
        </div>
      </section>

      {/* 6. Pricing cards */}
      <section className="bg-canvas">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <div className="text-center">
            <h2 className="lh-h1 text-fg">Ways to work with us</h2>
            <p className="mx-auto mt-6 max-w-2xl text-muted lh-body-lg">
              Every engagement starts with an audit, then routes into the tier
              that fits.
            </p>
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {tiers.map((tier, i) => (
              <div
                key={tier.id}
                className="lh-surface-d rise-soft flex flex-col p-8"
              >
                <span className="lh-eyebrow">Tier {i + 1}</span>
                <h3 className="lh-h3 mt-3 text-fg">{tier.name}</h3>
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

      {/* 7. CTA: quick 30-minute onboarding */}
      <CTABand
        title="Book a quick 30-minute call"
        subtitle="No commitment, just a fast look at where AI can save you time and money."
        cta={onboardingCta}
      />
    </>
  )
}

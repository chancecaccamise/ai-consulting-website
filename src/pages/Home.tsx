import Button from '../components/Button'
import BeamsBackground from '../components/BeamsBackground'
import ServicesBento from '../components/ServicesBento'
import HowItWorks from '../components/how/HowItWorks'
import ProjectsCarousel from '../components/ProjectsCarousel'
import CTABand from '../components/CTABand'
import { tiers, onboardingCta } from '../site.config'

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

      {/* 3. How we work (scroll-driven system diagram) */}
      <HowItWorks />

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

      {/* 4. Projects: carousel */}
      <ProjectsCarousel />

      {/* 6. Pricing cards */}
      <section className="bg-canvas">
        <div className="mx-auto max-w-[90rem] px-5 py-24">
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

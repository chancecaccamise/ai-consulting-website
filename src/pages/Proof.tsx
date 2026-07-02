import { Link } from 'react-router-dom'
import CTABand from '../components/CTABand'
import { bookCta, caseStudies } from '../site.config'

export default function Proof() {
  return (
    <>
      <section className="bg-canvas">
        <div className="mx-auto max-w-4xl px-5 pb-12 pt-24 text-center">
          <h1 className="lh-display-3 text-fg">Proof</h1>
          <p className="mx-auto mt-7 max-w-2xl text-muted lh-body-lg">
            We ship real systems. Here’s a sample of the work — click any project
            to see what we did and the results.
          </p>
        </div>
      </section>

      <section className="bg-canvas">
        <div className="mx-auto max-w-[90rem] px-5 pb-24 pt-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((cs) => (
              <Link
                key={cs.slug}
                to={`/proof/${cs.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.10)]"
              >
                {/* Image with the headline metric */}
                <div
                  className="relative h-52 w-full overflow-hidden"
                  style={{ background: cs.gradient }}
                >
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
                  <span className="absolute left-5 top-5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                    {cs.number} {cs.metric}
                  </span>
                </div>

                {/* Copy */}
                <div className="flex flex-1 flex-col p-7">
                  <span className="lh-eyebrow lh-accent-text">{cs.tag}</span>
                  <h2 className="lh-h4 mt-2 text-fg">{cs.name}</h2>
                  <p className="mt-3 flex-1 text-sm text-muted">{cs.summary}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-fg">
                    View project
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-transform group-hover:translate-x-1"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Want results like these?"
        subtitle="Start with an audit and we’ll map your highest-leverage opportunity."
        cta={bookCta}
      />
    </>
  )
}

import CTABand from '../components/CTABand'
import { bookCta } from '../site.config'

// TODO: replace with real case studies (EstimateKit, SkateSkins, client automation)
const caseStudies = [
  {
    name: 'EstimateKit',
    tag: 'Custom tool',
    number: '10x',
    metric: 'faster quotes',
    summary:
      'Built an estimating tool that turned a half-day quoting process into minutes.',
  },
  {
    name: 'SkateSkins App',
    tag: 'Product build',
    number: 'Shipped',
    metric: 'to the App Store',
    summary:
      'Designed and shipped a consumer app end-to-end — concept to store listing.',
  },
  {
    name: 'Client Automation',
    tag: 'Workflow',
    number: '15 hrs',
    metric: 'saved per week',
    summary:
      'Automated a recurring manual workflow, freeing the owner to focus on customers.',
  },
]

export default function Proof() {
  return (
    <>
      <section className="bg-paper">
        <div className="mx-auto max-w-4xl px-5 py-24 text-center">
          <h1 className="text-5xl font-extrabold text-ink sm:text-6xl">Proof</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted sm:text-xl">
            We ship real systems. Here’s a sample of the work.
          </p>
        </div>
      </section>

      <section className="border-t border-line bg-mist">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="grid gap-6 md:grid-cols-3">
            {caseStudies.map((cs) => (
              <article
                key={cs.name}
                className="flex flex-col rounded-2xl border border-line bg-paper p-7 shadow-card"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                  {cs.tag}
                </span>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-brand">
                    {cs.number}
                  </span>
                  <span className="text-sm text-muted">{cs.metric}</span>
                </div>
                <h2 className="mt-4 text-lg font-bold text-ink">{cs.name}</h2>
                <p className="mt-2 text-sm text-muted">{cs.summary}</p>
              </article>
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

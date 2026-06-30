import Eyebrow from '../components/Eyebrow'
import CTABand from '../components/CTABand'
import { bookCta, caseStudies } from '../site.config'

export default function Proof() {
  return (
    <>
      <section className="bg-canvas">
        <div className="mx-auto max-w-4xl px-5 pb-12 pt-24 text-center">
          <Eyebrow>The work</Eyebrow>
          <h1 className="lh-display-3 mt-7 text-fg">Proof</h1>
          <p className="mx-auto mt-7 max-w-2xl text-muted lh-body-lg">
            We ship real systems. Here’s a sample of the work.
          </p>
        </div>
      </section>

      <section className="bg-canvas">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <div className="grid gap-6 md:grid-cols-3">
            {caseStudies.map((cs) => (
              <article
                key={cs.name}
                className="lh-surface-d rise-soft flex flex-col items-center p-8 text-center"
              >
                <span className="lh-eyebrow">{cs.tag}</span>
                <span className="mt-5 font-display text-5xl font-black uppercase text-green">
                  {cs.number}
                </span>
                <span className="mt-1 text-sm text-subtle">{cs.metric}</span>
                <h2 className="lh-h4 mt-5 text-fg">{cs.name}</h2>
                <p className="mt-3 text-sm text-muted">{cs.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        eyebrow="Your turn"
        title="Want results like these?"
        subtitle="Start with an audit and we’ll map your highest-leverage opportunity."
        cta={bookCta}
      />
    </>
  )
}

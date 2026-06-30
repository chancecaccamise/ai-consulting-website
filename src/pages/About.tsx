import CTABand from '../components/CTABand'
import { bookCta } from '../site.config'

export default function About() {
  return (
    <>
      <section className="bg-canvas">
        <div className="mx-auto max-w-3xl px-5 pb-12 pt-24 text-center">
          <h1 className="lh-display-3 text-fg">
            We ship <span className="lh-accent-text">real systems.</span>
          </h1>
          <div className="mx-auto mt-9 space-y-6 text-muted lh-body-lg">
            <p>
              We’re not a course and we’re not resellers. We build and ship real
              AI tools, apps, and automations for a living, and we bring that
              same hands-on work to local small businesses.
            </p>
            <p>
              Most owners know AI matters but don’t have the time to sort hype
              from what actually moves the needle. That’s the gap we close:
              practical systems that work inside your business, set up by people
              who do this every day.
            </p>
            <p>
              Local businesses trust us because we don’t hand over slideware. We
              do the work, ship the system, and stick around to keep it running.
            </p>
          </div>
        </div>
      </section>

      <CTABand cta={bookCta} />
    </>
  )
}

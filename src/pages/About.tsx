import CTABand from '../components/CTABand'
import { bookCta } from '../site.config'

export default function About() {
  return (
    <>
      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-5 py-24">
          <h1 className="text-5xl font-extrabold text-ink sm:text-6xl">
            We ship real systems.
          </h1>
          <div className="mt-8 space-y-6 text-lg text-muted">
            <p>
              We’re not a course and we’re not resellers. We build and ship
              real AI tools, apps, and automations for a living — and we bring
              that same hands-on work to local small businesses.
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

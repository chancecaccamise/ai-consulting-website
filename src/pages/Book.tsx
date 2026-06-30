import { useState } from 'react'
import Eyebrow from '../components/Eyebrow'
import { site } from '../site.config'

const inputClass =
  'mt-2 w-full rounded-xl border-none bg-[#161616] px-4 py-3 text-sm text-fg outline-none shadow-[inset_3px_3px_8px_rgba(0,0,0,.7),inset_-2px_-2px_6px_rgba(255,255,255,.03)] transition-shadow focus:shadow-[inset_3px_3px_8px_rgba(0,0,0,.7),0_0_0_1px_rgba(56,151,80,.6),0_0_18px_rgba(56,151,80,.35)]'

export default function Book() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <section className="bg-canvas">
      <div className="mx-auto max-w-3xl px-5 pb-24 pt-24">
        <div className="text-center">
          <Eyebrow>Let’s talk</Eyebrow>
          <h1 className="lh-display-3 mt-7 text-fg">Book a Call</h1>
          <p className="mx-auto mt-7 max-w-xl text-muted lh-body-lg">
            Tell us a little about your business and we’ll be in touch to set up
            your audit.
          </p>
        </div>

        {/* TODO: embed scheduler (Calendly / Cal.com / Square) here */}
        <div className="lh-surface-d-lg mt-12 p-8">
          {submitted ? (
            <div className="py-10 text-center">
              <div className="lh-glow-green mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green text-2xl text-fg">
                ✓
              </div>
              <h2 className="lh-h3 mt-6 text-fg">Thanks!</h2>
              <p className="mt-3 text-muted">
                We’ve got your details and will reach out at{' '}
                <span className="text-fg">{site.email}</span> soon.
              </p>
            </div>
          ) : (
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault()
                setSubmitted(true)
              }}
            >
              <Field label="Name" name="name" type="text" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="Business" name="business" type="text" />
              <div>
                <label htmlFor="goal" className="lh-label text-fg">
                  What do you want AI to do for you?
                </label>
                <textarea
                  id="goal"
                  name="goal"
                  rows={4}
                  className={inputClass}
                />
              </div>
              <button type="submit" className="lh-btn lh-btn-primary w-full">
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  name,
  type,
  required,
}: {
  label: string
  name: string
  type: string
  required?: boolean
}) {
  return (
    <div>
      <label htmlFor={name} className="lh-label text-fg">
        {label}
        {required && <span className="lh-accent-text"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className={inputClass}
      />
    </div>
  )
}

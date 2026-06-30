import { useState } from 'react'
import { site } from '../site.config'

export default function Book() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <section className="bg-mist">
      <div className="mx-auto max-w-3xl px-5 py-24">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-ink sm:text-6xl">
            Book a Call
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted">
            Tell us a little about your business and we’ll be in touch to set up
            your audit.
          </p>
        </div>

        {/* TODO: embed scheduler (Calendly / Cal.com / Square) here */}
        <div className="mt-12 rounded-2xl border border-line bg-paper p-8 shadow-card">
          {submitted ? (
            <div className="py-10 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-2xl text-accent">
                ✓
              </div>
              <h2 className="mt-5 text-2xl font-bold text-ink">Thanks!</h2>
              <p className="mt-2 text-muted">
                We’ve got your details and will reach out at{' '}
                <span className="font-medium text-ink">{site.email}</span> soon.
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
                <label
                  htmlFor="goal"
                  className="block text-sm font-medium text-ink"
                >
                  What do you want AI to do for you?
                </label>
                <textarea
                  id="goal"
                  name="goal"
                  rows={4}
                  className="mt-2 w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-card transition-colors hover:bg-brand-dark"
              >
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
      <label htmlFor={name} className="block text-sm font-medium text-ink">
        {label}
        {required && <span className="text-brand"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
      />
    </div>
  )
}

import { useMemo, useState } from 'react'
import {
  bookingFocusAreas,
  bookingServiceGroups,
  bookingServices,
  bookingTimeSlots,
} from '../booking.config'
import BookingStepper from '../components/booking/BookingStepper'
import BookingCalendar, {
  formatDateKey,
} from '../components/booking/BookingCalendar'

type Details = {
  name: string
  email: string
  business: string
  phone: string
  notes: string
}

const emptyDetails: Details = {
  name: '',
  email: '',
  business: '',
  phone: '',
  notes: '',
}

const inputClass =
  'mt-2 w-full rounded-lg border border-line bg-surface px-4 py-3 text-sm text-fg outline-none transition-colors focus:border-green focus:ring-2 focus:ring-green/25'

export default function Book() {
  const [step, setStep] = useState(0)
  const [serviceId, setServiceId] = useState<string | null>(null)
  const [focus, setFocus] = useState<string[]>([])
  const [dateKey, setDateKey] = useState<string | null>(null)
  const [time, setTime] = useState<string | null>(null)
  const [details, setDetails] = useState<Details>(emptyDetails)
  const [submitted, setSubmitted] = useState(false)

  const service = useMemo(
    () => bookingServices.find((s) => s.id === serviceId) ?? null,
    [serviceId],
  )

  const toggleFocus = (id: string) =>
    setFocus((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    )

  const next = () => setStep((s) => Math.min(s + 1, 3))
  const back = () => setStep((s) => Math.max(s - 1, 0))

  const detailsValid =
    details.name.trim() !== '' && details.email.trim() !== ''

  const handleSubmit = () => {
    // TODO: persist the booking to Supabase here. Shape ready to insert:
    // { serviceId, focus, dateKey, time, ...details }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section className="bg-canvas">
        <div className="mx-auto max-w-2xl px-5 py-32 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green text-3xl text-white">
            ✓
          </div>
          <h1 className="lh-display-3 mt-8 text-fg">You’re booked</h1>
          <p className="mx-auto mt-5 max-w-md text-muted lh-body-lg">
            We’ve got your request for{' '}
            <span className="font-semibold text-fg">{service?.name}</span>
            {dateKey && (
              <>
                {' '}
                on{' '}
                <span className="font-semibold text-fg">
                  {formatDateKey(dateKey)}
                </span>
                {time && <> at {time}</>}
              </>
            )}
            . We’ll confirm by email at{' '}
            <span className="text-fg">{details.email}</span>.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-canvas">
      <div className="mx-auto max-w-3xl px-5 pb-24 pt-32">
        <div className="text-center">
          <h1 className="lh-display-3 text-fg">Let’s get you booked</h1>
          <p className="mx-auto mt-5 max-w-xl text-muted lh-body-lg">
            Pick what you need, choose a time, and we’ll take it from there.
          </p>
        </div>

        <div className="mt-12">
          <BookingStepper current={step} onStepClick={setStep} />
        </div>

        <div className="lh-surface-d-lg mt-12 p-6 sm:p-9">
          {/* STEP 1 — Service */}
          {step === 0 && (
            <div className="space-y-9">
              {bookingServiceGroups.map((group) => {
                const items = bookingServices.filter((s) => s.group === group.id)
                if (!items.length) return null
                return (
                  <div key={group.id}>
                    <div className="flex items-baseline justify-between">
                      <h2 className="lh-h4 text-fg">{group.title}</h2>
                      <span className="text-sm text-subtle">
                        {group.subtitle}
                      </span>
                    </div>
                    <div className="mt-4 space-y-3">
                      {items.map((s) => {
                        const selected = s.id === serviceId
                        return (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => {
                              setServiceId(s.id)
                              next()
                            }}
                            className={`flex w-full items-center gap-4 rounded-xl border p-5 text-left transition-colors ${
                              selected
                                ? 'border-green bg-green/5'
                                : 'border-line bg-surface hover:border-fg/30'
                            }`}
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-fg">
                                  {s.name}
                                </span>
                                {s.recommended && (
                                  <span className="rounded-full bg-green/10 px-2 py-0.5 text-xs font-semibold text-green">
                                    Recommended
                                  </span>
                                )}
                              </div>
                              <p className="mt-1 text-sm text-muted">{s.desc}</p>
                            </div>
                            <span className="shrink-0 text-sm font-semibold text-fg">
                              {s.price}
                            </span>
                            <Arrow />
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* STEP 2 — Focus areas */}
          {step === 1 && (
            <div>
              <h2 className="lh-h4 text-fg">
                Where do you want to focus?
              </h2>
              <p className="mt-2 text-sm text-muted">
                Optional — pick any that apply so we come prepared.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {bookingFocusAreas.map((f) => {
                  const selected = focus.includes(f.id)
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => toggleFocus(f.id)}
                      className={`flex items-start gap-3 rounded-xl border p-4 text-left transition-colors ${
                        selected
                          ? 'border-green bg-green/5'
                          : 'border-line bg-surface hover:border-fg/30'
                      }`}
                    >
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-xs text-white ${
                          selected
                            ? 'border-green bg-green'
                            : 'border-line bg-surface'
                        }`}
                      >
                        {selected && '✓'}
                      </span>
                      <span>
                        <span className="block font-semibold text-fg">
                          {f.label}
                        </span>
                        <span className="mt-0.5 block text-sm text-muted">
                          {f.desc}
                        </span>
                      </span>
                    </button>
                  )
                })}
              </div>
              <StepNav onBack={back} onNext={next} nextLabel="Continue" />
            </div>
          )}

          {/* STEP 3 — Date & Time */}
          {step === 2 && (
            <div>
              <h2 className="lh-h4 text-fg">Choose a date &amp; time</h2>
              {service && (
                <p className="mt-2 text-sm text-muted">
                  {service.name}
                  {focus.length > 0 &&
                    ` · ${focus.length} focus area${focus.length > 1 ? 's' : ''}`}
                </p>
              )}

              <div className="mt-7">
                <BookingCalendar value={dateKey} onSelect={setDateKey} />
              </div>

              {dateKey && (
                <div className="mt-8">
                  <h3 className="text-sm font-semibold text-fg">
                    Available times — {formatDateKey(dateKey)}
                  </h3>
                  <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {bookingTimeSlots.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTime(t)}
                        className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors ${
                          time === t
                            ? 'border-green bg-green text-white'
                            : 'border-line bg-surface text-fg hover:border-fg/30'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <StepNav
                onBack={back}
                onNext={next}
                nextLabel="Continue"
                nextDisabled={!dateKey || !time}
              />
            </div>
          )}

          {/* STEP 4 — Details */}
          {step === 3 && (
            <div>
              <h2 className="lh-h4 text-fg">Your details</h2>
              <p className="mt-2 text-sm text-muted">
                So we can confirm and send you the calendar invite.
              </p>

              {/* Summary */}
              <div className="lh-pressed-d mt-6 space-y-1.5 p-5 text-sm">
                <SummaryRow label="Service" value={service?.name ?? '—'} />
                {focus.length > 0 && (
                  <SummaryRow
                    label="Focus"
                    value={bookingFocusAreas
                      .filter((f) => focus.includes(f.id))
                      .map((f) => f.label)
                      .join(', ')}
                  />
                )}
                <SummaryRow
                  label="When"
                  value={
                    dateKey
                      ? `${formatDateKey(dateKey)}${time ? ` · ${time}` : ''}`
                      : '—'
                  }
                />
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Field
                  label="Name"
                  value={details.name}
                  onChange={(v) => setDetails((d) => ({ ...d, name: v }))}
                  required
                />
                <Field
                  label="Email"
                  type="email"
                  value={details.email}
                  onChange={(v) => setDetails((d) => ({ ...d, email: v }))}
                  required
                />
                <Field
                  label="Business"
                  value={details.business}
                  onChange={(v) => setDetails((d) => ({ ...d, business: v }))}
                />
                <Field
                  label="Phone"
                  type="tel"
                  value={details.phone}
                  onChange={(v) => setDetails((d) => ({ ...d, phone: v }))}
                />
              </div>
              <div className="mt-5">
                <label htmlFor="notes" className="lh-label text-fg">
                  Anything we should know?
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  value={details.notes}
                  onChange={(e) =>
                    setDetails((d) => ({ ...d, notes: e.target.value }))
                  }
                  className={inputClass}
                />
              </div>

              <StepNav
                onBack={back}
                onNext={handleSubmit}
                nextLabel="Confirm booking"
                nextDisabled={!detailsValid}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function StepNav({
  onBack,
  onNext,
  nextLabel,
  nextDisabled,
}: {
  onBack: () => void
  onNext: () => void
  nextLabel: string
  nextDisabled?: boolean
}) {
  return (
    <div className="mt-9 flex items-center justify-between">
      <button
        type="button"
        onClick={onBack}
        className="lh-btn lh-btn-ghost"
      >
        Back
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        className="lh-btn lh-btn-primary disabled:cursor-not-allowed disabled:opacity-40"
      >
        {nextLabel}
      </button>
    </div>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-subtle">{label}</span>
      <span className="text-right font-medium text-fg">{value}</span>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  required,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  required?: boolean
}) {
  return (
    <div>
      <label className="lh-label text-fg">
        {label}
        {required && <span className="lh-accent-text"> *</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      />
    </div>
  )
}

function Arrow() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 text-subtle"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

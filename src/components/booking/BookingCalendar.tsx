import { useState } from 'react'

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

/** Local YYYY-MM-DD key (avoids UTC off-by-one from toISOString). */
function dateKey(d: Date) {
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${m}-${day}`
}

interface Props {
  /** Selected day as a YYYY-MM-DD key, or null. */
  value: string | null
  onSelect: (key: string) => void
}

export default function BookingCalendar({ value, onSelect }: Props) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const [view, setView] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  })

  const firstOfMonth = new Date(view.year, view.month, 1)
  const startWeekday = firstOfMonth.getDay()
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate()

  // Don't allow paging before the current month.
  const atCurrentMonth =
    view.year === today.getFullYear() && view.month === today.getMonth()

  const step = (delta: number) =>
    setView((v) => {
      const d = new Date(v.year, v.month + delta, 1)
      return { year: d.getFullYear(), month: d.getMonth() }
    })

  const cells: (Date | null)[] = [
    ...Array.from({ length: startWeekday }, () => null),
    ...Array.from(
      { length: daysInMonth },
      (_, i) => new Date(view.year, view.month, i + 1),
    ),
  ]

  return (
    <div className="mx-auto max-w-sm">
      {/* Month header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => step(-1)}
          disabled={atCurrentMonth}
          aria-label="Previous month"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-fg transition-colors hover:border-fg/40 disabled:cursor-not-allowed disabled:opacity-30"
        >
          ‹
        </button>
        <span className="font-semibold text-fg">
          {MONTHS[view.month]} {view.year}
        </span>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next month"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-fg transition-colors hover:border-fg/40"
        >
          ›
        </button>
      </div>

      {/* Weekday labels */}
      <div className="mt-5 grid grid-cols-7 gap-1 text-center text-xs font-medium text-subtle">
        {WEEKDAYS.map((w) => (
          <span key={w}>{w}</span>
        ))}
      </div>

      {/* Day grid */}
      <div className="mt-2 grid grid-cols-7 gap-1">
        {cells.map((d, i) => {
          if (!d) return <span key={`e${i}`} />
          const key = dateKey(d)
          const isPast = d < today
          const isSelected = key === value
          return (
            <button
              key={key}
              type="button"
              disabled={isPast}
              onClick={() => onSelect(key)}
              className={`flex h-10 items-center justify-center rounded-lg text-sm transition-colors ${
                isSelected
                  ? 'bg-green font-semibold text-white'
                  : isPast
                    ? 'cursor-not-allowed text-subtle/40'
                    : 'text-fg hover:bg-green/10'
              }`}
            >
              {d.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/** Format a YYYY-MM-DD key into a friendly label, e.g. "Thu, Jul 2". */
export function formatDateKey(key: string) {
  const [y, m, d] = key.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

import { bookingSteps } from '../../booking.config'

interface Props {
  /** 0-based index of the active step. */
  current: number
  /** Jump back to an already-completed step. */
  onStepClick?: (index: number) => void
}

export default function BookingStepper({ current, onStepClick }: Props) {
  return (
    <ol className="mx-auto flex max-w-xl items-center">
      {bookingSteps.map((label, i) => {
        const done = i < current
        const active = i === current
        const clickable = done && onStepClick
        return (
          <li
            key={label}
            className={`flex items-center ${i < bookingSteps.length - 1 ? 'flex-1' : ''}`}
          >
            <div className="flex flex-col items-center gap-2">
              <button
                type="button"
                disabled={!clickable}
                onClick={() => clickable && onStepClick(i)}
                className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold transition-colors ${
                  active || done
                    ? 'border-green bg-green text-white'
                    : 'border-line bg-surface text-subtle'
                } ${clickable ? 'cursor-pointer' : 'cursor-default'}`}
              >
                {done ? '✓' : i + 1}
              </button>
              <span
                className={`text-xs font-medium ${active || done ? 'text-fg' : 'text-subtle'}`}
              >
                {label}
              </span>
            </div>
            {i < bookingSteps.length - 1 && (
              <span
                className={`mx-2 mb-6 h-px flex-1 ${done ? 'bg-green' : 'bg-line'}`}
              />
            )}
          </li>
        )
      })}
    </ol>
  )
}

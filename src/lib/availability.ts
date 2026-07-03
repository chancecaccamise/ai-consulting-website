import { appointmentDurationMin, bookingTimeSlots } from '../booking.config'

/**
 * Parse a slot label like "9:00 AM" or "1:00 PM" into minutes since midnight.
 * Returns NaN for anything that doesn't match, so callers can filter it out.
 */
export function parseTimeLabel(label: string): number {
  const m = label.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
  if (!m) return NaN
  let hours = Number(m[1]) % 12
  if (m[3].toUpperCase() === 'PM') hours += 12
  return hours * 60 + Number(m[2])
}

/**
 * Given the start-time labels already occupied on a day (active bookings +
 * manual blocks), return the set of slot labels a new booking cannot use.
 *
 * Every appointment reserves `durationMin` minutes, so two slots collide when
 * their start times are less than `durationMin` apart. With the default hourly
 * grid this just blocks the exact slot that's taken; if the grid is ever made
 * finer-grained, overlapping slots are blocked too.
 */
export function unavailableSlotSet(
  occupiedLabels: Iterable<string>,
  durationMin: number = appointmentDurationMin,
  slots: readonly string[] = bookingTimeSlots,
): Set<string> {
  const occupied = [...occupiedLabels]
    .map(parseTimeLabel)
    .filter((n) => !Number.isNaN(n))

  const result = new Set<string>()
  for (const slot of slots) {
    const start = parseTimeLabel(slot)
    if (Number.isNaN(start)) continue
    if (occupied.some((o) => Math.abs(o - start) < durationMin)) {
      result.add(slot)
    }
  }
  return result
}

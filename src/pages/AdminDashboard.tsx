import { useState } from 'react'
import { bookingServices } from '../booking.config'

// NOTE: Design shell only. Bookings are hard-coded sample rows so we can lay out
// the dashboard. When Supabase is wired up:
//   1. Gate this route behind auth (Supabase session).
//   2. Replace `sampleBookings` with a `bookings` table query.
//   3. Wire the status control to an update mutation.

type BookingStatus = 'new' | 'confirmed' | 'completed' | 'cancelled'

type BookingRow = {
  id: string
  name: string
  email: string
  business: string
  serviceId: string
  date: string
  time: string
  status: BookingStatus
}

const sampleBookings: BookingRow[] = [
  {
    id: '1',
    name: 'Dana Reed',
    email: 'dana@brightsidehvac.com',
    business: 'Brightside HVAC',
    serviceId: 'ai-audit',
    date: 'Jul 8, 2026',
    time: '10:00 AM',
    status: 'new',
  },
  {
    id: '2',
    name: 'Marcus Lee',
    email: 'marcus@leelogistics.co',
    business: 'Lee Logistics',
    serviceId: 'done-for-you',
    date: 'Jul 9, 2026',
    time: '2:00 PM',
    status: 'confirmed',
  },
  {
    id: '3',
    name: 'Priya Shah',
    email: 'priya@shahdental.com',
    business: 'Shah Dental',
    serviceId: 'team-training',
    date: 'Jul 11, 2026',
    time: '1:00 PM',
    status: 'confirmed',
  },
  {
    id: '4',
    name: 'Tom Byrne',
    email: 'tom@byrnebuilds.com',
    business: 'Byrne Builds',
    serviceId: 'consulting',
    date: 'Jul 3, 2026',
    time: '9:00 AM',
    status: 'completed',
  },
]

const statusStyle: Record<BookingStatus, string> = {
  new: 'bg-green/10 text-green',
  confirmed: 'bg-blue-500/10 text-blue-600',
  completed: 'bg-fg/10 text-fg',
  cancelled: 'bg-red-500/10 text-red-600',
}

const FILTERS: ('all' | BookingStatus)[] = [
  'all',
  'new',
  'confirmed',
  'completed',
  'cancelled',
]

const serviceName = (id: string) =>
  bookingServices.find((s) => s.id === id)?.name ?? id

export default function AdminDashboard() {
  const [filter, setFilter] = useState<'all' | BookingStatus>('all')

  const rows =
    filter === 'all'
      ? sampleBookings
      : sampleBookings.filter((b) => b.status === filter)

  const stats = [
    { label: 'Total bookings', value: sampleBookings.length },
    {
      label: 'New',
      value: sampleBookings.filter((b) => b.status === 'new').length,
    },
    {
      label: 'Confirmed',
      value: sampleBookings.filter((b) => b.status === 'confirmed').length,
    },
    {
      label: 'Completed',
      value: sampleBookings.filter((b) => b.status === 'completed').length,
    },
  ]

  return (
    <section className="bg-canvas min-h-screen">
      <div className="mx-auto max-w-[80rem] px-5 pb-24 pt-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="lh-eyebrow lh-accent-text">Admin</span>
            <h1 className="lh-h1 mt-2 text-fg">Bookings</h1>
          </div>
          <span className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-subtle">
            Sample data · connect Supabase to go live
          </span>
        </div>

        {/* Stat tiles */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="lh-surface-d p-6">
              <div className="font-display text-4xl font-black text-fg">
                {s.value}
              </div>
              <div className="mt-1 text-sm text-muted">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="mt-10 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
                filter === f
                  ? 'border-green bg-green text-white'
                  : 'border-line bg-surface text-muted hover:border-fg/30'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="lh-surface-d-lg mt-5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[46rem] text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs uppercase tracking-wide text-subtle">
                  <th className="px-6 py-4 font-semibold">Client</th>
                  <th className="px-6 py-4 font-semibold">Service</th>
                  <th className="px-6 py-4 font-semibold">When</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((b) => (
                  <tr
                    key={b.id}
                    className="border-b border-line last:border-0 transition-colors hover:bg-canvas"
                  >
                    <td className="px-6 py-4">
                      <div className="font-semibold text-fg">{b.name}</div>
                      <div className="text-muted">{b.business}</div>
                      <div className="text-xs text-subtle">{b.email}</div>
                    </td>
                    <td className="px-6 py-4 text-fg">
                      {serviceName(b.serviceId)}
                    </td>
                    <td className="px-6 py-4 text-fg">
                      {b.date}
                      <span className="text-subtle"> · {b.time}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyle[b.status]}`}
                      >
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-12 text-center text-muted"
                    >
                      No bookings in this view.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

import { useCallback, useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import type { Session } from '@supabase/supabase-js'
import { bookingServices } from '../booking.config'
import { supabase } from '../lib/supabase'
import { formatDateKey } from '../components/booking/BookingCalendar'

type BookingStatus = 'new' | 'confirmed' | 'completed' | 'cancelled'

type BookingRow = {
  id: string
  created_at: string
  service_id: string
  focus: string[]
  date: string
  time: string
  name: string
  email: string
  business: string | null
  phone: string | null
  notes: string | null
  status: BookingStatus
}

const STATUSES: BookingStatus[] = ['new', 'confirmed', 'completed', 'cancelled']

const statusStyle: Record<BookingStatus, string> = {
  new: 'bg-green/10 text-green',
  confirmed: 'bg-blue-500/10 text-blue-600',
  completed: 'bg-fg/10 text-fg',
  cancelled: 'bg-red-500/10 text-red-600',
}

const FILTERS: ('all' | BookingStatus)[] = ['all', ...STATUSES]

const serviceName = (id: string) =>
  bookingServices.find((s) => s.id === id)?.name ?? id

export default function AdminDashboard() {
  const [session, setSession] = useState<Session | null>(null)
  const [checkingAuth, setCheckingAuth] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setCheckingAuth(false)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s)
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  if (checkingAuth) {
    return (
      <section className="bg-canvas min-h-screen">
        <div className="mx-auto max-w-[80rem] px-5 pt-32 text-muted">Loading…</div>
      </section>
    )
  }

  if (!session) return <Login />

  return <Dashboard email={session.user.email ?? ''} />
}

// ---------------------------------------------------------------------------
// Login gate
// ---------------------------------------------------------------------------
function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })
    setSubmitting(false)
    if (signInError) setError('Incorrect email or password.')
    // On success, onAuthStateChange updates the session and swaps the view.
  }

  return (
    <section className="bg-canvas min-h-screen">
      <div className="mx-auto flex max-w-md flex-col px-5 pt-32">
        <span className="lh-eyebrow lh-accent-text">Admin</span>
        <h1 className="lh-h2 mt-2 text-fg">Sign in</h1>
        <p className="mt-2 text-sm text-muted">
          Enter your admin credentials to view bookings.
        </p>

        <form onSubmit={handleSubmit} className="lh-surface-d-lg mt-8 space-y-5 p-6">
          <div>
            <label className="lh-label text-fg" htmlFor="admin-email">
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-lg border border-line bg-surface px-4 py-3 text-sm text-fg outline-none transition-colors focus:border-green focus:ring-2 focus:ring-green/25"
            />
          </div>
          <div>
            <label className="lh-label text-fg" htmlFor="admin-password">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-lg border border-line bg-surface px-4 py-3 text-sm text-fg outline-none transition-colors focus:border-green focus:ring-2 focus:ring-green/25"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="lh-btn lh-btn-primary w-full disabled:cursor-not-allowed disabled:opacity-40"
          >
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Dashboard (authenticated)
// ---------------------------------------------------------------------------
function Dashboard({ email }: { email: string }) {
  const [bookings, setBookings] = useState<BookingRow[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | BookingStatus>('all')

  const load = useCallback(async () => {
    setLoading(true)
    setLoadError(null)
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('date', { ascending: false })
      .order('created_at', { ascending: false })
    setLoading(false)
    if (error) {
      setLoadError('Could not load bookings.')
      return
    }
    setBookings((data ?? []) as BookingRow[])
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const updateStatus = async (id: string, status: BookingStatus) => {
    const prev = bookings
    // Optimistic update.
    setBookings((rows) =>
      rows.map((r) => (r.id === id ? { ...r, status } : r)),
    )
    const { error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', id)
    if (error) setBookings(prev) // roll back on failure
  }

  const rows =
    filter === 'all' ? bookings : bookings.filter((b) => b.status === filter)

  const stats = [
    { label: 'Total bookings', value: bookings.length },
    { label: 'New', value: bookings.filter((b) => b.status === 'new').length },
    {
      label: 'Confirmed',
      value: bookings.filter((b) => b.status === 'confirmed').length,
    },
    {
      label: 'Completed',
      value: bookings.filter((b) => b.status === 'completed').length,
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
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={load}
              className="rounded-full border border-line bg-surface px-4 py-1.5 text-sm font-medium text-muted transition-colors hover:border-fg/30"
            >
              Refresh
            </button>
            <span className="text-sm text-subtle">{email}</span>
            <button
              type="button"
              onClick={() => supabase.auth.signOut()}
              className="rounded-full border border-line bg-surface px-4 py-1.5 text-sm font-medium text-muted transition-colors hover:border-fg/30"
            >
              Sign out
            </button>
          </div>
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
                      {b.business && (
                        <div className="text-muted">{b.business}</div>
                      )}
                      <div className="text-xs text-subtle">{b.email}</div>
                      {b.phone && (
                        <div className="text-xs text-subtle">{b.phone}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-fg">
                      {serviceName(b.service_id)}
                    </td>
                    <td className="px-6 py-4 text-fg">
                      {formatDateKey(b.date)}
                      <span className="text-subtle"> · {b.time}</span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={b.status}
                        onChange={(e) =>
                          updateStatus(b.id, e.target.value as BookingStatus)
                        }
                        className={`cursor-pointer rounded-full border-0 px-3 py-1 text-xs font-semibold capitalize outline-none ${statusStyle[b.status]}`}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
                {!loading && rows.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-muted">
                      {loadError ?? 'No bookings in this view.'}
                    </td>
                  </tr>
                )}
                {loading && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-muted">
                      Loading bookings…
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

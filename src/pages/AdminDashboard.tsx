import { useCallback, useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import type { Session } from '@supabase/supabase-js'
import { bookingServices, bookingTimeSlots } from '../booking.config'
import { supabase } from '../lib/supabase'
import BookingCalendar, {
  formatDateKey,
} from '../components/booking/BookingCalendar'

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

/** Local YYYY-MM-DD key for "today" (matches BookingCalendar's format). */
function todayKey() {
  const d = new Date()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${m}-${day}`
}

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

    const missingEnv =
      !import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY
    if (missingEnv) {
      setSubmitting(false)
      setError(
        'Supabase credentials are not loaded. Fill in .env.local and restart the dev server.',
      )
      return
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })
    setSubmitting(false)
    if (signInError) {
      // Surface the real reason (e.g. "Email not confirmed", "Invalid login
      // credentials") instead of masking every failure as a bad password.
      console.error('[admin sign-in]', signInError)
      setError(signInError.message)
    }
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
// Dashboard shell (authenticated) — hosts the tabbed views
// ---------------------------------------------------------------------------
function Dashboard({ email }: { email: string }) {
  const [tab, setTab] = useState<'bookings' | 'availability'>('bookings')

  return (
    <section className="bg-canvas min-h-screen">
      <div className="mx-auto max-w-[80rem] px-5 pb-24 pt-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="lh-eyebrow lh-accent-text">Admin</span>
            <h1 className="lh-h1 mt-2 text-fg">Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
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

        {/* Tabs */}
        <div className="mt-8 flex gap-1 border-b border-line">
          {(['bookings', 'availability'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`-mb-px border-b-2 px-4 py-2.5 text-sm font-semibold capitalize transition-colors ${
                tab === t
                  ? 'border-green text-fg'
                  : 'border-transparent text-muted hover:text-fg'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === 'bookings' ? <BookingsTab /> : <AvailabilityManager />}
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Bookings tab — live table with per-row status control
// ---------------------------------------------------------------------------
function BookingsTab() {
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
    setBookings((rows) => rows.map((r) => (r.id === id ? { ...r, status } : r)))
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
    <>
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

      {/* Filters + refresh */}
      <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
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
        <button
          type="button"
          onClick={load}
          className="rounded-full border border-line bg-surface px-4 py-1.5 text-sm font-medium text-muted transition-colors hover:border-fg/30"
        >
          Refresh
        </button>
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
                    {b.business && <div className="text-muted">{b.business}</div>}
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
    </>
  )
}

// ---------------------------------------------------------------------------
// Availability tab — block/unblock time slots per date
// ---------------------------------------------------------------------------
function AvailabilityManager() {
  const [dateKey, setDateKey] = useState<string>(todayKey())
  const [booked, setBooked] = useState<Map<string, string>>(new Map())
  const [blocked, setBlocked] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(false)
  const [busy, setBusy] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async (d: string) => {
    setLoading(true)
    setError(null)
    const [bookingsRes, blocksRes] = await Promise.all([
      supabase
        .from('bookings')
        .select('time,name,status')
        .eq('date', d)
        .neq('status', 'cancelled'),
      supabase.from('blocked_slots').select('time').eq('date', d),
    ])
    setLoading(false)
    if (bookingsRes.error || blocksRes.error) {
      setError('Could not load availability.')
      return
    }
    const bookedMap = new Map<string, string>()
    for (const r of (bookingsRes.data ?? []) as { time: string; name: string }[]) {
      bookedMap.set(r.time, r.name)
    }
    setBooked(bookedMap)
    setBlocked(
      new Set(((blocksRes.data ?? []) as { time: string }[]).map((r) => r.time)),
    )
  }, [])

  useEffect(() => {
    load(dateKey)
  }, [dateKey, load])

  const block = async (t: string) => {
    setBusy(t)
    setError(null)
    const { error: insertError } = await supabase
      .from('blocked_slots')
      .insert({ date: dateKey, time: t })
    setBusy(null)
    if (insertError) {
      setError('Could not block that slot.')
      return
    }
    setBlocked((prev) => new Set(prev).add(t))
  }

  const unblock = async (t: string) => {
    setBusy(t)
    setError(null)
    const { error: deleteError } = await supabase
      .from('blocked_slots')
      .delete()
      .eq('date', dateKey)
      .eq('time', t)
    setBusy(null)
    if (deleteError) {
      setError('Could not unblock that slot.')
      return
    }
    setBlocked((prev) => {
      const next = new Set(prev)
      next.delete(t)
      return next
    })
  }

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[auto_1fr]">
      {/* Calendar */}
      <div className="lh-surface-d p-6">
        <h2 className="lh-h4 text-fg">Pick a date</h2>
        <p className="mt-1 text-sm text-muted">
          Block the times you’re not available.
        </p>
        <div className="mt-5">
          <BookingCalendar value={dateKey} onSelect={setDateKey} />
        </div>
      </div>

      {/* Slots for the selected date */}
      <div className="lh-surface-d-lg p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="lh-h4 text-fg">{formatDateKey(dateKey)}</h2>
          <button
            type="button"
            onClick={() => load(dateKey)}
            className="rounded-full border border-line bg-surface px-4 py-1.5 text-sm font-medium text-muted transition-colors hover:border-fg/30"
          >
            Refresh
          </button>
        </div>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        {loading ? (
          <p className="mt-6 text-sm text-muted">Loading…</p>
        ) : (
          <ul className="mt-6 divide-y divide-line">
            {bookingTimeSlots.map((t) => {
              const bookedName = booked.get(t)
              const isBlocked = blocked.has(t)
              return (
                <li
                  key={t}
                  className="flex items-center justify-between gap-4 py-3"
                >
                  <div>
                    <span className="font-medium text-fg">{t}</span>
                    {bookedName && (
                      <span className="ml-3 text-sm text-muted">
                        {bookedName}
                      </span>
                    )}
                  </div>
                  {bookedName ? (
                    <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-600">
                      Booked
                    </span>
                  ) : isBlocked ? (
                    <button
                      type="button"
                      disabled={busy === t}
                      onClick={() => unblock(t)}
                      className="rounded-full border border-red-500/30 bg-red-500/5 px-4 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:border-red-500/50 disabled:opacity-40"
                    >
                      Blocked — click to unblock
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={busy === t}
                      onClick={() => block(t)}
                      className="rounded-full border border-line bg-surface px-4 py-1.5 text-xs font-semibold text-fg transition-colors hover:border-fg/30 disabled:opacity-40"
                    >
                      Block
                    </button>
                  )}
                </li>
              )
            })}
          </ul>
        )}

        <p className="mt-6 text-xs text-subtle">
          Booked slots are reserved automatically (each holds a{' '}
          {/* keep in sync with appointmentDurationMin */}45-minute window). Block
          anything else you want to keep free.
        </p>
      </div>
    </div>
  )
}

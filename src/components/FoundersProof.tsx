import { Link } from 'react-router-dom'

// Credibility section: "we ran AI inside our own businesses first". Two columns
// — left is a photo with overlay proof stats, right is a product-style mockup
// plus the narrative and a link to the proof page. On-brand (green), no glow.

// Placeholder bar heights for the "time saved" mockup chart (% of track).
const BARS = [38, 52, 44, 66, 58, 88, 72, 80]
const BAR_HIGHLIGHT = 5

// Founder/team avatar placeholders (swap for real headshots later).
const AVATARS = [
  'from-[#0e4f47] to-[#10b981]',
  'from-[#1e293b] to-[#334155]',
  'from-[#06231f] to-[#047857]',
  'from-[#2a2440] to-[#3b3357]',
]

export default function FoundersProof() {
  return (
    <section className="bg-canvas">
      <div className="mx-auto max-w-[90rem] px-5 py-24">
        <p className="lh-h2 max-w-3xl text-fg">
          We learned AI the hard way, so you don&rsquo;t have to.
        </p>

        <div className="mt-14 grid items-stretch gap-8 lg:grid-cols-[1.4fr_1fr]">
          {/* Left: photo with overlay proof. Swap the gradient for a real
              team/office photo when available. */}
          <div className="relative min-h-[460px] overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f2c25] via-[#0b3b2e] to-[#04231f]">
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/25" />

            {/* stat overlay */}
            <div className="absolute right-6 top-6 rounded-2xl bg-white/10 px-6 py-5 backdrop-blur-md ring-1 ring-white/20">
              <p className="font-display text-4xl font-black leading-none text-white">
                10+ hrs
              </p>
              <p className="lh-mono mt-2 text-[11px] uppercase tracking-[0.18em] text-white/70">
                saved every week
              </p>
            </div>

            {/* proof bar */}
            <div className="absolute inset-x-4 bottom-4 flex items-center gap-4 rounded-2xl bg-green px-5 py-4">
              <div className="flex -space-x-2.5">
                {AVATARS.map((g) => (
                  <span
                    key={g}
                    className={`h-8 w-8 rounded-full bg-gradient-to-br ${g} ring-2 ring-[#059669]`}
                  />
                ))}
              </div>
              <p className="text-sm font-semibold text-white">
                Proven in our own businesses first
              </p>
            </div>
          </div>

          {/* Right: mockup + narrative */}
          <div className="flex flex-col">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#10b981] to-[#047857] p-6">
              <div className="w-4/5 rounded-2xl bg-white px-5 py-4 shadow-[0_12px_30px_rgba(0,0,0,0.16)]">
                <p className="text-sm text-muted">Time reclaimed</p>
                <p className="mt-1 font-display text-3xl font-black text-fg">
                  42 hrs
                  <span className="text-base font-semibold text-muted"> / mo</span>
                </p>
              </div>
              <div className="mt-6 flex h-24 items-end gap-2">
                {BARS.map((h, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-t ${
                      i === BAR_HIGHLIGHT ? 'bg-white' : 'bg-white/35'
                    }`}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>

            <h3 className="lh-h4 mt-8 text-fg">
              Built in our own business first
            </h3>
            <p className="mt-4 text-muted lh-body-lg">
              Before we recommend anything, we run it inside our own companies:
              automating the busywork, tightening the systems we depend on, and
              buying back hours every week. What you get is the exact playbook we
              already proved on ourselves, not theory.
            </p>
            <Link
              to="/proof"
              className="group mt-6 inline-flex items-center gap-2 font-semibold text-green"
            >
              See what we&rsquo;ve built
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                <path d="M7 17L17 7M9 7h8v8" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { caseStudies } from '../site.config'

// Dark gradient placeholders stand in for project imagery (swap a real image
// in per card later). Each card cycles through one for visual variety.
const gradients = [
  'linear-gradient(155deg, #0b3b2e, #047857)',
  'linear-gradient(155deg, #1e293b, #334155)',
  'linear-gradient(155deg, #1a1a1a, #2b2b2b)',
  'linear-gradient(155deg, #06231f, #0e4f47)',
  'linear-gradient(155deg, #2a2440, #3b3357)',
]

function Chevron({ dir }: { dir: 'left' | 'right' }) {
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
    >
      {dir === 'left' ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 6l6 6-6 6" />}
    </svg>
  )
}

export default function ProjectsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const cardStep = () => {
    const t = trackRef.current
    if (!t || !t.firstElementChild) return 0
    const first = t.firstElementChild as HTMLElement
    const gap = parseFloat(getComputedStyle(t).columnGap || '0') || 0
    return first.offsetWidth + gap
  }

  const handleScroll = () => {
    const t = trackRef.current
    const step = cardStep()
    if (t && step) setActive(Math.round(t.scrollLeft / step))
  }

  const go = (i: number) => {
    const t = trackRef.current
    const step = cardStep()
    if (!t || !step) return
    const idx = Math.max(0, Math.min(caseStudies.length - 1, i))
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    t.scrollTo({ left: idx * step, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <section className="bg-canvas">
      <div className="mx-auto max-w-6xl px-5 py-24">
        {/* Header */}
        <div className="flex items-end justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="lh-h1 text-fg">Projects &amp; results</h2>
            <p className="mt-5 text-muted lh-body-lg">
              A sample of what we’ve shipped for businesses like yours. The same
              capabilities we bring to your audit, training, and builds.
            </p>
          </div>
          <div className="hidden shrink-0 gap-3 md:flex">
            <button
              type="button"
              onClick={() => go(active - 1)}
              aria-label="Previous project"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-fg transition-colors hover:border-fg/40"
            >
              <Chevron dir="left" />
            </button>
            <button
              type="button"
              onClick={() => go(active + 1)}
              aria-label="Next project"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-fg transition-colors hover:border-fg/40"
            >
              <Chevron dir="right" />
            </button>
          </div>
        </div>

        {/* Track */}
        <div className="relative mt-12">
          <div
            ref={trackRef}
            onScroll={handleScroll}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {caseStudies.map((cs, i) => (
              <Link
                key={cs.name}
                to="/proof"
                className="group relative h-[420px] w-[85%] shrink-0 snap-start overflow-hidden rounded-2xl sm:w-[360px] md:w-[380px]"
                style={{ background: gradients[i % gradients.length] }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
                <span className="absolute left-5 top-5 z-10 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                  {cs.number} {cs.metric}
                </span>
                <div className="absolute inset-x-0 bottom-0 z-10 p-7">
                  <span className="lh-eyebrow !text-white/60">{cs.tag}</span>
                  <h3 className="lh-h4 mt-2 text-white">{cs.name}</h3>
                  <p className="mt-3 text-sm text-white/70">{cs.summary}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white">
                    Read more
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-transform group-hover:translate-x-1"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Side arrows */}
          <button
            type="button"
            onClick={() => go(active - 1)}
            aria-label="Previous project"
            className="absolute left-1 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#1a1a1a] text-white shadow-lg transition-transform hover:scale-105"
          >
            <Chevron dir="left" />
          </button>
          <button
            type="button"
            onClick={() => go(active + 1)}
            aria-label="Next project"
            className="absolute right-1 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#1a1a1a] text-white shadow-lg transition-transform hover:scale-105"
          >
            <Chevron dir="right" />
          </button>
        </div>

        {/* Dots */}
        <div className="mt-8 flex justify-center gap-2">
          {caseStudies.map((cs, i) => (
            <button
              key={cs.name}
              type="button"
              aria-label={`Go to project ${i + 1}`}
              onClick={() => go(i)}
              className={`h-2 rounded-full transition-all ${
                active === i ? 'w-6 bg-green' : 'w-2 bg-fg/20 hover:bg-fg/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

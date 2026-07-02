import { Link, Navigate, useParams } from 'react-router-dom'
import CTABand from '../components/CTABand'
import { bookCta, caseStudies } from '../site.config'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = caseStudies.find((cs) => cs.slug === slug)

  if (!project) return <Navigate to="/proof" replace />

  return (
    <>
      {/* Title + hero image first */}
      <section className="bg-canvas">
        <div className="mx-auto max-w-[72rem] px-5 pb-12 pt-28">
          <Link
            to="/proof"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-fg"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M11 18l-6-6 6-6" />
            </svg>
            All projects
          </Link>

          <div className="mt-8 flex flex-col gap-4">
            <h1 className="lh-display-3 text-fg">{project.name}</h1>
            <p className="max-w-2xl text-muted lh-body-lg">{project.summary}</p>
          </div>

          <div
            className="mt-10 h-[300px] w-full overflow-hidden rounded-3xl sm:h-[440px]"
            style={{ background: project.gradient }}
          />
        </div>
      </section>

      {/* Details underneath: overview, services, results, gallery */}
      <section className="bg-surface">
        <div className="mx-auto max-w-[72rem] px-5 py-16">
          <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
            {/* Overview */}
            <div>
              <h2 className="lh-h3 text-fg">The project</h2>
              <p className="mt-5 text-muted lh-body-lg">{project.overview}</p>
            </div>

            {/* Services */}
            <div>
              <h2 className="lh-h3 text-fg">What we did</h2>
              <ul className="mt-5 space-y-3">
                {project.services.map((s) => (
                  <li key={s} className="flex items-start gap-3 text-fg/85">
                    <span className="lh-accent-text mt-0.5">✓</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Results */}
          <div className="mt-16">
            <h2 className="lh-h3 text-fg">The results</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {project.results.map((r) => (
                <div
                  key={r.label}
                  className="lh-surface-d flex flex-col items-center rounded-2xl p-8 text-center"
                >
                  <span className="font-display text-4xl font-black uppercase text-green">
                    {r.value}
                  </span>
                  <span className="mt-2 text-sm text-muted">{r.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery */}
          <div className="mt-16">
            <div className="grid gap-5 sm:grid-cols-3">
              {project.gallery.map((g, i) => (
                <div
                  key={i}
                  className="h-56 w-full overflow-hidden rounded-2xl"
                  style={{ background: g }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTABand
        title="Want results like these?"
        subtitle="Start with an audit and we’ll map your highest-leverage opportunity."
        cta={bookCta}
      />
    </>
  )
}

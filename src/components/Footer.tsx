import { Link } from 'react-router-dom'
import { nav, site, primaryCta, bookCta } from '../site.config'

export default function Footer() {
  const year = 2026 // static build; update or compute as needed
  return (
    <footer className="border-t border-line bg-mist">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-xs">
            <div className="text-lg font-bold text-ink">{site.name}</div>
            <p className="mt-3 text-sm text-muted">{site.promise}</p>
          </div>

          <nav className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">
              Explore
            </span>
            {[primaryCta, ...nav, bookCta].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-sm text-ink/80 transition-colors hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">
              Contact
            </span>
            <a
              href={`mailto:${site.email}`}
              className="text-sm text-ink/80 transition-colors hover:text-ink"
            >
              {site.email}
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:justify-between">
          <span>
            © {year} {site.name}. All rights reserved.
          </span>
          <span>Built for local small businesses.</span>
        </div>
      </div>
    </footer>
  )
}

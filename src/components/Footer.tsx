import { Link } from 'react-router-dom'
import { nav, site, primaryCta, bookCta } from '../site.config'
import markBlack from '/brand/lh-mark-black.png'

export default function Footer() {
  const year = 2026 // static build; update or compute as needed
  return (
    <footer className="border-t border-line bg-canvas">
      <div className="mx-auto max-w-[90rem] px-5 py-16">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div className="max-w-xs">
            <div className="flex items-center gap-3">
              <img
                src={markBlack}
                alt=""
                className="h-8 w-8 object-contain"
                width={32}
                height={32}
              />
              <span className="font-display text-base font-black uppercase tracking-tight text-fg">
                {site.name}
              </span>
            </div>
            <p className="mt-4 text-sm text-muted">{site.promise}</p>
          </div>

          <nav className="flex flex-col gap-3">
            <span className="lh-eyebrow">Explore</span>
            {[primaryCta, ...nav, bookCta].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-sm text-muted transition-colors hover:text-fg"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <span className="lh-eyebrow">Contact</span>
            <a
              href={`mailto:${site.email}`}
              className="text-sm text-muted transition-colors hover:text-fg"
            >
              {site.email}
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-line pt-6 text-xs text-subtle sm:flex-row sm:justify-between">
          <span>
            © {year} {site.studio}. All rights reserved.
          </span>
          <div className="flex items-center gap-4">
            <span>Built for local small businesses.</span>
            <Link to="/admin" className="transition-colors hover:text-fg">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

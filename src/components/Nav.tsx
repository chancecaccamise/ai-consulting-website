import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { nav, primaryCta, site } from '../site.config'
import Button from './Button'
import markBlack from '/brand/lh-mark-black.png'

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/80 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5">
        <Link
          to="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <img
            src={markBlack}
            alt=""
            className="h-8 w-8 object-contain"
            width={32}
            height={32}
          />
          <span className="flex flex-col leading-none">
            <span className="font-display text-base font-black uppercase tracking-tight text-fg">
              {site.name}
            </span>
            <span className="lh-eyebrow !text-[9px] !tracking-[0.22em] text-subtle">
              {site.studio}
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-9 md:flex">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `lh-label transition-colors hover:text-fg ${
                  isActive ? 'text-green' : 'text-muted'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <Button to={primaryCta.to}>{primaryCta.label}</Button>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-fg md:hidden"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-line bg-canvas px-5 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `lh-label rounded-lg px-3 py-3 ${
                    isActive ? 'text-green' : 'text-muted'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Button to={primaryCta.to} className="mt-3 w-full">
              {primaryCta.label}
            </Button>
          </div>
        </nav>
      )}
    </header>
  )
}

import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { nav, primaryCta, site } from '../site.config'
import Button from './Button'
import markBlack from '/brand/lh-mark-black.png'
import markWhite from '/brand/lh-mark-white.png'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  // On the home page the nav overlays the dark beam hero. Track when we've
  // scrolled past it so the nav can flip from transparent/light-text to the
  // solid light bar. Other pages are always solid.
  useEffect(() => {
    if (!isHome) {
      setScrolled(false)
      return
    }
    const onScroll = () => {
      const threshold = window.innerHeight * 0.85 - 64
      setScrolled(window.scrollY > threshold)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  // Transparent, light-on-dark treatment only while over the hero and the
  // mobile menu is closed.
  const overHero = isHome && !scrolled && !open

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        overHero
          ? 'border-b border-transparent bg-transparent'
          : 'border-b border-line bg-canvas/80 backdrop-blur-md'
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5">
        <Link
          to="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <img
            src={overHero ? markWhite : markBlack}
            alt=""
            className="h-8 w-8 object-contain"
            width={32}
            height={32}
          />
          <span className="flex flex-col leading-none">
            <span
              className={`font-display text-base font-black uppercase tracking-tight ${
                overHero ? 'text-white' : 'text-fg'
              }`}
            >
              {site.name}
            </span>
            <span
              className={`lh-eyebrow !text-[9px] !tracking-[0.22em] ${
                overHero ? 'text-white/60' : 'text-subtle'
              }`}
            >
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
                `lh-label transition-colors ${
                  isActive
                    ? overHero
                      ? 'text-[#10b981]'
                      : 'text-green'
                    : overHero
                      ? 'text-white/80 hover:text-white'
                      : 'text-muted hover:text-fg'
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
          className={`flex h-10 w-10 items-center justify-center rounded-lg md:hidden ${
            overHero ? 'text-white' : 'text-fg'
          }`}
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

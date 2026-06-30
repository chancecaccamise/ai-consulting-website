import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

const styles: Record<Variant, string> = {
  primary:
    'bg-brand text-white hover:bg-brand-dark shadow-card focus-visible:ring-brand',
  secondary:
    'bg-ink text-white hover:bg-ink-soft focus-visible:ring-ink',
  ghost:
    'bg-transparent text-ink border border-line hover:border-ink hover:bg-mist focus-visible:ring-ink',
}

type Props = {
  to: string
  children: ReactNode
  variant?: Variant
  className?: string
}

export default function Button({
  to,
  children,
  variant = 'primary',
  className = '',
}: Props) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${styles[variant]} ${className}`}
    >
      {children}
    </Link>
  )
}

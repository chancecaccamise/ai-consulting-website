import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

const variantClass: Record<Variant, string> = {
  primary: 'lh-btn-primary',
  secondary: 'lh-btn-secondary',
  ghost: 'lh-btn-ghost',
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
    <Link to={to} className={`lh-btn ${variantClass[variant]} ${className}`}>
      {children}
    </Link>
  )
}

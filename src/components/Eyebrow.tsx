import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  dot?: boolean
  className?: string
}

export default function Eyebrow({ children, dot = true, className = '' }: Props) {
  return (
    <span className={`lh-eyebrow ${dot ? 'lh-eyebrow-dot' : ''} ${className}`}>
      {children}
    </span>
  )
}

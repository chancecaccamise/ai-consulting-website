import Button from './Button'
import { primaryCta } from '../site.config'

type Props = {
  title?: string
  subtitle?: string
  cta?: { label: string; to: string }
}

export default function CTABand({
  title = 'Ready to put AI to work?',
  subtitle = 'Start with an Audit. Walk away with a written roadmap.',
  cta = primaryCta,
}: Props) {
  return (
    <section className="bg-canvas px-5 py-24">
      <div className="lh-surface-d-lg mx-auto max-w-4xl overflow-hidden px-8 py-16 text-center sm:px-16">
        <h2 className="lh-h1 text-fg">{title}</h2>
        <p className="mx-auto mt-5 max-w-xl text-muted lh-body-lg">{subtitle}</p>
        <div className="mt-9 flex justify-center">
          <Button to={cta.to}>{cta.label}</Button>
        </div>
      </div>
    </section>
  )
}

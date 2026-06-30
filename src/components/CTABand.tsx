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
    <section className="bg-ink">
      <div className="mx-auto max-w-6xl px-5 py-20 text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">
          {subtitle}
        </p>
        <div className="mt-8 flex justify-center">
          <Button to={cta.to} variant="primary" className="px-8 py-3.5 text-base">
            {cta.label}
          </Button>
        </div>
      </div>
    </section>
  )
}

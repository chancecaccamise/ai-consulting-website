import SystemDiagram from './SystemDiagram'
import { type StepItem } from './HowLeftColumn'

interface Props {
  steps: readonly StepItem[]
  /** true under prefers-reduced-motion (kept for parity; diagrams render static either way). */
  frozen?: boolean
}

// Non-pinned fallback for tablet/mobile and reduced-motion. The four steps are
// stacked; each shows its diagram in that step's built state (static — no
// scroll scrubbing or ambient loops), revealed with the existing rise-soft.
export default function HowItWorksStacked({ steps }: Props) {
  return (
    <div className="mx-auto w-full max-w-[90rem] px-5 py-24">
      <div className="max-w-xl">
        <div className="flex items-center gap-3">
          <span className="lh-eyebrow lh-accent-text">How we work</span>
          <span className="h-px w-12 bg-line" />
        </div>
        <h2 className="lh-h1 mt-5 text-fg">
          We come in, find what&rsquo;s slowing you down, and fix it with AI
        </h2>
        <p className="mt-6 text-muted lh-body-lg">
          You don&rsquo;t spend months learning AI. We audit your business,
          improve your systems, and train your team so the gains stick.
        </p>
      </div>

      <div className="mt-16 space-y-20">
        {steps.map((s, i) => (
          <div
            key={s.n}
            className="rise-soft grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
          >
            <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
              <span className="lh-mono lh-accent-text text-sm">STEP 0{s.n}</span>
              <h3 className="lh-h2 mt-3 text-fg">{s.title}</h3>
              <p className="mt-3 max-w-md text-muted lh-body-lg">{s.desc}</p>
            </div>
            <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
              <SystemDiagram activeStep={i} frozen />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

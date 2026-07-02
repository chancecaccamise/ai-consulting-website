import { AnimatePresence, motion, type MotionValue } from 'framer-motion'

export interface StepItem {
  n: number
  title: string
  desc: string
}

interface Props {
  steps: readonly StepItem[]
  activeStep: number
  /** 0..1 scroll progress, drives the vertical tracker fill line (scaleY). */
  fill: MotionValue<number>
}

export default function HowLeftColumn({ steps, activeStep, fill }: Props) {
  const step = steps[activeStep] ?? steps[0]

  return (
    <div>
      <h2 className="lh-h1 max-w-xl text-fg">
        We find what&rsquo;s slowing you down, and fix it with AI
      </h2>

      {/* Vertical 01–04 tracker with the active step copy to its right */}
      <div className="mt-12 flex gap-7">
        <div className="relative flex w-9 shrink-0 flex-col items-center justify-between self-stretch">
          <div className="absolute inset-y-3 left-1/2 w-px -translate-x-1/2 bg-line" />
          <motion.div
            className="absolute inset-y-3 left-1/2 w-px -translate-x-1/2 bg-green"
            style={{ scaleY: fill, transformOrigin: 'top' }}
          />
          {steps.map((s, i) => (
            <span
              key={s.n}
              className={`lh-mono relative z-10 grid h-9 w-9 place-items-center rounded-full border text-xs transition-colors duration-300 ${
                i <= activeStep
                  ? 'border-green bg-surface text-green'
                  : 'border-line bg-surface text-subtle'
              }`}
            >
              0{s.n}
            </span>
          ))}
        </div>

        <div className="relative flex min-h-[15rem] flex-1 flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.32, ease: [0.2, 0.7, 0.15, 1] }}
            >
              <div className="flex items-center gap-3">
                <span className="lh-mono lh-accent-text text-sm">
                  STEP 0{step.n}
                </span>
                <span className="lh-mono text-subtle text-sm">
                  / 0{steps.length}
                </span>
              </div>
              <h3 className="lh-h2 mt-4 text-fg">{step.title}</h3>
              <p className="mt-4 max-w-md text-muted lh-body-lg">{step.desc}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

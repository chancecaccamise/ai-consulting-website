import { useRef, useState } from 'react'
import {
  useScroll,
  useTransform,
  useMotionValueEvent,
  useInView,
} from 'framer-motion'
import HowLeftColumn, { type StepItem } from './HowLeftColumn'
import SystemDiagram from './SystemDiagram'

const STEP_COUNT = 4

interface Props {
  steps: readonly StepItem[]
}

export default function HowItWorksPinned({ steps }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const inView = useInView(frameRef, { amount: 0.2 })

  // Progress across the tall wrapper: 0 when it pins, 1 when it unpins.
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end end'],
  })

  // 0..STEP_COUNT — e.g. 2.4 = 40% through step index 2.
  const stepFloat = useTransform(scrollYProgress, [0, 1], [0, STEP_COUNT])
  // local 0..1 within the current step, drives continuous diagram motion.
  const stepProgress = useTransform(stepFloat, (v) => {
    const c = Math.min(Math.max(v, 0), STEP_COUNT - 0.0001)
    return c - Math.floor(c)
  })

  // Discrete active step -> React state, updated only when it changes.
  const [activeStep, setActiveStep] = useState(0)
  useMotionValueEvent(stepFloat, 'change', (v) => {
    const idx = Math.min(STEP_COUNT - 1, Math.max(0, Math.floor(v)))
    setActiveStep((prev) => (prev === idx ? prev : idx))
  })

  return (
    <div
      ref={scrollRef}
      className="relative"
      style={{ height: `${(STEP_COUNT + 1) * 100}vh` }}
    >
      <div
        ref={frameRef}
        className="sticky top-0 flex h-screen items-center overflow-hidden"
      >
        <div className="mx-auto w-full max-w-[90rem] px-5">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,42%)_minmax(0,58%)] lg:gap-16">
            <HowLeftColumn
              steps={steps}
              activeStep={activeStep}
              fill={scrollYProgress}
            />
            <SystemDiagram
              activeStep={activeStep}
              stepProgress={stepProgress}
              inView={inView}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

import {
  AnimatePresence,
  motion,
  useMotionValue,
  type MotionValue,
} from 'framer-motion'
import {
  BOTTOM_Y,
  EASE,
  gridColOffsets,
  gridRows,
  HORIZON_Y,
  HUB,
  LINE,
} from './scenes/shared'
import SceneAudit from './scenes/SceneAudit'
import SceneBottlenecks from './scenes/SceneBottlenecks'
import SceneImprove from './scenes/SceneImprove'
import SceneTrain from './scenes/SceneTrain'

// Dispatcher for the right-side diagram. A shared perspective-grid backdrop
// stays fixed while the active step's purpose-built scene crossfades in. Each
// scene tells its own part of the story: map -> jams -> automate -> train.

const SCENES = [SceneAudit, SceneBottlenecks, SceneImprove, SceneTrain]

interface Props {
  activeStep: number
  stepProgress?: MotionValue<number>
  reducedMotion?: boolean
  frozen?: boolean
  /** ambient loops only run while the section is on screen. */
  inView?: boolean
}

export default function SystemDiagram({
  activeStep,
  stepProgress,
  reducedMotion = false,
  frozen = false,
  inView = true,
}: Props) {
  // Fallback progress for stacked/frozen renders (reads 1 = end state).
  const fallbackProgress = useMotionValue(1)
  const progress = stepProgress ?? fallbackProgress

  const ambient = !reducedMotion && !frozen && inView
  const idx = Math.min(SCENES.length - 1, Math.max(0, activeStep))
  const Scene = SCENES[idx]

  return (
    <div className="relative aspect-[4/3] w-full select-none">
      {/* shared perspective backdrop */}
      <svg
        viewBox="0 0 800 600"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <g stroke={LINE} strokeWidth={1} fill="none">
          {gridRows.map((y, i) => (
            <line key={`r${i}`} x1={0} y1={y} x2={800} y2={y} opacity={0.45} />
          ))}
          {gridColOffsets.map((off, i) => (
            <line
              key={`c${i}`}
              x1={HUB.x}
              y1={HORIZON_Y}
              x2={HUB.x + off}
              y2={BOTTOM_Y}
              opacity={0.45}
            />
          ))}
        </g>
      </svg>

      {/* active scene crossfades on step change */}
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={idx}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <Scene stepProgress={progress} ambient={ambient} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

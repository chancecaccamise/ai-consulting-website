import { motion, useTransform } from 'framer-motion'
import {
  containerVariants,
  FLAME,
  GREEN_SOFT,
  LINE,
  nodeVariants,
  PIPE_Y,
  STAGES,
  toPct,
  type SceneProps,
} from './shared'

const FIRST_JAM = STAGES.find((s) => s.jam)!
// A cluster of work piling up just left of the first jam.
const PILE = [
  { x: FIRST_JAM.x - 58, y: PIPE_Y },
  { x: FIRST_JAM.x - 40, y: PIPE_Y - 15 },
  { x: FIRST_JAM.x - 40, y: PIPE_Y + 15 },
  { x: FIRST_JAM.x - 74, y: PIPE_Y - 8 },
  { x: FIRST_JAM.x - 74, y: PIPE_Y + 8 },
]

export default function SceneBottlenecks({ stepProgress, ambient }: SceneProps) {
  const pileOpacity = useTransform(stepProgress, [0, 0.55], [0, 1])
  const init = ambient ? 'hidden' : 'shown'

  return (
    <>
      <motion.svg
        viewBox="0 0 800 600"
        className="absolute inset-0 h-full w-full overflow-visible"
        aria-hidden="true"
        variants={containerVariants}
        initial={init}
        animate="shown"
      >
        {/* pipeline base line */}
        <line x1={90} y1={PIPE_Y} x2={745} y2={PIPE_Y} stroke={LINE} strokeWidth={3} strokeLinecap="round" />
        {/* healthy intake segment (green) up to the first jam */}
        <line x1={90} y1={PIPE_Y} x2={FIRST_JAM.x} y2={PIPE_Y} stroke={GREEN_SOFT} strokeWidth={3} strokeLinecap="round" opacity={0.5} />
        {/* jammed segment (red) */}
        <line x1={FIRST_JAM.x} y1={PIPE_Y} x2={745} y2={PIPE_Y} stroke={FLAME} strokeWidth={3} strokeLinecap="round" strokeDasharray="2 9" opacity={0.7} />

        {/* incoming work still arriving (ambient) */}
        {ambient &&
          [0, 1].map((i) => (
            <motion.circle
              key={i}
              r={5}
              fill={GREEN_SOFT}
              cy={PIPE_Y}
              initial={{ cx: 90 }}
              animate={{ cx: FIRST_JAM.x - 80, opacity: [0, 1, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: i * 1 }}
            />
          ))}

        {/* piled-up work behind the jam (accumulates on scroll) */}
        <motion.g style={{ opacity: pileOpacity }}>
          {PILE.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={6} fill={FLAME} opacity={0.9} />
          ))}
        </motion.g>
      </motion.svg>

      <motion.div
        className="absolute inset-0"
        variants={containerVariants}
        initial={init}
        animate="shown"
      >
        {STAGES.map((stage) => (
          <div key={stage.id} className="absolute -translate-x-1/2 -translate-y-1/2" style={toPct(stage.x, PIPE_Y)}>
            <motion.div variants={nodeVariants} className="flex flex-col items-center gap-2">
              <div
                className={`grid h-12 w-12 place-items-center rounded-xl bg-[#1a1a1a] ring-1 ${
                  stage.jam ? 'ring-[#ff4a1c]/70' : 'ring-white/10'
                }`}
              >
                {stage.jam ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" className={`text-[#ff4a1c] ${ambient ? 'how-flame-pulse' : ''}`} fill="none">
                    <path d="M12 3l9 16H3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                    <path d="M12 10v4M12 17.5v.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                ) : (
                  <span className="h-2.5 w-2.5 rounded-full bg-[#10b981]" style={{ boxShadow: '0 0 8px #10b981' }} />
                )}
              </div>
              <span className="lh-mono text-[10px] uppercase tracking-wider text-fg/60">{stage.label}</span>
            </motion.div>
          </div>
        ))}

        {/* SLOW marker over the first jam */}
        <div className="absolute -translate-x-1/2 -translate-y-1/2" style={toPct(FIRST_JAM.x, PIPE_Y - 78)}>
          <motion.span
            variants={nodeVariants}
            className="lh-mono rounded-full bg-[#ff4a1c]/12 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#ff4a1c]"
          >
            Backed up
          </motion.span>
        </div>
      </motion.div>
    </>
  )
}

import { motion, useTransform } from 'framer-motion'
import {
  CARD,
  containerVariants,
  EASE,
  GREEN_SOFT,
  HUB,
  LINE,
  nodeVariants,
  SATELLITES,
  toPct,
  type SceneProps,
} from './shared'

// Scene 1 — Audit. A radar scan discovers and maps the business: the hub and
// its teams/tools appear and connectors draw in.
export default function SceneAudit({ stepProgress, ambient }: SceneProps) {
  const beamX = useTransform(stepProgress, [0, 1], [130, 660])
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
        {SATELLITES.map((s) => (
          <motion.path
            key={s.id}
            d={`M${HUB.x},${HUB.y} L${s.x},${s.y}`}
            fill="none"
            stroke={LINE}
            strokeWidth={2}
            strokeLinecap="round"
            variants={{
              hidden: { pathLength: 0, opacity: 0 },
              shown: {
                pathLength: 1,
                opacity: 1,
                transition: { duration: 0.7, ease: EASE },
              },
            }}
          />
        ))}

        {ambient && (
          <>
            <circle cx={HUB.x} cy={HUB.y} r={40} fill="none" stroke={GREEN_SOFT} strokeWidth={1.5} className="how-radiate" />
            <circle cx={HUB.x} cy={HUB.y} r={40} fill="none" stroke={GREEN_SOFT} strokeWidth={1.5} className="how-radiate" style={{ animationDelay: '1.3s' }} />
            <motion.g style={{ x: beamX }}>
              <rect x={0} y={60} width={40} height={476} fill={GREEN_SOFT} opacity={0.1} style={{ filter: 'blur(7px)' }} />
            </motion.g>
          </>
        )}
      </motion.svg>

      <motion.div
        className="absolute inset-0"
        variants={containerVariants}
        initial={init}
        animate="shown"
      >
        {/* hub */}
        <div className="absolute -translate-x-1/2 -translate-y-1/2" style={toPct(HUB.x, HUB.y)}>
          <motion.div variants={nodeVariants} className={`relative ${CARD} px-6 py-4 text-center`}>
            <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981]" />
            <span className="lh-mono block text-[10px] tracking-[0.2em] text-white/50">YOUR</span>
            <span className="font-display text-lg font-black uppercase leading-none text-white">Business</span>
          </motion.div>
        </div>

        {/* satellites */}
        {SATELLITES.map((s) => (
          <div key={s.id} className="absolute -translate-x-1/2 -translate-y-1/2" style={toPct(s.x, s.y)}>
            <motion.div variants={nodeVariants} className={`flex items-center gap-2 ${CARD} px-4 py-2.5`}>
              <span className="h-2 w-2 shrink-0 rounded-full bg-[#10b981]" style={{ boxShadow: '0 0 8px #10b981' }} />
              <span className="text-sm font-semibold text-white">{s.label}</span>
            </motion.div>
          </div>
        ))}
      </motion.div>
    </>
  )
}

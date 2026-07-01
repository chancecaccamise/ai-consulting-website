import { motion, useTransform } from 'framer-motion'
import {
  CARD,
  containerVariants,
  GREEN,
  GREEN_SOFT,
  nodeVariants,
  PIPE_Y,
  STAGES,
  toPct,
  type SceneProps,
} from './shared'

const FIRST_JAM = STAGES.find((s) => s.jam)!

// Scene 3 — Improve. The same pipeline from scene 2, now automated: modules
// installed on the jams, the clog cleared, work zooming through, throughput up.
export default function SceneImprove({ stepProgress, ambient }: SceneProps) {
  const gauge = useTransform(stepProgress, [0.1, 0.8], [0.12, 1])
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
        {/* full green pipeline */}
        <line x1={90} y1={PIPE_Y} x2={745} y2={PIPE_Y} stroke={GREEN} strokeWidth={3} strokeLinecap="round" opacity={0.55} />
        {/* marching flow overlay (ambient) */}
        <line
          x1={90}
          y1={PIPE_Y}
          x2={745}
          y2={PIPE_Y}
          stroke={GREEN_SOFT}
          strokeWidth={3}
          strokeLinecap="round"
          strokeDasharray="6 10"
          className={ambient ? 'how-flow' : undefined}
        />
        {/* work zooming through, fast (ambient) */}
        {ambient &&
          [0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              r={5}
              fill={GREEN_SOFT}
              cy={PIPE_Y}
              initial={{ cx: 90 }}
              animate={{ cx: 745 }}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'linear', delay: i * 0.37 }}
            />
          ))}
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
              <div className="relative grid h-12 w-12 place-items-center rounded-xl bg-[#1a1a1a] ring-1 ring-[#10b981]/50">
                {stage.jam ? (
                  <svg width="22" height="22" viewBox="0 0 24 24" className={`text-[#10b981] ${ambient ? 'how-spin' : ''}`} fill="none">
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                    <path d="M12 2v3M12 19v3M22 12h-3M5 12H2M19.1 4.9l-2.1 2.1M7 17l-2.1 2.1M19.1 19.1L17 17M7 7L4.9 4.9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                ) : (
                  <span className="h-2.5 w-2.5 rounded-full bg-[#10b981]" style={{ boxShadow: '0 0 8px #10b981' }} />
                )}
                {/* automated badge on the fixed stages */}
                {stage.jam && (
                  <span className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-[#10b981] text-[#052e22]">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M13 2L4 14h6l-1 8 9-12h-6z" fill="currentColor" /></svg>
                  </span>
                )}
              </div>
              <span className="lh-mono text-[10px] uppercase tracking-wider text-fg/60">{stage.label}</span>
            </motion.div>
          </div>
        ))}

        {/* throughput gauge */}
        <div className="absolute -translate-x-1/2 -translate-y-1/2" style={toPct(610, 92)}>
          <motion.div variants={nodeVariants} className={`${CARD} w-44 px-4 py-3`}>
            <div className="flex items-center justify-between">
              <span className="lh-mono text-[10px] uppercase tracking-wider text-white/50">Throughput</span>
              <span className="font-display text-sm font-black text-[#10b981]">3&times;</span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div className="h-full rounded-full bg-[#10b981]" style={{ scaleX: gauge, transformOrigin: 'left' }} />
            </div>
          </motion.div>
        </div>

        {/* automated marker over the first fixed jam */}
        <div className="absolute -translate-x-1/2 -translate-y-1/2" style={toPct(FIRST_JAM.x, PIPE_Y - 78)}>
          <motion.span
            variants={nodeVariants}
            className="lh-mono rounded-full bg-[#10b981]/12 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#059669]"
          >
            Automated
          </motion.span>
        </div>
      </motion.div>
    </>
  )
}

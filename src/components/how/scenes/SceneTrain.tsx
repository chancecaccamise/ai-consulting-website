import { motion, useTransform, type Variants } from 'framer-motion'
import { CARD, EASE, GREEN_SOFT, LINE, toPct, type SceneProps } from './shared'

const SYS = { x: 172, y: 296 }
const PX = 612
const PEOPLE = [
  { id: 'sales', label: 'Sales', y: 146 },
  { id: 'ops', label: 'Ops', y: 296 },
  { id: 'support', label: 'Support', y: 446 },
]

const container: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
}
const fromLeft: Variants = {
  hidden: { opacity: 0, x: -28 },
  shown: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
}
const fromRight: Variants = {
  hidden: { opacity: 0, x: 28 },
  shown: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
}

function PersonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 text-white/80">
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="2" />
      <path d="M5 20c0-3.5 3.2-5.5 7-5.5s7 2 7 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

// Scene 4 — Train. The built system hands knowledge off to the team: each
// teammate's skill bar fills and they get certified.
export default function SceneTrain({ stepProgress, ambient }: SceneProps) {
  // Per-person skill fill + certified check, staggered.
  const skill = [
    useTransform(stepProgress, [0.1, 0.7], [0.06, 1]),
    useTransform(stepProgress, [0.2, 0.8], [0.06, 1]),
    useTransform(stepProgress, [0.3, 0.9], [0.06, 1]),
  ]
  const check = [
    useTransform(stepProgress, [0.64, 0.74], [0, 1]),
    useTransform(stepProgress, [0.74, 0.84], [0, 1]),
    useTransform(stepProgress, [0.84, 0.94], [0, 1]),
  ]
  const init = ambient ? 'hidden' : 'shown'

  return (
    <>
      <svg viewBox="0 0 800 600" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
        {PEOPLE.map((p) => (
          <line key={p.id} x1={SYS.x + 78} y1={SYS.y} x2={PX - 92} y2={p.y} stroke={LINE} strokeWidth={2} strokeLinecap="round" />
        ))}
        {/* knowledge flowing system -> people */}
        {ambient &&
          PEOPLE.map((p, i) => (
            <motion.circle
              key={p.id}
              r={4}
              fill={GREEN_SOFT}
              initial={{ cx: SYS.x + 78, cy: SYS.y, opacity: 0 }}
              animate={{ cx: PX - 92, cy: p.y, opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'linear', delay: i * 0.5 }}
            />
          ))}
      </svg>

      <motion.div className="absolute inset-0" variants={container} initial={init} animate="shown">
        {/* system source */}
        <div className="absolute -translate-x-1/2 -translate-y-1/2" style={toPct(SYS.x, SYS.y)}>
          <motion.div variants={fromLeft} className={`relative ${CARD} px-5 py-4 text-center`}>
            <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981]" />
            <span className="lh-mono block text-[10px] tracking-[0.2em] text-white/50">YOUR</span>
            <span className="font-display text-base font-black uppercase leading-none text-white">System</span>
          </motion.div>
        </div>

        {/* team members */}
        {PEOPLE.map((p, i) => (
          <div key={p.id} className="absolute -translate-x-1/2 -translate-y-1/2" style={toPct(PX, p.y)}>
            <motion.div variants={fromRight} className={`${CARD} w-44 px-4 py-3`}>
              <div className="flex items-center gap-2.5">
                <PersonIcon />
                <span className="text-sm font-semibold text-white">{p.label}</span>
                <motion.span
                  style={{ opacity: check[i] }}
                  className="ml-auto grid h-5 w-5 place-items-center rounded-full bg-[#10b981] text-[#052e22]"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </motion.span>
              </div>
              <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div className="h-full rounded-full bg-[#10b981]" style={{ scaleX: skill[i], transformOrigin: 'left' }} />
              </div>
            </motion.div>
          </div>
        ))}
      </motion.div>
    </>
  )
}

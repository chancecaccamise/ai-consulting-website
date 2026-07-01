import type { MotionValue, Variants } from 'framer-motion'

// Shared tokens, geometry and helpers for the four "How we work" scenes.
// viewBox is 800x600 (4:3); the stage is aspect-[4/3] so DOM percentages map
// linearly to SVG user units.

export const GREEN = '#059669'
export const GREEN_SOFT = '#10b981'
export const FLAME = '#ff4a1c'
export const LINE = 'rgba(0,0,0,0.12)'
export const INK = '#1a1a1a'

export const EASE: [number, number, number, number] = [0.2, 0.7, 0.15, 1]

/** SVG user-space point -> CSS percentage for overlaying DOM cards. */
export const toPct = (x: number, y: number) => ({
  left: `${(x / 800) * 100}%`,
  top: `${(y / 600) * 100}%`,
})

// ---- scene 1: hub + satellites (the org map) ----
export const HUB = { x: 400, y: 296 }
export interface SatNode {
  id: string
  label: string
  x: number
  y: number
}
export const SATELLITES: SatNode[] = [
  { id: 'sales', label: 'Sales', x: 400, y: 96 },
  { id: 'ops', label: 'Ops', x: 664, y: 296 },
  { id: 'support', label: 'Support', x: 400, y: 496 },
  { id: 'tools', label: 'Tools', x: 136, y: 296 },
]

// ---- perspective floor grid (shared backdrop) ----
export const HORIZON_Y = 356
export const BOTTOM_Y = 600
export const gridRows = Array.from({ length: 7 }, (_, i) =>
  HORIZON_Y + (BOTTOM_Y - HORIZON_Y) * Math.pow(i / 6, 1.9),
)
export const gridColOffsets = [-680, -400, -220, -90, 90, 220, 400, 680]

// ---- scenes 2 & 3: the task pipeline (shared so step 3 fixes step 2) ----
export const PIPE_Y = 292
export interface Stage {
  id: string
  label: string
  x: number
  jam: boolean
}
export const STAGES: Stage[] = [
  { id: 'intake', label: 'Intake', x: 150, jam: false },
  { id: 'ops', label: 'Ops', x: 355, jam: true },
  { id: 'review', label: 'Review', x: 540, jam: true },
  { id: 'deliver', label: 'Deliver', x: 700, jam: false },
]

/** Props every scene receives from the SystemDiagram dispatcher. */
export interface SceneProps {
  /** 0..1 progress within this step (reads 1 in frozen/stacked = end state). */
  stepProgress: MotionValue<number>
  /** true only when motion is allowed and the section is on screen. */
  ambient: boolean
}

export const containerVariants: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
}
export const nodeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  shown: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: EASE } },
}

/** Shared dark node-card classes. */
export const CARD =
  'rounded-xl bg-[#1a1a1a] shadow-[0_10px_28px_rgba(0,0,0,0.2)] ring-1 ring-white/10'

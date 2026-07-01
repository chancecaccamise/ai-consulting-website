import { useReducedMotion } from 'framer-motion'
import { steps } from '../../site.config'
import { useMatchMedia } from './useMatchMedia'
import HowItWorksPinned from './HowItWorksPinned'
import HowItWorksStacked from './HowItWorksStacked'

// Section wrapper. Owns the #how anchor (the hero links to it) and picks the
// experience: the pinned scroll-scrub on desktop, a clean stacked version on
// smaller screens or under reduced-motion.
export default function HowItWorks() {
  const isDesktop = useMatchMedia('(min-width: 1024px)')
  const reduced = useReducedMotion()
  const pinned = isDesktop && !reduced

  return (
    <section id="how" className="scroll-mt-24 bg-canvas">
      {pinned ? (
        <HowItWorksPinned steps={steps} />
      ) : (
        <HowItWorksStacked steps={steps} frozen={!!reduced} />
      )}
    </section>
  )
}

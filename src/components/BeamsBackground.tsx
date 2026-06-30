import { useEffect, useRef } from 'react'

// Animated light-beam + film-grain background, adapted from the PremiumHero
// concept for the Legacy House palette (emerald beams on a near-black band).
// Sizes itself to its parent (a relative container), respects
// prefers-reduced-motion, and generates grain once instead of per-frame.

interface Beam {
  x: number
  y: number
  width: number
  length: number
  angle: number
  speed: number
  opacity: number
  pulse: number
  pulseSpeed: number
  layer: number
}

const LAYERS = 3
const BEAMS_PER_LAYER = 8
// Emerald beam color (brighter emerald-400 reads better as a glow on black).
const BEAM_RGB = '16, 185, 129'

function createBeam(width: number, height: number, layer: number): Beam {
  const angle = -35 + Math.random() * 10
  const baseSpeed = 0.2 + layer * 0.2
  const baseOpacity = 0.08 + layer * 0.05
  const baseWidth = 10 + layer * 5
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    width: baseWidth,
    length: height * 2.5,
    angle,
    speed: baseSpeed + Math.random() * 0.2,
    opacity: baseOpacity + Math.random() * 0.1,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.01 + Math.random() * 0.015,
    layer,
  }
}

export default function BeamsBackground() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const beamsCanvasRef = useRef<HTMLCanvasElement>(null)
  const noiseCanvasRef = useRef<HTMLCanvasElement>(null)
  const beamsRef = useRef<Beam[]>([])
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = beamsCanvasRef.current
    const noiseCanvas = noiseCanvasRef.current
    if (!wrap || !canvas || !noiseCanvas) return
    const ctx = canvas.getContext('2d')
    const nCtx = noiseCanvas.getContext('2d')
    if (!ctx || !nCtx) return

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    let w = 0
    let h = 0

    const generateNoise = () => {
      // CSS-resolution grain, generated once per resize (cheap, static).
      if (w === 0 || h === 0) return
      const img = nCtx.createImageData(w, h)
      for (let i = 0; i < img.data.length; i += 4) {
        const v = Math.random() * 255
        img.data[i] = v
        img.data[i + 1] = v
        img.data[i + 2] = v
        img.data[i + 3] = 16
      }
      nCtx.putImageData(img, 0, 0)
    }

    const drawBackground = () => {
      const g = ctx.createLinearGradient(0, 0, 0, h)
      g.addColorStop(0, '#0b0b0c')
      g.addColorStop(1, '#121212')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, w, h)
    }

    const drawBeam = (beam: Beam) => {
      ctx.save()
      ctx.translate(beam.x, beam.y)
      ctx.rotate((beam.angle * Math.PI) / 180)

      const pulsing = Math.min(
        1,
        beam.opacity * (0.8 + Math.sin(beam.pulse) * 0.4),
      )
      const g = ctx.createLinearGradient(0, 0, 0, beam.length)
      g.addColorStop(0, `rgba(${BEAM_RGB},0)`)
      g.addColorStop(0.2, `rgba(${BEAM_RGB},${pulsing * 0.5})`)
      g.addColorStop(0.5, `rgba(${BEAM_RGB},${pulsing})`)
      g.addColorStop(0.8, `rgba(${BEAM_RGB},${pulsing * 0.5})`)
      g.addColorStop(1, `rgba(${BEAM_RGB},0)`)

      ctx.fillStyle = g
      ctx.filter = `blur(${2 + beam.layer * 2}px)`
      ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length)
      ctx.restore()
    }

    const setup = () => {
      const dpr = window.devicePixelRatio || 1
      w = wrap.clientWidth
      h = wrap.clientHeight

      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)

      noiseCanvas.width = w
      noiseCanvas.height = h
      noiseCanvas.style.width = `${w}px`
      noiseCanvas.style.height = `${h}px`

      beamsRef.current = []
      for (let layer = 1; layer <= LAYERS; layer++) {
        for (let i = 0; i < BEAMS_PER_LAYER; i++) {
          beamsRef.current.push(createBeam(w, h, layer))
        }
      }

      generateNoise()

      if (reduceMotion) {
        // Static single frame, no animation loop.
        drawBackground()
        beamsRef.current.forEach(drawBeam)
      }
    }

    setup()

    const ro = new ResizeObserver(setup)
    ro.observe(wrap)

    if (!reduceMotion) {
      const animate = () => {
        drawBackground()
        beamsRef.current.forEach((beam) => {
          beam.y -= beam.speed * (beam.layer / LAYERS + 0.5)
          beam.pulse += beam.pulseSpeed
          if (beam.y + beam.length < -50) {
            beam.y = h + 50
            beam.x = Math.random() * w
          }
          drawBeam(beam)
        })
        rafRef.current = requestAnimationFrame(animate)
      }
      animate()
    }

    return () => {
      ro.disconnect()
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <canvas ref={beamsCanvasRef} className="absolute inset-0" />
      <canvas ref={noiseCanvasRef} className="absolute inset-0" />
    </div>
  )
}

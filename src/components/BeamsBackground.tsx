import { useEffect, useRef } from 'react'

// Animated light-beam + film-grain background, adapted from the PremiumHero
// concept for the Legacy House palette (emerald beams on a near-black band).
// Sizes itself to its parent (a relative container), respects
// prefers-reduced-motion, and pauses when scrolled out of view.
//
// Performance: each layer's beam is pre-rendered once to an offscreen sprite
// (blur baked in), so the animation loop is just cheap drawImage calls with a
// per-frame alpha for the pulse. No per-frame gradient allocation or canvas
// blur filter, which is what made the original version jank.

interface Beam {
  x: number
  y: number
  length: number
  speed: number
  opacity: number
  pulse: number
  pulseSpeed: number
  layer: number
}

const LAYERS = 3
const BEAMS_PER_LAYER = 8
const BEAM_ANGLE = -35 // degrees, shared so we can rotate the sprite the same way
// Emerald beam color (brighter emerald-400 reads better as a glow on black).
const BEAM_RGB = '16, 185, 129'
// Retina past ~1.5x is wasted detail on a soft, blurred background.
const MAX_DPR = 1.5

function createBeam(width: number, height: number, layer: number): Beam {
  const baseSpeed = 0.2 + layer * 0.2
  const baseOpacity = 0.08 + layer * 0.05
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    length: height * 2.5,
    speed: baseSpeed + Math.random() * 0.2,
    opacity: baseOpacity + Math.random() * 0.1,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.01 + Math.random() * 0.015,
    layer,
  }
}

// Build one blurred beam sprite per layer, at full opacity. Alpha is applied
// per-frame via globalAlpha, so a single sprite serves every beam in the layer.
function buildBeamSprite(layer: number, length: number): HTMLCanvasElement {
  const width = 10 + layer * 5
  const blur = 2 + layer * 2
  const pad = blur * 3
  const sprite = document.createElement('canvas')
  sprite.width = Math.ceil(width + pad * 2)
  sprite.height = Math.ceil(length)
  const c = sprite.getContext('2d')!
  const g = c.createLinearGradient(0, 0, 0, length)
  g.addColorStop(0, `rgba(${BEAM_RGB},0)`)
  g.addColorStop(0.2, `rgba(${BEAM_RGB},0.5)`)
  g.addColorStop(0.5, `rgba(${BEAM_RGB},1)`)
  g.addColorStop(0.8, `rgba(${BEAM_RGB},0.5)`)
  g.addColorStop(1, `rgba(${BEAM_RGB},0)`)
  c.filter = `blur(${blur}px)`
  c.fillStyle = g
  c.fillRect(pad, 0, width, length)
  return sprite
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
    let sprites: HTMLCanvasElement[] = []
    let running = false

    const generateNoise = () => {
      // Static grain, generated from a small tile and stamped across the
      // canvas via a pattern instead of a full-canvas per-pixel loop.
      if (w === 0 || h === 0) return
      const size = 128
      const tile = document.createElement('canvas')
      tile.width = size
      tile.height = size
      const tCtx = tile.getContext('2d')!
      const img = tCtx.createImageData(size, size)
      for (let i = 0; i < img.data.length; i += 4) {
        const v = Math.random() * 255
        img.data[i] = v
        img.data[i + 1] = v
        img.data[i + 2] = v
        img.data[i + 3] = 16
      }
      tCtx.putImageData(img, 0, 0)
      const pattern = nCtx.createPattern(tile, 'repeat')
      if (!pattern) return
      nCtx.clearRect(0, 0, w, h)
      nCtx.fillStyle = pattern
      nCtx.fillRect(0, 0, w, h)
    }

    const drawBackground = () => {
      const g = ctx.createLinearGradient(0, 0, 0, h)
      g.addColorStop(0, '#0b0b0c')
      g.addColorStop(1, '#121212')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, w, h)
    }

    const drawBeam = (beam: Beam) => {
      const sprite = sprites[beam.layer - 1]
      if (!sprite) return
      const alpha = Math.min(1, beam.opacity * (0.8 + Math.sin(beam.pulse) * 0.4))
      ctx.save()
      ctx.globalAlpha = alpha
      ctx.translate(beam.x, beam.y)
      ctx.rotate((BEAM_ANGLE * Math.PI) / 180)
      ctx.drawImage(sprite, -sprite.width / 2, 0)
      ctx.restore()
    }

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
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

      sprites = []
      for (let layer = 1; layer <= LAYERS; layer++) {
        sprites.push(buildBeamSprite(layer, h * 2.5))
      }

      beamsRef.current = []
      for (let layer = 1; layer <= LAYERS; layer++) {
        for (let i = 0; i < BEAMS_PER_LAYER; i++) {
          beamsRef.current.push(createBeam(w, h, layer))
        }
      }

      generateNoise()
      drawFrame()
    }

    const drawFrame = () => {
      drawBackground()
      beamsRef.current.forEach(drawBeam)
    }

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

    const start = () => {
      if (running || reduceMotion) return
      running = true
      animate()
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(rafRef.current)
    }

    setup()

    const ro = new ResizeObserver(setup)
    ro.observe(wrap)

    // Only animate while the hero is actually on screen.
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    )
    io.observe(wrap)

    return () => {
      ro.disconnect()
      io.disconnect()
      stop()
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

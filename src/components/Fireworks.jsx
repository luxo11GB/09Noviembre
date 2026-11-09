import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

const COLORS = ['#E9D5FF', '#B57AE8', '#FFFFFF', '#D8B4FE', '#C084FC']
const rnd = (a, b) => a + Math.random() * (b - a)
const pick = () => COLORS[(Math.random() * COLORS.length) | 0]

// Fuegos artificiales en canvas (ligero y fluido). Se pausan solos si la pestaña no está visible.
export default function Fireworks() {
  const ref = useRef(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return undefined
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let w = 0, h = 0, raf = 0, last = performance.now(), wait = 3
    const rockets = [], sparks = [], flashes = []

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const launch = () => rockets.push({
      x: rnd(w * 0.1, w * 0.9), y: h + 10, ty: rnd(h * 0.1, h * 0.38),
      vx: rnd(-20, 20), vy: -rnd(0.75, 0.95) * h, c: pick(),
    })

    const explode = (x, y, c) => {
      const scale = Math.max(0.6, Math.min(1.3, Math.min(w, h) / 650))
      const n = w < 600 ? 50 : 80
      const ring = Math.random() < 0.35
      const second = pick()
      flashes.push({ x, y, life: 0, ttl: 0.4, c, r: 90 * scale })
      for (let i = 0; i < n; i++) {
        const a = ring ? (i / n) * Math.PI * 2 : rnd(0, Math.PI * 2)
        const sp = (ring ? 150 : rnd(40, 200)) * scale
        sparks.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 0, ttl: rnd(1.1, 1.9), c: i % 3 === 0 ? second : c, r: rnd(1, 2.2) })
      }
    }

    const frame = (now) => {
      raf = requestAnimationFrame(frame)
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now

      ctx.globalCompositeOperation = 'destination-out'
      ctx.fillStyle = 'rgba(0,0,0,0.25)'
      ctx.fillRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'lighter'

      wait -= dt
      if (wait <= 0) {
        launch()
        if (Math.random() < 0.3) launch()
        wait = rnd(1.5, 3)
      }

      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i]
        r.x += r.vx * dt
        r.y += r.vy * dt
        r.vy *= Math.pow(0.55, dt)
        sparks.push({ x: r.x, y: r.y, vx: rnd(-10, 10), vy: rnd(10, 40), life: 0, ttl: 0.4, c: '#E9D5FF', r: 1.2 })
        ctx.globalAlpha = 1
        ctx.fillStyle = '#FFFFFF'
        ctx.beginPath()
        ctx.arc(r.x, r.y, 1.8, 0, 6.283)
        ctx.fill()
        if (r.y <= r.ty || r.vy > -h * 0.15) {
          explode(r.x, r.y, r.c)
          rockets.splice(i, 1)
        }
      }

      for (let i = flashes.length - 1; i >= 0; i--) {
        const f = flashes[i]
        f.life += dt
        if (f.life >= f.ttl) { flashes.splice(i, 1); continue }
        const g = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r)
        g.addColorStop(0, f.c)
        g.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.globalAlpha = 0.35 * (1 - f.life / f.ttl)
        ctx.fillStyle = g
        ctx.fillRect(f.x - f.r, f.y - f.r, f.r * 2, f.r * 2)
      }

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i]
        s.life += dt
        if (s.life >= s.ttl) { sparks.splice(i, 1); continue }
        const drag = Math.pow(0.2, dt)
        s.vx *= drag
        s.vy = s.vy * drag + 70 * dt
        s.x += s.vx * dt
        s.y += s.vy * dt
        const a = 1 - s.life / s.ttl
        ctx.fillStyle = s.c
        ctx.globalAlpha = a
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r * (0.5 + a * 0.5), 0, 6.283)
        ctx.fill()
        ctx.globalAlpha = a * 0.22
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r * 3, 0, 6.283)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    resize()
    window.addEventListener('resize', resize)
    raf = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [reduce])

  if (reduce) return null
  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />
}

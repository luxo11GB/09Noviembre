import { motion, useReducedMotion } from 'framer-motion'
import { rand } from '../utils/rand'

const STARS = Array.from({ length: 60 }, (_, i) => ({
  x: rand(i, 1) * 100, y: rand(i, 2) * 100, s: 1 + rand(i, 3) * 1.8,
  d: 3 + rand(i, 4) * 4, delay: rand(i, 5) * 4,
}))
const MOTES = Array.from({ length: 18 }, (_, i) => ({
  x: rand(i, 6) * 100, y: 10 + rand(i, 7) * 85, s: 3 + rand(i, 8) * 6,
  d: 5 + rand(i, 9) * 5, delay: 1 + rand(i, 10) * 8,
}))

export default function Background() {
  const reduce = useReducedMotion()
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0"
      style={{ background: 'radial-gradient(ellipse at 50% 55%, #301052 0%, #231042 45%, #170D2B 85%)' }}>
      {STARS.map((s, i) => (
        <span key={i} className="star absolute rounded-full bg-lilac"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, '--d': `${s.d}s`, '--delay': `${s.delay}s` }} />
      ))}
      {MOTES.map((m, i) => (
        <motion.span key={i} className="absolute rounded-full"
          style={{ left: `${m.x}%`, top: `${m.y}%`, width: m.s, height: m.s, opacity: reduce ? 0.35 : 0,
            background: 'radial-gradient(circle, #fff 0%, #B57AE8 45%, transparent 70%)' }}
          animate={reduce ? undefined : { opacity: [0, 0.85, 0], scale: [0.6, 1.2, 0.6], y: [0, -24] }}
          transition={{ duration: m.d, delay: m.delay, repeat: Infinity, ease: 'easeInOut' }} />
      ))}
    </div>
  )
}

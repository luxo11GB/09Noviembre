import { motion, useReducedMotion } from 'framer-motion'
import { rand } from '../utils/rand'

const PETALS = Array.from({ length: 14 }, (_, i) => ({
  x: rand(i, 20) * 100, size: 10 + rand(i, 21) * 12, dur: 14 + rand(i, 22) * 10,
  delay: 4 + rand(i, 23) * 14, sway: 20 + rand(i, 24) * 40, rot: 180 + rand(i, 25) * 360,
  light: rand(i, 26) > 0.5,
}))

export default function Petals() {
  const reduce = useReducedMotion()
  if (reduce) return null
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
      {PETALS.map((p, i) => (
        <motion.span key={i} className="absolute block"
          style={{ left: `${p.x}%`, top: 0, width: p.size, height: p.size * 1.3, borderRadius: '80% 0 80% 0', opacity: 0,
            background: p.light ? 'linear-gradient(135deg,#E9D5FF,#B57AE8)' : 'linear-gradient(135deg,#B57AE8,#7a3fb5)' }}
          animate={{ y: ['-10vh', '110vh'], x: [0, p.sway, -p.sway, p.sway / 2], rotate: [0, p.rot], opacity: [0, 0.85, 0.85, 0] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'linear' }} />
      ))}
    </div>
  )
}

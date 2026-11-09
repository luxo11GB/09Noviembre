import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { GROUPS } from '../data/phrases'
import { useIsWide } from '../hooks/useIsWide'
import { rand } from '../utils/rand'

const START = 3.2   // segundos antes de la primera frase
const STEP = 0.7    // separación entre frases (primera tanda)

function Phrase({ p, i, wide, first }) {
  const reduce = useReducedMotion()
  const pos = wide ? p.d : p.m
  const dx = 6 + rand(i, 11) * 8
  const dy = 8 + rand(i, 12) * 8
  const dur = 9 + rand(i, 13) * 6
  const delay = first ? START + i * STEP : 0.2 + i * 0.45
  return (
    <li lang={p.lang} dir={p.dir} className="absolute"
      style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -50%)',
        width: 'max-content', maxWidth: i === 0 ? '90vw' : wide ? '26vw' : '48vw' }}>
      <motion.div
        initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
        animate={{ opacity: p.opacity, y: 0, filter: 'blur(0px)' }}
        transition={{ delay, duration: 2.2, ease: 'easeOut' }}>
        <motion.p
          animate={reduce ? undefined : { x: [0, dx, 0, -dx, 0], y: [0, -dy, 0, dy, 0] }}
          transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut' }}
          style={{ margin: 0, textAlign: 'center', lineHeight: 1.25, fontFamily: p.font,
            fontStyle: p.italic ? 'italic' : 'normal', fontSize: `calc(var(--u) * ${(p.k * p.s).toFixed(3)})`,
            color: p.color, textShadow: '0 0 14px rgba(181,122,232,0.55), 0 0 2px rgba(23,13,43,0.6)' }}>
          {p.text}
        </motion.p>
      </motion.div>
    </li>
  )
}

export default function FloatingPhrases() {
  const wide = useIsWide()
  const [round, setRound] = useState(0)

  // Cambia de tanda de idiomas cada cierto tiempo
  useEffect(() => {
    const t = setTimeout(() => setRound((r) => r + 1), round === 0 ? 19000 : 15000)
    return () => clearTimeout(t)
  }, [round])

  const group = GROUPS[round % GROUPS.length]
  return (
    <AnimatePresence mode="wait">
      <motion.ul key={round} exit={{ opacity: 0 }} transition={{ duration: 1.6 }}
        className="pointer-events-none absolute inset-0 z-10 m-0 list-none p-0"
        style={{ '--u': wide ? 'clamp(0.85rem, min(3.4vw, 2.4vh), 1.6rem)' : 'clamp(0.85rem, min(3.4vw, 1.8vh), 1.35rem)' }}>
        {group.map((p, i) => <Phrase key={p.lang} p={p} i={i} wide={wide} first={round === 0} />)}
      </motion.ul>
    </AnimatePresence>
  )
}

import { motion } from 'framer-motion'
import { useIsWide } from '../hooks/useIsWide'

const BASE = [200, 400] // punto donde se juntan los tallos

const ROSES = [[200, 192, 1.7, 0], [135, 222, 1.35, -12], [268, 218, 1.4, 10], [92, 262, 1, -20], [312, 258, 1, 18], [170, 268, 1.15, -6], [235, 270, 1.2, 8]]
const TULIPS = [[150, 125, -12, 1.1], [250, 122, 12, 1.1], [200, 88, 0, 1.15], [88, 190, -28, 1], [312, 188, 28, 1]]
const LAVENDER = [[118, 95], [150, 55], [185, 40], [222, 42], [255, 58], [284, 98], [98, 140], [302, 140]]
const LILACS = [[112, 150], [290, 152], [168, 150], [232, 150], [75, 215], [332, 218], [200, 140], [62, 165]]
const LEAVES = [[-80, 1.5], [80, 1.5], [-58, 1.7], [58, 1.7], [-35, 1.6], [35, 1.6]]

const Stem = ({ x, y, w = 3 }) => (
  <path d={`M${BASE[0]} ${BASE[1]} Q${(BASE[0] + x) / 2} ${(BASE[1] + y) / 2 + 20} ${x} ${y}`} stroke="#3f7a56" strokeWidth={w} fill="none" strokeLinecap="round" />
)

const Leaf = ({ r, s }) => (
  <g transform={`translate(200 300) rotate(${r}) scale(${s})`}>
    <path d="M0 0 C14 -18 14 -44 0 -64 C-14 -44 -14 -18 0 0Z" fill="url(#leaf)" />
    <path d="M0 -2 L0 -56" stroke="#b9e3c8" strokeOpacity=".5" strokeWidth=".8" />
  </g>
)

const Rose = ({ x, y, s, r }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    {[0, 72, 144, 216, 288].map((a) => (
      <ellipse key={a} cx="0" cy="-16" rx="17" ry="19" transform={`rotate(${a})`} fill="url(#rOuter)" stroke="#4d1c82" strokeOpacity=".35" strokeWidth=".8" />
    ))}
    {[36, 108, 180, 252, 324].map((a) => (
      <ellipse key={a} cx="0" cy="-10" rx="12" ry="14" transform={`rotate(${a})`} fill="url(#rMid)" stroke="#4d1c82" strokeOpacity=".25" strokeWidth=".7" />
    ))}
    <circle r="9" fill="url(#rIn)" />
    <path d="M-5 -2 q5 -7 10 0 q-4 6 -9 2z" fill="none" stroke="#E9D5FF" strokeOpacity=".7" strokeWidth=".9" />
    <path d="M-14 -22 q6 -9 16 -8" fill="none" stroke="#fff" strokeOpacity=".25" strokeWidth="1.2" strokeLinecap="round" />
  </g>
)

const Tulip = ({ x, y, r, s }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <path d="M-17 -8 C-20 -34 -12 -52 -9 -56 L-2 -40 L0 -60 L2 -40 L9 -56 C12 -52 20 -34 17 -8 C12 4 -12 4 -17 -8Z" fill="url(#tulip)" stroke="#4d1c82" strokeOpacity=".4" />
    <path d="M0 -60 C-4 -36 -4 -14 0 2 C4 -14 4 -36 0 -60" fill="#E9D5FF" fillOpacity=".22" />
  </g>
)

const Lavender = ({ x, y }) => {
  const dx = x - BASE[0], dy = y - BASE[1]
  const ang = (Math.atan2(dx, -dy) * 180) / Math.PI
  return (
    <g>
      <path d={`M${BASE[0]} ${BASE[1]} L${x} ${y}`} stroke="#4f8a64" strokeWidth="2" strokeLinecap="round" />
      <g transform={`translate(${x} ${y}) rotate(${ang})`}>
        {Array.from({ length: 9 }, (_, i) => {
          const yy = i * 9 + 2, w = 5.2 - i * 0.3, c = i % 2 ? '#B57AE8' : '#9a5fd8'
          return (
            <g key={i}>
              <ellipse cx="-4" cy={yy} rx={w * 0.55} ry={w} transform={`rotate(-25 -4 ${yy})`} fill={c} />
              <ellipse cx="4" cy={yy + 3} rx={w * 0.55} ry={w} transform={`rotate(25 4 ${yy + 3})`} fill={c} />
            </g>
          )
        })}
        <ellipse cx="0" cy="-2" rx="2.6" ry="5" fill="#c9a0f2" />
      </g>
    </g>
  )
}

const LilacSprig = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`}>
    {[[0, 0], [9, -8], [-9, -7], [4, 8], [-6, 8], [15, 3]].map(([ox, oy], i) => (
      <g key={i} transform={`translate(${ox} ${oy}) rotate(${i * 25})`}>
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={a} cx="0" cy="-4.5" rx="3.4" ry="4.8" transform={`rotate(${a})`} fill="#E9D5FF" fillOpacity=".95" />
        ))}
        <circle r="1.8" fill="#B57AE8" />
      </g>
    ))}
  </g>
)

function BouquetArt() {
  return (
    <svg viewBox="0 0 400 520" role="img" aria-label="Ramo de rosas moradas, tulipanes violetas, lavanda y pequeñas flores lilas envuelto en papel lavanda" style={{ width: '100%', height: 'auto', overflow: 'visible', display: 'block' }}>
      <defs>
        <radialGradient id="rOuter" cx="50%" cy="60%" r="65%"><stop offset="0" stopColor="#9d4fd6" /><stop offset="1" stopColor="#5a1f94" /></radialGradient>
        <radialGradient id="rMid" cx="50%" cy="60%" r="65%"><stop offset="0" stopColor="#c08ced" /><stop offset="1" stopColor="#7a34b8" /></radialGradient>
        <radialGradient id="rIn" cx="50%" cy="50%" r="60%"><stop offset="0" stopColor="#e2c4f8" /><stop offset="1" stopColor="#9a55d4" /></radialGradient>
        <linearGradient id="tulip" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#c9a3f2" /><stop offset="1" stopColor="#6d2fb0" /></linearGradient>
        <linearGradient id="leaf" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#6aae85" /><stop offset="1" stopColor="#2c6a49" /></linearGradient>
        <linearGradient id="paperBack" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8e4fc9" /><stop offset="1" stopColor="#4a1d7a" /></linearGradient>
        <linearGradient id="paperL" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#E9D5FF" /><stop offset="1" stopColor="#B57AE8" /></linearGradient>
        <linearGradient id="paperR" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#B57AE8" /><stop offset="1" stopColor="#7a3fb5" /></linearGradient>
      </defs>

      <path d="M200 505 L38 262 Q120 222 200 240 Q280 222 362 262 Z" fill="url(#paperBack)" />

      {ROSES.map(([x, y]) => <Stem key={`s${x}`} x={x} y={y} w={3.5} />)}
      {TULIPS.map(([x, y]) => <Stem key={`t${x}`} x={x} y={y} />)}
      {LILACS.map(([x, y]) => <Stem key={`l${x}`} x={x} y={y} w={1.6} />)}
      {LEAVES.map(([r, s]) => <Leaf key={r} r={r} s={s} />)}
      {LAVENDER.map(([x, y]) => <Lavender key={x} x={x} y={y} />)}
      {TULIPS.map(([x, y, r, s]) => <Tulip key={x} x={x} y={y} r={r} s={s} />)}
      {LILACS.map(([x, y]) => <LilacSprig key={x} x={x} y={y} />)}
      {ROSES.map(([x, y, s, r]) => <Rose key={x} x={x} y={y} s={s} r={r} />)}

      <path d="M200 505 L70 285 Q140 335 206 322 Z" fill="url(#paperL)" />
      <path d="M200 505 L330 285 Q260 335 194 322 Z" fill="url(#paperR)" />
      <path d="M200 505 L200 330" stroke="#4a1d7a" strokeOpacity=".25" strokeWidth="1.5" />
      <path d="M130 345 L190 470" stroke="#fff" strokeOpacity=".35" strokeWidth="1.2" fill="none" />

      <path d="M156 428 Q200 446 244 428 L248 442 Q200 461 152 442Z" fill="#E9D5FF" stroke="#B57AE8" strokeWidth="1" />
      <path d="M200 440 C165 405 138 435 160 458 C175 466 192 452 200 440Z" fill="#E9D5FF" stroke="#B57AE8" strokeWidth="1" />
      <path d="M200 440 C235 405 262 435 240 458 C225 466 208 452 200 440Z" fill="#E9D5FF" stroke="#B57AE8" strokeWidth="1" />
      <path d="M196 446 L178 486 L191 477 L197 492Z M204 446 L222 486 L209 477 L203 492Z" fill="#d6b5f5" stroke="#B57AE8" strokeWidth="1" />
      <ellipse cx="200" cy="441" rx="9" ry="8" fill="#B57AE8" stroke="#E9D5FF" strokeWidth="1" />
    </svg>
  )
}

export default function Bouquet() {
  const wide = useIsWide()
  return (
    <div className="pointer-events-none absolute inset-0 grid place-items-center">
      <div className="relative" style={{ width: wide ? 'min(72vw, 46vh, 440px)' : 'min(70vw, 37vh, 440px)' }}>
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.8, filter: 'blur(14px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ delay: 1.2, duration: 2.2, ease: 'easeOut' }}
        >
          {/* Brillo delicado detrás de las flores */}
          <motion.div aria-hidden="true" className="absolute rounded-full"
            style={{ inset: '-22%', background: 'radial-gradient(circle, rgba(181,122,232,0.45) 0%, rgba(181,122,232,0.12) 45%, transparent 70%)' }}
            animate={{ opacity: [0.5, 1, 0.5], scale: [0.95, 1.06, 0.95] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div
            style={{ transformOrigin: '50% 95%', filter: 'drop-shadow(0 0 22px rgba(181,122,232,0.4))' }}
            animate={{ rotate: [-1, 1, -1] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}>
            <BouquetArt />
          </motion.div>
        </motion.div>

        {/* Mensaje debajo del ramo */}
        <div className="absolute left-1/2" style={{ top: '100%', transform: 'translateX(-50%)', width: wide ? 'min(34rem, 40vw)' : 'min(88vw, 30rem)' }}>
          <motion.p lang="es"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 4.4, duration: 2.4, ease: 'easeOut' }}
            style={{ margin: '0.9rem 0 0', textAlign: 'center', lineHeight: 1.3, fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic', fontWeight: 500, color: '#F3E8FF', fontSize: 'clamp(0.95rem, min(3.8vw, 3vh), 1.55rem)',
              textShadow: '0 0 14px rgba(181,122,232,0.7), 0 0 2px rgba(23,13,43,0.7)' }}>
            Hoy se regalan flores moradas y solo puedo pensar en ti,
            ya que no me aceptarías las flores reales, te envio estas 7 gerberas.
          </motion.p>
        </div>
      </div>
    </div>
  )
}

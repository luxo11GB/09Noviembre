import { motion } from 'framer-motion'

// Destello inicial: un punto de luz que se expande y se disuelve.
export default function Intro() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 grid place-items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.2 }}
        animate={{ opacity: [0, 1, 0], scale: [0.2, 1, 7] }}
        transition={{ duration: 2.6, times: [0, 0.35, 1], ease: 'easeOut' }}
        style={{ width: '12vmin', height: '12vmin', borderRadius: '50%',
          background: 'radial-gradient(circle, #fff 0%, #B57AE8 35%, transparent 70%)' }}
      />
    </div>
  )
}

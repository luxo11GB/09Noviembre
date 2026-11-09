import { MotionConfig } from 'framer-motion'
import Background from './components/Background.jsx'
import Fireworks from './components/Fireworks.jsx'
import Petals from './components/Petals.jsx'
import Intro from './components/Intro.jsx'
import Bouquet from './components/Bouquet.jsx'
import FloatingPhrases from './components/FloatingPhrases.jsx'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="relative h-[100dvh] w-full overflow-hidden bg-night">
        <h1 className="sr-only">Eres especial para mí</h1>
        <Background />
        <Fireworks />
        <Petals />
        <Bouquet />
        <FloatingPhrases />
        <Intro />
      </main>
    </MotionConfig>
  )
}

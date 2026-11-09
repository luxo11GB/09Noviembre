import { useEffect, useState } from 'react'

// true en pantallas horizontales (escritorio, laptops, celulares en horizontal)
const QUERY = '(min-aspect-ratio: 11/10)'

export function useIsWide() {
  const [wide, setWide] = useState(() => typeof window !== 'undefined' && window.matchMedia(QUERY).matches)
  useEffect(() => {
    const m = window.matchMedia(QUERY)
    const onChange = (e) => setWide(e.matches)
    m.addEventListener('change', onChange)
    return () => m.removeEventListener('change', onChange)
  }, [])
  return wide
}

// Número pseudoaleatorio determinista (0-1): mismo resultado en cada render.
export const rand = (i, k = 0) => {
  const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453
  return x - Math.floor(x)
}

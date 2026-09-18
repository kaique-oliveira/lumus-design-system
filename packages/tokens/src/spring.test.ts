import { describe, expect, it } from 'vitest'
import { springEasing } from './spring'

describe('springEasing', () => {
  it('comeca em 0, termina em 1 e devolve duracao em ms', () => {
    const { easing, duration } = springEasing({ response: 0.35, dampingFraction: 0.8 })
    expect(easing.startsWith('linear(0, ')).toBe(true)
    expect(easing.endsWith(', 1)')).toBe(true)
    expect(duration).toBeGreaterThan(300)
    expect(duration).toBeLessThan(800)
  })

  it('mola com menos amortecimento passa de 1 antes de assentar', () => {
    const { easing } = springEasing({ response: 0.4, dampingFraction: 0.5 })
    const points = easing.replace(/^linear\(|\)$/g, '').split(', ').map(Number)
    expect(Math.max(...points)).toBeGreaterThan(1)
  })

  it('resposta maior demora mais', () => {
    expect(springEasing({ response: 0.6 }).duration).toBeGreaterThan(springEasing({ response: 0.3 }).duration)
  })
})

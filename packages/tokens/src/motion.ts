import { springEasing } from './spring'

const spring = springEasing({ response: 0.35, dampingFraction: 0.8 })
const springBouncy = springEasing({ response: 0.4, dampingFraction: 0.65 })

export const duration = {
  instant: 100,
  fast: 150,
  base: 250,
  slow: 400,
  spring: spring.duration,
  'spring-bouncy': springBouncy.duration,
} as const

export type DurationToken = keyof typeof duration

export const easing = {
  /** Curva que o iOS usa em sheet e navegação. */
  ios: 'cubic-bezier(0.32, 0.72, 0, 1)',
  /** Saída rápida e assentamento suave, para elementos que aparecem. */
  out: 'cubic-bezier(0.16, 1, 0.3, 1)',
  /** Entrada acelerada, para elementos que somem. */
  in: 'cubic-bezier(0.55, 0, 1, 0.45)',
  spring: spring.easing,
  'spring-bouncy': springBouncy.easing,
} as const

export type EasingToken = keyof typeof easing

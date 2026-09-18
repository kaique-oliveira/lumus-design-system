export * from './colors'
export * from './radius'
export * from './shadows'
export * from './typography'
export * from './sizes'
export * from './motion'
export * from './spring'

import { colors } from './colors'
import { radius } from './radius'
import { shadows } from './shadows'
import { fontFamily, fontSize, fontWeight } from './typography'
import { controlHeight, breakpoints } from './sizes'
import { duration, easing } from './motion'

export const tokens = {
  colors,
  radius,
  shadows,
  fontFamily,
  fontSize,
  fontWeight,
  controlHeight,
  breakpoints,
  duration,
  easing,
} as const

export type Tokens = typeof tokens

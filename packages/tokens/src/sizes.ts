/** Altura dos controles. 44px é o alvo mínimo de toque do iOS. */
export const controlHeight = {
  sm: '2.25rem',
  md: '2.75rem',
  lg: '3.5rem',
} as const

export type ControlSize = keyof typeof controlHeight

export const breakpoints = {
  sm: '40rem',
  md: '48rem',
  lg: '64rem',
  xl: '80rem',
} as const

/**
 * Regra do raio: controle é pílula, superfície é 24px.
 * Os valores intermediários existem para peça dentro de peça, onde o raio
 * interno precisa ser menor que o externo para as curvas ficarem paralelas.
 */
export const radius = {
  pill: '9999px',
  surface: '1.5rem',
  field: '1.25rem',
  inner: '1rem',
  item: '0.75rem',
} as const

export type RadiusToken = keyof typeof radius

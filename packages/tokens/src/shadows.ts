export const lightShadows = {
  soft: '0 1px 2px rgba(0, 0, 0, 0.03), 0 2px 8px rgba(0, 0, 0, 0.06)',
  card: '0 1px 2px rgba(0, 0, 0, 0.03), 0 1px 6px rgba(0, 0, 0, 0.05)',
  floating:
    '0 2px 4px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.08), 0 12px 32px rgba(0, 0, 0, 0.06)',
  fab: '0 2px 4px rgba(0, 0, 0, 0.06), 0 6px 16px rgba(0, 0, 0, 0.18)',
} as const

export type ShadowToken = keyof typeof lightShadows
export type ShadowScale = Record<ShadowToken, string>

export const darkShadows: ShadowScale = {
  soft: '0 0 0 1px rgba(255, 255, 255, 0.05), 0 2px 8px rgba(0, 0, 0, 0.4)',
  card: '0 0 0 1px rgba(255, 255, 255, 0.05), 0 1px 6px rgba(0, 0, 0, 0.35)',
  floating:
    '0 0 0 1px rgba(255, 255, 255, 0.07), 0 4px 12px rgba(0, 0, 0, 0.5), 0 12px 32px rgba(0, 0, 0, 0.45)',
  fab: '0 0 0 1px rgba(255, 255, 255, 0.07), 0 6px 16px rgba(0, 0, 0, 0.6)',
}

export const shadows = { light: lightShadows, dark: darkShadows } as const

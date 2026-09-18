export const lightColors = {
  background: '#F2F2F7',
  surface: '#FFFFFF',
  'surface-muted': '#EDEDF2',
  border: 'rgba(0, 0, 0, 0.06)',
  'border-strong': 'rgba(0, 0, 0, 0.12)',
  foreground: '#1A1A1A',
  'foreground-secondary': '#6B6B6B',
  'foreground-muted': '#A1A1A6',
  overlay: 'rgba(0, 0, 0, 0.4)',

  primary: '#5938CF',
  'primary-hover': '#4B2DB2',
  'primary-active': '#3F2596',
  'primary-soft': '#EDE8FC',
  'primary-foreground': '#FFFFFF',

  neutral: '#1A1A1A',
  'neutral-hover': '#2C2C2E',
  'neutral-active': '#3A3A3C',
  'neutral-soft': '#EDEDF2',
  'neutral-foreground': '#FFFFFF',

  success: '#34C759',
  'success-hover': '#2DB350',
  'success-soft': '#E6F9EC',
  'success-foreground': '#FFFFFF',

  warning: '#FF9500',
  'warning-hover': '#E68600',
  'warning-soft': '#FFF3E0',
  'warning-foreground': '#1A1A1A',

  danger: '#FF3B30',
  'danger-hover': '#E6352B',
  'danger-soft': '#FFECEB',
  'danger-foreground': '#FFFFFF',

  info: '#0A84FF',
  'info-hover': '#0971DB',
  'info-soft': '#E5F1FF',
  'info-foreground': '#FFFFFF',
} as const

export type ColorToken = keyof typeof lightColors
export type ColorScale = Record<ColorToken, string>

export const darkColors: ColorScale = {
  background: '#0B0B0D',
  surface: '#1C1C1E',
  'surface-muted': '#2C2C2E',
  border: 'rgba(255, 255, 255, 0.08)',
  'border-strong': 'rgba(255, 255, 255, 0.16)',
  foreground: '#F5F5F7',
  'foreground-secondary': '#A1A1A6',
  'foreground-muted': '#6E6E73',
  overlay: 'rgba(0, 0, 0, 0.6)',

  primary: '#7B5CF5',
  'primary-hover': '#8D72F7',
  'primary-active': '#6A4BE6',
  'primary-soft': '#2A2153',
  'primary-foreground': '#FFFFFF',

  neutral: '#F5F5F7',
  'neutral-hover': '#E5E5EA',
  'neutral-active': '#D1D1D6',
  'neutral-soft': '#2C2C2E',
  'neutral-foreground': '#1A1A1A',

  success: '#30D158',
  'success-hover': '#4ADE74',
  'success-soft': '#10331C',
  'success-foreground': '#FFFFFF',

  warning: '#FF9F0A',
  'warning-hover': '#FFB340',
  'warning-soft': '#3A2A0A',
  'warning-foreground': '#1A1A1A',

  danger: '#FF453A',
  'danger-hover': '#FF6B61',
  'danger-soft': '#3B1512',
  'danger-foreground': '#FFFFFF',

  info: '#409CFF',
  'info-hover': '#66B0FF',
  'info-soft': '#0F2542',
  'info-foreground': '#FFFFFF',
}

export const colors = { light: lightColors, dark: darkColors } as const

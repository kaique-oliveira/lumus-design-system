import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Theme = 'light' | 'dark' | 'system'
export type ResolvedTheme = 'light' | 'dark'

export interface ThemeState {
  theme: Theme
  resolved: ResolvedTheme
  setTheme: (theme: Theme) => void
  toggle: () => void
}

const isBrowser = typeof window !== 'undefined'

function systemTheme(): ResolvedTheme {
  if (!isBrowser) return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function resolve(theme: Theme): ResolvedTheme {
  return theme === 'system' ? systemTheme() : theme
}

function applyToDocument(resolved: ResolvedTheme) {
  if (!isBrowser) return
  document.documentElement.setAttribute('data-theme', resolved)
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'system',
      resolved: 'light',
      setTheme: (theme) => {
        const resolved = resolve(theme)
        applyToDocument(resolved)
        set({ theme, resolved })
      },
      toggle: () => {
        const next: ResolvedTheme = get().resolved === 'dark' ? 'light' : 'dark'
        get().setTheme(next)
      },
    }),
    {
      name: 'lumus-theme',
      partialize: (state) => ({ theme: state.theme }),
      onRehydrateStorage: () => (state) => {
        if (!state) return
        const resolved = resolve(state.theme)
        applyToDocument(resolved)
        useThemeStore.setState({ resolved })
      },
    },
  ),
)

if (isBrowser) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const { theme } = useThemeStore.getState()
    if (theme === 'system') useThemeStore.getState().setTheme('system')
  })
}

/** Aplica o tema salvo no documento. Chame uma vez na raiz, ou use o ThemeSwitch, que já chama. */
export function initTheme() {
  const { theme } = useThemeStore.getState()
  useThemeStore.getState().setTheme(theme)
}

export function useTheme() {
  const theme = useThemeStore((state) => state.theme)
  const resolved = useThemeStore((state) => state.resolved)
  const setTheme = useThemeStore((state) => state.setTheme)
  const toggle = useThemeStore((state) => state.toggle)
  return { theme, resolved, setTheme, toggle }
}

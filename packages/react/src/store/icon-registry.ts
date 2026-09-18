import type { ComponentType } from 'react'
import { create } from 'zustand'

/**
 * Qualquer componente de ícone serve: lucide, phosphor, iconsax, react-icons,
 * os do @lumus-ui/icons ou um seu. Só precisa aceitar `className` opcional.
 */
export type IconComponent = ComponentType<{ className?: string }>

/**
 * Nomes registrados. Aumente para ganhar IntelliSense:
 *
 * declare module '@lumus-ui/react' {
 *   interface IconRegistry { home: true; search: true }
 * }
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IconRegistry {}

export type IconName = keyof IconRegistry extends never
  ? string
  : keyof IconRegistry | (string & {})

interface IconRegistryState {
  icons: Record<string, IconComponent>
  register: (icons: Record<string, IconComponent>) => void
  unregister: (names: string[]) => void
  clear: () => void
}

export const useIconRegistry = create<IconRegistryState>()((set) => ({
  icons: {},
  register: (icons) => set((state) => ({ icons: { ...state.icons, ...icons } })),
  unregister: (names) =>
    set((state) => {
      const next = { ...state.icons }
      for (const name of names) delete next[name]
      return { icons: next }
    }),
  clear: () => set({ icons: {} }),
}))

/**
 * Registra ícones por nome para usar como `icon="home"` em qualquer componente.
 * Aceita o mapa inteiro de uma lib: `registerIcons(icons)` do @lumus-ui/icons,
 * ou `registerIcons({ home: Home, search: Search })` do lucide.
 */
export function registerIcons(icons: Record<string, IconComponent>) {
  useIconRegistry.getState().register(icons)
}

export function getRegisteredIcon(name: string): IconComponent | undefined {
  return useIconRegistry.getState().icons[name]
}

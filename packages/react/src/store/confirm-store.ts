import type { ReactNode } from 'react'
import { create } from 'zustand'

export interface ConfirmOptions {
  title?: ReactNode
  description?: ReactNode
  confirmLabel?: string
  cancelLabel?: string
  /** `danger` pinta o botão de confirmar de vermelho, para ação destrutiva. */
  variant?: 'default' | 'danger'
  icon?: ReactNode
  /** Roda antes de fechar. Se devolver promessa, o botão mostra carregando até resolver. */
  onConfirm?: () => void | Promise<void>
}

export interface ConfirmRequest extends ConfirmOptions {
  id: number
  resolve: (confirmed: boolean) => void
}

interface ConfirmState {
  current: ConfirmRequest | null
  open: (options: ConfirmOptions) => Promise<boolean>
  settle: (confirmed: boolean) => void
}

let counter = 0

export const useConfirmStore = create<ConfirmState>()((set, get) => ({
  current: null,
  open: (options) =>
    new Promise<boolean>((resolve) => {
      get().current?.resolve(false)
      set({ current: { ...options, id: ++counter, resolve } })
    }),
  settle: (confirmed) => {
    const current = get().current
    if (!current) return
    set({ current: null })
    current.resolve(confirmed)
  },
}))

/**
 * Abre a caixa de confirmação e devolve `true` quando o usuário confirma.
 * Precisa do `<Confirmer />` montado uma vez na aplicação.
 */
export function confirm(options: ConfirmOptions | string): Promise<boolean> {
  const resolved = typeof options === 'string' ? { description: options } : options
  return useConfirmStore.getState().open(resolved)
}

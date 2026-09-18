import type { ReactNode } from 'react'
import { create } from 'zustand'

export type ToastVariant = 'info' | 'success' | 'warning' | 'danger'

export interface ToastAction {
  label: string
  onClick: () => void
}

export interface ToastOptions {
  /** Id próprio, para atualizar ou fechar depois. Gerado quando não vem. */
  id?: string
  title?: ReactNode
  description?: ReactNode
  variant?: ToastVariant
  /** Milissegundos até fechar sozinho. `0` mantém até o usuário fechar. Padrão 4000. */
  duration?: number
  action?: ToastAction
  /** Mostra o botão de fechar. Padrão `true`. */
  dismissible?: boolean
  /** Ícone à esquerda. `null` esconde. Sem valor, usa o ícone da variante. */
  icon?: ReactNode
  onDismiss?: () => void
}

export interface ToastItem extends ToastOptions {
  id: string
  variant: ToastVariant
  duration: number
  createdAt: number
  /** Marca a saída para a animação rodar antes de remover. */
  dismissed: boolean
}

interface ToastState {
  toasts: ToastItem[]
  add: (options: ToastOptions) => string
  update: (id: string, options: Partial<ToastOptions>) => void
  dismiss: (id?: string) => void
  remove: (id: string) => void
}

let counter = 0
const nextId = () => `toast-${++counter}-${Date.now().toString(36)}`

export const useToastStore = create<ToastState>()((set, get) => ({
  toasts: [],
  add: (options) => {
    const id = options.id ?? nextId()
    const existing = get().toasts.find((toast) => toast.id === id)
    if (existing) {
      get().update(id, options)
      return id
    }
    const item: ToastItem = {
      dismissible: true,
      ...options,
      id,
      variant: options.variant ?? 'info',
      duration: options.duration ?? 4000,
      createdAt: Date.now(),
      dismissed: false,
    }
    set((state) => ({ toasts: [...state.toasts, item] }))
    return id
  },
  update: (id, options) => {
    set((state) => ({
      toasts: state.toasts.map((toast) =>
        toast.id === id ? { ...toast, ...options, dismissed: false, createdAt: Date.now() } : toast,
      ),
    }))
  },
  dismiss: (id) => {
    set((state) => ({
      toasts: state.toasts.map((toast) =>
        id === undefined || toast.id === id ? { ...toast, dismissed: true } : toast,
      ),
    }))
    for (const toast of get().toasts) {
      if ((id === undefined || toast.id === id) && toast.dismissed) toast.onDismiss?.()
    }
  },
  remove: (id) => {
    set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) }))
  },
}))

type ToastInput = string | ToastOptions

function normalize(input: ToastInput, variant?: ToastVariant): ToastOptions {
  const options = typeof input === 'string' ? { description: input } : input
  return variant ? { ...options, variant } : options
}

export interface ToastPromiseMessages<T> {
  loading: ToastInput
  success: ToastInput | ((value: T) => ToastInput)
  error: ToastInput | ((error: unknown) => ToastInput)
}

/**
 * API imperativa das notificações. Funciona fora de componente React,
 * por exemplo em um interceptor de HTTP.
 */
export function toast(input: ToastInput): string {
  return useToastStore.getState().add(normalize(input))
}

toast.info = (input: ToastInput) => useToastStore.getState().add(normalize(input, 'info'))
toast.success = (input: ToastInput) => useToastStore.getState().add(normalize(input, 'success'))
toast.warning = (input: ToastInput) => useToastStore.getState().add(normalize(input, 'warning'))
toast.error = (input: ToastInput) => useToastStore.getState().add(normalize(input, 'danger'))
toast.dismiss = (id?: string) => useToastStore.getState().dismiss(id)
toast.update = (id: string, options: Partial<ToastOptions>) =>
  useToastStore.getState().update(id, options)

toast.promise = async <T>(promise: Promise<T>, messages: ToastPromiseMessages<T>): Promise<T> => {
  const id = useToastStore
    .getState()
    .add({ ...normalize(messages.loading, 'info'), duration: 0, dismissible: false })
  try {
    const value = await promise
    const success =
      typeof messages.success === 'function' ? messages.success(value) : messages.success
    useToastStore
      .getState()
      .update(id, { ...normalize(success, 'success'), duration: 4000, dismissible: true })
    return value
  } catch (error) {
    const failure = typeof messages.error === 'function' ? messages.error(error) : messages.error
    useToastStore
      .getState()
      .update(id, { ...normalize(failure, 'danger'), duration: 6000, dismissible: true })
    throw error
  }
}

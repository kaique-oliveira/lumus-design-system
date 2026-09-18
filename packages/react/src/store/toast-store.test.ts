import { beforeEach, describe, expect, it } from 'vitest'
import { toast, useToastStore } from './toast-store'

beforeEach(() => {
  useToastStore.setState({ toasts: [] })
})

describe('toast', () => {
  it('enfileira em vez de substituir', () => {
    toast('um')
    toast.success('dois')
    expect(useToastStore.getState().toasts).toHaveLength(2)
    expect(useToastStore.getState().toasts[1]?.variant).toBe('success')
  })

  it('atualiza quando o id repete', () => {
    const id = toast({ id: 'x', description: 'a' })
    toast({ id: 'x', description: 'b' })
    const toasts = useToastStore.getState().toasts
    expect(toasts).toHaveLength(1)
    expect(toasts[0]?.id).toBe(id)
    expect(toasts[0]?.description).toBe('b')
  })

  it('marca saida no dismiss e remove depois', () => {
    const id = toast('x')
    toast.dismiss(id)
    expect(useToastStore.getState().toasts[0]?.dismissed).toBe(true)
    useToastStore.getState().remove(id)
    expect(useToastStore.getState().toasts).toHaveLength(0)
  })

  it('promise troca de carregando para sucesso', async () => {
    await toast.promise(Promise.resolve(3), {
      loading: 'carregando',
      success: (value) => `pronto ${value}`,
      error: 'erro',
    })
    const [item] = useToastStore.getState().toasts
    expect(item?.variant).toBe('success')
    expect(item?.description).toBe('pronto 3')
  })
})

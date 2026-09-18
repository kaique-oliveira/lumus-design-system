import { describe, expect, it } from 'vitest'
import { confirm, useConfirmStore } from './confirm-store'

describe('confirm', () => {
  it('resolve true ao confirmar', async () => {
    const promise = confirm('apagar?')
    expect(useConfirmStore.getState().current?.description).toBe('apagar?')
    useConfirmStore.getState().settle(true)
    await expect(promise).resolves.toBe(true)
    expect(useConfirmStore.getState().current).toBeNull()
  })

  it('cancela a anterior quando abre outra', async () => {
    const first = confirm('a')
    const second = confirm('b')
    await expect(first).resolves.toBe(false)
    useConfirmStore.getState().settle(false)
    await expect(second).resolves.toBe(false)
  })
})

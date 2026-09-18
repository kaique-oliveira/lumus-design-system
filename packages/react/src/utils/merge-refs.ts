import type { Ref, RefCallback } from 'react'

/** Junta várias refs em uma só, para o componente usar a própria e repassar a de fora. */
export function mergeRefs<T>(...refs: Array<Ref<T> | undefined>): RefCallback<T> {
  return (node) => {
    for (const ref of refs) {
      if (!ref) continue
      if (typeof ref === 'function') ref(node)
      else ref.current = node
    }
  }
}

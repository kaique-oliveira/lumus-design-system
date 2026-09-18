import { useId as useReactId } from 'react'

/** Usa o id de fora quando existe, senão gera um estável. */
export function useFieldId(id?: string) {
  const generated = useReactId()
  return id ?? `lumus-${generated}`
}

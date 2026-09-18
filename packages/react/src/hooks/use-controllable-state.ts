import { useCallback, useRef, useState } from 'react'

export interface UseControllableStateOptions<T> {
  value?: T
  defaultValue: T
  onChange?: (value: T) => void
}

/**
 * Estado que funciona controlado ou não, conforme `value` venha de fora.
 * Padrão de todo componente com valor da lib.
 */
export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: UseControllableStateOptions<T>) {
  const [internal, setInternal] = useState<T>(defaultValue)
  const isControlled = value !== undefined
  const current = isControlled ? value : internal

  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange
  const currentRef = useRef(current)
  currentRef.current = current

  const setValue = useCallback(
    (next: T | ((previous: T) => T)) => {
      const resolved =
        typeof next === 'function' ? (next as (previous: T) => T)(currentRef.current) : next
      if (Object.is(resolved, currentRef.current)) return
      if (!isControlled) setInternal(resolved)
      onChangeRef.current?.(resolved)
    },
    [isControlled],
  )

  return [current, setValue] as const
}

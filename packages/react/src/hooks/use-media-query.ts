import { useSyncExternalStore } from 'react'

function subscribe(query: string, callback: () => void) {
  const media = window.matchMedia(query)
  media.addEventListener('change', callback)
  return () => media.removeEventListener('change', callback)
}

/** Lê uma media query e reage quando ela muda. Devolve `false` no servidor. */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (callback) => subscribe(query, callback),
    () => window.matchMedia(query).matches,
    () => false,
  )
}

/** Abaixo do breakpoint `sm` do Tailwind. É onde overlay vira sheet. */
export function useIsMobile() {
  return useMediaQuery('(max-width: 639px)')
}

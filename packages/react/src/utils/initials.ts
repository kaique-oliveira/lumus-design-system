/** Iniciais de um nome, no máximo duas letras, para o fallback do avatar. */
export function getInitials(name: string, max = 2): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return ''
  if (parts.length === 1) return parts[0]!.slice(0, max).toUpperCase()
  const first = parts[0]!.charAt(0)
  const last = parts[parts.length - 1]!.charAt(0)
  return (first + last).slice(0, max).toUpperCase()
}

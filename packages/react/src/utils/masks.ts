/**
 * Máscaras de texto para campos.
 * Padrão de máscara: `9` é dígito, `A` é letra, `*` é qualquer caractere,
 * o resto é literal e entra sozinho conforme o usuário digita.
 */

export type MaskPreset = 'cpf' | 'cnpj' | 'phone' | 'cep' | 'date' | 'time' | 'currency' | 'number'
export type MaskFunction = (rawValue: string) => string
export type Mask = MaskPreset | MaskFunction | (string & {})

const patterns: Record<Exclude<MaskPreset, 'currency' | 'number'>, string> = {
  cpf: '999.999.999-99',
  cnpj: '99.999.999/9999-99',
  phone: '(99) 99999-9999',
  cep: '99999-999',
  date: '99/99/9999',
  time: '99:99',
}

const tokenMatchers: Record<string, RegExp> = {
  '9': /\d/,
  A: /[a-zA-ZÀ-ÿ]/,
  '*': /./,
}

export function applyPattern(value: string, pattern: string): string {
  let output = ''
  let valueIndex = 0

  for (const patternChar of pattern) {
    if (valueIndex >= value.length) break
    const matcher = tokenMatchers[patternChar]

    if (matcher) {
      while (valueIndex < value.length && !matcher.test(value.charAt(valueIndex))) valueIndex++
      if (valueIndex >= value.length) break
      output += value.charAt(valueIndex)
      valueIndex++
    } else {
      output += patternChar
      if (value.charAt(valueIndex) === patternChar) valueIndex++
    }
  }

  return output
}

/** Telefone brasileiro: aceita fixo com 8 dígitos e celular com 9. */
function phoneMask(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  return applyPattern(digits, digits.length <= 10 ? '(99) 9999-9999' : patterns.phone)
}

/** Dinheiro em real: os dígitos entram pela direita, como em caixa de banco. */
export function currencyMask(value: string, locale = 'pt-BR', currency = 'BRL') {
  const digits = value.replace(/\D/g, '')
  if (!digits) return ''
  const amount = Number(digits) / 100
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount)
}

function numberMask(value: string) {
  const cleaned = value.replace(/[^\d.,-]/g, '')
  const sign = cleaned.startsWith('-') ? '-' : ''
  const body = cleaned.replace(/-/g, '')
  const firstSeparator = body.search(/[.,]/)
  if (firstSeparator === -1) return sign + body
  const integer = body.slice(0, firstSeparator)
  const decimal = body.slice(firstSeparator + 1).replace(/[.,]/g, '')
  return `${sign}${integer}${body.charAt(firstSeparator)}${decimal}`
}

export function applyMask(value: string, mask: Mask | null | undefined): string {
  if (!mask) return value
  if (typeof mask === 'function') return mask(value)

  switch (mask) {
    case 'phone':
      return phoneMask(value)
    case 'currency':
      return currencyMask(value)
    case 'number':
      return numberMask(value)
    case 'cpf':
    case 'cnpj':
    case 'cep':
    case 'date':
    case 'time':
      return applyPattern(value.replace(/\D/g, ''), patterns[mask as keyof typeof patterns])
    default:
      return applyPattern(value, mask)
  }
}

/** Remove a máscara. Para dinheiro devolve o número em string com ponto decimal. */
export function unmask(value: string, mask: Mask | null | undefined): string {
  if (!mask || typeof mask === 'function') return value
  if (mask === 'currency') {
    const digits = value.replace(/\D/g, '')
    return digits ? (Number(digits) / 100).toFixed(2) : ''
  }
  if (mask === 'number') return value.replace(',', '.')
  if (mask in patterns || mask === 'phone') return value.replace(/\D/g, '')
  return value.replace(/[^a-zA-Z0-9À-ÿ]/g, '')
}

/** Tamanho máximo que o campo precisa aceitar com a máscara aplicada. */
export function maskMaxLength(mask: Mask | null | undefined): number | undefined {
  if (!mask || typeof mask === 'function' || mask === 'currency' || mask === 'number')
    return undefined
  if (mask === 'phone') return patterns.phone.length
  if (mask in patterns) return patterns[mask as keyof typeof patterns].length
  return mask.length
}

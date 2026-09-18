export interface SpringOptions {
  /** Tempo de resposta em segundos, como o `response` do SwiftUI. */
  response?: number
  /** Fração de amortecimento entre 0 e 1, como o `dampingFraction` do SwiftUI. */
  dampingFraction?: number
  /** Distância de 1 abaixo da qual a mola é considerada parada. */
  precision?: number
  /** Quantidade de pontos amostrados para a função `linear()`. */
  samples?: number
}

export interface SpringEasing {
  /** Valor pronto para `animation-timing-function` ou `transition-timing-function`. */
  easing: string
  /** Duração em milissegundos que a mola leva para assentar. */
  duration: number
}

/**
 * Converte uma mola no estilo do iOS em uma curva CSS `linear()`.
 * O CSS não tem mola nativa, então a posição da mola é amostrada e vira uma
 * sequência de pontos que o navegador interpola.
 */
export function springEasing({
  response = 0.35,
  dampingFraction = 0.8,
  precision = 0.001,
  samples = 48,
}: SpringOptions = {}): SpringEasing {
  const omega = (2 * Math.PI) / response
  const zeta = dampingFraction
  const settle = -Math.log(precision) / (zeta * omega)
  const omegaD = omega * Math.sqrt(1 - zeta * zeta)

  const position = (t: number) => {
    const decay = Math.exp(-zeta * omega * t)
    return 1 - decay * (Math.cos(omegaD * t) + ((zeta * omega) / omegaD) * Math.sin(omegaD * t))
  }

  const points: string[] = []
  for (let i = 0; i <= samples; i++) {
    const t = (settle * i) / samples
    points.push(Number(position(t).toFixed(4)).toString())
  }
  points[points.length - 1] = '1'

  return { easing: `linear(${points.join(', ')})`, duration: Math.round(settle * 1000) }
}

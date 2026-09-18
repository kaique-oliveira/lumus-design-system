import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'
import { createTV } from 'tailwind-variants'

/**
 * Configuração do tailwind-merge com os tokens da lib, para que
 * `rounded-pill` e `rounded-none` passados juntos resolvam para o último.
 */
export const twMergeConfig = {
  extend: {
    theme: {
      radius: ['pill', 'surface', 'field', 'inner', 'item'],
      shadow: ['soft', 'card', 'floating', 'fab'],
      text: ['2xs'],
      ease: ['ios', 'out', 'in', 'spring', 'spring-bouncy'],
      spacing: ['control-sm', 'control-md', 'control-lg'],
    },
    classGroups: {
      'lumus-press': ['press', 'press-soft'],
      'lumus-scrollbar': ['scrollbar-soft', 'scrollbar-none'],
    },
  },
}

export const twMerge = extendTailwindMerge<'lumus-press' | 'lumus-scrollbar'>(twMergeConfig)

/** Junta classes condicionais e resolve conflito entre utilitários do Tailwind. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** `tv` do tailwind-variants já com o merge configurado para os tokens da lib. */
export const tv = createTV({ twMergeConfig })

export type { VariantProps } from 'tailwind-variants'

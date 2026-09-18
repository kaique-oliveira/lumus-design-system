import { Slot } from '@radix-ui/react-slot'
import type { ComponentProps, ElementType } from 'react'
import { tv, type VariantProps } from '../../utils/cn'

export const textStyles = tv({
  base: 'm-0 font-sans',
  variants: {
    size: {
      '2xs': 'text-2xs',
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
    },
    weight: {
      regular: 'font-regular',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    color: {
      inherit: 'text-inherit',
      foreground: 'text-foreground',
      secondary: 'text-foreground-secondary',
      muted: 'text-foreground-muted',
      primary: 'text-primary',
      success: 'text-success',
      warning: 'text-warning',
      danger: 'text-danger',
      info: 'text-info',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
    truncate: {
      true: 'truncate',
      1: 'line-clamp-1',
      2: 'line-clamp-2',
      3: 'line-clamp-3',
      4: 'line-clamp-4',
    },
    tabular: {
      true: 'tabular-nums',
    },
    uppercase: {
      true: 'uppercase tracking-widest',
    },
  },
  defaultVariants: {
    size: 'sm',
    weight: 'regular',
    color: 'foreground',
  },
})

export type TextElement =
  | 'p'
  | 'span'
  | 'div'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'label'
  | 'strong'
  | 'em'
  | 'small'
  | 'legend'
  | 'figcaption'
  | 'time'

export interface TextProps
  extends Omit<ComponentProps<'p'>, 'color'>, VariantProps<typeof textStyles> {
  /** Elemento HTML renderizado. Padrão `p`. */
  as?: TextElement
  asChild?: boolean
}

export function Text({
  as = 'p',
  asChild,
  size,
  weight,
  color,
  align,
  truncate,
  tabular,
  uppercase,
  className,
  ...props
}: TextProps) {
  const Component: ElementType = asChild ? Slot : as
  return (
    <Component
      data-slot="text"
      className={textStyles({
        size,
        weight,
        color,
        align,
        truncate,
        tabular,
        uppercase,
        className,
      })}
      {...props}
    />
  )
}

export interface HeadingProps extends Omit<TextProps, 'as'> {
  /** Nível do título. Define o elemento `h1` a `h6` e o tamanho padrão. */
  level?: 1 | 2 | 3 | 4 | 5 | 6
}

const headingSizes = { 1: '3xl', 2: '2xl', 3: 'xl', 4: 'lg', 5: 'base', 6: 'sm' } as const

export function Heading({ level = 2, size, weight = 'semibold', ...props }: HeadingProps) {
  return <Text as={`h${level}`} size={size ?? headingSizes[level]} weight={weight} {...props} />
}

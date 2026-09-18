import { Slot } from '@radix-ui/react-slot'
import type { ComponentProps, ElementType } from 'react'
import { tv, type VariantProps } from '../../utils/cn'

export const boxStyles = tv({
  base: 'box-border',
  variants: {
    variant: {
      plain: '',
      surface: 'bg-surface text-foreground',
      muted: 'bg-surface-muted text-foreground',
      outline: 'bg-surface text-foreground border border-border',
    },
    padding: {
      none: 'p-0',
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
    },
    radius: {
      none: 'rounded-none',
      item: 'rounded-item',
      inner: 'rounded-inner',
      surface: 'rounded-surface',
      pill: 'rounded-pill',
    },
    shadow: {
      none: 'shadow-none',
      soft: 'shadow-soft',
      card: 'shadow-card',
      floating: 'shadow-floating',
    },
    interactive: {
      true: 'press-soft cursor-pointer',
    },
  },
  defaultVariants: {
    variant: 'plain',
    padding: 'none',
    radius: 'none',
    shadow: 'none',
  },
})

export type BoxElement =
  | 'div'
  | 'section'
  | 'article'
  | 'aside'
  | 'header'
  | 'footer'
  | 'main'
  | 'nav'
  | 'ul'
  | 'li'
  | 'span'

export interface BoxProps extends ComponentProps<'div'>, VariantProps<typeof boxStyles> {
  /** Elemento HTML renderizado. Padrão `div`. */
  as?: BoxElement
  /** Passa as classes para o filho em vez de criar um elemento. */
  asChild?: boolean
}

/**
 * Bloco genérico. Combine `variant="surface" radius="surface" shadow="card" padding="md"`
 * para o card padrão, ou deixe tudo em `plain` e componha só com `className`.
 */
export function Box({
  as = 'div',
  asChild,
  variant,
  padding,
  radius,
  shadow,
  interactive,
  className,
  ...props
}: BoxProps) {
  const Component: ElementType = asChild ? Slot : as
  return (
    <Component
      data-slot="box"
      className={boxStyles({ variant, padding, radius, shadow, interactive, className })}
      {...props}
    />
  )
}

export interface CardProps extends Omit<BoxProps, 'variant' | 'radius' | 'shadow'> {
  shadow?: BoxProps['shadow']
}

/** Card padrão: superfície branca, canto de 24px e sombra discreta. */
export function Card({ padding = 'md', shadow = 'card', ...props }: CardProps) {
  return <Box variant="surface" radius="surface" shadow={shadow} padding={padding} {...props} />
}

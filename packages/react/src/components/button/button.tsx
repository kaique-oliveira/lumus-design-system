import { Slot } from '@radix-ui/react-slot'
import type { ComponentProps, ReactNode } from 'react'
import { disabledStyles, focusRing } from '../../styles/shared'
import { cn, tv, type VariantProps } from '../../utils/cn'
import { IconSlot, type IconProp } from '../icon-slot/icon-slot'
import { Spinner } from '../spinner/spinner'

export type ButtonVariant = 'solid' | 'soft' | 'outline' | 'ghost' | 'link'
export type ButtonColor = 'primary' | 'neutral' | 'success' | 'warning' | 'danger'

const palette: Record<ButtonColor, Record<ButtonVariant, string>> = {
  primary: {
    solid: 'bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active',
    soft: 'bg-primary-soft text-primary hover:bg-primary/15',
    outline: 'border-primary text-primary hover:bg-primary-soft',
    ghost: 'text-primary hover:bg-primary-soft',
    link: 'text-primary',
  },
  neutral: {
    solid: 'bg-neutral text-neutral-foreground hover:bg-neutral-hover active:bg-neutral-active',
    soft: 'bg-neutral-soft text-foreground hover:bg-border-strong',
    outline: 'border-border-strong text-foreground hover:bg-surface-muted',
    ghost: 'text-foreground hover:bg-surface-muted',
    link: 'text-foreground',
  },
  success: {
    solid: 'bg-success text-success-foreground hover:bg-success-hover',
    soft: 'bg-success-soft text-success hover:bg-success/15',
    outline: 'border-success text-success hover:bg-success-soft',
    ghost: 'text-success hover:bg-success-soft',
    link: 'text-success',
  },
  warning: {
    solid: 'bg-warning text-warning-foreground hover:bg-warning-hover',
    soft: 'bg-warning-soft text-warning hover:bg-warning/15',
    outline: 'border-warning text-warning hover:bg-warning-soft',
    ghost: 'text-warning hover:bg-warning-soft',
    link: 'text-warning',
  },
  danger: {
    solid: 'bg-danger text-danger-foreground hover:bg-danger-hover',
    soft: 'bg-danger-soft text-danger hover:bg-danger/15',
    outline: 'border-danger text-danger hover:bg-danger-soft',
    ghost: 'text-danger hover:bg-danger-soft',
    link: 'text-danger',
  },
}

const compoundVariants = (Object.keys(palette) as ButtonColor[]).flatMap((color) =>
  (Object.keys(palette[color]) as ButtonVariant[]).map((variant) => ({
    color,
    variant,
    class: palette[color][variant],
  })),
)

export const buttonStyles = tv({
  base: [
    'relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap select-none',
    'rounded-pill border border-transparent font-sans font-medium',
    'press transition-colors',
    focusRing,
    disabledStyles,
  ],
  variants: {
    variant: {
      solid: 'shadow-soft',
      soft: '',
      outline: 'bg-transparent',
      ghost: 'bg-transparent',
      link: 'h-auto bg-transparent px-0 underline-offset-4 hover:underline',
    },
    color: {
      primary: '',
      neutral: '',
      success: '',
      warning: '',
      danger: '',
    },
    size: {
      sm: 'h-control-sm px-4 text-sm [&_[data-slot=icon]]:size-4',
      md: 'h-control-md px-5 text-sm [&_[data-slot=icon]]:size-[18px]',
      lg: 'h-control-lg px-6 text-base [&_[data-slot=icon]]:size-5',
    },
    iconOnly: {
      true: 'aspect-square px-0',
    },
    fullWidth: {
      true: 'w-full',
    },
    loading: {
      true: 'cursor-progress',
    },
  },
  compoundVariants: [
    ...compoundVariants,
    { variant: 'link', size: ['sm', 'md', 'lg'], class: 'h-auto px-0' },
  ],
  defaultVariants: {
    variant: 'solid',
    color: 'primary',
    size: 'md',
  },
})

export interface ButtonProps
  extends
    Omit<ComponentProps<'button'>, 'color'>,
    Omit<VariantProps<typeof buttonStyles>, 'iconOnly'> {
  /** Ícone à esquerda do texto. */
  leftIcon?: IconProp
  /** Ícone à direita do texto. */
  rightIcon?: IconProp
  /** Botão só com ícone, redondo. Exige `aria-label`. */
  icon?: IconProp
  /** Mostra o spinner e desabilita. */
  loading?: boolean
  /** Texto exibido enquanto carrega. Sem ele, o texto original continua. */
  loadingText?: ReactNode
  /** Passa estilo e comportamento para o filho, por exemplo um `<a>`. */
  asChild?: boolean
}

export function Button({
  variant,
  color,
  size,
  fullWidth,
  loading = false,
  loadingText,
  leftIcon,
  rightIcon,
  icon,
  asChild,
  disabled,
  type = 'button',
  className,
  children,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : 'button'
  const iconOnly = icon !== undefined && children === undefined
  const isDisabled = disabled || loading

  return (
    <Component
      type={asChild ? undefined : type}
      data-slot="button"
      data-loading={loading || undefined}
      aria-busy={loading || undefined}
      disabled={isDisabled}
      className={cn(
        buttonStyles({ variant, color, size, iconOnly, fullWidth, loading }),
        className,
      )}
      {...props}
    >
      {loading ? (
        <Spinner size="sm" label="Carregando" />
      ) : (
        <IconSlot icon={iconOnly ? icon : leftIcon} />
      )}
      {iconOnly ? null : loading && loadingText !== undefined ? loadingText : children}
      {iconOnly ? null : <IconSlot icon={rightIcon} />}
    </Component>
  )
}

export interface IconButtonProps extends Omit<
  ButtonProps,
  'leftIcon' | 'rightIcon' | 'children' | 'icon'
> {
  icon: IconProp
  /** Obrigatório: é o único texto do botão. */
  'aria-label': string
}

/** Botão redondo só com ícone. */
export function IconButton({ icon, ...props }: IconButtonProps) {
  return <Button icon={icon} {...props} />
}

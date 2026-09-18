import type { ComponentProps, CSSProperties } from 'react'
import { cn, tv, type VariantProps } from '../../utils/cn'

export const spinnerStyles = tv({
  base: 'inline-block shrink-0 animate-spin',
  variants: {
    size: {
      xs: 'size-3',
      sm: 'size-4',
      md: 'size-5',
      lg: 'size-7',
      xl: 'size-10',
    },
    color: {
      current: 'text-current',
      primary: 'text-primary',
      foreground: 'text-foreground',
      muted: 'text-foreground-muted',
      white: 'text-white',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'current',
  },
})

export interface SpinnerProps
  extends Omit<ComponentProps<'svg'>, 'color'>, Omit<VariantProps<typeof spinnerStyles>, 'size'> {
  /** Tamanho nomeado ou número em pixels. */
  size?: VariantProps<typeof spinnerStyles>['size'] | number
  /** Texto lido por leitor de tela. Padrão "Carregando". */
  label?: string
  /** Espessura do traço em relação ao tamanho. Padrão 3. */
  thickness?: number
}

export function Spinner({
  size = 'md',
  color,
  label = 'Carregando',
  thickness = 3,
  className,
  style,
  ...props
}: SpinnerProps) {
  const numeric = typeof size === 'number'
  const sizeStyle: CSSProperties | undefined = numeric
    ? { width: size, height: size, ...style }
    : style

  return (
    <svg
      role="status"
      aria-label={label}
      viewBox="0 0 24 24"
      fill="none"
      data-slot="spinner"
      className={cn(spinnerStyles({ size: numeric ? undefined : size, color }), className)}
      style={sizeStyle}
      {...props}
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth={thickness}
        className="opacity-20"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth={thickness}
        strokeLinecap="round"
      />
    </svg>
  )
}

export interface LoadingOverlayProps extends ComponentProps<'div'> {
  /** Mostra ou esconde, com transição. */
  open: boolean
  /** Cobre a tela inteira. Sem isso cobre o pai, que precisa ter `position: relative`. */
  fullscreen?: boolean
  label?: string
  /** Texto visível abaixo do spinner. */
  text?: string
  spinnerSize?: SpinnerProps['size']
  blur?: boolean
}

/** Camada de carregamento sobre uma área ou sobre a tela. */
export function LoadingOverlay({
  open,
  fullscreen,
  label = 'Carregando',
  text,
  spinnerSize = 'lg',
  blur = true,
  className,
  children,
  ...props
}: LoadingOverlayProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-hidden={!open}
      data-state={open ? 'open' : 'closed'}
      data-slot="loading-overlay"
      className={cn(
        'bg-background/60 text-foreground z-40 flex flex-col items-center justify-center gap-3',
        'transition-opacity duration-(--lumus-duration-base) ease-out',
        fullscreen ? 'fixed inset-0' : 'absolute inset-0 rounded-[inherit]',
        blur && 'backdrop-blur-[2px]',
        open ? 'opacity-100' : 'pointer-events-none opacity-0',
        className,
      )}
      {...props}
    >
      {children ?? (
        <>
          <Spinner size={spinnerSize} color="primary" label={label} />
          {text ? <span className="text-foreground-secondary text-sm">{text}</span> : null}
        </>
      )}
    </div>
  )
}

import * as AvatarPrimitive from '@radix-ui/react-avatar'
import {
  Children,
  isValidElement,
  type ComponentProps,
  type CSSProperties,
  type ReactNode,
} from 'react'
import { ProfileCircle } from '../../internal/icons'
import { cn, tv, type VariantProps } from '../../utils/cn'
import { getInitials } from '../../utils/initials'
import { IconSlot, type IconProp } from '../icon-slot/icon-slot'

export const avatarStyles = tv({
  slots: {
    root: 'relative inline-flex shrink-0 select-none overflow-visible align-middle',
    image: 'size-full rounded-[inherit] object-cover',
    fallback:
      'flex size-full items-center justify-center rounded-[inherit] bg-primary-soft font-medium uppercase text-primary [&_[data-slot=icon]]:size-[70%] [&_[data-slot=icon]]:text-primary',
    status: 'absolute rounded-pill border-2 border-surface',
    frame: 'size-full overflow-hidden rounded-[inherit]',
  },
  variants: {
    size: {
      xs: { root: 'size-6 text-2xs', status: 'size-2 -right-px -bottom-px' },
      sm: { root: 'size-8 text-xs', status: 'size-2.5 -right-px -bottom-px' },
      md: { root: 'size-10 text-sm', status: 'size-3 -right-px -bottom-px' },
      lg: { root: 'size-14 text-base', status: 'size-3.5 right-0 bottom-0' },
      xl: { root: 'size-20 text-xl', status: 'size-4 right-0.5 bottom-0.5' },
    },
    shape: {
      circle: { root: 'rounded-pill' },
      square: { root: 'rounded-inner' },
    },
    ring: {
      true: { root: 'ring-2 ring-primary ring-offset-2 ring-offset-background' },
    },
    status: {
      online: { status: 'bg-success' },
      offline: { status: 'bg-foreground-muted' },
      busy: { status: 'bg-danger' },
      away: { status: 'bg-warning' },
    },
  },
  defaultVariants: { size: 'md', shape: 'circle' },
})

export interface AvatarProps
  extends
    Omit<ComponentProps<typeof AvatarPrimitive.Root>, 'children'>,
    Omit<VariantProps<typeof avatarStyles>, 'size'> {
  src?: string
  alt?: string
  /** Nome da pessoa. Vira iniciais quando a imagem falta ou não carrega. */
  name?: string
  /** Tamanho nomeado ou número em pixels. */
  size?: VariantProps<typeof avatarStyles>['size'] | number
  /** Ícone do fallback quando não há nome. */
  fallbackIcon?: IconProp
  /** Conteúdo próprio do fallback. */
  fallback?: ReactNode
  /** Milissegundos de espera antes de mostrar o fallback, para não piscar. */
  delayMs?: number
  /** Texto do status para leitor de tela. */
  statusLabel?: string
  classNames?: { root?: string; image?: string; fallback?: string; status?: string }
  imageProps?: Omit<ComponentProps<typeof AvatarPrimitive.Image>, 'src' | 'alt'>
}

export function Avatar({
  src,
  alt,
  name,
  size = 'md',
  shape,
  ring,
  status,
  statusLabel,
  fallbackIcon,
  fallback,
  delayMs = 300,
  classNames,
  className,
  style,
  imageProps,
  ...props
}: AvatarProps) {
  const numeric = typeof size === 'number'
  const styles = avatarStyles({ size: numeric ? undefined : size, shape, ring, status })
  const sizeStyle: CSSProperties | undefined = numeric
    ? { width: size, height: size, fontSize: size * 0.4, ...style }
    : style

  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(styles.root(), className, classNames?.root)}
      style={sizeStyle}
      {...props}
    >
      <div className={styles.frame()}>
        {src ? (
          <AvatarPrimitive.Image
            src={src}
            alt={alt ?? name ?? ''}
            className={cn(styles.image(), classNames?.image)}
            {...imageProps}
          />
        ) : null}
        <AvatarPrimitive.Fallback
          delayMs={src ? delayMs : 0}
          className={cn(styles.fallback(), classNames?.fallback)}
          aria-label={name}
        >
          {fallback ??
            (name ? getInitials(name) : <IconSlot icon={fallbackIcon ?? ProfileCircle} />)}
        </AvatarPrimitive.Fallback>
      </div>
      {status ? (
        <span
          data-slot="avatar-status"
          role="status"
          aria-label={statusLabel ?? status}
          className={cn(styles.status(), classNames?.status)}
        />
      ) : null}
    </AvatarPrimitive.Root>
  )
}

export interface AvatarGroupProps extends ComponentProps<'div'> {
  /** Quantidade mostrada antes do "+N". */
  max?: number
  size?: AvatarProps['size']
  /** Texto do excedente para leitor de tela. */
  moreLabel?: (count: number) => string
}

/** Avatares sobrepostos com contador do que sobra. */
export function AvatarGroup({
  max = 4,
  size = 'md',
  moreLabel = (count) => `mais ${count}`,
  className,
  children,
  ...props
}: AvatarGroupProps) {
  const items = Children.toArray(children).filter(isValidElement)
  const visible = items.slice(0, max)
  const rest = items.length - visible.length
  const numeric = typeof size === 'number'
  const styles = avatarStyles({ size: numeric ? undefined : size })

  return (
    <div
      data-slot="avatar-group"
      className={cn(
        '[&_[data-slot=avatar]]:ring-surface flex items-center -space-x-2 [&_[data-slot=avatar]]:ring-2',
        className,
      )}
      {...props}
    >
      {visible}
      {rest > 0 ? (
        <span
          aria-label={moreLabel(rest)}
          className={cn(
            styles.root(),
            'rounded-pill bg-surface-muted text-foreground-secondary ring-surface items-center justify-center font-medium ring-2',
          )}
          style={numeric ? { width: size, height: size, fontSize: size * 0.35 } : undefined}
        >
          +{rest}
        </span>
      ) : null}
    </div>
  )
}

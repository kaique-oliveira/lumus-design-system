import { useEffect, useRef, useState, type ComponentProps } from 'react'
import { Close, CloseCircle, InfoCircle, Success, Warning } from '../../internal/icons'
import { useToastStore, type ToastItem, type ToastVariant } from '../../store/toast-store'
import { cn, tv } from '../../utils/cn'
import { IconSlot, type IconProp } from '../icon-slot/icon-slot'

export type ToastPosition =
  'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'

const positionStyles: Record<ToastPosition, string> = {
  'top-left': 'sm:top-4 sm:left-4 sm:items-start',
  'top-center': 'sm:top-4 sm:left-1/2 sm:-translate-x-1/2 sm:items-center',
  'top-right': 'sm:top-4 sm:right-4 sm:items-end',
  'bottom-left': 'sm:bottom-4 sm:left-4 sm:items-start sm:flex-col-reverse',
  'bottom-center':
    'sm:bottom-4 sm:left-1/2 sm:-translate-x-1/2 sm:items-center sm:flex-col-reverse',
  'bottom-right': 'sm:bottom-4 sm:right-4 sm:items-end sm:flex-col-reverse',
}

const variantIcons: Record<ToastVariant, IconProp> = {
  info: InfoCircle,
  success: Success,
  warning: Warning,
  danger: CloseCircle,
}

export const toastStyles = tv({
  slots: {
    root: [
      'pointer-events-auto relative flex w-full items-start gap-3 rounded-surface bg-surface p-4 pr-3 text-foreground shadow-floating border border-border',
      'sm:w-[360px]',
      'data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-95 data-[state=open]:duration-(--lumus-duration-spring) data-[state=open]:ease-spring',
      'max-sm:data-[state=open]:slide-in-from-top-4',
      'data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95 data-[state=closed]:duration-(--lumus-duration-fast) data-[state=closed]:ease-in',
    ],
    icon: 'mt-0.5 size-5 shrink-0',
    content: 'flex min-w-0 flex-1 flex-col gap-0.5 text-sm',
    title: 'font-semibold leading-tight',
    description: 'text-foreground-secondary',
    action: 'mt-2 self-start text-sm font-semibold text-primary underline-offset-4 hover:underline',
    close:
      'press -mr-1 -mt-1 inline-flex size-7 shrink-0 items-center justify-center rounded-pill text-foreground-muted hover:bg-surface-muted hover:text-foreground [&_[data-slot=icon]]:size-4',
  },
  variants: {
    variant: {
      info: { icon: 'text-info' },
      success: { icon: 'text-success' },
      warning: { icon: 'text-warning' },
      danger: { icon: 'text-danger' },
    },
    fromSide: {
      left: { root: 'sm:data-[state=open]:slide-in-from-left-4' },
      right: { root: 'sm:data-[state=open]:slide-in-from-right-4' },
      top: { root: 'sm:data-[state=open]:slide-in-from-top-4' },
      bottom: { root: 'sm:data-[state=open]:slide-in-from-bottom-4' },
    },
  },
  defaultVariants: { variant: 'info' },
})

export interface ToasterProps extends ComponentProps<'div'> {
  /** Canto da tela no desktop. No celular fica sempre no topo, ocupando a largura. */
  position?: ToastPosition
  /** Máximo de notificações visíveis ao mesmo tempo. Padrão 4. */
  limit?: number
  closeLabel?: string
  /** Ícones por variante, para trocar pelos da sua lib. */
  icons?: Partial<Record<ToastVariant, IconProp>>
  classNames?: { viewport?: string; toast?: string }
}

function sideOf(position: ToastPosition): 'left' | 'right' | 'top' | 'bottom' {
  if (position.endsWith('left')) return 'left'
  if (position.endsWith('right')) return 'right'
  return position.startsWith('top') ? 'top' : 'bottom'
}

/**
 * Monte uma vez na raiz. Depois chame `toast.success('Salvo')` de qualquer lugar.
 */
export function Toaster({
  position = 'bottom-right',
  limit = 4,
  closeLabel = 'Fechar',
  icons,
  classNames,
  className,
  ...props
}: ToasterProps) {
  const toasts = useToastStore((state) => state.toasts)
  const visible = toasts.slice(-limit)

  return (
    <div
      role="region"
      aria-label="Notificações"
      data-slot="toaster"
      className={cn(
        'pointer-events-none fixed z-[60] flex flex-col gap-2',
        'max-sm:inset-x-4 max-sm:top-[calc(1rem+env(safe-area-inset-top))]',
        positionStyles[position],
        className,
        classNames?.viewport,
      )}
      {...props}
    >
      {visible.map((item) => (
        <ToastCard
          key={item.id}
          item={item}
          fromSide={sideOf(position)}
          closeLabel={closeLabel}
          icons={icons}
          className={classNames?.toast}
        />
      ))}
    </div>
  )
}

interface ToastCardProps {
  item: ToastItem
  fromSide: 'left' | 'right' | 'top' | 'bottom'
  closeLabel: string
  icons?: Partial<Record<ToastVariant, IconProp>>
  className?: string
}

function ToastCard({ item, fromSide, closeLabel, icons, className }: ToastCardProps) {
  const dismiss = useToastStore((state) => state.dismiss)
  const remove = useToastStore((state) => state.remove)
  const styles = toastStyles({ variant: item.variant, fromSide })
  const [paused, setPaused] = useState(false)
  const remaining = useRef(item.duration)
  const startedAt = useRef(Date.now())

  useEffect(() => {
    remaining.current = item.duration
    startedAt.current = Date.now()
  }, [item.duration, item.createdAt])

  useEffect(() => {
    if (item.dismissed || item.duration <= 0 || paused) return
    startedAt.current = Date.now()
    const timer = window.setTimeout(() => dismiss(item.id), remaining.current)
    return () => {
      window.clearTimeout(timer)
      remaining.current = Math.max(0, remaining.current - (Date.now() - startedAt.current))
    }
  }, [item.id, item.duration, item.dismissed, item.createdAt, paused, dismiss])

  const icon =
    item.icon === null ? null : (item.icon ?? icons?.[item.variant] ?? variantIcons[item.variant])
  const isAlert = item.variant === 'danger' || item.variant === 'warning'

  return (
    <div
      role={isAlert ? 'alert' : 'status'}
      aria-live={isAlert ? 'assertive' : 'polite'}
      data-slot="toast"
      data-variant={item.variant}
      data-state={item.dismissed ? 'closed' : 'open'}
      onAnimationEnd={() => item.dismissed && remove(item.id)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className={cn(styles.root(), className)}
    >
      <IconSlot icon={icon} className={styles.icon()} />
      <div className={styles.content()}>
        {item.title !== undefined ? <span className={styles.title()}>{item.title}</span> : null}
        {item.description !== undefined ? (
          <span className={styles.description()}>{item.description}</span>
        ) : null}
        {item.action ? (
          <button
            type="button"
            className={styles.action()}
            onClick={() => {
              item.action?.onClick()
              dismiss(item.id)
            }}
          >
            {item.action.label}
          </button>
        ) : null}
      </div>
      {item.dismissible ? (
        <button
          type="button"
          aria-label={closeLabel}
          className={styles.close()}
          onClick={() => dismiss(item.id)}
        >
          <IconSlot icon={Close} />
        </button>
      ) : null}
    </div>
  )
}

import * as DialogPrimitive from '@radix-ui/react-dialog'
import type { ComponentProps, ReactNode } from 'react'
import { Close } from '../../internal/icons'
import { dialogAnimation, overlayAnimation } from '../../styles/shared'
import { cn, tv, type VariantProps } from '../../utils/cn'
import { IconButton } from '../button/button'

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogClose = DialogPrimitive.Close
export const DialogPortal = DialogPrimitive.Portal

export function DialogOverlay({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn('bg-overlay fixed inset-0 z-50', overlayAnimation, className)}
      {...props}
    />
  )
}

export const dialogContentStyles = tv({
  base: [
    'fixed z-50 flex flex-col bg-surface text-foreground shadow-floating outline-none',
    'max-h-[calc(100dvh-2rem)] w-full',
    // Celular: sheet colado embaixo, com canto redondo só em cima.
    'max-sm:inset-x-0 max-sm:bottom-0 max-sm:max-h-[92dvh] max-sm:rounded-t-surface max-sm:rounded-b-none max-sm:pb-[env(safe-area-inset-bottom)]',
    // Desktop: centralizado.
    'sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-surface',
    dialogAnimation,
  ],
  variants: {
    size: {
      sm: 'sm:max-w-sm',
      md: 'sm:max-w-md',
      lg: 'sm:max-w-lg',
      xl: 'sm:max-w-2xl',
      full: 'sm:max-w-[calc(100vw-2rem)] sm:max-h-[calc(100dvh-2rem)]',
    },
    /** No celular, centraliza em vez de virar sheet. */
    sheetOnMobile: {
      true: '',
      false:
        'max-sm:inset-x-4 max-sm:bottom-auto max-sm:top-1/2 max-sm:w-auto max-sm:-translate-y-1/2 max-sm:rounded-surface max-sm:pb-0',
    },
  },
  defaultVariants: { size: 'md', sheetOnMobile: true },
})

export interface DialogContentProps
  extends
    Omit<ComponentProps<typeof DialogPrimitive.Content>, 'title'>,
    VariantProps<typeof dialogContentStyles> {
  title?: ReactNode
  description?: ReactNode
  /** Rodapé com os botões. */
  footer?: ReactNode
  /** Mostra o botão de fechar no canto. Padrão `true`. */
  closable?: boolean
  closeLabel?: string
  /** Mostra a alça de arrastar no topo, no celular. Padrão `true`. */
  handle?: boolean
  /** Remove o padding do corpo. */
  bare?: boolean
  overlayClassName?: string
  classNames?: {
    content?: string
    header?: string
    body?: string
    footer?: string
    overlay?: string
  }
}

export function DialogContent({
  title,
  description,
  footer,
  closable = true,
  closeLabel = 'Fechar',
  handle = true,
  bare,
  size,
  sheetOnMobile,
  overlayClassName,
  classNames,
  className,
  children,
  ...props
}: DialogContentProps) {
  const hasHeader = title !== undefined || description !== undefined
  return (
    <DialogPrimitive.Portal>
      <DialogOverlay className={cn(overlayClassName, classNames?.overlay)} />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        aria-describedby={description === undefined ? undefined : props['aria-describedby']}
        className={cn(dialogContentStyles({ size, sheetOnMobile }), className, classNames?.content)}
        {...props}
      >
        {handle && sheetOnMobile !== false ? (
          <div
            aria-hidden="true"
            className="rounded-pill bg-border-strong mx-auto mt-2 h-1.5 w-10 shrink-0 sm:hidden"
          />
        ) : null}
        {hasHeader || closable ? (
          <DialogHeader className={classNames?.header}>
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              {title !== undefined ? <DialogTitle>{title}</DialogTitle> : null}
              {description !== undefined ? (
                <DialogDescription>{description}</DialogDescription>
              ) : null}
            </div>
            {closable ? (
              <DialogPrimitive.Close asChild>
                <IconButton
                  icon={Close}
                  aria-label={closeLabel}
                  variant="soft"
                  color="neutral"
                  size="sm"
                  className="-mt-1 -mr-1 size-8 shrink-0"
                />
              </DialogPrimitive.Close>
            ) : null}
          </DialogHeader>
        ) : null}
        <DialogBody bare={bare} className={classNames?.body}>
          {children}
        </DialogBody>
        {footer !== undefined ? (
          <DialogFooter className={classNames?.footer}>{footer}</DialogFooter>
        ) : null}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}

export function DialogHeader({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-header"
      className={cn('flex items-start justify-between gap-4 px-6 pt-6 pb-2', className)}
      {...props}
    />
  )
}

export function DialogBody({
  bare,
  className,
  ...props
}: ComponentProps<'div'> & { bare?: boolean }) {
  return (
    <div
      data-slot="dialog-body"
      className={cn(
        'scrollbar-soft min-h-0 flex-1 overflow-y-auto',
        !bare && 'px-6 py-4',
        className,
      )}
      {...props}
    />
  )
}

export function DialogFooter({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        'flex flex-col-reverse gap-2 px-6 pt-2 pb-6 sm:flex-row sm:justify-end',
        className,
      )}
      {...props}
    />
  )
}

export function DialogTitle({ className, ...props }: ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn('text-foreground text-lg leading-tight font-semibold', className)}
      {...props}
    />
  )
}

export function DialogDescription({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn('text-foreground-secondary text-sm', className)}
      {...props}
    />
  )
}

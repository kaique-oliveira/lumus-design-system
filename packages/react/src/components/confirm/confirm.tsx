import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { useState, type ComponentProps } from 'react'
import { Warning } from '../../internal/icons'
import { useConfirmStore, type ConfirmRequest } from '../../store/confirm-store'
import { dialogAnimation, overlayAnimation } from '../../styles/shared'
import { cn } from '../../utils/cn'
import { Button } from '../button/button'
import { IconSlot } from '../icon-slot/icon-slot'

export interface ConfirmerProps {
  /** Texto padrão do título quando o `confirm()` não manda um. */
  defaultTitle?: string
  defaultConfirmLabel?: string
  defaultCancelLabel?: string
  className?: string
}

/**
 * Monte uma vez na raiz. Depois, em qualquer lugar:
 * `if (await confirm({ description: 'Apagar?', variant: 'danger' })) ...`
 */
export function Confirmer({
  defaultTitle = 'Atenção',
  defaultConfirmLabel = 'Confirmar',
  defaultCancelLabel = 'Cancelar',
  className,
}: ConfirmerProps) {
  const current = useConfirmStore((state) => state.current)
  const settle = useConfirmStore((state) => state.settle)
  const [busy, setBusy] = useState(false)
  // Guarda a última requisição para a animação de saída rodar com o conteúdo ainda visível.
  const [last, setLast] = useState<ConfirmRequest | null>(null)
  if (current && current !== last) setLast(current)
  const request = current ?? last

  async function handleConfirm() {
    if (!request) return
    if (request.onConfirm) {
      try {
        setBusy(true)
        await request.onConfirm()
      } finally {
        setBusy(false)
      }
    }
    settle(true)
  }

  return (
    <AlertDialogPrimitive.Root
      open={current !== null}
      onOpenChange={(open) => !open && !busy && settle(false)}
    >
      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Overlay
          className={cn('bg-overlay fixed inset-0 z-50', overlayAnimation)}
        />
        <AlertDialogPrimitive.Content
          data-slot="confirm"
          className={cn(
            'bg-surface text-foreground shadow-floating fixed z-50 flex w-full flex-col gap-4 p-6 outline-none',
            'max-sm:rounded-t-surface max-sm:inset-x-0 max-sm:bottom-0 max-sm:pb-[calc(1.5rem+env(safe-area-inset-bottom))]',
            'sm:rounded-surface sm:top-1/2 sm:left-1/2 sm:max-w-sm sm:-translate-x-1/2 sm:-translate-y-1/2',
            dialogAnimation,
            className,
          )}
        >
          <div className="flex items-start gap-3">
            <IconSlot
              icon={request?.icon ?? Warning}
              className={cn(
                'rounded-pill mt-0.5 size-10 shrink-0 p-2.5',
                request?.variant === 'danger'
                  ? 'bg-danger-soft text-danger'
                  : 'bg-primary-soft text-primary',
              )}
            />
            <div className="flex min-w-0 flex-col gap-1">
              <AlertDialogPrimitive.Title className="text-base leading-tight font-semibold">
                {request?.title ?? defaultTitle}
              </AlertDialogPrimitive.Title>
              {request?.description !== undefined ? (
                <AlertDialogPrimitive.Description className="text-foreground-secondary text-sm">
                  {request.description}
                </AlertDialogPrimitive.Description>
              ) : null}
            </div>
          </div>
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <AlertDialogPrimitive.Cancel asChild>
              <Button variant="soft" color="neutral" disabled={busy}>
                {request?.cancelLabel ?? defaultCancelLabel}
              </Button>
            </AlertDialogPrimitive.Cancel>
            <Button
              color={request?.variant === 'danger' ? 'danger' : 'primary'}
              loading={busy}
              onClick={handleConfirm}
            >
              {request?.confirmLabel ?? defaultConfirmLabel}
            </Button>
          </div>
        </AlertDialogPrimitive.Content>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  )
}

export type ConfirmerElementProps = ComponentProps<typeof Confirmer>

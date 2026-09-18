import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import type { ComponentProps, ReactNode } from 'react'
import { popAnimation } from '../../styles/shared'
import { cn } from '../../utils/cn'

export const TooltipProvider = TooltipPrimitive.Provider

export interface TooltipProps extends Omit<
  ComponentProps<typeof TooltipPrimitive.Root>,
  'children'
> {
  /** Conteúdo da dica. */
  content: ReactNode
  /** Elemento que dispara. Recebe as props de acessibilidade, então precisa aceitar ref e props. */
  children: ReactNode
  side?: TooltipPrimitive.TooltipContentProps['side']
  align?: TooltipPrimitive.TooltipContentProps['align']
  sideOffset?: number
  /** Mostra a seta apontando para o gatilho. Padrão `true`. */
  withArrow?: boolean
  /** Largura máxima em pixels. Padrão 280. */
  maxWidth?: number
  /** Milissegundos até abrir. Padrão 400. */
  delayDuration?: number
  contentProps?: Omit<
    ComponentProps<typeof TooltipPrimitive.Content>,
    'side' | 'align' | 'sideOffset'
  >
  className?: string
}

/**
 * Dica de texto no hover e no foco por teclado.
 * O filho precisa ser um único elemento que aceite ref, como `Button` ou `<button>`.
 */
export function Tooltip({
  content,
  children,
  side = 'top',
  align = 'center',
  sideOffset = 6,
  withArrow = true,
  maxWidth = 280,
  delayDuration = 400,
  contentProps,
  className,
  ...props
}: TooltipProps) {
  if (content === null || content === undefined || content === false) return <>{children}</>

  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <TooltipPrimitive.Root {...props}>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            align={align}
            sideOffset={sideOffset}
            collisionPadding={8}
            data-slot="tooltip"
            className={cn(
              'rounded-item bg-neutral text-neutral-foreground shadow-floating z-50 px-3 py-1.5 text-xs font-medium',
              'origin-(--radix-tooltip-content-transform-origin)',
              popAnimation,
              className,
            )}
            style={{ maxWidth }}
            {...contentProps}
          >
            {content}
            {withArrow ? (
              <TooltipPrimitive.Arrow className="fill-neutral" width={10} height={5} />
            ) : null}
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}

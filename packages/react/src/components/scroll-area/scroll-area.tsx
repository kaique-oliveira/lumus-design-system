import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import type { ComponentProps, CSSProperties } from 'react'
import { cn } from '../../utils/cn'

export interface ScrollAreaProps extends ComponentProps<typeof ScrollAreaPrimitive.Root> {
  /** Eixo de rolagem. Padrão vertical. */
  orientation?: 'vertical' | 'horizontal' | 'both'
  /** Altura máxima. Aceita qualquer unidade CSS. */
  maxHeight?: number | string
  maxWidth?: number | string
  /** Classe do viewport, o elemento que rola. */
  viewportClassName?: string
  viewportRef?: ComponentProps<typeof ScrollAreaPrimitive.Viewport>['ref']
}

/** Área de rolagem com barra discreta e igual em todo navegador. */
export function ScrollArea({
  orientation = 'vertical',
  maxHeight,
  maxWidth,
  viewportClassName,
  viewportRef,
  type = 'hover',
  scrollHideDelay = 600,
  className,
  style,
  children,
  ...props
}: ScrollAreaProps) {
  const sizeStyle: CSSProperties = { maxHeight, maxWidth, ...style }
  return (
    <ScrollAreaPrimitive.Root
      type={type}
      scrollHideDelay={scrollHideDelay}
      data-slot="scroll-area"
      className={cn('relative overflow-hidden', className)}
      style={sizeStyle}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        ref={viewportRef}
        data-slot="scroll-area-viewport"
        className={cn(
          'size-full max-h-[inherit] rounded-[inherit] [&>div]:!block',
          viewportClassName,
        )}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      {orientation !== 'horizontal' ? <ScrollBar orientation="vertical" /> : null}
      {orientation !== 'vertical' ? <ScrollBar orientation="horizontal" /> : null}
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

export function ScrollBar({
  orientation = 'vertical',
  className,
  ...props
}: ComponentProps<typeof ScrollAreaPrimitive.Scrollbar>) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      orientation={orientation}
      data-slot="scroll-bar"
      className={cn(
        'flex touch-none p-0.5 transition-opacity duration-(--lumus-duration-fast) select-none',
        'data-[state=hidden]:opacity-0 data-[state=visible]:opacity-100',
        orientation === 'vertical' ? 'h-full w-2' : 'h-2 w-full flex-col',
        className,
      )}
      {...props}
    >
      <ScrollAreaPrimitive.Thumb className="rounded-pill bg-foreground-muted/60 hover:bg-foreground-muted relative flex-1" />
    </ScrollAreaPrimitive.Scrollbar>
  )
}

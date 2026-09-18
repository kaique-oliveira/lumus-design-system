import * as SeparatorPrimitive from '@radix-ui/react-separator'
import type { ComponentProps, ReactNode } from 'react'
import { cn } from '../../utils/cn'

export interface SeparatorProps extends ComponentProps<typeof SeparatorPrimitive.Root> {
  /** Texto ou elemento no meio da linha. */
  children?: ReactNode
  /** Cor mais forte. */
  strong?: boolean
  /** Espaço em volta. */
  spacing?: 'none' | 'sm' | 'md' | 'lg'
}

const spacingMap = {
  horizontal: { none: '', sm: 'my-2', md: 'my-4', lg: 'my-6' },
  vertical: { none: '', sm: 'mx-2', md: 'mx-4', lg: 'mx-6' },
} as const

export function Separator({
  orientation = 'horizontal',
  decorative = true,
  strong,
  spacing = 'none',
  children,
  className,
  ...props
}: SeparatorProps) {
  const lineColor = strong ? 'bg-border-strong' : 'bg-border'
  const vertical = orientation === 'vertical'

  if (children === undefined) {
    return (
      <SeparatorPrimitive.Root
        orientation={orientation}
        decorative={decorative}
        data-slot="separator"
        className={cn(
          'shrink-0',
          lineColor,
          vertical ? 'h-full w-px self-stretch' : 'h-px w-full',
          spacingMap[orientation][spacing],
          className,
        )}
        {...props}
      />
    )
  }

  return (
    <div
      role={decorative ? undefined : 'separator'}
      aria-orientation={decorative ? undefined : orientation}
      data-slot="separator"
      className={cn(
        'text-foreground-muted flex items-center gap-3 text-xs',
        vertical ? 'h-full flex-col self-stretch' : 'w-full',
        spacingMap[orientation][spacing],
        className,
      )}
      {...(props as ComponentProps<'div'>)}
    >
      <span className={cn('flex-1', lineColor, vertical ? 'w-px' : 'h-px')} />
      <span className="shrink-0">{children}</span>
      <span className={cn('flex-1', lineColor, vertical ? 'w-px' : 'h-px')} />
    </div>
  )
}

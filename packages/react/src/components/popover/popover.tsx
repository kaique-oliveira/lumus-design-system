import * as PopoverPrimitive from '@radix-ui/react-popover'
import type { ComponentProps, ReactNode } from 'react'
import { Close } from '../../internal/icons'
import { floatingSurface, popAnimation } from '../../styles/shared'
import { cn } from '../../utils/cn'
import { IconButton } from '../button/button'
import { Text } from '../text/text'

export const Popover = PopoverPrimitive.Root
export const PopoverTrigger = PopoverPrimitive.Trigger
export const PopoverAnchor = PopoverPrimitive.Anchor
export const PopoverClose = PopoverPrimitive.Close

export interface PopoverContentProps extends Omit<
  ComponentProps<typeof PopoverPrimitive.Content>,
  'title'
> {
  /** Título no cabeçalho. Com ele aparece o botão de fechar. */
  title?: ReactNode
  description?: ReactNode
  /** Mostra o botão de fechar mesmo sem título. */
  closable?: boolean
  withArrow?: boolean
  /** Largura. `trigger` iguala à largura do gatilho. */
  width?: 'auto' | 'trigger' | number
  /** Remove o padding interno, para conteúdo que cuida do próprio espaço. */
  bare?: boolean
  closeLabel?: string
  classNames?: { content?: string; header?: string; body?: string }
}

export function PopoverContent({
  title,
  description,
  closable,
  withArrow = false,
  width = 'auto',
  bare,
  closeLabel = 'Fechar',
  sideOffset = 8,
  collisionPadding = 8,
  classNames,
  className,
  style,
  children,
  ...props
}: PopoverContentProps) {
  const showHeader = title !== undefined || description !== undefined || closable
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        data-slot="popover-content"
        className={cn(
          'rounded-surface z-50 max-w-[calc(100vw-1rem)] min-w-[12rem] outline-none',
          floatingSurface,
          'origin-(--radix-popover-content-transform-origin)',
          popAnimation,
          width === 'trigger' && 'w-(--radix-popover-trigger-width)',
          !bare && 'p-4',
          className,
          classNames?.content,
        )}
        style={typeof width === 'number' ? { width, ...style } : style}
        {...props}
      >
        {showHeader ? (
          <div
            className={cn(
              'mb-3 flex items-start justify-between gap-3',
              bare && 'px-4 pt-4',
              classNames?.header,
            )}
          >
            <div className="flex min-w-0 flex-col gap-0.5">
              {title !== undefined ? (
                <Text as="h3" size="sm" weight="semibold">
                  {title}
                </Text>
              ) : null}
              {description !== undefined ? (
                <Text size="xs" color="secondary">
                  {description}
                </Text>
              ) : null}
            </div>
            <PopoverPrimitive.Close asChild>
              <IconButton
                icon={Close}
                aria-label={closeLabel}
                variant="ghost"
                color="neutral"
                size="sm"
                className="-mt-2 -mr-2 size-8"
              />
            </PopoverPrimitive.Close>
          </div>
        ) : null}
        <div className={classNames?.body}>{children}</div>
        {withArrow ? (
          <PopoverPrimitive.Arrow
            className="fill-surface drop-shadow-[0_1px_0_var(--lumus-color-border)]"
            width={14}
            height={7}
          />
        ) : null}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  )
}

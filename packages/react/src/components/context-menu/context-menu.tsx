import * as MenuPrimitive from '@radix-ui/react-context-menu'
import { Fragment, type ComponentProps } from 'react'
import { ArrowRight, Tick } from '../../internal/icons'
import { cn } from '../../utils/cn'
import { IconSlot, type IconProp } from '../icon-slot/icon-slot'
import type { MenuAction } from '../dropdown-menu/dropdown-menu'
import {
  menuContentStyles,
  menuIndicatorStyles,
  menuItemStyles,
  menuLabelStyles,
  menuSeparatorStyles,
  menuShortcutStyles,
} from '../dropdown-menu/menu-styles'

export const ContextMenu = MenuPrimitive.Root
export const ContextMenuTrigger = MenuPrimitive.Trigger
export const ContextMenuGroup = MenuPrimitive.Group
export const ContextMenuPortal = MenuPrimitive.Portal
export const ContextMenuSub = MenuPrimitive.Sub
export const ContextMenuRadioGroup = MenuPrimitive.RadioGroup

export function ContextMenuContent({
  className,
  collisionPadding = 8,
  ...props
}: ComponentProps<typeof MenuPrimitive.Content>) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Content
        collisionPadding={collisionPadding}
        data-slot="context-menu-content"
        className={cn(
          menuContentStyles,
          'origin-(--radix-context-menu-content-transform-origin)',
          className,
        )}
        {...props}
      />
    </MenuPrimitive.Portal>
  )
}

export interface ContextMenuItemProps extends ComponentProps<typeof MenuPrimitive.Item> {
  icon?: IconProp
  shortcut?: string
  destructive?: boolean
  inset?: boolean
}

export function ContextMenuItem({
  icon,
  shortcut,
  destructive,
  inset,
  className,
  children,
  ...props
}: ContextMenuItemProps) {
  return (
    <MenuPrimitive.Item
      data-slot="context-menu-item"
      data-destructive={destructive || undefined}
      className={cn(menuItemStyles, inset && 'pl-8', className)}
      {...props}
    >
      <IconSlot icon={icon} />
      <span className="min-w-0 flex-1 truncate">{children}</span>
      {shortcut ? <span className={menuShortcutStyles}>{shortcut}</span> : null}
    </MenuPrimitive.Item>
  )
}

export function ContextMenuCheckboxItem({
  className,
  children,
  ...props
}: ComponentProps<typeof MenuPrimitive.CheckboxItem>) {
  return (
    <MenuPrimitive.CheckboxItem
      data-slot="context-menu-checkbox-item"
      className={cn(menuItemStyles, 'pl-8', className)}
      {...props}
    >
      <MenuPrimitive.ItemIndicator className={menuIndicatorStyles}>
        <IconSlot icon={Tick} className="text-primary size-4" />
      </MenuPrimitive.ItemIndicator>
      {children}
    </MenuPrimitive.CheckboxItem>
  )
}

export function ContextMenuRadioItem({
  className,
  children,
  ...props
}: ComponentProps<typeof MenuPrimitive.RadioItem>) {
  return (
    <MenuPrimitive.RadioItem
      data-slot="context-menu-radio-item"
      className={cn(menuItemStyles, 'pl-8', className)}
      {...props}
    >
      <MenuPrimitive.ItemIndicator className={menuIndicatorStyles}>
        <span className="rounded-pill bg-primary size-2" />
      </MenuPrimitive.ItemIndicator>
      {children}
    </MenuPrimitive.RadioItem>
  )
}

export function ContextMenuLabel({
  className,
  ...props
}: ComponentProps<typeof MenuPrimitive.Label>) {
  return (
    <MenuPrimitive.Label
      data-slot="context-menu-label"
      className={cn(menuLabelStyles, className)}
      {...props}
    />
  )
}

export function ContextMenuSeparator({
  className,
  ...props
}: ComponentProps<typeof MenuPrimitive.Separator>) {
  return (
    <MenuPrimitive.Separator
      data-slot="context-menu-separator"
      className={cn(menuSeparatorStyles, className)}
      {...props}
    />
  )
}

export function ContextMenuSubTrigger({
  icon,
  inset,
  className,
  children,
  ...props
}: ComponentProps<typeof MenuPrimitive.SubTrigger> & { icon?: IconProp; inset?: boolean }) {
  return (
    <MenuPrimitive.SubTrigger
      data-slot="context-menu-sub-trigger"
      className={cn(
        menuItemStyles,
        'data-[state=open]:bg-surface-muted',
        inset && 'pl-8',
        className,
      )}
      {...props}
    >
      <IconSlot icon={icon} />
      <span className="min-w-0 flex-1 truncate">{children}</span>
      <IconSlot icon={ArrowRight} className="ml-auto size-4" />
    </MenuPrimitive.SubTrigger>
  )
}

export function ContextMenuSubContent({
  className,
  sideOffset = 4,
  ...props
}: ComponentProps<typeof MenuPrimitive.SubContent>) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.SubContent
        sideOffset={sideOffset}
        data-slot="context-menu-sub-content"
        className={cn(
          menuContentStyles,
          'origin-(--radix-context-menu-content-transform-origin)',
          className,
        )}
        {...props}
      />
    </MenuPrimitive.Portal>
  )
}

export function ContextMenuItems({ items }: { items: MenuAction[] }) {
  return (
    <>
      {items.map((item, index) => {
        const key = item.key ?? (typeof item.label === 'string' ? item.label : String(index))
        return (
          <Fragment key={key}>
            {item.separatorBefore ? <ContextMenuSeparator /> : null}
            {item.children?.length ? (
              <ContextMenuSub>
                <ContextMenuSubTrigger icon={item.icon} disabled={item.disabled}>
                  {item.label}
                </ContextMenuSubTrigger>
                <ContextMenuSubContent>
                  <ContextMenuItems items={item.children} />
                </ContextMenuSubContent>
              </ContextMenuSub>
            ) : (
              <ContextMenuItem
                icon={item.icon}
                shortcut={item.shortcut}
                destructive={item.destructive}
                disabled={item.disabled}
                onSelect={item.onSelect}
              >
                {item.label}
              </ContextMenuItem>
            )}
          </Fragment>
        )
      })}
    </>
  )
}

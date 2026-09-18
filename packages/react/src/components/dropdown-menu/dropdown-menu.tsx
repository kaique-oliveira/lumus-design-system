import * as MenuPrimitive from '@radix-ui/react-dropdown-menu'
import { Fragment, type ComponentProps, type ReactNode } from 'react'
import { ArrowRight, Tick } from '../../internal/icons'
import { cn } from '../../utils/cn'
import { IconSlot, type IconProp } from '../icon-slot/icon-slot'
import {
  menuContentStyles,
  menuIndicatorStyles,
  menuItemStyles,
  menuLabelStyles,
  menuSeparatorStyles,
  menuShortcutStyles,
} from './menu-styles'

export const DropdownMenu = MenuPrimitive.Root
export const DropdownMenuTrigger = MenuPrimitive.Trigger
export const DropdownMenuGroup = MenuPrimitive.Group
export const DropdownMenuPortal = MenuPrimitive.Portal
export const DropdownMenuSub = MenuPrimitive.Sub
export const DropdownMenuRadioGroup = MenuPrimitive.RadioGroup

export function DropdownMenuContent({
  className,
  sideOffset = 6,
  collisionPadding = 8,
  ...props
}: ComponentProps<typeof MenuPrimitive.Content>) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Content
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        data-slot="dropdown-menu-content"
        className={cn(
          menuContentStyles,
          'origin-(--radix-dropdown-menu-content-transform-origin)',
          className,
        )}
        {...props}
      />
    </MenuPrimitive.Portal>
  )
}

export interface DropdownMenuItemProps extends ComponentProps<typeof MenuPrimitive.Item> {
  icon?: IconProp
  /** Atalho de teclado mostrado à direita. Só visual. */
  shortcut?: string
  /** Pinta de vermelho, para ação destrutiva. */
  destructive?: boolean
  /** Recua o item para alinhar com itens de marcação. */
  inset?: boolean
}

export function DropdownMenuItem({
  icon,
  shortcut,
  destructive,
  inset,
  className,
  children,
  ...props
}: DropdownMenuItemProps) {
  return (
    <MenuPrimitive.Item
      data-slot="dropdown-menu-item"
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

export function DropdownMenuCheckboxItem({
  className,
  children,
  ...props
}: ComponentProps<typeof MenuPrimitive.CheckboxItem>) {
  return (
    <MenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
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

export function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: ComponentProps<typeof MenuPrimitive.RadioItem>) {
  return (
    <MenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
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

export function DropdownMenuLabel({
  className,
  ...props
}: ComponentProps<typeof MenuPrimitive.Label>) {
  return (
    <MenuPrimitive.Label
      data-slot="dropdown-menu-label"
      className={cn(menuLabelStyles, className)}
      {...props}
    />
  )
}

export function DropdownMenuSeparator({
  className,
  ...props
}: ComponentProps<typeof MenuPrimitive.Separator>) {
  return (
    <MenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn(menuSeparatorStyles, className)}
      {...props}
    />
  )
}

export function DropdownMenuSubTrigger({
  icon,
  inset,
  className,
  children,
  ...props
}: ComponentProps<typeof MenuPrimitive.SubTrigger> & { icon?: IconProp; inset?: boolean }) {
  return (
    <MenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
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

export function DropdownMenuSubContent({
  className,
  sideOffset = 4,
  ...props
}: ComponentProps<typeof MenuPrimitive.SubContent>) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.SubContent
        sideOffset={sideOffset}
        data-slot="dropdown-menu-sub-content"
        className={cn(
          menuContentStyles,
          'origin-(--radix-dropdown-menu-content-transform-origin)',
          className,
        )}
        {...props}
      />
    </MenuPrimitive.Portal>
  )
}

/** Item de menu descrito por dado, para montar menus a partir de lista. */
export interface MenuAction {
  /** Chave única. Sem ela usa o label. */
  key?: string
  label: ReactNode
  icon?: IconProp
  shortcut?: string
  destructive?: boolean
  disabled?: boolean
  /** Linha antes do item. */
  separatorBefore?: boolean
  onSelect?: () => void
  /** Ações aninhadas em submenu. */
  children?: MenuAction[]
}

export interface DropdownMenuItemsProps {
  items: MenuAction[]
}

/** Renderiza uma lista de `MenuAction` como itens de menu. */
export function DropdownMenuItems({ items }: DropdownMenuItemsProps) {
  return (
    <>
      {items.map((item, index) => {
        const key = item.key ?? (typeof item.label === 'string' ? item.label : String(index))
        return (
          <Fragment key={key}>
            {item.separatorBefore ? <DropdownMenuSeparator /> : null}
            {item.children?.length ? (
              <DropdownMenuSub>
                <DropdownMenuSubTrigger icon={item.icon} disabled={item.disabled}>
                  {item.label}
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItems items={item.children} />
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            ) : (
              <DropdownMenuItem
                icon={item.icon}
                shortcut={item.shortcut}
                destructive={item.destructive}
                disabled={item.disabled}
                onSelect={item.onSelect}
              >
                {item.label}
              </DropdownMenuItem>
            )}
          </Fragment>
        )
      })}
    </>
  )
}

import { floatingSurface, popAnimation } from '../../styles/shared'

/** Visual compartilhado entre DropdownMenu e ContextMenu. */
export const menuContentStyles = [
  'z-50 min-w-[10rem] max-w-[calc(100vw-1rem)] overflow-hidden rounded-inner p-1.5',
  floatingSurface,
  popAnimation,
].join(' ')

export const menuItemStyles = [
  'relative flex w-full cursor-pointer select-none items-center gap-2.5 rounded-item px-2.5 py-2 text-sm text-foreground outline-none',
  'transition-colors duration-(--lumus-duration-fast)',
  'data-[highlighted]:bg-surface-muted',
  'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
  'data-[destructive]:text-danger data-[destructive]:data-[highlighted]:bg-danger-soft',
  '[&_[data-slot=icon]]:size-[18px] [&_[data-slot=icon]]:text-foreground-secondary data-[destructive]:[&_[data-slot=icon]]:text-danger',
].join(' ')

export const menuLabelStyles =
  'px-2.5 py-1.5 text-2xs font-semibold uppercase tracking-widest text-foreground-muted'
export const menuSeparatorStyles = '-mx-1.5 my-1.5 h-px bg-border'
export const menuShortcutStyles = 'ml-auto pl-4 text-xs tracking-wide text-foreground-muted'
export const menuIndicatorStyles =
  'absolute left-2.5 inline-flex size-4 items-center justify-center'

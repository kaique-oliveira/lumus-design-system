import * as SwitchPrimitive from '@radix-ui/react-switch'
import type { ComponentProps, ReactNode } from 'react'
import { useFieldId } from '../../hooks/use-id'
import { focusRing } from '../../styles/shared'
import { cn, tv, type VariantProps } from '../../utils/cn'
import { IconSlot, type IconProp } from '../icon-slot/icon-slot'
import { Label } from '../label/label'
import { Spinner } from '../spinner/spinner'

export const switchStyles = tv({
  slots: {
    root: [
      'peer group/switch relative inline-flex shrink-0 cursor-pointer items-center rounded-pill border-2 border-transparent bg-border-strong',
      'transition-colors duration-(--lumus-duration-base) ease-out',
      'hover:bg-foreground-muted/60',
      'disabled:cursor-not-allowed disabled:opacity-50',
      focusRing,
    ],
    thumb: [
      'pointer-events-none flex items-center justify-center rounded-pill bg-white shadow-[0_3px_8px_rgba(0,0,0,0.15),0_1px_1px_rgba(0,0,0,0.16)]',
      'transition-transform duration-(--lumus-duration-spring) ease-spring',
      'translate-x-0 text-foreground-muted',
      '[&_[data-slot=icon]]:size-[60%] [&_[data-slot=icon]]:text-current',
    ],
  },
  variants: {
    size: {
      sm: { root: 'h-5 w-8', thumb: 'size-4 data-[state=checked]:translate-x-3' },
      md: {
        root: 'h-[26px] w-[44px]',
        thumb: 'size-[22px] data-[state=checked]:translate-x-[18px]',
      },
      lg: { root: 'h-[31px] w-[51px]', thumb: 'size-[27px] data-[state=checked]:translate-x-5' },
    },
    color: {
      primary: {
        root: 'data-[state=checked]:bg-primary data-[state=checked]:hover:bg-primary-hover',
        thumb: 'data-[state=checked]:text-primary',
      },
      success: {
        root: 'data-[state=checked]:bg-success data-[state=checked]:hover:bg-success-hover',
        thumb: 'data-[state=checked]:text-success',
      },
      neutral: {
        root: 'data-[state=checked]:bg-neutral data-[state=checked]:hover:bg-neutral-hover',
        thumb: 'data-[state=checked]:text-neutral',
      },
    },
  },
  defaultVariants: { size: 'md', color: 'success' },
})

export interface SwitchClassNames {
  root?: string
  control?: string
  thumb?: string
  label?: string
  description?: string
}

export interface SwitchProps
  extends
    Omit<ComponentProps<typeof SwitchPrimitive.Root>, 'color'>,
    VariantProps<typeof switchStyles> {
  label?: ReactNode
  description?: ReactNode
  labelPosition?: 'right' | 'left'
  /** Ícone dentro do polegar. */
  icon?: IconProp
  /** Ícone quando ligado. Sem ele usa `icon`. */
  checkedIcon?: IconProp
  /** Mostra spinner no polegar e desabilita. */
  loading?: boolean
  classNames?: SwitchClassNames
}

/** Interruptor no estilo do iOS: verde por padrão, polegar branco com mola. */
export function Switch({
  id: idProp,
  label,
  description,
  labelPosition = 'right',
  icon,
  checkedIcon,
  loading,
  size,
  color,
  classNames,
  className,
  disabled,
  checked,
  ...props
}: SwitchProps) {
  const id = useFieldId(idProp)
  const styles = switchStyles({ size, color })
  const descriptionId = description ? `${id}-description` : undefined

  const control = (
    <SwitchPrimitive.Root
      id={id}
      checked={checked}
      disabled={disabled || loading}
      aria-describedby={descriptionId}
      data-slot="switch"
      className={cn(styles.root(), classNames?.control, !label && className)}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(styles.thumb(), classNames?.thumb)}
      >
        {loading ? (
          <Spinner size="xs" color="muted" />
        ) : (
          <>
            <IconSlot icon={icon} className="group-data-[state=checked]/switch:hidden" />
            <IconSlot
              icon={checkedIcon ?? icon}
              className="hidden group-data-[state=checked]/switch:inline-flex"
            />
          </>
        )}
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  )

  if (!label) return control

  return (
    <div
      data-slot="switch-root"
      className={cn(
        'flex items-center gap-3',
        labelPosition === 'left' && 'flex-row-reverse justify-end',
        className,
        classNames?.root,
      )}
    >
      {control}
      <div className="flex min-w-0 flex-col gap-0.5">
        <Label
          htmlFor={id}
          disabled={disabled}
          size={size === 'lg' ? 'base' : 'sm'}
          className={cn('cursor-pointer', classNames?.label)}
        >
          {label}
        </Label>
        {description ? (
          <span
            id={descriptionId}
            className={cn('text-foreground-secondary text-xs', classNames?.description)}
          >
            {description}
          </span>
        ) : null}
      </div>
    </div>
  )
}

import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import type { ComponentProps, ReactNode } from 'react'
import { useFieldId } from '../../hooks/use-id'
import { focusRing } from '../../styles/shared'
import { cn, tv, type VariantProps } from '../../utils/cn'
import { Label } from '../label/label'

export const checkboxStyles = tv({
  base: [
    'peer inline-flex shrink-0 cursor-pointer items-center justify-center rounded-item border-2 border-border-strong bg-surface text-primary-foreground',
    'press transition-[background-color,border-color,box-shadow]',
    'hover:border-foreground-muted',
    'data-[state=checked]:border-primary data-[state=checked]:bg-primary',
    'data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary',
    'disabled:cursor-not-allowed disabled:opacity-50',
    focusRing,
  ],
  variants: {
    size: {
      sm: 'size-4 rounded-[5px] [&_svg]:size-3',
      md: 'size-5 rounded-[7px] [&_svg]:size-3.5',
      lg: 'size-6 rounded-[8px] [&_svg]:size-4',
    },
    color: {
      primary: '',
      neutral:
        'data-[state=checked]:border-neutral data-[state=checked]:bg-neutral data-[state=checked]:text-neutral-foreground data-[state=indeterminate]:border-neutral data-[state=indeterminate]:bg-neutral',
      success:
        'data-[state=checked]:border-success data-[state=checked]:bg-success data-[state=indeterminate]:border-success data-[state=indeterminate]:bg-success',
      danger:
        'data-[state=checked]:border-danger data-[state=checked]:bg-danger data-[state=indeterminate]:border-danger data-[state=indeterminate]:bg-danger',
    },
  },
  defaultVariants: { size: 'md', color: 'primary' },
})

export interface CheckboxClassNames {
  root?: string
  control?: string
  indicator?: string
  label?: string
  description?: string
}

export interface CheckboxProps
  extends
    Omit<ComponentProps<typeof CheckboxPrimitive.Root>, 'color'>,
    VariantProps<typeof checkboxStyles> {
  label?: ReactNode
  /** Texto menor abaixo do label. */
  description?: ReactNode
  /** Posição do label. Padrão à direita. */
  labelPosition?: 'right' | 'left'
  classNames?: CheckboxClassNames
}

/**
 * Caixa de seleção. Aceita `checked="indeterminate"` para o estado parcial.
 * Controlado com `checked` e `onCheckedChange`, ou livre com `defaultChecked`.
 */
export function Checkbox({
  id: idProp,
  label,
  description,
  labelPosition = 'right',
  size,
  color,
  classNames,
  className,
  disabled,
  ...props
}: CheckboxProps) {
  const id = useFieldId(idProp)
  const descriptionId = description ? `${id}-description` : undefined

  const control = (
    <CheckboxPrimitive.Root
      id={id}
      disabled={disabled}
      aria-describedby={descriptionId}
      data-slot="checkbox"
      className={cn(checkboxStyles({ size, color }), classNames?.control, !label && className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        forceMount
        data-slot="checkbox-indicator"
        className={cn(
          'flex items-center justify-center text-current',
          'ease-spring transition-[transform,opacity] duration-(--lumus-duration-spring)',
          'data-[state=unchecked]:scale-50 data-[state=unchecked]:opacity-0',
          classNames?.indicator,
        )}
      >
        <CheckIndicator />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )

  if (!label) return control

  return (
    <div
      data-slot="checkbox-root"
      className={cn(
        'flex items-start gap-2.5',
        labelPosition === 'left' && 'flex-row-reverse justify-end',
        className,
        classNames?.root,
      )}
    >
      {control}
      <div className="flex min-w-0 flex-col gap-0.5 pt-px">
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

function CheckIndicator() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path
        className="group-data-[state=indeterminate]:hidden [[data-state=indeterminate]_&]:hidden"
        d="M3.5 8.5L6.5 11.5L12.5 4.5"
      />
      <path className="hidden [[data-state=indeterminate]_&]:block" d="M4 8H12" />
    </svg>
  )
}

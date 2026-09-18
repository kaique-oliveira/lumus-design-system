import type { ComponentProps, ReactNode } from 'react'
import { cn, tv, type VariantProps } from '../../utils/cn'
import { Label } from '../label/label'
import { IconSlot, type IconProp } from '../icon-slot/icon-slot'
import { CloseCircle, InfoCircle, TickSquare, Warning } from '../../internal/icons'

export type FieldState = 'default' | 'error' | 'success' | 'warning'

export interface FieldClassNames {
  root?: string
  label?: string
  control?: string
  caption?: string
}

export const captionStyles = tv({
  base: 'flex items-start gap-1 px-1 text-xs [&_[data-slot=icon]]:mt-px [&_[data-slot=icon]]:size-3.5',
  variants: {
    state: {
      default: 'text-foreground-secondary',
      error: 'text-danger',
      success: 'text-success',
      warning: 'text-warning',
    },
  },
  defaultVariants: { state: 'default' },
})

const captionIcons: Record<FieldState, IconProp | null> = {
  default: InfoCircle,
  error: CloseCircle,
  success: TickSquare,
  warning: Warning,
}

export interface FieldCaptionProps extends ComponentProps<'p'>, VariantProps<typeof captionStyles> {
  /** Ícone à esquerda. `false` esconde, sem valor usa o do estado. */
  icon?: IconProp | false
}

export function FieldCaption({
  state = 'default',
  icon,
  className,
  children,
  ...props
}: FieldCaptionProps) {
  const resolvedIcon = icon === false ? null : (icon ?? captionIcons[state ?? 'default'])
  return (
    <p data-slot="field-caption" className={captionStyles({ state, className })} {...props}>
      <IconSlot icon={resolvedIcon} />
      <span>{children}</span>
    </p>
  )
}

export interface FieldProps extends Omit<ComponentProps<'div'>, 'children'> {
  /** Id do controle, usado no `htmlFor` do label e no `aria-describedby`. */
  id: string
  label?: ReactNode
  /** Conteúdo à direita do label, como um link "esqueci a senha". */
  labelAddon?: ReactNode
  caption?: ReactNode
  state?: FieldState
  required?: boolean
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  classNames?: FieldClassNames
  children: ReactNode
}

export function fieldCaptionId(id: string) {
  return `${id}-caption`
}

/**
 * Casca de todo campo: label em cima, controle no meio, legenda embaixo.
 * Use direto para montar um campo próprio com o mesmo visual.
 */
export function Field({
  id,
  label,
  labelAddon,
  caption,
  state = 'default',
  required,
  disabled,
  size = 'md',
  classNames,
  className,
  children,
  ...props
}: FieldProps) {
  return (
    <div
      data-slot="field"
      data-state={state}
      data-disabled={disabled || undefined}
      className={cn('flex w-full min-w-0 flex-col gap-1.5', className, classNames?.root)}
      {...props}
    >
      {label || labelAddon ? (
        <div className="flex items-center justify-between gap-2 px-1">
          {label ? (
            <Label
              htmlFor={id}
              required={required}
              disabled={disabled}
              size={size === 'lg' ? 'base' : 'sm'}
              className={classNames?.label}
            >
              {label}
            </Label>
          ) : (
            <span />
          )}
          {labelAddon}
        </div>
      ) : null}
      <div data-slot="field-control" className={cn('min-w-0', classNames?.control)}>
        {children}
      </div>
      {caption ? (
        <FieldCaption id={fieldCaptionId(id)} state={state} className={classNames?.caption}>
          {caption}
        </FieldCaption>
      ) : null}
    </div>
  )
}

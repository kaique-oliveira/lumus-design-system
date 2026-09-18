import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import { createContext, useContext, type ComponentProps, type ReactNode } from 'react'
import { Close } from '../../internal/icons'
import { focusRing } from '../../styles/shared'
import { cn, tv, type VariantProps } from '../../utils/cn'
import { IconSlot, type IconProp } from '../icon-slot/icon-slot'

export type TagColor = 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
export type TagVariant = 'soft' | 'solid' | 'outline'

const palette: Record<TagColor, Record<TagVariant, string>> = {
  neutral: {
    soft: 'bg-surface-muted text-foreground-secondary',
    solid: 'bg-neutral text-neutral-foreground',
    outline: 'border-border-strong text-foreground-secondary',
  },
  primary: {
    soft: 'bg-primary-soft text-primary',
    solid: 'bg-primary text-primary-foreground',
    outline: 'border-primary text-primary',
  },
  success: {
    soft: 'bg-success-soft text-success',
    solid: 'bg-success text-success-foreground',
    outline: 'border-success text-success',
  },
  warning: {
    soft: 'bg-warning-soft text-warning',
    solid: 'bg-warning text-warning-foreground',
    outline: 'border-warning text-warning',
  },
  danger: {
    soft: 'bg-danger-soft text-danger',
    solid: 'bg-danger text-danger-foreground',
    outline: 'border-danger text-danger',
  },
  info: {
    soft: 'bg-info-soft text-info',
    solid: 'bg-info text-info-foreground',
    outline: 'border-info text-info',
  },
}

/** Mesmas cores da palette, aplicadas só quando o Radix marca `data-state=on` no grupo. */
const paletteOn: Record<TagColor, Record<TagVariant, string>> = {
  neutral: {
    soft: 'data-[state=on]:bg-neutral data-[state=on]:text-neutral-foreground',
    solid: 'data-[state=on]:bg-neutral data-[state=on]:text-neutral-foreground',
    outline: 'data-[state=on]:border-neutral data-[state=on]:text-foreground',
  },
  primary: {
    soft: 'data-[state=on]:bg-primary-soft data-[state=on]:text-primary',
    solid: 'data-[state=on]:bg-primary data-[state=on]:text-primary-foreground',
    outline: 'data-[state=on]:border-primary data-[state=on]:text-primary',
  },
  success: {
    soft: 'data-[state=on]:bg-success-soft data-[state=on]:text-success',
    solid: 'data-[state=on]:bg-success data-[state=on]:text-success-foreground',
    outline: 'data-[state=on]:border-success data-[state=on]:text-success',
  },
  warning: {
    soft: 'data-[state=on]:bg-warning-soft data-[state=on]:text-warning',
    solid: 'data-[state=on]:bg-warning data-[state=on]:text-warning-foreground',
    outline: 'data-[state=on]:border-warning data-[state=on]:text-warning',
  },
  danger: {
    soft: 'data-[state=on]:bg-danger-soft data-[state=on]:text-danger',
    solid: 'data-[state=on]:bg-danger data-[state=on]:text-danger-foreground',
    outline: 'data-[state=on]:border-danger data-[state=on]:text-danger',
  },
  info: {
    soft: 'data-[state=on]:bg-info-soft data-[state=on]:text-info',
    solid: 'data-[state=on]:bg-info data-[state=on]:text-info-foreground',
    outline: 'data-[state=on]:border-info data-[state=on]:text-info',
  },
}

export const tagStyles = tv({
  base: [
    'inline-flex w-fit max-w-full shrink-0 items-center gap-1.5 whitespace-nowrap rounded-pill border border-transparent font-sans font-medium',
    '[&_[data-slot=icon]]:shrink-0',
  ],
  variants: {
    variant: {
      soft: '',
      solid: '',
      outline: 'bg-transparent',
    },
    color: {
      neutral: '',
      primary: '',
      success: '',
      warning: '',
      danger: '',
      info: '',
    },
    size: {
      sm: 'h-6 px-2.5 text-xs [&_[data-slot=icon]]:size-3.5',
      md: 'h-8 px-3 text-sm [&_[data-slot=icon]]:size-4',
      lg: 'h-10 px-4 text-sm [&_[data-slot=icon]]:size-[18px]',
    },
    interactive: {
      true: [
        'cursor-pointer select-none press',
        focusRing,
        'disabled:cursor-not-allowed disabled:opacity-50 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
      ],
    },
    selected: {
      true: '',
    },
  },
  compoundVariants: [
    ...(Object.keys(palette) as TagColor[]).flatMap((color) =>
      (Object.keys(palette[color]) as TagVariant[]).map((variant) => ({
        color,
        variant,
        class: palette[color][variant],
      })),
    ),
    // Selecionável: fora do grupo fica cinza, e dentro do estado marcado ganha a cor.
    {
      interactive: true,
      selected: false,
      class:
        'bg-surface text-foreground-secondary border-border shadow-soft hover:bg-surface-muted',
    },
    { interactive: true, selected: true, class: 'shadow-soft' },
  ],
  defaultVariants: { variant: 'soft', color: 'neutral', size: 'md' },
})

export interface TagProps
  extends
    Omit<ComponentProps<'button'>, 'color'>,
    Omit<VariantProps<typeof tagStyles>, 'interactive' | 'selected'> {
  icon?: IconProp
  rightIcon?: IconProp
  /** Ponto colorido à esquerda, no lugar do ícone. */
  dot?: boolean
  /** Mostra o botão de remover e chama ao clicar. */
  onRemove?: () => void
  removeLabel?: string
  /** Vira botão de alternar fora de um `TagGroup`. */
  selected?: boolean
  onSelectedChange?: (selected: boolean) => void
  /** Valor quando usado dentro de `TagGroup`. */
  value?: string
  children?: ReactNode
}

interface TagGroupContextValue {
  size?: TagProps['size']
  color?: TagProps['color']
  variant?: TagProps['variant']
  inGroup: boolean
}

const TagGroupContext = createContext<TagGroupContextValue>({ inGroup: false })

/**
 * Etiqueta: rótulo colorido, chip removível ou opção selecionável.
 * Dentro de `TagGroup` vira um item de seleção com `value`.
 */
export function Tag({
  icon,
  rightIcon,
  dot,
  onRemove,
  removeLabel = 'Remover',
  selected,
  onSelectedChange,
  value,
  variant: variantProp,
  color: colorProp,
  size: sizeProp,
  className,
  children,
  onClick,
  disabled,
  ...props
}: TagProps) {
  const group = useContext(TagGroupContext)
  const variant = variantProp ?? group.variant
  const color = colorProp ?? group.color
  const size = sizeProp ?? group.size

  const content = (
    <>
      {dot ? (
        <span aria-hidden="true" className="rounded-pill size-1.5 shrink-0 bg-current" />
      ) : (
        <IconSlot icon={icon} />
      )}
      <span className="truncate">{children}</span>
      <IconSlot icon={rightIcon} />
      {onRemove ? (
        <button
          type="button"
          aria-label={removeLabel}
          disabled={disabled}
          onClick={(event) => {
            event.stopPropagation()
            onRemove()
          }}
          className="press rounded-pill -mr-1.5 inline-flex size-5 shrink-0 cursor-pointer items-center justify-center opacity-70 hover:bg-black/10 hover:opacity-100 [&_[data-slot=icon]]:size-3"
        >
          <IconSlot icon={Close} />
        </button>
      ) : null}
    </>
  )

  if (group.inGroup && value !== undefined) {
    return (
      <ToggleGroupPrimitive.Item
        value={value}
        disabled={disabled}
        data-slot="tag"
        className={cn(
          tagStyles({ variant, color, size, interactive: true, selected: false }),
          variant === 'outline'
            ? 'data-[state=on]:bg-transparent'
            : 'data-[state=on]:border-transparent',
          paletteOn[color ?? 'primary'][variant ?? 'soft'],
          className,
        )}
        {...props}
      >
        {content}
      </ToggleGroupPrimitive.Item>
    )
  }

  const interactive = onSelectedChange !== undefined || onClick !== undefined
  if (!interactive) {
    return (
      <span
        data-slot="tag"
        className={cn(tagStyles({ variant, color, size }), className)}
        {...(props as ComponentProps<'span'>)}
      >
        {content}
      </span>
    )
  }

  return (
    <button
      type="button"
      aria-pressed={onSelectedChange ? Boolean(selected) : undefined}
      disabled={disabled}
      data-slot="tag"
      data-state={selected ? 'on' : 'off'}
      onClick={(event) => {
        onClick?.(event)
        onSelectedChange?.(!selected)
      }}
      className={cn(
        tagStyles({ variant, color, size, interactive: true, selected: Boolean(selected) }),
        className,
      )}
      {...props}
    >
      {content}
    </button>
  )
}

export interface TagGroupSingleProps {
  type?: 'single'
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}

export interface TagGroupMultipleProps {
  type: 'multiple'
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
}

export type TagGroupProps = Omit<ComponentProps<'div'>, 'defaultValue' | 'onChange' | 'dir'> &
  (TagGroupSingleProps | TagGroupMultipleProps) & {
    /** Tamanho, cor e variante herdados pelas tags do grupo. */
    size?: TagProps['size']
    color?: TagProps['color']
    variant?: TagProps['variant']
    disabled?: boolean
    /** Permite desmarcar clicando de novo. Padrão `false` em `single`. */
    allowEmpty?: boolean
    orientation?: 'horizontal' | 'vertical'
    'aria-label'?: string
  }

/** Grupo de tags selecionáveis, uma ou várias, com navegação por setas. */
export function TagGroup({
  size,
  color = 'primary',
  variant = 'soft',
  disabled,
  allowEmpty = false,
  orientation = 'horizontal',
  className,
  children,
  ...props
}: TagGroupProps) {
  const shared = {
    disabled,
    orientation,
    'data-slot': 'tag-group',
    className: cn('flex flex-wrap gap-2', orientation === 'vertical' && 'flex-col', className),
  }

  const body = (
    <TagGroupContext.Provider value={{ size, color, variant, inGroup: true }}>
      {children}
    </TagGroupContext.Provider>
  )

  if (props.type === 'multiple') {
    const { type: _type, value, defaultValue, onValueChange, ...rest } = props
    return (
      <ToggleGroupPrimitive.Root
        type="multiple"
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        {...shared}
        {...rest}
      >
        {body}
      </ToggleGroupPrimitive.Root>
    )
  }

  const { type: _type, value, defaultValue, onValueChange, ...rest } = props
  return (
    <ToggleGroupPrimitive.Root
      type="single"
      value={value}
      defaultValue={defaultValue}
      onValueChange={(next) => {
        if (next === '' && !allowEmpty) return
        onValueChange?.(next)
      }}
      {...shared}
      {...rest}
    >
      {body}
    </ToggleGroupPrimitive.Root>
  )
}

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { createContext, useContext, type ComponentProps, type ReactNode } from 'react'
import { useFieldId } from '../../hooks/use-id'
import { focusRing } from '../../styles/shared'
import { cn, tv, type VariantProps } from '../../utils/cn'
import { Label } from '../label/label'

export const radioStyles = tv({
  slots: {
    item: [
      'peer inline-flex shrink-0 cursor-pointer items-center justify-center rounded-pill border-2 border-border-strong bg-surface',
      'press transition-[border-color,background-color]',
      'hover:border-foreground-muted',
      'data-[state=checked]:border-primary',
      'disabled:cursor-not-allowed disabled:opacity-50',
      focusRing,
    ],
    indicator: [
      'block rounded-pill bg-primary',
      'transition-transform duration-(--lumus-duration-spring) ease-spring',
      'data-[state=unchecked]:scale-0',
    ],
  },
  variants: {
    size: {
      sm: { item: 'size-4', indicator: 'size-2' },
      md: { item: 'size-5', indicator: 'size-2.5' },
      lg: { item: 'size-6', indicator: 'size-3' },
    },
    color: {
      primary: {},
      neutral: { item: 'data-[state=checked]:border-neutral', indicator: 'bg-neutral' },
      success: { item: 'data-[state=checked]:border-success', indicator: 'bg-success' },
    },
  },
  defaultVariants: { size: 'md', color: 'primary' },
})

type RadioVariants = VariantProps<typeof radioStyles>

const RadioGroupContext = createContext<RadioVariants>({})

export interface RadioOption<T extends string = string> {
  value: T
  label: ReactNode
  description?: ReactNode
  disabled?: boolean
}

export interface RadioGroupProps<T extends string = string>
  extends
    Omit<
      ComponentProps<typeof RadioGroupPrimitive.Root>,
      'value' | 'defaultValue' | 'onValueChange' | 'color'
    >,
    RadioVariants {
  value?: T
  defaultValue?: T
  onValueChange?: (value: T) => void
  /** Lista de opções. Alternativa a passar `RadioItem` como filhos. */
  options?: RadioOption<T>[]
  label?: ReactNode
  description?: ReactNode
  orientation?: 'vertical' | 'horizontal'
}

/**
 * Grupo de opções únicas. Use `options` para o caso comum, ou monte com
 * `RadioItem` quando cada opção precisar de conteúdo próprio.
 */
export function RadioGroup<T extends string = string>({
  options,
  label,
  description,
  orientation = 'vertical',
  size,
  color,
  className,
  children,
  onValueChange,
  ...props
}: RadioGroupProps<T>) {
  const id = useFieldId(props.id)
  const labelId = label ? `${id}-label` : undefined
  const descriptionId = description ? `${id}-description` : undefined

  return (
    <RadioGroupContext.Provider value={{ size, color }}>
      <RadioGroupPrimitive.Root
        orientation={orientation}
        aria-labelledby={labelId}
        aria-describedby={descriptionId}
        onValueChange={onValueChange as (value: string) => void}
        data-slot="radio-group"
        className={cn('flex flex-col gap-2', className)}
        {...props}
      >
        {label ? (
          <Label id={labelId} asChild size={size === 'lg' ? 'base' : 'sm'} className="px-1">
            <span>{label}</span>
          </Label>
        ) : null}
        {description ? (
          <span id={descriptionId} className="text-foreground-secondary -mt-1 px-1 text-xs">
            {description}
          </span>
        ) : null}
        <div
          className={cn(
            'flex gap-3',
            orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap gap-x-5',
          )}
        >
          {options?.map((option) => (
            <RadioItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              description={option.description}
            >
              {option.label}
            </RadioItem>
          ))}
          {children}
        </div>
      </RadioGroupPrimitive.Root>
    </RadioGroupContext.Provider>
  )
}

export interface RadioItemProps extends Omit<
  ComponentProps<typeof RadioGroupPrimitive.Item>,
  'children'
> {
  children?: ReactNode
  description?: ReactNode
  classNames?: {
    root?: string
    item?: string
    indicator?: string
    label?: string
    description?: string
  }
}

export function RadioItem({
  id: idProp,
  children,
  description,
  classNames,
  className,
  disabled,
  ...props
}: RadioItemProps) {
  const id = useFieldId(idProp)
  const { size, color } = useContext(RadioGroupContext)
  const styles = radioStyles({ size, color })
  const descriptionId = description ? `${id}-description` : undefined

  return (
    <div
      data-slot="radio-item-root"
      className={cn('flex items-start gap-2.5', className, classNames?.root)}
    >
      <RadioGroupPrimitive.Item
        id={id}
        disabled={disabled}
        aria-describedby={descriptionId}
        data-slot="radio-item"
        className={cn(styles.item(), classNames?.item)}
        {...props}
      >
        <RadioGroupPrimitive.Indicator
          forceMount
          data-slot="radio-indicator"
          className={cn(styles.indicator(), classNames?.indicator)}
        />
      </RadioGroupPrimitive.Item>
      {children !== undefined ? (
        <div className="flex min-w-0 flex-col gap-0.5 pt-px">
          <Label
            htmlFor={id}
            disabled={disabled}
            size={size === 'lg' ? 'base' : 'sm'}
            className={cn('cursor-pointer', classNames?.label)}
          >
            {children}
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
      ) : null}
    </div>
  )
}

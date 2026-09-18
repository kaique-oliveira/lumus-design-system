import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type ComponentProps,
  type ReactNode,
} from 'react'
import { useFieldId } from '../../hooks/use-id'
import { cn, tv, type VariantProps } from '../../utils/cn'
import { mergeRefs } from '../../utils/merge-refs'
import { Field, fieldCaptionId, type FieldClassNames, type FieldState } from '../field/field'

export const textAreaStyles = tv({
  base: [
    'block w-full min-w-0 border font-sans text-foreground outline-none',
    'transition-[border-color,box-shadow,background-color] duration-(--lumus-duration-fast) ease-out',
    'placeholder:text-foreground-muted',
    'focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary/20',
    'disabled:cursor-not-allowed disabled:opacity-50 read-only:cursor-default',
    'scrollbar-soft',
  ],
  variants: {
    variant: {
      outline: 'border-border-strong bg-surface hover:border-foreground-muted',
      filled: 'border-transparent bg-surface-muted hover:bg-border-strong/40',
    },
    size: {
      sm: 'rounded-field px-3.5 py-2 text-sm',
      md: 'rounded-field px-4 py-2.5 text-sm',
      lg: 'rounded-field px-5 py-3 text-base',
    },
    state: {
      default: '',
      error: 'border-danger focus-visible:border-danger focus-visible:ring-danger/20',
      success: 'border-success focus-visible:border-success focus-visible:ring-success/20',
      warning: 'border-warning focus-visible:border-warning focus-visible:ring-warning/20',
    },
    resize: {
      none: 'resize-none',
      vertical: 'resize-y',
      both: 'resize',
    },
  },
  defaultVariants: {
    variant: 'outline',
    size: 'md',
    state: 'default',
    resize: 'vertical',
  },
})

export interface TextAreaClassNames extends FieldClassNames {
  textarea?: string
  counter?: string
}

export interface TextAreaProps
  extends
    Omit<ComponentProps<'textarea'>, 'size'>,
    Pick<VariantProps<typeof textAreaStyles>, 'variant' | 'size' | 'resize'> {
  label?: ReactNode
  labelAddon?: ReactNode
  caption?: ReactNode
  state?: FieldState
  /** Cresce com o conteúdo até `maxRows`. */
  autoResize?: boolean
  minRows?: number
  maxRows?: number
  /** Mostra o contador de caracteres. Com `maxLength` mostra "atual / máximo". */
  showCount?: boolean
  onValueChange?: (value: string) => void
  classNames?: TextAreaClassNames
}

export function TextArea({
  id: idProp,
  label,
  labelAddon,
  caption,
  state = 'default',
  variant,
  size = 'md',
  resize,
  autoResize,
  minRows = 3,
  maxRows,
  showCount,
  maxLength,
  onValueChange,
  onChange,
  classNames,
  className,
  required,
  disabled,
  ref,
  value,
  defaultValue,
  rows,
  'aria-describedby': ariaDescribedBy,
  ...props
}: TextAreaProps) {
  const id = useFieldId(idProp)
  const areaRef = useRef<HTMLTextAreaElement>(null)
  const [count, setCount] = useState(String(value ?? defaultValue ?? '').length)

  const fit = useCallback(() => {
    const area = areaRef.current
    if (!area || !autoResize) return
    area.style.height = 'auto'
    const lineHeight = parseFloat(getComputedStyle(area).lineHeight) || 20
    const padding =
      parseFloat(getComputedStyle(area).paddingTop) +
      parseFloat(getComputedStyle(area).paddingBottom)
    const max = maxRows ? maxRows * lineHeight + padding : Infinity
    area.style.height = `${Math.min(area.scrollHeight, max)}px`
    area.style.overflowY = area.scrollHeight > max ? 'auto' : 'hidden'
  }, [autoResize, maxRows])

  useEffect(() => {
    fit()
  }, [fit, value])

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setCount(event.target.value.length)
    onChange?.(event)
    onValueChange?.(event.target.value)
    fit()
  }

  const describedBy =
    [caption ? fieldCaptionId(id) : null, ariaDescribedBy].filter(Boolean).join(' ') || undefined

  return (
    <Field
      id={id}
      label={label}
      labelAddon={labelAddon}
      caption={caption}
      state={state}
      required={required}
      disabled={disabled}
      size={size ?? 'md'}
      classNames={classNames}
      className={className}
    >
      <textarea
        ref={mergeRefs(areaRef, ref)}
        id={id}
        rows={rows ?? minRows}
        value={value}
        defaultValue={defaultValue}
        maxLength={maxLength}
        required={required}
        disabled={disabled}
        aria-invalid={state === 'error' || undefined}
        aria-describedby={describedBy}
        onChange={handleChange}
        className={cn(
          textAreaStyles({ variant, size, state, resize: autoResize ? 'none' : resize }),
          classNames?.textarea,
        )}
        {...props}
      />
      {showCount ? (
        <span
          data-slot="counter"
          aria-live="polite"
          className={cn(
            'text-foreground-muted self-end px-1 text-xs tabular-nums',
            maxLength !== undefined && count >= maxLength && 'text-danger',
            classNames?.counter,
          )}
        >
          {maxLength !== undefined ? `${count} / ${maxLength}` : count}
        </span>
      ) : null}
    </Field>
  )
}

import { useRef, useState, type ChangeEvent, type ComponentProps, type ReactNode } from 'react'
import { useFieldId } from '../../hooks/use-id'
import { Close, Eye, EyeSlash } from '../../internal/icons'
import { cn, tv, type VariantProps } from '../../utils/cn'
import { applyMask, maskMaxLength, unmask, type Mask } from '../../utils/masks'
import { mergeRefs } from '../../utils/merge-refs'
import { Field, fieldCaptionId, type FieldClassNames, type FieldState } from '../field/field'
import { IconSlot, type IconProp } from '../icon-slot/icon-slot'
import { Spinner } from '../spinner/spinner'

export const inputControlStyles = tv({
  base: [
    'group/input flex w-full min-w-0 items-center gap-2 border font-sans text-foreground',
    'transition-[border-color,box-shadow,background-color] duration-(--lumus-duration-fast) ease-out',
    'has-[input:focus-visible]:border-primary has-[input:focus-visible]:ring-[3px] has-[input:focus-visible]:ring-primary/20',
    'has-[input:disabled]:cursor-not-allowed has-[input:disabled]:opacity-50',
    'has-[input:read-only]:cursor-default',
    '[&_[data-slot=icon]]:text-foreground-muted',
  ],
  variants: {
    variant: {
      outline: 'border-border-strong bg-surface hover:border-foreground-muted',
      filled: 'border-transparent bg-surface-muted hover:bg-border-strong/40',
    },
    size: {
      sm: 'h-control-sm px-3.5 text-sm [&_[data-slot=icon]]:size-4',
      md: 'h-control-md px-4 text-sm [&_[data-slot=icon]]:size-[18px]',
      lg: 'h-control-lg px-5 text-base [&_[data-slot=icon]]:size-5',
    },
    state: {
      default: '',
      error:
        'border-danger has-[input:focus-visible]:border-danger has-[input:focus-visible]:ring-danger/20',
      success:
        'border-success has-[input:focus-visible]:border-success has-[input:focus-visible]:ring-success/20',
      warning:
        'border-warning has-[input:focus-visible]:border-warning has-[input:focus-visible]:ring-warning/20',
    },
    shape: {
      pill: 'rounded-pill',
      field: 'rounded-field',
    },
  },
  defaultVariants: {
    variant: 'outline',
    size: 'md',
    state: 'default',
    shape: 'pill',
  },
})

export const nativeInputStyles =
  'h-full min-w-0 flex-1 bg-transparent font-sans text-inherit outline-none placeholder:text-foreground-muted disabled:cursor-not-allowed'

export interface TextInputClassNames extends FieldClassNames {
  input?: string
  prefix?: string
  suffix?: string
}

export interface TextInputAction {
  icon: IconProp
  /** Texto do botão para leitor de tela. */
  label: string
  onClick: () => void
}

export interface TextInputProps
  extends
    Omit<ComponentProps<'input'>, 'size' | 'prefix'>,
    Pick<VariantProps<typeof inputControlStyles>, 'variant' | 'size' | 'shape'> {
  label?: ReactNode
  labelAddon?: ReactNode
  caption?: ReactNode
  state?: FieldState
  leftIcon?: IconProp
  rightIcon?: IconProp
  /** Texto ou elemento fixo antes do valor, como "R$" ou "@". */
  prefix?: ReactNode
  suffix?: ReactNode
  /** Botão de ação dentro do campo, à direita. */
  action?: TextInputAction
  /** Mostra o botão de limpar quando há valor. */
  clearable?: boolean
  onClear?: () => void
  /** Preset, padrão `999-AAA` ou função. */
  mask?: Mask
  /** Recebe o valor com máscara e o valor limpo. Roda junto com `onChange`. */
  onValueChange?: (value: string, rawValue: string) => void
  loading?: boolean
  /** Em `type="password"`, mostra o botão de ver a senha. Padrão `true`. */
  passwordToggle?: boolean
  classNames?: TextInputClassNames
  /** Classe do container do controle, o que tem a borda. */
  controlClassName?: string
}

export function TextInput({
  id: idProp,
  label,
  labelAddon,
  caption,
  state = 'default',
  variant,
  size = 'md',
  shape,
  leftIcon,
  rightIcon,
  prefix,
  suffix,
  action,
  clearable,
  onClear,
  mask,
  onValueChange,
  onChange,
  loading,
  passwordToggle = true,
  classNames,
  controlClassName,
  className,
  required,
  disabled,
  readOnly,
  type = 'text',
  ref,
  value,
  defaultValue,
  maxLength,
  'aria-describedby': ariaDescribedBy,
  ...props
}: TextInputProps) {
  const id = useFieldId(idProp)
  const inputRef = useRef<HTMLInputElement>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [hasValueState, setHasValueState] = useState(Boolean(defaultValue))
  const isControlled = value !== undefined
  const hasValue = isControlled ? String(value ?? '').length > 0 : hasValueState

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const raw = event.target.value
    if (mask) {
      const masked = applyMask(raw, mask)
      if (masked !== raw) event.target.value = masked
    }
    const current = event.target.value
    if (!isControlled) setHasValueState(current.length > 0)
    onChange?.(event)
    onValueChange?.(current, unmask(current, mask))
  }

  function clear() {
    const input = inputRef.current
    if (!input) return
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set
    setter?.call(input, '')
    input.dispatchEvent(new Event('input', { bubbles: true }))
    input.focus()
    onClear?.()
  }

  const isPassword = type === 'password'
  const resolvedType = isPassword && showPassword ? 'text' : type
  const describedBy =
    [caption ? fieldCaptionId(id) : null, ariaDescribedBy].filter(Boolean).join(' ') || undefined
  const showClear = clearable && hasValue && !disabled && !readOnly

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
      <div
        data-slot="input-control"
        data-state={state}
        className={cn(inputControlStyles({ variant, size, state, shape }), controlClassName)}
        onPointerDown={(event) => {
          if (event.target === event.currentTarget) {
            event.preventDefault()
            inputRef.current?.focus()
          }
        }}
      >
        <IconSlot icon={leftIcon} />
        {prefix !== undefined ? (
          <span
            data-slot="prefix"
            className={cn('text-foreground-muted shrink-0', classNames?.prefix)}
          >
            {prefix}
          </span>
        ) : null}
        <input
          ref={mergeRefs(inputRef, ref)}
          id={id}
          type={resolvedType}
          value={value}
          defaultValue={defaultValue}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          maxLength={maxLength ?? maskMaxLength(mask)}
          aria-invalid={state === 'error' || undefined}
          aria-describedby={describedBy}
          onChange={handleChange}
          className={cn(nativeInputStyles, classNames?.input)}
          {...props}
        />
        {suffix !== undefined ? (
          <span
            data-slot="suffix"
            className={cn('text-foreground-muted shrink-0', classNames?.suffix)}
          >
            {suffix}
          </span>
        ) : null}
        {loading ? <Spinner size="sm" color="muted" /> : null}
        {showClear ? <InlineButton label="Limpar" icon={Close} onClick={clear} /> : null}
        {isPassword && passwordToggle ? (
          <InlineButton
            label={showPassword ? 'Esconder senha' : 'Mostrar senha'}
            icon={showPassword ? EyeSlash : Eye}
            onClick={() => setShowPassword((current) => !current)}
            pressed={showPassword}
          />
        ) : null}
        {action ? (
          <InlineButton label={action.label} icon={action.icon} onClick={action.onClick} />
        ) : null}
        <IconSlot icon={rightIcon} />
      </div>
    </Field>
  )
}

interface InlineButtonProps {
  label: string
  icon: IconProp
  onClick: () => void
  pressed?: boolean
}

/** Botão pequeno dentro do campo. Não rouba o foco do input ao clicar. */
export function InlineButton({ label, icon, onClick, pressed }: InlineButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={pressed}
      tabIndex={-1}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      data-slot="inline-button"
      className="press rounded-pill text-foreground-muted hover:bg-surface-muted hover:text-foreground -mr-1 inline-flex size-7 shrink-0 cursor-pointer items-center justify-center transition-colors [&_[data-slot=icon]]:size-4"
    >
      <IconSlot icon={icon} />
    </button>
  )
}

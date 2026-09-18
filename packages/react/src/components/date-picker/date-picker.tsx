import * as PopoverPrimitive from '@radix-ui/react-popover'
import { format, isValid, parse } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useEffect, useState, type ComponentProps, type ReactNode } from 'react'
import { useControllableState } from '../../hooks/use-controllable-state'
import { Calendar as CalendarIcon } from '../../internal/icons'
import { floatingSurface, popAnimation } from '../../styles/shared'
import { cn } from '../../utils/cn'
import { Calendar, type CalendarSingleProps } from '../calendar/calendar'
import { TextInput, type TextInputProps } from '../text-input/text-input'

export interface DatePickerProps extends Omit<
  TextInputProps,
  'value' | 'defaultValue' | 'onChange' | 'onValueChange' | 'mask' | 'type'
> {
  value?: Date | null
  defaultValue?: Date | null
  onValueChange?: (date: Date | null) => void
  /** Formato de exibição, na sintaxe do date-fns. Padrão `dd/MM/yyyy`. */
  format?: string
  /** Permite digitar a data. Padrão `true`. */
  allowTyping?: boolean
  locale?: CalendarSingleProps['locale']
  /** Props repassadas ao calendário: `min`, `max`, `disabled`, `texts`. */
  calendarProps?: Omit<
    CalendarSingleProps,
    'mode' | 'value' | 'defaultValue' | 'onValueChange' | 'locale'
  >
  /** Fecha ao escolher. Padrão `true`. */
  closeOnSelect?: boolean
  /** Conteúdo extra abaixo do calendário. */
  footer?: ReactNode
  /** Nome do input escondido com a data em ISO, para formulário nativo. */
  name?: string
  popoverProps?: Omit<ComponentProps<typeof PopoverPrimitive.Content>, 'children'>
}

/** Campo de data com calendário. Aceita digitar ou escolher. */
export function DatePicker({
  value: valueProp,
  defaultValue = null,
  onValueChange,
  format: pattern = 'dd/MM/yyyy',
  allowTyping = true,
  locale = ptBR,
  calendarProps,
  closeOnSelect = true,
  footer,
  name,
  popoverProps,
  placeholder,
  clearable = true,
  rightIcon,
  disabled,
  readOnly,
  ...inputProps
}: DatePickerProps) {
  const [value, setValue] = useControllableState<Date | null>({
    value: valueProp,
    defaultValue,
    onChange: onValueChange,
  })
  const [open, setOpen] = useState(false)
  const [text, setText] = useState(value ? format(value, pattern, { locale }) : '')

  useEffect(() => {
    setText(value ? format(value, pattern, { locale }) : '')
  }, [value, pattern, locale])

  function commitText(raw: string) {
    if (!raw.trim()) {
      setValue(null)
      return
    }
    const parsed = parse(raw, pattern, new Date(), { locale })
    if (isValid(parsed) && format(parsed, pattern, { locale }) === raw) setValue(parsed)
    else setText(value ? format(value, pattern, { locale }) : '')
  }

  const mask = pattern.replace(/[a-zA-Z]/g, '9')

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      {name ? <input type="hidden" name={name} value={value ? value.toISOString() : ''} /> : null}
      <PopoverPrimitive.Anchor asChild>
        <TextInput
          value={text}
          onChange={(event) => setText(event.target.value)}
          onBlur={(event) => {
            commitText(event.target.value)
            inputProps.onBlur?.(event)
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') commitText(event.currentTarget.value)
            if (event.key === 'ArrowDown' || event.key === ' ') {
              if (event.key === ' ' && allowTyping) return
              event.preventDefault()
              setOpen(true)
            }
            inputProps.onKeyDown?.(event)
          }}
          onClick={(event) => {
            if (!allowTyping) setOpen(true)
            inputProps.onClick?.(event)
          }}
          mask={allowTyping ? mask : undefined}
          readOnly={readOnly || !allowTyping}
          disabled={disabled}
          placeholder={placeholder ?? pattern.toLowerCase()}
          inputMode="numeric"
          clearable={clearable}
          onClear={() => setValue(null)}
          rightIcon={undefined}
          action={{
            icon: rightIcon ?? CalendarIcon,
            label: 'Abrir calendário',
            onClick: () => !disabled && !readOnly && setOpen((current) => !current),
          }}
          {...inputProps}
        />
      </PopoverPrimitive.Anchor>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={6}
          collisionPadding={8}
          onOpenAutoFocus={(event) => event.preventDefault()}
          data-slot="date-picker-content"
          className={cn(
            'rounded-surface z-50 p-3',
            floatingSurface,
            'origin-(--radix-popover-content-transform-origin)',
            popAnimation,
          )}
          {...popoverProps}
        >
          <Calendar
            mode="single"
            value={value}
            onValueChange={(date) => {
              setValue(date)
              if (closeOnSelect && date) setOpen(false)
            }}
            locale={locale}
            footer={footer}
            {...calendarProps}
          />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}

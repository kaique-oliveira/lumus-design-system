import {
  addDays,
  addMonths,
  addYears,
  endOfMonth,
  format,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  startOfDay,
  startOfMonth,
  startOfWeek,
  type Locale,
} from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { useControllableState } from '../../hooks/use-controllable-state'
import { ArrowLeft, ArrowRight } from '../../internal/icons'
import { focusRing } from '../../styles/shared'
import { cn, tv, type VariantProps } from '../../utils/cn'
import { IconButton } from '../button/button'
import { ScrollArea } from '../scroll-area/scroll-area'

export type DateMatcher = Date | Date[] | { from?: Date; to?: Date } | ((date: Date) => boolean)

export interface CalendarTexts {
  previousMonth: string
  nextMonth: string
  selectMonth: string
  selectYear: string
  today: string
}

const defaultTexts: CalendarTexts = {
  previousMonth: 'Mês anterior',
  nextMonth: 'Próximo mês',
  selectMonth: 'Escolher mês',
  selectYear: 'Escolher ano',
  today: 'Hoje',
}

export const calendarStyles = tv({
  slots: {
    root: 'relative inline-flex w-full max-w-full select-none flex-col gap-2 font-sans text-foreground',
    header: 'flex items-center justify-between gap-1',
    title: 'flex items-center gap-1',
    titleButton: [
      'press rounded-pill px-2.5 py-1 text-sm font-semibold capitalize hover:bg-surface-muted',
      focusRing,
    ],
    weekdays:
      'grid grid-cols-7 text-center text-2xs font-medium uppercase tracking-wide text-foreground-muted',
    grid: 'grid grid-cols-7 gap-y-1',
    day: [
      'relative mx-auto flex aspect-square w-full max-w-10 cursor-pointer items-center justify-center rounded-pill text-sm tabular-nums',
      'press transition-colors',
      'hover:bg-surface-muted',
      'data-[outside]:text-foreground-muted/60',
      'data-[today]:font-semibold data-[today]:text-primary',
      'data-[selected]:bg-primary data-[selected]:text-primary-foreground data-[selected]:hover:bg-primary-hover data-[selected]:data-[today]:text-primary-foreground',
      'data-[in-range]:rounded-none data-[in-range]:bg-primary-soft data-[in-range]:text-primary',
      'data-[range-start]:rounded-l-pill data-[range-end]:rounded-r-pill',
      'disabled:pointer-events-none disabled:opacity-30',
      focusRing,
    ],
    picker:
      'absolute inset-0 z-10 flex flex-col rounded-[inherit] bg-surface animate-in fade-in zoom-in-95 duration-(--lumus-duration-fast)',
    pickerItem: [
      'press rounded-item px-2 py-2 text-center text-sm hover:bg-surface-muted data-[selected]:bg-primary data-[selected]:text-primary-foreground',
      focusRing,
    ],
    footer: 'flex items-center justify-between gap-2 pt-1',
  },
  variants: {
    size: {
      sm: { root: 'w-[16.5rem]', day: 'max-w-8 text-xs' },
      md: { root: 'w-[19rem]' },
      lg: { root: 'w-[22rem]', day: 'text-base' },
      full: { root: 'w-full' },
    },
  },
  defaultVariants: { size: 'md' },
})

export interface CalendarBaseProps
  extends
    Omit<ComponentProps<'div'>, 'onChange' | 'defaultValue'>,
    VariantProps<typeof calendarStyles> {
  /** Mês exibido. Controlado com `onMonthChange`. */
  month?: Date
  defaultMonth?: Date
  onMonthChange?: (month: Date) => void
  min?: Date
  max?: Date
  /** Datas que não podem ser escolhidas. */
  disabled?: DateMatcher
  locale?: Locale
  /** Primeiro dia da semana. 0 é domingo. Padrão vem do locale. */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  /** Mostra os dias do mês anterior e do próximo nas pontas. Padrão `true`. */
  showOutsideDays?: boolean
  /** Botão "Hoje" no rodapé. */
  showToday?: boolean
  texts?: Partial<CalendarTexts>
  /** Anos disponíveis no seletor de ano. Padrão: 100 para trás e 20 para frente. */
  yearRange?: { from: number; to: number }
  /** Conteúdo extra no rodapé. */
  footer?: ReactNode
  classNames?: Partial<Record<keyof ReturnType<typeof calendarStyles>, string>>
}

export interface CalendarSingleProps extends CalendarBaseProps {
  mode?: 'single'
  value?: Date | null
  defaultValue?: Date | null
  onValueChange?: (date: Date | null) => void
}

export interface DateRange {
  from: Date | null
  to: Date | null
}

export interface CalendarRangeProps extends CalendarBaseProps {
  mode: 'range'
  value?: DateRange
  defaultValue?: DateRange
  onValueChange?: (range: DateRange) => void
}

export type CalendarProps = CalendarSingleProps | CalendarRangeProps

function matches(date: Date, matcher?: DateMatcher): boolean {
  if (!matcher) return false
  if (typeof matcher === 'function') return matcher(date)
  if (matcher instanceof Date) return isSameDay(date, matcher)
  if (Array.isArray(matcher)) return matcher.some((item) => isSameDay(date, item))
  const afterFrom = matcher.from ? !isBefore(date, startOfDay(matcher.from)) : true
  const beforeTo = matcher.to ? !isAfter(date, startOfDay(matcher.to)) : true
  return afterFrom && beforeTo
}

/**
 * Calendário de um mês com seleção simples ou de intervalo, teclado completo
 * e seletor de mês e ano. Texto em português por padrão, troque com `locale` e `texts`.
 */
export function Calendar(props: CalendarProps) {
  const {
    month: monthProp,
    defaultMonth,
    onMonthChange,
    min,
    max,
    disabled,
    locale = ptBR,
    weekStartsOn,
    showOutsideDays = true,
    showToday = false,
    texts: textsProp,
    yearRange,
    footer,
    size,
    classNames,
    className,
    mode = 'single',
    value: _value,
    defaultValue: _defaultValue,
    onValueChange: _onValueChange,
    ...rest
  } = props as CalendarRangeProps & { mode?: 'single' | 'range' }

  const texts = { ...defaultTexts, ...textsProp }
  const styles = calendarStyles({ size })
  const today = startOfDay(new Date())
  const weekStart = weekStartsOn ?? locale.options?.weekStartsOn ?? 0

  const single = props.mode !== 'range' ? (props as CalendarSingleProps) : null
  const range = props.mode === 'range' ? (props as CalendarRangeProps) : null

  const [singleValue, setSingleValue] = useControllableState<Date | null>({
    value: single?.value,
    defaultValue: single?.defaultValue ?? null,
    onChange: single?.onValueChange,
  })
  const [rangeValue, setRangeValue] = useControllableState<DateRange>({
    value: range?.value,
    defaultValue: range?.defaultValue ?? { from: null, to: null },
    onChange: range?.onValueChange,
  })

  const initialMonth = defaultMonth ?? (mode === 'range' ? rangeValue.from : singleValue) ?? today
  const [month, setMonth] = useControllableState<Date>({
    value: monthProp,
    defaultValue: startOfMonth(initialMonth),
    onChange: onMonthChange,
  })
  const [focused, setFocused] = useState<Date>(
    () => (mode === 'range' ? rangeValue.from : singleValue) ?? today,
  )
  const [picker, setPicker] = useState<'month' | 'year' | null>(null)
  const [hovered, setHovered] = useState<Date | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const shouldFocus = useRef(false)

  const isDisabled = (date: Date) => {
    if (min && isBefore(date, startOfDay(min))) return true
    if (max && isAfter(date, startOfDay(max))) return true
    return matches(date, disabled)
  }

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(month), { weekStartsOn: weekStart })
    const list: Date[] = []
    for (let i = 0; i < 42; i++) list.push(addDays(start, i))
    // Corta a última semana quando ela cai inteira no próximo mês.
    const lastRow = list.slice(35)
    return lastRow.every((date) => !isSameMonth(date, month)) ? list.slice(0, 35) : list
  }, [month, weekStart])

  const weekdays = useMemo(() => {
    const start = startOfWeek(today, { weekStartsOn: weekStart })
    return Array.from({ length: 7 }, (_, i) => format(addDays(start, i), 'EEEEEE', { locale }))
  }, [locale, weekStart, today])

  useEffect(() => {
    if (!shouldFocus.current) return
    shouldFocus.current = false
    gridRef.current?.querySelector<HTMLButtonElement>('[tabindex="0"]')?.focus()
  }, [focused, month])

  function goTo(date: Date) {
    setFocused(date)
    if (!isSameMonth(date, month)) setMonth(startOfMonth(date))
  }

  function select(date: Date) {
    if (isDisabled(date)) return
    if (mode === 'range') {
      const { from, to } = rangeValue
      if (!from || (from && to)) setRangeValue({ from: date, to: null })
      else if (isBefore(date, from)) setRangeValue({ from: date, to: from })
      else setRangeValue({ from, to: date })
    } else {
      setSingleValue(singleValue && isSameDay(singleValue, date) ? null : date)
    }
    goTo(date)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const moves: Record<string, () => Date> = {
      ArrowLeft: () => addDays(focused, -1),
      ArrowRight: () => addDays(focused, 1),
      ArrowUp: () => addDays(focused, -7),
      ArrowDown: () => addDays(focused, 7),
      Home: () => startOfWeek(focused, { weekStartsOn: weekStart }),
      End: () => addDays(startOfWeek(focused, { weekStartsOn: weekStart }), 6),
      PageUp: () => (event.shiftKey ? addYears(focused, -1) : addMonths(focused, -1)),
      PageDown: () => (event.shiftKey ? addYears(focused, 1) : addMonths(focused, 1)),
    }
    const move = moves[event.key]
    if (move) {
      event.preventDefault()
      shouldFocus.current = true
      goTo(move())
      return
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      select(focused)
    }
  }

  const rangePreview =
    mode === 'range' && rangeValue.from && !rangeValue.to && hovered
      ? {
          from: isBefore(hovered, rangeValue.from) ? hovered : rangeValue.from,
          to: isBefore(hovered, rangeValue.from) ? rangeValue.from : hovered,
        }
      : null

  const years = useMemo(() => {
    const current = today.getFullYear()
    const from = yearRange?.from ?? (min ? min.getFullYear() : current - 100)
    const to = yearRange?.to ?? (max ? max.getFullYear() : current + 20)
    return Array.from({ length: to - from + 1 }, (_, i) => from + i)
  }, [yearRange, min, max, today])

  const monthLabel = format(month, 'MMMM', { locale })

  return (
    <div
      data-slot="calendar"
      className={cn(styles.root(), className, classNames?.root)}
      {...(rest as ComponentProps<'div'>)}
    >
      <div className={cn(styles.header(), classNames?.header)}>
        <div className={cn(styles.title(), classNames?.title)}>
          <button
            type="button"
            aria-label={texts.selectMonth}
            aria-expanded={picker === 'month'}
            onClick={() => setPicker(picker === 'month' ? null : 'month')}
            className={cn(styles.titleButton(), classNames?.titleButton)}
          >
            {monthLabel}
          </button>
          <button
            type="button"
            aria-label={texts.selectYear}
            aria-expanded={picker === 'year'}
            onClick={() => setPicker(picker === 'year' ? null : 'year')}
            className={cn(
              styles.titleButton(),
              'text-foreground-secondary',
              classNames?.titleButton,
            )}
          >
            {month.getFullYear()}
          </button>
        </div>
        <div className="flex items-center gap-0.5">
          <IconButton
            icon={ArrowLeft}
            aria-label={texts.previousMonth}
            variant="ghost"
            color="neutral"
            size="sm"
            className="size-8"
            onClick={() => goTo(addMonths(month, -1))}
            disabled={min ? isBefore(endOfMonth(addMonths(month, -1)), startOfDay(min)) : false}
          />
          <IconButton
            icon={ArrowRight}
            aria-label={texts.nextMonth}
            variant="ghost"
            color="neutral"
            size="sm"
            className="size-8"
            onClick={() => goTo(addMonths(month, 1))}
            disabled={max ? isAfter(startOfMonth(addMonths(month, 1)), startOfDay(max)) : false}
          />
        </div>
      </div>

      <div
        role="grid"
        aria-label={format(month, 'MMMM yyyy', { locale })}
        onKeyDown={handleKeyDown}
        ref={gridRef}
        className="flex flex-col gap-1"
      >
        <div role="row" className={cn(styles.weekdays(), classNames?.weekdays)}>
          {weekdays.map((day) => (
            <span key={day} role="columnheader" className="py-1">
              {day}
            </span>
          ))}
        </div>
        <div className={cn(styles.grid(), classNames?.grid)}>
          {days.map((date) => {
            const outside = !isSameMonth(date, month)
            if (outside && !showOutsideDays)
              return <span key={date.toISOString()} aria-hidden="true" />
            const disabledDay = isDisabled(date)
            const isSelected =
              mode === 'range'
                ? Boolean(
                    (rangeValue.from && isSameDay(date, rangeValue.from)) ||
                    (rangeValue.to && isSameDay(date, rangeValue.to)),
                  )
                : Boolean(singleValue && isSameDay(date, singleValue))
            const activeRange =
              rangePreview ??
              (rangeValue.from && rangeValue.to
                ? { from: rangeValue.from, to: rangeValue.to }
                : null)
            const inRange =
              mode === 'range' && activeRange
                ? matches(date, { from: activeRange.from, to: activeRange.to })
                : false
            const rangeStart = inRange && activeRange && isSameDay(date, activeRange.from)
            const rangeEnd = inRange && activeRange && isSameDay(date, activeRange.to)
            return (
              <button
                key={date.toISOString()}
                type="button"
                role="gridcell"
                tabIndex={isSameDay(date, focused) ? 0 : -1}
                aria-selected={isSelected || undefined}
                aria-current={isSameDay(date, today) ? 'date' : undefined}
                aria-label={format(date, 'PPPP', { locale })}
                disabled={disabledDay}
                data-outside={outside || undefined}
                data-today={isSameDay(date, today) || undefined}
                data-selected={isSelected || undefined}
                data-in-range={(inRange && !isSelected) || undefined}
                data-range-start={rangeStart || undefined}
                data-range-end={rangeEnd || undefined}
                onClick={() => select(date)}
                onMouseEnter={() => setHovered(date)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setFocused(date)}
                className={cn(styles.day(), classNames?.day)}
              >
                {date.getDate()}
              </button>
            )
          })}
        </div>
      </div>

      {showToday || footer ? (
        <div className={cn(styles.footer(), classNames?.footer)}>
          {showToday ? (
            <button
              type="button"
              onClick={() => select(today)}
              className={cn(styles.titleButton(), 'text-primary')}
            >
              {texts.today}
            </button>
          ) : (
            <span />
          )}
          {footer}
        </div>
      ) : null}

      {picker === 'month' ? (
        <div
          role="dialog"
          aria-label={texts.selectMonth}
          className={cn(styles.picker(), classNames?.picker)}
        >
          <div className="grid flex-1 grid-cols-3 gap-1 p-1">
            {Array.from({ length: 12 }, (_, index) => {
              const date = new Date(month.getFullYear(), index, 1)
              return (
                <button
                  key={index}
                  type="button"
                  autoFocus={index === month.getMonth()}
                  data-selected={index === month.getMonth() || undefined}
                  onClick={() => {
                    goTo(date)
                    setPicker(null)
                  }}
                  className={cn(styles.pickerItem(), 'capitalize', classNames?.pickerItem)}
                >
                  {format(date, 'MMM', { locale })}
                </button>
              )
            })}
          </div>
        </div>
      ) : null}

      {picker === 'year' ? (
        <div
          role="dialog"
          aria-label={texts.selectYear}
          className={cn(styles.picker(), classNames?.picker)}
        >
          <ScrollArea
            className="flex-1"
            viewportRef={(node) =>
              node
                ?.querySelector<HTMLElement>('[data-selected]')
                ?.scrollIntoView({ block: 'center' })
            }
          >
            <div className="grid grid-cols-4 gap-1 p-1">
              {years.map((year) => (
                <button
                  key={year}
                  type="button"
                  autoFocus={year === month.getFullYear()}
                  data-selected={year === month.getFullYear() || undefined}
                  onClick={() => {
                    goTo(new Date(year, month.getMonth(), 1))
                    setPicker(null)
                  }}
                  className={cn(styles.pickerItem(), 'tabular-nums', classNames?.pickerItem)}
                >
                  {year}
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>
      ) : null}
    </div>
  )
}

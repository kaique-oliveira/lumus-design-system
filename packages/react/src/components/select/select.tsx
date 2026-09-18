import * as PopoverPrimitive from '@radix-ui/react-popover'
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { useControllableState } from '../../hooks/use-controllable-state'
import { useIsMobile } from '../../hooks/use-media-query'
import { useFieldId } from '../../hooks/use-id'
import { ArrowDown, Close, SearchNormal, Tick } from '../../internal/icons'
import { floatingSurface, popAnimation } from '../../styles/shared'
import { cn } from '../../utils/cn'
import { Dialog, DialogContent } from '../dialog/dialog'
import { Field, fieldCaptionId, type FieldClassNames, type FieldState } from '../field/field'
import { IconSlot, type IconProp } from '../icon-slot/icon-slot'
import { inputControlStyles } from '../text-input/text-input'
import { Spinner } from '../spinner/spinner'

export interface SelectOption<T extends string = string> {
  value: T
  label: string
  description?: string
  icon?: IconProp
  disabled?: boolean
  /** Agrupa opções sob um título. */
  group?: string
}

export interface SelectClassNames extends FieldClassNames {
  trigger?: string
  content?: string
  option?: string
  search?: string
}

export interface SelectProps<T extends string = string> extends Omit<
  ComponentProps<'button'>,
  'value' | 'defaultValue' | 'onChange'
> {
  options: SelectOption<T>[]
  value?: T | null
  defaultValue?: T | null
  onValueChange?: (value: T | null, option: SelectOption<T> | null) => void
  placeholder?: string
  label?: ReactNode
  labelAddon?: ReactNode
  caption?: ReactNode
  state?: FieldState
  size?: 'sm' | 'md' | 'lg'
  variant?: 'outline' | 'filled'
  /** Campo de busca dentro da lista. */
  searchable?: boolean
  searchPlaceholder?: string
  /** Filtro próprio. Padrão: label contém o texto, sem acento e sem caixa. */
  filter?: (option: SelectOption<T>, search: string) => boolean
  emptyText?: ReactNode
  /** Botão de limpar quando há valor. */
  clearable?: boolean
  clearLabel?: string
  loading?: boolean
  required?: boolean
  leftIcon?: IconProp
  /** Nome do input escondido, para formulário nativo. */
  name?: string
  /** Como cada opção aparece na lista. */
  renderOption?: (option: SelectOption<T>, selected: boolean) => ReactNode
  /** Como o valor escolhido aparece no gatilho. */
  renderValue?: (option: SelectOption<T>) => ReactNode
  /** No celular a lista abre como sheet. Padrão `true`. */
  sheetOnMobile?: boolean
  classNames?: SelectClassNames
  /** Classe do container do gatilho, o que tem a borda. */
  controlClassName?: string
}

function normalize(text: string) {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
}

/**
 * Lista de opções com busca, teclado e sheet no celular.
 * Genérico no tipo do valor: `Select<'a' | 'b'>` dá IntelliSense nos valores.
 */
export function Select<T extends string = string>({
  options,
  value: valueProp,
  defaultValue = null,
  onValueChange,
  placeholder = 'Selecione',
  label,
  labelAddon,
  caption,
  state = 'default',
  size = 'md',
  variant,
  searchable,
  searchPlaceholder = 'Buscar',
  filter,
  emptyText = 'Nada encontrado',
  clearable,
  clearLabel = 'Limpar',
  loading,
  required,
  leftIcon,
  name,
  renderOption,
  renderValue,
  sheetOnMobile = true,
  classNames,
  controlClassName,
  className,
  disabled,
  id: idProp,
  'aria-describedby': ariaDescribedBy,
  ...props
}: SelectProps<T>) {
  const id = useFieldId(idProp)
  const listId = useId()
  const isMobile = useIsMobile()
  const asSheet = isMobile && sheetOnMobile
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [active, setActive] = useState(0)
  const listRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const [value, setValue] = useControllableState<T | null>({
    value: valueProp,
    defaultValue,
    onChange: (next) =>
      onValueChange?.(next, options.find((option) => option.value === next) ?? null),
  })

  const selected = options.find((option) => option.value === value) ?? null

  const filtered = useMemo(() => {
    if (!search) return options
    const query = normalize(search)
    return options.filter((option) =>
      filter
        ? filter(option, search)
        : normalize(option.label).includes(query) ||
          normalize(option.description ?? '').includes(query),
    )
  }, [options, search, filter])

  const groups = useMemo(() => {
    const map = new Map<string | undefined, SelectOption<T>[]>()
    for (const option of filtered) {
      const list = map.get(option.group) ?? []
      list.push(option)
      map.set(option.group, list)
    }
    return Array.from(map.entries())
  }, [filtered])

  useEffect(() => {
    if (!open) {
      setSearch('')
      return
    }
    const index = filtered.findIndex((option) => option.value === value)
    setActive(index >= 0 ? index : filtered.findIndex((option) => !option.disabled))
  }, [open, filtered, value])

  useEffect(() => {
    const element = listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)
    element?.scrollIntoView({ block: 'nearest' })
  }, [active])

  function choose(option: SelectOption<T>) {
    if (option.disabled) return
    setValue(option.value)
    setOpen(false)
    triggerRef.current?.focus()
  }

  function move(delta: number) {
    if (filtered.length === 0) return
    let next = active
    for (let step = 0; step < filtered.length; step++) {
      next = (next + delta + filtered.length) % filtered.length
      if (!filtered[next]?.disabled) break
    }
    setActive(next)
  }

  function handleKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        if (!open) setOpen(true)
        else move(1)
        break
      case 'ArrowUp':
        event.preventDefault()
        if (!open) setOpen(true)
        else move(-1)
        break
      case 'Home':
        if (open) {
          event.preventDefault()
          setActive(filtered.findIndex((option) => !option.disabled))
        }
        break
      case 'End':
        if (open) {
          event.preventDefault()
          setActive(filtered.length - 1)
        }
        break
      case 'Enter':
      case ' ':
        if (event.key === ' ' && searchable && open) return
        event.preventDefault()
        if (!open) setOpen(true)
        else if (filtered[active]) choose(filtered[active])
        break
      case 'Escape':
        if (open) {
          event.preventDefault()
          setOpen(false)
        }
        break
      case 'Tab':
        setOpen(false)
        break
    }
  }

  const describedBy =
    [caption ? fieldCaptionId(id) : null, ariaDescribedBy].filter(Boolean).join(' ') || undefined
  const activeId = filtered[active] ? `${listId}-${active}` : undefined

  const trigger = (
    <button
      ref={triggerRef}
      id={id}
      type="button"
      role="combobox"
      aria-expanded={open}
      aria-controls={open ? listId : undefined}
      aria-haspopup="listbox"
      aria-activedescendant={open ? activeId : undefined}
      aria-invalid={state === 'error' || undefined}
      aria-describedby={describedBy}
      aria-required={required || undefined}
      disabled={disabled || loading}
      data-slot="select-trigger"
      data-state={open ? 'open' : 'closed'}
      data-placeholder={selected ? undefined : ''}
      onKeyDown={handleKeyDown}
      onClick={() => setOpen((current) => !current)}
      className={cn(
        inputControlStyles({ variant, size, state }),
        'focus-visible:border-primary focus-visible:ring-primary/20 cursor-pointer text-left focus-visible:ring-[3px]',
        'data-[state=open]:border-primary data-[state=open]:ring-primary/20 data-[state=open]:ring-[3px]',
        'disabled:cursor-not-allowed disabled:opacity-50',
        controlClassName,
        classNames?.trigger,
      )}
      {...props}
    >
      <IconSlot icon={leftIcon ?? selected?.icon} />
      <span className={cn('min-w-0 flex-1 truncate', !selected && 'text-foreground-muted')}>
        {selected ? (renderValue ? renderValue(selected) : selected.label) : placeholder}
      </span>
      {loading ? <Spinner size="sm" color="muted" /> : null}
      {clearable && selected && !disabled ? (
        <span
          role="button"
          tabIndex={-1}
          aria-label={clearLabel}
          onClick={(event) => {
            event.stopPropagation()
            setValue(null)
          }}
          className="press rounded-pill text-foreground-muted hover:bg-surface-muted hover:text-foreground -mr-1 inline-flex size-7 shrink-0 cursor-pointer items-center justify-center [&_[data-slot=icon]]:size-4"
        >
          <IconSlot icon={Close} />
        </span>
      ) : null}
      <IconSlot
        icon={ArrowDown}
        className={cn(
          'ease-spring transition-transform duration-(--lumus-duration-base)',
          open && 'rotate-180',
        )}
      />
    </button>
  )

  const list = (
    <div className="flex max-h-[inherit] min-h-0 flex-col">
      {searchable ? (
        <div
          className={cn(
            'border-border flex items-center gap-2 border-b px-3 py-2',
            classNames?.search,
          )}
        >
          <IconSlot icon={SearchNormal} className="text-foreground-muted size-4" />
          <input
            autoFocus={!asSheet}
            value={search}
            onChange={(event) => {
              setSearch(event.target.value)
              setActive(0)
            }}
            onKeyDown={handleKeyDown}
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
            aria-controls={listId}
            aria-activedescendant={activeId}
            className="placeholder:text-foreground-muted h-8 min-w-0 flex-1 bg-transparent text-sm outline-none"
          />
        </div>
      ) : null}
      <div
        ref={listRef}
        id={listId}
        role="listbox"
        aria-labelledby={label ? undefined : id}
        tabIndex={-1}
        className="scrollbar-soft min-h-0 flex-1 overflow-y-auto p-1.5"
      >
        {filtered.length === 0 ? (
          <div className="text-foreground-muted px-3 py-6 text-center text-sm">{emptyText}</div>
        ) : (
          groups.map(([group, items]) => (
            <div key={group ?? '__none'} role={group ? 'group' : undefined} aria-label={group}>
              {group ? (
                <div className="text-2xs text-foreground-muted px-2.5 pt-2 pb-1 font-semibold tracking-widest uppercase">
                  {group}
                </div>
              ) : null}
              {items.map((option) => {
                const index = filtered.indexOf(option)
                const isSelected = option.value === value
                const isActive = index === active
                return (
                  <div
                    key={option.value}
                    id={`${listId}-${index}`}
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={option.disabled || undefined}
                    data-index={index}
                    data-highlighted={isActive || undefined}
                    data-selected={isSelected || undefined}
                    onMouseMove={() => !option.disabled && setActive(index)}
                    onClick={() => choose(option)}
                    className={cn(
                      'rounded-item text-foreground flex cursor-pointer items-center gap-2.5 px-2.5 py-2 text-sm select-none',
                      'data-[highlighted]:bg-surface-muted aria-disabled:pointer-events-none aria-disabled:opacity-50',
                      asSheet && 'py-3',
                      '[&_[data-slot=icon]]:text-foreground-secondary [&_[data-slot=icon]]:size-[18px]',
                      classNames?.option,
                    )}
                  >
                    {renderOption ? (
                      renderOption(option, isSelected)
                    ) : (
                      <>
                        <IconSlot icon={option.icon} />
                        <span className="flex min-w-0 flex-1 flex-col">
                          <span className="truncate">{option.label}</span>
                          {option.description ? (
                            <span className="text-foreground-secondary truncate text-xs">
                              {option.description}
                            </span>
                          ) : null}
                        </span>
                        <IconSlot
                          icon={Tick}
                          className={cn(
                            'text-primary size-4 transition-opacity',
                            isSelected ? 'opacity-100' : 'opacity-0',
                          )}
                        />
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          ))
        )}
      </div>
    </div>
  )

  return (
    <Field
      id={id}
      label={label}
      labelAddon={labelAddon}
      caption={caption}
      state={state}
      required={required}
      disabled={disabled}
      size={size}
      classNames={classNames}
      className={className}
    >
      {name ? <input type="hidden" name={name} value={value ?? ''} /> : null}
      {asSheet ? (
        <>
          {trigger}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent
              title={typeof label === 'string' ? label : placeholder}
              bare
              size="sm"
              className={cn('max-sm:max-h-[80dvh]', classNames?.content)}
            >
              {list}
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
          <PopoverPrimitive.Anchor asChild>{trigger}</PopoverPrimitive.Anchor>
          <PopoverPrimitive.Portal>
            <PopoverPrimitive.Content
              align="start"
              sideOffset={6}
              collisionPadding={8}
              onOpenAutoFocus={(event) => event.preventDefault()}
              onCloseAutoFocus={(event) => event.preventDefault()}
              data-slot="select-content"
              className={cn(
                'rounded-inner z-50 max-h-[min(20rem,var(--radix-popover-content-available-height))] w-(--radix-popover-trigger-width) min-w-[10rem] overflow-hidden',
                floatingSurface,
                'origin-(--radix-popover-content-transform-origin)',
                popAnimation,
                classNames?.content,
              )}
            >
              {list}
            </PopoverPrimitive.Content>
          </PopoverPrimitive.Portal>
        </PopoverPrimitive.Root>
      )}
    </Field>
  )
}

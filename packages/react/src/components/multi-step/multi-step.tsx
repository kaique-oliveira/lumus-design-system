import type { ComponentProps, ReactNode } from 'react'
import { cn, tv, type VariantProps } from '../../utils/cn'

export const multiStepStyles = tv({
  slots: {
    root: 'flex w-full flex-col gap-2',
    label: 'px-1 text-xs text-foreground-secondary tabular-nums',
    track: 'flex w-full items-center gap-2',
    step: [
      'relative flex-1 overflow-hidden rounded-pill bg-border-strong',
      'after:absolute after:inset-0 after:origin-left after:scale-x-0 after:rounded-pill after:bg-primary',
      'after:transition-transform after:duration-(--lumus-duration-slow) after:ease-ios',
      'data-[done]:after:scale-x-100 data-[current]:after:scale-x-100',
    ],
    stepLabel:
      'mt-1 truncate text-2xs text-foreground-muted data-[current]:text-foreground data-[done]:text-foreground-secondary',
  },
  variants: {
    size: {
      sm: { step: 'h-1' },
      md: { step: 'h-1.5' },
      lg: { step: 'h-2' },
    },
    clickable: {
      true: { step: 'press-soft cursor-pointer' },
    },
  },
  defaultVariants: { size: 'md' },
})

export interface MultiStepProps
  extends Omit<ComponentProps<'div'>, 'children'>, VariantProps<typeof multiStepStyles> {
  /** Total de passos, ou o rótulo de cada um. */
  steps: number | string[]
  /** Passo atual, começando em 1. */
  current: number
  /** Quando existe, cada barra vira botão. */
  onStepClick?: (step: number) => void
  /** Texto do cabeçalho. Padrão "Passo X de Y". `null` esconde. */
  label?: ((current: number, total: number) => ReactNode) | null
  /** Só permite clicar nos passos já feitos. Padrão `true`. */
  onlyCompleted?: boolean
  classNames?: { root?: string; label?: string; track?: string; step?: string; stepLabel?: string }
}

export function MultiStep({
  steps,
  current,
  onStepClick,
  label = (step, total) => `Passo ${step} de ${total}`,
  onlyCompleted = true,
  size,
  classNames,
  className,
  ...props
}: MultiStepProps) {
  const total = typeof steps === 'number' ? steps : steps.length
  const labels = typeof steps === 'number' ? null : steps
  const styles = multiStepStyles({ size, clickable: Boolean(onStepClick) })

  return (
    <div
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={current}
      aria-valuetext={`Passo ${current} de ${total}`}
      data-slot="multi-step"
      className={cn(styles.root(), className, classNames?.root)}
      {...props}
    >
      {label ? (
        <span className={cn(styles.label(), classNames?.label)}>{label(current, total)}</span>
      ) : null}
      <div className={cn(styles.track(), classNames?.track)}>
        {Array.from({ length: total }, (_, index) => {
          const step = index + 1
          const done = step < current
          const isCurrent = step === current
          const disabled = !onStepClick || (onlyCompleted && step > current)
          const Element = onStepClick ? 'button' : 'div'
          return (
            <div key={step} className="flex min-w-0 flex-1 flex-col">
              <Element
                type={onStepClick ? 'button' : undefined}
                disabled={onStepClick ? disabled : undefined}
                aria-label={onStepClick ? (labels?.[index] ?? `Passo ${step}`) : undefined}
                aria-current={isCurrent ? 'step' : undefined}
                data-done={done || undefined}
                data-current={isCurrent || undefined}
                onClick={onStepClick ? () => onStepClick(step) : undefined}
                className={cn(
                  styles.step(),
                  disabled && onStepClick && 'cursor-default',
                  classNames?.step,
                )}
              />
              {labels ? (
                <span
                  data-done={done || undefined}
                  data-current={isCurrent || undefined}
                  className={cn(styles.stepLabel(), classNames?.stepLabel)}
                >
                  {labels[index]}
                </span>
              ) : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}

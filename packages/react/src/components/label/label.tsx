import * as LabelPrimitive from '@radix-ui/react-label'
import type { ComponentProps } from 'react'
import { tv, type VariantProps } from '../../utils/cn'

export const labelStyles = tv({
  base: 'inline-flex items-center gap-1 font-sans font-medium text-foreground select-none peer-disabled:opacity-50 peer-disabled:cursor-not-allowed',
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
    },
    disabled: {
      true: 'opacity-50 cursor-not-allowed',
    },
    secondary: {
      true: 'text-foreground-secondary font-regular',
    },
  },
  defaultVariants: {
    size: 'sm',
  },
})

export interface LabelProps
  extends ComponentProps<typeof LabelPrimitive.Root>, VariantProps<typeof labelStyles> {
  /** Mostra o asterisco de obrigatório. */
  required?: boolean
  /** Texto do asterisco para leitor de tela. Padrão "obrigatório". */
  requiredLabel?: string
}

export function Label({
  size,
  disabled,
  secondary,
  required,
  requiredLabel = 'obrigatório',
  className,
  children,
  ...props
}: LabelProps) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={labelStyles({ size, disabled, secondary, className })}
      {...props}
    >
      {children}
      {required ? (
        <span aria-label={requiredLabel} className="text-danger">
          *
        </span>
      ) : null}
    </LabelPrimitive.Root>
  )
}

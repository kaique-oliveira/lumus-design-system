import { forwardRef, type ReactNode, type SVGProps } from 'react'

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height' | 'ref'> {
  /** Largura e altura. Aceita número em pixels ou qualquer unidade CSS. Padrão `1em`, para seguir a fonte. */
  size?: number | string
  /** Espessura do traço. Padrão 1.5, o mesmo do desenho original. */
  strokeWidth?: number | string
  /** Texto lido por leitor de tela. Sem ele o ícone é decorativo e fica escondido. */
  title?: string
}

export interface IconDefinition {
  name: string
  viewBox: string
  children: ReactNode
}

export type IconComponent = ReturnType<typeof createIcon>

export function createIcon({ name, viewBox, children }: IconDefinition) {
  const Icon = forwardRef<SVGSVGElement, IconProps>(function Icon(
    { size = '1em', strokeWidth = 1.5, title, className, ...props },
    ref,
  ) {
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox}
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden={title ? undefined : true}
        role={title ? 'img' : undefined}
        focusable="false"
        data-icon={name}
        className={className}
        {...props}
      >
        {title ? <title>{title}</title> : null}
        {children}
      </svg>
    )
  })
  Icon.displayName = name
  return Icon
}

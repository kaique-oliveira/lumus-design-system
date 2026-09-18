import { isValidElement, type ComponentProps, type ReactNode } from 'react'
import { cn } from '../../utils/cn'
import { useIconRegistry, type IconComponent, type IconName } from '../../store/icon-registry'

/**
 * O que toda prop `icon` da lib aceita:
 * um elemento pronto de qualquer lib (`<Home />`), o componente em si (`Home`),
 * ou o nome de um ícone registrado com `registerIcons`.
 */
export type IconProp = Exclude<ReactNode, string> | IconComponent | IconName

export interface IconSlotProps extends Omit<ComponentProps<'span'>, 'children'> {
  icon?: IconProp | null
  /** Classe de tamanho, por exemplo `size-4`. O svg dentro ocupa todo o espaço. */
  className?: string
}

function isComponent(value: unknown): value is IconComponent {
  if (typeof value === 'function') return true
  return typeof value === 'object' && value !== null && '$$typeof' in value && !('props' in value)
}

function RegisteredIcon({ name }: { name: string }) {
  const Component = useIconRegistry((state) => state.icons[name])
  if (!Component) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        `[lumus] ícone "${name}" não registrado. Use registerIcons({ ${name}: Componente }).`,
      )
    }
    return null
  }
  return <Component />
}

export function resolveIcon(icon: IconProp | null | undefined): ReactNode {
  if (icon === null || icon === undefined || icon === false || icon === true) return null
  if (typeof icon === 'string') return <RegisteredIcon name={icon} />
  if (isValidElement(icon)) return icon
  if (isComponent(icon)) {
    const Component = icon
    return <Component />
  }
  return icon
}

/**
 * Caixa que normaliza qualquer ícone: força o svg a ocupar o tamanho da caixa,
 * herda a cor do texto e fica escondido de leitor de tela.
 */
export function IconSlot({ icon, className, ...props }: IconSlotProps) {
  const content = resolveIcon(icon)
  if (content === null) return null
  return (
    <span
      aria-hidden="true"
      data-slot="icon"
      className={cn(
        'inline-flex shrink-0 items-center justify-center leading-none [&>svg]:size-full [&>svg]:shrink-0',
        className,
      )}
      {...props}
    >
      {content}
    </span>
  )
}

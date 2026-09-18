import { useEffect } from 'react'
import { Moon, Sun } from '../../internal/icons'
import { useTheme } from '../../store/theme-store'
import { Switch, type SwitchProps } from '../switch/switch'
import type { IconProp } from '../icon-slot/icon-slot'

export interface ThemeSwitchProps extends Omit<
  SwitchProps,
  'checked' | 'defaultChecked' | 'onCheckedChange' | 'icon' | 'checkedIcon'
> {
  lightIcon?: IconProp
  darkIcon?: IconProp
}

/**
 * Liga e desliga o tema escuro. Guarda a escolha no navegador e aplica
 * `data-theme` no `<html>`. Basta montar, sem provider.
 */
export function ThemeSwitch({
  lightIcon = Sun,
  darkIcon = Moon,
  color = 'neutral',
  'aria-label': ariaLabel = 'Tema escuro',
  ...props
}: ThemeSwitchProps) {
  const { resolved, setTheme, theme } = useTheme()

  useEffect(() => {
    setTheme(theme)
    // Só na montagem, para sincronizar o atributo do documento com o que está salvo.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Switch
      aria-label={ariaLabel}
      checked={resolved === 'dark'}
      onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
      icon={lightIcon}
      checkedIcon={darkIcon}
      color={color}
      {...props}
    />
  )
}

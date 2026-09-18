import type { Decorator, Preview } from '@storybook/react-vite'
import { Confirmer, Toaster, useThemeStore } from '@lumus-ui/react'
import { useEffect, type ReactNode } from 'react'
import './preview.css'

function Providers({ theme, children }: { theme?: 'light' | 'dark'; children: ReactNode }) {
  useEffect(() => {
    useThemeStore.getState().setTheme(theme ?? 'light')
  }, [theme])
  return (
    <div className="bg-background text-foreground min-h-[200px] p-6 font-sans">
      {children}
      <Toaster />
      <Confirmer />
    </div>
  )
}

const withProviders: Decorator = (Story, context) => (
  <Providers theme={context.globals.theme as 'light' | 'dark' | undefined}>
    <Story />
  </Providers>
)

const preview: Preview = {
  decorators: [withProviders],
  globalTypes: {
    theme: {
      description: 'Tema',
      toolbar: {
        title: 'Tema',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Claro' },
          { value: 'dark', title: 'Escuro' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'light' },
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
    controls: { expanded: true, matchers: { color: /(background|color)$/i, date: /Date$/i } },
    options: {
      storySort: {
        order: [
          'Introdução',
          'Tokens',
          'Base',
          'Formulário',
          'Dados',
          'Feedback',
          'Overlay',
          'Navegação',
        ],
      },
    },
  },
}

export default preview

import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Add, ArrowRight, Trash } from '@lumus-ui/icons'
import { Button, IconButton, type ButtonProps } from '@lumus-ui/react'

const meta = {
  title: 'Base/Button',
  component: Button,
  args: { children: 'Enviar', onClick: fn() },
  argTypes: {
    variant: { control: 'inline-radio', options: ['solid', 'soft', 'outline', 'ghost', 'link'] },
    color: {
      control: 'inline-radio',
      options: ['primary', 'neutral', 'success', 'warning', 'danger'],
    },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Padrao: Story = {}

export const Variantes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {(['primary', 'neutral', 'success', 'warning', 'danger'] as const).map((color) => (
        <div key={color} className="flex flex-wrap items-center gap-3">
          {(['solid', 'soft', 'outline', 'ghost', 'link'] as const).map((variant) => (
            <Button key={variant} {...args} color={color} variant={variant}>
              {variant}
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),
}

export const Tamanhos: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} size="sm" leftIcon={Add}>
        Pequeno
      </Button>
      <Button {...args} size="md" leftIcon={Add}>
        Médio
      </Button>
      <Button {...args} size="lg" leftIcon={Add}>
        Grande
      </Button>
    </div>
  ),
}

export const ComIcone: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} leftIcon={Add}>
        Adicionar
      </Button>
      <Button {...args} rightIcon={ArrowRight} variant="soft">
        Continuar
      </Button>
      <Button {...args} leftIcon={<Trash />} color="danger" variant="outline">
        Apagar
      </Button>
      <IconButton icon={Add} aria-label="Adicionar" />
      <IconButton icon={Add} aria-label="Adicionar" variant="soft" color="neutral" />
      <IconButton icon={Add} aria-label="Adicionar" variant="ghost" size="sm" />
    </div>
  ),
}

export const Estados: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args}>Normal</Button>
      <Button {...args} disabled>
        Desabilitado
      </Button>
      <Button {...args} loading>
        Carregando
      </Button>
      <Button {...args} loading loadingText="Enviando">
        Enviar
      </Button>
      <Button {...args} fullWidth>
        Largura total
      </Button>
    </div>
  ),
}

export const ComoLink: Story = {
  render: (args: ButtonProps) => (
    <Button {...args} asChild variant="soft">
      <a href="https://github.com/kaique-oliveira/lumus-design-system">Abrir repositório</a>
    </Button>
  ),
}

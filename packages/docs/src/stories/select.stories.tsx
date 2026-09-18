import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Flag1, Home2, User } from '@lumus-ui/icons'
import { Select, type SelectOption } from '@lumus-ui/react'

const cidades: SelectOption[] = [
  { value: 'sp', label: 'São Paulo', description: 'SP', group: 'Sudeste' },
  { value: 'rj', label: 'Rio de Janeiro', description: 'RJ', group: 'Sudeste' },
  { value: 'bh', label: 'Belo Horizonte', description: 'MG', group: 'Sudeste' },
  { value: 'cwb', label: 'Curitiba', description: 'PR', group: 'Sul' },
  { value: 'poa', label: 'Porto Alegre', description: 'RS', group: 'Sul' },
  { value: 'ssa', label: 'Salvador', description: 'BA', group: 'Nordeste', disabled: true },
  { value: 'rec', label: 'Recife', description: 'PE', group: 'Nordeste' },
]

const meta = {
  title: 'Formulário/Select',
  component: Select,
  args: { label: 'Cidade', options: cidades, placeholder: 'Escolha uma cidade' },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Padrao: Story = {}

export const ComBusca: Story = {
  args: { searchable: true, clearable: true, caption: 'Digite para filtrar' },
}

function SelectControlado() {
  const [value, setValue] = useState<string | null>('rj')
  return (
    <div className="flex flex-col gap-4">
      <Select
        label="Cidade"
        options={cidades}
        value={value}
        onValueChange={setValue}
        searchable
        clearable
      />
      <span className="text-foreground-secondary text-sm">Valor: {value ?? 'nenhum'}</span>
    </div>
  )
}

export const Controlado: Story = { render: () => <SelectControlado /> }

export const Variacoes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Select {...args} size="sm" label="Pequeno" />
      <Select {...args} size="lg" label="Grande" variant="filled" />
      <Select {...args} state="error" caption="Escolha uma cidade" required />
      <Select {...args} disabled defaultValue="sp" />
      <Select {...args} loading />
      <Select
        label="Com ícones"
        placeholder="Tipo"
        options={[
          { value: 'home', label: 'Casa', icon: Home2 },
          { value: 'user', label: 'Pessoa', icon: User },
          { value: 'flag', label: 'Marco', icon: Flag1 },
        ]}
      />
    </div>
  ),
}

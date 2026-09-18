import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { SearchNormal, User } from '@lumus-ui/icons'
import { TextInput } from '@lumus-ui/react'

const meta = {
  title: 'Formulário/TextInput',
  component: TextInput,
  args: { label: 'Nome', placeholder: 'Digite seu nome' },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    variant: { control: 'inline-radio', options: ['outline', 'filled'] },
    state: { control: 'inline-radio', options: ['default', 'error', 'success', 'warning'] },
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TextInput>

export default meta
type Story = StoryObj<typeof meta>

export const Padrao: Story = {}

export const Estados: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <TextInput {...args} caption="Como está no documento" />
      <TextInput {...args} state="error" caption="Campo obrigatório" required />
      <TextInput {...args} state="success" caption="Disponível" defaultValue="kaique" />
      <TextInput {...args} state="warning" caption="Confira antes de salvar" />
      <TextInput {...args} disabled defaultValue="Desabilitado" />
      <TextInput {...args} readOnly defaultValue="Somente leitura" />
      <TextInput {...args} loading defaultValue="Verificando" />
    </div>
  ),
}

export const Tamanhos: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <TextInput {...args} size="sm" label="Pequeno" />
      <TextInput {...args} size="md" label="Médio" />
      <TextInput {...args} size="lg" label="Grande" />
      <TextInput {...args} variant="filled" label="Preenchido" />
    </div>
  ),
}

export const ComExtras: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <TextInput
        label="Buscar"
        placeholder="Buscar"
        leftIcon={SearchNormal}
        clearable
        defaultValue="lumus"
      />
      <TextInput label="Usuário" placeholder="seu-nome" prefix="@" rightIcon={User} />
      <TextInput label="Preço" placeholder="0,00" prefix="R$" mask="currency" inputMode="numeric" />
      <TextInput label="Site" placeholder="meusite" suffix=".com.br" />
      <TextInput
        label="Senha"
        type="password"
        placeholder="Sua senha"
        labelAddon={
          <a className="text-primary text-xs" href="#">
            esqueci
          </a>
        }
      />
      <TextInput
        label="Com ação"
        placeholder="Digite e confirme"
        action={{ icon: SearchNormal, label: 'Buscar', onClick: () => alert('buscar') }}
      />
    </div>
  ),
}

function Mascaras() {
  const [cpf, setCpf] = useState('')
  const [raw, setRaw] = useState('')
  return (
    <div className="flex flex-col gap-4">
      <TextInput
        label="CPF"
        mask="cpf"
        placeholder="000.000.000-00"
        value={cpf}
        onValueChange={(value, rawValue) => {
          setCpf(value)
          setRaw(rawValue)
        }}
        caption={raw ? `Sem máscara: ${raw}` : undefined}
      />
      <TextInput label="CNPJ" mask="cnpj" placeholder="00.000.000/0000-00" />
      <TextInput label="Telefone" mask="phone" placeholder="(00) 00000-0000" />
      <TextInput label="CEP" mask="cep" placeholder="00000-000" />
      <TextInput label="Data" mask="date" placeholder="dd/mm/aaaa" />
      <TextInput label="Placa" mask="AAA-9999" placeholder="ABC-1234" />
    </div>
  )
}

export const ComMascara: Story = { render: () => <Mascaras /> }

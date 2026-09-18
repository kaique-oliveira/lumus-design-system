import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Checkbox, RadioGroup, RadioItem, Switch, ThemeSwitch } from '@lumus-ui/react'

const meta = {
  title: 'Formulário/Seleção',
  component: Checkbox,
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

function Indeterminado() {
  const [items, setItems] = useState([true, false, true])
  const all = items.every(Boolean)
  const some = items.some(Boolean)
  return (
    <div className="flex flex-col gap-3">
      <Checkbox
        label="Todos"
        checked={all ? true : some ? 'indeterminate' : false}
        onCheckedChange={(checked) => setItems(items.map(() => checked === true))}
      />
      <div className="ml-7 flex flex-col gap-2">
        {items.map((checked, index) => (
          <Checkbox
            key={index}
            label={`Item ${index + 1}`}
            checked={checked}
            onCheckedChange={(next) =>
              setItems(items.map((item, i) => (i === index ? next === true : item)))
            }
          />
        ))}
      </div>
    </div>
  )
}

export const Checkboxes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox label="Aceito os termos" description="Você pode mudar isso depois" defaultChecked />
      <Checkbox label="Pequeno" size="sm" />
      <Checkbox label="Grande" size="lg" color="success" />
      <Checkbox label="Desabilitado" disabled defaultChecked />
      <Checkbox label="Label à esquerda" labelPosition="left" />
      <Indeterminado />
    </div>
  ),
}

export const Switches: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Switch label="Notificações" description="Receber por e-mail" defaultChecked />
      <Switch label="Pequeno" size="sm" />
      <Switch label="Grande, roxo" size="lg" color="primary" defaultChecked />
      <Switch label="Carregando" loading />
      <Switch label="Desabilitado" disabled />
      <ThemeSwitch label="Tema escuro" />
    </div>
  ),
}

export const Radios: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <RadioGroup
        label="Plano"
        description="Cobrado por mês"
        defaultValue="pro"
        options={[
          { value: 'free', label: 'Grátis', description: 'Para testar' },
          { value: 'pro', label: 'Pro', description: 'R$ 29,90 por mês' },
          { value: 'team', label: 'Time', disabled: true },
        ]}
      />
      <RadioGroup label="Horizontal" orientation="horizontal" size="sm" defaultValue="a">
        <RadioItem value="a">Opção A</RadioItem>
        <RadioItem value="b">Opção B</RadioItem>
        <RadioItem value="c">Opção C</RadioItem>
      </RadioGroup>
    </div>
  ),
}

import type { Meta, StoryObj } from '@storybook/react-vite'
import { TextArea } from '@lumus-ui/react'

const meta = {
  title: 'Formulário/TextArea',
  component: TextArea,
  args: { label: 'Mensagem', placeholder: 'Escreva aqui' },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TextArea>

export default meta
type Story = StoryObj<typeof meta>

export const Padrao: Story = {}

export const Variacoes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <TextArea {...args} autoResize maxRows={6} caption="Cresce com o texto" />
      <TextArea {...args} showCount maxLength={140} />
      <TextArea {...args} state="error" caption="Conte um pouco mais" />
      <TextArea {...args} variant="filled" size="lg" />
      <TextArea {...args} disabled defaultValue="Desabilitado" />
    </div>
  ),
}

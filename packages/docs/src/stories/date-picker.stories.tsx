import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Calendar, DatePicker, type DateRange } from '@lumus-ui/react'

const meta = {
  title: 'Formulário/Data',
  component: DatePicker,
  args: { label: 'Data de nascimento' },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Padrao: Story = {}

export const SemDigitar: Story = { args: { allowTyping: false, caption: 'Só pelo calendário' } }

export const ComLimites: Story = {
  args: {
    label: 'Entrega',
    calendarProps: {
      min: new Date(),
      max: new Date(Date.now() + 30 * 86_400_000),
      showToday: true,
    },
    caption: 'Só os próximos 30 dias',
  },
}

function Intervalo() {
  const [range, setRange] = useState<DateRange>({ from: null, to: null })
  return (
    <div className="flex flex-col gap-3">
      <Calendar mode="range" value={range} onValueChange={setRange} showToday />
      <span className="text-foreground-secondary text-sm">
        {range.from?.toLocaleDateString() ?? '...'} até {range.to?.toLocaleDateString() ?? '...'}
      </span>
    </div>
  )
}

export const CalendarioIntervalo: Story = { render: () => <Intervalo /> }

export const CalendarioTamanhos: Story = {
  render: () => (
    <div className="flex flex-wrap items-start gap-6">
      <Calendar size="sm" defaultValue={new Date()} />
      <Calendar
        size="lg"
        defaultValue={new Date()}
        disabled={(date) => date.getDay() === 0 || date.getDay() === 6}
      />
    </div>
  ),
}

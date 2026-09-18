import type { Meta, StoryObj } from '@storybook/react-vite'
import { Add, SearchNormal } from '@lumus-ui/icons'
import {
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogTrigger,
  Heading,
  IconButton,
  Select,
  Text,
  TextInput,
} from '@lumus-ui/react'

const meta = {
  title: 'Base/Responsivo',
  component: Card,
  parameters: { viewport: { defaultViewport: 'mobile1' } },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

/** Abra no viewport de celular: o dialog e o select viram sheet. */
export const Celular: Story = {
  render: () => (
    <div className="flex max-w-sm flex-col gap-4">
      <div className="flex items-center justify-between">
        <Heading level={2}>Gravações</Heading>
        <IconButton icon={Add} aria-label="Nova" variant="soft" color="neutral" />
      </div>
      <TextInput placeholder="Buscar" leftIcon={SearchNormal} clearable />
      <Select
        label="Ordenar"
        options={[
          { value: 'recentes', label: 'Mais recentes' },
          { value: 'antigas', label: 'Mais antigas' },
          { value: 'nome', label: 'Por nome' },
        ]}
        defaultValue="recentes"
      />
      <Card>
        <Heading level={4}>Reunião de segunda</Heading>
        <Text color="secondary" size="xs">
          seg 16 de set, 09:30
        </Text>
      </Card>
      <Dialog>
        <DialogTrigger asChild>
          <Button fullWidth size="lg">
            Abrir sheet
          </Button>
        </DialogTrigger>
        <DialogContent
          title="Nova gravação"
          description="Escolha um nome"
          footer={<Button fullWidth>Começar</Button>}
        >
          <TextInput label="Nome" placeholder="Reunião" />
        </DialogContent>
      </Dialog>
    </div>
  ),
}

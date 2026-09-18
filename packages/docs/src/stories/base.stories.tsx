import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import {
  Box,
  Button,
  Card,
  Heading,
  Label,
  LoadingOverlay,
  MultiStep,
  ScrollArea,
  Separator,
  Spinner,
  Text,
} from '@lumus-ui/react'

const meta = {
  title: 'Base/Blocos',
  component: Box,
} satisfies Meta<typeof Box>

export default meta
type Story = StoryObj<typeof meta>

export const Texto: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-3">
      <Heading level={1}>Título nível 1</Heading>
      <Heading level={2}>Título nível 2</Heading>
      <Heading level={3}>Título nível 3</Heading>
      <Text size="base">Parágrafo base, com a fonte Poppins.</Text>
      <Text color="secondary">Texto secundário para informação de apoio.</Text>
      <Text size="xs" color="muted">
        Metadado em texto pequeno e apagado.
      </Text>
      <Text uppercase size="2xs" weight="semibold" color="muted">
        Rótulo de seção
      </Text>
      <Text truncate={2}>
        Texto longo que corta em duas linhas. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam.
      </Text>
      <Text tabular weight="medium">
        R$ 1.234,56
      </Text>
      <Text color="danger" as="span">
        Erro em linha
      </Text>
      <Label required>Label com obrigatório</Label>
    </div>
  ),
}

export const Cards: Story = {
  render: () => (
    <div className="grid max-w-2xl gap-4 sm:grid-cols-2">
      <Card>
        <Heading level={4}>Card padrão</Heading>
        <Text color="secondary">Superfície branca, 24px de canto e sombra discreta.</Text>
      </Card>
      <Card shadow="floating" interactive>
        <Heading level={4}>Card clicável</Heading>
        <Text color="secondary">Com `interactive`, ganha feedback de toque.</Text>
      </Card>
      <Box variant="muted" radius="inner" padding="md">
        <Text>Box com fundo apagado e canto de 16px.</Text>
      </Box>
      <Box variant="outline" radius="surface" padding="lg">
        <Text>Box com borda em vez de sombra.</Text>
      </Box>
    </div>
  ),
}

function Carregando() {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Spinner size="xs" />
        <Spinner size="sm" color="primary" />
        <Spinner size="md" color="primary" />
        <Spinner size="lg" color="muted" />
        <Spinner size={48} color="primary" thickness={2} />
      </div>
      <Card className="relative min-h-40">
        <Heading level={4}>Área com overlay</Heading>
        <Button
          size="sm"
          variant="soft"
          onClick={() => {
            setOpen(true)
            setTimeout(() => setOpen(false), 2000)
          }}
        >
          Carregar 2s
        </Button>
        <LoadingOverlay open={open} text="Buscando dados" />
      </Card>
    </div>
  )
}

export const Spinners: Story = { render: () => <Carregando /> }

export const Separadores: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-4">
      <Text>Acima</Text>
      <Separator />
      <Text>Com texto no meio</Text>
      <Separator spacing="sm">ou</Separator>
      <Separator strong />
      <div className="flex h-10 items-center gap-4">
        <Text>Esquerda</Text>
        <Separator orientation="vertical" />
        <Text>Direita</Text>
      </div>
    </div>
  ),
}

export const Rolagem: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      <ScrollArea
        maxHeight={200}
        className="rounded-inner border-border bg-surface w-64 border p-3"
      >
        {Array.from({ length: 30 }, (_, i) => (
          <Text key={i} className="py-1">
            Linha {i + 1}
          </Text>
        ))}
      </ScrollArea>
      <ScrollArea
        orientation="horizontal"
        className="rounded-inner border-border bg-surface w-64 border p-3"
      >
        <div className="flex w-[800px] gap-2">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className="rounded-inner bg-primary-soft h-16 w-16 shrink-0" />
          ))}
        </div>
      </ScrollArea>
    </div>
  ),
}

function Passos() {
  const [step, setStep] = useState(2)
  return (
    <div className="flex max-w-md flex-col gap-6">
      <MultiStep steps={4} current={step} />
      <MultiStep
        steps={['Conta', 'Endereço', 'Pagamento', 'Revisão']}
        current={step}
        onStepClick={setStep}
        size="lg"
      />
      <div className="flex gap-2">
        <Button variant="soft" size="sm" onClick={() => setStep(Math.max(1, step - 1))}>
          Voltar
        </Button>
        <Button size="sm" onClick={() => setStep(Math.min(4, step + 1))}>
          Avançar
        </Button>
      </div>
    </div>
  )
}

export const PassoAPasso: Story = { render: () => <Passos /> }

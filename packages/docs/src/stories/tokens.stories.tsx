import type { Meta, StoryObj } from '@storybook/react-vite'
import { colors, duration, easing, fontSize, radius, shadows } from '@lumus-ui/tokens'
import { Box, Button, Text } from '@lumus-ui/react'

const meta = {
  title: 'Tokens/Tokens',
  component: Box,
} satisfies Meta<typeof Box>

export default meta
type Story = StoryObj<typeof meta>

export const Cores: Story = {
  render: () => (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-3">
      {Object.keys(colors.light).map((name) => (
        <div key={name} className="flex flex-col gap-1.5">
          <div className={`rounded-inner border-border h-14 border bg-${name}`} />
          <Text size="xs" weight="medium">
            {name}
          </Text>
          <Text size="2xs" color="muted" tabular>
            {colors.light[name as keyof typeof colors.light]} /{' '}
            {colors.dark[name as keyof typeof colors.dark]}
          </Text>
        </div>
      ))}
    </div>
  ),
}

export const Raio: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-6">
      {Object.entries(radius).map(([name, value]) => (
        <div key={name} className="flex flex-col items-center gap-2">
          <div className="bg-primary-soft size-20" style={{ borderRadius: value }} />
          <Text size="xs" weight="medium">
            rounded-{name}
          </Text>
          <Text size="2xs" color="muted">
            {value}
          </Text>
        </div>
      ))}
    </div>
  ),
}

export const Sombras: Story = {
  render: () => (
    <div className="flex flex-wrap gap-8 p-4">
      {Object.keys(shadows.light).map((name) => (
        <div key={name} className="flex flex-col items-center gap-3">
          <div className={`rounded-surface bg-surface size-28 shadow-${name}`} />
          <Text size="xs" weight="medium">
            shadow-{name}
          </Text>
        </div>
      ))}
    </div>
  ),
}

export const Tipografia: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      {Object.entries(fontSize).map(([name, value]) => (
        <div key={name} className="flex items-baseline gap-4">
          <Text size="2xs" color="muted" className="w-12 shrink-0">
            {name}
          </Text>
          <span style={{ fontSize: value.size, lineHeight: value.lineHeight }}>
            A rápida raposa marrom
          </span>
          <Text size="2xs" color="muted" tabular>
            {value.size}
          </Text>
        </div>
      ))}
    </div>
  ),
}

export const Movimento: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {Object.keys(easing).map((name) => (
        <div key={name} className="flex items-center gap-4">
          <Text size="xs" weight="medium" className="w-32 shrink-0">
            ease-{name}
          </Text>
          <div className="group rounded-pill bg-surface-muted relative h-10 flex-1">
            <div
              className={`rounded-pill bg-primary absolute top-1 left-1 size-8 transition-transform ease-${name} group-hover:translate-x-[calc(100cqw-2.25rem)]`}
              style={{
                transitionDuration: `${name.startsWith('spring') ? duration[name as 'spring'] : duration.slow}ms`,
              }}
            />
          </div>
        </div>
      ))}
      <Text size="xs" color="muted">
        Passe o mouse na barra. Botões usam `press`, que encolhe rápido e volta com mola:
      </Text>
      <div>
        <Button>Pressione</Button>
      </div>
    </div>
  ),
}

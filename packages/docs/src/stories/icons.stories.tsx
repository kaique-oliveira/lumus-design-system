import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Icon, iconNames, icons, type IconName } from '@lumus-ui/icons'
import { Button, Card, Text, TextInput, toast } from '@lumus-ui/react'

const meta = {
  title: 'Tokens/Ícones',
  component: Icon,
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj

function GaleriaIcones() {
  const [search, setSearch] = useState('')
  const [size, setSize] = useState(24)
  const list = iconNames.filter((name) => name.includes(search.toLowerCase().replace(/\s+/g, '_')))
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-end gap-3">
        <TextInput
          label="Buscar"
          placeholder="wallet, arrow, user"
          value={search}
          onValueChange={setSearch}
          clearable
          className="max-w-xs"
          size="sm"
        />
        <div className="flex gap-1">
          {[18, 24, 32].map((value) => (
            <Button
              key={value}
              size="sm"
              variant={size === value ? 'solid' : 'soft'}
              color="neutral"
              onClick={() => setSize(value)}
            >
              {value}px
            </Button>
          ))}
        </div>
        <Text color="secondary" size="xs">
          {list.length} de {iconNames.length}. Clique para copiar o import.
        </Text>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(110px,1fr))] gap-2">
        {list.map((name) => {
          const Component = icons[name as IconName]
          const importName = Component.displayName
          return (
            <Card
              key={name}
              padding="sm"
              interactive
              className="flex flex-col items-center gap-2 text-center"
              onClick={() => {
                navigator.clipboard?.writeText(`import { ${pascal(name)} } from '@lumus-ui/icons'`)
                toast.success(`${pascal(name)} copiado`)
              }}
            >
              <Icon name={name} size={size} className="text-foreground" title={importName} />
              <span className="text-2xs text-foreground-secondary w-full truncate">{name}</span>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

function pascal(name: string) {
  return name
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}

export const Galeria: Story = { render: () => <GaleriaIcones /> }

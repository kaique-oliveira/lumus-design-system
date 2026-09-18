import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Flag1, Verify, Tag as TagIcon } from '@lumus-ui/icons'
import { Avatar, AvatarGroup, Tag, TagGroup } from '@lumus-ui/react'

const meta = {
  title: 'Base/Tag e Avatar',
  component: Tag,
} satisfies Meta<typeof Tag>

export default meta
type Story = StoryObj<typeof meta>

export const Tags: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(['soft', 'solid', 'outline'] as const).map((variant) => (
        <div key={variant} className="flex flex-wrap gap-2">
          {(['neutral', 'primary', 'success', 'warning', 'danger', 'info'] as const).map(
            (color) => (
              <Tag key={color} variant={variant} color={color} dot={variant === 'soft'}>
                {color}
              </Tag>
            ),
          )}
        </div>
      ))}
      <div className="flex flex-wrap items-center gap-2">
        <Tag size="sm" icon={TagIcon}>
          Pequena
        </Tag>
        <Tag size="md" icon={Verify} color="warning">
          Média
        </Tag>
        <Tag size="lg" icon={Flag1} color="primary" variant="solid">
          Grande
        </Tag>
        <Tag onRemove={() => alert('removida')} color="primary">
          Removível
        </Tag>
      </div>
    </div>
  ),
}

function Selecionaveis() {
  const [one, setOne] = useState('todos')
  const [many, setMany] = useState<string[]>(['react'])
  const [alone, setAlone] = useState(false)
  return (
    <div className="flex flex-col gap-6">
      <TagGroup aria-label="Filtro" value={one} onValueChange={setOne}>
        <Tag value="todos">Todos</Tag>
        <Tag value="ativos">Ativos</Tag>
        <Tag value="arquivados">Arquivados</Tag>
      </TagGroup>
      <TagGroup
        type="multiple"
        aria-label="Interesses"
        value={many}
        onValueChange={setMany}
        color="success"
        size="sm"
      >
        <Tag value="react">React</Tag>
        <Tag value="node">Node</Tag>
        <Tag value="design">Design</Tag>
        <Tag value="mobile" disabled>
          Mobile
        </Tag>
      </TagGroup>
      <Tag selected={alone} onSelectedChange={setAlone} icon={Verify} color="warning">
        {alone ? 'Favorito' : 'Favoritar'}
      </Tag>
    </div>
  )
}

export const TagsSelecionaveis: Story = { render: () => <Selecionaveis /> }

export const Avatares: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end gap-4">
        <Avatar size="xs" name="Kaique Oliveira" />
        <Avatar size="sm" name="Kaique Oliveira" src="https://i.pravatar.cc/100?img=12" />
        <Avatar size="md" name="Ana Souza" status="online" />
        <Avatar size="lg" src="https://i.pravatar.cc/200?img=32" name="Marina" status="busy" />
        <Avatar
          size="xl"
          shape="square"
          ring
          src="https://i.pravatar.cc/200?img=5"
          name="Lucas"
          status="away"
        />
        <Avatar size={72} />
        <Avatar size="md" src="https://exemplo.invalido/foto.png" name="Falha Carregar" />
      </div>
      <AvatarGroup max={3} size="md">
        <Avatar name="Ana" src="https://i.pravatar.cc/100?img=1" />
        <Avatar name="Bruno" src="https://i.pravatar.cc/100?img=2" />
        <Avatar name="Carla" src="https://i.pravatar.cc/100?img=3" />
        <Avatar name="Daniel" />
        <Avatar name="Elisa" />
      </AvatarGroup>
    </div>
  ),
}

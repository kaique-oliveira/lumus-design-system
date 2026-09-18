import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Add, Edit2, Trash } from '@lumus-ui/icons'
import { Avatar, Button, DataTable, Tag, toast, type DataTableColumn } from '@lumus-ui/react'

type Pessoa = {
  id: string
  nome: string
  email: string
  cargo: string
  status: 'ativo' | 'pausado' | 'saiu'
  desde: string
}

const nomes = [
  'Ana Souza',
  'Bruno Lima',
  'Carla Dias',
  'Daniel Rocha',
  'Elisa Prado',
  'Fábio Nunes',
  'Gabi Torres',
  'Heitor Melo',
  'Iara Costa',
  'João Alves',
  'Karen Reis',
  'Léo Pires',
  'Maya Cruz',
  'Nina Braga',
  'Otto Sales',
  'Paula Xavier',
  'Quim Sá',
  'Rita Luz',
  'Saulo Vaz',
  'Tainá Góis',
  'Ulisses Bento',
  'Vera Lins',
  'Wagner Faro',
  'Yara Neri',
]
const cargos = ['Design', 'Engenharia', 'Produto', 'Vendas', 'Suporte']
const status: Pessoa['status'][] = ['ativo', 'ativo', 'pausado', 'saiu']

const pessoas: Pessoa[] = nomes.map((nome, i) => ({
  id: String(i + 1),
  nome,
  email: `${nome.split(' ')[0]!.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')}@exemplo.com`,
  cargo: cargos[i % cargos.length]!,
  status: status[i % status.length]!,
  desde: `2024-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 27) + 1).padStart(2, '0')}`,
}))

const statusColor = { ativo: 'success', pausado: 'warning', saiu: 'neutral' } as const

const columns: DataTableColumn<Pessoa>[] = [
  {
    accessorKey: 'nome',
    header: 'Nome',
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar name={row.original.nome} size="sm" />
        <div className="flex flex-col">
          <span className="font-medium">{row.original.nome}</span>
          <span className="text-foreground-secondary text-xs">{row.original.email}</span>
        </div>
      </div>
    ),
  },
  { accessorKey: 'cargo', header: 'Área' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => {
      const value = getValue<Pessoa['status']>()
      return (
        <Tag size="sm" dot color={statusColor[value]}>
          {value}
        </Tag>
      )
    },
  },
  {
    accessorKey: 'desde',
    header: 'Desde',
    cell: ({ getValue }) => new Date(getValue<string>()).toLocaleDateString('pt-BR'),
  },
]

const meta = {
  title: 'Dados/DataTable',
  component: DataTable,
} satisfies Meta<typeof DataTable>

export default meta
type Story = StoryObj

export const Completa: Story = {
  render: () => (
    <DataTable
      title="Pessoas"
      columns={columns}
      data={pessoas}
      getRowId={(row) => row.id}
      selectable
      pageSize={8}
      toolbar={
        <Button size="sm" leftIcon={Add}>
          Nova pessoa
        </Button>
      }
      rowActions={(row) => [
        { label: 'Editar', icon: Edit2, onSelect: () => toast(`Editar ${row.nome}`) },
        {
          label: 'Apagar',
          icon: Trash,
          destructive: true,
          separatorBefore: true,
          onSelect: () => toast.error(`Apagar ${row.nome}`),
        },
      ]}
      onRowClick={(row) => toast(row.nome)}
    />
  ),
}

export const Simples: Story = {
  render: () => (
    <DataTable
      columns={columns}
      data={pessoas.slice(0, 5)}
      searchable={false}
      pageSize={false}
      density="compact"
    />
  ),
}

export const Estados: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <DataTable columns={columns} data={[]} loading title="Carregando" />
      <DataTable
        columns={columns}
        data={[]}
        title="Vazia"
        emptyState="Nenhuma pessoa cadastrada ainda."
      />
    </div>
  ),
}

function Servidor() {
  const [page, setPage] = useState({ pageIndex: 0, pageSize: 5 })
  const [search, setSearch] = useState('')
  const filtered = pessoas.filter((p) => p.nome.toLowerCase().includes(search.toLowerCase()))
  const slice = filtered.slice(page.pageIndex * page.pageSize, (page.pageIndex + 1) * page.pageSize)
  return (
    <DataTable
      title="Paginação no servidor (simulada)"
      columns={columns}
      data={slice}
      getRowId={(row) => row.id}
      search={search}
      onSearchChange={(next) => {
        setSearch(next)
        setPage({ ...page, pageIndex: 0 })
      }}
      pagination={page}
      onPaginationChange={(updater) =>
        setPage(typeof updater === 'function' ? updater(page) : updater)
      }
      pageCount={Math.ceil(filtered.length / page.pageSize)}
      totalItems={filtered.length}
      stickyFirstColumn
    />
  )
}

export const PaginacaoServidor: Story = { render: () => <Servidor /> }

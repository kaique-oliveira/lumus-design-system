import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Add, Edit2, Setting, Trash, User } from '@lumus-ui/icons'
import {
  Button,
  confirm,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItems,
  ContextMenuTrigger,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  TextInput,
  toast,
  Tooltip,
  type MenuAction,
} from '@lumus-ui/react'

const meta = {
  title: 'Overlay/Overlays',
  component: Dialog,
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Tooltips: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Tooltip content="Adicionar item">
        <IconButton icon={Add} aria-label="Adicionar" variant="soft" color="neutral" />
      </Tooltip>
      <Tooltip content="Embaixo" side="bottom">
        <Button variant="outline">Embaixo</Button>
      </Tooltip>
      <Tooltip
        content="Um texto mais longo que quebra em mais de uma linha para mostrar o limite de largura"
        side="right"
      >
        <Button variant="ghost">Direita</Button>
      </Tooltip>
    </div>
  ),
}

export const Popovers: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="soft">Simples</Button>
        </PopoverTrigger>
        <PopoverContent withArrow>
          <Text>Conteúdo do popover.</Text>
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button>Com título</Button>
        </PopoverTrigger>
        <PopoverContent title="Filtros" description="Refine a lista" width={320}>
          <div className="flex flex-col gap-3">
            <TextInput label="Nome" placeholder="Buscar" size="sm" />
            <Button size="sm" fullWidth>
              Aplicar
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  ),
}

function Dialogos() {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Abrir dialog</Button>
        </DialogTrigger>
        <DialogContent
          title="Editar perfil"
          description="Mude seus dados e salve."
          footer={
            <>
              <DialogClose asChild>
                <Button variant="soft" color="neutral">
                  Cancelar
                </Button>
              </DialogClose>
              <Button onClick={() => toast.success('Perfil salvo')}>Salvar</Button>
            </>
          }
        >
          <div className="flex flex-col gap-4">
            <TextInput label="Nome" defaultValue="Kaique" />
            <TextInput label="E-mail" defaultValue="kaique@exemplo.com" type="email" />
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={open} onOpenChange={setOpen}>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Controlado, grande
        </Button>
        <DialogContent title="Termos de uso" size="lg" sheetOnMobile={false}>
          {Array.from({ length: 12 }, (_, i) => (
            <Text key={i} className="mb-3" color="secondary">
              Parágrafo {i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore.
            </Text>
          ))}
        </DialogContent>
      </Dialog>
      <Button
        color="danger"
        variant="soft"
        onClick={async () => {
          const ok = await confirm({
            title: 'Apagar conta?',
            description: 'Todos os dados somem e não dá para desfazer.',
            variant: 'danger',
            confirmLabel: 'Apagar',
          })
          toast(ok ? { variant: 'success', description: 'Apagado' } : 'Cancelado')
        }}
      >
        Confirmar destrutivo
      </Button>
      <Button
        variant="soft"
        onClick={async () => {
          await confirm({
            description: 'Enviar o relatório agora?',
            onConfirm: () => new Promise((resolve) => setTimeout(resolve, 1200)),
          })
        }}
      >
        Confirmar com espera
      </Button>
    </div>
  )
}

export const Dialogs: Story = { render: () => <Dialogos /> }

export const Toasts: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="soft" color="neutral" onClick={() => toast('Mensagem simples')}>
        Info
      </Button>
      <Button
        variant="soft"
        color="success"
        onClick={() =>
          toast.success({ title: 'Salvo', description: 'Suas mudanças foram gravadas.' })
        }
      >
        Sucesso
      </Button>
      <Button
        variant="soft"
        color="warning"
        onClick={() =>
          toast.warning({
            title: 'Atenção',
            description: 'Sessão expira em 5 minutos.',
            duration: 0,
          })
        }
      >
        Aviso fixo
      </Button>
      <Button
        variant="soft"
        color="danger"
        onClick={() =>
          toast.error({
            title: 'Falhou',
            description: 'Não deu para salvar.',
            action: { label: 'Tentar de novo', onClick: () => toast.success('Agora foi') },
          })
        }
      >
        Erro com ação
      </Button>
      <Button
        variant="soft"
        onClick={() =>
          toast.promise(new Promise((resolve) => setTimeout(resolve, 1500)), {
            loading: 'Enviando',
            success: 'Enviado',
            error: 'Falhou',
          })
        }
      >
        Promise
      </Button>
      <Button variant="ghost" onClick={() => toast.dismiss()}>
        Fechar todas
      </Button>
    </div>
  ),
}

const acoes: MenuAction[] = [
  { label: 'Editar', icon: Edit2, shortcut: '⌘E', onSelect: () => toast('Editar') },
  { label: 'Duplicar', icon: Add, onSelect: () => toast('Duplicar') },
  {
    label: 'Compartilhar',
    icon: User,
    children: [
      { label: 'Por link', onSelect: () => toast('Link') },
      { label: 'Por e-mail', onSelect: () => toast('E-mail') },
    ],
  },
  {
    label: 'Apagar',
    icon: Trash,
    destructive: true,
    separatorBefore: true,
    onSelect: () => toast.error('Apagado'),
  },
]

function Menus() {
  const [notify, setNotify] = useState(true)
  return (
    <div className="flex flex-wrap items-center gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="soft" leftIcon={Setting}>
            Menu
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Conta</DropdownMenuLabel>
          <DropdownMenuItem icon={User}>Perfil</DropdownMenuItem>
          <DropdownMenuCheckboxItem checked={notify} onCheckedChange={setNotify}>
            Notificações
          </DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem icon={Trash} destructive>
            Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Por lista</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem icon={Edit2}>Item declarado</DropdownMenuItem>
          {/* Os mesmos itens do menu de contexto abaixo. */}
          <DropdownMenuSeparator />
          <DropdownMenuItem icon={Trash} destructive>
            Apagar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <div className="rounded-surface border-border-strong text-foreground-secondary flex h-32 w-64 items-center justify-center border border-dashed text-sm">
            Clique com o botão direito
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItems items={acoes} />
        </ContextMenuContent>
      </ContextMenu>
    </div>
  )
}

export const MenusStory: Story = { name: 'Menus', render: () => <Menus /> }

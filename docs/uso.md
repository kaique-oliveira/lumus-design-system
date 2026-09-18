# Como usar

## Instalar

```bash
pnpm add @lumus-ui/react @lumus-ui/icons
```

Peer dependencies: `react` e `react-dom` 19, `tailwindcss` 4.

## CSS

No arquivo CSS principal do projeto:

```css
@import 'tailwindcss';
@import '@lumus-ui/react/theme.css';
```

O `theme.css` traz os tokens (cores, raio, sombra, fonte, mola), o tema escuro,
os utilitários `animate-in`, `animate-out`, `press`, `scrollbar-soft` e o
`@source` que faz o Tailwind do projeto enxergar as classes dos componentes.

A fonte padrão é Poppins. Carregue no `index.html` ou troque com:

```css
@theme {
  --font-sans: Inter, sans-serif;
}
```

Fundo e texto da página:

```html
<body class="bg-background text-foreground"></body>
```

## Raiz da aplicação

```tsx
import { Confirmer, Toaster } from '@lumus-ui/react'

export function App() {
  return (
    <>
      <Rotas />
      <Toaster position="bottom-right" />
      <Confirmer />
    </>
  )
}
```

## Notificação e confirmação de qualquer lugar

```ts
import { confirm, toast } from '@lumus-ui/react'

toast.success('Salvo')
toast.error({
  title: 'Falhou',
  description: 'Tente de novo',
  action: { label: 'Tentar', onClick: retry },
})
await toast.promise(salvar(), { loading: 'Salvando', success: 'Salvo', error: 'Falhou' })

if (
  await confirm({ title: 'Apagar item?', description: 'Não dá para desfazer', variant: 'danger' })
) {
  apagar()
}
```

## Ícones

Toda prop `icon`, `leftIcon`, `rightIcon` aceita:

```tsx
import { Home } from 'lucide-react'
import { Add } from '@lumus-ui/icons'

<Button leftIcon={<Home />} />   // elemento de qualquer lib
<Button leftIcon={Add} />        // o componente
<Button leftIcon="home" />       // nome registrado
```

Registro por nome, uma vez na raiz:

```ts
import { registerIcons } from '@lumus-ui/react'
import { icons } from '@lumus-ui/icons'
import { Home } from 'lucide-react'

registerIcons({ ...icons, home: Home })
```

IntelliSense nos nomes:

```ts
declare module '@lumus-ui/react' {
  interface IconRegistry {
    home: true
  }
}
```

## Estilizar

Todo componente aceita `className` na raiz, e os compostos aceitam `classNames`
com uma classe por parte:

```tsx
<TextInput
  className="max-w-xs"
  classNames={{ label: 'text-primary', input: 'font-mono', caption: 'italic' }}
/>
```

Os estilos de cada componente estão exportados (`buttonStyles`, `inputControlStyles`,
`tagStyles`) para montar variações próprias com o mesmo visual:

```tsx
import { buttonStyles, cn } from '@lumus-ui/react'

;<a className={cn(buttonStyles({ variant: 'soft', size: 'sm' }), 'no-underline')} href="/">
  Início
</a>
```

## Tema escuro

```tsx
import { ThemeSwitch, useTheme } from '@lumus-ui/react'

;<ThemeSwitch label="Tema escuro" />

const { theme, resolved, setTheme } = useTheme()
setTheme('system')
```

## Tabela

```tsx
import { DataTable, createColumnHelper, type DataTableColumn } from '@lumus-ui/react'

type Pessoa = { id: string; nome: string; email: string }

const columns: DataTableColumn<Pessoa>[] = [
  { accessorKey: 'nome', header: 'Nome' },
  { accessorKey: 'email', header: 'E-mail' },
]

<DataTable
  columns={columns}
  data={pessoas}
  getRowId={(row) => row.id}
  selectable
  rowActions={(row) => [
    { label: 'Editar', onSelect: () => editar(row) },
    { label: 'Apagar', destructive: true, onSelect: () => apagar(row) },
  ]}
/>
```

## Desenvolver a lib

```bash
pnpm install
pnpm build
pnpm dev          # storybook em http://localhost:6007
pnpm check        # typecheck, lint e testes
pnpm sem-travessao
```

Ícone novo: salve o SVG em `packages/icons/svg/nome_do_icone.svg` e rode
`pnpm --filter @lumus-ui/icons generate`.

Token novo: edite `packages/tokens/src/*.ts` e rode `pnpm --filter @lumus-ui/tokens build`.

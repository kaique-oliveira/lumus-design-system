# Decisões da versão 2

Registro de cada escolha feita na migração de 2026-09-17, com o motivo e como mudar.
A sessão de perguntas foi respondida com "siga todas as sugestões", então cada
item abaixo é a opção que estava recomendada.

## Como o Tailwind sai da lib

Os componentes carregam classes Tailwind. Quem usa precisa ter Tailwind v4 e
importar `@lumus-ui/react/theme.css`, que já aponta `@source` para o pacote.
Não existe CSS pré-compilado.

Motivo: é o único jeito de `className` de fora sobrescrever qualquer estilo com
`tailwind-merge`, e todos os projetos web do Kaique já usam Tailwind v4.

Para mudar: gerar um CSS com `@tailwindcss/cli` a partir de `dist/index.mjs` no
build do pacote e expor em `exports["./styles.css"]`.

## Regra do raio

Controle é pílula (`rounded-pill`): botão, campo, tag, switch, avatar, dia do
calendário. Superfície tem 24px (`rounded-surface`): card, modal, popover,
notificação, tabela. Peça dentro de peça usa `rounded-inner` (16px) ou
`rounded-item` (12px) para as curvas ficarem paralelas. Área de texto usa
`rounded-field` (20px), porque pílula em bloco alto vira oval.

Para mudar: os valores estão em `packages/tokens/src/radius.ts`.

## Motor de animação

CSS puro. As curvas de mola são geradas em `packages/tokens/src/spring.ts`, que
converte `response` e `dampingFraction` do iOS em uma função `linear()`. A
saída dos overlays é cuidada pelo Radix, que mantém o elemento montado até a
animação terminar. Não há `motion` nem outra biblioteca de animação.

O que não cobre: arrastar para fechar sheet. Se precisar, entra `motion` só no
`DialogContent`.

## Primitivos sem estilo

Radix UI, o mesmo da versão 1. Base UI ainda estava em release candidate.

## Ícones

Três decisões:

1. `@lumus-ui/icons` virou pacote próprio, gerado por script a partir de
   `packages/icons/svg/*.svg`. Um componente por ícone, `currentColor`, prop
   `size`, tree-shakeable. Para incluir um ícone novo, salve o SVG na pasta e
   rode `pnpm generate`.
2. Toda prop `icon` aceita elemento pronto de qualquer lib, o componente em si,
   ou o nome de um ícone registrado com `registerIcons`. O `IconSlot` força o
   svg a ocupar a caixa e herdar a cor, então lucide, phosphor, iconsax e
   react-icons ficam iguais.
3. O pacote `react` não carrega nenhum ícone por nome, para não levar os 229
   para o bundle de quem usa um botão. Os poucos que a lib usa por dentro são
   importados um a um em `packages/react/src/internal/icons.ts`.

## Quebra de API

Versão `2.0.0`, sem compatibilidade com a 1.x. Renomes:

| Antes                                 | Depois                                                  |
| ------------------------------------- | ------------------------------------------------------- |
| `keyId`                               | `id`, opcional, gerado quando falta                     |
| `prefixo`                             | `prefix`                                                |
| `sizeText`                            | `size`                                                  |
| `onChangeValue(value)`                | `onChange` nativo mais `onValueChange(value, rawValue)` |
| `ScroolArea`                          | `ScrollArea`                                            |
| `Spinner` e `LoadSpinner`             | `Spinner` inline e `LoadingOverlay`                     |
| `Modal`                               | `Dialog` composto                                       |
| `Dialog` mais `useDialog`             | `confirm()` mais `<Confirmer />`                        |
| `Notification` mais `useNotification` | `toast()` mais `<Toaster />`                            |
| `DropDown`                            | `Select`                                                |
| `ContextMenu` mais `useContextMenu`   | `ContextMenu` e `DropdownMenu` compostos                |
| `SwitchTheme`                         | `ThemeSwitch` mais `useTheme`                           |
| `Tag` com `keyName`                   | `Tag` e `TagGroup`                                      |
| `Icons.nome`                          | `import { Nome } from '@lumus-ui/icons'`                |

## Estado com Zustand

Quatro stores: tema, notificações, confirmação e registro de ícones. Todas
chamáveis fora de React (`toast.success('...')` em interceptor do axios, por
exemplo). Os três Providers da versão 1 saíram. Só é preciso montar `<Toaster />`
e `<Confirmer />` uma vez.

O menu de contexto imperativo (`showContextMenu`) não voltou. Menu por linha de
tabela é `DropdownMenu` e clique com o botão direito é `ContextMenu`, os dois
declarativos, com teclado e foco cuidados pelo Radix.

## Tema escuro

Incluído. Os tokens viram CSS vars `--lumus-*` em `:root` e `[data-theme="dark"]`,
mapeadas em `@theme inline` do Tailwind. Sem `data-theme`, segue a preferência
do sistema. `useTheme` e `ThemeSwitch` gravam a escolha em `localStorage`.

## Cor de destaque

Roxo `#5938CF` continua como `primary`. O preto `#1A1A1A` da skill soft-ios-design
entrou como `neutral`, disponível em botão, tag, checkbox e switch com
`color="neutral"`.

## Escopo de componentes

Só os 27 da versão 1, corrigidos. Nenhuma peça nova. Sheet, SegmentedControl,
Badge, Skeleton, Tabs e Select múltiplo ficam para a próxima rodada.

Mudança de rota durante a migração: `Tag` ganhou `TagGroup`, `Avatar` ganhou
`AvatarGroup`, `Text` ganhou `Heading`, `Box` ganhou `Card`, `Button` ganhou
`IconButton`, `Field` ficou público. São desdobramentos das peças existentes, não
peças novas.

## Responsividade de overlay

Abaixo de 640px: `Dialog`, `Confirmer` e `Select` viram sheet subindo de baixo.
`DropdownMenu`, `ContextMenu`, `Popover` e `Tooltip` continuam flutuando perto do
gatilho, como o iOS faz com menu de contexto. `DataTable` rola na horizontal, com
`stickyFirstColumn` opcional.

Diferença em relação ao que foi sugerido na rodada de perguntas: menu não vira
sheet. O Radix posiciona o menu com estilo inline e não dá para forçar o sheet
sem perder teclado e foco.

## Testes

Vitest mais Testing Library. Há teste em máscaras, stores e no `IconSlot`.
Teste de acessibilidade por componente com axe ficou para depois: precisa do
`axe-core` rodando sobre cada story, o que é melhor fazer com o addon de
acessibilidade do Storybook, já ligado.

## Ferramentas

- pnpm 10 com `save-exact`, turbo 2, TypeScript 6.0.3.
- TypeScript 7.0.2 é a versão mais nova mas é a compilação nativa, sem a API de
  compilador em JavaScript. `typescript-eslint` e a geração de `.d.ts` do tsdown
  precisam dela. Fixado em 6.0.3 por `pnpm.overrides`, como no template-monorepo.
- Build com tsdown, sucessor do tsup. Saída `.mjs` e `.cjs` com `.d.mts` e `.d.cts`.
- Storybook 10 com `react-vite`, addon de docs e de acessibilidade, Tailwind
  pelo plugin do Vite.
- ESLint 10 flat config na raiz, prettier com plugin do Tailwind.
- `tailwind-variants` para variantes, com `tailwind-merge` configurado para os
  tokens da lib em `packages/react/src/utils/cn.ts`.
- `date-fns` 4 no calendário, locale `ptBR` por padrão.
- `@tanstack/react-table` 9 na tabela, com os recursos ligados em
  `dataTableFeatures`.
- React 19 como peer: `ref` é prop comum, sem `forwardRef`.

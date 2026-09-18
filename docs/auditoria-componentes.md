# Auditoria dos componentes

Estado do repositório em 2026-09-17, antes da migração para Tailwind. Serve de base para
decidir o que muda em cada componente.

Critérios avaliados em cada peça: genérico, estilizável por quem usa, tipagem com
IntelliSense, exposição das funções nativas do elemento, variações e estados visuais,
micro interações e animações de entrada e saída no padrão iOS, responsividade,
desempenho, estabilidade, segurança e estado.

## Resumo

Nenhum componente passa em todos os critérios. Os problemas se repetem, então a lista
abaixo agrupa por tema e depois aponta o que é específico de cada peça.

### Estilo

- Tudo em Stitches, biblioteca arquivada e sem suporte oficial ao React 18 e 19.
- Quase nenhum componente aceita `className`. Quem usa não consegue ajustar margem,
  largura ou cor sem sobrescrever CSS por fora.
- Cores de ícone são forçadas por seletor `svg path { stroke }`, o que impede trocar o
  ícone por qualquer outro que use `fill` ou `currentColor`.
- Raio de borda varia entre 4px, 6px, 8px, 10px, 12px, 14px, 16px, 24px e 9999px, sem
  regra. O token `radii.px` vale 8px, nome que não diz nada.
- `Label/styles.ts` importa `styled` direto de `@stitches/react`, fora do tema. Os tokens
  `$default` e `$text300` não resolvem nesse arquivo.
- `background: "pink"` esquecido no fundo de `Modal` e `Dialog`, sobrescrito na linha
  seguinte.
- `overflowX: "none"` não existe em CSS. `height: "4  0px"` no `Spinner` grande.
- Tema escuro não existe. `SwitchTheme` usa `$dark_gray300` e `$light_gray400`, tokens que
  não estão em `@lumus-ui/tokens`.

### Tipagem

- `Function` como tipo em `Dialog.callback`, `TextInput.onActionClick`,
  `YearList.onSelectedYear` e `OptionsOfActionType.action`. Sem IntelliSense de argumento
  nem de retorno.
- `keyId` obrigatório em vez do `id` nativo. `prefixo` e `valor` em português, misturados
  com o resto em inglês. `optionProps` em minúscula. `ScroolArea` com erro de grafia.
- `children: ReactElement` em `Modal`, `Popover`, `Tooltip` e `ScroolArea`. Recusa string,
  número, array e fragmento. O certo é `ReactNode`.
- `Modal` não exporta a interface de props. `Text` não tem `as`, peso nem cor. `Box` é só
  uma `div` com padding fixo.
- Sem `forwardRef` em `Box`, `Text`, `Label`, `TextInput`, `Checkbox`, `Switch`,
  `RadioGroup`, `Avatar`, `Tag`, `DropDown`, `DatePicker`, `Calendar`, `Modal`. Formulário
  com React Hook Form não consegue focar o campo com erro.
- `DataTable` monta `row[header.key] as string` sem checar o tipo. Objeto ou data quebra a
  renderização.

### Variações e estados

- `Button` tem uma altura só (38px) e três variantes. Falta tamanho, `loading`,
  `destructive`, `ghost`, ícone sozinho com formato redondo, `fullWidth`.
- `TextInput` e `TextArea` não têm tamanho, estado de erro na borda (só na legenda),
  `loading`, botão de limpar, contador de caracteres, ação à direita tipada.
- `Checkbox` não tem estado indeterminado nem tamanho. `Switch` não tem tamanho.
- `Avatar` não tem tamanho nomeado, iniciais no fallback, indicador de status, grupo.
- `Tag` é só selecionável. Não tem variante de cor, remoção, tamanho, somente leitura.
- `Notification` mostra uma por vez, sem fila, sem ação, sem fechar à mão, sem posição.
- `Dialog` tem texto fixo "Atenção", "Sim" e "Não". Não dá para trocar rótulo, tipo
  destrutivo, nem título.
- `Spinner` e `LoadSpinner` são o mesmo componente duplicado, e os dois cobrem a tela
  inteira. Não existe spinner inline para botão ou card.
- `Separator` tem duas variantes com CSS idêntico.
- `MultiStep` só mostra barra. Sem rótulo por passo, sem clique, sem estado de concluído.

### Funções nativas expostas

- `TextInput` aceita `...props` do input, mas `onChange` é substituído por `onChangeValue`
  e o `maxLength` é escrito à força no ref. Passar `onChange` de fora não funciona.
- `Tag`, `DropDown` e `DatePicker` não aceitam nada do elemento nativo: sem `name`,
  `disabled`, `required`, `onBlur`, `aria-*`.
- `Calendar` e `DatePicker` não aceitam `value` controlado, `minDate`, `maxDate`, locale,
  dias desabilitados nem formato.
- `DropDown` tem o rótulo "Ingredientes" fixo no código e não aceita valor inicial.
- `DataTable` tem o título "Usuários" fixo, ordenação não existe, paginação é só local,
  sem seleção de linha, sem coluna customizada, sem estado vazio e sem carregamento.

### Micro interações e animações

- Entrada e saída são feitas com `useTimeoutEffect` mais três `useState` por overlay. O
  hook guarda o `timeoutId` em variável comum, recriada a cada render, então o cancelamento
  que ele devolve nunca cancela nada e a lista de dependências não inclui `effect`.
- Nenhum feedback de toque: botão, tag e linha de tabela não encolhem ao pressionar. iOS
  reduz a escala e usa mola na volta.
- Overlays deslizam 100px de baixo com `ease` linear. iOS usa escala de 0,95 para 1 com
  mola e desfoque no fundo. Tooltip só muda opacidade.
- `Tooltip` espera 1 segundo para abrir. `Popover` fecha com atraso fixo de 200ms.
- `Notification` anima `bottom` de -150px, o que força layout a cada quadro. O certo é
  `transform`.
- Nada respeita `prefers-reduced-motion`.

### Responsividade

- Não existe um `@media` no pacote inteiro.
- `Modal` e `Dialog` têm 250px fixos. `Calendar` 220px. `DataTable` usa `max-content` e
  estoura a tela no celular.
- `Notification` fica presa à direita com 250px mínimos. `Popover` calcula a borda da
  tela, mas `Tooltip` ignora as laterais.
- `TextInput` usa `&:has()`, que não funciona em Firefox abaixo de 121 e Safari abaixo
  de 15.4.

### Acessibilidade

- `Button` faz `all: unset` e nunca redefine `outline`. Foco por teclado some.
- `Checkbox` define `&:focus` igual ao estado normal. `Switch` usa sombra preta de 2px.
- `Modal` e `Dialog` não têm `role="dialog"`, `aria-modal`, foco preso, fechar com Esc,
  trava de scroll nem portal. Ficam dentro da árvore onde foram chamados, então qualquer
  `overflow: hidden` ou `transform` de um pai quebra o `position: fixed`.
- `Tooltip` não tem `role="tooltip"` nem abre por foco de teclado.
- `DropDown` é uma `div` com `input type="checkbox"` escondido. `Tag` usa `input
type="radio"` escondido e marca `checked` à força. Nenhum dos dois navega por teclado.
- `Calendar` renderiza cada dia como `div` com `onClick`. Não há botão, `aria-selected`,
  nem setas.
- `DataTable` é feito de `div`, sem `table`, `th`, `scope` nem cabeçalho associado.

### Desempenho

- `assets/icons/index.tsx` tem 8.586 linhas e `colection-icons.tsx` 9.346. São objetos de
  elementos JSX já criados, não componentes. Vão inteiros para o bundle de quem importa
  um único botão, não aceitam `size` nem `color`, e os mesmos objetos são reaproveitados
  em vários lugares da árvore.
- `Button` converte o ícone com `useState` mais `useEffect`. Um render extra por botão
  em toda mudança de ícone.
- `Calendar` roda `generateCalendar` dentro de um `useEffect` e descarta o resultado, e
  roda de novo no render.
- `Tooltip` registra `resize` no `window` em cada instância, mesmo fechado, e usa `!` no
  ref dentro de `useLayoutEffect`.
- `Popover`, `DatePicker` e `DataTable` registram `mousedown` no `document` por instância.
- `phosphor-react` foi descontinuado em favor de `@phosphor-icons/react`.

### Estabilidade

- `DatePicker` chama `onSelectedDate` na montagem, antes de qualquer clique.
- `Notification` agenda `setTimeout` e nunca limpa. Uma notificação nova pode ser apagada
  pelo timer da anterior.
- `useContextMenu` tem `console.log` em produção e `objectId! ?? 0` no `ContextMenu`.
- `DataTable` fecha o menu em qualquer `mousedown`, dentro ou fora do menu, porque os dois
  ramos do `if` fazem a mesma coisa.
- `Calendar` usa `toLocaleString("default")` para o mês e nomes em português fixos para os
  dias. Em navegador em inglês o mês sai em inglês e os dias em português.
- `MultiStep` tem "Passo X de Y" fixo. `DataTable` tem "Exibindo X de Y" fixo.

### Segurança e empacotamento

- `react` está em `devDependencies`, não em `peerDependencies`. Quem instala pode acabar
  com duas cópias de React e hooks quebrados.
- `tsup` marca só `react` como externo. `react-dom` e os pacotes Radix entram no bundle.
- `package.json` não tem `exports`, `files`, `sideEffects` nem `peerDependencies`.
- CI roda em Node 18, que saiu de suporte em abril de 2025, com `actions/checkout@v3` e
  `setup-node@v3`, também antigos.
- Sem `dangerouslySetInnerHTML`, sem `eval`, sem leitura de URL. O risco real é só
  dependência antiga sem correção de segurança.
- `.DS_Store` versionado na raiz e em `packages/`.

### Estado

- Três contextos separados (`NotificationProvider`, `DialogProvider`,
  `ContextMenuProvider`), cada um obrigando a envolver a aplicação. Nenhum pode ser chamado
  fora de componente React (por exemplo em um interceptor do axios).
- Estado local de overlay repetido em `Dialog`, `Modal`, `Popover`, `DatePicker`,
  `DataTable`, `ContextMenu` e `DropDown`, sempre com a mesma máquina de três booleanos.

## Ficha por componente

| Componente   | Principais faltas                                                                    |
| ------------ | ------------------------------------------------------------------------------------ |
| Avatar       | tamanho nomeado, iniciais, status, `className`, ref                                  |
| Box          | é só `div` com padding. Precisa de `as`, `className`, variantes de superfície        |
| Button       | tamanho, `loading`, `destructive`, `ghost`, ícone redondo, foco, toque               |
| Calendar     | valor controlado, min e max, locale, teclado, `button` nos dias, animação            |
| Checkbox     | indeterminado, tamanho, foco, animação do check                                      |
| ContextMenu  | teclado, portal, posicionamento por colisão, fechar com Esc                          |
| DataTable    | `table` semântica, ordenação, seleção, vazio, carregando, responsivo                 |
| DatePicker   | controlado, formato, min e max, limpar, teclado, `onSelectedDate` na montagem        |
| Dialog       | textos configuráveis, tipo destrutivo, `role`, foco, Esc, portal                     |
| DropDown     | rótulo fixo, teclado, `name`, `disabled`, controlado, multi                          |
| Label        | fora do tema, `required` com asterisco, `disabled`                                   |
| LoadSpinner  | duplicado do Spinner, remover                                                        |
| Modal        | tamanhos, `ReactNode`, `role`, foco, Esc, scroll lock, portal, vira sheet no celular |
| MultiStep    | rótulo por passo, clique, concluído, texto fixo                                      |
| Notification | fila, posição, ação, fechar, pausa no hover, `transform`                             |
| Popover      | teclado, Esc, portal, colisão nas quatro bordas, gatilho customizável                |
| RadioGroup   | orientação, tamanho, descrição por opção, `disabled` por opção                       |
| ScroolArea   | nome, `ReactNode`, eixo horizontal, ref                                              |
| Separator    | variantes iguais, texto no meio, `role="separator"`                                  |
| Spinner      | inline, tamanhos por token, cor, `aria-busy`                                         |
| Switch       | tamanho, `loading`, foco, mola no polegar                                            |
| SwitchTheme  | tokens inexistentes, tema escuro não existe                                          |
| Tag          | cor, remoção, tamanho, teclado, `input` escondido                                    |
| Text         | `as`, peso, cor, alinhamento, truncar                                                |
| TextArea     | tamanho, erro na borda, contador, auto altura                                        |
| TextInput    | `onChange` nativo, tamanho, erro na borda, limpar, ação tipada, `&:has()`            |
| Tooltip      | `role`, foco, laterais, atraso configurável, seta por lado                           |

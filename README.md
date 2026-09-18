# Lumus Design System

Componentes React com Tailwind v4, no visual do iOS: superfície branca sobre fundo
cinza, pílula em todo controle, canto de 24px em toda superfície, sombra discreta
e mola nas transições.

Pacotes:

- `@lumus-ui/react`: os componentes.
- `@lumus-ui/icons`: 229 ícones como componentes.
- `@lumus-ui/tokens`: cores, raio, sombra, tipografia e movimento, em TypeScript e CSS.

Documentação:

- [Como usar](docs/uso.md)
- [Decisões da versão 2](docs/decisoes.md)
- [Auditoria que motivou a versão 2](docs/auditoria-componentes.md)
- Storybook: `pnpm dev`

## Componentes

Base: Box, Card, Text, Heading, Label, Button, IconButton, Spinner, LoadingOverlay, Separator, ScrollArea, Avatar, AvatarGroup, Tag, TagGroup, MultiStep.

Formulário: Field, TextInput, TextArea, Checkbox, Switch, RadioGroup, Select, Calendar, DatePicker, ThemeSwitch.

Dados: DataTable.

Overlay: Tooltip, Popover, Dialog, Confirmer, Toaster, DropdownMenu, ContextMenu.

Estado: `toast`, `confirm`, `useTheme`, `registerIcons`.

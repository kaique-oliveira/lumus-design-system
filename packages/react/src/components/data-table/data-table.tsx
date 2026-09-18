import {
  columnFilteringFeature,
  columnSizingFeature,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_includesString,
  flexRender,
  globalFilteringFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_basic,
  sortFn_datetime,
  sortFn_text,
  tableFeatures,
  useTable,
  type Cell,
  type ColumnDef,
  type Header,
  type OnChangeFn,
  type PaginationState,
  type Row,
  type RowData,
  type RowSelectionState,
  type SortingState,
  type Table as TableInstance,
} from '@tanstack/react-table'
import { useMemo, type ComponentProps, type ReactNode } from 'react'
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  MoreVertical,
  SearchNormal,
} from '../../internal/icons'
import { cn, tv, type VariantProps } from '../../utils/cn'
import { Button, IconButton } from '../button/button'
import { Checkbox } from '../checkbox/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItems,
  DropdownMenuTrigger,
  type MenuAction,
} from '../dropdown-menu/dropdown-menu'
import { IconSlot } from '../icon-slot/icon-slot'
import { Spinner } from '../spinner/spinner'
import { TextInput } from '../text-input/text-input'

export type {
  SortingState,
  PaginationState,
  RowSelectionState,
  RowData,
} from '@tanstack/react-table'
export { createColumnHelper } from '@tanstack/react-table'

/**
 * Recursos ligados na tabela. Quem precisar de mais (agrupamento, expansão,
 * redimensionar coluna) monta a própria instância com `useTable` do TanStack.
 */
export const dataTableFeatures = tableFeatures({
  columnFilteringFeature,
  columnSizingFeature,
  globalFilteringFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  filteredRowModel: createFilteredRowModel(),
  sortedRowModel: createSortedRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  filterFns: { includesString: filterFn_includesString },
  sortFns: {
    alphanumeric: sortFn_alphanumeric,
    basic: sortFn_basic,
    datetime: sortFn_datetime,
    text: sortFn_text,
  },
})

export type DataTableFeatures = typeof dataTableFeatures
export type DataTableColumn<T extends RowData, TValue = unknown> = ColumnDef<
  DataTableFeatures,
  T,
  TValue
>
export type DataTableRow<T extends RowData> = Row<DataTableFeatures, T>
export type DataTableInstance<T extends RowData> = TableInstance<DataTableFeatures, T>

export interface DataTableTexts {
  search: string
  empty: string
  loading: string
  showing: (from: number, to: number, total: number) => string
  previous: string
  next: string
  actions: string
  selectAll: string
  selectRow: string
  selected: (count: number) => string
}

const defaultTexts: DataTableTexts = {
  search: 'Buscar',
  empty: 'Nada por aqui',
  loading: 'Carregando',
  showing: (from, to, total) => `${from} a ${to} de ${total}`,
  previous: 'Anterior',
  next: 'Próxima',
  actions: 'Ações',
  selectAll: 'Selecionar tudo',
  selectRow: 'Selecionar linha',
  selected: (count) => `${count} selecionado${count === 1 ? '' : 's'}`,
}

export const dataTableStyles = tv({
  slots: {
    root: 'flex w-full min-w-0 flex-col gap-3',
    toolbar: 'flex flex-wrap items-center justify-between gap-3',
    scroller:
      'scrollbar-soft w-full overflow-x-auto rounded-surface border border-border bg-surface',
    table: 'w-full min-w-max border-separate border-spacing-0 text-sm',
    headerCell: [
      'group/th sticky top-0 z-10 whitespace-nowrap bg-surface-muted px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-foreground-secondary',
      'first:rounded-tl-surface last:rounded-tr-surface',
    ],
    sortButton:
      'press -mx-1 inline-flex cursor-pointer items-center gap-1 rounded-item px-1 py-0.5 hover:text-foreground [&_[data-slot=icon]]:size-3.5',
    row: 'group/row transition-colors data-[selected]:bg-primary-soft/40 data-[clickable]:cursor-pointer hover:bg-surface-muted/60',
    cell: 'border-b border-border px-4 py-3 align-middle text-foreground group-last/row:border-b-0',
    footer:
      'flex flex-wrap items-center justify-between gap-3 px-1 text-xs text-foreground-secondary',
    empty: 'px-4 py-12 text-center text-sm text-foreground-muted',
  },
  variants: {
    density: {
      compact: { cell: 'py-2', headerCell: 'py-2' },
      comfortable: {},
      spacious: { cell: 'py-4' },
    },
    stickyFirstColumn: {
      true: {
        headerCell: 'first:sticky first:left-0 first:z-20',
        cell: 'first:sticky first:left-0 first:z-[1] first:bg-surface group-hover/row:first:bg-surface-muted',
      },
    },
  },
  defaultVariants: { density: 'comfortable' },
})

export interface DataTableProps<T extends RowData>
  extends Omit<ComponentProps<'div'>, 'title'>, VariantProps<typeof dataTableStyles> {
  columns: DataTableColumn<T>[]
  data: T[]
  /** Chave estável de cada linha. Padrão: índice. */
  getRowId?: (row: T, index: number) => string
  title?: ReactNode
  /** Conteúdo à direita da busca, como botões de ação. */
  toolbar?: ReactNode
  searchable?: boolean
  /** Busca controlada. Com `onSearchChange` o filtro passa a ser seu, por exemplo no servidor. */
  search?: string
  onSearchChange?: (search: string) => void
  sortable?: boolean
  sorting?: SortingState
  onSortingChange?: OnChangeFn<SortingState>
  /** Ordenação feita fora, no servidor. */
  manualSorting?: boolean
  /** Linhas por página. `false` mostra tudo. */
  pageSize?: number | false
  pagination?: PaginationState
  onPaginationChange?: OnChangeFn<PaginationState>
  /** Total de páginas quando os dados vêm paginados do servidor. */
  pageCount?: number
  /** Total de itens no servidor, para o rodapé. */
  totalItems?: number
  selectable?: boolean
  rowSelection?: RowSelectionState
  onRowSelectionChange?: OnChangeFn<RowSelectionState>
  /** Menu de ações no fim de cada linha. */
  rowActions?: (row: T) => MenuAction[]
  onRowClick?: (row: T) => void
  loading?: boolean
  emptyState?: ReactNode
  texts?: Partial<DataTableTexts>
  /** Altura máxima da área que rola. O cabeçalho fica fixo. */
  maxHeight?: number | string
  classNames?: Partial<Record<keyof ReturnType<typeof dataTableStyles>, string>>
  /** Recebe a instância do TanStack Table para controle total. */
  onTableReady?: (table: DataTableInstance<T>) => void
}

/**
 * Tabela com busca, ordenação, paginação, seleção e ações por linha.
 * Genérica no tipo da linha. As colunas seguem o `ColumnDef` do TanStack Table.
 */
export function DataTable<T extends RowData>({
  columns,
  data,
  getRowId,
  title,
  toolbar,
  searchable = true,
  search,
  onSearchChange,
  sortable = true,
  sorting,
  onSortingChange,
  manualSorting,
  pageSize = 10,
  pagination,
  onPaginationChange,
  pageCount,
  totalItems,
  selectable,
  rowSelection,
  onRowSelectionChange,
  rowActions,
  onRowClick,
  loading,
  emptyState,
  texts: textsProp,
  maxHeight,
  density,
  stickyFirstColumn,
  classNames,
  className,
  onTableReady,
  ...props
}: DataTableProps<T>) {
  const texts = { ...defaultTexts, ...textsProp }
  const styles = dataTableStyles({ density, stickyFirstColumn })
  const manualSearch = onSearchChange !== undefined
  const manualPagination = pageCount !== undefined

  const allColumns = useMemo<DataTableColumn<T>[]>(() => {
    const list = [...columns]
    if (selectable) {
      list.unshift({
        id: '__select',
        enableSorting: false,
        enableGlobalFilter: false,
        size: 44,
        header: ({ table }) => (
          <Checkbox
            aria-label={texts.selectAll}
            checked={
              table.getIsAllPageRowsSelected()
                ? true
                : table.getIsSomePageRowsSelected()
                  ? 'indeterminate'
                  : false
            }
            onCheckedChange={(checked) => table.toggleAllPageRowsSelected(checked === true)}
            size="sm"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            aria-label={texts.selectRow}
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onCheckedChange={(checked) => row.toggleSelected(checked === true)}
            onClick={(event) => event.stopPropagation()}
            size="sm"
          />
        ),
      })
    }
    if (rowActions) {
      list.push({
        id: '__actions',
        enableSorting: false,
        enableGlobalFilter: false,
        size: 56,
        header: () => <span className="sr-only">{texts.actions}</span>,
        cell: ({ row }) => (
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <IconButton
                  icon={MoreVertical}
                  aria-label={texts.actions}
                  variant="ghost"
                  color="neutral"
                  size="sm"
                  className="size-8"
                  onClick={(event) => event.stopPropagation()}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItems items={rowActions(row.original)} />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ),
      })
    }
    return list
  }, [columns, selectable, rowActions, texts.selectAll, texts.selectRow, texts.actions])

  const controlledState = useMemo(
    () => ({
      ...(manualSearch ? {} : search !== undefined ? { globalFilter: search } : {}),
      ...(sorting !== undefined ? { sorting } : {}),
      ...(rowSelection !== undefined ? { rowSelection } : {}),
      ...(pagination !== undefined ? { pagination } : {}),
    }),
    [manualSearch, search, sorting, rowSelection, pagination],
  )

  const table = useTable({
    features: dataTableFeatures,
    data,
    columns: allColumns,
    getRowId,
    state: controlledState,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: pageSize === false ? Number.MAX_SAFE_INTEGER : pageSize,
      },
    },
    enableSorting: sortable,
    enableRowSelection: Boolean(selectable),
    enableGlobalFilter: !manualSearch,
    manualSorting,
    manualPagination,
    pageCount,
    rowCount: totalItems,
    globalFilterFn: 'includesString',
    onSortingChange,
    onRowSelectionChange,
    onPaginationChange,
  })

  onTableReady?.(table)

  const rows = table.getRowModel().rows
  const { pageIndex, pageSize: currentPageSize } = table.state.pagination
  const total = totalItems ?? table.getFilteredRowModel().rows.length
  const from = total === 0 ? 0 : pageIndex * currentPageSize + 1
  const to = Math.min(total, (pageIndex + 1) * currentPageSize)
  const selectedCount = Object.keys(table.state.rowSelection).length
  const showPagination = pageSize !== false && (table.getPageCount() > 1 || manualPagination)
  const searchValue = manualSearch ? (search ?? '') : String(table.state.globalFilter ?? '')

  return (
    <div
      data-slot="data-table"
      className={cn(styles.root(), className, classNames?.root)}
      {...props}
    >
      {title || searchable || toolbar ? (
        <div className={cn(styles.toolbar(), classNames?.toolbar)}>
          {title ? (
            <div className="text-foreground text-base font-semibold">{title}</div>
          ) : (
            <span />
          )}
          <div className="flex flex-1 flex-wrap items-center justify-end gap-2">
            {searchable ? (
              <TextInput
                aria-label={texts.search}
                placeholder={texts.search}
                leftIcon={SearchNormal}
                value={searchValue}
                onValueChange={(next) =>
                  manualSearch ? onSearchChange?.(next) : table.setGlobalFilter(next)
                }
                clearable
                size="sm"
                className="w-full sm:w-64"
              />
            ) : null}
            {toolbar}
          </div>
        </div>
      ) : null}

      <div
        className={cn(styles.scroller(), classNames?.scroller)}
        style={{ maxHeight, overflowY: maxHeight ? 'auto' : undefined }}
      >
        <table className={cn(styles.table(), classNames?.table)}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <HeaderCell
                    key={header.id}
                    header={header}
                    className={cn(styles.headerCell(), classNames?.headerCell)}
                    sortButtonClassName={cn(styles.sortButton(), classNames?.sortButton)}
                  />
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={allColumns.length} className={cn(styles.empty(), classNames?.empty)}>
                  <span className="inline-flex items-center gap-2">
                    <Spinner size="sm" color="primary" label={texts.loading} />
                    {texts.loading}
                  </span>
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={allColumns.length} className={cn(styles.empty(), classNames?.empty)}>
                  {emptyState ?? texts.empty}
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr
                  key={row.id}
                  data-selected={row.getIsSelected() || undefined}
                  data-clickable={onRowClick ? '' : undefined}
                  onClick={onRowClick ? () => onRowClick(row.original) : undefined}
                  className={cn(styles.row(), classNames?.row)}
                >
                  {row.getAllCells().map((cell) => (
                    <BodyCell
                      key={cell.id}
                      cell={cell}
                      className={cn(styles.cell(), classNames?.cell)}
                    />
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showPagination || selectable ? (
        <div className={cn(styles.footer(), classNames?.footer)}>
          <span className="tabular-nums">
            {selectable && selectedCount > 0
              ? texts.selected(selectedCount)
              : texts.showing(from, to, total)}
          </span>
          {showPagination ? (
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                color="neutral"
                size="sm"
                leftIcon={ArrowLeft}
                disabled={!table.getCanPreviousPage()}
                onClick={() => table.previousPage()}
              >
                <span className="sr-only sm:not-sr-only">{texts.previous}</span>
              </Button>
              <span className="px-2 tabular-nums">
                {pageIndex + 1} / {Math.max(1, table.getPageCount())}
              </span>
              <Button
                variant="ghost"
                color="neutral"
                size="sm"
                rightIcon={ArrowRight}
                disabled={!table.getCanNextPage()}
                onClick={() => table.nextPage()}
              >
                <span className="sr-only sm:not-sr-only">{texts.next}</span>
              </Button>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

interface HeaderCellProps<T extends RowData> {
  header: Header<DataTableFeatures, T, unknown>
  className: string
  sortButtonClassName: string
}

function HeaderCell<T extends RowData>({
  header,
  className,
  sortButtonClassName,
}: HeaderCellProps<T>) {
  const canSort = header.column.getCanSort()
  const sorted = header.column.getIsSorted()
  const content = header.isPlaceholder
    ? null
    : flexRender(header.column.columnDef.header, header.getContext())
  const size = header.getSize()
  return (
    <th
      scope="col"
      aria-sort={sorted === 'asc' ? 'ascending' : sorted === 'desc' ? 'descending' : undefined}
      style={{ width: size !== 150 ? size : undefined }}
      className={className}
    >
      {canSort ? (
        <button
          type="button"
          onClick={header.column.getToggleSortingHandler()}
          className={sortButtonClassName}
        >
          {content}
          <IconSlot
            icon={sorted === 'desc' ? ArrowDown : ArrowUp}
            className={cn('transition-opacity', !sorted && 'opacity-0 group-hover/th:opacity-50')}
          />
        </button>
      ) : (
        content
      )}
    </th>
  )
}

function BodyCell<T extends RowData>({
  cell,
  className,
}: {
  cell: Cell<DataTableFeatures, T, unknown>
  className: string
}) {
  return <td className={className}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
}

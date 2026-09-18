import { forwardRef } from 'react'
import type { IconProps } from './create-icon'
import { Add } from './icons/add'
import { AddCircle } from './icons/add_circle'
import { AddSquare } from './icons/add_square'
import { Archive1 } from './icons/archive_1'
import { Archive2 } from './icons/archive_2'
import { ArchiveBook } from './icons/archive_book'
import { ArrowDown } from './icons/arrow_down'
import { ArrowDown1 } from './icons/arrow_down_1'
import { ArrowLeft } from './icons/arrow_left'
import { ArrowLeft1 } from './icons/arrow_left_1'
import { ArrowPin } from './icons/arrow_pin'
import { ArrowRight } from './icons/arrow_right'
import { ArrowRight1 } from './icons/arrow_right_1'
import { ArrowUp } from './icons/arrow_up'
import { ArrowUp1 } from './icons/arrow_up_1'
import { BaterryFull1 } from './icons/baterry_full_1'
import { BaterryFull2 } from './icons/baterry_full_2'
import { BatteryCharging } from './icons/battery_charging'
import { BatteryDisable } from './icons/battery_disable'
import { BatteryEmpty } from './icons/battery_empty'
import { BatteryEmpty1 } from './icons/battery_empty_1'
import { Broom } from './icons/broom'
import { Cake } from './icons/cake'
import { Calendar } from './icons/calendar'
import { Calendar1 } from './icons/calendar_1'
import { CalendarAdd } from './icons/calendar_add'
import { CalendarRemove } from './icons/calendar_remove'
import { CalendarSearch } from './icons/calendar_search'
import { CalendarTick } from './icons/calendar_tick'
import { Card } from './icons/card'
import { CardAdd } from './icons/card_add'
import { CardEdit } from './icons/card_edit'
import { CardPos } from './icons/card_pos'
import { CardReceive } from './icons/card_receive'
import { CardRemove } from './icons/card_remove'
import { CardSend } from './icons/card_send'
import { CardSlash } from './icons/card_slash'
import { CardTick } from './icons/card_tick'
import { CardTick2 } from './icons/card_tick_2'
import { CaretDown } from './icons/caret_down'
import { ChartSquare } from './icons/chart_square'
import { ClipboardClose } from './icons/clipboard_close'
import { ClipboardExport } from './icons/clipboard_export'
import { ClipboardImport } from './icons/clipboard_import'
import { ClipboardText } from './icons/clipboard_text'
import { ClipboardTick } from './icons/clipboard_tick'
import { Clock } from './icons/clock'
import { Close } from './icons/close'
import { CloseCircle } from './icons/close_circle'
import { CloseSquare } from './icons/close_square'
import { Coffe } from './icons/coffe'
import { Coin } from './icons/coin'
import { Coin2 } from './icons/coin_2'
import { Cup } from './icons/cup'
import { DiscountCircle } from './icons/discount_circle'
import { DiscountShape } from './icons/discount_shape'
import { Document1 } from './icons/document_1'
import { Document2 } from './icons/document_2'
import { DocumentCloud } from './icons/document_cloud'
import { DocumentCopy } from './icons/document_copy'
import { DocumentDownload } from './icons/document_download'
import { DocumentEmpty } from './icons/document_empty'
import { DocumentFavorite } from './icons/document_favorite'
import { DocumentForward } from './icons/document_forward'
import { DocumentLike } from './icons/document_like'
import { DocumentPrevious } from './icons/document_previous'
import { DocumentText1 } from './icons/document_text_1'
import { DocumentText2 } from './icons/document_text_2'
import { DocumentUpload } from './icons/document_upload'
import { DollarCircle } from './icons/dollar_circle'
import { DollarSquare } from './icons/dollar_square'
import { Edit1 } from './icons/edit_1'
import { Edit2 } from './icons/edit_2'
import { EmptyWallet } from './icons/empty_wallet'
import { EmptyWalletChange } from './icons/empty_wallet_change'
import { EmptyWalletTick } from './icons/empty_wallet_tick'
import { EmptyWlletTime } from './icons/empty_wllet_time'
import { Export } from './icons/export'
import { Export1 } from './icons/export_1'
import { Export2 } from './icons/export_2'
import { Eye } from './icons/eye'
import { EyeSlash } from './icons/eye_slash'
import { Filter } from './icons/filter'
import { FilterAdd } from './icons/filter_add'
import { FilterEdit } from './icons/filter_edit'
import { FilterRemove } from './icons/filter_remove'
import { FilterSearch } from './icons/filter_search'
import { FilterTick } from './icons/filter_tick'
import { Flag1 } from './icons/flag_1'
import { Flag2 } from './icons/flag_2'
import { Flash } from './icons/flash'
import { FlashCircle } from './icons/flash_circle'
import { FlashSlash } from './icons/flash_slash'
import { Folder } from './icons/folder'
import { Folder1 } from './icons/folder_1'
import { FolderAdd } from './icons/folder_add'
import { FolderClound } from './icons/folder_clound'
import { FolderCross } from './icons/folder_cross'
import { FolderFavorite } from './icons/folder_favorite'
import { FolderMinus } from './icons/folder_minus'
import { FolderOpen } from './icons/folder_open'
import { Frame } from './icons/frame'
import { Glass } from './icons/glass'
import { Group } from './icons/group'
import { Group2 } from './icons/group_2'
import { Home1 } from './icons/home_1'
import { Home2 } from './icons/home_2'
import { HomeWifi } from './icons/home_wifi'
import { Import } from './icons/import'
import { Import1 } from './icons/import_1'
import { Import2 } from './icons/import_2'
import { InfoCircle } from './icons/info_circle'
import { Information } from './icons/information'
import { LinesSquare } from './icons/lines_square'
import { Login } from './icons/login'
import { Login1 } from './icons/login_1'
import { Logout } from './icons/logout'
import { Logout1 } from './icons/logout_1'
import { Math } from './icons/math'
import { Menu } from './icons/menu'
import { MenuBoard } from './icons/menu_board'
import { Milk } from './icons/milk'
import { Minus } from './icons/minus'
import { MinusCirlce } from './icons/minus_cirlce'
import { MinusSquare } from './icons/minus_square'
import { Money } from './icons/money'
import { Money2 } from './icons/money_2'
import { Money3 } from './icons/money_3'
import { Money4 } from './icons/money_4'
import { MoneyAdd } from './icons/money_add'
import { MoneyChange } from './icons/money_change'
import { MoneyForbidden } from './icons/money_forbidden'
import { MoneyRecive } from './icons/money_recive'
import { MoneyRemove } from './icons/money_remove'
import { MoneySend } from './icons/money_send'
import { MoneyTick } from './icons/money_tick'
import { MoneyTime } from './icons/money_time'
import { Moneys } from './icons/moneys'
import { Moon } from './icons/moon'
import { More } from './icons/more'
import { MoreCircle } from './icons/more_circle'
import { MoreSquare } from './icons/more_square'
import { MoreVertical } from './icons/more_vertical'
import { Mouse } from './icons/mouse'
import { MouseCircle } from './icons/mouse_circle'
import { MouseSquare } from './icons/mouse_square'
import { Note } from './icons/note'
import { Note1 } from './icons/note_1'
import { NoteAdd } from './icons/note_add'
import { NoteFavorite } from './icons/note_favorite'
import { NoteRemove } from './icons/note_remove'
import { NoteText } from './icons/note_text'
import { PercentageSquare } from './icons/percentage_square'
import { ProfileCircle } from './icons/profile_circle'
import { Receipt } from './icons/receipt'
import { Receipt2 } from './icons/receipt_2'
import { Receipt3 } from './icons/receipt_3'
import { Receipt4 } from './icons/receipt_4'
import { ReceiptAdd } from './icons/receipt_add'
import { ReceiptDiscount } from './icons/receipt_discount'
import { ReceiptDisscount } from './icons/receipt_disscount'
import { ReceiptEdit } from './icons/receipt_edit'
import { ReceiptItem } from './icons/receipt_item'
import { ReceiptMinus } from './icons/receipt_minus'
import { ReceiptSearch } from './icons/receipt_search'
import { Redo } from './icons/redo'
import { Refresh1 } from './icons/refresh_1'
import { Refresh2 } from './icons/refresh_2'
import { Repeat } from './icons/repeat'
import { Reserve } from './icons/reserve'
import { RotateLeft } from './icons/rotate_left'
import { RotateRight } from './icons/rotate_right'
import { Route } from './icons/route'
import { SafeHome } from './icons/safe_home'
import { SearchNormal } from './icons/search_normal'
import { SearchNormal1 } from './icons/search_normal_1'
import { SecurityCard } from './icons/security_card'
import { Send1 } from './icons/send_1'
import { Send2 } from './icons/send_2'
import { Setting } from './icons/setting'
import { Setting1 } from './icons/setting_1'
import { Share } from './icons/share'
import { Slash } from './icons/slash'
import { SmartHome } from './icons/smart_home'
import { Sound } from './icons/sound'
import { StickyNote } from './icons/sticky_note'
import { Strongbox } from './icons/strongbox'
import { Strongbox2 } from './icons/strongbox_2'
import { Success } from './icons/success'
import { Sun } from './icons/sun'
import { Tag } from './icons/tag'
import { Tag2 } from './icons/tag_2'
import { TagCross } from './icons/tag_cross'
import { Task } from './icons/task'
import { TaskSquare } from './icons/task_square'
import { Tick } from './icons/tick'
import { TickSquare } from './icons/tick_square'
import { Timer } from './icons/timer'
import { TimerPause } from './icons/timer_pause'
import { TimerStart } from './icons/timer_start'
import { TransactionMinus } from './icons/transaction_minus'
import { Trash } from './icons/trash'
import { Undo } from './icons/undo'
import { User } from './icons/user'
import { UserAdd } from './icons/user_add'
import { UserDelete } from './icons/user_delete'
import { UserRemove } from './icons/user_remove'
import { UserTag } from './icons/user_tag'
import { UserTick } from './icons/user_tick'
import { Verify } from './icons/verify'
import { Wallet1 } from './icons/wallet_1'
import { Wallet2 } from './icons/wallet_2'
import { Wallet3 } from './icons/wallet_3'
import { Wallet4 } from './icons/wallet_4'
import { WalletAdd } from './icons/wallet_add'
import { WalletAdd2 } from './icons/wallet_add_2'
import { WalletAdd3 } from './icons/wallet_add_3'
import { WalletCheck } from './icons/wallet_check'
import { WalletMinus } from './icons/wallet_minus'
import { WalletRemove } from './icons/wallet_remove'
import { WalletRemove2 } from './icons/wallet_remove_2'
import { WalletSearch } from './icons/wallet_search'
import { Warning } from './icons/warning'
import { Weight } from './icons/weight'
import { Wifi } from './icons/wifi'
import { ZoomIn } from './icons/zoom_in'
import { ZoomIn1 } from './icons/zoom_in_1'
import { ZoomOut } from './icons/zoom_out'
import { ZoomOut1 } from './icons/zoom_out_1'

/**
 * Tabela de todos os ícones por nome. Importar este arquivo traz todos para o
 * bundle. Para tree-shaking, importe o componente direto: `import { Add } from '@lumus-ui/icons'`.
 */
export const icons = {
  add: Add,
  add_circle: AddCircle,
  add_square: AddSquare,
  archive_1: Archive1,
  archive_2: Archive2,
  archive_book: ArchiveBook,
  arrow_down: ArrowDown,
  arrow_down_1: ArrowDown1,
  arrow_left: ArrowLeft,
  arrow_left_1: ArrowLeft1,
  arrow_pin: ArrowPin,
  arrow_right: ArrowRight,
  arrow_right_1: ArrowRight1,
  arrow_up: ArrowUp,
  arrow_up_1: ArrowUp1,
  baterry_full_1: BaterryFull1,
  baterry_full_2: BaterryFull2,
  battery_charging: BatteryCharging,
  battery_disable: BatteryDisable,
  battery_empty: BatteryEmpty,
  battery_empty_1: BatteryEmpty1,
  broom: Broom,
  cake: Cake,
  calendar: Calendar,
  calendar_1: Calendar1,
  calendar_add: CalendarAdd,
  calendar_remove: CalendarRemove,
  calendar_search: CalendarSearch,
  calendar_tick: CalendarTick,
  card: Card,
  card_add: CardAdd,
  card_edit: CardEdit,
  card_pos: CardPos,
  card_receive: CardReceive,
  card_remove: CardRemove,
  card_send: CardSend,
  card_slash: CardSlash,
  card_tick: CardTick,
  card_tick_2: CardTick2,
  caret_down: CaretDown,
  chart_square: ChartSquare,
  clipboard_close: ClipboardClose,
  clipboard_export: ClipboardExport,
  clipboard_import: ClipboardImport,
  clipboard_text: ClipboardText,
  clipboard_tick: ClipboardTick,
  clock: Clock,
  close: Close,
  close_circle: CloseCircle,
  close_square: CloseSquare,
  coffe: Coffe,
  coin: Coin,
  coin_2: Coin2,
  cup: Cup,
  discount_circle: DiscountCircle,
  discount_shape: DiscountShape,
  document_1: Document1,
  document_2: Document2,
  document_cloud: DocumentCloud,
  document_copy: DocumentCopy,
  document_download: DocumentDownload,
  document_empty: DocumentEmpty,
  document_favorite: DocumentFavorite,
  document_forward: DocumentForward,
  document_like: DocumentLike,
  document_previous: DocumentPrevious,
  document_text_1: DocumentText1,
  document_text_2: DocumentText2,
  document_upload: DocumentUpload,
  dollar_circle: DollarCircle,
  dollar_square: DollarSquare,
  edit_1: Edit1,
  edit_2: Edit2,
  empty_wallet: EmptyWallet,
  empty_wallet_change: EmptyWalletChange,
  empty_wallet_tick: EmptyWalletTick,
  empty_wllet_time: EmptyWlletTime,
  export: Export,
  export_1: Export1,
  export_2: Export2,
  eye: Eye,
  eye_slash: EyeSlash,
  filter: Filter,
  filter_add: FilterAdd,
  filter_edit: FilterEdit,
  filter_remove: FilterRemove,
  filter_search: FilterSearch,
  filter_tick: FilterTick,
  flag_1: Flag1,
  flag_2: Flag2,
  flash: Flash,
  flash_circle: FlashCircle,
  flash_slash: FlashSlash,
  folder: Folder,
  folder_1: Folder1,
  folder_add: FolderAdd,
  folder_clound: FolderClound,
  folder_cross: FolderCross,
  folder_favorite: FolderFavorite,
  folder_minus: FolderMinus,
  folder_open: FolderOpen,
  frame: Frame,
  glass: Glass,
  group: Group,
  group_2: Group2,
  home_1: Home1,
  home_2: Home2,
  home_wifi: HomeWifi,
  import: Import,
  import_1: Import1,
  import_2: Import2,
  info_circle: InfoCircle,
  information: Information,
  lines_square: LinesSquare,
  login: Login,
  login_1: Login1,
  logout: Logout,
  logout_1: Logout1,
  math: Math,
  menu: Menu,
  menu_board: MenuBoard,
  milk: Milk,
  minus: Minus,
  minus_cirlce: MinusCirlce,
  minus_square: MinusSquare,
  money: Money,
  money_2: Money2,
  money_3: Money3,
  money_4: Money4,
  money_add: MoneyAdd,
  money_change: MoneyChange,
  money_forbidden: MoneyForbidden,
  money_recive: MoneyRecive,
  money_remove: MoneyRemove,
  money_send: MoneySend,
  money_tick: MoneyTick,
  money_time: MoneyTime,
  moneys: Moneys,
  moon: Moon,
  more: More,
  more_circle: MoreCircle,
  more_square: MoreSquare,
  more_vertical: MoreVertical,
  mouse: Mouse,
  mouse_circle: MouseCircle,
  mouse_square: MouseSquare,
  note: Note,
  note_1: Note1,
  note_add: NoteAdd,
  note_favorite: NoteFavorite,
  note_remove: NoteRemove,
  note_text: NoteText,
  percentage_square: PercentageSquare,
  profile_circle: ProfileCircle,
  receipt: Receipt,
  receipt_2: Receipt2,
  receipt_3: Receipt3,
  receipt_4: Receipt4,
  receipt_add: ReceiptAdd,
  receipt_discount: ReceiptDiscount,
  receipt_disscount: ReceiptDisscount,
  receipt_edit: ReceiptEdit,
  receipt_item: ReceiptItem,
  receipt_minus: ReceiptMinus,
  receipt_search: ReceiptSearch,
  redo: Redo,
  refresh_1: Refresh1,
  refresh_2: Refresh2,
  repeat: Repeat,
  reserve: Reserve,
  rotate_left: RotateLeft,
  rotate_right: RotateRight,
  route: Route,
  safe_home: SafeHome,
  search_normal: SearchNormal,
  search_normal_1: SearchNormal1,
  security_card: SecurityCard,
  send_1: Send1,
  send_2: Send2,
  setting: Setting,
  setting_1: Setting1,
  share: Share,
  slash: Slash,
  smart_home: SmartHome,
  sound: Sound,
  sticky_note: StickyNote,
  strongbox: Strongbox,
  strongbox_2: Strongbox2,
  success: Success,
  sun: Sun,
  tag: Tag,
  tag_2: Tag2,
  tag_cross: TagCross,
  task: Task,
  task_square: TaskSquare,
  tick: Tick,
  tick_square: TickSquare,
  timer: Timer,
  timer_pause: TimerPause,
  timer_start: TimerStart,
  transaction_minus: TransactionMinus,
  trash: Trash,
  undo: Undo,
  user: User,
  user_add: UserAdd,
  user_delete: UserDelete,
  user_remove: UserRemove,
  user_tag: UserTag,
  user_tick: UserTick,
  verify: Verify,
  wallet_1: Wallet1,
  wallet_2: Wallet2,
  wallet_3: Wallet3,
  wallet_4: Wallet4,
  wallet_add: WalletAdd,
  wallet_add_2: WalletAdd2,
  wallet_add_3: WalletAdd3,
  wallet_check: WalletCheck,
  wallet_minus: WalletMinus,
  wallet_remove: WalletRemove,
  wallet_remove_2: WalletRemove2,
  wallet_search: WalletSearch,
  warning: Warning,
  weight: Weight,
  wifi: Wifi,
  zoom_in: ZoomIn,
  zoom_in_1: ZoomIn1,
  zoom_out: ZoomOut,
  zoom_out_1: ZoomOut1,
} as const

export type IconName = keyof typeof icons

export const iconNames = Object.keys(icons) as IconName[]

export interface DynamicIconProps extends IconProps {
  name: IconName
}

/** Ícone escolhido por nome em tempo de execução, por exemplo vindo de dado. */
export const Icon = forwardRef<SVGSVGElement, DynamicIconProps>(function Icon(
  { name, ...props },
  ref,
) {
  const Component = icons[name]
  return <Component ref={ref} {...props} />
})

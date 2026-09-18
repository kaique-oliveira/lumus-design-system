/** Anel de foco só por teclado, igual em todo controle. */
export const focusRing =
  'outline-none focus-visible:ring-[3px] focus-visible:ring-primary/30 focus-visible:ring-offset-0'

export const disabledStyles =
  'disabled:cursor-not-allowed disabled:opacity-50 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50'

/** Superfície flutuante: popover, menu, tooltip. */
export const floatingSurface = 'bg-surface text-foreground shadow-floating border border-border'

/**
 * Entrada com escala e mola, saída rápida. O `data-side` vem do Radix e
 * faz o conteúdo deslizar a partir do gatilho.
 */
export const popAnimation = [
  'data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-95',
  'data-[state=open]:duration-(--lumus-duration-spring) data-[state=open]:ease-spring',
  'data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95',
  'data-[state=closed]:duration-(--lumus-duration-fast) data-[state=closed]:ease-in',
  'data-[side=bottom]:slide-in-from-top-1 data-[side=top]:slide-in-from-bottom-1',
  'data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1',
].join(' ')

export const overlayAnimation = [
  'data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:duration-(--lumus-duration-base)',
  'data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:duration-(--lumus-duration-base)',
].join(' ')

/** Conteúdo central no desktop e sheet subindo de baixo no celular. */
export const dialogAnimation = [
  'data-[state=open]:animate-in data-[state=open]:fade-in',
  'sm:data-[state=open]:zoom-in-95 sm:data-[state=open]:duration-(--lumus-duration-spring) sm:data-[state=open]:ease-spring',
  'max-sm:data-[state=open]:slide-in-from-bottom-full max-sm:data-[state=open]:duration-(--lumus-duration-slow) max-sm:data-[state=open]:ease-ios',
  'data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:ease-in',
  'sm:data-[state=closed]:zoom-out-95 sm:data-[state=closed]:duration-(--lumus-duration-fast)',
  'max-sm:data-[state=closed]:slide-out-to-bottom-full max-sm:data-[state=closed]:duration-(--lumus-duration-base)',
].join(' ')

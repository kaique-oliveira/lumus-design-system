import { readdirSync, readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { join } from 'node:path'

/**
 * Lê cada arquivo de svg/ e escreve um componente em src/icons/.
 * A cor do traço vira currentColor e as props repetidas (stroke, espessura,
 * pontas) sobem para o svg raiz, que o createIcon já preenche.
 */

const root = join(import.meta.dirname, '..')
const svgDir = join(root, 'svg')
const outDir = join(root, 'src', 'icons')

const svgAttrToJsx: Record<string, string> = {
  'stroke-width': 'strokeWidth',
  'stroke-linecap': 'strokeLinecap',
  'stroke-linejoin': 'strokeLinejoin',
  'stroke-miterlimit': 'strokeMiterlimit',
  'stroke-dasharray': 'strokeDasharray',
  'stroke-dashoffset': 'strokeDashoffset',
  'fill-rule': 'fillRule',
  'clip-rule': 'clipRule',
  'fill-opacity': 'fillOpacity',
  'stroke-opacity': 'strokeOpacity',
  'clip-path': 'clipPath',
}

// Atributos que o svg raiz já define. Repetir em cada path só pesa o bundle.
const inheritedDefaults: Record<string, string> = {
  stroke: 'currentColor',
  'stroke-width': '1.5',
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
}

function toPascal(name: string) {
  return name
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}

function convertInner(inner: string) {
  return inner
    .replace(
      /<\/?(path|circle|rect|line|polyline|polygon|ellipse|g)([^>]*)>/g,
      (_m, tag, attrs) => {
        const closing = _m.startsWith('</')
        if (closing) return `</${tag}>`
        const selfClosing = attrs.trim().endsWith('/')
        const cleanAttrs = attrs.replace(/\/$/, '')
        const converted = cleanAttrs.replace(
          /\s([a-z-]+)="([^"]*)"/g,
          (_a: string, key: string, value: string) => {
            let finalValue = value
            if (value === '#292D32') finalValue = 'currentColor'
            if (inheritedDefaults[key] === finalValue) return ''
            const jsxKey = svgAttrToJsx[key] ?? key
            return ` ${jsxKey}="${finalValue}"`
          },
        )
        return `<${tag}${converted}${selfClosing ? ' /' : ''}>`
      },
    )
    .replace(/<\/path>/g, '')
    .replace(/<path([^>]*[^/])>/g, '<path$1 />')
}

rmSync(outDir, { recursive: true, force: true })
mkdirSync(outDir, { recursive: true })

const files = readdirSync(svgDir)
  .filter((file) => file.endsWith('.svg'))
  .sort()

const exportsLines: string[] = []
const registryLines: string[] = []

for (const file of files) {
  const name = file.replace(/\.svg$/, '')
  if (!/^[a-z][a-z0-9_]*$/.test(name)) throw new Error(`Nome inválido de ícone: ${name}`)

  const svg = readFileSync(join(svgDir, file), 'utf8').trim()
  const viewBox = /viewBox="([^"]+)"/.exec(svg)?.[1] ?? '0 0 24 24'
  const inner = svg.replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '')
  const jsx = convertInner(inner)
  const component = toPascal(name)

  writeFileSync(
    join(outDir, `${name}.tsx`),
    `import { createIcon } from '../create-icon'

export const ${component} = createIcon({
  name: '${name}',
  viewBox: '${viewBox}',
  children: (
    <>
      ${jsx}
    </>
  ),
})
`,
  )
  exportsLines.push(`export { ${component} } from './icons/${name}'`)
  registryLines.push(`  ${name}: ${component},`)
}

writeFileSync(
  join(root, 'src', 'index.ts'),
  `export type { IconProps, IconComponent } from './create-icon'
export { createIcon } from './create-icon'
export { Icon, icons, iconNames, type IconName, type DynamicIconProps } from './icon'
${exportsLines.join('\n')}
`,
)

writeFileSync(
  join(root, 'src', 'icon.tsx'),
  `import { forwardRef } from 'react'
import type { IconProps } from './create-icon'
${files
  .map((file) => {
    const name = file.replace(/\.svg$/, '')
    return `import { ${toPascal(name)} } from './icons/${name}'`
  })
  .join('\n')}

/**
 * Tabela de todos os ícones por nome. Importar este arquivo traz todos para o
 * bundle. Para tree-shaking, importe o componente direto: \`import { Add } from '@lumus-ui/icons'\`.
 */
export const icons = {
${registryLines.join('\n')}
} as const

export type IconName = keyof typeof icons

export const iconNames = Object.keys(icons) as IconName[]

export interface DynamicIconProps extends IconProps {
  name: IconName
}

/** Ícone escolhido por nome em tempo de execução, por exemplo vindo de dado. */
export const Icon = forwardRef<SVGSVGElement, DynamicIconProps>(function Icon({ name, ...props }, ref) {
  const Component = icons[name]
  return <Component ref={ref} {...props} />
})
`,
)

console.log(`${files.length} ícones gerados em src/icons`)

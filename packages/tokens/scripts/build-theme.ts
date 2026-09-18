import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { colors, type ColorScale } from '../src/colors'
import { radius } from '../src/radius'
import { shadows, type ShadowScale } from '../src/shadows'
import { fontFamily, fontSize, fontWeight } from '../src/typography'
import { controlHeight } from '../src/sizes'
import { duration, easing } from '../src/motion'

const root = join(import.meta.dirname, '..')
const read = (file: string) => readFileSync(join(root, 'src', file), 'utf8')

function scheme(colorScale: ColorScale, shadowScale: ShadowScale) {
  const lines: string[] = []
  for (const [name, value] of Object.entries(colorScale))
    lines.push(`    --lumus-color-${name}: ${value};`)
  for (const [name, value] of Object.entries(shadowScale))
    lines.push(`    --lumus-shadow-${name}: ${value};`)
  return lines.join('\n')
}

const themeInline: string[] = []
for (const name of Object.keys(colors.light))
  themeInline.push(`  --color-${name}: var(--lumus-color-${name});`)
for (const name of Object.keys(shadows.light))
  themeInline.push(`  --shadow-${name}: var(--lumus-shadow-${name});`)
for (const [name, value] of Object.entries(radius))
  themeInline.push(`  --radius-${name}: ${value};`)
for (const [name, value] of Object.entries(fontFamily))
  themeInline.push(`  --font-${name}: ${value};`)
for (const [name, value] of Object.entries(fontSize)) {
  themeInline.push(`  --text-${name}: ${value.size};`)
  themeInline.push(`  --text-${name}--line-height: ${value.lineHeight};`)
}
for (const [name, value] of Object.entries(fontWeight))
  themeInline.push(`  --font-weight-${name}: ${value};`)
for (const [name, value] of Object.entries(controlHeight))
  themeInline.push(`  --spacing-control-${name}: ${value};`)
for (const [name, value] of Object.entries(easing)) themeInline.push(`  --ease-${name}: ${value};`)
themeInline.push(`  --animate-spin: lumus-spin 1s linear infinite;`)
themeInline.push(`  --animate-pulse: lumus-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;`)
themeInline.push(
  `  --animate-collapse-down: lumus-collapse-down var(--lumus-duration-base) var(--ease-out);`,
)
themeInline.push(
  `  --animate-collapse-up: lumus-collapse-up var(--lumus-duration-base) var(--ease-out);`,
)

const durations = Object.entries(duration)
  .map(([name, value]) => `    --lumus-duration-${name}: ${value}ms;`)
  .join('\n')

const css = `/* Gerado por scripts/build-theme.ts a partir de src/*.ts. Não edite à mão. */

@layer base {
  :root,
  [data-theme="light"] {
${scheme(colors.light, shadows.light)}
  }

  [data-theme="dark"] {
${scheme(colors.dark, shadows.dark)}
  }

  @media (prefers-color-scheme: dark) {
    :root:not([data-theme="light"]) {
${scheme(colors.dark, shadows.dark)}
    }
  }

  :root {
${durations}
  }
}

@theme inline {
${themeInline.join('\n')}
}

${read('base.css')}

${read('animations.css')}
`

mkdirSync(join(root, 'dist'), { recursive: true })
writeFileSync(join(root, 'dist', 'theme.css'), css)
console.log('theme.css gerado')

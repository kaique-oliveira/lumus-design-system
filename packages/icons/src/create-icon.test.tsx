import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { Add, Icon, iconNames, icons } from './index'

describe('icones', () => {
  it('usa currentColor, tamanho 1em e fica escondido de leitor de tela', () => {
    const html = renderToStaticMarkup(<Add />)
    expect(html).toContain('stroke="currentColor"')
    expect(html).toContain('width="1em"')
    expect(html).toContain('aria-hidden="true"')
    expect(html).not.toContain('#292D32')
  })

  it('aceita size, strokeWidth, className e title', () => {
    const html = renderToStaticMarkup(<Add size={24} strokeWidth={2} className="x" title="Adicionar" />)
    expect(html).toContain('width="24"')
    expect(html).toContain('stroke-width="2"')
    expect(html).toContain('class="x"')
    expect(html).toContain('<title>Adicionar</title>')
    expect(html).toContain('role="img"')
  })

  it('renderiza por nome e a lista bate com o mapa', () => {
    expect(iconNames.length).toBe(Object.keys(icons).length)
    expect(renderToStaticMarkup(<Icon name="close" />)).toContain('data-icon="close"')
  })
})

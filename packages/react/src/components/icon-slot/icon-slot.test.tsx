import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Add } from '@lumus-ui/icons'
import { IconSlot } from './icon-slot'
import { registerIcons, useIconRegistry } from '../../store/icon-registry'

function OutraLib({ className }: { className?: string }) {
  return <svg data-testid="outra" className={className} />
}

describe('IconSlot', () => {
  it('aceita elemento pronto', () => {
    render(<IconSlot icon={<Add data-testid="el" />} />)
    expect(screen.getByTestId('el')).toBeInTheDocument()
  })

  it('aceita componente de qualquer lib', () => {
    render(<IconSlot icon={OutraLib} />)
    expect(screen.getByTestId('outra')).toBeInTheDocument()
  })

  it('aceita nome registrado e some quando nao existe', () => {
    useIconRegistry.getState().clear()
    const { container, rerender } = render(<IconSlot icon="home" />)
    expect(container.querySelector('svg')).toBeNull()
    registerIcons({ home: OutraLib })
    rerender(<IconSlot icon="home" />)
    expect(screen.getByTestId('outra')).toBeInTheDocument()
  })

  it('nao renderiza nada sem icone', () => {
    const { container } = render(<IconSlot icon={null} />)
    expect(container.firstChild).toBeNull()
  })
})

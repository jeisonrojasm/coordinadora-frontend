import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Modal } from './Modal'

describe('componente Modal', () => {
  test('no debe renderizarse cuando isOpen es false', () => {
    const { container } = render(
      <Modal isOpen={false}>
        <p>Contenido oculto</p>
      </Modal>
    )
    expect(container.firstChild).toBeNull()
  })

  test('debe renderizarse cuando isOpen es true', () => {
    render(
      <Modal isOpen={true}>
        <p>Contenido visible</p>
      </Modal>
    )
    const content = screen.getByText('Contenido visible')
    expect(content).toBeInTheDocument()
    expect(content.closest('section')).toHaveClass('modal-opened')
  })

  test('Modal.Content debe renderizar contenido y aplicar clase width si se pasa', () => {
    render(
      <Modal isOpen={true}>
        <Modal.Content width="w-96">
          <p>Contenido dentro del modal</p>
        </Modal.Content>
      </Modal>
    )
    const content = screen.getByText('Contenido dentro del modal')
    expect(content).toBeInTheDocument()
    expect(content.parentElement).toHaveClass('modal-body-content', 'w-96')
  })

  test('Modal.Buttons debe renderizar contenido y aplicar margin y className si se pasan', () => {
    render(
      <Modal isOpen={true}>
        <Modal.Buttons margin="mt-4" className="extra-class">
          <button>Aceptar</button>
        </Modal.Buttons>
      </Modal>
    )
    const button = screen.getByRole('button', { name: 'Aceptar' })
    expect(button).toBeInTheDocument()
    expect(button.parentElement).toHaveClass('modal-body-buttons', 'mt-4', 'extra-class')
  })
})

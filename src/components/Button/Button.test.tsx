import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button'

describe('componente Button', () => {
  test('debe renderizar el texto correctamente', () => {
    render(<Button text="Enviar" />)

    const button = screen.getByRole('button', { name: 'Enviar' })
    expect(button).toBeInTheDocument()
  })

  test('debe disparar onClick cuando se hace clic', () => {
    const handleClick = jest.fn()

    render(<Button text="Clic" onClick={handleClick} />)

    const button = screen.getByRole('button', { name: 'Clic' })
    fireEvent.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('debe estar deshabilitado si se pasa `disabled=true`', () => {
    render(<Button text="No disponible" disabled />)

    const button = screen.getByRole('button', { name: 'No disponible' })
    expect(button).toBeDisabled()
  })
})

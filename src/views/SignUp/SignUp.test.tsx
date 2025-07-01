import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

describe('Prueba básica del entorno de testing', () => {
  test('Debe renderizar texto en el DOM', () => {
    render(<div>Hola mundo</div>)
    expect(screen.getByText('Hola mundo')).toBeInTheDocument()
  })
})

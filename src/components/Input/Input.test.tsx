import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from './Input'

describe('componente Input', () => {
  test('debe renderizarse con las props por defecto', () => {
    render(<Input />)

    const input = screen.getByPlaceholderText('Escribe aquí...')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'text')
  })

  test('debe renderizarse con un type personalizado y un placeholder personalizado', () => {
    render(<Input type="email" placeholder="Ingresa tu correo" />)

    const input = screen.getByPlaceholderText('Ingresa tu correo')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'email')
  })

  test('debe llamar el onChange cuando el usuario tipea', () => {
    const handleChange = jest.fn()

    render(<Input onChange={handleChange} />)
    const input = screen.getByPlaceholderText('Escribe aquí...')

    fireEvent.change(input, { target: { value: 'Hola' } })

    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  test('debe llamar el onBlur cuando el usuario quita el foco', () => {
    const handleBlur = jest.fn()

    render(<Input onBlur={handleBlur} />)
    const input = screen.getByPlaceholderText('Escribe aquí...')

    fireEvent.blur(input)

    expect(handleBlur).toHaveBeenCalledTimes(1)
  })

  test('debe renderizar un label si se proporciona', () => {
    render(<Input label="Correo electrónico" />)

    const label = screen.getByText('Correo electrónico')
    expect(label).toBeInTheDocument()
    expect(label.tagName).toBe('H2')
    expect(label).toHaveClass('input__subtitle')

    const input = screen.getByPlaceholderText('Escribe aquí...')
    expect(input).toBeInTheDocument()
  })
})

import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { SignIn } from './SignIn'

// Test suite del componente SignIn
describe('vista SignIn', () => {
  describe('vista SignIn', () => {
    test('debe renderizar los títulos y el botón correctamente', () => {
      render(<SignIn />)

      const title = screen.getByRole('heading', { name: 'Iniciar sesión' })
      const companyTitle = screen.getByText('Coordinadora Mercantil S.A.')
      const button = screen.getByRole('button', { name: 'Iniciar sesión' })

      expect(companyTitle).toBeInTheDocument()
      expect(title).toBeInTheDocument()
      expect(button).toBeInTheDocument()
    })
  })

  test('debe renderizar el campo de correo electrónico con su label y placeholder', () => {
    render(<SignIn />)

    const emailLabel = screen.getByText('Correo electrónico')
    const emailInput = screen.getByPlaceholderText('Ingresa tu correo')

    expect(emailLabel).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
    expect(emailInput).toHaveAttribute('type', 'email')
  })

  test('debe renderizar el campo de contraseña con su label y placeholder', () => {
    render(<SignIn />)

    const passwordLabel = screen.getByText('Contraseña')
    const passwordInput = screen.getByPlaceholderText('Ingresa tu contraseña')

    expect(passwordLabel).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(passwordInput).toHaveAttribute('type', 'password')
  })

  test('debe mostrar el mensaje para registrarse si el usuario no está registrado', () => {
    render(<SignIn />)

    const paragraph = screen.getByText('¿No te encuentras registrado aún?')
    const registerLink = screen.getByText('Regístrate')

    expect(paragraph).toBeInTheDocument()
    expect(registerLink).toBeInTheDocument()
  })

  test('debe mostrar error si la contraseña tiene menos de 8 caracteres', async () => {
    render(<SignIn />)

    fireEvent.change(screen.getByPlaceholderText('Ingresa tu correo'), {
      target: { value: 'correo@valido.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('Ingresa tu contraseña'), {
      target: { value: 'Ab1!' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Iniciar sesión' }))

    const modalMessage = await screen.findByText('La contraseña debe tener al menos 8 caracteres')
    expect(modalMessage).toBeInTheDocument()
  })

  test('debe mostrar error si la contraseña no tiene una letra mayúscula', async () => {
    render(<SignIn />)

    fireEvent.change(screen.getByPlaceholderText('Ingresa tu correo'), {
      target: { value: 'correo@valido.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('Ingresa tu contraseña'), {
      target: { value: 'abc123!!' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Iniciar sesión' }))

    const modalMessage = await screen.findByText('Debe contener al menos una letra mayúscula')
    expect(modalMessage).toBeInTheDocument()
  })

  test('debe mostrar error si la contraseña no tiene una letra minúscula', async () => {
    render(<SignIn />)

    fireEvent.change(screen.getByPlaceholderText('Ingresa tu correo'), {
      target: { value: 'correo@valido.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('Ingresa tu contraseña'), {
      target: { value: 'ABC123!!' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Iniciar sesión' }))

    const modalMessage = await screen.findByText('Debe contener al menos una letra minúscula')
    expect(modalMessage).toBeInTheDocument()
  })

  test('debe mostrar error si la contraseña no tiene un número', async () => {
    render(<SignIn />)

    fireEvent.change(screen.getByPlaceholderText('Ingresa tu correo'), {
      target: { value: 'correo@valido.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('Ingresa tu contraseña'), {
      target: { value: 'Abcdef!!' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Iniciar sesión' }))

    const modalMessage = await screen.findByText('Debe contener al menos un número')
    expect(modalMessage).toBeInTheDocument()
  })

  test('debe mostrar error si la contraseña no tiene un carácter especial', async () => {
    render(<SignIn />)

    fireEvent.change(screen.getByPlaceholderText('Ingresa tu correo'), {
      target: { value: 'correo@valido.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('Ingresa tu contraseña'), {
      target: { value: 'Abcdef12' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Iniciar sesión' }))

    const modalMessage = await screen.findByText('Debe contener al menos un carácter especial')
    expect(modalMessage).toBeInTheDocument()
  })

})

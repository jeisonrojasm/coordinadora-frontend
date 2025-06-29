import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button/Button'
import { Input } from '../../components/Input/Input'
import { Modal } from '../../components/Modal/Modal'
import { useModal } from '../../hooks/useModal'
import './SignUp.css'

export const SignUp = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [lastname, setLastname] = useState<string>('')

  const navigate = useNavigate()

  const [showModal, handleShow, handleClose] = useModal()
  const [modalMessage, setModalMessage] = useState<string>('')
  return (
    <div className="signup">
      <header className="signup__header">
        <h2 className="signup__subtitle">
          Coordinadora Mercantil S.A.
        </h2>
        <span className="signup__link" onClick={() => navigate('../sign-in')}>
          Inicio
        </span>
      </header>
      <div className="signup__form-container">
        <form className="signup__form">
          <h2 className="signup__title signup__title--first">
            Coordinadora Mercantil S.A
          </h2>
          <h2 className="signup__title signup__title--second">
            Crea tu cuenta
          </h2>
          <div className="signup__input-container">
            <Input
              label='Nombre'
              type='text'
              placeholder='Ingresa tu nombre'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="signup__input-container">
            <Input
              label='Apellido'
              type='text'
              placeholder='Ingresa tu apellido'
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <div className="signup__input-container">
            <Input
              label='Correo'
              type='email'
              placeholder='Ingresa tu correo'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="signup__input-container">
            <Input
              label='Contraseña'
              type='email'
              placeholder='Ingresa tu contraseña'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            text='Registrarme'
            isFullWidth
          />
        </form>
      </div>
      <Modal isOpen={showModal}>
        <Modal.Content>
          <p>
            {modalMessage}
          </p>
        </Modal.Content>
        <Modal.Buttons>
          <Button
            text='Ok'
            onClick={handleClose}
          />
        </Modal.Buttons>
      </Modal>
    </div>
  )
}

import { useContext, useState } from 'react'
import { Button } from '../../components/Button/Button'
import { Input } from '../../components/Input/Input'
import './SignIn.css'
import { onSignInSubmit } from './SignInFunctions'
import { Modal } from '../../components/Modal/Modal'
import { useModal } from '../../hooks/useModal'
import { DataContext } from '../../context/DataContext'
import { useNavigate } from 'react-router-dom'

export const SignIn = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [showModal, handleShow, handleClose] = useModal()
  const [modalMessage, setModalMessage] = useState<string>('')

  const dataContext = useContext(DataContext)

  const navigate = useNavigate()

  return (
    <div className="signin">
      <form
        className="signin__form"
        onSubmit={(e) => onSignInSubmit(
          e,
          { email, password },
          handleShow,
          setModalMessage,
          dataContext,
          navigate
        )}
      >
        <h2 className="signin__title signin__title--first">
          Coordinadora Mercantil S.A.
        </h2>
        <h2 className="signin__title signin__title--second">
          Iniciar sesión
        </h2>
        <div className="signin__input-container">
          <Input
            label='Correo electrónico'
            type='email'
            placeholder='Ingresa tu correo'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="signin__input-container">
          <Input
            label='Contraseña'
            type='password'
            placeholder='Ingresa tu contraseña'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button
          text='Iniciar sesión'
          isFullWidth
        />
        <div className="signin__footer-info">
          <p className="signin__not-registered-p">
            ¿No te encuentras registrado aún? <span className="signin__not-registered-p--link" onClick={() => navigate('../sign-up')}>Regístrate</span>
          </p>
        </div>
      </form>
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

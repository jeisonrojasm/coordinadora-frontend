import { Button } from '../../components/Button/Button'
import { Input } from '../../components/Input/Input'
import './SignIn.css'

export const SignIn = () => {
  return (
    <div className="signin">
      <div className="signin__form">
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
          />
        </div>
        <div className="signin__input-container">
          <Input
            label='Contraseña'
            type='password'
            placeholder='Ingresa tu contraseña'
          />
        </div>
        <Button
          text='Iniciar sesión'
        />
        <div className="signin__footer-info">
          <p className="signin__not-registered-p">
            ¿No te encuentras registrado aún? <span className="signin__not-registered-p--link">Regístrate</span>
          </p>
        </div>
      </div>
    </div>
  )
}

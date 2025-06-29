import type { FormEvent } from 'react'
import type { NavigateFunction } from 'react-router-dom'
import type { DataContextType } from '../../context/DataContextTypes'
import { setAuthToken } from '../../utils/functions'
import { loginUser } from '../../utils/queries'
import { signInSchema } from './SignInSchemas'
import type { SignInData } from './SignInTypes'

export const onSignInSubmit = async (
  e: FormEvent<HTMLFormElement>,
  data: SignInData,
  handleShow: () => void,
  setModalMessage: (message: string) => void,
  dataContext: DataContextType | undefined,
  navigate: NavigateFunction
) => {
  e.preventDefault()

  const showModalError = (message: string) => {
    setModalMessage(message)
    handleShow()
  }

  const result = signInSchema.safeParse(data)

  if (!result.success) {
    const formatted = result.error.format()
    if (formatted.email?._errors[0]) showModalError(formatted.email._errors[0])
    if (formatted.password?._errors[0]) showModalError(formatted.password._errors[0])
  } else {
    const json = await loginUser(data)

    if (!json.success) {
      if (json.body.message.includes('WRONG_CREDENTIALS')) {
        return showModalError('Las credenciales que ingresaste son incorrectas o el usuario no existe.')
      } else if (json.body.message.includes('TOO_MANY_LOGIN_ATTEMPTS')) {
        return showModalError('Has superado el máximo de intentos permitidos. Intenta nuevamente en 1 minuto.')
      } else {
        return showModalError('¡Ups! Ocurrió un error inesperado')
      }
    } else {
      const token = json.body.token
      setAuthToken(token)

      const user = json.body.user

      if (dataContext) {
        dataContext.setData({
          ...dataContext.data,
          email: user.email,
          lastname: user.lastname,
          name: user.name,
          userId: user.userId
        })

        navigate('../dashboard')
      }
    }
  }
}

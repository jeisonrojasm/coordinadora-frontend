import type { FormEvent } from 'react'
import type { NavigateFunction } from 'react-router-dom'
import type { DataContextType } from '../../context/DataContextTypes'
import { setAuthToken } from '../../utils/functions'
import { getAllCities, getAllStatus, loginUser } from '../../utils/queries'
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
    if (formatted.password?._errors[0]) showModalError(formatted.password._errors[0])
    if (formatted.email?._errors[0]) showModalError(formatted.email._errors[0])
  } else {
    const jsonLoginUser = await loginUser(data)

    if (!jsonLoginUser.success) {
      if (jsonLoginUser.body.message.includes('WRONG_CREDENTIALS')) {
        return showModalError('Las credenciales que ingresaste son incorrectas o el usuario no existe.')
      } else if (jsonLoginUser.body.message.includes('TOO_MANY_LOGIN_ATTEMPTS')) {
        return showModalError('Has superado el máximo de intentos permitidos. Intenta nuevamente en 1 minuto.')
      } else {
        return showModalError('¡Ups! Ocurrió un error inesperado')
      }
    } else {
      const token = jsonLoginUser.body.token
      setAuthToken(token)

      const user = jsonLoginUser.body.user

      const jsonGetCities = await getAllCities()
      const jsonGetStatus = await getAllStatus()

      if (!jsonGetCities.success || !Array.isArray(jsonGetCities.body)) {
        return showModalError('No se pudieron obtener las ciudades. Intenta nuevamente más tarde.')
      }

      if (!jsonGetStatus.success || !Array.isArray(jsonGetStatus.body)) {
        return showModalError('No se pudieron obtener los estados. Intenta nuevamente más tarde.')
      }

      const cities = jsonGetCities.body
      const status = jsonGetStatus.body

      if (dataContext) {
        dataContext.setData({
          ...dataContext.data,
          email: user.email,
          lastname: user.lastname,
          name: user.name,
          userId: user.userId,
          cities,
          status
        })

        navigate('../dashboard')
      }
    }
  }
}

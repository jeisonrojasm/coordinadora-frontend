import type { Dispatch, FormEvent, SetStateAction } from 'react'
import { registerUser } from '../../utils/queries'
import { signUpSchema } from './SignUpSchemas'
import type { SignUpData } from './SignUpTypes'

export const onSignUpSubmit = async (
  e: FormEvent<HTMLFormElement>,
  data: SignUpData,
  handleShow: () => void,
  setModalMessage: (message: string) => void,
  setSuccessfullyRegistered: Dispatch<SetStateAction<boolean>>
) => {
  e.preventDefault()

  const showModalError = (message: string) => {
    setModalMessage(message)
    handleShow()
  }

  const result = signUpSchema.safeParse(data)

  if (!result.success) {
    const formatted = result.error.format()
    if (formatted.password?._errors[0]) showModalError(formatted.password._errors[0])
    if (formatted.email?._errors[0]) showModalError(formatted.email._errors[0])
  } else {

    const json = await registerUser(data)

    if (!json.success) {
      if (json.body.message.includes('USER_ALREADY_EXISTS')) {
        return showModalError('El correo que digitaste ya se encuentra registrado. Intenta con otro distinto.')
      } else {
        return showModalError('¡Ups! Ocurrió un error inesperado')
      }
    } else {
      setSuccessfullyRegistered(true)
      return showModalError('Te has registrado exitosamente.')
    }
  }
}

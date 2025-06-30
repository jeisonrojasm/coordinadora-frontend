import type { Dispatch, FormEvent, SetStateAction } from 'react'
import { getAuthToken } from '../../utils/functions'
import { calculateQuote, createShipment } from '../../utils/queries'
import { CreateShipmentSchema, QuoteShippingSchema } from './QuoteShippingSchemas'
import type { CreateShipmentData, QuoteShippingData } from './QuoteShippingTypes'

export const onCalculateQuoteSubmit = async (
  e: FormEvent<HTMLFormElement>,
  data: QuoteShippingData,
  handleShow: () => void,
  setModalMessage: (message: string) => void,
  setPrice: Dispatch<SetStateAction<string>>
) => {
  e.preventDefault()

  const showModalError = (message: string) => {
    setModalMessage(message)
    handleShow()
  }

  const result = QuoteShippingSchema.safeParse(data)

  if (!result.success) {
    const formatted = result.error.format()
    if (formatted.length?._errors[0]) showModalError(formatted.length._errors[0])
    if (formatted.width?._errors[0]) showModalError(formatted.width._errors[0])
    if (formatted.height?._errors[0]) showModalError(formatted.height._errors[0])
    if (formatted.weight?._errors[0]) showModalError(formatted.weight._errors[0])
    if (formatted.destination?._errors[0]) showModalError(formatted.destination._errors[0])
    if (formatted.origin?._errors[0]) showModalError(formatted.origin._errors[0])
  } else {
    const parsedData = {
      origin: Number(data.origin),
      destination: Number(data.destination),
      weight: Number(data.weight),
      height: Number(data.height),
      width: Number(data.width),
      length: Number(data.length)
    }

    const token = getAuthToken()

    if (!token) {
      return showModalError('Por favor inicia sesión nuevamente.')
    }

    const jsonCalculateQuote = await calculateQuote(parsedData, token, handleShow, setModalMessage)

    if (!jsonCalculateQuote.success) {
      if (jsonCalculateQuote.body.message.includes('RATE_NOT_FOUND')) {
        return showModalError('No se encontró una tarifa disponible para este artículo. Es posible que sus dimensiones o peso excedan los límites permitidos. Intenta con otro paquete o verifica las dimensiones ingresadas.')
      }
    } else {
      setPrice(jsonCalculateQuote.body.price)
      showModalError(`¡Cotización exitosa! El costo estimado del envío es de $${Number(jsonCalculateQuote.body.price).toLocaleString('es-CO')} COP.<br /><br />¿Deseas continuar con el proceso de envío?`)
    }
  }
}

export const onCreateShipmentSubmit = async (
  e: FormEvent<HTMLFormElement>,
  data: CreateShipmentData,
  handleShow: () => void,
  setModalMessage: (message: string) => void,
  setOrderSent: Dispatch<SetStateAction<boolean>>
) => {
  e.preventDefault()

  const showModalError = (message: string) => {
    setModalMessage(message)
    handleShow()
  }

  const result = CreateShipmentSchema.safeParse(data)

  if (!result.success) {
    const formatted = result.error.format()
    if (formatted.price?._errors[0]) showModalError(formatted.price._errors[0])
    if (formatted.length?._errors[0]) showModalError(formatted.length._errors[0])
    if (formatted.width?._errors[0]) showModalError(formatted.width._errors[0])
    if (formatted.height?._errors[0]) showModalError(formatted.height._errors[0])
    if (formatted.weight?._errors[0]) showModalError(formatted.weight._errors[0])
    if (formatted.destination?._errors[0]) showModalError(formatted.destination._errors[0])
    if (formatted.origin?._errors[0]) showModalError(formatted.origin._errors[0])
  } else {
    const parsedData = {
      origin: Number(data.origin),
      destination: Number(data.destination),
      weight: Number(data.weight),
      height: Number(data.height),
      width: Number(data.width),
      length: Number(data.length),
      price: Number(data.price),
    }

    const token = getAuthToken()

    if (!token) {
      return showModalError('Por favor inicia sesión nuevamente.')
    }

    const jsonCreateShipment = await createShipment(parsedData, token, handleShow, setModalMessage)

    if (jsonCreateShipment.success) {
      setOrderSent(true)
      showModalError('La orden de envío ha sido creada correctamente. Puedes hacerle seguimiento en el apartado "Seguimiento de envíos".')
    }
  }
}

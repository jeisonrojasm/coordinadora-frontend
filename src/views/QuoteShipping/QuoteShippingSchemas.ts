import { z } from 'zod'

export const QuoteShippingSchema = z.object({
  origin: z.string().min(1, 'Selecciona una ciudad de origen'),
  destination: z.string().min(1, 'Selecciona una ciudad de destino'),

  weight: z.string().refine(val => {
    const num = Number(val)
    return !isNaN(num) && num > 0
  }, { message: 'El peso debe ser un número positivo' }),

  height: z.string().refine(val => {
    const num = Number(val)
    return !isNaN(num) && num > 0
  }, { message: 'El alto debe ser un número positivo' }),

  width: z.string().refine(val => {
    const num = Number(val)
    return !isNaN(num) && num > 0
  }, { message: 'El ancho debe ser un número positivo' }),

  length: z.string().refine(val => {
    const num = Number(val)
    return !isNaN(num) && num > 0
  }, { message: 'El largo debe ser un número positivo' }),
})

export const CreateShipmentSchema = z.object({
  origin: z.string().min(1, 'Selecciona una ciudad de origen'),
  destination: z.string().min(1, 'Selecciona una ciudad de destino'),

  weight: z.string().refine(val => {
    const num = Number(val)
    return !isNaN(num) && num > 0
  }, { message: 'El peso debe ser un número positivo' }),

  height: z.string().refine(val => {
    const num = Number(val)
    return !isNaN(num) && num > 0
  }, { message: 'El alto debe ser un número positivo' }),

  width: z.string().refine(val => {
    const num = Number(val)
    return !isNaN(num) && num > 0
  }, { message: 'El ancho debe ser un número positivo' }),

  length: z.string().refine(val => {
    const num = Number(val)
    return !isNaN(num) && num > 0
  }, { message: 'El largo debe ser un número positivo' }),

  price: z.string().refine(val => {
    const num = Number(val)
    return !isNaN(num) && num > 0
  }, { message: 'El precio debe ser un número positivo' }),
})
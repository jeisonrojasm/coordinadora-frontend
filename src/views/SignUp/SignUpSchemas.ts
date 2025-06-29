import { z } from 'zod'
import { EmailSchema, PasswordSchema } from '../../utils/global-schemas'

export const signUpSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres').trim(),
  lastname: z.string().min(3, 'El apellido debe tener al menos 3 caracteres').trim(),
})
import { z } from 'zod'
import { EmailSchema, PasswordSchema } from '../../utils/global-schemas'

export const signInSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema
})
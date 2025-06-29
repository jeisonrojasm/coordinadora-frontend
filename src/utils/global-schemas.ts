import * as z from 'zod'

export const EmailSchema = z.string().email('Correo no válido')

export const PasswordSchema = z.string()
  .min(8, 'La contraseña debe tener al menos 8 caracteres')
  .max(16, 'La contraseña no puede tener más de 16 caracteres')
  .regex(/[A-Z]/, 'La contraseña debe contener al menos una letra mayúscula')
  .regex(/[a-z]/, 'La contraseña debe contener al menos una letra minúscula')
  .regex(/[0-9]/, 'La contraseña debe contener al menos un número')
  .regex(/[^A-Za-z0-9]/, 'La contraseña debe contener al menos un carácter especial')
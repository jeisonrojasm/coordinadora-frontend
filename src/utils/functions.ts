export const setAuthToken = (token: string) => localStorage.setItem('authToken', token)
export const getAuthToken = () => localStorage.getItem('authToken')
export const clearAuthToken = () => localStorage.removeItem('authToken')

export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate)

  const day = date.toLocaleDateString('es-CO', {
    day: '2-digit',
  })

  const month = date.toLocaleDateString('es-CO', {
    month: 'long',
  })

  const year = date.getFullYear()

  const time = date.toLocaleTimeString('es-CO', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })

  // Capitalizamos el mes
  const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1)

  return `${day}/${capitalizedMonth}/${year} ${time}`
}

export const getViteHost = (): string => {
  // Vite runtime
  if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_HOST) {
    return import.meta.env.VITE_HOST
  }

  // Jest u otros entornos
  if (typeof process !== 'undefined' && process.env?.VITE_HOST) {
    return process.env.VITE_HOST
  }

  return 'http://localhost:3000'
}

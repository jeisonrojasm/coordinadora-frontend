import { clearAuthToken, getViteHost } from './functions'

const VITE_HOST = getViteHost()

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  endpoint: string
  body?: object
  token?: string
  handleShow?: () => void
  setModalMessage?: (msg: string) => void
}

export const request = async ({
  method = 'GET',
  endpoint,
  body,
  token,
  handleShow,
  setModalMessage,
}: RequestOptions) => {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    if (token) headers['Authorization'] = `Bearer ${token}`

    const response = await fetch(`${VITE_HOST}${endpoint}`, {
      method,
      headers,
      ...(body ? { body: JSON.stringify(body) } : {})
    })

    const json = await response.json()

    // Manejo centralizado de token inválido/expirado
    if (json?.body?.message === 'INVALID_OR_EXPIRED_TOKEN') {
      clearAuthToken()
      setModalMessage?.(
        `Tu sesión ha expirado. Por favor <strong>inicia sesión nuevamente</strong>.`
      )
      handleShow?.()
      return null
    }

    return json
  } catch (error) {
    console.error(`Error en request a ${endpoint}:`, error)
  }
}

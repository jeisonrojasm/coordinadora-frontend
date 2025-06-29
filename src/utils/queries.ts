const VITE_HOST = import.meta.env.VITE_HOST || 'http://localhost:3000'

export const loginUser = async (body: object) => {
  try {
    const response = await fetch(
      `${VITE_HOST}/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }
    )

    const json = response.json()
    return json
  } catch (error) {
    console.error('Error en loginUser:', error)
  }
}

export const registerUser = async (body: object) => {
  try {
    const response = await fetch(
      `${VITE_HOST}/auth/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }
    )

    const json = response.json()
    return json
  } catch (error) {
    console.error('Error en registerUser:', error)
  }
}
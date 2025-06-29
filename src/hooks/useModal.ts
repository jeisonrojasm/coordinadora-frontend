import { useEffect, useState } from 'react'

type UseModalReturn = [boolean, () => void, () => void]

export const useModal = (): UseModalReturn => {
  const [showModal, setShowModal] = useState<boolean>(false)

  const handleClose = () => setShowModal(false)

  const handleShow = () => setShowModal(true)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (showModal) {
        event.preventDefault() // Previene la acción predeterminada del teclado
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [showModal])

  return [showModal, handleShow, handleClose]
}
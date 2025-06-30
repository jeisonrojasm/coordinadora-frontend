import { createPortal } from 'react-dom'
import './Modal.css'
import type { ButtonsProps, ContentProps, ModalProps } from './ModalTypes'

export const Modal = ({ isOpen, children }: ModalProps) => {
  if (!isOpen) return null

  const modalRoot = document.getElementById('modal-root')
  if (!modalRoot) return null

  return createPortal(
    <section className="modal-background modal-opened">
      <div className="modal-body">{children}</div>
    </section>,
    modalRoot
  )
}

const Content = ({ children, width }: ContentProps) => {
  return (
    <div className={`modal-body-content ${width ?? ''}`}>
      {children}
    </div>
  )
}

const Buttons = ({ children, margin, className }: ButtonsProps) => {
  return (
    <div className={`modal-body-buttons ${margin ?? ''} ${className ?? ''}`}>
      {children}
    </div>
  )
}

Modal.Content = Content
Modal.Buttons = Buttons

import './Modal.css'
import type { ButtonsProps, ContentProps, ModalProps } from './ModalTypes'

export const Modal = ({ isOpen, children }: ModalProps) => {
  if (!isOpen) {
    return null
  }
  return (
    <section
      className={`modal-background ${!isOpen ? 'modal-closed' : 'modal-opened'}`}
    >
      <div className={'modal-body'}>{children}</div>
    </section>
  )
}

const Content = ({ children, width }: ContentProps) => {
  return (
    <div className={`modal-body-content ${!width ? '' : width}`}>{children}</div>
  )
}

const Buttons = ({ children, margin, className }: ButtonsProps) => {
  return (
    <div className={`modal-body-buttons ${!margin ? '' : margin} ${!className ? '' : className}`}>
      {children}
    </div>
  )
}

Modal.Content = Content
Modal.Buttons = Buttons
import type { ButtonProps } from './ButtonTypes'
import './Button.css'

export const Button: React.FC<ButtonProps> = ({ text, onClick, disabled, isFullWidth = false }) => {
  return (
    <button
      className={`button ${isFullWidth ? 'button--full-width' : 'button--no-full-width'}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

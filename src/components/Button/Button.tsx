import type { ButtonProps } from './ButtonTypes'
import './Button.css'

export const Button: React.FC<ButtonProps> = ({ text, onClick, disabled }) => {
  return (
    <button
      className="button"
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

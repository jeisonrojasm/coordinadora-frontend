import React from 'react'
import type { InputProps } from './InputTypes'
import './Input.css'

export const Input: React.FC<InputProps> = ({
  type = 'text',
  onChange,
  onBlur,
  placeholder = 'Escribe aquí...',
  label,
  value
}) => {
  return (
    <>
      {
        label
          ? (
            <>
              <h2 className="input__subtitle">{label}</h2>
              <input
                className="input"
                type={type}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                value={value}
              />
            </>
          )
          : (
            <input
              type={type}
              onChange={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              value={value}
            />
          )
      }
    </>
  )
}

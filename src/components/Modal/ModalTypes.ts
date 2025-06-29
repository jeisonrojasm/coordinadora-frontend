import type { ReactNode } from "react"

export interface ModalProps {
  isOpen: boolean
  children: ReactNode
}

export interface ContentProps {
  children: ReactNode
  width?: string
}

export interface ButtonsProps {
  children: ReactNode
  margin?: string
  className?: string
}
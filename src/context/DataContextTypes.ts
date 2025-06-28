import type { Dispatch, ReactNode, SetStateAction } from 'react'

export interface Data {
}

export interface DataContextType {
  data: Data
  setData: Dispatch<SetStateAction<Data>>
}

export interface DataProviderProps {
  children: ReactNode
}
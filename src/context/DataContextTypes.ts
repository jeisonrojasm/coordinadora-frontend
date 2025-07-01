import type { Dispatch, ReactNode, SetStateAction } from 'react'

export interface Data {
  email: string
  lastname: string,
  name: string,
  userId: string
  cities: City[],
  status: Status[],
}

export interface City {
  cityId: number
  cityName: string
}

export interface Status {
  statusId: number
  statusName: string
}

export interface DataContextType {
  data: Data
  setData: Dispatch<SetStateAction<Data>>
}

export interface DataProviderProps {
  children: ReactNode
}

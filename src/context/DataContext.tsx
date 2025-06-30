import { createContext, useState } from 'react'
import type { Data, DataContextType, DataProviderProps } from './DataContextTypes'

export const DataContext = createContext<DataContextType | undefined>(undefined)

export const DataProvider = ({ children }: DataProviderProps) => {
  const [data, setData] = useState<Data>({
    email: '',
    lastname: '',
    name: '',
    userId: '',
    cities: []
  })

  return (
    <DataContext.Provider value={{ data, setData }}>{children}</DataContext.Provider>
  )
}

import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { DataProvider } from './context/DataContext'
import { SignIn } from './views/SignIn/SignIn'

function App() {

  return (
    <>
      <DataProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/sign-in" replace />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      </DataProvider>
    </>
  )
}

export default App

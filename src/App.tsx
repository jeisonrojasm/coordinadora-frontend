import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { DataProvider } from './context/DataContext'
import { SignIn } from './views/SignIn/SignIn'

function App() {

  return (
    <>
      <DataProvider>
        <div className="app">
          <Routes>
            <Route path="/" element={<Navigate to="/sign-in" replace />} />
            <Route path="/sign-in" element={<SignIn />} />
          </Routes>
        </div>
      </DataProvider>
    </>
  )
}

export default App

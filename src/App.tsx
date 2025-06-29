import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { DataProvider } from './context/DataContext'
import { SignIn } from './views/SignIn/SignIn'
import { SignUp } from './views/SignUp/SignUp'

function App() {

  return (
    <>
      <DataProvider>
        <div className="app">
          <Routes>
            <Route path="/" element={<Navigate to="/sign-in" replace />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Routes>
        </div>
      </DataProvider>
    </>
  )
}

export default App

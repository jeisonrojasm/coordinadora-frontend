import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { MainLayout } from './components/MainLayout/MainLayout'
import { DataProvider } from './context/DataContext'
import { QuoteShipping } from './views/QuoteShipping/QuoteShipping'
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
            <Route path="/dashboard" element={<MainLayout />}>
              <Route index element={<Navigate to="quote-shipping" replace />} />
              <Route path="quote-shipping" element={<QuoteShipping />} />
              <Route path="shipment-tracking" element={<h1>Seguimiento de envíos</h1>} />
            </Route>
          </Routes>
        </div>
      </DataProvider>
    </>
  )
}

export default App

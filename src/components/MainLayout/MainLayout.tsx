import { Outlet } from 'react-router-dom'
import { NavBar } from "../NavBar/NavBar"
import './MainLayout.css'

export const MainLayout = () => {
  return (
    <>
      <NavBar />
      <main className="main-layout">
        <Outlet />
      </main>
    </>
  )
}
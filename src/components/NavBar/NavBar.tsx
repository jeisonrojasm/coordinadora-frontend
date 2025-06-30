import { NavLink } from 'react-router-dom'
import './NavBar.css'

export const NavBar = () => {
  return (
    <div className="navbar__header">
      <h2 className="navbar__subtitle">
        Coordinadora Mercantil S.A.
      </h2>
      <ul className="nabvar__buttons-list">
        <li>
          <NavLink to="quote-shipping" end className={({ isActive }) => isActive ? 'navbar__button-link active' : 'navbar__button-link '}>
            Cotizar envío
          </NavLink>
        </li>
        <li>
          <NavLink to="shipment-tracking" className={({ isActive }) => isActive ? 'navbar__button-link active' : 'navbar__button-link '}>
            Seguimiento de envíos
          </NavLink>
        </li>
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? 'navbar__button-link active' : 'navbar__button-link '}>
            Cerrar sesión
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

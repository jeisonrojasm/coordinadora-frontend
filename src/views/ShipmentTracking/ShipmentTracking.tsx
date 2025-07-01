import { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../context/DataContext'
import { formatDate, getAuthToken } from '../../utils/functions'
import { getUserShipments } from '../../utils/queries'
import './ShipmentTracking.css'
import type { Shipment } from './ShipmentTrackingTypes'

export const ShipmentTracking = () => {
  const dataContext = useContext(DataContext)
  const [shipments, setShipments] = useState<Shipment[]>([])

  useEffect(() => {
    const fetchUserShipments = async () => {
      try {
        const token = getAuthToken()
        const userId = dataContext?.data.userId

        if (!userId || !token) {
          console.error('userId o token no están definidos, no se puede obtener envíos.')
          return
        }

        const jsonGetUserShipments = await getUserShipments(userId, token)

        if (jsonGetUserShipments.success) {
          setShipments(jsonGetUserShipments.body)
        }
      } catch (error) {
        console.error('Error al obtener los envíos del usuario:', error)
      }
    }

    fetchUserShipments()
  }, [dataContext?.data.userId])

  return (
    <div className="shipment-tracking">
      <div className="shipment-tracking__container">
        {
          shipments.map((shipment, index) => (
            <div
              className="shipment-tracking__item"
              key={shipment.shipment_id}
            >
              <div className="shipment-tracking__item--centered">
                {index + 1}
              </div>
              <div className="shipment-tracking__item--centered">
                <div>
                  <p>Origen: <span>{shipment.origin_name}</span></p>
                  <p>Destino: <span>{shipment.destination_name}</span></p>
                  <p>Fecha de envìo: <span>{formatDate(shipment.created_at)}</span></p>
                </div>
              </div>
              <div className="shipment-tracking__item--centered">
                <div>
                  <p>Peso: <span>{shipment.weight} kg</span></p>
                  <p>Alto: <span>{shipment.height} cm</span></p>
                  <p>Ancho: <span>{shipment.width} cm</span></p>
                  <p>Largo: <span>{shipment.length} cm</span></p>
                </div>
              </div>
              <div className="shipment-tracking__item--centered">
                <p>${Number(shipment.price).toLocaleString('es-CO')} COP</p>
              </div>
              <div className="shipment-tracking__item--centered">
                <div>
                  <div>
                    <span className="shipment-tracking__status-icon">
                      {
                        shipment.status_name === 'En espera'
                          ? '🔴'
                          : shipment.status_name === 'En tránsito'
                            ? '🟡'
                            : '🟢'
                      }
                    </span>
                  </div>
                  <p>
                    {shipment.status_name}
                  </p>
                </div>
              </div>
              <div className="shipment-tracking__item--centered">
                <div>
                  <p>Cambiar estado</p>
                  <select id="">
                    <option value="" disabled>
                      Selecciona el estado
                    </option>
                    <option value="">En tránsito</option>
                    <option value="">Entregado</option>
                  </select>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

import { useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { DataContext } from '../../context/DataContext'
import { formatDate, getAuthToken, getViteHost } from '../../utils/functions'
import { getUserShipments } from '../../utils/queries'
import './ShipmentTracking.css'
import { onUpdateShipmentStatusChange } from './ShipmentTrackingFunctions'
import type { Shipment } from './ShipmentTrackingTypes'

const VITE_HOST = getViteHost()

const socket = io(VITE_HOST)

export const ShipmentTracking = () => {
  const dataContext = useContext(DataContext)
  const userId = dataContext?.data.userId

  const [shipments, setShipments] = useState<Shipment[]>([])

  const status = dataContext?.data.status

  useEffect(() => {
    socket.emit('joinRoom', userId)

    const handleShipmentUpdate = (updatedShipment: Shipment) => {
      setShipments(prev =>
        prev.map((shipment) => {
          return shipment.shipment_id === updatedShipment.shipment_id
            ? {
              ...shipment,
              status_name: updatedShipment.status_name,
              changed_at: updatedShipment.changed_at
            }
            : shipment
        })
      )
    }

    socket.on('shipmentStatusUpdated', handleShipmentUpdate)

    const fetchUserShipments = async () => {
      try {
        const token = getAuthToken()

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

    return () => {
      socket.off('shipmentStatusUpdated', handleShipmentUpdate)
    }
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
                  <select
                    value=""
                    onChange={e => onUpdateShipmentStatusChange(e, shipment)}
                  >
                    <option value="" disabled>
                      Selecciona el estado
                    </option>
                    {
                      status
                        ?.filter(s => s.statusName !== shipment.status_name)
                        .map(s => (
                          <option key={s.statusId} value={s.statusId}>
                            {s.statusName}
                          </option>
                        ))
                    }
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

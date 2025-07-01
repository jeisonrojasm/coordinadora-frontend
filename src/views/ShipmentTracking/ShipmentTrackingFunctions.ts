import type { ChangeEvent } from 'react'
import { getAuthToken } from '../../utils/functions'
import { updateShipmentStatus } from '../../utils/queries'
import type { Shipment } from './ShipmentTrackingTypes'

export const onUpdateShipmentStatusChange = async (
  e: ChangeEvent<HTMLSelectElement>,
  shipment: Shipment
) => {
  const newStatusId = Number(e.target.value)

  const token = getAuthToken()
  if (!token) {
    console.error('Token no disponible')
    return
  }

  updateShipmentStatus(
    {
      shipmentId: shipment.shipment_id,
      statusId: newStatusId
    },
    token
  )
}

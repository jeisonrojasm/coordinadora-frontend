import { request } from './request'

export const loginUser = (
  body: object
) => {
  return request({
    method: 'POST',
    endpoint: '/auth/login',
    body
  })
}

export const registerUser = (
  body: object,
) => {
  return request({
    method: 'POST',
    endpoint: '/auth/register',
    body
  })
}

export const getAllCities = () => {
  return request({
    method: 'GET',
    endpoint: '/city/getAll'
  })
}

export const calculateQuote = (
  body: object,
  token: string,
  handleShow?: () => void,
  setModalMessage?: (msg: string) => void
) => {
  return request({
    method: 'POST',
    endpoint: '/quote',
    body,
    token,
    handleShow,
    setModalMessage
  })
}

export const createShipment = (
  body: object,
  token: string,
  handleShow?: () => void,
  setModalMessage?: (msg: string) => void
) => {
  return request({
    method: 'POST',
    endpoint: '/shipment',
    body,
    token,
    handleShow,
    setModalMessage
  })
}

export const getUserShipments = (
  userId: string,
  token: string,
  handleShow?: () => void,
  setModalMessage?: (msg: string) => void
) => {
  return request({
    method: 'GET',
    endpoint: `/shipment/findAll/user/${userId}`,
    body: undefined,
    token,
    handleShow,
    setModalMessage
  })
}

export const getAllStatus = () => {
  return request({
    method: 'GET',
    endpoint: '/status/getAll'
  })
}

export const updateShipmentStatus = (
  body: object,
  token: string,
  handleShow?: () => void,
  setModalMessage?: (msg: string) => void
) => {
  return request({
    method: 'PATCH',
    endpoint: '/shipment/status',
    body,
    token,
    handleShow,
    setModalMessage
  })
}

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

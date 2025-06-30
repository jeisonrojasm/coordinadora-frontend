import { useContext, useEffect, useState } from 'react'
import { Button } from '../../components/Button/Button'
import { Input } from '../../components/Input/Input'
import { Modal } from '../../components/Modal/Modal'
import { DataContext } from '../../context/DataContext'
import { useModal } from '../../hooks/useModal'
import './QuoteShipping.css'
import { onCalculateQuoteSubmit, onCreateShipmentSubmit } from './QuoteShippingFunctions'

export const QuoteShipping = () => {

  const [origin, setOrigin] = useState<string>('')
  const [destination, setDestination] = useState<string>('')
  const [weight, setWeight] = useState<string>('')
  const [height, setHeight] = useState<string>('')
  const [width, setWidth] = useState<string>('')
  const [length, setLength] = useState<string>('')
  const [price, setPrice] = useState<string>('')
  const [readyToSend, setReadyToSend] = useState<boolean>(false)
  const [orderSent, setOrderSent] = useState<boolean>(false)

  const [showModal, handleShow, handleClose] = useModal()
  const [modalMessage, setModalMessage] = useState<string>('')

  const dataContext = useContext(DataContext)

  useEffect(() => {
    setReadyToSend(!!price)
  }, [price])

  return (
    <>
      <div className="quote-shipping">
        <form className="quote-shipping__form"
          onSubmit={(e) => {
            if (readyToSend) {
              onCreateShipmentSubmit(
                e,
                {
                  origin,
                  destination,
                  weight,
                  height,
                  width,
                  length,
                  price
                },
                handleShow,
                setModalMessage,
                setOrderSent
              )
            } else {
              onCalculateQuoteSubmit(
                e,
                {
                  origin,
                  destination,
                  weight,
                  height,
                  width,
                  length
                },
                handleShow,
                setModalMessage,
                setPrice
              )
            }
          }}
        >
          <h2 className="quote-shipping__title quote-shipping__title--first">
            Coordinadora Mercantil S.A
          </h2>
          <h2 className="quote-shipping__title quote-shipping__title--second">
            Cotizar envío
          </h2>

          <div className="quote-shipping__input-container">
            <h2 className="input__subtitle">Origen</h2>
            <select
              className="quote-shipping__select"
              value={origin}
              onChange={(e) => {
                setPrice('')
                const selected = e.target.value
                setOrigin(selected)
                if (selected === destination) setDestination('')
              }}
            >
              <option value="" disabled>
                Selecciona la ciudad de origen
              </option>
              {dataContext?.data.cities
                .filter(city => String(city.cityId) !== destination)
                .map(city => (
                  <option key={city.cityId} value={String(city.cityId)}>
                    {city.cityName}
                  </option>
                ))}
            </select>
          </div>

          <div className="quote-shipping__input-container">
            <h2 className="input__subtitle">Destino</h2>
            <select
              className="quote-shipping__select"
              value={destination}
              onChange={(e) => {
                setPrice('')
                const selected = e.target.value
                setDestination(selected)
                if (selected === origin) setOrigin('')
              }}
            >
              <option value="" disabled>
                Selecciona la ciudad de destino
              </option>
              {dataContext?.data.cities
                .filter(city => String(city.cityId) !== origin)
                .map(city => (
                  <option key={city.cityId} value={String(city.cityId)}>
                    {city.cityName}
                  </option>
                ))}
            </select>
          </div>
          <div className="quote-shipping__input-container">
            <Input
              label='Peso (kg)'
              type='number'
              placeholder='Ingresa el peso del artículo'
              value={weight}
              onChange={(e) => {
                setPrice('')
                setWeight(e.target.value)
              }}
            />
          </div>
          <div className="quote-shipping__input-container">
            <Input
              label='Alto (cm)'
              type='number'
              placeholder='Ingresa el alto del artículo'
              value={height}
              onChange={(e) => {
                setPrice('')
                setHeight(e.target.value)
              }}
            />
          </div>
          <div className="quote-shipping__input-container">
            <Input
              label='Ancho (cm)'
              type='number'
              placeholder='Ingresa el ancho del artículo'
              value={width}
              onChange={(e) => {
                setPrice('')
                setWidth(e.target.value)
              }}
            />
          </div>
          <div className="quote-shipping__input-container">
            <Input
              label='Largo (cm)'
              type='number'
              placeholder='Ingresa el largo del artículo'
              value={length}
              onChange={(e) => {
                setPrice('')
                setLength(e.target.value)
              }}
            />
          </div>
          {price && (
            <div className="quote-shipping__price">
              <strong>Costo estimado del envío:</strong> ${Number(price).toLocaleString('es-CO')} COP
            </div>
          )}
          <Button
            text={price ? 'Realizar envío' : 'Cotizar'}
            isFullWidth
          />
        </form>
      </div>
      <Modal isOpen={showModal}>
        <Modal.Content>
          <p dangerouslySetInnerHTML={{ __html: modalMessage }} />
        </Modal.Content>
        <Modal.Buttons>
          {
            price && !orderSent
              ? (
                <>
                  <Button
                    text='Cancelar'
                    onClick={() => {
                      setPrice('')
                      handleClose()
                    }}
                  />
                  <Button
                    text='Continuar'
                    onClick={handleClose}
                  />
                </>
              )
              : (
                <Button
                  text='Ok'
                  onClick={() => {
                    if (!orderSent) {
                      handleClose()
                    } else {
                      handleClose()
                      setOrigin('')
                      setDestination('')
                      setWeight('')
                      setHeight('')
                      setWidth('')
                      setLength('')
                      setPrice('')
                      setReadyToSend(false)
                      setOrderSent(false)
                    }
                  }}
                />
              )
          }
        </Modal.Buttons>
      </Modal>
    </>
  )
}

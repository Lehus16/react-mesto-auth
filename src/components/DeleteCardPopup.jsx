import React, { useContext } from 'react'
import PopupWithForm from './PopupWithForm'
import { CardContext } from '../contexts/CardContext'
const DeleteCardPopup = ({ name, title, buttonText, isOpen, onClose, onSubmit, isLoading }) => {


  const card = useContext(CardContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(card)
  }


  return (
    <PopupWithForm onSubmit={handleSubmit} isOpen={isOpen} onClose={onClose} name={name} title={title} buttonText={!isLoading ? 'Сохранение...' : buttonText} />

  )
}

export default DeleteCardPopup

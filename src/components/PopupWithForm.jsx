import React from "react";

const PopupWithForm = ({ name, title, buttonText, children, isOpen, onClose, onSubmit, isValid }) => {

  return (

    <div>
      <div onClick={() => {
        onClose();
      }} className={`popup popup-${name} popup-overlay ${isOpen ? 'popup__openned' : ''}`}>
        <div onClick={(e) => e.stopPropagation()} className="popup__window">
          <form
            onSubmit={onSubmit}
            autoComplete="off"
            noValidate={true}
            name={`popup-${name}`}
            className={`popup__form popup-${name}__form`}
          >
            <h2 className="popup__title">{title}</h2>
            {children}
            <button
              // disabled={!isValid}
              aria-label="Сохранить"
              type="submit"
              className={`popup__button popup__button-save ${isValid ? '' : 'popup__button_disabled'}`}
            >
              {buttonText}
            </button>
          </form>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            aria-label="Закрыть окно редактирования"
            type="button"
            className={`popup-${name}__button-close popup__button-close`}
          />
        </div>
      </div>
    </div>
  )

};

export default PopupWithForm;

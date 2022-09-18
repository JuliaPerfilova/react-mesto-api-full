import Popup from './Popup.js';

function PopupWithForm({ popupType, popupTitle, saveButtonText, children, isOpen, onClose, onSubmit }) {
  return (
    <Popup
      popupType={popupType}
      isOpen={isOpen}
      onClose={onClose}
      containerType="popup__container"
    >
      <h2 className="popup__title">{popupTitle}</h2>
      <form className="popup__form" name={`${popupType}-form`} onSubmit={onSubmit} noValidate>
        <fieldset className={`popup__${popupType}-fieldset`}>
          {children}
        </fieldset>
        <button type="submit" className="popup__save-button">{saveButtonText}</button>
      </form>
    </Popup>
  )
}

export default PopupWithForm
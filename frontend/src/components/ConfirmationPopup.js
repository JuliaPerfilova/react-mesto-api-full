import PopupWithForm from './PopupWithForm';

function ConfirmationPopup() {
  return (
    <PopupWithForm
      popupType="confirmation"
      popupTitle="Вы уверены?"
      saveButtonText="Сохранить"
    >
      <div className="popup popup_type_confirmation">
        <div className="popup__container">
          <button type="button" className="popup__close-button"></button>
          <h2 className="popup__title">Вы уверены?</h2>
          <button type="button" className="popup__confirm-button">Да</button>
        </div>
      </div>
    </PopupWithForm>
  )
}

export default ConfirmationPopup;
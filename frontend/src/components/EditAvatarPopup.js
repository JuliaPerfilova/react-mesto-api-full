import PopupWithForm from './PopupWithForm';
import React from 'react';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  
  const avatarRef = React.useRef();
  
  const handleSubmit = (evt) => {
    evt.preventDefault();
  
    onUpdateAvatar(
      avatarRef.current.value
    );
  }

  React.useEffect(() => {
    if (isOpen) {
      avatarRef.current.value='';
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      popupType="avatar"
      popupTitle="Обновить аватар"
      saveButtonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__form-field">
        <input
          ref={avatarRef}
          className="popup__input"
          type="url"
          name="link"
          id="avatar-link"
          required
        />
        <span className="popup__input-error" id="avatar-link-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
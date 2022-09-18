import PopupWithForm from './PopupWithForm';
import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, isOpen]);

  const handleNameChange = (evt) => {
    setName(evt.target.value);
  }

  const handleDescriptionChange = (evt) => {
    setDescription(evt.target.value);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onUpdateUser({
      name: name,
      about: description,
    })
  }

  return (
    <PopupWithForm
      popupType="profile"
      popupTitle="Редактировать профиль"
      saveButtonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__form-field">
        <input
          className="popup__input"
          type="text"
          name="name"
          id="name"
          placeholder="Имя"
          required
          minLength="2"
          maxLength="40"
          value={name}
          onChange={handleNameChange}
        />
        <span className="popup__input-error" id="name-error"></span>
      </label>
      <label className="popup__form-field">
        <input
          className="popup__input"
          type="text"
          name="about"
          id="about-person"
          placeholder="Профессия"
          required
          minLength="2"
          maxLength="200"
          value={description}
          onChange={handleDescriptionChange}
        />
        <span className="popup__input-error" id="about-person-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
import PopupWithForm from './PopupWithForm';
import React from 'react';

function AddPlacePopup ({isOpen, onClose, onAddPlace}) {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  const handleNameChange = (evt) => {
    setName(evt.target.value);
  }

  const handleLinkChange = (evt) => {
    setLink(evt.target.value);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onAddPlace({
      name: name,
      link: link
    });
  }

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  return (
    <PopupWithForm
      popupType="card"
      popupTitle="Новое место"
      saveButtonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__form-field">
        <input
          className="popup__input"
          type="text"
          name="name"
          id="picture-name"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
          value={name}
          onChange={handleNameChange}
        />
        <span className="popup__input-error" id="picture-name-error"></span>
      </label>
      <label className="popup__form-field">
        <input
          className="popup__input"
          type="url"
          name="link"
          id="picture-link"
          placeholder="Ссылка на картинку"
          required
          value={link}
          onChange={handleLinkChange}
        />
        <span className="popup__input-error" id="picture-link-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup ;
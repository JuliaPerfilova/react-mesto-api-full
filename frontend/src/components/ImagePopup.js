import Popup from "./Popup.js";

function ImagePopup({isOpen, onClose, selectedCard}) {
  return (
    <Popup
      popupType="image"
      isOpen={isOpen}
      onClose={onClose}
      containerType="popup__image-container"
    >
      <img className="popup__image" src={selectedCard.link} alt={selectedCard.name}></img>
      <h2 className="popup__image-title">{selectedCard.name}</h2>
    </Popup>
  )
}

export default ImagePopup;
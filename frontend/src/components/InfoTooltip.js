import Popup from './Popup.js';

function InfoTooltip({ isSuccess, text, onClose }) {
  return (
    <Popup
      isOpen={!!text}
      onClose={onClose}
      containerType="popup__container"
      popupType="image"
    >
      <div className={`popup__icon ${isSuccess ? "popup__icon_accepted" : "popup__icon_denied"}`}></div>
      <p className="popup__icon-text">{text}</p>
    </Popup>
  );
}
export default InfoTooltip;
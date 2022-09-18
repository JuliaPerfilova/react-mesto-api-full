function Popup({ popupType, containerType, children, isOpen, onClose}) {
  return (
    <div className={`popup popup_type_${popupType}${isOpen && ' popup_opened'}`}>
      <div className={containerType}>
        <button type="button" className="popup__close-button" onClick={onClose}></button>
        {children}
      </div>
    </div>
  )
}

export default Popup
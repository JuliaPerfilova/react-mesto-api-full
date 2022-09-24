import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner === currentUser._id;
  
  const cardDeleteButtonClassName = (
    `element__delete-button ${isOwn ? 'element__delete-button_visible' : 'element__delete-button_hidden'}`
  ); 

  const isLiked = card.likes.some(i => i === currentUser._id);

  const cardLikeButtonClassName = `element__like-button ${isLiked ? 'element__like-button_active' : ''}`;

  const handleImageClick = () => {
    onCardClick(card);
  }

  const handleLikeClick = () => {
    onCardLike(card);
  }

  const handleDeleteClick =() => {
    onCardDelete(card);
  }

  return (
    <article className="element">
      <img 
        className="element__image" 
        src={card.link} 
        alt={card.name} 
        onClick={handleImageClick}>
      </img>
      <button 
        className={cardDeleteButtonClassName} 
        type="button" 
        aria-label="delete-button" 
        onClick={handleDeleteClick}>
      </button>
      <div className="element__description">
        <h2 className="element__name">{card.name}</h2>
        <div className="element__like-container">
          <button 
            className={cardLikeButtonClassName} 
            aria-label="like-button" 
            type="button" 
            onClick={handleLikeClick}>
          </button>
          <span className="element__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </article>
  )
}

export default Card;
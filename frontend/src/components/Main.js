import React from "react";
import Card from "./Card.js";
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete}) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__block">
          <div className="profile__avatar-block">
            <div style={{ backgroundImage: `url(${currentUser.avatar})` }} className="profile__avatar-image"></div>
            <div className="profile__avatar-overlay" onClick={onEditAvatar}></div>
          </div>
          <div className="profile__info">
            <div className="profile__name-block">
              <h1 className="profile__name">{currentUser.name}</h1>
              <p className="profile__about">{currentUser.about}</p>
            </div>
            <button type="button" aria-label="edit-button" className="profile__edit-button" onClick={onEditProfile}>
            </button>
          </div>
        </div>
        <button type="button" aria-label="add-button" className="profile__add-button" onClick={onAddPlace}>
        </button>
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  )
}

export default Main;
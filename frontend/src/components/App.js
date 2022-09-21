import '../index.css';
import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import ConfirmationPopup from './ConfirmationPopup.js';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import api from '../utils/api.js';
import { Route, Switch, withRouter } from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute.js';
import InfoTooltip from './InfoTooltip.js';
import { useHistory } from "react-router-dom";
import * as auth from '../utils/auth.js';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});
  const [cards, setCards] = React.useState([]);
  
  const [infoTooltipText, setInfoTooltipText] = React.useState(null);
  const [isInfoTooltipSuccess, setIsInfoTooltipSuccess] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({name: '', about: ''});

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userMail, setUserMail] = React.useState(false);

  const history = useHistory();

  const handleLogin = (email) => {
    //api.setToken(token);
    setIsLoggedIn(true);
    setUserMail(email);
    getProfile();
  }

  // React.useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     auth.checkToken(token)
  //     .then((data) => {
  //       if (data) {
  //         handleLogin(data.email, token);
  //         history.push("/");
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   }
  // }, []);

  React.useEffect(() => {
    auth.checkToken()
    .then((data) => {
      if (data) {
        handleLogin(data.email);
        history.push("/");
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  const getProfile = () => {
    Promise.all([api.getMyProfile(), api.getInitialCards()])
      .then(([userData, initialCards]) => {
        setCurrentUser(userData);
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCardLike = (card) => {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    (isLiked ? api.dislikeCard(card._id) : api.likeCard(card._id))
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  const handleCardDelete =(card) => {
    api.removeCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setIsImagePopupOpen(false);
    setInfoTooltipText(null);
  }
  
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  const openInfoTooltip = (isSuccess, text) => {
    setIsInfoTooltipSuccess(isSuccess);
    setInfoTooltipText(text);
  }

  const handleUpdateUser = (userData) => {
    api.updateProfile(userData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleUpdateAvatar = (userData) => {
    api.updateAvatar(userData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleAddPlaceSubmit = (card) => {
    api.createCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]); 
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleLogOut = () => {
    setIsLoggedIn(false);
    setCurrentUser({});
    setUserMail('');
    //localStorage.removeItem('token');
  }

  const handleLoginSubmit = (email, password) => {
    if (!email || !password) {
      console.log("Заполнены не все поля")
      return;
    }
    return auth.authorize(email, password)
      .then(() => {
        handleLogin(email);
        history.push('/');
      });
  }

  const handleRegisterSubmit = (email, password) => {
    if (!email || !password) {
      console.log("Заполнены не все поля")
      return;
    }
    return auth.register(email, password)
    .then(() => {
      openInfoTooltip(true, 'Вы успешно зарегистрировались!');
      history.push('/sign-in');
    });
  }
  
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          email={userMail}
          isLoggedIn={isLoggedIn}
          onLogOut={handleLogOut}
        />
        <Switch>
          <Route path="/sign-up">
            <Register
              openInfoTooltip={openInfoTooltip}
              onRegisterSubmit={handleRegisterSubmit}
            />
          </Route>
          <Route path="/sign-in">
            <Login
              openInfoTooltip={openInfoTooltip}
              onLoginSubmit={handleLoginSubmit}
            />
          </Route>
          <ProtectedRoute path="/" loggedIn={isLoggedIn}>
            <Main
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          </ProtectedRoute>
        </Switch>
        <Footer />
      </div>
        <InfoTooltip
          isSuccess={isInfoTooltipSuccess}
          text={infoTooltipText}
          onClose={closeAllPopups}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={(closeAllPopups)}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <ConfirmationPopup
        />
        <ImagePopup
          isOpen={isImagePopupOpen}
          onClose={(closeAllPopups)}
          selectedCard={selectedCard}
        />
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);

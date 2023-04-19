import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import PopupWithForm from './PopupWithForm.js';
import api from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupStatus] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupStatus] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupStatus] = React.useState(false);
  const [selectedCard, setSelectedCardStatus] = React.useState({ name: '', link: '' });
  const [currentUser, setCurrentUser] = React.useState({ name: '', about: '' });
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getCurrentUser()
      .then(info => {
        setCurrentUser(info);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  React.useEffect(() => {
    api.getCards()
      .then(data => {
        setCards(data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  function handleEditAvatarClick() {
    setEditAvatarPopupStatus(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupStatus(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupStatus(true);
  }

  function closeAllPopups() {
    setEditAvatarPopupStatus(false);
    setEditProfilePopupStatus(false);
    setAddPlacePopupStatus(false);
    setSelectedCardStatus({ name: '', link: '' });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      const result = cards.filter(renderedCard => renderedCard._id !== card._id);
      setCards(result);
    })
  }

  function handleUpdateUser(newInfo) {
    api.editPersonalInfo(newInfo)
      .then(userInfo => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleUpdateAvatar(avatar) {
    api.editAvatar(avatar)
      .then(newAvatar => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleAddPlaceSubmit(item) {
    api.createNewCard(item).then((newCard) => {
      setCards([newCard, ...cards]); 
      closeAllPopups();
    })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={(data) => setSelectedCardStatus(data)}
          cards={cards}
          onCardLike={(data) => handleCardLike(data)}
          onCardDelete={(data) => handleCardDelete(data)}
        />
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={(newInfo) => handleUpdateUser(newInfo)} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={(newCard) => handleAddPlaceSubmit(newCard)} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={(avatar) => handleUpdateAvatar(avatar)} />
        <PopupWithForm name='confirm' title='Вы уверены?' onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import PopupWithForm from './PopupWithForm.js';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupStatus] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupStatus] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupStatus] = React.useState(false);
  const [selectedCard, setSelectedCardStatus] = React.useState({ name: '', link: '' });

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

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={(data) => setSelectedCardStatus(data)}
      />
      <Footer />
      <PopupWithForm name='edit-profile' title='Редактировать профиль' isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
        <input className="popup__form-item popup__form-item_el_name" type="text" id="name" name="name" required
          minLength="2" maxLength="40" placeholder="Имя" />
        <span className="name-error popup__form-error"></span>
        <input className="popup__form-item popup__form-item_el_job" type="text" id="job" name="about" required
          minLength="2" maxLength="200" placeholder="О себе" />
        <span className="job-error popup__form-error"></span>
      </PopupWithForm>
      <PopupWithForm name='new-card' title='Новое место' isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
        <input className="popup__form-item popup__form-item_el_title" type="text" id="title" name="name"
          placeholder="Название" required minLength="2" maxLength="30" />
        <span className="title-error popup__form-error"></span>
        <input className="popup__form-item popup__form-item_el_link" type="url" id="link" name="link"
          placeholder="Ссылка на картинку" required />
        <span className="link-error popup__form-error"></span>
      </PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <PopupWithForm name='edit-avatar' title='Обновить аватар' isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
        <input className="popup__form-item popup__form-item_el_avatar" type="url" id="avatar" name="avatar"
          placeholder="Ссылка на новый аватар" required />
        <span className="avatar-error popup__form-error"></span>
      </PopupWithForm>
      <PopupWithForm name='confirm' title='Вы уверены?' onClose={closeAllPopups} />
    </div>
  );
}

export default App;
import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name: name,
            about: description,
        });
    }

    return (
        <PopupWithForm name='edit-profile' title='Редактировать профиль' isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <input className="popup__form-item popup__form-item_el_name" type="text" id="name" name="name" required
                minLength="2" maxLength="40" placeholder="Имя" value={name} onChange={handleNameChange} />
            <span className="name-error popup__form-error"></span>
            <input className="popup__form-item popup__form-item_el_job" type="text" id="job" name="about" required
                minLength="2" maxLength="200" placeholder="О себе" value={description} onChange={handleDescriptionChange} />
            <span className="job-error popup__form-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;
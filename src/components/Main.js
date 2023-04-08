import React from 'react';
import api from '../utils/Api.js';
import Card from './Card.js';

function Main(props) {
    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        api.getCurrentUser()
            .then(info => {
                setUserName(info.name);
                setUserDescription(info.about);
                setUserAvatar(info.avatar);
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

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__content">
                    <div className="profile__avatar" style={{ backgroundImage: `url("${userAvatar}")` }}>
                        <button className="profile__edit-avatar-button" onClick={props.onEditAvatar} type="button"></button>
                    </div>
                    <div className="profile__info">
                        <div className="profile__title">
                            <h1 className="profile__name">{userName}</h1>
                            <button className="profile__edit-button" onClick={props.onEditProfile} type="button"></button>
                        </div>
                        <p className="profile__job">{userDescription}</p>
                    </div>
                </div>
                <button className="profile__add-button" onClick={props.onAddPlace} type="button"></button>
            </section>
            <section className="elements">
                {cards.map(card => {
                    return (<Card key={card._id} card={card} onCardClick={(data) => props.onCardClick(data)} />);
                })}
            </section>
        </main>
    );
}

export default Main;
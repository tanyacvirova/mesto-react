function Card(props) {
    function handleClick() {
        props.onCardClick(props.card);
      } 

    return (
        <article className="element">
            <img className="element__photo" src={props.card.link} onClick={handleClick} alt={`Фото. ${props.card.name}`} />
            <button className="element__delete" type="button"></button>
            <div className="element__info">
                <h2 className="element__title">{props.card.name}</h2>
                <div className="element__like-container">
                    <button className="element__like" type="button"></button>
                    <p className="element__like-count">{props.card.likes.length}</p>
                </div>
            </div>
        </article>
    );
}

export default Card;
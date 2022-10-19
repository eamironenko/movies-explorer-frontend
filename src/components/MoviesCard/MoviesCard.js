import './MoviesCard.css';
const nameRU = "фильм";
const duration = 20;

function MoviesCard({card, saveButton}) {
    return (
        <li className="moviesCardList__element">
        <div className="moviesCardList__caption">
          <div className="moviesCardList__data">
            <p className="moviesCardList__title">{nameRU}</p>
            <p className="moviesCardList__duration">{`${duration} минут`}</p>
          </div>
          <button className="moviesCardList__save" type="button" alt="Фильм сохранен" src={saveButton}></button>
        </div>
        <img className="moviesCardList_card" alt="Постер" src={card}/>
      </li>
    )
}
export default MoviesCard;
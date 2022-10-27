import React from "react";
import closeButton from '../../images/movie_close.svg';

function SavedMoviesCard({ ...card }) {
  return (
    <li className="moviesCardList__element">
      <div className="moviesCardList__caption">
        <div className="moviesCardList__data">
          <p className="moviesCardList__title">{card.nameRU}</p>
          <span className="moviesCardList__duration">{card.duration}</span>
        </div>
        <button className="moviesCardList__save" type="button" >
          <img className="moviesCardList__savePic" src={closeButton} alt="фильм сохранен" />
        </button>
      </div>
      <img className="moviesCardList_card" alt="Постер" src={card.thumbnail} />
    </li>
  )
}

export default SavedMoviesCard;
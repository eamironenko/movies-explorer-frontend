import React from 'react';
import './MoviesCard.css';
import likeButton from '../../images/movie_save.svg'

function MoviesCard({ ...card }) {
  return (
    <li className="moviesCardList__element">
      <div className="moviesCardList__caption">
        <div className="moviesCardList__data">
          <p className="moviesCardList__title">{card.nameRU}</p>
          <p className="moviesCardList__duration">{card.duration}</p>
        </div>
        <button className="moviesCardList__save" type="button" >
          <img className="moviesCardList__savePic" src={likeButton} alt="фильм сохранен" />
        </button>
      </div>
      <img className="moviesCardList_card" alt="Постер" src={card.thumbnail} />
    </li>
  )
}
export default MoviesCard;
import React from 'react';
import './MoviesCard.css';
import { BASE_URL_image } from '../../utils/constants';

function MoviesCard({ 
  movie, 
  onSaveMovies, 
  isLoading, 
  isSaved, 
  onDeleteMovie, 
  icon, 
  isSavePage}) {

  const handleAddMovie = () => {
    onSaveMovies(movie);
  }
  const handleDeleteMovie = () => {
      onDeleteMovie(movie)
  }
  //console.log(movie)
  //console.log(isSavePage)
  //console.log(isSaved)
  
  return (
    <li className="moviesCardList__element">
      <div className="moviesCardList__caption">
        <div className="moviesCardList__data">
          <p className="moviesCardList__title">{movie.nameRU}</p>
          <p className="moviesCardList__duration">{`${movie.duration} минут`}</p>
        </div>
        <button className="moviesCardList__save"
          type="button"
          onClick={isSavePage  ? handleDeleteMovie : handleAddMovie}
          disabled={isLoading}>
          <img className='moviesCardList__savePic'
            src={icon}
            alt={isSaved ? "Кнопка удаления фильма": "Кнопка сохранения фильма"} />
        </button>
      </div>
      <a className='movieCardList__link'
        target="_blank"
        rel="noreferrer"
        href={movie.trailerLink}>
        <img className="moviesCardList__card"
          alt="Постер к фильму"
          src={!isSavePage ? `${BASE_URL_image}${movie.image.url}` : `${movie.image}`} />
      </a>
    </li>
  )
}
export default MoviesCard;
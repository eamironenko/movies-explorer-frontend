import React, {useMemo} from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { Route, Switch } from 'react-router-dom';
//-----кнопки
import savedButton from "../../images/movie_save_active.svg";
import closeButton from '../../images/movie_close.svg';
import likeButton from "../../images/movie_save.svg";

function MoviesCardList({
  isLoading,
  displayMovies,
  moviesBasic,
  onSaveMovies,
  onAddMovie,
  findMovies,
  onDeleteMovie,
  isSavePage
}) {
  console.log(findMovies)
  console.log(displayMovies)
  const [disabledBtn, setDisabledBtn] = React.useState(false);

  const selectedMoviesId = useMemo(() => moviesBasic.map((movie) => {
    // console.log (movie) 
    return movie.movie.movieId}), [moviesBasic])
  // console.log(selectedMoviesId)


  function handleLoadMore() {
    onAddMovie(findMovies);
  }
  
  React.useEffect(() => {
    if (findMovies.length === displayMovies.length ||
      findMovies.length < displayMovies.length) {
      setDisabledBtn(true);
    } else {
      setDisabledBtn(false);
    }
  }, [ displayMovies.length, findMovies.length]);

  return (
    <>
    <section className="moviesCardList__container">
        {displayMovies.map((movie, movieId) => {
            return (
              <MoviesCard
                movie={movie.movie??movie}
                key={movieId}
                isLoading={isLoading}
                moviesBasic={moviesBasic}                
                onSaveMovies={onSaveMovies}
                onDeleteMovie={onDeleteMovie}
                isSaved = {selectedMoviesId.includes(movie.movie?.movieI?? movie.id)}
                icon={!selectedMoviesId.includes(movie.movie?.movieId?? movie.id) ? likeButton :  isSavePage ? closeButton : savedButton}
                isSavePage={isSavePage}
                />
            )
        }
        )}
      </section>
      <Switch>
        <Route path="/movies">
          <button
            className={`${!disabledBtn && displayMovies.length > 3 ? 'moviesCardList__button' : "moviesCardList__button_visible"}`}
            type="button"
            onClick={handleLoadMore}
            disabled={disabledBtn}>Еще</button>
        </Route>
      </Switch>
    </>
  )

}

export default MoviesCardList;
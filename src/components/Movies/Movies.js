import React from 'react';
import './Movies.css';

import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies({
  loggedIn,
  isLoading,
  state,
  onFindMovies,
  displayMovies,
  onSaveMovies,
  moviesBasic,
  onSwitchCheckbox,
  checked,
  onAddMovie,
  findMovies,
  onDeleteMovie,
  message,
  setMessage,
  }) {

    return (
        <div className='page'>
            <Header loggedIn={loggedIn} setMessage={setMessage} />
            <main className='main'>
                <div className='movies'>
                    <SearchForm
                        isLoading={isLoading}
                        onFindMovies={onFindMovies}
                        onSwitchCheckbox={onSwitchCheckbox}
                        checked={checked}
                    />
                    <span className={`${message ? 'movies__error' : 'movies__error_visible'}`}>{message}</span>
                    <MoviesCardList
                        isLoading={isLoading}
                        moviesBasic={moviesBasic}
                        displayMovies={displayMovies}
                        onSaveMovies={onSaveMovies}
                        onAddMovie={onAddMovie}
                        findMovies={findMovies}
                        onDeleteMovie={onDeleteMovie}
                    />
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Movies;

import React, { useEffect } from 'react';
import './SavedMovies.css';

import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies({
    isLoading,
    loggedIn,
    state,
    onSaveFindMovies,
    findMoviesBasic,
    moviesBasic,
    onDeleteMovie,
    onSavedCheckbox,
    checkedSave,
}) {

  //console.log(moviesBasic)

  return (
    <div className='page'>
      <Header loggedIn={loggedIn}/>
      <main className='main'>
        <div className='savedMovies'>
          <SearchForm
            isLoading={isLoading}
            onFindMovies={onSaveFindMovies}
            onSwitchCheckbox={onSavedCheckbox}
            checked={checkedSave}
            isSavePage
          />
          <MoviesCardList
            isLoading={isLoading}
            displayMovies={findMoviesBasic}
            moviesBasic={moviesBasic}
            onDeleteMovie={onDeleteMovie}
            findMovies={findMoviesBasic}
            isSavePage
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}
export default SavedMovies;
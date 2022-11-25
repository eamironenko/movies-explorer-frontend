import React from 'react';
import './SavedMovies.css';

import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';


function SavedMovies({
    isLoading,
    loggedIn,
    state,
    onSaveFindMovies,
    findMoviesBasic,
    moviesBasic,
    onDeleteMovie,
    onSavedCheckbox,
    checkedSave
}) {

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
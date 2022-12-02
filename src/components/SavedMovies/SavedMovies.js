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
    setFindMoviesBasic,
    moviesBasic,
    onDeleteMovie,
    onSavedCheckbox,
    checkedSave,
    message,
    setMessage
}) {

  //console.log(moviesBasic)
  useEffect(() => {
    //setFindMoviesBasic(moviesBasic);
    localStorage.removeItem('querySave');
    setMessage('');
}, [])

  return (
    <div className='page'>
      <Header loggedIn={loggedIn} setMessage={setMessage}/>
      <main className='main'>
        <div className='savedMovies'>
          <SearchForm
            isLoading={isLoading}
            onFindMovies={onSaveFindMovies}
            onSwitchCheckbox={onSavedCheckbox}
            checked={checkedSave}
            isSavePage
          />
          <span className={`${message ? 'savedMovies__error' : 'savedMovies__error_visible'}`}>{message}</span>
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
import React from 'react';
import './SavedMovies.css';

import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import SavedMoviesCardList from '../SavedMoviesCardList/SavedMoviesCardList';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';

function SavedMovies(loggedIn) {
    const [isLoading, setIsLoading] = React.useState(false);

    return (
        <div className='page'>
            <Header loggedIn={loggedIn} />
            <main className='main'>
                <div className='savedMovies'>
                    <SearchForm />
                    {isLoading ? (
                        <Preloader />
                    ) : (
                        <SavedMoviesCardList
                            className="moviesCardList__container_type_save
                    moviesCardList__button_type_save"
                        />
                    )}
                </div>
            </main>
            <Footer />
        </div>
    )
}
export default SavedMovies;
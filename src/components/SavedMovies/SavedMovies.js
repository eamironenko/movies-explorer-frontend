import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

import card1 from '../../images/card1.svg';
import card2 from '../../images/card2.svg';
import card3 from '../../images/card3.svg';
//import deleteButton from '../../images/movie_delete.svg'
const cards = [];
cards.push(card1, card2, card3);

function SavedMovies(loggedIn) {
    const [isLoading, setIsLoading]=React.useState(false);

    return (
        <main className='root'>
            <Header loggedIn={loggedIn} />
            <div className='savedMovies'>
                <SearchForm />
                {isLoading ? (
                    <Preloader />
                ) : (
                    <MoviesCardList cards={cards} 
                    className="moviesCardList__container_type_save" />
                )}
            </div>
        </main>

    )
}
export default SavedMovies;
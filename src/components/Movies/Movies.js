import React from 'react';
import './Movies.css';

import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import Footer from '../Footer/Footer';

function Movies(loggedIn) {
    const [isLoadding, setIsLoading]=React.useState(false);

    return (
        <div className='page'>
            <Header loggedIn={loggedIn} />
            <main className='main'>
                <div className='movies'>
                    <SearchForm />
                    {isLoadding ? (
                        <Preloader />
                    ) : (
                        <MoviesCardList />
                    )}
                </div>
            </main>
            <Footer />
        </div>

    )
}

export default Movies;

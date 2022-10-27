import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { moviesCards } from '../../utils/dataMovies';

function MoviesCardList() {
   
    return (
        <>
            <section className="moviesCardList__container">
                {moviesCards.map((item) => (
                    <MoviesCard card={item.id} {...item}/>
                ))}
            </section>
            <button className="moviesCardList__button" type="button">Еще</button>
        </>
         )
            
}

export default MoviesCardList;
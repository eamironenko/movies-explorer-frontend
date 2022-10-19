import './MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import React, {useState,useEffect} from 'react-router-dom';
import { Route, Switch} from 'react-router-dom';

function MoviesCardList({cards, saveButton}) {




    return (
        <section className="moviesCardList">
            <ul className="moviesCardList__container">
                {newCards.map((item) => (
                    <MoviesCard card={item} saveButton={saveButton}/>
                ))}
            </ul>
            <Switch>
                <Route path="/movies">
                <button className="moviesCardList__button" type="button" aria-label="Добавить фильмы">Еще</button>
                </Route>
            </Switch>
        </section>
    )
}

export default MoviesCardList;
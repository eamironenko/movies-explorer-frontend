import React from 'react';
import {useState,useEffect} from 'react-router-dom';
import { Route, Switch} from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({cards, saveButton}) {
    let allCards = 12;
    let addCards = 3;
    if (window.screen.width<768 && window.screen.width > 320) {
        allCards = 8;
        addCards = 2;
    } else if (window.screen.width <= 320) {
        allCards = 5;
        addCards = 5;
    }

    let start = allCards
    let newCards = cards.slice(0,allCards);

    function handleAddMovie() {
        let stop=0
        start+addCards<cards.length ? stop=start+addCards : stop=cards.length
        newCards.push(...cards.slice(start, stop));
        start=start+addCards
    }

    return (
            <section className="moviesCardList">
                <ul className="moviesCardList__container">
                    {newCards.map((item) => (
                        <MoviesCard card={item} {...item} logoButton={saveButton} />
                    ))}
                </ul>
                <button className="moviesCardList__button" type="button">Еще</button>
            </section> 
    )
}

export default MoviesCardList;
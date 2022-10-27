import React from "react";
import SavedMoviesCard from '../SavedMoviesCard/SaveMoviesCard';
import { moviesCards } from "../../utils/dataMovies";

function SavedMoviesCardList() {

    return (
        <>
            <section className="moviesCardList__container || moviesCardList__container moviesCardList__container_type_save">
                {moviesCards.slice(0, 3).map((item) => (
                    <SavedMoviesCard card={item.id} {...item} />
                ))}
            </section>
            <button className="moviesCardList__button || moviesCardList__button 
            moviesCardList__button_type_save" type="button">Еще</button>
        </>
    );
}

export default SavedMoviesCardList;
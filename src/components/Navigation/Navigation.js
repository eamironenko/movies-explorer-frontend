import React from "react";
import { Link } from 'react-router-dom';
import './Navigation.css';
import AccountButton from '../AccountButton/AccountButton';

function Navigation({ loggedIn }) {
    return (
        <>
            {!loggedIn && (
                <nav className="navigation">
                    <Link to="/sign-up" className="navigation__button"> Регистрация</Link>
                    <Link to="/sign-in" className="navigation__button navigation__button_color">Войти</Link>
                </nav>
            )}

            {loggedIn && (
                <nav className="navigation__movies">
                    <div className='navigation__movies-buttons'>
                        <Link className="navigation__movies-button" to="/movies" >Фильмы</Link>
                        <Link className="navigation__movies-button navigation__button_movieSaved" to="/saved-movies" >Сохраненные&nbsp;фильмы</Link>
                    </div>
                    <Link to="/profile" className="navigation__button navigation__button_account"><AccountButton /></Link>
                </nav>
            )}
        </>
    )
}

export default Navigation;
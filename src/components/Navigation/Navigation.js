import React from "react";
import { Link, NavLink } from 'react-router-dom';
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
                        <NavLink to="/movies"
                            className="navigation__movies-button"
                            activeClassName="navigation__movies-button navigation__movies-button_active">Фильмы
                        </NavLink>
                        <NavLink to="/saved-movies"
                            className="navigation__movies-button navigation__button_movieSaved"
                            activeClassName="navigation__movies-button navigation__button_movieSaved navigation__movies-button_active"
                        >Сохраненные&nbsp;фильмы
                        </NavLink>
                    </div>
                    <Link to="/profile" className="navigation__button navigation__button_account"><AccountButton /></Link>
                </nav>
            )}
        </>
    )
}

export default Navigation;
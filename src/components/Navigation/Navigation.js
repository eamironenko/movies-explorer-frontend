import React from "react";
import {Route, Switch, Link} from 'react-router-dom';
import './Navigation.css';
import AccountButton from '../AccountButton/AccountButton'
import menu from '../../images/menu.svg';
import closeButton  from '../../images/menu_closeButton.svg';

function Navigation({loggedIn, userData, signOut}) {

    const [isOpen, setIsOpen]=React.useState(false);

    function handleOpenMenu() {
        setIsOpen(true);
    }

    function handleCloseButton() {
        setIsOpen(false);
    }

    return (
        <Switch>

            <Route path="/">
                <div className="navigation__buttons">
                    <Link to="/sign-up" className="navigation__button"> Регистрация</Link>
                    <Link to="/sign-in" className="navigation__button navigation__button_color">Войти</Link>
                </div>
            </Route>

            <Route path="/movies">
                <div className="navigation__buttons navigation__buttons_movie">
                    <Link to="/movies" className="navigation__button navigation__button_movie">Фильмы</Link>
                    <Link to="/saved-movies" className="navigation__button header__button_movie navigation__button_movieSaved">Сохраненный фильмы</Link>
                </div>
                <Link to="/profile" className="navigation__button navigation__button_account"><AccountButton /></Link>

            </Route>
        </Switch>

    )

}

export default Navigation;
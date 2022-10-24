import React from "react";
import { Route, Switch } from "react-router-dom";

import './Header.css';
import Navigation from '../Navigation/Navigation';
import Logo from '../Logo/Logo';

function Header() {
    return (
        <Switch>
            <Route exact path="/">
                <header class="header">
                    <Logo />
                    <Navigation />
                </header>
            </Route>
            <Route path={["/movies", "/saved-movies", "/profile"]}>
                <header className="header">
                    <Logo />
                    <Navigation />
                </header>
            </Route>
        </Switch>
    )
}

export default Header;
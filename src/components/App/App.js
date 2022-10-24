import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import { api } from '../../utils/Api.js';
import * as auth from '../../utils/auth';
import './App.css';

const App = () => {
    const [currentUser, setCurrentUser] = React.useState({});
    const [userData, setUserData] = React.useState('');
    const [loggedIn, setLoggedIn] = React.useState(false);

    return (
        <div className="root">
            <CurrentUserContext.Provider value={currentUser}>
                <Header />
                <Switch>
                    <Route path="/sign-up">
                        <Register />
                    </Route>
                    <Route path="/sign-in">
                        <Login />
                    </Route>
                    <Route exact path="/">
                        <Main />
                    </Route>
                    <Route path="/movies">
                        <Movies loggedIn={true}/>
                    </Route>
                    <Route path="/saved-movies">
                        <SavedMovies loggedIn={true}/>
                    </Route>
                    <Route path="/profile">
                        <Profile loggedIn={true}/>
                    </Route>
                    <Route path="*">
                        <PageNotFound loggedIn={true}/>
                    </Route>
                </Switch>
                <Footer />
            </CurrentUserContext.Provider>
        </div>
    )
}

export default App;
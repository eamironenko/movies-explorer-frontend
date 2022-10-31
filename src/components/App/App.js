import React, { useState, useEffect} from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

// страницы
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Preloader from '../Preloader/Preloader';
import PageNotFound from '../PageNotFound/PageNotFound';

// допники
import './App.css';
import * as moviesApi from '../../utils/MoviesApi';
import * as mainApi from '../../utils/MainApi';

//windowWidth 
//constants
//protectedRoad

// константы

const App = () => {
    const [currentUser, setCurrentUser] = React.useState({});
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [errorReg, setErrorReg] = React.useState(false);
    const history = React.useHistory();
    const [state, setState] = React.useState(localStorage.getItem('jwt') || false);

    const [movies, setMovies] = React.useState([]);
    const [moviesMain, setMoviesMain] = React.useState([]); 
    const [showMovies, setShowMovies] = React.useState([]);
    const [findMovies, setFindMovies] = React.useState([]);
    const [findMoviesMain, setFindMoviesMain] = React.useState([]);
    const [countMovies, setCountMovies] = React.useState('');
    const [disabledBtn, setDisabledBtn] = React.useState(false);


    let regPassword='';
    let localChecked = false;
    const [checked, setChecked] = React.useState(localChecked);

    React.useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            setStatusToken(jwt);
        }
    }, [loggedIn]);

    React.useEffect(() => {
        setFindMovies(moviesMain);
    }, [moviesMain]);

    React.useEffect(() => {   // количество фильмов на странице
        if (findMovies.length === showMovies.length || 
            findMovies.length < showMovies.length) {
                setDisabledBtn(true);
            } else {
                setDisabledBtn(false);
            }
    }, [showMovies.length, findMovies.length]);

    React.useEffect(() => {
        if (loggedIn) {
            setIsLoading(true);
            setErrorMessage('');
            mainApi.getSavedMovies()
            .then((res) => {
                setMoviesMain(res.filter(i => i.owner.toString() === currentUser._id));
                const localMovies = JSON.parse(localStorage.getItem('movies'));
                getMovies();
                if (localMovies) {
                    setShowMovies(limitMovies(localMovies));
                    setFindMovies(localMovies);
                } else {
                    setShowMovies([]);
                    setFindMovies([]);
                }
            })
            .catch((err) => {console.log(err)})
            .finally(() => setIsLoading(false));
        }
    })

    const getMovies = (searchText, checked) => {
        setIsLoading(true);
        moviesApi.getMovie()
        .then((res) => {
            setErrorMessage('');
            res.forEach(element => {
                element.image.url = 
                element.image.formats.thumbnail.url = 
            });
        return res
        })
        .then ((res) => {
            setMovies
        })
        .catch((err) => {
            setErrorMessage();
            console.log(err);
          })
        .finally(() => {setIsLoading(false)})
    }

    const setStatusToken = (jwt) => {
        setErrorMessage('');
        mainApi.checkToken(jwt)
            .then((res) => {
                if (res) {
                    setLoggedIn(true);
                    setCurrentUser(res);
                } else {
                    setLoggedIn(false);
                }
            })
            .catch((err) => {
                setErrorMessage()
                console.log(err)
            })
    }

    const onRegister = ({ name, email, password }) => {
        setErrorMessage('');
        setIsLoading(true);
        regPassword = password;
        return mainApi.register(name, email, password)
          .then((res) => {
            if (res.message) {
              setErrorMessage(res.error);
              history.push('/sign-up')
            } else {
              onLogin({ email: res.email, password: regPassword});
            }
          })
          .catch((err) => {
            setErrorReg(true);
            console.log(err);
          })
          .finally(() => { setIsLoading(false)});
        }
    
    const onLogin = ({ email, password }) => {
        setErrorMessage('');
        setIsLoading(true);
        return mainApi.authorize(email, password)
        .then((res) => {
            if (res.token) {
              localStorage.setItem('jwt', res.token);
              setLoggedIn(true);
              history.push('/movies');
            } else {
                setErrorMessage(res.error);
            }
        })
        .catch((err) => {
            console.log(err) })
        .finally(() => { setIsLoading(false)});
    }
    
    const onSignOut = () => {   // выход из аккаунта
        localStorage.removeItem('jwt');
        localStorage.removeItem('movies');
        localStorage.removeItem('checked');
        localStorage.removeItem('text');
        setLoggedIn(false)
        history.push('/');
    }

    const handleUpdateUser = (FormData) => {
        setIsLoading(true);
        mainApi.editUserData(FormData)
        .then((res) => {
            setCurrentUser(res);
        })
        .catch ((err) ={console.log(err) })
        .finally(() => { setIsLoading(false)});
    }

    return (
            <CurrentUserContext.Provider value={currentUser}>
                <Switch>
                    <Route path="/sign-up">
                        <Register 
                        onRegister={onRegister}
                        errorReg={errorReg}
                        errorMessage={errorMessage}
                        setErrorMessage={setErrorMessage}
                        isLoading={isLoading}
                        />
                    </Route>
                    <Route path="/sign-in">
                        <Login 
                        onLogin={onLogin}
                        errorMessage={errorMessage}
                        setErrorMessage={setErrorMessage}
                        isLoading={isLoading}
                        />
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
                    <ProtectedRoute 
                         path="/profile"
                         state={state}
                         loggedIn={loggedIn}
                         onUpdateUser={handleUpdateUser}
                         onSignOut={onSignOut}
                         errorMessage={errorMessage}
                         setErrorMessage={setErrorMessage}
                         component ={Profile}/>
                    <Route path="*">
                        <PageNotFound loggedIn={true}/>
                    </Route>
                </Switch>
            </CurrentUserContext.Provider>
    )
}

export default App;
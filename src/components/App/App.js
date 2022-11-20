import React, { useState, useEffect} from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
//-----Блоки
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Preloader from '../Preloader/Preloader';
import PageNotFound from '../PageNotFound/PageNotFound';
//-----Допники
import './App.css';
import * as moviesApi from '../../utils/MoviesApi';
import * as mainApi from '../../utils/MainApi';
import * as constants from '../../utils/constants';
import * as screenSize from '../../utils/screenSize';
import { desktop, tablet, mobile } from '../../utils/constants';
import { SERVER_ERR, NOT_FOUND_ERR, INVALID_DATA_ERR, UNAUTHORIZED_ERR, CONFLICT_ERR,
} from '../../utils/errMessage';

const App = () => {
    const [currentUser, setCurrentUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorReg, setErrorReg] = useState(false);
    const [message, setMessage] = useState('');
    const [state, setState] = useState(localStorage.getItem('jwt') || false);
    const history = useHistory();
    let screenWidth = screenSize.useCurrentWidth();

    const [allMovies, setAllMovies] = useState([]);
    const [movies, setMovies] = useState([]);
    const [displayMovies, setDisplayMovies] = useState([]); 
    const [findMovies, setFindMovies] = useState([]); 
    const [findMoviesBasic, setFindMoviesBasic] = useState([]);
    const [loadMovies, setLoadMovies] = useState('');
    const [loadMoreMovies, setLoadMoreMovies] = useState('');
  
    let localChecked = false;
    let localCheckedSave = false; 
    const [checked, setChecked] = React.useState(localChecked);
    const [checkedSave, setCheckedSave] = React.useState(localCheckedSave);
    
    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            setStatusToken(jwt);
        }
    }, [loggedIn]);
    
    //-----формат отображения карточек
    useEffect(() => {
        if (screenWidth <= 768 && screenWidth > 320) {
            setLoadMovies(tablet.amount);
            setLoadMoreMovies(tablet.addAmount);
        } else if (screenWidth <= 320) {
            setLoadMovies(mobile.amount);
            setLoadMoreMovies(mobile.addAmount);
        } else if (screenWidth > 768) {
            setLoadMovies(desktop.amount);
            setLoadMoreMovies(desktop.addAmount)
        }
    }, [screenWidth]);

    const listMovies = (movies) => {
        return movies.slice(0, loadMovies);
    }
    const nextMovies = (movies) => {
        return movies.slice(
            displayMovies.length, 
            (displayMovies.length + loadMoreMovies));
    }
    const onAddMovie = ()=> {
        setDisplayMovies(displayMovies.concat(...nextMovies(findMovies)));
    }

    useEffect(() => {
        setFindMoviesBasic(movies);
    }, [movies]);

    useEffect(() => {
        if (loggedIn) {
            setIsLoading(true);
            mainApi.getSavedMovies()
            .then((res) => {
                setMovies(Array.from(res).filter(i => i.owner.toString() === currentUser._id));

                const localAllMovies = JSON.parse(localStorage.getItem('allMovies'));
                const localMovies = JSON.parse(localStorage.getItem('movies'));

                if (localMovies) {
                    setFindMoviesBasic(localMovies);
                }
                getAllMovies();
                if (localAllMovies) {
                    setDisplayMovies(listMovies(localAllMovies));
                    setFindMovies(localAllMovies);
                } else {
                    setDisplayMovies([]);
                    setFindMovies([]);
                }
            })
            .catch((err) => {
                setMessage(SERVER_ERR);
                console.log(err);})
            .finally(() => setIsLoading(false));
        }
    }, [loggedIn]);

    //-----работа с фильмаи
    const getAllMovies = () => {
        setIsLoading(true);
        moviesApi.getMovie()
        .then ((res) => {
            setAllMovies(res);})
        .catch((err) => {
            setMessage(SERVER_ERR);
            console.log(err)})
        .finally(() => {setIsLoading(false)})
    }
    //--ищем фильмы по запросу
    const onFindMovies = (query, checked) => {
        const searchQuery = query.toLowerCase();
        localStorage.getItem('checked') === "true" ? localChecked=true : localChecked=false;

        const searchMovies = allMovies.filter(element =>
            (element.nameRU.toLowerCase().includes(searchQuery)
            || element.nameEN.toLowerCase().includes(searchQuery))
            & (checked ? element.duration < constants.timing : element.duration>0)
            )
            if (searchMovies.length === 0) {
                setMessage(NOT_FOUND_ERR)
                setFindMoviesBasic([])
            }
            setFindMovies(searchMovies);
            setDisplayMovies(listMovies(searchMovies));
            localStorage.setItem('AllMovies', JSON.stringify(searchMovies));
            localStorage.setItem('checked',checked);
            localStorage.setItem('query', query);
    }
    const onSwitchCheckbox = (query) => {
        setChecked(!checked);
        onFindMovies(query, !checked);
    }
    //-----операции с фильмами
    const onSaveMovies = (data) => { 
        setIsLoading(true);
        mainApi.saveMovie(data)
        .then((res) => {
            setMovies([...movies, res]);
        })
        .catch((err) => {
            if (err.status === 400) {
                setMessage(INVALID_DATA_ERR)
            } else if (err.status === 500 ) {
                setMessage(SERVER_ERR)}
            console.log(err)})
        .finally(() => {
            setIsLoading(false)})
    }

    const onSaveFindMovies = (querySave, checkedSave) => {
        const searchQueryBasic = querySave.toLowerCase();
        localStorage.getItem('checkedSave') ==="true" ? localCheckedSave=true : localCheckedSave=false;
        if (localStorage.getItem('checkedSave')) {
            if (localStorage.getItem('checkedSave') === "true") {
                localCheckedSave=true
            }
        }
        const searchMoviesBasic = movies.filter(element => 
            (element.movie.nameRU.toLowerCase().includes(searchQueryBasic)
            || element.movie.nameEN.toLowerCase().includes(searchQueryBasic))
            & (checkedSave ? element.movie.duration<constants.timing : element.movie.duration>0));
            
            if (searchMoviesBasic.length === 0) {
                setFindMoviesBasic([]);
                setMessage(NOT_FOUND_ERR);
            }
            //debugger
            setFindMoviesBasic(searchMoviesBasic);
            localStorage.setItem('checkedSave', checkedSave);
            localStorage.setItem('querySave', querySave);
            localStorage.setItem('moviesBasic', JSON.stringify(searchMoviesBasic));    
    }
    
    const onSavedCheckbox = (querySave) => {
        setCheckedSave(!checkedSave);
        onSaveFindMovies(querySave, !checkedSave);
    }

    const onDeleteMovie =(data) => {
        setIsLoading(true);
        mainApi.deleteMovie(data)
        .then(() => {
            setMovies((state) => state.filter((i) => i.movie._id !== data._id));
        })
        .then(() => {
            setFindMoviesBasic((state) => state.filter((i) => i.movie._id !== data._id));
        })
        .catch((err) => {
            setMessage(SERVER_ERR);
            console.log(err)})
        .finally(() => {
            setIsLoading(false)})
    }
    //-----работа с аккаунтом
    const setStatusToken = (jwt) => {
        mainApi.checkToken(jwt)
            .then((res) => {
                if (res) {
                    setLoggedIn(true);
                    setCurrentUser(res);
                } else {
                    setLoggedIn(false);
                    localStorage.clear();
                    setMovies([]); 
                }
            })
            .catch((err) => {
                setMessage(SERVER_ERR);
                console.log(err)
            })
    }

    const onRegister = ({ name, email, password }) => {
        setIsLoading(true);
        return mainApi.register(name, email, password)
          .then((res) => {
            if (res) {
              onLogin({ email: res.email, password: password });
            } else {
              setMessage(CONFLICT_ERR);
              history.push('/sign-up')
            }
          })
          .catch((err) => {
            if ( err.status === 409) {
                setMessage(CONFLICT_ERR)
            } else if ( err.status === 500) {
                setMessage(SERVER_ERR);
            }
            setErrorReg(true);
            console.log(err);
          })
          .finally(() => { setIsLoading(false)});
    }

    const onLogin = ({ email, password }) => {
        setIsLoading(true);
        return mainApi.authorize(email, password)
        .then((res) => {
            if (res.token) {
              localStorage.setItem('jwt', res.token);
              setChecked(false);
              setCheckedSave(false);
            } else {
              setMessage(UNAUTHORIZED_ERR);
            }
        })
        .catch((err) => {
            if ( err.status === 409) {
                setMessage(CONFLICT_ERR)
            } else if ( err.status === 500) {
                setMessage(SERVER_ERR);
            }
            console.log(err) 
        })
        .finally(() => setIsLoading(false));
    }

    const onUpdateUser = (data) => {
        setIsLoading(true);
        mainApi.editUserData(data)
        .then((res) => {
            setCurrentUser(res);
        })
        .catch ((err) => {
            if (err.status === 409) {
                setMessage(CONFLICT_ERR)
            } else if (err.status === 500 ) {
                setMessage(SERVER_ERR)}
            console.log(err)})
        .finally(() => { setIsLoading(false)});
    }

    const onSignOut = () => {
        setLoggedIn(false);
        localStorage.clear();
        setCurrentUser({});
        setAllMovies([]);
        setMovies([]);
        setLoggedIn(false)
        history.push('/');
    }
    
    return (
        <CurrentUserContext.Provider value={{user: currentUser}}>
            {isLoading ? <Preloader /> : (
                <Switch>
                <Route path="/sign-up">
                    {!loggedIn ? (
                        <Register
                        onRegister={onRegister}
                        errorReg={errorReg}
                        message={message}
                        setMessage={setMessage}
                        isLoading={isLoading}
                    />
                    ) : (
                        <Redirect to="/movies" />
                    )}  
                </Route>
                <Route path="/sign-in">
                    {!loggedIn ? (
                        <Login
                        onLogin={onLogin}
                        message={message}
                        setMessage={setMessage}
                        isLoading={isLoading}
                    />
                    ) : (
                        <Redirect to="/movies" />
                    )}
                </Route>
                <ProtectedRoute
                    path="/profile"
                    component={Profile}
                    state={state}
                    isLoading={isLoading}
                    loggedIn={loggedIn}
                    onUpdateUser={onUpdateUser}
                    onSignOut={onSignOut}
                />
                <Route exact path="/">
                    <Main 
                    loggedIn={loggedIn}
                    />
                </Route>
                <ProtectedRoute
                    path="/movies"
                    component={Movies}
                    isLoading={isLoading}
                    loggedIn={loggedIn}
                    state={state}
                    onFindMovies={onFindMovies}
                    displayMovies={displayMovies}
                    onSaveMovies={onSaveMovies}
                    moviesBasic={movies}
                    onSwitchCheckbox={onSwitchCheckbox}
                    checked={checked}
                    onAddMovie={onAddMovie}
                    findMovies={findMovies}
                    onDeleteMovie={onDeleteMovie}
                    message={message}
                    setMessage={setMessage}
                />
                <ProtectedRoute
                    path="/saved-movies"
                    component={SavedMovies}
                    isLoading={isLoading}
                    loggedIn={loggedIn}
                    state={state}
                    onSaveFindMovies={onSaveFindMovies}
                    findMoviesBasic={findMoviesBasic}
                    onDeleteMovie={onDeleteMovie}
                    moviesBasic={movies}
                    onSavedCheckbox={onSavedCheckbox}
                    checkedSave={checkedSave}
                />
                
                <Route path="*">
                    <PageNotFound/>
                </Route>
            </Switch>
            )}
        </CurrentUserContext.Provider>
    )
}

export default App;
import React, { useState, useEffect} from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
//-----Компоненты
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Preloader from '../Preloader/Preloader';
import PageNotFound from '../PageNotFound/PageNotFound';
//-----Дополнительные элементы
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
    const [message, setMessage] = useState(null);
    const [state, setState] = useState(localStorage.getItem('jwt') || false);
    const history = useHistory();
    const screenWidth = screenSize.useCurrentWidth();

    const [allMovies, setAllMovies] = useState([]);
    const [movies, setMovies] = useState(JSON.parse(localStorage.getItem('savedMovies')) || []);
    const [displayMovies, setDisplayMovies] = useState([]);
    const [findMovies, setFindMovies] = useState([]);
    const [findMoviesBasic, setFindMoviesBasic] = useState([]);
    const [loadMovies, setLoadMovies] = useState('');
    const [loadMoreMovies, setLoadMoreMovies] = useState('');
  
    let localChecked = false;
    let localCheckedSave = false;
    const [checked, setChecked] = React.useState(localChecked);
    const [checkedSave, setCheckedSave] = React.useState(localCheckedSave);
    let passwordReg='';
    
    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            setStatusToken(jwt);
        }
    }, [loggedIn]);

    const onLogin = ({ email, password }) => {
        setIsLoading(true);
        setMessage('');
        return mainApi.authorize(email, password)
        .then((res) => {
            if (res.token) {
                localStorage.setItem('jwt', res.token);
                history.push('/movies');
                setLoggedIn(true);
                setChecked(false);
                setCheckedSave(false);             
            }
        })
        .catch((err) => {
            debugger
            if ( err.status === 409) {
                setMessage(CONFLICT_ERR);
            } else if ( err.status === 500) {
                setMessage(SERVER_ERR);
            } else if ( err.status === 401) {
                setMessage(UNAUTHORIZED_ERR);
            }
            console.log(err)
        })
        .finally(() => setIsLoading(false));
    }
    const onRegister = ({ name, email, password }) => {
        setIsLoading(true);
        setMessage('');
        passwordReg = password
        return mainApi.register(name, email, password)
          .then((res) => {
            if (res) {
              onLogin({ email: res.email, password: passwordReg });
            } else {
              history.push('/sign-up');
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
    const onUpdateUser = (data) => {
        setIsLoading(true);
        setMessage('');
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

    //-----формат отображения карточек
    useEffect(() => {
        if (screenWidth >= tablet.width && screenWidth < desktop.width) {
            setLoadMovies(tablet.amount);
            setLoadMoreMovies(tablet.addAmount);
        }
        if (screenWidth >= mobile.width && screenWidth < tablet.width) {
            setLoadMovies(mobile.amount);
            setLoadMoreMovies(mobile.addAmount);
        }
        if (screenWidth >= desktop.width) {
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

    //-----работа с фильмами
    useEffect(() => {
        if (loggedIn) {
            setIsLoading(true);
            mainApi.getSavedMovies()
            .then((res) => {
                setMovies(res.filter(i => i.owner === currentUser.user._id))

                const localFoundMovies = JSON.parse(localStorage.getItem('foundMovies'));
                const localSavedFoundMovies = JSON.parse(localStorage.getItem('savedFoundMovies'));
                if (localSavedFoundMovies) {
                    setFindMoviesBasic(localSavedFoundMovies);
                }
                getAllMovies();
                if (localFoundMovies) {
                    setDisplayMovies(listMovies(localFoundMovies));
                    setFindMovies(localFoundMovies);
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

    const getAllMovies = () => {
        setIsLoading(true);
        moviesApi.getMovie()
        .then ((res) => {
            setMessage('');
            setAllMovies(res);
        })
        .catch((err) => {
            setMessage(SERVER_ERR);
            console.log(err)
        })
        .finally(() => {setIsLoading(false)})
    }
    useEffect(() => {
        setFindMoviesBasic(movies)
    }, [movies])

    //--ищем фильмы по запросу
    const onFindMovies = (query, checked) => {
        const searchQuery = query.toLowerCase();
        localStorage.getItem('checked') === "true" ? localChecked=true : localChecked=false;
        
        const searchMovies = allMovies.filter(element =>
        (element.nameRU.toLowerCase().includes(searchQuery)
        || element.nameEN.toLowerCase().includes(searchQuery))
        & (checked ? element.duration < constants.timing : element.duration>0)
        )

        setFindMovies(searchMovies);
        setDisplayMovies(listMovies(searchMovies));
        localStorage.setItem('foundMovies', JSON.stringify(searchMovies));
        localStorage.setItem('checked',checked);
        localStorage.setItem('query', query);
        searchMovies.length === 0 ? setMessage(NOT_FOUND_ERR) : setMessage('');
        }
            
    const onSwitchCheckbox = (query) => {
        setChecked(!checked);
        onFindMovies(query, !checked);
    }
          
    const onSaveFindMovies = (querySave, checkedSave) => {
        const searchQuerySave = querySave.toLowerCase();
        localStorage.getItem('checkedSave') ==="true" ? localCheckedSave=true : localCheckedSave=false;
        if (localStorage.getItem('checkedSave')) {
            if (localStorage.getItem('checkedSave') === "true") {
                localCheckedSave=true
            }
        }    
        const searchMoviesSave = movies.filter(element => 
        (element.nameRU.toLowerCase().includes(searchQuerySave)
        || element.nameEN.toLowerCase().includes(searchQuerySave))
        & (checkedSave ? element.duration<constants.timing : element.duration>0));
            
        setFindMoviesBasic(searchMoviesSave);
        localStorage.setItem('savedFoundMovies', JSON.stringify(searchMoviesSave));
        localStorage.setItem('checkedSave', checkedSave);
        localStorage.setItem('querySave', querySave);
        searchMoviesSave.length === 0 ? setMessage(NOT_FOUND_ERR) : setMessage('');
        }  
    
    const onSavedCheckbox = (querySave) => {
        setCheckedSave(!checkedSave);
        onSaveFindMovies(querySave, !checkedSave);
    }
    
    const onSaveMovies = (data) => { 
        setIsLoading(true);
        mainApi.saveMovie(data)
        .then((res) => {
            setMovies([...movies, res]);
            //localStorage.setItem('savedMovies', JSON.stringify([...movies, res]))
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
 
    const onDeleteMovie =(data) => {
        setIsLoading(true);
        mainApi.deleteMovie(data)
        .then(() => {
            setMovies((state) => state.filter((i) => i._id !== data._id))
        })
        .then(() => {
            setFindMoviesBasic((state) => state.filter((i) => i._id !== data._id));
        })
        .catch((err) => {
            setMessage(SERVER_ERR);
            console.log(err)})
        .finally(() => {
            setIsLoading(false)})
    }

    const onSignOut = () => {
        localStorage.clear();      
        setCurrentUser({});
        setAllMovies([]);
        setMovies([]);
        history.push('/');
        setLoggedIn(false);
    }
   
    return (
        <CurrentUserContext.Provider value={{ user: currentUser }}>
            {isLoading ? <Preloader /> :
                <Switch>
                    <ProtectedRoute
                        path="/profile"
                        component={Profile}
                        state={state}
                        isLoading={isLoading}
                        loggedIn={loggedIn}
                        onUpdateUser={onUpdateUser}
                        onSignOut={onSignOut}
                        message={message}
                        setMessage={setMessage}
                    />
                    <Route exact path="/">
                        <Main loggedIn={loggedIn}
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
                    <Route path="/sign-in">
                        {loggedIn ? <Redirect to='movies' /> :
                            <Login
                                onLogin={onLogin}
                                message={message}
                                setMessage={setMessage}
                                isLoading={isLoading}
                            />}
                    </Route>
                    <Route path="/sign-up" >
                        <Register
                            onRegister={onRegister}
                            errorReg={errorReg}
                            message={message}
                            setMessage={setMessage}
                            isLoading={isLoading}
                        />
                    </Route>
                    <Route path="*">
                        <PageNotFound />
                    </Route>
                </Switch>
            }
        </CurrentUserContext.Provider>
    )
}

export default App;
import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import "./App.css";

import ProtectedRoute from '../../utils/ProtectedRoute';
import allMoviesApi from '../../utils/MoviesApi';
import mainApi from "../../utils/MainApi";
import * as auth from "../../utils/Auth";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { searchMovieByKeyword, searchShortMovie, filterMovies } from '../../utils/FilterMovies';

import Main from '../Main/Main';
import Movies from "../Movies/Movies";
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';

import Register from '../Register/Register';
import Login from '../Login/Login';
import PopupMenu from '../PopupMenu/PopupMenu';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import NotFound from '../NotFound/NotFound';

function App() {

  const [currentUser, setCurrentUser] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [searchInfoBox, setSearchInfoBox] = React.useState('');
  const [allMovies, setAllMovies] = React.useState([]);
  const [isFailed, setIsFailed] = React.useState(false);
  const [searchedMovies, setSearchedMovies] = React.useState([]);
  const [checked, setChecked] = React.useState(false);
  const [checkedSaved, setCheckedSaved] = React.useState(false);
  const [moviesNotFound, setMoviesNotFound] = React.useState(false);
  const [savedMoviesNotFound, setSavedMoviesNotFound] = React.useState(false);
  const [isInfoTooltipActive, setInfoTooltipActive] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [cardsPerPage, setCardsPerPage] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const history = useHistory();
  let location = useLocation();


  React.useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      auth.checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true)
            setCurrentUser(res)
            if (location.pathname === '/movies') {
              history.push('/movies')
            } else if (location.pathname === '/profile') {
              history.push('/profile')
            } else if (location.pathname === '/saved-movies') {
              history.push('/saved-movies')
            } else if (location.pathname === '/signin') {
              history.push('/movies')
            } else if (location.pathname === '/signup') {
              history.push('/movies')
            }
            return res
          }
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  function handleRegister({ name, email, password }) {
    setIsLoading(true)
    auth
      .register({ name, email, password })
      .then((res) => {
        if (res) {
          setIsSuccess(true)
          handleLogin({ email, password });
          setInfoTooltipActive(true)
          setIsLoading(false)
          return res
        }
      })
      .catch((err) => {
        console.log(err);
        setIsSuccess(false)
        setInfoTooltipActive(true)
      })
      .finally(() => setIsLoading(false))
  };

  function handleLogin({ email, password }) {
    setIsLoading(true)
    auth
      .authorize({ email, password })
      .then((data) => {
        if (!data) throw new Error('Неверные имя пользователя или пароль')
        if (data.token) {
          setLoggedIn(true)
          localStorage.setItem('jwt', data.token)
          history.push('/movies')
          setIsSuccess(true)
          setInfoTooltipActive(true)
          setIsLoading(false)
          return data
        }
        mainApi.getUserData()
          .then((myData) => {
            setIsFailed(false)
            setCurrentUser(myData)
          })
          .catch((err) => {
            setIsFailed(true)
            setIsLoading(false)
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
        setLoggedIn(false)
        setIsSuccess(false)
        setInfoTooltipActive(true)
      })
      .finally(() => setIsLoading(false))
  };

  // редактирование профиля пользователя

  function handleUpdateUser(user) {
    mainApi
      .editUserInfo(user)
      .then((data) => {
        setCurrentUser(data);
        setInfoTooltipActive(true)
        setIsSuccess(true)
      })
      .catch((err) => {
        console.log(err);
        setIsSuccess(false)
        setInfoTooltipActive(true)
      });
  }

  const handleSignOut = () => {
    localStorage.clear();
    history.push('/');
    setLoggedIn(false);
    setCurrentUser({});
  };

  function handleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function closeMenu() {
    setIsMenuOpen();
  }

  // закрытие попапа со статусом события

  function closePopup() {
    setInfoTooltipActive(false)
  }

  React.useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === 'Escape') {
        closePopup();
      }
    }
    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, []);

  // поиск фильмов

  function handleMovieSearchSubmit(input) {
    const token = localStorage.getItem('jwt');
    if (location.pathname === '/movies') {
      setIsLoading(true);
      const searchedMovies = filterMovies(allMovies, input, checked)
      if (checked) {
        localStorage.setItem('searchedShortMovies', JSON.stringify(searchedMovies));
        const searchedExtraMovies = searchMovieByKeyword(allMovies, input)
        localStorage.setItem('searchedMovies', JSON.stringify(searchedExtraMovies));
      } else {
        localStorage.setItem('searchedMovies', JSON.stringify(searchedMovies));
      }
      setSearchedMovies(searchedMovies)
      setMoviesNotFoundMessage(searchedMovies)
      setTimeout(() => setIsLoading(false), 3000)

    } else if (location.pathname === '/saved-movies') {
      setIsLoading(true)
      mainApi.getSavedMovies(token)
        .then((movies) => {
          const userSavedMovies = movies.filter((movie) => {
            return movie.owner === currentUser._id
          })
          const searchedSavedMovies = searchMovieByKeyword(userSavedMovies, input)
          localStorage.setItem('searchedSavedMovies', JSON.stringify(searchedSavedMovies));
          setSavedMovies(searchedSavedMovies)
          setSavedMoviesNotFoundMessage(searchedSavedMovies)
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false))
    }
  }

  // фильтр по чекбоксу

  function handleChangeCheckbox(evt) {
    setChecked(!checked);
    if (!checked) {
      let searchedMovies = localStorage.getItem('searchedMovies');
      const searchedbyKeyWordMovies = JSON.parse(localStorage.getItem('searchedMovies'));

      if (!searchedMovies) {
        setMoviesNotFound(false)
      } else if (searchedbyKeyWordMovies.length === 0) {
        setMoviesNotFound(true)
      } else {
        const shortMovies = searchShortMovie(searchedbyKeyWordMovies)
        localStorage.setItem('searchedShortMovies', JSON.stringify(shortMovies));
        setSearchedMovies(shortMovies)
        setMoviesNotFoundMessage(shortMovies)
      }
    } else {
      let searchedMovies = localStorage.getItem('searchedMovies');
      const searchedbyKeyWordMovies = JSON.parse(localStorage.getItem('searchedMovies'));

      if (!searchedMovies) {
        setMoviesNotFound(false)
      } else {
        setSearchedMovies(searchedbyKeyWordMovies);
        setMoviesNotFound(false)
      }
    }
  }

  function handleSavedChangeCheckbox(evt) {
    const token = localStorage.getItem('jwt');
    setCheckedSaved(!checkedSaved)
    if (!checkedSaved) {
      if (savedMovies.length === 0) {
        setSavedMoviesNotFound(false)
      } else {
        const shortMovies = searchShortMovie(savedMovies)
        localStorage.setItem('searchedSavedShortMovies', JSON.stringify(shortMovies));
        setSavedMovies(shortMovies)
        setSavedMoviesNotFoundMessage(shortMovies)
      }
    } else {
      mainApi.getSavedMovies(token)
        .then(() => {
          const searchedSavedMovies = JSON.parse(localStorage.getItem('searchedSavedMovies'));
          if (!searchedSavedMovies) {
            mainApi.getSavedMovies(token)
              .then((savedMovieData) => {
                setIsFailed(false)
                const userSavedMovies = savedMovieData.filter((movie) => {
                  return movie.owner === currentUser._id
                })
                setSavedMovies(userSavedMovies)
                setSavedMoviesNotFound(false)
              })
              .catch((err) => {
                setIsFailed(true)
                console.log(err);
              });
          } else {
            setSavedMovies(searchedSavedMovies)
            setSavedMoviesNotFoundMessage(searchedSavedMovies)
          }
        })
        .catch((err) => console.log(err))
    }
  }


  function setMoviesNotFoundMessage(movies) {
    if (movies.length === 0) {
      setMoviesNotFound(true)
    } else {
      setMoviesNotFound(false)
    }
  }

  function setSavedMoviesNotFoundMessage(movies) {
    if (movies.length === 0) {
      setSavedMoviesNotFound(true)
    } else {
      setSavedMoviesNotFound(false)
    }
  }


  const handleLoadMore = () => {
    if (document.documentElement.clientWidth > 850) {
      setCardsPerPage(cardsPerPage + 3);
    } else {
      setCardsPerPage(cardsPerPage + 2);
    }
  }

  // сохранение фильма в коллекцию 

  function handleSaveMovieClick(movie) {
    const token = localStorage.getItem('jwt');
    const isSaved = savedMovies.some((item) => item.movieId === movie.id);
    if (!isSaved) {
      mainApi.addMovie(movie, token)
        .then((newMovie) => {
          setSavedMovies([...savedMovies, newMovie])
        })
        .catch((err) => {
          console.log(err);
          setIsSuccess(false)
          setInfoTooltipActive(true)
        });
    } else {
      const movieToDelete = savedMovies.find(item => item.movieId === movie.id);
      handleDeleteMovieClick(movieToDelete)
    }
  }

  // удаление фильма из коллекции

  function handleDeleteMovieClick(movie) {
    const token = localStorage.getItem('jwt');
    mainApi.deleteMovie(movie._id, token)
      .then(() => {
        mainApi.getSavedMovies(token)
          .then((movies) => {
            const userSavedMovies = movies.filter((movie) => {
              return movie.owner === currentUser._id
            })
            setSavedMovies(userSavedMovies)

            if (userSavedMovies.length === 0) {
              localStorage.removeItem('searchedSavedMovies')
              localStorage.removeItem('searchedShortSavedMovies')
            }
          })
          .catch((err) => console.log(err))
      })
      .catch((err) => console.log(err));
  }

  // загрузка фильмов с внешнего сервера

  React.useEffect(() => {
    let jwt = localStorage.getItem('jwt');
    if (jwt) {
      setIsLoading(true)
      allMoviesApi.getAllMovies()
        .then((movieData) => {
          setIsFailed(false)
          localStorage.setItem('movies', JSON.stringify(movieData));
          setAllMovies(movieData)

          const searchedMovies = JSON.parse(localStorage.getItem('searchedMovies'));

          if (searchedMovies) {
            setSearchedMovies(searchedMovies)
          }
          setIsLoading(false)
        })
        .catch((err) => {
          setIsFailed(true)
          console.log(err);
          setSearchInfoBox('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
        })
    }
  }, [loggedIn]);

  // загрузка сохраненных фильмов

  React.useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      mainApi.getSavedMovies(token)
        .then((savedMovieData) => {
          setIsFailed(false)
          const userSavedMovies = savedMovieData.filter((movie) => {
            return movie.owner === currentUser._id
          })
          setSavedMovies(userSavedMovies)
        })
        .catch((err) => {
          setIsFailed(true)
          console.log(err);
        });
    }
  }, [currentUser._id]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <Route exact path="/">
          <Main loggedIn={loggedIn} onMenu={handleMenu} />
        </Route>
        <ProtectedRoute
          path="/movies"
          component={Movies}
          onMenu={handleMenu}
          loggedIn={loggedIn}
          onSaveClick={handleSaveMovieClick}
          movies={searchedMovies}
          savedMovies={savedMovies}
          onHandleSubmit={handleMovieSearchSubmit}
          onMovieDelete={handleDeleteMovieClick}
          onChangeCheckbox={handleChangeCheckbox}
          checked={checked}
          isLoading={isLoading}
          isFailed={isFailed}
          onLoadMore={handleLoadMore}
          onMoviesNotFound={moviesNotFound}
          searchInfoBox={searchInfoBox}
        />
        <ProtectedRoute
          path="/saved-movies"
          component={SavedMovies}
          onMenu={handleMenu}
          loggedIn={loggedIn}
          movies={savedMovies}
          checked={checkedSaved}
          savedMovies={savedMovies}
          isLoading={isLoading}
          isFailed={isFailed}
          onHandleSubmit={handleMovieSearchSubmit}
          onMovieDelete={handleDeleteMovieClick}
          onChangeCheckbox={handleSavedChangeCheckbox}
          onSavedNotFound={savedMoviesNotFound}
          searchInfoBox={searchInfoBox}
        />
        <ProtectedRoute
          path="/profile"
          component={Profile}
          onMenu={handleMenu}
          loggedIn={loggedIn}
          onSignOut={handleSignOut}
          onUpdateUser={handleUpdateUser}
        />
        <Route path="/signin">
          <Login
            onLogin={handleLogin}
            isLoading={isLoading} />
        </Route>
        <Route path="/signup">
          <Register
            onRegister={handleRegister} />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
      <PopupMenu isOpen={isMenuOpen} onClose={closeMenu} />
      <InfoTooltip
        isOpen={isInfoTooltipActive}
        onClose={closePopup}
        isSuccess={isSuccess}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
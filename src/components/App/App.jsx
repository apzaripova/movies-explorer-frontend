import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import "./App.css";

import ProtectedRoute from '../../utils/ProtectedRoute';
import * as moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";
import * as auth from "../../utils/Auth";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import {searchMovieByKeyword, searchShortMovie, filterMovies} from '../../utils/FilterMovies';

import Main from '../Main/Main';
import Movies from "../Movies/Movies";
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';

import Authorization from '../Authorization/Authorization';
import PopupMenu from '../PopupMenu/PopupMenu';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import NotFound from '../NotFound/NotFound';

function App() {

  const [currentUser, setCurrentUser] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [allMovies, setAllMovies] = React.useState([]);
  const [isFailed, setIsFailed] = React.useState(false);
  const [searchedMovies, setSearchedMovies] = React.useState([]);
  const [checked, setChecked] = React.useState(false);
  const [checkedSaved, setCheckedSaved] = React.useState(false);
  const [moviesNotFound, setMoviesNotFound] = React.useState(false);
  const [savedMoviesNotFound, setSavedMoviesNotFound] = React.useState(false);
  const [isInfoTooltipActive, setInfoTooltipActive] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [userMovies, setUserMovies] = React.useState([]);
  const [sortedMovies, setSortedMovies] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [shortMovies, setShortMovies] = useState(false);
  const [message, setMessage] = useState("");
  const [moviesMessage, setMoviesMessage] = useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const history = useHistory();
  let location = useLocation();

  const handleError = (err) => console.error(err);

  useEffect(() => {
    const path = location.pathname;
    const jwt = localStorage.getItem("jwt");
    if (jwt !== null) {
      auth
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            getCurrentUser();
            setCurrentUser(res);
            history.push(path);
          }
        })
        .catch((err) => {
          console.log(`Переданный токен некорректен или просрочек: ${err}`);
          localStorage.removeItem("jwt");
          history.push("/");
        });
    }
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleRegister(name, email, password) {
    auth
      .register(name, email, password)
      .then((res) => {
        if (res) {
          setIsSuccess(true)
          handleLogin(email, password);
          setLoggedIn(true);
          setInfoTooltipActive(true)
          setIsLoading(false)
          setCurrentUser(res);
        }
      })
      .catch((err) => {
        if (err === 409) {
          setMessage("Пользователь с таким email уже существует");
        } else {
          setMessage("При регистрации пользователя произошла ошибка");
        }
        setIsSuccess(false)
        setIsLoading(false)
        setInfoTooltipActive(true)
      });
  }

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((data) => {
        if (!data) {
          setMessage("Что-то пошло не так");
          return false;
        }
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setMessage("");
          setLoggedIn(true);
          getCurrentUser();
          history.push("/movies");
          setIsSuccess(true)
          setInfoTooltipActive(true)
          setIsLoading(false)
          return loggedIn;
        }
      })
      .catch((err) => {
        setMessage("При авторизации произошла ошибка");
        if (err === 401) {
          setMessage("Пользователь с таким email не найден");
        }
        if (err === 400) {
          setMessage("Неверный email или пароль");
        }
        localStorage.removeItem("jwt");
      });
  }

  // редактирование профиля пользователя

  function handleUpdateUser(data) {
    mainApi
      .editUserInfo(data)
      .then((editedData) => {
        setCurrentUser(editedData);
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
    localStorage.removeItem("jwt");
    localStorage.removeItem("userMovies");
    localStorage.removeItem("movies");
    localStorage.removeItem("sortedMovies");
    localStorage.removeItem("currentUser");
    setUserMovies([]);
    setSortedMovies([]);
    setCurrentUser({});
    setLoggedIn(false);
    setMessage("");
    history.push("/");
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
    if (location.pathname === '/movies') {
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
      
    } else if (location.pathname === '/saved-movies') {
      setIsLoading(true)
      mainApi.getSavedMovies()
      .then((movies) => {
        const userSavedMovies = movies.filter((movie) => {
          return movie.owner === currentUser._id
        })
        const searchedSavedMovies = searchMovieByKeyword(userSavedMovies, input)
          localStorage.setItem('searchedSavedMovies', JSON.stringify(searchedSavedMovies));
      setSavedMovies(searchedSavedMovies)
      setSavedMoviesNotFoundMessage(searchedSavedMovies)
      setIsLoading(false)
      })
      .catch((err) => console.log(err))
    }
  }

  // сохранение фильма в коллекцию 

  function handleSaveMovieClick(movie) {
    const isSaved = savedMovies.some((item) => item.movieId === movie.id);
      if (!isSaved) {
        mainApi.addMovie(movie)
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
        mainApi.getUserMovies()
          .then(() => {
            const searchedSavedMovies = JSON.parse(localStorage.getItem('searchedSavedMovies'));
            if (!searchedSavedMovies) {
              mainApi.getSavedMovies()
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

	// удаление фильма из коллекции

  function handleDeleteMovieClick(movie) {
    mainApi.deleteMovie(movie._id)
    .then(() => {
      mainApi.getSavedMovies()
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
	
	function checkSavedMovie(movie) {
    return (movie.isSaved = userMovies.some(
      (userMovie) => userMovie.movieId === movie.id
    ));
  }

  function getCurrentUser() {
    const jwt = localStorage.getItem("jwt");
    mainApi
      .getUserData(jwt)
      .then((userData) => {
        if (userData) {
          setCurrentUser(userData);
          localStorage.setItem("currentUser", JSON.stringify(userData));
        }
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("jwt");
        localStorage.removeItem("currentUser");
      });
  }

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt !== null) {
      Promise.all([mainApi.getUserData(jwt), mainApi.getUserMovies(jwt)])
        .then(([userData, savedMovies]) => {
          localStorage.setItem("currentUser", JSON.stringify(userData));
          setCurrentUser(userData);

          const savedMoviesList = savedMovies.filter(
            (item) => item.owner._id === userData._id
          );
          localStorage.setItem("userMovies", JSON.stringify(savedMoviesList));
          setUserMovies(savedMoviesList);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    checkSavedMovie(sortedMovies);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userMovies]);

  useEffect(() => {
    moviesApi
      .getInitialMovies()
      .then((allMovies) => {
        setMovies(allMovies);
        localStorage.setItem("movies", JSON.stringify(allMovies));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        localStorage.removeItem("movies");
      });
  }, [currentUser]);

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
      onMoviesNotFound={moviesNotFound}
    />
    <ProtectedRoute
      path="/saved-movies"
      component={SavedMovies}
      onMenu={handleMenu}
      movies={savedMovies}
      checked={checkedSaved}
      savedMovies={savedMovies}
      isLoading={isLoading}
      isFailed={isFailed}
      onMovieDelete={handleDeleteMovieClick}
      onHandleSubmit={handleMovieSearchSubmit}
      onChangeCheckbox={handleSavedChangeCheckbox}
      onSavedNotFound={savedMoviesNotFound}
    />
    <Route path="/sign-in">
              <Authorization 
                signIn={true}
                greeting={'Рады видеть!'}
                submit={'Войти'}
                subline={'Ещё не зарегистрированы? '}
                linkText={'Регистрация'}
                link={'/sign-up'}
                handleSubmit={handleLogin}
              />
            </Route>
            <Route path="/sign-up">
              <Authorization 
                signIn={false}
                greeting={'Добро пожаловать!'}
                submit={'Зарегистрироваться'}
                subline={'Уже зарегистрированы? '}
                linkText={'Войти'}
                link={'/sign-in'}
                handleSubmit={handleRegister}
              />
            </Route>
    <ProtectedRoute
      path="/profile"
      component={Profile}
      onMenu={handleMenu}
      loggedIn={loggedIn}
      onSignOut={handleSignOut}
      onEditUser={handleUpdateUser}
    />
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
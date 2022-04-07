import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import "./App.css";

import ProtectedRoute from '../../utils/ProtectedRoute';
import allMoviesApi from '../../utils/MoviesApi';
import mainApi from "../../utils/MainApi";
import * as auth from "../../utils/Auth";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { SavedMoviesContext } from '../../contexts/SavedMoviesContext';

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

  const [movies, setMovies] = React.useState([]);

  const [currentUser, setCurrentUser] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [selectedMovies, setSelectedMovies] = React.useState([]);
  const [selectedSavedMovies, setSelectedSavedMovies] = React.useState(savedMovies);
  const [currentPage] = React.useState(1);
  const [searchInfoBox, setSearchInfoBox] = React.useState('');
  const [allMovies, setAllMovies] = React.useState([]);
  const [isFailed, setIsFailed] = React.useState(false);
  const [isInfoTooltipActive, setInfoTooltipActive] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [cardsPerPage, setCardsPerPage] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = selectedMovies.slice(indexOfFirstCard, indexOfLastCard);
  const history = useHistory();
  let location = useLocation();


  React.useEffect(() => {
    if (localStorage.getItem('jwt')) {
      let jwt = localStorage.getItem('jwt');
      auth.checkToken(jwt)
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
  }, [history, loggedIn, location.pathname]);

  function handleRegister({name, email, password}) {
    setIsLoading(true)
    auth
      .register({name, email, password})
      .then((res) => {
        if (res) {
          setIsSuccess(true)
          handleLogin({email, password});
          setInfoTooltipActive(true)
          setIsLoading(false)
          return res
        }
      })
    .catch((err) => {
      console.log(err);
      setIsSuccess(false)
      setIsLoading(false)
      setInfoTooltipActive(true)
    });  
  };

  function handleLogin({email, password}) {
    setIsLoading(true)
    auth
      .authorize({email, password})
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
        setIsLoading(false)
        setInfoTooltipActive(true)
      })
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

  // сохранение фильма в коллекцию 

  function handleSaveMovie(movie) {
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
        handleDeleteMovie(movieToDelete)
      }
    }

    const filterMovies = (movies, keyWords, isShortFilm) => {
      let filteredMovies = movies.filter(movie => movie.nameRU.toLowerCase().includes(keyWords.toLowerCase()));
      if (isShortFilm) {
        filteredMovies = filteredMovies.filter(movie => movie.duration <= 40);
      }
      return filteredMovies;
    };

    const handleSearchMovies = (moviesPool, keyWords, isShortFilm) => {
      setIsLoading(true);
          
      const foundMovies = filterMovies(moviesPool, keyWords, isShortFilm);
          
      if (foundMovies.length === 0) {
        setSearchInfoBox('Ничего не найдено');
      } 
      
      if (moviesPool === savedMovies) {
        setSelectedSavedMovies(foundMovies);
      } else {
        localStorage.setItem('selectedMovies', JSON.stringify(foundMovies));
        setSelectedMovies(foundMovies);
      }
      setCardsPerPageForRender();
      setIsLoading(false);
    };

    const setCardsPerPageForRender = () => {
      if (document.documentElement.clientWidth >= 850) {
        setCardsPerPage(12);
      } else if (document.documentElement.clientWidth >= 500) {
        setCardsPerPage(8);
      } else {
        setCardsPerPage(5);
      }
    }
  
    
    const handleLoadMore = () => {
      if (document.documentElement.clientWidth > 850) {
        setCardsPerPage(cardsPerPage + 3);
      } else {
        setCardsPerPage(cardsPerPage + 2);
      }
    }

	// удаление фильма из коллекции

  function handleDeleteMovie(movie) {
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

  // загрузка фильмов с внешнего сервера

  React.useEffect(() => {
    if (localStorage.getItem('movies') === null) {
      allMoviesApi.getAllMovies()
        .then((moviesData) => {
          console.log(moviesData);
          const selectedMoviesData = moviesData.map((movie) => {
            return {movieId: movie.id, 
                    country: movie.country,
                    director: movie.director,
                    duration: movie.duration,
                    year: movie.year,
                    description: movie.description,
                    image: `https://api.nomoreparties.co${movie.image.url}`,
                    trailer: movie.trailerLink,
                    nameRU: movie.nameRU,
                    nameEN: movie.nameEN === null ? '' : movie.nameEN,
                    thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`}
          });
          setMovies(selectedMoviesData);
          localStorage.setItem('movies', JSON.stringify(selectedMoviesData));
        })
        .catch((err) => {
          console.log(err);
          setSearchInfoBox('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
        });
    } else {
      setMovies(JSON.parse(localStorage.getItem('movies')))
    }
  }, []);

  React.useEffect(() => {
    if (localStorage.getItem('selectedMovies') !== null) {
      setSelectedMovies(JSON.parse(localStorage.getItem('selectedMovies')))
    }
    setCardsPerPageForRender();
  }, [])

  // загрузка сохраненных фильмов

  React.useEffect (() => {
    mainApi.getSavedMovies()
      .then ((movies) => {
        setSavedMovies(movies);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [savedMovies])

  React.useEffect(() => {
    setTimeout(function() {
      setIsInfoTooltipOpen(false);
    }, 2000)
  }, [isInfoTooltipOpen])

  return (
      <CurrentUserContext.Provider value={currentUser}>
      <SavedMoviesContext.Provider value={savedMovies}>
          <Switch>
    <Route exact path="/">
      <Main loggedIn={loggedIn} onMenu={handleMenu} />
    </Route>
    <ProtectedRoute
      path="/movies"
      component={Movies}
      onMenu={handleMenu}
      loggedIn={loggedIn}
      isFailed={isFailed}
      onSearchMovies={handleSearchMovies} 
      onLoadMore={handleLoadMore} 
      onSaveMovie={handleSaveMovie} 
      onDeleteMovie={handleDeleteMovie} 
      selectedMovies={selectedMovies} 
      currentCards={currentCards} 
      isLoading={isLoading} 
      searchInfoBox={searchInfoBox}
      movies={movies}
    />
    <ProtectedRoute
      path="/saved-movies"
      component={SavedMovies}
      onMenu={handleMenu}
      loggedIn={loggedIn}
      onDeleteMovie={handleDeleteMovie}
      onSearchMovies={handleSearchMovies} 
      selectedSavedMovies={selectedSavedMovies} 
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
            isLoading={isLoading}/>
          </Route>
          <Route path="/signup">
            <Register 
            onRegister={handleRegister}/>
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
</SavedMoviesContext.Provider>
</CurrentUserContext.Provider>
);
}

export default App;
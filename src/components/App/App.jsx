import React from 'react';
import { mainApi } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';
import useWindowSize from '../../utils/useWindowSize';

import ProtectedRoute from '../../utils/ProtectedRoute';
import * as auth from '../../utils/Auth';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import RouteComposer from '../RouteComposer/RouteComposer';
import RouteProfile from '../RouteProfile/RouteProfile';
import Landing from '../Landing/Landing';

import Authorization from '../Authorization/Authorization';
import Preloader from '../Preloader/Preloader';
import Popup from '../Popup/Popup';
import NotFound from '../NotFound/NotFound';

import { 
  Route, 
  Switch, 
  Redirect, 
  withRouter, 
  useHistory 
} from 'react-router-dom';

function App() {

  const windowWidth = useWindowSize();

  const [ isLoggedIn, setLoggedIn ] = React.useState(false);
  const [ currentUser, setCurrentUser ] = React.useState({});
  const [ permissionsChecked, setPermissionsChecked ] = React.useState(false);

  const [ isTooltipPopupOpened, setTooltipPopupOpened ] = React.useState(false);
  const [ isActionSuccessful, setActionSuccessful ] = React.useState(false);
  const [ isPageLoading, setPageLoading ] = React.useState(false);

  const [ movies, setMovies ] = React.useState([]);
  const [ savedMovies, setSavedMovies ] = React.useState([]);
  
  const [ filteredMovies, setFilteredMovies ] = React.useState([]);
  const [ filteredSavedMovies, setFilteredSavedMovies ] = React.useState([]);

  const history = useHistory();

  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    if (!isLoggedIn) {
      setCurrentUser({});
      setMovies([]);
      setFilteredSavedMovies([]);
      setFilteredMovies([]);
    } else {
      return
    }
  }, [isLoggedIn]);

  React.useEffect(() => {
    if (!isLoggedIn){
      setPageLoading(false)
      return;
    }
    setPageLoading(true)
    Promise.all([
      mainApi.getUserInfo(),
      mainApi.getSavedMovies(),
      moviesApi.getMovies(),
    ])
      .then(([userData, savedMovies, movies]) => {
        let localMovies = [];
        const setlocalMovies = () => {
          if (!localStorage.getItem('movies')) {
            localStorage.setItem('movies', JSON.stringify(movies));
          } else {
            localStorage.removeItem('movies');
            localStorage.setItem('movies', JSON.stringify(movies));
          }
          return localMovies = JSON.parse(localStorage.getItem('movies'));
        };
        setCurrentUser(userData);
        setSavedMovies(savedMovies);
        setMovies(setlocalMovies());
      })
      .catch((err) => {
        setPageLoading(false);
        console.log(err)
      })
      .finally(() => {
        setPageLoading(false);
        console.log('App boot success');
      })
  }, [isLoggedIn]);

  function closeTooltipPopup() {
    setTooltipPopupOpened(false);
  }

  function updateFilteredMovies(value) {
    setFilteredMovies(value);
  }

  function updateFilteredSavedMovies(value) {
    setFilteredSavedMovies(value);
  }

  function handleSaveMovie(movie) {
    mainApi.saveMovie(movie)
      .then((savedMovie) => {
        setSavedMovies([savedMovie, ...savedMovies]);
        setFilteredSavedMovies([savedMovie, ...filteredSavedMovies]);
      })
      .catch((err) => console.log(err));
  }

  function handleRemoveSavedMovie(movieId) {
    mainApi.removeSavedMovie(movieId)
      .then((deletedMovie) => {
        const refreshMovies = savedMovies.filter((c) => c._id !== deletedMovie._id);
        setSavedMovies(refreshMovies);
        setFilteredSavedMovies(refreshMovies);
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(user) {
    setPageLoading(true);
    mainApi.setUserInfo(user)
      .then((user) => {
        setTooltipPopupOpened(true);
        setActionSuccessful(true);
        setCurrentUser(user)
      })
      .catch((err) => {
        console.log(err)
        setTooltipPopupOpened(true);
        setActionSuccessful(false);
      })
      .finally(() => {
        setPageLoading(false);
      })
  }

  function tokenCheck() {
    let jwt = localStorage.getItem('jwt');
    if (jwt) {
      return auth.checkTokenValidity(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setPermissionsChecked(true);
        })
    } else {
      setPermissionsChecked(true);
    }
  };

  function signIn(email, password) {
    auth.signIn(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          tokenCheck();
          setLoggedIn(true);
          history.push('/movies');
        } else {
          return
        }
      })
      .catch((err) => {
        console.log(err);
        setTooltipPopupOpened(true);
        setActionSuccessful(false);
      })
      .finally(() => {
        setPageLoading(false);
      })
  }

  function handleLogin(email, password) {
    setPageLoading(true);
    if (!email || !password) {
      console.log('login-error');
      return;
    }
    signIn(email, password);
    history.push('/movies');
  }

  function handleRegistration(name, email, password) {
    setPageLoading(true);
    auth.signUp(name, email, password)
      .then((res) => {
        if (res) {
          signIn(email, password);
        } else {
          setTooltipPopupOpened(true);
          setActionSuccessful(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setTooltipPopupOpened(true);
        setActionSuccessful(false);
      })
      .finally(() => {
        setPageLoading(false);
      })
  }

  function signOut() {
    setPageLoading(false);
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setCurrentUser({});
  };

  if (!permissionsChecked){
    return null;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="content">
          <Preloader 
            isPageLoading={isPageLoading}
          />
          <Popup 
            isOpen={isTooltipPopupOpened}
            isActionSuccessful={isActionSuccessful}
            onClose={closeTooltipPopup}
          />
          <Switch>
            <Route exact path="/">
              <Landing
                loggedIn={isLoggedIn}
              />
            </Route>
            <ProtectedRoute path="/movies"
              component={RouteComposer}
              loggedIn={isLoggedIn}

              movies={movies}
              filteredMovies={filteredMovies}

              updateFilteredMovies={updateFilteredMovies}

              savedMovies={false}
              savedMoviesArray={savedMovies}
              windowWidth={windowWidth}

              saveMovie={handleSaveMovie}
              deleteMovie={handleRemoveSavedMovie}
            />
            <ProtectedRoute path="/saved-movies"
              component={RouteComposer}
              loggedIn={isLoggedIn}

              movies={savedMovies}
              filteredMovies={filteredSavedMovies}

              updateFilteredMovies={updateFilteredSavedMovies}

              savedMovies={true}
              savedMoviesArray={savedMovies}
              windowWidth={windowWidth}

              deleteMovie={handleRemoveSavedMovie}
            />
            <ProtectedRoute path="/profile" 
              component={RouteProfile}
              loggedIn={isLoggedIn}

              onSubmit={handleUpdateUser}
              signOut={signOut}
            />
            <Route path="/movies">
              {isLoggedIn ? <Redirect to="/movies" /> : <Redirect to="/" />}
            </Route>
            <Route path="/sign-in">
              <Authorization 
                signIn={true}
                greeting={'Рады видеть!'}
                submit={'Войти'}
                subline={'Ещё не зарегистрированы? '}
                linkText={'Регистрация'}
                link={'/sign-up'}
                handleSubmit={handleLogin}
                isPageLoading={isPageLoading}
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
                handleSubmit={handleRegistration}
                isPageLoading={isPageLoading}
              />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
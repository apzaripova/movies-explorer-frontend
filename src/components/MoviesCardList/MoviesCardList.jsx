import React from 'react';
import { Route, useLocation, useState } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import {
  BREAKPOINT_MOBILE,
  BREAKPOINT_TABLET,
  BREAKPOINT_DESKTOP,
  VISIBLE_MOVIES_MOBILE,
  MOVIES_TO_LOAD_MOBILE,
  VISIBLE_MOVIES_TABLET,
  MOVIES_TO_LOAD_TABLET,
  VISIBLE_MOVIES_DESKTOP,
  MOVIES_TO_LOAD_DESKTOP } 
  from '../../utils/constants';
import DisplayMovieCards from '../../utils/MoviesToDisplay';

function MoviesCardList(props) {

  const [visibleMovies, setVisibleMovies] = React.useState(0);
  const [moviesToLoad, setMoviesToLoad] = React.useState(0);
  const { windowWidth } = DisplayMovieCards();
  const location = useLocation();

  React.useState(() => {
    if (location.pathname === '/movies') {
      if (windowWidth <= BREAKPOINT_MOBILE) {
        setVisibleMovies(VISIBLE_MOVIES_MOBILE);
        setMoviesToLoad(MOVIES_TO_LOAD_MOBILE);
      } else if (windowWidth <= BREAKPOINT_TABLET) {
        setVisibleMovies(VISIBLE_MOVIES_TABLET);
        setMoviesToLoad(MOVIES_TO_LOAD_TABLET);
      } else if (windowWidth < BREAKPOINT_DESKTOP && windowWidth >= BREAKPOINT_TABLET) {
        setVisibleMovies(VISIBLE_MOVIES_DESKTOP);
        setMoviesToLoad(MOVIES_TO_LOAD_DESKTOP);
      } else if (windowWidth >= BREAKPOINT_DESKTOP) {
        setVisibleMovies(VISIBLE_MOVIES_DESKTOP)
        setMoviesToLoad(MOVIES_TO_LOAD_DESKTOP);
      }
    }
  }, [windowWidth, location]);

  function calculateShowMore() {
    return window.innerWidth > 1279 ? 3 : 2;
  }

  //number of movies to render
  const [totalNumberToRender, setTotalNumberToRender] = useState(() => {
    if (window.innerWidth > 1279) {
      return 12;
    } else if (window.innerWidth > 767) {
      return 8;
    } else return 5;
  });

  function handleMoreClick() {
    const moviesNumber = totalNumberToRender + calculateShowMore();

    if (moviesNumber < props.movies.length) {
      setTotalNumberToRender(moviesNumber);
    } else {
      setTotalNumberToRender(props.movies.length);
    }
  } 

  return (
    <section className="movie-list">
    <Route exact path="/movies">
      {props.moviesNotFound && <p className="movie-list__not-found">Ничего не найдено</p>}
      {!props.isLoading && props.isFailed && <p className="movie-list__not-found">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p>}
      <ul className="movie-list__container">
        {
          props.movies.slice(0, visibleMovies).map((movie, i) => (
            <MoviesCard
            key={i}
            movie={movie}
            onSaveClick={props.onSaveClick}
            savedMovies={props.savedMovies}
            onMovieDelete={props.onMovieDelete}
            />
          ))
        }
      </ul>
        {props.movies.length > 0 &&
        totalNumberToRender < props.movies.length && (
          <button className="card-list__more" onClick={handleMoreClick}>
            Ещё
          </button>
        )}
    </Route>
    <Route path="/saved-movies">
    {props.savedMoviesNotFound && <p className="movie-list__not-found">Ничего не найдено</p>}
      {!props.isLoading && props.isFailed && <p className="movie-list__not-found">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p>}
      <ul className="movie-list__container">
          {
            props.movies.map((movie, i) => (
              <MoviesCard
              key={i}
              movie={movie}
              savedMovies={props.savedMovies}
              onMovieDelete={props.onMovieDelete}
              />
            ))
          }
        </ul>
    </Route>
  </section>)  
};

export default MoviesCardList;
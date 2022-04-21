import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {

  function calculateShowMore() {
    return window.innerWidth > 1279 ? 3 : 2;
  }

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
          props.movies.slice(0).map((movie, i) => (
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
    {props.movies.length > 0 &&
        !props.isSavedMoviesPage &&
        totalNumberToRender < props.movies.length && (
          <button className="card-list__more" onClick={handleMoreClick}>
            Ещё
          </button>
        )}
  </section>)  
};

export default MoviesCardList;
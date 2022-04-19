import React from 'react';
import { Route } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {

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
  </section>)  
};

export default MoviesCardList;
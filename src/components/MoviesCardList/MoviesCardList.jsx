import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

import './MoviesCardList.css';

function MoviesCardList(props) {

  return (
    <section className="movie-list">
      {props.isLoading && <Preloader />}
      {props.movies.length === 0
      ? <p className="movie-list__not-found">{props.searchInfoBox}</p>
      : <ul className="movie-list__container">
        {props.movies.map((movie, i) => {
          <MoviesCard
            key={i}
            movie={movie}
            onSaveClick={props.onSaveClick}
            savedMovies={props.savedMovies}
            onMovieDelete={props.onMovieDelete}
          />
        })}
      </ul>
    }
  </section>)  
};

export default MoviesCardList;
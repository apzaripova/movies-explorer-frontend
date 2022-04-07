import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList(props) {

  return (
    <section className="movie-list">
      {props.isLoading && <Preloader />}
      {props.cards.length === 0
      ? <p className="movie-list__not-found">{props.searchInfoBox}</p>
      : <ul className="movie-list__container">
        {props.cards.map((card) => {
          <MoviesCard
            key={card.movieId} 
            card={card}  
            isSavedMoviesPage={props.isSavedMoviesPage}
            onSaveMovie={props.onSaveMovie}
            onDeleteMovie={props.onDeleteMovie}
          />
        })}
      </ul>
    }
  </section>) 
};

export default MoviesCardList;
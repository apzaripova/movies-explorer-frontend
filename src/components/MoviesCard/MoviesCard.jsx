import React from 'react';
import {baseUrl, MINUTES_SECONDS} from '../../utils/constants';

import './MoviesCard.css';

function MoviesCard(props) {

  const isSaved = props.savedMovies.some(item => item.movieId === props.movie.id);

  const movieCardClassName = `button button_type_save ${isSaved ? 'button_type_save-active' : ''}`;

  const handleCheckBoxClick = () => {
    if (isSaved) {
      props.onMovieDelete(props.movie);
    } else {
      props.onSaveClick(props.movie);
    }
  }

  function handleOpenTrailerClick() {
    window.open(props.movie.trailerLink || props.movie.trailer);
  }

  function handleDeleteClick() {
    props.onMovieDelete(props.movie);
  }

  const duration = `${Math.floor(props.movie.duration / MINUTES_SECONDS)}ч ${props.movie.duration % MINUTES_SECONDS}м`;
  const movieImage = props.movie.image.url ? baseUrl + props.movie.image.url : props.movie.image;

  return (
    <li className="movie">
      <img className="movie__image" src={movieImage} alt={props.movie.nameRU} onClick={handleOpenTrailerClick}/>
        <div className="movie__info">
          <div className="movie__description">
            <h2 className="movie__title">{props.movie.nameRU}</h2>
            <p className="movie__duration">{duration}</p>
          </div>
          {props.savedMovies ?
            <button className="button button_type_delete" type="button" aria-label="delete button" onClick={handleDeleteClick}/> :
            <button className={movieCardClassName} type="button" aria-label="delete button" onClick={handleCheckBoxClick}/>
          }
        </div>
    </li>
  )
};

export default MoviesCard;
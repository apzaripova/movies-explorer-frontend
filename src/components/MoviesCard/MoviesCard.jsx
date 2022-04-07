import React from 'react';
import {baseUrl, MINUTES_SECONDS} from '../../utils/constants';
import { SavedMoviesContext } from '../../contexts/SavedMoviesContext';

function MoviesCard(props) {
  const savedMovies = React.useContext(SavedMoviesContext);
  const isSaved = savedMovies.some(movie => movie.movieId === props.card.movieId);

  const movieCardClassName = `button button_type_save ${isSaved ? 'button_type_save-active' : ''}`;

  const handleCheckBoxClick = () => {
    if (isSaved) {
      props.onDeleteMovie(props.card);
    } else {
      props.onSaveMovie(props.card);
    }
  }

  function handleOpenTrailerClick() {
    window.open(props.card.trailerLink || props.card.trailer);
  }

  function handleDeleteClick() {
    props.onDeleteMovie(props.card);
  }

  const duration = `${Math.floor(props.card.duration / MINUTES_SECONDS)}ч ${props.card.duration % MINUTES_SECONDS}м`;
  const movieImage = props.card.image.url ? baseUrl + props.card.image.url : props.card.image;

  return (
    <li className="movie">
      <img className="movie__image" src={movieImage} alt={props.card.nameRU} onClick={handleOpenTrailerClick}/>
        <div className="movie__info">
          <div className="movie__description">
            <h2 className="movie__title">{props.card.nameRU}</h2>
            <p className="movie__duration">{duration}</p>
          </div>
          {props.isSavedMoviesPage ?
            <button className="button button_type_delete" type="button" aria-label="delete button" onClick={handleDeleteClick}/> :
            <button className={movieCardClassName} type="button" aria-label="delete button" onClick={handleCheckBoxClick}/>
          }
        </div>
    </li>
  )
};

export default MoviesCard;
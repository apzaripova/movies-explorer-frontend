import React from "react";
import { baseUrl } from "../../utils/constants";

function MoviesCard(props) {
  const isLiked = !props.isSavedMovies && props.likedMovies(props.movie);

  function handleLikeClick() {
    props.onAddMovie({
      country: props.movie.country,
      director: props.movie.director,
      duration: props.movie.duration,
      year: props.movie.year,
      description: props.movie.description,
      image: `${baseUrl}${props.movie.image ? props.movie.image.url : ""}`,
      trailer: props.movie.trailerLink,
      thumbnail: `${baseUrl}${
        props.movie.image.formats.thumbnail
          ? props.movie.image.formats.thumbnail.url
          : ""
      }`,
      movieId: props.movie.id,
      nameRU: props.movie.nameRU,
      nameEN: props.movie.nameEN,
      isSaved: props.movie.isSaved,
    });
  }

  function handleDeleteClick() {
    props.onDelete(props.movie);
  }

  return (
    <div className="card">
      <div className="card__description">
        <ul className="card__description-container">
          <li className="card__title">{props.name || props.movie.nameRU}</li>
          <li className="card__duration">{`${Math.floor(
            (props.duration || props.movie.duration) / 60
          )}ч ${(props.duration || props.movie.duration) % 60}м`}</li>
        </ul>
        {props.isSavedMovies ? (
          <div className="card__delete" onClick={handleDeleteClick} />
        ) : (
          <div
            className={`card__like ${isLiked ? "card__like_active" : ""}`}
            onClick={handleLikeClick}
          />
        )}
      </div>
      <a
        href={props.trailerLink || props.trailer}
        target="_blank"
        rel="noopener noreferrer nofollow
  "
      >
        <img
          className="card__img"
          alt={props.name}
          src={
            props.isSavedMovies
              ? props.movie.image
              : `${baseUrl}${
                  props.movie.image ? props.movie.image.url : props.image
                }`
          }
        />
      </a>
    </div>
  );
}

export default MoviesCard;
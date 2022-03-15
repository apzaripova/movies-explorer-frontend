import React from 'react';
import movie_pic from '../../images/jpg/movie-picture.jpg';
import * as CONSTANTS from '../../utils/constants';

function MoviesCards(props) {

  const cardData = props.card;
  const MOVIES_URL = CONSTANTS.MOVIES_URL;
  const [isSaved, setIsSaved ] = React.useState(false);

  React.useEffect(() => {
    setInitialLikes();
  }, []);

  function setInitialLikes() {
    const processedCard = props.savedMoviesArray.find((card) => returnSavedMovie(card));
    if (processedCard) {
      setIsSaved(true);
    } else {
      setIsSaved(false);
    }
  }

  function returnSavedMovie(card) {
    return card.movieId === cardData.id;
  }

  function convertTime(mins) {
    const hours = Math.trunc(mins/60);
	  const minutes = mins % 60;
	  return hours > 0 ? `${hours}ч ${minutes}м` : `${minutes}м`;
  };

  function saveMovie(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    setIsSaved(true);
    const movieProps = {
      country: cardData.country || CONSTANTS.DEFAULT_DATA.country,
      director: cardData.director  || CONSTANTS.DEFAULT_DATA.director,
      duration: cardData.duration  || CONSTANTS.DEFAULT_DATA.duration,
      year: cardData.year  || CONSTANTS.DEFAULT_DATA.year,
      description: cardData.description  || CONSTANTS.DEFAULT_DATA.description,
      image: `${MOVIES_URL}${cardData.image.url}` || movie_pic,
      trailer: cardData.trailerLink || CONSTANTS.DEFAULT_DATA.trailer,
      thumbnail: `${MOVIES_URL}${cardData.image.formats.thumbnail.url}` || movie_pic,
      movieId: cardData.id,
      nameRU: cardData.nameRU || CONSTANTS.DEFAULT_DATA.nameRU,
      nameEN: cardData.nameEN || CONSTANTS.DEFAULT_DATA.nameEN,
    };
    props.saveMovie(movieProps);
  }

  function styleAdjustments() {
    if (!props.savedMovies) {
      return `${MOVIES_URL}${cardData.image.url}`
    } else {
      return cardData.image
    }
  }

  function deleteMovie(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    if (!props.savedMovies) {
      const processedCard = props.savedMoviesArray.find((card) => returnSavedMovie(card));
      props.deleteMovie(processedCard._id);
      setIsSaved(false);
    } else {
      props.deleteMovie(cardData._id);
      setIsSaved(false);
    }
  }

  return (
    <li className="card">
      <a href={cardData.trailerLink} target="_blank" rel="noreferrer" className="card__trailer-link">
        <img src={`${cardData.image !== null
                    ? styleAdjustments()
                    : movie_pic
                  }`} 
            alt={cardData.nameRU} 
            className="card__image" 
          />
        <div className="card__info-box">
          <div className="card__text-container">
            <p className="card__title">{cardData.nameRU}</p>
            <p className="card__length-info">{convertTime(cardData.duration)}</p>
          </div>
          <button type="button" 
            className={`card__button ${props.savedMovies ? 'hidden' : isSaved ? 'card__button_state_saved': ''}`} 
            onClick={!isSaved ? evt => saveMovie(evt) : evt => deleteMovie(evt)} 
          />
          <button type="button" 
            className={`card__button card__button_state_cancel ${props.savedMovies ? '' : 'hidden'}`}
            onClick={evt => deleteMovie(evt)}
          />
        </div>
      </a>
    </li>
  );
}

export default MoviesCards;
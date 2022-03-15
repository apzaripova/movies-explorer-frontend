import React from 'react';
import movie_pic from '../../images/jpg/movie-picture.jpg';

function MoviesCards(props) {

  const [isSaved, setIsSaved ] = React.useState(false);

  function saveMovie() {
    setIsSaved(!isSaved);
  }

  return (
    <li className="card">
      <img src={movie_pic} alt="movie_pic" className="card__image" />
      <div className="card__info-box">
        <div className="card__text-container">
          <p className="card__title">33 слова о дизайне</p>
          <p className="card__length-info">1ч42м</p>
        </div>
        <button type="button" className={`card__button ${props.savedMovies ? 'hidden' : isSaved ? 'card__button_state_saved': ''}`} onClick={saveMovie} />
        <button type="button" className={`card__button card__button_state_cancel ${props.savedMovies ? '' : 'hidden'}`} />
      </div>
    </li>
  );
}

export default MoviesCards;
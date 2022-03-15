import React from 'react';
import * as CONSTANTS from '../../utils/constants';

function SearchBar(props) {
  const [ movie, setMovie ] = React.useState('');
  const [ isMovieValid, setMovieValid ] = React.useState(true);
  const [ isChecked, setChecked ] = React.useState(false);
  const [ isTooltipVisible, setTooltipVisible ] = React.useState(false);

  React.useEffect(() => {
    const toolTip = setTimeout(() => {
      setTooltipVisible(false);
    }, 7000);
    return () => clearTimeout(toolTip);
  }, [isTooltipVisible]);

  function toggleCheckbox() {
    setChecked(!isChecked);
  }

  function toggletooltip() {
    setTooltipVisible(true);
  }

  function handleInput (evt) {
    setMovie(evt.target.value);
  }

  function handleFilter(movie, searchSrting) {
    return movie.nameRU.toLowerCase().includes(searchSrting.toLowerCase());
  }

  function validateInput() {
    if (movie.length > 30) {
      setMovieValid(false);
    } else {
      setMovieValid(true);
    }
  }
  
  function filterMoviesArray(movies, searchSrting) {
    if (isChecked) {
      const shortFilm = movies.filter((movie) => {
        return movie.duration <= CONSTANTS.SHORT_MOVIE_LENGTH && handleFilter(movie, searchSrting);
      });
      return shortFilm;
    } else {
      const filteredMovies = movies.filter((movie) => {
        return handleFilter(movie, searchSrting);
      });
      return filteredMovies;
    } 
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    let filteredMovies = filterMoviesArray(props.movies, movie);
    props.updateFilteredMovies(filteredMovies);
    if (filteredMovies.length === 0 ) {
      return props.setErrorMessage(CONSTANTS.DEFAULT_MESSAGE.CARD_MOVIES.NOT_FOUND);
    } else if (movie === '') {
      filteredMovies = props.movies;
    }
  }

  return (
    <section className="search-bar">
      <div className={`search-bar__tooltip ${!isTooltipVisible ? 'search-bar__tooltip_hidden' : ''}`}>
        <p className="search-bar__tootip-text">
        Введите название фильма, либо просто нажмите кнопку "Поиск", чтобы отобразить все карточки с фильмами.
        </p>
      </div>
      <form className="search-bar__form" 
        onSubmit={handleSubmit}
        onChange={evt => validateInput(evt)}
      >
        <input 
          type="text" 
          placeholder="Поиск по фильмам" 
          className={`search-bar__input ${!isMovieValid ? 'search-bar__input-error' : ''}`}
          value={movie}
          onChange={evt => handleInput(evt)}
          onClick={toggletooltip}
        />
        <div className="search-bar__container">
          <label htmlFor="checkbox" className="search-bar__switch">
            <input type="checkbox" 
              className="search-bar__checkbox" 
              onChange={toggleCheckbox} id="checkbox"
            />
            <span className="search-bar__slider"></span>
          </label>
          <p className="search-bar__placeholder">Короткометражки</p>
        </div>
        <button type="submit" 
          className={`search-bar__submit ${!isMovieValid ? 'search-bar__submit_disabled': ''}`}
          disabled={!isMovieValid}>
          Поиск</button>
      </form>
    </section>
  );
}

export default SearchBar;
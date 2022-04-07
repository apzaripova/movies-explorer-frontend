import React, { useState } from "react";
import "./SearchForm.css";
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm(props) {
  const [keyWords, setKeyWords] = React.useState('');
  const [isShortFilm, setIsShortFilm] = React.useState(false);

  function handleKeyWordsChange(e) {
    setKeyWords(e.target.value);
  }

  function handleFilterCheckbox (checkboxValue) {
    setIsShortFilm(checkboxValue);
  }


  function handleSubmit(e) {
    e.preventDefault();
    
    props.onSearchMovies(props.moviesPool, keyWords, isShortFilm);
    
    e.target.reset();
    setIsShortFilm(false);
  }

  return (
    <>
      <section className="search-form">
          <form className="search-form__form" onSubmit={handleSubmit}>
              <input
                className="search-form__input"
                type="text"
                name="search"
                placeholder="Фильм"
                minLength="2"
                maxLength="40"
                onChange={handleKeyWordsChange}
                required
              />
            <button 
            type="submit" 
            className="button_type_search"
            aria-label="search a movie">
          </button>
          </form>
        <FilterCheckbox 
          onFilterCheckbox={handleFilterCheckbox}
          />
      </section>
    </>
  );
}

export default SearchForm;
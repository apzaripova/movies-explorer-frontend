import React, { useState } from "react";
import "./SearchForm.css";
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm(props) {
  const [searchedMovie, setSearchedMovie] = useState(props.keyword);
  const [error, setError] = React.useState('');
  const [isFormValid, setIsFormValid] = React.useState(false);

  function handleSearchMovie(e) {
    setSearchedMovie(e.target.value);
    if (!props.isSavedMoviesPage && e.target.value.length < 1) {
      setError("Нужно ввести ключевое слово");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!props.isSavedMoviesPage && searchedMovie.length < 1) {
      setError("Нужно ввести ключевое слово");
    } else {
      props.onSubmit(searchedMovie);
      setError("");
    }
  }

  function handleChangeCheckbox() {
    props.onChangeCheckbox();
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
                value={searchedMovie}
                onChange={handleSearchMovie}
                required
              />
            <button 
            type="submit" 
            className={`button_type_search ${!isFormValid ? "button_type_search_disabled" : ""}`} 
            aria-label="search a movie">
          </button>
          </form>
          <span className="search-form__input-error">{error}</span>
        <FilterCheckbox 
          onToggleCheckbox={handleChangeCheckbox}
          checked={props.checked}
          />
      </section>
    </>
  );
}

export default SearchForm;
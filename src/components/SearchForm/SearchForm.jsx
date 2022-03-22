import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm(props) {
  const [query, setQuery] = useState();
  const [error, setError] = React.useState("");
  const location = useLocation().pathname;
  const handleSearchMovie = (e) => setQuery(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (location === '/movies') localStorage.setItem('query', query);
    props.onSubmit(query);
  };

  useEffect(() => {
    if (location === '/movies') return localStorage.query && setQuery(localStorage.query);
    props.onSubmit('');
    return null;
  }, []);

  useEffect(() => {
    if (location === '/saved-movies') {
      setQuery('');
    }
  }, [props.handleShortMovie]);

  return (
    <>
      <section className="search-form">
        <div className="search-form__container">
          <form className="search-form__form" onSubmit={handleSubmit}>
            <label className="search-form__field">
              <input
                className="search-form__input"
                type="text"
                name="search"
                placeholder="Фильм"
                minLength="2"
                maxLength="40"
                value={query || ''}
                onChange={handleSearchMovie}
                required
              />
            </label>
          </form>
          <button
            className="submit__button"
            type="submit"
            onClick={handleSubmit}
          ></button>
        </div>
        <div className="form__item-error">{error}</div>
        <FilterCheckbox onClick={props.handleShortMovie} />
      </section>
    </>
  );
}

export default SearchForm;
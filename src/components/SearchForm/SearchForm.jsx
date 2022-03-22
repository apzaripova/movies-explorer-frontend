import React, { useState } from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm(props) {
  const [findedMovie, setFindedMovie] = useState("");
  const [error, setError] = React.useState("");
  const [formValid, setFormValid] = React.useState(false);

  function handleSearchMovie(e) {
    setFindedMovie(e.target.value);
    if (e.target.value.length === 0) {
      setError("Нужно ввести ключевое слово");
    } else {
      setError("");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    props.onGetMovies(findedMovie);
    setFindedMovie("");
  }

  React.useEffect(() => {
    if (findedMovie && !error) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [findedMovie, error]);

  function handleChangeCheckbox() {
    props.onChangeCheckbox();
  }

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
                value={findedMovie}
                onChange={handleSearchMovie}
                required
              />
            </label>
          </form>
          <button
            className="submit__button"
            type="submit"
            onClick={handleSubmit}
            disabled={!formValid}
          ></button>
        </div>
        <div className="form__item-error">{error}</div>
        <FilterCheckbox 
          onToggleCheckbox={handleChangeCheckbox}
          checked={props.checked}
          />
      </section>
    </>
  );
}

export default SearchForm;
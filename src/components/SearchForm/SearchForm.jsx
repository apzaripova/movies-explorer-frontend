import React, { useState } from "react";
import "./SearchForm.css";
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm(props) {
  const [keyword, setKeyword] = React.useState('');
  const [error, setError] = React.useState('');
  const [isFormValid, setIsFormValid] = React.useState(false);

  function handleChange(evt) {
    setKeyword(evt.target.value);
    setError('Введите ключевое слово');
    setIsFormValid(evt.target.closest('form').checkValidity());
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (isFormValid) {
      props.onSubmit(keyword)
    } else {
      setError('Введите ключевое слово');
    }
  }

  function handleChangeCheckbox() {
    props.onChangeCheckbox();
  }

  return (
    <>
      <section className="search-form">
          <form className="search-form__form" onSubmit={handleSubmit}>
            <label className="search-form__field">
              <input
                className="search-form__input"
                type="text"
                name="search"
                placeholder="Фильм"
                minLength="2"
                maxLength="40"
                onChange={handleChange}
                required
              />
            </label>
            <button 
            type="submit" 
            className="button_type_search"
            aria-label="search a movie">
          </button>
          </form>
        <FilterCheckbox 
          onToggleCheckbox={handleChangeCheckbox}
          checked={props.checked}
          />
      </section>
    </>
  );
}

export default SearchForm;
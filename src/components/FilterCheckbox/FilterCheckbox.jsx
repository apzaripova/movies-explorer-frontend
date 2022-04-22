import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox(props) {

  function handleCheck(evt) {
    props.onToggleCheckbox(evt.target.checked)
  }
  
  return (
    <section className="filter-checkbox">
      <label className="search-form__filter-container">
        Короткометражки
        <input
          type="checkbox"
          name="short-movies"
          id="short-movies"
          className="search-form__filter-checkbox"
          checked={props.checked}
          onChange={handleCheck}
        />
        <span className="search-form__filter-checkmark"></span>
      </label>
    </section>
  );
}

export default FilterCheckbox;
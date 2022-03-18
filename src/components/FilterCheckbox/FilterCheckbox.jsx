import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox(props) {
  return (
    <section className="filter-checkbox">
      <label className="search-form__filter-container">
        Короткометражки
        <input
          type="checkbox"
          name="short-movies"
          id="short-movies"
          className="search-form__filter-checkbox"
          onChange={props.onFilter}
          checked={props.isShortMovie}
        />
        <span className="search-form__filter-checkmark"></span>
      </label>
    </section>
  );
}

export default FilterCheckbox;
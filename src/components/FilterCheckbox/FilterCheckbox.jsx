import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox(props) {

  const handleClick = (e) => {
    let isChecked = e.target.checked;
        
    props.onFilterCheckbox(isChecked);
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
          onClick={handleClick}
        />
        <span className="search-form__filter-checkmark"></span>
      </label>
    </section>
  );
}

export default FilterCheckbox;
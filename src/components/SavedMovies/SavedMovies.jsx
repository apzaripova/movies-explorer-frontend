import React from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import Footer from "../Footer/Footer";

function SavedMovies(props) {
  return (
    <section className="saved-movies">
      <Header className="header header__white">
        <Navigation onClick={props.onMenu} />
      </Header>
      <SearchForm onGetMovies={props.onGetMovies} />
      <FilterCheckbox
        onFilter={props.onFilter}
        isShortMovie={props.isShortMovie}
      />
      {props.movies.length > 0 ? (
        <MoviesCardList
          isSavedMovies={props.isSavedMovies}
					movies={props.movies}
          onGetMovies={props.onGetMovies}
          onDelete={props.onDelete}
          message={props.message}
        />
      ) : (
        <p className="movies-message">У вас пока нет сохраненных фильмов</p>
      )}

      <Footer />
    </section>
  );
}

export default SavedMovies;
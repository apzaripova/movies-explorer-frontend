import React from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";

function SavedMovies(props) {

  return (
    <section className="saved-movies">
      <Header className="header header__white">
        <Navigation onClick={props.onMenu} />
      </Header>
      <SearchForm 
        onSubmit={props.onHandleSubmit} 
        onChangeCheckbox={props.onChangeCheckbox}
        isSavedMoviesPage={props.isSavedMoviesPage}
        checked={props.checked}
        keyword={props.keyword}
        />
      <MoviesCardList 
        movies={props.movies}
        onMovieDelete={props.onMovieDelete}
        savedMovies={props.savedMovies}
        isSavedMoviesPage={props.isSavedMoviesPage}
        savedMoviesNotFound={props.onSavedNotFound}
        moviesNotFound={props.onMoviesNotFound}
        searchInfoBox={props.searchInfoBox}
        isLoading={props.isLoading}
        isFailed={props.isFailed}/>
      <Footer />
    </section>
  );
}

export default SavedMovies;
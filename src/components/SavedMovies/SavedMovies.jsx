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
        onSearchMovies={props.onSearchMovies} moviesPool={savedMovies}
        />
      <MoviesCardList 
        movies={props.movies}
        onMovieDelete={props.onMovieDelete}
        savedMovies={props.savedMovies}
        savedMoviesNotFound={props.onSavedNotFound}
        moviesNotFound={props.onMoviesNotFound}
        searchInfoBox={props.searchInfoBox}/>
      <Footer />
    </section>
  );
}

export default SavedMovies;
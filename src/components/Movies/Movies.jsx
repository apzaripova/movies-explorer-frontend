import React  from "react";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";

import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./Movies.css";

function Movies(props) {
  return (
    <section className="movies">
      <Header className="header header__white">
        <Navigation onClick={props.onMenu} />
      </Header>
      <SearchForm onSubmit={props.onSearch} handleShortMovie={props.handleShortMovie} />
       <MoviesCardList
        movies={props.movies}
        onGetMovies={props.handleGetMovies}
        onAddMovie={props.onAddMovie}
        isSavedMovies={false}
        message={props.message}
        savedMovies={props.savedMovies}
        likedMovies={props.likedMovies}
      />
      <Footer />
    </section>
  );
}

export default Movies;
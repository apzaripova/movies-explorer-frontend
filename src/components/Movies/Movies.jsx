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
      <SearchForm onSubmit={props.onHandleSubmit} 
                  onChangeCheckbox={props.onChangeCheckbox} 
                  checked={props.checked} />
       <MoviesCardList
          movies={props.movies}
          onSaveClick={props.onSaveClick}
          onMovieDelete={props.onMovieDelete}
          savedMovies={props.savedMovies}
          moviesNotFound={props.onMoviesNotFound}
          isLoading={props.isLoading}
          isFailed={props.isFailed}
          savedMovie={props.savedMovie}/>
      <Footer />
    </section>
  );
}

export default Movies;
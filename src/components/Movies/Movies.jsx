import React  from "react";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import Preloader from '../Preloader/Preloader';
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
                  isSavedMoviesPage={props.isSavedMoviesPage}
                  checked={props.checked}
                  keyword={props.keyword}/>
          {props.isLoading ? 
        (<Preloader />) :
       <MoviesCardList
          movies={props.movies}
          isLoading={props.isLoading}
          isFailed={props.isFailed}
          savedMovies={props.savedMovies}
          searchInfoBox={props.searchInfoBox}
          onSaveClick={props.onSaveClick}
          onMovieDelete={props.onMovieDelete}
          moviesNotFound={props.onMoviesNotFound}
          savedMovie={props.savedMovie}
          isSavedMoviesPage={props.isSavedMoviesPage}/> }
      <Footer />
    </section>
  );
}

export default Movies;
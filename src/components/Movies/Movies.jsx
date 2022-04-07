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
      <SearchForm onSearchMovies={props.onSearchMovies} moviesPool={props.movies} />
       <MoviesCardList
          isFailed={props.isFailed}
          cards={props.currentCards} 
          isLoading={props.isLoading} 
          isSavedMoviesPage={false}
          searchInfoBox={props.searchInfoBox} 
          onSaveMovie={props.onSaveMovie} 
          onDeleteMovie={props.onDeleteMovie}/>
        <button className={`movies__more ${props.movies.length < props.savedMovies.length ? '' : 'movies__more_invisible'}`}
              onClick={props.onLoadMore}>Ещё</button>
      <Footer />
    </section>
  );
}

export default Movies;
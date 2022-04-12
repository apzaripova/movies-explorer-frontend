import React  from "react";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

import "./Movies.css";

function Movies(props) {

  const allMoviesNumber = props.movies.length;
  const foundMoviesNumber = props.movies.length;

    function handleMoreButtonShow() {
        return foundMoviesNumber < allMoviesNumber
    }

    function handleMoreButtonClick() {
        let moviesToAddNumber = props.cardsRendering.add;
        if (allMoviesNumber > foundMoviesNumber + moviesToAddNumber) {
            props.onShowMoreMovies(foundMoviesNumber, moviesToAddNumber)
        } else {
            moviesToAddNumber = allMoviesNumber - foundMoviesNumber
            if (moviesToAddNumber > 0) {
                props.onShowMoreMovies(foundMoviesNumber, moviesToAddNumber)
            }
        }
    }

  return (
    <section className="movies">
      <Header className="header header__white">
        <Navigation onClick={props.onMenu} />
      </Header>
      <SearchForm onSubmit={props.onHandleSubmit} 
                  onChangeCheckbox={props.onChangeCheckbox} 
                  checked={props.checked}/>
       <MoviesCardList
          movies={props.movies}
          isLoading={props.isLoading}
          isFailed={props.isFailed}
          savedMovies={props.savedMovies}
          searchInfoBox={props.searchInfoBox}
          onSaveClick={props.onSaveClick}
          onMovieDelete={props.onMovieDelete}
          moviesNotFound={props.onMoviesNotFound}
          savedMovie={props.savedMovie}/>
        {handleMoreButtonShow() && <button className="movies__button" onClick={handleMoreButtonClick}>Ещё</button>}
      <Footer />
    </section>
  );
}

export default Movies;
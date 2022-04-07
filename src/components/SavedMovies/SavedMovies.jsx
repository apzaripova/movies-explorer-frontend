import React from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import { SavedMoviesContext } from '../../contexts/SavedMoviesContext';

function SavedMovies(props) {

  const savedMovies = React.useContext(SavedMoviesContext);

  return (
    <section className="saved-movies">
      <Header className="header header__white">
        <Navigation onClick={props.onMenu} />
      </Header>
      <SearchForm 
        onSearchMovies={props.onSearchMovies} moviesPool={savedMovies}
        />
      <MoviesCardList 
        cards={props.selectedSavedMovies} 
        isSavedMoviesPage={true} 
        onDeleteMovie={props.onDeleteMovie}
        searchInfoBox={props.searchInfoBox}/>
      <Footer />
    </section>
  );
}

export default SavedMovies;
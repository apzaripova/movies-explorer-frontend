import React from 'react';
import Header from '../Header/Header';
import SearchBar from '../SearchBar/SearchBar';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import * as CONSTANTS from '../../utils/constants';

function RouteMovies(props) {

  const [ errorMessage, setErrorMessage ] = React.useState('');
  const [ errorLink, setErrorLink ] = React.useState('');
  const [ errorLinkText, setErrorLinkText ] = React.useState('');

  
  React.useEffect(() => {
    setErrorMessage(CONSTANTS.DEFAULT_MESSAGE.CARD_MOVIES.INITIAL_STATE);
    setErrorLink('');
    setErrorLinkText('');
    if (props.savedMovies) {
      setErrorMessage(CONSTANTS.DEFAULT_MESSAGE.CARD_MOVIES.NO_SAVED_MOVIES);
      setErrorLink('/movies');
      setErrorLinkText(CONSTANTS.DEFAULT_MESSAGE.CARD_MOVIES.LINK_TEXT);
    };
  });

  return (
    <>
      <Header 
        loggedIn={props.loggedIn}
      />
      <SearchBar 
        movies={props.movies}
        updateFilteredMovies={props.updateFilteredMovies}
        setErrorMessage={setErrorMessage}
      />
      <MoviesCardList 
        movies={props.filteredMovies}
        savedMovies={props.savedMovies}
        savedMoviesArray={props.savedMoviesArray}
        
        errorMessage={errorMessage}
        windowWidth={props.windowWidth}

        saveMovie={props.saveMovie}
        deleteMovie={props.deleteMovie}

        errorLink={errorLink}
        errorLinkText={errorLinkText}
      />
      <Footer />
    </>
  );
}

export default RouteMovies;
import React  from "react";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import MoreButton from "../MoreButton/MoreButton";
import Preloader from '../Preloader/Preloader';
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

import "./Movies.css";

import { useWindowSize } from '../../utils/useWindowSize';
import { getCardsRender } from '../../utils/cardsRender';

function Movies(props) {

  const [isShortMovies, setIsShortMovies] = React.useState(false);
  const [moreBtnVisibility, setMoreBtnVisibility] = React.useState(false);
  const [amountCards, setAmountCards] = React.useState({total: 4, add: 3});

  const { width } = useWindowSize();

  //checkbox
  const filterMovies = !isShortMovies ? props.movies : props.movies.filter(
    (movie) => movie.duration <= 40,
  )

  // render cards
  React.useEffect (() => {
    setAmountCards(getCardsRender(width))
  }, [width])

  const handleMoreBtn = () => {
    return setAmountCards({
      ...amountCards,
      total: amountCards.total + amountCards.add,
    });
  };

  React.useEffect(() => { 
    if (filterMovies.length > amountCards.total) {
      setMoreBtnVisibility(true);
    } else {
      setMoreBtnVisibility(false);
    }
  }, [filterMovies, amountCards])

  return (
    <section className="movies">
      <Header className="header header__white">
        <Navigation onClick={props.onMenu} />
      </Header>
      <SearchForm onSubmit={props.onHandleSubmit} 
                  onChangeCheckbox={props.onChangeCheckbox} 
                  checked={props.checked}/>
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
          savedMovie={props.savedMovie}/> }
        <MoreButton 
          onMoreBtn={handleMoreBtn}
          isVisible={moreBtnVisibility}
      />
      <Footer />
    </section>
  );
}

export default Movies;
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardsList(props) {
  return (
    <section className="cards">
      <ul className="cards__list">
        <MoviesCard 
          savedMovies={props.savedMovies}
        />
        <MoviesCard 
          savedMovies={props.savedMovies}
        />
        <MoviesCard 
          savedMovies={props.savedMovies}
        />
        <MoviesCard 
          savedMovies={props.savedMovies}
        />
        <MoviesCard 
          savedMovies={props.savedMovies}
        />
        <MoviesCard 
          savedMovies={props.savedMovies}
        />
      </ul>
      <button type="button" className="cards__button">Ещё</button>
    </section>
  );
}

export default MoviesCardsList;
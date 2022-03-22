import React, { Suspense } from "react";
import "../MoviesCard/MoviesCard.css";
import Preloader from "../Preloader/Preloader";
import { MIN_NUMBER_OF_CARDS, MAX_NUMBER_OF_CARDS } from "../../utils/constants";
import More from "../More/More";
const MoviesCard = React.lazy(() => import("../MoviesCard/MoviesCard")); // Ленивая загрузка

function MoviesCardList(props) {
  const [counter, setCounter] = React.useState(4);

  function showMoreMovies() {
    setCounter(counter + 4);
  }
  return (
    <>
      <section className="movies-card">
        <Suspense fallback={<Preloader />}>
          {props.message ? (
            <p className="movies-message">{props.message}</p>
          ) : (
            props.movies
              .slice(0, counter)
              .map((movie, id) => (
                <MoviesCard
                  movie={movie}
                  name={movie.nameRU}
                  duration={movie.duration}
                  key={id}
                  id={movie._id}
                  {...movie}
                  isSavedMovies={props.isSavedMovies}
                  onAddMovie={props.onAddMovie}
                  onDelete={props.onDelete}
                  savedMovies={props.savedMovies}
                  likedMovies={props.likedMovies}
                />
              ))
          )}
        </Suspense>
      </section>
      {props.movies.length >= MIN_NUMBER_OF_CARDS &&
      props.movies.length > counter &&
      props.movies.length <= MAX_NUMBER_OF_CARDS &&
      !props.message ? (
				<More showMoreMovies={showMoreMovies}  />
      ) : (
        ""
      )}
    </>
  );
}

export default MoviesCardList;
import {SHORT_MOVIE_DURATION} from '../utils/constants';

function searchMovieByKeyword(movies, input) {
  const searchedMovies = movies.filter(movie => {
    return movie.nameRU.toLowerCase().includes(input.toLowerCase())
   }) 

   return searchedMovies
} 

  function searchShortMovie(movies) {
    const shortMovies = movies.filter((item) => {
        return item.duration <= SHORT_MOVIE_DURATION;
    });

    return shortMovies
}

const filterMovies = (movies, input, checked) => {
  if (checked) {
    const filteredByCheckboxMovies = searchShortMovie(movies);
    return searchMovieByKeyword(filteredByCheckboxMovies, input)
  } else {
    return searchMovieByKeyword(movies, input)
  }
};

export {searchMovieByKeyword, searchShortMovie, filterMovies};
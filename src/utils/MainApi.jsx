import { MAIN_API } from "../utils/constants";

class MainApi {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _getResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserData(jwt) {
    return fetch(`${this._url}${"users"}/${"me"}`, {
      method: "GET",
      credentials: 'include',
      headers: {
        authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then(this._getResponse);
  }

  editUserInfo(newData) {
    return fetch(`${this._url}users/me`, {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: newData.name,
        email: newData.email,
      }),
    }).then(this._getResponse);
  }

  getUserMovies(jwt) {
    return fetch(`${this._url}${"movies"}`, {
      method: "GET",
      credentials: 'include',
      headers: {
        authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then(this._getResponse);
  }

  addMovie(movie, jwt) {
    return fetch(`${this._url}${"movies"}`, {
      method: "POST",
      credentials: 'include',
      headers: {
        authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: movie.image,
        trailer: movie.trailer,
        thumbnail: movie.thumbnail,
        movieId: movie.movieId,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }),
    }).then(this._getResponse);
  }

  deleteMovie(id, jwt) {
    return fetch(`${this._url}${"movies"}/${id}`, {
      method: "DELETE",
      credentials: 'include',
      headers: {
        authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then(this._getResponse);
  }
}

const mainApi = new MainApi({
  url: MAIN_API,
  headers: {
    authorization: `Bearer ${localStorage.getItem("jwt")}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default mainApi;
import { baseUrl } from "../utils/constants";

class MainApi {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _getResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserData() {
    return fetch(`${this._url}${"users"}/${"me"}`, {
      method: "GET",
      credentials: 'include',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    }).then(this._getResponse);
  }

  editUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    }).then(this._getResponse);
  }

  getSavedMovies() {
    return fetch(`${this._url}/movies`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then((res) => {
      return this._getResponse(res)
    })
  }

  addMovie(data) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        country: data.country || 'остуствует',
        director: data.director || 'остуствует',
        duration: data.duration || 0,
        year: data.year || 'остуствует',
        description: data.description || 'остуствует',
        image: `${baseUrl}${data.image.url}`,
        trailer: data.trailerLink,
        thumbnail: `${baseUrl}${data.image.formats.thumbnail.url}`,
        movieId: data.id.toString(),
        nameRU: data.nameRU || 'остуствует',
        nameEN: data.nameEN || 'остуствует',
      })
    })
    .then((res) => {
      return this._getResponse(res)
    })
  }

  deleteMovie(movie) {
    return fetch(`${this._url}${"movies"}/${movie}`, {
      method: "DELETE",
      credentials: 'include',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
    }).then(this._getResponse);
  }
}

const mainApi = new MainApi({
  url: "https://movies-explorer.azaripova.nomoredomains.rocks",
  headers: {
    authorization: `Bearer ${localStorage.getItem("jwt")}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default mainApi;
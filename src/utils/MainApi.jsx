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
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    }).then(this._getResponse);
  }

  editUserInfo(newData) {
    return fetch(`${this._url}users/me`, {
      method: "PATCH",
      credentials: 'include',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        name: newData.name,
        email: newData.email,
      }),
    }).then(this._getResponse);
  }

  getSavedMovies() {
    return fetch(`${this._url}/movies`, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then((res) => {
      return this._checkResponse(res)
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
        country: data.country,  
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: `${BASE_URL}${data.image.url}`,
        trailer: data.trailerLink,
        thumbnail: `${BASE_URL}${data.image.formats.thumbnail.url}`,
        movieId: data.id.toString(),
        nameRU: data.nameRU,
        nameEN: data.nameEN,
      })
    })
    .then((res) => {
      return this._checkResponse(res)
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
  url: MAIN_API,
  headers: {
    authorization: `Bearer ${localStorage.getItem("jwt")}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default mainApi;
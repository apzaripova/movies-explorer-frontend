import { MAIN_API } from "../utils/constants";

class MainApi {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _getResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserData(token) {
    return fetch(`${this._url}${"users"}/${"me"}`, {
      method: "GET",
      credentials: 'include',
      headers: { ...this_headers, 'Authorization': `Bearer ${token}` }
    }).then(this._getResponse);
  }

  editUserInfo(data, token) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: { ...this_headers, 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    }).then(this._getResponse);
  }

  getSavedMovies(token) {
    return fetch(`${this._url}/movies`, {
      method: 'GET',
      headers: { ...this_headers, 'Authorization': `Bearer ${token}` }
    })
      .then((res) => {
        return this._getResponse(res)
      })
  }

  addMovie(data, token) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: { ...this_headers, 'Authorization': `Bearer ${token}` },
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

  deleteMovie(movie, token) {
    return fetch(`${this._url}/movies/${movie}`, {
      method: "DELETE",
      headers: { ...this_headers, 'Authorization': `Bearer ${token}` }
    }).then(this._getResponse);
  }
}

const mainApi = new MainApi({
  url: MAIN_API,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default mainApi;
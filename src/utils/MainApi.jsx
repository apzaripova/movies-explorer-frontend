import * as CONSTANTS from './constants';

class MainApi {
  constructor({ url }) {
    this._url = url;
    let jwt = localStorage.getItem('jwt');
    this._token = jwt;
  }

  handleResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
    }
    return res.json();
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`,
      {
        headers: {
          "Authorization": `Bearer ${this._token}`,
          'Content-Type': 'application/json'
        }
      })
      .then((res) =>
        this.handleResponse(res)
      )
  }

  setUserInfo(data) {
    return fetch(`${this._url}/users/me`,
      {
        method: 'PATCH',
        headers: {
          "Authorization": `Bearer ${this._token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then((res) =>
        this.handleResponse(res)
      )
  }

  getSavedMovies() {
    return fetch(`${this._url}/movies`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${this._token}`,
        'Content-Type': 'application/json'
      },
    })
    .then((res) =>
        this.handleResponse(res)
    )
  };

  saveMovie(movie) {
    return fetch(`${this._url}/movies`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${this._token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(movie),
    })
    .then((res) =>
      this.handleResponse(res)
    )
  }

  removeSavedMovie(movieId) {
    return fetch(`${this._url}/movies/${movieId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${this._token}`,
        'Content-Type': 'application/json'
      },
    })
    .then((res) =>
      this.handleResponse(res)
    )
  }
}

export const mainApi = new MainApi({
  url: CONSTANTS.BASE_URL
});
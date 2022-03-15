class MoviesApi {
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
  
    getMovies() {
      return fetch(`${this._url}`,
        {
          headers: {
            // "Authorization": `Bearer ${this._token}`,
            'Content-Type': 'application/json'
          }
        })
        .then((res) =>
          this.handleResponse(res)
        )
    };
  }
  
  export const moviesApi = new MoviesApi({
    url: 'https://api.nomoreparties.co/beatfilm-movies'
  });
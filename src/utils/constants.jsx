export const MOVIES_URL = 'https://api.nomoreparties.co';
export const BASE_URL = 'https://movies-explorer.azaripova.nomoredomains.rocks';

export const MIN_NUMBER_OF_CARDS = 4;
export const MAX_NUMBER_OF_CARDS = 100;

export const DEFAULT_DATA = {
    country: 'country N/A',
    director: 'director N/A',
    duration: 'director N/A',
    year: 0,
    description: 'description N/A',
    trailer: 'https://www.youtube.com',
    nameRU: 'name RU N/A',
    nameEN: 'name EN N/A',
  };
  
  export const DEFAULT_ERROR = {
    VALIDATION: {
      EMPTY_FIELD: 'Пожалуйста, заполните это поле',
      SHORT_NAME: 'Пожалуйста, введите более полное имя',
      SHORT_PASSWORD: 'Пароль должен содержать не менее 8 символов', 
      INCORRECT_EMAIL: 'Некорректный Email',
    },
  }
  
  export const DEFAULT_MESSAGE = {
    TOOLTIP: {
      SUCCESS: 'Данные успешно изменены.',
      FAIL: 'Что-то пошло не так! Попробуйте ещё раз.'
    },
    CARD_MOVIES: {
      INITIAL_STATE: 'Пожалуйста, введите данные для поиска.',
      NOT_FOUND: 'К сожалению, по данному запросу ничего не найдено.',
      NO_SAVED_MOVIES: 'Кажется, вы ещё ничего не сохранили.',
      LINK_TEXT: 'К фильмам'
    }
  }
  
  export const MAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  export const NAME_REGEX = /^[А-Яа-яa-zA-Z]+(([' -][А-Яа-яa-zA-Z ])?[А-Яа-яa-zA-Z]*)*$/;
  
  export let NUMBER_OF_CARDS = 12;
  export let NUMBER_OF_NEW_CARDS = 4;
  export const SHORT_MOVIE_LENGTH = 40;
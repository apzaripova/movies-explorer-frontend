import * as CONSTANTS from './constants';
const BASE_URL = CONSTANTS.BASE_URL;

function handleRes(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(res.status + ": " + res.statusText)
  }
}

export const signUp = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, password })
  })
    .then(handleRes)
}

export const signIn = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(handleRes)
}

export const checkTokenValidity = (jwt) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${jwt}`,
    }
  })
    .then(handleRes)
}
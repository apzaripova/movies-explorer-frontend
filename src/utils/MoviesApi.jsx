import { BASE_URL } from "../utils/constants";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const getResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
};

export const getInitialMovies = () => {
  if (headers.authorization !== "Bearer null") {
    return fetch(`${BASE_URL}`, {
      method: "GET",
      headers: headers,
    }).then((res) => {
      return getResponse(res);
    });
  }
};
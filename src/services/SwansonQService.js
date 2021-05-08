import { getToken } from "./TokenService";

// const BASE_URL = "http://localhost:3000/swansons";
const BASE_URL = "https://rails-office-api.herokuapp.com/swansons";

export function fetchSwansonQuotes() {
  return fetch(BASE_URL, {
    headers: { Authorization: "Bearer " + getToken() },
  });
}

export function deleteSwansonQuote(id) {
  return fetch(BASE_URL + `/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      Authorization: "Bearer " + getToken(),
    },
  });
}

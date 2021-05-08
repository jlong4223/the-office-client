import { getToken } from "./TokenService";
// const BASE_URL = "http://localhost:3000";
const BASE_URL = "https://rails-office-api.herokuapp.com";

export function favTheQuote(favorite) {
  return fetch(BASE_URL + "/favorites", {
    method: "post",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({ favorite }),
  });
}

export function deleteQuote(id) {
  return fetch(BASE_URL + `/favorites/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      Authorization: "Bearer " + getToken(),
    },
  });
}

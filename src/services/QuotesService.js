import { getToken } from "./TokenService";

const BASE_URL = "http://localhost:3000";

/* ------ Sending the token with the req ------- */
export function fetchApiQuotes() {
  return fetch(BASE_URL + "/offices", {
    headers: { Authorization: "Bearer " + getToken() },
  });
}

export function deleteQuote(id) {
  return fetch(BASE_URL + `/offices/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      Authorization: "Bearer " + getToken(),
    },
  });
}

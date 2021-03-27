import { getToken } from "./TokenService";

const BASE_URL = "http://localhost:3000/offices";

/* ------ Sending the token with the req ------- */
export function fetchApiQuotes() {
  return fetch(BASE_URL, {
    headers: { Authorization: "Bearer " + getToken() },
  });
}

import { getToken } from "./TokenService";

const BASE_URL = "http://localhost:3000/swansons";

export function fetchSwansonQuotes() {
  return fetch(BASE_URL, {
    headers: { Authorization: "Bearer " + getToken() },
  });
}

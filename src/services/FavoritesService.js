const BASE_URL = "http://localhost:3000";

export function favTheQuote(favorite) {
  return fetch(BASE_URL + "/favorites", {
    method: "post",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({ favorite }),
  });
}

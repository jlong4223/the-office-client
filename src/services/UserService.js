import { removeToken, getUserId } from "./TokenService";

/* ------- User Services --------- */
const BASE_URL = "http://localhost:3000/users/";

function loginUser(user) {
  return fetch(BASE_URL + "login", {
    method: "post",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({ email: user.email, password: user.password }),
  });
}

function logout() {
  return removeToken();
}

function getUserFavorites() {
  return fetch(BASE_URL + `${getUserId()}`);
}

export { loginUser, logout, getUserFavorites };

// /users/${id} - pass in the getuserbyid from token service

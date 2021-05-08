import { removeToken, getUserId } from "./TokenService";

/* ------- User Services --------- */
// const BASE_URL = "http://localhost:3000/users/";
const BASE_URL = "https://rails-office-api.herokuapp.com/users/";

function loginUser(user) {
  return fetch(BASE_URL + "login", {
    method: "post",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({ email: user.email, password: user.password }),
  });
}

function registerUser(user) {
  return fetch(BASE_URL, {
    method: "post",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({ user }),
  });
}

function logout() {
  return removeToken();
}

function getUserFavorites() {
  return fetch(BASE_URL + `${getUserId()}`);
}

export { loginUser, logout, getUserFavorites, registerUser };

// /users/${id} - pass in the getuserbyid from token service

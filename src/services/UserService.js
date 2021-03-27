/* ------- User Services --------- */
const BASE_URL = "http://localhost:3000/users/login";

function loginUser(user) {
  return fetch(BASE_URL, {
    method: "post",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({ email: user.email, password: user.password }),
  });
}

export { loginUser };

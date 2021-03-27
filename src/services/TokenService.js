function setToken(auth_token) {
  auth_token
    ? localStorage.setItem("auth_token", auth_token)
    : localStorage.removeItem("auth_token");
}

function removeToken() {
  localStorage.removeItem("auth_token");
}

function getToken() {
  let token = localStorage.getItem("auth_token");
  if (token) {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (payload.exp < Date.now() / 1000) {
      localStorage.removeItem("auth_token");
      token = null;
    }
  }
  return token;
}

function getUserFromToken() {
  const token = getToken();
  return token ? JSON.parse(atob(token.split(".")[1])).name : null;
}

export { setToken, getToken, getUserFromToken, removeToken };

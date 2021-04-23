import { createWebHistory, createRouter } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import LoginPage from "@/views/LoginPage";
import RegisterPage from "@/views/RegisterPage";
import QuotesPage from "@/views/QuotesPage";
import SwansonsQPage from "@/views/SwansonsQPage";
import UserFavs from "@/components/UserFavs";
import NotFound from "@/components/NotFound";
import { getUserFromToken } from "../services/TokenService";

const checkAuth = (to, from, next) => {
  let token = getUserFromToken();
  if (token) {
    console.log("token-name: ", token);
    next();
  } else {
    console.log("no-user");
    alert("Must be logged in to see Quotes");
    next("/login");
  }
};

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage,
    props: true,
  },
  {
    path: "/register",
    name: "RegisterPage",
    component: RegisterPage,
  },
  {
    path: "/quotes",
    name: "QuotesPage",
    component: QuotesPage,
    // Works p1: define checkAuth as the variable name only
    beforeEnter: checkAuth,
  },
  {
    path: "/swanson_quotes",
    name: "SwansonsQPage",
    component: SwansonsQPage,
    // Works p2: create a function and pass params down to checkAuth to use
    beforeEnter: (to, from, next) => {
      checkAuth(to, from, next);
    },
  },
  {
    path: "/favorites",
    name: "UserFavs",
    component: UserFavs,
    beforeEnter: checkAuth,
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

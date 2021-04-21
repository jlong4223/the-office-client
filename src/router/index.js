import { createWebHistory, createRouter } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import LoginPage from "@/views/LoginPage";
import RegisterPage from "@/views/RegisterPage";
import QuotesPage from "@/views/QuotesPage";
import SwansonsQPage from "@/views/SwansonsQPage";
import NotFound from "@/components/NotFound";
import { getUserFromToken } from "../services/TokenService";

// TODO figure out why this works within the route but not here
// const checkAuth = (to, from, next) => {
//   let token = getUserFromToken();
//   if (token) {
//     console.log("token-name: ", token);
//     next();
//   } else {
//     next("/login");
//     alert("Must be logged in to see Quotes");
//   }
// };

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
    beforeEnter: (to, from, next) => {
      let token = getUserFromToken();
      if (token) {
        console.log("token-name: ", token);
        next();
      } else {
        next("/login");
        alert("Must be logged in to see Quotes");
      }
    },
  },
  {
    path: "/swanson_quotes",
    name: "SwansonsQPage",
    component: SwansonsQPage,
    // beforeEnter: (to, from, next) => {
    //   checkAuth(to, from, next);
    // },
    beforeEnter: (to, from, next) => {
      let token = getUserFromToken();
      if (token) {
        console.log("token-name: ", token);
        next();
      } else {
        next("/login");
        alert("Must be logged in to see Quotes");
      }
    },
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

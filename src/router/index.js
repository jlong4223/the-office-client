import { createWebHistory, createRouter } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import LoginPage from "@/views/LoginPage";
import RegisterPage from "@/views/RegisterPage";
import QuotesPage from "@/views/QuotesPage";
import SwansonsQPage from "@/views/SwansonsQPage";
import NotFound from "@/components/NotFound";
// import { getUserFromToken } from "../services/TokenService";

// TODO work on redirecting back home
function checkAuth() {
  let token = localStorage.getItem("auth_token");
  if (token) {
    console.log("token: ", token);
  } else console.log("no user");
}

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
  },
  {
    path: "/swanson_quotes",
    name: "SwansonsQPage",
    component: SwansonsQPage,
    beforeEnter: checkAuth(),
    children: [
      {
        path: "/:pathMatch(.*)*",
        redirect: "/",
      },
    ],
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

// router.beforeEach((to, from, next) => {
//   console.log("page switch");
//   next();
// });

export default router;

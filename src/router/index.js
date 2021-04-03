import { createWebHistory, createRouter } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import LoginPage from "@/views/LoginPage";
import RegisterPage from "@/views/RegisterPage";
import QuotesPage from "@/views/QuotesPage";
import SwansonsQPage from "@/views/SwansonsQPage";
import NotFound from "@/components/NotFound";

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

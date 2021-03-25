import { createWebHistory, createRouter } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import LoginPage from "@/views/LoginPage";
import RegisterPage from "@/views/RegisterPage";
import QuotesPage from "@/views/QuotesPage";
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
    path: "/:catchAll(.*)",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

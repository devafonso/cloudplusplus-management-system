import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import { useAuthStore } from "../stores/auth";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/home", name: "Home", component: Home, meta: { auth: true } },
    {
      path: "/login",
      name: "Login",
      component: () => import("../components/Login.vue"),
      meta: { auth: false },
    },
    {
      path: "/project/create",
      name: "ProjectCreate",
      component: () => import("../components/ProjectCreate.vue"),
      meta: { auth: true },
    },
    {
      path: "/project/edit/:id?",
      name: "ProjectEdit",
      component: () => import("../components/ProjectEdit.vue"),
      props: true,
      meta: { auth: true },
    },
  ],
});




export default router;

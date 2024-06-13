import { createRouter, createWebHistory } from "vue-router";

import Home from "../components/Home.vue";


const routes = [
  { path: "/", name: "Home", component: Home },
  {
    path: "/login",
    name: "Login",
    component: () => import("../components/Login.vue"),
    meta: { auth: false },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../components/Register.vue"),
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
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

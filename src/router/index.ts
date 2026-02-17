import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: () => import("../pages/home/home.vue") },
  // { path: "/about", component: () => import("../pages/About.vue") },
];
export default createRouter({
  history: createWebHistory(),
  routes,
});

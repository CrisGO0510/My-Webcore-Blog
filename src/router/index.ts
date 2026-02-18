import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: () => import("../pages/home/home.vue") },
  { path: "/about-me", component: () => import("../pages/AboutMePage.vue") },
  { path: "/projects", component: () => import("../pages/ProjectsPage.vue") },
  { path: "/music", component: () => import("../pages/MusicPage.vue") },
  { path: "/games", component: () => import("../pages/GamesPage.vue") },
  // Catch-all 404
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    redirect: '/'
  }
];

export default createRouter({
  history: createWebHistory(),
  routes,
});

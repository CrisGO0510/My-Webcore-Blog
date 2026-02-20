import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: () => import("../pages/home/home.vue") },
  { path: "/about-me", component: () => import("../pages/about-me/about-me.vue") },
  { path: "/projects", component: () => import("../pages/projects/projects.vue") },
  { path: "/music", component: () => import("../pages/music/music.vue") },
  { path: "/games", component: () => import("../pages/games/games.vue") },
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

import { createRouter, createWebHistory } from "vue-router";
import MaisonView from "../views/MaisonView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: MaisonView,
    },
    {
      path: "/bordel",
      name: "bordel",
      component: () => import("../views/RoyaumeView.vue"),
    },
  ],
});

export default router;

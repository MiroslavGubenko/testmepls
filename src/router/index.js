import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/creator",
    name: "Creator",
    component: () => import("../views/Creator.vue"),
  },
  {
    path: "/testing",
    name: "StartingTest",
    component: () => import("../views/StartingTest.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/shopee",
    name: "shopee",
    component: () => import("../components/shopee.vue"),
  },
  {
    path: "/grab",
    name: "grab",
    component: () => import("../components/grab.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

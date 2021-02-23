import Vue from "vue";
import VueRouter from "vue-router";

import Todo from "../views/Todo.vue";
import About from "../views/About.vue";
import Photos from "../views/Photos";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Todo,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/photos",
    name: "Photos",
    component: Photos,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

import { createRouter, createWebHistory } from "vue-router";
import MainPage from "../views/MainPage.vue";
import PopupView from "@/components/views/PopupView.vue";

const routes = [
  {
    path: "/",
    name: "MainPage",
    component: MainPage,
  },
  {
    path: "/popup",
    name: "Popup",
    component: PopupView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

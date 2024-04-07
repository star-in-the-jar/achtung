import { createRouter, createWebHistory } from "vue-router";
import MainPage from "@/components/views/MainPage.vue";
import PopupView from "@/components/views/PopupView.vue";
import StatisticsRelativeSpentTimeView from "@/components/views/StatisticsRelativeSpentTimeView.vue";

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
  {
    path: "/statistics/relative-spent-time",
    name: "Statistics-Relative-Spent-Time",
    component: StatisticsRelativeSpentTimeView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

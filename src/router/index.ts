import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";
import Home from "../pages/Home.vue";
import Schedule from "../pages/Schedule.vue";
import History from "../pages/History.vue";
import MatchMaker from "../pages/MatchMaker.vue";

const ROUTES = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "",
        component: Home,
      },
      {
        path: "schedule",
        component: Schedule
      },
      {
        path: "history",
        component: History
      },
      {
        path: "matchmaker",
        component: MatchMaker
      }
    ]
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes: ROUTES,
})
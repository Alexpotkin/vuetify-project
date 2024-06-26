import ContentPage from "../components/ContentPage.vue";
import LayoutMenu from "../components/LayoutMenu.vue";
import homePage from "../views/HomePage.vue";

import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    name: "HomePage",
    path: "/",
    component: homePage,
    LayoutMenu,
    ContentPage,
  },
  {
    name: "Dashboard",
    path: "/dashboard",
    component: homePage,
    LayoutMenu,
    ContentPage,
  },
  {
    name: "Event",
    path: "/event",
    component: homePage,
    LayoutMenu,
    ContentPage,
  },
  {
    name: "Settings",
    path: "/settings",
    component: homePage,
    LayoutMenu,
    ContentPage,
  },
  {
    name: "Device",
    path: "/device",
    component: homePage,
    LayoutMenu,
    ContentPage,
  },
];
const router = Router();
export default router;
function Router() {
  const router = new createRouter({
    history: createWebHistory(),
    routes,
  });
  return router;
}

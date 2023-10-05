import Home from "../pages/Home.vue";
import Events from "../pages/Events.vue";
import Login from "../pages/Login.vue";
import Dashboard from "../pages/Dashboard.vue";
import Profile from "../pages/Profile.vue";
import Register from "../pages/Register.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  { path: "/", component: Home },
  { path: "/eventos", component: Events },
  { path: "/iniciar-sesion", component: Login },
  { path: "/registrarse", component: Register },
  { path: "/mi-cuenta", component: Profile, meta: { requiresAuth: true } },
  { path: "/dashboard", component: Dashboard, meta: { requiresAuth: true } },
  //   {
  //     path: "/usuario/:id",
  //     component: UserProfile,
  //     meta: { requiresAuth: true },
  //   },
  //   {
  //     path: "/usuario/:id/chat",
  //     component: PrivateChat,
  //     meta: { requiresAuth: true },
  //   },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

let user = {
  id: null,
  email: null,
};

export default router;

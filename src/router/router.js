import Home from "../pages/Home.vue";
import Events from "../pages/Events.vue";
import Login from "../pages/Login.vue";
import Dashboard from "../pages/Dashboard.vue";
import Profile from "../pages/Profile.vue";
import Register from "../pages/Register.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import { subscribeToAuth } from "../services/auth";

const routes = [
  { path: "/", component: Home },
  { path: "/eventos", component: Events },
  { path: "/iniciar-sesion", component: Login },
  { path: "/registrarse", component: Register },
  { path: "/mi-cuenta/:id", component: Profile, meta: { requiresAuth: true } },
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
subscribeToAuth((newUser) => (user = newUser));
router.beforeEach((to, from) => {
  if (user.id === null && to.meta.requiresAuth) {
    return {
      path: "/iniciar-sesion",
    };
  }
});

export default router;

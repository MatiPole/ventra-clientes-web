import Home from "../pages/Home.vue";
import Events from "../pages/Events.vue";
import Login from "../pages/Login.vue";
import Dashboard from "../pages/Dashboard.vue";
import Profile from "../pages/Profile.vue";
import Register from "../pages/Register.vue";
import EditEvent from "../pages/EditEvent.vue";
import ChatAdminList from "../pages/ChatAdminList.vue";
import ChatAdminPrivate from "../pages/ChatAdminPrivate.vue";
import EditUser from "../pages/EditUser.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import { subscribeToAuth } from "../services/auth";
import { getUserProfileById } from "../services/user";

const routes = [
  { path: "/", component: Home },
  { path: "/eventos", component: Events },
  { path: "/iniciar-sesion", component: Login },
  { path: "/registrarse", component: Register },
  {
    path: "/mi-cuenta/:id",
    component: Profile,
    meta: { requiresAuth: true },
  },
  {
    path: "/dashboard",
    component: Dashboard,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/editevent/:id",
    component: EditEvent,
    meta: { requiresAuth: true },
  },
  {
    path: "/chat-list",
    component: ChatAdminList,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/chat-list/:id/chat",
    component: ChatAdminPrivate,
    meta: { requiresAuth: true },
  },
  {
    path: "/mi-cuenta/editar-perfil/:id",
    component: EditUser,
    meta: { requiresAuth: true },
  },
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

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    if (user.id === null) {
      next({ path: "/iniciar-sesion" });
    } else {
      const userProfile = await getUserProfileById(user.id);
      if (userProfile.role === "admin" && to.meta.requiresAdmin) {
        next();
      } else if (!to.meta.requiresAdmin) {
        next();
      } else {
        next({ path: "/" });
      }
    }
  } else {
    next();
  }
});

export default router;

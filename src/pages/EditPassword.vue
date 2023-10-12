<script>
import { getUserProfileById } from "../services/user.js";
import {
  subscribeToAuth,
  handleChangePassword,
  logout,
} from "../services/auth";
export default {
  name: "EditPassword",
  data() {
    return {
      user: {
        id: null,
        password: null,
        password2: null,
      },
      userAuth: {
        id: null,
        email: null,
      },
      timeoutSession: "",
      authUnsubscribe: () => {},
    };
  },
  methods: {
    handleLogout() {
      logout();
      this.$router.push({
        path: "/iniciar-sesion",
      });
    },
    async handleSubmit() {
      try {
        // Intenta cambiar la contraseña
        await handleChangePassword(this.user.password);
        this.$router.push(`/mi-cuenta/${this.user.id}`);
      } catch (error) {
        if (error.code === "auth/requires-recent-login") {
          // Si se requiere una reautenticación, muestra un mensaje de volver reautenticarse
          this.timeoutSession =
            "Ha pasado mucho tiempo, debes volver a iniciar sesión antes de cambiar la contraseña";
        } else {
          console.error("Error al cambiar la contraseña:", error);
        }
      }
    },
  },
  async mounted() {
    this.user = await getUserProfileById(this.$route.params.id);
    this.user.id = this.$route.params.id;
    this.authUnsubscribe = subscribeToAuth(
      (newUser) => (this.userAuth = newUser)
    );
  },
  unmounted() {
    this.authUnsubscribe();
  },
};
</script>

<template>
  <form action="#" @submit.prevent="handleSubmit">
    <label>Nueva Contraseña</label>
    <input type="password" name="password" v-model="user.password" />
    <label>Repetir Contraseña</label>
    <input type="password" name="password2" v-model="user.password2" />
    <template v-if="user.password == user.password2">
      <button type="submit">Cambiar Contraseña</button>
    </template>
    <template v-else>
      <p class="text-red-600">La contraseña no coincide</p>
    </template>
  </form>
  <template v-if="timeoutSession !== ''">
    <p class="text-red-600">{{ timeoutSession }}</p>
    <button v-on:click="handleLogout">Cerrar Sesión</button></template
  >
</template>

<script>
import { updateUserProfile, getUserProfileById } from "../services/user.js";
import { subscribeToAuth, handleChangePassword } from "../services/auth";

export default {
  name: "EditUser",
  data() {
    return {
      user: {
        id: null,
        username: null,
        email: null,
      },
      userAuth: {
        id: null,
        email: null,
      },
      authUnsubscribe: () => {},
    };
  },
  methods: {
    async handleSubmit() {
      try {
        await updateUserProfile({
          ...this.user,
        });
      } catch (error) {
        "hay un error", error;
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
    <label for="username">Username</label>
    <input type="text" name="username" v-model="user.username" />
    <button type="submit">Guardar Cambios</button>
  </form>
  <router-link
    :to="`/mi-cuenta/editar-password/${user.id}`"
    class="ml-1 bg-green-500 text-white text-2xl py-2 px-4 rounded hover:bg-green-400"
    >Cambiar Contraseña</router-link
  >
</template>

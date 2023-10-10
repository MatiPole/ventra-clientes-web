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
        password: null,
        password2: null,
      },
      userAuth: {
        id: null,
        email: null,
      },
    };
  },
  methods: {
    async handleSubmit() {
      try {
        await updateUserProfile({
          ...this.user,
        });
        await handleChangePassword(this.user.password);
        await handleChangeEmail(this.user.email);
        this.$router.push(`/mi-cuenta/${this.user.id}`);
      } catch (error) {
        "hay un error", error;
      }
    },
  },
  async mounted() {
    this.user = await getUserProfileById(this.$route.params.id);
    this.user.id = this.$route.params.id;
    subscribeToAuth(async (newUser) => {
      this.userAuth = newUser;
    });
  },
};
</script>

<template>
  <form action="#" @submit.prevent="handleSubmit">
    <label for="username">Username</label>
    <input type="text" name="username" v-model="user.username" />
    <label for="email">Email</label>
    <input type="email" name="email" v-model="user.email" />
    <label>Nueva Contraseña</label>
    <input type="password" name="password" v-model="user.password" />
    <label>Repetir Contraseña</label>
    <input type="password" name="password2" v-model="user.password2" />
    <template v-if="user.password == user.password2">
      <button type="submit">Guardar Cambios</button>
    </template>
    <template v-else>
      <p class="text-red-600">La contraseña no coincide</p>
    </template>
  </form>
</template>

<script>
import BaseHeader from "../components/BaseHeader.vue";
import { login } from "../services/auth.js";
export default {
  name: "Login",
  components: { BaseHeader },
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    handleLogin() {
      login({
        ...this.form,
      })
        .then(() => {
          this.$router.push({
            path: "/",
          });
        })
        .catch((error) => {});
    },
  },
};
</script>

<template>
  <BaseHeader>Iniciar Sesión</BaseHeader>
  <form action="#" @submit.prevent="handleLogin">
    <div class="mb-3">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="form.email" />
    </div>
    <div class="mb-3">
      <label for="password">Contraseña</label>
      <input type="password" id="password" v-model="form.password" />
    </div>
    <button type="submit">Ingresar</button>
  </form>
</template>

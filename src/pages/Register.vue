<script>
import BaseHeader from "../components/BaseHeader.vue";
import { register } from "../services/auth";
export default {
  name: "Register",
  components: { BaseHeader },
  data() {
    return {
      form: {
        email: "",
        password: "",
        username: "",
      },
    };
  },
  methods: {
    async handleSubmit() {
      try {
        await register({
          ...this.form,
        });
        this.$router.push("/iniciar-sesion");
      } catch (error) {}
    },
  },
};
</script>

<template>
  <BaseHeader>Registrarse</BaseHeader>

  <form action="#" @submit.prevent="handleSubmit">
    <div class="mb-3">
      <label for="username">Username</label>
      <input
        class="border-solid"
        type="text"
        id="username"
        v-model="form.username"
      />
    </div>
    <div class="mb-3">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="form.email" />
    </div>
    <div class="mb-3">
      <label for="password">Contraseña</label>
      <input type="password" id="password" v-model="form.password" />
    </div>
    <button type="submit">Crear Cuenta</button>
  </form>
</template>

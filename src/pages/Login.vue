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
      emailValidation: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      errorCredentials: "",
      messageInvalidEmail: "",
    };
  },
  methods: {
    validarEmail() {
      return this.emailValidation.test(this.form.email);
    },
    handleLogin() {
      if (this.validarEmail()) {
        login({
          ...this.form,
        })
          .then(() => {
            this.$router.push({
              path: "/",
            });
          })
          .catch((error) => {
            error = this.errorCredentials = "Los datos no son correctos";
          });
      } else {
        this.messageInvalidEmail = "Ingrese un email válido";
      }
    },
  },
};
</script>

<template>
  <BaseHeader>Iniciar Sesión</BaseHeader>
  <form action="#" @submit.prevent="handleLogin" novalidate>
    <div class="mb-3">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="form.email" />
      <p class="text-red-600">{{ messageInvalidEmail }}</p>
    </div>
    <div class="mb-3">
      <label for="password">Contraseña</label>
      <input type="password" id="password" v-model="form.password" />
    </div>

    <p class="text-red-600">{{ errorCredentials }}</p>

    <button type="submit">Ingresar</button>
  </form>
</template>

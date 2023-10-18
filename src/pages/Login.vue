<script>
import BaseHeader from "../components/BaseHeader.vue";
import { login } from "../services/auth.js";
import BaseButton from "../components/BaseButton.vue";
import BaseInput from "../components/BaseInput.vue";
export default {
  name: "Login",
  components: { BaseHeader, BaseButton, BaseInput },
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
            this.errorCredentials = "Los datos no son correctos";
          });
      } else {
        this.messageInvalidEmail = "Ingrese un email válido";
      }
    },
  },
};
</script>

<template>
  <section class="iniciar-sesion bg-cover bg-no-repeat bg-center">
    <BaseHeader>Iniciar Sesión</BaseHeader>
    <form
      class="text-light w-2/3 md:w-1/3 border-solid border-orange border-2 rounded-3xl p-8 mx-auto my-16"
      action="#"
      @submit.prevent="handleLogin"
      novalidate
    >
      <div class="mb-2">
        <label for="email">Email</label><br />
        <BaseInput type="email" id="email" v-model="form.email" />
        <p class="text-red-600">{{ messageInvalidEmail }}</p>
      </div>
      <div>
        <label for="password">Contraseña</label><br />
        <BaseInput id="password" type="password" v-model="form.password" />
      </div>
      <p class="text-red-600 mb-4">{{ errorCredentials }}</p>
      <BaseButton color="orange" type="submit">Ingresar</BaseButton>
    </form>
  </section>
</template>

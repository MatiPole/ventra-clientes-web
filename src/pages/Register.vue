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
      errorCredentials: "",
      errors: {
        username: null,
        email: null,
        password: null,
      },
    };
  },
  methods: {
    async handleSubmit() {
      this.errors = {
        username: null,
        email: null,
        password: null,
      };

      // Validación del nombre de usuario
      if (this.form.username.length < 6) {
        this.errors.username =
          "El nombre de usuario debe tener al menos 6 caracteres.";
      }

      // Validación del correo electrónico
      const emailPattern = /\S+@\S+\.\S+/;
      if (!emailPattern.test(this.form.email)) {
        this.errors.email = "Ingresa un correo electrónico válido.";
      }

      // Validación de la contraseña (requiere al menos una letra mayúscula y un número)
      const passwordPattern = /^(?=.*[A-Z])(?=.*\d).+$/;
      if (!passwordPattern.test(this.form.password)) {
        this.errors.password =
          "La contraseña debe tener al menos una letra mayúscula y un número.";
      }

      // Si no hay errores, procede con el registro
      if (
        !this.errors.username &&
        !this.errors.email &&
        !this.errors.password
      ) {
        try {
          await register({ ...this.form });
          this.$router.push("/iniciar-sesion");
        } catch (error) {
          error = this.errorCredentials = "El email proporcionado ya existe";
        }
      }
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
      <div v-if="errors.username" class="text-red-600">
        {{ errors.username }}
      </div>
    </div>
    <div class="mb-3">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="form.email" />
      <div v-if="errors.email" class="text-red-600">{{ errors.email }}</div>
      <p class="text-red-600">{{ errorCredentials }}</p>
    </div>
    <div class="mb-3">
      <label for="password">Contraseña</label>
      <input type="password" id="password" v-model="form.password" />
      <div v-if="errors.password" class="text-red-600">
        {{ errors.password }}
      </div>
    </div>

    <button type="submit">Crear Cuenta</button>
  </form>
</template>

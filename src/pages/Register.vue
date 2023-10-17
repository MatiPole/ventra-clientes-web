<script>
import BaseHeader from "../components/BaseHeader.vue";
import BaseButton from "../components/BaseButton.vue";
import { register } from "../services/auth";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  name: "Register",
  components: { BaseHeader, BaseButton },
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
          toast.success("¡Cuenta creada con éxito!");
          setTimeout(() => {
            this.$router.push("/");
          }, 5000);
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

  <form
    class="text-light w-2/3 md:w-1/3 border-solid border-lightblue border-2 rounded-3xl p-8 mx-auto my-16"
    action="#"
    @submit.prevent="handleSubmit"
  >
    <div class="mb-3">
      <label for="username">Username</label><br />
      <input
        class="bg-transparent border-solid border-b-2 border-t-0 border-l-0 border-r-0 border-lightblue mb-8 w-full rounded-md"
        type="text"
        id="username"
        v-model="form.username"
      />
      <div v-if="errors.username" class="text-red-600">
        {{ errors.username }}
      </div>
    </div>
    <div class="mb-3">
      <label for="email">Email</label><br />
      <input
        class="bg-transparent border-solid border-b-2 border-t-0 border-l-0 border-r-0 border-lightblue mb-8 w-full rounded-md"
        type="email"
        id="email"
        v-model="form.email"
      />
      <div v-if="errors.email" class="text-red-600">{{ errors.email }}</div>
      <p class="text-red-600">{{ errorCredentials }}</p>
    </div>
    <div class="mb-3">
      <label for="password">Contraseña</label><br />
      <input
        class="bg-transparent border-solid border-b-2 border-t-0 border-l-0 border-r-0 border-lightblue mb-8 w-full rounded-md"
        type="password"
        id="password"
        v-model="form.password"
      />
      <div v-if="errors.password" class="text-red-600">
        {{ errors.password }}
      </div>
    </div>

    <BaseButton color="lightblue" type="submit">Crear Cuenta</BaseButton>
  </form>
</template>

<script>
import { getUserProfileById } from "../services/user.js";
import {
  subscribeToAuth,
  handleChangePassword,
  logout,
} from "../services/auth";
import BaseButton from "../components/BaseButton.vue";
import BaseHeader from "../components/BaseHeader.vue";
import BaseInput from "../components/BaseInput.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  name: "EditPassword",
  components: { BaseHeader, BaseButton, BaseInput },
  data() {
    return {
      userProfile: {
        id: null,
        password: null,
        password2: null,
      },
      userAuth: {
        id: null,
        email: null,
      },
      timeoutSession: "",
      errorChangingPass: "",
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
        await handleChangePassword(this.userProfile.password);
        toast.success("¡Contraseña modificada con éxito!", {
          autoClose: 2000 | true,
        });
        setTimeout(() => {
          this.$router.push(`/mi-cuenta/${this.userProfile.id}`);
        }, 2000);
      } catch (error) {
        if (error.code === "auth/requires-recent-login") {
          // Si se requiere una reautenticación, muestra un mensaje de volver reautenticarse
          this.timeoutSession =
            "Ha pasado mucho tiempo, debes volver a iniciar sesión antes de cambiar la contraseña";
        } else {
          toast.error(
            "No fue posible cambiar la contraseña, por favor intentalo más tarde."
          );
          console.error("Error al cambiar la contraseña:", error);
        }
      }
    },
  },
  async mounted() {
    this.userProfile = await getUserProfileById(this.$route.params.id);
    this.userProfile.id = this.$route.params.id;
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
  <section>
    <BaseHeader>Cambiar Contraseña</BaseHeader>
    <form
      action="#"
      @submit.prevent="handleSubmit"
      class="text-light w-2/3 md:w-1/3 border-solid border-orange border-2 rounded-3xl p-8 mx-auto my-20"
    >
      <label>Nueva Contraseña</label><br />
      <BaseInput
        type="password"
        name="password"
        v-model="userProfile.password"
      />
      <label>Repetir Contraseña</label><br />
      <BaseInput
        type="password"
        name="password2"
        v-model="userProfile.password2"
      />
      <template v-if="userProfile.password == userProfile.password2">
        <BaseButton>Cambiar Contraseña</BaseButton>
      </template>
      <template v-else>
        <p class="text-red-600">La contraseña no coincide</p>
      </template>
    </form>
    <template v-if="timeoutSession !== ''">
      <div class="mx-auto my-4 text-center">
        <p class="text-red-600 mb-4">{{ timeoutSession }}</p>
        <BaseButton class="text-light" v-on:click="handleLogout"
          >Cerrar Sesión</BaseButton
        >
      </div>
    </template>
  </section>
</template>

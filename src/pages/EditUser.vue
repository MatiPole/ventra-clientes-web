<script>
import { updateUserProfile, getUserProfileById } from "../services/user.js";
import { subscribeToAuth } from "../services/auth";
import BaseHeader from "../components/BaseHeader.vue";
import BaseButton from "../components/BaseButton.vue";
import BaseInput from "../components/BaseInput.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  name: "EditUser",
  components: { BaseHeader, BaseButton, BaseInput },
  data() {
    return {
      userProfile: {
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
          ...this.userProfile,
        });
        toast.success("¡Perfil editado con éxito!", { autoClose: 2000 | true });
        setTimeout(() => {
          this.$router.push(`/mi-cuenta/${this.userProfile.id}`);
        }, 2000);
      } catch (error) {
        toast.error("Ocurrió un error al editar el perfil");
        "hay un error", error;
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
    <BaseHeader>Editar perfil</BaseHeader>
    <form
      action="#"
      @submit.prevent="handleSubmit"
      class="text-light w-2/3 md:w-1/3 border-solid border-orange border-2 rounded-3xl p-8 mx-auto my-28"
    >
      <label for="username">Nombre de usuario:</label><br />
      <BaseInput type="text" name="username" v-model="userProfile.username" />
      <template v-if="!userProfile.username">
        <p class="text-red-600">El campo username no puede estar vacío</p>
      </template>
      <template v-else>
        <BaseButton>Guardar Cambios</BaseButton>
      </template>
    </form>
  </section>
</template>

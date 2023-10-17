<script>
import { updateUserProfile, getUserProfileById } from "../services/user.js";
import { subscribeToAuth } from "../services/auth";
import BaseHeader from "../components/BaseHeader.vue";
import BaseButton from "../components/BaseButton.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  name: "EditUser",
  components: { BaseHeader, BaseButton },
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
        toast.success("¡Perfil editado con éxito!");
        setTimeout(() => {
          this.$router.push(`/mi-cuenta/${this.user.id}`);
        }, 5000);
      } catch (error) {
        toast.error("Ocurrió un error al editar el perfil");
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
  <BaseHeader>Editar perfil</BaseHeader>
  <form
    action="#"
    @submit.prevent="handleSubmit"
    class="text-light w-2/3 md:w-1/3 border-solid border-orange border-2 rounded-3xl p-8 mx-auto my-28"
  >
    <label for="username">Nombre de usuario:</label><br />
    <input
      type="text"
      name="username"
      v-model="user.username"
      class="bg-transparent border-solid border-b-2 border-t-0 border-l-0 border-r-0 border-orange mb-8 w-full rounded-md"
    />
    <template v-if="!user.username">
      <p class="text-red-600">El campo username no puede estar vacío</p>
    </template>
    <template v-else>
      <BaseButton>Guardar Cambios</BaseButton>
    </template>
  </form>
</template>

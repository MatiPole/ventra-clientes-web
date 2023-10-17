<script>
import BaseHeader from "../components/BaseHeader.vue";
import BaseButton from "../components/BaseButton.vue";
import { getUserProfileById, getAdminUserId } from "../services/user";

export default {
  name: "Profile",
  components: { BaseHeader, BaseButton },
  data() {
    return {
      user: {
        id: null,
        email: null,
        username: null,
        role: null,
      },
      loadingUser: true,
      adminId: null, // Propiedad para almacenar el ID del administrador
    };
  },
  methods: {
    async fetchAdminUserId() {
      this.adminId = await getAdminUserId();
    },
  },
  async mounted() {
    this.loadingUser = true;
    this.user = await getUserProfileById(this.$route.params.id);
    this.loadingUser = false;
    this.fetchAdminUserId(); // Llama a la función para obtener el ID del administrador
  },
};
</script>

<template>
  <BaseHeader>Mi cuenta</BaseHeader>
  <div
    class="text-light w-2/3 lg:w-2/6 bg-opacity rounded-3xl p-8 mx-auto my-16"
  >
    <div class="flex flex-col gap-4 text-center">
      <p class="font-bold">Username:</p>
      <h2>{{ user.username }}</h2>
      <hr class="w-full border-dark" />
      <p class="font-bold">Email:</p>
      <p>{{ user.email }}</p>
      <hr class="w-full border-dark" />
      <router-link
        class="self-center mt-2"
        :to="`/mi-cuenta/editar-perfil/${user.id}`"
      >
        <BaseButton>Editar Perfil</BaseButton>
      </router-link>
      <router-link
        class="self-center mt-2"
        :to="`/mi-cuenta/editar-password/${user.id}`"
      >
        <BaseButton color="lightblue">Cambiar Contraseña</BaseButton>
      </router-link>
      <template v-if="user.role !== 'admin'">
        <router-link
          :to="`/chat-list/${adminId}/chat`"
          class="self-center mt-2"
        >
          <BaseButton color="orange">Chatear con soporte</BaseButton>
        </router-link>
      </template>
    </div>
  </div>
</template>

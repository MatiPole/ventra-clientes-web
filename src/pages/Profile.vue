<script>
import BaseHeader from "../components/BaseHeader.vue";
import { getUserProfileById } from "../services/user";

export default {
  name: "Profile",
  components: { BaseHeader },
  data() {
    return {
      user: {
        id: null,
        email: null,
        username: null,
        role: null,
      },
      loadingUser: true,
    };
  },
  async mounted() {
    this.loadingUser = true;
    this.user = await getUserProfileById(this.$route.params.id);
    this.loadingUser = false;
  },
};
</script>

<template>
  <BaseHeader>Mi cuenta</BaseHeader>
  <div class="flex flex-col items-center justify-center">
    <h2>{{ user.username }}</h2>
    <p>{{ user.email }}</p>
    <router-link
      :to="`/mi-cuenta/editar-perfil/${user.id}`"
      class="ml-1 bg-green-500 text-white text-2xl py-2 px-4 rounded hover:bg-green-400"
      >Editar Perfil</router-link
    >
  </div>
  <template v-if="user.role !== 'admin'">
    <router-link
      to="/chat-list/eZzS2rEmIbSuv8Hx9euFJaTpGy02/chat"
      class="ml-1 bg-green-500 text-white text-2xl py-2 px-4 rounded hover:bg-green-400"
      >Chatear con soporte</router-link
    >
  </template>
</template>

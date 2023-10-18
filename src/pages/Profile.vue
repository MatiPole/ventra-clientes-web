<script>
import BaseHeader from "../components/BaseHeader.vue";
import BaseButton from "../components/BaseButton.vue";
import BaseLoader from "../components/BaseLoader.vue";
import { getUserProfileById, getAdminUserId } from "../services/user";

export default {
  name: "Profile",
  components: { BaseHeader, BaseButton, BaseLoader },
  data() {
    return {
      userProfile: {
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
    this.userProfile = await getUserProfileById(this.$route.params.id);
    this.loadingUser = false;
    this.fetchAdminUserId(); // Llama a la función para obtener el ID del administrador
  },
};
</script>

<template>
  <section>
    <BaseHeader>Mi cuenta</BaseHeader>
    <div
      class="text-light xsm:w-5/6 sm:w-3/5 bg-opacity rounded-3xl p-8 mx-auto my-16"
    >
      <div
        class="flex flex-col gap-4 text-center items-center"
        v-if="!loadingUser"
      >
        <p class="font-bold">Username:</p>
        <h2>{{ userProfile.username }}</h2>
        <hr class="w-full border-dark" />
        <p class="font-bold">Email:</p>
        <p>{{ userProfile.email }}</p>
        <hr class="w-full border-dark" />
        <router-link
          class="self-center mt-2"
          :to="`/mi-cuenta/editar-perfil/${userProfile.id}`"
        >
          <BaseButton>Editar Perfil</BaseButton>
        </router-link>
        <router-link
          class="self-center mt-2"
          :to="`/mi-cuenta/editar-password/${userProfile.id}`"
        >
          <BaseButton color="lightblue">Cambiar Contraseña</BaseButton>
        </router-link>
        <template v-if="userProfile.role !== 'admin'">
          <router-link
            :to="`/chat-list/${adminId}/chat`"
            class="self-center mt-2"
          >
            <BaseButton color="orange">Chatear con soporte</BaseButton>
          </router-link>
        </template>
      </div>
      <BaseLoader v-else />
    </div>
  </section>
</template>

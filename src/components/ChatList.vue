<script>
import { getPrivateChats } from "../services/private-chat.js";
import { getAdminUserId, getAllUsers } from "../services/user.js";
import BaseLoader from "../components/BaseLoader.vue";

export default {
  name: "ChatList",
  components: { BaseLoader },
  data() {
    return {
      chats: [],
      loadingChats: true,
      adminId: null,
      users: [],
    };
  },
  methods: {
    async fetchAdminUserId() {
      this.adminId = await getAdminUserId();
    },
    clientData(chat) {
      const clientId = chat.users.find((userId) => userId !== this.adminId);
      const user = this.users.find((userId) => userId.id === clientId);
      if (user) {
        // Si se encuentra un usuario con el ID, retorna su nombre de usuario
        return user.user.email;
      } else {
        // Maneja el caso en el que no se encuentra el usuario
        return console.log("Usuario no encontrado");
      }
    },
    getChatLink(chat) {
      const clientId = chat.users.find((userId) => userId !== this.adminId);
      return `/chat-list/${clientId}/chat`;
    },
  },
  async mounted() {
    await this.fetchAdminUserId();
    this.loadingChats = true;
    this.chats = await getPrivateChats();
    this.loadingChats = false;
    this.users = await getAllUsers();
  },
};
</script>

<template>
  <div class="w-2/3">
    <template v-if="!loadingChats">
      <div
        v-for="chat in chats"
        :key="chat.id"
        id="{{chat.id}}"
        class="my-12 text-center bg-opacity rounded-full px-4 py-4 hover:bg-lightblue"
      >
        <router-link class="text-lg text-white" :to="getChatLink(chat)">
          Conversación con el usuario: <br />
          {{ clientData(chat) }}
        </router-link>
      </div>
    </template>
    <template v-else>
      <div class="h-screen">
        <BaseLoader />
      </div>
    </template>
  </div>
</template>

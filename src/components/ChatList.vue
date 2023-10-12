<script>
import { getPrivateChats } from "../services/private-chat.js";
import { getAdminUserId, getUserProfileById } from "../services/user.js";

export default {
  data() {
    return {
      chats: [],
      loadingChats: true,
      adminId: null,
    };
  },
  async created() {
    this.loadingChats = true;
    this.chats = await getPrivateChats();
    this.loadingChats = false;
  },
  methods: {
    async fetchAdminUserId() {
      this.adminId = await getAdminUserId();
    },
    clientId(chat) {
      const otherUserId = chat.users.find((userId) => userId !== this.adminId);
      return otherUserId;
    },
    getChatLink(chat) {
      const otherUserId = chat.users.find((userId) => userId !== this.adminId);
      return `/chat-list/${otherUserId}/chat`;
    },
  },
  async mounted() {
    await this.fetchAdminUserId();
  },
};
</script>

<template>
  <div>
    <h2>Mis Conversaciones</h2>
    <template v-if="!loadingChats">
      <div v-for="chat in chats" :key="chat.id" id="{{chat.id}}" class="mb-4">
        <router-link :to="getChatLink(chat)">
          Conversación con el usuario con id: {{ clientId(chat) }}
        </router-link>
      </div>
    </template>
  </div>
</template>

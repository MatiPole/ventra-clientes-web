<script>
import { getPrivateChats } from "../services/private-chat.js";
import { getAdminUserId } from "../services/user.js";
import BaseLoader from "../components/BaseLoader.vue";

export default {
  name: "ChatList",
  components: { BaseLoader },
  data() {
    return {
      chats: [],
      loadingChats: true,
      adminId: null,
      user: [],
    };
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
    this.loadingChats = true;
    this.chats = await getPrivateChats();
    this.loadingChats = false;
  },
};
</script>

<template>
  <div>
    <h2 class="text-3xl text-center">Mis Conversaciones</h2>
    <template v-if="!loadingChats">
      <div v-for="chat in chats" :key="chat.id" id="{{chat.id}}" class="mt-6">
        <router-link
          class="text-lg bg-emerald-500 text-white p-2 rounded-lg"
          :to="getChatLink(chat)"
        >
          Conversación con el usuario con id: {{ clientId(chat) }}
        </router-link>
      </div>
    </template>
    <template v-else>
      <BaseLoader />
    </template>
  </div>
</template>

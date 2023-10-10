<script>
import { subscribeToChatMessages } from "../services/chat.js";
export default {
  name: "ChatList",
  data() {
    return {
      messages: [],
      loadingMessages: true,
      chatUnsubscribe: () => {},
    };
  },

  mounted() {
    this.loadingMessages = true;
    this.chatUnsubscribe = subscribeToChatMessages((messages) => {
      this.messages = messages;
      this.loadingMessages = false;
      // console.log("Los mensajes son: ", this.messages);
    });
  },
  unmounted() {
    this.chatUnsubscribe();
  },
};
</script>

<template>
  <template v-if="!loadingMessages">
    <div v-for="message in messages" class="mb-2">
      <div>
        <b>Usuario:</b>
        <router-link
          :to="`/chat-list/${message.userId}/chat`"
          class="ml-1 text-blue-600 underline"
          >{{ message.user }}</router-link
        >
      </div>
      <div><b>Mensaje:</b> {{ message.message }}</div>
      <div>{{ message.created_at || "Enviando..." }}</div>
    </div>
  </template>
</template>

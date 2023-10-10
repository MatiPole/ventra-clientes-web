<script>
import { chatSaveMessage } from "../services/chat.js";
import { subscribeToAuth } from "../services/auth";

export default {
  name: "ChatForm",

  data() {
    return {
      sendingMessage: false,
      newMessage: {
        message: "",
      },
      user: {
        id: null,
        email: null,
      },
      authUnsubscribe: () => {},
    };
  },

  methods: {
    sendMessage() {
      this.sendingMessage = true;
      chatSaveMessage({
        userId: this.user.id,
        user: this.user.email,
        message: this.newMessage.message,
      }).then(() => {
        this.newMessage.message = "";
        this.sendingMessage = false;
      });
    },
  },
  mounted() {
    this.authUnsubscribe = subscribeToAuth((newUser) => (this.user = newUser));
  },
  unmounted() {
    this.authUnsubscribe();
  },
};
</script>

<template>
  <form action="#" @submit.prevent="sendMessage">
    <div class="mb-3">
      <div class="mb-2">Usuario</div>
      <div>{{ user.email }}</div>
    </div>
    <div class="mb-3">
      <Label for="message" class="block mb-1">Mensaje</Label>
      <textarea
        class="w-full p-2 border border-gray-400 rounded"
        id="message"
        v-model="newMessage.message"
        @keyup.ctrl.enter="sendMessage"
      ></textarea>
    </div>
    <button type="submit">Enviar</button>
  </form>
</template>

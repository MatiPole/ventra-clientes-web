<script>
import { getUserProfileById } from "../services/user";
import {
  sendPrivateChatMessage,
  subscribeToPrivateChat,
} from "../services/private-chat";
import { subscribeToAuth } from "../services/auth";
import BaseHeader from "../components/BaseHeader.vue";
import BaseButton from "../components/BaseButton.vue";
import BaseLoader from "../components/BaseLoader.vue";

export default {
  name: "ChatAdminPrivate",
  components: { BaseHeader, BaseButton, BaseLoader },
  data() {
    return {
      userAuth: {
        id: null,
        email: null,
      },
      authUnsubscribe: () => {},
      userProfile: {
        id: null,
        email: null,
      },
      loadingUser: true,
      newMessage: {
        message: "",
      },
      sendingMessage: false,
      messages: [],
      messagesUnsubscribe: () => {},
    };
  },
  methods: {
    handleSubmit() {
      sendPrivateChatMessage(this.userAuth.id, this.userProfile.id, {
        user: this.userAuth.email,
        message: this.newMessage.message,
      });
      this.newMessage.message = "";
    },
  },
  async mounted() {
    this.loadingUser = true;
    this.userProfile = await getUserProfileById(this.$route.params.id);
    this.authUnsubscribe = subscribeToAuth(
      (userData) => (this.userAuth = userData)
    );
    this.messagesUnsubscribe = await subscribeToPrivateChat(
      this.userAuth.id,
      this.userProfile.id,
      (newMessages) => (this.messages = newMessages)
    );
    this.loadingUser = false;
  },
  unmounted() {
    this.authUnsubscribe();
  },
};
</script>

<template>
  <section>
    <div v-if="loadingUser" class="h-screen">
      <BaseLoader />
    </div>
    <template v-else>
      <BaseHeader>Chat con Soporte</BaseHeader>

      <h2 class="sr-only">Mensajes</h2>
      <div
        class="flex flex-col items-start bg-opacity min-h-[400px] p-4 rounded-3xl mx-12 my-4"
      >
        <div
          v-for="message in messages"
          class="max-w-[70%] p-4 rounded-3xl mb-2 bg-gray-100"
          :class="{
            'bg-green': message.senderId == userAuth.id,
            'self-end': message.senderId == userAuth.id,
          }"
        >
          <div>{{ message.message }}</div>
          <div>{{ message.created_at || "Enviando..." }}</div>
        </div>
      </div>

      <form
        class="flex gap-2 sm:gap-4 w-full px-12 pb-8"
        action=""
        @submit.prevent="handleSubmit"
      >
        <label for="message" class="sr-only">Mensaje</label>
        <textarea
          class="p-2 h-12 xl:h-16 rounded-3xl w-5/6 xl:w-11/12"
          id="message"
          v-model="newMessage.message"
        ></textarea>
        <BaseButton class="w-20 md:w-52">Enviar</BaseButton>
      </form>
    </template>
  </section>
</template>

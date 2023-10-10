<script>
import ChatList from "../components/ChatList.vue";
import BaseHeader from "../components/BaseHeader.vue";

export default {
  name: "ChatAdminList",
  components: { ChatList, BaseHeader },
};
</script>

<template>
  <!-- <h1 class="mb-4 mb-8 text-3xl">Chat de Da Vinci</h1> -->
  <BaseHeader>Chat con usuarios</BaseHeader>
  <div class="flex gap-4 justify-between">
    <div class="div-contenedor">
      <ChatList />
    </div>
  </div>
</template>

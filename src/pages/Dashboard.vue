<script>
import BaseHeader from "../components/BaseHeader.vue";
import CreateEvent from "../components/CreateEvent.vue";
import AdminEventList from "../components/AdminEventList.vue";

export default {
  name: "Dashboard",
  components: { BaseHeader, CreateEvent, AdminEventList },
};
</script>

<template>
  <BaseHeader>Panel Administrador</BaseHeader>
  <div class="flex justify-center">
    <router-link
      to="/chat-list"
      class="ml-1 bg-green-500 text-white text-2xl p-2 rounded hover:bg-green-400"
      >Chat</router-link
    >
  </div>
  <CreateEvent></CreateEvent>
  <AdminEventList></AdminEventList>
</template>

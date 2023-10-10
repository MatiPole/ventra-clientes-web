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
  <CreateEvent></CreateEvent>
  <AdminEventList></AdminEventList>
</template>

<script>
import BaseHeader from "../components/BaseHeader.vue";
import CreateEvent from "../components/CreateEvent.vue";
import AdminEventList from "../components/AdminEventList.vue";
import BaseButton from "../components/BaseButton.vue";

export default {
  name: "Dashboard",
  components: { BaseHeader, CreateEvent, AdminEventList, BaseButton },
};
</script>

<template>
  <section>
    <BaseHeader>Panel Administrador</BaseHeader>
    <BaseButton color="orange" class="block mx-auto my-8">
      <router-link to="/chat-list">Chats de Soporte</router-link>
    </BaseButton>
    <h3 class="font-accent text-lightblue text-3xl font-semibold ml-16">
      Crear Evento
    </h3>
    <CreateEvent></CreateEvent>
    <h3 class="font-accent text-lightblue text-3xl font-semibold ml-16">
      Mis Eventos
    </h3>
    <AdminEventList></AdminEventList>
  </section>
</template>

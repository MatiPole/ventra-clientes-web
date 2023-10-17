<script>
import BaseHeader from "../components/BaseHeader.vue";
import EventList from "../components/EventList.vue";

export default {
  name: "Events",
  components: { BaseHeader, EventList },
};
</script>

<template>
  <section class="min-h-screen px-8">
    <BaseHeader>Encontrá los mejores eventos del momento</BaseHeader>
    <EventList />
  </section>
</template>

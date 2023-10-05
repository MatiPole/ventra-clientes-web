<script>
import BaseHeader from "../components/BaseHeader.vue";
import EventList from "../components/EventList.vue";

export default {
  name: "Events",
  components: { BaseHeader, EventList },
};
</script>

<template>
  <BaseHeader>Eventos</BaseHeader>
  <EventList />
</template>

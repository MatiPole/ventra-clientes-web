<script>
import { subscribeToEvents } from "../services/events.js";

export default {
  name: "EventList",
  data() {
    return {
      events: [],
      eventsUnsubscribe: () => [],
    };
  },
  mounted() {
    this.eventsUnsubscribe = subscribeToEvents((events) => {
      this.events = events;
    });
  },
  unmounted() {
    this.eventsUnsubscribe();
  },
};
</script>

<template>
  <div class="">
    <div
      v-for="event in events"
      class=""
    >
      <h2 class="">{{ event.name }}</h2>
      <div class="">
        <p class="">
          ${{ event.price }}
        </p>
        <p>{{ event.date }}</p>
      </div>
      <div>
        <p>{{ event.description }}</p>
      </div>
    </div>
    <button >Editar Evento</button>
    <button >Eliminar evento</button>
  </div>
</template>

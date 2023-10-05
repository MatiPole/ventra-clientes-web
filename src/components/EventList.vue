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
  <div v-for="event in events" class="mb-2 flex gap-8">
    <div class="w-1/3 border-solid border-black rounded-xl p-8">
      <h2 class="text-3xl">{{ event.name }}</h2>
      <div>
        <p>${{ event.price }}</p>
        <p>{{ event.date }}</p>
      </div>
      <div>
        <p>{{ event.description }}</p>
      </div>
    </div>
  </div>
</template>

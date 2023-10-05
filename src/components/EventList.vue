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
  <div class="flex justify-center gap-8 p-8">
    <div
      v-for="event in events"
      class="mb-2 max-w-xs flex-row border-solid border-2 border-gray-400 rounded-md p-4"
    >
      <h2 class="text-3xl">{{ event.name }}</h2>
      <div class="flex justify-between my-2">
        <p class="bg-slate-500 rounded-sm text-white px-2">
          ${{ event.price }}
        </p>
        <p>{{ event.date }}</p>
      </div>
      <div>
        <p>{{ event.description }}</p>
      </div>
    </div>
  </div>
</template>

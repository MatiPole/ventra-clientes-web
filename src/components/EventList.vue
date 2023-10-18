<script>
import { subscribeToEvents } from "../services/events.js";
import BaseLoader from "./BaseLoader.vue";

export default {
  name: "EventList",
  components: { BaseLoader },
  data() {
    return {
      events: [],
      loading: true,
      eventsUnsubscribe: () => [],
    };
  },
  mounted() {
    this.loading = true;
    this.eventsUnsubscribe = subscribeToEvents((events) => {
      this.events = events;
      this.loading = false;
    });
  },
  unmounted() {
    this.eventsUnsubscribe();
  },
};
</script>

<template>
  <template v-if="loading">
    <BaseLoader />
  </template>
  <template v-else>
    <div
      class="flex flex-wrap text-light justify-center gap-8 p-8 my-4 xl:w-2/3 xl:mx-auto"
    >
      <div
        v-for="event in events"
        class="mb-2 w-[350px] h-72 sm:h-64 bg-opacity flex-row rounded-3xl p-4"
      >
        <h2 class="text-3xl font-accent text-green font-bold pb-3">
          {{ event.name }}
        </h2>
        <hr class="w-full border-dark" />
        <div class="mt-4 flex flex-col gap-6 sm:gap-4">
          <div>
            <p>{{ event.date }}</p>
          </div>
          <p>{{ event.description }}</p>
        </div>
        <hr class="w-full border-dark mt-4" />
        <div class="mt-4">
          <p class="bg-green rounded-full text-dark font-bold py-1 px-6 w-fit">
            ${{ event.price }}
          </p>
        </div>
      </div>
    </div>
  </template>
</template>

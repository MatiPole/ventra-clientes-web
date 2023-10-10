<script>
import { subscribeToEvents, deleteEvent } from "../services/events.js";

export default {
  name: "AdminEventList",
  data() {
    return {
      events: [],
      eventsUnsubscribe: () => [],
    };
  },
  methods: {
    async handleDelete(id) {
      try {
        await deleteEvent(id);
        this.$router.push("/dashboard");
      } catch (error) {
        "hay un error", error;
      }
    },
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
    <div v-for="event in events" class="">
      <h2 class="">{{ event.name }}</h2>
      <div class="">
        <p class="">${{ event.price }}</p>
        <p>{{ event.date }}</p>
      </div>
      <div>
        <p>{{ event.description }}</p>
      </div>
      <button>
        <router-link :to="`/EditEvent/${event.id}`" class=""
          >Editar Evento</router-link
        >
      </button>

      <button
        @click="
          {
            handleDelete(event.id);
          }
        "
      >
        Eliminar Evento
      </button>
    </div>
  </div>
</template>

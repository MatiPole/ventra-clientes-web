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
  <div class="overflow-x-auto">
    <table class="min-w-full">
      <thead>
        <tr>
          <th class="px-4 py-2">Nombre</th>
          <th class="px-4 py-2">Precio</th>
          <th class="px-4 py-2">Descripción</th>
          <th class="px-4 py-2">Fecha</th>
          <th class="px-4 py-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="event in events" :key="event.id">
          <td class="border px-4 py-2">{{ event.name }}</td>
          <td class="border px-4 py-2">${{ event.price }}</td>
          <td class="border px-4 py-2">{{ event.description }}</td>
          <td class="border px-4 py-2">{{ event.date }}</td>
          <td class="border px-4 py-2">
            <button
              class="bg-blue-700 text-white px-2 py-1 rounded hover:bg-blue-600 focus:outline-none"
            >
              <router-link :to="`/EditEvent/${event.id}`"
                >Editar Evento</router-link
              >
            </button>
            <button
              class="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-500 focus:outline-none ml-2"
              @click="handleDelete(event.id)"
            >
              Eliminar Evento
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

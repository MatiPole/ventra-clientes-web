<script>
import { subscribeToEvents, deleteEvent } from "../services/events.js";
import BaseButton from "./BaseButton.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  name: "AdminEventList",
  components: { BaseButton },
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
        toast.success("¡Eliminado con éxito!");
      } catch (error) {
        "hay un error", error;
        toast.error("No se pudo eliminar el evento");
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
  <div class="bg-opacity text-light p-8 rounded-3xl m-8 overflow-x-auto">
    <table class="w-full">
      <thead>
        <tr>
          <th class="border border-dark p-4">Nombre</th>
          <th class="border border-dark p-4">Precio</th>
          <th class="border border-dark p-4">Descripción</th>
          <th class="border border-dark p-4">Fecha</th>
          <th class="border border-dark p-4">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="event in events" :key="event.id">
          <td class="border border-dark p-4">{{ event.name }}</td>
          <td class="border border-dark p-4">${{ event.price }}</td>
          <td class="border border-dark p-4">{{ event.description }}</td>
          <td class="border border-dark p-4">{{ event.date }}</td>
          <td class="border border-dark p-4">
            <BaseButton color="orange" class="mr-4 mb-2 lg:mb-0">
              <router-link :to="`/EditEvent/${event.id}`">Editar</router-link>
            </BaseButton>
            <BaseButton color="green" @click="handleDelete(event.id)">
              Eliminar
            </BaseButton>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

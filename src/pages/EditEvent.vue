<script>
import { updateEvent, getEventById } from "../services/events.js";

export default {
  name: "EditEvent",
  data() {
    return {
      event: {
        id: null,
        name: null,
        description: null,
        price: null,
        date: null,
      },
    };
  },
  methods: {
    async handleSubmit() {
      try {
        await updateEvent({
          ...this.event,
        });
        this.$router.push("/dashboard");
      } catch (error) {
        "hay un error", error;
      }
    },
  },
  async mounted() {
    this.event = await getEventById(this.$route.params.id);
    this.event.id = this.$route.params.id;
  },
};
</script>

<template>
  <form action="#" @submit.prevent="handleSubmit">
    <label for="name">Nombre del evento</label>
    <input type="text" name="name" v-model="event.name" />
    <label for="description">Descripción</label>
    <input type="text" name="description" v-model="event.description" />
    <label for="price">Precio</label>
    <input type="number" name="price" v-model="event.price" />
    <label for="date">Fech</label>
    <input type="date" name="date" v-model="event.date" />
    <button type="submit">Guardar Cambios</button>
  </form>
</template>

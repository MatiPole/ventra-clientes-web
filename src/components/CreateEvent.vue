<script>
import { createEvent } from "../services/events.js";

export default {
  name: "CreateEvent",
  data() {
    return {
      form: {
        name: "",
        description: "",
        price: 0,
        date: "",
      },
    };
  },
  methods: {
    async handleSubmit() {
      try {
        await createEvent({
          ...this.form,
        });
        this.$router.push("/dashboard");
      } catch (error) {
        "hay un error", error;
      }
    },
  },
};
</script>

<template>
  <div class="flex justify-center gap-8 p-8">
    <h3>Crear Evento</h3>
    <form action="#" @submit.prevent="handleSubmit">
      <label for="name">Nombre</label>
      <input type="text" name="name" id="name" v-model="form.name" />
      <label for="description">Descripción</label>
      <input
        type="text"
        name="description"
        id="description"
        v-model="form.description"
      />
      <label for="price">Precio</label>
      <input type="number" name="price" id="price" v-model="form.price" />
      <label for="date">Fecha del evento</label>
      <input type="date" name="date" id="date" v-model="form.date" />
      <button type="submit">Crear Evento</button>
    </form>
  </div>
</template>

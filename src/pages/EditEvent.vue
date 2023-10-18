<script>
import { updateEvent, getEventById } from "../services/events.js";
import BaseButton from "../components/BaseButton.vue";
import BaseInput from "../components/BaseInput.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  name: "EditEvent",
  components: { BaseButton, BaseInput },
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
        toast.success("¡Modificado con éxito!", { autoClose: 2000 | true });
        setTimeout(() => {
          this.$router.push("/dashboard");
        }, 2000);
      } catch (error) {
        "hay un error", error;
        toast.error("Hubo un error al modificar el evento");
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
  <section class="bg-opacity text-light p-8 rounded-3xl mx-8 mt-20 mb-60">
    <form
      action="#"
      @submit.prevent="handleSubmit"
      class="flex flex-col lg:flex-row lg:items-center lg:justify-evenly"
    >
      <div>
        <label for="name">Nombre del evento</label>
        <BaseInput
          type="text"
          name="name"
          v-model="event.name"
          color="lightblue"
          class="lg:w-auto"
        />
      </div>
      <div>
        <label for="description">Descripción</label>
        <textarea
          type="text"
          name="description"
          v-model="event.description"
          class="bg-transparent border-solid border-b-2 border-t-0 border-l-0 border-r-0 border-lightblue mb-8 rounded-md w-full lg:w-auto"
        ></textarea>
      </div>
      <div>
        <label for="price">Precio</label>
        <BaseInput
          type="number"
          name="price"
          v-model="event.price"
          color="lightblue"
          class="lg:w-auto"
        />
      </div>
      <div>
        <label for="date">Fecha del evento</label>
        <BaseInput
          type="date"
          name="date"
          v-model="event.date"
          color="lightblue"
          class="lg:w-auto"
        />
      </div>
      <template
        v-if="!event.name || !event.description || !event.price || !event.date"
      >
        <p class="text-red-600">Todos los campos son obligatorios</p>
      </template>
      <template v-else>
        <BaseButton>Guardar</BaseButton>
      </template>
    </form>
  </section>
</template>

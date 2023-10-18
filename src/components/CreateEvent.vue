<script>
import { createEvent } from "../services/events.js";
import BaseButton from "./BaseButton.vue";
import BaseInput from "./BaseInput.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  name: "CreateEvent",
  components: { BaseButton, BaseInput },
  data() {
    return {
      form: {
        name: "",
        description: "",
        price: null,
        date: "",
      },
      errorAllRequired: "",
    };
  },
  methods: {
    validation() {
      if (
        this.form.name == "" ||
        this.form.description == "" ||
        !this.form.price ||
        this.form.date == ""
      ) {
        return false;
      } else {
        return true;
      }
    },
    async handleSubmit() {
      if (this.validation()) {
        try {
          await createEvent({
            ...this.form,
          });
          toast.success("¡Creado con éxito!", { autoClose: 2000 | true });
          this.form.name = "";

          this.form.description = "";
          this.form.price = null;
          this.form.date = "";
        } catch (error) {
          "hay un error", error;
        }
      } else {
        this.errorAllRequired = "Todos los campos son requeridos";
      }
    },
  },
};
</script>

<template>
  <div class="bg-opacity text-light p-8 rounded-3xl m-8">
    <form
      action="#"
      @submit.prevent="handleSubmit"
      class="flex flex-col lg:flex-row lg:items-center lg:justify-evenly"
    >
      <div>
        <label for="name">Nombre</label><br />
        <BaseInput
          class="lg:w-auto"
          type="text"
          name="name"
          id="name"
          color="lightblue"
          v-model="form.name"
        />
      </div>
      <div>
        <label for="description">Descripción</label><br />
        <textarea
          class="bg-transparent border-solid border-b-2 border-t-0 border-l-0 border-r-0 border-lightblue mb-8 rounded-md w-full lg:w-auto"
          name="description"
          id="description"
          v-model="form.description"
        ></textarea>
      </div>
      <div>
        <label for="price">Precio</label><br />
        <BaseInput
          class="lg:w-auto"
          type="number"
          name="price"
          id="price"
          color="lightblue"
          v-model="form.price"
        />
      </div>
      <div>
        <label for="date">Fecha del evento</label><br />
        <BaseInput
          class="lg:w-auto"
          type="date"
          name="date"
          id="date"
          color="lightblue"
          v-model="form.date"
        />
      </div>
      <BaseButton>Crear</BaseButton>
    </form>
    <p class="text-red-600">{{ errorAllRequired }}</p>
  </div>
</template>

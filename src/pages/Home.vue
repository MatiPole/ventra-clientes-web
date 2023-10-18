<script>
import BaseHeader from "../components/BaseHeader.vue";
import BaseButton from "../components/BaseButton.vue";
import { subscribeToAuth } from "../services/auth";

export default {
  name: "Home",
  components: { BaseHeader, BaseButton },
  data() {
    return {
      userAuth: {
        id: null,
        email: null,
      },
    };
  },
  mounted() {
    subscribeToAuth((newUser) => {
      this.userAuth = newUser;
    });
  },
};
</script>

<template>
  <section class="hero bg-no-repeat bg-cover bg-center min-h-screen">
    <div className="bg-opacity w-full min-h-screen px-8 md:px-20 pt-16">
      <h1
        class="font-accent font-semibold text-pink text-5xl md:text-8xl w-full md:w-3/4 my-8 xl:mt-32"
      >
        Todos los eventos al alcance de tu mano
      </h1>
      <p class="text-light text-lg xl:text-2xl w-full md:w-1/2 my-6">
        Te brindamos un espacio donde vas a poder encontrar toda la información
        de tus eventos favoritos
      </p>
      <div class="flex gap-2">
        <router-link to="/eventos" class="block py-2 pr-4 text-dark">
          <BaseButton color="orange">Ver Eventos</BaseButton>
        </router-link>
        <router-link
          v-if="!userAuth.id"
          to="/iniciar-sesion"
          class="block py-2 pr-4 text-dark"
        >
          <BaseButton color="lightblue">Iniciar Sesión</BaseButton>
        </router-link>
      </div>
    </div>
  </section>
</template>

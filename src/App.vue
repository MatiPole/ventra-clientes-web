<script>
import { logout, subscribeToAuth } from "./services/auth";
import { getUserProfileById } from "./services/user";
export default {
  name: "App",

  data() {
    return {
      userAuth: {
        id: null,
        email: null,
      },
      userProfile: {
        id: null,
        email: null,
        username: null,
        role: null,
      },
    };
  },
  computed: {},
  methods: {
    handleLogout() {
      logout();
      this.$router.push({
        path: "/iniciar-sesion",
      });
    },
  },
  async mounted() {
    subscribeToAuth(async (newUser) => {
      this.userAuth = newUser;

      if (newUser.id !== null) {
        this.userProfile = await getUserProfileById(newUser.id);
      } else {
        // Cuando no hay un usuario autenticado, vacía los datos del perfil
        this.userProfile = {
          id: null,
          email: null,
          username: null,
          role: null,
        };
      }
    });
  },
};
</script>

<template>
  <header class="max-h-fit">
    <nav class="">
      <div
        class="w-full flex flex-wrap items-center justify-between mx-auto p-6"
      >
        <router-link to="/" class="flex items-center w-24">
          <img
            src="./assets/img/ventra-logo-final-para-negro.png"
            class="mr-3 w-full"
            alt="Ventra Logo"
          />
          <span class="invisible">Ventra</span>
        </router-link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div class="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul
            class="flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 md:mt-0 md:border-0"
          >
            <li>
              <router-link
                to="/"
                class="block py-2 pl-3 pr-4 text-light font-light hover:text-lightblue"
                aria-current="page"
                >Home</router-link
              >
            </li>
            <li>
              <router-link
                to="/eventos"
                class="block py-2 pl-3 pr-4 text-light font-light hover:text-lightblue"
                >Eventos</router-link
              >
            </li>
            <template v-if="userAuth.id !== null">
              <li>
                <router-link
                  :to="`/mi-cuenta/${userAuth.id}/`"
                  class="block py-2 pl-3 pr-4 text-light font-light hover:text-lightblue"
                  >Mi Cuenta</router-link
                >
              </li>
              <template v-if="userProfile.role === 'admin'">
                <li>
                  <router-link
                    to="/dashboard"
                    class="block py-2 pl-3 pr-4 text-light font-light hover:text-lightblue"
                    >Panel Admin</router-link
                  >
                </li>
              </template>
              <li>
                <form @submit.prevent="handleLogout">
                  <button
                    class="block py-2 pl-3 pr-4 text-light font-light hover:text-lightblue"
                    type="submit"
                  >
                    {{ userProfile.username }} (Cerrar Sesión)
                  </button>
                </form>
              </li>
            </template>
            <template v-else>
              <li>
                <router-link
                  to="/iniciar-sesion"
                  class="block py-2 pl-3 pr-4 text-light font-light hover:text-lightblue"
                  >Iniciar Sesión</router-link
                >
              </li>
              <li>
                <router-link
                  to="/registrarse"
                  class="block py-2 pl-3 pr-4 text-light font-light hover:text-lightblue"
                  >Registrarse</router-link
                >
              </li>
            </template>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  <main>
    <router-view></router-view>
  </main>
  <footer class="bg-lightblue h-20 flex items-center justify-center">
    <p class="">Ventra &copy; 2023</p>
  </footer>
</template>

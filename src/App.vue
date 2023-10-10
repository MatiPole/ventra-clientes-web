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
    subscribeToAuth((newUser) => {
      this.userAuth = newUser;
    });
    this.userProfile = await getUserProfileById(this.userAuth.id);
  },
};
</script>

<template>
  <header>
    <nav class="border-gray-200 bg-black">
      <div
        class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
      >
        <router-link to="/" class="flex items-center">
          <img
            src="./assets/img/ventra-logo-final-para-negro.png"
            class="h-8 mr-3"
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
            class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:border-gray-700"
          >
            <li>
              <router-link
                to="/"
                class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white"
                aria-current="page"
                >Home</router-link
              >
            </li>
            <li>
              <router-link
                to="/eventos"
                class="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >Eventos</router-link
              >
            </li>
            <template v-if="userAuth.id !== null">
              <li>
                <router-link
                  :to="`/mi-cuenta/${userAuth.id}/`"
                  class="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >Mi Cuenta</router-link
                >
              </li>
              <template v-if="userProfile.role === 'admin'">
                <li>
                  <router-link
                    to="/dashboard"
                    class="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >Panel Admin</router-link
                  >
                </li>
              </template>
              <li>
                <form @submit.prevent="handleLogout">
                  <button
                    class="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
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
                  class="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >Iniciar Sesión</router-link
                >
              </li>
              <li>
                <router-link
                  to="/registrarse"
                  class="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >Registrarse</router-link
                >
              </li>
            </template>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  <main class="">
    <router-view></router-view>
  </main>
  <footer class="">
    <p class="">Ventra &copy; 2023</p>
  </footer>
</template>

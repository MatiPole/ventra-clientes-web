<script>
export default {
  name: "App",
  data() {
    return {
      name: "",
      user: {
        id: null,
        email: null,
      },
    };
  },
  computed: {},
  methods: {},
  mounted() {},
};
</script>

<template>
  <header>
    <nav>
      <ul class="flex justify-evenly">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/eventos">Eventos</router-link></li>
        <li>
          <router-link to="/iniciar-sesion">Iniciar Sesión</router-link>
        </li>
        <li><router-link to="/registrarse">Registrarse</router-link></li>

        <li><router-link to="/mi-cuenta">Mi Cuenta</router-link></li>

        <li><router-link to="/dashboard">Panel Admin</router-link></li>
      </ul>
    </nav>
  </header>
  <main class="">
    <router-view></router-view>
  </main>
  <footer class="">
    <p class="">Ventra &copy; 2023</p>
  </footer>
</template>

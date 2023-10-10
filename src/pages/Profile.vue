<script>
import BaseHeader from "../components/BaseHeader.vue";
import { getUserProfileById } from "../services/user";

export default {
  name: "Profile",
  components: { BaseHeader },
  data() {
    return {
      user: {
        id: null,
        email: null,
        username: null,
      },
      loadingUser: true,
    };
  },
  async mounted() {
    this.loadingUser = true;
    this.user = await getUserProfileById(this.$route.params.id);
    this.loadingUser = false;
  },
};
</script>

<template>
  <BaseHeader>Mi cuenta</BaseHeader>
  <div class="flex flex-col items-center justify-center">
    <h2>{{ user.username }}</h2>
    <p>{{ user.email }}</p>
  </div>
</template>

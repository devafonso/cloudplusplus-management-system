<script>
import { onMounted } from "vue";
import { useAuthStore } from "../stores/auth";

export default {
  name: "Navbar",
  data() {
    return {
      authStore: useAuthStore(),
    };
  },
  mounted() {
    this.authStore.getUser();
  },
};
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary border-bottom">
    <div class="container-fluid">
      <router-link
        class="fst-italic fs-3 fw-bold text-dark text-decoration-none"
        :to="{ name: 'Home' }"
        >Cloud++</router-link
      >

      <template v-if="!authStore.user">
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          <span class="navbar-text">Login</span>
        </div>
      </template>

      <template v-else>
        <button class="btn btn-light" @click="authStore.handleLogout()">
          Logout
        </button>
      </template>
    </div>
  </nav>
</template>

<style scoped></style>

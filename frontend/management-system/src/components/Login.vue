<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();

const form = ref({
  email: "",
  password: "",
});
</script>
<template>
  <main
    class="container d-flex justify-content-center align-items-center full-height"
  >
    <div class="card" style="width: 30rem">
      <div class="card-body p-5">
        <h4 class="text-center fst-italic">Management System</h4>
        <h4 class="text-center mt-4">Sign in</h4>
        <form @submit.prevent="authStore.handleLogin(form)" class="mt-4">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label"
              >Email address</label
            >
            <input
              type="email"
              v-model="form.email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div v-if="authStore.errors.email" class="d-flex">
              <span class="text-danger">{{
                authStore.errors.email[0]
              }}</span>
            </div>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label"
              >Password</label
            >
            <input
              type="password"
              v-model="form.password"
              class="form-control"
              id="exampleInputPassword1"
            />
            <div v-if="authStore.errors.password" class="d-flex">
              <span class="text-danger">{{
                authStore.errors.password[0]
              }}</span>
            </div>
          </div>

          <button type="submit" class="btn btn-primary w-100 mt-3">
            Sign in
          </button>
          <p class="text-center mt-3 text-muted">
            Don't have an account? <span class="text-primary">Sign Up now</span>
          </p>
        </form>
      </div>
    </div>
  </main>
</template>

<style scoped>
.full-height {
  height: 100vh;
}
</style>

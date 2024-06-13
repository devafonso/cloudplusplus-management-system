<script setup>
import { ref } from 'vue'
import { useAuthStore } from "../stores/auth"

const authStore = useAuth
const form = ref({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});


</script>
<template>
  <main class="container d-flex justify-content-center">
    <div class="" style="width: 20rem">
      <form @submit.prevent="handleRegister">
        <div class="mb-3">
          <label for="inputName" class="form-label"
            >Name</label
          >
          <input
            type="text"
            v-model="form.name"
            class="form-control"
            id="inputName"
            
          />
        </div>
        <div class="mb-3">
          <label for="inputEmail" class="form-label"
            >Email</label
          >
          <input
            type="email"
            v-model="form.email"
            class="form-control"
            id="inputEmail"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label for="inputPassword" class="form-label">Password</label>
          <input
            type="password"
            v-model="form.password"
            class="form-control"
            id="inputPassword"
          />
        </div>
        <div class="mb-3">
          <label for="inputPasswordConfirmation" class="form-label">Password confirmation</label>
          <input
            type="password"
            v-model="form.password_confirmation"
            class="form-control"
            id="inputPasswordConfirmation"
          />
        </div>

        <button type="submit" class="btn btn-primary w-100">Submit</button>
      </form>
    </div>
  </main>
</template>


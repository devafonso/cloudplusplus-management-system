<script>
import axios from "axios";
import { PhCaretRight } from "@phosphor-icons/vue";
import {VMoney} from 'v-money'
import { useAuthStore } from "../stores/auth";
import Swal from "sweetalert2";

export default {
  name: "ProjectCreate",
  directives: {
    money: VMoney
  },
  data() {
    return {
      authStore: useAuthStore(),
      project: {
        name: "",
        start_date: "",
        end_date: "",
        value: "",
        status: "",
      },
      money: {
        decimal: '.',
        thousands: ',',
        prefix: '$ ',
        suffix: '',
        precision: 2,
        masked: false
      },
      errors: {},
    };
  },
  methods: {
    async storeProject() {
      let formData = new FormData();
      formData.append("name", this.project.name);
      formData.append("start_date", this.project.start_date);
      formData.append("end_date", this.project.end_date);
      formData.append("value", this.project.value);
      formData.append("status", this.project.status);
      formData.append("creator_id", this.authStore.user.id);

      try {
        const response = await axios.post("api/projects", formData);
        if (response.status === 200) {
          this.project.name = "";
          this.project.start_date = "";
          this.project.end_date = "";
          this.project.value = "";
          this.project.status = "";
          this.errors = {};
          this.$router.push("/home");
          
        }
      } catch (error) {
        console.error("API Error:", error);
        if (error.response && error.response.data && error.response.data.errors) {
          this.errors = error.response.data.errors;
        } else {
          this.errors = { general: "An unexpected error occurred." };
        }
      }
    },
  },
  mounted() {
    this.authStore.getUser();
  },
};
</script>

<template>
  <div class="container full-height mt-5">
    <p class="text-muted fw-semibold">
      <router-link
        class="text-muted fw-semibold text-decoration-none"
        :to="{ name: 'Home' }"
        >Projects</router-link
      ><span class="p-2"><PhCaretRight :size="15" /></span
      ><span>Create</span>
    </p>
    <p class="fs-3 fw-bold">Create Project</p>
    <form @submit.prevent="storeProject" class="row g-3">
      <div class="col-md-6">
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input
            type="text"
            class="form-control"
            id="name"
            v-model="project.name"
          />
          <span v-if="errors.name" class="text-danger">{{ errors.name[0] }}</span>
        </div>
        <div class="mb-3">
          <label for="start-date" class="form-label">Start date</label>
          <input
            type="date"
            class="form-control"
            id="start-date"
            v-model="project.start_date"
          />
          <span v-if="errors.start_date" class="text-danger">{{ errors.start_date[0] }}</span>
        </div>
      </div>
      <div class="col-md-6">
        <div class="mb-3">
          <label for="end-date" class="form-label">End date</label>
          <input
            type="date"
            class="form-control"
            id="end-date"
            v-model="project.end_date"
          />
          <span v-if="errors.end_date" class="text-danger">{{ errors.end_date[0] }}</span>
        </div>
        <div class="mb-3">
          <label for="value" class="form-label">Value</label>
          <input
            type="text"
            class="form-control"
            id="value"
            v-model="project.value"
            v-money="money"
          />
          <span v-if="errors.value" class="text-danger">{{ errors.value[0] }}</span>
        </div>
        <div class="mb-3">
          <label for="status" class="form-label">Status</label>
          <select
            class="form-select"
            id="status"
            v-model="project.status"
          >
            
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <span v-if="errors.status" class="text-danger">{{ errors.status[0] }}</span>
        </div>
      </div>
      <hr/>
      <div class="col-12 d-flex justify-content-end">
        <hr/>
        <button type="submit" class="btn btn-primary">Create</button>
        <span v-if="errors.general" class="text-danger">{{ errors.general }}</span>
      </div>
    </form>
  </div>
</template>

<style scoped>
.full-height {
  height: 100vh;
}
</style>

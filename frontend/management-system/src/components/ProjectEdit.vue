<script>
import axios from "axios";
import { PhCaretRight } from "@phosphor-icons/vue";
import { useRouter } from "vue-router";
import { VMoney } from "v-money";

export default {
  name: "ProjectEdit",
  directives: {
    money: VMoney,
  },
  data() {
    return {
      project: {
        name: "",
        start_date: "",
        end_date: "",
        value: "",
        status: "",
      },
      money: {
        decimal: ".",
        thousands: ",",
        prefix: "$ ",
        suffix: "",
        precision: 2,
        masked: false,
      },
      error: [],
    };
  },
  created() {
    this.getProject();
  },
  methods: {
    async getProject() {
      try {
        const response = await axios.get(
          "api/projects/" + this.$route.params.id
        );
        this.project = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async updateProject() {
      try {
        const { id, ...data } = this.project;
        const response = await axios.put(
          `api/projects/${this.$route.params.id}`,
          data
        );
        this.$router.push("/home");
      } catch (error) {
        console.error(error);
      }
    },
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
      ><span>Edit</span>
    </p>
    <p class="fs-3 fw-bold">Edit Project</p>
    <form @submit.prevent="updateProject" class="row g-3">
      <div class="col-md-6">
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input
            type="text"
            class="form-control"
            id="name"
            v-model="project.name"
          />
        </div>
        <div class="mb-3">
          <label for="start-date" class="form-label">Start date</label>
          <input
            type="date"
            class="form-control"
            id="start-date"
            v-model="project.start_date"
          />
        </div>
        <div class="mb-3">
          <label for="end-date" class="form-label">End date</label>
          <input
            type="date"
            class="form-control"
            id="end-date"
            v-model="project.end_date"
          />
        </div>
      </div>
      <div class="col-md-6">
        <div class="mb-3">
          <label for="value" class="form-label">Value</label>
          <input
            type="text"
            class="form-control"
            id="value"
            v-model="project.value"
            v-money="money"
          />
        </div>
        <div class="mb-3">
          <label for="status" class="form-label">Status</label>
          <select class="form-select" id="status" v-model="project.status">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
      <div class="col-12">
        <button type="submit" class="btn btn-primary">Save</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.full-height {
  height: 100vh;
}
</style>

<script>
import axios from "axios";
import { format, parseISO } from "date-fns";
import Swal from "sweetalert2";
import { PhTrash, PhNotePencil } from "@phosphor-icons/vue";

export default {
  name: "ProjectList",
  data() {
    return {
      projects: [],
      currentPage: 1,
      totalPages: 0,
    };
  },
  mounted() {
    this.fetchProjects();
  },
  methods: {
    async fetchProjects(page = 1) {
      try {
        const response = await axios.get(`api/projects?page=${page}`);
        this.handleFetchSuccess(response);
      } catch (error) {
        this.handleFetchError(error);
      }
    },
    handleFetchSuccess(response) {
      if (response.status === 200) {
        this.projects = response.data.data.map((project) => ({
          ...project,
          start_date: this.formatDate(project.start_date),
          end_date: this.formatDate(project.end_date),
          value: this.formatCurrency(project.value),
        }));
        this.totalPages = response.data.last_page;
        this.currentPage = response.data.current_page;
      } else {
        console.error("Error fetching projects:", response);
        this.showErrorAlert("Failed to fetch projects");
      }
    },
    handleFetchError(error) {
      console.error("Error:", error);
      this.showErrorAlert("Failed to fetch projects");
    },
    formatDate(dateString) {
      return format(parseISO(dateString), "dd/MM/yyyy");
    },
    formatCurrency(amount) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
    },
    async deleteProject(id) {
      try {
        const result = await Swal.fire({
          title: "Are you sure?",
          showCancelButton: true,
          confirmButtonText: "Delete",
        });

        if (result.isConfirmed) {
          const response = await axios.delete(`api/projects/${id}`);
          if (response.status === 200) {
            this.showSuccessAlert(response.data.message);
            this.fetchProjects(this.currentPage); // Refresh current page
          } else {
            this.showErrorAlert("Failed to delete project");
          }
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      } catch (error) {
        console.error("Error:", error);
        this.showErrorAlert("An error occurred while deleting the project");
      }
    },
    showSuccessAlert(message) {
      Swal.fire("Success", message, "success");
    },
    showErrorAlert(message) {
      Swal.fire("Error", message, "error");
    },
    getStatusBadgeClass(status) {
      return {
        "badge bg-success": status === "active",
        "badge bg-secondary": status === "inactive",
      };
    },
  },
};
</script>

<template>
  <section class="container full-height mt-5">
    <div class="d-flex justify-content-between align-items-center">
      <p class="fs-3 fw-bold">Projects</p>
      <router-link :to="{ name: 'ProjectCreate' }" class="btn btn-primary"
        >New</router-link
      >
    </div>
    <div class="card p-1 mt-3">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Project name</th>
            <th scope="col">Start date</th>
            <th scope="col">End date</th>
            <th scope="col">Value</th>
            <th scope="col">Status</th>
            <th scope="col" class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="project in projects" :key="project.id">
            <td>{{ project.name }}</td>
            <td>{{ project.start_date }}</td>
            <td>{{ project.end_date }}</td>
            <td>{{ project.value }}</td>
            <td>
              <span :class="getStatusBadgeClass(project.status)">
                {{ project.status }}
              </span>
            </td>
            <td class="text-center">
              <router-link
                :to="{ name: 'ProjectEdit', params: { id: project.id } }"
              >
                <PhNotePencil :size="20" color="#3e2697" />
              </router-link>
              <PhTrash
                @click.prevent="deleteProject(project.id)"
                :size="20"
                color="#dc2e2e"
              />
              
            </td>
          </tr>
        </tbody>
      </table>

      <nav aria-label="Pagination">
        <ul class="pagination justify-content-end p-2">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a
              class="page-link"
              href="#"
              @click.prevent="fetchProjects(currentPage - 1)"
            >
              Previous
            </a>
          </li>
          <li
            class="page-item"
            v-for="page in totalPages"
            :key="page"
            :class="{ active: currentPage === page }"
          >
            <a class="page-link" href="#" @click.prevent="fetchProjects(page)">
              {{ page }}
            </a>
          </li>
          <li
            class="page-item"
            :class="{ disabled: currentPage === totalPages }"
          >
            <a
              class="page-link"
              href="#"
              @click.prevent="fetchProjects(currentPage + 1)"
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </section>
</template>

<style scoped>
.full-height {
  height: 100vh;
}
</style>

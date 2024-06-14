import { defineStore } from "pinia";
import axios from "axios";


export const useAuthStore = defineStore("auth", {
  state: () => ({
    authUser: null,
    isAuthenticated: false,
    authErros: [],
  }),
  getters: {
    isAuthenticated: (state) => !!state.authUser,
    user: (state) => state.authUser,
    errors: (state) => state.authErros,
  },
  actions: {
    async getToken() {
      await axios.get("sanctum/csrf-cookie");
    },
    async getUser() {
      await this.getToken();
      const data = await axios.get("api/user");
      this.authUser = data.data;
    },
    async handleLogin(data) {
      this.authErros = [];
      await this.getToken();
      try {
        const response = await axios.post("/login", {
          email: data.email,
          password: data.password,
        });
        await this.getUser();
        this.router.push("/home");
      } catch (error) {
        if (error.response.status === 422) {
          this.authErros = error.response.data.errors;
        }
      }

      
    },
    
    async handleLogout() {
      await axios.post("/logout");
      this.authUser = null;
      this.router.push("/login");
    },
  },
});

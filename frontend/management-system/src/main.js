import { createApp, markRaw } from 'vue';
import { createPinia } from 'pinia';
import router from './router';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


import PhosphorIcons from "@phosphor-icons/vue";

import './axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import App from './App.vue';

const pinia = createPinia();
pinia.use(({ store }) => {
  store.router = markRaw(router);
});

const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(VueSweetalert2);


app.use(PhosphorIcons);

app.mount('#app');

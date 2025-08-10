import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './style.css'
import "vue-toastification/dist/index.css";

import App from './App.vue'
import router from './router/index'
import AxiosPlugin from './plugins/AxiosPlugin'
import { loadLocalStorage } from './boot/localStorage'
import Toast, { POSITION } from 'vue-toastification'
import clickOutsideDirective from './directives/clickOutsideDirective';

const pinia = createPinia()
const app = createApp(App)

app.use(AxiosPlugin);
app.use(router);
app.use(pinia);
app.use(Toast, {
  position: POSITION.BOTTOM_LEFT,
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false,
  transition: "Vue-Toastification__bounce",
  maxToasts: 10,
  newestOnTop: true
});

app.directive('click-outside', clickOutsideDirective);


loadLocalStorage();

app.mount('#app');
